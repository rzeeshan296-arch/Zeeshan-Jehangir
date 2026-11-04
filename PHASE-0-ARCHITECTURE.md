# Phase 0 Architecture — Zeeshan Jehangir Portfolio

**Status:** Revised for review — documentation only  
**Date:** 2026-11-04  
**Repository:** `rzeeshan296-arch/Zeeshan-Jehangir`  
**Branch:** `main`

## 1. Project identity

- **Personal brand:** Zeeshan Jehangir
- **Professional positioning:** SEO & AI Digital Growth Specialist
- **Agency affiliation:** Digi Marketing Experts (DME)
- **Product:** Premium personal portfolio website
- **Visual direction:** Premium editorial, realistic photography-inspired rendering
- **Primary palette:** White, ice blue, royal blue and deep navy

This is a personal portfolio, not an agency website. DME should appear as a clear agency affiliation and relevant professional link without competing with the personal brand.

## 2. Approved visual and character direction

The user-approved uploaded photograph is the identity reference for the digital character. The generated office image is a composition and environment reference only; it is not the final 3D model.

The digital character must:
- Preserve recognizable facial identity and proportions from the supplied identity reference, including hairstyle, beard, complexion and overall facial structure.
- Wear professional navy-blue clothing.
- Be presented in a premium white-and-blue office environment with a laptop.
- Use highly realistic human-like 3D rendering with photography-inspired materials and lighting.
- Avoid cartoon, Pixar-like, exaggerated, toy-like or generic-avatar styling.

Identity fidelity is a visual acceptance requirement, not a guarantee that a generated model will perfectly reproduce a real person's appearance. The model and rendered previews must be reviewed and approved by the user before launch.

## 3. Recommended application architecture

Use a static-first Next.js application with the App Router, React and TypeScript, deployed on Netlify.

| Concern | Recommendation |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS with documented design tokens |
| Motion | Framer Motion for DOM/interface motion |
| 3D runtime | Three.js with React Three Fiber and Drei where useful |
| 3D asset format | GLB/GLTF |
| Icons | Lucide React |
| Content | Typed local data modules or MDX for case studies |
| Forms | Netlify Forms or a Netlify-compatible form endpoint |
| Hosting | Netlify using its supported Next.js integration/adapter |
| Source control | GitHub |

Prefer statically rendered pages and local content. A database, user accounts, CMS or custom backend are out of scope for the initial release unless separately approved.

Pin the Node.js version and dependencies consistently. Confirm the current Netlify Next.js runtime/build support when implementation begins; do not hard-code an obsolete adapter configuration based on assumptions.

## 4. Proposed application structure

```text
Zeeshan-Jehangir/
├── public/
│   ├── images/
│   ├── models/
│   │   └── character/          # Replaceable GLB/GLTF model and textures
│   ├── posters/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── services/
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   ├── certifications/
│   │   └── contact/
│   ├── components/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── portfolio/
│   │   ├── ui/
│   │   └── character/
│   ├── data/
│   ├── lib/
│   ├── hooks/
│   ├── styles/
│   └── types/
├── docs/
│   ├── PHASE-0-ARCHITECTURE.md
│   ├── DESIGN-SYSTEM.md
│   ├── CONTENT-REQUIREMENTS.md
│   ├── SEO-PERFORMANCE.md
│   └── DEPLOYMENT.md
├── .gitignore
├── netlify.toml
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

This is a target structure, not a claim that application files already exist. Phase 0 approval does not authorize building the application.

## 5. Hero character system

### 5.1 Asset separation and replaceability

- Load the character from a configurable model path, e.g. `/models/character/zeeshan.glb`.
- Keep model loading, animation mapping, lighting, camera and fallback presentation in isolated components.
- Avoid embedding model-specific assumptions throughout the page.
- Use named animation clips or a documented mapping layer so a replacement model can implement the same interaction contract.
- Keep the source model and any licensed textures/animations documented. Confirm usage and redistribution rights before shipping.

### 5.2 Required interaction states

The character experience must support these states:

1. **Idle / working:** subtle natural breathing, posture shifts and laptop-focused activity.
2. **Look left:** controlled head/eye turn to the left.
3. **Look right:** controlled head/eye turn to the right.
4. **Greeting:** brief welcoming expression and/or upper-body gesture.
5. **Waving:** natural hand wave.
6. **Pointing down:** clear downward pointing gesture, suitable for drawing attention to the next section.

Use a small state controller with smooth transitions, sensible duration limits and safe return to idle. Do not trigger several gestures simultaneously. If a supplied model lacks a required clip, use a restrained procedural animation only where it looks natural; otherwise document the missing capability rather than pretending it exists.

Interactions must not block access to navigation, content or calls to action. Pointer-driven reactions should be subtle and must not cause disorienting movement.

### 5.3 Performance, accessibility and fallback

- Lazy-load the 3D scene after the initial page content is available.
- Do not make the 3D canvas a prerequisite for rendering the hero heading, CTA or navigation.
- Provide a high-quality static photographic fallback/poster.
- On mobile, use the static photographic fallback by default unless device testing demonstrates that the 3D scene performs smoothly and accessibly.
- For `prefers-reduced-motion: reduce`, use the static fallback and disable automatic movement and gesture transitions.
- Provide a graceful fallback when WebGL is unavailable or model loading fails.
- Compress geometry and textures, use sensible texture dimensions, and avoid unnecessary lights, shadows and draw calls.
- Measure real device performance before deciding whether mobile 3D should be enabled.

## 6. Portfolio information architecture

Proposed routes:
- `/` — Home
- `/about/` — About
- `/services/` — Services
- `/projects/` — Projects index
- `/projects/[slug]/` — Individual case study
- `/certifications/` — Certifications
- `/contact/` — Contact

Proposed home page sequence:
1. Header and navigation
2. Hero with professional positioning, primary CTA and character experience
3. Verifiable professional highlights
4. About introduction
5. Services
6. Skills, tools and areas of expertise
7. Featured projects
8. Selected case studies
9. Verified certifications
10. Selected insights/content, if source material is supplied
11. Contact CTA and enquiry form
12. Footer with social links and DME affiliation

Potential case-study candidates, subject to evidence and permission:
- Khatana Rent A Car
- SS Metal Engineering
- Jetons General Contracting
- Jahangir Pharmacy Plus
- Ashraf Pharmacy
- Arif Laboratory & Digital X-Ray Center

Do not imply every candidate is approved for public display. Confirm client permission, available screenshots and factual project scope before publishing.

## 7. Case-study content model

Each case study should use a consistent, typed content model:
- Project name and slug
- Industry and location (if approved for publication)
- Project status and date range, when known
- Scope and services actually delivered
- Client challenge / initial context
- Audit or discovery findings
- Strategy and implementation
- Tools used
- Evidence assets and their captions
- Results with source, measurement period and methodology, only where verified
- Lessons learned
- Client permission / publication status

Use explicit labels such as **Completed work**, **In progress** or **Concept** where applicable. Never fabricate metrics, rankings, revenue, traffic, testimonials, client quotes, credentials or outcomes. If a result is not measured, describe the work performed without implying a measurable improvement.

## 8. Content and credibility rules

- Use the exact professional positioning: **SEO & AI Digital Growth Specialist**.
- Keep Zeeshan Jehangir as the primary brand.
- Present Digi Marketing Experts as agency affiliation, not as the portfolio owner.
- Use only verified experience, qualifications, project scope and client material.
- Obtain approval before displaying confidential client dashboards, personal data, logos or unpublished work.
- Do not publish invented client endorsements or unsupported performance statistics.
- Keep contact details and social profile URLs configurable and verify them before launch.

## 9. SEO, accessibility and performance

### SEO
- Unique title and meta description per indexable route.
- Canonical URLs and clean, stable slugs.
- XML sitemap and robots.txt.
- Open Graph and social metadata.
- Semantic HTML and logical heading hierarchy.
- Descriptive image alt text.
- Breadcrumbs on nested project pages.
- Valid structured data only where it accurately describes the person, website and services.
- Internal links between services and relevant case studies.
- No keyword stuffing or fabricated review/rating schema.

### Performance targets
- Lighthouse Performance target: 90+ on representative production pages, subject to testing.
- Core Web Vitals targets: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- Use optimized responsive images and modern formats where supported.
- Lazy-load below-the-fold media and the 3D model.
- Avoid loading Three.js in the critical rendering path.
- Minimize client-side JavaScript and third-party scripts.
- Test desktop, mid-range Android and constrained mobile network scenarios.

### Accessibility
- Keyboard-accessible navigation and controls.
- Visible focus indicators.
- Sufficient text and control contrast.
- Form labels and useful validation messages.
- Reduced-motion support and static character fallback.
- Touch-friendly interactive targets.
- Do not communicate essential information through animation alone.

These are acceptance targets to test, not claims of current measured results.

## 10. Netlify deployment plan

- Connect the GitHub repository to Netlify.
- Use `main` as the production branch after implementation is approved.
- Use the Next.js build command and Netlify-supported Next.js integration.
- Pin the Node runtime and lockfile.
- Configure deploy previews for pull requests where available.
- Store secrets only in Netlify environment variables.
- Never commit credentials, API keys or private client data.
- Configure custom domain and HTTPS only after domain ownership and DNS details are confirmed.
- Validate redirects, headers, sitemap, robots.txt and form handling before launch.

A minimal `netlify.toml` and actual build configuration should be added during implementation after checking current Netlify guidance and the selected Next.js version.

## 11. Quality assurance and release gates

Before production:
- Review the visual design against the approved direction.
- Review the character likeness and all six interaction states.
- Verify that the static fallback works on mobile and reduced-motion settings.
- Test all routes, navigation, forms and links.
- Validate case-study facts and publication permissions.
- Run accessibility checks and keyboard testing.
- Run Lighthouse and Core Web Vitals testing on production-like builds.
- Validate metadata, sitemap, canonical URLs and structured data.
- Test Netlify deploy previews and production rollback path.

## 12. Phased delivery and approval gates

| Phase | Scope | Gate |
|---|---|---|
| 0 | Architecture, design system, content requirements, SEO and deployment specifications | User reviews and approves documents |
| 1 | Project foundation and reusable layout | Foundation review |
| 2 | Design system and responsive page components | Visual review |
| 3 | Home page and content sections | Homepage review |
| 4 | Character model integration and interactions | Likeness, animation and performance approval |
| 5 | Projects and case studies | Content and evidence approval |
| 6 | SEO, accessibility and optimization | QA acceptance |
| 7 | Netlify deployment | Explicit launch approval |

**Current authorization:** Phase 0 documentation only. Do not scaffold the application, generate or integrate the final 3D model, create deployment configuration, connect Netlify or deploy until the revised Phase 0 documents have been reviewed and approved.

## 13. Open items for review

1. Approve the revised design tokens in `DESIGN-SYSTEM.md`.
2. Confirm the character model production approach and animation source.
3. Confirm which projects may be publicly named and shown.
4. Supply/confirm verified contact links, credentials and any publishable performance evidence.
5. Approve the revised Phase 0 documents before implementation begins.
