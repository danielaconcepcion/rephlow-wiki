import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import "./EdgeMoleculeField.css";

/**
 * Claude Design "MoleculeField" — "edge" family, "primary" palette
 * (135° #86b1d1 → #9dc76f, white motif), ported for boxes whose height
 * changes at runtime (e.g. an accordion opening and closing).
 *
 * The original component sizes and places molecules as fractions of the
 * box's current height, so a box that grows from ~100px to ~500px would
 * reshuffle and rescale every molecule on toggle. Here sizes and vertical
 * positions are anchored to a fixed `bandHeight` (the collapsed height)
 * instead: the top band always renders the same composition, and when the
 * box grows, extra molecules are added further down the left/right edges.
 * Same glyphs, gradients, opacity bands and PRNG as the design-system
 * component; `HeaderMoleculeField` (edge/light) is left untouched.
 */

// Opacity bands from the design system's `primary` palette.
const OP = {
  huge: [0.05, 0.1] as [number, number],
  mid: [0.1, 0.18] as [number, number],
  small: [0.2, 0.34] as [number, number],
};

// Top band — x is a fraction of width, y a fraction of bandHeight, k a size
// multiplier. Order matters: narrow boxes keep only the first slots.
const BAND = [
  { x: -0.01, y: 0.2, k: 1.55 },
  { x: 0.97, y: 0.78, k: 1.25 },
  { x: 0.8, y: -0.12, k: 0.62 },
  { x: 0.22, y: 1.02, k: 0.55 },
  { x: 1.03, y: 0.05, k: 0.78 },
  { x: 0.62, y: 1.08, k: 0.5 },
  { x: 0.4, y: -0.14, k: 0.58 },
];

// Repeating edge pattern for the extra height of the open state, one
// period = one bandHeight, alternating sides so the edges never mirror.
const EDGE_PERIOD = [
  { x: 1.02, y: 0.35, k: 1.35 },
  { x: -0.03, y: 0.85, k: 0.9 },
  { x: 0.96, y: 1.25, k: 0.55 },
  { x: 0.02, y: 1.7, k: 1.2 },
  { x: 1.0, y: 2.15, k: 0.72 },
  { x: -0.02, y: 2.55, k: 0.5 },
];
const PERIOD_H = 2.8; // in bandHeights

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

interface Slot {
  x: number;
  y: number; // px from the top
  k: number;
}

function nodeStyle(x: number, yPx: number, size: number, rot: number, op: number, blur: number): CSSProperties {
  return {
    position: "absolute",
    left: (x * 100).toFixed(2) + "%",
    top: Math.round(yPx) + "px",
    width: Math.round(size) + "px",
    height: Math.round(size) + "px",
    transform: `translate(-50%,-50%) rotate(${rot.toFixed(1)}deg)`,
    opacity: op,
    filter: blur ? `blur(${blur.toFixed(1)}px)` : "none",
    overflow: "visible",
    pointerEvents: "none",
  };
}

export function EdgeMoleculeField({
  seed = 8,
  bandHeight = 104,
}: {
  seed?: number;
  /** Collapsed height the composition is designed around (px). */
  bandHeight?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function measure() {
      const r = el!.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      setBox((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, []);

  const g1 = `emfG1-${uid}`;
  const g2 = `emfG2-${uid}`;

  const nodes = useMemo(() => {
    const { w, h } = box;
    if (w <= 40 || h <= 40) return [];

    const bandCount = w < 480 ? 4 : w < 720 ? 5 : BAND.length;
    const slots: Slot[] = BAND.slice(0, bandCount).map((s) => ({ ...s, y: s.y * bandHeight }));

    // Extra edge molecules only where the box is taller than the band.
    for (let p = 0; ; p++) {
      const offset = bandHeight * (0.6 + p * PERIOD_H);
      let added = false;
      for (const s of EDGE_PERIOD) {
        const y = offset + s.y * bandHeight;
        if (y > h + bandHeight * 0.3) continue;
        slots.push({ x: s.x, y, k: s.k });
        added = true;
      }
      if (!added) break;
    }

    // Size reference: a fixed band, never the live height, so nothing
    // rescales when the box opens. Capped on narrow screens.
    const base = Math.min(bandHeight * 0.95, w * 0.22);
    // Seeded per slot index so the top band is identical open and closed.
    return slots.map((s, i) => {
      const rnd = rng(seed * 101 + i * 7);
      const k = s.k * lerp(0.9, 1.1, rnd());
      const size = base * k;
      const band = k >= 1.2 ? "huge" : k >= 0.7 ? "mid" : "small";
      const [lo, hi] = OP[band];
      const jx = (rnd() - 0.5) * 0.04;
      const jy = (rnd() - 0.5) * 0.12 * bandHeight;
      return {
        key: "m" + i,
        style: nodeStyle(s.x + jx, s.y + jy, size, rnd() * 360, lerp(lo, hi, rnd()), band === "huge" ? size * 0.014 : 0),
        href: rnd() > 0.5 ? "#" + g1 : "#" + g2,
      };
    });
  }, [box, seed, bandHeight, g1, g2]);

  const wGrad = `emfW-${uid}`;

  return (
    <div ref={containerRef} className="emf-layer" aria-hidden="true">
      <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <linearGradient id={wGrad} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.58" />
          </linearGradient>
          <g id={g1} fill={`url(#${wGrad})`} stroke={`url(#${wGrad})`} strokeWidth={13} strokeLinecap="round">
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
          <g id={g2} fill={`url(#${wGrad})`} stroke={`url(#${wGrad})`} strokeWidth={12} strokeLinecap="round">
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
        <svg key={n.key} viewBox="0 0 200 200" style={n.style}>
          <use href={n.href} />
        </svg>
      ))}
    </div>
  );
}
