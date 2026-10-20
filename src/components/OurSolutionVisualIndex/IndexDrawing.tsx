import { RAW_BLOCKS, getAdjustedBox } from "./blocks";
import { asset } from "../../utils/asset";

/** The Our Solution drawing exactly as the visual index shows it at rest:
 * the base illustration with every layer in place, without the interaction.
 * Positioned children (e.g. hotspots) use the same percentages as the index. */
export function IndexDrawing({ alt }: { alt: string }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "2360 / 1640" }}>
      <img
        src={asset("assets/our-solution/esquema-fondo-blanco.webp")}
        alt={alt}
        style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
      />
      {RAW_BLOCKS.filter((b) => b.box && b.overlayImage).map((b) => {
        const box = getAdjustedBox(b)!;
        return (
          <img
            key={b.id}
            src={b.overlayImage}
            alt=""
            style={{
              position: "absolute",
              left: `${box.l * 100}%`,
              top: `${box.t * 100}%`,
              width: `${box.w * 100}%`,
              height: `${box.h * 100}%`,
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}
