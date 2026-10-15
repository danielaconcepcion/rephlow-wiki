import { createContext } from "react";
import type {
  ExperimentData,
  ExperimentSubBlock,
  ResultData,
  ResultSubBlock,
} from "./types";

/**
 * Figure and table numbers for one Results block, assigned in reading
 * order — sub-block by sub-block, record by record, and inside a record in
 * the order ResultCard renders it (custom visual, figures, figure matrix,
 * tables). Numbering restarts with each block, the way each of the team's
 * four Notion results pages numbers its own.
 *
 * Keyed by the data objects themselves, so a caption needs no number
 * written into it and the data files stay free to reorder records. A grid
 * that shares one caption (`figuresCaption`) is a single figure made of
 * panels, so it takes one number, not one per panel.
 */
export type Numbering = Map<object, number>;

export const NumberingContext = createContext<Numbering>(new Map());

export function numberResults(
  groups: (ResultSubBlock | { results?: ResultData[] })[],
): Numbering {
  const numbers: Numbering = new Map();
  let figure = 0;
  let table = 0;
  for (const group of groups) {
    for (const result of group.results ?? []) {
      for (const subsection of result.subsections) {
        if (subsection.custom?.caption)
          numbers.set(subsection.custom, ++figure);
        if (subsection.figures?.length) {
          if (subsection.figuresCaption) {
            numbers.set(subsection.figures, ++figure);
          } else {
            for (const item of subsection.figures) {
              if (item.caption) numbers.set(item, ++figure);
            }
          }
        }
        if (subsection.figureMatrix)
          numbers.set(subsection.figureMatrix, ++figure);
        for (const item of subsection.tables ?? []) numbers.set(item, ++table);
      }
    }
  }
  return numbers;
}

/**
 * The same, for one Experiments block. Walk order matches ExperimentCard:
 * each experiment's `body` blocks in order (a paired resource is a figure
 * or a table depending on its kind), then the plain `tables`, then the
 * single `figure`. A caption-less resource is skipped — an unnumbered
 * illustration is not a figure anyone cites.
 */
export function numberExperiments(
  groups: (ExperimentSubBlock | { experiments?: ExperimentData[] })[],
): Numbering {
  const numbers: Numbering = new Map();
  let figure = 0;
  let table = 0;
  for (const group of groups) {
    for (const experiment of group.experiments ?? []) {
      for (const block of experiment.body ?? []) {
        const resource = block.pairedResource;
        if (!resource) continue;
        if (
          resource.kind === "table" ||
          resource.kind === "table-placeholder"
        ) {
          numbers.set(resource, ++table);
        } else if (resource.kind !== "custom" || resource.caption) {
          numbers.set(resource, ++figure);
        }
      }
      for (const item of experiment.tables ?? []) numbers.set(item, ++table);
      if (experiment.figure) numbers.set(experiment.figure, ++figure);
    }
  }
  return numbers;
}
