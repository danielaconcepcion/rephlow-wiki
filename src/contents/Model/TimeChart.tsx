import { useId, useRef, useState } from "react";
import type { Point } from "./dynamicsData";

/* --------------------------------------------------------------------------
   The one line chart the dynamics figures are drawn with: axes, a grid, a
   set of curves and a pointer read-out. It draws what it is given and
   decides nothing about the data.
   -------------------------------------------------------------------------- */

export interface ChartSeries {
  id: string;
  label: string;
  color: string;
  pts: Point[];
  dashed?: boolean;
  /** Drawn thin and pale — the unselected steps of a parameter scan. */
  faint?: boolean;
  /** Left out of the read-out (a faint scan step has nothing to say). */
  silent?: boolean;
}

const W = 380;
const H = 250;
const PAD = { l: 48, r: 12, t: 10, b: 36 };
const PW = W - PAD.l - PAD.r;
const PH = H - PAD.t - PAD.b;

/** Axis numbers at the sizes these panels are read at: 12 000 is noise,
 * 12k is a number. */
function tick(v: number, compact: boolean): string {
  if (v === 0) return "0";
  if (compact && Math.abs(v) >= 1000) {
    const k = v / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1)}k`;
  }
  if (Math.abs(v) >= 1) return String(Math.round(v * 100) / 100);
  return String(Math.round(v * 1000) / 1000);
}

/** The value of a curve at time t, linearly between its two nearest
 * points; null before it starts or after it ends. */
function at(pts: Point[], t: number): number | null {
  if (pts.length === 0 || t < pts[0][0] || t > pts[pts.length - 1][0]) {
    return null;
  }
  let i = 0;
  while (i < pts.length - 2 && pts[i + 1][0] < t) i += 1;
  const [x0, y0] = pts[i];
  const [x1, y1] = pts[i + 1];
  if (x1 === x0) return y0;
  return y0 + ((y1 - y0) * (t - x0)) / (x1 - x0);
}

export function TimeChart({
  title,
  xMax,
  yMin = 0,
  yMax,
  xTicks,
  yTicks,
  series,
  xLabel = "Time [s]",
  yLabel,
  readoutUnit,
  compactTicks = false,
  hint = false,
}: {
  title: string;
  xMax: number;
  /** Sensitivities run either side of zero; concentrations do not. */
  yMin?: number;
  yMax: number;
  xTicks: number[];
  yTicks: number[];
  series: ChartSeries[];
  xLabel?: string;
  yLabel: string;
  readoutUnit: string;
  /** Write 10 000 as 10k — the concentration panels need it, the flux
   * panels have room for the number itself. */
  compactTicks?: boolean;
  /** Only the first panel of a row spells out what the read-out is for. */
  hint?: boolean;
}) {
  const clip = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const px = (t: number) => PAD.l + (t / xMax) * PW;
  const py = (v: number) => PAD.t + PH - ((v - yMin) / (yMax - yMin)) * PH;
  const d = (pts: Point[]) =>
    pts.length
      ? `M${pts.map(([t, v]) => `${px(t).toFixed(1)},${py(v).toFixed(1)}`).join(" L")}`
      : "";

  function track(event: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * W;
    if (x < PAD.l || x > PAD.l + PW) {
      setHover(null);
      return;
    }
    setHover(((x - PAD.l) / PW) * xMax);
  }

  const readout = hover
    ? series
        .filter((s) => !s.faint && !s.silent)
        .map((s) => ({ s, v: at(s.pts, hover) }))
        .filter((r): r is { s: ChartSeries; v: number } => r.v !== null)
    : [];

  return (
    <figure className="tchart">
      <figcaption className="tchart__title">{title}</figcaption>
      <svg
        ref={svgRef}
        className="tchart__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${title}: ${series
          .filter((s) => !s.faint)
          .map((s) => s.label)
          .join(", ")} against time`}
        onPointerMove={track}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <clipPath id={clip}>
            <rect x={PAD.l} y={PAD.t} width={PW} height={PH} />
          </clipPath>
        </defs>

        {yTicks.map((v) => (
          <g key={v}>
            <line
              className="tchart__grid"
              x1={PAD.l}
              y1={py(v)}
              x2={PAD.l + PW}
              y2={py(v)}
            />
            <text className="tchart__tick" x={PAD.l - 7} y={py(v) + 3.5}>
              {tick(v, compactTicks)}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text
            key={t}
            className="tchart__tick tchart__tick--x"
            x={px(t)}
            y={PAD.t + PH + 15}
          >
            {tick(t, compactTicks)}
          </text>
        ))}

        <line
          className="tchart__axis"
          x1={PAD.l}
          y1={PAD.t}
          x2={PAD.l}
          y2={PAD.t + PH}
        />
        <line
          className="tchart__axis"
          x1={PAD.l}
          y1={PAD.t + PH}
          x2={PAD.l + PW}
          y2={PAD.t + PH}
        />
        {yMin < 0 && yMax > 0 && (
          <line
            className="tchart__zero"
            x1={PAD.l}
            y1={py(0)}
            x2={PAD.l + PW}
            y2={py(0)}
          />
        )}

        <g clipPath={`url(#${clip})`}>
          {series.map((s, i) => (
            <path
              key={`${s.id}-${i}`}
              className={`tchart__line${s.faint ? " tchart__line--faint" : ""}`}
              d={d(s.pts)}
              stroke={s.color}
              strokeDasharray={s.dashed ? "5 4" : undefined}
            />
          ))}
          {hover !== null && (
            <line
              className="tchart__cursor"
              x1={px(hover)}
              y1={PAD.t}
              x2={px(hover)}
              y2={PAD.t + PH}
            />
          )}
          {readout.map(({ s, v }) => (
            <circle
              key={s.id}
              className="tchart__dot"
              cx={px(hover ?? 0)}
              cy={py(v)}
              r={3.4}
              fill={s.color}
            />
          ))}
        </g>

        <text
          className="tchart__axis-label tchart__axis-label--x"
          x={PAD.l + PW / 2}
          y={H - 3}
        >
          {xLabel}
        </text>
        <text
          className="tchart__axis-label"
          transform={`translate(11 ${PAD.t + PH / 2}) rotate(-90)`}
        >
          {yLabel}
        </text>
      </svg>

      <div className="tchart__readout" aria-live="off">
        {hover === null ? (
          <span className="tchart__readout-hint">
            {hint ? "Point at a chart to read values off it" : ""}
          </span>
        ) : (
          <>
            <strong>t = {Math.round(hover)} s</strong>
            {readout.map(({ s, v }) => (
              <span key={s.id} className="tchart__readout-item">
                <i style={{ background: s.color }} aria-hidden="true" />
                {s.label} {v < 10 ? v.toFixed(3) : Math.round(v)} {readoutUnit}
              </span>
            ))}
          </>
        )}
      </div>
    </figure>
  );
}

/** The shared key below a row of panels. */
export function ChartLegend({
  items,
}: {
  items: { id: string; label: string; color: string; dashed?: boolean }[];
}) {
  return (
    <ul className="tchart-legend">
      {items.map((s) => (
        <li key={s.id}>
          <svg width="22" height="10" aria-hidden="true">
            <line
              x1="1"
              y1="5"
              x2="21"
              y2="5"
              stroke={s.color}
              strokeWidth="2.6"
              strokeDasharray={s.dashed ? "5 4" : undefined}
            />
          </svg>
          {s.label}
        </li>
      ))}
    </ul>
  );
}
