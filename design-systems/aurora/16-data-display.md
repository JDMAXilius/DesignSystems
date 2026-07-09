# 16 · Data display — Aurora Design System
> How Aurora shows identity, labels, numbers, and structured facts on a small screen — avatars, badges and tags, key–value rows, KPI blocks, and dividers — legibly and without color-only meaning.

Aurora is iOS-first and locks to its fixed dark "midnight" appearance (SwiftUI `.preferredColorScheme(.dark)`; RN `UIUserInterfaceStyle=Dark`). All values are single, fixed values — no light/dark pairs.

## Principles
- **Numbers are the hero — align them.** KPI values use `monospacedDigit()` so figures line up and don't jitter as they change.
- **Identity degrades gracefully.** An avatar always resolves: image → initials on a deterministic tint → a neutral fallback. Never a broken image.
- **Meaning is never color alone.** A delta, a status dot, or a tag pairs its color with an arrow icon, a label, or a shape (WCAG 2.2, VoiceOver).
- **Labels are terse.** Tags and chips are ≤2 words; key labels are `subheadline` and quiet so the value reads first.
- **Prefer a popover/sheet to a tooltip.** Hover tooltips don't exist on touch — explain in a popover or an info sheet.

## The system

### Avatars
| Size | Use | Radius |
|---|---|---|
| 28pt | dense lists, inline mentions | `radius-full` |
| 36pt | list rows, comments | `radius-full` |
| 44pt | primary row, header (meets touch floor if tappable) | `radius-full` |
| 64pt | profile / detail header | `radius-full` |

- **Initials fallback**: 1–2 uppercase letters on a **deterministic tint** derived from a hash of the name, so the same person is always the same color. Text is `#0A0E17` on the tint for contrast. Draw tints from the accent families only (`violet-400`, `teal-400`, `pink-400`) — never a status color.
- **Status dot**: 10pt `radius-full`, bottom-trailing, with a **2pt `ink-900` #10151F ring** so it reads against any avatar. Colors: online `#34D399`, away `#FBBF24`, busy `#F4544E`, offline `ink-400`.
- **Groups**: overlap avatars by **25%** of their width, cap at **4** visible, then a `+N` counter chip (same size, `ink-800` bg, `ink-200` `caption1` text). VoiceOver reads the full count ("Ana, Beto, and 3 others").

### Badges, tags & chips
| Kind | Shape | Recipe |
|---|---|---|
| Badge (count/status) | `radius-full` | tint bg + text from the status recipe; `caption2` |
| Tag (attribute) | `radius-xs` (6) | `ink-800` bg, `ink-200` text, 8pt h-padding, `caption1` |
| Chip (selectable) | `radius-full` | unselected `ink-800`/`ink-200`; selected `violet-500` bg / `#FFFFFF` text |

Tint recipes (bg / text): success `rgba(52,211,153,0.14)` / `#6EE7B7` · warning `rgba(251,191,36,0.14)` / `#FCD34D` · danger `rgba(244,84,78,0.14)` / `#FF8A85` · info `rgba(76,235,203,0.14)` / `#7BF3DC`. Keep labels ≤2 words; a status badge pairs its tint with a leading SF Symbol.

### Key–value rows
- Layout: label leading (`subheadline`, `text-secondary` #9AA3BF), value trailing (`body`, `text-primary` #F4F6FB). 12pt vertical padding, 16pt screen margin, `border-hairline` #232A3A divider between rows.
- Values wrap to a second line under the label if long; never truncate a critical value.
- Tappable rows (drill-in) show a `chevron.right` in `ink-400` and keep the full 44pt row as the target.

### Stat / KPI blocks
| Element | Style |
|---|---|
| Value | `title1` (28 Bold) or `largeTitle` (34) for the hero, **`monospacedDigit()`**, `text-primary` |
| Label | `subheadline` (15), `text-secondary` `ink-300` #9AA3BF |
| Delta | icon (`arrow.up.right` / `arrow.down.right`) + `footnote`; up `#34D399`, down `#F4544E` — **icon carries direction, color reinforces** |

Group KPIs on a `radius-lg` (20) `ink-900` card; align values on the mono baseline. See `./12-cards-surfaces.md`.

### Tooltips → popover / info sheet
Tooltips are rare on mobile — there's no hover, and a floating label competes with the finger. Instead:
- Attach an `info.circle` (17pt, `ink-400`) affordance; tap opens a **popover** (iPad) or a small **info sheet** (`.presentationDetents([.medium])`) with a `headline` + `subheadline` explanation.
- Keep it dismissible by swipe-down + a Done button. Never rely on a tooltip to convey required information.

### Dividers
- Hairline: 1pt `border-hairline` `ink-700` #232A3A between rows.
- Section gap: prefer 24–32pt whitespace over a heavy rule. Use `border-default` `ink-600` only to separate major regions.
- Inset row dividers to align with content (leading inset = avatar/leading width + gap), not edge-to-edge, inside grouped lists.

## Tokens
| DTCG | Swift | TS |
|---|---|---|
| `color.text.primary` | `Aurora.Color.textPrimary` | `tokens.color.text.primary` |
| `color.text.secondary` | `Aurora.Color.textSecondary` | `tokens.color.text.secondary` |
| `color.surface.default` | `Aurora.Color.surfaceDefault` | `tokens.color.surface.default` |
| `color.border.hairline` | `Aurora.Color.borderHairline` | `tokens.color.border.hairline` |
| `radius.full` | `Aurora.Radius.full` | `tokens.radius.full` |
| `radius.lg` | `Aurora.Radius.lg` | `tokens.radius.lg` |
| `font.largeTitle` | `Aurora.Font.largeTitle` | `tokens.font.largeTitle` |

```json
{
  "radius": {
    "full": { "$value": 9999, "$type": "dimension", "$description": "pills, avatars, FAB" },
    "lg":   { "$value": 20,   "$type": "dimension", "$description": "cards, panels" }
  },
  "color": {
    "text": { "secondary": { "$value": "#9AA3BF", "$type": "color", "$description": "labels, KPI captions" } }
  }
}
```

## Usage

**SwiftUI** — avatar with initials fallback + status dot, and a KPI stat block:
```swift
struct Avatar: View {
    let name: String
    let image: Image?
    var size: CGFloat = 44
    var status: Status? = nil

    // Deterministic tint from the accent families — same name → same color.
    private var tint: Color {
        let palette = [Aurora.Color.violet400, Aurora.Color.teal400, Aurora.Color.pink400]
        return palette[abs(name.hashValue) % palette.count]
    }
    private var initials: String {
        name.split(separator: " ").prefix(2).compactMap { $0.first }.map(String.init).joined().uppercased()
    }

    var body: some View {
        ZStack {
            if let image { image.resizable().scaledToFill() }
            else { tint; Text(initials).font(.headline).foregroundStyle(Aurora.Color.textOnAccentTeal) }
        }
        .frame(width: size, height: size)
        .clipShape(Circle())                       // radius-full
        .overlay(alignment: .bottomTrailing) {
            if let status {
                Circle().fill(status.color)
                    .frame(width: 10, height: 10)
                    .overlay(Circle().stroke(Aurora.Color.surfaceDefault, lineWidth: 2)) // 2pt ink-900 ring
            }
        }
        .accessibilityLabel(name)
    }
}

struct Stat: View {
    let value: String, label: String, delta: Delta
    var body: some View {
        VStack(alignment: .leading, spacing: Aurora.Spacing.space1) {
            Text(value).font(.largeTitle.weight(.bold)).monospacedDigit()
                .foregroundStyle(Aurora.Color.textPrimary)
            Label(delta.text, systemImage: delta.up ? "arrow.up.right" : "arrow.down.right")
                .font(.footnote)
                .foregroundStyle(delta.up ? Aurora.Color.feedbackSuccessSolid : Aurora.Color.feedbackDangerSolid)
            Text(label).font(.subheadline).foregroundStyle(Aurora.Color.textSecondary)
        }
    }
}
```

**RN** — same avatar fallback and stat. Android/Material note: avatars map to Material `Avatar`; use `fontVariant: ['tabular-nums']` for aligned digits where `monospacedDigit` isn't available.
```tsx
import { View, Text, Image } from 'react-native';
import { tokens } from '../tokens';

const PALETTE = [tokens.color.accent.violet, tokens.color.accent.teal, tokens.color.accent.pink];
const hash = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);
const initials = (n: string) =>
  n.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

function Avatar({ name, uri, size = 44, status }: AvatarProps) {
  const tint = PALETTE[hash(name) % PALETTE.length];
  return (
    <View accessibilityLabel={name}
          style={{ width: size, height: size, borderRadius: tokens.radius.full,
                   backgroundColor: tint, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {uri
        ? <Image source={{ uri }} style={{ width: size, height: size }} />
        : <Text style={{ color: tokens.color.text.onAccentTeal, fontSize: 17, fontWeight: '600' }}>{initials(name)}</Text>}
      {status && (
        <View style={{ position: 'absolute', right: 0, bottom: 0, width: 10, height: 10,
                       borderRadius: tokens.radius.full, backgroundColor: STATUS[status],
                       borderWidth: 2, borderColor: tokens.color.surface.default }} /> /* 2pt ink-900 ring */
      )}
    </View>
  );
}

function Stat({ value, label, delta }: StatProps) {
  return (
    <View style={{ gap: tokens.space['1'] }}>
      <Text style={{ fontSize: 34, fontWeight: '700', color: tokens.color.text.primary,
                     fontVariant: ['tabular-nums'] }}>{value}</Text>
      <Text style={{ fontSize: 13, color: delta.up ? tokens.color.feedback.success.solid : tokens.color.feedback.danger.solid }}>
        {delta.up ? '↗' : '↘'} {delta.text}
      </Text>
      <Text style={{ fontSize: 15, color: tokens.color.text.secondary }}>{label}</Text>
    </View>
  );
}
```

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Render KPI values with `monospacedDigit()` / `tabular-nums` | Use a proportional font so digits jitter as the number updates |
| Fall back to initials on a deterministic tint when no image | Show a broken-image glyph or an empty gray box |
| Pair a delta color with an up/down arrow icon | Show a red or green number with no arrow — color-only meaning |
| Give the status dot a 2pt `ink-900` ring so it reads on any avatar | Put a bare `#34D399` dot on a light photo where it vanishes |
| Overlap group avatars 25%, cap at 4, then `+N` | Cram 9 overlapping avatars off the edge of the row |
| Keep tags/chips ≤2 words on `radius-xs`/`radius-full` | Wrap a 6-word sentence inside a chip |
| Open a popover or info sheet from an `info.circle` tap | Rely on a hover tooltip that never appears on touch |
| Keep a tappable key–value row at the full 44pt height | Ship a 24pt drill-in row that fails the touch floor |
| Use a 1pt `ink-700` hairline, inset to align with content | Separate every row with a heavy `ink-600` edge-to-edge rule |
| Draw initials tints from accent families only | Use a status color (danger red) as an identity avatar tint |
| Give avatar groups a VoiceOver count ("+3 others") | Leave the `+N` chip unlabeled for VoiceOver |
| Let a critical value wrap to a second line | Truncate an account balance with an ellipsis |

## Checklist
- [ ] Avatars resolve image → initials → neutral; no broken images.
- [ ] Initials tint is deterministic per name and drawn from accent families.
- [ ] Status dots have a 2pt `ink-900` ring; groups overlap 25%, cap 4, then `+N`.
- [ ] KPI values use `monospacedDigit()` / `tabular-nums` and align on baseline.
- [ ] Every delta and status pairs color with an icon or label.
- [ ] Tags/chips are ≤2 words with the correct radius and tint recipe.
- [ ] Key–value rows use `subheadline` label + `body` value; critical values never truncate.
- [ ] Tooltips replaced by popover/info sheet; nothing essential lives only in a tooltip.
- [ ] Dividers are 1pt `ink-700` hairlines, inset to content.
- [ ] All colors come from semantic tokens, never inline hex.

## Related
- `./01-color.md` — accent families and status recipes
- `./02-typography.md` — the type ramp and `monospacedDigit`
- `./12-cards-surfaces.md` — KPI cards and grouped surfaces
- `./15-feedback-status.md` — badges, count indicators, status dots
- `./17-design-tokens.md` — the semantic tokens consumed above
