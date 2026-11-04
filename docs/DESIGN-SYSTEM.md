# Design System — Zeeshan Jehangir Portfolio

**Status:** Revised for design review — not approved for implementation  
**Brand:** Zeeshan Jehangir  
**Positioning:** SEO & AI Digital Growth Specialist  
**Visual direction:** Premium editorial, realistic photography-inspired

## 1. Approved visual direction

Create a refined personal portfolio with a bright, confident and professional atmosphere. The experience should feel like a premium personal brand, not a generic agency template.

The user's uploaded portrait is the primary identity reference for the human character. The accompanying office composition is a visual-direction reference only; it is not the final 3D model.

The approved palette is **white, ice blue, royal blue and deep navy**. This replaces the earlier white, dusty-rose and dark-accent proposal.

## 2. Color tokens

Initial proposed tokens (validate contrast and refine during visual implementation):

| Token | Hex | Intended use |
|---|---|---|
| --color-white | #FFFFFF | Main page background and cards |
| --color-ice-blue | #EAF4FF | Soft section backgrounds and subtle surfaces |
| --color-royal-blue | #2563EB | Primary actions, links and selected accents |
| --color-deep-navy | #102A56 | Headings, navigation and strong contrast |
| --color-body | #42536B | Body copy |
| --color-muted | #718096 | Secondary labels and supporting text |
| --color-border | #DCE6F1 | Dividers, card borders and input outlines |
| --color-surface-blue | #F5F9FF | Alternate light surfaces |

Use royal blue as an accent rather than a large uninterrupted background. Use deep navy for readable text and visual grounding. Do not reintroduce dusty rose as a primary or secondary brand color unless the owner changes the decision.

Check text/background combinations against WCAG AA; adjust tokens where required rather than assuming every listed pairing passes.

## 3. Typography

Recommended family: **Plus Jakarta Sans** for headings and **Inter** for body text. Use optimized local or framework-managed font loading where licensing and delivery permit.

- Headings: clear, confident, restrained; avoid overly decorative display faces.
- Body: highly readable with comfortable line height.
- Navigation and buttons: medium or semibold weights.
- Use a consistent responsive type scale with fluid sizing for hero typography.
- Avoid excessive all-caps labels and long line lengths.

## 4. Layout and components

- Editorial grid with generous whitespace and clear visual hierarchy.
- Centered content container, approximately 1200–1240 px maximum width on large desktop.
- Responsive gutters that scale down on tablet and mobile.
- Consistent vertical rhythm between sections.
- Card radius approximately 12–20 px; subtle borders and restrained shadows.
- Buttons have clear primary and secondary variants, visible focus states and comfortable touch targets.
- Use a consistent spacing scale based on 4 px increments.
- Keep layouts responsive across desktop, tablet and mobile.

## 5. Hero composition

The hero should combine the personal introduction and clear calls to action with the realistic 3D character in a premium white-and-blue office.

The human character:
- Must be a highly realistic, human-like digital version based on the uploaded identity-reference photograph.
- Preserve recognizable facial identity, facial proportions, hairstyle, beard and complexion as closely as the approved model allows.
- Wear professional navy-blue clothing.
- Work behind a laptop in a premium white-and-blue office.
- Use realistic photography-inspired rendering and natural anatomy.
- Must not look cartoonish, Pixar-inspired, exaggerated or like a generic avatar.

Keep headline, positioning and CTA as real HTML text, not baked into the 3D texture or image. The hero must remain understandable if the model fails to load.

## 6. Character interaction design

The replaceable 3D model should support these interaction states:

| State | Intended behavior |
|---|---|
| Idle / working | Subtle breathing and restrained working motion |
| Look left | Natural head and eye gaze to the left |
| Look right | Natural head and eye gaze to the right |
| Greeting | Brief, friendly acknowledgement |
| Waving | Natural, restrained hand wave |
| Pointing down | Natural gesture toward content below |

Transitions should be smooth, interruptible and not distracting. Avoid exaggerated loops or constant movement. Pointer tracking, if enabled, should be subtle and optional.

Keep the animation controller separate from the model file so the model can be replaced without redesigning the page. Document the required rig, clip names and fallback mapping when the final asset is commissioned or produced.

## 7. Mobile, reduced-motion and fallback behavior

- Use a static photographic fallback on mobile and for reduced-motion users, as specified by the owner.
- Keep the fallback based on an approved portrait asset and visually consistent with the desktop hero.
- Do not download or initialize the 3D model unnecessarily on fallback routes/devices.
- Provide a graceful fallback if WebGL is unavailable or model loading fails.
- Respect prefers-reduced-motion; disable non-essential movement and transitions.
- All key content, navigation and CTAs must remain available without animation.

## 8. Imagery and brand assets

- Use owner-approved personal portrait and logo assets.
- The uploaded photograph is the source identity reference; do not substitute an unrelated stock face.
- Treat the office scene as a composition reference, not as the final model.
- Use real project screenshots and client assets only when permission and authenticity are established.
- Optimize raster images and 3D textures for delivery size.
- Use meaningful alt text for informative images; decorative imagery should not create redundant screen-reader output.

## 9. Motion principles

- Motion should clarify hierarchy or acknowledge interaction, not compete with reading.
- Prefer short, subtle transitions for menus, buttons and card states.
- Avoid parallax or scroll-linked effects that cause discomfort or layout instability.
- Avoid automatic character gestures that distract from the headline or CTA.
- Ensure motion does not cause cumulative layout shift.

## 10. Design acceptance checklist

- [ ] White, ice blue, royal blue and deep navy palette is consistently applied.
- [ ] Dusty rose is not used as a primary brand color.
- [ ] Typography is readable and responsive.
- [ ] Desktop, tablet and mobile layouts are defined.
- [ ] Hero identity is based on the supplied photograph, not a generic avatar.
- [ ] Character look is realistic and photography-inspired, not cartoon/Pixar.
- [ ] Navy outfit and premium white-and-blue office are represented.
- [ ] All six requested interaction states are specified.
- [ ] 3D model remains replaceable.
- [ ] Mobile and reduced-motion static photographic fallback is specified.
- [ ] Content remains usable without WebGL or animation.
- [ ] Contrast and keyboard accessibility are checked during implementation.

**Approval gate:** This design system is a revised Phase 0 specification for review. Do not begin full implementation until the owner explicitly approves it.
