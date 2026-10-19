import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import "./HeaderMoleculeField.css";

/**
 * Ported from the Claude Design "MoleculeField" component — "edge" family,
 * "light" palette — used as the reference header treatment on
 * Content Patterns.dc.html's own hero. A handful of blue-green
 * ball-and-stick molecule glyphs anchored to slots near the edges/corners
 * of whatever box they're given, leaving the centre clear for the title
 * and lede. Only the "edge"/"light" combination is ported — the other
 * families/palettes in the original component aren't used here.
 *
 * Used, opt-in, by Header.tsx for the Experiments and Results headers
 * only (see Header.tsx's `moleculeSeed` prop) — not a default treatment
 * for every page's header.
 */

const LIGHT_OP = {
  huge: [0.09, 0.15] as [number, number],
  mid: [0.16, 0.27] as [number, number],
  small: [0.3, 0.52] as [number, number],
};

// slot: x/y are container fractions (values outside 0..1 crop past the
// edge), k = size multiplier. Tuned specifically for this header's real
// aspect ratio — much wider and shorter than the reference component's
// own demo box — so the composition reads as a full, present left/right
// frame instead of a handful of shapes lost to the box's short height.
// Split roughly 8 left / 8 right, plus two small accents tucked against
// the very top/bottom edge near the centre (safe under the vertically
// *and* horizontally centred title/lede). Interleaved big/medium/small
// (not grouped by size) so that ANY prefix — narrower boxes drop slots
// off the end instead of shrinking everything — still reads as a varied
// mix of scales, not just the two big corner pieces plus a pile of tiny
// accents.
const BANNER = [
  { x: -0.03, y: 0.12, k: 1.6 }, // huge
  { x: 1.02, y: 0.15, k: 1.65 }, // huge
  { x: 0.1, y: 0.62, k: 0.85 }, // mid
  { x: 0.88, y: 0.55, k: 0.9 }, // mid
  { x: -0.02, y: 0.85, k: 1.35 }, // huge
  { x: 1.0, y: 0.85, k: 1.3 }, // huge
  { x: 0.28, y: 0.08, k: 0.45 }, // small
  { x: 0.7, y: 0.08, k: 0.48 }, // small
  { x: 0.22, y: 0.3, k: 0.78 }, // mid
  { x: 0.76, y: 0.32, k: 0.75 }, // mid
  { x: 0.16, y: 0.9, k: 0.5 }, // small
  { x: 0.82, y: 0.92, k: 0.55 }, // small
  { x: 0.02, y: 0.35, k: 0.95 }, // mid
  { x: 0.96, y: 0.4, k: 0.9 }, // mid
  { x: 0.08, y: 0.05, k: 0.35 }, // small
  { x: 0.92, y: 0.05, k: 0.35 }, // small
  { x: 0.45, y: -0.06, k: 0.42 }, // small
  { x: 0.58, y: 1.06, k: 0.45 }, // small
];

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

function tier(w: number) {
  return w < 480 ? 0 : w < 860 ? 1 : 2;
}
const BANNER_COUNTS = [8, 13, BANNER.length];

interface Node {
  key: string;
  style: CSSProperties;
  href: string;
}

function nodeStyle(x: number, y: number, size: number, rot: number, op: number, blur: number): CSSProperties {
  return {
    position: "absolute",
    left: (x * 100).toFixed(2) + "%",
    top: (y * 100).toFixed(2) + "%",
    width: Math.round(size) + "px",
    height: Math.round(size) + "px",
    transform: `translate(-50%,-50%) rotate(${rot.toFixed(1)}deg)`,
    opacity: op,
    filter: blur ? `blur(${blur.toFixed(1)}px)` : "none",
    overflow: "visible",
    pointerEvents: "none",
  };
}

function edgeNodes(w: number, h: number, rnd: () => number, count: number): Node[] {
  const base = Math.min(w, h) * 0.4;
  return BANNER.slice(0, count).map((s, i) => {
    const k = s.k * lerp(0.9, 1.1, rnd());
    const size = base * k;
    const band = k >= 1.25 ? "huge" : k >= 0.72 ? "mid" : "small";
    const [lo, hi] = LIGHT_OP[band];
    const jx = (rnd() - 0.5) * 0.05;
    const jy = (rnd() - 0.5) * 0.05;
    return {
      key: "e" + i,
      style: nodeStyle(
        s.x + jx,
        s.y + jy,
        size,
        rnd() * 360,
        lerp(lo, hi, rnd()),
        band === "huge" ? size * 0.014 : 0,
      ),
      href: rnd() > 0.5 ? "#hmfG1" : "#hmfG2",
    };
  });
}

export function HeaderMoleculeField({ seed = 14 }: { seed?: number }) {
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

  const nodes = useMemo(() => {
    const { w, h } = box;
    if (w <= 40 || h <= 40) return [];
    const rnd = rng(seed);
    const t = tier(w);
    return edgeNodes(w, h, rnd, BANNER_COUNTS[t]);
  }, [box, seed]);

  return (
    <div ref={containerRef} className="hmf-layer" aria-hidden="true">
      <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <linearGradient id="hmfC" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#86b1d1" />
            <stop offset="1" stopColor="#9dc76f" />
          </linearGradient>
          <g id="hmfG1" fill="url(#hmfC)" stroke="url(#hmfC)" strokeWidth={13} strokeLinecap="round">
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
          <g id="hmfG2" fill="url(#hmfC)" stroke="url(#hmfC)" strokeWidth={12} strokeLinecap="round">
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
