import type { CSSVarStyle } from "../../components/LabFolders/types";
import "./SelectionFunnel.css";

export interface FunnelStep {
  label: string;
  value: number | string;
}

/**
 * The candidate-enzyme selection funnel (Enzyme production block) — a real
 * component instead of the source's own static screenshot, so the numbers
 * stay legible at any width instead of shrinking as a raster image. Colours
 * are five color-mix steps of this block's own --folder-accent (like the
 * folder tabs' own shadeFor gradient), not the source image's unrelated
 * navy-to-green palette, so the funnel reads as part of this page rather
 * than a pasted-in screenshot.
 */
export function SelectionFunnel({ steps }: { steps: FunnelStep[] }) {
  return (
    <div className="selection-funnel">
      {steps.map((step, index) => {
        const mix = 20 + (80 * index) / Math.max(steps.length - 1, 1);
        const style: CSSVarStyle = { "--funnel-mix": `${mix}%` };
        return (
          <div className="selection-funnel__step" style={style} key={step.label}>
            <span className="selection-funnel__label">{step.label}</span>
            <span className="selection-funnel__value">{step.value}</span>
          </div>
        );
      })}
    </div>
  );
}
