# 17 · Content, voice, and tone — Maxilius Design System

> Words follow the same temperature theory as color: calm, cool prose builds the framework, and warm urgency is spent only where it must demand attention. (This entire chapter is defined by docs, not yet in code.)

## Principles

1. **Clear beats clever.** Say the thing. Active voice, sentences ≤ 20 words, one idea per sentence.
2. **Confident, not bossy.** State what happens and what to do next. No hedging ("maybe try…"), no exclamation marks in UI chrome.
3. **Technical but human.** Written for developer-designers: precise terms (`token`, `variant`, `prop`) are fine; jargon-as-decoration is not.
4. **Cool words, warm moments.** Routine copy stays neutral and quiet. Urgency (warnings, destructive confirmations) is rare and explicit — exactly one warm message per view, like the one-warm-CTA rule.
5. **Never blame the user.** Errors describe what happened and how to fix it, not what the user did wrong.

## The system

### Voice

Maxilius sounds like a senior engineer doing a calm code review: direct, specific, helpful, occasionally dry — never chirpy, never scolding.

### Sentence case everywhere

Buttons, titles, labels, menu items, tabs, empty states: sentence case. Never Title Case, never ALL CAPS — the single exception is tiny eyebrow labels set at `letter-spacing` caps (0.08em).

### Buttons: verb + noun

| Context | Write | Not |
|---|---|---|
| Save action | Save changes | OK / Submit |
| Creation | Create project | New |
| Destructive | Delete workspace | Yes |
| Cancel | Cancel | Never mind |
| Confirmation pair | Delete 3 files / Keep files | OK / Cancel |

One-word buttons are allowed only when the noun is unambiguous from the immediate context (Cancel, Close, Retry).

### Error formula: what happened + how to fix it

`<What happened>. <How to fix it>.` — specific noun, concrete next step, no codes without translation, no blame.

| Situation | Write | Not |
|---|---|---|
| Invalid email | Enter a valid email address, like name@example.com. | Invalid input! |
| Network failure | Couldn't save your changes — the connection dropped. Retry, or copy your text before leaving. | Error 500 |
| Missing field | Project name is required. Add a name to continue. | You forgot the name |
| Permission | You don't have access to this token set. Ask an editor to share it. | Access denied |

### Empty states

Three parts, in order: what this space is, why it's empty, one action to fill it. Keep it under 25 words plus one button.

> **No tokens yet**
> Tokens you publish from `@maxilius/tokens` appear here.
> [Create token]

### Confirmation copy: explicit nouns

Confirmations repeat the exact object and consequence. Never "Are you sure?" alone.

> **Delete "checkout-flow"?**
> This removes the project and its 42 tokens for everyone. This can't be undone.
> [Delete project] [Cancel]

### Formatting rules

| Element | Rule | Example |
|---|---|---|
| Dates | Mon D, YYYY in prose; YYYY-MM-DD in tables/data | Jul 9, 2026 · 2026-07-09 |
| Times | 24-hour with timezone when it matters | 14:30 UTC |
| Numbers | Digits for 10+; thousands separators; right-align numeric table columns (`numeric` prop) | 1,204 builds |
| Units | Space between value and unit, except % and px | 4 px grid → write 4px; 16 GB; 75% |
| Code | Anything typed or literal — names, paths, values — in JetBrains Mono via `<code>` | `--mx-radius-md`, `npm run build` |
| Truncation | Ellipsis character (…), never three periods | checkout-fl… |
| Ranges | En dash, no spaces | 45–75ch |

### Capitalization and punctuation

- Sentence case for all UI text; product name "Maxilius" is always capitalized.
- No terminal period on labels, buttons, titles, or single-fragment helper text; full sentences (errors, descriptions, toasts) get periods.
- Oxford comma. No exclamation marks except (rarely) success moments users worked for.
- Contractions welcome: "can't", "don't", "you'll".

### Tone by context

| Context | Temperature | Tone | Example |
|---|---|---|---|
| Docs, tooltips, helper text | Cool | Neutral, instructive | Tokens rebuild on every publish. |
| Success toast | Cool, brief warmth allowed | Affirming, short | Changes saved. |
| Info/feedback banner | Cool | Factual | Dark mode uses the same token paths. |
| Warning | Warm | Direct, consequence first | Rotating this key breaks 3 active integrations. |
| Destructive confirmation | Warmest | Explicit nouns, no softening | This deletes "checkout-flow" and its 42 tokens. This can't be undone. |
| Errors | Warm, never hot | Calm, solution-oriented | Couldn't reach the build server. Retry in a few seconds. |
| Empty states | Cool | Encouraging, one action | No components yet. Create one to get started. |

### Use / avoid word list

| Use | Avoid | Why |
|---|---|---|
| Save, Delete, Create, Remove | Submit, OK, Kill, Nuke | Verb+noun clarity; no violence metaphors |
| Choose / Select | Pick | Precision |
| Can't | Unable to, Failure to | Human, direct |
| Need / Required | Mandatory, Must be provided | Softer, still firm |
| Sign in / Sign out | Login (as a verb), Log off | "Log in" is the verb form if you need it; "login" is only a noun |
| It didn't work because… | Oops! Something went wrong | Specific beats cute |
| Deprecated (with a date) | Legacy, Old | Actionable |
| Simply — never use it | Simply, Just, Easy, Obviously | If it were simple, they wouldn't be reading |
| Allow / Let | Enable (for people) | "Enable" is for features, not humans |
| Warning: this deletes… | Are you sure? | Explicit consequence beats vague doubt |

## Tokens

Content has no color of its own — it borrows the system's type and feedback tokens:

```css
:root {
  --mx-font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --mx-font-family-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --mx-font-letter-spacing-caps: 0.08em;  /* eyebrow labels — the only ALL-CAPS allowed */
  --mx-text-secondary: #475569;           /* helper text */
  --mx-text-danger: #DC2626;              /* error messages (light) */
  --mx-text-warning: #D97706;             /* warning text — pair with icon */
}
```

## Usage

Field with helper and error copy:

```html
<label for="name" class="mx-label">Project name <span aria-hidden="true">*</span></label>
<input id="name" class="mx-input" aria-invalid="true" aria-describedby="name-error" />
<p id="name-error" class="mx-field-error">
  Project name is required. Add a name to continue.
</p>
```

Destructive confirmation dialog copy:

```html
<h2>Delete "checkout-flow"?</h2>
<p>This removes the project and its 42 tokens for everyone. This can't be undone.</p>
<button class="mx-btn mx-btn--danger">Delete project</button>
<button class="mx-btn mx-btn--neutral">Cancel</button>
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Write buttons as verb + noun: "Save changes", "Create token" | Don't label buttons "OK", "Yes", or "Submit" |
| Use sentence case everywhere: "Export design tokens" | Don't Title Case ("Export Design Tokens") or SHOUT outside eyebrow labels |
| Write errors as what happened + fix: "Couldn't save — connection dropped. Retry." | Don't ship "Error 500" or "Oops! Something went wrong" |
| Name the object in confirmations: "Delete 'checkout-flow' and its 42 tokens?" | Don't ask a bare "Are you sure?" |
| Set literal values in JetBrains Mono: use `--mx-radius-md` in a `<code>` tag | Don't leave token names in body Inter where they blur into prose |
| Keep one warm message per view — a single warning owns the moment | Don't stack a red banner, an amber badge, and a warning toast on one screen |
| Write dates as Jul 9, 2026 in prose and 2026-07-09 in tables | Don't mix 09/07/26 formats that read differently across locales |
| Use contractions: "Can't reach the server." | Don't write "We are unable to establish a connection." |
| End full-sentence helper text and errors with periods | Don't put periods on labels, buttons, or titles |
| Cut "simply", "just", and "easy" from every instruction | Don't tell a blocked user the fix is "simple" |

## Checklist

- [ ] All headings, buttons, and labels in sentence case
- [ ] Every button is a verb (verb + noun unless context is unambiguous)
- [ ] Every error says what happened and how to fix it, without blame
- [ ] Confirmations name the object and the consequence explicitly
- [ ] At most one warm-toned message (warning/danger) per view
- [ ] Code, tokens, paths, and typed values rendered in JetBrains Mono
- [ ] Dates, numbers, and units follow the formatting table
- [ ] No "simply/just/easy/oops"; active voice; sentences ≤ 20 words
- [ ] Empty states explain the space and offer exactly one action
- [ ] Copy reviewed in both light and dark themes for feedback-color pairing

## Related

- [00 · Design principles](./00-design-principles.md)
- [15 · Accessibility](./15-accessibility.md)
- [16 · Responsive](./16-responsive.md)
- [18 · Design tokens](./18-design-tokens.md)
