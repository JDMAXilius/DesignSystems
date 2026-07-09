# 🌌 Aurora Design System

A brand-new, **iOS-first mobile design system** documented for **two implementations: SwiftUI
and React Native**. One set of design tokens is the shared source of truth; each platform renders
it natively. Built for any modern mobile app.

> **Personality:** luminous + tactile — a deep midnight canvas lit by aurora-colored accents,
> where every surface feels pressable, motion is spring-physics, and haptics are part of the feel.
> **Single UI mode:** Aurora defines one fixed appearance (no light/dark) and locks to it.
> **Namespace:** tokens generate as `Aurora.*` (Swift) and `tokens.*` (TypeScript).

## How this system works

Aurora's hard problem — the one Cloud and Maxilius never faced — is serving **two rendering worlds
that share no language or layout engine**. The answer is the token spine:

```
DTCG token JSON  ──▶  Style Dictionary v4  ──▶  AuroraTokens.swift   (SwiftUI)
(single source)                              ├─▶  tokens.ts           (React Native)
                                             ├─▶  variables.json      (Figma)
                                             └─▶  tokens.json         (DTCG)
```

Neither platform hand-codes values. Every component doc shows **both a SwiftUI snippet and a React
Native snippet**, both consuming the same tokens. See [`17-design-tokens.md`](17-design-tokens.md)
for the pipeline, and the two implementation guides:
[React Native](18-react-native-implementation.md) · [SwiftUI](19-swiftui-implementation.md).

## How to use this system

1. **Starting an app?** Wire up the token pipeline ([17](17-design-tokens.md)), then follow your
   platform's implementation guide ([RN 18](18-react-native-implementation.md) /
   [SwiftUI 19](19-swiftui-implementation.md)).
2. **Building a screen?** Foundations first (color → type → layout/safe areas), then pull the
   component docs. Run the [new-screen checklist](checklists/new-screen-checklist.md) before shipping.
3. **Undocumented decision?** Fall back to [`00-design-principles.md`](00-design-principles.md).

Every document ends with a **✅ Do / ❌ Don't** table and a shipping checklist.

## The documents

### Foundations

| # | Document | What it decides |
| --- | --- | --- |
| 00 | [Design principles](00-design-principles.md) | iOS-first, luminous + tactile, one fixed mode |
| 01 | [Platforms & conventions](01-platforms-conventions.md) | iOS vs Android, SwiftUI vs RN, where they diverge |
| 02 | [Color](02-color.md) | The single-mode aurora palette, semantic roles, contrast |
| 03 | [Typography & Dynamic Type](03-typography.md) | System font, type ramp, Dynamic Type scaling |
| 04 | [Layout, spacing & safe areas](04-layout-spacing-safe-areas.md) | pt/dp, 4pt grid, notch/Dynamic Island |
| 05 | [Iconography & SF Symbols](05-iconography-sf-symbols.md) | SF Symbols + cross-platform fallback set |
| 06 | [Elevation, depth & materials](06-elevation-depth-materials.md) | Shadows, aurora glow, blur materials |
| 07 | [Motion & haptics](07-motion-haptics.md) | Spring physics, haptic feedback patterns |
| 08 | [Touch, gestures & targets](08-touch-gestures-targets.md) | 44pt floor, gestures, hit slop |

### Components — each with SwiftUI + React Native code

| # | Document | What it decides |
| --- | --- | --- |
| 09 | [Buttons & actions](09-buttons-actions.md) | Variants, states, FAB, 44pt floor, press haptics |
| 10 | [Forms & inputs](10-forms-inputs.md) | Fields, toggles, steppers, sliders, segmented, pickers |
| 11 | [Navigation](11-navigation.md) | Tab bars, nav stacks, large titles, back gesture |
| 12 | [Modals, sheets & overlays](12-modals-sheets-overlays.md) | Sheets with detents, alerts, action sheets, toasts |
| 13 | [Lists & collections](13-lists-collections.md) | Rows, swipe actions, pull-to-refresh, grids |
| 14 | [Cards & surfaces](14-cards-surfaces.md) | Cards, surface hierarchy, aurora hero card |
| 15 | [Feedback & status](15-feedback-status.md) | Spinners, skeletons, progress, empty states, banners |
| 16 | [Data display](16-data-display.md) | Avatars, badges, tags, stats |

### System-wide & engine

| # | Document | What it decides |
| --- | --- | --- |
| 17 | [Design tokens & build pipeline](17-design-tokens.md) | DTCG → Style Dictionary → Swift + TS (the spine) |
| 18 | [React Native implementation](18-react-native-implementation.md) | tokens→theme, gluestack/NativeWind pattern |
| 19 | [SwiftUI implementation](19-swiftui-implementation.md) | tokens→Color/Font extensions, ButtonStyle, modifiers |
| 20 | [Accessibility](20-accessibility.md) | VoiceOver, Dynamic Type, contrast, targets |
| 21 | [Content, voice & tone](21-content-voice-tone.md) | Mobile microcopy |
| 22 | [Design process](22-design-process.md) | Blank screen → shipped |
| 23 | [Governance & versioning](23-governance-versioning.md) | Running a two-platform system in lockstep |

### Checklists

- [New screen checklist](checklists/new-screen-checklist.md) — run before any screen ships.

## The system at a glance

| Decision | Value |
| --- | --- |
| Appearance | Single fixed **midnight** mode (no light/dark), locked to Aurora's look |
| Canvas | Ink graphite `#0A0E17` app · `#10151F` surface · `#171D2B` raised |
| Primary | Aurora Violet `#7C6CFF` (pressed `#6551F0`) |
| Secondary | Aurora Teal `#2FE0C0` (links, active) |
| Accent | Aurora Pink `#FF6FB5` (tertiary) |
| Signature | Gradient `135° teal → violet → pink`, max 1 per screen |
| Status | Success `#34D399` · Warning `#FBBF24` · Danger `#F4544E` · Info `#4CEBCB` |
| Font | System (SF Pro) for Dynamic Type · SF Mono for numerics |
| Type ramp | iOS text styles, largeTitle 34 → caption2 11 |
| Units | Points (pt) / dp — never px, 4pt grid |
| Touch floor | 44×44pt minimum (48dp Android) |
| Radius | 6 / 10 / 14 / 20 / 28 / 36 + pill, continuous corners on iOS |
| Motion | Spring-first (snappy/smooth/bouncy) + haptics |
| Nav | Tab bar (2–5), nav stack (large title), sheets with detents |
| Accessibility | WCAG 2.2 AA, VoiceOver, Dynamic Type, Reduce Motion/Transparency |

## Non-negotiables

1. Points/dp only — never px. Everything on the 4pt grid.
2. **44×44pt** minimum touch target — extend with `hitSlop` / `contentShape` if the glyph is smaller.
3. Components consume **semantic** tokens only — never raw hex, never primitives.
4. Single fixed appearance — never add light/dark, dynamic color providers, or `useColorScheme`.
5. Respect safe-area insets (notch, Dynamic Island, home indicator) on every screen.
6. Never disable Dynamic Type; layouts must reflow at accessibility sizes.
7. One primary action and at most one aurora-accent moment per screen.
8. Haptics for user actions only — never on scroll or per keystroke.
9. Full VoiceOver support; never signal by color alone.

## Aurora vs Cloud vs Maxilius

This repo hosts three independent systems that share nothing:

| | Aurora | [Cloud](../cloud/) | [Maxilius](../maxilius/) |
| --- | --- | --- | --- |
| Target | iOS mobile (SwiftUI + RN) | Any website | Any website (React) |
| Look | Midnight, luminous accents | Airy light, sky/twilight | Light, cool + warm |
| Tokens | `Aurora.*` / `tokens.*` | `--cds-*` | `--mx-*` |

Pick one per project — never mix them.
