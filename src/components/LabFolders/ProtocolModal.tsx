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

  return (
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
          <strong>{title}</strong>
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
    </div>
  );
}
