# DESIGN.md — Contract Device Website

Design system and site specification, derived from `cdmo-site.html` (a single-file, hash-routed, multi-page static site for a contract design & manufacturing organisation (CDMO) serving physical-therapy and recovery devices).

---

## 1. Concept

**Metaphor: the engineering drawing sheet.** Every page is a "sheet" with a ruled border, a mono-typeset title block (doc no., sheet name, revision, status), and grid-paper texture in the hero. The tone is precise, technical, and audit-ready: buyers are supplier-qualification and regulatory teams.

**Principles**
- Trust through precision: standards, doc numbers and deliverables are shown, not implied.
- Flat and ruled: 1px rules, tiny radii, no shadows, no gradients (except the hero grid).
- One accent colour; a dark "band" is used only for the home hero and the closing CTA.
- Placeholders are visible and honest: unfinished content is highlighted so it cannot ship by accident.
- Works at phone width, in light and dark, and with reduced motion.

**Audience & markets:** device brands needing US (FDA 510(k), QMSR 21 CFR 820), EU (MDR 2017/745) and Australia (TGA/ARTG) readiness.

---

## 2. Design tokens

**2026-11 rewrite.** The site now runs on Tailwind CSS v4. Tokens live in `app/globals.css` as a two-level system: Level 1 is a set of fixed colour ramps declared in `@theme` (so Tailwind generates a utility for every step); Level 2 is a smaller set of semantic aliases that *point at* ramp steps and are *remapped* for dark mode. Because the alias changes rather than the utility, `bg-surface`, `text-text-primary`, `border-border-subtle` and similar classes flip theme automatically — the codebase carries almost no `dark:` variants. Prefer the semantic aliases below over a raw ramp step in page code; reach for a ramp step directly only inside `app/globals.css` itself.

### 2.1 Colour ramps (Level 1 — fixed, theme-independent)

| Ramp | Steps | Anchor |
|---|---|---|
| `neutral` (cool slate) | 0, 25, 50, 100, 150, 200, 300, 350, 400, 500, 600, 700, 800, 870, 900, 925, 940, 950 | ink `#14212E` (900), paper `#F3F5F7` (50) |
| `accent` (blue) | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 | accent `#1F5FBF` (500) |
| `signal` (cyan) | 300, 400, 500, 600 | highlight colour on dark bands, `#4FC3E6` (500) |
| `band` (deep navy) | `deep` `#08131E`, `base` `#0F2740`, `raised` `#17406B`, `rule` `#1C3A59` | dark section surfaces |
| `amber` | `fg`/`bg` light `#9A5B00`/`#FFF2DB`, `fg`/`bg` dark `#F2B65A`/`#33260F` | placeholder annotation only |

### 2.2 Semantic aliases (Level 2 — remapped per theme)

`surface`, `surface-raised`, `surface-sunken`, `surface-inverse`; `text-primary`, `text-secondary`, `text-tertiary`, `text-inverse`, `text-on-accent`; `border-subtle`, `border-default`, `border-strong`; `accent`, `accent-hover`, `accent-subtle`; `signal`; `placeholder-fg`, `placeholder-bg`; `band-surface`, `band-edge`.

**Theming mechanism:** aliases are remapped in two places, kept in sync — inside `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and again under an explicit `:root[data-theme="dark"]` with identical values. `color-scheme: dark` is set in both dark paths. An inline script in `app/layout.tsx` sets `data-theme` before first paint to avoid a flash; `ThemeToggle` (§3) cycles `system → light → dark` and persists the choice via `lib/theme.ts`. `app/globals.test.ts` asserts the two dark blocks never drift apart.

**Section tones are semantic roles, not fixed colours** (`components/ui/Section.tsx`'s `tone` prop: `default` | `sunken` | `band` | `accent`) — each resolves differently per theme so rhythm survives dark mode: `sunken` *recedes* in light (toward `neutral-50`) but *rises* in dark (toward `neutral-900`, lighter than the page), since there's nowhere darker to recede to there. `band` stays dramatic-dark in light and gains a lit `signal`-coloured top edge in dark, where it would otherwise read as just another surface step.

### 2.3 Typography

Three IBM Plex families, loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables (`--ff-body`, `--ff-display`, `--ff-mono`), mapped onto Tailwind's font utilities:

| Role | Family (fallbacks) | Utility |
|---|---|---|
| `--font-sans` | IBM Plex Sans, system UI stack | `font-sans` (body default) |
| `--font-display` | IBM Plex Sans Condensed, Arial Narrow, Arial | `font-display` (headings) |
| `--font-mono` | IBM Plex Mono, ui-monospace, Menlo, Consolas | `font-mono` (eyebrows, doc IDs, figures) |

A fluid `clamp()`-based scale, declared in `@theme` and consumed as Tailwind text-size utilities:

| Token | Utility | Value |
|---|---|---|
| `--text-hero` | `text-hero` | `clamp(2.75rem, 1.5rem + 5.2vw, 5rem)` |
| `--text-h1` | `text-h1` | `clamp(2.25rem, 1.4rem + 3.6vw, 3.75rem)` |
| `--text-h2` | `text-h2` | `clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)` |
| `--text-h3` | `text-h3` | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` |
| `--text-lead` | `text-lead` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` |
| `--text-body` | `text-body` | `clamp(1rem, 0.98rem + 0.08vw, 1.0625rem)` |
| `--text-eyebrow` | `text-eyebrow` | `0.75rem` |

Rules: `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs, measure capped near 68ch for prose, tabular numerals on statistics and table numerics.

### 2.4 Elevation

Shadows were banned in the original drawing-sheet design; the ban is lifted but depth stays disciplined — three steps declared in `@theme`: `--shadow-sm` (resting cards), `--shadow-md` (hover, sticky header once scrolled), `--shadow-lg` (drawer, elevated overlays). Dark mode pairs a reduced shadow with a lighter border/raised surface step rather than relying on shadow alone, since shadows read poorly on dark surfaces.

### 2.5 Layout

| Token | Value | Use |
|---|---|---|
| `--container-page` | 80rem (1280px) | default content width (`Container`'s `default` width) |
| `--container-narrow` | 60rem | prose-dense pages (`Container`'s `narrow` width) |
| `--container-wide` | 90rem | `Container`'s `wide` width |
| `--spacing-section` | `clamp(4rem, 2rem + 7vw, 8rem)` | block padding on every `Section` (`py-section`) |
| `--spacing-gutter` | `clamp(1.25rem, 5vw, 4rem)` | side padding, folds in `env(safe-area-inset-*)` |
| `--breakpoint-3xl` | 120rem | extra tier so very wide screens don't look empty |

Sections are full-bleed — the background spans edge to edge; `Container` (inside `Section`, or used standalone) holds content to the width above, centred, with the fluid gutter. There is no bordered "sheet" card any more (see §3).

### 2.6 Motion

`--ease-out-soft: cubic-bezier(0.2, 0.8, 0.2, 1)`, durations 150–400ms. Every animated effect is disabled under `prefers-reduced-motion: reduce` — content renders in its final state immediately, never hidden; `Reveal` (§3) checks the media query in JavaScript as well as CSS so a broken script or missing `IntersectionObserver` can never leave content invisible.

### 2.7 Breakpoints

Tailwind defaults (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px) plus `3xl` at 1920px. The header's nav collapses to a drawer below `lg` (960px cutover for the drawer itself, see `components/Header.tsx`). Prefer intrinsic responsiveness — `auto-fit`/`minmax()` grids and the tiers above — over one-off breakpoints.

---

## 3. Components

Pages compose from a small shared primitive layer rather than hand-rolled markup. Server components by default; a component is a client component (`'use client'`) only where interaction genuinely requires it.

### Layout primitives — `components/ui/`
- **`Container`** — holds content to a readable measure (`width`: `default` | `narrow` | `wide`, §2.5) inside a full-bleed section; renders as any element via `as`.
- **`Section`** — full-bleed wrapper (`tone`, §2.2; `rule` for an optional top hairline; `width`/`contain` pass through to `Container`; `id` for anchor targets; forwards an optional `data-doc="WEB-0XX"` document identifier to the DOM).
- **`SectionHead`** — optional `eyebrow`, required `title`, optional `lead`; renders correctly with no eyebrow (most non-home pages have none — inventing one would be new visible copy, which this project doesn't add).

### Content primitives
- **`Button`** — `variant`: `primary` | `ghost` | `subtle`; `size`: `md` | `lg`; renders a `next/link` `Link` when given `href`, a `<button>` otherwise. No `onDark` variant — a `Section`'s tone already re-points the colour aliases for its subtree.
- **`Card`** — generic container (`as`, `interactive` gates hover elevation — a non-interactive card never promises a click it doesn't support).
- **`Badge`** — outlined, mono, audit-like; for certifications and standards.
- **`Chip`** — filled, softer than `Badge`; for deliverables.
- **`Stat`** — a numeric value (sized for 2–4 digits plus a unit, so real figures drop in without reflow) plus a label.
- **`Quote`** — display-weight pull-quote with optional attribution.
- **`Note`** — advisory callout; visibility is the `hidden` attribute (not a class), so it holds even before CSS loads and stays readable to assistive tech — `ContactForm`'s submit-reveal behaviour depends on exactly this.
- **`TickList`** — bulleted list from a `ReactNode[]`, for static page copy.
- **`Ph`** — placeholder annotation (mono, muted amber, dotted underline, small marker glyph); a single launch flag (`lib/placeholders.ts`) silences the marking and the Footer's legend sentence together.
- **`DataTable`** — wraps a page-authored `<table>` in a horizontal-scroll container, so a wide table scrolls within its own box and never the page.
- **`JumpNav`** — a labelled in-page anchor nav; its link targets get `scroll-margin-top` matching the sticky header's height so a clicked anchor never lands under it.

### Interactive (client) primitives
- **`Reveal`** — fades/lifts children into view once, on `IntersectionObserver`; fails open (content simply renders) under reduced motion, a missing observer, or disabled JS — never fails closed.
- **`ThemeToggle`** — a three-state `system → light → dark` cycle (not a binary switch, so a visitor can return to following the OS), persisted via `lib/theme.ts`; current state rides in the accessible name rather than `aria-pressed`, which ARIA defines as binary.

### Figures — `components/figures/`
One bespoke inline SVG (or, for the one page where a diagram would be meaningless, a plain typographic index — see `LegalStructureFigure`) per page, drawn from content already on that page. No photography, no invented specificity: a figure never shows a number, count, duration or measurement that isn't already real page copy. Decorative figures are `aria-hidden="true"`; the rare figure that is the page's only rendering of some content (e.g. `ProductionFlowFigure`) is not. Figures theme automatically via `currentColor` or the semantic aliases in §2.2.

### Global chrome
- **`Header`** (`components/Header.tsx`) — sticky, frosted/blurred background that gains elevation past ~8px of scroll; single nav list that reflows between a horizontal bar (`lg`+) and a slide-in drawer (below `lg`) — never both in the DOM at once; `ThemeToggle`; CTA link styled distinctly from the rest of the nav.
- **`Footer`** (`components/Footer.tsx`) — responsive multi-column link grid plus a bottom bar (copyright), full-bleed container matching the header's width (§2.5), not the old fixed 1120px wrap.
- **`ContactForm`** (`components/ContactForm.tsx`) — the one form on the site; preview-only submit behaviour (reveals a `Note` on submit, no real endpoint yet).

### States & accessibility
- `:focus-visible` — accent outline, offset, everywhere (`app/globals.css` base layer).
- The drawer toggle exposes `aria-expanded`/`aria-controls`; current nav item uses `aria-current="page"`; decorative SVG is `aria-hidden`.
- All motion is gated by `prefers-reduced-motion: reduce`, checked in both CSS and JavaScript (§2.6).
- Semantic colour aliases (§2.2) are the mechanism that keeps text-on-surface contrast correct in both themes — re-verify if a token's underlying ramp step changes.

---

## 4. Information architecture

Hash-routed single file. Each page is an `<article class="page" data-page="…" data-doc="WEB-nnn">`; only one is visible at a time.

| Route | Doc | Purpose |
|---|---|---|
| `#home` | WEB-001 | Hero, certifications, 5 device families, engineering disciplines, concept→build flow, stats, quote, CTA |
| `#services` | WEB-010 | Six service areas (design, regulatory, testing, manufacturing, supply chain, post-market) |
| `#engineering` | WEB-015 | Six disciplines: mechanical, PCB, firmware, apps, wearables, test equipment |
| `#expertise` | WEB-020 | Device-family table: challenges and standards; clinical vs home-use |
| `#process` | WEB-030 | Six gated phases with durations and deliverables |
| `#quality` | WEB-040 | Certifications, regulatory experience by market, who holds clearance |
| `#facilities` | WEB-050 | Facility facts and in-house equipment |
| `#manufacturing` | WEB-055 | Design transfer, 10-step production flow, quality controls, scaling |
| `#engagement` | WEB-060 | Models A–D, IP position |
| `#cases` | WEB-070 | Case-study templates |
| `#about` | WEB-080 | Story, leadership |
| `#insights` | WEB-090 | Suggested article topics |
| `#contact` | WEB-100 | RFQ form, contact details |
| `#careers` | WEB-110 | Open roles |
| `#legal` | WEB-120 | Privacy, terms, cookies, accessibility |

**Primary nav:** Services · Engineering · Manufacturing · Device Expertise · Process · Quality & Regulatory · About · **Start a Project** (CTA). Other pages are reached via the footer and in-page links.

**Standard page recipe:** intro section (eyebrow + h1 + lead, optional `.jump` nav) → content sections (grid, table, steps or cap) → optional split CTA (`h2` + paragraph | primary + ghost buttons) → auto-appended title block.

---

## 5. Behaviour (inline JS)

- `show()` reads `location.hash`, unhides the matching page (default `home`), sets `aria-current`, closes the mobile menu, and scrolls to top.
- Title blocks are generated per page from `data-doc` and the H1.
- `[data-jump]` links smooth-scroll to an in-page section id instead of navigating.
- Re-clicking the current hash re-runs `show()`.
- Menu button toggles `.open` on the nav and syncs `aria-expanded`.
- Form submit is intercepted and only reveals the preview note.

---

## 6. Content & voice

- Plain, specific, engineer-to-engineer. Name standards (IEC 60601-1, IEC 62304, ISO 14971, ISO 10993, IEC 62366-1, IEC 81001-5-1, IEC 80601-2-35) and markets rather than adjectives.
- Every service ends in a **deliverable** (gate deliverables, "You receive" chips).
- Make regulatory roles explicit: the client is normally the legal manufacturer and holds clearance.
- Headline pattern: short claim, e.g. "Five device families. Nothing else."
- Scope is five device families (spinal traction, knee traction/rehab, pneumatic compression, massage/mechanical compression, thermal therapy) plus connected/wearable variants.
- Placeholder convention: wrap in `<span class="ph">[…]</span>`. A site-wide legend explains it. **All placeholders must be replaced before launch** (company name, stats, quote, durations, certificate details, contact data, facility facts, tooling names, legal copy).

---

## 7. Implementation notes & open items

- Single HTML file, no build step; no images (SVG icons are inline).
- Title block status text ("Rev A · Draft", "Content placeholders") should be changed or removed at launch.
- `#careers` and `#legal` anchors are linked from `About` and the footer; both pages exist.
- The home hero's animated SVG figure styles exist but no markup uses them; either add the figure or delete the dead CSS.
- Form needs a real endpoint (email/CRM), validation messaging, and spam protection; privacy copy must satisfy GDPR before collecting data.
- Add a consent-aware cookie banner before any non-essential cookies/analytics (EU audience).
- Hash routing means one `<title>` for all pages and no per-page SEO; for production consider real routes or per-route `document.title` and meta descriptions.
- Replace stock-free visuals with real facility, lab and product photography when available (the Facilities page asks for this explicitly).
