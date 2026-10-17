import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * A record figure that opens full-size on click — the gels, chromatograms
 * and annotated sequences are unreadable at panel width, and a reader who
 * wants the detail should not have to open the image in a new tab.
 *
 * The overlay follows ProtocolModal: fixed, dimmed, closed by the ×, by
 * Escape or by a click on the backdrop, with the page's scroll locked while
 * it is open. State is per image, so only the one clicked is ever open and
 * no shared context is needed. The <img> keeps whatever class its grid
 * gives it, so layout is unchanged; `position: fixed` keeps the overlay out
 * of the surrounding grid's flow.
 */
export function ZoomableImage({
  className,
  src,
  alt,
  caption,
  title,
}: {
  className: string;
  src: string;
  alt: string;
  /** The same caption node shown under the figure, numbering included. */
  caption?: ReactNode;
  /** A panel title, where the grid labels each panel separately. */
  title?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <img
        className={`${className} record-figure__photo--zoomable`}
        src={src}
        alt={alt}
        role="button"
        tabIndex={0}
        aria-label={`${alt || title || "Figure"} — click to enlarge`}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      />
      {open && (
        <div
          className="figure-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt || title || "Figure"}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <button
            className="figure-lightbox__close"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close the enlarged figure"
          >
            ×
          </button>
          <figure className="figure-lightbox__figure">
            <img className="figure-lightbox__photo" src={src} alt={alt} />
            {(title || caption) && (
              <figcaption className="figure-lightbox__caption">
                {title && (
                  <strong className="figure-lightbox__title">{title}</strong>
                )}
                {caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
