# 13 · Feedback — Cloud Design System

> Alerts, toasts, modals, and loading/empty states that tell users what happened, calmly and at the right level of interruption.

## Principles

1. **Match interruption to stakes.** Inline alert < toast < modal. Never use a heavier channel than the message deserves.
2. **Say what happened and how to fix it.** Every message names the event and the next step, in sentence case, active voice, ≤ 20 words.
3. **Never color alone.** Every status pairs its color with an icon and text.
4. **Don't let feedback vanish with work undone.** Errors that require action never auto-dismiss.
5. **No layout shift.** Loading states reserve the space of the content they replace.

## The system

### Alerts / banners (inline, non-blocking)

| Variant | Tint bg | Tint border | Text | Icon |
|---|---|---|---|---|
| Success | #F0FDF4 | #BBF7D0 | #15803D | check-circle |
| Warning | #FFFBEB | #FDE68A | #B45309 | alert-triangle |
| Danger | #FEF2F2 | #FECACA | #B91C1C | alert-circle |
| Info | #F0F9FF (sky-50) | #BAE6FD (sky-200) | #0369A1 | info |

Anatomy: `radius-md` (10px), `space-4` (16px) padding, leading icon 20px (1.5px stroke, `currentColor`), text `text-sm`, optional dismiss button on the right.

### Toasts (transient, top layer)

| Property | Value |
|---|---|
| Elevation | `elevation-5` — 0 12px 24px rgba(15,23,42,0.08), 0 24px 48px rgba(15,23,42,0.12) |
| Position | Bottom-right on desktop; top, full-width minus 16px margins, on mobile |
| Auto-dismiss | 5s; timer pauses on hover/focus |
| Stack limit | Max 3 visible; oldest collapses out first |
| Surface | `cloud-0`, `radius-lg` (16px), `space-4` padding |
| z-index | 1700 (`toast`) |
| Motion | Enter 250ms ease-out (translate + fade); exit 150ms ease-in. Transform/opacity only. |

Toasts confirm low-stakes results ("Project saved"). Never use a toast for an error that requires action — use an inline alert or modal that persists.

### Modals / dialogs

| Property | Value |
|---|---|
| Max width | 480px default (drawers/large flows are separate patterns) |
| Radius | `radius-xl` (24px) |
| Elevation | `elevation-4` — 0 8px 16px rgba(15,23,42,0.06), 0 16px 32px rgba(15,23,42,0.10) |
| Scrim | rgba(2, 6, 23, 0.5) (`cloud-950` at 50%), z-index 1300; modal at 1400 |
| Padding | `space-6` (24px); title `text-xl` 600, body `text-md` |
| Dismiss | Esc key and scrim click close it; focus is trapped inside; focus returns to the trigger on close |
| Actions | Right-aligned footer; primary action on the right, cancel to its left |
| Motion | 400ms (`duration-slow`) fade + scale enter, ease-out; respect `prefers-reduced-motion` |

### Confirmation dialogs (destructive actions)

- Title names the object: "Delete project?" — body states consequence: "This permanently deletes Atlas and its 14 environments."
- Confirm button is Destructive (solid #DC2626) and carries an explicit verb + noun: **"Delete project"**. Never "Are you sure?" + "OK".
- Cancel is the Secondary (outline) button and receives initial focus for destructive confirms.

### Loading states

| Pattern | Rules |
|---|---|
| Spinner | `sky-600` (#0284C7) stroke, 20px inside buttons / 24–32px standalone. For **actions** (button pressed, form submitting). In buttons: spinner replaces the label, width preserved. |
| Skeleton | `cloud-100` (#F1F5F9) blocks with a subtle shimmer, matching the final layout's shapes and sizes. For **content** loading. Zero layout shift when real content lands. |
| Delay | Show nothing for operations under ~300ms; then show the loader. |

### Empty states

Icon (32px, `cloud-400`) + title (`text-lg` 600, `cloud-900`) + one-line explanation (`text-sm`, `cloud-600`) + one primary action. Centered in the space the content would occupy.

### Progress indicators

- Determinate bar: track `cloud-100`, fill `sky-600`, height 8px, `radius-full`. Pair with a text percentage or step count — never color alone.
- Indeterminate: use the spinner. Steps: "Step 2 of 4" label with the bar.

## Tokens

```css
:root {
  /* Status tints */
  --cds-success-bg: #F0FDF4;  --cds-success-border: #BBF7D0;  --cds-success-text: #15803D;
  --cds-warning-bg: #FFFBEB;  --cds-warning-border: #FDE68A;  --cds-warning-text: #B45309;
  --cds-danger-bg:  #FEF2F2;  --cds-danger-border:  #FECACA;  --cds-danger-text:  #B91C1C;
  --cds-info-bg:    #F0F9FF;  --cds-info-border:    #BAE6FD;  --cds-info-text:    #0369A1;

  /* Overlay surfaces */
  --cds-scrim: rgba(2, 6, 23, 0.5);
  --cds-elevation-4: 0 8px 16px rgba(15,23,42,0.06), 0 16px 32px rgba(15,23,42,0.10);
  --cds-elevation-5: 0 12px 24px rgba(15,23,42,0.08), 0 24px 48px rgba(15,23,42,0.12);

  /* Radii */
  --cds-radius-md: 10px;   /* alerts */
  --cds-radius-lg: 16px;   /* toasts */
  --cds-radius-xl: 24px;   /* modals */
  --cds-radius-full: 9999px;

  /* Loading */
  --cds-spinner-color: #0284C7;   /* sky-600 */
  --cds-skeleton-bg: #F1F5F9;     /* cloud-100 */

  /* Motion */
  --cds-duration-fast: 150ms;
  --cds-duration-base: 250ms;
  --cds-duration-slow: 400ms;
  --cds-ease-enter: cubic-bezier(0.2, 0, 0, 1);
  --cds-ease-exit: cubic-bezier(0.4, 0, 1, 1);

  /* Layers */
  --cds-z-scrim: 1300; --cds-z-modal: 1400; --cds-z-toast: 1700;
}
```

## Usage

### Alert

```html
<div class="cds-alert cds-alert--danger" role="alert">
  <svg class="cds-alert__icon" width="20" height="20" aria-hidden="true"><!-- alert-circle --></svg>
  <p>Payment failed — your card was declined. Update your card to retry.</p>
</div>
```

```css
.cds-alert {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 16px;                      /* space-4 */
  border-radius: var(--cds-radius-md);
  border: 1px solid; font-size: 14px; line-height: 20px;
}
.cds-alert__icon { flex: none; stroke-width: 1.5; }
.cds-alert--danger {
  background: var(--cds-danger-bg);
  border-color: var(--cds-danger-border);
  color: var(--cds-danger-text);
}
```

### Toast stack

```css
.cds-toast-region {
  position: fixed; bottom: 24px; right: 24px;
  display: flex; flex-direction: column; gap: 12px;
  z-index: var(--cds-z-toast);
}
.cds-toast {
  background: #FFFFFF;                /* cloud-0 */
  border-radius: var(--cds-radius-lg);
  box-shadow: var(--cds-elevation-5);
  padding: 16px; max-width: 360px;
  animation: cds-toast-in var(--cds-duration-base) var(--cds-ease-enter);
}
@keyframes cds-toast-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}
@media (max-width: 639px) {
  .cds-toast-region { top: 16px; bottom: auto; left: 16px; right: 16px; }
}
@media (prefers-reduced-motion: reduce) { .cds-toast { animation: none; } }
```

### Confirmation dialog

```html
<div class="cds-scrim"></div>
<div class="cds-modal" role="alertdialog" aria-modal="true" aria-labelledby="del-title">
  <h2 id="del-title" class="cds-modal__title">Delete project?</h2>
  <p class="cds-modal__body">This permanently deletes Atlas and its 14 environments.</p>
  <footer class="cds-modal__footer">
    <button class="cds-btn cds-btn--secondary" autofocus>Cancel</button>
    <button class="cds-btn cds-btn--destructive">Delete project</button>
  </footer>
</div>
```

```css
.cds-scrim { position: fixed; inset: 0; background: var(--cds-scrim); z-index: var(--cds-z-scrim); }
.cds-modal {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: min(480px, calc(100vw - 32px));
  background: #FFFFFF; border-radius: var(--cds-radius-xl);
  box-shadow: var(--cds-elevation-4);
  padding: 24px; z-index: var(--cds-z-modal);
}
.cds-modal__footer { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
```

### Skeleton

```css
.cds-skeleton {
  background: var(--cds-skeleton-bg);
  border-radius: 6px;
  position: relative; overflow: hidden;
}
.cds-skeleton::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
  animation: cds-shimmer 1.5s infinite;
}
@keyframes cds-shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce) { .cds-skeleton::after { animation: none; } }
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Build alerts from the tint recipe: `#FEF2F2` bg + `#FECACA` border + `#B91C1C` text for danger | Don't put white text on solid #DC2626 for inline alerts — solid status fills are for buttons, not banners |
| Give every alert a 20px leading icon plus text | Don't signal status with a colored border alone — color is never the only cue |
| Auto-dismiss toasts after 5s and pause the timer on hover/focus | Don't toast "Upload failed" and let it vanish — errors needing action get a persistent alert or dialog |
| Cap the toast stack at 3, collapsing the oldest first | Don't queue 8 toasts up the screen edge — they cover content and can't be read in time |
| Keep default modals at max-width 480px, `radius-xl`, `elevation-4`, scrim rgba(2,6,23,0.5) | Don't open a full-screen modal for a two-field form — reserve larger surfaces for drawers/flows |
| Trap focus in an open modal, close on Esc and scrim click, and return focus to the trigger | Don't leave Tab free to reach the page behind the scrim — keyboard users get lost |
| Label destructive confirms with verb + noun on a #DC2626 button: "Delete project" | Don't ask "Are you sure?" with OK/Cancel — nobody can tell what OK will destroy |
| Use skeletons (`cloud-100` shimmer) shaped like the final content for loading pages/lists | Don't center a lone spinner where a list will appear — content pops in and shifts the layout |
| Use a `sky-600` spinner inside the pressed button, keeping its width | Don't swap the button for a spinner of a different size — buttons must not resize while loading |
| Put the primary action on the right of the modal footer, cancel to its left | Don't reorder actions per modal — inconsistent placement causes destructive misclicks |
| Give empty states an icon, a title, one line of explanation, and a primary action | Don't render a blank white region or just "No data" — dead ends stall new users |
| Pair progress bars with "Step 2 of 4" or a percentage | Don't rely on the `sky-600` fill alone to show progress — it's invisible to some users |

## Checklist

- [ ] Every status message has icon + text, not color alone
- [ ] Alert variants use the exact tint bg / tint border / text-on-light hexes from the table
- [ ] Toasts: `elevation-5`, bottom-right (desktop) or top (mobile), 5s auto-dismiss with hover pause, max 3
- [ ] No error requiring user action is delivered as an auto-dismissing toast
- [ ] Modal: 480px max, `radius-xl`, `elevation-4`, scrim rgba(2,6,23,0.5), z-index 1400 over 1300
- [ ] Focus trapped in modal; Esc and scrim click close; focus returns to trigger
- [ ] Destructive confirm uses a #DC2626 button labeled with verb + noun
- [ ] Skeletons for content, spinners for actions; zero layout shift when content arrives
- [ ] All enter/exit animation is transform/opacity and respects `prefers-reduced-motion`

## Related

- [12-cards-surfaces.md](12-cards-surfaces.md) — surface, radius, and elevation foundations these overlays sit on
- [14-data-display.md](14-data-display.md) — badges and status colors shared with alerts
