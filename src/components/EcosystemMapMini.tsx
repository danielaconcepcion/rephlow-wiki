import { useState } from "react";
import { asset } from "../utils";
import type { EcosystemMapItem } from "./EcosystemMap";
import "./EcosystemMapMini.css";

/**
 * A tiny, corner-pinned "you are here" companion to EcosystemMap (see that
 * component's own doc comment). Shown only once the full map has scrolled
 * out of view (`visible`, gated by the caller from an IntersectionObserver
 * on whatever marks the boundary — see Engineering.tsx), so it never
 * competes with the full map for attention.
 *
 * Collapsed, it shows only the active block's own sphere — same
 * glass/glow/--eco-color treatment as EcosystemMap, just smaller. Hovering
 * or focusing it (or tapping the active sphere itself, for touch, which
 * toggles a pinned-open state) fans the other blocks out around it in a
 * small arc so any one can be reached directly, mirroring EcosystemMap's
 * own hover/pin state pattern at a much smaller scale. Picking one closes
 * the fan back down, since the newly active sphere becomes the new anchor.
 *
 * The container itself (not just the visible spheres) resizes between a
 * small collapsed hit-box and a large expanded one that bounds the whole
 * fan (see .ecosystem-map-mini's width/height rules) — since every sphere
 * is a DOM descendant of that one container, moving the pointer anywhere
 * within its current box, including the gaps between spheres, never
 * triggers onMouseLeave. That's what keeps the group open while hovering
 * from the active sphere onto any fanned-out one, and is also why it only
 * needs plain onMouseEnter/onMouseLeave rather than per-sphere tracking.
 */

// Fixed fan-out offsets for up to 4 "other" spheres, arcing up and to the
// left from the anchor sphere (bottom-right) so they never run off a
// narrow viewport regardless of how many items or which one is active.
const ARC_OFFSETS: [number, number][] = [
  [-8, -118],
  [-62, -100],
  [-100, -62],
  [-118, -8],
];

export function EcosystemMapMini({
  items,
  activeId,
  onSelect,
  visible,
}: {
  items: EcosystemMapItem[];
  activeId: string;
  onSelect: (id: string) => void;
  visible: boolean;
}) {
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const expanded = hover || pinned;

  const active = items.find((item) => item.id === activeId) ?? items[0];
  const others = items.filter((item) => item.id !== activeId);

  return (
    <div
      className={`ecosystem-map-mini${visible ? " is-visible" : ""}${expanded ? " is-expanded" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHover(false);
      }}
    >
      <span className="ecosystem-map-mini__backdrop" aria-hidden="true" />

      {others.slice(0, ARC_OFFSETS.length).map((item, i) => {
        const [dx, dy] = ARC_OFFSETS[i];
        return (
          <button
            key={item.id}
            type="button"
            className="ecosystem-map-mini__sphere ecosystem-map-mini__sphere--other"
            style={
              {
                "--eco-color": item.color,
                transform: expanded ? `translate(${dx}px, ${dy}px) scale(1)` : "translate(0, 0) scale(0.4)",
                opacity: expanded ? 1 : 0,
                pointerEvents: expanded ? "auto" : "none",
              } as React.CSSProperties
            }
            onClick={() => {
              onSelect(item.id);
              setPinned(false);
              setHover(false);
            }}
            aria-label={item.label.join(" ")}
          >
            <span className="ecosystem-map-mini__glass">
              <img
                src={asset(item.image)}
                alt=""
                style={{ width: `${item.imageSize}%`, height: `${item.imageSize}%` }}
              />
            </span>
            <span className="ecosystem-map-mini__label">{item.label[0]}</span>
          </button>
        );
      })}

      <button
        type="button"
        className="ecosystem-map-mini__sphere ecosystem-map-mini__sphere--active"
        style={{ "--eco-color": active.color } as React.CSSProperties}
        onClick={() => setPinned((p) => !p)}
        aria-expanded={expanded}
        aria-label={`${active.label.join(" ")} — show other blocks`}
      >
        <span className="ecosystem-map-mini__glow" aria-hidden="true" />
        <span className="ecosystem-map-mini__glass">
          <img
            src={asset(active.image)}
            alt=""
            style={{ width: `${active.imageSize}%`, height: `${active.imageSize}%` }}
          />
        </span>
        <span className="ecosystem-map-mini__label ecosystem-map-mini__label--active">{active.label[0]}</span>
      </button>
    </div>
  );
}
