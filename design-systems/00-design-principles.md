# 00 · Design principles — Cloud Design System
> The six beliefs that every color, type, spacing, and component decision in CDS traces back to.

The Cloud Design System (CDS) is built to feel like a clear sky: airy, calm, light-filled, with soft depth. These principles are not decoration — they are the tiebreakers we use in every design review. When two options both "look fine," the principles decide.

## Principles

### 1. Clarity over cleverness
The interface's job is to be understood, not admired. If a user has to think about the UI instead of their task, the UI has failed.

Concrete implications:
- Labels say what things do ("Save changes", not "Make it so").
- Navigation and actions use familiar patterns before novel ones. Invent only when the standard pattern genuinely can't express the need.
- Every icon-only control gets an accessible name; anything ambiguous gets a visible text label.
- Copy is sentence case, active voice, ≤ 20-word sentences. Errors say what happened and how to fix it.

### 2. Calm and airy — whitespace is a feature
Space is not "empty"; it is the material the system is built from. Density is a deliberate choice, never an accident of cramming.

Concrete implications:
- Default to generous padding: cards breathe, sections separate with ≥ 64px on desktop (48px mobile).
- When a screen feels busy, the first fix is removing or spacing elements — not shrinking text or adding dividers.
- Surfaces stay light (cloud-50 pages, cloud-0 cards); depth comes from soft layered shadows, not heavy borders.
- One idea per view region. If a card does three jobs, it should be three cards — or one job.

### 3. Hierarchy before decoration
A user should be able to squint at a screen and still know what matters most. Size, weight, spacing, and position establish hierarchy; color and effects only reinforce it.

Concrete implications:
- Exactly one H1 and one primary action per view. Everything else visually defers to them.
- Establish emphasis with the type scale (text-5xl → text-xs) and weight (700 → 400) before reaching for color.
- Secondary information uses cloud-600 text, not smaller-and-brighter tricks.
- If removing a gradient, shadow, or accent color breaks the hierarchy, the hierarchy was never there.

### 4. Consistency compounds
Every reuse of a token or pattern makes the whole product faster to build and easier to learn. Every one-off makes both worse.

Concrete implications:
- Use tokens, never raw values: `--cds-color-primary`, not `#0284C7`; `--cds-space-4`, not `17px`.
- The same action looks the same everywhere: primary buttons are always solid sky-600, radius-md, weight 600.
- Deviate from the system only with a written reason — and if the reason is good, change the system, not the screen.
- Spacing snaps to the 4px grid. "Close enough" values (13px, 18px, 25px) are bugs.

### 5. Accessible by default
Accessibility is a floor, not a feature flag. A component that fails WCAG 2.2 AA is not done, regardless of how it looks.

Concrete implications:
- Text contrast ≥ 4.5:1 (≥ 3:1 for text ≥ 24px, or 19px bold). UI components and graphics ≥ 3:1.
- Every interactive element has a visible focus state (2px sky-500 ring, 2px offset) and a ≥ 44×44px touch target.
- Color is never the only signal — pair status colors with icons and text.
- Labels are always visible above form fields; placeholders are hints, never labels.

### 6. Motion with purpose
Animation exists to explain change — where something came from, where it went. Motion that only entertains is noise.

Concrete implications:
- Every animation answers "what did this just clarify?" Feedback is instant (100ms), spatial changes are fast (150–250ms), page-level moves are slow (400ms) — never longer.
- Animate only `transform` and `opacity` so motion stays smooth on low-end devices.
- Always honor `prefers-reduced-motion`: reduce to simple fades or remove motion entirely.
- Nothing loops or auto-plays indefinitely without a pause control.

## How principles resolve conflicts

Principles collide in real work. Resolve them in this order:

1. **Accessible by default beats everything.** A beautiful, calm layout that fails contrast ships in fixed form or not at all.
2. **Clarity beats calm.** If generous whitespace pushes the primary action below the fold on common screens, tighten the layout — comprehension wins.
3. **Hierarchy beats consistency.** If the standard pattern makes the wrong thing look most important on a given screen, adjust emphasis (then consider whether the system needs a new variant).
4. **Consistency beats local cleverness.** A slightly-better one-off loses to a slightly-worse shared pattern, because the shared pattern gets better for everyone when improved once.
5. **Calm beats decoration, always.** When in doubt, remove.

### Worked examples

**Gradient hero.** A marketing hero wants the signature gradient behind white text. Accessibility check comes first (does the text pass contrast over every point of the gradient?), then hierarchy (is this the one hero moment of the view?), then calm (is this the only gradient on the page?). Only if all three pass does it ship.

**Dense data table.** A finance team asks for a table showing 40 columns "like their spreadsheet." Clarity beats calm here: density is legitimate for expert scanning tasks, so the table may tighten row padding below the airy default — but it does so with a documented compact variant (consistency), keeps 16px body text or 14px table cells from the type scale, and never drops below AA contrast (accessibility). The rest of the page around the table stays airy.

**Brand-colored sidebar.** A stakeholder wants the sidebar filled with the primary sky color "for brand presence." Hierarchy beats decoration: a 30%-of-screen saturated surface competes with every real call to action. The system answer is a neutral sidebar (cloud surfaces) with sky reserved for the active item and primary actions — brand shows up through restraint, type, and the signature gradient used once.

**Deadline pressure.** A team wants to ship a modal without focus trapping "just this sprint." Accessibility beats everything, including schedules: keyboard users would be unable to leave the dialog. The feature waits, or ships behind a flag, or uses an existing accessible pattern instead.

## Principles in practice

A quick translation table from principle to the sibling doc that operationalizes it:

| Principle | Where it becomes concrete |
|---|---|
| Clarity over cleverness | Voice rules (sentence case, active voice); visible labels in forms |
| Calm and airy | Spacing scale and section rhythm in [03 · Spacing, layout & grid](./03-spacing-layout-grid.md) |
| Hierarchy before decoration | Type scale and heading mapping in [02 · Typography](./02-typography.md) |
| Consistency compounds | Token blocks (`--cds-*`) in every sibling doc |
| Accessible by default | Contrast pairing table in [01 · Color](./01-color.md); focus and target rules everywhere |
| Motion with purpose | Duration/easing tokens; transform-and-opacity-only rule |

When reviewing a design or a PR, name the principle in your feedback ("this fails *hierarchy before decoration* — the promo banner outweighs the page title") rather than arguing taste. Principles turn debates into checklists.

## Using the principles day to day

**In design review.** Run the three squint tests before discussing details: grayscale squint (does hierarchy survive without color?), blur squint (can you still find the primary action?), and mobile squint (does the 320px layout keep the same priorities?). A screen that fails a squint test gets structural feedback, not polish feedback.

**In code review.** Search the diff for raw values: any hex color, any pixel value not on the 4px grid, any `font-size` outside the scale, any `transition` on properties other than transform/opacity. Each one is either a bug or a missing token — never merge it silently.

**When proposing a new component.** Answer four questions in the proposal: which existing pattern is closest and why is it insufficient; which principles does the new component serve; what are its tokens (no raw values); what are its keyboard, focus, and reduced-motion behaviors. A proposal that can't answer all four isn't ready.

**When the spec is silent.** Derive, don't invent: stay on the 4px grid, stay inside the existing color ramps and type scale, match the personality (airy, calm, soft depth), and document the derivation so the next person inherits a rule instead of a mystery.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Fix a cluttered dashboard by removing widgets and widening gaps to space-8 (32px) between groups | Don't fix clutter by shrinking body text below 16px or adding divider lines everywhere — that adds noise, not calm |
| Give each view exactly one primary (solid sky-600) button; make other actions secondary or ghost | Don't place two solid primary buttons side by side and let the user guess which one matters |
| Reuse the shared card pattern (cloud-0 surface, radius-lg, elevation-1) even if a custom card would look 5% better here | Don't build a one-off card with unique padding and shadow — the 5% gain costs every future screen |
| Establish emphasis with size and weight first: text-4xl/700 heading over text-md/400 body | Don't rely on bright color alone to mark importance — squint-test the layout in grayscale |
| Check contrast before shipping: cloud-600 body text on white passes at 7.58:1 | Don't ship cloud-400 (#94A3B8) as body text on white — it fails AA at 2.56:1; reserve it for large or disabled text |
| Pair every status color with an icon and a message ("✓ Saved" in Meadow green) | Don't communicate success/failure with a color change alone — colorblind users see nothing happen |
| Animate a dropdown opening with a 250ms transform+opacity ease-out so users see where it came from | Don't add a bouncing 800ms entrance to a button "for delight" — it delays the task and explains nothing |
| Write button labels as verbs in sentence case: "Invite teammate", "Delete project" | Don't write "OK", "Submit", ALL CAPS, or Title Case labels — they hide the consequence of the click |
| When a screen needs a value the system lacks, extend the token scale on the 4px grid and document it | Don't hardcode 18px padding because "it looked right" — off-grid values silently fork the system |
| Honor `prefers-reduced-motion` by reducing every transition to an instant or simple fade | Don't assume motion preferences are cosmetic — vestibular users can be physically harmed by large movement |
| Show secondary details in cloud-600 secondary text at full size | Don't shrink text to 11px to de-emphasize it — below 12px it stops being readable rather than becoming quieter |
| Group related form fields with proximity: 8px label-to-input, 16px between fields, 32px between groups | Don't wrap every field group in a bordered box — boxes-in-boxes add chrome where spacing already communicates the grouping |

## Anti-principles

Things CDS deliberately is not, so nobody "improves" it in these directions:

- **Not maximalist.** No competing gradients, no decorative borders on everything, no three accent colors per screen. If a design trend requires loudness, it isn't CDS.
- **Not dense-by-default.** Compact variants exist for expert tools, but they are opt-in exceptions with documented tokens — never the starting point.
- **Not novelty-driven.** CDS adopts a new pattern when it measurably beats the old one for users, not because it's new. Boring and legible beats fresh and confusing.
- **Not pixel-precious.** The system optimizes for a thousand screens built quickly and consistently, not one screen polished endlessly. When perfection on one screen fights reuse across many, reuse wins.

## Checklist

- [ ] One H1 and one primary action per view; hierarchy survives the grayscale squint test
- [ ] All text passes AA contrast (≥ 4.5:1, or ≥ 3:1 for large text); UI parts ≥ 3:1
- [ ] Every value on screen traces to a token — no raw hex, no off-grid spacing
- [ ] Whitespace was the first tool used to organize the layout, not borders or boxes
- [ ] Status and meaning are never carried by color alone
- [ ] Every interactive element has a visible focus ring and ≥ 44×44px target
- [ ] All motion animates only transform/opacity, has a purpose, and respects `prefers-reduced-motion`
- [ ] Copy is sentence case, active voice, and errors explain how to recover
- [ ] Any deviation from a shared pattern has a written reason (or became a system change)
- [ ] The 320px layout keeps the same priorities as the desktop layout

## Related

- [01 · Color](./01-color.md)
- [02 · Typography](./02-typography.md)
- [03 · Spacing, layout & grid](./03-spacing-layout-grid.md)
