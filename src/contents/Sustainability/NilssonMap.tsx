import { useMemo, useState } from "react";
import type { ReactNode } from "react";

/**
 * The scored interactions between our targets and the targets they touch,
 * read on the seven-point Nilsson–Griggs–Visbeck scale. The map, the scale
 * and the list are three ways into the same nine rows: pick a score to
 * filter, or a link to read why we scored it that way.
 *
 * The wording of every row is the wording the page already carried in its
 * table; only the way of reading it changed.
 */

type Interaction = {
  from: string;
  to: string;
  score: number;
  label: string;
  why: ReactNode;
  source: ReactNode;
};

const LEFT: [string, string][] = [
  ["6.3", "water quality"],
  ["12.5", "waste reduction"],
  ["12.2", "natural resources"],
  ["12.4", "chemicals and waste"],
];

const RIGHT: [string, string][] = [
  ["14.1", "marine pollution"],
  ["6.3", "water quality"],
  ["15.1", "terrestrial ecosystems"],
  ["2.4", "food production"],
  ["9.4", "retrofit industry"],
  ["7.3", "energy efficiency"],
  ["13.2", "climate in policy"],
  ["9.a", "developing-country infra"],
];

/** The long names, for the detail panel. */
const FULL: Record<string, string> = {
  "6.3": "water quality",
  "12.5": "waste reduction",
  "12.2": "natural resources",
  "12.4": "chemicals and waste",
  "14.1": "marine pollution",
  "15.1": "terrestrial and freshwater ecosystems",
  "2.4": "sustainable food production",
  "9.4": "retrofit industry",
  "7.3": "energy efficiency",
  "13.2": "climate measures in national policy",
  "9.a": "infrastructure in developing countries",
};

function Cite({ n }: { n: number }) {
  return (
    <a className="lab-citation" href={`#ref-r01-${n}`}>
      [{n}]
    </a>
  );
}

const INTERACTIONS: Interaction[] = [
  {
    from: "6.3",
    to: "14.1",
    score: 2,
    label: "reinforcing",
    why: "Nutrients stopped at an industrial outfall never reach the coast, nitrogen as well as phosphorus.",
    source: <Cite n={12} />,
  },
  {
    from: "12.5",
    to: "6.3",
    score: 2,
    label: "reinforcing",
    why: "Recovery is what stops water treatment from becoming sludge production.",
    source: <Cite n={13} />,
  },
  {
    from: "12.2",
    to: "2.4",
    score: 1,
    label: "enabling",
    why: "Recovered phosphorus is a local source of an input that currently crosses a continent.",
    source: "project description",
  },
  {
    from: "6.3",
    to: "15.1",
    score: 1,
    label: "enabling",
    why: "Every kilogramme recovered is a kilogramme not mined from phosphate rock.",
    source: <Cite n={7} />,
  },
  {
    from: "12.2",
    to: "9.4",
    score: 1,
    label: "enabling",
    why: "A modular design allows existing facilities to upgrade their existing equipment without rebuilding their treatment lines.",
    source: (
      <a className="lab-wikilink" href="/hardware">
        see Hardware
      </a>
    ),
  },
  {
    from: "12.2",
    to: "13.2",
    score: -1,
    label: "constraining (today)",
    why: "Bead production dominates our carbon footprint.",
    source: (
      <a
        className="lab-wikilink"
        href="#r03-reading-2-the-carbon-footprint-including"
      >
        see Room 03
      </a>
    ),
  },
  {
    from: "6.3",
    to: "7.3",
    score: -1,
    label: "constraining",
    why: "Continuous operation and downstream recovery consume energy that chemical dosing does not.",
    source: <Cite n={13} />,
  },
  {
    from: "12.2",
    to: "9.a",
    score: -1,
    label: "constraining",
    why: "A contained biological module is more expensive and skill-dependent compared to the traditional chemical method.",
    source: <Cite n={13} />,
  },
  {
    from: "12.4",
    to: "14.1",
    score: -1,
    label: "constraining (conditional)",
    why: "An engineered organism in a waste stream is a risk to the same waters it protects, unless containment holds.",
    source: <Cite n={16} />,
  },
];

const SCALE: [number, string][] = [
  [-3, "cancelling"],
  [-2, "counteracting"],
  [-1, "constraining"],
  [0, "consistent"],
  [1, "enabling"],
  [2, "reinforcing"],
  [3, "indivisible"],
];

/** Geometry of the map, in its own viewBox units. */
const W = 640;
const TOP = 36;
const ROW_H = 42;
const NODE_W = 200;
const LX = 8;
const RX = W - 8 - NODE_W;
const H = TOP + RIGHT.length * ROW_H;
const L_STEP = (RIGHT.length * ROW_H) / LEFT.length;

const leftY = (code: string) =>
  TOP + L_STEP * LEFT.findIndex(([c]) => c === code) + L_STEP / 2;
const rightY = (code: string) =>
  TOP + ROW_H * RIGHT.findIndex(([c]) => c === code) + ROW_H / 2;

const signed = (score: number) =>
  `${score > 0 ? "+" : score < 0 ? "−" : ""}${Math.abs(score)}`;

export function NilssonMap() {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState<number | null>(null);

  const counts = useMemo(() => {
    const map = new Map<number, number>();
    INTERACTIONS.forEach((d) => map.set(d.score, (map.get(d.score) ?? 0) + 1));
    return map;
  }, []);

  const visible = (d: Interaction) => filter === null || d.score === filter;
  const current = INTERACTIONS[selected];

  /** Picking a link clears a filter it would fall outside of. */
  function select(index: number) {
    setSelected(index);
    if (filter !== null && INTERACTIONS[index].score !== filter) {
      setFilter(null);
    }
  }

  function toggleFilter(score: number) {
    const next = filter === score ? null : score;
    setFilter(next);
    if (next !== null) {
      const first = INTERACTIONS.findIndex((d) => d.score === next);
      if (first > -1) setSelected(first);
    }
  }

  const usedLeft = new Set(
    INTERACTIONS.filter(visible).map((d) => `L${d.from}`),
  );
  const usedRight = new Set(
    INTERACTIONS.filter(visible).map((d) => `R${d.to}`),
  );

  return (
    <div className="sus-nilsson">
      <div
        className="sus-nilsson__scale"
        role="group"
        aria-label="Filter interactions by score"
      >
        {SCALE.map(([score, name]) => {
          const n = counts.get(score) ?? 0;
          return (
            <button
              key={score}
              type="button"
              className={`sus-nilsson__step${n ? ` has ${score > 0 ? "p" : "n"}` : ""}${
                filter === score ? " on" : ""
              }`}
              disabled={!n}
              aria-pressed={filter === score}
              onClick={() => toggleFilter(score)}
            >
              <b>{signed(score)}</b>
              <small>{name}</small>
              <span className="sus-nilsson__count">{n || ""}</span>
            </button>
          );
        })}
      </div>

      <div className="sus-nilsson__grid">
        <svg
          className="sus-nilsson__map"
          viewBox={`0 0 ${W} ${H + 4}`}
          role="img"
          aria-label="Map of interactions between our targets and other SDG targets"
        >
          <text x={LX} y={18} className="sus-nilsson__colh">
            our target
          </text>
          <text x={W - 8} y={18} textAnchor="end" className="sus-nilsson__colh">
            target it affects
          </text>

          {INTERACTIONS.map((d, i) => {
            const y1 = leftY(d.from);
            const y2 = rightY(d.to);
            const x1 = LX + NODE_W;
            const mx = (x1 + RX) / 2;
            const path = `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${RX} ${y2}`;
            const conditional = /conditional|today/.test(d.label);
            return (
              <path
                key={`link-${d.from}-${d.to}`}
                d={path}
                className={`sus-nilsson__link${visible(d) ? "" : " dim"}${
                  i === selected ? " sel" : ""
                }`}
                stroke={d.score > 0 ? "#2f7a4f" : "#b03c1b"}
                strokeWidth={d.score > 1 ? 5 : 2.6}
                strokeDasharray={conditional ? "7 5" : undefined}
              />
            );
          })}

          {INTERACTIONS.map((d, i) => {
            const y1 = leftY(d.from);
            const y2 = rightY(d.to);
            const x1 = LX + NODE_W;
            const mx = (x1 + RX) / 2;
            const path = `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${RX} ${y2}`;
            return (
              <path
                key={`hit-${d.from}-${d.to}`}
                d={path}
                className="sus-nilsson__hit"
                tabIndex={0}
                role="button"
                aria-label={`${d.from} to ${d.to}, score ${d.score}`}
                onClick={() => select(i)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    select(i);
                  }
                }}
              />
            );
          })}

          {LEFT.map(([code, label]) => (
            <g
              key={`l-${code}`}
              className={`sus-nilsson__node${usedLeft.has(`L${code}`) ? "" : " dim"}`}
            >
              <rect
                x={LX}
                y={leftY(code) - 15}
                width={NODE_W}
                height={30}
                rx={8}
              />
              <text x={LX + 10} y={leftY(code) + 4.5} className="code">
                {code}
              </text>
              <text x={LX + 52} y={leftY(code) + 4.5}>
                {label}
              </text>
            </g>
          ))}

          {RIGHT.map(([code, label]) => (
            <g
              key={`r-${code}`}
              className={`sus-nilsson__node${usedRight.has(`R${code}`) ? "" : " dim"}`}
            >
              <rect
                x={RX}
                y={rightY(code) - 15}
                width={NODE_W}
                height={30}
                rx={8}
              />
              <text x={RX + 10} y={rightY(code) + 4.5} className="code">
                {code}
              </text>
              <text x={RX + 52} y={rightY(code) + 4.5}>
                {label.length > 26 ? `${label.slice(0, 25)}…` : label}
              </text>
            </g>
          ))}
        </svg>

        <div className="sus-nilsson__detail" aria-live="polite">
          <div className="sus-nilsson__pair">
            {current.from} → {current.to}
          </div>
          <div className="sus-nilsson__names">
            {FULL[current.from]} → {FULL[current.to]}
          </div>
          <span
            className={`sus-nilsson__score ${current.score > 0 ? "p" : "n"}`}
          >
            {signed(current.score)} {current.label}
          </span>
          <div className="sus-nilsson__why">{current.why}</div>
          <div className="sus-nilsson__source">Source: {current.source}</div>
        </div>
      </div>

      <div className="sus-nilsson__list">
        {INTERACTIONS.map((d, i) => (
          <button
            key={`chip-${d.from}-${d.to}`}
            type="button"
            className={`sus-nilsson__chip ${d.score > 0 ? "p" : "n"}${
              visible(d) ? "" : " dim"
            }${i === selected ? " on" : ""}`}
            onClick={() => select(i)}
          >
            {d.from} → {d.to}
            <span className="sus-nilsson__chip-score">{signed(d.score)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
