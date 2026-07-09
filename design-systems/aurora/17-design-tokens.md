# 17 · Design tokens — Aurora Design System
> The spine: one source of truth in DTCG JSON, built with Style Dictionary v4 into native SwiftUI and React Native code — so a value is defined once and consumed identically on both platforms.

Aurora is single-mode: one fixed "midnight" appearance. Every token carries **one value** — there are **no light/dark pairs and no `$modes`**. The app locks to this appearance (SwiftUI `.preferredColorScheme(.dark)`; RN `UIUserInterfaceStyle=Dark`).

## Principles
- **One source, two platforms.** The DTCG JSON is the only place a value is authored. Swift and TS are *generated*, never hand-edited.
- **Three tiers, one direction.** primitive → semantic → component. Components consume **only** semantic tokens; semantic tokens reference primitives.
- **Name by meaning, not by value.** `color-action-primary-bg` survives a rebrand; `color-violet-500` doesn't. Semantic names describe role.
- **No hardcoded values in product code.** No hex, no raw `px`/`pt` literals — reach for a token or add one.
- **Single mode, on purpose.** No mode dimension exists; don't reintroduce one through a "light" alias.

## The system

### Why tokens
A token is a named design decision. Authoring it once and generating platform code means SwiftUI and React Native can never drift, Figma variables stay in sync, and a rebrand is a data change — not a find-and-replace across two codebases.

### The tier model
| Tier | Contains | Example | Who references it |
|---|---|---|---|
| **Primitive** | raw palette / scale values | `color.violet.500` = #7C6CFF, `space.4` = 16, `radius.md` = 14 | semantic tokens only |
| **Semantic** | role-based aliases → a primitive | `color.action.primary.bg` → `{color.violet.500}` | components + product code |
| **Component** (optional) | one component's contract → a semantic | `button.primary.bg` → `{color.action.primary.bg}` | that component only |

Rule of the spine: **components consume only semantic (or their own component) tokens** — never a primitive, never a literal.

### Naming grammar (EightShapes-informed)
`namespace-category-concept-property-variant-state`
| Token | namespace | category | concept | property | variant | state |
|---|---|---|---|---|---|---|
| `color-action-primary-bg-pressed` | (aurora) | color | action | primary → bg | | pressed |
| `color-text-secondary` | (aurora) | color | text | | secondary | |
| `space-4` | (aurora) | space | | | 4 | |
| `radius-lg` | (aurora) | radius | | | lg | |
- Namespace `aurora` is implied by the group root; it surfaces as `Aurora.*` in Swift and `tokens.*` in TS.
- Only include the segments a token needs — omit empty ones. Lowercase, hyphen in JSON path; camelCase when generated.

### Format: DTCG
Every token is `$value` + `$type` (+ optional `$description`). Semantic tokens use `{group.path}` reference syntax to point at a primitive. Single mode → a plain `$value`, never a `$modes` map.

## Tokens

### A real token excerpt (single mode)
```json
{
  "color": {
    "violet": {
      "500": { "$value": "#7C6CFF", "$type": "color", "$description": "Aurora violet — primary action" },
      "600": { "$value": "#6551F0", "$type": "color", "$description": "primary action, pressed" }
    },
    "ink": {
      "50":  { "$value": "#F4F6FB", "$type": "color" },
      "900": { "$value": "#10151F", "$type": "color" },
      "950": { "$value": "#0A0E17", "$type": "color" }
    },
    "bg": {
      "app":     { "$value": "{color.ink.950}", "$type": "color", "$description": "app background" },
      "surface": { "$value": "{color.ink.900}", "$type": "color", "$description": "card / surface" }
    },
    "text": {
      "primary":   { "$value": "{color.ink.50}",  "$type": "color" },
      "secondary": { "$value": "{color.ink.300}", "$type": "color" }
    },
    "action": {
      "primary": {
        "bg":         { "$value": "{color.violet.500}", "$type": "color" },
        "bg-pressed": { "$value": "{color.violet.600}", "$type": "color" },
        "text":       { "$value": "#FFFFFF", "$type": "color" }
      }
    }
  },
  "space": {
    "3": { "$value": 12, "$type": "dimension", "$description": "list-row vertical padding (pt/dp)" },
    "4": { "$value": 16, "$type": "dimension", "$description": "screen horizontal margin" }
  },
  "radius": {
    "md": { "$value": 14, "$type": "dimension", "$description": "buttons, inputs, rows" },
    "lg": { "$value": 20, "$type": "dimension", "$description": "cards, panels" }
  },
  "font": {
    "body": {
      "$type": "typography",
      "$value": { "fontFamily": "System", "fontSize": 17, "fontWeight": 400, "textStyle": "body" },
      "$description": "default body; maps to iOS .body for Dynamic Type"
    }
  }
}
```
Values are in **pt/dp — never px**. `space`/`radius` are `dimension`; SF Pro is `"System"` so Dynamic Type works.

### Generated names
| DTCG path | Swift | TS |
|---|---|---|
| `color.action.primary.bg` | `Aurora.Color.actionPrimaryBg` | `tokens.color.action.primary.bg` |
| `color.action.primary.bg-pressed` | `Aurora.Color.actionPrimaryBgPressed` | `tokens.color.action.primary.bgPressed` |
| `color.text.secondary` | `Aurora.Color.textSecondary` | `tokens.color.text.secondary` |
| `space.4` | `Aurora.Spacing.space4` | `tokens.space['4']` |
| `radius.lg` | `Aurora.Radius.lg` | `tokens.radius.lg` |
| `font.body` | `Aurora.Font.body` | `tokens.font.body` |

## The build pipeline
**Style Dictionary v4** (first-class DTCG support) reads the JSON and emits four artifacts from the one source:
```
tokens/*.json  (DTCG source — the only hand-authored files)
        │
        ▼   Style Dictionary v4
  ┌─────┴───────────────────────────────────────────────┐
  ▼                 ▼                ▼                    ▼
ios/AuroraTokens.swift   rn/tokens.ts      figma/variables.json   json/tokens.json
(Color/Font/CGFloat)   (typed theme +      (Figma Variables       (flat resolved
                        optional NativeWind  import)                reference)
                        preset)
```

### Generated `ios/AuroraTokens.swift` (sample)
```swift
import SwiftUI

public enum Aurora {
    public enum Color {
        // semantic (components consume these)
        public static let bgApp             = SwiftUI.Color(hex: 0x0A0E17)
        public static let surfaceDefault    = SwiftUI.Color(hex: 0x10151F)
        public static let textPrimary       = SwiftUI.Color(hex: 0xF4F6FB)
        public static let textSecondary     = SwiftUI.Color(hex: 0x9AA3BF)
        public static let actionPrimaryBg        = SwiftUI.Color(hex: 0x7C6CFF)
        public static let actionPrimaryBgPressed = SwiftUI.Color(hex: 0x6551F0)
        public static let actionPrimaryText      = SwiftUI.Color(hex: 0xFFFFFF)
    }
    public enum Spacing {
        public static let space3: CGFloat = 12
        public static let space4: CGFloat = 16
    }
    public enum Radius {
        public static let md: CGFloat = 14
        public static let lg: CGFloat = 20
    }
    public enum Font {
        public static let body = SwiftUI.Font.body        // system → Dynamic Type
    }
}
```

### Generated `rn/tokens.ts` (sample)
```tsx
// AUTO-GENERATED by Style Dictionary v4 — do not edit by hand.
export const tokens = {
  color: {
    bg:      { app: '#0A0E17' },
    surface: { default: '#10151F' },
    text:    { primary: '#F4F6FB', secondary: '#9AA3BF' },
    action:  { primary: { bg: '#7C6CFF', bgPressed: '#6551F0', text: '#FFFFFF' } },
  },
  space:  { '3': 12, '4': 16 },
  radius: { md: 14, lg: 20 },
  font:   { body: { fontFamily: 'System', fontSize: 17, fontWeight: '400' as const } },
} as const;

export type Tokens = typeof tokens;

// Optional NativeWind preset generated from the same source
export const auroraPreset = {
  theme: { extend: {
    colors:       { 'action-primary': '#7C6CFF', 'text-primary': '#F4F6FB' },
    borderRadius: { md: '14px', lg: '20px' },     // NativeWind maps to dp at runtime
    spacing:      { '3': '12px', '4': '16px' },
  } },
};
```

### Copy-paste starter
`tokens/color.json` (a minimal DTCG source):
```json
{
  "color": {
    "violet": { "500": { "$value": "#7C6CFF", "$type": "color" } },
    "ink":    { "50": { "$value": "#F4F6FB", "$type": "color" },
                "950": { "$value": "#0A0E17", "$type": "color" } },
    "bg":     { "app": { "$value": "{color.ink.950}", "$type": "color" } },
    "text":   { "primary": { "$value": "{color.ink.50}", "$type": "color" } },
    "action": { "primary": { "bg": { "$value": "{color.violet.500}", "$type": "color" } } }
  }
}
```
`config.json` (the Style Dictionary v4 config concept — one source, four platforms):
```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "ios":   { "transformGroup": "ios-swift", "buildPath": "ios/",
               "files": [{ "destination": "AuroraTokens.swift", "format": "ios-swift/class.swift", "options": { "className": "Aurora" } }] },
    "rn":    { "transformGroup": "js", "buildPath": "rn/",
               "files": [{ "destination": "tokens.ts", "format": "javascript/es6" }] },
    "figma": { "transformGroup": "js", "buildPath": "figma/",
               "files": [{ "destination": "variables.json", "format": "json/flat" }] },
    "json":  { "transformGroup": "js", "buildPath": "json/",
               "files": [{ "destination": "tokens.json", "format": "json" }] }
  }
}
```
Run `style-dictionary build` → all four artifacts regenerate. Single mode means no `$modes` and no per-mode output — one file per platform.

### Governance hooks
- **Adding a token**: open a PR touching only `tokens/*.json`; CI runs `style-dictionary build` and fails if generated output is stale or references are unresolved. New component values must reference a semantic token.
- **Deprecating**: mark `"$deprecated": true` with a `$description` pointing at the replacement; keep the alias one release, then remove. A lint rule flags deprecated tokens in product code.
- **Never edit generated files** — a CI check rejects diffs to `ios/`, `rn/`, `figma/`, `json/` that aren't produced by the build.

## Usage
Product code consumes the **generated** Swift and TS — never raw values.

**SwiftUI** — a primary button built from semantic tokens:
```swift
struct PrimaryButton: View {
    let title: String; let action: () -> Void
    @State private var pressed = false
    var body: some View {
        Button(action: action) {
            Text(title).font(Aurora.Font.body.weight(.semibold))
                .foregroundStyle(Aurora.Color.actionPrimaryText)
                .frame(maxWidth: .infinity, minHeight: 48)     // ≥44pt touch floor
                .background(pressed ? Aurora.Color.actionPrimaryBgPressed : Aurora.Color.actionPrimaryBg,
                            in: RoundedRectangle(cornerRadius: Aurora.Radius.md, style: .continuous))
        }
    }
}
```

**RN** — the same button from `tokens.ts`. Android/Material note: the values are dp, so `borderRadius`/`padding` map 1:1; use Material ripple for the pressed state if desired.
```tsx
import { Pressable, Text } from 'react-native';
import { tokens } from '../tokens';

export function PrimaryButton({ title, onPress }: Props) {
  return (
    <Pressable onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 48,                                   // ≥44dp touch floor
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? tokens.color.action.primary.bgPressed : tokens.color.action.primary.bg,
        alignItems: 'center', justifyContent: 'center',
      })}>
      <Text style={{ color: tokens.color.action.primary.text, fontSize: tokens.font.body.fontSize, fontWeight: '600' }}>
        {title}
      </Text>
    </Pressable>
  );
}
```

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Consume semantic tokens (`Aurora.Color.actionPrimaryBg`) in components | Reach past semantics into a primitive (`Aurora.Color.violet500`) |
| Author values once in `tokens/*.json` | Hand-edit `AuroraTokens.swift` or `tokens.ts` |
| Reference `#7C6CFF` only inside a primitive token | Paste a hex literal into a view or stylesheet |
| Express size tokens in pt/dp `dimension` values | Author a token as `"16px"` — Aurora has no px |
| Keep tokens single-value (no `$modes`) | Add a light/dark pair or a mode dimension |
| Name by role: `color-text-secondary` | Name by value: `color-gray-secondary` |
| Add a component token that references a semantic one | Point a component token straight at a primitive |
| Mark deprecated tokens with `$deprecated` + a pointer | Delete a token in the same release it's deprecated |
| Let CI regenerate and diff the four artifacts | Commit product code that hardcodes a hex or radius |
| Import Figma variables from the generated `variables.json` | Retype hex values into Figma by hand |

## Checklist
- [ ] Every value is authored in `tokens/*.json`; Swift/TS are generated, not edited.
- [ ] Components consume only semantic (or their own component) tokens.
- [ ] No hardcoded hex, and no `px` — sizes are pt/dp `dimension` tokens.
- [ ] Semantic tokens reference primitives via `{group.path}`.
- [ ] Tokens are single-value — no `$modes`, no light/dark pairs.
- [ ] Names follow `namespace-category-concept-property-variant-state`.
- [ ] `style-dictionary build` produces iOS, RN, Figma, and JSON artifacts.
- [ ] CI fails on stale generated output or edits to generated files.
- [ ] Deprecations carry `$deprecated` + a replacement pointer.
- [ ] Figma variables are imported from the generated `variables.json`.

## Related
- `./01-color.md` — the primitive palette these tokens name
- `./02-typography.md` — the type ramp behind `font.*`
- `./03-spacing-layout-grid.md` — the 4pt scale behind `space.*`
- `./15-feedback-status.md` — feedback tokens consumed downstream
- `./16-data-display.md` — data-display tokens consumed downstream
