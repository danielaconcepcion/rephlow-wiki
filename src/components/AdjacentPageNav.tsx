import { Link } from "react-router-dom";
import type { CSSProperties, ReactNode } from "react";
import "./AdjacentPageNav.css";

type AccentStyle = CSSProperties & { "--adjacent-nav-color": string };

export interface AdjacentPageTarget {
  to: string;
  label: string;
  /** Accent used for this link's sphere/arrow — an eco-colour, a block
   * accent, or any token/hex. */
  accent: string;
  /** Optional icon/thumbnail inside the sphere (an <img> or small glyph).
   * Falls back to a plain directional chevron when omitted, so a page
   * without a per-destination image (unlike Engineering's blocks, which
   * always have one) still gets a real sphere, not an empty circle. */
  icon?: ReactNode;
}

/**
 * Editorial "next up" handoff between two pages — same visual identity as
 * Engineering.tsx's own footer block-nav (sphere + eyebrow + label +
 * arrow, prev on the left/next on the right), generalised from that
 * page's in-page tab-switching version into real cross-page navigation
 * via react-router Link. Kept as plain typographic links rather than a
 * pill/card treatment, on purpose — see Engineering.css's own note on why
 * this reads as an editorial footnote, not an app pagination bar.
 */
export function AdjacentPageNav({
  prev,
  next,
  ariaLabel = "Adjacent pages",
}: {
  prev?: AdjacentPageTarget;
  next?: AdjacentPageTarget;
  ariaLabel?: string;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="adjacent-page-nav" aria-label={ariaLabel}>
      {prev ? (
        <Link
          className="adjacent-page-nav__link adjacent-page-nav__link--prev"
          to={prev.to}
          style={{ "--adjacent-nav-color": prev.accent } as AccentStyle}
        >
          <span className="adjacent-page-nav__sphere">
            {prev.icon ?? <span aria-hidden="true">&larr;</span>}
          </span>
          <span className="adjacent-page-nav__text">
            <span className="adjacent-page-nav__eyebrow">Previous</span>
            <span className="adjacent-page-nav__label">
              <span className="adjacent-page-nav__arrow" aria-hidden="true">
                &larr;
              </span>
              {prev.label}
            </span>
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          className="adjacent-page-nav__link adjacent-page-nav__link--next"
          to={next.to}
          style={{ "--adjacent-nav-color": next.accent } as AccentStyle}
        >
          <span className="adjacent-page-nav__text">
            <span className="adjacent-page-nav__eyebrow">Next</span>
            <span className="adjacent-page-nav__label">
              {next.label}
              <span className="adjacent-page-nav__arrow" aria-hidden="true">
                &rarr;
              </span>
            </span>
          </span>
          <span className="adjacent-page-nav__sphere">
            {next.icon ?? <span aria-hidden="true">&rarr;</span>}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
