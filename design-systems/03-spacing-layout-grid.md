# 03 · Spacing, layout & grid — Cloud Design System
> The 4px rhythm, spacing scale, and 12-column grid that give every CDS page its airy structure.

## Principles

1. **Everything on the 4px grid.** Every gap, padding, and margin is a multiple of 4 — rhythm comes from repetition.
2. **Proximity is meaning.** Related things sit closer together than unrelated things; spacing is the first grouping tool, before borders or boxes.
3. **Whitespace is a feature.** When a layout feels crowded, add space or remove elements — never shrink content to fit.
4. **Bigger scope, bigger gaps.** Space inside a component < between components < between sections.
5. **Mobile-first, fluid always.** Layouts are built up from 320px with min-width queries; nothing assumes a fixed viewport.

## The system

### Why a 4px base unit

4 divides evenly into every common screen density (1x, 1.5x, 2x, 3x), so spacing renders crisply everywhere. It is small enough for fine control (icon padding, badge insets) yet large enough that the scale stays short and memorable. Doubling and halving inside the scale (4 → 8 → 16 → 32 → 64) creates visible rhythm, and every value in CDS — spacing, sizing, radii, grid gutters — lands on it.

### Spacing scale

| Token | Value | Typical use |
|---|---|---|
| space-0 | 0 | reset |
| space-0.5 | 2px | hairline nudges, icon-to-badge gaps |
| space-1 | 4px | tight inline gaps (icon to label) |
| space-2 | 8px | gaps inside compact components, chip padding |
| space-3 | 12px | input padding-x, small button padding |
| space-4 | 16px | default component padding, form field gaps |
| space-5 | 20px | large button padding-x |
| space-6 | 24px | card padding, grid gutters, page margin |
| space-8 | 32px | gaps between component groups |
| space-10 | 40px | large card/panel padding |
| space-12 | 48px | section gaps (mobile), page header spacing |
| space-16 | 64px | section gaps (desktop) |
| space-20 | 80px | hero padding, generous section breaks |
| space-24 | 96px | marketing section rhythm |
| space-32 | 128px | oversized hero/footer breathing room |

### Proximity: spacing communicates relationships

Related items are closer than unrelated items. Practical ladder:

| Relationship | Gap |
|---|---|
| Label → its input | space-2 (8px) |
| Lines within one text block | line-height only, no extra margin |
| Items in the same group (form fields, list rows) | space-4 (16px) |
| One component group → the next | space-8 (32px) |
| One page section → the next | space-16 (64px) desktop, space-12 (48px) mobile |

If two unrelated blocks sit closer than two related ones anywhere on the page, users will group them wrongly — fix the spacing, not the copy.

### Component-internal vs layout spacing

- **Component-internal** (space-1 → space-6): padding and gaps inside a button, input, card, or menu. Owned by the component; consumers never override it.
- **Layout spacing** (space-6 → space-32): gaps between components, groups, and sections. Owned by the page. Apply with `gap` on flex/grid parents rather than margins on children, so components stay composable and don't carry outer whitespace with them.

### Grid

| Property | Value |
|---|---|
| Columns | 12, fluid |
| Gutter | 24px (16px on mobile) |
| Max content width | 1280px |
| Page margin | 24px (16px on mobile) |

### Breakpoints (mobile-first, min-width queries)

| Token | Min-width | Typical shift |
|---|---|---|
| sm | 640px | single column → paired elements |
| md | 768px | stacked → 2-column layouts; type steps up |
| lg | 1024px | sidebar appears; 3-column grids |
| xl | 1280px | container reaches max width |
| 2xl | 1536px | extra whitespace only — content stops growing |

Design for 320px first; every breakpoint adds room, never removes content.

### Common layout patterns

- **Centered content**: single column capped at 66ch for prose (see typography doc), centered in the 1280px container.
- **Sidebar layout**: fixed ~280px sidebar + fluid main area; collapses to stacked below lg (1024px).
- **Card grid**: `auto-fit` with `minmax` so cards reflow without media queries; 24px gutters.
- **Dashboard**: 12-column grid, widgets spanning 3/4/6/12 columns, space-6 gutters throughout.

## Tokens

```css
:root {
  /* Spacing — 4px base unit */
  --cds-space-0: 0;
  --cds-space-0-5: 2px;
  --cds-space-1: 4px;
  --cds-space-2: 8px;
  --cds-space-3: 12px;
  --cds-space-4: 16px;
  --cds-space-5: 20px;
  --cds-space-6: 24px;
  --cds-space-8: 32px;
  --cds-space-10: 40px;
  --cds-space-12: 48px;
  --cds-space-16: 64px;
  --cds-space-20: 80px;
  --cds-space-24: 96px;
  --cds-space-32: 128px;

  /* Layout */
  --cds-container-max: 1280px;
  --cds-page-margin: 16px;          /* mobile */
  --cds-grid-gutter: 16px;          /* mobile */
  --cds-grid-columns: 12;

  /* Breakpoints (reference values — use in media queries) */
  --cds-breakpoint-sm: 640px;
  --cds-breakpoint-md: 768px;
  --cds-breakpoint-lg: 1024px;
  --cds-breakpoint-xl: 1280px;
  --cds-breakpoint-2xl: 1536px;

  /* Section rhythm */
  --cds-section-gap: var(--cds-space-12);   /* 48px mobile */
}

@media (min-width: 640px) {
  :root {
    --cds-page-margin: 24px;
    --cds-grid-gutter: 24px;
  }
}
@media (min-width: 768px) {
  :root {
    --cds-section-gap: var(--cds-space-16); /* 64px desktop */
  }
}
```

## Usage

Container and 12-column grid:

```css
.cds-container {
  max-width: var(--cds-container-max);   /* 1280px */
  margin-inline: auto;
  padding-inline: var(--cds-page-margin); /* 16px mobile, 24px up */
}

.cds-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--cds-grid-gutter);           /* 16px mobile, 24px up */
}
```

Sidebar layout that collapses below lg:

```css
.cds-shell {
  display: grid;
  grid-template-columns: 1fr;            /* stacked on mobile */
  gap: var(--cds-space-6);
}
@media (min-width: 1024px) {
  .cds-shell { grid-template-columns: 280px 1fr; }
}
```

Card grid with auto-fit minmax (no media queries needed) and correct proximity:

```html
<section class="cds-section">
  <h2>Projects</h2>
  <div class="cds-card-grid">
    <article class="cds-card">…</article>
    <article class="cds-card">…</article>
    <article class="cds-card">…</article>
  </div>
</section>

<style>
.cds-section { margin-block-end: var(--cds-section-gap); } /* 64px desktop, 48px mobile */
.cds-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--cds-space-6);              /* 24px between cards */
}
.cds-card { padding: var(--cds-space-6); } /* 24px internal padding */
</style>
```

Centered prose column:

```css
.cds-prose-page {
  max-width: 66ch;
  margin-inline: auto;
  padding-inline: var(--cds-page-margin);
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Snap every gap to the scale: 8, 16, 24, 32… | Don't eyeball 13px, 18px, or 25px — off-grid values break rhythm and can't be tokenized |
| Put space-2 (8px) between a label and its input, space-4 (16px) between fields | Don't use one uniform 16px everywhere — equal spacing erases grouping, so labels float between fields |
| Separate page sections with space-16 (64px) on desktop, space-12 (48px) on mobile | Don't butt sections together at 24px and add horizontal rules to compensate — space groups better than lines |
| Use `gap` on the flex/grid parent for gaps between siblings | Don't put `margin-bottom` on reusable components — they drag outer whitespace into every new context |
| Keep card padding at space-6 (24px) owned by the card component | Don't override a card's internal padding per page — internal spacing belongs to the component |
| Build card grids with `repeat(auto-fit, minmax(280px, 1fr))` and 24px gap | Don't hardcode 4 columns for cards — at 900px they crush to ~190px and the content wraps badly |
| Cap content at 1280px and center it with auto margins | Don't stretch dashboards edge-to-edge on a 1536px+ monitor — full-bleed text lines become unreadable |
| Write mobile-first min-width queries at 640/768/1024/1280/1536 | Don't invent per-page breakpoints like 900px — every custom breakpoint is a new device matrix to test |
| Keep 16px page margins and gutters on mobile, 24px from sm up | Don't run content to the screen edge on phones — zero-margin layouts feel broken and clip shadows |
| Collapse the 280px sidebar to a stacked layout below lg (1024px) | Don't keep a fixed sidebar at 768px — it leaves the main column under 500px and forces horizontal scroll |

## Checklist

- [ ] Every margin, padding, and gap is a `--cds-space-*` token (4px grid)
- [ ] Related elements are visibly closer than unrelated ones — the proximity ladder holds
- [ ] Section gaps are ≥ 64px desktop / 48px mobile
- [ ] Sibling gaps use `gap` on the parent, not margins on children
- [ ] Content is capped at 1280px with 24px page margins (16px mobile)
- [ ] Grid gutters are 24px (16px mobile)
- [ ] All media queries are min-width at the five system breakpoints
- [ ] Card grids use auto-fit minmax; layout survives 320px → 1536px without horizontal scroll
- [ ] Prose columns cap at 66ch
- [ ] Component-internal spacing is untouched by page-level CSS

## Related

- [00 · Design principles](./00-design-principles.md)
- [01 · Color](./01-color.md)
- [02 · Typography](./02-typography.md)
