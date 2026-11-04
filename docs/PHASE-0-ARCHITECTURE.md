# Phase 0 Architecture — Zeeshan Jehangir Portfolio

**Status:** Revised for design review — not approved for implementation  
**Owner / personal brand:** Zeeshan Jehangir  
**Professional positioning:** SEO & AI Digital Growth Specialist  
**Agency affiliation:** Digi Marketing Experts (DME)  
**Repository:** rzeeshan296-arch/Zeeshan-Jehangir  
**Default branch:** main

## 1. Purpose and scope

Plan a premium, responsive personal portfolio that communicates Zeeshan Jehangir's expertise in SEO, local search, AI-enabled digital growth and digital marketing. This document defines the architecture and experience; it does not authorize full implementation or deployment.

The uploaded portrait is the primary human identity reference. The accompanying office composition is a visual-direction reference only. It is not the final 3D model and must not be treated as a finished production asset.

## 2. Approved creative direction

- Personal brand: **Zeeshan Jehangir**.
- Positioning: **SEO & AI Digital Growth Specialist**.
- Agency relationship: **Digi Marketing Experts (DME)** is an affiliation, not the primary site identity.
- Visual language: premium editorial, photography-inspired, polished and credible.
- Palette: white, ice blue, royal blue and deep navy. This supersedes the earlier dusty-rose proposal.
- Character: highly realistic, human-like 3D digital representation based on the user's uploaded photograph.
- Outfit and scene: professional navy-blue clothing; premium white-and-blue office; laptop.
- Explicitly avoid cartoon, Pixar-like styling, exaggerated anatomy or facial features, and generic stock-avatar appearance.

## 3. Recommended application architecture

Use Next.js App Router, React and TypeScript, with reusable server-rendered page sections and narrowly scoped client components for interactions.

| Layer | Recommendation | Rationale |
|---|---|---|
| Framework | Next.js App Router | Routing, metadata, static rendering and Netlify compatibility |
| Language | TypeScript | Safer reusable content and component contracts |
| UI | React | Component-based interface |
| Styling | Tailwind CSS + CSS variables | Centralized tokens and responsive layout |
| Motion | Motion for React (Framer Motion) | Accessible UI transitions and state orchestration |
| 3D | Three.js + React Three Fiber + Drei | Replaceable GLB/GLTF model and animation control |
| Icons | Lucide React | Consistent lightweight iconography |
| Content | Typed local data / MDX if needed | Avoid backend complexity for the initial portfolio |
| Forms | Netlify Forms or an explicitly selected compatible endpoint | Low-maintenance enquiry capture |
| Hosting | Netlify with its supported Next.js adapter | Git-based deploy previews and production deploys |

Prefer static generation for public portfolio content. Do not add a database, authentication, CMS or custom backend unless a later requirement demonstrates a real need.

Pin a supported Node LTS version and package versions during Phase 1. Confirm the then-current Netlify Next.js adapter guidance before configuring production deployment; do not rely on a stale adapter recipe.

## 4. Information architecture

Proposed routes:

- / — Home
- /about/ — About and professional background
- /services/ — Service overview
- /projects/ — Portfolio index
- /projects/[slug]/ — Individual case studies
- /certifications/ — Verified credentials
- /contact/ — Enquiry details and form

Proposed case-study candidates, subject to verification, permission and available evidence:

- Khatana Rent A Car
- SS Metal Engineering
- Jetons General Contracting
- Jahangir Pharmacy Plus
- Ashraf Pharmacy
- Arif Laboratory & Digital X-Ray Center

Each case study should explain context, challenge, scope, work performed, tools and verified outcomes. If analytics or before/after evidence is unavailable, describe the deliverables and process without implying measured growth.

## 5. Hero and 3D character system

### Identity and asset direction

The uploaded photograph is the identity reference for the character's recognizable appearance. Preserve, to the extent supported by the modeling and rendering workflow:

- facial identity and proportions;
- hairstyle and hairline;
- beard shape and density;
- complexion and natural skin characteristics;
- overall recognizable likeness.

The character must wear professional navy-blue clothing and appear in a premium white-and-blue office working behind a laptop. Use realistic human proportions, restrained expression and natural movement. No stylized/cartoon reinterpretation.

The final model is a separately replaceable GLB/GLTF asset. Keep model loading, animation state control and fallback rendering behind a dedicated component boundary. Do not hard-code application layout around a particular model rig.

### Planned interaction states

The hero experience should support these named states:

1. **Idle / working** — subtle breathing, natural posture and restrained typing or working motion.
2. **Look left** — controlled head and eye gaze toward the left.
3. **Look right** — controlled head and eye gaze toward the right.
4. **Greeting** — brief natural acknowledgement.
5. **Waving** — a clear but restrained hand wave.
6. **Pointing down** — a natural downward gesture, optionally coordinated with a visual cue to scroll.

Transitions must be smooth, non-disorienting and interruptible. Pointer-driven gaze may be used only as a subtle enhancement; it must not replace explicit state control. Provide sensible triggers and ensure the character does not wave or gesture continuously without user intent.

### Rig and implementation assumptions

- Prefer a professionally authored, rigged human model with named animation clips or a documented bone rig.
- Agree animation clip names and fallback behavior before integrating the asset.
- Use animation blending and controlled transition durations to avoid abrupt pose changes.
- Keep 3D loading client-side and lazy; avoid blocking initial text, navigation or primary CTA rendering.
- Provide loading, error and unsupported-device fallbacks.
- Do not promise exact facial likeness until the model is reviewed against the supplied reference.

### Static fallback and accessibility

For mobile devices and users who prefer reduced motion, render a carefully optimized static photographic fallback based on an approved portrait asset. The fallback should preserve the visual composition and identity without requiring WebGL. Respect prefers-reduced-motion, keyboard access and touch interaction. Core navigation and content must never depend on 3D.

## 6. Proposed source structure

- public/images/
- public/models/
- public/fonts/
- src/app/ (layout, home, about, services, projects/[slug], certifications, contact)
- src/components/ (layout, home, ui, portfolio, three)
- src/data/ (projects, services, experience)
- src/hooks/
- src/lib/
- src/styles/
- src/types/
- docs/ (Phase 0, design system, content, SEO/performance, deployment)

The above is a proposed structure, not a claim that these files or directories already exist.

## 7. Content and trust requirements

- Do not invent credentials, testimonials, client endorsements, rankings, traffic figures, revenue, conversion lifts or project outcomes.
- Use only credentials and dates that can be checked against supplied records.
- Obtain permission before publishing client logos, screenshots, confidential data or identifiable campaign details.
- Mark missing metrics as unavailable rather than filling gaps with estimates.
- Clearly distinguish completed client work from experiments, demonstrations and planned services.
- Keep DME affiliation factual and secondary to the personal brand.

## 8. SEO, performance and accessibility

### SEO
- Unique title and meta description per indexable route.
- Canonical URLs, XML sitemap and robots directives.
- Open Graph metadata and descriptive social preview image.
- Semantic landmarks, logical heading order and descriptive links.
- Breadcrumbs on nested project pages.
- Accurate Person and WebSite structured data; add service/project markup only where supported by visible page content.
- Descriptive image alternative text and meaningful filenames.
- Avoid keyword stuffing and unsupported claims.

### Performance targets
- Target Lighthouse Performance 90+ on representative production routes, measured on a documented test profile.
- Core Web Vitals targets: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1.
- Optimize responsive images (AVIF/WebP where appropriate), fonts and critical CSS.
- Lazy-load non-critical images and the 3D scene.
- Split the 3D bundle from the initial critical path; avoid loading WebGL until useful.
- Set sensible model texture, polygon and download budgets after the asset is available.
- Test both the full 3D experience and fallback experience on real mobile hardware.

### Accessibility
- Keyboard-operable navigation and controls.
- Visible focus styles and semantic buttons.
- Accessible labels and validation for forms.
- Adequate contrast in all palette combinations.
- Respect reduced-motion preferences.
- Provide text alternatives for meaningful visual information.
- No essential content or action should require a pointer or WebGL.

## 9. Netlify deployment plan (not yet configured)

- Connect the GitHub repository to Netlify after implementation approval.
- Use main as the production branch and deploy previews for pull requests.
- Build with the project's verified Next.js/Netlify adapter integration.
- Pin the Node LTS runtime consistently in local and Netlify environments.
- Store secrets only in Netlify environment variables; never commit secrets.
- Configure custom domain and HTTPS only when the domain is selected.
- Verify redirects, headers, sitemap, robots and form delivery before launch.
- Do not deploy until the owner approves the completed implementation and production QA.

## 10. Delivery phases

0. Architecture and design review (current; documentation only).
1. Project foundation and configuration.
2. Design tokens and shared components.
3. Responsive page layouts and content.
4. 3D character integration and accessible fallback.
5. Portfolio and case-study content.
6. SEO, metadata and structured data.
7. QA, accessibility and performance optimization.
8. Netlify preview, owner review and production release approval.

## 11. Phase 0 exit criteria

Phase 0 is ready for owner review when the architecture and design-system documents consistently reflect the approved identity, palette, character direction, animation states, fallbacks, route plan, content safeguards, SEO/performance targets and Netlify strategy.

**No full implementation, asset modeling, deployment or production release is authorized by this document.** Obtain explicit owner approval of the revised specification before beginning Phase 1.
