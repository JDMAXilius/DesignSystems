# New page / new site checklist — Cloud Design System

> Run this before any page ships. Every line traces back to a system doc — the doc number
> is in brackets. If a line fails and you can't fix it, document the exception per
> [governance](../20-governance.md).

## Setup

- [ ] Starter token sheet (`:root { --cds-* }`) is loaded globally, before any page CSS [18]
- [ ] Plus Jakarta Sans + IBM Plex Mono are loaded (with `font-display: swap`) [02]
- [ ] Page uses **semantic** tokens only — grep the CSS for raw hex values; there should be none outside the token sheet [18]
- [ ] Dark mode block (`[data-theme="dark"]`) is present if the site supports theming [19]

## Layout & structure

- [ ] Content sits on the 12-column grid; max width 1280px; page margin 24px (16px mobile) [03]
- [ ] All spacing values come from the 4px scale — no 13px, 18px, 25px oddballs [03]
- [ ] Related elements are visibly closer than unrelated ones (proximity check at arm's length) [03]
- [ ] Surface hierarchy reads correctly: page `cloud-50` → cards `cloud-0` → sunken areas `cloud-100` [12]
- [ ] Nothing sits above its allowed z-index layer (dropdown < modal < toast < tooltip) [04]

## Color & type

- [ ] Accent colors cover roughly 10% of the view or less (60-30-10 rule) [01]
- [ ] Every text/background pair passes contrast: 4.5:1 body, 3:1 large text [01, 15]
- [ ] One `<h1>` per page; heading levels descend without skipping [02, 15]
- [ ] Body text lines are 45–75 characters [02]
- [ ] Status colors (green/amber/red) appear only for status — never as decoration [01]
- [ ] At most one signature-gradient hero moment on the view [07]

## Components

- [ ] Exactly one primary button per view/section; everything else is secondary or ghost [09]
- [ ] All interactive elements show hover, active, focus-visible, and disabled states [09]
- [ ] Every form field has a visible label — no placeholder-as-label anywhere [10]
- [ ] Errors show next to their field: red border + icon + message that says how to fix it [10, 13]
- [ ] Destructive actions get a confirmation with an explicit noun ("Delete project") [13, 17]
- [ ] Loading uses skeletons for content, spinners for actions — and nothing shifts layout [13]
- [ ] Empty states have an icon, a one-line explanation, and an action [13]
- [ ] Tables: numeric columns right-aligned with `tabular-nums`; text columns left-aligned [14]

## Accessibility

- [ ] Keyboard-only walkthrough works: tab order follows visual order, nothing is unreachable [15]
- [ ] Focus ring (2px sky, 2px offset) is visible on every interactive element — test it [15]
- [ ] Touch targets ≥ 44×44px on mobile [15, 16]
- [ ] Meaningful images have alt text; decorative ones have `alt=""` or `aria-hidden` [07, 15]
- [ ] No information is conveyed by color alone (check deltas, statuses, links) [15]
- [ ] Overlays close on Esc; focus is trapped in modals and returned on close [13, 15]
- [ ] Animations are disabled or reduced under `prefers-reduced-motion` [08, 15]

## Responsive

- [ ] Checked at 375, 768, 1024, and 1440px — no horizontal page scroll at any of them [16]
- [ ] Grids collapse sensibly (3 → 2 → 1); sidebar becomes a drawer below `lg` [16]
- [ ] Headings step down on mobile (H1 48 → 36px) [02, 16]
- [ ] Form buttons go full-width on mobile [09, 16]

## Content

- [ ] Sentence case everywhere — buttons, headings, labels, nav [17]
- [ ] Button copy is verb + noun ("Create project", never "Submit" or "Click here") [17]
- [ ] Error messages say what happened and how to fix it — no "Oops!", no bare codes [17]

## Performance & polish

- [ ] Images are lazy-loaded below the fold, sized with `srcset`, modern formats [07]
- [ ] Only `transform` and `opacity` are animated [08]
- [ ] No flash of wrong theme on load (theme script is inline in `<head>`) [19]
