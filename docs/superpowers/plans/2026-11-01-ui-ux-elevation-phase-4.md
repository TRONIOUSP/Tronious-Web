# UI/UX Elevation (Phase 4) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the remaining 14 page routes (every route except `/`) onto the Phase 1–3 design system — full-bleed `Section`/`Container` layout instead of the legacy bordered `.page` card — and give each one the bespoke SVG illustration the spec requires, without changing a single word of visible copy.

**Architecture:** Each route's `page.tsx` is rewritten to compose `components/ui/*` primitives (`Section`, `Container`, `SectionHead`, `Button`, `Card`, `Badge`, `Chip`, `Stat`, `Quote`, `Note`, `TickList`, `Ph`, `Reveal`) instead of the legacy `Sheet` wrapper and `.eyebrow`/`.lead`/`.grid`/`.cell`/`.split`/`.tablewrap`/`.steps`/`.flow`/`.capgrid`/`.pflow`/`.chips`/`.jump`/`.case` classes from `app/globals.css`'s `legacy` layer. Two new shared primitives (`DataTable`, `JumpNav`) are added first because five pages need them. Each page also gets exactly one new inline-SVG figure component under `components/figures/`, per the inventory already fixed in the spec (§9.3) — no new figure subjects are invented here. Pages are migrated in the spec's own rollout grouping (§11 Phase 4), each group its own task, so the branch is shippable after every task.

**Tech Stack:** Next.js 16.4.3 (App Router), React 19.3, TypeScript, Tailwind CSS 4 (`app/globals.css` `@theme` + `@layer components`), Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-31-ui-ux-elevation-design.md` (§5, §7–§9, §11 Phase 4, §13)

## Global Constraints

- **No visible copy changes.** Every heading, paragraph, list item, table cell, button label and placeholder stays byte-identical to what is already in each `app/**/page.tsx` file today — that file is itself the verbatim content source, already ported from `docs/design/cdmo-site.html`. Only additive non-visible strings are allowed: SVG `<title>` text, `aria-label`s, `id`s for anchors.
- **No fabricated specificity.** No invented device parameters, pressures, units, timings, counts or measurements in any illustration (spec §4, §9.2). Where a figure needs a value, use the existing `Ph` placeholder convention.
- **One nav list, not two; `Header.test.tsx` and `ContactForm.test.tsx` pass unmodified.** Phase 4 does not touch `Header.tsx`; `ContactForm.tsx` is restyled, not re-architected — ids, `htmlFor`/`id` pairs, and the hidden-until-submit `#formMsg` behaviour stay exactly as they are.
- **Server components by default.** None of the 14 pages need `'use client'`; `ContactForm` already is one and stays one.
- **No horizontal scroll at any width**, especially 360px. Tables scroll within their own container (`DataTable`), never the page.
- **WCAG AA contrast in both themes**, visible focus on every interactive element (inherited from existing `:focus-visible` rule — nothing new to add unless a component introduces a custom focusable element).
- **All motion disabled under `prefers-reduced-motion: reduce`.** Use the existing `Reveal` component for entrance motion; it already handles this. Any new figure animation must follow the `HeroCompression` pattern: gated in CSS under `@media (prefers-reduced-motion: no-preference)`.
- **Container:** `min(100% - 2 × gutter, 80rem)` via `Container`/`Section`. **Section padding:** `clamp(4rem, 2rem + 7vw, 8rem)` — already the default via `Section`'s `py-section`.
- **Illustrations:** inline SVG, `currentColor` or semantic colour tokens, `aria-hidden="true"` when decorative, stroke weights legible at small and large sizes (spec §9.4).
- **Legacy CSS stays in place.** `app/globals.css`'s `legacy` layer is not touched or pruned in this phase — Phase 5 removes it once every page has migrated off it. Do not delete a legacy class while any page still references it.

## Review Focus

1. **A page still imports `Sheet` or renders a legacy class** (`.page`, `.grid`, `.cell`, `.tablewrap`, `.steps`, `.flow`, `.capgrid`, `.pflow`, `.split`, `.jump`, `.case`, `.badges`) after its task is marked done — the card/box look survives by accident. *Checked per-task by grepping the rebuilt file for those class names before committing.*
2. **A table or jump-nav page loses keyboard/scroll behaviour** — `DataTable` must not trap scroll, and `JumpNav` anchors must resolve to a real `id` with `scroll-margin-top` clearing the sticky header (64–68px), or the smooth-scroll from the old `data-jump` click handler (now native CSS) lands content under the header. *Tested by hand in Task 1 (component build) and re-checked visually on the engineering/manufacturing pages in their task.*
3. **ContactForm's hidden-until-submit note regresses.** `ContactForm.test.tsx` already pins this; the restyle must keep `#formMsg`'s `hidden` attribute wired to the exact same submit state. *Re-run `ContactForm.test.tsx` unmodified in Task 7, not just the suite as a whole.*
4. **The legal page's figure becomes decoration without meaning.** The spec itself flags this as the weakest case (§9.3) — a navigational structure map, not an illustration. *Task 8 builds the typographic sectional-index fallback explicitly, not a generic diagram, and the page task calls out this choice for review rather than presenting it as a found illustration.*
5. **360px regression on a table-heavy or multi-column page** (expertise's comparison table, quality's certifications table, careers' roles table, manufacturing's capability/scaling tables). *Each page task's manual check step includes resizing to 360px, not just confirming the build succeeds.*

---

## File Structure

**Created**
- `components/ui/DataTable.tsx` + test — scrollable table wrapper, replaces `.tablewrap`
- `components/ui/JumpNav.tsx` + test — in-page anchor nav, replaces `.jump`
- `components/figures/ServiceAreaIcon.tsx` — 6 icons (services)
- `components/figures/DisciplineIcon.tsx` — 6 icons (engineering)
- `components/figures/DeviceComparisonFigure.tsx` (expertise)
- `components/figures/ProductionFlowFigure.tsx` (manufacturing)
- `components/figures/ProcessGateFlow.tsx` (process)
- `components/figures/MarketCoverageFigure.tsx` (quality)
- `components/figures/FacilitySchematic.tsx` (facilities)
- `components/figures/EngagementModelsFigure.tsx` (engagement)
- `components/figures/CaseStudyFigure.tsx` (cases)
- `components/figures/DisciplinesConvergingFigure.tsx` (about)
- `components/figures/TopicMapFigure.tsx` (insights)
- `components/figures/RoleMapFigure.tsx` (careers)
- `components/figures/RFQFlowFigure.tsx` (contact)
- `components/figures/LegalStructureFigure.tsx` (legal — typographic fallback, §9.3 "weakest case")
- `components/figures/figures-phase4.test.tsx` — covers all the figures above

**Modified**
- `app/globals.css` — add `@layer components` rules for `[data-table-wrap]`, `[data-jump-nav]`, and one block per new figure's custom styling (keyed off `data-*` attributes, matching the existing convention for `HeroCompression`/`ConceptFlow`)
- `app/{services,engineering,manufacturing,expertise,process,quality,facilities,engagement,cases,about,insights,careers,contact,legal}/page.tsx` — rebuilt onto `components/ui/*`
- `components/ContactForm.tsx` — restyled onto `Button`/`Note`, structure and ids unchanged

**Not touched**
- `components/Header.tsx`, `components/Footer.tsx`, `components/Sheet.tsx`, `app/page.tsx`, the `legacy` layer in `app/globals.css`

---

## Task 1: Shared primitives — `DataTable` and `JumpNav`

**Files:**
- Create: `components/ui/DataTable.tsx`, `components/ui/JumpNav.tsx`
- Test: `components/ui/DataTable.test.tsx`, `components/ui/JumpNav.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `cx` from `@/lib/cx`.
- Produces: `DataTable({ children, className }: { children: ReactNode; className?: string })` → `<div data-table-wrap="" className={cx('ui-table-wrap', className)}>{children}</div>`, where `children` is the page's own `<table>` markup (thead/tbody authored in the page, unchanged from today). `JumpNav({ links, label = 'On this page', className }: { links: { href: string; label: string }[]; label?: string; className?: string })` → `<nav aria-label={label} data-jump-nav="" className={cx('ui-jump-nav', className)}>` containing one `<a href={href}>{label}</a>` per link.

- [ ] **Step 1: Write the failing tests**

```tsx
// DataTable.test.tsx
it('wraps its table children in a scroll container', () => {
  const { container } = render(<DataTable><table><tbody><tr><td>x</td></tr></tbody></table></DataTable>)
  expect(container.querySelector('[data-table-wrap] table')).not.toBeNull()
})
```

```tsx
// JumpNav.test.tsx
it('renders a labelled nav with one link per entry', () => {
  render(<JumpNav links={[{ href: '#a', label: 'A' }, { href: '#b', label: 'B' }]} />)
  const nav = screen.getByRole('navigation', { name: 'On this page' })
  expect(within(nav).getAllByRole('link')).toHaveLength(2)
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test -- DataTable JumpNav`
Expected: FAIL — modules don't exist yet.

- [ ] **Step 3: Implement `DataTable` and `JumpNav`** per the Interfaces block above.

- [ ] **Step 4: Add CSS** in `app/globals.css` `@layer components`: `[data-table-wrap]` gets `overflow-x: auto` and a `border-subtle` border (replacing `.tablewrap`); `[data-jump-nav]` lays its links out as a wrapped mono-font row of bordered pill links (replacing `.jump a`), and its `a` targets get `scroll-margin-top` matching the sticky header height (`68px` at the `lg` breakpoint, `64px` below it — reuse the values already in the header CSS rather than inventing new ones).

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm run test -- DataTable JumpNav`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/ui/DataTable.tsx components/ui/DataTable.test.tsx components/ui/JumpNav.tsx components/ui/JumpNav.test.tsx app/globals.css
git commit -m "feat: add DataTable and JumpNav primitives for phase 4 pages"
```

---

## Task 2: Capability pages, part 1 — Services and Expertise

**Files:**
- Modify: `app/services/page.tsx`, `app/expertise/page.tsx`
- Create: `components/figures/ServiceAreaIcon.tsx`, `components/figures/DeviceComparisonFigure.tsx`
- Test: append to `components/figures/figures-phase4.test.tsx`
- Modify: `app/globals.css` (figure-specific rules only)

**Interfaces:**
- Consumes: `Section`, `Container`, `SectionHead`, `Card`, `Button`, `TickList`, `DataTable` (Task 1).
- Produces: `ServiceAreaIcon({ area, className }: { area: 'design' | 'regulatory' | 'testing' | 'manufacturing' | 'supply' | 'postmarket'; className?: string })` — one `<svg>` per the six service areas already listed on the services page, following the `DeviceFamilyIcon` pattern (48×48 viewBox, `currentColor` stroke, `aria-hidden`). `DeviceComparisonFigure({ className }: { className?: string })` — a figure rendering the six device families against their standards, sourced from the existing table on `app/expertise/page.tsx` (spec §9.3 row "expertise").

- [ ] **Step 1: Write the figure tests** (distinct SVG per service area; `DeviceComparisonFigure` renders all six family names) in `components/figures/figures-phase4.test.tsx`, following the pattern in `components/figures/figures.test.tsx`.

- [ ] **Step 2: Run tests to verify they fail.** Run: `npm run test -- figures-phase4`

- [ ] **Step 3: Implement both figure components.**

- [ ] **Step 4: Rebuild `app/services/page.tsx`**: replace `Sheet` with a `Section` carrying `data-doc="WEB-010"` on the first section (matching the pattern in `app/page.tsx:52`); replace `.grid`/`.cell` with a `Card` grid inside `Section`, one `ServiceAreaIcon` per card; replace `.split`/`.btns`/`.btn` with `Button`. Preserve every heading, list item and link exactly.

- [ ] **Step 5: Rebuild `app/expertise/page.tsx`** the same way, placing `DeviceComparisonFigure` above or beside the existing table (now wrapped in `DataTable`), and the two "Clinical devices" / "Home-use devices" cells as `Card`s.

- [ ] **Step 6: Add figure CSS** for both new figures in `app/globals.css` `@layer components`.

- [ ] **Step 7: Run tests to verify they pass.** Run: `npm run test -- figures-phase4`

- [ ] **Step 8: Manual check** — `npm run dev`, view `/services` and `/expertise` at 360/768/1280/1920px in both themes; confirm no `.page`/`.grid`/`.cell`/`.tablewrap` class remains (`grep -n "className=\"" app/services/page.tsx app/expertise/page.tsx` for legacy names) and no horizontal scroll at 360px.

- [ ] **Step 9: Commit**

```bash
git add app/services/page.tsx app/expertise/page.tsx components/figures/ServiceAreaIcon.tsx components/figures/DeviceComparisonFigure.tsx components/figures/figures-phase4.test.tsx app/globals.css
git commit -m "feat: rebuild services and expertise pages on the design system"
```

---

## Task 3: Capability pages, part 2 — Engineering and Manufacturing

**Files:**
- Modify: `app/engineering/page.tsx`, `app/manufacturing/page.tsx`
- Create: `components/figures/DisciplineIcon.tsx`, `components/figures/ProductionFlowFigure.tsx`
- Test: append to `components/figures/figures-phase4.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `Section`, `Container`, `SectionHead`, `Card`, `Chip`, `TickList`, `JumpNav`, `DataTable` (Task 1).
- Produces: `DisciplineIcon({ discipline, className }: { discipline: 'mechanical' | 'pcb' | 'firmware' | 'app' | 'wearable' | 'test'; className?: string })` for the six engineering disciplines. `ProductionFlowFigure({ className }: { className?: string })` — the ten-step production flow already listed on the manufacturing page (spec §9.3 row "manufacturing").

- [ ] **Step 1: Write the figure tests** (six distinct discipline icons; `ProductionFlowFigure` renders all ten step labels).

- [ ] **Step 2: Run tests to verify they fail.**

- [ ] **Step 3: Implement both figure components.**

- [ ] **Step 4: Rebuild `app/engineering/page.tsx`**: replace the `.jump` nav with `JumpNav`, one link per discipline anchor (`#e-mech`, `#e-pcb`, `#e-fw`, `#e-app`, `#e-wear`, `#e-test` — keep these exact ids so the anchors still resolve); replace each `.cap` section with a `Section` whose `id` matches, using `SectionHead` for the `cap-h` column and `Chip`/`TickList` for the `cap-b` column (the sticky-heading layout from `.cap`/`.cap-h` is left to the builder per spec §13 — a CSS grid with `position: sticky` on the heading column at `lg`+ reproduces it). Put one `DisciplineIcon` per section.

- [ ] **Step 5: Rebuild `app/manufacturing/page.tsx`** the same way: `JumpNav` for `#m-dt`/`#m-flow`/`#m-qc`/`#m-scale`, `ProductionFlowFigure` in the `m-flow` section, `DataTable` for the scaling table, `Card`/`TickList` for quality controls, `Note` for the design-transfer deliverables note.

- [ ] **Step 6: Add figure and `cap`-layout CSS** in `app/globals.css`.

- [ ] **Step 7: Run tests to verify they pass.**

- [ ] **Step 8: Manual check** at 360/768/1280/1920px, both themes; confirm jump-nav anchors land below the sticky header, not under it; grep for leftover legacy classes.

- [ ] **Step 9: Commit**

```bash
git add app/engineering/page.tsx app/manufacturing/page.tsx components/figures/DisciplineIcon.tsx components/figures/ProductionFlowFigure.tsx components/figures/figures-phase4.test.tsx app/globals.css
git commit -m "feat: rebuild engineering and manufacturing pages on the design system"
```

---

## Task 4: Process and Quality

**Files:**
- Modify: `app/process/page.tsx`, `app/quality/page.tsx`
- Create: `components/figures/ProcessGateFlow.tsx`, `components/figures/MarketCoverageFigure.tsx`
- Test: append to `components/figures/figures-phase4.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `Section`, `SectionHead`, `Card`, `TickList`, `Note`, `Ph`, `DataTable`.
- Produces: `ProcessGateFlow({ className }: { className?: string })` — the six gates and their deliverables already on the process page. `MarketCoverageFigure({ className }: { className?: string })` — US/EU/AU regulatory pathways already on the quality page.

- [ ] **Step 1: Write the figure tests** (`ProcessGateFlow` renders all six gate headings; `MarketCoverageFigure` renders "United States", "European Union", "Australia").

- [ ] **Step 2: Run tests to verify they fail.**

- [ ] **Step 3: Implement both figure components.**

- [ ] **Step 4: Rebuild `app/process/page.tsx`**: replace `.steps` with a `Card`-per-gate list carrying `ProcessGateFlow` near the top of the page as the page's overview figure, `TickList` for each gate's bullet list, `Note` for the closing QMSR note, `Ph` for every existing placeholder span.

- [ ] **Step 5: Rebuild `app/quality/page.tsx`**: `DataTable` for the certifications table, `MarketCoverageFigure` above or inside the "Regulatory experience by market" section, `Card` for the three market cells.

- [ ] **Step 6: Add figure CSS.**

- [ ] **Step 7: Run tests to verify they pass.**

- [ ] **Step 8: Manual check** at all four widths/both themes; grep for leftover legacy classes.

- [ ] **Step 9: Commit**

```bash
git add app/process/page.tsx app/quality/page.tsx components/figures/ProcessGateFlow.tsx components/figures/MarketCoverageFigure.tsx components/figures/figures-phase4.test.tsx app/globals.css
git commit -m "feat: rebuild process and quality pages on the design system"
```

---

## Task 5: Facilities and Engagement

**Files:**
- Modify: `app/facilities/page.tsx`, `app/engagement/page.tsx`
- Create: `components/figures/FacilitySchematic.tsx`, `components/figures/EngagementModelsFigure.tsx`
- Test: append to `components/figures/figures-phase4.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `Section`, `SectionHead`, `Card`, `TickList`, `DataTable`, `Ph`.
- Produces: `FacilitySchematic({ className }: { className?: string })` — zones/equipment already listed on the facilities page. `EngagementModelsFigure({ className }: { className?: string })` — the four engagement models (A–D) already listed on the engagement page.

- [ ] **Step 1: Write the figure tests** (`FacilitySchematic` renders the three equipment-category headings "Test & measurement", "Prototyping", "Production"; `EngagementModelsFigure` renders "Model A" through "Model D").

- [ ] **Step 2: Run tests to verify they fail.**

- [ ] **Step 3: Implement both figure components.**

- [ ] **Step 4: Rebuild `app/facilities/page.tsx`**: `DataTable` for the key-facts table, `FacilitySchematic` near the top, `Card`/`TickList` for the three equipment categories, `Ph` for every placeholder.

- [ ] **Step 5: Rebuild `app/engagement/page.tsx`**: `EngagementModelsFigure` above the four `Card`s (one per model), `Ph` for the IP-position placeholder.

- [ ] **Step 6: Add figure CSS.**

- [ ] **Step 7: Run tests to verify they pass.**

- [ ] **Step 8: Manual check** at all four widths/both themes; grep for leftover legacy classes.

- [ ] **Step 9: Commit**

```bash
git add app/facilities/page.tsx app/engagement/page.tsx components/figures/FacilitySchematic.tsx components/figures/EngagementModelsFigure.tsx components/figures/figures-phase4.test.tsx app/globals.css
git commit -m "feat: rebuild facilities and engagement pages on the design system"
```

---

## Task 6: Cases and About

**Files:**
- Modify: `app/cases/page.tsx`, `app/about/page.tsx`
- Create: `components/figures/CaseStudyFigure.tsx`, `components/figures/DisciplinesConvergingFigure.tsx`
- Test: append to `components/figures/figures-phase4.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `Section`, `SectionHead`, `Card`, `Ph`.
- Produces: `CaseStudyFigure({ className }: { className?: string })` — the challenge/approach/metrics structure shared by the three existing case templates. `DisciplinesConvergingFigure({ className }: { className?: string })` — the six engineering disciplines (reuse the subjects from `DisciplineIcon`, Task 3) converging on one device, supporting the "one team" claim on the about page.

- [ ] **Step 1: Write the figure tests** (`CaseStudyFigure` renders "Challenge", "Approach"; `DisciplinesConvergingFigure` renders `aria-hidden="true"` and a non-empty SVG).

- [ ] **Step 2: Run tests to verify they fail.**

- [ ] **Step 3: Implement both figure components.**

- [ ] **Step 4: Rebuild `app/cases/page.tsx`**: one `Card` per case study, `CaseStudyFigure` as a shared visual motif (e.g. behind or beside the template structure, not per-case — avoid implying three different real projects have three different diagrams when the content itself says these are templates), `Ph` for every case placeholder.

- [ ] **Step 5: Rebuild `app/about/page.tsx`**: `DisciplinesConvergingFigure` near the top, `Card` grid for leadership, `Ph` for every placeholder, `Button`/link for "See open roles" to `/careers`.

- [ ] **Step 6: Add figure CSS.**

- [ ] **Step 7: Run tests to verify they pass.**

- [ ] **Step 8: Manual check** at all four widths/both themes; grep for leftover legacy classes.

- [ ] **Step 9: Commit**

```bash
git add app/cases/page.tsx app/about/page.tsx components/figures/CaseStudyFigure.tsx components/figures/DisciplinesConvergingFigure.tsx components/figures/figures-phase4.test.tsx app/globals.css
git commit -m "feat: rebuild cases and about pages on the design system"
```

---

## Task 7: Insights, Careers and Contact

**Files:**
- Modify: `app/insights/page.tsx`, `app/careers/page.tsx`, `app/contact/page.tsx`, `components/ContactForm.tsx`
- Create: `components/figures/TopicMapFigure.tsx`, `components/figures/RoleMapFigure.tsx`, `components/figures/RFQFlowFigure.tsx`
- Test: append to `components/figures/figures-phase4.test.tsx`; `components/ContactForm.test.tsx` must pass unmodified
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `Section`, `SectionHead`, `Card`, `DataTable`, `Note`, `Ph`, `Button`.
- Produces: `TopicMapFigure({ className }: { className?: string })` — the six suggested insight topics against device-lifecycle stages. `RoleMapFigure({ className }: { className?: string })` — the open roles against the six process gates (reuse the gate names from `ProcessGateFlow`, Task 4). `RFQFlowFigure({ className }: { className?: string })` — NDA → scoping → response-window flow already described on the contact page.

- [ ] **Step 1: Write the figure tests** for all three, following the established pattern.

- [ ] **Step 2: Run tests to verify they fail.**

- [ ] **Step 3: Implement all three figure components.**

- [ ] **Step 4: Rebuild `app/insights/page.tsx`**: `TopicMapFigure` near the top, `Card` grid for the six article ideas (unchanged copy).

- [ ] **Step 5: Rebuild `app/careers/page.tsx`**: `RoleMapFigure` near the top, `DataTable` for the roles table, `Ph` for every placeholder.

- [ ] **Step 6: Restyle `components/ContactForm.tsx`**: replace `.row2`/`.btns`/`.btn primary` with Tailwind utility classes or a thin wrapper, replace the submit `<button>` with `Button` (`type="submit"`), replace `<p id="formMsg" className="note" hidden={!submitted}>` with `Note` (`id="formMsg" hidden={!submitted}`). Every `id`, `htmlFor`, `required`, `type` and option list stays exactly as today — `ContactForm.test.tsx` must pass unmodified.

- [ ] **Step 7: Rebuild `app/contact/page.tsx`**: `RFQFlowFigure` near the top, `ContactForm` unchanged as a child, `Card` for the two contact-detail cells, `Ph` for every placeholder.

- [ ] **Step 8: Add figure CSS.**

- [ ] **Step 9: Run tests to verify they pass**, including `ContactForm.test.tsx` explicitly.

Run: `npm run test -- ContactForm figures-phase4`
Expected: PASS, with `ContactForm.test.tsx`'s existing assertions untouched.

- [ ] **Step 10: Manual check** at all four widths/both themes, including an actual keyboard-only pass through the contact form (Tab order, Enter to submit, the hidden note appearing after submit).

- [ ] **Step 11: Commit**

```bash
git add app/insights/page.tsx app/careers/page.tsx app/contact/page.tsx components/ContactForm.tsx components/figures/TopicMapFigure.tsx components/figures/RoleMapFigure.tsx components/figures/RFQFlowFigure.tsx components/figures/figures-phase4.test.tsx app/globals.css
git commit -m "feat: rebuild insights, careers and contact pages on the design system"
```

---

## Task 8: Legal

**Files:**
- Modify: `app/legal/page.tsx`
- Create: `components/figures/LegalStructureFigure.tsx`
- Test: append to `components/figures/figures-phase4.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `Section`, `SectionHead`, `Note`.
- Produces: `LegalStructureFigure({ className }: { className?: string })` — per spec §9.3's own "weakest case" call-out, this renders as a typographic sectional index (a styled list of the four section anchors — Privacy policy, Terms of use, Cookie policy, Accessibility statement — each linking to its `id` on the same page), not an abstract diagram.

- [ ] **Step 1: Write the figure test** — renders all four section names as links to their in-page anchors.

- [ ] **Step 2: Run test to verify it fails.**

- [ ] **Step 3: Implement `LegalStructureFigure`** as a plain anchor list styled with the mono/eyebrow type already used site-wide — explicitly the "strong typographic treatment with a sectional index" fallback the spec names, not a found illustration.

- [ ] **Step 4: Rebuild `app/legal/page.tsx`**: `id`s on each of the four sections (`privacy`, `terms`, `cookies`, `accessibility`), `LegalStructureFigure` linking to them, `Note` for the GDPR/cookie-consent advisory currently in `.note`.

- [ ] **Step 5: Add figure CSS.**

- [ ] **Step 6: Run test to verify it passes.**

- [ ] **Step 7: Manual check** at all four widths/both themes.

- [ ] **Step 8: Commit**

```bash
git add app/legal/page.tsx components/figures/LegalStructureFigure.tsx components/figures/figures-phase4.test.tsx app/globals.css
git commit -m "feat: rebuild legal page on the design system"
```

---

## Task 9: Full-branch verification

**Files:** none created; verification only.

- [ ] **Step 1: Grep for legacy card/box classes across every route** to confirm none remain outside `app/page.tsx` (which never used them) and the untouched `legacy` layer itself.

Run: `grep -rn "Sheet\b" app/*/page.tsx` and `grep -rln "className=\"[^\"]*\b(grid|cell|tablewrap|steps|flow|capgrid|pflow|split|jump|case|badges)\b" app/*/page.tsx`
Expected: no matches in any of the 14 rebuilt pages.

- [ ] **Step 2: Run the full test suite.**

Run: `npm run test`
Expected: PASS, including `Header.test.tsx` and `ContactForm.test.tsx` unmodified.

- [ ] **Step 3: Run lint.**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 4: Run the build.**

Run: `npm run build`
Expected: succeeds, no type errors, all 15 routes statically render.

- [ ] **Step 5: Run the Playwright verification harness** (built in Phase 1 per the spec §12) across all 15 routes now that 15/15 use the new system.

Run: the harness's npm script (see `playwright.config.ts` / `e2e/verify.spec.ts` from Phase 1)
Expected: no horizontal scroll at 360px on any route, axe passes in both themes, contrast audit passes.

- [ ] **Step 6: Hand-checked items, reported honestly** — keyboard-only pass over every new jump-nav and the contact form; `prefers-reduced-motion: reduce` honoured on every new figure; dark-mode section-boundary legibility on at least the table-heavy pages (expertise, quality, manufacturing, careers).

- [ ] **Step 7: Commit** (only if Step 1's grep or manual checks required follow-up fixes; otherwise this task produces no diff of its own).
