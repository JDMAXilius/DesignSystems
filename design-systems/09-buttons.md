# 09 · Buttons — Cloud Design System
> Buttons are the primary way users commit to an action; CDS gives you four variants, three sizes, and six states that cover every case.

## Principles

1. **One primary per view.** A single solid sky button marks the main action; everything else steps back to secondary, ghost, or destructive.
2. **State is always visible.** Hover, active, focus, disabled, and loading each have a distinct, spec-defined appearance — never rely on cursor changes alone.
3. **Labels are verbs.** Sentence case, active voice: "Save changes", not "SAVE" or "Changes Saved".
4. **Size follows hierarchy, not whim.** md (40px) is the default; lg only for hero CTAs, sm only in dense UI like table rows and toolbars.
5. **Never shift layout.** Loading preserves width; focus rings sit outside the box; hover changes color, not size.

## The system

### Variants × states (exact values)

| State | Primary (solid) | Secondary (outline) | Ghost (text) | Destructive (solid) |
|---|---|---|---|---|
| Default | bg sky-600 `#0284C7`, text `#FFFFFF` | bg cloud-0 `#FFFFFF`, border 1px cloud-300 `#CBD5E1`, text cloud-700 `#334155` | bg transparent, text cloud-700 `#334155` | bg `#DC2626`, text `#FFFFFF` |
| Hover | bg sky-700 `#0369A1` | bg cloud-50 `#F8FAFC`, border cloud-400 `#94A3B8` | bg cloud-100 `#F1F5F9` | bg `#B91C1C` |
| Active | bg sky-800 `#075985` | bg cloud-100 `#F1F5F9`, border cloud-400 `#94A3B8` | bg cloud-200 `#E2E8F0` | bg `#991B1B` |
| Focus-visible | default colors + 2px sky-500 `#0EA5E9` ring, 2px offset | same ring recipe | same ring recipe | same ring recipe |
| Disabled | default colors at 50% opacity, `cursor: not-allowed` | same rule | same rule | same rule |
| Loading | spinner replaces label, width preserved, `aria-busy="true"` | same rule | same rule | same rule |

Hover darkens one step on the ramp; active darkens two. Destructive hover/active use the danger ramp (`#B91C1C`, `#991B1B`), derived one and two steps below the base.

### Sizes

| Size | Height | Padding-x | Text | Weight | Radius | Icon size |
|---|---|---|---|---|---|---|
| sm | 32px | 12px (space-3) | text-sm 14px | 600 | radius-md 10px | 16px |
| md (default) | 40px | 16px (space-4) | text-sm 14px | 600 | radius-md 10px | 20px |
| lg | 48px | 20px (space-5) | text-md 16px | 600 | radius-md 10px | 24px |

### Icons in buttons

- Leading icon = reinforces the verb ("＋ Add member"). Trailing icon = indicates direction or consequence ("Continue →", "Open ↗").
- One icon per button, never both sides. Gap between icon and label: 8px (space-2).
- Icons inherit `currentColor`, 1.5px stroke, and match the size column above (20px at md).
- Icon-only buttons need `aria-label` and a square hit area equal to button height (40×40 at md); keep the total touch target ≥ 44×44px with surrounding spacing.

### Groups, alignment, and width

- In dialogs and forms, the primary action sits **rightmost**; secondary/ghost actions to its left, 12px (space-3) apart. Destructive confirmation dialogs put the destructive button rightmost in place of primary.
- Related toggles may form a segmented group sharing one 1px cloud-300 border, radius-md on the outer corners only (nested radius rule: inner = outer − padding).
- On mobile forms (< 640px), buttons go full-width and stack vertically, primary on top, 12px gap.
- Minimum motion: color transitions at duration-instant (100ms) with standard easing `cubic-bezier(0.2, 0, 0, 1)`.

## Tokens

```css
:root {
  /* Variant colors */
  --cds-btn-primary-bg: #0284C7;          /* sky-600 */
  --cds-btn-primary-bg-hover: #0369A1;    /* sky-700 */
  --cds-btn-primary-bg-active: #075985;   /* sky-800 */
  --cds-btn-primary-text: #FFFFFF;
  --cds-btn-secondary-bg: #FFFFFF;        /* cloud-0 */
  --cds-btn-secondary-bg-hover: #F8FAFC;  /* cloud-50 */
  --cds-btn-secondary-bg-active: #F1F5F9; /* cloud-100 */
  --cds-btn-secondary-border: #CBD5E1;    /* cloud-300 */
  --cds-btn-secondary-border-hover: #94A3B8; /* cloud-400 */
  --cds-btn-secondary-text: #334155;      /* cloud-700 */
  --cds-btn-ghost-text: #334155;          /* cloud-700 */
  --cds-btn-ghost-bg-hover: #F1F5F9;      /* cloud-100 */
  --cds-btn-ghost-bg-active: #E2E8F0;     /* cloud-200 */
  --cds-btn-danger-bg: #DC2626;
  --cds-btn-danger-bg-hover: #B91C1C;
  --cds-btn-danger-bg-active: #991B1B;
  /* Shape, focus, motion */
  --cds-btn-radius: 10px;                 /* radius-md */
  --cds-btn-gap: 8px;                     /* space-2 */
  --cds-focus-ring: 0 0 0 2px #FFFFFF, 0 0 0 4px #0EA5E9; /* 2px sky-500, 2px offset */
  --cds-btn-duration: 100ms;              /* duration-instant */
  --cds-btn-easing: cubic-bezier(0.2, 0, 0, 1);
  /* Sizes */
  --cds-btn-h-sm: 32px;  --cds-btn-px-sm: 12px;
  --cds-btn-h-md: 40px;  --cds-btn-px-md: 16px;
  --cds-btn-h-lg: 48px;  --cds-btn-px-lg: 20px;
}
```

## Usage

### Complete button CSS (all variants and states)

```css
.cds-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--cds-btn-gap);
  height: var(--cds-btn-h-md);
  padding: 0 var(--cds-btn-px-md);
  border: 1px solid transparent;
  border-radius: var(--cds-btn-radius);
  font-family: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 14px; line-height: 20px; font-weight: 600;
  cursor: pointer;
  transition: background-color var(--cds-btn-duration) var(--cds-btn-easing),
              border-color var(--cds-btn-duration) var(--cds-btn-easing);
}
.cds-btn:focus-visible { outline: none; box-shadow: var(--cds-focus-ring); }
.cds-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.cds-btn--primary { background: var(--cds-btn-primary-bg); color: var(--cds-btn-primary-text); }
.cds-btn--primary:hover:not(:disabled)  { background: var(--cds-btn-primary-bg-hover); }
.cds-btn--primary:active:not(:disabled) { background: var(--cds-btn-primary-bg-active); }

.cds-btn--secondary {
  background: var(--cds-btn-secondary-bg);
  border-color: var(--cds-btn-secondary-border);
  color: var(--cds-btn-secondary-text);
}
.cds-btn--secondary:hover:not(:disabled)  { background: var(--cds-btn-secondary-bg-hover); border-color: var(--cds-btn-secondary-border-hover); }
.cds-btn--secondary:active:not(:disabled) { background: var(--cds-btn-secondary-bg-active); border-color: var(--cds-btn-secondary-border-hover); }

.cds-btn--ghost { background: transparent; color: var(--cds-btn-ghost-text); }
.cds-btn--ghost:hover:not(:disabled)  { background: var(--cds-btn-ghost-bg-hover); }
.cds-btn--ghost:active:not(:disabled) { background: var(--cds-btn-ghost-bg-active); }

.cds-btn--danger { background: var(--cds-btn-danger-bg); color: #FFFFFF; }
.cds-btn--danger:hover:not(:disabled)  { background: var(--cds-btn-danger-bg-hover); }
.cds-btn--danger:active:not(:disabled) { background: var(--cds-btn-danger-bg-active); }

/* Sizes */
.cds-btn--sm { height: var(--cds-btn-h-sm); padding: 0 var(--cds-btn-px-sm); }
.cds-btn--lg { height: var(--cds-btn-h-lg); padding: 0 var(--cds-btn-px-lg); font-size: 16px; line-height: 24px; }

/* Loading: spinner replaces label, width preserved */
.cds-btn[aria-busy="true"] { position: relative; color: transparent; pointer-events: none; }
.cds-btn[aria-busy="true"]::after {
  content: ""; position: absolute; inset: 0; margin: auto;
  width: 20px; height: 20px;
  border: 2px solid rgba(255,255,255,0.35); border-top-color: #FFFFFF;
  border-radius: 9999px; animation: cds-spin 600ms linear infinite;
}
@keyframes cds-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .cds-btn { transition: none; }
  .cds-btn[aria-busy="true"]::after { animation-duration: 1.5s; }
}
/* Mobile forms: full-width stack */
@media (max-width: 639px) {
  form .cds-btn { width: 100%; }
}
```

### Dialog footer (primary rightmost)

```html
<footer class="cds-dialog-actions">
  <button class="cds-btn cds-btn--ghost">Cancel</button>
  <button class="cds-btn cds-btn--secondary">Save draft</button>
  <button class="cds-btn cds-btn--primary">Publish</button>
</footer>
```

```css
.cds-dialog-actions { display: flex; justify-content: flex-end; gap: 12px; }
```

### Icon button with leading icon

```html
<button class="cds-btn cds-btn--primary">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14"/>
  </svg>
  Add member
</button>
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use exactly one primary (sky-600) button per view or dialog | Don't place two solid sky-600 buttons side by side — hierarchy collapses |
| Use sky-700 `#0369A1` on hover and sky-800 `#075985` on active | Don't lighten on hover — CDS interaction always darkens one, then two steps |
| Preserve button width during loading by swapping the label for a spinner | Don't collapse the button to spinner-width — the layout jumps when it resolves |
| Set `disabled` with 50% opacity and `cursor: not-allowed` | Don't restyle disabled with new colors — opacity keeps the variant recognizable |
| Show the 2px sky-500 ring at 2px offset on `:focus-visible` | Don't use `outline: none` without a replacement ring — keyboard users lose their place |
| Use the destructive variant (`#DC2626`) only for irreversible actions like "Delete project" | Don't use destructive for "Cancel" or "Remove filter" — reserve red for real loss |
| Put the primary action rightmost in dialog footers, 12px from its neighbors | Don't order actions primary-first on desktop dialogs — users scan to the corner |
| Go full-width and stack buttons (primary on top) in mobile forms under 640px | Don't keep two 32px-tall buttons side by side on mobile — targets fall under 44px |
| Write labels as sentence-case verbs: "Save changes", "Invite teammate" | Don't use ALL CAPS or Title Case labels — spec voice is sentence case everywhere |
| Use one 20px leading icon at md with an 8px gap | Don't add icons on both sides of a label — pick leading or trailing, never both |
| Give icon-only buttons an `aria-label` and a 40×40px minimum hit area | Don't ship a 24×24 icon hit area — touch floor is 44×44px including spacing |
| Use ghost buttons for low-stakes inline actions inside cards and tables | Don't use ghost for the main page CTA — text-only reads as tertiary |
| Keep sm (32px) buttons for dense surfaces like table rows and toolbars | Don't mix sm and lg buttons in the same action group — same group, same size |

## Checklist

- [ ] Exactly one primary button in this view or section
- [ ] All six states styled: default, hover, active, focus-visible, disabled, loading
- [ ] Hover/active follow the darken-1-step / darken-2-steps rule with exact spec hexes
- [ ] Focus ring is 2px sky-500 at 2px offset and visible on every variant
- [ ] Loading preserves width and sets `aria-busy="true"`
- [ ] Labels are sentence-case verbs, ≤ 3 words where possible
- [ ] Icons are 16/20/24px by size, `currentColor`, 8px gap, one side only
- [ ] Dialog footers align actions right with primary rightmost
- [ ] Mobile (< 640px) form buttons are full-width and stacked
- [ ] `prefers-reduced-motion` is respected on transitions and spinner

## Related

- [10-forms-inputs.md](./10-forms-inputs.md) — inputs share the 40px md height and radius-md
- [11-navigation.md](./11-navigation.md) — nav items and tabs use related interactive states
