# 19 · Theming and dark mode — Cloud Design System
> Because components consume only semantic tokens, a theme is a token remap — dark mode and brand themes without touching a single component.

## Principles

1. **Theming is a token swap, not a redesign.** Components never change; only the values behind semantic tokens do.
2. **Dark mode is its own design.** Remapped ramps, weakened shadows, desaturated tints — not inverted colors.
3. **No pure black, no pure white.** Backgrounds bottom out at cloud-950, text tops out at cloud-50.
4. **Elevation becomes lightness.** In the dark, higher surfaces get lighter — shadows barely read.
5. **Respect the user's choice.** Default to the system preference, persist explicit choices, never flash the wrong theme.

## The system

### Dark mode semantic remap (from the spec)

| Role | Light | Dark |
|---|---|---|
| bg/page | cloud-50 `#F8FAFC` | cloud-950 `#020617` |
| bg/surface | cloud-0 `#FFFFFF` | cloud-900 `#0F172A` |
| bg/raised (sunken in light) | cloud-100 `#F1F5F9` | cloud-800 `#1E293B` |
| text/primary | cloud-900 | cloud-50 `#F8FAFC` |
| text/secondary | cloud-600 | cloud-300 `#CBD5E1` |
| border/default | cloud-200 | cloud-800 `#1E293B` |
| border/strong | cloud-300 | cloud-700 `#334155` |
| action/primary | sky-600 `#0284C7` | sky-400 `#38BDF8` |
| action/primary hover | sky-700 | sky-300 `#7DD3FC` |
| focus ring | sky-500 | sky-500 (9.4:1-adjacent ramp reads on dark) |

Rules:

- **Interactive shifts up the lightness ramp.** Solid sky-600 buttons become sky-400 with cloud-950 text; hover moves to sky-300 (lighter, not darker).
- **Elevation = lighter surface, not shadow.** cloud-950 page → cloud-900 card → cloud-800 raised/dropdown. Keep a faint shadow-3/4 on overlays for edge definition only.
- **Desaturate status tints.** Light-mode tint backgrounds (#F0FDF4 etc.) glow in the dark. Dark tint bg = status color at ~15% opacity over the surface: `color-mix(in srgb, var(--cds-red-600) 15%, var(--cds-cloud-900))` or `rgba(220, 38, 38, 0.15)`. Status text moves up-ramp like interactive color.
- **Images and media:** optionally dim to 90% opacity so photos don't blaze against cloud-950; restore 100% on hover.

### Theme switching strategy

Two signals, in priority order:

1. `data-theme="light" | "dark"` on `<html>` — the user's explicit, persisted choice.
2. `prefers-color-scheme` — the fallback when no choice is stored (default state).

### Brand theming

A client theme swaps the **primary ramp** (sky → brand ramp) at the primitive-alias level and leaves everything else — neutrals, spacing, radius, elevation, motion, voice — untouched. The brand ramp must supply a 600-equivalent with ≥4.5:1 on white and a 400-equivalent with ≥4.5:1 on cloud-950, or it can't ship.

## Tokens

```css
/* Dark mode remap — applies to explicit choice AND system preference */
[data-theme="dark"] {
  --cds-color-bg-page: var(--cds-cloud-950);
  --cds-color-bg-surface: var(--cds-cloud-900);
  --cds-color-bg-raised: var(--cds-cloud-800);
  --cds-color-text-primary: var(--cds-cloud-50);
  --cds-color-text-secondary: var(--cds-cloud-300);
  --cds-color-text-muted: var(--cds-cloud-500);
  --cds-color-text-inverse: var(--cds-cloud-950);
  --cds-color-border-default: var(--cds-cloud-800);
  --cds-color-border-strong: var(--cds-cloud-700);

  --cds-color-action-primary: var(--cds-sky-400);
  --cds-color-action-primary-hover: var(--cds-sky-300);
  --cds-color-action-primary-active: var(--cds-sky-200);
  --cds-color-focus-ring: var(--cds-sky-500);

  /* Status: tint = base color at ~15% over surface; text moves up-ramp */
  --cds-color-status-success-bg: rgba(22, 163, 74, 0.15);
  --cds-color-status-success-text: #4ADE80;
  --cds-color-status-warning-bg: rgba(245, 158, 11, 0.15);
  --cds-color-status-warning-text: #FBBF24;
  --cds-color-status-danger-bg: rgba(220, 38, 38, 0.15);
  --cds-color-status-danger-text: #F87171;
  --cds-color-status-info-bg: rgba(2, 132, 199, 0.15);
  --cds-color-status-info-text: var(--cds-sky-300);

  /* Elevation reads as lighter surfaces; shadows only assist overlays */
  --cds-shadow-1: none;
  --cds-shadow-2: none;
  --cds-shadow-3: 0 4px 8px rgba(2, 6, 23, 0.4);
  --cds-shadow-4: 0 8px 16px rgba(2, 6, 23, 0.5);

  color-scheme: dark;  /* native scrollbars, form controls */
}

/* System preference, when the user hasn't chosen */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* duplicate the [data-theme="dark"] block here, or generate both from one source */
  }
}
```

## Usage

No-flash theme boot — inline in `<head>` before any CSS paints:

```html
<script>
  (function () {
    var saved = localStorage.getItem("cds-theme");           /* "light" | "dark" | null */
    if (saved) document.documentElement.dataset.theme = saved; /* null = follow system */
  })();
</script>
```

Theme toggle that persists and can return to "system":

```html
<button type="button" id="theme-toggle" aria-label="Switch to dark theme">
  <svg aria-hidden="true"><!-- moon icon --></svg>
</button>
<script>
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("cds-theme", next);
    this.setAttribute("aria-label", "Switch to " + (next === "dark" ? "light" : "dark") + " theme");
  });
</script>
```

Media dimming and a brand theme:

```css
[data-theme="dark"] img,
[data-theme="dark"] video {
  opacity: 0.9;
  transition: opacity var(--cds-duration-fast) var(--cds-ease-standard);
}
[data-theme="dark"] :is(img, video):hover { opacity: 1; }

/* Brand theme: swap the primary ramp, keep the structure */
[data-brand="acme"] {
  --cds-color-action-primary: #7C3AED;        /* brand 600-equivalent, 4.5:1+ on white */
  --cds-color-action-primary-hover: #6D28D9;
  --cds-color-action-primary-active: #5B21B6;
  --cds-color-focus-ring: #8B5CF6;
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Theme by remapping semantic tokens under `[data-theme="dark"]` | Don't write `.dark .card { background: #0F172A }` per component — that's the redesign we avoided |
| Use the cloud ladder: page cloud-950, surface cloud-900, raised cloud-800 | Don't use `#000000` backgrounds — pure black makes light text vibrate |
| Set dark text/primary to cloud-50 and text/secondary to cloud-300 | Don't use `#FFFFFF` body text — pure white on dark glares; cloud-50 is the ceiling |
| Shift interactive color up-ramp: sky-400 default, sky-300 hover | Don't keep sky-600 buttons in dark mode — they sink into cloud-900 surfaces |
| Show elevation with lighter surfaces (cloud-800 dropdowns over cloud-900) | Don't rely on shadow-1/2 in the dark — shadows on dark backgrounds barely read |
| Build dark status tints as the status color at ~15% opacity over the surface | Don't reuse light tints like #F0FDF4 in dark mode — they glow like sticky notes |
| Default to `prefers-color-scheme` and persist explicit choices in localStorage | Don't default everyone to dark because the team likes it |
| Set `data-theme` in a render-blocking inline script in `<head>` | Don't apply the theme in a deferred bundle — users get a flash of the wrong theme |
| Dim photos and video to 90% opacity in dark mode | Don't invert or filter photos — dimming preserves color fidelity |
| Verify brand ramps hit 4.5:1 in both modes before shipping a client theme | Don't accept a brand color that fails contrast "because it's their brand" |
| Set `color-scheme: dark` so native controls and scrollbars match | Don't leave white native scrollbars striping a cloud-950 page |

## Checklist

- [ ] Components contain zero theme conditionals — all theming lives in token remaps
- [ ] Dark backgrounds follow the ladder: cloud-950 page / cloud-900 surface / cloud-800 raised
- [ ] No pure black backgrounds or pure white text anywhere
- [ ] Interactive color is sky-400 (hover sky-300) in dark mode; contrast re-verified (sky-400 on cloud-950 = 9.4:1)
- [ ] Elevation expressed by lighter surfaces; shadows retained only on overlays
- [ ] Status tints rebuilt at ~15% opacity over dark surfaces
- [ ] Theme boots from localStorage in `<head>` — no flash of wrong theme
- [ ] Toggle persists choice; default follows the system preference
- [ ] Images dimmed to 90% (optional) and `color-scheme: dark` set
- [ ] Both themes pass the accessibility checklist (doc 15)

## Related

- [18 · Design tokens](./18-design-tokens.md) — the semantic layer this doc remaps
- [15 · Accessibility](./15-accessibility.md) — contrast floors apply per theme
- [20 · Governance](./20-governance.md) — approving brand themes and new theme tokens
