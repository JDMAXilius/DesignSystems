# 09 · Buttons & actions — Aurora Design System

> Buttons are the most-tapped surfaces in the app: tactile, luminous, and honest about the touch floor.

## Principles

- **Tactile first.** Every button feels pressable — it scales to 0.97 on press with a spring and fires a light haptic. Motion + touch are part of the button, not decoration.
- **One primary per screen.** A single violet-500 primary action owns each screen; everything else is secondary, ghost, or destructive. This is the aurora accent moment.
- **The 44pt floor is non-negotiable.** No button — icon-only included — ships below a 44×44pt tap target, even when the glyph is smaller.
- **Glow is a signature, not a default.** The aurora glow shadow marks at most one hero element per screen (primary CTA or FAB). Spraying it everywhere kills the effect.
- **Label = verb.** Buttons say what they do in sentence case: "Save", "Add card", "Delete account".

## The system

### Variants

| Variant | Background | Text | Border | Pressed | Notes |
|---|---|---|---|---|---|
| Primary | violet-500 `#7C6CFF` | `#FFFFFF` | none | violet-600 `#6551F0` | Optional aurora glow. One per screen. |
| Secondary | transparent | ink-50 `#F4F6FB` | ink-600 `#333B4D` 1pt | bg `rgba(255,255,255,0.06)` | Outline; the default companion action. |
| Tertiary / ghost | transparent | violet-400 `#9788FF` | none | bg `rgba(124,108,255,0.12)` | Low-emphasis, inline actions. |
| Destructive | danger `#F4544E` | `#FFFFFF` | none | `#D8433D` | Confirm with `notification warning` haptic. |

Disabled (any variant): bg ink-800 `#171D2B`, text ink-500 `#4A5266`, no glow, no haptic, no press scale.

### Sizes (44pt floor honored)

| Size | Height | H-padding | Text style | Corner radius | Min width |
|---|---|---|---|---|---|
| sm | 44pt | space-4 (16) | callout 16 | radius-md 14 | 44 |
| md (default) | 48pt | space-5 (20) | headline 17 semibold | radius-md 14 | 64 |
| lg | 56pt | space-6 (24) | headline 17 semibold | radius-md 14 | 88 |

Heights never fall below 44pt. Primary actions default to md (48pt) for comfort. Use continuous corners on iOS.

### States

- **Default → Pressed:** scale to 0.97 with `spring-snappy` (response 0.30, damping 0.85) + `impact light` haptic. Primary/destructive may use `impact medium`.
- **Disabled:** ink-800 bg + ink-500 text, 1.0 scale, no haptic, `accessibilityTraits`/`disabled` set.
- **Loading:** show a spinner, hide the label, and **preserve the button width** so layout doesn't jump. Disable interaction while loading; do not re-fire haptics.

### Icon buttons & FAB

- **Icon-only button:** the glyph is 24pt but the tap target is still 44×44pt — extend with `.contentShape` + padding (SwiftUI) or `hitSlop` (RN). Always give it a VoiceOver label.
- **FAB:** pill shape (`radius-full`), floats above content bottom-right respecting the home-indicator inset, carries the aurora glow, and is the one glowing element on its screen. One FAB per screen max.

### States × variants (exact tokens)

| | Default bg / text | Pressed bg | Disabled bg / text |
|---|---|---|---|
| Primary | `#7C6CFF` / `#FFFFFF` | `#6551F0` | `#171D2B` / `#4A5266` |
| Secondary | transparent / `#F4F6FB` | `rgba(255,255,255,0.06)` | `#171D2B` / `#4A5266` |
| Tertiary | transparent / `#9788FF` | `rgba(124,108,255,0.12)` | transparent / `#4A5266` |
| Destructive | `#F4544E` / `#FFFFFF` | `#D8433D` | `#171D2B` / `#4A5266` |

Aurora glow (primary CTA / active FAB only): soft shadow `0 8 24 rgba(124,108,255,0.35)`.

## Tokens

| DTCG group | Swift | TS |
|---|---|---|
| `color.action.primary.bg` | `Aurora.Color.actionPrimaryBg` | `tokens.color.action.primary.bg` |
| `color.action.primary.bg.pressed` | `Aurora.Color.actionPrimaryBgPressed` | `tokens.color.action.primary.bgPressed` |
| `color.action.secondary.border` | `Aurora.Color.actionSecondaryBorder` | `tokens.color.action.secondary.border` |
| `color.action.tertiary.text` | `Aurora.Color.actionTertiaryText` | `tokens.color.action.tertiary.text` |
| `color.action.destructive.bg` | `Aurora.Color.actionDestructiveBg` | `tokens.color.action.destructive.bg` |
| `radius.md` | `Aurora.Radius.md` | `tokens.radius.md` |
| `space.5` | `Aurora.Spacing.space5` | `tokens.space[5]` |
| `shadow.glow.violet` | `Aurora.Shadow.glowViolet` | `tokens.shadow.glowViolet` |

## Usage

### SwiftUI — primary button style with press scale + haptic

```swift
struct AuroraPrimaryButtonStyle: ButtonStyle {
    var loading: Bool = false
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(Aurora.Font.headline)                 // 17 semibold
            .foregroundStyle(.white)
            .frame(minHeight: 48)                        // md — never below 44
            .frame(maxWidth: .infinity)
            .padding(.horizontal, Aurora.Spacing.space5) // 20pt
            .background(
                RoundedRectangle(cornerRadius: Aurora.Radius.md, style: .continuous)
                    .fill(configuration.isPressed ? Aurora.Color.actionPrimaryBgPressed
                                                  : Aurora.Color.actionPrimaryBg)
            )
            .shadow(color: Aurora.Color.violet500.opacity(0.35), radius: 12, y: 8) // aurora glow
            .scaleEffect(configuration.isPressed && !reduceMotion ? 0.97 : 1.0)
            .animation(.spring(response: 0.30, dampingFraction: 0.85), value: configuration.isPressed)
            .onChange(of: configuration.isPressed) { _, pressed in
                if pressed { UIImpactFeedbackGenerator(style: .light).impactOccurred() }
            }
    }
}

// Usage
Button("Save") { save() }
    .buttonStyle(AuroraPrimaryButtonStyle())
    .accessibilityLabel("Save changes")
```

### React Native — Pressable primary button

```tsx
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { tokens } from '../tokens';

export function AuroraButton({ title, onPress, loading }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={loading}
      onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onPress(); }}
      hitSlop={8}
      style={({ pressed }) => ({
        minHeight: 48,                       // md — never below 44
        paddingHorizontal: tokens.space[5],  // 20
        borderRadius: tokens.radius.md,      // 14
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pressed ? tokens.color.action.primary.bgPressed
                                 : tokens.color.action.primary.bg,
        transform: [{ scale: pressed ? 0.97 : 1 }],
        shadowColor: tokens.color.violet[500],   // aurora glow
        shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 8 },
      })}
    >
      {loading
        ? <View style={{ width: 64 }}><ActivityIndicator color="#FFFFFF" /></View>  // width preserved
        : <Text style={{ color: '#FFFFFF', fontSize: 17, fontWeight: '600' }}>{title}</Text>}
    </Pressable>
  );
}
```

**iOS-first / Android note:** on iOS the press scale + light impact define the feel. On Android/Material, the touch floor is 48dp (already satisfied by md), `expo-haptics` degrades to a limited/no-op vibration, and the primary maps to a Material filled button — keep the violet-500 fill and drop the continuous-corner nuance (RN corners are circular, which is acceptable).

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Keep every button ≥ 44×44pt; use a 44pt sm height for the smallest button. | Ship a 30pt-tall button — it fails the 44pt touch floor. |
| Give an icon-only button a 24pt glyph inside a 44pt target via `hitSlop`/`.contentShape`. | Let the 24pt glyph be the whole tap area, leaving a 24pt target. |
| Use exactly one violet-500 primary per screen. | Stack two primary buttons side by side and make the user guess. |
| Fire `impact light` once on press. | Fire a haptic on every state change or on press-in and press-out. |
| Reserve the aurora glow for the one hero CTA or the FAB. | Add the violet glow shadow to every secondary and ghost button. |
| Preserve button width when swapping the label for a loading spinner. | Let the button shrink to spinner width and reflow the layout. |
| Darken to violet-600 on press for the primary. | Drop opacity to fake a pressed state instead of using the pressed token. |
| Disable with ink-800 bg + ink-500 text and remove the haptic. | Leave a disabled button firing haptics and looking tappable. |
| Label buttons with a sentence-case verb: "Add card". | Use ALL CAPS or vague labels like "OK" / "Submit here". |
| Confirm destructive actions with the danger fill + `notification warning` haptic. | Style a destructive action as a plain ghost button with no color signal. |
| Respect Reduce Motion — skip the 0.97 scale, keep the color change. | Force the spring scale animation when Reduce Motion is on. |
| Keep ≥ 8pt between adjacent buttons. | Butt two buttons edge-to-edge so taps land on the wrong one. |

## Checklist

- [ ] Every button, including icon-only, has a ≥ 44×44pt tap target.
- [ ] Exactly one violet-500 primary action on the screen.
- [ ] Press scales to 0.97 with `spring-snappy` and fires `impact light` once.
- [ ] Loading state preserves width and disables interaction.
- [ ] Disabled uses ink-800 bg + ink-500 text, no haptic, no glow.
- [ ] Aurora glow appears on at most one element (CTA or FAB).
- [ ] Labels are sentence-case verbs.
- [ ] VoiceOver label + button trait set on every action, especially icon-only.
- [ ] Reduce Motion swaps the scale for a plain color change.
- [ ] ≥ 8pt spacing between adjacent targets.

## Related

- [01 · Color](01-color.md)
- [05 · Shape & radius](05-shape-radius.md)
- [08 · Motion & animation](08-motion-animation.md)
- [10 · Forms & inputs](10-forms-inputs.md)
- [11 · Navigation](11-navigation.md)
- [15 · Accessibility](15-accessibility.md)
