import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./EnzymeViewerCard.css";

/* Results > Enzymatic immobilisation: interactive 3D enzyme viewer.
   A dark bubble in the block colour (title, short description, "Open viewer")
   opens public/enzyme-viewer/ in a pop-up with "Full screen" and "Open in browser".
   3Dmol.js and the structure data come from iGEM Uploads (folder "enzyme-viewer"). */
const VIEWER = `${import.meta.env.BASE_URL}enzyme-viewer/index.html`;
const TITLE = "Interactive enzyme viewer";

export function EnzymeViewerCard() {
  const [open, setOpen] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <article className="ezv-card-portal">
        <div className="ezv-card-portal__txt">
          <span className="ezv-card-portal__eyebrow">Structural models &middot; interactive</span>
          <h3>{TITLE}</h3>
          <p>
            Explore in 3D the structural models of the enzyme panel (M2-32, AphA, AppA, CerA, EstE1, PhyA
            and PLC) and of the model enzyme Lecitase Ultra: the N- and C-termini, the predicted disulphide
            bridges, and the closed and open conformations of the Lecitase lid. Rotate, zoom and download
            any view as an image.
          </p>
        </div>
        <button type="button" className="ezv-card-portal__open" onClick={() => setOpen(true)}>
          Open viewer
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </article>
      {open &&
        createPortal(
          <div className="ezv-modal" onClick={() => setOpen(false)}>
            <div className="ezv-modal__box" role="dialog" aria-modal="true" aria-label={TITLE} onClick={(e) => e.stopPropagation()}>
              <div className="ezv-modal__head">
                <h3>{TITLE}</h3>
                <div className="ezv-modal__tools">
                  <button type="button" className="ezv-modal__tool" onClick={() => frame.current?.requestFullscreen?.()}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                    </svg>
                    Full screen
                  </button>
                  <a className="ezv-modal__tool" href={VIEWER} target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
                    </svg>
                    Open in browser
                  </a>
                  <button type="button" className="ezv-modal__close" aria-label="Close the viewer" onClick={() => setOpen(false)}>
                    &times;
                  </button>
                </div>
              </div>
              <iframe ref={frame} className="ezv-modal__frame" src={VIEWER} title={TITLE} allowFullScreen />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
