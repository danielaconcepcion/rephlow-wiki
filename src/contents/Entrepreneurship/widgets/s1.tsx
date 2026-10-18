import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { BH, DTL, MKT, PE, RINGC, SH, SHC, SM } from "../data";
import { useModal, useUI } from "../state";
import { Html } from "../ui";
import { useInView } from "../hooks";
import { cx } from "../util";

/* =========================================================================
   Section 1 widgets — Unmet Needs and First Potential Customer
   ========================================================================= */

/* 1.1 Phosphorus chain: linear today vs removal + recovery ---------------- */

export function PChain({ children }: { children: ReactNode }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const [chain] = useUI<string>("chain");
  return (
    <div
      ref={ref}
      id="pchain"
      className={cx("pchain", seen && "run", chain === "loop" && "loop")}
    >
      {children}
    </div>
  );
}

export function ChainEnd() {
  const [chain] = useUI<string>("chain");
  return (
    <span className="pstep pstep--end" id="pchainEnd">
      {chain === "loop" ? "Recovery & valorisation" : "Waste"}
    </span>
  );
}

/* 1.2 Directive (EU) 2024/3019 timeline ---------------------------------- */

export function DirectiveTimeline() {
  const [sel, setSel] = useState(3);
  const d = DTL[sel];
  return (
    <div className="dtl" id="dtl">
      {DTL.map((x, i) => (
        <button
          type="button"
          key={x[0]}
          className={cx(x[3] ? "impl" : "", i === sel && "on")}
          onClick={() => setSel(i)}
        >
          <span className="yr">{x[0]}</span>
          <span className="nd" />
          <span className="lb">
            {x[3] ? "Implementation" : "Adoption & transposition"}
          </span>
        </button>
      ))}
      <div className={cx("panel dtl-card", !!d[3] && "dtl-card--impl")}>
        <h5>
          {d[0]} · {d[1]}
        </h5>
        <p className="small">
          <strong className="dtl-why">Why it matters to rePhlow:</strong> {d[2]}
        </p>
      </div>
    </div>
  );
}

/* 1.3 Market analysis: TAM / SAM / SOM rings ----------------------------- */

type Ring = "intro" | "TAM" | "SAM" | "SOM";
type Side = keyof typeof MKT;

export function MarketRings() {
  const [side] = useUI<Side>("mkt");
  const [ring, setRing] = useUI<Ring>("ring");
  const m = MKT[side];
  const dim = (k: Ring) => cx("ring", ring !== "intro" && ring !== k && "dim");
  return (
    <div className="mkt__rings" id="mktRings">
      <svg
        viewBox="0 0 420 250"
        role="group"
        aria-label={`${m.title} TAM SAM SOM`}
      >
        <path
          className={dim("TAM")}
          d="M10 245 A200 200 0 0 1 410 245 Z"
          fill="#bfe3e3"
          onClick={() => setRing("TAM")}
        />
        <path
          className={dim("SAM")}
          d="M75 245 A135 135 0 0 1 345 245 Z"
          fill="#7fc3c0"
          onClick={() => setRing("SAM")}
        />
        <path
          className={dim("SOM")}
          d="M138 245 A72 72 0 0 1 282 245 Z"
          fill="#c9e8b2"
          onClick={() => setRing("SOM")}
        />
        <text x="210" y="80" textAnchor="middle" fontSize="22" fontWeight="700" fill="#16504f">
          TAM
        </text>
        <text x="210" y="100" textAnchor="middle" fontSize="12" fill="#16504f">
          {m.TAM.v}
        </text>
        <text x="210" y="150" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f3f3e">
          SAM
        </text>
        <text x="210" y="168" textAnchor="middle" fontSize="11.5" fill="#0f3f3e">
          {m.SAM.v}
        </text>
        <text x="210" y="213" textAnchor="middle" fontSize="18" fontWeight="700" fill="#24502a">
          SOM
        </text>
        <text x="210" y="231" textAnchor="middle" fontSize="10.5" fill="#24502a">
          {m.SOM.v}
        </text>
      </svg>
    </div>
  );
}

export function MarketPanel() {
  const [side] = useUI<Side>("mkt");
  const [ring, setRing] = useUI<Ring>("ring");
  const ref = useRef<HTMLDivElement>(null);
  const m = MKT[side];

  // A new market side always opens on its introduction.
  useEffect(() => setRing("intro"), [side, setRing]);

  // The SOM body contains a penetration bar that fills on open.
  useEffect(() => {
    const f = ref.current?.querySelector<HTMLElement>(".pen__fill");
    if (!f) return;
    f.style.width = "0";
    const r = requestAnimationFrame(() =>
      requestAnimationFrame(() => (f.style.width = (f.dataset.w ?? "0") + "%")),
    );
    return () => cancelAnimationFrame(r);
  }, [side, ring]);

  // Hovering a term of the recovery equation explains it underneath.
  const onOver = (e: MouseEvent) => {
    const v = (e.target as Element).closest<HTMLElement>(".var");
    const t = ref.current?.querySelector("#varTxt");
    if (v && t) t.innerHTML = `<strong>${v.innerHTML}</strong>: ${v.title}`;
  };

  const [bg, bd] = RINGC[ring ?? "intro"];
  return (
    <div
      ref={ref}
      className="mkt__panel panel"
      id="mktPanel"
      style={{ background: bg, borderColor: bd, borderWidth: 2 }}
      onMouseOver={onOver}
    >
      {ring === "intro" || !ring ? (
        <>
          <h5>
            {side === "up"
              ? "1. Upstream market: phosphorus removal and recovery"
              : "2. Downstream market: from recovered phosphorus to higher-value products"}
          </h5>
          <Html html={m.intro} />
        </>
      ) : (
        <>
          <h5>
            {ring} · {m[ring].v}
          </h5>
          <p className="small muted" style={{ marginBottom: 8 }}>
            {m[ring].s}
          </p>
          <Html html={m[ring].body} />
        </>
      )}
    </div>
  );
}

/* 1.5 Stakeholder matrix (power × interest), each name opens a pop-up ---- */

type Quad = keyof typeof SH;

export function StakeholderMatrix() {
  const modal = useModal();
  const show = (k: Quad, i: number) => {
    const it = SH[k].items[i];
    const [c, bg] = SHC[k];
    const rows: [string, string][] = [
      ["Role", it[2]],
      ["Why they matter", it[3]],
      ["Skills & capabilities", it[4]],
      ["Key priorities", it[5]],
    ];
    modal.open(
      <>
        <span className="eyebrow" style={{ color: c }}>
          {SH[k].t}
        </span>
        <Html as="h3" className="modal__t" html={it[0]} />
        {it[1] && <Html as="p" className="muted small" html={it[1]} />}
        <div className="mplain">
          {rows.map(([t, v]) => (
            <div key={t}>
              <b style={{ color: c }}>{t}</b>
              <Html as="p" html={v} />
            </div>
          ))}
        </div>
        <div className="mbox" style={{ background: bg, borderColor: c + "33" }}>
          <b style={{ color: c }}>Commercial implication</b>
          <p>
            <strong>{it[6]}</strong>
          </p>
        </div>
      </>,
      c,
    );
  };
  const quads: [Quad, string][] = [
    ["ks", "q-ks"],
    ["mc", "q-mc"],
    ["mo", "q-mo"],
    ["ki", "q-ki"],
  ];
  return (
    <div className="smx" id="smx">
      <span className="ax ax-y">Power ↑</span>
      <span className="ax ax-x">Interest →</span>
      {quads.map(([k, c]) => (
        <div className={"quad " + c} key={k}>
          <h5>{SH[k].t}</h5>
          <div className="sh-list">
            {SH[k].items.map((it, i) => (
              <button type="button" className="sh" key={i} onClick={() => show(k, i)}>
                <Html as="span" html={it[0]} />
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="smx-cross">
        <span>Cross-cutting</span>
        <button
          type="button"
          className="sh"
          onClick={() => show("cc", 0)}
          dangerouslySetInnerHTML={{ __html: SH.cc.items[0][0] }}
        />
      </div>
    </div>
  );
}

/* 1.6 Beachhead decision matrix ------------------------------------------ */

const BH_COL = ["#3f9a5a", "#e2b23a", "#e67e45"];

export function BeachheadScores() {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const [f, setF] = useUI<number | null>("bh");
  return (
    <div className="bh-scores" id="bhScores" ref={ref}>
      {BH.map((b, i) => (
        <button
          type="button"
          key={b[0]}
          className={cx("bhs", i === 0 && "win")}
          onClick={() => setF(f === i + 1 ? null : i + 1)}
        >
          {i === 0 && <span className="crown">★ {b[2]}</span>}
          <b>{b[0]}</b>
          <span className="tot">
            {b[1]} <small>of 35</small>
          </span>
          <div className="bar">
            <i
              style={{
                background: BH_COL[i],
                width: seen ? `${(b[1] / 35) * 100}%` : undefined,
              }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}

/** The scoring table; clicking a segment (here or above) fades the others. */
export function BhTable({ children }: { children: ReactNode }) {
  const [f, setF] = useUI<number | null>("bh");
  const onClick = (e: MouseEvent) => {
    const th = (e.target as Element).closest<HTMLElement>("th[data-col]");
    if (!th) return;
    const c = Number(th.dataset.col);
    setF(f === c ? null : c);
  };
  return (
    <table className={cx("tbl bh", !!f && "f" + f)} id="bhTable" onClick={onClick}>
      {children}
    </table>
  );
}

/* 1.7 SMART framework ----------------------------------------------------- */

export function Smart({ more }: { more: ReactNode[] }) {
  const [sel, setSel] = useState(0);
  const s = SM[sel];
  return (
    <div className="smart" id="smart">
      {SM.map((x, i) => (
        <button
          type="button"
          key={x[1]}
          className={cx(i === sel && "on")}
          onClick={() => setSel(i)}
        >
          <b>{x[0]}</b>
          <span>{x[1]}</span>
        </button>
      ))}
      <div className="panel" key={sel}>
        <h5>
          {s[0]} — {s[1]}: what it means for rePhlow
        </h5>
        <Html as="p" html={s[2]} />
        <details className="more">
          <summary>Read more</summary>
          <div className="more-body">{more[sel]}</div>
        </details>
      </div>
    </div>
  );
}

/* 1.8 PESTEL --------------------------------------------------------------- */

export function Pestel({ more }: { more: ReactNode[] }) {
  const [sel, setSel] = useState(0);
  const p = PE[sel];
  return (
    <>
      <div className="pestel" id="pestel">
        {PE.map((x, i) => (
          <button
            type="button"
            key={x[1]}
            style={{ background: x[2] }}
            className={cx(i === sel && "on")}
            onClick={() => setSel(i)}
          >
            <b>{x[0]}</b>
            <span>{x[1]}</span>
          </button>
        ))}
      </div>
      <div
        className="panel"
        id="pestelPanel"
        key={sel}
        style={{ marginTop: 12, borderColor: p[2] }}
      >
        <h5 style={{ color: p[2] }}>{p[1]}</h5>
        <div className="grid2">
          <div>
            <span className="eyebrow" style={{ color: p[2] }}>
              External factor
            </span>
            <p className="small" style={{ marginTop: 4 }}>
              {p[3]}
            </p>
          </div>
          <div>
            <span className="eyebrow" style={{ color: p[2] }}>
              Implication for rePhlow
            </span>
            <p className="small" style={{ marginTop: 4 }}>
              <strong>{p[4]}</strong>
            </p>
          </div>
        </div>
        <details className="more" style={{ ["--c" as string]: p[2] }}>
          <summary>Read more</summary>
          <div className="more-body">{more[sel]}</div>
        </details>
      </div>
    </>
  );
}
