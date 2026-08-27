import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import "./ImpactRoute.css";

/**
 * "The impact" — four connected outcomes (Environmental → Industrial →
 * Circular → Social), read from a shared route rather than four unrelated
 * cards: one accent (--wrr-accent, already this section's colour), one
 * icon language, one shared content panel below the row. Content is
 * transcribed verbatim from the Notion page "5. What the route revealed"
 * (the environmental/industrial/circular paragraphs weren't previously
 * written out in the wiki — only summarised in one sentence); the social
 * paragraph keeps the wiki's own existing wording.
 */

function EnvironmentalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19C5 11 10 5 19 4C18 13 12 19 5 19Z" />
      <path d="M6.5 17.5L16.5 6.5" />
    </svg>
  );
}

function IndustrialIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V13L9 16V13L14 16V9H16V12.7L20 15V20Z" />
      <path d="M8 20V17.3" />
      <path d="M12 20V17.3" />
      <path d="M16 20V17.3" />
    </svg>
  );
}

function CircularIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 8.7C9 5.6 14 5 17 7.4" />
      <path d="M15.2 5.6L17.4 7.3L15.4 9.2" />
      <path d="M17 15.3C15 18.4 10 19 7 16.6" />
      <path d="M8.8 18.4L6.6 16.7L8.6 14.8" />
    </svg>
  );
}

function SocialIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8.6" r="2.6" />
      <path d="M4 19c0-3.6 2.2-6 5-6s5 2.4 5 6" />
      <circle cx="16.6" cy="9.6" r="2.1" />
      <path d="M13.3 19c.3-3 2-5.2 4.3-5.2 2.1 0 3.8 1.8 4.3 4.4" />
    </svg>
  );
}

interface ImpactStop {
  id: string;
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

const IMPACT_STOPS: ImpactStop[] = [
  {
    id: "environmental",
    label: "Environmental",
    icon: <EnvironmentalIcon />,
    content: (
      <p>
        rePhlow aims to{" "}
        <strong>
          reduce phosphorus pressure before it reaches aquatic ecosystems
        </strong>
        , helping protect rivers, reservoirs and coastal waters from nutrient
        enrichment.
      </p>
    ),
  },
  {
    id: "industrial",
    label: "Industrial",
    icon: <IndustrialIcon />,
    content: (
      <p>
        Following phosphorus upstream brought us into contact with the
        conditions in which rePhlow would actually have to operate. Our
        design therefore had to respond to{" "}
        <strong>
          real wastewater constraints and industrial implementation needs
        </strong>
        . Industrial perspectives pushed us towards{" "}
        <strong>
          retrofit compatibility, modularity, containment and manageable
          operation
        </strong>
        , so implementation would not require a facility to redesign its
        entire treatment infrastructure around our technology.
      </p>
    ),
  },
  {
    id: "circular",
    label: "Circular",
    icon: <CircularIcon />,
    content: (
      <p>
        Our approach treats phosphorus{" "}
        <strong>
          not only as a pollutant, but as a limited and valuable resource
        </strong>
        . Removing it from wastewater is only the first step. rePhlow
        therefore evolved from a removal system towards{" "}
        <strong>phosphorus capture, retention and recovery</strong>, with the
        aim of returning captured phosphorus to productive use rather than
        transferring it into another waste stream.
      </p>
    ),
  },
  {
    id: "social",
    label: "Social",
    icon: <SocialIcon />,
    content: (
      <p>
        Talking with{" "}
        <strong>schoolchildren and members of the public taught</strong> us
        that impact is not only technical. RePhlow&apos;s social impact lies
        in improving public understanding of phosphorus, eutrophication and
        safe synthetic biology, replacing abstraction, and at times wariness
        of GMOs, with a clearer picture of what the technology does and why
        it matters. We <strong>engaged this community</strong> through
        outreach talks in primary and secondary schools, a hands-on
        laboratory workshop for children, and a talk at the Museo Nacional de
        Ciencias Naturales. These
        conversations were not just about the impact rePhlow could have, but
        about whether it would be trusted enough to be adopted at all (see{" "}
        <Link className="vsi-wikilink" to="/education-communication">
          Education and Communication
        </Link>
        ).
      </p>
    ),
  },
];

export function ImpactRoute() {
  const [activeId, setActiveId] = useState<string>(IMPACT_STOPS[0].id);
  const active = IMPACT_STOPS.find((s) => s.id === activeId)!;

  return (
    <div className="hp-impact-route">
      <div
        className="hp-impact-route__stops"
        role="tablist"
        aria-label="The impact — four connected outcomes"
      >
        {IMPACT_STOPS.map((stop) => (
          <button
            key={stop.id}
            type="button"
            role="tab"
            id={`hp-impact-tab-${stop.id}`}
            aria-selected={stop.id === activeId}
            aria-controls="hp-impact-panel"
            className={`hp-impact-route__stop${
              stop.id === activeId ? " is-active" : ""
            }`}
            onClick={() => setActiveId(stop.id)}
          >
            <span className="hp-impact-route__icon">{stop.icon}</span>
            <span className="hp-impact-route__label">{stop.label}</span>
          </button>
        ))}
      </div>

      <div
        className="hp-impact-route__panel"
        role="tabpanel"
        id="hp-impact-panel"
        aria-labelledby={`hp-impact-tab-${active.id}`}
        key={active.id}
      >
        <h4 className="hp-impact-route__title">{active.label} impact</h4>
        {active.content}
      </div>
    </div>
  );
}
