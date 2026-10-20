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

export function PortalButton() {
  const modal = useModal();
  return (
    <button
      type="button"
      className="pdf-btn"
      onClick={(e) => {
        e.preventDefault();
        modal.open(<PortalViewer />, "#5f7d36", true);
      }}
    >
      <Icon n="euro" />
      <span>
        <b>Customer portal (demo)</b>
        <small>Open the portal viewer</small>
      </span>
    </button>
  );
}
