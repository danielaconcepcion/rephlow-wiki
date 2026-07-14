import { lazy, Suspense } from "react";
import { PageSectionNav, type PageSection } from "../../components/PageSectionNav";
import "./Model.css";

// d3-force/d3-zoom/d3-selection are only worth loading on this one page, so
// they're dynamically imported here rather than pulled into the app's
// shared entry chunk via the normal top-of-file import every other page
// uses.
const MetabolicNetworkGraph = lazy(() =>
  import("./MetabolicNetworkGraph").then((mod) => ({
    default: mod.MetabolicNetworkGraph,
  })),
);

const MODEL_SECTIONS: PageSection[] = [
  { id: "metabolic-network", label: "Genome-scale metabolic network" },
];

export function Model() {
  return (
    <div className="page-with-section-nav">
      <PageSectionNav sections={MODEL_SECTIONS} ariaLabel="Jump to model section" />

      <section id="metabolic-network" className="model-network">
        <div className="model-network__intro">
          <h2>Genome-scale metabolic network</h2>
          <p>
            Flux distribution for the iJN1463 model of <em>Pseudomonas
            putida</em>, restricted to reactions carrying nonzero flux under
            the rePhlow biomass objective. Squares are reactions, coloured
            by metabolic subsystem; circles are metabolites, shown in a
            single colour since a metabolite can belong to several
            subsystems at once. Edge thickness reflects the (log-scaled)
            absolute flux — hover or tap a node for details, and drag one
            to see its neighbors respond.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="model-network__graph">
              <p className="model-network__status">Loading metabolic network…</p>
            </div>
          }
        >
          <MetabolicNetworkGraph />
        </Suspense>
      </section>
    </div>
  );
}
