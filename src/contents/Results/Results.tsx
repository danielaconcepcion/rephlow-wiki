import { useState } from "react";
import { SectionTabs } from "../../components/LabFolders/SectionTabs";
import { FolderStack } from "../../components/LabFolders/FolderStack";
import { ResultCard } from "../../components/LabFolders/ResultCard";
import type { AccentStyle } from "../../components/LabFolders/types";
import { RESULT_BLOCKS } from "./data";
import "../../components/LabFolders/LabFolders.css";

export function Results() {
  const [activeBlockId, setActiveBlockId] = useState(RESULT_BLOCKS[0].id);
  const activeBlock = RESULT_BLOCKS.find((block) => block.id === activeBlockId) ?? RESULT_BLOCKS[0];

  return (
    <div className="lab-folders">
      <div className="lab-folders__inner">
        <div className="lab-folders__menu">
          <SectionTabs
            tabs={RESULT_BLOCKS.map((block) => ({ id: block.id, label: block.label }))}
            activeId={activeBlockId}
            onChange={setActiveBlockId}
            ariaLabel="Result blocks"
          />
        </div>

        <div
          className="lab-block"
          key={activeBlock.id}
          style={{ "--folder-accent": activeBlock.accent } as AccentStyle}
        >
          <FolderStack
            ariaLabel={`${activeBlock.label} results`}
            folders={activeBlock.results.map((result) => ({
              id: result.id,
              label: result.tabLabel,
              content: <ResultCard data={result} />,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
