# 21 · Visual hierarchy — Maxilius Design System

> How to make a screen read in the right order using the levers Maxilius actually ships: size, weight, text color, temperature, space, and position.

## Principles

1. **One #1 per view.** Decide the single most important element before styling anything. If two things compete for first, the hierarchy has already failed.
2. **Temperature is the signature lever.** Cool colors (blue, teal, cool gray) recede and build the framework; warm colors (amber, vermillion) advance and demand attention. Spend warm color only on the #1 action — scarcity is what makes it work.
3. **De-emphasize the rest instead of shouting.** The cheapest way to make the primary element stand out is to quiet everything else: smaller sizes, `text-secondary`/`text-muted`, neutral and ghost buttons.
4. **Space is hierarchy.** Proximity groups; distance separates. What sits closest to a heading is read as belonging to it.
5. **It must survive grayscale.** Size, weight, and space should carry the reading order on their own; temperature is the finishing accent, not the crutch.

## The system

### Lever 1 — size (the type scale)

| Step | px | Hierarchy role |
|---|---|---|
| font-size-5xl | 48 | H1 / display — one per page |
| font-size-4xl | 36 | H2 — major sections |
| font-size-3xl | 30 | H3 |
| font-size-2xl | 24 | H4 |
| font-size-xl | 20 | H5 / card titles |
| font-size-lg | 18 | lead paragraphs |
| font-size-md | 16 | body default |
| font-size-sm | 14 | secondary text, controls |
| font-size-xs | 12 | captions, badges, eyebrows |

Skip steps deliberately (48 → 24 → 16 reads better than 48 → 36 → 30 → 24 all at once). Large headings take letter-spacing tight (−0.02em) and line-height tight (1.25).

### Lever 2 — weight (400–700)

| Weight | Token | Use |
|---|---|---|
| 700 bold | `--mx-font-weight-bold` | display headings, key numbers |
| 600 semibold | `--mx-font-weight-semibold` | headings, table headers |
| 500 medium | `--mx-font-weight-medium` | buttons, labels, emphasized inline text |
| 400 regular | `--mx-font-weight-regular` | body, secondary text |

Prefer weight over size for same-line emphasis: a 16px/600 label next to 16px/400 text keeps the baseline calm.

### Lever 3 — text color (three levels + link)

| Role | Light | Dark | Level |
|---|---|---|---|
| `--mx-text-primary` | gray-900 | gray-50 | headings, key body |
| `--mx-text-secondary` | gray-600 | gray-300 | supporting copy |
| `--mx-text-muted` | gray-400 | gray-500 | captions, placeholders, timestamps (large/placeholder text only — gray-400 on white fails 4.5:1 at body size) |
| `--mx-text-link` | blue-600 | blue-400 | inline actions |

Three levels are enough. If you need a fourth, cut content instead.

### Lever 4 — temperature (the Maxilius signature)

| Temperature | Colors | Behavior | Spend it on |
|---|---|---|---|
| Cool | gray ramp, blue `#2563EB`, teal `#0D9488` | recedes | surfaces, borders, structure, routine and secondary actions |
| Warm | amber `#F59E0B`, vermillion `#DC2626` | advances | the ONE accent CTA per view; warnings; destructive actions |

Practical rules: at most one warm (accent) button per view; danger red only on destructive actions; warm text (`text-warning`, `text-danger`) always paired with an icon or message, never color alone. A screen that is ~90% cool neutrals and structure, with cool blue/teal on standard actions and a single warm moment, reads instantly (60-30-10 proportion guidance defined by docs, not yet in code).

### Lever 5 — space and position

- Proximity: label ↔ helper gap `space-1` (4px); items in a group `space-2`–`space-4`; group ↔ group `space-6` (24px); section ↔ section ≥ `space-16` (64px desktop, `space-12` mobile).
- Position: top-left is read first (LTR); the primary action sits at the natural end of the reading path — bottom-right of a form or dialog footer, top-right of a page header.
- Negative space is emphasis: the more empty space around an element, the more important it reads. Don't fill it.

### Alignment and balance

- Pick one alignment edge per block and hold it; left-align text and form labels; right-align numeric table columns (`numeric` on Th/Td).
- Never center-align multi-line body text; center only short display headings and empty states.
- Symmetrical (centered) balance = formal, static: login pages, empty states, marketing heroes. Asymmetrical balance = dynamic, directional: dashboards and content pages, where a heavy left column of content is counterweighted by lighter, warmer accents on the right.

### The two tests

- **Squint test:** blur your eyes (or blur a screenshot 4-6px). The #1 element should still be findable — the warm accent and the largest type should survive; if everything melts into equal gray, hierarchy is missing.
- **5-second test:** show the screen to someone for 5 seconds. Ask what the page is about and what they'd click first. Wrong answers mean the levers point at the wrong element.

## Tokens

```css
/* The hierarchy levers, copy-paste ready */
--mx-font-size-5xl: 3rem;      --mx-font-size-4xl: 2.25rem;  --mx-font-size-2xl: 1.5rem;
--mx-font-size-md: 1rem;       --mx-font-size-sm: 0.875rem;  --mx-font-size-xs: 0.75rem;
--mx-font-weight-bold: 700;    --mx-font-weight-semibold: 600;
--mx-font-weight-medium: 500;  --mx-font-weight-regular: 400;
--mx-text-primary: #0F172A;    --mx-text-secondary: #475569;  --mx-text-muted: #94A3B8;
--mx-action-primary-bg: #2563EB;   /* cool — routine main action */
--mx-action-accent-bg: #F59E0B;    /* WARM — the one CTA that must pull the eye */
--mx-space-1: 0.25rem;  --mx-space-2: 0.5rem;  --mx-space-6: 1.5rem;  --mx-space-16: 4rem;
```

## Usage

### Worked example — a pricing card, annotated

```html
<article class="mx-card mx-card--raised plan">
  <p class="eyebrow">Most popular</p>                <!-- xs, caps, muted: level 4 -->
  <h3 class="plan__name">Pro</h3>                    <!-- 2xl / 600 / text-primary: level 2 -->
  <p class="plan__price">$24<span>/mo</span></p>     <!-- 5xl / 700: level 1 focal, still cool -->
  <p class="plan__blurb">Everything in Free, plus unlimited projects.</p> <!-- md / 400 / secondary -->
  <button class="mx-btn mx-btn--accent mx-btn--lg">Start free trial</button> <!-- the ONLY warm element -->
  <button class="mx-btn mx-btn--ghost">Compare plans</button>              <!-- cool, recedes -->
</article>
```

```css
.plan { padding: var(--mx-space-8); display: grid; gap: var(--mx-space-2); }
.eyebrow {
  font-size: var(--mx-font-size-xs); font-weight: var(--mx-font-weight-semibold);
  letter-spacing: var(--mx-font-letter-spacing-caps); text-transform: uppercase;
  color: var(--mx-text-muted);
}
.plan__name { font-size: var(--mx-font-size-2xl); font-weight: var(--mx-font-weight-semibold); }
.plan__price {
  font-size: var(--mx-font-size-5xl); font-weight: var(--mx-font-weight-bold);
  letter-spacing: var(--mx-font-letter-spacing-tight); line-height: var(--mx-font-line-height-tight);
}
.plan__price span { font-size: var(--mx-font-size-md); font-weight: 400; color: var(--mx-text-secondary); }
.plan__blurb { color: var(--mx-text-secondary); margin-bottom: var(--mx-space-4); } /* extra space isolates the CTA */
```

Why it works: size and weight make the price the focal point; everything stays cool until the single amber CTA, which advances off the cool card; the ghost button exists but recedes; the `space-4` gap before the CTA gives it negative space. Squint: you see a big number and one warm block.

### De-emphasizing a competing action

```html
<footer class="dialog__footer">
  <button class="mx-btn mx-btn--ghost">Cancel</button>       <!-- coolest, quietest -->
  <button class="mx-btn mx-btn--primary">Save changes</button> <!-- cool blue: routine main action -->
</footer>
```

Note: a routine save is **primary (cool blue)**, not accent — warm amber is reserved for the rare conversion-critical CTA.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Pick the single #1 element per view, then style everything else to recede | Don't give a screen two accent buttons — two warm CTAs cancel each other out |
| Use `mx-btn--accent` (amber) only for the one action that must pull the eye; use primary blue for routine main actions | Don't make every "Submit" amber — warm color spent everywhere buys attention nowhere |
| Skip type-scale steps between levels: 48px H1 → 24px H4 → 16px body | Don't use five adjacent sizes (48/36/30/24/20) on one screen — the levels blur together |
| Emphasize inline text with weight (16px/600) at the same size | Don't bump inline emphasis to a bigger font size — it wrecks the line rhythm |
| Hold three text-color levels: primary / secondary / muted | Don't invent grays between the levels — gray-500 body text on white is neither hierarchy nor accessible |
| Reserve `text-muted` (gray-400) for captions, placeholders, and large text | Don't set body-size paragraphs in gray-400 on white — it fails 4.5:1 contrast |
| Separate sections with ≥ space-16 and keep label↔helper at space-1 | Don't use uniform 16px gaps everywhere — even spacing means no grouping |
| Give the primary CTA breathing room (space-4+ of clear space) | Don't crowd the accent button against three neighbors — negative space is the emphasis |
| Demote competing actions to `mx-btn--neutral` or `mx-btn--ghost` | Don't fight one solid button with another solid button of a different color |
| Right-align numbers in tables (`numeric`), left-align text | Don't center-align table columns or multi-line body copy |
| Run the squint test and the 5-second test on every new screen | Don't rely on "it looks fine to me" — you already know where to look |
| Confirm the hierarchy in grayscale before adding the warm accent | Don't use color as the only difference between hierarchy levels |

## Checklist

- [ ] The #1 element per view is named, and it's the first thing the squint test finds.
- [ ] At most one warm (amber accent) action on screen; red only on destructive actions.
- [ ] No more than three type sizes and two weights above body level on this screen.
- [ ] Text colors limited to primary / secondary / muted (+ link); muted never on body-size text.
- [ ] Related items sit closer than unrelated ones; sections separated by ≥ space-16.
- [ ] One alignment edge per block; numbers right-aligned; body text never centered.
- [ ] Primary action sits at the end of the reading path with clear space around it.
- [ ] Hierarchy survives grayscale; temperature is the accent, not the skeleton.
- [ ] A 5-second test names the page's purpose and first click correctly.

## Related

- [00 · Design principles](./00-design-principles.md) — "hierarchy before decoration" and the temperature master principle
- [19 · Theming and dark mode](./19-theming-dark-mode.md) — the same levers must read on gray-950
- [22 · Design process](./22-design-process.md) — where hierarchy fits in the blank-page-to-shipped workflow
