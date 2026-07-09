# 20 · Governance — Cloud Design System
> How the system stays a system: one source of truth, versioned like an API, changed through a visible process.

## Principles

1. **The docs are the system.** These documents plus the token sheet (doc 18) are the single source of truth — not a Figma file, not tribal memory.
2. **Tokens and components are an API.** They get semantic versions, deprecation periods, and changelogs like any dependency.
3. **Anyone proposes, the system team decides.** Contribution is open; merging is curated.
4. **Documented exceptions beat silent forks.** Breaking from the system is allowed — undocumented drift is not.
5. **The system earns adoption.** If teams route around it, fix the system, not the teams.

## The system

### Source of truth

| Artifact | Role |
|---|---|
| Docs `01`–`20` in this folder | Canonical rules and values |
| Token sheet (`:root` block, doc 18) | Canonical machine-readable values |
| Generated exports (Sass/JS/Tailwind/JSON) | Derived — never hand-edited |
| Changelog | Record of every released change |

Conflict resolution: token sheet wins over prose; newer release wins over older; if two docs disagree, file an issue — don't pick silently.

### Semantic versioning

The system ships as one versioned package: `cds@MAJOR.MINOR.PATCH`.

| Bump | When | Examples |
|---|---|---|
| **Major** | Breaking: token renamed/removed, component API changed, visual change that breaks layouts | Removing `--cds-color-text-muted`; changing radius-md from 10px |
| **Minor** | Additive: new tokens, new components, new variants, new docs | Adding `--cds-color-bg-raised`; shipping a Combobox |
| **Patch** | Fixes with no API change | Correcting a hex typo; fixing focus-ring offset in one component |

A visual-only change that alters rendered output significantly (e.g., new shadow values) is at least **minor** and must be called out in the changelog.

### Component maturity stages

| Stage | Meaning | Rules |
|---|---|---|
| **Experimental** | In trial, API may change without major bump | Opt-in, labeled in docs, not for critical flows |
| **Stable** | Fully documented, versioned, supported | Breaking changes require a major release |
| **Deprecated** | Scheduled for removal | Replacement documented; removed no earlier than the next major |

### Deprecation policy

1. **Announce** in the changelog and the component/token's doc section, with the replacement named.
2. **Alias** old tokens to new ones for **at least one full major cycle**: `--cds-color-brand: var(--cds-color-action-primary);`.
3. **Warn** where tooling allows (lint rule, console warning in dev builds).
4. **Remove** only in a major release, listed under "Breaking" in the changelog.

### Design review checklist for new components

A component is not "stable" until all of these pass:

- [ ] Accessibility pass (doc 15): contrast, focus ring, keyboard, screen reader, 44px targets
- [ ] All states defined: default, hover, active, focus-visible, disabled, loading, error where applicable
- [ ] Responsive behavior specified at every breakpoint (doc 16)
- [ ] Dark mode verified against the remap (doc 19) — no hardcoded values
- [ ] Consumes semantic tokens only (doc 18)
- [ ] Do/Don't section written with ≥8 concrete pairs
- [ ] Copy follows voice rules: sentence case, verb + noun buttons (doc 17)
- [ ] Naming reviewed against existing patterns (see below)

### Naming review

Before any new token or component name merges: does it follow the grammar (`--cds-{category}-{role}-{variant}-{state}`)? Does an existing name already cover the role? Is it role-based, not appearance-based? Would it collide or confuse alongside current names (e.g., don't add `bg-elevated` when `bg-raised` exists)? Two approvals required: one design, one engineering.

### Changelog discipline

Every release gets an entry: version, date, sections **Breaking / Added / Changed / Fixed / Deprecated**. Each line names the token/component and the migration path. No release without a changelog entry — CI should enforce it.

### When to break from the system

Sometimes a product genuinely needs an exception (a data-viz palette, a denser table, a marketing one-off):

1. Try the system first and note where it failed.
2. Document the exception where it lives in code: what, why, owner, date.
3. Report it to the system team.
4. **Promote repeated exceptions**: the same exception appearing in 2–3 places is a feature request — bring it into the system so everyone gets it.

An exception without documentation is a bug.

## Process

The contribution flow, from idea to release:

```
propose → discuss → prototype → document → release
```

| Step | What happens | Exit criteria |
|---|---|---|
| **Propose** | Issue using the proposal template: problem, evidence (≥2 real use cases), suggested approach | System team triages within a week |
| **Discuss** | Open thread; check overlap with existing tokens/components; naming review | Agreed scope and name |
| **Prototype** | Build in isolation with semantic tokens; test light + dark, all breakpoints, keyboard | Design review checklist passes |
| **Document** | Write the doc section following the template — including Do/Don't pairs and checklist | Docs reviewed by design + engineering |
| **Release** | Version bump per semver, changelog entry, announce | Shipped and adopted |

Proposal template:

```markdown
## Proposal: <name>
**Problem** — what can't be done with the current system?
**Evidence** — links to ≥2 real screens/use cases that need this.
**Proposed solution** — tokens/values/behavior, following the naming grammar.
**Alternatives considered** — including "do nothing" and existing components.
**Impact** — semver level, affected docs, migration needed?
```

## Usage

Deprecating a token (minor release announces, major release removes):

```css
:root {
  /* v2.3.0 — DEPRECATED: use --cds-color-action-primary. Removed in v3.0.0. */
  --cds-color-brand: var(--cds-color-action-primary);
}
```

Changelog entry:

```markdown
## 2.3.0 — 2026-07-09
### Added
- `--cds-color-bg-raised` for dark-mode elevated surfaces (docs 18, 19)
- Combobox component (experimental)
### Deprecated
- `--cds-color-brand` — use `--cds-color-action-primary`. Alias kept until 3.0.0.
### Fixed
- Focus ring offset on ghost buttons was 1px; corrected to 2px per doc 15.
```

Documented exception in product code:

```css
/* CDS exception — 2026-07-09 — owner: @data-platform
   Why: 8-series categorical palette for charts; CDS defines no data-viz ramp.
   Reported: design-system#214. Promote if a second team needs charts. */
.chart-series-1 { fill: #0284C7; }
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Treat docs + token sheet as the only source of truth | Don't let a stale Figma library or one team's fork become the de facto system |
| Bump major when renaming or removing any `--cds-*` token | Don't rename `--cds-color-border-default` in a patch "because it's small" |
| Alias deprecated tokens for at least one full major cycle | Don't delete a token the same week you deprecate it |
| Open a proposal with two real use cases before building | Don't merge a new component because one screen needed it once |
| Label experimental components and keep them out of critical flows | Don't ship an experimental combobox into the checkout page |
| Run the design review checklist before marking anything stable | Don't call a component stable with no disabled state and no dark-mode audit |
| Write a changelog line with a migration path for every change | Don't release with "misc fixes and improvements" |
| Document exceptions in code with what/why/owner/date and report them | Don't quietly hardcode `#7C3AED` because the campaign needed purple |
| Promote an exception into the system once it appears 2–3 times | Don't let five teams each maintain their own dense-table hack |
| Require one design + one engineering approval on naming | Don't let `bg-elevated`, `bg-raised`, and `bg-float` coexist meaning the same thing |

## Checklist

- [ ] Change classified correctly: major (breaking) / minor (additive) / patch (fix)
- [ ] Changelog entry written with migration path
- [ ] Deprecated tokens aliased, announced, and scheduled for a major removal
- [ ] New names pass the grammar and collision review with two approvals
- [ ] New components passed the full design review checklist (a11y, states, responsive, dark mode, Do/Don'ts)
- [ ] Experimental work is labeled and isolated from critical flows
- [ ] Generated exports rebuilt from the token sheet — no hand edits
- [ ] Exceptions documented in code and reported to the system team
- [ ] Repeated exceptions triaged for promotion into the system

## Related

- [18 · Design tokens](./18-design-tokens.md) — the token sheet this process protects
- [19 · Theming and dark mode](./19-theming-dark-mode.md) — theme changes follow the same flow
- [15 · Accessibility](./15-accessibility.md) — the non-negotiable review gate
- [17 · Content, voice and tone](./17-content-voice-tone.md) — doc writing standards
