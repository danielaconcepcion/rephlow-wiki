import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { GC, MB, STAGES } from "../data";
import { useUI } from "../state";
import { Html, TabBtn } from "../ui";
import { cx } from "../util";

/* =========================================================================
   Section 2 widgets — Scalable, Possible and Inventive Solution
   ========================================================================= */

/* 2.1 Four integrated stages over the bioreactor drawing ------------------ */

/** Wraps the drawing + stage list; cycles through the stages until the
 * reader picks one. */
export function Stages({ children }: { children: ReactNode }) {
  const [st, setSt] = useUI<string>("st");
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const cur = Number(st) || 1;

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      const el = ref.current;
      if (el && el.getBoundingClientRect().top < window.innerHeight)
        setSt(String((cur % 4) + 1));
    }, 4200);
    return () => clearInterval(t);
  }, [auto, cur, setSt]);

  return (
    <div
      className="stages"
      id="stages"
      ref={ref}
      data-on={cur}
      onClickCapture={(e) => {
        if ((e.target as Element).closest(".stg,.hot")) setAuto(false);
      }}
    >
      {children}
      <div className="panel stg-text" style={{ ["--c" as string]: "var(--s2)" }}>
        <h5>{STAGES[cur - 1][0]}</h5>
        <Html as="p" html={STAGES[cur - 1][1]} />
      </div>
    </div>
  );
}

export function StageList() {
  return (
    <div className="stages__list">
      {STAGES.map(([t, txt], i) => (
        <TabBtn k="st" v={String(i + 1)} className="stg" key={t}>
          <b>{t}</b>
          <Html as="span" html={txt} />
        </TabBtn>
      ))}
    </div>
  );
}

/* 2.2 Mass balance terms --------------------------------------------------- */

export function MbText() {
  const [mb] = useUI<keyof typeof MB | null>("mb");
  return mb ? (
    <p
      className="small muted center"
      id="mbTxt"
      dangerouslySetInnerHTML={{ __html: MB[mb] }}
    />
  ) : (
    <p className="small muted center" id="mbTxt">
      Hover or tap a term
    </p>
  );
}

/* 2.3 Comparison table: "highlight where each alternative falls short" ---- */

export function CmpTable({ children }: { children: ReactNode }) {
  const [short] = useUI<boolean>("cmp");
  return (
    <table className={cx("tbl comp", short && "short")} id="cmpTable">
      {children}
    </table>
  );
}

/* 2.5 Golden circle -------------------------------------------------------- */

export function GoldenText() {
  const [gc] = useUI<keyof typeof GC>("gc");
  const g = GC[gc ?? "why"];
  return (
    <div className="golden__txt" id="goldenTxt">
      <div className="panel" key={gc}>
        <h5>{g[0]}</h5>
        <Html as="p" html={g[1]} />
      </div>
    </div>
  );
}
