# 08 · Touch, gestures & targets — Aurora Design System
> The 44pt touch floor and the native iOS gestures — tap, long-press, swipe, drag, pull-to-refresh, edge-back — that make Aurora feel direct.

## Principles
- **44pt is the floor.** Every interactive element has at least a 44×44pt tap area, no matter how small the glyph looks.
- **Extend, don't enlarge.** Keep small visuals small; grow the *hit area* around them with content shape / hitSlop.
- **Space targets apart.** At least 8pt between adjacent targets so fingers don't hit the wrong one.
- **Gestures are native.** Use the iOS gestures users already know — edge-swipe back, swipe-to-delete, pull-to-refresh — rather than inventing new ones.
- **Never fight the scroll.** A custom gesture must not steal a scroll or the system back-swipe.

## The system

### Touch targets (hard floor)
- **Minimum 44×44pt** (iOS HIG). **Android/Material note:** 48×48dp minimum — size to the larger floor when shipping cross-platform.
- **Primary actions ≥ 48pt tall** for comfort.
- **Min 8pt spacing** between adjacent targets.
- If the visual is smaller than 44pt, extend the tap area:
  - SwiftUI: `.contentShape(Rectangle())` + `.padding` (padding enlarges the frame, contentShape makes the padded area tappable), or a `.frame(minWidth:44, minHeight:44)`.
  - RN: `hitSlop={{ top, bottom, left, right }}` to grow the touch region beyond the visual bounds.

### Gestures
| Gesture | Use | iOS behavior |
|---|---|---|
| Tap | primary activation | immediate; pair with press-scale + haptic |
| Long-press | context menu / preview | ~0.5s; haptic on trigger |
| Swipe | reveal actions | **swipe-to-delete** on list rows (trailing) |
| Drag / reorder | move list items | pick-up haptic (impact rigid), lift + spring |
| Pull-to-refresh | reload a scroll view | spring-bouncy overscroll |
| Swipe-from-edge | back navigation | left-edge → pop; don't block it |

### Gesture conflicts with scroll
- Vertical scroll owns vertical drags in a scroll view; a horizontal row-swipe must be clearly horizontal to engage.
- Never attach a custom pan that competes with the scroll axis or the left-edge back gesture.
- On iOS the interactive pop gesture starts from the left screen edge — keep that zone free of horizontal controls.

### Android/Material note
Android uses a 48dp target and Material's ripple for press feedback; the system back is a gesture/button handled by navigation, not an app edge-swipe. In React Native, `react-native-gesture-handler` provides consistent tap/pan/long-press across both platforms.

## Tokens
DTCG group `target` (touch floors and spacing).

```json
{ "target": {
  "min":     { "$value": "44", "$type": "dimension", "$description": "iOS minimum touch target" },
  "min-android": { "$value": "48", "$type": "dimension", "$description": "Android/Material minimum" },
  "primary": { "$value": "48", "$type": "dimension", "$description": "Comfortable primary action height" },
  "gap":     { "$value": "8",  "$type": "dimension", "$description": "Min spacing between targets" }
}}
```
| DTCG | Swift | TypeScript |
|---|---|---|
| `target.min` | `Aurora.Target.min` | `tokens.target.min` (44) |
| `target.primary` | `Aurora.Target.primary` | `tokens.target.primary` (48) |
| `target.gap` | `Aurora.Target.gap` | `tokens.target.gap` (8) |

## Usage
A small (24pt) icon-only button given a full 44pt target, plus swipe-to-delete on a row.

```swift
// 24pt glyph, 44pt tap target.
Button(action: close) {
    Image(systemName: "xmark")
        .font(.system(size: Aurora.IconSize.lg)) // 24
        .foregroundStyle(Aurora.Color.textPrimary)
        .frame(width: Aurora.Target.min, height: Aurora.Target.min) // 44×44
        .contentShape(Rectangle()) // whole 44pt area is tappable
}
.accessibilityLabel("Close")

// Swipe-to-delete on a list row (trailing), with the system edge-back left intact.
List {
    ForEach(items) { item in
        Text(item.title)
            .swipeActions(edge: .trailing) {
                Button(role: .destructive) { delete(item) } label: { Label("Delete", systemImage: "trash") }
            }
    }
    .onMove { moveItems($0, $1) } // drag to reorder
}
.refreshable { await reload() } // pull-to-refresh
```

```tsx
import { Pressable, Text, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { X, Trash2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { tokens } from '../tokens';

// 24pt glyph, 44pt tap target via hitSlop.
function CloseButton({ onPress }: { onPress: () => void }) {
  const slop = (tokens.target.min - tokens.icon.size.lg) / 2; // (44 - 24) / 2 = 10
  return (
    <Pressable
      accessibilityLabel="Close"
      hitSlop={{ top: slop, bottom: slop, left: slop, right: slop }}
      onPress={onPress}
      style={{ width: tokens.icon.size.lg, height: tokens.icon.size.lg, alignItems: 'center', justifyContent: 'center' }}>
      <X size={tokens.icon.size.lg} color={tokens.color.text.primary} strokeWidth={2} />
    </Pressable>
  );
}

// Swipe-to-delete row.
function DeletableRow({ title, onDelete }: { title: string; onDelete: () => void }) {
  const RightAction = () => (
    <Pressable
      onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); onDelete(); }}
      style={{ backgroundColor: tokens.color.danger, justifyContent: 'center', paddingHorizontal: tokens.space.md }}>
      <Trash2 size={tokens.icon.size.lg} color="#FFFFFF" />
    </Pressable>
  );
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={RightAction}>
        <View style={{ paddingVertical: tokens.space.sm, paddingHorizontal: tokens.space.md,
                       backgroundColor: tokens.color.bg.surface }}>
          <Text style={{ color: tokens.color.text.primary }}>{title}</Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
```

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Give a 24pt glyph a 44pt tap target with `.frame`/`hitSlop` | Don't ship a 30pt icon-only button — it fails the 44pt floor |
| Extend the hit area while keeping the glyph small | Don't scale the icon up to 44pt just to make it tappable |
| Keep at least 8pt between adjacent targets | Don't place two icon buttons 2pt apart — fingers mis-hit |
| Make primary actions ≥ 48pt tall | Don't ship a 32pt primary CTA that's hard to hit one-handed |
| Put destructive swipe actions on the trailing edge | Don't hide delete behind a leading swipe where back-swipe lives |
| Leave the left screen edge free for the system back gesture | Don't attach a horizontal slider along the left edge |
| Let vertical scroll own vertical drags | Don't add a vertical pan that fights the scroll view |
| Fire a warning haptic on destructive swipe confirm | Don't delete silently with no haptic or confirmation |
| Use `react-native-gesture-handler` for consistent cross-platform gestures | Don't mix raw `PanResponder` and gesture-handler in one screen |
| Size to 48dp when the same button ships on Android | Don't assume the 44pt iOS floor is enough on Android |

## Checklist
- [ ] Every interactive element has a ≥44pt (≥48dp Android) tap area.
- [ ] Small glyphs are extended with contentShape/frame or hitSlop.
- [ ] Adjacent targets have ≥8pt spacing.
- [ ] Primary actions are ≥48pt tall.
- [ ] Swipe-to-delete is on the trailing edge; leading edge stays clear.
- [ ] The left screen edge is free for the system back-swipe.
- [ ] Custom gestures don't fight scroll or edge-back.
- [ ] Destructive gestures fire a warning haptic and are reversible/confirmed.

## Related
- [04 · Layout, spacing & safe areas](./04-layout-spacing-safe-areas.md)
- [05 · Iconography & SF Symbols](./05-iconography-sf-symbols.md)
- [06 · Elevation, depth & materials](./06-elevation-depth-materials.md)
- [07 · Motion & haptics](./07-motion-haptics.md)
