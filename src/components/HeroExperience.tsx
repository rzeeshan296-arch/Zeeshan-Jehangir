'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Bot, Menu, Send, Sparkles, X } from 'lucide-react';

type State = 'IDLE' | 'LOOK_LEFT' | 'LOOK_RIGHT' | 'GREETING' | 'WAVING' | 'RETURN_TO_IDLE';
type Zone = 'left' | 'center' | 'right';
type Gesture = Exclude<State, 'IDLE' | 'RETURN_TO_IDLE'>;
type Clip = { start: number; end: number; label: string };

// One approved full-body video powers every character interaction.
const clips: Record<Gesture, Clip> = {
  LOOK_LEFT: { start: 0.45, end: 2.05, label: 'Looking left' },
  LOOK_RIGHT: { start: 2.25, end: 3.1, label: 'Looking right' },
  GREETING: { start: 3.0, end: 4.35, label: 'Hey, welcome!' },
  WAVING: { start: 4.5, end: 6.25, label: 'Great to see you here.' },
};
const answers: Record<string, string> = {
  seo: 'I help businesses improve organic visibility through technical SEO, on-page optimization, keyword strategy and content improvements.',
  local: 'Local SEO focuses on Google Business Profile optimization, local relevance, citations, reviews and location-focused landing pages.',
  ai: 'I design practical AI-assisted workflows, chat experiences and automations that reduce repetitive work and support lead generation.',
  projects: 'Explore selected client work across local search, website strategy and digital marketing. I share the work completed and avoid unsupported performance claims.',
};

function CharacterInteraction({ mobile }: { mobile: boolean }) {
  const video = useRef<HTMLVideoElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runId = useRef(0);
  const activeZone = useRef<Zone | null>(null);
  const lastInteractionAt = useRef(0);
  const reducedMotion = useRef(false);
  const [state, setState] = useState<State>('IDLE');
  const stateRef = useRef<State>('IDLE');
  stateRef.current = state;
  const [hint, setHint] = useState('Move across the character to interact');
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const returnToIdle = useCallback((message = 'Move across the character to interact') => {
    const id = ++runId.current;
    clearTimer();
    const player = video.current;
    setState('RETURN_TO_IDLE');
    setHint(message);
    if (!player) {
      setState('IDLE');
      return;
    }
    const revealIdle = () => {
      if (id !== runId.current) return;
      player.pause();
      const reveal = () => {
        if (id !== runId.current) return;
        setState('IDLE');
        timer.current = setTimeout(() => {
          if (id === runId.current) timer.current = null;
        }, 180);
      };
      if (Math.abs(player.currentTime - 0.08) > 0.06) {
        const onSeeked = () => {
          player.removeEventListener('seeked', onSeeked);
          reveal();
        };
        player.addEventListener('seeked', onSeeked, { once: true });
        player.currentTime = 0.08;
        if (!player.seeking) {
          player.removeEventListener('seeked', onSeeked);
          reveal();
        }
      } else reveal();
    };
    if (player.readyState >= 1) revealIdle();
    else player.addEventListener('loadedmetadata', revealIdle, { once: true });
  }, [clearTimer]);

  const playGesture = useCallback((gesture: Gesture, done?: () => void) => {
    const id = ++runId.current;
    clearTimer();
    const player = video.current;
    const clip = clips[gesture];
    setState(gesture);
    setHint(clip.label);
    if (reducedMotion.current) {
      setHint(gesture === 'GREETING' ? 'Hello! Explore my work below.' : 'Thanks for exploring my introduction.');
      if (done) done();
      else returnToIdle();
      return;
    }
    if (!player || player.error) {
      setVideoFailed(true);
      returnToIdle('Character animation is temporarily unavailable.');
      return;
    }

    const startPlayback = () => {
      if (id !== runId.current) return;
      player.pause();
      const onSeeked = () => {
        player.removeEventListener('seeked', onSeeked);
        if (id !== runId.current) return;
        const finish = () => {
          if (id !== runId.current) return;
          player.removeEventListener('timeupdate', onTimeUpdate);
          clearTimer();
          player.pause();
          if (done) done();
          else returnToIdle('Explore my work below.');
        };
        const onTimeUpdate = () => {
          if (player.currentTime >= clip.end - 0.04) finish();
        };
        player.addEventListener('timeupdate', onTimeUpdate);
        timer.current = setTimeout(finish, (clip.end - clip.start + 1.2) * 1000);
        player.play().catch(() => {
          if (id !== runId.current) return;
          setVideoFailed(true);
          returnToIdle('Tap a gesture to try again.');
        });
      };
      player.currentTime = clip.start;
      if (player.seeking) player.addEventListener('seeked', onSeeked, { once: true });
      else onSeeked();
    };

    if (player.readyState >= 1) startPlayback();
    else player.addEventListener('loadedmetadata', startPlayback, { once: true });
  }, [clearTimer, returnToIdle]);

  const greet = useCallback(() => {
    playGesture('GREETING', () => playGesture('WAVING', () => returnToIdle('Explore my work below.')));
  }, [playGesture, returnToIdle]);

  const triggerZone = useCallback((zone: Zone, fromControl = false) => {
    const now = Date.now();
    if (activeZone.current === zone && !fromControl) return;
    if (!fromControl && now - lastInteractionAt.current < 650) return;
    if (fromControl && now - lastInteractionAt.current < 350) return;
    activeZone.current = zone;
    lastInteractionAt.current = now;
    if (zone === 'left') playGesture('LOOK_LEFT');
    else if (zone === 'right') playGesture('LOOK_RIGHT');
    else greet();
  }, [greet, playGesture]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (mobile || event.pointerType !== 'mouse') return;
    if ((event.target as HTMLElement).closest('button')) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width;
    triggerZone(position < 0.34 ? 'left' : position > 0.66 ? 'right' : 'center');
  }, [mobile, triggerZone]);

  const handlePointerLeave = useCallback(() => {
    activeZone.current = null;
    if (stateRef.current !== 'IDLE' && stateRef.current !== 'RETURN_TO_IDLE') returnToIdle();
  }, [returnToIdle]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = media.matches;
    const update = () => { reducedMotion.current = media.matches; };
    media.addEventListener('change', update);
    const player = video.current;
    const prepareIdle = () => {
      if (!player || stateRef.current !== 'IDLE') return;
      player.pause();
      if (Math.abs(player.currentTime - 0.08) > 0.06) player.currentTime = 0.08;
      setVideoReady(true);
    };
    if (player?.readyState && player.readyState >= 1) prepareIdle();
    else player?.addEventListener('loadedmetadata', prepareIdle, { once: true });
    return () => {
      media.removeEventListener('change', update);
      clearTimer();
      runId.current += 1;
      player?.pause();
    };
  }, [clearTimer]);

  return <div className={`character-stage state-${state.toLowerCase()}`} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
    <div className="stage-orbit orbit-a"/><div className="stage-orbit orbit-b"/><div className="stage-glow"/>
    <div className="character-label"><span className="live-dot"/> INTERACTIVE DIGITAL INTRODUCTION</div>
    <div className="character-frame">
      <video ref={video} className={`character-video character-video-idle ${videoReady ? 'visible' : ''}`} src="/videos/zeeshan-full-body-clean.mp4" playsInline muted preload="auto" onLoadedMetadata={() => { const player = video.current; if (player && stateRef.current === 'IDLE') { player.currentTime = 0.08; setVideoReady(true); } }} onError={() => setVideoFailed(true)} aria-label="Zeeshan standing, turning, greeting and waving"/>
      <div className="character-bottom-glow"/>
    </div>
    <div className="interaction-caption"><Sparkles size={14}/><span>{hint}</span></div>
    <div className="gesture-controls" aria-label="Character interaction controls">
      <button type="button" onClick={() => triggerZone('left', true)}>Look left</button>
      <button type="button" onClick={() => triggerZone('center', true)}>Say hello <span>✦</span></button>
      <button type="button" onClick={() => triggerZone('right', true)}>Look right</button>
    </div>
    {videoFailed && <span className="asset-note">The character video could not load. Refresh the page to retry.</span>}
  </div>;
}

export default function HeroExperience() {
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [chat, setChat] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{from:'bot'|'you';text:string}[]>([{from:'bot',text:'Hi! I’m the portfolio assistant. What would you like to explore?'}]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const send = (value=input) => {
    const text=value.trim(); if(!text) return;
    const lower=text.toLowerCase();
    const key=lower.includes('local')||lower.includes('google business')?'local':lower.includes('ai')||lower.includes('automation')?'ai':lower.includes('project')||lower.includes('work')?'projects':'seo';
    setMessages(list=>[...list,{from:'you',text},{from:'bot',text:answers[key]}]); setInput('');
  };

  return <section className="hero-shell" id="home">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <header className="site-header wrap">
      <a className="brand" href="#home" aria-label="Zeeshan Jehangir home"><span className="brand-mark">Z<span>.</span></span><span className="brand-copy">Zeeshan Jehangir<small>SEO &amp; AI DIGITAL GROWTH</small></span></a>
      <button className="mobile-menu-button" aria-label="Toggle navigation" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
      <nav className={menu?'main-nav open':'main-nav'} aria-label="Main navigation">{[['Home','#home'],['About','#about'],['Expertise','#expertise'],['Projects','#projects'],['Experience','#experience'],['Contact','#contact']].map(([label,href])=><a key={label} href={href} onClick={()=>setMenu(false)}>{label}</a>)}</nav>
      <a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={15}/></a>
    </header>

    <div className="hero-grid wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot"/> DIGITAL GROWTH • SEO • AI</div>
        <p className="hello-line">Hello, I’m <strong>Zeeshan Jehangir.</strong></p>
        <h1>Turning Digital Challenges Into <em>Measurable Growth.</em></h1>
        <p className="hero-description">I help businesses grow through strategic SEO, Local SEO, AI automation, performance marketing and modern web solutions.</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">Explore My Work <ArrowUpRight size={17}/></a><a className="button button-secondary" href="#contact">Let’s Connect <ArrowRight size={17}/></a></div>
        <div className="trust-row"><div className="trust-avatars"><span>Z</span><span>SEO</span><span>AI</span></div><p>Strategy-led. Data-informed.<br/><strong>Focused on meaningful growth.</strong></p></div>
      </div>

      <CharacterInteraction mobile={mobile}/>

      <aside className="hero-aside">
        <div className="availability-card"><span className="availability-icon"><Sparkles size={16}/></span><div><small>AVAILABLE FOR</small><strong>Growth-focused projects</strong></div><span className="availability-pulse"/></div>
        <div className="aside-note"><span className="aside-index">01 / 03</span><p>Turning search visibility into sustainable business momentum.</p><a href="#expertise">What I do <ArrowDownRight size={15}/></a></div>
        <div className="assistant-teaser"><span className="assistant-mini-icon"><Bot size={19}/></span><div><small>NEED A QUICK ANSWER?</small><strong>Ask my AI assistant</strong></div><button aria-label="Open AI assistant" onClick={()=>setChat(true)}><ArrowUpRight size={16}/></button></div>
      </aside>
    </div>

    <div className="hero-footer wrap"><div className="scroll-cue"><span className="scroll-icon"><ArrowDown size={15}/></span><span>SCROLL TO EXPLORE</span><span className="scroll-line"/></div><div className="footer-specialties"><span>SEO</span><i/><span>LOCAL SEARCH</span><i/><span>AI AUTOMATION</span><i/><span>DIGITAL STRATEGY</span></div><div className="hero-count">01 <span>/</span> 05</div></div>


  </section>;
}
