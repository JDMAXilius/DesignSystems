# 05 · Iconography & SF Symbols — Aurora Design System
> How Aurora uses SF Symbols on iOS and keeps a 1:1 fallback set so the same icons ship on Android and React Native.

## Principles
- **SF Symbols first on iOS.** They align to the SF Pro baseline, scale with Dynamic Type, and match text weight for free — the native, premium choice.
- **Match the icon to its text.** An icon next to Semibold body text uses the Semibold symbol weight; icons should feel like a letter in the same sentence.
- **Color is inherited.** Icons take the current text color unless they carry status meaning — never a random accent.
- **One icon, two platforms.** Every symbol has a documented 1:1 fallback so Android and React Native render the same concept.
- **Meaningful vs. decorative.** An icon that conveys meaning gets an accessibility label; a purely decorative one is hidden from VoiceOver.

## The system

### SF Symbols on iOS
- **Weights:** ultralight → thin → light → regular → medium → semibold → bold → heavy → black. Match the weight of adjacent text (default regular/medium; semibold for row titles).
- **Scales:** small / medium / large — relative to the accompanying font. Prefer setting the font and letting the symbol scale with it.
- **Rendering modes:** monochrome (default), hierarchical (one tint, layered opacity), palette (2–3 explicit colors), multicolor (symbol's built-in colors). Aurora defaults to **monochrome** inheriting text color; hierarchical for a richer single-accent look.

### Icon sizes
| Token | Size (pt/dp) | Use |
|---|---|---|
| icon-sm | 17 | inline with body text, dense rows |
| icon-md | 20 | toolbar, secondary controls |
| icon-lg | 24 | **default** — list rows, tab bar, buttons |
| icon-xl | 28 | prominent actions, headers |

- Default is **24pt**. Icon color inherits `text-primary` (ink-50) unless it signals status, in which case it uses the status color and is always paired with a label — never color alone.

### Cross-platform strategy
SF Symbols are an Apple-only, licensed font — **unavailable on Android and on RN-Android**. Aurora keeps a **1:1 mapping table** from each SF Symbol used to a Lucide-style fallback (2pt stroke, rounded joins/caps) that matches the SF Pro feel.

| Concept | SF Symbol (iOS) | Fallback (Lucide-style) |
|---|---|---|
| Back | `chevron.left` | `chevron-left` |
| Add | `plus` | `plus` |
| Close | `xmark` | `x` |
| Search | `magnifyingglass` | `search` |
| Settings | `gearshape` | `settings` |
| Favorite | `heart` / `heart.fill` | `heart` |
| Share | `square.and.arrow.up` | `share` |
| More | `ellipsis` | `more-horizontal` |
| Success | `checkmark.circle.fill` | `check-circle` |
| Delete | `trash` | `trash-2` |

- **Option A — fallback set on BOTH platforms (recommended):** one visual identity everywhere; simplest to keep in sync. Use a Lucide RN library on iOS and Android.
- **Option B — SF Symbols on iOS + fallback on Android:** most native on iOS via `Image(systemName:)` / an `sf-symbols` RN lib, fallback on Android. Requires maintaining the mapping table.
- **Document the choice per app** and keep the mapping table as the single source of truth. Aurora recommends Option A unless the app wants maximum iOS nativeness.

### Rendering-mode guidance
- **Monochrome** (default): the icon takes one color — use `text-primary` for neutral icons, a status color for status icons.
- **Hierarchical**: a single accent (e.g. violet-500) with the symbol's built-in opacity layering — good for a richer, still-tinted look.
- **Palette / multicolor**: reserve for illustrative moments; keep it rare so icons stay legible on the dark canvas.
- Fallback icons are single-stroke, so they map cleanly to monochrome and hierarchical only.

## Tokens
DTCG group `icon.size` (primitive).

```json
{ "icon": { "size": {
  "sm": { "$value": "17", "$type": "dimension" },
  "md": { "$value": "20", "$type": "dimension" },
  "lg": { "$value": "24", "$type": "dimension", "$description": "Default icon size" },
  "xl": { "$value": "28", "$type": "dimension" }
}}}
```
| DTCG | Swift | TypeScript |
|---|---|---|
| `icon.size.sm` | `Aurora.IconSize.sm` | `tokens.icon.size.sm` (17) |
| `icon.size.md` | `Aurora.IconSize.md` | `tokens.icon.size.md` (20) |
| `icon.size.lg` | `Aurora.IconSize.lg` | `tokens.icon.size.lg` (24) |
| `icon.size.xl` | `Aurora.IconSize.xl` | `tokens.icon.size.xl` (28) |

## Usage
An icon-with-label row on iOS, and the RN version (Option B shown: SF Symbols on iOS, fallback on Android).

```swift
// iOS — SF Symbol inherits text color, matches Semibold row title.
HStack(spacing: Aurora.Spacing.xs) { // 8
    Image(systemName: "heart.fill")
        .font(.system(size: Aurora.IconSize.lg, weight: .semibold)) // 24, matches title
        .foregroundStyle(Aurora.Color.textPrimary)   // inherits text color
    Text("Saved")
        .font(Aurora.Font.headline)                  // 17 Semibold
        .foregroundStyle(Aurora.Color.textPrimary)
}
.accessibilityElement(children: .combine)
.accessibilityLabel("Saved")   // meaningful: labeled

// Decorative-only symbol — hidden from VoiceOver.
Image(systemName: "sparkles")
    .foregroundStyle(Aurora.Color.textSecondary)
    .accessibilityHidden(true)
```

```tsx
import { Platform, View, Text } from 'react-native';
import { SymbolView } from 'expo-symbols';   // SF Symbols on iOS
import { Heart } from 'lucide-react-native';  // fallback set
import { tokens } from '../tokens';

function SavedRow() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: tokens.space.xs }}>
      {Platform.OS === 'ios' ? (
        <SymbolView
          name="heart.fill"
          size={tokens.icon.size.lg}          // 24
          weight="semibold"                    // match Semibold title
          tintColor={tokens.color.text.primary} // inherit text color
        />
      ) : (
        <Heart size={tokens.icon.size.lg} color={tokens.color.text.primary} strokeWidth={2} />
      )}
      {/* Meaningful icon — the row is labeled for VoiceOver/TalkBack */}
      <Text
        accessibilityLabel="Saved"
        style={{ color: tokens.color.text.primary, fontSize: 17, fontWeight: '600' }}>
        Saved
      </Text>
    </View>
  );
}
```
For **Option A** (recommended), drop the `Platform.OS` branch and use the Lucide `Heart` on both platforms.

Android/Material note: Android has no SF Symbols; Material Symbols or the Lucide fallback fills the role. Keep the 2pt-stroke rounded style so icons read as one set across platforms.

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Match symbol weight to adjacent text (Semibold icon next to a Semibold title) | Don't pair a black-weight icon with regular body text — it shouts |
| Let icons inherit `text-primary` color | Don't tint a neutral icon violet or teal just for decoration |
| Use 24pt as the default icon size | Don't ship random sizes like `22pt` or `26pt` |
| Keep a 1:1 SF Symbol → fallback mapping table as the source of truth | Don't hand-pick a different Android icon per screen, breaking parity |
| Use the Lucide-style fallback (2pt stroke, rounded) to match SF Pro | Don't mix sharp-corner and rounded icon sets in one app |
| Give meaningful icons an accessibility label | Don't ship an icon-only button with no VoiceOver label |
| Hide purely decorative icons from VoiceOver | Don't announce a decorative `sparkles` glyph to screen-reader users |
| Pair a status icon with a label and status color | Don't signal success with green color alone (fails color-only rule) |
| Scale symbols with the font so they grow with Dynamic Type | Don't hardcode a pixel size that stays tiny at accessibility text sizes |
| Document Option A vs. B once, per app | Don't leave the platform icon strategy undefined and let it drift |

## Checklist
- [ ] Icon weight matches the adjacent text weight.
- [ ] Size comes from the icon-size scale (17/20/24/28), default 24.
- [ ] Neutral icons inherit `text-primary`; only status icons use status color.
- [ ] Status icons are paired with a label (never color alone).
- [ ] Every SF Symbol used has a fallback in the mapping table.
- [ ] Fallback icons use the 2pt-stroke rounded style.
- [ ] Meaningful icons have accessibility labels; decorative ones are hidden.
- [ ] The app's Option A vs. B choice is documented.

## Related
- [04 · Layout, spacing & safe areas](./04-layout-spacing-safe-areas.md)
- [06 · Elevation, depth & materials](./06-elevation-depth-materials.md)
- [07 · Motion & haptics](./07-motion-haptics.md)
- [08 · Touch, gestures & targets](./08-touch-gestures-targets.md)
