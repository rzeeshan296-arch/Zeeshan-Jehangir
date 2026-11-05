# Zeeshan Jehangir — Personal Portfolio

A responsive Next.js App Router portfolio built with React, TypeScript and Tailwind CSS v4.

## Run locally

```bash
npm ci
npm run dev
```

Production checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Immersive hero video

The hero uses one full-scene widescreen character video:

- `public/videos/hero-environment.mp4` — Zeeshan entering the futuristic blue environment, greeting visitors, and interacting with the robot.

Place the optimized asset at that exact path. The browser requests `/videos/hero-environment.mp4`. It is H.264, 1280 × 720, 30 fps, approximately 13.37 seconds and muted. The original uploaded video is preserved separately. The previous square clips may remain in `public/videos/`, but the current hero no longer requests them.

The hero presentation uses responsive 16:9 sizing, soft edge masks and navy/blue atmospheric lighting rather than a visible video card. Missing media triggers the existing fallback. Reduced-motion preferences pause the animation.

## Hero interactions

- Desktop and mobile navigation link to the existing portfolio sections.
- “Explore My Work” scrolls to Projects; “Let’s Talk” scrolls to Contact.
- The floating SVG robot opens the local portfolio assistant.
- The assistant answers common questions about SEO, local search, AI and selected work. It is a local scripted demo, not a connected LLM or external backend.
- The voice introduction is user-triggered, with video muted by default. Add a real recording at `public/audio/hero-intro.mp3`; no placeholder voice file is included. The transcript is available in the hero controls.
- Subtle background particles, lighting and robot motion are disabled for reduced-motion preferences.

## Deployment

The project uses Next.js 15 and Node.js 20. Netlify can deploy it using its Next.js framework support with `npm run build`. Keep `hero-environment.mp4` in `public/videos/` in the deployed branch or the hero will show its missing-media fallback.
