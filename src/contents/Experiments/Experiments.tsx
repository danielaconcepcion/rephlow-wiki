import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import {
  PageSectionNav,
  type PageSection,
} from "../../components/PageSectionNav";
import { SectionTabs } from "../../components/LabFolders/SectionTabs";
import { FolderStack } from "../../components/LabFolders/FolderStack";
import { ExperimentCard } from "../../components/LabFolders/ExperimentCard";
import { BlockReferences } from "../../components/LabFolders/BlockReferences";
import { Rich } from "../../components/LabFolders/RichText";
import { EncapsulationWorkflow } from "./workflowFigures/EncapsulationWorkflow";
import { RevalorisationWorkflow } from "./workflowFigures/RevalorisationWorkflow";
import { EnzymaticWorkflow } from "./workflowFigures/EnzymaticWorkflow";
import { PolyphosphateWorkflow } from "./workflowFigures/PolyphosphateWorkflow";
import { CloningWorkflow } from "./workflowFigures/CloningWorkflow";
import { KnockoutWorkflow } from "./workflowFigures/KnockoutWorkflow";
import {
  NumberingContext,
  numberExperiments,
} from "../../components/LabFolders/numbering";
import { PdfViewer } from "../../components/LabFolders/PdfViewer";
import type {
  AccentStyle,
  ExperimentData,
} from "../../components/LabFolders/types";
import { asset } from "../../utils";
import { ALGINATE_ENCAPSULATION_FIGURES } from "./EncapsulationData";
import { EXPERIMENT_BLOCKS } from "./data";
import { GENE_PARTS } from "./GeneticEngineeringData";
import { GeneSystemGrid } from "./GeneSystemGrid";
import {
  ENZYME_ACTIVITIES,
  ENZYMATIC_IMMOBILISATION_SCHEMATIC_CAPTION,
} from "./EnzymaticImmobilisationData";
import { EnzymeActivityGrid } from "./EnzymeActivityGrid";
import { EcosystemMap } from "../../components/EcosystemMap";
import { LabCornerIndex } from "../../components/LabFolders/LabCornerIndex";
import { LAB_BLOCK_SPHERES } from "../../components/LabFolders/labBlockSpheres";
import functionalisedSphereSrc from "../../assets/experiments/enzymatic-immobilisation/functionalised-rephlow-sphere.svg";
import "../../components/LabFolders/LabFolders.css";

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
        children: [
          ...(subBlock.experiments?.map((experiment) => ({
            id: `${subBlock.id}--${experiment.id}`,
            label: experiment.tabLabel,
            onSelect: () =>
              document.getElementById(`folder-tab-${experiment.id}`)?.click(),
          })) ?? []),
          ...(subBlock.references?.length
            ? [{ id: `${subBlock.id}--references`, label: "References" }]
            : []),
        ],
      }));
      if (block.references?.length) {
        sections.push({ id: `${block.id}--references`, label: "References" });
      }
      return [block.id, sections];
    }
    const sections: PageSection[] = (block.experiments ?? []).map(
      (experiment) => ({
        id: `${block.id}--${experiment.id}`,
        label: experiment.tabLabel,
        onSelect: () =>
          document.getElementById(`folder-tab-${experiment.id}`)?.click(),
      }),
    );
    if (block.references?.length) {
      sections.push({ id: `${block.id}--references`, label: "References" });
    }
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
  dir = "assets/project-description",
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
  /** Folder under /public the image lives in — the pathway diagram is
   * shared with Project Description, every other one is this page's own. */
  dir?: string;
}) {
  return (
    <figure
      className={`vsi-figure vsi-figure--full pd-figure ${className}`.trim()}
    >
      <img src={asset(`${dir}/${src}`)} alt={alt} />
      {caption && (
        <figcaption className="vsi-figure__caption">{caption}</figcaption>
      )}
    </figure>
  );
}

/** Block, sub-block and closing prose. Each paragraph goes through Rich,
 * the same inline-markup pass the folder cards use, so a data file can
 * write **bold**, *italic* and [n] citations in plain strings exactly as
 * the team's Notion pages do (a paragraph already written as JSX passes
 * through untouched). */
function paragraphs(
  text: ReactNode | ReactNode[] | undefined,
  className: string,
): ReactNode {
  if (text === undefined || text === null) return null;
  const list = Array.isArray(text) ? text : [text];
  return list.map((paragraph, index) => (
    <p className={className} key={index}>
      <Rich text={paragraph} />
    </p>
  ));
}

/** Wraps a block's folder deck in its optional palette scope (see
 * ExperimentBlockData.palette / .lab-block--mostaza) — scoped to the deck
 * only, so the block's surrounding prose keeps the page's own colours. */
function DeckPalette({
  palette,
  children,
}: {
  palette?: "mostaza";
  children: ReactNode;
}) {
  if (!palette) return <>{children}</>;
  return <div className={`lab-block--${palette}`}>{children}</div>;
}

/** The workflow figure a sub-block opens with, where it has one. */
const SUBBLOCK_WORKFLOWS: Record<string, ReactNode> = {
  "polyphosphate-accumulation-study": <PolyphosphateWorkflow />,
  cloning: <CloningWorkflow />,
  "knocking-out": <KnockoutWorkflow />,
};

function experimentFolders(experiments: ExperimentData[]) {
  return experiments.map((experiment, index) => ({
    id: experiment.id,
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

  /* A block has no route of its own -- it is client state -- so a link to
     one (from Results, or anywhere else in the wiki) addresses it by hash:
     /experiments#revalorisation. The same contract Engineering and Results
     already offer, read the same way. A hash that names no block is left
     to the browser. */
  const { hash } = useLocation();
  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (!id || !EXPERIMENT_BLOCKS.some((block) => block.id === id)) return;
    setActiveBlockId(id);
  }, [hash]);
  const activeBlock =
    EXPERIMENT_BLOCKS.find((block) => block.id === activeBlockId) ??
    EXPERIMENT_BLOCKS[0];
  // The two landmarks the corner index reads -- the block pills directly
  // under the full-size map, and the sentinel at the foot of the page.
  // See LabCornerIndex, shared with Measurements and Results.
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pageEndRef = useRef<HTMLDivElement | null>(null);
  // Figure and table numbers for the block on screen, restarting with it.
  const numbering = useMemo(
    () => numberExperiments(activeBlock.subBlocks ?? [activeBlock]),
    [activeBlock],
  );

  return (
    <div className="lab-folders">
      {/* Experiments keeps its own always-one-active pattern (this map is a
          visual companion to the pill-nav below, per EcosystemMap's own doc
          comment) -- the shared map's click-outside/toggle-off deselect is
          for Engineering's map only, so a null selection here is ignored
          rather than clearing the active block. */}
      <EcosystemMap
        items={LAB_BLOCK_SPHERES}
        activeId={activeBlockId}
        onSelect={(id) => id !== null && setActiveBlockId(id)}
      />

      {/* The corner "you are here" index, shown once the map above has
          scrolled away -- same spheres, same colours and the same active
          block, so either index switches the page the same way. */}
      <LabCornerIndex
        activeBlockId={activeBlockId}
        onSelect={setActiveBlockId}
        after={menuRef}
        until={pageEndRef}
      />

      <div className="lab-folders__menu" ref={menuRef}>
        <SectionTabs
          tabs={EXPERIMENT_BLOCKS.map((block) => ({
            id: block.id,
            label: block.label,
          }))}
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
          <NumberingContext.Provider value={numbering}>
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
              {activeBlock.intro && (
                <div className="lab-prose">
                  {activeBlock.id === "enzymatic-immobilisation" &&
                  Array.isArray(activeBlock.intro) ? (
                    <>
                      {paragraphs(
                        activeBlock.intro.slice(0, 2),
                        "lab-block__intro",
                      )}
                      <figure className="vsi-figure vsi-figure--full pd-figure">
                        <img
                          src={functionalisedSphereSrc}
                          alt="Cross-sectional schematic of the functionalised rePhlow sphere showing surface hydrolysis of organophosphates, inward orthophosphate diffusion and intracellular polyphosphate storage by engineered PAO"
                        />
                        <figcaption className="vsi-figure__caption">
                          {ENZYMATIC_IMMOBILISATION_SCHEMATIC_CAPTION}
                        </figcaption>
                      </figure>
                      {paragraphs(
                        activeBlock.intro.slice(2),
                        "lab-block__intro",
                      )}
                    </>
                  ) : (
                    paragraphs(activeBlock.intro, "lab-block__intro")
                  )}
                </div>
              )}

              {/* Revalorisation's workflow closes its intro, where the
                  original image sat — redrawn, with linked panels. */}
              {activeBlock.id === "revalorisation" && (
                <RevalorisationWorkflow />
              )}

              {/* Alginate encapsulation's two intro diagrams: the coaxial
                  setup the whole block is built around, and the twelve-stage
                  workflow its experiments walk through — the latter redrawn
                  as a vector figure whose panels open their experiments. */}
              {activeBlock.id === "encapsulation" && (
                <>
                  <div className="lab-prose">
                    {ALGINATE_ENCAPSULATION_FIGURES.map((figure) => (
                      <Figure
                        key={figure.src}
                        dir="assets/experiments/encapsulation"
                        src={figure.src}
                        alt={figure.alt}
                        caption={figure.caption}
                      />
                    ))}
                  </div>
                  <EncapsulationWorkflow />
                </>
              )}

              {/* Genetic engineering's conceptual "five parts of the system"
                  sits between the block intro and its two workflow
                  sub-blocks — a bespoke visual, not a folder deck, since none
                  of the five are experiments (see GeneSystemGrid.tsx). Wide,
                  like the folder decks below it, not capped to .lab-prose. */}
              {activeBlock.id === "genetic-engineering" && (
                <>
                  <div className="lab-prose">
                    <Figure
                      src="engineered-phosphorus-pathway.webp"
                      alt="Schematic of P. putida KT2440 redesigned as a phosphate-accumulating organism, with PPK1 and PstSCAB added in green and Ppx, PpkB and PitB inactivated in red"
                      caption="Schematic of P. putida KT2440 redesigned as a PAO. In green, the functions we add (PPK1 and PstSCAB); in red, the ones we inactivate (Ppx, PpkB/PPK2 and PitB). The arrows follow the phosphate: it enters through PstSCAB, is fixed as polyP by PPK1, and both the exits (PitB) and the degradation/consumption of polyP (Ppx, PpkB) are blocked."
                      className="lab-figure--pathway"
                    />
                  </div>
                  <section
                    className="lab-subblock"
                    aria-label="The five parts of the system"
                  >
                    <div className="lab-prose">
                      <h2 className="lab-block__subtitle">
                        The five parts of the system
                      </h2>
                    </div>
                    <GeneSystemGrid parts={GENE_PARTS} />
                  </section>
                </>
              )}

              {/* Enzymatic immobilisation's own conceptual "four parts of the
                  system" (PLA/PLC/NAP/Phytases) — same bespoke placement as
                  Genetic engineering's five parts, above. */}
              {activeBlock.id === "enzymatic-immobilisation" && (
                <>
                  {/* The six-step figure, redrawn, with linked panels. */}
                  <EnzymaticWorkflow />
                  <section
                    className="lab-subblock"
                    aria-label="The four parts of the system"
                  >
                    <div className="lab-prose">
                      <h2 className="lab-block__subtitle">
                        The four parts of the system
                      </h2>
                      <p className="lab-block__intro">
                        The degumming stream is not hydrolysed by a single
                        enzyme, but by a cocktail that acts synergistically,
                        each activity attacking a different bond of the
                        substrate. Four catalytic activities were targeted, all
                        selected to retain function at the pH 5.0 and 30 ºC of
                        the acid-degummed effluent.
                      </p>
                    </div>
                    <EnzymeActivityGrid activities={ENZYME_ACTIVITIES} />
                    <div className="lab-prose">
                      <p className="lab-block__intro" style={{ marginTop: 20 }}>
                        Overall, a hierarchical bioinformatic screen narrowed
                        thousands of candidates down to{" "}
                        <strong>7 enzymes</strong> covering these four
                        activities (two representatives each, except PLA, which
                        is covered by Lecitase® Ultra as the immobilisation
                        model). Their selection, production and characterisation
                        form the first block; the chemistry used to fix them
                        onto the support forms the second.
                      </p>
                    </div>
                  </section>
                </>
              )}

              {activeBlock.subBlocks
                ? /* A block with multiple labelled sub-sections (e.g. Alginate
                   encapsulation's "1. ..."/"2. ..." threads) — each gets its
                   own heading, intro and independent folder-tab row/deck, so
                   switching folders in one never disturbs the others. With no
                   block-level heading above it, the sub-block heading is the
                   page's real, promoted section title (h2, not h3). A
                   sub-block with no experiments (e.g. a closing synthesis)
                   renders as heading + intro only, no folder deck. */
                  activeBlock.subBlocks.map((subBlock) => (
                    <section
                      className="lab-subblock"
                      id={subBlock.id}
                      key={subBlock.id}
                    >
                      <div className="lab-prose">
                        <h2 className="lab-subblock__heading">
                          {subBlock.heading}
                        </h2>
                        {paragraphs(subBlock.intro, "lab-subblock__intro")}
                      </div>
                      {/* Genetic engineering's three workflows, redrawn: each
                        closes its sub-block's intro, where the original image
                        sat, and its panels open the experiments below. */}
                      {SUBBLOCK_WORKFLOWS[subBlock.id]}
                      {subBlock.experiments && (
                        <DeckPalette palette={activeBlock.palette}>
                          <FolderStack
                            ariaLabel={`${subBlock.heading} experiments`}
                            folders={experimentFolders(subBlock.experiments)}
                          />
                        </DeckPalette>
                      )}
                      {subBlock.outro && (
                        <div className="lab-prose">
                          {paragraphs(subBlock.outro, "lab-subblock__outro")}
                        </div>
                      )}
                      {/* A sub-block that keeps its own numbered list (rather
                        than sharing the block's) folds it away here, at the
                        end of its own section. */}
                      {!!subBlock.references?.length && (
                        <BlockReferences
                          id={`${subBlock.id}--references`}
                          scope={subBlock.id}
                          items={subBlock.references}
                        />
                      )}
                    </section>
                  ))
                : null}

              {/* A single reference list shared by the whole block (see
                  ExperimentBlockData.references), folded away at the foot
                  of the page; an inline "[n]" anywhere above opens it on
                  the way down (see BlockReferences). */}
              {!!activeBlock.references?.length && (
                <BlockReferences
                  id={`${activeBlock.id}--references`}
                  scope={activeBlock.id}
                  items={activeBlock.references}
                />
              )}

              {!activeBlock.subBlocks && (
                <DeckPalette palette={activeBlock.palette}>
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
                </DeckPalette>
              )}
            </div>
          </NumberingContext.Provider>
        </div>
      </div>

      {/* Scroll-position sentinel only -- the last thing in the page, so it
          comes into view exactly when the shared Previous/Next handoff
          below it does and the corner index steps aside instead of sitting
          on top of it. */}
      <div
        className="ecosystem-map-mini-sentinel"
        ref={pageEndRef}
        aria-hidden="true"
      />
    </div>
  );
}
