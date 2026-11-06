# Project cleanup and motion audit

Date: 2026-11-07
Branch: `chore/project-cleanup-audit` (created from `feat/modern-ui-experience` at `1067d2a`)
Scope: repository hygiene, dead code, dead CSS, stale documentation, and scroll-reveal / motion consistency across all 15 routes.

**This document is analysis only. No source file was changed.** Every item below is a recommendation for a follow-up change.

## 1. How this was checked

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Clean (exit 0) |
| `npx eslint` | Clean (exit 0) |
| `npx vitest run` | **137 / 138 pass, 1 fails** (see C1) |
| Import-graph scan of `app/`, `components/`, `lib/` | Done, see section 2 |
| CSS selector vs. markup scan of `app/globals.css` | Done, see section 3 |
| Per-page `Reveal` inventory (all 15 routes) | Done, see section 6 |
| Playwright e2e (`npm run verify`) | **Not run.** It builds and serves the app and is slow. |
| Browser / Lighthouse / LCP measurement | **Not run.** Items marked *expected* are reasoned from the code, not measured. |

The CSS scan matches `data-*` attributes and class names as plain text. It cannot see class names built from strings at runtime, so each CSS item should be confirmed with a quick search before deleting.

---

## 2. Unused code

Each file below has no importer in `app/`, `components/` or `lib/`. Where a test imports it, the test only keeps the file alive.

| # | File | Lines | Referenced by | Why it is dead | Action |
| --- | --- | --- | --- | --- | --- |
| A1 | `components/figures/HeroDeviceSuite.tsx` | 118 | nothing (no test either) | Old home hero. Replaced by `MediaPanel` + illustration. | **Delete**, with its CSS (B1). |
| A2 | `components/figures/HeroCompression.tsx` + `HeroCompression.test.tsx` | 144 + 21 | its own test only | Old home hero. Its `.chamber*` animation CSS no longer exists in `globals.css` (removed in the legacy-CSS cleanup), so it renders as a static drawing. | **Delete** both files. |
| A3 | `components/Sheet.tsx` + `Sheet.test.tsx` | 10 + 21 | its own test only | `<article data-doc>` wrapper from the original "engineering drawing sheet" prototype. Pages now use `Section`. | **Delete** both files. |
| A4 | `components/figures/DeviceComparisonFigure.tsx` (+ its block in `figures-phase4.test.tsx`) | 47 | test only | Superseded by `DeviceFamilyExplorer` + `DataTable` on `/expertise`. | **Delete**, with its CSS (B2) and its test block. |
| A5 | `components/ui/Quote.tsx` (+ block in `primitives.test.tsx`) | 23 | test only | Home testimonial was replaced by "project principles" in `e5df320`. | **Delete**, with `.ui-quote` CSS and its test block. |
| A6 | `components/ui/Stat.tsx` (+ block in `primitives.test.tsx`) | 29 | test only, and a **commented-out** block in `app/page.tsx:201-223` | The home stats section is parked because every value is a `[XX]` placeholder. | **Owner decision.** Either delete the primitive, or keep it and delete only the commented-out JSX (git history already holds it). Do not leave both. |
| A7 | `Card` prop `interactive` (`components/ui/Card.tsx`) | n/a | **0 call sites** | The hover-lift rule `.ui-card[data-interactive]` can never match. See also M13. | Either use it on cards that are real links, or remove prop + CSS. |
| A8 | `ButtonVariant`, `ButtonSize`, `SectionTone`, `NavLink` type exports | n/a | no other file | Harmless exported types. | Optional: un-export. |

Not dead, but flagged:

- `lib/theme.ts` exports `THEME_STORAGE_KEY`, `THEME_ATTRIBUTE`, `MOTION_ATTRIBUTE`, `readStoredPreference`, `storePreference`, `applyPreference` that only tests import. They are internal helpers exposed for testing. Leave as is.
- `app/layout.tsx` and each `page.tsx` default export look "unused" to a scanner. They are Next.js entry points and are required.

Net effect if A1–A5 are removed: about 5 source files, 3 test files and roughly 400 lines of TypeScript.

---

## 3. Dead and orphaned CSS (`app/globals.css`, 4,659 lines)

| # | Selector(s) | Approx. lines | Status | Action |
| --- | --- | --- | --- | --- |
| B1 | `.suite-1…5`, `.suite-spoke*`, `.suite-hub-*`, keyframes `suite-highlight`, `suite-spoke-flow`, `suite-spoke-fade`, `suite-glow-pulse`, `suite-ring-pulse`, `suite-ring-rotate`, `suite-check-draw` | ~70 (about 1733–1800) | Only used by A1 | Delete with A1. Remove the "HeroDeviceSuite figure" comment banner too. |
| B2 | `[data-device-comparison-list|name|standards]` | ~35 (about 1937–1975) | Only used by A4 | Delete with A4. |
| B3 | `.ui-quote` | few | Only used by A5 | Delete with A5. |
| B4 | `[data-discipline-card]`, `-title`, `-lead`, `-link` | ~50 (about 3366–3415) | **No markup anywhere.** The floating card was replaced by the persistent "dock" (the CSS comment at ~3417 says so) but the old rules stayed. | **Delete.** Safe. |
| B5 | `[data-case-facts]` (+ `> div`, `dt`, `dd`) | ~35 (about 3279–3311) | **No markup anywhere.** The cases page was redesigned around pathways. | **Delete.** Safe. |
| B6 | `[data-stats-grid]` | ~15 | Only the commented-out stats block (see A6) | Decide with A6. |
| B7 | `.ph.ph-wrap` alternative in the selector at line 838 | 1 selector | `Ph` renders `data-placeholder`, not `.ph` | Remove the `.ph.ph-wrap` half of the selector. |
| B8 | `.ui-card[data-interactive]` | few | See A7 | Decide with A7. |

Structural debt, not a bug:

- A single 4,659-line file holds tokens, base, components and every page's layout. Dead rules like B4/B5 survived because nothing makes ownership visible. Consider splitting into `tokens.css`, `base.css`, `components.css` and per-page partials, imported from `layout.tsx`. `app/globals.test.ts` asserts on the file, so the test would need to follow the split.
- Several rules reach into `Reveal`'s DOM, for example `.hero-section [data-hero-copy] > [data-reveal]` (line 344), `section:not([data-page-hero]) > [data-container] > [data-reveal]:first-child [data-eyebrow]` (line 391), and the grid rules at lines 452, 3902, 3946, 4247, 4487. If a page changes which element is the first child of a section, its eyebrow styling silently changes. This is fragile coupling between layout CSS and the animation wrapper.

---

## 4. Tests

| # | Finding | Action |
| --- | --- | --- |
| C1 | **Failing test.** `figures-phase4.test.tsx:256-261` (`RFQFlowFigure`) asserts text `'Response window'`, `'NDA'`, `'Scoping discussion'`. The component (rewritten in `1067d2a`) now renders `'01 · Project brief'`, `'02 · Confidentiality'`, `'03 · Scoping discussion'`. The test was not updated with the redesign. | Update the test to the new copy. Do not weaken it. |
| C2 | Tests for A2, A3, A4, A5 will be removed with those files. | Remove together. |
| C3 | `e2e/verify.spec.ts:267` logs axe `color-contrast` violations with `console.log` instead of failing. This was already listed as an open item in `UI_UX_CONSISTENCY_AUDIT.md` (launch dependency 5). | Make it blocking once the known violations are fixed. |
| C4 | `docs/superpowers/plans/2026-11-01-animation-consistency-pass.md` records "128/128 tests". The suite now has 138. | Historical, no action. Update if that doc is kept current. |

---

## 5. Repository, config and documentation hygiene

### 5.1 Local-only artefacts (untracked, already in `.gitignore`)

These are **not in git**, so cleaning them does not affect the repository. They only take disk space.

| Path | Note |
| --- | --- |
| `.next/` | 384 MB build output. Regenerated by `next dev` / `next build`. |
| `playwright-report/`, `test-results/` | e2e output. |
| `tsconfig.tsbuildinfo` (166 KB), `next-env.d.ts` | Generated. |
| `.superpowers/sdd/` | Scratch workspace of task briefs and test logs from the UI/UX phases. |
| `.claude/` | Empty. |

### 5.2 Tracked files worth acting on

| # | File | Finding | Action |
| --- | --- | --- | --- |
| D1 | `README.md` | Unmodified `create-next-app` boilerplate. It says nothing about the project, scripts (`test`, `verify`), or the placeholder policy. | Rewrite: what the site is, how to run, test, verify, where `docs/` lives. |
| D2 | `docs/design/DESIGN.md` | Partly stale: lists `Stat` and `Quote` as primitives (A5, A6); §3 says every figure's `<li>` has its own `Reveal` "including `ProcessGateFlow`", but that figure is now a carousel; §3 describes the About figure's "floating card" that was replaced by a dock (B4). | Update after the code cleanup lands. |
| D3 | `docs/superpowers/plans/2026-11-01-animation-consistency-pass.md` | Completion record of work that has since been reworked (About figure, ProcessGateFlow, nested Reveals, see M2). | Mark as superseded by this document, or archive. |
| D4 | `docs/design/UI_UX_CONSISTENCY_AUDIT.md` | Dated 2026-11-05. Many "Recommended composition" items (Contact, About, Cases, Careers, Insights, Legal, Manufacturing) were implemented in the five commits after it. | Add a status column or archive it. The launch-dependency list at the bottom is still valid. |
| D5 | `docs/design/cdmo-site.html` (68 KB) | Original prototype, referenced as "spec" by the 2026-10-30 plan. No code reads it. | Keep only as provenance. Consider `docs/archive/`. |
| D6 | `docs/superpowers/plans/*`, `specs/*` (5 files, ~140 KB) | Historical implementation plans. | Keep or move to `docs/archive/`. Folder name `superpowers` comes from a tool and says nothing to a new reader. |
| D7 | `public/images/*.png` | Three PNGs of about 2.0–2.3 MB each (6.4 MB). All three are used. `next/image` serves optimised variants, but the repository carries the large originals. | Optional: re-export as high-quality WebP/AVIF sources. |

### 5.3 Duplicated data that can drift

| # | Duplicate | Risk |
| --- | --- | --- |
| E1 | The six gate titles and deliverables exist in **both** `components/figures/ProcessGateFlow.tsx` (`GATES`) and `app/process/page.tsx` (`GATES`). The deliverable strings are the page text with the "Gate N deliverables:" prefix stripped. | Editing one page copy leaves the carousel stale. Share a `lib/process-gates.ts`. |
| E2 | `DisciplinesConvergingFigure.tsx` re-states the Engineering page's `lead` text per discipline (the older record says it was "reused verbatim"). | Same drift risk. Share from `lib/`. |
| E3 | `Section` derives "page hero" from `tone="band"` **and** the presence of `data-doc` (`Section.tsx:32`). `data-doc="WEB-xxx"` is a prototype document number, and it now doubles as a layout flag. | Hidden coupling. Replace with an explicit `hero` prop and drop the `WEB-xxx` values from the DOM. |

### 5.4 Missing project files (Next.js App Router conventions)

None of these exist under `app/`. Before adding any, read the matching guide in `node_modules/next/dist/docs/`, as `AGENTS.md` requires. This Next.js version differs from older ones.

| Missing | Effect |
| --- | --- |
| `not-found.tsx` | Unknown URLs show the framework default, outside the design system. |
| `error.tsx` / `global-error.tsx` | Runtime errors show the framework default. |
| `loading.tsx` | Optional. No route-level loading UI. |
| `robots.ts`, `sitemap.ts` | No crawl guidance for 15 routes. |
| `opengraph-image` / `icon` | Only `favicon.ico`. No share preview. |
| Metadata template | Each page repeats `'… | TRONIOUS'` and the home page title is `Home | TRONIOUS`. A `title.template` in `layout.tsx` removes the repetition. No `metadataBase`, OpenGraph or Twitter metadata. |

### 5.5 Launch content still unresolved

**Update (same branch):** all rendered `<Ph>` placeholders have since been replaced with non-fabricated wording, `PLACEHOLDER_MARKING` is now `false`, and the only remaining `[XX]` placeholders are inside the commented-out Stats block in `app/page.tsx` (see A6). Items that still need owner confirmation: the IP-ownership statement (legal review), the typical phase durations on `/process`, the "Platform / private label" model on `/engagement`, and the "ESD-protected" claim on `/facilities`. Real facility location and figures are still unpublished. The contact form is also a preview that shows a note and sends nothing (`ContactForm.tsx:124`).

---

## 6. Motion and reveal audit

### 6.1 How the system works (for reference)

- `Reveal` (`components/ui/Reveal.tsx`) fades and lifts a wrapper once, using one `IntersectionObserver` per instance (`threshold 0.05`, `rootMargin -8%` bottom).
- CSS hides `[data-reveal='pending']` only under `html[data-motion='on']`, which the head script sets only when motion is allowed and `IntersectionObserver` exists. It fails open: no JS or reduced motion means content is simply visible. This design is sound and should be kept.
- Other motion lives in CSS keyframes (ConceptFlow, ProcessGateFlow progress, About figure) and in two JS timers (ProcessGateFlow, DisciplinesConvergingFigure).
- A blanket `prefers-reduced-motion` rule (about line 617) shortens all CSS animation and transition, and a second guard next to the Reveal rules (about line 869) forces `[data-reveal]` visible.

### 6.2 Per-page reveal matrix

Legend: ✔ wrapped in `Reveal`; **inner** = the figure reveals its own `<li>` items; — = not animated by `Reveal`.

| Route | Hero heading | Hero visual | Section heads | Repeated items (stagger) | Closing CTA | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | ✔ | **—** (hero `MediaPanel` is not wrapped) | ✔ | families 60, capabilities 50, principles hand-coded 60/120/180 | one `Reveal` | ConceptFlow = **inner**. Stats section commented out. |
| `/services` | ✔ | none | ✔ | cards 50 | one `Reveal` | |
| `/engineering` | ✔ (+ JumpNav) | none | ✔ | chips 40 | two `Reveal`s, **no delay** on 2nd | Ticks and chips reveal separately from the head. |
| `/expertise` | ✔ (+ JumpNav) | none | ✔ | env. cards 0/80 | one `Reveal` | Head **and** full `DataTable` share one `Reveal`. Explorer panel swap is not animated (M7). |
| `/process` | ✔ | `ProcessGateFlow` **—** (autoplay carousel) | n/a | gates 70 | one `Reveal` | **`<ol>` > `<div>` > `<li>`: invalid HTML** (M3). |
| `/quality` | ✔ (+ JumpNav) | none | ✔ | evidence 70, markets 80, roles 0/80, extras 180 / 140 | one `Reveal` | `MarketCoverageFigure` = **inner**. |
| `/facilities` | ✔ | `MediaPanel` ✔ 100 | **first section has no head** | equipment 0/80/160 | trailing `Reveal` | `FacilitySchematic` = **inner**. Table is one block. |
| `/manufacturing` | ✔ (+ JumpNav) | `MediaPanel` ✔ 100 | ✔ | QC 60, scale stages 80 | **three** `Reveal`s, no delay | Both explorers are a single `Reveal` around an interactive widget. |
| `/engagement` | ✔ (no lead) | none | **first section has no head** | cards 0/70/140/210 | n/a | `EngagementModelsFigure` = **inner**. |
| `/cases` | ✔ | `CaseStudyFigure` ✔ 100 **and inner** | ✔ | pathways 70 | two `Reveal`s (0 / 80) | Nested reveal (M2). |
| `/about` | ✔ | `DisciplinesConvergingFigure` ✔ 100 **plus its own observer** | ✔ | principles 70 | two `Reveal`s (0 / 80) | Wrapper reveal + own arrival animation + autoplay. |
| `/careers` | ✔ | `RoleMapFigure` ✔ 100 **and inner** | ✔ | principles 70, teams 70 | two `Reveal`s (0 / 80) | Nested reveal (M2). |
| `/insights` | ✔ | `TopicMapFigure` ✔ 100 **and inner** | ✔ | topics **55** | two `Reveal`s (0 / 80) | Nested reveal (M2). |
| `/contact` | ✔ | `MediaPanel` ✔ 100 | ✔ | aside 80/140/180 | one `Reveal` | `RFQFlowFigure` ✔ 60 **and inner** (nested). |
| `/legal` | ✔ | `LegalStructureFigure` ✔ 100 **and inner** | ✔ | each policy section is **one** `Reveal` | two `Reveal`s (0 / 80) | Nested reveal (M2). |

### 6.3 Inconsistencies

| # | Severity | Finding | Where | Recommendation |
| --- | --- | --- | --- | --- |
| M1 | **High** (*expected, not measured*) | **Above-the-fold content is hidden until JS runs.** Every page's hero heading, lead and actions sit inside `Reveal`. With `data-motion='on'` they render at `opacity: 0` in the server HTML and appear only after hydration plus an observer callback. That delays visible hero text (likely LCP) on every route, and the 100 ms delayed hero visuals add to it. | All 15 routes | Give the hero a CSS-only entrance (a keyframe on load, no observer), or add an `immediate` prop that renders `data-reveal="shown"` on the server for first-viewport content. Measure LCP before and after. |
| M2 | Medium | **Nested reveals.** `/cases`, `/careers`, `/insights`, `/legal`, `/contact` wrap the figure in a page-level `Reveal` while the figure's own `<li>` items also use `Reveal`. The wrapper fades in, then each item fades in again inside it, so the effect compounds. `/engagement`, `/facilities`, `/quality`, `/` rely on the inner reveal only. Two patterns for the same component. | see matrix | Pick one. Recommended: figures own their stagger (as `2026-11-01-animation-consistency-pass.md` intended), so remove the page-level wrappers around figures that already reveal internally. |
| M3 | Medium (correctness) | **Invalid HTML.** `app/process/page.tsx:122-140` renders `<ol><Reveal><li>…</li></Reveal></ol>`. `Reveal` defaults to `<div>`, so the list contains `div` children. | `/process` | Use `<Reveal as="li">` and drop the inner `<li>`, as `/about`, `/careers`, `/manufacturing` already do. |
| M4 | Low | **Stagger step is not a constant.** Steps in use: 40, 50, 55, 60, 70, 80, 90. Page-level follow-up delays: 60, 80, 100, 120, 140, 160, 180, 200, 210. Hand-written delays on `/` (60/120/180) and `/engagement` (0/70/140/210) instead of `index * N`. The first home principle starts at 60, not 0. | whole site | Define one step (for example 60 ms) and a cap (for example 300 ms) in a helper or CSS variable. Replace hand-written delays with `index`. |
| M5 | Low | **Closing-CTA reveal differs per page.** Two `Reveal`s (head 0, actions 80) on `/about`, `/careers`, `/cases`, `/insights`, `/legal`. One `Reveal` on `/`, `/services`, `/expertise`, `/quality`. Two with **no** delay on `/engineering`. Three with no delay on `/manufacturing` (so they animate together, not staggered). | see matrix | Standardise one closing-band pattern, ideally a shared `CtaBand` component. This also removes about nine copies of the same markup. |
| M6 | Low | **Hero visual is the odd one out on Home.** On `/facilities`, `/manufacturing`, `/contact` the hero `MediaPanel` reveals at 100 ms. On `/` it does not reveal at all (it is `priority` / eager). | `/` | Treat consistently once M1 is decided. If hero content is meant to be visible immediately, the other hero panels should not be delayed either. |
| M7 | Medium | **Autoplay without a consistent pause or gating.** (a) `ProcessGateFlow` auto-advances every 4.2 s. It has a pause button, but uses its own `prefersReducedMotion()` (`ProcessGateFlow.tsx:30`) instead of the shared `shouldAnimate()`, reads the preference once per tick, and keeps running while off-screen or in a background tab. (b) `DisciplinesConvergingFigure` runs a 3.2 s `setInterval` from mount, with **no pause control**; it only stops after interaction, and runs while off-screen. (c) `ConceptFlow` on Home auto-cycles in CSS with no pause control. WCAG 2.2.2 expects a pause mechanism for motion longer than 5 s. | `/process`, `/about`, `/` | One shared hook (for example `useMotionAllowed` plus an in-view check) used by every timer. Add a pause control to (b) and (c), or stop after one cycle. |
| M8 | Low | **Reveal permanently sets `will-change`.** The rule at `globals.css` ~855 applies `will-change: opacity, transform` to **every** `[data-reveal]`, including those already `shown`. Pages carry dozens of instances (Home has 18 `Reveal` sites in JSX, several inside `.map()`), each potentially keeping a compositor layer. `transition-delay: var(--reveal-delay)` also stays after reveal. | all routes | Apply `will-change` and the delay only while `pending`; clear after `shown` (CSS-only: scope them to `[data-reveal='pending']`, or use `transitionend`). |
| M9 | Medium (*expected*) | **No print handling.** There is no `@media print` rule, so under `data-motion='on'` any block never scrolled into view stays hidden when printed or exported to PDF. The earlier audit noted the same effect for full-page screenshots. | all routes | Add `@media print { [data-reveal] { opacity: 1 !important; transform: none !important } }`. |
| M10 | Low | **Several pages reveal whole large blocks as one unit.** `/legal` policy sections (each ~45 lines), `/expertise` head plus the full table, `/facilities` table, `/manufacturing` explorers. These pop in as slabs, unlike the card-by-card pages. | see matrix | Acceptable for legal text. For tables and explorers, reveal the head first and the body 80 ms later, as the other pages do. |
| M11 | Low | **Two heroes have no lead or visual.** `/engagement` hero is a bare title with no lead and no hero figure, while its neighbours (`/cases`, `/careers`) pair copy with a figure. | `/engagement`, `/services` | Content decision, noted for visual consistency. |
| M12 | Low | **Sections without a `SectionHead` break the reveal pattern** (head first, items staggered): the first content section of `/facilities` and `/engagement` starts with a figure only. | `/facilities`, `/engagement` | Add a head or accept the exception and document it. |
| M13 | Low | **Hover feedback is inconsistent.** Lift-on-hover exists only for `[data-fam-card]`, `[data-cap-item]` and `.ui-card[data-interactive]`, and nothing uses `interactive` (A7). Cards that contain links (Services with `more` links, Insights topics, Case pathways, Careers teams) do not respond to the pointer, while Home cards do. `data-more-link` changes colour only. | whole site | Decide the rule. Either apply `interactive` to cards whose whole surface is a link, or accept static cards and delete the prop. The earlier audit specified "use `interactive` only when the whole surface performs an action", but no card currently does. |

### 6.4 Missing motion and reveal effects

| # | Missing | Where | Suggested treatment |
| --- | --- | --- | --- |
| G1 | **Panel content swap is instant.** Selecting a tab replaces the panel with no transition. | `DeviceFamilyExplorer` (`/expertise`), `ManufacturingTransfer` (only its progress bar animates), `ProductionFlowFigure` panel (`/manufacturing`) | 150–200 ms cross-fade or short slide using `--ease-out-soft`; under reduced motion keep it instant. `ProcessGateFlow` already animates its active state, so these three are the outliers. |
| G2 | **No active-section feedback in `JumpNav`.** The header has a reading-progress bar, but the in-page nav never highlights the current section. | `/engineering`, `/expertise`, `/manufacturing`, `/quality` | `IntersectionObserver` scroll-spy setting `aria-current`; transition the underline. |
| G3 | **Form submit has no feedback motion.** `ContactForm` un-hides a note (`Note hidden`) with no transition, no scroll or focus move to the message, and no pending state on the button. | `/contact` | Move focus to the message (or use a status region), fade it in. Revisit when a real backend is connected. |
| G4 | **`aria-controls` points at missing elements.** In `DeviceFamilyExplorer` only the active panel is in the DOM, so the other five tabs reference ids that do not exist. This is not motion, but it is found in the same component as G1 and should be fixed in the same change. | `/expertise` | Render all panels and toggle `hidden`, which also makes the cross-fade in G1 straightforward. |
| G5 | **Reveal on the Home hero image and some figures is absent** (M6) and the **`ProcessGateFlow` carousel has no entrance** while every other page hero visual does. | `/`, `/process` | Resolve with M1. |
| G6 | **No route-level transition or loading state** (no `loading.tsx`, no view transition). Navigation is a hard swap. | whole site | Optional polish. Only if wanted, check the Next.js docs in `node_modules/next/dist/docs/` first. |
| G7 | **Header and footer have no entrance or scroll state** beyond the progress bar. | `Header`, `Footer` | Likely intentional (chrome should be stable). Listed for completeness, no change proposed. |

---

## 7. Suggested order of work

Each step is independent and can be its own commit. Run `npx tsc --noEmit`, `npx eslint` and `npx vitest run` after each.

1. **Fix the red test** (C1). A failing suite hides real regressions.
2. **Delete confirmed-dead code and CSS**: A1–A5 with B1–B5, B7. Mechanical, low risk, about 400 lines of TypeScript and about 200 of CSS.
3. **Decide A6 / A7 / B6 / B8** (stats section and the `interactive` card). These need an owner decision, not just an edit.
4. **Fix correctness items**: M3 (invalid `<ol>`), G4 (`aria-controls`), M9 (print).
5. **Motion consistency**: M2 (nested reveals), M4 (one stagger step), M5 (shared closing band), M8 (`will-change`).
6. **Hero entrance decision** (M1, M6, G5). Measure LCP first and last so the change is evidence-based.
7. **Autoplay hygiene** (M7) with one shared motion hook.
8. **Missing effects** (G1–G3) as separate small changes.
9. **De-duplicate data** (E1–E3) and rewrite `README.md` (D1).
10. **Docs pass** (D2–D6) after the code settles, so they describe the final state.
11. **Add missing Next.js files** (section 5.4): `not-found`, `error`, `sitemap`, `robots`, metadata template. Read the local Next docs first.

Local disk cleanup (5.1) can be done at any time and does not touch git.
