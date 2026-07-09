# 20 · Governance — Maxilius Design System

> How Maxilius evolves without breaking: code is the source of truth, semver is the contract, and every change ships with its documentation.

## Principles

1. **Code is the source of truth.** The DTCG token JSON in `@maxilius/tokens` and the component source in `@maxilius/react` define the system. Docs describe what the code does; when they disagree, the code wins and the doc gets fixed.
2. **Docs move with code, in the same PR.** A PR that changes a token value, renames a role, or alters a component API is incomplete until the affected docs are updated in that same PR. There is no "docs later" lane.
3. **Semver is a promise to consumers.** Anyone can upgrade a minor or patch release of `@maxilius/tokens` or `@maxilius/react` without touching their code. Anything that breaks that promise is a major.
4. **Deprecate loudly, remove slowly.** Nothing disappears without an alias, a console/build warning, and at least one full major version of overlap.
5. **Exceptions are documented or they are bugs.** A deliberate deviation from the system carries a written rationale and an owner; an undocumented deviation is drift to be fixed.

## The system

### Sources of truth

| Question | Answer lives in |
|---|---|
| What color/space/type value is correct? | `packages/tokens/src/**/*.json` (primitives + `semantic/light.json` / `semantic/dark.json`) |
| How does a component behave? | `packages/react/src/components/**` (props, states, a11y wiring) |
| How should I use it? | `@maxilius/docs` — must match the two above |
| What changed between versions? | `CHANGELOG.md` in each package |

### Semver for `@maxilius/tokens` and `@maxilius/react`

| Release | Tokens examples | React examples |
|---|---|---|
| **Major** | Rename or remove a semantic role (`--mx-text-muted` → gone); change a role's meaning; drop a theme path | Remove a component or prop; rename a variant (`ghost` → `plain`); change default behavior (e.g. Accordion `multiple` default) |
| **Minor** | Add a new role or primitive step; add a new theme; add aliases | New component; new prop/variant/size; new icon in the built-in set |
| **Patch** | Fix a hex that violated its own contrast contract; fix build output | Bug fix with identical API; a11y fix; CSS fix that doesn't change layout intent |

Changing a token's *value* (not its name) is normally a **minor** — consumers reference the role, not the hex. Exception: a value change that breaks a documented guarantee (contrast floor, control height) is treated as major.

### Component maturity stages

| Stage | Meaning | Allowed to change |
|---|---|---|
| **experimental** | In Storybook behind an `unstable_` export; API exploring | Anything, any release |
| **beta** | Exported, docs drafted, a11y pass done | API may change in minors, with changelog notice |
| **stable** | Fully documented with do/don'ts; covered by semver | Breaking changes only in majors |
| **deprecated** | Superseded; alias + warning in place | Removed no sooner than the next major |

All 20 shipped components in `@maxilius/react` are stable unless the changelog says otherwise.

### Deprecation protocol

1. Mark it: `@deprecated` JSDoc on props/components; alias file for tokens (old role name → new role) emitted in `tokens.css`.
2. Warn once per session in development builds, naming the replacement.
3. Document the migration in the changelog and the affected doc page.
4. Keep the alias working for **at least one full major version** after the deprecation ships.
5. Remove in the following major, listed in that major's "Breaking changes" section.

### Documented-exception protocol

When a product screen genuinely can't follow the system (rare):

1. Try the system first and record why it fails (screenshot or Storybook link).
2. Get sign-off from a design system maintainer.
3. Add an entry to the exceptions log (`docs/exceptions.md`): what, where, why, owner, review-by date.
4. Re-review each major release — expired exceptions are either promoted into the system or removed.

## Process

The contribution flow for anything new — token, variant, or component:

1. **Propose.** Open an issue: the job to be done, why existing pieces (check the 20-component inventory first) can't do it, and 2-3 real product screens that need it.
2. **Prototype in Storybook.** Build it with semantic tokens only, all states (hover, active, focus-visible, disabled, loading where relevant), all sizes, both themes. No new primitives unless the proposal is *about* primitives.
3. **A11y pass.** Contrast in both themes, keyboard operation, focus ring, screen reader labels, `prefers-reduced-motion`. Nothing advances to beta without this.
4. **Document with do/don'ts.** Write the doc page following the standard template — minimum 8 ✅/❌ pairs. The PR contains code + stories + docs together.
5. **Release.** Changelog entry, semver bump per the table above, announce in the release notes with migration steps if anything was deprecated.

### Changelog discipline

- Every user-visible change gets a line in `CHANGELOG.md` under **Breaking / Added / Changed / Fixed / Deprecated**.
- Breaking entries always include a before → after migration snippet.
- Token changes name the exact role path (`action.accent.bg-hover`), never "tweaked some colors".
- The changelog is written in the PR that makes the change, not at release time from memory.

## Usage

### A token change PR, end to end

```html
<!-- Before: doc 05 said secondary hover was teal-700 and the code agreed. -->
<!-- The PR that changes semantic/light.json MUST also update the doc table. -->
<button class="mx-btn mx-btn--secondary">Export report</button>
```

```css
/* PR diff — packages/tokens/src/semantic/light.json (rendered) */
--mx-action-secondary-bg-hover: #0F766E; /* teal-700 — unchanged role path, minor release */

/* Same PR — design-systems/maxilius/05-*.md updated to match,
   CHANGELOG.md gains: "Changed: action.secondary.bg-hover now teal-700 (was …)" */
```

### Consuming with confidence

```css
/* Safe across minors: role paths are stable, values may improve. */
.promo-card {
  background: var(--mx-bg-surface);
  border: var(--mx-border-width-thin) solid var(--mx-border-default);
  border-radius: var(--mx-radius-lg);
  padding: var(--mx-space-6);
}
/* Pin exact hexes only in brand collateral (doc 23), never in product UI. */
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Update the affected doc pages in the same PR that changes a token or component API | Don't merge a token rename with a "will document next sprint" note — the docs are now lying |
| Treat removing or renaming `--mx-text-muted` as a major release with an alias | Don't slip a role rename into a minor because "it's just one variable" |
| Ship a value-only change (same role, new hex) as a minor with a changelog line naming the role path | Don't silently change hexes and call it a patch — consumers snapshot-test rendered colors |
| Check the 20-component inventory and try composition before proposing a new component | Don't build a one-off `FancyCard` in product code when `Card` + `interactive` + tokens already covers it |
| Run the a11y pass (contrast both themes, keyboard, focus, reduced motion) before beta | Don't promote a component to stable with an open contrast failure "to be fixed later" |
| Keep a deprecated alias working for at least one full major and warn with the replacement name | Don't delete the old token in the same release you deprecate it |
| Log a deliberate deviation in the exceptions log with owner and review-by date | Don't fork a component locally and keep the change private to your team |
| Write changelog entries in the change PR, naming exact role paths and props | Don't reconstruct the changelog from git log at release time |
| Fix the doc when code and doc disagree — after confirming the code is intentional | Don't "fix" shipped token values to match an outdated doc without a proposal |
| Mark rules that exist only in docs as "(defined by docs, not yet in code)" | Don't present doc-only guidance (breakpoints, 60-30-10) as build-enforced constraints |

## Checklist

- [ ] PR touching tokens/components includes the matching doc updates and a changelog entry.
- [ ] Version bump matches the table: breaking = major, additive = minor, fix = patch.
- [ ] Any removed or renamed token/prop has an alias plus a development-build warning.
- [ ] New component proposal cites real screens and explains why existing components can't compose it.
- [ ] Storybook covers all variants, sizes, states, and both themes before review.
- [ ] A11y pass recorded (contrast in light and dark, keyboard, focus-visible, reduced motion).
- [ ] New/changed docs follow the template with ≥ 8 do/don't pairs.
- [ ] Deviations from the system are in the exceptions log with an owner and review date.
- [ ] Release notes include migration snippets for every breaking or deprecated item.

## Related

- [00 · Design principles](./00-design-principles.md) — "code is the source of truth" as a founding principle
- [19 · Theming and dark mode](./19-theming-dark-mode.md) — the build-enforced identical-paths rule this process protects
- [22 · Design process](./22-design-process.md) — the per-screen workflow that consumes what governance releases
- [23 · Brand and logo](./23-brand-logo.md) — brand assets versioned alongside, but outside, product tokens
