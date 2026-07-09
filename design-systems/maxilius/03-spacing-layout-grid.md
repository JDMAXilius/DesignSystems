# 03 · Spacing, layout, and grid — Maxilius Design System

> A 4px base unit, a 13-step space scale, and a 12-column grid that make proximity — not lines — do the grouping.

## Principles

1. **Everything on the 4px grid.** Every gap, padding, and control height is a multiple of 4px,
   expressed as a rem token. No 5px, no 18px, no eyeballing.
2. **Proximity is meaning.** Related items sit closer than unrelated ones. The gap *is* the
   grouping — reach for space before reaching for borders or boxes.
3. **The scale accelerates.** Steps are 4px apart up to 24px, then jump (32, 40, 48, 64, 80, 96).
   Small steps separate elements; big steps separate sections.
4. **Whitespace is the cool framework.** Generous negative space is how Maxilius stays calm —
   it recedes like the cool palette and lets the one warm action advance.
5. **Tokens first, grid second.** Space and size tokens are shipped in `@maxilius/tokens`; the
   12-column grid and breakpoints are conventions (defined by docs, not yet in code).

## The system

### Space scale — 4px base unit

| Token | Value | px | Typical use |
|---|---|---|---|
| `--mx-space-0` | 0 | 0 | flush elements |
| `--mx-space-1` | 0.25rem | 4 | label ↔ helper text, icon ↔ label |
| `--mx-space-2` | 0.5rem | 8 | chip gaps, tight inline groups |
| `--mx-space-3` | 0.75rem | 12 | sm button padding-x, dense list rows |
| `--mx-space-4` | 1rem | 16 | md button padding-x, card body padding, form field gaps |
| `--mx-space-5` | 1.25rem | 20 | roomy control padding |
| `--mx-space-6` | 1.5rem | 24 | lg button padding-x, grid gutter, group ↔ group gap |
| `--mx-space-8` | 2rem | 32 | card ↔ card, subsection gaps |
| `--mx-space-10` | 2.5rem | 40 | large component clusters |
| `--mx-space-12` | 3rem | 48 | section gap (mobile) |
| `--mx-space-16` | 4rem | 64 | section gap (desktop minimum) |
| `--mx-space-20` | 5rem | 80 | hero padding |
| `--mx-space-24` | 6rem | 96 | page-level breathing room |

### Control and icon sizes

| Token | Value | px |
|---|---|---|
| `--mx-size-control-sm` | 2rem | 32 |
| `--mx-size-control-md` | 2.5rem | 40 (default control height) |
| `--mx-size-control-lg` | 3rem | 48 |
| `--mx-size-icon-sm` | 1rem | 16 |
| `--mx-size-icon-md` | 1.25rem | 20 (default) |
| `--mx-size-icon-lg` | 1.5rem | 24 |

Buttons, inputs, and selects all share the 32/40/48 heights, so mixed control rows align by
construction. Aim for touch targets ≥ 44×44px — a 40px control with surrounding space clears the
24px minimum-with-spacing floor (target-size floor defined by docs, not yet in code).

### The proximity principle

From the system's own Principles stories: related items sit closer than unrelated ones.

| Relationship | Gap |
|---|---|
| Label ↔ its helper text | `space-1` (4px) |
| Label ↔ its input | `space-2` (8px) |
| Field ↔ next field in a group | `space-4` (16px) |
| Group ↔ unrelated group | `space-6` (24px) |
| Card ↔ card | `space-8` (32px) |
| Section ↔ section | `space-16` desktop / `space-12` mobile |

Rule of thumb: each step outward in relationship at least doubles the visual gap somewhere in
the chain. If two unrelated things sit as close as two related things, the layout lies.

### Layout and grid (defined by docs, not yet in code — no breakpoint tokens exist)

- **Grid:** 12-column fluid grid; gutter `space-6` (24px), reduced to `space-4` (16px) on mobile.
- **Container:** max content width **1280px**, centered; page margin `space-6` (24px),
  16px on mobile.
- **Breakpoints (mobile-first, min-width queries):** sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536.
- **Sections:** vertical gaps ≥ `space-16` (64px) desktop, `space-12` (48px) mobile.

### Common layout patterns

| Pattern | Recipe |
|---|---|
| Page shell | centered container, `max-width: 1280px`, padding-inline `space-6` (16px mobile) |
| Card grid | 12-col grid; cards span 4 (lg), 6 (md), 12 (below md); gap `space-6` |
| Form column | single column, `max-width` ~ 480px; fields stacked at `space-4`, groups at `space-6` |
| Sidebar + content | sidebar spans 3 cols, content 9; collapse to stacked below lg |
| Split hero | 6 + 6 columns, `space-20` block padding; stack below md |
| Toolbar / control row | flex row, `gap: space-2` within a cluster, `space-6` between clusters |

## Tokens

```css
:root {
  --mx-space-0: 0;
  --mx-space-1: 0.25rem;   /* 4px */
  --mx-space-2: 0.5rem;    /* 8px */
  --mx-space-3: 0.75rem;   /* 12px */
  --mx-space-4: 1rem;      /* 16px */
  --mx-space-5: 1.25rem;   /* 20px */
  --mx-space-6: 1.5rem;    /* 24px */
  --mx-space-8: 2rem;      /* 32px */
  --mx-space-10: 2.5rem;   /* 40px */
  --mx-space-12: 3rem;     /* 48px */
  --mx-space-16: 4rem;     /* 64px */
  --mx-space-20: 5rem;     /* 80px */
  --mx-space-24: 6rem;     /* 96px */

  --mx-size-control-sm: 2rem;    /* 32px */
  --mx-size-control-md: 2.5rem;  /* 40px */
  --mx-size-control-lg: 3rem;    /* 48px */
  --mx-size-icon-sm: 1rem;       /* 16px */
  --mx-size-icon-md: 1.25rem;    /* 20px */
  --mx-size-icon-lg: 1.5rem;     /* 24px */

  --mx-border-width-thin: 1px;
  --mx-border-width-thick: 2px;  /* also the focus outline width */
}
```

Breakpoints and grid columns are docs conventions, not tokens — write them as plain media
queries until they land in `@maxilius/tokens`.

## Usage

Page shell with a 12-column card grid:

```html
<div class="container">
  <section class="card-grid">
    <article class="card">…</article>
    <article class="card">…</article>
    <article class="card">…</article>
  </section>
</div>
```

```css
.container {
  max-width: 1280px;               /* defined by docs, not yet in code */
  margin-inline: auto;
  padding-inline: var(--mx-space-4);
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--mx-space-4);          /* 16px gutter on mobile */
}
.card { grid-column: span 12; padding: var(--mx-space-4); }

@media (min-width: 768px) {        /* md — defined by docs, not yet in code */
  .container { padding-inline: var(--mx-space-6); }
  .card-grid { gap: var(--mx-space-6); }
  .card { grid-column: span 6; }
}
@media (min-width: 1024px) {       /* lg */
  .card { grid-column: span 4; }
}
```

A form group that groups by proximity, with aligned control heights:

```css
.field { display: flex; flex-direction: column; gap: var(--mx-space-2); }
.field .helper { margin-top: var(--mx-space-1); color: var(--mx-color-text-secondary); }
.field-group { display: flex; flex-direction: column; gap: var(--mx-space-4); }
.form > .field-group + .field-group { margin-top: var(--mx-space-6); }

.input, .select, .btn {
  height: var(--mx-size-control-md);      /* 40px default; sm 32 / lg 48 */
  padding-inline: var(--mx-space-4);
  border: var(--mx-border-width-thin) solid var(--mx-color-border-default);
}
```

`@maxilius/react` components already bake these in — Button/Input/Select ship the 32/40/48
heights and token padding, so your layout only supplies the gaps around them.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use `space-1` (4px) between a label and its helper, `space-6` (24px) between groups | Don't use one uniform 16px gap everywhere — equal gaps erase grouping |
| Pick every gap from the space scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96) | Don't write `margin: 18px` or `padding: 5px` — off-grid values are bugs |
| Keep buttons, inputs, and selects at shared 32/40/48 heights in one row | Don't hand-size a control to 36px — it will misalign with everything beside it |
| Separate sections with ≥ `space-16` (64px) desktop, `space-12` (48px) mobile | Don't stack sections at `space-4` and add heavy borders to compensate |
| Let whitespace do the grouping; add borders only when space can't | Don't box every group in a bordered card — the cool framework should recede |
| Use the 24px gutter (`space-6`), stepping to 16px (`space-4`) below md | Don't invent per-page gutters — grids across pages should feel identical |
| Cap page content at 1280px with `space-6` margins | Don't let content bleed edge-to-edge at 1920px or center a 900px orphan with no margins |
| Write mobile-first min-width queries at 640/768/1024/1280/1536 | Don't scatter ad-hoc breakpoints (700px here, 900px there) per component |
| Give a 40px control breathing room so its target clears 44×44px effective size | Don't butt 32px icon buttons directly against each other with `space-0` |
| Mark grid/breakpoint values as docs conventions when documenting them | Don't invent `--mx-breakpoint-*` tokens in code examples — they don't exist yet |

## Checklist

- [ ] Every margin, padding, and gap is a `--mx-space-*` token (multiple of 4px)
- [ ] Related < unrelated: label/helper 4px, fields 16px, groups 24px, sections 64px+
- [ ] All controls in a row share a `--mx-size-control-*` height (default 40px)
- [ ] Grid uses 12 columns, `space-6` gutter (`space-4` mobile)
- [ ] Container capped at 1280px with `space-6` page margins (16px mobile)
- [ ] Media queries are mobile-first at 640/768/1024/1280/1536 only
- [ ] Section gaps ≥ 64px desktop / 48px mobile
- [ ] Grouping reads from whitespace alone before any borders are added
- [ ] Touch targets reach 44×44px (or ≥24px with clear surrounding space)
- [ ] Docs-defined values (grid, breakpoints, container) are not presented as shipped tokens

## Related

- [00 · Design principles](./00-design-principles.md) — whitespace as the cool framework
- [01 · Color](./01-color.md) — surfaces and borders that sit on this structure
- [02 · Typography](./02-typography.md) — the 45–75ch measure inside these containers
