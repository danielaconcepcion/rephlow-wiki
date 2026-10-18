import { Rich } from "./RichText";

/**
 * Renders the current editorial copy exported from Notion while leaving
 * tables, figures and downloads to the existing record components. The
 * import step removes those resource blocks, so this component only needs
 * to preserve paragraphs, inline emphasis and lists.
 */
export function EditorialText({
  blocks,
  className = "",
}: {
  blocks: string[];
  className?: string;
}) {
  const groups: Array<
    | { kind: "paragraph"; text: string }
    | { kind: "unordered" | "ordered"; items: string[] }
  > = [];

  for (const raw of blocks) {
    const lines = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (!lines.length) continue;
    const unordered = lines.every((line) => /^[-*]\s+/.test(line));
    const ordered = lines.every((line) => /^\d+[.)]\s+/.test(line));
    if (unordered || ordered) {
      groups.push({
        kind: ordered ? "ordered" : "unordered",
        items: lines.map((line) =>
          line.replace(ordered ? /^\d+[.)]\s+/ : /^[-*]\s+/, ""),
        ),
      });
    } else {
      groups.push({ kind: "paragraph", text: lines.join(" ") });
    }
  }

  return (
    <div className={`record-editorial ${className}`.trim()}>
      {groups.map((group, index) => {
        if (group.kind === "paragraph") {
          return (
            <p key={index}>
              <Rich text={group.text} />
            </p>
          );
        }
        const List = group.kind === "ordered" ? "ol" : "ul";
        return (
          <List className="record-editorial__list" key={index}>
            {group.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <Rich text={item} />
              </li>
            ))}
          </List>
        );
      })}
    </div>
  );
}
