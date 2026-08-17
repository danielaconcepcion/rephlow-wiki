import {
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import "./FlipCard.css";

/**
 * Content-agnostic 3D flip-card primitive, local to Human Practices (three
 * prototypes independently hand-rolled the same rotateY(180deg) mechanism —
 * this consolidates it, not the per-section skin).
 *
 * Two modes:
 * - `flipOn="click"` (section 0's case-study cards): clicking, or pressing
 *   Enter/Space while focused, toggles a persistent flipped state. Hover
 *   also flips (desktop convenience), matching the original prototype.
 * - `flipOn="hover"` (section 5.3's toolkit deck): the flip is a purely
 *   decorative hover/focus-within animation — it never gates `onActivate`,
 *   which fires immediately on click/Enter/Space regardless of flip state.
 */
export function FlipCard({
  front,
  back,
  flipOn,
  onActivate,
  ariaLabel,
  className = "",
}: {
  front: ReactNode;
  back: ReactNode;
  flipOn: "click" | "hover";
  /** Fires immediately on click/Enter/Space, receiving the element that
   * triggered it (for focus-restore bookkeeping) — never gated by, or
   * waiting on, the flip animation. */
  onActivate?: (trigger: HTMLElement) => void;
  ariaLabel: string;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  function handleClick(trigger: HTMLElement) {
    if (flipOn === "click") setFlipped((v) => !v);
    onActivate?.(trigger);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick(event.currentTarget);
    }
  }

  return (
    <div
      className={`flip-card flip-card--${flipOn}${flipped ? " is-flipped" : ""} ${className}`}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).closest("a, button")) return;
        handleClick(event.currentTarget);
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="flip-card__inner">
        <div className="flip-card__face flip-card__face--front">{front}</div>
        <div className="flip-card__face flip-card__face--back">{back}</div>
      </div>
    </div>
  );
}
