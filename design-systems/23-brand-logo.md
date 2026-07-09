# 23 · Brand & logo — Cloud Design System
> Rules for placing any logo — yours or a client's — inside the system: variants, clear space, backgrounds, and the line between brand color and UI color.

## Principles

1. **The logo is a guest, not the interior.** It identifies the site; the design system does the talking. A logo appears in a few fixed places — it never becomes decoration.
2. **Four variants or it isn't a brand.** Full lockup, mark only, monochrome, reversed. Missing one means a context where the logo breaks.
3. **Clear space is part of the logo.** The exclusion zone ships with the asset; crowding it is the same as redrawing it.
4. **Brand color ≠ UI color.** A brand may re-theme the primary ramp (doc 19), but logo colors have no automatic claim on links, buttons, or text.
5. **Legibility beats fidelity.** On any background where the full-color logo muddies, switch variant — never add effects to force it.

## The system

### Logo variants every brand needs

| Variant | What it is | Color | Used for |
|---|---|---|---|
| Full lockup | Mark + wordmark | Brand colors | Headers, footers, documents — the default |
| Mark only | Symbol alone | Brand colors | Favicons, app icons, avatars, tight spaces <100px |
| Monochrome | Any variant in one color | cloud-900 `#0F172A` | Print, engraving, low-color contexts, watermarks |
| Reversed | Any variant in light color | cloud-0 `#FFFFFF` | Dark surfaces (cloud-900+), photos, the signature gradient |

### Clear space & minimum sizes

| Rule | Value |
|---|---|
| Clear space (exclusion zone) | ≥ the logo's x-height (or the mark's height for mark-only) on all four sides |
| Minimum digital size — mark | 24px height |
| Minimum digital size — full lockup | 100px width |
| Below minimum? | Switch to mark only; below 24px, rely on the favicon tile |

Nothing enters the exclusion zone: no text, no buttons, no other logos, no container edges.

### Placement

| Location | Rule |
|---|---|
| Header | Top-left, vertically centered in the 64px header (doc 11); always links to home |
| Footer | Lockup or mark at the top of the footer block; monochrome or reversed to match footer surface |
| Favicon / app icon | Mark only, on a `sky-600` or `cloud-0` tile, radius per platform; never the lockup |
| Loading / splash | Mark only, centered — may fade in at `duration-fast`, never spin or bounce |

### Backgrounds

| Background | Allowed variant |
|---|---|
| cloud-0 / cloud-50 | Full-color lockup or mark |
| cloud-100 – cloud-800 | Monochrome (cloud-900) up to cloud-200; reversed from cloud-700 up; avoid the mid-greys in between |
| cloud-900 / cloud-950, sky-700+ | Reversed (cloud-0) only |
| Photography | Reversed over a scrim delivering ≥3:1 contrast — never on busy imagery without a scrim |
| Signature gradient | Reversed white only — full-color logos fight the gradient and lose |

### Misuse — never do these

| Misuse | Why it's banned |
|---|---|
| Stretch or skew | Distorted proportions read as a counterfeit brand |
| Recolor outside the four approved variants | Ad-hoc colors fork the brand; sky-600 is a UI color, not a logo color |
| Add shadows, outlines, glows, or effects | If the logo needs an effect to be visible, the background is wrong — change variant instead |
| Rotate | The logo has one orientation; rotation is decoration |
| Place inside a sentence | "Powered by [logo]" mid-sentence breaks reading flow and screen readers — use the brand name in text |
| Redraw or crop the mark | Partial or approximated marks are new, unapproved marks |

### Logo + design system

- **Brand theming:** a brand accent may replace the sky ramp at the primitive-alias level, per the brand-theming rules in [19 · Theming & dark mode](./19-theming-dark-mode.md) — the ramp must supply a 600-equivalent at ≥4.5:1 on white.
- **Logo colors do NOT need to become UI colors.** A coral-and-navy logo can happily sit in a header above sky-600 buttons. Promote a logo color to the UI only if it passes the contrast gates in [01 · Color](./01-color.md); otherwise the system palette stays.
- The logo never inherits UI states: no hover darkening, no focus ring styling beyond the standard ring on its home link.

### Co-branding

- Separate the two logos with a vertical divider `|` (1px, `cloud-300`), with each logo's full clear space on both sides of the divider.
- **Equal visual weight:** optically size both logos to the same perceived mass (match x-heights, not bounding boxes).
- Maximum two logos in a lockup; three or more become a logo wall — grid them instead, each on its own `cloud-0` tile.

### Creating a logo (for brand-new projects)

This system often serves projects with no brand yet. A safe default:

- **Mark:** one simple geometric form (circle, rounded square, single-stroke symbol) that survives at 16px — test it at favicon size first, not last.
- **One-color test:** the mark must work in a single color; if it depends on gradients or overlaps, simplify.
- **Wordmark:** set the name in Plus Jakarta Sans 600 or 700, sentence case or lowercase, letter-spacing `-0.02em` at large sizes — a solid default that matches every heading in the system.
- Cut the four variants (lockup, mark, monochrome, reversed) on day one, before the first page ships.

## Tokens

```css
:root {
  /* Logo sizing */
  --cds-logo-mark-size: 32px;          /* header default; never below 24px */
  --cds-logo-mark-size-min: 24px;
  --cds-logo-lockup-width-min: 100px;
  --cds-logo-lockup-height-header: 32px;

  /* Clear space — set to the logo's x-height (or mark height for mark-only) */
  --cds-logo-clearspace: 16px;

  /* Approved single-color variants */
  --cds-logo-mono: var(--cds-color-cloud-900, #0F172A);
  --cds-logo-reversed: var(--cds-color-cloud-0, #FFFFFF);

  /* Favicon / app-icon tile */
  --cds-logo-tile-bg: #0284C7;         /* sky-600; cloud-0 also approved */
}
```

## Usage

Header logo — clear space via padding, mark swap on tight viewports:

```html
<header class="site-header">
  <a href="/" class="logo-home" aria-label="Driftless — home">
    <img src="/brand/lockup.svg" alt="" class="logo logo--lockup">
    <img src="/brand/mark.svg" alt="" class="logo logo--mark">
  </a>
  <nav>…</nav>
</header>
```

```css
.logo-home { display: inline-flex; padding: var(--cds-logo-clearspace); }
.logo--lockup { height: var(--cds-logo-lockup-height-header); }
.logo--mark { display: none; height: var(--cds-logo-mark-size); }
@media (max-width: 400px) {
  .logo--lockup { display: none; }   /* lockup would fall under 100px wide */
  .logo--mark { display: block; }
}
```

Reversed logo over photography, with a scrim guaranteeing ≥3:1:

```css
.photo-hero { position: relative; }
.photo-hero::after {          /* scrim */
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.25));
}
.photo-hero .logo { position: relative; z-index: 1; }
.photo-hero .logo img { content: url("/brand/lockup-reversed.svg"); } /* cloud-0 variant */
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Ship all four variants (lockup, mark, monochrome, reversed) before the first page | Don't launch with only a full-color lockup — the first dark footer or favicon will force an improvised variant |
| Keep an exclusion zone ≥ the logo's x-height on all sides | Don't butt a nav link or button against the wordmark because the header felt cramped |
| Switch to mark-only below 100px lockup width | Don't scale the lockup to 60px and ship an unreadable wordmark smear |
| Put the header logo top-left and link it to home | Don't center the logo over the nav or make it a dead image — users expect logo = home |
| Use the reversed (cloud-0) variant on cloud-900+, sky-700+, and the signature gradient | Don't place the full-color logo on the gradient — it fights the sky-400 → twilight-500 blend and loses |
| Add a scrim hitting ≥3:1 before placing a logo over photography | Don't drop a white logo straight onto a busy sky photo and hope the clouds cooperate |
| Keep the monochrome variant exactly cloud-900 (or cloud-0 reversed) | Don't recolor the mark sky-600 to "match the buttons" — UI color and brand color are separate systems |
| Write the brand name in text when it appears mid-sentence | Don't embed the logo image inside a sentence — it breaks line height, reading flow, and screen readers |
| Theme the primary ramp per doc 19 when a brand needs its own accent | Don't force every logo color into links and buttons — a color that fails 4.5:1 stays out of the UI |
| Give co-brand lockups a `|` divider with full clear space and matched x-heights | Don't bounding-box-align two logos — a tall mark next to a wide wordmark reads as unequal partners |
| Test a new mark at 16px in one color before refining details | Don't design a logo at 800px with gradients and fine strokes that vanish at favicon size |

## Checklist

- [ ] All four variants exist as SVG: full lockup, mark only, monochrome (cloud-900), reversed (cloud-0)
- [ ] Clear space ≥ x-height (or mark height) enforced everywhere — nothing enters the zone
- [ ] Mark never rendered below 24px; lockup never below 100px wide
- [ ] Header logo is top-left, links to home, with an `aria-label` naming the brand
- [ ] Favicon/app icon is the mark only, on a sky-600 or cloud-0 tile
- [ ] Full-color logo appears only on cloud-0/cloud-50; reversed handles dark surfaces and photos
- [ ] Every photo placement has a scrim delivering ≥3:1 logo contrast
- [ ] No stretching, recoloring, shadows, outlines, rotation, cropping, or in-sentence logos anywhere
- [ ] Brand theme (if any) follows doc 19 — 600-equivalent passes 4.5:1 on white
- [ ] Co-brand lockups use the `|` divider, equal clear space, and matched visual weight

## Related

- [19 · Theming & dark mode](./19-theming-dark-mode.md) — swapping the primary ramp for a brand accent
- [01 · Color](./01-color.md) — contrast gates before any logo color enters the UI
- [11 · Navigation](./11-navigation.md) — the header the logo lives in
- [07 · Imagery & illustration](./07-imagery-illustration.md) — scrims and overlays under reversed logos
- [02 · Typography](./02-typography.md) — Plus Jakarta Sans, the default wordmark face
