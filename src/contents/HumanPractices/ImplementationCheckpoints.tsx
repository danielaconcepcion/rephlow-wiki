import {
  Fragment,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { AccordionSection } from "./AccordionSection";
import { RouteProgressGlyph } from "./HeroObjects";
import { ProjectBlockLink } from "../../components/ProjectBlockLink";
import type { BlockId } from "../../components/OurSolutionVisualIndex/blocks";
import "./ImplementationCheckpoints.css";

/**
 * Section 4 — "From Design to Implementation". Content transcribed and,
 * where the wiki had condensed it, restored from the source prototype
 * (rephlow_design_to_implementation.html): full risk explanations, the
 * three stop conditions, the Designed/Built/Tested/Validated maturity
 * scale and the eight "what this taught us" lessons. Identity: a route
 * with checkpoints — an editorial waypoint map, an obstacle trail, a
 * cyclical DBTL loop, concentric containment rings and a single wide
 * "board" for the seven responsibility risks — each block visually
 * distinct so the section reads as one route with several kinds of
 * checkpoints, not a stack of identical cards.
 */

interface Checkpoint {
  id: string;
  label: string;
  body: string;
}

const CHECKPOINTS: Checkpoint[] = [
  {
    id: "lab-validation",
    label: "Lab validation",
    body: "Confirms the biological foundations of the system: the chassis, the engineered genes, the enzymatic activity, and the capacity of the PAO bacteria to recover phosphorus under controlled conditions. Nothing moves forward until this stage shows the biology itself works as intended, one shouldn't start building a house by the roof.",
  },
  {
    id: "simulated-wastewater",
    label: "Simulated wastewater",
    body: "Where we stop testing in ideal conditions and start testing in representative ones: variable pH, oxygen availability, phosphorus concentration, organic load and competing ions, the same variability real industrial effluents present, without yet risking a real partner's process.",
  },
  {
    id: "closed-reactor",
    label: "Closed reactor",
    body: "Where the biology becomes a system: this stage integrates the alginate core-shell capsules, basket-based capsule retention, continuous flow and monitoring. A downstream membrane-polishing stage remains part of the proposed scale-up architecture, but has not yet been experimentally validated.",
  },
  {
    id: "industrial-pilot",
    label: "Industrial pilot",
    body: "Where rePhlow meets reality: the system is tested with controlled effluents from a real user, an essential and deliberately late step, justified only once earlier checkpoints have shown the system is safe and functional.",
  },
  {
    id: "revalorisation",
    label: "Revalorisation",
    body: "The final destination: converting the recovered phosphorus into phosphorylated molecules or other value-added products, closing the loop that removal-only technologies leave open. It is also the only step tested both early (lab validation of the multi-enzymatic system) and late in the route.",
  },
];

const STOP_CONDITIONS = [
  {
    title: "Persistent underperformance",
    body: "Revisit the design rather than advertise around it.",
    detail:
      "If pilot-scale testing showed phosphorus recovery consistently falling below a meaningful efficiency threshold, not just one underperforming batch: we would treat that as a signal to revisit the design, not as an acceptable trade-off to promote.",
  },
  {
    title: "Secondary pollution",
    body: "Evaluate any new byproduct on its own terms.",
    detail:
      "If the process generated a byproduct of its own (for example, from capsule degradation, enzymatic activity, or the revalorisation step), we would evaluate that byproduct on its own terms before calling the system safe. Some byproducts could fit within the same circular-economy logic that drives rePhlow; others could represent exactly the kind of secondary pollution we set out to avoid.",
  },
  {
    title: "Unknown consequences",
    body: "Anticipate them before deployment, not after.",
  },
];

const DBTL_STAGES = [
  { label: "Designed", note: "justified proposal" },
  { label: "Built", note: "physically assembled" },
  { label: "Tested", note: "data generated" },
  { label: "Validated", note: "claim supported" },
];

const SEQUENCE_STEPS = [
  { label: "Concern raised", lines: ["Concern", "raised"] },
  { label: "Value at stake", lines: ["Value", "at stake"] },
  {
    label: "Evidence & perspective",
    lines: ["Evidence &", "perspective"],
  },
  { label: "Design response", lines: ["Design", "response"] },
  { label: "Evidence generated", lines: ["Evidence", "generated"] },
  { label: "Remaining limitation", lines: ["Remaining", "limitation"] },
];

const LESSONS = [
  "Identifying intended and unintended consequences before implementation.",
  "Involving people with different forms of relevant knowledge.",
  "Allowing critical feedback to change the project.",
  "Prioritising containment and environmental protection alongside performance.",
  "Designing for integration rather than assuming infrastructure could be replaced.",
  "Treating captured phosphorus as a resource rather than transferring it into another waste stream.",
  "Distinguishing regulatory relevance from direct legal applicability.",
  "Communicating clearly what has been designed, tested and not yet demonstrated.",
];

type Status = "addressed" | "partial" | "open";

interface RiskCard {
  id: string;
  status: Status;
  question: string;
  valueAtStake: string;
  whyMattered: ReactNode;
  response: ReactNode;
  remains: ReactNode;
  statusNote: string;
  related: string;
}

const RISK_CARDS: RiskCard[] = [
  {
    id: "escape",
    status: "partial",
    question: "Could the engineered organism escape?",
    valueAtStake:
      "Environmental safety, public trust and industrial acceptability.",
    whyMattered: (
      <p>
        rePhlow uses an engineered <em>Pseudomonas putida</em> chassis in a
        water-treatment context. If viable cells entered the treated water or
        surrounding environment, phosphorus-removal performance would no longer
        be enough to justify implementation. This concern was reinforced by
        Repsol: from the perspective of a potential large-scale industrial
        adopter, they explained that a system involving living genetically
        modified organisms would not be considered without robust evidence that
        environmental release had been prevented during normal operation and
        foreseeable failure conditions. Their feedback transformed containment
        from a supporting safety feature into a precondition for implementation.
      </p>
    ),
    response: (
      <>
        <p>
          Closed bioreactor, alginate core-shell encapsulation, and double
          physical containment (capsule + reactor). We developed complementary
          physical barriers:
        </p>
        <ul>
          <li>
            <strong>Alginate core-shell encapsulation</strong>, in which the
            bacteria are held inside a liquid core surrounded by a crosslinked
            alginate shell.
          </li>
          <li>
            <strong>Physical retention inside the reactor</strong>, using a
            basket-type rotating-bed design that keeps the capsules separated
            from the outgoing water.
          </li>
          <li>
            <strong>Ultrafiltration downstream operation</strong>, a proposed
            downstream membrane-polishing stage intended to retain residual
            cells or alginate fragments. Because this stage remains theoretical,
            it cannot yet support a claim of guaranteed cell retention or
            final-water quality.
          </li>
        </ul>
        <p>
          The reactor and the capsules were therefore co-designed: the capsules
          provide the primary containment barrier, while the reactor
          architecture reduces mechanical stress and provides an additional
          retention step. We also developed methods to characterise the
          containment system rather than assuming a spherical capsule was
          sufficient. Visualisation of the core-shell structure using magnetite
          as a contrast agent, cryo-sectioning to measure shell thickness, and
          preliminary leakage assessment using magnetite particles smaller than
          the bacteria, as well as a leakage and viability assessment using{" "}
          <em>P. putida</em>.
        </p>
      </>
    ),
    remains: (
      <>
        <p>The system has not yet been validated under:</p>
        <ul>
          <li>prolonged continuous operation;</li>
          <li>real industrial effluent conditions;</li>
          <li>capsule ageing or degradation;</li>
          <li>foreseeable mechanical or operational failures;</li>
          <li>or industrial-scale flow and residence times.</li>
        </ul>
        <p>
          A complete response would also require a validated procedure for
          detecting escaped cells, responding to a barrier failure and treating
          or deactivating biological material at the end of each operating
          cycle.
        </p>
      </>
    ),
    statusNote:
      "The containment architecture and its characterisation pathway have been developed, but long-term and failure-condition validation remain necessary.",
    related: "Bacterial encapsulation · Hardware · Safety · Industry",
  },
  {
    id: "second-pollution",
    status: "partial",
    question:
      "Could we create a second pollution problem while solving the first?",
    valueAtStake:
      "Environmental restoration, circularity and responsible resource use.",
    whyMattered: (
      <p>
        Moving phosphorus from wastewater into bacterial biomass would not, by
        itself, close the cycle. Without recovery, rePhlow could simply replace
        one phosphorus-containing waste stream with another, and the process
        could also generate residual biomass, spent capsules, filtration
        residues or other materials requiring further treatment. This concern
        appeared early in the project: our original treatment proposal included
        a final filter whose materials could themselves become pollutants, with
        no convincing answer for sludge production or end-of-life management.
      </p>
    ),
    response: (
      <>
        <p>
          A revalorisation pathway that converts stored polyphosphate into an
          added-value product instead of discarding it as waste, backed by a
          theoretical downstream membrane-polishing stage so the water leaving
          the reactor is genuinely clean, and by an encapsulation strategy that
          protects the reactor itself, not only the environment. As Eduardo
          García Junceda's group at IQOG-CSIC helped us establish (see{" "}
          <a className="vsi-wikilink" href="#hp-timeline-event-eduardo">
            Stakeholders &amp; Voices → Science
          </a>
          ), the revalorisation module
          recovers stored polyphosphate via a PPK2–DHAK pathway. This changed
          the purpose of rePhlow from removal-only to maintaining phosphorus
          within a recoverable material cycle.
        </p>
        <p>We also considered secondary pollution elsewhere in the system:</p>
        <ul>
          <li>
            <strong>Encapsulation</strong> keeps bacterial biomass physically
            grouped, making it easier to remove from the reactor than
            free-living cells.
          </li>
          <li>
            <strong>The rotating basket</strong> retains the capsules within the
            treatment unit.
          </li>
          <li>
            <strong>A downstream membrane-polishing stage</strong> remains in
            the full process design to retain residual material, although it is
            currently theoretical rather than experimentally validated.
          </li>
          <li>
            <strong>The unnecessary Y-filter was removed</strong> when the
            reactor design changed, reducing process complexity and avoiding a
            redundant source of waste.
          </li>
        </ul>
      </>
    ),
    remains: (
      <>
        <p>
          We have not yet completed a full material and environmental balance
          for the process. Future work must determine:
        </p>
        <ul>
          <li>the recovery yield and purity of the revalorised product;</li>
          <li>the long-term stability of the PPK2–DHAK system;</li>
          <li>
            whether the pathway remains effective with material recovered from
            real biomass;
          </li>
          <li>
            the energy and chemical inputs required for cell disruption and
            product recovery;
          </li>
          <li>
            the final destination or recyclability of spent alginate capsules;
          </li>
          <li>and the composition of any residual liquid or solid stream.</li>
        </ul>
        <p>
          The theoretical membrane stage must also be tested under relevant
          operating conditions before it can support claims about final water
          quality.
        </p>
      </>
    ),
    statusNote:
      "Circular recovery, physical biomass retention and downstream polishing have been incorporated into the design, but the complete environmental balance has not yet been demonstrated.",
    related: "Revalorisation · Bacterial encapsulation · Hardware",
  },
  {
    id: "expensive",
    status: "partial",
    question: "Could the system be too expensive to adopt?",
    valueAtStake:
      "Accessibility, feasibility and fair access to environmental technology.",
    whyMattered: (
      <p>
        A solution may be scientifically successful but have little real-world
        value if its installation, operation or maintenance costs prevent the
        intended users from adopting it. Bio-Oils Huelva highlighted a practical
        constraint that shaped our implementation strategy: a mid-sized
        industrial facility cannot rebuild its entire treatment infrastructure
        around an experimental technology, and new treatment modules must
        minimise disruption, downtime and changes to the existing process.
      </p>
    ),
    response: (
      <>
        <p>
          Modular design and retrofit compatibility as explicit design
          requirements. Rather than proposing rePhlow as a completely new
          treatment plant, we developed it as a set of connected modules:
        </p>
        <ul>
          <li>enzymatic release of inaccessible phosphorus;</li>
          <li>bacterial uptake and storage;</li>
          <li>encapsulation and containment;</li>
          <li>reactor operation;</li>
          <li>downstream polishing;</li>
          <li>and polyphosphate revalorisation.</li>
        </ul>
        <p>
          In principle, these modules could be adapted or introduced in stages
          according to the needs and infrastructure of a particular facility.
          The resulting hardware strategy focused on a laboratory-scale
          rotating-bed proof of concept built from accessible components, while
          documenting the untested scale-up stages separately.
        </p>
      </>
    ),
    remains: (
      <>
        <p>
          Modularity does not automatically guarantee affordability. We have not
          yet completed a techno-economic assessment comparing:
        </p>
        <ul>
          <li>capital costs;</li>
          <li>operating and maintenance costs;</li>
          <li>capsule production and replacement;</li>
          <li>enzyme production and immobilisation;</li>
          <li>reactor energy consumption;</li>
          <li>downstream filtration;</li>
          <li>biomass processing;</li>
          <li>and the value recovered through phosphorus revalorisation.</li>
        </ul>
        <p>
          We therefore cannot yet claim that rePhlow is affordable for Bio-Oils,
          smaller industrial producers or wastewater-treatment facilities with
          limited resources.
        </p>
      </>
    ),
    statusNote:
      "The design responds to infrastructure and accessibility concerns, but affordability has not yet been quantitatively demonstrated.",
    related: "Industry · Hardware · Entrepreneurship",
  },
  {
    id: "who-benefits",
    status: "partial",
    question: "Who benefits first, and is that fair?",
    valueAtStake:
      "Equity, environmental justice and responsible prioritisation.",
    whyMattered: (
      <p>
        Choosing the first place a technology is developed or deployed is not
        neutral. It determines whose needs shape the design, who receives the
        earliest benefits and which communities remain outside the initial
        scope.
      </p>
    ),
    response: (
      <>
        <p>
          We deliberately selected phosphorus-rich industrial wastewater,
          vegetable-oil degumming streams, as the first implementation
          scenario, based on safety and experimental tractability:
        </p>
        <ul>
          <li>the stream is generated at an identifiable facility;</li>
          <li>its operating conditions can be characterised;</li>
          <li>
            treatment can take place before discharge into the environment;
          </li>
          <li>
            biological containment can be monitored within a controlled
            installation;
          </li>
          <li>
            and the system can be compared with an existing treatment train.
          </li>
        </ul>
        <p>
          Bio-Oils Huelva was the first company we contacted, and that
          conversation gave rePhlow its first concrete industrial context. They
          explained the challenge they faced in managing phosphorus-rich
          effluents while responding to increasingly demanding European
          environmental requirements, and invited us to explore whether
          synthetic biology could provide a tangible and complementary solution.
          Crucially, Bio-Oils did not only describe the problem in general terms.
          They shared information about their wastewater streams, including
          relevant process conditions and operational constraints, which allowed
          us to move away from an idealised model of industrial wastewater and
          begin designing against a real use case.
        </p>
        <p>
          Starting from this bounded and well-defined scenario also reflected a
          precautionary principle. We did not propose releasing engineered
          bacteria directly into an affected reservoir, river or other open
          environment; instead, our first application remains physically
          confined within an industrial process, where performance, containment
          and integration with existing infrastructure can be assessed under
          controlled conditions before any broader deployment is considered.
        </p>
      </>
    ),
    remains: (
      <>
        <p>
          Selecting a controlled industrial scenario does not resolve the wider
          equity question. Our initial user is an industrial facility, while
          many of the ecological and social consequences of eutrophication are
          experienced by downstream communities and users of aquatic
          environments. Future work must therefore ask:
        </p>
        <ul>
          <li>
            whether environmental benefits reach those affected beyond the
            industrial site;
          </li>
          <li>whether smaller producers could access the technology;</li>
          <li>
            whether the design remains feasible in rural or resource-limited
            contexts;
          </li>
          <li>who would bear implementation and monitoring costs;</li>
          <li>and who should participate in decisions about deployment.</li>
        </ul>
      </>
    ),
    statusNote:
      "The first use case has a clear safety and feasibility rationale, but broader access and distribution of benefits remain open.",
    related: "Industry · Environment · Entrepreneurship",
  },
  {
    id: "misuse",
    status: "addressed",
    question:
      "Could the underlying technology be misused beyond its intended purpose?",
    valueAtStake:
      "Research security, responsible openness and dual-use awareness.",
    whyMattered: (
      <p>
        Responsible research requires considering not only the intended
        application of a technology, but also whether its methods, organisms or
        knowledge could enable harmful uses.
      </p>
    ),
    response: (
      <>
        <p>
          The genetic interventions developed for rePhlow focus on phosphate
          uptake, polyphosphate synthesis, degradation and retention in{" "}
          <em>P. putida</em>. They are not designed to introduce pathogenicity,
          toxin production, antimicrobial resistance as a final functional
          output, or another capability with an evident harmful application.
          Within the scope of our project, we therefore identified uncontrolled
          environmental release as a more plausible risk than the deliberate
          misuse of the phosphate-accumulation design.
        </p>
        <p>
          This assessment influenced where we concentrated our safety work:
          physical containment, strain retention, leakage and escape testing,
          biological-waste treatment, and honest documentation of the editing
          system. We did not use the low apparent dual-use potential as a reason
          to ignore safety or withhold documentation. Instead, we focused
          mitigation effort on the risk most directly connected to the proposed
          application.
        </p>
      </>
    ),
    remains: (
      <p>
        This is a project-level assessment, not proof the technology has no
        possible unintended use. Any substantial change in chassis, genetic
        function, environmental application or scale would require the dual-use
        assessment to be revisited.
      </p>
    ),
    statusNote:
      "Addressed within the current scope: the issue was explicitly considered, the most plausible risk identified, and safety work directed accordingly.",
    related: "Safety · Genetic engineering",
  },
  {
    id: "regulatory",
    status: "partial",
    question: "Is rePhlow aligned with a real regulatory direction?",
    valueAtStake:
      "Legal relevance, implementation credibility and honest interpretation of regulation.",
    whyMattered: (
      <p>
        A technology may respond to a genuine environmental problem while still
        being poorly aligned with the regulatory system it would need to operate
        in. We therefore needed to understand how phosphorus discharges are
        assessed and whether tightening nutrient-removal requirements create a
        meaningful implementation context for rePhlow.
      </p>
    ),
    response: (
      <>
        <p>
          As CEDEX explained (see{" "}
          <a className="vsi-wikilink" href="#hp-timeline-event-cedex">
            Stakeholders &amp; Voices → Industry
          </a>
          ), we
          stopped presenting rePhlow as a replacement for complete treatment
          systems and repositioned it as a complementary phosphorus-removal and
          recovery module. Directive (EU) 2024/3019 reinforces the wider
          European movement towards stricter nutrient removal: it will replace
          the previous Urban Wastewater Treatment Directive from 1 August 2027,
          while its tertiary-treatment requirements are introduced
          progressively. For covered discharges, Annex I specifies either a
          total-phosphorus concentration of:
        </p>
        <ul>
          <li>
            <strong>0.7 mg/L</strong> for plants serving between 10,000 and
            150,000 population equivalents; or
          </li>
          <li>
            <strong>0.5 mg/L</strong> for plants serving at least 150,000
            population equivalents,
          </li>
        </ul>
        <p>
          or the corresponding minimum percentage reductions. For rePhlow, the
          Directive provides evidence of a broader regulatory direction and a
          relevant performance benchmark, not a complete legal assessment of the
          proposed first use case.
        </p>
      </>
    ),
    remains: (
      <p>
        The Directive concerns urban wastewater treatment. It should not be
        presented as direct proof the Bio-Oils degumming stream is legally
        required to meet those exact limits. The precise obligations affecting
        an industrial discharge depend on its permit, discharge route, national
        implementation and other applicable industrial and water legislation;
        these requirements must be verified before making a legal implementation
        claim.
      </p>
    ),
    statusNote:
      "The project is connected to a real regulatory trend, but the exact legal requirements for the target industrial stream still need specialist verification.",
    related: "Project description · Industry",
  },
  {
    id: "overclaiming",
    status: "addressed",
    question: "Could our claims go beyond the evidence we actually have?",
    valueAtStake:
      "Scientific integrity, public trust and responsible communication.",
    whyMattered: (
      <p>
        Overstating the maturity of an environmental biotechnology could
        encourage unrealistic expectations, obscure unresolved risks and weaken
        trust between researchers, users and affected communities. CEDEX made
        this issue particularly clear: our initial colourimetric phosphorus
        assay could support preliminary laboratory comparisons, but it should
        not be described as equivalent to an accredited or official reference
        method.
      </p>
    ),
    response: (
      <>
        <p>We introduced a clear four-level distinction:</p>
        <ul>
          <li>
            <strong>Designed</strong>, meaning that a justified technical
            proposal exists.
          </li>
          <li>
            <strong>Built</strong>, meaning that a component has been
            physically assembled.
          </li>
          <li>
            <strong>Tested</strong>, meaning that data have been generated
            under stated conditions.
          </li>
          <li>
            <strong>Validated</strong>, meaning that the evidence is
            sufficiently robust for the claim being made.
          </li>
        </ul>
        <p>
          This changed how several parts of the project are communicated (see
          Engineering).
        </p>
      </>
    ),
    remains: (
      <p>
        Honest communication does not replace technical validation. Future
        claims about removal efficiency, final water quality, containment,
        affordability or industrial readiness will require stronger evidence and
        recognised analytical methods. However, defining these boundaries
        prevents current limitations from being hidden behind the final design.
      </p>
    ),
    statusNote:
      "Addressed as a project-wide evidence and communication standard: missing validation stays visible rather than hidden behind the final design.",
    related: "Measurement · Engineering · Results",
  },
];

const STATUS_META: Record<
  Status,
  { label: string; color: string; description: string }
> = {
  addressed: {
    label: "Addressed",
    color: "var(--ic-status-green)",
    description:
      "We took a concrete and documented action. This does not necessarily mean the issue has been validated at industrial scale.",
  },
  partial: {
    label: "Partially addressed",
    color: "var(--ic-status-amber)",
    description:
      "A response has been designed or tested, but important evidence is still missing.",
  },
  open: {
    label: "Open",
    color: "var(--ic-status-red)",
    description:
      "We have identified the issue, but do not yet have sufficient evidence or a complete mitigation strategy.",
  },
};

const FILTERS: ("all" | Status)[] = ["all", "addressed", "partial", "open"];

type AccentStyle = CSSProperties & {
  "--rc-color"?: string;
  "--cat-color"?: string;
};

/** 4.1 — an editorial waypoint map, not a conventional web stepper: a
 * dashed trail with numbered stops (passed stops fill in as the route
 * progresses) and a single panel below showing the selected checkpoint. */
function ImplementationRoute({ checkpoints }: { checkpoints: Checkpoint[] }) {
  const [activeId, setActiveId] = useState(checkpoints[0].id);
  const activeIndex = checkpoints.findIndex((c) => c.id === activeId);
  const active = checkpoints[activeIndex];

  return (
    <div className="hp-route-map">
      <div
        className="hp-route-map__path"
        role="tablist"
        aria-label="Implementation checkpoints"
      >
        {checkpoints.map((c, i) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === activeId}
            className={`hp-route-map__stop${c.id === activeId ? " is-active" : ""}${i < activeIndex ? " is-passed" : ""}`}
            onClick={() => setActiveId(c.id)}
          >
            <span className="hp-route-map__marker">{i + 1}</span>
            <span className="hp-route-map__label">{c.label}</span>
          </button>
        ))}
      </div>
      <div className="hp-route-map__panel">
        <h4>{active.label}</h4>
        <p>{active.body}</p>
      </div>
    </div>
  );
}

/** 4.2 (left) — the three stop conditions as road barriers along a trail
 * rather than achievement-like flags or generic cards. */
function StopRoute({
  stops,
}: {
  stops: { title: string; body: string; detail?: string }[];
}) {
  return (
    <div className="hp-stop-route">
      {stops.map((s) => (
        <div className="hp-stop-route__item" key={s.title}>
          <span className="hp-stop-route__barrier" aria-hidden="true">
            <svg viewBox="0 0 28 28">
              <path
                d="M8 18.5 5 25m15-6.5 3 6.5M3.5 25h5m11 0h5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <rect
                x="3"
                y="6"
                width="22"
                height="13"
                rx="2.5"
                fill="#fffaf0"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="m8.5 7.5-4 10m11-10-4 10m11-10-4 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div className="hp-stop-route__text">
            <strong>{s.title}</strong>
            <p>{s.body}</p>
            {s.detail && <p className="hp-stop-route__detail">{s.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

/** 4.2 (right) — Designed→Built→Tested→Validated as a cyclical route
 * rather than a static ladder: four waypoints around a dashed ring, with
 * chevrons marking the clockwise, repeating direction of travel. */
function DbtlCycle({ stages }: { stages: { label: string; note: string }[] }) {
  return (
    <div className="hp-dbtl-cycle">
      <svg
        className="hp-dbtl-cycle__ring"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
        {[45, 135, 225, 315].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 100 100)`}>
            <polygon points="96,15 106,22 96,29" fill="currentColor" />
          </g>
        ))}
      </svg>
      {stages.map((s, i) => (
        <div
          className={`hp-dbtl-cycle__stage hp-dbtl-cycle__stage--${i}`}
          key={s.label}
        >
          <b>{s.label}</b>
          <span>{s.note}</span>
        </div>
      ))}
    </div>
  );
}

/** 4.4 — the responsibility sequence as a short chain of route pills
 * rather than a single bolded sentence. */
function SequenceRoute({
  steps,
}: {
  steps: { label: string; lines: string[] }[];
}) {
  return (
    <div className="hp-sequence-route">
      {steps.map((step, i) => (
        <span className="hp-sequence-route__item" key={step.label}>
          <span className="hp-sequence-route__step" aria-label={step.label}>
            {step.lines.map((line, lineIndex) => (
              <Fragment key={line}>
                {lineIndex > 0 && <br aria-hidden="true" />}
                {line}
              </Fragment>
            ))}
          </span>
          {i < steps.length - 1 && (
            <span className="hp-sequence-route__arrow" aria-hidden="true">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

/** 4.3 — text left, four filled containment layers right. The three outer
 * labels follow their rings while the engineered cells remain in the core.
 * A subtle decorative ripple and cursor trail preserve the original hover
 * without carrying any information. */
function ContainmentRings({ labels }: { labels: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnRef = useRef(0);
  const lastTrailPointRef = useRef<{ x: number; y: number } | null>(null);
  const trailSideRef = useRef<1 | -1>(1);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const now = performance.now();
    if (now - lastSpawnRef.current < 70) return;
    lastSpawnRef.current = now;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const previous = lastTrailPointRef.current;
    const dx = previous ? point.x - previous.x : 0;
    const dy = previous ? point.y - previous.y : -1;
    const distance = Math.hypot(dx, dy) || 1;
    const side = trailSideRef.current;
    const offset = 6;
    const step = document.createElement("span");

    step.className = "hp-rings__trail-step";
    step.style.left = `${point.x + (-dy / distance) * offset * side}px`;
    step.style.top = `${point.y + (dx / distance) * offset * side}px`;
    step.style.setProperty(
      "--trail-angle",
      `${(Math.atan2(dy, dx) * 180) / Math.PI + 90}deg`,
    );
    step.style.setProperty("--trail-mirror", `${side}`);
    container.appendChild(step);
    step.addEventListener("animationend", () => step.remove());

    lastTrailPointRef.current = point;
    trailSideRef.current = side === 1 ? -1 : 1;
  }

  return (
    <div
      className="hp-rings"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        lastTrailPointRef.current = null;
      }}
    >
      <svg
        className="hp-rings__svg"
        viewBox="0 0 320 320"
        role="img"
        aria-label={`${labels[3]} contained inside a ${labels[2]}, a ${labels[1]} and the ${labels[0]}.`}
      >
        <defs>
          <radialGradient
            id="hp-ring-gradient-industrial"
            cx="38%"
            cy="32%"
            r="72%"
          >
            <stop offset="0%" stopColor="#eef5f7" />
            <stop offset="100%" stopColor="#c9dfe7" />
          </radialGradient>
          <radialGradient
            id="hp-ring-gradient-reactor"
            cx="38%"
            cy="32%"
            r="72%"
          >
            <stop offset="0%" stopColor="#edf6ef" />
            <stop offset="100%" stopColor="#c7e2d2" />
          </radialGradient>
          <radialGradient
            id="hp-ring-gradient-capsule"
            cx="38%"
            cy="32%"
            r="72%"
          >
            <stop offset="0%" stopColor="#f4edf4" />
            <stop offset="100%" stopColor="#ddcde0" />
          </radialGradient>
          <radialGradient id="hp-ring-gradient-cells" cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#f8efcf" />
            <stop offset="100%" stopColor="#e4d292" />
          </radialGradient>
          <path
            id="hp-ring-path-industrial"
            d="M 36 160 A 124 124 0 0 1 284 160"
          />
          <path id="hp-ring-path-reactor" d="M 71 160 A 89 89 0 0 1 249 160" />
          <path id="hp-ring-path-capsule" d="M 106 160 A 54 54 0 0 1 214 160" />
        </defs>

        <g className="hp-rings__layer hp-rings__layer--industrial">
          <circle cx="160" cy="160" r="144" />
          <text>
            <textPath
              href="#hp-ring-path-industrial"
              startOffset="50%"
              textAnchor="middle"
            >
              {labels[0]}
            </textPath>
          </text>
        </g>
        <g className="hp-rings__layer hp-rings__layer--reactor">
          <circle cx="160" cy="160" r="110" />
          <text>
            <textPath
              href="#hp-ring-path-reactor"
              startOffset="50%"
              textAnchor="middle"
            >
              {labels[1]}
            </textPath>
          </text>
        </g>
        <g className="hp-rings__layer hp-rings__layer--capsule">
          <circle cx="160" cy="160" r="74" />
          <text>
            <textPath
              href="#hp-ring-path-capsule"
              startOffset="50%"
              textAnchor="middle"
            >
              {labels[2]}
            </textPath>
          </text>
        </g>
        <g className="hp-rings__layer hp-rings__layer--cells">
          <circle cx="160" cy="160" r="40" />
          <text x="160" y="156" textAnchor="middle">
            <tspan x="160" dy="0">
              Engineered
            </tspan>
            <tspan x="160" dy="14">
              cells
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}

const RELATED_BLOCKS: Record<string, BlockId> = {
  Hardware: "hardware",
  "Bacterial encapsulation": "encapsulation",
  "Enzyme immobilisation": "enzyme",
  "Genetic engineering": "genetic",
  Revalorisation: "revalorisation",
  Model: "model",
};

const RELATED_PAGES: Record<string, string> = {
  Safety: "/safety",
  Entrepreneurship: "/entrepreneurship",
  "Project description": "/project-description",
  Measurement: "/measurements",
  Engineering: "/engineering",
  Results: "/results",
};

function RelatedPages({ value }: { value: string }) {
  return (
    <>
      {value.split(" · ").map((label, index) => {
        const blockId = RELATED_BLOCKS[label];
        const page = RELATED_PAGES[label];
        return (
          <Fragment key={label}>
            {index > 0 && " · "}
            {blockId ? (
              <ProjectBlockLink blockId={blockId}>{label}</ProjectBlockLink>
            ) : page ? (
              <Link className="vsi-wikilink" to={page}>
                {label}
              </Link>
            ) : (
              label
            )}
          </Fragment>
        );
      })}
    </>
  );
}

/** 4.5 — the eight lessons as a MUJI grid-paper sheet, the same identity
 * used for the Design Compass's six values, reduced to a plain numbered
 * list (no value/question split needed for a flat list of lessons). */
function LessonSheet({ lessons }: { lessons: string[] }) {
  return (
    <div className="hp-lesson-sheet">
      <div className="hp-lesson-sheet__grid">
        {lessons.map((lesson, i) => (
          <div className="hp-lesson-sheet__row" key={lesson}>
            <span className="hp-lesson-sheet__number">{i + 1}</span>
            <p>{lesson}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 4.4 — the wide "board" holding the filters and the seven risks,
 * following the same treatment as Stakeholders & Voices' Chronological
 * record card. Selecting a filter pill simultaneously narrows the list
 * and shows that status's definition, colour-matched to the pill;
 * selecting a status with no matching risks keeps the definition visible
 * and shows an intentional empty state instead of hiding the section. At
 * most one risk stays open at a time. */
function ResponsibilityBoard({ risks }: { risks: RiskCard[] }) {
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const counts: Record<string, number> = { all: risks.length };
  (Object.keys(STATUS_META) as Status[]).forEach((s) => {
    counts[s] = risks.filter((r) => r.status === s).length;
  });

  const visible =
    filter === "all" ? risks : risks.filter((r) => r.status === filter);

  return (
    <div className="hp-checkpoint-board">
      <div
        className="hp-checkpoint-board__filters"
        role="group"
        aria-label="Filter by status"
      >
        {FILTERS.map((f) => {
          const meta = f === "all" ? null : STATUS_META[f];
          return (
            <button
              key={f}
              type="button"
              className={`hp-status-pill${filter === f ? " is-active" : ""}`}
              style={
                {
                  "--cat-color": meta ? meta.color : "var(--ink)",
                } as AccentStyle
              }
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              <span className="hp-status-pill__dot" aria-hidden="true" />
              {f === "all" ? "All" : meta!.label}
              <span className="hp-status-pill__count">{counts[f]}</span>
            </button>
          );
        })}
      </div>

      {filter !== "all" && (
        <p
          className="hp-checkpoint-board__description"
          style={{ color: STATUS_META[filter].color } as CSSProperties}
        >
          {STATUS_META[filter].description}
        </p>
      )}

      {visible.length === 0 ? (
        <div className="hp-checkpoint-board__empty">
          No concerns are currently marked{" "}
          <strong>{STATUS_META[filter as Status].label}</strong>. Every
          identified risk has at least a partial response — see “Partially
          addressed” or “Addressed”.
        </div>
      ) : (
        <div className="hp-risk-list">
          {visible.map((card) => (
            <div
              className="hp-risk-entry"
              key={card.id}
              style={
                { "--rc-color": STATUS_META[card.status].color } as AccentStyle
              }
            >
              <div className="hp-risk-entry__head">
                <span className="hp-risk-entry__badge">
                  {STATUS_META[card.status].label}
                </span>
                <h4>{card.question}</h4>
                <p className="hp-risk-entry__value">
                  <strong>Value at stake:</strong> {card.valueAtStake}
                </p>
                <div className="hp-risk-entry__why">{card.whyMattered}</div>
              </div>
              <AccordionSection
                title="Read our response and remaining limitations"
                isOpen={openId === card.id}
                onToggle={() =>
                  setOpenId((id) => (id === card.id ? null : card.id))
                }
                className="hp-risk-entry__accordion"
              >
                <div className="hp-risk-entry__response">
                  <p>
                    <strong>Our response:</strong>
                  </p>
                  {card.response}
                </div>
                <div className="hp-risk-entry__remains">
                  <p>
                    <strong>What remains open:</strong>
                  </p>
                  {card.remains}
                </div>
                <p className="hp-risk-entry__status-summary">
                  {card.statusNote}
                </p>
                <p className="hp-risk-entry__related">
                  <strong>Related pages:</strong>{" "}
                  <RelatedPages value={card.related} />
                </p>
              </AccordionSection>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ImplementationCheckpoints() {
  return (
    <section
      className="hp-section implementation-checkpoints"
      id="implementation"
    >
      <div className="ic-hero">
        <div className="ic-hero__grid">
          <div className="ic-hero__intro">
            <h2>4. From Design to Implementation</h2>
            <p className="ic-hero__lede">
              Understanding who might use rePhlow was not enough. A responsible
              project also needs to be honest about how it would actually reach
              those users, about the limits of what it can currently promise,
              and about the risks it could create along the way.
            </p>
          </div>

          <div className="ic-hero-route" aria-hidden="true">
            <RouteProgressGlyph />
          </div>
        </div>
      </div>

      <div className="hp-stepper" id="s4-route">
        <h3>A route with checkpoints, not a straight line</h3>
        <p>
          We designed rePhlow's path to real-world implementation as a sequence
          of conditions that must be met before moving forward. Select a
          checkpoint to see what that stage actually requires.
        </p>
        <ImplementationRoute checkpoints={CHECKPOINTS} />
        <p>
          Each checkpoint exists for the same reason: we do not want to promise
          industrial performance before we have earned it in more controlled
          settings first.
        </p>
      </div>

      <div className="hp-boundaries" id="s4-boundaries">
        <h3>What we will not compromise — and what we will not claim</h3>
        <div className="hp-boundaries__grid">
          <article className="hp-boundary-panel">
            <h4>What we consider irrenounceable</h4>
            <p>
              Following this route also forced us to define our own limits,
              not only technical targets, but conditions that, if unmet, would
              mean rethinking rePhlow rather than pushing it forward
              regardless.
            </p>
            <StopRoute stops={STOP_CONDITIONS} />
            <p>
              This is, in essence, the same discipline the AREA framework
              introduced into our design process: anticipating consequences
              instead of waiting to discover them after deployment.
            </p>
          </article>

          <article className="hp-boundary-panel">
            <h4>How we avoid overclaiming</h4>
            <p>
              Avoiding overclaiming is not a communications strategy for us; it
              is a direct consequence of the route itself. Because our
              implementation path moves in stages, we are only in a position to
              claim what has actually been demonstrated at the stage we have
              reached. We do not describe rePhlow as a deployed industrial
              solution when it is a system in validation, and we do not present
              laboratory efficiency figures as if they already represented real
              industrial performance. This is also why revalorisation, the final
              destination, is presented as the last step rather than the
              headline promise: it becomes credible only once removal,
              containment and recovery have been proven at each earlier
              checkpoint.
            </p>
            <DbtlCycle stages={DBTL_STAGES} />
          </article>
        </div>
      </div>

      <div className="hp-containment" id="s4-containment">
        <h3>A contained barrier, not a release</h3>
        <div className="hp-containment__grid">
          <div className="hp-containment__text">
            <p>
              Perhaps the clearest limit we set for ourselves is conceptual as
              much as technical: we do not imagine rePhlow as biology released
              into nature. At every stage of this route, the system is designed
              to keep engineered organisms contained and separated from the
              treated water.
            </p>
            <p>
              We imagine rePhlow not as an organism introduced into an
              ecosystem, but as a contained biotechnological barrier positioned
              before phosphorus ever reaches nature, intercepting the problem
              at the industrial stage, exactly where our route first began.
            </p>
          </div>
          <ContainmentRings
            labels={[
              "Industrial process",
              "Closed reactor",
              "Core-shell capsule",
              "Engineered cells",
            ]}
          />
        </div>
      </div>

      <div className="hp-checkpoint" id="s4-responsibility">
        <h3>Responsibility checkpoint</h3>
        <p>
          Every route needs checkpoints. For rePhlow, the most important one was
          responsibility.
        </p>
        <p>
          A phosphorus-recovery system does not become responsible simply
          because it removes phosphorus efficiently. It must also protect the
          environment, prevent biological release, avoid transferring pollution
          into a new waste stream, respond to real user needs and communicate
          its limitations honestly.
        </p>
        <p>
          We therefore did not treat responsibility as a final review carried
          out after the technical work was complete. At different stages of the
          project, conversations with researchers, industrial stakeholders,
          public-sector specialists and potential users challenged our
          assumptions and exposed consequences that could not be understood from
          the laboratory alone.
        </p>
        <p>
          This checkpoint revisits those concerns through one traceable
          sequence:
        </p>
        <SequenceRoute steps={SEQUENCE_STEPS} />
        <p>
          The aim is not to claim that every risk has disappeared. It is to show
          which risks we identified, how we responded to them, what changed in
          rePhlow and which questions must remain open before implementation can
          be considered responsible.
        </p>
        <p className="hp-checkpoint__legend">
          A green checkpoint does not mean "risk eliminated". It means that,
          within the boundaries of our project, we have responded to the concern
          transparently and can justify the next responsible step.
        </p>

        <ResponsibilityBoard risks={RISK_CARDS} />
      </div>

      <div className="hp-checkpoints__prose" id="s4-lessons">
        <h3>What this checkpoint taught us</h3>
        <p>
          Responsibility did not mean finding a design with no uncertainty or
          risk. At our stage of development, such a claim would itself be
          irresponsible. For rePhlow, responsibility meant:
        </p>
        <LessonSheet lessons={LESSONS} />
        <p>
          The checkpoint therefore remains active. Yellow and red questions are
          not failures of Human Practices; they define the evidence that must
          be generated before rePhlow can move responsibly from a laboratory
          project towards real-world implementation.
        </p>
        <aside className="hp-methodology-note">
          <strong>A note on methodology.</strong> Where this checkpoint draws on
          interviews or other activities involving real people, we followed
          iGEM's human subjects and human experimentation policies: consent was
          sought before any conversation was published, participants were told
          how their input would be used, and identities were anonymised on
          request. Methodological notes (date, format, questions asked, consent
          obtained) are kept on file and available on request.
        </aside>
      </div>
    </section>
  );
}
