# 18 · Design tokens — Maxilius Design System

> Every color, size, and duration in Maxilius is a named token: authored once as DTCG JSON in `@maxilius/tokens`, compiled to CSS, TypeScript, JSON, and Figma variables, and consumed only through semantic roles.

## Principles

1. **One source, many outputs.** Tokens are authored in W3C DTCG JSON under `packages/tokens/src`. The build (`build.mjs`) emits CSS custom properties, a TypeScript module, resolved JSON, and a Figma Variables payload — nobody hand-maintains four copies of blue-600.
2. **Two tiers, one direction.** Primitives (raw ramps and scales) feed semantic roles (`bg.*`, `text.*`, `action.*`…). Components consume **only** semantic tokens. References flow primitive → semantic, never the other way and never semantic → semantic chains you can't trace.
3. **Name the job, not the value.** `--mx-action-primary-bg` says what a token is *for*; `--mx-blue` would only say what it looks like today. Role names survive rebrands; appearance names do not.
4. **Dark parity is build-enforced.** `semantic/light.json` and `semantic/dark.json` must define identical paths — the build fails otherwise. That guarantee is why dark mode is a token swap, not a component change.
5. **Generated files are never edited.** Everything in `dist/` carries a "generated — do not edit" banner. Fix the source JSON and rebuild; a hand-edit to `tokens.css` is lost on the next build.

## The system

### Source of truth

| Path | Contents |
|---|---|
| `packages/tokens/src/primitives/color.json` | Six ramps (gray, blue, teal, amber, red, green) + white/black |
| `packages/tokens/src/primitives/typography.json` | Inter/JetBrains Mono stacks, 9-step size scale, weights, line-heights, letter-spacing |
| `packages/tokens/src/primitives/dimension.json` | Space (13 steps), radius, border widths, control/icon sizes, z-index ladder |
| `packages/tokens/src/primitives/effects.json` | Four shadows, three durations, three easings |
| `packages/tokens/src/semantic/light.json` | Every semantic role, resolved for light mode |
| `packages/tokens/src/semantic/dark.json` | The **same paths**, resolved for dark mode |

### Authoring format (DTCG)

Tokens use `$value`/`$type` and `{dot.path}` references, so the source stays interchangeable with Style Dictionary. A semantic role never contains a hex — it references a primitive:

```css
/* src/semantic/light.json (concept, rendered as it compiles):
   "action": { "primary": { "bg": { "$value": "{color.blue.600}", "$type": "color" } } }   */
--mx-action-primary-bg: var(--mx-color-blue-600); /* → #2563EB */
```

### Naming grammar

The build joins the JSON path with hyphens under the `--mx-` prefix: `--mx-{category}-{path…}`.

| Tier | Pattern | Examples |
|---|---|---|
| Primitive | `--mx-{category}-{scale}-{step}` | `--mx-color-blue-600`, `--mx-space-6`, `--mx-font-size-2xl`, `--mx-radius-lg`, `--mx-shadow-md`, `--mx-motion-duration-fast`, `--mx-z-modal` |
| Semantic | `--mx-{group}-{role}[-part][-state]` | `--mx-bg-surface-raised`, `--mx-text-secondary`, `--mx-border-default`, `--mx-action-primary-bg-hover`, `--mx-feedback-danger-icon`, `--mx-focus-ring` |

Semantic groups: `bg`, `text`, `border`, `action`, `feedback`, `focus`. States are suffixes (`-hover`, `-active`), subtle/tint pairs are `-subtle-bg` / `-subtle-text`.

### The two-tier rule

| Layer | May reference | Consumed by |
|---|---|---|
| Primitives (`--mx-color-blue-600`…) | Nothing (raw values) | Semantic layer only — **never component CSS** |
| Semantic (`--mx-action-primary-bg`…) | Primitives via `{color.blue.600}` refs | Components, product CSS, docs examples |

If a component hardcodes `#2563EB` or reaches for `--mx-color-blue-600`, dark mode stops following it — only semantic roles are re-pointed per theme.

### Build outputs (`npm run build` in `packages/tokens`)

| File | Contents |
|---|---|
| `dist/css/tokens.css` | All `--mx-*` custom properties: `:root` (primitives + light), `[data-theme='dark']` override, plus a `prefers-color-scheme: dark` fallback for `:root:not([data-theme='light'])` — and `color-scheme` set per theme |
| `dist/js/tokens.mjs` + `.d.ts` | Resolved token objects (`tokens.primitives`, `tokens.semantic.light/dark`) and the `cssVar('action.primary.bg')` helper |
| `dist/json/tokens.json` | Fully resolved values for tooling (Sass maps, Tailwind config, lint rules) |
| `dist/figma/variables.json` | Figma Variables payload: a Primitives collection plus a Semantic collection with Light/Dark modes, aliases preserved |

The pipeline is zero-dependency Node. It resolves reference chains (max depth 10, cycles throw), then runs the parity check: light and dark semantic paths are joined and compared — any divergence aborts the build with `semantic/light.json and semantic/dark.json paths diverge`. You cannot ship a role that exists in one theme only.

### Token governance

- **Adding:** propose per [20 · Governance](./20-governance.md) — new role or primitive step is a **minor** release; add it to *both* semantic files (the build forces this), document it in the same PR.
- **Changing a value:** same role, new hex is a minor with a changelog line naming the role path — unless it breaks a documented guarantee (contrast floor, control height), which makes it a major.
- **Deprecating:** renames/removals are **major**; keep an alias (old name → new role) emitted in `tokens.css` plus a dev-build warning for at least one full major before removal.

## Tokens

Not using React or the npm package? Paste this starter block — the key real values, semantic names, light mode — and you're on the system. (For the full set including all ramps, dark values, and the OS-preference fallback, import `@maxilius/tokens/css` instead.)

```css
:root {
  color-scheme: light;
  /* type */
  --mx-font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --mx-font-family-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --mx-font-size-xs: 0.75rem;   --mx-font-size-sm: 0.875rem;  --mx-font-size-md: 1rem;
  --mx-font-size-lg: 1.125rem;  --mx-font-size-xl: 1.25rem;   --mx-font-size-2xl: 1.5rem;
  --mx-font-size-3xl: 1.875rem; --mx-font-size-4xl: 2.25rem;  --mx-font-size-5xl: 3rem;
  --mx-font-weight-regular: 400; --mx-font-weight-medium: 500;
  --mx-font-weight-semibold: 600; --mx-font-weight-bold: 700;
  --mx-font-line-height-tight: 1.25; --mx-font-line-height-normal: 1.5;
  /* space — 4px base */
  --mx-space-1: 0.25rem; --mx-space-2: 0.5rem;  --mx-space-3: 0.75rem; --mx-space-4: 1rem;
  --mx-space-6: 1.5rem;  --mx-space-8: 2rem;    --mx-space-12: 3rem;   --mx-space-16: 4rem;
  /* shape */
  --mx-radius-sm: 0.25rem; --mx-radius-md: 0.5rem; --mx-radius-lg: 0.75rem;
  --mx-radius-xl: 1rem;    --mx-radius-full: 9999px;
  --mx-border-width-thin: 1px; --mx-border-width-thick: 2px;
  /* elevation */
  --mx-shadow-sm: 0 1px 2px 0 rgb(2 6 23 / 0.06);
  --mx-shadow-md: 0 2px 4px -1px rgb(2 6 23 / 0.08), 0 4px 8px -2px rgb(2 6 23 / 0.06);
  --mx-shadow-lg: 0 4px 8px -2px rgb(2 6 23 / 0.1), 0 12px 24px -4px rgb(2 6 23 / 0.08);
  --mx-shadow-xl: 0 8px 16px -4px rgb(2 6 23 / 0.12), 0 24px 48px -8px rgb(2 6 23 / 0.14);
  /* motion */
  --mx-motion-duration-fast: 120ms; --mx-motion-duration-base: 200ms; --mx-motion-duration-slow: 320ms;
  --mx-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
  --mx-motion-easing-enter: cubic-bezier(0, 0, 0.2, 1);
  --mx-motion-easing-exit: cubic-bezier(0.4, 0, 1, 1);
  /* z-index ladder */
  --mx-z-dropdown: 1000; --mx-z-sticky: 1100; --mx-z-overlay: 1300;
  --mx-z-modal: 1400;    --mx-z-toast: 1500;  --mx-z-tooltip: 1600;
  /* color roles — light */
  --mx-bg-canvas: #F8FAFC;  --mx-bg-surface: #FFFFFF;
  --mx-bg-surface-raised: #FFFFFF; --mx-bg-surface-sunken: #F1F5F9;
  --mx-bg-overlay: rgb(2 6 23 / 0.55);
  --mx-text-primary: #0F172A; --mx-text-secondary: #475569; --mx-text-muted: #94A3B8;
  --mx-text-on-action: #FFFFFF; --mx-text-link: #2563EB;
  --mx-border-subtle: #F1F5F9; --mx-border-default: #E2E8F0; --mx-border-strong: #CBD5E1;
  --mx-border-focus: #3B82F6;  --mx-focus-ring: #3B82F6;
  --mx-action-primary-bg: #2563EB;  --mx-action-primary-bg-hover: #1D4ED8;
  --mx-action-primary-bg-active: #1E40AF; --mx-action-primary-text: #FFFFFF;
  --mx-action-secondary-bg: #0D9488; --mx-action-secondary-bg-hover: #0F766E;
  --mx-action-accent-bg: #F59E0B;   --mx-action-accent-bg-hover: #D97706;
  --mx-action-accent-text: #0F172A; /* dark text on warm amber — always */
  --mx-action-danger-bg: #DC2626;   --mx-action-danger-bg-hover: #B91C1C;
  --mx-action-disabled-bg: #F1F5F9; --mx-action-disabled-text: #94A3B8;
  --mx-feedback-danger-bg: #FEF2F2; --mx-feedback-danger-border: #FECACA;
  --mx-feedback-danger-text: #B91C1C; --mx-feedback-danger-icon: #DC2626;
}
[data-theme='dark'] {
  color-scheme: dark;
  --mx-bg-canvas: #020617; --mx-bg-surface: #0F172A; --mx-bg-surface-raised: #1E293B;
  --mx-text-primary: #F8FAFC; --mx-text-secondary: #CBD5E1; --mx-text-link: #60A5FA;
  --mx-border-default: #334155; --mx-focus-ring: #60A5FA;
  --mx-action-primary-bg-hover: #3B82F6; /* dark hovers lighten — see doc 19 */
}
```

## Usage

Build and consume the real package:

```css
/* 1. cd packages/tokens && npm run build
   ✓ tokens built: N primitives, N semantic × 2 themes
   2. Import the generated CSS once, at the app root: */
@import '@maxilius/tokens/css';

.card {
  background: var(--mx-bg-surface);
  border: var(--mx-border-width-thin) solid var(--mx-border-default);
  border-radius: var(--mx-radius-lg);
  padding: var(--mx-space-6);
  box-shadow: var(--mx-shadow-sm);
  transition: box-shadow var(--mx-motion-duration-base) var(--mx-motion-easing-standard);
}
```

Theme switching is one attribute — `<html data-theme="dark">` (or `"light"`); with no attribute the OS preference applies via the built-in fallback:

```html
<html data-theme="dark">
  <body>
    <!-- every --mx-* role now resolves to its dark value; no component changes -->
    <button class="mx-btn mx-btn--primary">Save changes</button>
  </body>
</html>
```

In JS/TS, use the generated module instead of duplicating values:

```css
/* import { tokens, cssVar } from '@maxilius/tokens';
   tokens.semantic.light.action.primary.bg   → '#2563EB'  (resolved value — tooling only)
   cssVar('action.primary.bg')               → 'var(--mx-action-primary-bg)'  (use this in styles) */
.chart-accent { color: var(--mx-action-primary-bg); }
```

**Porting to other stacks** — always generate from `dist/json/tokens.json`, never retype hexes:

- **Sass:** map the JSON into `$mx-*` variables at build time, or simpler, keep emitting CSS custom properties and reference them from Sass (`border-radius: var(--mx-radius-md)`).
- **Tailwind:** point theme values at the variables — `colors: { 'action-primary': 'var(--mx-action-primary-bg)' }`, `spacing` from the space scale — so dark mode still works via `data-theme`.
- **Figma:** import `dist/figma/variables.json`; designers get the same Primitives collection and a Semantic collection with Light/Dark modes, aliased exactly like the code.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Style components with semantic roles: `background: var(--mx-action-primary-bg)` | Don't reference primitives in component CSS (`var(--mx-color-blue-600)`) — dark mode won't re-point it |
| Edit `src/**/*.json` and run `npm run build` to change a value | Don't hand-edit `dist/css/tokens.css` — the next build silently erases your fix |
| Add a new role to `semantic/light.json` **and** `semantic/dark.json` in one PR | Don't add it to light only — the parity check fails the build, and stubbing dark with a placeholder ships a broken theme |
| Reference primitives from semantic files as `{color.teal.600}` DTCG refs | Don't paste raw hexes into semantic JSON — the CSS loses its `var()` chain and Figma loses the alias |
| Name new tokens by job: `--mx-feedback-warning-icon` | Don't name by appearance (`--mx-orange-icon`) — the name breaks the moment the value changes |
| Use `cssVar('action.primary.bg')` (or the custom property) in JS-driven styles | Don't copy `tokens.semantic.light.*` resolved hexes into runtime styles — they're light-mode-only snapshots |
| Generate Sass/Tailwind config from `dist/json/tokens.json` in your build | Don't maintain a hand-copied Tailwind palette that drifts from the source on the next release |
| Set spacing/size in tokens' rem values (`--mx-space-4` = 1rem) | Don't convert tokens to fixed px in your CSS — you break user font-size scaling |
| Ship token changes with semver per doc 20 (new role = minor, rename = major + alias) | Don't rename `--mx-text-muted` in a patch because "it's just CSS" |
| Pin exact hexes only in brand collateral ([23 · Brand and logo](./23-brand-logo.md)) | Don't pin hexes in product UI "for safety" — you've opted out of theming and future fixes |

## Checklist

- [ ] Every value in component/product CSS is a semantic `--mx-*` token — no raw hexes, no primitives
- [ ] New or changed tokens were edited in `packages/tokens/src`, then `npm run build` ran clean
- [ ] Any new semantic role exists in both `light.json` and `dark.json` (build passes the parity check)
- [ ] New token names follow the grammar: category/group first, role, then `-hover`/`-active` state suffixes
- [ ] Semantic values are `{dot.path}` references to primitives, not pasted hexes
- [ ] Downstream configs (Sass, Tailwind, Figma) regenerate from `dist/` outputs, not by hand
- [ ] Renames/removals ship with an alias and a major bump; additions as minors — changelog names the role path
- [ ] Screen verified in `data-theme="light"`, `data-theme="dark"`, and with no attribute (OS preference)

## Related

- [01 · Color](./01-color.md) — the ramps and semantic color roles these tokens encode
- [19 · Theming and dark mode](./19-theming-dark-mode.md) — how the identical-paths guarantee becomes free dark mode
- [20 · Governance](./20-governance.md) — semver, deprecation, and the docs-move-with-code rule
- [03 · Spacing, layout, and grid](./03-spacing-layout-grid.md) — the dimension tokens in practice
