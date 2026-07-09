# 00 · Design principles — Aurora Design System
> The seven beliefs that decide every Aurora call, and the order to apply them when they collide.

Aurora is an iOS-first mobile design system with two implementations — SwiftUI and React Native. These principles are the constitution. Everything downstream (color, type, spacing, components) is an expression of them. When a token table and a principle disagree, the principle wins and the table is a bug.

### What Aurora is, and is not

| Aurora is | Aurora is not |
|---|---|
| iOS-first, mobile-only (SwiftUI + React Native) | A web or desktop system |
| A single fixed dark "midnight" appearance | A light/dark theming engine |
| Luminous — ink canvas, scarce aurora accent | Colorful — accents everywhere |
| Tactile — spring motion, haptics, pressable surfaces | Static — linear fades, silent taps |
| Token-driven, one source for both platforms | Hand-tuned per screen or per platform |
| Accessible as a gate (AA is the floor) | Accessible as an afterthought |

## Principles

**1. iOS-first, native-feeling.** Default to Apple's Human Interface Guidelines. Aurora should feel like it was born on iOS — large collapsing titles, bottom sheets with detents, edge-swipe back, SF Symbols, spring physics, haptics. Android is supported through React Native and stays first-class, but iOS is the source of truth; Android follows Material only where following iOS would feel foreign on the platform.

> In practice: when you can't decide a behavior, ask "what does a great iOS app do here?" before you ask "what's easiest to build cross-platform?"

**2. Luminous and tactile.** Aurora is a deep, calm, premium dark canvas (ink-950 `#0A0E17`) lit by aurora-colored accents — violet, teal, pink. Light is a scarce resource: one accent moment per screen. Every surface reads as pressable — corners are continuous, presses scale to 0.97, the primary action can carry a soft aurora glow. The system should feel like something you want to touch.

> In practice: budget accent like ink is free and light is expensive. If two things glow, one of them is wrong.

**3. Touch-first.** Fingers, not cursors. The hard floor is a 44×44pt touch target (48dp on Android). Controls that look smaller extend their tap area rather than shrinking the target. Adjacent targets keep ≥8pt between them. We design for thumbs reaching across a moving screen, not pixels under a mouse.

> In practice: a 24pt glyph is fine to draw, but its tap area is still 44pt — extend it with `.contentShape`/`hitSlop`, never shrink the target.

**4. Motion and haptics are the feel.** Motion is spring physics, not linear duration — snappy for taps, smooth for sheets, bouncy for playful reveals. Haptics are specified by intent (impact on primary tap, selection on toggle, notification on submit) and are never spammed. Motion and haptics carry the brand as much as color does, and both bow to Reduce Motion.

> In practice: one haptic per user action, and every spring has a Reduce-Motion fallback to a quick fade.

**5. One fixed appearance.** Aurora locks to a single dark "midnight" look and does **not** follow the OS light/dark setting. Tokens carry exactly one value each — there are no light/dark pairs, no `$modes`, no dynamic color providers. See "Why one fixed appearance" below.

> In practice: if you ever type `useColorScheme` or add a `.light` token, stop — that is not Aurora.

**6. Accessible by default.** WCAG 2.2 AA is the floor, not the goal: text ≥4.5:1 (≥3:1 for large/bold), UI and icons ≥3:1, VoiceOver on every control, Dynamic Type everywhere with reflowing layouts, Reduce Motion, Reduce Transparency, Bold Text. Status is never signaled by color alone.

> In practice: accessibility is a gate, not a polish pass — a screen that fails AA does not ship, however good it looks.

**7. One system, two platforms.** A single DTCG token source generates `Aurora.*` for SwiftUI and `tokens.*` for React Native. A color, a radius, a spring is defined once and consumed identically on both platforms. Divergence between iOS and Android is deliberate and documented (see [01-platforms-conventions.md](01-platforms-conventions.md)), never accidental drift.

> In practice: never hardcode a value a token already carries — if SwiftUI and RN disagree on a number, one of them skipped the token.

## Why one fixed appearance

Aurora is a brand, and the brand is the midnight canvas lit by aurora accents. Following the OS light/dark toggle would mean designing, tokenizing, testing, and shipping two of everything — and it would let the operating system decide what our product looks like. Instead Aurora owns its look:

- **SwiftUI** pins the root with `.preferredColorScheme(.dark)` and uses fixed `Color` values — no `Color(UIColor { ... })` dynamic providers.
- **React Native** never reads `useColorScheme()`; it sets `UIUserInterfaceStyle = Dark` in `Info.plist` so system chrome (keyboard, share sheets, status bar) matches the fixed dark canvas.

This is a deliberate trade: we give up "respects my phone's theme" to gain a single, tuned, always-correct appearance. What we get in return:

- **One thing to design.** No parallel light palette, no doubled component states, no "how does this look in light mode" review.
- **One thing to verify.** Every contrast pair is computed once against ink-950 (see [02-color.md](02-color.md)) and trusted forever.
- **A stronger brand.** The midnight canvas is unmistakably Aurora — the OS does not get to repaint it.
- **Simpler tokens.** Each token has a single `$value`; there is no `$modes`, no theme-switch plumbing, no runtime provider.

The cost is real and we accept it: a user who prefers light interfaces still gets Aurora's dark canvas. We mitigate with high contrast, honored Dynamic Type, and Reduce Transparency support so the fixed appearance stays comfortable and legible.

## How principles resolve conflicts

Principles collide constantly. Apply them in this priority order — a lower principle never overrides a higher one.

1. **Accessibility floor** — always first. If a design fails AA contrast, the 44pt target, VoiceOver, or Dynamic Type, it is wrong no matter how good it looks.
2. **Touch-first ergonomics** — a control must be reachable and hittable before it is beautiful.
3. **iOS-native behavior (HIG)** — when in doubt, do what a great iOS app does.
4. **Luminous + tactile brand expression** — the look and feel, applied within the three constraints above.
5. **Cross-platform consistency** — keep SwiftUI and RN identical, unless doing so would violate a higher principle on one platform.

Worked examples:

- *Glow vs. contrast.* A designer wants white label text on a glowing violet-400 CTA. White on violet-400 fails AA. Accessibility (1) beats brand (4): darken to violet-500/600 or keep the label white on violet-500 only at button size (bold/large threshold). The glow stays; the failing pair does not.
- *Native gesture vs. consistency.* iOS gives edge-swipe-back for free; Android's system back is a hardware/gesture affordance. Consistency (5) would say "same gesture everywhere," but iOS-native (3) outranks it — keep edge-swipe on iOS, honor the platform back on Android.
- *Density vs. touch.* A dense list could fit more rows by shrinking touch targets to 36pt. Touch-first (2) beats brand density: keep 44pt rows, gain density elsewhere.
- *Motion vs. accessibility.* A bouncy hero reveal is on-brand, but a user has Reduce Motion on. Accessibility (1) beats feel (4): swap the spring for a quick fade.
- *Blur vs. Reduce Transparency.* A nav bar uses `.ultraThinMaterial` for that very-iOS blur. A user turns on Reduce Transparency. Accessibility (1) beats brand (4): swap the blur for a solid ink-800 surface — the chrome stays legible, the effect steps aside.
- *Two accents fighting.* A screen has a violet primary CTA and a teal "active" state visible at once. Both are accent — the luminous principle (4) says one moment per screen. Demote one: keep the CTA violet and let the active state read through position and a subtler ink treatment, or vice versa.
- *Platform-perfect vs. shared code.* A shared RN component could get a bespoke iOS-only animation. Consistency (5) is lowest priority, so this is allowed — but only if it does not fork the token values or the accessibility behavior, which sit above it.

When principles genuinely tie — two options both satisfy every higher principle — choose the one that is more iOS-native, then the one that is simpler to maintain. Document the call in the component doc so the next person inherits the reasoning, not just the result.

## Non-negotiables

Most principles leave room for judgment. These five do not — they are hard invariants that a review must reject on sight:

- **Single mode.** No light/dark, no `$modes`, no `useColorScheme()`, no dynamic `Color` providers.
- **44pt touch floor.** Every interactive target is ≥44×44pt (48dp Android), no exceptions.
- **AA contrast.** No text or UI element ships below its WCAG 2.2 AA threshold against ink-950.
- **System font.** UI text is SF Pro / Roboto so Dynamic Type works — no bundled UI fonts, no `allowFontScaling={false}`.
- **Tokens are the source.** No hardcoded hex, size, or radius that a token already carries.

Everything else is a matter of applying the priority order well.

## How these principles show up downstream

Every foundation and component doc is one of these principles made concrete. If you ever wonder *why* a rule exists, trace it back here.

| Principle | Where it becomes a rule |
|---|---|
| iOS-first, native-feeling | Nav stacks, detented sheets, edge-swipe, SF Symbols — [01-platforms-conventions.md](01-platforms-conventions.md) |
| Luminous and tactile | The ink canvas, scarce accent, 60-30-10, aurora glow, continuous corners — [02-color.md](02-color.md) |
| Touch-first | The 44pt floor, ≥8pt gaps, `hitSlop`/`contentShape` guidance in every interactive doc |
| Motion and haptics are the feel | Spring tokens, haptic-by-intent rules, Reduce Motion fallbacks in interaction docs |
| One fixed appearance | Single-mode tokens, `.preferredColorScheme(.dark)`, `UIUserInterfaceStyle=Dark` throughout |
| Accessible by default | AA contrast tables, VoiceOver labels, Dynamic Type reflow — [03-typography.md](03-typography.md), [02-color.md](02-color.md) |
| One system, two platforms | The DTCG → `Aurora.*` / `tokens.*` pipeline every doc's Tokens section references |

Use this doc as the tie-breaker. When a review comment says "but I like it this way," the answer is a principle and its priority — not taste.

## Do / Don't

These pairs are the principles at the resolution of a single design decision. Keep them within reach during review.

| ✅ Do | ❌ Don't |
|---|---|
| Default to HIG patterns — bottom sheets with detents, large collapsing titles, edge-swipe back | Don't port an Android drawer or a web hamburger menu onto iOS because it's familiar from another platform |
| Keep one accent moment per screen (~10% of the surface) against the ink canvas | Don't paint three CTAs violet, teal, and pink on the same screen and call it luminous |
| Ship every tappable control at ≥44×44pt; extend a 24pt glyph's hit area with `.contentShape`/`hitSlop` | Don't ship a 30pt icon-only button that fails the 44pt touch floor |
| Pin the app to Aurora's dark appearance with `.preferredColorScheme(.dark)` / `UIUserInterfaceStyle=Dark` | Don't read `useColorScheme()` or add a light-mode variant — Aurora is single-mode |
| Fire haptics by intent — selection on toggle, notification success on submit | Don't buzz the taptic engine on scroll, on every keystroke, or twice for one action |
| Use spring physics for interaction (`spring-snappy` on taps) and honor Reduce Motion | Don't animate with long linear durations, and don't ignore the Reduce Motion setting |
| Pair every status color with an icon and label | Don't signal success or error with color alone — it fails colorblind users |
| Verify contrast against ink-950 before shipping a text or accent pair | Don't assume a bright accent passes AA — teal on ink passes, but tertiary ink-400 body text does not |
| Let layouts reflow as Dynamic Type grows to accessibility sizes | Don't lock font sizes or truncate the first line of body copy to "protect" a layout |
| Define a value once in tokens and consume `Aurora.*` / `tokens.*` on both platforms | Don't hardcode `#7C6CFF` in a screen or let SwiftUI and RN drift to different values |

## Checklist

- [ ] Does this follow the iOS-native pattern first, with an Android note only where it must differ?
- [ ] Is there exactly one accent moment on the screen (60-30-10 respected)?
- [ ] Is every interactive target ≥44pt with ≥8pt neighbors?
- [ ] Is the app locked to Aurora's fixed dark appearance (no light/dark, no `useColorScheme`)?
- [ ] Do motion and haptics match intent, and do both respect Reduce Motion?
- [ ] Do all text/accent pairs meet AA against ink-950, verified not assumed?
- [ ] Is every status conveyed with icon + label, never color alone?
- [ ] Are all values sourced from tokens and identical across SwiftUI and RN?
- [ ] Does the design clear all five non-negotiables (single mode, 44pt, AA, system font, tokens)?
- [ ] When two principles collided, was the higher-priority one honored and the call documented?

## Related

- [01-platforms-conventions.md](01-platforms-conventions.md) — iOS vs Android, SwiftUI vs React Native, where they diverge
- [02-color.md](02-color.md) — the single-mode palette and contrast pairings
- [03-typography.md](03-typography.md) — SF Pro, Dynamic Type, and the type ramp
