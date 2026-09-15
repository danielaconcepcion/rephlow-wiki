import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import {
  ITERATIONS,
  type ContentBlock,
  type Iteration,
  type Phase,
  type PhaseName,
} from "./dbtlData";
import { asset } from "../../utils";
import "./DbtlCycle.css";

/**
 * Scroll-driven Design → Build → Test → Learn cycle. Reconstructed from a
 * prototype (rePhlow_engineering_spiral_v8/v12.html) used only as a visual
 * and functional reference for the original mechanics; the loop geometry
 * itself (DESIGN_PATH/BUILD_PATH/TEST_PATH/LEARN_PATH and the 3 joint
 * arrows below) is copied verbatim from the reference spiral SVGs — the
 * numbers are never recalculated, only shifted vertically by whole
 * multiples of LOOP_SPAN to stack one iteration under the next.
 *
 * Mechanics:
 * - One `position: sticky` viewport for the whole cycle, pinned for the
 *   full scroll length of all iterations combined. All five loops live as
 *   paths in a single SVG, stacked LOOP_SPAN user-units apart. An inner
 *   `<g>` is translated once per animation frame so the loop currently
 *   being drawn stays framed, then eases to the next loop across a short,
 *   dedicated inter-iteration transition slice (TRANSITION_VH/
 *   TRANSITION_HOLD) that sits AFTER each iteration's own phase content in
 *   the scroll timeline, never sharing scroll distance with it -- so
 *   panning to the next loop can't start while Learn's own text is still
 *   being read (see buildPacing()'s own comment). The SVG clips to its
 *   viewBox (`overflow: hidden`), so this is a real panning window onto
 *   one continuous drawing, not five overlaid loops.
 * - The SVG itself is full-bleed: it breaks out of the page's centred
 *   content column to span the viewport width (`.dbtl-cycle__loop`'s
 *   left:50%/width:100vw/translateX(-50%)) and uses
 *   `preserveAspectRatio="xMidYMid slice"` — scaled uniformly to cover the
 *   box (cropping the sides where needed), never stretched off-ratio.
 * - Colour is a single `userSpaceOnUse` gradient spanning the stacked
 *   loops, referenced by every track/progress/arrow — real interpolated
 *   paint between iterations, not a step change.
 * - Each loop's dim track (one continuous path — Design→Build→Test→Learn
 *   stitched with no repeated `M`, so there's no seam of two translucent
 *   round caps meeting) is grouped with its still-dim joint arrows under a
 *   single `<g opacity>` — the browser flattens that group into one shape
 *   before applying the translucent opacity once, so two parts of the SAME
 *   loop never stack their transparency into a stain. Two different loops
 *   overlapping (e.g. mid pan-transition) stay separate groups, so that
 *   authentic double-blend is untouched.
 * - The active line (per-phase progress path, drawn via
 *   `stroke-dashoffset`) is always fully opaque with a round linecap —
 *   opaque-over-opaque never stains, so it needs no grouping trick.
 * - The 3 joint arrows per loop are not faded via opacity at all: which
 *   copy (dim, inside the flattened group, or solid, in the always-opaque
 *   layer) gets rendered is decided declaratively from React state
 *   (`activeIteration`/`activePhase`), so the swap is a plain mount/unmount
 *   in the same commit — no CSS transition on either copy, so there's no
 *   window where the dim copy has vanished and the solid one hasn't faded
 *   in yet (which is what caused the earlier flicker).
 * - Phase text: a Design/Build/Test/Learn change within one iteration
 *   plays a short horizontal slide+fade confined to the phase title/copy
 *   (phaseSlideDir/exitingPhase state below) — `.dbtl-cycle__content`
 *   itself never moves, resizes or shifts; only the two layered
 *   `.dbtl-cycle__phase-slide` panes translate inside it. An iteration
 *   boundary is untouched by this — that's still the plain state swap
 *   under the pan/crossfade above. The real `.copy` has no scrollbar of
 *   its own; its `scrollTop` is driven by the per-phase scroll progress,
 *   with a 12% read-pause at each end.
 */

const PHASE_COUNT = 4;
const READ_PAUSE = 0.12;

// Reference spiral geometry, copied verbatim — do not recalculate or
// adjust any coordinate. LOOP_SPAN is the vertical offset between one
// iteration's paths and the next, measured directly from the "two cycles"
// reference (the same shape repeated 863.45 units lower).
const VIEW_W = 1547;
const VIEW_H = 945;
const LOOP_SPAN = 863.45;

const DESIGN_PATH =
  "M1324.49 25.0498C1288.99 174.55 1519.13 377.55 1469.51 557.55C1444.69 665.55 1370.26 737.55 1320.63 782.55";
const BUILD_PATH =
  "M1320.63 782.55C1171.76 899.55 874.016 926.55 725.144 926.55C576.271 926.55 278.527 899.55 129.654 782.55";
const TEST_PATH =
  "M129.654 782.55C-19.2181 611.55 -19.2181 323.55 129.654 152.55";
const LEARN_PATH =
  "M129.654 152.55C278.527 53.5498 501.835 17.5498 725.143 17.5498C1072.51 17.5498 1494.32 89.5498 1519.13 251.55C1543.94 413.55 1518.32 677.05 1476.83 735.55C1409.8 830.05 1320.63 821.55 1320.63 917.55";

// One arrow per joint: after Design, after Build, after Test — none after
// Learn, which instead flows on into the next loop's Design.
const JOINT_ARROW_PATHS = [
  "M1274.33 817.531L1309.31 739.797L1358.36 803.219L1274.33 817.531Z",
  "M91.158 745.328L172.749 770.006L116.171 826.816L91.158 745.328Z",
  "M165.746 123.35L84.155 148.028L140.733 204.838L165.746 123.35Z",
];

// --- Pacing: scroll distance per phase scales with how much there actually
// is to read there, instead of a flat share of a fixed vh-per-iteration
// budget. A short or placeholder phase (dbtlData.ts's default content, or a
// mostly-table Build phase) gets close to the floor; a dense multi-paragraph
// phase (e.g. Enzymatic immobilisation's real write-up) gets proportionally
// more room, up to a cap so no single phase can dominate the whole scroll.
// This only changes how much scroll distance each phase is allotted — the
// spiral geometry, camera pan and text mechanics above all keep consuming a
// plain 0→1 "local"/"phaseProgress" fraction exactly as before, computed
// from a non-uniform lookup instead of a uniform division (see `pacing`
// below and its use in apply()).
const MIN_PHASE_VH = 85;
const MAX_PHASE_VH = 300;
const VH_PER_WORD = 0.75;
// Scanning a table row or a list item takes longer than its word count
// alone suggests — a flat per-cell/per-item bonus approximates that.
const TABLE_CELL_BONUS = 1.5;
const LIST_ITEM_BONUS = 2;
// A figure placeholder has no body text to weigh, but still deserves a
// deliberate pause — treated as a fixed, modest word-count equivalent
// (a short paragraph's worth) rather than 0, so it doesn't flash past
// during the scroll the way an empty block would.
const FIGURE_WEIGHT = 40;

// A short, dedicated scroll budget for the geometric pan/crossfade into the
// next iteration -- appended AFTER an iteration's own phase content (see
// buildPacing() below), never carved out of it, so Learn's own reading
// window is never shortened to make room for it. There's no text to read
// here, only the connector traversal, so it's deliberately much smaller
// than even MIN_PHASE_VH -- it should read as fast, not paced like content.
const TRANSITION_VH = 70;
// The first slice of TRANSITION_VH is a genuine standstill: Learn's text
// has already fully finished by the time this budget is even reached (see
// `local`, clamped to 1 once an iteration's content is done), so this is
// purely the "very short resting moment" before the spiral starts actually
// travelling -- not more reading time. The remaining (1 - this) fraction is
// where the pan/crossfade itself plays out.
const TRANSITION_HOLD = 0.22;

function textWordCount(text: string): number {
  const stripped = text.replace(/\*\*|\{\{|\}\}|\*/g, " ");
  const matches = stripped.trim().match(/\S+/g);
  return matches ? matches.length : 0;
}

function blockWeight(block: ContentBlock): number {
  if (block.type === "p") return textWordCount(block.text);
  if (block.type === "ul") {
    return (
      block.items.reduce((sum, item) => sum + textWordCount(item), 0) +
      block.items.length * LIST_ITEM_BONUS
    );
  }
  if (block.type === "figure") {
    return FIGURE_WEIGHT + textWordCount(block.caption);
  }
  const headerWords = block.headers.reduce(
    (sum, h) => sum + textWordCount(h),
    0,
  );
  const cellWords = block.rows.reduce(
    (sum, row) =>
      sum + row.reduce((rowSum, c) => rowSum + textWordCount(c.text), 0),
    0,
  );
  const cellCount = block.rows.length * block.headers.length;
  return headerWords + cellWords + cellCount * TABLE_CELL_BONUS;
}

function phaseWeight(ph: Phase): number {
  return ph.blocks.reduce((sum, b) => sum + blockWeight(b), 0);
}

function phaseVh(weight: number): number {
  return Math.min(MAX_PHASE_VH, Math.max(MIN_PHASE_VH, weight * VH_PER_WORD));
}

/** Cumulative, 0→1-normalised scroll-fraction lookup tables built once from
 * an `Iteration[]`'s real content. Each iteration i now occupies TWO
 * adjacent slices of the overall scroller rather than one: its own phase
 * content (`contentStart[i]` to `contentEnd[i]`), immediately followed --
 * for every iteration but the last -- by a fixed TRANSITION_VH slice for
 * the pan/crossfade into iteration i+1 (`contentEnd[i]` to
 * `contentStart[i+1]`, which sits between the two and belongs to neither
 * iteration's own reading content). Keeping that transition slice a
 * SEPARATE budget, appended after content rather than carved out of it, is
 * what stops the tail end of Learn from ever double-booking scroll
 * distance with the spiral's own pan into the next loop -- the bug this
 * two-slice-per-iteration shape replaced a single `iterCum` boundary to
 * fix (see apply()'s own local/travel split below, and the doc comment at
 * the top of this file).
 * `phaseCumPerIter[i][j]` is where phase j begins within iteration i, as a
 * fraction of just that iteration's own CONTENT span (never the trailing
 * transition slice) -- unchanged in meaning from before. */
function buildPacing(iterations: Iteration[]) {
  const phaseVhs = iterations.map((iter) =>
    iter.phases.map((ph) => phaseVh(phaseWeight(ph))),
  );
  const contentVhs = phaseVhs.map((vhs) => vhs.reduce((a, b) => a + b, 0));
  // No transition slice trails the very last iteration -- there's no next
  // loop to pan to.
  const transitionVhs = contentVhs.map((_, i): number =>
    i < iterations.length - 1 ? TRANSITION_VH : 0,
  );
  const totalVh =
    contentVhs.reduce((a, b) => a + b, 0) +
    transitionVhs.reduce((a, b) => a + b, 0);

  const contentStart: number[] = [];
  const contentEnd: number[] = [];
  let cursor = 0;
  for (let i = 0; i < iterations.length; i++) {
    contentStart.push(cursor / totalVh);
    cursor += contentVhs[i];
    contentEnd.push(cursor / totalVh);
    cursor += transitionVhs[i];
  }

  const phaseCumPerIter = phaseVhs.map((vhs, i) => {
    const cum: number[] = [0];
    vhs.forEach((vh) => cum.push(cum[cum.length - 1] + vh / contentVhs[i]));
    return cum;
  });

  return { totalVh, contentStart, contentEnd, phaseCumPerIter };
}

// The text fade (see contentRef/incomingContentRef in apply()) doesn't
// split this 0→1 window exactly in half: outgoing finishes fading out at
// TEXT_FADE_OUT_END and incoming doesn't start fading in until
// TEXT_FADE_IN_START, leaving a fully-transparent hold in between (both
// layers at opacity 0) while the spiral's pan is at its most active, so
// the crossing lines never have even partially-visible text to overlap.
const TEXT_FADE_OUT_END = 0.2;
const TEXT_FADE_IN_START = 0.8;

// How long the outgoing phase's slide-out stays mounted (ms) — mirrors the
// CSS exit animation's own duration (dbtl-phase-exit-fwd/back in
// DbtlCycle.css, 0.28s) so the old content is removed right as it finishes
// animating away, never a mid-flight jump-cut.
const PHASE_SLIDE_EXIT_MS = 300;

/** Shifts every y-coordinate in a path's `d` string by `dy`. Safe here
 * because every path above uses only M/C/L commands with plain (x,y)
 * pairs, so numbers alternate x,y,x,y… in document order with no other
 * command types to break that pattern. */
function offsetPathY(d: string, dy: number): string {
  if (!dy) return d;
  let n = 0;
  return d.replace(/-?\d+(?:\.\d+)?/g, (num) => {
    const isY = n % 2 === 1;
    n++;
    return isY ? String(parseFloat(num) + dy) : num;
  });
}

function loopPaths(i: number): [string, string, string, string] {
  const dy = i * LOOP_SPAN;
  return [
    offsetPathY(DESIGN_PATH, dy),
    offsetPathY(BUILD_PATH, dy),
    offsetPathY(TEST_PATH, dy),
    offsetPathY(LEARN_PATH, dy),
  ];
}

/** Strips a leading `M x,y` so a segment can be appended to a previous one
 * that already ends at that exact point, turning 4 separate subpaths into
 * one continuous path with a single pair of caps (at the very start and
 * very end) instead of 3 internal ones. */
function stripLeadingMove(d: string): string {
  return d.replace(/^M\s*-?\d+(?:\.\d+)?,?\s*-?\d+(?:\.\d+)?\s*/, "");
}

function combinedTrack(i: number): string {
  const [d0, d1, d2, d3] = loopPaths(i);
  return [
    d0,
    stripLeadingMove(d1),
    stripLeadingMove(d2),
    stripLeadingMove(d3),
  ].join(" ");
}

function jointArrowPath(i: number, j: number): string {
  return offsetPathY(JOINT_ARROW_PATHS[j], i * LOOP_SPAN);
}

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/** 0 through TRANSITION_HOLD's own standstill slice, then eases to 1 across
 * the rest of an iteration's dedicated TRANSITION_VH budget -- drives the
 * camera pan and the text fade/hold (see apply()). `travel` is already
 * 0 for an iteration with no trailing transition (the last one) or while
 * still inside its own content, so this needs no separate `i`/`total`
 * check the way the single-budget version above it used to. */
function easedTransition(travel: number) {
  if (travel <= TRANSITION_HOLD) return 0;
  return smoothstep((travel - TRANSITION_HOLD) / (1 - TRANSITION_HOLD));
}

export interface DbtlPalette {
  hFrom: number;
  hTo: number;
  sFrom: number;
  sTo: number;
  lFrom: number;
  lTo: number;
}

/** The original teal → --microbe purple scale — used whenever a page
 * doesn't pass its own palette. */
export const DEFAULT_DBTL_PALETTE: DbtlPalette = {
  hFrom: 182,
  hTo: 257,
  sFrom: 46,
  sTo: 27,
  lFrom: 37,
  lTo: 47,
};

/** Interpolates hue the short way around the wheel — a plain linear lerp
 * between e.g. 28° and 352° would sweep the long way through green and
 * blue instead of the intended 36°-wide amber-to-coral arc. */
function lerpHue(from: number, to: number, t: number) {
  const diff = (((to - from + 540) % 360) - 180 + 360) % 360;
  return from + (diff > 180 ? diff - 360 : diff) * t;
}

/** Interpolates across a palette. Accepts a fractional position so it can
 * be sampled continuously (for the HTML chrome) as well as at integer
 * iteration indices (for the gradient stops and the index rail). */
function iterationColor(pos: number, total: number, palette: DbtlPalette) {
  const t = total > 1 ? Math.max(0, Math.min(total - 1, pos)) / (total - 1) : 0;
  const h = lerpHue(palette.hFrom, palette.hTo, t);
  const s = palette.sFrom + (palette.sTo - palette.sFrom) * t;
  const l = palette.lFrom + (palette.lTo - palette.lFrom) * t;
  return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`;
}

/** Carves out the [tFrom, tTo] ⊆ [0,1] sub-range of a palette as its own
 * standalone palette — used when one logical iteration sequence is split
 * across two separate <DbtlCycle> instances (e.g. Enzymatic immobilisation's
 * "Enzyme production" / "Immobilisation chemistry" spirals) so the second
 * one continues the same gradient instead of restarting it. Every one of
 * iterationColor's three channels (hue via the shortest-arc lerpHue,
 * saturation, lightness) is linear in t, so evaluating the parent palette
 * at tFrom/tTo and using those as the new From/To endpoints reproduces
 * exactly the same colours a full-range read would have given at those
 * points — the slice is indistinguishable from the original scale, just
 * addressed 0→1 over its own shorter span. */
export function slicePalette(
  palette: DbtlPalette,
  tFrom: number,
  tTo: number,
): DbtlPalette {
  return {
    hFrom: lerpHue(palette.hFrom, palette.hTo, tFrom),
    hTo: lerpHue(palette.hFrom, palette.hTo, tTo),
    sFrom: palette.sFrom + (palette.sTo - palette.sFrom) * tFrom,
    sTo: palette.sFrom + (palette.sTo - palette.sFrom) * tTo,
    lFrom: palette.lFrom + (palette.lTo - palette.lFrom) * tFrom,
    lTo: palette.lFrom + (palette.lTo - palette.lFrom) * tTo,
  };
}

type IterColorStyle = CSSProperties & { "--iter-color": string };

/** Inline markup used by phase content: `**bold**` for emphasis, `*italic*`
 * for taxonomic/gene names, `{{...}}` for a bracketed placeholder the team
 * flagged as still pending (kept as a distinct "pending" tag rather than
 * folded into plain bold — matching how the source document itself set it
 * apart with a red highlight), `[text](href)` for an inline link, and a
 * literal `\n` for a soft line break within one paragraph. A link's `href`
 * is one of three shapes: an internal route (starts with "/", rendered as
 * a real react-router `<Link>`), an asset path such as a protocol PDF
 * (anything else, resolved through the same `asset()` helper
 * ExperimentCard's own protocol links use, and opened in a new tab like
 * those are), or `pending:<what>` for a destination that doesn't exist yet
 * — rendered as a clearly-marked, non-navigable placeholder rather than a
 * guessed URL (see .dbtl-cycle__link--pending in DbtlCycle.css). Bold is
 * matched before italic in the alternation below, so `**text**` is never
 * misread as an empty italic run followed by stray asterisks; the link
 * pattern is matched before italic too, so a single `*` inside a link's
 * `(href)` (none of ours have one, but link text itself could in
 * principle) can't be mistaken for an italic delimiter. */
function renderRich(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex =
    /\*\*(.+?)\*\*|\{\{(.+?)\}\}|\[([^\]]+)\]\(([^)]*)\)|\*(.+?)\*|\n/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(text))) {
    if (m.index > lastIndex) nodes.push(text.slice(lastIndex, m.index));
    if (m[0] === "\n") {
      nodes.push(<br key={`br-${key++}`} />);
    } else if (m[1] !== undefined) {
      nodes.push(<strong key={`b-${key++}`}>{m[1]}</strong>);
    } else if (m[2] !== undefined) {
      nodes.push(
        <span key={`pend-${key++}`} className="dbtl-cycle__pending">
          {m[2]}
        </span>,
      );
    } else if (m[3] !== undefined) {
      const linkText = m[3];
      const href = m[4] ?? "";
      if (href.startsWith("pending:")) {
        const what = href.slice("pending:".length).replace(/-/g, " ");
        nodes.push(
          <span
            key={`link-${key++}`}
            className="dbtl-cycle__link dbtl-cycle__link--pending"
            title={`Link destination pending — ${what}`}
          >
            {linkText}
          </span>,
        );
      } else if (href.startsWith("/")) {
        nodes.push(
          <Link key={`link-${key++}`} to={href} className="dbtl-cycle__link">
            {linkText}
          </Link>,
        );
      } else {
        nodes.push(
          <a
            key={`link-${key++}`}
            href={asset(href)}
            className="dbtl-cycle__link"
            target="_blank"
            rel="noreferrer"
          >
            {linkText}
          </a>,
        );
      }
    } else if (m[5] !== undefined) {
      nodes.push(<em key={`i-${key++}`}>{m[5]}</em>);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function renderBlock(block: ContentBlock, blockKey: number): ReactNode {
  if (block.type === "p") {
    return <p key={blockKey}>{renderRich(block.text)}</p>;
  }
  if (block.type === "ul") {
    return (
      <ul key={blockKey} className="dbtl-cycle__list">
        {block.items.map((item, i) => (
          <li key={i}>{renderRich(item)}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "figure") {
    return (
      <figure key={blockKey} className="dbtl-cycle__figure">
        <div className="dbtl-cycle__figure-placeholder" aria-hidden="true">
          [ figure placeholder ]
        </div>
        <figcaption>{renderRich(block.caption)}</figcaption>
      </figure>
    );
  }
  return (
    <div key={blockKey} className="dbtl-cycle__table-wrap">
      <table className="dbtl-cycle__table">
        <thead>
          <tr>
            {block.headers.map((h, i) => (
              <th key={i}>{renderRich(h)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((c, ci) => (
                <td
                  key={ci}
                  className={c.tone ? `dbtl-cycle__cell--${c.tone}` : undefined}
                >
                  {renderRich(c.text)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {block.caption && (
        <p className="dbtl-cycle__table-caption">{block.caption}</p>
      )}
    </div>
  );
}

/** Imperative surface exposed to a parent that wants to drive this
 * spiral's scroll position from outside -- e.g. Engineering.tsx's shared
 * <DbtlSectionNav> (below), which needs to jump into whichever thread's
 * spiral the clicked nav item belongs to, not just the one it happens to
 * be rendered next to. */
export interface DbtlCycleHandle {
  jumpToPhase: (iterIndex: number, phaseIndex: number) => void;
}

export const DbtlCycle = forwardRef<
  DbtlCycleHandle,
  {
    palette?: DbtlPalette;
    iterations?: Iteration[];
    /** Fired whenever the scroll-driven active iteration/phase changes --
     * lets a parent mirror this spiral's own state into a nav rendered
     * outside this component (see DbtlCycleHandle above). Never read by
     * anything inside this component itself. */
    onActiveChange?: (iterIndex: number, phaseIndex: number) => void;
    /** Fired whenever this spiral's own sticky panel becomes (or stops
     * being) actually pinned -- true for exactly the scroll range this
     * spiral itself is on screen for. A block with more than one spiral
     * (e.g. Enzymatic immobilisation's two threads) uses this to tell
     * which one the reader is currently inside, so a shared nav can expand
     * only that one's children instead of whichever spiral last happened
     * to compute iteration 0 (see Engineering.tsx's activeGroupKey). */
    onRangeChange?: (inRange: boolean) => void;
  }
>(function DbtlCycle(
  {
    palette = DEFAULT_DBTL_PALETTE,
    iterations = ITERATIONS,
    onActiveChange,
    onRangeChange,
  },
  ref,
) {
  const total = iterations.length;
  const pacing = useMemo(() => buildPacing(iterations), [iterations]);
  // React's useId() is unique per component instance but contains colons
  // (":r0:"), which are legal in an XML/SVG id but needlessly risky inside
  // a hand-built `url(#...)` string — stripped down to a plain token. Two
  // <DbtlCycle> instances on the same page (e.g. Enzymatic immobilisation's
  // two spirals) each render their own <linearGradient>, and SVG `url(#id)`
  // references resolve against the whole HTML document, not scoped to the
  // nearest <svg> — with a shared hardcoded id, every path in every
  // instance would resolve to whichever gradient happens to appear first
  // in the DOM, which is exactly what broke the joint-arrow colours in the
  // second spiral once there were two of them on the page.
  const gradientId = `dbtl-loop-gradient-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<SVGGElement | null>(null);
  const progressRefs = useRef<(SVGPathElement | null)[][]>(
    iterations.map(() => [null, null, null, null]),
  );
  const pathLengths = useRef<number[][]>(iterations.map(() => [0, 0, 0, 0]));
  const copyRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const incomingContentRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLParagraphElement | null>(null);

  const [activeIteration, setActiveIteration] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  // See the onRangeChange doc comment above -- true for exactly the scroll
  // range this spiral's own .dbtl-cycle__sticky is actually pinned for.
  const [inRange, setInRange] = useState(false);
  // Below this width, "meet" (fit the whole loop, letterboxed) reads as
  // small and cramped — switching to "none" (stretch to fill) keeps the
  // spiral fully visible and legible instead. vector-effect on the stroke
  // (below) keeps the line's own width constant either way.
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // --- Same-iteration phase transition state (see the class comment
  // above) — purely presentational, never read by the scroll/pan logic
  // above or below it. ---
  const [phaseSlideDir, setPhaseSlideDir] = useState<1 | -1>(1);
  const [enterKey, setEnterKey] = useState(0);
  const [exitingPhase, setExitingPhase] = useState<{
    data: Phase;
    dir: 1 | -1;
    key: number;
  } | null>(null);
  const prevPhaseRef = useRef({
    iteration: activeIteration,
    phase: activePhase,
  });
  const phaseExitIdRef = useRef(0);
  const phaseExitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const prev = prevPhaseRef.current;
    if (prev.iteration === activeIteration && prev.phase !== activePhase) {
      const dir: 1 | -1 = activePhase > prev.phase ? 1 : -1;
      const outgoing = iterations[prev.iteration].phases[prev.phase];
      const id = ++phaseExitIdRef.current;
      setPhaseSlideDir(dir);
      setEnterKey(id);
      setExitingPhase({ data: outgoing, dir, key: id });
      if (phaseExitTimeoutRef.current)
        window.clearTimeout(phaseExitTimeoutRef.current);
      phaseExitTimeoutRef.current = window.setTimeout(() => {
        setExitingPhase((cur) => (cur && cur.key === id ? null : cur));
      }, PHASE_SLIDE_EXIT_MS);
    }
    prevPhaseRef.current = { iteration: activeIteration, phase: activePhase };
  }, [activeIteration, activePhase, iterations]);

  useEffect(
    () => () => {
      if (phaseExitTimeoutRef.current)
        window.clearTimeout(phaseExitTimeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    progressRefs.current.forEach((paths, i) => {
      paths.forEach((path, j) => {
        if (!path) return;
        const len = path.getTotalLength();
        pathLengths.current[i][j] = len;
        path.style.strokeDasharray = `${len} ${len}`;
        path.style.strokeDashoffset = String(len);
      });
    });

    let ticking = false;

    function apply() {
      ticking = false;
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const rect = scroller.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      const overall =
        totalScroll > 0
          ? Math.max(0, Math.min(0.999999, -rect.top / totalScroll))
          : 0;

      // True exactly while .dbtl-cycle__sticky is actually pinned (its
      // scroller has scrolled past the top of the viewport but not yet
      // past the bottom) -- see the onRangeChange doc comment above.
      const rangeNow = rect.top <= 0 && rect.bottom >= window.innerHeight;
      setInRange((prev) => (prev === rangeNow ? prev : rangeNow));

      // No opacity fade at the end: the sticky panel stays fully opaque and
      // exits purely through position:sticky's own native release — once
      // its scroller runs out of room, it simply resumes normal document
      // flow and scrolls away like any other tall element, so a following
      // spiral (or the page's own footer content) reads as a continuous
      // scroll rather than a dissolve.
      const { contentStart, contentEnd, phaseCumPerIter } = pacing;
      // Each iteration i now spans two adjacent boundaries in `overall`
      // terms: its own content (up to contentEnd[i]) and, for every
      // iteration but the last, a trailing TRANSITION_VH pan/crossfade
      // slice right after it (up to nextStart, i.e. contentStart[i + 1]).
      // `overall` landing anywhere in that trailing slice still belongs to
      // iteration i, not i + 1 -- the loop only advances once `overall`
      // reaches the NEXT iteration's own content start.
      let i = total - 1;
      for (let k = 0; k < total; k++) {
        const nextStart = k < total - 1 ? contentStart[k + 1] : 1;
        if (overall < nextStart) {
          i = k;
          break;
        }
      }
      const nextStart = i < total - 1 ? contentStart[i + 1] : 1;
      const contentSpan = contentEnd[i] - contentStart[i];
      // Clamped to 1, not left to run past it: once an iteration's own
      // content is fully read, `local` (and everything derived from it --
      // phase/phaseProgress/the copy's own scrollTop) holds at its final,
      // fully-revealed value for the whole resting + transition slice that
      // follows, rather than continuing to climb past what the phase
      // content actually has.
      const local =
        contentSpan > 0
          ? Math.max(0, Math.min(1, (overall - contentStart[i]) / contentSpan))
          : 0;
      // 0 anywhere inside the content slice, ramping 0→1 across the
      // trailing transition slice (if this iteration has one) -- see
      // easedTransition() below for the short standstill at its start.
      const transitionSpan = nextStart - contentEnd[i];
      const travel =
        transitionSpan > 0
          ? Math.max(0, Math.min(1, (overall - contentEnd[i]) / transitionSpan))
          : 0;

      const phaseCum = phaseCumPerIter[i];
      let phase = PHASE_COUNT - 1;
      for (let k = 0; k < PHASE_COUNT; k++) {
        if (local < phaseCum[k + 1]) {
          phase = k;
          break;
        }
      }
      const phaseSpan = phaseCum[phase + 1] - phaseCum[phase];
      const phaseProgress =
        phaseSpan > 0 ? (local - phaseCum[phase]) / phaseSpan : 0;
      const iterFloat = i + local;

      setActiveIteration((prev) => (prev === i ? prev : i));
      setActivePhase((prev) => (prev === phase ? prev : phase));

      const copyEl = copyRef.current;
      if (copyEl) {
        const readT = Math.max(
          0,
          Math.min(1, (phaseProgress - READ_PAUSE) / (1 - READ_PAUSE * 2)),
        );
        copyEl.scrollTop =
          readT * Math.max(0, copyEl.scrollHeight - copyEl.clientHeight);
      }

      for (let ii = 0; ii < total; ii++) {
        for (let jj = 0; jj < PHASE_COUNT; jj++) {
          const pathEl = progressRefs.current[ii][jj];
          const len = pathLengths.current[ii][jj];
          if (!pathEl || !len) continue;

          let p = 0;
          if (ii < i) p = 1;
          else if (ii === i) {
            if (jj < phase) p = 1;
            else if (jj === phase) p = phaseProgress;
          }

          pathEl.style.strokeDashoffset = String(len * (1 - p));
        }
      }

      const t = easedTransition(travel);

      if (groupRef.current) {
        groupRef.current.setAttribute(
          "transform",
          `translate(0,${-(i * LOOP_SPAN + t * LOOP_SPAN)})`,
        );
      }

      // Text-only fade/drift across the same closing stretch of Learn that
      // the camera pan (t, above) covers — the spiral itself is never
      // touched. Outgoing (current) content fades out with a slight upward
      // drift across t: 0→TEXT_FADE_OUT_END; incoming (next iteration's
      // Design, previewed) fades in with a slight downward drift across
      // t: TEXT_FADE_IN_START→1 — leaving both layers fully transparent
      // in between, while the spiral's pan is at its most active. Both are
      // driven directly off t (no CSS transition), so at t=1 the incoming
      // layer is already resting at its final opacity/position — the exact
      // instant the real state swap below makes it the new "current"
      // content — and at t=0 the outgoing layer is back at its own resting
      // opacity/position, so the handoff is seamless in both directions.
      const outT = Math.max(0, Math.min(1, t / TEXT_FADE_OUT_END));
      const inT = Math.max(
        0,
        Math.min(1, (t - TEXT_FADE_IN_START) / (1 - TEXT_FADE_IN_START)),
      );
      if (contentRef.current) {
        contentRef.current.style.opacity = String(1 - outT);
        contentRef.current.style.transform = `translate(-50%, calc(-50% - ${8 * outT}px))`;
      }
      if (incomingContentRef.current) {
        incomingContentRef.current.style.opacity = String(inT);
        incomingContentRef.current.style.transform = `translate(-50%, calc(-50% + ${8 * (1 - inT)}px))`;
      }

      if (rootRef.current) {
        rootRef.current.style.setProperty(
          "--iter-color",
          iterationColor(iterFloat, total, palette),
        );
      }

      if (cueRef.current) {
        cueRef.current.style.opacity = String(
          i === 0 ? Math.max(0, 1 - local / 0.06) : 0,
        );
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Defined inside the useImperativeHandle callback itself (rather than as
  // a standalone function referenced from its deps array) so the handle
  // only needs to change when `pacing` actually does, not on every render
  // -- a plain function declaration is a new value each render, which
  // would otherwise recreate the exposed handle needlessly often.
  useImperativeHandle(
    ref,
    () => ({
      jumpToPhase(iterIndex: number, phaseIndex: number) {
        const scroller = scrollerRef.current;
        if (!scroller) return;
        const rect = scroller.getBoundingClientRect();
        const pageTop = window.scrollY + rect.top;
        const { contentStart, contentEnd, phaseCumPerIter } = pacing;
        // Jumps land within the target phase's own CONTENT span -- never
        // inside a trailing TRANSITION_VH slice, which phaseCumPerIter was
        // never defined against in the first place.
        const contentSpan = contentEnd[iterIndex] - contentStart[iterIndex];
        const frac =
          contentStart[iterIndex] +
          phaseCumPerIter[iterIndex][phaseIndex] * contentSpan;
        const top = pageTop + frac * scroller.offsetHeight + 4;
        window.scrollTo({ top, behavior: "smooth" });
      },
    }),
    [pacing],
  );

  // Relayed to a parent-owned nav (see the DbtlCycleHandle/onActiveChange
  // doc comment above) -- deliberately not depended on `onActiveChange`
  // itself, which a parent typically passes as a fresh inline closure
  // every render; re-firing only on a real iteration/phase change is what
  // that parent's own setState call expects anyway.
  useEffect(() => {
    onActiveChange?.(activeIteration, activePhase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIteration, activePhase]);

  // Same relay pattern, for `inRange` (see its own declaration above).
  useEffect(() => {
    onRangeChange?.(inRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inRange]);

  const activeIter = iterations[activeIteration];
  const activePhaseData = activeIter.phases[activePhase];
  const nextIter =
    activeIteration < total - 1 ? iterations[activeIteration + 1] : null;

  /** A joint is "lit" once its phase has fully drawn — derived straight
   * from state (not a continuous per-frame value), so which copy of the
   * arrow renders flips in the same commit as the phase/iteration change:
   * no opacity race, no flicker. */
  function isJointLit(i: number, j: number) {
    return i < activeIteration || (i === activeIteration && j < activePhase);
  }

  return (
    <div
      className="dbtl-cycle"
      ref={rootRef}
      style={
        { "--iter-color": iterationColor(0, total, palette) } as IterColorStyle
      }
    >
      <div
        className="dbtl-cycle__scroller"
        style={{ height: `${pacing.totalVh}vh` }}
        ref={scrollerRef}
      >
        <div className="dbtl-cycle__sticky" ref={stickyRef}>
          <div className="dbtl-cycle__loop" aria-hidden="true">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio={isNarrow ? "none" : "xMidYMid meet"}
            >
              <defs>
                <linearGradient
                  id={gradientId}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={(total - 1) * LOOP_SPAN + VIEW_H}
                >
                  {iterations.map((iter, i) => (
                    <stop
                      key={iter.title}
                      offset={
                        (i * LOOP_SPAN) / ((total - 1) * LOOP_SPAN + VIEW_H)
                      }
                      stopColor={iterationColor(i, total, palette)}
                    />
                  ))}
                </linearGradient>
              </defs>
              <g ref={groupRef}>
                {/* Dim layer: each loop's track is one continuous path, grouped
                    with its still-dim joint arrows so the whole loop flattens
                    to a single blend instead of stacking translucency at each
                    phase boundary. Different loops stay separate groups, so a
                    genuine overlap between two loops still blends for real. */}
                {iterations.map((iter, i) => (
                  <g key={`dim-${iter.title}`} className="dbtl-cycle__loop-dim">
                    <path
                      className="dbtl-cycle__track"
                      d={combinedTrack(i)}
                      style={{ stroke: `url(#${gradientId})` }}
                    />
                    {[0, 1, 2].map(
                      (j) =>
                        !isJointLit(i, j) && (
                          <path
                            key={`joint-${j}`}
                            className="dbtl-cycle__joint-arrow"
                            d={jointArrowPath(i, j)}
                            style={{ fill: `url(#${gradientId})` }}
                          />
                        ),
                    )}
                  </g>
                ))}
                {/* Active layer: the drawn line and lit joint markers are always
                    fully opaque, so no grouping is needed — opaque shapes never
                    stain where they meet. */}
                {iterations.map((iter, i) => {
                  const paths = loopPaths(i);
                  return (
                    <g key={`active-${iter.title}`}>
                      {paths.map((d, j) => (
                        <path
                          key={`progress-${j}`}
                          className="dbtl-cycle__progress"
                          d={d}
                          style={{ stroke: `url(#${gradientId})` }}
                          ref={(el) => {
                            progressRefs.current[i][j] = el;
                          }}
                        />
                      ))}
                      {[0, 1, 2].map(
                        (j) =>
                          isJointLit(i, j) && (
                            <path
                              key={`joint-lit-${j}`}
                              className="dbtl-cycle__joint-arrow"
                              d={jointArrowPath(i, j)}
                              style={{ fill: `url(#${gradientId})` }}
                            />
                          ),
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="dbtl-cycle__content" ref={contentRef}>
            <p className="dbtl-cycle__eyebrow">
              Iteration {activeIteration + 1} · {activeIter.title}
            </p>
            <div className="dbtl-cycle__phase-viewport">
              {exitingPhase && (
                <div
                  key={`phase-exit-${exitingPhase.key}`}
                  className={`dbtl-cycle__phase-slide dbtl-cycle__phase-slide--exit dbtl-cycle__phase-slide--${
                    exitingPhase.dir === 1 ? "fwd" : "back"
                  }`}
                  aria-hidden="true"
                >
                  <h3 className="dbtl-cycle__phase-title">
                    {exitingPhase.data.name}
                  </h3>
                  <div className="dbtl-cycle__copy">
                    {exitingPhase.data.blocks.map((block, k) =>
                      renderBlock(block, k),
                    )}
                    <div className="dbtl-cycle__end-mark" aria-hidden="true" />
                  </div>
                </div>
              )}
              <div
                key={`phase-enter-${enterKey}`}
                className={`dbtl-cycle__phase-slide dbtl-cycle__phase-slide--enter dbtl-cycle__phase-slide--${
                  phaseSlideDir === 1 ? "fwd" : "back"
                }`}
              >
                <h3 className="dbtl-cycle__phase-title">
                  {activePhaseData.name}
                </h3>
                <div className="dbtl-cycle__copy" ref={copyRef}>
                  {activePhaseData.blocks.map((block, k) =>
                    renderBlock(block, k),
                  )}
                  <div className="dbtl-cycle__end-mark" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="dbtl-cycle__pips">
              {activeIter.phases.map((p, j) => (
                <span
                  key={p.name}
                  className={`dbtl-cycle__pip${j === activePhase ? " is-active" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* A static preview of the next iteration's Design phase, always
              in the DOM but invisible (opacity 0) except during the second
              half of the transition (t 0.5→1, see apply()), when it fades
              in to hand off to the real .dbtl-cycle__content above the
              instant state actually swaps. aria-hidden + pointer-events:none
              since it's a transient visual double of content that becomes
              properly accessible once it's the real, current box. */}
          {nextIter && (
            <div
              className="dbtl-cycle__content dbtl-cycle__content--incoming"
              ref={incomingContentRef}
              style={{ opacity: 0 }}
              aria-hidden="true"
            >
              <p className="dbtl-cycle__eyebrow">
                Iteration {activeIteration + 2} · {nextIter.title}
              </p>
              <h3 className="dbtl-cycle__phase-title">
                {nextIter.phases[0].name}
              </h3>
              <div className="dbtl-cycle__copy">
                {nextIter.phases[0].blocks.map((block, k) =>
                  renderBlock(block, k),
                )}
              </div>
              <div className="dbtl-cycle__pips">
                {nextIter.phases.map((p, j) => (
                  <span
                    key={p.name}
                    className={`dbtl-cycle__pip${j === 0 ? " is-active" : ""}`}
                  />
                ))}
              </div>
            </div>
          )}

          <p className="dbtl-cycle__scroll-cue" ref={cueRef}>
            Scroll <span>↓</span>
          </p>
        </div>
      </div>
    </div>
  );
});
DbtlCycle.displayName = "DbtlCycle";

/** One spiral's worth of nav content, as data rather than JSX -- what
 * DbtlSectionNav (below) actually renders. `heading` is only set for a
 * block with sub-blocks (e.g. Enzymatic immobilisation's two threads); a
 * single-spiral block passes one group with no heading and the nav renders
 * exactly as it always has (see that component's own doc comment).
 * `isActiveBranch` is what gates whether this group's Iteration list is
 * shown at all -- always true for a single-spiral block's one group, and
 * true for at most one of a multi-group block's groups at a time (see
 * activeGroupKey in Engineering.tsx). An inactive group collapses all the
 * way down to just its own heading; only the active group's Iterations
 * are listed, and within those, only the active Iteration's own
 * Design/Build/Test/Learn sublist expands -- both levels gated by the
 * same isActiveBranch flag, one nested inside the other (see
 * DbtlSectionNav below). */
export interface DbtlNavGroup {
  key: string;
  heading?: string;
  isActiveBranch: boolean;
  palette: DbtlPalette;
  iterations: Iteration[];
  activeIteration: number;
  activePhase: number;
  onJump: (iterIndex: number, phaseIndex: number) => void;
}

/** The DBTL spiral's left sidebar, same visual language — and, since
 * this component now lives inside Engineering.tsx's own
 * .engineering-nav-layout grid, the same structural mounting — as the
 * site's shared PageSectionNav (src/components/PageSectionNav.tsx):
 * border-left indent list, section + subsection tiers, matching type
 * scale, sticky in a grid column rather than fixed+opacity-toggled.
 * Rebuilt locally rather than reusing that component directly: its
 * active-state tracking is an IntersectionObserver over real DOM anchors,
 * but a DbtlCycle spiral has no separate per-iteration/per-phase elements
 * to observe — one sticky panel's content swaps via scroll-fraction state
 * instead (see DbtlCycle itself), which is why active state and clicks are
 * driven from state (each group's own activeIteration/activePhase/onJump)
 * rather than from anchors here too.
 *
 * Previously this nav lived inside DbtlCycle itself, one instance per
 * spiral — which meant a block with more than one spiral (Enzymatic
 * immobilisation's "Enzyme production" / "Immobilisation chemistry"
 * threads) showed only whichever spiral's own nav happened to be pinned,
 * switching abruptly between the two rather than exposing both at once.
 * Lifting it out to a single instance rendered by the page (Engineering.tsx)
 * with one DbtlNavGroup per spiral fixes that: every group's heading is
 * always in the list (a real, clickable nav level with its own active
 * state — see group.heading's onClick below — not a static label), each
 * still tracking (and jumping within) its own spiral independently via
 * that spiral's own DbtlCycleHandle. Only the currently active branch
 * (group.isActiveBranch) shows its Iteration list at all — an inactive
 * group collapses to just its heading — and within that active group's
 * Iterations, only the active one expands its own Design/Build/Test/Learn
 * children. Switching which branch you're reading never leaves a stale
 * expansion (or a stale sibling Iteration list) sitting open in the
 * other one.
 *
 * Visibility is no longer this component's own concern, or even a prop
 * the caller passes — DbtlSectionNav is simply mounted (as the first
 * child of .engineering-nav-layout, see Engineering.tsx) for exactly as
 * long as a block is selected, `position: sticky` and normal grid layout
 * boundaries deciding the rest, same as PageSectionNav's own
 * .page-section-nav. */
export function DbtlSectionNav({ groups }: { groups: DbtlNavGroup[] }) {
  return (
    <nav className="dbtl-cycle__section-nav" aria-label="DBTL iterations">
      {groups.map((group) => {
        const total = group.iterations.length;
        return (
          <div className="dbtl-cycle__section-nav-group" key={group.key}>
            {group.heading && (
              <a
                href="#"
                className={`dbtl-cycle__section-nav-link dbtl-cycle__section-nav-link--heading${group.isActiveBranch ? " is-active" : ""}`}
                style={{ "--iter-color": "var(--ink)" } as IterColorStyle}
                aria-current={group.isActiveBranch ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  group.onJump(0, 0);
                }}
              >
                {group.heading}
              </a>
            )}
            {group.isActiveBranch && (
              <ul className="dbtl-cycle__section-nav-list">
                {group.iterations.map((iter, i) => {
                  const isActiveIter = i === group.activeIteration;
                  return (
                    <li key={iter.title}>
                      <a
                        href="#"
                        className={`dbtl-cycle__section-nav-link${isActiveIter ? " is-active" : ""}`}
                        style={
                          {
                            "--iter-color": iterationColor(
                              i,
                              total,
                              group.palette,
                            ),
                          } as IterColorStyle
                        }
                        aria-current={isActiveIter ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          group.onJump(i, isActiveIter ? group.activePhase : 0);
                        }}
                      >
                        <span className="dbtl-cycle__section-nav-label">
                          Iteration {i + 1}
                        </span>
                        <span className="dbtl-cycle__section-nav-title">
                          {iter.title}
                        </span>
                      </a>

                      {isActiveIter && (
                        <ul className="dbtl-cycle__section-nav-sublist">
                          {iter.phases.map((p, j) => (
                            <li key={p.name}>
                              <a
                                href="#"
                                className={`dbtl-cycle__section-nav-link dbtl-cycle__section-nav-link--sub${j === group.activePhase ? " is-active" : ""}`}
                                style={
                                  {
                                    "--iter-color": iterationColor(
                                      i,
                                      total,
                                      group.palette,
                                    ),
                                  } as IterColorStyle
                                }
                                aria-current={
                                  j === group.activePhase ? "true" : undefined
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  group.onJump(i, j);
                                }}
                              >
                                {p.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      {/* Same "Back to top" utility as the shared PageSectionNav (see
          PageSectionNav.tsx and its .page-section-nav__top) -- a local
          class (DbtlCycle.css doesn't pull in that component's own
          stylesheet), styled to match it exactly, so the two navs stay
          visually identical even though this one is its own bespoke
          rebuild (see this component's own doc comment for why). Scrolls
          the whole page back up, not just this spiral. */}
      <button
        type="button"
        className="dbtl-cycle__section-nav-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span aria-hidden="true">↑</span> Back to top
      </button>
    </nav>
  );
}

export type { PhaseName };
