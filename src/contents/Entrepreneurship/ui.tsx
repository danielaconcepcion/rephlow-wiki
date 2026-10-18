import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode, MouseEvent } from "react";
import { IC } from "./data";
import { cx, sx, photo, PHOTO_POS } from "./util";
import { useInView } from "./hooks";
import { useModal, useUI } from "./state";
import type { UIValue } from "./state";

/* --------------------------------------------------------------------------
   Small building blocks shared by every Entrepreneurship section.
   -------------------------------------------------------------------------- */

/** Line icon in a tinted rounded square (wiki palette). */
export function Icon({ n, c }: { n: string; c?: string }) {
  return (
    <span className="ic" style={sx({ "--ic": c || "var(--c)" })}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: IC[n as keyof typeof IC] ?? "" }}
      />
    </span>
  );
}

/** Renders a reviewed HTML fragment from data.ts (bold, links, <em>…). */
export function Html({
  html,
  as: Tag = "div",
  className,
}: {
  html: string;
  as?: ElementType;
  className?: string;
}) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/* Tabs / selections driven by the shared page state ---------------------- */

interface TabBtnProps {
  k: string;
  v: string | number;
  as?: ElementType;
  className?: string;
  /** Also select on hover (mass-balance terms). */
  hover?: boolean;
  /** Clicking the active item clears the selection (beachhead filter). */
  toggle?: boolean;
  children?: ReactNode;
  [attr: string]: unknown;
}

/** A button (or SVG node) that selects value `v` for key `k`. */
export function TabBtn({
  k,
  v,
  as: Tag = "button",
  className,
  hover,
  toggle,
  children,
  ...rest
}: TabBtnProps) {
  const [cur, set] = useUI<UIValue>(k);
  const on = String(cur) === String(v);
  const pick = () => set(toggle && on ? null : v);
  return (
    <Tag
      {...rest}
      {...(Tag === "button" ? { type: "button" } : {})}
      className={cx(className, on && "on")}
      onClick={pick}
      onMouseEnter={hover ? pick : undefined}
    >
      {children}
    </Tag>
  );
}

/** Shows its children only while key `k` equals `v`. */
export function TabPanel({
  k,
  v,
  className,
  children,
  ...rest
}: {
  k: string;
  v: string | number;
  className?: string;
  children?: ReactNode;
  [attr: string]: unknown;
}) {
  const [cur] = useUI<UIValue>(k);
  return (
    <div {...rest} className={className} hidden={String(cur) !== String(v)}>
      {children}
    </div>
  );
}

/** On/off toggle button for a boolean key. */
export function ToggleBtn({
  k,
  className,
  children,
  ...rest
}: {
  k: string;
  className?: string;
  children?: ReactNode;
  [attr: string]: unknown;
}) {
  const [on, set] = useUI<boolean>(k);
  return (
    <button
      {...rest}
      type="button"
      className={cx(className, on && "on")}
      onClick={() => set(!on)}
    >
      {children}
    </button>
  );
}

/* Scroll-triggered helpers ----------------------------------------------- */

/** Animates the number inside a label ("~2.5 mm", "30") once it is visible. */
export function CountUp({
  text,
  as: Tag = "b",
  threshold = 0.6,
}: {
  text: string;
  as?: ElementType;
  threshold?: number;
}) {
  const [ref, seen] = useInView<HTMLElement>(threshold);
  const m = text.match(/[\d.]+/);
  const [shown, setShown] = useState(m ? text.replace(m[0], "0") : text);
  useEffect(() => {
    if (!seen || !m) return;
    const num = m[0];
    const to = parseFloat(num);
    const dec = (num.split(".")[1] || "").length;
    const t0 = performance.now();
    const dur = 1300;
    let raf = 0;
    const f = (now: number) => {
      const k = Math.max(0, Math.min(1, (now - t0) / dur));
      const e = 1 - Math.pow(1 - k, 3);
      setShown(k < 1 ? text.replace(num, (to * e).toFixed(dec)) : text);
      if (k < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, text]);
  return <Tag ref={ref}>{shown}</Tag>;
}

/* Photo carousel (same treatment as Collaboration and Partnership) ------- */

const Arrow = ({ dir }: { dir: "prev" | "next" }) => (
  <svg className="cp-carousel__arrowhead" viewBox="0 0 10 16">
    <path
      d={dir === "prev" ? "M8 2 2 8l6 6" : "M2 2l6 6-6 6"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Carousel({
  photos,
}: {
  photos: readonly (readonly [number, string])[] | null | undefined;
}) {
  const g = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [edge, setEdge] = useState({ start: true, end: (photos?.length ?? 0) < 2 });
  if (!photos || !photos.length) return null;
  const step = () => {
    const first = g.current?.querySelector(".cp-gallery__item");
    return (first?.getBoundingClientRect().width ?? 0) + 10;
  };
  const go = (d: number) =>
    g.current?.scrollBy({ left: d * step(), behavior: "smooth" });
  const onScroll = () => {
    const el = g.current;
    if (!el) return;
    const w = step();
    setI(Math.min(photos.length - 1, Math.round(el.scrollLeft / (w || 1))));
    setEdge({
      start: el.scrollLeft < 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };
  return (
    <div className="cp-carousel">
      <button
        type="button"
        className="cp-carousel__arrow cp-carousel__arrow--prev"
        aria-label="Previous photo"
        disabled={edge.start}
        onClick={() => go(-1)}
      >
        <Arrow dir="prev" />
      </button>
      <div className="cp-carousel__view">
        <div className="cp-gallery" ref={g} onScroll={onScroll}>
          {photos.map(([n, alt], k) => (
            <figure className="cp-gallery__item" key={n}>
              <img
                style={{ objectPosition: PHOTO_POS[n] || "50% 35%" }}
                src={photo(n)}
                alt={`${alt.replace(/<[^>]+>/g, "")} — photo ${k + 1}`}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
        <span className="cp-carousel__counter">
          {i + 1} of {photos.length}
        </span>
      </div>
      <button
        type="button"
        className="cp-carousel__arrow cp-carousel__arrow--next"
        aria-label="Next photo"
        disabled={edge.end}
        onClick={() => go(1)}
      >
        <Arrow dir="next" />
      </button>
    </div>
  );
}

/* PDF viewer in the page pop-up ------------------------------------------ */

export function PdfButton({
  pdf,
  title,
  className,
  children,
}: {
  pdf: string;
  title: string;
  className?: string;
  children?: ReactNode;
}) {
  const modal = useModal();
  const open = (e: MouseEvent) => {
    e.preventDefault();
    modal.open(
      <>
        <h3 className="modal__t">{title}</h3>
        <object
          className="pdf-viewer__frame"
          data={pdf}
          type="application/pdf"
          aria-label={title}
        >
          <p className="pdf-viewer__fallback">
            The embedded viewer isn't available here.{" "}
            <a href={pdf} download>
              Download the PDF
            </a>{" "}
            instead.
          </p>
        </object>
        <p style={{ marginTop: 12 }}>
          <a className="btn dl" href={pdf} download>
            Download PDF
          </a>
        </p>
      </>,
      "#2E7D86",
      true,
    );
  };
  return (
    <button type="button" className={cx("pdf-btn", className)} onClick={open}>
      {children}
    </button>
  );
}

/** Bio-Oils Huelva mark in the centre of the empathy map. Drop the logo in
 * public/assets/entrepreneurship/logo-bio-oils.png and it replaces the text. */
export function BioOilsMark({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <>
        Bio-Oils
        <br />
        Huelva
      </>
    );
  return <img src={src} alt="Bio-Oils Huelva" onError={() => setFailed(true)} />;
}
