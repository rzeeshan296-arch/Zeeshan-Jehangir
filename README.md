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

## Phase 2 hero video assets

The premium hero uses three real, muted video clips in this order:

| Public asset path | Sequence role |
|---|---|
| `public/videos/walking-entrance.mp4` | Initial entrance |
| `public/videos/welcome.mp4` | Welcoming pose |
| `public/videos/robot-interaction.mp4` | Character and robot interaction |

The three optimized MP4 files are supplied in the Phase 2 hero asset ZIP. Extract the ZIP at the repository root so the files land directly in `public/videos/`. The application references the public URLs `/videos/walking-entrance.mp4`, `/videos/welcome.mp4` and `/videos/robot-interaction.mp4`.

All clips are H.264, 720 × 720, 24 fps, approximately 7.9 seconds and have their audio removed. The source footage was center-cropped to remove embedded black side bars while retaining the person and robot. The sequence crossfades between clips, skips failed clips where possible, and displays an explicit fallback if all video assets are unavailable. Reduced-motion preferences pause the animation.

## Hero interactions

- Desktop and mobile navigation link to the existing portfolio sections.
- “Explore My Work” scrolls to Projects; “Let’s Talk” scrolls to Contact.
- The floating SVG robot opens the local portfolio assistant.
- The assistant answers common questions about SEO, local search, AI and selected work. It is a local scripted demo, not a connected LLM or external backend.
- Subtle background particles, lighting and robot motion are disabled for reduced-motion preferences.

## Deployment

The project uses Next.js 15 and Node.js 20. Netlify can deploy it using its Next.js framework support with `npm run build`. Keep the three MP4 assets in `public/videos/` in the deployed branch; otherwise the hero will show its missing-media fallback.
