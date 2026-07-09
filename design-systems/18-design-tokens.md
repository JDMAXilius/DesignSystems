# 18 · Design tokens — Cloud Design System
> Tokens are the single source of truth: every color, size, and shadow lives as a named value that any stack can consume.

## Principles

1. **One source of truth.** A value exists once, as a token. Change the token, change the product.
2. **Two tiers, one direction.** Primitives hold raw values; semantic tokens give them roles. Components consume only semantic tokens.
3. **Names describe roles, not looks.** `--cds-color-action-primary` survives a rebrand; `--cds-blue` doesn't.
4. **Portable by design.** Tokens are plain values — CSS today, Sass, JS, Tailwind, or DTCG JSON tomorrow.
5. **Tokens are an API.** Renames and removals are breaking changes and follow governance.

## The system

### Two-tier architecture

**Tier 1 — primitives.** Raw values with scale names, no opinion about use: `sky-600`, `cloud-200`, `space-4`, `radius-md`. They never appear in component or page CSS.

**Tier 2 — semantic.** Role-based aliases that point at primitives: `--cds-color-bg-surface`, `--cds-color-text-primary`, `--cds-color-action-primary`. This is the only tier components and pages consume — which is what makes theming (doc 19) a token swap instead of a redesign.

```
primitive            semantic                        consumer
sky-600 #0284C7  →   --cds-color-action-primary  →   .cds-btn-primary { background: var(--cds-color-action-primary); }
```

### Naming grammar

```
--cds-{category}-{role}-{variant}-{state}
```

| Part | Values | Example |
|---|---|---|
| category | color, font, text, space, radius, shadow, duration, ease, z | `--cds-color-…` |
| role | bg, text, border, action, status… | `--cds-color-action-…` |
| variant | primary, secondary, surface, success… | `…-action-primary` |
| state (optional) | hover, active, disabled | `…-action-primary-hover` |

Rules: lowercase, hyphen-separated, no abbreviations beyond `bg`. Primitives keep ramp names (`--cds-sky-600`); semantic tokens never contain a hue or a pixel value in their name.

### The consumption rule

Components and pages use **semantic tokens only**. If a semantic token you need doesn't exist, propose one (doc 20) — don't reach into the primitive tier from a component. Allowed exception: the token sheet itself, where semantic tokens alias primitives.

## Tokens

The complete starter sheet — paste this `:root` block into any site and the whole system works:

```css
:root {
  /* ===== Tier 1 · primitives ===== */
  /* Neutrals — cloud */
  --cds-cloud-0: #FFFFFF;   --cds-cloud-50: #F8FAFC;  --cds-cloud-100: #F1F5F9;
  --cds-cloud-200: #E2E8F0; --cds-cloud-300: #CBD5E1; --cds-cloud-400: #94A3B8;
  --cds-cloud-500: #64748B; --cds-cloud-600: #475569; --cds-cloud-700: #334155;
  --cds-cloud-800: #1E293B; --cds-cloud-900: #0F172A; --cds-cloud-950: #020617;
  /* Primary — sky */
  --cds-sky-50: #F0F9FF;  --cds-sky-100: #E0F2FE; --cds-sky-200: #BAE6FD;
  --cds-sky-300: #7DD3FC; --cds-sky-400: #38BDF8; --cds-sky-500: #0EA5E9;
  --cds-sky-600: #0284C7; --cds-sky-700: #0369A1; --cds-sky-800: #075985;
  --cds-sky-900: #0C4A6E;
  /* Secondary — twilight */
  --cds-twilight-50: #EEF2FF;  --cds-twilight-100: #E0E7FF; --cds-twilight-300: #A5B4FC;
  --cds-twilight-500: #6366F1; --cds-twilight-600: #4F46E5; --cds-twilight-700: #4338CA;
  --cds-twilight-900: #312E81;
  /* Status */
  --cds-green-600: #16A34A; --cds-green-700: #15803D; --cds-green-50: #F0FDF4; --cds-green-200: #BBF7D0;
  --cds-amber-500: #F59E0B; --cds-amber-700: #B45309; --cds-amber-50: #FFFBEB; --cds-amber-200: #FDE68A;
  --cds-red-600: #DC2626;   --cds-red-700: #B91C1C;   --cds-red-50: #FEF2F2;   --cds-red-200: #FECACA;

  /* Spacing — 4px base */
  --cds-space-0: 0;      --cds-space-0-5: 2px;  --cds-space-1: 4px;   --cds-space-2: 8px;
  --cds-space-3: 12px;   --cds-space-4: 16px;   --cds-space-5: 20px;  --cds-space-6: 24px;
  --cds-space-8: 32px;   --cds-space-10: 40px;  --cds-space-12: 48px; --cds-space-16: 64px;
  --cds-space-20: 80px;  --cds-space-24: 96px;  --cds-space-32: 128px;

  /* Radius */
  --cds-radius-xs: 4px;  --cds-radius-sm: 6px;   --cds-radius-md: 10px;
  --cds-radius-lg: 16px; --cds-radius-xl: 24px;  --cds-radius-full: 9999px;

  /* ===== Tier 2 · semantic ===== */
  /* Color roles (light mode) */
  --cds-color-bg-page: var(--cds-cloud-50);
  --cds-color-bg-surface: var(--cds-cloud-0);
  --cds-color-bg-sunken: var(--cds-cloud-100);
  --cds-color-text-primary: var(--cds-cloud-900);
  --cds-color-text-secondary: var(--cds-cloud-600);
  --cds-color-text-muted: var(--cds-cloud-400);       /* large/disabled only */
  --cds-color-text-inverse: var(--cds-cloud-0);
  --cds-color-border-default: var(--cds-cloud-200);
  --cds-color-border-strong: var(--cds-cloud-300);
  --cds-color-action-primary: var(--cds-sky-600);
  --cds-color-action-primary-hover: var(--cds-sky-700);
  --cds-color-action-primary-active: var(--cds-sky-800);
  --cds-color-action-secondary: var(--cds-twilight-600);
  --cds-color-focus-ring: var(--cds-sky-500);
  --cds-color-status-success: var(--cds-green-600);
  --cds-color-status-success-text: var(--cds-green-700);
  --cds-color-status-success-bg: var(--cds-green-50);
  --cds-color-status-success-border: var(--cds-green-200);
  --cds-color-status-warning: var(--cds-amber-500);
  --cds-color-status-warning-text: var(--cds-amber-700);
  --cds-color-status-warning-bg: var(--cds-amber-50);
  --cds-color-status-warning-border: var(--cds-amber-200);
  --cds-color-status-danger: var(--cds-red-600);
  --cds-color-status-danger-text: var(--cds-red-700);
  --cds-color-status-danger-bg: var(--cds-red-50);
  --cds-color-status-danger-border: var(--cds-red-200);
  --cds-color-status-info: var(--cds-sky-600);
  --cds-color-status-info-text: var(--cds-sky-700);
  --cds-color-status-info-bg: var(--cds-sky-50);
  --cds-color-status-info-border: var(--cds-sky-200);
  --cds-gradient-hero: linear-gradient(135deg, #38BDF8 0%, #6366F1 100%);

  /* Typography */
  --cds-font-sans: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --cds-font-mono: "IBM Plex Mono", ui-monospace, "SF Mono", monospace;
  --cds-text-xs: 12px;  --cds-leading-xs: 16px;
  --cds-text-sm: 14px;  --cds-leading-sm: 20px;
  --cds-text-md: 16px;  --cds-leading-md: 24px;
  --cds-text-lg: 18px;  --cds-leading-lg: 28px;
  --cds-text-xl: 20px;  --cds-leading-xl: 28px;
  --cds-text-2xl: 24px; --cds-leading-2xl: 32px;
  --cds-text-3xl: 30px; --cds-leading-3xl: 38px;
  --cds-text-4xl: 36px; --cds-leading-4xl: 44px;
  --cds-text-5xl: 48px; --cds-leading-5xl: 56px;
  --cds-text-6xl: 60px; --cds-leading-6xl: 66px;
  --cds-weight-regular: 400; --cds-weight-medium: 500;
  --cds-weight-semibold: 600; --cds-weight-bold: 700; --cds-weight-extrabold: 800;

  /* Elevation — soft cloud shadows */
  --cds-shadow-1: 0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06);
  --cds-shadow-2: 0 2px 4px rgba(15,23,42,0.04), 0 4px 8px rgba(15,23,42,0.06);
  --cds-shadow-3: 0 4px 8px rgba(15,23,42,0.05), 0 8px 16px rgba(15,23,42,0.08);
  --cds-shadow-4: 0 8px 16px rgba(15,23,42,0.06), 0 16px 32px rgba(15,23,42,0.10);
  --cds-shadow-5: 0 12px 24px rgba(15,23,42,0.08), 0 24px 48px rgba(15,23,42,0.12);

  /* Motion */
  --cds-duration-instant: 100ms; --cds-duration-fast: 150ms;
  --cds-duration-base: 250ms;    --cds-duration-slow: 400ms;
  --cds-ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --cds-ease-exit: cubic-bezier(0.4, 0, 1, 1);

  /* z-index */
  --cds-z-dropdown: 1000; --cds-z-sticky: 1100; --cds-z-overlay: 1300;
  --cds-z-modal: 1400;    --cds-z-popover: 1500; --cds-z-toast: 1700;
  --cds-z-tooltip: 1800;
}
```

## Usage

Components consume semantic tokens only:

```css
.cds-card {
  background: var(--cds-color-bg-surface);
  border: 1px solid var(--cds-color-border-default);
  border-radius: var(--cds-radius-lg);
  padding: var(--cds-space-6);
  box-shadow: var(--cds-shadow-1);
}

.cds-btn-primary {
  background: var(--cds-color-action-primary);
  color: var(--cds-color-text-inverse);
  font: var(--cds-weight-semibold) var(--cds-text-sm)/var(--cds-leading-sm) var(--cds-font-sans);
  min-height: 40px;
  padding-inline: var(--cds-space-4);
  border-radius: var(--cds-radius-md);
  transition: background var(--cds-duration-fast) var(--cds-ease-standard);
}
.cds-btn-primary:hover { background: var(--cds-color-action-primary-hover); }
```

Porting to other formats — the values stay identical, only syntax changes:

```css
/* Sass:      $cds-color-action-primary: #0284C7; */
/* JS:        export const color = { action: { primary: "#0284C7" } }; */
/* Tailwind:  theme.extend.colors.sky[600] = "#0284C7";
              theme.extend.borderRadius.md = "10px"; */
/* DTCG JSON: { "color": { "action": { "primary": { "$value": "#0284C7", "$type": "color" } } } } */
```

Generate all formats from one source (DTCG JSON via Style Dictionary is the recommended pipeline once you outgrow hand-maintained CSS).

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Style buttons with `var(--cds-color-action-primary)` | Don't hardcode `#0284C7` in component CSS — a rebrand would mean a codebase-wide grep |
| Consume only tier-2 semantic tokens in components and pages | Don't use `var(--cds-sky-600)` directly in a component — primitives are for the token sheet |
| Name tokens by role: `--cds-color-bg-surface` | Don't name by appearance: `--cds-white` breaks the moment dark mode maps it to cloud-900 |
| Follow the grammar: `--cds-color-action-primary-hover` | Don't invent orders like `--cds-primary-hover-color` — tooling and search depend on the grammar |
| Add a new semantic token when a role is missing (via doc 20) | Don't overload `--cds-color-text-secondary` for icons, borders, and dividers because it "looks right" |
| Space with the 4px scale: `var(--cds-space-4)` | Don't write `margin: 15px` — off-scale values break rhythm and can't theme |
| Alias status tints to tokens (`--cds-color-status-danger-bg`) | Don't sprinkle raw `#FEF2F2` across alert components |
| Keep one `:root` sheet as source of truth and generate Sass/JS/Tailwind from it | Don't maintain three hand-edited copies that drift apart |
| Treat token renames as breaking changes with an alias period | Don't silently delete `--cds-color-border-default` in a minor release |
| Use `--cds-z-modal` (1400) and friends for stacking | Don't write `z-index: 99999` to win a stacking fight |

## Checklist

- [ ] No raw hex, px, or ms values in component CSS — everything comes from a token
- [ ] Components reference semantic tokens only; primitives appear only in the token sheet
- [ ] New tokens follow `--cds-{category}-{role}-{variant}-{state}`
- [ ] All values match the spec exactly (sky-600 #0284C7, radius-md 10px, space on the 4px grid)
- [ ] Semantic layer covers both light and dark values before a component ships
- [ ] Exports (Sass/JS/Tailwind/JSON) are generated, not hand-copied
- [ ] Additions and deprecations went through governance (doc 20)
- [ ] Deprecated tokens still resolve via aliases for at least one major cycle

## Related

- [19 · Theming and dark mode](./19-theming-dark-mode.md) — remapping semantic tokens per theme
- [20 · Governance](./20-governance.md) — adding, renaming, and deprecating tokens
- [15 · Accessibility](./15-accessibility.md) — contrast constraints on color tokens
- [16 · Responsive](./16-responsive.md) — breakpoint and layout tokens
