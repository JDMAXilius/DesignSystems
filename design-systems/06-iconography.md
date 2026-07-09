# 06 · Iconography — Cloud Design System

> One outlined, rounded icon style on a 24×24 grid, four sizes, and clear rules for pairing icons with text and screen readers.

## Principles

1. **One style, everywhere.** Outlined strokes with rounded caps — never a mix of filled, duotone, and outlined icons in the same product.
2. **Icons support text; they rarely replace it.** An icon clarifies a label. Only universally understood actions (close, search) may stand alone — and even then with an accessible name.
3. **Icons inherit, they don't decide.** Icons take `currentColor` from their text context instead of carrying their own palette.
4. **Sized to the type beside them.** An icon's size matches the line-height of its paired text, so pairs align optically without hacks.
5. **Meaning must survive without the icon.** If every icon disappeared, the UI should still be fully usable.

## The system

### Icon style spec

| Property | Value |
|---|---|
| Style | Outlined / stroke (Lucide-style geometry) |
| Stroke width | 1.5px (constant across all sizes) |
| Caps & joins | Rounded (`stroke-linecap="round"`, `stroke-linejoin="round"`) |
| Grid | 24×24 with ~2px internal safe area |
| Fill | None — `fill="none"`, `stroke="currentColor"` |
| Corners | Rounded, echoing the CDS radius language |

### Size scale

| Token | Size | Use |
|---|---|---|
| icon-xs | 16px | Inline with text-sm (14px), dense tables, badges, input affixes |
| icon-sm | 20px | Buttons (all sizes), menu items, inputs, text-md body pairing |
| icon-md | 24px | Default: navigation, standalone actions, toolbars, text-lg+ pairing |
| icon-lg | 32px | Feature callouts, empty states, onboarding highlights |

Anything larger than 32px is an illustration moment — see [07-imagery-illustration.md](./07-imagery-illustration.md). Never scale icons to arbitrary sizes (18px, 22px): the 1.5px stroke blurs off the pixel grid.

### Icon + text pairing

| Rule | Value |
|---|---|
| Gap between icon and label | 8px (space-2) |
| Vertical alignment | Center the icon against the text line-height (flex `align-items: center`) |
| Size matching | text-xs/sm (16/20px line-height) → 16px icon · text-md (24px line-height) → 20–24px icon · text-lg+ → 24px icon |
| Position | Leading icon clarifies the action; trailing icon signals direction/behavior (chevron, external link) |
| Count | Max one leading and one trailing icon per control |

### Color

Icons use `stroke="currentColor"` and inherit from the parent text:

- Body text pairing: cloud-900 (primary) or cloud-600 (secondary)
- On a primary button: white, inherited from the button's text color
- Status icons: the status *text* color — success #15803D, warning #B45309, danger #B91C1C, info #0369A1
- Interactive icons meet the 3:1 UI-component contrast floor; icon-only meanings never rely on color alone

### Decorative vs meaningful icons

| Type | Definition | Markup |
|---|---|---|
| Decorative | A visible text label carries the meaning | `aria-hidden="true"` on the icon; no title, no label |
| Meaningful | The icon is the only carrier of meaning | Accessible name via `aria-label` on the control (or `role="img"` + `aria-label` on the SVG) |

**Icon-only buttons** always get an `aria-label` *and* a visible tooltip on hover/focus, and keep the ≥ 44×44px touch target even when the glyph is 20px.

## Tokens

```css
:root {
  /* Icon sizes */
  --cds-icon-size-xs: 16px;
  --cds-icon-size-sm: 20px;
  --cds-icon-size-md: 24px; /* default */
  --cds-icon-size-lg: 32px;

  /* Stroke */
  --cds-icon-stroke-width: 1.5px;

  /* Icon–text gap */
  --cds-icon-gap: 8px; /* space-2 */

  /* Icon-only button target */
  --cds-icon-button-size: 44px; /* accessibility floor */
}
```

## Usage

### Button with a leading decorative icon

The label "Download report" carries the meaning, so the icon is hidden from screen readers.

```html
<button class="cds-button">
  <svg class="cds-icon" aria-hidden="true" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.5"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
  </svg>
  Download report
</button>
```

```css
.cds-button {
  display: inline-flex;
  align-items: center;
  gap: var(--cds-icon-gap); /* 8px */
}
.cds-icon {
  width: var(--cds-icon-size-sm);  /* 20px in buttons */
  height: var(--cds-icon-size-sm);
  flex-shrink: 0;
  /* color inherited via currentColor — no fill/stroke overrides */
}
```

### Icon-only button with label and tooltip

```html
<button class="cds-icon-button" aria-label="Close dialog" data-tooltip="Close">
  <svg class="cds-icon" aria-hidden="true" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.5"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
</button>
```

```css
.cds-icon-button {
  display: inline-grid;
  place-items: center;
  width: var(--cds-icon-button-size);  /* 44px target */
  height: var(--cds-icon-button-size);
  border-radius: 10px; /* radius-md */
  color: #475569; /* cloud-600 — glyph inherits via currentColor */
}
.cds-icon-button:hover { color: #0F172A; } /* cloud-900 */
```

### Status message with a meaningful color-matched icon

```html
<p class="cds-alert-danger">
  <svg class="cds-icon" aria-hidden="true" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.5"
       stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9" /><path d="M12 8v5m0 3h.01" />
  </svg>
  This file couldn't be uploaded. Try a file under 10 MB.
</p>
```

```css
.cds-alert-danger {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #B91C1C; /* danger text-on-light — icon inherits it */
}
.cds-alert-danger .cds-icon { width: 16px; height: 16px; margin-top: 2px; }
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use outlined 1.5px-stroke icons with rounded caps and joins everywhere. | Don't mix filled, duotone, or 2px-stroke icons into the set — one stray solid glyph breaks the whole surface. |
| Stick to the four sizes: 16, 20, 24, 32px. | Don't scale an icon to 18px or 22px — the 1.5px stroke lands between pixels and blurs. |
| Pair icons and labels with an 8px gap and center alignment against the line-height. | Don't eyeball vertical offsets with `margin-top: 3px` per icon — fix alignment with flex centering once. |
| Let icons inherit color with `stroke="currentColor"`. | Don't hardcode `stroke="#64748B"` inside the SVG — it breaks hover states and dark mode. |
| Mark decorative icons `aria-hidden="true"` when a visible label sits beside them. | Don't let screen readers announce "download icon, Download report" — that's the same word twice. |
| Give every icon-only button an `aria-label` and a visible tooltip. | Don't ship a bare gear glyph and assume users know it's "Settings". |
| Keep icon-only buttons at a ≥ 44×44px target even when the glyph is 20px. | Don't make the clickable area the 20px glyph itself — it fails the touch-target floor. |
| Size icons to the paired text: 16px next to text-sm, 20px inside buttons, 24px in nav. | Don't drop a 32px icon into a 14px table row — it inflates row height and shouts over the data. |
| Match a status icon's color to its status *text* color (e.g., #B91C1C for danger) and keep the message text. | Don't use a red icon as the only error signal — color alone excludes color-blind users. |

## Checklist

- [ ] All icons are outlined, 1.5px stroke, rounded caps/joins, on the 24×24 grid.
- [ ] Only the four token sizes (16/20/24/32) appear — no in-between scaling.
- [ ] Every icon uses `currentColor`; no hardcoded fills or strokes in the SVG.
- [ ] Icon+label pairs use an 8px gap and are center-aligned to the text.
- [ ] Decorative icons carry `aria-hidden="true"`; meaningful ones have an accessible name.
- [ ] Every icon-only button has an `aria-label` plus a tooltip, and a ≥ 44×44px target.
- [ ] Interactive icons meet 3:1 contrast against their background.
- [ ] No meaning is carried by icon color alone.

## Related

- [05-shape-radius.md](./05-shape-radius.md) — the rounded-corner language icons echo
- [07-imagery-illustration.md](./07-imagery-illustration.md) — when a moment needs illustration instead of a 32px icon
- [08-motion-animation.md](./08-motion-animation.md) — animating icon state changes (chevron rotation, spinners)
