# New screen checklist — Aurora Design System

> Run this before any screen ships, on **both** platforms you target. Doc numbers in brackets.
> If a line fails and you can't fix it, document the exception per [governance](../23-governance-versioning.md).

## Setup & tokens

- [ ] Screen consumes generated tokens (`Aurora.*` in Swift / `tokens.*` in TS) — no raw hex, no magic numbers [17]
- [ ] All sizes in points/dp on the 4pt grid — no px, no off-grid values [04]
- [ ] Appearance is locked to Aurora: `.preferredColorScheme(.dark)` (SwiftUI) / `UIUserInterfaceStyle=Dark`, no `useColorScheme` (RN) [00, 02]

## Layout & safe areas

- [ ] Content respects safe-area insets — nothing under the notch, Dynamic Island, or home indicator [04]
- [ ] Full-bleed backgrounds/gradients extend behind safe content, not over it [04]
- [ ] Screen margin 16pt (or 20pt spacious); section spacing on the scale [04]
- [ ] Tab bar / nav bar use a blur material and sit above the home indicator [06, 11]
- [ ] Checked in portrait; landscape and iPad handled or intentionally locked [22]

## Color & type

- [ ] Surfaces follow the hierarchy: app `#0A0E17` → surface `#10151F` → raised `#171D2B` [02]
- [ ] Every text/background pair passes contrast (4.5:1 body, 3:1 large / UI) [02, 20]
- [ ] At most one aurora-accent moment (gradient or glow) on the screen [02, 06]
- [ ] Status colors paired with an icon or label — never color alone [02, 20]
- [ ] Type uses the system font via iOS text styles so Dynamic Type works [03]
- [ ] Changing numbers use `monospacedDigit` to avoid width jitter [03, 16]

## Touch, components & interaction

- [ ] Every interactive element has a **≥44×44pt** touch target — small glyphs extended with `hitSlop`/`contentShape` [08]
- [ ] Adjacent targets have ≥8pt spacing [08]
- [ ] Exactly one primary action on the screen; others secondary/tertiary [09]
- [ ] Buttons show pressed (scale 0.97 + haptic), disabled, and loading states [07, 09]
- [ ] Form fields have visible labels (never placeholder-as-label); errors show border + icon + message [10]
- [ ] Correct keyboard type per field; return key does the right thing [10]
- [ ] Navigation uses the right pattern (tab / push / sheet with detents) — sheets have a grabber and swipe-down dismiss [11, 12]
- [ ] Lists: rows ≥44pt, swipe actions where useful, pull-to-refresh where content updates [13]

## Motion & haptics

- [ ] Animations are spring-first (transform + opacity); nothing janky on device [07]
- [ ] Haptics fire on user actions only (tap, toggle, success, error) — never on scroll or per keystroke [07]
- [ ] Reduce Motion respected (springs → quick fades) [07, 20]
- [ ] Reduce Transparency respected (blur → solid `#171D2B`) [06, 20]

## States

- [ ] Loading uses skeletons for content, spinner for actions — no layout shift [15]
- [ ] Empty state has icon + title + one line + primary action [15]
- [ ] Error/retry state designed; offline handled [15, 22]
- [ ] Long content and Dynamic Type XXL reflow without clipping [03, 22]

## Accessibility

- [ ] VoiceOver: every control has a label + trait; order follows visual order; related elements grouped [20]
- [ ] Decorative images/icons hidden from VoiceOver; meaningful ones labeled [05, 20]
- [ ] Tested with VoiceOver on and Dynamic Type at an accessibility size [20]

## Content & cross-platform

- [ ] Sentence case everywhere; buttons are verb (+ noun) [21]
- [ ] Errors say what happened and how to fix it [21]
- [ ] If shipping both platforms: the screen exists and matches on SwiftUI **and** React Native, on the same token version [23]
