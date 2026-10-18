import type { ReactNode } from "react";
import { HOR, NEG, POS, SDG } from "../data";
import { useUI } from "../state";
import { Html, Icon } from "../ui";
import { cx } from "../util";

/* =========================================================================
   Section 5 widgets — Positive and Negative Impact
   ========================================================================= */

/* 5.1 SDGs as commercial drivers ------------------------------------------- */

export function Sdgs() {
  const [sel, setSel] = useUI<number>("sdg");
  return (
    <div className="sdgs" id="sdgs">
      {SDG.map((s, i) => (
        <button
          type="button"
          key={s[0]}
          className={cx("sdg", (sel ?? 0) === i && "on")}
          style={{ background: s[2] }}
          onClick={() => setSel(i)}
        >
          <b>{s[0]}</b>
          <span>{s[1]}</span>
          <em>{s[3]}</em>
        </button>
      ))}
    </div>
  );
}

export function SdgPanel() {
  const [sel] = useUI<number>("sdg");
  const s = SDG[sel ?? 0];
  // One HTML string, so the body paragraphs stay direct siblings of the
  // target line and the note (the page's p + p spacing depends on it).
  const html =
    `<span class="eyebrow" style="color:${s[2]}">SDG ${s[0]} — ${s[1]}: ${s[3]}</span>` +
    `<p class="small muted" style="margin:6px 0 10px">${s[4]}</p>${s[5]}` +
    `<p class="note" style="border-left:4px solid ${s[2]}"><strong>Commercial implication:</strong> ${s[6]}</p>`;
  return (
    <div
      className="panel"
      id="sdgPanel"
      key={s[0]}
      style={{
        marginTop: 14,
        borderColor: s[2],
        background: `color-mix(in srgb,${s[2]} 9%,#fff)`,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* LCA slider: only the two published values (≈1.5 assumed, ≈8 crossover) -- */

export function LcaInput() {
  const [v, setV] = useUI<number>("lca");
  return (
    <input
      type="range"
      min="0"
      max="12"
      step="0.5"
      value={v ?? 1.5}
      id="lcaR"
      aria-label="Phosphorus captured per gram of capsule (mg P/g)"
      onChange={(e) => setV(Number(e.target.value))}
    />
  );
}

export function LcaOut() {
  const [v0] = useUI<number>("lca");
  const v = v0 ?? 1.5;
  const below = v < 8;
  return (
    <div
      className="lca__out"
      id="lcaOut"
      style={{ background: below ? "#fbe7e4" : "#e6f4ea" }}
    >
      <strong>{v} mg P/g capsule</strong>
      {below
        ? ` — below the ~8 mg P/g crossover: the climate reading stands against rePhlow compared with the chemical route.${
            v === 1.5 ? " This is the capsule loading assumed in our preliminary LCA." : ""
          }`
        : " — above the ~8 mg P/g crossover identified by our sensitivity analysis, rePhlow overtakes the chemical route on climate impact."}
    </div>
  );
}

/* 5.2 Impact both ways ------------------------------------------------------- */

/** The balance beam tilts towards the side being shown. */
export function Beam({ children }: { children: ReactNode }) {
  const [bal] = useUI<string>("bal");
  const deg = bal === "neg" ? 8 : bal === "both" ? 0 : -8;
  return (
    <g
      id="beam"
      style={{
        transformOrigin: "200px 34px",
        transition: "transform .8s cubic-bezier(.3,1.6,.5,1)",
        transform: `rotate(${deg}deg)`,
      }}
    >
      {children}
    </g>
  );
}

const NEG_NOTE =
  "Every risk below is one we identified ourselves, through the same stakeholder conversations that shaped the rest of rePhlow, and tracked openly in our Responsibility Checkpoint. We see that as a strength rather than a weakness: none of these concerns caught us by surprise, and each one already has a concrete design response behind it. What remains, in every case, is evidence, not a change of direction.";

export function Impacts({ kind }: { kind: "pos" | "neg" }) {
  if (kind === "pos")
    return (
      <>
        {POS.map((p, i) => (
          <details
            className="imp pos"
            key={p[1]}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <summary>
              <h5>
                <Icon n={p[0]} c="#3f9a5a" /> {p[1]}
              </h5>
            </summary>
            <Html as="p" html={p[2]} />
          </details>
        ))}
      </>
    );
  return (
    <>
      {NEG.map((p, i) => (
        <details
          className="imp neg"
          key={p[1]}
          style={{ animationDelay: `${i * 0.07}s` }}
        >
          <summary>
            <h5>
              <Icon n={p[0]} c="#d24b3e" /> {p[1]}
            </h5>
          </summary>
          <Html as="p" html={p[2]} />
          {p[3] && <Html as="p" className="resp" html={`→ ${p[3]}`} />}
        </details>
      ))}
      <p className="small neg-note" style={{ gridColumn: "1/-1" }}>
        {NEG_NOTE}
      </p>
    </>
  );
}

/* Two horizons ---------------------------------------------------------------- */

export function Horizons() {
  const [k] = useUI<string>("hor");
  const x = (HOR as unknown as Record<string, readonly [string, readonly [string, string], readonly [string, string]]>)[k || "env"];
  return (
    <div id="horBox">
      <Html as="p" html={x[0]} />
      <div className="tbl-wrap">
        <table className="tbl hor">
          <thead>
            <tr>
              <th />
              <th>Short term (pilot)</th>
              <th>Long term (wide adoption)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="p">
              <td>Positive (+)</td>
              <Html as="td" html={x[1][0]} />
              <Html as="td" html={x[1][1]} />
            </tr>
            <tr className="n">
              <td>Negative (−)</td>
              <Html as="td" html={x[2][0]} />
              <Html as="td" html={x[2][1]} />
            </tr>
          </tbody>
        </table>
      </div>
      <p className="small muted">
        Source references for these tables are listed on our Sustainability page.
      </p>
    </div>
  );
}
