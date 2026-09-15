import { Link } from "react-router-dom";
import type { CSSProperties, ReactNode } from "react";
import { RAW_BLOCKS, type BlockId } from "./OurSolutionVisualIndex/blocks";
import "./ProjectBlockLink.css";

type AccentLinkStyle = CSSProperties & { "--related-link-color": string };

/**
 * Generic accent-coloured "related page" link — bold text, an underline
 * in the destination's own accent colour, filling in on hover/focus.
 * Originally written as Human Practices' ProjectBlockLink (below), which
 * only ever pointed at one of the six Project Description blocks;
 * generalised here to any destination so other pages/sections can reuse
 * the same visual identity instead of inventing a second one. Moved from
 * contents/HumanPractices to components since it's no longer HP-specific.
 */
export function RelatedPageLink({
  to,
  accent,
  children,
}: {
  to: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <Link
      className="related-page-link"
      style={{ "--related-link-color": accent } as AccentLinkStyle}
      to={to}
    >
      {children}
    </Link>
  );
}

/**
 * The original, narrower case: a link to one of the six Project
 * Description solution blocks, coloured with that block's own accent.
 * Thin convenience wrapper over RelatedPageLink — unchanged call sites in
 * Human Practices keep working exactly as before.
 */
export function ProjectBlockLink({
  blockId,
  children,
}: {
  blockId: BlockId;
  children?: ReactNode;
}) {
  const block = RAW_BLOCKS.find((candidate) => candidate.id === blockId)!;
  return (
    <RelatedPageLink
      to={`/project-description#${block.sectionId}`}
      accent={block.accent}
    >
      {children ?? block.title}
    </RelatedPageLink>
  );
}
