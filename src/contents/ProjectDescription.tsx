import { PageSectionNav, type PageSection } from "../components/PageSectionNav";
import { Callout } from "../components/Callout";
import { VisualIndex } from "../components/OurSolutionVisualIndex";
import { asset } from "../utils/asset";
import "./ProjectDescription.css";

const PROJECT_DESCRIPTION_SECTIONS: PageSection[] = [
  {
    id: "problem-eutrophication",
    label: "The problem: eutrophication",
    children: [
      { id: "what-eutrophication-is", label: "What eutrophication is" },
      { id: "why-it-matters", label: "Why it matters" },
    ],
  },
  {
    id: "eutrophication-in-spain",
    label: "Eutrophication in Spain",
    children: [
      { id: "spain-vulnerability", label: "Why Spain is particularly vulnerable" },
      { id: "mar-menor-case-study", label: "The Mar Menor as a case study" },
    ],
  },
  {
    id: "european-measures",
    label: "Removal and regulatory gap",
    children: [
      { id: "chemical-precipitation", label: "Chemical precipitation" },
      { id: "stricter-limits", label: "Stricter limits" },
    ],
  },
  {
    id: "our-solution-visual-index",
    label: "Our Solution",
    children: [
      { id: "hardware", label: "Hardware" },
      { id: "encapsulation", label: "Bacterial encapsulation" },
      { id: "enzyme", label: "Enzyme immobilisation" },
      { id: "genetic", label: "Genetic engineering" },
      { id: "model", label: "Model" },
      { id: "revalorisation", label: "Revalorisation" },
    ],
  },
  {
    id: "project-objectives",
    label: "Project objectives",
  },
];

export function ProjectDescription() {
  return (
    <div className="page-with-section-nav">
      <PageSectionNav
        sections={PROJECT_DESCRIPTION_SECTIONS}
        ariaLabel="Jump to project description section"
      />

      <div className="pd-content-wrap">
        <div className="pd-content">
          {/* 1. The problem: eutrophication */}
          <section id="problem-eutrophication" className="pd-section">
            <h2>1. The problem: eutrophication</h2>

            <div id="what-eutrophication-is" className="pd-subsection">
              <h3>What eutrophication is</h3>
              <p>
                Phosphorus is essential to life. It forms part of DNA and RNA, drives cellular energy transfer through ATP, and contributes to the phospholipids that make up every cell membrane {" "}
              <a href="#problem-ref-1" className="vsi-citation">
                [1]
              </a>. Yet when it accumulates in water faster than an ecosystem can absorb it, the same element that sustains life begins to undermine it. The problem is not phosphorus itself, but what happens when it reaches environments where it does not belong, in quantities that natural systems can no longer process.
              </p>
              <p>
                This process is known as <strong>eutrophication</strong>: the enrichment of aquatic environments with nutrients, principally nitrogen and phosphorus, originating from agricultural runoff, urban sewage and industrial wastewater{" "}
              <a href="#problem-ref-2" className="vsi-citation">
                [2]</a>,{" "}
              <a href="#problem-ref-3" className="vsi-citation">
                [3]</a>. Phosphorus is often the limiting nutrient in freshwater systems, including rivers, lakes and reservoirs, whereas nitrogen generally plays a greater role in coastal and marine environments{" "}
              <a href="#problem-ref-4" className="vsi-citation">
                [4]
              </a>. This is why controlling phosphorus inputs is particularly important for protecting inland waters.
              </p>
              <div className="vsi-pair">
                <p>
                  Excess nutrient availability allows algae and cyanobacteria to grow beyond the capacity of the ecosystem to regulate them. Dense blooms prevent sunlight from reaching submerged vegetation. When this biomass dies and decomposes, the process consumes the dissolved oxygen on which fish, crustaceans and other aquatic organisms depend. Some blooms may also release toxins that threaten wildlife, livestock and human health{" "}
                  <a href="#problem-ref-2" className="vsi-citation">[2]</a>,{" "}
                  <a href="#problem-ref-3" className="vsi-citation">[3]</a>.
                </p>
                <figure className="vsi-figure">
                  <div className="vsi-figure--placeholder">
                    Photograph of a eutrophic water body or an algal-bloom process diagram
                  </div>
                  <figcaption className="vsi-figure__caption">
                    Eutrophication and algal-bloom development
                  </figcaption>
                </figure>
              </div>
              <p>Once submerged vegetation has disappeared and oxygen levels have fallen, the water body may shift into a degraded state that persists even after nutrient inputs are reduced. Eutrophication therefore behaves less like a single event and more like an ecological threshold: once crossed, it can be extremely difficult to reverse {" "}
              <a href="#problem-ref-3" className="vsi-citation">
                [3]
              </a>.</p>
            </div>

            <div id="why-it-matters" className="pd-subsection">
              <h3>Why it matters: A Global and Growing Imbalance</h3>
              <p>
                The scale of the problem is global. A 2021 review reported that <strong>63% of the inland water bodies assessed were already eutrophic</strong>, representing approximately <strong>31% of the world's inland-water area</strong> {" "}
              <a href="#problem-ref-5" className="vsi-citation">
                [5]
              </a>. 
              </p>
              <p>
                Separate satellite monitoring identified around <strong>1.15 million km² of coastal waters with eutrophication potential</strong>, with areas showing deterioration outnumbering those showing recovery by approximately two to one {" "}
              <a href="#problem-ref-6" className="vsi-citation">
                [6]
              </a>.
              </p>
            </div>

          </section>

          {/* 2. Eutrophication in Spain */}
          <section id="eutrophication-in-spain" className="pd-section">
            <h2>2. Eutrophication in Spain</h2>

            <div id="spain-vulnerability" className="pd-subsection">
              <h3>Why Spain is particularly vulnerable</h3>
              <p>
                Spain is especially exposed to nutrient pollution because
                of the intensity of some agricultural and livestock
                activities, together with the contribution of fertilisers,
                wastewater, and industrial discharges.
              </p>
              <div className="vsi-pair vsi-pair--reverse">
                <figure className="vsi-figure">
                  <div className="vsi-figure--placeholder">
                    Map of Spain highlighting nutrient-pollution hotspots and the Mar Menor
                  </div>
                  <figcaption className="vsi-figure__caption">
                    Areas vulnerable to nutrient pollution in Spain
                  </figcaption>
                </figure>
                <p>
                  These nutrient inputs can promote recurring algal blooms in
                  rivers, reservoirs, coastal lagoons, and other vulnerable
                  water bodies.
                </p>
              </div>
            </div>

            <div id="mar-menor-case-study" className="pd-subsection">
              <h3>The Mar Menor or “green soup”</h3>
              <div className="vsi-pair">
                <p>
                  Spain's own coastline demonstrates what these figures mean in
                  practice. In 2016, an intense phytoplankton bloom transformed
                  the Mar Menor lagoon into what became widely known as a{" "}
                  <strong>“green soup”</strong>{" "}
                  <a href="#problem-ref-7" className="vsi-citation">[7]</a>.
                  As the water became increasingly opaque, more than{" "}
                  <strong>80% of its seagrass meadows disappeared</strong>.
                  Further oxygen-depletion events in 2019 and 2021 caused the
                  mass mortality of fish, crustaceans and other aquatic
                  organisms{" "}
                  <a href="#problem-ref-7" className="vsi-citation">[7]</a>,{" "}
                  <a href="#problem-ref-8" className="vsi-citation">[8]</a>.
                </p>
                <figure className="vsi-figure">
                  <div className="vsi-figure--placeholder">
                    Photograph of the Mar Menor during a “green soup” event
                  </div>
                  <figcaption className="vsi-figure__caption">
                    The Mar Menor eutrophication crisis
                  </figcaption>
                </figure>
              </div>
              <p>
                The consequences extended beyond biodiversity. Local income
                fell by an estimated <strong>18.1%</strong> compared with
                unaffected areas, while surrounding property lost more than{" "}
                <strong>€4 billion in value</strong>{" "}
                <a href="#problem-ref-9" className="vsi-citation">[9]</a>,{" "}
                <a href="#problem-ref-10" className="vsi-citation">[10]</a>.
                The Mar Menor is not an isolated accident, but one visible
                example of an imbalance repeated across coastal and inland
                waters worldwide.
              </p>
            </div>

          </section>

          {/* 3. European measures to reduce eutrophication */}
          <section id="european-measures" className="pd-section">
            <h2>3. Current phosphorus removal and the regulatory gap</h2>

            <div id="chemical-precipitation" className="pd-subsection">
              <h3>Chemical precipitation: reliable removal, difficult recovery</h3>
              <p>
                Chemical precipitation is one of the most widely used methods
                for phosphorus removal because it is reliable, fast and
                relatively easy to integrate into existing wastewater-treatment
                plants. Iron or aluminium salts are added to the wastewater,
                where they react with dissolved phosphate and form insoluble
                particles that can be separated with the sludge. Unlike
                biological treatment, the process does not depend on maintaining
                a specialised microbial community and can tolerate changes in
                wastewater composition. Chemical dosing can also be adjusted
                rapidly and applied at different stages of treatment, making
                precipitation particularly useful as a polishing or back-up
                process when very low discharge concentrations must be achieved{" "}
                <a href="#problem-ref-11" className="vsi-citation">[11]</a>,{" "}
                <a href="#problem-ref-12" className="vsi-citation">[12]</a>.
              </p>
              <figure className="vsi-figure">
                <div className="vsi-figure--placeholder">
                  Diagram of phosphorus removal by chemical precipitation
                </div>
                <figcaption className="vsi-figure__caption">
                  Conventional chemical phosphorus removal
                </figcaption>
              </figure>
              <p>
                However, greater removal efficiency usually requires higher
                chemical doses, particularly when plants must reach very low
                phosphorus concentrations. This increases operating costs,
                consumes alkalinity, may lower wastewater pH and produces larger
                quantities of sludge that must be thickened, dewatered,
                transported and managed. Chemical precipitation also transfers
                phosphorus into a mixture of metal phosphates, hydroxides and
                other solids rather than isolating it. Once bound to iron or
                aluminium, phosphorus is less soluble and more difficult to
                recover, often requiring additional chemical, thermal or
                extraction processes. The method is therefore highly effective
                at meeting discharge limits, but it relies on continuous
                chemical inputs, generates secondary waste and frequently locks
                phosphorus into a form that is difficult and costly to reuse{" "}
                <a href="#problem-ref-13" className="vsi-citation">[13]</a>,{" "}
                <a href="#problem-ref-14" className="vsi-citation">[14]</a>.
              </p>
              <p>
                These technologies were built to remove phosphorus, not to
                recover it: they treat it as something to eliminate rather than
                something worth saving. That distinction carries weight beyond
                the environment. Phosphate rock is a finite resource, and its
                reserves are geographically concentrated, with Morocco alone
                holding an estimated <strong>70% of the world's known reserves</strong>.
                Every kilogram lost as sludge is a kilogram that must eventually
                be re-mined from an increasingly limited and geopolitically
                sensitive source.
              </p>
            </div>

            <div id="stricter-limits" className="pd-subsection">
              <h3>Stricter limits, but the same technological gap</h3>
              <p>This gap is becoming increasingly difficult to ignore.</p>
              <p>
                <strong>Directive (EU) 2024/3019</strong>, which will replace
                the current Urban Wastewater Treatment Directive from August
                2027, requires Member States to identify areas sensitive to
                eutrophication and progressively implement stricter
                phosphorus-removal requirements{" "}
                <a href="#problem-ref-15" className="vsi-citation">[15]</a>.
                The Directive establishes total-phosphorus limits of{" "}
                <strong>0.7 mg/L</strong> for treatment plants serving between
                10,000 and 150,000 population equivalents and{" "}
                <strong>0.5 mg/L</strong> for larger facilities, with
                implementation phased between 2033 and 2045{" "}
                <a href="#problem-ref-15" className="vsi-citation">[15]</a>.
              </p>
              <div className="vsi-pair vsi-pair--reverse">
                <figure className="vsi-figure">
                  <div className="vsi-figure--placeholder">
                    Timeline of Directive (EU) 2024/3019 phosphorus limits
                  </div>
                  <figcaption className="vsi-figure__caption">
                    Progressive implementation of stricter discharge limits
                  </figcaption>
                </figure>
                <p>
                  Industries discharging non-domestic wastewater into collecting
                  networks will therefore face increasing pressure to reduce
                  their nutrient loads before they reach municipal treatment
                  plants, rather than transferring the entire burden downstream.
                </p>
              </div>
              <p>
                These regulatory changes create urgency, but regulation alone
                cannot provide the technologies needed to meet the new
                requirements. A clear gap remains for treatment strategies that
                can achieve low phosphorus concentrations while remaining
                economically viable for industry, compatible with existing
                infrastructure and capable of preserving phosphorus for
                subsequent recovery.
              </p>
            </div>
          </section>

        </div>

        <div className="vsi-wrap">
          <section id="our-solution-visual-index" className="pd-section">
            <h2>4. Our solution: visual index</h2>

            <div className="pd-content vsi-intro">
              <div id="what-the-solution-is" className="pd-subsection">
                <h3>What the solution is</h3>
                <p>
                  A concise description of the proposed system and the
                  biological mechanism it uses.
                </p>
              </div>

              <div id="how-it-addresses-the-problem" className="pd-subsection">
                <h3>How it addresses the problem</h3>
                <p>
                  Explain how the project removes or recovers phosphate
                  before it reaches natural water bodies.
                </p>
              </div>

              <div id="why-this-approach-is-valuable" className="pd-subsection">
                <h3>Why this approach is valuable</h3>
                <p>
                  Compare the proposed solution with existing
                  nutrient-removal approaches and explain its potential
                  advantages.
                </p>
              </div>

              <p>
                This section should remain conceptual. Detailed experimental
                methods, constructs, modelling results, and validation should
                be developed on their respective pages.
              </p>
            </div>

            <VisualIndex />
          </section>
        </div>

        <div className="pd-content vsi-details">
          {/* 6. Hardware */}
          <section id="hardware" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Hardware</h2>
            <p>
              A modular rotating-bed bioreactor and filtration system for
              scalable phosphate capture and recovery.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. The
              reactor vessel is arranged as a rotating packed bed, moving
              encapsulated biomass continuously through the influent stream{" "}
              <a href="#ref-1" className="vsi-citation">
                [1]
              </a>
              . Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua, ut enim ad minim veniam quis nostrud.
            </p>

            <div className="vsi-pair">
              <p>
                Exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. This staged approach connects directly to the{" "}
                <a href="#encapsulation" className="vsi-wikilink">
                  bacterial encapsulation
                </a>{" "}
                layer upstream and to the{" "}
                <a href="#revalorisation" className="vsi-wikilink">
                  revalorisation
                </a>{" "}
                pipeline downstream{" "}
                <a href="#ref-2" className="vsi-citation">
                  [2]
                </a>
                . Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore.
              </p>
              <figure className="vsi-figure">
                <img
                  src={asset("assets/our-solution/biorreactor-bacteria.png")}
                  alt="Rotating-bed bioreactor with encapsulated bacteria"
                />
                <figcaption className="vsi-figure__caption">
                  Bioreactor module
                </figcaption>
              </figure>
            </div>

            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum.{" "}
              <strong>Flow rate and residence time</strong> are tuned per
              batch to balance throughput against capture efficiency.
            </p>

            <figure className="vsi-figure vsi-figure--full">
              <img
                src={asset("assets/our-solution/biorreactor-filtro.png")}
                alt="Filtration module"
              />
              <figcaption className="vsi-figure__caption">
                Filtration unit
              </figcaption>
            </figure>
          </section>

          {/* 7. Bacterial encapsulation */}
          <section id="encapsulation" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Bacterial encapsulation</h2>
            <p>
              Alginate core-shell beads keep the engineered bacteria
              contained, viable and reusable inside the reactor.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt. The{" "}
              <strong>core-shell geometry</strong> separates a nutrient-rich
              core from a protective diffusion shell{" "}
              <a href="#ref-3" className="vsi-citation">
                [3]
              </a>
              .
            </p>

            <div className="vsi-pair vsi-pair--reverse">
              <figure className="vsi-figure">
                <img
                  src={asset("assets/our-solution/coreshell-alginato.png")}
                  alt="Alginate core-shell bead"
                />
                <figcaption className="vsi-figure__caption">
                  Core-shell bead detail
                </figcaption>
              </figure>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Beads are
                sized to remain trapped by the reactor's{" "}
                <a href="#hardware" className="vsi-wikilink">
                  rotating-bed hardware
                </a>{" "}
                while permitting free exchange of substrate and product.
              </p>
            </div>

            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur{" "}
              <a href="#ref-4" className="vsi-citation">
                [4]
              </a>
              . Excepteur sint occaecat cupidatat non proident.
            </p>

            <figure className="vsi-figure">
              <div className="vsi-figure--placeholder">
                Reactor loading sequence placeholder
              </div>
              <figcaption className="vsi-figure__caption">
                Loading encapsulated bacteria into the reactor
              </figcaption>
            </figure>
          </section>

          {/* 8. Enzyme immobilisation */}
          <section id="enzyme" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Enzyme immobilisation</h2>
            <p>
              Immobilised phosphatases hydrolyse organic phosphate compounds,
              making phosphate available for capture.
            </p>

            <div className="vsi-pair">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Anchoring enzymes to the bead surface keeps them{" "}
                <strong>locally concentrated and reusable</strong> across
                cycles{" "}
                <a href="#ref-5" className="vsi-citation">
                  [5]
                </a>
                , avoiding the losses typical of free enzyme dosing.
              </p>
              <figure className="vsi-figure">
                <img
                  src={asset("assets/our-solution/enzima.png")}
                  alt="Enzyme icon"
                />
                <figcaption className="vsi-figure__caption">
                  Immobilised phosphatase
                </figcaption>
              </figure>
            </div>

            <p>
              Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Released inorganic phosphate then feeds the uptake
              pathway described under{" "}
              <a href="#genetic" className="vsi-wikilink">
                genetic engineering
              </a>
              .
            </p>

            <figure className="vsi-figure">
              <div className="vsi-figure--placeholder">
                Hydrolysis reaction placeholder
              </div>
              <figcaption className="vsi-figure__caption">
                Enzymatic release of inorganic phosphate
              </figcaption>
            </figure>
          </section>

          {/* 9. Genetic engineering */}
          <section id="genetic" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Genetic engineering</h2>
            <p>
              Engineered P. putida KT2440 increases phosphate uptake and
              stores it intracellularly as polyphosphate.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore. Overexpression of the{" "}
              <strong>polyphosphate kinase pathway</strong> drives
              intracellular storage{" "}
              <a href="#ref-6" className="vsi-citation">
                [6]
              </a>
              .
            </p>

            <div className="vsi-pair vsi-pair--reverse">
              <figure className="vsi-figure">
                <img
                  src={asset("assets/our-solution/bacteria-genetic.png")}
                  alt="Engineered bacterium"
                />
                <figcaption className="vsi-figure__caption">
                  Engineered P. putida
                </figcaption>
              </figure>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat, duis aute
                irure dolor in reprehenderit. Strain behaviour is validated
                against the predictions of the{" "}
                <a href="#model" className="vsi-wikilink">
                  model
                </a>{" "}
                before scale-up.
              </p>
            </div>

            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum{" "}
              <a href="#ref-7" className="vsi-citation">
                [7]
              </a>
              .
            </p>
          </section>

          {/* 10. Model */}
          <section id="model" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Model</h2>
            <p>
              Genome-scale and kinetic models guide genetic edits, operating
              conditions and phosphate-accumulation performance.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. The{" "}
              <strong>genome-scale metabolic model</strong> constrains flux
              through competing pathways{" "}
              <a href="#ref-8" className="vsi-citation">
                [8]
              </a>
              , informing which edits proposed under{" "}
              <a href="#genetic" className="vsi-wikilink">
                genetic engineering
              </a>{" "}
              are worth pursuing experimentally.
            </p>
            <p>
              Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua, ut enim ad minim veniam quis nostrud exercitation
              ullamco laboris nisi ut aliquip.
            </p>

            <figure className="vsi-figure">
              <div className="vsi-figure--placeholder">
                Visual layer for the model not yet available
              </div>
              <figcaption className="vsi-figure__caption">
                Metabolic and kinetic modelling workflow
              </figcaption>
            </figure>
          </section>

          {/* 11. Revalorisation */}
          <section id="revalorisation" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Revalorisation</h2>
            <p>
              Recovered phosphate is fed into a multi-enzyme cascade to
              produce higher-value compounds.
            </p>

            <div className="vsi-pair">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Recovered beads are unloaded from the{" "}
                <a href="#hardware" className="vsi-wikilink">
                  reactor hardware
                </a>{" "}
                and routed into a <strong>multi-enzyme cascade</strong>{" "}
                <a href="#ref-9" className="vsi-citation">
                  [9]
                </a>
                .
              </p>
              <figure className="vsi-figure">
                <img
                  src={asset("assets/our-solution/bacteria-encapsulada.png")}
                  alt="Recovered bead capsules"
                />
                <figcaption className="vsi-figure__caption">
                  Recovered capsules
                </figcaption>
              </figure>
            </div>

            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat, duis aute
              irure dolor in reprehenderit in voluptate.
            </p>

            <figure className="vsi-figure">
              <div className="vsi-figure--placeholder">
                Cascade-to-product sequence placeholder
              </div>
              <figcaption className="vsi-figure__caption">
                Revalorisation cascade and final product
              </figcaption>
            </figure>
          </section>

          {/* 5. Project objectives */}
          <section id="project-objectives" className="pd-section">
            <h2>5. Project objectives</h2>
            <p>
              End the page with a concise list of the project's main
              objectives.
            </p>
            <p>For example:</p>
            <ul>
              <li>develop a biological strategy for phosphate removal or recovery;</li>
              <li>optimise phosphate uptake and polyphosphate accumulation;</li>
              <li>evaluate the system experimentally and computationally;</li>
              <li>assess its relevance for nutrient-rich wastewater;</li>
              <li>contribute to a more circular use of phosphorus.</li>
            </ul>
          </section>

          {/* References */}
          <section id="references" className="pd-section">
            <h2>References</h2>
            <div className="pd-subsection">
              <h3>Problem</h3>
              <ol>
                <li id="problem-ref-1" className="vsi-ref">
                  Wagner, C. A. (2024). The basics of phosphate metabolism.
                  <em> Nephrology Dialysis Transplantation, 39</em>(2),
                  190–201. DOI:{" "}
                  <a className="vsi-wikilink" href="https://doi.org/10.1093/ndt/gfad188" target="_blank" rel="noreferrer">
                    10.1093/ndt/gfad188
                  </a>.
                </li>
                <li id="problem-ref-2" className="vsi-ref">
                  United States Environmental Protection Agency. (2026).
                  <em> Basic Information on Nutrient Pollution</em>. US EPA.
                </li>
                <li id="problem-ref-3" className="vsi-ref">
                  Wurtsbaugh, W. A., Paerl, H. W., &amp; Dodds, W. K. (2019).
                  Nutrients, eutrophication and harmful algal blooms along the
                  freshwater to marine continuum. <em>WIREs Water, 6</em>(5),
                  e1373. DOI:{" "}
                  <a className="vsi-wikilink" href="https://doi.org/10.1002/wat2.1373" target="_blank" rel="noreferrer">
                    10.1002/wat2.1373
                  </a>.
                </li>
                <li id="problem-ref-4" className="vsi-ref">
                  Smith, V. H., Tilman, G. D., &amp; Nekola, J. C. (1999).
                  Eutrophication: Impacts of excess nutrient inputs on
                  freshwater, marine, and terrestrial ecosystems.
                  <em> Environmental Pollution, 100</em>(1–3), 179–196.
                  DOI:{" "}
                  <a className="vsi-wikilink" href="https://doi.org/10.1016/S0269-7491(99)00091-3" target="_blank" rel="noreferrer">
                    10.1016/S0269-7491(99)00091-3
                  </a>.
                </li>
                <li id="problem-ref-5" className="vsi-ref">
                  Zhang, Y., Li, M., Dong, J., Yang, H., Van Zwieten, L., Lu,
                  H., Alshameri, A., Zhan, Z., Chen, X., Jiang, X., Xu, W.,
                  Bao, Y., &amp; Wang, H. (2021). A critical review of methods
                  for analyzing freshwater eutrophication.
                  <em> Water, 13</em>(2), 225. DOI:{" "}
                  <a className="vsi-wikilink" href="https://doi.org/10.3390/w13020225" target="_blank" rel="noreferrer">
                    10.3390/w13020225
                  </a>.
                </li>
                <li id="problem-ref-6" className="vsi-ref">
                  Máure, E. R., Terauchi, G., Ishizaka, J., Clinton, N.,
                  &amp; DeWitt, M. (2021). Globally consistent assessment of
                  coastal eutrophication. <em>Nature Communications, 12</em>,
                  6142. DOI:{" "}
                  <a className="vsi-wikilink" href="https://doi.org/10.1038/s41467-021-26391-9" target="_blank" rel="noreferrer">
                    10.1038/s41467-021-26391-9
                  </a>.
                </li>
                <li id="problem-ref-7" className="vsi-ref">
                  United Nations Environment Programme. (2025).
                  <em> How Spain is turning an iconic lagoon from “green soup”
                  into a natural oasis</em>. UNEP.
                </li>
                <li id="problem-ref-8" className="vsi-ref">
                  Heezen, J., &amp; Fernández López, L. (2022).
                  <em> PETI fact-finding visit to Mar Menor, Spain: 23–25
                  February 2022</em>. Policy Department for Citizens’ Rights
                  and Constitutional Affairs, European Parliament.
                </li>
                <li id="problem-ref-9" className="vsi-ref">
                  Aparicio, G., Camacho, M., &amp; Maté-Sánchez-Val, M. (2024).
                  Quantifying the impact: Are coastal areas impoverished by
                  marine pollution? <em>Ecological Economics, 221</em>, 108213.
                  DOI:{" "}
                  <a className="vsi-wikilink" href="https://doi.org/10.1016/j.ecolecon.2024.108213" target="_blank" rel="noreferrer">
                    10.1016/j.ecolecon.2024.108213
                  </a>.
                </li>
                <li id="problem-ref-10" className="vsi-ref">
                  Lamas Rodríguez, M., Garcia Lorenzo, M. L., Medina Magro, M.,
                  &amp; Perez Quiros, G. (2023). Impact of climate risk
                  materialization and ecological deterioration on house prices
                  in Mar Menor, Spain. <em>Scientific Reports, 13</em>, 11772.
                  DOI:{" "}
                  <a className="vsi-wikilink" href="https://doi.org/10.1038/s41598-023-39022-8" target="_blank" rel="noreferrer">
                    10.1038/s41598-023-39022-8
                  </a>.
                </li>
                <li id="problem-ref-11" className="vsi-ref">
                  Zheng, Y., Wan, Y., Zhang, Y., Huang, J., Yang, Y., Tsang,
                  D. C. W., Wang, H., Chen, H., &amp; Gao, B. (2023). Recovery
                  of phosphorus from wastewater: A review based on current
                  phosphorous removal technologies.
                  <em> Critical Reviews in Environmental Science and
                  Technology, 53</em>(11), 1148–1172.
                  DOI:{" "}
                  <a className="vsi-wikilink" href="https://doi.org/10.1080/10643389.2022.2128194" target="_blank" rel="noreferrer">
                    10.1080/10643389.2022.2128194
                  </a>.
                </li>
                <li id="problem-ref-12" className="vsi-ref">
                  United States Environmental Protection Agency. (2010).
                  <em> Nutrient Control Design Manual</em>
                  (EPA/600/R-10/100). Office of Research and Development,
                  National Risk Management Research Laboratory.
                </li>
                <li id="problem-ref-13" className="vsi-ref">
                  Minnesota Pollution Control Agency. (2006).
                  <em> Phosphorus Treatment and Removal Technologies</em>
                  (WQ-WWTP9-02). Municipal Division, Wastewater Program.
                </li>
                <li id="problem-ref-14" className="vsi-ref">
                  Uzkurt Kaljunen, J., Al-Juboori, R. A., Khunjar, W., Mikola,
                  A., &amp; Wells, G. (2022). Phosphorus recovery alternatives
                  for sludge from chemical phosphorus removal processes:
                  Technology comparison and system limitations.
                  <em> Sustainable Materials and Technologies, 34</em>,
                  e00514. DOI:{" "}
                  <a className="vsi-wikilink" href="https://doi.org/10.1016/j.susmat.2022.e00514" target="_blank" rel="noreferrer">
                    10.1016/j.susmat.2022.e00514
                  </a>.
                </li>
                <li id="problem-ref-15" className="vsi-ref">
                  European Parliament and Council of the European Union.
                  (2024). Directive (EU) 2024/3019 of the European Parliament
                  and of the Council of 27 November 2024 concerning urban
                  wastewater treatment (recast). <em>Official Journal of the
                  European Union</em>, 12 December 2024.
                </li>
              </ol>
            </div>

            <div className="pd-subsection">
              <h3>Our solution (placeholder)</h3>
            <Callout kind="editorial">
              <p>
                Placeholder citations — replace with the team's real sources
                once the sections above move past lorem-ipsum drafting.
              </p>
            </Callout>
            <ol>
              <li id="ref-1" className="vsi-ref">
                Placeholder reference entry one — author, title, year.
              </li>
              <li id="ref-2" className="vsi-ref">
                Placeholder reference entry two — author, title, year.
              </li>
              <li id="ref-3" className="vsi-ref">
                Placeholder reference entry three — author, title, year.
              </li>
              <li id="ref-4" className="vsi-ref">
                Placeholder reference entry four — author, title, year.
              </li>
              <li id="ref-5" className="vsi-ref">
                Placeholder reference entry five — author, title, year.
              </li>
              <li id="ref-6" className="vsi-ref">
                Placeholder reference entry six — author, title, year.
              </li>
              <li id="ref-7" className="vsi-ref">
                Placeholder reference entry seven — author, title, year.
              </li>
              <li id="ref-8" className="vsi-ref">
                Placeholder reference entry eight — author, title, year.
              </li>
              <li id="ref-9" className="vsi-ref">
                Placeholder reference entry nine — author, title, year.
              </li>
            </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
