# 07 · Imagery & illustration — Cloud Design System

> Bright, airy photography and soft geometric illustration, treated with consistent radii, scrims, alt text, and performance defaults.

## Principles

1. **Light-filled, like the system.** Photography is bright and natural; illustration lives in the sky/twilight palette. Imagery should feel like it was shot inside the brand.
2. **Cool, never clashing.** Warm, heavily saturated, or dark moody imagery fights the cloud neutrals — grade toward cool tones.
3. **One hero moment per view.** The signature gradient is a signature *because* it's rare: at most one gradient hero per view.
4. **Text wins over image.** Any text on imagery sits on a scrim that guarantees contrast — no exceptions for "this photo is dark enough".
5. **Every image earns its bytes.** Modern formats, lazy loading, and responsive sources are defaults, not optimizations.

## The system

### Photography style

| Attribute | Direction |
|---|---|
| Light | Bright, airy, natural light — daylight, soft shadows, no harsh flash |
| Color grade | Cool tones (blues, cool grays) that harmonize with the cloud/sky ramps |
| Composition | Generous negative space; subjects breathe, frames aren't cluttered |
| Avoid | Heavy vignettes, warm/orange filters, dark moody grades, staged stock clichés |

### Illustration style

| Attribute | Direction |
|---|---|
| Geometry | Soft geometric — simple shapes, rounded corners echoing the radius scale |
| Palette | Sky (sky-100 → sky-600) and twilight (twilight-100 → twilight-600) over cloud neutrals |
| Line | When outlined, match iconography: 1.5px-feel strokes, rounded caps |
| Accents | Small doses of the status palette only when the illustration depicts status |

### Signature gradient

```
linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)   /* sky-400 → twilight-500 */
```

Rules:

- **Max 1 gradient hero per view.** Use it for the single most important moment (hero banner, empty-state feature, upsell card).
- Text on the gradient is white (cloud-0) and ≥ 24px, or 19px bold — and still gets a scrim if the photo/gradient mix runs light.
- Never use the gradient on small controls, borders, or text fills.

### Image treatments

| Treatment | Rule |
|---|---|
| Radius | `radius-lg` (16px) on embedded images; `radius-xl` (24px) for full-width hero media; follow the nested-radius rule inside cards |
| Aspect ratios | 16:9 (heroes, video, cards), 4:3 (content/product shots), 1:1 (avatars, thumbnails, grids) |
| Cropping | `object-fit: cover` with an intentional focal point — never stretch or letterbox |
| Borders | None by default; 1px cloud-200 only when a light image bleeds into a light background |

### Overlay / scrim recipes for text on image

Text on imagery must still meet WCAG 2.2 AA: ≥ 4.5:1 (≥ 3:1 for ≥ 24px or 19px bold). The scrim guarantees it regardless of the photo behind.

| Recipe | Value | Use |
|---|---|---|
| Bottom gradient scrim | `linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.7) 100%)` | Captions and titles anchored to the lower edge |
| Full scrim | `rgba(15,23,42,0.5)` flat overlay | Text centered over the whole image (hero banners) |
| Side gradient scrim | `linear-gradient(90deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0) 60%)` | Left-aligned hero copy over wide imagery |

Scrims use the cool cloud-900 tint (`15,23,42`) — never pure black. Text on a scrim is cloud-0 white. Validate contrast against the *lightest* region of the image under the text.

### Alt text rules

- **Informative images:** describe content and purpose in ≤ ~125 characters ("Dashboard showing a 12% rise in weekly signups"), not appearance trivia.
- **Decorative images** (ambience, patterns, gradient backgrounds): `alt=""` so screen readers skip them — never omit the attribute.
- **Functional images** (image inside a link/button): describe the destination or action, not the picture ("View pricing plans").
- Don't start with "Image of…" / "Picture of…" — the role is already announced.
- Charts and diagrams get a text alternative nearby (caption or table), not a paragraph crammed into `alt`.

### Performance

| Rule | Implementation |
|---|---|
| Modern formats | AVIF first, WebP fallback, JPEG last — via `<picture>` |
| Lazy loading | `loading="lazy"` + `decoding="async"` on everything below the fold; the hero (LCP image) loads eagerly with `fetchpriority="high"` |
| Responsive sources | `srcset` + `sizes` so mobile never downloads desktop pixels |
| Layout stability | Always set `width`/`height` (or `aspect-ratio`) to reserve space — zero CLS from images |

## Tokens

```css
:root {
  /* Signature gradient — max 1 hero per view */
  --cds-gradient-signature: linear-gradient(135deg, #38BDF8 0%, #6366F1 100%);

  /* Image radii */
  --cds-image-radius: 16px;      /* radius-lg, embedded images */
  --cds-image-radius-hero: 24px; /* radius-xl, hero media */

  /* Aspect ratios */
  --cds-aspect-wide: 16 / 9;
  --cds-aspect-standard: 4 / 3;
  --cds-aspect-square: 1 / 1;

  /* Scrims — cool cloud-900 tint */
  --cds-scrim-bottom: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.7) 100%);
  --cds-scrim-full: rgba(15, 23, 42, 0.5);
  --cds-scrim-side: linear-gradient(90deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0) 60%);

  /* Text on imagery */
  --cds-on-image-text: #FFFFFF; /* cloud-0 */
}
```

## Usage

### Card image, responsive and lazy

```html
<figure class="cds-media">
  <picture>
    <source type="image/avif" srcset="/team-640.avif 640w, /team-1280.avif 1280w" />
    <source type="image/webp" srcset="/team-640.webp 640w, /team-1280.webp 1280w" />
    <img src="/team-1280.jpg"
         srcset="/team-640.jpg 640w, /team-1280.jpg 1280w"
         sizes="(min-width: 768px) 50vw, 100vw"
         width="1280" height="720"
         loading="lazy" decoding="async"
         alt="Design team reviewing wireframes in a sunlit studio" />
  </picture>
</figure>
```

```css
.cds-media img {
  width: 100%;
  aspect-ratio: var(--cds-aspect-wide); /* 16:9 */
  object-fit: cover;
  border-radius: var(--cds-image-radius); /* radius-lg */
}
```

### Hero with signature gradient and scrimmed text

```html
<section class="cds-hero">
  <div class="cds-hero-scrim">
    <h1>Ship your next launch faster</h1>
  </div>
</section>
```

```css
.cds-hero {
  background: var(--cds-gradient-signature);
  border-radius: var(--cds-image-radius-hero); /* 24px */
  overflow: hidden;
}
.cds-hero-scrim {
  background: var(--cds-scrim-full); /* guarantees contrast over any art */
  padding: 64px 24px;
}
.cds-hero h1 {
  color: var(--cds-on-image-text);
  font-size: 48px; /* text-5xl — large text, ≥3:1 floor easily cleared */
}
```

### Caption over a photo with a bottom scrim

```css
.cds-photo-card { position: relative; border-radius: 16px; overflow: hidden; }
.cds-photo-card figcaption {
  position: absolute;
  inset: auto 0 0 0;
  padding: 24px 16px 16px;
  background: var(--cds-scrim-bottom);
  color: var(--cds-on-image-text);
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Choose bright, naturally lit photos graded toward cool tones. | Don't drop warm, orange-filtered stock photos into a cool cloud/sky UI — the grade clash is instant. |
| Use the signature gradient (`135deg, #38BDF8 → #6366F1`) for exactly one hero moment per view. | Don't repeat the gradient on three cards in one screen — repetition demotes it to wallpaper. |
| Round embedded images to `radius-lg` (16px) and heroes to `radius-xl` (24px). | Don't ship square-cornered images next to 16px-radius cards — the mismatch reads as a bug. |
| Crop to the system ratios — 16:9, 4:3, or 1:1 — with `object-fit: cover`. | Don't stretch a 4:3 photo into a 16:9 slot — distorted faces and logos destroy trust. |
| Put text on imagery over a cloud-900-tinted scrim and verify 4.5:1 (3:1 for ≥24px/19px-bold text). | Don't place white text straight on a photo because "it looks dark enough" — one bright sky region breaks it. |
| Write purposeful alt text: "Dashboard showing a 12% rise in weekly signups." | Don't write `alt="image"` or start with "Image of…" — screen readers already announce the role. |
| Give decorative backgrounds `alt=""` so assistive tech skips them. | Don't omit the `alt` attribute entirely — screen readers then read the file name aloud. |
| Serve AVIF/WebP via `<picture>` with `srcset`/`sizes`, lazy-load below the fold. | Don't ship one 4000px JPEG to every device with `loading` unset — you pay for it in LCP. |
| Set `width`/`height` or `aspect-ratio` on every image slot. | Don't let images pop in and shove content down — layout shift is a measurable failure (CLS). |
| Keep illustrations soft-geometric in sky/twilight hues over cloud neutrals. | Don't import illustration packs in foreign palettes (neon greens, warm corals) — they read as ads inside your own product. |

## Checklist

- [ ] Photography is bright, natural-light, cool-graded; no warm or moody outliers.
- [ ] Illustrations use soft geometric shapes in the sky/twilight palette.
- [ ] At most one signature-gradient hero exists in the view.
- [ ] Embedded images use radius-lg (16px); heroes radius-xl (24px); nesting rule respected inside cards.
- [ ] Every image uses a system aspect ratio (16:9, 4:3, 1:1) with `object-fit: cover`.
- [ ] All text-on-image sits on a scrim and passes its contrast floor at the image's lightest point.
- [ ] Informative images have purposeful alt text; decorative ones have `alt=""`.
- [ ] Modern formats + `srcset`/`sizes` served; below-fold images lazy-load; hero is eager with high priority.
- [ ] Every image reserves layout space (dimensions or `aspect-ratio`).

## Related

- [04-elevation-depth.md](./04-elevation-depth.md) — glass surfaces that may sit over imagery and gradients
- [05-shape-radius.md](./05-shape-radius.md) — nested-radius math for images inside cards
- [06-iconography.md](./06-iconography.md) — when an icon, not an illustration, is the right scale
