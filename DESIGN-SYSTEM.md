# Design System — Zeeshan Jehangir Portfolio

**Status:** Revised for review — visual direction approved  
**Date:** 2026-11-04  
**Brand:** Zeeshan Jehangir  
**Positioning:** SEO & AI Digital Growth Specialist

## 1. Approved creative direction

The approved visual language is **premium editorial with realistic photography-inspired rendering**.

The portfolio must feel:
- Premium, confident, professional and approachable.
- Clean and spacious, with clear content hierarchy.
- Modern and technology-aware without looking like a generic SaaS landing page.
- Personal and recognizable, with the supplied photograph guiding the digital character's identity.

Avoid:
- Cartoon, Pixar-like, toy-like or exaggerated character styling.
- Generic stock-avatar imagery.
- Excessive gradients, glassmorphism, neon effects or decorative motion.
- Dense layouts, tiny text and overused marketing clichés.
- Agency-first branding that obscures the personal brand.

## 2. Brand hierarchy

1. **Primary identity:** Zeeshan Jehangir
2. **Professional title:** SEO & AI Digital Growth Specialist
3. **Agency affiliation:** Digi Marketing Experts (DME)

Use the personal name and professional title in the site header, hero and metadata. DME may appear as an affiliation, selected collaboration reference or outbound link, but should not dominate the visual identity.

## 3. Color palette

The approved palette family is **white, ice blue, royal blue and deep navy**.

The following hex values are proposed implementation tokens for review. They translate the approved color direction into a consistent accessible system; final contrast must be checked in actual UI combinations.

| Token | Proposed value | Intended use |
|---|---|---|
| White | `#FFFFFF` | Main page background, cards |
| Ice blue | `#EAF4FF` | Soft section backgrounds, subtle surfaces |
| Pale blue | `#D7E9FF` | Borders, selected states, decorative details |
| Royal blue | `#1769D2` | Primary accent, links, key actions |
| Deep navy | `#102A56` | Headings, navigation, dark panels |
| Ink | `#17243A` | Main body text |
| Muted slate | `#5B6B82` | Secondary text |
| Soft border | `#DCE5EF` | Dividers, card outlines |

### Color usage rules
- Keep white as the dominant canvas.
- Use ice blue as a supporting surface, not a full-page tint everywhere.
- Reserve royal blue for meaningful emphasis, links and primary actions.
- Use deep navy for strong typography, navigation and selected dark sections.
- Avoid placing small white text on pale ice-blue backgrounds.
- Check text, controls and focus indicators against WCAG contrast guidance.

## 4. Typography

Recommended type system:
- **Headings:** Plus Jakarta Sans (or a comparable modern sans-serif).
- **Body:** Inter (or a comparable highly legible sans-serif).
- **Fallback:** system sans-serif stack.

Use strong but restrained heading weights. Avoid overly condensed or decorative display fonts.

Suggested scale:
- Display: clamp(2.75rem, 6vw, 5.5rem)
- H1: clamp(2.5rem, 5vw, 4.5rem)
- H2: clamp(2rem, 3.5vw, 3rem)
- H3: clamp(1.35rem, 2vw, 1.75rem)
- Body large: 1.125rem
- Body: 1rem
- Small/meta: 0.875rem

Keep line lengths comfortable and body copy readable on mobile.

## 5. Layout and spacing

- Editorial max-width: approximately 1200–1280px.
- Use a consistent responsive container with fluid side gutters.
- Use a 12-column desktop grid where it helps composition.
- Use generous whitespace and clear section separation.
- Cards should have consistent internal spacing and alignment.
- Use a spacing scale based on 4px increments.
- Avoid horizontal overflow at all supported viewport widths.

Suggested spacing tokens:
- 4, 8, 12, 16, 24, 32, 48, 64, 80, 96px.

## 6. Shape, borders and elevation

- Buttons: medium rounded corners, clear focus and hover states.
- Cards: 12–20px radius depending on component size.
- Inputs: clear borders and visible focus rings.
- Borders: subtle cool gray-blue.
- Shadows: soft and restrained; avoid heavy floating-card effects.
- Use consistent corner and elevation tokens rather than one-off styling.

## 7. Hero composition

The hero should combine:
- Personal name and exact professional title.
- A concise, evidence-based value proposition.
- A primary contact or project-discussion CTA.
- A secondary projects/portfolio CTA.
- The realistic human-like digital character in a premium white-and-blue office with a laptop.

Desktop composition may use a balanced two-column layout, with copy and CTAs on one side and the character scene on the other. At narrower widths, content order and character presentation must remain deliberate and readable.

The hero should remain understandable and useful if the 3D asset does not load.

## 8. Character identity and art direction

### 8.1 Identity reference

The user's uploaded photograph is the identity reference. It should guide:
- Recognizable facial identity and facial proportions.
- Hairstyle and hairline.
- Beard shape and density.
- Complexion and natural skin appearance.
- Overall face silhouette and recognizable features.

The previously supplied/generated office composition is a **visual direction reference only** for office mood, framing, laptop and professional presentation. It is not the final model and must not replace the user's photograph as the identity reference.

### 8.2 Character appearance

- Highly realistic human-like 3D digital version.
- Photography-inspired rendering and believable anatomy.
- Professional navy-blue clothing.
- Premium white and blue office.
- Laptop as a central environmental prop.
- Natural skin, hair, fabric and lighting materials.
- Professional, approachable expression.
- No cartoon, Pixar, exaggerated, toy-like or generic avatar appearance.

The final likeness must be reviewed by the user. Generated or reconstructed 3D likeness can vary; do not claim perfect identity preservation before approval.

### 8.3 Required interaction states

| State | Behavior | Notes |
|---|---|---|
| Idle / working | Subtle breathing, natural posture and laptop-focused activity | Default state; low amplitude |
| Look left | Natural head and eye turn left | Smooth transition |
| Look right | Natural head and eye turn right | Smooth transition |
| Greeting | Brief welcoming gesture/expression | Return to idle |
| Waving | Natural hand wave | Avoid exaggerated motion |
| Pointing down | Clear downward pointing gesture | May guide attention to next section |

Interactions should be triggered intentionally and transition smoothly. The character must return to idle, avoid conflicting simultaneous gestures and never obstruct important text or controls.

### 8.4 Replaceable model contract

Keep the 3D model replaceable:
- Store the model as an external GLB/GLTF asset under a dedicated public model directory.
- Isolate loading and animation logic in dedicated character components.
- Use documented animation clip names or a configurable mapping to the six required states.
- Keep camera, lighting and material adjustments separate from page layout.
- A future model should be replaceable without rewriting the entire homepage.
- Track asset source, creator, license and redistribution rights.

If a model does not include a required animation, record that gap and resolve it in the asset/animation pipeline. Do not silently substitute a visibly unsuitable motion.

## 9. Motion and interaction principles

- Use subtle interface transitions and restrained scroll reveals.
- Avoid parallax or pointer-follow effects that impair usability.
- Respect `prefers-reduced-motion`.
- Avoid autoplay gestures that distract from reading.
- Ensure all important actions remain available without interacting with the character.
- Keep animation timing consistent and purposeful.
- Do not make the character a navigation dependency.

## 10. Responsive and fallback behavior

### Desktop
- Full editorial hero composition.
- 3D character may be enabled after performance and usability testing.
- Character interactions available where they add value.

### Tablet
- Simplify scene composition and reduce rendering cost.
- Preserve content hierarchy and CTA visibility.
- Use static fallback if performance is inconsistent.

### Mobile
- Default to a carefully art-directed static photographic fallback.
- Do not force a heavy 3D canvas on mobile.
- Keep the image optimized and correctly cropped.
- Preserve heading, CTA and navigation readability.

### Reduced motion / unsupported WebGL
- Use the static photographic fallback.
- Disable automatic movement and character gestures.
- Ensure no layout shift while fallback or model loads.
- Provide a robust experience if WebGL or model loading fails.

## 11. Image and media direction

- Use authentic project screenshots only when approved and available.
- Use optimized responsive images with appropriate alt text.
- Prefer WebP/AVIF where supported.
- Do not use AI-generated imagery as evidence of real client work.
- Keep the character identity reference private to the approved production workflow unless the user authorizes publication.
- Use a static photographic hero fallback derived from an approved image asset.

## 12. Component styling

Create reusable tokens and components for:
- Header and responsive navigation.
- Primary and secondary buttons.
- Section headings and eyebrow labels.
- Service cards.
- Project cards and case-study layouts.
- Credential/certification entries.
- Contact form fields and validation states.
- Footer and social links.
- Character scene and static fallback.

All interactive controls need hover, focus, active, disabled and error states as applicable.

## 13. Accessibility and quality

- Meet WCAG contrast requirements for text and essential controls.
- Use semantic HTML and logical heading order.
- Support keyboard navigation.
- Provide visible focus indicators.
- Label form fields and announce validation feedback accessibly.
- Provide reduced-motion behavior.
- Never communicate key content solely through animation or color.
- Test layouts at mobile, tablet and desktop breakpoints.

## 14. Design acceptance checklist

- [ ] White, ice blue, royal blue and deep navy are the dominant palette.
- [ ] Personal brand is more prominent than DME affiliation.
- [ ] Typography and spacing feel premium and editorial.
- [ ] Character is realistic and based on the supplied identity reference.
- [ ] Character has professional navy clothing and white/blue office setting.
- [ ] All six requested interaction states are supported or documented as asset gaps.
- [ ] Model can be replaced without restructuring the site.
- [ ] Mobile and reduced-motion experiences use the static photographic fallback.
- [ ] No cartoon/Pixar/generic avatar treatment.
- [ ] Contrast, keyboard access and responsive behavior are verified.
- [ ] Final character likeness and visual treatment are approved by the user.

**Approval note:** This document defines the visual and interaction specification only. It does not authorize full application implementation, final model production, or deployment.
