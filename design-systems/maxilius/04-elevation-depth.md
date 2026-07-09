# 04 · Elevation & depth — Maxilius Design System

> Four cool-tinted shadows and a fixed z-index ladder tell users what floats above what — and dark mode swaps shadow for lighter surface color.

## Principles

1. **Elevation means proximity to the user.** Higher surfaces (modals, toasts) are more urgent and sit closer; the canvas stays at zero.
2. **Shadows are cool, layered, and quiet.** Every shadow is built from `rgb(2 6 23)` — the gray-950 ink of the system — at low opacity, never pure black. Depth belongs to the cool framework; it should recede, not shout.
3. **Few levels, used consistently.** Four shadow tokens cover everything. If a component needs a fifth, the design is stacking too much.
4. **Dark mode elevates with color, not darkness.** A shadow on a near-black canvas is invisible; raised surfaces get lighter backgrounds instead.
5. **Stacking order is tokenized.** Z-index values come from the scale, never from ad-hoc `z-index: 9999`.

## The system

### Shadow levels

All shadows use the cool ink `rgb(2 6 23)` (gray-950) so depth stays in the same temperature family as the surfaces.

| Token | Value | Used by |
|---|---|---|
| `--mx-shadow-sm` | `0 1px 2px 0 rgb(2 6 23 / 0.06)` | Card `raised` (the default card elevation) |
| `--mx-shadow-md` | `0 2px 4px -1px rgb(2 6 23 / 0.08), 0 4px 8px -2px rgb(2 6 23 / 0.06)` | Interactive card hover lift |
| `--mx-shadow-lg` | `0 4px 8px -2px rgb(2 6 23 / 0.1), 0 12px 24px -4px rgb(2 6 23 / 0.08)` | Card `floating`, dropdowns, popovers |
| `--mx-shadow-xl` | `0 8px 16px -4px rgb(2 6 23 / 0.12), 0 24px 48px -8px rgb(2 6 23 / 0.14)` | Modals, toasts |

### Component-to-level mapping

| Level | Surface token | Shadow | Components |
|---|---|---|---|
| 0 · Canvas | `--mx-bg-canvas` | none | Page background |
| 0 · Sunken | `--mx-bg-surface-sunken` | none | Wells, code blocks, table stripes |
| 1 · Resting | `--mx-bg-surface` | `--mx-shadow-sm` | Card `raised`, panels |
| 2 · Lifted | `--mx-bg-surface` | `--mx-shadow-md` | Interactive card on hover |
| 3 · Floating | `--mx-bg-surface-raised` | `--mx-shadow-lg` | Card `floating`, Select/dropdown menus, popovers, Tooltip |
| 4 · Overlay | `--mx-bg-surface-raised` | `--mx-shadow-xl` | Modals, Toast |

Card also ships a `flat` elevation (border only, no shadow) for dense layouts where depth would add noise.

### Z-index scale

| Token | Value | Layer |
|---|---|---|
| `--mx-z-dropdown` | 1000 | Dropdown and select menus, popovers |
| `--mx-z-sticky` | 1100 | Sticky headers, pinned table columns |
| `--mx-z-overlay` | 1300 | Scrim behind modals (`--mx-bg-overlay`) |
| `--mx-z-modal` | 1400 | Modal dialogs |
| `--mx-z-toast` | 1500 | Toast stack |
| `--mx-z-tooltip` | 1600 | Tooltip — always on top |

The scrim uses `--mx-bg-overlay`: `rgb(2 6 23 / 0.55)` in light mode, `rgb(2 6 23 / 0.7)` in dark.

### Dark mode

Shadows barely read against a gray-950 canvas, so dark mode communicates elevation primarily by **lighter surface color**: `--mx-bg-surface-raised` resolves to gray-800 `#1E293B` (vs gray-900 `#0F172A` for resting surfaces). Keep the shadow tokens applied — they still add edge definition — but never compensate for a dark canvas by darkening or enlarging shadows.

## Tokens

```css
:root {
  /* Shadows — cool ink rgb(2 6 23), layered, low opacity */
  --mx-shadow-sm: 0 1px 2px 0 rgb(2 6 23 / 0.06);
  --mx-shadow-md: 0 2px 4px -1px rgb(2 6 23 / 0.08), 0 4px 8px -2px rgb(2 6 23 / 0.06);
  --mx-shadow-lg: 0 4px 8px -2px rgb(2 6 23 / 0.1), 0 12px 24px -4px rgb(2 6 23 / 0.08);
  --mx-shadow-xl: 0 8px 16px -4px rgb(2 6 23 / 0.12), 0 24px 48px -8px rgb(2 6 23 / 0.14);

  /* Z-index ladder */
  --mx-z-dropdown: 1000;
  --mx-z-sticky: 1100;
  --mx-z-overlay: 1300;
  --mx-z-modal: 1400;
  --mx-z-toast: 1500;
  --mx-z-tooltip: 1600;

  /* Elevation surfaces (light) */
  --mx-bg-canvas: #F8FAFC;
  --mx-bg-surface: #FFFFFF;
  --mx-bg-surface-raised: #FFFFFF;
  --mx-bg-surface-sunken: #F1F5F9;
  --mx-bg-overlay: rgb(2 6 23 / 0.55);
}

[data-theme="dark"] {
  --mx-bg-canvas: #020617;
  --mx-bg-surface: #0F172A;
  --mx-bg-surface-raised: #1E293B; /* elevation via lighter color */
  --mx-bg-surface-sunken: #020617;
  --mx-bg-overlay: rgb(2 6 23 / 0.7);
}
```

## Usage

### A resting card that lifts on hover

```html
<article class="mx-card mx-card--interactive">
  <h3>Deploy settings</h3>
  <p>Configure build and release targets.</p>
</article>
```

```css
.mx-card {
  background: var(--mx-bg-surface);
  border-radius: var(--mx-radius-lg);
  box-shadow: var(--mx-shadow-sm);
}

.mx-card--interactive {
  transition: box-shadow var(--mx-motion-duration-base) var(--mx-motion-easing-standard),
              transform var(--mx-motion-duration-base) var(--mx-motion-easing-standard);
}

.mx-card--interactive:hover {
  box-shadow: var(--mx-shadow-md);
  transform: translateY(-2px);
}
```

### Modal with scrim, correct shadow, and z-index

```html
<div class="mx-scrim" aria-hidden="true"></div>
<div class="mx-modal" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
  <h2 id="dlg-title">Delete project?</h2>
  <p>This action cannot be undone.</p>
</div>
```

```css
.mx-scrim {
  position: fixed;
  inset: 0;
  background: var(--mx-bg-overlay);
  z-index: var(--mx-z-overlay);
}

.mx-modal {
  position: fixed;
  z-index: var(--mx-z-modal);
  background: var(--mx-bg-surface-raised);
  border-radius: var(--mx-radius-xl);
  box-shadow: var(--mx-shadow-xl);
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use `--mx-shadow-sm` as the default card shadow — it matches the Card `raised` variant. | Don't put `--mx-shadow-xl` on resting cards; xl is reserved for modals and toasts. |
| Build every custom shadow from `rgb(2 6 23 / …)` at the published opacities. | Don't use `rgba(0, 0, 0, 0.5)` or any pure-black shadow — it breaks the cool tint and looks muddy. |
| Step hover lift exactly one level: `sm → md` on interactive cards. | Don't jump a hovered card from `sm` to `lg` or `xl` — the leap reads as detachment, not lift. |
| In dark mode, raise surfaces with `--mx-bg-surface-raised` (gray-800) and keep shadows as-is. | Don't invent stronger or larger dark-mode shadows to fake depth on a gray-950 canvas. |
| Give dropdowns and popovers `--mx-shadow-lg` with `z-index: var(--mx-z-dropdown)`. | Don't hardcode `z-index: 9999` — it puts menus above tooltips and toasts and breaks the ladder. |
| Layer the modal scrim at `--mx-z-overlay` (1300) below the modal at `--mx-z-modal` (1400). | Don't paint your own scrim color; use `--mx-bg-overlay` so light (0.55) and dark (0.7) both work. |
| Use Card `flat` (border, no shadow) inside dense dashboards and nested surfaces. | Don't nest shadowed cards inside shadowed cards — depth stacks and the page turns to fog. |
| Pair elevation changes with the motion tokens (`--mx-motion-duration-base`, standard easing). | Don't animate `box-shadow` alone over 500ms+ — long shadow tweens are the slowest thing a GPU renders. |
| Keep tooltips at `--mx-z-tooltip` (1600) so help text is never buried under a toast. | Don't give sticky headers a shadow heavier than `--mx-shadow-sm`; they're structure, not overlays. |

## Checklist

- [ ] Every shadow on the page is one of the four `--mx-shadow-*` tokens.
- [ ] No shadow uses pure black; all are `rgb(2 6 23 / …)`.
- [ ] Component elevations match the mapping table (cards sm, dropdowns lg, modals/toasts xl).
- [ ] Hover lift moves exactly one level and animates with system motion tokens.
- [ ] All z-index values come from `--mx-z-*`; nothing is hardcoded.
- [ ] Modal scrim uses `--mx-bg-overlay` at `--mx-z-overlay`, below the modal layer.
- [ ] Dark mode raised surfaces use `--mx-bg-surface-raised` (gray-800), not amplified shadows.
- [ ] No more than two elevation levels are nested inside one another.

## Related

- [01 · Color](./01-color.md) — the surface and overlay tokens shadows sit on
- [05 · Shape & radius](./05-shape-radius.md) — radius pairs with elevation on every surface
- [08 · Motion & animation](./08-motion-animation.md) — how elevation changes animate
- [12 · Cards & surfaces](./12-cards-surfaces.md) — Card elevation variants in depth
- [19 · Theming & dark mode](./19-theming-dark-mode.md) — the full dark-mode token swap
