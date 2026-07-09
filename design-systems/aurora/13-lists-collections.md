# 13 · Lists & collections — Aurora Design System
> How Aurora renders scrollable rows, sections, grids, and their states — fast, tactile, and readable on the midnight canvas.

## Principles
- **Rows are tappable objects.** Every row is at least 44pt tall with a clear tap target and, where it navigates, a trailing chevron.
- **Separate with hairlines, not boxes.** Group with inset hairline separators and section headers, not a border around each row.
- **Reveal actions on swipe.** Destructive and quick actions live behind a swipe; full-swipe confirms with a warning haptic.
- **Stay smooth at scale.** Always virtualize; give every item a stable key; never measure or animate off-screen rows.
- **Every list has a zero state.** An empty list shows a helpful empty state, never a blank scroll area.

## The system

### Row anatomy
| Part | Spec |
|---|---|
| Min height | **44pt** (HIG floor); comfortable 56–60pt with subtitle |
| Vertical padding | 12pt (space-3) |
| Horizontal inset | 16pt (space-4) |
| Leading icon | 24pt SF Symbol, inherits text color |
| Title | `headline` 17 Semibold, `ink-50` |
| Subtitle | `subheadline` 15 Regular, `ink-300` |
| Trailing | chevron (`chevron.right`, `ink-400`) **or** control (toggle/badge) |
| Row surface | `ink-900 #10151F` |
| Row radius | radius-md 14pt (grouped/inset lists) |
| Separator | hairline `ink-700 #232A3A`, **inset to the title's leading edge** |

### List styles
- **Grouped (inset)**: rows on `ink-900` cards with radius-md, sitting on the `ink-950` app background; section gaps 24–32pt. iOS default for settings/forms.
- **Plain**: full-width rows, edge-to-edge hairline separators, sticky section headers. Use for long homogeneous feeds.
- **Section header**: `footnote` 13 uppercase-optional, `ink-300`, 8pt below top padding. **Footer**: `footnote`, `ink-400`, explanatory.

### Swipe actions
- **Trailing swipe**: destructive (Delete, danger `#F4544E`) + secondary (Archive, `ink-800`).
- **Leading swipe**: positive quick action (e.g. Mark done, teal `#2FE0C0`).
- **Full-swipe** triggers the first destructive action; fire an **`impact rigid` / `notification warning`** haptic at the threshold.
- Action buttons ≥ 44pt wide; icon + short label.

### Grids
- 2-column card grid default, 16pt gutter, 16pt screen margin; cards radius-lg 20pt.
- Use an **adaptive** layout so wider screens (iPad, landscape) add columns at ~minimum 160pt item width.

### Pull-to-refresh & load-more
- **Pull-to-refresh**: `spring-bouncy` (response 0.50, damping 0.72) reveal; fire one `impact light` on trigger.
- **Infinite scroll**: prefetch when ~2 screens from the bottom; show an inline footer spinner; expose an explicit "Load more" fallback for VoiceOver.
- **Empty state within a list**: centered icon + `title3` headline + `subheadline` explanation + optional primary action; occupies the scroll area.

### Performance
- Virtualize (SwiftUI `List`/`LazyVStack`; RN `FlatList`/`SectionList`). Never `.map` a large array into a `ScrollView`.
- Stable, unique `keyExtractor` / `Identifiable` id — never the array index.
- Keep row cells lightweight; memoize row components; avoid inline closures that break cell reuse.

## Tokens
| Concept | DTCG group | Swift | TS |
|---|---|---|---|
| Row surface | `color.bg.surface` | `Aurora.Color.bgSurface` | `tokens.color.bg.surface` |
| Separator | `color.border.hairline` | `Aurora.Color.borderHairline` | `tokens.color.border.hairline` |
| Row radius | `radius.md` | `Aurora.Radius.md` | `tokens.radius.md` |
| Title text | `color.text.primary` | `Aurora.Color.textPrimary` | `tokens.color.text.primary` |
| Subtitle text | `color.text.secondary` | `Aurora.Color.textSecondary` | `tokens.color.text.secondary` |
| Chevron | `color.text.tertiary` | `Aurora.Color.textTertiary` | `tokens.color.text.tertiary` |
| Destructive | `color.action.destructive.bg` | `Aurora.Color.actionDestructiveBg` | `tokens.color.action.destructive.bg` |
| Refresh spring | `motion.spring.bouncy` | `Aurora.Spring.bouncy` | `tokens.motion.spring.bouncy` |

## Usage

### List, swipe actions & pull-to-refresh (SwiftUI)
```swift
struct TripList: View {
    @State private var trips: [Trip]
    var body: some View {
        List {
            Section("Upcoming") {
                ForEach(trips) { trip in
                    NavigationLink(value: trip) {
                        RowLabel(title: trip.name, subtitle: trip.date) // 44pt min, chevron via NavigationLink
                    }
                    .listRowBackground(Aurora.Color.bgSurface)
                    .swipeActions(edge: .trailing, allowsFullSwipe: true) {
                        Button(role: .destructive) {
                            Haptics.notify(.warning)  // warning haptic at full-swipe
                            delete(trip)
                        } label: { Label("Delete", systemImage: "trash") }
                    }
                    .swipeActions(edge: .leading) {
                        Button { markDone(trip) } label: { Label("Done", systemImage: "checkmark") }
                            .tint(Aurora.Color.tealAccent)
                    }
                }
            } footer: { Text("Trips sync automatically.").font(Aurora.Font.footnote) }
        }
        .listStyle(.insetGrouped)              // grouped; use .plain for feeds
        .refreshable { await reload() }         // bouncy pull-to-refresh
    }
}
```

### Adaptive grid (SwiftUI)
```swift
ScrollView {
    LazyVGrid(columns: [GridItem(.adaptive(minimum: 160), spacing: Aurora.Spacing.md)],
              spacing: Aurora.Spacing.md) {
        ForEach(items) { item in CardView(item: item) }
    }
    .padding(.horizontal, Aurora.Spacing.md)
}
```

### FlatList, swipeable rows & RefreshControl (React Native)
```tsx
import { FlatList, RefreshControl, View, Text } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { tokens } from "../tokens";

export function TripList({ trips, onReload, onDelete }: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const reload = async () => { setRefreshing(true); await onReload(); setRefreshing(false); };

  const renderRow = ({ item }: { item: Trip }) => (
    <Swipeable
      renderRightActions={() => (
        <DeleteAction onPress={() => onDelete(item.id)} /> // >=44pt wide
      )}
      onSwipeableWillOpen={() =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
      }
    >
      <View style={styles.row}>{/* min height 44, 12pt vertical padding */}
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.date}</Text>
      </View>
    </Swipeable>
  );

  return (
    <FlatList
      data={trips}
      keyExtractor={(t) => t.id}          // stable key, never index
      renderItem={renderRow}
      ItemSeparatorComponent={Separator}   // hairline, inset to text
      onEndReachedThreshold={0.5}          // prefetch ~2 screens early
      onEndReached={loadMore}
      ListEmptyComponent={<EmptyState />}  // zero state
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={reload}
          tintColor={tokens.color.text.secondary} />
      }
      windowSize={7}                        // virtualization tuning
    />
  );
}
```
> **Android/Material note:** iOS inset-grouped lists map to Material list items with dividers; swipe-to-dismiss maps to Material `SwipeToDismiss`. RN `RefreshControl` uses the Material circular spinner on Android. Keep the 48dp minimum row height on Android.

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Give every row a 44pt minimum height (48dp on Android) | Ship 32pt rows that fail the touch floor |
| Inset separators to the title's leading edge | Run a full-width separator through the leading icon |
| Use a trailing chevron only when the row navigates | Add a chevron to a row that just toggles a switch |
| Put Delete behind a trailing swipe with a warning haptic at full-swipe | Delete instantly on tap with no confirmation or haptic |
| Virtualize with `List`/`FlatList` and stable keys | `.map` thousands of rows into a `ScrollView` using index keys |
| Prefetch the next page ~2 screens before the end | Wait until the user hits the exact bottom, then stall |
| Use `spring-bouncy` + one `impact light` on pull-to-refresh | Fire a haptic on every scroll frame during refresh |
| Show a centered empty state with an action in an empty list | Leave a blank scroll area with no explanation |
| Group with inset cards on `ink-900` over the `ink-950` background | Draw a hard border box around every single row |
| Use `.adaptive` grids that add columns on iPad/landscape | Hard-code 2 columns so iPad shows huge stretched cards |
| Memoize row cells and keep them lightweight for reuse | Recreate heavy inline closures per render, killing cell reuse |
| Pair status color in a row with an icon or label | Signal "overdue" with red text color alone |

## Checklist
- [ ] Rows are ≥ 44pt (48dp Android) with clear title/subtitle hierarchy.
- [ ] Separators are hairline `ink-700`, inset to the text, not through the icon.
- [ ] Trailing chevron appears only on navigating rows; controls replace it otherwise.
- [ ] Swipe actions defined; full-swipe destructive fires a warning haptic.
- [ ] List is virtualized with stable, non-index keys.
- [ ] Infinite scroll prefetches early and offers a VoiceOver-reachable "Load more".
- [ ] Pull-to-refresh uses `spring-bouncy` and a single `impact light`.
- [ ] Every list defines an empty state and a loading state.
- [ ] Grids use adaptive columns and respect the 16pt screen margin.

## Related
- [12 · Modals, sheets & overlays](./12-modals-sheets-overlays.md)
- [14 · Cards & surfaces](./14-cards-surfaces.md)
- [11 · Navigation](./11-navigation.md)
- [08 · Haptics](./08-haptics.md)
- [07 · Motion](./07-motion.md)
- [10 · Icons](./10-icons.md)
