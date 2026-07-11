import { Link } from "react-router-dom";

const MEDAL_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="9" r="5" />
    <path d="M8.5 13.5L6 21l6-3.5L18 21l-2.5-7.5" />
  </svg>
);

export function Medals() {
  return (
    <main className="medals-page">
      {/* Hero / intro */}
      <section className="page-hero medals-hero" id="top">
        <p className="hero__eyebrow">Judging roadmap</p>
        <h1 className="page-hero__title">Medals</h1>
        <p className="page-hero__lede">
          This page serves as a map of rePhlow's evidence for the 2026 medal
          criteria. Details are available on the linked pages.
        </p>
      </section>

      <nav className="medals-index" aria-label="Jump to medal tier">
        <a className="medals-index__item medals-index__item--bronze" href="#bronze">
          {MEDAL_ICON}
          Bronze
        </a>
        <a className="medals-index__item medals-index__item--silver" href="#silver">
          {MEDAL_ICON}
          Silver
        </a>
        <a className="medals-index__item medals-index__item--gold" href="#gold">
          {MEDAL_ICON}
          Gold
        </a>
      </nav>

      <div className="medals-panels">
        {/* Bronze */}
        <section
          className="medals-panel medals-panel--bronze"
          id="bronze"
          aria-label="Bronze medal criteria"
        >
          <div className="medals-panel__inner">
            <div className="medals-tier__head">
              <h2 className="medals-tier-badge medals-tier-badge--bronze">
                {MEDAL_ICON}
                Bronze Medal
              </h2>
            </div>

            <div className="medals-list">
              <div className="medals-item" id="bronze-deliverables">
                <span className="medals-item__index">01</span>
                <div>
                  <h3 className="medals-item__title">Competition Deliverables</h3>
                  <p className="medals-item__body">
                    We have completed all required deliverables, including
                    this wiki, the promotion and presentation videos, the
                    judging form, and judging session.
                  </p>
                  <div className="medals-links">
                    <Link className="medals-link-btn" to="/">
                      Wiki
                    </Link>
                    <a
                      className="medals-link-btn"
                      href="https://competition.igem.org/deliverables"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Project Promotion Video
                    </a>
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
                    <Link className="medals-link-btn" to="/attributions">
                      Attributions
                    </Link>
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
                    <Link className="medals-link-btn" to="/project-description">
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
                    Resources meant to serve beyond our project: protocols
                    for measuring phosphate accumulation, modeling notes, and
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
              <h2 className="medals-tier-badge medals-tier-badge--silver">
                {MEDAL_ICON}
                Silver Medal
              </h2>
            </div>

            <div className="medals-list">
              <div className="medals-item" id="silver-engineering">
                <span className="medals-item__index">01</span>
                <div>
                  <h3 className="medals-item__title">Engineering Success</h3>
                  <p className="medals-item__body">
                    The Engineering page describes along several iterations
                    the technical problem we faced, what we built and
                    tested, and how the result shaped the next iteration.
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
                    How we determined rePhlow is responsible and good for
                    the world: the values behind our choices, who we
                    consulted, and how it changed our implementation.
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
              <h2 className="medals-tier-badge medals-tier-badge--gold">
                {MEDAL_ICON}
                Gold Medal
              </h2>
              {/* <p className="medals-gold-note">
                For 2026, Gold is assessed through three Special Awards selected on the Judging Form rather than a
                separate written narrative — each judge scores those awards on their own rubric, and Gold requires
                a final yes on all three. Our final selection will be confirmed before the Wiki Freeze; the
                candidates below are where our evidence is strongest.
              </p> */}
            </div>

            <div className="medals-award-grid">
              <article className="medals-card" id="gold-model">
                <p className="medals-card__category">General Bio Engineering</p>
                <h3 className="medals-card__title">Best Model</h3>
                <p className="medals-card__body">
                  Our computational model of phosphate uptake and
                  polyphosphate accumulation kinetics informed design choices
                  and predicts system performance.
                </p>
                <div className="medals-links">
                  <Link className="medals-link-btn" to="/model">
                    Model
                  </Link>
                </div>
              </article>

              <article className="medals-card" id="gold-measurement">
                <p className="medals-card__category">General Bio Engineering</p>
                <h3 className="medals-card__title">Best Measurement</h3>
                <p className="medals-card__body">
                  Reproducible protocols quantify phosphate removal and
                  polyphosphate accumulation with a measurable, documented
                  basis.
                </p>
                <div className="medals-links">
                  <Link className="medals-link-btn" to="/measurements">
                    Measurements
                  </Link>
                </div>
              </article>

              <article className="medals-card" id="gold-hardware">
                <p className="medals-card__category">Specialization</p>
                <h3 className="medals-card__title">Best Hardware</h3>
                <p className="medals-card__body">
                  Purpose-built hardware supports phosphate quantification
                  and bioprocess conditions for phosphate-accumulating
                  bacteria.
                </p>
                <div className="medals-links">
                  <Link className="medals-link-btn" to="/hardware">
                    Hardware
                  </Link>
                </div>
              </article>

              <article className="medals-card" id="gold-ihp">
                <p className="medals-card__category">Specialization</p>
                <h3 className="medals-card__title">
                  Best Integrated Human Practices
                </h3>
                <p className="medals-card__body">
                  Stakeholder input from wastewater treatment and biodiesel
                  production contexts shaped rePhlow's direction and
                  implementation.
                </p>
                <div className="medals-links">
                  <Link className="medals-link-btn" to="/human-practices">
                    Human Practices
                  </Link>
                </div>
              </article>

              <article className="medals-card" id="gold-sustainability">
                <p className="medals-card__category">Specialization</p>
                <h3 className="medals-card__title">
                  Best Sustainable Development Impact
                </h3>
                <p className="medals-card__body">
                  rePhlow connects phosphorus recovery to circular nutrient
                  reuse and a lower risk of eutrophication.
                </p>
                <div className="medals-links">
                  <Link className="medals-link-btn" to="/sustainability">
                    Sustainability
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
