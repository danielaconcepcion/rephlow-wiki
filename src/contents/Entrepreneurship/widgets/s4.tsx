import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { AD, AW, EV, PR, RC, RCC, RL, SK, SW, SWC } from "../data";
import { useUI } from "../state";
import { Carousel, Html } from "../ui";
import { useInView } from "../hooks";
import { cx, logo, photo, sx } from "../util";

/* =========================================================================
   Section 4 widgets — Skills, Capabilities and Stakeholders
   ========================================================================= */

/* 4.1 From eight to eleven ------------------------------------------------- */

/** How many of the three recruits have "arrived" (shared by dots + counter). */
function useArrivals() {
  const [n] = useUI<number>("tgN");
  return n ?? 0;
}

export function TeamDots() {
  const [ref, seen] = useInView<HTMLDivElement>(0.5);
  const [, setN] = useUI<number>("tgN");
  useEffect(() => {
    if (!seen) return;
    const t = [0, 1, 2].map((i) => setTimeout(() => setN(i + 1), 600 + i * 600));
    return () => t.forEach(clearTimeout);
  }, [seen, setN]);
  const n = useArrivals();
  return (
    <div className="tg__dots" id="tgDots" ref={ref}>
      {Array.from({ length: 11 }, (_, i) => {
        const c = i >= 8 ? RCC[i - 8] : null;
        return (
          <span
            key={i}
            className={cx(c && "new", c && i - 8 < n && "in")}
            style={c ? { background: c, boxShadow: `0 0 0 4px ${c}33` } : undefined}
          />
        );
      })}
    </div>
  );
}

export function TeamNum() {
  const n = useArrivals();
  return <b id="tgNum">{8 + n}</b>;
}

export function RecruitPanel() {
  const [rc] = useUI<string>("rc");
  const i = Number(rc ?? 0);
  const r = RC[i];
  return (
    <div
      className="panel"
      id="rcPanel"
      key={i}
      style={sx({ marginTop: "12px", "--c": RCC[i] })}
    >
      <h5 style={{ color: RCC[i] }}>{r[0]}</h5>
      <p>{r[1]}</p>
    </div>
  );
}

/* Skill gap list ------------------------------------------------------------- */

export function Skills() {
  const [f] = useUI<string>("sk");
  const [open, setOpen] = useState<number[]>([]);
  const labels = RL as unknown as Record<string, readonly [string, string]>;
  return (
    <div className="skills" id="skills">
      {SK.map((s, i) => (
        <div
          key={s[0]}
          className={cx("sk", open.includes(i) && "open")}
          data-r={s[1]}
          hidden={f !== "all" && f != null && s[1] !== f}
        >
          <button
            type="button"
            onClick={() =>
              setOpen(open.includes(i) ? open.filter((x) => x !== i) : [...open, i])
            }
          >
            <span className="nm">{s[0]}</span>
            <span className="meter">
              <i />
              <i />
              <i />
            </span>
            <span className={`badge ${labels[s[1]][1]}`}>{labels[s[1]][0]}</span>
          </button>
          <div className="body">
            <div>
              <b>Gap identified</b>
              <Html as="span" html={s[2]} />
            </div>
            <div>
              <b>Strategy to close it</b>
              <Html as="span" html={s[3]} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Advisory network ------------------------------------------------------------ */

const ENT_COL = "#c9962b";

export function AdvNet() {
  const [sel, setSel] = useUI<number>("adv");
  return (
    <div className="advnet" id="advnet">
      <svg viewBox="0 0 600 345" role="group" aria-label="Advisory network">
        {AD.map((a) => (
          <line
            key={`l-${a[0]}`}
            x1="300"
            y1="160"
            x2={a[4]}
            y2={a[5]}
            stroke="#d6dee7"
            strokeWidth="2"
            strokeDasharray="4 5"
          />
        ))}
        <circle cx="300" cy="160" r="46" fill="#6E8F3E" />
        <text
          x="300"
          y="157"
          textAnchor="middle"
          fill="#fff"
          fontWeight="700"
          fontSize="15"
          style={{ fontFamily: "Space Grotesk" }}
        >
          rePhlow
        </text>
        <text x="300" y="175" textAnchor="middle" fill="#e3eed6" fontSize="11">
          team of 11
        </text>
        {AD.map((a, i) => (
          <g
            key={a[0]}
            className={cx("node", (sel ?? 0) === i && "on")}
            onClick={() => setSel(i)}
            role="button"
            tabIndex={0}
            aria-label={a[0]}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSel(i);
              }
            }}
          >
            <circle cx={a[4]} cy={a[5]} r="26" fill="#fff" stroke={a[6]} strokeWidth="3" />
            <g
              transform={`translate(${a[4] - 11} ${a[5] - 11}) scale(.92)`}
              fill="none"
              stroke={a[6]}
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {a[6] === ENT_COL ? (
                <>
                  <path d="M2 9l10-5 10 5-10 5z" />
                  <path d="M6 11v5c3 2 9 2 12 0v-5" />
                </>
              ) : (
                <>
                  <path d="M6 21h12M9 17h6M12 17v-4" />
                  <path d="M9 4l4 2-3 6-4-2z" />
                  <path d="M14 9a5 5 0 0 1-2 8" />
                </>
              )}
            </g>
            <text x={a[4]} y={a[5] + 42} textAnchor="middle" fontWeight="600" fontSize="12.5">
              {a[7]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function AdvPanel() {
  const [sel] = useUI<number>("adv");
  const a = AD[sel ?? 0];
  return (
    <div className="panel" id="advPanel" key={a[0]} style={sx({ "--c": a[6] })}>
      <span className="eyebrow">{a[2]}</span>
      <h5 style={{ marginTop: 4 }}>
        {a[0]}
        {a[1] && <span className="muted small"> — {a[1]}</span>}
      </h5>
      <Html as="p" html={a[3]} />
    </div>
  );
}

/* 4.2 Awards ---------------------------------------------------------------- */

interface Award {
  lg?: string;
  lg2?: string;
  t: string;
  x: string;
  ph?: readonly [number, string];
  m?: readonly Award[];
}

const Logo = ({ n }: { n: string }) => (
  <img className={`aw-logo aw-logo--${n}`} src={logo(n)} alt="" />
);

export function Awards() {
  const years = AW as unknown as [string, Award[]][];
  return (
    <div className="aw" id="aw">
      {years.map(([y, items]) => (
        <AwardYear key={y} y={y} items={items} />
      ))}
    </div>
  );
}

function AwardYear({ y, items }: { y: string; items: Award[] }) {
  return (
    <>
      <div className="aw-yr">{y}</div>
      {items.map((a) => (
        <details className="aw-it" key={a.t}>
          <summary>
            {a.lg && (
              <span className="aw-lw">
                <Logo n={a.lg} />
                {a.lg2 && <Logo n={a.lg2} />}
              </span>
            )}
            <span className="t">{a.t}</span>
          </summary>
          <div className="in">
            <div className={cx("aw-row", !a.ph && "aw-row--solo")}>
              <div>
                <Html as="p" html={a.x} />
              </div>
              {a.ph && (
                <img className="aw-ph" src={photo(a.ph[0])} alt={a.ph[1]} loading="lazy" />
              )}
            </div>
            {a.m && (
              <div className="aw-ms">
                {a.m.map((mm) => (
                  <div className="aw-m" key={mm.t}>
                    <div>
                      <h5>
                        {mm.lg && <Logo n={mm.lg} />}
                        {mm.t}
                      </h5>
                      <Html as="p" html={mm.x} />
                    </div>
                    {mm.ph && (
                      <img
                        className="aw-ph"
                        src={photo(mm.ph[0])}
                        alt={mm.ph[1]}
                        loading="lazy"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </details>
      ))}
    </>
  );
}

/* Training programmes ---------------------------------------------------------- */

/** [date, label, track, who, driving question, input, response, why-label,
 *  why, learned, changed, next, isEvent, photos] */
type Sess = readonly [
  string, string, string, string, string, string, string,
  string, string, string, string, string, number,
  readonly (readonly [number, string])[] | null,
];
interface Prog {
  lg: string;
  name: string;
  intro: string;
  more?: string;
  tag: string;
  extra: string;
  s: readonly Sess[];
}

const Chevron = ({ d }: { d: string }) => (
  <svg viewBox="0 0 10 16">
    <path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Program() {
  const [k] = useUI<string>("pr");
  const key = k || "fab";
  const p = (PR as unknown as Record<string, Prog>)[key];
  const [i, setI] = useState(0);
  const tl = useRef<HTMLDivElement>(null);
  useEffect(() => setI(0), [key]);
  const s = p.s[i] ?? p.s[0];
  const go = (n: number) => {
    setI(n);
    const btn = tl.current?.querySelectorAll("button").item(n);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };
  return (
    <div className="prog" id="prog">
      <div className="prog-intro">
        <Html as="p" html={p.intro} />
        {p.more && (
          <p style={{ marginTop: 10 }}>
            <Html as="span" html={p.more} />
          </p>
        )}
        {p.tag && <Html as="p" className="tagline" html={p.tag} />}
        {p.extra && <Html html={p.extra} />}
      </div>
      <div className="tl" id="tl" ref={tl}>
        {p.s.map((x, j) => (
          <button
            type="button"
            key={`${key}-${j}`}
            className={cx(x[12] ? "ev" : "", j === i && "on")}
            onClick={() => setI(j)}
          >
            <span className="w">{x[0].split(" · ")[0]}</span>
            <span className="d" />
            <Html as="span" className="s" html={x[1]} />
          </button>
        ))}
      </div>
      <div id="sess">
        <div className="sess" key={`${key}-${i}`}>
          <div className="meta">
            <span>{s[0]}</span>
            <Html as="span" html={`Track: ${s[2]}`} />
          </div>
          <Html as="h5" html={s[1]} />
          <Html
            as="p"
            className="who"
            html={s[3].startsWith("Event") ? s[3] : "Stakeholder: " + s[3]}
          />
          <div className="cdq">
            <small>Core driving question</small>
            <Html as="span" html={s[4]} />
          </div>
          <div className="io">
            <div className="i">
              <b>Input</b>
              <Html as="span" html={s[5]} />
            </div>
            <div className="arr">→</div>
            <div className="o">
              <b>Response</b>
              <Html as="span" html={s[6]} />
            </div>
          </div>
          <details className="more">
            <summary>Read more</summary>
            <div className="more-body">
              <h5>{s[7]}</h5>
              <Html as="p" html={s[8]} />
              <h5>{s[12] ? "What we learned" : "What we learned from this session"}</h5>
              <Html as="p" html={s[9]} />
              <h5>What changed in rePhlow</h5>
              <Html as="p" html={s[10]} />
              <h5>What this opened next</h5>
              <Html as="p" html={s[11]} />
            </div>
          </details>
          <Carousel photos={s[13]} />
          {i > 0 && (
            <button
              type="button"
              className="sess-arr sess-arr--l"
              aria-label="Previous session"
              onClick={() => go(i - 1)}
            >
              <Chevron d="M8 2 2 8l6 6" />
            </button>
          )}
          {i < p.s.length - 1 && (
            <button
              type="button"
              className="sess-arr sess-arr--r"
              aria-label="Next session"
              onClick={() => go(i + 1)}
            >
              <Chevron d="M2 2l6 6-6 6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Events ------------------------------------------------------------------------ */

export function Events() {
  return (
    <div className="evs" id="evs">
      {EV.map((e) => {
        const ph = e[3] as readonly number[];
        const alt = e[1].replace(/<[^>]+>/g, "");
        return (
          <details className="ev-it" key={e[1]}>
            <summary>
              <span className="dt">{e[0]}</span>
              <Html as="span" className="t" html={e[1]} />
            </summary>
            <div className="in">
              {ph.length === 1 ? (
                <div className="ev-solo">
                  <Html as="p" className="small" html={e[2]} />
                  <img className="ev-solo__img" src={photo(ph[0])} alt={alt} loading="lazy" />
                </div>
              ) : (
                <>
                  <Html as="p" className="small" html={e[2]} />
                  <Carousel photos={ph.map((n) => [n, alt] as const)} />
                </>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}

/* 4.3 SWOT, with a side bubble on hover / click (like the Gantt) ------------------ */

type SwKey = keyof typeof SW;
interface SwTip {
  k: SwKey;
  i: number;
  left: number;
  top: number;
  side: "r" | "l" | "b";
}

export function Swot() {
  const [tip, setTip] = useState<SwTip | null>(null);
  const [pin, setPin] = useState<string | null>(null);
  const tipEl = useRef<HTMLDivElement>(null);
  const btns = useRef<Record<string, HTMLButtonElement | null>>({});
  const cols = SWC as unknown as Record<string, string>;

  const place = (k: SwKey, i: number) => {
    const b = btns.current[`${k}-${i}`];
    if (!b) return;
    const r = b.getBoundingClientRect();
    const tw = tipEl.current?.offsetWidth || Math.min(360, innerWidth - 16);
    const th = tipEl.current?.offsetHeight || 140;
    const right = k === "s" || k === "o";
    let left = right ? r.right + 12 : r.left - 12 - tw;
    let side: SwTip["side"] = right ? "r" : "l";
    let top = r.top + r.height / 2 - th / 2;
    if (left < 8 || left + tw > innerWidth - 8) {
      left = Math.max(8, Math.min(innerWidth - tw - 8, r.left));
      side = "b";
      top = r.bottom + 10;
    } else top = Math.max(8, Math.min(innerHeight - th - 8, top));
    setTip({ k, i, left, top, side });
  };

  useEffect(() => {
    const onDoc = (e: Event) => {
      if (!(e.target as Element).closest?.(".sw-b")) {
        setPin(null);
        setTip(null);
      }
    };
    const onScroll = () => {
      if (pin) {
        const [k, i] = pin.split("-");
        place(k as SwKey, Number(i));
      } else setTip(null);
    };
    document.addEventListener("click", onDoc);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onDoc);
      removeEventListener("scroll", onScroll);
    };
  }, [pin]);

  const x = tip && SW[tip.k][2][tip.i];
  return (
    <>
      <div className="swot" id="swot">
        {(Object.keys(SW) as SwKey[]).map((k) => (
          <div className={`sw sw-${k}`} key={k}>
            <h5>
              <b>{SW[k][1]}</b>
              {SW[k][0].toUpperCase()}
            </h5>
            <ul>
              {SW[k][2].map((it, i) => {
                const id = `${k}-${i}`;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      ref={(el) => {
                        btns.current[id] = el;
                      }}
                      className={cx("sw-b", tip?.k === k && tip.i === i && "on")}
                      onMouseEnter={() => place(k, i)}
                      onMouseLeave={() => {
                        if (pin === id) return;
                        if (pin) {
                          const [pk, pi] = pin.split("-");
                          place(pk as SwKey, Number(pi));
                        } else setTip(null);
                      }}
                      onClick={() => {
                        if (pin === id) {
                          setPin(null);
                          setTip(null);
                        } else {
                          setPin(id);
                          place(k, i);
                        }
                      }}
                    >
                      <Html as="span" html={it[1]} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div
        ref={tipEl}
        role="tooltip"
        className={cx(
          "gtip swtip",
          !!x && "on",
          tip?.side === "l" && "l",
          tip?.side === "b" && "b",
        )}
        style={
          {
            position: "fixed",
            left: tip?.left ?? 0,
            top: tip?.top ?? 0,
            "--tc": tip ? cols[tip.k] : "#ccc",
          } as CSSProperties
        }
      >
        {x && tip && (
          <>
            <span className="eyebrow" style={{ color: cols[tip.k] }}>
              {SW[tip.k][0]}
            </span>
            <Html as="b" html={x[0]} />
            <Html as="span" html={x[2]} />
          </>
        )}
      </div>
    </>
  );
}

