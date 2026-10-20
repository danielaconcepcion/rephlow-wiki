import { useState } from "react";
import {
  COURSE_PANELS,
  FLUX_PANELS,
  SCAN_STEPS,
  SPECIES,
  type Point,
} from "./dynamicsData";
import { ChartLegend, TimeChart, type ChartSeries } from "./TimeChart";
import "./Dynamics.css";

/* --------------------------------------------------------------------------
   Section 6's two figures. Both are redrawings of the project's own COPASI
   plots from the curves of those plots (see dynamicsData.ts); nothing here
   is re-simulated.
   -------------------------------------------------------------------------- */

const SPECIES_BY_ID = Object.fromEntries(SPECIES.map((s) => [s.id, s]));

/** Axis divisions chosen by hand: a generated tick list on these ranges
 * gives numbers like 22.5k, which nobody reads off a chart. */
const COURSE_TICKS: Record<string, { x: number[]; y: number[] }> = {
  whole: { x: [0, 5000, 10000, 15000], y: [0, 10000, 20000, 30000] },
  carriers: {
    x: [0, 1000, 2000, 3000, 4000, 5000],
    y: [0, 1000, 2000, 3000, 4000],
  },
  chains: { x: [0, 5000, 10000, 15000], y: [0, 200, 400, 600, 800] },
};
const FLUX_TICKS: Record<string, number[]> = {
  transport: [0, 2, 4, 6, 8],
  polymerisation: [0, 0.2, 0.4, 0.6],
};
const FLUX_X = [0, 500, 1000, 1500, 2000];

/** Figure 12 — the concentration time courses, one panel per scale, with
 * the V_max,ATPS scan on a slider: the chosen step is drawn solid and the
 * other five stay behind it, so the trend across the scan is still
 * visible. */
export function ConcentrationCourses() {
  const [step, setStep] = useState(SCAN_STEPS - 1);

  return (
    <figure className="dyn" id="concentration-courses">
      <div className="dyn__control">
        <label htmlFor="vmax-scan">
          <span className="dyn__control-name">V</span>
          <sub>max, ATPS</sub>
        </label>
        <input
          id="vmax-scan"
          type="range"
          min={0}
          max={SCAN_STEPS - 1}
          step={1}
          value={step}
          onChange={(event) => setStep(Number(event.target.value))}
        />
        <output htmlFor="vmax-scan">
          step {step + 1} of {SCAN_STEPS}
          <span className="dyn__control-note">
            {step === 0
              ? " — lowest"
              : step === SCAN_STEPS - 1
                ? " — highest"
                : ""}
          </span>
        </output>
      </div>

      <div className="dyn__panels">
        {COURSE_PANELS.map((panel, panelIndex) => {
          const series: ChartSeries[] = [];
          panel.species.forEach((id) => {
            const def = SPECIES_BY_ID[id];
            const curves = panel.data[id];
            curves.forEach((pts: Point[], i: number) => {
              if (i === step || pts.length === 0) return;
              series.push({
                id: `${id}-${i}`,
                label: def.label,
                color: def.color,
                pts,
                dashed: def.dashed,
                faint: true,
                silent: true,
              });
            });
          });
          panel.species.forEach((id) => {
            const def = SPECIES_BY_ID[id];
            const pts = panel.data[id][step];
            if (!pts || pts.length === 0) return;
            series.push({
              id,
              label: def.label,
              color: def.color,
              pts,
              dashed: def.dashed,
            });
          });
          return (
            <TimeChart
              key={panel.id}
              title={panel.title}
              xMax={panel.xMax}
              yMax={panel.yMax}
              xTicks={COURSE_TICKS[panel.id].x}
              yTicks={COURSE_TICKS[panel.id].y}
              series={series}
              yLabel="Concentration [µmol L⁻¹]"
              readoutUnit="µmol L⁻¹"
              compactTicks
              hint={panelIndex === 0}
            />
          );
        })}
      </div>

      <ChartLegend
        items={SPECIES.filter((s) =>
          COURSE_PANELS.some((p) => p.species.includes(s.id)),
        )}
      />

      <figcaption>
        <strong>Figure 12.</strong> Concentration time courses of the reduced
        model, split across three vertical scales so the millimolar pools and
        the short phosphate chains can both be read. The slider steps through
        the V<sub>max, ATPS</sub> scan (0.001–2 µmol L⁻¹ s⁻¹, six steps, lowest
        first); the five steps not selected stay in the background. Redrawn from
        the curves of our own COPASI run.
      </figcaption>
    </figure>
  );
}

/** Figure 13 — the fluxes, transport on one side and polymerisation on the
 * other, on the two scales they need. */
export function PhosphateFluxes() {
  return (
    <figure className="dyn" id="phosphate-fluxes">
      <div className="dyn__panels dyn__panels--two">
        {FLUX_PANELS.map((panel, panelIndex) => (
          <div key={panel.id} className="dyn__flux-panel">
            <TimeChart
              title={panel.title}
              xMax={2000}
              yMax={panel.yMax}
              xTicks={FLUX_X}
              yTicks={FLUX_TICKS[panel.id]}
              series={panel.series.map((s) => ({
                id: s.id,
                label: s.label,
                color: s.color,
                pts: panel.data[s.id],
              }))}
              yLabel="Flux [µmol s⁻¹]"
              readoutUnit="µmol s⁻¹"
              hint={panelIndex === 0}
            />
            <ChartLegend items={panel.series} />
          </div>
        ))}
      </div>

      <figcaption>
        <strong>Figure 13.</strong> Phosphate fluxes over the first 2 000 s: the
        three routes phosphate takes into the cell, and the three steps that
        polymerise it. Note the two vertical scales — the symport spike is an
        order of magnitude above everything else, and is clipped at the top of
        its panel. Redrawn from the curves of our own COPASI run.
      </figcaption>
    </figure>
  );
}
