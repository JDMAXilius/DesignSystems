# 04 · Elevation & depth — Cloud Design System

> Soft, layered "cloud" shadows and a strict z-index scale that communicate hierarchy without visual weight.

## Principles

1. **Depth is information.** A surface's elevation tells the user what floats above what — it is never decoration.
2. **Soft, not heavy.** CDS shadows are layered, low-opacity, and cool-tinted (`#0F172A`, our cloud-900) so surfaces feel lifted by light, not stamped with black ink.
3. **Few levels, used consistently.** Six levels (0–5) cover every component. If you need a seventh, you are solving the wrong problem.
4. **Dark mode elevates with light.** In dark mode shadows lose meaning, so elevation is communicated by progressively lighter surface colors instead.
5. **Layering order is fixed.** The z-index scale is global and non-negotiable — components never invent their own stacking values.

## The system

### Elevation scale

Every shadow is two stacked layers of the same cool tint (`rgba(15, 23, 42, …)`), which keeps depth soft and consistent with the cloud neutral ramp.

| Level | Use | Value |
|---|---|---|
| elevation-0 | Flush / flat | `none` |
| elevation-1 | Cards resting | `0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06)` |
| elevation-2 | Raised / hover | `0 2px 4px rgba(15,23,42,0.04), 0 4px 8px rgba(15,23,42,0.06)` |
| elevation-3 | Dropdowns / popovers | `0 4px 8px rgba(15,23,42,0.05), 0 8px 16px rgba(15,23,42,0.08)` |
| elevation-4 | Modals / dialogs | `0 8px 16px rgba(15,23,42,0.06), 0 16px 32px rgba(15,23,42,0.10)` |
| elevation-5 | Toasts (top layer) | `0 12px 24px rgba(15,23,42,0.08), 0 24px 48px rgba(15,23,42,0.12)` |

### Which components live where

| Level | Components |
|---|---|
| 0 | Page background, inline sections, table rows, sunken wells (`bg/sunken`, cloud-100), dividers |
| 1 | Cards at rest, form panels, tiles, list containers |
| 2 | Hovered cards, sticky headers, raised buttons on hover, drag handles at rest |
| 3 | Dropdown menus, select listboxes, popovers, tooltips, date pickers, elements mid-drag |
| 4 | Modals, dialogs, drawers, command palettes |
| 5 | Toasts and other transient top-layer notifications |

Interactive lift moves **one level** (1 → 2 on hover), never more. See [08-motion-animation.md](./08-motion-animation.md) for the hover-lift recipe.

### z-index scale

| Layer | z-index |
|---|---|
| Dropdown | 1000 |
| Sticky | 1100 |
| Overlay / scrim | 1300 |
| Modal | 1400 |
| Popover | 1500 |
| Toast | 1700 |
| Tooltip | 1800 |

Local stacking inside a component (e.g., a badge over an avatar) uses small values (1–10) inside its own stacking context — never values from the global scale.

### Glass / frosted surface (optional)

A glass surface is allowed **sparingly, over imagery or gradients only** — never over plain neutral backgrounds, where it reads as a broken card.

Recipe: `rgba(255,255,255,0.7)` background + `backdrop-filter: blur(12px)` + 1px border `rgba(255,255,255,0.5)`.

Verify text contrast (≥ 4.5:1) against the *worst-case* content behind the glass, and always provide a solid fallback background for browsers without `backdrop-filter`.

### Dark mode elevation

Shadows weaken against dark backgrounds, so elevation is communicated by a **lighter surface color** instead:

| Elevation | Light mode | Dark mode surface |
|---|---|---|
| 0 (page) | cloud-50 + no shadow | cloud-950 `#020617` |
| 1 (surface) | cloud-0 + elevation-1 | cloud-900 `#0F172A` |
| 2+ (raised) | cloud-0 + elevation-2+ | cloud-800 `#1E293B` |

Keep the shadow tokens applied in dark mode (they soften edges), but never rely on them to signal depth. Never use pure black backgrounds — the ramp bottoms out at cloud-950.

## Tokens

```css
:root {
  /* Elevation — layered, low-opacity, cool-tinted (#0F172A) */
  --cds-elevation-0: none;
  --cds-elevation-1: 0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06);
  --cds-elevation-2: 0 2px 4px rgba(15, 23, 42, 0.04), 0 4px 8px rgba(15, 23, 42, 0.06);
  --cds-elevation-3: 0 4px 8px rgba(15, 23, 42, 0.05), 0 8px 16px rgba(15, 23, 42, 0.08);
  --cds-elevation-4: 0 8px 16px rgba(15, 23, 42, 0.06), 0 16px 32px rgba(15, 23, 42, 0.10);
  --cds-elevation-5: 0 12px 24px rgba(15, 23, 42, 0.08), 0 24px 48px rgba(15, 23, 42, 0.12);

  /* z-index scale */
  --cds-z-dropdown: 1000;
  --cds-z-sticky: 1100;
  --cds-z-overlay: 1300;
  --cds-z-modal: 1400;
  --cds-z-popover: 1500;
  --cds-z-toast: 1700;
  --cds-z-tooltip: 1800;

  /* Glass surface (over imagery/gradients only) */
  --cds-glass-bg: rgba(255, 255, 255, 0.7);
  --cds-glass-blur: 12px;
  --cds-glass-border: rgba(255, 255, 255, 0.5);

  /* Light-mode surfaces */
  --cds-bg-page: #F8FAFC;    /* cloud-50 */
  --cds-bg-surface: #FFFFFF; /* cloud-0 */
  --cds-bg-sunken: #F1F5F9;  /* cloud-100 */
}

[data-theme="dark"] {
  --cds-bg-page: #020617;    /* cloud-950 */
  --cds-bg-surface: #0F172A; /* cloud-900 */
  --cds-bg-raised: #1E293B;  /* cloud-800 — lighter surface replaces shadow */
}
```

## Usage

### Resting card that lifts on hover

```html
<article class="cds-card">
  <h3>Monthly usage</h3>
  <p>Your team used 82% of its quota.</p>
</article>
```

```css
.cds-card {
  background: var(--cds-bg-surface);
  border-radius: 16px; /* radius-lg */
  box-shadow: var(--cds-elevation-1);
  transition: box-shadow 100ms cubic-bezier(0.2, 0, 0, 1),
              transform 100ms cubic-bezier(0.2, 0, 0, 1);
}
.cds-card:hover {
  box-shadow: var(--cds-elevation-2); /* one level up, no more */
  transform: translateY(-2px);
}
```

### Modal over a scrim, on the z-index scale

```html
<div class="cds-scrim"></div>
<dialog class="cds-modal" open aria-labelledby="modal-title">
  <h2 id="modal-title">Delete project?</h2>
</dialog>
```

```css
.cds-scrim {
  position: fixed;
  inset: 0;
  z-index: var(--cds-z-overlay); /* 1300 */
  background: rgba(15, 23, 42, 0.5);
}
.cds-modal {
  z-index: var(--cds-z-modal); /* 1400 */
  background: var(--cds-bg-surface);
  border-radius: 24px; /* radius-xl */
  box-shadow: var(--cds-elevation-4);
}
```

### Glass panel over the signature gradient

```css
.cds-glass {
  background: var(--cds-glass-bg);
  backdrop-filter: blur(var(--cds-glass-blur));
  border: 1px solid var(--cds-glass-border);
  border-radius: 16px;
}
@supports not (backdrop-filter: blur(12px)) {
  .cds-glass { background: #FFFFFF; } /* solid fallback */
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use `--cds-elevation-3` for every dropdown, popover, and date picker so all floating menus match. | Don't hand-write one-off shadows like `0 5px 10px rgba(0,0,0,0.3)` — hard black shadows break the soft cloud look. |
| Tint every shadow with `rgba(15,23,42, …)` (cloud-900) so depth stays cool and consistent. | Don't use warm or pure-black shadow tints (`rgba(0,0,0,…)`) — they look dirty next to cool cloud neutrals. |
| Lift hovered cards exactly one level: elevation-1 → elevation-2 plus `translateY(-2px)`. | Don't jump a hovered card to elevation-4 — reserve levels 4–5 for modals and toasts. |
| Take z-index values from the global scale (`--cds-z-modal: 1400`). | Don't write `z-index: 99999` to "win" a stacking fight — fix the layer, not the number. |
| In dark mode, raise surfaces up the ramp: page cloud-950 → surface cloud-900 → raised cloud-800. | Don't crank shadow opacity in dark mode to force depth — shadows are nearly invisible on cloud-950. |
| Keep toasts at elevation-5 and `z-index: 1700` so they float above open modals. | Don't render a toast at elevation-2 under a modal scrim where the user can't read it. |
| Use glass surfaces only over imagery or the signature gradient, with the full recipe (70% white, 12px blur, 1px white border). | Don't put a glass panel on a plain cloud-50 page — a blur over a flat color just looks like a rendering bug. |
| Give sunken areas (wells, input groups) the cloud-100 `bg/sunken` color at elevation-0. | Don't fake "inset" depth with inner shadows — CDS communicates recession with color, not `inset` shadows. |
| Provide a `@supports not (backdrop-filter…)` solid fallback for every glass surface. | Don't ship glass that becomes unreadable 70%-transparent text on browsers without `backdrop-filter`. |

## Checklist

- [ ] Every shadow on the page is one of `--cds-elevation-0` through `--cds-elevation-5` — no custom values.
- [ ] All shadow tints are `rgba(15,23,42, …)`; no pure-black or warm shadows.
- [ ] Each component sits at its assigned level (cards 1, dropdowns 3, modals 4, toasts 5).
- [ ] Hover lift moves exactly one elevation level.
- [ ] All stacked UI uses the global z-index tokens; no arbitrary `z-index` values.
- [ ] Dark mode signals depth with lighter surfaces (cloud-950 → 900 → 800), not stronger shadows.
- [ ] Glass surfaces appear only over imagery/gradients, include the 1px white border, and have a solid fallback.
- [ ] Text over glass surfaces still meets 4.5:1 contrast against worst-case backgrounds.

## Related

- [05-shape-radius.md](./05-shape-radius.md) — corner radii that pair with each elevated surface
- [07-imagery-illustration.md](./07-imagery-illustration.md) — gradients and imagery that glass surfaces may sit over
- [08-motion-animation.md](./08-motion-animation.md) — how elevation changes animate (hover lift, modal rise)
