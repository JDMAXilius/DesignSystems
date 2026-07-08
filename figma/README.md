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

## Workflow

1. Edit token JSON in `packages/tokens/src/`.
2. `npm run build:tokens` → regenerates `dist/figma/variables.json` (among other outputs).
3. Re-sync to Figma (via Claude Code + Figma MCP, or any tool that consumes the payload):
   variables are matched by name (`color/blue/500`, `bg/surface`, …); semantic variables
   alias primitives so a primitive change propagates automatically inside Figma.

Scopes are set per role — `bg/*` → frame/shape fills, `text/*` → text fills,
`border/*` → strokes — so Figma's pickers only offer each variable where it belongs.
