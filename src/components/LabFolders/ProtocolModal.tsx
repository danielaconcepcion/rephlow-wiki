import { createPortal } from "react-dom";
import { useEffect } from "react";

export function ProtocolModal({
  src,
  title,
  onClose,
}: {
  src: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="protocol-modal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="protocol-modal__dialog">
        <div className="protocol-modal__bar">
          <strong className="protocol-modal__title">{title}</strong>
          {/* The same two actions the Entrepreneurship PDF viewer offers:
              the embed alone can neither be saved nor opened full-size,
              and a reader wanting to search, zoom or print the protocol
              needs the browser's own PDF reader. */}
          <div className="protocol-modal__tools">
            <a className="protocol-modal__tool" href={src} download>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
              </svg>
              Download PDF
            </a>
            <a
              className="protocol-modal__tool"
              href={src}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
              </svg>
              Open in browser
            </a>
          </div>
          <button
            className="protocol-modal__close"
            type="button"
            onClick={onClose}
            aria-label="Close protocol viewer"
          >
            ×
          </button>
        </div>
        <object
          className="protocol-modal__frame"
          data={src}
          type="application/pdf"
          aria-label={title}
        >
          <p>
            This browser cannot display the PDF.{" "}
            <a href={src} target="_blank" rel="noreferrer">
              Open it in a new tab
            </a>
            .
          </p>
        </object>
      </div>
    </div>,
    document.body,
  );
}
