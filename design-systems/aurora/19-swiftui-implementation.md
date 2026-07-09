# 19 · SwiftUI implementation — Aurora Design System

> How to build Aurora in SwiftUI: project setup, consuming the generated `AuroraTokens.swift`, and shipping native ButtonStyles, ViewModifiers, and screens that lock to the fixed dark appearance.

## Principles
- **Lean on the system.** Use SwiftUI's native primitives — text styles for Dynamic Type, `ButtonStyle`, materials, `.presentationDetents`, `.sensoryFeedback`. Aurora styles them; it doesn't replace them.
- **Tokens are the only source of values.** `AuroraTokens.swift` (extensions on `Color`, `Font`, `CGFloat`) is generated from the same DTCG source as the RN build. Never inline a hex or a pt value.
- **Semantic, not primitive.** Views read `Aurora.Color.actionPrimaryBg`, not `Aurora.Color.violet500`. Primitives build semantics; screens use semantics.
- **One fixed appearance.** Aurora is single-mode dark. Apply `.preferredColorScheme(.dark)` at the App root and use fixed `Color` values — no dynamic color providers.
- **Tactile and continuous.** 44pt touch floor, continuous (squircle) corners, spring press feedback, and `.sensoryFeedback` haptics are part of every interactive component.

## The system

### Project setup
- **Minimum deployment target: iOS 16.** Aurora relies on iOS 16 APIs: `.presentationDetents` for sheets and `.sensoryFeedback` (iOS 17) for haptics with a UIFeedbackGenerator fallback on 16.
- Add Aurora as a Swift package (see structure below), or drop `AuroraTokens.swift` into the app target.
- Prefer `RoundedRectangle(cornerRadius:style:.continuous)` everywhere for the iOS squircle.

### Locking the appearance (single mode — critical)
Aurora defines one fixed dark appearance. Apply it once at the App root; never branch on `colorScheme`.

```swift
@main
struct AuroraApp: App {
    var body: some Scene {
        WindowGroup {
            RootView()
                .preferredColorScheme(.dark) // locks Aurora to its fixed dark appearance
        }
    }
}
```

Because tokens carry one value each, there is no light palette. Do not read `@Environment(\.colorScheme)` to pick colors — every `Color` comes from `AuroraTokens.swift`.

### Touch, motion, materials & haptics (from the foundations)
- Minimum touch target **44×44pt** (Android/Material equivalent: 48dp). Extend a small glyph's hit area with `.contentShape(Rectangle())` + padding.
- Press feedback: scale to **0.97** with `spring-snappy` (`.spring(response: 0.30, dampingFraction: 0.85)`).
- Materials: `.ultraThinMaterial` / `.thinMaterial` for nav and tab bars over scrolling content — very iOS. Swap for solid `Aurora.Color.bgSurfaceRaised` under Reduce Transparency.
- Haptics: `.sensoryFeedback` (iOS 17+) or `UIFeedbackGenerator` — impact on primary tap, `.selection` on toggles, `.success` on submit.
- Always respect `@Environment(\.accessibilityReduceMotion)` and `@Environment(\.accessibilityReduceTransparency)`.

## Tokens

### Consuming the generated `AuroraTokens.swift`
The Style Dictionary build emits `ios/AuroraTokens.swift`: extensions on `Color`, `Font`, and `CGFloat`, namespaced under `Aurora`.

```swift
// AuroraTokens.swift (generated — do not edit by hand)
public enum Aurora {
    public enum Color {
        // semantic
        public static let bgApp            = SwiftUI.Color(hex: 0x0A0E17)
        public static let bgSurface        = SwiftUI.Color(hex: 0x10151F)
        public static let bgSurfaceRaised  = SwiftUI.Color(hex: 0x171D2B)
        public static let textPrimary      = SwiftUI.Color(hex: 0xF4F6FB)
        public static let textSecondary    = SwiftUI.Color(hex: 0x9AA3BF)
        public static let actionPrimaryBg        = SwiftUI.Color(hex: 0x7C6CFF)
        public static let actionPrimaryBgPressed = SwiftUI.Color(hex: 0x6551F0)
        public static let actionPrimaryText      = SwiftUI.Color.white
        public static let actionDestructiveBg    = SwiftUI.Color(hex: 0xF4544E)
        public static let borderHairline   = SwiftUI.Color(hex: 0x232A3A)
    }
    public enum Font {
        public static let largeTitle = SwiftUI.Font.largeTitle.bold()   // maps to .largeTitle text style
        public static let title3     = SwiftUI.Font.title3.weight(.semibold)
        public static let headline   = SwiftUI.Font.headline
        public static let body       = SwiftUI.Font.body
        public static let footnote   = SwiftUI.Font.footnote
    }
    public enum Spacing { public static let xs: CGFloat = 8, sm: CGFloat = 12, md: CGFloat = 16, lg: CGFloat = 24 }
    public enum Radius  { public static let sm: CGFloat = 10, md: CGFloat = 14, lg: CGFloat = 20, xl: CGFloat = 28 }
}
```

| DTCG | Swift access | Value |
|---|---|---|
| `color.action.primary.bg` | `Aurora.Color.actionPrimaryBg` | `#7C6CFF` |
| `color.action.primary.bg-pressed` | `Aurora.Color.actionPrimaryBgPressed` | `#6551F0` |
| `color.text.primary` | `Aurora.Color.textPrimary` | `#F4F6FB` |
| `font.body` | `Aurora.Font.body` | `.body` text style |
| `space.4` | `Aurora.Spacing.md` | `16` |
| `radius.md` | `Aurora.Radius.md` | `14` |

Because `Aurora.Font.*` maps to **system text styles** (`.body`, `.largeTitle`…), Dynamic Type works out of the box — the font scales with the user's setting with no extra code.

## Usage

### A custom `ButtonStyle` — `AuroraPrimaryButtonStyle`
Violet background, white text, pressed scale 0.97 with spring, continuous corners at radius-md, a 44pt minimum, and a haptic on press.

```swift
import SwiftUI

struct AuroraPrimaryButtonStyle: ButtonStyle {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(Aurora.Font.headline)                 // .headline text style → Dynamic Type
            .foregroundStyle(isEnabled ? Aurora.Color.actionPrimaryText : Aurora.Color.textSecondary)
            .frame(maxWidth: .infinity, minHeight: 48)  // ≥ 44pt floor, 48 for comfort
            .padding(.horizontal, Aurora.Spacing.lg)
            .background(
                RoundedRectangle(cornerRadius: Aurora.Radius.md, style: .continuous) // squircle
                    .fill(background(configuration))
            )
            .scaleEffect(configuration.isPressed && !reduceMotion ? 0.97 : 1)        // respect Reduce Motion
            .animation(.spring(response: 0.30, dampingFraction: 0.85), value: configuration.isPressed)
            .contentShape(Rectangle())
            .sensoryFeedback(.impact(weight: .medium), trigger: configuration.isPressed) { _, now in now }
    }

    private func background(_ c: Configuration) -> Color {
        guard isEnabled else { return Aurora.Color.bgSurfaceRaised }
        return c.isPressed ? Aurora.Color.actionPrimaryBgPressed : Aurora.Color.actionPrimaryBg
    }
}

extension ButtonStyle where Self == AuroraPrimaryButtonStyle {
    static var auroraPrimary: AuroraPrimaryButtonStyle { .init() }
}
```

On iOS 16, replace `.sensoryFeedback` with a `UIImpactFeedbackGenerator(style: .medium).impactOccurred()` call in the button's action.

### A card `ViewModifier`
Surface fill, level-1 shadow, continuous corners at radius-lg.

```swift
struct AuroraCard: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(Aurora.Spacing.md)
            .background(
                RoundedRectangle(cornerRadius: Aurora.Radius.lg, style: .continuous)
                    .fill(Aurora.Color.bgSurface)
            )
            .shadow(color: .black.opacity(0.35), radius: 8, x: 0, y: 2) // level-1
    }
}
extension View { func auroraCard() -> some View { modifier(AuroraCard()) } }
```

### A screen scaffold
Full-bleed gradient behind, content inside the safe area via `.safeAreaInset`, a `.ultraThinMaterial` bar, and a sheet with detents.

```swift
struct ProfileScreen: View {
    @State private var showSheet = false
    var body: some View {
        ZStack {
            Aurora.Color.bgApp.ignoresSafeArea()
            LinearGradient(colors: [Aurora.Color.actionPrimaryBg, Aurora.Color.bgApp],
                           startPoint: .top, endPoint: .center)
                .opacity(0.35)
                .ignoresSafeArea()                       // background only

            ScrollView {
                VStack(alignment: .leading, spacing: Aurora.Spacing.lg) {
                    Text("Profile")
                        .font(Aurora.Font.largeTitle)
                        .foregroundStyle(Aurora.Color.textPrimary)
                    VStack(alignment: .leading, spacing: Aurora.Spacing.sm) {
                        Text("Account").font(Aurora.Font.title3).foregroundStyle(Aurora.Color.textPrimary)
                        Text("Manage your details").font(Aurora.Font.footnote).foregroundStyle(Aurora.Color.textSecondary)
                    }
                    .auroraCard()
                    Button("Save changes") { showSheet = true }
                        .buttonStyle(.auroraPrimary)
                }
                .padding(.horizontal, Aurora.Spacing.md)  // 16 screen margin
                .padding(.top, Aurora.Spacing.lg)
            }
        }
        // Blur bar chrome over scrolling content — very iOS.
        .safeAreaInset(edge: .bottom) {
            HStack { Spacer() }
                .frame(height: 49)
                .background(.ultraThinMaterial)
        }
        .sheet(isPresented: $showSheet) {
            SaveSheet()
                .presentationDetents([.medium, .large])   // iOS 16 detents
                .presentationDragIndicator(.visible)       // grabber
        }
    }
}
```

### Package structure (SPM)
```
AuroraUI/                       # Swift package
  Package.swift
  Sources/AuroraUI/
    AuroraTokens.swift          # generated — do not edit
    Styles/
      AuroraPrimaryButtonStyle.swift
      AuroraSecondaryButtonStyle.swift
    Modifiers/
      AuroraCard.swift
    Components/
      AuroraSheet.swift
    Extensions/
      Color+Hex.swift
  Tests/AuroraUITests/
```
The app imports `AuroraUI` and gets styles, modifiers, and tokens from one versioned package.

### Android/Material note
SwiftUI is iOS-only; the cross-platform build lives in the React Native doc. Where a concept has a Material equivalent (48dp touch floor, elevation instead of blur), that mapping is documented in [18 · React Native implementation](./18-react-native-implementation.md).

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Map fonts to system text styles (`Aurora.Font.body` → `.body`) | Don't hardcode `.system(size: 17)` — it opts the text out of Dynamic Type |
| Read `Aurora.Color.actionPrimaryBg` (semantic) | Don't inline `Color(hex: 0x7C6CFF)` or use `Aurora.Color.violet500` in a view |
| Apply `.preferredColorScheme(.dark)` once at the App root | Don't branch colors on `@Environment(\.colorScheme)` — Aurora is single-mode |
| Use `RoundedRectangle(cornerRadius:style:.continuous)` for the squircle | Don't use `.cornerRadius(14)` — it gives a plain circular corner, not the iOS shape |
| Give buttons `minHeight: 48` and a `.contentShape` for the hit area | Don't ship a 30pt icon `Button` — it fails the 44pt touch floor |
| Gate the 0.97 press scale on `accessibilityReduceMotion` | Don't animate scale unconditionally when Reduce Motion is on |
| Use `.ultraThinMaterial` for bars, with a solid fallback under Reduce Transparency | Don't leave a bare blur when the user turns on Reduce Transparency |
| Fire `.sensoryFeedback(.impact)` on primary tap, `.selection` on toggles | Don't fire a haptic on scroll, on every keystroke, or twice per action |
| Present sheets with `.presentationDetents([.medium, .large])` + grabber | Don't build a custom bottom sheet with a `ZStack` and a drag `GestureState` |
| Full-bleed the gradient with `.ignoresSafeArea()` behind content | Don't `.ignoresSafeArea()` the content layer — text slides under the Dynamic Island |
| Ship styles/modifiers/tokens as one versioned SPM package | Don't copy `AuroraTokens.swift` into each feature and drift the values |
| Add VoiceOver labels/traits to every control | Don't leave an icon-only button unlabeled for VoiceOver |

## Checklist
- [ ] `AuroraTokens.swift` is the only source of colors, fonts, spacing, radii.
- [ ] Views read semantic tokens, not primitives.
- [ ] `.preferredColorScheme(.dark)` applied at the App root; no `colorScheme` branching.
- [ ] Fonts use system text styles so Dynamic Type scales automatically.
- [ ] Continuous corners everywhere; no `.cornerRadius`.
- [ ] Every control clears the 44pt floor (extend with `.contentShape` + padding).
- [ ] Press scale and motion respect `accessibilityReduceMotion`.
- [ ] Materials fall back to solid surfaces under Reduce Transparency.
- [ ] Haptics fire once per action via `.sensoryFeedback` (or UIFeedbackGenerator on iOS 16).
- [ ] Sheets use `.presentationDetents` with a visible grabber.
- [ ] Deployment target is iOS 16+; styles/tokens shipped as an SPM package.

## Related
- [04 · Layout, spacing & safe areas](./04-layout-spacing-safe-areas.md)
- [17 · Design tokens](./17-design-tokens.md)
- [18 · React Native implementation](./18-react-native-implementation.md)
