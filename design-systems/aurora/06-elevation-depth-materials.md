# 06 · Elevation, depth & materials — Aurora Design System
> How Aurora builds depth on a dark canvas — lighter surfaces, subtle shadows, one signature aurora glow, and iOS blur materials.

## Principles
- **Depth = light, not just shadow.** On a dark canvas, a raised surface is *lighter* ink first; the shadow only deepens it.
- **One glow per screen.** The aurora glow is a signature moment reserved for a single element — the primary CTA or active FAB. More than one and it stops feeling special.
- **Blur is the iOS chrome.** Nav bars, tab bars, and sheets float over content with a blur material — very iOS, very premium.
- **Layer with intent.** A fixed z-index order keeps overlays, sheets, and toasts stacked predictably.
- **Transparency is optional.** When Reduce Transparency is on, blur becomes a solid ink surface — depth must survive without the blur.

## The system

### Elevation levels (on dark)
Depth recipe = lighter surface + subtle shadow (+ optional aurora glow / blur material).
| Level | Use | Recipe |
|---|---|---|
| level-0 | flush content | none |
| level-1 | resting card | surface ink-900 + shadow `0 2 8 rgba(0,0,0,0.35)` |
| level-2 | raised / pressed-up | surface ink-800 + shadow `0 4 16 rgba(0,0,0,0.40)` |
| level-3 | popover / dropdown | surface ink-800 + shadow `0 8 24 rgba(0,0,0,0.45)` |
| level-4 | sheet / modal | surface ink-800 + blur material behind + shadow `0 12 32 rgba(0,0,0,0.50)` |
| level-5 | toast (top layer) | surface ink-800 + shadow `0 16 40 rgba(0,0,0,0.55)` |

Surfaces: `bg-surface` ink-900 (#10151F), `bg-surface-raised` ink-800 (#171D2B), app `bg-app` ink-950 (#0A0E17).

### Signature aurora glow
- The primary CTA or active FAB gets a colored soft shadow: `0 8 24 rgba(124,108,255,0.35)` (violet-500 at 35%).
- **One glowing element per screen** — it's the accent moment in the 60-30-10 balance.

### Blur materials
- SwiftUI: `.ultraThinMaterial` (most translucent) · `.thinMaterial` · `.regularMaterial` · `.thickMaterial`. Use for nav bars, tab bars, sheets, and overlays over scrolling content.
- RN: `expo-blur` `BlurView` with `tint="dark"` (or `@react-native-community/blur`).
- Use blur for **chrome over scrolling content** (nav bar, tab bar) so content shows through — this is the iOS signature.

### Reduce Transparency fallback
When `Reduce Transparency` is enabled, **swap blur for a solid `ink-800` (#171D2B)** surface plus its shadow. Never leave chrome fully transparent.

### z-index / layering
content 0 · sticky header 10 · nav/tab bar 20 · dropdown/popover 30 · scrim 40 · sheet/modal 50 · alert 60 · toast 70.

### Android/Material note
Material expresses depth with an **elevation ramp** (dp) that both casts a shadow and lightens the surface with a translucent white overlay. Map Aurora levels to Material dp: level-1 → 2dp, level-2 → 4dp, level-3 → 8dp, level-4 → 12dp, level-5 → 16dp. Android has no system blur material — use a solid `ink-800` bar (same as the Reduce Transparency fallback).

## Tokens
DTCG groups `elevation` (shadow recipes) and `color.bg` (surfaces).

```json
{ "elevation": {
  "1": { "$value": { "x": 0, "y": 2, "blur": 8,  "spread": 0, "color": "rgba(0,0,0,0.35)" }, "$type": "shadow" },
  "2": { "$value": { "x": 0, "y": 4, "blur": 16, "spread": 0, "color": "rgba(0,0,0,0.40)" }, "$type": "shadow" }
},
  "effect": { "glow": {
  "primary": { "$value": { "x": 0, "y": 8, "blur": 24, "spread": 0, "color": "rgba(124,108,255,0.35)" }, "$type": "shadow" }
}}}
```
| DTCG | Swift | TypeScript |
|---|---|---|
| `elevation.1` | `Aurora.Elevation.level1` | `tokens.elevation.level1` |
| `elevation.4` | `Aurora.Elevation.level4` | `tokens.elevation.level4` |
| `effect.glow.primary` | `Aurora.Effect.glowPrimary` | `tokens.effect.glow.primary` |
| `color.bg.surface` | `Aurora.Color.bgSurface` | `tokens.color.bg.surface` (ink-900) |
| `color.bg.surface-raised` | `Aurora.Color.bgSurfaceRaised` | `tokens.color.bg.surfaceRaised` (ink-800) |

## Usage
A resting card (level-1) with the aurora glow on its primary button, and a blurred tab bar.

```swift
// Level-1 card with a glowing primary CTA.
VStack(alignment: .leading, spacing: Aurora.Spacing.md) {
    Text("Aurora Pass").font(Aurora.Font.title3).foregroundStyle(Aurora.Color.textPrimary)
    Button("Upgrade") { }
        .buttonStyle(.plain)
        .padding(.vertical, 14).frame(maxWidth: .infinity)
        .background(Aurora.Color.violet500, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
        .foregroundStyle(.white)
        .shadow(color: Aurora.Color.violet500.opacity(0.35), radius: 12, x: 0, y: 8) // aurora glow — once per screen
}
.padding(Aurora.Spacing.md)
.background(Aurora.Color.bgSurface, in: RoundedRectangle(cornerRadius: 20, style: .continuous)) // ink-900
.shadow(color: .black.opacity(0.35), radius: 4, x: 0, y: 2) // level-1

// Blurred tab bar chrome over scrolling content.
HStack { /* tab items */ }
    .frame(height: 49).padding(.horizontal, Aurora.Spacing.md)
    .background(.ultraThinMaterial) // Reduce Transparency → system falls back automatically
    .overlay(Divider().opacity(0.4), alignment: .top)
```

```tsx
import { View, Text, Pressable, AccessibilityInfo } from 'react-native';
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import { tokens } from '../tokens';

// Level-1 card with a glowing primary CTA (iOS shadow shown).
function PassCard() {
  return (
    <View style={{
      padding: tokens.space.md, borderRadius: 20, backgroundColor: tokens.color.bg.surface, // ink-900
      shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, // level-1
    }}>
      <Text style={{ color: tokens.color.text.primary, fontSize: 20, fontWeight: '700' }}>Aurora Pass</Text>
      <Pressable style={{
        marginTop: tokens.space.md, paddingVertical: 14, borderRadius: 14, alignItems: 'center',
        backgroundColor: tokens.color.violet[500],
        shadowColor: tokens.color.violet[500], shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 8 }, // aurora glow
      }}>
        <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Upgrade</Text>
      </Pressable>
    </View>
  );
}

// Blurred tab bar with Reduce Transparency fallback to solid ink-800.
function TabBar({ children }) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => { AccessibilityInfo.isReduceTransparencyEnabled?.().then(setReduce); }, []);
  const Chrome = reduce ? View : BlurView;
  return (
    <Chrome
      tint="dark" intensity={40}
      style={{ height: 49, flexDirection: 'row', paddingHorizontal: tokens.space.md,
               backgroundColor: reduce ? tokens.color.bg.surfaceRaised : 'transparent' }}> {/* ink-800 fallback */}
      {children}
    </Chrome>
  );
}
```

## ✅ Do / ❌ Don't
| ✅ Do | ❌ Don't |
|---|---|
| Raise a surface with lighter ink first (ink-900 → ink-800), then add shadow | Don't rely on a heavier black shadow alone on a dark canvas |
| Reserve the aurora glow for one element per screen | Don't glow three buttons — the accent moment loses meaning |
| Use `rgba(124,108,255,0.35)` for the glow (violet-500) | Don't tint the glow teal or pink to "mix it up" |
| Blur nav/tab bars over scrolling content with `.ultraThinMaterial` | Don't use an opaque bar that hides the content scrolling beneath |
| Swap blur for solid ink-800 when Reduce Transparency is on | Don't ship a see-through bar that becomes unreadable with the setting on |
| Follow the level→recipe table exactly (offset, blur, opacity) | Don't invent a `0 20 60` mega-shadow for a resting card |
| Stack overlays by the z-index order (sheet 50 < alert 60 < toast 70) | Don't let a toast render behind a sheet |
| Map levels to Material dp on Android (level-2 → 4dp) | Don't ship iOS shadow values verbatim to Android and skip elevation |
| Use continuous corners on elevated surfaces | Don't mix a sharp-corner shadow card into a squircle layout |
| Keep sheet chrome at level-4 with blur behind | Don't drop a modal onto the canvas with no shadow or material |

## Checklist
- [ ] Each surface uses the correct level recipe (surface color + shadow).
- [ ] Raised surfaces step up in ink lightness, not just shadow.
- [ ] At most one aurora glow per screen, on the primary CTA/FAB.
- [ ] Glow uses `rgba(124,108,255,0.35)` at `0 8 24`.
- [ ] Nav/tab bars and sheets use a blur material over content.
- [ ] Reduce Transparency swaps blur for solid ink-800.
- [ ] Overlays follow the z-index order.
- [ ] Android maps levels to the Material dp ramp and uses solid chrome.

## Related
- [04 · Layout, spacing & safe areas](./04-layout-spacing-safe-areas.md)
- [05 · Iconography & SF Symbols](./05-iconography-sf-symbols.md)
- [07 · Motion & haptics](./07-motion-haptics.md)
- [08 · Touch, gestures & targets](./08-touch-gestures-targets.md)
