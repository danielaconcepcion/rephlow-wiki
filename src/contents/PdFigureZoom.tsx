import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./PdFigureZoom.css";

/**
 * Project Description: tap or click any picture inside a <figure> to see it
 * enlarged with its figure caption. Close with the X, the backdrop or Esc.
 */
type Shown = { src: string; alt: string; caption: string };

export function PdFigureZoom() {
  const [shown, setShown] = useState<Shown | null>(null);

  useEffect(() => {
    const page = document.querySelector(".pd-page");
    if (!page) return;
    const onClick = (e: Event) => {
      const img = (e.target as HTMLElement).closest("img");
      if (!img || !page.contains(img)) return;
      const fig = img.closest("figure");
      if (!fig || img.closest("a, button, .pd-video-figure")) return;
      e.preventDefault();
      const cap = fig.querySelector("figcaption");
      setShown({
        src: img.currentSrc || img.src,
        alt: img.alt,
        caption: cap ? cap.innerHTML : "",
      });
    };
    page.addEventListener("click", onClick);
    return () => page.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShown(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [shown]);

  if (!shown) return null;
  return createPortal(
    <div
      className="pd-zoom"
      role="dialog"
      aria-modal="true"
      aria-label={shown.alt || "Figure"}
      onClick={() => setShown(null)}
    >
      <button
        type="button"
        className="pd-zoom__close"
        aria-label="Close"
        onClick={() => setShown(null)}
      >
        {"\u00d7"}
      </button>
      <figure className="pd-zoom__figure" onClick={(e) => e.stopPropagation()}>
        <img src={shown.src} alt={shown.alt} />
        {shown.caption && (
          <figcaption
            className="pd-zoom__caption"
            dangerouslySetInnerHTML={{ __html: shown.caption }}
          />
        )}
      </figure>
    </div>,
    document.body,
  );
}
