# 06 · Iconography — Maxilius Design System

> Eighteen built-in 24×24 feather-style stroke glyphs — 2px stroke, round caps, `currentColor` — sized 16/20/24 to sit on the text they support.

## Principles

1. **Icons support words; they rarely replace them.** A glyph clarifies a label or compresses a repeated action — it is not decoration sprinkled for texture.
2. **One drawing style, no exceptions.** Every icon is a 24×24 stroke drawing: 2px stroke, round caps and joins, feather-style geometry. One filled or off-grid icon breaks the whole set.
3. **Icons inherit color.** Rendered in `currentColor`, an icon is always exactly as prominent as the text beside it — cool by default, warm only when its context is warm.
4. **Three sizes, tied to tokens.** 16, 20, and 24px map to `--mx-size-icon-sm/md/lg` and to control sizes; no in-between values.
5. **Meaning must survive without the icon.** Decorative icons are hidden from assistive tech; meaningful ones carry an accessible name.

## The system

### The built-in set (18 glyphs)

| Category | Icons | Typical use |
|---|---|---|
| Confirmation | `check`, `check-circle` | Completed states, success feedback, list bullets |
| Dismissal | `x` | Close buttons, clearing input, Toast dismiss |
| Direction | `chevron-down`, `chevron-up`, `chevron-right`, `chevron-left` | Select caret, Accordion, Breadcrumbs, pagination |
| Actions | `search`, `plus`, `minus`, `copy`, `external-link` | Search inputs, add/remove, copy-to-clipboard, outbound links |
| Status | `info`, `alert-circle`, `alert-triangle` | Feedback banners, Toast variants, invalid fields |
| Identity | `user` | Avatar fallback, account menus |
| Theme | `sun`, `moon` | Light/dark theme toggle |

### Drawing rules

| Property | Value |
|---|---|
| Grid | 24×24 viewBox, ~1px internal padding to the live area |
| Stroke | 2px (`stroke-width="2"`), never scaled with size |
| Caps & joins | `stroke-linecap="round"`, `stroke-linejoin="round"` |
| Fill | `fill="none"`; color via `stroke="currentColor"` |
| Geometry | Feather-style: minimal anchor points, geometric curves, no filled shapes |

### Sizes

| Token | Value | px | Where components use it |
|---|---|---|---|
| `--mx-size-icon-sm` | 1rem | 16 | sm and md Buttons (`iconStart`/`iconEnd`), Input leading/trailing icons, Badge, Breadcrumb separators |
| `--mx-size-icon-md` | 1.25rem | 20 | Icon default size, lg Buttons, Toast variant icons, List item icons |
| `--mx-size-icon-lg` | 1.5rem | 24 | Standalone icons, empty states, feature callouts |

### Icon + text pairing

- Vertically center the icon with the text line (`display: inline-flex; align-items: center`).
- Gap: `--mx-space-2` (8px) between icon and label inside controls.
- Icon size ≈ the text's cap height context: 16px icons with `--mx-font-size-sm` text, 20px with `--mx-font-size-md`.
- The icon inherits the label's color automatically via `currentColor` — never set a separate icon color inside a button.

### Decorative vs meaningful

| Case | Markup |
|---|---|
| Icon beside visible text (decorative) | `aria-hidden="true"` on the SVG; the text is the name |
| Icon-only button (meaningful) | `aria-label` on the button; SVG stays `aria-hidden="true"` |
| Standalone status icon (meaningful) | `role="img"` + `aria-label` on the SVG, or visually hidden text |

### Adding new icons

1. Draw on the 24×24 grid at 2px stroke, round caps/joins, `fill="none"`.
2. Match the set's density: few anchor points, geometric curves, optical (not mathematical) centering.
3. Use `stroke="currentColor"` — never hardcode a hex into the SVG.
4. Test at 16px: if strokes merge or details vanish, simplify the drawing.
5. Name it in kebab-case by what it *is*, not what it does (`trash`, not `delete-item`), and register it alongside the built-in 18 so `<Icon name="…">` resolves it.

## Tokens

```css
:root {
  /* Icon sizes */
  --mx-size-icon-sm: 1rem;     /* 16px — sm/md buttons, input icons */
  --mx-size-icon-md: 1.25rem;  /* 20px — default, lg buttons, toasts */
  --mx-size-icon-lg: 1.5rem;   /* 24px — standalone, empty states */

  /* Drawing constants */
  --mx-icon-stroke-width: 2px;

  /* Semantic icon colors (icons usually inherit currentColor instead) */
  --mx-feedback-info-icon: #2563EB;
  --mx-feedback-success-icon: #16A34A;
  --mx-feedback-warning-icon: #D97706;
  --mx-feedback-danger-icon: #DC2626;
}

[data-theme="dark"] {
  --mx-feedback-info-icon: #60A5FA;
  --mx-feedback-success-icon: #4ADE80;
  --mx-feedback-warning-icon: #FBBF24;
  --mx-feedback-danger-icon: #F87171;
}
```

## Usage

### Button with a decorative leading icon

```html
<button class="mx-btn mx-btn--primary">
  <svg class="mx-icon mx-icon--sm" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
  Add member
</button>
```

```css
.mx-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--mx-space-2);
}

.mx-icon--sm { width: var(--mx-size-icon-sm); height: var(--mx-size-icon-sm); }
.mx-icon--md { width: var(--mx-size-icon-md); height: var(--mx-size-icon-md); }
.mx-icon--lg { width: var(--mx-size-icon-lg); height: var(--mx-size-icon-lg); }
```

### Icon-only close button (meaningful icon)

```html
<button class="mx-btn mx-btn--ghost mx-btn--icon-only" aria-label="Dismiss notification">
  <svg class="mx-icon mx-icon--md" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
</button>
```

```css
.mx-btn--icon-only {
  width: var(--mx-size-control-md);  /* 40px square keeps the target ≥ 40px */
  height: var(--mx-size-control-md);
  justify-content: center;
  padding: 0;
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use the built-in 18 first; add a new glyph only when none of them fits. | Don't mix in icons from other libraries — filled, 1.5px-stroke, or sharp-cornered glyphs clash with the set. |
| Keep `stroke-width="2"` at every rendered size — the stroke is part of the brand. | Don't scale stroke width with icon size or "bold" an icon by bumping it to 3px. |
| Let icons inherit color with `currentColor` so they match their text. | Don't hardcode hex fills inside SVGs — they'll ignore hover states and break in dark mode. |
| Size icons with the tokens: 16px in sm/md buttons, 20px in lg buttons and toasts. | Don't eyeball sizes like 18px or 22px — only 16/20/24 exist. |
| Add `aria-hidden="true"` to any icon that sits beside visible text. | Don't let screen readers announce "image" for a decorative chevron in a select. |
| Give icon-only buttons an `aria-label` naming the action ("Copy API key"). | Don't ship an icon-only button whose only name is its SVG path data. |
| Pair status icons with text: `alert-triangle` + "Payment failed" in a danger toast. | Don't rely on a warm-colored icon alone to signal an error — color and shape must both carry it. |
| Use `alert-triangle` for warnings, `alert-circle` for errors, `info` for information — consistently. | Don't swap status glyphs between contexts; users learn the triangle means caution. |
| Test new icons at 16px and simplify until they stay legible. | Don't add fine interior detail that turns to mush below 20px. |

## Checklist

- [ ] Every icon is from the built-in set or drawn to the same 24×24 / 2px / round-cap spec.
- [ ] All icons use `currentColor` — no hardcoded fills or strokes.
- [ ] Sizes are exactly 16, 20, or 24px via `--mx-size-icon-*` tokens.
- [ ] Icons beside text are `aria-hidden="true"`.
- [ ] Every icon-only control has an `aria-label` describing the action.
- [ ] Icon-only buttons keep a control-sized hit area (≥ 40×40px via `--mx-size-control-md`).
- [ ] Status icons are paired with text, never color-only signals.
- [ ] Icon–label gap is `--mx-space-2` and the pair is vertically centered.

## Related

- [01 · Color](./01-color.md) — feedback icon colors and the cool/warm split
- [02 · Typography](./02-typography.md) — text sizes icons pair with
- [09 · Buttons](./09-buttons.md) — `iconStart`/`iconEnd` behavior per button size
- [13 · Feedback](./13-feedback.md) — Toast and banner icon conventions
- [15 · Accessibility](./15-accessibility.md) — labeling rules for non-text content
