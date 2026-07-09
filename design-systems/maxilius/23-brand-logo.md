# 23 · Brand and logo — Maxilius Design System

> The logo is the one place Maxilius speaks for itself: a geometric mark plus an Inter-set wordmark, always cool-colored, always breathing room, never bent to fit. **(This entire chapter is defined by docs, not yet in code.)**

## Principles

1. **The logo is identity, not UI.** Brand color is pinned to exact hexes and never themes; UI color lives in semantic tokens and swaps with `data-theme`. The two systems share hexes but never a pipeline — see [01 · Color](./01-color.md) and [19 · Theming and dark mode](./19-theming-dark-mode.md).
2. **Cool identity, warm action.** The logo uses only cool colors — blue-600 `#2563EB`, teal-600 `#0D9488`, gray-900, white. Amber and vermillion mean "act now" in Maxilius; an amber logo would cry wolf on every page.
3. **Clear space is part of the logo.** The protected zone travels with the mark. Anything inside it — text, buttons, edges — damages the mark as surely as recoloring it.
4. **One file per job.** Lockup, mark, monochrome, reversed: four variants cover every context. If none fits, the context changes, not the logo.
5. **Never rebuilt, never approximated.** The logo is placed from the published asset. It is not typeset in a heading, screenshotted, or redrawn "close enough".

## The system

### Variants

| Variant | Composition | Use when |
|---|---|---|
| **Lockup** (default) | Mark + "Maxilius" wordmark, Inter semibold (600), gray-900 `#0F172A` | Headers, marketing pages, documents — whenever width ≥ 100px is available |
| **Mark only** | The geometric mark alone, blue-600 → teal-600 accent | Favicons, app icons, avatars, tight square spaces |
| **Monochrome** | Entire lockup or mark in a single gray-900 `#0F172A` | Single-color printing, engraving, watermarks, partner pages that cap color counts |
| **Reversed** | Entire lockup or mark in white `#FFFFFF` | Dark or colored backgrounds (see background rules below) |

On dark UI surfaces the standard treatment is the reversed (white) lockup — matching the spec's gray-50-on-dark wordmark intent within a one-asset system.

### Clear space and minimum sizes

- **Clear space unit:** the height of the capital "M" in the wordmark at the rendered size. Keep at least one M-height of empty space on all four sides — it scales with the logo, so it is never a fixed pixel number.
- **Minimum sizes:** mark only ≥ **24px** height; full lockup ≥ **100px** width. Below 100px, switch to the mark — never shrink the lockup until the wordmark blurs.

### Placement

| Context | Rule |
|---|---|
| Site/app header | Lockup at top-left, links to home, vertically centered in the header bar |
| Footer | Lockup or monochrome mark, first element of the footer block |
| Favicon / app icon | Mark only, on a blue-600 `#2563EB` tile or a white tile — never on gray or amber tiles |
| Social avatars | Mark only, centered, clear space respected inside the circle crop |

### Backgrounds

| Background | Allowed treatment |
|---|---|
| White `#FFFFFF` or gray-50 `#F8FAFC` | Full-color lockup or mark (the only backgrounds where full color is allowed) |
| gray-900 `#0F172A` and darker | Reversed (white) |
| blue-700 `#1D4ED8` and darker blues | Reversed (white) |
| Photography | Reversed (white) over a scrim; the scrim must give the logo ≥ 3:1 contrast |
| Mid-tones (gray-200–gray-600), amber, red, busy imagery | Not allowed — change the background or add a scrim |

### Misuse

| Misuse | Why it's banned |
|---|---|
| Stretch or squash | Distorted geometry reads as a broken product |
| Recolor (amber, red, gradients, off-palette) | Warm = action, not identity; off-palette breaks recognition |
| Add effects (drop shadow, outline, glow, bevel) | The mark is flat by design, like the icon set |
| Rotate or tilt | The mark sits level; rotation reads as decoration |
| Crop or overlap with other elements | Violates clear space; partial marks aren't the brand |
| Set inline in a sentence ("powered by [logo]") | The logo is not a word; use the name "Maxilius" in text |
| Retype the wordmark in a heading style | Typeset text is not the logo — place the asset |
| Place full color on gray-300 or a photo without a scrim | Fails the 3:1 contrast floor for the mark |

### Brand color vs UI color

| | Brand (this doc) | UI ([01](./01-color.md) / [19](./19-theming-dark-mode.md)) |
|---|---|---|
| Values | Pinned hexes: blue-600 `#2563EB`, teal-600 `#0D9488`, gray-900, white | Semantic `--mx-*` roles resolved per theme |
| Themes | Never re-themes; you *choose a variant* per background | Swaps automatically with `data-theme` |
| Warm colors | Never in the logo | Amber/vermillion for CTAs, warnings, destruction |

Practical consequence: don't paint the logo with `var(--mx-action-primary-bg)` — a theme change would recolor your identity.

### Co-branding

- Separate the two logos with a vertical `|` divider in `border-default` gray, centered between them.
- Each logo keeps its own full clear space; the divider sits outside both zones, so the gap is ≥ one M-height + divider + partner's clear-space unit.
- Optically match sizes (equal visual weight, not equal pixel height); Maxilius leads (left) on Maxilius-owned surfaces, follows on partner-owned surfaces.
- Both marks monochrome or both full color — never mixed treatments.

### Creating a logo (guidance for teams building on Maxilius)

- Design the mark as simple geometry — circles, squares, 2px-stroke-compatible forms echoing the icon language — and test it at **16px**: if it turns to mud at favicon size, simplify until it doesn't.
- Set the wordmark in **Inter semibold (600)** — bold (700) is acceptable for very short names — sentence case or lowercase, letter-spacing normal to tight, never ALL CAPS.
- Pick cool identity colors; reserve your warm colors for actions, exactly as Maxilius does.

## Tokens

Logo layout constants as custom properties, so headers and footers stay consistent. **(Defined by docs — these are not emitted by the `@maxilius/tokens` build; declare them in your brand stylesheet.)**

```css
:root {
  --mx-logo-mark-size-min: 24px;      /* mark never renders smaller */
  --mx-logo-lockup-width-min: 100px;  /* below this, switch to the mark */
  --mx-logo-header-height: 32px;      /* default lockup height in app headers */
  --mx-logo-clear-space: 0.72em;      /* ≈ cap height of "M" at the logo's font size */
  --mx-logo-color-wordmark: #0F172A;  /* gray-900 — pinned, never themed */
  --mx-logo-color-accent-start: #2563EB; /* blue-600 */
  --mx-logo-color-accent-end: #0D9488;   /* teal-600 */
  --mx-logo-color-reversed: #FFFFFF;
}
```

## Usage

Header lockup — linked home, clear space enforced by padding, not by margins that collapse:

```html
<header class="site-header">
  <a class="site-header__logo" href="/" aria-label="Maxilius home">
    <img src="/brand/maxilius-lockup.svg" alt="Maxilius" height="32" />
  </a>
  <nav aria-label="Primary">…</nav>
</header>
```

```css
.site-header {
  display: flex;
  align-items: center;
  gap: var(--mx-space-8);
  background: var(--mx-bg-surface);
  border-bottom: var(--mx-border-width-thin) solid var(--mx-border-default);
}
.site-header__logo {
  padding: var(--mx-logo-clear-space); /* the M-height zone, baked in */
}
.site-header__logo img { height: var(--mx-logo-header-height); display: block; }
```

Reversed mark on a photo hero — scrim guarantees the 3:1 floor:

```css
.hero {
  position: relative;
  background: url('/img/hero.jpg') center / cover;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgb(2 6 23 / 0.55); /* cool scrim; verify logo contrast ≥ 3:1 */
}
.hero .logo-reversed {
  position: relative;
  height: 40px; /* lockup ≥ 100px wide at this height */
  /* asset is the white variant — never a CSS filter over the color logo */
}
```

Favicon tile: export the mark centered on a blue-600 `#2563EB` square (or white for contexts that add their own tint), with clear space inside the tile so platform corner-rounding never clips the mark.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use the full-color lockup only on white or gray-50 backgrounds | Don't place the color logo on gray-300, amber, or unscrimmed photos — it fails the 3:1 floor |
| Switch to the mark below 100px of available width | Don't shrink the lockup until "Maxilius" is an illegible smear |
| Keep one M-height of clear space on all sides | Don't tuck a button or tagline against the logo's edge |
| Use the reversed (white) variant on gray-900+, blue-700+, and scrimmed photos | Don't run `filter: invert()` or brightness hacks over the color asset |
| Pin brand hexes (`#2563EB`, `#0D9488`, `#0F172A`) in brand collateral | Don't paint the logo with `--mx-action-primary-bg` — themes would recolor your identity |
| Keep the logo in cool colors in every context | Don't produce an amber or vermillion logo "for the campaign" — warm means act, not us |
| Write "Maxilius" as a plain word in sentences | Don't drop the logo image inline in running text |
| Place the exported SVG/PNG asset | Don't retype the wordmark in Inter and call it the logo — spacing and mark geometry will drift |
| In co-branding, give both logos full clear space around a `|` divider | Don't lock a partner logo against yours with a 4px gap |
| Test any new mark at 16px before adopting it | Don't ship a mark whose detail vanishes at favicon size |

## Checklist

- [ ] Correct variant for the context: lockup ≥ 100px wide, mark for tight/square spots, reversed on dark
- [ ] Full color appears only on white or gray-50; everything else uses reversed or monochrome
- [ ] Clear space ≥ one M-height on all four sides, at the rendered size
- [ ] Mark never below 24px; lockup never below 100px wide
- [ ] Header lockup links to home and carries an accessible label
- [ ] Photo placements use a scrim and the logo reads at ≥ 3:1 contrast
- [ ] No stretching, recoloring, effects, rotation, cropping, or inline-in-text use anywhere
- [ ] Brand colors are pinned hexes in brand assets — no semantic tokens painting the logo
- [ ] Co-branding uses the `|` divider with both clear-space zones intact and matched treatments

## Related

- [01 · Color](./01-color.md) — the ramps the brand hexes come from, and why warm is reserved
- [19 · Theming and dark mode](./19-theming-dark-mode.md) — why the logo picks variants instead of theming
- [07 · Imagery and illustration](./07-imagery-illustration.md) — cool-toned imagery the logo sits on
- [17 · Content, voice, and tone](./17-content-voice-tone.md) — writing "Maxilius" in prose
- [20 · Governance](./20-governance.md) — brand assets are versioned alongside, but outside, product tokens
