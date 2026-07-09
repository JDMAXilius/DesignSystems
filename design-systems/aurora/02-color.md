# 02 · Color — Aurora Design System
> One fixed dark palette — ink surfaces lit by aurora accents — with every text pair verified against ink-950.

Aurora has a **single mode**. There is no light theme, no dark theme, no OS-following — one tuned "midnight" appearance. Every token below carries exactly one value. Because there is one mode, each contrast pair is verified once and trusted everywhere.

## Principles

**1. Single mode, always.** No light/dark pairs, no `$modes`, no dynamic color providers, no `useColorScheme()`. The app locks to this palette.

**2. Ink is the canvas; aurora is the light.** ~60% of a screen is ink surfaces, ~30% ink structure and text, ~10% aurora accent. Light is scarce — one primary accent moment per screen.

**3. Contrast is computed, not assumed.** A color being bright does not mean it passes AA. Teal-500 on ink-950 is a brilliant 11.5:1; tertiary ink-400 body text is only 4.1:1 and fails for normal text. Verify.

**4. Never color alone.** Status is always color + icon + label, so colorblind and grayscale users get the same message.

## The system

### Neutrals — "Ink" (cool graphite; 50 = lightest, 950 = darkest base)

| Token | Hex | Role hint |
|---|---|---|
| ink-50 | `#F4F6FB` | primary text |
| ink-100 | `#E4E8F2` | |
| ink-200 | `#C4CBDC` | |
| ink-300 | `#9AA3BF` | secondary text |
| ink-400 | `#6B7488` | tertiary/muted text, disabled |
| ink-500 | `#4A5266` | strong border |
| ink-600 | `#333B4D` | default border |
| ink-700 | `#232A3A` | hairline border |
| ink-800 | `#171D2B` | raised surface |
| ink-900 | `#10151F` | surface / card |
| ink-950 | `#0A0E17` | app background |

### Aurora Violet — primary brand / action

| Token | Hex | |
|---|---|---|
| violet-300 | `#B3A9FF` | |
| violet-400 | `#9788FF` | ghost/tertiary text |
| violet-500 | `#7C6CFF` | primary action bg / primary tint |
| violet-600 | `#6551F0` | pressed |
| violet-700 | `#5341D6` | |

### Aurora Teal — secondary accent / highlights

| Token | Hex | |
|---|---|---|
| teal-300 | `#7BF3DC` | |
| teal-400 | `#4CEBCB` | |
| teal-500 | `#2FE0C0` | secondary accent, links, active states |
| teal-600 | `#1FC7A8` | pressed |

### Aurora Pink — tertiary accent (sparingly; gradients, highlights)

| Token | Hex |
|---|---|
| pink-400 | `#FF8AC4` |
| pink-500 | `#FF6FB5` |

### Status

| Role | Solid | Text-on-dark | Tint bg (over surface) | Border |
|---|---|---|---|---|
| Success | `#34D399` | `#6EE7B7` | `rgba(52,211,153,0.14)` | `rgba(52,211,153,0.30)` |
| Warning | `#FBBF24` | `#FCD34D` | `rgba(251,191,36,0.14)` | `rgba(251,191,36,0.30)` |
| Danger | `#F4544E` | `#FF8A85` | `rgba(244,84,78,0.14)` | `rgba(244,84,78,0.30)` |
| Info | `#4CEBCB` | `#7BF3DC` | `rgba(76,235,203,0.14)` | `rgba(76,235,203,0.30)` |

### Signature Aurora gradient — max 1 per screen

`linear 135°: #2FE0C0 0% → #7C6CFF 55% → #FF6FB5 100%` (teal → violet → pink). Reserved for hero moments, the primary CTA glow, and the splash. Never as a text fill for body copy, never twice on one screen.

### Semantic roles (the values components actually consume)

| Role | Value |
|---|---|
| bg-app | ink-950 `#0A0E17` |
| bg-surface | ink-900 `#10151F` |
| bg-surface-raised | ink-800 `#171D2B` |
| bg-surface-sunken | `#070A11` |
| bg-overlay-scrim | `rgba(5,8,14,0.6)` |
| text-primary | ink-50 `#F4F6FB` |
| text-secondary | ink-300 `#9AA3BF` |
| text-tertiary | ink-400 `#6B7488` |
| text-on-accent | `#0A0E17` on teal · `#FFFFFF` on violet |
| text-link | teal-500 `#2FE0C0` |
| border-hairline | ink-700 `#232A3A` |
| border-default | ink-600 `#333B4D` |
| border-strong | ink-500 `#4A5266` |
| action-primary | bg violet-500 · pressed violet-600 · text `#FFFFFF` · disabled bg ink-800 + text ink-500 |
| action-secondary | bg transparent · border ink-600 · text ink-50 · pressed `rgba(255,255,255,0.06)` |
| action-tertiary (ghost) | text violet-400 · pressed `rgba(124,108,255,0.12)` |
| action-destructive | bg danger `#F4544E` · pressed `#D8433D` · text `#FFFFFF` |
| focus-ring | teal-500 `#2FE0C0` at 2pt |

### Contrast pairing table (computed against ink-950 `#0A0E17`)

WCAG 2.2 AA: normal text ≥4.5:1, large/bold text (≥18pt or ≥14pt bold) ≥3:1, UI/icons ≥3:1.

| Foreground | On | Ratio | Verdict |
|---|---|---|---|
| ink-50 text-primary | ink-950 | ~17.9:1 | Passes all — primary body |
| ink-300 text-secondary | ink-950 | ~7.7:1 | Passes normal text |
| ink-400 text-tertiary | ink-950 | ~4.1:1 | **Large/metadata only** — fails normal body (below 4.5) |
| violet-500 as text | ink-950 | ~5.0:1 | Passes normal text |
| teal-500 as link | ink-950 | ~11.5:1 | Passes all — the link color |
| `#FFFFFF` label | violet-500 | ~3.9:1 | Large/bold button labels only (≥17pt semibold) — normal-size fails |
| `#FFFFFF` label | violet-600 (pressed) | ~5.3:1 | Passes normal text — contrast improves on press |
| `#0A0E17` label | teal-500 | ~11.5:1 | Passes all — dark text on teal |

Honest takeaways: use **dark text on teal** and **white on violet only at button size** (17pt semibold clears the large/bold 3:1 bar; the pressed violet-600 pushes it to ~5.3:1). Never set body copy in tertiary ink-400 — reserve it for timestamps and metadata where large/bold rules apply or contrast isn't load-bearing.

### 60-30-10

~60% ink surfaces · ~30% ink structure and text · ~10% aurora accent, with a single primary accent moment (one CTA, one active tab, or one gradient hero) per screen.

## Tokens

Single mode — one `$value` per token, no `$modes`. Primitive → semantic; components consume only semantic.

```jsonc
// DTCG (json/tokens.json) — excerpt
{
  "color": {
    "violet": { "500": { "$value": "#7C6CFF", "$type": "color" } },
    "ink":    { "950": { "$value": "#0A0E17", "$type": "color" } },
    "bg":     { "app": { "$value": "{color.ink.950}", "$type": "color" } },
    "action": { "primary": { "bg": { "$value": "{color.violet.500}", "$type": "color" },
                             "bg-pressed": { "$value": "{color.violet.600}", "$type": "color" } } },
    "text":   { "primary": { "$value": "{color.ink.50}", "$type": "color" },
                "link":    { "$value": "{color.teal.500}", "$type": "color" } }
  }
}
```

| DTCG | Swift | TS |
|---|---|---|
| `color.bg.app` | `Aurora.Color.bgApp` | `tokens.color.bg.app` |
| `color.bg.surface` | `Aurora.Color.bgSurface` | `tokens.color.bg.surface` |
| `color.text.primary` | `Aurora.Color.textPrimary` | `tokens.color.text.primary` |
| `color.text.link` | `Aurora.Color.textLink` | `tokens.color.text.link` |
| `color.action.primary.bg` | `Aurora.Color.actionPrimaryBg` | `tokens.color.action.primary.bg` |
| `color.action.primary.bg-pressed` | `Aurora.Color.actionPrimaryBgPressed` | `tokens.color.action.primary.bgPressed` |
| `color.violet.500` | `Aurora.Color.violet500` | `tokens.color.violet[500]` |
| `color.teal.500` | `Aurora.Color.teal500` | `tokens.color.teal[500]` |

## Usage

Fixed values only — no dynamic providers, no `useColorScheme()`.

```swift
import SwiftUI

struct PrimaryCTA: View {
    @State private var pressed = false
    var body: some View {
        Text("Add card")                                   // 17pt semibold clears the large/bold bar
            .font(.headline)
            .foregroundStyle(Color.white)                  // text-on-accent on violet
            .frame(maxWidth: .infinity, minHeight: 48)     // ≥48pt comfortable primary
            .background(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .fill(pressed ? Aurora.Color.actionPrimaryBgPressed  // violet-600
                                  : Aurora.Color.actionPrimaryBg)        // violet-500
            )
            // fixed Color values — never Color(UIColor { trait in ... })
    }
}
```

```tsx
import { Pressable, Text } from 'react-native';
import { tokens } from './tokens';

export function PrimaryCTA({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 48,
        borderRadius: 14,                                  // circular in RN — acceptable
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pressed
          ? tokens.color.action.primary.bgPressed          // violet-600
          : tokens.color.action.primary.bg,                // violet-500
      })}>
      {/* white on violet at button size; fixed color, no theme branching */}
      <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 17 }}>Add card</Text>
    </Pressable>
  );
}
```

Appearance is locked: SwiftUI pins `.preferredColorScheme(.dark)` at the root and uses fixed `Color`s; RN sets `UIUserInterfaceStyle=Dark` in `Info.plist` and never calls `useColorScheme()`.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use ink-950 as bg-app and layer ink-900/800 for surfaces | Don't invent an off-spec gray — every neutral comes from the ink ramp |
| Set body text in ink-50; secondary in ink-300 (7.7:1) | Don't set body copy in tertiary ink-400 — it's only 4.1:1 and fails normal text |
| Use dark text `#0A0E17` on teal fills | Don't put white text on teal-500 — dark text is the verified pairing |
| Put white labels on violet only at 17pt semibold+ | Don't set 13pt white caption on violet-500 — 3.9:1 fails at that size |
| Use teal-500 for links and active states | Don't use violet for links — teal is the link/active color |
| Keep the signature gradient to one hero per screen | Don't fill body text or multiple surfaces with the gradient |
| Pair every status color with an icon and label | Don't show a red border alone to mean error |
| Consume semantic tokens (`action.primary.bg`) in components | Don't hardcode `#7C6CFF` in a view |
| Reserve pink as a tertiary accent, mostly inside the gradient | Don't make pink a primary action or a large solid fill |
| Lock the palette — one fixed dark mode | Don't add a light variant or read the OS color scheme |

## Checklist

- [ ] Are all colors sourced from the ink/violet/teal/pink/status ramps — no off-spec hex?
- [ ] Is body text ink-50 or ink-300, with ink-400 reserved for metadata/large only?
- [ ] Is text-on-accent dark on teal and white-at-button-size on violet?
- [ ] Does the screen have exactly one accent moment (60-30-10, one gradient max)?
- [ ] Is every status color paired with an icon and label?
- [ ] Do components consume semantic tokens, not raw hex?
- [ ] Is the app locked to the fixed dark palette (no `useColorScheme`, no dynamic `Color`)?
- [ ] Were all text/accent pairs verified against ink-950?

## Related

- [00-design-principles.md](00-design-principles.md) — luminous + tactile, accessible by default
- [01-platforms-conventions.md](01-platforms-conventions.md) — the fixed dark appearance across platforms
- [03-typography.md](03-typography.md) — the type that these colors render
