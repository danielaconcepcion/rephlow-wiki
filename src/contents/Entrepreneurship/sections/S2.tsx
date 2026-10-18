import { CountUp, Icon, PdfButton, TabBtn, ToggleBtn } from "../ui";
import { CmpTable, GoldenText, MbText, StageList, Stages } from "../widgets/s2";
import { sx, A } from "../util";

/* 2. Scalable, Possible and Inventive Solution */

export function S2() {
  return (
    <>
      <section
        id="s2"
        className="ent-section"
        style={sx({ "--c": "var(--s2)" })}
      >
        <header className="ent-head rv">
          <span className="ent-head__num">2</span>
          <h2 className="ent-head__title">
            Scalable, Possible and Inventive Solution
          </h2>
        </header>
        <article id="s2-product" className="sub rv">
          <header>
            <span className="eyebrow">
              Product overview: from industrial waste to high-value resource
            </span>
            <h3>
              What if the phosphorus industry pays to remove could become the
              starting material for a more valuable production process?
            </h3>
          </header>
          <p>
            Our engagement with Bio-Oils Huelva revealed that an effective
            phosphorus-recovery solution must do more than remove a contaminant.
            It must operate under real industrial conditions, integrate into
            existing infrastructure and recover phosphorus in a form that
            retains economic value. rePhlow was designed to bring these
            requirements together in a single modular bioreactor.
          </p>
          <p>
            The system targets a particular limitation of conventional
            phosphorus recovery:{" "}
            <strong>
              not all phosphorus is readily available as orthophosphate.
            </strong>{" "}
            In vegetable-oil processing streams, phosphorus can remain bound
            within organic compounds such as phospholipids and phytate [1],
            while operating conditions may be acidic, warm and variable.
            Conventional recovery technologies, including struvite
            crystallisation, primarily recover dissolved inorganic phosphate
            under suitable chemical conditions [2]. Organic phosphorus must
            first be converted into an accessible form, creating an additional
            challenge for effluents with a substantial organic phosphorus
            fraction.
          </p>
          <p>
            rePhlow addresses this through{" "}
            <strong>four integrated stages</strong>, designed to operate within
            a retrofittable treatment module.
          </p>
          <Stages>
            <div className="stages__img">
              <img
                src={A("img/process.jpg")}
                alt="rePhlow bioreactor: effluent enters the reactor basket with enzyme-coated capsules, passes an ultrafiltration unit and leaves as clean water; capsules are recovered and the polyphosphate is converted into a valuable product"
              />{" "}
              <TabBtn
                k="st"
                v="1"
                className="hot"
                style={{ left: "11%", top: "70%" }}
                aria-label="Stage 1"
              >
                1
              </TabBtn>{" "}
              <TabBtn
                k="st"
                v="2"
                className="hot"
                style={{ left: "35%", top: "27%" }}
                aria-label="Stage 2"
              >
                2
              </TabBtn>{" "}
              <TabBtn
                k="st"
                v="3"
                className="hot"
                style={{ left: "53.5%", top: "27%" }}
                aria-label="Stage 3"
              >
                3
              </TabBtn>{" "}
              <TabBtn
                k="st"
                v="4"
                className="hot"
                style={{ left: "79%", top: "62%" }}
                aria-label="Stage 4"
              >
                4
              </TabBtn>
            </div>
            <StageList />
          </Stages>
          <h4>One platform, two sources of value</h4>
          <p>
            What differentiates rePhlow is not any individual component, but the
            integration of phosphorus release, biological accumulation, physical
            containment and downstream valorisation within one circular
            biotechnology platform.
          </p>
          <div className="grid2" style={{ margin: "12px 0" }}>
            <div className="card tint">
              <span className="k">Treatment & recovery</span>
              <p>
                Providing industrial facilities with a modular
                phosphorus-treatment and recovery solution.
              </p>
            </div>
            <div className="card tint">
              <span className="k">Value from recovered P</span>
              <p>
                Creating value from the recovered phosphorus through its
                potential use in ATP-dependent biocatalysis [14].
              </p>
            </div>
          </div>
          <p>
            Rather than treating phosphorus removal and phosphorus valorisation
            as separate processes, rePhlow is designed to connect them. Our
            value proposition is therefore not simply to remove phosphorus more
            efficiently, but{" "}
            <strong>
              to transform an industrial treatment cost into an opportunity for
              resource recovery and value creation.
            </strong>
          </p>
        </article>
        <article id="s2-mvp" className="sub rv">
          <header>
            <span className="eyebrow">
              Minimum Viable Product: from concept to industrial validation
            </span>
            <h3>The minimum system needed to prove that the vision can work</h3>
          </header>
          <p className="hook">
            A complete biotechnology platform is our long-term vision. Our MVP
            is the minimum system needed to prove that this vision can work.
          </p>
          <p>
            Following the Product Overview, we defined a Minimum Viable Product
            (MVP) that integrates rePhlow’s four essential functions: enzymatic
            phosphorus release, biological accumulation, physical containment
            and downstream valorisation. Rather than attempting full-scale
            deployment immediately, our approach focuses on generating the
            evidence required to justify the next commercial milestone:{" "}
            <strong>a funded industrial pilot.</strong>
          </p>
          <details className="acc acc--big">
            <summary className="sum-specs">
              <span className="sum-t">Our 5 L integrated MVP</span>
              <div className="specs specs--hero">
                <div>
                  <CountUp text="5 L" />
                  <span>bench-scale bioreactor</span>
                </div>
                <div>
                  <CountUp text="~3 L" />
                  <span>representative industrial effluent</span>
                </div>
                <div>
                  <CountUp text="pH 5" />
                  <span>operating pH</span>
                </div>
                <div>
                  <CountUp text="30 °C" />
                  <span>operating temperature</span>
                </div>
                <div>
                  <CountUp text="~2.5 mm" />
                  <span>core-shell capsules</span>
                </div>
              </div>
            </summary>
            <div className="acc-body">
              <p>
                Our proposed MVP is a 5 L bench-scale bioreactor, initially
                operating in batch mode with approximately 3 L of representative
                industrial effluent at pH 5 and 30 °C, before progressing
                towards semi-continuous operation. A rotating stainless-steel
                basket holds approximately 2.5 mm core-shell alginate-chitosan
                capsules, together with inert beads to prevent compaction. Each
                capsule combines immobilised hydrolytic enzymes on its surface
                with engineered <em>Pseudomonas putida</em> KT2440 in its core.
                A terminal ultrafiltration cartridge provides an additional
                physical containment barrier.
              </p>
              <p>
                The first MVP build carries the three phosphohydrolases we have
                already expressed, purified and characterised, which cover the
                acid-phosphatase and phytase activities. Phospholipase activity
                is being produced through cell-free expression and will be added
                to the capsule surface once available.
              </p>
              <p>
                Following treatment, recovered polyphosphate is transferred to a
                separate downstream bench, where BcPPK2-III regenerates ATP to
                support DHAP synthesis through a PROSS-stabilised
                dihydroxyacetone kinase (DHAK). DHAP is our initial
                proof-of-concept product, not a fixed commercial destination.
                The platform is designed to accommodate alternative enzymatic
                cascades as future applications emerge.
              </p>
              <p className="quote">
                One reactor, one capsule formulation and one downstream cascade:
                enough to test the integrated system without introducing
                unnecessary complexity.
              </p>
            </div>
          </details>
          <div className="acc acc--big acc--static">
            <div className="acc-head">
              Three hypotheses, three critical questions
            </div>
            <div className="acc-body">
              <p>
                Our MVP is designed to test three hypotheses that determine
                whether rePhlow’s value proposition is technically achievable.
              </p>
              <div className="grid3 hyp">
                <div className="card tint">
                  <span className="k">H1</span>
                  <h5>Accessibility</h5>
                  <p>
                    Immobilised hydrolases release orthophosphate from organic
                    phosphorus in representative industrial effluent.
                  </p>
                  <p className="val">
                    At stake: without hydrolysis, the targeted phosphorus
                    remains inaccessible.
                  </p>
                </div>
                <div className="card tint">
                  <span className="k">H2</span>
                  <h5>Accumulation and containment</h5>
                  <p>
                    Encapsulated engineered <em>P. putida</em> accumulates
                    phosphorus as polyphosphate while remaining physically
                    retained.
                  </p>
                  <p className="val">
                    At stake: without effective capture and containment,
                    industrial integration is not viable.
                  </p>
                </div>
                <div className="card tint">
                  <span className="k">H3</span>
                  <h5>Valorisation</h5>
                  <p>
                    Recovered polyphosphate supports ATP regeneration and DHAP
                    synthesis.
                  </p>
                  <p className="val">
                    At stake: without downstream conversion, the proposed second
                    revenue stream remains unvalidated.
                  </p>
                </div>
              </div>
              <p style={{ marginTop: "12px" }}>
                These hypotheses allow us to assess biological performance,
                integrated treatment feasibility and downstream value creation
                separately.
              </p>
            </div>
          </div>
          <details className="acc acc--big">
            <summary>What we include and what we defer</summary>
            <div className="acc-body">
              <p>
                The MVP includes five essential elements: representative
                industrial effluent, enzyme-functionalised capsules,
                encapsulated engineered bacteria, a rotating basket with
                ultrafiltration, and one downstream enzymatic cascade. Each
                component is necessary to evaluate at least one of our three
                hypotheses.
              </p>
              <div className="chips">
                <span className="chip">
                  <Icon n="check" c="#5f7d36" /> Representative industrial
                  effluent
                </span>
                <span className="chip">
                  <Icon n="check" c="#5f7d36" /> Enzyme-functionalised capsules
                </span>
                <span className="chip">
                  <Icon n="check" c="#5f7d36" /> Encapsulated engineered
                  bacteria
                </span>
                <span className="chip">
                  <Icon n="check" c="#5f7d36" /> Rotating basket with
                  ultrafiltration
                </span>
                <span className="chip">
                  <Icon n="check" c="#5f7d36" /> One downstream enzymatic
                  cascade
                </span>
              </div>
              <p>
                However, an MVP must minimise complexity without removing the
                features that make the product distinctive. We therefore
                deliberately postpone several developments:
              </p>
              <div className="tbl-wrap">
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Deferred feature</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="rowh">Multiple reactor modules</td>
                      <td>
                        First validate the performance of a single module.
                      </td>
                    </tr>
                    <tr>
                      <td className="rowh">Continuous-flow operation</td>
                      <td>
                        Establish reaction kinetics and hydraulic retention time
                        before defining continuous operating conditions.
                      </td>
                    </tr>
                    <tr>
                      <td className="rowh">
                        The three polyP-loss knockouts (<em>ppx, ppkB, pitB</em>
                        )
                      </td>
                      <td>
                        No guide plasmid could be verified in this iteration, so
                        no chromosomal edit was installed. The MVP therefore
                        runs on the plasmid-based accumulation machinery alone,
                        and the knockouts are evaluated as a later improvement.
                      </td>
                    </tr>
                    <tr>
                      <td className="rowh">
                        Phospholipase activity on the capsule surface
                      </td>
                      <td>
                        The two phospholipase C candidates proved cytotoxic to
                        the expression host and have been rerouted to cell-free
                        synthesis; the panel baseline is therefore the three
                        enzymes already characterised.
                      </td>
                    </tr>
                    <tr>
                      <td className="rowh">Inline downstream conversion</td>
                      <td>
                        Separate phosphorus recovery from valorisation to avoid
                        analytical interference.
                      </td>
                    </tr>
                    <tr>
                      <td className="rowh">Multiple downstream products</td>
                      <td>
                        First demonstrate that recovered polyphosphate is a
                        viable phosphoryl donor.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                This approach allows us to distinguish fundamental technical
                failures from optimisation opportunities.
              </p>
            </div>
          </details>
          <details className="acc acc--big">
            <summary>How will we measure success?</summary>
            <div className="acc-body">
              <p>
                We established preliminary go/no-go criteria to determine
                whether the integrated MVP is ready for further development.
              </p>
              <div className="tbl-wrap">
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Performance indicator</th>
                      <th>Development target</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="rowh">
                        <span
                          className="badge"
                          style={{ background: "#efe9f8", color: "var(--s2)" }}
                        >
                          H1
                        </span>{" "}
                        Enzymatic hydrolysis
                      </td>
                      <td>{">50% organic phosphorus conversion within 8 h"}</td>
                    </tr>
                    <tr>
                      <td className="rowh">
                        <span
                          className="badge"
                          style={{ background: "#efe9f8", color: "var(--s2)" }}
                        >
                          H2
                        </span>{" "}
                        Phosphorus capture
                      </td>
                      <td>
                        {
                          ">60% soluble phosphorus capture per batch (pass criterion for the integrated MVP)"
                        }
                      </td>
                    </tr>
                    <tr>
                      <td className="rowh">Treatment optimisation</td>
                      <td>
                        ≥70% phosphorus removal within 6 h, once hydrolysis and
                        uptake are running in parallel rather than sequentially
                      </td>
                    </tr>
                    <tr>
                      <td className="rowh">Biological accumulation</td>
                      <td>≥10% polyP relative to cell dry weight [7]</td>
                    </tr>
                    <tr>
                      <td className="rowh">Material recovery</td>
                      <td>
                        {
                          "≥1.5 mg polyP/g capsules; >85% recovered-fraction purity"
                        }
                      </td>
                    </tr>
                    <tr>
                      <td className="rowh">Capsule reusability</td>
                      <td>
                        ≥70% retained enzymatic activity and phosphorus-capture
                        capacity, measured on whole capsules after 5 cycles
                      </td>
                    </tr>
                    <tr>
                      <td className="rowh">Containment</td>
                      <td>
                        No engineered cells or strain-specific DNA detected in
                        the treated effluent downstream of ultrafiltration,
                        above stated analytical limits
                      </td>
                    </tr>
                    <tr>
                      <td className="rowh">
                        <span
                          className="badge"
                          style={{ background: "#efe9f8", color: "var(--s2)" }}
                        >
                          H3
                        </span>{" "}
                        Downstream valorisation
                      </td>
                      <td>
                        DHAP synthesis from recovered polyP, confirmed by
                        independent analytical methods and controls
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="note warn">
                These are development targets, not demonstrated results. They
                will be refined as experimental validation progresses.
              </p>
              <p>
                Crucially,{" "}
                <strong>
                  phosphorus removal must be distinguished from phosphorus
                  recovery.
                </strong>{" "}
                We therefore require a complete phosphorus mass balance:
              </p>
              <div className="massbal" id="massbal">
                <TabBtn k="mb" v="in" as="span" hover className="mb">
                  P<sub>influent</sub>
                </TabBtn>
                <span className="op">=</span>
                <TabBtn k="mb" v="eff" as="span" hover className="mb">
                  P<sub>effluent</sub>
                </TabBtn>
                <span className="op">+</span>
                <TabBtn k="mb" v="ret" as="span" hover className="mb">
                  P<sub>retained</sub>
                </TabBtn>
                <span className="op">+</span>
                <TabBtn k="mb" v="rec" as="span" hover className="mb">
                  P<sub>recovered</sub>
                </TabBtn>
                <span className="op">+</span>
                <TabBtn k="mb" v="un" as="span" hover className="mb">
                  P<sub>unaccounted</sub>
                </TabBtn>
              </div>
              <MbText />
              <p>
                where <em>retained</em> is the phosphorus still held inside the
                capsules at the end of a cycle and <em>recovered</em> is the
                phosphorus extracted into the downstream fraction. This ensures
                that the phosphorus removed from wastewater can be accounted
                for, rather than assuming that its disappearance from the liquid
                phase represents successful recovery.
              </p>
            </div>
          </details>
          <details className="acc acc--big">
            <summary>
              Connecting MVP performance to commercial feasibility
            </summary>
            <div className="acc-body">
              <p>
                The MVP is also designed to replace uncertain business
                assumptions with measurable evidence. Four parameters are
                particularly important:
              </p>
              <div className="grid4" style={{ margin: "12px 0" }}>
                <div className="card">
                  <h5>Phosphorus uptake under encapsulation</h5>
                  <p>Determines biological loading and reactor capacity.</p>
                </div>
                <div className="card">
                  <h5>Capsule service life</h5>
                  <p>
                    Determines replacement frequency and operating expenditure.
                  </p>
                </div>
                <div className="card">
                  <h5>Real-effluent phosphorus speciation</h5>
                  <p>Determines the enzymatic requirements of the system.</p>
                </div>
                <div className="card">
                  <h5>Enzyme stability and leaching</h5>
                  <p>
                    Determines reusability, performance consistency and
                    maintenance costs.
                  </p>
                </div>
              </div>
              <p>
                Together with validated containment, these measurements directly
                influence industrial feasibility. In particular, hydraulic
                retention time (HRT) determines the treatment capacity and
                number of modules required per facility, while capsule lifetime
                influences operating costs and potential margins. Phosphorus
                recovery and downstream conversion yields determine the
                realistic scale of the second revenue stream.
              </p>
              <p>
                The MVP must therefore demonstrate more than technical
                functionality: it must generate sufficient information to assess
                whether a competitive treatment cost is achievable. It does not
                need to demonstrate commercial profitability. It needs to
                establish whether profitability is technically and economically
                plausible, while identifying the remaining engineering and
                regulatory requirements.
              </p>
              <p className="quote">
                Our objective is not to build a miniature commercial plant, but
                to generate the evidence that justifies taking the next step
                towards one.
              </p>
            </div>
          </details>
          <PdfButton
            pdf={A("docs/rephlow-mvp-technical-specification.pdf")}
            title="rePhlow MVP Technical Specification"
          >
            <Icon n="doc" />
            <span>
              <b>rePhlow MVP Technical Specification</b>
              <small>Open the PDF viewer</small>
            </span>
          </PdfButton>
        </article>
        <article id="s2-uvp" className="sub rv">
          <header>
            <span className="eyebrow">Unique Value Proposition</span>
            <h3>Why rePhlow?</h3>
          </header>
          <p className="hook">
            Proving that rePhlow can work is only the first step. The next
            question is why an industrial customer would choose it over existing
            alternatives.
          </p>
          <p>
            Our MVP establishes the technical evidence required to evaluate
            rePhlow’s feasibility. However, commercial adoption depends on more
            than achieving phosphorus removal: our technology must offer a
            meaningful advantage over established solutions in terms of resource
            recovery, industrial integration and economic value. To understand
            where rePhlow could differentiate itself, we examined the
            limitations of conventional phosphorus-treatment technologies
            alongside the requirements identified through our industrial
            stakeholder engagement. This led us to define our Unique Value
            Proposition (UVP):
          </p>
          <p className="uvp">
            rePhlow is designed to{" "}
            <strong>recover organically bound phosphorus</strong> from
            industrial effluents and{" "}
            <strong>transform it into a higher-value biocatalytic input</strong>
            , through a <strong>modular, retrofittable system</strong> that
            avoids conventional metal-salt precipitation and incorporates{" "}
            <strong>physical containment</strong> of engineered microorganisms.
          </p>
          <p>
            Our competitive advantage is built around four interconnected
            features, each responding to a constraint identified in our target
            industrial application.
          </p>
          <div className="grid2 uvp-feats">
            <details className="acc">
              <summary>
                <span className="tag">1</span>Recovering phosphorus that
                conventional systems miss
              </summary>
              <div className="acc-body">
                <p>
                  The first constraint is where the phosphorus is. In
                  vegetable-oil degumming effluent, a significant fraction is
                  not free orthophosphate but is bound within phospholipids and
                  phytate [1], and recovery technologies built on the assumption
                  of free orthophosphate cannot act on it: it passes through the
                  process or is lost to the sludge. This is why rePhlow begins
                  with hydrolysis rather than with capture. The enzymes
                  immobilised on the capsule surface release that bound fraction
                  before any uptake occurs, which means a substantial part of
                  the phosphorus we recover is phosphorus that existing
                  technologies leave behind.
                </p>
                <p className="val">
                  Value: access to a phosphorus fraction that conventional
                  recovery systems may not capture efficiently.
                </p>
              </div>
            </details>
            <details className="acc">
              <summary>
                <span className="tag">2</span>Retrofit instead of replacement
              </summary>
              <div className="acc-body">
                <p>
                  The second constraint is that this effluent is produced by
                  plants that are already built. A treatment line cannot be
                  replaced without downtime and capital works, and a technology
                  that requires either will not be adopted regardless of how
                  well it performs. This is why rePhlow is a module rather than
                  a process: identical units installed in bypass, scaled by
                  adding modules and replaced individually without interrupting
                  production, so that adoption can begin at a scale a plant
                  manager is able to authorise.
                </p>
                <p className="val">
                  Value: lower integration risk and a more realistic route to
                  first industrial adoption.
                </p>
              </div>
            </details>
            <details className="acc">
              <summary>
                <span className="tag">3</span>Recovery with a higher-value
                destination
              </summary>
              <div className="acc-body">
                <p>
                  The third constraint is economic, and it determines what we do
                  with the phosphorus once captured. Removing it into a metal
                  sludge leaves the operator paying for disposal and leaves the
                  phosphorus in a form that is difficult to return to productive
                  use [2,15], while converting it into struvite yields a
                  fertiliser commodity whose value depends on bulk markets and
                  logistics unrelated to an oil refinery’s business. Neither
                  outcome changes the fact that phosphorus appears on the
                  plant’s accounts as a cost. This is why our polyphosphate is
                  not a final product but a phosphoryl donor: it drives a
                  biocatalytic cycle whose output is chosen rather than fixed,
                  so that the same recovered phosphorus can be directed towards
                  whichever product a given client, sector or regulatory context
                  makes most valuable. Our ATP-regeneration and DHAP cascade
                  demonstrates the principle, removing the requirement to supply
                  the nucleotide stoichiometrically that has limited
                  ATP-dependent biocatalysis [14,16], and the same donor can
                  feed other cascades entirely.
                </p>
                <p className="val">
                  Value: phosphorus recovery is linked to flexible valorisation
                  rather than disposal or a single commodity product.
                </p>
              </div>
            </details>
            <details className="acc">
              <summary>
                <span className="tag">4</span>Containment built into the system
              </summary>
              <div className="acc-body">
                <p>
                  The fourth constraint arises from the solution itself. Using
                  an engineered organism to capture the phosphorus introduces a
                  containment requirement that procedures alone cannot satisfy
                  in an industrial setting, and containment achieved by adding
                  barriers would add cost to a system whose economics we have
                  just described. rePhlow resolves this by giving each barrier a
                  second function: the capsule contains the cells and also
                  allows them to be reused across cycles, the rotating basket
                  confines the capsules and also reduces the shear that would
                  shorten their life, and the ultrafiltration stage forms a
                  final barrier and also polishes the effluent before discharge.
                  Containment is therefore structural rather than procedural,
                  and it does not appear in the cost structure as a penalty.
                </p>
                <p className="val">
                  Value: containment is designed as part of the process rather
                  than added afterwards.
                </p>
              </div>
            </details>
          </div>
          <h4>Competitive positioning: where does rePhlow fit?</h4>
          <p>
            These four advantages become commercially meaningful when compared
            with existing treatment and recovery alternatives. We therefore
            considered six existing technology categories alongside rePhlow,
            assessing their potential to address the principal requirements of
            our target industrial application. Our comparison focuses on
            phosphorus removal and recovery, chemical dependency, compatibility
            with variable industrial streams, retrofit potential and the
            possibility of circular valorisation.
          </p>
          <div className="tabs">
            <ToggleBtn k="cmp" className="btn" id="cmpSort">
              Highlight where each alternative falls short
            </ToggleBtn>
          </div>
          <div className="tbl-wrap">
            <CmpTable>
              <thead>
                <tr>
                  <th>Competitor</th>
                  <th>Core technology</th>
                  <th>P removal</th>
                  <th>P recovery</th>
                  <th>Low chemical dependence</th>
                  <th>Variable industrial streams</th>
                  <th>Retrofit potential</th>
                  <th>Circular valorisation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hl">
                  <td className="rowh">rePhlow</td>
                  <td>
                    Engineered PAO encapsulated in enzyme-functionalised
                    alginate-chitosan capsules
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                </tr>
                <tr>
                  <td className="rowh">
                    Ostara / NuReSys / Struvia™ / Phosphogreen™ [17–20]
                  </td>
                  <td>Struvite crystallisation</td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                </tr>
                <tr>
                  <td className="rowh">Microvi [21]</td>
                  <td>Immobilised microbial biocatalysts</td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                </tr>
                <tr>
                  <td className="rowh">Chemical precipitation [2,15]</td>
                  <td>Iron or aluminium salts</td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot r" />
                  </td>
                  <td className="c">
                    <i className="dot r" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot r" />
                  </td>
                </tr>
                <tr>
                  <td className="rowh">
                    Enhanced Biological Phosphorus Removal (EBPR) [22]
                  </td>
                  <td>Mixed microbial communities (PAOs)</td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot r" />
                  </td>
                  <td className="c">
                    <i className="dot r" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                </tr>
                <tr>
                  <td className="rowh">Novonesis [23]</td>
                  <td>Enzymatic and microbial process optimisation</td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                  <td className="c">
                    <i className="dot r" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot r" />
                  </td>
                </tr>
                <tr>
                  <td className="rowh">
                    Large full-service operators [19,20,24,25]
                  </td>
                  <td>Integrated chemical and biological treatment</td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                  <td className="c">
                    <i className="dot g" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                  <td className="c">
                    <i className="dot y" />
                  </td>
                </tr>
              </tbody>
            </CmpTable>
          </div>
          <div className="legend">
            <span>
              <i className="dot g" />
              strong
            </span>
            <span>
              <i className="dot y" />
              partial or conditional
            </span>
            <span>
              <i className="dot r" />
              limited or absent
            </span>
          </div>
          <p className="note">
            The assessment is qualitative and reflects technology
            characteristics and rePhlow’s intended design. It does not represent
            independently verified comparative performance or demonstrated
            superiority.
          </p>
        </article>
        <article id="s2-ip" className="sub rv">
          <header>
            <span className="eyebrow">Intellectual property strategy</span>
            <h3>Balancing innovation and open science</h3>
          </header>
          <p>
            In line with iGEM’s commitment to open science and responsible
            innovation, rePhlow aims to balance scientific knowledge-sharing
            with long-term commercial viability.{" "}
            <strong>
              iGEM asks teams to share what they learn, not to give up what they
              build:
            </strong>{" "}
            biological parts are deposited in the Registry so that future teams
            can reuse them, and the work is documented on a wiki published under
            CC BY 4.0. We meet that in full.
          </p>
          <div className="ipsplit">
            <div
              className="card"
              style={{ borderColor: "#cfe2bd", background: "#f7fbf2" }}
            >
              <h5 style={{ color: "var(--ok)" }}>
                <Icon n="unlock" c="#3f9a5a" /> Open: the commons
              </h5>
              <p>
                Our genetic engineering approaches, enzyme panel, capsule
                formulation, containment metric and experimental results are
                openly documented through the iGEM Wiki and Registry,{" "}
                <strong>including the experiments that did not work.</strong>
              </p>
            </div>
            <div className="ipsplit__mid" aria-hidden="true">
              ⇄
            </div>
            <div
              className="card"
              style={{ borderColor: "#d8cfe8", background: "#f8f5fc" }}
            >
              <h5 style={{ color: "var(--s2)" }}>
                <Icon n="lock" c="#6e5a96" /> Assessed for protection
              </h5>
              <p>
                That commons covers the parts and the documentation. It does not
                cover the integrated system we have built around them, and iGEM
                does not ask it to. We are therefore exploring potential
                intellectual property protection for novel aspects of our{" "}
                <strong>
                  integrated bioreactor, encapsulation system and industrial
                  applications.
                </strong>
              </p>
            </div>
          </div>
          <p>
            Before pursuing patent protection, we intend to assess novelty,
            freedom to operate, third-party rights and institutional ownership
            with the appropriate technology-transfer and legal specialists. In
            the meantime, our defensibility rests on{" "}
            <strong>
              integration, operating know-how and the capsule supply
              relationship with each customer
            </strong>{" "}
            rather than on exclusive rights. This approach seeks to preserve the
            collaborative spirit of iGEM while establishing a responsible
            foundation for future commercialisation.
          </p>
        </article>
        <details id="s2-golden" className="sub sub--fold rv">
          <summary>
            <header>
              <span className="eyebrow">Other resources</span>
              <h3>The Golden Circle</h3>
            </header>
          </summary>
          <div className="golden">
            <svg
              className="golden__svg"
              viewBox="0 0 320 320"
              role="group"
              aria-label="Golden circle: Why, How, What"
            >
              <TabBtn
                k="gc"
                v="what"
                as="circle"
                className="gc gc-what"
                cx="160"
                cy="160"
                r="150"
              ></TabBtn>
              <TabBtn
                k="gc"
                v="how"
                as="circle"
                className="gc gc-how"
                cx="160"
                cy="160"
                r="100"
              ></TabBtn>
              <TabBtn
                k="gc"
                v="why"
                as="circle"
                className="gc gc-why"
                cx="160"
                cy="160"
                r="50"
              ></TabBtn>
              <TabBtn k="gc" v="why" as="text" className="gct" x="160" y="167">
                WHY?
              </TabBtn>
              <TabBtn k="gc" v="how" as="text" className="gct" x="160" y="90">
                HOW?
              </TabBtn>
              <TabBtn k="gc" v="what" as="text" className="gct" x="160" y="38">
                WHAT?
              </TabBtn>
            </svg>
            <GoldenText />
          </div>
        </details>
        <details className="refs rv">
          <summary>References</summary>
          <ol>
            <li>
              Dayton CLG, Da Silva Galhardo F, Barton N, Hitchman T, Lyon J,
              O’Donoghue E, et al. Oil degumming methods. European patent
              EP2488639A1. 2009.
            </li>
            <li>
              Zheng Y, Wan Y, Zhang Y, Huang J, Yang Y, Tsang DCW, et al.
              Recovery of phosphorus from wastewater: a review based on current
              phosphorous removal and recovery technologies. Crit Rev Environ
              Sci Technol. 2023;53(11):1148–72.
              doi:10.1080/10643389.2022.2128194
            </li>
            <li>
              Thaller MC, Schippa S, Bonci A, Cresti S, Rossolini GM.
              Identification of the gene (aphA) encoding the class B acid
              phosphatase/phosphotransferase of Escherichia coli MG1655 and
              characterization of its product. FEMS Microbiol Lett.
              1997;146(2):191–8. doi:10.1111/j.1574-6968.1997.tb10192.x
            </li>
            <li>
              Huang H, Luo H, Yang P, Meng K, Wang Y, Yuan T, et al. A novel
              phytase with preferable characteristics from Yersinia intermedia.
              Biochem Biophys Res Commun. 2006;350(4):884–9.
              doi:10.1016/j.bbrc.2006.09.118
            </li>
            <li>
              Titball RW. Bacterial phospholipases C. Microbiol Rev.
              1993;57(2):347–66. doi:10.1128/mmbr.57.2.347-366.1993
            </li>
            <li>
              De Lorenzo V, Pérez-Pantoja D, Nikel PI. Pseudomonas putida
              KT2440: the long journey of a soil-dweller to become a synthetic
              biology chassis. J Bacteriol. 2024;206(7):e0013624.
              doi:10.1128/jb.00136-24
            </li>
            <li>
              Wang X, Wang X, Hui K, Wei W, Zhang W, Miao A, et al. Highly
              effective polyphosphate synthesis, phosphate removal, and
              concentration using engineered environmental bacteria based on a
              simple solo medium-copy plasmid strategy. Environ Sci Technol.
              2018;52(1):214–22. doi:10.1021/acs.est.7b04532
            </li>
            <li>
              Pereda M, Poncelet D, Renard D. Characterization of core-shell
              alginate capsules. Food Biophys. 2019;14(4):467–78.
              doi:10.1007/s11483-019-09595-x
            </li>
            <li>
              Tran DT, Nguyen NK, Yadav AS, Chuang A, Burford M, Malekpour
              Galogahi F, et al. Calcium alginate core-shell liquid beads
              encapsulated with microalgae for wastewater treatment. Adv Energy
              Sustain Res. 2024;5(7):2400112. doi:10.1002/aesr.202400112
            </li>
            <li>
              Monterrey DT, Azcona L, Revuelta J, Sánchez-Moreno I,
              García-Junceda E. Polyphosphate kinase from Burkholderia
              cenocepacia, one enzyme catalyzing a two-step cascade reaction to
              synthesize ATP from AMP. Int J Mol Sci. 2024;25(23):12995.
              doi:10.3390/ijms252312995
            </li>
            <li>
              Goldenzweig A, Goldsmith M, Hill SE, Gertman O, Laurino P, Ashani
              Y, et al. Automated structure- and sequence-based design of
              proteins for high bacterial expression and stability. Mol Cell.
              2016;63(2):337–46. doi:10.1016/j.molcel.2016.06.012
            </li>
            <li>
              Siebold C, Arnold I, Garcia-Alles LF, Baumann U, Erni B. Crystal
              structure of the Citrobacter freundii dihydroxyacetone kinase
              reveals an eight-stranded α-helical barrel ATP-binding domain. J
              Biol Chem. 2003;278(48):48236–44. doi:10.1074/jbc.M305942200
            </li>
            <li>
              Gauss D, Sánchez-Moreno I, Oroz-Guinea I, García-Junceda E,
              Wohlgemuth R. Phosphorylation catalyzed by dihydroxyacetone
              kinase. Eur J Org Chem. 2018;2018(23):2892–5.
              doi:10.1002/ejoc.201800350
            </li>
            <li>
              Tavanti M, Hosford J, Lloyd RC, Brown MJB. ATP regeneration by a
              single polyphosphate kinase powers multigram-scale aldehyde
              synthesis in vitro. Green Chem. 2021;23:828–37.
              doi:10.1039/D0GC03830J
            </li>
            <li>
              Uzkurt Kaljunen J, Al-Juboori RA, Khunjar W, Mikola A, Wells G.
              Phosphorus recovery alternatives for sludge from chemical
              phosphorus removal processes – technology comparison and system
              limitations. Sustain Mater Technol. 2022;34:e00514.
              doi:10.1016/j.susmat.2022.e00514
            </li>
            <li>
              Tavanti M, Hosford J, Lloyd RC, Brown MJB. Recent developments and
              challenges for the industrial implementation of polyphosphate
              kinases. ChemCatChem. 2021;13:3565–80. doi:10.1002/cctc.202100688
            </li>
            <li>
              Ostara Nutrient Recovery Technologies. Nutrient recovery solutions
              [Internet]. Vancouver (BC): Ostara; [cited 2026 Oct 18]. Available
              from:{" "}
              <a
                href="https://www.ostara.com/nutrient-recovery/nutrient-recovery-solutions/"
                target="_blank"
                rel="noopener"
              >
                https://www.ostara.com/nutrient-recovery/nutrient-recovery-solutions/
              </a>
            </li>
            <li>
              NuReSys. Technology [Internet]. [cited 2026 Oct 18]. Available
              from:{" "}
              <a
                href="https://nuresys.com/technology/"
                target="_blank"
                rel="noopener"
              >
                https://nuresys.com/technology/
              </a>
            </li>
            <li>
              Veolia Water Technologies. Struvia™ – phosphorus recovery
              [Internet]. [cited 2026 Oct 18]. Available from:{" "}
              <a
                href="https://www.veoliawatertechnologies.co.uk/products/struvia"
                target="_blank"
                rel="noopener"
              >
                https://www.veoliawatertechnologies.co.uk/products/struvia
              </a>
            </li>
            <li>
              SUEZ. Phosphorus recovery via struvite precipitation [Internet].
              SUEZ Denmark; [cited 2026 Oct 18]. Available from:{" "}
              <a
                href="https://www.suez.com/en/denmark/wastewater/phosphorus-recovery-via-struvite-precipitation"
                target="_blank"
                rel="noopener"
              >
                https://www.suez.com/en/denmark/wastewater/phosphorus-recovery-via-struvite-precipitation
              </a>
            </li>
            <li>
              Microvi. Wastewater solutions [Internet]. Hayward (CA): Microvi;
              [cited 2026 Oct 18]. Available from:{" "}
              <a
                href="https://www.microvi.com/wastewater"
                target="_blank"
                rel="noopener"
              >
                https://www.microvi.com/wastewater
              </a>
            </li>
            <li>
              Law Y, Kirkegaard RH, Cokro AA, Liu X, Arumugam K, Xie C, et al.
              Integrative microbial community analysis reveals full-scale
              enhanced biological phosphorus removal under tropical conditions.
              Sci Rep. 2016;6:25719. doi:10.1038/srep25719
            </li>
            <li>
              Novonesis. Enzymes and solutions for industrial bioprocessing
              [Internet]. Bagsværd: Novonesis; [cited 2026 Oct 18]. Available
              from:{" "}
              <a
                href="https://www.novonesis.com/en/biosolutions/industrial-bioprocessing"
                target="_blank"
                rel="noopener"
              >
                https://www.novonesis.com/en/biosolutions/industrial-bioprocessing
              </a>
            </li>
            <li>
              Aqualia. Aqualia: integral water cycle management [Internet].
              Madrid: Aqualia; [cited 2026 Oct 18]. Available from:{" "}
              <a href="https://www.aqualia.com/" target="_blank" rel="noopener">
                https://www.aqualia.com/
              </a>
            </li>
            <li>
              ACCIONA. Water treatment and management [Internet]. Madrid:
              ACCIONA; [cited 2026 Oct 18]. Available from:{" "}
              <a
                href="https://www.acciona.com/solutions/water"
                target="_blank"
                rel="noopener"
              >
                https://www.acciona.com/solutions/water
              </a>
            </li>
          </ol>
        </details>
      </section>
    </>
  );
}
