import { useLayoutEffect, useRef } from "react";

/**
 * Two-line page title. The second line is scaled so it spans exactly the
 * same width as the first (reviewed v10 behaviour), on resize and once the
 * web fonts have loaded.
 */
export function FitTitle() {
  const a = useRef<HTMLSpanElement>(null);
  const b = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const width = (el: Element) => {
      const r = document.createRange();
      r.selectNodeContents(el);
      return r.getBoundingClientRect().width;
    };
    const fit = () => {
      const A = a.current;
      const B = b.current;
      if (!A || !B) return;
      B.style.removeProperty("font-size");
      const wa = width(A);
      const wb = width(B);
      if (!wa || !wb) return;
      const fs = parseFloat(getComputedStyle(B).fontSize);
      B.style.setProperty("font-size", `${((fs * wa) / wb) * 0.995}px`, "important");
    };
    fit();
    addEventListener("resize", fit);
    document.fonts?.ready.then(fit);
    return () => removeEventListener("resize", fit);
  }, []);
  return (
    <h2 className="ent-title rv">
      <span className="ent-title__a" ref={a}>
        Most technologies manage phosphorus.
      </span>
      <span className="ent-title__b" ref={b}>
        rePhlow gives it a <em>second life</em>
      </span>
    </h2>
  );
}
