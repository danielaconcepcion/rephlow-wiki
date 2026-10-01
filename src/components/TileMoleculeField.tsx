import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import "./TileMoleculeField.css";

/**
 * Claude Design "MoleculeField" — "distributed" family, density "dense",
 * in the "light" (neutral #fffaf1 base) and "primary" (135° #86b1d1 →
 * #9dc76f, white motif) palettes. Same PRNG, size bands, opacity bands,
 * safe-area rejection sampling and blur rules as the design-system
 * component; only the two palettes and the one density actually used on
 * the Explore grid are ported.
 *
 * The "edge" family is already ported twice (HeaderMoleculeField for the
 * page headers, EdgeMoleculeField for the Human Practices accordions) —
 * those anchor molecules to fixed slots near the edges. "Distributed"
 * instead scatters them across the whole box by rejection sampling, with
 * mid/small molecules pushed out of a central safe area so a tile's own
 * label stays legible on top. Each tile gets its own seed, so no two
 * tiles in the grid share a composition.
 */

const PAL = {
  light: {
    op: {
      huge: [0.09, 0.15] as [number, number],
      mid: [0.16, 0.27] as [number, number],
      small: [0.3, 0.52] as [number, number],
    },
  },
  primary: {
    op: {
      huge: [0.05, 0.1] as [number, number],
      mid: [0.1, 0.18] as [number, number],
      small: [0.2, 0.34] as [number, number],
    },
  },
};

// density "dense" = the design system's own 1.35 multiplier on the mid and
// small counts (the huge band is never scaled by density there either).
const DENSITY = 1.35;

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

function nodeStyle(x: number, y: number, size: number, rot: number, op: number, blur: number): CSSProperties {
  return {
    position: "absolute",
    left: (x * 100).toFixed(2) + "%",
    top: (y * 100).toFixed(2) + "%",
    width: Math.round(size) + "px",
    height: Math.round(size) + "px",
    transform: `translate(-50%,-50%) rotate(${rot.toFixed(1)}deg)`,
    opacity: Number(op.toFixed(3)),
    filter: blur ? `blur(${blur.toFixed(1)}px)` : "none",
    overflow: "visible",
    pointerEvents: "none",
  };
}

export function TileMoleculeField({
  seed = 7,
  palette = "light",
}: {
  seed?: number;
  palette?: "light" | "primary";
}) {
  const uid = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      setBox((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const g1 = `tmfG1-${uid}`;
  const g2 = `tmfG2-${uid}`;
  const grad = `tmfC-${uid}`;

  const nodes = useMemo(() => {
    const { w, h } = box;
    if (w <= 40 || h <= 40) return [];
    const pal = PAL[palette];
    const rnd = rng(seed);
    // Tier by width, as in the original: the Explore tiles are all well
    // under 480px, so they take the smallest band counts — [1, 2, 2] huge/
    // mid/small, with density applied to the mid and small bands only.
    const t = w < 480 ? 0 : w < 860 ? 1 : 2;
    const counts = [
      [1, 2, 2],
      [2, 3, 3],
      [2, 4, 5],
    ][t].map((n, i) => Math.max(1, Math.round(n * (i ? DENSITY : 1))));

    const base = Math.min(w, h) * (w / h > 1.9 ? 0.4 : 0.3);
    const placed: { x: number; y: number }[] = [];
    const out: { key: string; style: CSSProperties; href: string }[] = [];
    const bands = [
      { name: "huge" as const, n: counts[0], kr: [1.9, 2.9], safe: false },
      { name: "mid" as const, n: counts[1], kr: [0.85, 1.35], safe: true },
      { name: "small" as const, n: counts[2], kr: [0.38, 0.66], safe: true },
    ];
    bands.forEach((b) => {
      for (let i = 0; i < b.n; i++) {
        let x = 0;
        let y = 0;
        let ok = false;
        for (let tries = 0; tries < 40 && !ok; tries++) {
          x = lerp(-0.08, 1.08, rnd());
          y = lerp(-0.08, 1.08, rnd());
          const wideBox = w / h > 1.9;
          const inSafe = wideBox
            ? x > 0.1 && x < 0.86 && y > 0.14 && y < 0.86
            : x > 0.18 && x < 0.82 && y > 0.26 && y < 0.74;
          const far = placed.every(
            (p) => Math.hypot((p.x - x) * w, (p.y - y) * h) > Math.min(w, h) * 0.26,
          );
          ok = far && (!b.safe || !inSafe || tries > 30);
        }
        placed.push({ x, y });
        const k = lerp(b.kr[0], b.kr[1], rnd());
        const size = base * k;
        const [lo, hi] = pal.op[b.name];
        out.push({
          key: b.name + i,
          style: nodeStyle(
            x,
            y,
            size,
            rnd() * 360,
            lerp(lo, hi, rnd()),
            b.name === "huge" ? size * 0.016 : b.name === "mid" ? size * 0.004 : 0,
          ),
          href: rnd() > 0.5 ? `#${g1}` : `#${g2}`,
        });
      }
    });
    return out;
  }, [box, seed, palette, g1, g2]);

  return (
    <div
      ref={containerRef}
      className={`tmf-layer tmf-layer--${palette}`}
      aria-hidden="true"
    >
      <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          {palette === "primary" ? (
            <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.58" />
            </linearGradient>
          ) : (
            <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2b6caf" />
              <stop offset="1" stopColor="#6a9e3f" />
            </linearGradient>
          )}
          <g id={g1} fill={`url(#${grad})`} stroke={`url(#${grad})`} strokeWidth={13} strokeLinecap="round">
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
          <g id={g2} fill={`url(#${grad})`} stroke={`url(#${grad})`} strokeWidth={12} strokeLinecap="round">
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
