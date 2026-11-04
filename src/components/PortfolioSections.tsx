import { ArrowUpRight, BriefcaseBusiness, BarChart3, Briefcase, Code2, ExternalLink, Globe2, MapPin, Search, Sparkles, Zap } from 'lucide-react';

const services = [
  { icon: Search, number: '01', title: 'SEO & Organic Growth', text: 'Technical SEO, on-page optimization, keyword research, content structure and search visibility improvements built around real user intent.' },
  { icon: MapPin, number: '02', title: 'Local SEO & Google Business Profile', text: 'Google Business Profile optimization, local landing pages, category and service alignment, citation consistency and review strategy.' },
  { icon: BarChart3, number: '03', title: 'Performance Marketing', text: 'Campaign planning and optimization across Google Ads and Meta Ads, with attention to conversion paths and lead quality.' },
  { icon: Zap, number: '04', title: 'AI Automation & Chat Experiences', text: 'Practical AI assistants, WhatsApp workflows and automation concepts that make customer journeys and daily operations more efficient.' },
  { icon: Code2, number: '05', title: 'Websites & Digital Experiences', text: 'WordPress and Elementor websites, Shopify storefronts, technical foundations, responsive layouts and conversion-focused improvements.' },
  { icon: Sparkles, number: '06', title: 'Content & Brand Strategy', text: 'Content planning, social media strategy, creative direction and brand communication designed to build trust over time.' },
];

const projects = [
  { name: 'Khatana Rent A Car', category: 'Local SEO · Gujrat, Pakistan', summary: 'Local search presence and Google Business Profile optimization for a car rental business, including service relevance and local visibility foundations.', tags: ['Google Business Profile', 'Local SEO', 'Service optimization'] },
  { name: 'Ashraf Pharmacy', category: 'Local SEO · Pakistan', summary: 'Business profile accuracy and completeness improvements, including service information, attributes, opening hours and customer contact options.', tags: ['Profile optimization', 'Services & attributes', 'NAP accuracy'] },
  { name: 'Jetons General Contracting', category: 'Digital presence · UAE', summary: 'Digital marketing and search visibility support for a general contracting business, with an emphasis on clear service positioning.', tags: ['SEO', 'Business positioning', 'Content'] },
  { name: 'Medhaven Health', category: 'Website strategy · Healthcare', summary: 'Website review and improvement planning focused on clarity, usability, search foundations and a more effective digital experience.', tags: ['Website audit', 'SEO foundations', 'UX'] },
  { name: 'Jahangir Pharmacy Plus', category: 'Local SEO · Manga Mandi', summary: 'Google Business Profile setup and optimization work to improve business information, service discovery and local presence.', tags: ['Google Business Profile', 'Local discovery', 'Profile accuracy'] },
  { name: 'Arif Laboratory & Digital X-Ray Center', category: 'Local SEO · Healthcare', summary: 'Local business profile optimization for a diagnostic laboratory, focused on accurate business details and service visibility.', tags: ['Local SEO', 'Healthcare services', 'Business profile'] },
];

const experience = [
  { role: 'SEO & Google Ads Manager', company: 'SS Metal Engineering', period: 'Oct 2024 — Apr 2025', place: 'UAE', detail: 'Managed search visibility and paid search activity for an engineering business.' },
  { role: 'Marketing Manager', company: 'Landlords Real Estate', period: 'Feb 2022 — Sep 2023', place: 'Lahore, Pakistan', detail: 'Supported marketing execution and digital communication for a real estate business.' },
  { role: 'Independent SEO & Digital Marketing Specialist', company: 'Freelance / Client Projects', period: 'Ongoing', place: 'Remote', detail: 'Working across SEO, local search, websites, paid campaigns, content and practical AI-enabled workflows.' },
];

export default function PortfolioSections() {
  return <>
    <section className="portfolio-section about-section" id="about">
      <div className="section-heading"><span className="section-kicker">01 — ABOUT</span><h2>Good marketing starts with<br/><em>understanding the business.</em></h2></div>
      <div className="about-grid"><div className="about-lead"><p className="lead-copy">I’m a digital growth specialist working at the intersection of search, strategy and emerging technology.</p><p className="body-copy">My approach is practical: understand the business, identify what is holding its digital presence back, and prioritize improvements that can be measured. That may mean strengthening technical SEO, improving local discovery, refining a website journey or building a useful AI-assisted workflow.</p><a className="text-link" href="https://www.linkedin.com/in/zeeshanjehangir" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={16}/></a></div><div className="principles-grid"><article><span>01</span><b>Clarity before tactics</b><p>Understand the audience and business goal before choosing channels.</p></article><article><span>02</span><b>Useful over fashionable</b><p>Use technology when it solves a real problem, not just because it is new.</p></article><article><span>03</span><b>Measure what matters</b><p>Prioritize qualified leads, visibility and experience over vanity metrics.</p></article><article><span>04</span><b>Build for the long term</b><p>Strengthen foundations that keep supporting growth after launch.</p></article></div></div>
    </section>

    <section className="portfolio-section services-section" id="expertise">
      <div className="section-heading"><span className="section-kicker">02 — EXPERTISE</span><h2>Connected services.<br/><em>One growth objective.</em></h2><p>From search fundamentals to AI-assisted experiences, each service supports a clearer and more effective digital presence.</p></div>
      <div className="services-grid">{services.map((item)=><article className="service-card" key={item.number}><div className="service-card-top"><span className="service-icon"><item.icon size={20}/></span><span className="service-number">{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p><span className="service-line"/></article>)}</div>
    </section>

    <section className="portfolio-section projects-section" id="projects">
      <div className="section-heading section-heading-row"><div><span className="section-kicker">03 — SELECTED WORK</span><h2>Practical work.<br/><em>Real business context.</em></h2></div><p>Selected examples of client and website work. Project descriptions focus on delivered areas of work rather than unverified performance claims.</p></div>
      <div className="projects-grid">{projects.map((project,index)=><article className="project-card" key={project.name}><div className="project-visual"><span className="project-index">0{index+1}</span><span className="project-visual-label">{project.category}</span><div className="project-visual-mark">{index===0?<MapPin/>:index===1?<Sparkles/>:index===2?<Briefcase/>:<Globe2/>}</div><span className="project-visual-word">{project.name.split(' ')[0]}</span></div><div className="project-info"><h3>{project.name}</h3><p>{project.summary}</p><div className="project-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div></article>)}</div>
      <p className="project-disclaimer">Client names are shown as portfolio references. Detailed screenshots, analytics and confidential materials are not published here.</p>
    </section>

    <section className="portfolio-section experience-section" id="experience">
      <div className="section-heading"><span className="section-kicker">04 — EXPERIENCE</span><h2>Experience shaped by<br/><em>strategy and execution.</em></h2></div>
      <div className="experience-list">{experience.map((item,index)=><article className="experience-item" key={item.company}><span className="experience-index">0{index+1}</span><div className="experience-main"><h3>{item.role}</h3><b>{item.company}</b><p>{item.detail}</p></div><div className="experience-meta"><strong>{item.period}</strong><span>{item.place}</span></div></article>)}</div>
      <div className="learning-strip"><div><span className="section-kicker">CONTINUOUS LEARNING</span><h3>Keeping strategy current as search and AI evolve.</h3></div><p>Professional learning includes digital marketing, critical thinking in the AI era, search optimization and practical AI tooling.</p></div>
      <div className="credential-card"><span className="credential-icon"><Sparkles size={20}/></span><div><span className="section-kicker">CERTIFICATION</span><h3>Digital Marketing Mastery Program</h3><p>Honhaar Jawan · Completed May 7, 2026</p></div><a href="https://honhaarjawan.pk/verify/HONHAAR-03D58213DC" target="_blank" rel="noreferrer">Verify credential <ArrowUpRight size={15}/></a></div>
    </section>

    <section className="portfolio-contact" id="contact"><div className="contact-orb"/><div className="contact-content"><span className="section-kicker">05 — LET’S CONNECT</span><h2>Have a growth challenge<br/>worth solving?</h2><p>Tell me what you are building, improving or trying to solve. Let’s explore a practical next step.</p><div className="contact-actions"><a className="contact-primary" href="https://www.linkedin.com/in/zeeshanjehangir" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={17}/></a><a className="contact-secondary" href="https://www.facebook.com/share/1DT9QHGfSE/" target="_blank" rel="noreferrer">Find me on Facebook <ExternalLink size={15}/></a></div></div><div className="contact-decoration"><span>Z.</span><small>LET’S BUILD<br/>SOMETHING USEFUL.</small></div></section>
    <footer className="portfolio-footer"><a className="footer-brand" href="#home">Zeeshan Jehangir<span>.</span></a><span>SEO &amp; AI Digital Growth Specialist</span><a className="dme-affiliation" href="https://www.facebook.com/share/1DT9QHGfSE/" target="_blank" rel="noreferrer">Digi Marketing Experts ↗</a><a href="#home">Back to top ↑</a><small>© {new Date().getFullYear()} Zeeshan Jehangir. Built with purpose.</small></footer>
  </>;
}
