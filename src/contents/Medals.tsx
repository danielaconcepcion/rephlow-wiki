import { Link } from "react-router-dom";
import { PageSectionNav, type PageSection } from "../components/PageSectionNav";
import { Rich } from "../components/LabFolders/RichText";
import { AwardBadge } from "../components/AwardBadge";
import { AccordionSection } from "./HumanPractices/AccordionSection";

const MEDAL_SECTIONS: PageSection[] = [
  { id: "bronze", label: "Bronze" },
  { id: "silver", label: "Silver" },
  { id: "gold", label: "Gold" },
];

/** The ballot questions each judge scores for the three awards we are
 * entering, with our answer and the page that carries the evidence. The
 * prose is the team's own, written with the **bold** marks the Notion
 * pages use and rendered by <Rich>. */
type BallotQuestion = {
  question: string;
  /** One or more paragraphs. */
  answer: string | string[];
  /** Where the evidence lives: the section as the team names it, and the
   * page it sits on. */
  see?: { section: string; page: string; label: string };
};

type BallotAward = {
  id: string;
  award: string;
  /** The award's description, as the card above the questions used to
   * carry it. */
  body: string;
  /** The page the award is judged on. */
  page: string;
  pageLabel: string;
  questions: BallotQuestion[];
};

const SUS = "/sustainability";
const ENT = "/entrepreneurship";

const BALLOT_AWARDS: BallotAward[] = [
  {
    id: "gold-measurement",
    award: "Best Measurement",
    body: "Reproducible protocols quantify phosphate removal and polyphosphate accumulation with a measurable, documented basis.",
    page: "/measurement",
    pageLabel: "Measurements",
    questions: [
      {
        question: "Could the measurement(s) be reproduced by other iGEM teams?",
        answer:
          "Each technique page reports the **parameters that change the answer rather than a narrative** of the session: buffer, pH and temperature; wavelength and why that wavelength; extinction coefficient and the actual optical path, which in a microplate is set by the fill volume and not by the cuvette convention; atmosphere, heating rate and sample mass; coating material and accelerating voltage; the calibration scale and its position relative to the sample. **Where a number was derived rather than read off an instrument**, the derivation is given, including the rule for converting a Savitzky-Golay smoothing window between spectrometers with different data spacing, which makes our second-derivative step reproducible on any instrument rather than only on ours. **Replication is stated per condition**, and the quantities that cannot be relied on are named as such: the shell-thickness measurement varies more within a single capsule than between formulations, and we say so rather than quoting a mean that would not survive repetition.",
      },
      {
        question: "Are the methods or protocols described well?",
        answer:
          "Each technique is presented through its **requirements, sample preparation and results**, including the limitations of the measurement. The requirements sections state the conditions a reader has to match; the preparation sections give the handling that changes the result, such as the triple saline wash that makes the word intracellular mean something, the holding rule that stops a hydrogel being photographed while it is still deforming, and the alkaline quench dispensed into the plate before the aliquot so that catalysis stops at the intended moment. **Step-by-step protocols sit on the [Experiments](/experiments) page** and are linked from each preparation section, so a reader who wants to repeat the work has the procedure and a reader who wants to judge it has the reasoning.",
      },
      {
        question: "Could it be useful to other projects?",
        answer:
          "Several of these measurements are **not specific to our enzymes or our capsules.** The differential scheme behind our immobilisation yield, free against total activity over time with a light-scattering control and a support-free control, quantifies immobilisation on any particulate support without the solid ever being measured. The containment assay **generalises to any encapsulated cargo that absorbs light**, and its structure matters more than its tracer: a matched no-cargo control in every medium, a quantification window chosen from those controls, a deliberate destruction step as the positive control, and a diluted reference to establish the detection limit. The **image-analysis work carries two transferable lessons**: particle analysis silently counts the fragments of a broken particle as particles, which turns catastrophic failure into apparent gradual shrinkage, and a hydrated alginate capsule is approximately 95% water, so **any figure normalised to sample mass could change** by more than an order of magnitude depending on whether it is quoted wet or dry.",
      },
      {
        question:
          "Did the team validate and calibrate their measurement process appropriately for their approach?",
        answer: [
          "**Calibration was built into each measurement** rather than assumed. Protein mass came from a standard series run in the same session and the same buffer as the samples, with the dilution giving the lowest replicate error carried forward. Phosphate came from a **duplicate standard curve covering the working range.** Absolute reaction rates came from a known extinction coefficient and the real optical path. Where no in-house standard existed, as for the alginate composition, **validation rested on three complementary comparisons**: band positions against a published commercial standard across seven bands, the composition ratio against that same standard, and two independent band pairs against each other.",
          "**Validation also meant identifying what was not real**. Two features of the thermal data are reported as instrument artefacts, a mass gain of 0.6 percentage points at 443 °C and a final mass of −0.35%, and they are used to set the accuracy of the technique rather than quietly dropped. The elemental analysis is standardless, so relative comparisons between heavy elements are made and absolute mass fractions are not. The two hydrated capsules analysed thermally came from different production batches, so their agreement is agreement across batches. And where a **measurement failed to discriminate, we changed the measurement rather than the interpretation**: shell thickness could not separate the two flow-rate ratios, so the choice was made on mechanical resistance, which measures what the thickness was only a proxy for.",
        ],
      },
    ],
  },
  {
    id: "gold-entrepreneurship",
    award: "Best Entrepreneurship",
    body: "A modular phosphorus-recovery platform taken from a first industrial customer to a costed development plan, with its risks and limits stated.",
    page: ENT,
    pageLabel: "Entrepreneurship",
    questions: [
      {
        question:
          "Have we discovered our first potential customers and identified unmet needs not yet covered by existing solutions?",
        answer:
          "We identified **Bio-Oils Huelva as our first prospective customer** through a structured market discovery process combining **TAM–SAM–SOM analysis, competitor benchmarking and a seven-criterion beachhead market assessment**. Comparing agro-industrial facilities, multinational operators and municipal treatment plants allowed us to prioritise market accessibility and technological readiness over market size. Direct collaboration with Bio-Oils, including access to operational information and wastewater samples, helped us translate unmet industrial needs into **SMART development objectives**. We identified a clear opportunity for modular phosphorus treatment that combines removal, recovery and valorisation rather than treating phosphorus solely as waste.",
        see: {
          section: "1. Unmet Needs & First Customer",
          page: ENT,
          label: "Entrepreneurship",
        },
      },
      {
        question:
          "Have we shown that our solution is possible, scalable and inventive?",
        answer:
          "We developed rePhlow as an **integrated, modular biotechnology platform** combining enzymatic phosphorus release, biological polyphosphate accumulation, physical containment and downstream valorisation. Our **5 L Minimum Viable Product (MVP)** defines three testable hypotheses and clear go/no-go criteria, while deliberately postponing non-essential features until core performance is validated. We assessed our differentiation through **competitive positioning and an innovation strategy**, identifying how our dual-value approach could distinguish rePhlow from conventional treatments. Modularity and our proposed **Phosphorus-as-a-Service model** provide a pathway towards industrial scalability without assuming that laboratory feasibility already guarantees commercial success.",
        see: {
          section: "2. Scalable, Possible & Inventive",
          page: ENT,
          label: "Entrepreneurship",
        },
      },
      {
        question:
          "Have we presented logical product development plans with realistic milestones, timelines, resources and risks?",
        answer:
          "We developed a **TRL-based development roadmap**, combining a quarter-by-quarter Gantt chart with **stage-gate milestones** that depend on experimental evidence rather than deadlines alone. Our plan progresses from laboratory validation to a **5 L integrated prototype**, industrial piloting and eventual commercial deployment, identifying the resources and capabilities required at each stage. We also developed a **Risk Assessment Plan covering 30 risks across seven categories**, with mitigation measures, measurable triggers and contingency actions. Four critical experimental measurements determine whether we can advance, ensuring that our timeline, investment requirements and scale-up decisions remain grounded in technical feasibility.",
        see: {
          section: "3. Product Development Plan",
          page: ENT,
          label: "Entrepreneurship",
        },
      },
      {
        question:
          "Have we outlined the skills, capabilities and stakeholders required to be credible in developing our solution further?",
        answer:
          "We conducted a **Skill Gap Analysis** to identify the expertise required to transform rePhlow into a commercially viable biotechnology. This guided our expansion from **eight to eleven multidisciplinary members**, strengthening capabilities in industrial biotechnology, encapsulation, modelling and communication. We complemented our internal expertise with a network of scientific advisers, industrial collaborators and entrepreneurship mentors, while developing our business capabilities through **Fábrica UCM, APTenisa and the iGEM Entrepreneurship Bootcamp**. We also identified the regulatory, financial and commercial competencies that must be incorporated as we progress towards industrial deployment.",
        see: {
          section: "4. Skills, Capabilities & Stakeholders",
          page: ENT,
          label: "Entrepreneurship",
        },
      },
      {
        question:
          "Have we considered the positive and negative long-term impacts of our fully developed solution?",
        answer:
          "We assessed rePhlow's **long-term commercial, environmental and social implications**, recognising that a successful business must create value beyond its immediate customers. Our proposed model could reduce industrial treatment costs, recover phosphorus for higher-value applications and generate recurring revenue through biological consumables and technical services. However, we also examined potential barriers, including **high initial investment, regulatory authorisation, capsule replacement costs, unequal market accessibility and environmental trade-offs**. By connecting these uncertainties to our business assumptions and future validation requirements, we developed a strategy that considers both the opportunities and consequences of industrial expansion.",
        see: {
          section: "5. Positive & Negative Impact",
          page: ENT,
          label: "Entrepreneurship",
        },
      },
    ],
  },
  {
    id: "gold-sustainability",
    award: "Best Sustainable Development Impact",
    body: "rePhlow connects phosphorus recovery to circular nutrient reuse and a lower risk of eutrophication.",
    page: SUS,
    pageLabel: "Sustainability",
    questions: [
      {
        question:
          "Did the team incorporate feedback from relevant SDG stakeholders into its work?",
        answer:
          "We engaged with stakeholders across industry, science, environmental organisations and public institutions, documenting **22 conversations** through our **Sustainability Model Canvas**, adapted from iGEM Hangzhou-BioX 2024. Six of these interactions directly influenced engineering decisions, from chassis selection and biosafety to system modularity. We also tracked which feedback loops were closed and which remained open, recognising the need for further engagement with operators, regulators and affected communities.",
        see: {
          section: "Room 02 · The operations core",
          page: SUS,
          label: "Sustainability",
        },
      },
      {
        question:
          "Did the team address the potential long-term social, environmental and economic impacts of its work, in the context of the chosen SDGs?",
        answer:
          "We evaluated rePhlow's potential **social, environmental and economic impacts** across short- and long-term scenarios, considering both benefits and risks. Our assessment addressed phosphorus recovery, water reuse and reduced chemical waste alongside challenges such as implementation costs, unequal access and potential rebound effects. Through a **multidisciplinary round table**, we confronted these trade-offs from different perspectives, ensuring that our contribution to the SDGs was assessed critically rather than assuming that environmental benefits automatically guarantee sustainability.",
        see: {
          section: "Room 04 · The impact amphitheatre",
          page: SUS,
          label: "Sustainability",
        },
      },
      {
        question:
          "How well has the team considered the positive and negative interactions of its work with other SDGs?",
        answer:
          "We assessed **nine interactions between rePhlow and the SDGs** using the seven-point framework developed by Nilsson, Griggs and Visbeck. This allowed us to identify synergies across SDGs 6, 12, 13 and 14 while also recognising potential conflicts, including the energy and material demands of encapsulation. Rather than presenting sustainability as a collection of positive outcomes, we documented these trade-offs to understand where our technology contributes to global goals and where further improvements are necessary.",
        see: {
          section: "Room 01 · The diagnostic lobby",
          page: SUS,
          label: "Sustainability",
        },
      },
      {
        question:
          "To what extent is the team's work documented so that others can build upon it?",
        answer:
          "We made our sustainability assessment reproducible by sharing our **openLCA workbook, complete Life Cycle Assessment (LCA) report and step-by-step tutorial**. Using openLCA and the freely available BAFU:2026 database, other teams can reproduce our assessment across all **16 EF 3.1 impact categories** and adapt the methodology to their own projects. By providing transparent calculations, referenced data and reusable resources, we aimed to make our work a practical contribution to sustainability assessment across the iGEM community.",
        see: {
          section:
            "the LCA workbook, the full report and the step-by-step LCA tutorial",
          page: "/contribution",
          label: "Contribution",
        },
      },
      {
        question:
          "Has the team's work measurably and significantly addressed one or more SDGs?",
        answer:
          "We quantified rePhlow's **potential contribution to SDGs 6, 12, 13 and 14** through an ISO 14040/44-aligned Life Cycle Assessment covering 16 environmental impact categories. For a modelled treatment of 1 m³ of industrial effluent, our assessment estimated **1.95 kg of phosphorus recovered, 1 m³ of reusable water, and approximately 24 kg of FeCl₃ and 13.7 kg of sludge avoided**. We also identified a target phosphorus uptake capacity of approximately 8 mg P/g of bead, translating our sustainability analysis into a measurable engineering objective for future validation.",
        see: {
          section: "Room 03 · The control and metrics panel",
          page: SUS,
          label: "Sustainability",
        },
      },
    ],
  },
];

export function Medals() {
  return (
    <div className="medals-page">
      <div className="page-with-section-nav">
        <PageSectionNav
          sections={MEDAL_SECTIONS}
          ariaLabel="Jump to medal tier"
        />

        <div className="medals-panels">
          {/* Bronze */}
          <section
            className="medals-panel medals-panel--bronze"
            id="bronze"
            aria-label="Bronze medal criteria"
          >
            <div className="medals-panel__inner">
              <div className="medals-tier__head">
                <AwardBadge as="h2" variant="bronze" label="Bronze Medal" />
              </div>

              <div className="medals-list">
                <div className="medals-item" id="bronze-deliverables">
                  <span className="medals-item__index">01</span>
                  <div>
                    <h3 className="medals-item__title">
                      Competition Deliverables
                    </h3>
                    <p className="medals-item__body">
                      We have completed all required deliverables, including
                      this wiki, the promotion and presentation videos, the
                      judging form, and judging session.
                    </p>
                    <div className="medals-links">
                      <Link className="medals-link-btn" to="/">
                        Wiki
                      </Link>
                      <Link className="medals-link-btn" to="/#promotion-video">
                        Project Promotion Video
                      </Link>
                      <a
                        className="medals-link-btn"
                        href="https://competition.igem.org/deliverables"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Presentation Video
                      </a>
                      <a
                        className="medals-link-btn"
                        href="https://competition.igem.org/deliverables/judging-form"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Judging Form
                      </a>
                      <a
                        className="medals-link-btn"
                        href="https://competition.igem.org/deliverables"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Judging Session
                      </a>
                    </div>
                  </div>
                </div>

                <div className="medals-item" id="bronze-attributions">
                  <span className="medals-item__index">02</span>
                  <div>
                    <h3 className="medals-item__title">Project Attributions</h3>
                    <p className="medals-item__body">
                      All contributions (team, advisors, instructors, and
                      external support) are logged using iGEM's standardized
                      Project Attributions Form.
                    </p>
                    <div className="medals-links">
                      <a
                        className="medals-link-btn"
                        href="https://teams.igem.org/6124"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Attributions
                      </a>
                    </div>
                  </div>
                </div>

                <div className="medals-item" id="bronze-description">
                  <span className="medals-item__index">03</span>
                  <div>
                    <h3 className="medals-item__title">Project Description</h3>
                    <p className="medals-item__body">
                      Why rePhlow targets phosphate recovery from
                      biodiesel-linked wastewater: the problem, our goals,
                      scientific background, and engineering approach.
                    </p>
                    <div className="medals-links">
                      <Link
                        className="medals-link-btn"
                        to="/project-description"
                      >
                        Project Description
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="medals-item" id="bronze-contribution">
                  <span className="medals-item__index">04</span>
                  <div>
                    <h3 className="medals-item__title">Contribution</h3>
                    <p className="medals-item__body">
                      Resources meant to serve beyond our project: protocols for
                      measuring phosphate accumulation, modeling notes, and
                      troubleshooting records for phosphate-accumulating
                      organisms such as <em>P. putida</em>.
                    </p>
                    <div className="medals-links">
                      <Link className="medals-link-btn" to="/contribution">
                        Contribution
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Silver */}
          <section
            className="medals-panel medals-panel--silver"
            id="silver"
            aria-label="Silver medal criteria"
          >
            <div className="medals-panel__inner">
              <div className="medals-tier__head">
                <AwardBadge as="h2" variant="silver" label="Silver Medal" />
              </div>

              <div className="medals-list">
                <div className="medals-item" id="silver-engineering">
                  <span className="medals-item__index">01</span>
                  <div>
                    <h3 className="medals-item__title">Engineering Success</h3>
                    <p className="medals-item__body">
                      The Engineering page describes along several iterations
                      the technical problem we faced, what we built and tested,
                      and how the result shaped the next iteration.
                    </p>
                    <div className="medals-links">
                      <Link className="medals-link-btn" to="/engineering">
                        Engineering
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="medals-item" id="silver-human-practices">
                  <span className="medals-item__index">02</span>
                  <div>
                    <h3 className="medals-item__title">Human Practices</h3>
                    <p className="medals-item__body">
                      How we determined rePhlow is responsible and good for the
                      world: the values behind our choices, who we consulted,
                      and how it changed our implementation.
                    </p>
                    <div className="medals-links">
                      <Link className="medals-link-btn" to="/human-practices">
                        Human Practices
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gold */}
          <section
            className="medals-panel medals-panel--gold"
            id="gold"
            aria-label="Gold medal — Special Awards"
          >
            <div className="medals-panel__inner">
              <div className="medals-tier__head">
                <AwardBadge as="h2" variant="gold" label="Gold Medal" />
                {/* <p className="medals-gold-note">
                  For 2026, Gold is assessed through three Special Awards selected on the Judging Form rather than a
                  separate written narrative — each judge scores those awards on their own rubric, and Gold requires
                  a final yes on all three. Our final selection will be confirmed before the Wiki Freeze; the
                  candidates below are where our evidence is strongest.
                </p> */}
              </div>

              <p className="medals-gold-note">
                One block per award, each with the questions judges score and
                our answer to every one of them.
              </p>

              <div className="medals-gold-awards">
                {BALLOT_AWARDS.map((award) => (
                  <section
                    className="medals-gold-award"
                    id={award.id}
                    key={award.id}
                  >
                    <h3 className="medals-gold-award__title">{award.award}</h3>
                    <p className="medals-gold-award__body">{award.body}</p>
                    <div className="medals-links">
                      <Link className="medals-link-btn" to={award.page}>
                        {award.pageLabel}
                      </Link>
                    </div>

                    <div className="medals-gold-award__questions">
                      {award.questions.map((item) => (
                        <AccordionSection
                          key={item.question}
                          className="medals-ballot-accordion"
                          title={item.question}
                        >
                          {(Array.isArray(item.answer)
                            ? item.answer
                            : [item.answer]
                          ).map((paragraph) => (
                            <p
                              className="medals-ballot__answer"
                              key={paragraph.slice(0, 40)}
                            >
                              <Rich text={paragraph} />
                            </p>
                          ))}
                          {item.see && (
                            <p className="medals-ballot__see">
                              See “{item.see.section}” on{" "}
                              <Link
                                className="medals-ballot__see-link"
                                to={item.see.page}
                              >
                                {item.see.label}
                              </Link>
                              .
                            </p>
                          )}
                        </AccordionSection>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}