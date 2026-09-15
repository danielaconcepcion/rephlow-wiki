import type { ReactNode } from "react";
import "./EnzymeActivityGrid.css";

export interface EnzymeActivity {
  id: string;
  shortName: string;
  fullName: string;
  whatItDoes: ReactNode;
  whatWeDo: ReactNode;
  storyboard: ReactNode;
}

/**
 * "The four parts of the system" (Enzyme production block) — a static 2×2
 * grid of always-open cards (PLA / PLC / NAP / Phytases), the enzymatic
 * counterpart of Genetic engineering's GeneSystemGrid. Unlike that
 * component's click-to-expand gene cards, every activity's full write-up
 * (including its "concept sketch" storyboard, shown as a real figure
 * placeholder — same treatment as a missing photo elsewhere in this
 * component family) is always visible, since there are only four and
 * hiding them behind a toggle added a click for no real space saving.
 * Everything themes off this block's own --folder-accent, same convention
 * as the folder tabs.
 */
export function EnzymeActivityGrid({ activities }: { activities: EnzymeActivity[] }) {
  return (
    <div className="enzyme-activity-grid-frame">
      <div className="enzyme-activity-grid">
        {activities.map((activity) => (
          <div className="enzyme-card" key={activity.id}>
            <header className="enzyme-card__head">
              <span className="enzyme-card__marker" aria-hidden="true" />
              <span className="enzyme-card__name">{activity.shortName}</span>
              <span className="enzyme-card__full-name">{activity.fullName}</span>
            </header>
            <div className="enzyme-card__body">
              <p className="enzyme-card__field">
                <strong>What it does.</strong> {activity.whatItDoes}
              </p>
              <p className="enzyme-card__field">
                <strong>What we do to it, and why.</strong> {activity.whatWeDo}
              </p>
              <figure className="record-figure enzyme-card__sketch">
                <div className="record-figure__placeholder" aria-hidden="true">
                  [ concept sketch placeholder ]
                </div>
                <figcaption>{activity.storyboard}</figcaption>
              </figure>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
