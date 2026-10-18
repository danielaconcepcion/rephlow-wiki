import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { BMC, GC5, GTM, GX, PH, PHX, Q, RES, RK, WS, YR } from "../data";
import { useModal, useUI } from "../state";
import { Html, Icon } from "../ui";
import { useInView } from "../hooks";
import { cx, sx } from "../util";

/* =========================================================================
   Section 3 widgets — Product Development Plan
   ========================================================================= */

/* 3.1 Business Model Canvas ---------------------------------------------- */

interface BmcBlock {
  k: string;
  n: number;
  t: string;
  cls?: string;
  items: readonly (readonly [string, string])[];
  obj: string;
  full: string;
  risks: string;
  oq?: string;
}

/** Customer-group letters (A/B/C) as small coloured badges. */
const Seg = ({ s }: { s: string }) => (
  <>
    {s.split("").map((c, i) => (
      <span key={i} className={`seg seg${c}`}>
        {c}
      </span>
    ))}
  </>
);

export function Bmc() {
  const [seg] = useUI<string>("seg");
  const modal = useModal();
  const blocks = BMC as unknown as BmcBlock[];
  const open = (b: BmcBlock) =>
    modal.open(
      <>
        <span className="eyebrow" style={{ color: "var(--s3)" }}>
          Block {b.n}
        </span>
        <h3 className="modal__t">{b.t}</h3>
        <div
          className="mbox"
          style={{ background: "#eef5e6", borderColor: "#7c9a4e44" }}
        >
          <b style={{ color: "#5f7d36" }}>Objective</b>
          <Html as="p" html={b.obj} />
        </div>
        <Html className="modal__txt" html={b.full} />
        <div className="risks-tags">
          <span
            style={{ background: "none", color: "var(--ink-soft)", paddingLeft: 0 }}
          >
            Risks bearing on this block:
          </span>
          {b.risks.split(", ").map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
        {b.oq && (
          <div
            className="mbox"
            style={{
              background: "#fdf6e1",
              borderColor: "#c9962b55",
              marginTop: 12,
            }}
          >
            <b style={{ color: "#a77a12" }}>
              Open question{b.oq.split("?").length > 2 ? "s" : ""}
            </b>
            <Html as="p" html={b.oq} />
          </div>
        )}
      </>,
      "#7c9a4e",
    );
  return (
    <div className="bmc" id="bmc">
      {blocks.map((b) => (
        <button
          type="button"
          key={b.k}
          className={cx("bmc-b", b.cls)}
          style={{ gridArea: b.k }}
          data-k={b.k}
          onClick={() => open(b)}
        >
          <h5>
            <small>{b.n}</small>
            {b.t}
          </h5>
          <ul>
            {b.items.map(([s, t], i) => (
              <li
                key={i}
                data-s={s}
                className={cx(
                  seg !== "all" && s !== "" && !s.includes(seg) && "off",
                )}
              >
                <Seg s={s} /> <Html as="span" html={t} />
              </li>
            ))}
          </ul>
        </button>
      ))}
    </div>
  );
}

/* 3.2 Flip cards (Option A) ------------------------------------------------ */

export function Flip({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className={cx("flip", on && "on")}
      onClick={() => setOn(!on)}
    >
      {children}
    </button>
  );
}

/* 3.3 Go-to-market roadmap ------------------------------------------------- */

interface GtmStage {
  n: string;
  k: string;
  s: string;
  when: string;
  sub: string;
  body: string;
  lt?: string;
  list?: readonly string[];
  after?: string;
  ms: string;
}

export function Gtm() {
  const [open, setOpen] = useState<number | null>(null);
  const stages = GTM as unknown as GtmStage[];
  const g = open === null ? null : stages[open];
  return (
    <>
      <div className="gtm2" id="gtm2">
        <div className="gtm2__line" />
        {stages.map((s, i) => (
          <div className="gcol" key={s.k} style={sx({ "--gc": GC5[i] })}>
            <span className="gcol__n">{i + 1}</span>
            <b className="gcol__k">{s.k}</b>
            <span className="gcol__s">{s.s}</span>
            <span className="gcol__w">{s.when}</span>
            <div className="gcol__ms">
              <small>Milestone</small>
              <Html as="span" html={s.ms} />
            </div>
            <button
              type="button"
              className={cx("gcol__more", open === i && "on")}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {open === i ? "Close −" : "Read more +"}
            </button>
          </div>
        ))}
      </div>
      <div id="gtmMore">
        {g && open !== null && (
          <div className="gtm-more" style={sx({ "--gc": GC5[open] })}>
            <span className="eyebrow" style={{ color: GC5[open] }}>
              {g.n} — {g.k}
            </span>
            <h5 style={{ marginTop: 4 }}>{g.s}</h5>
            <p className="small muted">
              <strong>{g.when}</strong> | {g.sub}
            </p>
            <Html html={g.body} />
            {g.list && (
              <>
                <h5 style={{ fontSize: ".9rem" }}>{g.lt}</h5>
                <ul className="clean">
                  {g.list.map((x, i) => (
                    <Html as="li" key={i} html={x} />
                  ))}
                </ul>
              </>
            )}
            {g.after && <Html html={g.after} />}
          </div>
        )}
      </div>
    </>
  );
}

/** "The reference effect": the chain lights up step by step once visible. */
const REFX = [
  "Industrial pilot",
  "Performance data",
  "Reduced customer risk",
  "Next installation",
  "More operational evidence",
  "Scaled adoption",
];
export function RefX() {
  const [ref, seen] = useInView<HTMLDivElement>(0.6);
  const [lit, setLit] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const t = setInterval(
      () =>
        setLit((n) => {
          if (n >= REFX.length) clearInterval(t);
          return Math.min(n + 1, REFX.length);
        }),
      450,
    );
    return () => clearInterval(t);
  }, [seen]);
  return (
    <div className="refx" id="refx" ref={ref}>
      {REFX.map((x, i) => (
        <Fragment key={x}>
          {i > 0 && <i>→</i>}
          <span className={cx(i < lit && "lit")}>{x}</span>
        </Fragment>
      ))}
    </div>
  );
}

/* 3.4 Risk register -------------------------------------------------------- */

type RiskRow = readonly [string, string, number, number, number, number, string];
const risks = RK as unknown as RiskRow[];
const residual = RES as unknown as Record<string, readonly [number, number]>;

const band = (v: number): [string, string, string] =>
  v >= 15
    ? ["Critical", "b-crit", "#9e2a2b"]
    : v >= 10
      ? ["High", "b-high", "#e8836f"]
      : v >= 5
        ? ["Medium", "b-med", "#f1cf6b"]
        : ["Low", "b-low", "#9fd3ac"];
const cellBg = (v: number) =>
  v >= 15 ? "#f6d5d3" : v >= 10 ? "#fbe2dc" : v >= 5 ? "#fdf3dc" : "#e6f4ea";

export function RiskMatrix() {
  const [view] = useUI<string>("rk");
  const [sel, setSel] = useUI<number>("rsel");
  if (view === "cmp")
    return (
      <div className="rmx" id="rmx" style={{ display: "block" }}>
        <div className="dumb">
          {risks.map((r, i) => (
            <button
              type="button"
              key={r[0]}
              className={cx("dmb", i === sel && "on")}
              title={r[1]}
              onClick={() => setSel(i)}
              onMouseEnter={() => setSel(i)}
            >
              <span className="dmb__id">{r[0]}</span>
              <span className="dmb__tr">
                <i
                  className="dmb__line"
                  style={{
                    left: `${(r[5] / 25) * 100}%`,
                    width: `${((r[4] - r[5]) / 25) * 100}%`,
                  }}
                />
                <i
                  className="dmb__a"
                  style={{ left: `${(r[5] / 25) * 100}%`, background: band(r[5])[2] }}
                />
                <i
                  className="dmb__b"
                  style={{ left: `${(r[4] / 25) * 100}%`, background: band(r[4])[2] }}
                />
              </span>
              <span className="dmb__v">
                {r[4]}→{r[5]}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  const cells: ReactNode[] = [];
  for (let L = 5; L >= 1; L--) {
    cells.push(
      <div className="lab" key={`l${L}`}>
        {L}
      </div>,
    );
    for (let I = 1; I <= 5; I++)
      cells.push(
        <div className="cell" key={`${L}-${I}`} style={{ background: cellBg(L * I) }}>
          {risks.map((r, i) => {
            const [rl, ri] = view === "after" ? residual[r[0]] : [r[2], r[3]];
            if (rl !== L || ri !== I) return null;
            return (
              <button
                type="button"
                key={r[0]}
                className={cx("rdot", i === sel && "on")}
                title={r[1]}
                onClick={() => setSel(i)}
                onMouseEnter={() => setSel(i)}
              >
                {r[0]}
              </button>
            );
          })}
        </div>,
      );
  }
  cells.push(<div key="corner" />);
  for (let I = 1; I <= 5; I++)
    cells.push(
      <div className="lab" key={`i${I}`}>
        {I}
      </div>,
    );
  return (
    <div className="rmx" id="rmx" style={{ display: "grid" }}>
      {cells}
    </div>
  );
}

export function RiskCaption() {
  const [view] = useUI<string>("rk");
  return (
    <p className="small muted center" style={{ marginTop: 6 }} id="rmxCap">
      {view === "cmp"
        ? "Exposure before → after treatment (0–25)"
        : "Likelihood (rows) × impact (columns)"}
    </p>
  );
}

export function RiskInfo() {
  const [sel, setSel] = useUI<number>("rsel");
  const r = risks[sel ?? 0];
  const b1 = band(r[4]);
  const b2 = band(r[5]);
  const [rl, ri] = residual[r[0]];
  return (
    <div className="riskx__info panel" id="rmxInfo">
      <span className="eyebrow">{r[0]}</span>
      <h5 style={{ marginTop: 4 }}>{r[1]}</h5>
      <div className="rk-ba">
        <div>
          <small>Before treatment</small>
          <span>
            L <b>{r[2]}</b> × I <b>{r[3]}</b>
          </span>
          <span className={`badge ${b1[1]}`}>
            {r[4]} {b1[0]}
          </span>
        </div>
        <i>→</i>
        <div>
          <small>After treatment</small>
          <span>
            L <b>{rl}</b> × I <b>{ri}</b>
          </span>
          <span className={`badge ${b2[1]}`}>
            {r[5]} {b2[0]}
          </span>
        </div>
      </div>
      <p className="small">
        <strong>Mitigation:</strong> {r[6]}
      </p>
      <div className="rk-list">
        {risks.map((x, j) => (
          <button
            type="button"
            key={x[0]}
            className={cx("rk-chip", j === sel && "on")}
            style={{ borderColor: band(x[4])[2] }}
            onClick={() => setSel(j)}
          >
            {x[0]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* 3.5 Gantt chart ----------------------------------------------------------- */

/** [workstream, id, label, first quarter, last quarter, gate?, linked risk?] */
type GxRow = readonly [string, string, string, number, number, number?, string?];
const rows = GX as unknown as GxRow[];
const streams = WS as unknown as Record<string, readonly [string, string]>;
const phases = PHX as unknown as (readonly [string, number, number, string])[];

const qLabel = (i: number) => `${Q[i]} ${2025 + Math.floor((i + 2) / 4)}`;
const phaseOf = (a: number, b: number) =>
  phases
    .filter((p) => !(b < p[1] || a > p[2]))
    .map((p) => p[0].split(" · ")[0])
    .join(", ");

export function GanttControls() {
  const [ws, setWs] = useUI<string>("gxWs");
  const [gate, setGate] = useUI<boolean>("gxGate");
  const [, setSel] = useUI<string | null>("gxSel");
  const [, setFold] = useUI<string[]>("gxFold");
  return (
    <div className="gx-ctrl" id="gxCtrl">
      <span
        className="small muted"
        style={{ alignSelf: "center", marginRight: 4 }}
      >
        Workstreams
      </span>
      {Object.keys(streams).map((w) => (
        <button
          type="button"
          key={w}
          className={cx("btn", ws === w && "on")}
          onClick={() => setWs(ws === w ? "all" : w)}
        >
          <i style={{ background: streams[w][1] }} />
          {streams[w][0]}
        </button>
      ))}
      <button
        type="button"
        className={cx("btn", gate && "on")}
        onClick={() => setGate(!gate)}
      >
        ◆ Gate packages only
      </button>
      <button
        type="button"
        className="btn"
        onClick={() => {
          setWs("all");
          setGate(false);
          setSel(null);
          setFold([]);
        }}
      >
        Reset
      </button>
    </div>
  );
}

interface Tip {
  id: string;
  left: number;
  top: number;
  flip: boolean;
}

export function Gantt() {
  const [ws] = useUI<string>("gxWs");
  const [gate] = useUI<boolean>("gxGate");
  const [sel, setSel] = useUI<string | null>("gxSel");
  const [fold, setFold] = useUI<string[]>("gxFold");
  const [tip, setTip] = useState<Tip | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const tipEl = useRef<HTMLDivElement>(null);
  const folded = fold ?? [];

  // Place the bubble beside the bar (or below it when there is no room).
  const show = (id: string) => {
    const bar = grid.current?.querySelector<HTMLElement>(
      `.tr[data-id="${id}"] .bar`,
    );
    if (!bar) return;
    const r = bar.getBoundingClientRect();
    const tw = 270;
    const th = tipEl.current?.offsetHeight || 120;
    let left = r.right + 12;
    let top = r.top + r.height / 2 - th / 2;
    let flip = false;
    if (left + tw > innerWidth - 8) {
      left = r.left - 12 - tw;
      flip = true;
    }
    if (left < 8) {
      left = Math.max(8, Math.min(innerWidth - tw - 8, r.left));
      top = r.bottom + 10;
    }
    setTip({ id, left, top, flip });
  };

  // Re-centre once the bubble knows its real height.
  useEffect(() => {
    if (tip && tipEl.current) {
      const th = tipEl.current.offsetHeight;
      const bar = grid.current?.querySelector<HTMLElement>(
        `.tr[data-id="${tip.id}"] .bar`,
      );
      if (!bar) return;
      const r = bar.getBoundingClientRect();
      const want = r.top + r.height / 2 - th / 2;
      if (Math.abs(want - tip.top) > 2 && tip.left !== r.left)
        setTip({ ...tip, top: want });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tip?.id]);

  // Clicking outside the chart clears the selection; scrolling hides a
  // hover-only bubble.
  useEffect(() => {
    const onDoc = (e: Event) => {
      if (!(e.target as Element).closest?.("#gx")) {
        setSel(null);
        setTip(null);
      }
    };
    const onScroll = () => {
      if (!sel) setTip(null);
      else show(sel);
    };
    document.addEventListener("click", onDoc);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onDoc);
      removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel]);

  const toggleFold = (w: string) => {
    setTip(null);
    setFold(folded.includes(w) ? folded.filter((x) => x !== w) : [...folded, w]);
  };

  const cells: ReactNode[] = [
    <div className="h" key="h" style={{ textAlign: "left", paddingLeft: 10 }}>
      Work package
    </div>,
    ...Q.map((q, i) => (
      <div className={cx("h", !!YR[i] && "yr")} key={`q${i}`}>
        {q}
        {YR[i] && (
          <>
            <br />
            {YR[i]}
          </>
        )}
      </div>
    )),
    <div
      className="nm"
      key="ph"
      style={{ gridRow: 2, fontWeight: 700, color: "var(--ink-soft)", cursor: "default" }}
    >
      Phase
    </div>,
    ...phases.map((p) => (
      <div
        className="gph"
        key={p[0]}
        style={{ gridColumn: `${p[1] + 2}/${p[2] + 3}`, background: p[3] }}
        title={p[0]}
      >
        {p[0]}
      </div>
    )),
  ];
  let row = 3;
  Object.keys(streams).forEach((w) => {
    const items = rows.filter((x) => x[0] === w);
    const fo = folded.includes(w);
    cells.push(
      <div
        key={`ws-${w}`}
        className={cx("ws ws-t", fo && "folded")}
        style={{ gridRow: row++ }}
        role="button"
        tabIndex={0}
        aria-expanded={!fo}
        onClick={() => toggleFold(w)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFold(w);
          }
        }}
      >
        <i style={{ background: streams[w][1] }} />
        {streams[w][0]}
        <span className="ws-n">{items.length} packages</span>
        <span className="ws-chev">▾</span>
      </div>,
    );
    if (fo) return;
    items.forEach((x) => {
      const dim = (ws !== "all" && ws !== w) || (gate && !x[5]);
      const cls = cx(dim && "dimmed", sel === x[1] && "row-on");
      const ev = {
        "data-id": x[1],
        onClick: () => {
          setSel(x[1]);
          show(x[1]);
        },
        onMouseEnter: () => show(x[1]),
        onMouseLeave: () => {
          if (sel !== x[1]) setTip(sel ? tip : null);
        },
      };
      cells.push(
        <div key={`n-${x[1]}`} className={cx("nm", cls)} style={{ gridRow: row }} {...ev}>
          <b>{x[1]}</b>
          {x[2]}
          {x[5] ? <span style={{ color: "#d24b3e" }}> ◆</span> : null}
        </div>,
        <div
          key={`t-${x[1]}`}
          className={cx("tr", cls)}
          style={{ gridRow: row, gridColumn: `${x[3] + 2}/${x[4] + 3}` }}
          {...ev}
        >
          <span
            className={cx("bar", !!x[5] && "gate")}
            style={{
              background: streams[w][1],
              animationDelay: `${(x[3] * 0.04).toFixed(2)}s`,
            }}
          />
        </div>,
      );
      row++;
    });
  });

  const t = tip && rows.find((r) => r[1] === tip.id);
  const tw = t && streams[t[0]];
  return (
    <>
      <div className="gx" id="gx" ref={grid}>
        {cells}
      </div>
      <div
        ref={tipEl}
        className={cx("gtip", !!t && "on", tip?.flip && "l")}
        role="tooltip"
        style={
          {
            position: "fixed",
            left: tip?.left ?? 0,
            top: tip?.top ?? 0,
            "--tc": tw ? tw[1] : "#ccc",
          } as CSSProperties
        }
      >
        {t && tw && (
          <>
            <span className="eyebrow" style={{ color: tw[1] }}>
              {tw[0]}
            </span>
            <b>
              {t[1]} · {t[2]}
            </b>
            <span>
              <em>Window</em> {qLabel(t[3])}
              {t[4] !== t[3] ? " – " + qLabel(t[4]) : ""} ({t[4] - t[3] + 1} quarter
              {t[4] > t[3] ? "s" : ""})
            </span>
            <span>
              <em>Phase</em> {phaseOf(t[3], t[4])}
            </span>
            {t[5] ? (
              <span className="gt-gate">
                ◆ A phase gate depends on this result.
                {t[6] && (
                  <>
                    {" "}
                    Linked risk: <strong>{t[6]}</strong>.
                  </>
                )}
              </span>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

/* Phase cards ---------------------------------------------------------------- */

interface Phase {
  t: string;
  w: string;
  a: string;
  g: string;
  f: string;
  s: string;
  p: string;
}

export function PhasePanel({ more }: { more: ReactNode[] }) {
  const [ph] = useUI<string>("ph");
  const n = String(ph || "1");
  const p = (PH as unknown as Record<string, Phase>)[n];
  return (
    <div className="panel" id="phPanel" key={n}>
      <h5>{p.t}</h5>
      <p className="small muted">{p.w}</p>
      <p style={{ marginTop: 8 }}>
        <strong>What we want to achieve:</strong> <Html as="span" html={p.a} />
      </p>
      <div className="res3">
        <div className="card">
          <Icon n="euro" c="#c9962b" />
          <h5>Funding</h5>
          <Html as="p" html={p.f} />
        </div>
        <div className="card">
          <Icon n="building" c="#2E7D86" />
          <h5>Space</h5>
          <Html as="p" html={p.s} />
        </div>
        <div className="card">
          <Icon n="users" c="#6e5a96" />
          <h5>People</h5>
          <Html as="p" html={p.p} />
        </div>
      </div>
      <div className="gate-box">
        <b>◆ Gate that must be passed before the next phase</b>
        <p className="small" style={{ marginTop: 4 }}>
          <Html as="span" html={p.g} />
        </p>
      </div>
      <details className="more">
        <summary>Read more: Phase {n} in detail</summary>
        <div className="more-body">{more[Number(n) - 1]}</div>
      </details>
    </div>
  );
}
