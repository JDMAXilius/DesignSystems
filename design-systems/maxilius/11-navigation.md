# 11 · Navigation — Maxilius Design System

> Navigation is pure cool framework: quiet gray text on calm surfaces, with blue reserved for the single "you are here" signal — never warm color.

## Principles

1. **Navigation recedes; content leads.** Nav items rest in `text-secondary` gray and only reach full contrast on hover or when current.
2. **One "current" signal.** Every nav surface marks exactly one item as active — blue text plus a structural cue (underline, filled background, or weight) — and exposes it to assistive tech via `aria-current` / `aria-selected`.
3. **Warm colors never navigate.** Amber and vermillion are action colors; tabs, links, breadcrumbs, and menus stay cool.
4. **Keyboard-first.** Every nav pattern is reachable by Tab, exposes the 2px `--mx-focus-ring` outline, and offers a skip link past repeated chrome.
5. **Landmarks, always.** Each nav region is a `<nav>` with a distinct `aria-label` ("Main", "Breadcrumb", "Footer").

Two navigation components ship in `@maxilius/react` today — **Tabs** and **Breadcrumbs**. Header, sidebar, footer, and mobile drawer are documented patterns **(defined by docs, not yet in code)**, built from tokens.

## The system

### Tabs (component)

`Tabs` + `TabList` + `Tab` + `TabPanel`. Controlled (`value`/`onChange`) or uncontrolled (`defaultValue`). Full ARIA wiring (`role="tablist/tab/tabpanel"`, `aria-selected`, `aria-controls`) and roving focus: Arrow Left/Right, Home, End move and activate; only the active tab is in the Tab order.

| Part / state | Treatment (light values) |
|---|---|
| tab list | flex row, gap `space-1`, 1px `border-default` gray-200 bottom rule |
| tab (rest) | padding `space-3`/`space-4` (12/16px), 14px medium, `text-secondary` gray-600 `#475569`, transparent 2px underline slot |
| tab hover | text `text-primary` gray-900 `#0F172A`, 120ms transition |
| tab active | text `action-primary-subtle-text` blue-700 `#1D4ED8` (blue-300 dark) + 2px underline `action-primary-bg` blue-600 `#2563EB` |
| tab disabled | `action-disabled-text` gray-400, `cursor: not-allowed` |
| focus-visible | 2px `--mx-focus-ring` outline, −2px offset (inside the tab), `radius-sm` |
| panel | padding `space-4` 0, 14px/1.5 `text-primary`, focusable (`tabindex="0"`) |

Give every `TabList` a `label` ("Settings sections"). Tabs switch views in place — they never navigate to new URLs (use links styled as tabs for routing).

### Breadcrumbs (component)

`Breadcrumbs` takes `items: { label, href? }[]`; the last item is the current page (omit its `href`), rendered as `<nav aria-label="Breadcrumb">` wrapping an `<ol>`. `linkProps` forwards props (e.g. `onClick`) to every anchor for router integration.

| Part | Treatment |
|---|---|
| link | 14px `text-secondary`; hover: `text-link` blue-600 `#2563EB` + underline; focus-visible: 2px ring at 2px offset |
| current page | 14px medium `text-primary`, `aria-current="page"`, not a link |
| separator | 16px `chevron-right` icon in `text-muted` gray-400, `aria-hidden="true"` |
| layout | flex, wraps, gap `space-2` (8px) |

### Header / top nav (pattern — defined by docs, not yet in code)

64px bar (`space-16`) on `bg-surface`, 1px `border-default` bottom rule, content max-width 1280px with `space-6` page margin. Wordmark left, primary items center/left, actions right. Items are 14px medium `text-secondary`; hover `text-primary` on a `bg-surface-sunken` pill (`radius-md`); current item `text-link` blue with `aria-current="page"`. At most one warm accent button (e.g. "Upgrade") lives in the header — it counts as the view's warm CTA. Sticky headers use `--mx-z-sticky` (1100).

### Sidebar (pattern — defined by docs, not yet in code)

256px column (`space-16` × 4) on `bg-surface-sunken` gray-100 (gray-950 dark), 1px `border-default` right rule. Items: 40px tall (`size-control-md`), `radius-md`, padding-x `space-3`, gap `space-2` to a 20px icon, 14px medium `text-secondary`. Hover: `bg-surface` + `text-primary`. Current: `action-primary-subtle-bg` blue-50 fill + `action-primary-subtle-text` blue-700 + `aria-current="page"` (blue-950/blue-300 in dark). Group headings: 12px caps eyebrow, `letter-spacing-caps` 0.08em, `text-muted`, `space-6` above each group. Below the lg breakpoint (1024px) the sidebar becomes the mobile drawer.

### Footer (pattern — defined by docs, not yet in code)

`bg-surface-sunken` with 1px `border-default` top rule, `space-16` vertical padding. Column headings 14px semibold `text-primary`; links 14px `text-secondary`, hover `text-link`, `space-3` between links, `space-8` between columns. Legal row: 12px `text-muted`. Wrap in `<nav aria-label="Footer">`.

### Mobile drawer (pattern — defined by docs, not yet in code)

Off-canvas panel (max-width 320px) on `bg-surface` at `--mx-z-modal` (1400) over a `--mx-bg-overlay` scrim (`--mx-z-overlay`, 1300). Slides in over 320ms (`motion-duration-slow`, `motion-easing-enter`); exits with `motion-easing-exit`. Items reuse the sidebar spec at 48px height (`size-control-lg`) for touch. Trap focus inside, close on Escape and scrim tap, and return focus to the hamburger button (a ghost icon-only Button with `aria-expanded`).

### Skip link (pattern — defined by docs, not yet in code)

First focusable element on the page: visually hidden until focused, then a `bg-surface` pill with `text-link`, `shadow-md`, and the standard focus ring, jumping to `#main`.

## Tokens

```css
/* Nav item states */
--mx-text-primary: #0F172A;    --mx-text-secondary: #475569;
--mx-text-muted: #94A3B8;      --mx-text-link: #2563EB;        /* blue-400 #60A5FA dark */
--mx-action-primary-bg: #2563EB;
--mx-action-primary-subtle-bg: #EFF6FF;   /* blue-950 #172554 dark */
--mx-action-primary-subtle-text: #1D4ED8; /* blue-300 #93C5FD dark */
--mx-action-disabled-text: #94A3B8;
/* Surfaces & rules */
--mx-bg-surface: #FFFFFF;      --mx-bg-surface-sunken: #F1F5F9;
--mx-bg-overlay: rgb(2 6 23 / 0.55);
--mx-border-default: #E2E8F0;  --mx-focus-ring: #3B82F6;
/* Geometry & type */
--mx-space-1: 0.25rem; --mx-space-2: 0.5rem; --mx-space-3: 0.75rem;
--mx-space-4: 1rem; --mx-space-6: 1.5rem; --mx-space-8: 2rem; --mx-space-16: 4rem;
--mx-size-control-md: 2.5rem; --mx-size-control-lg: 3rem;
--mx-radius-sm: 0.25rem; --mx-radius-md: 0.5rem;
--mx-font-size-xs: 0.75rem; --mx-font-size-sm: 0.875rem;
--mx-font-weight-medium: 500; --mx-font-letter-spacing-caps: 0.08em;
--mx-border-width-thin: 1px; --mx-border-width-thick: 2px;
/* Motion & stacking */
--mx-motion-duration-fast: 120ms; --mx-motion-duration-slow: 320ms;
--mx-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
--mx-motion-easing-enter: cubic-bezier(0, 0, 0.2, 1);
--mx-z-sticky: 1100; --mx-z-overlay: 1300; --mx-z-modal: 1400;
```

## Usage

### React

```html
<!-- JSX — import { Tabs, TabList, Tab, TabPanel, Breadcrumbs } from '@maxilius/react' -->
<Tabs defaultValue="profile">
  <TabList label="Account settings">
    <Tab value="profile">Profile</Tab>
    <Tab value="security">Security</Tab>
    <Tab value="billing" disabled>Billing</Tab>
  </TabList>
  <TabPanel value="profile">…</TabPanel>
  <TabPanel value="security">…</TabPanel>
</Tabs>

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Maxilius docs' },          // current page — no href
  ]}
  linkProps={{ onClick: handleRouterLink }}
/>
```

### Plain CSS (skip link + sidebar items)

```html
<a class="mx-skip-link" href="#main">Skip to main content</a>
<nav aria-label="Main" class="mx-sidenav">
  <a class="mx-sidenav__item" href="/projects" aria-current="page">Projects</a>
  <a class="mx-sidenav__item" href="/reports">Reports</a>
</nav>
```

```css
.mx-skip-link {
  position: absolute; left: var(--mx-space-4); top: var(--mx-space-4);
  padding: var(--mx-space-2) var(--mx-space-4);
  background: var(--mx-bg-surface); color: var(--mx-text-link);
  border-radius: var(--mx-radius-md);
  transform: translateY(-200%);
}
.mx-skip-link:focus-visible {
  transform: none;
  outline: var(--mx-border-width-thick) solid var(--mx-focus-ring); outline-offset: 2px;
}
.mx-sidenav { display: flex; flex-direction: column; gap: var(--mx-space-1);
              background: var(--mx-bg-surface-sunken); padding: var(--mx-space-3); }
.mx-sidenav__item {
  display: flex; align-items: center; gap: var(--mx-space-2);
  height: var(--mx-size-control-md); padding: 0 var(--mx-space-3);
  border-radius: var(--mx-radius-md); text-decoration: none;
  font-size: var(--mx-font-size-sm); font-weight: var(--mx-font-weight-medium);
  color: var(--mx-text-secondary);
  transition: background-color var(--mx-motion-duration-fast) var(--mx-motion-easing-standard),
              color var(--mx-motion-duration-fast) var(--mx-motion-easing-standard);
}
.mx-sidenav__item:hover { background: var(--mx-bg-surface); color: var(--mx-text-primary); }
.mx-sidenav__item[aria-current='page'] {
  background: var(--mx-action-primary-subtle-bg);
  color: var(--mx-action-primary-subtle-text);
}
.mx-sidenav__item:focus-visible {
  outline: var(--mx-border-width-thick) solid var(--mx-focus-ring); outline-offset: 2px;
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Mark the current nav item with `aria-current="page"` (links) or rely on Tab's built-in `aria-selected`. | Don't signal "current" with color alone and nothing in the accessibility tree. |
| Keep resting nav items `text-secondary` gray-600 and let hover raise them to gray-900. | Don't paint every nav item blue-600 — link color everywhere means "current" nowhere. |
| Use the blue pair for active states: blue-50 fill + blue-700 text (sidebar), blue-600 underline + blue-700 text (tabs). | Don't invent an amber or teal active state — warm color is for actions, and teal is a button color. |
| Use Tabs to switch in-place views of one page; use real `<a>` links for URL changes. | Don't wire `onChange` on Tabs to `router.push` — Arrow-key roving focus would trigger page loads. |
| Give each nav region a distinct label: `aria-label="Main"`, "Breadcrumb", "Footer". | Don't render three unlabeled `<nav>` elements — screen readers announce three identical "navigation" landmarks. |
| Omit `href` on the last breadcrumb so it renders as `aria-current="page"` text. | Don't make the current page a clickable breadcrumb link to itself. |
| Let Breadcrumbs render its `chevron-right` separators (`aria-hidden`, gray-400). | Don't type "/" or ">" between crumb labels — text separators get read aloud. |
| Put a skip link to `#main` as the first focusable element on every page. | Don't force keyboard users through 20 header links on every page load. |
| Keep sidebar and drawer items ≥40px tall (48px on touch) with `radius-md` hit areas. | Don't ship 24px-tall text links as the only touch targets in a mobile drawer. |
| Animate the drawer with `motion-duration-slow` (320ms) + enter/exit easings, over the `--mx-bg-overlay` scrim. | Don't pop the drawer in instantly or stack it below a sticky header (`z-modal` 1400 beats `z-sticky` 1100). |
| Trap focus in the open drawer, close on Escape, and return focus to the toggle button. | Don't leave focus behind the scrim where Tab reaches invisible content. |
| Disable a tab with the `disabled` prop (gray-400, skipped by roving focus). | Don't hide temporarily unavailable tabs — layout shift makes users doubt their memory. |

## Checklist

- [ ] Every nav region is a labeled `<nav>` landmark
- [ ] Exactly one current item per surface, exposed via `aria-current` / `aria-selected`
- [ ] Active states use the blue subtle pair; no warm colors in navigation
- [ ] Tab lists have a `label`; arrow keys, Home, and End work
- [ ] Last breadcrumb has no `href` and carries `aria-current="page"`
- [ ] Skip link present and visible on focus
- [ ] Focus ring (2px `--mx-focus-ring`) visible on every link, tab, and menu item
- [ ] Drawer: focus trapped, Escape closes, correct z-index layers
- [ ] Checked in dark mode: subtle pair swaps to blue-950/blue-300, rules stay visible

## Related

- [09-buttons.md](./09-buttons.md) — hamburger and header CTAs
- [01-color.md](./01-color.md) — link and subtle-action tokens
- [16-responsive.md](./16-responsive.md) — breakpoints for the drawer switch
- [08-motion-animation.md](./08-motion-animation.md) — drawer timing and easing
- [15-accessibility.md](./15-accessibility.md) — landmarks, focus, skip links
