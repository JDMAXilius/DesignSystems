# 15 · Feedback & status — Aurora Design System
> How Aurora tells people something is loading, progressing, empty, broken, or worth noticing — calmly, without blocking the whole screen or shifting layout.

Aurora is iOS-first and locks to its fixed dark "midnight" appearance (SwiftUI `.preferredColorScheme(.dark)` at the root; React Native `UIUserInterfaceStyle=Dark` in Info.plist). Every value below is a single fixed value — there are no light/dark pairs.

## Principles
- **Reserve the space, don't jump.** Feedback replaces content in place. Skeletons and inline banners must occupy the same footprint as the resolved state so nothing shifts (no cumulative layout shift).
- **Skeleton for content, spinner for actions.** Use a shimmering skeleton when you're fetching data that has a known shape; use a spinner (activity indicator) for a discrete action whose duration is unknown.
- **Never block the whole screen unnecessarily.** Load section by section. A full-screen spinner is a last resort, not a default.
- **Status is never color alone.** Every success/warning/danger/info signal pairs its color with an SF Symbol and text (WCAG 2.2, VoiceOver).
- **Say what happened and what to do.** Empty and error states are one calm line plus a single clear action — front-load the meaning.

## The system

### Loading
| Pattern | When | Recipe |
|---|---|---|
| Activity indicator (spinner) | Discrete action of unknown length: submit, refresh a button, load-more | `violet-500` #7C6CFF tint, medium size, centered in the control's footprint |
| Skeleton (redacted) | Fetching content with a known layout: lists, cards, profiles | Placeholder blocks in `ink-800` #171D2B with a shimmer sweep, matching final layout |
| Inline "loading more" | Paginated list foot | 20pt spinner + `footnote` text-secondary, in a 44pt row |

- Skeleton shimmer sweeps left→right over ~1.0–1.2s; respect Reduce Motion by showing a static `ink-800` block (no sweep).
- Spinner color is `violet-500` on dark; on a violet button use `#FFFFFF`.
- Never swap a skeleton for a spinner mid-load — pick one per surface.

### Progress
| Type | Determinate | Indeterminate |
|---|---|---|
| Linear | Track `ink-700` #232A3A, fill `violet-500`, height 4pt, `radius-full` | Track `ink-700`, indeterminate violet sweep |
| Circular | Ring track `ink-700`, progress `violet-500`, 3pt stroke | Rotating `violet-500` arc (the spinner) |

- Use determinate whenever total is known (uploads, multi-step). Show a `footnote` percentage or step count beside it, never color alone.
- Circular indeterminate == the activity indicator; don't put a separate spinner next to a progress bar.

### Empty states
Structure, centered in the available area, ~24pt vertical rhythm:
1. **SF Symbol** — 28pt, `ink-400` #6B7488 (hierarchical rendering).
2. **Title** — `title3` (20 Semibold), `text-primary` #F4F6FB.
3. **One line** — `subheadline` (15), `text-secondary` #9AA3BF; what this is / why it's empty.
4. **Primary action** — one button (verb), ≥48pt tall. Optional only when there's a real next step.

### Error / retry states
- Same skeleton footprint, replaced by: danger SF Symbol (`exclamationmark.triangle`) in `#F4544E`, a `headline` title (what happened), a `subheadline` fix line, and a **Try again** secondary button.
- Front-load meaning ("Couldn't load your cards"), never a raw code. Fire `notification error` haptic once when an action fails.

### Inline banners (4 status variants)
Leading SF Symbol + `subheadline` text, tint background + 1pt border, `radius-md` (14), 12pt padding, full content width.
| Status | Icon | Text | Tint bg | Border |
|---|---|---|---|---|
| Success | `checkmark.circle.fill` | `#6EE7B7` | rgba(52,211,153,0.14) | rgba(52,211,153,0.30) |
| Warning | `exclamationmark.triangle.fill` | `#FCD34D` | rgba(251,191,36,0.14) | rgba(251,191,36,0.30) |
| Danger | `xmark.octagon.fill` | `#FF8A85` | rgba(244,84,78,0.14) | rgba(244,84,78,0.30) |
| Info | `info.circle.fill` | `#7BF3DC` | rgba(76,235,203,0.14) | rgba(76,235,203,0.30) |

Toasts use the same recipe on `ink-800` at the top layer (z 70) above the safe-area inset — see `./08-motion-animation.md` for entry springs.

### Badges & count indicators
| Placement | Recipe |
|---|---|
| Tab bar badge | `danger` #F4544E dot or pill, `#FFFFFF` `caption2` count, `radius-full`, top-trailing of the SF Symbol; cap at "99+" |
| Avatar count / status dot | 10pt `radius-full` dot with a 2pt `ink-900` ring; status colors from the table |
| Standalone count | `radius-full` pill, 6pt h-padding, `caption2`, tint recipe per status |

Badges carry a VoiceOver value ("3 unread"), never a bare number with no label.

## Tokens
DTCG group (semantic, single mode) → generated names:
| DTCG | Swift | TS |
|---|---|---|
| `color.action.primary.bg` | `Aurora.Color.actionPrimaryBg` | `tokens.color.action.primary.bg` |
| `color.feedback.success.tint` | `Aurora.Color.feedbackSuccessTint` | `tokens.color.feedback.success.tint` |
| `color.feedback.danger.text` | `Aurora.Color.feedbackDangerText` | `tokens.color.feedback.danger.text` |
| `color.surface.raised` | `Aurora.Color.surfaceRaised` | `tokens.color.surface.raised` |
| `radius.md` | `Aurora.Radius.md` | `tokens.radius.md` |
| `space.3` | `Aurora.Spacing.space3` | `tokens.space.3` |

```json
{
  "color": {
    "feedback": {
      "success": {
        "tint":   { "$value": "rgba(52,211,153,0.14)", "$type": "color" },
        "border": { "$value": "rgba(52,211,153,0.30)", "$type": "color" },
        "text":   { "$value": "#6EE7B7", "$type": "color" }
      },
      "danger": {
        "tint":   { "$value": "rgba(244,84,78,0.14)", "$type": "color" },
        "text":   { "$value": "#FF8A85", "$type": "color" }
      }
    }
  }
}
```
Components consume only these semantic tokens — never a raw hex. See `./17-design-tokens.md`.

## Usage

**SwiftUI** — skeleton via `.redacted`, spinner via `ProgressView`, an inline banner:
```swift
struct CardList: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    let isLoading: Bool
    let cards: [Card]

    var body: some View {
        VStack(spacing: Aurora.Spacing.space3) {
            if isLoading {
                // Skeleton keeps the resolved layout's footprint — no shift.
                ForEach(0..<4, id: \.self) { _ in CardRow.placeholder }
                    .redacted(reason: .placeholder)
                    .shimmer(active: !reduceMotion)          // static ink-800 block if Reduce Motion
            } else {
                ForEach(cards) { CardRow(card: $0) }
            }
        }
    }
}

// Spinner for a discrete action, tinted violet-500
ProgressView()
    .tint(Aurora.Color.actionPrimaryBg)
    .controlSize(.regular)

// Inline banner — color is ALWAYS paired with an SF Symbol
struct Banner: View {
    var body: some View {
        Label("Payment updated", systemImage: "checkmark.circle.fill")
            .font(.subheadline)
            .foregroundStyle(Aurora.Color.feedbackSuccessText)
            .padding(Aurora.Spacing.space3)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Aurora.Color.feedbackSuccessTint,
                        in: RoundedRectangle(cornerRadius: Aurora.Radius.md, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: Aurora.Radius.md, style: .continuous)
                .stroke(Aurora.Color.feedbackSuccessBorder, lineWidth: 1))
    }
}
```

**React Native** — `ActivityIndicator`, a skeleton via a shimmer lib (e.g. `react-native-reanimated`/`moti`), an inline banner. Android/Material equivalent: `ProgressBar` (spinner) and Material `Snackbar` for transient status.
```tsx
import { View, Text, ActivityIndicator } from 'react-native';
import { Skeleton } from 'moti/skeleton';           // shimmer skeleton
import { tokens } from '../tokens';

function CardList({ isLoading, cards }: Props) {
  if (isLoading) {
    // Same footprint as a resolved row → no layout shift
    return (
      <View style={{ gap: tokens.space['3'] }}>
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} height={72} radius={tokens.radius.lg}
                    colorMode="dark" colors={[tokens.color.surface.raised, tokens.color.surface.default]} />
        ))}
      </View>
    );
  }
  return <>{cards.map((c) => <CardRow key={c.id} card={c} />)}</>;
}

// Spinner for a discrete action, tinted violet-500
<ActivityIndicator color={tokens.color.action.primary.bg} />

// Inline banner — leading icon + tint bg + border, color never alone
function Banner() {
  return (
    <View
      accessibilityRole="alert"
      style={{
        flexDirection: 'row', alignItems: 'center', gap: tokens.space['2'],
        padding: tokens.space['3'], borderRadius: tokens.radius.md,
        backgroundColor: tokens.color.feedback.success.tint,
        borderWidth: 1, borderColor: tokens.color.feedback.success.border,
      }}>
      <Icon name="check-circle" size={20} color={tokens.color.feedback.success.text} />
      <Text style={{ color: tokens.color.feedback.success.text, fontSize: 15 }}>Payment updated</Text>
    </View>
  );
}
```

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Show a skeleton in `ink-800` that mirrors the final card layout | Show a centered spinner over an empty screen when you know the layout |
| Use a `violet-500` `ActivityIndicator` for a submit whose duration is unknown | Fake a skeleton for a button tap that resolves in <300ms |
| Reserve the resolved footprint so nothing shifts when data arrives | Let content pop in and push the page down (layout shift) |
| Pair every status color with an SF Symbol and text | Signal success with green text alone — fails VoiceOver and low-vision users |
| Load each section independently and reveal as it resolves | Block the entire screen behind one full-screen spinner |
| Give an empty state one line + one primary action (≥48pt) | Stack three buttons and a paragraph in an empty state |
| Front-load error meaning: "Couldn't load your cards. Try again." | Show "Error 500" with no plain-language cause or fix |
| Fire `notification error` haptic once when an action fails | Fire a haptic on every retry poll or on each skeleton frame |
| Show a static `ink-800` block when Reduce Motion is on | Keep the shimmer sweep running under Reduce Motion |
| Cap tab-bar counts at "99+" with a VoiceOver value | Render a 4-digit badge that clips the tab icon |
| Use a determinate bar with a step/percent label for known totals | Show an indeterminate sweep when you already know the total |

## Checklist
- [ ] Loading uses skeleton for content, spinner for actions — not mixed on one surface.
- [ ] The loading state reserves the resolved footprint; no layout shift on arrival.
- [ ] Spinner/progress fill is `violet-500`; skeleton base is `ink-800`.
- [ ] Every status (success/warning/danger/info) pairs color + SF Symbol + text.
- [ ] Inline banners use the exact tint bg + border + text from the spec table.
- [ ] Empty state = SF Symbol + title + one line + at most one primary action.
- [ ] Error state states cause + fix in plain language and offers Try again.
- [ ] Shimmer and non-essential motion are disabled under Reduce Motion.
- [ ] Badges carry a VoiceOver value and cap at "99+".
- [ ] Toasts respect the bottom/top safe-area inset and sit at z 70.

## Related
- `./13-navigation.md` — tab bar where count badges live
- `./12-cards-surfaces.md` — surfaces skeletons stand in for
- `./08-motion-animation.md` — springs, Reduce Motion, toast entry
- `./16-data-display.md` — badges, tags, and status dots on data
- `./17-design-tokens.md` — the semantic tokens consumed above
