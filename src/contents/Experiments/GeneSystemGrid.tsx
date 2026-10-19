import { useState } from "react";
import type { GenePart } from "./GeneticEngineeringData";
import "./GeneSystemGrid.css";

/**
 * Creative presentation for "The five parts of the system": the source
 * groups PPK1/PstSCAB as parts we ADD and Ppx/PpkB/PitB as parts we REMOVE
 * (its own schematic colours them green/red) — rather than five flat
 * accordion toggles, that grouping becomes two colour-coded lanes of
 * click-to-expand gene cards, echoing the diagram's own visual language as
 * a real interaction instead of a static image. Each card's "storyboard"
 * field describes a hypothetical explanatory animation the team hasn't
 * produced yet, so it's shown as a clearly labelled text note, never as a
 * media placeholder implying a real asset exists.
 */
export function GeneSystemGrid({ parts }: { parts: GenePart[] }) {
  const [openId, setOpenId] = useState<string | null>(parts[0]?.id ?? null);
  const added = parts.filter((part) => part.role === "add");
  const removed = parts.filter((part) => part.role === "remove");

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  function renderLane(label: string, hint: string, lane: GenePart[], variant: "add" | "remove") {
    return (
      <div className={`gene-lane gene-lane--${variant}`}>
        <div className="gene-lane__head">
          <span className="gene-lane__badge">
            <span className="gene-lane__marker" aria-hidden="true" />
            {label}
          </span>
          <p className="gene-lane__hint">{hint}</p>
        </div>
        <div className="gene-lane__cards">
          {lane.map((part) => {
            const isOpen = openId === part.id;
            return (
              <div className={`gene-card${isOpen ? " is-open" : ""}`} key={part.id}>
                <button
                  type="button"
                  className="gene-card__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`gene-card-body-${part.id}`}
                  onClick={() => toggle(part.id)}
                >
                  <span className="gene-card__name">{part.shortName}</span>
                  <span className="gene-card__full-name">{part.fullName}</span>
                  <span className="gene-card__chevron" aria-hidden="true" />
                </button>
                <div className="gene-card__body-wrap" aria-hidden={!isOpen}>
                  <div className="gene-card__body" id={`gene-card-body-${part.id}`}>
                    <p className="gene-card__field">
                      <strong>What it does.</strong> {part.whatItDoes}
                    </p>
                    <p className="gene-card__field">
                      <strong>What we do to it, and why.</strong> {part.whatWeDo}
                    </p>
                    <p className="gene-card__storyboard">
                      <span className="gene-card__storyboard-label">Concept sketch, not yet illustrated —</span>{" "}
                      {part.storyboard}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="gene-system-grid-frame">
      <div className="gene-system-grid">
        {renderLane("Add", "New capacity, cloned in", added, "add")}
        {renderLane("Remove", "Native routes, knocked out", removed, "remove")}
      </div>
    </div>
  );
}
