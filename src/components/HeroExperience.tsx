'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Bot, Code2, Menu, Send, Sparkles, X } from 'lucide-react';

type State = 'IDLE' | 'LOOK_LEFT' | 'LOOK_RIGHT' | 'GREETING' | 'WAVING';
type Clip = { src: string; start: number; end: number };
const clips: Record<Exclude<State, 'IDLE'>, Clip> = {
  LOOK_LEFT: { src: '/videos/zeeshan-upper-body-clean.mp4', start: 1.25, end: 2.55 },
  LOOK_RIGHT: { src: '/videos/zeeshan-full-body-clean.mp4', start: 1.25, end: 2.55 },
  GREETING: { src: '/videos/zeeshan-full-body-clean.mp4', start: 3.0, end: 4.55 },
  WAVING: { src: '/videos/zeeshan-upper-body-clean.mp4', start: 4.55, end: 6.45 },
};
const answers: Record<string, string> = {
  seo: 'I help businesses improve organic visibility through technical SEO, on-page optimization, keyword strategy and content improvements.',
  local: 'Local SEO focuses on Google Business Profile optimization, local relevance, citations, reviews and location-focused landing pages.',
  ai: 'I design practical AI-assisted workflows, chat experiences and automations that reduce repetitive work and support lead generation.',
  projects: 'Explore the portfolio as it develops. I focus on measurable work, transparent scope and verifiable outcomes.',
};

export default function HeroExperience() {
  const video = useRef<HTMLVideoElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = useState<State>('IDLE');
  const [hint, setHint] = useState('Move your cursor around to say hello');
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [chat, setChat] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{from:'bot'|'you';text:string}[]>([{from:'bot',text:'Hi! I’m the portfolio assistant. What would you like to explore?'}]);

  const clear = useCallback(() => { if (timer.current) clearTimeout(timer.current); timer.current = null; }, []);
  const idle = useCallback((text = 'Move your cursor around to say hello') => {
    clear(); setState('IDLE'); setHint(text);
    const el = video.current;
    if (el) {
      const src = '/videos/zeeshan-full-body-clean.mp4';
      const showRest = () => { try { el.currentTime = 0.15; el.pause(); setVideoVisible(true); } catch { setVideoVisible(false); } };
      if (el.getAttribute('src') !== src) { setVideoVisible(false); el.src = src; el.load(); el.addEventListener('loadedmetadata', showRest, { once: true }); }
      else if (el.readyState >= 1) showRest();
      else el.addEventListener('loadedmetadata', showRest, { once: true });
    }
  }, [clear]);

  const play = useCallback((next: Exclude<State,'IDLE'>, text: string, done?: () => void) => {
    clear(); setState(next); setHint(text);
    const clip = clips[next]; const el = video.current;
    if (!el) { timer.current = setTimeout(() => { if (done) done(); else idle(); }, (clip.end-clip.start)*1000); return; }
    const start = () => { el.currentTime = clip.start; void el.play().catch(() => setVideoFailed(true)); };
    if (el.getAttribute('src') !== clip.src) { setVideoVisible(false); setVideoFailed(false); el.src = clip.src; el.load(); }
    if (el.readyState >= 1) start(); else el.addEventListener('loadedmetadata', start, {once:true});
    const finish = () => { el.pause(); if (done) done(); else idle(); };
    const onTime = () => { if (el.currentTime >= clip.end) { el.removeEventListener('timeupdate', onTime); clear(); finish(); } };
    el.addEventListener('timeupdate', onTime);
    timer.current = setTimeout(() => { el.removeEventListener('timeupdate', onTime); finish(); }, (clip.end-clip.start+0.6)*1000);
  }, [clear,idle]);

  const greet = useCallback(() => play('GREETING','Hey, welcome!',() => play('WAVING','Great to see you here.',() => idle('Explore my work below.'))),[idle,play]);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const update = () => setMobile(mq.matches);
    update(); mq.addEventListener('change',update); idle();
    return () => { mq.removeEventListener('change',update); clear(); };
  },[clear]);

  const zone = (where:'left'|'right'|'center') => {
    if(where==='left') play('LOOK_LEFT','Someone exploring from the left?');
    else if(where==='right') play('LOOK_RIGHT','Something caught your attention?');
    else greet();
  };
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
      <nav className={menu?'main-nav open':'main-nav'} aria-label="Main navigation">{[['Home','#home'],['About','#about'],['Expertise','#expertise'],['Projects','#projects'],['Contact','#contact']].map(([label,href])=><a key={label} href={href} onClick={()=>setMenu(false)}>{label}</a>)}</nav>
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

      <div className="character-stage" onMouseLeave={()=>{if(!mobile) idle();}}>
        <div className="stage-orbit orbit-a"/><div className="stage-orbit orbit-b"/><div className="stage-glow"/>
        <div className="character-label"><span className="live-dot"/> INTERACTIVE DIGITAL INTRODUCTION</div>
        <div className="character-frame">
          <div className="character-placeholder" aria-hidden="true"><div className="placeholder-head"><div className="placeholder-hair"/><div className="placeholder-face"><i/><i/><b/></div><div className="placeholder-beard"/></div><div className="placeholder-body"><div className="shirt-line"/></div></div>
          <video ref={video} className={videoVisible&&!videoFailed?'character-video visible':'character-video'} playsInline muted preload="none" onLoadedData={()=>{setVideoVisible(true);setVideoFailed(false);}} onError={()=>setVideoFailed(true)} aria-label="Character gesture animation"/>
          <div className="character-bottom-glow"/>
        </div>
        <div className="interaction-caption"><Sparkles size={14}/><span>{hint}</span></div>
        {!mobile&&<div className="zone-layer" aria-label="Character interaction zones"><button className="zone zone-left" aria-label="Look left" onMouseEnter={()=>zone('left')}/><button className="zone zone-center" aria-label="Greet me" onMouseEnter={()=>zone('center')}/><button className="zone zone-right" aria-label="Look right" onMouseEnter={()=>zone('right')}/></div>}
        <div className="gesture-controls"><button onClick={()=>zone('left')}>Look left</button><button onClick={greet}>Say hello <span>✦</span></button><button onClick={()=>zone('right')}>Look right</button></div>
        {mobile&&<button className="mobile-greet" onClick={greet}>Tap to say hello <Sparkles size={14}/></button>}
        {videoFailed&&<span className="asset-note">Add clean character videos to <code>public/videos</code> to enable motion.</span>}
      </div>

      <aside className="hero-aside">
        <div className="availability-card"><span className="availability-icon"><Sparkles size={16}/></span><div><small>AVAILABLE FOR</small><strong>Growth-focused projects</strong></div><span className="availability-pulse"/></div>
        <div className="aside-note"><span className="aside-index">01 / 03</span><p>Turning search visibility into sustainable business momentum.</p><a href="#expertise">What I do <ArrowDownRight size={15}/></a></div>
        <div className="assistant-teaser"><span className="assistant-mini-icon"><Bot size={19}/></span><div><small>NEED A QUICK ANSWER?</small><strong>Ask my AI assistant</strong></div><button aria-label="Open AI assistant" onClick={()=>setChat(true)}><ArrowUpRight size={16}/></button></div>
      </aside>
    </div>

    <div className="hero-footer wrap"><div className="scroll-cue"><span className="scroll-icon"><ArrowDown size={15}/></span><span>SCROLL TO EXPLORE</span><span className="scroll-line"/></div><div className="footer-specialties"><span>SEO</span><i/><span>LOCAL SEARCH</span><i/><span>AI AUTOMATION</span><i/><span>DIGITAL STRATEGY</span></div><div className="hero-count">01 <span>/</span> 05</div></div>


  </section>;
}
