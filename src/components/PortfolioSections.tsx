'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BarChart3, BadgeCheck, BriefcaseBusiness, Building2,
  CarFront, ChartNoAxesCombined, Code2, ExternalLink, Globe2, Layers, MapPin,
  Megaphone, Monitor, Palette, Search, ShoppingBag, Sparkles, Stethoscope,
  Store, Target, TrendingUp, Video, Zap,
} from 'lucide-react';

const services = [
  { icon: Search, number: '01', title: 'SEO & Organic Growth', text: 'Technical SEO, on-page optimization, keyword research, content structure, indexing and search visibility improvements built around real user intent.' },
  { icon: MapPin, number: '02', title: 'Local SEO & Google Business Profile', text: 'Google Business Profile optimization, service and category alignment, local landing pages, citation consistency and review strategy.' },
  { icon: BarChart3, number: '03', title: 'Google Ads & Performance Marketing', text: 'Campaign planning, search advertising, audience targeting, conversion tracking and optimization with attention to lead quality.' },
  { icon: Zap, number: '04', title: 'AI Automation & Chat Experiences', text: 'Practical AI assistants, WhatsApp workflows and automation concepts that improve customer experience and reduce repetitive work.' },
  { icon: Code2, number: '05', title: 'Websites & Digital Experiences', text: 'WordPress and Elementor websites, Shopify storefronts, responsive layouts, technical foundations and conversion-focused improvements.' },
  { icon: Palette, number: '06', title: 'Branding & Creative Production', text: 'Visual identity, social media creatives, menus, business collateral, promotional graphics and content direction.' },
];

type Category = 'All' | 'SEO & Local' | 'Paid Ads' | 'Websites' | 'Branding & Creative';
type Project = { name: string; category: Exclude<Category, 'All'>; descriptor: string; summary: string; tags: string[]; icon: typeof Search; tone: string; featured?: boolean };

const projects: Project[] = [
  { name: 'Arif Laboratory & Digital X-Ray Center', category: 'SEO & Local', descriptor: 'Local SEO · Healthcare', summary: 'Google Business Profile optimization for a diagnostic laboratory, focused on accurate business information, service discovery and local search visibility.', tags: ['Google Business Profile', 'Local SEO', 'Healthcare'], icon: Stethoscope, tone: 'medical', featured: true },
  { name: 'Ashraf Pharmacy', category: 'SEO & Local', descriptor: 'Local SEO · Pharmacy', summary: 'Profile completeness and accuracy improvements, including services, attributes, opening hours, contact options and customer discovery.', tags: ['Profile optimization', 'Services & attributes', 'Local discovery'], icon: Store, tone: 'pharmacy', featured: true },
  { name: 'Beam Concrete Works', category: 'SEO & Local', descriptor: 'Local SEO · UAE', summary: 'Google Business Profile and local presence work for a concrete and construction business, supported by profile performance evidence.', tags: ['Local visibility', 'Business profile', 'UAE'], icon: Building2, tone: 'construction', featured: true },
  { name: 'Khatana Rent A Car', category: 'SEO & Local', descriptor: 'Local SEO · Gujrat, Pakistan', summary: 'Local search presence and Google Business Profile optimization for a car rental business, including service relevance and local visibility foundations.', tags: ['Google Business Profile', 'Local SEO', 'Car rental'], icon: CarFront, tone: 'mobility', featured: true },
  { name: 'Jahangir Pharmacy Plus', category: 'SEO & Local', descriptor: 'Local SEO · Manga Mandi', summary: 'Google Business Profile setup and optimization work to improve business information, service discovery and local presence.', tags: ['Google Business Profile', 'Local discovery', 'Profile accuracy'], icon: Store, tone: 'pharmacy' },
  { name: 'Jetons General Contracting', category: 'SEO & Local', descriptor: 'Digital presence · UAE', summary: 'Digital marketing and search visibility support for a general contracting business, with an emphasis on clear service positioning.', tags: ['SEO', 'Business positioning', 'Content'], icon: Building2, tone: 'construction' },
  { name: 'Stedge Sports', category: 'SEO & Local', descriptor: 'SEO · Search Console evidence', summary: 'Search visibility and website SEO work documented through Google Search Console performance snapshots and sitemap evidence.', tags: ['SEO performance', 'Search Console', 'Indexing'], icon: TrendingUp, tone: 'sports', featured: true },
  { name: 'Beaconlight Enterprise', category: 'Websites', descriptor: 'Website · Corporate', summary: 'Corporate website experience with homepage, company information and contact-page presentation.', tags: ['Website design', 'Corporate', 'Multi-page'], icon: Monitor, tone: 'corporate' },
  { name: 'Build With Folashade', category: 'Websites', descriptor: 'Website · Personal brand', summary: 'Personal brand website with multiple content and information pages.', tags: ['Web design', 'Personal brand', 'Responsive pages'], icon: Globe2, tone: 'personal' },
  { name: 'Dorothea Watson', category: 'Websites', descriptor: 'Website · Professional presence', summary: 'Professional website presentation with supporting information and contact pages.', tags: ['Website design', 'Content structure', 'UX'], icon: Globe2, tone: 'personal' },
  { name: 'Great North Peptides', category: 'Websites', descriptor: 'Website · E-commerce', summary: 'E-commerce website page set including home, about, product listing, contact and policy pages.', tags: ['E-commerce', 'Product pages', 'Website structure'], icon: ShoppingBag, tone: 'commerce' },
  { name: 'Katharos Lab', category: 'Websites', descriptor: 'Website · Laboratory', summary: 'Laboratory-focused website presentation with home, about and contact page examples.', tags: ['Website design', 'Healthcare / lab', 'UX'], icon: Stethoscope, tone: 'medical' },
  { name: 'Medhaven Health', category: 'Websites', descriptor: 'Website · Healthcare', summary: 'Healthcare website review and improvement work focused on clarity, usability, search foundations and a more effective digital experience.', tags: ['Website strategy', 'Healthcare', 'SEO foundations'], icon: Stethoscope, tone: 'medical' },
  { name: 'Mouvjn', category: 'Websites', descriptor: 'Website · Organization', summary: 'Multi-page organization website presentation with program, about and resource content.', tags: ['Website design', 'Programs', 'Content structure'], icon: Globe2, tone: 'organization' },
  { name: 'Official ChargePod', category: 'Websites', descriptor: 'Website · Technology', summary: 'Technology and product website presentation with home, about and contact pages.', tags: ['Website design', 'Technology', 'Product positioning'], icon: Zap, tone: 'technology' },
  { name: 'Westbrook Taylor Legacy', category: 'Websites', descriptor: 'Website · Business', summary: 'Business website presentation with homepage and supporting information pages.', tags: ['Website design', 'Brand presence', 'Responsive'], icon: Building2, tone: 'corporate' },
  { name: 'Womenpreneur Me', category: 'Websites', descriptor: 'Website · Community', summary: 'Community and entrepreneurship platform pages including business, aspiring and news content.', tags: ['Website design', 'Community', 'Programs'], icon: Globe2, tone: 'community' },
  { name: 'Womenpreneur Summit', category: 'Websites', descriptor: 'Website · Event platform', summary: 'Summit website and event information pages designed to organize event content and visitor journeys.', tags: ['Website design', 'Event pages', 'Content'], icon: Target, tone: 'community' },
  { name: 'B2B Google Ads Campaign', category: 'Paid Ads', descriptor: 'Paid search · B2B', summary: 'Campaign dashboard evidence covering conversions, impressions, average CPC and spend for a B2B advertising period.', tags: ['Google Ads', 'B2B', 'Campaign measurement'], icon: Megaphone, tone: 'ads', featured: true },
  { name: 'Clothing Google Ads Campaign', category: 'Paid Ads', descriptor: 'Paid search · E-commerce', summary: 'Google Ads campaign snapshot for a clothing business, with reported conversions, impressions, average CPC and campaign cost.', tags: ['Google Ads', 'Retail', 'Performance'], icon: ShoppingBag, tone: 'commerce', featured: true },
  { name: 'Logo & Identity Design', category: 'Branding & Creative', descriptor: 'Branding · Visual identity', summary: 'Selected logo and identity explorations for businesses and product brands.', tags: ['Logo design', 'Identity', 'Brand assets'], icon: Palette, tone: 'creative' },
  { name: 'Menus & Food Promotions', category: 'Branding & Creative', descriptor: 'Creative · Food & hospitality', summary: 'Restaurant menus, food promotion graphics and campaign creative for hospitality businesses.', tags: ['Menu design', 'Promotional graphics', 'Social creative'], icon: Store, tone: 'food' },
  { name: 'Business Cards & Collateral', category: 'Branding & Creative', descriptor: 'Creative · Business collateral', summary: 'Business cards, QR review cards, invoice layouts and customer-facing printed collateral.', tags: ['Business cards', 'QR collateral', 'Print design'], icon: BriefcaseBusiness, tone: 'creative' },
  { name: 'Invitations & Event Creative', category: 'Branding & Creative', descriptor: 'Creative · Events', summary: 'Wedding, Mehndi and corporate invitation designs, plus event-oriented visual assets.', tags: ['Invitation design', 'Event creative', 'Print design'], icon: Sparkles, tone: 'events' },
  { name: 'Promotional Videos', category: 'Branding & Creative', descriptor: 'Motion · Short-form video', summary: 'A small selection of promotional and event video work included in the supplied creative archive.', tags: ['Video editing', 'Promotional content', 'Motion'], icon: Video, tone: 'motion' },
];

const categories: Category[] = ['All', 'SEO & Local', 'Paid Ads', 'Websites', 'Branding & Creative'];

const experience = [
  { role: 'SEO & Google Ads Manager', company: 'SS Metal Engineering', period: 'Oct 2024 — Apr 2025', place: 'UAE', detail: 'Managed search visibility and paid search activity for an engineering business.' },
  { role: 'Marketing Manager', company: 'Landlords Real Estate', period: 'Feb 2022 — Sep 2023', place: 'Lahore, Pakistan', detail: 'Supported marketing execution and digital communication for a real estate business.' },
  { role: 'Independent SEO & Digital Marketing Specialist', company: 'Freelance / Client Projects', period: 'Ongoing', place: 'Remote', detail: 'Working across SEO, local search, websites, paid campaigns, content and practical AI-enabled workflows.' },
];

const localResults = [
  { name: 'Arif Laboratory', value: '327', label: 'Profile interactions', change: '+35.7%', detail: 'Compared with the prior-year period shown in the supplied dashboard.' },
  { name: 'Ashraf Pharmacy', value: '246', label: 'Profile interactions', change: '+421.2%', detail: 'Large year-over-year change shown in the supplied dashboard; validate before external claims.' },
  { name: 'Beam Concrete Works', value: '816', label: 'Profile interactions', change: null, detail: 'Profile performance snapshot in the supplied archive.' },
  { name: 'Khatana Rent A Car', value: '307', label: 'Profile interactions', change: '+3.4%', detail: 'Compared with the prior-year period shown in the supplied dashboard.' },
];

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  return <div className={`project-art project-art-${project.tone}`}>
    <div className="project-art-top"><span>SELECTED WORK / {String(index + 1).padStart(2, '0')}</span><span className="project-art-dot"/></div>
    <div className="project-art-center"><span className="project-art-icon"><Icon size={29}/></span><strong>{project.name}</strong><small>{project.descriptor}</small></div>
    <div className="project-art-bottom"><span>{project.category}</span><span className="project-art-lines"><i/><i/><i/></span></div>
  </div>;
}

export default function PortfolioSections() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = useMemo(() => {
    const filtered = activeCategory === 'All' ? projects : projects.filter((project) => project.category === activeCategory);
    return showAll || activeCategory !== 'All' ? filtered : filtered.filter((project) => project.featured).concat(filtered.filter((project) => !project.featured).slice(0, 3));
  }, [activeCategory, showAll]);

  return <>
    <section className="portfolio-section about-section" id="about">
      <div className="section-heading"><span className="section-kicker">01 — ABOUT</span><h2>Good marketing starts with<br/><em>understanding the business.</em></h2></div>
      <div className="about-grid"><div className="about-lead"><p className="lead-copy">I’m Zeeshan Jehangir — an SEO and AI digital growth specialist working at the intersection of search, strategy and emerging technology.</p><p className="body-copy">I help businesses strengthen their digital presence through search visibility, local discovery, paid campaigns, website experiences and practical AI-enabled workflows. My approach is grounded in understanding the business first, then prioritizing improvements that can be measured and maintained.</p><p className="body-copy">Alongside my independent client work, I build and develop ideas through Digi Marketing Experts (DME), my digital marketing brand.</p><a className="text-link" href="https://www.linkedin.com/in/zeeshanjehangir" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={16}/></a></div><div className="principles-grid"><article><span>01</span><b>Clarity before tactics</b><p>Understand the audience and business goal before choosing channels.</p></article><article><span>02</span><b>Useful over fashionable</b><p>Use technology when it solves a real problem, not just because it is new.</p></article><article><span>03</span><b>Measure what matters</b><p>Prioritize qualified leads, visibility and experience over vanity metrics.</p></article><article><span>04</span><b>Build for the long term</b><p>Strengthen foundations that keep supporting growth after launch.</p></article></div></div>
      <div className="about-facts"><span><b>SEO</b> Search visibility</span><span><b>GBP</b> Local discovery</span><span><b>ADS</b> Performance marketing</span><span><b>AI</b> Practical automation</span><span><b>WEB</b> Digital experiences</span></div>
    </section>

    <section className="portfolio-section services-section" id="expertise">
      <div className="section-heading"><span className="section-kicker">02 — EXPERTISE</span><h2>Connected services.<br/><em>One growth objective.</em></h2><p>From search fundamentals to AI-assisted experiences, each service supports a clearer and more effective digital presence.</p></div>
      <div className="services-grid">{services.map((item)=><article className="service-card" key={item.number}><div className="service-card-top"><span className="service-icon"><item.icon size={20}/></span><span className="service-number">{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p><span className="service-line"/></article>)}</div>
      <div className="services-note"><span><BadgeCheck size={17}/> Strategy-led execution</span><span><Target size={17}/> Business-first priorities</span><span><ChartNoAxesCombined size={17}/> Evidence-aware reporting</span></div>
    </section>

    <section className="portfolio-section proof-section" id="results">
      <div className="section-heading section-heading-row"><div><span className="section-kicker">03 — PERFORMANCE SNAPSHOTS</span><h2>Evidence from the work.<br/><em>Context behind the numbers.</em></h2></div><p>Selected figures transcribed from supplied Google Business Profile and Search Console screenshots. These are dashboard snapshots, not independently audited results.</p></div>
      <div className="proof-grid">{localResults.map((result)=><article className="proof-card" key={result.name}><div className="proof-card-top"><span><MapPin size={16}/>{result.name}</span><span className="proof-source">GBP</span></div><strong className="proof-number">{result.value}</strong><span className="proof-label">{result.label}</span><div className="proof-change">{result.change ? <><TrendingUp size={15}/>{result.change} <small>shown comparison</small></> : <><BarChart3 size={15}/>Performance snapshot</>}</div><p>{result.detail}</p></article>)}</div>
      <div className="proof-secondary">
        <article className="search-proof"><div className="proof-secondary-heading"><span className="proof-mini-icon"><Search size={18}/></span><div><small>SEARCH CONSOLE · STEDGE SPORTS</small><h3>Organic search visibility snapshot</h3></div></div><div className="search-proof-stats"><div><strong>111</strong><span>Clicks · 3 months</span></div><div><strong>3.17K</strong><span>Impressions</span></div><div><strong>3.5%</strong><span>CTR</span></div><div><strong>32.4</strong><span>Average position</span></div></div><p>Also included in the archive: 7-day and 28-day reporting views. Figures reflect the captured Search Console period, not a guaranteed ongoing result.</p></article>
        <article className="ads-proof"><div className="proof-secondary-heading"><span className="proof-mini-icon"><Megaphone size={18}/></span><div><small>GOOGLE ADS · CAMPAIGN SNAPSHOTS</small><h3>Paid campaign reporting</h3></div></div><div className="ads-proof-row"><span>B2B campaign</span><strong>66 reported conversions</strong></div><div className="ads-proof-row"><span>Clothing campaign</span><strong>170 reported conversions</strong></div><p>Conversion definitions, lead quality and account attribution should be validated before these figures are used as outcome claims.</p></article>
      </div>
      <p className="project-disclaimer">Profile interactions are not the same as qualified leads. All figures should be checked against the original client account and reporting window before being used in proposals or paid promotion.</p>
    </section>

    <section className="portfolio-section projects-section" id="projects">
      <div className="section-heading section-heading-row"><div><span className="section-kicker">04 — PORTFOLIO</span><h2>Selected work.<br/><em>Across digital growth.</em></h2></div><p>Explore client projects, website builds, campaign work and creative deliverables. Each card describes the evidence available in the supplied portfolio archive.</p></div>
      <div className="portfolio-filters" role="group" aria-label="Filter portfolio projects">{categories.map((category)=><button type="button" key={category} className={activeCategory === category ? 'portfolio-filter is-active' : 'portfolio-filter'} onClick={()=>{setActiveCategory(category);setShowAll(false);}}>{category}<span>{category === 'All' ? projects.length : projects.filter((project)=>project.category===category).length}</span></button>)}</div>
      <div className="projects-grid projects-grid-expanded">{visibleProjects.map((project,index)=><article className="project-card project-card-expanded" key={project.name}><ProjectVisual project={project} index={index}/><div className="project-info"><span className="project-category">{project.descriptor}</span><h3>{project.name}</h3><p>{project.summary}</p><div className="project-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div></article>)}</div>
      {activeCategory === 'All' && <div className="portfolio-more"><span>Showing {visibleProjects.length} of {projects.length} selected projects</span><button type="button" onClick={()=>setShowAll((value)=>!value)}>{showAll ? 'Show featured work' : 'Explore all projects'} <ArrowRight size={16}/></button></div>}
      <p className="project-disclaimer">Some entries are visual work samples rather than full case studies. Client names and performance evidence should only be published with the appropriate permission.</p>
    </section>

    <section className="portfolio-section experience-section" id="experience">
      <div className="section-heading"><span className="section-kicker">05 — EXPERIENCE</span><h2>Experience shaped by<br/><em>strategy and execution.</em></h2></div>
      <div className="experience-list">{experience.map((item,index)=><article className="experience-item" key={item.company}><span className="experience-index">0{index+1}</span><div className="experience-main"><h3>{item.role}</h3><b>{item.company}</b><p>{item.detail}</p></div><div className="experience-meta"><strong>{item.period}</strong><span>{item.place}</span></div></article>)}</div>
      <div className="learning-strip"><div><span className="section-kicker">CONTINUOUS LEARNING</span><h3>Keeping strategy current as search and AI evolve.</h3></div><p>Professional learning includes digital marketing, critical thinking in the AI era, search optimization and practical AI tooling.</p></div>
      <div className="credential-grid"><article className="credential-card"><span className="credential-icon"><Sparkles size={20}/></span><div><span className="section-kicker">CERTIFICATION</span><h3>Digital Marketing Mastery Program</h3><p>Honhaar Jawan · Completed May 7, 2026</p></div><a href="https://honhaarjawan.pk/verify/HONHAAR-03D58213DC" target="_blank" rel="noreferrer">Verify credential <ArrowUpRight size={15}/></a></article><article className="credential-card"><span className="credential-icon"><BadgeCheck size={20}/></span><div><span className="section-kicker">CERTIFICATION</span><h3>Critical Thinking in the AI Era</h3><p>Professional learning · AI-era critical thinking</p></div></article></div>
    </section>

    <section className="portfolio-contact" id="contact"><div className="contact-orb"/><div className="contact-content"><span className="section-kicker">06 — LET’S CONNECT</span><h2>Have a growth challenge<br/>worth solving?</h2><p>Tell me what you are building, improving or trying to solve. Let’s explore a practical next step.</p><div className="contact-actions"><a className="contact-primary" href="https://www.linkedin.com/in/zeeshanjehangir" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={17}/></a><a className="contact-secondary" href="https://www.facebook.com/share/1DT9QHGfSE/" target="_blank" rel="noreferrer">Find me on Facebook <ExternalLink size={15}/></a></div><div className="contact-dme">Independent specialist · Building through <strong>Digi Marketing Experts</strong></div></div><div className="contact-decoration"><span>Z.</span><small>LET’S BUILD<br/>SOMETHING USEFUL.</small></div></section>
    <footer className="portfolio-footer"><a className="footer-brand" href="#home">Zeeshan Jehangir<span>.</span></a><span>SEO &amp; AI Digital Growth Specialist</span><a className="dme-affiliation" href="https://www.facebook.com/share/1DT9QHGfSE/" target="_blank" rel="noreferrer">Digi Marketing Experts ↗</a><a href="#home">Back to top ↑</a><small>© {new Date().getFullYear()} Zeeshan Jehangir. Built with purpose.</small></footer>
  </>;
}
