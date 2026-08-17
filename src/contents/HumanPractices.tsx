import { PageSectionNav, type PageSection } from "../components/PageSectionNav";
import { RouteIndex } from "./HumanPractices/RouteIndex";
import { WhyPhosphorus } from "./HumanPractices/WhyPhosphorus";
import { DesignCompass } from "./HumanPractices/DesignCompass";
import { StakeholderTimeline } from "./HumanPractices/StakeholderTimeline";
import { TravelArchiveRoute } from "./HumanPractices/TravelArchiveRoute";
import { ImplementationCheckpoints } from "./HumanPractices/ImplementationCheckpoints";
import { WhatRouteRevealed } from "./HumanPractices/WhatRouteRevealed";
import "./HumanPractices/HumanPractices.css";

/**
 * Human Practices — a single route ("The Phosphorus Route"), not six
 * separate pages. Six sections (0–5), each authored from its own HTML
 * prototype for visual identity/interactions; this file only owns the
 * shared shell — hero, heading hierarchy and PageSectionNav wiring — per
 * the approved integration plan. No Part I/Part II split, no Spain
 * route-map graphic (a decided exclusion, not deferred).
 */

const HUMAN_PRACTICES_SECTIONS: PageSection[] = [
  {
    id: "why-phosphorus",
    label: "0. Why we followed phosphorus",
    children: [
      { id: "s0-team-story", label: "The beginning" },
      { id: "s0-local-warning", label: "A local warning" },
      { id: "s0-removal-recovery", label: "From removal to recovery" },
      { id: "s0-alternatives", label: "Non-biotech alternatives" },
      { id: "s0-defining-place", label: "Defining rePhlow's place" },
    ],
  },
  {
    id: "design-compass",
    label: "1. The Design Compass",
    children: [
      { id: "s1-framework", label: "Why we needed a framework" },
      { id: "s1-area", label: "Why AREA?" },
      { id: "s1-compass", label: "The Guiding Compass" },
      { id: "s1-framework-from-values", label: "From values to framework" },
      { id: "s1-tradeoffs", label: "Trade-offs & rules" },
      { id: "s1-perspectives", label: "Different perspectives" },
      { id: "s1-missing", label: "Perspectives missing" },
      { id: "s1-loop-closed", label: "When is a loop closed?" },
    ],
  },
  {
    id: "stakeholders",
    label: "2. Stakeholders & Voices",
    children: [
      { id: "s2-chronological", label: "Chronological record" },
      { id: "s2-users", label: "Communities & users" },
    ],
  },
  {
    id: "travel-archive",
    label: "3. Travel Archive",
    children: [
      { id: "s3-bio-oils-donana", label: "Bio-Oils Huelva & Doñana" },
      { id: "s3-mar-menor", label: "Mar Menor" },
      { id: "s3-san-juan", label: "Embalse de San Juan" },
      { id: "s3-cedex", label: "CEDEX" },
      { id: "s3-repsol", label: "Repsol" },
      { id: "s3-beehives", label: "Beehives" },
    ],
  },
  {
    id: "implementation",
    label: "4. From Design to Implementation",
    children: [
      { id: "s4-route", label: "Route with checkpoints" },
      { id: "s4-boundaries", label: "Boundaries & claims" },
      { id: "s4-containment", label: "Contained barrier" },
      { id: "s4-responsibility", label: "Responsibility checkpoint" },
      { id: "s4-lessons", label: "Lessons learned" },
    ],
  },
  {
    id: "route-revealed",
    label: "5. What the Route Revealed",
    children: [
      { id: "s5-goals", label: "Initial goals" },
      { id: "s5-impact", label: "The impact" },
      { id: "s5-toolkit", label: "Tools to reuse" },
      { id: "s5-measuring", label: "Measuring the route" },
    ],
  },
];

export function HumanPractices() {
  return (
    <main className="human-practices-page">
      <div className="page-shell">
        <section className="page-hero" id="top">
          <h1 className="page-hero__title">Human Practices</h1>
          <p className="page-hero__lede">
            Human Practices was not a collection of interviews for rePhlow. It
            was the process that followed phosphorus from an industrial
            degumming tank to a collapsing lagoon, a reservoir, a laboratory
            bench and back — and let what we found along the way change the
            project itself.
          </p>
        </section>
      </div>

      <div className="page-with-section-nav">
        <PageSectionNav
          sections={HUMAN_PRACTICES_SECTIONS}
          ariaLabel="Jump to Human Practices section"
        />

        <div className="human-practices-sections">
          <RouteIndex />
          <WhyPhosphorus />
          <DesignCompass />
          <StakeholderTimeline />
          <TravelArchiveRoute />
          <ImplementationCheckpoints />
          <WhatRouteRevealed />
        </div>
      </div>
    </main>
  );
}
