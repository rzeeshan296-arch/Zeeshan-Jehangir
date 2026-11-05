'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Bot, Menu, Send, Sparkles, Volume2, VolumeX, X } from 'lucide-react';

const clips = [
  { src: '/videos/hero-environment.mp4', label: 'Zeeshan entering the futuristic environment and greeting the AI robot' },
] as const;

type Message = { from: 'assistant' | 'visitor'; text: string };
const replies = [
  { keys: ['seo', 'search', 'google'], text: 'I work across technical SEO, on-page improvements, keyword strategy and content planning to build sustainable organic visibility.' },
  { keys: ['local', 'maps', 'business profile'], text: 'Local SEO includes Google Business Profile optimization, local landing pages, service relevance, citations and review strategy.' },
  { keys: ['ai', 'automation', 'robot', 'chatbot'], text: 'I explore practical AI assistants and automation workflows that improve customer experiences and reduce repetitive work.' },
  { keys: ['project', 'work', 'case study'], text: 'Explore selected work in the Projects section, including local SEO, business profile and website strategy examples.' },
];
const getReply = (question: string) => replies.find((item) => item.keys.some((key) => question.toLowerCase().includes(key)))?.text
  ?? 'Thanks for reaching out. Explore the portfolio sections to see my SEO, digital marketing and AI work, or use the contact links to start a conversation.';

function RobotAssistant({ onOpen, highlighted }: { onOpen: () => void; highlighted: boolean }) {
  return <button className="hero-robot" type="button" onClick={onOpen} aria-label="Open AI portfolio assistant">
    <span className="robot-aura" />
    <svg className="robot-art" viewBox="0 0 160 190" role="img" aria-label="Friendly blue and white robot assistant">
      <ellipse cx="80" cy="177" rx="48" ry="8" fill="#020817" opacity=".35" />
      <path d="M80 18v13" stroke="#8dc8ff" strokeWidth="5" strokeLinecap="round" />
      <circle cx="80" cy="13" r="7" fill="#4ea3ff" stroke="#d9efff" strokeWidth="3" />
      <rect x="28" y="33" width="104" height="78" rx="28" fill="url(#robotShell)" stroke="#b8dcff" strokeWidth="3" />
      <rect x="39" y="44" width="82" height="55" rx="20" fill="#071a38" stroke="#397fcb" strokeWidth="2" />
      <g className="robot-eyes" fill="#63d7ff"><ellipse cx="62" cy="70" rx="8" ry="11" /><ellipse cx="98" cy="70" rx="8" ry="11" /></g>
      <path d="M67 86q13 10 26 0" fill="none" stroke="#7de7ff" strokeWidth="3" strokeLinecap="round" />
      <path d="M27 64H14M133 64h13" stroke="#9acfff" strokeWidth="7" strokeLinecap="round" />
      <rect x="45" y="116" width="70" height="52" rx="20" fill="url(#robotShell)" stroke="#b8dcff" strokeWidth="3" />
      <rect x="66" y="126" width="28" height="22" rx="8" fill="#0b2b57" /><circle cx="80" cy="137" r="5" fill="#59d5ff" />
      <path d="M48 126 31 145M112 126l17 19" stroke="#b9ddff" strokeWidth="10" strokeLinecap="round" />
      <path d="M63 165v8M97 165v8" stroke="#b9ddff" strokeWidth="10" strokeLinecap="round" />
      <defs><linearGradient id="robotShell" x1="28" y1="25" x2="130" y2="175" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset=".55" stopColor="#d8eaff" /><stop offset="1" stopColor="#75aeea" /></linearGradient></defs>
    </svg>
    <span className={highlighted ? "robot-status is-highlighted" : "robot-status"}><i /> Ask My AI Assistant <ArrowUpRight size={12} /></span>
  </button>;
}

function CharacterSequence({ reducedMotion, onCalloutHighlight }: { reducedMotion: boolean; onCalloutHighlight: (highlighted: boolean) => void }) {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const failed = useRef<Set<number>>(new Set());
  const [active, setActive] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  const [voiceMissing, setVoiceMissing] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [videoSoundOn, setVideoSoundOn] = useState(false);

  const play = useCallback(async (index: number) => {
    const video = videoRefs.current[index];
    if (!video || failed.current.has(index)) return false;
    try {
      video.currentTime = 0;
      await video.play();
      setActive(index);
      setBlocked(false);
      return true;
    } catch {
      setBlocked(true);
      return false;
    }
  }, []);

  const advance = useCallback(async (from: number) => {
    if (reducedMotion) return;
    for (let step = 1; step <= clips.length; step += 1) {
      const next = (from + step) % clips.length;
      if (!failed.current.has(next) && await play(next)) return;
    }
  }, [play, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      videoRefs.current.forEach((video) => video?.pause());
      return;
    }
    const video = videoRefs.current[active];
    if (video && video.paused && !failed.current.has(active)) {
      video.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
    }
  }, [active, reducedMotion]);

  const onError = (index: number) => {
    if (failed.current.has(index)) return;
    failed.current.add(index);
    setFailedCount(failed.current.size);
    void advance(index);
  };

  const toggleVoice = async () => {
    const audio = audioRef.current;
    if (!audio || !voiceAvailable) {
      setVoiceMissing(true);
      return;
    }
    if (!audio.paused) {
      audio.pause();
      setVoicePlaying(false);
      onCalloutHighlight(false);
      return;
    }
    audio.pause();
    audio.currentTime = 0;
    setVideoSoundOn(false);
    onCalloutHighlight(false);
    const firstVideo = videoRefs.current[0];
    videoRefs.current.forEach((video) => video?.pause());
    setActive(0);
    if (firstVideo && !reducedMotion && !failed.current.has(0)) firstVideo.currentTime = 0;
    try {
      await Promise.all([
        audio.play(),
        !reducedMotion && firstVideo && !failed.current.has(0) ? firstVideo.play() : Promise.resolve(),
      ]);
      setVoicePlaying(true);
      setBlocked(false);
    } catch {
      audio.pause();
      setVoicePlaying(false);
      setBlocked(true);
    }
  };

  return <div className="hero-media" aria-label="Animated character introduction">
    <audio
      ref={audioRef}
      src="/audio/hero-intro.mp3"
      preload="metadata"
      onCanPlay={() => { setVoiceAvailable(true); setVoiceMissing(false); }}
      onError={() => { setVoiceAvailable(false); setVoiceMissing(true); setVoicePlaying(false); }}
      onEnded={() => { setVoicePlaying(false); onCalloutHighlight(false); }}
      onTimeUpdate={(event) => onCalloutHighlight(event.currentTarget.currentTime >= 7.2)}
    />
    <div className="media-halo" /><div className="media-orbit media-orbit-one" /><div className="media-orbit media-orbit-two" />
    <div className="media-topline"><span><i /> LIVE INTRODUCTION</span><b>01 — 01</b></div>
    <div className="character-video-frame">
      {clips.map((clip, index) => <video
        key={clip.src}
        ref={(node) => { videoRefs.current[index] = node; }}
        className={index === active ? 'character-sequence-video is-active' : 'character-sequence-video'}
        src={clip.src} muted={!videoSoundOn || voicePlaying} playsInline preload={index === 0 ? 'auto' : 'none'}
        aria-label={clip.label}
        onLoadedData={() => { if (index === 0 && !reducedMotion && active === 0) videoRefs.current[0]?.play().then(() => setBlocked(false)).catch(() => setBlocked(true)); }}
        onEnded={() => { if (index === active) void advance(index); }}
        onError={() => onError(index)}
      />)}
      {failedCount === clips.length && <div className="video-fallback">
        <span className="fallback-orbit"><Bot size={38} /></span><strong>Character video is unavailable</strong>
        <p>Add <code>hero-environment.mp4</code> to <code>public/videos/</code> to enable the animated introduction.</p>
      </div>}
      <div className="video-frame-shade" />
    </div>
    <div className="media-caption"><span>ZEESHAN JEHANGIR</span><b>SEO / AI / DIGITAL GROWTH</b></div>
    <div className="hero-voice-controls">
      <button className={videoSoundOn ? "voice-toggle is-playing" : "voice-toggle"} type="button" onClick={() => {
        const next = !videoSoundOn;
        if (voicePlaying && audioRef.current) {
          audioRef.current.pause();
          setVoicePlaying(false);
        }
        setVideoSoundOn(next);
      }} aria-label={videoSoundOn ? "Turn original video sound off" : "Turn original video sound on"}>
        {videoSoundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
        {videoSoundOn ? "Video sound on" : "Video sound off"}
      </button>
      <button className={voicePlaying ? 'voice-toggle is-playing' : 'voice-toggle'} type="button" onClick={() => void toggleVoice()} aria-label={voicePlaying ? 'Turn voice introduction off' : 'Play voice introduction'}>
        {voicePlaying ? <VolumeX size={15} /> : <Volume2 size={15} />}
        {voiceMissing ? 'Add voice recording' : voicePlaying ? 'Voice on · click to stop' : 'Hear my welcome'}
      </button>
      <details className="voice-transcript">
        <summary>Read transcript</summary>
        <p>Hello! I'm Zeeshan Jehangir. Welcome to my portfolio. Feel free to connect with me, explore my work, and if you'd like to know more, just ask my AI assistant!</p>
      </details>
    </div>
    {voiceMissing && <p className="voice-missing-note" role="status">Add your recording as <code>public/audio/hero-intro.mp3</code> to enable the spoken welcome.</p>}
    {blocked && failedCount < clips.length && <button className="video-play-prompt" type="button" onClick={() => void play(active)}><span>▶</span> Play introduction</button>}
  </div>;
}

export default function HeroExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{ from: 'assistant', text: 'Hello! I’m Zeeshan’s AI portfolio assistant. Ask me about SEO, local search, digital marketing or AI solutions.' }]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [assistantCalloutActive, setAssistantCalloutActive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const send = (event?: FormEvent<HTMLFormElement>, value = input) => {
    event?.preventDefault();
    const question = value.trim();
    if (!question) return;
    setMessages((current) => [...current, { from: 'visitor', text: question }, { from: 'assistant', text: getReply(question) }]);
    setInput('');
  };

  const pointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--pointer-x', String(x * 14) + 'px');
    event.currentTarget.style.setProperty('--pointer-y', String(y * 10) + 'px');
  };

  return <section className="hero-shell phase-two-hero" id="home" onMouseMove={pointerMove}>
    <div className="phase-two-grid" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
    <div className="phase-two-ambient ambient-left" /><div className="phase-two-ambient ambient-right" />
    <header className="site-header wrap phase-two-header">
      <a className="brand phase-two-brand" href="#home" aria-label="Zeeshan Jehangir home"><span className="brand-mark">Z<span>.</span></span><span className="brand-copy">Zeeshan Jehangir<small>SEO &amp; AI DIGITAL GROWTH</small></span></a>
      <button className="mobile-menu-button phase-two-menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'main-nav phase-two-nav open' : 'main-nav phase-two-nav'} aria-label="Main navigation">
        {[['Home', '#home'], ['About', '#about'], ['Expertise', '#expertise'], ['Projects', '#projects'], ['Experience', '#experience'], ['Contact', '#contact']].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <a className="header-cta phase-two-header-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
    </header>

    <div className="phase-two-content wrap">
      <div className="phase-two-copy">
        <div className="phase-two-eyebrow"><span /> STRATEGY • SEARCH • INTELLIGENCE</div>
        <p className="phase-two-name">Hello, I’m <strong>Zeeshan Jehangir</strong></p>
        <p className="phase-two-role">SEO &amp; AI Digital Growth Specialist</p>
        <h1>Turning Digital Challenges Into <em>Measurable Growth.</em></h1>
        <p className="phase-two-description">I help businesses grow through strategic SEO, intelligent digital marketing and AI-powered solutions.</p>
        <div className="phase-two-actions"><a className="phase-two-primary" href="#projects">Explore My Work <ArrowUpRight size={17} /></a><a className="phase-two-secondary" href="#contact">Let’s Talk <ArrowRight size={17} /></a></div>
        <div className="phase-two-proof"><span className="proof-mark"><Sparkles size={15} /></span><p>Built around strategy, clarity<br /><strong>and measurable business outcomes.</strong></p></div>
      </div>
      <div className="phase-two-visual">
        <CharacterSequence reducedMotion={reducedMotion} onCalloutHighlight={setAssistantCalloutActive} />
        <RobotAssistant highlighted={assistantCalloutActive} onOpen={() => setChatOpen(true)} />
        <div className="visual-data-card data-card-top"><span>01 / SEARCH</span><b>Organic visibility</b><i>↗</i></div>
        <div className="visual-data-card data-card-bottom"><span>02 / INTELLIGENCE</span><b>AI-enabled growth</b><i>✳</i></div>
      </div>
    </div>

    <a className="phase-two-scroll" href="#about"><span className="scroll-ring"><ArrowDown size={15} /></span><span>SCROLL TO EXPLORE</span><i /></a>
    <div className="phase-two-index" aria-hidden="true">01 <span>/</span> 05</div>

    {chatOpen && <div className="phase-two-chat-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setChatOpen(false); }}>
      <section className="phase-two-chat" role="dialog" aria-modal="true" aria-labelledby="assistant-title">
        <header><span className="chat-bot-icon"><Bot size={20} /></span><div><strong id="assistant-title">Zeeshan’s AI Assistant</strong><small><i /> Portfolio guide · instant replies</small></div><button type="button" onClick={() => setChatOpen(false)} aria-label="Close assistant"><X size={18} /></button></header>
        <div className="phase-two-chat-messages" aria-live="polite">
          {messages.map((message, index) => <p key={String(index) + '-' + message.from} className={message.from === 'visitor' ? 'chat-message visitor-message' : 'chat-message assistant-message'}>{message.text}</p>)}
          <div className="chat-suggestions"><button type="button" onClick={() => send(undefined, 'What SEO services do you offer?')}>SEO services</button><button type="button" onClick={() => send(undefined, 'Tell me about AI automation')}>AI automation</button></div>
        </div>
        <form className="phase-two-chat-form" onSubmit={(event) => send(event)}>
          <label className="sr-only" htmlFor="assistant-message">Your message</label>
          <input id="assistant-message" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about SEO, AI or projects…" />
          <button type="submit" aria-label="Send message" disabled={!input.trim()}><Send size={17} /></button>
        </form>
      </section>
    </div>}
  </section>;
}
