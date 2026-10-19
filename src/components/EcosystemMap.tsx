import { useEffect, useRef, useState } from "react";
import { asset } from "../utils";
import "./EcosystemMap.css";

/**
 * Wide horizontal index of a page's top-level blocks, rendered as glass
 * spheres that drift with a gentle gravity-like mutual influence. Shared
 * between Experiments (sits above its block pill-nav, as a visual
 * companion) and Engineering (replaces its pill-nav outright). Ported from
 * a Claude Design prototype (templates/ecosystem-map/EcosystemMap.dc.html
 * in the "madrid-ucm Design System" project) into this codebase's own
 * React/TSX + CSS conventions.
 *
 * Two deliberate departures from the prototype, both requested on review:
 * - Items sit at genuinely distinct heights (never a shared baseline) so
 *   they read as coexisting in a spatial field rather than icons in a row.
 * - Each sphere carries exactly one title element, not two: a small
 *   "index label" by default, growing into a larger highlighted title on
 *   hover/pin — never both at once, since it's the same element animating
 *   between the two states rather than a second element mounted on top of
 *   the first.
 *
 * Click pins a sphere open (matching the prototype) and also calls
 * `onSelect`, so the map doubles as a second, visual way into whatever
 * tabs/blocks it stands in for.
 */

export interface EcosystemMapItem {
  id: string;
  /** One or two lines — a second line renders below the first via <br>. */
  label: [string, string?];
  /** Any CSS color; drives every gradient on the sphere via --eco-color. */
  color: string;
  /** Path under /public, e.g. "assets/experiments/ecosystem-map/foo.png" — resolved with asset(). */
  image: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  imageSize: number;
  /** Physics anchor point (arbitrary shared coordinate space) used only to
   * compute relative inter-sphere repulsion — not a screen position. */
  home: [number, number];
}

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ph: number;
}

export function EcosystemMap({
  items,
  activeId,
  onSelect,
}: {
  items: EcosystemMapItem[];
  /** `null` means nothing is selected -- the map's own neutral, no-pin
   * resting state (see the background-click handler below). */
  activeId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const sel = pinned !== null ? pinned : hover;
  const selRef = useRef(sel);
  selRef.current = sel;

  // Keeps the sphere's own visual pin in step with any caller-driven
  // change to `activeId` that doesn't go through this component's own
  // click handling -- e.g. Engineering.tsx clearing its activeTab back to
  // null when the page header above the map is clicked, or jumping it
  // straight to an adjacent block from the end-of-section prev/next nav
  // (see that file). Clicking a sphere here also sets `pinned` itself
  // first and reports the same id back up through `onSelect`, so this
  // just re-confirms the same index in that case -- a no-op re-render,
  // not a loop.
  useEffect(() => {
    if (activeId === null) {
      setPinned(null);
      return;
    }
    const idx = items.findIndex((item) => item.id === activeId);
    setPinned(idx === -1 ? null : idx);
  }, [activeId, items]);

  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodiesRef = useRef<Body[]>(items.map((_, i) => ({ x: 0, y: 0, vx: 0, vy: 0, ph: i * 1.7 })));

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = now - start;
      const bodies = bodiesRef.current;
      const s = selRef.current;
      for (let i = 0; i < items.length; i++) {
        const p = bodies[i];
        p.vx += Math.sin(t * 0.00019 + p.ph) * 0.014 - p.x * 0.0022;
        p.vy += Math.cos(t * 0.00023 + p.ph * 1.4) * 0.011 - p.y * 0.0026;
        for (let j = 0; j < items.length; j++) {
          if (i === j) continue;
          const dx = items[i].home[0] + p.x - (items[j].home[0] + bodies[j].x);
          const dy = items[i].home[1] + p.y - (items[j].home[1] + bodies[j].y);
          const d = Math.hypot(dx, dy) || 1;
          const f = (420 / (d * d)) * (s === j ? 5 : 1);
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f * 0.7;
        }
        p.vx *= 0.975;
        p.vy *= 0.975;
        p.x += p.vx;
        p.y += p.vy;
        const m = Math.hypot(p.x, p.y);
        const cap = s !== null && s !== i ? 34 : 22;
        if (m > cap) {
          p.x = (p.x / m) * cap;
          p.y = (p.y / m) * cap;
        }
        const el = wrapRefs.current[i];
        if (el) el.style.transform = `translate(${p.x.toFixed(2)}px,${p.y.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // A click that lands inside the map but not on any sphere (blank space
  // between them, a title label, ...) clears the pin. Reading through to
  // page content -- clicking outside the map altogether -- is deliberately
  // NOT handled here any more: that used to deselect on every click
  // anywhere on the page, including inside the very content a selection
  // was showing. Callers that want an "outside" deselect too (e.g. the
  // page header above the map) drive it themselves via the `activeId`
  // sync effect above, not from inside this component.
  function handleMapClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target.closest(".ecosystem-map__sphere")) return;
    if (pinned !== null) {
      setPinned(null);
      onSelect(null);
    }
  }

  return (
    <div className="ecosystem-map" onClick={handleMapClick}>
      {items.map((item, i) => {
        const on = sel === i;
        const off = sel !== null && sel !== i;
        return (
          <div
            key={item.id}
            className="ecosystem-map__slot"
            style={{ left: `${item.left}%`, top: `${item.top}%`, width: `${item.width}%` }}
          >
            <div
              ref={(el) => {
                wrapRefs.current[i] = el;
              }}
              className="ecosystem-map__drift"
            >
              <button
                type="button"
                className="ecosystem-map__sphere"
                style={
                  {
                    "--eco-color": item.color,
                    transform: on ? "scale(1.2)" : off ? "scale(0.88)" : "scale(1)",
                    opacity: off ? 0.45 : 1,
                  } as React.CSSProperties
                }
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={() => {
                  // Re-clicking the already-pinned sphere unpins it -- and,
                  // now that "nothing selected" is a real state the page
                  // renders differently for, that has to hand the parent
                  // `null` too, not silently leave its old selection in
                  // place under a sphere that no longer looks selected.
                  const next = pinned === i ? null : i;
                  setPinned(next);
                  setHover(i);
                  onSelect(next === null ? null : item.id);
                }}
                aria-pressed={activeId === item.id}
                aria-label={item.label.join(" ")}
              >
                <span className="ecosystem-map__glow" style={{ opacity: on ? 1 : 0 }} aria-hidden="true" />
                <span className="ecosystem-map__glass">
                  <span className="ecosystem-map__fill" style={{ opacity: on ? 1 : 0 }} aria-hidden="true" />
                  <span className="ecosystem-map__sheen" aria-hidden="true" />
                  <img
                    src={asset(item.image)}
                    alt={item.alt}
                    style={{ width: `${item.imageSize}%`, height: `${item.imageSize}%` }}
                  />
                </span>
              </button>
            </div>
            <div
              className="ecosystem-map__title"
              style={{
                color: item.color,
                fontSize: on ? "20px" : "12px",
                fontWeight: on ? 700 : 600,
                opacity: on ? 1 : off ? 0.25 : 0.6,
              }}
            >
              {item.label[0]}
              {item.label[1] && (
                <>
                  <br />
                  {item.label[1]}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
