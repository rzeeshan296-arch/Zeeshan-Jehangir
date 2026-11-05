'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Bot, Menu, Send, Sparkles, X } from 'lucide-react';

const answers: Record<string, string> = {
  seo: 'I help businesses improve organic visibility through technical SEO, on-page optimization, keyword strategy and content improvements.',
  local: 'Local SEO focuses on Google Business Profile optimization, local relevance, citations, reviews and location-focused landing pages.',
  ai: 'I design practical AI-assisted workflows, chat experiences and automations that reduce repetitive work and support lead generation.',
  projects: 'Explore selected client work across local search, website strategy and digital marketing. I share the work completed and avoid unsupported performance claims.',
};

function CharacterInteraction() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => {
      setReducedMotion(media.matches);
      if (media.matches) videoRef.current?.pause();
    };
    syncMotionPreference();
    media.addEventListener('change', syncMotionPreference);
    return () => media.removeEventListener('change', syncMotionPreference);
  }, []);

  const startPlayback = () => {
    const player = videoRef.current;
    if (!player) return;
    setVideoError(false);
    player.play()
      .then(() => setPlaybackBlocked(false))
      .catch(() => setPlaybackBlocked(true));
  };

  return <div className="character-stage">
    <div className="stage-orbit orbit-a"/><div className="stage-orbit orbit-b"/><div className="stage-glow"/>
    <div className="character-label"><span className="live-dot"/> DIGITAL INTRODUCTION</div>
    <div className="character-frame">
      <video
        ref={videoRef}
        className="character-video"
        src="/videos/zeeshan-hero.mp4"
        autoPlay={!reducedMotion}
        loop={!reducedMotion}
        muted
        playsInline
        preload="auto"
        aria-label="Full-body video of Zeeshan walking in a studio"
        onLoadedData={() => {
          if (reducedMotion) videoRef.current?.pause();
        }}
        onPlay={() => setPlaybackBlocked(false)}
        onError={() => setVideoError(true)}
      />
      <div className="character-bottom-glow"/>
    </div>
    {(playbackBlocked || videoError) && <button className="video-retry" type="button" onClick={startPlayback}>
      {videoError ? 'Retry video' : 'Play character video'}
    </button>}
  </div>;
}

export default function HeroExperience() {
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

      <CharacterInteraction/>

      <aside className="hero-aside">
        <div className="availability-card"><span className="availability-icon"><Sparkles size={16}/></span><div><small>AVAILABLE FOR</small><strong>Growth-focused projects</strong></div><span className="availability-pulse"/></div>
        <div className="aside-note"><span className="aside-index">01 / 03</span><p>Turning search visibility into sustainable business momentum.</p><a href="#expertise">What I do <ArrowDownRight size={15}/></a></div>
        <div className="assistant-teaser"><span className="assistant-mini-icon"><Bot size={19}/></span><div><small>NEED A QUICK ANSWER?</small><strong>Ask my AI assistant</strong></div><button aria-label="Open AI assistant" onClick={()=>setChat(true)}><ArrowUpRight size={16}/></button></div>
      </aside>
    </div>

    <div className="hero-footer wrap"><div className="scroll-cue"><span className="scroll-icon"><ArrowDown size={15}/></span><span>SCROLL TO EXPLORE</span><span className="scroll-line"/></div><div className="footer-specialties"><span>SEO</span><i/><span>LOCAL SEARCH</span><i/><span>AI AUTOMATION</span><i/><span>DIGITAL STRATEGY</span></div><div className="hero-count">01 <span>/</span> 05</div></div>


  </section>;
}
