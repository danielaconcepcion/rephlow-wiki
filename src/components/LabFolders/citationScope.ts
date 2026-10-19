import { createContext } from "react";

/** The id of the block whose reference list an inline "[n]" should jump to,
 * matching ReferenceItem's `ref-${scope}-${n}` anchors. Null means the block
 * has no list, so "[n]" is left as the plain text it is. Kept in its own
 * module so RichText.tsx exports components only (react-refresh). */
export const CitationScope = createContext<string | null>(null);
