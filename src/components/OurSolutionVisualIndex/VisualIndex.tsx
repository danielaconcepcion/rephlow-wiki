import type { CSSProperties } from "react";
import { RAW_BLOCKS, LAYER_Z, getAdjustedBox, type VisualIndexBlock } from "./blocks";
import { VisualIndexLabel } from "./VisualIndexLabel";
import { VisualIndexCard } from "./VisualIndexCard";
import { useVisualIndex } from "./useVisualIndex";
import { asset } from "../../utils/asset";
import "./VisualIndex.css";

type AccentStyle = CSSProperties & { "--vsi-accent": string };

function cardIdFor(block: VisualIndexBlock) {
  return `vsi-card-${block.id}`;
}

export function VisualIndex() {
  const {
    activeId,
    isNarrow,
    containerRef,
    onEnter,
    onLeaveIllustration,
    onFocus,
    onBlur,
    handleBlockClick,
  } = useVisualIndex();

  const activeBlock = RAW_BLOCKS.find((b) => b.id === activeId) ?? null;
  const layerBlocks = RAW_BLOCKS.filter((b) => b.box);

  return (
    <div className="vsi">
      <div
        ref={containerRef}
        className={`vsi-illustration${activeId ? " is-active" : ""}${isNarrow ? " is-narrow" : ""}`}
        onMouseLeave={onLeaveIllustration}
      >
        <img
          className="vsi-base-img"
          src={asset("assets/our-solution/esquema-fondo-blanco.webp")}
          alt="RePhlow system diagram: wastewater enters a bioreactor of alginate-encapsulated bacteria, passes through a filtration module, and recovered phosphate is revalorised into higher-value compounds."
        />

        {layerBlocks.map((block) => {
          const box = getAdjustedBox(block)!;
          const isActive = activeId === block.id;
          const style: AccentStyle = {
            left: `${box.l * 100}%`,
            top: `${box.t * 100}%`,
            width: `${box.w * 100}%`,
            height: `${box.h * 100}%`,
            zIndex: LAYER_Z[block.id],
            "--vsi-accent": block.accent,
          };
          return (
            <img
              key={block.id}
              src={block.overlayImage}
              alt=""
              className={`vsi-layer${isActive ? " is-active" : ""}${
                isActive && block.suppressActiveLift ? " no-lift" : ""
              }`}
              style={style}
            />
          );
        })}

        {layerBlocks.map((block) => {
          const box = getAdjustedBox(block)!;
          const style: CSSProperties = {
            left: `${box.l * 100}%`,
            top: `${box.t * 100}%`,
            width: `${box.w * 100}%`,
            height: `${box.h * 100}%`,
            zIndex: (LAYER_Z[block.id] ?? 20) + 1,
          };
          return (
            <button
              key={block.id}
              type="button"
              className="vsi-hitbox"
              aria-label={`${block.title} — jump to full section`}
              aria-describedby={cardIdFor(block)}
              style={style}
              onMouseEnter={() => onEnter(block.id)}
              onFocus={() => onFocus(block.id)}
              onBlur={() => onBlur(block.id)}
              onClick={() => handleBlockClick(block.id, block.sectionId)}
            />
          );
        })}

        {activeBlock && (
          <VisualIndexCard
            block={activeBlock}
            cardId={cardIdFor(activeBlock)}
            isNarrow={isNarrow}
            onReadMore={() => {
              window.location.hash = "#" + activeBlock.sectionId;
            }}
          />
        )}

        {RAW_BLOCKS.map((block) => (
          <VisualIndexLabel
            key={block.id}
            block={block}
            isActive={activeId === block.id}
            cardId={cardIdFor(block)}
            onEnter={() => onEnter(block.id)}
            onFocus={() => onFocus(block.id)}
            onBlur={() => onBlur(block.id)}
            onClick={() => handleBlockClick(block.id, block.sectionId)}
          />
        ))}
      </div>
    </div>
  );
}
