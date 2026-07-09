# 12 · Modals, sheets & overlays — Aurora Design System
> How Aurora presents transient, layered content — sheets, covers, alerts, action sheets, popovers, and toasts — over the fixed midnight canvas.

## Principles
- **Stay in context.** Prefer a bottom sheet with detents over a full takeover; let people see where they came from.
- **Always offer two ways out.** Every dismissible overlay supports swipe-down and an explicit button; nothing traps the user.
- **Layer with light and blur.** Depth on dark = a lighter ink surface, a soft shadow, and a blur material behind — not a heavy border.
- **Reserve interruption for what matters.** Alerts block the whole screen; use them only for decisions or destructive confirms, never for status.
- **Respect the edges.** Sheets, covers, and toasts honor the top (Dynamic Island) and bottom (home indicator) safe-area insets.

## The system

### Surface catalog
| Surface | When | Detents / size | Dismiss | Elevation |
|---|---|---|---|---|
| Bottom sheet | Focused sub-task, pickers, details | `.medium` and `.large` | Swipe-down + button | level-4 |
| Full-screen cover | Immersive flow, onboarding, media | Full | Explicit Close/Done only | level-4 |
| Alert | Decision or destructive confirm | Native centered | Action buttons only | level-4 (alert layer) |
| Action sheet | 2–6 contextual actions | Bottom list → iPad popover | Cancel + tap-outside | level-4 |
| Popover | Small contextual content, iPad | Anchored, arrow | Tap-outside | level-3 |
| Toast | Brief confirmation / passive info | Top or bottom pill | Auto ~4s + swipe | level-5 |

### Bottom sheet anatomy
- Top corners **radius-xl 28pt** continuous; bottom flush to screen edge.
- **Grabber handle**: 36×5pt pill, `ink-600 #333B4D`, centered 8pt from top; signals draggability.
- Surface `ink-800 #171D2B` with **blur material** behind (level-4) and shadow `0 12 32 rgba(0,0,0,0.5)`.
- Content inset 16pt horizontal; respects bottom safe area (~34pt home indicator).
- Detents: **medium** (~half height) and **large** (near-full). Start at medium for glanceable tasks.
- Motion: present/dismiss with `spring-smooth` (response 0.40, damping 0.90).

### Scrim & focus locking
- Scrim behind every modal surface: **`rgba(5,8,14,0.6)`** (bg-overlay-scrim). Tap scrim dismisses sheets/action sheets, not alerts.
- While a modal is open, **lock background scroll** and trap focus/VoiceOver inside the presented surface; restore focus to the trigger on dismiss.
- Layer order: scrim 40 · sheet/modal 50 · alert 60 · toast 70.

### Alerts & action sheets
- **Alert**: native, centered — title (required) + optional message + up to **3 actions**. A destructive action uses `.destructive` role (danger `#F4544E` text). Include one cancel. Fire `notification warning` haptic on a destructive confirm.
- **Action sheet**: bottom-anchored action list on iPhone; **automatically becomes a popover on iPad**. Group destructive last, Cancel separated.

### Toasts
- Surface `ink-800`, level-5 shadow `0 16 40 rgba(0,0,0,0.55)`, radius-full or radius-md pill.
- Position **top or bottom**, always inside the safe-area inset. Auto-dismiss **~4s**; max **1–2** on screen.
- Never use a toast for errors that need an action — those require an alert or inline message. Pair status color with an icon (never color alone).

## Tokens
| Concept | DTCG group | Swift | TS |
|---|---|---|---|
| Scrim | `color.bg.overlay.scrim` | `Aurora.Color.bgOverlayScrim` | `tokens.color.bg.overlay.scrim` |
| Sheet surface | `color.bg.surface.raised` | `Aurora.Color.bgSurfaceRaised` | `tokens.color.bg.surface.raised` |
| Grabber | `color.border.default` | `Aurora.Color.borderDefault` | `tokens.color.border.default` |
| Sheet radius | `radius.xl` | `Aurora.Radius.xl` | `tokens.radius.xl` |
| Sheet elevation | `elevation.level4` | `Aurora.Shadow.level4` | `tokens.elevation.level4` |
| Toast elevation | `elevation.level5` | `Aurora.Shadow.level5` | `tokens.elevation.level5` |
| Danger action | `color.action.destructive.bg` | `Aurora.Color.actionDestructiveBg` | `tokens.color.action.destructive.bg` |
| Sheet spring | `motion.spring.smooth` | `Aurora.Spring.smooth` | `tokens.motion.spring.smooth` |

## Usage

### Bottom sheet with detents (SwiftUI)
```swift
struct DetailSheetHost: View {
    @State private var showSheet = false
    var body: some View {
        Button("Show details") { showSheet = true }
            .sheet(isPresented: $showSheet) {
                DetailSheet()
                    .presentationDetents([.medium, .large])
                    .presentationDragIndicator(.visible)       // grabber handle
                    .presentationCornerRadius(Aurora.Radius.xl) // 28pt continuous
                    .presentationBackground(.ultraThinMaterial) // blur, level-4
            }
    }
}

struct DetailSheet: View {
    @Environment(\.dismiss) private var dismiss
    var body: some View {
        VStack(spacing: Aurora.Spacing.md) {
            Text("Trip details").font(Aurora.Font.title3)
            // ...content...
            Button("Done") { dismiss() }                       // explicit dismiss
                .buttonStyle(.primary)
        }
        .padding(Aurora.Spacing.md)
        .presentationBackground(.ultraThinMaterial)
    }
}
```

### Bottom sheet with detents (React Native)
```tsx
import BottomSheet from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { useRef, useMemo, useCallback } from "react";
import { tokens } from "../tokens";

export function DetailSheet() {
  const ref = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "90%"], []); // medium, large detents
  const renderBg = useCallback(
    (p: any) => <BlurView tint="dark" intensity={40} {...p} />, // level-4 blur
    []
  );
  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose            // swipe-down dismiss
      handleIndicatorStyle={{ backgroundColor: tokens.color.border.default }} // grabber
      backgroundComponent={renderBg}
      style={{ borderTopLeftRadius: tokens.radius.xl, borderTopRightRadius: tokens.radius.xl }}
      animationConfigs={tokens.motion.spring.smooth}
    >
      {/* content; respects bottom safe area via contentInset */}
    </BottomSheet>
  );
}
```

### Alert & action sheet (SwiftUI)
```swift
.alert("Delete trip?", isPresented: $confirmDelete) {
    Button("Delete", role: .destructive) {
        Haptics.notify(.warning)   // warning haptic on destructive confirm
        delete()
    }
    Button("Cancel", role: .cancel) { }
} message: {
    Text("This can't be undone.")
}
.confirmationDialog("Trip options", isPresented: $showActions, titleVisibility: .visible) {
    Button("Share") { share() }
    Button("Duplicate") { duplicate() }
    Button("Delete", role: .destructive) { confirmDelete = true }
    Button("Cancel", role: .cancel) { }
} // iPhone → bottom sheet list; iPad → popover automatically
```

### Native alert (React Native)
```tsx
import { Alert } from "react-native";
import * as Haptics from "expo-haptics";

function confirmDelete(onDelete: () => void) {
  Alert.alert(
    "Delete trip?",
    "This can't be undone.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive", // danger styling, iOS-native
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          onDelete();
        },
      },
    ],
    { cancelable: true }
  );
}
```
> **Android/Material note:** iOS action sheets map to a Material bottom sheet or menu; toasts map to Snackbars (a Snackbar with an action is acceptable, but still never the sole path for a blocking error). RN `Alert` renders a Material dialog on Android.

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Show a grabber handle and support swipe-down on every sheet | Present a sheet that can only be dismissed by a hidden gesture |
| Start pickers at the `.medium` detent so context stays visible | Force every sheet to `.large` and cover the whole screen |
| Round sheet top corners to radius-xl 28pt continuous | Use square corners or a tiny radius that reads as a full page |
| Use scrim `rgba(5,8,14,0.6)` and lock background scroll | Leave the background scrollable and interactive under the scrim |
| Give destructive alert actions the `.destructive` role + warning haptic | Style a delete button like a normal action with no haptic |
| Cap on-screen toasts at 1–2 and auto-dismiss after ~4s | Stack five toasts that linger until the user swipes each away |
| Use an alert or inline message for errors needing action | Fire a 4-second toast for a failure the user must resolve |
| Keep sheet/toast content inside the bottom safe-area inset (~34pt) | Let a toast or CTA sit under the home indicator |
| Let action sheets become popovers on iPad automatically | Hard-code a bottom action list that floats awkwardly on iPad |
| Restore focus/VoiceOver to the trigger element on dismiss | Drop VoiceOver focus to the top of the screen after closing |
| Put blur material behind sheets (swap to solid ink-800 for Reduce Transparency) | Ship a translucent sheet that ignores Reduce Transparency |
| Limit alerts to a title, message, and ≤3 actions | Cram five buttons and a paragraph into a native alert |

## Checklist
- [ ] Every dismissible surface supports swipe-down **and** an explicit button.
- [ ] Bottom sheet uses `.medium`/`.large` detents, grabber handle, radius-xl top corners.
- [ ] Scrim is `rgba(5,8,14,0.6)`; background scroll and focus are locked while open.
- [ ] Sheet/modal surfaces use blur (level-4) with a Reduce-Transparency solid fallback.
- [ ] Destructive actions use the destructive role and a `notification warning` haptic.
- [ ] Toasts: max 1–2, ~4s auto-dismiss, inside safe area, never for actionable errors.
- [ ] Action sheets become popovers on iPad; alerts have ≤3 actions.
- [ ] Present/dismiss motion uses `spring-smooth`; respects Reduce Motion.
- [ ] VoiceOver focus is trapped inside the surface and restored to the trigger on close.

## Related
- [11 · Navigation](./11-navigation.md)
- [13 · Lists & collections](./13-lists-collections.md)
- [14 · Cards & surfaces](./14-cards-surfaces.md)
- [05 · Elevation & materials](./06-elevation-depth-materials.md)
- [07 · Motion](./07-motion-haptics.md)
- [08 · Haptics](./07-motion-haptics.md)
