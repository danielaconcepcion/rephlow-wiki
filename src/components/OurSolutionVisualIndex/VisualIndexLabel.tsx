import type { CSSProperties } from "react";
import type { VisualIndexBlock } from "./blocks";

type AccentStyle = CSSProperties & { "--vsi-accent": string };

export function VisualIndexLabel({
  block,
  isActive,
  cardId,
  onEnter,
  onFocus,
  onBlur,
  onClick,
}: {
  block: VisualIndexBlock;
  isActive: boolean;
  cardId: string;
  onEnter: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
}) {
  const style: AccentStyle = {
    left: `${block.labelPos.left}%`,
    top: `${block.labelPos.top}%`,
    "--vsi-accent": block.accent,
  };

  return (
    <button
      type="button"
      className={`vsi-label${isActive ? " is-active" : ""}`}
      style={style}
      aria-label={block.title}
      aria-describedby={cardId}
      aria-pressed={isActive}
      onMouseEnter={onEnter}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
    >
      <span className="vsi-label__badge">{block.order}</span>
      <span className="vsi-label__title">{block.title}</span>
    </button>
  );
}
