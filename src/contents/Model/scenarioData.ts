import { asset } from "../../utils/asset";

/**
 * Manifest-driven scenario data layer for the Model page's metabolic
 * network (./MetabolicNetworkGraph.tsx). Source of truth for every control
 * value, checkpoint, and predicted-state figure is
 * data/metabolic-network-scenarios/manifest.json (synced verbatim, not
 * transformed, into public/generated/scenarios/ by
 * scripts/sync-metabolic-network-scenarios.mjs — see that script's header
 * for why this pipeline no longer merges scenarios at build time like the
 * old generate-metabolic-network.mjs did).
 *
 * Nothing here hardcodes a scenario's filename or count: every scenario is
 * looked up by matching the current UI selection (objective + at most one
 * perturbation) against `manifest.scenarios`, and only ever fetched when
 * actually selected.
 */

// ---------------------------------------------------------------------------
// Manifest shape (mirrors manifest.json exactly; fields this app doesn't
// read — topologyTemplate, cleanup, model.geneCount, etc. — are still typed
// so the raw JSON can be assigned without casting, but callers only reach
// into the parts documented below).
// ---------------------------------------------------------------------------

export interface ManifestObjective {
  id: string; // "growth" | "growth60" | "growth20" | "polyp"
  label: string;
  target_reaction: string;
  growth_floor_fraction: number | null;
}

export interface ManifestCarbonSource {
  label: string;
  exchange: string;
  checkpoints: number[];
}

export interface ManifestStrainDesign {
  label: string;
  gene: string | null;
}

export interface ManifestUi {
  objectives: ManifestObjective[];
  uptakeCheckpoints: { oxygen: number[]; phosphate: number[]; ammonium: number[] };
  uptakeReference: { carbon: number; oxygen: number; phosphate: number; ammonium: number };
  carbonSources: Record<string, ManifestCarbonSource>;
  strainDesigns: Record<string, ManifestStrainDesign>;
  ppk1CapacityMultipliers: number[];
  atpmDemands: number[];
  notes: { ppk1Capacity: string; atpm: string };
}

export interface ManifestSelectionPolicy {
  objectiveAlwaysActive: boolean;
  maximumActivePerturbationGroups: number;
  mutuallyExclusiveGroups: string[];
  wtUsesBaseline: boolean;
}

export interface PredictedState {
  status: "optimal" | "infeasible" | string;
  growth: number;
  polyP: number;
  piUptake: number;
  o2Uptake: number;
  carbonUptake: number;
  atpm: number;
  ppk1: number;
}

export type ScenarioGroup = "baseline" | "uptake" | "strain" | "constraint";

export interface ManifestScenario {
  file: string;
  id: string;
  label: string;
  group: ScenarioGroup;
  control: string; // "wt" | "carbon" | "oxygen" | "phosphate" | "ammonium" | "dppk" | "doprP" | "ppk1_capacity" | "atpm"
  option?: string; // carbon source key, only present when control === "carbon"
  value: number | string | null;
  unit: string | null;
  objective: string;
  objectiveLabel: string;
  zeroFluxFiltered: boolean;
  cofactorsRemoved: boolean;
  predictedState: PredictedState;
  nodeCount: number;
  linkCount: number;
}

export interface Manifest {
  schemaVersion: number;
  generatedAt: string;
  model: { file: string; reactionCount: number; metaboliteCount: number; geneCount: number; referenceGrowth: number; ppk1ReferenceFlux: number };
  selectionPolicy: ManifestSelectionPolicy;
  ui: ManifestUi;
  scenarios: ManifestScenario[];
}

// ---------------------------------------------------------------------------
// Selection state — what the sidebar controls. `perturbation` is null for
// WT / baseline (manifest.selectionPolicy.wtUsesBaseline).
// ---------------------------------------------------------------------------

export interface PerturbationSelection {
  group: "uptake" | "strain" | "constraint";
  control: string;
  option?: string;
  value: number | string;
}

export interface ScenarioSelection {
  objective: string;
  perturbation: PerturbationSelection | null;
}

/** Finds the one manifest scenario matching a selection. Never guesses a
 * filename — always a lookup against the manifest's own list. */
export function resolveScenario(
  manifest: Manifest,
  selection: ScenarioSelection,
): ManifestScenario | undefined {
  const { objective, perturbation } = selection;
  if (!perturbation) {
    return manifest.scenarios.find((s) => s.objective === objective && s.group === "baseline");
  }
  return manifest.scenarios.find(
    (s) =>
      s.objective === objective &&
      s.group === perturbation.group &&
      s.control === perturbation.control &&
      (perturbation.option ? s.option === perturbation.option : true) &&
      s.value === perturbation.value,
  );
}

// ---------------------------------------------------------------------------
// Manifest + per-scenario fetching, with an in-memory cache and abortable
// in-flight requests (see useVisualIndex-style hooks elsewhere in the repo
// for the same "cache + abort stale response" shape applied to a simpler
// case).
// ---------------------------------------------------------------------------

let manifestPromise: Promise<Manifest> | null = null;

/** Fetches manifest.json exactly once per page load, however many
 * components/renders ask for it. */
export function loadManifest(): Promise<Manifest> {
  if (!manifestPromise) {
    manifestPromise = fetch(asset("generated/scenarios/manifest.json")).then((res) => {
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return res.json() as Promise<Manifest>;
    });
  }
  return manifestPromise;
}

export interface RawFluxerNode {
  id: string;
  class: "reaction" | "metabolite";
  name?: string;
  subsystem?: string;
  localization?: string | null;
  flux?: number;
  IsCofactor?: boolean;
}

export interface RawFluxerLink {
  id: string;
  source: string;
  target: string;
  flux: number;
  fluxMagnitude: number;
}

export interface RawScenarioFile {
  schemaVersion: number;
  scenario: ManifestScenario;
  graph: { nodes: RawFluxerNode[]; links: RawFluxerLink[] };
}

const scenarioCache = new Map<string, RawScenarioFile>();
const inFlight = new Map<string, { promise: Promise<RawScenarioFile>; controller: AbortController }>();

/**
 * Fetches one scenario's raw Fluxer JSON by its manifest `file`, caching the
 * parsed result forever (these files never change during a session) and
 * de-duplicating concurrent requests for the same file. Any previous
 * in-flight request for a *different* file that's still pending when this
 * is called is aborted — the caller only ever gets the most recently
 * requested scenario, never a stale one racing ahead of it.
 */
export function loadScenario(file: string, staleController?: AbortController): Promise<RawScenarioFile> {
  const cached = scenarioCache.get(file);
  if (cached) return Promise.resolve(cached);

  const existing = inFlight.get(file);
  if (existing) return existing.promise;

  staleController?.abort();
  const controller = new AbortController();
  const promise = fetch(asset(`generated/scenarios/${file}`), { signal: controller.signal })
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return res.json() as Promise<RawScenarioFile>;
    })
    .then((data) => {
      scenarioCache.set(file, data);
      inFlight.delete(file);
      return data;
    })
    .catch((err) => {
      inFlight.delete(file);
      throw err;
    });
  inFlight.set(file, { promise, controller });
  return promise;
}

/** Aborts whichever scenario fetch is currently in flight, if any — call
 * this right before starting a new one so a fast double-selection never
 * lets an older response land after a newer one. */
export function abortInFlightScenarios() {
  for (const { controller } of inFlight.values()) controller.abort();
  inFlight.clear();
}

// ---------------------------------------------------------------------------
// Subsystem color index — assigned lazily, first-seen order, and kept
// stable for the lifetime of the page. The old build-time pipeline could
// sort every subsystem alphabetically up front because it saw all three
// scenarios at once; here scenarios are fetched one at a time on demand, so
// there's no fixed universe to sort ahead of time. First-seen order still
// gives every subsystem a color that never changes once assigned, which is
// what actually matters (distinguishing subsystems from each other within a
// session) — alphabetical order itself was never user-visible.
// ---------------------------------------------------------------------------
export class SubsystemRegistry {
  private indexByName = new Map<string, number>();

  indexOf(rawName: string): number {
    const existing = this.indexByName.get(rawName);
    if (existing !== undefined) return existing;
    const index = this.indexByName.size;
    this.indexByName.set(rawName, index);
    return index;
  }
}

export function humanizeSubsystem(raw: string): string {
  return raw.replace(/^S_/, "").replace(/_+/g, " ").trim();
}

// ---------------------------------------------------------------------------
// Raw Fluxer graph -> the flat per-node/per-link shape MetabolicNetworkGraph
// simulates. Unlike the old generate-metabolic-network.mjs output, there is
// no per-scenario `scenarios` map on each element — every fetch already *is*
// one scenario's worth of data; cross-scenario diffing (which nodes/links
// entered, left, or just changed flux) happens in the component itself by
// comparing this against whatever was simulated before.
// ---------------------------------------------------------------------------

export interface ParsedNode {
  id: string;
  label: string;
  kind: "reaction" | "metabolite";
  name: string;
  subsystem?: string;
  subsystemIndex?: number;
  localization?: string | null;
  flux?: number;
}

export interface ParsedLink {
  id: string;
  source: string;
  target: string;
  flux: number;
  fluxNorm: number;
}

export interface ParsedScenarioGraph {
  nodes: ParsedNode[];
  links: ParsedLink[];
}

/**
 * Parses one raw Fluxer export into the flat shape above. Edge width's
 * flux -> fluxNorm mapping is log-scaled same as before, but recomputed
 * from *this* scenario's own min/max |flux| — the old shared cross-scenario
 * scale doesn't generalize to 152 independently-loaded scenarios spanning
 * wildly different node counts (69 to 5070), so each freshly loaded
 * scenario gets its own scale. The existing opacity/width easing in
 * MetabolicNetworkGraph already animates between old and new *normalized*
 * values regardless of whether the underlying scale shifted, so this has
 * no visible discontinuity beyond the intentional cross-fade.
 */
export function parseScenarioGraph(raw: RawScenarioFile, subsystems: SubsystemRegistry): ParsedScenarioGraph {
  const nodeIds = new Set(raw.graph.nodes.map((n) => n.id));

  const nodes: ParsedNode[] = raw.graph.nodes.map((n) => {
    if (n.class === "reaction") {
      const subsystemRaw = n.subsystem ?? "";
      return {
        id: n.id,
        label: n.id,
        kind: "reaction",
        name: n.name || n.id,
        subsystem: humanizeSubsystem(subsystemRaw),
        subsystemIndex: subsystems.indexOf(subsystemRaw),
        flux: n.flux ?? 0,
      };
    }
    return {
      id: n.id,
      label: n.id,
      kind: "metabolite",
      name: n.name || n.id,
      localization: n.localization || null,
    };
  });

  const validLinks = raw.graph.links.filter((l) => nodeIds.has(l.source) && nodeIds.has(l.target));
  const magnitudes = validLinks.map((l) => l.fluxMagnitude).filter((m) => m > 0);
  const logMin = magnitudes.length ? Math.log(Math.min(...magnitudes)) : 0;
  const logMax = magnitudes.length ? Math.log(Math.max(...magnitudes)) : 0;
  const logSpan = logMax - logMin || 1;
  function fluxNormOf(magnitude: number): number {
    if (magnitude <= 0) return 0;
    return Math.max(0, Math.min(1, (Math.log(magnitude) - logMin) / logSpan));
  }

  const links: ParsedLink[] = validLinks.map((l) => ({
    id: `${l.source}->${l.target}`,
    source: l.source,
    target: l.target,
    flux: l.flux,
    fluxNorm: fluxNormOf(l.fluxMagnitude),
  }));

  return { nodes, links };
}
