# 02 · Typography — Cloud Design System
> One typeface, one scale, and the rules that keep every page readable and calm.

## Principles

1. **Readability first.** 16px body, generous line height, 45–75ch measure — comfort before style.
2. **One scale, no freelancing.** Every size on screen comes from the named scale (major third, ≈1.25 ratio).
3. **Hierarchy through size and weight.** Levels are unmistakable without color or decoration.
4. **Fewer weights, clearer meaning.** Five weights, each with a defined job; extrabold is display-only.
5. **Type breathes like everything else.** Airy line height and letter-spacing tuned per size, not one global value.

## The system

### Fonts

| Role | Family | Fallback stack |
|---|---|---|
| UI & headings | Plus Jakarta Sans | system-ui, -apple-system, "Segoe UI", sans-serif |
| Code & mono | IBM Plex Mono | ui-monospace, "SF Mono", monospace |

Google Fonts import (load only the weights you use):

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

### Type scale — base 16px, ratio ≈ 1.25 (major third)

| Token | Size | Line-height | Weight | Use |
|---|---|---|---|---|
| text-xs | 12px | 16px (1.33) | 400/500 | captions, badges |
| text-sm | 14px | 20px (1.43) | 400/500 | secondary text, table cells |
| text-md | 16px | 24px (1.5) | 400 | body (default) |
| text-lg | 18px | 28px | 400/600 | lead paragraphs |
| text-xl | 20px | 28px | 600 | H5 / card titles |
| text-2xl | 24px | 32px | 600 | H4 |
| text-3xl | 30px | 38px | 700 | H3 |
| text-4xl | 36px | 44px | 700 | H2 |
| text-5xl | 48px | 56px (1.15) | 700 | H1 |
| text-6xl | 60px | 66px | 800 | hero display |

### Weights

| Weight | Name | Job |
|---|---|---|
| 400 | regular | body text, captions, table cells |
| 500 | medium | labels, emphasized inline text, nav items |
| 600 | semibold | buttons, card titles, H4–H5 |
| 700 | bold | H1–H3 |
| 800 | extrabold | hero display (text-6xl) only |

Never fake weights with `font-weight` values the font doesn't ship (e.g. 300) — load 400–800 and stay inside them.

### Heading hierarchy mapping

| Heading | Token | Size / line-height / weight |
|---|---|---|
| H1 | text-5xl | 48px / 56px / 700 |
| H2 | text-4xl | 36px / 44px / 700 |
| H3 | text-3xl | 30px / 38px / 700 |
| H4 | text-2xl | 24px / 32px / 600 |
| H5 | text-xl | 20px / 28px / 600 |
| H6 | text-lg | 18px / 28px / 600 |

One H1 per page. Never skip levels for looks — if H3 looks too big under your H2, the fix is layout spacing, not jumping to H5.

### Line length and line height

- Body measure: 45–75 characters, **66ch ideal**. Cap prose containers with `max-width: 66ch`.
- Body line height 1.5 (24px at 16px). Headings tighten as they grow: text-5xl sits at 1.15.
- Never set body text below 16px for primary reading content; 14px (text-sm) is for supporting text.

### Letter-spacing

| Context | Tracking |
|---|---|
| Headings ≥ 30px (text-3xl and up) | -0.02em |
| Body and UI text (12–24px) | 0 (default) |
| ALL-CAPS labels (eyebrow labels only) | +0.02em |

ALL CAPS is allowed only for tiny eyebrow labels — everything else is sentence case.

### Responsive type

Headings step down one scale stop on mobile (< 768px); body never shrinks.

| Element | Desktop (≥ 768px) | Mobile (< 768px) |
|---|---|---|
| Hero display | 60px (text-6xl) | 48px (text-5xl) |
| H1 | 48px (text-5xl) | 36px (text-4xl) |
| H2 | 36px (text-4xl) | 30px (text-3xl) |
| H3 | 30px (text-3xl) | 24px (text-2xl) |
| H4 and below | unchanged | unchanged |
| Body | 16px | 16px |

## Tokens

```css
:root {
  /* Families */
  --cds-font-sans: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --cds-font-mono: "IBM Plex Mono", ui-monospace, "SF Mono", monospace;

  /* Sizes */
  --cds-text-xs: 12px;
  --cds-text-sm: 14px;
  --cds-text-md: 16px;
  --cds-text-lg: 18px;
  --cds-text-xl: 20px;
  --cds-text-2xl: 24px;
  --cds-text-3xl: 30px;
  --cds-text-4xl: 36px;
  --cds-text-5xl: 48px;
  --cds-text-6xl: 60px;

  /* Line heights (paired to sizes) */
  --cds-leading-xs: 16px;
  --cds-leading-sm: 20px;
  --cds-leading-md: 24px;
  --cds-leading-lg: 28px;
  --cds-leading-xl: 28px;
  --cds-leading-2xl: 32px;
  --cds-leading-3xl: 38px;
  --cds-leading-4xl: 44px;
  --cds-leading-5xl: 56px;
  --cds-leading-6xl: 66px;

  /* Weights */
  --cds-weight-regular: 400;
  --cds-weight-medium: 500;
  --cds-weight-semibold: 600;
  --cds-weight-bold: 700;
  --cds-weight-extrabold: 800;

  /* Tracking */
  --cds-tracking-tight: -0.02em;  /* headings >= 30px */
  --cds-tracking-normal: 0;
  --cds-tracking-caps: 0.02em;    /* ALL-CAPS eyebrow labels */

  /* Measure */
  --cds-measure-body: 66ch;
}
```

## Usage

Base document setup with responsive H1:

```css
body {
  font-family: var(--cds-font-sans);
  font-size: var(--cds-text-md);        /* 16px */
  line-height: var(--cds-leading-md);   /* 24px */
  font-weight: var(--cds-weight-regular);
  color: var(--cds-color-text-primary);
}

h1 {
  font-size: var(--cds-text-4xl);       /* 36px mobile-first */
  line-height: var(--cds-leading-4xl);
  font-weight: var(--cds-weight-bold);
  letter-spacing: var(--cds-tracking-tight);
}
@media (min-width: 768px) {
  h1 {
    font-size: var(--cds-text-5xl);     /* 48px on desktop */
    line-height: var(--cds-leading-5xl);
  }
}
```

Article prose with ideal measure and an eyebrow label:

```html
<article class="cds-prose">
  <p class="cds-eyebrow">Release notes</p>
  <h2>What changed in June</h2>
  <p>Body copy stays at 16px with a 24px line height, capped at 66 characters
  per line so long reads stay comfortable.</p>
  <pre><code>npm install @cds/tokens</code></pre>
</article>

<style>
.cds-prose { max-width: var(--cds-measure-body); }
.cds-prose code { font-family: var(--cds-font-mono); font-size: var(--cds-text-sm); }
.cds-eyebrow {
  font-size: var(--cds-text-xs);
  font-weight: var(--cds-weight-medium);
  letter-spacing: var(--cds-tracking-caps);
  text-transform: uppercase;
  color: var(--cds-color-text-secondary);
}
</style>
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use 16px (text-md) at line-height 24px for all primary body copy | Don't set body text at 14px to fit more content — text-sm is for secondary text like table cells |
| Cap prose at `max-width: 66ch` (45–75ch acceptable) | Don't let paragraphs run the full 1280px container — 150-character lines are exhausting to track |
| Map H1→text-5xl, H2→text-4xl, H3→text-3xl and keep semantic order | Don't pick an H4 element because you want 24px — style the correct heading level with the right token instead |
| Apply -0.02em tracking to headings ≥ 30px | Don't apply negative tracking to 12–14px text — small sizes need default spacing to stay legible |
| Step H1 from 48px down to 36px below 768px | Don't ship a 48px H1 on a 375px phone — it wraps into a wall and pushes content off-screen |
| Use weight 600 for buttons and card titles, 700 for H1–H3 | Don't bold entire paragraphs for emphasis — reserve weight shifts for true hierarchy, use 500 for inline emphasis |
| Reserve weight 800 for text-6xl hero display | Don't use extrabold on body sizes — at 16px it reads as smudged, not strong |
| Use IBM Plex Mono for code, keys, and tabular identifiers | Don't render code in Plus Jakarta Sans — proportional digits and letters break alignment and scannability |
| Use +0.02em ALL-CAPS only for tiny eyebrow labels (text-xs) | Don't set headings or buttons in ALL CAPS — CDS is sentence case everywhere else |
| Load only weights 400–800 via the Google Fonts snippet with `display=swap` | Don't import all nine weights "just in case" — unused weights cost hundreds of KB and delay first paint |

## Checklist

- [ ] Every font size on the page is a named token from the scale — no 15px or 22px one-offs
- [ ] Body text is 16px/24px; nothing below 12px anywhere
- [ ] Prose containers cap at 66ch (45–75ch range)
- [ ] Exactly one H1; heading levels are sequential and match the token mapping
- [ ] Headings ≥ 30px use -0.02em tracking; caps labels use +0.02em
- [ ] H1–H3 step down one scale stop below 768px; body stays 16px
- [ ] Only weights 400/500/600/700/800 in use, each in its defined role
- [ ] Code and numeric identifiers use IBM Plex Mono
- [ ] All labels and headings are sentence case (eyebrow labels excepted)

## Related

- [00 · Design principles](./00-design-principles.md)
- [01 · Color](./01-color.md)
- [03 · Spacing, layout & grid](./03-spacing-layout-grid.md)
