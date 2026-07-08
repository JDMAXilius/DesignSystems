# Maxilius Design System

A professional design system built code-first: design tokens, React components, and living
documentation. Grounded in the design principles from *Enhance UI — Design for Developers*
(Adrian Twarog & George Moller) — see [`reference/`](reference/).

## Packages

| Package | Description |
| --- | --- |
| [`@maxilius/tokens`](packages/tokens) | Design tokens (DTCG JSON) → CSS variables, TS constants, Figma variables |
| [`@maxilius/react`](packages/react) | React component library styled with token-driven CSS variables |
| [`@maxilius/docs`](apps/docs) | Storybook — token showcase, component docs, design principles |

## Design language

- **Color** — cool framework, warm action: blue primary `#2563EB`, teal secondary `#0D9488`,
  amber accent `#F59E0B`, vermillion danger `#DC2626`, cool-gray neutrals. Warm colors demand
  attention (CTAs, warnings); cool colors recede (surfaces, structure).
- **Typography** — Inter for UI, JetBrains Mono for code. Modular type scale.
- **Spacing** — 4px base unit.
- **Theming** — light & dark resolved through a two-tier token architecture:
  primitives → semantic roles. Components consume only semantic tokens (`--mx-*`).

## Getting started

```bash
npm install
npm run build        # tokens → react
npm run docs         # Storybook
```

## Architecture

```
packages/
  tokens/     # source of truth: primitives + semantic (light/dark)
  react/      # ~21 components consuming var(--mx-*)
apps/
  docs/       # Storybook (react-vite)
figma/        # code → Figma sync (variables + library)
reference/    # Enhance UI free preview PDF
```
