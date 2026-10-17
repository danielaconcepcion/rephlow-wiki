import type { ReactNode } from "react";

import { C, openExperiment } from "./palette";
import "./WorkflowFigure.css";

export { C };

/* --------------------------------------------------------------------------
   Shared pieces for the redrawn workflow figures.

   Each figure (EncapsulationWorkflow, EnzymaticWorkflow,
   RevalorisationWorkflow) is a faithful redraw of the image it replaces:
   the same panels, in the same places, with the same titles, the same
   objects inside them and the same arrows between them. What changes is
   the finish — clean vector drawing in the wiki's palette and type — and
   that every panel is now a link to the experiments it stands for.

   Everything here is drawing primitives and the link behaviour. Nothing in
   this file decides what a figure contains.
   -------------------------------------------------------------------------- */

/** One panel of a figure, as a link. The panel's own drawing goes in
 * `children`; the title is printed exactly as the original figure prints
 * it. */
export function Panel({
  x,
  y,
  w,
  h,
  fill,
  section,
  target,
  label,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  section: string;
  /** The experiment to open; omit for a stage with none of its own. */
  target?: string;
  /** Accessible name: the panel's own title. */
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      className="wff-panel"
      href={`#${section}`}
      aria-label={label}
      onClick={(event) => {
        event.preventDefault();
        openExperiment(section, target);
      }}
    >
      <rect
        className="wff-panel__bg"
        x={x}
        y={y}
        width={w}
        height={h}
        rx={34}
        fill={fill}
      />
      {children}
    </a>
  );
}

/** A panel title, centred or left-aligned as the original sets it. */
export function Title({
  x,
  y,
  size,
  anchor = "middle",
  fit,
  children,
}: {
  x: number;
  y: number;
  size: number;
  anchor?: "start" | "middle";
  /** Width to set a title to when it is longer than its panel: the
   * originals use a condensed face, so a long title is narrowed slightly
   * rather than shortened or broken onto a line it was not on. */
  fit?: number;
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      textLength={fit}
      lengthAdjust={fit ? "spacingAndGlyphs" : undefined}
      fontFamily="var(--font-display)"
      fontWeight={700}
      fontSize={size}
      letterSpacing="-0.01em"
      fill={C.ink}
    >
      {children}
    </text>
  );
}

/** The thick block arrows the originals use between panels. Drawn
 * pointing right and rotated into place. */
export function BlockArrow({
  x,
  y,
  angle = 0,
  length = 76,
}: {
  x: number;
  y: number;
  angle?: number;
  length?: number;
}) {
  const shaft = 34;
  const head = 82;
  const headLen = 36;
  const half = length / 2;
  return (
    <path
      d={`M${-half},${-shaft / 2} H${half - headLen} V${-head / 2} L${half},0 L${half - headLen},${head / 2} V${shaft / 2} H${-half} Z`}
      fill={C.ink}
      transform={`translate(${x} ${y}) rotate(${angle})`}
    />
  );
}

/** A thin arrow, for the small arrows drawn inside panels. */
export function ThinArrow({
  x1,
  y1,
  x2,
  y2,
  width = 5,
  color = C.ink,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width?: number;
  color?: string;
}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const s = width * 2.6;
  const bx = x2 - Math.cos(a) * s;
  const by = y2 - Math.sin(a) * s;
  const nx = Math.sin(a) * s * 0.75;
  const ny = -Math.cos(a) * s * 0.75;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={bx}
        y2={by}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
      <path
        d={`M${x2},${y2} L${bx + nx},${by + ny} L${bx - nx},${by - ny} Z`}
        fill={color}
      />
    </g>
  );
}

/** A five-pointed star centred on (x, y). */
export function Star({
  x,
  y,
  r,
  fill,
}: {
  x: number;
  y: number;
  r: number;
  fill: string;
}) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    return `${x + rad * Math.cos(a)},${y + rad * Math.sin(a)}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} />;
}

/** A globular protein drawn as a cluster of lobes — the cauliflower
 * shapes the originals use for whole enzymes. */
export function Globule({
  x,
  y,
  r,
  fill,
  stroke,
}: {
  x: number;
  y: number;
  r: number;
  fill: string;
  stroke: string;
}) {
  const lobes = [
    [0, -0.62],
    [0.55, -0.38],
    [0.66, 0.18],
    [0.34, 0.62],
    [-0.22, 0.68],
    [-0.66, 0.3],
    [-0.62, -0.28],
    [-0.2, -0.7],
  ];
  return (
    <g>
      {lobes.map(([dx, dy], i) => (
        <circle
          key={i}
          cx={x + dx * r}
          cy={y + dy * r}
          r={r * 0.46}
          fill={fill}
          stroke={stroke}
          strokeWidth={3}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.72} fill={fill} />
      {lobes.slice(0, 5).map(([dx, dy], i) => (
        <circle
          key={`i${i}`}
          cx={x + dx * r * 0.42}
          cy={y + dy * r * 0.42}
          r={r * 0.2}
          fill="none"
          stroke={stroke}
          strokeOpacity={0.2}
          strokeWidth={2.4}
        />
      ))}
    </g>
  );
}

/** The figure frame: a horizontally scrollable box that keeps the
 * original composition intact at any width, plus the original caption. */
export function WorkflowFigure({
  viewBox,
  label,
  caption,
  children,
}: {
  viewBox: string;
  /** The original image's alt text. */
  label: string;
  caption?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="wff">
      <div className="wff__scroll">
        <svg
          className="wff__svg"
          viewBox={viewBox}
          role="group"
          aria-label={label}
        >
          {children}
        </svg>
      </div>
      {caption && <figcaption className="wff__caption">{caption}</figcaption>}
    </figure>
  );
}

/** A protein as a ribbon diagram seen from far away: a tangle of loops
 * with short helix segments, the way the revalorisation figure draws its
 * enzymes on screen and in the zoom. Deterministic, so it renders the
 * same every time. */
export function Tangle({
  x,
  y,
  r,
  color,
  fill,
}: {
  x: number;
  y: number;
  r: number;
  color: string;
  fill: string;
}) {
  const outer = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2;
    const d = 0.7 + ((i * 5) % 3) * 0.06;
    return [
      x + Math.cos(a) * r * d,
      y + Math.sin(a) * r * d * 0.94,
      r * (0.13 + ((i * 7) % 4) * 0.018),
    ];
  });
  const inner = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 + 0.4;
    const d = i % 2 ? 0.42 : 0.24;
    return [x + Math.cos(a) * r * d, y + Math.sin(a) * r * d, r * 0.14];
  });
  const helices = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 + 0.2;
    const d = i % 2 ? 0.55 : 0.22;
    return [x + Math.cos(a) * r * d, y + Math.sin(a) * r * d, (i * 40) % 180];
  });
  return (
    <g
      fill="none"
      stroke={color}
      strokeWidth={Math.max(2, r * 0.035)}
      strokeLinecap="round"
    >
      {[...outer, ...inner].map(([cx, cy, rr], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={rr}
          ry={rr * 0.82}
          transform={`rotate(${i * 33} ${cx} ${cy})`}
        />
      ))}
      {helices.map(([cx, cy, rot], i) => (
        <rect
          key={`h${i}`}
          x={cx - r * 0.09}
          y={cy - r * 0.045}
          width={r * 0.18}
          height={r * 0.09}
          rx={r * 0.03}
          fill={fill}
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      ))}
    </g>
  );
}

/** A title of one or more centred lines, as the originals set them, with
 * *asterisks* marking the species names they print in italics. The size
 * is chosen so the lines fit their panel as they are; `maxWidth` is only
 * a last-resort guard, narrowing a line that would otherwise run over
 * rather than re-breaking it. */
export function TitleLines({
  x,
  y,
  size,
  lines,
  maxWidth,
  lineHeight = 1.22,
}: {
  x: number;
  y: number;
  size: number;
  lines: string[];
  /** Omit it to let the lines set at their natural width. */
  maxWidth?: number;
  lineHeight?: number;
}) {
  return (
    <>
      {lines.map((line, i) => {
        const plain = line.replace(/\*/g, "");
        const estimate = plain.length * size * 0.57;
        const parts = line.split(/(\*[^*]+\*)/).filter(Boolean);
        return (
          <text
            key={i}
            x={x}
            y={y + i * size * lineHeight}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight={700}
            fontSize={size}
            letterSpacing="-0.01em"
            fill={C.ink}
            textLength={maxWidth && estimate > maxWidth ? maxWidth : undefined}
            lengthAdjust={
              maxWidth && estimate > maxWidth ? "spacingAndGlyphs" : undefined
            }
          >
            {parts.map((part, j) =>
              part.startsWith("*") ? (
                <tspan key={j} fontStyle="italic">
                  {part.slice(1, -1)}
                </tspan>
              ) : (
                <tspan key={j}>{part}</tspan>
              ),
            )}
          </text>
        );
      })}
    </>
  );
}
