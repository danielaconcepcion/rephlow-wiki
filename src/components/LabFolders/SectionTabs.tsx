import type { SectionTabDef } from "./types";

/**
 * The top-level contextual-menu tab bar (e.g. Bacteria / Encapsulación /
 * Revalorisation). Same pill-tab visual language as Team's category tabs
 * (see Team.css .team-tabs), reimplemented as its own reusable component
 * so Experiments and Results share one menu instead of two bespoke ones.
 */
export function SectionTabs({
  tabs,
  activeId,
  onChange,
  ariaLabel,
}: {
  tabs: SectionTabDef[];
  activeId: string;
  onChange: (id: string) => void;
  ariaLabel: string;
}) {
  return (
    <div className="section-tabs" role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === activeId}
          className={`section-tabs__btn${tab.id === activeId ? " is-active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
