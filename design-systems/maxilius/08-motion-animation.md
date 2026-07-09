# 08 · Motion & animation — Maxilius Design System

> Three durations (120/200/320ms), three easings, transform-and-opacity only — motion confirms actions quietly and never blocks the next one.

## Principles

1. **Motion is feedback, not decoration.** Every animation answers a user action or explains a state change; anything else is noise in the cool framework.
2. **Fast enough to feel instant.** Hover feedback lands in 120ms; nothing in the UI animates longer than 320ms. Users came to act, not to watch.
3. **Enter and exit are asymmetric.** Entering elements decelerate into place (ease-out feel); exiting elements accelerate away (ease-in feel) — and exits run on the faster duration, because leaving should never keep anyone waiting.
4. **Animate only transform and opacity.** These composite on the GPU. Layout properties (width, height, top, margin) cause jank and are off-limits.
5. **Reduced motion is a first-class theme.** `prefers-reduced-motion` users get instant state changes with the same end result.

## The system

### Durations

| Token | Value | Used for |
|---|---|---|
| `--mx-motion-duration-fast` | 120ms | Hover/press color changes (Button, Input borders), small state flips |
| `--mx-motion-duration-base` | 200ms | Card lift, standard transitions, dropdown open, toast exit |
| `--mx-motion-duration-slow` | 320ms | Overlays, modals, page-level movement, toast enter |

### Easings

| Token | Value | Used for |
|---|---|---|
| `--mx-motion-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default for all property transitions (hover, lift, color) |
| `--mx-motion-easing-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the screen (decelerate in) |
| `--mx-motion-easing-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting (accelerate out) |

### Enter/exit asymmetry

| Direction | Easing | Duration | Feel |
|---|---|---|---|
| Enter | `--mx-motion-easing-enter` | slow or base (320/200ms) | Arrives briskly, settles gently |
| Exit | `--mx-motion-easing-exit` | base or fast (200/120ms) | Gets out of the way immediately |

### Motion recipes (tied to real components)

| Component | Trigger | Recipe |
|---|---|---|
| Button (all variants) | hover/active | Background color steps to `bg-hover`/`bg-active` over **fast + standard**; no movement |
| Button `loading` | loading | Spinner rotates **0.7s linear infinite**; label hidden, width preserved, `aria-busy` |
| Card `interactive` | hover | `translateY(-2px)` + shadow `sm → md` over **base + standard** |
| Select / dropdown menus | open | Fade in + `translateY(4px → 0)` over **base + enter**; close over **fast + exit** |
| Toast | enter | Slide in from edge (`translateY(8px)` or `translateX`) + fade over **slow + enter** |
| Toast | exit (dismiss / 5000ms timeout) | Fade + slight slide out over **base + exit** |
| Modal + scrim | open | Scrim fades in, dialog fades + `scale(0.98 → 1)` over **slow + enter** |
| Modal + scrim | close | Both fade out over **base + exit** |
| Accordion | expand/collapse | Chevron rotates 180° over **base + standard**; content fades over **fast** |
| Input / Select / Textarea | focus/hover | Border and ring colors over **fast + standard** |

Reserve warm-colored movement for warm moments: the accent CTA and danger confirmations may use the hover transition like any button, but never add attention-grabbing looping animation to cool, routine UI.

## Tokens

```css
:root {
  /* Durations */
  --mx-motion-duration-fast: 120ms;   /* hover/press color changes */
  --mx-motion-duration-base: 200ms;   /* card lift, standard transitions */
  --mx-motion-duration-slow: 320ms;   /* overlays, page-level movement */

  /* Easings */
  --mx-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
  --mx-motion-easing-enter: cubic-bezier(0, 0, 0.2, 1);
  --mx-motion-easing-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

## Usage

### Button hover and card lift

```html
<button class="mx-btn mx-btn--primary">Save changes</button>

<article class="mx-card mx-card--interactive" tabindex="0">
  <h3>API keys</h3>
</article>
```

```css
.mx-btn {
  background: var(--mx-action-primary-bg);
  transition: background-color var(--mx-motion-duration-fast) var(--mx-motion-easing-standard);
}
.mx-btn:hover { background: var(--mx-action-primary-bg-hover); }
.mx-btn:active { background: var(--mx-action-primary-bg-active); }

.mx-card--interactive {
  transition:
    transform var(--mx-motion-duration-base) var(--mx-motion-easing-standard),
    box-shadow var(--mx-motion-duration-base) var(--mx-motion-easing-standard);
}
.mx-card--interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--mx-shadow-md);
}
```

### Toast enter/exit with asymmetric easing

```html
<div class="mx-toast mx-toast--success is-entering" role="status" aria-live="polite">
  <svg class="mx-icon mx-icon--md" aria-hidden="true"><!-- check-circle --></svg>
  <p>Changes saved</p>
  <button class="mx-toast__dismiss" aria-label="Dismiss">×</button>
</div>
```

```css
.mx-toast {
  z-index: var(--mx-z-toast);
  box-shadow: var(--mx-shadow-xl);
  border-radius: var(--mx-radius-xl);
}

@keyframes mx-toast-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes mx-toast-out {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(4px); }
}

.mx-toast.is-entering {
  animation: mx-toast-in var(--mx-motion-duration-slow) var(--mx-motion-easing-enter) both;
}
.mx-toast.is-exiting {
  animation: mx-toast-out var(--mx-motion-duration-base) var(--mx-motion-easing-exit) both;
}
```

### Respecting reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

State changes still happen — the toast appears, the card shadow changes — they just land instantly. Keep the button loading spinner's *meaning* by ensuring `aria-busy` and the disabled interaction never depend on the animation playing.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use `--mx-motion-duration-fast` (120ms) with standard easing for button hover color. | Don't animate button hover over 300ms+ — the control feels laggy and unresponsive. |
| Lift interactive cards with `transform: translateY(-2px)` over 200ms. | Don't lift by animating `margin-top` or `top` — layout properties trigger reflow and jank. |
| Enter toasts with `--mx-motion-easing-enter` at 320ms, exit with `--mx-motion-easing-exit` at 200ms. | Don't use one symmetric ease-in-out for both directions — exits must feel faster than entries. |
| Animate dropdown menus with opacity + a 4px translate, nothing else. | Don't animate `height: 0 → auto` on menus — it can't composite and stutters on low-end devices. |
| Keep the Button loading spinner at 0.7s linear infinite rotation. | Don't add eased or bouncing rotation to spinners — linear reads as steady progress. |
| Ship the `prefers-reduced-motion` block in global CSS so every component inherits it. | Don't hide state changes behind animation — reduced-motion users must reach the same end state instantly. |
| Let the modal scrim and dialog animate together (slow + enter in, base + exit out). | Don't leave the scrim frozen while the dialog animates — mismatched layers look broken. |
| Reserve continuous animation for genuine progress (spinner) only. | Don't add looping pulses or shimmers to the accent CTA — warm color already draws the eye; motion on top is shouting. |
| Cap every UI transition at 320ms (`--mx-motion-duration-slow`). | Don't choreograph 600ms+ multi-stage sequences for routine UI — users act faster than that. |

## Checklist

- [ ] Every duration is one of 120/200/320ms via `--mx-motion-duration-*`.
- [ ] Every easing is one of the three `--mx-motion-easing-*` cubic-beziers.
- [ ] Only `transform` and `opacity` are animated (plus color transitions on controls).
- [ ] Enters use the enter easing; exits use the exit easing at an equal or shorter duration.
- [ ] Component recipes match the table (button fast, card base, toast slow-in/base-out).
- [ ] The global `prefers-reduced-motion` block is present and end states survive without animation.
- [ ] No looping animation exists except the 0.7s linear button spinner.
- [ ] Nothing animates longer than 320ms.

## Related

- [04 · Elevation & depth](./04-elevation-depth.md) — the shadow levels hover lifts move between
- [09 · Buttons](./09-buttons.md) — hover/active/loading states and the spinner
- [13 · Feedback](./13-feedback.md) — Toast timing, variants, and aria-live behavior
- [15 · Accessibility](./15-accessibility.md) — reduced motion and non-visual state signals
- [19 · Theming & dark mode](./19-theming-dark-mode.md) — motion tokens are theme-invariant
