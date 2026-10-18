import { Link } from "react-router-dom";
import { asset } from "../utils/asset";
import { getAdjacentPages, type PageNavEntry } from "./pageNavMap";
import "./AdjacentPageNav.css";

/**
 * The wiki's one Previous/Next handoff, shared by every page: the
 * illustrated icon of the *destination* page in a quiet circle, the
 * Previous/Next eyebrow, the page name and a plain arrow beside it.
 *
 * Same typography, sizes and rhythm as Engineering's in-page block nav
 * (see Engineering.css) — kept as plain typographic links rather than a
 * pill/card treatment, on purpose, so it reads as an editorial footnote
 * pointing onward and not as an app-style pagination bar. The circle is
 * neutral here; only Engineering's own block nav tints it, because there
 * the colour carries the block's identity.
 *
 * Order, labels and icons all come from pageNavMap.ts, so a page is
 * never asked to know who its neighbours are.
 */
function NavLink({
  entry,
  direction,
}: {
  entry: PageNavEntry;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  const icon = (
    <span className="adjacent-page-nav__icon">
      <img src={asset(entry.icon)} alt="" />
    </span>
  );

  return (
    <Link
      className={`adjacent-page-nav__link adjacent-page-nav__link--${direction}`}
      to={entry.path}
    >
      {isPrev && icon}
      <span className="adjacent-page-nav__text">
        <span className="adjacent-page-nav__eyebrow">
          {isPrev ? "Previous" : "Next"}
        </span>
        <span className="adjacent-page-nav__label">
          {isPrev && (
            <span className="adjacent-page-nav__arrow" aria-hidden="true">
              &larr;
            </span>
          )}
          {entry.label}
          {!isPrev && (
            <span className="adjacent-page-nav__arrow" aria-hidden="true">
              &rarr;
            </span>
          )}
        </span>
      </span>
      {!isPrev && icon}
    </Link>
  );
}

export function AdjacentPageNav({ path }: { path: string }) {
  const { prev, next } = getAdjacentPages(path);
  if (!prev && !next) return null;

  return (
    <nav className="adjacent-page-nav" aria-label="Adjacent pages">
      {prev ? <NavLink entry={prev} direction="prev" /> : <span />}
      {next ? <NavLink entry={next} direction="next" /> : <span />}
    </nav>
  );
}
