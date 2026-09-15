import { useEffect, useRef, useState } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  type Simulation,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3-force";
import { zoom as d3zoom, zoomIdentity, type ZoomTransform } from "d3-zoom";
import { select } from "d3-selection";
import {
  loadManifest,
  loadScenario,
  resolveScenario,
  parseScenarioGraph,
  abortInFlightScenarios,
  SubsystemRegistry,
  type Manifest,
  type ManifestScenario,
  type ScenarioSelection,
  type ParsedNode,
  type ParsedScenarioGraph,
} from "./scenarioData";
import { ScenarioSidebar } from "./ScenarioSidebar";

/**
 * Genome-scale metabolic network for the Model page (./Model.tsx) — the
 * iJN1463 flux network, one manifest-described scenario at a time (see
 * ./scenarioData.ts for the manifest/fetch/cache layer and
 * scripts/sync-metabolic-network-scenarios.mjs for how the source Fluxer
 * exports become the per-scenario JSON this component fetches on demand).
 *
 * Rendered on a plain <canvas> with a live d3-force simulation, mirroring
 * Fluxer's own interaction style, rather than through a graph library:
 * zoom/pan via d3-zoom, hover/drag via manual hit-testing against the
 * simulation's nodes, and dragging reheats the *whole* network (not just
 * the dragged node's neighborhood) so the rest of the graph visibly
 * responds.
 *
 * Every node/link ever fetched this session keeps a single, permanent
 * SimNode/SimLink object (see `nodeById`/`linkById` below) — switching
 * scenarios never recreates them, only changes which ones are currently
 * "active" (physically simulated and opaque) vs. inactive (kept, at their
 * last known position/opacity, out of the simulation). That's what lets
 * zoom/pan, node positions, and drag-fixed positions survive a filter
 * change, and what makes returning to a previously visited scenario put
 * every shared node right back where it was.
 */

interface SimNode extends SimulationNodeDatum, ParsedNode {
  opacity: number;
  opacityFrom: number;
  /** 1 if this node should be visible/simulated in the *currently applied*
   * scenario, 0 if it's fading out (or already fully faded and no longer
   * in `physicsNodes`, but still remembered in `nodeById`). */
  activeTarget: 0 | 1;
}
interface SimLink extends SimulationLinkDatum<SimNode> {
  id: string;
  flux: number;
  fluxNorm: number;
  opacity: number;
  opacityFrom: number;
  renderFluxNorm: number;
  fluxNormFrom: number;
  activeTarget: 0 | 1;
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
// Slightly wider than the previous 0.25–2.2px range, so high-flux edges
// read as more clearly dominant against the now much larger range of graph
// sizes (69 to 5070 nodes) a single scenario can have.
const EDGE_WIDTH_MIN = 0.2;
const EDGE_WIDTH_MAX = 2.6;
const HIT_RADIUS_PX = 10; // screen pixels; converted to graph-space via /transform.k
const GRAPH_PADDING = 24;
const SCENARIO_TRANSITION_MS = 350;

// Physics tuning: link/repulsion values chosen for a readable density,
// independent of any particular starting layout or scenario's node count.
const LINK_DISTANCE = 40;
const CHARGE_STRENGTH = -35;
const CHARGE_DISTANCE_MAX = 600;
// d3-force's default node placement (used for any node lacking x/y — every
// node the very first time it's ever seen) is a phyllotaxis spiral around
// the origin, so the graph's fixed "center" is the origin itself, not a
// computed centroid — new nodes entering later spiral in right where the
// rest of the graph already is instead of appearing off in some
// arbitrary corner.
const GRAPH_CENTER = 0;
const INITIAL_ALPHA = 1; // cold start, first scenario ever loaded
const REHEAT_ALPHA = 0.5; // gentle reheat when a later scenario switch changes topology
const DRAG_ALPHA_TARGET = 0.3;
const ANCHOR_STRENGTH = 0.6; // pulls the active objective's target reaction toward the graph center
const RADIAL_STRENGTH = 0.02; // pulls every other active node gently toward that anchor

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

/** A link's source/target starts as a plain string id and is replaced with
 * a direct SimNode reference by d3-force the first time the link is
 * initialized — this reads the id either way. */
function endpointId(endpoint: SimNode | string): string {
  return typeof endpoint === "object" ? endpoint.id : endpoint;
}

export function MetabolicNetworkGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const applyScenarioRef = useRef<(parsed: ParsedScenarioGraph, anchorReactionId: string | null) => void>(
    () => {},
  );
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [selection, setSelection] = useState<ScenarioSelection | null>(null);
  const [isFetchingScenario, setIsFetchingScenario] = useState(false);
  const [scenarioError, setScenarioError] = useState<string | null>(null);
  const [infeasible, setInfeasible] = useState<ManifestScenario | null>(null);

  // --- Mount once: canvas, simulation shell, zoom/drag/hover wiring. Data
  // arrives later (see the scenario-fetch effect below) and is merged in
  // via applyScenarioRef.current — nothing here depends on which scenario
  // is active. ---
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rootStyle = getComputedStyle(document.documentElement);
    const metaboliteColor = (rootStyle.getPropertyValue("--ink-soft") || "#4A5170").trim();
    const bodyFont = (rootStyle.getPropertyValue("--font-body") || "Inter, Segoe UI, sans-serif")
      .replace(/['"]/g, "")
      .trim();

    const dpr = window.devicePixelRatio || 1;
    function resizeCanvas() {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }
    resizeCanvas();

    // Permanent identity maps — see the component docstring. Never cleared
    // for the lifetime of the page.
    const nodeById = new Map<string, SimNode>();
    const linkById = new Map<string, SimLink>();
    // The subset actually handed to d3-force: active nodes/links, plus
    // whichever inactive ones are still mid fade-out.
    let physicsNodes: SimNode[] = [];
    let physicsLinks: SimLink[] = [];
    let hasFittedInitialView = false;
    let currentAnchorReactionId: string | null = null;

    const simulation: Simulation<SimNode, SimLink> = forceSimulation<SimNode>([]);
    const linkForce = forceLink<SimNode, SimLink>([]).id((d) => d.id).distance(LINK_DISTANCE);

    function anchorForce(alpha: number) {
      if (!currentAnchorReactionId) return;
      const anchor = nodeById.get(currentAnchorReactionId);
      if (!anchor || anchor.activeTarget !== 1 || anchor.x == null || anchor.y == null) return;
      anchor.vx = (anchor.vx ?? 0) + (GRAPH_CENTER - anchor.x) * ANCHOR_STRENGTH * alpha;
      anchor.vy = (anchor.vy ?? 0) + (GRAPH_CENTER - anchor.y) * ANCHOR_STRENGTH * alpha;
      for (const n of physicsNodes) {
        if (n === anchor || n.activeTarget !== 1 || n.x == null || n.y == null) continue;
        n.vx = (n.vx ?? 0) + (anchor.x - n.x) * RADIAL_STRENGTH * alpha;
        n.vy = (n.vy ?? 0) + (anchor.y - n.y) * RADIAL_STRENGTH * alpha;
      }
    }

    simulation
      .force("link", linkForce)
      .force("charge", forceManyBody<SimNode>().strength(CHARGE_STRENGTH).distanceMax(CHARGE_DISTANCE_MAX))
      .force("center", forceCenter(GRAPH_CENTER, GRAPH_CENTER))
      .force("anchor", anchorForce)
      .alpha(0)
      .on("tick", draw);

    let transform: ZoomTransform = zoomIdentity;

    // Hit-testing only considers elements active in the current scenario —
    // inactive ones (including mid fade-out) stay simulated/drawn briefly
    // but must not be hoverable/draggable. Cheap linear scan at this
    // graph's size, only run on pointer events, never per animation frame.
    function hitTest(sx: number, sy: number): SimNode | undefined {
      const [gx, gy] = transform.invert([sx, sy]);
      const rGraph = HIT_RADIUS_PX / transform.k;
      let best: SimNode | undefined;
      let bestDist = rGraph;
      for (const n of physicsNodes) {
        if (n.activeTarget !== 1) continue;
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

    // --- d3-zoom drives pan/zoom over the whole graph. Its own gesture is
    // filtered out wherever a node hit-test succeeds, so a pointer press on
    // a node goes to manual drag handling below instead of starting a pan. ---
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

    const selection_ = select(canvas);
    selection_.call(zoomBehavior);
    zoomBehavior.transform(selection_, transform);

    function draw() {
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.save();
      ctx!.scale(dpr, dpr);
      ctx!.translate(transform.x, transform.y);
      ctx!.scale(transform.k, transform.k);

      ctx!.strokeStyle = "rgba(27, 35, 64, 0.2)";
      for (const l of physicsLinks) {
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
      // node — no separate ink color or zoom threshold to maintain.
      ctx!.font = `5px ${bodyFont}`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "top";

      for (const n of physicsNodes) {
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
    // elements — the whole graph is one canvas). Dragging fixes the grabbed
    // node at the pointer and reheats the *global* simulation
    // (alphaTarget, not a neighborhood-scoped layout), so the whole network
    // responds; releasing lets alpha decay back toward 0 so it cools and
    // settles again. ---
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
      if (lastTooltipPos && Math.abs(pos.x - lastTooltipPos.x) < 1.5 && Math.abs(pos.y - lastTooltipPos.y) < 1.5) {
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

    // --- Scenario transitions ---
    // Canvas has no built-in style-transition system, so this hand-rolls
    // one: applyScenario() diffs the new scenario's node/link ids against
    // what's currently simulated (see the component docstring), then kicks
    // off a short requestAnimationFrame loop that eases *rendered*
    // opacity/edge-width from current values toward the new targets.
    // Reheating the physics (a partial, not full-cold, restart) only
    // happens when the diff actually adds or removes a node/link —  a pure
    // flux-value change (same topology) never touches alpha/positions.
    let transitionRAF = 0;
    let transitionStart = 0;

    function tickTransition(now: number) {
      const t = Math.min(1, (now - transitionStart) / SCENARIO_TRANSITION_MS);
      const e = easeOutCubic(t);
      for (const n of physicsNodes) {
        n.opacity = n.opacityFrom + (n.activeTarget - n.opacityFrom) * e;
      }
      for (const l of physicsLinks) {
        l.opacity = l.opacityFrom + (l.activeTarget - l.opacityFrom) * e;
        l.renderFluxNorm = l.fluxNormFrom + (l.fluxNorm - l.fluxNormFrom) * e;
      }
      draw();
      if (t < 1) {
        transitionRAF = requestAnimationFrame(tickTransition);
        return;
      }
      transitionRAF = 0;
      // Cleanup: anything that finished fading out this pass is dropped
      // from the physics arrays (but never from nodeById/linkById — see
      // docstring) so the simulation doesn't keep growing over a long
      // session of switching between many scenarios.
      const hasFinishedExits =
        physicsNodes.some((n) => n.activeTarget === 0 && n.opacity <= 0.001) ||
        physicsLinks.some((l) => l.activeTarget === 0 && l.opacity <= 0.001);
      if (hasFinishedExits) {
        physicsNodes = physicsNodes.filter((n) => !(n.activeTarget === 0 && n.opacity <= 0.001));
        const keepIds = new Set(physicsNodes.map((n) => n.id));
        physicsLinks = physicsLinks.filter(
          (l) =>
            !(l.activeTarget === 0 && l.opacity <= 0.001) &&
            keepIds.has(endpointId(l.source as SimNode | string)) &&
            keepIds.has(endpointId(l.target as SimNode | string)),
        );
        simulation.nodes(physicsNodes);
        linkForce.links(physicsLinks);
      }
    }

    applyScenarioRef.current = (parsed, anchorReactionId) => {
      const newNodeIds = new Set(parsed.nodes.map((n) => n.id));
      const newLinkIds = new Set(parsed.links.map((l) => l.id));
      let topologyChanged = false;

      for (const pn of parsed.nodes) {
        let node = nodeById.get(pn.id);
        if (!node) {
          node = { ...pn, opacity: 0, opacityFrom: 0, activeTarget: 1 } as SimNode;
          nodeById.set(pn.id, node);
          topologyChanged = true;
        } else {
          if (node.activeTarget !== 1) topologyChanged = true;
          node.flux = pn.flux;
          node.opacityFrom = node.opacity;
          node.activeTarget = 1;
        }
      }
      for (const node of nodeById.values()) {
        if (node.activeTarget === 1 && !newNodeIds.has(node.id)) {
          node.opacityFrom = node.opacity;
          node.activeTarget = 0;
          topologyChanged = true;
        }
      }

      for (const pl of parsed.links) {
        let link = linkById.get(pl.id);
        if (!link) {
          link = {
            id: pl.id,
            source: pl.source,
            target: pl.target,
            flux: pl.flux,
            fluxNorm: pl.fluxNorm,
            opacity: 0,
            opacityFrom: 0,
            renderFluxNorm: pl.fluxNorm,
            fluxNormFrom: pl.fluxNorm,
            activeTarget: 1,
          };
          linkById.set(pl.id, link);
          topologyChanged = true;
        } else {
          if (link.activeTarget !== 1) topologyChanged = true;
          link.fluxNormFrom = link.renderFluxNorm;
          link.flux = pl.flux;
          link.fluxNorm = pl.fluxNorm;
          link.opacityFrom = link.opacity;
          link.activeTarget = 1;
        }
      }
      for (const link of linkById.values()) {
        if (link.activeTarget === 1 && !newLinkIds.has(link.id)) {
          link.opacityFrom = link.opacity;
          link.activeTarget = 0;
          topologyChanged = true;
        }
      }

      physicsNodes = [...nodeById.values()].filter((n) => n.activeTarget === 1 || n.opacity > 0.001);
      const physicsNodeIds = new Set(physicsNodes.map((n) => n.id));
      physicsLinks = [...linkById.values()].filter((l) => {
        if (l.activeTarget !== 1 && l.opacity <= 0.001) return false;
        return (
          physicsNodeIds.has(endpointId(l.source as SimNode | string)) &&
          physicsNodeIds.has(endpointId(l.target as SimNode | string))
        );
      });

      simulation.nodes(physicsNodes);
      linkForce.links(physicsLinks);
      currentAnchorReactionId = anchorReactionId;

      const isFirstLoad = !hasFittedInitialView;
      if (isFirstLoad) {
        hasFittedInitialView = true;
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (const n of physicsNodes) {
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
        transform = zoomIdentity
          .translate(viewport.width / 2, viewport.height / 2)
          .scale(initialK)
          .translate(-cx, -cy);
        zoomBehavior.transform(selection_, transform);
      }

      transitionStart = performance.now();
      if (!transitionRAF) transitionRAF = requestAnimationFrame(tickTransition);

      if (isFirstLoad) {
        simulation.alpha(INITIAL_ALPHA).restart();
      } else if (topologyChanged) {
        simulation.alpha(Math.max(simulation.alpha(), REHEAT_ALPHA)).restart();
      }

      if (hoveredNode) {
        if (hoveredNode.activeTarget !== 1) {
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

    return () => {
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
    };
  }, []);

  // --- Manifest: fetched once on mount. ---
  useEffect(() => {
    let cancelled = false;
    loadManifest()
      .then((m) => {
        if (cancelled) return;
        setManifest(m);
        setSelection({ objective: "polyp", perturbation: null });
      })
      .catch((err) => {
        console.error("Failed to load metabolic network manifest:", err);
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // --- Resolve the current selection against the manifest, and fetch that
  // scenario's graph on demand. Cached scenarios resolve instantly; a fresh
  // fetch aborts whatever previous fetch was still in flight so a fast
  // double-selection can never let a stale response land after a newer
  // one (see loadScenario/abortInFlightScenarios in scenarioData.ts). ---
  const activeScenario = manifest && selection ? resolveScenario(manifest, selection) : undefined;
  const subsystemsRef = useRef(new SubsystemRegistry());

  useEffect(() => {
    if (!manifest || !activeScenario) return;
    setScenarioError(null);

    if (activeScenario.predictedState.status !== "optimal") {
      // Infeasible: don't reuse whatever graph is currently on screen —
      // show a clear infeasible state instead (see the render below).
      abortInFlightScenarios();
      setInfeasible(activeScenario);
      setIsFetchingScenario(false);
      return;
    }
    setInfeasible(null);

    let cancelled = false;
    setIsFetchingScenario(true);
    loadScenario(activeScenario.file)
      .then((raw) => {
        if (cancelled) return;
        const parsed = parseScenarioGraph(raw, subsystemsRef.current);
        const objective = manifest.ui.objectives.find((o) => o.id === activeScenario.objective);
        applyScenarioRef.current(parsed, objective?.target_reaction ?? null);
        setStatus("ready");
        setIsFetchingScenario(false);
      })
      .catch((err) => {
        if (cancelled || (err instanceof DOMException && err.name === "AbortError")) return;
        console.error("Failed to load scenario:", activeScenario.file, err);
        setScenarioError("Could not load this scenario. The previous view is still shown.");
        setIsFetchingScenario(false);
        if (status === "loading") setStatus("error");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifest, activeScenario?.file]);

  function handleSelectObjective(objectiveId: string) {
    setSelection((prev) => (prev ? { ...prev, objective: objectiveId } : prev));
  }
  function handleSelectPerturbation(perturbation: ScenarioSelection["perturbation"]) {
    setSelection((prev) => (prev ? { ...prev, perturbation } : prev));
  }
  function handleReset() {
    if (!manifest) return;
    setSelection({ objective: "polyp", perturbation: null });
  }

  return (
    <div className="model-network__graph">
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
        {infeasible && (
          <div className="model-network__status model-network__status--infeasible">
            <strong>Infeasible scenario</strong>
            <span>{infeasible.label} has no feasible flux solution under these constraints.</span>
          </div>
        )}

        {isFetchingScenario && !infeasible && (
          <div className="model-network__loading-pill" role="status">
            Loading scenario…
          </div>
        )}
        {scenarioError && (
          <div className="model-network__error-pill" role="alert">
            {scenarioError}
          </div>
        )}

        {tooltip && (
          <div className="model-network__tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
            <strong>{tooltip.lines[0]}</strong>
            {tooltip.lines.slice(1).map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        )}

        {manifest && selection && (
          <ScenarioSidebar
            manifest={manifest}
            selection={selection}
            predictedState={activeScenario?.predictedState}
            onSelectObjective={handleSelectObjective}
            onSelectPerturbation={handleSelectPerturbation}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
