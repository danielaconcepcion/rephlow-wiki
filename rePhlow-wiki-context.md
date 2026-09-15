# rePhlow Wiki — Shared Project Context

Persistent context for any Claude conversation working on this repository. **Use the appropriate source of truth for each type of information.** The current
repository is the source of truth for implementation and current UI behaviour.
Supplied source documents are the source of truth for scientific, editorial and
content-specific information. This file captures stable project-wide context and
design decisions. If these sources disagree, flag the discrepancy.

## Project overview

**rePhlow** is Team **Madrid-UCM**'s project for **iGEM 2026**. iGEM
(International Genetically Engineered Machine competition) is an annual
synthetic-biology competition in which student teams design, build and
document an engineered biological system, then present the work on a public
team wiki that is judged alongside the lab work itself — the wiki is a formal
deliverable, not just documentation.

**The problem rePhlow addresses:** phosphorus is essential to life but is
poorly managed industrially. Nitrogen- and phosphorus-rich runoff from
agriculture, urban sewage and industrial wastewater (e.g. vegetable-oil/
biodiesel degumming effluent) drives **eutrophication** — algal blooms that
collapse aquatic ecosystems (Mar Menor is the team's local reference case).
Conventional phosphorus-removal strategies are primarily designed around
meeting discharge limits rather than explicitly closing the phosphorus cycle.
rePhlow focuses on coupling phosphorus removal with recovery and subsequent
revalorisation.

**rePhlow's approach**, expressed as five project blocks (see below): capture
phosphorus from industrial effluent using engineered bacteria, protect that
biology with an alginate encapsulation system, extend removal capacity with
immobilised enzymes acting on phospholipids/phytate the bacteria alone can't
reach, package all of it in a purpose-built reactor (Hardware), and convert
the recovered phosphorus into something valuable rather than treating removal
as the end point (Revalorisation) — closing the loop instead of just "removal
tech."

**This repository** is the team's wiki: a React SPA (not the six-separate-HTML
-page structure iGEM's default template implies) that must build/deploy via
GitLab CI to `static.igem.wiki`. Stack: **React 19 + TypeScript + Vite**,
routing via **react-router-dom v7**. No CSS-in-JS, no Tailwind, no component
library beyond Bootstrap (present in `package.json` but not the dominant
styling approach) — plain, hand-written CSS files, one per component/page,
co-located with their `.tsx`. Fonts (Space Grotesk, Inter) are bundled locally
via `@fontsource/*`, not loaded from Google Fonts, because iGEM's own rules
require everything the wiki loads to be self-hosted/on iGEM infrastructure —
this also applies to images (`public/assets`, meant to migrate to
`static.igem.wiki` via iGEM's uploads tool — see `src/utils/asset.ts`'s
migration note) and video (must embed from iGEM's own video host).

**Page architecture** is data-driven: `src/pages.ts` exports one `Page[]`
array (`title`, `lead`, `path`, `component`, plus flags like `hideHeader`,
`hideEyebrow`, `compactHero`) that both `App.tsx`'s router and the navbar walk.
Every page renders inside `App.tsx`; unless `hideHeader` is set, `App.tsx`
wraps the page's own content in the shared `<Header>` (page-shell → page-hero:
title + lede, optionally an "under construction" eyebrow). `Home`, `Team`,
`Medals` and `HumanPractices` set `hideHeader` and build fully bespoke hero
markup instead. Most simple pages live as one file directly in
`src/contents/*.tsx`; richer pages get their own subfolder with co-located
data/CSS/sub-components (`Engineering/`, `Experiments/`, `HumanPractices/`,
`Model/`, `Team/`, `Results/`).

## General design direction

- - **Editorial and scientific in overall character.** Most pages currently lean
  toward a well-typeset scientific-report style, with long-form prose, clear
  hierarchy, figures and restrained navigation. 
  The wiki should feel cohesive and intentional rather than generic or
  template-driven. Existing page patterns are useful references, but they are
  not hard constraints: new interaction or navigation patterns can be
  introduced when they clearly improve the experience and still fit the
  overall visual language.
- **Deliberately avoided:** colour-coded left-border card stripes; decorative
  uppercase "eyebrow" styling applied to real content headings.

## Visual system

Real values and class/token names as they exist in the repo today (mainly
`src/containers/App/App.css`, the global stylesheet almost every page pulls
tokens from).

**Fonts & typography**
The wiki uses Space Grotesk for display typography and Inter for body text.
- Display font `--font-display: 'Space Grotesk', 'Segoe UI', sans-serif`
  (headings, titles, big numerals); body font `--font-body: 'Inter', 'Segoe UI',
  sans-serif`. Both self-hosted via `@fontsource`.

**Layout: widths & gutters**
Most long-form content uses a centred prose column of roughly 790px, with wider layouts reserved for interactive or data-heavy components. Page gutters are generally around 20–24px.
- Prose column: **790px** max-width, centered.
- Wider content (card grids, footer, medals panels, the DBTL spiral, the
  `page-with-section-nav` grid): **1080–1360px** depending on component
  (`.card-grid` 1080px, `.medals-panel`/`.vsi-wrap` 1120px, `.dbtl-cycle`
  1120px → 1360px above 1500px viewports, `.page-with-section-nav` 1360px).
- Most standard content sections use consistent vertical spacing and ~20px horizontal gutters. 
  The standard simple-content-page wrapper padding is **`padding: 6vh 20px
  10vh`** — reused as-is by `.content-page`, `.lab-folders`, `.medals-panels`,
  `.pd-content-wrap`. 
- Page-hero spacing clears the fixed navbar and preserves generous breathing room.
  The `compactHero` variant used by Engineering and Experiments is tuned so that
  the page title, subtitle and full `EcosystemMap` form a balanced initial viewport.
  Exact padding values should be read from the current CSS rather than treated as
  persistent design rules.

**Colour & CSS variables** (`:root` in `App.css`)
- Neutrals: `--ink (#1B2340)`, `--ink-soft (#4A5170)`, `--paper (#FFFFFF)`,
  `--paper-soft (#F7FAFB)`, `--line (rgba(27,35,64,0.08))` — the default
  hairline used almost everywhere.
- `--radius-lg: 28px` (cards, panels), `--radius-md: 18px` (dropdowns,
  smaller cards). Pills/capsules/glass spheres use a literal `999px` rather
  than a variable.
- `--shadow-soft: 0 12px 40px rgba(27,35,64,.08)` for floating chrome
  (navbar, its dropdown, the footer panel); `--shadow-card: 0 8px 24px
  rgba(27,35,64,.06)` for resting cards.


**Semantic block colours** — each main project block has a stable visual identity
used consistently across the wiki:

- Bacterial / alginate encapsulation — blue
- Enzymatic immobilisation — purple
- Genetic engineering — green
- Revalorisation — yellow
- Hardware — coral

Exact colour values and implementation tokens should be read from the current
repository, since these may be refined over time. Exact colour values may evolve, but the blocks should remain clearly distinguishable.

Order these appear in the "Our Solution" walkthrough (`ProjectDescription`):
Hardware → Bacterial encapsulation → Enzyme immobilisation → Genetic
engineering → Model → Revalorisation.


## Important design decisions already made
- **`public/assets` is a temporary dev stand-in**, not the final asset home —
  it's normally gitignored, and force-added (`git add -f`) only when an image
  is real, shipped content rather than a placeholder. The eventual home is
  `static.igem.wiki` via iGEM's uploads tool (required by iGEM's own rules;
  see README.md).
- **Image assets have a strict size constraint for the temporary wiki workflow.**
  The combined image assets uploaded to the temporary wiki should stay below
  approximately **5 MB**. Keep the original/high-quality versions outside the deployable wiki repository in `madrid-ucm-original-assets`. Inside `madrid-ucm`, use only an optimised web-ready version of each image, compressed and resized appropriately for its actual display size. Do not overwrite or discard the original asset when optimising an image.
  The repository should contain the lightweight version used by the site; the
  original-quality source should be preserved separately in
  `madrid-ucm-original-assets`.
- **Avoid redundant navigation.** Do not introduce multiple navigation systems
  that control the same hierarchy or duplicate the same function. Different
  navigation patterns may coexist when they serve distinct levels or purposes.
- **Scroll-jacking is a scoped exception**, not a pattern to generalise — it
  exists only for Engineering's DBTL narrative.

## Interaction and scroll conventions

- Hover-only behaviour is always gated behind `@media (hover: hover)` before
  being written, to avoid the classic iOS "dead first tap" problem where an
  unguarded `:hover` rule intercepts a real tap.
- Any element a secondary nav can jump to needs `scroll-margin-top:
  var(--section-nav-offset)` so it clears the fixed floating navbar.


## Editorial and terminology conventions

The wiki uses British English. Prefer British forms such as:
- optimisation, characterisation, functionalisation, immobilisation
- recognise, analyse, catalyse, authorise, specialise
- modelling, labelling, travelling, cancelled
- programme, licence, defence, artefact, aluminium, grey

Scientific disciplinary conventions may override general spelling where appropriate; for example, IUPAC prefers `sulfur`.

### Project name
Use `RePhlow` at the beginning of a sentence and `rePhlow` elsewhere.

### Capitalisation and emphasis
Avoid unnecessary Title Case and ALL CAPS. Use bold for emphasis rather than underlining or arbitrary colour changes where possible.

### Punctuation
Avoid en dashes and em dashes in normal prose. Prefer standard punctuation such as commas, parentheses and colons.

### Phosphorus terminology
Use:
- `phosphorus` for the resource, element or global phosphorus problem;
- `phosphate` for the ion and phosphate-containing chemical compounds.

### Encapsulation terminology
Alginate crosslinks; do not describe this as alginate polymerisation.

`Core-shell` is adjectival:
- core-shell capsules
- core-shell architecture

Do not use `core-shells` as a noun. Always write `core-shell` with a standard short hyphen.

### References
Keep citation formatting consistent across the wiki and use DOI information as the basis for generating references where available.