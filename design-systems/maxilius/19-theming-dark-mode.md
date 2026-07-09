# 19 · Theming and dark mode — Maxilius Design System

> Dark mode is a token swap, not a redesign: light and dark define identical semantic role paths, so every component themed with `--mx-*` roles gets dark mode for free.

## Principles

1. **Two tiers, one contract.** Primitives (`gray-50`…`gray-950`, `blue-*`, `teal-*`, `amber-*`, `red-*`, `green-*`) are raw material. Components consume only semantic roles (`bg.*`, `text.*`, `border.*`, `action.*`, `feedback.*`, `focus.*`). Themes remap roles to different primitives — components never change.
2. **Identical paths, build-enforced.** `src/semantic/light.json` and `src/semantic/dark.json` must define exactly the same set of role paths. The token build fails if a role exists in one theme and not the other, so a component can never reference a token that is missing in dark mode.
3. **Never pure black, never pure white text.** Dark canvas is `gray-950 #020617`, body text is `gray-50 #F8FAFC`. Pure `#000000`/`#FFFFFF` pairs cause halation and crush elevation.
4. **In dark mode, interaction lightens.** Solid action backgrounds keep their step (blue-600), but hover and active move *up* the lightness ramp (600 → 500 → 400) instead of down.
5. **Elevation is color, not shadow.** Dark surfaces communicate raised layers with lighter grays (`bg-surface-raised` = gray-800) rather than stronger shadows.

## The system

### How the build produces two themes

```
primitives (color.json)        semantic/light.json         semantic/dark.json
gray-50…950, blue-*, …   →     bg.canvas = gray-50    |    bg.canvas = gray-950
                               text.link = blue-600   |    text.link = blue-400
                               (same role paths — the build fails on any mismatch)
                                        ↓
                     tokens.css: :root / [data-theme] blocks + prefers-color-scheme fallback
```

The build emits one `tokens.css` containing the light values on `:root` and `[data-theme="light"]`, the dark values on `[data-theme="dark"]`, and a `@media (prefers-color-scheme: dark)` block that applies dark values when no `data-theme` attribute is set. It also sets `color-scheme: light`/`dark` per theme so native controls, scrollbars, and form widgets match.

### Dark mappings — surfaces, text, borders

| Role (`--mx-…`) | Light | Dark |
|---|---|---|
| bg-canvas | gray-50 `#F8FAFC` | gray-950 `#020617` |
| bg-surface | white `#FFFFFF` | gray-900 `#0F172A` |
| bg-surface-raised | white `#FFFFFF` | gray-800 `#1E293B` |
| bg-surface-sunken | gray-100 `#F1F5F9` | gray-950 `#020617` |
| bg-inverse | gray-900 `#0F172A` | gray-50 `#F8FAFC` |
| bg-overlay | rgb(2 6 23 / 0.55) | rgb(2 6 23 / 0.7) |
| text-primary | gray-900 `#0F172A` | gray-50 `#F8FAFC` |
| text-secondary | gray-600 `#475569` | gray-300 `#CBD5E1` |
| text-muted | gray-400 `#94A3B8` | gray-500 `#64748B` |
| text-link | blue-600 `#2563EB` | blue-400 `#60A5FA` |
| text-success / warning / danger | green-600 / amber-600 / red-600 | green-400 / amber-400 / red-400 |
| border-subtle / default / strong | gray-100 / gray-200 / gray-300 | gray-800 / gray-700 / gray-600 |
| border-focus, focus-ring | blue-500 `#3B82F6` | blue-400 `#60A5FA` |

### Dark mappings — actions (hover/active lighten)

| Role | Light bg / hover / active | Dark bg / hover / active |
|---|---|---|
| action-primary | blue-600 / blue-700 / blue-800 | blue-600 / blue-500 / blue-400 |
| action-secondary | teal-600 / teal-700 / teal-800 | teal-600 / teal-500 / teal-400 |
| action-accent | amber-500 / amber-600 / amber-700 (text gray-900) | amber-500 / amber-400 / amber-300 (text gray-950) |
| action-danger | red-600 / red-700 / red-800 | red-600 / red-500 / red-400 |
| action-neutral | white / gray-50 / gray-100 | gray-800 / gray-700 / gray-600 |
| action-disabled bg / text / border | gray-100 / gray-400 / gray-200 | gray-800 / gray-600 / gray-700 |

### Dark mappings — subtle pairs and feedback invert 50/700 → 950/300

| Role | Light | Dark |
|---|---|---|
| action-primary-subtle bg / text | blue-50 / blue-700 | blue-950 / blue-300 |
| action-accent-subtle bg / text | amber-50 / amber-700 | amber-950 / amber-300 |
| feedback-info bg / border / text / icon | blue-50 / blue-200 / blue-700 / blue-600 | blue-950 / blue-800 / blue-300 / blue-400 |
| feedback-success | green-50 / 200 / 700 / 600 | green-950 / 800 / 300 / 400 |
| feedback-warning | amber-50 / 200 / 700 / 600 | amber-950 / 800 / 300 / 400 |
| feedback-danger | red-50 / 200 / 700 / 600 | red-950 / 800 / 300 / 400 |

### Theme selection strategy

| State of `<html>` | Resulting theme |
|---|---|
| `data-theme="light"` | light, always |
| `data-theme="dark"` | dark, always |
| no attribute | OS preference via `prefers-color-scheme` |

Persist an explicit user choice (e.g. `localStorage.mx-theme`); absence of a stored choice means "follow the OS".

## Tokens

```css
/* Emitted by the token build — excerpt. Same paths in both themes, enforced at build time. */
:root, [data-theme="light"] {
  color-scheme: light;
  --mx-bg-canvas: #F8FAFC;
  --mx-bg-surface: #FFFFFF;
  --mx-bg-surface-raised: #FFFFFF;
  --mx-text-primary: #0F172A;
  --mx-text-link: #2563EB;
  --mx-border-default: #E2E8F0;
  --mx-focus-ring: #3B82F6;
  --mx-action-primary-bg: #2563EB;
  --mx-action-primary-bg-hover: #1D4ED8;   /* darkens */
  --mx-action-primary-subtle-bg: #EFF6FF;
  --mx-action-primary-subtle-text: #1D4ED8;
}

[data-theme="dark"] {
  color-scheme: dark;
  --mx-bg-canvas: #020617;
  --mx-bg-surface: #0F172A;
  --mx-bg-surface-raised: #1E293B;
  --mx-text-primary: #F8FAFC;
  --mx-text-link: #60A5FA;
  --mx-border-default: #334155;
  --mx-focus-ring: #60A5FA;
  --mx-action-primary-bg: #2563EB;
  --mx-action-primary-bg-hover: #3B82F6;   /* lightens */
  --mx-action-primary-subtle-bg: #172554;
  --mx-action-primary-subtle-text: #93C5FD;
}

/* OS fallback when no data-theme is set — built into tokens.css */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) { color-scheme: dark; /* …dark values… */ }
}
```

## Usage

### No-flash boot snippet

Set the theme before first paint. Inline this in `<head>`, before any stylesheet:

```html
<script>
  (function () {
    var t = localStorage.getItem('mx-theme'); /* 'light' | 'dark' | null */
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    } /* no attribute = follow prefers-color-scheme via tokens.css */
  })();
</script>
```

### Theme toggle

```html
<button class="mx-btn mx-btn--ghost" id="theme-toggle" aria-label="Switch theme">
  <svg class="mx-icon" aria-hidden="true"><!-- sun / moon icon --></svg>
</button>
<script>
  document.getElementById('theme-toggle').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mx-theme', next);
  });
</script>
```

### Images in dark mode

Full-bleed photos usually survive both themes; UI screenshots and diagrams on white do not. Dim media slightly on dark canvas and swap theme-specific assets with `<picture>`:

```css
[data-theme="dark"] img.mx-media { filter: brightness(0.9); }
```

```html
<picture>
  <source srcset="diagram-dark.svg" media="(prefers-color-scheme: dark)" />
  <img src="diagram-light.svg" alt="Token build pipeline" />
</picture>
```

Prefer `currentColor` SVGs (like the built-in icon set) — they retheme automatically.

### Re-theming the brand

Because components only ever see semantic roles, a brand refresh is a primitive swap: replace the blue ramp with your brand ramp in `src/primitives/color.json`, keep the semantic files pointing at the same steps (`action-primary-bg` = ramp-600 light, hover ramp-500 dark, subtle 50/700 → 950/300), and both themes update everywhere. Verify contrast at the consumed steps (600 on white, 400 on gray-950) before shipping.

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Style components with semantic roles (`--mx-bg-surface`, `--mx-text-primary`) so dark mode is automatic | Don't hardcode `#FFFFFF` or reference primitives like `--mx-color-gray-50` in component CSS — they won't flip in dark mode |
| Use gray-950 `#020617` as the dark canvas and gray-50 `#F8FAFC` for body text | Don't use pure black backgrounds or pure white body text — the contrast is harsh and elevation disappears |
| Lighten hover/active in dark mode: primary blue-600 → 500 → 400 | Don't darken hover states in dark mode — buttons vanish into the gray-900 surface |
| Invert subtle pairs in dark: blue-50 bg / blue-700 text becomes blue-950 / blue-300 | Don't reuse light tint pairs in dark — blue-50 as a badge background glows like a flashlight on gray-950 |
| Show dark elevation with lighter surfaces (`bg-surface-raised` = gray-800) | Don't crank shadow opacity to fake elevation on dark surfaces — shadows are nearly invisible on gray-950 |
| Inline the boot snippet in `<head>` so the theme is set before first paint | Don't set `data-theme` in your app bundle after hydration — users get a white flash on every load |
| Leave `data-theme` unset for users with no stored preference, so the OS decides | Don't force `data-theme="light"` as a default — it overrides `prefers-color-scheme` for everyone |
| Use `text-link` (blue-600 light / blue-400 dark) for links in both themes | Don't keep blue-600 links on gray-900 surfaces — the pair fails 4.5:1 contrast in dark mode |
| Set `color-scheme` per theme so scrollbars and native form controls match | Don't leave native controls light-themed inside a dark page — mismatched scrollbars flag a half-done theme |
| Run the full checklist in doc 22 in *both* themes before shipping a screen | Don't ship a screen verified only in light mode — inverted tints and image contrast break silently in dark |

## Checklist

- [ ] Every color in the feature comes from a semantic `--mx-*` role; zero raw hexes or primitive references in component CSS.
- [ ] Screen reviewed in `data-theme="dark"`: canvas is gray-950, surfaces gray-900/800, no white flashes.
- [ ] Hover and active states visibly *lighten* in dark mode on all solid buttons.
- [ ] Badges, subtle buttons, and feedback banners use inverted tints (950 bg / 300 text) in dark.
- [ ] Boot snippet inlined in `<head>`; no theme flash on hard reload in either theme.
- [ ] Stored user choice wins; with no choice, changing the OS theme changes the page.
- [ ] Text contrast ≥ 4.5:1 verified in both themes (links, muted text, subtle-text pairs).
- [ ] Images, screenshots, and illustrations checked on gray-950; theme-specific assets swapped where needed.
- [ ] Focus ring visible in both themes (blue-500 light / blue-400 dark, 2px at 2px offset).

## Related

- [00 · Design principles](./00-design-principles.md) — the two-tier architecture and "cool framework, warm action"
- [20 · Governance](./20-governance.md) — how theme token changes are versioned and released
- [21 · Visual hierarchy](./21-visual-hierarchy.md) — temperature and contrast levers that must survive both themes
- [22 · Design process](./22-design-process.md) — the dark mode pass in the verification step
