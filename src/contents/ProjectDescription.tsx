import type { ReactNode } from "react";
import { PageSectionNav, type PageSection } from "../components/PageSectionNav";
import "./ProjectDescription.css";

const PROJECT_DESCRIPTION_SECTIONS: PageSection[] = [
  {
    id: "problem-eutrophication",
    label: "The problem: eutrophication",
    children: [
      { id: "what-eutrophication-is", label: "What eutrophication is" },
      { id: "why-it-matters", label: "Why it matters" },
    ],
  },
  {
    id: "eutrophication-in-spain",
    label: "Eutrophication in Spain",
    children: [
      { id: "spain-vulnerability", label: "Why Spain is particularly vulnerable" },
      { id: "mar-menor-case-study", label: "The Mar Menor as a case study" },
    ],
  },
  {
    id: "european-measures",
    label: "European measures",
  },
  {
    id: "our-solution",
    label: "Our solution",
    children: [
      { id: "what-the-solution-is", label: "What the solution is" },
      { id: "how-it-addresses-the-problem", label: "How it addresses the problem" },
      { id: "why-this-approach-is-valuable", label: "Why this approach is valuable" },
    ],
  },
  {
    id: "project-objectives",
    label: "Project objectives",
  },
];

function Callout({
  kind,
  label,
  children,
}: {
  kind: "purpose" | "editorial" | "visual";
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className={`pd-callout pd-callout--${kind}`}>
      {label && <span className="pd-callout__label">{label}</span>}
      {children}
    </div>
  );
}

export function ProjectDescription() {
  return (
    <div className="page-with-section-nav">
      <PageSectionNav
        sections={PROJECT_DESCRIPTION_SECTIONS}
        ariaLabel="Jump to project description section"
      />

      <div className="pd-content-wrap">
        <div className="pd-content">
          <Callout kind="purpose" label="Purpose of the page">
            <p>
              This page should provide the conceptual overview of the
              project: the scientific context, the reasons behind the
              project, and its main objectives.
            </p>
            <p>
              It should not repeat the homepage. Instead, it should
              introduce the project as a short, accessible scientific
              article, guiding the reader from the problem to the proposed
              solution.
            </p>
            <p>The page should:</p>
            <ul>
              <li>
                explain the problem addressed by the project and its
                potential impact;
              </li>
              <li>
                provide a clear summary of the project's goals and
                objectives;
              </li>
              <li>explain why the team chose this problem;</li>
              <li>
                describe the scientific and real-world context that
                inspired the project;
              </li>
              <li>
                include the relevant scientific background and technical
                approach;
              </li>
              <li>
                use diagrams, photographs, maps, and other visual elements
                where they improve understanding.
              </li>
            </ul>
          </Callout>

          {/* 1. The problem: eutrophication */}
          <section id="problem-eutrophication" className="pd-section">
            <h2>1. The problem: eutrophication</h2>

            <div id="what-eutrophication-is" className="pd-subsection">
              <h3>What eutrophication is</h3>
              <p>
                Eutrophication occurs when water bodies receive excessive
                amounts of nutrients, particularly nitrates and phosphates,
                from sources such as agriculture, wastewater, and
                industrial activity.
              </p>
              <p>
                These nutrients promote the rapid growth of algae and other
                microorganisms. The resulting algal blooms can block
                sunlight, reduce oxygen levels, and, in some cases, release
                harmful toxins. This damages aquatic ecosystems and reduces
                water quality.
              </p>
            </div>

            <div id="why-it-matters" className="pd-subsection">
              <h3>Why it matters</h3>
              <p>
                Eutrophication affects aquatic ecosystems worldwide, but
                its consequences also extend to the communities that
                depend on clean water for drinking, food production,
                fishing, tourism, and recreation.
              </p>
              <p>
                Preventing excess nutrients from reaching natural water
                bodies is therefore essential. This is the challenge that
                rePhlow aims to address.
              </p>
            </div>

            <Callout kind="visual" label="Suggested visual">
              <p>
                A photograph of a eutrophic water body or a clear diagram
                showing the main stages of an algal bloom.
              </p>
            </Callout>
          </section>

          {/* 2. Eutrophication in Spain */}
          <section id="eutrophication-in-spain" className="pd-section">
            <h2>2. Eutrophication in Spain</h2>

            <div id="spain-vulnerability" className="pd-subsection">
              <h3>Why Spain is particularly vulnerable</h3>
              <p>
                Spain is especially exposed to nutrient pollution because
                of the intensity of some agricultural and livestock
                activities, together with the contribution of fertilisers,
                wastewater, and industrial discharges.
              </p>
              <p>
                These nutrient inputs can promote recurring algal blooms in
                rivers, reservoirs, coastal lagoons, and other vulnerable
                water bodies.
              </p>
            </div>

            <div id="mar-menor-case-study" className="pd-subsection">
              <h3>The Mar Menor as a case study</h3>
              <p>
                The Mar Menor is one of the clearest examples of the
                ecological consequences of eutrophication in Spain. The
                lagoon has experienced repeated episodes of ecological
                degradation, oxygen depletion, and biodiversity loss.
              </p>
              <p>
                Its deterioration has also affected fisheries, tourism,
                local livelihoods, and the communities that depend on the
                lagoon.
              </p>
            </div>

            <Callout kind="editorial">
              <p>
                Expand this section using the information and evidence
                included in the congress paper.
              </p>
            </Callout>

            <Callout kind="visual" label="Suggested visual">
              <ul>
                <li>a map of Spain highlighting the Mar Menor</li>
                <li>a photograph of the lagoon</li>
                <li>
                  a small diagram showing the main nutrient
                  inputs affecting the area.
                </li>
              </ul>
            </Callout>
          </section>

          {/* 3. European measures to reduce eutrophication */}
          <section id="european-measures" className="pd-section">
            <h2>3. European measures to reduce eutrophication</h2>

            <p>
              The European Union has introduced several regulatory
              measures to reduce nutrient pollution and improve water
              quality.
            </p>
            <p>
              The <strong>Nitrates Directive</strong> addresses pollution
              caused by nitrates from agricultural sources. The{" "}
              <strong>Water Framework Directive</strong> establishes
              environmental objectives for rivers, lakes, groundwater, and
              coastal waters. More recently, the{" "}
              <strong>
                Urban Wastewater Treatment Directive (EU) 2024/3019
              </strong>{" "}
              has updated the European framework for urban wastewater
              treatment and nutrient removal.
            </p>
            <p>
              These measures reflect the growing importance of controlling
              nitrogen and phosphorus discharges. However, eutrophication
              continues to affect many European water bodies, showing that
              effective nutrient removal and recovery remain necessary.
            </p>

            <Callout kind="editorial">
              <ul>
                <li>Nitrates Directive: 91/676/EEC</li>
                <li>Water Framework Directive: 2000/60/EC</li>
                <li>Urban Wastewater Treatment Directive: (EU) 2024/3019</li>
              </ul>
            </Callout>

            <Callout kind="editorial">
              <p>
                Replace the outdated reference to Directive 91/271/EEC with
                the newer Directive (EU) 2024/3019, while mentioning the
                previous directive only if historical context is useful.
              </p>
            </Callout>
          </section>

          {/* 4. Our solution */}
          <section id="our-solution" className="pd-section">
            <h2>4. Our solution</h2>
            <p>This section should introduce rePhlow and explain:</p>

            <div id="what-the-solution-is" className="pd-subsection">
              <h3>What the solution is</h3>
              <p>
                A concise description of the proposed system and the
                biological mechanism it uses.
              </p>
            </div>

            <div id="how-it-addresses-the-problem" className="pd-subsection">
              <h3>How it addresses the problem</h3>
              <p>
                Explain how the project removes or recovers phosphate
                before it reaches natural water bodies.
              </p>
            </div>

            <div id="why-this-approach-is-valuable" className="pd-subsection">
              <h3>Why this approach is valuable</h3>
              <p>
                Compare the proposed solution with existing
                nutrient-removal approaches and explain its potential
                advantages.
              </p>
            </div>

            <p>
              This section should remain conceptual. Detailed experimental
              methods, constructs, modelling results, and validation should
              be developed on their respective pages.
            </p>
          </section>

          {/* 5. Project objectives */}
          <section id="project-objectives" className="pd-section">
            <h2>5. Project objectives</h2>
            <p>
              End the page with a concise list of the project's main
              objectives.
            </p>
            <p>For example:</p>
            <ul>
              <li>develop a biological strategy for phosphate removal or recovery;</li>
              <li>optimise phosphate uptake and polyphosphate accumulation;</li>
              <li>evaluate the system experimentally and computationally;</li>
              <li>assess its relevance for nutrient-rich wastewater;</li>
              <li>contribute to a more circular use of phosphorus.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
