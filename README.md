# Zeeshan Jehangir — Personal Portfolio

A Next.js App Router, React, TypeScript and Tailwind CSS v4 portfolio foundation with a responsive interactive hero and a lightweight portfolio assistant UI.

## Run locally

\`\`\`bash
npm install
npm run dev
\`\`\`

Production build: \`npm run build\`.

## Character video assets — required local setup

The three source MP4s were available in the conversation for inspection, but the connected GitHub repository file operations cannot transfer binary uploads from conversation storage. The application therefore uses the correct stable media paths and a visual fallback until the two clean files are copied into \`public/videos/\`.

Copy/rename the two clean, non-watermarked clips as follows:

| Original source | Destination | Intended use |
|---|---|---|
| \`Character_animation_for_portfoli…_1e4c9506(1).mp4\` | \`public/videos/zeeshan-upper-body-clean.mp4\` | Left-look and wave |
| \`Character_animation_for_portfoli…_182878a0 (1)(1).mp4\` | \`public/videos/zeeshan-full-body-clean.mp4\` | Right-look and greeting |

Do **not** add \`video (2)(1).mp4\`: the inspected footage contains a visible Pavo watermark. The app does not reference that clip. Pointing is intentionally disabled. Preserve originals; copy them and rename only the copies.

The source ranges are configured in \`src/components/HeroExperience.tsx\` under \`clips\`. Confirm/tune exact ranges after installing the MP4s and testing playback in a browser.

## Interaction map

- Desktop left zone: LOOK_LEFT
- Desktop right zone: LOOK_RIGHT
- Desktop centre zone: GREETING → WAVING → IDLE
- Mobile: tap-to-greet
- IDLE: clean CSS poster-style fallback until the neutral frame/video is installed
- POINTING: disabled because the available source is watermarked

## Assistant and scope

The assistant is a local scripted UI demo, not a connected LLM or live backend. The portfolio includes About, Expertise, Selected Work, Experience, Contact and footer sections. Project descriptions are deliberately qualitative; no unverified performance metrics are claimed. The assistant is a local scripted demonstration, not a connected LLM or backend. The existing Phase 0 planning documents are preserved.
