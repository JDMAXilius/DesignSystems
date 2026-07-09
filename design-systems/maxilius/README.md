# 🔷 Maxilius Design System

The written rulebook for **Maxilius** — the code-first design system that lives in this repo
as [`@maxilius/tokens`](../../packages/tokens) (DTCG JSON → CSS variables, TS constants,
Figma variables) and [`@maxilius/react`](../../packages/react) (20 components). These docs
were extracted from that code, so the rules and the implementation always agree.

> **Personality:** cool framework, warm action — cool colors (blue, teal, gray) build the
> structure and recede; warm colors (amber, vermillion) demand attention and are spent only
> where attention is due.
> **Prefix:** every CSS token starts with `--mx-`.

## How to use this system

1. **React project?** `npm install` the workspace, `npm run build`, then
   `import { Button } from '@maxilius/react'` — components consume the semantic tokens
   automatically, light and dark.
2. **Any other website?** Copy the starter token block from
   [`18-design-tokens.md`](18-design-tokens.md) into your global CSS and follow the docs.
3. **Building a screen?** Foundations first (color → type → spacing), then the component
   docs. Run the [new-page checklist](checklists/new-page-checklist.md) before shipping.
4. **Undocumented decision?** Fall back to
   [`00-design-principles.md`](00-design-principles.md).

Every document ends with a **✅ Do / ❌ Don't** table and a shipping checklist.

## The documents

### Foundations

| # | Document | What it decides |
| --- | --- | --- |
| 00 | [Design principles](00-design-principles.md) | Cool framework, warm action — and the rest of the philosophy |
| 01 | [Color](01-color.md) | The 6 ramps, temperature rules, semantic roles (light + dark) |
| 02 | [Typography](02-typography.md) | Inter / JetBrains Mono, 9-step scale, hierarchy |
| 03 | [Spacing, layout & grid](03-spacing-layout-grid.md) | 4px unit, space-1…24, control heights, grid |
| 04 | [Elevation & depth](04-elevation-depth.md) | The 4 cool-tinted shadows, z-index 1000–1600 |
| 05 | [Shape & radius](05-shape-radius.md) | Radii 4/8/12/16 + full, borders, dividers |
| 06 | [Iconography](06-iconography.md) | The 18 built-in 24×24 feather-style icons |
| 07 | [Imagery & illustration](07-imagery-illustration.md) | Imagery direction, overlays, alt text |
| 08 | [Motion & animation](08-motion-animation.md) | 120/200/320ms, the three easings |
| 21 | [Visual hierarchy & composition](21-visual-hierarchy.md) | Focal points — temperature as the signature lever |

### Components (documenting the real `@maxilius/react` library)

| # | Document | What it decides |
| --- | --- | --- |
| 09 | [Buttons](09-buttons.md) | The real Button: 6 variants × 3 sizes, all states |
| 10 | [Forms & inputs](10-forms-inputs.md) | Input, Select, Checkbox, Radio, Switch, Textarea |
| 11 | [Navigation](11-navigation.md) | Tabs, Breadcrumbs + doc-defined nav patterns |
| 12 | [Cards & surfaces](12-cards-surfaces.md) | Cards, surface hierarchy (canvas → surface → sunken) |
| 13 | [Feedback](13-feedback.md) | Toast provider, alerts, modals, Spinner/Skeleton, empty states |
| 14 | [Data display](14-data-display.md) | Table (striped/hoverable/dense), Badge, Tooltip, Avatar |

### System-wide

| # | Document | What it decides |
| --- | --- | --- |
| 15 | [Accessibility](15-accessibility.md) | WCAG 2.2 AA floor with real-pair contrast table |
| 16 | [Responsive design](16-responsive.md) | Mobile-first, breakpoints, touch targets |
| 17 | [Content, voice & tone](17-content-voice-tone.md) | Microcopy, labels, error wording |
| 18 | [Design tokens](18-design-tokens.md) | The real DTCG build + starter sheet for non-React sites |
| 19 | [Theming & dark mode](19-theming-dark-mode.md) | The build-enforced light/dark token swap |
| 20 | [Governance](20-governance.md) | Code is source of truth; semver; contribution flow |
| 22 | [Design process](22-design-process.md) | Blank page → wireframe → system → shipped |
| 23 | [Brand & logo](23-brand-logo.md) | Logo variants, clear space, misuse rules |

### Checklists

- [New page / new site checklist](checklists/new-page-checklist.md)

## The system at a glance

| Decision | Value |
| --- | --- |
| Primary (cool) | Blue `#2563EB` (hover `#1D4ED8`, active `#1E40AF`) |
| Secondary (cool) | Teal `#0D9488` |
| Accent (warm) | Amber `#F59E0B` — dark text on it, one warm CTA per view |
| Danger (warm) | Vermillion `#DC2626` |
| Neutrals | Cool gray ramp `#F8FAFC → #020617` |
| UI font | Inter · Code: JetBrains Mono |
| Type scale | 12–48px, 9 steps (`xs` → `5xl`) |
| Spacing | 4px base unit, `space-1…24` (4–96px) |
| Control heights | 32 / 40 / 48px (sm / md / lg) |
| Radius | 4 / 8 / 12 / 16px + full |
| Elevation | 4 cool-tinted shadow levels (`rgb(2 6 23 / …)`) |
| Motion | 120 / 200 / 320ms, three easings |
| z-index | dropdown 1000 → tooltip 1600 |
| Theming | Two-tier tokens; `data-theme="dark"` or OS preference |
| Accessibility | WCAG 2.2 AA minimum |
| Writing | Sentence case everywhere, verb + noun buttons |

## Non-negotiables

1. Components consume **semantic** tokens only (`--mx-*` roles) — never primitives, never raw hex.
2. Warm color (amber/vermillion) is reserved for attention: CTAs, warnings, destructive — one warm CTA per view.
3. Text contrast ≥ 4.5:1 (3:1 for large text and UI components).
4. Visible focus ring (2px, `--mx-color-focus-ring`) on every interactive element.
5. Labels always visible on form fields — placeholders are never labels.
6. Dark mode comes from the token swap, never from component overrides.
7. Docs follow code: a change to tokens or components updates these docs in the same PR.

## Maxilius vs Cloud

This repo also hosts the separate [☁️ Cloud Design System](../cloud/). They share nothing:
Maxilius is `--mx-`, blue/teal/amber, Inter, code-first; Cloud is `--cds-`, sky/twilight,
Plus Jakarta Sans, docs-first. Pick one per project — never mix them.
