# 22 · Design process: from blank page to shipped screen — Cloud Design System
> A repeatable six-step workflow that turns any brief into a shipped page — content first, structure second, system tokens third, polish last.

## Principles

1. **One job per page.** Every page exists so one kind of person can take one action. If you can't say it in a sentence, you're not ready to draw.
2. **Content before chrome.** Real headings, real copy, real data — layout decisions made on lorem ipsum collapse the moment real words arrive.
3. **Mobile first, color last.** Design the 375px layout in greyscale before the 1440px one in color. Constraints early, decoration late.
4. **States are the design.** Loading, empty, error, and long-content states aren't edge cases — most users will meet at least one of them.
5. **Pull, don't invent.** Every component you need is in docs 09–14. A page is an arrangement of the system, not an extension of it.

## The system

The six steps, in order — each has an exit criterion; don't advance until it's met:

| Step | Name | You produce | Exit criterion |
|---|---|---|---|
| 0 | Define the job | One sentence: audience + the ONE action | The sentence names the single primary button |
| 1 | Content first | Real content list + grey-box wireframe, mobile first | Every box contains real words; zero color, zero imagery |
| 2 | Structure | 12-col grid placement + layout pattern + hierarchy | One focal point survives the squint test (doc 21) |
| 3 | Apply the system | Tokens in order: spacing → type → neutrals → accent | Accent covers ≤10% of the view; no improvised components |
| 4 | States & edge cases | Loading, empty, error, long-content, mobile states | Every dynamic region has all five states designed |
| 5 | Verify | Checklist pass + squint, keyboard, dark-mode passes | [New-page checklist](checklists/new-page-checklist.md) is green |

Skipping a step doesn't save time — it moves the cost to review, where it's 10× more expensive to fix.

## Process

### Step 0 — define the job

Write one sentence: **"This page is for [who], and the one action they should take is [what]."**

- "This page is for trial users deciding whether to upgrade, and the one action is *Start free trial*."
- That action becomes the page's **single primary button** (doc 09 — one per view). Everything else on the page either supports that action or earns removal.
- Can't reduce to one action? You have two pages. Split them.

### Step 1 — content first

1. **List the real content** before drawing anything: every heading, every paragraph of copy, every number, label, and link. Write it in a plain text file. If copy doesn't exist yet, draft it now — never lorem ipsum (doc 17 has the voice rules).
2. **Grey-box wireframe**: rectangles + real text only. No color, no imagery, no icons, no shadows. Backgrounds are white and one grey; type may use size and weight only.
3. **Mobile layout first** (375px, single column), then desktop. If the hierarchy works in one column, columns are an enhancement; the reverse is never true (doc 16).

### Step 2 — structure

1. **Place content on the 12-column grid** — 24px gutters, 1280px max width, 24px page margins (doc 03).
2. **Choose the layout pattern** — don't invent one:
   | Pattern | Grid use | Best for |
   |---|---|---|
   | Centered article | Single 66ch column, centered | Blog posts, docs, legal |
   | Sidebar app shell | Fixed sidebar + fluid 12-col main | Dashboards, settings, tools |
   | Card grid | 12 cols → 3–4 card columns → 1 on mobile | Catalogs, listings, galleries |
   | Hero + sections | Full-width bands, content capped at 1280px | Marketing, landing pages |
3. **Establish hierarchy** per doc 21: exactly one focal point per view, one `<h1>`, size/weight/space descending from it. Section gaps ≥64px desktop, 48px mobile.

### Step 3 — apply the system

Apply tokens **in this order** — each pass is complete before the next starts:

1. **Spacing** — snap every gap to the 4px scale (doc 03). Proximity does hierarchy work before color ever does.
2. **Typography** — map headings/body to the named scale: hero `text-5xl`, H2 `text-4xl`, body `text-md` at 45–75ch (doc 02).
3. **Neutrals** — page `cloud-50`, cards `cloud-0`, sunken areas `cloud-100`; text `cloud-900`/`cloud-600`; borders `cloud-200` (doc 01). The page should look finished in greyscale.
4. **Accent last** — sky-600 on the primary button, links, and the focal point only. This is the 10% of 60-30-10. If the greyscale page didn't read clearly, accent won't save it.

Components come from docs 09–14 as documented — never improvise a variant. Need something the docs don't have? That's a governance proposal (doc 20), not a one-off.

### Step 4 — states & edge cases

Every dynamic region needs all five designed **before** the page is "done" (doc 13):

| State | Design it as |
|---|---|
| Loading | Skeletons for content, spinner-in-button for actions; nothing shifts layout |
| Empty | Icon + one-line explanation + one action — never a blank region |
| Error | What happened + how to fix it, coral tint per doc 13 — never a bare code |
| Long content | 2× expected text length: names wrap or truncate with title, tables scroll |
| Mobile | Real 375px pass: 44px targets, full-width buttons, no horizontal scroll |

### Step 5 — verify

1. Run [checklists/new-page-checklist.md](checklists/new-page-checklist.md) line by line.
2. **Squint test**: blur your eyes — the focal point and primary button should still be findable.
3. **Keyboard pass**: tab through everything; order follows visual order; focus ring visible on every stop (doc 15).
4. **Dark mode pass**: toggle `[data-theme="dark"]` — no hardcoded hex survives, contrast holds (doc 19).

### Worked example — landing page for "Driftless", a form-analytics tool

- **Step 0**: "For product managers evaluating form analytics; the one action is *Start free trial*." → one primary button, repeated in hero and footer CTA (same action, so still one primary *per section*).
- **Step 1**: Content list: H1 "See where your forms lose people", subhead (18 words), 3 feature blurbs with real copy, 1 stat ("34% average drop-off recovered"), 2 testimonials, pricing line, footer links. Grey-boxed at 375px: single column, hero → features → proof → CTA.
- **Step 2**: Pattern = hero + sections. Hero text spans cols 1–7 on desktop; features become a 3-card grid (cols of 4); testimonials 2-up; final CTA centered. Focal point = H1 + primary button; squints correctly.
- **Step 3**: Spacing pass (96px between sections desktop, 48 mobile) → type pass (H1 `text-5xl`, blurbs `text-md`) → neutrals (page `cloud-50`, cards `cloud-0`) → accent: sky-600 on the two trial buttons and the stat figure; signature gradient allowed once, on the hero band.
- **Step 4**: Testimonials get an empty state (hide the section, don't ship placeholders); the trial button gets a loading spinner; long company names in testimonials truncate.
- **Step 5**: Checklist green; squint shows H1 then button; tab order hero → nav → features → CTA; dark mode remaps cleanly.

## Usage

Step 1 grey-box — rectangles and real text only:

```html
<main class="greybox">
  <section><h1>See where your forms lose people</h1>
    <p>Field-by-field analytics that shows exactly where users abandon.</p>
    <div class="box">[primary action: Start free trial]</div>
  </section>
</main>
```

```css
.greybox { font-family: var(--cds-font-sans); color: #333; background: #fff; }
.greybox .box { border: 2px solid #999; padding: 16px; }
/* No --cds-color-* tokens yet — greyscale is the point at this step */
```

Step 3 accent pass — color arrives last, and only on the focal point:

```css
.hero { background: var(--cds-color-bg-page); padding-block: var(--cds-space-24); }
.hero h1 { font-size: var(--cds-text-5xl); color: var(--cds-color-text-primary); }
.hero .btn-primary {
  background: var(--cds-color-action-primary); /* sky-600 — the 10% */
  color: var(--cds-color-cloud-0);
  border-radius: var(--cds-radius-md);
  min-height: 40px; padding-inline: var(--cds-space-4);
}
```

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Write the one-sentence job first and let it name the single primary button | Don't open a canvas and start "exploring" — pages without a defined action grow three competing CTAs |
| Draft real headings and copy before drawing a single rectangle | Don't wireframe with lorem ipsum — "Lorem ipsum dolor" and "Start free trial" need completely different layouts |
| Grey-box at 375px first, then widen to desktop | Don't design a 1440px masterpiece and then "squeeze" it — sidebars and 4-col grids don't squeeze, they break |
| Keep step 1–2 output strictly greyscale: white, one grey, size, weight | Don't start in color — a page that only reads because the accent shouts has no hierarchy underneath |
| Apply tokens in order: spacing → type → neutrals → accent last | Don't paint sky-600 across headings, icons, and backgrounds first and rationalize it later — accent is ≤10% |
| Pull buttons, cards, and forms from docs 09–14 exactly as specified | Don't invent a component mid-page — a "slightly different" 36px button becomes a permanent fork |
| Design loading, empty, error, and long-content states before calling it done | Don't ship the happy path and let the empty dashboard greet every new user as a blank void |
| Pick one of the four layout patterns and place content on the 12-col grid | Don't freehand column widths — 5.5 columns with a 20px gutter matches nothing else on the site |
| Route a genuinely missing component through the governance proposal (doc 20) | Don't hardcode a one-off variant because the deadline is tomorrow — document or propose, never fork silently |
| Run squint, keyboard, and dark-mode passes on the real build | Don't verify only in a design tool — focus rings, tab order, and theme remaps exist only in the browser |

## Checklist

- [ ] The page's job fits in one sentence naming who it's for and the ONE action
- [ ] All content is real — no lorem ipsum, no placeholder numbers, no "TBD" headings
- [ ] Grey-box wireframe existed before any color or imagery decision
- [ ] Mobile (375px) layout was designed before desktop
- [ ] Layout uses one of the four patterns on the 12-column grid
- [ ] Tokens were applied in order — spacing, type, neutrals, then accent (≤10% of the view)
- [ ] Every component matches docs 09–14 — zero improvised variants
- [ ] Loading, empty, error, long-content, and mobile states all designed
- [ ] Squint test, keyboard pass, and dark-mode pass all completed in the browser
- [ ] [New-page checklist](checklists/new-page-checklist.md) run and green

## Related

- [21 · Visual hierarchy](./21-visual-hierarchy.md) — the one-focal-point rules step 2 applies
- [03 · Spacing, layout & grid](./03-spacing-layout-grid.md) — the grid and spacing scale
- [01 · Color](./01-color.md) — 60-30-10 and why accent comes last
- [13 · Feedback](./13-feedback.md) — loading, empty, and error state patterns
- [16 · Responsive design](./16-responsive.md) — mobile-first mechanics
- [20 · Governance](./20-governance.md) — what to do when the system lacks a component
