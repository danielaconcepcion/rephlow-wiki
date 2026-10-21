import { useState } from "react";
import {
  HEATMAP,
  HEATMAP_GROUPS,
  HEATMAP_ROWS,
  SCAN_DEFS,
  SENS_PANELS,
} from "./sensitivityData";
import { ChartLegend, TimeChart } from "./TimeChart";
import "./Sensitivity.css";

/* --------------------------------------------------------------------------
   Section 7's three figures. As in section 6, every curve and every cell
   is read back off our own COPASI output (see sensitivityData.ts).
   -------------------------------------------------------------------------- */

const PARAMS = HEATMAP_GROUPS.flatMap((g) => g.params);

/** The diverging scale the heatmap is read with: blue where raising the
 * parameter raises the flux, red where it lowers it. Saturates at |S| = 1.5,
 * as the original's colour bar does. */
function cellColour(v: number): string {
  const t = Math.min(Math.abs(v) / 1.5, 1);
  const hue = v > 0 ? "21, 104, 163" : "198, 60, 42";
  return `rgba(${hue}, ${(0.08 + 0.82 * t).toFixed(3)})`;
}

function textColour(v: number): string {
  return Math.abs(v) / 1.5 > 0.55 ? "#ffffff" : "#1b2340";
}

/** Figure 14 — the global sensitivity map. */
export function SensitivityHeatmap() {
  const [cell, setCell] = useState<{ i: number; j: number } | null>(null);

  const reading =
    cell && HEATMAP[cell.i][cell.j] !== null
      ? {
          flux: HEATMAP_ROWS[cell.i],
          param: PARAMS[cell.j],
          group: HEATMAP_GROUPS.find((g) => g.params.includes(PARAMS[cell.j]))!
            .label,
          value: HEATMAP[cell.i][cell.j] as number,
        }
      : null;

  return (
    <figure className="hm" id="sensitivity-map">
      <div className="hm__scroll">
        <table className="hm__table">
          <caption className="sr-only">
            Scaled sensitivities of each reaction flux to each kinetic parameter
            and initial condition
          </caption>
          <thead>
            <tr>
              <th scope="col" className="hm__corner" />
              {HEATMAP_GROUPS.map((g) => (
                <th
                  key={g.label}
                  scope="colgroup"
                  colSpan={g.params.length}
                  className="hm__group"
                >
                  {g.label}
                </th>
              ))}
            </tr>
            <tr>
              <th scope="col" className="hm__corner" />
              {PARAMS.map((p) => (
                <th key={p} scope="col" className="hm__param">
                  <span>{p}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HEATMAP_ROWS.map((row, i) => (
              <tr key={row}>
                <th scope="row" className="hm__flux">
                  {row}
                </th>
                {PARAMS.map((p, j) => {
                  const v = HEATMAP[i][j];
                  const on = cell?.i === i && cell?.j === j;
                  return (
                    <td
                      key={p}
                      className={`hm__cell${on ? " hm__cell--on" : ""}`}
                      style={
                        v === null
                          ? undefined
                          : { background: cellColour(v), color: textColour(v) }
                      }
                      onMouseEnter={() => setCell({ i, j })}
                      onMouseLeave={() => setCell(null)}
                      onFocus={() => setCell({ i, j })}
                      onBlur={() => setCell(null)}
                      tabIndex={v === null ? -1 : 0}
                    >
                      {v === null ? "" : v.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="hm__readout">
        {reading ? (
          <>
            <strong>
              {reading.flux} × {reading.param}
            </strong>
            <span className="hm__readout-group">{reading.group}</span>
            <span>
              S̃ = {reading.value.toFixed(2)}, so a 1 % rise in the parameter
              {reading.value > 0 ? " raises " : " lowers "}
              the flux by {Math.abs(reading.value).toFixed(2)} %
            </span>
          </>
        ) : (
          <span className="hm__readout-hint">
            Point at a cell to read it; blue raises the flux, red lowers it
          </span>
        )}
      </div>

      <figcaption>
        <strong>Figure 14.</strong> Scaled sensitivities of the thirteen
        reaction fluxes to the parameters and initial conditions that move them
        most, grouped by module. Blank cells are sensitivities the original
        leaves unprinted. Read back from our own COPASI sensitivity output.
      </figcaption>
    </figure>
  );
}

/** Figure 15 — when each parameter matters, over the run. */
export function SensitivityCourses() {
  return (
    <figure className="dyn" id="sensitivity-courses">
      <div className="dyn__panels">
        {SENS_PANELS.map((panel, i) => (
          <div key={panel.id} className="dyn__flux-panel">
            <TimeChart
              title={panel.title}
              xMax={2000}
              yMin={panel.yMin}
              yMax={panel.yMax}
              xTicks={[0, 500, 1000, 1500, 2000]}
              yTicks={panel.yTicks}
              series={panel.series}
              yLabel="Scaled sensitivity"
              readoutUnit=""
              hint={i === 0}
            />
            <ChartLegend items={panel.series} />
          </div>
        ))}
      </div>

      <figcaption>
        <strong>Figure 15.</strong> Scaled sensitivities of the three
        polymerisation fluxes over the run, each against the five parameters it
        responds to most. The window where the curves swing hardest is the
        approach to the plateau of Figure 12: the transition into substrate
        saturation. Read back from our own COPASI output.
      </figcaption>
    </figure>
  );
}

/** Figure 16 — the scans that test the parameters the map ranks highest. */
export function ParameterScans() {
  const [which, setWhich] = useState(0);
  const [step, setStep] = useState(10);
  const scan = SCAN_DEFS[which];
  const value = scan.values[step];

  return (
    <figure className="dyn" id="parameter-scans">
      <div className="scan__tabs" role="tablist" aria-label="Scanned parameter">
        {SCAN_DEFS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === which}
            className={`scan__tab${i === which ? " scan__tab--on" : ""}`}
            onClick={() => setWhich(i)}
          >
            <span className="scan__tab-name">{s.label}</span>
            <sub>{s.sub}</sub>
          </button>
        ))}
      </div>

      <div className="dyn__control">
        <label htmlFor="scan-step">
          <span className="dyn__control-name">{scan.label}</span>
          <sub>{scan.sub}</sub>
        </label>
        <input
          id="scan-step"
          type="range"
          min={0}
          max={scan.values.length - 1}
          step={1}
          value={step}
          onChange={(event) => setStep(Number(event.target.value))}
        />
        <output htmlFor="scan-step">
          {value >= 0.01 ? value.toFixed(2) : value.toFixed(3)} {scan.unit}
        </output>
      </div>

      <div className="scan__chart">
        <TimeChart
          title={`Fluxes at ${
            value >= 0.01 ? value.toFixed(2) : value.toFixed(3)
          } ${scan.unit}`}
          xMax={scan.xMax}
          yMax={scan.yMax}
          xTicks={[
            0,
            scan.xMax / 4,
            scan.xMax / 2,
            (scan.xMax * 3) / 4,
            scan.xMax,
          ]}
          yTicks={[
            0,
            scan.yMax / 4,
            scan.yMax / 2,
            (scan.yMax * 3) / 4,
            scan.yMax,
          ]}
          series={[
            ...scan.series.flatMap((s) =>
              s.steps
                .map((pts, i) => ({ pts, i }))
                .filter(({ pts, i }) => i !== step && pts.length > 0)
                .map(({ pts, i }) => ({
                  id: `${s.id}-${i}`,
                  label: s.label,
                  color: s.color,
                  pts,
                  faint: true,
                  silent: true,
                })),
            ),
            ...scan.series
              .filter((s) => s.steps[step].length > 0)
              .map((s) => ({
                id: s.id,
                label: s.label,
                color: s.color,
                pts: s.steps[step],
              })),
          ]}
          yLabel="Flux [mmol gDW⁻¹ h⁻¹]"
          readoutUnit="mmol gDW⁻¹ h⁻¹"
          hint
        />
      </div>

      <ChartLegend items={scan.series} />

      <figcaption>
        <strong>Figure 16.</strong> Parameter scans of the three quantities
        Figure 14 ranks highest: the capacity of the terminal oxidase, the
        capacity of ATP synthase, and the oxygen the cell starts with. Each scan
        has eleven steps, spaced logarithmically across the interval the tabs
        name; the ten not selected stay in the background. These are the zoomed
        panels, on the scale of the polymerisation fluxes. Read back from our
        own COPASI output.
      </figcaption>
    </figure>
  );
}
