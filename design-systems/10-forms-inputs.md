# 10 · Forms and inputs — Cloud Design System
> Forms are where users do work; CDS inputs make every field legible, every state obvious, and every error fixable.

## Principles

1. **Labels are always visible.** A label above every field, never a placeholder standing in for one.
2. **One column, one thought.** Single-column layout by default — users complete forms top to bottom without scanning sideways.
3. **Width hints at content.** A ZIP code field should not be as wide as an address field.
4. **Validate kindly.** Check on blur, re-validate live once a field has erred; say what happened and how to fix it.
5. **States match buttons.** Inputs share the 40px md height, radius-md, and the sky focus language of the rest of CDS.

## The system

### Anatomy

Every field is composed top to bottom, all gaps on the 4px grid:

| Part | Style | Gap below |
|---|---|---|
| Label | text-sm 14px, weight 500, cloud-700 `#334155` | 8px (space-2) |
| Field | 40px height, radius-md 10px, border 1px cloud-300 `#CBD5E1`, bg cloud-0 `#FFFFFF`, text-md 16px cloud-900 `#0F172A` | 8px (space-2) |
| Help text (optional) | text-sm 14px, cloud-600 `#475569` | — |
| Error message (replaces help) | text-sm 14px, `#B91C1C` text with 16px icon | — |

Space between fields: 24px (space-6). Between fieldsets/sections: 32–48px (space-8 to space-12).

### Field states

| State | Border | Background | Extra |
|---|---|---|---|
| Default | cloud-300 `#CBD5E1` | cloud-0 `#FFFFFF` | — |
| Hover | cloud-400 `#94A3B8` | cloud-0 | — |
| Focus | sky-500 `#0EA5E9` | cloud-0 | 3px sky-100 `#E0F2FE` ring |
| Error | `#DC2626` | cloud-0 | icon + message below, `aria-invalid="true"` |
| Disabled | cloud-200 `#E2E8F0` | cloud-100 `#F1F5F9` | text cloud-400, `cursor: not-allowed` |

### Controls

| Control | Specs |
|---|---|
| Text input | 40px height, padding-x 12px (space-3), radius-md 10px |
| Textarea | Same borders/radius; min-height 96px (space-24 worth of rows), vertical resize only |
| Select | Same as text input + 20px chevron icon, right-padded 40px so text never collides |
| Checkbox | 18px square, radius-xs 4px, border cloud-300; checked: bg sky-600 `#0284C7` + white check |
| Radio | 18px circle, radius-full; checked: 2px sky-600 border + 8px sky-600 dot |
| Switch | 40×24px track, radius-full; off: cloud-300 track; on: sky-600 track, 20px cloud-0 thumb |

Checkbox/radio labels sit to the right, text-md, 8px gap; the whole row is clickable and the touch target ≥ 44px tall with spacing.

### Labels and placeholders

- **Labels always visible** above the field. Placeholder-as-label fails the moment the user types: the label vanishes, recall breaks mid-form, autofill becomes unverifiable, and screen readers may announce nothing. It also fails WCAG expectations for persistent visible labels.
- Placeholder style: cloud-400 `#94A3B8`, showing an **example format**, not instructions — `name@company.com`, not "Enter your email here". At 2.9:1 on white, cloud-400 is decoration, never load-bearing content.
- Required fields: mark with `*` after the label plus `required` on the input. If most fields are required, mark only the optional ones with "(optional)" instead.

### Validation and errors

- Validate on **blur**; once a field has shown an error, re-validate on **input** so the fix is confirmed keystroke by keystroke.
- Error presentation: border `#DC2626`, a 16px alert icon, and a text-sm message in `#B91C1C` below the field. Never color alone — icon + text always accompany the red border.
- Error copy says what happened and how to fix: "Enter an email like name@company.com", not "Invalid input".

### Layout

- Single column by default. Only pair fields that form one unit (city + ZIP, first + last name), and stack them again below 640px.
- Match input width to expected content: ~8ch for ZIP, ~12ch for phone, ~24ch for email, full column for addresses and free text.
- Group related fields in a `<fieldset>` with a `<legend>` styled as text-lg 18px weight 600 cloud-900.

## Tokens

```css
:root {
  --cds-field-h: 40px;
  --cds-field-px: 12px;                    /* space-3 */
  --cds-field-radius: 10px;                /* radius-md */
  --cds-field-bg: #FFFFFF;                 /* cloud-0 */
  --cds-field-border: #CBD5E1;             /* cloud-300 */
  --cds-field-border-hover: #94A3B8;       /* cloud-400 */
  --cds-field-border-focus: #0EA5E9;       /* sky-500 */
  --cds-field-ring-focus: 0 0 0 3px #E0F2FE; /* sky-100 */
  --cds-field-border-error: #DC2626;
  --cds-field-text: #0F172A;               /* cloud-900 */
  --cds-field-placeholder: #94A3B8;        /* cloud-400 */
  --cds-field-label: #334155;              /* cloud-700 */
  --cds-field-help: #475569;               /* cloud-600 */
  --cds-field-error-text: #B91C1C;
  --cds-field-disabled-bg: #F1F5F9;        /* cloud-100 */
  --cds-field-disabled-border: #E2E8F0;    /* cloud-200 */
  --cds-check-size: 18px;
  --cds-check-radius: 4px;                 /* radius-xs */
  --cds-check-checked: #0284C7;            /* sky-600 */
  --cds-field-gap: 8px;                    /* space-2 */
  --cds-field-stack: 24px;                 /* space-6 between fields */
}
```

## Usage

### Complete field CSS

```css
.cds-field { display: flex; flex-direction: column; gap: var(--cds-field-gap); margin-bottom: var(--cds-field-stack); }
.cds-label { font-size: 14px; line-height: 20px; font-weight: 500; color: var(--cds-field-label); }
.cds-label .req { color: #DC2626; }

.cds-input, .cds-select, .cds-textarea {
  height: var(--cds-field-h);
  padding: 0 var(--cds-field-px);
  font: 400 16px/24px "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--cds-field-text);
  background: var(--cds-field-bg);
  border: 1px solid var(--cds-field-border);
  border-radius: var(--cds-field-radius);
  transition: border-color 150ms cubic-bezier(0.2, 0, 0, 1), box-shadow 150ms cubic-bezier(0.2, 0, 0, 1);
}
.cds-input::placeholder { color: var(--cds-field-placeholder); }
.cds-input:hover:not(:disabled):not(:focus) { border-color: var(--cds-field-border-hover); }
.cds-input:focus, .cds-select:focus, .cds-textarea:focus {
  outline: none;
  border-color: var(--cds-field-border-focus);
  box-shadow: var(--cds-field-ring-focus);
}
.cds-input:disabled {
  background: var(--cds-field-disabled-bg);
  border-color: var(--cds-field-disabled-border);
  color: #94A3B8; cursor: not-allowed;
}
.cds-input[aria-invalid="true"] { border-color: var(--cds-field-border-error); }

.cds-textarea { height: auto; min-height: 96px; padding: 8px var(--cds-field-px); resize: vertical; }

.cds-help  { font-size: 14px; line-height: 20px; color: var(--cds-field-help); }
.cds-error { display: inline-flex; align-items: center; gap: 4px;
             font-size: 14px; line-height: 20px; color: var(--cds-field-error-text); }

.cds-checkbox {
  appearance: none; width: var(--cds-check-size); height: var(--cds-check-size);
  border: 1px solid var(--cds-field-border); border-radius: var(--cds-check-radius);
  background: var(--cds-field-bg); cursor: pointer;
}
.cds-checkbox:checked { background: var(--cds-check-checked); border-color: var(--cds-check-checked); }
.cds-radio { appearance: none; width: 18px; height: 18px; border: 1px solid var(--cds-field-border);
             border-radius: 9999px; cursor: pointer; }
.cds-radio:checked { border: 2px solid var(--cds-check-checked); box-shadow: inset 0 0 0 3px #FFFFFF;
                     background: var(--cds-check-checked); }
.cds-checkbox:focus-visible, .cds-radio:focus-visible {
  outline: none; box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #0EA5E9;
}
```

### Text field with help text

```html
<div class="cds-field">
  <label class="cds-label" for="email">Work email <span class="req" aria-hidden="true">*</span></label>
  <input class="cds-input" id="email" type="email" required
         placeholder="name@company.com" autocomplete="email">
  <p class="cds-help" id="email-help">We only use this to send your receipt.</p>
</div>
```

### Field in error state

```html
<div class="cds-field">
  <label class="cds-label" for="zip">ZIP code</label>
  <input class="cds-input" id="zip" inputmode="numeric" style="max-width: 8ch;"
         aria-invalid="true" aria-describedby="zip-error" value="9021">
  <p class="cds-error" id="zip-error">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>
    </svg>
    Enter a 5-digit ZIP code, like 90210.
  </p>
</div>
```

### Grouped choices in a fieldset

```html
<fieldset>
  <legend>Notification frequency</legend>
  <label><input class="cds-radio" type="radio" name="freq" checked> Daily digest</label>
  <label><input class="cds-radio" type="radio" name="freq"> Weekly summary</label>
</fieldset>
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Put a visible text-sm 500 cloud-700 label above every field | Don't use a placeholder as the label — it disappears on input and breaks recall and autofill checking |
| Use placeholders for example formats: `name@company.com` | Don't write instructions in placeholders ("Enter your email here") — they vanish exactly when needed |
| Validate on blur, then re-validate live once a field has erred | Don't flag errors on every keystroke of a pristine field — users get scolded mid-typing |
| Pair the `#DC2626` border with an icon and a text-sm message | Don't signal errors with border color alone — color-blind users see nothing changed |
| Write error copy that names the fix: "Enter a 5-digit ZIP code, like 90210" | Don't ship "Invalid input" — it says what, never how |
| Keep forms single-column with 24px between fields | Don't build two-column forms by default — eye-tracking shows zigzag scanning doubles errors |
| Size inputs to their content: ~8ch ZIP, ~24ch email, full-width address | Don't stretch every input to 100% — a full-width ZIP field hides what's expected |
| Use 18px checkboxes at radius-xs 4px and round radios | Don't square off radios or round checkboxes — shape encodes single vs multiple choice |
| Make the whole checkbox/radio row clickable with a 44px-tall target | Don't leave an 18px control as the only hit area — it fails the touch floor |
| Mark required fields with `*` plus the `required` attribute | Don't mark required visually only — screen readers need the attribute |
| Use `autocomplete` attributes (`email`, `postal-code`, `name`) | Don't disable autofill on standard fields — you're adding typing for no security gain |
| Match the 40px input height to md buttons in inline forms | Don't put a 40px input next to a 48px button — misaligned baselines look broken |

## Checklist

- [ ] Every field has a visible label above it (no placeholder-as-label anywhere)
- [ ] Inputs are 40px, radius-md 10px, border cloud-300, bg cloud-0
- [ ] Focus shows sky-500 border + 3px sky-100 ring
- [ ] Errors combine `#DC2626` border + icon + text-sm message + `aria-invalid`
- [ ] Validation fires on blur, re-validates on input after first error
- [ ] Layout is single-column; only unit pairs share a row and stack on mobile
- [ ] Input widths match expected content length
- [ ] Related fields grouped in `<fieldset>` with a `<legend>`
- [ ] Required marking uses `*` + `required`; optional fields say "(optional)" when required dominates
- [ ] Checkbox/radio/switch touch targets ≥ 44px with spacing

## Related

- [09-buttons.md](./09-buttons.md) — inputs share md height (40px), radius-md, and focus language
- [11-navigation.md](./11-navigation.md) — focus-visible rings follow the same 2px sky-500 recipe
