# 08 · Motion & animation — Cloud Design System

> Four durations, three easing curves, transform/opacity only — motion that explains hierarchy and always respects reduced-motion preferences.

## Principles

1. **Motion explains, never decorates.** Every animation answers "where did this come from?" or "what just changed?" — if it answers nothing, cut it.
2. **Quick in, quicker out.** Entering elements deserve a beat of attention; exiting elements should get out of the way.
3. **Only transform and opacity.** Compositor-friendly properties keep every animation at 60fps; animating layout properties causes jank.
4. **Small distances, soft curves.** CDS elements drift 2–8px and settle with decelerating easing — nothing flies across the screen.
5. **Reduced motion is a contract.** `prefers-reduced-motion` users get instant or near-instant state changes, always.

## The system

### Duration tokens

| Token | Value | Use |
|---|---|---|
| duration-instant | 100ms | Hover/press feedback |
| duration-fast | 150ms | Fades, color changes |
| duration-base | 250ms | Dropdowns, tooltips, accordions |
| duration-slow | 400ms | Modals, drawers, page-level |

### Easing tokens

| Token | Value | Use |
|---|---|---|
| ease-standard | `cubic-bezier(0.2, 0, 0, 1)` | Default for state changes and enters (strong deceleration — ease-out character) |
| ease-enter | `cubic-bezier(0.2, 0, 0, 1)` | Elements entering: start fast, settle gently |
| ease-exit | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting: accelerate away (ease-in) |

### What to animate — and why

**Animate only `transform` and `opacity`.** Both run on the compositor thread, skipping layout and paint, so they stay smooth even while the main thread is busy.

| Intent | Use | Never |
|---|---|---|
| Move | `transform: translate…` | `top` / `left` / `margin` |
| Resize appearance | `transform: scale(…)` | `width` / `height` |
| Show / hide | `opacity` | `display` toggles mid-animation |
| Depth change | `box-shadow` swap *paired with* a transform | shadow-only "lift" (it reads as flicker) |

### Enter vs exit asymmetry

Enters are slower and decelerating (the user should notice the arrival); exits are faster and accelerating (the user already decided to dismiss).

| Direction | Duration | Easing |
|---|---|---|
| Enter | Full token (e.g., 250ms base, 400ms slow) | ease-enter `cubic-bezier(0.2, 0, 0, 1)` |
| Exit | One step shorter (e.g., 150ms for a 250ms enter, 250ms for a 400ms enter) | ease-exit `cubic-bezier(0.4, 0, 1, 1)` |

### Component motion recipes

| Component | Recipe |
|---|---|
| Dropdown / popover | 250ms (base) scale `0.95 → 1` + fade `0 → 1`, `transform-origin` at the trigger corner; exit 150ms fade + scale to 0.95 |
| Modal / dialog | 400ms (slow) fade `0 → 1` + rise `translateY(8px) → 0`; scrim fades 400ms; exit 250ms fade + fall back 8px |
| Toast | 250ms (base) slide-in from the nearest edge (`translateY(16px) → 0` bottom placement) + fade; exit 150ms fade out |
| Hover lift (cards, raised buttons) | 100ms (instant): elevation-1 → elevation-2 *plus* `translateY(-2px)`; returns on mouse-out at 100ms |
| Accordion / disclosure | 250ms (base) content fade + chevron `rotate(180deg)` |
| Button press | 100ms (instant) `scale(0.98)` on `:active` |

## Tokens

```css
:root {
  /* Durations */
  --cds-duration-instant: 100ms; /* hover/press feedback */
  --cds-duration-fast: 150ms;    /* fades, color changes */
  --cds-duration-base: 250ms;    /* dropdowns, tooltips, accordions */
  --cds-duration-slow: 400ms;    /* modals, drawers, page-level */

  /* Easing */
  --cds-ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --cds-ease-enter: cubic-bezier(0.2, 0, 0, 1);   /* decelerate in */
  --cds-ease-exit: cubic-bezier(0.4, 0, 1, 1);    /* accelerate out */

  /* Recipe distances */
  --cds-motion-rise: 8px;   /* modal rise */
  --cds-motion-lift: -2px;  /* hover lift */
}
```

## Usage

### Dropdown — scale + fade from its origin

```html
<div class="cds-dropdown" data-open="true" role="menu">…</div>
```

```css
.cds-dropdown {
  transform-origin: top left; /* grow from the trigger corner */
  opacity: 0;
  transform: scale(0.95);
  transition: opacity var(--cds-duration-fast) var(--cds-ease-exit),
              transform var(--cds-duration-fast) var(--cds-ease-exit);
}
.cds-dropdown[data-open="true"] {
  opacity: 1;
  transform: scale(1);
  transition: opacity var(--cds-duration-base) var(--cds-ease-enter),
              transform var(--cds-duration-base) var(--cds-ease-enter);
}
```

### Modal — fade + 8px rise

```css
@keyframes cds-modal-in {
  from { opacity: 0; transform: translateY(var(--cds-motion-rise)); }
  to   { opacity: 1; transform: translateY(0); }
}
.cds-modal[open] {
  animation: cds-modal-in var(--cds-duration-slow) var(--cds-ease-enter);
}
.cds-modal.is-closing {
  animation: cds-modal-in var(--cds-duration-base) var(--cds-ease-exit) reverse;
}
```

### Hover lift — elevation change plus translate

```css
.cds-card {
  box-shadow: var(--cds-elevation-1);
  transition: transform var(--cds-duration-instant) var(--cds-ease-standard),
              box-shadow var(--cds-duration-instant) var(--cds-ease-standard);
}
.cds-card:hover {
  box-shadow: var(--cds-elevation-2);
  transform: translateY(var(--cds-motion-lift)); /* -2px */
}
```

### Respecting prefers-reduced-motion

Collapse movement to simple, near-instant fades — don't remove the state change itself.

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

For opt-in components, prefer targeted overrides that keep a gentle fade:

```css
@media (prefers-reduced-motion: reduce) {
  .cds-modal[open] { animation: none; opacity: 1; transform: none; }
  .cds-card:hover { transform: none; } /* keep the shadow change, drop the movement */
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Animate only `transform` and `opacity`; open an accordion by fading content and rotating the chevron. | Don't animate `height`, `width`, `top`, or `margin` — layout animations drop frames on every mid-range device. |
| Use the four duration tokens: 100ms hover, 150ms fades, 250ms dropdowns, 400ms modals. | Don't invent 300ms or 700ms one-offs — off-token timing makes the product feel inconsistent in a way users sense but can't name. |
| Make exits one step faster than enters (250ms dropdown in, 150ms out) with `--cds-ease-exit`. | Don't play a 400ms exit on a dismissed toast — the user already moved on; slow exits feel like lag. |
| Grow dropdowns from their trigger with `transform-origin` at the attached corner. | Don't scale a menu from its center — it appears detached from the button that opened it. |
| Raise modals with a 400ms fade plus an 8px `translateY` rise. | Don't slide modals in from the screen edge or spin them — long travel at page level is disorienting. |
| Pair every hover lift with both an elevation change and `translateY(-2px)` at 100ms. | Don't swap shadows with zero transition — the instant jump reads as flicker, not lift. |
| Ship the `prefers-reduced-motion` override with every animated component. | Don't treat reduced motion as an edge case to "add later" — vestibular-triggering motion is an accessibility failure now. |
| Keep travel distances small: 2px lifts, 8px rises, 16px toast slides. | Don't animate elements across 100+px — big travel demands long durations and steals attention from content. |
| Preserve the end state when motion is reduced (element still appears, just without travel). | Don't hide functionality behind `animation-fill-mode` such that reduced-motion users never see the element land. |
| Use `--cds-ease-standard` for state changes so all motion decelerates the same way. | Don't use `linear` for UI movement — constant velocity feels mechanical and cheap. |

## Checklist

- [ ] Every animated property is `transform` or `opacity` (shadow swaps ride along with a transform).
- [ ] All durations are the four tokens: 100/150/250/400ms.
- [ ] Enters use `--cds-ease-enter`; exits use `--cds-ease-exit` and run one duration step faster.
- [ ] Dropdowns: 250ms scale 0.95→1 + fade, origin at the trigger corner.
- [ ] Modals: 400ms fade + 8px rise; scrim fades in sync.
- [ ] Toasts slide in at 250ms and fade out at 150ms.
- [ ] Hover lift = elevation-1→2 + `translateY(-2px)` at 100ms.
- [ ] `prefers-reduced-motion: reduce` collapses motion but preserves every end state.
- [ ] Nothing animates purely for decoration — each animation explains an appearance, dismissal, or state change.

## Related

- [04-elevation-depth.md](./04-elevation-depth.md) — the elevation levels that hover lift moves between
- [05-shape-radius.md](./05-shape-radius.md) — surfaces whose corners stay stable while they move
- [06-iconography.md](./06-iconography.md) — icon transitions (chevrons, spinners) that use these tokens
