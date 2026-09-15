import { useEffect, useRef, useState } from "react";
import { asset } from "../../utils/asset";
import "./GrowthPolypSurface.css";

/**
 * Interactive Growth × Pi uptake × PolyP flux surface (Model.tsx, section
 * 3.1, "What ultimately sets the PolyP ceiling?"). Replaces the notebook's
 * repetitive six-panel phosphate-bound grid with one rotatable 3D view.
 *
 * The plotted data is the *exact* trace/layout JSON exported by the
 * notebook's own interactive cell (02_environmental_response_and_genetic_
 * targets.ipynb, the cell producing growth_polyp_pi_3d_equal_molar_
 * interactive.html) — extracted once from that ~4.7MB self-contained HTML
 * (see rephlow-model's figure-extraction step) and saved as a small JSON
 * asset, so this component ships only a slim gl3d Plotly build instead of
 * re-embedding the notebook's full inline plotly.js bundle. No FBA/pFBA is
 * rerun here: every point plotted is one of the notebook's own production-
 * envelope solutions, and the translucent surfaces exist only to connect
 * those points, not to imply extra resolution.
 *
 * Below 640px, the WebGL view is replaced by the notebook's own static PNG
 * render of the same figure — gl3d's touch support is inconsistent enough
 * on small/older mobile devices that a plain image is the safer default
 * there, per the "static alternative or usable on mobile" requirement.
 */

const DATA_URL = asset("assets/model/data/growth-polyp-pi-3d.json");
const STATIC_IMAGE_URL = asset("assets/model/growth-polyp-pi-3d-static.png");

type PlotlyModule = typeof import("plotly.js-gl3d-dist-min");

let plotlyPromise: Promise<PlotlyModule> | null = null;
function loadPlotly(): Promise<PlotlyModule> {
  if (!plotlyPromise) {
    plotlyPromise = import("plotly.js-gl3d-dist-min");
  }
  return plotlyPromise;
}

export function GrowthPolypSurface() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    let plotted: HTMLDivElement | null = null;

    async function render() {
      try {
        const [Plotly, response] = await Promise.all([
          loadPlotly(),
          fetch(DATA_URL),
        ]);
        if (!response.ok) {
          throw new Error(`Failed to load 3D data: ${response.status}`);
        }
        const figure = await response.json();
        if (cancelled || !containerRef.current) return;

        await Plotly.newPlot(
          containerRef.current,
          figure.data,
          {
            ...figure.layout,
            autosize: true,
            font: { family: "Inter, Helvetica, Arial, sans-serif", size: 12 },
          },
          {
            displaylogo: false,
            scrollZoom: true,
            responsive: true,
          },
        );
        plotted = containerRef.current;
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    render();

    return () => {
      cancelled = true;
      if (plotted) {
        loadPlotly().then((Plotly) => Plotly.purge(plotted!));
      }
    };
  }, []);

  return (
    <div className="growth-polyp-surface">
      <div
        className="growth-polyp-surface__interactive"
        ref={containerRef}
        role="img"
        aria-label="Interactive 3D surface of growth rate, maximum phosphate uptake and maximum PolyP flux for five carbon sources at equal molar uptake"
      >
        {status === "loading" && (
          <p className="growth-polyp-surface__status">
            Loading interactive surface…
          </p>
        )}
        {status === "error" && (
          <p className="growth-polyp-surface__status">
            The interactive surface could not be loaded. See the static
            figure below.
          </p>
        )}
      </div>

      <div className="growth-polyp-surface__static">
        <img
          src={STATIC_IMAGE_URL}
          alt="Static 3D surface of growth rate, maximum phosphate uptake and maximum PolyP flux for five carbon sources at equal molar uptake"
        />
      </div>
    </div>
  );
}
