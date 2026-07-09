# 01 · Color — Maxilius Design System

> Six ramps, two temperatures, one rule: cool colors build the framework, warm colors demand attention.

## Principles

1. **Cool framework, warm action.** Cool hues (cool gray, blue, teal) recede — they are for
   surfaces, structure, text, and routine actions. Warm hues (amber, vermillion) advance — they
   are only for the moments that must pull the eye: CTAs, warnings, destructive actions.
2. **Semantic roles, not raw hexes.** Components consume `--mx-color-*` semantic tokens only.
   Primitives (the ramps below) feed the semantic layer and never appear in component CSS.
3. **Dark mode is a token swap.** Light and dark define identical token paths (build-enforced),
   so switching `data-theme` restyles everything without component changes.
4. **Contrast is non-negotiable.** Every published pairing meets WCAG 2.2 AA: 4.5:1 for text,
   3:1 for UI components. That is why amber actions take dark text.
5. **Warm is scarce.** At most one warm CTA per view; overall aim for mostly cool neutral, some
   cool brand color, a sliver of warm (60-30-10 proportion guidance defined by docs, not yet in code).

## The system

### Temperature: which hues do what

| Temperature | Hues | Allowed uses |
|---|---|---|
| Cool | Cool gray (`gray-*`) | Canvas, surfaces, borders, body/secondary/muted text, neutral & ghost actions, disabled states |
| Cool | Blue (`blue-*`, primary `#2563EB`) | Primary actions, links, focus ring, info feedback, selected states |
| Cool | Teal (`teal-*`, secondary `#0D9488`) | Secondary actions, supporting brand accents |
| Warm | Amber (`amber-*`, accent `#F59E0B`) | The one attention CTA per view, warning feedback |
| Warm | Vermillion red (`red-*`, danger `#DC2626`) | Destructive actions, error/danger feedback |
| — | Green (`green-*`, success `#16A34A`) | Success feedback only — a status color, not a brand or action color |

Base: `white #FFFFFF` · `black #000000`.

### Neutrals — cool gray

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| gray-50 | #F8FAFC | | gray-600 | #475569 |
| gray-100 | #F1F5F9 | | gray-700 | #334155 |
| gray-200 | #E2E8F0 | | gray-800 | #1E293B |
| gray-300 | #CBD5E1 | | gray-900 | #0F172A |
| gray-400 | #94A3B8 | | gray-950 | #020617 |
| gray-500 | #64748B | | | |

### Primary — blue (cool)

| Token | Hex | Role |
|---|---|---|
| blue-50 | #EFF6FF | primary subtle bg / info bg (light) |
| blue-100 | #DBEAFE | |
| blue-200 | #BFDBFE | info border (light) |
| blue-300 | #93C5FD | primary subtle text (dark) |
| blue-400 | #60A5FA | link + focus ring (dark) |
| blue-500 | #3B82F6 | focus ring (light) |
| blue-600 | #2563EB | primary action bg / links (light) |
| blue-700 | #1D4ED8 | primary hover (light) |
| blue-800 | #1E40AF | primary active (light) |
| blue-900 | #1E3A8A | |
| blue-950 | #172554 | primary subtle bg (dark) |

### Secondary — teal (cool)

| Token | Hex | Role |
|---|---|---|
| teal-50 | #F0FDFA | secondary subtle bg (light) |
| teal-100 | #CCFBF1 | |
| teal-200 | #99F6E4 | |
| teal-300 | #5EEAD4 | secondary subtle text (dark) |
| teal-400 | #2DD4BF | secondary active (dark) |
| teal-500 | #14B8A6 | secondary hover (dark) |
| teal-600 | #0D9488 | secondary action bg |
| teal-700 | #0F766E | secondary hover (light) |
| teal-800 | #115E59 | secondary active (light) |
| teal-900 | #134E4A | |
| teal-950 | #042F2E | secondary subtle bg (dark) |

### Accent — amber (warm: attention, CTA, warning)

| Token | Hex | Role |
|---|---|---|
| amber-50 | #FFFBEB | accent subtle bg / warning bg (light) |
| amber-100 | #FEF3C7 | |
| amber-200 | #FDE68A | warning border (light) |
| amber-300 | #FCD34D | accent active (dark) |
| amber-400 | #FBBF24 | accent hover / warning text (dark) |
| amber-500 | #F59E0B | accent action bg — **always dark text on it** |
| amber-600 | #D97706 | accent hover (light) / warning text (light) |
| amber-700 | #B45309 | accent active (light) |
| amber-800 | #92400E | |
| amber-900 | #78350F | |
| amber-950 | #451A03 | accent subtle bg (dark) |

### Danger — vermillion red (warm)

| Token | Hex | Role |
|---|---|---|
| red-50 | #FEF2F2 | danger subtle bg / danger feedback bg (light) |
| red-100 | #FEE2E2 | |
| red-200 | #FECACA | danger border (light) |
| red-300 | #FCA5A5 | danger subtle text (dark) |
| red-400 | #F87171 | danger text (dark) |
| red-500 | #EF4444 | danger hover (dark) |
| red-600 | #DC2626 | danger action bg / danger text (light) |
| red-700 | #B91C1C | danger hover (light) |
| red-800 | #991B1B | danger active (light) |
| red-900 | #7F1D1D | |
| red-950 | #450A0A | danger subtle bg (dark) |

### Success — green

| Token | Hex | Role |
|---|---|---|
| green-50 | #F0FDF4 | success feedback bg (light) |
| green-100 | #DCFCE7 | |
| green-200 | #BBF7D0 | success border (light) |
| green-300 | #86EFAC | success feedback text (dark) |
| green-400 | #4ADE80 | success text/icon (dark) |
| green-500 | #22C55E | |
| green-600 | #16A34A | success text/icon (light) |
| green-700 | #15803D | success feedback text (light) |
| green-800 | #166534 | |
| green-900 | #14532D | |
| green-950 | #052E16 | success feedback bg (dark) |

### Semantic roles — light mode

| Role (`--mx-color-…`) | Value |
|---|---|
| bg-canvas / bg-surface / bg-surface-raised / bg-surface-sunken | gray-50 #F8FAFC / white / white / gray-100 #F1F5F9 |
| bg-inverse / bg-overlay | gray-900 #0F172A / rgb(2 6 23 / 0.55) |
| text-primary / text-secondary / text-muted | gray-900 #0F172A / gray-600 #475569 / gray-400 #94A3B8 |
| text-inverse / text-on-action / text-link | white / white / blue-600 #2563EB |
| text-success / text-warning / text-danger | green-600 #16A34A / amber-600 #D97706 / red-600 #DC2626 |
| border-subtle / border-default / border-strong | gray-100 #F1F5F9 / gray-200 #E2E8F0 / gray-300 #CBD5E1 |
| border-focus, focus-ring | blue-500 #3B82F6 |
| action-primary bg / hover / active | blue-600 / blue-700 / blue-800 · text white · subtle blue-50 / blue-700 |
| action-secondary bg / hover / active | teal-600 / teal-700 / teal-800 · text white · subtle teal-50 / teal-700 |
| action-accent bg / hover / active | amber-500 / amber-600 / amber-700 · **text gray-900** · subtle amber-50 / amber-700 |
| action-danger bg / hover / active | red-600 / red-700 / red-800 · text white · subtle red-50 / red-700 |
| action-neutral bg / hover / active | white / gray-50 / gray-100 · text gray-900 · border gray-300 |
| action-disabled bg / text / border | gray-100 / gray-400 / gray-200 |
| feedback-info bg / border / text / icon | blue-50 / blue-200 / blue-700 / blue-600 |
| feedback-success bg / border / text / icon | green-50 / green-200 / green-700 / green-600 |
| feedback-warning bg / border / text / icon | amber-50 / amber-200 / amber-700 / amber-600 |
| feedback-danger bg / border / text / icon | red-50 / red-200 / red-700 / red-600 |

### Semantic roles — dark mode

| Role (`--mx-color-…`) | Value |
|---|---|
| bg-canvas / bg-surface / bg-surface-raised / bg-surface-sunken | gray-950 #020617 / gray-900 #0F172A / gray-800 #1E293B / gray-950 #020617 |
| bg-inverse / bg-overlay | gray-50 #F8FAFC / rgb(2 6 23 / 0.7) |
| text-primary / text-secondary / text-muted | gray-50 #F8FAFC / gray-300 #CBD5E1 / gray-500 #64748B |
| text-inverse / text-on-action / text-link | gray-900 #0F172A / white / blue-400 #60A5FA |
| text-success / text-warning / text-danger | green-400 #4ADE80 / amber-400 #FBBF24 / red-400 #F87171 |
| border-subtle / border-default / border-strong | gray-800 / gray-700 / gray-600 |
| border-focus, focus-ring | blue-400 #60A5FA |
| action-primary bg / hover / active | blue-600 / blue-500 / blue-400 (hover moves **up** the ramp) · text white · subtle blue-950 / blue-300 |
| action-secondary bg / hover / active | teal-600 / teal-500 / teal-400 · text white · subtle teal-950 / teal-300 |
| action-accent bg / hover / active | amber-500 / amber-400 / amber-300 · **text gray-950** · subtle amber-950 / amber-300 |
| action-danger bg / hover / active | red-600 / red-500 / red-400 · text white · subtle red-950 / red-300 |
| action-neutral bg / hover / active | gray-800 / gray-700 / gray-600 · text gray-50 · border gray-600 |
| action-disabled bg / text / border | gray-800 / gray-600 / gray-700 |
| feedback-* bg / border / text / icon | ramp-950 / ramp-800 / ramp-300 / ramp-400 (blue=info, green=success, amber=warning, red=danger) |

Dark-mode patterns baked into the tokens: solid action backgrounds stay at the same step but
hover/active **lighten instead of darken**; subtle/tint pairs invert (50/700 light → 950/300 dark);
never pure black backgrounds, never pure white body text (gray-950 canvas, gray-50 text).

### Contrast pairing guidance

- On `bg-surface` (light): `text-primary` and `text-secondary` are body-safe; `text-muted`
  (gray-400) is reserved for placeholders and large text — it does not meet 4.5:1 for small body copy.
- Solid actions: white text on blue-600/teal-600/red-600 passes AA. Amber-500 is too light for
  white text, so **accent buttons and warning chips always take dark text** (gray-900 light,
  gray-950 dark).
- Feedback tints: always pair `feedback-*-text` with `feedback-*-bg` from the same role (e.g.
  blue-700 on blue-50) — never mix a light-mode text with a dark-mode background.
- Status text on canvas: use the 600 step in light, the 400 step in dark (`text-warning` =
  amber-600 light / amber-400 dark).
- UI parts (borders of inputs, icons): `border-default` and stronger meet the 3:1 component floor
  against their surfaces; `border-subtle` is decorative only.

## Tokens

```css
:root {
  /* backgrounds */
  --mx-color-bg-canvas: #F8FAFC;
  --mx-color-bg-surface: #FFFFFF;
  --mx-color-bg-surface-raised: #FFFFFF;
  --mx-color-bg-surface-sunken: #F1F5F9;
  --mx-color-bg-inverse: #0F172A;
  --mx-color-bg-overlay: rgb(2 6 23 / 0.55);
  /* text */
  --mx-color-text-primary: #0F172A;
  --mx-color-text-secondary: #475569;
  --mx-color-text-muted: #94A3B8;
  --mx-color-text-inverse: #FFFFFF;
  --mx-color-text-on-action: #FFFFFF;
  --mx-color-text-link: #2563EB;
  --mx-color-text-success: #16A34A;
  --mx-color-text-warning: #D97706;
  --mx-color-text-danger: #DC2626;
  /* borders & focus */
  --mx-color-border-subtle: #F1F5F9;
  --mx-color-border-default: #E2E8F0;
  --mx-color-border-strong: #CBD5E1;
  --mx-color-border-focus: #3B82F6;
  --mx-color-focus-ring: #3B82F6;
  /* actions */
  --mx-color-action-primary-bg: #2563EB;
  --mx-color-action-primary-bg-hover: #1D4ED8;
  --mx-color-action-primary-bg-active: #1E40AF;
  --mx-color-action-primary-subtle-bg: #EFF6FF;
  --mx-color-action-primary-subtle-text: #1D4ED8;
  --mx-color-action-secondary-bg: #0D9488;
  --mx-color-action-secondary-bg-hover: #0F766E;
  --mx-color-action-secondary-bg-active: #115E59;
  --mx-color-action-accent-bg: #F59E0B;
  --mx-color-action-accent-bg-hover: #D97706;
  --mx-color-action-accent-bg-active: #B45309;
  --mx-color-action-accent-text: #0F172A; /* dark text on warm bg */
  --mx-color-action-danger-bg: #DC2626;
  --mx-color-action-danger-bg-hover: #B91C1C;
  --mx-color-action-danger-bg-active: #991B1B;
  --mx-color-action-neutral-bg: #FFFFFF;
  --mx-color-action-neutral-border: #CBD5E1;
  --mx-color-action-disabled-bg: #F1F5F9;
  --mx-color-action-disabled-text: #94A3B8;
  --mx-color-action-disabled-border: #E2E8F0;
  /* feedback (bg / border / text / icon) */
  --mx-color-feedback-info-bg: #EFF6FF;
  --mx-color-feedback-info-border: #BFDBFE;
  --mx-color-feedback-info-text: #1D4ED8;
  --mx-color-feedback-info-icon: #2563EB;
  --mx-color-feedback-success-bg: #F0FDF4;
  --mx-color-feedback-success-border: #BBF7D0;
  --mx-color-feedback-success-text: #15803D;
  --mx-color-feedback-success-icon: #16A34A;
  --mx-color-feedback-warning-bg: #FFFBEB;
  --mx-color-feedback-warning-border: #FDE68A;
  --mx-color-feedback-warning-text: #B45309;
  --mx-color-feedback-warning-icon: #D97706;
  --mx-color-feedback-danger-bg: #FEF2F2;
  --mx-color-feedback-danger-border: #FECACA;
  --mx-color-feedback-danger-text: #B91C1C;
  --mx-color-feedback-danger-icon: #DC2626;
}
```

Dark values load automatically: set `data-theme="dark"` (or `"light"`) on `<html>`; with no
attribute the OS preference applies via the `prefers-color-scheme` fallback built into `tokens.css`.

## Usage

A cool page frame with a single warm CTA:

```html
<main class="page">
  <section class="card">
    <h2>Your workspace is ready</h2>
    <p class="lede">Invite your team, or explore on your own first.</p>
    <button class="mx-btn mx-btn--accent">Start free trial</button>
    <button class="mx-btn mx-btn--neutral">Invite later</button>
  </section>
</main>
```

```css
.page  { background: var(--mx-color-bg-canvas); color: var(--mx-color-text-primary); }
.card  { background: var(--mx-color-bg-surface); border: 1px solid var(--mx-color-border-default); }
.lede  { color: var(--mx-color-text-secondary); }
.mx-btn--accent {
  background: var(--mx-color-action-accent-bg);
  color: var(--mx-color-action-accent-text); /* dark text — never white on amber */
}
.mx-btn--accent:hover { background: var(--mx-color-action-accent-bg-hover); }
```

A warning banner that pairs warm color with icon and text (never color alone):

```css
.banner--warning {
  background: var(--mx-color-feedback-warning-bg);
  border: 1px solid var(--mx-color-feedback-warning-border);
  color: var(--mx-color-feedback-warning-text);
}
.banner--warning .icon { color: var(--mx-color-feedback-warning-icon); }
```

`@maxilius/react` components (Button, Badge, Toast, etc.) consume these semantic tokens
automatically — set the tokens once and every component follows, in both themes.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use blue-600 `#2563EB` for primary buttons and links in light mode | Don't use blue-400 `#60A5FA` text on white — it fails 4.5:1 (it's the *dark-mode* link color) |
| Put gray-900 text on amber accent buttons and warning chips | Don't put white text on amber-500 — contrast fails and it looks washed out |
| Reserve amber for the one CTA or warning per view | Don't use amber for decorative highlights, tags, or "brand flavor" backgrounds |
| Use vermillion red-600 only for destructive actions and errors | Don't use red for emphasis, sale badges, or required-field labels beyond the asterisk |
| Reference semantic tokens (`--mx-color-action-primary-bg`) in component CSS | Don't hardcode `#2563EB` or reference primitives — dark mode won't follow |
| In dark mode, let hover lighten (blue-600 → blue-500) as the tokens do | Don't darken hovers in dark mode — the state change disappears against dark surfaces |
| Use gray-950 canvas with gray-50 text in dark mode | Don't use pure black `#000000` backgrounds or pure white body text |
| Keep `text-muted` (gray-400) for placeholders and large text only | Don't set small body copy in gray-400 — it fails AA on white |
| Pair every warm status with an icon and message (feedback tokens ship both) | Don't signal an error with a red border alone |
| Use `feedback-info-*` (blue tint) for neutral notices | Don't invent purple/orange tints outside the six published ramps |

## Checklist

- [ ] Every color in the CSS is a `--mx-color-*` semantic token, not a raw hex or primitive
- [ ] Surfaces/structure use cool gray; standard actions use blue/teal
- [ ] At most one amber element competes for attention in the view
- [ ] Amber backgrounds carry dark text (gray-900 light / gray-950 dark)
- [ ] All text pairings meet 4.5:1 (3:1 for ≥24px or 19px bold); `text-muted` not used for small body copy
- [ ] Warm states pair color with icon or text — no color-only signals
- [ ] Screen verified in both `data-theme="light"` and `"dark"` (hover lightens in dark)
- [ ] Feedback tints use matched bg/border/text/icon from one role
- [ ] No pure black bg or pure white body text in dark mode

## Related

- [00 · Design principles](./00-design-principles.md) — why temperature is the master principle
- [02 · Typography](./02-typography.md) — text colors meet the scale
- [03 · Spacing, layout, and grid](./03-spacing-layout-grid.md) — the structure these colors paint
