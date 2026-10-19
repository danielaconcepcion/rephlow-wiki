import { useRef, useState } from "react";

/**
 * A track with a fixed, discrete set of stops (never a continuous range) —
 * shared by the objective-priority slider and every perturbation-value
 * slider in ScenarioSidebar. Dragging/clicking anywhere on the track snaps
 * to the nearest stop; arrow keys/Home/End step between stops. No
 * interpolation between checkpoints is ever implied — each stop is a
 * precomputed scenario, not a continuous input.
 */
export function DiscreteSlider({
  checkpoints,
  formatTick,
  value,
  onChange,
  ariaLabel,
  ariaValueText,
}: {
  checkpoints: (number | string)[];
  formatTick: (checkpoint: number | string) => string;
  value: number | string | null;
  onChange: (checkpoint: number | string) => void;
  ariaLabel: string;
  ariaValueText?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [, forceRerender] = useState(0);

  const activeIndex = Math.max(
    0,
    checkpoints.findIndex((c) => c === value),
  );

  function selectFromClientX(clientX: number) {
    const track = trackRef.current;
    if (!track || checkpoints.length === 0) return;
    const rect = track.getBoundingClientRect();
    const fraction = rect.width === 0 ? 0 : Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const index = Math.round(fraction * (checkpoints.length - 1));
    const checkpoint = checkpoints[index];
    if (checkpoint !== value) onChange(checkpoint);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    selectFromClientX(event.clientX);
  }
  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    selectFromClientX(event.clientX);
  }
  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    forceRerender((n) => n + 1); // ensure the handle settles at the snapped position
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = checkpoints[Math.min(checkpoints.length - 1, activeIndex + 1)];
      if (next !== undefined) onChange(next);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      const prev = checkpoints[Math.max(0, activeIndex - 1)];
      if (prev !== undefined) onChange(prev);
    } else if (event.key === "Home") {
      event.preventDefault();
      onChange(checkpoints[0]);
    } else if (event.key === "End") {
      event.preventDefault();
      onChange(checkpoints[checkpoints.length - 1]);
    }
  }

  const fraction = checkpoints.length > 1 ? activeIndex / (checkpoints.length - 1) : 0;

  return (
    <div className="model-network__slider">
      <div
        className="model-network__slider-track"
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={checkpoints.length - 1}
        aria-valuenow={activeIndex}
        aria-valuetext={ariaValueText ?? formatTick(checkpoints[activeIndex])}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <div className="model-network__slider-line" />
        {checkpoints.map((checkpoint, i) => (
          <span
            key={String(checkpoint)}
            className="model-network__slider-tick"
            style={{ left: `${checkpoints.length > 1 ? (i / (checkpoints.length - 1)) * 100 : 0}%` }}
          />
        ))}
        <div className="model-network__slider-handle" style={{ left: `${fraction * 100}%` }} />
      </div>
      <div className="model-network__slider-labels">
        {checkpoints.map((checkpoint) => (
          <span
            key={String(checkpoint)}
            className={`model-network__slider-label${checkpoint === value ? " is-active" : ""}`}
          >
            {formatTick(checkpoint)}
          </span>
        ))}
      </div>
    </div>
  );
}
