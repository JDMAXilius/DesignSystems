# 23 · Governance & versioning — Aurora Design System

> How one system stays coherent across two platforms: a single token source of truth, semver on the token package and both libraries, and a contribution flow that ships SwiftUI and React Native in lockstep.

## Principles

- **One source of truth.** DTCG tokens plus these docs define Aurora. SwiftUI and RN are generated consumers, never independent definitions.
- **Lockstep platforms.** iOS and RN track the same token version; a component is not "stable" until it exists and matches on both.
- **Semver means something.** A major bump is a promise that something breaking changed; patch/minor never break a consumer.
- **Deprecate, don't yank.** Removed tokens live on as aliases for at least one major so consumers can migrate.
- **Every change is documented and reversible.** Do/don'ts, a changelog entry, and an exception record accompany each change.

## The system

### Source of truth

```
DTCG tokens (json/tokens.json)  +  these docs (00–23)
        │  Style Dictionary v4
        ├─ ios/AuroraTokens.swift   (Aurora.*)
        ├─ rn/tokens.ts             (tokens.*)
        └─ figma/variables.json
```

Design decisions land in tokens and docs first; generated outputs follow. No platform library hand-edits a value that a token should own.

### Semver — what each bump means

Applies to the **token package** and to **each platform library** (aurora-ios, aurora-rn).

| Bump | Token package | Platform library |
|---|---|---|
| **Major** | Rename or remove a token; change a token's meaning | Component API break (removed/renamed prop, changed default behavior) |
| **Minor** | Add a token; add a component token group | Add a component or a backward-compatible prop |
| **Patch** | Fix a wrong value, description, or build output | Bug fix with no API change |

**Lockstep rule:** aurora-ios and aurora-rn declare the **same token-package major.minor**. They may differ in patch (a platform-only bug fix), but never in major or minor — if RN needs tokens `2.3.x`, iOS ships on `2.3.x` too.

### Contribution flow

1. **Propose** — open a proposal: the problem, the one primary use, why existing components (09–16) don't cover it.
2. **Prototype on BOTH platforms** — a working SwiftUI and a working React Native sample consuming only semantic tokens.
3. **Accessibility pass** — contrast (AA), VoiceOver labels/traits, Dynamic Type reflow, 44pt targets, Reduce Motion. Per [20-accessibility.md](20-accessibility.md).
4. **Document with do/don'ts** — a doc following the template, minimum 8 Do/Don't pairs, both platform snippets.
5. **Release** — version bump per the table, changelog entry, migration notes if major.

A change cannot skip step 2 or 3. One-platform contributions are not merged.

### Component maturity

| Stage | Meaning | Rules |
|---|---|---|
| **Experimental** | In use, API may change | Marked in docs; not in the parity guarantee; no deprecation promise |
| **Stable** | Production-ready | Exists on BOTH platforms, passes the parity checklist and a11y, semver-protected |
| **Deprecated** | Being retired | Still works; docs point to the replacement; removed no earlier than the next major |

Promotion to **stable requires the parity checklist to pass** (below). Experimental components carry a visible banner in their doc.

### Deprecation with token aliases

- When a token is renamed or removed, keep the old name as an **alias** to the new value for **≥1 major**.
- Emit a build-time deprecation warning from Style Dictionary; document the mapping in the changelog.
- Only drop the alias in the major after the one that introduced the replacement.

```jsonc
// DTCG: old token kept as an alias for ≥1 major
"color": {
  "action": {
    "primary": { "bg": { "$value": "{color.violet.500}", "$type": "color" } },
    // deprecated in 2.0, alias retained through 2.x, removable in 3.0
    "cta":     { "bg": { "$value": "{color.action.primary.bg}", "$type": "color",
                         "$deprecated": "Use color.action.primary.bg" } }
  }
}
```

### Keeping iOS and RN in sync — parity checklist

A component is **stable on both or stable on neither.** Before promotion:

- [ ] Same semantic tokens consumed on both platforms.
- [ ] Same variants, sizes, and states exist on both.
- [ ] Same VoiceOver/TalkBack labels, traits, and grouping.
- [ ] Same motion intent (spring tokens ↔ Reanimated), both honoring Reduce Motion.
- [ ] Same haptic intent (iOS impact/selection/notification; RN degrades on Android, documented).
- [ ] Both pinned to the same token-package major.minor.
- [ ] Do/Don't and both snippets present in the doc.

### Changelog discipline

- One human-readable `CHANGELOG.md` per package, newest first, grouped Added / Changed / Deprecated / Removed / Fixed.
- Every entry names the token or component and links the proposal.
- Major entries include a **migration section** (old → new, alias window).

### Documented-exception protocol

Sometimes a screen must break a rule. Record it, don't hide it:

1. State the rule broken and why (the one-line justification).
2. Scope it (which screen/component, how long).
3. Get sign-off from a system owner.
4. Log it in the exceptions register with a review date.

An undocumented deviation is a bug; a documented exception is a decision.

## Process

Governance owns no color/size values; it governs the token package that holds them.

| DTCG group | Swift | TS |
|---|---|---|
| `$deprecated` (DTCG metadata) | (build warning) | (build warning) |
| package version (`tokens.meta.version`) | `Aurora.version` | `tokens.meta.version` |

## Usage

### SwiftUI — consuming a versioned, semantic token (not a primitive)

```swift
// ✅ Consume the semantic role; it survives primitive renames behind the alias
RoundedRectangle(cornerRadius: Aurora.Radius.lg, style: .continuous)
    .fill(Aurora.Color.actionPrimaryBg)      // moves with the token, not a hard-coded hex

// Version is generated from the token package — assert lockstep in a smoke test
assert(Aurora.version.hasPrefix("2.3"))      // iOS pinned to the same major.minor as RN
```

### React Native — same semantic token, same pinned version

```tsx
import { tokens } from '../tokens';

// ✅ Semantic token; a primitive rename is absorbed by the DTCG alias
const styles = {
  cta: {
    backgroundColor: tokens.color.action.primary.bg,
    borderRadius: tokens.radius.lg,
  },
};

// Lockstep check in CI
if (!tokens.meta.version.startsWith('2.3')) throw new Error('RN token version out of lockstep');
```

**iOS-first / Android note:** the token package is platform-neutral; iOS-first decisions (HIG behaviors, SF Symbols) are documented per component, and the RN library notes the Android/Material equivalent. Neither library forks a token value — divergence lives in component code and is documented, never in the tokens.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Change values in DTCG tokens, then regenerate both platforms. | Hand-edit `AuroraTokens.swift` or `tokens.ts` to tweak a value. |
| Pin aurora-ios and aurora-rn to the same token major.minor. | Let iOS ship on tokens 2.4 while RN sits on 2.2. |
| Bump major when you rename or remove a token. | Slip a token rename into a patch release. |
| Prototype a new component on both platforms before review. | Merge an iOS-only component and promise RN "later". |
| Keep a renamed token as an alias for ≥1 major with a warning. | Delete the old token name in the same release. |
| Promote to stable only after the parity checklist passes. | Mark a component stable when it exists on one platform. |
| Mark in-flux components experimental in their doc. | Let consumers assume an unfinished API is stable. |
| Write a changelog entry naming the token/component and proposal. | Ship a version with "misc fixes" and no detail. |
| Include a migration section (old → new) on every major. | Break consumers and leave them to guess the new names. |
| Log a rule-break in the exceptions register with a review date. | Quietly deviate from the system and hope no one notices. |
| Route a missing pattern through the proposal flow. | Fork a component variant inside a feature branch. |
| Run the a11y pass (AA, VoiceOver, Dynamic Type, 44pt) before release. | Ship a new component without an accessibility review. |

## Checklist

- [ ] The change landed in DTCG tokens/docs first; outputs are regenerated.
- [ ] Version bump matches the semver table (major/minor/patch).
- [ ] aurora-ios and aurora-rn share the same token major.minor.
- [ ] New/changed components prototyped and passing on BOTH platforms.
- [ ] Accessibility pass complete per doc 20.
- [ ] Renamed/removed tokens keep an alias for ≥1 major with a build warning.
- [ ] Maturity (experimental/stable/deprecated) is set and shown in the doc.
- [ ] Parity checklist passed before any "stable" promotion.
- [ ] Changelog entry written, with a migration section on majors.
- [ ] Any rule-break is recorded in the exceptions register with a review date.

## Related

- [00 · Design principles](00-design-principles.md)
- [09 · Buttons & actions](09-buttons-actions.md)
- [20 · Accessibility](20-accessibility.md)
- [21 · Content, voice & tone](21-content-voice-tone.md)
- [22 · Design process](22-design-process.md)
