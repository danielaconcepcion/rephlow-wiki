import { lazy, Suspense, useRef } from "react";
import {
  PageSectionNav,
  type PageSection,
} from "../../components/PageSectionNav";
import { FactorExplorer } from "./FactorExplorer";
import { PhaseInteractionExplorer } from "./PhaseInteractionExplorer";
import { GrowthPolypSurface } from "./GrowthPolypSurface";
import { FBAPrimer } from "./FBAPrimer";
import { CoreFunnel } from "./CoreFunnel";
import { LumpedModel } from "./LumpedModel";
import { LumpingMatrix } from "./LumpingMatrix";
import { ConcentrationCourses, PhosphateFluxes } from "./Dynamics";
import { AccordionSection } from "../HumanPractices/AccordionSection";
import { DisplayMath, InlineMath } from "../../components/Math";
import { ModelBackground } from "./ModelBackground";
import { ModelWorkflow } from "./ModelWorkflow";
import { asset } from "../../utils/asset";
import "./Model.css";

// d3-force/d3-zoom/d3-selection are only worth loading on this one page, so
// they're dynamically imported here rather than pulled into the app's
// shared entry chunk via the normal top-of-file import every other page
// uses.
const MetabolicNetworkGraph = lazy(() =>
  import("./MetabolicNetworkGraph").then((mod) => ({
    default: mod.MetabolicNetworkGraph,
  })),
);

/** Citation marker for section 4's own reference list. */
function Cite({ n }: { n: number }) {
  // The leading space is part of the marker: JSX drops the newline that
  // separates it from the word before it, and "conditions[1]" reads as a
  // typo rather than a citation.
  return (
    <>
      {" "}
      <a className="model-citation" href={`#model-ref-${n}`}>
        [{n}]
      </a>
    </>
  );
}

const MODEL_SECTIONS: PageSection[] = [
  {
    id: "model-workflow",
    label: "Modelling workflow",
  },
  {
    id: "fba-primer",
    label: "How flux balance analysis works",
  },
  {
    id: "metabolic-network",
    label: "Interactive metabolic network",
    children: [
      { id: "what-the-map-represents", label: "What the map represents" },
      { id: "how-to-explore-the-map", label: "How to explore the map" },
    ],
  },
  {
    id: "phase-b-sensitivity",
    label: "Environmental and capacity sensitivity",
    children: [
      { id: "sensitivity-framework", label: "Sensitivity framework" },
      { id: "factor-explorer", label: "Factor explorer" },
      {
        id: "phase-interactions",
        label: "Interactions between limiting factors",
      },
    ],
  },
  {
    id: "growth-polyp-balance",
    label: "Balancing growth and PolyP accumulation",
    children: [
      {
        id: "growth-polyp-compatibility",
        label: "Growth–PolyP compatibility",
      },
      {
        id: "metabolic-redistribution",
        label: "Metabolic redistribution and flexibility",
      },
    ],
  },
  {
    id: "kinetic-core",
    label: "From a genome-scale model to a kinetic core",
    children: [
      { id: "active-metabolic-core", label: "The active metabolic core" },
      { id: "metabolic-flexibility", label: "Preserving flexibility" },
      {
        id: "selecting-kinetic-reactions",
        label: "Reactions required for kinetics",
      },
    ],
  },
  {
    id: "reduced-kinetic-model",
    label: "Building the reduced kinetic model",
    children: [
      { id: "lumping-modules", label: "Lumping into functional modules" },
      { id: "kinetic-equations", label: "The kinetic equations" },
      { id: "polyp-polymerisation", label: "PolyP polymerisation" },
      { id: "parameterisation", label: "Parameterisation and sources" },
    ],
  },
  {
    id: "dynamic-simulation",
    label: "Simulating phosphate uptake and PolyP accumulation",
    children: [
      { id: "time-evolution", label: "Time evolution of the system" },
      { id: "uptake-pulse", label: "A transient phosphate-uptake pulse" },
      { id: "energy-polyp", label: "Energy availability and PolyP" },
    ],
  },
];

export function Model() {
  const contentRef = useRef<HTMLElement>(null);

  return (
    <div className="model-page">
      <ModelBackground contentRef={contentRef} density="dense" />
      <div className="page-with-section-nav">
        <PageSectionNav
          sections={MODEL_SECTIONS}
          ariaLabel="Jump to model section"
        />

        <main className="model-content-wrap">
          <section
            id="model-workflow"
            className="model-network"
            ref={contentRef}
          >
            <div className="model-network__intro">
              <h2>From metabolic reconstruction to design decisions</h2>
              <p>
                Our modelling workflow links a genome-scale representation of
                <em> Pseudomonas putida</em> KT2440 to a reduced kinetic model
                of phosphate accumulation. It moves from feasible metabolic
                states and environmental constraints to network reduction,
                time-dependent simulation and sensitivity analysis, ultimately
                identifying the measurements needed for the next experimental
                iteration.
              </p>
            </div>
            <div className="model-network__wide">
              <ModelWorkflow />
            </div>
          </section>

          <section id="fba-primer" className="model-network">
            <div className="model-network__intro">
              <h2>How flux balance analysis works</h2>
              <p>
                Every analysis on this page rests on the same computational
                idea: flux balance analysis (FBA). Before presenting our own
                results, it is worth walking through what FBA actually computes
                — geometrically, not just as an optimization statement. Step
                through the five stages below to see how a handful of linear
                constraints carve a single feasible region for reaction fluxes
                out of an otherwise unconstrained space.
              </p>
            </div>

            <div className="model-network__wide">
              <FBAPrimer />
            </div>
          </section>

          <section id="metabolic-network" className="model-network">
            <div className="model-network__intro">
              <h2>1. Interactive metabolic network</h2>

              <div
                id="what-the-map-represents"
                className="model-network__subsection"
              >
                <h3>What the map represents</h3>
                <p>
                  A genome-scale metabolic model brings together the reactions
                  available to an organism and uses their stoichiometry to
                  predict how metabolites can flow through the cell. We used the
                  iJN1463 reconstruction of <em>Pseudomonas putida</em> KT2440
                  and parsimonious flux balance analysis (pFBA) to calculate
                  steady-state flux distributions under different optimization
                  priorities and environmental or genetic constraints.
                </p>
                <p>
                  The network below is therefore not a generic pathway diagram:
                  every view represents a computed metabolic state. Squares are
                  reactions and are coloured according to their annotated
                  metabolic subsystem. Circles are metabolites and use a neutral
                  colour because the same metabolite may participate in several
                  subsystems. The width of each connecting line represents the
                  absolute predicted flux on a logarithmic scale, making the
                  most active routes easier to identify.
                </p>
                <p>
                  A genome-scale network is too dense to interpret if every
                  possible connection is displayed at once. To keep the
                  visualization readable, we omit reactions whose predicted flux
                  is zero, remove cofactor nodes and then discard metabolites or
                  reactions left without a connection. These elements are
                  removed only from the displayed graph: every simulation is
                  still solved using the complete metabolic model.
                </p>
              </div>

              <div
                id="how-to-explore-the-map"
                className="model-network__subsection"
              >
                <h3>How to explore the map</h3>
                <p>
                  Open the <strong>Filters</strong> panel to move between growth
                  and PolyP production priorities. The intermediate positions
                  maximize PolyP while maintaining at least 60% or 20% of the
                  reference growth rate. You can then explore one perturbation
                  at a time: nutrient-uptake bounds, selected strain designs, or
                  constraints on PPK1 capacity and ATP maintenance. The{" "}
                  <strong>Predicted state</strong> summary reports the resulting
                  growth, PolyP production and nutrient uptake rates.
                </p>
                <p>
                  Zoom or pan to navigate the network, drag a node to rearrange
                  its neighbourhood, and hover or tap to inspect reaction and
                  metabolite details. When a new scenario is selected, shared
                  node positions and the current view are preserved while
                  changes in topology and flux are animated. Each control
                  position corresponds to a precomputed pFBA scenario; filters
                  from different sections are not combined.
                </p>
              </div>
            </div>

            <figure className="model-network__figure">
              <Suspense
                fallback={
                  <div className="model-network__graph">
                    <p className="model-network__status">
                      Loading metabolic network…
                    </p>
                  </div>
                }
              >
                <MetabolicNetworkGraph />
              </Suspense>
              <figcaption>
                <strong>Figure 1.</strong> Interactive pFBA flux map of the
                iJN1463 metabolic model. Line width indicates absolute flux;
                reaction colours distinguish metabolic subsystems.
              </figcaption>
            </figure>
          </section>

          <section id="phase-b-sensitivity" className="model-network">
            <div className="model-network__intro">
              <h2>
                2. Environmental and capacity sensitivity during PolyP
                accumulation
              </h2>
              <p>
                After defining the accumulation medium, we asked which
                environmental resources and metabolic capacities determine the
                maximum PolyP accumulation predicted for wild-type{" "}
                <em>Pseudomonas putida</em> KT2440. We independently varied
                carbon, ammonium, phosphate and oxygen uptake, as well as
                ATP-maintenance demand and PPK1 capacity. This
                one-factor-at-a-time approach identifies thresholds and
                saturation regions before any interaction between variables is
                considered.
              </p>

              <div
                id="sensitivity-framework"
                className="model-network__subsection"
              >
                <h3>2.1 A common framework for sensitivity analysis</h3>
                <p>
                  All simulations used the Phase B medium defined previously.
                  The model maximized flux through <code>DM_ppi50_c</code>, the
                  demand reaction representing a PolyP chain containing 50
                  phosphate units, using parsimonious flux balance analysis
                  (pFBA) to select a representative solution requiring the
                  lowest total metabolic flux.
                </p>
                <p>
                  Maximizing PolyP without any biomass requirement could produce
                  a metabolically inactive, non-growing solution. We therefore
                  required biomass production to remain above 10% of the maximum
                  Phase B growth rate (0.0941 h⁻¹), giving a common
                  residual-growth requirement of 0.00941 h⁻¹.
                </p>
                <p>
                  Only one parameter was changed in each scan, while every other
                  medium component and constraint remained fixed. These results
                  therefore describe the theoretical metabolic capacity of the
                  model under each condition — they do not predict uptake
                  kinetics, regulatory activation or the time-dependent
                  accumulation of PolyP.
                </p>
                <p>
                  Several of the scans below plateau at the same PolyP ceiling.
                  Where that happens, it reflects the shared Phase B
                  phosphate-uptake bound becoming the limiting constraint, not
                  five independently-reached optima.
                </p>
                <p>
                  The interactive network above (Figure 1) can be used to
                  inspect the flux distribution behind any of these scenarios
                  directly, by selecting the matching filters in its{" "}
                  <strong>Filters</strong> panel.
                </p>
              </div>
            </div>

            <div
              id="factor-explorer"
              className="model-network__subsection model-network__wide"
            >
              <div className="model-network__intro">
                <h3>2.2 Factor explorer</h3>
                <p>
                  The six analyses below trace, one variable at a time, how
                  environmental resources and metabolic capacities shape the
                  model's predicted PolyP-accumulation ceiling. Step through
                  them in sequence, or jump directly to any factor.
                </p>
              </div>
              <FactorExplorer />

              <div className="model-network__table-scroll">
                <table className="model-network__table">
                  <thead>
                    <tr>
                      <th>Factor</th>
                      <th>Predicted response</th>
                      <th>Main transition</th>
                      <th>Implication</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Carbon source and uptake</td>
                      <td>Source-dependent increase followed by saturation</td>
                      <td>
                        Different carbon sources reach the PolyP ceiling at
                        different uptake bounds
                      </td>
                      <td>
                        Carbon availability matters until another constraint
                        becomes limiting
                      </td>
                    </tr>
                    <tr>
                      <td>Ammonium</td>
                      <td>
                        Little direct effect once residual growth is feasible
                      </td>
                      <td>
                        Near-maximal growth progressively reduces the remaining
                        PolyP capacity
                      </td>
                      <td>
                        Nitrogen limitation creates capacity for storage but
                        does not induce it
                      </td>
                    </tr>
                    <tr>
                      <td>Phosphate</td>
                      <td>
                        Approximately linear increase followed by saturation
                      </td>
                      <td>
                        Reference PolyP capacity is reached around the Phase B
                        Pi bound
                      </td>
                      <td>
                        Phosphate transport is a direct determinant of
                        accumulation
                      </td>
                    </tr>
                    <tr>
                      <td>Oxygen</td>
                      <td>
                        PolyP capacity rises with respiratory availability
                      </td>
                      <td>Plateau around 30 mmol gDW⁻¹ h⁻¹</td>
                      <td>Oxygen transfer can limit accumulation</td>
                    </tr>
                    <tr>
                      <td>ATP maintenance</td>
                      <td>
                        High energetic demand progressively reduces PolyP
                        capacity
                      </td>
                      <td>Decline begins after the low-demand plateau</td>
                      <td>
                        Severe energetic burden competes with phosphate storage
                      </td>
                    </tr>
                    <tr>
                      <td>PPK1 capacity</td>
                      <td>
                        Proportional response up to the reference capacity
                      </td>
                      <td>No benefit above approximately 1×</td>
                      <td>
                        PPK1 is necessary, but increasing its capacity alone is
                        insufficient
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="model-network__intro">
                <p>
                  These one-dimensional scans identified the variables that most
                  directly shape PolyP accumulation and revealed where
                  individual responses saturate. They also motivated the
                  interaction analyses presented next: glucose × oxygen,
                  phosphate × glucose, phosphate × oxygen, phosphate × PPK1
                  capacity, and ATP maintenance × oxygen.
                </p>
              </div>
            </div>

            <div
              id="phase-interactions"
              className="model-network__subsection model-network__wide"
            >
              <div className="model-network__intro">
                <h3>2.3 Interactions between limiting factors</h3>
                <p>
                  The scans above vary one condition at a time. Here we ask
                  whether pairs of factors interact — whether the ceiling
                  reached by one depends on how much of another is
                  simultaneously available. For each pair of exchange bounds,
                  PolyP flux is optimized directly and the resulting surface is
                  shown as a heatmap, with a line of optimality marking the
                  minimum second-variable value needed to reach the current
                  optimum.
                </p>
                <p>
                  The glucose × O₂, Pi × glucose and Pi × O₂ planes optimize
                  PolyP without the 10% residual-growth floor used elsewhere in
                  this section; the Pi × PPK1 capacity and ATP maintenance × O₂
                  planes apply that same floor, matching the common framework in
                  2.1. Select two factors below to open the matching analysis.
                </p>
              </div>
              <PhaseInteractionExplorer />
            </div>
          </section>

          <section id="growth-polyp-balance" className="model-network">
            <div className="model-network__intro">
              <h2>3. Balancing growth and PolyP accumulation</h2>
              <p>
                <em>
                  Can P. putida maintain growth while accumulating PolyP, and
                  what metabolic adjustments does this require?
                </em>
              </p>
              <p>
                Section 2 asked how environmental resources and metabolic
                capacities determine the ceiling on PolyP accumulation, one
                factor — or one pair of factors — at a time, without requiring
                any growth. This section adds growth itself as a simultaneous
                demand: instead of maximizing PolyP alone, we now ask how much
                of that ceiling remains reachable once biomass formation is also
                required, and what the model has to redistribute internally to
                sustain both at once.
              </p>

              <div
                id="growth-polyp-compatibility"
                className="model-network__subsection"
              >
                <h3>3.1 Growth–PolyP compatibility and limiting resources</h3>

                <p>
                  <strong>
                    Can growth and PolyP coexist — and is the apparent
                    carbon-source ranking intrinsic?
                  </strong>{" "}
                  A production envelope varies growth and PolyP simultaneously:
                  for each growth rate between zero and a carbon source's own
                  maximum, the model maximizes PolyP flux. Five carbon sources —
                  glucose, acetate, glycerol, succinate and pyruvate — were
                  compared twice: once at equal molar uptake, and once with
                  uptake normalized to equal total carbon input, to separate a
                  genuine substrate effect from a simple carbon-supply effect.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <div className="model-network__compare">
                <div className="model-network__compare-grid">
                  <article className="model-network__compare-panel">
                    <h4>Equal molar uptake</h4>
                    <p className="model-network__compare-condition">
                      8 mmol gDW⁻¹ h⁻¹ per substrate
                    </p>
                    <figure>
                      <img
                        src={asset(
                          "assets/model/growth-polyp-equal-molar-paired.svg",
                        )}
                        alt="Growth-PolyP production envelopes separate by carbon source at equal molar uptake."
                      />
                      <figcaption>
                        <strong>Figure 4a.</strong> Growth–PolyP production
                        envelopes at equal molar carbon uptake.
                      </figcaption>
                    </figure>
                    <p className="model-network__compare-reading">
                      Glucose and glycerol both reach the same ≈2.0 mmol gDW⁻¹
                      h⁻¹ ceiling at zero growth, and glucose sustains that
                      ceiling almost without loss across the <em>entire</em>{" "}
                      growth range, up to the Phase B reference maximum (0.0941
                      h⁻¹). Glycerol declines gradually to ≈1.75; succinate from
                      ≈1.89 to ≈1.47; pyruvate from ≈1.44 to ≈1.01; and acetate
                      falls the most steeply, from ≈1.00 to ≈0.56. Growth does
                      not immediately force PolyP down — but it increasingly
                      competes for carbon and energy, and how much that costs
                      depends on the substrate.
                    </p>
                  </article>

                  <article className="model-network__compare-panel">
                    <h4>Equal total carbon input</h4>
                    <p className="model-network__compare-condition">
                      48 mmol C gDW⁻¹ h⁻¹, divided by each substrate's carbon
                      count
                    </p>
                    <figure>
                      <img
                        src={asset(
                          "assets/model/growth-polyp-equal-carbon-paired.svg",
                        )}
                        alt="Growth-PolyP production envelopes overlap almost completely at equal total carbon input."
                      />
                      <figcaption>
                        <strong>Figure 4b.</strong> Normalization control at
                        equal total carbon input.
                      </figcaption>
                    </figure>
                    <p className="model-network__compare-reading">
                      Plotted on the same absolute scale as Figure 4a, the five
                      curves collapse onto essentially one line, differing by no
                      more than ≈0.002 mmol gDW⁻¹ h⁻¹ across the whole growth
                      range — visually indistinguishable at this resolution.
                    </p>
                  </article>
                </div>

                <div
                  className="model-network__compare-legend"
                  aria-label="Carbon source legend"
                >
                  <span
                    className="model-network__compare-legend-item"
                    style={{ color: "#3B6FA0" }}
                  >
                    <span className="model-network__compare-legend-swatch" />
                    Glucose
                  </span>
                  <span
                    className="model-network__compare-legend-item"
                    style={{ color: "#E19239" }}
                  >
                    <span className="model-network__compare-legend-swatch" />
                    Acetate
                  </span>
                  <span
                    className="model-network__compare-legend-item"
                    style={{ color: "#61A65B" }}
                  >
                    <span className="model-network__compare-legend-swatch" />
                    Glycerol
                  </span>
                  <span
                    className="model-network__compare-legend-item"
                    style={{ color: "#8567A6" }}
                  >
                    <span className="model-network__compare-legend-swatch" />
                    Succinate
                  </span>
                  <span
                    className="model-network__compare-legend-item"
                    style={{ color: "#4C9797" }}
                  >
                    <span className="model-network__compare-legend-swatch" />
                    Pyruvate
                  </span>
                </div>

                <p className="model-network__compare-synthesis">
                  <strong>
                    Together, the two panels change the interpretation:
                  </strong>{" "}
                  the carbon-source ranking visible in Figure 4a is mainly a
                  consequence of how much carbon each substrate happens to
                  deliver per mole taken up, not an intrinsic biochemical
                  advantage of any one route.
                </p>
              </div>
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  <strong>What ultimately sets the PolyP ceiling?</strong>{" "}
                  Checking which constraint is active at the plain PolyP optimum
                  (no growth requirement, equal molar carbon uptake) shows
                  phosphate uptake pinned at its lower bound, while no
                  carbon-source or oxygen exchange sits at a bound. Phosphate,
                  not carbon or oxygen, is what caps PolyP here — which is why
                  repeating the equal-carbon-input envelopes across a range of
                  phosphate bounds collapses all five carbon sources onto one
                  flat, phosphate-proportional curve at every bound tested: once
                  phosphate is the active constraint, carbon identity stops
                  mattering.
                </p>

                <p>
                  To see the carbon-source differences again — and how they
                  depend on growth <em>and</em> phosphate together — the same
                  phosphate-bound sweep was recomputed at equal <em>molar</em>{" "}
                  uptake instead of equal carbon input. This is a distinct
                  simulation set from the phosphate-normalized comparison just
                  above, not the same data replotted: five surfaces, one per
                  carbon source, each tracing PolyP flux over growth rate and
                  maximum phosphate uptake. Every plotted point is a real
                  production-envelope solution; the translucent surfaces only
                  connect neighboring points and imply no extra resolution
                  between them.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <GrowthPolypSurface />
              <p className="model-network__figure-caption-standalone">
                <strong>Figure 4c.</strong> Growth × maximum Pi uptake × maximum
                PolyP flux, five carbon sources at equal molar uptake (8 mmol
                gDW⁻¹ h⁻¹). Drag to rotate, scroll to zoom, and click a legend
                entry to hide or show a carbon source. Below 640px width, a
                static render of the same figure is shown instead.
              </p>
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  PolyP flux rises with phosphate availability along a
                  source-dependent surface, while growth's own effect stays
                  comparatively mild — consistent with Figure 4a. This is a
                  different question from the phenotype phase planes in 2.3:
                  those swept two environmental or capacity bounds against each
                  other without any growth requirement; here growth is an
                  explicit third axis, and the analysis traces a full production
                  envelope rather than a single two-dimensional optimum surface.
                </p>
              </div>

              <div
                id="metabolic-redistribution"
                className="model-network__subsection"
              >
                <h3>3.2 Metabolic redistribution and solution flexibility</h3>

                <p>
                  <strong>How does the network accommodate growth?</strong> To
                  see what changes internally, three parsimonious flux solutions
                  were compared: PolyP maximized with no growth requirement, and
                  the same objective with a 20% and a 60% growth floor
                  (fractions of the Phase B maximum growth rate, 0.0941 h⁻¹) —
                  the same two growth-floor scenarios available as "20% growth +
                  PolyP" and "60% growth + PolyP" objectives in the interactive
                  network's <strong>Filters</strong> panel above.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <figure className="model-network__figure model-network__figure--compact">
                <img
                  src={asset("assets/model/largest-flux-changes.png")}
                  alt="Largest flux changes relative to the PolyP-only optimum, comparing 20% and 60% growth floors."
                />
                <figcaption>
                  <strong>Figure 5.</strong> Largest flux changes relative to
                  the PolyP-only optimum, at 20% and 60% growth floors.
                </figcaption>
              </figure>
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  Every one of the largest-magnitude changes belongs to
                  respiration or transport — ATP synthase (ATPS4rpp), cytochrome
                  oxidase (CYTBO3_4pp), NADH dehydrogenase (NADH16pp), oxygen
                  transport, and water/CO₂ exchange — and each grows further
                  from the 20% to the 60% growth condition. The model therefore
                  accommodates moderate growth mainly by intensifying
                  respiration, ATP production, transport and nutrient uptake,
                  well before it makes any large cut to PolyP flux itself.
                </p>

                <p>
                  <strong>Is the displayed flux map unique?</strong> A single
                  pFBA solution — like the one shown in the network viewer above
                  — is only one point in a larger feasible space. Flux
                  variability analysis (FVA) and flux sampling examine that
                  space from two complementary angles under identical
                  constraints: PolyP fixed at ≥99% of its Phase B optimum
                  (1.9998 mmol gDW⁻¹ h⁻¹), the same 10% residual-growth floor
                  used throughout this page, and total flux capped at 110% of
                  the parsimonious minimum — a constraint needed because the
                  model's large reversible PPK cycle can otherwise carry
                  arbitrary loop flux without changing any output. FVA reports
                  each reaction's minimum–maximum range under these constraints;
                  sampling (1000 samples, ACHR, thinning 100, seed 42) draws
                  feasible states from the same space and reports their median
                  and interquartile range. Sampled frequency is not a biological
                  probability — it only describes the geometry of the
                  constrained solution space.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <figure className="model-network__figure model-network__figure--compact model-network__figure--fva">
                <img
                  src={asset("assets/model/fva-sampling-comparison.svg")}
                  alt="Flux variability analysis and flux sampling for the same fourteen reactions, aligned for comparison."
                />
                <figcaption>
                  <strong>Figure 6.</strong> FVA range (left) and sampling
                  median with interquartile range (right) for the same
                  reactions, at ≥99% of the PolyP optimum, a 10% residual-growth
                  floor and total flux ≤110% of the pFBA minimum.
                </figcaption>
              </figure>
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  FVA gives wide ranges for the reversible PPK cycle (−54.8 to
                  19.4 mmol gDW⁻¹ h⁻¹) and for the specific route phosphate
                  takes into the cell (the PIt2rpp, PItex, PIabc and PIuabcpp
                  transporters, each spanning 24–40 units), while the exchange
                  bounds, growth rate and the PolyP objective itself all stay
                  tightly constrained (≤1 unit of range). Sampling shows that
                  representative near-optimal states cluster tightly around the
                  pFBA point for essentially all of these reactions — including
                  the ones FVA marks as wide. The network's overall objective
                  and exchange pattern is therefore robust, but the exact
                  internal route — particularly how phosphate is imported and
                  how the reversible PPK cycle balances — retains real
                  flexibility that a single flux map cannot show. The pFBA
                  solution in the viewer above should be read as <em>a</em>{" "}
                  representative parsimonious solution, not the unique feasible
                  one.
                </p>
              </div>

              <div className="model-network__intro">
                <p>
                  <strong>Implications for Phase B.</strong> Moderate growth can
                  coexist with a PolyP flux close to its optimum. Sustaining
                  both simultaneously demands greater respiratory and
                  biosynthetic activity, not a proportional cut to PolyP.
                  Phosphate availability — not carbon or oxygen — sets the
                  ceiling under the conditions studied here. And while the
                  model's main objectives and exchanges are robust, the exact
                  internal route remains flexible. For the project, this means
                  Phase B does not need to drive growth to zero — but it does
                  need to guarantee enough phosphate, usable carbon and
                  respiratory capacity to sustain both processes together.
                </p>
              </div>
            </div>
          </section>

          <section id="kinetic-core" className="model-network">
            <div className="model-network__intro">
              <h2>4. From a genome-scale model to a kinetic core</h2>
              <p>
                Everything above is steady state. A constraint-based model
                answers what flux distributions are possible, not how
                concentrations move in time, and the questions this project ends
                on — how fast phosphate is taken up, how far polyP accumulates
                before the cell runs out of ATP — are questions about time.
                Answering them needs a kinetic model: an ordinary differential
                equation per species, a rate law per reaction.
              </p>
              <p>
                That cannot be written for the whole network. A rate law carries
                several parameters, each of which has to be measured or taken
                from the literature, and for most reactions of{" "}
                <em>P. putida</em> those numbers do not exist; what exists is
                scattered across organisms and conditions
                <Cite n={1} />
                <Cite n={2} />. Writing the full network down would not make the
                model more faithful, only less identifiable: added complexity
                that no experiment in reach could constrain
                <Cite n={3} />. The usual answer is to reduce the network first{" "}
                <Cite n={4} />, and the rest of this section is how that
                reduction was done for polyP accumulation, and what it is
                allowed to leave out.
              </p>
            </div>

            <div className="model-network__wide">
              <CoreFunnel />
            </div>

            <div className="model-network__intro">
              <div
                id="active-metabolic-core"
                className="model-network__subsection"
              >
                <h3>4.1 Identifying the active metabolic core</h3>

                <p>
                  The first observation is that most of the network does
                  nothing. Parsimonious FBA solves the usual linear problem and
                  then, among all the flux distributions that reach the same
                  optimum, picks the one of smallest total flux
                  <Cite n={5} /> — the proxy for a cell that does not run
                  enzymes it has no use for.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <DisplayMath
                tex="\begin{aligned}\min_{\mathbf v}\ \sum_j |v_j| \quad &\text{subject to}\quad \mathbf{N}\mathbf{v}=\mathbf 0, \\[2pt] &\mathbf l \le \mathbf v \le \mathbf u, \quad Z = Z_{\max}\end{aligned}"
                label="4"
              />
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  Solved for polyP synthesis on the 2,927 reactions of the
                  reconstruction used throughout this page, the parsimonious
                  solution puts flux through <strong>166 reactions</strong>,
                  5.67% of the network. Raise the bar from "non-zero" to
                  "carrying a flux worth modelling" — a threshold of 10⁻² mmol
                  gDW⁻¹ h⁻¹ — and what is left is <strong>45 reactions</strong>,
                  1.54%. Below that threshold a flux changes no concentration on
                  the timescale of the experiment; above it, the reaction is
                  doing work.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <figure className="model-network__figure model-network__figure--compact model-network__figure--plate">
                <img
                  src={asset("assets/model/pfba-fva-by-category.webp")}
                  alt="Stacked bar charts of the reactions active in pFBA and in FVA, grouped by functional category, at tolerances of 0, 0.01 and 0.1."
                />
                <figcaption>
                  <strong>Figure 8.</strong> Reactions active in pFBA and in
                  FVA, grouped by functional category, at three thresholds. At
                  10⁻¹ the pFBA core is almost entirely central carbon
                  metabolism and transport, while FVA keeps a tail of
                  biosynthetic and detoxification routes. Figure from the
                  underlying thesis <Cite n={6} />; axis labels in Spanish.
                </figcaption>
              </figure>
            </div>

            <div className="model-network__intro">
              <div
                id="metabolic-flexibility"
                className="model-network__subsection"
              >
                <h3>4.2 Preserving metabolic flexibility</h3>

                <p>
                  A parsimonious solution is one point, and as the previous
                  section already showed for Phase B, the optimum is not a
                  unique flux map. Flux variability analysis puts a number on
                  that: it maximises and minimises each reaction in turn while
                  holding the objective at (or near) its optimum
                  <Cite n={7} />, which gives the interval of fluxes the
                  reaction can take without the cell giving anything up.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <DisplayMath
                tex="\begin{aligned}v_j^{\min},\, v_j^{\max} \;=\; \min_{\mathbf v} / \max_{\mathbf v}\ v_j \quad &\text{subject to}\quad \mathbf{N}\mathbf{v}=\mathbf 0, \\[2pt] &\mathbf l \le \mathbf v \le \mathbf u, \quad Z \ge \gamma Z_{\max}\end{aligned}"
                label="5"
              />
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  The answer is that the network is far more flexible than the
                  parsimonious solution suggests:{" "}
                  <strong>1,985 reactions</strong>, 67.82% of the model, can
                  carry flux in some equally optimal state. Only one of them is
                  actually pinned to a single value. But flexibility is not the
                  same as relevance. Of those accessory reactions, 1,297 can
                  only ever carry fluxes below 10⁻² mmol gDW⁻¹ h⁻¹, and the
                  routes that open up belong to lipid, cell-envelope, amino-acid
                  and nucleotide metabolism — alternatives that reach the same
                  optimum by a different path rather than functions the reduced
                  model would lose.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <div className="model-network__table-scroll">
                <table className="model-network__table">
                  <caption className="model-network__table-caption">
                    <strong>Table 1.</strong> Reactions counted as active by
                    pFBA and by FVA, at three flux thresholds, out of the 2,927
                    reactions of the model. "Fixed" and "variable" split the
                    FVA-active reactions into those whose interval collapses to
                    a point and those that retain a range.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Method</th>
                      <th scope="col">Reactions</th>
                      <th scope="col">Threshold 0</th>
                      <th scope="col">0.01</th>
                      <th scope="col">0.1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" rowSpan={2}>
                        pFBA
                      </th>
                      <td>Inactive</td>
                      <td>2,761 (94.33%)</td>
                      <td>2,882 (98.46%)</td>
                      <td>2,882 (98.46%)</td>
                    </tr>
                    <tr>
                      <td>Active</td>
                      <td>166 (5.67%)</td>
                      <td>45 (1.54%)</td>
                      <td>45 (1.54%)</td>
                    </tr>
                    <tr>
                      <th scope="row" rowSpan={4}>
                        FVA
                      </th>
                      <td>Inactive</td>
                      <td>942 (32.18%)</td>
                      <td>2,228 (76.12%)</td>
                      <td>2,853 (97.47%)</td>
                    </tr>
                    <tr>
                      <td>Active</td>
                      <td>1,985 (67.82%)</td>
                      <td>699 (23.88%)</td>
                      <td>74 (2.53%)</td>
                    </tr>
                    <tr>
                      <td>— fixed</td>
                      <td>1 (0.05%)</td>
                      <td>4 (0.57%)</td>
                      <td>35 (47.30%)</td>
                    </tr>
                    <tr>
                      <td>— variable</td>
                      <td>1,984 (99.95%)</td>
                      <td>695 (99.43%)</td>
                      <td>39 (52.70%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  Reading the two analyses together is what makes the reduction
                  defensible. Where FVA keeps a reaction with a real range at
                  the loosest tolerance, it keeps it in the respiratory module
                  and in redox balancing — the cell may use a different
                  electron-transport route or adjust the proton gradient and
                  still reach the same optimum. That is flexibility the reduced
                  model has to keep, and it is kept: respiration enters the core
                  as its own module rather than being folded into the carbon
                  pathways, precisely because the respiratory reactions are not
                  strictly coupled to them
                  <Cite n={8} />.
                </p>
              </div>

              <div
                id="selecting-kinetic-reactions"
                className="model-network__subsection"
              >
                <h3>4.3 Selecting the reactions required for kinetics</h3>

                <p>
                  Three questions are easy to confuse, and they give three
                  different sets of reactions:
                </p>
                <ul className="model-network__list">
                  <li>
                    <strong>What the parsimonious solution needs.</strong> The
                    166 reactions that carry flux — the cheapest way to reach
                    the optimum, and nothing else.
                  </li>
                  <li>
                    <strong>What FVA shows is available.</strong> The 1,985
                    reactions that could carry flux in some equally optimal
                    state — the shape of the solution space, not a route through
                    it.
                  </li>
                  <li>
                    <strong>
                      What a kinetic description of polyP accumulation actually
                      needs.
                    </strong>{" "}
                    The reactions whose flux is large enough to move a
                    concentration, and whose rate law can be written: the 45
                    above 10⁻² mmol gDW⁻¹ h⁻¹.
                  </li>
                </ul>

                <p>
                  The threshold is doing real work in that last step, so it is
                  worth saying why 10⁻² and not something else. Below it sit
                  1,297 of the FVA-accessory reactions and all of the difference
                  between the 166-reaction and 45-reaction cores — fluxes three
                  orders of magnitude under the phosphate uptake that drives the
                  system, which over the hours a batch run lasts shift no pool
                  the model tracks. Taking them in would add parameters without
                  adding behaviour. The 45 reactions that survive are the ones
                  the pFBA solution leans on, and they fall into seven blocks,
                  which are what the kinetic model is built from:
                </p>
                <ul className="model-network__list">
                  <li>
                    <strong>Transport of glucose, oxygen and phosphate</strong>{" "}
                    — what crosses the membrane, including both the Pit
                    symporter and the ABC-type Pst route.
                  </li>
                  <li>
                    <strong>The Entner–Doudoroff pathway</strong> — the route{" "}
                    <em>P. putida</em> actually uses for glucose
                    <Cite n={9} />, rather than a textbook glycolysis.
                  </li>
                  <li>
                    <strong>The TCA cycle</strong> — oxidation of acetyl-CoA and
                    the supply of reducing equivalents.
                  </li>
                  <li>
                    <strong>The respiratory chain</strong> — NADH dehydrogenase
                    and cytochrome oxidase, kept as an independent module.
                  </li>
                  <li>
                    <strong>ATP synthesis and maintenance</strong> — ATP
                    synthase and the non-growth maintenance demand.
                  </li>
                  <li>
                    <strong>Redox balancing</strong> — the transhydrogenase that
                    trades NADH against NADPH.
                  </li>
                  <li>
                    <strong>PolyP polymerisation</strong> — the PPK steps that
                    turn ATP and phosphate into chain.
                  </li>
                </ul>

                <p>
                  Two things are deliberately absent. Biomass synthesis is
                  inactive under these conditions, so the branches that feed
                  precursors carry no flux (grey in Figure 9) and drop out of
                  the core; a version of the model that demands growth brings
                  them back, and would need them. And the pentose-phosphate
                  branches, which the same figure shows at zero flux here, are
                  part of the glucose-processing cycle this organism can run{" "}
                  <Cite n={9} /> but not of the state being described. The
                  reduction is specific to aerobic polyP accumulation under a
                  fixed medium; it is not a general-purpose small model of{" "}
                  <em>P. putida</em>.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <figure className="model-network__figure model-network__figure--compact model-network__figure--plate">
                <img
                  src={asset("assets/model/active-core-map.webp")}
                  alt="Metabolic map of the 45 active reactions with their pFBA fluxes, grouped into respiration, the Entner-Doudoroff pathway, the TCA cycle, ATP synthesis and maintenance, transhydrogenase and polyphosphate synthesis."
                />
                <figcaption>
                  <strong>Figure 9.</strong> The 45-reaction core, with the pFBA
                  flux of each reaction in mmol gDW⁻¹ h⁻¹; line thickness is
                  flux and grey lines carry none. The functional blocks of 4.3
                  are visible as groups: respiration (top left),
                  Entner–Doudoroff down the middle, the TCA cycle and ATP
                  synthase (right), polyP synthesis (bottom right). Figure from
                  the underlying thesis <Cite n={6} />; module labels in
                  Spanish.
                </figcaption>
              </figure>
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  This is the model the kinetic work starts from: small enough
                  that every rate law can be written and every parameter traced
                  to a source, and chosen so that what it leaves out is either
                  negligible flux or an equivalent route to the same optimum.
                  What it cannot do is predict anything outside the conditions
                  it was reduced under — which is the honest cost of the
                  reduction, and the reason the selection above is stated rather
                  than assumed.
                </p>
              </div>

              <div className="model-network__subsection">
                <AccordionSection title="References">
                  <ol className="model-reference-list">
                    <li id="model-ref-1">
                      Tokic, M., Hatzimanikatis, V. &amp; Miskovic, L. (2020).
                      Large-scale kinetic metabolic models of{" "}
                      <em>Pseudomonas putida</em> KT2440 for consistent design
                      of metabolic engineering strategies.{" "}
                      <em>Biotechnology for Biofuels, 13</em> (1), 33. DOI:{" "}
                      <a
                        href="https://doi.org/10.1186/s13068-020-1665-7"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1186/s13068-020-1665-7
                      </a>
                    </li>
                    <li id="model-ref-2">
                      Rutkis, R., Kalnenieks, U., Stalidzans, E. &amp; Fell, D.
                      A. (2013). Kinetic modelling of the{" "}
                      <em>Zymomonas mobilis</em> Entner–Doudoroff pathway:
                      insights into control and functionality.{" "}
                      <em>Microbiology, 159</em> (12), 2674–2689. DOI:{" "}
                      <a
                        href="https://doi.org/10.1099/mic.0.071340-0"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1099/mic.0.071340-0
                      </a>
                    </li>
                    <li id="model-ref-3">
                      Hameri, T., Fengos, G. &amp; Hatzimanikatis, V. (2021).
                      The effects of model complexity and size on metabolic flux
                      distribution and control: case study in{" "}
                      <em>Escherichia coli</em>. <em>BMC Bioinformatics, 22</em>{" "}
                      (1), 134. DOI:{" "}
                      <a
                        href="https://doi.org/10.1186/s12859-021-04066-y"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1186/s12859-021-04066-y
                      </a>
                    </li>
                    <li id="model-ref-4">
                      Singh, D. &amp; Lercher, M. J. (2019). Network reduction
                      methods for genome-scale metabolic models.{" "}
                      <em>Cellular and Molecular Life Sciences, 77</em> (3),
                      481–488. DOI:{" "}
                      <a
                        href="https://doi.org/10.1007/s00018-019-03383-z"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1007/s00018-019-03383-z
                      </a>
                    </li>
                    <li id="model-ref-5">
                      Schuetz, R., Kuepfer, L. &amp; Sauer, U. (2007).
                      Systematic evaluation of objective functions for
                      predicting intracellular fluxes in{" "}
                      <em>Escherichia coli</em>.{" "}
                      <em>Molecular Systems Biology, 3</em> (1), 119. DOI:{" "}
                      <a
                        href="https://doi.org/10.1038/msb4100162"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1038/msb4100162
                      </a>
                    </li>
                    <li id="model-ref-6">
                      Concepción Castanedo, D. (2026).{" "}
                      <em>
                        Caracterización de flujos metabólicos y modelado
                        cinético de la acumulación aerobia de polifosfato en
                        bacterias
                      </em>{" "}
                      [Trabajo de Fin de Grado]. Universidad Complutense de
                      Madrid, Facultad de Ciencias Físicas.
                    </li>
                    <li id="model-ref-7">
                      Kenefake, D., Armingol, E., Lewis, N. E. &amp;
                      Pistikopoulos, E. N. (2022). An improved algorithm for
                      flux variability analysis. <em>BMC Bioinformatics, 23</em>{" "}
                      (1), 550. DOI:{" "}
                      <a
                        href="https://doi.org/10.1186/s12859-022-05089-9"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1186/s12859-022-05089-9
                      </a>
                    </li>
                    <li id="model-ref-8">
                      Burgard, A. P., Nikolaev, E. V., Schilling, C. H. &amp;
                      Maranas, C. D. (2004). Flux coupling analysis of
                      genome-scale metabolic network reconstructions.{" "}
                      <em>Genome Research, 14</em> (2), 301–312. DOI:{" "}
                      <a
                        href="https://doi.org/10.1101/gr.1926504"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1101/gr.1926504
                      </a>
                    </li>
                    <li id="model-ref-9">
                      Nikel, P. I., Chavarría, M., Fuhrer, T., Sauer, U. &amp;
                      de Lorenzo, V. (2015). <em>Pseudomonas putida</em> KT2440
                      metabolizes glucose through a cycle formed by enzymes of
                      the Entner–Doudoroff, Embden–Meyerhof–Parnas and pentose
                      phosphate pathways.{" "}
                      <em>Journal of Biological Chemistry, 290</em>,
                      25920–25932. DOI:{" "}
                      <a
                        href="https://doi.org/10.1074/jbc.M115.687749"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1074/jbc.M115.687749
                      </a>
                    </li>
                  </ol>
                </AccordionSection>
              </div>
            </div>
          </section>

          <section id="reduced-kinetic-model" className="model-network">
            <div className="model-network__intro">
              <h2>5. Building the reduced kinetic model</h2>
              <p>
                Forty-five reactions is small enough to write down, but it is
                still more than the system needs — and more than the available
                data can pin down. This section is the last step of the
                reduction: how those reactions become a handful of modules, what
                rate law each one carries, and where the numbers in those laws
                come from.
              </p>
            </div>

            <div className="model-network__intro">
              <div id="lumping-modules" className="model-network__subsection">
                <h3>5.1 Lumping reactions into functional modules</h3>

                <p>
                  The first preliminary kinetic model gave each of the 45
                  reactions its own rate law and its own parameters, and that
                  was precisely the problem: too many parameters, drawn from too
                  many unrelated sources, for the fit to mean anything. The
                  structural answer is <em>lumping</em> — grouping reactions
                  that, at steady state, always carry their fluxes in a fixed
                  proportion, and describing the group with one net reaction. It
                  is a reduction that costs no information about what the
                  network can do <Cite n={4} />.
                </p>

                <p>
                  Which reactions may be grouped is not a matter of taste. Flux
                  coupling analysis asks whether two reactions are forced to
                  move together in every feasible steady state
                  <Cite n={8} />, and for <em>P. putida</em> it gives a clear
                  answer: the sequential steps of the{" "}
                  <strong>Entner–Doudoroff pathway are coupled</strong> — the
                  route has no branch along the way that could drain it, so
                  every step carries the same flux and the whole sequence
                  collapses into one reaction. The parsimonious solution
                  confirms it: the ED steps all come out at 0.599 mmol gDW⁻¹ h⁻¹
                  (Figure 9).
                </p>

                <p>
                  What that buys is best seen in the stoichiometric matrix
                  itself. Two coupled reactions are two columns{" "}
                  <InlineMath tex="\mathbf n_1, \mathbf n_2" /> whose fluxes are
                  fixed multiples of one another in <em>every</em> feasible
                  solution, so their joint contribution can be written with a
                  single column and a single flux — the pair stops being two
                  degrees of freedom without the network losing anything it
                  could do:
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <LumpingMatrix />
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  The <strong>TCA cycle is not coupled in the same way</strong>.
                  It branches at the nodes that feed biomass precursors, and a
                  branch means the flux through one step no longer fixes the
                  flux through the next. Under the conditions studied here those
                  branches are inactive — no growth is demanded, so they carry
                  nothing, which is why they sit grey in the map of the previous
                  section — and the cycle's steps do come out at one common
                  flux. The cycle can therefore be written as a single net
                  reaction <em>for this state</em>, which is a different and
                  weaker statement than ED's: demand growth, and the branches
                  reopen and the lump stops being valid.
                </p>

                <p>
                  <strong>Respiration stays separate</strong>, and deliberately.
                  The respiratory reactions are not strictly coupled to the
                  carbon routes <Cite n={8} />, so keeping oxidative
                  phosphorylation as its own module is what lets the model
                  adjust its redox and energy balance to the electron acceptor
                  it actually has — exactly the flexibility FVA showed was real
                  in section 4.2. Folding it into the carbon blocks would have
                  bought a smaller model by throwing away the behaviour worth
                  modelling.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <LumpedModel />
            </div>

            <div className="model-network__intro">
              <div id="kinetic-equations" className="model-network__subsection">
                <h3>5.2 Defining the kinetic equations</h3>

                <p>
                  With the modules fixed, the model stops being a set of
                  constraints and becomes a system of differential equations.
                  The state is the vector of concentrations of the species the
                  reduced network tracks — glucose, pyruvate, the ATP/ADP and
                  NAD⁺/NADH pairs, Q8/Q8H₂, oxygen, internal and external
                  phosphate, and the polyP chains — and the network's
                  stoichiometry turns rates into changes of state:
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <DisplayMath
                tex="\frac{d\mathbf X}{dt} = \mathbf{N}\,\mathbf v(\mathbf X, \mathbf p)"
                label="6"
              />
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  Here <InlineMath tex="\mathbf X" /> is the concentration
                  vector, <InlineMath tex="\mathbf N" /> the stoichiometric
                  matrix of the <em>reduced</em> network, and{" "}
                  <InlineMath tex="\mathbf v(\mathbf X, \mathbf p)" /> the
                  rates, which now depend on concentrations and on a parameter
                  vector <InlineMath tex="\mathbf p" />. It is the same matrix
                  equation as the steady-state balance of section 1, with the
                  right-hand side no longer set to zero: that is the whole
                  difference between asking what fluxes are possible and asking
                  what happens next.
                </p>

                <p>
                  Most reactions in the reduced network are irreversible and
                  have several substrates, and take a Michaelis–Menten form
                  written as a product of saturation terms, one per substrate
                  <Cite n={3} />:
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <DisplayMath
                tex="v = V_{\max}\,\prod_{i=1}^{n} \frac{[S_i]}{K_{m,i}+[S_i]}"
                label="7"
              />
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  Each term saturates on its own substrate, so a module slows
                  down when any one of the things it needs runs short — which is
                  the behaviour the model exists to capture: polyP synthesis
                  competing with everything else for the same ATP. The two
                  central blocks carry product inhibition on top of this, a
                  factor <InlineMath tex="1/(1+[P_j]/K_{i,j})" /> for each of
                  ATP, NADH and Q8H₂, so a pathway is slowed by what it has
                  already made.
                </p>

                <p>
                  Three processes are not written this way, and the reasons are
                  physical rather than cosmetic. <strong>ATP synthase</strong>{" "}
                  takes a reversible bi-bi law, so it can run in either
                  direction; it is macroscopic on purpose, with the pH gradient
                  and the membrane potential left out of the description rather
                  than modelled explicitly
                  <Cite n={3} />. The <strong>Pit symporter</strong> is
                  reversible mass action in protons and phosphate on both sides
                  of the membrane, which is what makes the proton gradient
                  actually drive the uptake instead of being assumed away. And
                  the movements that are not catalysed at all — phosphate,
                  protons, O₂, CO₂ and water crossing between compartments — are{" "}
                  <strong>linear diffusion</strong>. ATP maintenance, by
                  contrast, is an ordinary saturating law in ATP
                  <Cite n={10} />, not a constant drain. Every module's law is
                  tabulated below.
                </p>
              </div>

              <div className="model-network__subsection">
                <AccordionSection title="Table 2 — Rate law of each flux">
                  <div className="model-network__table-scroll">
                    <table className="model-network__table">
                      <thead>
                        <tr>
                          <th scope="col">Flux</th>
                          <th scope="col">Law</th>
                          <th scope="col">Form</th>
                          <th scope="col">After</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <InlineMath tex="v_{\mathrm{ED}}" />
                          </th>
                          <td>
                            <InlineMath tex="V_{\max}\prod_i \frac{[S_i]}{K_{m,i}+[S_i]}\prod_j \frac{1}{1+[P_j]/K_{i,j}}" />
                          </td>
                          <td>Multi-substrate with product inhibition</td>
                          <td>—</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <InlineMath tex="v_{\mathrm{TCA}}" />
                          </th>
                          <td>
                            <InlineMath tex="V_{\max}\prod_i \frac{[S_i]}{K_{m,i}+[S_i]}\prod_j \frac{1}{1+[P_j]/K_{i,j}}" />
                          </td>
                          <td>Multi-substrate with product inhibition</td>
                          <td>—</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <InlineMath tex="v_{\mathrm{NDH}}" />
                          </th>
                          <td>
                            <InlineMath tex="V_{\max}\frac{[\mathrm{NADH}]}{K_{m,\mathrm{NADH}}+[\mathrm{NADH}]}\frac{[\mathrm{Q8}]}{K_{m,\mathrm{Q8}}+[\mathrm{Q8}]}" />
                          </td>
                          <td>Two-substrate</td>
                          <td>Hameri et al.</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <InlineMath tex="v_{\mathrm{CYT}}" />
                          </th>
                          <td>
                            <InlineMath tex="V_{\max}\frac{[\mathrm{Q8H_2}]}{K_{m}+[\mathrm{Q8H_2}]}\frac{[\mathrm{O_2}]}{K_{m,\mathrm{O_2}}+[\mathrm{O_2}]}" />
                          </td>
                          <td>Two-substrate</td>
                          <td>Hameri et al.</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <InlineMath tex="v_{\mathrm{ATPS}}" />
                          </th>
                          <td>
                            <InlineMath tex="\frac{V^{f}\frac{[\mathrm{ADP}]}{K_{m,\mathrm{ADP}}}\frac{[\mathrm{P_i}]}{K_{m,\mathrm{P_i}}}-V^{b}\frac{[\mathrm{ATP}]}{K_{m,\mathrm{ATP}}}}{\left(1+\frac{[\mathrm{ADP}]}{K_{m,\mathrm{ADP}}}\right)\left(1+\frac{[\mathrm{P_i}]}{K_{m,\mathrm{P_i}}}\right)+\left(1+\frac{[\mathrm{ATP}]}{K_{m,\mathrm{ATP}}}\right)-1}" />
                          </td>
                          <td>Reversible bi-bi</td>
                          <td>Hameri et al.</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <InlineMath tex="v_{\mathrm{ATPM}}" />
                          </th>
                          <td>
                            <InlineMath tex="V_{\mathrm{ATPM}}\frac{[\mathrm{ATP}]}{K_{m,\mathrm{ATP}}+[\mathrm{ATP}]}" />
                          </td>
                          <td>Irreversible Michaelis–Menten</td>
                          <td>Nakano et al.</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <InlineMath tex="v_{\mathrm{Pit}}" />
                          </th>
                          <td>
                            <InlineMath tex="k_f[\mathrm{H^+_p}][\mathrm{P_{i,p}}]-k_r[\mathrm{H^+_c}][\mathrm{P_{i,c}}]" />
                          </td>
                          <td>Reversible mass action</td>
                          <td>Hameri et al.</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <InlineMath tex="v_{\mathrm{ABC}}" />
                          </th>
                          <td>
                            <InlineMath tex="V_{\max}\frac{[\mathrm{ATP}]}{K_{m,\mathrm{ATP}}+[\mathrm{ATP}]}\frac{[\mathrm{P_i^e}]}{K_{m,\mathrm{P_i}}+[\mathrm{P_i^e}]}" />
                          </td>
                          <td>Two-substrate</td>
                          <td>—</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <InlineMath tex="v_{\mathrm{PPK}},\ v_{\mathrm{PPK2}},\ v_{\mathrm{PPK50}}" />
                          </th>
                          <td>
                            <InlineMath tex="V_{\max}\frac{[\mathrm{ATP}]}{K_{m,\mathrm{ATP}}+[\mathrm{ATP}]}\frac{[\mathrm{P}_n]}{K_{m,n}+[\mathrm{P}_n]}" />
                          </td>
                          <td>Two-substrate</td>
                          <td>Hameri et al. (first two)</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <InlineMath tex="v_{\mathrm{diff}}" />
                          </th>
                          <td>
                            <InlineMath tex="k\left([S^{\mathrm{out}}]-[S^{\mathrm{in}}]\right)" />
                          </td>
                          <td>Linear diffusion</td>
                          <td>—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="model-network__table-note">
                    "After" names where the functional form comes from; the
                    constants themselves are a separate question, taken up in
                    5.4. Diffusion applies to phosphate, protons, O₂, CO₂ and
                    water between compartments.
                  </p>
                </AccordionSection>

                <AccordionSection title="Table 3 — The differential equations">
                  <p className="model-network__table-note">
                    The reduced model in full: one equation per species, each
                    the sum of the fluxes above weighted by their stoichiometry.
                    The 47 on the elongation step is the forty-seven phosphates
                    that step adds in one go.
                  </p>
                  <div className="model-network__odes">
                    <DisplayMath tex="\frac{d[\mathrm{Q8H_2}]}{dt} = v_{\mathrm{NDH}} + v_{\mathrm{ED}} + v_{\mathrm{TCA}} - v_{\mathrm{CYT}}" />
                    <DisplayMath tex="\frac{d[\mathrm{ATP}]}{dt} = v_{\mathrm{ATPS}} + v_{\mathrm{ED}} + v_{\mathrm{TCA}} - v_{\mathrm{ATPM}} - v_{\mathrm{ABC}} - v_{\mathrm{PPK}} - v_{\mathrm{PPK2}} - 47\,v_{\mathrm{PPK50}}" />
                    <DisplayMath tex="\frac{d[\mathrm{P_{i,c}}]}{dt} = -v_{\mathrm{ATPS}} - v_{\mathrm{ED}} - v_{\mathrm{TCA}} + v_{\mathrm{ATPM}} + v_{\mathrm{Pit}} + 2\,v_{\mathrm{ABC}} - v_{\mathrm{PPK}}" />
                    <DisplayMath tex="\frac{d[\mathrm{PP_i}]}{dt} = v_{\mathrm{PPK}} - v_{\mathrm{PPK2}}, \qquad \frac{d[\mathrm{PPP_i}]}{dt} = v_{\mathrm{PPK2}} - v_{\mathrm{PPK50}}, \qquad \frac{d[\mathrm{PolyP}_{50}]}{dt} = v_{\mathrm{PPK50}}" />
                    <DisplayMath tex="\frac{d[\mathrm{NADH}]}{dt} = -v_{\mathrm{NDH}} + v_{\mathrm{ED}} + 4\,v_{\mathrm{TCA}}, \qquad \frac{d[\mathrm{Pyr}]}{dt} = 2\,v_{\mathrm{ED}} - v_{\mathrm{TCA}}" />
                    <DisplayMath tex="\frac{d[\mathrm{H^+_p}]}{dt} = -4\,v_{\mathrm{ATPS}} + 3\,v_{\mathrm{NDH}} + 4\,v_{\mathrm{CYT}} + v_{\mathrm{H,diff}} - v_{\mathrm{Pit}}" />
                  </div>
                  <p className="model-network__table-note">
                    Six of the sixteen equations, chosen because they carry the
                    couplings the rest of the page talks about; the remaining
                    ten — Q8, ADP, NAD⁺, external and periplasmic phosphate,
                    glucose, O₂, CO₂ and water — follow the same pattern.
                  </p>
                </AccordionSection>
              </div>

              <div
                id="polyp-polymerisation"
                className="model-network__subsection"
              >
                <h3>5.3 Representing PolyP polymerisation</h3>

                <p>
                  PolyP is a linear polymer of orthophosphates, and the chains
                  bacteria build are long — up to roughly a thousand units{" "}
                  <Cite n={11} />. A model that followed every chain length
                  would need a state variable per length; the distribution at
                  equilibrium is exponential,{" "}
                  <InlineMath tex="[a_n] = K\exp(-n/n_0)" />, with the
                  characteristic length <InlineMath tex="n_0" /> set by how much
                  phosphate is available. Rather than carry that distribution,
                  the model represents polymerisation as{" "}
                  <strong>three enzyme-mediated steps</strong>: dimerisation,
                  trimerisation, and a single elongation step standing for
                  everything that follows, written as the formation of PolyP₅₀.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <DisplayMath
                tex="\mathrm{P_i} \;\xrightarrow{\ \mathrm{PPK}\ }\; \mathrm{PP_i} \;\xrightarrow{\ \mathrm{PPK2}\ }\; \mathrm{PPP_i} \;\xrightarrow{\ \mathrm{PPK50r}\ }\; \mathrm{PolyP}_{50}"
                label="8"
              />
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  Each step spends ATP, and each carries a multi-substrate law
                  in ATP and in the short chain it extends — so the three steps
                  draw on the same ATP pool that respiration fills and
                  maintenance drains, which is the coupling the whole model was
                  built to show. The last step is the crude one: one reaction
                  standing for forty-seven additions. It keeps the phosphorus
                  balance honest — fifty phosphates in, fifty accounted for —
                  but it cannot say anything about chain length, and a kinetics
                  of elongation that depends on the degree of polymerisation is
                  the natural way to improve it.
                </p>
              </div>

              <div id="parameterisation" className="model-network__subsection">
                <h3>5.4 Parameterisation and data sources</h3>

                <p>
                  Finding values for <InlineMath tex="V_{\max}" />,{" "}
                  <InlineMath tex="K_m" /> and <InlineMath tex="K_i" /> is the
                  hardest part of this kind of model, and the place where it is
                  easiest to be dishonest about how much is known. The values
                  used here were taken from the literature and from enzyme
                  databases, principally BRENDA <Cite n={12} />, under an
                  explicit rule: prefer the measurement closest to this organism
                  and this function. In order, <em>P. putida</em> KT2440 first;
                  then other <em>Pseudomonas</em>, mainly <em>P. aeruginosa</em>
                  ; and <em>E. coli</em> only as a last resort. The polyP
                  enzymes are the exception: for those, values come from other
                  well-characterised accumulating organisms, such as{" "}
                  <em>Candidatus</em> Accumulibacter. The initial conditions of
                  the medium are not from the literature at all — they come from
                  data provided by Bio-Oils Huelva, the industrial effluent this
                  project is aimed at.
                </p>

                <p>
                  Two consequences are worth stating plainly. A lumped module's
                  constants are <strong>effective parameters</strong>: they
                  describe the group's catalytic behaviour, not a single
                  enzyme's, so they cannot be looked up — they have to be
                  determined. And a parameter borrowed from <em>E. coli</em> is
                  an assumption, not a measurement. The model is therefore a
                  design-stage instrument, built to be recalibrated: the
                  sensitivity analysis is what says which parameters are worth
                  measuring first, and fluxomic and metabolomic data of our own
                  would be what turns the rest into numbers.
                </p>
              </div>

              <div className="model-network__subsection">
                <p>
                  The simulations themselves run in COPASI <Cite n={13} />, on
                  the reduced network described above; the constraint-based work
                  of the earlier sections used COBRApy, with the maps drawn in
                  Escher.
                </p>
              </div>

              <div className="model-network__subsection">
                <AccordionSection title="References">
                  <ol className="model-reference-list">
                    <li id="model-ref-10">
                      Nakano, A., Kishikawa, J.-I., Mitsuoka, K. &amp; Yokoyama,
                      K. (2023). Mechanism of ATP hydrolysis dependent rotation
                      of bacterial ATP synthase.{" "}
                      <em>Nature Communications, 14</em> (1), 4090. DOI:{" "}
                      <a
                        href="https://doi.org/10.1038/s41467-023-39742-5"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1038/s41467-023-39742-5
                      </a>
                    </li>
                    <li id="model-ref-11">
                      Tobin, K. M., McGrath, J. W., Mullan, A., Quinn, J. P.
                      &amp; O'Connor, K. E. (2006). Polyphosphate accumulation
                      by <em>Pseudomonas putida</em> CA-3 and other
                      medium-chain-length polyhydroxyalkanoate-accumulating
                      bacteria under aerobic growth conditions.{" "}
                      <em>Applied and Environmental Microbiology, 73</em> (4),
                      1383–1387. DOI:{" "}
                      <a
                        href="https://doi.org/10.1128/aem.02007-06"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1128/aem.02007-06
                      </a>
                    </li>
                    <li id="model-ref-12">
                      Hauenstein, J., Jeske, L., Jäde, A., Krull, M., Dümmer,
                      K., Koblitz, J., Tietz, A., Jahn, D., Reimer, L. C. &amp;
                      Bunk, B. (2025). BRENDA in 2026: a Global Core Biodata
                      Resource for functional enzyme and metabolic data within
                      the DSMZ Digital Diversity.{" "}
                      <em>Nucleic Acids Research, 54</em> (D1), D527–D534. DOI:{" "}
                      <a
                        href="https://doi.org/10.1093/nar/gkaf1113"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1093/nar/gkaf1113
                      </a>
                    </li>
                    <li id="model-ref-13">
                      Hoops, S., Sahle, S., Gauges, R., Lee, C., Pahle, J.,
                      Simus, N., Singhal, M., Xu, L., Mendes, P. &amp; Kummer,
                      U. (2006). COPASI — a COmplex PAthway SImulator.{" "}
                      <em>Bioinformatics, 22</em> (24), 3067–3074. DOI:{" "}
                      <a
                        href="https://doi.org/10.1093/bioinformatics/btl485"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1093/bioinformatics/btl485
                      </a>
                    </li>
                  </ol>
                </AccordionSection>
              </div>
            </div>
          </section>

          <section id="dynamic-simulation" className="model-network">
            <div className="model-network__intro">
              <h2>6. Simulating phosphate uptake and PolyP accumulation</h2>
              <p>
                With the network reduced and the rate laws written down, the
                model can finally be run. It is worth being explicit about what
                we are asking of it at this stage: not a quantitative
                prediction. The parameters come from several organisms and
                several conditions (5.4), so a number this model produces is not
                a number we would defend. What we <em>can</em> ask is whether
                the system behaves the way a phosphate-accumulating organism is
                supposed to behave — whether phosphate leaves the medium,
                whether it ends up as polymer inside the cell, whether the
                energy carriers stay physically sensible while it happens. That
                is the test this section runs.
              </p>
            </div>

            <div className="model-network__intro">
              <div id="time-evolution" className="model-network__subsection">
                <h3>6.1 Time evolution of the system</h3>

                <p>
                  The simulation follows the species that carry the phosphate
                  and the energy to move it: phosphate in the medium and in the
                  cytoplasm, the ATP/ADP and NADH/NAD⁺ pairs, the short chains
                  PP<sub>i</sub> and PPP<sub>i</sub>, and the long-chain product
                  PolyP₅₀. Their concentrations span four orders of magnitude,
                  which is why Figure 12 is split across three vertical scales
                  rather than compressed into one.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <ConcentrationCourses />
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  The qualitative picture is the one we were looking for.
                  Phosphate is taken up progressively from the medium,
                  cytoplasmic phosphate rises, and polyphosphate accumulates.
                  Two checks on the arithmetic come for free: the sums ATP + ADP
                  and NADH + NAD⁺ each stay constant for the whole run, so the
                  model conserves its moieties, and it keeps doing so across
                  every step of the parameter scan. A model that silently
                  created or destroyed adenine nucleotides would be telling us
                  nothing, however good the phosphate curves looked.
                </p>

                <p>
                  The curves also flatten. The approach to a plateau is not the
                  system running out of phosphate — it is the enzymes reaching
                  the saturation region of their own kinetics. At low substrate
                  concentrations (<InlineMath tex="[S] \ll K_m" />) a
                  Michaelis–Menten reaction is approximately first order in
                  substrate; as the enzyme saturates, the slope falls away until
                  the rate approaches <InlineMath tex="V_{\max}" /> and the
                  reaction becomes zero order <Cite n={16} />. The plateau in
                  Figure 12 is that transition, read off a whole network rather
                  than a single enzyme.
                </p>
              </div>

              <div id="uptake-pulse" className="model-network__subsection">
                <h3>6.2 A transient phosphate-uptake pulse</h3>

                <p>
                  The concentration curves hide the most interesting part of the
                  dynamics, because a quantity that rises smoothly can be fed by
                  a flux that does not. Figure 13 plots the fluxes themselves
                  over the first 2 000 s — the three routes phosphate takes into
                  the cell on one side, the three polymerisation steps on the
                  other.
                </p>
              </div>
            </div>

            <div className="model-network__wide">
              <PhosphateFluxes />
            </div>

            <div className="model-network__intro">
              <div className="model-network__subsection">
                <p>
                  The P<sub>i</sub>/H⁺ symport opens with a sharp spike an order
                  of magnitude above its own steady level, decays over a few
                  hundred seconds and settles just below the passive diffusion
                  flux; PPK, PPK2 and the elongation step follow it with a
                  rounder pulse of their own, peaking around 100–200 s. The ABC
                  transporter contributes essentially nothing over this window.
                </p>

                <p>
                  That opening spike is the behaviour the whole project is built
                  around. <strong>Luxury uptake</strong> — a cell transporting
                  far more phosphate than its immediate growth requires, and
                  storing the excess as polyphosphate — has been observed
                  experimentally in batch cultures <Cite n={14} /> and described
                  in kinetic models of phosphate-accumulating microalgae{" "}
                  <Cite n={15} />. The reduced model reproduces it without
                  having been built to: it falls out of a phosphate pool that
                  starts far from equilibrium and a polymerisation sink that can
                  absorb what comes in.
                </p>
              </div>

              <div id="energy-polyp" className="model-network__subsection">
                <h3>6.3 Energy availability shapes PolyP accumulation</h3>

                <p>
                  Every polymerisation step spends ATP, so the obvious
                  expectation is that a cell better at regenerating ATP should
                  accumulate more polyphosphate. We tested it directly by
                  scanning <InlineMath tex="V_{\max,\mathrm{ATPS}}" /> — the
                  capacity of ATP synthase — over 0.001–2 µmol L⁻¹ s⁻¹, chosen
                  because it is one of the parameters the flux of PPK, PPK2 and
                  PPK50r responds to most strongly. The slider on Figure 12
                  steps through that scan.
                </p>

                <p>
                  The expectation is wrong, and instructively so. Raising{" "}
                  <InlineMath tex="V_{\max,\mathrm{ATPS}}" /> <em>lowers</em>{" "}
                  the polyphosphate accumulated. The reason is that ATP synthase
                  does not make ATP out of nothing: it spends the proton
                  gradient. A more active synthase draws down the proton-motive
                  force, and the P<sub>i</sub>/H⁺ symport — the route that
                  brings most of the phosphate in — is driven by exactly that
                  gradient. Its flux falls, phosphate entry becomes the limiting
                  step, and the extra ATP has less substrate to work on.
                </p>

                <p>
                  This is the kind of thing a kinetic model is for. A
                  constraint-based picture of the same network treats ATP supply
                  and phosphate transport as independent capacities; the dynamic
                  model makes them compete for the same proton gradient, and the
                  competition reverses the sign of the effect. For the design,
                  it says that engineering ATP regeneration on its own is not a
                  route to more polyP — the transport step has to be considered
                  in the same breath.
                </p>
              </div>

              <div className="model-network__subsection">
                <AccordionSection title="References">
                  <ol className="model-reference-list">
                    <li id="model-ref-14">
                      Plouviez, M., Fernández, E., Grossman, A. R., Sanz-Luque,
                      E., Sells, M., Wheeler, D. &amp; Guieysse, B. (2021).
                      Responses of <em>Chlamydomonas reinhardtii</em> during the
                      transition from P-deficient to P-sufficient growth (the
                      P-overplus response): The roles of the vacuolar transport
                      chaperones and polyphosphate synthesis.{" "}
                      <em>Journal of Phycology, 57</em> (3), 988–1003. DOI:{" "}
                      <a
                        href="https://doi.org/10.1111/jpy.13145"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1111/jpy.13145
                      </a>
                    </li>
                    <li id="model-ref-15">
                      John, E. H. &amp; Flynn, K. J. (2000). Modelling phosphate
                      transport and assimilation in microalgae; how much
                      complexity is warranted?{" "}
                      <em>Ecological Modelling, 125</em> (2–3), 145–157. DOI:{" "}
                      <a
                        href="https://doi.org/10.1016/s0304-3800(99)00178-7"
                        target="_blank"
                        rel="noreferrer"
                      >
                        10.1016/s0304-3800(99)00178-7
                      </a>
                    </li>
                    <li id="model-ref-16">
                      Doran, P. M. (2013).{" "}
                      <em>Bioprocess Engineering Principles</em>. Academic
                      Press.
                    </li>
                  </ol>
                </AccordionSection>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
