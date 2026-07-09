# 20 · Accessibility — Aurora Design System

> WCAG 2.2 AA is the floor for every Aurora screen: honest contrast on the midnight canvas, full VoiceOver, Dynamic Type everywhere, a 44pt touch floor, and no signal carried by color alone.

## Principles

- **AA is the floor, not the goal.** Text meets 4.5:1 (3:1 for large/bold), UI and icons meet 3:1. Because Aurora is single-mode, every pair is verified once and trusted forever.
- **VoiceOver is a first-class layout.** Every control has a label and a role/trait, related elements are grouped, and reading order matches visual order.
- **Dynamic Type is never disabled.** Layouts reflow — they do not clip or truncate — from the smallest size up through the accessibility sizes.
- **The 44pt target is non-negotiable.** A control that looks smaller extends its tap area; it never shrinks the target.
- **Never color-only.** Status, selection, and errors always pair color with an icon, a label, or a shape.
- **Honor system switches.** Reduce Motion, Reduce Transparency, and Bold Text each change what renders — blur becomes solid, springs become fades.

## The system

### Contrast — real Aurora pairs (computed, WCAG 2.2)

AA thresholds: normal text **4.5:1**; large text **3:1** (≥24pt, or ≥19pt bold — Aurora maps this to title3/headline and up); UI components and icons **3:1**.

| Foreground | Background | Ratio | Normal text | Large/bold | UI/icon |
|---|---|---|---|---|---|
| text-primary ink-50 `#F4F6FB` | bg-app ink-950 `#0A0E17` | 17.85:1 | Pass | Pass | Pass |
| text-primary ink-50 `#F4F6FB` | bg-surface ink-900 `#10151F` | 16.90:1 | Pass | Pass | Pass |
| text-secondary ink-300 `#9AA3BF` | bg-app ink-950 `#0A0E17` | 7.69:1 | Pass | Pass | Pass |
| text-secondary ink-300 `#9AA3BF` | bg-surface ink-900 `#10151F` | 7.28:1 | Pass | Pass | Pass |
| text-tertiary ink-400 `#6B7488` | bg-app ink-950 `#0A0E17` | 4.12:1 | **Fail** | Pass | Pass |
| text-tertiary ink-400 `#6B7488` | bg-surface ink-900 `#10151F` | 3.90:1 | **Fail** | Pass | Pass |
| violet-500 `#7C6CFF` | bg-app ink-950 `#0A0E17` | 5.01:1 | Pass | Pass | Pass |
| violet-500 `#7C6CFF` | bg-surface ink-900 `#10151F` | 4.74:1 | Pass | Pass | Pass |
| violet-400 `#9788FF` | bg-app ink-950 `#0A0E17` | 6.69:1 | Pass | Pass | Pass |
| teal-500 `#2FE0C0` (link) | bg-app ink-950 `#0A0E17` | 11.53:1 | Pass | Pass | Pass |
| teal-500 `#2FE0C0` (link) | bg-surface ink-900 `#10151F` | 10.92:1 | Pass | Pass | Pass |
| text-on-accent `#FFFFFF` | violet-500 `#7C6CFF` | 3.86:1 | **Fail** | Pass | Pass |
| text-on-accent ink-950 `#0A0E17` | teal-500 `#2FE0C0` | 11.53:1 | Pass | Pass | Pass |
| `#FFFFFF` (wrong) | teal-500 `#2FE0C0` | 1.67:1 | **Fail** | **Fail** | **Fail** |
| danger `#F4544E` | bg-app ink-950 `#0A0E17` | 5.72:1 | Pass | Pass | Pass |

**What this means, honestly:**

- **text-tertiary ink-400 is a large/UI color, not a body color.** At 4.12:1 (ink-950) and 3.90:1 (ink-900) it fails the 4.5:1 normal-text floor. Use it for captions rendered at title3/headline weight, metadata glyphs, and disabled affordances — never for reading-length body at footnote/caption sizes. For small muted text that must stay AA, step up to text-secondary ink-300.
- **White on violet-500 is a large/bold pairing only.** At 3.86:1 it clears 3:1 (large text and UI) but not 4.5:1. Aurora's primary button label is headline 17 semibold, which qualifies as large; keep primary labels at that size/weight and never render normal-size white body copy on a violet fill.
- **Never white on teal.** 1.67:1 fails everything. text-on-accent for teal is ink-950 dark text (11.53:1). This is why the spec fixes dark text on teal and white on violet.

### VoiceOver

Every interactive element needs four things, in priority order:

1. **Label** — what it is, in a few words, no control type ("Save", not "Save button" — the trait adds "button").
2. **Trait / role** — button, link, header, image, adjustable, selected, disabled.
3. **Value** — the current state for stateful controls (a slider's "60 percent", a toggle's on/off).
4. **Hint** — the outcome, only when non-obvious ("Double tap to archive this message"). Keep hints short and skippable.

- **Grouping:** combine a title + subtitle + thumbnail row into one element so VoiceOver reads it once and swipes past it once. SwiftUI `.accessibilityElement(children: .combine)`; RN `accessible={true}` on the wrapper.
- **Order:** reading order follows the visual top-to-bottom, leading-to-trailing flow. Fix mismatches with `.accessibilitySortPriority` (SwiftUI) rather than reordering the layout.
- **Decorative elements are hidden** from the tree (see the decorative pattern below).

### Dynamic Type

- Support it everywhere by mapping every text style to an iOS text style (see [03-typography.md](03-typography.md)); never hard-code a frozen point size for body text.
- Layouts **reflow**: labels wrap, rows grow taller, horizontal button pairs stack vertically at large sizes. Nothing clips or truncates critical content.
- **Test at accessibility sizes** (AX1–AX5). Cap extremes with layout (line limits on decorative text, scroll containers), not by locking the font size.
- Icons paired with text scale with the text (SwiftUI `.imageScale` / SF Symbol text-style sizing).

### Touch targets

- Hard floor **44×44pt** (48dp on Android/Material). Minimum 8pt between adjacent targets.
- A 24pt glyph lives inside a 44pt target — extend with `.contentShape` + padding (SwiftUI) or `hitSlop` (RN). See [09-buttons-actions.md](09-buttons-actions.md).

### System switches

| Switch | Detect | Aurora response |
|---|---|---|
| Reduce Motion | SwiftUI `\.accessibilityReduceMotion`; RN `AccessibilityInfo.isReduceMotionEnabled` | Swap springs for a ≤150ms fade; drop press-scale, parallax, and large transitions. |
| Reduce Transparency | SwiftUI `\.accessibilityReduceTransparency`; RN `AccessibilityInfo.isReduceTransparencyEnabled` | Replace `.ultraThinMaterial`/blur nav, tab, and sheet backgrounds with solid **ink-800 `#171D2B`**. |
| Bold Text | SwiftUI `\.legibilityWeight`; RN `AccessibilityInfo` bold-text event | Let system fonts bolden; verify layouts still fit and don't clip. |

### Never color-only

Pair every color signal with a second cue: success uses a checkmark, danger uses an exclamation glyph + label, selection uses a checkmark or filled state, links use teal **and** are the tappable words. See [status colors in 02-color.md](02-color.md).

## Process

Accessibility consumes existing semantic tokens; it defines none of its own values.

| DTCG group | Swift | TS |
|---|---|---|
| `color.text.primary` | `Aurora.Color.textPrimary` | `tokens.color.text.primary` |
| `color.text.secondary` | `Aurora.Color.textSecondary` | `tokens.color.text.secondary` |
| `color.text.tertiary` | `Aurora.Color.textTertiary` | `tokens.color.text.tertiary` |
| `color.bg.surfaceRaised` (Reduce Transparency fallback) | `Aurora.Color.bgSurfaceRaised` | `tokens.color.bg.surfaceRaised` |
| `color.focus.ring` | `Aurora.Color.focusRing` | `tokens.color.focus.ring` |

## Usage

### SwiftUI — labels, traits, value, hint, grouping, decorative

```swift
// Icon-only control: label + implicit button trait + hint
Button(action: archive) {
    Image(systemName: "archivebox")            // decorative glyph inside a labeled control
}
.frame(minWidth: 44, minHeight: 44)            // 44pt floor
.accessibilityLabel("Archive")
.accessibilityHint("Removes this message from the inbox")

// Stateful toggle: value reads on/off
Toggle("Notifications", isOn: $on)
    .accessibilityValue(on ? "On" : "Off")

// Group a card into one element with a combined label
HStack { Avatar(user); VStack { Text(user.name); Text(user.role) } }
    .accessibilityElement(children: .combine)
    .accessibilityAddTraits(.isButton)

// Decorative image: hide from VoiceOver entirely
Image("aurora-glow").accessibilityHidden(true)

// Respect Reduce Transparency: blur → solid ink-800
@Environment(\.accessibilityReduceTransparency) var reduceTransparency
var navBackground: some View {
    reduceTransparency
        ? AnyView(Aurora.Color.bgSurfaceRaised)          // #171D2B solid
        : AnyView(Rectangle().fill(.ultraThinMaterial))
}
```

### React Native — accessibilityLabel / Role / State / Value, hidden decorative

```tsx
import { Pressable, Text, View, Image, AccessibilityInfo } from 'react-native';

// Icon-only control with label + role + hint, 44pt target
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Archive"
  accessibilityHint="Removes this message from the inbox"
  hitSlop={10}                                   // 24pt glyph → 44pt target
  style={{ minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}
  onPress={archive}
>
  <ArchiveIcon />
</Pressable>

// Stateful toggle: role + state
<Pressable accessibilityRole="switch" accessibilityState={{ checked: on }}
  accessibilityLabel="Notifications" onPress={toggle} />

// Group a card into one node; children are read as one label
<View accessible accessibilityRole="button" accessibilityLabel={`${user.name}, ${user.role}`}>
  <Avatar user={user} /><Text>{user.name}</Text><Text>{user.role}</Text>
</View>

// Decorative image: hide from screen readers
<Image source={glow} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" />
```

**iOS-first / Android note:** VoiceOver traits map to TalkBack roles via RN's `accessibilityRole`; `importantForAccessibility="no-hide-descendants"` is the Android equivalent of `accessibilityElementsHidden`. The touch floor is 44pt on iOS and 48dp on Android — both are satisfied by a 44pt target plus `hitSlop`.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use text-tertiary ink-400 only at large/bold sizes or for icons (3:1). | Set footnote body copy in ink-400 on ink-900 — it's 3.90:1 and fails 4.5:1. |
| Keep primary button labels at headline 17 semibold so white-on-violet clears large-text 3:1. | Render normal-size white body copy on a violet-500 fill at 3.86:1. |
| Put ink-950 dark text on teal-500 (11.53:1). | Put white text on teal-500 — it's 1.67:1 and fails everything. |
| Give every icon-only control an `accessibilityLabel` and a button trait. | Ship a bare SF Symbol button that VoiceOver reads as "button" with no name. |
| Combine a title + subtitle + thumbnail into one grouped element. | Leave a card as five separate swipe stops with no context. |
| Add a hint only when the outcome is non-obvious, and keep it short. | Repeat the label in the hint ("Save button. Double tap to save."). |
| Map body text to an iOS text style so Dynamic Type scales it. | Hard-code `fontSize: 15` on body and lock users out of larger type. |
| Reflow to a vertical stack when Dynamic Type reaches accessibility sizes. | Let a two-button row clip or truncate at AX3. |
| Swap `.ultraThinMaterial` for solid ink-800 when Reduce Transparency is on. | Keep a blurred nav bar that turns text unreadable for that user. |
| Replace the press-scale spring with a ≤150ms fade under Reduce Motion. | Force the 0.97 scale and parallax when Reduce Motion is on. |
| Pair danger color with an exclamation glyph and a text label. | Signal an invalid field with a red border and nothing else. |
| Extend a 24pt glyph to a 44pt target with `hitSlop`/`.contentShape`. | Leave the tappable area at 24pt because the icon looks fine. |

## Checklist

- [ ] Every text/background pair meets AA for its size (body ≥4.5:1, large/UI ≥3:1).
- [ ] No ink-400 body copy at footnote/caption sizes on ink-900 or ink-950.
- [ ] White text on accents appears only on violet at large/bold; teal uses ink-950 text.
- [ ] Every control has a label + role/trait; stateful controls expose a value.
- [ ] Related elements are grouped; reading order matches visual order.
- [ ] Decorative images are hidden from the accessibility tree on both platforms.
- [ ] Body text scales with Dynamic Type and reflows without clipping at AX sizes.
- [ ] All targets ≥44×44pt with ≥8pt spacing.
- [ ] Reduce Motion, Reduce Transparency (blur→ink-800), and Bold Text are handled.
- [ ] No status/selection is signaled by color alone.

## Related

- [00 · Design principles](00-design-principles.md)
- [01 · Color](02-color.md)
- [02 · Typography](03-typography.md)
- [04 · Layout, spacing & safe areas](04-layout-spacing-safe-areas.md)
- [08 · Motion & animation](07-motion-haptics.md)
- [09 · Buttons & actions](09-buttons-actions.md)
- [21 · Content, voice & tone](21-content-voice-tone.md)
