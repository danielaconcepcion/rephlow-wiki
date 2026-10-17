import { useEffect, useRef } from "react";

import { Rich } from "../../components/LabFolders/RichText";
import { ACTIVITIES } from "./educationData";

/* --------------------------------------------------------------------------
   One dialog per activity, in the same design as the Collaboration tables'
   (hence the cp-modal classes): a tinted head with the title, the section
   name and a counter, prev/next through all nine activities by button or
   ←/→, and Esc or the backdrop to close.

   The board stays the index; what used to be the chronicle underneath it
   is now what the dialog shows, photographs included — there are two or
   three per activity at most, so they are all on screen at once.
   -------------------------------------------------------------------------- */

/** The purple of the Engagement section, as on the Collaboration iGEM table. */
const HEAD_BG = "linear-gradient(135deg, #3a2c5c, #6E5A96)";

export function ActivityModal({
  openId,
  onNavigate,
  onClose,
}: {
  openId: string;
  onNavigate: (id: string) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const idx = ACTIVITIES.findIndex((a) => a.id === openId);
  const cur = ACTIVITIES[idx];
  const n = ACTIVITIES.length;
  const prev = ACTIVITIES[(idx - 1 + n) % n];
  const next = ACTIVITIES[(idx + 1) % n];

  // Lock page scroll while open.
  useEffect(() => {
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = before;
    };
  }, []);

  // Each activity opens at the top, with focus on the close button.
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [openId]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onNavigate(prev.id);
      else if (e.key === "ArrowRight") onNavigate(next.id);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onNavigate, prev.id, next.id]);

  if (!cur) return null;

  return (
    <div className="cp-modal">
      <div className="cp-modal__backdrop" onClick={onClose} />
      <div
        className="cp-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ec-modal-title"
      >
        <button
          type="button"
          className="cp-modal__step cp-modal__step--prev"
          aria-label={`Previous: ${prev.title}`}
          onClick={() => onNavigate(prev.id)}
        >
          ‹
        </button>
        <button
          type="button"
          className="cp-modal__step cp-modal__step--next"
          aria-label={`Next: ${next.title}`}
          onClick={() => onNavigate(next.id)}
        >
          ›
        </button>

        <div className="cp-modal__head" style={{ background: HEAD_BG }}>
          <h2 id="ec-modal-title" className="cp-modal__title">
            {cur.title}
          </h2>
          <p className="cp-modal__meta">
            Education &amp; Communication
            <span className="cp-modal__counter">
              {idx + 1} / {n}
            </span>
          </p>
          <button
            ref={closeRef}
            type="button"
            className="cp-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div ref={bodyRef} className="cp-modal__body ec-modal__body">
          <div className="cp-stack">
            <p className="cp-kicker">
              {cur.date} · {cur.place}
            </p>

            {cur.body.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "cp-lead" : undefined}>
                <Rich text={paragraph} />
              </p>
            ))}

            {cur.link && (
              <a
                className="ec-entry__link"
                href={cur.link.href}
                target="_blank"
                rel="noreferrer"
              >
                {cur.link.label} ↗
              </a>
            )}

            {/* Two or three photos at most per activity, so they are all
                shown at once rather than hidden behind a carousel. */}
            {cur.photos.length > 0 && (
              <div
                className={`ec-modal__photos${
                  cur.photos.length === 1 ? " ec-modal__photos--single" : ""
                }`}
              >
                {cur.photos.map((photo) => (
                  <figure
                    key={photo.src}
                    className="ec-modal__photo"
                    style={{ aspectRatio: photo.ratio }}
                  >
                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
