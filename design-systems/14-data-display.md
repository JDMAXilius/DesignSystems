# 14 · Data display — Cloud Design System

> Tables, lists, badges, tooltips, and stat blocks that make dense data scannable without losing the system's calm, airy feel.

## Principles

1. **Alignment does the work.** Text left, numbers right with tabular figures — the eye scans columns, not decoration.
2. **Quiet chrome, loud data.** Hairline `cloud-200` rules and `cloud-50` hovers; the values themselves carry the weight.
3. **Every number has a label.** A stat without a unit, label, or comparison is decoration, not information.
4. **Status is icon + color + word.** Badges and deltas never rely on color alone.
5. **Tooltips are optional extras.** If content is critical or interactive, it lives on the page, not in a tooltip.

## The system

### Tables

| Part | Value |
|---|---|
| Header cell | `text-xs` (12px/16px), weight 600, uppercase, letter-spacing +0.02em, `cloud-500` |
| Body cell | `text-sm` (14px/20px), `cloud-900` primary / `cloud-600` secondary |
| Row height | 48px; cell padding `space-3` (12px) vertical, `space-4` (16px) horizontal |
| Row divider | 1px `border-bottom` `cloud-200`; no vertical rules |
| Hover | Row bg `cloud-50` |
| Numeric columns | Right-aligned, `font-variant-numeric: tabular-nums` |
| Text columns | Left-aligned — never centered |
| Long tables | Sticky header (`position: sticky; top: 0`, bg `cloud-0`, z-index 1100) |

### Lists

- Simple list rows: 48px min height, `space-4` padding, 1px `cloud-200` divider between rows.
- Two-line rows: primary `text-sm` 500 `cloud-900`, secondary `text-xs` `cloud-500`.
- Interactive rows hover `cloud-50` and show a 2px `sky-500` focus ring inside the row.

### Badges / tags

| Property | Value |
|---|---|
| Type | `text-xs` (12px), weight 500, sentence case, max 1–2 words |
| Shape | `radius-full` pill; padding 2px 8px (`space-0.5` / `space-2`) |
| Neutral | bg `cloud-100`, text `cloud-600` |
| Success | bg #F0FDF4, border #BBF7D0, text #15803D |
| Warning | bg #FFFBEB, border #FDE68A, text #B45309 |
| Danger | bg #FEF2F2, border #FECACA, text #B91C1C |
| Info | bg #F0F9FF, border #BAE6FD, text #0369A1 |

Optional leading dot or 16px icon inherits `currentColor`. Square `radius-xs` (4px) tags are reserved for removable filter chips.

### Tooltips

| Property | Value |
|---|---|
| Surface | bg `cloud-900` (#0F172A), text `cloud-0` (#FFFFFF) |
| Type | `text-sm` (14px/20px) |
| Shape | `radius-sm` (6px), padding `space-2` (8px) × `space-3` (12px) |
| Max width | 240px |
| Delay | 300ms show; hide immediately on leave |
| Motion | Fade 150ms (`duration-fast`); 250ms (`duration-base`) is the ceiling |
| z-index | 1800 (`tooltip`) |

Tooltips carry supplementary info only (full timestamps, icon-button names). Never hide critical or interactive content in them — they don't exist on touch.

### Key-value / description lists

Key: `text-sm` 500 `cloud-500`; value: `text-sm` `cloud-900`. Two-column grid, key column 160–200px, row gap `space-3` (12px). For record detail panels, not tabular comparisons.

### Stat / KPI blocks

| Part | Value |
|---|---|
| Value | `text-4xl` (36px/44px), weight 700, `cloud-900`, `tabular-nums` |
| Label | `text-sm`, `cloud-600`, above or below the value |
| Delta | `text-sm` 500 + arrow icon (16px): up #15803D, down #B91C1C — color **and** arrow, never color alone |
| Container | Standard card: `cloud-0`, `radius-lg`, `space-6` padding (see [12-cards-surfaces.md](12-cards-surfaces.md)) |

### Pagination

- Page buttons 40×40px (min touch 44px with spacing), `radius-md`, `text-sm` 500.
- Current page: solid `sky-600` bg, white text, `aria-current="page"`. Others: `cloud-600` text, hover `cloud-100`.
- Prev/next chevrons (20px icons) always present; disabled at ends (50% opacity, `not-allowed`).
- Show "1 … 4 5 6 … 24" with ellipsis beyond 7 pages; pair with "Showing 41–60 of 480" in `text-sm` `cloud-500`.

### Avatars

| Property | Value |
|---|---|
| Sizes | 24px (dense lists) / 32px (table rows, comments) / 40px (headers, default) / 64px (profile pages) |
| Shape | `radius-full` circle |
| Image | `object-fit: cover`, centered |
| Initials fallback | 1–2 uppercase letters, weight 600, when no image is available |
| Fallback background | Deterministic: hash the person's name to pick a 100-tint (`sky-100`, `twilight-100`, success/warning/danger tints); text uses the 700-shade of the same hue (e.g. `sky-100` bg + `sky-700` text) |
| Group overlap | Stacked avatars overlap by 25% of their width, each with a 2px `cloud-0` ring |
| Group cap | Max 4 visible, then a "+N" overflow chip (`cloud-100` bg, `cloud-600` text, same size and ring) |
| Status dot | Bottom-right, 25% of avatar size, 2px `cloud-0` ring; #16A34A online, `cloud-400` offline |
| Accessibility | Always `alt` (images) or `aria-label` (initials) with the person's full name; status dots pair with a text label nearby |

Hash the name, don't randomize: the same person must get the same color on every render and every page.

### Accordions

| Property | Value |
|---|---|
| Container | Single bordered container: 1px `cloud-200`, `radius-lg` (16px), 1px `cloud-200` internal dividers — or a plain divider list with no outer border |
| Header | Full-width button, 48–56px height, `text-md` (16px) weight 600, `cloud-900`, padding-x `space-4`–`space-6` |
| Chevron | 20px, right-aligned, `cloud-500`, rotates 180° over 250ms (`duration-base`) |
| Panel | Padding `space-4` (16px) vertical / `space-6` (24px) horizontal, `text-sm`, `cloud-600` |
| Open behavior | Multiple panels may be open by default; force single-open only when panels are mutually exclusive (e.g. picking one plan) |
| Semantics | Native `<details>`/`<summary>` is the accessible default; enhance styling on top of it |
| Hover / focus | Header hover `cloud-50`; focus-visible 2px `sky-500` ring |

FAQ is the canonical use. Don't hide critical content — pricing, legal terms, required steps — in collapsed accordions on desktop; collapse is for optional depth, not for burying obligations.

## Tokens

```css
:root {
  /* Table */
  --cds-table-header-color: #64748B;   /* cloud-500 */
  --cds-table-row-height: 48px;
  --cds-table-border: 1px solid #E2E8F0; /* cloud-200 */
  --cds-table-hover-bg: #F8FAFC;       /* cloud-50 */
  --cds-table-cell-color: #0F172A;     /* cloud-900 */

  /* Badge */
  --cds-badge-radius: 9999px;          /* radius-full */
  --cds-badge-neutral-bg: #F1F5F9;     /* cloud-100 */
  --cds-badge-neutral-text: #475569;   /* cloud-600 */
  --cds-badge-success-bg: #F0FDF4; --cds-badge-success-border: #BBF7D0; --cds-badge-success-text: #15803D;
  --cds-badge-warning-bg: #FFFBEB; --cds-badge-warning-border: #FDE68A; --cds-badge-warning-text: #B45309;
  --cds-badge-danger-bg:  #FEF2F2; --cds-badge-danger-border:  #FECACA; --cds-badge-danger-text:  #B91C1C;
  --cds-badge-info-bg:    #F0F9FF; --cds-badge-info-border:    #BAE6FD; --cds-badge-info-text:    #0369A1;

  /* Tooltip */
  --cds-tooltip-bg: #0F172A;           /* cloud-900 */
  --cds-tooltip-text: #FFFFFF;         /* cloud-0 */
  --cds-tooltip-radius: 6px;           /* radius-sm */
  --cds-tooltip-max-width: 240px;
  --cds-tooltip-delay: 300ms;

  /* Stats */
  --cds-stat-value-color: #0F172A;     /* cloud-900 */
  --cds-stat-label-color: #475569;     /* cloud-600 */
  --cds-delta-up: #15803D;
  --cds-delta-down: #B91C1C;

  /* Avatar */
  --cds-avatar-ring: #FFFFFF;          /* cloud-0 */
  --cds-avatar-sky-bg: #E0F2FE;   --cds-avatar-sky-text: #0369A1;      /* sky-100 / sky-700 */
  --cds-avatar-twilight-bg: #E0E7FF; --cds-avatar-twilight-text: #4338CA; /* twilight-100 / twilight-700 */

  /* Accordion */
  --cds-accordion-border: 1px solid #E2E8F0;  /* cloud-200 */
  --cds-accordion-radius: 16px;               /* radius-lg */
  --cds-accordion-duration: 250ms;            /* duration-base */

  /* Layers */
  --cds-z-sticky: 1100; --cds-z-tooltip: 1800;
}
```

## Usage

### Table with sticky header and numeric column

```html
<table class="cds-table">
  <thead>
    <tr>
      <th scope="col">Project</th>
      <th scope="col">Status</th>
      <th scope="col" class="cds-table__num">Spend</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Atlas</td>
      <td><span class="cds-badge cds-badge--success">Active</span></td>
      <td class="cds-table__num">$12,480.00</td>
    </tr>
  </tbody>
</table>
```

```css
.cds-table { width: 100%; border-collapse: collapse; font-size: 14px; line-height: 20px; }
.cds-table th {
  position: sticky; top: 0; z-index: var(--cds-z-sticky);
  background: #FFFFFF;                 /* cloud-0 */
  font-size: 12px; line-height: 16px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.02em;
  color: var(--cds-table-header-color);
  text-align: left; padding: 12px 16px;
  border-bottom: var(--cds-table-border);
}
.cds-table td {
  height: var(--cds-table-row-height);
  padding: 12px 16px;
  color: var(--cds-table-cell-color);
  border-bottom: var(--cds-table-border);
}
.cds-table tbody tr:hover { background: var(--cds-table-hover-bg); }
.cds-table__num { text-align: right; font-variant-numeric: tabular-nums; }
```

### Badge and tooltip

```html
<span class="cds-badge cds-badge--warning">Pending</span>

<button class="cds-icon-btn" aria-describedby="tip-copy">⧉</button>
<div class="cds-tooltip" id="tip-copy" role="tooltip">Copy API key</div>
```

```css
.cds-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 12px; line-height: 16px; font-weight: 500;
  padding: 2px 8px; border-radius: var(--cds-badge-radius);
  border: 1px solid transparent;
}
.cds-badge--warning {
  background: var(--cds-badge-warning-bg);
  border-color: var(--cds-badge-warning-border);
  color: var(--cds-badge-warning-text);
}
.cds-tooltip {
  background: var(--cds-tooltip-bg); color: var(--cds-tooltip-text);
  font-size: 14px; line-height: 20px;
  padding: 8px 12px; border-radius: var(--cds-tooltip-radius);
  max-width: var(--cds-tooltip-max-width);
  z-index: var(--cds-z-tooltip);
  transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1) var(--cds-tooltip-delay);
}
```

### Stat block with delta

```html
<article class="cds-stat">
  <p class="cds-stat__label">Monthly active users</p>
  <p class="cds-stat__value">24,318</p>
  <p class="cds-stat__delta cds-stat__delta--up">
    <svg width="16" height="16" aria-hidden="true"><!-- arrow-up --></svg>
    +12.4% vs last month
  </p>
</article>
```

```css
.cds-stat__label { font-size: 14px; line-height: 20px; color: var(--cds-stat-label-color); }
.cds-stat__value {
  font-size: 36px; line-height: 44px; font-weight: 700;
  color: var(--cds-stat-value-color);
  font-variant-numeric: tabular-nums;
  margin: 4px 0;
}
.cds-stat__delta { font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; gap: 4px; }
.cds-stat__delta--up { color: var(--cds-delta-up); }
.cds-stat__delta--down { color: var(--cds-delta-down); }
```

### Avatar with initials fallback and group

```html
<span class="cds-avatar cds-avatar--sky" aria-label="Amara Okafor">AO</span>

<div class="cds-avatar-group">
  <img class="cds-avatar" src="amara.jpg" alt="Amara Okafor">
  <span class="cds-avatar cds-avatar--twilight" aria-label="Jonas Lindqvist">JL</span>
  <img class="cds-avatar" src="mei.jpg" alt="Mei Tanaka">
  <span class="cds-avatar cds-avatar--sky" aria-label="Priya Raman">PR</span>
  <span class="cds-avatar cds-avatar--overflow" aria-label="3 more people">+3</span>
</div>
```

```css
.cds-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  width: 40px; height: 40px;                 /* 24 / 32 / 40 / 64 */
  border-radius: 9999px;                     /* radius-full */
  object-fit: cover;
  font-size: 14px; font-weight: 600;
}
.cds-avatar--sky      { background: var(--cds-avatar-sky-bg);      color: var(--cds-avatar-sky-text); }
.cds-avatar--twilight { background: var(--cds-avatar-twilight-bg); color: var(--cds-avatar-twilight-text); }
.cds-avatar--overflow { background: #F1F5F9; color: #475569; }     /* cloud-100 / cloud-600 */
.cds-avatar-group { display: flex; }
.cds-avatar-group .cds-avatar {
  box-shadow: 0 0 0 2px var(--cds-avatar-ring);  /* 2px cloud-0 ring */
}
.cds-avatar-group .cds-avatar + .cds-avatar { margin-left: -10px; }  /* 25% overlap at 40px */
```

Pick the tint class by hashing the name (e.g. sum of character codes modulo the palette length) so "Amara Okafor" is sky-tinted everywhere, forever. A status dot, when needed, is a 10px circle (25% of a 40px avatar) absolutely positioned bottom-right with the same 2px `cloud-0` ring.

### Accordion (enhanced native details/summary)

```html
<div class="cds-accordion">
  <details class="cds-accordion__item" open>
    <summary class="cds-accordion__header">
      Can I change plans later?
      <svg class="cds-accordion__chevron" width="20" height="20" aria-hidden="true"><!-- chevron-down --></svg>
    </summary>
    <div class="cds-accordion__panel">
      <p>Yes — upgrades apply immediately and downgrades apply at the next billing cycle.</p>
    </div>
  </details>
  <details class="cds-accordion__item">
    <summary class="cds-accordion__header">
      How do refunds work?
      <svg class="cds-accordion__chevron" width="20" height="20" aria-hidden="true"><!-- chevron-down --></svg>
    </summary>
    <div class="cds-accordion__panel">
      <p>Annual plans are refundable in full within 30 days of purchase.</p>
    </div>
  </details>
</div>
```

```css
.cds-accordion {
  border: var(--cds-accordion-border);
  border-radius: var(--cds-accordion-radius);
  overflow: hidden;
}
.cds-accordion__item + .cds-accordion__item { border-top: var(--cds-accordion-border); }
.cds-accordion__header {
  display: flex; align-items: center; justify-content: space-between;
  min-height: 48px; padding: 12px 24px;      /* 48–56px header, space-6 x */
  font-size: 16px; line-height: 24px; font-weight: 600;
  color: #0F172A;                            /* cloud-900 */
  cursor: pointer; list-style: none;
}
.cds-accordion__header::-webkit-details-marker { display: none; }
.cds-accordion__header:hover { background: #F8FAFC; }               /* cloud-50 */
.cds-accordion__header:focus-visible { outline: 2px solid #0EA5E9; outline-offset: -2px; }
.cds-accordion__chevron {
  color: #64748B;                            /* cloud-500 */
  transition: transform var(--cds-accordion-duration) cubic-bezier(0.2, 0, 0, 1);
}
.cds-accordion__item[open] .cds-accordion__chevron { transform: rotate(180deg); }
.cds-accordion__panel {
  padding: 0 24px 16px;                      /* space-6 x, space-4 bottom */
  font-size: 14px; line-height: 20px;
  color: #475569;                            /* cloud-600 */
}
@media (prefers-reduced-motion: reduce) { .cds-accordion__chevron { transition: none; } }
```

Native `<details>` keeps every panel independently openable — the default. Only add scripting to force single-open when panels are truly mutually exclusive.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Style table headers as `text-xs` 600 uppercase, +0.02em, `cloud-500` | Don't set headers in `text-sm` bold `cloud-900` — they compete with the data they label |
| Right-align numeric columns and set `font-variant-numeric: tabular-nums` | Don't left-align currency with proportional digits — figures won't line up for comparison |
| Left-align text columns, always | Don't center-align text columns — ragged edges on both sides destroy scanning |
| Separate rows with a 1px `cloud-200` bottom border and hover rows in `cloud-50` | Don't add vertical rules or zebra stripes on top of hover — triple chrome buries the data |
| Make headers sticky (`top: 0`, `cloud-0` bg, z-index 1100) on tables past one viewport | Don't let headers scroll away on a 200-row table — columns become anonymous |
| Keep badges to 1–2 words in `text-xs` 500 on a `radius-full` pill with a tint recipe | Don't write sentence-long badges or solid #DC2626 pills with white 12px text |
| Give status badges a dot or icon alongside the tint color | Don't distinguish "Active" from "Failed" by pill color alone — color is never the sole signal |
| Use tooltips (cloud-900 bg, 240px max, 300ms delay) for supplementary info like full timestamps | Don't hide required instructions or buttons in tooltips — touch users can never reach them |
| Set KPI values in `text-4xl` 700 with a `text-sm` `cloud-600` label | Don't show a bare "24,318" with no label or unit — orphaned numbers are noise |
| Show deltas with an arrow icon plus #15803D / #B91C1C text | Don't mark a drop with red text only — pair the color with the down arrow |
| Mark the current page with solid `sky-600` and `aria-current="page"` | Don't indicate the current page with a slightly darker gray — it fails the 3:1 UI contrast floor |
| Use "1 … 4 5 6 … 24" plus "Showing 41–60 of 480" for long result sets | Don't render 24 numbered buttons in a row — it wraps on mobile and buries prev/next |
| Pick avatar fallback colors by hashing the name — same person, same tint everywhere | Don't randomize initials backgrounds per render — a person who changes color between pages looks like two people |
| Give every avatar an `alt` or `aria-label` with the person's full name | Don't ship decorative-only avatars in a people list — screen readers hear an unlabeled image where a name should be |
| Cap avatar groups at 4 with a "+N" chip, 25% overlap, 2px `cloud-0` rings | Don't stack 12 overlapping avatars — past 4 they're unidentifiable and the row becomes noise |
| Use native `<details>`/`<summary>` for accordions and let multiple panels stay open | Don't force single-open accordions for FAQs — closing answer A while someone reads answer B loses their place |
| Keep pricing, legal terms, and required steps expanded on desktop | Don't hide critical content in collapsed accordions — users don't open what they don't know exists |

## Checklist

- [ ] Headers: `text-xs` 600 uppercase +0.02em `cloud-500`; sticky on long tables
- [ ] Rows 48px, 1px `cloud-200` dividers, hover `cloud-50`
- [ ] Numeric columns right-aligned with `tabular-nums`; text columns left-aligned
- [ ] Badges: `text-xs` 500, pill radius, tint recipes, 1–2 words, icon or dot for status
- [ ] Tooltips: `cloud-900`/white, `radius-sm`, ≤240px, 300ms delay, nothing critical or interactive inside
- [ ] Key-value lists use `cloud-500` keys and `cloud-900` values on the 4px grid
- [ ] Stats: `text-4xl` 700 value, `text-sm` `cloud-600` label, delta = color + arrow
- [ ] Pagination: `sky-600` current page with `aria-current`, ellipsis beyond 7 pages
- [ ] All text meets 4.5:1 contrast; interactive targets ≥ 44×44px with spacing
- [ ] Avatars: `radius-full`, name-hashed 100-tint fallback with 700-shade initials, `alt`/`aria-label` with the full name
- [ ] Accordions: 48–56px button headers, 20px chevron rotating 180° in 250ms, no critical content collapsed on desktop

## Related

- [12-cards-surfaces.md](12-cards-surfaces.md) — the card surfaces stat blocks and tables sit on
- [13-feedback.md](13-feedback.md) — status tint recipes shared by alerts and badges
