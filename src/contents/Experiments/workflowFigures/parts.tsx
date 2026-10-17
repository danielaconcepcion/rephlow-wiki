import type { ReactNode } from "react";

import { C } from "./palette";

/* --------------------------------------------------------------------------
   Laboratory objects the Genetic engineering figures draw again and again
   — plasmids, double-stranded DNA, bacteria, tubes, dishes, plots — so
   each appears the same way in every panel that uses it.
   -------------------------------------------------------------------------- */

/** A plasmid ring with coloured segments, angles in degrees clockwise
 * from twelve o'clock. */
export function Plasmid({
  x,
  y,
  r,
  w = 10,
  segments = [],
  ring = C.blue,
  gap,
}: {
  x: number;
  y: number;
  r: number;
  w?: number;
  segments?: { from: number; to: number; color: string }[];
  ring?: string;
  /** An opening in the ring (a cut vector), as [from, to] degrees. */
  gap?: [number, number];
}) {
  const pt = (deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [x + r * Math.cos(a), y + r * Math.sin(a)];
  };
  const arc = (from: number, to: number) => {
    const [x1, y1] = pt(from);
    const [x2, y2] = pt(to);
    const large = (to - from + 360) % 360 > 180 ? 1 : 0;
    return `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2}`;
  };
  return (
    <g fill="none" strokeLinecap="butt">
      {gap ? (
        <path d={arc(gap[1], gap[0] + 360)} stroke={ring} strokeWidth={w} />
      ) : (
        <circle cx={x} cy={y} r={r} stroke={ring} strokeWidth={w} />
      )}
      {segments.map((s, i) => (
        <path
          key={i}
          d={arc(s.from, s.to)}
          stroke={s.color}
          strokeWidth={w + 2}
        />
      ))}
    </g>
  );
}

/** A short stretch of double-stranded DNA, drawn as a ladder. */
export function Dna({
  x1,
  x2,
  y,
  color,
  h = 12,
}: {
  x1: number;
  x2: number;
  y: number;
  color: string;
  h?: number;
}) {
  const rungs = Math.floor((x2 - x1) / 7);
  return (
    <g stroke={color} strokeLinecap="round">
      <line x1={x1} y1={y - h / 2} x2={x2} y2={y - h / 2} strokeWidth={3} />
      <line x1={x1} y1={y + h / 2} x2={x2} y2={y + h / 2} strokeWidth={3} />
      {Array.from({ length: rungs }, (_, i) => (
        <line
          key={i}
          x1={x1 + 4 + i * 7}
          y1={y - h / 2}
          x2={x1 + 4 + i * 7}
          y2={y + h / 2}
          strokeWidth={2}
        />
      ))}
    </g>
  );
}

/** A rod-shaped bacterium with flagella and a coil of DNA inside. */
export function Bacterium({
  x,
  y,
  len,
  wid,
  rot,
  stroke,
  fill,
  dna = C.ink,
  flagella = 12,
  flagellaLen = 26,
}: {
  x: number;
  y: number;
  len: number;
  wid: number;
  rot: number;
  stroke: string;
  fill: string;
  dna?: string;
  flagella?: number;
  /** How far the flagella reach beyond the cell; scale it down for the
   * small cells drawn as legend keys. */
  flagellaLen?: number;
}) {
  const hl = len / 2;
  const hw = wid / 2;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {Array.from({ length: flagella }, (_, i) => {
        const t = (i / flagella) * Math.PI * 2;
        const ex = Math.cos(t) * hl * 0.95;
        const ey = Math.sin(t) * hw * 0.95;
        const ox = Math.cos(t) * (hl + flagellaLen);
        const oy = Math.sin(t) * (hw + flagellaLen);
        return (
          <path
            key={i}
            d={`M${ex},${ey} Q${(ex + ox) / 2 + 8},${(ey + oy) / 2 - 8} ${ox},${oy} T${ox + Math.cos(t) * flagellaLen * 0.54},${oy + Math.sin(t) * flagellaLen * 0.54}`}
            stroke={stroke}
            strokeWidth={2.4}
            fill="none"
            strokeLinecap="round"
          />
        );
      })}
      <rect
        x={-hl}
        y={-hw}
        width={len}
        height={wid}
        rx={hw}
        fill={fill}
        stroke={stroke}
        strokeWidth={3.5}
      />
      <g fill="none" stroke={dna} strokeWidth={2.2} strokeOpacity={0.75}>
        {[-14, -4, 6, 14].map((dx, i) => (
          <ellipse
            key={dx}
            cx={dx}
            cy={i % 2 ? 4 : -4}
            rx={wid * 0.17}
            ry={wid * 0.13}
          />
        ))}
        {[-8, 10].map((dx) => (
          <ellipse
            key={`b${dx}`}
            cx={dx}
            cy={2}
            rx={wid * 0.14}
            ry={wid * 0.18}
          />
        ))}
      </g>
    </g>
  );
}

/** A microcentrifuge tube with its lid flipped open. */
export function Tube({
  x,
  top,
  w,
  h,
  liquid,
  level = 0.5,
  lidSide = "right",
  children,
}: {
  x: number;
  top: number;
  w: number;
  h: number;
  liquid: string;
  level?: number;
  lidSide?: "left" | "right";
  children?: ReactNode;
}) {
  const body = h * 0.62;
  const ly = top + body * (1 - level);
  const lidX = lidSide === "right" ? x + w * 0.35 : x - w * 0.95;
  const lidRot = lidSide === "right" ? -58 : 58;
  return (
    <g>
      <path
        d={`M${x - w / 2},${ly} H${x + w / 2} V${top + body} L${x},${top + h} L${x - w / 2},${top + body} Z`}
        fill={liquid}
      />
      <path
        d={`M${x - w / 2},${top} H${x + w / 2} V${top + body} L${x},${top + h} L${x - w / 2},${top + body} Z`}
        fill="none"
        stroke={C.blueMid}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <rect
        x={x - w / 2 - 5}
        y={top - 6}
        width={w + 10}
        height={8}
        rx={3}
        fill={C.white}
        stroke={C.blueMid}
        strokeWidth={2.5}
      />
      <rect
        x={lidX}
        y={top - 50}
        width={w * 0.6}
        height={w * 0.95}
        rx={5}
        fill={C.white}
        stroke={C.blueMid}
        strokeWidth={2.5}
        transform={`rotate(${lidRot} ${lidX + w * 0.3} ${top - 6})`}
      />
      {children}
    </g>
  );
}

/** A Petri dish seen at an angle, with colonies. */
export function Petri({
  x,
  y,
  rx,
  ry,
  colonies,
}: {
  x: number;
  y: number;
  rx: number;
  ry: number;
  colonies: { dx: number; dy: number; r?: number; color?: string }[];
}) {
  return (
    <g>
      <ellipse cx={x} cy={y + ry * 0.25} rx={rx} ry={ry} fill="#d9c08f" />
      <ellipse
        cx={x}
        cy={y}
        rx={rx}
        ry={ry}
        fill="#ecd9ae"
        stroke="#cdb27a"
        strokeWidth={2.5}
      />
      <ellipse
        cx={x}
        cy={y}
        rx={rx * 0.9}
        ry={ry * 0.85}
        fill="none"
        stroke={C.white}
        strokeOpacity={0.6}
        strokeWidth={2}
      />
      {colonies.map(({ dx, dy, r = 7, color = "#fbf3d7" }, i) => (
        <circle key={i} cx={x + dx} cy={y + dy} r={r} fill={color} />
      ))}
    </g>
  );
}

/** A desktop monitor; the screen's contents go in `children`. */
export function Monitor({
  x,
  y,
  w,
  h,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children?: ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={C.ink} />
      <rect
        x={x + 10}
        y={y + 10}
        width={w - 20}
        height={h - 20}
        rx={3}
        fill={C.white}
      />
      <rect x={x + w / 2 - 16} y={y + h} width={32} height={26} fill={C.ink} />
      <rect
        x={x + w / 2 - 58}
        y={y + h + 24}
        width={116}
        height={14}
        rx={6}
        fill={C.ink}
      />
      {children}
    </g>
  );
}

/** An Erlenmeyer flask holding a coloured culture. */
export function Flask({
  x,
  top,
  w,
  h,
  liquid,
  level = 0.42,
}: {
  x: number;
  top: number;
  w: number;
  h: number;
  liquid: string;
  level?: number;
}) {
  const neck = w * 0.32;
  const nh = h * 0.3;
  const bottom = top + h;
  const ly = bottom - h * level;
  const tAt = (yy: number) =>
    ((yy - (top + nh)) / (h - nh)) * (w / 2 - neck / 2) + neck / 2;
  return (
    <g>
      <path
        d={`M${x - tAt(ly)},${ly} H${x + tAt(ly)} L${x + w / 2},${bottom - 6} Q${x + w / 2},${bottom} ${x + w / 2 - 6},${bottom} H${x - w / 2 + 6} Q${x - w / 2},${bottom} ${x - w / 2},${bottom - 6} Z`}
        fill={liquid}
      />
      <path
        d={`M${x - neck / 2},${top} V${top + nh} L${x - w / 2},${bottom - 6} Q${x - w / 2},${bottom} ${x - w / 2 + 6},${bottom} H${x + w / 2 - 6} Q${x + w / 2},${bottom} ${x + w / 2},${bottom - 6} L${x + neck / 2},${top + nh} V${top}`}
        fill="none"
        stroke={C.blueMid}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <line
        x1={x - neck / 2 - 5}
        y1={top}
        x2={x + neck / 2 + 5}
        y2={top}
        stroke={C.blueMid}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    </g>
  );
}

/** Axes with dotted series, as the originals draw their growth and
 * accumulation curves. Each series starts at the origin. */
export function Plot({
  ox,
  oy,
  w,
  h,
  series,
  arrows = true,
}: {
  ox: number;
  oy: number;
  w: number;
  h: number;
  series: { color: string; pts: [number, number][] }[];
  arrows?: boolean;
}) {
  return (
    <g>
      <g stroke={C.ink} strokeWidth={3} fill="none">
        <line x1={ox} y1={oy} x2={ox} y2={oy - h} />
        <line x1={ox} y1={oy} x2={ox + w} y2={oy} />
      </g>
      {arrows && (
        <g fill={C.ink}>
          <path
            d={`M${ox},${oy - h - 12} L${ox - 7},${oy - h + 2} L${ox + 7},${oy - h + 2} Z`}
          />
          <path
            d={`M${ox + w + 12},${oy} L${ox + w - 2},${oy - 7} L${ox + w - 2},${oy + 7} Z`}
          />
        </g>
      )}
      {series.map(({ color, pts }) => (
        <g key={color}>
          <path
            d={`M${ox},${oy} ${pts.map(([px, py]) => `L${px},${py}`).join(" ")}`}
            fill="none"
            stroke={color}
            strokeWidth={4}
            strokeLinejoin="round"
          />
          {pts.map(([px, py]) => (
            <circle key={px} cx={px} cy={py} r={6.5} fill={color} />
          ))}
        </g>
      ))}
    </g>
  );
}

/** A curly brace on the right-hand side, gathering a stack of parts. */
export function Brace({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  const m = (y1 + y2) / 2;
  return (
    <path
      d={`M${x},${y1} C${x + 18},${y1} ${x + 10},${m - 10} ${x + 22},${m} C${x + 10},${m + 10} ${x + 18},${y2} ${x},${y2}`}
      fill="none"
      stroke={C.ink}
      strokeWidth={3}
      strokeLinecap="round"
    />
  );
}

/** A small stacked bar used as a DNA part (promoter, gene, terminator). */
export function Part({
  x,
  y,
  w,
  h = 16,
  color,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  color: string;
}) {
  return <rect x={x} y={y - h / 2} width={w} height={h} rx={2} fill={color} />;
}

/** A chromatogram trace: one coloured peak per base. */
export function Chromatogram({
  x,
  base,
  step,
  peaks,
}: {
  x: number;
  base: number;
  step: number;
  peaks: { h: number; color: string }[];
}) {
  return (
    <g fill="none" strokeWidth={3.2} strokeLinecap="round">
      {peaks.map(({ h, color }, i) => {
        const cx = x + i * step;
        return (
          <path
            key={i}
            d={`M${cx - step * 0.9},${base} C${cx - step * 0.35},${base} ${cx - step * 0.25},${base - h} ${cx},${base - h} C${cx + step * 0.25},${base - h} ${cx + step * 0.35},${base} ${cx + step * 0.9},${base}`}
            stroke={color}
          />
        );
      })}
      <line
        x1={x - step}
        y1={base}
        x2={x + peaks.length * step}
        y2={base}
        stroke={C.ink}
        strokeWidth={2.5}
      />
    </g>
  );
}
