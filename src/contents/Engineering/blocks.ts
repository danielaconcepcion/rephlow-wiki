/**
 * What each Engineering block is made of: its intro, and the one or more
 * DBTL threads it runs. Every block is described the same way here, so
 * Engineering.tsx can render a block with five threads (Revalorisation)
 * exactly as it renders one with a single spiral — and so the content
 * itself stays in the per-block data files, transcribed from the team's
 * own write-ups.
 *
 * A thread's palette is a slice of its block's own scale (see
 * slicePalette in DbtlCycle.tsx), so a second or third thread continues
 * the gradient where the previous one left off instead of restarting it.
 */

import { slicePalette, type DbtlPalette } from "./DbtlCycle";
import type { Iteration } from "./dbtlData";
import { BACTERIAL_ENCAPSULATION_ITERATIONS } from "./BacterialEncapsulationData";
import {
  ENZYME_PRODUCTION_ITERATIONS,
  IMMOBILISATION_CHEMISTRY_ITERATIONS,
} from "./EnzymaticImmobilisationData";
import {
  CLONING_ITERATIONS,
  CRISPR_ITERATIONS,
} from "./GeneticEngineeringData";
import {
  REVALORISATION_COUPLING,
  REVALORISATION_MODELLING,
  REVALORISATION_PROSS,
  REVALORISATION_PURIFICATION,
  REVALORISATION_WILD_TYPE,
} from "./RevalorisationData";

export interface BlockThread {
  key: string;
  /** Shown above the thread's spiral, and in the side nav. A block with
   * a single thread has none — there is nothing to tell apart. */
  heading?: string;
  palette: DbtlPalette;
  iterations: Iteration[];
}

export interface EngineeringBlock {
  /** The block's own opening paragraph, from its write-up. */
  intro?: string;
  /** Whether the block's threads share one running iteration count
   * (Genetic engineering: Cloning 1-5 then CRISPR 6-8; Revalorisation:
   * 1-12 across its five lines of work) or each restart at 1 (Enzymatic
   * immobilisation, whose two threads are deliberately numbered
   * independently -- see its own write-up). Irrelevant to a block with a
   * single thread, which is 1-based either way. Engineering.tsx turns this
   * into the per-thread `numberFrom` it hands to each DbtlCycle and nav
   * group; it changes the label only, never the 0-based index the spiral
   * itself works in. */
  continuousNumbering?: boolean;
  threads: BlockThread[];
}

// One hue range per block, matching its sphere in the ecosystem map
// above. Bacterial encapsulation keeps the original teal → --microbe
// purple scale exactly; the others stay within their own section's
// accent hue instead of sweeping across an unrelated stretch of the hue
// wheel.
export const ENGINEERING_PALETTES: Record<string, DbtlPalette> = {
  "genetic-engineering": {
    hFrom: 122,
    hTo: 138,
    sFrom: 34,
    sTo: 46,
    lFrom: 38,
    lTo: 48,
  },
  "bacterial-encapsulation": {
    hFrom: 182,
    hTo: 257,
    sFrom: 46,
    sTo: 27,
    lFrom: 37,
    lTo: 47,
  },
  "enzymatic-immobilisation": {
    hFrom: 255,
    hTo: 271,
    sFrom: 34,
    sTo: 46,
    lFrom: 42,
    lTo: 52,
  },
  revalorisation: {
    hFrom: 38,
    hTo: 50,
    sFrom: 60,
    sTo: 72,
    lFrom: 42,
    lTo: 52,
  },
};

/** Cuts a block's scale into `count` consecutive slices, one per thread,
 * with a small gap between them so each thread still reads as its own
 * run of colour. */
function threadPalettes(base: DbtlPalette, count: number): DbtlPalette[] {
  if (count === 1) return [base];
  const step = 1 / count;
  return Array.from({ length: count }, (_, i) =>
    slicePalette(base, i * step, (i + 1) * step - step * 0.25),
  );
}

function threads(
  blockId: string,
  entries: { key: string; heading?: string; iterations: Iteration[] }[],
): BlockThread[] {
  const palettes = threadPalettes(
    ENGINEERING_PALETTES[blockId],
    entries.length,
  );
  return entries.map((entry, i) => ({ ...entry, palette: palettes[i] }));
}

export const ENGINEERING_BLOCKS: Record<string, EngineeringBlock> = {
  "genetic-engineering": {
    continuousNumbering: true,
    threads: threads("genetic-engineering", [
      { key: "cloning", heading: "Cloning", iterations: CLONING_ITERATIONS },
      { key: "crispr", heading: "CRISPR", iterations: CRISPR_ITERATIONS },
    ]),
  },
  "bacterial-encapsulation": {
    intro:
      "Unlike the biological side of the project, where the engineering question was what to build, here it was how much of the system had to be pinned down before the next decision could be made. Each variable was varied until it either proved to matter or demonstrably did not, and only the ones that mattered were carried into the next iteration. Conventional beads came first, as the simplest format in which alginate concentration, drop height, flow rate and crosslinking time could be separated from one another, and the resulting protocol became the baseline for the coaxial system. Translating it to a core-shell architecture was not a matter of scaling up: with two liquid phases meeting at the injector, the composition window had to be found again from scratch, and the measurement we had planned to select the flow-rate ratio turned out to be too variable to decide anything, so the choice was made on mechanical resistance instead. The last iterations were about confronting the capsules with what the bioreactor would actually ask of them, and the clearest lesson came from where they did not hold: the capsule shell retains the particles embedded in it and the capsules withstand handling, but we have not yet found a way to raise the pH of the wastewater that the alginate network can tolerate.",
    threads: threads("bacterial-encapsulation", [
      {
        key: "bacterial-encapsulation",
        iterations: BACTERIAL_ENCAPSULATION_ITERATIONS,
      },
    ]),
  },
  "enzymatic-immobilisation": {
    intro:
      "The engineering of this block followed a design, build, test and learn iteration across two coupled fronts. The first was to decide which phosphohydrolases to make and then to produce them in *E. coli* in soluble, active form. The second was to work out a chemistry that fixes those enzymes onto a support without destroying the very activity we needed. The two fronts are threaded: the enzymes had to exist before they could be immobilised, but the immobilisation chemistry could not wait for the full panel to be produced, so a model enzyme was used to develop it in parallel. Throughout, the useful engineering signal was rarely the first result of an experiment. It was how the question we were actually asking changed as each result came in.",
    threads: threads("enzymatic-immobilisation", [
      {
        key: "production",
        heading: "Enzyme production",
        iterations: ENZYME_PRODUCTION_ITERATIONS,
      },
      {
        key: "chemistry",
        heading: "Immobilisation chemistry",
        iterations: IMMOBILISATION_CHEMISTRY_ITERATIONS,
      },
    ]),
  },
  revalorisation: {
    continuousNumbering: true,
    intro:
      "The engineering of this block followed a design, build, test and learn cycle around a single goal: to turn the polyphosphate our bacteria accumulate into something of potential value, closing the cycle rather than leaving polyphosphate as a dead end, using commercial polyphosphate here so that the biochemistry could be characterised independently of bead recovery. The open question was where to start and how. It narrowed over twelve iterations, grouped into five lines of work, and in a direction we had not planned: what began as a question about designing a better enzyme became, for most of the season, a question about obtaining a working one. The useful engineering signal was rarely the first result of an experiment. It was how the question we were actually asking changed as each result came in.",
    threads: threads("revalorisation", [
      {
        key: "wild-type",
        heading: "Choosing a wild-type reference",
        iterations: REVALORISATION_WILD_TYPE,
      },
      {
        key: "pross",
        heading: "Stabilising DHAK by computational design",
        iterations: REVALORISATION_PROSS,
      },
      {
        key: "purification",
        heading: "Getting pure, active enzyme",
        iterations: REVALORISATION_PURIFICATION,
      },
      {
        key: "coupling",
        heading: "Coupling the two enzymes, DHAK + PPK2",
        iterations: REVALORISATION_COUPLING,
      },
      {
        key: "modelling",
        heading: "Modelling the fusion",
        iterations: REVALORISATION_MODELLING,
      },
    ]),
  },
};