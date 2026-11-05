# TRONIOUS UI/UX consistency audit

Date: 2026-11-05
Branch: `feat/modern-ui-experience`
Scope: all 15 public routes, global navigation/footer, design primitives, motion and visual QA

## Design direction

The right visual territory is **premium medical technology with industrial credibility**: precise, calm and technically sophisticated. It should not look like a generic SaaS template, a hospital website or a futuristic concept UI. The system uses deep navy technical surfaces, restrained cyan signals, editorial typography, real product-development detail and motion that explains hierarchy.

Consistency does not mean every page uses the same grid. It means the same spacing, type, interaction and material rules are used while the composition changes to suit the content.

## System-level findings

| Area | Inconsistency | UX effect | Resolution |
| --- | --- | --- | --- |
| Page heroes | Every internal page used the same flat band and text-only heading, while Home used a separate bespoke composition. | Internal pages felt like documents rather than parts of the same premium brand. | All documented first sections now become a shared cinematic page-hero treatment. Manufacturing and Facilities use the shared media-panel pattern. |
| Section composition | Many pages repeated `SectionHead + equal cards` regardless of whether the content was a process, comparison, proof point or narrative. | Weak information hierarchy and a “generated from one HTML template” feeling. | Preserve semantic figures/tables/processes, strengthen section rhythm, and use cards only for genuinely discrete items. |
| Card language | Home family cards, capability links and generic cards used different radii, borders, shadows and hover behavior. | Interactive affordance was inconsistent. | One card material, radius, accent edge, elevation scale and interactive hover rule. Static cards remain visually stable. |
| Hero/section typography | Heading sizes were fluid but page titles, hero titles and section headings did not form a strong editorial scale. | Important messages did not dominate the page. | Page-title and Home-title scales are separated; titles use tighter line-height and measure. Eyebrows use one signal treatment. |
| Navigation | Header was functional but visually generic; there was no progress feedback on long technical pages. | The global experience did not match the sophistication of the content. | Glass navigation, compact brand device, active route treatment and subtle reading progress. |
| Motion | Reveal animations hide below-fold content until intersection. Saved full-page screenshots therefore contained large blank regions, while Playwright still passed. | Fragile visual QA and poor representation in automated captures/print-like tools. | Keep restrained reveal for browsing, but make visual QA scroll the document before capture and add explicit CSS-delivery assertions. |
| Imagery | The site relied almost entirely on line diagrams. Facilities explicitly requested photos but had none. | Low emotional impact and limited proof of tangible engineering/manufacturing work. | Add clearly labeled illustrative product-development and precision-assembly imagery. Replace with verified TRONIOUS photography when available. |
| Buttons and controls | Buttons, form controls and jump navigation used several corner and surface treatments. | Interactions felt assembled rather than designed as one system. | One tactile control radius and consistent hero navigation surface. |
| Footer | Light, document-like footer was disconnected from the dark technical heroes. | Weak close to the experience. | Deep technical footer using the hero material and signal color. |
| QA | Screenshot tests saved files without visual comparison; Axe violations were logged but did not fail. | Regressions could pass unnoticed. | Add rendering assertions now; follow up with approved screenshot baselines and blocking accessibility checks. |

## Page-by-page audit

### Home `/`

- **Sections:** hero, certification strip, device families, engineering disciplines, concept-to-production flow, stats, testimonial, closing CTA.
- **Layout issue:** the old hero combined a strong headline with a small schematic, leaving too much unused visual space; later sections repeatedly returned to evenly sized grids.
- **Element issue:** certification badges, capability links and family cards had different interaction materials. Placeholder stats and testimonial were visually prominent despite not being publishable.
- **Reusable correction:** shared `MediaPanel`, unified cards, editorial hero, button system and section eyebrow treatment. The hero image is an illustrative concept, not a company claim.

### Services `/services`

- **Sections:** page hero, six service stages, consultation CTA.
- **Layout issue:** six equal cards flatten the natural lifecycle from design to post-market.
- **Element issue:** optional “more” links made some cards appear interactive and others static without enough differentiation.
- **Recommended composition:** keep the service data but present it as a numbered lifecycle on desktop and stacked stages on mobile; reserve cards for stages with destination links.

### Engineering `/engineering`

- **Sections:** page hero, jump navigation, six engineering disciplines, converging-disciplines figure.
- **Layout issue:** long repeated discipline sections are structurally consistent but visually monotonous.
- **Element issue:** the sticky mental model is the convergence of disciplines, yet that interactive figure appears after all details.
- **Recommended composition:** introduce the convergence map near the top, then alternate technical copy and evidence panels while preserving the same discipline anatomy.

### Manufacturing `/manufacturing`

- **Sections:** media hero, design-transfer steps, production flow, quality controls, scaling table.
- **Layout issue:** the densest page opened with text only and then an eight-item plain list.
- **Element issue:** transfer steps, flow diagram, quality cards and table each used a different visual grammar.
- **Reusable correction:** shared media hero establishes tangible work; common editorial heading/card language connects the remaining formats without forcing them into one layout.

### Device expertise `/expertise`

- **Sections:** page hero, device-family comparison, home/clinical summary.
- **Layout issue:** comparison content is useful but visually reads like a specification document.
- **Element issue:** family icons are strong on Home but are not leveraged enough here for recognition.
- **Recommended composition:** use a selectable family rail or anchored chapters with the same family icon/color key; retain an accessible comparison table/list underneath.

### Process `/process`

- **Sections:** page hero, phase-gated process, responsibility map.
- **Layout issue:** phases are presented at equal weight even though timing, deliverables and decisions differ.
- **Element issue:** duration placeholders can look like factual promises.
- **Recommended composition:** use a continuous progress spine with gate moments, then expose deliverables in cards or accordions; visibly label estimated/placeholder durations.

### Quality & Regulatory `/quality`

- **Sections:** page hero, certifications table, market experience, clearance ownership.
- **Layout issue:** evidence-heavy content lacks a clear trust hierarchy.
- **Element issue:** placeholder certificate bodies/dates sit beside real standard names and can be mistaken for completed proof.
- **Recommended composition:** separate verified credentials, regulatory capabilities and explanatory guidance. Do not display certification marks until documents are verified.

### About `/about`

- **Sections:** page hero, story, leadership, careers CTA.
- **Layout issue:** placeholder biography cards occupy the page’s main visual focus, while the story is a short text block.
- **Element issue:** empty leadership content looks unfinished rather than intentionally staged.
- **Recommended composition:** lead with mission and operating principles; add verified leadership portraits and biographies later. Hide or clearly stage incomplete profiles before launch.

### Careers `/careers`

- **Sections:** page hero, open roles/contact fallback.
- **Layout issue:** a short page inherits the same large document structure as detailed capability pages.
- **Element issue:** placeholder roles have no filter, location context or application action.
- **Recommended composition:** concise culture/value panel, role cards with location/type and one clear application path. Hide the route if no approved hiring information exists.

### Case studies `/cases`

- **Sections:** page hero, three case-study cards with challenge/approach/results.
- **Layout issue:** identical cards make distinct projects feel interchangeable.
- **Element issue:** placeholder results look like missing content and weaken trust.
- **Recommended composition:** one featured case plus two supporting cases; add verified device imagery, market, scope and measurable outcome. Do not invent client names or results.

### Facilities `/facilities`

- **Sections:** media hero, facility schematic and fact table, equipment groups.
- **Layout issue:** a facilities page without photography could not establish place or production credibility.
- **Element issue:** all facility facts are placeholders, while metadata asked for real photography.
- **Reusable correction:** shared media panel provides an explicitly illustrative bridge. Replace it with a verified photo set of production, test and engineering areas before launch.

### Engagement models `/engagement`

- **Sections:** page hero, four commercial models, IP explanation.
- **Layout issue:** all engagement models have equal visual priority even though they answer different client stages.
- **Element issue:** “remove if not offered” content is visible and undermines confidence.
- **Recommended composition:** decision-oriented comparison based on client starting point, ownership and deliverables; remove unapproved models rather than annotating them publicly.

### Insights `/insights`

- **Sections:** page hero, topic/article cards.
- **Layout issue:** article cards lack strong visual taxonomy or featured content.
- **Element issue:** content previews behave like a CMS listing but the data is hardcoded.
- **Recommended composition:** featured guide, topic filters and consistent metadata; connect to a CMS only when editorial ownership is defined.

### Contact `/contact`

- **Sections:** page hero, RFQ form, contact details.
- **Layout issue:** the form is long and visually undifferentiated from ordinary content.
- **Element issue:** submission is a preview only; contact details are placeholders; there is no progress, privacy reassurance near submit or file/NDA workflow.
- **Recommended composition:** two-column form plus response/requirements panel, grouped fields, real success/error states and CRM/email integration. Do not imply a message was sent until a backend exists.

### Legal `/legal`

- **Sections:** page hero/index, privacy, terms, cookies, accessibility.
- **Layout issue:** the shared large hero is acceptable, but legal text should prioritize scanability over marketing drama.
- **Element issue:** policies are summaries, not approved legal documents.
- **Recommended composition:** persistent section index, narrower reading measure, last-updated date and jurisdiction; obtain legal review before publication.

## Reusable components requiring governance

- `Section`: owns spacing, tone and automatic page-hero semantics. Avoid route-specific padding overrides.
- `SectionHead`: owns eyebrow/title/lead hierarchy. Do not recreate headings with arbitrary classes.
- `MediaPanel`: owns imagery crop, caption, concept disclosure and motion.
- `Card`: use `interactive` only when the whole surface performs an action.
- `Button`: use primary for the single next action and ghost/secondary for supporting actions.
- `Reveal`: decorative enhancement only; content must remain understandable without it.
- `JumpNav`: use only for long pages with stable section IDs.
- `DataTable`: preserve real tabular relationships; do not replace tables with cards solely for appearance.
- Figures: keep one visual grammar for indexes, flows and maps, but do not force unrelated information into the same diagram.

## Launch dependencies

1. Replace all highlighted placeholders with approved facts or hide their sections.
2. Replace illustrative facilities imagery with verified TRONIOUS photography when available.
3. Connect the RFQ form to an email/CRM endpoint with validation, abuse protection and consent handling.
4. Approve legal copy, certificate claims and regulatory wording.
5. Establish visual-regression baselines and make accessibility violations blocking.
