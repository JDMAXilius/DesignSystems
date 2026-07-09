# 01 · Platforms and conventions — Aurora Design System
> How Aurora behaves across iOS and Android, SwiftUI and React Native — and exactly where the two must diverge.

Aurora is mobile-only: no web, no desktop. It ships on two runtimes — **SwiftUI** (iOS) and **React Native** (iOS + Android). iOS is the source of truth; Android is supported and first-class but follows Apple's Human Interface Guidelines wherever doing so still feels native on Android, and follows Material only where it must. This doc sets the platform expectations every other doc relies on.

## Principles

**1. iOS-first, Android-aware.** Design the iOS experience against HIG first. Then ask, per surface, "does this feel wrong on Android?" — if yes, take the Material equivalent; if no, keep the iOS behavior. Never design Android-first and retrofit iOS.

**2. Native chrome beats uniform chrome.** Navigation bars, tab bars, back gestures, and system fonts should feel native on each OS. A screen that looks identical pixel-for-pixel on both platforms but feels foreign on one has failed.

**3. One appearance, both platforms.** Aurora's fixed dark look is identical on iOS and Android. SwiftUI pins `.preferredColorScheme(.dark)`; RN sets `UIUserInterfaceStyle=Dark` in `Info.plist` and never reads `useColorScheme()`. Colors are fixed on both.

**4. Divergence is deliberate.** The handful of places iOS and Android must differ are enumerated below. Everything not on that list is identical across platforms, sourced from the same tokens.

## The system

### When to follow HIG vs Material

The rule is simple: HIG by default, Material only where an iOS pattern would feel foreign on Android.

| Situation | Follow |
|---|---|
| Default for any pattern | **Apple HIG** |
| Navigation chrome, back affordance, system font, symbol set on Android | **Material** (only these) |
| Everything else on Android | **HIG-derived**, using Aurora tokens |

How to decide for a new pattern: (1) build the iOS/HIG version first; (2) put it on an Android device and ask "does this feel wrong here?"; (3) if yes, take the Material equivalent and add it to the divergence list below; (4) if no, ship the same behavior on both. The divergence list is closed by default — adding to it is a deliberate, reviewed act, not a convenience.

### Where iOS and Android must diverge

These are the *only* sanctioned divergences. Keep the rest identical.

| Area | iOS (SwiftUI, source of truth) | Android / Material equivalent | React Native approach |
|---|---|---|---|
| Navigation chrome | Large title (34) collapsing to inline (17 semibold); blur-material nav bar | Top app bar, no large-title collapse; solid or elevated bar | `@react-navigation/native-stack` — native large title on iOS, standard header on Android |
| Back affordance | Back chevron + swipe-from-left-edge gesture | System back (gesture/button); no edge-swipe convention | Let native-stack provide per-OS back; don't hand-roll a shared gesture |
| System font | SF Pro (`.system`) | Roboto | `System` font family resolves to SF Pro on iOS, Roboto on Android — never bundle a UI font |
| Icons | SF Symbols via `Image(systemName:)` | SF Symbols unavailable — Lucide-style fallback set (2pt stroke, rounded) | Prefer the fallback set on both platforms for 1:1 parity, or SF Symbols on iOS + fallback on Android (document the choice) |
| Haptics | Full taptic engine (impact / notification / selection) | Limited or absent haptics | `expo-haptics` on iOS; degrade to no-op / coarse vibration on Android — never depend on haptics for meaning |
| Corner style | Continuous corners (the squircle) via `.continuous` | Circular corners only | RN `borderRadius` is circular on both — acceptable; iOS SwiftUI uses `.continuous` |
| Tab bar | Bottom, ~49pt + safe-area inset, blur material | Material bottom navigation | Native tab navigator; blur on iOS, solid ink surface on Android |

### Decision table: situation → iOS → Android → RN

| Situation | iOS behavior | Android / Material equivalent | RN approach |
|---|---|---|---|
| Primary screen navigation | Nav stack, push/pop, large collapsing title | Top app bar + fragment/stack | `createNativeStackNavigator`, `headerLargeTitle: true` (iOS only) |
| Show a set of options from the bottom | Bottom sheet with detents `[.medium, .large]`, grabber | Modal bottom sheet | `@gorhom/bottom-sheet` with snap points; native detents where available |
| Destructive confirm | Action sheet from bottom | Alert dialog / bottom sheet | Native action sheet on iOS, dialog on Android |
| Go back | Edge-swipe + chevron | System back | Native-stack default per OS |
| Numeric readout (timer, price) | SF Mono `.monospacedDigit()` | Roboto Mono, tabular figures | `fontVariant: ['tabular-nums']` |
| Confirm success | Haptic notification success + toast | Toast/snackbar, no haptic | `expo-haptics` iOS, snackbar both |
| Blur behind chrome | `.ultraThinMaterial` nav/tab bar | Solid elevated surface | `expo-blur` `BlurView tint="dark"` on iOS, solid ink-800 on Android |

### Units

Base unit is the **point (pt)** on iOS / **density-independent pixel (dp)** on Android and RN — never px. 1pt = 1 SwiftUI point = 1 RN unitless number. Touch floor is **44pt on iOS / 48dp on Android**.

## Tokens

Platform choices are structural, not token values, but they consume the shared token layer:

- **DTCG source** → `space`, `radius`, `color`, `font` groups (single mode, no `$modes`).
- **SwiftUI** → `Aurora.Spacing.*`, `Aurora.Radius.*`, `Aurora.Color.*`, `Aurora.Font.*`.
- **React Native** → `tokens.space.*`, `tokens.radius.*`, `tokens.color.*`, `tokens.font.*`.

The same value (e.g. `radius-md` = 14pt) is emitted to both; only the *rendering* differs (continuous vs circular corners).

## Usage

Platform-appropriate defaults: locked dark appearance, native title behavior, System font.

```swift
import SwiftUI

@main
struct AuroraApp: App {
    var body: some Scene {
        WindowGroup {
            NavigationStack {
                HomeView()
                    .navigationTitle("Today")          // large title collapses on scroll (iOS-native)
                    .navigationBarTitleDisplayMode(.large)
            }
            .preferredColorScheme(.dark)               // lock Aurora's fixed dark appearance
            .tint(Aurora.Color.violet500)              // primary tint, brand not OS-derived
        }
    }
}
```

```tsx
// App.tsx — RN. Info.plist: UIUserInterfaceStyle = Dark. Never read useColorScheme().
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { tokens } from './tokens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLargeTitle: true,                     // native large title on iOS; standard header on Android
          headerTransparent: true,                    // pairs with blur chrome on iOS
          headerTintColor: tokens.color.violet[500],
          contentStyle: { backgroundColor: tokens.color.bg.app }, // ink-950, fixed
        }}>
        <Stack.Screen name="Today" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

Android note: `headerLargeTitle` is ignored on Android (no large-title collapse) and the System font resolves to Roboto — both are expected divergences, not bugs.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Default to HIG, then take the Material equivalent only for the seven listed divergences | Don't invent a hybrid nav bar that matches neither platform |
| Use `@react-navigation/native-stack` so back gesture and title behavior are native per OS | Don't hand-build one shared swipe-back gesture and force it onto Android |
| Let `System` resolve to SF Pro on iOS and Roboto on Android | Don't bundle a custom UI font "for consistency" and break Dynamic Type |
| Keep the fallback icon set 1:1 with SF Symbols and document which option you chose | Don't assume SF Symbols exist on Android — they don't |
| Treat haptics as enhancement; convey the same meaning without them | Don't gate a success state behind a haptic that Android may not fire |
| Use `.continuous` corners in SwiftUI; accept circular `borderRadius` in RN | Don't try to fake continuous corners in RN with masks and shadows |
| Pin `.preferredColorScheme(.dark)` / `UIUserInterfaceStyle=Dark` on both platforms | Don't read `useColorScheme()` or branch UI on the OS theme |
| Use pt/dp for every dimension | Don't hardcode px or device-pixel math into layouts |
| Put blur chrome on iOS and a solid ink surface on Android | Don't ship a heavy blur on Android where it stutters — fall back to ink-800 |
| Keep everything not on the divergence list identical across platforms | Don't let iOS and RN quietly drift to different spacing or colors |

## Checklist

- [ ] Did you design the iOS/HIG behavior first, then add Android notes only where required?
- [ ] Are you using only the seven sanctioned divergences, and is everything else identical?
- [ ] Is navigation from `native-stack` so back and titles are per-OS native?
- [ ] Does the System font resolve to SF Pro (iOS) / Roboto (Android) with Dynamic Type intact?
- [ ] Is the icon strategy (fallback-both vs SF-plus-fallback) chosen and documented?
- [ ] Are haptics enhancement-only, with meaning preserved when absent?
- [ ] Is the app locked to Aurora's fixed dark appearance on both platforms?
- [ ] Are all dimensions in pt/dp and sourced from shared tokens?

## Related

- [00-design-principles.md](00-design-principles.md) — the principles this platform stance serves
- [02-color.md](02-color.md) — the single-mode palette both platforms render
- [03-typography.md](03-typography.md) — SF Pro / Roboto and Dynamic Type across platforms
