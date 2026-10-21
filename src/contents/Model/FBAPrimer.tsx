import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type TouchEvent,
} from "react";
import "./FBAPrimer.css";

const FBA_IMAGE_BASE =
  "https://static.igem.wiki/teams/6124/wiki/assets/model/";

type StepMeta = {
  title: string;
  question: string;
  body: ReactNode;
  equation: ReactNode;
  image: string;
  imageAlt: string;
};

const STEPS: StepMeta[] = [
  {
    title: "Unconstrained flux space",
    question: "Where does every flux balance analysis start?",
    body: (
      <p>
        A metabolic network with <em>n</em> reactions has one flux value per
        reaction. Before any biological constraint is applied, the flux vector
        <em> v</em> can point anywhere in that <em>n</em>-dimensional space.
      </p>
    ),
    equation: <><em>v</em> ∈ ℝ<sup>n</sup></>,
    image: `${FBA_IMAGE_BASE}1-unrestricted.avif`,
    imageAlt: "Unrestricted n-dimensional flux space represented by the three flux axes v1, v2 and v3.",
  },
  {
    title: "Steady state",
    question: "What has to stay balanced?",
    body: (
      <p>
        Internal metabolite pools change far faster than growth or the external
        environment, so FBA treats the network as being at steady state: at
        every metabolite, production and consumption balance exactly. This
        single linear condition confines <em>v</em> to a subspace of the original flux space, sketched here as a plane through the origin.
      </p>
    ),
    equation: <><em>N</em><em>v</em> = 0, where <em>N</em> is the stoichiometric matrix</>,
    image: `${FBA_IMAGE_BASE}2-stationary.avif`,
    imageAlt: "Steady-state constraint N v equals zero reducing the flux space to a plane.",
  },
  {
    title: "Reaction directionality",
    question: "Which directions are thermodynamically allowed?",
    body: (
      <p>
        Not every direction inside that plane is physically realizable.
        Reactions that are irreversible under cellular conditions can only
        carry flux one way; enforcing that on the relevant reactions narrows
        the steady-state plane down to a cone.
      </p>
    ),
    equation: <><em>v</em><sub>i</sub> ≥ 0 for each irreversible reaction <em>i</em></>,
    image: `${FBA_IMAGE_BASE}3-thermodynamic.avif`,
    imageAlt: "Thermodynamic directionality constraints narrow the steady-state flux space to a cone.",
  },
  {
    title: "Capacity bounds",
    question: "How much flux can each reaction actually carry?",
    body: (
      <p>
        Every reaction also has an upper and lower bound on the flux it can
        carry. Depending on the reaction, that bound can represent nutrient
        availability in the medium, the reaction&apos;s own catalytic capacity,
        or a gene deletion enforced by fixing <em>v</em><sub>i</sub> = 0.
        Adding these bounds closes the unbounded cone into a finite, convex polyhedron: the feasible flux space.
      </p>
    ),
    equation: <>lb<sub>i</sub> ≤ <em>v</em><sub>i</sub> ≤ ub<sub>i</sub></>,
    image: `${FBA_IMAGE_BASE}4-capacity.avif`,
    imageAlt: "Lower and upper reaction-capacity bounds close the flux cone into a finite feasible polyhedron.",
  },
  {
    title: "Optimal solution",
    question: "Which flux distribution does FBA actually choose?",
    body: (
      <p>
        FBA searches the feasible polyhedron for the flux distribution that optimizes a chosen objective: growth, PolyP synthesis, or any other flux of interest. The optimum is not necessarily a single point: it
        can be an entire face or edge of the polyhedron, meaning several flux
        distributions score equally well.
      </p>
    ),
    equation: <>
      max <em>c</em><sup>T</sup><em>v</em>, &nbsp;<em>F</em><sub>opt</sub> = {"{"}<em>v</em> ∈ <em>F</em> : <em>c</em><sup>T</sup><em>v</em> = Z<sub>max</sub>{"}"}
    </>,
    image: `${FBA_IMAGE_BASE}5-optimal.avif`,
    imageAlt: "Optimal flux solution marked in red on the bounded feasible polyhedron.",
  },
];

const TOTAL_STEPS = STEPS.length;
const SWIPE_THRESHOLD = 40;

export function FBAPrimer() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_STEPS - 1, next));
    setDirection(clamped >= step ? 1 : -1);
    setStep(clamped);
  }, [step]);
  const goNext = useCallback(() => goTo(step + 1), [goTo, step]);
  const goPrev = useCallback(() => goTo(step - 1), [goTo, step]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  }, [goNext, goPrev]);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? startX;
    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) goNext();
    else goPrev();
  }, [goNext, goPrev]);

  const isLastStep = step === TOTAL_STEPS - 1;
  const meta = STEPS[step];
  const slideLabel = `Step ${step + 1} of ${TOTAL_STEPS}: ${meta.title}`;

  return (
    <div className="fba-primer">
      <div
        className="fba-primer__figure"
        tabIndex={0}
        role="group"
        aria-roledescription="slide"
        aria-label={slideLabel}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img className="fba-primer__image" src={meta.image} alt={meta.imageAlt} />
      </div>

      <div className="fba-primer__panel">
        <div key={step} className={`fba-primer__text fba-primer__text--${direction > 0 ? "fwd" : "back"}`}>
          <h4 className="fba-primer__title">{meta.title}</h4>
          <p className="fba-primer__question">{meta.question}</p>
          {meta.body}
          <div className="fba-primer__equation">{meta.equation}</div>

          {isLastStep && (
            <div className="fba-primer__pfba">
              <h5>From FBA to pFBA</h5>
              <p>
                Because many flux distributions can be equally optimal, pFBA
                (parsimonious FBA) adds a second, smaller optimization: among
                all optimal solutions, it picks the one with the smallest total flux, a proxy for minimizing overall enzyme usage. This is the
                criterion used throughout this page whenever a single flux
                distribution, rather than a range, is reported.
              </p>
              <div className="fba-primer__equation fba-primer__equation--secondary">
                min Σ|<em>v</em><sub>j</sub>| over <em>v</em> ∈ <em>F</em><sub>opt</sub>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fba-primer__nav">
        <button type="button" className="fba-primer__arrow" onClick={goPrev} disabled={step === 0} aria-label="Previous step">‹</button>
        <div className="fba-primer__dots" role="tablist" aria-label="FBA construction steps">
          {STEPS.map((stepMeta, index) => (
            <button
              key={stepMeta.title}
              type="button"
              role="tab"
              aria-selected={index === step}
              aria-label={`Step ${index + 1}: ${stepMeta.title}`}
              className={`fba-primer__dot ${index === step ? "is-active" : ""}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button type="button" className="fba-primer__arrow" onClick={goNext} disabled={isLastStep} aria-label="Next step">›</button>
      </div>
    </div>
  );
}
