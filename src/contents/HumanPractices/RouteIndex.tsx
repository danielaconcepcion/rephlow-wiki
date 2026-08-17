import type { ReactNode } from "react";
import {
  CardFanGlyph,
  CompassGlyph,
  PassportGlyph,
  RouteProgressGlyph,
  VoiceNetworkGlyph,
} from "./HeroObjects";
import "./RouteIndex.css";

/**
 * Graphic index placed before section 0 — "Explore the Human Practices
 * route". Complements PageSectionNav (which stays the primary, always-
 * present in-page nav); this is a one-time, glanceable map of sections
 * 1-5 only (section 0 is the framing prologue, not a route stop). Each
 * card reproduces its target section's own hero gradient (a lighter cut
 * of it, so the card reads as its own object rather than a shrunk header)
 * and a thumbnail of that section's actual decorative object, via the
 * same shared components HeroObjects.tsx also renders inside each
 * header — not a separate, redrawn icon set. Cards link to the existing
 * section anchors and scrolling respects the sticky nav because the
 * target elements already carry `.hp-section`'s
 * `scroll-margin-top: var(--section-nav-offset)`.
 */

type Accent = "blue" | "purple" | "green" | "amber" | "rust";

interface RouteIndexItem {
  id: string;
  number: string;
  title: string;
  accent: Accent;
  icon: ReactNode;
}

const ROUTE_INDEX_ITEMS: RouteIndexItem[] = [
  {
    id: "design-compass",
    number: "1",
    title: "The Design Compass",
    accent: "blue",
    icon: <CompassGlyph />,
  },
  {
    id: "stakeholders",
    number: "2",
    title: "Stakeholders & Voices",
    accent: "purple",
    icon: <VoiceNetworkGlyph />,
  },
  {
    id: "travel-archive",
    number: "3",
    title: "Travel Archive",
    accent: "green",
    icon: <PassportGlyph compact />,
  },
  {
    id: "implementation",
    number: "4",
    title: "From Design to Implementation",
    accent: "amber",
    icon: <RouteProgressGlyph compact />,
  },
  {
    id: "route-revealed",
    number: "5",
    title: "What the Route Revealed",
    accent: "rust",
    icon: <CardFanGlyph compact />,
  },
];

export function RouteIndex() {
  return (
    <nav className="hp-route-index" aria-labelledby="hp-route-index-title">
      <div className="hp-route-index__head">
        <h2 id="hp-route-index-title">Explore the Human Practices route</h2>
        <p>Select a card to jump to each section.</p>
      </div>

      <div className="hp-route-index__grid">
        {ROUTE_INDEX_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`hp-route-index__card hp-route-index__card--${item.accent}`}
          >
            <span className="hp-route-index__title">
              <span className="hp-route-index__number">{item.number}.</span>{" "}
              {item.title}
            </span>
            <span className="hp-route-index__icon">{item.icon}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
