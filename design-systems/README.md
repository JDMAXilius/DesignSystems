# ☁️ Cloud Design System

A complete, from-scratch design system for building **any page, any website** — marketing
sites, dashboards, e-commerce, blogs — with one consistent, accessible, cloud-inspired
visual language.

> **Personality:** airy, calm, soft depth, light-filled — like a clear sky.
> **Prefix:** every CSS token starts with `--cds-`.

## How to use this system

1. **Starting a project?** Copy the starter token sheet from
   [`18-design-tokens.md`](18-design-tokens.md) into your global CSS. That one block makes
   every rule in these docs available on any website.
2. **Building a screen?** Work through foundations (color → type → spacing) first, then pull
   the component docs you need. Run the
   [new-page checklist](checklists/new-page-checklist.md) before shipping.
3. **Making a call the docs don't cover?** Fall back to
   [`00-design-principles.md`](00-design-principles.md) — principles resolve conflicts.

Every document ends with a **✅ Do / ❌ Don't** table and a shipping checklist. When in doubt,
scan those first — they're the distilled rules.

## The documents

### Foundations

| # | Document | What it decides |
| --- | --- | --- |
| 00 | [Design principles](00-design-principles.md) | The philosophy behind every decision |
| 01 | [Color](01-color.md) | Palettes, semantic roles, contrast, 60-30-10 |
| 02 | [Typography](02-typography.md) | Fonts, type scale, hierarchy, line length |
| 03 | [Spacing, layout & grid](03-spacing-layout-grid.md) | 4px unit, spacing scale, 12-col grid, breakpoints |
| 04 | [Elevation & depth](04-elevation-depth.md) | Soft cloud shadows, layering, z-index, glass |
| 05 | [Shape & radius](05-shape-radius.md) | Corner language, borders, dividers |
| 06 | [Iconography](06-iconography.md) | Icon style, sizes, icon + text pairing |
| 07 | [Imagery & illustration](07-imagery-illustration.md) | Photography, illustration, gradients, overlays |
| 08 | [Motion & animation](08-motion-animation.md) | Durations, easing, what to animate |

### Components

| # | Document | What it decides |
| --- | --- | --- |
| 09 | [Buttons](09-buttons.md) | Variants, states, sizes, placement |
| 10 | [Forms & inputs](10-forms-inputs.md) | Fields, labels, validation, errors |
| 11 | [Navigation](11-navigation.md) | Headers, sidebars, tabs, breadcrumbs |
| 12 | [Cards & surfaces](12-cards-surfaces.md) | Containers, panels, surface hierarchy |
| 13 | [Feedback](13-feedback.md) | Alerts, toasts, modals, loading, empty states |
| 14 | [Data display](14-data-display.md) | Tables, lists, badges, tooltips, stats |

### System-wide

| # | Document | What it decides |
| --- | --- | --- |
| 15 | [Accessibility](15-accessibility.md) | WCAG 2.2 AA floor — contrast, focus, keyboard |
| 16 | [Responsive design](16-responsive.md) | Mobile-first, breakpoints, touch targets |
| 17 | [Content, voice & tone](17-content-voice-tone.md) | Microcopy, labels, error wording |
| 18 | [Design tokens](18-design-tokens.md) | Token architecture + copy-paste starter sheet |
| 19 | [Theming & dark mode](19-theming-dark-mode.md) | Dark mode, brand theming |
| 20 | [Governance](20-governance.md) | Versioning, contribution, deprecation |

### Checklists

- [New page / new site checklist](checklists/new-page-checklist.md) — run this before any
  page ships.

## The system at a glance

| Decision | Value |
| --- | --- |
| Primary color | Sky `#0284C7` (hover `#0369A1`, active `#075985`) |
| Secondary color | Twilight indigo `#4F46E5` |
| Neutrals | Cloud gray ramp `#F8FAFC → #020617` |
| Status | Success `#16A34A` · Warning `#F59E0B` · Danger `#DC2626` · Info `#0284C7` |
| Signature gradient | `135deg, #38BDF8 → #6366F1` (one hero moment per view, max) |
| UI font | Plus Jakarta Sans · Code: IBM Plex Mono |
| Type scale | 16px base, ~1.25 ratio (12 → 60px) |
| Spacing | 4px base unit (0–128px scale) |
| Radius | 4 / 6 / 10 / 16 / 24px + pill |
| Elevation | 5 soft layered shadow levels, cool-tinted |
| Grid | 12 columns · 24px gutter · 1280px max width |
| Breakpoints | 640 / 768 / 1024 / 1280 / 1536 (mobile-first) |
| Motion | 100 / 150 / 250 / 400ms · `cubic-bezier(0.2, 0, 0, 1)` |
| Accessibility | WCAG 2.2 AA minimum, focus ring on everything interactive |
| Writing | Sentence case everywhere, verb + noun buttons |

## Non-negotiables

These hold on every page, every website, no exceptions without a documented waiver
(see [governance](20-governance.md)):

1. Text contrast ≥ 4.5:1 (3:1 for large text and UI components).
2. Visible focus ring on every interactive element.
3. One primary button per view or section.
4. Labels always visible on form fields — placeholders are never labels.
5. Components consume **semantic** tokens only, never raw hex values.
6. Sentence case in all UI text.
7. `prefers-reduced-motion` respected wherever anything moves.
