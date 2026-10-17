import { useState } from "react";
import type { MouseEvent } from "react";
import { PageSectionNav } from "../components/PageSectionNav";
import type { PageSection } from "../components/PageSectionNav";
import { AdjacentPageNav } from "../components/AdjacentPageNav";
import { LeafletCover, LeafletSpread } from "./Safety/Leaflet";
import { LEAFLETS } from "./Safety/safetyContent";
import type { LeafletId } from "./Safety/safetyContent";
import "./Safety/Safety.css";

/* --------------------------------------------------------------------------
   Safety — two safety leaflets. Folded, they stand in a wall-mounted rack
   that works as the page index; each one opens out below into a tri-fold
   spread with its full text.
   -------------------------------------------------------------------------- */

const SECTIONS: PageSection[] = LEAFLETS.map((l) => ({
  id: l.id,
  label: `${l.number}. ${l.title}`,
}));

export function Safety() {
  const [signals, setSignals] = useState<Record<LeafletId, number>>({
    lab: 0,
    solution: 0,
  });

  const openLeaflet = (id: LeafletId) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSignals((s) => ({ ...s, [id]: s[id] + 1 }));
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="page-with-section-nav sf-page">
        <PageSectionNav
          sections={SECTIONS}
          ariaLabel="Jump to safety leaflet"
        />

        <div className="sf-col">
          <div className="sf-rack-wall">
            <p className="sf-rack-hint">Take a leaflet.</p>
            <div className="sf-rack">
              {LEAFLETS.map((l) => (
                <div key={l.id} className="sf-pocket">
                  <LeafletCover leaflet={l} onOpen={openLeaflet(l.id)} />
                  <span className="sf-pocket__front" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          {LEAFLETS.map((l) => (
            <section
              key={l.id}
              id={l.id}
              className={`sf-section sf-section--${l.id}`}
            >
              <header className="sf-section__head">
                <span className="sf-section__num">{l.number}</span>
                <h2 className="sf-section__title">{l.title}</h2>
              </header>
              <LeafletSpread leaflet={l} openSignal={signals[l.id]} />
            </section>
          ))}
        </div>
      </div>

      <AdjacentPageNav
        prev={{ to: "/results", label: "Results", accent: "#2E7D86" }}
        next={{
          to: "/human-practices",
          label: "Human Practices",
          accent: "#6E5A96",
        }}
      />
    </>
  );
}
