import { useEffect, useRef } from "react";
import type { ElementType } from "react";

/** Bronze, Silver and Gold are medals; a Special Prize is not, so it reads
 * as the same badge with a gradient of its own (see .medals-tier-badge--
 * prize in App.css). */
export type AwardBadgeVariant = "bronze" | "silver" | "gold" | "prize";

export type Award = {
  label: string;
  variant: AwardBadgeVariant;
};

const MEDAL_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="9" r="5" />
    <path d="M8.5 13.5L6 21l6-3.5L18 21l-2.5-7.5" />
  </svg>
);

/**
 * The medal/prize pill used by the tier heads on the Medals page and, with
 * the same styles, above the title of the pages those awards are judged on.
 * `as` only changes the element: Medals' tier heads are headings, a header
 * badge is not.
 */
export function AwardBadge({
  label,
  variant,
  as: Tag = "span",
  className = "",
}: Award & { as?: ElementType; className?: string }) {
  // Medals page: tier heads get an id (bronze-medal, silver-medal...) and, when the
  // URL ends in that #id (coming from a header badge), the page scrolls to it.
  const ref = useRef<HTMLElement | null>(null);
  const anchor = Tag === "span" ? undefined : awardAnchor(label);
  useEffect(() => {
    if (!anchor || decodeURIComponent(window.location.hash.slice(1)) !== anchor) return undefined;
    const t = window.setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
    return () => window.clearTimeout(t);
  }, [anchor]);

  return (
    <Tag
      ref={ref}
      id={anchor}
      className={`medals-tier-badge medals-tier-badge--${variant} ${className}`.trim()}
    >
      {MEDAL_ICON}
      {label}
    </Tag>
  );
}

/** URL anchor of an award on the Medals page: "Bronze Medal" -> "bronze-medal". */
export function awardAnchor(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
