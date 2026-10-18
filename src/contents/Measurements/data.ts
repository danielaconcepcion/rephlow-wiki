import type { ExperimentData } from "../../components/LabFolders/types";
import {
  ENCAPSULATION_CHARACTERISATION,
  ENCAPSULATION_CONCLUSIONS,
  ENCAPSULATION_MEASUREMENTS,
  ENCAPSULATION_SUMMARY,
} from "./EncapsulationData";
import {
  ENZYMATIC_IMMOBILISATION_CHARACTERISATION,
  ENZYMATIC_IMMOBILISATION_CONCLUSIONS,
  ENZYMATIC_IMMOBILISATION_MEASUREMENTS,
  ENZYMATIC_IMMOBILISATION_SUMMARY,
} from "./EnzymaticImmobilisationData";
import {
  GENETIC_ENGINEERING_CHARACTERISATION,
  GENETIC_ENGINEERING_CONCLUSIONS,
  GENETIC_ENGINEERING_MEASUREMENTS,
  GENETIC_ENGINEERING_SUMMARY,
} from "./GeneticEngineeringData";
import {
  REVALORISATION_CHARACTERISATION,
  REVALORISATION_CONCLUSIONS,
  REVALORISATION_MEASUREMENTS,
  REVALORISATION_SUMMARY,
} from "./RevalorisationData";
import {
  ENCAPSULATION_INTRO,
  ENZYMATIC_IMMOBILISATION_INTRO,
  GENETIC_ENGINEERING_INTRO,
  REVALORISATION_INTRO,
} from "./pageProse";

/**
 * The same four wet-lab blocks as Experiments and Results, in the same
 * order, with the same accents and the same glass spheres — here each one
 * carries the techniques used to measure it rather than the experiments
 * themselves (see EXPERIMENT_BLOCKS in ../Experiments/data.tsx).
 *
 * A block reads: what it measures (`summary`), why these techniques and in
 * what order (`intro` and `characterisation`), one folder per technique,
 * and what the measurements established (`conclusions`).
 */
export interface MeasurementBlock {
  id: string;
  label: string;
  accent: string;
  palette?: "mostaza";
  /** One line naming what the block's measurements are about. */
  summary: string;
  intro: string[];
  characterisation: string[];
  measurements: ExperimentData[];
  conclusions: string[];
}

export const MEASUREMENT_BLOCKS: MeasurementBlock[] = [
  {
    id: "encapsulation",
    label: "Alginate encapsulation",
    accent: "var(--lab-encapsulation)",
    summary: ENCAPSULATION_SUMMARY,
    intro: ENCAPSULATION_INTRO,
    characterisation: ENCAPSULATION_CHARACTERISATION,
    measurements: ENCAPSULATION_MEASUREMENTS,
    conclusions: ENCAPSULATION_CONCLUSIONS,
  },
  {
    id: "enzymatic-immobilisation",
    label: "Enzymatic immobilisation",
    accent: "var(--lab-enzyme)",
    summary: ENZYMATIC_IMMOBILISATION_SUMMARY,
    intro: ENZYMATIC_IMMOBILISATION_INTRO,
    characterisation: ENZYMATIC_IMMOBILISATION_CHARACTERISATION,
    measurements: ENZYMATIC_IMMOBILISATION_MEASUREMENTS,
    conclusions: ENZYMATIC_IMMOBILISATION_CONCLUSIONS,
  },
  {
    id: "genetic-engineering",
    label: "Genetic engineering",
    accent: "var(--lab-genetic)",
    summary: GENETIC_ENGINEERING_SUMMARY,
    intro: GENETIC_ENGINEERING_INTRO,
    characterisation: GENETIC_ENGINEERING_CHARACTERISATION,
    measurements: GENETIC_ENGINEERING_MEASUREMENTS,
    conclusions: GENETIC_ENGINEERING_CONCLUSIONS,
  },
  {
    id: "revalorisation",
    label: "Revalorisation",
    // Text accent in the mostaza palette's deep shade, with the folder
    // deck taking the full palette — exactly as on the other two pages.
    accent: "#b8790a",
    palette: "mostaza",
    summary: REVALORISATION_SUMMARY,
    intro: REVALORISATION_INTRO,
    characterisation: REVALORISATION_CHARACTERISATION,
    measurements: REVALORISATION_MEASUREMENTS,
    conclusions: REVALORISATION_CONCLUSIONS,
  },
];
