# 07 · Imagery & illustration — Maxilius Design System

> Cool-toned photography and stroke-based illustration extend the cool-framework-warm-action rule to pictures: cool scenes build structure, small warm accents draw the eye. **(Defined by docs, not yet in code.)**

## Principles

1. **Imagery obeys the temperature rule.** Photographs and illustrations are part of the cool framework — cool-gray, blue, and teal tints, generous negative space. Warm amber/vermillion appears only as small focal accents, mirroring the one-warm-CTA rule.
2. **Illustrations speak the icon language.** 2px rounded strokes, flat fills from the published color ramps only, `--mx-radius-lg` corner rounding. Illustration is iconography at a larger scale.
3. **Images are content, not texture.** Every image earns its place by informing or orienting; decorative filler dilutes hierarchy and slows the page.
4. **Text on images needs a scrim.** Contrast is non-negotiable — never place text directly on an unprotected photo.
5. **Performance is a design property.** Lazy loading, responsive sources, and modern formats are part of the spec, not an optimization afterthought.

## The system

### Photography direction

| Attribute | Rule |
|---|---|
| Palette | Cool-tinted scenes: cool-gray, blue, and teal casts; avoid warm color grades |
| Composition | Generous negative space; subject on the left or center-weighted, leaving room for text |
| Warm accents | Small focal elements only (a lamp, a highlight, a garment) — never full warm-toned hero backgrounds |
| Tone | Calm, real working contexts; no staged stock clichés, no heavy filters |

### Illustration direction

| Attribute | Rule |
|---|---|
| Line | 2px rounded strokes — same weight, caps, and joins as the icon set |
| Fill | Flat fills from the published ramps only (gray/blue/teal for structure; amber/vermillion as tiny accents) |
| Corners | `--mx-radius-lg` (12px) rounding on containers and large shapes |
| Depth | Flat — no gradients, no drop shadows inside the artwork; elevation belongs to surfaces |

### Image treatments

| Context | Radius | Notes |
|---|---|---|
| Inline image in body content | `--mx-radius-md` (8px) | Matches control-scale elements |
| Image in a Card | `--mx-radius-lg` (12px) via `overflow: hidden`, or nested rule (outer − inset) | Full-bleed with the Card `flush` pattern |
| Hero / feature image | `--mx-radius-xl` (16px) | Matches modal/hero surface scale |
| Full-bleed section background | `--mx-radius-none` | Edge-to-edge |
| Avatar photo | `--mx-radius-full` | Circle |

### Text on images: overlay scrim

Use the system overlay ink `rgb(2 6 23 / …)` — the same cool gray-950 base as shadows and the modal scrim.

| Treatment | Value | Use |
|---|---|---|
| Solid scrim | `rgb(2 6 23 / 0.55)` (`--mx-bg-overlay`) | Full-cover overlays, image cards with centered text |
| Gradient scrim | `linear-gradient(to top, rgb(2 6 23 / 0.7), rgb(2 6 23 / 0))` | Text anchored to the bottom of a hero |

Text on a scrim uses `--mx-text-inverse` (white) and must still meet 4.5:1 against the darkest-case composite. Verify against the *lightest* region of the image under the scrim.

### Alt text

| Image type | Alt rule |
|---|---|
| Informative (chart, screenshot, product shot) | Describe the content and its point: `alt="Dashboard showing deploy success rate at 99.2%"` |
| Functional (image inside a link/button) | Describe the destination or action, not the picture |
| Decorative (ambience, background) | `alt=""` (empty, present) so screen readers skip it |
| Complex (diagrams) | Short `alt` + adjacent visible text or a linked long description |

### Performance

- `loading="lazy"` on every image below the fold; the LCP hero loads eagerly (`fetchpriority="high"`).
- `srcset` + `sizes` for responsive delivery; serve 1x/2x or width-based candidates.
- Modern formats: AVIF first, WebP fallback, JPEG last — via `<picture>`.
- Always set `width`/`height` (or `aspect-ratio`) to prevent layout shift.
- SVG for illustrations — it inherits `currentColor` for strokes and stays sharp at every density.

## Tokens

```css
:root {
  /* Image treatments reuse system tokens — no separate imagery scale */
  --mx-radius-md: 0.5rem;      /* inline images */
  --mx-radius-lg: 0.75rem;     /* card media, illustration corners */
  --mx-radius-xl: 1rem;        /* hero imagery */
  --mx-radius-full: 9999px;    /* avatar photos */

  /* Scrims — cool ink, same base as shadows */
  --mx-bg-overlay: rgb(2 6 23 / 0.55);
  --mx-scrim-gradient: linear-gradient(to top, rgb(2 6 23 / 0.7), rgb(2 6 23 / 0));

  /* Text on imagery */
  --mx-text-inverse: #FFFFFF;

  /* Illustration palette anchors (from the published ramps) */
  --mx-illus-structure: #CBD5E1;   /* gray-300 lines on light */
  --mx-illus-primary: #2563EB;     /* blue-600 */
  --mx-illus-secondary: #0D9488;   /* teal-600 */
  --mx-illus-accent: #F59E0B;      /* amber-500 — small focal areas only */
}

[data-theme="dark"] {
  --mx-bg-overlay: rgb(2 6 23 / 0.7);
  --mx-illus-structure: #475569;   /* gray-600 lines on dark */
}
```

## Usage

### Hero with gradient scrim and bottom-anchored text

```html
<section class="mx-hero">
  <img class="mx-hero__img" src="/hero-1280.avif"
       srcset="/hero-640.avif 640w, /hero-1280.avif 1280w, /hero-1920.avif 1920w"
       sizes="100vw" width="1920" height="960" fetchpriority="high"
       alt="Engineers reviewing a release dashboard in a blue-lit workspace" />
  <div class="mx-hero__content">
    <h1>Ship with confidence</h1>
    <button class="mx-btn mx-btn--accent">Start free trial</button>
  </div>
</section>
```

```css
.mx-hero {
  position: relative;
  border-radius: var(--mx-radius-xl);
  overflow: hidden;
}

.mx-hero__img { display: block; width: 100%; height: auto; }

.mx-hero__content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--mx-space-4);
  padding: var(--mx-space-8);
  background: var(--mx-scrim-gradient);
  color: var(--mx-text-inverse);
}
```

### Responsive, lazy card image with modern formats

```html
<article class="mx-card">
  <picture>
    <source type="image/avif" srcset="/report-480.avif 480w, /report-960.avif 960w" sizes="(min-width: 768px) 33vw, 100vw" />
    <source type="image/webp" srcset="/report-480.webp 480w, /report-960.webp 960w" sizes="(min-width: 768px) 33vw, 100vw" />
    <img class="mx-card__media" src="/report-480.jpg" width="480" height="300"
         loading="lazy" decoding="async"
         alt="Quarterly report cover with teal chart illustration" />
  </picture>
  <div class="mx-card__body">
    <h3>Q2 report</h3>
  </div>
</article>
```

```css
.mx-card {
  border-radius: var(--mx-radius-lg);
  overflow: hidden;                   /* full-bleed media inherits 12px corners */
  background: var(--mx-bg-surface);
  box-shadow: var(--mx-shadow-sm);
}

.mx-card__media {
  width: 100%;
  height: auto;
  aspect-ratio: 8 / 5;                /* reserves space, prevents layout shift */
  object-fit: cover;
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Choose photos with cool-gray, blue, or teal casts and generous negative space. | Don't grade heroes warm or use full amber/orange-toned backgrounds — warm is for actions, not ambience. |
| Let one small warm element in a photo act as the focal accent, echoing the single warm CTA. | Don't add multiple competing warm accents in one image — the eye needs exactly one destination. |
| Draw illustrations with 2px rounded strokes and flat fills from the published ramps. | Don't add gradients, drop shadows, or off-palette colors inside illustration artwork. |
| Round card media with `--mx-radius-lg` via `overflow: hidden`; heroes with `--mx-radius-xl`. | Don't apply arbitrary radii (6px, 20px) to images — image corners come from the radius scale. |
| Put a `rgb(2 6 23 / …)` scrim or gradient behind any text placed on an image. | Don't set white text straight onto a photo and hope the busy area stays dark. |
| Write alt text that carries the image's point ("Deploy success rate at 99.2%"). | Don't write `alt="image"` or repeat the adjacent heading verbatim. |
| Use `alt=""` on purely decorative imagery so screen readers skip it. | Don't omit the alt attribute entirely — missing alt makes readers announce the filename. |
| Lazy-load below-the-fold images and give every image `width`/`height` or `aspect-ratio`. | Don't lazy-load the LCP hero or leave dimensions unset and cause layout shift. |
| Serve AVIF/WebP through `<picture>` with width-based `srcset`. | Don't ship one 2MB JPEG to every viewport. |

## Checklist

- [ ] Photography reads cool (gray/blue/teal cast); warm tones appear only as one small focal accent.
- [ ] Illustrations use 2px rounded strokes, flat ramp fills, and `--mx-radius-lg` rounding.
- [ ] Image corner radii come from the radius scale per the treatment table.
- [ ] All text on imagery sits on a `--mx-bg-overlay` scrim or gradient and meets 4.5:1.
- [ ] Every image has correct alt text (informative, functional, or empty for decorative).
- [ ] Below-the-fold images are `loading="lazy"`; the hero is eager with `fetchpriority="high"`.
- [ ] Modern formats served via `<picture>` with `srcset`/`sizes`.
- [ ] Dimensions or `aspect-ratio` set on every image — zero layout shift.

## Related

- [01 · Color](./01-color.md) — the cool/warm temperature system imagery mirrors
- [05 · Shape & radius](./05-shape-radius.md) — radii applied to media and nesting rules
- [06 · Iconography](./06-iconography.md) — the stroke language illustrations scale up
- [15 · Accessibility](./15-accessibility.md) — alt text and contrast requirements
- [23 · Brand & logo](./23-brand-logo.md) — wordmark rules alongside imagery
