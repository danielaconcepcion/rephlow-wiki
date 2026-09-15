import { asset } from "../../utils/asset";

export type BlockId =
  | "hardware"
  | "encapsulation"
  | "enzyme"
  | "genetic"
  | "model"
  | "revalorisation";

/** Fractional box (of the illustration container) an overlay layer occupies at rest. */
export interface LayerBox {
  l: number;
  t: number;
  w: number;
  h: number;
}

/** Fine-tuning applied on top of `box`: [offsetX%, offsetY%, scale] relative to the box center. */
export type LayerAdjust = [number, number, number];

export interface VisualIndexBlock {
  id: BlockId;
  order: number;
  title: string;
  /** CSS color value (var(...) or literal hex) used for the accent dot, label, and card. */
  accent: string;
  /** asset() path for the transparent overlay PNG. Absent for "model" (label-only, no overlay). */
  overlayImage?: string;
  box?: LayerBox;
  adjust?: LayerAdjust;
  /**
   * Set true once visual verification shows the base illustration already
   * depicts this component in place, so an upward translateY on activation
   * would reveal a duplicate underneath. When true, the active state relies
   * on scale + the stronger drop-shadow alone, no lift.
   */
  suppressActiveLift?: boolean;
  /** Always-present floating label position, as a fraction (0-100) of the container. */
  labelPos: { left: number; top: number };
  description: string;
  sectionId: string;
}

/**
 * Starting values transcribed from the Claude Design mockup (box/adjust). These are
 * a first pass only — verify against the real base illustration at every breakpoint
 * and retune position/scale as needed; resting-state alignment is the priority, not
 * fidelity to these original numbers.
 */
export const RAW_BLOCKS: VisualIndexBlock[] = [
  {
    id: "hardware",
    order: 1,
    title: "Hardware",
    accent: "var(--phosphate)",
    overlayImage: asset("assets/our-solution/hardware-clean.webp"),
    box: { l: 0.3, t: 0.06, w: 0.37, h: 0.45 },
    adjust: [-2.9, -0.3, 0.98],
    labelPos: { left: 49, top: 5 },
    description:
      "A modular rotating-bed bioreactor and filtration system for scalable phosphate capture and recovery.",
    sectionId: "hardware",
  },
  {
    id: "encapsulation",
    order: 2,
    title: "Bacterial encapsulation",
    accent: "#1568a3",
    overlayImage: asset("assets/our-solution/bacteria-encapsulada.webp"),
    box: { l: 0.187, t: 0.555, w: 0.156, h: 0.3 },
    adjust: [-5.9, -3.7, 1.05],
    labelPos: { left: 5, top: 46 },
    description:
      "Alginate core-shell beads keep the engineered bacteria contained, viable and reusable inside the reactor.",
    sectionId: "encapsulation",
  },
  {
    id: "enzyme",
    order: 3,
    title: "Enzyme immobilisation",
    accent: "var(--microbe)",
    overlayImage: asset("assets/our-solution/enzima-clean.webp"),
    box: { l: 0.21, t: 0.636, w: 0.3, h: 0.288 },
    adjust: [-8.28, -10, 1.21],
    labelPos: { left: 25, top: 82 },
    description:
      "Immobilised phosphatases hydrolyse organic phosphate compounds, making phosphate available for capture.",
    sectionId: "enzyme",
  },
  {
    id: "genetic",
    order: 4,
    title: "Genetic engineering",
    accent: "var(--algae)",
    overlayImage: asset("assets/our-solution/bacteria-genetic.webp"),
    box: { l: 0.174, t: 0.635, w: 0.0723, h: 0.15 },
    adjust: [-0.1, -3.3, 1.87],
    labelPos: { left: 4, top: 74 },
    description:
      "Engineered P. putida KT2440 increases phosphate uptake and stores it intracellularly as polyphosphate.",
    sectionId: "genetic",
  },
  {
    id: "model",
    order: 5,
    title: "Model",
    accent: "var(--ink-soft)",
    labelPos: { left: 87, top: 92 },
    description:
      "Genome-scale and kinetic models guide genetic edits, operating conditions and phosphate-accumulation performance.",
    sectionId: "model",
  },
  {
    id: "revalorisation",
    order: 6,
    title: "Revalorisation",
    accent: "#c99a06",
    overlayImage: asset("assets/our-solution/revalorizacion-clean.webp"),
    box: { l: 0.49, t: 0.444, w: 0.49, h: 0.352 },
    adjust: [0.3, -2.4, 0.975],
    labelPos: { left: 64, top: 45 },
    description:
      "Recovered phosphate is fed into a multi-enzyme cascade to produce higher-value compounds.",
    sectionId: "revalorisation",
  },
];

/** Adjusted box after applying `adjust` on top of `box` (center-relative offset + scale). */
export function getAdjustedBox(block: VisualIndexBlock): LayerBox | undefined {
  if (!block.box) return undefined;
  if (!block.adjust) return block.box;
  const [offX, offY, scale] = block.adjust;
  const { l, t, w, h } = block.box;
  const cx = l + w / 2;
  const cy = t + h / 2;
  const w2 = w * scale;
  const h2 = h * scale;
  return {
    l: cx - w2 / 2 + offX / 100,
    t: cy - h2 / 2 + offY / 100,
    w: w2,
    h: h2,
  };
}

/**
 * z-index per block, derived by sorting blocks that have a box by area (w*h)
 * descending — larger overlays sit behind smaller ones. "model" has no box and
 * is excluded (it never renders a layer or hitbox).
 */
export const LAYER_Z: Partial<Record<BlockId, number>> = (() => {
  const withArea = RAW_BLOCKS.filter((b) => b.box)
    .map((b) => ({ id: b.id, area: b.box!.w * b.box!.h }))
    .sort((a, b) => b.area - a.area);
  const z: Partial<Record<BlockId, number>> = {};
  withArea.forEach((b, i) => {
    z[b.id] = 20 + i * 10;
  });
  return z;
})();
