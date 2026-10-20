import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { BOLD, CONTENT_MOLECULES, LEGEND, LOGO, PEOPLE, SECTIONS, img } from "./teamData.ts";
import type { Color, Person, SectionId } from "./teamData.ts";
import "./Team.css";

/*
 * Team page (rePhlow · Madrid-UCM 2026).
 * Tabs (members / advisors / mentors), colour legend that highlights an area,
 * cards with photo + sticker, and a detail dialog for each person.
 * The page header (title + molecules) comes from the wiki layout (pages.ts).
 */

const photo = (p: Person) => (p.noPhoto ? null : img(`${p.slug}.avif`));
const sticker = (p: Person) => (p.noPhoto ? null : img(`${p.slug}-sticker.avif`));
const hideBroken = (e: SyntheticEvent<HTMLImageElement>) => e.currentTarget.classList.add("is-broken");

function boldify(slug: string, html: string): string {
  let out = html;
  (BOLD[slug] ?? []).forEach((ph) => {
    const i = out.indexOf(ph);
    if (i > -1 && !/<strong>[^<]*$/.test(out.slice(0, i))) {
      out = out.slice(0, i) + "<strong>" + ph + "</strong>" + out.slice(i + ph.length);
    }
  });
  return out;
}

function PersonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </svg>
  );
}

/* Lilac / coral molecules behind the cards */
function ContentMolecules() {
  return (
    <div className="hmf-layer hmf-layer--content" aria-hidden="true">
      <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <linearGradient id="teamMolC" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b79be0" />
            <stop offset="1" stopColor="#f3a58f" />
          </linearGradient>
          <g
            id="teamMolG1"
            fill="url(#teamMolC)"
            stroke="url(#teamMolC)"
            strokeWidth="13"
            strokeLinecap="round"
          >
            <line x1="100" y1="100" x2="79" y2="42" />
            <line x1="100" y1="100" x2="43" y2="108" />
            <line x1="100" y1="100" x2="156" y2="121" />
            <line x1="100" y1="100" x2="90" y2="154" />
            <circle cx="79" cy="42" r="19" stroke="none" />
            <circle cx="43" cy="108" r="17" stroke="none" />
            <circle cx="156" cy="121" r="18" stroke="none" />
            <circle cx="90" cy="154" r="16" stroke="none" />
            <circle cx="100" cy="100" r="31" stroke="none" />
          </g>
          <g
            id="teamMolG2"
            fill="url(#teamMolC)"
            stroke="url(#teamMolC)"
            strokeWidth="12"
            strokeLinecap="round"
          >
            <line x1="98" y1="104" x2="132" y2="46" />
            <line x1="98" y1="104" x2="38" y2="82" />
            <line x1="98" y1="104" x2="60" y2="158" />
            <line x1="98" y1="104" x2="160" y2="146" />
            <circle cx="132" cy="46" r="16" stroke="none" />
            <circle cx="38" cy="82" r="20" stroke="none" />
            <circle cx="60" cy="158" r="15" stroke="none" />
            <circle cx="160" cy="146" r="18" stroke="none" />
            <circle cx="98" cy="104" r="28" stroke="none" />
          </g>
        </defs>
      </svg>
      {CONTENT_MOLECULES.map(([l, t, s, r, o, b, g], k) => (
        <svg
          key={k}
          className="hmf-mol"
          viewBox="0 0 200 200"
          style={{
            left: `${l}%`,
            top: `${t}%`,
            width: s,
            height: s,
            transform: `translate(-50%,-50%) rotate(${r}deg)`,
            opacity: o,
            filter: b ? `blur(${b}px)` : undefined,
          }}
        >
          <use href={`#teamMolG${g}`} />
        </svg>
      ))}
    </div>
  );
}

function TeamCard({ p, isMatch, onOpen }: { p: Person; isMatch: boolean; onOpen: () => void }) {
  const ph = photo(p);
  const st = sticker(p);
  const onKey = (e: ReactKeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };
  return (
    <article
      className={`team-card team-card--${p.color}${isMatch ? " is-match" : ""}`}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`Open details for ${p.name}`}
      onClick={onOpen}
      onKeyDown={onKey}
    >
      <div className="team-card__frame">
        <div className="team-card__media">
          <div className="team-card__img-fallback">
            <PersonIcon />
          </div>
          {ph && <img className="team-card__img" src={ph} alt={p.name} loading="lazy" onError={hideBroken} />}
        </div>
        {st && (
          <span className="team-sticker" aria-hidden="true">
            <img src={st} alt="" loading="lazy" onError={hideBroken} />
          </span>
        )}
      </div>
      <p className="team-card__name">{p.name}</p>
    </article>
  );
}

function TeamModal({ p, onClose }: { p: Person; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dlgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    document.body.classList.add("team-modal-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("team-modal-open");
      before?.focus?.();
    };
  }, [onClose]);

  useEffect(() => {
    if (dlgRef.current) dlgRef.current.scrollTop = 0;
    closeRef.current?.focus();
  }, [p]);

  const ph = photo(p);
  const html = (t: string) => ({ __html: boldify(p.slug, t) });

  return createPortal(
    <div className="team-page">
      <div className="team-modal">
        <div className="team-modal__backdrop" onClick={onClose} />
        <div
          ref={dlgRef}
          className={`team-modal__dialog team-modal__dialog--${p.color}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-name"
        >
          <button
            ref={closeRef}
            className="team-modal__close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          <div className="team-modal__frame">
            <div className="team-modal__media">
              {ph ? (
                <img src={ph} alt={p.name} onError={hideBroken} />
              ) : (
                <div className="team-card__img-fallback">
                  <PersonIcon />
                </div>
              )}
            </div>
          </div>
          <h2 className="team-modal__name" id="team-modal-name">
            {p.name}
          </h2>
          {p.education && <p className="team-modal__education">{p.education}</p>}
          {p.roleText ? (
            <details className="team-modal__role-details">
              <summary className="team-modal__role">
                {p.role}
                <svg
                  className="team-modal__chev"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="team-modal__role-text" dangerouslySetInnerHTML={html(p.roleText)} />
            </details>
          ) : (
            <p className="team-modal__role">{p.role}</p>
          )}
          {p.about && p.about.length > 0 && (
            <div className="team-modal__section">
              <h3>About</h3>
              {p.about.map((t, i) => (
                <p key={i} dangerouslySetInnerHTML={html(t)} />
              ))}
            </div>
          )}
          {p.strength && (
            <div className="team-modal__section">
              <h3>Strength</h3>
              <p dangerouslySetInnerHTML={html(p.strength)} />
            </div>
          )}
          {p.weakness && (
            <div className="team-modal__section">
              <h3>Weakness</h3>
              <p dangerouslySetInnerHTML={html(p.weakness)} />
            </div>
          )}
          {p.logos && p.logos.length > 0 && (
            <div className="team-modal__institutions">
              {p.logos.map((k) => {
                const [name, src, h, mod] = LOGO[k];
                return (
                  <div key={k} className="team-modal__institution">
                    <img
                      src={src}
                      className={mod ? `is-${mod}` : undefined}
                      style={{ height: h || 48 }}
                      alt={name}
                      title={name}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          )}
          {p.links.length > 0 && (
            <div className="team-modal__links">
              {p.links.map(([label, url]) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                  {label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function initialSection(): SectionId {
  const h = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
  return SECTIONS.some((s) => s.id === h) ? (h as SectionId) : "members";
}

export function Team() {
  const [active, setActive] = useState<SectionId>(initialSection);
  const [filter, setFilter] = useState<Color | null>(null);
  const [open, setOpen] = useState<Person | null>(null);
  const closeModal = useCallback(() => setOpen(null), []);

  const mainRef = useRef<HTMLDivElement | null>(null);

  const people = PEOPLE[active];
  const present = useMemo(() => new Set(people.map((p) => p.color)), [people]);
  const matches = filter ? people.filter((p) => p.color === filter).length : 0;

  /* Picking an area highlights its people and dims the rest, but the first
     highlighted card can be well below the fold, so the reader sees the
     grid grey out with nothing to look at. Scroll to that first card once
     the highlight has been applied. Clearing the filter scrolls nowhere —
     the reader is already looking at what they wanted. */
  useEffect(() => {
    if (!filter) return;
    const first = mainRef.current?.querySelector(".team-card.is-match");
    first?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [filter, active]);
  const filterLabel = filter ? LEGEND.find(([c]) => c === filter)?.[1] : "";

  const hint = !filter
    ? "Click an area to highlight its people"
    : matches
      ? `${matches} ${matches === 1 ? "person" : "people"} in ${filterLabel} · click again to show everyone`
      : `No one in ${filterLabel} in this section · click again to show everyone`;

  return (
    <div className="team-page">
      <div className="lab-folders">
        <ContentMolecules />

        <div className="lab-folders__menu">
          <div className="section-tabs" role="tablist" aria-label="Team sections">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`section-tabs__btn${s.id === active ? " is-active" : ""}`}
                role="tab"
                type="button"
                id={`tab-${s.id}`}
                aria-controls={`panel-${s.id}`}
                aria-selected={s.id === active}
                onClick={() => setActive(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <ul className="team-legend" aria-label="Filter by area">
            {LEGEND.map(([c, label]) => (
              <li key={c}>
                <button
                  type="button"
                  className={`team-legend__item${present.has(c) ? "" : " is-empty"}`}
                  aria-pressed={filter === c}
                  onClick={() => setFilter((f) => (f === c ? null : c))}
                >
                  <span className={`team-legend__swatch team-legend__swatch--${c}`} aria-hidden="true" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <p className="team-legend__hint" aria-live="polite">
            {hint}
          </p>
        </div>

        <div className="team-main" ref={mainRef}>
          <section
            key={active}
            className="team-panel"
            id={`panel-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
          >
            <div className={`team-grid${filter ? " is-filtered" : ""}`}>
              {people.map((p) => (
                <TeamCard key={p.slug} p={p} isMatch={filter === p.color} onOpen={() => setOpen(p)} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {open && <TeamModal p={open} onClose={closeModal} />}
    </div>
  );
}
