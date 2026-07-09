# 17 · Content, voice and tone — Cloud Design System
> Words are part of the interface: clear, human, confident, calm — the same voice in a button label and an error message.

## Principles

1. **Clear beats clever.** Say the thing. Active voice, sentences ≤ 20 words.
2. **Human, not robotic.** Write like a helpful colleague — contractions welcome, jargon isn't.
3. **Confident, never bossy.** "Save changes", not "You must save your changes now".
4. **Calm under pressure.** Errors and destructive moments get more care, not more drama.
5. **Voice is constant, tone flexes.** The personality never changes; the emotional register matches the moment.

## The system

### Sentence case everywhere

Buttons, headings, labels, nav items, menu items, tabs, table headers, tooltips — all sentence case. Never Title Case, never ALL CAPS (the only exception: tiny eyebrow labels, text-xs with +0.02em letter-spacing).

| ✅ Sentence case | ❌ Not this |
|---|---|
| Create project | Create Project |
| Billing settings | BILLING SETTINGS |
| Invite your team | Invite Your Team |

### Button copy = verb + noun

Labels state the action's result: "Create project", "Save changes", "Delete file", "Invite members". Never "Submit", "OK", "Click here", or "Yes/No" in confirmations.

### Error message formula

**What happened + how to fix it.** No blame, no "Oops!", no jargon, never a bare error code.

| ✅ | ❌ |
|---|---|
| Couldn't save your changes. Check your connection and try again. | Oops! Something went wrong. |
| That file is over 10 MB. Choose a smaller file or compress it. | Error 413: payload too large. |
| Enter an email address in the format name@example.com. | Invalid input. |

An error code may appear *after* a human explanation ("…try again. (Error 5031)"), never instead of one.

### Empty states

Say what belongs here and offer the first step: headline (what this is) + one line (why it's useful) + primary action.

> **No projects yet**
> Projects keep your team's work in one place.
> [Create project]

### Confirmations use explicit nouns

Name the object and the consequence: "Delete 'Q3 launch plan'? This can't be undone." Buttons repeat the verb: [Delete plan] [Cancel] — never [Yes] [No].

### Form microcopy

- Labels: short nouns, 1–3 words ("Email address", "Company name"), no colons, no periods.
- Help text: format guidance below the field, full sentence with a period ("Use at least 8 characters.").
- Placeholders: examples only ("name@example.com"), never instructions, never the label.

### Numbers, dates and time

| Item | Format |
|---|---|
| Dates | Jan 12, 2026 (never 01/12/26 — ambiguous) |
| Relative time | "2 minutes ago", switch to absolute after 7 days |
| Time | 2:30 PM (locale-aware when possible) |
| Large numbers | 12,400 or abbreviate: 12.4K, 1.2M |
| Ranges | En dash, no spaces: 10–20 |
| Zero states | "No results", not "0 results" in prose contexts |

### Capitalization and punctuation

- No periods on labels, buttons, titles, nav items, or fragments.
- Periods on full-sentence help text, descriptions, and error messages.
- One exclamation point per screen, maximum — and almost never.
- No ellipses for suspense; "…" only for truncation or in-progress actions ("Uploading…").

### Tone by context

| Context | Tone | Example |
|---|---|---|
| Success | Brief, warm | "Project created" |
| Error | Helpful, specific, no blame | "Couldn't upload. Check your connection and try again." |
| Destructive | Serious, explicit | "This permanently deletes 34 files." |
| Empty state | Encouraging, action-first | "No projects yet. Create one to get started." |
| Onboarding | Friendly, brisk | "Pick a template — you can change it later." |
| Loading | Quiet | "Loading projects…" (no jokes in blocking states) |

### Word list

| ✅ Use | ❌ Avoid | Why |
|---|---|---|
| sign in / sign out | log in / log out | Consistent, friendlier |
| delete | remove | "Delete" when permanent; "remove" only for reversible detachment |
| create | new / add (for objects) | Verb + noun pattern |
| choose / select | pick | Register |
| need | must / required to (in prose) | Softer, still clear |
| can't | cannot / unable to | Human |
| turn on / turn off | enable / disable | Plain language |
| edit | modify / alter | Simpler |
| error / problem | failure / fatal | Calm |
| you / your | the user / one's | Speak to the person |

## Tokens

Voice has no CSS, but copy renders through these text tokens — use them consistently:

```css
:root {
  --cds-text-label: 500 14px/20px "Plus Jakarta Sans", system-ui, sans-serif;   /* labels, buttons sm/md */
  --cds-text-body: 400 16px/24px "Plus Jakarta Sans", system-ui, sans-serif;    /* body, errors, help */
  --cds-text-caption: 400 12px/16px "Plus Jakarta Sans", system-ui, sans-serif; /* captions, eyebrows */
  --cds-color-text-primary: #0F172A;    /* cloud-900 — body, headings */
  --cds-color-text-secondary: #475569;  /* cloud-600 — help text, captions */
  --cds-color-text-danger: #B91C1C;     /* error messages */
  --cds-letterspacing-eyebrow: 0.02em;  /* the one ALL-CAPS exception */
}
```

## Usage

Form field with label, help text, and error copy:

```html
<label for="workspace">Workspace name</label>
<input id="workspace" type="text" placeholder="e.g. Acme design team"
       aria-invalid="true" aria-describedby="workspace-help workspace-error">
<p id="workspace-help">Use letters, numbers, and hyphens.</p>
<p id="workspace-error" class="cds-field-error">
  That name is taken. Try adding your team or region.
</p>
```

Destructive confirmation with explicit nouns:

```html
<dialog class="cds-modal">
  <h2>Delete "Q3 launch plan"?</h2>
  <p>This permanently deletes the project and its 34 files. This can't be undone.</p>
  <div class="cds-modal-actions">
    <button type="button" class="cds-btn-secondary">Cancel</button>
    <button type="button" class="cds-btn-destructive">Delete project</button>
  </div>
</dialog>
```

Empty state:

```html
<section class="cds-empty-state">
  <h3>No invoices yet</h3>
  <p>Invoices appear here after your first billing cycle.</p>
  <button type="button" class="cds-btn-primary">Set up billing</button>
</section>
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Write "Create project" on the button that creates a project | Don't write "Submit", "OK", or "Click here" — labels state the result |
| Use sentence case in every button, heading, label, and nav item | Don't use Title Case ("Save Changes") or ALL CAPS outside tiny eyebrow labels |
| Write errors as what happened + how to fix: "Couldn't save. Check your connection and try again." | Don't write "Oops! Something went wrong." — it explains nothing |
| Put a human explanation first; append error codes in parentheses if support needs them | Don't show "Error 5031" alone |
| Name the object in confirmations: "Delete 'Q3 launch plan'?" with [Delete project] | Don't ask "Are you sure?" with [Yes] [No] buttons |
| Use "sign in" and "sign out" | Don't mix in "log in" / "login" — one term, everywhere |
| Say "delete" when data is gone forever; "remove" when it can be re-added | Don't soften a permanent delete as "remove" — users will assume it's reversible |
| Use placeholders for examples: "name@example.com" | Don't use the placeholder as the label — it disappears on input |
| End full-sentence help text with a period: "Use at least 8 characters." | Don't put periods on labels, buttons, or titles |
| Write dates as "Jan 12, 2026" and switch relative time to absolute after 7 days | Don't write "01/12/26" — half your users read it as December 1 |
| Keep success toasts to a few words: "Changes saved" | Don't celebrate routine saves with "Awesome! Your changes were saved successfully!!" |
| Address the reader as "you" in active voice | Don't write "The user's request could not be processed" |

## Checklist

- [ ] Every heading, button, label, and nav item is sentence case
- [ ] Every button label is verb + noun and states its result
- [ ] Every error says what happened and how to fix it — no blame, no "Oops", no bare codes
- [ ] Confirmations name the object and repeat the verb on the confirm button
- [ ] Labels have no periods; full-sentence help text does
- [ ] Placeholders are examples, never labels or instructions
- [ ] Terminology matches the word list (sign in, delete vs remove, turn on/off)
- [ ] Dates, times, and numbers follow the formatting table
- [ ] Tone matches context: success brief, errors helpful, destructive serious
- [ ] Sentences ≤ 20 words, active voice throughout

## Related

- [15 · Accessibility](./15-accessibility.md) — error markup that carries this copy
- [16 · Responsive](./16-responsive.md) — copy never changes across breakpoints
- [20 · Governance](./20-governance.md) — proposing word-list additions
