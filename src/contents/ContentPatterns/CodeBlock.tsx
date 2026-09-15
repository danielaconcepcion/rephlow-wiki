import { Fragment } from "react";
import "./CodeBlock.css";

/**
 * Inline code — a plain, quiet monospace chip. No component needed; use
 * the bare `<code className="code-inline">` markup directly (see
 * ContentPatterns.tsx's "Text" section for an example) rather than
 * wrapping every occurrence in a component for a single class name.
 */

type Lang = "python" | "typescript" | "bash";

const KEYWORDS: Record<Lang, string[]> = {
  python: [
    "def", "return", "if", "elif", "else", "for", "in", "import", "from",
    "class", "with", "as", "None", "True", "False", "and", "or", "not",
  ],
  typescript: [
    "const", "let", "function", "return", "if", "else", "for", "of",
    "import", "from", "export", "interface", "type", "new", "async",
    "await", "true", "false", "null",
  ],
  bash: ["cd", "npm", "run", "export", "if", "then", "fi", "echo"],
};

// A small, hand-rolled tokenizer — not a general-purpose grammar, just
// enough to colour the handful of token classes this demo snippet uses
// (comment / string / number / keyword / call). Good enough for a short,
// hand-picked example; a real multi-language corpus would want a proper
// lexer or a library instead.
const TOKEN_PATTERN =
  /(#.*$|\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_][\w]*\b)(?=\()|(\b[A-Za-z_][\w]*\b)/gm;

function highlight(code: string, lang: Lang) {
  const keywords = new Set(KEYWORDS[lang]);
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  TOKEN_PATTERN.lastIndex = 0;
  while ((match = TOKEN_PATTERN.exec(code))) {
    if (match.index > last) nodes.push(code.slice(last, match.index));
    const [full, comment, string, number, call, word] = match;
    if (comment) {
      nodes.push(
        <span className="code-tok code-tok--comment" key={key++}>
          {comment}
        </span>,
      );
    } else if (string) {
      nodes.push(
        <span className="code-tok code-tok--string" key={key++}>
          {string}
        </span>,
      );
    } else if (number) {
      nodes.push(
        <span className="code-tok code-tok--number" key={key++}>
          {number}
        </span>,
      );
    } else if (call) {
      nodes.push(
        <span className="code-tok code-tok--call" key={key++}>
          {call}
        </span>,
      );
    } else if (word && keywords.has(word)) {
      nodes.push(
        <span className="code-tok code-tok--keyword" key={key++}>
          {word}
        </span>,
      );
    } else {
      nodes.push(full);
    }
    last = match.index + full.length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  return nodes;
}

/**
 * Syntax-highlighted code block — a lightweight, hand-rolled tokenizer
 * (see above), not a highlighting library, since the wiki only ever needs
 * to show a handful of short, hand-picked snippets rather than arbitrary
 * source files. Styled as its own dark card (see CodeBlock.css) using the
 * palette's darkest existing tone (--eutrophic-deep) rather than a new
 * colour, so a code block reads as "the wiki, in its most concentrated
 * register" instead of a foreign, imported widget.
 */
export function CodeBlock({
  code,
  lang,
  filename,
}: {
  code: string;
  lang: Lang;
  filename?: string;
}) {
  const lines = code.replace(/\n$/, "").split("\n");
  return (
    <div className="code-block">
      {filename && (
        <div className="code-block__bar">
          <span className="code-block__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="code-block__filename">{filename}</span>
        </div>
      )}
      <pre className="code-block__pre">
        <code>
          {lines.map((line, i) => (
            <Fragment key={i}>
              <span className="code-block__line">{highlight(line, lang)}</span>
              {i < lines.length - 1 && "\n"}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  );
}
