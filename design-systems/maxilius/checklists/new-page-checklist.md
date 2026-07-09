# New page / new site checklist — Maxilius Design System

> Run this before any page ships. Doc numbers in brackets. If a line fails and you can't fix
> it, document the exception per [governance](../20-governance.md).

## Setup

- [ ] `@maxilius/tokens` CSS is loaded globally (or the starter block from doc 18 for non-React sites) [18]
- [ ] Inter + JetBrains Mono are loaded with `font-display: swap` [02]
- [ ] Only **semantic** tokens in page CSS — no primitives, no raw hex outside the token sheet [18]
- [ ] Theme strategy set: `data-theme` attribute or OS preference fallback — no flash of wrong theme [19]

## Layout & structure

- [ ] Content on the 12-column grid; max width 1280px; page margin 24px (16px mobile) [03]
- [ ] All spacing from `space-1…24` — nothing off the 4px scale [03]
- [ ] Related elements visibly closer than unrelated ones [03, 21]
- [ ] Surface hierarchy reads: canvas `gray-50` → surface `white` → sunken `gray-100` [12]
- [ ] z-index respects the token ladder (dropdown 1000 → tooltip 1600) [04]

## Color & type — temperature discipline

- [ ] Cool colors carry the structure; **warm color (amber/vermillion) appears only where attention is due** [01]
- [ ] Exactly one warm CTA per view — everything else acts in blue/teal/neutral [01, 09]
- [ ] Amber backgrounds use dark text (`gray-900`), never white [01]
- [ ] Every text/background pair passes contrast: 4.5:1 body, 3:1 large [01, 15]
- [ ] One `<h1>`; heading levels descend without skipping; body lines 45–75ch [02]

## Components

- [ ] Buttons use the real variants — no invented styles outside the 6 in the library [09]
- [ ] All interactive elements show hover, active, focus-visible, and disabled states [09]
- [ ] Every form field has a visible label; errors use the Input invalid state + message [10]
- [ ] Destructive actions confirm with an explicit noun ("Delete project") [13, 17]
- [ ] Loading: Skeleton for content, Spinner for actions — no layout shift [13]
- [ ] Empty states have an icon, one-line explanation, and an action [13]
- [ ] Tables: numeric columns right-aligned with `tabular-nums` [14]

## Accessibility

- [ ] Keyboard-only walkthrough works; tab order follows visual order [15]
- [ ] Focus ring (2px `--mx-color-focus-ring`) visible on every interactive element [15]
- [ ] Touch targets ≥ 44×44px on mobile [15, 16]
- [ ] Meaningful images have alt text; decorative icons are `aria-hidden` [06, 07, 15]
- [ ] No information conveyed by color alone [15]
- [ ] Overlays close on Esc; modal focus trapped and returned [13, 15]
- [ ] `prefers-reduced-motion` respected wherever anything moves [08, 15]

## Responsive

- [ ] Checked at 375, 768, 1024, 1440px — no horizontal page scroll [16]
- [ ] Grids collapse 3 → 2 → 1; sidebar becomes a drawer below `lg` [16]
- [ ] Headings step down on mobile; form buttons full-width [02, 09, 16]

## Content

- [ ] Sentence case everywhere — buttons, headings, labels, nav [17]
- [ ] Button copy is verb + noun ("Create project", never "Submit") [17]
- [ ] Errors say what happened and how to fix it [17]

## Dark mode & polish

- [ ] Dark mode verified — it should be free if only semantic tokens were used [19]
- [ ] Only `transform` and `opacity` animated, at 120/200/320ms [08]
- [ ] Images lazy-loaded below the fold with `srcset` [07]
