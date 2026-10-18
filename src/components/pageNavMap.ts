/**
 * Single source of truth for the Previous/Next handoff at the bottom of
 * every page: the running order, the label each link shows, and the
 * illustrated icon of the *destination* page.
 *
 * Pages live in pages.ts (routes, heroes, awards); this file only adds
 * what the footer navigation needs, so a page can be reordered or given
 * a different icon in one place instead of in every content file. The
 * order mirrors pages.ts — Home (the landing page) and Content Patterns
 * (internal reference, not in the Navbar) stay out of the chain, so
 * Project Description has no "Previous" and Medals no "Next".
 */
export interface PageNavEntry {
  /** Route, exactly as in pages.ts. */
  path: string;
  /** Name shown on the link pointing *to* this page. */
  label: string;
  /** Illustrated icon of this page, relative to the wiki's asset root. */
  icon: string;
}

export const PAGE_NAV_ORDER: PageNavEntry[] = [
  {
    path: "/project-description",
    label: "Project Description",
    icon: "assets/nav-icons/project-description.webp",
  },
  {
    path: "/engineering",
    label: "Engineering",
    icon: "assets/nav-icons/engineering.webp",
  },
  { path: "/model", label: "Model", icon: "assets/nav-icons/model.webp" },
  {
    path: "/hardware",
    label: "Hardware",
    icon: "assets/nav-icons/hardware.webp",
  },
  {
    path: "/experiments",
    label: "Experiments",
    icon: "assets/nav-icons/experiments.webp",
  },
  {
    path: "/measurement",
    label: "Measurements",
    icon: "assets/nav-icons/measurements.webp",
  },
  { path: "/results", label: "Results", icon: "assets/nav-icons/results.webp" },
  { path: "/safety", label: "Safety", icon: "assets/nav-icons/safety.webp" },
  {
    path: "/human-practices",
    label: "Human Practices",
    icon: "assets/nav-icons/human-practices.webp",
  },
  {
    path: "/collaboration-partnership",
    label: "Collaboration and Partnership",
    icon: "assets/nav-icons/collaboration.webp",
  },
  {
    path: "/education-communication",
    label: "Education and Communication",
    icon: "assets/nav-icons/education.webp",
  },
  {
    path: "/entrepreneurship",
    label: "Entrepreneurship",
    icon: "assets/nav-icons/entrepreneurship.webp",
  },
  {
    path: "/sustainability",
    label: "Sustainability",
    icon: "assets/nav-icons/sustainability.webp",
  },
  {
    // The team's icon set has no Contribution illustration of its own;
    // the spare microcentrifuge tube from the same set stands in.
    path: "/contribution",
    label: "Contribution",
    icon: "assets/nav-icons/contribution.webp",
  },
  { path: "/team", label: "Team", icon: "assets/nav-icons/team.webp" },
  { path: "/medals", label: "Medals", icon: "assets/nav-icons/medals.webp" },
];

/** The entries to put before and after `path`, or undefined at the ends. */
export function getAdjacentPages(path: string) {
  const index = PAGE_NAV_ORDER.findIndex((entry) => entry.path === path);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? PAGE_NAV_ORDER[index - 1] : undefined,
    next:
      index < PAGE_NAV_ORDER.length - 1 ? PAGE_NAV_ORDER[index + 1] : undefined,
  };
}
