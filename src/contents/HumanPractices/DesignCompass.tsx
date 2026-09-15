import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { AccordionSection } from "./AccordionSection";
import { CompassGlyph } from "./HeroObjects";
import { ProjectBlockLink } from "../../components/ProjectBlockLink";
import type { BlockId } from "../../components/OurSolutionVisualIndex/blocks";
import { asset } from "../../utils/asset";
import "./DesignCompass.css";

type StepStyle = CSSProperties & { "--step-i": number };

function Cite({ numbers }: { numbers: number[] }) {
  return (
    <>
      {" "}
      {numbers.map((number, index) => (
        <span key={number}>
          {index > 0 && ", "}
          <a className="hp-citation" href={`#hp-compass-ref-${number}`}>
            [{number}]
          </a>
        </span>
      ))}
    </>
  );
}

/**
 * Section 1 — "The Design Compass". Content transcribed from the Notion
 * page "1. Our guiding values: The Design Compass". Identity: a literal
 * rotating-needle compass (rephlow_guiding_compass_refined.html) — clicking
 * a point on the dial rotates the needle to it, opens the matching value
 * panel below and closes the others; clicking a value panel directly does
 * the same in reverse. The AREA framework's 4 dropdown cards and its
 * separate pathway diagram (two representations of the same 4 stops in the
 * prototype) are merged here into one: each pathway stop already shows its
 * letter, name, question and explanation, so no second accordion layer.
 */

interface AreaStop {
  letter: string;
  name: string;
  question: string;
  explanation: string;
}

const AREA_STOPS: AreaStop[] = [
  {
    letter: "A",
    name: "Anticipate",
    question:
      "What could rePhlow cause, both intentionally and unintentionally?",
    explanation:
      "We considered possible environmental, biological, technical, economic and social consequences before committing to a decision.",
  },
  {
    letter: "R",
    name: "Reflect",
    question: "Which assumptions or priorities are shaping our choices?",
    explanation:
      "We examined what we were taking for granted and whether our definition of success was too narrow.",
  },
  {
    letter: "E",
    name: "Engage",
    question: "Whose knowledge do we need to improve our reasoning?",
    explanation:
      "We involved researchers, industrial organisations, public institutions and entrepreneurship specialists whose experience could not be reproduced within our laboratory.",
  },
  {
    letter: "A",
    name: "Act",
    question: "What must change as a result of what we have learned?",
    explanation:
      "Stakeholder engagement became part of our Integrated Human Practices only when it produced a traceable response in our design, experiments, communication or implementation strategy.",
  },
];

interface CompassValue {
  id: string;
  number: string;
  title: string;
  angle: number;
  meaning: string;
  anticipate: string;
  reflect: string;
  engage: ReactNode;
  act: string;
  whatChanged: ReactNode;
  evidenceTrail: string[];
}

const COMPASS_VALUES: CompassValue[] = [
  {
    id: "environmental-restoration",
    number: "01",
    title: "Environmental restoration",
    angle: -90,
    meaning:
      "Reduce phosphorus pressure before it reaches aquatic ecosystems, without creating another environmental problem elsewhere in the treatment process.",
    anticipate:
      "We considered whether reducing phosphate inside the bioreactor would necessarily translate into meaningful environmental improvement. A successful biological uptake result would have limited value if the final water still contained residual phosphate, biomass or other components preventing responsible discharge or reuse.",
    reflect:
      "Our initial design implicitly treated the bioreactor as the endpoint of the system, if the bacteria accumulated phosphate, we considered the treatment successful. This revealed that our definition of success was centred on one biological module rather than on the quality of the final effluent.",
    engage:
      "Environmental sampling and the industrial information provided by Bio-Oils helped us connect laboratory phosphate uptake with the wider objective of treating a real effluent.",
    act: "Final effluent quality became a system-level design criterion.",
    whatChanged:
      "The original design ended once phosphate had been accumulated by the bacterial module. We extended the system beyond the bioreactor and incorporated a dedicated post-reactor separation stage intended to retain the core-shell capsules and residual biomass before the treated water leaves the system. Environmental performance must therefore be evaluated at the outlet of the complete system, rather than inferred only from uptake inside the reactor.",
    evidenceTrail: [
      "Environmental sampling → Travel Archive",
      "Bio-Oils wastewater data → Stakeholders and Voices",
      "Post-reactor separation → Hardware",
    ],
  },
  {
    id: "circularity",
    number: "02",
    title: "Circularity and resource stewardship",
    angle: -30,
    meaning:
      "Treat phosphorus as a finite but recoverable resource, rather than only as a contaminant that must be removed.",
    anticipate:
      "We considered what would happen if phosphorus were removed from water but transferred into another unusable waste stream, a system based only on removal could reduce immediate environmental pressure while maintaining a linear pattern of extraction, use and disposal.",
    reflect:
      "Our initial framing focused predominantly on phosphorus as a pollutant, overlooking its importance as an essential and finite resource. Removal efficiency alone was not an adequate measure of circularity.",
    engage:
      "Industrial and entrepreneurship perspectives helped us distinguish between concentrating phosphorus in biomass and producing an output that could realistically enter a recovery or upcycling pathway.",
    act: "We expanded the objective of rePhlow from phosphorus removal to phosphorus capture, retention and recovery.",
    whatChanged:
      "Our original process ended with phosphorus accumulated inside bacterial biomass. We redesigned the downstream objective around the recovery of a concentrated phosphorus-rich output, connecting the different technical blocks through a circular sequence: Phosphorus release → Phosphate uptake → Intracellular storage → Biomass retention → Phosphorus recovery → Phosphate upcycling.",
    evidenceTrail: [
      "Enzyme immobilisation",
      "Polyphosphate accumulation strategy → Genetic engineering",
      "Biomass retention → Hardware",
      "Phosphorus recovery workflow → Revalorisation",
    ],
  },
  {
    id: "biosafety",
    number: "03",
    title: "Biosafety by design",
    angle: 30,
    meaning:
      "Prevent engineered microorganisms from leaving the system throughout treatment, recovery, maintenance and final handling.",
    anticipate:
      "We considered the biological and operational consequences of introducing genetically engineered bacteria into an industrial wastewater-treatment process, including freely suspended cells leaving the reactor, damaged capsules releasing bacteria, and incomplete retention by downstream hardware.",
    reflect:
      "Our early design focused on what the bacteria should do metabolically, but did not yet define the physical format in which they would operate. We had considered phosphate accumulation without fully considering how the cells would be retained, monitored and recovered.",
    engage:
      "Our discussion with Repsol highlighted the practical limitations of operating with freely suspended engineered bacteria in an industrial treatment line, and helped us assess how encapsulation could be supported by additional physical retention stages.",
    act: "We incorporated core-shell alginate encapsulation as the primary physical containment strategy, treated as one layer within a wider containment logic rather than a sufficient barrier on its own.",
    whatChanged:
      "Before engaging with Repsol, the project had a metabolic design but no defined physical format for the bacterial module. We redesigned this module around bacteria contained within core-shell alginate capsules, keeping the cells physically separated from the wastewater while allowing dissolved phosphate and nutrients to reach them. Encapsulation also creates a recoverable unit containing the phosphorus-rich biomass. Because no single containment mechanism should be considered infallible, we complemented encapsulation with two further, independent stages: an internal mesh barrier that retains intact capsules inside the reactor, and a downstream membrane stage that retains any residual biomass or cells that the mesh does not catch. The resulting containment logic is three layers deep: Cell confinement → Capsule retention → Downstream filtration.",
    evidenceTrail: [
      "Repsol consultation → Stakeholders and Voices",
      "Core-shell alginate encapsulation → Hardware",
      "Membrane filtration → Hardware",
    ],
  },
  {
    id: "industrial-feasibility",
    number: "04",
    title: "Industrial feasibility",
    angle: 90,
    meaning:
      "Design rePhlow around real wastewater conditions and existing industrial infrastructure, while minimising disruption, maintenance requirements and implementation costs.",
    anticipate:
      "We considered the practical consequences of introducing an additional treatment stage into an active industrial facility: production downtime, available footprint, compatibility with existing equipment, maintenance and adaptation to variable wastewater conditions.",
    reflect:
      "Our early design decisions were driven primarily by what appeared most effective under laboratory conditions, without testing whether the most efficient experimental configuration would also be the most practical industrial design.",
    engage:
      "Industrial stakeholders helped us understand that continuity of production, retrofit compatibility and manageable maintenance requirements were central to adoption.",
    act: "Modularity and non-disruptive integration became explicit design requirements.",
    whatChanged:
      "Our initial concept treated rePhlow as a single fixed unit. We moved towards a modular, plug-in architecture designed to operate alongside existing treatment infrastructure, divided into connected but independently adaptable modules: phosphate release from organic compounds, biological phosphate capture and accumulation, core-shell capsule retention, post-reactor separation, and phosphorus recovery and phosphate upcycling. This architecture allows individual modules to be adapted, maintained or replaced without redesigning the complete treatment line. Industrial feasibility therefore became a design input rather than a question postponed until after laboratory development.",
    evidenceTrail: [
      "Industrial consultations → Stakeholders and Voices",
      "Modular plug-in architecture → Hardware",
      "Retrofit compatibility → Entrepreneurship",
    ],
  },
  {
    id: "scientific-robustness",
    number: "05",
    title: "Scientific robustness and integrity",
    angle: 150,
    meaning:
      "Build the biological design through evidence, interpretability and reversible decisions, distinguishing clearly between demonstrated results and future objectives.",
    anticipate:
      "We considered the risk of selecting an organism for its strong natural phenotype without establishing whether it could be cultivated, engineered and characterised reproducibly, and the risk of introducing too many modifications simultaneously.",
    reflect:
      "Our original design was biologically ambitious but experimentally difficult. It combined several organisms and functions without sufficient evidence that the complete system could be handled within the time and resources available. After moving towards a single bacterial chassis, we faced a similar challenge at the genetic level: modifying transport, synthesis, degradation and export simultaneously could increase apparent ambition while reducing experimental interpretability.",
    engage: (
      <>
        Our chassis selection was directly shaped by consultations with
        Francisco Javier Molpeceres, Silvia Díaz del Toro, Aurelio Hidalgo
        Huertas and Elvira Mateos, who challenged the feasibility of our
        original multi-organism consortium and helped us broaden the criteria we
        used to select a chassis. Their full reasoning and individual
        contributions are presented in{" "}
        <a className="hp-compass-link" href="#stakeholders">
          Stakeholders &amp; Voices
        </a>
        .
      </>
    ),
    act: "We adopted a staged genetic-engineering strategy: a well-characterised chassis, modifications whose effects can be interpreted, reversible plasmid-based testing before chromosomal integration, and an editing method compatible with the number of proposed modifications.",
    whatChanged: (
      <>
        The initial microbial consortium was replaced by a single{" "}
        <em>Pseudomonas putida</em> chassis. We selected KT2440 because its
        genomic, physiological and engineering documentation provided a stronger
        experimental foundation than alternatives chosen mainly for their
        natural phenotype or geographical relevance
        <Cite numbers={[3]} />. We then narrowed the genetic design: instead of
        modifying every potentially relevant pathway at once, we prioritised
        direct targets associated with phosphate uptake, polyphosphate
        synthesis, polyphosphate degradation and competing phosphate loss.
        Heterologous constructs would first be evaluated using replicative
        plasmids, with chromosomal integration considered only after
        compatibility with the chassis had been assessed. For the selected
        endogenous targets, we replaced the original sequential-deletion
        strategy with CRISPR base editing. These decisions made the design
        narrower than the original proposal, but also more interpretable,
        reversible and experimentally defensible.
      </>
    ),
    evidenceTrail: [
      "Molpeceres-García, Díaz del Toro, Hidalgo, Mateos → Stakeholders and Voices",
      "Selection of P. putida KT2440 → Genetic engineering",
      "Plasmid-first testing → Experiments",
      "CRISPR base editing → Genetic engineering",
    ],
  },
  {
    id: "access-fairness",
    number: "06",
    title: "Access and fairness",
    angle: 210,
    meaning:
      "Consider who can implement rePhlow, who bears its costs, and who benefits from cleaner water and phosphorus recovery.",
    anticipate:
      "We considered whether the cost and complexity of the system could restrict its adoption to large industrial operators, limiting environmental reach if smaller facilities were unable to implement or maintain it.",
    reflect:
      "Our initial implementation concept focused on a single large-scale configuration and considered affordability mainly through initial and operating costs, overlooking that accessibility also depends on installation requirements, modularity and maintenance.",
    engage:
      "Entrepreneurship, economic and industrial perspectives helped us examine how modular deployment, treated-water reuse and phosphorus recovery could influence the net cost of implementation.",
    act: "We began evaluating different deployment scales rather than one fixed industrial configuration.",
    whatChanged:
      "The implementation strategy was reorganised around modular deployment. Instead of requiring every facility to install the same configuration, the number and capacity of modules could be adapted to the volume, composition and treatment objectives of each wastewater stream. We also recognised the potential value of both main outputs: a recovered phosphorus-rich material that may enter a phosphate upcycling pathway, and treated water that may be reused within the client's process where its composition and applicable requirements allow it. These outputs could partially offset operating costs, although their final value must be supported by further technical validation, cost modelling and market analysis. Access therefore became connected to both circularity and industrial feasibility.",
    evidenceTrail: [
      "Entrepreneurship mentoring → Entrepreneurship",
      "Industrial perspectives → Stakeholders and Voices",
      "Modular deployment scenarios → Hardware",
      "Resource-recovery model → Revalorisation",
      "Treated water reuse → Entrepreneurship",
    ],
  },
];

const EVIDENCE_BLOCKS: Record<string, BlockId> = {
  Hardware: "hardware",
  "Bacterial encapsulation": "encapsulation",
  "Enzyme immobilisation": "enzyme",
  "Genetic engineering": "genetic",
  Revalorisation: "revalorisation",
  Model: "model",
};

const EVIDENCE_PAGES: Record<string, string> = {
  "Travel Archive": "#travel-archive",
  "Stakeholders and Voices": "#stakeholders",
  Entrepreneurship: "/entrepreneurship",
  Experiments: "/experiments",
};

function EvidenceDestination({ label }: { label: string }) {
  const blockId = EVIDENCE_BLOCKS[label];
  if (blockId) {
    return <ProjectBlockLink blockId={blockId}>{label}</ProjectBlockLink>;
  }

  const href = EVIDENCE_PAGES[label];
  if (!href) return <>{label}</>;

  return href.startsWith("#") ? (
    <a className="vsi-wikilink" href={href}>
      {label}
    </a>
  ) : (
    <Link className="vsi-wikilink" to={href}>
      {label}
    </Link>
  );
}

function EvidenceTrail({ value }: { value: string }) {
  const [source, destination] = value.split(" → ");
  if (!destination) return <EvidenceDestination label={source} />;

  return (
    <>
      {source} <span aria-hidden="true">→</span>{" "}
      <EvidenceDestination label={destination} />
    </>
  );
}

/** Matches the prototype's own p0…p5 absolute-position classes exactly
 * (top-centre, upper-right, lower-right, bottom-centre, lower-left,
 * upper-left) — see DesignCompass.css. */
const POSITION_CLASSES = ["p0", "p1", "p2", "p3", "p4", "p5"];

interface FrameworkQuestion {
  number: string;
  value: string;
  question: string;
}

/** Numbers/value names match COMPASS_VALUES exactly — this recap
 * deliberately echoes the compass dial's own numbering rather than
 * introducing a separate scheme. */
const FRAMEWORK_QUESTIONS: FrameworkQuestion[] = [
  {
    number: "01",
    value: "Environmental restoration",
    question: "Does this improve the condition of the receiving environment?",
  },
  {
    number: "02",
    value: "Circularity and resource stewardship",
    question: "Are we recovering value, or merely transferring waste?",
  },
  {
    number: "03",
    value: "Biosafety by design",
    question: "What happens if one containment measure fails?",
  },
  {
    number: "04",
    value: "Industrial feasibility",
    question: "Can this operate within the constraints of a real facility?",
  },
  {
    number: "05",
    value: "Scientific robustness and integrity",
    question: "What evidence supports this claim?",
  },
  {
    number: "06",
    value: "Access and fairness",
    question: "Who can implement the technology, and who benefits from it?",
  },
];

interface TradeoffExample {
  label: string;
  text: string;
}

const TRADEOFF_EXAMPLES: TradeoffExample[] = [
  {
    label: "Genetic stability vs reversibility",
    text: "Chromosomal integration could improve genetic stability, but plasmid-first testing offered greater reversibility while compatibility remained uncertain.",
  },
  {
    label: "Attachment vs enzyme activity",
    text: "Covalent enzyme immobilisation could reduce detachment, but stronger attachment might compromise activity.",
  },
  {
    label: "Retention vs operational burden",
    text: "Additional filtration could improve retention while increasing cost, energy demand, maintenance and material use.",
  },
  {
    label: "Ambition vs interpretability",
    text: "A broader genetic design could appear more ambitious, but makes individual effects harder to interpret.",
  },
];

const DECISION_RULES: string[] = [
  "Avoid irreversible commitments while evidence remains limited.",
  "Prioritise safety evidence over performance gains.",
  "Use the simplest design able to answer the current question without preventing later improvement.",
];

interface PerspectiveVoice {
  name: string;
  text: string;
}

const PERSPECTIVE_VOICES: PerspectiveVoice[] = [
  {
    name: "Bio-Oils",
    text: "Emphasised compatibility with existing processes and the economic consequences of disruption.",
  },
  {
    name: "Repsol",
    text: "Placed convincing containment evidence at the centre of industrial acceptability.",
  },
  {
    name: "CEDEX",
    text: "Stressed recognised analytical methods, regulatory context and caution when interpreting preliminary results.",
  },
  {
    name: "Scientific advisers",
    text: "Prioritised tractability, reproducibility and interpretability.",
  },
  {
    name: "Local People",
    text: "Highlighted the distance between technical measurements and how environmental change is experienced by local communities.",
  },
];

const MISSING_GROUPS: string[] = [
  "Plant operators",
  "Maintenance workers",
  "Occupational-safety specialists",
  "Permitting authorities",
  "Waste handlers",
  "Environmental organisations",
  "Smaller industrial facilities",
  "Recovered-product users",
];

interface LoopStage {
  label: string;
  definition: string;
}

const LOOP_STAGES: LoopStage[] = [
  {
    label: "Perspective documented",
    definition: "Relevant knowledge or concern was recorded.",
  },
  {
    label: "Decision changed",
    definition: "The input produced a traceable modification.",
  },
  {
    label: "Change implemented",
    definition:
      "The modification entered a construct, protocol, experiment, model or communication output.",
  },
  {
    label: "Change evaluated",
    definition: "Evidence was generated to assess the modified design.",
  },
  {
    label: "Returned to stakeholder",
    definition:
      "The revised design or evidence was brought back to the person or community whose input initiated the change.",
  },
  {
    label: "Further iteration completed",
    definition: "Their subsequent response produced another modification.",
  },
];

export function DesignCompass() {
  const [selectedId, setSelectedId] = useState<string>(COMPASS_VALUES[0].id);
  const [openId, setOpenId] = useState<string | null>(COMPASS_VALUES[0].id);
  const pendingScrollId = useRef<string | null>(null);
  const active = COMPASS_VALUES.find((v) => v.id === selectedId)!;

  function toggleValue(id: string) {
    const nextOpenId = openId === id ? null : id;

    setSelectedId(id);
    setOpenId(nextOpenId);
    pendingScrollId.current = nextOpenId;
  }

  useEffect(() => {
    if (!openId || pendingScrollId.current !== openId) return;

    const firstFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(`s1-value-${openId}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        pendingScrollId.current = null;
      });
    });

    return () => cancelAnimationFrame(firstFrame);
  }, [openId]);

  useEffect(() => {
    function focusValueFromHash() {
      const prefix = "#s1-value-";
      if (!window.location.hash.startsWith(prefix)) return;

      const id = window.location.hash.slice(prefix.length);
      if (!COMPASS_VALUES.some((value) => value.id === id)) return;

      setSelectedId(id);
      setOpenId(id);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document
            .getElementById(`s1-value-${id}`)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

    focusValueFromHash();
    window.addEventListener("hashchange", focusValueFromHash);
    return () => window.removeEventListener("hashchange", focusValueFromHash);
  }, []);

  return (
    <section className="hp-section design-compass" id="design-compass">
      <div className="dc-hero">
        <div className="dc-hero__grid">
          <div className="dc-hero__intro">
            <h2>1. The Design Compass</h2>
            <p className="dc-hero__lede">
              How can responsibility guide a project when its technical,
              environmental and social consequences cannot be predicted with
              certainty? The rePhlow Guiding Compass gave us a repeatable way to
              address this question at every major decision point. It helped us
              anticipate what our technology could cause, challenge the
              assumptions behind our choices, identify whose knowledge we were
              missing, and translate what we learned into concrete changes.
            </p>
          </div>

          <div className="dc-hero-compass" aria-hidden="true">
            <CompassGlyph />
          </div>
        </div>
      </div>

      <AccordionSection
        id="s1-framework"
        title="Why we needed a framework"
        className="hp-compass__accordion"
      >
        <p>
          Words such as <em>responsible</em>, <em>safe</em> and{" "}
          <em>sustainable</em> are easy to include in a project description, but
          much harder to turn into practical design criteria. Early in the
          project, we realised we were using these terms without a shared
          definition: for one team member, “safe enough” meant containing our
          engineered bacteria under laboratory conditions; for another, it meant
          a containment strategy reliable within an industrial treatment
          process. Without a clear structure, Human Practices could become a
          collection of valuable conversations that improved our understanding
          but never changed the technology itself.
        </p>
        <p>We needed a framework that could:</p>
        <div className="hp-framework-sequence">
          <div className="hp-framework-sequence__points">
            <article>
              <span className="hp-framework-sequence__number">1</span>
              <h3>Provide consistent questions</h3>
              <p>
                Across different decisions, from <strong>biosafety</strong> and
                <strong> scale-up</strong> to <strong>affordability</strong> and
                <strong> phosphorus recovery</strong>.
              </p>
            </article>
            <article>
              <span className="hp-framework-sequence__number">2</span>
              <h3>Identify what changed</h3>
              <p>
                Require us to identify
                <strong> what changed after each interaction</strong>, rather
                than simply recording that it occurred.
              </p>
            </article>
            <article>
              <span className="hp-framework-sequence__number">3</span>
              <h3>Reflect uncertainty</h3>
              <p>
                Reflect the <strong>uncertainty</strong> inherent to a project
                combining <strong>engineered microorganisms</strong>,
                <strong> industrial wastewater</strong> and
                <strong> resource recovery</strong>.
              </p>
            </article>
          </div>

          <p className="hp-framework-sequence__choice">
            For this reason, we adapted the
            <strong>
              {" "}
              AREA Framework for Responsible Research and Innovation
            </strong>
            , developed by the UK Engineering and Physical Sciences Research
            Council (EPSRC) from 2009 to 2013
            <Cite numbers={[1, 2]} />.
          </p>
        </div>
      </AccordionSection>

      <div className="hp-compass__area" id="s1-area">
        <h3>Why AREA?</h3>
        <p>
          AREA was developed for research and innovation whose future
          consequences cannot be fully predicted in advance, which made it
          particularly relevant to rePhlow, a project that had to move beyond
          controlled laboratory conditions, interact with variable industrial
          wastewater, contain engineered microorganisms and recover phosphorus
          in a form compatible with a phosphate upcycling pathway. AREA helped
          us approach these uncertainties through four connected actions.
        </p>
        <div className="hp-area-pathway">
          {AREA_STOPS.map((stop, i) => (
            <div className="hp-area-stop" key={`${stop.name}-${i}`}>
              <div className="hp-area-stop__letter">{stop.letter}</div>
              <div className="hp-area-stop__body">
                <p className="hp-area-stop__name">{stop.name}</p>
                <p className="hp-area-stop__question">{stop.question}</p>
                <p className="hp-area-stop__explanation">{stop.explanation}</p>
              </div>
              {i < AREA_STOPS.length - 1 && (
                <div className="hp-area-stop__connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
        <p className="hp-area-pathway-intro">
          A decision became more responsible only when it moved through each
          stage of the route.
        </p>
        <ol className="hp-area-outcomes" aria-label="AREA pathway outcomes">
          <li>Potential consequences</li>
          <li>Critical reflection</li>
          <li>Relevant perspectives</li>
          <li>Design response</li>
        </ol>
        <p className="hp-area-pathway-note">
          The AREA pathway reflects the purpose of Integrated Human Practices:
          not only considering how rePhlow may affect the world, but allowing
          knowledge, concerns and values from the world to shape rePhlow.
        </p>
      </div>

      <div className="hp-compass__intro" id="s1-compass">
        <h3>The rePhlow Guiding Compass</h3>
        <p>
          The values of the Compass were not selected in advance as abstract
          principles. They emerged repeatedly as we applied AREA to real
          decisions throughout the project. Together, they define the criteria
          against which we evaluate whether a proposed change makes rePhlow more
          responsible, useful and technically defensible. The complete context
          of each stakeholder interaction, whom we contacted, why, and what we
          learned, lives in{" "}
          <a className="hp-compass-link" href="#stakeholders">
            Stakeholders &amp; Voices
          </a>
          ; this section focuses on how those perspectives shaped the project.
          Click a point on the dial, or a value below, to read how it shaped
          rePhlow.
        </p>
      </div>

      <div className="hp-compass-layout">
        <div className="hp-compass-visual">
          <div className="hp-compass-wrap">
            <div
              className="hp-compass-stage"
              aria-label="Interactive rePhlow Guiding Compass"
            >
              <div className="hp-compass-area-ring" aria-hidden="true" />
              <div className="hp-compass-inner-ring" aria-hidden="true" />
              <div
                className="hp-compass-needle"
                style={{ transform: `rotate(${active.angle}deg)` }}
                aria-hidden="true"
              />
              <div className="hp-compass-center" aria-hidden="true">
                <img
                  className="hp-compass-center__logo"
                  src={asset("assets/human-practices/phlowi.webp")}
                  alt=""
                  loading="lazy"
                />
              </div>
              {COMPASS_VALUES.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  className={`hp-compass-point ${POSITION_CLASSES[i]}${v.id === selectedId ? " is-active" : ""}`}
                  onClick={() => toggleValue(v.id)}
                  aria-pressed={v.id === selectedId}
                >
                  <span className="num">{v.number}</span>
                  <span className="label">{v.title}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="hp-compass-helper">
            Click a compass point: the needle rotates and the corresponding
            value opens below.
          </p>
        </div>

        <div className="hp-compass__values">
          {COMPASS_VALUES.map((v) => (
            <AccordionSection
              key={v.id}
              id={`s1-value-${v.id}`}
              title={`${v.number}. ${v.title}`}
              isOpen={v.id === openId}
              onToggle={() => toggleValue(v.id)}
              className="hp-compass__value"
            >
              <div className="hp-value-meaning">
                <span className="hp-value-meaning__label">
                  What this value means
                </span>
                <p>{v.meaning}</p>
              </div>

              <div className="hp-value-steps">
                <div className="hp-value-step">
                  <span className="hp-value-step__label">Anticipate</span>
                  <p>{v.anticipate}</p>
                </div>
                <div className="hp-value-step">
                  <span className="hp-value-step__label">Reflect</span>
                  <p>{v.reflect}</p>
                </div>
                <div className="hp-value-step">
                  <span className="hp-value-step__label">Engage</span>
                  <p>{v.engage}</p>
                </div>
                <div className="hp-value-step">
                  <span className="hp-value-step__label">Act</span>
                  <p>{v.act}</p>
                </div>
              </div>

              <div className="hp-value-change">
                <span className="hp-value-change__label">
                  What changed in rePhlow
                </span>
                <p>{v.whatChanged}</p>
              </div>

              <div className="hp-evidence-trail">
                <span className="hp-evidence-trail__label">Evidence trail</span>
                <ul>
                  {v.evidenceTrail.map((e) => (
                    <li key={e}>
                      <EvidenceTrail value={e} />
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionSection>
          ))}
        </div>
      </div>

      <div className="hp-compass__prose" id="s1-framework-from-values">
        <h3>From values to a decision-making framework</h3>
        <p>
          The six Compass values were not selected because they sounded
          desirable. We considered them appropriate because they repeatedly
          emerged from real design decisions, changed the direction of rePhlow
          and could be linked to evidence.
        </p>
        <p>
          Each value influenced traceable choices across the project: replacing
          the original microbial consortium, selecting <em>P. putida</em>{" "}
          KT2440, narrowing the genetic strategy, adopting CRISPR base editing,
          developing core-shell encapsulation and physical retention, moving
          towards a modular architecture, incorporating phosphorus recovery and
          separating demonstrated results from industrial projections.
        </p>
        <p>
          Crucially, each value can also be evaluated: environmental restoration
          through final effluent quality; circularity through phosphorus
          recovery, chemical form and potential reuse; biosafety through capsule
          stability, cell retention and leakage; industrial feasibility through
          operating conditions and integration requirements; scientific
          robustness through controls, reproducibility and transparent claims;
          and access and fairness through deployment scenarios, costs and the
          distribution of benefits.
        </p>
        <p>
          The Compass therefore became more than a statement of principles. It
          became a set of questions that we returned to whenever new evidence or
          stakeholder knowledge challenged our assumptions:
        </p>
        <div className="hp-question-sheet">
          <div className="hp-question-sheet__grid">
            {FRAMEWORK_QUESTIONS.map((q) => (
              <div className="hp-question-sheet__row" key={q.number}>
                <p className="hp-question-sheet__value">
                  <span className="hp-question-sheet__number">
                    {Number(q.number)}
                  </span>
                  {q.value}
                </p>
                <p className="hp-question-sheet__question">{q.question}</p>
              </div>
            ))}
          </div>
        </div>
        <p>
          Together, these questions prevent us from defining success through a
          single performance metric.
        </p>
      </div>

      <div className="hp-compass__prose" id="s1-tradeoffs">
        <h3>Trade-offs and decision rules</h3>
        <p>
          The Compass values did not always point towards the same design.
          Improving one dimension could weaken another, so responsibility
          required us to make those tensions visible rather than optimising
          blindly for performance.
        </p>
        <div className="hp-tradeoff-grid">
          {TRADEOFF_EXAMPLES.map((t) => (
            <div className="hp-tradeoff-card" key={t.label}>
              <b>{t.label}</b>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
        <p>We therefore followed three practical rules:</p>
        <div className="hp-rule-sequence">
          {DECISION_RULES.map((rule, i) => (
            <div className="hp-rule-sequence__item" key={i}>
              <span className="hp-rule-sequence__number">{i + 1}</span>
              <p>{rule}</p>
            </div>
          ))}
        </div>
        <p>
          These principles favoured reversible testing, interpretable genetic
          modifications, conservative enzyme redesign and the removal of
          unnecessary complexity.
        </p>
        <p>
          Responsibility was not about making the correct decision at the first
          attempt. It was about maintaining the ability to change direction
          when stronger evidence, a better argument or an overlooked risk
          emerged. Several decisions made rePhlow narrower rather than more
          ambitious, but also more interpretable, testable and defensible.
        </p>
        <p>
          <em>
            See the{" "}
            <a className="hp-compass-link" href="#s4-responsibility">
              Responsibility Checkpoint
            </a>{" "}
            for the full traceable record of concerns raised, decisions changed,
            evidence generated and questions that remain open.
          </em>
        </p>
      </div>

      <div className="hp-compass__prose" id="s1-perspectives">
        <h3>Different perspectives, different definitions of success</h3>
        <div className="hp-perspective-grid">
          {PERSPECTIVE_VOICES.map((voice) => (
            <div className="hp-perspective-card" key={voice.name}>
              <b>{voice.name}</b>
              <p>{voice.text}</p>
            </div>
          ))}
        </div>
        <p>
          <strong>
            We did not force these perspectives into a single artificial
            consensus
          </strong>
          . Instead, we treated them as complementary conditions that
          responsible implementation would need to satisfy. Biological
          performance would not be sufficient without containment; containment
          would be difficult to defend without reliable measurement; and
          technical evidence would have limited value if its purpose,
          limitations and environmental relevance could not be communicated
          clearly.
        </p>
        <p>
          This is where our Human Practices moved from consultation to
          integration: stakeholder knowledge did not simply accompany rePhlow;{" "}
          <strong>
            it changed what we designed, how we tested it and how we defined
            success.
          </strong>
        </p>
      </div>

      <div className="hp-compass__prose" id="s1-missing">
        <h3>Whose perspectives are still missing?</h3>
        <p>
          Our engagement is strongest in scientific design and industrial
          feasibility, but less complete among those who would operate,
          regulate, maintain, finance or live downstream of the system. We have
          not yet systematically engaged:
        </p>
        <ul className="hp-pill-list" aria-label="Groups not yet engaged">
          {MISSING_GROUPS.map((group) => (
            <li className="hp-pill" key={group}>
              {group}
            </li>
          ))}
        </ul>
        <p>
          This limits what we can currently claim. Although rePhlow has been
          designed as a contained, modular and complementary treatment system,
          its maintenance burden, affordability, permitting pathway, public
          acceptability and distribution of benefits have not yet been validated
          across all relevant groups.
        </p>
        <p>
          These gaps define our next engagement priorities. Before an industrial
          pilot, future work should include those responsible for day-to-day
          operation and emergency response, the relevant permitting authority,
          downstream communities and potential users of the recovered product.
        </p>
      </div>

      <div className="hp-compass__prose" id="s1-loop-closed">
        <h3>When is a Human Practices loop closed?</h3>
        <p>
          Changing a design in response to feedback demonstrates integration,
          but does not automatically mean the feedback loop has been closed. We
          distinguish interactions by the furthest stage supported by evidence:
        </p>
        <ol
          className="hp-loop-stairs"
          aria-label="The six stages of a closed Human Practices loop"
        >
          {LOOP_STAGES.map((stage, i) => (
            <li
              className="hp-loop-stairs__step"
              key={stage.label}
              style={{ "--step-i": i } as StepStyle}
            >
              <span className="hp-loop-stairs__number">{i + 1}</span>
              <span className="hp-loop-stairs__copy">
                <span className="hp-loop-stairs__label">{stage.label}</span>
                <span className="hp-loop-stairs__definition">
                  {stage.definition}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <p>
          Where a modification has not yet been returned to the original
          stakeholder, we describe the loop as open rather than complete. This
          distinction allows us to show both what our Human Practices has
          already achieved and where further engagement is still needed.
        </p>
      </div>

      <AccordionSection
        title="References"
        className="hp-compass__accordion hp-references"
        defaultOpen
      >
        <ol>
          <li className="hp-reference" id="hp-compass-ref-1">
            UK Research and Innovation. (n.d.).{" "}
            <em>Framework for responsible research and innovation.</em>{" "}
            Engineering and Physical Sciences Research Council (EPSRC).{" "}
            <a
              className="hp-compass-link"
              href="https://www.ukri.org/who-we-are/epsrc/our-policies-and-standards/framework-for-responsible-innovation/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.ukri.org/who-we-are/epsrc/our-policies-and-standards/framework-for-responsible-innovation/
            </a>
          </li>
          <li className="hp-reference" id="hp-compass-ref-2">
            Stilgoe, J., Owen, R., &amp; Macnaghten, P. (2013). Developing a
            framework for responsible innovation. <em>Research Policy, 42</em>
            (9), 1568–1580. DOI:{" "}
            <a
              className="hp-compass-link"
              href="https://doi.org/10.1016/j.respol.2013.05.008"
              target="_blank"
              rel="noreferrer"
            >
              10.1016/j.respol.2013.05.008
            </a>
          </li>
          <li className="hp-reference" id="hp-compass-ref-3">
            Molina-Santiago, C., Daddaoua, A., Fillet, S., Duque, E., &amp;
            Ramos, J. L. (2024). <em>Pseudomonas putida</em> KT2440: The long
            journey of a soil-dweller to become a synthetic biology chassis.{" "}
            <em>Journal of Bacteriology, 206</em>(8). DOI:{" "}
            <a
              className="hp-compass-link"
              href="https://doi.org/10.1128/jb.00136-24"
              target="_blank"
              rel="noreferrer"
            >
              10.1128/jb.00136-24
            </a>
          </li>
        </ol>
      </AccordionSection>
    </section>
  );
}
