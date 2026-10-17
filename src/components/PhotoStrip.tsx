import { useRef, useState } from "react";

/* --------------------------------------------------------------------------
   The horizontal, snap-scrolling photo strip used inside the Collaboration
   and Education dialogs — one implementation, so both read the same: a
   counter, prev/next chevrons, and the arrows disabled at either end.

   It keeps the `cp-carousel` / `cp-gallery` class names it was written
   with (styled in CollaborationPartnership.css), so moving it here changed
   no markup and no CSS.
   -------------------------------------------------------------------------- */

export interface StripPhoto {
  src: string;
  alt?: string;
  /** CSS aspect-ratio, so the strip lays out before the image loads. */
  ratio: string;
}

export function PhotoStrip({
  photos,
  alt,
}: {
  photos: StripPhoto[];
  /** Prefix for each photo's alt text, numbered within the strip. */
  alt: string;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [gi, setGi] = useState(0);
  const last = photos.length - 1;

  function go(dir: number) {
    const el = stripRef.current;
    if (!el) return;
    const i = Math.max(0, Math.min(last, gi + dir));
    const c = el.children[i] as HTMLElement | undefined;
    if (c)
      el.scrollTo({ left: c.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setGi(i);
  }

  function onScroll() {
    const el = stripRef.current;
    if (!el) return;
    let best = 0;
    let bd = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs(
        (c as HTMLElement).offsetLeft - el.offsetLeft - el.scrollLeft,
      );
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = last;
    if (best !== gi) setGi(best);
  }

  return (
    <div className="cp-carousel">
      <button
        type="button"
        className="cp-carousel__arrow cp-carousel__arrow--prev"
        disabled={gi === 0}
        aria-label="Previous photo"
        onClick={() => go(-1)}
      >
        <Arrowhead direction="left" />
      </button>
      <div className="cp-carousel__view">
        <div ref={stripRef} className="cp-gallery" onScroll={onScroll}>
          {photos.map((g, i) => (
            <figure
              key={g.src}
              className="cp-gallery__item"
              style={{ aspectRatio: g.ratio }}
            >
              <img
                src={g.src}
                alt={g.alt ?? `${alt} — photo ${i + 1}`}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
        <span className="cp-carousel__counter">
          {gi + 1} of {photos.length}
        </span>
      </div>
      <button
        type="button"
        className="cp-carousel__arrow cp-carousel__arrow--next"
        disabled={gi === last}
        aria-label="Next photo"
        onClick={() => go(1)}
      >
        <Arrowhead direction="right" />
      </button>
    </div>
  );
}

/** Same chevron as the Model page's Factor Explorer carousel. */
export function Arrowhead({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="cp-carousel__arrowhead"
      viewBox="0 0 10 16"
      aria-hidden="true"
    >
      <path
        d={direction === "left" ? "M8 2 2 8l6 6" : "M2 2l6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
