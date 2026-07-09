# 02 · Typography — Maxilius Design System

> Inter for UI, JetBrains Mono for code, and a nine-step rem scale that carries hierarchy so color doesn't have to.

## Principles

1. **Hierarchy before decoration.** Size, weight, and spacing establish what matters; if the
   heading structure doesn't read in grayscale, no color will fix it.
2. **One UI face, one code face.** Inter for everything interface; JetBrains Mono for code,
   tokens, and tabular technical values. No third typeface, ever.
3. **Rem-based and token-driven.** The whole scale is rem (1rem = 16px) so user font-size
   preferences scale the entire product; every value is a `--mx-font-*` token.
4. **Readable measure.** Body text runs 45–75 characters per line (defined by docs, not yet in code).
5. **Sentence case everywhere.** Buttons, titles, labels — never Title Case or ALL CAPS, except
   tiny eyebrow labels set at `letter-spacing-caps`.

## The system

### Typefaces

| Role | Family | Stack token |
|---|---|---|
| UI | **Inter** | `--mx-font-family-sans`: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| Code | **JetBrains Mono** | `--mx-font-family-mono`: `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace` |

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

Load only the weights the system uses (400/500/600/700 for Inter) — extra weights cost bytes
and invite off-system styling.

### Type scale (1rem = 16px)

| Token | Value | px | Line-height | Weight | Suggested use |
|---|---|---|---|---|---|
| `--mx-font-size-xs` | 0.75rem | 12 | normal 1.5 | medium 500 | captions, badges, eyebrow labels |
| `--mx-font-size-sm` | 0.875rem | 14 | normal 1.5 | regular 400 | secondary text; controls (sm/md buttons & inputs, tight 1.25) |
| `--mx-font-size-md` | 1rem | 16 | normal 1.5 | regular 400 | body default; lg controls |
| `--mx-font-size-lg` | 1.125rem | 18 | relaxed 1.625 | regular 400 | lead paragraphs |
| `--mx-font-size-xl` | 1.25rem | 20 | snug 1.375 | semibold 600 | H5 / card titles |
| `--mx-font-size-2xl` | 1.5rem | 24 | snug 1.375 | semibold 600 | H4 |
| `--mx-font-size-3xl` | 1.875rem | 30 | tight 1.25 | semibold 600 | H3 |
| `--mx-font-size-4xl` | 2.25rem | 36 | tight 1.25 | bold 700 | H2 |
| `--mx-font-size-5xl` | 3rem | 48 | tight 1.25 | bold 700 | H1 / display |

### Weights and line-heights

| Weight token | Value | Line-height token | Value |
|---|---|---|---|
| `--mx-font-weight-regular` | 400 | `--mx-font-line-height-tight` | 1.25 |
| `--mx-font-weight-medium` | 500 | `--mx-font-line-height-snug` | 1.375 |
| `--mx-font-weight-semibold` | 600 | `--mx-font-line-height-normal` | 1.5 |
| `--mx-font-weight-bold` | 700 | `--mx-font-line-height-relaxed` | 1.625 |

Body uses normal (1.5); controls (buttons, inputs) use tight (1.25); buttons use weight
medium (500).

### Letter-spacing

| Token | Value | Use |
|---|---|---|
| `--mx-font-letter-spacing-tight` | −0.02em | large headings (3xl–5xl) |
| `--mx-font-letter-spacing-normal` | 0 | body, controls, small headings |
| `--mx-font-letter-spacing-wide` | 0.04em | small emphasized labels |
| `--mx-font-letter-spacing-caps` | 0.08em | ALL-CAPS eyebrow labels (the only ALL-CAPS allowed) |

### Heading hierarchy mapping

| Element | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| H1 / display | 5xl · 3rem | bold 700 | tight 1.25 | tight −0.02em |
| H2 | 4xl · 2.25rem | bold 700 | tight 1.25 | tight −0.02em |
| H3 | 3xl · 1.875rem | semibold 600 | tight 1.25 | tight −0.02em |
| H4 | 2xl · 1.5rem | semibold 600 | snug 1.375 | normal |
| H5 / card title | xl · 1.25rem | semibold 600 | snug 1.375 | normal |
| H6 / eyebrow | xs · 0.75rem CAPS | semibold 600 | normal 1.5 | caps 0.08em |

### Measure and responsive stepping

- Body line length: **45–75ch** (defined by docs, not yet in code). `max-width: 65ch` is a good
  default for prose containers.
- Responsive stepping: below the md breakpoint (768px — breakpoints defined by docs, not yet in
  code), step display sizes down one token: H1 5xl→4xl, H2 4xl→3xl, H3 3xl→2xl. Body (md),
  controls, and captions never shrink below their tokens.

## Tokens

```css
:root {
  --mx-font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --mx-font-family-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  --mx-font-size-xs: 0.75rem;    /* 12px */
  --mx-font-size-sm: 0.875rem;   /* 14px */
  --mx-font-size-md: 1rem;       /* 16px */
  --mx-font-size-lg: 1.125rem;   /* 18px */
  --mx-font-size-xl: 1.25rem;    /* 20px */
  --mx-font-size-2xl: 1.5rem;    /* 24px */
  --mx-font-size-3xl: 1.875rem;  /* 30px */
  --mx-font-size-4xl: 2.25rem;   /* 36px */
  --mx-font-size-5xl: 3rem;      /* 48px */

  --mx-font-weight-regular: 400;
  --mx-font-weight-medium: 500;
  --mx-font-weight-semibold: 600;
  --mx-font-weight-bold: 700;

  --mx-font-line-height-tight: 1.25;
  --mx-font-line-height-snug: 1.375;
  --mx-font-line-height-normal: 1.5;
  --mx-font-line-height-relaxed: 1.625;

  --mx-font-letter-spacing-tight: -0.02em;
  --mx-font-letter-spacing-normal: 0;
  --mx-font-letter-spacing-wide: 0.04em;
  --mx-font-letter-spacing-caps: 0.08em;
}
```

## Usage

An article header with eyebrow, display heading, and lead paragraph:

```html
<header class="article-header">
  <p class="eyebrow">Release notes</p>
  <h1>Maxilius 2.0 is here</h1>
  <p class="lead">A calmer framework, a sharper accent, and dark mode that just works.</p>
</header>
```

```css
.article-header h1 {
  font-family: var(--mx-font-family-sans);
  font-size: var(--mx-font-size-5xl);
  font-weight: var(--mx-font-weight-bold);
  line-height: var(--mx-font-line-height-tight);
  letter-spacing: var(--mx-font-letter-spacing-tight);
  color: var(--mx-color-text-primary);
}
.eyebrow {
  font-size: var(--mx-font-size-xs);
  font-weight: var(--mx-font-weight-semibold);
  letter-spacing: var(--mx-font-letter-spacing-caps);
  text-transform: uppercase;
  color: var(--mx-color-text-secondary);
}
.lead {
  font-size: var(--mx-font-size-lg);
  line-height: var(--mx-font-line-height-relaxed);
  color: var(--mx-color-text-secondary);
  max-width: 65ch; /* keep the 45–75ch measure */
}
```

Body defaults plus inline code, with responsive heading stepping:

```css
body {
  font-family: var(--mx-font-family-sans);
  font-size: var(--mx-font-size-md);
  line-height: var(--mx-font-line-height-normal);
}
code, pre {
  font-family: var(--mx-font-family-mono);
  font-size: var(--mx-font-size-sm);
}
@media (max-width: 767px) {
  h1 { font-size: var(--mx-font-size-4xl); } /* 5xl → 4xl below md */
  h2 { font-size: var(--mx-font-size-3xl); }
  h3 { font-size: var(--mx-font-size-2xl); }
}
```

`@maxilius/react` components already apply these tokens — Button ships sm/sm/md text at weight
medium with tight line-height; you only style your own content.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use Inter for all UI text and JetBrains Mono for all code | Don't introduce a third typeface, or set headings in the mono face for style |
| Set body at `font-size-md` (1rem) with line-height normal (1.5) | Don't set body copy at xs/sm to "fit more in" — 14px is for secondary text only |
| Use tight (1.25) line-height and −0.02em tracking on 3xl–5xl headings | Don't leave 1.5 line-height on a 48px display heading — it gaps apart |
| Keep prose containers at `max-width: 65ch` (within 45–75ch) | Don't let paragraphs run full-width at 120+ characters per line |
| Step H1 down 5xl→4xl (and H2, H3 one step) below 768px | Don't serve a 3rem H1 on a 360px phone screen |
| Reserve ALL CAPS for xs eyebrow labels at `letter-spacing-caps` (0.08em) | Don't set headings or buttons in ALL CAPS or Title Case — sentence case everywhere |
| Use weight medium (500) for buttons and semibold (600) for card titles | Don't fake hierarchy with bold body spans instead of proper heading levels |
| Skip visual sizes if needed, but keep heading levels in document order (H2 after H1) | Don't jump from H1 to H4 in the markup to get a smaller look — map the size, keep the level |
| Use rem tokens so user font-size settings scale everything | Don't hardcode px font sizes — they ignore user preferences |
| Add negative tracking only at 3xl and above | Don't apply −0.02em to 14px text — small sizes need normal (0) tracking |

## Checklist

- [ ] Only Inter (UI) and JetBrains Mono (code) appear in the page
- [ ] Google Fonts import loads only weights 400/500/600/700
- [ ] All sizes/weights/line-heights come from `--mx-font-*` tokens (no raw px)
- [ ] Body is md/1.5; controls are tight (1.25); buttons weight 500
- [ ] Headings follow the H1–H6 mapping with correct tracking
- [ ] Prose measure stays within 45–75ch
- [ ] Display sizes step down one token below the md breakpoint
- [ ] Sentence case everywhere; ALL CAPS only on caps-tracked eyebrows
- [ ] Heading levels are semantic and sequential in the markup
- [ ] Text colors use `--mx-color-text-*` roles and pass contrast

## Related

- [00 · Design principles](./00-design-principles.md) — hierarchy before decoration
- [01 · Color](./01-color.md) — text color roles and contrast floors
- [03 · Spacing, layout, and grid](./03-spacing-layout-grid.md) — spacing that groups the type
