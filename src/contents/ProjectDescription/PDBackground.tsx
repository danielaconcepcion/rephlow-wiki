import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import "./PDBackground.css";

/**
 * Ported from the Claude Design mock "PDBackground.dc.html" (itself an
 * adaptation of this project's generic MoleculeField pattern for Project
 * Description specifically): a field of molecule glyphs, soft colour
 * blobs and bubbles that walks progressively down the whole article
 * instead of stretching one fixed viewport-sized composition, biased
 * toward the left because the lateral section nav leaves more free space
 * there. Scroll parallax reuses the exact technique from Home.tsx's
 * useParallax (and the shared global `.parallax-decor` CSS rule) —
 * elements drift by their own distance from the viewport centre, not by
 * raw scroll position.
 *
 * Local to Project Description only — not promoted to src/components.
 */

function rng(seed: number) {
  let t = (seed | 0) * 9301 + 49297;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clampNum = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

interface MolNode {
  key: string;
  wrap: CSSProperties;
  svg: CSSProperties;
  speed: number;
  max: number;
  href: string;
}
interface BlobNode {
  key: string;
  style: CSSProperties;
  speed: number;
  max: number;
}
type BubbleNode = BlobNode;

interface Layout {
  mols: MolNode[];
  blobs: BlobNode[];
  bubbles: BubbleNode[];
}

const EMPTY_LAYOUT: Layout = { mols: [], blobs: [], bubbles: [] };

/**
 * side < 0 walks the left flank (nav column + gutter — more room there in
 * this page's layout), side > 0 the right flank (just the page margin).
 * Bands step down the full measured height of the article; each band has
 * a chance to sit out entirely, so the field never reads as a single
 * repeating tile.
 */
function build(w: number, h: number, proseLeft: number, proseRight: number, seed: number): Layout {
  const rnd = rng(seed);
  const narrow = w < 700;
  const mid = w < 1000;
  const leftZone = Math.max(0, proseLeft - 8);
  const rightZone = Math.max(0, w - proseRight - 8);

  const mols: MolNode[] = [];
  const blobs: BlobNode[] = [];
  const bubbles: BubbleNode[] = [];
  const step = narrow ? 520 : mid ? 340 : 300;
  const bands = Math.max(3, Math.floor(h / step));
  let prevSide = 1;
  let run = 0;

  for (let i = 0; i < bands; i++) {
    if (rnd() < 0.16) continue; // deliberate quiet stretches

    const y = ((i + lerp(0.15, 0.85, rnd())) / bands) * h;
    let side = rnd() < (narrow ? 0.55 : 0.74) ? -1 : 1;
    if (side === prevSide) run++;
    else run = 1;
    if (run > 3) {
      side = -side;
      run = 1;
    }
    prevSide = side;

    const tierRoll = rnd();
    const tier = tierRoll < 0.28 ? "big" : tierRoll < 0.72 ? "mid" : "small";
    const zone = side < 0 ? leftZone : rightZone;

    let size: number;
    if (narrow) size = lerp(96, 190, rnd());
    else size = clampNum(lerp(0.85, 1.5, rnd()) * Math.max(zone, 120), 110, 340);
    if (tier === "big") size *= 1.55;
    if (tier === "small") size *= 0.5;
    size = Math.round(size);

    const tight = zone < 150;
    const crop = narrow || tight ? lerp(0.45, 0.75, rnd()) : lerp(0.05, 0.55, rnd());
    const cx =
      side < 0
        ? lerp(0, Math.max(zone, 60), rnd() * 0.55) - size * crop
        : w - lerp(0, Math.max(zone, 60), rnd() * 0.55) - size * (1 - crop);

    const op =
      tier === "big" ? lerp(0.07, 0.12, rnd()) : tier === "mid" ? lerp(0.13, 0.22, rnd()) : lerp(0.26, 0.44, rnd());
    const speed =
      tier === "big" ? lerp(0.06, 0.1, rnd()) : tier === "mid" ? lerp(0.11, 0.16, rnd()) : lerp(0.17, 0.23, rnd());
    const rot = rnd() * 360;

    mols.push({
      key: `m${i}`,
      wrap: {
        position: "absolute",
        left: Math.round(cx) + "px",
        top: Math.round(y - size / 2) + "px",
        width: size + "px",
        height: size + "px",
        opacity: op,
        filter: tier === "big" ? `blur(${(size * 0.012).toFixed(1)}px)` : "none",
        willChange: "transform",
      },
      svg: {
        width: "100%",
        height: "100%",
        overflow: "visible",
        transform: `rotate(${rot.toFixed(1)}deg)`,
      },
      speed,
      max: Math.round(tier === "big" ? 70 : tier === "mid" ? 90 : 110),
      href: rnd() > 0.5 ? "#pdmG1" : "#pdmG2",
    });

    // Atmospheric colour blob, occasionally, on the same flank.
    if (rnd() < 0.34) {
      const bs = Math.round(lerp(240, 620, rnd()) * (narrow ? 0.55 : 1));
      const tint =
        rnd() < 0.55 ? "rgba(134,177,209,.30)" : rnd() < 0.7 ? "rgba(206,234,255,.55)" : "rgba(157,199,111,.22)";
      blobs.push({
        key: `b${i}`,
        style: {
          position: "absolute",
          left: Math.round(side < 0 ? -bs * lerp(0.45, 0.72, rnd()) : w - bs * lerp(0.28, 0.5, rnd())) + "px",
          top: Math.round(y - bs / 2 + lerp(-160, 160, rnd())) + "px",
          width: bs + "px",
          height: Math.round(bs * lerp(0.62, 1, rnd())) + "px",
          borderRadius: "50%",
          background: `radial-gradient(circle at 38% 34%, ${tint}, rgba(255,255,255,0) 68%)`,
          filter: "blur(18px)",
          willChange: "transform",
        },
        speed: lerp(0.05, 0.09, rnd()),
        max: 60,
      });
    }

    // Sparse bubbles, same treatment as the homepage decor.
    const nB = rnd() < 0.5 ? 1 : rnd() < 0.8 ? 2 : 0;
    for (let k = 0; k < nB; k++) {
      const d = Math.round(lerp(6, 17, rnd()));
      const bx =
        side < 0 ? lerp(4, Math.max(leftZone - 10, 30), rnd()) : w - lerp(14, Math.max(rightZone, 40), rnd());
      bubbles.push({
        key: `u${i}-${k}`,
        style: {
          position: "absolute",
          left: Math.round(bx) + "px",
          top: Math.round(y + lerp(-220, 220, rnd())) + "px",
          width: d + "px",
          height: d + "px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,.95), rgba(134,177,209,.42))",
          boxShadow: "inset 0 0 0 1px rgba(27,35,64,.10)",
          opacity: lerp(0.35, 0.7, rnd()),
          willChange: "transform",
        },
        speed: (rnd() < 0.5 ? -1 : 1) * lerp(0.24, 0.38, rnd()),
        max: Math.round(lerp(140, 220, rnd())),
      });
    }
  }

  return { mols, blobs, bubbles };
}

export function PDBackground({ contentRef }: { contentRef: RefObject<HTMLElement | null> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0, proseLeft: 0, proseRight: 0 });

  // Measures its own box (which stretches to the full height of the real
  // content via the shared .pd-page relative/inset:0 wiring in
  // ProjectDescription.tsx) and the actual prose column's left/right
  // edges, so the field can lean into whichever side has real room.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function measure() {
      const r = el!.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      let proseLeft = Math.round(w * 0.28);
      let proseRight = Math.round(w * 0.72);
      const prose = contentRef.current;
      if (prose) {
        const pr = prose.getBoundingClientRect();
        proseLeft = Math.round(pr.left - r.left);
        proseRight = Math.round(pr.right - r.left);
      }
      setBox((prev) =>
        prev.w === w && prev.h === h && prev.proseLeft === proseLeft && prev.proseRight === proseRight
          ? prev
          : { w, h, proseLeft, proseRight },
      );
    }

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (contentRef.current) ro.observe(contentRef.current);
    measure();
    return () => ro.disconnect();
  }, [contentRef]);

  const layout = useMemo(() => {
    if (box.w < 40 || box.h < 200) return EMPTY_LAYOUT;
    return build(box.w, box.h, box.proseLeft, box.proseRight, 12);
  }, [box]);

  // Scroll parallax — same technique as Home.tsx's useParallax: each
  // element drifts by its own distance from the viewport centre, clamped
  // to its own data-max, skipped entirely under reduced motion.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const items = Array.prototype.map.call(
      container.querySelectorAll<HTMLElement>(".parallax-decor"),
      (elx: HTMLElement) => ({
        el: elx,
        speed: parseFloat(elx.dataset.speed || "0") || 0,
        max: parseFloat(elx.dataset.max || "80") || 80,
      }),
    ) as { el: HTMLElement; speed: number; max: number }[];
    if (!items.length) return;

    function clampV(v: number, l: number) {
      return Math.max(-l, Math.min(l, v));
    }

    let ticking = false;
    function apply() {
      ticking = false;
      const viewportCenter = window.innerHeight / 2;
      items.forEach((item) => {
        const rect = item.el.getBoundingClientRect();
        const distance = viewportCenter - (rect.top + rect.height / 2);
        item.el.style.setProperty("--py", clampV(distance * item.speed, item.max).toFixed(1) + "px");
      });
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [layout]);

  return (
    <div ref={containerRef} className="pdbg-layer" aria-hidden="true">
      <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <linearGradient id="pdmC" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#86b1d1" />
            <stop offset="1" stopColor="#9dc76f" />
          </linearGradient>
          <g id="pdmG1" fill="url(#pdmC)" stroke="url(#pdmC)" strokeWidth={13} strokeLinecap="round">
            <line x1="100" y1="100" x2="79" y2="42" />
            <line x1="100" y1="100" x2="43" y2="108" />
            <line x1="100" y1="100" x2="156" y2="121" />
            <line x1="100" y1="100" x2="90" y2="154" />
            <circle cx="79" cy="42" r="19" stroke="none" />
            <circle cx="43" cy="108" r="17" stroke="none" />
            <circle cx="156" cy="121" r="18" stroke="none" />
            <circle cx="90" cy="154" r="16" stroke="none" />
            <circle cx="100" cy="100" r="31" stroke="none" />
          </g>
          <g id="pdmG2" fill="url(#pdmC)" stroke="url(#pdmC)" strokeWidth={12} strokeLinecap="round">
            <line x1="98" y1="104" x2="132" y2="46" />
            <line x1="98" y1="104" x2="38" y2="82" />
            <line x1="98" y1="104" x2="60" y2="158" />
            <line x1="98" y1="104" x2="160" y2="146" />
            <circle cx="132" cy="46" r="16" stroke="none" />
            <circle cx="38" cy="82" r="20" stroke="none" />
            <circle cx="60" cy="158" r="15" stroke="none" />
            <circle cx="160" cy="146" r="18" stroke="none" />
            <circle cx="98" cy="104" r="28" stroke="none" />
          </g>
        </defs>
      </svg>

      {layout.blobs.map((b) => (
        <div key={b.key} className="pdbg-decor parallax-decor" data-speed={b.speed} data-max={b.max} style={b.style} />
      ))}
      {layout.mols.map((m) => (
        <div key={m.key} className="pdbg-decor parallax-decor" data-speed={m.speed} data-max={m.max} style={m.wrap}>
          <svg viewBox="0 0 200 200" style={m.svg}>
            <use href={m.href} />
          </svg>
        </div>
      ))}
      {layout.bubbles.map((u) => (
        <div key={u.key} className="pdbg-decor parallax-decor" data-speed={u.speed} data-max={u.max} style={u.style} />
      ))}
    </div>
  );
}
