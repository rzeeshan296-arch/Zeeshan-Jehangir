# Immersive hero video

The current hero uses one widescreen, full-scene video:

- `hero-environment.mp4` — Zeeshan walking into the blue futuristic environment, greeting visitors, and interacting with the robot.

Place it at:

`public/videos/hero-environment.mp4`

The hero requests it at `/videos/hero-environment.mp4`. It is H.264, 1280 × 720, 30 fps, approximately 13.37 seconds, with its original AAC stereo audio restored. The browser player keeps it muted by default and exposes a visitor-controlled Video sound on/off button; no audio starts automatically.

The asset is trimmed from the supplied original footage to keep the continuous futuristic environment and exclude the later return to the white studio. The original source video is not overwritten.

The earlier `walking-entrance.mp4`, `welcome.mp4`, and `robot-interaction.mp4` assets can remain in this folder; the current hero no longer requests them.
