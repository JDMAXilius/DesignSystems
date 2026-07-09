# 22 · Design process — Aurora Design System

> How to go from a blank screen to a shipped one: define the single primary action, build content-first at real device size, apply the system in order, cover every state, and verify against the floors.

## Principles

- **One primary action per screen.** Decide it first; everything else is arranged around it.
- **Content first, chrome last.** Grey-box the real content at real device size before any color or accent.
- **Design at device size, in portrait.** 390×844pt (iPhone) is the canvas, not a desktop window.
- **The system, applied in order.** Spacing, then type, then ink surfaces, then exactly one aurora accent moment.
- **States are the design, not an afterthought.** Loading, empty, error, offline, long content, XXL type, and landscape are all part of "done".

## The system — six steps

### Step 0 · Define the one primary action

Write one sentence: "On this screen the user primarily wants to ___." That verb becomes the single primary (violet-500) action and the thumb-reachable focus. If you can't name one, the screen is doing too much — split it.

### Step 1 · Content-first grey-box wireframe

- Canvas at real size: **390×844pt**, mobile portrait first.
- Box out real content (real names, real string lengths), greys only — ink surfaces stand in, no color, no accent, no icons-as-decoration yet.
- Confirm the hierarchy reads at arm's length: what's first, second, third.

### Step 2 · Structure

- **Safe areas:** reserve the top inset (status bar / Dynamic Island) and the ~34pt bottom home-indicator inset; plan landscape side insets. See [04-layout-spacing-safe-areas.md](04-layout-spacing-safe-areas.md).
- **Navigation pattern:** choose one — tab bar (2–5 peer sections), nav stack (push/pop into detail), or sheet with detents (a focused sub-task). See [11-navigation.md](11-navigation.md).
- **Hierarchy & thumb reach:** put the primary action in the easy-reach zone — the bottom third of the screen. Keep destructive or rare actions out of the thumb arc.

### Step 3 · Apply the system, in order

1. **Spacing** — lay the 4pt grid: 16pt screen margins, 12pt row padding, 24–32pt section gaps.
2. **Type** — assign the ramp: largeTitle/title for headings, body for content, footnote/caption for metadata.
3. **Ink surfaces** — set depth with ink-950 app bg, ink-900 cards, ink-800 raised; add hairline borders.
4. **Aurora accent LAST** — add exactly **one** accent moment: the primary CTA in violet-500, or one teal active state, or one gradient hero. Not all three. This is the 10 in 60-30-10.

Pick components from docs **09–16**; never invent a new variant. If nothing fits, that's a system gap to raise (see [23-governance-versioning.md](23-governance-versioning.md)), not a one-off to hand-roll.

### Step 4 · Design every state

| State | What to design |
|---|---|
| Loading | Skeleton for content-shaped screens; spinner for actions. Preserve layout — no jump. |
| Empty | Headline + one line + one action (see [21-content-voice-tone.md](21-content-voice-tone.md)). |
| Error / retry | What happened + how to fix + a "Try again" button. |
| Offline | A calm banner; keep cached content usable where possible. |
| Long content | Longest realistic strings — do they wrap cleanly, not clip? |
| Dynamic Type XXL | Reflow at AX sizes; horizontal pairs stack vertically. |
| Landscape | Respect side insets; primary action stays reachable. |

### Step 5 · Verify against the floors

- Run **checklists/new-screen-checklist.md**.
- **VoiceOver pass:** swipe through — every control labeled, order correct, cards grouped.
- **44pt audit:** measure every target; extend small glyphs with `hitSlop`/`.contentShape`.
- **Reduce Motion pass:** springs become fades, no parallax.

## Process — worked example: a profile screen

- **Step 0:** the user primarily wants to **edit their profile** → primary action = "Edit profile".
- **Step 1:** grey-box at 390×844 — avatar block, name + handle, three stat rows, a list of settings. Real 24-character name to test wrapping.
- **Step 2:** nav stack (this is a detail pushed from a tab). Top safe-area inset reserved; "Edit profile" sits as a bottom-anchored primary in the thumb zone; sign-out (destructive-ish) lives at the very bottom of the scrolling list, away from the primary.
- **Step 3:** spacing (16pt margins, 24pt section gaps) → type (largeTitle name, body rows, footnote stats) → ink surfaces (ink-950 bg, ink-900 setting cards) → **one** accent: the "Edit profile" button in violet-500. Avatar ring stays ink, stats stay ink — no second accent.
- **Step 4:** loading = skeleton avatar + rows; empty (no stats yet) = "No activity yet"; error loading profile = "We couldn't load your profile. Try again."; XXL type stacks the stat row vertically.
- **Step 5:** VoiceOver reads "Jordan Alvarez, profile"; "Edit profile" is a 48pt button; Reduce Motion removes the avatar's entrance spring.

## Usage

### SwiftUI — real-size, safe-area-aware scaffold with the one primary at the bottom

```swift
struct ProfileScreen: View {
    var body: some View {
        NavigationStack {
            ScrollView { ProfileContent() }             // step 1 content
                .safeAreaInset(edge: .bottom) {          // step 2 thumb-reach primary
                    Button("Edit profile") { edit() }
                        .buttonStyle(AuroraPrimaryButtonStyle())   // step 3 one accent
                        .padding(.horizontal, Aurora.Spacing.space4) // 16pt
                }
                .navigationTitle("Profile")
        }
        .preferredColorScheme(.dark)                     // Aurora locks to midnight
    }
}
```

### React Native — same structure with safe-area insets

```tsx
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens } from '../tokens';

export function ProfileScreen() {
  const insets = useSafeAreaInsets();               // step 2 safe areas
  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.bg.app }}>
      <ScrollView>{/* step 1 content */}</ScrollView>
      <View style={{ paddingHorizontal: tokens.space[4], paddingBottom: insets.bottom + tokens.space[2] }}>
        <AuroraButton title="Edit profile" onPress={edit} />  {/* step 3 one accent, thumb zone */}
      </View>
    </View>
  );
}
```

**iOS-first / Android note:** design to the iPhone 390×844 canvas first; on Android verify at 360dp width, the 48dp touch floor, and the bottom-navigation equivalent of the tab bar. The bottom-anchored primary stays in the thumb zone on both.

## Anti-patterns

- **Designing at desktop size.** A wide artboard hides wrapping, thumb reach, and safe-area problems. Design at 390×844 portrait; shrinking a desktop mock last is how clipping ships.
- **Ignoring safe areas.** Content under the Dynamic Island or home indicator looks broken and taps miss. Reserve insets from step 2, not after.
- **Accent overload.** A violet CTA plus a teal active tab plus a gradient hero on one screen breaks 60-30-10. One accent moment, chosen last.
- **Sub-44pt targets.** A 30pt icon-only button fails the touch floor. Extend small glyphs with `hitSlop`/`.contentShape` to a 44pt target.
- **No empty or error states.** Shipping only the happy path means users hit blank or broken screens with no way forward. Design empty, error/retry, and offline before handoff.
- **Inventing variants.** A one-off button or card drifts from the system and can't be maintained. Pull from 09–16 or raise a gap.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Name the one primary action before drawing anything. | Start placing components before you know the screen's job. |
| Grey-box real content at 390×844 in portrait. | Mock it up wide on a desktop artboard and shrink later. |
| Apply spacing → type → ink → accent, in that order. | Reach for violet and the gradient before the layout works in grey. |
| Add exactly one aurora accent moment per screen. | Paint the CTA, an active tab, and a gradient hero all at once. |
| Put the primary action in the bottom thumb zone. | Strand the primary at the top where a thumb can't reach it. |
| Reserve the top and ~34pt bottom safe-area insets. | Let content sit under the Dynamic Island or home indicator. |
| Pick a component from docs 09–16. | Invent a new button or card variant for this one screen. |
| Design loading, empty, error, offline, and XXL states. | Ship only the happy path and discover the empty state in QA. |
| Test the longest realistic string and AX Dynamic Type. | Design with "John" and clip on a 24-character name at AX3. |
| Run the new-screen checklist, VoiceOver, and 44pt audit before handoff. | Call it done at the first pretty portrait mock. |
| Raise a missing pattern as a system gap. | Hand-roll a one-off and let it drift from the system. |
| Verify Reduce Motion swaps springs for fades. | Ship parallax that can't be turned off. |

## Checklist

- [ ] The one primary action is named and is the violet-500 focus.
- [ ] First pass was grey-box content at 390×844 portrait.
- [ ] Safe-area insets (top + ~34pt bottom + landscape sides) are reserved.
- [ ] Navigation pattern (tab / stack / sheet) is chosen deliberately.
- [ ] System applied in order: spacing → type → ink → one accent.
- [ ] Components come from 09–16; no invented variants.
- [ ] Loading, empty, error/retry, offline, long-content, XXL, and landscape are designed.
- [ ] VoiceOver pass, 44pt audit, and Reduce Motion pass all done.
- [ ] Primary action sits in the thumb-reach zone.
- [ ] Ran checklists/new-screen-checklist.md.

## Related

- [00 · Design principles](00-design-principles.md)
- [04 · Layout, spacing & safe areas](04-layout-spacing-safe-areas.md)
- [09 · Buttons & actions](09-buttons-actions.md)
- [11 · Navigation](11-navigation.md)
- [20 · Accessibility](20-accessibility.md)
- [21 · Content, voice & tone](21-content-voice-tone.md)
- [23 · Governance & versioning](23-governance-versioning.md)
