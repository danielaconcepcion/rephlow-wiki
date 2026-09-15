import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { FolderTabShape } from "./FolderTabShape";
import type { AccentStyle, CSSVarStyle, FolderDef } from "./types";

/** Capped regardless of how many folders a block has — enough to read as
 * a stack, not so many the back cards turn into visual noise. */
const MAX_BACK_CARDS = 2;

/** A row's own tint range — every row spreads its tabs evenly between
 * these two bounds by position, rather than a global step multiplied by
 * index. A block with many tabs (e.g. 9) used to keep darkening past 100%
 * mix and clip to near-black for the last few; scoping the range per row
 * means more tabs just means finer gradation, never a darker ceiling. */
const TAB_SHADE_MIN = 42;
const TAB_SHADE_MAX = 70;

function accentOverrideFor(folder: FolderDef): AccentStyle | undefined {
  return folder.variant === "protocols" ? ({ "--folder-accent": "var(--lab-protocols)" } as AccentStyle) : undefined;
}

function shadeFor(indexInRow: number, rowLength: number): number {
  if (rowLength <= 1) return TAB_SHADE_MIN;
  return TAB_SHADE_MIN + ((TAB_SHADE_MAX - TAB_SHADE_MIN) * indexInRow) / (rowLength - 1);
}

/** Splits folders into two rows balanced by *estimated* label width, not
 * raw count — labels vary too much ("Ligation" vs "Preparative digestion")
 * for a first-half/second-half split to end up visually even. Each row
 * stays a contiguous run in the original order (1,2,3,4 then 5,6,7,8,9),
 * never interleaved (1,3,6,8 in one row, the rest in the other) — a
 * numbered workflow reads as broken if step order jumps between rows. The
 * split point is just wherever the running total first reaches half the
 * combined width — specifically, whichever side of that crossing point
 * leaves the *wider* of the two rows narrower (see the includeHere/
 * excludeHere comparison below), not just the first index where the
 * running total reaches half. Stopping at the first crossing regardless of
 * overshoot could hand one row a long label that tips its own total past
 * the container's real width — the exact way this used to still wrap
 * inside a "two-row" layout (8 experiments, "Recombinant expression"
 * landing 5th in an already-full row A). Comparing both candidate splits
 * and keeping the more balanced one fixes that directly, without needing
 * the container's actual pixel width here (the caller already re-measures
 * that separately to decide *whether* two rows are needed at all). */
function splitIntoRows(folders: FolderDef[]): [FolderDef[], FolderDef[]] {
  const CHAR_WIDTH = 6.6;
  const FIXED_BUDGET = 118; // shoulders + horizontal padding + order-number circle, per tab
  const widths = folders.map((folder) => folder.label.length * CHAR_WIDTH + FIXED_BUDGET);
  const total = widths.reduce((sum, w) => sum + w, 0);

  let splitIndex = folders.length;
  let running = 0;
  for (let i = 0; i < widths.length; i++) {
    const runningWithThis = running + widths[i];
    if (runningWithThis >= total / 2) {
      const maxIfIncluded = Math.max(runningWithThis, total - runningWithThis);
      const maxIfExcluded = Math.max(running, total - running);
      splitIndex = maxIfIncluded <= maxIfExcluded ? i + 1 : i;
      break;
    }
    running = runningWithThis;
  }
  return [folders.slice(0, splitIndex), folders.slice(splitIndex)];
}

/**
 * Row-swap layout for blocks whose tabs don't fit in one row at the
 * current width (see the overflow measurement in FolderStack). splitIntoRows
 * fixes which folders live in row A vs row B once; only *which of the two
 * is currently in front* changes,
 * driven purely by where the active folder happens to live. The front row
 * sits flush against the panel at native tab height, exactly like the
 * single-row layout; the back row sits above it, backed by
 * .folder-stack__row-backdrop so its own shoulder-curve gaps don't show
 * bare page background. Swapping is a CSS `top`/`z-index` transition on
 * fixed DOM nodes — no folder ever changes size or reflows into another
 * row, and nothing needs to be measured in JS.
 */
function TwoRowTabs({
  folders,
  active,
  ariaLabel,
  renderTab,
}: {
  folders: FolderDef[];
  active: FolderDef;
  ariaLabel: string;
  renderTab: (folder: FolderDef, indexInRow: number, rowLength: number) => ReactNode;
}) {
  const [rowA, rowB] = splitIntoRows(folders);
  const rowAIsFront = rowA.some((folder) => folder.id === active.id);

  return (
    <div className="folder-stack__tabgroup" role="tablist" aria-label={ariaLabel}>
      {[rowA, rowB].map((row, rowIndex) => {
        const isFront = rowAIsFront ? rowIndex === 0 : rowIndex === 1;
        return (
          <div
            className={`folder-stack__row-wrap${isFront ? " is-front" : " is-back"}`}
            // A stable key per physical row (not per front/back slot) is
            // what makes the swap a CSS transition on existing nodes
            // rather than React unmounting and remounting each row.
            key={rowIndex}
          >
            <div className="folder-stack__row-backdrop" aria-hidden="true" />
            <div className="folder-stack__tabs">{row.map((folder, i) => renderTab(folder, i, row.length))}</div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * The layered folder-tab interface within a block: every record (experiment
 * or result) is a full folder card, not a flat tab. Tabs sit in a fixed
 * left-to-right order and are themselves folder silhouettes — rounded top
 * corners, a fixed index-based tint, small overlaps between neighbours.
 * Whichever is active steps up taller and fuses directly into its own card
 * below (matching fill, no seam); up to two of the other folders also stay
 * visible behind that card — offset down-and-right, their own tint, a hint
 * of shadow — so the whole thing reads as a stack of real folders, not a
 * tab bar. Clicking a tab, or the exposed edge of a folder peeking out from
 * behind, brings it to the front.
 *
 * A block's tabs split into two rows only once they'd actually overflow a
 * single line at the current width — never as a fixed rule based on how
 * many experiments a block happens to have (see the ResizeObserver-driven
 * measurement below: a hidden, unwrapped clone of the tab row reports its
 * natural width, compared against the real container's width every time
 * either one changes). The two rows are a fixed, one-time split (see
 * splitIntoRows) once overflow is detected — clicking a tab never
 * reshuffles which folders belong to which row. What changes is which row
 * is "front" (flush against the panel, full native tab sizes) versus
 * "back" (behind it, backed by a solid card so no gaps show through to the
 * page): row swap, not tab stretch. No folder-tab shape or size is ever
 * altered.
 */
export function FolderStack({
  folders,
  ariaLabel,
}: {
  folders: FolderDef[];
  ariaLabel: string;
}) {
  const [activeId, setActiveId] = useState(folders[0]?.id ?? "");
  const active = folders.find((folder) => folder.id === activeId) ?? folders[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // The real tabs wrap onto a second line via plain flex-wrap once they no
  // longer fit — which looks broken (uneven, no backdrop behind the
  // wrapped ones). This hidden sibling renders the same tabs with
  // flex-wrap: nowrap, so its intrinsic (unwrapped) scrollWidth is exactly
  // the space a single row would need; comparing that against the real
  // container's clientWidth tells us whether to switch to the two-row
  // layout, without ever guessing from folder count alone.
  //
  // OVERFLOW_MARGIN: a fitted row needs a little slack, not a knife-edge
  // fit. clientWidth/scrollWidth are both rounded to whole pixels, but the
  // *real* single-row layout resolves each tab's width (padding in em,
  // negative overlap margins, the shape's own geometry) in fractional
  // sub-pixels — so a case that measures as "exactly fits" can still wrap
  // for real by a hair (seen with Core-shell formation's 5 tabs: measured
  // 920 vs 920, wrapped anyway). Treating anything within this margin as
  // overflowing avoids that class of false negative.
  useLayoutEffect(() => {
    const OVERFLOW_MARGIN = 4;
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;
    function check() {
      if (!container || !measure) return;
      setIsOverflowing(measure.scrollWidth > container.clientWidth - OVERFLOW_MARGIN);
    }
    check();
    const observer = new ResizeObserver(check);
    observer.observe(container);
    return () => observer.disconnect();
  }, [folders]);

  if (!active) return null;

  const backFolders = folders.filter((folder) => folder.id !== active.id).slice(0, MAX_BACK_CARDS);
  const isTwoRow = folders.length >= 2 && isOverflowing;

  function renderTab(folder: FolderDef, indexInRow: number, rowLength: number) {
    const isActive = folder.id === active.id;
    const style: CSSVarStyle = {
      zIndex: isActive ? rowLength + 10 : indexInRow + 1,
      "--tab-shade": `${shadeFor(indexInRow, rowLength)}%`,
      ...accentOverrideFor(folder),
    };
    return (
      <button
        key={folder.id}
        type="button"
        role="tab"
        id={`folder-tab-${folder.id}`}
        aria-selected={isActive}
        aria-controls={`folder-panel-${folder.id}`}
        className={`folder-tab${folder.variant === "protocols" ? " folder-tab--protocols" : ""}${
          isActive ? " is-active" : ""
        }`}
        style={style}
        onClick={() => setActiveId(folder.id)}
      >
        <FolderTabShape className="folder-tab__shape" />
        {folder.order !== undefined && <span className="folder-tab__number">{folder.order}</span>}
        <span className="folder-tab__label">{folder.label}</span>
      </button>
    );
  }

  return (
    <div className="folder-stack" ref={containerRef}>
      {/* Invisible, unwrapped clone of the tab row — see the overflow
          measurement above. Not real tabs: plain divs, no id/aria/click,
          so nothing here duplicates the real tabs' ids or picks up focus. */}
      <div className="folder-stack__tabs-measure" ref={measureRef} aria-hidden="true">
        {folders.map((folder, index) => {
          const style: CSSVarStyle = {
            "--tab-shade": `${shadeFor(index, folders.length)}%`,
            ...accentOverrideFor(folder),
          };
          return (
            <div
              key={folder.id}
              className={`folder-tab${folder.variant === "protocols" ? " folder-tab--protocols" : ""}`}
              style={style}
            >
              <FolderTabShape className="folder-tab__shape" />
              {folder.order !== undefined && <span className="folder-tab__number">{folder.order}</span>}
              <span className="folder-tab__label">{folder.label}</span>
            </div>
          );
        })}
      </div>

      {isTwoRow ? (
        <TwoRowTabs folders={folders} active={active} ariaLabel={ariaLabel} renderTab={renderTab} />
      ) : (
        <div className="folder-stack__tabs" role="tablist" aria-label={ariaLabel}>
          {folders.map((folder, index) => renderTab(folder, index, folders.length))}
        </div>
      )}

      <div className="folder-stack__deck">
        {backFolders.map((folder, index) => (
          <button
            key={folder.id}
            type="button"
            className={`folder-stack__back folder-stack__back--${index}`}
            style={accentOverrideFor(folder)}
            aria-label={`Bring ${folder.label} to the front`}
            onClick={() => setActiveId(folder.id)}
          />
        ))}

        {/* The Protocols folder gets its own fixed colour regardless of the
            block it lives in, so its panel overrides --folder-accent here —
            the block only ever sets it at the .lab-block level (see
            Experiments.tsx / Results.tsx). */}
        <div
          key={active.id}
          className="folder-stack__panel"
          id={`folder-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`folder-tab-${active.id}`}
          style={accentOverrideFor(active)}
        >
          {active.content}
        </div>
      </div>
    </div>
  );
}
