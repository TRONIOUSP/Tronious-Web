# UI/UX Elevation (Phases 1–3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the site to a Tailwind v4 design system, rebuild the global chrome, and rebuild the homepage to the elevated-engineering direction — stopping at the review gate before the remaining 14 pages.

**Architecture:** A two-level token system in `app/globals.css` — fixed colour ramps in `@theme`, plus semantic aliases that are remapped for dark mode so components need almost no `dark:` variants. A small `components/ui/` primitive layer turns pages into composition rather than utility walls. Bespoke inline SVG lives in `components/figures/`. A Playwright harness renders every page at four widths in both themes so responsive and accessibility claims are verified rather than asserted.

**Tech Stack:** Next.js 16.4.3 (App Router, Turbopack), React 19.3, TypeScript, Tailwind CSS 4.3.3 (`@tailwindcss/postcss`), Vitest + Testing Library, Playwright 1.64.1 + `@axe-core/playwright` 4.14.0.

**Spec:** `docs/superpowers/specs/2026-10-31-ui-ux-elevation-design.md`

**Scope:** Phases 1–3 of the spec's §11. Phase 3 ends at a hard review gate; Phases 4–5 (the remaining 14 pages and close-out) get their own plan once the homepage direction is approved.

## Global Constraints

- **No existing copy changes.** Headings, body text, labels and button text stay byte-identical. Additive non-visible strings are permitted: skip link, theme-toggle accessible name, drawer label, SVG `<title>` elements. No invented eyebrow text.
- **No fabricated specificity.** No invented device parameters, pressures, units, timings, counts or measurements in any illustration.
- **`components/Header.test.tsx` and `components/ContactForm.test.tsx` must pass unmodified.** `components/Sheet.test.tsx` may change only because the title block was removed by decision.
- **One nav list, not two.** `Header.test.tsx` queries nav links by role and accessible name; that query throws on multiple matches. Never render a desktop nav and a drawer nav simultaneously.
- **Server components by default.** Client components only where interaction requires it.
- **No horizontal scroll at any width**, especially 360px. Tables scroll within their own container.
- **WCAG AA contrast in both themes**, visible focus on every interactive element.
- **All motion disabled under `prefers-reduced-motion: reduce`** — content renders in its final state immediately, never hidden.
- **Container:** `min(100% - 2 × gutter, 80rem)`. **Gutter:** `clamp(1.25rem, 5vw, 4rem)`. **Section padding:** `clamp(4rem, 2rem + 7vw, 8rem)`.
- **Breakpoints:** Tailwind defaults plus `3xl` at 1920px. Verification widths: 360 / 768 / 1280 / 1920.

## Review Focus

1. **`localStorage` throws or is blocked** (private browsing, blocked site data) — theme must fall back to the OS preference and the page must still render. *Test in Task 2.*
2. **`IntersectionObserver` absent, or JS never runs** — revealed content must stay visible, never permanently hidden. *Test in Task 6.*
3. **`prefers-reduced-motion: reduce`** — content renders in final state immediately and no animation runs. *Test in Task 6.*
4. **Drawer closed by Escape or route change** — focus returns to the Menu button and the body scroll lock is released, including when the drawer unmounts while open. *Test in Task 8.*
5. **360px with the site's longest unbroken strings** (`Massage & mechanical compression`, `Design complete, not cleared`) — no horizontal page scroll. *Test in Task 7.*

---

## File Structure

**Created**
- `postcss.config.mjs` — Tailwind v4 PostCSS plugin
- `lib/theme.ts` — theme preference resolution, storage (never throws), no-flash script
- `lib/placeholders.ts` — single source of truth for the placeholder launch flag
- `components/ui/{Container,Section,SectionHead,Button,Card,Badge,Chip,Stat,Quote,Note,TickList,Ph,Reveal,ThemeToggle}.tsx`
- `components/figures/{HeroCompression,DeviceFamilyIcon,ConceptFlow}.tsx`
- `playwright.config.ts`, `e2e/routes.ts`, `e2e/verify.spec.ts`

**Modified**
- `app/globals.css` — full rewrite around `@import` of tailwindcss + `@theme`
- `app/layout.tsx` — no-flash script, skip link, placeholder attribute, body classes
- `app/page.tsx` — full homepage rebuild
- `components/{Header,Footer,Sheet}.tsx` — rebuilt
- `components/Sheet.test.tsx` — rewritten for the title-block removal
- `package.json`, `.gitignore`
- All 15 `app/**/page.tsx` — remove the now-unused `sheetTitle` prop (mechanical)

**Deleted**
- `lib/truncate.ts`, `lib/truncate.test.ts` — dead once sheet-title truncation is gone

---

## Phase 1 — Foundation

### Task 1: Tailwind v4 and the token foundation

**Files:**
- Create: `postcss.config.mjs`
- Modify: `app/globals.css` (full rewrite), `package.json`
- Test: `app/globals.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: Tailwind utilities for every ramp step and semantic alias. Semantic alias names other tasks rely on: `surface`, `surface-raised`, `surface-sunken`, `surface-inverse`, `text-primary`, `text-secondary`, `text-tertiary`, `text-inverse`, `text-on-accent`, `border-subtle`, `border-default`, `border-strong`, `accent`, `accent-hover`, `accent-subtle`, `signal`, `placeholder-fg`, `placeholder-bg`. Each is exposed as `--color-<name>` so `bg-surface`, `text-text-primary`, `border-border-subtle` etc. resolve.

- [ ] **Step 1: Write the failing test**

`app/globals.test.ts` reads `app/globals.css` as text and asserts the two dark blocks stay in sync with the light block — the hazard the spec calls out explicitly.

```ts
const SEMANTIC_ALIASES = [
  'surface', 'surface-raised', 'surface-sunken', 'surface-inverse',
  'text-primary', 'text-secondary', 'text-tertiary', 'text-inverse', 'text-on-accent',
  'border-subtle', 'border-default', 'border-strong',
  'accent', 'accent-hover', 'accent-subtle', 'signal',
  'placeholder-fg', 'placeholder-bg',
]

it('defines every semantic alias in the light root', () => { /* each `--color-<alias>:` appears in the `:root {` block */ })
it('redefines every semantic alias in the prefers-color-scheme dark block', () => {})
it('redefines every semantic alias in the data-theme="dark" block', () => {})
it('sets color-scheme: dark in both dark paths', () => {})
it('guards the media-query dark block with :root:not([data-theme="light"])', () => {})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/globals.test.ts`
Expected: FAIL — aliases not found.

- [ ] **Step 3: Install Tailwind and add the PostCSS config**

```bash
npm install -D tailwindcss@4.3.3 @tailwindcss/postcss@4.3.3
```

`postcss.config.mjs` exports `{ plugins: { '@tailwindcss/postcss': {} } }`. No `next.config.ts` change is needed — Turbopack resolves a root PostCSS config by default.

- [ ] **Step 4: Rewrite `app/globals.css`**

Structure, in order: `@import` of tailwindcss; `@theme` with the ramps; `:root` semantic aliases; the two dark remap blocks; a `@layer base` with body/heading/focus defaults.

Ramps go in `@theme` exactly as tabled in spec §7.2 — neutral `0,25,50,100,150,200,300,350,400,500,600,700,800,870,900,925,940,950`, accent `50–900`, signal `300–600`, band `deep/base/raised/rule`, amber. Also in `@theme`: `--breakpoint-3xl: 120rem`, the fluid font sizes from spec §7.5, the four shadow steps from §7.4, and `--container-page: 80rem` / `--container-narrow: 60rem` / `--container-wide: 90rem`.

Dark remapping uses the two selectors from the test, with identical alias values in both and `color-scheme: dark` in each. Dark `sunken` must resolve *lighter* than dark `default` (neutral 900 over neutral 940) per spec §7.6.

- [ ] **Step 5: Run tests and build**

Run: `npx vitest run app/globals.test.ts && npm run build`
Expected: PASS, and a successful build.

- [ ] **Step 6: Commit**

```bash
git add postcss.config.mjs app/globals.css app/globals.test.ts package.json package-lock.json
git commit -m "feat: Tailwind v4 token foundation with themed semantic aliases"
```

---

### Task 2: Theme module, no-flash script and toggle

**Files:**
- Create: `lib/theme.ts`, `lib/theme.test.ts`, `components/ui/ThemeToggle.tsx`, `components/ui/ThemeToggle.test.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: Task 1's aliases.
- Produces:
  - `type Theme = 'light' | 'dark'`
  - `type ThemePreference = Theme | 'system'`
  - `THEME_STORAGE_KEY: string`, `THEME_ATTRIBUTE = 'data-theme'`
  - `readStoredPreference(): ThemePreference` — returns `'system'` on any failure, never throws
  - `storePreference(p: ThemePreference): void` — never throws
  - `applyPreference(p: ThemePreference): void` — sets `data-theme` on `document.documentElement`, or removes it for `'system'`
  - `NO_FLASH_SCRIPT: string` — IIFE for `dangerouslySetInnerHTML`; also sets `data-motion="on"` on `<html>` when motion is allowed **and** `IntersectionObserver` exists (Task 6 depends on this)
  - `ThemeToggle` — client component, accessible name `"Theme"`

- [ ] **Step 1: Write the failing tests**

```ts
// lib/theme.test.ts  — Review Focus 1
it('returns "system" when localStorage.getItem throws', () => {})
it('returns "system" when the stored value is not a valid preference', () => {})
it('does not throw when localStorage.setItem throws', () => {})
it('removes the data-theme attribute for the "system" preference', () => {})
it('sets data-theme="dark" for the "dark" preference', () => {})
```

```tsx
// components/ui/ThemeToggle.test.tsx
it('exposes an accessible name and aria-pressed state', () => {})
it('cycles system -> light -> dark -> system on click', () => {})
it('still renders when localStorage is unavailable', () => {})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run lib/theme.test.ts components/ui/ThemeToggle.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `lib/theme.ts`**

Every `localStorage` access is wrapped in try/catch. `NO_FLASH_SCRIPT` must read storage, set the attribute, and set `data-motion` before first paint; keep it dependency-free and small enough to inline.

- [ ] **Step 4: Implement `components/ui/ThemeToggle.tsx`**

Three-state control (system / light / dark) — the spec leaves the choice to the builder; three states let a visitor return to following the OS. Must not read `localStorage` during render; initialise in an effect so SSR and first client render agree.

- [ ] **Step 5: Wire the script into `app/layout.tsx`**

Inject `NO_FLASH_SCRIPT` via a `<script dangerouslySetInnerHTML>` in `<head>`, before any stylesheet-dependent paint. Keep the existing `next/font` variable classes on `<html>`.

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx vitest run && npm run lint && npm run build`
Expected: PASS, clean, successful.

- [ ] **Step 7: Commit**

```bash
git add lib/theme.ts lib/theme.test.ts components/ui/ThemeToggle.tsx components/ui/ThemeToggle.test.tsx app/layout.tsx
git commit -m "feat: theme preference module, no-flash script and toggle"
```

---

### Task 3: Layout primitives

**Files:**
- Create: `components/ui/Container.tsx`, `components/ui/Section.tsx`, `components/ui/SectionHead.tsx`, `components/ui/Section.test.tsx`

**Interfaces:**
- Consumes: Task 1's aliases.
- Produces:
  - `Container({ width = 'default', as = 'div', className, children })` where `width: 'default' | 'narrow' | 'wide'`
  - `Section({ tone = 'default', rule = false, width = 'default', contain = true, id, className, children })` where `tone: 'default' | 'sunken' | 'band' | 'accent'`. Renders a full-bleed `<section>`; wraps children in `Container` unless `contain` is false.
  - `SectionHead({ eyebrow, title, lead, align = 'start', as = 'h2' })` — `eyebrow` and `lead` optional; renders no empty element when absent.

- [ ] **Step 1: Write the failing tests**

```tsx
it('renders a section element with the tone data attribute', () => { /* data-tone="band" */ })
it('wraps children in a container by default and omits it when contain is false', () => {})
it('renders SectionHead without an eyebrow element when no eyebrow is given', () => {})
it('renders the heading at the requested level', () => { /* as="h1" -> role heading level 1 */ })
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/ui/Section.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the three components**

Expose `tone` as a `data-tone` attribute and drive tone colours from CSS in `app/globals.css` rather than conditional class strings, so the light/dark role mapping in spec §7.6 lives in one place. Section padding and container widths come from the Task 1 theme values.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run components/ui/Section.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ui/Container.tsx components/ui/Section.tsx components/ui/SectionHead.tsx components/ui/Section.test.tsx app/globals.css
git commit -m "feat: Section, Container and SectionHead layout primitives"
```

---

### Task 4: Content primitives

**Files:**
- Create: `components/ui/{Button,Card,Badge,Chip,Stat,Quote,Note,TickList}.tsx`, `components/ui/Button.test.tsx`, `components/ui/primitives.test.tsx`

**Interfaces:**
- Produces:
  - `Button({ variant = 'primary', size = 'md', onDark = false, href, type, children, ...rest })` — renders `next/link` when `href` is set, otherwise `<button>`. `variant: 'primary' | 'ghost' | 'subtle'`, `size: 'md' | 'lg'`.
  - `Card({ as = 'div', interactive = false, className, children })`
  - `Badge({ children })`, `Chip({ children })`
  - `Stat({ value, label })` — `value: React.ReactNode` so a placeholder can be passed
  - `Quote({ children, attribution })`, `Note({ children, hidden })`
  - `TickList({ items })` where `items: React.ReactNode[]`

- [ ] **Step 1: Write the failing tests**

```tsx
it('renders a link when href is set and a button otherwise', () => {})
it('passes through the button type attribute', () => {})
it('applies tabular numerals to Stat values', () => {})
it('renders Note with the hidden attribute when hidden is true', () => {})
it('renders TickList as a list with one item per entry', () => {})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/ui/`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement the components**

Keep each one presentational and prop-driven. `Note` must keep the `hidden`-attribute behaviour that `ContactForm.test.tsx` depends on.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run components/ui/`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ui/
git commit -m "feat: content primitives"
```

---

### Task 5: Placeholder annotation and launch flag

**Files:**
- Create: `lib/placeholders.ts`, `components/ui/Ph.tsx`, `components/ui/Ph.test.tsx`
- Modify: `app/layout.tsx`, `app/globals.css`

**Interfaces:**
- Produces:
  - `PLACEHOLDER_MARKING: boolean` — `true` until launch
  - `PLACEHOLDER_ATTRIBUTE = 'data-placeholder-marking'` — set on `<html>` when marking is on
  - `Ph({ children, wrap = false })` — renders `<span data-placeholder>`; styling is driven entirely by the root attribute

- [ ] **Step 1: Write the failing tests**

```tsx
it('always marks the span with data-placeholder for findability', () => {})
it('renders its children verbatim', () => {})
it('exports a single flag that both the root attribute and the Footer legend read', () => {})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/ui/Ph.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the flag, component and styling**

`Ph` always emits `data-placeholder` so a pre-launch grep finds every one. Visual marking — mono, muted amber, fine dotted underline, leading marker glyph — is applied in CSS only under the root attribute, so flipping `PLACEHOLDER_MARKING` to `false` silences it. Contrast must pass AA in both themes.

- [ ] **Step 4: Set the root attribute in `app/layout.tsx`**

Apply `PLACEHOLDER_ATTRIBUTE` to `<html>` when `PLACEHOLDER_MARKING` is true.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run && npm run lint`
Expected: PASS, clean.

- [ ] **Step 6: Commit**

```bash
git add lib/placeholders.ts components/ui/Ph.tsx components/ui/Ph.test.tsx app/layout.tsx app/globals.css
git commit -m "feat: placeholder annotation with a single launch flag"
```

---

### Task 6: Reveal

**Files:**
- Create: `components/ui/Reveal.tsx`, `components/ui/Reveal.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `data-motion="on"` set on `<html>` by `NO_FLASH_SCRIPT` (Task 2).
- Produces:
  - `shouldAnimate(): boolean` — `false` when `IntersectionObserver` is missing or `prefers-reduced-motion: reduce` matches
  - `Reveal({ as = 'div', delay = 0, className, children })` — renders `data-reveal="pending"`, flips to `"shown"` once observed

**Safety model:** the hidden state is applied in CSS *only* as `html[data-motion="on"] [data-reveal="pending"]`. Because `data-motion` is set by script and only when motion is allowed and `IntersectionObserver` exists, content is visible when JS fails, when the observer is unavailable, and under reduced motion. A `prefers-reduced-motion: reduce` media block resets it to visible as a second guard.

- [ ] **Step 1: Write the failing tests**

```tsx
// Review Focus 2 and 3
it('shouldAnimate returns false when IntersectionObserver is undefined', () => {})
it('shouldAnimate returns false when prefers-reduced-motion: reduce matches', () => {})
it('renders children and does not observe when shouldAnimate is false', () => {})
it('sets data-reveal="shown" after the observer reports an intersection', () => {})
it('disconnects the observer on unmount', () => {})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/ui/Reveal.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `Reveal` and `shouldAnimate`**

Observe once, then disconnect. `delay` sets a CSS custom property for stagger rather than a `setTimeout`.

- [ ] **Step 4: Add the CSS**

Hidden state under `html[data-motion="on"] [data-reveal="pending"]` only, with the reduced-motion reset block.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run components/ui/Reveal.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/ui/Reveal.tsx components/ui/Reveal.test.tsx app/globals.css
git commit -m "feat: scroll reveal that fails visible"
```

---

### Task 7: Playwright verification harness

**Files:**
- Create: `playwright.config.ts`, `e2e/routes.ts`, `e2e/verify.spec.ts`
- Modify: `package.json`, `.gitignore`

**Interfaces:**
- Produces: `ROUTES: string[]` (all 15 paths), `WIDTHS = [360, 768, 1280, 1920]`, `THEMES = ['light', 'dark']`, and an `npm run verify` script.

**Baseline value:** run this against the *current* site before Phase 2 changes anything, to prove the harness works independently of the redesign.

- [ ] **Step 1: Install Playwright**

```bash
npm install -D @playwright/test@1.64.1 @axe-core/playwright@4.14.0
npx playwright install chromium
```

- [ ] **Step 2: Write the harness**

`playwright.config.ts` uses a `webServer` that builds and starts the production server, with `reuseExistingServer` outside CI. `e2e/verify.spec.ts` covers:

- **120 screenshots** — every route × width × theme, written to `e2e/__screenshots__/`.
- **No horizontal scroll** at every route × width, asserting `document.documentElement.scrollWidth <= clientWidth + 1`. *This is Review Focus 5.*
- **axe pass** per route in both themes at 1280 only (30 runs, not 120 — axe is slow and its findings are not width-dependent except for reflow). Axe's `color-contrast` rule satisfies the spec's contrast-audit requirement.

Theme is forced by setting `data-theme` on `<html>` before assertions, not by `colorScheme` emulation alone, so the explicit-override path is what gets tested.

- [ ] **Step 3: Add scripts and ignores**

`package.json`: `"verify": "playwright test"`. `.gitignore`: `e2e/__screenshots__/`, `playwright-report/`, `test-results/`.

- [ ] **Step 4: Run the harness against the current site**

Run: `npm run verify`
Expected: screenshots produced for all 15 routes. Record which axe violations and which horizontal-scroll failures already exist on the **pre-redesign** site — that is the baseline, and the redesign must not be judged against a clean sheet it never had.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts e2e/ package.json package-lock.json .gitignore
git commit -m "test: Playwright responsive and accessibility harness"
```

---

## Phase 2 — Chrome

### Task 8: Header rebuild

**Files:**
- Modify: `components/Header.tsx`
- Create: `components/Header.drawer.test.tsx`
- Test (unmodified): `components/Header.test.tsx`

**Interfaces:**
- Consumes: `NAV_LINKS`, `NAV_CTA` from `lib/nav.ts`; `Button`, `ThemeToggle`.
- Produces: no new exports.

**Hard constraints:** one nav list only; accessible name `"Menu"` on the toggle; `aria-expanded` / `aria-controls` wiring; `aria-current="page"`; the existing adjust-state-during-render close-on-route-change pattern preserved.

- [ ] **Step 1: Write the failing tests**

```tsx
// components/Header.drawer.test.tsx — Review Focus 4
it('renders exactly one link per nav entry', () => { /* getAllByRole('link', { name: 'Services' }) has length 1 */ })
it('closes on Escape and returns focus to the Menu button', () => {})
it('locks body scroll while open and releases it on close', () => {})
it('releases the body scroll lock when unmounted while open', () => {})
it('marks the drawer as a modal when open', () => {})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/Header.drawer.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Rebuild `components/Header.tsx`**

Sticky header that condenses past ~40px of scroll. A single `<ul>` that is laid out horizontally at `lg` and up and becomes the drawer panel below it — reflowed by CSS, never duplicated in the DOM. Focus trap, Escape handler, body scroll lock with cleanup on unmount, `ThemeToggle` in the bar.

- [ ] **Step 4: Run the full suite**

Run: `npx vitest run && npm run lint && npm run build`
Expected: PASS — including `Header.test.tsx` **unmodified**.

- [ ] **Step 5: Commit**

```bash
git add components/Header.tsx components/Header.drawer.test.tsx
git commit -m "feat: rebuild header with drawer, theme toggle and single nav list"
```

---

### Task 9: Footer rebuild and skip link

**Files:**
- Modify: `components/Footer.tsx`, `app/layout.tsx`
- Create: `components/Footer.test.tsx`

**Interfaces:**
- Consumes: `PLACEHOLDER_MARKING` (Task 5), footer link arrays from `lib/nav.ts`.

- [ ] **Step 1: Write the failing tests**

```tsx
it('renders every footer link group', () => {})
it('renders the placeholder legend when marking is on', () => {})
it('omits the placeholder legend when marking is off', () => {})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/Footer.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Rebuild `components/Footer.tsx`**

Remove the four inline `style={{ color: 'var(--ink)' }}` attributes — those reference tokens Task 1 replaced. Gate the legend sentence on `PLACEHOLDER_MARKING` so it disappears with the inline marking. Legend copy stays byte-identical.

- [ ] **Step 4: Add the skip link to `app/layout.tsx`**

Visually hidden until focused, targeting the `<main>` element, which needs an `id`.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run && npm run lint`
Expected: PASS, clean.

- [ ] **Step 6: Commit**

```bash
git add components/Footer.tsx components/Footer.test.tsx app/layout.tsx
git commit -m "feat: rebuild footer and add skip link"
```

---

### Task 10: Remove the title block

**Files:**
- Modify: `components/Sheet.tsx`, `components/Sheet.test.tsx`, all 15 `app/**/page.tsx`
- Delete: `lib/truncate.ts`, `lib/truncate.test.ts`

**Interfaces:**
- Produces: `Sheet({ doc, children })` — renders `<article data-doc={doc}>{children}</article>` and nothing else. The `sheetTitle` prop is removed.

**Why a pass-through rather than deletion:** all 15 pages import `Sheet`. Reducing it keeps every page compiling while only the homepage is rebuilt; Phase 4 decides per page whether to drop it entirely.

- [ ] **Step 1: Rewrite `components/Sheet.test.tsx`**

```tsx
it('renders its children', () => {})
it('exposes the document number as a data attribute', () => { /* data-doc="WEB-001" */ })
it('renders no title block', () => { /* queryByText('A · Draft') is null, same for 'Content placeholders' */ })
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/Sheet.test.tsx`
Expected: FAIL — the title block still renders.

- [ ] **Step 3: Reduce `components/Sheet.tsx` and drop `sheetTitle` from all 15 call sites**

Mechanical: remove the `sheetTitle={...}` prop from each `<Sheet>` usage.

- [ ] **Step 4: Delete the dead truncate helper**

```bash
git rm lib/truncate.ts lib/truncate.test.ts
```

Confirm nothing else imports it before deleting.

- [ ] **Step 5: Run the full suite**

Run: `npx vitest run && npm run lint && npm run build`
Expected: PASS, clean, successful.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: remove per-page title block and the dead truncate helper"
```

---

## Phase 3 — Homepage

### Task 11: Hero compression figure

**Files:**
- Create: `components/figures/HeroCompression.tsx`, `components/figures/HeroCompression.test.tsx`

**Interfaces:**
- Produces: `HeroCompression({ className })` — inline SVG, informative, with an accessible `<title>`.

**Composition brief** (from `docs/design/cdmo-site.html` lines 141–164, the only reference that exists — no markup for this figure has ever been written): four chambers inflating on a 0.6s stagger over a 4.8s loop; a foot outline; a pump; hoses with a flowing dash; dimension and dashed leader lines; a four-value readout illuminating in sequence with the chambers.

**Hard constraint:** the readout renders as an **unlabelled trace** — no numerals, no units, no invented device parameters. See spec §9.2.

- [ ] **Step 1: Write the failing tests**

```tsx
it('renders an accessible title describing the figure', () => {})
it('renders four chamber elements', () => {})
it('contains no numeric text', () => { /* assert no digits in the rendered text content */ })
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/figures/HeroCompression.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the figure**

Strokes use `currentColor` or semantic tokens so it themes. Animation lives in `app/globals.css` gated on `prefers-reduced-motion: no-preference`, not inline, so the reduced-motion guard is in one place.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run components/figures/HeroCompression.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/figures/HeroCompression.tsx components/figures/HeroCompression.test.tsx app/globals.css
git commit -m "feat: animated pneumatic compression hero figure"
```

---

### Task 12: Device-family illustrations and concept flow

**Files:**
- Create: `components/figures/DeviceFamilyIcon.tsx`, `components/figures/ConceptFlow.tsx`, `components/figures/figures.test.tsx`

**Interfaces:**
- Produces:
  - `DeviceFamilyIcon({ family })` where `family: 'spinal' | 'knee' | 'pneumatic' | 'massage' | 'thermal'`
  - `ConceptFlow()` — the five-step concept-to-build diagram, step names taken verbatim from `app/page.tsx`: Concept, Design, Test, Submit, Build

- [ ] **Step 1: Write the failing tests**

```tsx
it('renders a distinct illustration for each of the five families', () => {})
it('marks device family icons as decorative', () => { /* aria-hidden, since the h3 names the family */ })
it('renders all five concept flow step names', () => {})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/figures/figures.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement both**

Upgrade the five existing 48px icons in `app/page.tsx` into larger, more detailed technical line illustrations; keep their existing subjects. Stroke weights must hold at both small and large render sizes.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run components/figures/`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/figures/
git commit -m "feat: device family illustrations and concept flow diagram"
```

---

### Task 13: Homepage rebuild

**Files:**
- Modify: `app/page.tsx`
- Create: `app/page.test.tsx`

**Interfaces:**
- Consumes: every primitive from Tasks 3–6 and every figure from Tasks 11–12.

**Hard constraint:** every string already in `app/page.tsx` — headings, leads, badge text, card titles and descriptions, flow step names, stat labels, quote placeholders, CTA copy — carries over byte-identical. The eight sections keep their order and their content; only their presentation changes.

- [ ] **Step 1: Write the failing test**

A copy-integrity test, which is the cheapest guard against the plan's single largest risk:

```tsx
it('renders the hero heading and lead verbatim', () => {})
it('renders all seven certification badges', () => {})
it('renders all five device family names', () => {})
it('renders all six engineering discipline titles', () => {})
it('renders all four stat labels', () => {})
it('renders both calls to action', () => {})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/page.test.tsx`
Expected: FAIL for the assertions that depend on the rebuild.

- [ ] **Step 3: Rebuild `app/page.tsx`**

Compose with `Section` / `SectionHead` / `Card` / `Badge` / `Stat` / `Quote` / `Reveal`. Alternate section tones per spec §7.6, never more than two consecutive sections in the same tone. Hero and closing CTA use the `band` tone. Stats sized for real figures to drop in later.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run && npm run lint && npm run build`
Expected: PASS, clean, successful.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "feat: rebuild homepage on the new design system"
```

---

### Task 14: Verification run and review gate

**Files:**
- Modify: whatever the harness exposes as broken.

- [ ] **Step 1: Run the full verification harness**

Run: `npm run verify`
Expected: 120 screenshots; no horizontal scroll at any width; no new axe violations versus the Task 7 baseline.

- [ ] **Step 2: Fix every regression the harness reports**

Fix and re-run until clean against the baseline. If a pre-existing baseline violation remains, say so explicitly rather than claiming a clean pass.

- [ ] **Step 3: Hand-check what the harness cannot**

Keyboard-only pass over the header drawer, theme toggle and contact form. `prefers-reduced-motion: reduce` honoured — content visible and static. Dark-mode section-boundary legibility per spec §7.6. Report each as hand-checked, not automated.

- [ ] **Step 4: Run the full gate**

Run: `npx vitest run && npm run lint && npm run build`
Expected: PASS, clean, successful. `Header.test.tsx` and `ContactForm.test.tsx` unmodified.

- [ ] **Step 5: Commit and stop**

```bash
git add -A
git commit -m "test: homepage verification pass"
```

**STOP HERE.** Phase 3 is a hard review gate. Hand over the screenshot contact sheet, the harness output, an honest statement of what was automated versus hand-checked, and a running dev server. Do not begin Phase 4 until the homepage direction is approved.

---

## Self-Review Notes

**Spec coverage.** §7.1–7.3 → Task 1; §7.4–7.5 → Task 1 theme values; §7.6 tone roles → Tasks 1 and 3; §7.7 breakpoints → Task 1; §8 primitives → Tasks 3–6; §8 header → Task 8; §8 Sheet → Task 10; §8 placeholders → Tasks 5 and 9; §9.1–9.2 → Task 11; §9.3 homepage rows → Tasks 11–12; §10 motion → Tasks 6, 8, 11; §12 verification → Tasks 7 and 14. Spec §9.3's other 11 rows and §11 Phases 4–5 are deliberately out of scope and belong to the post-gate plan.

**Known gap, deliberate.** Dark-mode section-boundary legibility (§7.6) is hand-checked in Task 14 rather than automated — no automated check can judge whether a boundary *reads*. Flagged rather than silently dropped.

**Interface consistency.** `tone` is the prop name in Task 3 and in Task 13's usage. `data-reveal` values are `"pending"` / `"shown"` in both Task 6 and the Task 1 CSS. `PLACEHOLDER_MARKING` is the single flag name across Tasks 5 and 9. `data-motion` is written by Task 2's script and read by Task 6's CSS.
