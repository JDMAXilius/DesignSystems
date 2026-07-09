# 16 · Responsive — Cloud Design System
> One system, every screen: mobile-first layouts that scale up gracefully instead of desktop designs squeezed down.

## Principles

1. **Mobile-first.** Base styles target the smallest screen; `min-width` queries add complexity as space appears.
2. **Content decides breakpoints.** Break where the layout strains, not where a device chart says.
3. **Layout adapts, identity doesn't.** Grids collapse and type steps down; colors, radii, and voice never change.
4. **Touch is the default input.** Assume fingers below `lg`; the mouse is the enhancement.
5. **Fluid between stops.** Percentages, `minmax()`, and `auto-fit` between breakpoints — not one fixed design per breakpoint.

## The system

### Breakpoints (mobile-first, min-width)

| Token | Min-width | Typical target |
|---|---|---|
| `sm` | 640px | Large phones, landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops, sidebar appears |
| `xl` | 1280px | Desktops (max content width) |
| `2xl` | 1536px | Large monitors |

Grid: 12 fluid columns, gutter 24px (16px below `md`), max content width 1280px, page margin 24px (16px below `md`).

### Layout collapse

| Pattern | Base (mobile) | ≥ md | ≥ lg |
|---|---|---|---|
| Card grid | 1 column | 2 columns | 3 columns |
| App shell | Sidebar becomes a drawer (overlay, elevation-4) | Drawer | Persistent sidebar |
| Forms | Single column, full-width buttons | Single column | Two-column field groups where related |
| Nav | Collapsed menu button | Collapsed | Full horizontal nav |

### Responsive type scale

Body (`text-md` 16px) and smaller never shrink. Display sizes step down one token below `md`:

| Role | ≥ md (desktop) | < md (mobile) |
|---|---|---|
| Hero display | text-6xl 60/66 | text-5xl 48/56 |
| H1 | text-5xl 48/56 | text-4xl 36/44 |
| H2 | text-4xl 36/44 | text-3xl 30/38 |
| H3 | text-3xl 30/38 | text-2xl 24/32 |
| H4 and below | unchanged | unchanged |

Keep body line length 45–75ch at every width (66ch ideal).

### Touch targets and mobile forms

- All interactive elements ≥ **44×44px** below `lg`; prefer lg buttons (48px) for primary mobile actions.
- Primary buttons in mobile forms go **full-width**; inputs stay 40px tall and full-width.
- Stack label → input → help/error vertically; never side-by-side labels on mobile.

### Responsive spacing

| Token use | Desktop (≥ md) | Mobile (< md) |
|---|---|---|
| Section gap | space-24 (96px) | space-12 (48px) |
| Container page margin | space-6 (24px) | space-4 (16px) |
| Grid gutter | 24px | 16px |
| Card padding | space-6 (24px) | space-4 (16px) |

Section gaps never drop below 48px on mobile — proximity grouping must survive the collapse.

### Responsive tables

Pick one strategy per table:

1. **Horizontal scroll with affordance** — wrap in an `overflow-x: auto` container, keep the first column sticky, and show a fading edge gradient so users know there's more.
2. **Card collapse** — below `md`, each row becomes a card: cell values stacked with their column header as a text-sm cloud-600 label.

Never let a table force the whole page to scroll sideways.

### Responsive images

Serve scaled assets with `srcset`/`sizes`; images never overflow (`max-width: 100%; height: auto;`). Reserve aspect ratio to avoid layout shift.

### What never changes across breakpoints

Colors and semantic roles · radius values (radius-md 10px stays 10px) · shadows/elevation levels · icon stroke (1.5px) · motion durations and easing · voice and copy rules · focus ring (2px sky-500, offset 2px).

## Tokens

```css
:root {
  /* Breakpoints (reference values — use in media queries) */
  --cds-breakpoint-sm: 640px;
  --cds-breakpoint-md: 768px;
  --cds-breakpoint-lg: 1024px;
  --cds-breakpoint-xl: 1280px;
  --cds-breakpoint-2xl: 1536px;

  /* Layout */
  --cds-container-max: 1280px;
  --cds-container-margin: 16px;   /* mobile default */
  --cds-grid-gutter: 16px;        /* mobile default */
  --cds-section-gap: 48px;        /* mobile default */
}

@media (min-width: 768px) {
  :root {
    --cds-container-margin: 24px;
    --cds-grid-gutter: 24px;
    --cds-section-gap: 96px;
  }
}
```

## Usage

Mobile-first card grid collapsing 3→2→1:

```css
.cds-container {
  max-width: var(--cds-container-max);
  margin-inline: auto;
  padding-inline: var(--cds-container-margin);
}

.cds-card-grid {
  display: grid;
  grid-template-columns: 1fr;            /* base: 1 column */
  gap: var(--cds-grid-gutter);
}
@media (min-width: 768px) {
  .cds-card-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .cds-card-grid { grid-template-columns: repeat(3, 1fr); }
}
```

Responsive headings and full-width mobile button:

```css
h1 { font-size: 36px; line-height: 44px; font-weight: 700; }
@media (min-width: 768px) {
  h1 { font-size: 48px; line-height: 56px; letter-spacing: -0.02em; }
}

.cds-btn-primary { width: 100%; min-height: 48px; }   /* mobile forms */
@media (min-width: 768px) {
  .cds-btn-primary { width: auto; min-height: 40px; }
}
```

Scrollable table with affordance:

```html
<div class="cds-table-scroll" role="region" aria-label="Quarterly results" tabindex="0">
  <table><!-- ... --></table>
</div>
```

```css
.cds-table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background:
    linear-gradient(to left, rgba(15, 23, 42, 0.06), transparent 24px) right / 24px 100% no-repeat;
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Write base styles for mobile and add `min-width: 768px` queries upward | Don't write desktop-first `max-width` queries that subtract complexity downward |
| Collapse card grids 3→2→1 at lg and md | Don't squeeze three columns onto a 375px screen — cards need full width there |
| Turn the sidebar into an overlay drawer below `lg` (elevation-4, Esc to close) | Don't leave a 240px sidebar eating half a phone screen |
| Step H1 from text-5xl down to text-4xl below `md` | Don't shrink body text below 16px to fit more on mobile |
| Make primary buttons full-width and 48px tall in mobile forms | Don't keep a 32px sm button as the main mobile action — it misses the 44px target |
| Drop section gaps from 96px to 48px on mobile | Don't keep 96px sections on a phone — half the viewport becomes empty space |
| Wrap wide tables in `overflow-x: auto` with a fade affordance, or card-collapse them | Don't let a table stretch the page and break the container |
| Use `srcset`/`sizes` so phones get phone-sized images | Don't ship one 2400px hero image to every device |
| Keep radius-lg cards at 16px and sky-600 actions at every width | Don't invent "mobile colors" or tighter radii for small screens |
| Test at 320px width and 200% zoom before shipping | Don't sign off from a 1440px browser window alone |

## Checklist

- [ ] Base styles are mobile; all media queries are `min-width`
- [ ] Layout works at 320px, 640px, 768px, 1024px, 1280px, 1536px (test matrix)
- [ ] Grids collapse 3→2→1; sidebar becomes a drawer below lg
- [ ] Display type steps down one token below md; body stays 16px
- [ ] Touch targets ≥44px; primary mobile form buttons are full-width
- [ ] Section gaps 96px desktop / 48px mobile; container margin 24px / 16px
- [ ] Tables scroll in their own container or collapse to cards — the page never scrolls sideways
- [ ] Images use `srcset`/`sizes` and never overflow
- [ ] Colors, radii, shadows, motion, and voice are identical at every breakpoint
- [ ] Checked in portrait and landscape on a real phone or emulator

## Related

- [15 · Accessibility](./15-accessibility.md) — touch targets and zoom
- [17 · Content, voice and tone](./17-content-voice-tone.md) — copy stays the same at every width
- [18 · Design tokens](./18-design-tokens.md) — spacing and breakpoint tokens
