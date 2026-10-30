# UI/UX Elevation — Design

**Status:** approved direction, pending build
**Date:** 2026-10-31
**Branch:** `feat/ui-ux-elevation`
**Supersedes (visually):** `docs/design/DESIGN.md` §2–§3. That document's information architecture (§4), content and voice (§6) remain authoritative and unchanged.

---

## 1. Intent

The Tronious site is a 15-page marketing site for a contract design and manufacturing organisation (CDMO) building physical-therapy and recovery devices. Its content is strong: specific standards, named deliverables, honest regulatory positioning. Its presentation is not. Every page is a 1120px bordered white card floating on grey, assembled from 1px rules and tinted blocks, with no depth, no illustration, and section padding that never exceeds 48px. The result reads as a printed specification document rather than the website of a company you would trust with a Class II device programme.

This project rebuilds the entire visual and interaction layer. **Not one word of existing copy changes.** No routes change. No backend work happens.

### Why now

The content port is complete and committed. Visual quality is the remaining gap between what exists and something that can be shown to a prospective device brand.

### Why this direction and not a generic modern refresh

The buyers are supplier-qualification, quality and regulatory teams. They are reassured by precision, traceability and specificity — not by the visual vocabulary of a consumer SaaS product. So the existing engineering identity is kept and sharpened rather than replaced. Mono eyebrows, hairline rules and gate labels survive as *supporting detail*. What changes is everything around them: scale, space, depth, illustration, rhythm and motion.

The target reference point is Linear or Stripe applied to regulated hardware — restrained, confident, obviously crafted, never decorative for its own sake.

---

## 2. Goals

1. The site reads as professionally designed at a glance, on every page, at every viewport.
2. Pages stop looking like documents: full-bleed sections, strong vertical rhythm, genuine visual hierarchy.
3. **All 15 pages** carry real visual content — bespoke SVG illustration or diagram — not just text and colour. See §9 for the full inventory.
4. Fully responsive and deliberately designed at four tiers: mobile, tablet, laptop, desktop.
5. Dark mode works properly, follows the OS by default, and is user-overridable.
6. The regulatory credibility signals get *stronger*, not weaker.
7. Lint stays clean and the test suite passes. `Header.test.tsx` and `ContactForm.test.tsx` pass unmodified; `Sheet.test.tsx` is rewritten or retired with the title block it covers (§8).
8. Responsive and accessibility verification is **actually performed**, not asserted (§12).

## 3. Non-goals

- Changes to existing copy. Headings, body text, labels and button text stay byte-identical.
- Information-architecture changes. The 15 routes, the nav set and all link targets in `lib/nav.ts` stay as they are.
- Backend work: no form endpoint, no CMS, no analytics, no cookie banner. The contact form keeps its current preview-only behaviour.
- Photography. No stock images, no photo slots.
- New routes, new pages, or new content sections that introduce facts not already on the site.
- Supplying real values for any placeholder.

## 4. Anti-goals

Things that would mean failure even if the work technically shipped:

- **Generic SaaS drift.** Large blurred gradient blobs, glassmorphism everywhere, purple, oversized pill buttons, floating 3D mockups. If it could be any B2B startup, it is wrong.
- **Credibility loss.** If a quality manager trusts the company less after the redesign, the redesign failed. Standards, gate deliverables and the honest "the client is the legal manufacturer" positioning must remain prominent and legible.
- **Fabricated specificity.** Inventing device parameters, pressures, units, timings, counts or any other plausible-looking fact to make an illustration look richer. On a regulated-device site where every real statistic is currently a placeholder, this is the worst available failure.
- **Motion that gets in the way.** Nothing may delay content becoming readable. Someone scanning for "IEC 60601-1" must never wait for an animation.
- **Decoration without meaning.** Illustrations must depict something real and drawn from content already on that page. No abstract swooshes.
- **Regression.** Broken tests, lint errors, layout shift, a half-tuned dark palette, or anything that fails at 360px width.

---

## 5. Decisions made

Decided in conversation with the project owner. Not open for the builder to revisit.

| Decision | Choice |
|---|---|
| Visual direction | Elevated engineering — keep the technical identity, raise the craft |
| Page structure | Full-bleed sections; the bordered sheet card is removed |
| Imagery | Custom SVG and CSS craft only; no photography, no photo slots |
| Illustration scope | **All 15 pages** get bespoke illustration (§9) |
| Motion | Tasteful and restrained; reduced-motion safe |
| Dark mode | Yes — OS-following default plus a header toggle, persisted |
| Placeholders | Stay visible, but restyled as editorial annotation; one flag disables marking at launch |
| Title block | **Removed.** The per-page Doc no. / Sheet / Rev / Status strip is dropped entirely |
| Rollout | Homepage first, then review, then the remaining 14 pages |
| Tooling | **Tailwind CSS v4** — chosen by the project owner over a dependency-free approach |
| Verification | **Playwright** harness; the builder verifies visually rather than handing over a checklist (§12) |

### Note on the tooling decision

A dependency-free layered-CSS system was recommended and declined in favour of Tailwind. Tailwind is a sound choice and is the documented default for this Next.js version; the tradeoff accepted is that all 15 pages and both shared components get rewritten in utility classes, and `docs/design/DESIGN.md` §2–§3 must be rewritten to describe the new token system. The builder should not relitigate this.

Verified against the bundled docs at `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`: Next.js 16.4.3 documents Tailwind v4 via the `@tailwindcss/postcss` plugin and a plain `@import` of tailwindcss in the global stylesheet. The `tailwind-v3-css.md` guide is legacy, for very old browser support only — do not follow it.

---

## 6. Constraints

- **Stack as-is otherwise.** Next.js 16.4.3 App Router, React 19.3, TypeScript, Vitest + Testing Library. Fonts stay IBM Plex Sans / Sans Condensed / Mono via `next/font/google`, already wired in `app/layout.tsx`.
- **Tests must keep passing.** `components/Header.test.tsx` and `components/ContactForm.test.tsx` assert on roles, visible text and ARIA attributes only — never class names — and must pass unmodified. Preserve the accessible names, the `aria-expanded` and `aria-current` behaviour, and the ContactForm's hidden-until-submit note. `components/Sheet.test.tsx` is the one exception, for the reason given in §8. New components get new tests.
- **One nav list, not two.** `Header.test.tsx` looks up nav links by role and accessible name, and that query **throws on multiple matches**. The rebuilt header must render a single nav list that reflows into the drawer — never a desktop nav and a drawer nav both present in the DOM. This is the easiest available way to break a test that must pass untouched.
- **Server components by default.** Only make a component a client component where interaction genuinely requires it: header menu, theme toggle, scroll reveal, contact form.
- **No layout shift.** Reveal animations must animate from a visible-but-offset state or reserve space; never from `display: none` or zero height.
- **Accessibility is a hard requirement, not a polish item.** WCAG AA contrast in both themes, visible focus on every interactive element, keyboard operability throughout, correct ARIA on the mobile drawer and the theme toggle.
- **Works at 360px.** No horizontal scroll at any width. Tables may scroll within their own container.
- **New strings policy.** Additive strings that are not visible marketing copy are permitted and expected: the skip link, the theme-toggle accessible name, the drawer label, and title elements on informative SVGs. New *visible* copy is not permitted — in particular, do not invent eyebrow text for sections that currently have none. `SectionHead` must render correctly with the eyebrow slot empty.

---

## 7. The design system

### 7.1 Token architecture

Tailwind v4 defines tokens in CSS via `@theme`. Use a two-level system:

**Level 1 — raw ramps.** Fixed values that never change between themes. Declared in `@theme` so they generate utilities.

**Level 2 — semantic aliases.** `--color-surface`, `--color-text-primary` and so on, which *point at ramp steps* and are **remapped** for dark mode. Because the alias changes rather than the utility, a class like `bg-surface` flips theme automatically and the codebase needs almost no `dark:` variants. This is the single most important structural decision in the system: prefer semantic utilities everywhere, and reserve explicit `dark:` variants for the rare case where a genuinely different *treatment* — not just a different colour — is needed.

### 7.2 Colour ramps

Derived from the existing approved palette so the brand does not drift.

**Neutral (cool slate)** — anchored on today's ink `#14212E` and paper `#F3F5F7`, with a denser dark end so that every dark-mode surface is itself a ramp step (see §7.3):

| Step | Value | Origin |
|---|---|---|
| 0 | `#FFFFFF` | existing sheet |
| 25 | `#F8FAFB` | new |
| 50 | `#F3F5F7` | existing paper |
| 100 | `#EAF0F6` | existing soft |
| 150 | `#E4EAF1` | DESIGN.md dark ink |
| 200 | `#D3DAE2` | existing rule |
| 300 | `#B6C1CE` | new |
| 350 | `#9AA8B8` | DESIGN.md dark muted |
| 400 | `#8E9DAE` | new |
| 500 | `#6B7B8E` | new |
| 600 | `#56657A` | existing muted |
| 700 | `#3C4C60` | new |
| 800 | `#26364A` | existing; absorbs DESIGN.md dark rule `#2A3746` |
| 870 | `#1A2B40` | DESIGN.md dark tint |
| 900 | `#14212E` | existing ink; absorbs DESIGN.md dark sheet `#151F2A` |
| 925 | `#111B26` | DESIGN.md dark soft |
| 940 | `#0E151D` | DESIGN.md dark paper |
| 950 | `#0B1520` | existing dark accent-ink |

**Accent (blue)** — anchored on accent `#1F5FBF`:

| Step | Value | Origin |
|---|---|---|
| 50 | `#E6EEF9` | existing tint |
| 100 | `#CBDDF4` | new |
| 200 | `#9DBEEA` | new |
| 300 | `#6FA3F0` | DESIGN.md dark-mode accent |
| 400 | `#3E86E6` | existing accent-2 |
| 500 | `#1F5FBF` | existing accent |
| 600 | `#1A4FA0` | new |
| 700 | `#164184` | new |
| 800 | `#123466` | new |
| 900 | `#0E2748` | new |

**Signal (cyan)** — the highlight colour used on dark bands:

| Step | Value | Origin |
|---|---|---|
| 300 | `#7FDCF2` | existing signal-2 |
| 400 | `#5CCBEA` | DESIGN.md dark signal |
| 500 | `#4FC3E6` | existing signal |
| 600 | `#2BA5CB` | new |

**Band (deep navy)** — dark section surfaces: `#08131E` (deep), `#0F2740` (base, existing band), `#17406B` (raised, existing band-2), `#1C3A59` (rule, existing band-line).

**Amber** — placeholders only: light `#9A5B00` on `#FFF2DB`; dark `#F2B65A` on `#33260F`.

### 7.3 Semantic aliases and dark mode

**Resolved architectural question.** `docs/design/DESIGN.md` §2.1 specifies dark values that do not all fall on the original neutral ramp. Rather than let dark aliases hold loose hexes outside the system, **the ramp is the source of truth and has been extended** (steps 150, 350, 870, 925, 940 above) so every approved dark value *is* a ramp step. Two values were close enough to snap rather than add a step: dark sheet `#151F2A` to neutral 900 `#14212E`, and dark rule `#2A3746` to neutral 800 `#26364A`. Both deltas are imperceptible in situ. This honours the approved palette and keeps the two-level, ramp-anchored architecture intact.

Alias set — the builder may extend it, but should not shrink it:

`surface`, `surface-raised`, `surface-sunken`, `surface-inverse`; `text-primary`, `text-secondary`, `text-tertiary`, `text-inverse`, `text-on-accent`; `border-subtle`, `border-default`, `border-strong`; `accent`, `accent-hover`, `accent-subtle`; `signal`; `placeholder-fg`, `placeholder-bg`.

**Theme switching mechanism.** Remap the aliases in two places, kept in sync: inside a `prefers-color-scheme: dark` media query guarded by a `:root:not([data-theme="light"])` selector, and again under an explicit `:root[data-theme="dark"]` selector with identical values. A `data-theme` attribute on the html element therefore overrides the OS, and its absence follows the OS. The `color-scheme` property must be set in both dark paths so form controls and scrollbars match. An inline script in `app/layout.tsx` must set the attribute before first paint to avoid a flash.

### 7.4 Elevation

The old design banned shadows outright. That ban is lifted — flatness is a large part of the document problem — but depth must stay disciplined and physical.

Four steps: `sm` (resting cards), `md` (hover), `lg` (drawer, sticky header once scrolled), and a dedicated focus ring. In dark mode shadows alone read poorly, so dark elevation combines a reduced shadow with a lighter top border or a raised surface step.

### 7.5 Typography

Keep the three IBM Plex families. The change is scale, rhythm and discipline, not new typefaces.

Build a fluid `clamp()`-based scale. Indicative targets, from today's values to the new ones:

| Role | Today | Target |
|---|---|---|
| Hero h1 | `clamp(2.4rem, 6vw, 4rem)` | `clamp(2.75rem, 1.5rem + 5.2vw, 5rem)`, tracking `-0.03em`, line-height ~1.02 |
| Page h1 | `clamp(2.1rem, 5.5vw, 3.5rem)` | `clamp(2.25rem, 1.4rem + 3.6vw, 3.75rem)`, tracking `-0.025em` |
| Section h2 | `clamp(1.5rem, 3vw, 2rem)` | `clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)`, tracking `-0.02em` |
| h3 | `1.2rem` | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` |
| Lead | `1.15rem` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)`, line-height 1.55 |
| Body | 16px / 1.6 | 16–17px fluid / 1.65 |
| Eyebrow | `.75rem` mono | `.75rem` mono, tracking `0.12em`, uppercase |

Rules: `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs, measure capped at ~68ch for prose, tabular numerals on all statistics and table numerics.

### 7.6 Space, layout and section rhythm

- **Section padding:** `clamp(4rem, 2rem + 7vw, 8rem)` block. The single highest-impact change — today's maximum is 48px.
- **Content container:** `min(100% - 2 × gutter, 80rem)`, so 1280px maximum.
- **Gutter:** `clamp(1.25rem, 5vw, 4rem)`, respecting the safe-area-inset handling the current CSS already does.
- **Narrow container:** 60rem, for prose-dense sections — legal, insights, careers, long tables.
- **Grid gaps:** a 4px-based scale; card grids at `clamp(1rem, 2vw, 1.5rem)`.

Sections become full-bleed with alternating tones, and the tone sequence carries page rhythm. No page should run more than two consecutive sections in the same tone.

**Resolved: rhythm must survive dark mode.** In light mode the tonal range is wide (`#FFFFFF` / `#F3F5F7` / band `#0F2740`). A literal dark mapping collapses it — surface, sunken and band all land within a few percent of each other, and the band stops being dramatic. So **`Section` tone variants are semantic roles, not fixed colours**, and they resolve differently per theme:

| Role | Light | Dark |
|---|---|---|
| `default` | surface (white) | neutral 940 |
| `sunken` | neutral 50 — *recessed* | neutral 900 — *raised, lighter than the page* |
| `band` | band base — dramatic dark | band deep **plus** an accent or signal top edge |
| `accent` | accent-subtle wash | accent 900 with a stronger border |

In dark mode, tone alternation alone cannot carry rhythm, so it is supplemented by hairline section rules at boundaries and by the band's accent edge. The builder must confirm visually (§12) that section boundaries are legible in dark on every page, not assume the mapping works.

### 7.7 Breakpoints

Tailwind defaults, plus one addition for large displays so wide screens do not look empty:

| Tier | Range | Notes |
|---|---|---|
| Mobile | < 640px | Single column throughout; drawer nav; stacked stats |
| Tablet | 640–1023px (`sm`, `md`) | Two-column card grids; drawer nav persists |
| Laptop | 1024–1439px (`lg`, `xl`) | Full horizontal nav; 3-up grids; sticky capability headings |
| Desktop | 1440px and up (`2xl`, new `3xl` at 1920px) | Wider measure, larger hero type, more generous space |

Prefer intrinsic responsiveness — `auto-fit` / `minmax()` grids and container queries — over breakpoint-hopping wherever it works. Reserve explicit breakpoints for genuine layout changes.

---

## 8. Components

Build a small shared UI layer under `components/ui/`. Pages should read as composition, not as walls of utility classes.

**Layout:** `Section` (full-bleed, semantic tone roles per §7.6, optional top rule, optional texture), `Container` (default / narrow / wide), `SectionHead` (optional eyebrow, heading, lead; must render correctly with no eyebrow — see the new-strings constraint in §6).

**Content:** `Button` (primary / ghost / subtle, on-dark variants, two sizes, renders as a link or a button), `Card`, `Badge`, `Chip`, `Stat`, `Quote`, `Note`, `Ph` (placeholder), `TickList`, `JumpNav`, `DataTable` wrapper.

**Interactive (client):** `Reveal`, `ThemeToggle`, rebuilt `Header` with mobile drawer, `ContactForm` (behaviour preserved exactly).

### No CountUp component

**Resolved and cut from scope.** §10 originally called for stats counting up on scroll. The only stats block on the site is on the homepage and all four values are placeholders. There is no number anywhere to animate, non-goal 6 forbids supplying one, and the placeholders are meant to read as editorial annotation rather than as data. Building a component with no call site to satisfy a spec is worse than dropping it.

Design the stats band so that real figures drop in cleanly later — reserve the space, set tabular numerals, size the type for two to four digits plus a unit — and revisit count-up when real content exists.

### Header

Rebuild. Today it is a flat bar that collapses at 1100px into an unstyled stacked list. The new header: sticky, transparent-to-solid as it condenses on scroll, with a refined brand mark, the seven nav links plus the CTA, and the theme toggle. Below the laptop breakpoint it becomes a proper slide-in drawer — focus trapped, body scroll locked, Escape closes, marked as a modal, animated panel, with the nav links grouped and the CTA given prominence.

**Critical:** preserve the accessible name "Menu" on the toggle button, the `aria-expanded` and `aria-controls` wiring, the `aria-current` behaviour, and the close-on-route-change logic (including the existing adjust-state-during-render pattern, which is deliberate and documented in the current source). Render **one** nav list that reflows — see the constraint in §6. `components/Header.test.tsx` depends on all of it.

### Sheet / title block

**The title block is removed.** The page card border disappears and the per-page mono strip — Doc no., Sheet, Rev A Draft, Status Content placeholders — goes with it. It is the most literal expression of the drawing-sheet metaphor, and that metaphor is no longer the site's visual language. It also labelled every page a draft in front of prospects. Pages now end on their closing CTA band and run straight into the footer.

This leaves `components/Sheet.tsx` as a near-empty wrapper. The builder decides whether it still earns its place or whether pages should render their own article element directly. If it survives, the WEB-nnn identifier should persist as a `data-doc` attribute, which keeps the document-control identity machine-readable without rendering draft status to visitors.

**Consequence for tests.** `components/Sheet.test.tsx` asserts on the title-block strings and will no longer be valid. Rewrite it to cover whatever `Sheet` becomes, or retire it alongside the component. This is correct maintenance of a test whose feature was deliberately removed by product decision — it is *not* licence to weaken or delete any other test. Check whether `lib/truncate.ts` and `lib/truncate.test.ts` become dead once the 32-character sheet-title truncation is gone.

### Placeholders

Replace the orange block highlight with an editorial annotation: mono, muted amber, a fine dotted underline, and a small leading marker glyph. Contrast must still pass AA in both themes.

**Resolved: the launch flag is a shared module, not CSS-only.** The marking is not purely inline spans — `components/Footer.tsx` carries a visible legend sentence explaining the convention. A CSS flag on the root element cannot remove that legend. So expose a single source of truth (one exported constant plus a matching root attribute) that both the stylesheet and the Footer read, so switching it off at launch silences the inline marking *and* the legend together.

---

## 9. Illustration

**All 15 pages get bespoke SVG.** Custom illustration carries the site; there is no photography. Every illustration must depict something real and drawn from content already on that page — see the "decoration without meaning" anti-goal.

### 9.1 Correction to an earlier claim

An earlier draft of this document stated that dead CSS for the hero figure (the `hx-fig`, `ch` and `sv-*` classes, and the `inflate` / `readout` / `flow` keyframes) was present in `app/globals.css`. **That is wrong.** It is not in `app/globals.css` at all. It lives in the original single-file source at `docs/design/cdmo-site.html` lines 141–164, and **no markup for the figure has ever existed in either file** — only the CSS.

The CSS is nonetheless a usable composition brief. It implies: four chambers inflating on a 0.6s stagger over a 4.8s loop; a foot outline; a pump; hoses with a flowing dash; dimension and dashed leader lines; mono annotation labels; and a four-value readout whose values illuminate in sequence with the chambers. Figure capped at 400px wide, bordered, with a mono figcaption.

### 9.2 No fabricated values

**Resolved.** The readout implies numeric values with units — pressures, chamber counts, cycle timings. None of those appear anywhere on the site, and inventing them on a regulated-device site, on a homepage where every genuine statistic is a placeholder, is exactly the credibility failure named in §4.

The readout therefore renders as an **unlabelled trace** — the sequential illumination and waveform carry the meaning, with no numerals and no units. This applies to every illustration site-wide: no invented specifications, tolerances, counts or measurements. Where an illustration genuinely needs a value, use the page's existing placeholder convention rather than inventing one.

### 9.3 Inventory

The homepage set is required for the Phase 3 review gate. The rest follow in Phase 4.

| Page | Figure | Source of truth |
|---|---|---|
| home | Animated four-chamber pneumatic compression figure (§9.1) | cdmo-site.html CSS brief |
| home | Five device-family illustrations, upgraded from the current 48px icons | existing `app/page.tsx` SVGs |
| home | Concept-to-build flow diagram | the five flow steps on the page |
| services | Six service-area icons | the six service areas listed |
| engineering | Six discipline icons | the six disciplines listed |
| expertise | Device-family comparison figure, families against standards | the existing table |
| process | Six-gate flow diagram with deliverables | the existing gated phases |
| quality | Market coverage figure, US / EU / AU pathways | the regulatory-experience content |
| manufacturing | Ten-step production flow diagram | the existing production flow steps |
| facilities | Facility schematic, zones and in-house equipment | the equipment list on the page |
| engagement | Models A–D comparison figure, scope and IP position | the four models on the page |
| about | Disciplines-converging figure, supporting the one-team claim | the engineering disciplines |
| cases | Case-study structure figure: challenge, approach, metrics | the existing case template |
| insights | Topic map linking article topics to device-lifecycle stages | the suggested topics listed |
| careers | Role map, where open roles sit in the gate flow | open roles plus the process gates |
| contact | RFQ intake flow: NDA, scoping, response window | copy already on the page |
| legal | Policy structure map: privacy, terms, cookies, accessibility | the four legal sections |

**Weakest case:** legal. A policy-structure map is navigational rather than illustrative. If it cannot be made genuinely useful, a strong typographic treatment with a sectional index is the honest fallback — flag it at review rather than shipping decoration.

### 9.4 Requirements

Inline SVG; `currentColor` or semantic tokens so figures theme correctly; hidden from assistive tech when decorative and given an accessible title when informative; stroke weights that hold at both small and large render sizes; animation gated on `prefers-reduced-motion`.

---

## 10. Motion

| Element | Behaviour |
|---|---|
| Section reveal | Fade plus 12–16px rise, once, staggered within a group, triggered by IntersectionObserver |
| Cards | Lift and shadow on hover; border shifts to accent |
| Header | Condenses and gains elevation past roughly 40px of scroll |
| Hero figure | Slow continuous chamber-inflation loop, 4.8s, 0.6s stagger |
| Buttons | Subtle lift and shadow change |
| Anchors | Smooth scroll, with `scroll-margin-top` clearing the sticky header |

Stat count-up is **not** in scope — see §8.

Easing `cubic-bezier(0.2, 0.8, 0.2, 1)`, durations 150–400ms. **Every one of these is disabled under `prefers-reduced-motion: reduce`** — content must render in its final state immediately, never hidden. Check the media query in JavaScript as well as CSS for the observer-driven effects.

---

## 11. Build order

**Phase 1 — foundation.** Install Tailwind v4 and the PostCSS plugin, add `postcss.config.mjs`, restructure `app/globals.css` around the Tailwind import and `@theme`, define all ramps and semantic aliases, wire the dark-mode remapping and the no-flash inline script, and build the `components/ui/` primitives with tests. Also install the Playwright verification harness (§12) so it is available from Phase 3 onward.

**Phase 2 — chrome.** Header with drawer and theme toggle, Footer, skip link, removal of the title block, placeholder restyle and launch flag.

**Phase 3 — homepage.** Full rebuild including the hero figure, device-family illustrations and flow diagram. Run the verification harness. **Stop here and get review.**

**Phase 4 — remaining 14 pages.** Larger than originally scoped, because all 15 pages now carry bespoke illustration (§9.3). Group as: capability pages (services, engineering, manufacturing, expertise), then process and quality, then facilities and engagement, then cases and about, then insights and careers, then contact, then legal. Treat the illustration inventory as its own work stream; it is comparable in effort to the page layout work.

**Phase 5 — close-out.** Rewrite `docs/design/DESIGN.md` §2–§3 for the Tailwind token system, remove dead CSS, full verification run, and final build, lint and test.

Phase 3 is a hard review gate. Phases 4 and 5 do not begin until the homepage direction is approved.

---

## 12. Verification

**Resolved: verification is performed, not asserted.** Add Playwright as a dev dependency with a screenshot and accessibility harness, exposed as an npm script. It is a dev dependency only and ships nothing to users.

The harness must cover:

- **120 renders** — 15 pages, four widths (360 / 768 / 1280 / 1920), two themes, captured as screenshots.
- **Automated accessibility pass** per page (axe), both themes.
- **Contrast audit** across text-on-surface pairings in both themes.
- **No horizontal scroll** assertion at every width, especially 360px.

Plus, by hand and reported honestly as hand-checked:

- Keyboard-only pass over the header drawer, theme toggle and contact form.
- `prefers-reduced-motion: reduce` honoured — content visible and static.
- Dark-mode section-boundary legibility (§7.6).

And before any completion claim:

- `npm run test` — passes. `Header.test.tsx` and `ContactForm.test.tsx` **without modification**; `Sheet.test.tsx` may change only because the title block it covers was removed by decision (§5).
- `npm run lint` — clean.
- `npm run build` — succeeds, no type errors.

**The Phase 3 review gate hands over:** the screenshot contact sheet (so the owner can review on any device without running anything), the harness output, and a running dev server for live inspection.

No completion claim may assert visual verification that was not actually run. If the harness cannot be made to work, say so and downgrade the claim rather than asserting the check.

---

## 13. Left to the builder

Deliberately not specified, to be decided during implementation with taste:

- Exact shadow values, blur radii and spread at each elevation step.
- The precise composition of each SVG illustration, within the subjects fixed in §9.3.
- Specific grid column counts per section per breakpoint.
- Whether any given section uses a container query or a breakpoint.
- Internal file organisation within `components/ui/`.
- Whether the theme toggle is a two-state switch or a three-state system / light / dark control.
- Stagger timings and reveal thresholds.
- Whether `Sheet` survives as a component (§8).
- Playwright harness structure, and whether screenshots are committed or gitignored.
