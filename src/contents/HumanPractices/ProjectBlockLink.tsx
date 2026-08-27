import { Link } from "react-router-dom";
import type { CSSProperties, ReactNode } from "react";
import {
  RAW_BLOCKS,
  type BlockId,
} from "../../components/OurSolutionVisualIndex/blocks";

type BlockLinkStyle = CSSProperties & { "--hp-block-color": string };

export function ProjectBlockLink({
  blockId,
  children,
}: {
  blockId: BlockId;
  children?: ReactNode;
}) {
  const block = RAW_BLOCKS.find((candidate) => candidate.id === blockId)!;

  return (
    <Link
      className="hp-project-block-link"
      style={{ "--hp-block-color": block.accent } as BlockLinkStyle}
      to={`/project-description#${block.sectionId}`}
    >
      {children ?? block.title}
    </Link>
  );
}
