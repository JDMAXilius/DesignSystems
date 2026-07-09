# 14 · Cards & surfaces — Aurora Design System
> How Aurora builds surfaces — resting cards, interactive cards, media and stat cards, and the surface hierarchy that gives the midnight canvas depth.

## Principles
- **Depth comes from lightness.** On dark, a card reads as raised because it is a lighter ink than what's behind it, plus a soft shadow — not a bright border.
- **A tappable card is one target.** If a card is interactive, the whole card taps, presses to 0.97, and fires a haptic — no tiny hotspot inside it.
- **One hero per screen.** The aurora-gradient card is a signature moment; use at most one per screen.
- **Don't nest surfaces.** Cards sit on the background, not inside other cards; deeper nesting flattens the hierarchy.
- **Padding is structure.** A consistent 16pt internal padding and radius-lg keep every card recognizable.

## The system

### Card anatomy
| Part | Spec |
|---|---|
| Surface | `ink-900 #10151F` (bg-surface) |
| Padding | **16pt** (space-4) all sides |
| Radius | **radius-lg 20pt** continuous |
| Elevation | **level-1**: shadow `0 2 8 rgba(0,0,0,0.35)` |
| Title | `title3` 20 Semibold, `ink-50` |
| Body | `body`/`subheadline`, `ink-300` |
| Divider (if any) | hairline `ink-700` |
| Nested radius | inner = outer − padding (e.g. 20 − 16 = 4pt inner) |

### Surface hierarchy (depth ladder)
| Layer | Token | Hex | Use |
|---|---|---|---|
| App background | bg-app / ink-950 | `#0A0E17` | screen canvas |
| Surface / card | bg-surface / ink-900 | `#10151F` | resting card |
| Raised / pressed-up | bg-surface-raised / ink-800 | `#171D2B` | popover, active/raised card, sheet |
| Sunken | bg-surface-sunken | `#070A11` | wells, inset fields |

Each step up the ladder is one lighter ink. Never place an `ink-900` card on another `ink-900` card — there's no contrast.

### Interactive card
- Whole card is the tap target (≥ 44pt tall — comfortably taller).
- **Pressed state**: scale to **0.97** with `spring-snappy` (response 0.30, damping 0.85) + `impact light` haptic on tap.
- Optional raise on press: surface `ink-800`, shadow to level-2.
- Give it a VoiceOver label + `.isButton` trait; it behaves like a button.

### Card variants
- **Media card**: full-bleed image/video capped by the card radius (clip to radius-lg); text overlay sits on a bottom scrim gradient for legibility; caption `footnote` `ink-300`.
- **Stat card**: large `largeTitle`/`title1` value with `.monospacedDigit()`, a `caption1` label above/below, optional teal delta. Keep to one primary number.
- **Aurora-gradient hero card**: background `linear 135°: #2FE0C0 → #7C6CFF 55% → #FF6FB5`; text uses `#FFFFFF`; optional aurora glow `0 8 24 rgba(124,108,255,0.35)`. **Max 1 per screen.**

## Tokens
| Concept | DTCG group | Swift | TS |
|---|---|---|---|
| App bg | `color.bg.app` | `Aurora.Color.bgApp` | `tokens.color.bg.app` |
| Card surface | `color.bg.surface` | `Aurora.Color.bgSurface` | `tokens.color.bg.surface` |
| Raised surface | `color.bg.surface.raised` | `Aurora.Color.bgSurfaceRaised` | `tokens.color.bg.surface.raised` |
| Card radius | `radius.lg` | `Aurora.Radius.lg` | `tokens.radius.lg` |
| Card padding | `space.4` | `Aurora.Spacing.md` | `tokens.space.md` |
| Resting shadow | `elevation.level1` | `Aurora.Shadow.level1` | `tokens.elevation.level1` |
| Pressed shadow | `elevation.level2` | `Aurora.Shadow.level2` | `tokens.elevation.level2` |
| Hero gradient | `color.gradient.aurora` | `Aurora.Gradient.aurora` | `tokens.color.gradient.aurora` |
| Press spring | `motion.spring.snappy` | `Aurora.Spring.snappy` | `tokens.motion.spring.snappy` |

## Usage

### Resting card (SwiftUI)
```swift
struct RestingCard<Content: View>: View {
    @ViewBuilder var content: Content
    var body: some View {
        content
            .padding(Aurora.Spacing.md)                 // 16pt
            .background(Aurora.Color.bgSurface)          // ink-900
            .clipShape(RoundedRectangle(cornerRadius: Aurora.Radius.lg, style: .continuous)) // 20pt
            .shadow(color: .black.opacity(0.35), radius: 8, x: 0, y: 2) // level-1
    }
}
```

### Interactive card (SwiftUI)
```swift
struct InteractiveCard: View {
    let trip: Trip
    let onTap: () -> Void
    @State private var pressed = false
    var body: some View {
        VStack(alignment: .leading, spacing: Aurora.Spacing.sm) {
            Text(trip.name).font(Aurora.Font.title3)
            Text(trip.date).font(Aurora.Font.subheadline).foregroundStyle(Aurora.Color.textSecondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(Aurora.Spacing.md)
        .background(pressed ? Aurora.Color.bgSurfaceRaised : Aurora.Color.bgSurface) // raise on press
        .clipShape(RoundedRectangle(cornerRadius: Aurora.Radius.lg, style: .continuous))
        .shadow(color: .black.opacity(pressed ? 0.40 : 0.35), radius: pressed ? 16 : 8, x: 0, y: pressed ? 4 : 2)
        .scaleEffect(pressed ? 0.97 : 1)                    // pressed scale
        .animation(Aurora.Spring.snappy, value: pressed)
        .contentShape(Rectangle())                          // whole card is the target
        .onTapGesture { Haptics.impact(.light); onTap() }
        .accessibilityAddTraits(.isButton)
        .accessibilityLabel("\(trip.name), \(trip.date)")
    }
}
```

### Interactive card (React Native)
```tsx
import { Pressable, View, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { tokens } from "../tokens";

export function InteractiveCard({ trip, onPress }: Props) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={style}>
      <Pressable
        accessibilityRole="button"                 // whole card = one target
        accessibilityLabel={`${trip.name}, ${trip.date}`}
        onPressIn={() => (scale.value = withSpring(0.97, tokens.motion.spring.snappy))}
        onPressOut={() => (scale.value = withSpring(1, tokens.motion.spring.snappy))}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // haptic on tap
          onPress();
        }}
        style={{
          padding: tokens.space.md,                 // 16pt
          backgroundColor: tokens.color.bg.surface, // ink-900
          borderRadius: tokens.radius.lg,           // 20pt
          ...tokens.elevation.level1,               // resting shadow
        }}
      >
        <Text style={{ color: tokens.color.text.primary }}>{trip.name}</Text>
        <Text style={{ color: tokens.color.text.secondary }}>{trip.date}</Text>
      </Pressable>
    </Animated.View>
  );
}
```
> **Android/Material note:** iOS shadow recipes map to Material `elevation` (dp) plus a lighter ink surface — keep the surface-lightness step, since Material's default tonal elevation alone reads faint on this dark canvas. RN `borderRadius` is circular (not continuous), which is acceptable.

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Use `ink-900` cards on the `ink-950` app background | Put an `ink-900` card on another `ink-900` card |
| Pad cards 16pt and round to radius-lg 20pt continuous | Use tight 4pt padding and sharp corners |
| Make an interactive card tap as one whole target | Bury a tiny tappable hotspot inside a mostly-static card |
| Press interactive cards to scale 0.97 with `spring-snappy` + `impact light` | Change the card on tap with no motion or haptic feedback |
| Convey depth with a lighter ink surface + soft level-1 shadow | Draw a bright 1pt border to fake elevation on dark |
| Use at most one aurora-gradient hero card per screen | Fill a screen with three competing gradient cards |
| Keep a stat card to one primary number with `.monospacedDigit()` | Cram five equally-bold numbers into one stat card |
| Clip media to the card's radius-lg with a scrim behind overlay text | Let an image spill past the corners or wash out the caption |
| Ensure any standalone tappable card is ≥ 44pt tall | Ship a 30pt-tall tappable card below the touch floor |
| Step surfaces ink-950 → ink-900 → ink-800 for hierarchy | Use the same ink for background, card, and popover |
| Derive nested corner radius as outer − padding | Reuse radius-lg on an inner element inside a padded card |
| Swap blur/glow for solid ink under Reduce Transparency | Keep translucent card effects when Reduce Transparency is on |

## Checklist
- [ ] Card surface is `ink-900`, sitting on the `ink-950` background — no same-ink nesting.
- [ ] Padding is 16pt; radius is radius-lg 20pt continuous.
- [ ] Resting cards use level-1 shadow; depth is surface + shadow, not a border.
- [ ] Interactive cards are one tap target, press to 0.97 (`spring-snappy`) with `impact light`.
- [ ] Interactive cards expose an `isButton` trait and a VoiceOver label.
- [ ] At most one aurora-gradient hero card per screen.
- [ ] Media clips to the card radius; overlay text has a scrim for contrast.
- [ ] Any standalone tappable card is ≥ 44pt tall.
- [ ] Surface hierarchy steps ink-950 → ink-900 → ink-800; nested radius = outer − padding.

## Related
- [13 · Lists & collections](./13-lists-collections.md)
- [12 · Modals, sheets & overlays](./12-modals-sheets-overlays.md)
- [05 · Elevation & materials](./05-elevation-materials.md)
- [03 · Color](./03-color.md)
- [06 · Shape & radius](./06-shape-radius.md)
- [08 · Haptics](./08-haptics.md)
