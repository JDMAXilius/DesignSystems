# 10 · Forms & inputs — Aurora Design System

> Inputs are calm, legible, and iOS-native: labels above fields, teal focus rings, haptic-backed controls, and errors that tell you how to fix them.

## Principles

- **Label above, always.** Every field has a visible label above it. Placeholder text is a hint, never the label — it disappears the moment the user types.
- **Comfortable targets.** Fields and native controls clear the 44pt touch floor; adjacent controls keep ≥ 8pt apart.
- **Native controls feel native.** Toggle, Stepper, Slider, Segmented, Picker, and Date picker use the platform control with Aurora tints and selection haptics — don't reinvent them.
- **Validate kindly.** Validate on blur, then re-validate live once a field is in error. Errors say what happened and how to fix it, paired with color + icon + text.
- **Right keyboard, right return key.** Match `keyboardType` and the return key to the field's job (email, number, done, next).

## The system

### Text field anatomy

| Property | Value / token |
|---|---|
| Min height | 44pt (48pt comfortable) |
| Corner radius | radius-md `14` |
| Fill | ink-800 `#171D2B` |
| Border (rest) | ink-700 `#232A3A` 1pt |
| Border (focus) | teal-500 `#2FE0C0` 2pt ring |
| Border (error) | danger `#F4544E` 2pt + icon + message |
| Text | text-primary ink-50 `#F4F6FB` |
| Placeholder | text-tertiary ink-400 `#6B7488` |
| Label (above) | subheadline 15, text-secondary ink-300 `#9AA3BF` |
| H-padding | space-4 `16` |
| Gap between fields | space-4 `16` |

Variants: single-line text, **secure/password** (masked with a reveal toggle), **text area** (multi-line, min 3 lines, grows with content).

### Native iOS controls

| Control | Tint / spec | Haptic |
|---|---|---|
| Toggle / Switch | on-tint violet-500 `#7C6CFF`; 44pt row | `selection` on change |
| Stepper | ink-800 track, violet-500 glyphs; ± each 44pt | `selection` per step |
| Slider | track ink-700, filled teal-500, thumb white | none while dragging; `selection` at detents |
| Segmented control | selected violet-500, unselected ink-300 | `selection` on change |
| Picker / wheel & menu | menu for ≤ 5 options, wheel for long lists | `selection` on change |
| Date picker | compact/graphical, violet-500 accent | `selection` on change |

Do not fire haptics on every keystroke, and never more than once per change.

### Validation & errors

- **Timing:** validate on blur. Once a field shows an error, re-validate on every change so it clears as soon as it's valid.
- **Presentation:** danger `#F4544E` 2pt border + a `exclamationmark.circle` icon + a message below in danger text `#FF8A85` (footnote 13). Never color-only.
- **Haptic:** `notification error` on a failed submit; `notification success` on a successful submit.
- **Copy:** "Enter a valid email like name@domain.com" — what + how to fix, sentence case, no error codes.

### Keyboard types & return key

| Field | keyboardType | Return key |
|---|---|---|
| Email | `emailAddress` | next / done |
| Number / amount | `numberPad` / `decimalPad` | done |
| Phone | `phonePad` | done |
| URL | `URL` | go |
| Search | `default` | search |
| Multi-field form | `default` | next → done on last |

## Tokens

| DTCG group | Swift | TS |
|---|---|---|
| `color.bg.surface.raised` | `Aurora.Color.bgSurfaceRaised` | `tokens.color.bg.surfaceRaised` |
| `color.border.hairline` | `Aurora.Color.borderHairline` | `tokens.color.border.hairline` |
| `color.focus.ring` | `Aurora.Color.focusRing` | `tokens.color.focus.ring` |
| `color.status.danger.solid` | `Aurora.Color.statusDangerSolid` | `tokens.color.status.danger.solid` |
| `color.action.primary.bg` | `Aurora.Color.actionPrimaryBg` | `tokens.color.action.primary.bg` |
| `color.text.tertiary` | `Aurora.Color.textTertiary` | `tokens.color.text.tertiary` |
| `radius.md` | `Aurora.Radius.md` | `tokens.radius.md` |
| `space.4` | `Aurora.Spacing.space4` | `tokens.space[4]` |

## Usage

### SwiftUI — labeled text field, focus ring, and native controls

```swift
struct EmailField: View {
    @Binding var email: String
    @FocusState private var focused: Bool
    var error: String?

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Email")                                  // label ABOVE, never placeholder-as-label
                .font(Aurora.Font.subheadline)
                .foregroundStyle(Aurora.Color.textSecondary)

            TextField("name@domain.com", text: $email)     // placeholder is a hint only
                .keyboardType(.emailAddress)
                .textContentType(.emailAddress)
                .submitLabel(.next)
                .focused($focused)
                .frame(minHeight: 48)
                .padding(.horizontal, Aurora.Spacing.space4)
                .background(RoundedRectangle(cornerRadius: Aurora.Radius.md, style: .continuous)
                    .fill(Aurora.Color.bgSurfaceRaised))
                .overlay(RoundedRectangle(cornerRadius: Aurora.Radius.md, style: .continuous)
                    .stroke(error != nil ? Aurora.Color.statusDangerSolid
                            : (focused ? Aurora.Color.focusRing : Aurora.Color.borderHairline),
                            lineWidth: (focused || error != nil) ? 2 : 1))

            if let error {                                 // color + icon + message
                Label(error, systemImage: "exclamationmark.circle")
                    .font(Aurora.Font.footnote)
                    .foregroundStyle(Aurora.Color.statusDangerText)
            }
        }
    }
}

// Native controls — Aurora tints + selection haptic
Toggle("Enable Face ID", isOn: $faceID)
    .tint(Aurora.Color.actionPrimaryBg)                    // violet-500 on-tint
    .onChange(of: faceID) { _, _ in UISelectionFeedbackGenerator().selectionChanged() }

Picker("Plan", selection: $plan) {
    ForEach(plans, id: \.self) { Text($0) }
}
.pickerStyle(.menu)                                        // menu for ≤ 5 options
.tint(Aurora.Color.actionPrimaryBg)
```

### React Native — TextInput, Switch, and segmented control

```tsx
import { View, Text, TextInput, Switch } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { tokens } from '../tokens';

export function EmailField({ value, onChange, error }: Props) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? tokens.color.status.danger.solid
    : focused ? tokens.color.focus.ring : tokens.color.border.hairline;

  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontSize: 15, color: tokens.color.text.secondary }}>Email</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="name@domain.com"                         // hint only, not the label
        placeholderTextColor={tokens.color.text.tertiary}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        accessibilityLabel="Email"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}                      // validate on blur
        style={{
          minHeight: 48, paddingHorizontal: tokens.space[4],
          borderRadius: tokens.radius.md, backgroundColor: tokens.color.bg.surfaceRaised,
          color: tokens.color.text.primary,
          borderWidth: focused || error ? 2 : 1, borderColor,
        }}
      />
      {error ? <Text style={{ fontSize: 13, color: tokens.color.status.danger.text }}>⚠ {error}</Text> : null}

      <Switch
        onValueChange={(v) => { Haptics.selectionAsync(); setFaceID(v); }}
        trackColor={{ true: tokens.color.action.primary.bg }}  // violet-500 on-tint
      />
      <SegmentedControl
        values={['Monthly', 'Yearly']}
        selectedIndex={idx}
        onChange={(e) => { Haptics.selectionAsync(); setIdx(e.nativeEvent.selectedSegmentIndex); }}
        tintColor={tokens.color.action.primary.bg}
      />
    </View>
  );
}
```

**iOS-first / Android note:** on iOS use the system Switch, wheel Picker, and `@react-native-segmented-control`. On Android/Material, Switch renders as a Material switch, the segmented control maps to a tab/chip row, `selectionAsync` degrades to a light vibration or no-op, and date/pickers use the Material dialog — keep violet-500 as the accent.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Put a visible label above every field. | Use the placeholder as the label so it vanishes on typing. |
| Show a 2pt teal-500 ring on focus. | Leave focus invisible so users lose their place. |
| Validate on blur, then live-clear once in error. | Validate on every keystroke from the first character. |
| Pair error color with an icon and a fix-it message. | Signal an error with a red border and nothing else. |
| Set `keyboardType` to email/number/phone to match the field. | Show the full alphabetic keyboard for an amount field. |
| Use the native Switch with a violet-500 on-tint. | Build a custom toggle that ignores platform behavior. |
| Fire one `selection` haptic when a toggle/segment changes. | Fire a haptic on every keystroke or twice per change. |
| Keep fields ≥ 44pt tall and 16pt apart. | Cram 32pt fields together so taps hit the wrong one. |
| Write "Enter a valid email like name@domain.com". | Show "Error 422" or "Invalid input". |
| Give secure fields a reveal toggle with its own 44pt target. | Mask a password with no way to reveal it. |
| Let a text area grow with content from a 3-line minimum. | Trap multi-line text in a fixed single-line field. |
| Fire `notification success`/`error` on submit result. | Stay silent after a failed submit. |

## Checklist

- [ ] Every field has a visible label above it; placeholders are hints only.
- [ ] Fields are ≥ 44pt tall, radius-md, ink-800 fill, ink-700 border.
- [ ] Focus shows a 2pt teal-500 ring.
- [ ] Validation runs on blur and re-validates live once in error.
- [ ] Errors use danger border + icon + fix-it message (not color alone).
- [ ] `keyboardType` and return key match each field.
- [ ] Native controls use violet-500 tint and fire `selection` on change.
- [ ] No haptics on keystrokes; at most one per change.
- [ ] Secure fields offer a reveal toggle.
- [ ] VoiceOver labels set; Dynamic Type reflows without clipping.

## Related

- [01 · Color](01-color.md)
- [09 · Buttons & actions](09-buttons-actions.md)
- [11 · Navigation](11-navigation.md)
- [13 · Feedback](13-feedback.md)
- [15 · Accessibility](15-accessibility.md)
- [17 · Content, voice & tone](17-content-voice-tone.md)
