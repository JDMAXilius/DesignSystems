# 15 · Accessibility — Maxilius Design System

> WCAG 2.2 AA is the floor, not the goal: every Maxilius surface must be perceivable, operable, and understandable for everyone, on every input device.

## Principles

1. **AA is the minimum.** Text contrast ≥ 4.5:1 (≥ 3:1 for text ≥ 24px, or 19px bold). UI components and graphics ≥ 3:1. No exceptions for brand colors.
2. **Semantic HTML first.** A `<button>` gives you focus, Enter/Space activation, and semantics for free. Reach for ARIA only where HTML has no native element.
3. **Focus is always visible.** Every interactive element shows the 2px `--mx-focus-ring` outline (or the 3px subtle ring on text fields). Never `outline: none` without a replacement.
4. **Color never carries meaning alone.** Warm color signals (amber warning, vermillion danger) are always paired with an icon and text — exactly how Toast and the feedback tokens work.
5. **Motion is optional.** Every animation respects `prefers-reduced-motion`.

## The system

### Contrast: pass/fail table for common Maxilius pairs

Ratios computed from the real hex values. AA normal text needs 4.5:1; large text (≥ 24px, or 19px bold) and UI components need 3:1.

| Foreground on background | Ratio | Normal text | Large text / UI | Verdict |
|---|---|---|---|---|
| gray-900 `#0F172A` on white | 17.85:1 | ✅ | ✅ | Body text — excellent |
| gray-900 on gray-50 `#F8FAFC` (canvas) | 17.06:1 | ✅ | ✅ | Body text on canvas |
| gray-600 `#475569` on white | 7.58:1 | ✅ | ✅ | `text-secondary` — safe everywhere |
| gray-500 `#64748B` on white | 4.76:1 | ✅ | ✅ | Passes AA, but with little margin — don't go lighter for body text |
| gray-400 `#94A3B8` on white | 2.56:1 | ❌ | ❌ | `text-muted` — placeholders and decorative only, never for information users must read |
| blue-600 `#2563EB` on white | 5.17:1 | ✅ | ✅ | Links and primary button fills |
| White on blue-600 | 5.17:1 | ✅ | ✅ | Primary button label |
| White on teal-600 `#0D9488` | 3.74:1 | ❌ | ✅ | Secondary button label passes as large text/UI only; 14px labels sit below 4.5:1 — keep secondary buttons ≥ md with medium weight, or accept the 3:1 large-text bar for lg (16px+) |
| White on red-600 `#DC2626` | 4.83:1 | ✅ | ✅ | Danger button label |
| White on amber-500 `#F59E0B` | 2.15:1 | ❌ | ❌ | **Never** white on amber — this is why accent buttons use dark text |
| gray-900 on amber-500 | 8.31:1 | ✅ | ✅ | Accent button label — the built-in pairing |
| amber-600 `#D97706` on white | 3.19:1 | ❌ | ✅ | `text-warning` — large text or icon only; pair with an icon, or use amber-700 on amber-50 (4.84:1) in feedback banners |
| green-600 `#16A34A` on white | 3.30:1 | ❌ | ✅ | `text-success` — same rule as warning |
| red-600 on white | 4.83:1 | ✅ | ✅ | `text-danger` and error messages |
| blue-700 on blue-50 (`action-primary-subtle`) | 6.16:1 | ✅ | ✅ | Subtle/tint button pairing |
| blue-500 `#3B82F6` vs white | 3.68:1 | — | ✅ | Focus ring meets the 3:1 non-text minimum |
| gray-50 on gray-900 (dark surface) | 17.06:1 | ✅ | ✅ | Dark-mode body text |
| gray-300 on gray-900 | 12.02:1 | ✅ | ✅ | Dark-mode `text-secondary` |
| blue-400 `#60A5FA` on gray-900 | 7.02:1 | ✅ | ✅ | Dark-mode links |
| blue-400 vs gray-950 | 7.93:1 | — | ✅ | Dark-mode focus ring |

### Focus-visible ring recipe

The system standard: 2px outline in `--mx-focus-ring` (blue-500 light / blue-400 dark), offset 2px, on `:focus-visible` only. Text fields use a 3px subtle ring instead (see Forms below).

### Keyboard patterns

| Component | Keys |
|---|---|
| Button, link | Tab to focus; Enter (and Space for buttons) activates |
| Checkbox, Toggle | Space toggles |
| Radio group | Tab enters the group; Arrow keys move selection |
| Tabs | Tab to the tablist; Arrow keys switch tabs; panel content follows in tab order |
| Select | Native `<select>` keyboard model (Arrow, type-ahead) |
| Accordion | Enter/Space toggles the focused header |
| Modal/overlay | Focus trapped inside; Esc closes; focus returns to the trigger |
| Toast | Never steals focus — announced via `aria-live="polite"` |

No keyboard traps: users must be able to Tab into and out of every component. Provide a skip link as the first focusable element on every page.

### Touch targets

Interactive targets should be ≥ 44×44px; the WCAG 2.2 AA hard floor is 24×24px with spacing **(target-size floor defined by docs, not yet in code)**. Maxilius md controls are 40px and lg are 48px — use md as the default and add padding or spacing so the effective hit area reaches 44px on touch layouts. Keep sm (32px) controls out of primary touch flows.

### Semantic HTML first, ARIA second

- Landmarks: `<header>`, `<nav aria-label="Main">`, `<main>`, `<footer>`. One `<h1>` per page, no skipped heading levels.
- Use `<button>` for actions, `<a href>` for navigation — never a `div` with a click handler.
- ARIA only where HTML can't express the pattern: `role="tablist"` for Tabs, `aria-expanded` on Accordion headers, `aria-current="page"` on the active Breadcrumb.
- Built into `@maxilius/react` already: `aria-busy` on loading Buttons, `aria-invalid` on invalid fields, `role="status"`/`aria-live="polite"` on Toast, labeled Breadcrumb and Tabs landmarks, `color-scheme` set per theme.

### Forms

- Label always visible above the field (Label component) — never placeholder-as-label. Placeholders use `text-muted` and are hints only.
- Invalid state (Input/Select/Textarea): `feedback-danger-icon` border, 3px `feedback-danger-bg` focus ring, and `aria-invalid="true"` — plus an error message with icon below the field, linked via `aria-describedby`.
- Validate on blur, re-validate on input **(validation timing defined by docs, not yet in code)**.
- Required fields: Label's `required` warm asterisk plus the `required` attribute.

### Alt text

- Informative images: describe the information, not the pixels (`alt="Bar chart: signups up 40% in Q3"`).
- Decorative images: `alt=""` so screen readers skip them.
- Icon-only buttons: `aria-label` on the button, `aria-hidden="true"` on the Icon (icons render in `currentColor` and carry no text of their own).

## Tokens

```css
:root {
  --mx-focus-ring: #3B82F6;            /* blue-500 (light) */
  --mx-border-focus: #3B82F6;
  --mx-border-width-thick: 2px;        /* focus outline width */
  --mx-feedback-danger-icon: #DC2626;  /* invalid border */
  --mx-feedback-danger-bg: #FEF2F2;    /* invalid focus ring */
  --mx-text-danger: #DC2626;
  --mx-size-control-md: 2.5rem;        /* 40px */
  --mx-size-control-lg: 3rem;          /* 48px */
}
[data-theme='dark'] {
  --mx-focus-ring: #60A5FA;            /* blue-400 */
  --mx-border-focus: #60A5FA;
}
```

## Usage

Focus ring and sr-only utility:

```css
:focus-visible {
  outline: var(--mx-border-width-thick) solid var(--mx-focus-ring);
  outline-offset: 2px;
}
input:focus-visible, select:focus-visible, textarea:focus-visible {
  outline: none;
  border-color: var(--mx-border-focus);
  box-shadow: 0 0 0 3px var(--mx-action-primary-subtle-bg);
}
.mx-sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Accessible invalid field:

```html
<label for="email" class="mx-label">Email <span aria-hidden="true">*</span></label>
<input id="email" type="email" class="mx-input" required
       aria-invalid="true" aria-describedby="email-error" />
<p id="email-error" class="mx-field-error">
  <svg aria-hidden="true"><!-- alert-circle icon --></svg>
  Enter a valid email address, like name@example.com.
</p>
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use gray-900 `#0F172A` on white for body text (17.85:1) | Don't use gray-400 `#94A3B8` for body text — 2.56:1 fails even the large-text bar |
| Put dark gray-900 text on amber-500 accent buttons (8.31:1) | Don't put white text on amber-500 — 2.15:1 is an outright failure |
| Reserve `text-muted` (gray-400) for placeholders and decorative text | Don't use `text-muted` for error messages, prices, or anything users must read |
| Pair `text-warning` (amber-600, 3.19:1) with an icon, or use amber-700 on amber-50 banners | Don't set 14px amber-600 body copy on white and call it a warning |
| Show the 2px `--mx-focus-ring` outline at 2px offset on every `:focus-visible` | Don't write `*:focus { outline: none }` without a visible replacement |
| Use a `<button>` for actions and `<a href>` for navigation | Don't wire `onclick` to a `div` — it's unfocusable and keyboard-dead |
| Keep touch targets at md (40px) or lg (48px) with spacing to reach 44px effective size | Don't pack sm (32px) icon buttons edge-to-edge in a mobile toolbar |
| Announce toasts with `aria-live="polite"` and leave focus where it is | Don't move focus to a toast — it yanks screen-reader users out of their task |
| Mark invalid fields with `aria-invalid` plus an icon and a text message | Don't signal an error with a red border alone — color-only signals exclude users |
| Give icon-only buttons an `aria-label` and hide the SVG with `aria-hidden="true"` | Don't ship a bare `<button><svg/></button>` with no accessible name |
| Keep a visible label above every field via the Label component | Don't use the placeholder as the label — it vanishes on input |
| Wrap all animation in a `prefers-reduced-motion` guard | Don't autoplay the 320ms overlay slide for users who asked for reduced motion |

## Checklist

- [ ] Every text/background pair meets 4.5:1 (or 3:1 for ≥ 24px / 19px bold text) — verified with a contrast checker, not by eye
- [ ] Every interactive element shows a visible focus ring on `:focus-visible`
- [ ] The whole flow works with keyboard only — no traps, logical order, skip link present
- [ ] Touch targets ≥ 44px effective size; nothing critical smaller than 24px
- [ ] Landmarks, one `<h1>`, no skipped heading levels; `<html lang>` set
- [ ] Forms: visible labels, `aria-invalid` + icon + message on errors, `aria-describedby` wired
- [ ] Images have meaningful alt text or `alt=""`; icon buttons have accessible names
- [ ] No information conveyed by color alone
- [ ] `prefers-reduced-motion` respected; page usable at 200% zoom
- [ ] Tested with a screen reader (VoiceOver or NVDA) on at least the critical path

## Related

- [00 · Design principles](./00-design-principles.md)
- [16 · Responsive](./16-responsive.md)
- [17 · Content, voice, and tone](./17-content-voice-tone.md)
- [18 · Design tokens](./18-design-tokens.md)
