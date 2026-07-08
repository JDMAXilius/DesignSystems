# @maxilius/tokens

Source of truth for the Maxilius Design System. Tokens are authored in
[W3C DTCG format](https://design-tokens.github.io/community-group/format/) (`$value`/`$type`,
`{dot.path}` references) and compiled by a zero-dependency pipeline (`build.mjs`) — the source
stays interchangeable with Style Dictionary.

## Architecture: two tiers

1. **Primitives** (`src/primitives/`) — raw values: color ramps, type scale, spacing, radii,
   shadows, motion. Never consumed by components directly.
2. **Semantic** (`src/semantic/{light,dark}.json`) — roles: `bg.surface`, `text.primary`,
   `action.primary.bg`… Both themes define the *same paths* (the build enforces this), so dark
   mode is a token swap, not a component change.

Color strategy follows *Enhance UI* temperature theory: cool colors (blue/teal/gray) build the
framework and recede; warm colors (amber/vermillion) demand attention — CTAs and warnings.

## Outputs (`npm run build`)

| File | Contents |
| --- | --- |
| `dist/css/tokens.css` | `--mx-*` custom properties: `:root` (light), `[data-theme='dark']`, and a `prefers-color-scheme` fallback |
| `dist/js/tokens.mjs` | resolved token objects + `cssVar('action.primary.bg')` helper |
| `dist/json/tokens.json` | resolved values for tooling |
| `dist/figma/variables.json` | Figma Variables payload (Primitives collection + Semantic Light/Dark modes) |

## Usage

```css
@import '@maxilius/tokens/css';

.card {
  background: var(--mx-bg-surface);
  border: var(--mx-border-width-thin) solid var(--mx-border-default);
  border-radius: var(--mx-radius-lg);
}
```

Theme switching: set `data-theme="dark"` (or `"light"`) on `<html>`; with no attribute the
system preference applies.
