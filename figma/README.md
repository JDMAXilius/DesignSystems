# Figma sync

Code is the source of truth; Figma mirrors it.

## Live file

**[Maxilius Design System](https://www.figma.com/design/wGsy9EBrinOPG2mpROcyeb)**
(file key `wGsy9EBrinOPG2mpROcyeb`, Juan Diego Lugo's team)

Synced 2026-07-08 from `@maxilius/tokens`:

| Figma collection | Contents | Mode(s) |
| --- | --- | --- |
| `Maxilius / Primitives` | 87 variables — 6 color ramps + white/black (COLOR), spacing scale (FLOAT, px), radii (FLOAT) | `Value` |
| `Maxilius / Semantic` | 68 color roles (`bg/*`, `text/*`, `border/*`, `action/*`, `feedback/*`, `focus/ring`) **aliased to Primitives** | `Light` |
| `Maxilius / Semantic (Dark)` | Same 68 roles with dark values | `Dark` |

> Dark lives in a separate collection because Figma **starter plans allow one mode per
> collection**. On a paid plan, merge it into `Maxilius / Semantic` as a second mode —
> the sync payload (`packages/tokens/dist/figma/variables.json`) already models Light/Dark
> as two modes of one collection.

The file's first page (`Cover / Styleguide`) shows the palette ramps and sync notes.

## Component library (synced 2026-07-08)

The `Components` page mirrors `@maxilius/react` as Figma components — organized in sections,
visual properties bound to the semantic variables above (fills, strokes, radii), text/effect
styles applied, and `var(--mx-*)` code syntax on every variable for Dev Mode.

| Figma component | Variants / properties |
| --- | --- |
| `Button` | Variant×Size = 18, `Label` text prop |
| `Badge` | 6 variants, `Label` text prop |
| `Input` | 4 states · `Textarea` 2 · `Select` |
| `Checkbox` | 3 states · `Radio` 2 · `Toggle` 2 |
| `Avatar` | 3 sizes, `Initials` text + `Status` boolean |
| `Card` | 3 elevations (nested Button instances) |
| `TabItem`/`Tabs`, `AccordionItem` | active/inactive, open/closed |
| `Tooltip`, `Toast` | Toast: 4 feedback variants with tinted icon instances |
| `Breadcrumbs`, `ListItem`, `Table` | assemblies |
| `Icon/*` | 18 stroke icons bound to `text/primary` |

Styles: text ramp (`Heading/XL→Caption`, `Code` in JetBrains Mono) + `Shadow/SM→XL`.

> Starter-plan constraints: 3 pages per file (components share one page, sectioned) and
> 1 mode per variable collection (dark in companion collection). Known follow-up: ~62
> intentional literal fills (white thumbs/checkmarks, SVG vectors) are unbound.

## Workflow

1. Edit token JSON in `packages/tokens/src/`.
2. `npm run build:tokens` → regenerates `dist/figma/variables.json` (among other outputs).
3. Re-sync to Figma (via Claude Code + Figma MCP, or any tool that consumes the payload):
   variables are matched by name (`color/blue/500`, `bg/surface`, …); semantic variables
   alias primitives so a primitive change propagates automatically inside Figma.

Scopes are set per role — `bg/*` → frame/shape fills, `text/*` → text fills,
`border/*` → strokes — so Figma's pickers only offer each variable where it belongs.
