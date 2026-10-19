import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react";
import "./ModelBackground.css";

/**
 * White ball-and-stick molecule glyphs (the "secondary" palette from the
 * Claude Design MoleculeField component) walking down the Model page in
 * bands, biased toward the left/right margins rather than the reading
 * column — the same progressive-band technique as Project Description's
 * PDBackground, ported here for density/depth parity with that page
 * rather than copied verbatim: molecule-only (no colour blobs or
 * bubbles — Model's atmosphere already comes from ModelBackground.css's
 * gradient wash), three size tiers with distinct blur/opacity treatment
 * (big = blurred and faint, mid = soft and translucent, small = sharp
 * accent), and a stronger side bias since Model's content stays inside a
 * single, narrower 1120px column throughout, unlike PD's single
 * full-height prose block.
 *
 * Local to the Model page only — not promoted to src/components.
 */

const SECONDARY_OP = {
  big: [0.08, 0.14] as [number, number],
  mid: [0.13, 0.22] as [number, number],
  small: [0.24, 0.42] as [number, number],
};

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

interface Node {
  key: string;
  wrap: CSSProperties;
  svg: CSSProperties;
  speed: number;
  max: number;
  href: string;
}

/**
 * side < 0 walks the left flank (nav column + gutter), side > 0 the
 * right flank (page margin only) — mirrors PDBackground's own bias,
 * since Model has the identical page-with-section-nav layout.
 */
function build(w: number, h: number, contentLeft: number, contentRight: number, seed: number, density: number): Node[] {
  const rnd = rng(seed);
  const narrow = w < 700;
  const mid = w < 1000;
  const leftZone = Math.max(0, contentLeft - 8);
  const rightZone = Math.max(0, w - contentRight - 8);

  const nodes: Node[] = [];
  const step = narrow ? 460 : mid ? 300 : 260;
  const bands = Math.max(4, Math.floor((h / step) * density));
  let prevSide = 1;
  let run = 0;

  for (let i = 0; i < bands; i++) {
    if (rnd() < 0.12) continue; // still a few quiet stretches, just fewer than PD's

    const y = ((i + lerp(0.15, 0.85, rnd())) / bands) * h;
    let side = rnd() < (narrow ? 0.6 : 0.84) ? -1 : 1;
    if (side === prevSide) run++;
    else run = 1;
    if (run > 3) {
      side = -side;
      run = 1;
    }
    prevSide = side;

    const tierRoll = rnd();
    const tierName: "big" | "mid" | "small" = tierRoll < 0.4 ? "big" : tierRoll < 0.7 ? "mid" : "small";
    const zone = side < 0 ? leftZone : rightZone;

    let size: number;
    if (narrow) size = lerp(80, 170, rnd());
    else size = clampNum(lerp(0.85, 1.5, rnd()) * Math.max(zone, 110), 100, 320);
    if (tierName === "big") size *= 1.5;
    if (tierName === "small") size *= 0.55;
    size = Math.round(size);

    const tight = zone < 150;
    const crop = narrow || tight ? lerp(0.5, 0.8, rnd()) : lerp(0.08, 0.5, rnd());
    const cx =
      side < 0
        ? lerp(0, Math.max(zone, 60), rnd() * 0.5) - size * crop
        : w - lerp(0, Math.max(zone, 60), rnd() * 0.5) - size * (1 - crop);

    const [lo, hi] = SECONDARY_OP[tierName];
    const op = lerp(lo, hi, rnd());
    const rot = rnd() * 360;
    // Large = blurred/faint, medium = crisp but translucent, small = a
    // sharp little accent — the three-tier mix asked for.
    const blur = tierName === "big" ? size * 0.014 : 0;
    const speed = tierName === "big" ? lerp(0.05, 0.09, rnd()) : tierName === "mid" ? lerp(0.1, 0.15, rnd()) : lerp(0.3, 0.42, rnd());

    nodes.push({
      key: `m${i}`,
      wrap: {
        position: "absolute",
        left: Math.round(cx) + "px",
        top: Math.round(y - size / 2) + "px",
        width: size + "px",
        height: size + "px",
        opacity: op,
        filter: blur ? `blur(${blur.toFixed(1)}px)` : "none",
        willChange: "transform",
      },
      svg: {
        width: "100%",
        height: "100%",
        overflow: "visible",
        transform: `rotate(${rot.toFixed(1)}deg)`,
      },
      speed,
      max: Math.round(tierName === "big" ? 70 : tierName === "mid" ? 90 : 170),
      href: rnd() > 0.5 ? "#mfG1W" : "#mfG2W",
    });
  }

  return nodes;
}

export function ModelBackground({
  contentRef,
  density = "regular",
  seed = 7,
}: {
  contentRef: RefObject<HTMLElement | null>;
  density?: "sparse" | "regular" | "dense";
  seed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0, contentLeft: 0, contentRight: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function measure() {
      const r = el!.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      let contentLeft = Math.round(w * 0.28);
      let contentRight = Math.round(w * 0.72);
      const content = contentRef.current;
      if (content) {
        const cr = content.getBoundingClientRect();
        contentLeft = Math.round(cr.left - r.left);
        contentRight = Math.round(cr.right - r.left);
      }
      setBox((prev) =>
        prev.w === w && prev.h === h && prev.contentLeft === contentLeft && prev.contentRight === contentRight
          ? prev
          : { w, h, contentLeft, contentRight },
      );
    }

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (contentRef.current) ro.observe(contentRef.current);
    measure();
    return () => ro.disconnect();
  }, [contentRef]);

  const nodes = useMemo(() => {
    const { w, h, contentLeft, contentRight } = box;
    if (w <= 40 || h <= 200) return [];
    const dm = density === "sparse" ? 0.7 : density === "dense" ? 1.35 : 1;
    return build(w, h, contentLeft, contentRight, seed, dm);
  }, [box, density, seed]);

  // Scroll parallax — same technique as Home.tsx's useParallax / PD's
  // PDBackground: each element drifts by its own distance from the
  // viewport centre, clamped to its own data-max.
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
  }, [nodes]);

  return (
    <div ref={containerRef} className="mfbg-layer" aria-hidden="true">
      <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <linearGradient id="mfW" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.58" />
          </linearGradient>
          <g id="mfG1W" fill="url(#mfW)" stroke="url(#mfW)" strokeWidth={13} strokeLinecap="round">
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
          <g id="mfG2W" fill="url(#mfW)" stroke="url(#mfW)" strokeWidth={12} strokeLinecap="round">
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

      {nodes.map((n) => (
        <div key={n.key} className="mfbg-decor parallax-decor" data-speed={n.speed} data-max={n.max} style={n.wrap}>
          <svg viewBox="0 0 200 200" style={n.svg}>
            <use href={n.href} />
          </svg>
        </div>
      ))}
    </div>
  );
}
