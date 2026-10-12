import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { asset } from "../../utils/asset";
import { ContainmentLayers } from "./ContainmentLayers";
import type { PictogramName } from "./Pictogram";

/* --------------------------------------------------------------------------
   Safety — leaflet content. Text is the team's Notion page (WIKI > Safety),
   unchanged; each leaflet splits it over the three panels of a tri-fold.
   Panel headings and labels only organise that text.
   -------------------------------------------------------------------------- */

export type LeafletId = "lab" | "solution";

export interface LeafletPanel {
  icon: PictogramName;
  heading: string;
  body: ReactNode;
}

export interface Leaflet {
  id: LeafletId;
  number: string;
  title: string;
  /** Short line under the title on the folded cover. */
  tagline: string;
  /** Pictograms on the folded cover. */
  coverIcons: PictogramName[];
  /** Small print along the bottom of the cover. */
  footer: string;
  panels: [LeafletPanel, LeafletPanel, LeafletPanel];
}

const img = (name: string) => asset(`assets/safety/${name}`);

export const LEAFLETS: Leaflet[] = [
  {
    id: "lab",
    number: "01",
    title: "Safety in the lab",
    tagline: "Biosafety Level 1 · contained, supervised, trained",
    coverIcons: ["goggles", "gloves", "coat"],
    footer: "Complutense University of Madrid · BSL-1",
    panels: [
      {
        icon: "dish",
        heading: "Organisms & containment",
        body: (
          <>
            <ul className="sf-facts" aria-label="Key facts">
              <li>BSL-1</li>
              <li>
                <em>E. coli</em> · <em>P. putida</em> KT2440
              </li>
              <li>No pathogens</li>
              <li>No environmental release</li>
            </ul>
            <p>
              Safety was considered throughout the design and implementation of
              the rePhlow project. Our work involved non-pathogenic laboratory
              strains, genetically modified microorganisms, hazardous chemicals
              and a range of molecular biology, microbiology, enzymology and
              bioprocessing techniques. All laboratory work was therefore
              carried out under Biosafety Level 1 conditions, following the
              safety procedures of the Complutense University of Madrid and the
              applicable regulations governing the contained use of genetically
              modified microorganisms.
            </p>
            <p>
              The project was restricted to laboratory strains, including{" "}
              <em>Escherichia coli</em> strains and <em>Pseudomonas putida</em>{" "}
              KT2440. No pathogens, human or animal samples were used, and no
              experiments involving environmental release were performed.
              Biological work was conducted following good microbiological
              practice and appropriate sterile technique, using approved
              laboratory spaces and the appropriate containment equipment for
              each procedure.
            </p>
          </>
        ),
      },
      {
        icon: "goggles",
        heading: "People, protection & procedures",
        body: (
          <>
            <p>
              Laboratory personnel received training in laboratory access and
              rules, biosafety, good microbial technique, disinfection and
              sterilisation, emergency procedures, and chemical, fire and
              electrical safety. Appropriate personal protective equipment,
              including laboratory coats, gloves and eye protection where
              required, was used according to the procedure and associated
              risks. Work was performed under the supervision of our PI,
              supervisors, laboratory technicians and other responsible
              laboratory staff.
            </p>
            <p>
              Chemical reagents were handled according to their safety data
              sheets and institutional procedures. Particular care was taken
              when working with flammable solvents, corrosive acids and bases,
              and hazardous reagents used in molecular biology, electrophoresis
              and enzymatic assays. Additional risks associated with procedures
              and equipment such as centrifugation, electrophoresis, heating,
              autoclaving, liquid nitrogen and bioreactor assembly were managed
              through appropriate training, supervision and established
              operating procedures.
            </p>
          </>
        ),
      },
      {
        icon: "bin",
        heading: "Waste, incidents & decisions",
        body: (
          <>
            <p>
              Biological waste, including bacterial cultures, contaminated
              consumables, was decontaminated before disposal according to
              laboratory procedures. Chemical waste was collected separately and
              managed through the appropriate institutional waste-disposal
              procedures. In the event of a spill, exposure, equipment failure
              or other unexpected incident, work was stopped, the responsible
              laboratory personnel were notified and the established emergency
              and accident-reporting procedures were followed.
            </p>
            <p>
              Throughout the project, safety decisions were made with the
              support of our supervisors, laboratory technicians and relevant
              institutional staff. The experimental design was also adapted to
              reduce risk by avoiding pathogens, human and animal
              experimentation, and environmental release, while keeping the
              project at laboratory scale and under contained conditions.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "solution",
    number: "02",
    title: "Safety in our solution",
    tagline: "A contained biological treatment system",
    coverIcons: ["capsule", "filter", "shield"],
    footer: "rePhlow · safety by design",
    panels: [
      {
        icon: "capsule",
        heading: "Contained, not released",
        body: (
          <>
            <p>
              Safety was also considered in the design of rePhlow itself. Our
              system is intended to operate as a contained biological treatment
              system, rather than as an open-release application.
            </p>
            <p>
              The engineered biological component is designed to be immobilised
              within alginate core-shell capsules. This physical containment
              strategy keeps the bacteria within a recoverable matrix during
              wastewater treatment, while the capsules can subsequently be
              removed from the treated water through downstream filtration and
              recovery.{" "}
              <Link className="sf-link" to="/project-description#encapsulation">
                Project description
              </Link>
            </p>
            <figure className="sf-figure">
              <img
                src={img("beads-and-core-shell.webp")}
                alt="Two capsules with bacteria inside: an alginate bead, with the bacteria held in a meshed matrix, and a core-shell capsule, with the bacteria in a liquid core surrounded by a shell."
                loading="lazy"
              />
              <figcaption>
                Alginate bead (left) and core-shell capsule (right).
              </figcaption>
            </figure>
          </>
        ),
      },
      {
        icon: "flask",
        heading: "Tested to hold",
        body: (
          <>
            <p>
              We experimentally evaluated the ability of the core-shell system
              to retain its biological contents during synthesis and under
              relevant conditions. The potential for material to pass through
              the capsule shell was also investigated through.{" "}
              <Link className="sf-link" to="/experiments">
                Experiments
              </Link>
            </p>
            <figure className="sf-figure">
              <img
                src={img("encapsulation-system.webp")}
                alt="Encapsulation system: two syringes, one with bacteria and one with alginate, feed a coaxial nozzle; the drops fall into a beaker of CaCl2, where they form capsules containing bacteria."
                loading="lazy"
              />
              <figcaption>Encapsulation system.</figcaption>
            </figure>
          </>
        ),
      },
      {
        icon: "shield",
        heading: "Layers of containment",
        body: (
          <>
            <ContainmentLayers />
            <p>
              Together, immobilisation, capsule recovery and downstream
              filtration provide several layers of physical containment. These
              measures are intended to minimise the possibility of engineered
              bacteria entering the treated water or the surrounding
              environment, while allowing the biological component to be
              recovered after treatment.
            </p>
            <p className="sf-principle">
              The system was therefore designed around a simple principle: the
              engineered microorganisms should remain inside a recoverable
              structure throughout operation.
            </p>
          </>
        ),
      },
    ],
  },
];
