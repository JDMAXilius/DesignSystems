# 21 · Content, voice & tone — Aurora Design System

> Aurora's words are as tactile as its surfaces: concise, human, and calm-confident, tuned for a thumb on a small screen.

## Principles

- **Concise and human.** Say the useful thing in the fewest plain words. Write like a calm, competent person, not a system log.
- **Calm-confident, never cute.** We reassure by being clear, not by joking. No "Oops", no exclamation-mark panic, no blame.
- **Front-load meaning.** The first two or three words carry the point, because on a 390pt-wide screen the rest may wrap or truncate.
- **Sentence case everywhere.** Titles, buttons, labels, menu items — all sentence case. Never Title Case, never ALL CAPS.
- **Actions are verbs.** A button says what tapping it does: "Save", "Add card", "Delete account".

## The system

### Capitalization & punctuation

- **Sentence case** for every string: capitalize the first word and proper nouns only.
- **No terminal period** on labels, buttons, titles, single-line empty-state headlines, or menu items.
- **Use a period** on full-sentence help text, multi-sentence body, and error descriptions.
- One space after punctuation. No exclamation marks in system copy (a single one is allowed in a genuine celebration moment, at most once per flow).

### Buttons & actions

- Format: **verb**, or **verb + noun** when the object isn't obvious: "Save", "Add card", "Turn on notifications".
- Match the button to the outcome: the confirm button in a delete dialog says "Delete account", not "OK" or "Confirm".
- Keep primary labels to 1–3 words so they fit at large Dynamic Type without truncating.

### Errors — the formula

**What happened + how to fix it.** No error codes as the whole message, no blame, no "Oops".

| Part | Rule | Example |
|---|---|---|
| What happened | Plain, specific, no jargon | "We couldn't save your changes." |
| How to fix | A concrete next step | "Check your connection and try again." |
| Tone | Calm, no blame, no code-only | Not "Error 500" and not "You entered it wrong" |

Full example: **"We couldn't save your changes. Check your connection and try again."** Attach a "Try again" button.

### Empty states

Three short parts: a plain headline (no period), one line of why-it's-empty or what-to-do, and one action.
Example — headline "No saved cards", body "Cards you save appear here.", button "Add card".

### Confirmations (especially destructive)

- Name the specific noun. "Delete this photo?" beats "Are you sure?".
- Body states the consequence: "This can't be undone."
- The confirm button repeats the verb + noun: "Delete photo". The cancel button says "Cancel".

### Numbers, dates & time

- Use **monospaced digits** (`monospacedDigit()` / SF Mono) for values that change in place — timers, counters, live balances — so the layout doesn't jitter.
- Format for the user's locale (currency, decimal separators, 12/24-hour).
- Use relative time for recency ("2 min ago", "Yesterday") and absolute for scheduled/precise moments ("9 Jul, 3:30 PM").
- Spell out small counts in prose where natural; use figures in dense UI ("3 items", "12:04").

### Notifications & permission prompts

- **Notifications:** front-load the who/what, keep it glanceable, no trailing period on a short line. "Maya sent you a message" beats "You have received a new message from Maya."
- **Permission prompts:** state the value before the OS dialog. "Turn on notifications to get replies the moment they arrive." Never imply the permission is required when it isn't.

### Use / avoid word list

| Use | Avoid |
|---|---|
| Save | Submit (unless it's a form submission) |
| Delete | Destroy, Nuke |
| Turn on / Turn off | Enable / Disable (fine in settings labels, softer in prose) |
| Try again | Retry now! |
| We couldn't… | Oops / Uh-oh / Something went wrong |
| Check your connection | Network error (code-only) |
| Add card | Add a new card here |
| Sign in | Login (as a verb) |

## Process

Voice & tone define no tokens. One relevant primitive supports changing-number layout:

| DTCG group | Swift | TS |
|---|---|---|
| `font.mono` | `Aurora.Font.mono` | `tokens.font.mono` |

Use it via the platform digit modifiers shown below.

## Usage

### SwiftUI — sentence-case action, monospaced changing number, error copy

```swift
// Verb-first primary action, sentence case, no period
Button("Add card") { addCard() }
    .buttonStyle(AuroraPrimaryButtonStyle())

// Live counter: monospaced digits so width doesn't jitter
Text(remaining, format: .number)
    .font(Aurora.Font.body)
    .monospacedDigit()

// Error: what happened + how to fix, calm, with a retry action
VStack(alignment: .leading, spacing: Aurora.Spacing.space2) {
    Text("We couldn't save your changes.")            // what happened (period: full sentence)
        .font(Aurora.Font.headline)
    Text("Check your connection and try again.")       // how to fix
        .font(Aurora.Font.subheadline)
        .foregroundStyle(Aurora.Color.textSecondary)
    Button("Try again") { save() }
}
```

### React Native — same strings, monospaced digits, destructive confirm

```tsx
import { Text, View } from 'react-native';
import { tokens } from '../tokens';

// Live counter with monospaced digits
<Text style={{ fontFamily: tokens.font.mono, fontVariant: ['tabular-nums'] }}>
  {remaining}
</Text>

// Destructive confirm: named noun + consequence + verb+noun button
const confirm = {
  title: 'Delete photo?',
  body: 'This can’t be undone.',
  confirmLabel: 'Delete photo',   // repeats the verb + noun
  cancelLabel: 'Cancel',
};

// Error block
<View>
  <Text style={{ fontSize: 17, fontWeight: '600', color: tokens.color.text.primary }}>
    We couldn't save your changes.
  </Text>
  <Text style={{ color: tokens.color.text.secondary }}>
    Check your connection and try again.
  </Text>
</View>
```

**iOS-first / Android note:** `.monospacedDigit()` maps to `fontVariant: ['tabular-nums']` on RN. iOS action sheets and alerts use the same sentence-case, verb+noun labels; on Android/Material the destructive action stays a text button with the same words. Localize all strings; never concatenate sentence fragments in code.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Label the action with a verb: "Add card". | Label it "Submit here" or "OK" when the outcome is adding a card. |
| Write errors as what happened + how to fix: "We couldn't save your changes. Check your connection and try again." | Show "Error 500" or "Oops, something went wrong." |
| Use sentence case for every title, label, and button. | Use Title Case ("Add Card") or ALL CAPS ("SAVE"). |
| Drop the period on buttons, labels, and short headlines. | Put a period on a button ("Save.") or a one-line title. |
| End full-sentence help and error bodies with a period. | Leave a multi-sentence explanation unpunctuated. |
| Name the noun in a destructive confirm: "Delete photo?". | Ask "Are you sure?" with an "OK" button. |
| Front-load the point: "Maya sent you a message". | Bury it: "You have received a new message from Maya." |
| Use monospaced digits for timers and live counts. | Let proportional digits shift the layout every tick. |
| Give an empty state a headline, one why line, and one action. | Show a blank screen or a lone sad-face illustration. |
| State the value before a permission prompt: "Turn on notifications to get replies right away." | Demand access with no reason, or imply it's required when it isn't. |
| Keep primary labels to 1–3 words so they survive large Dynamic Type. | Write "Tap here to add a new payment card now". |
| Blame the situation, never the user. | Write "You entered your password wrong again." |

## Checklist

- [ ] Every string is sentence case.
- [ ] Buttons are verbs or verb + noun and match the outcome.
- [ ] No periods on labels/buttons/short titles; periods on full-sentence body.
- [ ] Errors say what happened and how to fix it, with no code-only text or blame.
- [ ] Destructive confirmations name the noun and state the consequence.
- [ ] Empty states have a headline, one supporting line, and one action.
- [ ] Changing numbers use monospaced digits.
- [ ] Dates, times, and currency respect the user's locale.
- [ ] Permission prompts state the value before the OS dialog.
- [ ] Copy front-loads meaning and survives large Dynamic Type without truncation.

## Related

- [00 · Design principles](00-design-principles.md)
- [09 · Buttons & actions](09-buttons-actions.md)
- [20 · Accessibility](20-accessibility.md)
- [22 · Design process](22-design-process.md)
