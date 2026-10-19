import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

/*
 * Click-to-enlarge for the figures of the page.
 * Clicking any image inside a <figure> opens it full screen with its figure
 * caption. Close with Esc, the × button or a click on the dark background;
 * ← / → (or the side arrows) move to the previous / next figure image.
 */

type Zoomed = { src: string; alt: string; caption: string };

const ZOOMABLE = "figure img";

function captionFor(img: HTMLImageElement): string {
  const fig = img.closest("figure");
  if (!fig) return "";
  const own = fig.querySelector(":scope > figcaption") ?? fig.querySelector("figcaption");
  return own ? own.innerHTML : "";
}

function zoomableImages(root: HTMLElement): HTMLImageElement[] {
  return Array.from(root.querySelectorAll<HTMLImageElement>(ZOOMABLE)).filter((im) => !im.closest("button"));
}

export function useFigureLightbox(rootRef: RefObject<HTMLElement | null>) {
  const [index, setIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState<Zoomed | null>(null);

  const show = useCallback(
    (i: number) => {
      const root = rootRef.current;
      if (!root) return;
      const list = zoomableImages(root);
      if (!list.length) return;
      const k = (i + list.length) % list.length;
      const im = list[k];
      setIndex(k);
      setZoomed({ src: im.currentSrc || im.src, alt: im.alt, caption: captionFor(im) });
    },
    [rootRef],
  );

  const close = useCallback(() => {
    setIndex(null);
    setZoomed(null);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const im = target.closest<HTMLImageElement>(ZOOMABLE);
      if (!im || im.closest("button")) return;
      const k = zoomableImages(root).indexOf(im);
      if (k >= 0) show(k);
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [rootRef, show]);

  return {
    zoomed,
    close,
    prev: () => index !== null && show(index - 1),
    next: () => index !== null && show(index + 1),
  };
}

export function FigureLightbox({
  zoomed,
  close,
  prev,
  next,
}: {
  zoomed: Zoomed | null;
  close: () => void;
  prev: () => void;
  next: () => void;
}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const handlers = useRef({ close, prev, next });
  handlers.current = { close, prev, next };
  const isOpen = zoomed !== null;

  /* While open: lock page scroll, focus the close button, keyboard shortcuts.
     On close: give the focus back to where it was. */
  useEffect(() => {
    if (!isOpen) return undefined;
    const before = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.stopPropagation();
      e.preventDefault();
      if (e.key === "Escape") handlers.current.close();
      if (e.key === "ArrowLeft") handlers.current.prev();
      if (e.key === "ArrowRight") handlers.current.next();
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = overflow;
      before?.focus?.();
    };
  }, [isOpen]);

  if (!zoomed) return null;

  return createPortal(
    <div
      className="hw-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={zoomed.alt || "Enlarged figure"}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button ref={closeBtn} type="button" className="hw-lightbox__close" aria-label="Close" onClick={close}>
        ×
      </button>
      <button
        type="button"
        className="hw-lightbox__nav hw-lightbox__nav--prev"
        aria-label="Previous figure"
        onClick={prev}
      >
        ‹
      </button>
      <figure className="hw-lightbox__figure">
        <img src={zoomed.src} alt={zoomed.alt} />
        {zoomed.caption && (
          <figcaption
            onClick={(e) => {
              if ((e.target as Element).closest("a")) close();
            }}
            dangerouslySetInnerHTML={{ __html: zoomed.caption }}
          />
        )}
      </figure>
      <button
        type="button"
        className="hw-lightbox__nav hw-lightbox__nav--next"
        aria-label="Next figure"
        onClick={next}
      >
        ›
      </button>
    </div>,
    document.body,
  );
}
