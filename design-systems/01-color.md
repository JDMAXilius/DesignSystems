# 01 · Color — Cloud Design System
> Defines every color in CDS, what each one means, and which combinations are safe to ship.

## Principles

1. **Neutral first.** Screens are ~60% cloud neutrals; color is information, not wallpaper.
2. **Meaning is fixed.** Sky means interactive, Meadow means success, Coral means danger — never swap roles.
3. **Contrast is non-negotiable.** Every text/background pair must pass WCAG 2.2 AA before it ships.
4. **One hero moment.** The signature gradient appears at most once per view, on the thing that matters most.
5. **Tokens, not hex.** Components reference semantic tokens (`--cds-color-text-primary`), never raw values.

## The system

### Neutrals — "Cloud" (cool gray ramp)

| Token | Hex | Typical use |
|---|---|---|
| cloud-0 | #FFFFFF | card/surface backgrounds |
| cloud-50 | #F8FAFC | page background |
| cloud-100 | #F1F5F9 | sunken areas, table stripes |
| cloud-200 | #E2E8F0 | default borders, dividers |
| cloud-300 | #CBD5E1 | strong borders, input borders |
| cloud-400 | #94A3B8 | muted text (large/disabled only) |
| cloud-500 | #64748B | icons, placeholder text |
| cloud-600 | #475569 | secondary text |
| cloud-700 | #334155 | strong secondary text |
| cloud-800 | #1E293B | dark-mode raised surfaces |
| cloud-900 | #0F172A | primary text; dark-mode surface |
| cloud-950 | #020617 | dark-mode page background |

### Primary — "Sky"

| Token | Hex | Typical use |
|---|---|---|
| sky-50 | #F0F9FF | info tint background |
| sky-100 | #E0F2FE | selected row, focus ring fill |
| sky-200 | #BAE6FD | info tint border |
| sky-300 | #7DD3FC | dark-mode hover |
| sky-400 | #38BDF8 | dark-mode primary; gradient start |
| sky-500 | #0EA5E9 | focus ring |
| sky-600 | #0284C7 | default interactive / primary buttons (4.8:1 on white) |
| sky-700 | #0369A1 | hover |
| sky-800 | #075985 | active/pressed |
| sky-900 | #0C4A6E | deep accents |

### Secondary — "Twilight" (indigo)

| Token | Hex | Typical use |
|---|---|---|
| twilight-50 | #EEF2FF | subtle tint backgrounds |
| twilight-100 | #E0E7FF | selected/highlight tints |
| twilight-300 | #A5B4FC | dark-mode secondary accents |
| twilight-500 | #6366F1 | gradient end, illustrations |
| twilight-600 | #4F46E5 | default secondary accent |
| twilight-700 | #4338CA | secondary hover |
| twilight-900 | #312E81 | deep secondary accents |

### Status colors

| Role | Base (bg/solid) | Text-on-light | Tint bg | Tint border |
|---|---|---|---|---|
| Success "Meadow" | #16A34A | #15803D | #F0FDF4 | #BBF7D0 |
| Warning "Sun" | #F59E0B | #B45309 | #FFFBEB | #FDE68A |
| Danger "Coral" | #DC2626 | #B91C1C | #FEF2F2 | #FECACA |
| Info | #0284C7 (sky-600) | #0369A1 | #F0F9FF (sky-50) | #BAE6FD (sky-200) |

Status usage rules:
- Solid base colors are for buttons and badges with white text — except Warning: white on #F59E0B fails contrast (2.15:1), so warning surfaces use cloud-900 text (8.31:1) or the tint treatment.
- Tint treatment (tint bg + tint border + text-on-light color) is the default for banners, alerts, and inline messages.
- Always pair status color with an icon and text; color is never the only signal.

### Semantic roles (light mode)

| Role | Token | Value |
|---|---|---|
| bg/page | cloud-50 | #F8FAFC |
| bg/surface | cloud-0 | #FFFFFF |
| bg/sunken | cloud-100 | #F1F5F9 |
| text/primary | cloud-900 | #0F172A |
| text/secondary | cloud-600 | #475569 |
| text/muted | cloud-400 | #94A3B8 (large text/disabled only) |
| border/default | cloud-200 | #E2E8F0 |
| border/strong | cloud-300 | #CBD5E1 |
| focus ring | sky-500 | #0EA5E9, 2px ring at 2px offset |

Dark mode roles: bg/page cloud-950, bg/surface cloud-900, bg/raised cloud-800, text/primary cloud-50, text/secondary cloud-300, borders cloud-700/800. Interactive shifts up the ramp: primary becomes sky-400 (#38BDF8), hover sky-300. Never pure black backgrounds or pure white text — use cloud-950 and cloud-50.

### The 60-30-10 rule

- **~60% neutral surfaces** — cloud-0/50/100 backgrounds and cards carry the layout.
- **~30% secondary/structural** — borders, secondary text, icons, table chrome in cloud-200–700.
- **~10% accent** — sky/twilight on the actions and highlights that deserve attention.

If a screen feels loud, count the accents: the fix is almost always returning accent usage to ~10%.

### Contrast pairing table (WCAG 2.2 AA)

| Text token | On background | Ratio | Verdict |
|---|---|---|---|
| cloud-900 | cloud-0 (white) | 17.85:1 | ✅ AAA — all text |
| cloud-900 | cloud-50 | 17.06:1 | ✅ AAA — all text |
| cloud-900 | cloud-100 | 16.30:1 | ✅ AAA — all text |
| cloud-700 | cloud-0 | 10.35:1 | ✅ AAA — all text |
| cloud-600 | cloud-0 | 7.58:1 | ✅ AAA — all text |
| cloud-600 | cloud-50 | 7.24:1 | ✅ AAA — all text |
| cloud-500 | cloud-0 | 4.76:1 | ✅ AA — body text minimum |
| cloud-400 | cloud-0 | 2.56:1 | ❌ fails — large/disabled text only |
| sky-600 | cloud-0 | 4.8:1 | ✅ AA — links, primary text accents |
| sky-700 | cloud-0 | 5.93:1 | ✅ AA — link hover |
| sky-400 | cloud-0 | 2.14:1 | ❌ fails on light — dark mode only |
| white | sky-600 | 4.8:1 | ✅ AA — primary button labels |
| white | #DC2626 | 4.83:1 | ✅ AA — destructive button labels |
| twilight-600 | cloud-0 | 6.29:1 | ✅ AA — secondary accents |
| #15803D | #F0FDF4 | 4.79:1 | ✅ AA — success message text |
| #B45309 | #FFFBEB | 4.84:1 | ✅ AA — warning message text |
| #B91C1C | #FEF2F2 | 5.91:1 | ✅ AA — danger message text |
| #0369A1 | #F0F9FF | 5.57:1 | ✅ AA — info message text |
| cloud-50 | cloud-950 | 19.28:1 | ✅ AAA — dark mode body |
| sky-400 | cloud-950 | 9.42:1 | ✅ AAA — dark mode interactive |

### Signature gradient

`linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)` (sky-400 → twilight-500)

Rules: hero moments only, maximum one per view. Use on hero backgrounds, feature banners, or a single flagship CTA. Text over the gradient must pass contrast across the entire gradient — white works over the twilight end but verify over the sky-400 start; prefer cloud-900 text or a scrim when in doubt. Never use the gradient on body text, borders, or repeated components like cards in a grid.

## Tokens

```css
:root {
  /* Neutrals — cloud */
  --cds-color-cloud-0: #FFFFFF;
  --cds-color-cloud-50: #F8FAFC;
  --cds-color-cloud-100: #F1F5F9;
  --cds-color-cloud-200: #E2E8F0;
  --cds-color-cloud-300: #CBD5E1;
  --cds-color-cloud-400: #94A3B8;
  --cds-color-cloud-500: #64748B;
  --cds-color-cloud-600: #475569;
  --cds-color-cloud-700: #334155;
  --cds-color-cloud-800: #1E293B;
  --cds-color-cloud-900: #0F172A;
  --cds-color-cloud-950: #020617;

  /* Primary — sky */
  --cds-color-sky-50: #F0F9FF;
  --cds-color-sky-100: #E0F2FE;
  --cds-color-sky-200: #BAE6FD;
  --cds-color-sky-300: #7DD3FC;
  --cds-color-sky-400: #38BDF8;
  --cds-color-sky-500: #0EA5E9;
  --cds-color-sky-600: #0284C7;
  --cds-color-sky-700: #0369A1;
  --cds-color-sky-800: #075985;
  --cds-color-sky-900: #0C4A6E;

  /* Secondary — twilight */
  --cds-color-twilight-50: #EEF2FF;
  --cds-color-twilight-100: #E0E7FF;
  --cds-color-twilight-300: #A5B4FC;
  --cds-color-twilight-500: #6366F1;
  --cds-color-twilight-600: #4F46E5;
  --cds-color-twilight-700: #4338CA;
  --cds-color-twilight-900: #312E81;

  /* Status */
  --cds-color-success: #16A34A;
  --cds-color-success-text: #15803D;
  --cds-color-success-tint: #F0FDF4;
  --cds-color-success-border: #BBF7D0;
  --cds-color-warning: #F59E0B;
  --cds-color-warning-text: #B45309;
  --cds-color-warning-tint: #FFFBEB;
  --cds-color-warning-border: #FDE68A;
  --cds-color-danger: #DC2626;
  --cds-color-danger-text: #B91C1C;
  --cds-color-danger-tint: #FEF2F2;
  --cds-color-danger-border: #FECACA;
  --cds-color-info: #0284C7;
  --cds-color-info-text: #0369A1;
  --cds-color-info-tint: #F0F9FF;
  --cds-color-info-border: #BAE6FD;

  /* Semantic (light mode) */
  --cds-color-bg-page: var(--cds-color-cloud-50);
  --cds-color-bg-surface: var(--cds-color-cloud-0);
  --cds-color-bg-sunken: var(--cds-color-cloud-100);
  --cds-color-text-primary: var(--cds-color-cloud-900);
  --cds-color-text-secondary: var(--cds-color-cloud-600);
  --cds-color-text-muted: var(--cds-color-cloud-400);
  --cds-color-border: var(--cds-color-cloud-200);
  --cds-color-border-strong: var(--cds-color-cloud-300);
  --cds-color-primary: var(--cds-color-sky-600);
  --cds-color-primary-hover: var(--cds-color-sky-700);
  --cds-color-primary-active: var(--cds-color-sky-800);
  --cds-color-secondary: var(--cds-color-twilight-600);
  --cds-color-focus-ring: var(--cds-color-sky-500);

  /* Signature gradient */
  --cds-gradient-signature: linear-gradient(135deg, #38BDF8 0%, #6366F1 100%);
}
```

## Usage

Primary button with the full interactive ramp and focus ring:

```css
.cds-button-primary {
  background: var(--cds-color-primary);      /* sky-600 — white label passes AA */
  color: var(--cds-color-cloud-0);
}
.cds-button-primary:hover { background: var(--cds-color-primary-hover); }   /* sky-700 */
.cds-button-primary:active { background: var(--cds-color-primary-active); } /* sky-800 */
.cds-button-primary:focus-visible {
  outline: 2px solid var(--cds-color-focus-ring);
  outline-offset: 2px;
}
```

Status banner using the tint treatment (icon + text, never color alone):

```html
<div class="cds-alert cds-alert--success" role="status">
  <svg aria-hidden="true"><!-- check icon, stroke: currentColor --></svg>
  <p>Project saved. All changes are backed up.</p>
</div>

<style>
.cds-alert--success {
  background: var(--cds-color-success-tint);   /* #F0FDF4 */
  border: 1px solid var(--cds-color-success-border); /* #BBF7D0 */
  color: var(--cds-color-success-text);        /* #15803D — 4.79:1 on tint */
}
</style>
```

Hero with the signature gradient (once per view):

```css
.cds-hero {
  background: var(--cds-gradient-signature);
  color: var(--cds-color-cloud-0); /* verify contrast across the full gradient */
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use sky-600 (#0284C7) for primary buttons and links — 4.8:1 on white passes AA | Don't use sky-400 (#38BDF8) text on white — it fails contrast at 2.14:1; it belongs to dark mode |
| Use cloud-600 (7.58:1 on white) for secondary text | Don't use cloud-400 for body text on white — 2.56:1 fails AA; reserve it for large or disabled text |
| Use cloud-900 text on Sun amber (#F59E0B) surfaces — 8.31:1 | Don't put white text on the amber warning color — 2.15:1 is unreadable |
| Keep accents to ~10% of the screen per the 60-30-10 rule | Don't paint sidebars, headers, and cards in sky — a saturated 40%-blue screen has no room for emphasis |
| Use the tint treatment (#FEF2F2 bg, #FECACA border, #B91C1C text) for inline error messages | Don't use solid #DC2626 backgrounds for passive messages — solid danger is for destructive actions only |
| Use one signature gradient per view, on the hero moment | Don't repeat the gradient on every card in a grid — repeated heroes mean no hero |
| Shift interactive color up the ramp in dark mode: sky-400 on cloud-950 (9.42:1) | Don't keep sky-600 buttons as link text on cloud-950 backgrounds — dark mode needs lighter, not identical, accents |
| Use cloud-950 pages and cloud-50 text in dark mode | Don't use pure black (#000000) backgrounds or pure white text — the harsh contrast breaks the calm, tinted feel |
| Pair every status color with an icon and message text | Don't mark a failed row with a red border alone — colorblind users can't see the state |
| Reference semantic tokens (`--cds-color-text-primary`) in components | Don't hardcode #0F172A in component CSS — hardcoded hex silently breaks dark mode |

## Checklist

- [ ] Every text/background pair appears in (or beats) the contrast table — nothing below 4.5:1 for normal text
- [ ] cloud-400 appears only on large (≥ 24px / 19px bold) or disabled text
- [ ] Accents cover ~10% of the view; neutrals ~60%
- [ ] At most one signature gradient on the view, with verified text contrast across it
- [ ] Status colors always ship with an icon and message
- [ ] Warning surfaces use cloud-900 or #B45309 text, never white
- [ ] All colors referenced via `--cds-color-*` tokens, no raw hex in components
- [ ] Dark mode uses cloud-950/900 surfaces and sky-400 interactive — no pure black/white
- [ ] Focus states use the sky-500 ring at 2px offset on every interactive element

## Related

- [00 · Design principles](./00-design-principles.md)
- [02 · Typography](./02-typography.md)
- [03 · Spacing, layout & grid](./03-spacing-layout-grid.md)
