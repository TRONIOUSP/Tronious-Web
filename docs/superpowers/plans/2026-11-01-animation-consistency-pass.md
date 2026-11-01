# Animation consistency pass — completion record

> This is a record of work already done, not a plan to execute. It follows
> the dated-file convention of the other documents in this folder so the
> animation rollout has the same paper trail as Phase 4.

**Why:** Phase 4 (`2026-11-01-ui-ux-elevation-phase-4.md`) rebuilt all 14
non-home routes onto the design system's primitives, but only `app/page.tsx`
(Home) ever wrapped its sections and grid items in `Reveal`. Every other page
rendered with zero entrance animation, and the `Reveal` component's own
decorative figures (`ProcessGateFlow`, `CaseStudyFigure`, etc.) faded in as
one block instead of card-by-card. This pass closes both gaps and adds one
new interactive figure on the About page.

**Spec / prior art:** `docs/design/DESIGN.md` §2.6 (Motion) and §3 (`Reveal`,
Figures) — updated alongside this work to describe the new state.

---

## 1. About page — `DisciplinesConvergingFigure` interactivity

`components/figures/DisciplinesConvergingFigure.tsx` gained its own
client-side behaviour, layered on top of (not replacing) the `Reveal`
convention:

- **Entrance:** the six discipline nodes rotate into place around the shared
  center the first time the figure scrolls into view — gated the same way
  `Reveal` gates its own entrance (`html[data-motion='on']` plus the
  component's own `IntersectionObserver`), so without JS, without
  `IntersectionObserver`, or under `prefers-reduced-motion: reduce` the
  diagram simply renders in its final position.
- **Hover / focus / tap:** hovering, keyboard-focusing, or tapping a node
  highlights it (accent stroke + its spoke) and opens a floating card with
  that discipline's description and a link to its section on the Engineering
  page. The card copy is the Engineering page's own `lead` text, reused
  verbatim rather than invented, so the two pages never drift apart.
- A first iteration used a cursor-parallax tilt + proximity-glow effect
  instead; it was replaced with the rotate-in-and-card-on-hover design above
  at the user's request, since it better suited the content (something to
  read, not just something to watch move).

A real bug was caught and fixed during this work: the node circles had
`fill="none"`, so hovering inside the ring (not just on the stroke) never
registered a pointer event. Fixed by adding an invisible, larger
`fill="transparent"` hit-target circle per node.

## 2. `Reveal` rolled out to all 14 remaining routes

Every page under `app/` other than Home now follows Home's own convention:

- A `SectionHead` (plus any lead paragraph directly under it) is wrapped in
  one `<Reveal>` with no delay.
- Each item rendered from a `.map()` over an array — cards, chips, ticks,
  table rows, list items — gets its own `<Reveal key={...} delay={i * N}>`,
  with `N` picked per grid (roughly 40–100ms, smaller for bigger grids).
- A single non-repeated block (a closing CTA, a quote, a lone figure) is
  wrapped as one `<Reveal>`.

Files touched: `app/{about,careers,cases,contact,engagement,engineering,
expertise,facilities,insights,legal,manufacturing,process,quality,
services}/page.tsx`.

## 3. Per-card stagger inside decorative figures

Several figures under `components/figures/` render their own repeated
`<li>` "cards" internally (e.g. the six gate cards in `ProcessGateFlow`,
shown as an example during this work). Before this pass, a page wrapped the
*whole figure* in a single `<Reveal>`, so all of a figure's cards appeared
together instead of staggering individually — inconsistent with every other
repeated grid on the site.

Fixed by moving the `Reveal` *inside* each figure, onto its mapped `<li>`
(`<Reveal as="li" key={...} delay={i * N}>`), and removing the
now-redundant page-level wrapper around the figure. Where a page's original
`Reveal` wrapped the figure *together with* something else (a `DataTable`,
the contact form), the two were split so the figure animates itself and the
other content keeps its own single-block `Reveal`.

Figures updated: `ProcessGateFlow`, `CaseStudyFigure`, `ConceptFlow` (Home),
`DeviceComparisonFigure`, `EngagementModelsFigure`, `FacilitySchematic`,
`LegalStructureFigure`, `MarketCoverageFigure`, `ProductionFlowFigure`,
`RFQFlowFigure`, `RoleMapFigure`, `TopicMapFigure`.

`DisciplinesConvergingFigure` was left out of this batch — it already has
its own bespoke rotate-in entrance (§1) and doesn't use `Reveal` internally.

---

## Verification performed

- `npx tsc --noEmit` — clean, after every batch of edits and again at the end.
- `npm run lint` (eslint) — clean.
- `npx vitest run` — 128/128 tests passing, unchanged from before this work.
- Manual browser checks via Playwright (dev server + a throwaway script,
  deleted afterward — not committed):
  - About page: confirmed hover opens the correct card for both a
    center-top and a side node, and that the hit-target fix actually made
    hover work (it didn't, before the fix).
  - All 14 updated pages: loaded each one and confirmed zero console/page
    errors.
  - Careers table: confirmed `Reveal` rendering as `<tr>` doesn't break
    table layout.
  - Engineering page: a first full-page screenshot appeared to show four of
    six discipline sections as empty — this turned out to be a test-script
    artifact (`page.screenshot({ fullPage: true })` doesn't scroll-trigger
    `IntersectionObserver` for off-screen content), not a real bug;
    confirmed by re-testing with an actual incremental scroll.
  - Process page: confirmed via `getComputedStyle`/DOM inspection that each
    of the six gate cards is its own `Reveal` instance with the expected
    staggered `--reveal-delay` (0/70/140/210/280/350ms), and a screenshot
    matches the pre-change layout pixel-for-pixel.

## Commits

- `d999695` — `feat: extend scroll-reveal animation to every page and card
  grid`, on `feat/ui-ux-elevation`. Covers all three items above: the About
  page figure (§1), the 14-page `Reveal` rollout (§2), and the per-card
  stagger inside the shared figures (§3) — all landed in one commit since
  the figure fix followed shortly after the page rollout, in the same
  working-tree state.
