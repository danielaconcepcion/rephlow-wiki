import { Fragment, useContext } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { CitationScope } from "./citationScope";

/**
 * Inline markup for the Results data files, which hold their prose as
 * plain strings. Three marks, written the way the team's Notion pages
 * already write them so a paragraph can be pasted across unchanged:
 *
 *   **bold**   → <strong>
 *   *italic*   → <em>  (species and gene names)
 *   ***both***  → the two nested, as Notion writes a species name inside
 *                 a bold run ("**… from *Burkholderia cenocepacia***")
 *   \*         → a literal asterisk (a footnote marker, not a mark)
 *   [3], [1, 2], [4–6] → links to that block's reference list
 *   [text](/engineering) → a cross-reference to another page of the
 *                 wiki, which is what the sources mark by underlining in
 *                 blue. A path routes in-app; a full URL opens outside.
 *
 * A run of asterisks toggles the marks it carries rather than being
 * matched as a pair, which is what makes the nested case above come out
 * as emphasis instead of leaving a stray asterisk on the page. A citation
 * only becomes a link when the block has a reference list to point at
 * (see CitationScope); otherwise it is left as the plain text it is.
 */

const TOKEN =
  /(\\\*|\*{1,3}|\[[^\]|]+\]\([^)\s]+\)|\[\d+(?:\s*[,–-]\s*\d+)*\])/g;

/** A cross-reference written as a Markdown link. An in-site path goes
 * through the router so the page does not reload; anything else is an
 * ordinary external link. */
function CrossLink({ raw }: { raw: string }) {
  const split = raw.indexOf("](");
  const label = raw.slice(1, split);
  const href = raw.slice(split + 2, -1);
  if (href.startsWith("/")) {
    return (
      <Link className="lab-link" to={href}>
        {label}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a className="lab-link" href={href}>
        {label}
      </a>
    );
  }
  return (
    <a className="lab-link" href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

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

function parse(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let bold = false;
  let italic = false;

  /** Wraps a node in whichever marks are open where it appeared. */
  function marked(node: ReactNode): ReactNode {
    let wrapped = node;
    if (italic) wrapped = <em>{wrapped}</em>;
    if (bold) wrapped = <strong>{wrapped}</strong>;
    return wrapped;
  }

  for (const match of text.matchAll(TOKEN)) {
    const token = match[0];
    const at = match.index ?? 0;
    if (at > last) out.push(marked(text.slice(last, at)));
    if (token === "\\*") {
      // An escaped asterisk: a literal one, not markup.
      out.push(marked("*"));
    } else if (token.startsWith("*")) {
      // A run of asterisks toggles the marks it carries: one is italic,
      // two are bold, three are both. Written this way rather than as
      // matched pairs because the team's pages set a species name inside
      // a bold sentence, which closes as `*...***` and leaves a stray
      // asterisk on screen for any pair-matching reader.
      if (token.length !== 2) italic = !italic;
      if (token.length !== 1) bold = !bold;
    } else if (token.includes("](")) {
      out.push(marked(<CrossLink raw={token} />));
    } else {
      out.push(marked(<Citation raw={token} />));
    }
    last = at + token.length;
  }
  if (last < text.length) out.push(marked(text.slice(last)));
  return out.map((node, index) => <Fragment key={index}>{node}</Fragment>);
}

/** Render a data string with its inline marks; any other node passes through. */
export function Rich({ text }: { text: ReactNode }) {
  if (typeof text !== "string") return <>{text}</>;
  return <>{parse(text)}</>;
}
