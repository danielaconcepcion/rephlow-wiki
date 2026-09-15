import { lazy, Suspense, useRef } from "react";
import {
  PageSectionNav,
  type PageSection,
} from "../../components/PageSectionNav";
import { FactorExplorer } from "./FactorExplorer";
import { PhaseInteractionExplorer } from "./PhaseInteractionExplorer";
import { GrowthPolypSurface } from "./GrowthPolypSurface";
import { FBAPrimer } from "./FBAPrimer";
import { ModelBackground } from "./ModelBackground";
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

const MODEL_SECTIONS: PageSection[] = [
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
        <section id="fba-primer" className="model-network" ref={contentRef}>
          <div className="model-network__intro">
            <h2>How flux balance analysis works</h2>
            <p>
              Every analysis on this page rests on the same computational
              idea: flux balance analysis (FBA). Before presenting our own
              results, it is worth walking through what FBA actually
              computes — geometrically, not just as an optimization
              statement. Step through the five stages below to see how a
              handful of linear constraints carve a single feasible region
              for reaction fluxes out of an otherwise unconstrained space.
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
                available to an organism and uses their stoichiometry to predict
                how metabolites can flow through the cell. We used the iJN1463
                reconstruction of <em>Pseudomonas putida</em> KT2440 and
                parsimonious flux balance analysis (pFBA) to calculate
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
                absolute predicted flux on a logarithmic scale, making the most
                active routes easier to identify.
              </p>
              <p>
                A genome-scale network is too dense to interpret if every
                possible connection is displayed at once. To keep the
                visualization readable, we omit reactions whose predicted flux
                is zero, remove cofactor nodes and then discard metabolites or
                reactions left without a connection. These elements are removed
                only from the displayed graph: every simulation is still solved
                using the complete metabolic model.
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
                reference growth rate. You can then explore one perturbation at
                a time: nutrient-uptake bounds, selected strain designs, or
                constraints on PPK1 capacity and ATP maintenance. The{" "}
                <strong>Predicted state</strong> summary reports the resulting
                growth, PolyP production and nutrient uptake rates.
              </p>
              <p>
                Zoom or pan to navigate the network, drag a node to rearrange
                its neighbourhood, and hover or tap to inspect reaction and
                metabolite details. When a new scenario is selected, shared node
                positions and the current view are preserved while changes in
                topology and flux are animated. Each control position
                corresponds to a precomputed pFBA scenario; filters from
                different sections are not combined.
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
              one-factor-at-a-time approach identifies thresholds and saturation
              regions before any interaction between variables is considered.
            </p>

            <div
              id="sensitivity-framework"
              className="model-network__subsection"
            >
              <h3>2.1 A common framework for sensitivity analysis</h3>
              <p>
                All simulations used the Phase B medium defined previously. The
                model maximized flux through <code>DM_ppi50_c</code>, the demand
                reaction representing a PolyP chain containing 50 phosphate
                units, using parsimonious flux balance analysis (pFBA) to select
                a representative solution requiring the lowest total metabolic
                flux.
              </p>
              <p>
                Maximizing PolyP without any biomass requirement could produce a
                metabolically inactive, non-growing solution. We therefore
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
                The interactive network above (Figure 1) can be used to inspect
                the flux distribution behind any of these scenarios directly, by
                selecting the matching filters in its <strong>Filters</strong>{" "}
                panel.
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
                      Nitrogen limitation creates capacity for storage but does
                      not induce it
                    </td>
                  </tr>
                  <tr>
                    <td>Phosphate</td>
                    <td>
                      Approximately linear increase followed by saturation
                    </td>
                    <td>
                      Reference PolyP capacity is reached around the Phase B Pi
                      bound
                    </td>
                    <td>
                      Phosphate transport is a direct determinant of
                      accumulation
                    </td>
                  </tr>
                  <tr>
                    <td>Oxygen</td>
                    <td>PolyP capacity rises with respiratory availability</td>
                    <td>Plateau around 30 mmol gDW⁻¹ h⁻¹</td>
                    <td>Oxygen transfer can limit accumulation</td>
                  </tr>
                  <tr>
                    <td>ATP maintenance</td>
                    <td>
                      High energetic demand progressively reduces PolyP capacity
                    </td>
                    <td>Decline begins after the low-demand plateau</td>
                    <td>
                      Severe energetic burden competes with phosphate storage
                    </td>
                  </tr>
                  <tr>
                    <td>PPK1 capacity</td>
                    <td>Proportional response up to the reference capacity</td>
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
                directly shape PolyP accumulation and revealed where individual
                responses saturate. They also motivated the interaction
                analyses presented next: glucose × oxygen, phosphate ×
                glucose, phosphate × oxygen, phosphate × PPK1 capacity, and
                ATP maintenance × oxygen.
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
              of that ceiling remains reachable once biomass formation is
              also required, and what the model has to redistribute
              internally to sustain both at once.
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
                A production envelope varies growth and PolyP
                simultaneously: for each growth rate between zero and a
                carbon source's own maximum, the model maximizes PolyP flux.
                Five carbon sources — glucose, acetate, glycerol, succinate
                and pyruvate — were compared twice: once at equal molar
                uptake, and once with uptake normalized to equal total
                carbon input, to separate a genuine substrate effect from a
                simple carbon-supply effect.
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
                    Glucose and glycerol both reach the same ≈2.0 mmol
                    gDW⁻¹ h⁻¹ ceiling at zero growth, and glucose sustains
                    that ceiling almost without loss across the{" "}
                    <em>entire</em> growth range, up to the Phase B
                    reference maximum (0.0941 h⁻¹). Glycerol declines
                    gradually to ≈1.75; succinate from ≈1.89 to ≈1.47;
                    pyruvate from ≈1.44 to ≈1.01; and acetate falls the most
                    steeply, from ≈1.00 to ≈0.56. Growth does not
                    immediately force PolyP down — but it increasingly
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
                    Plotted on the same absolute scale as Figure 4a, the
                    five curves collapse onto essentially one line,
                    differing by no more than ≈0.002 mmol gDW⁻¹ h⁻¹ across
                    the whole growth range — visually indistinguishable at
                    this resolution.
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
                Checking which constraint is active at the plain PolyP
                optimum (no growth requirement, equal molar carbon uptake)
                shows phosphate uptake pinned at its lower bound, while no
                carbon-source or oxygen exchange sits at a bound. Phosphate,
                not carbon or oxygen, is what caps PolyP here — which is why
                repeating the equal-carbon-input envelopes across a range of
                phosphate bounds collapses all five carbon sources onto one
                flat, phosphate-proportional curve at every bound tested:
                once phosphate is the active constraint, carbon identity
                stops mattering.
              </p>

              <p>
                To see the carbon-source differences again — and how they
                depend on growth <em>and</em> phosphate together — the same
                phosphate-bound sweep was recomputed at equal{" "}
                <em>molar</em> uptake instead of equal carbon input. This is
                a distinct simulation set from the phosphate-normalized
                comparison just above, not the same data replotted: five
                surfaces, one per carbon source, each tracing PolyP flux over
                growth rate and maximum phosphate uptake. Every plotted point
                is a real production-envelope solution; the translucent
                surfaces only connect neighboring points and imply no extra
                resolution between them.
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
                explicit third axis, and the analysis traces a full
                production envelope rather than a single two-dimensional
                optimum surface.
              </p>
            </div>

            <div
              id="metabolic-redistribution"
              className="model-network__subsection"
            >
              <h3>3.2 Metabolic redistribution and solution flexibility</h3>

              <p>
                <strong>How does the network accommodate growth?</strong> To
                see what changes internally, three parsimonious flux
                solutions were compared: PolyP maximized with no growth
                requirement, and the same objective with a 20% and a 60%
                growth floor (fractions of the Phase B maximum growth rate,
                0.0941 h⁻¹) — the same two growth-floor scenarios available
                as "20% growth + PolyP" and "60% growth + PolyP" objectives
                in the interactive network's <strong>Filters</strong> panel
                above.
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
                respiration or transport — ATP synthase (ATPS4rpp),
                cytochrome oxidase (CYTBO3_4pp), NADH dehydrogenase
                (NADH16pp), oxygen transport, and water/CO₂ exchange — and
                each grows further from the 20% to the 60% growth condition.
                The model therefore accommodates moderate growth mainly by
                intensifying respiration, ATP production, transport and
                nutrient uptake, well before it makes any large cut to PolyP
                flux itself.
              </p>

              <p>
                <strong>Is the displayed flux map unique?</strong> A single
                pFBA solution — like the one shown in the network viewer
                above — is only one point in a larger feasible space. Flux
                variability analysis (FVA) and flux sampling examine that
                space from two complementary angles under identical
                constraints: PolyP fixed at ≥99% of its Phase B optimum
                (1.9998 mmol gDW⁻¹ h⁻¹), the same 10% residual-growth floor
                used throughout this page, and total flux capped at 110% of
                the parsimonious minimum — a constraint needed because the
                model's large reversible PPK cycle can otherwise carry
                arbitrary loop flux without changing any output. FVA reports
                each reaction's minimum–maximum range under these
                constraints; sampling (1000 samples, ACHR, thinning 100,
                seed 42) draws feasible states from the same space and
                reports their median and interquartile range. Sampled
                frequency is not a biological probability — it only
                describes the geometry of the constrained solution space.
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
                representative near-optimal states cluster tightly around
                the pFBA point for essentially all of these reactions —
                including the ones FVA marks as wide. The network's overall
                objective and exchange pattern is therefore robust, but the
                exact internal route — particularly how phosphate is
                imported and how the reversible PPK cycle balances — retains
                real flexibility that a single flux map cannot show. The
                pFBA solution in the viewer above should be read as{" "}
                <em>a</em> representative parsimonious solution, not the
                unique feasible one.
              </p>
            </div>

            <div className="model-network__intro">
              <p>
                <strong>Implications for Phase B.</strong> Moderate growth
                can coexist with a PolyP flux close to its optimum. Sustaining
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
        </main>
      </div>
    </div>
  );
}
