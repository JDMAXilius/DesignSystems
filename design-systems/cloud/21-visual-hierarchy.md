# 21 · Visual hierarchy & composition — Cloud Design System
> How CDS screens direct the eye — size, weight, color, contrast, space, and position working together so every view reads in a deliberate order.

## Principles

1. **The eye lands in a chosen order.** Primary → secondary → tertiary. If users scan a view and land somewhere random, the composition failed — not the user.
2. **One focal point per view.** Exactly one H1, one primary action, one hero moment. Two focal points equals zero.
3. **Structure before color.** Size, weight, and space establish hierarchy; color and effects only reinforce it. If the layout needs sky-600 to make sense, it doesn't make sense.
4. **Emphasis is a budget.** Every bold weight, accent color, and large size spends attention. Emphasize everything and you've emphasized nothing.
5. **Alignment is invisible until it's broken.** Shared edges create the lines that hold a composition together — nothing floats unaligned.

## The system

### The six hierarchy levers

| Lever | Rule | CDS values |
|---|---|---|
| Size | Adjacent hierarchy levels differ by ≥ 1 type-scale step; page title vs body should differ by several | text-5xl (48px) H1 → text-2xl (24px) H4 → text-md (16px) body → text-sm (14px) meta |
| Weight | Three working weights, used as levels | 400 body → 600 subheads/emphasis → 700 headings (800 hero display only) |
| Color | Darker text advances, lighter recedes | cloud-900 primary text → cloud-600 secondary → cloud-400 muted (large/disabled only). sky-600 draws the eye — spend it only on the #1 action |
| Contrast | High contrast against the background advances; low contrast recedes | cloud-900 on cloud-0 pops; cloud-600 on cloud-50 supports; a solid sky-600 button outweighs an outline button on any surface |
| Space | Negative space isolates, and isolation is emphasis — the more whitespace around an element, the more important it reads | space-16+ (64px) around a hero CTA; space-6 (24px) around ordinary cards |
| Position | LTR readers enter top-left; earlier and higher positions carry more weight | Page title top-left; primary action at the natural end of the reading path; footers get the leftovers |

Use levers in that order. Reach for size and weight first, then color; a layout whose hierarchy survives in grayscale is correct — one that doesn't is decorated, not structured.

### Scanning patterns and position

| Pattern | Where it applies | How to compose for it |
|---|---|---|
| F-pattern | Text-heavy pages: docs, articles, dashboards, lists | Front-load headings and row labels on the left edge; the first two words of each line do most of the work; keep one strong left alignment line |
| Z-pattern | Sparse marketing/hero pages | Logo top-left → nav/action top-right → diagonal through the hero visual → CTA bottom-right; place the primary button on the Z's exit point |

### Alignment

- **Every element aligns to something.** Each edge should share a line with a neighbor, the grid, or the container — nothing floats at an arbitrary offset.
- **Shared edges create invisible lines.** A column of cards with flush left edges reads as one structure; a 4px wobble reads as a mistake, not a choice.
- **Left-align text blocks** in LTR interfaces. Center only short display moments: a hero heading plus one supporting line, an empty state, a confirmation.
- **Never center long text.** Beyond ~3 lines, centered ragged edges force the eye to re-find the start of every line.
- **One alignment axis per group.** Inside a card or section, pick left-aligned or centered — mixing both in one group breaks the invisible line.

### Proximity (recap from [03 · Spacing, layout & grid](./03-spacing-layout-grid.md))

| Relationship | Gap |
|---|---|
| Parts of one item (heading → its description, label → value) | space-2 (8px) |
| Item → next item in a group | space-6 (24px) |
| Section → next section | space-16 (64px) desktop, space-12 (48px) mobile |

Grouping by space is itself hierarchy: whatever the whitespace isolates is what the section is about.

### Visual weight & balance

Elements carry weight: dark, large, saturated, dense, high-contrast things are heavy; light, small, desaturated, airy things are light. Compositions balance these weights around an axis.

| Balance | Feel | Use for |
|---|---|---|
| Symmetrical | Formal, stable, trustworthy | Forms, dialogs, sign-in pages, settings, confirmation screens |
| Asymmetrical | Dynamic, energetic | Marketing heroes: a large visual on one side counterweighted by a heading + CTA cluster on the other |

A small heavy element (solid sky-600 button) can balance a large light one (pale illustration) — balance is about weight, not area.

### Negative space as a feature

- Don't fill every gap. Empty regions are doing work: separating, framing, and pointing at the focal element.
- **Marketing pages run airy:** space-20/space-24 (80/96px) section rhythm, generous hero padding, one idea per viewport.
- **Dashboards run denser** for scanning — but still on the 4px scale (space-4/space-6 internals), never crammed off-grid. Density is a documented choice, not entropy.
- When a screen feels crowded, remove or space elements first; never shrink text or add dividers to compensate.

## Tokens

Hierarchy introduces **no new tokens** — it is a way of spending existing ones. The levers map to tokens defined in sibling docs:

```css
:root {
  /* Size lever — type scale (02-typography) */
  --cds-text-5xl: 48px;   /* H1, one per view */
  --cds-text-2xl: 24px;   /* H4 / section titles */
  --cds-text-md: 16px;    /* body */
  --cds-text-sm: 14px;    /* meta, captions */

  /* Weight lever */
  --cds-font-regular: 400;
  --cds-font-semibold: 600;
  --cds-font-bold: 700;

  /* Color lever (01-color) */
  --cds-text-primary: #0F172A;    /* cloud-900 */
  --cds-text-secondary: #475569;  /* cloud-600 */
  --cds-text-muted: #94A3B8;      /* cloud-400 — large/disabled only */
  --cds-color-primary: #0284C7;   /* sky-600 — the #1 action only */

  /* Space lever (03-spacing) */
  --cds-space-2: 8px;    /* within an item */
  --cds-space-6: 24px;   /* between items */
  --cds-space-16: 64px;  /* between sections */
}
```

## Usage

### Worked example: pricing card

```html
<article class="cds-price-card">
  <!-- Level 3: eyebrow — smallest, letter-spaced, secondary color; sets context without competing -->
  <p class="plan-eyebrow">Pro plan</p>
  <!-- Level 1: the price is the focal point — largest size, heaviest weight, darkest color -->
  <p class="plan-price">$24<span class="per">/mo</span></p>
  <!-- Level 2: supporting copy — body size, secondary color, recedes behind the price -->
  <p class="plan-desc">Everything in Basic, plus unlimited projects and priority support.</p>
  <!-- The single sky-600 spend on this card: one solid primary action -->
  <button class="cds-btn-primary">Start free trial</button>
</article>

<style>
.cds-price-card {
  background: #FFFFFF;                 /* cloud-0 surface advances off the cloud-50 page */
  border-radius: 16px;                 /* radius-lg */
  padding: var(--cds-space-8);         /* 32px — generous padding = importance */
  text-align: left;                    /* one alignment axis: everything shares the left edge */
}
.plan-eyebrow {
  font-size: var(--cds-text-sm); font-weight: 600;
  letter-spacing: 0.02em; text-transform: uppercase;
  color: var(--cds-text-secondary);
  margin-block-end: var(--cds-space-2);   /* 8px — belongs to the price */
}
.plan-price {
  font-size: var(--cds-text-5xl); font-weight: 700;  /* SIZE + WEIGHT make it level 1 */
  color: var(--cds-text-primary);                     /* max CONTRAST on white */
  margin-block-end: var(--cds-space-2);
}
.plan-price .per { font-size: var(--cds-text-md); font-weight: 400; color: var(--cds-text-secondary); }
.plan-desc {
  font-size: var(--cds-text-md); color: var(--cds-text-secondary);
  margin-block-end: var(--cds-space-6);   /* 24px — separates copy from the action */
}
</style>
```

### Worked example: marketing hero (Z-pattern, asymmetrical balance)

```html
<section class="cds-hero">
  <div class="hero-copy">
    <!-- Level 1: one hero heading — the only text-6xl/800 on the page -->
    <h1>Ship dashboards your team actually reads</h1>
    <!-- Level 2: lead paragraph — larger than body but lighter than the H1 -->
    <p class="lead">Cloud gives you calm, accessible UI out of the box.</p>
    <!-- Z exit point: primary first, ghost second — never two solid buttons -->
    <div class="hero-actions">
      <button class="cds-btn-primary">Get started</button>
      <button class="cds-btn-ghost">View demo</button>
    </div>
  </div>
  <!-- Heavy visual right, counterweighted by the text cluster left (asymmetrical balance) -->
  <img class="hero-visual" src="/product.png" alt="Product dashboard" />
</section>

<style>
.cds-hero {
  display: grid; grid-template-columns: 1fr;
  gap: var(--cds-space-8);
  padding-block: var(--cds-space-20);      /* 80px — isolation makes the hero the focal point */
  align-items: center;
}
@media (min-width: 1024px) { .cds-hero { grid-template-columns: 6fr 6fr; } }
.hero-copy { text-align: left; }           /* left-aligned even in a hero — copy is 3+ lines */
.hero-copy h1 {
  font-size: 60px; line-height: 66px; font-weight: 800;   /* text-6xl display */
  letter-spacing: -0.02em; color: var(--cds-text-primary);
  margin-block-end: var(--cds-space-4);
}
.lead {
  font-size: 18px; line-height: 28px;      /* text-lg — a full step below the H1's neighborhood */
  color: var(--cds-text-secondary);
  margin-block-end: var(--cds-space-8);    /* 32px — big gap promotes the CTA cluster */
}
.hero-actions { display: flex; gap: var(--cds-space-3); }
</style>
```

### Verifying hierarchy

- **Squint test.** Blur your eyes (or apply `filter: blur(4px) grayscale(1)` to the page). The focal point should still be obvious, groups should still be distinct, and nothing unimportant should pop. If the primary action vanishes when color is gone, the hierarchy was riding on color alone.
- **5-second test.** Show the screen to someone for 5 seconds, hide it, and ask: what was the page about, and what were you supposed to do? Wrong or hesitant answers mean the levels are misassigned — fix structure, not polish.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Give every view exactly one focal point: one H1 (text-5xl/700) and one solid sky-600 action | Don't place two solid primary buttons or two competing headlines — two focal points means the user picks randomly |
| Separate hierarchy levels by at least one full type-scale step (24px title over 16px body) | Don't set a 17px "subheading" over 16px body — a 1px difference reads as inconsistency, not hierarchy |
| Step weight with size: 400 body, 600 subheads, 700 headings | Don't bold entire paragraphs for emphasis — when everything is 600, nothing is |
| Use cloud-900 for primary text, cloud-600 for secondary, cloud-400 for large muted text only | Don't de-emphasize with cloud-400 body text on white — it fails AA at 2.56:1; use cloud-600 (7.58:1) instead |
| Spend sky-600 on the single most important action per view | Don't scatter sky-600 across links, icons, borders, and badges — the accent stops pointing anywhere |
| Isolate the hero CTA with space-16+ of surrounding whitespace | Don't crowd the primary button against neighbors at space-2 — a cramped CTA reads as a footnote |
| Left-align text blocks and share one left edge per column | Don't center a 4-line paragraph — the eye loses the line start on every return sweep |
| Keep one alignment axis per group (all-left card content, or all-centered empty state) | Don't mix a centered heading over left-aligned body in the same card — the broken edge reads as sloppy |
| Compose text-heavy pages for the F-pattern: strong left edge, front-loaded headings | Don't bury key words at line ends on scanning pages — F-pattern readers never reach them |
| Put the marketing hero CTA at the Z-pattern exit (after heading and visual) | Don't hide the hero CTA above the headline or in the nav only — it's off the scan path |
| Use symmetrical, centered-column balance for forms and dialogs | Don't build a checkout form as an off-balance asymmetric collage — instability reads as untrustworthy where money moves |
| Balance a hero asymmetrically: large light visual one side, compact heavy text + CTA cluster the other | Don't fill both hero halves with equally heavy blocks — matched weights deadlock and nothing leads |
| Let dashboards run denser on space-4/space-6 internals while sections keep space-12+ gaps | Don't fill every gap "to use the space" — the whitespace was framing the focal point |
| Run the grayscale squint test before review; fix structure if the focal point disappears | Don't rescue a flat layout by adding gradients, borders, and shadows — decoration on top of no hierarchy is still no hierarchy |

## Checklist

- [ ] The view has exactly one focal point: one H1, one solid sky-600 primary action
- [ ] Adjacent hierarchy levels differ by ≥ 1 type-scale step and/or a weight step (400/600/700)
- [ ] Text colors map to levels: cloud-900 primary, cloud-600 secondary, cloud-400 only for large/disabled text
- [ ] sky-600 appears on the #1 action and little else
- [ ] Whitespace scales with importance: space-2 within items, space-6 between items, space-16+ between sections
- [ ] Every element shares an edge with the grid or a neighbor; one alignment axis per group
- [ ] Text blocks are left-aligned; nothing over ~3 lines is centered
- [ ] The layout matches its scan pattern: F for text-heavy, Z for sparse hero pages
- [ ] Balance matches intent: symmetrical for forms/dialogs, asymmetrical for heroes
- [ ] The screen passes the grayscale squint test and a 5-second test

## Related

- [00 · Design principles](./00-design-principles.md)
- [01 · Color](./01-color.md)
- [02 · Typography](./02-typography.md)
- [03 · Spacing, layout & grid](./03-spacing-layout-grid.md)
- [09 · Buttons](./09-buttons.md)
- [12 · Cards & surfaces](./12-cards-surfaces.md)
