/**
 * Content for the Engineering page's scroll-driven DBTL cycle.
 *
 * A phase's content is a list of blocks (paragraph / bulleted list /
 * table / figure placeholder), not a plain paragraph array — some
 * iterations (e.g. Bacterial encapsulation's real write-up) carry data
 * tables and multi-paragraph write-ups too long/structured for flat
 * strings. Inline text supports a small markup: `**bold**` for emphasis,
 * `*italic*` for taxonomic/gene names, `{{...}}` for a bracketed
 * placeholder the team flagged as still pending (rendered as a distinct
 * "pending" tag rather than plain bold, matching how the source document
 * itself highlighted it in red), and `[text](href)` for an inline link —
 * a real `href` (an internal `/path`, or an `assets/...` file resolved the
 * same way ExperimentCard's own protocol links are) renders as a real,
 * quietly-underlined link; an `href` of the form `pending:<what>` renders
 * as a clearly-marked, non-navigable placeholder instead of a guessed URL
 * (see `renderRich` in DbtlCycle.tsx for all of the above). A `figure`
 * block is the same "clearly-labelled stand-in" placeholder Experiments
 * already uses for a table/figure the source hasn't supplied an image for
 * yet (its own `record-figure__placeholder`) — caption only, no `src`.
 *
 * ITERATIONS below (Lab validation → Revalorisation) is the default/
 * placeholder dataset used by any Engineering tab that doesn't pass its
 * own `iterations` prop to <DbtlCycle>. It's still first-pass narrative
 * copy, not final — see Engineering/BacterialEncapsulationData.ts for the
 * one tab (Bacterial encapsulation) that now has the team's real content.
 */

export type PhaseName = "Design" | "Build" | "Test" | "Learn";

export interface ParagraphBlock {
  type: "p";
  text: string;
}

export interface ListBlock {
  type: "ul";
  items: string[];
}

export interface TableCell {
  text: string;
  /** Semantic colour for a data cell — e.g. a pass/fail screening result.
   * Purely visual, doesn't affect the cell's text. */
  tone?: "good" | "bad";
}

export interface TableBlock {
  type: "table";
  headers: string[];
  rows: TableCell[][];
  caption?: string;
}

/** A labelled stand-in for a figure the source calls for but doesn't (yet)
 * supply an actual image for — e.g. a gel photo or a restriction map
 * mentioned in a write-up's Build/Test phase. Deliberately caption-only,
 * same shape as ExperimentCard's own "figure-placeholder" resource kind
 * (see ResourcePane in ExperimentCard.tsx): a real `src` is what turns
 * this into a real figure later, not a new block type. */
export interface FigureBlock {
  type: "figure";
  caption: string;
}

export type ContentBlock =
  | ParagraphBlock
  | ListBlock
  | TableBlock
  | FigureBlock;

export interface Phase {
  name: PhaseName;
  blocks: ContentBlock[];
}

export interface Iteration {
  title: string;
  phases: [Phase, Phase, Phase, Phase];
}

export function p(text: string): ParagraphBlock {
  return { type: "p", text };
}

export function ul(items: string[]): ListBlock {
  return { type: "ul", items };
}

export function cell(text: string, tone?: TableCell["tone"]): TableCell {
  return { text, tone };
}

export function table(
  headers: string[],
  rows: TableCell[][],
  caption?: string,
): TableBlock {
  return { type: "table", headers, rows, caption };
}

export function figure(caption: string): FigureBlock {
  return { type: "figure", caption };
}

export function phase(name: PhaseName, blocks: ContentBlock[]): Phase {
  return { name, blocks };
}

function phaseP(name: PhaseName, paragraphs: string[]): Phase {
  return { name, blocks: paragraphs.map(p) };
}

export const ITERATIONS: Iteration[] = [
  {
    title: "Lab validation",
    phases: [
      phaseP("Design", [
        "We started from the chassis: engineering P. putida KT2440 to express the phosphate-uptake and polyphosphate-storage modules identified through the Design Compass, while keeping the genetic footprint interpretable enough to characterise reliably.",
        "The goal was not maximum theoretical yield, but a construct we could actually measure and trust under controlled laboratory conditions.",
      ]),
      phaseP("Build", [
        "The engineered strain was assembled from modular pSEVA vectors, combining heterologous uptake genes with the endogenous PAO machinery already present in the chassis.",
        "Each construct variant was built and banked separately so we could isolate which genetic element was responsible for a given result.",
      ]),
      phaseP("Test", [
        "We measured phosphate uptake and polyphosphate accumulation under batch conditions, comparing engineered strains against the wild-type baseline.",
        "Reproducibility mattered as much as peak performance — a result we could not repeat was not a result we could build on.",
      ]),
      phaseP("Learn", [
        "The biology worked, but consistency varied more than expected between replicates, pointing to a need for tighter control of growth-phase timing before uptake was measured.",
        "That observation became the starting point for the next iteration: testing under conditions that actually resembled industrial wastewater.",
      ]),
    ],
  },
  {
    title: "Simulated wastewater",
    phases: [
      phaseP("Design", [
        "With the biology validated in ideal conditions, the next design question was how it would behave once variability entered the picture: pH, oxygen availability, organic load and competing ions.",
        "We designed a simulated wastewater matrix intended to sit between clean laboratory media and a real industrial effluent.",
      ]),
      phaseP("Build", [
        "We built a set of synthetic wastewater formulations, each isolating one variable at a time, so a drop in performance could be traced back to its actual cause.",
        "Sampling and assay protocols were adapted so the same colourimetric method could be applied consistently across every condition.",
      ]),
      phaseP("Test", [
        "Phosphate removal and polyphosphate accumulation were tracked across the full matrix of simulated conditions, not just the most favourable one.",
        "We paid particular attention to competing ions, since these are often underestimated in laboratory-only validation.",
      ]),
      phaseP("Learn", [
        "Performance held up better than expected under pH and oxygen variation, but organic load and competing ions clearly reduced uptake efficiency.",
        "That gap between clean-media and representative-media performance justified moving to a closed reactor before testing with a real partner.",
      ]),
    ],
  },
  {
    title: "Closed reactor",
    phases: [
      phaseP("Design", [
        "This iteration moved the question from biology to system integration: the reactor design had to accommodate alginate core-shell encapsulation, basket-based capsule retention and continuous flow.",
        "Containment was treated as a design requirement from the start, not an afterthought bolted on once the reactor already existed.",
      ]),
      phaseP("Build", [
        "We built the basket-type rotating-bed reactor architecture and produced alginate core-shell capsules to physically separate the engineered cells from the outgoing water.",
        "A downstream membrane-polishing stage was included in the proposed architecture, though it remained a theoretical addition at this stage rather than an experimentally validated one.",
      ]),
      phaseP("Test", [
        "We characterised the containment system directly rather than assuming a spherical capsule was sufficient: magnetite visualisation of the core-shell structure, cryosectioning to measure shell thickness, and preliminary leakage assessment.",
        "Continuous-flow operation was tested against the batch conditions used earlier, to see whether the reactor context changed uptake behaviour.",
      ]),
      phaseP("Learn", [
        "The reactor and the capsules needed to be co-designed rather than developed separately — the capsules provide the primary containment barrier, while the reactor architecture reduces the mechanical stress acting on them.",
        "Long-term and failure-condition validation remained open questions, which shaped what we asked for before considering an industrial pilot.",
      ]),
    ],
  },
  {
    title: "Industrial pilot",
    phases: [
      phaseP("Design", [
        "Here the design question changed again: not whether the system worked, but whether it could integrate into a real industrial process without demanding disruptive changes to existing infrastructure.",
        "Modularity became an explicit design requirement, informed directly by what Bio-Oils Huelva told us about retrofitting constraints.",
      ]),
      phaseP("Build", [
        "We adapted the closed-reactor system for operation with controlled effluents from a real industrial partner, rather than laboratory-formulated simulated wastewater.",
        "This was deliberately the latest stage at which we introduced a real, uncontrolled variable — justified only once the earlier checkpoints had shown the system was safe and functional.",
      ]),
      phaseP("Test", [
        "Performance was evaluated against the same phosphate-removal and containment criteria used throughout the route, this time under conditions we could not fully control ourselves.",
        "We treated any divergence from the simulated-wastewater results as informative rather than as a failure to explain away.",
      ]),
      phaseP("Learn", [
        "Testing under real industrial conditions confirmed that the system's core containment and removal performance transferred reasonably well, while also surfacing operational details no laboratory simulation had captured.",
        "Those details became the input for the final iteration: converting recovered phosphorus into something with actual value, rather than treating removal as the end point.",
      ]),
    ],
  },
  {
    title: "Revalorisation",
    phases: [
      phaseP("Design", [
        "The final iteration asked what happens to the phosphorus once it has been removed: recovery without revalorisation would still leave removal-only technologies' basic limitation unresolved.",
        "We designed a PPK2–DHAK pathway, developed with Eduardo García Junceda's group at IQOG-CSIC, to convert stored polyphosphate into phosphorylated molecules rather than treating it as waste.",
      ]),
      phaseP("Build", [
        "The multi-enzymatic revalorisation system was built and tested both early, alongside the original lab-validation work, and again here at the end of the route, closing the loop between the first and the last checkpoint.",
        "The unnecessary Y-filter from our original treatment proposal was removed once this revalorisation pathway gave the recovered phosphorus somewhere real to go.",
      ]),
      phaseP("Test", [
        "We tested recovery yield and product formation from the polyphosphate accumulated across the earlier stages of the route, not from an idealised starting material.",
        "This was also where the maturity distinction we adopted elsewhere in the project — designed, built, tested, validated — became most important to apply honestly.",
      ]),
      phaseP("Learn", [
        "Revalorisation is what changed rePhlow's purpose from removal-only to maintaining phosphorus within a recoverable material cycle.",
        "What we learned here does not close the route so much as define the evidence still required before the next iteration can begin.",
      ]),
    ],
  },
];
