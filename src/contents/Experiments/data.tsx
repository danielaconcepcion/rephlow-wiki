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
import { REVALORISATION_INTRO, REVALORISATION_REFERENCES, REVALORISATION_SUBBLOCKS } from "./RevalorisationData";

/**
 * The 4 official experiment blocks (matching the project's own modules —
 * see ProjectDescription's visual index). All four are real content (see
 * EncapsulationData.tsx, GeneticEngineeringData.tsx,
 * EnzymaticImmobilisationData.tsx and RevalorisationData.tsx), each
 * organised into the source's own labelled sub-blocks rather than a flat
 * experiment list. See src/components/LabFolders/types.ts for the full
 * field reference.
 */
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
    // Text accent (links/citations) in the mostaza palette's deep shade —
    // the folder decks themselves take the full palette via `palette`.
    accent: "#b8790a",
    palette: "mostaza",
    protocolsPdfSrc: "assets/protocols/revalorisation-protocols.pdf",
    intro: REVALORISATION_INTRO,
    subBlocks: REVALORISATION_SUBBLOCKS,
    references: REVALORISATION_REFERENCES,
  },
];
