import { PageSectionNav } from "team-slug";

// Ported verbatim from real usage: Medals.tsx's flat, childless section list
// sweeps the simple case; ProjectDescription.tsx's nested sections sweep the
// case where the active section also shows indented subsections. In an
// isolated preview there's no scrollable page for the IntersectionObserver
// to track, so the first section renders as the active one — the same
// initial state the component itself uses before any scrolling happens.
export function Default() {
  return (
    <PageSectionNav
      sections={[
        { id: "bronze", label: "Bronze" },
        { id: "silver", label: "Silver" },
        { id: "gold", label: "Gold" },
      ]}
      ariaLabel="Jump to medal tier"
    />
  );
}

export function WithSubsections() {
  return (
    <PageSectionNav
      sections={[
        {
          id: "problem-eutrophication",
          label: "The problem: eutrophication",
          children: [
            { id: "what-eutrophication-is", label: "What eutrophication is" },
            { id: "why-it-matters", label: "Why it matters" },
          ],
        },
        {
          id: "eutrophication-in-spain",
          label: "Eutrophication in Spain",
          children: [
            { id: "spain-vulnerability", label: "Why Spain is particularly vulnerable" },
            { id: "mar-menor-case-study", label: "The Mar Menor as a case study" },
          ],
        },
        { id: "european-measures", label: "European measures" },
        {
          id: "our-solution",
          label: "Our solution",
          children: [
            { id: "what-the-solution-is", label: "What the solution is" },
            { id: "how-it-addresses-the-problem", label: "How it addresses the problem" },
            { id: "why-this-approach-is-valuable", label: "Why this approach is valuable" },
          ],
        },
        { id: "project-objectives", label: "Project objectives" },
      ]}
      ariaLabel="Jump to project description section"
    />
  );
}
