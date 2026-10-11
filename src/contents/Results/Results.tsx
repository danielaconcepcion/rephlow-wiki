import { useState, type ReactNode } from "react";
import { PageSectionNav, type PageSection } from "../../components/PageSectionNav";
import { SectionTabs } from "../../components/LabFolders/SectionTabs";
import { FolderStack } from "../../components/LabFolders/FolderStack";
import { ResultCard } from "../../components/LabFolders/ResultCard";
import { LAB_BLOCK_SPHERES } from "../../components/LabFolders/labBlockSpheres";
import type { AccentStyle, ResultData } from "../../components/LabFolders/types";
import { EcosystemMap } from "../../components/EcosystemMap";
import { RESULT_BLOCKS } from "./data";
import "../../components/LabFolders/LabFolders.css";

/**
 * Results is deliberately the same page as Experiments, one step later in
 * the story: same four blocks, same glass-sphere visual index, same block
 * pills, same lateral section nav, same folder decks. Only the card inside
 * a folder differs (ResultCard rather than ExperimentCard), because what a
 * reader does on this page — pick a block, find the step they care about,
 * read its record — is the same thing they just did on Experiments.
 *
 * The structural pieces are therefore imported, not reimplemented:
 * LAB_BLOCK_SPHERES is the same list Experiments draws its map from, and
 * SectionTabs / PageSectionNav / FolderStack are the same components. See
 * Experiments.tsx for the reasoning behind the nav tree and the no-block-
 * heading choice, which this page follows rather than restating.
 */

// Built once at module scope — PageSectionNav requires a stable `sections`
// reference (see its own note). Level 1 is the block's sub-blocks, which
// are real scroll-anchored <section> ids; Level 2 is each sub-block's
// results, which share one mounted slot in the deck and so re-trigger
// their own folder tab instead of scrolling. A flat block puts its results
// at Level 1 with the same wiring.
const SECTIONS_BY_BLOCK: Record<string, PageSection[]> = Object.fromEntries(
  RESULT_BLOCKS.map((block) => {
    if (block.subBlocks) {
      const sections: PageSection[] = block.subBlocks.map((subBlock) => ({
        id: subBlock.id,
        label: subBlock.heading.replace(/^\d+\.\s*/, ""),
        children: subBlock.results?.map((result) => ({
          id: `${subBlock.id}--${result.id}`,
          label: result.tabLabel,
          onSelect: () => document.getElementById(`folder-tab-${result.id}`)?.click(),
        })),
      }));
      return [block.id, sections];
    }
    const sections: PageSection[] = (block.results ?? []).map((result) => ({
      id: `${block.id}--${result.id}`,
      label: result.tabLabel,
      onSelect: () => document.getElementById(`folder-tab-${result.id}`)?.click(),
    }));
    return [block.id, sections];
  }),
);

function paragraphs(text: ReactNode | ReactNode[] | undefined, className: string): ReactNode {
  if (text === undefined || text === null) return null;
  const list = Array.isArray(text) ? text : [text];
  return list.map((paragraph, index) => (
    <p className={className} key={index}>
      {paragraph}
    </p>
  ));
}

function DeckPalette({ palette, children }: { palette?: "mostaza"; children: ReactNode }) {
  if (!palette) return <>{children}</>;
  return <div className={`lab-block--${palette}`}>{children}</div>;
}

function resultFolders(results: ResultData[]) {
  return results.map((result, index) => ({
    id: result.id,
    label: result.tabLabel,
    content: <ResultCard data={result} />,
    order: index + 1,
  }));
}

export function Results() {
  const [activeBlockId, setActiveBlockId] = useState(RESULT_BLOCKS[0].id);
  const activeBlock = RESULT_BLOCKS.find((block) => block.id === activeBlockId) ?? RESULT_BLOCKS[0];

  return (
    <div className="lab-folders">
      {/* Always-one-active, like Experiments: the map is a visual companion
          to the pill nav below, so a null selection is ignored rather than
          clearing the active block. */}
      <EcosystemMap
        items={LAB_BLOCK_SPHERES}
        activeId={activeBlockId}
        onSelect={(id) => id !== null && setActiveBlockId(id)}
      />

      <div className="lab-folders__menu">
        <SectionTabs
          tabs={RESULT_BLOCKS.map((block) => ({ id: block.id, label: block.label }))}
          activeId={activeBlockId}
          onChange={setActiveBlockId}
          ariaLabel="Result blocks"
        />
      </div>

      <div className="page-with-section-nav">
        <PageSectionNav
          key={activeBlock.id}
          sections={SECTIONS_BY_BLOCK[activeBlock.id] ?? []}
          ariaLabel={`Jump to a ${activeBlock.label} section`}
        />

        <div className="lab-content-wrap">
          <div
            className="lab-block"
            key={activeBlock.id}
            style={{ "--folder-accent": activeBlock.accent } as AccentStyle}
          >
            {activeBlock.intro && (
              <div className="lab-prose">{paragraphs(activeBlock.intro, "lab-block__intro")}</div>
            )}

            {activeBlock.subBlocks
              ? activeBlock.subBlocks.map((subBlock) => (
                  <section className="lab-subblock" id={subBlock.id} key={subBlock.id}>
                    <div className="lab-prose">
                      <h2 className="lab-subblock__heading">{subBlock.heading}</h2>
                      {paragraphs(subBlock.intro, "lab-subblock__intro")}
                    </div>
                    {subBlock.results && (
                      <DeckPalette palette={activeBlock.palette}>
                        <FolderStack
                          ariaLabel={`${subBlock.heading} results`}
                          folders={resultFolders(subBlock.results)}
                        />
                      </DeckPalette>
                    )}
                    {subBlock.outro && (
                      <div className="lab-prose">{paragraphs(subBlock.outro, "lab-subblock__outro")}</div>
                    )}
                  </section>
                ))
              : null}

            {!activeBlock.subBlocks && (
              <DeckPalette palette={activeBlock.palette}>
                <FolderStack
                  ariaLabel={`${activeBlock.label} results`}
                  folders={resultFolders(activeBlock.results ?? [])}
                />
              </DeckPalette>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
