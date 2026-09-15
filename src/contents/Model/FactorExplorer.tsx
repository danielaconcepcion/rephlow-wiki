import { useEffect, useRef, useState, type ReactNode } from "react";
import { asset } from "../../utils/asset";
import "./FactorExplorer.css";

/**
 * "Factor explorer" for the Phase B sensitivity section (Model.tsx, section
 * 2.2). Framed as a six-part guided reading sequence rather than a filter
 * bar — but the tablist itself stays a quiet, editorial-index style line of
 * plain text links (see FactorExplorer.css); the "this is a sequence" cue
 * comes from the figure's prev/next arrows, its "N of 6" counter, and a
 * contextual "Previous / Next: <factor>" link at the end of each panel's
 * content. Selecting a factor swaps the whole panel
 * (title, question, figure, results, optional supplementary block), not
 * just the image. The common methodological intro (2.1) and the shared
 * conclusion + comparison table (2.3) live in Model.tsx, outside this
 * component, and never change with the selection here.
 *
 * Data-driven like LabFolders' `FolderDef.content: ReactNode` pattern
 * (src/components/LabFolders/types.ts) rather than a bespoke abstraction —
 * each panel's rich content is just JSX in the array below.
 */

type FactorGroup = "environmental" | "operational";
type FactorId =
  | "carbon"
  | "ammonium"
  | "phosphate"
  | "oxygen"
  | "atpm"
  | "ppk1";

interface FactorPanel {
  id: FactorId;
  group: FactorGroup;
  label: string;
  /** Plain-language name for prose contexts (story-nav link, aria-labels) —
   * distinct from `label`, which is a compact pill glyph like "NH₄⁺" or "Pi". */
  shortName: string;
  figureLabel: string;
  title: string;
  question: string;
  figureSrc: string;
  figureAlt: string;
  body: ReactNode;
  supplementary?: ReactNode;
}

const FACTORS: FactorPanel[] = [
  {
    id: "carbon",
    group: "environmental",
    label: "Carbon",
    shortName: "Carbon",
    figureLabel: "Figure 2a",
    title: "Carbon availability",
    question:
      "How do the carbon source and its uptake bound shape the PolyP ceiling?",
    figureSrc: asset("assets/model/phase-b-carbon.png"),
    figureAlt:
      "PolyP capacity and oxygen uptake versus maximum carbon-source uptake for five carbon sources.",
    body: (
      <>
        <p>
          We examined five carbon sources available in the Phase B model —
          glucose, acetate, glycerol, succinate and pyruvate — progressively
          increasing each source's maximum uptake.
        </p>
        <p>
          PolyP capacity increased with carbon availability for every substrate,
          but the uptake required to reach the reference ceiling differed
          substantially: glucose plateaued at approximately 6 mmol gDW⁻¹ h⁻¹,
          glycerol at 8, succinate at 10, pyruvate at 12 and acetate at 20.
          Oxygen demand rose alongside PolyP production until each source
          reached its own saturation point; beyond that, more carbon did not
          raise PolyP further because phosphate uptake — capped at the Phase B
          reference bound — took over as the binding constraint.
        </p>
        <p>
          These uptake bounds should not be read as a normalized ranking of
          substrate yields. They show where the model's exchange bounds, not the
          carbon source itself, set the attainable PolyP flux.
        </p>
      </>
    ),
  },
  {
    id: "ammonium",
    group: "environmental",
    label: "NH₄⁺",
    shortName: "Ammonium",
    figureLabel: "Figure 2b",
    title: "Nitrogen availability",
    question: "Does nitrogen limitation force the cell to accumulate PolyP?",
    figureSrc: asset("assets/model/phase-b-ammonium.png"),
    figureAlt:
      "PolyP capacity and oxygen uptake versus maximum ammonium uptake.",
    body: (
      <p>
        Below an ammonium uptake capacity of approximately 0.1 mmol gDW⁻¹ h⁻¹
        the model could not satisfy the residual-growth requirement at all. Once
        that minimum nitrogen supply was reached, maximizing PolyP gave almost
        the same capacity across the remaining ammonium range — nitrogen
        availability had little direct effect once growth was feasible.
      </p>
    ),
    supplementary: (
      <div className="factor-explorer__closer-look">
        <h4>A closer look: nitrogen-dependent allocation</h4>
        <figure className="factor-explorer__figure">
          <img
            src={asset("assets/model/phase-b-ammonium-allocation.png")}
            alt="Maximum growth rate versus ammonium availability, and the feasible PolyP range at near-maximal growth."
          />
          <figcaption>
            <strong>Figure 3.</strong> Maximum growth rate versus ammonium
            availability (left), and the minimum/maximum PolyP flux compatible
            with ≥99.9% of that maximum growth (right).
          </figcaption>
        </figure>
        <p>
          A complementary analysis held biomass at 99.9% of the maximum growth
          attainable at each ammonium level, rather than the fixed 10% floor
          used elsewhere. Maximum growth increased with nitrogen availability
          and reached a plateau of approximately 0.59 h⁻¹ at an ammonium uptake
          capacity close to 7 mmol gDW⁻¹ h⁻¹.
        </p>
        <p>
          The <em>minimum</em> PolyP flux compatible with near-maximal growth
          remained zero throughout — PolyP production was never required to
          sustain biomass formation. The <em>maximum</em> feasible PolyP flux,
          however, was close to 2 mmol gDW⁻¹ h⁻¹ under strong nitrogen
          limitation and progressively approached zero as nitrogen availability
          enabled faster growth.
        </p>
        <p>
          The model therefore predicts a nitrogen-dependent{" "}
          <strong>allocation trade-off</strong>: nitrogen limitation leaves
          metabolic capacity available for phosphate storage, but does not force
          the cell to use it. When biomass is the objective, the optimal
          solution produces essentially no PolyP. In living cells, nutrient
          stress can activate PolyP accumulation through regulatory mechanisms;
          standard FBA does not reproduce that induction automatically, since it
          optimizes the objective specified by the modeller rather than a
          complete regulatory stress response.
        </p>
      </div>
    ),
  },
  {
    id: "phosphate",
    group: "environmental",
    label: "Pi",
    shortName: "Phosphate",
    figureLabel: "Figure 2c",
    title: "Phosphate availability",
    question: "Is phosphate uptake a direct determinant of PolyP accumulation?",
    figureSrc: asset("assets/model/phase-b-phosphate.png"),
    figureAlt:
      "PolyP capacity and oxygen uptake versus maximum phosphate uptake.",
    body: (
      <p>
        Phosphate availability produced an approximately linear increase in
        PolyP capacity throughout the phosphate-limited region. At the reference
        Pi uptake capacity of 100 mmol gDW⁻¹ h⁻¹, the model reached
        approximately 2 mmol PolyP-50 gDW⁻¹ h⁻¹; raising the bound to 150
        increased the optimum to approximately 2.59. Beyond that, further
        phosphate availability gave no additional benefit because another
        component of the reference medium became limiting.
      </p>
    ),
  },
  {
    id: "oxygen",
    group: "environmental",
    label: "O₂",
    shortName: "Oxygen",
    figureLabel: "Figure 2d",
    title: "Oxygen availability",
    question: "How much respiratory capacity does PolyP accumulation require?",
    figureSrc: asset("assets/model/phase-b-oxygen.png"),
    figureAlt: "PolyP capacity and oxygen uptake versus maximum oxygen uptake.",
    body: (
      <p>
        In the absence of oxygen, the model could not simultaneously maintain
        residual growth and PolyP production. PolyP capacity increased with
        oxygen availability until an uptake capacity of approximately 30 mmol
        gDW⁻¹ h⁻¹, beyond which the optimum remained close to the same 2 mmol
        gDW⁻¹ h⁻¹ ceiling seen elsewhere. Together with the phosphate scan, this
        shows that phosphate supplies the direct material for polymer formation
        while respiration supplies the energetic capacity to sustain it — each
        is beneficial only while it remains the active limitation.
      </p>
    ),
  },
  {
    id: "atpm",
    group: "operational",
    label: "ATP maintenance",
    shortName: "ATP maintenance",
    figureLabel: "Figure 2e",
    title: "Energetic burden (ATP maintenance)",
    question:
      "Does diverting ATP away from growth compromise PolyP accumulation?",
    figureSrc: asset("assets/model/phase-b-atpm.png"),
    figureAlt:
      "PolyP capacity and oxygen uptake versus minimum ATP-maintenance demand.",
    body: (
      <>
        <p>
          The ATP-maintenance reaction (ATPM) was raised as a proxy for
          additional non-growth-associated energy demand. The reference ATPM
          demand in iJN1463 is 0.92 mmol gDW⁻¹ h⁻¹. PolyP production remained
          close to its maximum up to a demand of approximately 25; beyond that,
          oxygen and carbon use increased and PolyP capacity progressively
          declined, reaching approximately 0.13 near the highest tested demand.
        </p>
        <p>
          ATPM is used here as an energetic stress proxy. It represents ATP
          diverted towards non-growth-associated maintenance, but it is not a
          mechanistic model of low-pH stress, membrane damage or stress-response
          regulation.
        </p>
      </>
    ),
  },
  {
    id: "ppk1",
    group: "operational",
    label: "PPK1 capacity",
    shortName: "PPK1 capacity",
    figureLabel: "Figure 2f",
    title: "PPK1 capacity",
    question: "Is polyphosphate kinase capacity limiting in the model?",
    figureSrc: asset("assets/model/phase-b-ppk1.png"),
    figureAlt:
      "PolyP capacity and oxygen uptake versus PPK1 capacity, as a multiple of the reference pFBA flux.",
    body: (
      <>
        <p>
          PPK1 capacity was expressed as a multiple of the reference pFBA flux
          through <code>PPK50r</code>. PolyP production increased almost
          proportionally between zero and the reference capacity: eliminating
          PPK1 capacity abolished PolyP production, whereas 0.5× capacity
          limited the optimum to approximately half of its reference value.
          Increasing the capacity beyond 1× produced no additional benefit.
        </p>
        <p>
          PPK1 is therefore essential for PolyP synthesis in the model, but its
          reference capacity is already sufficient to reach the optimum allowed
          by the surrounding metabolic network — increasing PPK1 capacity alone
          would not improve accumulation unless another limiting condition were
          also relaxed. The capacity multipliers are modelling parameters and
          should not be interpreted as experimentally calibrated expression fold
          changes.
        </p>
      </>
    ),
  },
];

const GROUPS: { id: FactorGroup; label: string }[] = [
  { id: "environmental", label: "Environmental" },
  { id: "operational", label: "Operational" },
];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Arrowhead({ direction }: { direction: "left" | "right" }) {
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

export function FactorExplorer() {
  const [activeId, setActiveId] = useState<FactorId>("carbon");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const focusTitleOnChange = useRef(false);
  const isFirstRender = useRef(true);
  const order = FACTORS.map((f) => f.id);
  const activeIndex = order.indexOf(activeId);
  const active = FACTORS[activeIndex];
  const prevFactor = activeIndex > 0 ? FACTORS[activeIndex - 1] : null;
  const nextFactor =
    activeIndex < FACTORS.length - 1 ? FACTORS[activeIndex + 1] : null;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (focusTitleOnChange.current) {
      focusTitleOnChange.current = false;
      const el = titleRef.current;
      if (el) {
        el.focus({ preventScroll: true });
        el.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  function setActive(id: FactorId) {
    if (id === activeId) return;
    setDirection(order.indexOf(id) > activeIndex ? "forward" : "backward");
    setActiveId(id);
  }

  /** Pill click or story-nav link: this is a deliberate "go read that one"
   * action, so focus should follow to the new panel's title. */
  function goTo(id: FactorId) {
    focusTitleOnChange.current = true;
    setActive(id);
  }

  /** Arrow-key roving within the tablist keeps focus on the tab itself,
   * per the standard ARIA tabs pattern — moving focus to the title here
   * would break repeated arrow-key navigation. */
  function rovingFocusTo(id: FactorId) {
    setActive(id);
    tabRefs.current[id]?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const index = order.indexOf(activeId);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      rovingFocusTo(order[(index + 1) % order.length]);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      rovingFocusTo(order[(index - 1 + order.length) % order.length]);
    } else if (event.key === "Home") {
      event.preventDefault();
      rovingFocusTo(order[0]);
    } else if (event.key === "End") {
      event.preventDefault();
      rovingFocusTo(order[order.length - 1]);
    }
  }

  return (
    <div className="factor-explorer">
      <div className="factor-explorer__frame">
        <div
          className="factor-explorer__tablist"
          role="tablist"
          aria-label="Select a sensitivity factor"
          onKeyDown={handleKeyDown}
        >
          {GROUPS.map((group) => (
            <div className="factor-explorer__group" key={group.id}>
              <span className="factor-explorer__group-label">
                {group.label}
              </span>
              <div className="factor-explorer__group-tabs">
                {FACTORS.filter((f) => f.group === group.id).map((factor) => (
                  <button
                    key={factor.id}
                    ref={(el) => {
                      tabRefs.current[factor.id] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`factor-tab-${factor.id}`}
                    aria-selected={factor.id === activeId}
                    aria-controls={`factor-panel-${factor.id}`}
                    tabIndex={factor.id === activeId ? 0 : -1}
                    className={`factor-explorer__tab${factor.id === activeId ? " is-active" : ""}`}
                    onClick={() => goTo(factor.id)}
                  >
                    {factor.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          key={active.id}
          className="factor-explorer__panel"
          data-direction={direction}
          role="tabpanel"
          id={`factor-panel-${active.id}`}
          aria-labelledby={`factor-tab-${active.id}`}
          tabIndex={0}
        >
          <h4 ref={titleRef} tabIndex={-1} className="factor-explorer__title">
            {active.title}
          </h4>
          <p className="factor-explorer__question">{active.question}</p>

          <figure className="factor-explorer__figure">
            <div className="factor-explorer__figure-nav">
              <button
                type="button"
                className="factor-explorer__arrow factor-explorer__arrow--prev"
                disabled={!prevFactor}
                aria-label={
                  prevFactor
                    ? `Previous analysis: ${prevFactor.title}`
                    : "No previous analysis"
                }
                onClick={() => prevFactor && goTo(prevFactor.id)}
              >
                <Arrowhead direction="left" />
              </button>

              <div className="factor-explorer__image-wrap">
                <img src={active.figureSrc} alt={active.figureAlt} />
                <span className="factor-explorer__counter">
                  {activeIndex + 1} of {FACTORS.length}
                </span>
              </div>

              <button
                type="button"
                className="factor-explorer__arrow factor-explorer__arrow--next"
                disabled={!nextFactor}
                aria-label={
                  nextFactor
                    ? `Next analysis: ${nextFactor.title}`
                    : "No next analysis"
                }
                onClick={() => nextFactor && goTo(nextFactor.id)}
              >
                <Arrowhead direction="right" />
              </button>
            </div>
            <figcaption>
              <strong>{active.figureLabel}.</strong> PolyP capacity (left) and
              respiratory demand (right) under this scan.
            </figcaption>
          </figure>

          <div className="factor-explorer__body">{active.body}</div>

          {active.supplementary}

          <div className="factor-explorer__story-nav">
            <div className="factor-explorer__story-nav-slot factor-explorer__story-nav-slot--prev">
              {prevFactor && (
                <button
                  type="button"
                  className="factor-explorer__story-link"
                  onClick={() => goTo(prevFactor.id)}
                >
                  <span aria-hidden="true">←</span> Previous analysis
                </button>
              )}
            </div>
            <div className="factor-explorer__story-nav-slot factor-explorer__story-nav-slot--next">
              {nextFactor && (
                <button
                  type="button"
                  className="factor-explorer__story-link"
                  onClick={() => goTo(nextFactor.id)}
                >
                  Next: {nextFactor.shortName} <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
