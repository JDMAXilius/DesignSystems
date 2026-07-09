# Design Systems

This repository hosts **three independent design systems**:

| System | Where | What it is |
| --- | --- | --- |
| ☁️ **Cloud** | [`design-systems/cloud/`](design-systems/cloud/) | A documentation-first design system (26 docs with do's & don'ts) for building any page or website. Sky blue / twilight indigo, Plus Jakarta Sans, `--cds-*` tokens. |
| 🔷 **Maxilius** | [`design-systems/maxilius/`](design-systems/maxilius/) + code below | A code-first web design system: design tokens, React components, Storybook — with a matching doc set extracted from the code. Blue / teal / amber, Inter, `--mx-*` tokens. |
| 🌌 **Aurora** | [`design-systems/aurora/`](design-systems/aurora/) | An iOS-first **mobile** design system documented for **SwiftUI + React Native**, unified by one token pipeline. Single midnight appearance, violet / teal / pink accents, `Aurora.*` / `tokens.*`. |

The three systems are fully separate: different targets, palettes, fonts, token names, and docs.
Pick one per project — never mix them.

## Building the next design system — research profiles

Each system here is authored the same way: a canonical spec → parallel doc writers → verify →
commit. The one variable that dominates cost is **how much research runs up front**. Default to
the lightest profile that fits; escalate only when the facts are genuinely uncertain.

| Profile | When to use | Roughly costs | How |
| --- | --- | --- | --- |
| **Targeted lookups** _(default)_ | The domain is well-trodden (HIG, Material, established token tooling). Most design-system work. | ~50–150K tokens | 5–8 focused `WebSearch`/`WebFetch` calls to confirm only the genuinely-uncertain facts (current library versions, a specific spec detail). Draft the spec from domain knowledge first, then spot-check. |
| **Full deep research** _(opt-in)_ | Facts are contested, fast-moving, or you need a cited, adversarially-verified report. Ask for it explicitly. | ~2–3M tokens | The 69-agent `/deep-research` harness (fan-out search → fetch ~20 sources → 3-vote verification → synthesis). |

Rule of thumb: **don't fact-check what isn't in doubt.** Aurora's build spent ~80% of its tokens
on a full deep-research pass whose own verifier could only confirm 2 of 5 pillars — the rest were
settled facts. Same spec, writers, and 26 docs at the targeted-lookup profile would have cost
~4–5× less at essentially the same quality. Use **full deep research only when explicitly requested.**

---

# Maxilius Design System

A professional design system built code-first: design tokens, React components, and living
documentation. Grounded in the design principles from *Enhance UI — Design for Developers*
(Adrian Twarog & George Moller) — see [`reference/`](reference/).
Written documentation: [`design-systems/maxilius/`](design-systems/maxilius/).

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
