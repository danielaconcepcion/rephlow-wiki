import { useEffect, useRef, useState } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  type Simulation,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3-force";
import { zoom as d3zoom, zoomIdentity, type ZoomTransform } from "d3-zoom";
import { select } from "d3-selection";
import { asset } from "../../utils";

/**
 * Genome-scale metabolic network for the Model page (./Model.tsx) — the
 * iJN1463 flux network under the rePhlow objective-function scenarios (see
 * scripts/generate-metabolic-network.mjs for how the source Fluxer exports
 * become the generated JSON this component fetches).
 *
 * Rendered on a plain <canvas> with a live d3-force simulation, mirroring
 * Fluxer's own interaction style, rather than through a graph library:
 * zoom/pan via d3-zoom, hover/drag via manual hit-testing against the
 * simulation's nodes, and dragging reheats the *whole* network (not just
 * the dragged node's neighborhood) so the rest of the graph visibly
 * responds. Node positions are not precomputed: every node starts at
 * whatever d3-force's own default initial placement gives it (see the
 * `nodes` array below), which costs nothing beyond constructing the
 * simulation, and the force layout takes it from there.
 */

// Per-scenario override for a node or edge: whether it's part of that
// scenario's flux distribution at all ("active"), and if so its flux (and,
// for edges, the shared-scale fluxNorm — see the preprocessing script).
interface ScenarioState {
  flux?: number | null;
  fluxNorm?: number;
  active: number;
}

interface RawNodeData {
  id: string;
  label: string;
  kind: "reaction" | "metabolite";
  name: string;
  subsystem?: string;
  subsystemIndex?: number;
  localization?: string | null;
  flux?: number;
  active: number;
  scenarios: Record<string, ScenarioState>;
}

interface RawEdgeData {
  id: string;
  source: string;
  target: string;
  flux: number;
  fluxNorm: number;
  active: number;
  scenarios: Record<string, ScenarioState>;
}

interface ScenarioMeta {
  id: string;
  label: string;
  sourceFile: string;
  nodeCount: number;
  edgeCount: number;
}

interface NetworkPayload {
  scenarios: ScenarioMeta[];
  defaultScenario: string;
  elements: {
    nodes: { data: RawNodeData }[];
    edges: { data: RawEdgeData }[];
  };
}

// d3-force mutates x/y/vx/vy in place every tick, and replaces a link's
// source/target with direct node references after the first tick.
// `active`/`flux`/`fluxNorm` are the CURRENT scenario's logical values
// (mutated immediately on switch); `opacity`/`renderFluxNorm` are this
// component's own animated, currently-*rendered* values, eased toward
// those targets over SCENARIO_TRANSITION_MS — Canvas has no CSS-transition
// equivalent, so that easing is done by hand in tickTransition() below.
interface SimNode extends SimulationNodeDatum, RawNodeData {
  opacity: number;
  opacityFrom: number;
}
interface SimLink extends SimulationLinkDatum<SimNode> {
  id: string;
  flux: number;
  fluxNorm: number;
  active: number;
  scenarios: Record<string, ScenarioState>;
  opacity: number;
  opacityFrom: number;
  renderFluxNorm: number;
  fluxNormFrom: number;
}

interface Tooltip {
  x: number;
  y: number;
  lines: string[];
}

// Deterministic categorical hue sequence: the golden angle spreads any
// number of subsystems around the color wheel with minimal repeats between
// neighboring indices, without needing a hand-picked, fixed-size palette.
// Saturation/lightness are kept moderate (not neon) to read as "restrained"
// alongside the rest of the wiki's muted science palette.
const GOLDEN_ANGLE = 137.508;
function subsystemColor(subsystemIndex: number): string {
  const hue = (subsystemIndex * GOLDEN_ANGLE) % 360;
  return `hsl(${hue.toFixed(1)}, 48%, 52%)`;
}
function formatFlux(value: number): string {
  const abs = Math.abs(value);
  if (abs === 0) return "0";
  if (abs < 1e-3 || abs >= 1e4) return value.toExponential(2);
  return `${value.toPrecision(3)}`.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
}
function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
function nodeTooltipLines(n: SimNode): string[] {
  if (n.kind === "reaction") {
    return [n.id, n.name, `Subsystem: ${n.subsystem ?? ""}`, `Flux: ${formatFlux(n.flux ?? 0)}`];
  }
  const lines = [n.id, n.name];
  if (n.localization) lines.push(`Localization: ${capitalize(n.localization)}`);
  return lines;
}

const REACTION_HALF_SIZE = 4.5; // 9x9 reaction squares
const METABOLITE_RADIUS = 3.5; // 7px metabolite circles
const EDGE_WIDTH_MIN = 0.25;
const EDGE_WIDTH_MAX = 2.2;
const HIT_RADIUS_PX = 10; // screen pixels; converted to graph-space via /transform.k
const GRAPH_PADDING = 24;
const SCENARIO_TRANSITION_MS = 350;

// Physics tuning: link/repulsion values chosen for a readable density at
// this graph's size, independent of any particular starting layout.
// forceManyBody's distanceMax caps how far repulsion reaches, keeping the
// full-network drag response (see below) bounded on far-apart node pairs.
const LINK_DISTANCE = 40;
const CHARGE_STRENGTH = -35;
const CHARGE_DISTANCE_MAX = 600;
// Nodes start from d3-force's own default placement (a spiral, not a
// relaxed layout), so this is a full cold start — 1 is the simulation's
// own default alpha — rather than the brief warm-start a precomputed
// layout would only need.
const INITIAL_ALPHA = 1;
const DRAG_ALPHA_TARGET = 0.3;

function getEventPoint(event: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): [number, number] {
  const rect = canvas.getBoundingClientRect();
  if ("touches" in event) {
    const t = event.touches[0] ?? event.changedTouches[0];
    return [t.clientX - rect.left, t.clientY - rect.top];
  }
  return [event.clientX - rect.left, event.clientY - rect.top];
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

// Fixed 3-position axis for the objective-function slider: left = pure
// biomass, right = pure polyphosphate, middle = the blended objective —
// placed at 60% along the track rather than the geometric midpoint, since
// that's the actual blend ratio (60% biomass / 40% polyphosphate) it
// represents. A slot only becomes selectable once a scenario with a
// matching id exists in the generated data (see `availableSlots` below) —
// this is how it stayed a disabled preview tick before the polyphosphate
// scenario existed, and needs no code change now that it does.
// biomassCoef/polypCoef are the actual objective-function weights each
// slot represents — rendered as the "Maximize a × Biomass + b ×
// Polyphosphate" equation, which is what visually communicates the
// scenario now (not just an unlabeled position on a track).
const OBJECTIVE_SLOTS: {
  id: string;
  shortLabel: string;
  trackFraction: number;
  biomassCoef: number;
  polypCoef: number;
}[] = [
  { id: "biomass", shortLabel: "Biomass", trackFraction: 0, biomassCoef: 1, polypCoef: 0 },
  {
    id: "biomass60_polyp40",
    shortLabel: "60% Biomass / 40% Polyphosphate",
    trackFraction: 0.6,
    biomassCoef: 0.6,
    polypCoef: 0.4,
  },
  { id: "polyphosphate", shortLabel: "Polyphosphate", trackFraction: 1, biomassCoef: 0, polypCoef: 1 },
];

// Reaction acting as the visual center of gravity for the polyphosphate
// scenario specifically (a demand/sink reaction with only one real edge of
// its own, so it wouldn't naturally end up central by topology alone). See
// the custom "polyCenter" force below.
const POLY_CENTER_NODE_ID = "DM_ppi50_c";
const POLY_CENTER_SCENARIO = "polyphosphate";
const POLY_ANCHOR_STRENGTH = 0.6; // pulls the center node itself toward the fixed graph center
const POLY_RADIAL_STRENGTH = 0.02; // pulls every other active node gently toward the center node

export function MetabolicNetworkGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const sliderDraggingRef = useRef(false);
  const applyScenarioRef = useRef<(scenarioId: string) => void>(() => {});
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [scenarios, setScenarios] = useState<ScenarioMeta[]>([]);
  const [activeScenario, setActiveScenario] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const cleanupFns: (() => void)[] = [];

    async function init() {
      let payload: NetworkPayload;
      try {
        const res = await fetch(asset("generated/metabolic-network.json"));
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        payload = await res.json();
      } catch (err) {
        console.error("Failed to load metabolic network data:", err);
        if (!cancelled) setStatus("error");
        return;
      }

      if (cancelled || !containerRef.current || !canvasRef.current) return;

      const rootStyle = getComputedStyle(document.documentElement);
      const metaboliteColor = (rootStyle.getPropertyValue("--ink-soft") || "#4A5170").trim();
      const bodyFont = (rootStyle.getPropertyValue("--font-body") || "Inter, Segoe UI, sans-serif")
        .replace(/['"]/g, "")
        .trim();

      // The FULL union graph (every node/edge that appears in *any*
      // scenario) is kept in the simulation permanently — never added to or
      // removed from — so switching scenarios only has to toggle each
      // element's rendered opacity/width. Node identity is therefore
      // preserved across switches by construction: nothing is ever rebuilt.
      // Elements inactive in the default scenario start at opacity 0 (still
      // simulated, just invisible) so they're ready to fade in later.
      //
      // No initial x/y is set here: d3-force gives every node lacking one a
      // deterministic position for free (a golden-angle spiral around the
      // origin, assigned once when the simulation below is constructed) —
      // the cheapest possible starting point, and one less thing (a
      // build-time layout step and its own devDependency) to maintain.
      const nodes: SimNode[] = payload.elements.nodes.map((n) => ({
        ...n.data,
        opacity: n.data.active,
        opacityFrom: n.data.active,
      }));
      const nodeById = new Map(nodes.map((n) => [n.id, n]));
      const nodeIds = new Set(nodes.map((n) => n.id));
      const links: SimLink[] = payload.elements.edges
        .filter((e) => nodeIds.has(e.data.source) && nodeIds.has(e.data.target))
        .map((e) => ({
          ...e.data,
          source: e.data.source,
          target: e.data.target,
          opacity: e.data.active,
          opacityFrom: e.data.active,
          renderFluxNorm: e.data.fluxNorm,
          fluxNormFrom: e.data.fluxNorm,
        }));

      const container = containerRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      function resizeCanvas() {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
      resizeCanvas();

      // Constructing the simulation is what actually assigns each node's
      // initial x/y (the golden-angle spiral mentioned above) — so it has
      // to happen before its bounding box can be measured for the initial
      // camera fit below. Forces/alpha/tick are attached afterward; nothing
      // about that ordering affects behavior, only when positions appear.
      const simulation: Simulation<SimNode, SimLink> = forceSimulation<SimNode>(nodes);

      // Fit that initial spiral's bounding box into the viewport so the
      // graph starts centered and legible rather than tiny/off-screen,
      // regardless of exactly how large d3-force's default placement turns
      // out to be for this many nodes.
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const n of nodes) {
        minX = Math.min(minX, n.x!);
        maxX = Math.max(maxX, n.x!);
        minY = Math.min(minY, n.y!);
        maxY = Math.max(maxY, n.y!);
      }
      const graphW = Math.max(1, maxX - minX);
      const graphH = Math.max(1, maxY - minY);
      const viewport = container.getBoundingClientRect();
      const fitScale = Math.min(
        (viewport.width - GRAPH_PADDING * 2) / graphW,
        (viewport.height - GRAPH_PADDING * 2) / graphH,
      );
      const initialK = Math.max(0.15, Math.min(8, fitScale || 1));
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;

      // The polyphosphate scenario's center node starts pre-placed at dead
      // center rather than wherever the default spiral happened to put it —
      // see the "polyCenter" force below for how it (and the rest of the
      // graph, radially) stays roughly there without being frozen in place.
      const polyCenterNode = nodeById.get(POLY_CENTER_NODE_ID);
      if (polyCenterNode) {
        polyCenterNode.x = cx;
        polyCenterNode.y = cy;
      }

      let transform: ZoomTransform = zoomIdentity
        .translate(viewport.width / 2, viewport.height / 2)
        .scale(initialK)
        .translate(-cx, -cy);

      // Scenario switches mutate this directly (see applyScenarioRef below)
      // instead of going through React state, so the tick-rate "polyCenter"
      // force always reads the *current* scenario without waiting on a
      // render.
      let currentScenario = payload.defaultScenario;

      // d3-force's built-in forceCenter always recenters on the mean
      // position of *every* simulated node, translating all of them
      // uniformly — but up to ~1200 nodes are simulated while as few as 69
      // (polyphosphate) are actually active. Both halves of that need
      // fixing here: the mean has to come from the *active* subset (else
      // it's dominated by whichever nodes are currently invisible), and the
      // resulting shift must only move that *active* subset too — shifting
      // everyone, active or not, would drag the other two scenarios'
      // currently-inactive nodes along for an arbitrarily large ride every
      // time a tiny active scenario (polyphosphate) gets recentered,
      // scattering them by the time they're switched back to. Inactive
      // nodes are left alone here; they still evolve normally under
      // link/charge, just without this corrective nudge meant for whichever
      // subset is currently on screen.
      function activeCenterForce() {
        let sx = 0;
        let sy = 0;
        let count = 0;
        for (const n of nodes) {
          if (!n.active || n.x == null || n.y == null) continue;
          sx += n.x;
          sy += n.y;
          count++;
        }
        if (count === 0) return;
        const dx = cx - sx / count;
        const dy = cy - sy / count;
        for (const n of nodes) {
          if (!n.active || n.x == null || n.y == null) continue;
          n.x += dx;
          n.y += dy;
        }
      }

      // Only active for the polyphosphate scenario (checked live every
      // tick, not baked in once): gently pulls POLY_CENTER_NODE_ID toward
      // the fixed graph center, and every other currently-active node
      // toward POLY_CENTER_NODE_ID's *current* position. Both are ordinary
      // velocity nudges scaled by alpha, exactly like d3-force's own
      // forceX — nothing is frozen (`fx`/`fy` are never set here), so
      // dragging and the normal link/charge forces still apply on top of
      // it. Biomass and 60/40 are untouched: they only ever see the
      // scenario-agnostic activeCenterForce above.
      function polyCenterForce(alpha: number) {
        if (currentScenario !== POLY_CENTER_SCENARIO) return;
        const anchor = nodeById.get(POLY_CENTER_NODE_ID);
        if (!anchor || anchor.x == null || anchor.y == null) return;
        anchor.vx = (anchor.vx ?? 0) + (cx - anchor.x) * POLY_ANCHOR_STRENGTH * alpha;
        anchor.vy = (anchor.vy ?? 0) + (cy - anchor.y) * POLY_ANCHOR_STRENGTH * alpha;
        for (const n of nodes) {
          if (n === anchor || !n.active || n.x == null || n.y == null) continue;
          n.vx = (n.vx ?? 0) + (anchor.x - n.x) * POLY_RADIAL_STRENGTH * alpha;
          n.vy = (n.vy ?? 0) + (anchor.y - n.y) * POLY_RADIAL_STRENGTH * alpha;
        }
      }

      simulation
        .force(
          "link",
          forceLink<SimNode, SimLink>(links)
            .id((d) => d.id)
            .distance(LINK_DISTANCE),
        )
        .force("charge", forceManyBody<SimNode>().strength(CHARGE_STRENGTH).distanceMax(CHARGE_DISTANCE_MAX))
        .force("center", activeCenterForce)
        .force("polyCenter", polyCenterForce)
        .alpha(INITIAL_ALPHA)
        .on("tick", draw);

      // Hit-testing only ever considers elements *active in the current
      // scenario* — inactive ones stay in the simulation (see above) but
      // must not be hoverable/draggable while invisible. d3-force's own
      // `simulation.find` has no such filter, so this is a small manual
      // scan instead — cheap at this graph's size and only run on pointer
      // events, never per animation frame.
      function hitTest(sx: number, sy: number): SimNode | undefined {
        const [gx, gy] = transform.invert([sx, sy]);
        const rGraph = HIT_RADIUS_PX / transform.k;
        let best: SimNode | undefined;
        let bestDist = rGraph;
        for (const n of nodes) {
          if (!n.active) continue;
          const dx = n.x! - gx;
          const dy = n.y! - gy;
          const d = Math.hypot(dx, dy);
          if (d <= bestDist) {
            bestDist = d;
            best = n;
          }
        }
        return best;
      }

      // --- d3-zoom drives pan/zoom over the whole graph. Its own gesture
      // is filtered out wherever a node hit-test succeeds, so a pointer
      // press on a node goes to our own manual drag handling below instead
      // of starting a pan. ---
      const zoomBehavior = d3zoom<HTMLCanvasElement, unknown>()
        .scaleExtent([0.15, 8])
        .filter((event: MouseEvent | TouchEvent | WheelEvent) => {
          if (event.type === "wheel") return true;
          if ("button" in event && event.button) return false;
          const [sx, sy] = getEventPoint(event as MouseEvent | TouchEvent, canvas);
          return !hitTest(sx, sy);
        })
        .on("zoom", (event) => {
          transform = event.transform;
          draw();
        });

      const selection = select(canvas);
      selection.call(zoomBehavior);
      zoomBehavior.transform(selection, transform);

      function draw() {
        ctx!.setTransform(1, 0, 0, 1, 0, 0);
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        ctx!.save();
        ctx!.scale(dpr, dpr);
        ctx!.translate(transform.x, transform.y);
        ctx!.scale(transform.k, transform.k);

        ctx!.strokeStyle = "rgba(27, 35, 64, 0.2)";
        for (const l of links) {
          if (l.opacity <= 0.001) continue;
          const s = l.source as SimNode;
          const t = l.target as SimNode;
          if (typeof s !== "object" || typeof t !== "object" || s.x == null || t.x == null) continue;
          ctx!.globalAlpha = l.opacity;
          ctx!.lineWidth = EDGE_WIDTH_MIN + l.renderFluxNorm * (EDGE_WIDTH_MAX - EDGE_WIDTH_MIN);
          ctx!.beginPath();
          ctx!.moveTo(s.x!, s.y!);
          ctx!.lineTo(t.x!, t.y!);
          ctx!.stroke();
        }

        // Labels render at every zoom level, in the same color as their
        // node — no separate ink color or zoom threshold to maintain, and
        // the label reuses the fillStyle already set for the node's own
        // shape instead of computing/setting a color a second time.
        ctx!.font = `5px ${bodyFont}`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "top";

        for (const n of nodes) {
          if (n.opacity <= 0.001) continue;
          const x = n.x!;
          const y = n.y!;
          ctx!.globalAlpha = n.opacity;
          let offset: number;
          if (n.kind === "reaction") {
            ctx!.fillStyle = subsystemColor(n.subsystemIndex ?? -1);
            ctx!.fillRect(x - REACTION_HALF_SIZE, y - REACTION_HALF_SIZE, REACTION_HALF_SIZE * 2, REACTION_HALF_SIZE * 2);
            offset = REACTION_HALF_SIZE + 2;
          } else {
            ctx!.fillStyle = metaboliteColor;
            ctx!.beginPath();
            ctx!.arc(x, y, METABOLITE_RADIUS, 0, Math.PI * 2);
            ctx!.fill();
            offset = METABOLITE_RADIUS + 2;
          }
          ctx!.fillText(n.label, x, y + offset);
        }
        ctx!.globalAlpha = 1;
        ctx!.restore();
      }

      // --- Manual hit-testing for hover + drag (no d3-drag/per-node DOM
      // elements — the whole graph is one canvas). Dragging fixes the
      // grabbed node at the pointer and reheats the *global* simulation
      // (alphaTarget, not a neighborhood-scoped layout), so the whole
      // network responds; releasing lets alpha decay back toward 0 so it
      // cools and settles again. ---
      let draggingNode: SimNode | null = null;
      let hoveredNode: SimNode | null = null;
      let lastTooltipPos: { x: number; y: number } | null = null;

      function screenPosOf(n: SimNode) {
        return { x: transform.applyX(n.x!), y: transform.applyY(n.y!) };
      }
      function showTooltipFor(n: SimNode) {
        const pos = screenPosOf(n);
        lastTooltipPos = pos;
        setTooltip({ x: pos.x, y: pos.y, lines: nodeTooltipLines(n) });
      }
      function retargetTooltip(n: SimNode) {
        const pos = screenPosOf(n);
        if (
          lastTooltipPos &&
          Math.abs(pos.x - lastTooltipPos.x) < 1.5 &&
          Math.abs(pos.y - lastTooltipPos.y) < 1.5
        ) {
          return;
        }
        showTooltipFor(n);
      }

      function handleDown(event: MouseEvent | TouchEvent) {
        const [sx, sy] = getEventPoint(event, canvas);
        const hit = hitTest(sx, sy);
        if (!hit) return;
        event.preventDefault();
        draggingNode = hit;
        hit.fx = hit.x;
        hit.fy = hit.y;
        simulation.alphaTarget(DRAG_ALPHA_TARGET).restart();
      }
      function handleMove(event: MouseEvent | TouchEvent) {
        const [sx, sy] = getEventPoint(event, canvas);
        if (draggingNode) {
          const [gx, gy] = transform.invert([sx, sy]);
          draggingNode.fx = gx;
          draggingNode.fy = gy;
          retargetTooltip(draggingNode);
          return;
        }
        const hit = hitTest(sx, sy);
        if (hit) {
          hoveredNode = hit;
          retargetTooltip(hit);
          canvas.style.cursor = "grab";
        } else if (hoveredNode) {
          hoveredNode = null;
          lastTooltipPos = null;
          setTooltip(null);
          canvas.style.cursor = "default";
        }
      }
      function handleUp() {
        if (draggingNode) {
          draggingNode.fx = null;
          draggingNode.fy = null;
          simulation.alphaTarget(0);
          draggingNode = null;
        }
      }
      function handleLeave() {
        if (!draggingNode && hoveredNode) {
          hoveredNode = null;
          lastTooltipPos = null;
          setTooltip(null);
        }
      }

      canvas.addEventListener("mousedown", handleDown);
      canvas.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
      canvas.addEventListener("mouseleave", handleLeave);
      canvas.addEventListener("touchstart", handleDown, { passive: false });
      canvas.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleUp);

      // --- Objective-function scenario switching ---
      // Canvas has no built-in style-transition system, so this hand-rolls
      // one: applyScenario() writes each element's new logical flux/active
      // (used immediately, e.g. for tooltip content and hit-test
      // eligibility) and kicks off a short requestAnimationFrame loop that
      // eases *rendered* opacity/edge-width from their current values
      // toward the new targets — independent of the physics simulation, so
      // switching never touches alpha/positions (no reheat, no jiggle).
      let transitionRAF = 0;
      let transitionStart = 0;

      function tickTransition(now: number) {
        const t = Math.min(1, (now - transitionStart) / SCENARIO_TRANSITION_MS);
        const e = easeOutCubic(t);
        for (const n of nodes) {
          n.opacity = n.opacityFrom + (n.active - n.opacityFrom) * e;
        }
        for (const l of links) {
          l.opacity = l.opacityFrom + (l.active - l.opacityFrom) * e;
          l.renderFluxNorm = l.fluxNormFrom + (l.fluxNorm - l.fluxNormFrom) * e;
        }
        draw();
        if (t < 1) {
          transitionRAF = requestAnimationFrame(tickTransition);
        } else {
          transitionRAF = 0;
        }
      }

      applyScenarioRef.current = (scenarioId: string) => {
        const enteringPolyCenter = scenarioId === POLY_CENTER_SCENARIO && currentScenario !== POLY_CENTER_SCENARIO;
        currentScenario = scenarioId;

        for (const n of nodes) {
          const state = n.scenarios[scenarioId];
          if (!state) continue;
          if (state.flux !== undefined) n.flux = state.flux ?? 0;
          n.opacityFrom = n.opacity;
          n.active = state.active;
        }
        for (const l of links) {
          const state = l.scenarios[scenarioId];
          if (!state) continue;
          if (state.flux !== undefined) l.flux = state.flux ?? 0;
          if (state.fluxNorm !== undefined) {
            l.fluxNormFrom = l.renderFluxNorm;
            l.fluxNorm = state.fluxNorm;
          }
          l.opacityFrom = l.opacity;
          l.active = state.active;
        }
        transitionStart = performance.now();
        if (!transitionRAF) transitionRAF = requestAnimationFrame(tickTransition);

        if (enteringPolyCenter) {
          // Give the "polyCenter" force above some actual ticks to work
          // with, so DM_ppi50_c and the rest of the graph visibly settle
          // toward the new center instead of the switch being purely a
          // same-position opacity fade. This decays back to 0 on its own
          // via the simulation's normal alphaDecay — nothing here keeps it
          // hot indefinitely, and switching to Biomass or 60/40 never
          // triggers it.
          simulation.alpha(Math.max(simulation.alpha(), 0.5)).restart();
        }

        if (hoveredNode) {
          if (!hoveredNode.active) {
            hoveredNode = null;
            lastTooltipPos = null;
            setTooltip(null);
          } else {
            showTooltipFor(hoveredNode);
          }
        }
      };

      function onResize() {
        resizeCanvas();
        draw();
      }
      window.addEventListener("resize", onResize);

      draw();
      if (!cancelled) {
        setScenarios(payload.scenarios);
        setActiveScenario(payload.defaultScenario);
        setStatus("ready");
      }

      cleanupFns.push(() => {
        simulation.stop();
        if (transitionRAF) cancelAnimationFrame(transitionRAF);
        window.removeEventListener("resize", onResize);
        canvas.removeEventListener("mousedown", handleDown);
        canvas.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
        canvas.removeEventListener("mouseleave", handleLeave);
        canvas.removeEventListener("touchstart", handleDown);
        canvas.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleUp);
      });
    }

    init();

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  // Re-applies whenever the user picks a different scenario. The initial
  // call (right after load, activeScenario going from "" to the default)
  // is a no-op in practice since every element already starts seeded with
  // the default scenario's opacity/values.
  useEffect(() => {
    if (activeScenario) applyScenarioRef.current(activeScenario);
  }, [activeScenario]);

  // --- Objective-function slider: a 3-stop control, not a continuous
  // range. Only slots with a matching entry in `scenarios` (fetched from
  // the generated JSON) are reachable — dragging/clicking always snaps to
  // the nearest *available* slot, so the still-unimplemented Polyphosphate
  // slot can sit on the track as a preview without being selectable. ---
  const availableSlots = OBJECTIVE_SLOTS.map((slot) => scenarios.some((s) => s.id === slot.id));
  const availableIndices = availableSlots
    .map((available, i) => (available ? i : -1))
    .filter((i) => i >= 0);
  const activeIndex = Math.max(0, OBJECTIVE_SLOTS.findIndex((slot) => slot.id === activeScenario));

  function nearestAvailableIndex(fraction: number): number | null {
    if (availableIndices.length === 0) return null;
    return availableIndices.reduce((best, i) =>
      Math.abs(OBJECTIVE_SLOTS[i].trackFraction - fraction) < Math.abs(OBJECTIVE_SLOTS[best].trackFraction - fraction)
        ? i
        : best,
    );
  }

  function selectFromClientX(clientX: number) {
    const track = sliderTrackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const fraction = rect.width === 0 ? 0 : Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const index = nearestAvailableIndex(fraction);
    if (index == null) return;
    const slot = OBJECTIVE_SLOTS[index];
    if (slot.id !== activeScenario) setActiveScenario(slot.id);
  }

  function handleSliderPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    sliderDraggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    selectFromClientX(event.clientX);
  }
  function handleSliderPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!sliderDraggingRef.current) return;
    selectFromClientX(event.clientX);
  }
  function handleSliderPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    sliderDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }
  function handleSliderKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const pos = availableIndices.indexOf(activeIndex);
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = availableIndices[Math.min(availableIndices.length - 1, Math.max(0, pos) + 1)];
      if (next !== undefined) setActiveScenario(OBJECTIVE_SLOTS[next].id);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      const prev = availableIndices[Math.max(0, pos - 1)];
      if (prev !== undefined) setActiveScenario(OBJECTIVE_SLOTS[prev].id);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveScenario(OBJECTIVE_SLOTS[availableIndices[0]].id);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveScenario(OBJECTIVE_SLOTS[availableIndices[availableIndices.length - 1]].id);
    }
  }

  const activeScenarioMeta = scenarios.find((s) => s.id === activeScenario);
  const activeSlot = OBJECTIVE_SLOTS[activeIndex];

  return (
    <div className="model-network__graph">
      {scenarios.length > 1 && (
        <div className="model-network__objective">
          {/* The equation itself is what tells the reader this switches the
              model's optimization objective — coefficients read off
              activeSlot, so the numbers are exactly what's currently
              maximized, not a separate label to keep in sync by hand. */}
          <p className="model-network__objective-equation">
            <span className="model-network__objective-keyword">Maximize</span>
            <span className="model-network__objective-term">
              <span className="model-network__objective-coef">{activeSlot.biomassCoef.toFixed(2)}</span>
              <span className="model-network__objective-operator">×</span>
              <span className="model-network__objective-var">Biomass</span>
            </span>
            <span className="model-network__objective-operator">+</span>
            <span className="model-network__objective-term">
              <span className="model-network__objective-coef">{activeSlot.polypCoef.toFixed(2)}</span>
              <span className="model-network__objective-operator">×</span>
              <span className="model-network__objective-var">Polyphosphate</span>
            </span>
          </p>

          <div
            className="model-network__objective-slider-track"
            ref={sliderTrackRef}
            role="slider"
            tabIndex={0}
            aria-label="Objective-function weighting"
            aria-valuemin={0}
            aria-valuemax={OBJECTIVE_SLOTS.length - 1}
            aria-valuenow={activeIndex}
            aria-valuetext={activeScenarioMeta?.label ?? activeSlot.shortLabel}
            onPointerDown={handleSliderPointerDown}
            onPointerMove={handleSliderPointerMove}
            onPointerUp={handleSliderPointerUp}
            onPointerCancel={handleSliderPointerUp}
            onKeyDown={handleSliderKeyDown}
          >
            <div className="model-network__objective-slider-line" />
            {OBJECTIVE_SLOTS.map((slot) => (
              <span
                key={slot.id}
                className="model-network__objective-slider-tick"
                style={{ left: `${slot.trackFraction * 100}%` }}
                data-disabled={availableSlots[OBJECTIVE_SLOTS.indexOf(slot)] ? undefined : true}
                title={availableSlots[OBJECTIVE_SLOTS.indexOf(slot)] ? undefined : `${slot.shortLabel} (coming next)`}
              />
            ))}
            <div
              className="model-network__objective-slider-handle"
              style={{ left: `${activeSlot.trackFraction * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="model-network__canvas-area" ref={containerRef}>
        <canvas ref={canvasRef} className="model-network__canvas" />

        {status === "loading" && (
          <p className="model-network__status">Loading metabolic network…</p>
        )}
        {status === "error" && (
          <p className="model-network__status">
            Could not load the metabolic network data.
          </p>
        )}

        {tooltip && (
          <div className="model-network__tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
            <strong>{tooltip.lines[0]}</strong>
            {tooltip.lines.slice(1).map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
