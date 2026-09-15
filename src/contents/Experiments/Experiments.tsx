import { useState, type ReactNode } from "react";
import { PageSectionNav, type PageSection } from "../../components/PageSectionNav";
import { SectionTabs } from "../../components/LabFolders/SectionTabs";
import { FolderStack } from "../../components/LabFolders/FolderStack";
import { ExperimentCard, ReferenceItem } from "../../components/LabFolders/ExperimentCard";
import { PdfViewer } from "../../components/LabFolders/PdfViewer";
import type { AccentStyle, ExperimentData } from "../../components/LabFolders/types";
import { asset } from "../../utils";
import { EXPERIMENT_BLOCKS } from "./data";
import { GENE_PARTS } from "./GeneticEngineeringData";
import { GeneSystemGrid } from "./GeneSystemGrid";
import { ENZYME_ACTIVITIES, ENZYMATIC_IMMOBILISATION_SCHEMATIC_CAPTION } from "./EnzymaticImmobilisationData";
import { EnzymeActivityGrid } from "./EnzymeActivityGrid";
import { EcosystemMap, type EcosystemMapItem } from "../../components/EcosystemMap";
import "../../components/LabFolders/LabFolders.css";

// The four experiment blocks as glass spheres — see EcosystemMap's own doc
// comment for the component's shared behaviour. Encapsulation is pushed
// bluer than --lab-encapsulation's own teal (#146b78) so it reads as
// clearly distinct from Genetic engineering's green at a glance; the same
// adjusted blue is used on Engineering's own Bacterial encapsulation
// sphere for consistency between the two maps. Revalorisation's gold
// (#c99a06) similarly replaces the duller #b8790a mustard tried first.
// Revalorisation uses this colour rather than --phosphate, which
// Engineering's Hardware sphere uses instead.
const EXPERIMENTS_ECOSYSTEM_ITEMS: EcosystemMapItem[] = [
  {
    id: "encapsulation",
    label: ["Alginate", "encapsulation"],
    color: "#1568a3",
    image: "assets/experiments/ecosystem-map/alginate.png",
    alt: "Alginate capsule illustration",
    left: 4.2,
    top: 28,
    width: 13.5,
    imageSize: 88,
    home: [140, 175],
  },
  {
    id: "enzymatic-immobilisation",
    label: ["Enzymatic", "immobilisation"],
    color: "#6b4e9a",
    image: "assets/experiments/ecosystem-map/enzyme.png",
    alt: "Protein ribbon structure illustration",
    left: 29.4,
    top: 4,
    width: 11.5,
    imageSize: 80,
    home: [450, 90],
  },
  {
    id: "genetic-engineering",
    label: ["Genetic", "engineering"],
    color: "#3f7d4a",
    image: "assets/experiments/ecosystem-map/bacteria.png",
    alt: "Engineered bacterium illustration",
    left: 53.1,
    top: 38,
    width: 12.5,
    imageSize: 84,
    home: [760, 215],
  },
  {
    id: "revalorisation",
    label: ["Revalorisation"],
    color: "#c99a06",
    image: "assets/experiments/ecosystem-map/revalorisation.png",
    alt: "Star illustration",
    left: 78.8,
    top: 17,
    width: 12.8,
    imageSize: 70,
    home: [1090, 140],
  },
];

// Built once at module scope (stable array references — see
// PageSectionNav's own note on why `sections` must not be recreated every
// render) from the 4 official experiment blocks. Each block gets its own
// nav tree:
//  - A block with sub-blocks (currently only Alginate encapsulation): Level
//    1 = its sub-blocks (real, always-mounted <section> ids — a normal
//    scroll-anchored PageSectionNav tree), Level 2 = that sub-block's
//    individual experiments. Experiments aren't separate scroll targets —
//    FolderStack only ever mounts the one active experiment's card in a
//    shared slot — so each Level-2 leaf uses `onSelect` to re-trigger that
//    experiment's own folder-tab button instead of scrolling (see
//    PageSectionNav.tsx's PageSubsection.onSelect).
//  - A flat block (still-placeholder Enzymatic immobilisation / Genetic
//    engineering / Revalorisation) has no sub-block tier to show at Level
//    1, so its experiments sit there directly instead, each with the same
//    onSelect wiring.
const SECTIONS_BY_BLOCK: Record<string, PageSection[]> = Object.fromEntries(
  EXPERIMENT_BLOCKS.map((block) => {
    if (block.subBlocks) {
      const sections: PageSection[] = block.subBlocks.map((subBlock) => ({
        id: subBlock.id,
        label: subBlock.heading.replace(/^\d+\.\s*/, ""),
        // A sub-block with no experiments of its own (e.g. a closing prose
        // section) has nothing to list at Level 2 — it's still a real,
        // scroll-anchored Level-1 target on its own.
        children: subBlock.experiments?.map((experiment) => ({
          id: `${subBlock.id}--${experiment.id}`,
          label: experiment.tabLabel,
          onSelect: () => document.getElementById(`folder-tab-${experiment.id}`)?.click(),
        })),
      }));
      return [block.id, sections];
    }
    const sections: PageSection[] = (block.experiments ?? []).map((experiment) => ({
      id: `${block.id}--${experiment.id}`,
      label: experiment.tabLabel,
      onSelect: () => document.getElementById(`folder-tab-${experiment.id}`)?.click(),
    }));
    return [block.id, sections];
  }),
);

/** Renders the one pathway diagram shared with Project Description (see
 * ProjectDescription.tsx's own local Figure component, which this mirrors)
 * — same source image under assets/project-description, since it's
 * literally the same figure, not a duplicate asset. */
function Figure({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`vsi-figure vsi-figure--full pd-figure ${className}`.trim()}>
      <img src={asset(`assets/project-description/${src}`)} alt={alt} />
      {caption && <figcaption className="vsi-figure__caption">{caption}</figcaption>}
    </figure>
  );
}

function paragraphs(text: ReactNode | ReactNode[] | undefined, className: string): ReactNode {
  if (text === undefined || text === null) return null;
  const list = Array.isArray(text) ? text : [text];
  return list.map((paragraph, index) => (
    <p className={className} key={index}>
      {paragraph}
    </p>
  ));
}

function experimentFolders(experiments: ExperimentData[], idPrefix = "") {
  return experiments.map((experiment, index) => ({
    // idPrefix keeps a duplicated deck's tab/panel DOM ids (folder-tab-*,
    // folder-panel-*) from colliding with the real deck's — see the
    // mostaza-palette preview deck below, the only caller that passes one.
    id: `${idPrefix}${experiment.id}`,
    label: experiment.tabLabel,
    content: <ExperimentCard data={experiment} />,
    // 1-indexed position within this experiment sequence (each sub-block
    // or flat block starts its own count at 1) — shown as a small numbered
    // circle on the tab so the workflow order reads at a glance.
    order: index + 1,
  }));
}

export function Experiments() {
  const [activeBlockId, setActiveBlockId] = useState(EXPERIMENT_BLOCKS[0].id);
  const activeBlock = EXPERIMENT_BLOCKS.find((block) => block.id === activeBlockId) ?? EXPERIMENT_BLOCKS[0];

  return (
    <div className="lab-folders">
      {/* Experiments keeps its own always-one-active pattern (this map is a
          visual companion to the pill-nav below, per EcosystemMap's own doc
          comment) -- the shared map's click-outside/toggle-off deselect is
          for Engineering's map only, so a null selection here is ignored
          rather than clearing the active block. */}
      <EcosystemMap
        items={EXPERIMENTS_ECOSYSTEM_ITEMS}
        activeId={activeBlockId}
        onSelect={(id) => id !== null && setActiveBlockId(id)}
      />

      <div className="lab-folders__menu">
        <SectionTabs
          tabs={EXPERIMENT_BLOCKS.map((block) => ({ id: block.id, label: block.label }))}
          activeId={activeBlockId}
          onChange={setActiveBlockId}
          ariaLabel="Experiment blocks"
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
            {/* No block-level heading here on purpose — the block's name is
                already the selected pill above (.lab-folders__menu), so
                repeating it as an on-page title would be a redundant
                heading. The block's own intro, when it has one, still runs
                narrow and centered like ProjectDescription's prose. */}
            {activeBlock.intro && <div className="lab-prose">{paragraphs(activeBlock.intro, "lab-block__intro")}</div>}

            {/* Genetic engineering's conceptual "five parts of the system"
                sits between the block intro and its two workflow
                sub-blocks — a bespoke visual, not a folder deck, since none
                of the five are experiments (see GeneSystemGrid.tsx). Wide,
                like the folder decks below it, not capped to .lab-prose. */}
            {activeBlock.id === "genetic-engineering" && (
              <>
                <div className="lab-prose">
                  <Figure
                    src="engineered-phosphorus-pathway.original.png"
                    alt="Schematic of P. putida KT2440 redesigned as a phosphate-accumulating organism, with PPK1 and PstSCAB added in green and Ppx, PpkB and PitB inactivated in red"
                    caption="Schematic of P. putida KT2440 redesigned as a PAO. In green, the functions we add (PPK1 and PstSCAB); in red, the ones we inactivate (Ppx, PpkB/PPK2 and PitB). The arrows follow the phosphate: it enters through PstSCAB, is fixed as polyP by PPK1, and both the exits (PitB) and the degradation/consumption of polyP (Ppx, PpkB) are blocked."
                    className="lab-figure--pathway"
                  />
                </div>
                <section className="lab-subblock" aria-label="The five parts of the system">
                  <div className="lab-prose">
                    <h2 className="lab-block__subtitle">The five parts of the system</h2>
                  </div>
                  <GeneSystemGrid parts={GENE_PARTS} />
                </section>
              </>
            )}

            {/* Enzymatic immobilisation's own conceptual "four parts of the
                system" (PLA/PLC/NAP/Phytases) — same bespoke placement as
                Genetic engineering's five parts, above. The source mentions
                a schematic of "the functionalised rePhlow sphere" but never
                actually embeds it (an empty callout carrying only the
                figure's own caption) — kept honest as a real, captioned
                placeholder rather than silently dropped or faked. */}
            {activeBlock.id === "enzymatic-immobilisation" && (
              <>
                <div className="lab-prose">
                  <figure className="record-figure" style={{ margin: "8px 0 24px" }}>
                    <div className="record-figure__placeholder" aria-hidden="true">
                      [ figure placeholder ]
                    </div>
                    <figcaption>{ENZYMATIC_IMMOBILISATION_SCHEMATIC_CAPTION}</figcaption>
                  </figure>
                </div>
                <section className="lab-subblock" aria-label="The four parts of the system">
                  <div className="lab-prose">
                    <h2 className="lab-block__subtitle">The four parts of the system</h2>
                    <p className="lab-block__intro">
                      The degumming stream is not hydrolysed by a single enzyme, but by a cocktail that acts
                      synergistically, each activity attacking a different bond of the substrate. Four catalytic
                      activities were targeted, all selected to retain function at the pH 5.0 and 30 ºC of the
                      acid-degummed effluent.
                    </p>
                  </div>
                  <EnzymeActivityGrid activities={ENZYME_ACTIVITIES} />
                  <div className="lab-prose">
                    <p className="lab-block__intro" style={{ marginTop: 20 }}>
                      Overall, a hierarchical bioinformatic screen narrowed thousands of candidates down to{" "}
                      <strong>7 enzymes</strong> covering these four activities (two representatives each, except
                      PLA, which is covered by Lecitase® Ultra as the immobilisation model). Their selection,
                      production and characterisation form the first block; the chemistry used to fix them onto the
                      support forms the second.
                    </p>
                  </div>
                </section>
              </>
            )}

            {activeBlock.subBlocks ? (
              /* A block with multiple labelled sub-sections (e.g. Alginate
                 encapsulation's "1. ..."/"2. ..." threads) — each gets its
                 own heading, intro and independent folder-tab row/deck, so
                 switching folders in one never disturbs the others. With no
                 block-level heading above it, the sub-block heading is the
                 page's real, promoted section title (h2, not h3). A
                 sub-block with no experiments (e.g. a closing synthesis)
                 renders as heading + intro only, no folder deck. */
              activeBlock.subBlocks.map((subBlock) => (
                <section className="lab-subblock" id={subBlock.id} key={subBlock.id}>
                  <div className="lab-prose">
                    <h2 className="lab-subblock__heading">{subBlock.heading}</h2>
                    {paragraphs(subBlock.intro, "lab-subblock__intro")}
                    {!!subBlock.references?.length && (
                      <ul className="lab-subblock__references">
                        {subBlock.references.map((reference, index) => (
                          <ReferenceItem scope={subBlock.id} text={reference} key={index} />
                        ))}
                      </ul>
                    )}
                  </div>
                  {subBlock.experiments && (
                    <FolderStack
                      ariaLabel={`${subBlock.heading} experiments`}
                      folders={experimentFolders(subBlock.experiments)}
                    />
                  )}
                  {subBlock.outro && (
                    <div className="lab-prose">{paragraphs(subBlock.outro, "lab-subblock__outro")}</div>
                  )}
                </section>
              ))
            ) : null}

            {/* A single reference list shared by the whole block (see
                ExperimentBlockData.references) — e.g. Enzymatic
                immobilisation, whose source cites across both sub-blocks
                from one numbered list rather than keeping a separate list
                per sub-block. Rendered once, after every sub-block, as its
                own section so it gets the same section-break spacing as
                every sub-block transition (see .lab-subblock + .lab-subblock). */}
            {!!activeBlock.references?.length && (
              <section className="lab-subblock">
                <div className="lab-prose">
                  <h2 className="lab-subblock__heading lab-block__references-heading">References</h2>
                  <ul className="lab-block__references">
                    {activeBlock.references.map((reference, index) => (
                      <ReferenceItem scope={activeBlock.id} text={reference} key={index} />
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Colour-only design preview: the exact same Revalorisation
                deck below, duplicated above it, re-skinned with the
                approved "Paleta mostaza" (see .lab-block--mostaza in
                LabFolders.css) — a scoped token override, not a rebuilt
                component, so it's the real FolderStack/ExperimentCard,
                just recoloured. Distinct "preview-" tab ids keep it from
                colliding with the real deck's DOM ids below. Drop this
                block (and the CSS scope it points at) once a palette is
                chosen for real. */}
            {activeBlock.id === "revalorisation" && (
              <div className="lab-block--mostaza" style={{ marginBottom: 40 }}>
                <p className="lab-mostaza-label">Paleta mostaza — color preview</p>
                <FolderStack
                  ariaLabel={`${activeBlock.label} experiments (mostaza palette preview)`}
                  folders={[
                    ...experimentFolders(activeBlock.experiments ?? [], "preview-"),
                    {
                      id: "preview-protocols",
                      label: "Notebook",
                      variant: "protocols" as const,
                      content: (
                        <PdfViewer
                          src={asset(activeBlock.protocolsPdfSrc)}
                          title={`${activeBlock.label} notebook`}
                        />
                      ),
                    },
                  ]}
                />
              </div>
            )}

            {!activeBlock.subBlocks && (
              <FolderStack
                ariaLabel={`${activeBlock.label} experiments`}
                folders={[
                  ...experimentFolders(activeBlock.experiments ?? []),
                  {
                    id: "protocols",
                    label: "Notebook",
                    variant: "protocols" as const,
                    content: (
                      <PdfViewer
                        src={asset(activeBlock.protocolsPdfSrc)}
                        title={`${activeBlock.label} notebook`}
                      />
                    ),
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
