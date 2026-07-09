# 12 · Cards & surfaces — Cloud Design System

> Cards group related content on a soft, elevated surface; the surface hierarchy keeps every page feeling airy and organized.

## Principles

1. **One idea per card.** A card is a single, self-contained unit of content with one clear subject and (usually) one primary action.
2. **Soft depth, not heavy chrome.** Separate a card from the page with *either* a `cloud-200` border *or* `elevation-1` — pick one per context, never stack both heavily.
3. **Surfaces step by one.** Page (`cloud-50`) → surface (`cloud-0`) → sunken (`cloud-100`). Each layer moves exactly one step on the cloud ramp.
4. **Elevation means interactivity.** Resting cards sit at `elevation-1`; only clickable cards rise to `elevation-2` on hover.
5. **Flat inside.** Content inside a card is organized with spacing and typography, never with nested cards.

## The system

### Card anatomy

| Part | Value |
|---|---|
| Padding | `space-6` (24px) all sides |
| Radius | `radius-lg` (16px) |
| Background | `cloud-0` (#FFFFFF) |
| Separation | `1px` border `cloud-200` (#E2E8F0) **or** `elevation-1` — one per context |
| Title | `text-xl` (20px / 28px, weight 600), `cloud-900` |
| Body | `text-sm` (14px / 20px), `cloud-600` |
| Internal gap | `space-3` (12px) title → body, `space-4` (16px) body → footer/actions |

Nested radius rule: inner element radius = outer radius − padding. An image or panel inside a 16px-radius, 24px-padded card is effectively square-cornered; a full-bleed media top uses `radius-lg` on its top corners only.

### Card variants

| Variant | Rules |
|---|---|
| Default | Static container. `cloud-0` bg, `radius-lg`, `space-6` padding, border **or** `elevation-1`. |
| Interactive | Whole card is clickable. Hover: `elevation-2` + `translateY(-2px)`, `duration-fast` (150ms). Focus-visible: 2px `sky-500` ring, 2px offset. Cursor pointer. |
| Media | Image flush to the top edge (no padding above), top corners `radius-lg`, 16:9 default ratio, content block keeps `space-6` padding. |
| Stat | KPI value `text-4xl` (36px, weight 700) `cloud-900`, label `text-sm` `cloud-600`. See [14-data-display.md](14-data-display.md). |

### Surface hierarchy

| Layer | Token | Hex | Use |
|---|---|---|---|
| Page | `cloud-50` | #F8FAFC | App/page background |
| Surface | `cloud-0` | #FFFFFF | Cards, panels, raised content |
| Sunken | `cloud-100` | #F1F5F9 | Wells, code areas, inset regions inside a surface |

Dark mode inverts by lightness: page `cloud-950`, surface `cloud-900`, raised `cloud-800`. Shadows weaken in dark mode — communicate elevation with the lighter surface color instead.

### Card grids

| Property | Value |
|---|---|
| Columns | `repeat(auto-fit, minmax(280px, 1fr))` |
| Gap | `space-6` (24px), 16px on mobile |
| Alignment | Cards stretch to equal height per row |

## Tokens

```css
:root {
  /* Surfaces */
  --cds-bg-page: #F8FAFC;      /* cloud-50 */
  --cds-bg-surface: #FFFFFF;   /* cloud-0 */
  --cds-bg-sunken: #F1F5F9;    /* cloud-100 */

  /* Card */
  --cds-card-padding: 24px;            /* space-6 */
  --cds-card-radius: 16px;             /* radius-lg */
  --cds-card-border: 1px solid #E2E8F0; /* cloud-200 */
  --cds-card-gap: 24px;                /* grid gap, space-6 */

  /* Elevation */
  --cds-elevation-1: 0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06);
  --cds-elevation-2: 0 2px 4px rgba(15,23,42,0.04), 0 4px 8px rgba(15,23,42,0.06);

  /* Card text */
  --cds-card-title-color: #0F172A;  /* cloud-900 */
  --cds-card-body-color: #475569;   /* cloud-600 */

  /* Motion */
  --cds-duration-fast: 150ms;
  --cds-ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* Focus */
  --cds-focus-ring: 0 0 0 2px #FFFFFF, 0 0 0 4px #0EA5E9; /* sky-500, 2px offset */
}
```

## Usage

### Default and interactive cards

```css
.cds-card {
  background: var(--cds-bg-surface);
  border: var(--cds-card-border);        /* OR box-shadow: var(--cds-elevation-1); */
  border-radius: var(--cds-card-radius);
  padding: var(--cds-card-padding);
}
.cds-card__title {
  font-size: 20px; line-height: 28px; font-weight: 600;
  color: var(--cds-card-title-color);
  margin: 0 0 12px; /* space-3 */
}
.cds-card__body {
  font-size: 14px; line-height: 20px;
  color: var(--cds-card-body-color);
}
.cds-card--interactive {
  position: relative;
  transition: box-shadow var(--cds-duration-fast) var(--cds-ease-standard),
              transform var(--cds-duration-fast) var(--cds-ease-standard);
}
.cds-card--interactive:hover {
  box-shadow: var(--cds-elevation-2);
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) {
  .cds-card--interactive { transition: none; }
  .cds-card--interactive:hover { transform: none; }
}
```

### Whole-card click target (stretched link)

Make one link cover the card instead of wrapping everything in `<a>` — keeps the accessible name short and lets secondary actions stay independently clickable.

```html
<article class="cds-card cds-card--interactive">
  <h3 class="cds-card__title">
    <a href="/projects/atlas" class="cds-card__link">Atlas migration</a>
  </h3>
  <p class="cds-card__body">Move billing data to the new region by Q3.</p>
</article>
```

```css
.cds-card__link { color: inherit; text-decoration: none; }
.cds-card__link::after { content: ""; position: absolute; inset: 0; }
.cds-card__link:focus-visible::after {
  border-radius: var(--cds-card-radius);
  box-shadow: var(--cds-focus-ring);
}
/* Secondary actions inside the card must layer above the stretched link */
.cds-card--interactive .cds-card__action { position: relative; z-index: 1; }
```

### Card grid and media card

```html
<div class="cds-card-grid">
  <article class="cds-card cds-card--media">
    <img class="cds-card__media" src="cover.jpg" alt="">
    <div class="cds-card__content">
      <h3 class="cds-card__title">Weekly digest</h3>
      <p class="cds-card__body">Highlights from the last seven days.</p>
    </div>
  </article>
</div>
```

```css
.cds-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--cds-card-gap);
}
.cds-card--media { padding: 0; overflow: hidden; }
.cds-card__media { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; }
.cds-card--media .cds-card__content { padding: var(--cds-card-padding); }
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Separate cards from the page with a `cloud-200` border **or** `elevation-1`, chosen once per context | Don't stack a strong border and a heavy shadow on the same card — it reads as double chrome |
| Keep card padding at `space-6` (24px) and radius at `radius-lg` (16px) everywhere | Don't invent per-card padding (18px, 22px) — off-grid values break the 4px rhythm |
| Reserve hover `elevation-2` + `translateY(-2px)` for cards that are actually clickable | Don't animate hover lift on static cards — elevation change promises interactivity |
| Use the stretched-link technique so the whole card is one 44px+ click target with a short accessible name | Don't wrap an entire card in `<a>` — screen readers announce every word of the card as the link label |
| Step surfaces one ramp stop at a time: page `cloud-50` → card `cloud-0` → well `cloud-100` | Don't nest cards inside cards — use a `cloud-100` sunken well or a `cloud-200` divider instead |
| Set card titles in `text-xl` 600 `cloud-900` and body in `text-sm` `cloud-600` | Don't set body copy in `cloud-400` — it's for large or disabled text only and fails 4.5:1 at 14px |
| Run media flush to the card's top edge with top corners at `radius-lg` | Don't inset an image inside padding while keeping 16px radius on it — inner radius must be outer − padding |
| Lay out card grids with `repeat(auto-fit, minmax(280px, 1fr))` and a 24px gap | Don't hard-code 3 columns — cards below 280px wide wrap titles badly and crowd their 24px padding |
| Animate hover lift with `transform` and `box-shadow` over 150ms, and honor `prefers-reduced-motion` | Don't animate `margin-top` or `height` for the lift — layout properties jank; animate transform/opacity only |
| Put one primary action per card, aligned to the card's footer | Don't stack two solid `sky-600` buttons inside one card — one primary per view/section |

## Checklist

- [ ] Card uses `cloud-0` background, `radius-lg` (16px), `space-6` (24px) padding
- [ ] Exactly one separation method: `cloud-200` border or `elevation-1`
- [ ] Interactive cards: hover `elevation-2` + `translateY(-2px)` in 150ms, visible 2px `sky-500` focus ring
- [ ] Whole-card click uses a stretched link; secondary actions raised above it with `z-index`
- [ ] Title `text-xl` 600, body `text-sm` `cloud-600`; contrast ≥ 4.5:1
- [ ] Grid is `auto-fit, minmax(280px, 1fr)` with 24px gap
- [ ] No cards nested in cards; insets use `cloud-100`
- [ ] `prefers-reduced-motion` disables the hover lift
- [ ] Dark mode: surface `cloud-900` on page `cloud-950`, elevation shown by lighter surface

## Related

- [13-feedback.md](13-feedback.md) — modals and toasts reuse surface + elevation rules
- [14-data-display.md](14-data-display.md) — stat cards, tables, and KPI blocks that live on card surfaces
