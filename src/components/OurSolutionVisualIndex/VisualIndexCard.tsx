import type { CSSProperties } from "react";
import { getAdjustedBox, type VisualIndexBlock } from "./blocks";

type AccentStyle = CSSProperties & { "--vsi-accent": string };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function VisualIndexCard({
  block,
  cardId,
  isNarrow,
  onReadMore,
}: {
  block: VisualIndexBlock;
  cardId: string;
  isNarrow: boolean;
  onReadMore: () => void;
}) {
  const box = getAdjustedBox(block) ?? { l: 0.5, t: 0.4, w: 0, h: 0 };
  const cx = clamp((box.l + box.w / 2) * 100, 14, 78);
  const cy = clamp((box.t + box.h / 2) * 100, 10, 74);

  const style: AccentStyle = isNarrow
    ? { "--vsi-accent": block.accent }
    : { left: `${cx}%`, top: `${cy}%`, "--vsi-accent": block.accent };

  return (
    <div
      id={cardId}
      role="status"
      className={`vsi-card${isNarrow ? " vsi-card--sheet" : ""}`}
      style={style}
    >
      <div className="vsi-card__eyebrow-row">
        <span className="vsi-card__dot" />
        <span className="vsi-card__eyebrow">
          {block.order} · {block.title}
        </span>
      </div>
      <p className="vsi-card__desc">{block.description}</p>
      <button type="button" className="vsi-card__cta" onClick={onReadMore}>
        Read more →
      </button>
    </div>
  );
}
