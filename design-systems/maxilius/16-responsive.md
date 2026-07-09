# 16 · Responsive — Maxilius Design System

> Mobile-first layout rules: one set of tokens, five breakpoints, and predictable collapse patterns so every Maxilius interface works from 320px to 4K.

## Principles

1. **Mobile-first, min-width only.** Base styles target the smallest screen; each breakpoint adds enhancement. Never write `max-width` overrides that undo earlier rules.
2. **Content decides, breakpoints assist.** Break where the layout breaks, not where a device chart says. The named breakpoints are shared vocabulary, not law.
3. **Tokens don't change; their application does.** Colors, radii, type tokens, and control heights are identical at every width — only columns, gaps, margins, and type steps respond.
4. **Touch-friendly by default.** Controls are already 40/48px tall; responsive work never shrinks them below the 44px effective touch target.
5. **No horizontal page scroll, ever.** Wide content (tables, code) scrolls inside its own container.

## The system

### Breakpoints (defined by docs, not yet in code)

No breakpoint tokens exist in `packages/tokens` yet — these values are the documented standard until they land in code.

| Name | Min-width | Typical target |
|---|---|---|
| (base) | 0 | Phones, portrait |
| sm | 640px | Large phones, landscape |
| md | 768px | Tablets |
| lg | 1024px | Laptops, small desktops |
| xl | 1280px | Desktops (also max content width) |
| 2xl | 1536px | Large desktops |

```css
/* Mobile-first min-width snippets */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Grid and page frame (defined by docs, not yet in code)

- 12-column fluid grid, max content width **1280px**, centered.
- Gutter: `space-4` (16px) below md, `space-6` (24px) from md up.
- Page margin: `space-4` (16px) mobile, `space-6` (24px) from md up.
- Section gaps: ≥ `space-12` (48px) mobile, ≥ `space-16` (64px) desktop.

### Grid collapse patterns

| Layout | Base | md ≥ 768px | lg ≥ 1024px |
|---|---|---|---|
| Card grid | 1 column | 2 columns | 3–4 columns |
| Form | 1 column, full-width fields | 2-column field pairs where related | Same, max width ~640px |
| Sidebar + content | Stacked (content first) | Stacked | Sidebar 3 cols / content 9 cols |
| Split hero | Stacked, image below text | 2 columns 1:1 | 2 columns 5:7 |

### Control heights (already touch-friendly)

`size-control-sm` 32px, `size-control-md` 40px (default), `size-control-lg` 48px. Use md as the responsive default; prefer lg for primary mobile CTAs. Never introduce breakpoint-specific control heights — 40/48px work at every width.

### Responsive type stepping

Body stays `font-size-md` (16px) everywhere. Only display sizes step down on small screens, one step on the real scale:

| Role | Base (mobile) | md ≥ 768px |
|---|---|---|
| H1 / display | font-size-4xl (36px) | font-size-5xl (48px) |
| H2 | font-size-3xl (30px) | font-size-4xl (36px) |
| H3 | font-size-2xl (24px) | font-size-3xl (30px) |
| H4 and below | unchanged | unchanged |
| Body / controls | font-size-md / font-size-sm | unchanged |

Keep body line length 45–75ch at every width (defined by docs, not yet in code).

### Responsive spacing

Step down one token on the 4px scale for small screens: `space-16` → `space-12` (sections), `space-8` → `space-6` (card grids), `space-6` → `space-4` (gutters and page margins). Component-internal padding (button padding-x, input padding) never changes.

### Responsive tables

Two sanctioned patterns:

1. **Scroll** (default — what `@maxilius/react` Table ships): keep the table intact inside a wrapper with `overflow-x: auto`. Best for data-dense, comparison-heavy tables.
2. **Card collapse**: below md, render each row as a stacked card (label/value pairs, `radius-lg`, `shadow-sm`). Best for record lists with few columns. This is a markup change you own — the Table component does not do it for you.

Never let a table force the page to scroll horizontally.

### Responsive images

```css
img { max-width: 100%; height: auto; }
```

Use `srcset`/`sizes` for raster images, `aspect-ratio` to reserve space and prevent layout shift, and `object-fit: cover` for art-directed crops. Keep imagery cool-toned per the imagery rules at every size.

### What never changes across breakpoints

- Color tokens, theme behavior, and the one-warm-CTA rule
- Radii, borders, shadows, motion durations and easings
- Control heights (32/40/48px) and icon sizes (16/20/24px)
- Font families (Inter, JetBrains Mono), weights, line-heights
- Focus ring recipe and every accessibility floor
- z-index scale

## Tokens

```css
:root {
  /* Spacing used by responsive layout (4px base) */
  --mx-space-4: 1rem;      /* 16px — mobile gutter/margin */
  --mx-space-6: 1.5rem;    /* 24px — desktop gutter/margin */
  --mx-space-12: 3rem;     /* 48px — mobile section gap */
  --mx-space-16: 4rem;     /* 64px — desktop section gap */
  /* Touch-friendly control heights */
  --mx-size-control-md: 2.5rem;  /* 40px */
  --mx-size-control-lg: 3rem;    /* 48px */
  /* Type steps used by responsive headings */
  --mx-font-size-2xl: 1.5rem;
  --mx-font-size-3xl: 1.875rem;
  --mx-font-size-4xl: 2.25rem;
  --mx-font-size-5xl: 3rem;
}
/* Breakpoints are docs-defined; no --mx-breakpoint-* tokens exist yet.
   Use the raw min-width values 640/768/1024/1280/1536px. */
```

## Usage

Page frame and card grid, mobile-first:

```css
.mx-container {
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: var(--mx-space-4);
}
.mx-card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--mx-space-4);
}
@media (min-width: 768px) {
  .mx-container { padding-inline: var(--mx-space-6); }
  .mx-card-grid { grid-template-columns: repeat(2, 1fr); gap: var(--mx-space-6); }
}
@media (min-width: 1024px) {
  .mx-card-grid { grid-template-columns: repeat(3, 1fr); }
}
```

Responsive heading step and scrollable table:

```html
<h1 class="mx-display">Ship faster with tokens</h1>
<div class="mx-table-scroll">
  <table class="mx-table"><!-- wide data table --></table>
</div>
```

```css
.mx-display { font-size: var(--mx-font-size-4xl); letter-spacing: -0.02em; }
@media (min-width: 768px) {
  .mx-display { font-size: var(--mx-font-size-5xl); }
}
.mx-table-scroll { overflow-x: auto; }
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Write base styles for mobile, then enhance with `@media (min-width: 768px)` | Don't write desktop-first CSS and patch it with `max-width` overrides |
| Collapse a 3-column card grid to 1 column below md, 2 at md | Don't squeeze three cards into 320px and let them overflow |
| Keep buttons and inputs at 40px (md) or 48px (lg) on every screen | Don't shrink controls to 28px on mobile — that's below every touch floor |
| Step H1 from font-size-4xl (36px) to font-size-5xl (48px) at md using real scale tokens | Don't invent in-between sizes like 42px that live off the type scale |
| Step section gaps space-16 → space-12 and gutters space-6 → space-4 on mobile | Don't keep 64px section padding on a 360px phone — it wastes half the viewport |
| Wrap wide tables in an `overflow-x: auto` container | Don't let a 900px table stretch the page and break every other element |
| Use card-collapse below md for short record lists (name, status, date) | Don't card-collapse a 12-column comparison table — scrolling preserves comparability |
| Give images `max-width: 100%` plus `aspect-ratio` to prevent layout shift | Don't hard-code `width="1200"` on a hero image and clip phones |
| Mark breakpoint values "(defined by docs, not yet in code)" when documenting them | Don't invent `--mx-breakpoint-md` tokens in code samples — they don't exist yet |
| Keep the one-warm-CTA rule at every width — one accent button per view | Don't add a second amber CTA on mobile because the first scrolled off-screen |

## Checklist

- [ ] Layout works at 320px wide with no horizontal page scroll
- [ ] All media queries are `min-width` (mobile-first); breakpoints limited to 640/768/1024/1280/1536
- [ ] Grids collapse predictably: 1 → 2 → 3+ columns
- [ ] Controls ≥ 40px tall everywhere; primary mobile CTAs at 48px
- [ ] Headings step down one real token below md; body stays 16px
- [ ] Section gaps and gutters step down one spacing token on mobile
- [ ] Tables either scroll in a wrapper or card-collapse — page never scrolls sideways
- [ ] Images are fluid (`max-width: 100%`) with reserved aspect ratio
- [ ] Verified at 200% zoom on a 1280px viewport (reflows like a 640px screen)
- [ ] Test matrix covered: 320, 375, 640, 768, 1024, 1280, 1536px × light/dark × touch/pointer

## Related

- [00 · Design principles](./00-design-principles.md)
- [15 · Accessibility](./15-accessibility.md)
- [17 · Content, voice, and tone](./17-content-voice-tone.md)
- [18 · Design tokens](./18-design-tokens.md)
