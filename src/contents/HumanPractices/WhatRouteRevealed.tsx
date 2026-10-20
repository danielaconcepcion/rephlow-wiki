import { CardFanGlyph } from "./HeroObjects";
import { ToolkitDeck } from "./ToolkitDeck";
import { ImpactRoute } from "./ImpactRoute";
import "./WhatRouteRevealed.css";

/** The survey's headline results, as the source reports them. */
const SURVEY_TILES = [
  {
    value: "2.4 / 5",
    label: "average self-rated prior knowledge of water pollution",
  },
  {
    value: "54%",
    label: "knew that phosphorus can become a serious contaminant in excess",
  },
  {
    value: "89%",
    label:
      "would support technologies that recycle phosphorus from wastewater into a useful resource",
  },
  {
    value: "3.8 / 5",
    label:
      "average view on genetically modified microorganisms for treatment; only one respondent opposed",
  },
];

/** Where respondents think the phosphorus comes from. The remainder is
 * shown as its own, muted row rather than left unaccounted for. */
const SURVEY_SOURCES = [
  { label: "Industrial discharges", share: 34 },
  { label: "Agricultural fertilisers", share: 31 },
  { label: "Did not know", share: 14 },
  { label: "Other answers", share: 21, muted: true },
];

/** What the route added up to in numbers. */
const IMPACT_FIGURES = [
  { value: "23", label: "interviews" },
  { value: "6", label: "site visits" },
  {
    value: "Thousands",
    label:
      "people reached across interviews, educational activities and social media: an order of magnitude, not an exact count",
  },
];

/**
 * Section 5 — "What the Route Revealed". Content transcribed from the
 * Notion page "5. What the route revealed".
 */
export function WhatRouteRevealed() {
  return (
    <section className="hp-section what-route-revealed" id="route-revealed">
      <div className="wrr-hero">
        <div className="wrr-hero__grid">
          <div className="wrr-hero__intro">
            <h2>5. What the Route Revealed</h2>
            <p className="wrr-hero__lede">
              A route is not finished when you arrive. It is finished when you
              understand what the journey changed. By the end of ours,
              phosphorus had taken us from an industrial degumming tank in
              Huelva to a collapsing lagoon in Murcia, from a reservoir
              supplying Madrid to a beehive in the countryside, from laboratory
              advisors to schoolchildren. Phosphorus stopped being an abstract
              chemical element and became something we could trace through very
              different systems. This diversity of stops is what convinced us
              that rePhlow needed to be designed around{" "}
              <strong>recovery, not just removal</strong>, because phosphorus
              does not disappear when it leaves one system; it simply moves into
              the next one.
            </p>
          </div>

          <div className="wrr-hero-cards" aria-hidden="true">
            <CardFanGlyph />
          </div>
        </div>
      </div>

      <div className="hp-route-revealed__prose" id="s5-goals">
        <h3>Did we reach our initial goals, or did we have to adjust them?</h3>
        <p>
          Following the phosphorus route did not just generate evidence, it
          repeatedly forced us to revise what rePhlow was supposed to be. Being
          honest about that here matters as much as describing what we built.
        </p>
        <p>
          We did not begin with the project we ended with. Our original concept
          was a <strong>multi-organism consortium</strong>, chosen for
          biological ambition rather than experimental tractability.
          Consultations captured in the Design Compass (
          <a className="vsi-wikilink" href="#s1-value-scientific-robustness">
            Scientific robustness and integrity
          </a>
          ), with Molpeceres, Díaz del Toro, Hidalgo and Mateos, made clear that
          a consortium combining several organisms and functions would be
          extremely difficult to characterise reproducibly within the time we
          had, and would make it hard to attribute any observed phenotype to a
          specific genetic change. We narrowed the design to a single,
          well-characterised <em>Pseudomonas putida</em> KT2440 chassis. This
          was not a failure to reach our original ambition; it was a deliberate
          trade-off between apparent ambition and experimental interpretability,
          made explicit rather than hidden.
        </p>
        <p>
          A second, smaller adjustment happened at the hardware level: our
          original treatment proposal included a final filter (the "Y-filter")
          whose own materials could become a source of pollution, with no
          convincing answer for sludge production or end-of-life management.
          Once the reactor design changed and the revalorisation pathway gave us
          a genuine route for the recovered phosphorus, that filter became
          redundant and we removed it, reducing process complexity instead of
          accumulating unjustified components.
        </p>
        <p>
          In both cases, the adjustment came from the same discipline: when new
          evidence contradicted an assumption we had made early on, we treated
          that as a signal to change the project, not as a problem to work
          around. We did not reach our initial goals unchanged, we reached a
          narrower, more defensible version of them, and consider that the more
          honest outcome of the two.
        </p>
      </div>

      <div className="hp-route-revealed__prose" id="s5-impact">
        <h3>The impact</h3>
        <p>
          By following phosphorus from industry to ecosystems and society, we
          understood that rePhlow could not be only a laboratory project. It had
          to respond to real wastewater constraints, environmental urgency,
          safety expectations and circular-economy needs. What this route
          revealed was not a single impact, but four connected ones.
        </p>
        <ImpactRoute />

        <div className="hp-survey" id="s5-survey">
          <h4 className="hp-survey__title">
            Where public understanding stands
          </h4>
          <p>
            Alongside our outreach activities, we wanted a clearer, more
            measurable picture of where public understanding actually stood
            before we started talking to people. To find out, we ran an{" "}
            <strong>anonymous online survey</strong> (n = 35; ages 12 to 60;
            mixed backgrounds, roughly half in science, environment or
            technology fields and half outside them) asking people how much they
            actually know about water pollution and how they feel about a
            biotechnology-based solution.
          </p>
          <ul className="hp-survey__tiles" aria-label="Headline survey results">
            {SURVEY_TILES.map((tile) => (
              <li className="hp-survey__tile" key={tile.label}>
                <span className="hp-survey__value">{tile.value}</span>
                <span className="hp-survey__label">{tile.label}</span>
              </li>
            ))}
          </ul>
          <p>
            The results confirmed something we had suspected since Section 0:{" "}
            <strong>
              the general public does not carry the same picture of phosphorus
              that we do.
            </strong>{" "}
            Respondents rated their own prior knowledge of water pollution at an
            average of 2.4 out of 5, and only 54% knew that phosphorus, an
            element most people associate with fertility and life rather than
            pollution, can become a serious contaminant in excess. When asked
            where they thought most of that phosphorus came from, opinion split
            almost evenly between industrial discharges (34%) and agricultural
            fertilisers (31%), with 14% admitting they simply did not know. This
            was a reminder that the industrial point-source framing we adopted
            in Section 0 is not the public's default mental model of the
            problem, and that any future communication needs to state it
            explicitly rather than assume it.
          </p>
          <figure className="hp-survey__chart">
            <figcaption>
              Where do respondents think the phosphorus polluting water comes
              from?
            </figcaption>
            <ul className="hp-survey__bars">
              {SURVEY_SOURCES.map((row) => (
                <li
                  className={`hp-survey__bar-row${row.muted ? " is-muted" : ""}`}
                  key={row.label}
                  title={`${row.label}: ${row.share}% of respondents`}
                >
                  <span className="hp-survey__bar-label">{row.label}</span>
                  <span className="hp-survey__bar-track" aria-hidden="true">
                    <span
                      className="hp-survey__bar-fill"
                      style={{ width: `${row.share}%` }}
                    />
                  </span>
                  <span className="hp-survey__bar-value">{row.share}%</span>
                </li>
              ))}
            </ul>
            <p className="hp-survey__note">
              "Other answers" is the remainder of responses not broken down in
              our survey summary (100% − 34% − 31% − 14%).
            </p>
          </figure>
          <p>
            What stood out most, however, was the{" "}
            <strong>
              gap between uncertainty about the problem and confidence in the
              solution.
            </strong>{" "}
            Despite that low self-rated knowledge, 89% of respondents said they
            would support technologies that recycle phosphorus from wastewater
            into a useful resource such as fertiliser, and views on genetically
            modified microorganisms for treatment leaned favourable overall,
            with an average of 3.8 out of 5 and only one respondent opposed.
            This told us something important for our{" "}
            <a className="vsi-wikilink" href="#s1-compass">
              Access and Fairness
            </a>{" "}
            value: the barrier to public acceptance of rePhlow is unlikely to be
            resistance to the underlying biotechnology itself. It is much more
            likely to be the <strong>same communication gap</strong> that our
            interview with a long-term resident of the Embalse de San Juan
            surfaced. People seem open to a circular, biology-based solution to
            a problem they have not yet been given the tools to fully
            understand.
          </p>
        </div>
      </div>

      <ToolkitDeck />

      <div className="hp-route-revealed__prose" id="s5-measuring">
        <h3>Measuring what the route achieved</h3>
        <p>
          To avoid impact remaining a set of good intentions, we structured the
          evidence of our route into two categories, quantitative and
          qualitative, following the same logic already used to evaluate
          responsibility throughout the project.
        </p>
        <h4 className="hp-survey__title">Quantitative impact</h4>
        <ul className="hp-impact-figures" aria-label="Quantitative impact">
          {IMPACT_FIGURES.map((figure) => (
            <li className="hp-survey__tile" key={figure.label}>
              <span className="hp-survey__value">{figure.value}</span>
              <span className="hp-survey__label">{figure.label}</span>
            </li>
          ))}
        </ul>
        <h4 className="hp-survey__title">Qualitative impact</h4>
        <p>
          Each line below is a category with a destination, not a summary of
          what was said: the content itself already lives, in full, elsewhere on
          this page.
        </p>
        <dl className="hp-impact-list">
          <div>
            <dt>Expert testimony</dt>
            <dd>
              See{" "}
              <a className="vsi-wikilink" href="#stakeholders">
                Stakeholders &amp; Voices
              </a>{" "}
              for the full interviews (Bio-Oils, Repsol, CEDEX, IQOG-CSIC, UCM
              advisors, chassis-selection consultations).
            </dd>
          </div>
          <div>
            <dt>Team reflections</dt>
            <dd>
              See the{" "}
              <a className="vsi-wikilink" href="#s1-compass">
                Design Compass&apos;s
              </a>{" "}
              "Reflect" entries under each of the six values, and the{" "}
              <a className="vsi-wikilink" href="#s4-responsibility">
                Responsibility Checkpoint&apos;s
              </a>{" "}
              "What remains open" fields.
            </dd>
          </div>
          <div>
            <dt>Social questions raised</dt>
            <dd>
              See{" "}
              <a className="vsi-wikilink" href="#stakeholders">
                Section 2, Society
              </a>
              , and the outreach activities referenced under{" "}
              <a className="vsi-wikilink" href="#s5-impact">
                Social impact
              </a>{" "}
              above.
            </dd>
          </div>
          <div>
            <dt>Shifts in perception</dt>
            <dd>
              See the Society engagement described under{" "}
              <a className="vsi-wikilink" href="#s5-impact">
                Social impact
              </a>
              , and the framing change documented under "Is rePhlow aligned with
              a real regulatory direction?" in the{" "}
              <a className="vsi-wikilink" href="#s4-responsibility">
                Responsibility Checkpoint
              </a>
              .
            </dd>
          </div>
          <div>
            <dt>Lessons learned</dt>
            <dd>
              See{" "}
              <a className="vsi-wikilink" href="#s4-lessons">
                What this checkpoint taught us
              </a>{" "}
              in From Design to Implementation, and{" "}
              <a className="vsi-wikilink" href="#s5-goals">
                Did we reach our initial goals?
              </a>{" "}
              above.
            </dd>
          </div>
        </dl>
        <p className="hp-route-revealed__closing">
          Human Practices gave us the map of the problem, but it also helped us navigate the journey. Every conversation, every perspective, and every piece of evidence brought us closer to understanding real-world needs, shaping rePhlow into a project grounded in meaningful dialogue, responsibility, and real-world impact.
        </p>
      </div>
    </section>
  );
}
