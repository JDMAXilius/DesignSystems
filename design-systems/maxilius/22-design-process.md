# 22 · Design process — Maxilius Design System

> From blank page to shipped screen in six steps: define the job, wireframe in grey, structure on the grid, apply the system coolest-first, handle every state, then verify — color comes last, and warm color comes very last.

## Principles

1. **Content before chrome.** You can't lay out a page you haven't written. Real headings, real labels, real data shapes first; boxes second; styling third.
2. **Mobile first, one column first.** Design the 320px version before the 1280px version. If the hierarchy works in one column, the grid version is easy; the reverse is never true.
3. **Coolest first, warm last.** Apply the system in temperature order: space and type (no color), then cool neutrals, then cool blue/teal actions, and only at the very end the single warm accent. If the page already reads clearly in grey, color is a bonus, not a crutch.
4. **States are the design.** The happy path is maybe a third of what ships. Loading, empty, error, long content, and small screens are designed, not discovered in production.
5. **The system decides, so you don't have to.** Every "what size / what gap / what color" question already has an answer in docs 00–21. Spend your judgment on the content and the flow, not on inventing values.

## The system

The six steps at a glance:

| Step | Do | Reach for |
|---|---|---|
| 0 · Define the job | One sentence: who arrives, what they must accomplish, and the **one primary action** | [17 · Content, voice, and tone](./17-content-voice-tone.md) |
| 1 · Grey-box wireframe | Real content in grey boxes, single column, mobile width | `--mx-space-*` only |
| 2 · Structure | Place blocks on the 12-column grid; order by hierarchy | [03 · Spacing, layout, and grid](./03-spacing-layout-grid.md), [21 · Visual hierarchy](./21-visual-hierarchy.md) |
| 3 · Apply the system | Spacing → type → cool neutrals → cool actions → **one warm CTA last** | [02](./02-typography.md), [01](./01-color.md), [09](./09-buttons.md) |
| 4 · States & edges | Loading, empty, error, long content, mobile | [13 · Feedback](./13-feedback.md), [16 · Responsive](./16-responsive.md) |
| 5 · Verify | New-page checklist, keyboard pass, dark-mode pass | [checklists/new-page-checklist.md](./checklists/new-page-checklist.md), [15](./15-accessibility.md), [19](./19-theming-dark-mode.md) |

## Process

### Step 0 — define the job

Write it down before opening any tool: *"A team admin arrives to invite teammates; the primary action is sending invitations."* Then enforce it — **one primary action per view**. Everything else on the page is either supporting that action (cool blue/teal/neutral/ghost) or navigation. If you can't name the one action, the page is two pages.

### Step 1 — content-first grey-box wireframe

Write the real content: the H1, section labels, field labels, button verbs, the empty-state message. Then box it — `bg-surface` rectangles with real text, spaced with `--mx-space-*`, at mobile width, no color, no icons, no font sizes beyond "big / medium / small". If a reviewer can't tell what the page does from the grey boxes, no amount of styling will save it. Never lorem ipsum: fake words hide real problems (labels that wrap, empty tables, 40-character names).

### Step 2 — structure on the grid

Move to the 12-column grid (gutter `space-6`, max width 1280px, margins per doc 03) and assign each block its columns and its reading position. Apply doc 21's hierarchy levers **in order of cheapness: position → space → size → weight** — the primary action sits in the natural end-of-scan position, related blocks sit closer together (`space-1`/`space-2` inside groups, `space-6`+ between groups), sections separated by ≥ `space-16` on desktop. Still no color.

### Step 3 — apply the system, coolest first

1. **Spacing:** replace every ad-hoc gap with the scale — controls at `size-control-md` (40px), card padding `space-6`, form-field stacks `space-4`.
2. **Type:** map the "big/medium/small" from step 1 onto the scale — one `font-size-4xl`/`5xl` H1, `xl` card titles, `md` body at line-height normal, `sm` secondary. Inter, weights 400–700 only.
3. **Cool neutrals:** `bg-canvas` behind everything, `bg-surface` cards with `border-default`, text in `text-primary`/`text-secondary`, `radius-lg` cards, `shadow-sm`.
4. **Cool actions:** links `text-link`, routine buttons primary (blue) / secondary (teal) / neutral / ghost per doc 09.
5. **Warm accent — LAST:** now, and only now, promote the step-0 primary action to the amber accent variant if it must dominate the view. **One warm CTA per view**; danger red only on genuinely destructive actions. If two things feel like they deserve amber, return to step 0.

### Step 4 — states and edge cases

For every dynamic region, design all five before calling it done:

- **Loading:** Spinner for short in-place waits (loading buttons preserve width, `aria-busy`); Skeleton shapes for content areas so layout doesn't jump.
- **Empty:** a sentence that says what will appear here plus the action that fills it — never a blank white void.
- **Error:** `feedback-danger` tokens with icon + message + recovery action; field errors on blur per doc 10.
- **Long content:** 200-character names, 1,000-row tables (scrollable wrapper), translated strings ~30% longer — nothing truncates silently or breaks the grid.
- **Mobile:** collapse patterns per doc 16; touch targets ≥ 44px; the one-column order from step 1 is your collapse order.

### Step 5 — verify

Run [checklists/new-page-checklist.md](./checklists/new-page-checklist.md) line by line. Then two passes that catch what checklists miss:

- **Keyboard pass:** unplug the mouse. Tab through — every interactive element reachable, visible `--mx-focus-ring`, logical order, no traps, Escape closes overlays.
- **Dark-mode pass:** flip `data-theme="dark"`. If you used only semantic tokens, dark mode is free — this pass exists to catch the hardcoded hex that slipped in (it will glow like a bug light against `gray-950`).

### Worked example — "Invite your team" page, compressed

- **0:** Admin invites teammates; primary action = "Send invitations".
- **1:** Grey boxes, mobile: H1 "Invite your team" → helper sentence → email field(s) → role select → send button → "skip for now" link. Empty state written: "No invitations sent yet."
- **2:** Desktop: form card takes 6 of 12 columns, centered; H1 above; button pair bottom-right of the card.
- **3:** Card `bg-surface`/`radius-lg`/`space-6` padding; H1 `font-size-4xl` semibold; labels above fields per doc 10; "Skip for now" as ghost. Last: "Send invitations" — this view's one moment — becomes the amber accent button, dark text.
- **4:** Send → loading button; invalid email → `feedback-danger` on blur; 20 invitees → the field list scrolls, the card doesn't grow past the viewport; mobile → single column, full-width buttons.
- **5:** Checklist passes; Tab order is field → select → send → skip; dark mode flips clean because every value was a `--mx-*` role.

## Usage

Step 1 grey-box markup — structure and real words only:

```html
<main class="wire">
  <h1>Invite your team</h1>
  <p>Teammates get full access to this workspace.</p>
  <section class="wire__block">Email field · Role select</section>
  <section class="wire__block">Send invitations · Skip for now</section>
</main>
```

```css
.wire { display: grid; gap: var(--mx-space-6); padding: var(--mx-space-4); max-width: 40rem; }
.wire__block {
  background: var(--mx-bg-surface-sunken);
  border: var(--mx-border-width-thin) dashed var(--mx-border-strong);
  padding: var(--mx-space-6);
  color: var(--mx-text-secondary); /* grey means "not designed yet" — on purpose */
}
```

The same page after step 3 — note the temperature order frozen into the CSS:

```css
.invite-card {
  /* 3.1 spacing, 3.3 cool neutrals — the calm framework */
  background: var(--mx-bg-surface);
  border: var(--mx-border-width-thin) solid var(--mx-border-default);
  border-radius: var(--mx-radius-lg);
  padding: var(--mx-space-6);
  box-shadow: var(--mx-shadow-sm);
}
.invite-card h1 { font-size: var(--mx-font-size-4xl); font-weight: var(--mx-font-weight-semibold); }
/* 3.5 the single warm moment on this view — added last, on purpose */
.invite-card .mx-btn--accent {
  background: var(--mx-action-accent-bg);
  color: var(--mx-action-accent-text); /* dark text on amber, always */
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Write the one-sentence job and name the single primary action before wireframing | Don't start a page with three "primary" actions — if everything is amber, nothing is |
| Wireframe with the real H1, real labels, and real data shapes | Don't fill wireframes with lorem ipsum — fake content hides wrapping, empty, and overflow problems |
| Design the 320px single-column version first, then expand onto the 12-column grid | Don't design desktop-only and "squish it later" — collapse order is a design decision, not a media query |
| Build hierarchy with position, space, size, and weight before touching color | Don't open the color picker first — a page that only works in color doesn't work |
| Apply amber to exactly one CTA per view, as the final styling step | Don't sprinkle amber on badges, banners, and buttons "for energy" — warm is a budget, not a theme |
| Design loading (Spinner/Skeleton), empty, error, and long-content states for every dynamic region | Don't ship the happy path and let production data design your edge cases |
| Compose the 20 shipped components (Card + Input + Button covers most pages) | Don't invent variants the library doesn't have — there is no `xl` button, no purple badge, no left-label input |
| Use only `--mx-*` semantic tokens so the dark-mode pass is a formality | Don't hardcode a hex "just for this page" — it's the one thing the dark-mode pass will catch |
| Run the keyboard pass with the mouse unplugged before review | Don't equate "it has focus styles" with "it's operable" — order, traps, and Escape only show up by tabbing |
| Return to step 0 when a new requirement lands mid-build | Don't bolt a second hero CTA onto a finished page — re-decide the job, don't decorate around it |

## Checklist

- [ ] The page's job and its one primary action are written down and reflected in the layout
- [ ] Wireframe used real content; the grey-box version communicated the page on its own
- [ ] Mobile single-column order decided first; desktop uses the 12-column grid per doc 03
- [ ] Hierarchy carried by position/space/size/weight (doc 21) before any color was applied
- [ ] Exactly one warm (amber) element competes for attention; danger red on destructive actions only
- [ ] Loading, empty, error, and long-content states exist for every dynamic region
- [ ] Every value on the page is a `--mx-*` token; no invented sizes, gaps, or colors
- [ ] [New-page checklist](./checklists/new-page-checklist.md) run line by line
- [ ] Keyboard pass done: reachable, visible focus, logical order, Escape closes overlays
- [ ] Dark-mode pass done: `data-theme="dark"` renders clean with no hardcoded values glowing

## Related

- [00 · Design principles](./00-design-principles.md) — the convictions this process operationalizes
- [21 · Visual hierarchy](./21-visual-hierarchy.md) — the levers used in steps 2 and 3
- [03 · Spacing, layout, and grid](./03-spacing-layout-grid.md) — the grid the structure step builds on
- [13 · Feedback](./13-feedback.md) — loading, empty, and error patterns for step 4
- [16 · Responsive](./16-responsive.md) — collapse patterns for the mobile-first rule
- [checklists/new-page-checklist.md](./checklists/new-page-checklist.md) — the step 5 gate
