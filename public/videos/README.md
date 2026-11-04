# Character video assets

The original MP4 files were located in the ChatGPT Library and inspected frame-by-frame.

## Approved clean sources

1. `Character_animation_for_portfoli…_1e4c9506(1).mp4`
   - 2,023,065 bytes
   - 1280 × 720, 24 fps, 7.93 seconds
   - Upper-body footage: neutral expression, head turn, greeting smile and wave.
   - Copy this file to `public/videos/zeeshan-upper-body-clean.mp4`.

2. `Character_animation_for_portfoli…_182878a0 (1)(1).mp4`
   - 1,132,100 bytes
   - 1280 × 720, 24 fps, 7.93 seconds
   - Full-body footage: neutral standing pose, head turn and greeting/wave sequence.
   - Copy this file to `public/videos/zeeshan-full-body-clean.mp4`.

## Excluded source

- `video (2)(1).mp4` — 4,394,520 bytes, 1280 × 720, 12.256 seconds.
- The footage visibly contains a Pavo watermark. It is intentionally not referenced by the application.

## Gesture mapping

The clip time ranges are defined in `src/components/HeroExperience.tsx`:
- IDLE: first neutral frame of the clean full-body video.
- LOOK_LEFT: upper-body source, approximately 1.5–2.6 seconds.
- LOOK_RIGHT: full-body source, approximately 2.25–3.1 seconds.
- GREETING: upper-body source, approximately 3.0–4.35 seconds.
- WAVING: upper-body source, approximately 4.45–5.9 seconds.
- POINTING: intentionally disabled, per project instruction.

The exact ranges are initial edit points based on sampled frames; confirm the motion and timing after the files are copied into the public directory and played in a browser.

## Binary asset transfer limitation

The connected GitHub file-write integration used for this implementation can commit UTF-8 source files, but it cannot transfer these Library MP4 binaries into GitHub. The originals remain in the user's ChatGPT Library. Do not substitute the watermarked source. Until the two approved files are copied into this directory, the UI displays its CSS fallback character.
