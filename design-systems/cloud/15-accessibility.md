# 15 · Accessibility — Cloud Design System
> WCAG 2.2 AA is the floor, not the ceiling — every CDS surface must be perceivable, operable, and understandable for everyone.

## Principles

1. **AA is the minimum.** Every page ships at WCAG 2.2 AA. Nothing "will be made accessible later."
2. **Semantic HTML first.** Native elements give you focus, keyboard, and screen-reader semantics for free. ARIA is the fallback, not the default.
3. **Every interactive element shows focus.** If you can click it, you can tab to it and see that you're on it.
4. **Never color as the only signal.** Pair every color cue with an icon, text, or shape.
5. **Design for the extremes.** 200% zoom, keyboard only, screen reader, reduced motion — if it works there, it works everywhere.

## The system

### Contrast floors (WCAG 2.2 AA)

| Content | Minimum ratio |
|---|---|
| Body text (< 24px, or < 19px bold) | 4.5:1 |
| Large text (≥ 24px, or ≥ 19px bold) | 3:1 |
| UI components and meaningful graphics | 3:1 |

### Pass/fail — common CDS color pairs

| Pair | Ratio | Verdict |
|---|---|---|
| cloud-900 `#0F172A` on cloud-0 `#FFFFFF` | 17.9:1 | ✅ Pass (all text) |
| cloud-900 on cloud-50 `#F8FAFC` | 17.1:1 | ✅ Pass (all text) |
| cloud-600 `#475569` on cloud-0 | 7.6:1 | ✅ Pass (all text) |
| cloud-600 on cloud-50 | 7.2:1 | ✅ Pass (all text) |
| cloud-500 `#64748B` on cloud-0 | 4.8:1 | ✅ Pass (body text, barely — don't go lighter) |
| sky-600 `#0284C7` on cloud-0 | 4.8:1 | ✅ Pass (text and buttons) |
| cloud-0 on sky-600 | 4.8:1 | ✅ Pass (primary button label) |
| cloud-0 on #DC2626 (danger) | 4.8:1 | ✅ Pass (destructive button label) |
| #15803D success text on #F0FDF4 tint | 4.7:1 | ✅ Pass |
| #B45309 warning text on #FFFBEB tint | 4.8:1 | ✅ Pass |
| cloud-50 on cloud-900 (dark mode) | 17.1:1 | ✅ Pass |
| sky-400 `#38BDF8` on cloud-950 (dark mode) | 9.4:1 | ✅ Pass |
| cloud-400 `#94A3B8` on cloud-0 | 2.6:1 | ❌ Fail — disabled/decorative only |
| sky-400 on cloud-0 | 2.3:1 | ❌ Fail — never light-mode text |
| cloud-0 on sky-500 `#0EA5E9` | 2.8:1 | ❌ Fail — use sky-600 for solid buttons |
| #F59E0B (amber-500) on cloud-0 | 2.2:1 | ❌ Fail — use #B45309 for warning text |

Rule of thumb: on light surfaces, text stops at cloud-500; cloud-400 is reserved for disabled states and large decorative text.

### Focus visibility

Every interactive element gets the CDS focus ring: **2px solid sky-500 `#0EA5E9`, offset 2px**, shown via `:focus-visible`. Never `outline: none` without a replacement. Focused elements must not be hidden behind sticky bars (WCAG 2.4.11) — use `scroll-margin`.

### Keyboard patterns

| Pattern | Rule |
|---|---|
| Tab order | Follows visual order — never positive `tabindex` |
| Esc | Closes modals, drawers, popovers, menus; returns focus to trigger |
| Enter / Space | Activates buttons and links (free with native elements) |
| Arrow keys | Move within menus, tabs, radio groups; Tab exits the group |
| Focus trap | Modals trap focus while open (`<dialog>` does this natively) |
| Skip link | First focusable element skips to `#main` |

### Touch targets

Minimum **44×44px** for all interactive elements (24×24px is the absolute WCAG floor, allowed only with surrounding spacing). CDS md buttons (40px) and inputs (40px) reach 44px with their surrounding `space-1` margin; prefer lg (48px) on touch-first views.

### Semantic HTML first, ARIA second

- Clickable action → `<button>`, never `<div onclick>`. Navigation → `<a href>`.
- Native `<dialog>`, `<details>`, `<select>`, checkboxes and radios before custom widgets.
- ARIA only where HTML can't express state: `aria-current="page"` on active nav links, `aria-expanded` on disclosure triggers, `aria-live="polite"` on toast containers, `aria-label` on icon-only buttons.
- Icons inside labeled controls get `aria-hidden="true"` (they inherit `currentColor`, they don't need names).

### Forms

- Every input has a visible `<label for>` above it — never placeholder-as-label.
- Errors: `aria-invalid="true"` on the field, message linked with `aria-describedby`, #DC2626 border **plus** icon and text (not color alone).
- Help text also linked via `aria-describedby`. Validate on blur, re-validate on input.

### Images and motion

- Meaningful images: descriptive `alt`. Decorative: `alt=""`. Icon-only buttons: `aria-label`.
- Respect `prefers-reduced-motion: reduce` — collapse all CDS durations (100–400ms) to near-zero. Animate only `transform` and `opacity`.

## Tokens

```css
:root {
  /* Focus */
  --cds-focus-ring-color: #0EA5E9;        /* sky-500 */
  --cds-focus-ring-width: 2px;
  --cds-focus-ring-offset: 2px;

  /* Accessible text floors (light mode) */
  --cds-color-text-primary: #0F172A;      /* cloud-900 · 17.9:1 on white */
  --cds-color-text-secondary: #475569;    /* cloud-600 · 7.6:1 on white */
  --cds-color-text-muted: #94A3B8;        /* cloud-400 · disabled/large only */
  --cds-color-text-danger: #B91C1C;       /* 6.5:1 on white */
  --cds-color-text-success: #15803D;
  --cds-color-text-warning: #B45309;

  /* Targets & motion */
  --cds-target-min: 44px;
  --cds-duration-instant: 100ms;
  --cds-duration-fast: 150ms;
}
```

## Usage

Global focus ring and screen-reader-only utility:

```css
:focus-visible {
  outline: var(--cds-focus-ring-width) solid var(--cds-focus-ring-color);
  outline-offset: var(--cds-focus-ring-offset);
  scroll-margin-top: 80px; /* clear sticky headers (WCAG 2.4.11) */
}

.cds-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Accessible form field with error:

```html
<label for="email">Email address</label>
<input id="email" type="email" autocomplete="email"
       aria-invalid="true" aria-describedby="email-error">
<p id="email-error" class="cds-field-error">
  <svg aria-hidden="true"><!-- alert icon --></svg>
  Enter an email address in the format name@example.com
</p>
```

Icon-only button and toast live region:

```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true"><!-- x icon --></svg>
</button>

<div class="cds-toast-region" aria-live="polite" role="status">
  <!-- toasts injected here are announced without stealing focus -->
</div>
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use sky-600 `#0284C7` for primary buttons and interactive text on white (4.8:1) | Don't use sky-400 text on white — it fails contrast at 2.3:1 |
| Stop body text at cloud-500 (4.8:1 on white) | Don't set body copy in cloud-400 — 2.6:1 fails even large-text AA |
| Style focus with `:focus-visible` and the 2px sky-500 ring at 2px offset | Don't write `outline: none` anywhere without an equal-or-better replacement |
| Use `<button>` for actions and `<a href>` for navigation | Don't build clickable `<div>`s — they're invisible to keyboards and screen readers |
| Put a visible `<label for>` above every input, always | Don't use placeholder text as the label — it vanishes on input and fails AA |
| Pair every error with an icon and a message linked by `aria-describedby` | Don't signal errors with a red border alone — color is never the only signal |
| Give icon-only buttons `aria-label` and mark the SVG `aria-hidden="true"` | Don't ship an unnamed icon button — screen readers announce "button" and nothing else |
| Close every overlay on Esc and return focus to the trigger | Don't leave focus stranded behind a closed modal |
| Keep touch targets at ≥44×44px (lg 48px buttons on touch-first views) | Don't shrink tap targets below 24px even with `sm` controls packed tightly |
| Announce toasts through an existing `aria-live="polite"` region | Don't move focus to a toast or use `aria-live="assertive"` for routine confirmations |
| Let Tab order follow the visual order of the page | Don't use positive `tabindex` values to "fix" order — restructure the DOM instead |
| Collapse all animation under `prefers-reduced-motion: reduce` | Don't keep 400ms modal slides running for users who asked for reduced motion |

## Checklist

- [ ] All text/background pairs meet 4.5:1 (3:1 for ≥24px or 19px bold); UI components meet 3:1
- [ ] Every interactive element shows the 2px sky-500 focus ring at 2px offset
- [ ] Full page is operable by keyboard alone: Tab in visual order, Esc closes overlays, arrows in menus/tabs
- [ ] Touch targets ≥44×44px (or ≥24px with clear spacing)
- [ ] Native HTML elements used; ARIA only fills real gaps (`aria-current`, `aria-expanded`, `aria-live`)
- [ ] Every input has a visible label; errors use `aria-invalid` + `aria-describedby` + icon + text
- [ ] All meaningful images have alt text; decorative images have `alt=""`
- [ ] `prefers-reduced-motion` collapses all transitions
- [ ] No information conveyed by color alone
- [ ] Tested at 200% zoom and with a screen reader (VoiceOver/NVDA)

## Related

- [16 · Responsive](./16-responsive.md) — touch targets and mobile layout
- [17 · Content, voice and tone](./17-content-voice-tone.md) — error message wording
- [18 · Design tokens](./18-design-tokens.md) — semantic color tokens
- [19 · Theming and dark mode](./19-theming-dark-mode.md) — dark-mode contrast pairs
