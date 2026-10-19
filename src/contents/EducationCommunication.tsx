import { useCallback, useEffect, useRef, useState } from "react";

import { PageSectionNav } from "../components/PageSectionNav";
import type { PageSection } from "../components/PageSectionNav";
import { Rich } from "../components/LabFolders/RichText";
import { ActivityModal } from "./EducationCommunication/ActivityModal";
import { Blackboard } from "./EducationCommunication/Blackboard";
import {
  ACTIVITIES,
  EDUCATION_INTRO,
} from "./EducationCommunication/educationData";
import "./CollaborationPartnership/CollaborationPartnership.css";
import "./EducationCommunication/EducationCommunication.css";

/* --------------------------------------------------------------------------
   Education and Communication — nine activities, in the order they
   happened, indexed by a blackboard; clicking an object opens that
   activity in a dialog, the same one the Collaboration tables use.

   The board carries the same materiality as the Collaboration tables, in
   the language of a lecture theatre rather than a desk: objects taped to a
   slate, a chalk line running from November 2025 to July 2026, formulas
   and half-erased sketches in the margins. Below the breakpoint the slate stays, but as a
   chalk list — nine objects at 320 px wide would be nine illegible stamps.
   -------------------------------------------------------------------------- */

/** Built once, outside the component, so PageSectionNav's observer effect
 * is not torn down on every render (see PageSectionNav's `sections` doc).
 * Each activity opens its dialog rather than scrolling: there is no longer
 * an entry on the page to scroll to, which is what `onSelect` is for. */
const SECTIONS: PageSection[] = ACTIVITIES.map((activity, index) => ({
  id: activity.id,
  label: `${index + 1}. ${activity.chalk}`,
  onSelect: () => openActivity?.(activity.id),
}));

/** Set by the mounted page, so the module-level SECTIONS above can reach
 * its state setter without being rebuilt on each render. */
let openActivity: ((id: string) => void) | null = null;

/** The board is drawn at a fixed 1600 x 960 and scrolls sideways when the
 * column is narrower than it. Below this width there is not enough of it
 * on screen at once to read as a composition, so it becomes a chalk list
 * instead — nine objects on a phone would be nine illegible stamps. */
const WIDE_MIN = 480;

/** The page's own accent — the purple of the Engagement section, so the
 * chronicle's numbers and links read as part of the same family as
 * Collaboration and Human Practices. */
const ACCENT = "#6E5A96";

export function EducationCommunication() {
  const colRef = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = colRef.current;
    if (!element) return;
    const measure = () =>
      setWide(element.getBoundingClientRect().width >= WIDE_MIN);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  /** Open an activity's dialog, remembering what opened it so focus can
   * go back there on close. */
  const select = useCallback((id: string) => {
    const active = document.activeElement;
    triggerRef.current = active instanceof HTMLElement ? active : null;
    setOpenId(id);
    // Keep the URL in step, without the jump a bare hash change causes.
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  // Let the sidebar links (built at module level) reach this instance.
  useEffect(() => {
    openActivity = select;
    return () => {
      openActivity = null;
    };
  }, [select]);

  return (
    <>
      <div
        className="page-with-section-nav ec-page"
        style={{ "--ec-accent": ACCENT } as React.CSSProperties}
      >
        <PageSectionNav sections={SECTIONS} ariaLabel="Jump to an activity" />

        <div ref={colRef} className="ec-col">
          <p className="ec-intro">
            <Rich text={EDUCATION_INTRO} />
          </p>

          {wide ? (
            <Blackboard onSelect={select} currentId={openId} />
          ) : (
            <div className="ec-board-frame">
              <nav
                className="ec-board ec-board--list"
                aria-label="Activities, in order"
              >
                <p className="ec-list-title">Education &amp; Communication</p>
                {ACTIVITIES.map((activity, index) => (
                  <a
                    key={activity.id}
                    className="ec-list-item"
                    href={`#${activity.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      select(activity.id);
                    }}
                  >
                    <span className="ec-list-item__index">{index + 1}</span>
                    <span>
                      <span className="ec-list-item__name">
                        {activity.chalk}
                      </span>
                      <span className="ec-list-item__date">
                        {activity.date}
                      </span>
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>

      {openId && (
        <ActivityModal openId={openId} onNavigate={select} onClose={close} />
      )}
    </>
  );
}
