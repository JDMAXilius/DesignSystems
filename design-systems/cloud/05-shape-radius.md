# 05 · Shape & radius — Cloud Design System

> A six-step radius scale, thin borders, and one nesting rule that keep every corner in the product soft and optically correct.

## Principles

1. **Soft by default.** Rounded corners are core to the airy CDS personality — nothing interactive ships with sharp 0px corners.
2. **Bigger surface, bigger radius.** Radius grows with component size: 4px checkboxes, 10px buttons, 16px cards, 24px modals.
3. **Nested corners follow math, not taste.** Inner radius = outer radius − padding. Anything else looks visibly wrong at the corner.
4. **Borders are quiet.** 1px cloud-200/300 borders define edges; 2px is reserved for focus and selected states only.
5. **Pills mean "compact and self-contained".** `radius-full` is for avatars, pill buttons, and chips — not for containers with multi-line content.

## The system

### Radius scale

| Token | Value | Use |
|---|---|---|
| radius-xs | 4px | Checkboxes, tags |
| radius-sm | 6px | Inputs, small buttons |
| radius-md | 10px | Buttons, inputs (default) |
| radius-lg | 16px | Cards, panels |
| radius-xl | 24px | Modals, hero surfaces |
| radius-full | 9999px | Pills, avatars |

### Component mapping

| Component | Radius |
|---|---|
| Checkbox, tag/badge | radius-xs (4px) |
| Small (sm, 32px) buttons and compact inputs | radius-sm (6px) |
| Default buttons (md/lg), text inputs, selects, textareas | radius-md (10px) |
| Cards, panels, dropdown menus, popovers, embedded images | radius-lg (16px) |
| Modals, dialogs, hero surfaces, page-level media | radius-xl (24px) |
| Pill buttons, avatars, chips, toggle segments | radius-full (9999px) |

### The nested-radius rule

**Inner radius = outer radius − padding.** Never let an inner radius equal or exceed its container's radius — the corner gap looks pinched.

Worked example — an image inset inside a card:

- Card: `radius-lg` = **16px**, with **6px** of padding around the media.
- Inner image radius: 16 − 6 = **10px** → use `radius-md`.

Second example — a card inside a modal:

- Modal: `radius-xl` = **24px**, content padded **8px** from the edge.
- Inner card radius: 24 − 8 = **16px** → use `radius-lg`.

If the math lands below 4px (e.g., 16px card with 16px padding → 0), the inner element sits far enough from the corner that its radius no longer needs to match: use `radius-xs` (4px) or square corners.

### Border widths

| Width | Use |
|---|---|
| 1px | Default borders: inputs (cloud-300 `#CBD5E1`), cards and dividers (cloud-200 `#E2E8F0`) |
| 2px | Focus ring (sky-500 `#0EA5E9`, offset 2px) and selected states only |

Borders never exceed 2px. Focus is a ring *outside* the element (`outline` + `outline-offset: 2px`), so it never shifts layout.

### Dividers

- 1px solid cloud-200 (`#E2E8F0`), full-bleed inside their container.
- Use dividers only where spacing alone can't separate content (dense tables, menu groups). Prefer whitespace first — section gaps of 64px desktop / 48px mobile usually make the divider redundant.
- Never stack a divider directly against a card edge that already has a border.

### Pill shapes

`radius-full` (9999px) is for single-line, compact elements: pill buttons, filter chips, avatars, status dots, segmented controls. Pills keep standard button heights (32/40/48px) and gain slightly wider horizontal padding (+4px per side) so the label doesn't crowd the curve.

## Tokens

```css
:root {
  /* Radius scale */
  --cds-radius-xs: 4px;
  --cds-radius-sm: 6px;
  --cds-radius-md: 10px;
  --cds-radius-lg: 16px;
  --cds-radius-xl: 24px;
  --cds-radius-full: 9999px;

  /* Border widths */
  --cds-border-width: 1px;
  --cds-border-width-strong: 2px; /* focus / selected only */

  /* Border colors */
  --cds-border-default: #E2E8F0;  /* cloud-200 — cards, dividers */
  --cds-border-strong: #CBD5E1;   /* cloud-300 — inputs, secondary buttons */
  --cds-border-focus: #0EA5E9;    /* sky-500 — 2px ring, 2px offset */

  /* Divider */
  --cds-divider: 1px solid #E2E8F0;
}
```

## Usage

### Card with correctly nested media

```html
<article class="cds-card">
  <img class="cds-card-media" src="/report.avif" alt="Preview of the Q3 usage report" />
  <h3>Q3 report</h3>
</article>
```

```css
.cds-card {
  border-radius: var(--cds-radius-lg); /* 16px outer */
  border: var(--cds-border-width) solid var(--cds-border-default);
  padding: 6px;
}
.cds-card-media {
  border-radius: var(--cds-radius-md); /* 16 − 6 = 10px inner */
  max-width: 100%;
}
```

### Input with 1px border and 2px focus ring

```html
<label class="cds-label" for="email">Email address</label>
<input class="cds-input" id="email" type="email" />
```

```css
.cds-input {
  height: 40px;
  border-radius: var(--cds-radius-md);
  border: var(--cds-border-width) solid var(--cds-border-strong);
  background: #FFFFFF;
}
.cds-input:focus-visible {
  outline: var(--cds-border-width-strong) solid var(--cds-border-focus);
  outline-offset: 2px;
}
```

### Pill chip

```html
<button class="cds-chip" aria-pressed="true">Active filters</button>
```

```css
.cds-chip {
  height: 32px;
  padding: 0 16px; /* sm padding 12px + 4px pill allowance */
  border-radius: var(--cds-radius-full);
  border: var(--cds-border-width) solid var(--cds-border-strong);
}
.cds-chip[aria-pressed="true"] {
  border-width: var(--cds-border-width-strong); /* 2px selected */
  border-color: #0284C7; /* sky-600 */
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use `radius-md` (10px) for every default button and input so controls read as one family. | Don't mix 8px buttons with 12px inputs in the same form — off-scale values fracture the system. |
| Compute nested radii as outer − padding: a 16px card with 6px padding gets 10px inner media. | Don't give an inner image the same 16px radius as its card — the corner gap visibly pinches. |
| Keep card and divider borders at 1px cloud-200. | Don't draw 2px borders on resting cards — 2px is reserved for focus and selected states. |
| Render focus as a 2px sky-500 outline with 2px offset. | Don't swap `border-width` from 1px to 2px on focus — the element visibly jumps as layout shifts. |
| Use `radius-full` for avatars, chips, and single-line pill buttons. | Don't make a multi-line card a pill — `radius-full` on tall containers clips content into a lozenge. |
| Use `radius-xl` (24px) on modals and hero surfaces to signal top-level prominence. | Don't put 24px corners on a 32px-tall button — the radius would swallow half the control. |
| Prefer whitespace to separate sections; add a 1px cloud-200 divider only in dense lists and tables. | Don't stack dividers with large section gaps — 64px of space plus a line is double separation. |
| Keep tags and checkboxes at `radius-xs` (4px) so tiny elements stay crisp. | Don't round a 16px checkbox to 8px+ — it becomes ambiguous with a radio button. |
| Drop to `radius-xs` or square corners when nesting math lands below 4px. | Don't force a negative or 1–2px "computed" radius — below 4px, matching stops being visible. |

## Checklist

- [ ] Every `border-radius` in the view is one of the six tokens — no arbitrary values.
- [ ] Buttons and inputs share `radius-md` (10px); cards use `radius-lg`; modals use `radius-xl`.
- [ ] All nested rounded elements follow inner = outer − padding.
- [ ] Resting borders are 1px (cloud-200 or cloud-300); nothing except focus/selected uses 2px.
- [ ] Focus rings are outlines with 2px offset and cause no layout shift.
- [ ] Dividers are 1px cloud-200 and only appear where whitespace can't do the job.
- [ ] Pill shapes (`radius-full`) only wrap single-line, compact content.
- [ ] Dark mode borders use cloud-700/800 instead of cloud-200/300.

## Related

- [04-elevation-depth.md](./04-elevation-depth.md) — the shadows that pair with each rounded surface
- [06-iconography.md](./06-iconography.md) — rounded caps and joins that echo the radius language
- [07-imagery-illustration.md](./07-imagery-illustration.md) — radius-lg treatment on embedded images
