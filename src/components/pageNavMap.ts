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

/** Shown while a page is still waiting for its own illustration. */
const PLACEHOLDER_ICON = "assets/content-patterns/water-drop.webp";

export const PAGE_NAV_ORDER: PageNavEntry[] = [
  {
    path: "/project-description",
    label: "Project Description",
    icon: "assets/content-patterns/icons/11-environmental-water-sampling.svg",
  },
  {
    path: "/engineering",
    label: "Engineering",
    icon: "assets/content-patterns/icons/06-dna-editing.svg",
  },
  { path: "/model", label: "Model", icon: "assets/model-icon.png" },
  { path: "/hardware", label: "Hardware", icon: "assets/hardware-icon.png" },
  {
    path: "/experiments",
    label: "Experiments",
    icon: "assets/content-patterns/icons/02-petri-dish.svg",
  },
  {
    path: "/measurement",
    label: "Measurements",
    icon: "assets/content-patterns/icons/03-microscope.svg",
  },
  {
    path: "/results",
    label: "Results",
    icon: "assets/content-patterns/icons/07-microcentrifuge-tube.svg",
  },
  {
    path: "/safety",
    label: "Safety",
    icon: "assets/content-patterns/icons/14-bacteria.svg",
  },
  {
    path: "/human-practices",
    label: "Human Practices",
    icon: "assets/human-practices-icon.png",
  },
  {
    path: "/collaboration-partnership",
    label: "Collaboration and Partnership",
    icon: PLACEHOLDER_ICON,
  },
  {
    path: "/education-communication",
    label: "Education and Communication",
    icon: PLACEHOLDER_ICON,
  },
  {
    path: "/entrepreneurship",
    label: "Entrepreneurship",
    icon: PLACEHOLDER_ICON,
  },
  {
    path: "/sustainability",
    label: "Sustainability",
    icon: "assets/sustainability-icon.png",
  },
  {
    path: "/contribution",
    label: "Contribution",
    icon: "assets/lab-protocols-icon.png",
  },
  { path: "/team", label: "Team", icon: PLACEHOLDER_ICON },
  { path: "/medals", label: "Medals", icon: PLACEHOLDER_ICON },
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
