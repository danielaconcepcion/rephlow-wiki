import { useState, type ReactNode } from "react";
import "./AccordionSection.css";

/**
 * Local, self-contained disclosure primitive — generalized from the pattern
 * in Model/ScenarioSidebar.tsx's local AccordionSection, but owning its own
 * open state (uncontrolled) since most Human Practices uses (case-study
 * comparisons, the AREA framework blurb, risk-card "read more") don't need
 * a single-open-at-a-time group; where a section does (e.g. one value open
 * in the Compass at a time), it manages that itself and can still render
 * this as a controlled child via `isOpen`/`onToggle`.
 */
export function AccordionSection({
  title,
  children,
  defaultOpen = false,
  isOpen: controlledOpen,
  onToggle,
  className = "",
  id,
}: {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  /** When set, placed on the always-visible wrapper (not the collapsible
   * content) so PageSectionNav anchors land on a stable target regardless
   * of open state. */
  id?: string;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  function toggle() {
    if (isControlled) {
      onToggle?.();
    } else {
      setUncontrolledOpen((v) => !v);
    }
  }

  return (
    <div
      id={id}
      className={`hp-accordion${open ? " is-open" : ""} ${className}`}
    >
      <button
        type="button"
        className="hp-accordion__trigger"
        onClick={toggle}
        aria-expanded={open}
      >
        <svg
          className={`hp-accordion__chevron${open ? " is-open" : ""}`}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <path
            d="M2 3.5 L5 6.5 L8 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="hp-accordion__title">{title}</span>
      </button>
      {open && <div className="hp-accordion__content">{children}</div>}
    </div>
  );
}
