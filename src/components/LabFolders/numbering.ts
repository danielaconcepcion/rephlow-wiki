import { createContext } from "react";
import type { ResultData, ResultSubBlock } from "./types";

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
