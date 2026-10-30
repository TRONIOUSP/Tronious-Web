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

### 2.1 Colour (CSS custom properties on `:root`)

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#F3F5F7` | `#0E151D` | Page background, input fill |
| `--sheet` | `#FFFFFF` | `#151F2A` | Sheet/card/header surface |
| `--ink` | `#14212E` | `#E4EAF1` | Primary text |
| `--muted` | `#56657A` | `#9AA8B8` | Secondary text, labels |
| `--rule` | `#D3DAE2` | `#2A3746` | All borders and dividers |
| `--accent` | `#1F5FBF` | `#6FA3F0` | Links, primary buttons, markers |
| `--accent-ink` | `#FFFFFF` | `#0B1520` | Text on accent |
| `--tint` | `#E6EEF9` | `#1A2B40` | Hover, table header, chips, notes |
| `--soft` | `#EAF0F6` | `#111B26` | Soft section bands |
| `--ph` / `--ph-bg` | `#9A5B00` / `#FFF2DB` | `#F2B65A` / `#33260F` | Placeholder text / background |
| `--band` | `#0F2740` | `#08131E` | Dark hero / CTA band |
| `--band-fg` | `#EAF1F8` | `#EAF1F8` | Text on band |
| `--band-muted` | `#A9BCD0` | `#8FA3B8` | Secondary text on band |
| `--band-line` | `#1C3A59` | `#18293B` | Rules on band |
| `--signal` | `#4FC3E6` | `#5CCBEA` | Highlight/CTA colour on band |

**Theming:** dark values apply via `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and via explicit `:root[data-theme="dark"]`. `color-scheme: dark` is set in both dark paths. Keep both blocks in sync when editing.

### 2.2 Typography

| Role | Family (fallbacks) | Weights |
|---|---|---|
| `--display` | IBM Plex Sans Condensed, Arial Narrow, Arial, sans-serif | 500, 600, 700 |
| `--body` | IBM Plex Sans, system UI stack | 400, 500, 600 |
| `--mono` | IBM Plex Mono, ui-monospace, Menlo, Consolas | 400, 500 |

Loaded from Google Fonts (`display=swap`).

| Element | Size | Weight | Notes |
|---|---|---|---|
| Body | 16px / 1.6 | 400 | |
| `h1` | `clamp(2rem, 5vw, 3.25rem)` | 700 | letter-spacing −.01em; home hero: `clamp(2.2rem, 5.2vw, 3.6rem)` |
| `h2` | `clamp(1.5rem, 3vw, 2rem)` | 600 | |
| `h3` | 1.2rem | 600 | |
| Headings | line-height 1.15, `text-wrap: balance`, display face | | |
| `.lead` | 1.15rem | 400 | `--muted` |
| `.eyebrow` | .75rem mono, uppercase, .08em tracking | | `--muted` (accent inside cells, `--signal` in band) |
| Paragraph measure | `max-width: 65ch` | | |
| Table `th` | .75rem mono, uppercase, .06em | 500 | |
| Numbers | mono / display with `tabular-nums` | | stats, table `.num` cells |

### 2.3 Spacing, radius, layout

- Container `.wrap`: max-width **1120px**, side padding `max(16px, env(safe-area-inset-*))`.
- Sheet section padding: `clamp(20px, 4vw, 48px)`; section grid gap 20px.
- Common gaps: 4 / 8 / 10 / 12 / 14 / 16 / 18 / 20 / 24 / 32px.
- Radius: **2px** (sheet, badges, chips), **3px** (inputs), **4px** (buttons, nav links), **50%** (logo mark, flow dots).
- Borders: always 1px `--rule`; emphasis rule is 2px `--ink` (stats top border) or 3px `--accent` (quote, note left border).
- Hero grid texture: 32×32px lines of `--rule`.
- Shadows: none. Depth comes from borders, tint, and 2px hover lift.

### 2.4 Breakpoints

| Breakpoint | Change |
|---|---|
| ≤1100px | Header nav collapses to a "Menu" button; stacked list |
| ≤820px | `.cap` sections stack; sticky heading becomes static |
| ≤760px | `.flow` becomes a vertical timeline; `.capgrid` single column |
| ≤700px | `.stats` 4→2 columns |
| ≤600px | Title block 4→2 columns |

Most grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` (N = 190–320) rather than fixed breakpoints.

---

## 3. Components

### Global chrome
- **Header** — sticky, `--sheet` background, bottom rule. A fixed `body::before` strip fills the iOS safe-area inset. Contains brand, Menu button, nav.
- **Brand** — display 1.25rem/700 + `.mark`: 26px circle outlined in accent with two horizontal accent bars inside.
- **Nav** — inline list, links .9rem `--muted`, hover → `--tint` + `--ink`. Current page: `--accent`, 600. CTA link ("Start a Project") is a filled accent pill.
- **Footer** — 4-column auto-fit grid (brand blurb, Company, Work with us, Legal), muted links, plus a placeholder legend line.

### Sheet / page
- `.page` = white bordered article (1px rule, 2px radius). Direct `<section>` children are padded, separated by rules, `display: grid`.
- **Title block** (appended by JS): 4-cell mono strip — *Doc no.*, *Sheet* (H1 truncated to 32 chars + …), *Rev* (`A · Draft`), *Status* (`Content placeholders`). Cells separated by 1px rules; 2×2 on mobile.
- Page-in animation: 6px upward fade-slide, .25s, only when motion is allowed.

### Buttons
`.btn` — 10×18px padding, 4px radius, 600 weight, 1px accent border.
- `primary`: accent fill. `ghost`: accent text, transparent.
- On band: `hx-primary` (signal fill, band text, brightness 1.08 on hover) and `hx-ghost` (band-fg text, band-muted border → band-fg on hover).

### Hero (home) — `.hx`
Dark band section; eyebrow in signal, H1 with a `.hx-hl` span in signal, muted lead, two buttons, and a `.hx-markets` footer list (US / EU / AU regulatory markers in mono with top rule). Content width capped at 820px. Includes unused CSS for an animated SVG "inflating chambers" figure (`.hx-fig`, `.ch`, `.sv-*`, keyframes `inflate`, `readout`, `flow`) — the markup is not currently on the page.
Closing CTA reuses the same band (`.hx.hx-end`).

### Cards & grids
- `.grid` — auto-fit, min 260px, 16px gap. `.cell` — 1px border, 18px padding, grid with 8px gap, optional accent eyebrow and `.more` link.
- `.fam` / `.fam-card` — device-family tiles (min 190px) with a 44px line icon (2px accent stroke, round caps), h3, muted description. Hover: accent border + 2px lift.
- `.capgrid` — 3-column joined-border grid of linked capabilities (bold display title + muted descriptor); hover → `--tint`.
- `.case` — case-study card: header, challenge/approach body, and a 3-cell `dl` metric strip (mono uppercase `dt`, display 1.3rem `dd`).

### Badges, chips, ticks
- `.badge` — mono .78rem, 1px `--ink` border, 2px radius (certifications).
- `.chips span` — .82rem on `--tint`, 2px radius (deliverables).
- `ul.ticks` — bulleted list with accent markers, 4px gap.
- `.jump` — in-page anchor pills (mono, 1px rule, accent on hover).

### Process visuals
- `.flow` — 5-step horizontal timeline: 2px rule, 14px accent-ringed dot, display step name. Vertical on mobile.
- `.steps` — ordered rows with a mono marker column (64px): `G1…G6` gate labels by default; `.steps.num` uses `01, 02…`. Rows separated by top rule. Supporting classes: `.dur` (mono accent duration), `.deliv` (mono muted gate deliverables).
- `.pflow` — auto-fit boxed steps (min 200px) with mono `01 →` prefix, used for the 10-step production flow.

### Capability sections — `.cap`
Two-column (1fr / 1.6fr). Left `.cap-h` is sticky (top 90px) on desktop: eyebrow, h2, muted summary. Right `.cap-b`: mono uppercase h3 labels ("What we do", "You receive"), tick list, chips. `scroll-margin-top: 90px` for anchored jumps.

### Data & statements
- **Table** — wrapped in `.tablewrap` (horizontal scroll, min-width 560px); `th` in tint with mono caps; `td.num` mono tabular.
- **Stats** — 4-up under a 2px ink rule; display numeral `clamp(1.8rem, 4vw, 2.6rem)` + muted label.
- **Quote** — 3px accent left border, display `clamp(1.2rem, 2.4vw, 1.6rem)`, footer attribution.
- **Note** — accent left border, `--tint` background, .92rem (disclaimers, deliverables, banner messages).
- **Placeholder** `.ph` — mono, `--ph` on `--ph-bg`, nowrap. Used for every unfinished fact (`[XX]`, `[Date]`, `[Company Name]`).

### Forms
Single column, max-width 720px; two-up rows via `.row2` (min 240px). Labels wrap their control (.88rem/500). Inputs: inherit font, 9×10px padding, 1px rule, 3px radius, `--paper` fill. Fieldset with checkboxes for target markets. Textarea min-height 110px, vertical resize. Submit shows `#formMsg` (note) — preview behaviour only.

### States & accessibility
- `:focus-visible`: 2px accent outline, 2px offset, everywhere.
- Nav button exposes `aria-expanded` / `aria-controls`; current page uses `aria-current="page"`; decorative SVG and logo mark are `aria-hidden`; markets list and nav carry `aria-label`.
- Motion: all animation is gated by `prefers-reduced-motion: no-preference`.
- Text colours meet contrast on their surfaces in both themes (verify again if tokens change).

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
