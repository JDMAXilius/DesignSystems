# 11 · Navigation — Cloud Design System
> Navigation tells users where they are, where they can go, and how to get back — with sky-blue current-state markers on calm cloud surfaces.

## Principles

1. **Location is always marked.** The current page gets sky-50 background, sky-700 text, a 2px sky-600 indicator, and `aria-current` — never just a subtle color shift.
2. **Two levels, no more.** Primary nav plus one nested level. Deeper hierarchies move into page content, not menus.
3. **Keyboard first.** A skip-to-content link leads every page; every nav item shows the CDS focus ring.
4. **Calm chrome.** Nav surfaces stay neutral (cloud-0/50/100) so the ~10% sky accent marks only the active trail.
5. **Touch-safe on mobile.** Hamburger and drawer targets are at least 44×44px; the drawer traps focus while open.

## The system

### Top nav / header

| Property | Value |
|---|---|
| Height | 64px (space-16) |
| Position | `position: sticky; top: 0`, z-index 1100 (sticky layer) |
| Background | cloud-0 `#FFFFFF` + 1px bottom border cloud-200 `#E2E8F0` |
| On-scroll alternative | glass: `rgba(255,255,255,0.7)` + `backdrop-filter: blur(12px)` + 1px border `rgba(255,255,255,0.5)` — only over imagery/gradients |
| Content | max-width 1280px, padding-x 24px (16px mobile) |

### Sidebar

| Property | Value |
|---|---|
| Width | 260px expanded, collapsible to 64px icon rail |
| Background | cloud-50 `#F8FAFC`, 1px right border cloud-200 |
| Item height | 40px, radius-md 10px, 8px gap between icon (20px) and label |
| Collapse motion | width transition 250ms (duration-base), standard easing; labels fade at 150ms |

In the 64px rail, items show only the 20px icon centered; labels move to tooltips.

### Nav item states

| State | Treatment |
|---|---|
| Default | text cloud-600 `#475569`, transparent bg |
| Hover | bg cloud-100 `#F1F5F9`, text cloud-900 `#0F172A` |
| Active (current) | bg sky-50 `#F0F9FF`, text sky-700 `#0369A1` weight 600, 2px sky-600 `#0284C7` indicator (left bar in sidebars, bottom bar in top nav) + `aria-current="page"` |
| Focus-visible | 2px sky-500 `#0EA5E9` ring, 2px offset |

### Tabs

- Underline style: items sit on a shared 1px cloud-200 bottom border.
- Active tab: 2px sky-600 underline indicator, text sky-700 weight 600. Inactive: cloud-600, hover cloud-900.
- Tab height 40px, gap 24px (space-6), text-sm weight 500. Use `role="tablist"` with arrow-key navigation.

### Breadcrumbs

- text-sm, items are cloud-600 links; separators are 16px chevron icons in cloud-400 `#94A3B8` (never "/" text).
- The current page is plain text in cloud-900 weight 500 — **not a link** — with `aria-current="page"`.
- Truncate middles beyond 4 items to `…`; wrap the list in `<nav aria-label="Breadcrumb">`.

### Footer

- Background cloud-100 `#F1F5F9`, 1px top border cloud-200, padding-y 64px desktop / 48px mobile.
- Link columns: text-sm, headings text-sm weight 600 cloud-900, links cloud-600 with hover cloud-900. Legal row: text-xs cloud-500.

### Mobile patterns

- Below 1024px the sidebar becomes a drawer: 280px max-width panel sliding from the left at 400ms (duration-slow), over a scrim at z-index 1300, panel at 1400.
- Hamburger trigger: 44×44px minimum, 24px icon, `aria-expanded` + `aria-controls`.
- Drawer traps focus, closes on Escape and scrim tap, and returns focus to the trigger.

### Accessibility rules

- First focusable element on every page: a skip-to-content link, visually hidden until focused.
- `aria-current="page"` on the active nav item, breadcrumb leaf, and pagination page — this is the machine-readable twin of the sky-600 indicator.
- Max depth 2 levels: top-level sections plus one nested group. If a third level appears, promote it to in-page tabs or restructure.

## Tokens

```css
:root {
  --cds-nav-h: 64px;
  --cds-nav-bg: #FFFFFF;                    /* cloud-0 */
  --cds-nav-border: #E2E8F0;                /* cloud-200 */
  --cds-nav-glass-bg: rgba(255,255,255,0.7);
  --cds-nav-glass-border: rgba(255,255,255,0.5);
  --cds-sidebar-w: 260px;
  --cds-sidebar-w-rail: 64px;
  --cds-sidebar-bg: #F8FAFC;                /* cloud-50 */
  --cds-navitem-text: #475569;              /* cloud-600 */
  --cds-navitem-text-hover: #0F172A;        /* cloud-900 */
  --cds-navitem-bg-hover: #F1F5F9;          /* cloud-100 */
  --cds-navitem-bg-active: #F0F9FF;         /* sky-50 */
  --cds-navitem-text-active: #0369A1;       /* sky-700 */
  --cds-navitem-indicator: #0284C7;         /* sky-600, 2px */
  --cds-breadcrumb-sep: #94A3B8;            /* cloud-400 */
  --cds-focus-ring: 0 0 0 2px #FFFFFF, 0 0 0 4px #0EA5E9; /* 2px sky-500, 2px offset */
  --cds-z-sticky: 1100;
  --cds-z-scrim: 1300;
  --cds-z-drawer: 1400;
  --cds-nav-duration: 250ms;                /* duration-base */
  --cds-drawer-duration: 400ms;             /* duration-slow */
  --cds-nav-easing: cubic-bezier(0.2, 0, 0, 1);
}
```

## Usage

### Sticky header with skip link

```html
<a class="cds-skip-link" href="#main">Skip to content</a>
<header class="cds-header">
  <a href="/" class="cds-logo">Acme</a>
  <nav aria-label="Primary" class="cds-header-nav">
    <a class="cds-nav-item" href="/features" aria-current="page">Features</a>
    <a class="cds-nav-item" href="/pricing">Pricing</a>
    <a class="cds-nav-item" href="/docs">Docs</a>
  </nav>
</header>
<main id="main">…</main>
```

```css
.cds-skip-link {
  position: absolute; left: 16px; top: -48px;
  padding: 8px 16px; background: #FFFFFF; color: #0369A1;
  border-radius: 10px; font-weight: 600; z-index: 1800;
  transition: top 150ms var(--cds-nav-easing);
}
.cds-skip-link:focus-visible { top: 16px; box-shadow: var(--cds-focus-ring); }

.cds-header {
  position: sticky; top: 0; z-index: var(--cds-z-sticky);
  display: flex; align-items: center; gap: 32px;
  height: var(--cds-nav-h); padding: 0 24px;
  background: var(--cds-nav-bg);
  border-bottom: 1px solid var(--cds-nav-border);
}
.cds-header--glass {
  background: var(--cds-nav-glass-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--cds-nav-glass-border);
}

.cds-nav-item {
  position: relative; display: inline-flex; align-items: center; gap: 8px;
  height: 40px; padding: 0 12px; border-radius: 10px;
  font: 500 14px/20px "Plus Jakarta Sans", system-ui, sans-serif;
  color: var(--cds-navitem-text); text-decoration: none;
  transition: background-color 100ms var(--cds-nav-easing), color 100ms var(--cds-nav-easing);
}
.cds-nav-item:hover { background: var(--cds-navitem-bg-hover); color: var(--cds-navitem-text-hover); }
.cds-nav-item:focus-visible { outline: none; box-shadow: var(--cds-focus-ring); }
.cds-nav-item[aria-current="page"] {
  background: var(--cds-navitem-bg-active);
  color: var(--cds-navitem-text-active); font-weight: 600;
}
/* Indicator: bottom bar in the header… */
.cds-header .cds-nav-item[aria-current="page"]::after {
  content: ""; position: absolute; left: 12px; right: 12px; bottom: -12px;
  height: 2px; background: var(--cds-navitem-indicator);
}
/* …left bar in the sidebar */
.cds-sidebar .cds-nav-item[aria-current="page"]::before {
  content: ""; position: absolute; left: -8px; top: 8px; bottom: 8px;
  width: 2px; border-radius: 9999px; background: var(--cds-navitem-indicator);
}
```

### Collapsible sidebar

```html
<aside class="cds-sidebar" data-collapsed="false">
  <nav aria-label="Sections">
    <a class="cds-nav-item" href="/dashboard" aria-current="page">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M3 12l9-8 9 8v8a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/></svg>
      <span class="cds-nav-label">Dashboard</span>
    </a>
  </nav>
</aside>
```

```css
.cds-sidebar {
  width: var(--cds-sidebar-w); min-height: 100vh; padding: 16px 8px;
  background: var(--cds-sidebar-bg);
  border-right: 1px solid var(--cds-nav-border);
  transition: width var(--cds-nav-duration) var(--cds-nav-easing);
}
.cds-sidebar[data-collapsed="true"] { width: var(--cds-sidebar-w-rail); }
.cds-sidebar[data-collapsed="true"] .cds-nav-label { display: none; }
@media (prefers-reduced-motion: reduce) { .cds-sidebar { transition: none; } }
```

### Tabs and breadcrumbs

```html
<div class="cds-tabs" role="tablist" aria-label="Settings sections">
  <button class="cds-tab" role="tab" aria-selected="true">Profile</button>
  <button class="cds-tab" role="tab" aria-selected="false">Billing</button>
</div>

<nav aria-label="Breadcrumb" class="cds-breadcrumbs">
  <a href="/projects">Projects</a>
  <svg class="sep" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
  <span aria-current="page">Skyline redesign</span>
</nav>
```

```css
.cds-tabs { display: flex; gap: 24px; border-bottom: 1px solid var(--cds-nav-border); }
.cds-tab {
  height: 40px; padding: 0 4px; background: none; border: none; cursor: pointer;
  font: 500 14px/20px "Plus Jakarta Sans", system-ui, sans-serif;
  color: var(--cds-navitem-text); border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}
.cds-tab:hover { color: var(--cds-navitem-text-hover); }
.cds-tab:focus-visible { outline: none; box-shadow: var(--cds-focus-ring); }
.cds-tab[aria-selected="true"] {
  color: var(--cds-navitem-text-active); font-weight: 600;
  border-bottom-color: var(--cds-navitem-indicator);
}

.cds-breadcrumbs { display: flex; align-items: center; gap: 8px; font-size: 14px; line-height: 20px; }
.cds-breadcrumbs a { color: #475569; text-decoration: none; }
.cds-breadcrumbs a:hover { color: #0F172A; text-decoration: underline; }
.cds-breadcrumbs .sep { color: var(--cds-breadcrumb-sep); }
.cds-breadcrumbs [aria-current="page"] { color: #0F172A; font-weight: 500; }
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Mark the active item with sky-50 bg, sky-700 text, and a 2px sky-600 indicator | Don't mark "current" with a color shift alone — it fails the never-color-only rule |
| Add `aria-current="page"` wherever the visual indicator appears | Don't style the active state in CSS only — screen readers hear an undifferentiated list |
| Keep the header 64px, sticky, cloud-0 with a cloud-200 bottom border | Don't float a borderless white header over white content — the edge disappears on scroll |
| Reserve glass (`rgba(255,255,255,0.7)` + 12px blur) for headers over imagery or gradients | Don't put glass over plain cloud-50 pages — blur with nothing behind it just costs performance |
| Collapse the sidebar from 260px to a 64px icon rail with tooltips for labels | Don't shrink text to fit a rail — icon-only plus tooltip beats 9px labels |
| Render the current breadcrumb as plain cloud-900 text | Don't link the current page to itself — a self-link is a dead-end tap |
| Use 16px cloud-400 chevron icons as breadcrumb separators | Don't use "/" or ">" text characters — they misalign and read aloud as punctuation |
| Make the hamburger a 44×44px target with `aria-expanded` | Don't ship a bare 24px icon as the tap target — it misses the touch floor |
| Trap focus in the open drawer and restore it to the trigger on close | Don't let Tab escape behind the scrim — keyboard users get lost in hidden content |
| Put a skip-to-content link as the first focusable element | Don't force keyboard users through 15 nav links on every single page |
| Cap navigation at 2 levels; promote deeper content to tabs or pages | Don't build three-deep flyout menus — hover chains are unusable on touch and shaky on desktop |
| Animate the drawer at 400ms and honor `prefers-reduced-motion` | Don't slide layout properties like `left` on low-end phones — transform-based motion only |
| Give tabs a shared cloud-200 baseline with a 2px sky-600 active underline | Don't use filled-pill and underline tabs in the same product — one tab style per system |

## Checklist

- [ ] Header is 64px, sticky at z-index 1100, cloud-0 bg + cloud-200 bottom border (or glass over imagery)
- [ ] Sidebar is 260px, collapses to a 64px icon rail at 250ms
- [ ] Nav items: hover cloud-100 bg; active sky-50 bg + sky-700 text + 2px sky-600 indicator
- [ ] `aria-current="page"` set on active nav items and breadcrumb leaf
- [ ] Tabs use the underline style with a 2px sky-600 active indicator and `role="tablist"`
- [ ] Breadcrumbs use chevron separators; current page is not a link
- [ ] Skip-to-content link is the first focusable element and becomes visible on focus
- [ ] Mobile drawer: scrim at 1300, panel at 1400, focus trapped, Escape closes
- [ ] All triggers (hamburger, collapse toggle) are ≥ 44×44px
- [ ] Navigation depth is 2 levels or fewer

## Related

- [09-buttons.md](./09-buttons.md) — nav items share the focus ring and interaction timing
- [10-forms-inputs.md](./10-forms-inputs.md) — search fields in headers follow input specs
