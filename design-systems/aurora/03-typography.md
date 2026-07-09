# 03 · Typography — Aurora Design System
> SF Pro mapped to iOS text styles so Dynamic Type works out of the box, with SF Mono for numerics.

Aurora sets type in the **system font** and maps every style to an iOS text style. This is a requirement, not a preference: the system font is what makes Dynamic Type, optical sizing, and per-weight rendering work for free. A bundled UI font would break all three.

## Principles

**1. System font, required.** SF Pro on iOS (SwiftUI `.system`; RN `System`), Roboto on Android/RN-Android. This is mandatory for Dynamic Type — never bundle a custom UI font. A custom display font is allowed for the splash screen only.

**2. Map to iOS text styles.** Every ramp entry maps to a `.largeTitle … .caption2` text style so it scales with the user's Dynamic Type setting automatically.

**3. Never disable Dynamic Type.** Type scales; layouts reflow. Cap extremes with layout (line limits, wrapping, scroll), never by locking the point size.

**4. Numerics are monospaced.** Timers, prices, counts, and code use SF Mono / tabular figures so digits don't jitter as they change.

## The system

### Type ramp — mapped to iOS text styles

Sizes are the DEFAULT (large) sizes; they scale up and down with Dynamic Type.

| Token | iOS text style | Size (pt) | Weight | Use |
|---|---|---|---|---|
| display | (custom, splash only) | 40 | Bold | splash / marketing hero |
| largeTitle | `.largeTitle` | 34 | Bold | screen large title |
| title1 | `.title` | 28 | Bold | section title |
| title2 | `.title2` | 22 | Bold | sub-section |
| title3 | `.title3` | 20 | Semibold | card title |
| headline | `.headline` | 17 | Semibold | emphasized body / list row title |
| body | `.body` | 17 | Regular | default body |
| callout | `.callout` | 16 | Regular | secondary body |
| subheadline | `.subheadline` | 15 | Regular | supporting text |
| footnote | `.footnote` | 13 | Regular | captions, metadata |
| caption1 | `.caption` | 12 | Regular | labels, timestamps |
| caption2 | `.caption2` | 11 | Regular | smallest legal / overline |

### Weights

Regular 400 · Medium 500 · Semibold 600 · Bold 700. Match adjacent SF Symbol weight to the text weight beside it. Bold Text accessibility setting is respected automatically by the system font — don't fight it.

### Numerics — SF Mono

SF Mono on iOS, fallback "Roboto Mono" on Android. Use for code, timers, and any figures that update in place. Apply `.monospacedDigit()` (SwiftUI) / `fontVariant: ['tabular-nums']` (RN) so digits stay column-aligned as values change. Body prose stays in SF Pro — mono is for numerics and code, not paragraphs.

### Line height and measure

Use the system default line height per text style; do not override unless a specific layout needs it. For multiline body, target ~1.3–1.4 line-height. Keep a comfortable measure — body copy should reflow, not stretch edge to edge on wide devices.

### Dynamic Type rules

- Never disable it. Every text style must scale with the user's setting.
- Layouts reflow with no clipping up to accessibility sizes — test at the largest AX size.
- Cap runaway growth with `lineLimit`/wrapping and scroll, not by pinning the font size.
- Icons and inline glyphs scale with their adjacent text (SF Symbols scale with text style).

## Tokens

Single mode; one value per token; no `$modes`. Font tokens carry family, size, weight, and the iOS text-style mapping.

```jsonc
// DTCG (json/tokens.json) — excerpt
{
  "font": {
    "family": {
      "text": { "$value": "System", "$type": "fontFamily" },     // SF Pro / Roboto
      "mono": { "$value": "SF Mono", "$type": "fontFamily" }
    },
    "body":       { "$value": { "family": "{font.family.text}", "size": 17, "weight": 400, "textStyle": "body" }, "$type": "typography" },
    "headline":   { "$value": { "family": "{font.family.text}", "size": 17, "weight": 600, "textStyle": "headline" }, "$type": "typography" },
    "largeTitle": { "$value": { "family": "{font.family.text}", "size": 34, "weight": 700, "textStyle": "largeTitle" }, "$type": "typography" }
  }
}
```

| DTCG | Swift | TS |
|---|---|---|
| `font.largeTitle` | `Aurora.Font.largeTitle` | `tokens.font.largeTitle` |
| `font.title1` | `Aurora.Font.title1` | `tokens.font.title1` |
| `font.headline` | `Aurora.Font.headline` | `tokens.font.headline` |
| `font.body` | `Aurora.Font.body` | `tokens.font.body` |
| `font.footnote` | `Aurora.Font.footnote` | `tokens.font.footnote` |
| `font.caption2` | `Aurora.Font.caption2` | `tokens.font.caption2` |
| `font.family.mono` | `Aurora.Font.mono` | `tokens.font.family.mono` |

## Usage

Prefer the built-in text styles so Dynamic Type is automatic; the token font is a thin wrapper over the same styles.

```swift
import SwiftUI

struct RowTitle: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("Weekly summary")
                .font(.largeTitle)                         // .largeTitle → scales with Dynamic Type
                .foregroundStyle(Aurora.Color.textPrimary)

            Text("Updated just now")
                .font(.footnote)                           // metadata
                .foregroundStyle(Aurora.Color.textSecondary)

            Text("12:04.9")
                .font(Aurora.Font.mono)                    // SF Mono
                .monospacedDigit()                         // digits stay aligned as the timer ticks
                .foregroundStyle(Aurora.Color.textPrimary)
        }
        // no .minimumScaleFactor lock, no fixed size — layout reflows
    }
}
```

```tsx
import { Text, View } from 'react-native';
import { tokens } from './tokens';

export function RowTitle() {
  return (
    <View style={{ gap: 4 }}>
      {/* allowFontScaling defaults to true — never set it false */}
      <Text style={{ ...tokens.font.largeTitle, color: tokens.color.text.primary }}>
        Weekly summary
      </Text>
      <Text style={{ ...tokens.font.footnote, color: tokens.color.text.secondary }}>
        Updated just now
      </Text>
      <Text
        style={{
          fontFamily: tokens.font.family.mono,             // SF Mono / Roboto Mono
          fontVariant: ['tabular-nums'],                   // aligned digits
          color: tokens.color.text.primary,
        }}>
        12:04.9
      </Text>
    </View>
  );
}
```

Android note: the `System` family resolves to **Roboto** and mono falls back to **Roboto Mono**; Dynamic Type maps to Android's font-scale setting. The point sizes and reflow behavior are identical — only the glyph shapes differ, which is an expected platform divergence, not a bug.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use the system font (SF Pro / Roboto) for all UI text | Don't bundle a custom UI font — it breaks Dynamic Type and optical sizing |
| Map every style to an iOS text style (`.body`, `.headline`, …) | Don't hardcode `Font.system(size: 17)` and lose Dynamic Type |
| Let text scale and layouts reflow to AX sizes | Don't set `allowFontScaling={false}` or a hard `.minimumScaleFactor` to "protect" a layout |
| Use `.monospacedDigit()` / `tabular-nums` for timers, prices, counts | Don't let proportional digits jitter the width of a live counter |
| Keep SF Mono for numerics and code only | Don't set body paragraphs in mono |
| Match SF Symbol weight to adjacent text weight | Don't pair a black symbol with regular body text |
| Reserve the 40pt display style for the splash | Don't use the custom display font for in-app screen titles — use `.largeTitle` |
| Cap long strings with `lineLimit`/wrapping | Don't shrink the font to fit a fixed-height box |
| Respect the Bold Text accessibility setting | Don't override system weight so Bold Text has no effect |
| Test the largest accessibility Dynamic Type size before shipping | Don't ship having only checked the default size |

## Checklist

- [ ] Is all UI text in the system font (SF Pro / Roboto), no bundled UI font?
- [ ] Does every style map to an iOS text style so Dynamic Type scales it?
- [ ] Is Dynamic Type left on everywhere, with layouts reflowing (no clipping) at AX sizes?
- [ ] Do numerics use SF Mono with `.monospacedDigit()` / `tabular-nums`?
- [ ] Are weights limited to Regular/Medium/Semibold/Bold and matched to adjacent symbols?
- [ ] Is the 40pt display style used only on the splash?
- [ ] Does the Roboto fallback render correctly on Android at the same sizes?
- [ ] Did you verify at the largest accessibility text size?

## Related

- [00-design-principles.md](00-design-principles.md) — accessible by default, touch-first
- [01-platforms-conventions.md](01-platforms-conventions.md) — SF Pro / Roboto across platforms
- [02-color.md](02-color.md) — text color roles and contrast pairs
