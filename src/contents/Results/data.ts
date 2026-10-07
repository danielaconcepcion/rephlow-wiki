import type { ResultBlockData } from "../../components/LabFolders/types";
import { ENCAPSULATION_INTRO, ENCAPSULATION_SUBBLOCKS } from "./EncapsulationData";
import {
  ENZYMATIC_IMMOBILISATION_INTRO,
  ENZYMATIC_IMMOBILISATION_SUBBLOCKS,
} from "./EnzymaticImmobilisationData";
import {
  GENETIC_ENGINEERING_INTRO,
  GENETIC_ENGINEERING_SUBBLOCKS,
} from "./GeneticEngineeringData";
import { REVALORISATION_INTRO, REVALORISATION_SUBBLOCKS } from "./RevalorisationData";

/**
 * The Results page's four blocks, matching EXPERIMENT_BLOCKS one-for-one in
 * id, label and accent so that both pages share the same glass-sphere index
 * and the same block reads the same colour on either page (see
 * labBlockSpheres.ts). One data file per block, as on Experiments.
 *
 * Content comes from the team's own four Notion results pages, under WIKI /
 * Results, each of which reports the outcome of the corresponding
 * experiment on the Experiments page and answers the same three questions:
 * what was obtained, what it means, and whether it matched what we
 * expected. Where a source entry still reads [XXX], the record is marked
 * `pending` instead of being written around or quietly dropped.
 */
export const RESULT_BLOCKS: ResultBlockData[] = [
  {
    id: "encapsulation",
    label: "Alginate encapsulation",
    accent: "var(--lab-encapsulation)",
    intro: ENCAPSULATION_INTRO,
    subBlocks: ENCAPSULATION_SUBBLOCKS,
  },
  {
    id: "enzymatic-immobilisation",
    label: "Enzymatic immobilisation",
    accent: "var(--lab-enzyme)",
    intro: ENZYMATIC_IMMOBILISATION_INTRO,
    subBlocks: ENZYMATIC_IMMOBILISATION_SUBBLOCKS,
  },
  {
    id: "genetic-engineering",
    label: "Genetic engineering",
    accent: "var(--lab-genetic)",
    intro: GENETIC_ENGINEERING_INTRO,
    subBlocks: GENETIC_ENGINEERING_SUBBLOCKS,
  },
  {
    id: "revalorisation",
    label: "Revalorisation",
    // Text accent in the mostaza palette's deep shade; the folder decks
    // take the full palette via `palette`, as on Experiments.
    accent: "#b8790a",
    palette: "mostaza",
    intro: REVALORISATION_INTRO,
    subBlocks: REVALORISATION_SUBBLOCKS,
  },
];
