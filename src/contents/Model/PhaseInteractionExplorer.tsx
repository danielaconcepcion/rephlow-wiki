import { useEffect, useRef, useState, type ReactNode } from "react";
import { asset } from "../../utils/asset";
import "./FactorExplorer.css";
import "./PhaseInteractionExplorer.css";

/**
 * "Interactions between limiting factors" (Model.tsx, section 2.3) — a
 * two-step picker over five phenotype phase planes rather than a
 * one-factor-at-a-time selector. Deliberately reuses FactorExplorer.css's
 * classes (frame/tablist/tab/panel/figure/arrow/counter/story-nav) so this
 * card reads as a continuation of 2.2, not a separate component; only the
 * picker-specific pieces (progress ticks, anchor/available/unavailable tab
 * states, placeholder/partial messages) get their own stylesheet.
 *
 * Selection behaviour mirrors the paired-factor-selector prototype exactly:
 * - 0 selected: neutral tablist, centered placeholder.
 * - 1 selected (the "anchor"): its valid partners get a dot marker, the
 *   rest dim; a "{Factor} × …" + "Available partners: …" line shows below.
 * - 2 selected: the matching phase plane opens directly. Clicking any
 *   factor while a plane is open resets to that factor as a fresh anchor
 *   (it does not toggle/stay open) — this is intentional, copied from the
 *   prototype's `selectFactor`.
 *
 * The five plane analyses are also always reachable via the small tick bar
 * (top-right of the card) and wrap circularly via the figure's side arrows
 * / the story-nav Previous-Next links, independent of the anchor picker —
 * again matching the prototype's `navigate()`/`openAnalysis()`.
 */

type FactorGroup = "environmental" | "operational";
type FactorId = "glucose" | "pi" | "o2" | "atpm" | "ppk1";

interface Factor {
  id: FactorId;
  group: FactorGroup;
  label: string;
  shortName: string;
}

const FACTORS: Factor[] = [
  { id: "glucose", group: "environmental", label: "Glucose", shortName: "Glucose" },
  { id: "pi", group: "environmental", label: "Pi", shortName: "Pi" },
  { id: "o2", group: "environmental", label: "O₂", shortName: "O₂" },
  { id: "atpm", group: "operational", label: "ATP maintenance", shortName: "ATP maintenance" },
  { id: "ppk1", group: "operational", label: "PPK1 capacity", shortName: "PPK1 capacity" },
];
const FACTORS_BY_ID = new Map(FACTORS.map((f) => [f.id, f]));

const GROUPS: { id: FactorGroup; label: string }[] = [
  { id: "environmental", label: "Environmental" },
  { id: "operational", label: "Operational" },
];

interface Comparison {
  a: FactorId;
  b: FactorId;
  title: string;
  question: string;
  figureSrc: string;
  figureAlt: string;
  figureLabel: string;
  caption: string;
  body: ReactNode;
}

const COMPARISONS: Comparison[] = [
  {
    a: "glucose",
    b: "o2",
    title: "Glucose × O₂",
    question:
      "When does respiratory capacity prevent additional glucose from supporting PolyP accumulation?",
    figureSrc: asset("assets/model/ppp-glucose-oxygen.svg"),
    figureAlt:
      "Phenotype phase plane of PolyP flux over maximum glucose uptake and maximum oxygen uptake.",
    figureLabel: "Figure 3a",
    caption: "Phenotype phase plane for glucose × O₂ availability.",
    body: (
      <>
        <p>
          This plane optimizes PolyP flux directly, without the 10% residual-
          growth floor used in 2.1–2.2, over glucose uptake from 0–20 and
          oxygen uptake from 0–30 mmol gDW⁻¹ h⁻¹. Below a glucose uptake of
          roughly 2–3 mmol gDW⁻¹ h⁻¹, PolyP stays low regardless of how much
          oxygen is available — glucose is the binding constraint throughout
          that region, and no amount of respiratory capacity compensates for
          it.
        </p>
        <p>
          The line of optimality reflects that: it climbs almost vertically
          from the origin up to roughly 25–27 mmol gDW⁻¹ h⁻¹ of oxygen
          uptake, then turns sharply and runs nearly flat out to the highest
          glucose values tested. Past that bend, more glucose uptake no
          longer raises the optimum — the model has already reached its
          respiratory ceiling, and oxygen becomes the limiting variable
          instead.
        </p>
      </>
    ),
  },
  {
    a: "pi",
    b: "glucose",
    title: "Pi × Glucose",
    question:
      "How does carbon availability determine whether additional phosphate can be converted into PolyP?",
    figureSrc: asset("assets/model/ppp-phosphate-glucose.svg"),
    figureAlt:
      "Phenotype phase plane of PolyP flux over maximum phosphate uptake and maximum glucose uptake.",
    figureLabel: "Figure 3b",
    caption: "Phenotype phase plane for Pi × glucose availability.",
    body: (
      <>
        <p>
          Unlike the other planes, here the line of optimality runs close to
          a straight diagonal across the whole tested range (phosphate 0–600,
          glucose 0–30 mmol gDW⁻¹ h⁻¹): PolyP keeps increasing only where
          both uptakes scale up together. Moving along either axis alone,
          away from that diagonal, leaves PolyP essentially flat.
        </p>
        <p>
          In other words, phosphate is not a self-sufficient driver of PolyP
          accumulation in this plane — extra phosphate only translates into
          extra PolyP if carbon uptake increases roughly in proportion.
          Neither variable saturates on its own within the tested range;
          each additional increment of phosphate has to be matched by more
          glucose to be exploited.
        </p>
      </>
    ),
  },
  {
    a: "pi",
    b: "o2",
    title: "Pi × O₂",
    question:
      "How much respiratory capacity is required to exploit increasing phosphate availability?",
    figureSrc: asset("assets/model/ppp-phosphate-oxygen.svg"),
    figureAlt:
      "Phenotype phase plane of PolyP flux over maximum phosphate uptake and maximum oxygen uptake.",
    figureLabel: "Figure 3c",
    caption: "Phenotype phase plane for Pi × O₂ availability.",
    body: (
      <>
        <p>
          Over phosphate 0–300 and oxygen 0–100 mmol gDW⁻¹ h⁻¹, the line of
          optimality rises from the origin and bends flat at an oxygen
          uptake of roughly 35–40 — noticeably higher than the ≈30 mmol
          gDW⁻¹ h⁻¹ plateau seen for oxygen alone in 2.2, since this plane
          has no residual-growth requirement diverting flux away from PolyP.
          Past a phosphate uptake of roughly 140–150, the optimum no longer
          moves with more phosphate once that oxygen level is met.
        </p>
        <p>
          This mirrors the individual-factor pattern from 2.2 — phosphate
          supplies the material for the polymer, oxygen supplies the
          respiratory capacity to assimilate it — but shows directly that
          the two thresholds are coupled: reaching the higher phosphate
          ceiling in this plane requires more oxygen than either 1-D scan
          implied on its own.
        </p>
      </>
    ),
  },
  {
    a: "pi",
    b: "ppk1",
    title: "Pi × PPK1 capacity",
    question:
      "Is PolyP capacity limited by phosphate supply or by the finite capacity assigned to PPK1?",
    figureSrc: asset("assets/model/ppp-phosphate-ppk1.svg"),
    figureAlt:
      "Phenotype phase plane of PolyP flux over maximum phosphate uptake and PPK1 capacity multiplier.",
    figureLabel: "Figure 3d",
    caption: "Phenotype phase plane for Pi × PPK1 capacity.",
    body: (
      <>
        <p>
          This plane uses the same 10% residual-growth floor as 2.1–2.2. The
          reference PPK1 capacity (1×) corresponds to a PPK50r flux of
          approximately 2.0 mmol gDW⁻¹ h⁻¹, and the line of optimality shows
          that the PPK1 multiplier required to fully exploit a given
          phosphate uptake scales almost linearly with it — reaching exactly
          1× at a phosphate uptake of 100 mmol gDW⁻¹ h⁻¹, the Phase B
          reference Pi bound used throughout this page.
        </p>
        <p>
          Beyond a phosphate uptake of roughly 130 mmol gDW⁻¹ h⁻¹, the
          required PPK1 multiplier plateaus at approximately 1.4×, and PolyP
          itself levels off at approximately 2.59 mmol gDW⁻¹ h⁻¹ — the same
          ceiling reached by phosphate alone at 150 mmol gDW⁻¹ h⁻¹ in 2.2.
          In other words, PPK1 capacity is limiting only up to the point
          where it matches available phosphate; past that point, phosphate
          supply — not PPK1 — sets the ceiling, and the reference 1× capacity
          is already sufficient for the Phase B medium as defined.
        </p>
      </>
    ),
  },
  {
    a: "atpm",
    b: "o2",
    title: "ATP maintenance × O₂",
    question:
      "Can additional respiratory capacity compensate for increasing non-growth ATP demand?",
    figureSrc: asset("assets/model/ppp-atpm-oxygen.svg"),
    figureAlt:
      "Phenotype phase plane of PolyP flux over minimum ATP-maintenance demand and maximum oxygen uptake.",
    figureLabel: "Figure 3e",
    // TODO(figure-3e): replace with the actual line-of-optimality bend and
    // maximum PolyP value once regenerate_phase_plane_figures.py's printed
    // summary for df_atpm_o2 is available.
    caption: "Phenotype phase plane for ATP maintenance × O₂ availability.",
    body: (
      <>
        <p>
          This plane uses the same 10% residual-growth floor as 2.1–2.2, and
          sweeps ATPM demand from its reference value of 0.92 mmol gDW⁻¹ h⁻¹
          up to the Phase B feasible maximum of 122. At low demand, an
          oxygen uptake of roughly 29–33 mmol gDW⁻¹ h⁻¹ is already enough to
          reach the same ≈2.0 mmol gDW⁻¹ h⁻¹ ceiling seen for oxygen alone
          in 2.2 — respiration is not yet the limiting factor.
        </p>
        <p>
          Past an ATPM demand of roughly 26–31, the line of optimality
          settles at an oxygen uptake of 37.5 and stays there for the rest
          of the range: additional oxygen — even up to the 100 mmol gDW⁻¹
          h⁻¹ tested here — no longer restores the PolyP ceiling. PolyP
          instead declines steadily with rising ATPM demand, reaching
          approximately 0.13 mmol gDW⁻¹ h⁻¹ at the highest demand tested,
          matching the ATP-maintenance scan in 2.2 exactly. Respiratory
          capacity can compensate for moderate energetic burden, but past
          that point the burden itself — not oxygen availability — is what
          limits PolyP accumulation.
        </p>
      </>
    ),
  },
];

const adjacency = new Map<FactorId, Set<FactorId>>(
  FACTORS.map((f) => [f.id, new Set<FactorId>()]),
);
COMPARISONS.forEach((c) => {
  adjacency.get(c.a)!.add(c.b);
  adjacency.get(c.b)!.add(c.a);
});

function findPairIndex(a: FactorId, b: FactorId): number {
  return COMPARISONS.findIndex(
    (c) => (c.a === a && c.b === b) || (c.a === b && c.b === a),
  );
}

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

export function PhaseInteractionExplorer() {
  const [selected, setSelected] = useState<FactorId[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">(
    "forward",
  );
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const focusTitleOnChange = useRef(false);
  const isFirstRender = useRef(true);

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
  }, [selected, current]);

  function openComparison(index: number, focusTitle: boolean) {
    setDirection(
      current === null || index > current ? "forward" : "backward",
    );
    setCurrent(index);
    setSelected([COMPARISONS[index].a, COMPARISONS[index].b]);
    focusTitleOnChange.current = focusTitle;
  }

  function selectFactor(id: FactorId) {
    if (selected.length === 0) {
      setSelected([id]);
      setCurrent(null);
    } else if (selected.length === 1) {
      if (selected[0] === id) {
        setSelected([]);
        setCurrent(null);
      } else {
        const match = findPairIndex(selected[0], id);
        if (match >= 0) {
          openComparison(match, true);
        } else {
          setSelected([id]);
          setCurrent(null);
        }
      }
    } else {
      setSelected([id]);
      setCurrent(null);
    }
  }

  function navigate(offset: number) {
    const base = current === null ? 0 : current;
    openComparison(
      (base + offset + COMPARISONS.length) % COMPARISONS.length,
      true,
    );
  }

  const anchor = selected.length === 1 ? selected[0] : null;
  const activeComparison = current !== null ? COMPARISONS[current] : null;
  const prevIndex =
    current === null
      ? null
      : (current - 1 + COMPARISONS.length) % COMPARISONS.length;
  const nextIndex =
    current === null ? null : (current + 1) % COMPARISONS.length;

  const panelKey = `${selected.join("-")}:${current ?? "none"}`;

  return (
    <div className="factor-explorer phase-explorer">
      <div className="factor-explorer__frame">
        <div className="phase-explorer__header">
          <div className="factor-explorer__tablist" aria-label="Select two factors to compare">
            {GROUPS.map((group) => (
              <div className="factor-explorer__group" key={group.id}>
                <span className="factor-explorer__group-label">
                  {group.label}
                </span>
                <div className="factor-explorer__group-tabs">
                  {FACTORS.filter((f) => f.group === group.id).map(
                    (factor) => {
                      const isCurrent = selected.includes(factor.id);
                      const isAnchor = anchor === factor.id;
                      const isAvailable =
                        anchor !== null &&
                        !isAnchor &&
                        adjacency.get(anchor)!.has(factor.id);
                      const isUnavailable =
                        anchor !== null && !isAnchor && !isAvailable;
                      const stateClass = [
                        isCurrent || isAnchor ? "is-active" : "",
                        isAvailable ? "is-available" : "",
                        isUnavailable ? "is-unavailable" : "",
                      ]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <button
                          key={factor.id}
                          type="button"
                          aria-pressed={isCurrent || isAnchor}
                          className={`factor-explorer__tab${stateClass ? ` ${stateClass}` : ""}`}
                          onClick={() => selectFactor(factor.id)}
                        >
                          {factor.label}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            ))}
          </div>

          <nav
            className="phase-explorer__progress"
            aria-label="Navigate between the five interaction analyses"
          >
            {COMPARISONS.map((comparison, index) => (
              <button
                key={comparison.title}
                type="button"
                className="phase-explorer__progress-tick"
                aria-current={current === index}
                aria-label={`Open ${comparison.title}`}
                onClick={() => openComparison(index, true)}
              />
            ))}
          </nav>
        </div>

        <div
          key={panelKey}
          className="factor-explorer__panel"
          data-direction={direction}
          role="region"
          aria-live="polite"
          aria-label="Paired-factor interaction analysis"
        >
          {selected.length === 0 && (
            <p className="phase-explorer__placeholder">
              Select a factor to explore its available pair-wise comparisons.
            </p>
          )}

          {selected.length === 1 && anchor !== null && (
            <div className="phase-explorer__partial">
              <h4 className="phase-explorer__partial-title">
                {FACTORS_BY_ID.get(anchor)!.label} × …
              </h4>
              <p className="phase-explorer__partners">
                Available partners:{" "}
                {[...adjacency.get(anchor)!]
                  .map((id) => FACTORS_BY_ID.get(id)!.shortName)
                  .join(" · ")}
              </p>
            </div>
          )}

          {selected.length === 2 && activeComparison && current !== null && (
            <>
              <h4
                ref={titleRef}
                tabIndex={-1}
                className="factor-explorer__title"
              >
                {activeComparison.title}
              </h4>
              <p className="factor-explorer__question">
                {activeComparison.question}
              </p>

              <figure className="factor-explorer__figure">
                <div className="factor-explorer__figure-nav">
                  <button
                    type="button"
                    className="factor-explorer__arrow factor-explorer__arrow--prev"
                    aria-label={`Previous analysis: ${COMPARISONS[prevIndex!].title}`}
                    onClick={() => navigate(-1)}
                  >
                    <Arrowhead direction="left" />
                  </button>

                  <div className="factor-explorer__image-wrap">
                    <img
                      src={activeComparison.figureSrc}
                      alt={activeComparison.figureAlt}
                    />
                    <span className="factor-explorer__counter">
                      {current + 1} of {COMPARISONS.length}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="factor-explorer__arrow factor-explorer__arrow--next"
                    aria-label={`Next analysis: ${COMPARISONS[nextIndex!].title}`}
                    onClick={() => navigate(1)}
                  >
                    <Arrowhead direction="right" />
                  </button>
                </div>
                <figcaption>
                  <strong>{activeComparison.figureLabel}.</strong>{" "}
                  {activeComparison.caption}
                </figcaption>
                <p className="phase-explorer__legend">
                  Hatched areas mark infeasible steady states; the white line
                  marks the line of optimality.
                </p>
              </figure>

              <div className="factor-explorer__body">
                {activeComparison.body}
              </div>

              <div className="factor-explorer__story-nav">
                <div className="factor-explorer__story-nav-slot factor-explorer__story-nav-slot--prev">
                  <button
                    type="button"
                    className="factor-explorer__story-link"
                    onClick={() => navigate(-1)}
                  >
                    <span aria-hidden="true">←</span> Previous analysis
                  </button>
                </div>
                <div className="factor-explorer__story-nav-slot factor-explorer__story-nav-slot--next">
                  <button
                    type="button"
                    className="factor-explorer__story-link"
                    onClick={() => navigate(1)}
                  >
                    Next: {COMPARISONS[nextIndex!].title}{" "}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
