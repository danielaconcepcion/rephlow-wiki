import { useState } from "react";
import { Link } from "react-router-dom";
import { PageSectionNav, type PageSection } from "../components/PageSectionNav";
import { AccordionSection } from "./HumanPractices/AccordionSection";
import { ProjectBlockLink, RelatedPageLink } from "../components/ProjectBlockLink";
import { AdjacentPageNav } from "../components/AdjacentPageNav";
import { InlineMath, DisplayMath } from "../components/Math";
import { CodeBlock } from "./ContentPatterns/CodeBlock";
import { asset } from "../utils/asset";
import "../components/OurSolutionVisualIndex/VisualIndex.css";
import "../components/LabFolders/LabFolders.css";
import "./ProjectDescription.css";
import "./Model/Model.css";
import "./Model/FactorExplorer.css";
import "./ContentPatterns/ContentPatterns.css";

const CONTENT_PATTERNS_SECTIONS: PageSection[] = [
  { id: "cp-structure", label: "Structure & navigation" },
  {
    id: "cp-text",
    label: "Text & links",
    children: [
      { id: "cp-text-emphasis", label: "Emphasis & links" },
      { id: "cp-text-dividers", label: "Dividers" },
    ],
  },
  { id: "cp-callouts", label: "Callouts" },
  {
    id: "cp-figures",
    label: "Figures & media",
    children: [
      { id: "cp-figures-full", label: "Full-width figure" },
      { id: "cp-figures-pair", label: "Two-column pairing" },
      { id: "cp-figures-droplet", label: "Droplet-framed image" },
    ],
  },
  {
    id: "cp-tables",
    label: "Tables",
    children: [
      { id: "cp-tables-standard", label: "Standard table" },
      { id: "cp-tables-wide", label: "Wide, responsive table" },
    ],
  },
  {
    id: "cp-math",
    label: "Math & science",
    children: [
      { id: "cp-math-inline", label: "Inline notation" },
      { id: "cp-math-display", label: "Display equations" },
    ],
  },
  { id: "cp-code", label: "Code" },
  { id: "cp-expandable", label: "Expandable content" },
  {
    id: "cp-cards",
    label: "Cards",
    children: [
      { id: "cp-cards-info", label: "Editorial card" },
      { id: "cp-cards-summary", label: "Section summary" },
      { id: "cp-cards-result", label: "Result / findings card" },
      { id: "cp-cards-colourful", label: "Colourful wide finding" },
      { id: "cp-cards-icons", label: "Icon-led cards" },
      { id: "cp-cards-image", label: "Image card" },
    ],
  },
  { id: "cp-references", label: "References" },
  { id: "cp-related", label: "Related & adjacent pages" },
];

/** A small, restrained nod to rePhlow's own "flow" language — traces the
 * top of a section-summary block instead of a straight rule. One shape,
 * used nowhere else, never a floating decorative icon on its own. */
function WaveMark() {
  return (
    <svg
      className="cp-summary__wave"
      viewBox="0 0 72 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 C 8 2, 14 2, 20 8 C 26 14, 32 14, 38 8 C 44 2, 50 2, 56 8 C 62 14, 68 14, 70 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A larger version of the same wave, used as a divider — an alternative
 * to the plain .cp-hr for the couple of spots that lean into the water
 * language established elsewhere on this page. */
function RippleDivider() {
  return (
    <svg
      className="cp-ripple-divider"
      width="120"
      height="16"
      viewBox="0 0 120 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 C 12 0, 22 0, 32 8 C 42 16, 52 16, 62 8 C 72 0, 82 0, 92 8 C 102 16, 112 16, 118 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A simplified PO4 motif — four oxygens around a phosphorus centre, one
 * bond dimmed to read as depth. Used as a bullet/mark, not a repeated
 * icon system. */
function PhosphateGlyph() {
  return (
    <svg
      className="cp-po4-glyph"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <line x1="12" y1="12" x2="12" y2="21" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
      <line x1="12" y1="12" x2="12" y2="3" stroke="currentColor" strokeWidth="1.6" />
      <line x1="12" y1="12" x2="20" y2="16.5" stroke="currentColor" strokeWidth="1.6" />
      <line x1="12" y1="12" x2="4" y2="16.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <circle cx="12" cy="3" r="2" fill="currentColor" opacity="0.85" />
      <circle cx="20" cy="16.5" r="2" fill="currentColor" opacity="0.85" />
      <circle cx="4" cy="16.5" r="2" fill="currentColor" opacity="0.85" />
      <circle cx="12" cy="21" r="1.6" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function FactorArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="factor-explorer__arrowhead"
      viewBox="0 0 10 16"
      aria-hidden="true"
    >
      <path
        d={direction === "left" ? "M8 2 2 8l6 6" : "M2 2l6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PLACEHOLDER_FACTORS = [
  {
    title: "Factor A",
    question: "How does [placeholder variable] shape the outcome?",
    body: "Placeholder body text. On Model, this is where the written interpretation of the scan goes — a paragraph or two, not a caption.",
  },
  {
    title: "Factor B",
    question: "What happens once [placeholder variable] becomes limiting?",
    body: "Placeholder body text for a second factor — same card, same chrome, a different question and figure.",
  },
  {
    title: "Factor C",
    question: "Does [placeholder variable] interact with the others?",
    body: "Placeholder body text for a third, illustrative factor, just to show the counter and arrows cycling through more than two.",
  },
];

/**
 * A literal reuse of Model's own FactorExplorer.tsx panel — same frame,
 * title, question, prev/next figure nav with counter, and body copy —
 * with placeholder text and a placeholder figure standing in for real
 * content/images, and three dummy factors instead of six real ones. Not
 * FactorExplorer itself (no tablist, no deep-link focus management), just
 * its panel chrome and click-through mechanic, demonstrated.
 */
function FactorExplorerDemo() {
  const [index, setIndex] = useState(0);
  const factor = PLACEHOLDER_FACTORS[index];
  const hasPrev = index > 0;
  const hasNext = index < PLACEHOLDER_FACTORS.length - 1;

  return (
    <div className="factor-explorer__frame">
      <h4 className="factor-explorer__title">{factor.title}</h4>
      <p className="factor-explorer__question">{factor.question}</p>

      <figure className="factor-explorer__figure">
        <div className="factor-explorer__figure-nav">
          <button
            type="button"
            className="factor-explorer__arrow factor-explorer__arrow--prev"
            disabled={!hasPrev}
            aria-label={hasPrev ? "Previous factor" : "No previous factor"}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            <FactorArrow direction="left" />
          </button>

          <div className="factor-explorer__image-wrap">
            <div className="cp-factor-figure-placeholder" aria-hidden="true">
              [ figure placeholder ]
            </div>
            <span className="factor-explorer__counter">
              {index + 1} of {PLACEHOLDER_FACTORS.length}
            </span>
          </div>

          <button
            type="button"
            className="factor-explorer__arrow factor-explorer__arrow--next"
            disabled={!hasNext}
            aria-label={hasNext ? "Next factor" : "No next factor"}
            onClick={() =>
              setIndex((i) => Math.min(PLACEHOLDER_FACTORS.length - 1, i + 1))
            }
          >
            <FactorArrow direction="right" />
          </button>
        </div>
        <figcaption>
          <strong>Placeholder figure.</strong> Stand-in for a real analysis
          chart.
        </figcaption>
      </figure>

      <div className="factor-explorer__body">
        <p>{factor.body}</p>
      </div>
    </div>
  );
}

/**
 * Content Patterns — an internal reference page, not judged wiki content
 * (kept out of the Navbar; see pages.ts). A working catalogue of the
 * content/layout patterns already available across the wiki, built from
 * the real components rather than mockups, so a still-mostly-empty page
 * (Hardware, Sustainability, Education & Communication, ...) has
 * something concrete to start from instead of a blank file.
 *
 * Heading tiers are tuned to read as genuinely different kinds of thing —
 * a big section title, a substantial subsection title with its own short
 * rule, and LabFolders' quiet .record-heading for a local point inside a
 * subsection — not the same heading shrunk twice. Cards are deliberately
 * NOT one shared container: an aside, a section summary, a wide
 * Model-style finding, and an image card each keep their own visual
 * language, the way they do on the pages they come from.
 */
export function ContentPatterns() {
  return (
    <>
      <main className="page-shell">
        <section className="page-hero cp-hero" id="top">
          {/* The one deliberate large use of the primary gradient (see the
              "rePhlow identity" block in ContentPatterns.css) — a low-
              opacity wash behind the hero, not repeated as a component
              background elsewhere. .cp-hero is additive to .page-hero, so
              every other page's hero is untouched. */}
          <div className="cp-hero-wash" aria-hidden="true" />
          <img
            className="cp-hero-drop"
            src={asset("assets/content-patterns/water-drop.webp")}
            alt=""
            aria-hidden="true"
          />
          <span className="cp-hero__eyebrow">
            Internal reference — not judged content
          </span>
          <h1 className="page-hero__title">Content Patterns</h1>
          <p className="page-hero__lede">
            A field guide to how this wiki is actually built: the hero, nav,
            text, tables, math, code, cards and cross-links already available
            as real components, gathered on one page. Where a pattern existed
            already, this page uses it exactly as-is; where it didn&apos;t,
            it&apos;s designed here to fit the same visual language. Use it
            as a starting point for any page that&apos;s still mostly empty.
          </p>
        </section>
      </main>

      <div className="page-with-section-nav">
        <PageSectionNav
          sections={CONTENT_PATTERNS_SECTIONS}
          ariaLabel="Jump to content pattern"
        />

        {/* .page-with-section-nav is a 2-column grid (nav + one content
            column) — everything below is wrapped in one plain block
            container so it stays that single second grid item. Without
            this wrapper, the wide §9 section sitting as a third direct
            grid child would auto-place into a new implicit row and land
            back in the narrow nav column track. */}
        <div className="cp-content-column">
        <div className="cp-content">
          {/* ---------------------------------------------------------- */}
          <section id="cp-structure" className="cp-section cp-section--first">
            <h2>1. Structure & navigation</h2>
            <p>
              You&apos;re already looking at it. This page&apos;s own hero,
              the sticky sidebar to the left (a horizontal strip on narrow
              screens), the heading hierarchy below, and the &ldquo;Back to
              top&rdquo; link at the bottom of that sidebar are all the same{" "}
              <code className="code-inline">PageSectionNav</code> component
              used on{" "}
              <Link className="vsi-wikilink" to="/project-description">
                Project Description
              </Link>{" "}
              and{" "}
              <Link className="vsi-wikilink" to="/human-practices">
                Human Practices
              </Link>
              . The sidebar already shows two levels — a section and, once
              you&apos;re inside it, its subsections — which is the same
              hierarchy the headings below use: a large section title, a
              substantial subsection title, and, inside a subsection, a
              smaller, quieter heading for one local point.
            </p>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="cp-text" className="cp-section">
            <h2>2. Text & links</h2>
            <p>
              Every subsection below follows the same shape: a lede, then
              prose, then — where useful — a smaller heading for one
              particular point within it.
            </p>

            <div id="cp-text-emphasis" className="cp-subsection">
              <h3>Emphasis & links</h3>
              <p>
                Normal paragraph text can carry <strong>bold</strong> for
                emphasis, <em>italics</em> for species names and terms of art
                (<em>Pseudomonas putida</em>, <em>ppk1</em>), and inline
                links. An external, ordinary link — say, to{" "}
                <a
                  className="vsi-wikilink"
                  href="https://2026.igem.wiki"
                  target="_blank"
                  rel="noreferrer"
                >
                  the 2026 iGEM wiki hub
                </a>{" "}
                — uses the same quiet highlighter-underline as an internal
                one to{" "}
                <Link className="vsi-wikilink" to="/model">
                  the Model page
                </Link>
                : one link style, reused everywhere via{" "}
                <code className="code-inline">.vsi-wikilink</code>, rather
                than a different colour per page.
              </p>
            </div>

            <div id="cp-text-dividers" className="cp-subsection">
              <h3>Dividers</h3>
              <p>
                A horizontal rule is a plain{" "}
                <code className="code-inline">{"<hr>"}</code> — no component
                needed. Used sparingly, with real room on both sides, it
                marks a genuine break between two content groups rather than
                sitting between two paragraphs that already belong together.
              </p>
              <hr className="cp-hr" />
              <p>
                Everywhere else on this page, the space between a section and
                the next, or between one subsection and the next, comes from
                margin alone — the same convention Project Description uses.
                One alternative exists for a page that wants to lean into
                the water language instead of a plain rule:
              </p>
              <RippleDivider />
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="cp-callouts" className="cp-section">
            <h2>3. Callouts</h2>
            <p>
              <code className="code-inline">Callout.tsx</code> already exists
              on the wiki, but by its own docstring it&apos;s an{" "}
              <em>internal drafting aid</em> — for leaving notes for the
              team, not for shipping inside real content. The pattern below
              is new: a soft-filled note that sits quietly inside the page
              rather than announcing itself as a UI component — no icon, no
              coloured edge, just a gentle wash of colour and a bold lead-in
              word, the same convention the wiki already uses for its
              blockquote-style asides.
            </p>
            <div className="cp-note cp-embed">
              <p>
                <strong>Note.</strong> Phosphorus has no gaseous phase in the
                biosphere — unlike nitrogen or carbon, once it&apos;s lost to
                sediment it doesn&apos;t cycle back on its own. That
                asymmetry is a large part of why <em>recovery</em>, not just
                removal, is the point.
              </p>
            </div>
            <div className="cp-note cp-note--warning">
              <p>
                <strong>Caution.</strong> The sample data in §5 and the
                worked example in §6 are illustrative, for demonstration
                only — not reported experimental results.
              </p>
            </div>
            <div className="cp-note cp-note--idea">
              <p>
                <strong>Worth trying.</strong> A second tint (
                <code className="code-inline">--microbe</code>) is available
                for a note that&apos;s neither a plain aside nor a warning —
                a design rationale, a &ldquo;why we chose this&rdquo;.
              </p>
            </div>

            <p>A quick reference for which is which:</p>
            <ul className="cp-drop-list cp-embed">
              <li>
                Plain note — a fact worth setting apart, no urgency.
              </li>
              <li>
                Warning — something a reader could otherwise miss and
                shouldn&apos;t.
              </li>
              <li>
                Worth trying — a design rationale or open question, not a
                fact.
              </li>
            </ul>

            <p>
              And one more register, further from the wiki&apos;s usual
              restraint — for a demo page exploring what&apos;s possible,
              not for everyday content:
            </p>
            <div className="cp-note cp-note--expressive cp-embed">
              <p>
                <strong>Worth knowing.</strong> This gradient — the same
                blue-to-green used across rePhlow&apos;s Canva identity —
                appears exactly{" "}
                <a className="cp-wave-link" href="#top">
                  once more
                </a>{" "}
                on this page, in the &ldquo;Colourful wide finding&rdquo;
                card in §9. Two big moments, not a repeated background.
              </p>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="cp-figures" className="cp-section">
            <h2>4. Figures & media</h2>
            <p>Two figure layouts cover most of what a page needs.</p>

            <div id="cp-figures-full" className="cp-subsection">
              <h3>Full-width figure</h3>
              <p>
                For a figure that needs the page&apos;s full measure — the
                same treatment Project Description uses for its own
                figures:
              </p>
              <figure className="cp-figure-full cp-embed">
                <img
                  src={asset("assets/project-description/eutrophication-illustration.webp")}
                  alt="Illustration of nutrient runoff driving eutrophication in a body of water"
                />
                <figcaption>
                  Border, soft shadow, quiet caption below.
                  <span className="cp-figure-credit">
                    Illustration: rePhlow team, 2026.
                  </span>
                </figcaption>
              </figure>
            </div>

            <div id="cp-figures-pair" className="cp-subsection">
              <h3>Text + image, two columns</h3>
              <p>
                When a short passage has one clear image to sit beside,
                rather than a full-width figure of its own:
              </p>
              <div className="cp-figure-pair cp-embed">
                <p>
                  Bacterial encapsulation keeps the engineered strain
                  physically contained inside a permeable matrix — the same
                  two-column pairing used throughout Project Description.
                </p>
                <img
                  src={asset("assets/our-solution/bacteria-encapsulada.webp")}
                  alt="Diagram of bacteria encapsulated inside an alginate bead"
                />
              </div>
            </div>

            <div id="cp-figures-droplet" className="cp-subsection">
              <h3>Droplet-framed image</h3>
              <p>
                A third layout, new for this page: the water-drop motif
                doesn&apos;t just decorate here, it sets the actual shape of
                the frame — a rotated, asymmetrically-rounded square, the
                same CSS trick behind most teardrop/leaf shapes.
              </p>
              <div className="cp-droplet-frame cp-embed">
                <img
                  src={asset("assets/content-patterns/icons/14-bacteria.svg")}
                  alt="Illustration of bacteria"
                />
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          </div>

          {/* §5 breaks out of the 790px prose measure for its wide table —
              same technique as §9 (see the comment there): a
              .cp-section--wide sibling, with .cp-measure re-narrowing just
              the intro and the standard (4-column) table. */}
          <section
            id="cp-tables"
            className="cp-section cp-section--wide cp-margin-decor-host"
          >
            {/* Molecule photography + a marginal note, stacked and
                anchored to this wide column's own right edge — outside
                the 790px prose measure, never outside the page (see
                .cp-margin-decor-host in ContentPatterns.css). Hidden below
                1050px, where there's no real gutter to sit in. */}
            <div className="cp-margin-decor">
              <img
                src={asset("assets/content-patterns/molecule-sparse.webp")}
                alt=""
                aria-hidden="true"
              />
              <span className="cp-marginalia">
                <PhosphateGlyph /> PO₄³⁻ — the anion this whole page keeps
                circling back to.
              </span>
            </div>
            <div className="cp-measure">
              <h2>5. Tables</h2>
              <p>
                Both tables below use{" "}
                <code className="code-inline">.record-table</code> — the
                exact class Experiments and Results use, borders, header
                tint, typography and all — not a page-local approximation.
              </p>

              <div id="cp-tables-standard" className="cp-subsection">
                <h3>Standard table</h3>
                <p>
                  A short parameter table, the way it appears inside an{" "}
                  <code className="code-inline">ExperimentCard</code>: bordered
                  cells, a tinted header row, and a caption printed as a small
                  italic line below the table, not a native{" "}
                  <code className="code-inline">{"<caption>"}</code>.
                </p>
                <div className="cp-lab-tokens cp-embed">
                  <div className="record-table-wrap">
                    <table className="record-table">
                      <thead>
                        <tr>
                          <th>Enzyme</th>
                          <th>
                            K<sub>M</sub> (mM)
                          </th>
                          <th>
                            k<sub>cat</sub> (s<sup>-1</sup>)
                          </th>
                          <th>Optimum pH</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Phospholipase C</td>
                          <td>0.42</td>
                          <td>18.6</td>
                          <td>7.2</td>
                        </tr>
                        <tr>
                          <td>Phytase</td>
                          <td>0.18</td>
                          <td>34.1</td>
                          <td>5.0</td>
                        </tr>
                        <tr>
                          <td>Non-specific acid phosphatase</td>
                          <td>0.65</td>
                          <td>9.4</td>
                          <td>6.5</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="record-table-caption">
                      Illustrative sample data — representative kinetic
                      parameters for phosphorus-liberating enzymes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="cp-tables-wide" className="cp-subsection">
              <div className="cp-measure">
                <h3>Wide, responsive table</h3>
                <p>
                  The same markup scrolls horizontally on narrow screens
                  instead of squeezing or breaking — no separate
                  &ldquo;wide table&rdquo; component, just a table with more
                  columns than fit, given the wider measure this subsection
                  breaks out to. This one is a genuinely useful inventory:
                  where each pattern on this page actually comes from.
                </p>
              </div>
              <div className="cp-lab-tokens cp-embed">
                <div className="record-table-wrap">
                  <table className="record-table">
                    <thead>
                      <tr>
                        <th>Pattern</th>
                        <th>Component / class</th>
                        <th>Defined in</th>
                        <th>Also used on</th>
                        <th>Status here</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Lateral nav</td>
                        <td>
                          <code className="code-inline">PageSectionNav</code>
                        </td>
                        <td>components/PageSectionNav.tsx</td>
                        <td>Project Description, Human Practices</td>
                        <td>Reused as-is</td>
                      </tr>
                      <tr>
                        <td>Inline / internal link</td>
                        <td>
                          <code className="code-inline">.vsi-wikilink</code>
                        </td>
                        <td>components/OurSolutionVisualIndex/VisualIndex.css</td>
                        <td>Project Description, Human Practices, Engineering</td>
                        <td>Reused as-is</td>
                      </tr>
                      <tr>
                        <td>Table</td>
                        <td>
                          <code className="code-inline">.record-table</code>
                        </td>
                        <td>components/LabFolders/LabFolders.css</td>
                        <td>Experiments, Results</td>
                        <td>Reused as-is</td>
                      </tr>
                      <tr>
                        <td>Expandable content</td>
                        <td>
                          <code className="code-inline">AccordionSection</code>
                        </td>
                        <td>contents/HumanPractices/AccordionSection.tsx</td>
                        <td>Human Practices (§0, §1, §4)</td>
                        <td>Reused as-is</td>
                      </tr>
                      <tr>
                        <td>Wide result / finding</td>
                        <td>
                          <code className="code-inline">.model-network__compare</code>
                        </td>
                        <td>contents/Model/Model.css</td>
                        <td>Model (§3.1)</td>
                        <td>Reused as-is</td>
                      </tr>
                      <tr>
                        <td>Related-page link</td>
                        <td>
                          <code className="code-inline">ProjectBlockLink</code>
                        </td>
                        <td>components/ProjectBlockLink.tsx</td>
                        <td>Human Practices</td>
                        <td>Generalised (see §11)</td>
                      </tr>
                      <tr>
                        <td>Previous / next</td>
                        <td>
                          <code className="code-inline">AdjacentPageNav</code>
                        </td>
                        <td>components/AdjacentPageNav.tsx</td>
                        <td>Engineering (as block-nav)</td>
                        <td>Generalised (see §11)</td>
                      </tr>
                      <tr>
                        <td>Display equation</td>
                        <td>
                          <code className="code-inline">DisplayMath</code>
                        </td>
                        <td>components/Math.tsx</td>
                        <td>— (new)</td>
                        <td>New pattern</td>
                      </tr>
                      <tr>
                        <td>Code block</td>
                        <td>
                          <code className="code-inline">CodeBlock</code>
                        </td>
                        <td>contents/ContentPatterns/CodeBlock.tsx</td>
                        <td>— (new)</td>
                        <td>New pattern</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <div className="cp-content">
          {/* ---------------------------------------------------------- */}
          <section id="cp-math" className="cp-section">
            <h2>6. Math & science</h2>
            <p>
              Simple inline notation — variables, subscripts/superscripts,
              units — stays plain HTML, the convention already used on{" "}
              <Link className="vsi-wikilink" to="/model">
                Model
              </Link>
              . A real expression gets real LaTeX, typeset with{" "}
              <a
                className="vsi-wikilink"
                href="https://katex.org"
                target="_blank"
                rel="noreferrer"
              >
                KaTeX
              </a>{" "}
              (self-hosted, no runtime request to a third-party host).
            </p>

            <div id="cp-math-inline" className="cp-subsection">
              <h3>Inline notation</h3>
              <p>
                Plain HTML for simple cases: flux variable <em>v</em>
                <sub>i</sub>, upper bound{" "}
                <em>
                  ub<sub>i</sub>
                </em>
                , a rate in mg L<sup>-1</sup> h<sup>-1</sup>. For a real
                typeset expression, an enzyme&apos;s specificity constant,{" "}
                <InlineMath tex="k_{cat}/K_M" />, sits inline exactly like
                this — a small wrapper over{" "}
                <code className="code-inline">katex.renderToString</code>.
              </p>
            </div>

            <div id="cp-math-display" className="cp-subsection">
              <h3>Display equations</h3>
              <p>
                A full expression gets its own numbered display block — the
                Monod equation governing microbial growth rate as a function
                of substrate concentration:
              </p>
              <div className="cp-embed">
                <DisplayMath
                  tex="\mu = \mu_{\max}\,\dfrac{S}{K_s + S}"
                  label="1"
                />
              </div>

              <h4 className="record-heading cp-detail-heading">
                Worked example
              </h4>
              <p>
                At a substrate concentration <InlineMath tex="S = 12.5" />{" "}
                mg/L, with <InlineMath tex="\mu_{\max} = 0.8" /> h
                <sup>-1</sup> and <InlineMath tex="K_s = 3.2" /> mg/L, the
                growth rate works out to <InlineMath tex="\mu \approx 0.60" />{" "}
                h<sup>-1</sup> — the same calculation §7&apos;s code sample
                runs.
              </p>
            </div>

            <div className="cp-summary cp-embed">
              <WaveMark />
              <p className="cp-summary__title">In short</p>
              <p>
                §6 is really two registers for the same idea: plain notation
                for a quick aside mid-sentence, and real typeset math for
                anything worth citing later — like the Monod curve §7&apos;s
                code goes on to compute. Neither is a fallback for the other;
                a page can reach for whichever the moment calls for.
              </p>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="cp-code" className="cp-section">
            <h2>7. Code</h2>
            <p>
              Inline code, like{" "}
              <code className="code-inline">monod_growth_rate()</code> below,
              uses a small monospace chip. A full snippet gets a
              syntax-highlighted block — a new pattern, styled as its own
              dark card in <code className="code-inline">--eutrophic-deep</code>{" "}
              (the darkest stop of the wiki&apos;s own water-to-algae
              palette) rather than a generic editor grey. It runs §6&apos;s
              worked example:
            </p>
            <div className="cp-embed">
              <CodeBlock
                lang="python"
                filename="growth_rate.py"
                code={`def monod_growth_rate(mu_max, S, Ks):
    # Monod kinetics: growth rate as a function of substrate concentration
    return mu_max * S / (Ks + S)

rate = monod_growth_rate(mu_max=0.8, S=12.5, Ks=3.2)
print(f"mu = {rate:.3f} h^-1")`}
              />
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="cp-expandable" className="cp-section">
            <h2>8. Expandable content</h2>
            <p>
              <code className="code-inline">AccordionSection</code> already
              powers the case-study comparisons and risk-card
              &ldquo;read more&rdquo; panels on Human Practices — reused here
              exactly as-is, uncontrolled (each one owns its own open state):
            </p>
            <div className="cp-embed">
              <AccordionSection title="Why recover phosphorus rather than just remove it?">
                <p>
                  Removal alone still leaves phosphorus concentrated in a
                  sludge or filter medium that has to go somewhere. Recovery
                  turns that same material into a usable output, closing the
                  loop instead of relocating the problem.
                </p>
              </AccordionSection>
              <AccordionSection title="Why Pseudomonas putida as a chassis?">
                <p>
                  It tolerates the variable, sometimes hostile composition of
                  real wastewater far better than a standard lab strain, and
                  its native metabolism already supports high polyphosphate
                  storage.
                </p>
              </AccordionSection>
              <AccordionSection
                title={
                  <span className="cp-accordion-icon-row">
                    <img
                      src={asset("assets/content-patterns/icons/06-dna-editing.svg")}
                      alt=""
                      aria-hidden="true"
                    />
                    Where genetic engineering fits in
                  </span>
                }
              >
                <p>
                  A denser variant for a short list of techniques, where the
                  icon genuinely helps scanning rather than decorating an
                  otherwise plain trigger — same{" "}
                  <code className="code-inline">AccordionSection</code>,
                  just a richer title node.
                </p>
              </AccordionSection>
            </div>
          </section>
        </div>

        {/* Section 9 breaks out of .cp-content's prose measure for its
            "Result / findings card" subsection (see .cp-section--wide) —
            structurally the same move as Project Description's .vsi-wrap
            and Model's own .model-network__wide: a wider sibling, with
            .cp-measure re-narrowing just the parts that need to stay
            readable prose width, rather than fighting a narrow ancestor
            with negative margins. */}
        <section id="cp-cards" className="cp-section cp-section--wide">
          <div className="cp-measure">
            <h2>9. Cards</h2>
            <p>
              Four card types, each with a clear, distinct job. They
              deliberately do <em>not</em> share one container — an aside, a
              section summary, a wide finding and an image card keep their
              own visual language, the way they do on the pages they&apos;re
              drawn from.
            </p>

            <div id="cp-cards-info" className="cp-subsection">
              <h3>Editorial card</h3>
              <p>
                A short, self-contained aside — quiet on purpose: no border,
                just a soft fill. Not the visual-index card (that belongs to
                Project Description&apos;s illustration overlay, not general
                content).
              </p>
              <div className="cp-aside cp-embed">
                <p className="cp-aside__title">Why phosphorus, specifically?</p>
                <p>
                  Phosphorus has no atmospheric phase — once lost to
                  sediment, it doesn&apos;t cycle back on its own. That
                  asymmetry, more than its toxicity, is what makes recovery
                  worth engineering for.
                </p>
                <Link
                  className="vsi-wikilink cp-aside__link"
                  to="/project-description#problem-eutrophication"
                >
                  Read the full case →
                </Link>
              </div>

              <p>
                A second, warmer register of the same idea — the
                identity&apos;s paper tone instead of the wiki&apos;s cool
                paper-soft:
              </p>
              <div className="cp-aside cp-aside--warm cp-embed">
                <p className="cp-aside__title">A note on the warm variant</p>
                <p>
                  Same component, one custom property changed. Useful where
                  a page wants to feel a little closer to rePhlow&apos;s own
                  printed materials than to the wiki&apos;s default palette.
                </p>
              </div>
            </div>

            <div id="cp-cards-summary" className="cp-subsection">
              <h3>Section summary</h3>
              <p>
                Not a metadata card — a substantial closing beat of real
                prose, in the spirit of BASIS-China&apos;s own
                model-summary blocks: written for this page, not a
                key/value panel. §6 closes with a real one; here&apos;s a
                second, summarising §5 instead, so the pattern is easy to
                compare:
              </p>
              <div className="cp-summary cp-embed">
                <WaveMark />
                <p className="cp-summary__title">In short</p>
                <p>
                  §5&apos;s two tables are the same object at different
                  widths: a handful of enzyme parameters that fit in four
                  columns, and a nine-column inventory that doesn&apos;t —
                  both drawn from the exact styling{" "}
                  <Link className="vsi-wikilink" to="/experiments">
                    Experiments
                  </Link>{" "}
                  and{" "}
                  <Link className="vsi-wikilink" to="/results">
                    Results
                  </Link>{" "}
                  already use, caption included.
                </p>
              </div>
            </div>
          </div>

          <div id="cp-cards-result" className="cp-subsection">
            <div className="cp-measure">
              <h3>Result / findings card</h3>
              <p>
                Not LabFolders&apos; <code className="code-inline">ResultCard</code>{" "}
                — the wide comparison Model uses for a finding that needs two
                conditions side by side to make its point:{" "}
                <code className="code-inline">.model-network__compare</code>,
                reused verbatim, breaking out to the width of this column
                rather than staying prose-width.
              </p>
            </div>
            <div className="model-network__wide cp-embed">
              <div className="model-network__compare">
                <div className="model-network__compare-grid">
                  <article className="model-network__compare-panel">
                    <h4>Carbon availability</h4>
                    <p className="model-network__compare-condition">
                      Five carbon sources, Phase B medium
                    </p>
                    <figure>
                      <img
                        src={asset("assets/model/phase-b-carbon.png")}
                        alt="PolyP capacity and oxygen uptake versus maximum carbon-source uptake for five carbon sources."
                      />
                      <figcaption>
                        <strong>Model, §2.1.</strong> PolyP ceiling rises with
                        carbon-source uptake, then saturates.
                      </figcaption>
                    </figure>
                    <p className="model-network__compare-reading">
                      Condensed from the real Model page: PolyP capacity
                      climbs with carbon uptake across all five sources
                      before flattening out, with the ranking between
                      sources holding for most of the range.
                    </p>
                  </article>

                  <article className="model-network__compare-panel">
                    <h4>Phosphate availability</h4>
                    <p className="model-network__compare-condition">
                      Phosphate exchange bound, Phase B medium
                    </p>
                    <figure>
                      <img
                        src={asset("assets/model/phase-b-phosphate.png")}
                        alt="PolyP capacity and oxygen uptake versus maximum phosphate uptake."
                      />
                      <figcaption>
                        <strong>Model, §2.1.</strong> PolyP ceiling rises
                        roughly linearly with phosphate uptake.
                      </figcaption>
                    </figure>
                    <p className="model-network__compare-reading">
                      Phosphate availability produced an approximately
                      linear increase in PolyP capacity throughout the
                      phosphate-limited region, unlike carbon&apos;s
                      saturating curve.
                    </p>
                  </article>
                </div>
                <p className="model-network__compare-synthesis">
                  Placed side by side, the two scans make a point neither
                  makes alone: <strong>the ceiling has more than one
                  limiting factor</strong>, and they don&apos;t behave the
                  same way. See the real analysis, with all six factors, on{" "}
                  <Link className="vsi-wikilink" to="/model">
                    Model
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="cp-measure cp-embed">
              <p>
                Model has a second wide pattern worth showing separately:{" "}
                <code className="code-inline">FactorExplorer</code>&apos;s own
                panel — a title, a question, a figure with prev/next arrows
                and a counter, and body copy, one factor at a time. Reused
                here literally (its frame, figure-nav, arrows and counter),
                with three placeholder factors and a placeholder figure
                standing in for the six real analyses on Model:
              </p>
            </div>
            <div className="cp-embed">
              <FactorExplorerDemo />
            </div>
          </div>

          <div id="cp-cards-colourful" className="cp-subsection">
            <div className="cp-measure">
              <h3>Colourful wide finding</h3>
              <p>
                An alternate to §9&apos;s Model-style comparison above — same
                wide-column idea, but built entirely from the rePhlow
                identity (the blue→green gradient, the warm paper tone) for
                a denser, more visual data page. Its own visual language,
                not merged into <code className="code-inline">.result-card</code>{" "}
                or <code className="code-inline">.model-network__compare</code>.
              </p>
            </div>
            <div className="cp-finding-wide cp-embed">
              <div className="cp-finding-wide__figure">
                <img
                  src={asset("assets/content-patterns/icons/11-environmental-water-sampling.svg")}
                  alt="Illustration of environmental water sampling"
                />
              </div>
              <div className="cp-finding-wide__body">
                <span className="cp-finding-wide__eyebrow">Field sampling</span>
                <h4>What a bottle from the field actually tells you</h4>
                <p>
                  Illustrative demo copy: a wider, more colourful card family
                  a sampling-heavy page (Human Practices&apos; Travel
                  Archive, or a future Measurements page) could reach for
                  when a finding is better served by one large image than a
                  figure-plus-caption.
                </p>
                <p>
                  <a className="cp-wave-link" href="/experiments">
                    See how real samples are logged →
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div id="cp-cards-icons" className="cp-subsection">
            <div className="cp-measure">
              <h3>Icon-led cards</h3>
              <p>
                The new scientific icon set, shown at two scales: a small
                inline tag, and a larger feature card where the icon sets
                the layout rather than sitting beside a title. Both local to
                this page — not a global icon system.
              </p>
              <div className="cp-icon-row cp-embed">
                <span className="cp-icon-tag">
                  <img
                    src={asset("assets/content-patterns/icons/02-petri-dish.svg")}
                    alt=""
                  />
                  Petri dish
                </span>
                <span className="cp-icon-tag">
                  <img
                    src={asset("assets/content-patterns/icons/03-microscope.svg")}
                    alt=""
                  />
                  Microscope
                </span>
                <span className="cp-icon-tag">
                  <img
                    src={asset("assets/content-patterns/icons/06-dna-editing.svg")}
                    alt=""
                  />
                  Genetic engineering
                </span>
              </div>
              <div className="cp-icon-feature cp-embed">
                <img
                  src={asset("assets/content-patterns/icons/07-microcentrifuge-tube.svg")}
                  alt="Illustration of a microcentrifuge tube"
                />
                <div>
                  <h4>Sample prep, at a glance</h4>
                  <p>
                    A feature-card variant for a short technical note where
                    the icon carries real information (which step, which
                    tool) rather than decorating a generic heading.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="cp-measure">
            <div id="cp-cards-image" className="cp-subsection">
              <h3>Image card</h3>
              <p>
                Image-led, no shared card frame: a bordered photo — the same
                &ldquo;photo on paper&rdquo; treatment as LabFolders&apos;{" "}
                <code className="code-inline">.record-figure-group__photo</code>
                {" "}— with a plain caption beneath.
              </p>
              <div className="cp-card-grid cp-embed">
                <div className="cp-image-card">
                  <img
                    className="cp-image-card__photo"
                    src={asset("assets/our-solution/hardware-clean.webp")}
                    alt="Hardware module illustration"
                  />
                  <p className="cp-image-card__title">Hardware</p>
                  <p className="cp-image-card__desc">
                    The reactor housing the encapsulated bacteria and
                    enzyme cartridge.
                  </p>
                </div>
                <div className="cp-image-card">
                  <img
                    className="cp-image-card__photo"
                    src={asset("assets/model-icon.png")}
                    alt="Model page icon"
                  />
                  <p className="cp-image-card__title">Model</p>
                  <p className="cp-image-card__desc">
                    Flux balance analysis and growth simulations behind the
                    design choices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="cp-content">
          {/* ---------------------------------------------------------- */}
          <section id="cp-references" className="cp-section">
            <h2>10. References</h2>
            <blockquote className="cp-quote cp-embed">
              &ldquo;Phosphorus is a finite, non-renewable resource with no
              substitute in agriculture or biology.&rdquo;
              <cite>— framing used throughout Project Description&apos;s §1</cite>
            </blockquote>
            <p>
              A citation links straight down to its numbered entry, e.g. the
              same source already used on Project Description
              <sup>
                <a href="#cp-ref-1" className="vsi-citation">
                  [1]
                </a>
              </sup>
              .
            </p>
            <ol className="pd-reference-list cp-embed">
              <li id="cp-ref-1" className="vsi-ref">
                Wagner, C. A. (2024). The basics of phosphate metabolism.{" "}
                <em>Nephrology Dialysis Transplantation, 39</em>(2), 190–201.
                DOI:{" "}
                <a
                  className="vsi-wikilink"
                  href="https://doi.org/10.1093/ndt/gfad188"
                  target="_blank"
                  rel="noreferrer"
                >
                  10.1093/ndt/gfad188
                </a>
                .
              </li>
            </ol>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="cp-related" className="cp-section">
            <h2>11. Related & adjacent pages</h2>
            <p>
              Human Practices links back to specific Project Description
              blocks with <code className="code-inline">ProjectBlockLink</code>,
              coloured in that block&apos;s own accent. It&apos;s now backed
              by a generic <code className="code-inline">RelatedPageLink</code>{" "}
              (same file, same visual identity) for linking anywhere else:
            </p>
            <p className="cp-related-row cp-embed">
              <ProjectBlockLink blockId="hardware" />
              <ProjectBlockLink blockId="encapsulation" />
              <RelatedPageLink to="/measurements" accent="var(--water-mid)">
                Measurements
              </RelatedPageLink>
            </p>
            <p>
              Engineering already steps between its six ecosystem blocks with
              a footer nav — sphere, eyebrow, label, arrow. The same visual
              identity, generalised into{" "}
              <code className="code-inline">AdjacentPageNav</code>, now works
              for real page-to-page navigation, shown below at the very
              bottom of this page.
            </p>
          </section>
        </div>
        </div>
      </div>

      <AdjacentPageNav
        prev={{ to: "/human-practices", label: "Human Practices", accent: "var(--microbe)" }}
        next={{ to: "/hardware", label: "Hardware", accent: "var(--phosphate)" }}
      />
    </>
  );
}
