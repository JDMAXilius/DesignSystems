# 14 · Data display — Maxilius Design System

> Tables, badges, tooltips, avatars, lists, and stats present dense information on the cool framework — quiet structure, scannable hierarchy, warm color only where status truly demands it.

## Principles

1. **Structure recedes, data leads.** Borders are subtle gray-100/200, headers sit on the sunken surface — the values themselves carry the contrast.
2. **Numbers align right, in tabular figures.** Numeric columns use `numeric` (right-align + `tabular-nums`) so magnitudes compare at a glance.
3. **Status is a token quartet, never a lone color.** Badges reuse the same `feedback-*` bg/border/text roles as alerts, so status reads identically everywhere.
4. **Density is a deliberate mode.** Default rows breathe; `dense` is for ops screens — never mix densities in one table.
5. **Fallbacks are designed, not accidental.** Avatars degrade image → initials → glyph; empty cells show an en dash, not a blank.

## The system

### Table (as implemented: `Table` + `TableHead`/`TableBody`/`Tr`/`Th`/`Td`)

- **Container:** scrollable wrapper (`overflow-x: auto`), 1px `--mx-border-default`, `--mx-radius-lg`, `--mx-bg-surface`. The table never breaks the page grid — it scrolls inside.
- **Header (`Th`):** `--mx-font-size-xs` (12px) semibold, uppercase with `--mx-font-letter-spacing-caps` (0.08em), `--mx-text-secondary` on `--mx-bg-surface-sunken`, bottom border `--mx-border-default`, `white-space: nowrap`, `scope="col"` built in.
- **Cells (`Td`):** sm text (14px), line-height snug (1.375), bottom border `--mx-border-subtle`; the last row drops its border so it never doubles the container edge.
- **Row height:** padding space-3 × space-4 (12/16px) → ~44px rows; `dense` drops to space-2 × space-3 (8/12px) → ~36px rows.
- **Props:** `striped` shades even body rows with `--mx-bg-surface-sunken`; `hoverable` tints hovered rows `--mx-action-primary-subtle-bg` (blue-50 light / blue-950 dark); `numeric` on `Th`/`Td` right-aligns with tabular figures.

### Badge (as implemented) — Maxilius's tag

- **Variants (6):** `neutral` (default: sunken bg, gray-200 border, `text-secondary`), `primary` (blue subtle pair, no border), and `info`/`success`/`warning`/`danger` on the feedback bg/border/text quartets.
- **Sizes:** `md` — space-1 × space-3 padding, sm text; `sm` — 0 × space-2 padding, xs text. Both pill-shaped (`--mx-radius-full`), weight medium, wide letter-spacing (0.04em), nowrap.
- **`dot`:** a 0.5em `currentColor` dot before the label for presence/status lists.
- Use badges for labels and taxonomy tags too — same component, `neutral` or `primary` variant.

### Tooltip (as implemented)

- **Mechanism:** CSS-driven; shows on hover **and** keyboard focus (`:focus-within`), announced via `aria-describedby` on the single focusable child.
- **Placements:** `top` (default), `bottom`, `left`, `right`, offset space-2 (8px) from the trigger.
- **Surface:** `--mx-bg-inverse` / `--mx-text-inverse` (inverted), xs text (12px) medium, snug line-height, `--mx-radius-md`, `--mx-shadow-md`, `z-index: var(--mx-z-tooltip)` (1600).
- **Timing:** fades in over `--mx-motion-duration-fast` (120ms) — no long open delay.
- **Width:** content is `white-space: nowrap`, so there is no wrapping max-width — keep tooltips to a few words (≤ ~40 characters); longer help belongs in visible text.

### Avatar (as implemented)

| Size | Box | Initials size |
|---|---|---|
| xs | space-6 (24px) | xs (12px) |
| sm | space-8 (32px) | xs (12px) |
| md (default) | space-10 (40px) | sm (14px) |
| lg | space-12 (48px) | md (16px) |
| xl | space-16 (64px) | xl (20px) |

- **Fallback chain:** `src` image (`object-fit: cover`) → initials (first letter of the first two words, uppercased, semibold on `--mx-action-primary-subtle-bg`/`-text`) → `user` glyph in `--mx-text-muted`. A broken image automatically falls back; the name stays available to screen readers.
- **Shape:** `circle` (radius-full, default) or `square` (radius-md).
- **Status dot:** bottom-right, 27% of the box, 2px `--mx-bg-surface` ring; `online` success-icon green · `away` warning-icon amber · `busy` danger-icon red · `offline` `--mx-text-muted`.

### Lists (as implemented)

`unordered` (disc) / `ordered` (decimal) / `plain` variants at sm text, space-2 item gap, muted markers. `divided` swaps the gap for space-3 padding and 1px `--mx-border-subtle` rules between items. Plain-list items take a leading sm icon with `iconColor` muted (default) / primary / success / warning / danger.

### Stat / KPI patterns (docs-defined)

Inside a Card body: eyebrow label at xs, caps letter-spacing, `--mx-text-secondary`; value at `--mx-font-size-4xl` (36px) — `5xl` (48px) for a single hero stat — semibold, tight letter-spacing (−0.02em), `tabular-nums`; delta as a sm `success`/`danger` Badge beside the value. Stat grids share the space-6 card-grid gap.

### Pagination (docs-defined)

A right-aligned row under the table, space-3 above: "1–25 of 312" in sm `--mx-text-secondary`, then chevron-left / chevron-right ghost buttons at `--mx-size-control-sm` (32px) with visible focus rings and `aria-label`s. Disable (don't hide) the unavailable direction using the `action-disabled` tokens.

## Tokens

```css
:root {
  /* table */
  --mx-bg-surface-sunken: #F1F5F9;      /* th bg, zebra stripes */
  --mx-border-subtle: #F1F5F9;          /* row rules */
  --mx-border-default: #E2E8F0;         /* container + header rule */
  --mx-action-primary-subtle-bg: #EFF6FF;  /* hover row tint */
  --mx-action-primary-subtle-text: #1D4ED8; /* avatar initials, primary badge */
  /* type slots */
  --mx-font-size-xs: 0.75rem;   /* th, badges sm, tooltips */
  --mx-font-size-sm: 0.875rem;  /* cells, lists, badges md */
  --mx-font-size-4xl: 2.25rem;  /* KPI value */
  --mx-font-letter-spacing-caps: 0.08em;
  --mx-font-letter-spacing-wide: 0.04em;
  /* shape & layering */
  --mx-radius-md: 0.5rem; --mx-radius-lg: 0.75rem; --mx-radius-full: 9999px;
  --mx-z-tooltip: 1600;
  /* status dots */
  --mx-feedback-success-icon: #16A34A;
  --mx-feedback-warning-icon: #D97706;
  --mx-feedback-danger-icon: #DC2626;
  --mx-text-muted: #94A3B8;
  /* spacing */
  --mx-space-2: 0.5rem; --mx-space-3: 0.75rem; --mx-space-4: 1rem;
}
```

## Usage

React — a hoverable table with status badges and a numeric column:

```html
<Table hoverable striped>
  <TableHead>
    <Tr>
      <Th>Member</Th>
      <Th>Status</Th>
      <Th numeric>Requests</Th>
    </Tr>
  </TableHead>
  <TableBody>
    <Tr>
      <Td><Avatar size="xs" name="Ada Okafor" /> Ada Okafor</Td>
      <Td><Badge variant="success" size="sm" dot>Active</Badge></Td>
      <Td numeric>12,408</Td>
    </Tr>
  </TableBody>
</Table>
```

CSS — a KPI stat tile using the real type tokens:

```css
.mx-stat__label { font-size: var(--mx-font-size-xs); font-weight: var(--mx-font-weight-semibold);
  letter-spacing: var(--mx-font-letter-spacing-caps); text-transform: uppercase;
  color: var(--mx-text-secondary); }
.mx-stat__value { font-size: var(--mx-font-size-4xl); font-weight: var(--mx-font-weight-semibold);
  letter-spacing: var(--mx-font-letter-spacing-tight); font-variant-numeric: tabular-nums;
  color: var(--mx-text-primary); }
```

```html
<div class="mx-card"><div class="mx-card__body">
  <div class="mx-stat__label">Monthly active users</div>
  <div class="mx-stat__value">48,210</div>
  <span class="mx-badge mx-badge--success mx-badge--sm">▲ 12%</span>
</div></div>
```

Tooltip on an icon-only button:

```html
<Tooltip content="Copy link" placement="bottom">
  <Button variant="ghost" iconStart="copy" aria-label="Copy link" />
</Tooltip>
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Mark numeric columns with `numeric` for right alignment and tabular figures | Don't center or left-align money and counts — digits stop lining up |
| Pick one density cue: `striped` for wide tables, `hoverable` for row-click tables | Don't stack striped + hoverable + dense by default — zebra plus hover tint turns to noise |
| Let the built-in wrapper scroll wide tables horizontally | Don't shrink font size below sm to force-fit columns on mobile |
| Use `Badge variant="success/warning/danger"` for persistent status, with `dot` in dense lists | Don't hand-roll status chips from raw hexes — the feedback quartets already pass contrast in both themes |
| Keep tooltips to a few words on a single focusable trigger | Don't put links, buttons, or multi-sentence help in a tooltip — content is nowrap and hover-only |
| Rely on the avatar's image → initials → glyph fallback by always passing `name` | Don't render an empty gray circle when the image 404s — no `name` means no initials |
| Size avatars by context: xs (24px) in table rows, md (40px) default, xl (64px) in profiles | Don't scale avatars with ad-hoc widths — the five size tokens keep status dots proportioned |
| Use `List variant="plain" divided` with icons for settings-style rows | Don't fake list dividers with `<hr>` between `<li>` elements |
| Set KPI values in 4xl semibold with tight letter-spacing and an xs caps eyebrow | Don't set stat labels in Title Case or body-size text — the eyebrow slot is xs caps |
| Show "1–25 of 312" and disable (not hide) unavailable pagination arrows | Don't remove the previous arrow on page one — the layout shifts and users lose the control's position |

## Checklist

- [ ] Table lives in its scrollable container; header uses xs caps on the sunken surface
- [ ] Numeric columns use `numeric` on both `Th` and `Td`
- [ ] Density, stripes, and hover are chosen deliberately — one table, one density
- [ ] Every status badge pairs color with a readable label (and `dot` only as an extra cue)
- [ ] Tooltips trigger on hover *and* focus, sit at z-1600, and stay under ~40 characters
- [ ] Avatars always receive `name`; status dots use the four implemented presence colors
- [ ] KPI values use tabular figures; deltas use success/danger badges, not raw color
- [ ] Pagination controls are ≥ 32px, labeled, and keyboard-focusable
- [ ] Checked both themes: stripes, hover tint, and badges still pass 3:1 against their row

## Related

- [12-cards-surfaces.md](./12-cards-surfaces.md) — cards that host tables and stat tiles
- [13-feedback.md](./13-feedback.md) — transient status (toasts) vs. persistent status (badges)
- [03-typography.md](./03-typography.md) — the full type scale behind these slots
- [05-iconography.md](./05-iconography.md) — the 18 built-in icons used in lists and tooltips
