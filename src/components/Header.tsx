import { useEffect, useRef } from "react";

interface HeaderProps {
  title: string;
  lead: string;
}

/**
 * Per-page hero options, keyed by page title.
 * - hideEyebrow: drop the "under construction" label.
 * - moleculeSeed: draw the molecule field background (same seed = same layout).
 */
const HERO_OPTIONS: Record<string, { hideEyebrow?: boolean; moleculeSeed?: number }> = {
  Entrepreneurship: { hideEyebrow: true, moleculeSeed: 31 },
};

/* Molecule field: positions [x, y, scale] across the banner. */
const BANNER: [number, number, number][] = [
  [-0.03, 0.12, 1.6], [1.02, 0.15, 1.65], [0.1, 0.62, 0.85], [0.88, 0.55, 0.9],
  [-0.02, 0.85, 1.35], [1, 0.85, 1.3], [0.28, 0.08, 0.45], [0.7, 0.08, 0.48],
  [0.22, 0.3, 0.78], [0.76, 0.32, 0.75], [0.16, 0.9, 0.5], [0.82, 0.92, 0.55],
  [0.02, 0.35, 0.95], [0.96, 0.4, 0.9], [0.08, 0.05, 0.35], [0.92, 0.05, 0.35],
  [0.45, -0.06, 0.42], [0.58, 1.06, 0.45],
];
const OPACITY = { huge: [0.09, 0.15], mid: [0.16, 0.27], small: [0.3, 0.52] } as const;
const DEFS =
  '<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="hmfC" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#86b1d1"/><stop offset="1" stop-color="#9dc76f"/></linearGradient><g id="hmfG1" fill="url(#hmfC)" stroke="url(#hmfC)" stroke-width="13" stroke-linecap="round"><line x1="100" y1="100" x2="79" y2="42"/><line x1="100" y1="100" x2="43" y2="108"/><line x1="100" y1="100" x2="156" y2="121"/><line x1="100" y1="100" x2="90" y2="154"/><circle cx="79" cy="42" r="19" stroke="none"/><circle cx="43" cy="108" r="17" stroke="none"/><circle cx="156" cy="121" r="18" stroke="none"/><circle cx="90" cy="154" r="16" stroke="none"/><circle cx="100" cy="100" r="31" stroke="none"/></g><g id="hmfG2" fill="url(#hmfC)" stroke="url(#hmfC)" stroke-width="12" stroke-linecap="round"><line x1="98" y1="104" x2="132" y2="46"/><line x1="98" y1="104" x2="38" y2="82"/><line x1="98" y1="104" x2="60" y2="158"/><line x1="98" y1="104" x2="160" y2="146"/><circle cx="132" cy="46" r="16" stroke="none"/><circle cx="38" cy="82" r="20" stroke="none"/><circle cx="60" cy="158" r="15" stroke="none"/><circle cx="160" cy="146" r="18" stroke="none"/><circle cx="98" cy="104" r="28" stroke="none"/></g></defs></svg>';

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

function MoleculeField({ seed }: { seed: number }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const draw = () => {
      const { width: w, height: h } = el.getBoundingClientRect();
      if (w < 40) return;
      const rnd = rng(seed);
      const n = w < 480 ? 8 : w < 860 ? 13 : BANNER.length;
      const base = Math.min(w, h) * 0.4;
      let out = DEFS;
      BANNER.slice(0, n).forEach(([x, y, s]) => {
        const k = s * lerp(0.9, 1.1, rnd());
        const size = base * k;
        const band = k >= 1.25 ? "huge" : k >= 0.72 ? "mid" : "small";
        const [lo, hi] = OPACITY[band];
        const jx = (rnd() - 0.5) * 0.05;
        const jy = (rnd() - 0.5) * 0.05;
        const rot = rnd() * 360;
        const op = lerp(lo, hi, rnd());
        const blur = band === "huge" ? size * 0.014 : 0;
        const href = rnd() > 0.5 ? "#hmfG1" : "#hmfG2";
        out += `<svg viewBox="0 0 200 200" style="position:absolute;left:${((x + jx) * 100).toFixed(2)}%;top:${((y + jy) * 100).toFixed(2)}%;width:${Math.round(size)}px;height:${Math.round(size)}px;transform:translate(-50%,-50%) rotate(${rot.toFixed(1)}deg);opacity:${op};filter:${blur ? `blur(${blur.toFixed(1)}px)` : "none"};overflow:visible"><use href="${href}"/></svg>`;
      });
      el.innerHTML = out;
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => ro.disconnect();
  }, [seed]);
  return (
    <div
      ref={box}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        background:
          "radial-gradient(120% 100% at 10% -10%,rgba(206,234,255,.62),rgba(255,255,255,0) 62%),radial-gradient(90% 85% at 95% 100%,rgba(156,198,111,.16),rgba(255,255,255,0) 68%),#fffaf1",
      }}
    />
  );
}

/**
 * Shared hero for the generic content pages -- reproduces the
 * `page-shell > page-hero` markup that was duplicated across every
 * placeholder .html page in the static site.
 */
export function Header({ title, lead }: HeaderProps) {
  const opt = HERO_OPTIONS[title] ?? {};
  const molecules = opt.moleculeSeed !== undefined;
  return (
    <main className="page-shell" style={molecules ? { position: "relative" } : undefined}>
      {molecules && <MoleculeField seed={opt.moleculeSeed as number} />}
      <section
        className="page-hero"
        style={molecules ? { position: "relative", zIndex: 1 } : undefined}
      >
        {!opt.hideEyebrow && (
          <p className="hero__eyebrow">Web page currently under construction!</p>
        )}
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__lede">{lead}</p>
      </section>
    </main>
  );
}
