import type { ReactNode } from "react";

import { asset } from "../../utils";
import "./EnzymeActivityGrid.css";

export interface EnzymeActivity {
  id: string;
  shortName: string;
  fullName: string;
  whatItDoes: ReactNode;
  whatWeDo: ReactNode;
  /** The bond-cleavage diagram the source prints inside this activity's
   * section. These four sit outside the folder decks, so they are outside
   * the automatic figure numbering (see numbering.ts, which walks the
   * experiments) — hence the explicit `number`, which is also what lets
   * the decks below carry on from 5 via numberExperiments' startFigure. */
  figure?: { src: string; alt: string; caption: string; number: number };
}

/**
 * "The four parts of the system" (Enzyme production block) — a static 2×2
 * grid of always-open cards (PLA / PLC / NAP / Phytases), the enzymatic
 * counterpart of Genetic engineering's GeneSystemGrid. Unlike that
 * component's click-to-expand gene cards, every activity's full write-up
 * is always visible, since there are only four and
 * hiding them behind a toggle added a click for no real space saving.
 * Everything themes off this block's own --folder-accent, same convention
 * as the folder tabs.
 */
export function EnzymeActivityGrid({
  activities,
}: {
  activities: EnzymeActivity[];
}) {
  return (
    <div className="enzyme-activity-grid-frame">
      <div className="enzyme-activity-grid">
        {activities.map((activity) => (
          <div className="enzyme-card" key={activity.id}>
            <header className="enzyme-card__head">
              <span className="enzyme-card__marker" aria-hidden="true" />
              <span className="enzyme-card__name">{activity.shortName}</span>
              <span className="enzyme-card__full-name">
                {activity.fullName}
              </span>
            </header>
            <div className="enzyme-card__body">
              <p className="enzyme-card__field">
                <strong>What it does.</strong> {activity.whatItDoes}
              </p>
              <p className="enzyme-card__field">
                <strong>What we do to it, and why.</strong> {activity.whatWeDo}
              </p>
              {activity.figure && (
                <figure className="enzyme-card__figure">
                  <img
                    src={asset(activity.figure.src)}
                    alt={activity.figure.alt}
                    loading="lazy"
                  />
                  <figcaption>
                    <strong className="record-caption__label">
                      Figure {activity.figure.number}.
                    </strong>{" "}
                    {activity.figure.caption}
                  </figcaption>
                </figure>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
