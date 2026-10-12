import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Pictogram } from "./Pictogram";
import type { Leaflet } from "./safetyContent";

/* --------------------------------------------------------------------------
   A safety leaflet in its two states:
   - LeafletCover: folded, standing in the wall rack (the page index).
   - LeafletSpread: opened out into its three panels. The side panels start
     folded over the middle one and swing open the first time the spread
     scrolls into view (or straight away when its cover is picked).
   -------------------------------------------------------------------------- */

export function LeafletCover({
  leaflet,
  onOpen,
}: {
  leaflet: Leaflet;
  onOpen: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={`#${leaflet.id}`}
      className={`sf-cover sf-cover--${leaflet.id}`}
      onClick={onOpen}
      aria-label={`${leaflet.number}. ${leaflet.title} — open leaflet`}
    >
      <span className="sf-cover__tape" aria-hidden="true" />
      <span className="sf-cover__number">{leaflet.number}</span>
      <span className="sf-cover__title">{leaflet.title}</span>
      <span className="sf-cover__tagline">{leaflet.tagline}</span>
      <span className="sf-cover__art" aria-hidden="true">
        {leaflet.id === "solution" ? (
          <span className="sf-rings">
            <span />
            <span />
            <span />
            <i />
            <i />
            <i />
          </span>
        ) : (
          <span className="sf-badges">
            {leaflet.coverIcons.map((n) => (
              <span key={n} className="sf-badge">
                <Pictogram name={n} />
              </span>
            ))}
          </span>
        )}
      </span>
      <span className="sf-cover__footer">{leaflet.footer}</span>
    </a>
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LeafletSpread({
  leaflet,
  openSignal,
}: {
  leaflet: Leaflet;
  /** Bumped by the page when this leaflet's cover is picked. */
  openSignal: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Start folded only when we can animate the unfold; otherwise (no JS
  // observer, reduced motion) the panels are simply laid out open.
  const [open, setOpen] = useState(
    () => typeof IntersectionObserver === "undefined" || prefersReducedMotion(),
  );

  useEffect(() => {
    if (open) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [open]);

  useEffect(() => {
    if (openSignal) setOpen(true);
  }, [openSignal]);

  return (
    <div
      ref={ref}
      className={`sf-spread sf-spread--${leaflet.id}${open ? " is-open" : ""}`}
    >
      {leaflet.panels.map((p, i) => (
        <article key={p.heading} className={`sf-panel sf-panel--${i + 1}`}>
          <header className="sf-panel__head">
            <span className="sf-panel__icon">
              <Pictogram name={p.icon} />
            </span>
            <span className="sf-panel__kicker">
              {leaflet.number}.{i + 1}
            </span>
            <h3 className="sf-panel__heading">{p.heading}</h3>
          </header>
          <div className="sf-panel__body">{p.body}</div>
        </article>
      ))}
    </div>
  );
}
