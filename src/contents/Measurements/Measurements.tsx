import { useMemo, useState } from "react";

import { EcosystemMap } from "../../components/EcosystemMap";
import { ExperimentCard } from "../../components/LabFolders/ExperimentCard";
import { FolderStack } from "../../components/LabFolders/FolderStack";
import { LAB_BLOCK_SPHERES } from "../../components/LabFolders/labBlockSpheres";
import {
  NumberingContext,
  numberExperiments,
} from "../../components/LabFolders/numbering";
import { EditorialText } from "../../components/LabFolders/EditorialText";
import { SectionTabs } from "../../components/LabFolders/SectionTabs";
import type { AccentStyle } from "../../components/LabFolders/types";
import {
  PageSectionNav,
  type PageSection,
} from "../../components/PageSectionNav";
import { MEASUREMENT_BLOCKS } from "./data";
import { MEASUREMENTS_CONCLUSIONS, MEASUREMENTS_INTRO } from "./pageProse";
import "../../components/LabFolders/LabFolders.css";
import "./Measurements.css";

/* --------------------------------------------------------------------------
   Measurements — the four wet-lab blocks again, each read through the
   techniques that measured it. The page is the Experiments shell (glass
   spheres, block pills, folder deck, lateral index), so a reader who has
   been through Experiments or Results already knows how to move in it; what
   changes is the record itself, which folds into the sections a method is
   read by: what it is applied to, what the technique needs, how the sample
   was prepared, and what came out.
   -------------------------------------------------------------------------- */

/** Built once at module scope — PageSectionNav keeps an observer keyed on
 * this array, so it must not be rebuilt on every render. Level 1 is the
 * block's techniques (each re-triggers its own folder tab rather than
 * scrolling, since the deck mounts one card at a time), level 2 the folded
 * sections of the technique on screen, which are real anchors. */
const SECTIONS_BY_BLOCK: Record<string, PageSection[]> = Object.fromEntries(
  MEASUREMENT_BLOCKS.map((block) => [
    block.id,
    block.measurements.map((measurement) => ({
      id: `${block.id}--${measurement.id}`,
      label: measurement.tabLabel,
      onSelect: () =>
        document.getElementById(`folder-tab-${measurement.id}`)?.click(),
      /* A record that measures several things lists those groups; one that
         measures a single thing lists its own sections, which is what the
         groups would otherwise repeat verbatim. */
      children: ((blocks) =>
        blocks.some((block) => block.group)
          ? blocks.filter((block) => block.group)
          : blocks.filter((block) => block.foldable))(
        (measurement.body ?? []).filter((block) => block.id && block.title),
      ).map((section) => ({
        id: section.id!,
        label: section.title!,
        // Opening the index entry opens the section it points at, which
        // is otherwise folded away and so impossible to scroll to. A
        // group heading is already on the page, so it only scrolls.
        onSelect: () => {
          const target = document.getElementById(section.id!);
          if (!target) return;
          if (target instanceof HTMLDetailsElement) target.open = true;
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        },
      })),
    })),
  ]),
);

function Prose({
  paragraphs,
  className,
}: {
  paragraphs: string[];
  className: string;
}) {
  return <EditorialText blocks={paragraphs} className={className} />;
}

export function Measurements() {
  const [activeBlockId, setActiveBlockId] = useState(MEASUREMENT_BLOCKS[0].id);
  const activeBlock =
    MEASUREMENT_BLOCKS.find((block) => block.id === activeBlockId) ??
    MEASUREMENT_BLOCKS[0];
  // Figure and table numbers restart with the block on screen, as on
  // Experiments and Results.
  const numbering = useMemo(
    () => numberExperiments([{ experiments: activeBlock.measurements }]),
    [activeBlock],
  );

  return (
    <div className="lab-folders ms-page">
      <div className="lab-content-wrap">
        <div className="lab-prose">
          <Prose paragraphs={MEASUREMENTS_INTRO} className="lab-block__intro" />
        </div>
      </div>

      <EcosystemMap
        items={LAB_BLOCK_SPHERES}
        activeId={activeBlockId}
        onSelect={(id) => id !== null && setActiveBlockId(id)}
      />

      <div className="lab-folders__menu">
        <SectionTabs
          tabs={MEASUREMENT_BLOCKS.map((block) => ({
            id: block.id,
            label: block.label,
          }))}
          activeId={activeBlockId}
          onChange={setActiveBlockId}
          ariaLabel="Measurement areas"
        />
      </div>

      <div className="page-with-section-nav">
        <PageSectionNav
          key={activeBlock.id}
          sections={SECTIONS_BY_BLOCK[activeBlock.id] ?? []}
          ariaLabel={`Jump to a ${activeBlock.label} measurement`}
        />

        <div className="lab-content-wrap">
          <NumberingContext.Provider value={numbering}>
            <div
              className="lab-block"
              key={activeBlock.id}
              style={{ "--folder-accent": activeBlock.accent } as AccentStyle}
            >
              <div className="lab-prose">
                <p className="ms-summary">{activeBlock.summary}</p>
                <Prose
                  paragraphs={activeBlock.intro}
                  className="lab-block__intro"
                />
                <div className="ms-characterisation">
                  <Prose
                    paragraphs={activeBlock.characterisation}
                    className="ms-characterisation__text"
                  />
                </div>
              </div>

              <div
                className={
                  activeBlock.palette ? `lab-block--${activeBlock.palette}` : ""
                }
              >
                <FolderStack
                  ariaLabel={`${activeBlock.label} measurements`}
                  folders={activeBlock.measurements.map(
                    (measurement, index) => ({
                      id: measurement.id,
                      label: measurement.tabLabel,
                      content: <ExperimentCard data={measurement} />,
                      order: index + 1,
                    }),
                  )}
                />
              </div>

              <section
                className="lab-subblock"
                id={`${activeBlock.id}--conclusions`}
              >
                <div className="lab-prose">
                  <h2 className="lab-subblock__heading">Conclusions</h2>
                  <Prose
                    paragraphs={activeBlock.conclusions}
                    className="lab-subblock__outro"
                  />
                </div>
              </section>
            </div>
          </NumberingContext.Provider>
        </div>
      </div>

      <div className="lab-content-wrap">
        <section className="lab-subblock" id="general-conclusions">
          <div className="lab-prose">
            <h2 className="lab-subblock__heading">General conclusions</h2>
            <Prose
              paragraphs={MEASUREMENTS_CONCLUSIONS}
              className="lab-subblock__outro"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
