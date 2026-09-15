import { useEffect, useRef, useState } from "react";
import {
  EcosystemMap,
  type EcosystemMapItem,
} from "../components/EcosystemMap";
import { asset } from "../utils";
import { EcosystemMapMini } from "../components/EcosystemMapMini";
import "../components/LabFolders/LabFolders.css";
import "./Engineering.css";
import {
  DbtlCycle,
  DbtlSectionNav,
  slicePalette,
  type DbtlCycleHandle,
  type DbtlNavGroup,
  type DbtlPalette,
} from "./Engineering/DbtlCycle";
import { BACTERIAL_ENCAPSULATION_ITERATIONS } from "./Engineering/BacterialEncapsulationData";
import {
  ENZYME_PRODUCTION_ITERATIONS,
  IMMOBILISATION_CHEMISTRY_ITERATIONS,
} from "./Engineering/EnzymaticImmobilisationData";
import {
  CLONING_ITERATIONS,
  CRISPR_ITERATIONS,
} from "./Engineering/GeneticEngineeringData";
import { ITERATIONS, type Iteration } from "./Engineering/dbtlData";

/**
 * Five sub-pages. Tab switching is pure client state (no route change) —
 * the index between them is the shared EcosystemMap component (see
 * src/components/EcosystemMap.tsx), same visual language and behaviour as
 * Experiments' own, with a fifth sphere (Hardware) added.
 *
 * Bacterial encapsulation has the team's real 5-iteration write-up
 * (Engineering/BacterialEncapsulationData.ts) as one DBTL spiral, remounted
 * per tab (via `key`) so its scroll-driven state always starts fresh.
 *
 * Enzymatic immobilisation's real write-up (Engineering/
 * EnzymaticImmobilisationData.ts) frames itself as two threads —
 * "Enzyme production" (3 iterations) and "Immobilisation chemistry" (2
 * iterations, its own numbering restarting) — so that tab renders as two
 * separate DbtlCycle spirals under their own subtitles instead of one.
 * Both threads share a single continuous 5-step colour gradient: the two
 * palettes below are slicePalette() cuts of the same original 5-iteration
 * scale (positions 0-2 and 3-4 of it) rather than two independent ranges,
 * so the second spiral picks the gradient up exactly where the first left
 * off instead of restarting it.
 *
 * The other three still share the generic placeholder content in
 * Engineering/dbtlData.ts — only the colour palette is genuinely per-tab
 * for those so far.
 */
const TAB_ITERATIONS: Record<string, Iteration[] | undefined> = {
  "bacterial-encapsulation": BACTERIAL_ENCAPSULATION_ITERATIONS,
};
// The five Engineering tabs as glass spheres — see EcosystemMap's own doc
// comment for the shared component's behaviour. Colours and illustrations
// reuse Experiments' own ecosystem map wherever the block is the same —
// see Experiments.tsx's own comment for why encapsulation/revalorisation
// are pushed away from --lab-encapsulation/the original mustard. Hardware
// is new to this page, so it gets its own coral accent (--phosphate,
// otherwise unused by either map now that Revalorisation uses gold) and
// its own reactor/filter illustration (assets/experiments/ecosystem-map/
// hardware.png) rather than the generic bolt icon tried first.
const ENGINEERING_ECOSYSTEM_ITEMS: EcosystemMapItem[] = [
  {
    id: "genetic-engineering",
    label: ["Genetic", "engineering"],
    color: "#3f7d4a",
    image: "assets/experiments/ecosystem-map/bacteria.png",
    alt: "Engineered bacterium illustration",
    left: 2,
    top: 30,
    width: 12.5,
    imageSize: 84,
    home: [50, 190],
  },
  {
    id: "bacterial-encapsulation",
    label: ["Bacterial", "encapsulation"],
    color: "#1568a3",
    image: "assets/experiments/ecosystem-map/alginate.png",
    alt: "Alginate capsule illustration",
    left: 22.5,
    top: 6,
    width: 13,
    imageSize: 88,
    home: [320, 80],
  },
  {
    id: "enzymatic-immobilisation",
    label: ["Enzymatic", "immobilisation"],
    color: "#6b4e9a",
    image: "assets/experiments/ecosystem-map/enzyme.png",
    alt: "Protein ribbon structure illustration",
    left: 43,
    top: 40,
    width: 12,
    imageSize: 80,
    home: [590, 220],
  },
  {
    id: "hardware",
    label: ["Hardware"],
    color: "var(--phosphate)",
    image: "assets/experiments/ecosystem-map/hardware.png",
    alt: "Reactor filter cartridge illustration",
    left: 63.5,
    top: 16,
    width: 12.5,
    imageSize: 82,
    home: [860, 130],
  },
  {
    id: "revalorisation",
    label: ["Revalorisation"],
    color: "#c99a06",
    image: "assets/experiments/ecosystem-map/revalorisation.png",
    alt: "Star illustration",
    left: 84,
    top: 24,
    width: 12.5,
    imageSize: 70,
    home: [1130, 170],
  },
];

// Bacterial encapsulation keeps the original teal → --microbe purple scale
// exactly — untouched, per explicit request. The other four now stay
// within their own section's accent hue (matching the ecosystem map above)
// instead of sweeping across an unrelated stretch of the hue wheel.
// Hardware's previous blue-grey sweep is kept below as
// HARDWARE_GRADIENT_REFERENCE, unused but preserved for possible reuse.
const ENGINEERING_PALETTES: Record<string, DbtlPalette> = {
  "genetic-engineering": {
    hFrom: 122,
    hTo: 138,
    sFrom: 34,
    sTo: 46,
    lFrom: 38,
    lTo: 48,
  },
  "bacterial-encapsulation": {
    hFrom: 182,
    hTo: 257,
    sFrom: 46,
    sTo: 27,
    lFrom: 37,
    lTo: 47,
  },
  "enzymatic-immobilisation": {
    hFrom: 255,
    hTo: 271,
    sFrom: 34,
    sTo: 46,
    lFrom: 42,
    lTo: 52,
  },
  hardware: { hFrom: 6, hTo: 20, sFrom: 58, sTo: 68, lFrom: 46, lTo: 54 },
  revalorisation: {
    hFrom: 38,
    hTo: 50,
    sFrom: 60,
    sTo: 72,
    lFrom: 42,
    lTo: 52,
  },
};

// Kept only as a reference for the colour treatment — not wired into
// ENGINEERING_PALETTES above. Hardware's spiral now uses the coral accent
// shared with its ecosystem-map sphere instead.
const HARDWARE_GRADIENT_REFERENCE: DbtlPalette = {
  hFrom: 214,
  hTo: 238,
  sFrom: 16,
  sTo: 24,
  lFrom: 40,
  lTo: 50,
};
void HARDWARE_GRADIENT_REFERENCE;

// Enzymatic immobilisation's real write-up splits its original 5-iteration
// palette scale into two spirals of 3 and 2 iterations each (positions 0-2
// and 3-4 of that scale — see slicePalette in DbtlCycle.tsx) rather than
// each spiral getting the full hue range on its own, which is what keeps
// the second spiral's gradient a continuation of the first's instead of a
// restart.
const ENZYME_PRODUCTION_PALETTE = slicePalette(
  ENGINEERING_PALETTES["enzymatic-immobilisation"],
  0,
  0.5,
);
const IMMOBILISATION_CHEMISTRY_PALETTE = slicePalette(
  ENGINEERING_PALETTES["enzymatic-immobilisation"],
  0.75,
  1,
);

// Genetic engineering's real write-up follows the same two-thread, one-
// continuous-palette pattern as Enzymatic immobilisation above: "Cloning"
// (3 iterations) and "CRISPR" (2 iterations) split the same 5-step
// genetic-engineering palette scale rather than each getting the full hue
// range, so CRISPR's spiral continues Cloning's gradient instead of
// restarting it.
const CLONING_PALETTE = slicePalette(
  ENGINEERING_PALETTES["genetic-engineering"],
  0,
  0.5,
);
const CRISPR_PALETTE = slicePalette(
  ENGINEERING_PALETTES["genetic-engineering"],
  0.75,
  1,
);

export function Engineering() {
  // No block is selected on load -- the ecosystem map starts fully
  // neutral (see EcosystemMap's own doc comment) and the page shows a
  // plain prompt below it (.engineering-empty-state) until a sphere is
  // actually clicked. `null` is also what a click outside the map, or
  // re-clicking the pinned sphere, hands back via handleTabChange.
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLHRElement | null>(null);

  // Clicking the page header/hero above the map (rendered as a sibling by
  // <Header>, see App.tsx's route table) also returns to the neutral
  // "select a block" state, same as clicking the map's own blank
  // background (see EcosystemMap's handleMapClick). Deliberately scoped to
  // just `.page-hero` -- ordinary page content below (DBTL text, tabs,
  // figures, links, ...) must never clear a selection a reader is in the
  // middle of.
  useEffect(() => {
    function handleHeroClick(e: MouseEvent) {
      if ((e.target as HTMLElement).closest(".page-hero")) {
        setActiveTab(null);
      }
    }
    document.addEventListener("click", handleHeroClick);
    return () => document.removeEventListener("click", handleHeroClick);
  }, []);

  // The persistent corner sphere (EcosystemMapMini) only makes sense once
  // the full-size index has scrolled out of view — otherwise the same
  // block would be shown twice at once. `top < 0` (not just "not
  // intersecting", which is also true before the page has scrolled at
  // all) is what actually means "scrolled past", not "not reached yet".
  const [pastIndex, setPastIndex] = useState(false);
  useEffect(() => {
    const el = dividerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastIndex(entry.boundingClientRect.top < 0),
      {
        threshold: 0,
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The lateral DbtlSectionNav (below) no longer needs a scroll-visibility
  // signal of its own at all -- it's now a structural grid item
  // (.engineering-nav-layout, rendered below) sticky-positioned exactly
  // like the shared PageSectionNav's own .page-section-nav, so it's simply
  // present for as long as it's mounted (i.e. for as long as a block is
  // selected) and native `position: sticky` + normal layout boundaries
  // decide when it starts/stops sticking — no IntersectionObserver, no
  // JS visibility state, matching Experiments/Project Description exactly.

  // Marks "reached the end of this block's own content" -- a sentinel
  // sitting right above the prev/next footer nav (see the render below),
  // so it comes into view exactly when the last DbtlCycle's tall
  // sticky-scroller has fully scrolled past. That is also the moment the
  // corner EcosystemMapMini (a "back to the full map" affordance) should
  // step aside for the footer nav instead of overlapping it. Unlike
  // pastIndex above, this sentinel lives inside the per-tab conditional and
  // is a fresh DOM node on every tab switch, so the effect re-subscribes on
  // `activeTab` (and resets to false first -- otherwise the new tab would
  // briefly inherit the previous tab's "reached the end" state).
  const [pastBlockEnd, setPastBlockEnd] = useState(false);
  const blockEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setPastBlockEnd(false);
    const el = blockEndRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastBlockEnd(entry.isIntersecting),
      {
        threshold: 0,
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeTab]);

  // Switching tabs swaps in a completely different DbtlCycle (a different
  // spiral, a different total scroll length) via its `key` — if the page
  // stayed at whatever scrollY the previous tab happened to be scrolled to,
  // the new tab could open anywhere from its own start to well past its
  // end. Scrolling back to the top of .content-page on every tab change
  // always lands the user at the new spiral's beginning, regardless of
  // where they were in the old one.
  function handleTabChange(id: string | null) {
    setActiveTab(id);
    // Deselecting (id === null, from the map's own blank-space click) should
    // never yank the page back up to the map -- only a real tab switch does
    // that, same as before. The hero-click path above sets activeTab
    // directly and never calls this at all, for the same reason.
    if (id === null) return;
    const el = pageRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: "smooth" });
  }

  // Feeds the single shared <DbtlSectionNav> below (see that component's
  // own doc comment for why it now lives here rather than one instance per
  // spiral): each mounted DbtlCycle reports its own scroll-driven active
  // iteration/phase back up through onActiveChange, and its
  // DbtlCycleHandle ref is what lets a nav click jump that specific
  // spiral, even when it isn't the one the user happens to be scrolled
  // through right now (e.g. jumping straight from "Enzyme production" to
  // "Immobilisation chemistry"). Three slots cover every shape a block can
  // take -- a single spiral, or the two enzymatic-immobilisation threads --
  // never more than one or two of them mounted at once.
  const singleCycleRef = useRef<DbtlCycleHandle | null>(null);
  const [singleActive, setSingleActive] = useState({ iteration: 0, phase: 0 });
  const productionCycleRef = useRef<DbtlCycleHandle | null>(null);
  const [productionActive, setProductionActive] = useState({
    iteration: 0,
    phase: 0,
  });
  const chemistryCycleRef = useRef<DbtlCycleHandle | null>(null);
  const [chemistryActive, setChemistryActive] = useState({
    iteration: 0,
    phase: 0,
  });
  const cloningCycleRef = useRef<DbtlCycleHandle | null>(null);
  const [cloningActive, setCloningActive] = useState({
    iteration: 0,
    phase: 0,
  });
  const crisprCycleRef = useRef<DbtlCycleHandle | null>(null);
  const [crisprActive, setCrisprActive] = useState({ iteration: 0, phase: 0 });

  // Which of the two enzymatic-immobilisation threads the reader is
  // actually scrolled into right now -- see DbtlNavGroup's own
  // isActiveBranch doc comment for why this gates which group's Iteration
  // list gets to expand its Design/Build/Test/Learn children. Only ever
  // set to a thread when that thread's own spiral reports itself in range
  // (see onRangeChange below); moving out of range never clears it, so
  // the last thread actually read stays the active branch through any
  // in-between resting/transition scroll. Reset to the first thread on
  // every fresh mount of this tab, so a repeat visit doesn't inherit
  // whichever branch was active the last time it was open.
  const [activeGroupKey, setActiveGroupKey] = useState<
    "production" | "chemistry"
  >("production");
  useEffect(() => {
    setActiveGroupKey("production");
  }, [activeTab]);

  // Same pattern as activeGroupKey above, for Genetic engineering's own
  // two threads (Cloning / CRISPR) -- kept as a separate piece of state
  // rather than widening activeGroupKey's own union, since the two tabs'
  // branch pairs are never both mounted at once and don't share a reset
  // trigger any more precisely than "activeTab changed".
  const [geneticGroupKey, setGeneticGroupKey] = useState<"cloning" | "crispr">(
    "cloning",
  );
  useEffect(() => {
    setGeneticGroupKey("cloning");
  }, [activeTab]);

  const navGroups: DbtlNavGroup[] =
    activeTab === null
      ? []
      : activeTab === "genetic-engineering"
        ? [
            {
              key: "cloning",
              heading: "Cloning",
              isActiveBranch: geneticGroupKey === "cloning",
              palette: CLONING_PALETTE,
              iterations: CLONING_ITERATIONS,
              activeIteration: cloningActive.iteration,
              activePhase: cloningActive.phase,
              onJump: (i: number, p: number) =>
                cloningCycleRef.current?.jumpToPhase(i, p),
            },
            {
              key: "crispr",
              heading: "CRISPR",
              isActiveBranch: geneticGroupKey === "crispr",
              palette: CRISPR_PALETTE,
              iterations: CRISPR_ITERATIONS,
              activeIteration: crisprActive.iteration,
              activePhase: crisprActive.phase,
              onJump: (i: number, p: number) =>
                crisprCycleRef.current?.jumpToPhase(i, p),
            },
          ]
        : activeTab === "enzymatic-immobilisation"
          ? [
              {
                key: "production",
                heading: "Enzyme production",
                isActiveBranch: activeGroupKey === "production",
                palette: ENZYME_PRODUCTION_PALETTE,
                iterations: ENZYME_PRODUCTION_ITERATIONS,
                activeIteration: productionActive.iteration,
                activePhase: productionActive.phase,
                onJump: (i: number, p: number) =>
                  productionCycleRef.current?.jumpToPhase(i, p),
              },
              {
                key: "chemistry",
                heading: "Immobilisation chemistry",
                isActiveBranch: activeGroupKey === "chemistry",
                palette: IMMOBILISATION_CHEMISTRY_PALETTE,
                iterations: IMMOBILISATION_CHEMISTRY_ITERATIONS,
                activeIteration: chemistryActive.iteration,
                activePhase: chemistryActive.phase,
                onJump: (i: number, p: number) =>
                  chemistryCycleRef.current?.jumpToPhase(i, p),
              },
            ]
          : [
              {
                key: activeTab,
                // No heading, no sibling branch to be inactive relative to
                // -- this lone group is always the active one.
                isActiveBranch: true,
                palette: ENGINEERING_PALETTES[activeTab],
                iterations: TAB_ITERATIONS[activeTab] ?? ITERATIONS,
                activeIteration: singleActive.iteration,
                activePhase: singleActive.phase,
                onJump: (i: number, p: number) =>
                  singleCycleRef.current?.jumpToPhase(i, p),
              },
            ];

  // The footer prev/next nav (rendered at the very bottom of the block,
  // below) always steps through ENGINEERING_ECOSYSTEM_ITEMS in the same
  // order as the spheres in the map above -- so "next" here always means
  // the same block a reader would find just to the right in the map.
  const activeItemIndex = ENGINEERING_ECOSYSTEM_ITEMS.findIndex(
    (item) => item.id === activeTab,
  );
  const prevBlock =
    activeItemIndex > 0
      ? ENGINEERING_ECOSYSTEM_ITEMS[activeItemIndex - 1]
      : null;
  const nextBlock =
    activeItemIndex >= 0 &&
    activeItemIndex < ENGINEERING_ECOSYSTEM_ITEMS.length - 1
      ? ENGINEERING_ECOSYSTEM_ITEMS[activeItemIndex + 1]
      : null;

  return (
    <div className="content-page" ref={pageRef}>
      <EcosystemMap
        items={ENGINEERING_ECOSYSTEM_ITEMS}
        activeId={activeTab}
        onSelect={handleTabChange}
      />
      <hr className="engineering-map-divider" ref={dividerRef} />
      {/* Nothing to anchor a "you are here" corner sphere to until a
          block is actually selected. */}
      {activeTab && (
        <EcosystemMapMini
          items={ENGINEERING_ECOSYSTEM_ITEMS}
          activeId={activeTab}
          onSelect={handleTabChange}
          visible={pastIndex && !pastBlockEnd}
        />
      )}
      {activeTab === null ? (
        <p className="engineering-empty-state">
          Select a block to explore its content.
        </p>
      ) : (
        /* Structural grid, same shared shape as Experiments/Project
           Description's own .page-with-section-nav (see Engineering.css):
           DbtlSectionNav sits in the narrow first column, sticky through
           the whole height of .engineering-content-wrap beside it -- no
           JS visibility state, native layout decides when it starts/stops
           sticking. Each DbtlCycle spiral is wrapped in
           .engineering-cycle-bleed so it still contributes its full
           (very tall) height to that column -- keeping the nav sticky
           alongside it -- while visually breaking back out to the DBTL
           spiral's own true-viewport-centred, full-bleed geometry rather
           than being squeezed into (and off-centred by) the column's own
           narrower width. See .engineering-cycle-bleed's own comment in
           Engineering.css for how it undoes that offset. */
        <div className="engineering-nav-layout">
          <DbtlSectionNav groups={navGroups} />
          <div className="engineering-content-wrap">
            {activeTab === "genetic-engineering" ? (
              <div className="engineering-threads">
                <p className="engineering-threads__intro">
                  The engineering of this block followed a design, build, test
                  and learn cycle across two complementary threads. The first
                  was to construct expression plasmids carrying <em>ppk1</em>{" "}
                  and <em>pstSCAB</em>, the heterologous phosphate-uptake and
                  polyphosphate-storage genes from <em>Candidatus</em>{" "}
                  Accumulibacter phosphatis, built and verified in an{" "}
                  <em>E. coli</em> cloning host before the more demanding
                  transfer into <em>P. putida</em>. The second was to inactivate
                  the native <em>ppx</em>, <em>ppkB</em> and <em>pitB</em> genes
                  by CRISPR base editing, removing pathways that could otherwise
                  limit intracellular phosphorus retention. The two threads ran
                  in parallel rather than in sequence, and in both, construct
                  identity rather than a single successful-looking result was
                  the actual bar for moving a candidate forward.
                </p>
                <section className="engineering-thread">
                  <h2 className="engineering-thread__title">1. Cloning</h2>
                  <div className="engineering-cycle-bleed">
                    <DbtlCycle
                      key={`${activeTab}-cloning`}
                      ref={cloningCycleRef}
                      palette={CLONING_PALETTE}
                      iterations={CLONING_ITERATIONS}
                      onActiveChange={(iteration, phase) =>
                        setCloningActive({ iteration, phase })
                      }
                      onRangeChange={(inRange) =>
                        inRange && setGeneticGroupKey("cloning")
                      }
                    />
                  </div>
                </section>
                <section className="engineering-thread">
                  <h2 className="engineering-thread__title">2. CRISPR</h2>
                  <div className="engineering-cycle-bleed">
                    <DbtlCycle
                      key={`${activeTab}-crispr`}
                      ref={crisprCycleRef}
                      palette={CRISPR_PALETTE}
                      iterations={CRISPR_ITERATIONS}
                      onActiveChange={(iteration, phase) =>
                        setCrisprActive({ iteration, phase })
                      }
                      onRangeChange={(inRange) =>
                        inRange && setGeneticGroupKey("crispr")
                      }
                    />
                  </div>
                </section>
              </div>
            ) : activeTab === "enzymatic-immobilisation" ? (
              <div className="engineering-threads">
                <p className="engineering-threads__intro">
                  The engineering of this block followed a design, build, test
                  and learn cycle across two coupled fronts. The first was to
                  decide which phosphohydrolases to make and then to produce
                  them in <em>E. coli</em> in soluble, active form. The second
                  was to work out a chemistry that fixes those enzymes onto a
                  support without destroying the very activity we needed. The
                  two fronts are threaded: the enzymes had to exist before they
                  could be immobilised, but the immobilisation chemistry could
                  not wait for the full panel to be produced, so a model enzyme
                  was used to develop it in parallel. Throughout, the useful
                  engineering signal was rarely the first result of an
                  experiment. It was how the question we were actually asking
                  changed as each result came in.
                </p>
                <section className="engineering-thread">
                  <h2 className="engineering-thread__title">
                    1. Enzyme production
                  </h2>
                  <div className="engineering-cycle-bleed">
                    <DbtlCycle
                      key={`${activeTab}-production`}
                      ref={productionCycleRef}
                      palette={ENZYME_PRODUCTION_PALETTE}
                      iterations={ENZYME_PRODUCTION_ITERATIONS}
                      onActiveChange={(iteration, phase) =>
                        setProductionActive({ iteration, phase })
                      }
                      onRangeChange={(inRange) =>
                        inRange && setActiveGroupKey("production")
                      }
                    />
                  </div>
                </section>
                <section className="engineering-thread">
                  <h2 className="engineering-thread__title">
                    2. Immobilisation chemistry
                  </h2>
                  <div className="engineering-cycle-bleed">
                    <DbtlCycle
                      key={`${activeTab}-chemistry`}
                      ref={chemistryCycleRef}
                      palette={IMMOBILISATION_CHEMISTRY_PALETTE}
                      iterations={IMMOBILISATION_CHEMISTRY_ITERATIONS}
                      onActiveChange={(iteration, phase) =>
                        setChemistryActive({ iteration, phase })
                      }
                      onRangeChange={(inRange) =>
                        inRange && setActiveGroupKey("chemistry")
                      }
                    />
                  </div>
                </section>
              </div>
            ) : (
              <div className="engineering-cycle-bleed">
                <DbtlCycle
                  key={activeTab}
                  ref={singleCycleRef}
                  palette={ENGINEERING_PALETTES[activeTab]}
                  iterations={TAB_ITERATIONS[activeTab]}
                  onActiveChange={(iteration, phase) =>
                    setSingleActive({ iteration, phase })
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab && (prevBlock || nextBlock) && (
        <>
          {/* Purely a scroll-position sentinel -- see the pastBlockEnd
              effect above. Sits right before the nav it gates so "reached
              the end" and "the nav is now the thing to look at" are the
              same moment. */}
          <div
            className="engineering-block-nav-sentinel"
            ref={blockEndRef}
            aria-hidden="true"
          />
          <nav
            className="engineering-block-nav"
            aria-label="Adjacent Engineering blocks"
          >
            {prevBlock ? (
              <button
                type="button"
                className="engineering-block-nav__link engineering-block-nav__link--prev"
                onClick={() => handleTabChange(prevBlock.id)}
              >
                <span
                  className="engineering-block-nav__sphere"
                  style={
                    { "--eco-color": prevBlock.color } as React.CSSProperties
                  }
                >
                  <img src={asset(prevBlock.image)} alt="" />
                </span>
                <span className="engineering-block-nav__text">
                  <span className="engineering-block-nav__eyebrow">
                    Previous
                  </span>
                  <span className="engineering-block-nav__label">
                    <span
                      className="engineering-block-nav__arrow"
                      aria-hidden="true"
                    >
                      &larr;
                    </span>
                    {prevBlock.label.join(" ")}
                  </span>
                </span>
              </button>
            ) : (
              <span />
            )}
            {nextBlock ? (
              <button
                type="button"
                className="engineering-block-nav__link engineering-block-nav__link--next"
                onClick={() => handleTabChange(nextBlock.id)}
              >
                <span className="engineering-block-nav__text">
                  <span className="engineering-block-nav__eyebrow">Next</span>
                  <span className="engineering-block-nav__label">
                    {nextBlock.label.join(" ")}
                    <span
                      className="engineering-block-nav__arrow"
                      aria-hidden="true"
                    >
                      &rarr;
                    </span>
                  </span>
                </span>
                <span
                  className="engineering-block-nav__sphere"
                  style={
                    { "--eco-color": nextBlock.color } as React.CSSProperties
                  }
                >
                  <img src={asset(nextBlock.image)} alt="" />
                </span>
              </button>
            ) : (
              <span />
            )}
          </nav>
        </>
      )}
    </div>
  );
}
