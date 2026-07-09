# 05 · Shape & radius — Maxilius Design System

> A five-step radius scale on the 4px grid gives every surface a consistent, calm silhouette — bigger surfaces get bigger corners.

## Principles

1. **Radius scales with surface size.** Small controls get small corners (4px), controls get 8px, cards 12px, modals 16px. A tiny chip with a 16px radius looks like a pill by accident.
2. **One radius per component role.** Buttons are always `radius-md`; cards are always `radius-lg`. Predictable silhouettes are part of the cool framework.
3. **Nested corners stay concentric.** Inner radius = outer radius − padding. Anything else creates uneven corner gaps that read as sloppy.
4. **`radius-full` means "deliberately round".** Pills, avatars, badges, spinners — shapes whose identity is circular. It is never a substitute for picking a scale step.
5. **Borders stay thin and cool.** 1px cool-gray borders define edges; 2px is reserved for emphasis and the focus outline.

## The system

### Radius scale

| Token | Value | px | Used by (as implemented) |
|---|---|---|---|
| `--mx-radius-none` | 0 | 0 | Flush/square edges, `flush` card sections, full-bleed media |
| `--mx-radius-sm` | 0.25rem | 4 | Checkbox, small chips |
| `--mx-radius-md` | 0.5rem | 8 | Button, Input, Select, Textarea (default control radius) |
| `--mx-radius-lg` | 0.75rem | 12 | Card, panels, Accordion container, illustration corners |
| `--mx-radius-xl` | 1rem | 16 | Modals, hero surfaces, Toast |
| `--mx-radius-full` | 9999px | — | Pills, Avatar (circle), Badge, Toggle track/thumb, spinners |

### Component mapping

| Component | Radius |
|---|---|
| Button (all 6 variants, all sizes) | `--mx-radius-md` |
| Input / Select / Textarea | `--mx-radius-md` |
| Checkbox | `--mx-radius-sm` |
| Radio | `--mx-radius-full` (a radio is a circle) |
| Toggle | `--mx-radius-full` (track and thumb) |
| Card / panels | `--mx-radius-lg` |
| Modal / hero surfaces | `--mx-radius-xl` |
| Badge / Avatar (circle) / Button spinner | `--mx-radius-full` |
| Avatar (square shape) | `--mx-radius-md` |
| Tooltip | `--mx-radius-sm` |
| Table wrapper | `--mx-radius-lg` |

### Nested radius rule

**Inner radius = outer radius − padding gap.** When a rounded element sits inside another rounded element, subtract the space between their edges from the outer radius; clamp at 0.

Worked example — a button inside a card:

- Card: `--mx-radius-lg` = 12px, padding `--mx-space-4` = 16px.
- Inner radius = 12 − 16 = −4 → clamp to 0? No — the rule targets elements *hugging* the outer corner. A button 16px inside a 12px-radius card is far enough from the corner that its own `--mx-radius-md` (8px) is fine.
- Where it matters: an image filling a card with only `--mx-space-1` (4px) inset. Inner radius = 12 − 4 = **8px** → use `--mx-radius-md` on the image. A full-bleed image (0 inset) inherits the card's 12px via `overflow: hidden` (or `flush`).

Rule of thumb: apply the subtraction whenever the inset is smaller than the outer radius; otherwise use the child's normal component radius.

### Border widths & dividers

| Token | Value | Use |
|---|---|---|
| `--mx-border-width-thin` | 1px | Default borders: inputs, cards, table rules, dividers |
| `--mx-border-width-thick` | 2px | Focus outline width, selected-state emphasis, icon stroke weight |

Borders use the cool-gray semantic ramp: `--mx-border-subtle` (gray-100) for faint in-surface rules, `--mx-border-default` (gray-200) for standard component edges, `--mx-border-strong` (gray-300) for hovered inputs and the neutral button border. The Divider component is a 1px `--mx-border-default` rule, horizontal (optionally with a centered label) or vertical.

## Tokens

```css
:root {
  /* Radius scale */
  --mx-radius-none: 0;
  --mx-radius-sm: 0.25rem;   /* 4px  — checkboxes, chips */
  --mx-radius-md: 0.5rem;    /* 8px  — buttons, inputs, selects */
  --mx-radius-lg: 0.75rem;   /* 12px — cards, panels */
  --mx-radius-xl: 1rem;      /* 16px — modals, hero surfaces */
  --mx-radius-full: 9999px;  /* pills, avatars, badges */

  /* Border widths */
  --mx-border-width-thin: 1px;
  --mx-border-width-thick: 2px;

  /* Border colors (light) */
  --mx-border-subtle: #F1F5F9;
  --mx-border-default: #E2E8F0;
  --mx-border-strong: #CBD5E1;
  --mx-border-focus: #3B82F6;
}

[data-theme="dark"] {
  --mx-border-subtle: #1E293B;
  --mx-border-default: #334155;
  --mx-border-strong: #475569;
  --mx-border-focus: #60A5FA;
}
```

## Usage

### Card with a near-flush image (nested radius applied)

```html
<article class="mx-card">
  <img class="mx-card__media" src="/chart.png" alt="Monthly deploy volume, trending up" />
  <div class="mx-card__body">
    <h3>Deploy volume</h3>
    <p>Up 12% month over month.</p>
  </div>
</article>
```

```css
.mx-card {
  background: var(--mx-bg-surface);
  border: var(--mx-border-width-thin) solid var(--mx-border-default);
  border-radius: var(--mx-radius-lg);   /* outer: 12px */
  padding: var(--mx-space-1);           /* 4px inset around media */
}

.mx-card__media {
  width: 100%;
  border-radius: var(--mx-radius-md);   /* inner: 12 − 4 = 8px */
}

.mx-card__body {
  padding: var(--mx-space-4);
}
```

### Pill badge and divider with label

```html
<span class="mx-badge">Beta</span>

<div class="mx-divider" role="separator">
  <span>Advanced settings</span>
</div>
```

```css
.mx-badge {
  display: inline-flex;
  padding: var(--mx-space-1) var(--mx-space-2);
  border-radius: var(--mx-radius-full);
  font-size: var(--mx-font-size-xs);
}

.mx-divider {
  display: flex;
  align-items: center;
  gap: var(--mx-space-3);
  color: var(--mx-text-muted);
}

.mx-divider::before,
.mx-divider::after {
  content: "";
  flex: 1;
  border-top: var(--mx-border-width-thin) solid var(--mx-border-default);
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use `--mx-radius-md` (8px) on every button, input, select, and textarea. | Don't give one form a 4px input and another an 8px input — controls share one radius system-wide. |
| Use `--mx-radius-lg` (12px) for cards and `--mx-radius-xl` (16px) for modals. | Don't put `--mx-radius-xl` on small chips or badges — oversized corners on small elements read as accidental pills. |
| Compute nested radii: image inset 4px inside a 12px card → image radius 8px. | Don't reuse the outer radius on a tightly inset child — equal radii make the corner gap visibly uneven. |
| Use `overflow: hidden` (or the Card `flush` prop) for full-bleed media so it inherits the card's corners. | Don't leave square image corners poking through a rounded card. |
| Reserve `--mx-radius-full` for shapes that are meant to be round: avatars, badges, toggles, spinners. | Don't use `border-radius: 50%` on non-square elements — it produces ellipses, not circles; use `--mx-radius-full`. |
| Keep default borders at `--mx-border-width-thin` (1px) in `--mx-border-default`. | Don't draw 2px borders around resting cards — thick is reserved for focus outlines and selected emphasis. |
| Step border color on interaction: `default` at rest → `strong` on hover → `focus` when focused. | Don't signal input hover by changing radius or width — color is the interaction channel, shape stays put. |
| Use the Divider component (1px `--mx-border-default`) to separate groups within a surface. | Don't stack a divider directly against a card edge that already has a border — double rules look like a rendering bug. |
| Match custom components to the closest existing role (a date picker is a control → `--mx-radius-md`). | Don't invent in-between radii like 6px or 10px — every corner comes from the six tokens. |

## Checklist

- [ ] Every `border-radius` on the page resolves to one of the six `--mx-radius-*` tokens.
- [ ] Buttons, inputs, selects, and textareas all use `--mx-radius-md`.
- [ ] Cards use `--mx-radius-lg`; modals and hero surfaces use `--mx-radius-xl`.
- [ ] Nested rounded elements follow inner = outer − inset (clamped at 0) or are full-bleed with `overflow: hidden`.
- [ ] `--mx-radius-full` appears only on intentionally round shapes.
- [ ] Resting borders are 1px `--mx-border-default`; 2px appears only for focus/selected emphasis.
- [ ] Dividers use `--mx-border-default` and never double up with adjacent borders.
- [ ] Dark mode borders come from the semantic tokens (gray-800/700/600), not hardcoded grays.

## Related

- [03 · Spacing, layout & grid](./03-spacing-layout-grid.md) — the 4px grid the radius scale sits on
- [04 · Elevation & depth](./04-elevation-depth.md) — shadows that pair with each surface radius
- [09 · Buttons](./09-buttons.md) — control radius and states in detail
- [10 · Forms & inputs](./10-forms-inputs.md) — border and focus-ring behavior on fields
- [12 · Cards & surfaces](./12-cards-surfaces.md) — card radius, flush media, and nesting
