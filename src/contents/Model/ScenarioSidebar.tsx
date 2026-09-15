import { useEffect, useState } from "react";
import { DiscreteSlider } from "./DiscreteSlider";
import type {
  Manifest,
  PerturbationSelection,
  PredictedState,
  ScenarioSelection,
} from "./scenarioData";

/**
 * Filters sidebar for the Model page's metabolic network. Purely a
 * controller over `selection` (objective + at most one perturbation) —
 * every value it offers (checkpoints, strain genes, constraint
 * multipliers/demands, notes, predicted-state figures) comes from
 * `manifest`, never hardcoded here except fixed UI copy (row/section
 * labels) that the manifest has no place for. Knows nothing about canvas,
 * physics, or how a scenario file is fetched — see MetabolicNetworkGraph.tsx
 * for where `onSelectObjective`/`onSelectPerturbation` actually resolve to a
 * scenario and load it.
 */

const OBJECTIVE_SHORT_LABEL: Record<string, string> = {
  growth: "Growth",
  growth60: "60%",
  growth20: "20%",
  polyp: "PolyP",
};

const UPTAKE_ROWS: {
  control: "carbon" | "oxygen" | "phosphate" | "ammonium";
  label: string;
}[] = [
  { control: "carbon", label: "Carbon" },
  { control: "oxygen", label: "O₂" },
  { control: "phosphate", label: "Pi" },
  { control: "ammonium", label: "NH₄⁺" },
];

const CONSTRAINT_ROWS: { control: "ppk1_capacity" | "atpm"; label: string }[] =
  [
    { control: "ppk1_capacity", label: "PPK1 capacity" },
    { control: "atpm", label: "ATP maintenance" },
  ];

function prettifyUnit(raw: string | null | undefined): string {
  if (!raw) return "";
  return raw.replace(/\^-1/g, "⁻¹");
}

function formatMetric(value: number | null | undefined): string {
  if (value == null) return "—";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  const text =
    abs < 1e-3 || abs >= 1e4 ? value.toExponential(2) : value.toPrecision(3);
  return text.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
}

function formatTickNumber(checkpoint: number | string): string {
  if (typeof checkpoint === "string") return checkpoint;
  return Number.isInteger(checkpoint)
    ? String(checkpoint)
    : String(checkpoint).replace(/^0\./, ".");
}

export function ScenarioSidebar({
  manifest,
  selection,
  predictedState,
  onSelectObjective,
  onSelectPerturbation,
  onReset,
}: {
  manifest: Manifest;
  selection: ScenarioSelection;
  predictedState: PredictedState | undefined;
  onSelectObjective: (objectiveId: string) => void;
  onSelectPerturbation: (perturbation: PerturbationSelection | null) => void;
  onReset: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSection, setOpenSection] = useState<
    "uptake" | "strain" | "constraint" | null
  >(null);

  const perturbation = selection.perturbation;

  // Which uptake row/carbon-source is showing, kept in sync with whatever
  // is actually selected — draft-only state (not yet a full perturbation)
  // lives here too, since "Carbon" can be picked before a source/value is.
  const [uptakeControl, setUptakeControl] = useState<string | null>(
    perturbation?.group === "uptake" ? perturbation.control : null,
  );
  const [carbonSource, setCarbonSource] = useState<string | null>(
    perturbation?.group === "uptake" && perturbation.control === "carbon"
      ? (perturbation.option ?? null)
      : null,
  );
  const [constraintControl, setConstraintControl] = useState<string | null>(
    perturbation?.group === "constraint" ? perturbation.control : null,
  );

  useEffect(() => {
    if (perturbation?.group === "uptake") {
      setUptakeControl(perturbation.control);
      setCarbonSource(
        perturbation.control === "carbon"
          ? (perturbation.option ?? null)
          : null,
      );
    } else {
      setUptakeControl(null);
      setCarbonSource(null);
    }
    setConstraintControl(
      perturbation?.group === "constraint" ? perturbation.control : null,
    );
  }, [perturbation]);

  const uptakeUnit = prettifyUnit(
    manifest.scenarios.find((s) => s.group === "uptake")?.unit,
  );

  function selectUptakeRow(
    control: "carbon" | "oxygen" | "phosphate" | "ammonium",
  ) {
    setUptakeControl(control);
    if (control === "carbon") {
      setCarbonSource(null);
      return; // wait for a source pick before committing anything
    }
    const checkpoints = manifest.ui.uptakeCheckpoints[control];
    onSelectPerturbation({ group: "uptake", control, value: checkpoints[0] });
  }
  function selectCarbonSource(source: string) {
    setCarbonSource(source);
    const checkpoints = manifest.ui.carbonSources[source].checkpoints;
    onSelectPerturbation({
      group: "uptake",
      control: "carbon",
      option: source,
      value: checkpoints[0],
    });
  }
  function selectUptakeValue(value: number | string) {
    if (!uptakeControl) return;
    if (uptakeControl === "carbon" && carbonSource) {
      onSelectPerturbation({
        group: "uptake",
        control: "carbon",
        option: carbonSource,
        value,
      });
    } else if (uptakeControl !== "carbon") {
      onSelectPerturbation({
        group: "uptake",
        control: uptakeControl as "oxygen" | "phosphate" | "ammonium",
        value,
      });
    }
  }

  function selectStrain(key: "wt" | "dppk" | "doprP") {
    if (key === "wt") {
      onSelectPerturbation(null);
      return;
    }
    const gene = manifest.ui.strainDesigns[key].gene!;
    onSelectPerturbation({ group: "strain", control: key, value: gene });
  }

  function selectConstraintRow(control: "ppk1_capacity" | "atpm") {
    setConstraintControl(control);
    const checkpoints =
      control === "ppk1_capacity"
        ? manifest.ui.ppk1CapacityMultipliers
        : manifest.ui.atpmDemands;
    onSelectPerturbation({
      group: "constraint",
      control,
      value: checkpoints[0],
    });
  }
  function selectConstraintValue(value: number | string) {
    if (!constraintControl) return;
    onSelectPerturbation({
      group: "constraint",
      control: constraintControl as "ppk1_capacity" | "atpm",
      value,
    });
  }

  const activeStrainKey =
    perturbation === null
      ? "wt"
      : perturbation.group === "strain"
        ? perturbation.control
        : null;

  return (
    <div
      className={`model-network__sidebar${isExpanded ? "" : " is-collapsed"}`}
    >
      <div className="model-network__sidebar-header">
        <button
          type="button"
          className={`model-network__sidebar-chevron${isExpanded ? " is-expanded" : ""}`}
          onClick={() => setIsExpanded((v) => !v)}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path
              d="M2 3.5 L5 6.5 L8 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="model-network__sidebar-title">Filters</span>
        <button
          type="button"
          className="model-network__sidebar-icon-btn"
          onClick={onReset}
          aria-label="Reset to PolyP + WT baseline"
          title="Reset to PolyP + WT baseline"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
            <polyline
              points="1 4 1 10 7 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="model-network__sidebar-body">
          <section className="model-network__sidebar-priority">
            <h3 className="model-network__sidebar-priority-title">
              Optimization priority
            </h3>
            <DiscreteSlider
              checkpoints={manifest.ui.objectives.map((o) => o.id)}
              formatTick={(id) =>
                OBJECTIVE_SHORT_LABEL[id as string] ?? String(id)
              }
              value={selection.objective}
              onChange={(id) => onSelectObjective(id as string)}
              ariaLabel="Optimization priority"
              ariaValueText={
                manifest.ui.objectives.find((o) => o.id === selection.objective)
                  ?.label
              }
            />
          </section>

          <div className="model-network__sidebar-accordion">
            <AccordionSection
              title="Uptake bounds"
              isOpen={openSection === "uptake"}
              onToggle={() =>
                setOpenSection((s) => (s === "uptake" ? null : "uptake"))
              }
            >
              <div className="model-network__row-select">
                {UPTAKE_ROWS.map((row) => (
                  <button
                    key={row.control}
                    type="button"
                    className={`model-network__row-btn${uptakeControl === row.control ? " is-active" : ""}`}
                    onClick={() => selectUptakeRow(row.control)}
                  >
                    {row.label}
                  </button>
                ))}
              </div>

              {uptakeControl === "carbon" && (
                <div className="model-network__nested-control">
                  <div className="model-network__row-select model-network__row-select--secondary">
                    {Object.entries(manifest.ui.carbonSources).map(
                      ([key, source]) => (
                        <button
                          key={key}
                          type="button"
                          className={`model-network__row-btn${carbonSource === key ? " is-active" : ""}`}
                          onClick={() => selectCarbonSource(key)}
                        >
                          {source.label}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

              {uptakeControl === "carbon" && carbonSource && (
                <DiscreteSlider
                  checkpoints={
                    manifest.ui.carbonSources[carbonSource].checkpoints
                  }
                  formatTick={formatTickNumber}
                  value={
                    perturbation?.group === "uptake" &&
                    perturbation.control === "carbon"
                      ? perturbation.value
                      : null
                  }
                  onChange={selectUptakeValue}
                  ariaLabel={`${manifest.ui.carbonSources[carbonSource].label} uptake bound`}
                />
              )}
              {uptakeControl && uptakeControl !== "carbon" && (
                <DiscreteSlider
                  checkpoints={
                    manifest.ui.uptakeCheckpoints[
                      uptakeControl as "oxygen" | "phosphate" | "ammonium"
                    ]
                  }
                  formatTick={formatTickNumber}
                  value={
                    perturbation?.group === "uptake" ? perturbation.value : null
                  }
                  onChange={selectUptakeValue}
                  ariaLabel={`${uptakeControl} uptake bound`}
                />
              )}
              {uptakeControl && (
                <p className="model-network__sidebar-unit">
                  Unit: {uptakeUnit}
                </p>
              )}
            </AccordionSection>

            <AccordionSection
              title="Strain designs"
              isOpen={openSection === "strain"}
              onToggle={() =>
                setOpenSection((s) => (s === "strain" ? null : "strain"))
              }
            >
              <div className="model-network__row-select model-network__row-select--column">
                <button
                  type="button"
                  className={`model-network__row-btn${activeStrainKey === "wt" ? " is-active" : ""}`}
                  onClick={() => selectStrain("wt")}
                >
                  {manifest.ui.strainDesigns.wt.label}
                  <span className="model-network__row-btn-note">
                    Reference — baseline scenario
                  </span>
                </button>
                <button
                  type="button"
                  className={`model-network__row-btn${activeStrainKey === "dppk" ? " is-active" : ""}`}
                  onClick={() => selectStrain("dppk")}
                >
                  {manifest.ui.strainDesigns.dppk.label}
                  <span className="model-network__row-btn-note">
                    Removes PolyP production capacity
                  </span>
                </button>
                <button
                  type="button"
                  className={`model-network__row-btn${activeStrainKey === "doprP" ? " is-active" : ""}`}
                  onClick={() => selectStrain("doprP")}
                >
                  {manifest.ui.strainDesigns.doprP.label}
                  <span className="model-network__row-btn-note">
                    Limits extracellular phosphate access
                  </span>
                </button>
              </div>
            </AccordionSection>

            <AccordionSection
              title="Reaction constraints"
              isOpen={openSection === "constraint"}
              onToggle={() =>
                setOpenSection((s) =>
                  s === "constraint" ? null : "constraint",
                )
              }
            >
              <div className="model-network__row-select">
                {CONSTRAINT_ROWS.map((row) => (
                  <button
                    key={row.control}
                    type="button"
                    className={`model-network__row-btn${constraintControl === row.control ? " is-active" : ""}`}
                    onClick={() => selectConstraintRow(row.control)}
                  >
                    {row.label}
                  </button>
                ))}
              </div>

              {constraintControl === "ppk1_capacity" && (
                <>
                  <DiscreteSlider
                    checkpoints={manifest.ui.ppk1CapacityMultipliers}
                    formatTick={(c) => `${formatTickNumber(c)}×`}
                    value={
                      perturbation?.group === "constraint"
                        ? perturbation.value
                        : null
                    }
                    onChange={selectConstraintValue}
                    ariaLabel="PPK1 capacity multiplier"
                  />
                  <p className="model-network__sidebar-note">
                    {manifest.ui.notes.ppk1Capacity}
                  </p>
                </>
              )}
              {constraintControl === "atpm" && (
                <>
                  <DiscreteSlider
                    checkpoints={manifest.ui.atpmDemands}
                    formatTick={formatTickNumber}
                    value={
                      perturbation?.group === "constraint"
                        ? perturbation.value
                        : null
                    }
                    onChange={selectConstraintValue}
                    ariaLabel="ATP maintenance demand"
                  />
                  <p className="model-network__sidebar-note">
                    {manifest.ui.notes.atpm}
                  </p>
                </>
              )}
            </AccordionSection>
          </div>

          <section className="model-network__predicted-state">
            <h3 className="model-network__predicted-state-title">
              Predicted state
            </h3>
            <dl>
              <div className="model-network__predicted-row">
                <dt>Status</dt>
                <dd
                  className={
                    predictedState?.status !== "optimal"
                      ? "is-infeasible"
                      : undefined
                  }
                >
                  {predictedState
                    ? predictedState.status.charAt(0).toUpperCase() +
                      predictedState.status.slice(1)
                    : "—"}
                </dd>
              </div>
              <div className="model-network__predicted-row">
                <dt>Growth</dt>
                <dd>{formatMetric(predictedState?.growth)} h⁻¹</dd>
              </div>
              <div className="model-network__predicted-row">
                <dt>PolyP</dt>
                <dd>{formatMetric(predictedState?.polyP)} mmol gDW⁻¹ h⁻¹</dd>
              </div>
              <div className="model-network__predicted-row">
                <dt>Pi uptake</dt>
                <dd>{formatMetric(predictedState?.piUptake)} mmol gDW⁻¹ h⁻¹</dd>
              </div>
              <div className="model-network__predicted-row">
                <dt>O₂ uptake</dt>
                <dd>{formatMetric(predictedState?.o2Uptake)} mmol gDW⁻¹ h⁻¹</dd>
              </div>
              <div className="model-network__predicted-row">
                <dt>Carbon uptake</dt>
                <dd>
                  {formatMetric(predictedState?.carbonUptake)} mmol gDW⁻¹ h⁻¹
                </dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </div>
  );
}

function AccordionSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="model-network__accordion-section">
      <button
        type="button"
        className="model-network__accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <svg
          width="9"
          height="9"
          viewBox="0 0 10 10"
          aria-hidden="true"
          className={`model-network__accordion-chevron${isOpen ? " is-open" : ""}`}
        >
          <path
            d="M3.5 2 L6.5 5 L3.5 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {title}
      </button>
      {isOpen && (
        <div className="model-network__accordion-content">{children}</div>
      )}
    </div>
  );
}
