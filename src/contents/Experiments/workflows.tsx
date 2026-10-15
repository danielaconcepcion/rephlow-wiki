import type { WorkflowSpec } from "../../components/LabFolders/Workflow";

/* --------------------------------------------------------------------------
   The four blocks' experimental workflows.

   Each one keeps the stages, the order and the wording of the figure it
   replaces — the five panels of the encapsulation diagram, the six steps
   of the enzyme route, the two nine-step sequences the Genetic
   engineering sub-blocks spell out in their own intros, and the six
   stages of the conversion module, closing back on itself. What changes
   is only how they are drawn (see Workflow/WorkflowRun.tsx): a rail with
   drawn stations instead of a flat image, and every stage a link into
   the experiment that ran it.
   -------------------------------------------------------------------------- */

export const ENCAPSULATION_WORKFLOW: WorkflowSpec = {
  cols: 3,
  ghost: "core-shell",
  ariaLabel: "Encapsulation workflow — jump to an experiment",
  caption:
    "Workflow of the encapsulation platform, from the raw alginate to the finished core-shell capsule. Each stage opens the experiment that ran it; stages 1–12 are detailed in Engineering and in the folders below.",
  stages: [
    {
      n: "1",
      name: "Raw material characterisation",
      note: "FTIR: the M/G ratio of the alginate everything else is built from",
      glyph: "alginate-powder",
      section: "alginate-characterisation",
      target: "ftir",
    },
    {
      n: "2–5",
      name: "Bead optimisation",
      note: "concentration, drop height, flow rate, crosslinking time",
      glyph: "drip-beads",
      section: "alginate-characterisation",
      target: "concentration-drop-height",
    },
    {
      n: "6–7",
      name: "Core-shell optimisation",
      note: "alginate and CaCl₂ concentrations, then the Qe:Qi ratio",
      glyph: "core-shell",
      section: "core-shell-formation",
      target: "concentrations-screening",
    },
    {
      n: "8–10",
      name: "Core-shell validation",
      note: "containment, mechanical resistance, chemical environment",
      glyph: "compression",
      section: "core-shell-formation",
      target: "containment",
    },
    {
      n: "11–12",
      name: "Core-shell characterisation",
      note: "TGA-DSC, optical microscopy, SEM and EDS",
      glyph: "thermal-surface",
      section: "final-characterisation",
      target: "tga-dsc",
    },
  ],
};

export const ENZYMATIC_WORKFLOW: WorkflowSpec = {
  cols: 3,
  ghost: "immobilised",
  ariaLabel:
    "Enzyme production and immobilisation workflow — jump to an experiment",
  caption:
    "The six steps this block runs through, from mining the databases for candidate enzymes to fixing the purified panel onto the sphere. Each stage opens the experiment that ran it.",
  stages: [
    {
      n: "1",
      name: "Mining",
      note: "EnzymeMiner + BRENDA + UniProt",
      glyph: "mining",
      section: "enzyme-production",
      target: "bioinformatic-mining",
    },
    {
      n: "2",
      name: "Cloning",
      note: "3D modelling + vector choosing",
      glyph: "fold-clone",
      section: "enzyme-production",
      target: "structural-design",
    },
    {
      n: "3",
      name: "Expression",
      note: "IPTG vs autoinduction + solubility",
      glyph: "gel",
      section: "enzyme-production",
      target: "recombinant-expression",
    },
    {
      n: "4",
      name: "Purification",
      note: "IMAC on Ni-NTA column",
      glyph: "column",
      section: "enzyme-production",
      target: "imac-purification",
    },
    {
      n: "5",
      name: "Characterisation",
      note: "activity + concentration",
      glyph: "plate-curve",
      section: "enzyme-production",
      target: "functional-characterisation",
    },
    {
      n: "6",
      name: "Immobilisation",
      note: "covalent vs ionic + cross-linking",
      glyph: "immobilised",
      section: "immobilisation-chemistry",
      target: "immobilisation-strategy-a",
    },
  ],
};

export const GENETIC_CLONING_WORKFLOW: WorkflowSpec = {
  cols: 5,
  ghost: "chassis",
  ariaLabel: "Cloning workflow — jump to an experiment",
  caption:
    "The cloning route, run in parallel for both constructs: built and verified in the E. coli host, and only then moved into the chassis. Each step opens its own experiment.",
  stages: [
    {
      n: "1",
      name: "In silico design",
      note: "promoter, RBS, CDS and cloning sites",
      glyph: "design",
      section: "cloning",
      target: "cloning-design",
    },
    {
      n: "2",
      name: "Part acquisition",
      note: "synthesis and amplification",
      glyph: "pcr",
      section: "cloning",
      target: "cloning-parts",
    },
    {
      n: "3",
      name: "Preparative digestion",
      note: "vectors and inserts cut to match",
      glyph: "digest",
      section: "cloning",
      target: "cloning-digestion",
    },
    {
      n: "4",
      name: "Ligation",
      note: "insert into backbone",
      glyph: "ligate",
      section: "cloning",
      target: "cloning-ligation",
    },
    {
      n: "5",
      name: "E.\u00a0coli transformation",
      note: "the fast, transformable host first",
      glyph: "transform",
      section: "cloning",
      target: "cloning-ecoli-transformation",
    },
    {
      n: "6",
      name: "Colony screening",
      note: "picking the clones that carry the insert",
      glyph: "colonies",
      section: "cloning",
      target: "cloning-colony-screening",
    },
    {
      n: "7",
      name: "Sequence confirmation",
      note: "the construct read end to end",
      glyph: "sequencing",
      section: "cloning",
      target: "cloning-sequence-confirmation",
    },
    {
      n: "8",
      name: "P.\u00a0putida transformation",
      note: "transfer to the final chassis",
      glyph: "chassis",
      section: "cloning",
      target: "cloning-pputida-transformation",
    },
    {
      n: "9",
      name: "Expression check",
      note: "the cassettes working in the chassis",
      glyph: "expressed",
      section: "cloning",
      target: "cloning-expression-confirmation",
    },
  ],
};

export const GENETIC_KNOCKOUT_WORKFLOW: WorkflowSpec = {
  cols: 5,
  ghost: "base-edit",
  ariaLabel: "Knocking-out workflow — jump to an experiment",
  caption:
    "The base-editing route, repeated once per target until the triple mutant is in hand. Each step opens its own experiment.",
  stages: [
    {
      n: "1",
      name: "Guide design",
      note: "a CAA, CAG or CGA inside the editing window",
      glyph: "guide-design",
      section: "knocking-out",
      target: "knockout-guide-design",
    },
    {
      n: "2",
      name: "gRNA amplification",
      note: "the guide built by PCR",
      glyph: "pcr",
      section: "knocking-out",
      target: "knockout-grna-amplification",
    },
    {
      n: "3",
      name: "Golden Gate",
      note: "guide into pMBEC2, in place of msfGFP",
      glyph: "golden-gate",
      section: "knocking-out",
      target: "knockout-golden-gate",
    },
    {
      n: "4",
      name: "Fluorescence screening",
      note: "correct clones lose their green",
      glyph: "fluorescence",
      section: "knocking-out",
      target: "knockout-fluorescence-screening",
    },
    {
      n: "5",
      name: "Delivery",
      note: "the editor into P. putida",
      glyph: "delivery",
      section: "knocking-out",
      target: "knockout-delivery",
    },
    {
      n: "6",
      name: "Editing",
      note: "C·G to T·A, a premature stop by chemistry",
      glyph: "base-edit",
      section: "knocking-out",
      target: "knockout-editing",
    },
    {
      n: "7",
      name: "Screening of edits",
      note: "sequencing the window",
      glyph: "sequencing",
      section: "knocking-out",
      target: "knockout-sequencing-screen",
    },
    {
      n: "8",
      name: "Curing & iteration",
      note: "lose the plasmid, start the next target",
      glyph: "curing",
      section: "knocking-out",
      target: "knockout-curing",
    },
    {
      n: "9",
      name: "Triple mutant",
      note: "all three inactivations verified together",
      glyph: "triple-mutant",
      section: "knocking-out",
      target: "knockout-triple-mutant-verification",
    },
  ],
};

export const REVALORISATION_WORKFLOW: WorkflowSpec = {
  cols: 3,
  ghost: "multi-enzyme",
  loop: true,
  ariaLabel: "Conversion module workflow — jump to an experiment",
  caption:
    "The six stages of the conversion module. Each produces the material and the information the next one needs, and what the coupled pair reveals feeds back into the design — the dashed return. Each stage opens the experiment that ran it.",
  stages: [
    {
      n: "1",
      name: "Computational stability engineering",
      note: "PROSS, two cycles on DHAK",
      glyph: "in-silico",
      section: "computational-design",
      target: "dhak-in-silico-stabilisation",
    },
    {
      n: "2",
      name: "Enzyme expression",
      note: "transformation, induction, cell-free extract",
      glyph: "expression",
      section: "enzyme-expression",
      target: "gene-acquisition-transformation",
    },
    {
      n: "3",
      name: "Enzyme purification",
      note: "IMAC, dialysis and size exclusion",
      glyph: "purification",
      section: "enzyme-purification",
      target: "imac-purification",
    },
    {
      n: "4",
      name: "Enzyme activity assays",
      note: "DHAK followed spectrophotometrically",
      glyph: "activity-assay",
      section: "activity-assay",
      target: "dhak-activity-assay",
    },
    {
      n: "5",
      name: "Multi-enzyme system",
      note: "DHAK and PPK2 assembled and tested together",
      glyph: "multi-enzyme",
      section: "activity-assay",
      target: "coupled-dhak-ppk2-assay",
    },
    {
      n: "6",
      name: "SpyTag–SpyCatcher channelling",
      note: "the two activities fused for substrate channelling",
      glyph: "channelling",
      section: "computational-design",
      target: "spytag-spycatcher-channelling",
    },
  ],
};
