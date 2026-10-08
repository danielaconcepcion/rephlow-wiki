import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

import { asset } from "../../utils";
import {
  AXIS_CROSS,
  MATRIX_ITEMS,
  QUADRANT_CORNER,
  QUADRANT_LABELS,
  rowFor,
  type MatrixItem,
  type Quadrant,
} from "./StakeholderMatrixData";

type PlotStyle = CSSProperties & { "--x": string; "--y": string };

const QUADRANTS = Object.keys(QUADRANT_LABELS) as Quadrant[];

/**
 * One actor, placed at its own point in the plot. The marker is the thing
 * at the coordinate; the label hangs off it, on the side the data picks so
 * labels stay off each other and inside the plot.
 */
function Marker({
  item,
  index,
  open,
  onOpen,
  onClose,
}: {
  item: MatrixItem;
  index: number;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const panelId = useId();
  const row = rowFor(item);
  const style: PlotStyle = { "--x": `${item.x}%`, "--y": `${item.y}%` };

  const body = (
    <span className="hp-matrix__label">
      <span className="hp-matrix__number" aria-hidden="true">
        {index + 1}
      </span>
      {item.logo && (
        <img className="hp-matrix__logo" src={asset(item.logo)} alt="" />
      )}
      <span className="hp-matrix__name">{item.name}</span>
      {item.subtitle && <span className="hp-matrix__note">{item.subtitle}</span>}
      {item.members && (
        <span className="hp-matrix__note hp-matrix__note--members">
          {item.members.join(" \u00b7 ")}
        </span>
      )}
      <span className="hp-matrix__sr">
        {item.engaged ? "Engaged to date" : "Not yet engaged"}
      </span>
    </span>
  );

  // Near an edge the label is hung below/above the marker rather than
  // centred on it, so it stays inside the plot.
  const vAlign =
    item.valign ?? (item.y < 10 ? "below" : item.y > 90 ? "above" : null);

  const classes = [
    "hp-matrix__point",
    `hp-matrix__point--${item.side ?? "right"}`,
    vAlign ? `hp-matrix__point--v-${vAlign}` : "",
    item.engaged ? "is-engaged" : "is-pending",
    open ? "is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  /* An actor the stakeholder table has no row for carries no card: it is
     placed on the matrix and named, and nothing more. Plain text rather
     than a button, so it does not offer a control that opens nothing. */
  if (!row) {
    return (
      <div className={`${classes} is-static`} style={style} data-id={item.id}>
        <div className="hp-matrix__hit">{body}</div>
      </div>
    );
  }

  return (
    <div
      className={classes}
      style={style}
      data-id={item.id}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className="hp-matrix__hit"
        aria-expanded={open}
        aria-controls={panelId}
        onFocus={onOpen}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {body}
      </button>

      <div className="hp-matrix__card" id={panelId} role="note" hidden={!open}>
        <p className="hp-matrix__card-title">{item.name}</p>
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
  // chosen, Escape is pressed, or the pointer leaves the matrix —
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

  const crossStyle = {
    "--cross-x": `${AXIS_CROSS.x}%`,
    "--cross-y": `${AXIS_CROSS.y}%`,
  } as CSSProperties & { "--cross-x": string; "--cross-y": string };

  return (
    <figure className="hp-matrix" ref={rootRef}>
      <div
        className={`hp-matrix__plot${openId ? " has-open" : ""}`}
        style={crossStyle}
      >
        {/* The two axes: dotted rules crossing where the source crosses
            them, each named at its growing end. This is a field with
            positions, not a table of four cells. */}
        <div className="hp-matrix__field">
          <div className="hp-matrix__rule hp-matrix__rule--y" aria-hidden="true" />
          <div className="hp-matrix__rule hp-matrix__rule--x" aria-hidden="true" />
        {/* As in the source: the horizontal rule is the Power divider
            (above it = more power) and the vertical rule the Interest one
            (right of it = more interest), each named at the end the
            source names it. */}
          <p className="hp-matrix__axis hp-matrix__axis--x">Power</p>
          <p className="hp-matrix__axis hp-matrix__axis--y">Interest</p>

        {QUADRANTS.map((quadrant) => (
          <p
            className={`hp-matrix__quadrant hp-matrix__quadrant--${QUADRANT_CORNER[quadrant].y}-${QUADRANT_CORNER[quadrant].x}`}
            key={quadrant}
          >
            {QUADRANT_LABELS[quadrant]}
          </p>
        ))}

          {MATRIX_ITEMS.map((item, index) => (
            <Marker
              item={item}
              index={index}
              key={item.id}
              open={openId === item.id}
              onOpen={() => setOpenId(item.id)}
              onClose={() => setOpenId((id) => (id === item.id ? null : id))}
            />
          ))}
        </div>
      </div>

      {/* Below ~620px the plot keeps its points but drops its labels (no
          label is readable at a size that still fits twelve of them), so
          the names live here instead. Hidden from a screen reader, which
          already gets every name from the plot itself. */}
      <ol className="hp-matrix__key-list" aria-hidden="true">
        {MATRIX_ITEMS.map((item, index) => (
          <li key={item.id}>
            <span
              className={`hp-matrix__key-number${item.engaged ? " is-engaged" : ""}`}
            >
              {index + 1}
            </span>
            {item.name}
          </li>
        ))}
      </ol>


      <p className="hp-matrix__legend">
        <span className="hp-matrix__legend-item">
          <span
            className="hp-matrix__key hp-matrix__key--engaged"
            aria-hidden="true"
          />
          Engaged to date
        </span>
        <span className="hp-matrix__legend-item">
          <span className="hp-matrix__key" aria-hidden="true" />
          Not yet engaged
        </span>
      </p>

    </figure>
  );
}
