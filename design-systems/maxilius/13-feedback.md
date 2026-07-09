# 13 · Feedback — Maxilius Design System

> Toasts, alerts, modals, and loading states tell users what just happened — cool tones for information, warm tones only when something demands attention.

## Principles

1. **Match urgency to temperature.** Info and success stay cool (blue, green); warning and danger use the warm ramps (amber, vermillion) because warmth demands attention.
2. **Never color alone.** Every feedback surface pairs its color with an icon and text — the four `feedback-*` token groups ship bg + border + text + icon roles as a set.
3. **Interrupt proportionally.** Toast < alert < modal. Use the least interruptive channel that still gets the message across.
4. **Feedback is announced, not just painted.** Toasts render with `role="status"` and `aria-live="polite"`; modals trap focus and restore it on close.
5. **Loading states preserve layout.** Spinners replace content at the same size; skeletons mirror the real content's shape so nothing jumps on arrival.

## The system

### Toast (`ToastProvider` + `useToast`, as implemented)

- **Variants (4):** `info` (default, icon `info`), `success` (`check-circle`), `warning` (`alert-triangle`), `danger` (`alert-circle`). Icons are size sm (16px) and take the variant's `--mx-feedback-*-icon` color; the container itself stays neutral (`--mx-bg-surface-raised`, 1px `--mx-border-default`, `--mx-radius-lg`, `--mx-shadow-lg`).
- **Placement:** fixed viewport, bottom-right — space-6 (24px) from bottom and right, `z-index: var(--mx-z-toast)` (1500), `role="region"` labeled "Notifications".
- **Stacking:** column, newest appended at the bottom, space-3 (12px) gap; max-width 24rem, width `calc(100vw - space-12)` on small screens.
- **Timing:** `duration` defaults to 5000ms, then auto-dismisses; `duration: 0` keeps the toast until the user dismisses it. Every toast has an ✕ dismiss button (`aria-label="Dismiss notification"`).
- **Entry:** fades in and slides up 8px over `--mx-motion-duration-base` (200ms) with `--mx-motion-easing-enter`.
- **Content:** title (sm, semibold, `text-primary`) + optional description (sm, `text-secondary`).

### Alerts / banners (docs-defined — no Alert component in code yet)

Inline, non-dismissing status blocks built directly on the feedback tokens:

| Variant | bg | border | text | icon (light) |
|---|---|---|---|---|
| info | `--mx-feedback-info-bg` (blue-50) | blue-200 | blue-700 | blue-600 |
| success | `--mx-feedback-success-bg` (green-50) | green-200 | green-700 | green-600 |
| warning | `--mx-feedback-warning-bg` (amber-50) | amber-200 | amber-700 | amber-600 |
| danger | `--mx-feedback-danger-bg` (red-50) | red-200 | red-700 | red-600 |

Recipe: space-4 padding, 1px variant border, `--mx-radius-md`, sm text, sm icon aligned to the first line. Dark mode inverts automatically (950 bg / 800 border / 300 text / 400 icon). Page-width banners keep the same tokens with `--mx-radius-none`.

### Modals / dialogs (docs-defined — no Modal component in code yet)

- **Scrim:** `--mx-bg-overlay` (rgb(2 6 23 / 0.55) light, / 0.7 dark) at `--mx-z-overlay` (1300); dialog at `--mx-z-modal` (1400).
- **Panel:** `--mx-bg-surface`, `--mx-radius-xl` (16px), `--mx-shadow-xl`, max-width 32rem, space-6 padding; enter over `--mx-motion-duration-slow` (320ms) with enter easing.
- **Behavior:** trap focus inside the dialog; Esc closes; clicking the scrim closes non-destructive dialogs; return focus to the trigger on close. Use `role="dialog"` + `aria-modal="true"` + `aria-labelledby`.
- **Destructive confirmations:** danger button (vermillion) on the right, neutral "Cancel" beside it; initial focus on Cancel.

### Loading

- **Spinner (as implemented on Button):** a 1em circle, 2px `currentColor` border with transparent bottom, rotating at 0.7s linear infinite. `loading` buttons hide the label but preserve width, set `aria-busy`, and block interaction. Reuse the same recipe standalone at `--mx-size-icon-md` (20px).
- **Skeleton (docs-defined):** blocks of `--mx-bg-surface-sunken` with `--mx-radius-sm` (text lines) or the target's radius (avatars, cards), pulsing opacity 1→0.6 at ~1.2s. Match the real layout's dimensions. Honor `prefers-reduced-motion`: stop the pulse and rotation, keep the shapes.

### Empty states (docs-defined)

Center in the content area: an lg icon (24px, `--mx-text-muted`), a one-line title (`--mx-font-size-md`, semibold), one sentence of guidance (sm, `text-secondary`), and at most one primary action. No warm colors — an empty state is calm, not alarming.

### Dropdown / action menus (docs-defined)

Popover surface: `--mx-bg-surface-raised`, 1px `--mx-border-default`, `--mx-radius-md`, `--mx-shadow-lg`, `z-index: var(--mx-z-dropdown)` (1000), space-2 offset from the trigger. Items are 40px rows (`--mx-size-control-md`), sm text, hover `--mx-bg-surface-sunken`; destructive items use `--mx-text-danger` + `alert-circle`-family icon, separated by a Divider. Full z-order: dropdown 1000 · sticky 1100 · overlay 1300 · modal 1400 · toast 1500 · tooltip 1600.

## Tokens

```css
:root {
  /* feedback roles (light) — bg / border / text / icon per variant */
  --mx-feedback-info-bg: #EFF6FF;    --mx-feedback-info-border: #BFDBFE;
  --mx-feedback-info-text: #1D4ED8;  --mx-feedback-info-icon: #2563EB;
  --mx-feedback-success-bg: #F0FDF4; --mx-feedback-success-border: #BBF7D0;
  --mx-feedback-success-text: #15803D; --mx-feedback-success-icon: #16A34A;
  --mx-feedback-warning-bg: #FFFBEB; --mx-feedback-warning-border: #FDE68A;
  --mx-feedback-warning-text: #B45309; --mx-feedback-warning-icon: #D97706;
  --mx-feedback-danger-bg: #FEF2F2;  --mx-feedback-danger-border: #FECACA;
  --mx-feedback-danger-text: #B91C1C; --mx-feedback-danger-icon: #DC2626;
  /* overlay + elevation */
  --mx-bg-overlay: rgb(2 6 23 / 0.55);
  --mx-bg-surface-raised: #FFFFFF;
  --mx-shadow-lg: 0 4px 8px -2px rgb(2 6 23 / 0.1), 0 12px 24px -4px rgb(2 6 23 / 0.08);
  --mx-shadow-xl: 0 8px 16px -4px rgb(2 6 23 / 0.12), 0 24px 48px -8px rgb(2 6 23 / 0.14);
  /* z-index scale */
  --mx-z-dropdown: 1000; --mx-z-sticky: 1100; --mx-z-overlay: 1300;
  --mx-z-modal: 1400; --mx-z-toast: 1500; --mx-z-tooltip: 1600;
  /* motion */
  --mx-motion-duration-base: 200ms; --mx-motion-duration-slow: 320ms;
  --mx-motion-easing-enter: cubic-bezier(0, 0, 0.2, 1);
  --mx-motion-easing-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

## Usage

React — fire a toast from anywhere under the provider:

```html
<ToastProvider>
  <App />
</ToastProvider>
```

```html
const { toast } = useToast();
toast({ title: 'Changes saved', variant: 'success' });
toast({
  title: 'Export failed',
  description: 'The report was too large. Try a shorter date range.',
  variant: 'danger',
  duration: 0, // sticky — errors wait for the user
});
```

CSS — an inline warning alert from the feedback tokens:

```css
.mx-alert--warning {
  display: flex; gap: var(--mx-space-3); padding: var(--mx-space-4);
  background: var(--mx-feedback-warning-bg);
  border: var(--mx-border-width-thin) solid var(--mx-feedback-warning-border);
  border-radius: var(--mx-radius-md);
  color: var(--mx-feedback-warning-text);
  font-size: var(--mx-font-size-sm);
}
.mx-alert--warning .mx-alert__icon { color: var(--mx-feedback-warning-icon); }
```

```html
<div class="mx-alert--warning" role="alert">
  <svg class="mx-alert__icon" aria-hidden="true"><!-- alert-triangle, 16px --></svg>
  <p>Your trial ends in 3 days. Add a payment method to keep your projects.</p>
</div>
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use a toast for transient outcomes ("Changes saved") and let it auto-dismiss at 5000ms | Don't put errors the user must act on in an auto-dismissing toast — use `duration: 0` or an inline alert |
| Pair every feedback color with its icon: info/check-circle/alert-triangle/alert-circle | Don't signal status with a colored border alone — color-blind users get nothing |
| Keep toasts bottom-right at z-1500 with the built-in viewport | Don't render your own floating toast divs — stacking, width, and announcements come from the provider |
| Use `role="alert"` for danger/warning alerts and `role="status"` for info/success | Don't wrap a whole page section in `aria-live` — announce only the message itself |
| Dim modals with `--mx-bg-overlay` and put the panel at `--mx-z-modal` (1400) | Don't hand-pick z-index values like 9999 — the six-step scale already orders dropdown → tooltip |
| Trap focus in dialogs, close on Esc, and return focus to the trigger | Don't leave focus on `<body>` after closing — keyboard users lose their place |
| Preserve button width while loading (spinner replaces the hidden label, `aria-busy`) | Don't collapse a loading button to spinner-width — the layout jolts twice |
| Mirror real content shapes in skeletons and stop the pulse under `prefers-reduced-motion` | Don't show a lone centered spinner for a whole page when the layout is known |
| Reserve warm variants (amber warning, vermillion danger) for genuine risk | Don't use the danger variant for validation nits — warmth loses its power when overused |
| Keep dropdowns at `--mx-z-dropdown` (1000) so open menus sit under modals and toasts | Don't open a dropdown above a modal scrim — it reads as detached from its trigger |

## Checklist

- [ ] Transient feedback uses `useToast`; blocking or persistent feedback uses an alert or modal
- [ ] Every feedback surface has icon + text, not color alone
- [ ] Error toasts are sticky (`duration: 0`); success/info auto-dismiss at the 5000ms default
- [ ] Alerts use the matched bg/border/text/icon token quartet for their variant
- [ ] Modal: scrim `--mx-bg-overlay`, Esc closes, focus trapped and restored, `aria-modal` set
- [ ] Layered UI follows the z-scale: dropdown 1000 < overlay 1300 < modal 1400 < toast 1500 < tooltip 1600
- [ ] Spinners and skeleton pulses pause under `prefers-reduced-motion`
- [ ] Empty states offer one clear next action and stay cool-toned
- [ ] Verified in dark mode: feedback pairs flip to 950 bg / 300 text and still pass contrast

## Related

- [12-cards-surfaces.md](./12-cards-surfaces.md) — the surfaces feedback floats above
- [14-data-display.md](./14-data-display.md) — badges for persistent status (vs. transient feedback)
- [09-buttons.md](./09-buttons.md) — loading buttons and danger confirmations
- [01-color.md](./01-color.md) — the warm/cool temperature system behind the variants
