# 00 · Design principles — Maxilius Design System

> The convictions that every Maxilius token, component, and page decision traces back to.

## The master principle: cool framework, warm action

Maxilius is built on color temperature theory (grounded in *Enhance UI — Design for Developers*,
Twarog & Moller): **cool colors recede, warm colors advance**. We turn that perceptual fact into
an operating rule for the whole system.

- **Cool colors build the framework.** Cool gray neutrals (`gray-50 #F8FAFC` → `gray-950 #020617`),
  blue (`#2563EB` primary), and teal (`#0D9488` secondary) form every surface, border, text color,
  and routine action. They recede, so the user's content — not the chrome — owns the page.
- **Warm colors demand attention.** Amber (`#F59E0B` accent) and vermillion (`#DC2626` danger) are
  reserved for the few moments that must pull the eye: the one CTA that matters, warnings, and
  destructive actions. Scarcity is what makes them work — at most **one warm CTA per view**.

When you can explain a screen as "a calm cool structure with one or two deliberate warm moments,"
it is a Maxilius screen.

## Principles

### 1. Code is the source of truth

Tokens live as DTCG JSON in `@maxilius/tokens`, components consume them in `@maxilius/react`, and
docs describe what the code does — in that order. If a doc and the shipped tokens disagree, the
tokens win and the doc gets fixed. Rules that exist only in documentation are explicitly marked
"(defined by docs, not yet in code)" so nobody mistakes guidance for an implemented constraint.

### 2. Hierarchy before decoration

Establish what the user should see first, second, and third — using size, weight, spacing, and
temperature — before reaching for any decorative treatment. A page whose hierarchy works in
grayscale plus one warm accent is done; a page that needs gradients and extra colors to feel
"designed" has a hierarchy problem, not a styling problem.

### 3. Accessible by default

WCAG 2.2 AA is the floor, built into the tokens: text contrast ≥ 4.5:1 (≥ 3:1 for text ≥ 24px or
19px bold), UI components ≥ 3:1, a visible 2px `--mx-focus-ring` outline at 2px offset on every
interactive element, and color never as the only signal — warm color is always paired with an icon
or text (feedback tokens ship icon + text roles together). Accessibility is not a review step; it
is the default output of using the system.

### 4. Consistency compounds

Two tiers, one rule: **primitives** (raw ramps and scales) are never consumed by components;
components consume only **semantic roles** (`bg.*`, `text.*`, `border.*`, `action.*`, `feedback.*`,
`focus.*`). Because light and dark themes define identical token paths (build-enforced), dark mode
is a token swap, not a redesign. Every screen built this way makes the next one cheaper and the
whole product more learnable.

### 5. Motion with purpose

Motion explains state change; it never performs. Three durations (fast 120ms for hover/press,
base 200ms for standard transitions, slow 320ms for overlays), standard easing
`cubic-bezier(0.2, 0, 0, 1)`, transform and opacity preferred, and `prefers-reduced-motion`
always respected (reduced-motion rule defined by docs, not yet in code).

## How principles resolve conflicts

When principles collide, apply this precedence:

1. **Accessible by default beats everything.** No hierarchy, brand, or temperature argument
   justifies failing contrast or hiding focus. Example: amber `#F59E0B` is the warm attention
   color, but white text on it fails contrast — so the accent action tokens put dark text
   (`gray-900`) on amber, even though every other solid button uses white text.
2. **Code beats docs.** If a guideline here conflicts with what `@maxilius/tokens` ships, the
   token is correct. Propose a token change; don't fork the doc.
3. **Temperature beats preference.** "The marketing team wants two orange buttons" loses to
   one-warm-CTA-per-view. Demote the second action to primary (cool blue) or neutral.
4. **Hierarchy beats consistency — rarely, and locally.** If the standard pattern buries the
   page's single most important action, adjust emphasis (e.g. promote to accent) rather than
   inventing a new component. Then feed the case back into the system.
5. **Clarity beats motion.** If an animation delays comprehension or a user has reduced motion
   set, cut the animation. State must be legible with zero motion.

A useful tiebreak question: *"Which choice keeps the framework cool and the attention warm?"*
Most conflicts dissolve once temperature discipline is restated.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Reserve amber (`accent`) for the single CTA that must dominate the view — "Start free trial" | Don't put two warm buttons (accent + danger, or two accents) in the same view competing for attention |
| Use cool blue `#2563EB` primary buttons for routine main actions like "Save changes" | Don't use amber for routine actions just because it "pops" — scarcity is what makes warm work |
| Build surfaces and structure from the cool gray ramp (`gray-50`–`gray-950`) | Don't introduce warm grays, beiges, or off-spec hues into backgrounds and borders |
| Use dark text (`gray-900`) on amber action backgrounds, as the tokens do | Don't put white text on amber-500 — it fails the 4.5:1 contrast floor |
| Let components consume only semantic tokens (`--mx-color-action-primary-bg`) | Don't reference primitives like `blue-600` directly in component CSS — dark mode will break |
| Prove hierarchy with size, weight, and spacing first, then add the one warm accent | Don't add gradients, extra colors, or shadows to fake hierarchy a layout doesn't have |
| Keep the 2px `--mx-focus-ring` outline visible on every interactive element | Don't set `outline: none` without providing the system focus ring replacement |
| Pair every warm signal with an icon or text ("⚠ Payment failed") | Don't rely on red or amber color alone to communicate an error or warning |
| Animate state changes at 120–320ms with `--mx-motion-easing-standard` | Don't add looping, decorative, or >320ms animations to everyday UI |
| Mark docs-only rules "(defined by docs, not yet in code)" and file a token proposal | Don't present unimplemented guidance as if the build enforces it |

## Checklist

- [ ] Surfaces, borders, and text use only the cool gray/blue/teal framework
- [ ] At most one warm (accent) CTA is visible in the view
- [ ] Warm color appears only on CTAs, warnings, or destructive actions — never decoration
- [ ] Hierarchy is legible in grayscale (size, weight, spacing carry it)
- [ ] All text meets 4.5:1 contrast; UI parts meet 3:1
- [ ] Every interactive element shows the 2px focus ring on `:focus-visible`
- [ ] No color-only signals — warm states pair with icon or text
- [ ] Components consume semantic tokens only; no raw ramp values in component CSS
- [ ] Motion uses system durations/easings and respects `prefers-reduced-motion`
- [ ] Any rule not backed by `@maxilius/tokens` is flagged as docs-defined

## Related

- [01 · Color](./01-color.md) — the temperature principle applied to every hex value
- [02 · Typography](./02-typography.md) — hierarchy through the Inter type scale
- [03 · Spacing, layout, and grid](./03-spacing-layout-grid.md) — the 4px framework
