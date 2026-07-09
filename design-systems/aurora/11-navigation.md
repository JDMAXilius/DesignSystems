# 11 · Navigation — Aurora Design System

> Navigation follows Apple HIG: a blurred bottom tab bar for top-level sections, a large-title nav stack for depth, and sheets for focused, dismissible tasks.

## Principles

- **Tabs for sections, stack for depth.** 2–5 top-level destinations live in the bottom tab bar; drilling into detail pushes onto a nav stack.
- **Respect the safe area.** The tab bar sits above the home indicator; large titles clear the Dynamic Island; content never hides behind chrome.
- **Chrome is glass.** Nav and tab bars use a blur material over scrolling content — very iOS. Reduce Transparency swaps blur for solid ink-800.
- **Sheets for focus, push for continuation.** A self-contained, dismissible task is a sheet with detents; continuing the same flow is a push.
- **Every destination is labeled for VoiceOver.** Tabs, back buttons, and sheet controls carry clear accessibility labels.

## The system

### Bottom tab bar

| Property | Value |
|---|---|
| Position | bottom, above home-indicator inset |
| Tab count | 2–5 |
| Height | ~49pt + bottom safe-area inset |
| Background | blur material (`.regularMaterial`) |
| Active | violet-500 `#7C6CFF` (icon + label) |
| Inactive | ink-400 `#6B7488` |
| Icon | SF Symbol, 24pt |
| Label | caption2 `11` |

Selecting a tab fires a `selection` haptic. Keep the tab bar visible on top-level screens; only hide it deliberately (e.g. an immersive full-screen player), never arbitrarily mid-flow.

### Nav stack

| Property | Value |
|---|---|
| Large title | largeTitle `34` Bold, collapses to inline `17` Semibold on scroll |
| Back | chevron + title; left-edge swipe-back gesture |
| Bar background | blur material |
| Tint | violet-500 for bar buttons |

Large title sits at the top of a scroll view and collapses to an inline title as content scrolls up. Preserve the swipe-from-left-edge back gesture — don't override it.

### Sheets vs push

| Use a sheet when… | Use a push when… |
|---|---|
| The task is self-contained and dismissible (compose, filter, quick pick). | The user continues the same drill-down flow (list → detail). |
| You want detents (`.medium` / `.large`) and a grabber. | You want a large title and back navigation. |
| Dismiss via swipe-down or a Cancel/Done button. | Dismiss via back chevron or swipe-back. |

Sheets carry a grabber handle, use radius-xl `28`, and respect the bottom inset. Layering order: nav/tab bar 20 · scrim 40 · sheet 50 · alert 60.

### Deep links & back stack

- A deep link should rebuild a sensible back stack: land on the target screen with a working Back to its parent, not a dead end.
- Restore the correct tab plus the pushed detail when resuming from a link or state restoration.
- Modally-presented deep-link targets dismiss back to where the user was.

## Tokens

| DTCG group | Swift | TS |
|---|---|---|
| `color.action.primary.bg` (active tab / tint) | `Aurora.Color.actionPrimaryBg` | `tokens.color.action.primary.bg` |
| `color.text.tertiary` (inactive tab) | `Aurora.Color.textTertiary` | `tokens.color.text.tertiary` |
| `color.bg.surface.raised` (solid fallback) | `Aurora.Color.bgSurfaceRaised` | `tokens.color.bg.surfaceRaised` |
| `radius.xl` (sheets) | `Aurora.Radius.xl` | `tokens.radius.xl` |
| `font.largeTitle` | `Aurora.Font.largeTitle` | `tokens.font.largeTitle` |
| `font.caption2` | `Aurora.Font.caption2` | `tokens.font.caption2` |

## Usage

### SwiftUI — TabView + NavigationStack with large title and toolbar

```swift
struct RootView: View {
    var body: some View {
        TabView {
            NavigationStack {
                LibraryList()
                    .navigationTitle("Library")               // large title 34, collapses to inline 17
                    .toolbar {
                        ToolbarItem(placement: .topBarTrailing) {
                            Button { addItem() } label: { Image(systemName: "plus") }
                                .accessibilityLabel("Add item")
                        }
                    }
            }
            .tabItem { Label("Library", systemImage: "square.stack") }   // SF Symbol + caption2

            NavigationStack { SettingsScreen() }
                .tabItem { Label("Settings", systemImage: "gearshape") }
        }
        .tint(Aurora.Color.actionPrimaryBg)                   // active tab / bar tint = violet-500
        .preferredColorScheme(.dark)                          // Aurora locks to its fixed dark appearance
    }
}

// A focused, dismissible task → sheet with detents + grabber
.sheet(isPresented: $showFilter) {
    FilterView()
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
}
```

### React Native — bottom-tabs + native-stack

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';
import { tokens } from '../tokens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerLargeTitle: true, headerTintColor: tokens.color.action.primary.bg }}>
      <Stack.Screen name="Library" component={LibraryList} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.color.action.primary.bg,   // violet-500
        tabBarInactiveTintColor: tokens.color.text.tertiary,     // ink-400
        tabBarBackground: () => <BlurView tint="dark" intensity={80} style={{ flex: 1 }} />,
        tabBarStyle: { position: 'absolute' },                   // let blur show through
      }}
    >
      <Tab.Screen name="Library" component={LibraryStack}
        options={{ tabBarAccessibilityLabel: 'Library', tabBarIcon: ({ color }) => <Icon name="stack" color={color} /> }} />
      <Tab.Screen name="Settings" component={SettingsScreen}
        options={{ tabBarAccessibilityLabel: 'Settings', tabBarIcon: ({ color }) => <Icon name="gear" color={color} /> }} />
    </Tab.Navigator>
  );
}
```

**iOS-first / Android note:** on iOS this is a blurred tab bar with large collapsing titles and a swipe-from-left-edge back gesture. On Android/Material, the tab bar maps to a **bottom navigation bar**, there is **no swipe-back by default** (the system Back button/gesture handles it), titles are inline (no large-title collapse), and `expo-blur` degrades toward a solid ink-800 surface — keep violet-500 active / ink-400 inactive.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Keep top-level tabs between 2 and 5. | Ship 7 tabs or a single-tab bar — use a stack or menu instead. |
| Sit the tab bar above the home-indicator inset. | Let the tab bar overlap the home indicator or clip its labels. |
| Keep the tab bar visible on top-level screens. | Hide the tab bar arbitrarily mid-flow so users lose their map. |
| Use SF Symbol + caption2 label with violet-500 active / ink-400 inactive. | Ship icon-only tabs with no labels or color-only active state. |
| Give every tab and back button a VoiceOver/`accessibilityLabel`. | Leave a chevron-only back button unlabeled for VoiceOver. |
| Let large titles collapse to inline on scroll. | Pin a 34pt large title so it eats the whole first screen. |
| Preserve the swipe-from-left-edge back gesture. | Override or disable swipe-back and force a tiny back button. |
| Use a sheet with detents for a self-contained, dismissible task. | Push a modal filter form onto the nav stack with a back chevron. |
| Rebuild a sensible back stack from a deep link. | Deep-link into a screen with a dead-end Back button. |
| Swap blur for solid ink-800 when Reduce Transparency is on. | Keep heavy blur when Reduce Transparency is enabled. |

## Checklist

- [ ] 2–5 top-level tabs, each with an SF Symbol and caption2 label.
- [ ] Tab bar sits above the home-indicator safe-area inset.
- [ ] Active tab violet-500, inactive ink-400; `selection` haptic on switch.
- [ ] Nav bar uses a large title that collapses to inline on scroll.
- [ ] Swipe-from-left-edge back gesture is preserved.
- [ ] Sheets use detents + grabber; pushes use back chevron.
- [ ] Deep links rebuild a working back stack.
- [ ] Blur chrome falls back to solid ink-800 under Reduce Transparency.
- [ ] Tabs and back buttons have VoiceOver labels.
- [ ] Android note applied: bottom navigation, no swipe-back by default.

## Related

- [01 · Color](02-color.md)
- [04 · Elevation & depth](06-elevation-depth-materials.md)
- [08 · Motion & animation](07-motion-haptics.md)
- [09 · Buttons & actions](09-buttons-actions.md)
- [10 · Forms & inputs](10-forms-inputs.md)
- [15 · Accessibility](20-accessibility.md)
