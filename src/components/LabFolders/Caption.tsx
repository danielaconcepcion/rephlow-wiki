import { useContext } from "react";
import type { ReactNode } from "react";

import { NumberingContext } from "./numbering";
import { Rich } from "./RichText";

/**
 * "Figure 3." / "Table 2." ahead of a caption, when the block numbered
 * the thing it belongs to (see numbering.ts). Shared by both card kinds,
 * so a figure is numbered the same way on Experiments and on Results.
 */
export function Caption({
  kind,
  item,
  text,
}: {
  kind: "Figure" | "Table";
  item: object;
  text?: ReactNode;
}): ReactNode {
  const number = useContext(NumberingContext).get(item);
  if (!text && number === undefined) return null;
  return (
    <>
      {number !== undefined && (
        <strong className="record-caption__label">
          {kind} {number}.
        </strong>
      )}
      {number !== undefined && text ? " " : null}
      {text !== undefined && text !== null && <Rich text={text} />}
    </>
  );
}
