import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Room 01's console for the three goals we answer to.
 *
 * The deadline board puts every target we committed to on the 2030
 * Agenda's own timeline — two of them expired in 2020 and one in 2025 —
 * and a pin opens that target in the console below. The console itself is
 * one panel per goal, with its targets as chips, so a reader follows one
 * target at a time instead of scrolling past all seven.
 */

export type ConsoleTarget = {
  /** Matches the pin ids on the deadline board. */
  id: string;
  label: string;
  content: ReactNode;
};

export type ConsoleGoal = {
  id: string;
  num: string;
  title: string;
  /** The SDG's own colour, used for the number plate and the panel rule. */
  colour: string;
  lede?: ReactNode;
  targets: ConsoleTarget[];
};

/** label, goal, target, deadline year, lane, expired. */
const PINS: [string, string, string, number, number, boolean][] = [
  ["6.6", "g6", "66", 2020, 0, true],
  ["12.4", "g12", "124", 2020, 1, true],
  ["14.1", "g14", "141", 2025, 0, true],
  ["6.3", "g6", "63", 2030, 0, false],
  ["12.2", "g12", "122", 2030, 1, false],
  ["12.5", "g12", "125", 2030, 2, false],
];

const Y0 = 2015;
const Y1 = 2031;
const TODAY = 2026.8;
const at = (year: number) => `${((year - Y0) / (Y1 - Y0)) * 100}%`;

export function GoalConsole({
  goals,
  image,
}: {
  goals: ConsoleGoal[];
  /** The SDG artwork for the three goals, shown beside the tabs. */
  image: ReactNode;
}) {
  const [goalId, setGoalId] = useState(goals[0].id);
  const [targetIds, setTargetIds] = useState<Record<string, string>>(() =>
    Object.fromEntries(goals.map((g) => [g.id, g.targets[0].id])),
  );

  const goal = goals.find((g) => g.id === goalId) ?? goals[0];
  const targetId = targetIds[goal.id];
  const target = goal.targets.find((t) => t.id === targetId) ?? goal.targets[0];

  function show(nextGoal: string, nextTarget: string) {
    setGoalId(nextGoal);
    setTargetIds((prev) => ({ ...prev, [nextGoal]: nextTarget }));
  }

  return (
    <div className="sus-console-wrap">
      <div className="sus-deadlines">
        <h5 className="sus-deadlines__title">The deadline board</h5>
        <p className="sus-deadlines__lede">
          Select a target to open it in the console below.
        </p>
        <div
          className="sus-deadlines__track"
          aria-label="Target deadlines from 2015 to 2030"
        >
          <div className="sus-deadlines__axis" />
          <div className="sus-deadlines__past" style={{ width: at(TODAY) }} />
          {[2015, 2020, 2025, 2030].map((year) => (
            <div key={year}>
              <div className="sus-deadlines__tick" style={{ left: at(year) }} />
              <div className="sus-deadlines__year" style={{ left: at(year) }}>
                {year}
              </div>
            </div>
          ))}
          <div className="sus-deadlines__today" style={{ left: at(TODAY) }}>
            <span>today</span>
          </div>
          {PINS.map(([label, g, t, year, lane, expired]) => {
            const stem = 12 + lane * 34;
            return (
              <button
                key={label}
                type="button"
                className={`sus-deadlines__pin${expired ? " expired" : ""}${
                  goal.id === g && targetIds[g] === t ? " on" : ""
                }`}
                style={
                  {
                    left: at(year),
                    bottom: `${32 + stem}px`,
                    zIndex: 5 - lane,
                    "--stem": `${stem}px`,
                  } as CSSProperties
                }
                aria-label={`Target ${label}, deadline ${year}${
                  expired ? " passed" : ""
                }`}
                onClick={() => show(g, t)}
              >
                {label}
                {expired && <small>expired {year}</small>}
              </button>
            );
          })}
        </div>
        <div className="sus-deadlines__legend">
          <span>
            <i className="sus-deadlines__key expired" />
            deadline passed, target not met
          </span>
          <span>
            <i className="sus-deadlines__key" />
            open until 2030
          </span>
          <button
            type="button"
            className={`sus-deadlines__pin sus-deadlines__pin--nodate${
              goal.id === "g6" && targetIds.g6 === "6b" ? " on" : ""
            }`}
            onClick={() => show("g6", "6b")}
          >
            6.b <small>no fixed date</small>
          </button>
        </div>
      </div>

      <div className="sus-console">
        <div className="sus-console__side">
          {image}
          <div
            className="sus-console__tabs"
            role="tablist"
            aria-label="Goals we answer to"
          >
            {goals.map((g) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                id={`sus-tab-${g.id}`}
                aria-selected={g.id === goal.id}
                aria-controls={`sus-panel-${g.id}`}
                className={`sus-console__tab${g.id === goal.id ? " on" : ""}`}
                style={{ "--sdg": g.colour } as CSSProperties}
                onClick={() => show(g.id, targetIds[g.id])}
              >
                <span className="sus-console__num">{g.num}</span>
                <span>{g.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="sus-console__panel"
          role="tabpanel"
          id={`sus-panel-${goal.id}`}
          aria-labelledby={`sus-tab-${goal.id}`}
          style={{ "--sdg": goal.colour } as CSSProperties}
        >
          <div className="sus-console__head">
            <span className="sus-console__num">{goal.num}</span>
            <div>
              <h5 className="sus-console__goal-title">
                Goal {goal.num} · {goal.title}
              </h5>
              {goal.lede && <p className="sus-console__lede">{goal.lede}</p>}
            </div>
          </div>

          {goal.targets.length > 1 && (
            <div className="sus-console__chips">
              {goal.targets.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`sus-console__chip${
                    t.id === target.id ? " on" : ""
                  }`}
                  onClick={() => show(goal.id, t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          <div className="sus-console__view">{target.content}</div>
        </div>
      </div>
    </div>
  );
}

/** The four numbers the Directive sets, as the card states them. */
export function MiniReadouts({
  items,
}: {
  items: { value: string; unit?: string; key: string }[];
}) {
  return (
    <div className="sus-readouts">
      {items.map((item) => (
        <div key={item.key}>
          <div className="sus-readouts__v">
            {item.value}
            {item.unit && <small> {item.unit}</small>}
          </div>
          <div className="sus-readouts__k">{item.key}</div>
        </div>
      ))}
    </div>
  );
}

/** Ecological status of Europe's surface water bodies. */
export function EcologicalStatusBar({ caption }: { caption: ReactNode }) {
  return (
    <div className="sus-eea">
      <div
        className="sus-eea__bar"
        role="img"
        aria-label="37% of European surface water bodies in good or high ecological status, 63% below"
      >
        <span className="sus-eea__ok">37%</span>
        <span className="sus-eea__ko">63% below good status</span>
      </div>
      <div className="sus-eea__k">{caption}</div>
    </div>
  );
}

/** The distance between the limit at the pipe and the onset in the lake. */
export function ConcentrationGap() {
  const W = 640;
  const H = 150;
  const left = 20;
  const right = 20;
  const lo = -3;
  const hi = 4;
  const x = (v: number) =>
    left + ((Math.log10(v) - lo) / (hi - lo)) * (W - left - right);

  const bands: [number, number, string, string, string][] = [
    [0.01, 0.02, "0.01–0.02", "onset, in the lake", "#2f7a4f"],
    [0.5, 0.7, "0.5–0.7", "limit, at the pipe", "#1f6f7d"],
    [2000, 2580, "≈2,290", "raw effluent", "#b03c1b"],
  ];

  const ticks = [];
  for (let e = lo; e <= hi; e += 1) {
    const value = 10 ** e;
    ticks.push({
      x: x(value),
      label: e < 0 ? value.toFixed(-e) : value.toLocaleString("en-GB"),
    });
  }

  return (
    <svg
      className="sus-gap"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Phosphorus concentrations on a log scale: eutrophication onset 0.01 to 0.02 mg/L, discharge limit 0.5 to 0.7 mg/L, raw degumming effluent about 2,290 mg/L"
    >
      <defs>
        <linearGradient id="sus-gap-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#7c9a4e" />
          <stop offset=".45" stopColor="#bf7a2e" />
          <stop offset="1" stopColor="#b03c1b" />
        </linearGradient>
        <marker
          id="sus-gap-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill="#314F65" />
        </marker>
      </defs>

      <rect
        x={left}
        y={70}
        width={W - left - right}
        height={10}
        rx={5}
        fill="url(#sus-gap-grad)"
        opacity=".55"
      />

      {ticks.map((tick) => (
        <g key={tick.label}>
          <line
            x1={tick.x}
            y1={82}
            x2={tick.x}
            y2={90}
            stroke="var(--ink-soft)"
            opacity=".5"
          />
          <text
            x={tick.x}
            y={104}
            textAnchor="middle"
            className="sus-gap__tick"
          >
            {tick.label}
          </text>
        </g>
      ))}

      <text x={W / 2} y={122} textAnchor="middle" className="sus-gap__tick">
        total phosphorus, mg/L (log scale)
      </text>

      {bands.map(([a, b, label, sub, colour]) => {
        const x1 = x(a);
        const x2 = x(b);
        const cx = (x1 + x2) / 2;
        return (
          <g key={label}>
            <rect
              x={x1}
              y={62}
              width={Math.max(4, x2 - x1)}
              height={26}
              rx={4}
              fill={colour}
              opacity=".9"
            />
            <line x1={cx} y1={62} x2={cx} y2={48} stroke={colour} />
            <text
              x={cx}
              y={26}
              textAnchor="middle"
              className="sus-gap__label"
              fill={colour}
            >
              {label}
            </text>
            <text x={cx} y={42} textAnchor="middle" className="sus-gap__sub">
              {sub}
            </text>
          </g>
        );
      })}

      <path
        d={`M${x(0.02)} 140 H${x(0.5)}`}
        stroke="#314F65"
        strokeWidth="1.2"
        markerEnd="url(#sus-gap-arrow)"
        markerStart="url(#sus-gap-arrow)"
      />
      <text
        x={(x(0.02) + x(0.5)) / 2}
        y={136}
        textAnchor="middle"
        className="sus-gap__tick"
      >
        dilution happens here
      </text>
    </svg>
  );
}

/** Where each of the two teams sits on the same water chain. */
export function WaterChain() {
  return (
    <svg
      className="sus-chain"
      viewBox="0 0 640 150"
      role="img"
      aria-label="The water chain: Vinesys acts before water is used, rePhlow after a process releases it"
    >
      <defs>
        <linearGradient
          id="sus-chain-pipe"
          gradientUnits="userSpaceOnUse"
          x1="20"
          y1="0"
          x2="620"
          y2="0"
        >
          <stop offset="0" stopColor="#9CC66F" />
          <stop offset="1" stopColor="#1f6f7d" />
        </linearGradient>
      </defs>
      <path
        d="M20 86 H620"
        stroke="url(#sus-chain-pipe)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity=".55"
      />
      <rect
        x="64"
        y="20"
        width="200"
        height="112"
        rx="14"
        fill="none"
        stroke="#9CC66F"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />
      <rect
        x="376"
        y="20"
        width="200"
        height="112"
        rx="14"
        fill="none"
        stroke="#1f6f7d"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />
      <text x="164" y="40" textAnchor="middle" className="sus-chain__t">
        Vinesys perimeter
      </text>
      <text x="476" y="40" textAnchor="middle" className="sus-chain__t">
        rePhlow perimeter
      </text>
      <circle
        cx="164"
        cy="86"
        r="22"
        fill="#fff"
        stroke="#9CC66F"
        strokeWidth="2"
      />
      <text x="164" y="91" textAnchor="middle" className="sus-chain__i">
        🍇
      </text>
      <circle
        cx="320"
        cy="86"
        r="22"
        fill="#fff"
        stroke="var(--ink-soft)"
        strokeWidth="2"
      />
      <text x="320" y="91" textAnchor="middle" className="sus-chain__i">
        🏭
      </text>
      <circle
        cx="476"
        cy="86"
        r="22"
        fill="#fff"
        stroke="#1f6f7d"
        strokeWidth="2"
      />
      <text x="476" y="91" textAnchor="middle" className="sus-chain__i">
        🫧
      </text>
      <text x="164" y="124" textAnchor="middle" className="sus-chain__s">
        before use: less irrigation
      </text>
      <text x="320" y="124" textAnchor="middle" className="sus-chain__s">
        the process
      </text>
      <text x="476" y="124" textAnchor="middle" className="sus-chain__s">
        after release: P recovered
      </text>
    </svg>
  );
}
