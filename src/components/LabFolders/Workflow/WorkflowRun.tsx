import { useId, type ReactNode } from "react";

import { WORKFLOW_GLYPHS, type GlyphId } from "./glyphs";
import "./WorkflowRun.css";

/* --------------------------------------------------------------------------
   A block's experimental workflow, drawn as a run rather than a diagram.

   One rail threads through every stage in order, the way a bench protocol
   actually runs, and each stage is a drawn object sitting on it (see
   glyphs.tsx) rather than a box with a title in it. The rail, the station
   plates and the ghost illustration in the background are one SVG; the
   stages themselves — number, name, one-line note — are ordinary links
   laid over it, so they stay selectable, translatable and reachable by
   keyboard, and so each one can open its own experiment.

   That is the second job these figures do: the run is also the block's
   visual index. Clicking a stage scrolls to the sub-block it belongs to
   and opens that experiment's folder, exactly as the section nav's own
   leaves do (see Experiments.tsx's SECTIONS_BY_BLOCK).

   Layout is computed, not hand-placed: the stages are laid out on a grid
   of `cols` columns, running left to right and then right to left, and
   the rail is the chain of curves between consecutive stations. One set
   of coordinates therefore drives four workflows of five, six, nine and
   six stages without any of them needing its own geometry. Below the
   container's narrow breakpoint the canvas is dropped and the same links
   stack into a vertical run with a spine — the sequence is the one thing
   that must survive every width.
   -------------------------------------------------------------------------- */

export interface WorkflowStageDef {
  /** The experiment this stage opens (its folder tab id). */
  target: string;
  /** The sub-block that experiment lives in, scrolled to on the way. */
  section?: string;
  /** Printed step number — a range ("2–5") where one stage covers several. */
  n: string;
  name: string;
  /** The half-line under the name: what the stage actually weighs up. */
  note?: string;
  glyph: GlyphId;
}

export interface WorkflowRunProps {
  /** Used for the figure's own ids; must be unique on the page. */
  id: string;
  stages: WorkflowStageDef[];
  /** Stations per row. Five- and six-stage runs read best at 3. */
  cols: number;
  caption?: ReactNode;
  /** Drawn very large and very faint behind the run. */
  ghost?: GlyphId;
  /** Closes the run back to its first stage (a cycle, not a line). */
  loop?: boolean;
  ariaLabel: string;
}

/** Everything is authored against this width; the viewBox scales it. */
const W = 1200;
/** A gutter either side of the grid, so the rail has somewhere to swing
 * out to when it turns into the next row instead of cutting back down
 * through the labels of the row it is leaving. */
const PAD = 58;
/** How tall a cell is relative to its width. A five-column run has narrow
 * cells whose labels wrap onto three lines, so it needs proportionally
 * more height than a three-column one. */
const cellRatio = (cols: number) => (cols >= 5 ? 1.26 : 0.84);
/** Where in its cell a station sits, as a fraction of the cell's height. */
const ART_Y = 0.3;
const ART_SIZE = 0.4;

interface Placed extends WorkflowStageDef {
  /** Row the station sits in, which is what tells a turn which way the
   * run was travelling when it reached the end of that row. */
  row: number;
  /** Centre of the station, in viewBox units. */
  cx: number;
  cy: number;
  /** Cell box, in viewBox units — the label is positioned from this. */
  left: number;
  top: number;
  width: number;
  height: number;
}

function place(stages: WorkflowStageDef[], cols: number) {
  const rows = Math.ceil(stages.length / cols);
  const cellW = (W - PAD * 2) / cols;
  const cellH = cellW * cellRatio(cols);
  const placed: Placed[] = stages.map((stage, index) => {
    const row = Math.floor(index / cols);
    const within = index % cols;
    // Serpentine: even rows run left to right, odd rows right to left, so
    // the rail never has to jump the full width to start the next row.
    const count = Math.min(cols, stages.length - row * cols);
    const column = row % 2 === 0 ? within : count - 1 - within;
    return {
      ...stage,
      row,
      left: PAD + column * cellW,
      top: row * cellH,
      width: cellW,
      height: cellH,
      cx: PAD + (column + 0.5) * cellW,
      cy: row * cellH + ART_Y * cellH,
    };
  });
  return { placed, rows, cellW, cellH, height: rows * cellH };
}

/** The control points of the curve between two stations: a gentle wave
 * along a row, and, where the run turns into the next one, a bend that
 * swings out past the end of the row rather than cutting back across the
 * labels underneath it. */
function controls(a: Placed, b: Placed, cellW: number) {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  if (Math.abs(dy) < 1) {
    const bow = dx > 0 ? -10 : 10;
    return [
      a.cx,
      a.cy,
      a.cx + dx * 0.3,
      a.cy + bow,
      a.cx + dx * 0.7,
      a.cy - bow,
      b.cx,
      b.cy,
    ];
  }
  // Which way the row that is ending was travelling: the turn carries on
  // that way, out into the gutter, drops the full row height there, and
  // only then comes back in — so it never crosses the labels of the row
  // it is leaving.
  const reach = cellW * 0.46 + PAD * 0.6;
  const gx =
    a.row % 2 === 0
      ? Math.min(W - 18, a.cx + reach)
      : Math.max(18, a.cx - reach);
  return [a.cx, a.cy, gx, a.cy + dy * 0.12, gx, b.cy - dy * 0.12, b.cx, b.cy];
}

function link(a: Placed, b: Placed, cellW: number) {
  const [, , c1x, c1y, c2x, c2y, x, y] = controls(a, b, cellW);
  return `M${a.cx},${a.cy} C${c1x},${c1y} ${c2x},${c2y} ${x},${y}`;
}

/** Point and tangent at t on a cubic, for the arrowhead. */
function at(p: number[], t: number) {
  const [x0, y0, x1, y1, x2, y2, x3, y3] = p;
  const u = 1 - t;
  const bx =
    u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3;
  const by =
    u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3;
  const tx =
    3 * u * u * (x1 - x0) + 6 * u * t * (x2 - x1) + 3 * t * t * (x3 - x2);
  const ty =
    3 * u * u * (y1 - y0) + 6 * u * t * (y2 - y1) + 3 * t * t * (y3 - y2);
  return { x: bx, y: by, angle: (Math.atan2(ty, tx) * 180) / Math.PI };
}

/** Scroll to the stage's sub-block, then open its folder — the same two
 * moves the section nav makes, kept in one place. */
function open(stage: WorkflowStageDef) {
  const section = stage.section ? document.getElementById(stage.section) : null;
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
  const tab = document.getElementById(`folder-tab-${stage.target}`);
  if (!tab) return;
  tab.click();
  if (!section) tab.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function WorkflowRun({
  id,
  stages,
  cols,
  caption,
  ghost,
  loop,
  ariaLabel,
}: WorkflowRunProps) {
  const uid = useId().replace(/:/g, "");
  const { placed, cellW, cellH, height } = place(stages, cols);
  const artSize = cellH * ART_SIZE;
  const plate = artSize * 0.66;

  return (
    <figure className="wf" aria-labelledby={`${id}-caption`}>
      <nav className="wf-run" aria-label={ariaLabel}>
        <svg
          className="wf-canvas"
          viewBox={`0 0 ${W} ${height}`}
          role="presentation"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`${uid}-grid`}
              width="26"
              height="26"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M26 0H0V26"
                fill="none"
                stroke="var(--wf-accent)"
                strokeOpacity="0.07"
                strokeWidth="1"
              />
            </pattern>
            <clipPath id={`${uid}-box`}>
              <rect width={W} height={height} rx="22" />
            </clipPath>
          </defs>

          <rect width={W} height={height} rx="22" fill="var(--wf-wash)" />
          <rect width={W} height={height} rx="22" fill={`url(#${uid}-grid)`} />

          {/* The block's own object, enormous and almost invisible: the
              decorative layer lives here, behind everything, so it never
              competes with a label. */}
          {ghost && (
            <g clipPath={`url(#${uid}-box)`}>
              {/* The clip has to sit on a group of its own: on the drawn
                  group it would be resolved in that group's own, scaled
                  coordinates and would no longer match the figure's box. */}
              <g
                className="wf-ghost"
                transform={`translate(${W - cellW * 0.95} ${height - cellH * 0.9}) scale(${(cellH * 1.5) / 100})`}
              >
                {WORKFLOW_GLYPHS[ghost]}
              </g>
            </g>
          )}

          <g className="wf-rail">
            {placed.slice(0, -1).map((a, i) => {
              const b = placed[i + 1];
              const head = at(controls(a, b, cellW), 0.56);
              return (
                <g key={a.target}>
                  <path className="wf-rail__line" d={link(a, b, cellW)} />
                  <path
                    className="wf-rail__head"
                    d="M-7,-6 L3,0 L-7,6"
                    transform={`translate(${head.x} ${head.y}) rotate(${head.angle})`}
                  />
                </g>
              );
            })}
            {loop &&
              placed.length > 1 &&
              (() => {
                // The return of a cycle, routed out through the gutter so it
                // reads as a feedback line rather than another step: out of
                // the last station's side, up the margin, back into the
                // first. Dashed, and with its own head pointing home.
                const last = placed[placed.length - 1];
                const first = placed[0];
                const gx = PAD * 0.42;
                const side = last.cx > W / 2 ? W - gx : gx;
                const mid = (last.cy + first.cy) / 2;
                return (
                  <g>
                    <path
                      className="wf-rail__line wf-rail__line--loop"
                      d={`M${last.cx + (side > W / 2 ? plate : -plate)},${last.cy} C${side},${last.cy} ${side},${first.cy} ${first.cx + (side > W / 2 ? plate : -plate)},${first.cy}`}
                    />
                    <path
                      className="wf-rail__head wf-rail__head--loop"
                      d="M-6,-5 L2,0 L-6,5"
                      transform={`translate(${side + (side > W / 2 ? -9 : 9)} ${mid}) rotate(-90)`}
                    />
                  </g>
                );
              })()}
          </g>

          {placed.map((stage) => (
            <g
              key={stage.target}
              transform={`translate(${stage.cx} ${stage.cy})`}
            >
              <circle className="wf-plate" r={plate} />
              <g
                transform={`translate(${-artSize / 2} ${-artSize / 2}) scale(${artSize / 100})`}
              >
                {WORKFLOW_GLYPHS[stage.glyph]}
              </g>
            </g>
          ))}
        </svg>

        <ol className="wf-stages">
          {placed.map((stage) => (
            <li
              key={stage.target}
              className="wf-stage"
              style={
                {
                  "--x": `${(stage.left / W) * 100}%`,
                  "--y": `${((stage.top + cellH * (ART_Y + ART_SIZE * 0.58)) / height) * 100}%`,
                  "--w": `${(stage.width / W) * 100}%`,
                } as React.CSSProperties
              }
            >
              <a
                className="wf-stage__link"
                href={`#${stage.section ?? stage.target}`}
                onClick={(event) => {
                  event.preventDefault();
                  open(stage);
                }}
              >
                <svg
                  className="wf-stage__glyph"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  {WORKFLOW_GLYPHS[stage.glyph]}
                </svg>
                <span className="wf-stage__text">
                  <span className="wf-stage__name">
                    <span className="wf-stage__n">{stage.n}</span>
                    {stage.name}
                  </span>
                  {stage.note && (
                    <span className="wf-stage__note">{stage.note}</span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {caption && (
        <figcaption className="wf__caption" id={`${id}-caption`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
