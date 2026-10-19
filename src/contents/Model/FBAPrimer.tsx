import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type TouchEvent,
} from "react";
import "./FBAPrimer.css";

/**
 * A single fixed coordinate system (SVG viewBox) whose feasible-region
 * shape is progressively reshaped across five conceptual stages of flux
 * balance analysis. The axes are drawn once and never removed; only the
 * shape's control points (A/B/C/D), the two boundary-ray extensions, and
 * a handful of opacities are tweened between stages, so every transition
 * is a genuine deformation of the same geometry rather than a swap
 * between five separate illustrations. Composition and visual language
 * (translucent cyan polytope, thin blue edges, dashed unbounded
 * directions, red reserved for the objective/optimum) follow the
 * five-panel reference figure directly.
 */

type Frame = {
  Ax: number;
  Ay: number;
  Bx: number;
  By: number;
  Cx: number;
  Cy: number;
  Dx: number;
  Dy: number;
  Ray1x: number;
  Ray1y: number;
  Ray2x: number;
  Ray2y: number;
  ShapeOpacity: number;
  Dash1Opacity: number;
  Dash2Opacity: number;
};

// Origin: v = 0 is feasible under every stage (steady state, directionality
// and capacity bounds all admit the zero-flux point), so it anchors every
// shape and never moves.
const ORIGIN = { x: 78, y: 268 };

const FRAMES: Frame[] = [
  // 0 — Unconstrained flux space: no shape, axes only.
  {
    Ax: 78, Ay: 268, Bx: 78, By: 268, Cx: 78, Cy: 268, Dx: 78, Dy: 268,
    Ray1x: 78, Ray1y: 268, Ray2x: 78, Ray2y: 268,
    ShapeOpacity: 0, Dash1Opacity: 0, Dash2Opacity: 0,
  },
  // 1 — Steady state: a thin plane through the origin. The far corner
  // carries a dashed hint that it keeps extending beyond the frame.
  {
    Ax: 210, Ay: 255, Bx: 330, By: 195, Cx: 150, Cy: 238, Dx: 150, Dy: 238,
    Ray1x: 210, Ray1y: 255, Ray2x: 393, Ray2y: 177,
    ShapeOpacity: 0.5, Dash1Opacity: 0, Dash2Opacity: 1,
  },
  // 2 — Reaction directionality: the plane narrows into a cone between
  // two admissible directions; the near edge retracts toward the origin.
  {
    Ax: 165, Ay: 95, Bx: 345, By: 160, Cx: 90, Cy: 265, Dx: 90, Dy: 265,
    Ray1x: 195, Ray1y: 34, Ray2x: 398, Ray2y: 138,
    ShapeOpacity: 0.5, Dash1Opacity: 1, Dash2Opacity: 1,
  },
  // 3 — Capacity bounds: the unbounded cone is capped into a closed,
  // finite polyhedron. The boundary rays retire.
  {
    Ax: 150, Ay: 128, Bx: 305, By: 168, Cx: 338, Cy: 232, Dx: 228, Dy: 222,
    Ray1x: 195, Ray1y: 34, Ray2x: 398, Ray2y: 138,
    ShapeOpacity: 0.58, Dash1Opacity: 0, Dash2Opacity: 0,
  },
  // 4 — Optimal solution: the same polyhedron; the objective is added
  // as an overlay (see OVERLAY_FRAMES) rather than a shape change.
  {
    Ax: 150, Ay: 128, Bx: 305, By: 168, Cx: 338, Cy: 232, Dx: 228, Dy: 222,
    Ray1x: 195, Ray1y: 34, Ray2x: 398, Ray2y: 138,
    ShapeOpacity: 0.58, Dash1Opacity: 0, Dash2Opacity: 0,
  },
];

// The optimal edge A–B (the polyhedron's upper ridge) doubles as the
// "optimal face" F_opt. The pFBA point sits at a fixed position along
// that same edge, so switching views slides a point along a real edge
// of the shape instead of introducing new geometry.
const OPT_EDGE_START = { x: FRAMES[3].Ax, y: FRAMES[3].Ay };
const OPT_EDGE_END = { x: FRAMES[3].Bx, y: FRAMES[3].By };
const PFBA_T = 0.7;
const PFBA_POINT = {
  x: OPT_EDGE_START.x + PFBA_T * (OPT_EDGE_END.x - OPT_EDGE_START.x),
  y: OPT_EDGE_START.y + PFBA_T * (OPT_EDGE_END.y - OPT_EDGE_START.y),
};

type OverlayFrame = {
  EdgeOpacity: number;
  PointOpacity: number;
  DropOpacity: number;
};

const OVERLAY_FRAMES: Record<"face" | "point", OverlayFrame> = {
  face: { EdgeOpacity: 1, PointOpacity: 0, DropOpacity: 0 },
  point: { EdgeOpacity: 0, PointOpacity: 1, DropOpacity: 1 },
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function lerpRecord<T extends Record<string, number>>(
  from: T,
  to: T,
  t: number,
): T {
  const out = {} as T;
  for (const key of Object.keys(to) as Array<keyof T>) {
    out[key] = (from[key] + (to[key] - from[key]) * t) as T[keyof T];
  }
  return out;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

function useTweened<T extends Record<string, number>>(
  target: T,
  durationMs: number,
): T {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    const from = fromRef.current;
    const start = performance.now();

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    function tick(now: number) {
      const t = Math.min(1, (now - start) / durationMs);
      setValue(lerpRecord(from, target, easeOutCubic(t)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
        rafRef.current = null;
      }
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs]);

  return value;
}

type StepMeta = {
  title: string;
  question: string;
  body: ReactNode;
  equation: ReactNode;
};

const STEPS: StepMeta[] = [
  {
    title: "Unconstrained flux space",
    question: "Where does every flux balance analysis start?",
    body: (
      <p>
        A metabolic network with <em>n</em> reactions has one flux value per
        reaction. Before any biological constraint is applied, the flux
        vector <em>v</em> can point anywhere in that <em>n</em>-dimensional
        space.
      </p>
    ),
    equation: (
      <>
        <em>v</em> ∈ ℝ<sup>n</sup>
      </>
    ),
  },
  {
    title: "Steady state",
    question: "What has to stay balanced?",
    body: (
      <p>
        Internal metabolite pools change far faster than growth or the
        external environment, so FBA treats the network as being at steady
        state: at every metabolite, production and consumption balance
        exactly. This single linear condition confines <em>v</em> to a
        subspace of the original flux space — sketched here as a plane
        through the origin.
      </p>
    ),
    equation: (
      <>
        <em>N</em>
        <em>v</em> = 0, where <em>N</em> is the stoichiometric matrix
      </>
    ),
  },
  {
    title: "Reaction directionality",
    question: "Which directions are thermodynamically allowed?",
    body: (
      <p>
        Not every direction inside that plane is physically realizable.
        Reactions that are irreversible under cellular conditions can only
        carry flux one way; enforcing that on the relevant reactions
        narrows the steady-state plane down to a cone.
      </p>
    ),
    equation: (
      <>
        <em>v</em>
        <sub>i</sub> ≥ 0 for each irreversible reaction <em>i</em>
      </>
    ),
  },
  {
    title: "Capacity bounds",
    question: "How much flux can each reaction actually carry?",
    body: (
      <p>
        Every reaction also has an upper and lower bound on the flux it can
        carry. Depending on the reaction, that bound can represent nutrient
        availability in the medium, the reaction's own catalytic capacity,
        or a gene deletion enforced by fixing <em>v</em>
        <sub>i</sub> = 0. Adding these bounds closes the unbounded cone into
        a finite, convex polyhedron — the feasible flux space.
      </p>
    ),
    equation: (
      <>
        lb<sub>i</sub> ≤ <em>v</em>
        <sub>i</sub> ≤ ub<sub>i</sub>
      </>
    ),
  },
  {
    title: "Optimal solution",
    question: "Which flux distribution does FBA actually choose?",
    body: (
      <p>
        FBA searches the feasible polyhedron for the flux distribution that
        optimizes a chosen objective — growth, PolyP synthesis, or any other
        flux of interest. The optimum is not necessarily a single point: it
        can be an entire face or edge of the polyhedron, meaning several
        flux distributions score equally well.
      </p>
    ),
    equation: (
      <>
        max <em>c</em>
        <sup>T</sup>
        <em>v</em>, &nbsp;<em>F</em>
        <sub>opt</sub> = {"{"}<em>v</em> ∈ <em>F</em> : <em>c</em>
        <sup>T</sup>
        <em>v</em> = Z<sub>max</sub>
        {"}"}
      </>
    ),
  },
];

const PFBA_BODY = (
  <p>
    Because many flux distributions can be equally optimal, pFBA
    (parsimonious FBA) adds a second, smaller optimization: among all
    optimal solutions, it picks the one with the smallest total flux — a
    proxy for minimizing overall enzyme usage. This is the criterion used
    throughout this page whenever a single flux distribution, rather than a
    range, is reported.
  </p>
);
const PFBA_EQUATION = (
  <>
    min Σ|<em>v</em>
    <sub>j</sub>| over <em>v</em> ∈ <em>F</em>
    <sub>opt</sub>
  </>
);

const TOTAL_STEPS = STEPS.length;
const SWIPE_THRESHOLD = 40;

export function FBAPrimer() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [pfbaView, setPfbaView] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const frame = useTweened(FRAMES[step], 480);
  const overlay = useTweened(
    OVERLAY_FRAMES[pfbaView ? "point" : "face"],
    360,
  );

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(TOTAL_STEPS - 1, next));
      setDirection(clamped >= step ? 1 : -1);
      setStep(clamped);
    },
    [step],
  );

  const goNext = useCallback(() => goTo(step + 1), [goTo, step]);
  const goPrev = useCallback(() => goTo(step - 1), [goTo, step]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const startX = touchStartX.current;
      touchStartX.current = null;
      if (startX === null) return;
      const endX = event.changedTouches[0]?.clientX ?? startX;
      const delta = endX - startX;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      if (delta < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev],
  );

  const isLastStep = step === TOTAL_STEPS - 1;
  const meta = STEPS[step];
  const body = isLastStep && pfbaView ? PFBA_BODY : meta.body;
  const equation = isLastStep && pfbaView ? PFBA_EQUATION : meta.equation;

  const svgLabel = useMemo(
    () => `Step ${step + 1} of ${TOTAL_STEPS}: ${meta.title}`,
    [step, meta.title],
  );

  return (
    <div className="fba-primer">
      <div
        className="fba-primer__figure"
        tabIndex={0}
        role="group"
        aria-roledescription="slide"
        aria-label={svgLabel}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <svg
          className="fba-primer__svg"
          viewBox="0 0 440 340"
          role="img"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="fba-arrow-axis"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 Z" className="fba-primer__axis-arrow" />
            </marker>
            <marker
              id="fba-arrow-dash"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 Z" className="fba-primer__dash-arrow" />
            </marker>
          </defs>

          {/* Axes — fixed, always visible, never replaced. */}
          <g className="fba-primer__axes">
            <line
              x1={ORIGIN.x}
              y1={ORIGIN.y}
              x2={400}
              y2={ORIGIN.y}
              markerEnd="url(#fba-arrow-axis)"
            />
            <line
              x1={ORIGIN.x}
              y1={ORIGIN.y}
              x2={ORIGIN.x}
              y2={26}
              markerEnd="url(#fba-arrow-axis)"
            />
            <line
              x1={ORIGIN.x}
              y1={ORIGIN.y}
              x2={20}
              y2={322}
              markerEnd="url(#fba-arrow-axis)"
            />
            <text x={406} y={ORIGIN.y + 5} className="fba-primer__axis-label">
              v₁
            </text>
            <text x={ORIGIN.x - 6} y={18} className="fba-primer__axis-label">
              v₃
            </text>
            <text x={2} y={332} className="fba-primer__axis-label">
              v₂
            </text>
          </g>

          {/* Boundary-ray extensions (unbounded directions). */}
          <line
            className="fba-primer__dash"
            x1={frame.Ax}
            y1={frame.Ay}
            x2={frame.Ray1x}
            y2={frame.Ray1y}
            style={{ opacity: frame.Dash1Opacity }}
            markerEnd="url(#fba-arrow-dash)"
          />
          <line
            className="fba-primer__dash"
            x1={frame.Bx}
            y1={frame.By}
            x2={frame.Ray2x}
            y2={frame.Ray2y}
            style={{ opacity: frame.Dash2Opacity }}
            markerEnd="url(#fba-arrow-dash)"
          />

          {/* The feasible-region shape: one polygon, reshaped in place. */}
          <polygon
            className="fba-primer__shape"
            points={`${ORIGIN.x},${ORIGIN.y} ${frame.Ax},${frame.Ay} ${frame.Bx},${frame.By} ${frame.Cx},${frame.Cy} ${frame.Dx},${frame.Dy}`}
            style={{ opacity: frame.ShapeOpacity }}
          />
          <polygon
            className="fba-primer__shape-edge"
            points={`${ORIGIN.x},${ORIGIN.y} ${frame.Ax},${frame.Ay} ${frame.Bx},${frame.By} ${frame.Cx},${frame.Cy} ${frame.Dx},${frame.Dy}`}
            style={{ opacity: frame.ShapeOpacity }}
          />

          {/* Objective / optimal solution overlay — step 5 only. */}
          <line
            className="fba-primer__opt-edge"
            x1={OPT_EDGE_START.x}
            y1={OPT_EDGE_START.y}
            x2={OPT_EDGE_END.x}
            y2={OPT_EDGE_END.y}
            style={{ opacity: isLastStep ? overlay.EdgeOpacity : 0 }}
          />
          <line
            className="fba-primer__opt-drop"
            x1={PFBA_POINT.x}
            y1={PFBA_POINT.y}
            x2={PFBA_POINT.x}
            y2={ORIGIN.y}
            style={{ opacity: isLastStep ? overlay.DropOpacity : 0 }}
          />
          <circle
            className="fba-primer__opt-point"
            cx={PFBA_POINT.x}
            cy={PFBA_POINT.y}
            r={4.5}
            style={{ opacity: isLastStep ? overlay.PointOpacity : 0 }}
          />
        </svg>
      </div>

      <div className="fba-primer__panel">
        <div key={step} className={`fba-primer__text fba-primer__text--${direction > 0 ? "fwd" : "back"}`}>
          <h4 className="fba-primer__title">{meta.title}</h4>
          <p className="fba-primer__question">{meta.question}</p>
          {body}
          <div className="fba-primer__equation">{equation}</div>
        </div>

        {isLastStep && (
          <div className="fba-primer__toggle" role="group" aria-label="Optimal solution view">
            <button
              type="button"
              className={!pfbaView ? "is-active" : ""}
              aria-pressed={!pfbaView}
              onClick={() => setPfbaView(false)}
            >
              Optimal face
            </button>
            <span className="fba-primer__toggle-sep" aria-hidden="true">
              ·
            </span>
            <button
              type="button"
              className={pfbaView ? "is-active" : ""}
              aria-pressed={pfbaView}
              onClick={() => setPfbaView(true)}
            >
              pFBA solution
            </button>
          </div>
        )}
      </div>

      <div className="fba-primer__nav">
        <button
          type="button"
          className="fba-primer__arrow"
          onClick={goPrev}
          disabled={step === 0}
          aria-label="Previous step"
        >
          ‹
        </button>
        <div className="fba-primer__dots" role="tablist" aria-label="FBA construction steps">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === step}
              aria-label={`Step ${i + 1}: ${s.title}`}
              className={`fba-primer__dot ${i === step ? "is-active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="fba-primer__arrow"
          onClick={goNext}
          disabled={isLastStep}
          aria-label="Next step"
        >
          ›
        </button>
      </div>
    </div>
  );
}
