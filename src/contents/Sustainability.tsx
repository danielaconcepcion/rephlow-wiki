import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";

import { PageSectionNav, type PageSection } from "../components/PageSectionNav";
import { MoleculeBackdrop } from "../components/MoleculeBackdrop/MoleculeBackdrop";
import { AdjacentPageNav } from "../components/AdjacentPageNav";
import { asset } from "../utils";
import { SEATS } from "./Sustainability/seats";
import "./Sustainability/Sustainability.css";
import { AccordionSection } from "./HumanPractices/AccordionSection";

/* --------------------------------------------------------------------------
   Sustainability — the page as it was designed in Claude Design
   (Sustainability.dc.html), carried over as it stands: the same four rooms,
   the same plant map, figures, tables, toggles and read-outs, in the same
   order and with the same text. Only the page header is the wiki's own, as
   on Education and Communication.

   The prototype's dynamic bindings ({{ go1 }}, {{ capIdx }}, {{ chips }} …)
   are the state below, under the names the markup uses.
   -------------------------------------------------------------------------- */

const SECTIONS: PageSection[] = [
  {
    id: "r01",
    label: "The diagnostic lobby",
    children: [
      {
        id: "r01-the-three-main-goals-we-answer-to",
        label: "The three main goals we answer to",
      },
      {
        id: "r01-goal-9-and-goal-13-two-goals-we-touch-wi",
        label: "Goals 9 and 13, without claiming",
      },
      {
        id: "r01-reading-the-interactions-the-nilsson-sca",
        label: "Reading the interactions",
      },
      {
        id: "r01-three-tensions-we-are-not-going-to-smoot",
        label: "Three tensions",
      },
    ],
  },
  {
    id: "r02",
    label: "The operations core",
    children: [
      {
        id: "r02-the-blueprint-on-the-wall-our-sustainabi",
        label: "The blueprint on the wall",
      },
      {
        id: "r02-an-honest-word-about-what-sdg-stakeholde",
        label: "What “SDG stakeholder” means",
      },
      { id: "r02-closing-the-loops", label: "Closing the loops" },
      {
        id: "r02-cedex-roberto-arranz-arranz",
        label: "CEDEX — Roberto Arranz",
      },
      { id: "r02-what-stays-open", label: "What stays open" },
      {
        id: "r02-what-has-to-be-true-next",
        label: "What has to be true next",
      },
    ],
  },
  {
    id: "r03",
    label: "The control and metrics panel",
    children: [
      {
        id: "r03-reading-1-what-one-cubic-metre-gives-bac",
        label: "Reading 1: one cubic metre",
      },
      {
        id: "r03-reading-2-the-carbon-footprint-including",
        label: "Reading 2: the carbon footprint",
      },
      {
        id: "r03-reading-3-the-full-sixteen-and-the-targe",
        label: "Reading 3: the full sixteen",
      },
      {
        id: "r03-critical-reflection-where-sustainability",
        label: "Critical reflection",
      },
    ],
  },
  {
    id: "r04",
    label: "The impact amphitheatre",
    children: [
      {
        id: "r04-the-round-table-four-seats-that-rarely-s",
        label: "The round table",
      },
      {
        id: "r04-closing-reflection-the-ethics-of-a-conta",
        label: "Closing reflection",
      },
    ],
  },
];

/** The capacity sweep, as Table 4 reports it. */
const CAPS = ["1.5", "3", "6", "9", "12", "15"];
const CAP_NUM = [1.5, 3, 6, 9, 12, 15];
const SS = ["0.00361", "0.00153", "0.00048", "0.00014", "−0.00004", "−0.00014"];
const SS_NUM = [0.00361, 0.00153, 0.00048, 0.00014, -0.00004, -0.00014];
const WON = ["5", "10", "15", "16", "16", "16"];
const CLIM = ["37.0", "16.4", "6.2", "2.7", "1.0", "≈0"];
const CLIM_NUM = [37.0, 16.4, 6.2, 2.7, 1.0, 0];
/** Where each simulated capacity sits on the climate curve (see the SVG). */
const CHART_X = [108.5, 161, 266, 371, 476, 581];

const GREEN = "#56732f";
const RED = "#c2441f";
const INK = "var(--ink)";

const VERDICTS = [
  { at: 2.5, label: "Beats the conventional route overall · ≈2.5 mg P/g" },
  { at: 3.8, label: "Climate parity with the chemical route · ≈3.8 mg P/g" },
  { at: 8, label: "Leads all sixteen categories · ≈8 mg P/g" },
  { at: 12, label: "A net environmental benefit · ≈12 mg P/g" },
];

/** Counts a number up the first time its block is scrolled into view. */
function useCountUp(
  target: number,
  decimals: number,
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    const node = ref.current;
    if (!container || !node) return;
    let frame = 0;
    let done = false;
    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1100);
        const eased = 1 - Math.pow(1 - t, 3);
        node.textContent = (target * eased).toFixed(decimals);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !done) {
          done = true;
          run();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(container);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, decimals, containerRef]);
  return ref;
}

export function Sustainability() {
  /** The column of rooms, so the backdrop knows where the text sits. */
  const proseRef = useRef<HTMLElement>(null);

  /* --- the plant map ----------------------------------------------------- */
  const [hot, setHot] = useState<number | null>(null);
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 860px)");
    const apply = () => setWide(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const narrow = !wide;

  const go = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const go1 = useCallback(() => go("r01"), [go]);
  const go2 = useCallback(() => go("r02"), [go]);
  const go3 = useCallback(() => go("r03"), [go]);
  const go4 = useCallback(() => go("r04"), [go]);
  const enter1 = useCallback(() => setHot(1), []);
  const enter2 = useCallback(() => setHot(2), []);
  const enter3 = useCallback(() => setHot(3), []);
  const enter4 = useCallback(() => setHot(4), []);
  const leave = useCallback(() => setHot(null), []);

  const lift = (n: number) =>
    hot === n ? "translateY(-8px) scale(1.03)" : "none";
  const dim = (n: number) => (hot !== null && hot !== n ? "0.55" : "1");
  const ring = (n: number) =>
    hot === n
      ? "0 22px 44px rgba(27,35,64,0.26)"
      : "0 10px 24px rgba(27,35,64,0.14)";

  const [t1, t2, t3, t4] = [lift(1), lift(2), lift(3), lift(4)];
  const [o1, o2, o3, o4] = [dim(1), dim(2), dim(3), dim(4)];
  const [sh1, sh2, sh3, sh4] = [ring(1), ring(2), ring(3), ring(4)];

  /* --- the rooms' stage (Phlowi over the photograph) --------------------- */
  const stagePos = wide ? "absolute" : "static";
  const stageMt = wide ? "0" : "-34px";
  const mascotW = wide ? "clamp(118px,13vw,168px)" : "104px";
  const speechMax = wide ? "min(430px,44vw)" : "100%";
  const flowAnim = "flow 1.6s linear infinite";

  /* --- Reading 1: the four counters -------------------------------------- */
  const kpiRef = useRef<HTMLDivElement>(null);
  const k1Ref = useCountUp(1.95, 2, kpiRef);
  const k2Ref = useCountUp(1, 0, kpiRef);
  const k3Ref = useCountUp(13.7, 1, kpiRef);
  const k4Ref = useCountUp(24, 0, kpiRef);

  /* --- Reading 3: the capacity sweep ------------------------------------- */
  const [capIdx, setCapIdx] = useState(0);
  const onCap = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setCapIdx(Number(event.target.value)),
    [],
  );
  const capVal = CAPS[capIdx];
  const ssVal = SS[capIdx];
  const ssColor = SS_NUM[capIdx] <= 0.00192 ? GREEN : INK;
  const wonVal = `${WON[capIdx]} / 16`;
  const wonColor = WON[capIdx] === "16" ? GREEN : INK;
  const climVal = CLIM[capIdx];
  const climColor = CLIM_NUM[capIdx] <= 12.2 ? GREEN : RED;
  const mx = CHART_X[capIdx];
  const my = 292 - CLIM_NUM[capIdx] * 6.8;
  const chips = VERDICTS.map((verdict) => {
    const on = CAP_NUM[capIdx] >= verdict.at;
    return {
      label: verdict.label,
      border: on ? "rgba(124,154,78,0.45)" : "var(--line)",
      bg: on ? "rgba(124,154,78,0.10)" : "var(--paper-soft)",
      color: on ? "#3f5a22" : "var(--ink-soft)",
      weight: on ? "600" : "400",
      dot: on ? GREEN : "rgba(27,35,64,0.18)",
      ring: on ? "0 0 0 4px rgba(124,154,78,0.18)" : "none",
    };
  });

  /* --- the water tank ----------------------------------------------------- */
  const tankRef = useRef<HTMLDivElement>(null);
  const tankGRef = useRef<SVGGElement>(null);
  const waterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = tankRef.current;
    const water = waterRef.current;
    const tank = tankGRef.current;
    if (!container || !water || !tank) return;
    let frame = 0;
    let done = false;
    const total = 175200; // ≈20 m³/h, every hour of the year
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || done) return;
        done = true;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          const eased = 1 - Math.pow(1 - t, 3);
          water.textContent = Math.round(total * eased).toLocaleString("en-GB");
          tank.setAttribute("transform", `translate(0,${196 * (1 - eased)})`);
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    observer.observe(container);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  /* --- the modal: a seat's full exchange, or a figure at full size -------- */
  const [seat, setSeat] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState<{ src: string; alt: string } | null>(
    null,
  );
  const modalOpen = seat !== null || zoomed !== null;

  const open1 = useCallback(() => setSeat(0), []);
  const open2 = useCallback(() => setSeat(1), []);
  const open3 = useCallback(() => setSeat(2), []);
  const open4 = useCallback(() => setSeat(3), []);
  const zoom = useCallback((event: MouseEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    setZoomed({ src: image.src, alt: image.alt });
  }, []);
  const closeModal = useCallback(() => {
    setSeat(null);
    setZoomed(null);
  }, []);
  const stop = useCallback(
    (event: MouseEvent<HTMLDivElement>) => event.stopPropagation(),
    [],
  );

  useEffect(() => {
    if (!modalOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, closeModal]);

  const openSeat = seat === null ? null : SEATS[seat];

  return (
    <div className="sus-design mbg-host">
      <MoleculeBackdrop contentRef={proseRef} />
      <div
        style={{
          position: "relative",
          maxWidth: "820px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p className="sus-intro">
          Welcome to the rePhlow plant. Most factories hide their pipes, while
          we put ours behind glass. Over the next four rooms we will show you
          the goals that guide us, the instruments that prove we keep our word,
          the people our work touches, and the loop we keep closing. Mind the
          wet floor near the bioreactors, and follow the glowing pipes.
        </p>
      </div>
      <section
        id="plant-map"
        aria-label="Plant map: the four rooms of the rePhlow plant"
        style={{
          position: "relative",
          maxWidth: "1192px",
          margin: "40px auto 0",
        }}
      >
        {" "}
        {wide && (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1200/640",
              }}
            >
              <svg
                viewBox="0 0 1200 640"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "0",
                  width: "100%",
                  height: "100%",
                  overflow: "visible",
                }}
              >
                <defs>
                  <pattern
                    id="floorDots"
                    width="22"
                    height="22"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="2"
                      cy="2"
                      r="1.3"
                      fill="rgba(27,35,64,0.07)"
                    ></circle>
                  </pattern>
                  <filter
                    id="softShadow"
                    x="-10%"
                    y="-10%"
                    width="120%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="14"></feGaussianBlur>
                  </filter>
                </defs>
                <ellipse
                  cx="600"
                  cy="618"
                  rx="540"
                  ry="22"
                  fill="rgba(27,35,64,0.14)"
                  filter="url(#softShadow)"
                ></ellipse>
                <path
                  d="M140,60 H1040 C1090,60 1120,90 1120,140 V540 C1120,582 1090,604 1048,604 H152 C106,604 80,578 80,532 V312 C80,272 58,252 58,212 V132 C58,88 94,60 140,60 Z"
                  transform="translate(0 14)"
                  fill="#cfe5ec"
                ></path>
                <path
                  d="M140,60 H1040 C1090,60 1120,90 1120,140 V540 C1120,582 1090,604 1048,604 H152 C106,604 80,578 80,532 V312 C80,272 58,252 58,212 V132 C58,88 94,60 140,60 Z"
                  fill="#f4faf9"
                  stroke="rgba(27,35,64,0.12)"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M140,60 H1040 C1090,60 1120,90 1120,140 V540 C1120,582 1090,604 1048,604 H152 C106,604 80,578 80,532 V312 C80,272 58,252 58,212 V132 C58,88 94,60 140,60 Z"
                  fill="url(#floorDots)"
                ></path>
                <path
                  d="M0,230 L230.0,230.0 Q250,230 270.0,230.0 L380.0,230.0 Q400,230 400.0,250.0 L400.0,355.0 Q400,375 420.0,375.0 L525,375"
                  fill="none"
                  stroke="rgba(27,35,64,0.13)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M0,230 L230.0,230.0 Q250,230 270.0,230.0 L380.0,230.0 Q400,230 400.0,250.0 L400.0,355.0 Q400,375 420.0,375.0 L525,375"
                  fill="none"
                  stroke="#d3e6d6"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M0,230 L230.0,230.0 Q250,230 270.0,230.0 L380.0,230.0 Q400,230 400.0,250.0 L400.0,355.0 Q400,375 420.0,375.0 L525,375"
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(0 -4)"
                ></path>
                <path
                  d="M0,230 L230.0,230.0 Q250,230 270.0,230.0 L380.0,230.0 Q400,230 400.0,250.0 L400.0,355.0 Q400,375 420.0,375.0 L525,375"
                  fill="none"
                  stroke="#7C9A4E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="4 18"
                  style={{ animation: `${flowAnim}` }}
                ></path>
                <path
                  d="M525,375 L635.0,375.0 Q655,375 655.0,355.0 L655.0,215.0 Q655,195 675.0,195.0 L775,195"
                  fill="none"
                  stroke="rgba(27,35,64,0.13)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M525,375 L635.0,375.0 Q655,375 655.0,355.0 L655.0,215.0 Q655,195 675.0,195.0 L775,195"
                  fill="none"
                  stroke="#d2e9ee"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M525,375 L635.0,375.0 Q655,375 655.0,355.0 L655.0,215.0 Q655,195 675.0,195.0 L775,195"
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(0 -4)"
                ></path>
                <path
                  d="M525,375 L635.0,375.0 Q655,375 655.0,355.0 L655.0,215.0 Q655,195 675.0,195.0 L775,195"
                  fill="none"
                  stroke="#6fb2a6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="4 18"
                  style={{ animation: `${flowAnim}` }}
                ></path>
                <path
                  d="M775,195 L872.5,195.0 Q890,195 890.0,212.5 L890.0,212.5 Q890,230 907.5,230.0 L1030.0,230.0 Q1050,230 1050.0,250.0 L1050.0,450.0 Q1050,470 1070.0,470.0 L1200,470"
                  fill="none"
                  stroke="rgba(27,35,64,0.13)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M775,195 L872.5,195.0 Q890,195 890.0,212.5 L890.0,212.5 Q890,230 907.5,230.0 L1030.0,230.0 Q1050,230 1050.0,250.0 L1050.0,450.0 Q1050,470 1070.0,470.0 L1200,470"
                  fill="none"
                  stroke="#d4eef7"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M775,195 L872.5,195.0 Q890,195 890.0,212.5 L890.0,212.5 Q890,230 907.5,230.0 L1030.0,230.0 Q1050,230 1050.0,250.0 L1050.0,450.0 Q1050,470 1070.0,470.0 L1200,470"
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(0 -4)"
                ></path>
                <path
                  d="M775,195 L872.5,195.0 Q890,195 890.0,212.5 L890.0,212.5 Q890,230 907.5,230.0 L1030.0,230.0 Q1050,230 1050.0,250.0 L1050.0,450.0 Q1050,470 1070.0,470.0 L1200,470"
                  fill="none"
                  stroke="#3fa6c2"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="4 18"
                  style={{ animation: `${flowAnim}` }}
                ></path>
                <path
                  d="M950,330 L950,505"
                  fill="none"
                  stroke="rgba(27,35,64,0.13)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M950,330 L950,505"
                  fill="none"
                  stroke="#f6dfd5"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M950,330 L950,505"
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(0 -4)"
                ></path>
                <path
                  d="M950,330 L950,505"
                  fill="none"
                  stroke="#E2542D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="4 18"
                  style={{ animation: `${flowAnim}` }}
                ></path>
                <rect
                  x="56"
                  y="215"
                  width="8"
                  height="30"
                  rx="3"
                  fill="#ffffff"
                  stroke="rgba(27,35,64,0.22)"
                ></rect>
                <rect
                  x="385"
                  y="296"
                  width="30"
                  height="8"
                  rx="3"
                  fill="#ffffff"
                  stroke="rgba(27,35,64,0.22)"
                ></rect>
                <rect
                  x="586"
                  y="360"
                  width="8"
                  height="30"
                  rx="3"
                  fill="#ffffff"
                  stroke="rgba(27,35,64,0.22)"
                ></rect>
                <rect
                  x="640"
                  y="286"
                  width="30"
                  height="8"
                  rx="3"
                  fill="#ffffff"
                  stroke="rgba(27,35,64,0.22)"
                ></rect>
                <rect
                  x="826"
                  y="180"
                  width="8"
                  height="30"
                  rx="3"
                  fill="#ffffff"
                  stroke="rgba(27,35,64,0.22)"
                ></rect>
                <rect
                  x="1035"
                  y="396"
                  width="30"
                  height="8"
                  rx="3"
                  fill="#ffffff"
                  stroke="rgba(27,35,64,0.22)"
                ></rect>
                <rect
                  x="1136"
                  y="455"
                  width="8"
                  height="30"
                  rx="3"
                  fill="#ffffff"
                  stroke="rgba(27,35,64,0.22)"
                ></rect>
                <rect
                  x="935"
                  y="416"
                  width="30"
                  height="8"
                  rx="3"
                  fill="#ffffff"
                  stroke="rgba(27,35,64,0.22)"
                ></rect>
                <circle
                  cx="24"
                  cy="230"
                  r="5"
                  fill="#E2542D"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                ></circle>
                <circle
                  cx="88"
                  cy="230"
                  r="5"
                  fill="#E2542D"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                ></circle>
                <circle
                  cx="112"
                  cy="226"
                  r="5"
                  fill="#E2542D"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                ></circle>
                <circle
                  cx="400"
                  cy="262"
                  r="5"
                  fill="#E2542D"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                ></circle>
                <circle
                  cx="404"
                  cy="318"
                  r="5"
                  fill="#E2542D"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                ></circle>
                <circle
                  cx="470"
                  cy="375"
                  r="5"
                  fill="#E2542D"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                ></circle>
                <g transform="translate(232 508)">
                  <circle
                    r="46"
                    fill="#e3efe1"
                    stroke="#1f6f7d"
                    strokeWidth="4"
                  ></circle>
                  <path
                    d="M-46,4 Q-23,-6 0,4 T46,4 V46 H-46 Z"
                    fill="rgba(124,154,78,0.25)"
                    clipPath="circle(46px)"
                  ></path>
                  <g transform="translate(-18 -12)">
                    <circle r="5" fill="#E2542D"></circle>
                    <circle cx="0" cy="-8" r="2.4" fill="#f0a58f"></circle>
                    <circle cx="7" cy="4" r="2.4" fill="#f0a58f"></circle>
                    <circle cx="-7" cy="4" r="2.4" fill="#f0a58f"></circle>
                  </g>
                  <g transform="translate(10 -20)">
                    <circle r="5" fill="#E2542D"></circle>
                    <circle cx="0" cy="-8" r="2.4" fill="#f0a58f"></circle>
                    <circle cx="7" cy="4" r="2.4" fill="#f0a58f"></circle>
                    <circle cx="-7" cy="4" r="2.4" fill="#f0a58f"></circle>
                  </g>
                  <g transform="translate(20 8)">
                    <circle r="5" fill="#E2542D"></circle>
                    <circle cx="0" cy="-8" r="2.4" fill="#f0a58f"></circle>
                    <circle cx="7" cy="4" r="2.4" fill="#f0a58f"></circle>
                    <circle cx="-7" cy="4" r="2.4" fill="#f0a58f"></circle>
                  </g>
                  <g transform="translate(-6 16)">
                    <circle r="5" fill="#E2542D"></circle>
                    <circle cx="0" cy="-8" r="2.4" fill="#f0a58f"></circle>
                    <circle cx="7" cy="4" r="2.4" fill="#f0a58f"></circle>
                    <circle cx="-7" cy="4" r="2.4" fill="#f0a58f"></circle>
                  </g>
                  <g transform="translate(-26 10)">
                    <circle r="5" fill="#E2542D"></circle>
                    <circle cx="0" cy="-8" r="2.4" fill="#f0a58f"></circle>
                    <circle cx="7" cy="4" r="2.4" fill="#f0a58f"></circle>
                    <circle cx="-7" cy="4" r="2.4" fill="#f0a58f"></circle>
                  </g>
                  <line
                    x1="34"
                    y1="34"
                    x2="66"
                    y2="66"
                    stroke="#1f6f7d"
                    strokeWidth="10"
                    strokeLinecap="round"
                  ></line>
                </g>
                <text
                  x="300"
                  y="490"
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: "17px",
                    fontWeight: "600",
                    fill: "#c2441f",
                  }}
                >
                  PO₄³⁻
                </text>
                <text
                  x="300"
                  y="510"
                  style={{
                    fontFamily: "Inter,sans-serif",
                    fontSize: "12.5px",
                    fill: "#4A5170",
                  }}
                >
                  2,290 mg P/L in
                </text>
                <g>
                  <circle
                    cx="462"
                    cy="588"
                    r="13"
                    fill="rgba(156,201,184,0.45)"
                    stroke="#56732f"
                    strokeWidth="2"
                  ></circle>
                  <circle cx="458" cy="585" r="2.6" fill="#6E5A96"></circle>
                  <circle cx="466" cy="590" r="2.6" fill="#6E5A96"></circle>
                  <circle cx="463" cy="582" r="1.8" fill="#E2542D"></circle>
                  <circle
                    cx="494"
                    cy="578"
                    r="13"
                    fill="rgba(156,201,184,0.45)"
                    stroke="#56732f"
                    strokeWidth="2"
                  ></circle>
                  <circle cx="490" cy="575" r="2.6" fill="#6E5A96"></circle>
                  <circle cx="498" cy="580" r="2.6" fill="#6E5A96"></circle>
                  <circle cx="495" cy="572" r="1.8" fill="#E2542D"></circle>
                  <circle
                    cx="526"
                    cy="588"
                    r="13"
                    fill="rgba(156,201,184,0.45)"
                    stroke="#56732f"
                    strokeWidth="2"
                  ></circle>
                  <circle cx="522" cy="585" r="2.6" fill="#6E5A96"></circle>
                  <circle cx="530" cy="590" r="2.6" fill="#6E5A96"></circle>
                  <circle cx="527" cy="582" r="1.8" fill="#E2542D"></circle>
                  <circle
                    cx="558"
                    cy="578"
                    r="13"
                    fill="rgba(156,201,184,0.45)"
                    stroke="#56732f"
                    strokeWidth="2"
                  ></circle>
                  <circle cx="554" cy="575" r="2.6" fill="#6E5A96"></circle>
                  <circle cx="562" cy="580" r="2.6" fill="#6E5A96"></circle>
                  <circle cx="559" cy="572" r="1.8" fill="#E2542D"></circle>
                  <circle
                    cx="590"
                    cy="588"
                    r="13"
                    fill="rgba(156,201,184,0.45)"
                    stroke="#56732f"
                    strokeWidth="2"
                  ></circle>
                  <circle cx="586" cy="585" r="2.6" fill="#6E5A96"></circle>
                  <circle cx="594" cy="590" r="2.6" fill="#6E5A96"></circle>
                  <circle cx="591" cy="582" r="1.8" fill="#E2542D"></circle>
                </g>
                <text
                  x="628"
                  y="589"
                  style={{
                    fontFamily: "Inter,sans-serif",
                    fontSize: "12.5px",
                    fill: "#4A5170",
                  }}
                >
                  alginate beads
                </text>
                <g transform="translate(704 384)">
                  <rect width="142" height="96" rx="14" fill="#1B2340"></rect>
                  <line
                    x1="14"
                    x2="128"
                    y1="70"
                    y2="70"
                    stroke="#E2542D"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  ></line>
                  <polyline
                    points="14,18 38,40 62,56 90,66 128,72"
                    fill="none"
                    stroke="#9CC9B8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></polyline>
                  <text
                    x="14"
                    y="88"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "11px",
                      fill: "#BFE3EE",
                    }}
                  >
                    EU limit 0.7 mg/L
                  </text>
                  <rect
                    x="56"
                    y="96"
                    width="30"
                    height="16"
                    fill="#1B2340"
                  ></rect>
                  <rect
                    x="40"
                    y="110"
                    width="62"
                    height="6"
                    rx="3"
                    fill="#1B2340"
                  ></rect>
                </g>
                <g transform="translate(950 505)">
                  <path
                    d="M-34,0 H34 L18,26 H-18 Z"
                    fill="#ffffff"
                    stroke="rgba(27,35,64,0.25)"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M-30,30 Q-36,66 -24,74 H24 Q36,66 30,30 Z"
                    fill="#fbeee8"
                    stroke="#c2441f"
                    strokeWidth="2"
                  ></path>
                  <circle cx="-12" cy="52" r="4" fill="#E2542D"></circle>
                  <circle cx="0" cy="58" r="4" fill="#E2542D"></circle>
                  <circle cx="12" cy="50" r="4" fill="#E2542D"></circle>
                  <circle cx="-4" cy="44" r="4" fill="#E2542D"></circle>
                  <circle cx="8" cy="64" r="4" fill="#E2542D"></circle>
                  <circle cx="-16" cy="64" r="4" fill="#E2542D"></circle>
                  <circle cx="16" cy="62" r="4" fill="#E2542D"></circle>
                  <circle cx="4" cy="48" r="4" fill="#E2542D"></circle>
                  <text
                    x="0"
                    y="22"
                    textAnchor="middle"
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: "13px",
                      fontWeight: "700",
                      fill: "#c2441f",
                    }}
                  >
                    P
                  </text>
                </g>
                <path
                  d="M1186,492 q6,10 0,14 q-6,-4 0,-14 Z"
                  fill="#3fa6c2"
                ></path>
              </svg>
              <button
                type="button"
                onClick={go1}
                onMouseEnter={enter1}
                onMouseLeave={leave}
                onFocus={enter1}
                onBlur={leave}
                aria-label="Go to room 01, The diagnostic lobby"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  position: "absolute",
                  left: "10.833%",
                  top: "17.188%",
                  width: "20.000%",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition:
                    "transform .4s cubic-bezier(.2,.7,.2,1),opacity .4s ease",
                  transform: `${t1}`,
                  opacity: `${o1}`,
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "240/240",
                    borderRadius: "46% 20% 22% 22% / 46% 20% 22% 22%",
                    overflow: "hidden",
                    border: "5px solid #ffffff",
                    boxShadow: `${sh1}`,
                    transition: "box-shadow .4s ease",
                    background: "#eaf6fa",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/room01-lobby.jpg")}
                    alt=""
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </span>
                <span
                  style={{
                    marginTop: "10px",
                    padding: "6px 12px 7px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    textAlign: "center",
                    boxShadow: "0 4px 14px rgba(27,35,64,0.06)",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#1f6f7d",
                    }}
                  >
                    01 · Diagnosis
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(14px,1.4vw,17px)",
                      fontWeight: "700",
                      lineHeight: "1.2",
                      color: "var(--ink)",
                    }}
                  >
                    The diagnostic lobby
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={go2}
                onMouseEnter={enter2}
                onMouseLeave={leave}
                onFocus={enter2}
                onBlur={leave}
                aria-label="Go to room 02, The operations core"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  position: "absolute",
                  left: "35.000%",
                  top: "42.188%",
                  width: "17.500%",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition:
                    "transform .4s cubic-bezier(.2,.7,.2,1),opacity .4s ease",
                  transform: `${t2}`,
                  opacity: `${o2}`,
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "210/210",
                    borderRadius: "22%",
                    overflow: "hidden",
                    border: "5px solid #ffffff",
                    boxShadow: `${sh2}`,
                    transition: "box-shadow .4s ease",
                    background: "#eaf6fa",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/room02-operations.jpg")}
                    alt=""
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </span>
                <span
                  style={{
                    marginTop: "10px",
                    padding: "6px 12px 7px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    textAlign: "center",
                    boxShadow: "0 4px 14px rgba(27,35,64,0.06)",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#56732f",
                    }}
                  >
                    02 · Operation
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(14px,1.4vw,17px)",
                      fontWeight: "700",
                      lineHeight: "1.2",
                      color: "var(--ink)",
                    }}
                  >
                    The operations core
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={go3}
                onMouseEnter={enter3}
                onMouseLeave={leave}
                onFocus={enter3}
                onBlur={leave}
                aria-label="Go to room 03, The control and metrics panel"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  position: "absolute",
                  left: "56.667%",
                  top: "15.625%",
                  width: "15.833%",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition:
                    "transform .4s cubic-bezier(.2,.7,.2,1),opacity .4s ease",
                  transform: `${t3}`,
                  opacity: `${o3}`,
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "190/190",
                    borderRadius: "18%",
                    overflow: "hidden",
                    border: "5px solid #1B2340",
                    boxShadow: `${sh3}`,
                    transition: "box-shadow .4s ease",
                    background: "#eaf6fa",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/room03-control.jpg")}
                    alt=""
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </span>
                <span
                  style={{
                    marginTop: "10px",
                    padding: "6px 12px 7px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    textAlign: "center",
                    boxShadow: "0 4px 14px rgba(27,35,64,0.06)",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#1B2340",
                    }}
                  >
                    03 · Measurement
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(14px,1.4vw,17px)",
                      fontWeight: "700",
                      lineHeight: "1.2",
                      color: "var(--ink)",
                    }}
                  >
                    The control and metrics panel
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={go4}
                onMouseEnter={enter4}
                onMouseLeave={leave}
                onFocus={enter4}
                onBlur={leave}
                aria-label="Go to room 04, The impact amphitheatre"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  position: "absolute",
                  left: "75.833%",
                  top: "20.313%",
                  width: "15.000%",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition:
                    "transform .4s cubic-bezier(.2,.7,.2,1),opacity .4s ease",
                  transform: `${t4}`,
                  opacity: `${o4}`,
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "180/200",
                    borderRadius: "50% 50% 18% 18% / 38% 38% 18% 18%",
                    overflow: "hidden",
                    border: "5px solid #ffffff",
                    boxShadow: `${sh4}`,
                    transition: "box-shadow .4s ease",
                    background: "#eaf6fa",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/room04-amphitheatre.jpg")}
                    alt=""
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </span>
                <span
                  style={{
                    marginTop: "10px",
                    padding: "6px 12px 7px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    textAlign: "center",
                    boxShadow: "0 4px 14px rgba(27,35,64,0.06)",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#5e4c86",
                    }}
                  >
                    04 · Impact
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(14px,1.4vw,17px)",
                      fontWeight: "700",
                      lineHeight: "1.2",
                      color: "var(--ink)",
                    }}
                  >
                    The impact amphitheatre
                  </span>
                </span>
              </button>
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  top: "24%",
                  width: "12%",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "14.5px",
                    fontWeight: "600",
                    lineHeight: "1.25",
                    color: "#56732f",
                  }}
                >
                  Phosphate-laden water in
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  top: "65%",
                  width: "12%",
                  textAlign: "right",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "14.5px",
                    fontWeight: "600",
                    lineHeight: "1.25",
                    color: "#1f6f7d",
                  }}
                >
                  Treated water out
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "73%",
                  top: "91.5%",
                  width: "12%",
                  textAlign: "center",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "14.5px",
                    fontWeight: "600",
                    lineHeight: "1.25",
                    color: "#c2441f",
                  }}
                >
                  Recovered phosphorus
                </div>
              </div>
            </div>
          </>
        )}{" "}
        {narrow && (
          <>
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                padding: "6px 0",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "18px",
                  top: "14px",
                  bottom: "14px",
                  width: "14px",
                  borderRadius: "7px",
                  background:
                    "linear-gradient(180deg,#d3e6d6 0%,#d2e9ee 45%,#d4eef7 100%)",
                  border: "2px solid rgba(27,35,64,0.1)",
                }}
              ></span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <span
                  style={{
                    position: "relative",
                    zIndex: "1",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "#fff",
                    border: "5px solid #7C9A4E",
                    flex: "none",
                    marginLeft: "14px",
                  }}
                ></span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "600",
                    fontSize: "15px",
                    color: "#56732f",
                  }}
                >
                  Phosphate-laden water in
                </span>
              </div>
              <button
                type="button"
                onClick={go1}
                aria-label="Go to room 01, The diagnostic lobby"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: "1",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px 12px 10px 8px",
                  marginLeft: "4px",
                  borderRadius: "22px",
                  background: "rgba(255,255,255,0.86)",
                  border: "1px solid var(--line)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <img
                  src={asset("assets/sustainability/room01-lobby.jpg")}
                  alt=""
                  style={{
                    width: "92px",
                    height: "76px",
                    objectFit: "cover",
                    flex: "none",
                    borderRadius: "46% 20% 22% 22% / 46% 20% 22% 22%",
                    border: "3px solid #fff",
                  }}
                />
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#1f6f7d",
                    }}
                  >
                    01 · Diagnosis
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17px",
                      fontWeight: "700",
                      lineHeight: "1.2",
                      color: "var(--ink)",
                    }}
                  >
                    The diagnostic lobby
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={go2}
                aria-label="Go to room 02, The operations core"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: "1",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px 12px 10px 8px",
                  marginLeft: "4px",
                  borderRadius: "22px",
                  background: "rgba(255,255,255,0.86)",
                  border: "1px solid var(--line)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <img
                  src={asset("assets/sustainability/room02-operations.jpg")}
                  alt=""
                  style={{
                    width: "92px",
                    height: "76px",
                    objectFit: "cover",
                    flex: "none",
                    borderRadius: "22%",
                    border: "3px solid #fff",
                  }}
                />
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#56732f",
                    }}
                  >
                    02 · Operation
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17px",
                      fontWeight: "700",
                      lineHeight: "1.2",
                      color: "var(--ink)",
                    }}
                  >
                    The operations core
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={go3}
                aria-label="Go to room 03, The control and metrics panel"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: "1",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px 12px 10px 8px",
                  marginLeft: "4px",
                  borderRadius: "22px",
                  background: "rgba(255,255,255,0.86)",
                  border: "1px solid var(--line)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <img
                  src={asset("assets/sustainability/room03-control.jpg")}
                  alt=""
                  style={{
                    width: "92px",
                    height: "76px",
                    objectFit: "cover",
                    flex: "none",
                    borderRadius: "18%",
                    border: "3px solid #1B2340",
                  }}
                />
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#1B2340",
                    }}
                  >
                    03 · Measurement
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17px",
                      fontWeight: "700",
                      lineHeight: "1.2",
                      color: "var(--ink)",
                    }}
                  >
                    The control and metrics panel
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={go4}
                aria-label="Go to room 04, The impact amphitheatre"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: "1",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px 12px 10px 8px",
                  marginLeft: "4px",
                  borderRadius: "22px",
                  background: "rgba(255,255,255,0.86)",
                  border: "1px solid var(--line)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <img
                  src={asset("assets/sustainability/room04-amphitheatre.jpg")}
                  alt=""
                  style={{
                    width: "92px",
                    height: "76px",
                    objectFit: "cover",
                    flex: "none",
                    borderRadius: "50% 50% 18% 18% / 38% 38% 18% 18%",
                    border: "3px solid #fff",
                  }}
                />
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#5e4c86",
                    }}
                  >
                    04 · Impact
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17px",
                      fontWeight: "700",
                      lineHeight: "1.2",
                      color: "var(--ink)",
                    }}
                  >
                    The impact amphitheatre
                  </span>
                </span>
              </button>
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <span
                  style={{
                    position: "relative",
                    zIndex: "1",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "#fff",
                    border: "5px solid #3fa6c2",
                    flex: "none",
                    marginLeft: "14px",
                  }}
                ></span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "600",
                    fontSize: "15px",
                    color: "#1f6f7d",
                  }}
                >
                  Treated water out
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <span
                  style={{
                    position: "relative",
                    zIndex: "1",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "#fff",
                    border: "5px solid #E2542D",
                    flex: "none",
                    marginLeft: "14px",
                  }}
                ></span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "600",
                    fontSize: "15px",
                    color: "#c2441f",
                  }}
                >
                  Recovered phosphorus
                </span>
              </div>
            </div>
          </>
        )}{" "}
        <p
          style={{
            margin: "22px 0 0",
            textAlign: "center",
            fontSize: "13.5px",
            color: "var(--ink-soft)",
          }}
        >
          Select a room to go to its section.
        </p>
      </section>
      <div className="page-with-section-nav">
        <PageSectionNav sections={SECTIONS} ariaLabel="Jump to room" />
        <main style={{ minWidth: "0", paddingBottom: "48px" }} ref={proseRef}>
          <section
            id="r01"
            data-screen-label="Room 01"
            style={{ scrollMarginTop: "110px", padding: "24px 0 28px" }}
          >
            <div
              style={{
                background: "#1f6f7d",
                borderRadius: "28px",
                padding: "clamp(20px,3vw,34px)",
                margin: "4px 0 30px",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "18px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "clamp(70px,9vw,104px)",
                    lineHeight: "0.8",
                    letterSpacing: "-0.05em",
                    color: "#BFE3EE",
                  }}
                >
                  01
                </span>
                <h2
                  style={{
                    margin: "0 0 2px",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(30px,3.8vw,40px)",
                    lineHeight: "1.1",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "15px",
                      letterSpacing: "0",
                      fontWeight: "600",
                      color: "#BFE3EE",
                      marginBottom: "8px",
                    }}
                  >
                    Diagnosis
                  </span>
                  The diagnostic lobby
                </h2>
              </div>
              <div style={{ position: "relative", margin: "28px 0 8px" }}>
                <div
                  style={{
                    borderRadius: "28px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-card)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/room01-lobby.jpg")}
                    alt="The diagnostic lobby: a bright glass atrium of the rePhlow plant"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "clamp(300px,42vw,470px)",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: `${stagePos}`,
                    left: "3%",
                    bottom: "0",
                    marginTop: `${stageMt}`,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: "0",
                    maxWidth: "94%",
                    pointerEvents: "none",
                    zIndex: "2",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/phlowi-1.png")}
                    alt="Phlowi, waving"
                    style={{
                      width: `${mascotW}`,
                      height: "auto",
                      flex: "none",
                      filter: "drop-shadow(0 16px 22px rgba(27,35,64,0.38))",
                      animation: "bob 5s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      margin: "0 0 26px",
                      maxWidth: `${speechMax}`,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.85)",
                      borderRadius: "22px",
                      padding: "16px 20px",
                      boxShadow: "var(--shadow-soft)",
                      pointerEvents: "auto",
                    }}
                  >
                    <p
                      style={{
                        margin: "0",
                        fontSize: "15.5px",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        textWrap: "pretty",
                      }}
                    >
                      “Every treatment plant starts with a diagnosis. Before you
                      touch the water, you find out what is actually wrong with
                      it. Here are the goals we answer to, and here, in the same
                      room and at the same size, what our work costs the goals
                      we do not.”
                    </p>
                    <p
                      style={{
                        margin: "12px 0 0",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--line)",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "15px",
                        lineHeight: "1.4",
                        color: "#1f6f7d",
                        textWrap: "pretty",
                      }}
                    >
                      How well has the team considered the positive and negative
                      interactions of their work with other SDGs?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: "8px" }}></div>
            <h3
              id="r01-the-three-main-goals-we-answer-to"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "29px",
                lineHeight: "1.2",
                fontWeight: "600",
                letterSpacing: "-0.015em",
                color: "var(--ink)",
                margin: "64px 0 18px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              The three main goals we answer to
            </h3>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Sustainability was not a chapter we added once rePhlow was being
              developed, it was a question we had to answer at every stage. More
              than once, it changed how we viewed and engineered rePhlow.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              To keep ourselves honest, we needed an external framework: The
              United Nations Sustainable Development Goals give us that —
              seventeen goals and one hundred and sixty-nine targets, agreed
              internationally, that no team can quietly rewrite to fit its own
              project. So instead of asking whether rePhlow <em>feels </em>
              sustainable, we asked a harder question: which specific targets
              does it act on, by what mechanism, and at what cost to the others?
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              We did not pick goals that flattered us, we picked the three that
              the phosphorus problem actually sits inside, and then committed to
              specific targets rather than just displaying logos.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              The 2030 Agenda sets different horizons for various targets. Two
              of the targets we work against expired in 2020 and one in 2025
              without being met, which is part of why they still matter.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              This room is our answer. It has two halves, and the second one
              matters as much as the first. First, the three goals we answer to,
              with the targets we committed to and the evidence behind each.
              Then, the goals our work touches without claiming, including the
              one where our own instruments say we are currently losing. A
              project that only reports the goals it advances has not finished
              looking.
            </p>
            <figure
              style={{
                margin: "30px 0",
                borderRadius: "28px",
                background:
                  "radial-gradient(ellipse at 50% 40%,#ffffff 0%,var(--water-clear) 100%)",
                border: "1px solid var(--line)",
                padding: "12px",
              }}
            >
              <img
                src={asset("assets/sustainability/sdg-main.png")}
                alt="Sustainable Development Goals 6, 12 and 14"
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: "620px",
                  margin: "0 auto",
                  height: "auto",
                }}
              />
            </figure>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                lineHeight: "1.35",
                fontWeight: "600",
                color: "#1f6f7d",
                margin: "36px 0 10px",
                textWrap: "balance",
              }}
            >
              Goal 6 — Clean water and sanitation
            </h5>
            <div
              className="sus-prose-panel"
              style={{
                margin: "26px 0",
                padding: "22px 26px",
                borderRadius: "18px",
                background: "rgba(31,124,140,0.07)",
                border: "1px solid rgba(31,124,140,0.18)",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "14.5px",
                  lineHeight: "1.7",
                  color: "var(--ink-soft)",
                }}
              >
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  Target 6.3:{" "}
                </strong>
                <em>
                  By 2030, improve water quality by reducing pollution,
                  eliminating dumping and minimizing release of hazardous
                  chemicals and materials, halving the proportion of untreated
                  wastewater and substantially increasing recycling and safe
                  reuse globally. <br />
                </em>
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  Target 6.6:
                </strong>
                <em>By </em>
                <em>
                  <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                    2020
                  </strong>
                </em>
                <em>
                  , protect and restore water-related ecosystems, including
                  mountains, forests, wetlands, rivers, aquifers and lakes.
                  <br />
                </em>
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  Target 6.b:{" "}
                </strong>
                <em>
                  Support and strengthen the participation of local communities
                  in improving water and sanitation management.
                </em>
                <a className="lab-citation" href="#ref-r01-1">
                  [1]
                </a>
              </p>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Target 6.3
              </strong>{" "}
              is the centre of gravity of this project: halving untreated
              wastewater and cutting the release of hazardous chemicals into
              nature. But a global target does not tell you how much phosphorus
              is too much. In our jurisdiction, that answer is written into law.
              Directive (EU) 2024/3019, which replaces the Urban Wastewater
              Treatment Directive from August 2027, sets total-phosphorus limits
              of{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                0.7 mg/L{" "}
              </strong>
              for plants serving 10,000 to 150,000 population equivalents and{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                0.5 mg/L
              </strong>{" "}
              for larger facilities, phased in between 2033 and 2045.{" "}
              <a className="lab-citation" href="#ref-r01-2">
                [2]
              </a>
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Those numbers are the clearest operational statement of target 6.3
              in our jurisdiction, and we adopted them as the yardstick rePhlow
              is designed against. They are a benchmark we chose, not a limit
              that binds our first use case: the Directive governs urban
              wastewater, and what an industrial discharge is actually required
              to meet depends on its permit, its discharge route and national
              implementation. We hold ourselves to the urban figure because it
              is the strictest reference available and because designing against
              a number is the difference between claiming to help with clean
              water and being able to say whether we did.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Target 6.3 is the number. Targets{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                6.6{" "}
              </strong>
              and{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                6.b{" "}
              </strong>
              cover what happens when it is missed.{" "}
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Target 6.6
              </strong>{" "}
              asks us to protect and restore water-related ecosystems, and the
              word carrying the weight is <em>restore</em>. Cutting the nutrient
              load does not automatically undo the damage: past a certain point,
              a degraded water body can hold that state on its own, and the way
              back does not undo the damage already done.{" "}
              <a className="lab-citation" href="#ref-r01-3">
                [3]
              </a>{" "}
              That asymmetry is the entire argument for acting early.
              Restoration is a slower and more expensive process compared to
              never crossing the line. This is why rePhlow is designed to act at
              an industrial outfall rather than at a lake: preventing a load
              from entering a water body is a problem with a known solution,
              while restoring one that has already shifted is not.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              For most of Europe, restoration is already the default task rather
              than the contingency. The European Environment Agency’s 2024
              assessment, covering more than 120,000 surface water bodies, found
              that only 37% reached good or high ecological status in the
              2015-2021 period.{" "}
              <a className="lab-citation" href="#ref-r01-4">
                [4]
              </a>{" "}
              Ecological status is a complex measure and nutrient levels are
              only one of the many pressures behind it, but the direction is
              unambiguous: the majority of Europe’s surface water is already
              below the standard its own law sets for it.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              There is also a gap between the two targets that is easy to miss.
              The concentrations at which a water body begins to shift towards
              eutrophication are conventionally given as phosphorus above{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                0.01-0.02 mg/L{" "}
              </strong>
              in the receiving water.{" "}
              <a className="lab-citation" href="#ref-r01-5">
                [5]
              </a>{" "}
              The discharge limit that target 6.3 translates into is{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                0.7 mg/L
              </strong>{" "}
              at the outfall.{" "}
              <a className="lab-citation" href="#ref-r01-2">
                [2]
              </a>{" "}
              These measurements are not comparable, as one is measured in
              bodies of water and the other in a pipe, with dilution in between.
              The order of magnitude between them is the reason 6.3 and 6.6 are
              separate targets. Complying with a discharge limit is not the same
              as leaving an ecosystem unchanged, and we would rather focus on
              the first while being honest that it does not guarantee the
              second.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                6.b{" "}
              </strong>
              asks for the participation of local communities in improving water
              management, and it is the target we could have missed if we just
              stayed in the lab. A resident of the San Juan reservoir told us
              that she had watched the water change for decades without being
              explained the reason why.{" "}
              <a href="#r04" className="lab-wikilink">
                Check out room 04
              </a>{" "}
              A treatment nobody can explain to the people living beside the
              water does not serve this target, despite its effectiveness. That
              conversation is why room 04 exists.
            </p>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                lineHeight: "1.35",
                fontWeight: "600",
                color: "#1f6f7d",
                margin: "36px 0 10px",
                textWrap: "balance",
              }}
            >
              Goal 12 — Responsible consumption and production
            </h5>
            <div
              className="sus-prose-panel"
              style={{
                margin: "26px 0",
                padding: "22px 26px",
                borderRadius: "18px",
                background: "rgba(31,124,140,0.07)",
                border: "1px solid rgba(31,124,140,0.18)",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "14.5px",
                  lineHeight: "1.7",
                  color: "var(--ink-soft)",
                }}
              >
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  Target 12.2:{" "}
                </strong>
                <em>
                  By 2030, achieve the sustainable management and efficient use
                  of natural resources.
                </em>
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  <br />
                  Target 12.4:{" "}
                </strong>
                <em>By </em>
                <em>
                  <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                    2020
                  </strong>
                </em>
                <em>
                  , achieve the environmentally sound management of chemicals
                  and all wastes throughout their life cycle, in accordance with
                  agreed international frameworks, and significantly reduce
                  their release to air, water and soil in order to minimize
                  their adverse impacts on human health and the environment.
                </em>
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  <br />
                  Target 12.5:
                </strong>
                <em>
                  By 2030, substantially reduce waste generation through
                  prevention, reduction, recycling and reuse.{" "}
                </em>
                <a className="lab-citation" href="#ref-r01-6">
                  [6]
                </a>
              </p>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Target 12.2{" "}
              </strong>
              is the one that turns our project inside out. Rather than viewing
              phosphorus as just a pollutant that needs to be eradicated, we can
              recognise that it is a resource that can be given a second life.
              Phosphate rock is non-renewable and phosphorus is irreplaceable in
              our diet; estimated data place the peak of global production
              within decades rather than centuries.{" "}
              <a className="lab-citation" href="#ref-r01-7">
                [7]
              </a>{" "}
              Its reserves are also extremely concentrated, with around 70% of
              the world’s known reserves being located in a single country.{" "}
              <a className="lab-citation" href="#ref-r01-8">
                [8]
              </a>{" "}
              Every kilogramme of phosphorus found in wastewater sludge is a
              kilogramme that needs to be mined.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              This is why rePhlow does not stop at removal. Removing phosphorus
              from water and burying it is not enough; returning it to use is
              efficient waste and resource management.
            </p>
            <div
              className="sus-prose-panel"
              style={{
                margin: "26px 0",
                padding: "22px 26px",
                borderRadius: "18px",
                background: "rgba(110,90,150,0.06)",
                border: "1px solid rgba(110,90,150,0.2)",
              }}
            >
              <h5
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-display)",
                  fontSize: "17px",
                  lineHeight: "1.3",
                  fontWeight: "600",
                  color: "#5e4c86",
                }}
              >
                12.2 beyond each project’s boundary: A joint section by iGEM
                Madrid UCM (rePhlow) and iGEM UPF Barcelona (Vinesys)
              </h5>
              <p
                style={{
                  margin: "0 0 18px",
                  fontSize: "15px",
                  lineHeight: "1.72",
                  color: "var(--ink-soft)",
                  textWrap: "pretty",
                }}
              >
                The two teams work at opposite ends of the same water chain.
                rePhlow treats water on its way out of an industrial process,
                capturing phosphorus before it reaches sensitive waters and
                recovering it instead of burying it in sludge. Vinesys acts
                before the water is used, with an engineered Bacillus subtilis
                applied to the vine rhizosphere that retains water near the
                roots and reduces stress ethylene, so that a vineyard in Priorat
                or Penedès needs less irrigation to sustain the same crop under
                drought.
              </p>
              <p
                style={{
                  margin: "0 0 18px",
                  fontSize: "15px",
                  lineHeight: "1.72",
                  color: "var(--ink-soft)",
                  textWrap: "pretty",
                }}
              >
                Both projects fall under Target 12.2, and each covers a question
                the other does not. One asks what happens to water after a
                process releases it. The other asks how much water that process
                needs in the first place.
              </p>
              <p
                style={{
                  margin: "0 0 18px",
                  fontSize: "15px",
                  lineHeight: "1.72",
                  color: "var(--ink-soft)",
                  textWrap: "pretty",
                }}
              >
                Comparing the two projects made visible where each analysis
                stopped. Both teams had framed efficient resource use within
                their own perimeter: rePhlow around the phosphorus in an
                effluent, without asking where that water had come from, and
                Vinesys around irrigation demand in the vineyard, without asking
                what the sector discharges afterwards. Neither project changed
                its technical design as a result, but both now state where their
                analysis stops instead of leaving it implicit.
              </p>
              <p
                style={{
                  margin: "0 0 18px",
                  fontSize: "15px",
                  lineHeight: "1.72",
                  color: "var(--ink-soft)",
                  textWrap: "pretty",
                }}
              >
                <em>
                  This section is published on both wikis, following the social
                  media collaboration the two teams ran earlier in the season.
                </em>
              </p>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Target 12.4{" "}
              </strong>
              is about handling chemicals and waste responsibly across their
              whole life cycle, and it is also where we justify <em>where </em>
              we intervene. Directive (EU) 2024/3019 strengthens the control of
              non-domestic wastewater entering urban collecting systems,{" "}
              <a className="lab-citation" href="#ref-r01-2">
                [2]
              </a>{" "}
              which is one of several routes by which tightening nutrient rules
              reach an industrial site. The others run through the facility’s
              own discharge permit and through national implementation, and
              which of them applies depends on whether the effluent goes to a
              municipal collector or straight to a watercourse — a distinction
              CEDEX drew for us explicitly. We designed rePhlow for an
              industrial setting because that is where phosphorus is most
              concentrated and where the stream is already characterised and
              monitored, not because we can show that regulation arrives there
              first.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              This goal also applies to our biological design — a living
              engineered organism introduced into a waste stream is precisely
              the kind of material this target exists to govern, which is why
              containment is a precondition in our hardware.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Target 12.5{" "}
              </strong>
              is where a project focused on phosphorus can quietly fail.
              Removing phosphorus from water is not the same as removing it from
              the system. Chemical precipitation leaves the resource iron-bound
              in a sludge that has to be transported, stored and disposed of,
              and the target is not met by producing a tidier waste. Our process
              does not stop when the water is clean, as recovery makes the route
              end up with less waste.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              We have also applied this goal when working with our own
              engineering. Our original design included a filter whose materials
              would have generated their own waste stream, with no convincing
              answer for its end of life. When the reactor changed, that
              component became redundant, so it was removed. The cleanest form
              of waste reduction is the component you never build.{" "}
              <a href="#r04" className="lab-wikilink">
                See Room 04
              </a>
            </p>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                lineHeight: "1.35",
                fontWeight: "600",
                color: "#1f6f7d",
                margin: "36px 0 10px",
                textWrap: "balance",
              }}
            >
              Goal 14 — Life below water
            </h5>
            <div
              className="sus-prose-panel"
              style={{
                margin: "26px 0",
                padding: "22px 26px",
                borderRadius: "18px",
                background: "rgba(31,124,140,0.07)",
                border: "1px solid rgba(31,124,140,0.18)",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "14.5px",
                  lineHeight: "1.7",
                  color: "var(--ink-soft)",
                }}
              >
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  Target 14.1:{" "}
                </strong>
                <em>
                  By 2025, prevent and significantly reduce marine pollution of
                  all kinds, in particular from land-based activities, including
                  marine debris and nutrient pollution.
                </em>
                <a className="lab-citation" href="#ref-r01-9">
                  [9]
                </a>
              </p>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Of the three goals we answer to, this is the one whose deadline
              has already passed. Target 14.1 was set for 2025, and nutrient
              pollution from land-based activity is named in it explicitly.
              Satellite monitoring has identified roughly 1.15 million km² of
              coastal water with eutrophication potential, with deteriorating
              areas being double the amount against recovering ones.{" "}
              <a className="lab-citation" href="#ref-r01-10">
                [10]
              </a>
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              We did not have to look far for evidence, as the Mar Menor, the
              largest coastal lagoon in the western Mediterranean, was affected
              by repeated eutrophication crises since 2016. Starting with an
              algal bloom, followed by an episode of oxygen depletion and mass
              mortality in 2019 due to a flood, and a further anoxic event in
              2021.{" "}
              <a className="lab-citation" href="#ref-r01-11">
                [11]
              </a>
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              There is also a biological reason this goal belongs here rather
              than as an afterthought to goal 6 — coastal eutrophication isn’t
              just phosphorus-driven, in marine and estuarine systems, nitrogen
              is the common limiting nutrient. Controlling only one of the two
              resources may make no difference.{" "}
              <a className="lab-citation" href="#ref-r01-12">
                [12]
              </a>{" "}
              That is why we chose <em>Pseudomonas putida</em>, as it can
              assimilate both, giving us a biological advantage rather than an
              engineering choice.
            </p>
            <h3
              id="r01-goal-9-and-goal-13-two-goals-we-touch-wi"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "29px",
                lineHeight: "1.2",
                fontWeight: "600",
                letterSpacing: "-0.015em",
                color: "var(--ink)",
                margin: "64px 0 18px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              Goal 9 and goal 13: two goals we touch without claiming
            </h3>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Not every goal a project reaches is a goal it should promise.
              These two are ours: one where we have a positive impact without it
              being intentional, and one where, today, we are the problem.
            </p>
            <figure
              style={{
                margin: "30px 0",
                borderRadius: "28px",
                background:
                  "radial-gradient(ellipse at 50% 40%,#ffffff 0%,var(--water-clear) 100%)",
                border: "1px solid var(--line)",
                padding: "12px",
              }}
            >
              <img
                src={asset("assets/sustainability/sdg-secondary-sm.png")}
                alt="Sustainable Development Goals 9 and 13"
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: "560px",
                  margin: "0 auto",
                  height: "auto",
                }}
              />
            </figure>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                lineHeight: "1.35",
                fontWeight: "600",
                color: "#1f6f7d",
                margin: "36px 0 10px",
                textWrap: "balance",
              }}
            >
              Goal 9 — Industry, innovation and infrastructure
            </h5>
            <div
              className="sus-prose-panel"
              style={{
                margin: "26px 0",
                padding: "22px 26px",
                borderRadius: "18px",
                background: "rgba(31,124,140,0.07)",
                border: "1px solid rgba(31,124,140,0.18)",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "14.5px",
                  lineHeight: "1.7",
                  color: "var(--ink-soft)",
                }}
              >
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  Target 9.4:{" "}
                </strong>
                <em>
                  By 2030, upgrade infrastructure and retrofit industries to
                  make them sustainable, with increased resource-use efficiency
                  and greater adoption of clean and environmentally sound
                  technologies and industrial processes, with all countries
                  taking action in accordance with their respective
                  capabilities.
                </em>
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  <br />
                  Target 9.5:{" "}
                </strong>
                <em>
                  Enhance scientific research, upgrade the technological
                  capabilities of industrial sectors, in particular developing
                  countries, by 2030, encouraging innovation and substantially
                  increasing the number of research and development workers per
                  1 million people and public and private research and
                  development spending. <br />
                </em>
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  Target 9.a:{"\u00a0"}
                </strong>
                <em>
                  Facilitate sustainable and resilient infrastructure
                  development in developing countries through enhanced
                  financial, technological and technical support to African
                  countries, least developed countries, landlocked developing
                  countries and small island developing States.
                </em>
                <a className="lab-citation" href="#ref-r01-14">
                  [14]
                </a>
              </p>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Goal 9 is the one we reach without aiming at it. Modularity was
              not adopted to upgrade industrial infrastructure; it was adopted
              because Bio-Oils told us a mid-sized producer cannot shut down a
              line to rebuild a treatment plant around an experiment. The result
              happens to be what target 9.4 asks for — a retrofit that raises
              resource efficiency without replacing what is already there — but
              it was a commercial constraint before it was a sustainability
              contribution, and we would rather say so than claim the goal as an
              intention.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Target 9.5 we touch only in the ordinary way any student project
              does, and we do not claim it. What we would claim instead is the
              opposite sign: the same design that serves 9.4 works against 9.a,
              because a contained biological module needs capsules, a reactor
              and trained staff where chemical dosing needs none of them. That
              interaction is scored in the table below, and the tension is set
              out in full further down this room.
            </p>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                lineHeight: "1.35",
                fontWeight: "600",
                color: "#1f6f7d",
                margin: "36px 0 10px",
                textWrap: "balance",
              }}
            >
              Goal 13 — Climate action
            </h5>
            <div
              className="sus-prose-panel"
              style={{
                margin: "26px 0",
                padding: "22px 26px",
                borderRadius: "18px",
                background: "rgba(31,124,140,0.07)",
                border: "1px solid rgba(31,124,140,0.18)",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "14.5px",
                  lineHeight: "1.7",
                  color: "var(--ink-soft)",
                }}
              >
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  Target 13.2:{" "}
                </strong>
                <em>
                  Integrate climate change measures into national policies,
                  strategies and planning.
                </em>
                <a className="lab-citation" href="#ref-r01-15">
                  [15]
                </a>
              </p>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              We interact with goal 13, but we do not claim it. Our own life
              cycle assessment places rePhlow{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                above{" "}
              </strong>
              the chemical route on climate change at current bead performance,
              and we are not going to list as an achievement something our own
              instruments contradict. The analysis and the single variable that
              would reverse it are in Room 03.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              There is another relevant reason to why this goal sits here rather
              than among the three we analysed before. Goal 13’s targets are
              addressed to{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                states
              </strong>
              , not to technologies: they concern national planning, climate
              finance, adaptive capacity and education, and none of them asks a
              process to lower its emissions.{" "}
              <a className="lab-citation" href="#ref-r01-15">
                [15]
              </a>{" "}
              Target 13.2, which focuses on the integration of climate measures
              into national policy, reaches rePhlow’s goal indirectly, as the
              industrial technology designed was built alongside the planning.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              What makes this a constraint rather than a contradiction is that
              it answers to one number, which is phosphorus captured per gram of
              bead. After a threshold our own sensitivity analysis identifies,
              this flips completely. We are not there yet, and we will not score
              ourselves as if we were. Until then, climate is a{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                declared cost
              </strong>{" "}
              of this project rather than a contribution to it, and it is marked
              as a tension on our <em>Sustainability Model Canvas</em> (see Room
              04) rather than as a goal.
            </p>
            <h4
              id="r01-reading-the-interactions-the-nilsson-sca"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "21px",
                lineHeight: "1.3",
                fontWeight: "600",
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                margin: "44px 0 12px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              Reading the interactions: the Nilsson scale
            </h4>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Goals do not stand in separate rooms. To avoid calling every
              interaction ‘positive’ and moving on, we scored them on the
              seven-point scale proposed by Nilsson, Griggs and Visbeck,{" "}
              <a className="lab-citation" href="#ref-r01-17">
                [17]
              </a>{" "}
              running from +3 (indivisible) through 0 (consistent) to -3
              (cancelling).
            </p>
            <p
              style={{
                margin: "34px 0 10px",
                fontSize: "13.5px",
                lineHeight: "1.55",
                color: "var(--ink-soft)",
              }}
            >
              <b
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Table 1.
              </b>{" "}
              Scored interactions between rePhlow's targets and other SDGs, on
              the Nilsson–Griggs–Visbeck scale, assuming a mid-sized European
              facility, current bead performance and intact containment.
            </p>
            <div
              style={{
                margin: "10px 0 28px",
                overflowX: "auto",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "#fff",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14.5px",
                  minWidth: "560px",
                }}
              >
                <tbody>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Interaction
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Score
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Why
                    </th>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                      }}
                    >
                      6.3 → 14.1
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#4d6a2a",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      +2 reinforcing
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Nutrients stopped at an industrial outfall never reach the
                      coast, nitrogen as well as phosphorus.{" "}
                      <a className="lab-citation" href="#ref-r01-12">
                        [12]
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                      }}
                    >
                      12.5 → 6.3
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#4d6a2a",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      +2 reinforcing
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Recovery is what stops water treatment from becoming
                      sludge production.{" "}
                      <a className="lab-citation" href="#ref-r01-13">
                        [13]
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                      }}
                    >
                      12.2 → 2.4
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#4d6a2a",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      +1 enabling
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Recovered phosphorus is a local source of an input that
                      currently crosses a continent. (project description)
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                      }}
                    >
                      6.3 → 15.1
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#4d6a2a",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      +1 enabling
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Every kilogramme recovered is a kilogramme not mined from
                      phosphate rock.{" "}
                      <a className="lab-citation" href="#ref-r01-7">
                        [7]
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                      }}
                    >
                      12.2 → 9.4
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#4d6a2a",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      +1 enabling
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      A modular design allows existing facilities to upgrade
                      their existing equipment without rebuilding their
                      treatment lines (see{" "}
                      <a href="/hardware" className="lab-wikilink">
                        Hardware
                      </a>
                      )
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                      }}
                    >
                      12.2 → 13.2
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#c2441f",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      -1 constraining (today)
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Bead production dominates our carbon footprint (see room
                      03)
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                      }}
                    >
                      6.3 → 7.3
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#c2441f",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      -1 constraining
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Continuous operation and downstream recovery consume
                      energy that chemical dosing does not.{" "}
                      <a className="lab-citation" href="#ref-r01-13">
                        [13]
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                      }}
                    >
                      12.2 → 9.a
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#c2441f",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      -1 constraining
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      A contained biological module is more expensive and
                      skill-dependent compared to the traditional chemical
                      method.{" "}
                      <a className="lab-citation" href="#ref-r01-13">
                        [13]
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                      }}
                    >
                      12.4 → 14.1
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#c2441f",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      -1 constraining (conditional)
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      An engineered organism in a waste stream is a risk to the
                      same waters it protects, unless containment holds.{" "}
                      <a className="lab-citation" href="#ref-r01-16">
                        [16]
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="sus-prose-panel"
              style={{
                margin: "26px 0",
                padding: "22px 26px",
                borderRadius: "18px",
                background: "var(--water-clear)",
                border: "1px solid rgba(31,124,140,0.12)",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  color: "var(--ink-soft)",
                }}
              >
                Scores of this kind depend on the context and on the assumptions
                behind them, as the authors of the framework themselves
                acknowledge.{" "}
                <a className="lab-citation" href="#ref-r01-18">
                  [18]
                </a>{" "}
                Ours assume a mid-sized European industrial facility, current
                bead performance, and an intact containment barrier. Change any
                of those and the score changes with it.
              </p>
              <p
                style={{
                  margin: "14px 0 0",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  color: "var(--ink-soft)",
                }}
              >
                Energy is the clearest example. That −1 is scored at the plant
                gate and against today's practice, and three things pull it in
                different directions over time. A decarbonising grid lowers the
                climate cost of the same kilowatt-hours, though it does not
                improve efficiency itself, which is what target 7.3 actually
                measures. The sector is meanwhile moving towards energy-neutral
                treatment plants, so the benchmark our demand is compared
                against is getting stricter rather than looser. And widening the
                boundary cuts the other way: phosphorus recovered is phosphorus
                that does not have to be mined, and mining carries an energy and
                emissions cost of its own.{" "}
                <a className="lab-citation" href="#ref-r01-19">
                  [19]
                </a>{" "}
                We score the interaction as it stands today, and name what would
                move it.
              </p>
            </div>
            <h4
              id="r01-three-tensions-we-are-not-going-to-smoot"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "21px",
                lineHeight: "1.3",
                fontWeight: "600",
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                margin: "44px 0 12px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              Three tensions we are not going to smooth over
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                gap: "16px",
                margin: "22px 0 30px",
              }}
            >
              <div
                style={{
                  background: "rgba(226,84,45,0.05)",
                  border: "1px solid rgba(226,84,45,0.2)",
                  borderRadius: "18px",
                  padding: "20px 22px",
                  fontSize: "14.5px",
                  lineHeight: "1.62",
                  color: "var(--ink-soft)",
                }}
              >
                <h5
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "17px",
                    lineHeight: "1.3",
                    fontWeight: "600",
                    color: "#b03c1b",
                  }}
                >
                  A moving baseline
                </h5>
                <p style={{ margin: "0" }}>
                  Directive (EU) 2024/3019 raises the bar for everyone, not only
                  for us.{" "}
                  <a className="lab-citation" href="#ref-r01-2">
                    [2]
                  </a>{" "}
                  The chemical precipitation of 2033 will be better optimised
                  than the chemical precipitation we benchmarked against in Room
                  03, so being an improvement on today’s practice is not the
                  same as being an improvement on the practice we will be
                  competing against. Our comparison is honest about the present
                  and cautious about the future.
                </p>
              </div>
              <div
                style={{
                  background: "rgba(226,84,45,0.05)",
                  border: "1px solid rgba(226,84,45,0.2)",
                  borderRadius: "18px",
                  padding: "20px 22px",
                  fontSize: "14.5px",
                  lineHeight: "1.62",
                  color: "var(--ink-soft)",
                }}
              >
                <h5
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "17px",
                    lineHeight: "1.3",
                    fontWeight: "600",
                    color: "#b03c1b",
                  }}
                >
                  Access
                </h5>
                <p style={{ margin: "0" }}>
                  Iron (III) chloride is cheap, being readily available to
                  almost any operator in the world to use.{" "}
                  <a className="lab-citation" href="#ref-r01-13">
                    [13]
                  </a>{" "}
                  rePhlow needs capsules, a reactor, and someone trained to run
                  it. If our technology works, the facilities that adopt it
                  first will be well-resourced and in well-regulated countries —
                  a cost to the objectives of goals 9 and 10 to build
                  sustainable infrastructure everywhere, regardless of cost.
                </p>
              </div>
              <div
                style={{
                  background: "rgba(226,84,45,0.05)",
                  border: "1px solid rgba(226,84,45,0.2)",
                  borderRadius: "18px",
                  padding: "20px 22px",
                  fontSize: "14.5px",
                  lineHeight: "1.62",
                  color: "var(--ink-soft)",
                }}
              >
                <h5
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "17px",
                    lineHeight: "1.3",
                    fontWeight: "600",
                    color: "#b03c1b",
                  }}
                >
                  Containment
                </h5>
                <p style={{ margin: "0" }}>
                  <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                    .
                  </strong>{" "}
                  Every environmental benefit above assumes the organism stays
                  inside the reactor. Encapsulation, the closed vessel and cell
                  retention exist for that reason, and an industrial operator
                  told us plainly that nothing else would be discussed until
                  that evidence existed.{" "}
                  <a href="#r04" className="lab-wikilink">
                    see Room 04
                  </a>{" "}
                  Two pieces of that evidence now exist: the core–shell
                  architecture has been confirmed experimentally, and the
                  capsules hold their integrity under reactor operation. (See{" "}
                  <a href="/hardware" className="lab-wikilink">
                    Hardware
                  </a>
                  ) Structural integrity is not the same as biological
                  retention, though: an intact capsule can still release cells
                  at its surface, and only a count of viable cells in the
                  effluent over operating time can tell us whether ours does.
                </p>
              </div>
            </div>
            <details
              style={{
                margin: "48px 0 8px",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "var(--paper-soft)",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  padding: "15px 22px",
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "var(--ink)",
                }}
              >
                References
              </summary>
              <ol
                style={{
                  margin: "0",
                  padding: "2px 26px 20px 48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <li
                  id="ref-r01-1"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  United Nations Department of Economic and Social Affairs. Goal
                  6: Ensure availability and sustainable management of water and
                  sanitation for all [Internet]. New York: United Nations;
                  [cited 2026 Oct 7]. Available from:{" "}
                  <a
                    href="https://sdgs.un.org/goals/goal6"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://sdgs.un.org/goals/goal6
                  </a>
                </li>
                <li
                  id="ref-r01-2"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Directive (EU) 2024/3019 of the European Parliament and of the
                  Council of 27 November 2024 concerning urban wastewater
                  treatment (recast). Off J Eur Union. 2024 Dec 12;L 2024/3019.
                  Available from:{" "}
                  <a
                    href="https://eur-lex.europa.eu/eli/dir/2024/3019/oj/eng"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://eur-lex.europa.eu/eli/dir/2024/3019/oj/eng
                  </a>
                </li>
                <li
                  id="ref-r01-3"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Wurtsbaugh WA, Paerl HW, Dodds WK. Nutrients, eutrophication
                  and harmful algal blooms along the freshwater to marine
                  continuum. WIREs Water. 2019;6(5):e1373. Available from:{" "}
                  <a
                    href="https://doi.org/10.1002/wat2.1373"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1002/wat2.1373
                  </a>
                </li>
                <li
                  id="ref-r01-4"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  European Environment Agency. Europe's state of water 2024: the
                  need for improved water resilience [Internet]. Copenhagen:
                  European Environment Agency; 2024 [cited 2026 Oct 7]. Report
                  No.: 07/2024. Available from:{" "}
                  <a
                    href="https://www.eea.europa.eu/en/analysis/publications/europes-state-of-water-2024"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://www.eea.europa.eu/en/analysis/publications/europes-state-of-water-2024
                  </a>
                </li>
                <li
                  id="ref-r01-5"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Zhang Y, Li M, Dong J, Yang H, Van Zwieten L, Lu H, et al. A
                  critical review of methods for analyzing freshwater
                  eutrophication. Water. 2021;13(2):225. Available from:{" "}
                  <a
                    href="https://doi.org/10.3390/w13020225"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.3390/w13020225
                  </a>
                </li>
                <li
                  id="ref-r01-6"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  United Nations Department of Economic and Social Affairs. Goal
                  12: Ensure sustainable consumption and production patterns
                  [Internet]. New York: United Nations; [cited 2026 Oct 7].
                  Available from:{" "}
                  <a
                    href="https://sdgs.un.org/goals/goal12"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://sdgs.un.org/goals/goal12
                  </a>
                </li>
                <li
                  id="ref-r01-7"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Cordell D, Drangert JO, White S. The story of phosphorus:
                  global food security and food for thought. Glob Environ
                  Change. 2009;19(2):292–305. Available from:{" "}
                  <a
                    href="https://doi.org/10.1016/j.gloenvcha.2008.10.009"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1016/j.gloenvcha.2008.10.009
                  </a>
                </li>
                <li
                  id="ref-r01-8"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  U.S. Geological Survey. Mineral commodity summaries 2026.
                  Version 1.1. Reston (VA): U.S. Geological Survey; 2026.
                  Available from:{" "}
                  <a
                    href="https://doi.org/10.3133/mcs2026"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.3133/mcs2026
                  </a>
                </li>
                <li
                  id="ref-r01-9"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  United Nations Department of Economic and Social Affairs. Goal
                  14: Conserve and sustainably use the oceans, seas and marine
                  resources for sustainable development [Internet]. New York:
                  United Nations; [cited 2026 Oct 7]. Available from:{" "}
                  <a
                    href="https://sdgs.un.org/goals/goal14"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://sdgs.un.org/goals/goal14
                  </a>
                </li>
                <li
                  id="ref-r01-10"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  De Raús Maúre E, Terauchi G, Ishizaka J, Clinton N, DeWitt M.
                  Globally consistent assessment of coastal eutrophication. Nat
                  Commun. 2021;12:6142. Available from:{" "}
                  <a
                    href="https://doi.org/10.1038/s41467-021-26391-9"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1038/s41467-021-26391-9
                  </a>
                </li>
                <li
                  id="ref-r01-11"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Cabello V, Brugnach M. Whose waters, whose nutrients?
                  Knowledge, uncertainty, and controversy over eutrophication in
                  the Mar Menor. Ambio. 2023;52(6):1112–24. Available from:{" "}
                  <a
                    href="https://doi.org/10.1007/s13280-023-01846-z"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1007/s13280-023-01846-z
                  </a>
                </li>
                <li
                  id="ref-r01-12"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Conley DJ, Paerl HW, Howarth RW, Boesch DF, Seitzinger SP,
                  Havens KE, et al. Controlling eutrophication: nitrogen and
                  phosphorus. Science. 2009;323(5917):1014–5. Available from:{" "}
                  <a
                    href="https://doi.org/10.1126/science.1167755"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1126/science.1167755
                  </a>
                </li>
                <li
                  id="ref-r01-13"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Rittmann BE, McCarty PL. Environmental biotechnology:
                  principles and applications. 2nd ed. New York: McGraw-Hill
                  Education; 2020.
                </li>
                <li
                  id="ref-r01-14"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  United Nations Department of Economic and Social Affairs. Goal
                  9: Build resilient infrastructure, promote inclusive and
                  sustainable industrialization and foster innovation
                  [Internet]. New York: United Nations; [cited 2026 Oct 7].
                  Available from:{" "}
                  <a
                    href="https://sdgs.un.org/goals/goal9"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://sdgs.un.org/goals/goal9
                  </a>
                </li>
                <li
                  id="ref-r01-15"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  United Nations Department of Economic and Social Affairs. Goal
                  13: Take urgent action to combat climate change and its
                  impacts [Internet]. New York: United Nations; [cited 2026 Oct
                  7]. Available from:{" "}
                  <a
                    href="https://sdgs.un.org/goals/goal13"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://sdgs.un.org/goals/goal13
                  </a>
                </li>
                <li
                  id="ref-r01-16"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Directive 2009/41/EC of the European Parliament and of the
                  Council of 6 May 2009 on the contained use of genetically
                  modified micro-organisms (recast). Off J Eur Union. 2009 May
                  21;L 125:75–97. Available from:{" "}
                  <a
                    href="https://eur-lex.europa.eu/eli/dir/2009/41/oj"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://eur-lex.europa.eu/eli/dir/2009/41/oj
                  </a>
                </li>
                <li
                  id="ref-r01-17"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Nilsson M, Griggs D, Visbeck M. Policy: map the interactions
                  between Sustainable Development Goals. Nature.
                  2016;534(7607):320–2. Available from:{" "}
                  <a
                    href="https://doi.org/10.1038/534320a"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1038/534320a
                  </a>
                </li>
                <li
                  id="ref-r01-18"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Nilsson M, Chisholm E, Griggs D, Howden-Chapman P, McCollum D,
                  Messerli P, et al. Mapping interactions between the
                  sustainable development goals: lessons learned and ways
                  forward. Sustain Sci. 2018;13(6):1489–503. Available from:{" "}
                  <a
                    href="https://doi.org/10.1007/s11625-018-0604-z"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1007/s11625-018-0604-z
                  </a>
                </li>
                <li
                  id="ref-r01-19"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Zhao Q, Ying H, Liu Y, Wang H, Xu J, Wang W, et al. Towards
                  low energy-carbon footprint: current versus potential P
                  recovery paths in domestic wastewater treatment plants. J
                  Environ Manage. 2023;344:118653. Available from:{" "}
                  <a
                    href="https://doi.org/10.1016/j.jenvman.2023.118653"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1016/j.jenvman.2023.118653
                  </a>
                </li>
              </ol>
            </details>
          </section>
          <section
            id="r02"
            data-screen-label="Room 02"
            style={{
              scrollMarginTop: "110px",
              padding: "72px 0 28px",
              borderTop: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                background: "#4a6629",
                borderRadius: "28px",
                padding: "clamp(20px,3vw,34px)",
                margin: "4px 0 30px",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "18px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "clamp(70px,9vw,104px)",
                    lineHeight: "0.8",
                    letterSpacing: "-0.05em",
                    color: "#DDEAC8",
                  }}
                >
                  02
                </span>
                <h2
                  style={{
                    margin: "0 0 2px",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(30px,3.8vw,40px)",
                    lineHeight: "1.1",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "15px",
                      letterSpacing: "0",
                      fontWeight: "600",
                      color: "#DDEAC8",
                      marginBottom: "8px",
                    }}
                  >
                    Operation
                  </span>
                  The operations core
                </h2>
              </div>
              <div style={{ position: "relative", margin: "28px 0 8px" }}>
                <div
                  style={{
                    borderRadius: "28px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-card)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/room02-operations.jpg")}
                    alt="The operations core: a control library of the rePhlow plant"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "clamp(260px,36vw,400px)",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: `${stagePos}`,
                    right: "3%",
                    bottom: "0",
                    marginTop: `${stageMt}`,
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "flex-end",
                    gap: "0",
                    maxWidth: "94%",
                    pointerEvents: "none",
                    zIndex: "2",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/phlowi-2.png")}
                    alt="Phlowi at the control table"
                    style={{
                      width: `${mascotW}`,
                      height: "auto",
                      flex: "none",
                      filter: "drop-shadow(0 16px 22px rgba(27,35,64,0.38))",
                      animation: "bob 5s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      margin: "0 0 26px",
                      maxWidth: `${speechMax}`,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.85)",
                      borderRadius: "22px",
                      padding: "16px 20px",
                      boxShadow: "var(--shadow-soft)",
                      pointerEvents: "auto",
                    }}
                  >
                    <p
                      style={{
                        margin: "0",
                        fontSize: "15.5px",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        textWrap: "pretty",
                      }}
                    >
                      “The goals are on the wall in the lobby. This room is
                      where we show you who put them there. Every change on this
                      map came from someone outside the lab — follow the pipes
                      to the control panel when you are done.”
                    </p>
                    <p
                      style={{
                        margin: "12px 0 0",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--line)",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "15px",
                        lineHeight: "1.4",
                        color: "#56732f",
                        textWrap: "pretty",
                      }}
                    >
                      Did the team incorporate feedback from relevant
                      Sustainable Development Goals (SDG) stakeholders into
                      their work?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: "8px" }}></div>
            <h3
              id="r02-the-blueprint-on-the-wall-our-sustainabi"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "29px",
                lineHeight: "1.2",
                fontWeight: "600",
                letterSpacing: "-0.015em",
                color: "var(--ink)",
                margin: "64px 0 18px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              The blueprint on the wall — Our Sustainability Model Canvas (SMC)
            </h3>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              The key to understanding who helped shape crucial changes in
              rePhlow is seeing the map they changed it on. Our sustainability
              Model Canvas, built on the format developed by{" "}
              <a
                href="https://2024.igem.wiki/hangzhou-biox/sustainable"
                className="lab-wikilink"
                target="_blank"
                rel="noopener"
              >
                iGEM Team Hangzhou Bio-X (2024)
              </a>
              <a className="lab-citation" href="#ref-r02-1">
                [1]
              </a>
              , sets the stages of the rePhlow route against the goals each
              stage touches and the people who hold a stake in it. The left side
              of the SMC shows where our decisions land on the SDGs; the right
              side shows who was in the room when those decisions were made.
            </p>
            <figure style={{ margin: "34px 0" }}>
              <div
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid var(--line)",
                  background: "#fff",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <img
                  src={asset("assets/sustainability/smc-canvas.png")}
                  alt="rePhlow Sustainability Model Canvas"
                  onClick={zoom}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    cursor: "zoom-in",
                  }}
                />
              </div>
              <figcaption
                style={{
                  margin: "12px 0 0",
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                  textWrap: "pretty",
                }}
              >
                <b
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "600",
                    color: "var(--ink)",
                  }}
                >
                  Figure 1.
                </b>{" "}
                Sustainability Model Canvas: the stages of the rePhlow route
                (left panel), the SDG targets each stage acts on, and the
                stakeholder groups involved at each stage, grouped by economic
                sector and ordered by their degree of participation (right
                panel). Participation here refers to involvement in the system
                itself, not the extent of our engagement with each group: who we
                spoke to is documented separately in{" "}
                <a href="/human-practices" className="lab-wikilink">
                  Human Practices
                </a>
                .{" "}
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  The canvas maps the route as designed, not as demonstrated.
                </strong>{" "}
                Regulation-compliant discharge is the target the process is the
                reference that guides the engineering and design; the polishing
                stage that would deliver it has not yet been validated, and{" "}
                <a href="#r03" className="lab-wikilink">
                  Room 03
                </a>{" "}
                reports those water figures as projections. A single group can
                hold several roles at once: Bio-Oils is simultaneously an
                effluent producer, a potential end user and a source of design
                constraints. Format adapted from iGEM Hangzhou-BioX (2024),{" "}
                <a className="lab-citation" href="#ref-r02-1">
                  [1]
                </a>{" "}
                whose canvas maps an entire industry; ours maps a single route
                through the phosphorus cycle, in which rePhlow is one node
                rather than the system itself.
              </figcaption>
            </figure>
            <h4
              id="r02-an-honest-word-about-what-sdg-stakeholde"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "21px",
                lineHeight: "1.3",
                fontWeight: "600",
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                margin: "44px 0 12px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              An honest word about what “SDG stakeholder” means to our analysis
            </h4>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Throughout the development of our project, we documented
              twenty-two conversations with frontline perspectives relevant to
              our objectives and goals. Seven of them changed how rePhlow works
              against a specific goal, which are detailed below. The rest are
              recorded in full in{" "}
              <a href="/human-practices" className="lab-wikilink">
                Human Practices
              </a>
              .
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              When interviews took place, we did not walk into them holding a
              list of goals, we walked in holding technical problems: which
              chassis, which discharge limit, which containment barriers. We
              focused on the goals after our conversations, reading the feedback
              we received against the targets we selected. We realised that
              almost every conversation had one of the SDGs present.
            </p>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                lineHeight: "1.35",
                fontWeight: "600",
                color: "#56732f",
                margin: "36px 0 10px",
                textWrap: "balance",
              }}
            >
              What each voice changed
            </h5>
            <p
              style={{
                margin: "34px 0 10px",
                fontSize: "13.5px",
                lineHeight: "1.55",
                color: "var(--ink-soft)",
              }}
            >
              <b
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Table 2.
              </b>{" "}
              The seven stakeholder conversations that changed how rePhlow works
              against a specific SDG target, with the design consequence of
              each.
            </p>
            <div
              style={{
                margin: "10px 0 28px",
                overflowX: "auto",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "#fff",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14.5px",
                  minWidth: "560px",
                }}
              >
                <tbody>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Stakeholder
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      SDG it speaks to
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      What only they could tell us about it
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      What changed in rePhlow
                    </th>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Bio-Oils Huelva (<em>industry, Mar 2025</em>)
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      12.2, 12.5
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      They provided a real degumming effluent, including its
                      phosphorus percentage, pH and temperature.
                      <br />
                      <br />
                      They told us that a mid-sized producer cannot rebuild a
                      treatment line around an experiment.
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      The data provided became basis to generate synthetic
                      wastewater for crucial experiments.
                      <br />
                      <br />
                      Phosphorus removal became recovery; the design became
                      modular and compatible.
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      CEDEX (<em>public water body, Oct 2025</em>)
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      6.3
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Our colorimetric assay is a first approximation, not a
                      reference method.
                      <br />
                      <br />
                      Technologies being produced get compared against
                      established treatment legislation.
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      We stopped presenting the assay as finished.
                      <br />
                      <br />
                      We started designing against actual EU discharge limits
                      rather than just deeming our process ‘clean enough’
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Repsol (<em>large operator, Oct 2025</em>)
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      12.4
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Living engineered organisms are not acceptable without
                      convincing evidence that release has been prevented.
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Bacterial containment became a precondition to our design.
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Eduardo García Junceda <em>(IQOG-CSIC, Sep 2025)</em>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      12.5, 12.2
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      That our endpoint was wrong: the enzyme recycles ATP, so
                      accumulation was never the destination — and polyphosphate
                      is by far the cheapest phosphate donor available for
                      regenerating it.
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      The waste stream and the energy source became the same
                      thing. We adopted a coupled PPK2/DHAK system that turns
                      stored polyphosphate into DHAP, and rePhlow stopped
                      depending on a single product.
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Inmaculada Alonso (
                      <em>resident, San Juan Reservoir, Jul 2025</em>)
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      6.b
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      She had watched the water change for decades and had never
                      been told why.
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Communication became a central focus to our mission.
                      <br />
                      <br />
                      We visited the reservoir to measure, with samples, what
                      she had described.
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Schools, workshop and museum audiences
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      6.b
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      The question we heard more frequently was the safety of
                      the technology and who it benefits, rather than its
                      effectiveness.
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      We developed a no-release framing and educational
                      materials, built from the questions people actually asked.
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Carmen García Payo, Loreto García Fernández and Álvaro
                      Ferrero (
                      <em>academic advisors, Jun 2025 and Mar 2026)</em>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      12.5
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      With the basket reactor adopted, our Y-filter had become
                      redundant, and testing ultrafiltration was not feasible at
                      the pressures available to us. We had to approach the
                      stage theoretically rather than claim it as evidence.
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      We removed the filter instead of keeping a component we
                      could not justify. This removed its materials, sludge, and
                      end-of-life problem. <br />
                      <br />
                      The membrane polishing was reclassified as a scale-up
                      concept rather than a demonstrated result; in room 03,
                      water quality is now labelled as projections.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Human Practices records what each conversation was. This room
              records what each conversation knew that we could not have found
              anywhere else.
            </p>
            <div
              className="sus-prose-panel"
              style={{
                margin: "26px 0",
                padding: "22px 26px",
                borderRadius: "18px",
                background: "rgba(226,84,45,0.05)",
                border: "1px solid rgba(226,84,45,0.2)",
              }}
            >
              <h5
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-display)",
                  fontSize: "17px",
                  lineHeight: "1.3",
                  fontWeight: "600",
                  color: "#b03c1b",
                }}
              >
                The voice we do not have
              </h5>
              <p
                style={{
                  margin: "0",
                  fontSize: "15px",
                  lineHeight: "1.68",
                  color: "var(--ink-soft)",
                }}
              >
                Every stakeholder above speaks to goal 6 or goal 12. None speaks
                to target 14.1, and that is the honest position: the party most
                affected by nutrient pollution in coastal and inland waters
                cannot be interviewed, and we have not yet spoken to an
                organisation that represents it. Our evidence for that target is
                our own field sampling, not a consulted voice.
              </p>
            </div>
            <h4
              id="r02-closing-the-loops"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "21px",
                lineHeight: "1.3",
                fontWeight: "600",
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                margin: "44px 0 12px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              Closing the loops
            </h4>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Everything above this point is a conversation that changed
              rePhlow. This section runs the other way. Near the end of the
              project, we went back to people who had already shaped it. We
              carried the revised work rather than the original question, asking
              whether what we had changed was what they meant. A loop is closed
              when the revised design has gone back to the person whose input
              started it. These are the ones we were able to close.
            </p>
            <h4
              id="r02-cedex-roberto-arranz-arranz"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "21px",
                lineHeight: "1.3",
                fontWeight: "600",
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                margin: "44px 0 12px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              CEDEX — Roberto Arranz Arranz
            </h4>
            <div
              className="sus-prose-panel"
              style={{
                margin: "26px 0",
                padding: "22px 26px",
                borderRadius: "18px",
                background: "#ffffff",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "12px",
                }}
              >
                <div style={{ fontSize: "16px" }}>
                  <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                    Roberto Arranz Arranz, Programme Director, CEDEX
                  </strong>
                </div>
                <div style={{ fontSize: "14px", color: "var(--ink-soft)" }}>
                  Date: 6 October 2026
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(110px,150px) 1fr",
                  gap: "12px",
                  padding: "12px 0",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "600",
                    fontSize: "14.5px",
                    color: "var(--ink)",
                  }}
                >
                  Question
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.6",
                    color: "var(--ink-soft)",
                  }}
                >
                  Having read what we changed after CEDEX, where is this
                  sustainability case still weak?
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(110px,150px) 1fr",
                  gap: "12px",
                  padding: "12px 0",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "600",
                    fontSize: "14.5px",
                    color: "var(--ink)",
                  }}
                >
                  Challenge raised
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.6",
                    color: "var(--ink-soft)",
                  }}
                >
                  Our account rests on three pillars — technical, economic,
                  environmental — and treats the fourth, the social one, as
                  communication rather than as a design constraint.
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(110px,150px) 1fr",
                  gap: "12px",
                  padding: "12px 0",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "600",
                    fontSize: "14.5px",
                    color: "var(--ink)",
                  }}
                >
                  Response
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.6",
                    color: "var(--ink-soft)",
                  }}
                >
                  We adopted the four-pillar frame, named our likely points of
                  conflict, and opened repairability and capsule service life as
                  engineering questions rather than operational details.
                </div>
              </div>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Why we went back.
              </strong>{" "}
              In October 2025, CEDEX told us two things we had not wanted to
              hear: that our phosphorus assay was not a reference method, and
              that rePhlow was being designed against a generic idea of clean
              water rather than a legal limit. We changed both. Nearly a year
              later we sent the revised sustainability text to Roberto Arranz,
              Programme Director at CEDEX, and met him to go back over what that
              first conversation had produced. The meeting existed to check our
              own work, not to present it. This is the only engagement in this
              room where the revised version went back to the institution whose
              input produced it, and we note the limit of that: the loop closes
              at CEDEX rather than with the individual colleagues who opened it.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                The pillar we had written as an afterthought.
              </strong>{" "}
              Roberto set out sustainability as four pillars — technical,
              economic, environmental and social. We had written three. Our
              social evidence amounted to one conversation with a reservoir
              resident, and we had treated acceptance as something that follows
              a working technology rather than something that constrains its
              design.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              His argument was that a process fails socially in specific,
              predictable ways, and that a team can name them in advance instead
              of discovering them on site. For rePhlow he named three: rejection
              of a bacterial process as such, the complexity of the mechanism
              compared with dosing a chemical, and the ordinary nuisances of a
              treatment plant — odour, sludge handling — that decide whether
              neighbours accept a facility regardless of what it removes.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              The point he marked as most important was repairability, at the
              level of both the operator and the plant manager. Our hardware
              work had asked whether the reactor runs. It had not asked who
              repairs it, with what training, and how long the line is down
              meanwhile. Iron(III) chloride dosing fails in ways any plant
              operator already knows how to fix. A contained biological module
              does not, and that asymmetry belongs with the access tension we
              describe in Room 01 rather than apart from it.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              He also asked a question our own documentation cannot answer: how
              long do the alginate capsules hold up under operation? We report
              structural integrity under reactor conditions (see Hardware), but
              not service life. Until we can state it, we cannot state a
              replacement rate, and without a replacement rate our life cycle
              assessment rests on an assumption rather than a measurement —
              which matters, because bead production dominates our carbon
              footprint (Room 03).
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Where he saw the opening.
              </strong>{" "}
              On the economic pillar, Roberto described how the market for
              biodiesel exists because petrol is required to contain a
              proportion of it: the demand is created by the blending
              obligation, not by each producer separately. The mechanism is set
              out in the Renewable Energy Directive, which requires Member
              States to reach either a 29% renewable share in transport energy
              or a 14.5% reduction in transport greenhouse-gas intensity by
              2030, with a binding sub-target of 5.5% for advanced biofuels and
              renewable fuels of non-biological origin.{" "}
              <a className="lab-citation" href="#ref-r02-2">
                [2]
              </a>{" "}
              Applied to phosphorus, if mineral fertiliser were required to
              contain a fraction of nutrient recovered from wastewater, the
              demand would follow — and it would be demand for a pure product,
              which is precisely what distinguishes biological recovery from
              iron-bound chemical sludge. He contrasted this with the current
              practice of returning chemical sludge to agriculture, which he
              thought deserved more scrutiny than it gets.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              We had treated recovery as a technical result. He described the
              condition under which it becomes a market, which is the condition
              under which it reaches scale. This is not a hypothetical
              instrument: Directive (EU) 2024/3019 empowers the Commission to
              set a minimum combined reuse and recycling rate for phosphorus
              from sludge and urban wastewater, and asks Member States to
              encourage the purchase of recovered nutrients.{" "}
              <a className="lab-citation" href="#ref-r02-3">
                [3]
              </a>{" "}
              Roberto reached the mechanism from the market side; the Directive
              reaches it from the regulatory side. That convergence is the
              strongest evidence we have that target 12.2 has a route and not
              only an aspiration.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                One correction to our regulatory reading.
              </strong>{" "}
              Roberto pointed out that the urban wastewater framework governs
              urban discharges, not industrial ones, and that what determines
              the requirement for an industrial discharge is concentration and
              flow — with very high or very low flow treated as distinct cases.
              Where effluent goes directly to a watercourse, a concentration and
              quality study is carried out. We have gone back to Room 01 to
              check that our claim about regulatory pressure reaching industrial
              dischargers is stated with that precision.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              He also asked us to run the life cycle assessment under a
              renewable energy scenario. That analysis belongs to Room 03, where
              our climate result currently stands against us, and it is recorded
              there.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                What changes now.
              </strong>{" "}
              We went to Roberto for an audit, not for a design input, and an
              audit changes what you are entitled to say rather than what you
              have already built. It did that. A sustainability case resting on
              three pillars is no longer one we present as complete.
              Repairability and capsule service life have moved from things we
              had not thought to ask about to named engineering questions with a
              place in our roadmap. The social pillar has a set of specific
              conflicts to design against instead of a single interview.
              <br />
              The design itself has not moved, and it should not have on this
              timescale: a claim can be withdrawn in an afternoon, a reactor
              cannot. What we can show is that the last external reading of this
              work made it narrower rather than louder.
            </p>
            <div id="r02-what-stays-open" className="sus-disclosure">
              <AccordionSection title="What stays open">
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "16px",
                    lineHeight: "1.72",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  Closing one loop was enough to show us what the others would
                  have found. We went back to CEDEX expecting methods and
                  limits, the subjects of the first conversation, and were asked
                  instead about repair: who fixes the module, with what
                  training, and how long the line is down. That question did not
                  expose a gap in our engineering. It exposed a gap in who we
                  had spoken to.
                </p>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "16px",
                    lineHeight: "1.72",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  Everyone who redrew this project evaluates technology for a
                  living: a public water body, two large operators, three
                  academics. Not one of them would have to run the reactor at
                  three in the morning. The pattern is not random — it runs
                  along the line of who we found easy to approach. A student
                  team writes to an institution more readily than to a plant
                  operator on shift, and our evidence base shows it.
                </p>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "16px",
                    lineHeight: "1.72",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  That has a cost we can state precisely. Without an operator we
                  cannot claim anything about maintenance burden or downtime.
                  Without a permitting authority for an industrial discharge we
                  cannot claim a route to authorisation, only that the limits
                  exist. Without a farmer or a fertiliser buyer we cannot claim
                  that recovered phosphorus is wanted in the form we produce it,
                  which is the assumption our entire 12.2 argument rests on.
                  Those are three claims this project does not get to make yet,
                  and we have left them out rather than soften them.
                </p>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "16px",
                    lineHeight: "1.72",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  The next three conversations are therefore already determined,
                  and not by us: a plant operator, a permitting authority for an
                  industrial discharge, and a fertiliser user. Each one licenses
                  a claim we are currently not entitled to make. Closing those
                  loops is what the round table in Room 03 was convened to
                  begin, and we would rather publish the list of claims we have
                  not earned than a page where every voice happened to agree
                  with us.
                </p>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "16px",
                    lineHeight: "1.72",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                    Where the full record lives.{" "}
                  </strong>
                  The traceable record of concerns raised and limitations still
                  open is in the{" "}
                  <a href="/human-practices" className="lab-wikilink">
                    Responsibility Checkpoint
                  </a>
                  .
                </p>
              </AccordionSection>
            </div>
            <h3
              id="r02-what-has-to-be-true-next"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "29px",
                lineHeight: "1.2",
                fontWeight: "600",
                letterSpacing: "-0.015em",
                color: "var(--ink)",
                margin: "64px 0 18px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              What has to be true next
            </h3>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              The closing reflection names four conditions under which rePhlow's
              benefit would outweigh its cost. This section makes that list
              operational. Nothing here is new ambition: every item is a
              question already raised on this page, by an instrument or by a
              person, and left open on purpose. They are grouped by what they
              would settle, and several of them chain — the bench items feed the
              evidence items, and the evidence items are what the people items
              would judge.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(min(100%,340px),1fr))",
                gap: "16px",
                margin: "22px 0 30px",
              }}
            >
              <div
                style={{
                  background: "rgba(124,154,78,0.08)",
                  border: "1px solid rgba(124,154,78,0.24)",
                  borderRadius: "18px",
                  padding: "20px 22px",
                  fontSize: "14.5px",
                  lineHeight: "1.62",
                  color: "var(--ink-soft)",
                }}
              >
                <h5
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "17px",
                    lineHeight: "1.3",
                    fontWeight: "600",
                    color: "#56732f",
                  }}
                >
                  At the bench
                </h5>
                <AccordionSection
                  className="sus-panel-accordion"
                  title="Reach and hold ≥8 mg P per gram of bead under reactor conditions."
                >
                  <p className="sus-panel-accordion__body">
                    This is the single number our sensitivity analysis
                    identifies as the lever (Room 03). Below it, the climate
                    reading stands against us and we do not claim goal 13. Above
                    it, the climate and fossil-resource readings follow the rest
                    of the sixteen downward. The biology already does this
                    intracellularly; the work is in the expression and the bead.
                  </p>
                </AccordionSection>
                <AccordionSection
                  className="sus-panel-accordion"
                  title="Decarbonise the bead itself."
                >
                  <p className="sus-panel-accordion__body">
                    The same result can be reached from the materials side
                    rather than the performance side. The bacterial-alginate
                    route is named in Room 03 as a research direction not yet in
                    our inventory, and it is the second of the two moves the
                    circular-economy literature identifies as the condition for
                    nutrient recovery to be a net environmental good rather than
                    a tidier waste.
                  </p>
                </AccordionSection>
                <AccordionSection
                  className="sus-panel-accordion"
                  title="Measure capsule service life under operation."
                >
                  <p className="sus-panel-accordion__body">
                    Raised by CEDEX. We report structural integrity under
                    reactor conditions; we do not report how long that holds.
                    Without a service life there is no replacement rate, and
                    without a replacement rate the bead-production term that
                    dominates our footprint is an assumption rather than a
                    measurement. This is the item most other items depend on.
                  </p>
                </AccordionSection>
                <AccordionSection
                  className="sus-panel-accordion"
                  title="Count viable cells in the effluent over operating time."
                >
                  <p className="sus-panel-accordion__body">
                    Structural integrity is not biological retention: an intact
                    capsule can still release cells at its surface. Every
                    environmental benefit claimed anywhere on this page is
                    conditional on this measurement, and it is the one an
                    industrial operator told us would be discussed before
                    anything else.
                  </p>
                </AccordionSection>
                <AccordionSection
                  className="sus-panel-accordion"
                  title="Validate membrane polishing at achievable pressures."
                >
                  <p className="sus-panel-accordion__body">
                    Reclassified as a scale-up concept rather than a
                    demonstrated result, which is why the water-quality figures
                    in Room 03 are labelled as projections. Until this is
                    tested, the discharge-limit claim is a design target and not
                    a result.
                  </p>
                </AccordionSection>
              </div>
              <div
                style={{
                  background: "rgba(31,124,140,0.06)",
                  border: "1px solid rgba(31,124,140,0.18)",
                  borderRadius: "18px",
                  padding: "20px 22px",
                  fontSize: "14.5px",
                  lineHeight: "1.62",
                  color: "var(--ink-soft)",
                }}
              >
                <h5
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "17px",
                    lineHeight: "1.3",
                    fontWeight: "600",
                    color: "#1f6f7d",
                  }}
                >
                  On the evidence
                </h5>
                <AccordionSection
                  className="sus-panel-accordion"
                  title="Re-run the life cycle assessment under a renewable energy scenario."
                >
                  <p className="sus-panel-accordion__body">
                    Requested by Roberto Arranz. A decarbonising grid does not
                    improve process efficiency, which is what target 7.3
                    actually measures, but it does change the climate reading —
                    and we should know by how much before we describe the energy
                    interaction as fixed.
                  </p>
                </AccordionSection>
                <AccordionSection
                  className="sus-panel-accordion"
                  title="Treat repairability as a design variable."
                >
                  <p className="sus-panel-accordion__body">
                    Newly opened. Who repairs the module, with what training,
                    and how long the line is down. Chemical dosing fails in ways
                    every plant operator already knows how to fix; a contained
                    biological module does not, and that asymmetry is part of
                    the access tension rather than separate from it.
                  </p>
                </AccordionSection>
              </div>
              <div
                style={{
                  background: "rgba(110,90,150,0.07)",
                  border: "1px solid rgba(110,90,150,0.22)",
                  borderRadius: "18px",
                  padding: "20px 22px",
                  fontSize: "14.5px",
                  lineHeight: "1.62",
                  color: "var(--ink-soft)",
                }}
              >
                <h5
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "17px",
                    lineHeight: "1.3",
                    fontWeight: "600",
                    color: "#5e4c86",
                  }}
                >
                  With people
                </h5>
                <AccordionSection
                  className="sus-panel-accordion"
                  title="A plant operator, a permitting authority, and a fertiliser user."
                >
                  <p className="sus-panel-accordion__body">
                    The three voices absent from this room, each of which
                    licenses a claim we currently cannot make: maintenance
                    burden, route to authorisation, and whether recovered
                    phosphorus is wanted in the form we produce it.
                  </p>
                </AccordionSection>
                <AccordionSection
                  className="sus-panel-accordion"
                  title="A regulatory sandbox."
                >
                  <p className="sus-panel-accordion__body">
                    Two seats at our round table, from opposite ends of it,
                    independently named the same mechanism: a sandbox is how a
                    technology that current law cannot yet frame gets trialled
                    and then approved on the evidence. For a contained organism
                    that must demonstrate non-release over years rather than
                    weeks, it is not one route among several — it is the route.
                    Identifying the programme to apply to is a concrete next
                    step rather than a hope.
                  </p>
                </AccordionSection>
                <AccordionSection
                  className="sus-panel-accordion"
                  title="A mandated recycled-phosphorus content."
                >
                  <p className="sus-panel-accordion__body">
                    Directive (EU) 2024/3019{" "}
                    <a className="lab-citation" href="#ref-r02-2">
                      [2]
                    </a>{" "}
                    empowers the Commission to set a minimum combined reuse and
                    recycling rate for phosphorus and asks Member States to
                    encourage the purchase of recovered nutrients. Whether that
                    rate is set, and at what level, decides whether recovered
                    phosphorus competes with mined phosphorus on price alone. We
                    cannot act on this one; we can state that our 12.2 argument
                    is exposed to it.
                  </p>
                </AccordionSection>
              </div>
            </div>
            <div
              style={{
                background: "rgba(226,84,45,0.06)",
                border: "1px solid rgba(226,84,45,0.2)",
                borderRadius: "18px",
                padding: "20px 22px",
                fontSize: "14.5px",
                lineHeight: "1.62",
                color: "var(--ink-soft)",
              }}
            >
              <h5
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-display)",
                  fontSize: "17px",
                  lineHeight: "1.3",
                  fontWeight: "600",
                  color: "#b03c1b",
                }}
              >
                What we are not claiming
              </h5>
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: "14.5px",
                  lineHeight: "1.65",
                  color: "var(--ink-soft)",
                  textWrap: "pretty",
                }}
              >
                A screening LCA is not a certificate. Structural capsule
                integrity is not biological retention. A laboratory accumulation
                figure is not a plant running for a year. Everything above is
                the distance between those pairs, written down so that the
                distance can be checked rather than assumed.
              </p>
            </div>
            <details
              style={{
                margin: "48px 0 8px",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "var(--paper-soft)",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  padding: "15px 22px",
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "var(--ink)",
                }}
              >
                References
              </summary>
              <ol
                style={{
                  margin: "0",
                  padding: "2px 26px 20px 48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <li
                  id="ref-r02-1"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  iGEM Team Hangzhou-BioX. Sustainable development [Internet].
                  Boston (MA): iGEM Foundation; 2024 [cited 2026 Oct 12].
                  Available from:{" "}
                  <a
                    href="https://2024.igem.wiki/hangzhou-biox/sustainable"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://2024.igem.wiki/hangzhou-biox/sustainable
                  </a>
                </li>
                <li
                  id="ref-r02-2"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Directive (EU) 2023/2413 of the European Parliament and of the
                  Council of 18 October 2023 amending Directive (EU) 2018/2001,
                  Regulation (EU) 2018/1999 and Directive 98/70/EC as regards
                  the promotion of energy from renewable sources, and repealing
                  Council Directive (EU) 2015/652. Off J Eur Union. 2023 Oct
                  31;L 2023/2413. Available from:{" "}
                  <a
                    href="https://eur-lex.europa.eu/eli/dir/2023/2413/oj"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://eur-lex.europa.eu/eli/dir/2023/2413/oj
                  </a>
                </li>
                <li
                  id="ref-r02-3"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Directive (EU) 2024/3019 of the European Parliament and of the
                  Council of 27 November 2024 concerning urban wastewater
                  treatment (recast). Off J Eur Union. 2024 Dec 12;L 2024/3019.
                  Available from:{" "}
                  <a
                    href="https://eur-lex.europa.eu/eli/dir/2024/3019/oj/eng"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://eur-lex.europa.eu/eli/dir/2024/3019/oj/eng
                  </a>
                </li>
              </ol>
            </details>
          </section>
          <section
            id="r03"
            data-screen-label="Room 03"
            style={{
              scrollMarginTop: "110px",
              padding: "72px 0 28px",
              borderTop: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                background: "#1B2340",
                borderRadius: "28px",
                padding: "clamp(20px,3vw,34px)",
                margin: "4px 0 30px",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "18px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "clamp(70px,9vw,104px)",
                    lineHeight: "0.8",
                    letterSpacing: "-0.05em",
                    color: "#BFE3EE",
                  }}
                >
                  03
                </span>
                <h2
                  style={{
                    margin: "0 0 2px",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(30px,3.8vw,40px)",
                    lineHeight: "1.1",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "15px",
                      letterSpacing: "0",
                      fontWeight: "600",
                      color: "#BFE3EE",
                      marginBottom: "8px",
                    }}
                  >
                    Measurement
                  </span>
                  The control and metrics panel
                </h2>
              </div>
              <div style={{ position: "relative", margin: "28px 0 8px" }}>
                <div
                  style={{
                    borderRadius: "28px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-card)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/room03-control.jpg")}
                    alt="The control and metrics panel: a screen-lit control room"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "clamp(260px,36vw,400px)",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: `${stagePos}`,
                    left: "3%",
                    bottom: "0",
                    marginTop: `${stageMt}`,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: "0",
                    maxWidth: "94%",
                    pointerEvents: "none",
                    zIndex: "2",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/phlowi-3.png")}
                    alt="Phlowi at the metrics console"
                    style={{
                      width: `${mascotW}`,
                      height: "auto",
                      flex: "none",
                      filter: "drop-shadow(0 16px 22px rgba(27,35,64,0.38))",
                      animation: "bob 5s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      margin: "0 0 26px",
                      maxWidth: `${speechMax}`,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.85)",
                      borderRadius: "22px",
                      padding: "16px 20px",
                      boxShadow: "var(--shadow-soft)",
                      pointerEvents: "auto",
                    }}
                  >
                    <p
                      style={{
                        margin: "0",
                        fontSize: "15.5px",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        textWrap: "pretty",
                      }}
                    >
                      “The lights dim, the screens glow. This is the room where
                      opinions are not allowed. Here we only read instruments.”
                    </p>
                    <p
                      style={{
                        margin: "12px 0 0",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--line)",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "15px",
                        lineHeight: "1.4",
                        color: "#1B2340",
                        textWrap: "pretty",
                      }}
                    >
                      Has the team's work measurably and significantly addressed
                      one or more SDGs?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: "8px" }}></div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Anyone can call a project green. The hard part is to put a number
              on it, so before we tell you rePhlow is sustainable we built the
              instruments that check. Every reading comes from a full{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                life cycle assessment
              </strong>{" "}
              under ISO 14040/44,{" "}
              <a className="lab-citation" href="#ref-r03-1">
                [1]
              </a>{" "}
              scored with the European Commission's{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Environmental Footprint (EF 3.1)
              </strong>{" "}
              method,{" "}
              <a className="lab-citation" href="#ref-r03-2">
                [2]
              </a>{" "}
              the reference framework for environmental claims in the EU. It
              does not hand out one convenient green light: it hands out{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                sixteen
              </strong>{" "}
              readings, each normalised against the yearly impact of an average
              world citizen,{" "}
              <a className="lab-citation" href="#ref-r03-9">
                [9]
              </a>{" "}
              and it forces us to source every figure. The inventory was built
              in{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                openLCA 2.6
              </strong>{" "}
              with the free{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                BAFU:2026
              </strong>{" "}
              background database and the EF 3.1 (adapted) method, as an
              attributional, prospective, screening-level study.
            </p>
            <div
              className="sus-prose-panel"
              style={{
                margin: "26px 0",
                padding: "22px 26px",
                borderRadius: "18px",
                background: "var(--water-clear)",
                border: "1px solid rgba(31,124,140,0.12)",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  color: "var(--ink-soft)",
                }}
              >
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  The measuring stick (functional unit).
                </strong>{" "}
                Every number answers to one task: treat{" "}
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  one cubic metre
                </strong>{" "}
                of industrial degumming effluent and lower its phosphorus from
                about{" "}
                <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                  2,290 mg P/L to below the EU discharge limit of 0.7 mg/L
                </strong>{" "}
                (0.5 mg/L for the largest plants).{" "}
                <a className="lab-citation" href="#ref-r03-3">
                  [3]
                </a>{" "}
                Same task, same yardstick, fair comparison.
              </p>
            </div>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                lineHeight: "1.35",
                fontWeight: "600",
                color: "#1B2340",
                margin: "36px 0 10px",
                textWrap: "balance",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                The process we assessed
              </strong>
            </h5>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              The rePhlow route and the conventional reference were drawn as
              full process flow diagrams before any number was computed, so the
              model matches the plant and the system boundary is explicit.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(min(100%,320px),1fr))",
                gap: "18px",
              }}
            >
              <figure style={{ margin: "18px 0" }}>
                <div
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                    background: "#fff",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/pfd-rephlow.png")}
                    alt="rePhlow process flow diagram"
                    onClick={zoom}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      cursor: "zoom-in",
                    }}
                  />
                </div>
                <figcaption
                  style={{
                    margin: "12px 0 0",
                    fontSize: "13.5px",
                    lineHeight: "1.6",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  <b
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "600",
                      color: "var(--ink)",
                    }}
                  >
                    Figure 2.
                  </b>{" "}
                  Process flow diagram of the rePhlow route: encapsulated PAO
                  bacteria capture phosphorus, the water is depurated to
                  reusable quality, and the phosphorus is recovered as a product
                  that displaces mineral fertiliser.
                </figcaption>
              </figure>
              <figure style={{ margin: "18px 0" }}>
                <div
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                    background: "#fff",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/pfd-conventional.png")}
                    alt="Conventional chemical precipitation process flow diagram"
                    onClick={zoom}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      cursor: "zoom-in",
                    }}
                  />
                </div>
                <figcaption
                  style={{
                    margin: "12px 0 0",
                    fontSize: "13.5px",
                    lineHeight: "1.6",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  <b
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "600",
                      color: "var(--ink)",
                    }}
                  >
                    Figure 3.
                  </b>{" "}
                  Process flow diagram of the conventional reference: iron(III)
                  chloride precipitates the phosphate, which leaves as a
                  metal-rich sludge sent to disposal; the phosphorus is not
                  recovered.
                </figcaption>
              </figure>
            </div>
            <h3
              id="r03-reading-1-what-one-cubic-metre-gives-bac"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "29px",
                lineHeight: "1.2",
                fontWeight: "600",
                letterSpacing: "-0.015em",
                color: "var(--ink)",
                margin: "64px 0 18px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              Reading 1: what one cubic metre gives back
            </h3>
            <div
              className="sus-narrow"
              ref={kpiRef}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
                gap: "14px",
                margin: "26px 0 8px",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "18px",
                  padding: "20px 18px",
                  boxShadow: "var(--shadow-card)",
                  transition: "transform .25s ease,box-shadow .25s ease",
                }}
                data-hover="dcH1"
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "34px",
                    lineHeight: "1",
                    color: "#1B2340",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <span ref={k1Ref}>0.00</span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "var(--ink-soft)",
                      marginLeft: "6px",
                    }}
                  >
                    kg
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "13.5px",
                    lineHeight: "1.4",
                    color: "var(--ink-soft)",
                  }}
                >
                  Phosphorus recovered, returned to use
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "18px",
                  padding: "20px 18px",
                  boxShadow: "var(--shadow-card)",
                  transition: "transform .25s ease,box-shadow .25s ease",
                }}
                data-hover="dcH1"
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "34px",
                    lineHeight: "1",
                    color: "#1B2340",
                    letterSpacing: "-0.02em",
                  }}
                >
                  ≈<span ref={k2Ref}>0</span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "var(--ink-soft)",
                      marginLeft: "6px",
                    }}
                  >
                    m³
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "13.5px",
                    lineHeight: "1.4",
                    color: "var(--ink-soft)",
                  }}
                >
                  Reusable water recovered, per m³
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "18px",
                  padding: "20px 18px",
                  boxShadow: "var(--shadow-card)",
                  transition: "transform .25s ease,box-shadow .25s ease",
                }}
                data-hover="dcH1"
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "34px",
                    lineHeight: "1",
                    color: "#1B2340",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <span ref={k3Ref}>0.0</span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "var(--ink-soft)",
                      marginLeft: "6px",
                    }}
                  >
                    kg
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "13.5px",
                    lineHeight: "1.4",
                    color: "var(--ink-soft)",
                  }}
                >
                  Hazardous sludge avoided
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "18px",
                  padding: "20px 18px",
                  boxShadow: "var(--shadow-card)",
                  transition: "transform .25s ease,box-shadow .25s ease",
                }}
                data-hover="dcH1"
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "34px",
                    lineHeight: "1",
                    color: "#1B2340",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <span ref={k4Ref}>0</span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "var(--ink-soft)",
                      marginLeft: "6px",
                    }}
                  >
                    kg
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "13.5px",
                    lineHeight: "1.4",
                    color: "var(--ink-soft)",
                  }}
                >
                  Iron(III) chloride avoided
                </div>
              </div>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              We compare rePhlow against the tool it is built to replace:
              conventional chemical precipitation, where iron salts drag
              phosphorus into a sludge.
            </p>
            <p
              style={{
                margin: "34px 0 10px",
                fontSize: "13.5px",
                lineHeight: "1.55",
                color: "var(--ink-soft)",
              }}
            >
              <b
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Table 3.
              </b>{" "}
              Resource balance per cubic metre treated: what rePhlow returns to
              use, against the conventional chemical route.
            </p>
            <div
              className="sus-narrow"
              style={{
                margin: "10px 0 28px",
                overflowX: "auto",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "#fff",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14.5px",
                  minWidth: "560px",
                }}
              >
                <tbody>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Reading (per m³ treated)
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      rePhlow
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Conventional chemical route
                    </th>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Phosphorus recovered
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      about{" "}
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        1.95 kg P
                      </strong>
                      , returned to use
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      0, locked into sludge
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Reusable water recovered
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      about{" "}
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        1 m³
                      </strong>
                      , ultrafiltered, salt-free
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      not recovered
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Hazardous chemical sludge
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#4d6a2a",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        none
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      about{" "}
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        13.7 kg
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Iron reagent consumed
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#4d6a2a",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        none
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      about{" "}
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        24 kg
                      </strong>{" "}
                      of iron(III) chloride
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              These four do not depend on a fragile assumption and do not move
              if we change the bead recipe. They are the load-bearing wall of
              our case.
            </p>
            <h3
              id="r03-reading-2-the-carbon-footprint-including"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "29px",
                lineHeight: "1.2",
                fontWeight: "600",
                letterSpacing: "-0.015em",
                color: "var(--ink)",
                margin: "64px 0 18px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              Reading 2: the carbon footprint, including the ugly part
            </h3>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Most sustainability pages skip the numbers that do not flatter
              them. We will not. At the ultra-conservative starting point of{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                1.5 mg P per gram of bead
              </strong>
              , rePhlow emits about{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                37 kg CO₂-eq per m³
              </strong>{" "}
              against about{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                12 kg
              </strong>{" "}
              for the chemical route. On climate, today, we lose, and the
              footprint is{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                dominated by one thing: making the beads.
              </strong>
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              It is honest to be precise about why. Our beads are currently
              built from{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                conventional (commercial) alginate
              </strong>
              , and producing and shaping that alginate, together with the
              immobilised phosphatase enzymes it carries,{" "}
              <a className="lab-citation" href="#ref-r03-6">
                [6]
              </a>
              <a className="lab-citation" href="#ref-r03-7">
                [7]
              </a>{" "}
              is the hotspot that puts us above the chemical route at low bead
              loadings. We are{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                not
              </strong>{" "}
              claiming a green alginate we do not yet have.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              What we do have is a clear decarbonisation path, and it is worth
              stating as a future lever rather than a present achievement. We
              are exploring, with the{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                FQPIMA group at the Universidad Complutense de Madrid
              </strong>
              , a{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                bacterially produced alginate
              </strong>
              , ideally from{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                crude glycerol
              </strong>
              , a by-product of biodiesel, using a nitrogen-fixing bacterium.{" "}
              <a className="lab-citation" href="#ref-r03-10">
                [10]
              </a>{" "}
              That route would both lower the per-gram carbon of the beads and
              close a second loop with biodiesel producers such as our partner
              Bio-Oils. Until it is demonstrated, it stays in this page as a
              projection, not a result.
            </p>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                lineHeight: "1.35",
                fontWeight: "600",
                color: "#1B2340",
                margin: "36px 0 10px",
                textWrap: "balance",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Accumulation yield is the carbon lever
              </strong>
            </h5>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              The single variable that governs this footprint is{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                how much phosphorus each gram of bead captures
              </strong>
              , because the bead mass needed per cubic metre is inversely
              proportional to that capacity, and the beads are the hotspot. The
              relationship is steep:
            </p>
            <figure style={{ margin: "34px auto", maxWidth: "720px" }}>
              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid var(--line)",
                  background: "#fff",
                  boxShadow: "var(--shadow-card)",
                  padding: "22px 20px 16px",
                }}
              >
                <svg
                  viewBox="0 0 640 340"
                  width="100%"
                  role="img"
                  aria-label="Climate change impact versus bead capacity"
                  style={{ display: "block", overflow: "visible" }}
                >
                  <line
                    x1="56"
                    x2="616"
                    y1="292"
                    y2="292"
                    stroke="rgba(27,35,64,0.28)"
                    strokeWidth="1"
                  ></line>
                  <text
                    x="46"
                    y="296"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    0
                  </text>
                  <line
                    x1="56"
                    x2="616"
                    y1="224"
                    y2="224"
                    stroke="rgba(27,35,64,0.08)"
                    strokeWidth="1"
                  ></line>
                  <text
                    x="46"
                    y="228"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    10
                  </text>
                  <line
                    x1="56"
                    x2="616"
                    y1="156"
                    y2="156"
                    stroke="rgba(27,35,64,0.08)"
                    strokeWidth="1"
                  ></line>
                  <text
                    x="46"
                    y="160"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    20
                  </text>
                  <line
                    x1="56"
                    x2="616"
                    y1="88"
                    y2="88"
                    stroke="rgba(27,35,64,0.08)"
                    strokeWidth="1"
                  ></line>
                  <text
                    x="46"
                    y="92"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    30
                  </text>
                  <line
                    x1="56"
                    x2="616"
                    y1="20"
                    y2="20"
                    stroke="rgba(27,35,64,0.08)"
                    strokeWidth="1"
                  ></line>
                  <text
                    x="46"
                    y="24"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    40
                  </text>
                  <line
                    x1="108.5"
                    x2="108.5"
                    y1="292"
                    y2="297"
                    stroke="rgba(27,35,64,0.28)"
                  ></line>
                  <text
                    x="108.5"
                    y="312"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    1.5
                  </text>
                  <line
                    x1="161"
                    x2="161"
                    y1="292"
                    y2="297"
                    stroke="rgba(27,35,64,0.28)"
                  ></line>
                  <text
                    x="161"
                    y="312"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    3
                  </text>
                  <line
                    x1="266"
                    x2="266"
                    y1="292"
                    y2="297"
                    stroke="rgba(27,35,64,0.28)"
                  ></line>
                  <text
                    x="266"
                    y="312"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    6
                  </text>
                  <line
                    x1="371"
                    x2="371"
                    y1="292"
                    y2="297"
                    stroke="rgba(27,35,64,0.28)"
                  ></line>
                  <text
                    x="371"
                    y="312"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    9
                  </text>
                  <line
                    x1="476"
                    x2="476"
                    y1="292"
                    y2="297"
                    stroke="rgba(27,35,64,0.28)"
                  ></line>
                  <text
                    x="476"
                    y="312"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    12
                  </text>
                  <line
                    x1="581"
                    x2="581"
                    y1="292"
                    y2="297"
                    stroke="rgba(27,35,64,0.28)"
                  ></line>
                  <text
                    x="581"
                    y="312"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    15
                  </text>
                  <text
                    x="336"
                    y="336"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    Bead capacity (mg P/g)
                  </text>
                  <text
                    transform="translate(14 156) rotate(-90)"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    kg CO₂-eq per m³
                  </text>
                  <polygon
                    points="108.5,40.4 110.3,45.1 112.0,50.0 113.8,54.9 115.5,59.9 117.3,65.0 119.0,70.1 120.8,75.3 122.5,80.5 124.3,85.7 126.0,91.0 127.8,96.2 129.5,101.5 131.3,106.7 133.0,111.9 134.8,117.0 136.5,122.1 138.2,127.1 140.0,132.0 141.7,136.9 143.5,141.6 145.2,146.2 147.0,150.7 148.7,155.0 150.5,159.2 152.2,163.2 154.0,167.1 155.7,170.7 157.5,174.2 159.2,177.5 161.0,180.5 162.7,183.3 164.5,186.1 166.2,188.8 168.0,191.3 169.7,193.8 171.5,196.2 173.2,198.4 175.0,200.6 176.7,202.7 178.5,204.8 180.2,206.7 182.0,208.6 183.7,209.0 185.5,209.0 187.2,209.0 189.0,209.0 189.0,209.0 108.5,209.0"
                    fill="rgba(226,84,45,0.12)"
                  ></polygon>
                  <line
                    x1="56"
                    x2="616"
                    y1="209.04000000000002"
                    y2="209.04000000000002"
                    stroke="#E2542D"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  ></line>
                  <text
                    x="616"
                    y="201.04000000000002"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#c2441f",
                    }}
                  >
                    Conventional route · 12.2
                  </text>
                  <path
                    d="M108.5,40.4L112.0,50.0L115.5,59.9L119.0,70.1L122.5,80.5L126.0,91.0L129.5,101.5L133.0,111.9L136.5,122.1L140.0,132.0L143.5,141.6L147.0,150.7L150.5,159.2L154.0,167.1L157.5,174.2L161.0,180.5L164.5,186.1L168.0,191.3L171.5,196.2L175.0,200.6L178.5,204.8L182.0,208.6L185.5,212.1L189.0,215.3L192.5,218.2L196.0,220.9L199.5,223.4L203.0,225.6L206.5,227.6L210.0,229.5L213.5,231.2L217.0,232.7L220.5,234.2L224.0,235.5L227.5,236.7L231.0,237.9L234.5,239.0L238.0,240.1L241.5,241.2L245.0,242.3L248.5,243.4L252.0,244.5L255.5,245.7L259.0,247.0L262.5,248.4L266.0,249.8L269.5,251.3L273.0,252.8L276.5,254.1L280.0,255.4L283.5,256.6L287.0,257.7L290.5,258.8L294.0,259.8L297.5,260.7L301.0,261.6L304.5,262.4L308.0,263.2L311.5,264.0L315.0,264.7L318.5,265.4L322.0,266.0L325.5,266.6L329.0,267.2L332.5,267.8L336.0,268.3L339.5,268.8L343.0,269.4L346.5,269.9L350.0,270.4L353.5,270.9L357.0,271.4L360.5,272.0L364.0,272.5L367.5,273.1L371.0,273.6L374.5,274.2L378.0,274.8L381.5,275.3L385.0,275.8L388.5,276.3L392.0,276.8L395.5,277.3L399.0,277.7L402.5,278.2L406.0,278.6L409.5,279.0L413.0,279.4L416.5,279.8L420.0,280.1L423.5,280.5L427.0,280.8L430.5,281.2L434.0,281.5L437.5,281.8L441.0,282.2L444.5,282.5L448.0,282.8L451.5,283.1L455.0,283.4L458.5,283.7L462.0,284.0L465.5,284.3L469.0,284.6L472.5,284.9L476.0,285.2L479.5,285.5L483.0,285.8L486.5,286.1L490.0,286.3L493.5,286.6L497.0,286.9L500.5,287.1L504.0,287.4L507.5,287.6L511.0,287.8L514.5,288.0L518.0,288.3L521.5,288.5L525.0,288.7L528.5,288.9L532.0,289.1L535.5,289.3L539.0,289.5L542.5,289.7L546.0,289.9L549.5,290.1L553.0,290.3L556.5,290.5L560.0,290.7L563.5,290.9L567.0,291.1L570.5,291.3L574.0,291.6L577.5,291.8L581.0,292.0"
                    fill="none"
                    stroke="#7C9A4E"
                    strokeWidth="3"
                    strokeLinecap="round"
                  ></path>
                  <circle
                    cx="108.5"
                    cy="40.39999999999999"
                    r="4.5"
                    fill="#fff"
                    stroke="#56732f"
                    strokeWidth="2.4"
                  ></circle>
                  <circle
                    cx="161"
                    cy="180.48000000000002"
                    r="4.5"
                    fill="#fff"
                    stroke="#56732f"
                    strokeWidth="2.4"
                  ></circle>
                  <circle
                    cx="266"
                    cy="249.84"
                    r="4.5"
                    fill="#fff"
                    stroke="#56732f"
                    strokeWidth="2.4"
                  ></circle>
                  <circle
                    cx="371"
                    cy="273.64"
                    r="4.5"
                    fill="#fff"
                    stroke="#56732f"
                    strokeWidth="2.4"
                  ></circle>
                  <circle
                    cx="476"
                    cy="285.2"
                    r="4.5"
                    fill="#fff"
                    stroke="#56732f"
                    strokeWidth="2.4"
                  ></circle>
                  <circle
                    cx="581"
                    cy="292"
                    r="4.5"
                    fill="#fff"
                    stroke="#56732f"
                    strokeWidth="2.4"
                  ></circle>
                  <text
                    x="120.5"
                    y="44.39999999999999"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "600",
                      fill: "#56732f",
                    }}
                  >
                    rePhlow · 37.0 at 1.5 mg P/g
                  </text>
                  <line
                    x1="189"
                    x2="189"
                    y1="209.04000000000002"
                    y2="292"
                    stroke="#1B2340"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                  ></line>
                  <circle
                    cx="189"
                    cy="209.04000000000002"
                    r="4"
                    fill="#1B2340"
                  ></circle>
                  <text
                    x="197"
                    y="282"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    ≈3.8 mg P/g
                  </text>
                </svg>
              </div>
              <figcaption
                style={{
                  margin: "12px 0 0",
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                  textWrap: "pretty",
                }}
              >
                <b
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "600",
                    color: "var(--ink)",
                  }}
                >
                  Figure 4.
                </b>{" "}
                Climate-change impact (kg CO₂-eq per m³) versus bead phosphorus
                capacity. rePhlow draws level with the conventional route (≈12.2
                kg CO₂-eq) at about 3.8 mg P/g and keeps falling as the beads
                store more phosphorus.
              </figcaption>
            </figure>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Doubling the yield roughly halves the carbon. On climate alone,
              rePhlow draws level with the chemical route at about{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                3.8 mg P/g
              </strong>
              , and by about 15 mg P/g the climate impact is essentially
              net-zero. The polyphosphate-accumulating (PAO) bacteria at the
              heart of rePhlow store phosphorus at{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                15 to 30% of their dry weight
              </strong>
              ,{" "}
              <a className="lab-citation" href="#ref-r03-8">
                [8]
              </a>{" "}
              far above our cautious starting point, so this is an engineering
              gap, not a biological ceiling. The two carbon levers are therefore
              complementary:{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                raise the accumulation yield
              </strong>{" "}
              (moves rePhlow down the curve above) and, in the future,{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                green the alginate
              </strong>{" "}
              (shifts the whole curve downward). The honest reading is that the
              first lever is ours to pull in the laboratory now, and the second
              is a credible way to go further.
            </p>
            <h3
              id="r03-reading-3-the-full-sixteen-and-the-targe"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "29px",
                lineHeight: "1.2",
                fontWeight: "600",
                letterSpacing: "-0.015em",
                color: "var(--ink)",
                margin: "64px 0 18px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              Reading 3: the full sixteen, and the target they set
            </h3>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              One number is a slogan; sixteen are an argument. At the base case
              of 1.5 mg P/g, rePhlow already{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                leads in five of the sixteen categories
              </strong>{" "}
              (ozone depletion, human toxicity non-cancer, acidification,
              freshwater eutrophication, and mineral and metal resources), and
              trails on the aggregated single score (0.0036 vs 0.0019 Pt)
              because bead production is energy-intensive. The decisive result
              is the{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                capacity sweep
              </strong>
              .
            </p>
            <figure style={{ margin: "34px 0" }}>
              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid var(--line)",
                  background: "#fff",
                  boxShadow: "var(--shadow-card)",
                  padding: "22px 20px 16px",
                }}
              >
                <svg
                  viewBox="0 0 760 600"
                  width="100%"
                  role="img"
                  aria-label="Characterised EF 3.1 profile at the base case"
                  style={{
                    display: "block",
                    overflow: "visible",
                    maxWidth: "720px",
                    margin: "0 auto",
                  }}
                >
                  <polygon
                    points="380.0,232.5 398.2,236.1 413.6,246.4 423.9,261.8 427.5,280.0 423.9,298.2 413.6,313.6 398.2,323.9 380.0,327.5 361.8,323.9 346.4,313.6 336.1,298.2 332.5,280.0 336.1,261.8 346.4,246.4 361.8,236.1"
                    fill="none"
                    stroke="rgba(27,35,64,0.08)"
                  ></polygon>
                  <polygon
                    points="380.0,185.0 416.4,192.2 447.2,212.8 467.8,243.6 475.0,280.0 467.8,316.4 447.2,347.2 416.4,367.8 380.0,375.0 343.6,367.8 312.8,347.2 292.2,316.4 285.0,280.0 292.2,243.6 312.8,212.8 343.6,192.2"
                    fill="none"
                    stroke="rgba(27,35,64,0.08)"
                  ></polygon>
                  <polygon
                    points="380.0,137.5 434.5,148.3 480.8,179.2 511.7,225.5 522.5,280.0 511.7,334.5 480.8,380.8 434.5,411.7 380.0,422.5 325.5,411.7 279.2,380.8 248.3,334.5 237.5,280.0 248.3,225.5 279.2,179.2 325.5,148.3"
                    fill="none"
                    stroke="rgba(27,35,64,0.08)"
                  ></polygon>
                  <polygon
                    points="380.0,90.0 452.7,104.5 514.4,145.6 555.5,207.3 570.0,280.0 555.5,352.7 514.4,414.4 452.7,455.5 380.0,470.0 307.3,455.5 245.6,414.4 204.5,352.7 190.0,280.0 204.5,207.3 245.6,145.6 307.3,104.5"
                    fill="rgba(234,246,250,0.5)"
                    stroke="rgba(27,35,64,0.16)"
                  ></polygon>
                  <line
                    x1="380"
                    y1="280"
                    x2="380.0"
                    y2="90.0"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="380.0"
                    y="61.3"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="380.0" dy="0">
                      Climate change
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="452.7"
                    y2="104.5"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="462.2"
                    y="85.6"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="462.2" dy="0">
                      Ozone depletion
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="514.4"
                    y2="145.6"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="531.8"
                    y="132.2"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="531.8" dy="0">
                      Human toxicity,
                    </tspan>
                    <tspan x="531.8" dy="15">
                      cancer
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="555.5"
                    y2="207.3"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="578.4"
                    y="201.8"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="578.4" dy="0">
                      Human toxicity,
                    </tspan>
                    <tspan x="578.4" dy="15">
                      non-cancer
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="570.0"
                    y2="280.0"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="594.7"
                    y="284.0"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="594.7" dy="0">
                      Particulate matter
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="555.5"
                    y2="352.7"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="578.4"
                    y="366.2"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="578.4" dy="0">
                      Ionising radiation
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="514.4"
                    y2="414.4"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="531.8"
                    y="435.8"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="531.8" dy="0">
                      Photochemical
                    </tspan>
                    <tspan x="531.8" dy="15">
                      ozone
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="452.7"
                    y2="455.5"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="462.2"
                    y="482.4"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="462.2" dy="0">
                      Acidification
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="380.0"
                    y2="470.0"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="380.0"
                    y="508.7"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="380.0" dy="0">
                      Terrestrial
                    </tspan>
                    <tspan x="380.0" dy="15">
                      eutrophication
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="307.3"
                    y2="455.5"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="297.8"
                    y="482.4"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="297.8" dy="0">
                      Freshwater
                    </tspan>
                    <tspan x="297.8" dy="15">
                      eutrophication
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="245.6"
                    y2="414.4"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="228.2"
                    y="435.8"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="228.2" dy="0">
                      Marine
                    </tspan>
                    <tspan x="228.2" dy="15">
                      eutrophication
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="204.5"
                    y2="352.7"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="181.6"
                    y="366.2"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="181.6" dy="0">
                      Freshwater
                    </tspan>
                    <tspan x="181.6" dy="15">
                      ecotoxicity
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="190.0"
                    y2="280.0"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="165.3"
                    y="284.0"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="165.3" dy="0">
                      Land use
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="204.5"
                    y2="207.3"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="181.6"
                    y="201.8"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="181.6" dy="0">
                      Water use
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="245.6"
                    y2="145.6"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="228.2"
                    y="132.2"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="228.2" dy="0">
                      Fossil resources
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="307.3"
                    y2="104.5"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="297.8"
                    y="85.6"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="297.8" dy="0">
                      Mineral/metal
                    </tspan>
                    <tspan x="297.8" dy="15">
                      resources
                    </tspan>
                  </text>
                  <text
                    x="385"
                    y="244.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "10.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    25
                  </text>
                  <text
                    x="385"
                    y="197"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "10.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    50
                  </text>
                  <text
                    x="385"
                    y="149.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "10.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    75
                  </text>
                  <text
                    x="385"
                    y="102"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "10.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    100
                  </text>
                  <polygon
                    points="380.0,219.2 452.7,104.5 449.9,210.1 555.5,207.3 539.6,280.0 422.1,297.5 419.0,319.0 452.7,455.5 380.0,340.8 307.3,455.5 327.6,332.4 223.8,344.7 288.8,280.0 229.0,217.5 345.1,245.1 307.3,104.5"
                    fill="rgba(226,84,45,0.08)"
                    stroke="#E2542D"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  ></polygon>
                  <circle cx="380.0" cy="219.2" r="3.2" fill="#E2542D"></circle>
                  <circle cx="452.7" cy="104.5" r="3.2" fill="#E2542D"></circle>
                  <circle cx="449.9" cy="210.1" r="3.2" fill="#E2542D"></circle>
                  <circle cx="555.5" cy="207.3" r="3.2" fill="#E2542D"></circle>
                  <circle cx="539.6" cy="280.0" r="3.2" fill="#E2542D"></circle>
                  <circle cx="422.1" cy="297.5" r="3.2" fill="#E2542D"></circle>
                  <circle cx="419.0" cy="319.0" r="3.2" fill="#E2542D"></circle>
                  <circle cx="452.7" cy="455.5" r="3.2" fill="#E2542D"></circle>
                  <circle cx="380.0" cy="340.8" r="3.2" fill="#E2542D"></circle>
                  <circle cx="307.3" cy="455.5" r="3.2" fill="#E2542D"></circle>
                  <circle cx="327.6" cy="332.4" r="3.2" fill="#E2542D"></circle>
                  <circle cx="223.8" cy="344.7" r="3.2" fill="#E2542D"></circle>
                  <circle cx="288.8" cy="280.0" r="3.2" fill="#E2542D"></circle>
                  <circle cx="229.0" cy="217.5" r="3.2" fill="#E2542D"></circle>
                  <circle cx="345.1" cy="245.1" r="3.2" fill="#E2542D"></circle>
                  <circle cx="307.3" cy="104.5" r="3.2" fill="#E2542D"></circle>
                  <polygon
                    points="380.0,90.0 381.5,276.5 514.4,145.6 408.1,268.4 570.0,280.0 555.5,352.7 514.4,414.4 430.9,402.9 380.0,470.0 364.0,318.6 245.6,414.4 204.5,352.7 190.0,280.0 204.5,207.3 245.6,145.6 344.4,194.0"
                    fill="rgba(124,154,78,0.22)"
                    stroke="#56732f"
                    strokeWidth="2.6"
                    strokeLinejoin="round"
                  ></polygon>
                  <circle cx="380.0" cy="90.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="381.5" cy="276.5" r="3.2" fill="#56732f"></circle>
                  <circle cx="514.4" cy="145.6" r="3.2" fill="#56732f"></circle>
                  <circle cx="408.1" cy="268.4" r="3.2" fill="#56732f"></circle>
                  <circle cx="570.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="555.5" cy="352.7" r="3.2" fill="#56732f"></circle>
                  <circle cx="514.4" cy="414.4" r="3.2" fill="#56732f"></circle>
                  <circle cx="430.9" cy="402.9" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="470.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="364.0" cy="318.6" r="3.2" fill="#56732f"></circle>
                  <circle cx="245.6" cy="414.4" r="3.2" fill="#56732f"></circle>
                  <circle cx="204.5" cy="352.7" r="3.2" fill="#56732f"></circle>
                  <circle cx="190.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="204.5" cy="207.3" r="3.2" fill="#56732f"></circle>
                  <circle cx="245.6" cy="145.6" r="3.2" fill="#56732f"></circle>
                  <circle cx="344.4" cy="194.0" r="3.2" fill="#56732f"></circle>
                  <g transform="translate(210 578)">
                    <line
                      x1="0"
                      x2="26"
                      y1="0"
                      y2="0"
                      stroke="#E2542D"
                      strokeWidth="3"
                    ></line>
                    <text
                      x="34"
                      y="4"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "13px",
                        fontWeight: "500",
                        fill: "#1B2340",
                      }}
                    >
                      Conventional
                    </text>
                    <line
                      x1="160"
                      x2="186"
                      y1="0"
                      y2="0"
                      stroke="#56732f"
                      strokeWidth="3"
                    ></line>
                    <text
                      x="194"
                      y="4"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "13px",
                        fontWeight: "500",
                        fill: "#1B2340",
                      }}
                    >
                      rePhlow (1.5 mg P/g)
                    </text>
                  </g>
                </svg>
              </div>
              <figcaption
                style={{
                  margin: "12px 0 0",
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                  textWrap: "pretty",
                }}
              >
                <b
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "600",
                    color: "var(--ink)",
                  }}
                >
                  Figure 5.
                </b>{" "}
                Characterised EF 3.1 profile across the sixteen impact
                categories at the base case (1.5 mg P/g). Each axis is scaled so
                the higher of the two systems reads 100; a smaller polygon is
                better. rePhlow (green) leads on toxicity, eutrophication and
                resources; the conventional route leads on the energy-driven
                categories.
              </figcaption>
            </figure>
            <div
              style={{
                margin: "30px 0",
                border: "1px solid var(--line)",
                borderRadius: "28px",
                background:
                  "linear-gradient(180deg,#ffffff 0%,var(--paper-soft) 100%)",
                padding: "clamp(20px,3vw,30px)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <h5
                style={{
                  margin: "0 0 4px",
                  fontFamily: "var(--font-display)",
                  fontSize: "21px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                How good must the beads get?
              </h5>
              <p
                style={{
                  margin: "0 0 18px",
                  fontSize: "14.5px",
                  lineHeight: "1.55",
                  color: "var(--ink-soft)",
                }}
              >
                Drag to set the bead capacity. Six full EF 3.1 simulations (1.5
                to 15 mg P/g) plus the conventional route.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(min(100%,320px),1fr))",
                  gap: "28px",
                  alignItems: "start",
                }}
              >
                <div style={{ minWidth: "0" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "36px",
                      fontWeight: "700",
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {capVal}
                    <span
                      style={{
                        fontSize: "15px",
                        color: "var(--ink-soft)",
                        fontWeight: "500",
                        marginLeft: "8px",
                        letterSpacing: "0",
                      }}
                    >
                      mg P / g of bead
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={capIdx}
                    onChange={onCap}
                    aria-label="Bead capacity"
                    style={{
                      width: "100%",
                      accentColor: "#56732f",
                      margin: "14px 0 2px",
                      cursor: "pointer",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "var(--ink-soft)",
                      marginBottom: "14px",
                    }}
                  >
                    <span>1.5</span>
                    <span>3</span>
                    <span>6</span>
                    <span>9</span>
                    <span>12</span>
                    <span>15</span>
                  </div>
                  <svg
                    viewBox="0 0 640 340"
                    width="100%"
                    role="img"
                    aria-label="Climate change impact versus bead capacity"
                    style={{ display: "block", overflow: "visible" }}
                  >
                    <line
                      x1="56"
                      x2="616"
                      y1="292"
                      y2="292"
                      stroke="rgba(27,35,64,0.28)"
                      strokeWidth="1"
                    ></line>
                    <text
                      x="46"
                      y="296"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      0
                    </text>
                    <line
                      x1="56"
                      x2="616"
                      y1="224"
                      y2="224"
                      stroke="rgba(27,35,64,0.08)"
                      strokeWidth="1"
                    ></line>
                    <text
                      x="46"
                      y="228"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      10
                    </text>
                    <line
                      x1="56"
                      x2="616"
                      y1="156"
                      y2="156"
                      stroke="rgba(27,35,64,0.08)"
                      strokeWidth="1"
                    ></line>
                    <text
                      x="46"
                      y="160"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      20
                    </text>
                    <line
                      x1="56"
                      x2="616"
                      y1="88"
                      y2="88"
                      stroke="rgba(27,35,64,0.08)"
                      strokeWidth="1"
                    ></line>
                    <text
                      x="46"
                      y="92"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      30
                    </text>
                    <line
                      x1="56"
                      x2="616"
                      y1="20"
                      y2="20"
                      stroke="rgba(27,35,64,0.08)"
                      strokeWidth="1"
                    ></line>
                    <text
                      x="46"
                      y="24"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      40
                    </text>
                    <line
                      x1="108.5"
                      x2="108.5"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="108.5"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      1.5
                    </text>
                    <line
                      x1="161"
                      x2="161"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="161"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      3
                    </text>
                    <line
                      x1="266"
                      x2="266"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="266"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      6
                    </text>
                    <line
                      x1="371"
                      x2="371"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="371"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      9
                    </text>
                    <line
                      x1="476"
                      x2="476"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="476"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      12
                    </text>
                    <line
                      x1="581"
                      x2="581"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="581"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      15
                    </text>
                    <text
                      x="336"
                      y="336"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12.5px",
                        fontWeight: "500",
                        fill: "#1B2340",
                      }}
                    >
                      Bead capacity (mg P/g)
                    </text>
                    <text
                      transform="translate(14 156) rotate(-90)"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12.5px",
                        fontWeight: "500",
                        fill: "#1B2340",
                      }}
                    >
                      kg CO₂-eq per m³
                    </text>
                    <polygon
                      points="108.5,40.4 110.3,45.1 112.0,50.0 113.8,54.9 115.5,59.9 117.3,65.0 119.0,70.1 120.8,75.3 122.5,80.5 124.3,85.7 126.0,91.0 127.8,96.2 129.5,101.5 131.3,106.7 133.0,111.9 134.8,117.0 136.5,122.1 138.2,127.1 140.0,132.0 141.7,136.9 143.5,141.6 145.2,146.2 147.0,150.7 148.7,155.0 150.5,159.2 152.2,163.2 154.0,167.1 155.7,170.7 157.5,174.2 159.2,177.5 161.0,180.5 162.7,183.3 164.5,186.1 166.2,188.8 168.0,191.3 169.7,193.8 171.5,196.2 173.2,198.4 175.0,200.6 176.7,202.7 178.5,204.8 180.2,206.7 182.0,208.6 183.7,209.0 185.5,209.0 187.2,209.0 189.0,209.0 189.0,209.0 108.5,209.0"
                      fill="rgba(226,84,45,0.12)"
                    ></polygon>
                    <line
                      x1="56"
                      x2="616"
                      y1="209.04000000000002"
                      y2="209.04000000000002"
                      stroke="#E2542D"
                      strokeWidth="2"
                      strokeDasharray="7 5"
                    ></line>
                    <text
                      x="616"
                      y="201.04000000000002"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "600",
                        fill: "#c2441f",
                      }}
                    >
                      Conventional route · 12.2
                    </text>
                    <path
                      d="M108.5,40.4L112.0,50.0L115.5,59.9L119.0,70.1L122.5,80.5L126.0,91.0L129.5,101.5L133.0,111.9L136.5,122.1L140.0,132.0L143.5,141.6L147.0,150.7L150.5,159.2L154.0,167.1L157.5,174.2L161.0,180.5L164.5,186.1L168.0,191.3L171.5,196.2L175.0,200.6L178.5,204.8L182.0,208.6L185.5,212.1L189.0,215.3L192.5,218.2L196.0,220.9L199.5,223.4L203.0,225.6L206.5,227.6L210.0,229.5L213.5,231.2L217.0,232.7L220.5,234.2L224.0,235.5L227.5,236.7L231.0,237.9L234.5,239.0L238.0,240.1L241.5,241.2L245.0,242.3L248.5,243.4L252.0,244.5L255.5,245.7L259.0,247.0L262.5,248.4L266.0,249.8L269.5,251.3L273.0,252.8L276.5,254.1L280.0,255.4L283.5,256.6L287.0,257.7L290.5,258.8L294.0,259.8L297.5,260.7L301.0,261.6L304.5,262.4L308.0,263.2L311.5,264.0L315.0,264.7L318.5,265.4L322.0,266.0L325.5,266.6L329.0,267.2L332.5,267.8L336.0,268.3L339.5,268.8L343.0,269.4L346.5,269.9L350.0,270.4L353.5,270.9L357.0,271.4L360.5,272.0L364.0,272.5L367.5,273.1L371.0,273.6L374.5,274.2L378.0,274.8L381.5,275.3L385.0,275.8L388.5,276.3L392.0,276.8L395.5,277.3L399.0,277.7L402.5,278.2L406.0,278.6L409.5,279.0L413.0,279.4L416.5,279.8L420.0,280.1L423.5,280.5L427.0,280.8L430.5,281.2L434.0,281.5L437.5,281.8L441.0,282.2L444.5,282.5L448.0,282.8L451.5,283.1L455.0,283.4L458.5,283.7L462.0,284.0L465.5,284.3L469.0,284.6L472.5,284.9L476.0,285.2L479.5,285.5L483.0,285.8L486.5,286.1L490.0,286.3L493.5,286.6L497.0,286.9L500.5,287.1L504.0,287.4L507.5,287.6L511.0,287.8L514.5,288.0L518.0,288.3L521.5,288.5L525.0,288.7L528.5,288.9L532.0,289.1L535.5,289.3L539.0,289.5L542.5,289.7L546.0,289.9L549.5,290.1L553.0,290.3L556.5,290.5L560.0,290.7L563.5,290.9L567.0,291.1L570.5,291.3L574.0,291.6L577.5,291.8L581.0,292.0"
                      fill="none"
                      stroke="#7C9A4E"
                      strokeWidth="3"
                      strokeLinecap="round"
                    ></path>
                    <circle
                      cx="108.5"
                      cy="40.39999999999999"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <circle
                      cx="161"
                      cy="180.48000000000002"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <circle
                      cx="266"
                      cy="249.84"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <circle
                      cx="371"
                      cy="273.64"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <circle
                      cx="476"
                      cy="285.2"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <circle
                      cx="581"
                      cy="292"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <text
                      x="120.5"
                      y="44.39999999999999"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12.5px",
                        fontWeight: "600",
                        fill: "#56732f",
                      }}
                    >
                      rePhlow · 37.0 at 1.5 mg P/g
                    </text>
                    <line
                      x1="189"
                      x2="189"
                      y1="209.04000000000002"
                      y2="292"
                      stroke="#1B2340"
                      strokeWidth="1"
                      strokeDasharray="2 3"
                    ></line>
                    <circle
                      cx="189"
                      cy="209.04000000000002"
                      r="4"
                      fill="#1B2340"
                    ></circle>
                    <text
                      x="197"
                      y="282"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "600",
                        fill: "#1B2340",
                      }}
                    >
                      ≈3.8 mg P/g
                    </text>
                    <circle
                      cx={mx}
                      cy={my}
                      r="11"
                      fill="rgba(124,154,78,0.22)"
                    ></circle>
                    <circle
                      cx={mx}
                      cy={my}
                      r="6"
                      fill="#56732f"
                      stroke="#fff"
                      strokeWidth="2"
                    ></circle>
                  </svg>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginTop: "16px",
                    }}
                  >
                    <div
                      style={{
                        flex: "1",
                        minWidth: "130px",
                        background: "#fff",
                        border: "1px solid var(--line)",
                        borderRadius: "14px",
                        padding: "12px 14px",
                      }}
                    >
                      <div
                        style={{ fontSize: "12.5px", color: "var(--ink-soft)" }}
                      >
                        Single score (Pt)
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "21px",
                          fontWeight: "700",
                          marginTop: "2px",
                          color: `${ssColor}`,
                        }}
                      >
                        {ssVal}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "1",
                        minWidth: "130px",
                        background: "#fff",
                        border: "1px solid var(--line)",
                        borderRadius: "14px",
                        padding: "12px 14px",
                      }}
                    >
                      <div
                        style={{ fontSize: "12.5px", color: "var(--ink-soft)" }}
                      >
                        Categories won
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "21px",
                          fontWeight: "700",
                          marginTop: "2px",
                          color: `${wonColor}`,
                        }}
                      >
                        {wonVal}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "1",
                        minWidth: "130px",
                        background: "#fff",
                        border: "1px solid var(--line)",
                        borderRadius: "14px",
                        padding: "12px 14px",
                      }}
                    >
                      <div
                        style={{ fontSize: "12.5px", color: "var(--ink-soft)" }}
                      >
                        Climate (kg CO₂-eq)
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "21px",
                          fontWeight: "700",
                          marginTop: "2px",
                          color: `${climColor}`,
                        }}
                      >
                        {climVal}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {" "}
                  {chips.map((ch, chIndex) => (
                    <div
                      key={chIndex}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "14px",
                        lineHeight: "1.4",
                        padding: "11px 14px",
                        borderRadius: "14px",
                        transition: "all .25s ease",
                        border: `1px solid ${ch.border}`,
                        background: `${ch.bg}`,
                        color: `${ch.color}`,
                        fontWeight: `${ch.weight}`,
                      }}
                    >
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          flex: "none",
                          transition: "all .25s ease",
                          background: `${ch.dot}`,
                          boxShadow: `${ch.ring}`,
                        }}
                      ></span>
                      <span>{ch.label}</span>
                    </div>
                  ))}{" "}
                </div>
              </div>
            </div>
            <p
              style={{
                margin: "34px 0 10px",
                fontSize: "13.5px",
                lineHeight: "1.55",
                color: "var(--ink-soft)",
              }}
            >
              <b
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Table 4.
              </b>{" "}
              EF 3.1 capacity sweep: aggregated single score, categories won and
              climate impact at each simulated bead capacity. A negative single
              score denotes a net environmental benefit.
            </p>
            <div
              style={{
                margin: "10px 0 28px",
                overflowX: "auto",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "#fff",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14.5px",
                  minWidth: "560px",
                }}
              >
                <tbody>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Bead capacity (mg P/g)
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      1.5
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      3
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      6
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      9
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      12
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      15
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Conventional
                    </th>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Single score (Pt)
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      0.00361
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      0.00153
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      0.00048
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      0.00014
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#4d6a2a",
                        fontWeight: "600",
                      }}
                    >
                      −0.00004
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "#4d6a2a",
                        fontWeight: "600",
                      }}
                    >
                      −0.00014
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      0.00192
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Categories won (of 16)
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      5
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      10
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      15
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      16
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      16
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      16
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      —
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Climate (kg CO₂-eq)
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      37.0
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      16.4
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      6.2
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      2.7
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      1.0
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      ≈0
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                      }}
                    >
                      12.2
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(min(100%,340px),1fr))",
                gap: "18px",
              }}
            >
              <figure style={{ margin: "18px 0" }}>
                <div
                  style={{
                    borderRadius: "18px",
                    border: "1px solid var(--line)",
                    background: "#fff",
                    boxShadow: "var(--shadow-card)",
                    padding: "22px 20px 16px",
                  }}
                >
                  <svg
                    viewBox="0 0 640 340"
                    width="100%"
                    role="img"
                    aria-label="Single weighted score versus bead capacity"
                    style={{ display: "block", overflow: "visible" }}
                  >
                    <rect
                      x="72"
                      y="237.60000000000002"
                      width="544"
                      height="54.39999999999998"
                      fill="rgba(124,154,78,0.08)"
                    ></rect>
                    <text
                      x="610"
                      y="284"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "500",
                        fill: "#56732f",
                      }}
                    >
                      Below zero: net environmental benefit
                    </text>
                    <line
                      x1="72"
                      x2="616"
                      y1="292"
                      y2="292"
                      stroke="rgba(27,35,64,0.08)"
                    ></line>
                    <text
                      x="62"
                      y="296"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      −0.001
                    </text>
                    <line
                      x1="72"
                      x2="616"
                      y1="237.60000000000002"
                      y2="237.60000000000002"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="62"
                      y="241.60000000000002"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      0.000
                    </text>
                    <line
                      x1="72"
                      x2="616"
                      y1="183.2"
                      y2="183.2"
                      stroke="rgba(27,35,64,0.08)"
                    ></line>
                    <text
                      x="62"
                      y="187.2"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      0.001
                    </text>
                    <line
                      x1="72"
                      x2="616"
                      y1="128.8"
                      y2="128.8"
                      stroke="rgba(27,35,64,0.08)"
                    ></line>
                    <text
                      x="62"
                      y="132.8"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      0.002
                    </text>
                    <line
                      x1="72"
                      x2="616"
                      y1="74.39999999999999"
                      y2="74.39999999999999"
                      stroke="rgba(27,35,64,0.08)"
                    ></line>
                    <text
                      x="62"
                      y="78.39999999999999"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      0.003
                    </text>
                    <line
                      x1="72"
                      x2="616"
                      y1="20"
                      y2="20"
                      stroke="rgba(27,35,64,0.08)"
                    ></line>
                    <text
                      x="62"
                      y="24"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      0.004
                    </text>
                    <line
                      x1="123"
                      x2="123"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="123"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      1.5
                    </text>
                    <line
                      x1="174"
                      x2="174"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="174"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      3
                    </text>
                    <line
                      x1="276"
                      x2="276"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="276"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      6
                    </text>
                    <line
                      x1="378"
                      x2="378"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="378"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      9
                    </text>
                    <line
                      x1="480"
                      x2="480"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="480"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      12
                    </text>
                    <line
                      x1="582"
                      x2="582"
                      y1="292"
                      y2="297"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="582"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      15
                    </text>
                    <text
                      x="344"
                      y="336"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12.5px",
                        fontWeight: "500",
                        fill: "#1B2340",
                      }}
                    >
                      Bead capacity (mg P/g)
                    </text>
                    <text
                      transform="translate(14 156) rotate(-90)"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12.5px",
                        fontWeight: "500",
                        fill: "#1B2340",
                      }}
                    >
                      Single score (Pt)
                    </text>
                    <line
                      x1="72"
                      x2="616"
                      y1="133.15200000000002"
                      y2="133.15200000000002"
                      stroke="#E2542D"
                      strokeWidth="2"
                      strokeDasharray="7 5"
                    ></line>
                    <text
                      x="616"
                      y="125.15200000000002"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "600",
                        fill: "#c2441f",
                      }}
                    >
                      Conventional route · 0.00192
                    </text>
                    <path
                      d="M123.0,41.2L126.4,48.9L129.8,57.0L133.2,65.2L136.6,73.6L140.0,82.1L143.4,90.5L146.8,98.9L150.2,107.2L153.6,115.2L157.0,122.9L160.4,130.3L163.8,137.2L167.2,143.5L170.6,149.3L174.0,154.4L177.4,158.9L180.8,163.2L184.2,167.1L187.6,170.8L191.0,174.1L194.4,177.2L197.8,180.1L201.2,182.7L204.6,185.2L208.0,187.4L211.4,189.4L214.8,191.3L218.2,192.9L221.6,194.5L225.0,195.9L228.4,197.2L231.8,198.4L235.2,199.5L238.6,200.6L242.0,201.6L245.4,202.5L248.8,203.4L252.2,204.3L255.6,205.2L259.0,206.2L262.4,207.1L265.8,208.1L269.2,209.2L272.6,210.3L276.0,211.5L279.4,212.7L282.8,213.9L286.2,214.9L289.6,216.0L293.0,216.9L296.4,217.8L299.8,218.6L303.2,219.4L306.6,220.1L310.0,220.8L313.4,221.5L316.8,222.1L320.2,222.7L323.6,223.2L327.0,223.7L330.4,224.2L333.8,224.6L337.2,225.1L340.6,225.5L344.0,225.9L347.4,226.3L350.8,226.7L354.2,227.1L357.6,227.5L361.0,227.9L364.4,228.3L367.8,228.7L371.2,229.1L374.6,229.5L378.0,230.0L381.4,230.4L384.8,230.9L388.2,231.3L391.6,231.8L395.0,232.2L398.4,232.6L401.8,233.0L405.2,233.3L408.6,233.7L412.0,234.1L415.4,234.4L418.8,234.7L422.2,235.1L425.6,235.4L429.0,235.7L432.4,236.0L435.8,236.3L439.2,236.6L442.6,236.9L446.0,237.2L449.4,237.4L452.8,237.7L456.2,238.0L459.6,238.2L463.0,238.5L466.4,238.8L469.8,239.0L473.2,239.3L476.6,239.5L480.0,239.8L483.4,240.0L486.8,240.3L490.2,240.5L493.6,240.7L497.0,240.9L500.4,241.1L503.8,241.3L507.2,241.5L510.6,241.7L514.0,241.9L517.4,242.1L520.8,242.3L524.2,242.4L527.6,242.6L531.0,242.8L534.4,242.9L537.8,243.1L541.2,243.2L544.6,243.4L548.0,243.6L551.4,243.7L554.8,243.9L558.2,244.0L561.6,244.2L565.0,244.4L568.4,244.5L571.8,244.7L575.2,244.9L578.6,245.0L582.0,245.2"
                      fill="none"
                      stroke="#7C9A4E"
                      strokeWidth="3"
                      strokeLinecap="round"
                    ></path>
                    <circle
                      cx="123"
                      cy="41.21600000000002"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <circle
                      cx="174"
                      cy="154.368"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <circle
                      cx="276"
                      cy="211.488"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <circle
                      cx="378"
                      cy="229.984"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <circle
                      cx="480"
                      cy="239.776"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <circle
                      cx="582"
                      cy="245.21599999999998"
                      r="4.5"
                      fill="#fff"
                      stroke="#56732f"
                      strokeWidth="2.4"
                    ></circle>
                    <text
                      x="135"
                      y="45.21600000000002"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12.5px",
                        fontWeight: "600",
                        fill: "#56732f",
                      }}
                    >
                      rePhlow · 0.00361
                    </text>
                    <circle
                      cx="157"
                      cy="133.15200000000002"
                      r="4"
                      fill="#1B2340"
                    ></circle>
                    <text
                      x="165"
                      y="125.15200000000002"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "600",
                        fill: "#1B2340",
                      }}
                    >
                      ≈2.5 mg P/g
                    </text>
                    <circle
                      cx="480"
                      cy="237.60000000000002"
                      r="4"
                      fill="#1B2340"
                    ></circle>
                    <text
                      x="488"
                      y="229.60000000000002"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "600",
                        fill: "#1B2340",
                      }}
                    >
                      ≈12 mg P/g
                    </text>
                  </svg>
                </div>
                <figcaption
                  style={{
                    margin: "12px 0 0",
                    fontSize: "13.5px",
                    lineHeight: "1.6",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  <b
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "600",
                      color: "var(--ink)",
                    }}
                  >
                    Figure 6.
                  </b>{" "}
                  Single EF 3.1 weighted score versus bead capacity. rePhlow
                  overtakes the conventional route at roughly 2.5 mg P/g and
                  becomes net-beneficial (negative score) at about 12 mg P/g.
                </figcaption>
              </figure>
              <figure style={{ margin: "18px 0" }}>
                <div
                  style={{
                    borderRadius: "18px",
                    border: "1px solid var(--line)",
                    background: "#fff",
                    boxShadow: "var(--shadow-card)",
                    padding: "22px 20px 16px",
                  }}
                >
                  <svg
                    viewBox="0 0 640 340"
                    width="100%"
                    role="img"
                    aria-label="Categories won versus bead capacity"
                    style={{ display: "block", overflow: "visible" }}
                  >
                    <line
                      x1="56"
                      x2="616"
                      y1="292"
                      y2="292"
                      stroke="rgba(27,35,64,0.28)"
                    ></line>
                    <text
                      x="46"
                      y="296"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      0
                    </text>
                    <line
                      x1="56"
                      x2="616"
                      y1="225"
                      y2="225"
                      stroke="rgba(27,35,64,0.08)"
                    ></line>
                    <text
                      x="46"
                      y="229"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      4
                    </text>
                    <line
                      x1="56"
                      x2="616"
                      y1="158"
                      y2="158"
                      stroke="rgba(27,35,64,0.08)"
                    ></line>
                    <text
                      x="46"
                      y="162"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      8
                    </text>
                    <line
                      x1="56"
                      x2="616"
                      y1="91"
                      y2="91"
                      stroke="rgba(27,35,64,0.08)"
                    ></line>
                    <text
                      x="46"
                      y="95"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      12
                    </text>
                    <line
                      x1="56"
                      x2="616"
                      y1="24"
                      y2="24"
                      stroke="rgba(27,35,64,0.08)"
                    ></line>
                    <text
                      x="46"
                      y="28"
                      textAnchor="end"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      16
                    </text>
                    <text
                      x="64"
                      y="16"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "500",
                        fill: "#4A5170",
                      }}
                    >
                      All sixteen categories
                    </text>
                    <path
                      d="M74.66666666666666,292 V214.25 Q74.66666666666666,208.25 80.66666666666666,208.25 H124.66666666666666 Q130.66666666666666,208.25 130.66666666666666,214.25 V292 Z"
                      fill="#7C9A4E"
                    ></path>
                    <text
                      x="102.66666666666666"
                      y="200.25"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "13px",
                        fontWeight: "600",
                        fill: "#1B2340",
                      }}
                    >
                      5
                    </text>
                    <text
                      x="102.66666666666666"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      1.5
                    </text>
                    <path
                      d="M168,292 V130.5 Q168,124.5 174,124.5 H218 Q224,124.5 224,130.5 V292 Z"
                      fill="#7C9A4E"
                    ></path>
                    <text
                      x="196"
                      y="116.5"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "13px",
                        fontWeight: "600",
                        fill: "#1B2340",
                      }}
                    >
                      10
                    </text>
                    <text
                      x="196"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      3
                    </text>
                    <path
                      d="M261.3333333333333,292 V46.75 Q261.3333333333333,40.75 267.3333333333333,40.75 H311.3333333333333 Q317.3333333333333,40.75 317.3333333333333,46.75 V292 Z"
                      fill="#7C9A4E"
                    ></path>
                    <text
                      x="289.3333333333333"
                      y="32.75"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "13px",
                        fontWeight: "600",
                        fill: "#1B2340",
                      }}
                    >
                      15
                    </text>
                    <text
                      x="289.3333333333333"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      6
                    </text>
                    <path
                      d="M354.66666666666663,292 V30 Q354.66666666666663,24 360.66666666666663,24 H404.66666666666663 Q410.66666666666663,24 410.66666666666663,30 V292 Z"
                      fill="#56732f"
                    ></path>
                    <text
                      x="382.66666666666663"
                      y="16"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "13px",
                        fontWeight: "600",
                        fill: "#1B2340",
                      }}
                    >
                      16
                    </text>
                    <text
                      x="382.66666666666663"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      9
                    </text>
                    <path
                      d="M448,292 V30 Q448,24 454,24 H498 Q504,24 504,30 V292 Z"
                      fill="#56732f"
                    ></path>
                    <text
                      x="476"
                      y="16"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "13px",
                        fontWeight: "600",
                        fill: "#1B2340",
                      }}
                    >
                      16
                    </text>
                    <text
                      x="476"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      12
                    </text>
                    <path
                      d="M541.3333333333333,292 V30 Q541.3333333333333,24 547.3333333333333,24 H591.3333333333333 Q597.3333333333333,24 597.3333333333333,30 V292 Z"
                      fill="#56732f"
                    ></path>
                    <text
                      x="569.3333333333333"
                      y="16"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "13px",
                        fontWeight: "600",
                        fill: "#1B2340",
                      }}
                    >
                      16
                    </text>
                    <text
                      x="569.3333333333333"
                      y="312"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        fill: "#4A5170",
                      }}
                    >
                      15
                    </text>
                    <text
                      x="336"
                      y="336"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12.5px",
                        fontWeight: "500",
                        fill: "#1B2340",
                      }}
                    >
                      Bead capacity (mg P/g)
                    </text>
                    <text
                      transform="translate(14 158) rotate(-90)"
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "12.5px",
                        fontWeight: "500",
                        fill: "#1B2340",
                      }}
                    >
                      Categories won (of 16)
                    </text>
                  </svg>
                </div>
                <figcaption
                  style={{
                    margin: "12px 0 0",
                    fontSize: "13.5px",
                    lineHeight: "1.6",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  <b
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "600",
                      color: "var(--ink)",
                    }}
                  >
                    Figure 7.
                  </b>{" "}
                  Number of the sixteen EF 3.1 categories in which rePhlow beats
                  the conventional route, as a function of bead capacity: 5 at
                  1.5 mg P/g, rising to all 16 from about 9 mg P/g.
                </figcaption>
              </figure>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Three thresholds fall out of the sweep: rePhlow{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                beats the conventional route overall
              </strong>{" "}
              at about{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                2.5 mg P/g
              </strong>
              ,{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                leads in all sixteen
              </strong>{" "}
              categories from about{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                8 mg P/g
              </strong>{" "}
              (set by the most demanding one, ionising radiation), and becomes a{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                net environmental benefit
              </strong>{" "}
              by about{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                12 mg P/g
              </strong>
              .
            </p>
            <figure className="sus-narrow" style={{ margin: "34px 0" }}>
              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid var(--line)",
                  background: "#fff",
                  boxShadow: "var(--shadow-card)",
                  padding: "22px 20px 16px",
                }}
              >
                <svg
                  viewBox="0 0 680 520"
                  width="100%"
                  role="img"
                  aria-label="Break-even bead capacity per impact category"
                  style={{ display: "block", overflow: "visible" }}
                >
                  <rect
                    x="200"
                    y="6"
                    width="12"
                    height="12"
                    rx="3"
                    fill="#7C9A4E"
                  ></rect>
                  <text
                    x="218"
                    y="16"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Already won at 1.5 mg P/g
                  </text>
                  <rect
                    x="390"
                    y="6"
                    width="12"
                    height="12"
                    rx="3"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="408"
                    y="16"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Needs a higher capacity
                  </text>
                  <line
                    x1="200"
                    x2="200"
                    y1="36"
                    y2="476"
                    stroke="rgba(27,35,64,0.28)"
                  ></line>
                  <text
                    x="200"
                    y="494"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    0
                  </text>
                  <line
                    x1="310"
                    x2="310"
                    y1="36"
                    y2="476"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="310"
                    y="494"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    2
                  </text>
                  <line
                    x1="420"
                    x2="420"
                    y1="36"
                    y2="476"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="420"
                    y="494"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    4
                  </text>
                  <line
                    x1="530"
                    x2="530"
                    y1="36"
                    y2="476"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="530"
                    y="494"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    6
                  </text>
                  <line
                    x1="640"
                    x2="640"
                    y1="36"
                    y2="476"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="640"
                    y="494"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    8
                  </text>
                  <text
                    x="190"
                    y="61.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    Ionising radiation
                  </text>
                  <rect
                    x="200"
                    y="49"
                    width="429"
                    height="17"
                    rx="4"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="635"
                    y="61.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    7.8
                  </text>
                  <text
                    x="190"
                    y="88.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Resource use, fossils
                  </text>
                  <rect
                    x="200"
                    y="76"
                    width="286"
                    height="17"
                    rx="4"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="492"
                    y="88.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    5.2
                  </text>
                  <text
                    x="190"
                    y="115.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Climate change
                  </text>
                  <rect
                    x="200"
                    y="103"
                    width="209"
                    height="17"
                    rx="4"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="415"
                    y="115.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    3.8
                  </text>
                  <text
                    x="190"
                    y="142.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Land use
                  </text>
                  <rect
                    x="200"
                    y="130"
                    width="209"
                    height="17"
                    rx="4"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="415"
                    y="142.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    3.8
                  </text>
                  <text
                    x="190"
                    y="169.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Photochemical ozone form.
                  </text>
                  <rect
                    x="200"
                    y="157"
                    width="181.5"
                    height="17"
                    rx="4"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="387.5"
                    y="169.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    3.3
                  </text>
                  <text
                    x="190"
                    y="196.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Eutrophication terrestrial
                  </text>
                  <rect
                    x="200"
                    y="184"
                    width="170.5"
                    height="17"
                    rx="4"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="376.5"
                    y="196.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    3.1
                  </text>
                  <text
                    x="190"
                    y="223.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Human toxicity cancer
                  </text>
                  <rect
                    x="200"
                    y="211"
                    width="159.5"
                    height="17"
                    rx="4"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="365.5"
                    y="223.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    2.9
                  </text>
                  <text
                    x="190"
                    y="250.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Eutrophication marine
                  </text>
                  <rect
                    x="200"
                    y="238"
                    width="148.5"
                    height="17"
                    rx="4"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="354.5"
                    y="250.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    2.7
                  </text>
                  <text
                    x="190"
                    y="277.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Water use
                  </text>
                  <rect
                    x="200"
                    y="265"
                    width="93.5"
                    height="17"
                    rx="4"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="299.5"
                    y="277.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    1.7
                  </text>
                  <text
                    x="190"
                    y="304.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Ecotoxicity freshwater
                  </text>
                  <rect
                    x="200"
                    y="292"
                    width="88"
                    height="17"
                    rx="4"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="294"
                    y="304.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    1.6
                  </text>
                  <text
                    x="190"
                    y="331.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Particulate matter
                  </text>
                  <rect
                    x="200"
                    y="319"
                    width="88"
                    height="17"
                    rx="4"
                    fill="#9CC9B8"
                  ></rect>
                  <text
                    x="294"
                    y="331.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    1.6
                  </text>
                  <text
                    x="190"
                    y="358.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Resource use, min. & metals
                  </text>
                  <rect
                    x="200"
                    y="346"
                    width="82.5"
                    height="17"
                    rx="4"
                    fill="#7C9A4E"
                  ></rect>
                  <text
                    x="288.5"
                    y="358.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    1.5
                  </text>
                  <text
                    x="190"
                    y="385.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Eutrophication freshwater
                  </text>
                  <rect
                    x="200"
                    y="373"
                    width="82.5"
                    height="17"
                    rx="4"
                    fill="#7C9A4E"
                  ></rect>
                  <text
                    x="288.5"
                    y="385.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    1.5
                  </text>
                  <text
                    x="190"
                    y="412.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Acidification
                  </text>
                  <rect
                    x="200"
                    y="400"
                    width="82.5"
                    height="17"
                    rx="4"
                    fill="#7C9A4E"
                  ></rect>
                  <text
                    x="288.5"
                    y="412.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    1.5
                  </text>
                  <text
                    x="190"
                    y="439.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Human toxicity non-cancer
                  </text>
                  <rect
                    x="200"
                    y="427"
                    width="82.5"
                    height="17"
                    rx="4"
                    fill="#7C9A4E"
                  ></rect>
                  <text
                    x="288.5"
                    y="439.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    1.5
                  </text>
                  <text
                    x="190"
                    y="466.5"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    Ozone depletion
                  </text>
                  <rect
                    x="200"
                    y="454"
                    width="82.5"
                    height="17"
                    rx="4"
                    fill="#7C9A4E"
                  ></rect>
                  <text
                    x="288.5"
                    y="466.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    1.5
                  </text>
                  <line
                    x1="282.5"
                    x2="282.5"
                    y1="36"
                    y2="476"
                    stroke="#1B2340"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  ></line>
                  <text
                    x="286.5"
                    y="30"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "11.5px",
                      fontWeight: "600",
                      fill: "#1B2340",
                    }}
                  >
                    Base case 1.5
                  </text>
                  <text
                    x="420"
                    y="516"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    Break-even capacity (mg P/g)
                  </text>
                </svg>
              </div>
              <figcaption
                style={{
                  margin: "12px 0 0",
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                  textWrap: "pretty",
                }}
              >
                <b
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "600",
                    color: "var(--ink)",
                  }}
                >
                  Figure 8.
                </b>{" "}
                Break-even bead capacity per impact category: the capacity at
                which rePhlow overtakes the conventional route in that category.
                Five are already won at 1.5 mg P/g; the most demanding, ionising
                radiation (≈8 mg P/g), sets the overall target to lead across
                all sixteen.
              </figcaption>
            </figure>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Two notes we state plainly:{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                freshwater eutrophication is a tie
              </strong>
              , because both routes remove the same phosphorus and clear the
              same limit (the real benefit, keeping ~2.3 kg P/m³ out of rivers
              and lakes, is shared by any effective treatment); and{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                marine eutrophication favours rePhlow
              </strong>
              , because our bacteria assimilate nitrogen as well as phosphorus,
              which iron precipitation does not touch.{" "}
              <a className="lab-citation" href="#ref-r03-11">
                [11]
              </a>
            </p>
            <figure style={{ margin: "34px 0" }}>
              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid var(--line)",
                  background: "#fff",
                  boxShadow: "var(--shadow-card)",
                  padding: "22px 20px 16px",
                }}
              >
                <svg
                  viewBox="0 0 760 600"
                  width="100%"
                  role="img"
                  aria-label="Characterised EF 3.1 profile at the experimental target"
                  style={{
                    display: "block",
                    overflow: "visible",
                    maxWidth: "720px",
                    margin: "0 auto",
                  }}
                >
                  <polygon
                    points="380.0,232.5 398.2,236.1 413.6,246.4 423.9,261.8 427.5,280.0 423.9,298.2 413.6,313.6 398.2,323.9 380.0,327.5 361.8,323.9 346.4,313.6 336.1,298.2 332.5,280.0 336.1,261.8 346.4,246.4 361.8,236.1"
                    fill="none"
                    stroke="rgba(27,35,64,0.08)"
                  ></polygon>
                  <polygon
                    points="380.0,185.0 416.4,192.2 447.2,212.8 467.8,243.6 475.0,280.0 467.8,316.4 447.2,347.2 416.4,367.8 380.0,375.0 343.6,367.8 312.8,347.2 292.2,316.4 285.0,280.0 292.2,243.6 312.8,212.8 343.6,192.2"
                    fill="none"
                    stroke="rgba(27,35,64,0.08)"
                  ></polygon>
                  <polygon
                    points="380.0,137.5 434.5,148.3 480.8,179.2 511.7,225.5 522.5,280.0 511.7,334.5 480.8,380.8 434.5,411.7 380.0,422.5 325.5,411.7 279.2,380.8 248.3,334.5 237.5,280.0 248.3,225.5 279.2,179.2 325.5,148.3"
                    fill="none"
                    stroke="rgba(27,35,64,0.08)"
                  ></polygon>
                  <polygon
                    points="380.0,90.0 452.7,104.5 514.4,145.6 555.5,207.3 570.0,280.0 555.5,352.7 514.4,414.4 452.7,455.5 380.0,470.0 307.3,455.5 245.6,414.4 204.5,352.7 190.0,280.0 204.5,207.3 245.6,145.6 307.3,104.5"
                    fill="rgba(234,246,250,0.5)"
                    stroke="rgba(27,35,64,0.16)"
                  ></polygon>
                  <line
                    x1="380"
                    y1="280"
                    x2="380.0"
                    y2="90.0"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="380.0"
                    y="61.3"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="380.0" dy="0">
                      Climate change
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="452.7"
                    y2="104.5"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="462.2"
                    y="85.6"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="462.2" dy="0">
                      Ozone depletion
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="514.4"
                    y2="145.6"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="531.8"
                    y="132.2"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="531.8" dy="0">
                      Human toxicity,
                    </tspan>
                    <tspan x="531.8" dy="15">
                      cancer
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="555.5"
                    y2="207.3"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="578.4"
                    y="201.8"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="578.4" dy="0">
                      Human toxicity,
                    </tspan>
                    <tspan x="578.4" dy="15">
                      non-cancer
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="570.0"
                    y2="280.0"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="594.7"
                    y="284.0"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="594.7" dy="0">
                      Particulate matter
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="555.5"
                    y2="352.7"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="578.4"
                    y="366.2"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="578.4" dy="0">
                      Ionising radiation
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="514.4"
                    y2="414.4"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="531.8"
                    y="435.8"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="531.8" dy="0">
                      Photochemical
                    </tspan>
                    <tspan x="531.8" dy="15">
                      ozone
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="452.7"
                    y2="455.5"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="462.2"
                    y="482.4"
                    textAnchor="start"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="462.2" dy="0">
                      Acidification
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="380.0"
                    y2="470.0"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="380.0"
                    y="508.7"
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="380.0" dy="0">
                      Terrestrial
                    </tspan>
                    <tspan x="380.0" dy="15">
                      eutrophication
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="307.3"
                    y2="455.5"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="297.8"
                    y="482.4"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="297.8" dy="0">
                      Freshwater
                    </tspan>
                    <tspan x="297.8" dy="15">
                      eutrophication
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="245.6"
                    y2="414.4"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="228.2"
                    y="435.8"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="228.2" dy="0">
                      Marine
                    </tspan>
                    <tspan x="228.2" dy="15">
                      eutrophication
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="204.5"
                    y2="352.7"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="181.6"
                    y="366.2"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="181.6" dy="0">
                      Freshwater
                    </tspan>
                    <tspan x="181.6" dy="15">
                      ecotoxicity
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="190.0"
                    y2="280.0"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="165.3"
                    y="284.0"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="165.3" dy="0">
                      Land use
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="204.5"
                    y2="207.3"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="181.6"
                    y="201.8"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="181.6" dy="0">
                      Water use
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="245.6"
                    y2="145.6"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="228.2"
                    y="132.2"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="228.2" dy="0">
                      Fossil resources
                    </tspan>
                  </text>
                  <line
                    x1="380"
                    y1="280"
                    x2="307.3"
                    y2="104.5"
                    stroke="rgba(27,35,64,0.08)"
                  ></line>
                  <text
                    x="297.8"
                    y="85.6"
                    textAnchor="end"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "12.5px",
                      fontWeight: "500",
                      fill: "#1B2340",
                    }}
                  >
                    <tspan x="297.8" dy="0">
                      Mineral/metal
                    </tspan>
                    <tspan x="297.8" dy="15">
                      resources
                    </tspan>
                  </text>
                  <text
                    x="385"
                    y="244.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "10.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    25
                  </text>
                  <text
                    x="385"
                    y="197"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "10.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    50
                  </text>
                  <text
                    x="385"
                    y="149.5"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "10.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    75
                  </text>
                  <text
                    x="385"
                    y="102"
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "10.5px",
                      fontWeight: "400",
                      fill: "#4A5170",
                    }}
                  >
                    100
                  </text>
                  <polygon
                    points="380.0,90.0 452.7,104.5 514.4,145.6 555.5,207.3 570.0,280.0 555.5,352.7 514.4,414.4 452.7,455.5 380.0,470.0 307.3,455.5 245.6,414.4 204.5,352.7 190.0,280.0 204.5,207.3 245.6,145.6 307.3,104.5"
                    fill="rgba(226,84,45,0.08)"
                    stroke="#E2542D"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  ></polygon>
                  <circle cx="380.0" cy="90.0" r="3.2" fill="#E2542D"></circle>
                  <circle cx="452.7" cy="104.5" r="3.2" fill="#E2542D"></circle>
                  <circle cx="514.4" cy="145.6" r="3.2" fill="#E2542D"></circle>
                  <circle cx="555.5" cy="207.3" r="3.2" fill="#E2542D"></circle>
                  <circle cx="570.0" cy="280.0" r="3.2" fill="#E2542D"></circle>
                  <circle cx="555.5" cy="352.7" r="3.2" fill="#E2542D"></circle>
                  <circle cx="514.4" cy="414.4" r="3.2" fill="#E2542D"></circle>
                  <circle cx="452.7" cy="455.5" r="3.2" fill="#E2542D"></circle>
                  <circle cx="380.0" cy="470.0" r="3.2" fill="#E2542D"></circle>
                  <circle cx="307.3" cy="455.5" r="3.2" fill="#E2542D"></circle>
                  <circle cx="245.6" cy="414.4" r="3.2" fill="#E2542D"></circle>
                  <circle cx="204.5" cy="352.7" r="3.2" fill="#E2542D"></circle>
                  <circle cx="190.0" cy="280.0" r="3.2" fill="#E2542D"></circle>
                  <circle cx="204.5" cy="207.3" r="3.2" fill="#E2542D"></circle>
                  <circle cx="245.6" cy="145.6" r="3.2" fill="#E2542D"></circle>
                  <circle cx="307.3" cy="104.5" r="3.2" fill="#E2542D"></circle>
                  <polygon
                    points="380.0,236.3 380.0,280.0 424.3,235.7 380.0,280.0 380.0,280.0 538.0,345.4 380.0,280.0 380.0,280.0 380.0,280.0 380.0,280.0 380.0,280.0 380.0,280.0 321.1,280.0 380.0,280.0 310.1,210.1 380.0,280.0"
                    fill="rgba(124,154,78,0.22)"
                    stroke="#56732f"
                    strokeWidth="2.6"
                    strokeLinejoin="round"
                  ></polygon>
                  <circle cx="380.0" cy="236.3" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="424.3" cy="235.7" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="538.0" cy="345.4" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="321.1" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <circle cx="310.1" cy="210.1" r="3.2" fill="#56732f"></circle>
                  <circle cx="380.0" cy="280.0" r="3.2" fill="#56732f"></circle>
                  <g transform="translate(210 578)">
                    <line
                      x1="0"
                      x2="26"
                      y1="0"
                      y2="0"
                      stroke="#E2542D"
                      strokeWidth="3"
                    ></line>
                    <text
                      x="34"
                      y="4"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "13px",
                        fontWeight: "500",
                        fill: "#1B2340",
                      }}
                    >
                      Conventional
                    </text>
                    <line
                      x1="160"
                      x2="186"
                      y1="0"
                      y2="0"
                      stroke="#56732f"
                      strokeWidth="3"
                    ></line>
                    <text
                      x="194"
                      y="4"
                      style={{
                        fontFamily: "Inter,sans-serif",
                        fontSize: "13px",
                        fontWeight: "500",
                        fill: "#1B2340",
                      }}
                    >
                      rePhlow (9 mg P/g)
                    </text>
                  </g>
                </svg>
              </div>
              <figcaption
                style={{
                  margin: "12px 0 0",
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                  textWrap: "pretty",
                }}
              >
                <b
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "600",
                    color: "var(--ink)",
                  }}
                >
                  Figure 9.
                </b>{" "}
                Characterised EF 3.1 profile at the experimental target of ≈8 mg
                P/g: rePhlow (green) now sits inside the conventional route
                (amber) on every one of the sixteen axes.
              </figcaption>
            </figure>
            <details
              style={{
                margin: "26px 0",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "var(--paper-soft)",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  padding: "15px 22px",
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "var(--ink)",
                }}
              >
                Method, in one place
              </summary>
              <div style={{ padding: "0 22px 6px" }}>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "15px",
                    lineHeight: "1.72",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  rePhlow is an emerging technology compared like-for-like with
                  the treatment it would replace, so the study is an{" "}
                  <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                    attributional, prospective, screening-level
                  </strong>{" "}
                  LCA, modelled in openLCA 2.6 with the BAFU:2026 background
                  database and EF 3.1 (adapted) across all sixteen categories,
                  each normalised and weighted to a single score. The sweep ran
                  six full simulations (1.5, 3, 6, 9, 12 and 15 mg P/g) plus the
                  conventional route. The full workbook, report and reusable
                  method live on the Contribution page.
                </p>
              </div>
            </details>
            <h4
              id="r03-critical-reflection-where-sustainability"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "21px",
                lineHeight: "1.3",
                fontWeight: "600",
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                margin: "44px 0 12px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Critical reflection: where sustainability meets the lab bench
              </strong>
            </h4>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                The LCA is not a verdict. It is a design brief.
              </strong>{" "}
              The honest reading of this panel is that at today's bead
              performance rePhlow wins on resources and loses on carbon. The
              temptation is to report the five categories we lead and move on.
              The more useful thing the instruments did was turn a judgement
              into a{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                measurable experimental objective
              </strong>
              , and that is where sustainability stops being a page and starts
              steering the project.
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              This is the stance that ISO 14044 calls interpretation, and that
              the prospective-LCA literature argues is the whole point of
              assessing an emerging technology early: not to grade a finished
              product, but to steer one while its design is still open.{" "}
              <a className="lab-citation" href="#ref-r03-1">
                [1]
              </a>
              [19] Because the whole environmental case turns on a single lever,
              the phosphorus each gram of bead captures, the LCA hands the wet
              lab a number to aim at rather than a slogan to defend. Three
              thresholds matter, and none is fantasy against a biological
              ceiling of 15 to 30% of dry weight as phosphorus:{" "}
              <a className="lab-citation" href="#ref-r03-8">
                [8]
              </a>
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                gap: "16px",
                margin: "22px 0 30px",
              }}
            >
              <div
                style={{
                  background: "rgba(31,124,140,0.06)",
                  border: "1px solid rgba(31,124,140,0.18)",
                  borderRadius: "18px",
                  padding: "20px 22px",
                  fontSize: "14.5px",
                  lineHeight: "1.62",
                  color: "var(--ink-soft)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "28px",
                    letterSpacing: "-0.02em",
                    color: "#1f6f7d",
                    marginBottom: "8px",
                  }}
                >
                  ≈2.5 mg P/g
                </div>
                <p style={{ margin: "0" }}>
                  rePhlow overtakes the chemical route on the aggregated single
                  score. The minimum that makes the whole system a net
                  environmental improvement.
                </p>
              </div>
              <div
                style={{
                  background: "rgba(124,154,78,0.1)",
                  border: "1px solid rgba(124,154,78,0.32)",
                  borderRadius: "18px",
                  padding: "20px 22px",
                  fontSize: "14.5px",
                  lineHeight: "1.62",
                  color: "var(--ink-soft)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "28px",
                    letterSpacing: "-0.02em",
                    color: "#56732f",
                    marginBottom: "8px",
                  }}
                >
                  ≈8 mg P/g
                </div>
                <p style={{ margin: "0" }}>
                  rePhlow leads across{" "}
                  <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                    all sixteen
                  </strong>{" "}
                  categories at once, set by the most demanding one, ionising
                  radiation.{" "}
                  <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                    This is the retention target we are adopting as the
                    experimental objective.
                  </strong>
                </p>
              </div>
              <div
                style={{
                  background: "rgba(110,90,150,0.07)",
                  border: "1px solid rgba(110,90,150,0.22)",
                  borderRadius: "18px",
                  padding: "20px 22px",
                  fontSize: "14.5px",
                  lineHeight: "1.62",
                  color: "var(--ink-soft)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "28px",
                    letterSpacing: "-0.02em",
                    color: "#5e4c86",
                    marginBottom: "8px",
                  }}
                >
                  ≈12 mg P/g
                </div>
                <p style={{ margin: "0" }}>
                  the single score turns negative: a net environmental benefit
                  once the recovered phosphorus is credited.
                </p>
              </div>
            </div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              So the design target for the laboratory is explicit: engineer the
              beads and the PAO expression to reach and hold{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                at least ~8 mg P per gram of bead
              </strong>{" "}
              under reactor conditions, which the biology already does
              intracellularly,{" "}
              <a className="lab-citation" href="#ref-r03-8">
                [8]
              </a>{" "}
              and the climate and fossil-resource readings follow the rest of
              the sixteen downward. A second, parallel reflection follows from
              Reading 2: the same result can be reached from the carbon side by
              decarbonising bead production itself, which is why the
              bacterial-alginate route matters as a research direction even
              though it is not yet in our inventory. The circular-economy
              literature frames exactly this double move, higher recovery
              efficiency plus lower-impact materials, as the condition under
              which nutrient recovery becomes a net environmental good rather
              than a tidier waste. [14][19] Sustainability and experimental
              design are not two conversations here; the LCA is the bridge
              between them, and it says plainly that the next gram of phosphorus
              retained per gram of bead is worth more than any rephrasing of the
              result. That is the measurable sense in which rePhlow addresses
              its SDGs: not by claiming the finish line, but by naming exactly
              how far the bench still has to carry it, and proving the distance
              is short.
            </p>
            <details
              style={{
                margin: "48px 0 8px",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "var(--paper-soft)",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  padding: "15px 22px",
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "var(--ink)",
                }}
              >
                References
              </summary>
              <ol
                style={{
                  margin: "0",
                  padding: "2px 26px 20px 48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <li
                  id="ref-r03-1"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  International Organization for Standardization. ISO 14040:2006
                  Environmental management — Life cycle assessment — Principles
                  and framework; ISO 14044:2006 Requirements and guidelines.
                  Geneva: ISO; 2006.
                </li>
                <li
                  id="ref-r03-2"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Andreasi Bassi S, et al. Updated characterisation and
                  normalisation factors for the Environmental Footprint (EF) 3.1
                  method. Luxembourg: Publications Office of the European Union;
                  2023. doi:10.2760/798894. Related to Commission Recommendation
                  (EU) 2021/2279.
                </li>
                <li
                  id="ref-r03-3"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Directive (EU) 2024/3019 of the European Parliament and of the
                  Council of 27 November 2024 concerning urban wastewater
                  treatment (recast). Off J Eur Union. 2024 Dec 12;L 2024/3019.
                  Available from:{" "}
                  <a
                    href="https://eur-lex.europa.eu/eli/dir/2024/3019/oj/eng"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://eur-lex.europa.eu/eli/dir/2024/3019/oj/eng
                  </a>
                </li>
                <li
                  id="ref-r03-4"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Chiew CSC, et al. LCA on alginate-based beads. J Water Process
                  Eng. 2022;45:102531.
                </li>
                <li
                  id="ref-r03-5"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Nielsen PH, et al. Cradle-to-gate assessment of enzyme
                  products. Int J Life Cycle Assess. 2007;12(6):432–8.
                </li>
                <li
                  id="ref-r03-6"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Rittmann BE, McCarty PL. Environmental biotechnology:
                  principles and applications. New York: McGraw-Hill; 2001.
                </li>
                <li
                  id="ref-r03-7"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Sala S, Cerutti AK, Pant R. Global normalisation factors for
                  the Environmental Footprint and Life Cycle Assessment.
                  Luxembourg: Publications Office of the European Union; 2017.
                  Report No.: JRC109878.
                </li>
                <li
                  id="ref-r03-8"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Contreras-Abara P, et al. Continuous bioproduction of
                  bacterial alginate under nitrogen fixation. Fermentation.
                  2023;9(5):426. doi:10.3390/fermentation9050426.
                </li>
                <li
                  id="ref-r03-9"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Conley DJ, et al. Controlling eutrophication: nitrogen and
                  phosphorus. Science. 2009;323(5917):1014–5.
                  doi:10.1126/science.1167755.
                </li>
                <li
                  id="ref-r03-10"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Jupp AR, et al. Phosphorus recovery and recycling — closing
                  the loop. Chem Soc Rev. 2021;50(1):87–101.
                  doi:10.1039/D0CS01150A.
                </li>
                <li
                  id="ref-r03-11"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Zhao Q, et al. Towards low energy-carbon footprint: P recovery
                  paths in wastewater treatment. J Environ Manage.
                  2023;344:118653. doi:10.1016/j.jenvman.2023.118653.
                </li>
              </ol>
            </details>
          </section>
          <section
            id="r04"
            data-screen-label="Room 04"
            style={{
              scrollMarginTop: "110px",
              padding: "72px 0 28px",
              borderTop: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                background: "#54437a",
                borderRadius: "28px",
                padding: "clamp(20px,3vw,34px)",
                margin: "4px 0 30px",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "18px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "clamp(70px,9vw,104px)",
                    lineHeight: "0.8",
                    letterSpacing: "-0.05em",
                    color: "#DDD3EF",
                  }}
                >
                  04
                </span>
                <h2
                  style={{
                    margin: "0 0 2px",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(30px,3.8vw,40px)",
                    lineHeight: "1.1",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "15px",
                      letterSpacing: "0",
                      fontWeight: "600",
                      color: "#DDD3EF",
                      marginBottom: "8px",
                    }}
                  >
                    Impact
                  </span>
                  The impact amphitheatre
                </h2>
              </div>
              <div style={{ position: "relative", margin: "28px 0 8px" }}>
                <div
                  style={{
                    borderRadius:
                      "240px 240px 28px 28px / 120px 120px 28px 28px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-card)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/room04-amphitheatre.jpg")}
                    alt="The impact amphitheatre: a round debate room overlooking a green city"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "clamp(280px,38vw,430px)",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: `${stagePos}`,
                    left: "3%",
                    bottom: "0",
                    marginTop: `${stageMt}`,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: "0",
                    maxWidth: "94%",
                    pointerEvents: "none",
                    zIndex: "2",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/phlowi-4.png")}
                    alt="Phlowi at the lectern"
                    style={{
                      width: `${mascotW}`,
                      height: "auto",
                      flex: "none",
                      filter: "drop-shadow(0 16px 22px rgba(27,35,64,0.38))",
                      animation: "bob 5s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      margin: "0 0 26px",
                      maxWidth: `${speechMax}`,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.85)",
                      borderRadius: "22px",
                      padding: "16px 20px",
                      boxShadow: "var(--shadow-soft)",
                      pointerEvents: "auto",
                    }}
                  >
                    <p
                      style={{
                        margin: "0",
                        fontSize: "15.5px",
                        lineHeight: "1.55",
                        color: "var(--ink)",
                        textWrap: "pretty",
                      }}
                    >
                      “Step into the round room. The screens you just read are
                      only worth something if they change a life outside this
                      building. So let us turn numbers into consequences, and
                      let me hand the microphone to some people who are not us.”
                    </p>
                    <p
                      style={{
                        margin: "12px 0 0",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--line)",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "15px",
                        lineHeight: "1.4",
                        color: "#5e4c86",
                        textWrap: "pretty",
                      }}
                    >
                      Did the team address the potential long-term social,
                      environmental and economic impacts of its work, in the
                      context of the chosen SDGs?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: "8px" }}></div>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              A measured benefit is a promise; impact is the promise kept, in
              the world, across three arenas and two horizons at once. Below,
              each arena is read honestly: what rePhlow plausibly changes, and
              what it could cost, in the short term (a pilot at a single
              industrial partner) and the long term (wide adoption). The 2×2 is
              deliberate: a technology that only lists its upsides has not
              finished thinking.
            </p>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                lineHeight: "1.35",
                fontWeight: "600",
                color: "#5e4c86",
                margin: "36px 0 10px",
                textWrap: "balance",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Environmental impact
              </strong>
            </h5>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Phosphorus has no substitute in agriculture and comes almost
              entirely from finite phosphate rock, a Critical Raw Material whose
              production is forecast to peak around mid-century;{" "}
              <a className="lab-citation" href="#ref-r04-1">
                [1]
              </a>
              <a className="lab-citation" href="#ref-r04-8">
                [8]
              </a>{" "}
              discharging it is the principal driver of the eutrophication that
              turns living water into oxygen-poor dead zones.{" "}
              <a className="lab-citation" href="#ref-r04-2">
                [2]
              </a>{" "}
              rePhlow intervenes exactly where that element is most concentrated
              and most recoverable.
            </p>
            <p
              style={{
                margin: "34px 0 10px",
                fontSize: "13.5px",
                lineHeight: "1.55",
                color: "var(--ink-soft)",
              }}
            >
              <b
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Table 5.
              </b>{" "}
              Environmental impact of rePhlow across two horizons.
            </p>
            <div
              style={{
                margin: "10px 0 28px",
                overflowX: "auto",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "#fff",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14.5px",
                  minWidth: "560px",
                }}
              >
                <tbody>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    ></th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Short term (pilot)
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Long term (wide adoption)
                    </th>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        whiteSpace: "nowrap",
                        background: "var(--paper-soft)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Positive (+)
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(124,154,78,0.07)",
                      }}
                    >
                      Cleaner water returned to the environment; no hazardous
                      metal sludge produced; phosphorus pulled from a waste
                      stream instead of discharged. [14]
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(124,154,78,0.07)",
                      }}
                    >
                      Phosphorus kept in the loop at scale, less mined rock and
                      less eutrophication; a measurable contribution to closing
                      the nutrient cycle.{" "}
                      <a className="lab-citation" href="#ref-r04-3">
                        [3]
                      </a>
                      [14]
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        whiteSpace: "nowrap",
                        background: "var(--paper-soft)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Negative (−)
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(226,84,45,0.06)",
                      }}
                    >
                      Energy and materials for bead production give a higher
                      carbon footprint than chemical dosing at low yield (Room
                      03).
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(226,84,45,0.06)",
                      }}
                    >
                      A rebound risk: cheap, easy recovery could normalise
                      continued high phosphorus use instead of reducing it at
                      source; grid and material impacts scale with deployment.
                      [19]
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                lineHeight: "1.35",
                fontWeight: "600",
                color: "#5e4c86",
                margin: "36px 0 10px",
                textWrap: "balance",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Social impact
              </strong>
            </h5>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Clean water and food are the stakes. Excess nutrients damage
              fisheries, drinking water and the communities that depend on them,{" "}
              <a className="lab-citation" href="#ref-r04-2">
                [2]
              </a>{" "}
              and because there is no substitute for phosphorus in fertiliser,{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                phosphorus security is food security
              </strong>
              : the 2008 phosphate-rock price spike fed straight through into
              global food prices.{" "}
              <a className="lab-citation" href="#ref-r04-1">
                [1]
              </a>
            </p>
            <p
              style={{
                margin: "34px 0 10px",
                fontSize: "13.5px",
                lineHeight: "1.55",
                color: "var(--ink-soft)",
              }}
            >
              <b
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Table 6.
              </b>{" "}
              Social impact of rePhlow across two horizons.
            </p>
            <div
              style={{
                margin: "10px 0 28px",
                overflowX: "auto",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "#fff",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14.5px",
                  minWidth: "560px",
                }}
              >
                <tbody>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    ></th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Short term (pilot)
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Long term (wide adoption)
                    </th>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        whiteSpace: "nowrap",
                        background: "var(--paper-soft)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Positive (+)
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(124,154,78,0.07)",
                      }}
                    >
                      A local, visible demonstration that an industrial
                      discharge can be cleaned and its nutrient recovered; a
                      concrete object for public engagement and education.
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(124,154,78,0.07)",
                      }}
                    >
                      A local, renewable source of a critical import loosens
                      dependence on a few foreign mines; stronger regional food
                      and water resilience.{" "}
                      <a className="lab-citation" href="#ref-r04-1">
                        [1]
                      </a>
                      <a className="lab-citation" href="#ref-r04-3">
                        [3]
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        whiteSpace: "nowrap",
                        background: "var(--paper-soft)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Negative (−)
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(226,84,45,0.06)",
                      }}
                    >
                      Public unease about a genetically modified organism near
                      water, if not met with honest explanation.
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(226,84,45,0.06)",
                      }}
                    >
                      Uneven access: a skill- and capital-intensive technology
                      may reach well-resourced, well-regulated settings first,
                      widening rather than closing a gap unless deliberately
                      transferred.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                lineHeight: "1.35",
                fontWeight: "600",
                color: "#5e4c86",
                margin: "36px 0 10px",
                textWrap: "balance",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Economic impact
              </strong>
            </h5>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              Today a phosphorus-laden effluent is a liability: operators pay
              for reagents to treat it and pay again to dispose of the hazardous
              sludge. rePhlow flips that accounting, avoiding roughly 24 kg of
              FeCl₃ and 13.7 kg of sludge per m³ while yielding ~1.95 kg of
              recovered phosphorus and ~1 m³ of reusable water. [14]
            </p>
            <p
              style={{
                margin: "34px 0 10px",
                fontSize: "13.5px",
                lineHeight: "1.55",
                color: "var(--ink-soft)",
              }}
            >
              <b
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Table 7.
              </b>{" "}
              Economic impact of rePhlow across two horizons.
            </p>
            <div
              style={{
                margin: "10px 0 28px",
                overflowX: "auto",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "#fff",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14.5px",
                  minWidth: "560px",
                }}
              >
                <tbody>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    ></th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Short term (pilot)
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontFamily: "var(--font-display)",
                        fontWeight: "600",
                        fontSize: "13.5px",
                        lineHeight: "1.35",
                        color: "var(--ink)",
                        background: "var(--paper-soft)",
                        borderBottom: "1px solid rgba(27,35,64,0.12)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Long term (wide adoption)
                    </th>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        whiteSpace: "nowrap",
                        background: "var(--paper-soft)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Positive (+)
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(124,154,78,0.07)",
                      }}
                    >
                      Avoided reagent and sludge-management costs; a new product
                      (recovered phosphorus) and reusable water on the balance
                      sheet.
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(124,154,78,0.07)",
                      }}
                    >
                      A treatment plant becomes a resource-recovery facility;
                      with a policy-created market for recycled phosphorus, a
                      cost centre becomes a revenue line.{" "}
                      <a className="lab-citation" href="#ref-r04-3">
                        [3]
                      </a>
                      [14]
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        whiteSpace: "nowrap",
                        background: "var(--paper-soft)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--ink)", fontWeight: "600" }}
                      >
                        Negative (−)
                      </strong>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(226,84,45,0.06)",
                      }}
                    >
                      Higher capital cost and operator skill than chemical
                      dosing; recovered phosphorus must compete with cheaper
                      mined mineral phosphorus.
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "none",
                        verticalAlign: "top",
                        lineHeight: "1.55",
                        color: "var(--ink-soft)",
                        background: "rgba(226,84,45,0.06)",
                      }}
                    >
                      Without a mandated blend or subsidy, the economics may not
                      close at today's phosphate prices; cost could pass to the
                      end user or the citizen.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              ref={tankRef}
              style={{
                margin: "30px 0",
                border: "1px solid rgba(31,124,140,0.14)",
                borderRadius: "28px",
                background:
                  "linear-gradient(135deg,var(--water-clear),#ffffff)",
                padding: "clamp(20px,3vw,30px)",
                boxShadow: "var(--shadow-card)",
                display: "flex",
                gap: "30px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <svg
                viewBox="0 0 170 240"
                width="140"
                aria-hidden="true"
                style={{ flex: "none" }}
              >
                <defs>
                  <clipPath id="tankGlass">
                    <rect x="22" y="16" width="126" height="196" rx="18"></rect>
                  </clipPath>
                  <linearGradient id="tankWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7fd0dc"></stop>
                    <stop offset="1" stopColor="#1f7c8c"></stop>
                  </linearGradient>
                </defs>
                <rect
                  x="22"
                  y="16"
                  width="126"
                  height="196"
                  rx="18"
                  fill="#f4faf9"
                  stroke="rgba(27,35,64,0.12)"
                ></rect>
                <g clipPath="url(#tankGlass)">
                  <g ref={tankGRef} transform="translate(0,196)">
                    <path
                      d="M0,0 q22,-9 44,0 t44,0 t44,0 t44,0 v240 h-176 Z"
                      fill="url(#tankWater)"
                    ></path>
                    <circle
                      cx="60"
                      cy="40"
                      r="5"
                      fill="rgba(255,255,255,0.5)"
                    ></circle>
                    <circle
                      cx="104"
                      cy="70"
                      r="3.5"
                      fill="rgba(255,255,255,0.45)"
                    ></circle>
                    <circle
                      cx="80"
                      cy="100"
                      r="4"
                      fill="rgba(255,255,255,0.4)"
                    ></circle>
                  </g>
                </g>
                <rect
                  x="22"
                  y="16"
                  width="126"
                  height="196"
                  rx="18"
                  fill="none"
                  stroke="#bfe2e4"
                  strokeWidth="2"
                ></rect>
                <rect
                  x="34"
                  y="28"
                  width="8"
                  height="150"
                  rx="4"
                  fill="rgba(255,255,255,0.6)"
                ></rect>
                <rect
                  x="60"
                  y="212"
                  width="50"
                  height="14"
                  rx="4"
                  fill="#bfe2e4"
                ></rect>
              </svg>
              <div style={{ flex: "1", minWidth: "240px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "clamp(42px,6vw,60px)",
                    lineHeight: "1",
                    color: "#1f6f7d",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <span ref={waterRef}>0</span>
                </div>
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "var(--ink)",
                  }}
                >
                  m³ of reusable water, every year
                </div>
                <div
                  style={{
                    marginTop: "2px",
                    fontSize: "14px",
                    color: "#56732f",
                    fontWeight: "600",
                  }}
                >
                  at ≈20 m³/h of pilot throughput
                </div>
                <p
                  style={{
                    margin: "14px 0 0",
                    fontSize: "15px",
                    lineHeight: "1.65",
                    color: "var(--ink-soft)",
                    maxWidth: "62ch",
                    textWrap: "pretty",
                  }}
                >
                  <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                    Water, in a country running dry.
                  </strong>{" "}
                  Spain and the Mediterranean arc face structural water
                  scarcity, and treated wastewater is already one of the
                  region's most important non-conventional resources.{" "}
                  <a className="lab-citation" href="#ref-r04-5">
                    [5]
                  </a>{" "}
                  Because rePhlow returns roughly a full cubic metre of
                  ultrafiltered, salt-free water per cubic metre treated, it
                  does not just clean water, it gives water back, where water is
                  scarce and where our industrial partner operates.
                </p>
              </div>
            </div>
            <h4
              id="r04-the-round-table-four-seats-that-rarely-s"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "21px",
                lineHeight: "1.3",
                fontWeight: "600",
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                margin: "44px 0 12px",
                textWrap: "balance",
                scrollMarginTop: "110px",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                The round table: four seats that rarely share a table
              </strong>
            </h4>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "16px",
                lineHeight: "1.72",
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              To pressure-test all of this we refused to be the only judges of
              our own work. On{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                24 September 2026
              </strong>
              , at the Faculty of Biological Sciences of the UCM, we convened a
              public round table,{" "}
              <em>
                "From waste to resource: the circular economy of phosphorus and
                water"
              </em>
              , broadcast live. It was opened by{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Domingo Marquina
              </strong>
              , vice-dean of the faculty, and inaugurated by{" "}
              <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                Alejandro Javier Rescia
              </strong>
              , adviser to the Vice-rector for Sustainability, and moderated by
              Diego. Four sectors took a seat, each opening one block and then
              debating freely.
            </p>
            <p style={{ margin: "4px 0 22px" }}>
              <a
                href="https://www.youtube.com/live/sFQMw0fIar0"
                target="_blank"
                rel="noopener"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 18px",
                  borderRadius: "999px",
                  background: "var(--ink)",
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "14.5px",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z"></path>
                </svg>
                Watch the full recording
              </a>
            </p>
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "14px",
                color: "var(--ink-soft)",
              }}
            >
              Tap a seat to read the exchange.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(165px,1fr))",
                gap: "14px",
                margin: "12px 0 28px",
              }}
            >
              <button
                type="button"
                onClick={open1}
                aria-label="Read the exchange with Silvia Díaz del Toro"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "28px",
                  padding: "24px 18px 20px",
                  boxShadow: "var(--shadow-card)",
                  transition: "transform .25s ease,box-shadow .25s ease",
                }}
                data-hover="dcH2"
              >
                <div
                  style={{
                    width: "116px",
                    height: "116px",
                    borderRadius: "50%",
                    padding: "4px",
                    flex: "none",
                    background:
                      "conic-gradient(from -50deg,#7C9A4E,#9CC9B8,#6E5A96,#7C9A4E)",
                    boxShadow: "0 10px 22px rgba(27,35,64,0.16)",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/seat-1.png")}
                    alt="Silvia Díaz del Toro"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center 18%",
                      border: "3px solid #fff",
                      background: "var(--paper-soft)",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "12.5px",
                    fontWeight: "600",
                    color: "#5e4c86",
                  }}
                >
                  Seat 1 · Academia & research
                </div>
                <div
                  style={{
                    marginTop: "4px",
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "var(--ink)",
                  }}
                >
                  Silvia Díaz del Toro
                </div>
                <div style={{ fontSize: "13.5px", color: "var(--ink-soft)" }}>
                  UCM
                </div>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    fontStyle: "italic",
                    color: "var(--ink)",
                  }}
                >
                  “Design for your specific effluent, and prove it at the
                  reactor, not the flask.”
                </p>
                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "13.5px",
                    fontWeight: "600",
                    color: "#4d6a2a",
                  }}
                >
                  Read the exchange →
                </div>
              </button>
              <button
                type="button"
                onClick={open2}
                aria-label="Read the exchange with Juan Manuel Ortiz"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "28px",
                  padding: "24px 18px 20px",
                  boxShadow: "var(--shadow-card)",
                  transition: "transform .25s ease,box-shadow .25s ease",
                }}
                data-hover="dcH2"
              >
                <div
                  style={{
                    width: "116px",
                    height: "116px",
                    borderRadius: "50%",
                    padding: "4px",
                    flex: "none",
                    background:
                      "conic-gradient(from -50deg,#7C9A4E,#9CC9B8,#6E5A96,#7C9A4E)",
                    boxShadow: "0 10px 22px rgba(27,35,64,0.16)",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/seat-2.png")}
                    alt="Juan Manuel Ortiz"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center 18%",
                      border: "3px solid #fff",
                      background: "var(--paper-soft)",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "12.5px",
                    fontWeight: "600",
                    color: "#5e4c86",
                  }}
                >
                  Seat 2 · Industry & economy
                </div>
                <div
                  style={{
                    marginTop: "4px",
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "var(--ink)",
                  }}
                >
                  Juan Manuel Ortiz
                </div>
                <div style={{ fontSize: "13.5px", color: "var(--ink-soft)" }}>
                  IMDEA Agua
                </div>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    fontStyle: "italic",
                    color: "var(--ink)",
                  }}
                >
                  “Sustainability has to survive a balance sheet; regulation is
                  what lets it.”
                </p>
                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "13.5px",
                    fontWeight: "600",
                    color: "#4d6a2a",
                  }}
                >
                  Read the exchange →
                </div>
              </button>
              <button
                type="button"
                onClick={open3}
                aria-label="Read the exchange with Roberto Arranz"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "28px",
                  padding: "24px 18px 20px",
                  boxShadow: "var(--shadow-card)",
                  transition: "transform .25s ease,box-shadow .25s ease",
                }}
                data-hover="dcH2"
              >
                <div
                  style={{
                    width: "116px",
                    height: "116px",
                    borderRadius: "50%",
                    padding: "4px",
                    flex: "none",
                    background:
                      "conic-gradient(from -50deg,#7C9A4E,#9CC9B8,#6E5A96,#7C9A4E)",
                    boxShadow: "0 10px 22px rgba(27,35,64,0.16)",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/seat-3.png")}
                    alt="Roberto Arranz"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center 18%",
                      border: "3px solid #fff",
                      background: "var(--paper-soft)",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "12.5px",
                    fontWeight: "600",
                    color: "#5e4c86",
                  }}
                >
                  Seat 3 · Policy & regulation
                </div>
                <div
                  style={{
                    marginTop: "4px",
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "var(--ink)",
                  }}
                >
                  Roberto Arranz
                </div>
                <div style={{ fontSize: "13.5px", color: "var(--ink-soft)" }}>
                  CEDEX
                </div>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    fontStyle: "italic",
                    color: "var(--ink)",
                  }}
                >
                  “The bottleneck may be funding and permitting, not the
                  science; a sandbox is rePhlow's realistic route in.”
                </p>
                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "13.5px",
                    fontWeight: "600",
                    color: "#4d6a2a",
                  }}
                >
                  Read the exchange →
                </div>
              </button>
              <button
                type="button"
                onClick={open4}
                aria-label="Read the exchange with Elvira Mateos"
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "28px",
                  padding: "24px 18px 20px",
                  boxShadow: "var(--shadow-card)",
                  transition: "transform .25s ease,box-shadow .25s ease",
                }}
                data-hover="dcH2"
              >
                <div
                  style={{
                    width: "116px",
                    height: "116px",
                    borderRadius: "50%",
                    padding: "4px",
                    flex: "none",
                    background:
                      "conic-gradient(from -50deg,#7C9A4E,#9CC9B8,#6E5A96,#7C9A4E)",
                    boxShadow: "0 10px 22px rgba(27,35,64,0.16)",
                  }}
                >
                  <img
                    src={asset("assets/sustainability/seat-4.png")}
                    alt="Elvira Mateos"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center 18%",
                      border: "3px solid #fff",
                      background: "var(--paper-soft)",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "12.5px",
                    fontWeight: "600",
                    color: "#5e4c86",
                  }}
                >
                  Seat 4 · Society & NGOs
                </div>
                <div
                  style={{
                    marginTop: "4px",
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "var(--ink)",
                  }}
                >
                  Elvira Mateos
                </div>
                <div style={{ fontSize: "13.5px", color: "var(--ink-soft)" }}>
                  EU Bioeconomy Ambassador
                </div>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    fontStyle: "italic",
                    color: "var(--ink)",
                  }}
                >
                  “Acceptance is earned by explanation; our no-release framing
                  is the condition for impact.”
                </p>
                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "13.5px",
                    fontWeight: "600",
                    color: "#4d6a2a",
                  }}
                >
                  Read the exchange →
                </div>
              </button>
            </div>
            <figure className="sus-narrow" style={{ margin: "34px 0" }}>
              <div
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid var(--line)",
                  background: "#fff",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <img
                  src={asset("assets/sustainability/roundtable-group.jpg")}
                  alt="Round table participants at the Faculty of Biological Sciences, UCM"
                  onClick={zoom}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    cursor: "zoom-in",
                  }}
                />
              </div>
              <figcaption
                style={{
                  margin: "12px 0 0",
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                  textWrap: "pretty",
                }}
              >
                Round table, 24 September 2026, Faculty of Biological Sciences,
                UCM.
              </figcaption>
            </figure>
            <div
              id="r04-closing-reflection-the-ethics-of-a-conta"
              className="sus-disclosure"
            >
              <AccordionSection title="Closing reflection — the ethics of a contained organism">
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "16px",
                    lineHeight: "1.72",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  <strong style={{ color: "var(--ink)", fontWeight: "600" }}>
                    What it means to put a living thing to work on a problem we
                    made.
                  </strong>{" "}
                  Four rooms asked four questions, and read in sequence they are
                  one question. Room 01 asked whether we had weighed what our
                  work costs the goals it does not serve, and we answered by
                  naming climate as a declared cost rather than hiding it. Room
                  02 asked whether we let other people change the project, and
                  the honest answer was that the people who redrew rePhlow most,
                  Bio-Oils, CEDEX, Repsol, a resident of a reservoir, were
                  rarely the people we were most comfortable talking to. Room 03
                  asked whether we had measurably moved an SDG, and the
                  instruments replied with a number and a distance still to
                  cover. This room asks about the long-term consequences, and
                  the round table answered in a voice that was not ours.
                </p>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "16px",
                    lineHeight: "1.72",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  The ethical core of rePhlow is modest and specific. We are
                  proposing to place a genetically modified organism into the
                  path of water that returns to an ecosystem, in order to
                  recover an element that civilisation cannot do without and is
                  currently flushing to the sea. The benefit is real: phosphorus
                  kept in the loop, nitrogen taken down with it, a hazardous
                  sludge never made, water given back to a dry country. But
                  every one of those benefits is a promise that holds only while
                  the organism stays inside the reactor, which is why
                  containment is not a feature we added to reassure a regulator;
                  it is the precondition that makes the whole project
                  permissible, and it is the reason the EU governs contained use
                  of modified micro-organisms as a category of its own. [17] An
                  industrial operator told us nothing else would be discussed
                  until that evidence existed, and he was right to.
                </p>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "16px",
                    lineHeight: "1.72",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  There is a deeper tension the round table named and we should
                  not paper over. A technology that makes phosphorus recovery
                  cheap and routine could, perversely, remove the pressure to
                  use less of it at source, the rebound that haunts every
                  efficiency gain; [19] and a tool this capital- and
                  skill-intensive could reach the well-resourced first and widen
                  the very gap SDGs 9 and 10 ask us to close. We do not have
                  clean answers to either, and we think saying so is part of
                  doing this responsibly. What we can do is be precise about
                  what would have to be true for the benefit to outweigh the
                  cost: beads that hold at least eight milligrams of phosphorus
                  per gram, cells that demonstrably do not leave the vessel, a
                  decarbonised bead material, and a regulation and a market, the
                  sandbox and the mandated blend the panel described, that let a
                  recovered nutrient compete with a mined one.
                </p>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "16px",
                    lineHeight: "1.72",
                    color: "var(--ink-soft)",
                    textWrap: "pretty",
                  }}
                >
                  That is why we have been deliberately careful about what we
                  claim. A screening LCA is not a certificate, structural
                  capsule integrity is not biological retention, and a
                  laboratory accumulation figure is not a plant running for a
                  year. The role of a project like this in sustainability is not
                  to arrive with a finished answer; it is to show that the
                  honest version of the answer is close enough to be worth
                  reaching, and to keep those conditions in view, alongside the
                  four questions on the walls of these rooms. Do that, and
                  rePhlow stops being a clever device and becomes what it was
                  meant to be: a small, testable argument that a waste can be a
                  resource, made by the people who will have to live with the
                  result.
                </p>
              </AccordionSection>
            </div>
            <details
              style={{
                margin: "48px 0 8px",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                background: "var(--paper-soft)",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  padding: "15px 22px",
                  fontFamily: "var(--font-display)",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "var(--ink)",
                }}
              >
                References
              </summary>
              <ol
                style={{
                  margin: "0",
                  padding: "2px 26px 20px 48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <li
                  id="ref-r04-1"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Cordell D, Drangert JO, White S. The story of phosphorus:
                  Global food security and food for thought. Global
                  Environmental Change [Internet]. 2009 Feb 17;19(2):292–305.
                  Available from:{" "}
                  <a
                    href="https://doi.org/10.1016/j.gloenvcha.2008.10.009"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1016/j.gloenvcha.2008.10.009
                  </a>
                </li>
                <li
                  id="ref-r04-2"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Conley DJ, Paerl HW, Howarth RW, Boesch DF, Seitzinger SP,
                  Havens KE, et al. Controlling eutrophication: nitrogen and
                  phosphorus. Science [Internet]. 2009 Feb 19;323(5917):1014–5.
                  Available from:{" "}
                  <a
                    href="https://doi.org/10.1126/science.1167755"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1126/science.1167755
                  </a>
                </li>
                <li
                  id="ref-r04-3"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Jupp AR, Beijer S, Narain GC, Schipper W, Slootweg JC.
                  Phosphorus recovery and recycling – closing the loop. Chemical
                  Society Reviews [Internet]. 2020 Nov 19;50(1):87–101.
                  Available from:{" "}
                  <a
                    href="https://doi.org/10.1039/d0cs01150a"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1039/d0cs01150a
                  </a>
                </li>
                <li
                  id="ref-r04-4"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Melgarejo J, Prats D, Molina A, Trapote A. A case study of
                  urban wastewater reclamation in Spain: comparison of water
                  quality produced by using alternative processes and related
                  costs. Journal of Water Reuse and Desalination [Internet].
                  2015 Jun 23;6(1):72–81. Available from:{" "}
                  <a
                    href="https://doi.org/10.2166/wrd.2015.147"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.2166/wrd.2015.147
                  </a>
                </li>
                <li
                  id="ref-r04-5"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  U.S. Geological Survey. Mineral commodity summaries 2026:
                  phosphate rock [Internet]. Reston (VA): USGS; 2026 [cited 2026
                  Oct 12]. Available from:{" "}
                  <a
                    href="https://doi.org/10.3133/mcs2026"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.3133/mcs2026
                  </a>
                </li>
                <li
                  id="ref-r04-6"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Rittmann BE, McCarty PL. Environmental biotechnology:
                  principles and applications. New York: McGraw-Hill; 2001.
                </li>
                <li
                  id="ref-r04-7"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Directive 2009/41/EC of the European Parliament and of the
                  Council of 6 May 2009 on the contained use of genetically
                  modified micro-organisms (recast). Off J Eur Union. 2009 May
                  21;L 125:75–97. Available from:{" "}
                  <a
                    href="https://eur-lex.europa.eu/eli/dir/2009/41/oj"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://eur-lex.europa.eu/eli/dir/2009/41/oj
                  </a>
                </li>
                <li
                  id="ref-r04-8"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Zhao Q, Ying H, Liu Y, Wang H, Xu J, Wang W, et al. Towards
                  low energy-carbon footprint: Current versus potential P
                  recovery paths in domestic wastewater treatment plants.
                  Journal of Environmental Management [Internet]. 2023 Jul
                  19;344:118653. Available from:{" "}
                  <a
                    href="https://doi.org/10.1016/j.jenvman.2023.118653"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://doi.org/10.1016/j.jenvman.2023.118653
                  </a>
                </li>
                <li
                  id="ref-r04-9"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  European Commission. A sustainable bioeconomy for Europe:
                  strengthening the connection between economy, society and the
                  environment — updated Bioeconomy Strategy. Brussels: European
                  Commission; 2018.
                </li>
                <li
                  id="ref-r04-10"
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "var(--ink-soft)",
                    overflowWrap: "anywhere",
                  }}
                >
                  rePhlow – iGEM UCM. Del residuo al recurso: la economía
                  circular del fósforo y el agua [round table on the Internet].
                  Madrid: Facultad de Ciencias Biológicas, Universidad
                  Complutense de Madrid; 2026 Sep 24 [cited 2026 Oct 12].
                  Available from:{" "}
                  <a
                    href="https://www.youtube.com/live/sFQMw0fIar0"
                    className="record-reference-link"
                    target="_blank"
                    rel="noopener"
                  >
                    https://www.youtube.com/live/sFQMw0fIar0
                  </a>
                </li>
              </ol>
            </details>
          </section>
        </main>
      </div>

      <AdjacentPageNav
        prev={{
          to: "/entrepreneurship",
          label: "Entrepreneurship",
          accent: "#C9572F",
        }}
        next={{ to: "/contribution", label: "Contribution", accent: "#2E7D86" }}
      />

      {modalOpen && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(27,35,64,0.55)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={stop}
            role="dialog"
            aria-modal="true"
            style={{
              position: "relative",
              background: "#fff",
              borderRadius: "28px",
              maxWidth: zoomed ? "min(1100px,96vw)" : "680px",
              width: "100%",
              maxHeight: "88vh",
              overflow: "auto",
              boxShadow: "0 30px 80px rgba(27,35,64,0.3)",
              animation: "modalIn .36s cubic-bezier(.2,.7,.2,1)",
            }}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              style={{
                all: "unset",
                cursor: "pointer",
                position: "absolute",
                top: "16px",
                right: "18px",
                zIndex: 3,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "var(--ink-soft)",
                background: "var(--paper-soft)",
              }}
            >
              ✕
            </button>

            {zoomed && (
              <img
                src={zoomed.src}
                alt={zoomed.alt}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  borderRadius: "28px",
                }}
              />
            )}

            {openSeat && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "18px",
                    alignItems: "center",
                    padding: "24px 28px",
                    borderBottom: "1px solid var(--line)",
                    position: "sticky",
                    top: 0,
                    background: "#fff",
                    zIndex: 1,
                    borderRadius: "28px 28px 0 0",
                  }}
                >
                  <div
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "50%",
                      padding: "4px",
                      flex: "none",
                      background:
                        "conic-gradient(from -50deg,#7C9A4E,#9CC9B8,#6E5A96,#7C9A4E)",
                      boxShadow: "0 10px 22px rgba(27,35,64,0.16)",
                    }}
                  >
                    <img
                      src={asset(openSeat.photo)}
                      alt={openSeat.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        objectPosition: "center 18%",
                        border: "3px solid #fff",
                        background: "var(--paper-soft)",
                        display: "block",
                      }}
                    />
                  </div>
                  <div style={{ paddingRight: "30px" }}>
                    <div
                      style={{
                        fontSize: "12.5px",
                        fontWeight: 600,
                        color: "#5e4c86",
                      }}
                    >
                      {openSeat.seat}
                    </div>
                    <div
                      style={{
                        marginTop: "3px",
                        fontFamily: "var(--font-display)",
                        fontSize: "22px",
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}
                    >
                      {openSeat.name}
                    </div>
                    <div style={{ fontSize: "14px", color: "var(--ink-soft)" }}>
                      {openSeat.org}
                    </div>
                  </div>
                </div>
                <div style={{ padding: "22px 28px 14px" }}>
                  {openSeat.body.map((paragraph, index) => (
                    <p key={index} style={MODAL_P}>
                      {paragraph.lead && (
                        <strong
                          style={{ color: "var(--ink)", fontWeight: 600 }}
                        >
                          {paragraph.lead}
                        </strong>
                      )}
                      {paragraph.lead ? " " : null}
                      {paragraph.italic ? (
                        <em>{paragraph.text}</em>
                      ) : (
                        paragraph.text
                      )}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const MODAL_P: CSSProperties = {
  margin: "0 0 14px",
  fontSize: "15px",
  lineHeight: 1.7,
  color: "var(--ink-soft)",
};
