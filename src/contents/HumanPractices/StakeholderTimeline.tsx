import { Fragment, useEffect, useState, type CSSProperties } from "react";
import {
  CATEGORIES,
  CATEGORY_DESCRIPTIONS,
  EVENTS,
  PENDING_ENTRIES,
  USER_ROWS,
  type Category,
} from "./StakeholderTimelineData";
import { AccordionSection } from "./AccordionSection";
import { VoiceNetworkGlyph } from "./HeroObjects";
import "./StakeholderTimeline.css";

type AccentStyle = CSSProperties & { "--cat-color": string };

const CATEGORY_COLOR: Record<Category, string> = {
  Industry: "#d86632",
  Science: "#7452b8",
  Environment: "#4f8b63",
  Entrepreneurship: "#c4932e",
};

const INITIAL_CATEGORY: Category = "Industry";
const INITIAL_EVENT =
  EVENTS.find((event) => event.category === INITIAL_CATEGORY) ?? EVENTS[0];

export function StakeholderTimeline() {
  const [activeId, setActiveId] = useState<string>(INITIAL_EVENT.id);
  const [activeCategory, setActiveCategory] =
    useState<Category | null>(INITIAL_CATEGORY);
  const [readMoreOpen, setReadMoreOpen] = useState(false);
  const active = EVENTS.find((event) => event.id === activeId)!;

  function selectEvent(id: string, opts?: { openReadMore?: boolean }) {
    setActiveId(id);
    setReadMoreOpen(!!opts?.openReadMore);
  }

  function jumpToCategory(category: Category) {
    setActiveCategory(category);
    const firstEvent = EVENTS.find((event) => event.category === category);

    if (firstEvent) {
      selectEvent(firstEvent.id);
      document
        .getElementById(`hp-timeline-event-${firstEvent.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const firstPending = PENDING_ENTRIES.find(
      (entry) => entry.category === category,
    );
    document
      .getElementById(`hp-timeline-pending-${firstPending?.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    function focusFromHash() {
      const hash = window.location.hash.replace("#", "");
      const prefix = "hp-timeline-event-";
      if (!hash.startsWith(prefix)) return;
      const id = hash.slice(prefix.length);
      if (!EVENTS.some((event) => event.id === id)) return;
      selectEvent(id, { openReadMore: true });
      window.requestAnimationFrame(() => {
        document
          .getElementById(`hp-timeline-event-${id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    focusFromHash();
    window.addEventListener("hashchange", focusFromHash);
    return () => window.removeEventListener("hashchange", focusFromHash);
  }, []);

  return (
    <section className="hp-section stakeholder-timeline" id="stakeholders">
      <div className="st-hero">
        <div className="st-hero__grid">
          <div className="st-hero__intro">
            <h2>2. Stakeholders &amp; Voices</h2>
            <p className="st-hero__lede">
              RePhlow was not built in a vacuum. This section brings together
              the external voices that shaped our decisions, recorded in the
              order they influenced the project. For each stakeholder, we show
              what we asked, what we learned and what changed afterwards,
              providing the evidence behind decisions discussed across our Human
              Practices.
            </p>
          </div>

          <div className="st-hero-voices" aria-hidden="true">
            <VoiceNetworkGlyph />
          </div>
        </div>
      </div>

      <div className="hp-timeline-shell">
        <div
          className="hp-timeline-categories"
          aria-label="Stakeholder categories"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`hp-timeline-category-btn${
                activeCategory === category ? " is-active" : ""
              }`}
              style={{ "--cat-color": CATEGORY_COLOR[category] } as AccentStyle}
              aria-pressed={activeCategory === category}
              onClick={() => jumpToCategory(category)}
            >
              <span className="hp-timeline-category-dot" aria-hidden="true" />
              {category}
            </button>
          ))}
        </div>

        {activeCategory && (
          <p
            className="hp-timeline-category-description"
            style={
              { "--cat-color": CATEGORY_COLOR[activeCategory] } as AccentStyle
            }
            aria-live="polite"
            dangerouslySetInnerHTML={{
              __html: CATEGORY_DESCRIPTIONS[activeCategory],
            }}
          />
        )}

        <div className="hp-timeline__intro">
          <h3>Chronological record</h3>
          <p>
            Every conversation that shaped rePhlow, in the order it influenced
            the project. Click any point to open the complete source entry in
            the detail panel.
          </p>
        </div>

        <div className="hp-timeline" id="s2-chronological">
          <div className="hp-timeline__rail">
            {EVENTS.map((event, index) => (
              <Fragment key={event.id}>
                {(index === 0 || EVENTS[index - 1].month !== event.month) && (
                  <p className="hp-timeline__month">{event.month}</p>
                )}
                <button
                  id={`hp-timeline-event-${event.id}`}
                  type="button"
                  className={`hp-timeline__dot${
                    event.id === activeId ? " is-active" : ""
                  }`}
                  style={
                    {
                      "--cat-color": CATEGORY_COLOR[event.category],
                    } as AccentStyle
                  }
                  onClick={() => selectEvent(event.id)}
                >
                  <span
                    className="hp-timeline__dot-marker"
                    aria-hidden="true"
                  />
                  <span className="hp-timeline__dot-meta">
                    <span className="hp-timeline__dot-date">{event.date}</span>
                    <span className="hp-timeline__dot-name">{event.name}</span>
                  </span>
                </button>
              </Fragment>
            ))}
          </div>

          <div className="hp-timeline__panel" role="region" aria-live="polite">
            <div
              className="hp-timeline__panel-head"
              style={
                {
                  "--cat-color": CATEGORY_COLOR[active.category],
                } as AccentStyle
              }
            >
              <span className="hp-timeline__panel-category">
                {active.category}
                {active.subcategory ? ` · ${active.subcategory}` : ""}
              </span>
              <h3>{active.name}</h3>
              <p className="hp-timeline__panel-meta">
                {active.date}
                {active.affiliation ? ` — ${active.affiliation}` : ""}
              </p>
            </div>

            <p className="hp-timeline__question">{active.question}</p>
            <p>
              <strong>{active.inputLabel}:</strong> {active.inputText}
            </p>
            <p>
              <strong>Response:</strong> {active.responseText}
            </p>

            <button
              type="button"
              className="hp-timeline__readmore-toggle"
              aria-expanded={readMoreOpen}
              onClick={() => setReadMoreOpen((open) => !open)}
            >
              {readMoreOpen ? "Hide full entry" : "Read full entry"}
            </button>

            {readMoreOpen && (
              <div
                className="hp-timeline__readmore hp-timeline__source-entry"
                dangerouslySetInnerHTML={{ __html: active.fullEntryHtml }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="hp-timeline-pending">
        <h4>Pending stakeholder entries</h4>
        <p className="hp-timeline-pending__note">
          These entries are referenced in our records but are missing a
          confirmed date, name or full write-up. Flagged here rather than
          filled in.
        </p>
        <ul>
          {PENDING_ENTRIES.map((entry) => (
            <li
              key={entry.id}
              id={`hp-timeline-pending-${entry.id}`}
              className="hp-timeline-pending__item"
              style={
                { "--cat-color": CATEGORY_COLOR[entry.category] } as AccentStyle
              }
            >
              <span className="hp-timeline-pending__dot" aria-hidden="true" />
              <div>
                <p className="hp-timeline-pending__name">
                  {entry.name}{" "}
                  <span className="hp-timeline-pending__category">
                    · {entry.category}
                  </span>
                </p>
                <p className="hp-timeline-pending__status">{entry.status}</p>
                <p className="hp-timeline-pending__body">{entry.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="hp-users" id="s2-users">
        <h3>Communities and potential users: summary table</h3>
        <p>
          As our Human Practices route expanded, we realised that asking whether
          rePhlow could remove and recover phosphorus was only part of the
          question. A technology can perform well in the laboratory and still
          fail if it does not fit the people, infrastructure and environmental
          systems around it.
        </p>
        <p>
          We therefore mapped not only those directly affected by phosphorus
          pollution, but also those who could operate rePhlow, regulate it,
          validate it, use its recovered products or ultimately experience its
          environmental consequences. These groups do not define success in the
          same way. For an industrial facility, success may mean reliable
          treatment without interrupting production. For an operator, it means
          safety and manageable maintenance. For a regulator, it means evidence
          and compliance. For downstream communities and ecosystems, it
          ultimately means that less phosphorus reaches the receiving
          environment.
        </p>
        <p>
          This mapping helped us understand rePhlow not as a technology with one
          final user, but as a system that must create value, and avoid
          transferring risk, across several connected communities.
        </p>
        <div className="hp-users__table-wrap">
          <table className="hp-users__table">
            <thead>
              <tr>
                <th>Stakeholder</th>
                <th>Relationship with rePhlow</th>
                <th>What matters most to them</th>
                <th>What rePhlow must demonstrate</th>
              </tr>
            </thead>
            <tbody>
              {USER_ROWS.map((row) => (
                <tr key={row.stakeholder}>
                  <td>{row.stakeholder}</td>
                  <td>{row.relationship}</td>
                  <td>{row.matters}</td>
                  <td>{row.mustDemonstrate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h4>From one user to a network of users</h4>
        <p>
          This mapping reinforced a conclusion that emerged repeatedly
          throughout our Human Practices: rePhlow cannot be designed around a
          single ideal user.
        </p>
        <div className="hp-users__network-accordions">
          <AccordionSection
            title="How each actor sees the same phosphorus stream"
            className="hp-users__network-accordion"
          >
            <p>
              An industrial facility, a wastewater operator, a regulator and a
              circular-economy company may all encounter the same phosphorus
              stream, but they see a different problem within it. Industry sees
              a treatment obligation and an operating cost. Operators see
              equipment that must remain safe and manageable. Regulators see a
              discharge that must be measured and justified. Circular-economy
              actors see a potential raw material. Downstream communities and
              ecosystems experience the consequences if the system fails to
              control phosphorus effectively.
            </p>
          </AccordionSection>
          <AccordionSection
            title="Who uses rePhlow and who carries its consequences"
            className="hp-users__network-accordion"
          >
            <p>
              These perspectives also revealed an important distinction between
              who uses rePhlow and who carries its consequences. The
              organisation purchasing the technology may not be the same group
              operating it, regulating it, receiving the recovered phosphorus or
              benefiting from cleaner water. A responsible design therefore
              cannot optimise only for the immediate customer.
            </p>
          </AccordionSection>
          <AccordionSection
            title="How the network changed the design"
            className="hp-users__network-accordion"
          >
            <p>
              This directly influenced our engineering choices. Modularity
              allows different treatment stages to be adapted to different
              industrial streams. Containment responds not only to biosafety
              requirements, but also to the needs of operators, regulators and
              public trust. Phosphorus recovery extends the system beyond
              pollutant removal towards a potential circular supply chain.
              Meanwhile, transparent monitoring and measurable outputs allow
              different actors to evaluate whether the system is actually
              delivering the benefit claimed.
            </p>
            <p>
              What began as a map of possible users therefore became something
              more useful: a map of the conditions rePhlow would have to satisfy
              to be responsibly implemented. Its long-term success will not be
              defined by whether it performs once under ideal conditions, but by
              whether it can repeatedly remove phosphorus, recover useful value
              and integrate into real systems without shifting environmental,
              economic or operational burdens from one community to another.
            </p>
          </AccordionSection>
        </div>
      </div>

      <aside className="hp-stakeholder-consent">
        <strong>A note on stakeholders and consent.</strong> Organisations named
        on this page are cited as institutions. Individual researchers, industry
        contacts and residents should be named only where consent for
        publication has been obtained. Stakeholder contributions are presented
        as perspectives that informed specific decisions, not as endorsements of
        the complete rePhlow system.
      </aside>
    </section>
  );
}
