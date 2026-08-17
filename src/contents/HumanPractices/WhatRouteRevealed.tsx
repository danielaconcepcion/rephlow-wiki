import { CardFanGlyph } from "./HeroObjects";
import { ToolkitDeck } from "./ToolkitDeck";
import "./WhatRouteRevealed.css";

/**
 * Section 5 — "What the Route Revealed". Content transcribed from the
 * Notion page "5. What the route revealed". The quantitative-impact table
 * (5.4) is omitted: every row in the source is a literal "[to complete]"
 * placeholder, and the source text itself says the table "should not
 * appear until real data exists" — so only the qualitative-impact list,
 * which has real content and cross-links, is kept.
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
              advisors to schoolchildren — phosphorus stopped being an abstract
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
          Following the phosphorus route did not just generate evidence — it
          repeatedly forced us to revise what rePhlow was supposed to be. Being
          honest about that here matters as much as describing what we built.
        </p>
        <p>
          We did not begin with the project we ended with. Our original concept
          was a <strong>multi-organism consortium</strong>, chosen for
          biological ambition rather than experimental tractability.
          Consultations captured in the Design Compass (Scientific robustness
          and integrity), with Molpeceres, Díaz del Toro, Hidalgo and Mateos,
          made clear that a consortium combining several organisms and functions
          would be extremely difficult to characterise reproducibly within the
          time we had, and would make it hard to attribute any observed
          phenotype to a specific genetic change. We narrowed the design to a
          single, well-characterised <em>Pseudomonas putida</em> KT2440 chassis.
          This was not a failure to reach our original ambition; it was a
          deliberate trade-off between apparent ambition and experimental
          interpretability, made explicit rather than hidden.
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
          around. We did not reach our initial goals unchanged — we reached a
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
        <p>
          The route confirmed the <strong>environmental</strong>,{" "}
          <strong>industrial</strong> and <strong>circular</strong> impact
          already established through the Design Compass.
        </p>
        <p>
          <strong>Social impact</strong>, however, does not live anywhere else
          in this narrative and deserves its own space here. Talking with
          schoolchildren and members of the public taught us that impact is not
          only technical — rePhlow's social impact lies in improving public
          understanding of phosphorus, eutrophication and safe synthetic
          biology, replacing abstraction, and at times wariness of GMOs, with a
          clearer picture of what the technology does and why it matters. We
          engaged this community through outreach talks in primary and secondary
          schools, a hands-on laboratory workshop for children, and a talk at
          the Museo Nacional de Ciencias Naturales. These conversations were not
          just about the impact rePhlow could have, but about whether it would
          be trusted enough to be adopted at all.
        </p>
      </div>

      <ToolkitDeck />

      <div className="hp-route-revealed__prose" id="s5-measuring">
        <h3>Measuring what the route achieved</h3>
        <p>
          To avoid impact remaining a set of good intentions, we structured the
          evidence of our route into categories with a destination, not a
          summary of what was said — the content itself already lives, in full,
          elsewhere on this page.
        </p>
        <dl className="hp-impact-list">
          <div>
            <dt>Expert testimony</dt>
            <dd>
              See Stakeholders &amp; Voices for the full interviews (Bio-Oils,
              Repsol, CEDEX, IQOG-CSIC, UCM advisors, chassis-selection
              consultations).
            </dd>
          </div>
          <div>
            <dt>Team reflections</dt>
            <dd>
              See the Design Compass's "Reflect" entries under each of the six
              values, and the Responsibility Checkpoint's "What remains open"
              fields.
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
              See "What this checkpoint taught us" in From Design to
              Implementation, and "Did we reach our initial goals?" above.
            </dd>
          </div>
        </dl>
        <p className="hp-route-revealed__closing">
          Human Practices gave us the map of the problem. Integrated Human
          Practices changed the route of the project — turning every stop, every
          conversation, and every piece of evidence gathered along the way into
          a design decision, not just a story to tell afterwards.
        </p>
      </div>
    </section>
  );
}
