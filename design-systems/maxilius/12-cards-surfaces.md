# 12 · Cards & surfaces — Maxilius Design System

> Cards group related content onto a raised surface; the surface hierarchy (canvas → surface → raised → sunken) gives every screen calm, cool structure.

## Principles

1. **Surfaces build the cool framework.** Cards are cool-gray/white structure that recedes; the content — and at most one warm action — does the talking.
2. **Elevation is meaning, not decoration.** Three levels only: `flat` sits in the page, `raised` (default) separates from the canvas, `floating` hovers above everything static.
3. **One level of nesting.** A card is a leaf surface. Never place a card inside another card — use a sunken region or a divider instead.
4. **Interactive means the whole card.** If a card is clickable, the entire surface is the target, it lifts on hover, and it shows a visible focus ring.
5. **Dark mode elevates with color, not shadow.** In dark themes, raised surfaces get lighter (`bg-surface-raised` = gray-800), while shadows stay quiet.

## The system

### Surface hierarchy (semantic tokens)

| Layer | Token | Light | Dark |
|---|---|---|---|
| Canvas (page bg) | `--mx-bg-canvas` | gray-50 `#F8FAFC` | gray-950 `#020617` |
| Surface (cards, panels) | `--mx-bg-surface` | white `#FFFFFF` | gray-900 `#0F172A` |
| Raised (toasts, popovers) | `--mx-bg-surface-raised` | white `#FFFFFF` | gray-800 `#1E293B` |
| Sunken (wells, card footers) | `--mx-bg-surface-sunken` | gray-100 `#F1F5F9` | gray-950 `#020617` |

The canvas is never pure white and never pure black: cards read as surfaces only because the canvas sits one step behind them.

### Card anatomy (as implemented in `@maxilius/react`)

| Part | Treatment |
|---|---|
| Container | `--mx-bg-surface`, 1px `--mx-border-subtle` border, `--mx-radius-lg` (12px), `overflow: hidden` |
| Header | space-4 × space-5 padding (16/20px), semibold, `--mx-font-size-md` (16px), bottom border `--mx-border-subtle` |
| Body | space-5 padding (20px), `--mx-font-size-sm` (14px), line-height normal (1.5), `--mx-text-secondary` |
| Footer | space-4 × space-5 padding, right-aligned actions with space-3 gap, `--mx-bg-surface-sunken`, top border `--mx-border-subtle` |
| Transition | shadow, transform, border-color at `--mx-motion-duration-base` (200ms), standard easing |

### Elevation variants

| Variant | Shadow | Border |
|---|---|---|
| `flat` | none | `--mx-border-default` (gray-200) — border does the separating |
| `raised` (default) | `--mx-shadow-sm` | `--mx-border-subtle` (gray-100) |
| `floating` | `--mx-shadow-lg` | transparent — shadow does the separating |

### Interactive cards

`interactive` adds `cursor: pointer` plus, on hover: `--mx-shadow-md`, `translateY(-2px)`, border strengthens to `--mx-border-default`. On `:focus-visible`: 2px `--mx-focus-ring` outline at 2px offset. Give clickable cards `tabIndex={0}`, `role="link"` (or `"button"`), and key handling — or use the whole-card click technique below.

### Content hierarchy inside a card

| Slot | Type token | Size |
|---|---|---|
| Eyebrow label | `--mx-font-size-xs` + `--mx-font-letter-spacing-caps` | 12px caps |
| Card title | `--mx-font-size-xl`, semibold (or `md` in the header slot) | 20px |
| Body copy | `--mx-font-size-sm`, `--mx-text-secondary` | 14px |
| Meta/caption | `--mx-font-size-xs`, `--mx-text-muted` | 12px |

### Card grids

Grid gap is `--mx-space-6` (24px) on desktop, `--mx-space-4` (16px) under 640px. Equal-height rows come free from the card's internal flex column — footers align because `CardBody` is `flex: 1`.

## Tokens

```css
:root {
  /* surfaces */
  --mx-bg-canvas: #F8FAFC;
  --mx-bg-surface: #FFFFFF;
  --mx-bg-surface-raised: #FFFFFF;
  --mx-bg-surface-sunken: #F1F5F9;
  /* borders */
  --mx-border-subtle: #F1F5F9;
  --mx-border-default: #E2E8F0;
  --mx-border-width-thin: 1px;
  /* shape */
  --mx-radius-lg: 0.75rem;   /* 12px — cards, panels */
  --mx-radius-xl: 1rem;      /* 16px — hero surfaces */
  /* elevation */
  --mx-shadow-sm: 0 1px 2px 0 rgb(2 6 23 / 0.06);
  --mx-shadow-md: 0 2px 4px -1px rgb(2 6 23 / 0.08), 0 4px 8px -2px rgb(2 6 23 / 0.06);
  --mx-shadow-lg: 0 4px 8px -2px rgb(2 6 23 / 0.1), 0 12px 24px -4px rgb(2 6 23 / 0.08);
  /* spacing & motion */
  --mx-space-3: 0.75rem;
  --mx-space-4: 1rem;
  --mx-space-5: 1.25rem;
  --mx-space-6: 1.5rem;
  --mx-motion-duration-base: 200ms;
  --mx-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
  --mx-focus-ring: #3B82F6;
}
```

## Usage

React — standard card with header, body, footer:

```html
<Card elevation="raised">
  <CardHeader>Billing summary</CardHeader>
  <CardBody>Your next invoice is $128.00, due July 24.</CardBody>
  <CardFooter>
    <Button variant="ghost">View details</Button>
    <Button variant="primary">Pay now</Button>
  </CardFooter>
</Card>
```

Plain CSS card with the whole-card click technique — one stretched link, no nested interactive elements needed:

```css
.mx-card { position: relative; background: var(--mx-bg-surface);
  border: var(--mx-border-width-thin) solid var(--mx-border-subtle);
  border-radius: var(--mx-radius-lg); box-shadow: var(--mx-shadow-sm);
  transition: box-shadow var(--mx-motion-duration-base) var(--mx-motion-easing-standard),
    transform var(--mx-motion-duration-base) var(--mx-motion-easing-standard); }
.mx-card__link::after { content: ""; position: absolute; inset: 0; }
.mx-card:has(.mx-card__link:hover) { box-shadow: var(--mx-shadow-md); transform: translateY(-2px); }
.mx-card:has(.mx-card__link:focus-visible) { outline: 2px solid var(--mx-focus-ring); outline-offset: 2px; }
```

```html
<article class="mx-card">
  <div class="mx-card__body">
    <h3><a class="mx-card__link" href="/projects/atlas">Project Atlas</a></h3>
    <p>Cool-framework refactor of the onboarding flow.</p>
  </div>
</article>
```

Media card: use `flush` so the image runs edge to edge, then pad the text block yourself with space-5.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use `raised` (shadow-sm + subtle border) as the default card everywhere | Don't invent in-between elevations — three variants only: flat, raised, floating |
| Put page background on `--mx-bg-canvas` (gray-50) so white cards read as surfaces | Don't put white cards on a white body — with no contrast, the border alone carries too much weight |
| Nest depth with `--mx-bg-surface-sunken` wells or a Divider inside a card | Don't nest a card inside a card — double borders and stacked shadows destroy the hierarchy |
| Make the whole card the click target (stretched-link `::after` or `interactive` + `tabIndex`) | Don't make only the title clickable while the card lifts on hover — the affordance lies |
| Keep hover lift to exactly `translateY(-2px)` + shadow-sm→md over 200ms | Don't lift static, non-clickable cards on hover — motion promises interaction |
| Use `--mx-radius-lg` (12px) on cards and `--mx-radius-xl` (16px) only on modals/hero surfaces | Don't mix radii in one grid — a 4px card next to a 16px card looks like two systems |
| Put primary actions in the footer, right-aligned, at most one warm (accent) button per view | Don't scatter buttons through the card body or use two accent CTAs in one card grid |
| Set card titles at `--mx-font-size-xl` (20px) semibold with body at sm/`text-secondary` | Don't set card body copy in `--mx-text-muted` (gray-400) — it's reserved for placeholders and large text |
| In dark mode let `bg-surface-raised` (gray-800) signal elevation and keep shadows unchanged | Don't crank shadow opacity in dark mode — dark-on-dark shadows are invisible; lighter surfaces aren't |
| Use `flush` for edge-to-edge media, then restore space-5 padding on the text block | Don't fake flush by using negative margins inside the padded body |

## Checklist

- [ ] Card sits on `--mx-bg-canvas`, not on another card or a pure-white body
- [ ] Elevation is one of flat / raised / floating and matches the card's role
- [ ] Radius is `--mx-radius-lg`; borders use `--mx-border-subtle` or `--mx-border-default` only
- [ ] Clickable cards: whole surface is the target, hover lift present, focus ring visible via keyboard
- [ ] Title / body / meta follow the xl / sm / xs type slots with correct text tokens
- [ ] Footer actions are right-aligned with space-3 gap; no more than one warm CTA in view
- [ ] Grid gap is space-6 desktop / space-4 mobile; cards in a row align their footers
- [ ] Verified in dark mode: gray-900 surface on gray-950 canvas, raised = gray-800

## Related

- [10-buttons-actions.md](./10-buttons-actions.md) — footer action variants and temperature rules
- [13-feedback.md](./13-feedback.md) — toasts and overlays that float above surfaces
- [14-data-display.md](./14-data-display.md) — tables and lists that live inside cards
- [04-elevation-depth.md](./04-elevation-depth.md) — the full shadow scale
