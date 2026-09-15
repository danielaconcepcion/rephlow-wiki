import type { ExperimentBlockData } from "../../components/LabFolders/types";
import { ALGINATE_ENCAPSULATION_INTRO, ALGINATE_ENCAPSULATION_SUBBLOCKS } from "./EncapsulationData";
import {
  GENETIC_ENGINEERING_INTRO,
  GENETIC_ENGINEERING_REFERENCES,
  GENETIC_ENGINEERING_SUBBLOCKS,
} from "./GeneticEngineeringData";
import {
  ENZYMATIC_IMMOBILISATION_INTRO,
  ENZYMATIC_IMMOBILISATION_REFERENCES,
  ENZYMATIC_IMMOBILISATION_SUBBLOCKS,
} from "./EnzymaticImmobilisationData";

/**
 * Placeholder experiment records — structure only, ready to be replaced
 * with real materials, steps, and results. See
 * src/components/LabFolders/types.ts for the full field reference.
 *
 * These are the 4 official experiment blocks (matching the project's own
 * modules — see ProjectDescription's visual index). "Alginate encapsulation",
 * "Genetic engineering" and "Enzymatic immobilisation" are real content
 * (see EncapsulationData.tsx, GeneticEngineeringData.tsx and
 * EnzymaticImmobilisationData.tsx), each organised into the source's own
 * labelled sub-blocks rather than a flat experiment list. Revalorisation is
 * still placeholder structure.
 */
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

function step(n: number) {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder step ${n} text.`;
}

export const EXPERIMENT_BLOCKS: ExperimentBlockData[] = [
  {
    id: "encapsulation",
    label: "Alginate encapsulation",
    accent: "var(--lab-encapsulation)",
    protocolsPdfSrc: "assets/protocols/encapsulation-protocols.pdf",
    intro: ALGINATE_ENCAPSULATION_INTRO,
    subBlocks: ALGINATE_ENCAPSULATION_SUBBLOCKS,
  },
  {
    id: "enzymatic-immobilisation",
    label: "Enzymatic immobilisation",
    accent: "var(--lab-enzyme)",
    protocolsPdfSrc: "assets/protocols/enzymatic-immobilisation-protocols.pdf",
    intro: ENZYMATIC_IMMOBILISATION_INTRO,
    subBlocks: ENZYMATIC_IMMOBILISATION_SUBBLOCKS,
    references: ENZYMATIC_IMMOBILISATION_REFERENCES,
  },
  {
    id: "genetic-engineering",
    label: "Genetic engineering",
    accent: "var(--lab-genetic)",
    protocolsPdfSrc: "assets/protocols/genetic-engineering-protocols.pdf",
    intro: GENETIC_ENGINEERING_INTRO,
    subBlocks: GENETIC_ENGINEERING_SUBBLOCKS,
    references: GENETIC_ENGINEERING_REFERENCES,
  },
  {
    id: "revalorisation",
    label: "Revalorisation",
    accent: "var(--lab-revalorisation)",
    protocolsPdfSrc: "assets/protocols/revalorisation-protocols.pdf",
    experiments: [
      {
        id: "experiment-1",
        tabLabel: "Experiment 1",
        title: "Experiment 1",
        description: LOREM,
        materialsTable: [{ item: "Reagent A", quantity: "Add qty" }],
        protocol: [{ text: step(1) }, { text: step(2) }, { text: step(3) }],
        notes: [{ kind: "note", text: LOREM }],
        pdfHref: "assets/protocols/revalorisation-experiment-1.pdf",
      },
      {
        id: "experiment-2",
        tabLabel: "Experiment 2",
        title: "Experiment 2",
        description: LOREM,
        materialsList: ["Lorem ipsum material 1.", "Lorem ipsum material 2.", "Lorem ipsum material 3."],
        protocol: [{ text: step(1) }, { text: step(2) }],
        references: ["Lorem ipsum reference, 2024."],
        figure: {
          src: "assets/experiments/revalorisation-experiment-2-placeholder.png",
          caption: "Placeholder figure caption.",
        },
        pdfHref: "assets/protocols/revalorisation-experiment-2.pdf",
      },
    ],
  },
];
