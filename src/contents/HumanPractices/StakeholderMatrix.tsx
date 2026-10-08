import { useEffect, useId, useRef, useState } from "react";

import { asset } from "../../utils";
import {
  MATRIX_ITEMS,
  QUADRANT_LABELS,
  rowFor,
  type MatrixItem,
  type Quadrant,
} from "./StakeholderMatrixData";

const QUADRANT_ORDER: Quadrant[] = [
  "keep-informed",
  "manage-closely",
  "monitor",
  "keep-satisfied",
];

/**
 * One actor on the matrix. A button rather than a hover-only element: the
 * detail has to be reachable by keyboard and on a touch screen, where
 * there is no hover at all. Pointer users still get the card on hover;
 * keyboard users get it on focus; touch users get it on tap.
 */
function MatrixCard({
  item,
  open,
  onOpen,
  onClose,
}: {
  item: MatrixItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const panelId = useId();
  const row = rowFor(item);

  const body = (
    <>
      <span
        className={`hp-matrix__dot${item.engaged ? " hp-matrix__dot--engaged" : ""}`}
        aria-hidden="true"
      />
      {item.logo && <img className="hp-matrix__logo" src={asset(item.logo)} alt="" />}
      <span className="hp-matrix__names">
        <span className="hp-matrix__name">{item.name}</span>
        {item.subtitle && (
          <span className="hp-matrix__subtitle">{item.subtitle}</span>
        )}
        {/* Printed inside the box on the team's own matrix, so it belongs
            on the pill rather than only inside a card — which an actor
            with no table row does not have. */}
        {item.members && (
          <span className="hp-matrix__subtitle">
            {item.members.join(" · ")}
          </span>
        )}
        <span className="hp-matrix__engagement">
          {item.engaged ? "Engaged to date" : "Not yet engaged"}
        </span>
      </span>
    </>
  );

  /* An actor the stakeholder table has no row for carries no card: it is
     named on the matrix and nothing more. Rendered as plain text rather
     than a button, so it does not offer a control that opens nothing. */
  if (!row) {
    return (
      <div className="hp-matrix__item">
        <div className="hp-matrix__pill hp-matrix__pill--static">{body}</div>
      </div>
    );
  }

  return (
    <div
      className={`hp-matrix__item${open ? " is-open" : ""}`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className="hp-matrix__pill"
        aria-expanded={open}
        aria-controls={panelId}
        onFocus={onOpen}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {body}
      </button>

      <div className="hp-matrix__panel" id={panelId} role="note" hidden={!open}>
        <p className="hp-matrix__panel-title">{item.name}</p>

        <dl className="hp-matrix__fields">
          <dt>Relationship with rePhlow</dt>
          <dd>{row.relationship}</dd>
          <dt>What matters most to them</dt>
          <dd>{row.matters}</dd>
          <dt>What rePhlow must demonstrate</dt>
          <dd>{row.mustDemonstrate}</dd>
        </dl>
      </div>
    </div>
  );
}

export function StakeholderMatrix() {
  const [openId, setOpenId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // A card opened by tap or keyboard stays open until something else is
  // chosen, Escape is pressed, or the focus/pointer leaves the matrix —
  // otherwise on a touch screen there is no way to dismiss it.
  useEffect(() => {
    if (!openId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openId]);

  return (
    <figure className="hp-matrix" ref={rootRef}>
      <div className="hp-matrix__frame">
        <p className="hp-matrix__axis hp-matrix__axis--power">Power</p>

        <div className="hp-matrix__grid">
          {QUADRANT_ORDER.map((quadrant) => (
            <section
              className={`hp-matrix__quadrant hp-matrix__quadrant--${quadrant}`}
              key={quadrant}
              aria-label={QUADRANT_LABELS[quadrant]}
            >
              <h4 className="hp-matrix__quadrant-label">
                {QUADRANT_LABELS[quadrant]}
              </h4>
              <div className="hp-matrix__items">
                {MATRIX_ITEMS.filter((item) => item.quadrant === quadrant).map(
                  (item) => (
                    <MatrixCard
                      item={item}
                      key={item.id}
                      open={openId === item.id}
                      onOpen={() => setOpenId(item.id)}
                      onClose={() => setOpenId((id) => (id === item.id ? null : id))}
                    />
                  ),
                )}
              </div>
            </section>
          ))}
        </div>

        <p className="hp-matrix__axis hp-matrix__axis--interest">Interest</p>
      </div>

      <p className="hp-matrix__legend">
        <span className="hp-matrix__legend-item">
          <span
            className="hp-matrix__dot hp-matrix__dot--engaged"
            aria-hidden="true"
          />
          Engaged to date
        </span>
        <span className="hp-matrix__legend-item">
          <span className="hp-matrix__dot" aria-hidden="true" />
          Not yet engaged
        </span>
      </p>

      <figcaption>
        Our stakeholder matrix, by the power an actor holds over rePhlow's
        implementation and the interest they have in it. Where we have
        written an actor up, selecting or hovering over it shows how it
        relates to rePhlow, what matters most to it and what rePhlow would
        have to demonstrate.
      </figcaption>
    </figure>
  );
}
