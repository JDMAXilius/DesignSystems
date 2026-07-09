# 18 · React Native implementation — Aurora Design System

> How to build Aurora in React Native / Expo: project setup, consuming the generated `tokens.ts`, locking the dark appearance, and shipping native-feeling components.

## Principles
- **Native over reimplemented.** Reach for the platform's real controls and native modules (react-navigation native stack, gesture-handler, expo-haptics) before rebuilding them in JS. iOS is the truth; Android is aware.
- **Tokens are the only source of values.** Components consume `tokens.ts` — the typed theme object generated from the same DTCG source as the Swift build. Never hardcode a hex or a pt value.
- **Semantic, not primitive.** Components read `tokens.color.action.primary.bg`, not `tokens.color.violet[500]`. Primitives are for building semantics, not for screens.
- **One fixed appearance.** Aurora is single-mode dark. Never call `useColorScheme()`; lock the app so the OS light/dark setting cannot change it.
- **Tactile by default.** 44pt touch floor, spring press feedback, and iOS haptics are part of every interactive component — and degrade gracefully on Android.

## The system

### Project setup (Expo)
Aurora targets an Expo (or bare React Native) app. Install the native stack Aurora relies on:

```bash
npx create-expo-app aurora-app
npx expo install \
  react-native-safe-area-context \
  react-native-reanimated \
  react-native-gesture-handler \
  expo-haptics \
  expo-blur \
  expo-linear-gradient \
  @react-navigation/native @react-navigation/native-stack
```

| Package | Aurora role |
|---|---|
| `react-native-safe-area-context` | Safe-area insets on all four edges (notch, Dynamic Island, home indicator) |
| `react-native-reanimated` | Spring press feedback (`withSpring`), sheet/transition motion |
| `react-native-gesture-handler` | Native gestures: swipe-back, sheet drag, pull-to-refresh |
| `expo-haptics` | iOS impact / selection / notification haptics (no-op-safe on Android) |
| `expo-blur` | `BlurView` materials for nav/tab bars and sheets over scrolling content |
| `expo-linear-gradient` | The signature aurora gradient (hero moments, one per screen) |
| `@react-navigation/native-stack` | Native push/pop stack with large-title collapse and edge-swipe back |

Reanimated requires its Babel plugin as the **last** entry in `babel.config.js`, and gesture-handler must be imported first in the app entry.

### Locking the appearance (single mode — critical)
Aurora defines one fixed dark appearance. Do **not** read `useColorScheme()` and never branch colors on it. Instead:

1. **Info.plist / app config** — force the system chrome to dark so status bar, keyboards, and native menus match:

```json
// app.json (Expo)
{ "expo": { "userInterfaceStyle": "dark", "ios": { "infoPlist": { "UIUserInterfaceStyle": "Dark" } } } }
```

2. **Fixed colors** — every color comes from `tokens.ts`, which carries exactly one value per token. There is no light palette to fall back to.

3. **Status bar** — set `<StatusBar style="light" />` once at the root (light glyphs on the dark canvas).

### Touch, motion & haptics (from the foundations)
- Minimum touch target **44×44pt** (Android/Material equivalent: 48dp). If a glyph is smaller, extend the tap area with `hitSlop`.
- Press feedback: scale to **0.97** with `spring-snappy` (`withSpring`, response 0.30 / damping 0.85).
- Haptics are iOS-signature: primary tap → impact light/medium; selection change → selection; success → notification success. On Android, `expo-haptics` degrades to limited/no-op — never make a flow depend on a haptic firing.
- Always respect Reduce Motion (`AccessibilityInfo.isReduceMotionEnabled`) — swap the spring for an instant state change.

## Tokens

### Consuming the generated `tokens.ts`
The Style Dictionary build emits `rn/tokens.ts`: a typed, frozen theme object. Import it directly — a plain module import is the simplest, tree-shakeable pattern and needs no provider because Aurora has one fixed theme.

```tsx
// tokens.ts (generated — do not edit by hand)
export const tokens = {
  color: {
    bg: { app: '#0A0E17', surface: '#10151F', surfaceRaised: '#171D2B' },
    text: { primary: '#F4F6FB', secondary: '#9AA3BF', tertiary: '#6B7488', onViolet: '#FFFFFF' },
    action: {
      primary: { bg: '#7C6CFF', bgPressed: '#6551F0', text: '#FFFFFF' },
      secondary: { border: '#333B4D', text: '#F4F6FB', bgPressed: 'rgba(255,255,255,0.06)' },
      destructive: { bg: '#F4544E', bgPressed: '#D8433D', text: '#FFFFFF' },
    },
    border: { hairline: '#232A3A', default: '#333B4D' },
    violet: { 400: '#9788FF', 500: '#7C6CFF', 600: '#6551F0' },
    teal: { 500: '#2FE0C0' }, pink: { 500: '#FF6FB5' },
  },
  space: { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 },
  radius: { sm: 10, md: 14, lg: 20, xl: 28, full: 9999 },
} as const;

export type Tokens = typeof tokens;
```

| DTCG | TypeScript access | Value |
|---|---|---|
| `color.action.primary.bg` | `tokens.color.action.primary.bg` | `#7C6CFF` |
| `color.action.primary.bg-pressed` | `tokens.color.action.primary.bgPressed` | `#6551F0` |
| `color.text.primary` | `tokens.color.text.primary` | `#F4F6FB` |
| `space.4` | `tokens.space.md` | `16` |
| `radius.md` | `tokens.radius.md` | `14` |

### The modern approach — NativeWind + copy-paste components
Two distribution styles, both fed by the same tokens:

- **NativeWind (Tailwind) preset.** The build also emits `tailwind.preset.js` from the tokens, so `bg-action-primary`, `p-md`, and `rounded-md` map to Aurora values. Class names stay in sync with the design system because the preset is generated, not hand-authored.
- **Copy-paste components.** Aurora ships components you copy into your repo (`components/ui/`) and own — the same distribution model as **gluestack-ui** and **shadcn/ui**. You get the source, styled with tokens, and edit it freely rather than importing an opaque npm package. This keeps the component tree native and inspectable.

```tsx
// tailwind.config.js
module.exports = { presets: [require('./aurora.tailwind.preset.js')], content: ['./app/**/*.{tsx,ts}'] };
```

## Usage

### A reusable `<AuroraButton>`
Primary / secondary / destructive variants, a 44pt floor, spring press scale, and an iOS haptic on press — all from tokens.

```tsx
import { useCallback } from 'react';
import { Pressable, Text, Platform, AccessibilityInfo } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { tokens } from '../tokens';

type Variant = 'primary' | 'secondary' | 'destructive';
const SNAPPY = { mass: 1, damping: 18, stiffness: 320 }; // ≈ spring-snappy

const VARIANTS = {
  primary:     { bg: tokens.color.action.primary.bg,     pressed: tokens.color.action.primary.bgPressed,     fg: tokens.color.action.primary.text,     border: 'transparent' },
  secondary:   { bg: 'transparent',                       pressed: tokens.color.action.secondary.bgPressed,   fg: tokens.color.action.secondary.text,   border: tokens.color.action.secondary.border },
  destructive: { bg: tokens.color.action.destructive.bg, pressed: tokens.color.action.destructive.bgPressed, fg: tokens.color.action.destructive.text, border: 'transparent' },
} as const;

export function AuroraButton({ label, variant = 'primary', onPress, disabled }: {
  label: string; variant?: Variant; onPress?: () => void; disabled?: boolean;
}) {
  const v = VARIANTS[variant];
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const press = useCallback(async () => {
    // Haptics are iOS-signature; expo-haptics degrades safely on Android.
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(
        variant === 'primary' ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light,
      );
    }
    onPress?.();
  }, [onPress, variant]);

  const animateTo = async (to: number) => {
    const reduce = await AccessibilityInfo.isReduceMotionEnabled();
    scale.value = reduce ? to : withSpring(to, SNAPPY); // respect Reduce Motion
  };

  return (
    <Animated.View style={style}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPressIn={() => animateTo(0.97)}
        onPressOut={() => animateTo(1)}
        onPress={press}
        hitSlop={8} // extend tap area toward the 44pt floor
        style={({ pressed }) => ({
          minHeight: 48,               // ≥ 44pt floor, 48 for comfort
          paddingHorizontal: tokens.space.lg,
          borderRadius: tokens.radius.md,
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: v.border,
          backgroundColor: disabled ? tokens.color.bg.surfaceRaised : pressed ? v.pressed : v.bg,
          alignItems: 'center', justifyContent: 'center',
        })}>
        <Text
          allowFontScaling                          // never disable Dynamic Type
          maxFontSizeMultiplier={1.6}               // reflow, don't run away
          style={{ color: disabled ? tokens.color.text.tertiary : v.fg, fontSize: 17, fontWeight: '600' }}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
```

### A safe-area screen scaffold
A native stack screen: full-bleed gradient behind, blur tab bar chrome, content inside the insets.

```tsx
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Text } from 'react-native';
import { tokens } from '../tokens';
import { AuroraButton } from '../components/ui/AuroraButton';

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.bg.app }}>
      <StatusBar style="light" />
      {/* Signature gradient — full-bleed BEHIND the safe area, one per screen. */}
      <LinearGradient
        colors={[tokens.color.teal[500], tokens.color.violet[500], tokens.color.pink[500]]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 240, opacity: 0.35 }}
      />
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={{
          paddingHorizontal: tokens.space.md,       // 16 screen margin
          paddingTop: tokens.space.lg,
          paddingBottom: insets.bottom + 72,        // clear the tab bar + home indicator
          rowGap: tokens.space.lg,
        }}>
          <Text style={{ color: tokens.color.text.primary, fontSize: 34, fontWeight: '700' }}>Profile</Text>
          <AuroraButton label="Save changes" variant="primary" onPress={() => {}} />
          <AuroraButton label="Cancel" variant="secondary" onPress={() => {}} />
        </ScrollView>
      </SafeAreaView>
      {/* Blur tab bar chrome sits above the home indicator (very iOS). */}
      <BlurView tint="dark" intensity={40}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 49 + insets.bottom,
                 borderTopWidth: 1, borderTopColor: tokens.color.border.hairline }} />
    </View>
  );
}
```

### Folder structure
```
src/
  tokens.ts                 # generated — do not edit
  aurora.tailwind.preset.js # generated NativeWind preset
  components/ui/            # copy-paste, owned components (shadcn/gluestack-style)
    AuroraButton.tsx
    AuroraCard.tsx
    AuroraSheet.tsx
  components/               # app-specific composed components
  screens/                  # screen scaffolds
  navigation/               # native-stack + tab navigators
  hooks/                    # useReduceMotion, useHaptics wrappers
```

### Android/Material note
`react-native-safe-area-context` reads Android `WindowInsets` from the same API, so screens work cross-platform. On Android the touch floor is 48dp, haptics are limited, and blur falls back to a solid `bg.surfaceRaised` — never assume the iOS material renders.

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Read colors from `tokens.color.action.primary.bg` (semantic) | Don't hardcode `#7C6CFF` or reach into `tokens.color.violet[500]` in a screen |
| Import `tokens.ts` directly — one fixed theme, no provider needed | Don't call `useColorScheme()` or branch styles on the OS light/dark setting |
| Set `UIUserInterfaceStyle: Dark` in the plist so system chrome matches | Don't leave the default so keyboards and menus flash light |
| Use `@react-navigation/native-stack` for native push/pop and edge-swipe back | Don't reimplement navigation transitions in JS with `Animated` |
| Give buttons `minHeight: 48` and add `hitSlop={8}` for small glyphs | Don't ship a 30pt icon-only `Pressable` — it fails the 44pt touch floor |
| Gate `expo-haptics` behind `Platform.OS === 'ios'` and let Android no-op | Don't make a submit flow depend on a haptic firing on Android |
| Check `isReduceMotionEnabled()` and skip the spring when it's on | Don't force the 0.97 scale spring on users who set Reduce Motion |
| Keep content in `SafeAreaView` and add `insets.bottom` to bottom padding | Don't hardcode `34` for the home indicator — it varies by device |
| Set `allowFontScaling` with a sane `maxFontSizeMultiplier` | Don't set `allowFontScaling={false}` — it breaks Dynamic Type |
| Use one `LinearGradient` hero moment behind content per screen | Don't stack multiple gradients or place the gradient over readable text |
| Copy Aurora components into `components/ui/` and own them | Don't fork token values inside a component — regenerate `tokens.ts` |
| Fall back to solid `bg.surfaceRaised` where `BlurView` is unsupported | Don't assume the blur material renders identically on Android |

## Checklist
- [ ] `tokens.ts` imported; no hardcoded hex or pt values in components.
- [ ] Components read semantic tokens, not primitives.
- [ ] `UIUserInterfaceStyle: Dark` set; no `useColorScheme()` anywhere.
- [ ] Every interactive control clears the 44pt floor (or extends with `hitSlop`).
- [ ] Press feedback uses `spring-snappy` and respects Reduce Motion.
- [ ] Haptics are iOS-gated and degrade to no-op on Android.
- [ ] Content sits inside `SafeAreaView`; bottom padding includes `insets.bottom`.
- [ ] `allowFontScaling` left on with a capped multiplier.
- [ ] Native stack + gesture-handler power navigation and gestures.
- [ ] Blur chrome has a solid fallback for Android / Reduce Transparency.

## Related
- [04 · Layout, spacing & safe areas](./04-layout-spacing-safe-areas.md)
- [17 · Design tokens](./17-design-tokens.md)
- [19 · SwiftUI implementation](./19-swiftui-implementation.md)
