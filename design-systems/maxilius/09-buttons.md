# 09 · Buttons — Maxilius Design System

> Buttons carry every action in the interface: cool variants (primary, secondary, neutral, ghost) for routine work, warm variants (accent, danger) for the few moments that must demand attention.

## Principles

1. **Cool framework, warm action.** Blue and teal buttons carry standard actions and recede into the cool framework; amber and vermillion are reserved for attention. At most one warm (accent) button per view.
2. **One primary per view.** A single `primary` button anchors each screen or dialog. Everything else steps down to secondary, neutral, or ghost.
3. **State is a token step, never an invention.** Hover and active move along the published `action-*` ramp (`bg` → `bg-hover` → `bg-active`); in dark mode the same tokens lighten instead of darken — components never change.
4. **Buttons keep their size.** Loading replaces the label with a spinner but preserves width and height; no layout shift, ever.
5. **Verbs, sentence case.** "Save changes", not "OK" or "SAVE CHANGES".

## The system

Six variants × three sizes, implemented in `@maxilius/react` as `<Button>` (`.mx-btn` in CSS).

### Variants × states (light mode, exact values)

| Variant | Default bg | Hover bg | Active bg | Text | Border |
|---|---|---|---|---|---|
| primary | blue-600 `#2563EB` | blue-700 `#1D4ED8` | blue-800 `#1E40AF` | white | transparent |
| secondary | teal-600 `#0D9488` | teal-700 `#0F766E` | teal-800 `#115E59` | white | transparent |
| accent (warm) | amber-500 `#F59E0B` | amber-600 `#D97706` | amber-700 `#B45309` | gray-900 `#0F172A` | transparent |
| danger (warm) | red-600 `#DC2626` | red-700 `#B91C1C` | red-800 `#991B1B` | white | transparent |
| neutral | white `#FFFFFF` | gray-50 `#F8FAFC` | gray-100 `#F1F5F9` | gray-900 `#0F172A` | gray-300 `#CBD5E1` |
| ghost | transparent | gray-50 `#F8FAFC` | gray-100 `#F1F5F9` | text-primary `#0F172A` | transparent |

Dark mode is a token swap: solid backgrounds stay at the same step (blue-600 etc.) but hover/active move **up** the lightness ramp (primary hover blue-500 `#3B82F6`, active blue-400 `#60A5FA`); accent text becomes gray-950; neutral becomes gray-800/700/600.

Shared states for every variant:

| State | Treatment |
|---|---|
| focus-visible | 2px `--mx-focus-ring` outline (blue-500 `#3B82F6` light / blue-400 `#60A5FA` dark) at 2px offset |
| disabled | bg gray-100 `#F1F5F9`, text gray-400 `#94A3B8`, border transparent, `cursor: not-allowed` (ghost keeps transparent bg) |
| loading | label hidden (width preserved), 1em spinner in `currentColor`, 0.7s linear rotation, `aria-busy="true"`, interaction disabled |

Transitions: background, border, and color animate at `--mx-motion-duration-fast` (120ms) with `--mx-motion-easing-standard`.

### Sizes

| Size | Height | Padding-x | Font size | Icon size |
|---|---|---|---|---|
| sm | 32px (`size-control-sm`) | 12px (`space-3`) | 14px (`font-size-sm`) | 16px (sm) |
| md (default) | 40px (`size-control-md`) | 16px (`space-4`) | 14px (`font-size-sm`) | 16px (sm) |
| lg | 48px (`size-control-lg`) | 24px (`space-6`) | 16px (`font-size-md`) | 20px (md) |

All sizes: weight medium (500), line-height tight (1.25), radius `radius-md` (8px), Inter.

### Icons in buttons (as implemented)

- `iconStart` / `iconEnd` accept a built-in icon name; the gap between icon and label is `space-2` (8px).
- Icon size is chosen for you: 16px (sm) inside sm and md buttons, 20px (md) inside lg buttons. Icons render in `currentColor`, so they always match the label.
- Icon-only buttons must carry an `aria-label` — the visual affordance is not a name.
- `fullWidth` stretches to the container; the content stays centered.

## Tokens

```css
/* Consumed by .mx-btn — light values shown; dark mode swaps automatically */
--mx-action-primary-bg: #2563EB;        --mx-action-primary-bg-hover: #1D4ED8;
--mx-action-primary-bg-active: #1E40AF; --mx-action-primary-text: #FFFFFF;
--mx-action-secondary-bg: #0D9488;      --mx-action-secondary-bg-hover: #0F766E;
--mx-action-secondary-bg-active: #115E59; --mx-action-secondary-text: #FFFFFF;
--mx-action-accent-bg: #F59E0B;         --mx-action-accent-bg-hover: #D97706;
--mx-action-accent-bg-active: #B45309;  --mx-action-accent-text: #0F172A;
--mx-action-danger-bg: #DC2626;         --mx-action-danger-bg-hover: #B91C1C;
--mx-action-danger-bg-active: #991B1B;  --mx-action-danger-text: #FFFFFF;
--mx-action-neutral-bg: #FFFFFF;        --mx-action-neutral-bg-hover: #F8FAFC;
--mx-action-neutral-bg-active: #F1F5F9; --mx-action-neutral-text: #0F172A;
--mx-action-neutral-border: #CBD5E1;
--mx-action-disabled-bg: #F1F5F9;       --mx-action-disabled-text: #94A3B8;
--mx-text-primary: #0F172A;             --mx-focus-ring: #3B82F6;
--mx-size-control-sm: 2rem;  --mx-size-control-md: 2.5rem;  --mx-size-control-lg: 3rem;
--mx-space-2: 0.5rem;  --mx-space-3: 0.75rem;  --mx-space-4: 1rem;  --mx-space-6: 1.5rem;
--mx-radius-md: 0.5rem;  --mx-radius-full: 9999px;
--mx-font-size-sm: 0.875rem;  --mx-font-size-md: 1rem;
--mx-font-weight-medium: 500; --mx-font-line-height-tight: 1.25;
--mx-border-width-thin: 1px;  --mx-border-width-thick: 2px;
--mx-motion-duration-fast: 120ms;
--mx-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
```

## Usage

### React

```html
<!-- JSX — import { Button } from '@maxilius/react' -->
<Button>Save changes</Button>
<Button variant="neutral">Cancel</Button>
<Button variant="accent" size="lg" iconEnd="chevron-right">Start free trial</Button>
<Button variant="danger" iconStart="alert-triangle">Delete project</Button>
<Button loading>Saving…</Button>
<Button variant="ghost" size="sm" iconStart="copy" aria-label="Copy link" />
<Button fullWidth>Sign in</Button>
```

### Plain CSS (non-React sites)

Load `@maxilius/tokens/tokens.css`, then this class set reproduces the component:

```html
<button class="mx-btn mx-btn--primary mx-btn--md" type="button">Save changes</button>
<button class="mx-btn mx-btn--neutral mx-btn--md" type="button">Cancel</button>
```

```css
.mx-btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--mx-space-2);
  border: var(--mx-border-width-thin) solid transparent;
  border-radius: var(--mx-radius-md);
  font-family: var(--mx-font-family-sans);
  font-weight: var(--mx-font-weight-medium);
  line-height: var(--mx-font-line-height-tight);
  cursor: pointer; white-space: nowrap;
  transition: background-color var(--mx-motion-duration-fast) var(--mx-motion-easing-standard),
              border-color var(--mx-motion-duration-fast) var(--mx-motion-easing-standard),
              color var(--mx-motion-duration-fast) var(--mx-motion-easing-standard);
}
.mx-btn:focus-visible { outline: var(--mx-border-width-thick) solid var(--mx-focus-ring); outline-offset: 2px; }
.mx-btn--sm { height: var(--mx-size-control-sm); padding: 0 var(--mx-space-3); font-size: var(--mx-font-size-sm); }
.mx-btn--md { height: var(--mx-size-control-md); padding: 0 var(--mx-space-4); font-size: var(--mx-font-size-sm); }
.mx-btn--lg { height: var(--mx-size-control-lg); padding: 0 var(--mx-space-6); font-size: var(--mx-font-size-md); }
.mx-btn--primary { background: var(--mx-action-primary-bg); color: var(--mx-action-primary-text); }
.mx-btn--primary:hover:not(:disabled)  { background: var(--mx-action-primary-bg-hover); }
.mx-btn--primary:active:not(:disabled) { background: var(--mx-action-primary-bg-active); }
/* secondary/accent/danger follow the same pattern with their action-* tokens */
.mx-btn--neutral { background: var(--mx-action-neutral-bg); color: var(--mx-action-neutral-text);
                   border-color: var(--mx-action-neutral-border); }
.mx-btn--ghost   { background: transparent; color: var(--mx-text-primary); }
.mx-btn--ghost:hover:not(:disabled) { background: var(--mx-action-neutral-bg-hover); }
.mx-btn:disabled { cursor: not-allowed; background: var(--mx-action-disabled-bg);
                   color: var(--mx-action-disabled-text); border-color: transparent; }
```

Loading spinner (optional for plain CSS): a 1em circle, `border: 2px solid currentColor` with a transparent bottom edge, `border-radius: var(--mx-radius-full)`, rotating 0.7s linear infinite; hide the label with `visibility: hidden` so width is preserved, and set `aria-busy="true"` plus `disabled`.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use exactly one `primary` button per view or dialog; demote the rest to neutral or ghost. | Don't place two blue-600 primary buttons side by side — they compete and neither wins. |
| Reserve `accent` (amber-500) for the single warm CTA that must pull the eye — one per view, maximum. | Don't use accent for routine actions like "Apply filters"; warm color spent on routine work buys nothing. |
| Use `danger` only for destructive, hard-to-undo actions (delete, revoke, remove). | Don't use danger for "Cancel" or "Log out" — dismissal is neutral or ghost, not vermillion. |
| Pair primary "Save changes" with a neutral or ghost "Cancel" so the hierarchy reads instantly. | Don't make Cancel a secondary (teal) button — teal is a real action color, not a dismissal. |
| Let hover/active come from the `action-*-bg-hover/-active` tokens so dark mode lightens correctly. | Don't hand-darken hexes (e.g. `filter: brightness(0.9)`) — in dark mode hover must move up the ramp, not down. |
| Use `loading` for in-flight submits: spinner, preserved width, `aria-busy`, blocked re-clicks. | Don't swap the label to "Loading…" text — the width jump shifts layout and the button stays clickable. |
| Give icon-only buttons an `aria-label` ("Copy link") and prefer ghost or neutral for them. | Don't ship an icon-only button with no accessible name — screen readers announce "button", nothing more. |
| Write labels as sentence-case verbs: "Create project", "Send invite". | Don't use Title Case, ALL CAPS, or vague labels like "OK" / "Submit". |
| Keep md (40px) as the default; use lg (48px) for hero/marketing CTAs and sm (32px) in dense toolbars. | Don't mix sm and lg buttons in the same button group — aligned heights are the point of control tokens. |
| Rely on the built-in 2px `--mx-focus-ring` outline at 2px offset for keyboard focus. | Don't set `outline: none` on `.mx-btn` or replace focus with a color change alone. |
| Use `disabled` sparingly and explain why nearby (helper text) when you must. | Don't use gray-400-on-gray-100 disabled buttons as the only hint that a form is incomplete. |
| Use `fullWidth` for single-action mobile sheets and auth forms. | Don't stretch every button to full width on desktop — buttons should hug their labels. |

## Checklist

- [ ] Exactly one primary button (and at most one warm accent) on this view
- [ ] Hover, active, focus-visible, and disabled all come from `--mx-action-*` / `--mx-focus-ring` tokens
- [ ] Heights are 32/40/48px from `--mx-size-control-*`; radius is 8px `--mx-radius-md`
- [ ] Labels are sentence-case verbs; no Title Case or ALL CAPS
- [ ] Icon-only buttons have `aria-label`; icons are 16px in sm/md buttons, 20px in lg
- [ ] Async actions use `loading` (spinner + `aria-busy` + preserved width)
- [ ] Danger variant appears only on destructive actions
- [ ] Checked in dark mode: hover lightens, text stays legible, focus ring visible

## Related

- [01-color.md](./01-color.md) — action ramps and temperature discipline
- [10-forms-inputs.md](./10-forms-inputs.md) — buttons inside forms
- [06-iconography.md](./06-iconography.md) — the 18 built-in icon names
- [08-motion-animation.md](./08-motion-animation.md) — durations and easing
- [15-accessibility.md](./15-accessibility.md) — focus and contrast floors
