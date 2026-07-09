# 04 · Layout, spacing & safe areas — Aurora Design System
> How Aurora spaces content on a 4pt grid and keeps it clear of the notch, Dynamic Island, and home indicator on every device.

## Principles
- **Points, never pixels.** Every value is in pt (iOS) / dp (Android/RN). The runtime maps points to physical pixels; you never reason in px.
- **A 4pt rhythm.** All spacing comes from one scale built on a 4pt grid. Consistent gaps make dense mobile screens feel calm and premium.
- **Content lives inside the safe area.** Text and controls always respect the safe-area insets; only decorative full-bleed backgrounds may extend behind them.
- **Breathe at the edges.** A 16pt screen margin is the default gutter; use it everywhere so screens feel like one family.
- **Reflow, don't clip.** Layouts grow with Dynamic Type and rotate into landscape without truncating content.

## The system

### Spacing scale (4pt grid)
| Token | Value (pt/dp) | Typical use |
|---|---|---|
| space-0 | 0 | reset / flush |
| space-0.5 | 2 | hairline nudge, icon-to-label |
| space-1 | 4 | tight inner padding |
| space-2 | 8 | min gap between targets, chip padding |
| space-3 | 12 | list row vertical padding |
| space-4 | 16 | **screen margin (default)**, card padding, field gap |
| space-5 | 20 | spacious screen margin |
| space-6 | 24 | section gap (min) |
| space-8 | 32 | section gap (max), block separation |
| space-10 | 40 | large block spacing |
| space-12 | 48 | hero spacing |
| space-16 | 64 | oversized rhythm |
| space-20 | 80 | full-screen empty-state centering |
| space-24 | 96 | splash / marketing spacing |

### Screen & content spacing
- **Screen horizontal margin:** 16pt default; 20pt (space-5) for spacious/marketing layouts.
- **List row vertical padding:** 12pt (space-3).
- **Section gap:** 24–32pt (space-6 to space-8).
- **Between form fields:** 16pt (space-4).
- **Min gap between adjacent touch targets:** 8pt (space-2).

### Safe areas (mobile-critical)
The safe area is the region not covered by system chrome. Respect insets on all four edges:
| Edge | What's there | Typical inset |
|---|---|---|
| Top | Status bar, notch, **Dynamic Island** | 44–59pt (device-dependent) |
| Bottom | Home indicator | ~34pt |
| Left / Right | Landscape rounded-corner / sensor insets | device-dependent |

Rules:
- **Content respects the safe area.** Interactive and readable content sits inside the insets.
- **Full-bleed backgrounds extend behind.** A background color, image, or the signature aurora gradient may run edge-to-edge *behind* safe content — never place tappable or readable content in the unsafe region.
- **Bottom tab bar** sits above the home indicator (its background extends down, its content does not).
- **Sheets, toasts, and floating buttons** respect the bottom inset.
- Read insets at runtime; never hardcode 34pt or 44pt — they differ per device and orientation.

### Android/Material note
On Android, use `WindowInsets` (system bars, display cutout, navigation bar — gesture vs. 3-button). In React Native, `react-native-safe-area-context` reads both iOS safe areas and Android insets from one API, so the same layout code works cross-platform. Material's default screen margin is 16dp, matching Aurora.

## Tokens
DTCG group `space` (primitive) → semantic aliases for common roles.

```json
{ "space": {
  "4":  { "$value": "16", "$type": "dimension", "$description": "Default screen margin, card padding" },
  "3":  { "$value": "12", "$type": "dimension" },
  "6":  { "$value": "24", "$type": "dimension" },
  "2":  { "$value": "8",  "$type": "dimension" }
}}
```
| DTCG | Swift | TypeScript |
|---|---|---|
| `space.4` | `Aurora.Spacing.md` | `tokens.space.md` (16) |
| `space.3` | `Aurora.Spacing.sm` | `tokens.space.sm` (12) |
| `space.6` | `Aurora.Spacing.lg` | `tokens.space.lg` (24) |
| `space.2` | `Aurora.Spacing.xs` | `tokens.space.xs` (8) |
| `layout.screen-margin` | `Aurora.Layout.screenMargin` | `tokens.layout.screenMargin` (16) |

## Usage
A safe-area-correct screen: the aurora gradient is full-bleed behind, while content stays inside the insets.

```swift
struct HomeScreen: View {
    var body: some View {
        ZStack {
            // Full-bleed background — extends BEHIND the safe area.
            LinearGradient(
                colors: [Aurora.Color.teal500, Aurora.Color.violet500, Aurora.Color.pink500],
                startPoint: .topLeading, endPoint: .bottomTrailing
            )
            .ignoresSafeArea() // background only

            // Content — automatically inset by the safe area.
            ScrollView {
                VStack(alignment: .leading, spacing: Aurora.Spacing.lg) { // 24
                    Text("Good evening")
                        .font(Aurora.Font.largeTitle)
                        .foregroundStyle(Aurora.Color.textPrimary)
                    ForEach(cards) { CardView($0) }
                }
                .padding(.horizontal, Aurora.Spacing.md) // 16 screen margin
                .padding(.top, Aurora.Spacing.lg)
            }
        }
        .preferredColorScheme(.dark) // Aurora locks to its fixed dark appearance
    }
}
```

```tsx
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View, Text } from 'react-native';
import { tokens } from '../tokens';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      {/* Full-bleed gradient behind everything, including the safe area */}
      <LinearGradient
        colors={[tokens.color.teal[500], tokens.color.violet[500], tokens.color.pink[500]]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {/* SafeAreaView keeps content clear of notch / home indicator */}
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: tokens.space.md, // 16 screen margin
            paddingTop: tokens.space.lg,         // 24
            paddingBottom: insets.bottom + tokens.space.lg, // respect home indicator
            rowGap: tokens.space.lg,
          }}>
          <Text style={{ color: tokens.color.text.primary, fontSize: 34, fontWeight: '700' }}>
            Good evening
          </Text>
          {cards.map((c) => <CardView key={c.id} {...c} />)}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
```

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Use `16pt` (space-4) as the default screen margin on every screen | Don't invent one-off margins like `15pt` or `18pt` off the grid |
| Pull every gap from the 4pt scale (8, 12, 16, 24…) | Don't use arbitrary values like `7pt` or `13pt` |
| Let the aurora gradient run full-bleed behind content with `.ignoresSafeArea()` | Don't `.ignoresSafeArea()` on the content layer — text will slide under the Dynamic Island |
| Read the home-indicator inset at runtime and add it to bottom padding | Don't hardcode `34pt` — it differs by device and orientation |
| Keep tappable content inside the safe area on all four edges | Don't place a button in the top-left corner behind the notch in landscape |
| Use `react-native-safe-area-context` so one layout covers iOS and Android insets | Don't rely on `StatusBar.currentHeight` alone — it misses the Dynamic Island and home indicator |
| Reflow sections vertically and let them grow with Dynamic Type | Don't lock a row to a fixed height that clips text at accessibility sizes |
| Sit the tab bar background above the home indicator, content above the inset | Don't let a bottom CTA overlap the home indicator swipe zone |
| Use 12pt vertical padding on list rows for a comfortable tap rhythm | Don't cram rows to 4pt padding — they feel jittery and cross the 44pt floor |
| Keep at least 8pt between adjacent touch targets | Don't butt two buttons edge-to-edge with no gap |

## Checklist
- [ ] Every spacing value comes from the 4pt scale (space-*).
- [ ] Screen horizontal margin is 16pt (or a deliberate 20pt for spacious layouts).
- [ ] Content respects safe-area insets on all four edges.
- [ ] Full-bleed backgrounds extend behind the safe area, not the content.
- [ ] Bottom padding includes the home-indicator inset (read at runtime).
- [ ] Tab bar / sheets / toasts respect the bottom inset.
- [ ] Layout reflows without clipping at large Dynamic Type sizes.
- [ ] Landscape side insets are respected (no content behind rounded corners).
- [ ] Root locks to Aurora's fixed dark appearance.

## Related
- [05 · Iconography & SF Symbols](./05-iconography-sf-symbols.md)
- [06 · Elevation, depth & materials](./06-elevation-depth-materials.md)
- [07 · Motion & haptics](./07-motion-haptics.md)
- [08 · Touch, gestures & targets](./08-touch-gestures-targets.md)
