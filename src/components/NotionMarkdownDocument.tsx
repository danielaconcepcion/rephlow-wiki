import { Fragment, type ReactNode } from "react";
import { asset } from "../utils/asset";
import "./NotionMarkdownDocument.css";

function inline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return tokens.filter(Boolean).map((token, index) => {
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>;
    if (token.startsWith("**") && token.endsWith("**")) return <strong key={index}>{token.slice(2, -2)}</strong>;
    if (token.startsWith("*") && token.endsWith("*")) return <em key={index}>{token.slice(1, -1)}</em>;
    if (token.startsWith("`") && token.endsWith("`")) return <code key={index}>{token.slice(1, -1)}</code>;
    return <Fragment key={index}>{token}</Fragment>;
  });
}

function cells(line: string) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

export function NotionMarkdownDocument({ source }: { source: string }) {
  const lines = source.replace(/\r/g, "").split("\n");
  const nodes: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i += 1; continue; }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      const next = lines[i + 1]?.trim() ?? "";
      const caption = /^\*.*\*$/.test(next) || /^\*\*Figure/.test(next) ? next.replace(/^\*+|\*+$/g, "") : "";
      nodes.push(<figure key={i}><img src={asset(image[2])} alt={image[1]} />{caption && <figcaption>{inline(caption)}</figcaption>}</figure>);
      i += caption ? 2 : 1;
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      const Tag = heading[1].length === 2 ? "h2" : heading[1].length === 3 ? "h3" : "h4";
      nodes.push(<Tag key={i}>{inline(heading[2].replace(/\*\*/g, ""))}</Tag>);
      i += 1;
      continue;
    }

    if (line.startsWith("|") && lines[i + 1]?.trim().match(/^\|?\s*:?-+/)) {
      const header = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(cells(lines[i++]));
      nodes.push(<div className="notion-md__table-wrap" key={`t${i}`}><table><thead><tr>{header.map((c, n) => <th key={n}>{inline(c)}</th>)}</tr></thead><tbody>{rows.map((row, r) => <tr key={r}>{row.map((c, n) => <td key={n}>{inline(c)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }

    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^-\s+/.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^-\s+/, ""));
      nodes.push(<ul key={`u${i}`}>{items.map((item, n) => <li key={n}>{inline(item)}</li>)}</ul>);
      continue;
    }

    const paragraph = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{2,4})\s|^!\[|^\||^-\s+/.test(lines[i].trim())) paragraph.push(lines[i++].trim());
    nodes.push(<p key={`p${i}`}>{inline(paragraph.join(" "))}</p>);
  }
  return <div className="notion-md">{nodes}</div>;
}
