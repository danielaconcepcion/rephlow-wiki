import { Fragment, useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ACTIVITIES, INTRO, type Activity } from "./educationBoardData.ts";
import { SLATE_HTML } from "./slateMarkup.ts";
import { FigureLightbox, useFigureLightbox } from "../hardware/FigureLightbox.tsx";
import "./EducationBoard.css";

/*
 * Education & Communication (rePhlow - Madrid-UCM 2026).
 * A chalkboard with a wavy chalk timeline: a droplet runs along it lighting
 * each activity, and travels to the one under the mouse. Clicking an object
 * (or a link of the side menu) opens its dialog, with Previous / Next.
 * The page header comes from the wiki layout (pages.ts), as on the lab pages.
 */

const ACCENT = "#6E5A96";
const HEAD_BG = "linear-gradient(135deg, #3a2c5c, #6E5A96)";
const N = ACTIVITIES.length;

/* Same markers as the wiki's RichText: **bold** and *italic*. */
function rich(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+?\*\*|\*(?!\s)[^*]+?\*)/g).map((part, k) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={k}>{part.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(part)) return <em key={k}>{part.slice(1, -1)}</em>;
    return <Fragment key={k}>{part}</Fragment>;
  });
}

const indexOf = (id: string) => ACTIVITIES.findIndex((a) => a.id === id);

export function EducationBoard() {
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState(ACTIVITIES[0].id);
  const wallRef = useRef<HTMLElement | null>(null);

  const show = useCallback((i: number) => {
    setOpen(i);
    setActive(ACTIVITIES[i].id);
  }, []);
  const close = useCallback(() => setOpen(null), []);

  // Arriving with #activity in the URL opens it.
  useEffect(() => {
    const i = indexOf(window.location.hash.slice(1));
    if (i >= 0) show(i);
  }, [show]);

  // Chalk line + droplet animation on the board.
  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return undefined;
    return animateSlate(wall);
  }, []);

  // Board objects open their dialog.
  const onBoardClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const i = indexOf(a.getAttribute("href")!.slice(1));
    if (i < 0) return;
    e.preventDefault();
    show(i);
  };

  return (
    <div className="page-with-section-nav ec-page" style={{ "--ec-accent": ACCENT } as CSSProperties}>
      <nav className="page-section-nav" aria-label="Open an activity">
        <ul className="page-section-nav__list">
          {ACTIVITIES.map((a, i) => (
            <li key={a.id}>
              <a
                className={`page-section-nav__link${a.id === active ? " is-active" : ""}`}
                href={`#${a.id}`}
                aria-current={a.id === active ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  show(i);
                }}
              >
                {i + 1}. {a.chalk}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="page-section-nav__top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span aria-hidden="true">&uarr;</span> Back to top
        </button>
      </nav>

      <div className="ec-col">
        <p className="ec-intro">{rich(INTRO)}</p>
        <section
          className="ec-wall ec-wall--slate"
          aria-label="Our education and communication activities"
          ref={wallRef}
          onClick={onBoardClick}
        >
          <div className="ec-slate-scroll" dangerouslySetInnerHTML={{ __html: SLATE_HTML }} />
          <p className="ec-slate__swipe" aria-hidden="true">
            &larr; swipe the board &rarr;
          </p>
          <div className="ec-ledge" aria-hidden="true">
            <span className="ec-ledge__chalk" />
            <span className="ec-ledge__chalk ec-ledge__chalk--y" />
            <span className="ec-ledge__chalk ec-ledge__chalk--p" />
            <span className="ec-ledge__eraser" />
            <span className="ec-ledge__chalk ec-ledge__chalk--b" />
          </div>
        </section>
      </div>

      {open !== null && (
        <ActivityDialog index={open} onStep={(d) => show((open + d + N) % N)} onClose={close} />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Activity dialog (same design as Collaboration's)
   ------------------------------------------------------------------------- */
function ActivityDialog({
  index,
  onStep,
  onClose,
}: {
  index: number;
  onStep: (dir: number) => void;
  onClose: () => void;
}) {
  const act = ACTIVITIES[index];
  const prev = ACTIVITIES[(index - 1 + N) % N];
  const next = ACTIVITIES[(index + 1) % N];
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const lightbox = useFigureLightbox(bodyRef);
  const keys = useRef({ onStep, onClose });
  keys.current = { onStep, onClose };

  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") keys.current.onClose();
      else if (e.key === "ArrowLeft") keys.current.onStep(-1);
      else if (e.key === "ArrowRight") keys.current.onStep(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      before?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [index]);

  return createPortal(
    <div className="cp-modal ec-dialog">
      <div className="cp-modal__backdrop" onClick={onClose} />
      <div className="cp-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="ec-modal-title">
        <button
          type="button"
          className="cp-modal__step cp-modal__step--prev"
          aria-label={`Previous: ${prev.title}`}
          onClick={() => onStep(-1)}
        >
          &lsaquo;
        </button>
        <button
          type="button"
          className="cp-modal__step cp-modal__step--next"
          aria-label={`Next: ${next.title}`}
          onClick={() => onStep(1)}
        >
          &rsaquo;
        </button>
        <div className="cp-modal__head" style={{ background: HEAD_BG }}>
          <h2 id="ec-modal-title" className="cp-modal__title">
            {act.title}
          </h2>
          <p className="cp-modal__meta">
            Education &amp; Communication
            <span className="cp-modal__counter">
              {index + 1} / {N}
            </span>
          </p>
          <button ref={closeRef} type="button" className="cp-modal__close" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="cp-modal__body ec-modal__body" ref={bodyRef}>
          <div className="cp-stack">
            <p className="cp-kicker">
              {act.date} &middot; {act.place}
            </p>
            {act.body.map((p, k) => (
              <p key={k} className={k === 0 ? "cp-lead" : undefined}>
                {rich(p)}
              </p>
            ))}
            {act.link && (
              <a className="ec-entry__link" href={act.link.href} target="_blank" rel="noreferrer">
                {act.link.label} &#8599;
              </a>
            )}
            <Photos key={act.id} act={act} />
          </div>
        </div>
      </div>
      <FigureLightbox {...lightbox} />
    </div>,
    document.body,
  );
}

function Photos({ act }: { act: Activity }) {
  const photos = act.photos.filter((p) => p.src);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [at, setAt] = useState(0);
  const last = photos.length - 1;

  if (photos.length === 0) return null;
  if (photos.length === 1) {
    const p = photos[0];
    return (
      <figure
        className="ec-modal__photo"
        style={{ aspectRatio: p.ratio, width: `min(100%, calc(56vh * (${p.ratio})))` }}
      >
        <img src={p.src} alt={p.alt} loading="lazy" />
      </figure>
    );
  }

  const go = (dir: number) => {
    const strip = stripRef.current;
    const i = Math.max(0, Math.min(last, at + dir));
    const c = strip?.children[i] as HTMLElement | undefined;
    if (strip && c) strip.scrollTo({ left: c.offsetLeft - strip.offsetLeft, behavior: "smooth" });
    setAt(i);
  };
  const onScroll = () => {
    const strip = stripRef.current;
    if (!strip) return;
    let best = 0;
    let bd = Infinity;
    Array.from(strip.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - strip.offsetLeft - strip.scrollLeft);
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    if (strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4) best = last;
    if (best !== at) setAt(best);
  };

  return (
    <div className="cp-carousel">
      <button
        type="button"
        className="cp-carousel__arrow cp-carousel__arrow--prev"
        aria-label="Previous photo"
        disabled={at === 0}
        onClick={() => go(-1)}
      >
        <svg className="cp-carousel__arrowhead" viewBox="0 0 10 16" aria-hidden="true">
          <path d="M8 2 2 8l6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="cp-carousel__view">
        <div className="cp-gallery" ref={stripRef} onScroll={onScroll}>
          {photos.map((p) => (
            <figure key={p.src} className="cp-gallery__item" style={{ aspectRatio: p.ratio }}>
              <img src={p.src} alt={p.alt} loading="lazy" />
            </figure>
          ))}
        </div>
        <span className="cp-carousel__counter">
          {at + 1} of {photos.length}
        </span>
      </div>
      <button
        type="button"
        className="cp-carousel__arrow cp-carousel__arrow--next"
        aria-label="Next photo"
        disabled={at === last}
        onClick={() => go(1)}
      >
        <svg className="cp-carousel__arrowhead" viewBox="0 0 10 16" aria-hidden="true">
          <path d="M2 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   The board: the chalk line is drawn when it comes into view, then the droplet
   runs along it lighting each activity; hovering (or focusing) an activity
   sends the droplet to it. Returns a cleanup function.
   ------------------------------------------------------------------------- */
function animateSlate(wall: HTMLElement): () => void {
  const svg = wall.querySelector<SVGSVGElement>(".ec-slate__svg");
  const line = svg?.querySelector<SVGPathElement>(".ec-chalk__line");
  const drop = svg?.querySelector<SVGGElement>(".ec-drop");
  if (!svg || !line || !drop) return () => undefined;
  const dots = Array.from(svg.querySelectorAll<SVGCircleElement>(".ec-chalk__dot"));
  const objs = Array.from(wall.querySelectorAll<HTMLElement>(".ec-slate .ec-object"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const len = line.getTotalLength();

  // path length up to each dot (sampling the curve)
  const samples: [number, number, number][] = [];
  const S = 600;
  for (let k = 0; k <= S; k++) {
    const q = line.getPointAtLength((k / S) * len);
    samples.push([q.x, q.y, (k / S) * len]);
  }
  const dotLen = dots.map((c) => {
    const x = Number(c.getAttribute("cx"));
    const y = Number(c.getAttribute("cy"));
    let best = Infinity;
    let at = 0;
    samples.forEach(([sx, sy, sl]) => {
      const d = (sx - x) * (sx - x) + (sy - y) * (sy - y);
      if (d < best) {
        best = d;
        at = sl;
      }
    });
    return at;
  });

  let pos = 0;
  let anim = 0;
  let current = -1;
  const timers: number[] = [];
  function place(L: number) {
    pos = L;
    const pt = line!.getPointAtLength(L);
    drop!.setAttribute("transform", `translate(${pt.x.toFixed(1)},${(pt.y - 6).toFixed(1)})`);
    let cur = -1;
    dotLen.forEach((dl, i) => {
      dots[i].classList.toggle("is-lit", L >= dl - 2);
      if (Math.abs(L - dl) < 3) cur = i;
    });
    if (cur !== -1 && cur !== current) {
      objs.forEach((o, i) => o.classList.toggle("is-current", i === cur));
      current = cur;
    }
  }
  function travel(to: number, ms: number) {
    cancelAnimationFrame(anim);
    if (reduce) {
      place(to);
      return;
    }
    const from = pos;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / ms);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      place(from + (to - from) * e);
      if (t < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  }

  // the line starts undrawn
  line.style.strokeDasharray = String(len);
  line.style.strokeDashoffset = reduce ? "0" : String(len);
  drop.style.opacity = "0";
  function start() {
    wall.classList.add("is-drawn");
    if (reduce) {
      drop!.style.opacity = "1";
      place(dotLen[dotLen.length - 1]);
      return;
    }
    line!.style.transition = "stroke-dashoffset 2.4s ease-in-out";
    line!.style.strokeDashoffset = "0";
    timers.push(
      window.setTimeout(() => {
        drop!.style.transition = "opacity .4s ease";
        drop!.style.opacity = "1";
        place(0);
        travel(dotLen[dotLen.length - 1], 4200);
      }, 2300),
    );
  }
  let io: IntersectionObserver | null = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (en) => {
        if (en[0].isIntersecting) {
          io?.disconnect();
          start();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(wall);
  } else start();

  const handlers = objs.map((o, i) => {
    const go = () => {
      if (!wall.classList.contains("is-drawn")) return;
      const to = dotLen[i];
      travel(to, Math.min(1100, 250 + Math.abs(to - pos) * 0.5));
    };
    o.addEventListener("mouseenter", go);
    o.addEventListener("focus", go);
    return go;
  });

  return () => {
    io?.disconnect();
    cancelAnimationFrame(anim);
    timers.forEach((t) => window.clearTimeout(t));
    objs.forEach((o, i) => {
      o.removeEventListener("mouseenter", handlers[i]);
      o.removeEventListener("focus", handlers[i]);
    });
  };
}
