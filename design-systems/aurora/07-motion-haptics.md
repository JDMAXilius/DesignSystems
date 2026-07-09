# 07 · Motion & haptics — Aurora Design System
> Spring-physics motion and precisely-timed haptics that make every Aurora surface feel tactile and alive.

## Principles
- **Spring-first.** Motion is physics, not fixed curves. Springs give Aurora its tactile, responsive feel; durations are the exception, not the rule.
- **Transform and opacity only.** Animate scale, translate, and opacity — they're cheap and smooth. Avoid animating layout or color-heavy properties.
- **Press feedback is universal.** Every pressable element dips to 0.97 scale on touch-down with a snappy spring.
- **Haptics punctuate, they don't narrate.** A haptic marks a meaningful moment — a tap, a toggle, a success — never a scroll or a keystroke.
- **Respect Reduce Motion.** When it's on, swap springs for quick fades and drop large movement.

## The system

### Spring tokens
Primary motion is spring physics (SwiftUI `.spring(response:dampingFraction:)`; RN Reanimated `withSpring`).
| Token | response | dampingFraction | Use |
|---|---|---|---|
| spring-snappy | 0.30 | 0.85 | buttons, toggles, taps |
| spring-smooth | 0.40 | 0.90 | sheets, screen transitions |
| spring-bouncy | 0.50 | 0.72 | pull-to-refresh, playful reveals |

### Non-spring durations (fades / color)
- micro **150ms** · standard **250ms** · sheet **350ms**. Easing: ease-out on enter.

### Press-scale pattern
- On touch-down, scale to **0.97** with `spring-snappy`; release returns to 1.0. Animate transform + opacity together.

### Reduce Motion
- SwiftUI: `@Environment(\.accessibilityReduceMotion)`. RN: `AccessibilityInfo.isReduceMotionEnabled()` + the `reduceMotionChanged` listener.
- When on: replace springs/large motion with a quick opacity fade (micro 150ms) and disable parallax, slide-in, and big scale changes.

### Haptics — generators
- **Impact** (`UIImpactFeedbackGenerator`): light · medium · heavy · soft · rigid.
- **Notification** (`UINotificationFeedbackGenerator`): success · warning · error.
- **Selection** (`UISelectionFeedbackGenerator`): selection changed.

### Haptics — WHEN rules
| Trigger | Haptic |
|---|---|
| Primary button tap | impact (light/medium) |
| Toggle / segmented / picker change | selection |
| Successful submit | notification **success** |
| Destructive confirm | notification **warning** |
| Error / failed action | notification **error** |
| Drag pick-up | impact **rigid** |

Never fire haptics on scroll, on every keystroke, or more than once per user action.

### Android/Material note
RN uses `expo-haptics` on iOS. On Android haptics **degrade** — the vibration API is coarser, notification/selection nuance is limited, and device support varies. Treat haptics as an iOS enhancement; degrade to a light vibration or no-op on Android, never a required signal.

## Tokens
DTCG groups `motion.spring` and `motion.duration`.

```json
{ "motion": {
  "spring": {
    "snappy": { "$value": { "response": 0.30, "damping": 0.85 }, "$type": "spring" },
    "smooth": { "$value": { "response": 0.40, "damping": 0.90 }, "$type": "spring" },
    "bouncy": { "$value": { "response": 0.50, "damping": 0.72 }, "$type": "spring" }
  },
  "duration": {
    "micro": { "$value": "150", "$type": "duration" },
    "standard": { "$value": "250", "$type": "duration" },
    "sheet": { "$value": "350", "$type": "duration" }
  }
}}
```
| DTCG | Swift | TypeScript |
|---|---|---|
| `motion.spring.snappy` | `Aurora.Spring.snappy` | `tokens.motion.spring.snappy` |
| `motion.spring.smooth` | `Aurora.Spring.smooth` | `tokens.motion.spring.smooth` |
| `motion.spring.bouncy` | `Aurora.Spring.bouncy` | `tokens.motion.spring.bouncy` |
| `motion.duration.micro` | `Aurora.Duration.micro` | `tokens.motion.duration.micro` |

## Usage
A primary button: press-scale-to-0.97 with a snappy spring, impact haptic on tap, honoring Reduce Motion.

```swift
struct PrimaryButton: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    let title: String; let action: () -> Void
    @State private var pressed = false

    var body: some View {
        Text(title)
            .font(Aurora.Font.headline).foregroundStyle(.white)
            .padding(.vertical, 14).frame(maxWidth: .infinity)
            .background(Aurora.Color.violet500, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
            .scaleEffect(pressed && !reduceMotion ? 0.97 : 1.0)
            .animation(reduceMotion ? .easeOut(duration: 0.15) : .spring(response: 0.30, dampingFraction: 0.85), value: pressed)
            .sensoryFeedback(.impact(weight: .medium), trigger: pressed) // haptic on tap
            .onLongPressGesture(minimumDuration: 0, pressing: { pressed = $0 }, perform: action)
    }
}
// Success submit: UINotificationFeedbackGenerator().notificationOccurred(.success)
```

```tsx
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { Pressable, Text, AccessibilityInfo } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { tokens } from '../tokens';

export function PrimaryButton({ title, onPress }: { title: string; onPress: () => void }) {
  const scale = useSharedValue(1);
  const [reduce, setReduce] = useState(false);
  useEffect(() => { AccessibilityInfo.isReduceMotionEnabled().then(setReduce); }, []);

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const to = (v: number) => (reduce ? withTiming(v, { duration: 150 }) : withSpring(v, { damping: 0.85, stiffness: 300 }));

  return (
    <Pressable
      onPressIn={() => { scale.value = to(reduce ? 1 : 0.97); }}
      onPressOut={() => { scale.value = to(1); }}
      onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); onPress(); }}> {/* haptic on tap */}
      <Animated.View style={[{ paddingVertical: 14, borderRadius: 14, alignItems: 'center',
                               backgroundColor: tokens.color.violet[500] }, style]}>
        <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}
// Success: Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
```

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Use `spring-snappy` (0.30 / 0.85) for button and toggle feedback | Don't animate a tap with a 400ms linear tween — it feels dead |
| Dip pressables to 0.97 scale on touch-down | Don't scale a button to 0.8 — it looks broken, not tactile |
| Animate transform and opacity | Don't animate width/height/color where a scale or fade would do |
| Fire an impact haptic on primary tap | Don't fire a haptic on every scroll frame |
| Use selection haptic for toggles and pickers | Don't use a heavy impact for a small toggle flip |
| Use notification success on a completed submit | Don't buzz success and error for the same action |
| Swap springs for a 150ms fade when Reduce Motion is on | Don't keep a big slide-in animation running with Reduce Motion enabled |
| Treat Android haptics as a degradable enhancement | Don't make a haptic the only confirmation of a critical action |
| Fire at most one haptic per user action | Don't chain three haptics on a single button press |
| Use `spring-smooth` for sheet and screen transitions | Don't use `spring-bouncy` for a settings sheet — it feels unserious |

## Checklist
- [ ] Interactive motion uses a spring token, not an ad-hoc duration.
- [ ] Pressables scale to 0.97 on touch-down.
- [ ] Only transform and opacity are animated.
- [ ] Each haptic maps to a rule (tap→impact, toggle→selection, success/warning/error→notification).
- [ ] No haptics on scroll, keystroke, or repeated within one action.
- [ ] Reduce Motion swaps springs for quick fades and disables large motion.
- [ ] Android haptics degrade gracefully and aren't the sole signal.
- [ ] Sheet/screen transitions use spring-smooth.

## Related
- [04 · Layout, spacing & safe areas](./04-layout-spacing-safe-areas.md)
- [05 · Iconography & SF Symbols](./05-iconography-sf-symbols.md)
- [06 · Elevation, depth & materials](./06-elevation-depth-materials.md)
- [08 · Touch, gestures & targets](./08-touch-gestures-targets.md)
