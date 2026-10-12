import { Fragment, useContext } from "react";
import type { ReactNode } from "react";

import { CitationScope } from "./citationScope";

/**
 * Inline markup for the Results data files, which hold their prose as
 * plain strings. Three marks, written the way the team's Notion pages
 * already write them so a paragraph can be pasted across unchanged:
 *
 *   **bold**   → <strong>
 *   *italic*   → <em>  (species and gene names)
 *   [3], [1, 2], [4–6] → links to that block's reference list
 *
 * Whitespace inside a mark ("**iGEM teams **") is moved outside it, so a
 * bold run never swallows the space before the next word. A citation only
 * becomes a link when the block has a reference list to point at (see
 * CitationScope); otherwise it is left as the plain text it is.
 */

const TOKEN = /(\*\*[^*]+?\*\*|\*(?!\s)[^*]+?\*|\[\d+(?:\s*[,–-]\s*\d+)*\])/g;

function Citation({ raw }: { raw: string }) {
  const scope = useContext(CitationScope);
  if (!scope) return <>{raw}</>;
  // Link every number in the group to its own entry: "[1, 2]" → [1, 2].
  const inner = raw.slice(1, -1);
  const parts = inner.split(/(\s*[,–-]\s*)/);
  return (
    <span className="lab-citation-group">
      [
      {parts.map((part, index) =>
        /^\d+$/.test(part) ? (
          <a
            key={index}
            href={`#ref-${scope}-${part}`}
            className="lab-citation"
          >
            {part}
          </a>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
      ]
    </span>
  );
}

/** Wrap `inner` in `Tag`, keeping any leading/trailing spaces outside. */
function mark(
  content: string,
  wrap: (text: ReactNode) => ReactNode,
): ReactNode {
  const lead = content.match(/^\s*/)?.[0] ?? "";
  const trail = content.match(/\s*$/)?.[0] ?? "";
  const core = content.slice(lead.length, content.length - trail.length);
  return (
    <>
      {lead}
      {wrap(parse(core))}
      {trail}
    </>
  );
}

function parse(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const token = match[0];
    const at = match.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (token.startsWith("**")) {
      out.push(mark(token.slice(2, -2), (inner) => <strong>{inner}</strong>));
    } else if (token.startsWith("*")) {
      out.push(mark(token.slice(1, -1), (inner) => <em>{inner}</em>));
    } else {
      out.push(<Citation raw={token} />);
    }
    last = at + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.map((node, index) => <Fragment key={index}>{node}</Fragment>);
}

/** Render a data string with its inline marks; any other node passes through. */
export function Rich({ text }: { text: ReactNode }) {
  if (typeof text !== "string") return <>{text}</>;
  return <>{parse(text)}</>;
}
