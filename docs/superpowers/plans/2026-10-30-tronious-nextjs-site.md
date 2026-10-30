# Tronious Next.js Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the single-file `cdmo-site.html` prototype (hash-routed, light+dark) into a production Next.js (App Router, TypeScript) site for Tronious, using real routes per page and the light-theme-only colour palette from DESIGN.md.

**Architecture:** One Next.js route per existing hash-page (15 routes total), sharing a root layout with a client `Header` (mobile menu + active-link state) and a static `Footer`. Page chrome (the ruled "sheet" + mono title block) is a small shared `Sheet` server component. All content is ported verbatim from the spec HTML, including its `.ph` placeholder spans — no new business content is invented. Styling is hand-written global CSS (no Tailwind) replicating the prototype's stylesheet, with the dark-theme blocks removed per the client's "light theme only" instruction. On top of that port, a CSS-level "modern marketing" pass (user-approved, see Global Constraints) layers in soft shadows, a larger corner radius, gradient accents on the hero band and primary buttons, bigger hero/heading type, and smoother eased hover motion on real interactive elements — same tokens, content, routes and component structure as the base port, no new layout patterns. In-page smooth-scroll "jump" links and the page fade-in become plain CSS (native anchor `scroll-behavior`), removing the need for the prototype's routing/jump JavaScript. Static content pages have no business logic, so their verification is `next build` (which statically renders every route and fails on any render/type error); the two components with real behaviour (`Header`, `ContactForm`) get Vitest + React Testing Library unit tests.

**Tech Stack:** Next.js (latest, App Router) · React · TypeScript · plain CSS (`app/globals.css`, no Tailwind/CSS-in-JS) · `next/font/google` for IBM Plex Mono / Sans Condensed / Sans · Vitest + @testing-library/react for the two interactive components · npm.

**Spec:** `docs/design/cdmo-site.html` (markup, styling, behaviour) and `docs/design/DESIGN.md` (design system write-up) — both copied verbatim into this repo so any implementer can read them without this conversation's context.

## Global Constraints

- Framework: Next.js App Router, TypeScript, React — installed via `create-next-app@latest`, no `src/` directory, import alias `@/*`, ESLint enabled, Tailwind **disabled** (CSS is hand-written to match the spec's bespoke stylesheet).
- Package manager: npm (Node v22.17.0 / npm 10.5.0 are the toolchain present).
- **Light theme only**: port only the light values from DESIGN.md §2.1. Do not port `@media (prefers-color-scheme: dark)`, `:root[data-theme="dark"]`, or any theme-toggle logic — none of that ships.
- Route map (canonical — every internal link must use these paths, never a bare `#fragment`, except for genuine same-page anchors noted per task):

  | Page | Route | Doc no. |
  |---|---|---|
  | Home | `/` | `WEB-001` |
  | Services | `/services` | `WEB-010` |
  | Engineering | `/engineering` | `WEB-015` |
  | Device Expertise | `/expertise` | `WEB-020` |
  | Process | `/process` | `WEB-030` |
  | Quality & Regulatory | `/quality` | `WEB-040` |
  | Facilities | `/facilities` | `WEB-050` |
  | Manufacturing | `/manufacturing` | `WEB-055` |
  | Engagement models | `/engagement` | `WEB-060` |
  | Case studies | `/cases` | `WEB-070` |
  | About | `/about` | `WEB-080` |
  | Insights | `/insights` | `WEB-090` |
  | Contact | `/contact` | `WEB-100` |
  | Careers | `/careers` | `WEB-110` |
  | Legal | `/legal` | `WEB-120` |

- Content fidelity: port text/markup verbatim from `docs/design/cdmo-site.html`, **including** every `<span class="ph">[…]</span>` placeholder (e.g. `[Company Name]`, `[XX]`, `[Date]`). Do not invent real company facts, stats, names, or contact details — this is explicitly out of scope per the client's "just use the information in the .html file" instruction.
- JSX conversion checklist (applies to every content-porting task): `class=` → `className=`; `for=` → `htmlFor=`; inline `style="a:b;c:d"` strings → `style={{a: 'b', c: 'd'}}` objects; void elements (`<input>`, `<br>`) self-close; HTML comments (section dividers) are dropped, not ported; `aria-*`/`data-*` attribute names are unchanged; SVG attributes already match JSX casing in the source (`viewBox`, `aria-hidden`) so no change is needed there.
- Fonts via `next/font/google`: IBM Plex Mono (weights `400,500`), IBM Plex Sans Condensed (weights `500,600,700`), IBM Plex Sans (weights `400,500,600`) — each exposed as a CSS variable consumed by `--mono`/`--display`/`--body` in `globals.css`.
- Accessibility attributes must be preserved exactly as in the spec: `aria-hidden` on decorative marks/icons, `aria-label` on nav/markets lists, `aria-expanded`/`aria-controls` on the menu button, `aria-current="page"` on the active nav link, `:focus-visible` outline.
- All motion (page fade-in, smooth-scroll for in-page jump links) stays gated behind `@media (prefers-reduced-motion: no-preference)`, matching the spec.
- **Visual direction (client-approved, CSS-level only):** the client asked for the site to read as a modern, polished marketing site rather than the spec's flat engineering-drawing look. Scope of this change, decided with the client: keep every DESIGN.md colour token, all content, and the existing component/layout structure exactly as planned — only layer in soft shadows, a moderate corner-radius increase, gradient accents on the hero band and primary buttons, slightly larger hero/heading type, and smoother eased hover transitions. This is implemented entirely in Task 2 via the additional tokens and rules below; no other task changes as a result. Two explicit exceptions, both my call:
  - the `.titleblock` mono doc-number strip stays exactly as spec'd (flat, sharp corners, no shadow) — it's the design's distinctive signature detail, not a surface the "modern marketing" note is about;
  - hover lift/shadow is added only to genuinely interactive elements (links, buttons — `.fam-card`, `.capgrid a`, `.btn`); static, non-clickable cards (`.cell`, `.case`) get the baseline soft shadow but no hover motion, so they don't look clickable when they aren't.
- New tokens added on top of DESIGN.md's light palette (Task 2 Step 1), for the visual-direction pass above: `--radius-sm:6px`, `--radius-md:10px`, `--radius-lg:14px`; `--shadow-sm:0 1px 2px rgba(20,33,46,.06)`, `--shadow-md:0 8px 24px -8px rgba(20,33,46,.18)`, `--shadow-lg:0 16px 40px -12px rgba(20,33,46,.28)`; `--accent-2:#3E86E6` (gradient endpoint for accent buttons); `--band-2:#17406B` (gradient endpoint for the hero band); `--signal-2:#7FDCF2` (gradient endpoint for band-CTA buttons).
- My call (minor, not a content decision): the home hero's unused animated-SVG figure CSS (`.hx-fig`, `.sv-t`, `.sv-s`, `.sv-dim`, `.ch`/`.ch2`–`.ch4`, `.sv-foot`, `.sv-lead`, `.sv-read`, `.sv-pump`, `.sv-hose`, and the `inflate`/`readout`/`flow` keyframes) is dropped during the CSS port — DESIGN.md §7 already flags it as dead code with no markup using it, and nothing in this plan adds the missing SVG markup.
- My call: the prototype's routing/jump/menu-toggle/form-submit inline `<script>` is not ported as-is — its behaviour is reimplemented idiomatically as described in the Architecture section (Next routing, CSS `scroll-behavior`, React state), since a hash-router script has no purpose once routes are real.

## Review Focus

- **Mobile menu must reset on navigation.** The prototype's `show()` closed the nav menu and reset `aria-expanded` on every hash change; with a persistent client `Header` across real route changes, forgetting to close the menu on navigation would leave it open over the next page. Covered by a Header test that opens the menu, simulates a path change, and asserts it closes.
- **Hash→route link conversion must be complete and correct.** Every `href="#somepage"` in the source becomes a real route per the table above; a missed conversion silently produces a dead `#somepage` link on the new single-page-per-route site. Covered by the final link-audit task, which greps every `href` across the app for a literal `#` followed by a known page slug.
- **Reduced motion must still gate the new smooth-scroll behaviour.** The source only animates under `prefers-reduced-motion: no-preference`; the plan's CSS-based replacement for jump-link scrolling is a *new* motion source not present verbatim in the spec, so it's easy to forget the guard. Covered by a CSS review step in the token/CSS task confirming `scroll-behavior: smooth` is declared only inside that media query.
- **Tables and the two-up form/cap/case grids must not overflow at phone width.** `.tablewrap` provides horizontal scroll for wide tables (expertise, quality/certs), but the surrounding `.wrap`/`.page` padding must still hold a 16px gutter with no page-level horizontal scroll at ~375px. Covered by a manual width check (documented, not automated) in the final verification task, since this is a rendering/viewport concern Vitest's jsdom can't exercise.
- **Uncontrolled form inputs must not throw React warnings.** The RFQ form's inputs/selects/checkboxes are uncontrolled (no `value`/`onChange`) by design, matching the source's plain-HTML behaviour; a slip into a controlled `value` without `onChange` produces a console warning and, in strict mode, unexpected resets. Covered by the ContactForm test asserting no console errors/warnings during render and submit.

---

## File Structure

```
Tronious Web/
├── docs/
│   ├── design/cdmo-site.html        (spec, already added)
│   ├── design/DESIGN.md             (spec, already added)
│   └── superpowers/plans/2026-10-30-tronious-nextjs-site.md  (this plan)
├── package.json, tsconfig.json, next.config.ts, eslint.config.mjs
├── vitest.config.ts
├── vitest.setup.ts
├── lib/
│   ├── truncate.ts
│   └── nav.ts
├── components/
│   ├── Sheet.tsx
│   ├── Header.tsx
│   ├── Header.test.tsx
│   ├── Footer.tsx
│   └── ContactForm.tsx
│   └── ContactForm.test.tsx
└── app/
    ├── layout.tsx
    ├── globals.css
    ├── page.tsx                      (home, "/")
    ├── services/page.tsx
    ├── engineering/page.tsx
    ├── expertise/page.tsx
    ├── process/page.tsx
    ├── quality/page.tsx
    ├── facilities/page.tsx
    ├── manufacturing/page.tsx
    ├── engagement/page.tsx
    ├── cases/page.tsx
    ├── about/page.tsx
    ├── insights/page.tsx
    ├── contact/page.tsx
    ├── careers/page.tsx
    └── legal/page.tsx
```

---

### Task 1: Project scaffold & tooling

**Files:**
- Create: entire Next.js scaffold (`package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css` — all generated, then trimmed)
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (add `test` script and test deps)

**Interfaces:**
- Produces: a working `npm run dev` / `npm run build` / `npm run lint` / `npm run test` toolchain that every later task builds on.

- [ ] **Step 1: Scaffold the app**

Run: `npx create-next-app@latest . --typescript --eslint --app --no-tailwind --no-src-dir --import-alias "@/*" --use-npm`
Expected: project files created alongside the existing `docs/` directory; command exits 0. (The directory isn't fully empty — it already contains `docs/`. If the installed `create-next-app` version refuses a non-empty directory, temporarily move `docs/` aside, run the scaffold, then move it back before continuing.)

- [ ] **Step 2: Verify the default build works**

Run: `npm run build`
Expected: build succeeds with the default starter `app/page.tsx`.

- [ ] **Step 3: Add the test toolchain**

Run: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react`

- [ ] **Step 4: Create `vitest.config.ts`**

Configure the `react` plugin, `test.environment: 'jsdom'`, `test.setupFiles: ['./vitest.setup.ts']`, `test.passWithNoTests: true` (so Step 7 below, run before any test file exists, exits 0), and a path alias for `@/*` matching `tsconfig.json`.

- [ ] **Step 5: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 6: Add the `test` script to `package.json`**

```json
"test": "vitest run"
```

- [ ] **Step 7: Run the test script with no tests yet**

Run: `npm run test`
Expected: exits 0 ("No test files found" message, non-fatal because of `passWithNoTests`) — confirms wiring before any test is written.

- [ ] **Step 8: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js app with Vitest toolchain"
```

---

### Task 2: Design tokens, global CSS & fonts

**Files:**
- Modify: `app/globals.css` (replace starter content)
- Modify: `app/layout.tsx` (wire `next/font/google` variables onto `<html>`/`<body>`)

**Interfaces:**
- Produces: all CSS custom properties and component classes from DESIGN.md §2–§3, scoped as plain global classes (`.wrap`, `.page`, `.titleblock`, `.hx`, `.grid`, `.cell`, `.badge`, `.ticks`, `.steps`, `.tablewrap`, `.split`, `.case`, `form`/`.row2`/fieldset styles, `.note`, `footer`/`.foot`, `.fam`/`.fam-card`, `.capgrid`, `.flow`, `.stats`, `.quote`, `.jump`, `.cap`/`.cap-h`/`.cap-b`, `.pflow`), plus the modern-elevation tokens/rules from Step 3 layered onto the same classes — available to every later component/page task via `className`.
- Consumes: nothing (first content task).

- [ ] **Step 1: Port the light-only token block into `app/globals.css`**

Copy the `:root{...}` block from `docs/design/cdmo-site.html`'s `<style>` verbatim (light values only — see Global Constraints). Do **not** copy the `@media (prefers-color-scheme:dark)` block or the `:root[data-theme="dark"]` block. Then add the new tokens from Global Constraints' "New tokens" bullet (`--radius-sm/md/lg`, `--shadow-sm/md/lg`, `--accent-2`, `--band-2`, `--signal-2`) to the same `:root` block.

- [ ] **Step 2: Port the remaining component CSS verbatim**

Copy every other rule from the spec's `<style>` block into `globals.css`, in order, **except** the unused hero SVG figure styles and keyframes listed in Global Constraints ("My call") — also drop the `.r2`/`.r3`/`.r4` animation-delay overrides and the now-pointless `@media (max-width:820px){.hx-grid{...}}` single-column override, both leftovers of that same dead figure. Keep the `#menuBtn`/`nav.open` rules (still needed — `Header` will toggle the same `.open` class via React state instead of `classList.toggle`).

- [ ] **Step 3: Apply the modern-elevation visual pass**

Add the following rules after the verbatim port from Step 2 (they override/extend specific selectors already defined above — CSS cascade order means later-in-file wins, so append rather than hunt-and-edit each selector in place):

```css
/* radius */
.page{border-radius:var(--radius-md)}
.btn{border-radius:var(--radius-sm)}
.btn.primary,.btn.hx-primary{border-color:transparent}
.cell,.fam-card,.case{border-radius:var(--radius-sm)}
.badge,.chips span{border-radius:999px}
input,select,textarea{border-radius:var(--radius-sm)}

/* baseline elevation on card surfaces (not .titleblock — stays flat per Global Constraints) */
.cell,.fam-card,.case{box-shadow:var(--shadow-sm)}
header{box-shadow:var(--shadow-sm)}

/* hover elevation, interactive elements only */
.fam-card{transition:border-color .2s cubic-bezier(.2,.8,.2,1),transform .2s cubic-bezier(.2,.8,.2,1),box-shadow .2s cubic-bezier(.2,.8,.2,1)}
.fam-card:hover{box-shadow:var(--shadow-md);transform:translateY(-3px)}
.capgrid a{transition:background-color .2s cubic-bezier(.2,.8,.2,1),box-shadow .2s cubic-bezier(.2,.8,.2,1),transform .2s cubic-bezier(.2,.8,.2,1)}
.capgrid a:hover{box-shadow:var(--shadow-md);transform:translateY(-2px)}
.btn{transition:box-shadow .2s cubic-bezier(.2,.8,.2,1),transform .2s cubic-bezier(.2,.8,.2,1),filter .2s cubic-bezier(.2,.8,.2,1)}
.btn.primary,.btn.hx-primary{box-shadow:var(--shadow-sm)}
.btn.primary:hover,.btn.hx-primary:hover{box-shadow:var(--shadow-md);transform:translateY(-1px)}

/* gradient accents */
.btn.primary{background-image:linear-gradient(135deg,var(--accent),var(--accent-2))}
.btn.hx-primary{background-image:linear-gradient(135deg,var(--signal),var(--signal-2))}
.page>section.hx{background-image:linear-gradient(165deg,var(--band) 0%,var(--band-2) 100%),radial-gradient(900px circle at 88% -15%,rgba(79,195,230,.22),transparent 60%)}

/* bigger hero/heading type */
h1{font-size:clamp(2.1rem,5.5vw,3.5rem);letter-spacing:-.015em}
.hx h1{font-size:clamp(2.4rem,6vw,4rem)}
```

`.btn.ghost`/`.btn.hx-ghost` keep their existing flat, bordered, no-shadow treatment (unchanged) so the visual hierarchy between primary and secondary actions stays clear.

Note on the hero rule: it targets `.page>section.hx`, not just `.hx` — that matches the exact selector (and so the exact specificity) of the verbatim rule from Step 2 that first sets `background` on that element. A lower-specificity `.hx{...}` rule would lose the cascade to that earlier, more specific selector and the gradient would never paint, regardless of file order.

- [ ] **Step 4: Add the reduced-motion-gated smooth scroll rule**

```css
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

Place this near the existing `.page` fade-in reduced-motion block (keep both inside the same media query or as adjacent blocks — either is fine, not both ungated).

- [ ] **Step 5: Wire fonts in `app/layout.tsx`**

```ts
import { IBM_Plex_Mono, IBM_Plex_Sans_Condensed, IBM_Plex_Sans } from 'next/font/google'

const mono = IBM_Plex_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-mono' })
const display = IBM_Plex_Sans_Condensed({ weight: ['500', '600', '700'], subsets: ['latin'], variable: '--font-display' })
const body = IBM_Plex_Sans({ weight: ['400', '500', '600'], subsets: ['latin'], variable: '--font-body' })
```

Apply all three `.variable` classes to `<html>` (or `<body>`) alongside the existing className.

- [ ] **Step 6: Map font variables onto the design tokens**

In `globals.css`, change the token definitions so they consume the generated variables:

```css
--display: var(--font-display), "Arial Narrow", Arial, sans-serif;
--body: var(--font-body), -apple-system, "Segoe UI", Roboto, sans-serif;
--mono: var(--font-mono), ui-monospace, Menlo, Consolas, monospace;
```

- [ ] **Step 7: Verify**

Run: `npm run build`
Expected: build succeeds (confirms the CSS and font wiring don't break compilation; visual correctness is confirmed once pages exist, in the final verification task).

- [ ] **Step 8: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: port light-theme design tokens and fonts with modern-elevation visual pass"
```

---

### Task 3: `truncate` util and `Sheet` title-block component

**Files:**
- Create: `lib/truncate.ts`
- Create: `lib/truncate.test.ts`
- Create: `components/Sheet.tsx`
- Create: `components/Sheet.test.tsx`

**Interfaces:**
- Produces: `truncate(text: string, max: number): string` and `<Sheet doc={string} sheetTitle={string}>{children}</Sheet>` — every `app/**/page.tsx` task wraps its content in `Sheet` with the `doc`/`sheetTitle` values from the route table in Global Constraints.
- Consumes: nothing.

- [ ] **Step 1: Write the failing truncate tests**

```ts
import { describe, it, expect } from 'vitest'
import { truncate } from './truncate'

describe('truncate', () => {
  it('returns short strings unchanged', () => {
    expect(truncate('abc', 5)).toBe('abc')
  })
  it('truncates and appends an ellipsis past the limit', () => {
    const input = 'a'.repeat(40)
    expect(truncate(input, 32)).toBe('a'.repeat(32) + '…')
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run test -- truncate`
Expected: FAIL — `truncate` is not defined / module not found.

- [ ] **Step 3: Implement `truncate(text: string, max: number): string` in `lib/truncate.ts`**

- [ ] **Step 4: Run to verify it passes**

Run: `npm run test -- truncate`
Expected: PASS (2 tests).

- [ ] **Step 5: Write the failing Sheet test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Sheet from './Sheet'

describe('Sheet', () => {
  it('renders the doc number, truncated sheet title, rev and status', () => {
    render(<Sheet doc="WEB-001" sheetTitle={'a'.repeat(40)}><p>content</p></Sheet>)
    expect(screen.getByText('WEB-001')).toBeInTheDocument()
    expect(screen.getByText('a'.repeat(32) + '…')).toBeInTheDocument()
    expect(screen.getByText('A · Draft')).toBeInTheDocument()
    expect(screen.getByText('Content placeholders')).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run to verify it fails**

Run: `npm run test -- Sheet`
Expected: FAIL — `Sheet` module not found.

- [ ] **Step 7: Implement `Sheet({ doc, sheetTitle, children }: { doc: string; sheetTitle: string; children: React.ReactNode })` in `components/Sheet.tsx`**

Renders `<article className="page">{children}<div className="titleblock">...</div></article>` with four cells (`Doc no.` / `Sheet` / `Rev` / `Status`) exactly as in the spec's generated title block, using `truncate(sheetTitle, 32)` for the Sheet cell and the literal text `A · Draft` / `Content placeholders` for Rev/Status (per Global Constraints — this is still draft/placeholder content).

- [ ] **Step 8: Run to verify it passes**

Run: `npm run test -- Sheet`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add lib/truncate.ts lib/truncate.test.ts components/Sheet.tsx components/Sheet.test.tsx
git commit -m "feat: add truncate util and Sheet title-block component"
```

---

### Task 4: `Header` component (nav, mobile menu, active link)

**Files:**
- Create: `lib/nav.ts`
- Create: `components/Header.tsx`
- Create: `components/Header.test.tsx`

**Interfaces:**
- Consumes: nothing new (uses `next/link`, `next/navigation`'s `usePathname`).
- Produces: `NAV_LINKS`, `NAV_CTA`, `FOOTER_COMPANY_LINKS`, `FOOTER_WORK_LINKS`, `FOOTER_LEGAL_LINKS` (type `{ href: string; label: string }[]`) from `lib/nav.ts`, consumed by both `Header` (Task 4) and `Footer` (Task 5); `<Header />` with no props, rendered once in `app/layout.tsx` (Task 6).

- [ ] **Step 1: Create `lib/nav.ts`**

```ts
export type NavLink = { href: string; label: string }

export const NAV_LINKS: NavLink[] = [
  { href: '/services', label: 'Services' },
  { href: '/engineering', label: 'Engineering' },
  { href: '/manufacturing', label: 'Manufacturing' },
  { href: '/expertise', label: 'Device Expertise' },
  { href: '/process', label: 'Process' },
  { href: '/quality', label: 'Quality & Regulatory' },
  { href: '/about', label: 'About' },
]

export const NAV_CTA: NavLink = { href: '/contact', label: 'Start a Project' }

export const FOOTER_COMPANY_LINKS: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/insights', label: 'Insights' },
  { href: '/cases', label: 'Case studies' },
]

export const FOOTER_WORK_LINKS: NavLink[] = [
  { href: '/services', label: 'Services' },
  { href: '/engineering', label: 'Engineering' },
  { href: '/manufacturing', label: 'Manufacturing' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/engagement', label: 'Engagement models' },
  { href: '/quality', label: 'Quality & Regulatory' },
  { href: '/contact', label: 'Start a project' },
]

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { href: '/legal', label: 'Privacy policy' },
  { href: '/legal', label: 'Terms of use' },
  { href: '/legal', label: 'Cookie policy' },
]
```

All three `FOOTER_LEGAL_LINKS` entries share `href: '/legal'` (matching the source, which points all three at the single `#legal` page) — when `Footer` (Task 5) maps this array to JSX, key the `<li>` by `label` or array index, not `href`, to avoid a React duplicate-key warning.

- [ ] **Step 2: Write the failing Header tests**

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const pathname = { value: '/services' }
vi.mock('next/navigation', () => ({ usePathname: () => pathname.value }))

import Header from './Header'

describe('Header', () => {
  it('marks the current route with aria-current', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Engineering' })).not.toHaveAttribute('aria-current')
  })

  it('toggles the mobile menu open and closed', () => {
    render(<Header />)
    const btn = screen.getByRole('button', { name: 'Menu' })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the menu when the route changes', () => {
    const { rerender } = render(<Header />)
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }))
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'true')
    pathname.value = '/contact'
    rerender(<Header />)
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  })
})
```

- [ ] **Step 3: Run to verify it fails**

Run: `npm run test -- Header`
Expected: FAIL — `Header` module not found.

- [ ] **Step 4: Implement `Header()` in `components/Header.tsx`**

`"use client"`. `const [open, setOpen] = useState(false)`; `const pathname = usePathname()`; `useEffect(() => setOpen(false), [pathname])`. Render the same structure as the spec's `<header>`: `.wrap.bar` containing the brand link (`href="/"`, `.mark` span with `aria-hidden="true"`, text `[Company Name]` per the placeholder-fidelity constraint), the `#menuBtn` button (`aria-expanded={open}`, `aria-controls="mainnav"`, `onClick={() => setOpen(o => !o)}`, label `Menu`), and `<nav id="mainnav" aria-label="Main" className={open ? 'open' : undefined}>` with a `<ul>` mapping `NAV_LINKS` to `<li><Link href=... aria-current={pathname === href ? 'page' : undefined}>{label}</Link></li>`, plus a final `<li>` for `NAV_CTA` with `className="cta"`.

- [ ] **Step 5: Run to verify it passes**

Run: `npm run test -- Header`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add lib/nav.ts components/Header.tsx components/Header.test.tsx
git commit -m "feat: add Header with active-link nav and mobile menu"
```

---

### Task 5: `Footer` component + root layout wiring

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `FOOTER_COMPANY_LINKS`, `FOOTER_WORK_LINKS`, `FOOTER_LEGAL_LINKS` from `lib/nav.ts` (Task 4); `Header` (Task 4).
- Produces: `<Footer />` (no props); the final `app/layout.tsx` shell every page renders inside (`<html><body>{fonts}<Header/><main className="wrap">{children}</main><Footer/></body></html>`).

- [ ] **Step 1: Implement `Footer()` in `components/Footer.tsx`**

Static server component porting the spec's `<footer>` verbatim: brand blurb (`[Company Name]` + "Contract design and manufacturing for physical therapy and recovery devices."), the three `FOOTER_*` link columns using `next/link`, and the `.legend-ph` placeholder-legend paragraph.

- [ ] **Step 2: Wire `app/layout.tsx`**

Set `export const metadata: Metadata = { title: '[Company Name]', description: 'Contract design and manufacturing for physical therapy and recovery devices.' }` as the layout-level default (pages override `title`/`description` individually in later tasks). Render `<Header />`, `<main className="wrap">{children}</main>`, `<Footer />` inside `<body>`.

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds; the starter `app/page.tsx` now renders inside the Header/Footer shell.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/layout.tsx
git commit -m "feat: add Footer and wire root layout"
```

---

### Task 6: `ContactForm` component

**Files:**
- Create: `components/ContactForm.tsx`
- Create: `components/ContactForm.test.tsx`

**Interfaces:**
- Produces: `<ContactForm />` (no props), consumed by `app/contact/page.tsx` (Task 15).
- Consumes: nothing new.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  afterEach(() => vi.restoreAllMocks())

  it('reveals the preview note on submit without console warnings', () => {
    const errorSpy = vi.spyOn(console, 'error')
    render(<ContactForm />)
    expect(screen.getByText(/this is a preview form/i)).not.toBeVisible()
    fireEvent.submit(screen.getByRole('button', { name: /send inquiry/i }).closest('form')!)
    expect(screen.getByText(/this is a preview form/i)).toBeVisible()
    expect(errorSpy).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run test -- ContactForm`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `ContactForm()` in `components/ContactForm.tsx`**

`"use client"`. `const [submitted, setSubmitted] = useState(false)`. Port the spec's `<form id="rfq">` verbatim (name/company row, email/country row, device-type/project-stage selects, target-markets fieldset with 4 checkboxes, volume/launch row, description textarea, NDA checkbox, submit button), with `onSubmit={e => { e.preventDefault(); setSubmitted(true) }}` and the `<p className="note" hidden={!submitted}>` preview-note paragraph. All inputs stay uncontrolled (no `value`/`onChange`), matching the spec and the Review Focus item on avoiding React console warnings.

- [ ] **Step 4: Run to verify it passes**

Run: `npm run test -- ContactForm`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ContactForm.tsx components/ContactForm.test.tsx
git commit -m "feat: add ContactForm with preview submit behaviour"
```

---

### Task 7: Home page (`/`)

**Files:**
- Modify: `app/page.tsx` (replace starter content)

**Interfaces:**
- Consumes: `Sheet` (Task 3).

- [ ] **Step 1: Set metadata**

Use the same `'Page | [Company Name]'` title pattern as every other page (Tasks 8–14), not invented marketing copy:

```ts
export const metadata: Metadata = {
  title: 'Home | [Company Name]',
  description: 'We take traction, compression, massage and thermal therapy devices from first sketch to production, ready for the US, EU and Australian markets.',
}
```

- [ ] **Step 2: Port the home content into `<Sheet doc="WEB-001" sheetTitle="Your device. Designed, cleared and built by one team.">`**

Port, in order, from the `<!-- ============ HOME ============ -->` block of `docs/design/cdmo-site.html`: the `.hx` hero section (buttons → `/contact` and `/process`); the `.hx-cert` certification badges section; the "Five device families" `.fam` grid section (each `.fam-card` href → `/expertise`); the "Engineering under one roof" `.capgrid` section (each link → `/engineering`); the `.band-soft` concept→build `.flow` section (its "See every phase" link → `/process`); the stats section; the quote section; and the closing `.hx.hx-end` CTA (buttons → `/contact` and `/engagement`).

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds; `/` statically generates without errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: port home page content"
```

---

### Task 8: Services (`/services`) + Device Expertise (`/expertise`) pages

**Files:**
- Create: `app/services/page.tsx`
- Create: `app/expertise/page.tsx`

**Interfaces:**
- Consumes: `Sheet` (Task 3).

- [ ] **Step 1: `app/services/page.tsx`**

`metadata.title = 'Services | [Company Name]'`, description from the page's lead paragraph. `<Sheet doc="WEB-010" sheetTitle="Every stage, under one quality system">` porting the `<!-- ============ SERVICES ============ -->` block: intro section, the 6-cell `.grid` of service areas (`.more` links → `/engineering` and `/manufacturing` where the source has them), and the closing `.split` CTA (`Book a scoping call` → `/contact`, `Engagement models` → `/engagement`).

- [ ] **Step 2: `app/expertise/page.tsx`**

`metadata.title = 'Device Expertise | [Company Name]'`. `<Sheet doc="WEB-020" sheetTitle="Specialists in physical therapy and recovery devices">` porting the `<!-- ============ EXPERTISE ============ -->` block: intro, the device-family `.tablewrap` table (6 rows), the RA-confirmation note paragraph, and the clinical-vs-home-use `.split` section.

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds; `/services` and `/expertise` generate.

- [ ] **Step 4: Commit**

```bash
git add app/services/page.tsx app/expertise/page.tsx
git commit -m "feat: port services and expertise pages"
```

---

### Task 9: Process page (`/process`)

**Files:**
- Create: `app/process/page.tsx`

**Interfaces:**
- Consumes: `Sheet` (Task 3).

- [ ] **Step 1: Set metadata**

`title: 'Process | [Company Name]'`, description from the lead paragraph.

- [ ] **Step 2: Port content**

`<Sheet doc="WEB-030" sheetTitle="Phase-gated, with a deliverable at every gate">` porting the `<!-- ============ PROCESS ============ -->` block verbatim: intro, the `.steps` ordered list (all 6 gated phases with their `.dur`, ticks, and `.deliv` lines — the Gate 6 deliverable's `Full manufacturing details →` link goes to `/manufacturing`), and the closing `.note` disclaimer.

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/process/page.tsx
git commit -m "feat: port process page"
```

---

### Task 10: Engineering page (`/engineering`)

**Files:**
- Create: `app/engineering/page.tsx`

**Interfaces:**
- Consumes: `Sheet` (Task 3); relies on the `scroll-behavior: smooth` + `scroll-margin-top` CSS already added in Task 2.

- [ ] **Step 1: Set metadata**

`title: 'Engineering | [Company Name]'`, description from the lead paragraph.

- [ ] **Step 2: Port content**

`<Sheet doc="WEB-015" sheetTitle="Mechanical, electronics, firmware, apps and test systems">` porting the `<!-- ============ ENGINEERING ============ -->` block: intro with the `.jump` in-page nav (convert each `data-jump="e-mech"` anchor to a plain `href="#e-mech"` same-page fragment link — no `data-jump`/JS needed, per Task 2's CSS); all six `.cap` sections (`e-mech`, `e-pcb`, `e-fw`, `e-app`, `e-wear`, `e-test`) each with their `id`, "What we do" ticks, and "You receive" chips; the closing `.split` CTA (`Development process` → `/process`, `Manufacturing` → `/manufacturing`).

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/engineering/page.tsx
git commit -m "feat: port engineering page"
```

---

### Task 11: Manufacturing page (`/manufacturing`)

**Files:**
- Create: `app/manufacturing/page.tsx`

**Interfaces:**
- Consumes: `Sheet` (Task 3); same jump-link CSS as Task 10.

- [ ] **Step 1: Set metadata**

`title: 'Manufacturing | [Company Name]'`, description from the lead paragraph.

- [ ] **Step 2: Port content**

`<Sheet doc="WEB-055" sheetTitle="From released design to thousands of units a month">` porting the `<!-- ============ MANUFACTURING ============ -->` block: intro with `.jump` nav (`#m-dt`, `#m-flow`, `#m-qc`, `#m-scale`, same fragment-link conversion as Task 10); the `m-dt` design-transfer `.steps.num` section + note; the `m-flow` `.pflow` 10-step production flow; the `m-qc` quality-controls `.grid`; the `m-scale` scaling table + the "talk to us about a transfer" paragraph (link → `/contact`).

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/manufacturing/page.tsx
git commit -m "feat: port manufacturing page"
```

---

### Task 12: Quality (`/quality`) + Facilities (`/facilities`) + Engagement (`/engagement`) + Case studies (`/cases`) pages

**Files:**
- Create: `app/quality/page.tsx`
- Create: `app/facilities/page.tsx`
- Create: `app/engagement/page.tsx`
- Create: `app/cases/page.tsx`

**Interfaces:**
- Consumes: `Sheet` (Task 3).

- [ ] **Step 1: `app/quality/page.tsx`**

`title: 'Quality & Regulatory | [Company Name]'`. `<Sheet doc="WEB-040" sheetTitle="Built for audits in three markets">` porting the `<!-- ============ QUALITY ============ -->` block: intro, certifications table, regulatory-experience-by-market `.grid`, "who holds the clearance" section.

- [ ] **Step 2: `app/facilities/page.tsx`**

`title: 'Facilities | [Company Name]'`. `<Sheet doc="WEB-050" sheetTitle="Where your device gets built">` porting the `<!-- ============ FACILITIES ============ -->` block: intro, facts table, in-house-equipment `.grid`, trailing edit-this-list note.

- [ ] **Step 3: `app/engagement/page.tsx`**

`title: 'Engagement models | [Company Name]'`. `<Sheet doc="WEB-060" sheetTitle="Choose how we work together">` porting the `<!-- ============ ENGAGEMENT ============ -->` block: intro, Models A–D `.grid`, IP section.

- [ ] **Step 4: `app/cases/page.tsx`**

`title: 'Case studies | [Company Name]'`. `<Sheet doc="WEB-070" sheetTitle="Projects we've delivered">` porting the `<!-- ============ CASES ============ -->` block: intro, the three `.case` cards (`.split` layout) with their `dl` metric strips.

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: succeeds; all four routes generate.

- [ ] **Step 6: Commit**

```bash
git add app/quality/page.tsx app/facilities/page.tsx app/engagement/page.tsx app/cases/page.tsx
git commit -m "feat: port quality, facilities, engagement and cases pages"
```

---

### Task 13: About (`/about`) + Insights (`/insights`) + Careers (`/careers`) + Legal (`/legal`) pages

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/insights/page.tsx`
- Create: `app/careers/page.tsx`
- Create: `app/legal/page.tsx`

**Interfaces:**
- Consumes: `Sheet` (Task 3).

- [ ] **Step 1: `app/about/page.tsx`**

`title: 'About | [Company Name]'`. `<Sheet doc="WEB-080" sheetTitle="Engineers and regulatory specialists who build therapy devices">` porting the `<!-- ============ ABOUT ============ -->` block: intro, "Our story", leadership `.grid` (3 cells), "Join the team" paragraph (`See open roles` link → `/careers`).

- [ ] **Step 2: `app/insights/page.tsx`**

`title: 'Insights | [Company Name]'`. `<Sheet doc="WEB-090" sheetTitle="Guides for device brands">` porting the `<!-- ============ INSIGHTS ============ -->` block: intro + the 6-cell suggested-articles `.grid`.

- [ ] **Step 3: `app/careers/page.tsx`**

`title: 'Careers | [Company Name]'`. `<Sheet doc="WEB-110" sheetTitle="Build devices that help people recover">` porting the `<!-- ============ CAREERS ============ -->` block: intro, open-roles table, "no matching role" paragraph.

- [ ] **Step 4: `app/legal/page.tsx`**

`title: 'Legal | [Company Name]'`. `<Sheet doc="WEB-120" sheetTitle="Privacy, terms and cookies">` porting the `<!-- ============ LEGAL ============ -->` block verbatim: intro + note, and the four sections (Privacy policy, Terms of use, Cookie policy, Accessibility statement).

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: succeeds; all four routes generate.

- [ ] **Step 6: Commit**

```bash
git add app/about/page.tsx app/insights/page.tsx app/careers/page.tsx app/legal/page.tsx
git commit -m "feat: port about, insights, careers and legal pages"
```

---

### Task 14: Contact page (`/contact`)

**Files:**
- Create: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `Sheet` (Task 3), `ContactForm` (Task 6).

- [ ] **Step 1: Set metadata**

`title: 'Start a Project | [Company Name]'`, description from the lead paragraph.

- [ ] **Step 2: Port content**

`<Sheet doc="WEB-100" sheetTitle="Tell us about your device">` porting the `<!-- ============ CONTACT ============ -->` block: intro section, a section rendering `<ContactForm />` in place of the raw `<form>` markup, and the closing `.split` business-development / facility-address cells.

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: port contact page with ContactForm"
```

---

### Task 15: Final link audit & full verification pass

**Files:**
- No new files expected; fixes land in whichever `app/**/page.tsx`, `components/*.tsx` files the audit flags.

**Interfaces:**
- Consumes: every route from Tasks 7–14, `Header`/`Footer` from Tasks 4–5.

- [ ] **Step 1: Grep for leftover hash links**

Run: `grep -rno 'href="#[a-z-]*"' app components | grep -vE '#(e-mech|e-pcb|e-fw|e-app|e-wear|e-test|m-dt|m-flow|m-qc|m-scale)'`
Expected: no output. Any match is a leftover prototype hash link (e.g. `href="#services"`) that must be converted to the matching real route from the Global Constraints route table — fix each one found.

- [ ] **Step 2: Full build**

Run: `npm run build`
Expected: all 15 routes listed in the Global Constraints route table appear in the build output with no errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Full test suite**

Run: `npm run test`
Expected: all Vitest suites pass (`truncate`, `Sheet`, `Header`, `ContactForm`).

- [ ] **Step 5: Manual phone-width check**

Run: `npm run dev`, open `http://localhost:3000` in a browser at a ~375px viewport width (devtools responsive mode), and check: no horizontal page scroll on `/`, `/expertise` (wide table), `/quality` (wide table), and `/engineering` (two-column `.cap` sections stack). Note and fix any overflow found.

- [ ] **Step 6: Commit (only if Steps 1 or 5 required fixes)**

```bash
git add -A
git commit -m "fix: correct remaining hash links and responsive overflow"
```

---

## Self-Review

1. **Spec coverage:** All 15 IA routes from DESIGN.md §4 have a task (Tasks 7–14). All DESIGN.md §2–§3 components are ported once in Task 2's global CSS and reused everywhere. The behaviour in DESIGN.md §5 is covered: routing → Next routing (Tasks 4, 7–14), title blocks → `Sheet` (Task 3), jump links → CSS smooth-scroll (Tasks 2, 10, 11), menu toggle → `Header` state (Task 4), form submit → `ContactForm` state (Task 6). No gaps found.
2. **Step scan:** every code step names an exact file and signature; page-porting steps point at an exact named HTML comment block in the spec file rather than re-transcribing it, since the spec travels with the plan and transcribing ~900 lines of markup here would make the plan longer than the code it describes.
3. **Type consistency:** `Sheet({ doc, sheetTitle, children })` (Task 3) is the single signature used by every page task (7–14) and matches Task 3's test. `NavLink` (Task 4) is the one type used by both `Header` (Task 4) and `Footer` (Task 5).
4. **Review Focus:** all five items (menu-close-on-navigate, hash-link conversion, reduced-motion gating, phone-width table overflow, uncontrolled-input warnings) have an owning task/step: Header test (Task 4 Step 2), link-audit (Task 15 Step 1), CSS review (Task 2 Step 4), manual width check (Task 15 Step 5), ContactForm test (Task 6 Step 1).
5. **Proportion:** this plan is long because the site has 15 distinct routes, each a genuine independent deliverable; the plan avoids transcribing their markup (pointing at the spec file instead), keeping each page task to a short, unambiguous pointer plus its metadata and link-destination decisions.
