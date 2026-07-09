# 10 · Forms & inputs — Maxilius Design System

> Form controls collect user data on calm, cool surfaces: visible labels, 40px default heights, blue focus rings, and warm vermillion reserved for real errors.

## Principles

1. **Labels are always visible.** Every field has a label above it. Placeholder text is a hint (`text-muted`), never a substitute for a label.
2. **The field is the quietest state.** A resting control is a white surface with a 1px gray-200 border; hover, focus, and error each escalate by exactly one deliberate step.
3. **Warm color means something is wrong.** Vermillion appears only on invalid fields and their error messages — never decoratively.
4. **Validate on blur, then live.** First judge a field when the user leaves it; once it has erred, re-validate on every input so the fix is rewarded instantly.
5. **Proximity groups meaning.** Label to field to help text sit `space-1`–`space-2` apart; unrelated field groups sit `space-6` apart.

## The system

Seven controls, implemented in `@maxilius/react`: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio` (+`RadioGroup`), `Toggle`, and `Label`.

### Field anatomy

```
Label (required *)          ← .mx-label, 14px medium, gray-900; warm asterisk
[ field                 ]   ← control, 40px default, radius-md
Help text                   ← 14px text-secondary  — or, when invalid:
⚠ Error message             ← 14px text-danger + alert-circle icon
```

### Text controls (Input, Select, Textarea) — shared states

| State | Treatment (light values) |
|---|---|
| default | bg `bg-surface` white, 1px `border-default` gray-200 `#E2E8F0`, text gray-900, placeholder `text-muted` gray-400 `#94A3B8`, radius-md 8px |
| hover | border `border-strong` gray-300 `#CBD5E1` |
| focus | border `border-focus` blue-500 `#3B82F6` + 3px ring of `action-primary-subtle-bg` blue-50 `#EFF6FF` (blue-950 dark); default outline removed |
| invalid | border `feedback-danger-icon` red-600 `#DC2626` + `aria-invalid="true"` |
| invalid + focus | red border kept + 3px ring of `feedback-danger-bg` red-50 `#FEF2F2` (red-950 dark) |
| disabled | bg gray-100 `#F1F5F9`, text gray-400, border gray-200, `cursor: not-allowed` |

Border and box-shadow transition at 120ms `--mx-motion-easing-standard`.

### Input sizes and icons

| Size | Height | Padding-x | Font |
|---|---|---|---|
| sm | 32px | 12px (`space-3`) | 14px |
| md (default) | 40px | 12px (`space-3`) | 14px |
| lg | 48px | 16px (`space-4`) | 16px |

`iconStart` / `iconEnd` place a 16px icon inside the field at `space-3` from the edge, colored `text-muted` (disabled: `action-disabled-text`); the text padding on that side grows to `space-8` (32px). Icons are decorative (`pointer-events: none`).

### Select

Native `<select>` with `appearance: none` and a built-in 16px `chevron-down` at right `space-3`. Same sizes as Input, but right padding is `space-8` (sm/md) or `space-10` (lg) to clear the chevron. Props: `size`, `invalid`.

### Textarea

Padding `space-3`, 14px text at line-height normal (1.5), default `rows={4}`. `resize` prop: `none` | `vertical` (default) | `both`. Same state treatments as Input.

### Checkbox and Radio

20×20px control (`space-5`), 1px `border-strong` border on `bg-surface`, gap `space-3` to the text column. Checkbox is `radius-sm` (4px) with a 3px-stroke check; Radio is `radius-full` with a 40% inner dot that scales in at 120ms. Checked/indeterminate: bg and border become `action-primary-bg` blue-600, glyph white. `indeterminate` (Checkbox) shows a dash and sets the DOM property. Both take `label` (14px medium, gray-900) and `description` (14px, `text-secondary`), gap `space-1`. Invalid: red-600 border on the box/circle. Focus-visible: 2px `--mx-focus-ring` outline at 2px offset. `RadioGroup` adds `role="radiogroup"`, `aria-label`, and direction `vertical` (gap `space-3`, default) or `horizontal` (gap `space-6`).

### Toggle (switch)

`role="switch"` checkbox. Track: `radius-full`, 2px inner padding, off bg `border-strong` gray-300, on bg `action-primary-bg` blue-600, animating at 200ms (`motion-duration-base`). Sizes: md 40×24px (`space-10`×`space-6`, default) and sm 32×20px. Thumb: white circle with `shadow-sm`, sliding by track-width minus track-height. Disabled: track `action-disabled-bg`, thumb `action-disabled-text`, no shadow. Use for instant on/off settings; use Checkbox when a form submit applies the change.

### Label

14px Inter medium, gray-900, line-height snug. `required` appends a warm asterisk in `text-danger` (`aria-hidden` — also set `required` on the control). `muted` drops to `text-secondary` at regular weight for secondary fields.

### Validation timing (defined by docs, not yet in code)

Validate a field on **blur**; once invalid, re-validate on **input** and clear the error the moment it passes. Never validate on first keystroke. On submit, focus the first invalid field. Error text says what happened and how to fix it ("Enter an email like name@company.com"), paired with a 16px `alert-circle` icon — never color alone.

## Tokens

```css
/* Text controls */
--mx-bg-surface: #FFFFFF;          --mx-text-primary: #0F172A;
--mx-text-secondary: #475569;      --mx-text-muted: #94A3B8;
--mx-border-default: #E2E8F0;      --mx-border-strong: #CBD5E1;
--mx-border-focus: #3B82F6;        --mx-focus-ring: #3B82F6;
--mx-action-primary-bg: #2563EB;   --mx-action-primary-subtle-bg: #EFF6FF;
--mx-feedback-danger-icon: #DC2626; --mx-feedback-danger-bg: #FEF2F2;
--mx-text-danger: #DC2626;
--mx-action-disabled-bg: #F1F5F9;  --mx-action-disabled-text: #94A3B8;
--mx-action-disabled-border: #E2E8F0;
/* Geometry */
--mx-size-control-sm: 2rem; --mx-size-control-md: 2.5rem; --mx-size-control-lg: 3rem;
--mx-space-1: 0.25rem; --mx-space-2: 0.5rem; --mx-space-3: 0.75rem;
--mx-space-4: 1rem; --mx-space-5: 1.25rem; --mx-space-6: 1.5rem;
--mx-space-8: 2rem; --mx-space-10: 2.5rem;
--mx-radius-sm: 0.25rem; --mx-radius-md: 0.5rem; --mx-radius-full: 9999px;
/* Type & motion */
--mx-font-size-sm: 0.875rem; --mx-font-size-md: 1rem;
--mx-font-weight-medium: 500; --mx-font-line-height-snug: 1.375;
--mx-border-width-thin: 1px; --mx-border-width-thick: 2px;
--mx-motion-duration-fast: 120ms; --mx-motion-duration-base: 200ms;
--mx-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
--mx-shadow-sm: 0 1px 2px 0 rgb(2 6 23 / 0.06);
```

## Usage

### React

```html
<!-- JSX — import { Input, Label, Select, Checkbox, RadioGroup, Radio, Toggle, Textarea }
     from '@maxilius/react' -->
<div class="field">
  <Label htmlFor="email" required>Work email</Label>
  <Input id="email" type="email" iconStart="search" placeholder="name@company.com"
         invalid={!!error} aria-describedby="email-error" />
  {error && <p id="email-error" class="mx-field-error">{error}</p>}
</div>

<Select size="md" defaultValue="us"> <option value="us">United States</option> </Select>
<Textarea rows={4} resize="vertical" placeholder="Add a note (optional)" />
<Checkbox label="Email me updates" description="Product news, at most once a month" />
<RadioGroup label="Plan" direction="vertical">
  <Radio name="plan" value="starter" label="Starter" description="For side projects" />
  <Radio name="plan" value="team" label="Team" />
</RadioGroup>
<Toggle label="Dark mode" size="md" />
```

### Plain CSS (non-React sites)

```html
<div class="field">
  <label class="mx-label" for="email">Work email <span class="mx-label__required" aria-hidden="true">*</span></label>
  <input class="mx-input mx-input--md mx-input--invalid" id="email" type="email"
         required aria-invalid="true" aria-describedby="email-error" />
  <p class="mx-field-error" id="email-error">Enter an email like name@company.com</p>
</div>
```

```css
.field { display: flex; flex-direction: column; gap: var(--mx-space-2); }
.mx-label { font: var(--mx-font-weight-medium) var(--mx-font-size-sm)/var(--mx-font-line-height-snug)
            var(--mx-font-family-sans); color: var(--mx-text-primary); }
.mx-label__required { color: var(--mx-text-danger); }
.mx-input {
  height: var(--mx-size-control-md); width: 100%; padding: 0 var(--mx-space-3);
  font-size: var(--mx-font-size-sm); font-family: var(--mx-font-family-sans);
  color: var(--mx-text-primary); background: var(--mx-bg-surface);
  border: var(--mx-border-width-thin) solid var(--mx-border-default);
  border-radius: var(--mx-radius-md);
  transition: border-color var(--mx-motion-duration-fast) var(--mx-motion-easing-standard),
              box-shadow var(--mx-motion-duration-fast) var(--mx-motion-easing-standard);
}
.mx-input::placeholder { color: var(--mx-text-muted); }
.mx-input:hover:not(:disabled):not(:focus) { border-color: var(--mx-border-strong); }
.mx-input:focus { outline: none; border-color: var(--mx-border-focus);
                  box-shadow: 0 0 0 3px var(--mx-action-primary-subtle-bg); }
.mx-input--invalid { border-color: var(--mx-feedback-danger-icon); }
.mx-input--invalid:focus { border-color: var(--mx-feedback-danger-icon);
                           box-shadow: 0 0 0 3px var(--mx-feedback-danger-bg); }
.mx-input:disabled { background: var(--mx-action-disabled-bg); color: var(--mx-action-disabled-text);
                     border-color: var(--mx-action-disabled-border); cursor: not-allowed; }
.mx-field-error { display: flex; gap: var(--mx-space-1); font-size: var(--mx-font-size-sm);
                  color: var(--mx-text-danger); margin: 0; }
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Put a visible `Label` above every field, linked with `htmlFor`/`id`. | Don't use placeholder text as the label — it vanishes on first keystroke and fails recall. |
| Mark required fields with `required` on Label (warm asterisk) and the input element. | Don't mark optional fields with "(required)" everywhere instead — mark the exception, not the rule. |
| Keep placeholders as format hints in gray-400 (`text-muted`): "name@company.com". | Don't put instructions users must remember into the placeholder — use help text below the field. |
| Validate on blur, then re-validate on input once a field has erred. | Don't flag "Email is invalid" while the user is still typing the third character. |
| Pair `invalid` (red-600 border) with an `alert-circle` icon and an error message wired via `aria-describedby`. | Don't signal errors with border color alone — color-blind users get nothing. |
| Write errors that say what happened and how to fix it: "Choose a password with 8+ characters". | Don't blame the user ("You entered an invalid password") or say just "Invalid input". |
| Use `iconStart="search"` for search fields; icon padding (space-8) is applied for you. | Don't cram custom padding around field icons — 32px inset is the system value. |
| Use Toggle for instant-effect settings and Checkbox for options applied on submit. | Don't use a Toggle inside a form that ends with a "Save" button — that's a Checkbox. |
| Use `RadioGroup` (2–5 options, all visible) and Select for longer lists. | Don't build a Select with 3 options that a RadioGroup would show in one glance. |
| Keep field groups `space-6` (24px) apart and label↔field↔help at `space-1`–`space-2`. | Don't space every element evenly — even spacing erases grouping. |
| Match control heights within a row: md Input next to md Select next to md Button (all 40px). | Don't put a lg (48px) button beside a md (40px) input in the same form row. |
| Disable fields only when their value truly cannot apply, and explain why nearby. | Don't disable the whole form as validation feedback — show the errors instead. |

## Checklist

- [ ] Every field has a visible label above it, programmatically linked
- [ ] Required fields marked on both label (asterisk) and control (`required`)
- [ ] Invalid fields set `aria-invalid` and reference their error via `aria-describedby`
- [ ] Errors use red-600 border + red-50 focus ring + icon + fix-it message
- [ ] Validation fires on blur first, then live after first error
- [ ] Controls in a row share one size; default is md (40px)
- [ ] Focus state visible on every control (blue border + 3px subtle ring, or 2px outline on checks/radios/toggles)
- [ ] Checked in dark mode: rings swap to blue-950/red-950, surfaces stay legible

## Related

- [09-buttons.md](./09-buttons.md) — submit and cancel actions
- [01-color.md](./01-color.md) — feedback ramps
- [13-feedback.md](./13-feedback.md) — toasts and inline alerts
- [15-accessibility.md](./15-accessibility.md) — labels, contrast, focus
- [17-content-voice-tone.md](./17-content-voice-tone.md) — writing error messages
