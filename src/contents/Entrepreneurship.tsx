import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { PageSectionNav } from "../components/PageSectionNav";
import type { PageSection } from "../components/PageSectionNav";
import "./Entrepreneurship/Entrepreneurship.css";
import { ModalContext, UIContext } from "./Entrepreneurship/state";
import type { UIState, UIValue } from "./Entrepreneurship/state";
import { Intro } from "./Entrepreneurship/sections/Intro";
import { S1 } from "./Entrepreneurship/sections/S1";
import { S2 } from "./Entrepreneurship/sections/S2";
import { S3 } from "./Entrepreneurship/sections/S3";
import { S4 } from "./Entrepreneurship/sections/S4";
import { S5 } from "./Entrepreneurship/sections/S5";
import { cx } from "./Entrepreneurship/util";

/* --------------------------------------------------------------------------
   Entrepreneurship — React port of the reviewed standalone page (v10).

   Content lives in Entrepreneurship/sections (one file per chapter) and
   Entrepreneurship/data.ts; interactive pieces in Entrepreneurship/widgets.
   All styles are scoped under .ent in Entrepreneurship.css.
   -------------------------------------------------------------------------- */

const SECTIONS: PageSection[] = [
  { id: "intro", label: "Introduction" },
  {
    id: "s1",
    label: "1. Unmet Needs & First Customer",
    children: [
      { id: "s1-opportunity", label: "The opportunity" },
      { id: "s1-regulation", label: "Regulatory context" },
      { id: "s1-market", label: "Market analysis" },
      { id: "s1-competitors", label: "Competitors" },
      { id: "s1-stakeholders", label: "Stakeholder matrix" },
      { id: "s1-beachhead", label: "Beachhead market" },
      { id: "s1-customer", label: "Bio-Oils Huelva" },
      { id: "s1-resources", label: "PESTEL & empathy map" },
    ],
  },
  {
    id: "s2",
    label: "2. Scalable, Possible & Inventive",
    children: [
      { id: "s2-product", label: "Product overview" },
      { id: "s2-mvp", label: "Minimum Viable Product" },
      { id: "s2-uvp", label: "Unique Value Proposition" },
      { id: "s2-ip", label: "IP strategy" },
      { id: "s2-golden", label: "The Golden Circle" },
    ],
  },
  {
    id: "s3",
    label: "3. Product Development Plan",
    children: [
      { id: "s3-canvas", label: "Business canvas" },
      { id: "s3-model", label: "Business model" },
      { id: "s3-gtm", label: "Go-to-market" },
      { id: "s3-risk", label: "Risk management" },
      { id: "s3-gantt", label: "Gantt chart" },
    ],
  },
  {
    id: "s4",
    label: "4. Skills, Capabilities & Stakeholders",
    children: [
      { id: "s4-skills", label: "Skill gap analysis" },
      { id: "s4-team", label: "Team in entrepreneurship" },
      { id: "s4-swot", label: "SWOT" },
    ],
  },
  {
    id: "s5",
    label: "5. Positive & Negative Impact",
    children: [
      { id: "s5-sdg", label: "SDGs" },
      { id: "s5-impact", label: "Impact, both ways" },
    ],
  },
];

/** Starting value of every shared UI key (what the reviewed page opens on). */
const INITIAL: UIState = {
  chain: "linear",
  mkt: "up",
  ring: "intro",
  bh: null,
  mb: null,
  cmp: false,
  st: "1",
  gc: "why",
  seg: "all",
  opt: "b",
  rs: "1",
  rk: "before",
  rsel: 0,
  ph: "1",
  gxWs: "all",
  gxGate: false,
  gxSel: null,
  gxFold: [],
  tgN: 0,
  rc: "0",
  sk: "all",
  adv: 0,
  ti: "awards",
  pr: "fab",
  sdg: 0,
  lca: 1.5,
  bal: "pos",
  hor: "env",
};

interface ModalState {
  content: ReactNode;
  color?: string;
  wide?: boolean;
}

export function Entrepreneurship() {
  const [ui, setUi] = useState<UIState>(INITIAL);
  const set = useCallback(
    (key: string, value: UIValue) => setUi((s) => ({ ...s, [key]: value })),
    [],
  );
  const uiCtx = useMemo(() => ({ state: ui, set }), [ui, set]);

  /* Pop-up shared by the canvas, stakeholder matrix and PDF viewers. */
  const [modal, setModal] = useState<ModalState | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const modalApi = useMemo(
    () => ({
      open: (content: ReactNode, color?: string, wide?: boolean) => {
        lastFocus.current = document.activeElement as HTMLElement;
        setModal({ content, color, wide });
      },
      close: () => setModal(null),
    }),
    [],
  );
  useEffect(() => {
    if (!modal) return;
    document.documentElement.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(null);
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      lastFocus.current?.focus({ preventScroll: true });
    };
  }, [modal]);

  /* Photo lightbox: any award / carousel / event photo opens full size. */
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null,
  );

  /* Reveal-on-scroll for every .rv block. */
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = root.current?.querySelectorAll(".rv");
    if (!els) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Delegated clicks: photos open the lightbox; in-page links open any
     collapsed <details> that contain their target. */
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const t = e.target as Element;
    const img = t.closest<HTMLImageElement>(
      ".cp-gallery img, .aw-ph, .ev-solo__img, .gallery img",
    );
    if (img) {
      setLightbox({ src: img.currentSrc || img.src, alt: img.alt });
      return;
    }
    const a = t.closest<HTMLAnchorElement>('a[href^="#"]');
    if (a) {
      const id = a.getAttribute("href")?.slice(1);
      let p = id ? document.getElementById(id)?.parentElement : null;
      while (p) {
        if (p instanceof HTMLDetailsElement) p.open = true;
        p = p.parentElement;
      }
    }
  };

  return (
    <UIContext.Provider value={uiCtx}>
      <ModalContext.Provider value={modalApi}>
        <div className="ent" ref={root} onClick={onClick}>
          <div className="page-with-section-nav ent-page">
            <PageSectionNav
              sections={SECTIONS}
              ariaLabel="Jump to a part of the Entrepreneurship page"
            />
            <main className="ent-col">
              <Intro />
              <S1 />
              <S2 />
              <S3 />
              <S4 />
              <S5 />
            </main>
          </div>

          <div
            className={cx("modal", !!modal && "on", modal?.wide && "modal--wide")}
            role="dialog"
            aria-modal="true"
            style={{ ["--mc" as string]: modal?.color || "var(--ink)" }}
            onClick={(e) => e.target === e.currentTarget && setModal(null)}
          >
            <div className="modal__box">
              <button
                type="button"
                className="modal__x"
                aria-label="Close"
                ref={closeBtn}
                onClick={() => setModal(null)}
              >
                ×
              </button>
              <div className="modal__body">{modal?.content}</div>
            </div>
          </div>

          <div
            className={cx("lightbox", !!lightbox && "on")}
            id="lightbox"
            role="dialog"
            aria-label="Image preview"
            onClick={() => setLightbox(null)}
          >
            {lightbox && <img src={lightbox.src} alt={lightbox.alt} />}
          </div>
        </div>
      </ModalContext.Provider>
    </UIContext.Provider>
  );
}
