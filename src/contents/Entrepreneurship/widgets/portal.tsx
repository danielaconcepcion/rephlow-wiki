import { useRef } from "react";
import { useModal } from "../state";
import { Icon } from "../ui";

/* Customer portal (demo): opens public/customer-portal/ in the page pop-up,
   with "Open in browser" (new tab) and a full-screen button. */
const PORTAL = `${import.meta.env.BASE_URL}customer-portal/index.html`;

function PortalViewer() {
  const frame = useRef<HTMLIFrameElement>(null);
  return (
    <>
      <div className="ent-portal-head">
        <h3 className="modal__t">rePhlow Customer Portal (demo)</h3>
        <div className="ent-portal-tools">
          <button
            type="button"
            className="ent-portal-tool"
            title="Full screen"
            onClick={() => frame.current?.requestFullscreen?.()}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
            Full screen
          </button>
          <a className="ent-portal-tool" href={PORTAL} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
            </svg>
            Open in browser
          </a>
        </div>
      </div>
      <iframe
        ref={frame}
        className="ent-portal-frame"
        src={PORTAL}
        title="rePhlow Customer Portal (demo)"
        allowFullScreen
      />
    </>
  );
}

function useOpenPortal() {
  const modal = useModal();
  return () => modal.open(<PortalViewer />, "#5f7d36", true);
}

/** Small button version (kept for reuse). */
export function PortalButton() {
  const open = useOpenPortal();
  return (
    <button type="button" className="pdf-btn" onClick={(e) => { e.preventDefault(); open(); }}>
      <Icon n="euro" />
      <span>
        <b>Customer portal (demo)</b>
        <small>Open the portal viewer</small>
      </span>
    </button>
  );
}

/** Bubble under "Business model": title, short description and "Open demo". */
export function PortalCard() {
  const open = useOpenPortal();
  return (
    <article id="s3-portal" className="sub rv ent-portal-card">
      <div className="ent-portal-card__txt">
        <span className="eyebrow">Customer portal &middot; demo</span>
        <h3>rePhlow Customer Portal</h3>
        <p>
          How a customer would meet rePhlow: describe an effluent, size the number of modules, compare
          Phosphorus-as-a-Service with direct purchase and get an indicative first-year quotation built on the
          figures of our financial model. A demonstration only: no order is placed and no data leaves the page.
        </p>
      </div>
      <button type="button" className="ent-portal-open" onClick={open}>
        Open demo
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </article>
  );
}
