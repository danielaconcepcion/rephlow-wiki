import { Link } from "react-router-dom";

import { TileMoleculeField } from "../../components/TileMoleculeField";

/**
 * "Explore rePhlow!" — the wiki's visual index, lifted unchanged from the
 * Home this repository had before the approved homepage replaced it. The
 * team asked for this grid back in place of the line-art one that page
 * carries: same groups and same cards, but the illustrated tile icons
 * (.card__icon--*, drawn from iGEM Uploads — see App.css) and the
 * TileMoleculeField behind each card.
 *
 * It renders as a React section rather than going into Home/markup.ts,
 * because it is built from <Link> and a component: that markup is a plain
 * HTML string injected with dangerouslySetInnerHTML, and neither would
 * survive the trip. Home.tsx therefore stops that string where its own
 * explore section began and renders this underneath.
 */
export function ExploreIndex() {
  return (
    <section className="explore" id="explore">
      <h2 className="explore__title">Explore rePhlow!</h2>

      <div className="explore__group">
        <p className="explore__group-title">Project</p>
        <div className="card-grid">
          <Link className="card card--feature" to="/project-description">
            <TileMoleculeField seed={11} palette="primary" />
            <div className="card__icon card__icon--project">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 3h7l4 4v14H7z" />
                <path d="M14 3v4h4" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
            </div>
            <p className="card__title">Project Description</p>
          </Link>

          <Link className="card" to="/engineering">
            <TileMoleculeField seed={18} palette="light" />
            <div className="card__icon card__icon--engineering">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12a8 8 0 0 1 14-5.3" />
                <path d="M20 12a8 8 0 0 1-14 5.3" />
                <path d="M18 3v4h-4" />
                <path d="M6 21v-4h4" />
              </svg>
            </div>
            <p className="card__title">Engineering</p>
          </Link>

          <Link className="card" to="/model">
            <TileMoleculeField seed={25} palette="light" />
            <div className="card__icon card__icon--model">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3v18h18" />
                <path d="M7 15l4-6 4 3 5-8" />
              </svg>
            </div>
            <p className="card__title">Model</p>
          </Link>

          <Link className="card" to="/hardware">
            <TileMoleculeField seed={32} palette="light" />
            <div className="card__icon card__icon--hardware">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <p className="card__title">Hardware</p>
          </Link>
        </div>
      </div>

      <div className="explore__group">
        <p className="explore__group-title">Laboratory</p>
        <div className="card-grid">
          <Link className="card card--feature" to="/experiments">
            <TileMoleculeField seed={39} palette="primary" />
            <div className="card__icon card__icon--experiments">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 2v9.5L5 20a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-8.5V2" />
                <line x1="8" y1="2" x2="16" y2="2" />
                <line x1="8" y1="15" x2="16" y2="15" />
              </svg>
            </div>
            <p className="card__title">Experiments</p>
          </Link>

          <Link className="card" to="/measurement">
            <TileMoleculeField seed={46} palette="light" />
            <div className="card__icon card__icon--measurements">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M21 7v6h-6" />
              </svg>
            </div>
            <p className="card__title">Measurements</p>
          </Link>

          <Link className="card" to="/results">
            <TileMoleculeField seed={53} palette="light" />
            <div className="card__icon card__icon--results">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="12" width="4" height="8" rx="1" />
                <rect x="10" y="7" width="4" height="13" rx="1" />
                <rect x="16" y="3" width="4" height="17" rx="1" />
              </svg>
            </div>
            <p className="card__title">Results</p>
          </Link>

          <Link className="card" to="/safety">
            <TileMoleculeField seed={60} palette="light" />
            <div className="card__icon card__icon--safety">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l8 3.5v6c0 5-3.4 8.7-8 10.5-4.6-1.8-8-5.5-8-10.5v-6L12 2z" />
              </svg>
            </div>
            <p className="card__title">Safety</p>
          </Link>
        </div>
      </div>

      <div className="explore__group explore__group--engagement">
        <p className="explore__group-title">Engagement</p>
        <div className="card-grid">
          <Link className="card card--feature" to="/human-practices">
            <TileMoleculeField seed={67} palette="primary" />
            <div className="card__icon card__icon--hp">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <p className="card__title">Human Practices</p>
          </Link>

          <Link className="card" to="/collaboration-partnership">
            <TileMoleculeField seed={74} palette="light" />
            <div className="card__icon card__icon--collab">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="12" r="6" />
                <circle cx="15" cy="12" r="6" />
              </svg>
            </div>
            <p className="card__title">Collaboration and Partnership</p>
          </Link>

          <Link className="card" to="/education-communication">
            <TileMoleculeField seed={81} palette="light" />
            <div className="card__icon card__icon--education">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16v12H8l-4 4V4z" />
              </svg>
            </div>
            <p className="card__title">Education and Communication</p>
          </Link>

          <Link className="card" to="/entrepreneurship">
            <TileMoleculeField seed={88} palette="light" />
            <div className="card__icon card__icon--entrepreneurship">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2.3h6c0-1.1.4-1.8 1-2.3A7 7 0 0 0 12 2z" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
            </div>
            <p className="card__title">Entrepreneurship</p>
          </Link>

          <Link className="card" to="/sustainability">
            <TileMoleculeField seed={95} palette="light" />
            <div className="card__icon card__icon--sustain">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C7 6 5 10 5 14a7 7 0 0 0 14 0c0-4-2-8-7-12z" />
              </svg>
            </div>
            <p className="card__title">Sustainability</p>
          </Link>

          <Link className="card" to="/contribution">
            <TileMoleculeField seed={102} palette="light" />
            <div className="card__icon card__icon--contribution">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v10" />
                <path d="M8 9l4 4 4-4" />
                <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
              </svg>
            </div>
            <p className="card__title">Contribution</p>
          </Link>
        </div>
      </div>

      <div className="explore__group-row">
        <div className="explore__group">
          <p className="explore__group-title">Team</p>
          <div className="card-grid">
            <Link className="card" to="/team">
              <TileMoleculeField seed={109} palette="light" />
              <div className="card__icon card__icon--team">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="8" r="3" />
                  <circle cx="17" cy="10" r="2.4" />
                  <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
                  <path d="M15.5 15.2c2 .3 4 1.6 4.5 4.3" />
                </svg>
              </div>
              <p className="card__title">Team</p>
            </Link>
          </div>
        </div>

        <div className="explore__group">
          <p className="explore__group-title">Judging</p>
          <div className="card-grid">
            <Link className="card card--feature" to="/medals">
              <TileMoleculeField seed={116} palette="primary" />
              <div className="card__icon card__icon--medals">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="9" r="5" />
                  <path d="M8.5 13.5L6 21l6-3.5L18 21l-2.5-7.5" />
                </svg>
              </div>
              <p className="card__title">Medals</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
