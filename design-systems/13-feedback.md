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

### Dropdown menus (action / overflow "…" menus)

Action menus that hang off a button — row actions, overflow "…" menus, "New…" split menus. These are **not** form selects; option pickers bound to a form value live in [10-forms-inputs.md](10-forms-inputs.md).

| Property | Value |
|---|---|
| Trigger | A button with `aria-haspopup="menu"` and `aria-expanded` reflecting open state |
| Surface | bg `cloud-0`, 1px border `cloud-200`, `radius-md` (10px), `elevation-3`, min-width 180px, padding `space-1` (4px) |
| Items | 36px height, `text-sm` (14px/20px), padding-x `space-3` (12px), `radius-sm` (6px) |
| Item states | Hover bg `cloud-100`; focus same as hover plus the 2px `sky-500` ring |
| Destructive item | Text #DC2626, with a 1px `cloud-200` divider above it |
| Icons | Optional 16px leading icon, `currentColor`, 1.5px stroke |
| Position | Below the trigger, start-aligned, 4px gap; flips above/realigns when out of viewport |
| z-index | 1000 (`dropdown`) |
| Motion | Enter 250ms (`duration-base`) ease-out fade + 4px translate; exit 150ms ease-in |
| Keyboard | Enter/Space/ArrowDown open and focus the first item; ArrowUp/Down move (wrapping); Esc closes and returns focus to the trigger; typing jumps to a matching item (typeahead) |
| Size cap | Max ~8 items — beyond that, use a dialog, a dedicated page, or a searchable select instead |

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
  --cds-elevation-3: 0 4px 8px rgba(15,23,42,0.05), 0 8px 16px rgba(15,23,42,0.08);
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
  --cds-z-dropdown: 1000;
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

### Dropdown menu

```html
<button class="cds-btn cds-btn--secondary" aria-haspopup="menu" aria-expanded="true" id="row-actions">
  More actions
</button>
<div class="cds-menu" role="menu" aria-labelledby="row-actions">
  <button class="cds-menu__item" role="menuitem">Rename project</button>
  <button class="cds-menu__item" role="menuitem">Duplicate project</button>
  <button class="cds-menu__item" role="menuitem">Export settings</button>
  <button class="cds-menu__item cds-menu__item--destructive" role="menuitem">Delete project</button>
</div>
```

```css
.cds-menu {
  position: absolute; margin-top: 4px;      /* below-start, 4px gap; flip when out of viewport */
  min-width: 180px; padding: 4px;           /* space-1 */
  background: #FFFFFF;                      /* cloud-0 */
  border: 1px solid #E2E8F0;                /* cloud-200 */
  border-radius: var(--cds-radius-md);
  box-shadow: var(--cds-elevation-3);
  z-index: var(--cds-z-dropdown);
}
.cds-menu__item {
  display: flex; align-items: center; gap: 8px;
  width: 100%; height: 36px; padding: 0 12px;    /* space-3 */
  font-size: 14px; line-height: 20px;            /* text-sm */
  color: #0F172A;                                /* cloud-900 */
  border-radius: 6px;                            /* radius-sm */
  background: none; border: 0; text-align: left; cursor: pointer;
}
.cds-menu__item:hover,
.cds-menu__item:focus-visible { background: #F1F5F9; }  /* cloud-100 */
.cds-menu__item:focus-visible { outline: 2px solid #0EA5E9; outline-offset: -2px; }
.cds-menu__item--destructive {
  color: #DC2626;
  border-top: 1px solid #E2E8F0; border-radius: 0 0 6px 6px;  /* divider above */
}
```

Keyboard: the trigger opens on Enter, Space, or ArrowDown and moves focus to the first item; ArrowUp/Down cycle with wrapping; Esc closes and returns focus to the trigger; typing a letter jumps to the next matching item.

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
| Keep menu item labels verb-first: "Rename project", "Export settings" | Don't label items with bare nouns like "Settings…" in an action menu — users can't predict what selecting one does |
| Reserve action menus for commands; route option-picking to a form select | Don't put form inputs, checkboxes, or search fields inside an action menu — that's a select or a popover form, not a menu |
| Keep menus flat, or one submenu level at the absolute most | Don't nest submenus two levels deep — hover corridors are undriveable; prefer no submenus and split the menu instead |
| Cap menus at ~8 items with the destructive item last, divided above | Don't ship a 15-item scrolling menu — past ~8 items use a dialog or a searchable pattern |

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
- [ ] Dropdown menus: `elevation-3` surface, 36px items, destructive item last with divider, ≤ ~8 items
- [ ] Menu trigger carries `aria-haspopup`/`aria-expanded`; Esc closes and returns focus; arrows and typeahead work

## Related

- [12-cards-surfaces.md](12-cards-surfaces.md) — surface, radius, and elevation foundations these overlays sit on
- [14-data-display.md](14-data-display.md) — badges and status colors shared with alerts
