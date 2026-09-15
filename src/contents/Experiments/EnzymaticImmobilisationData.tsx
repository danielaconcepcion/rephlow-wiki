import type { ReactNode } from "react";
import type { ExperimentSubBlock } from "../../components/LabFolders/types";
import { SelectionFunnel } from "./SelectionFunnel";

/** An inline "[n]" citation. Unlike Genetic engineering / Alginate
 * encapsulation, this whole block shares ONE reference list (see
 * ENZYMATIC_IMMOBILISATION_REFERENCES below) rather than one list per
 * sub-block — the source itself cites across both "Enzyme production" and
 * "Immobilisation chemistry" from a single numbered list at the very end
 * of the page, so `scope` is always this block's own id. */
function Cite({ n }: { n: number }) {
  return (
    <a href={`#ref-enzymatic-immobilisation-${n}`} className="lab-citation">
      [{n}]
    </a>
  );
}

/** Named lab protocols for "Immobilisation chemistry" — same convention as
 * Genetic engineering's own PROTOCOL/protocolLinks: each renders as its own
 * "Protocols:" download link on the experiment card. No protocol document
 * exists yet for any of these (the source itself only says "see the
 * Protocols page [link pending]"), so labels and hrefs are topical
 * placeholders standing in for the eventual real names/files. */
const PROTOCOL: Record<string, { label: string; href: string }> = {
  "lecitase-activity-assay": {
    label: "Lecitase Ultra activity assay (pNPB)",
    href: "assets/protocols/lecitase-activity-assay.pdf",
  },
  "manae-agarose-preparation": {
    label: "MANAE-agarose support preparation",
    href: "assets/protocols/manae-agarose-preparation.pdf",
  },
  "immobilisation-strategy-a": {
    label: "Covalent immobilisation (Strategy A)",
    href: "assets/protocols/immobilisation-strategy-a.pdf",
  },
  "immobilisation-strategy-b": {
    label: "Ionic adsorption + crosslinking (Strategy B)",
    href: "assets/protocols/immobilisation-strategy-b.pdf",
  },
  "detergent-effect-assay": {
    label: "Detergent-effect assay (Triton X-100)",
    href: "assets/protocols/detergent-effect-assay.pdf",
  },
  "immobilisation-yield-assay": {
    label: "Immobilisation yield assay",
    href: "assets/protocols/immobilisation-yield-assay.pdf",
  },
  "pymol-modelling-scripts": {
    label: "PyMOL modelling scripts",
    href: "assets/protocols/pymol-modelling-scripts.pdf",
  },
};
function protocolLinks(...names: string[]) {
  return names.map((n) => PROTOCOL[n]);
}

/**
 * Real content for the "Enzymatic immobilisation" Experiments block —
 * transcribed from the team's own write-up (Notion export, "Experiments /
 * Enzymatic immobilisation") and the images/tables already extracted from
 * it (see the processed assets under public/assets/experiments/
 * enzymatic-immobilisation/).
 *
 * Structure mirrors Genetic engineering's: a block intro, a conceptual
 * "The four parts of the system" section (PLA / PLC / NAP / Phytases —
 * see ENZYME_ACTIVITIES below, rendered by EnzymeActivityGrid rather than
 * as folders, since none of them are experiments), then two numbered
 * workflows ("Sub-block 1: Enzyme production", "Sub-block 2:
 * Immobilisation chemistry").
 *
 * Content decisions (no wording invented, only adapted to what this
 * component family can render):
 * - The intro's two bullet points ("Produce the enzyme panel…" / "Immobilise
 *   them…") are rewritten as flowing prose, matching the same fix already
 *   applied to Genetic engineering's intro bullets.
 * - The source mentions an unembedded schematic of "the functionalised
 *   rePhlow sphere" (a callout carrying only the figure's own caption, no
 *   image) — kept as a real `image-placeholder`, the exact treatment this
 *   component family's placeholder system was built for (see
 *   PairedResource in types.ts).
 * - Several stray, caption-less 1×1 embeds scattered through the source
 *   (Notion's own blank-image artifacts, not real figures — no caption, no
 *   accompanying description) are silently dropped rather than rendered as
 *   placeholders, since a placeholder implies real, described missing
 *   content and these carry none.
 * - Each activity's "GIF (storyboard)" line describes a hypothetical
 *   explanatory animation the team hasn't produced — kept as a clearly
 *   labelled text description in EnzymeActivityGrid, not as a real media
 *   placeholder, exactly as GeneSystemGrid already does for Genetic
 *   engineering.
 * - The selection funnel is rendered as a real, live component
 *   (SelectionFunnel) instead of the source's own static screenshot.
 * - Every real photo the team supplied (agarose/SDS-PAGE gels, PyMOL
 *   structures) is a real `image` or `image-group` resource now, using the
 *   source's own captions verbatim — this is the first block in the site
 *   to have real photographic figures rather than placeholders.
 * - Two cross-references to another experiment ("see Experiment 5",
 *   "(Experiment 7)") are kept exactly as written, even though this deck's
 *   own tabs aren't numbered 1-7 the same way the source's toggles were —
 *   not renamed to a tab label, since the instruction was to change
 *   nothing about the source's own wording.
 * - Every "Protocol: see the Protocols page [link pending]" / "PyMOL
 *   scripts: see the Protocols page [link pending]" line is dropped from the
 *   prose and replaced with a real `protocols` download-link field (see
 *   PROTOCOL/protocolLinks below), matching the convention already used in
 *   Genetic engineering — the source doesn't have real protocol documents
 *   yet either, so these point at the same kind of placeholder PDF paths
 *   Genetic engineering's own protocol links use, with topical placeholder
 *   titles standing in for the eventual real protocol names.
 * - Inline "[n]" citations are reproduced exactly as numbered in the
 *   source. The source's own numbering has a real inconsistency: several
 *   citations in "Sub-block 1: Enzyme production" don't match their
 *   listed reference (e.g. "EnzymeMiner [1]" in the text, but reference
 *   [1] in the list is an unrelated patent — EnzymeMiner is actually [2]).
 *   "Sub-block 2: Immobilisation chemistry"'s citations are internally
 *   consistent. This isn't fixed here — silently renumbering could get the
 *   intended mapping wrong — see the summary note back to the team instead.
 */

export const ENZYMATIC_IMMOBILISATION_INTRO: ReactNode[] = [
  <>
    Phosphorus is at once a finite, critical resource (fertilisers, with no chemical substitute) and a key wastewater
    pollutant that drives eutrophication. In vegetable oil refining, the <strong>acid degumming</strong> step
    (typically 85% v/v phosphoric acid) generates effluents loaded with organic phosphorus: partially hydrolysed
    phospholipids, phytate and free phosphate. Conventional chemical precipitation cannot reach phosphorus that is
    covalently bound to organic matrices, so these effluents systematically exceed the discharge limits set by
    Directive (EU) 2024/3019, and the phosphorus is lost instead of recovered.
  </>,
  <>
    <strong>RePhlow</strong> closes this loop with modular spheres whose alginate core holds the engineered
    phosphorus-accumulating organism (PAO, see the <strong>Genetic engineering</strong> block) and whose surface is{" "}
    <strong>functionalised with a panel of phosphohydrolases</strong>. These surface enzymes mineralise organic
    phosphorus into free orthophosphate, which the encapsulated <em>Pseudomonas putida</em> KT2440 then imports and
    locks away as polyphosphate. In other words, this block builds the enzymatic layer that feeds the engineered
    chassis.
  </>,
  <>
    The strategy has <strong>two complementary arms</strong>: to <strong>produce</strong> the enzyme panel, we mine
    candidate phosphohydrolases (phospholipases, non-specific acid phosphatases and phytases), express them
    heterologously in <em>Escherichia coli</em>, purify them by IMAC and characterise them under simulated industrial
    conditions (pH 5.0, 30 ºC); and to <strong>immobilise</strong> them, we work out the immobilisation chemistry on
    a simple, previously optimised model support (MANAE-agarose), using the commercial chimera{" "}
    <strong>Lecitase Ultra</strong> as a demanding model enzyme, before transferring the winning strategy to the
    alginate-chitosan-genipin sphere.
  </>,
  <>
    In one sentence: we{" "}
    <strong>
      make the enzymes that release phosphate from the degumming waste, and we work out how to fix them onto the
      sphere without killing their activity
    </strong>
    .
  </>,
];

export interface EnzymeActivity {
  id: string;
  shortName: string;
  fullName: string;
  whatItDoes: ReactNode;
  whatWeDo: ReactNode;
  storyboard: ReactNode;
}

/** The four catalytic activities — see EnzymeActivityGrid.tsx. */
export const ENZYME_ACTIVITIES: EnzymeActivity[] = [
  {
    id: "pla",
    shortName: "PLA",
    fullName: "Type A phospholipases",
    whatItDoes: (
      <>
        These hydrolases cleave the <strong>carboxylic ester bonds</strong> of glycerophospholipids. PLA1 (EC
        3.1.1.32) acts at the sn1 position and PLA2 (EC 3.1.1.4) at the sn2 position, releasing free fatty acids and
        lysophospholipids. Removing these acyl chains reduces the hydrophobicity and viscosity of the gums, so the
        rest of the cocktail can reach the phosphate head group with less steric impediment.
      </>
    ),
    whatWeDo: (
      <>
        We cover this activity with the commercial chimera <strong>Lecitase Ultra</strong> (a fusion of lipase from{" "}
        <em>Thermomyces lanuginosus</em> and phospholipase A1 of <em>Fusarium oxysporum</em>), chosen as the{" "}
        <strong>immobilisation model</strong> because it is the hardest enzyme to stabilise: its active site is
        occluded by a lid that requires interfacial activation, and it tends to form bimolecular aggregates. In
        parallel, a metagenomic esterase (EstE1) was produced recombinantly as a candidate PLA activity.
      </>
    ),
    storyboard:
      "a phospholipid with two acyl chains; scissors snip the ester bonds at sn1 and sn2; the fatty acids drift off and a lysophospholipid is left behind, the gum visibly thinning.",
  },
  {
    id: "plc",
    shortName: "PLC",
    fullName: "Type C phospholipases",
    whatItDoes: (
      <>
        Phospholipase C (EC 3.1.4.3) is a <strong>phosphodiesterase</strong> that breaks the ester bond between
        glycerol and the phosphate group. Its action releases a diacylglycerol (DAG), which stays in the oil phase
        and increases refined-oil yield, and a water-soluble phosphorylated head group (for example phosphocholine
        or phosphoethanolamine) that passes into the aqueous phase in a much easier form to process.
      </>
    ),
    whatWeDo: (
      <>
        Two candidates were selected, plc from <em>Thermococcus kodakarensis</em> and cerA from{" "}
        <em>Bacillus cereus</em>. Recombinant expression was attempted but both proved{" "}
        <strong>
          cytotoxic to <em>E. coli</em>
        </strong>
        , since PLCs with alpha-toxin homology hydrolyse essential membrane phospholipids of the host. This activity
        is therefore redirected to cell-free <strong>IVTT (In Vitro Transcription–Translation)</strong>, a system
        suited to toxic, membrane-associated proteins because it does not rely on host viability.
      </>
    ),
    storyboard:
      "a glycerophospholipid; a cut falls between the glycerol backbone and the phosphate; the DAG stays in the oil layer while the phospho-head dissolves into the water below.",
  },
  {
    id: "nap",
    shortName: "NAP",
    fullName: "Non-specific acid phosphatases",
    whatItDoes: (
      <>
        Acid phosphatases (EC 3.1.3.2) complete the mineralisation, releasing inorganic orthophosphate (Pi) from
        phosphate monoesters once the phospholipases have exposed them. The <strong>non-specific</strong> variants
        are ideal here because they keep their activity and structural stability across the pH 4.5 to 6.0 range
        typical of the effluent after acid degumming, and they act on a wide range of substrates.
      </>
    ),
    whatWeDo: (
      <>
        Two representatives were produced, <strong>AphA</strong> (from <em>E. coli</em>) and <strong>M2-32</strong>{" "}
        (from a metagenome). Both were expressed in <em>E. coli</em>, purified by IMAC and characterised. AphA turned
        out to be the most efficient biocatalyst per unit mass of the whole panel.
      </>
    ),
    storyboard:
      "a phosphate monoester bobbing in solution; the terminal phosphate is snipped off and floats away as free orthophosphate, ready for uptake.",
  },
  {
    id: "phytases",
    shortName: "Phytases",
    fullName: "Phytases",
    whatItDoes: (
      <>
        Phytate (myo-inositol hexaphosphate) is the main phosphorus store in vegetable seeds, so it is constantly
        present in crude oils, and it resists common phosphatases because of its high negative charge density.
        Phytases release its six phosphate groups sequentially. They are classified as 3-phytases (EC 3.1.3.8) or
        4/6-phytases (EC 3.1.3.26) depending on where they initiate hydrolysis on the inositol ring.
      </>
    ),
    whatWeDo: (
      <>
        Two candidates were selected, appA from <em>Yersinia intermedia</em> and phyA from{" "}
        <em>Obesumbacterium proteus</em>. <strong>PhyA</strong> was solubilised, purified and characterised, and
        stands alongside AphA as a key component for the recovery bioreactor.
      </>
    ),
    storyboard:
      "a fully loaded inositol ring bristling with six phosphates; one by one the phosphates pop off around the ring until the ring is bare.",
  },
];

const GEL_DIR = "assets/experiments/enzymatic-immobilisation/gels";
const STRUCT_COLOR_DIR = "assets/experiments/enzymatic-immobilisation/structures-colored";
const STRUCT_CYS_DIR = "assets/experiments/enzymatic-immobilisation/structures-cys-bridges";

export const ENZYMATIC_IMMOBILISATION_SUBBLOCKS: ExperimentSubBlock[] = [
  {
    id: "enzyme-production",
    heading: "1. Enzyme production",
    intro: [
      <>
        In this block we build and validate the enzymatic toolbox: we identify candidate phosphohydrolases by data
        mining, express them heterologously in <em>E. coli</em>, purify them by immobilised metal-ion affinity
        chromatography (IMAC) and characterise their activity under the operating conditions of the reactor (pH 5.0,
        30 ºC).
      </>,
      "Because heterologous expression carries inherent risks (insoluble aggregates, proteolysis, loss of active conformation), a parallel search for commercial homologues was kept for each activity as a contingency plan. The workflow runs from database mining, through in-silico construct design and cloning, to expression, solubilisation, purification and functional characterisation, aiming to reach soluble, active and characterised enzymes with the fewest possible steps.",
    ],
    experiments: [
      {
        id: "bioinformatic-mining",
        tabLabel: "Bioinformatic mining",
        title: "Bioinformatic mining and candidate selection",
        body: [
          {
            paragraphs: [
              <>
                The funnel narrowed <strong>3,741 initial candidates to 7</strong>. EnzymeMiner <Cite n={1} />{" "}
                returned 3,741 sequences across the four activities; manual selection of about 40 prokaryotic
                representatives per activity gave 160; expression and purification evidence from BRENDA and UniProt
                cut this to 102; only <strong>13</strong> retained sufficient activity at pH 5.0 and 30 ºC; and 7
                were finally chosen, at least two per activity except PLA. The panel was EstE1 (PLA), Plc and CerA
                (PLC), AppA and PhyA (phytase), and M2-32 and AphA (NAP), each with a commercial backup.
              </>,
            ],
            pairedResource: {
              kind: "custom",
              node: (
                <SelectionFunnel
                  steps={[
                    { label: "Initial research", value: 3741 },
                    { label: "Present in prokaryotes", value: 160 },
                    { label: "Present in literature", value: 102 },
                    { label: "Catalytic profile", value: 13 },
                    { label: "Final selection", value: 7 },
                  ]}
                />
              ),
              caption:
                "Flowchart of the candidate enzyme selection process. The figures represent the sequential selection (3741 → 160 → 102 → 13 → 7) after the application of the biotechnological and operational exclusion criteria.",
            },
          },
          {
            paragraphs: [
              <>
                The phosphorus in the effluent can be attacked from four complementary angles with enzymes that are
                both expressible in <em>E. coli</em> and acid-tolerant, the acid phosphatases keeping activity across
                the pH 4.5 to 6.0 of the stream <Cite n={2} /> and the histidine acid phytases being active and
                stable at low pH <Cite n={3} />. The redundancy of two representatives per activity hedges against
                any single enzyme failing to express.
              </>,
            ],
          },
          {
            // No paragraph paired locally — kept full-width on request.
            pairedResource: {
              kind: "table",
              table: {
                caption:
                  "Selected enzymes, indicating their activity, microorganism of origin and the commercial alternatives identified as a contingency plan.",
                headers: ["Enzyme activity", "Gene", "Microorganism of origin", "Alternative commercial"],
                rows: [
                  ["Phospholipase C (PLC)", "plc_Tk", "Thermococcus kodakarensis", "Clostridium perfringens or Bacillus cereus [Sigma Aldrich] plc"],
                  ["Phospholipase C (PLC)", "cerA_Bc", "Bacillus cereus", "Clostridium perfringens or Bacillus cereus [Sigma Aldrich] plc"],
                  ["Phospholipase A (PLA)", "estE1_MG", "Metagenome", "Lecitase® Ultra (PLA1) or pancreatin (PLA2) [Merck Millipore]"],
                  ["Phytase", "appA_Yi", "Yersinia intermedia", "Axtra® PHY [IFF] or Ronozyme® HiPhos [Novonesis]"],
                  ["Phytase", "phyA_Op", "Obesumbacterium proteus", "Axtra® PHY [IFF] or Ronozyme® HiPhos [Novonesis]"],
                  ["Acid Phosphatase (NAP)", "M2-32_MG", "Metagenome", "Acid phosphatase from potatoes or wheat germ [Merck]"],
                  ["Acid Phosphatase (NAP)", "aphA_Ec", "Escherichia coli", "Acid phosphatase from potatoes or wheat germ [Merck]"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "Broadly yes. A steep funnel was expected given the strict criteria, and a redundant panel was the design goal. The informative point was quantitative: only 13 of 102 candidates kept activity at pH 5.0 and 30 ºC, confirming that the operating window, not sequence availability, is the real bottleneck.",
            ],
          },
        ],
      },
      {
        id: "structural-design",
        tabLabel: "Structural design",
        title: "In silico structural design of the constructs",
        body: [
          {
            paragraphs: [
              <>
                Homology models placed the tag and mapped disulphide bridges for all seven enzymes. Terminal
                exposure set the vector, for example CerA with a more exposed C-terminus (pET-22b(+)) and AphA the
                opposite (pET-28a(+)). The 2.5 Å analysis flagged <strong>AppA (4 bridges), PhyA (4) and M2-32 (2)</strong> as
                disulphide-dependent, while EstE1, Plc, AphA and CerA had none. Predicted masses ranged from 26 to 49
                kDa, several of them oligomeric (EstE1 4x34, M2-32 2x29, AphA 2x26 kDa).
              </>,
            ],
          },
          {
            // No paragraph paired locally — kept full-width on request.
            pairedResource: {
              kind: "table",
              table: {
                caption:
                  "Experimental design of genetic constructs: presence of disulfide bridges, vector selection and breeding strategy for the enzyme consortium.",
                headers: ["Enzyme", "Molecular mass (kDa)", "S-S bridges", "pET vector", "Origin of the gene"],
                rows: [
                  ["EstE1", "4 x 34", "No", "pET-22b(+)", "GCAT Bio"],
                  ["Plc", "49", "No", "pET-28a(+)", "GCAT Bio"],
                  ["AppA", "48", "C80-C111; C136-C415; C181-C191; C389-C398", "pET-28a(+)", "GCAT Bio"],
                  ["PhyA", "49", "C79-C110; C135-C410; C180-C189; C384-C393", "pET-28a(+)", "GCAT Bio"],
                  ["M2-32", "2 x 29", "C81-C238; C131-C185", "pET-28a(+)", "GCAT Bio"],
                  ["AphA", "2 x 26", "No", "pET-28a(+)", "Addgene"],
                  ["CerA", "32.5", "No", "pET-22b(+)", "Addgene"],
                ],
              },
            },
          },
          {
            paragraphs: [
              <>
                Three enzymes would need an oxidising cytoplasm to fold their structural disulphides <Cite n={4} />,
                and this was known <strong>before any wet work</strong>, so the later requirement for SHuffle T7 or
                Origami 2 was anticipated rather than discovered through failed expression.
              </>,
            ],
            pairedResource: {
              kind: "image-group",
              caption:
                "Structural modeling of candidate enzymes in PyMOL. Identification of structural disulfide bridges in silico through PyMOL. Detail of the measurement of the interatomic distance (< 2.5Å) between the sulfur atoms of the cysteine residues (purple) based on the predictive model.",
              images: [
                { src: `${STRUCT_CYS_DIR}/struct_A_estE1_MG.png`, alt: "EstE1_MG structure with cysteine bridges highlighted", title: "(A) estE1_MG" },
                { src: `${STRUCT_CYS_DIR}/struct_B_plc_Tk.png`, alt: "Plc_Tk structure, no disulfide bridges", title: "(B) plc_Tk" },
                { src: `${STRUCT_CYS_DIR}/struct_C_appA_Yi.png`, alt: "AppA_Yi structure with four cysteine bridges highlighted", title: "(C) appA_Yi" },
                { src: `${STRUCT_CYS_DIR}/struct_D_phyA_Op.png`, alt: "PhyA_Op structure with four cysteine bridges highlighted", title: "(D) phyA_Op" },
                { src: `${STRUCT_CYS_DIR}/struct_E_M2-32_MG.png`, alt: "M2-32_MG structure with two cysteine bridges highlighted", title: "(E) M2-32_MG" },
                { src: `${STRUCT_CYS_DIR}/struct_F_aphA_Ec.png`, alt: "AphA_Ec structure, no disulfide bridges", title: "(F) aphA_Ec" },
                { src: `${STRUCT_CYS_DIR}/struct_G_cerA_Bc.png`, alt: "CerA_Bc structure, no disulfide bridges", title: "(G) cerA_Bc" },
              ],
            },
          },
          {
            paragraphs: [
              "Yes. Disulphide dependence is consistent with the periplasmic or secreted biology of these phytases and phosphatases, and the tag choices followed directly from the models. The experiment carried little risk; its value was pre-empting the solubility problem.",
            ],
            pairedResource: {
              kind: "image-group",
              caption:
                "Structural modeling of candidate enzymes in PyMOL. The spectrum coloration highlights the three-dimensional topology from the N-terminal end (blue) to the C-terminal (red), allowing the accessibility for the fusion of the Tag of His. For multi-homomeric structures, only one of them is shown colored.",
              images: [
                { src: `${STRUCT_COLOR_DIR}/struct_A_estE1_MG.png`, alt: "EstE1_MG structure coloured N-terminus (blue) to C-terminus (red)", title: "(A) estE1_MG" },
                { src: `${STRUCT_COLOR_DIR}/struct_B_plc_Tk.png`, alt: "Plc_Tk structure coloured N-terminus (blue) to C-terminus (red)", title: "(B) plc_Tk" },
                { src: `${STRUCT_COLOR_DIR}/struct_C_appA_Yi.png`, alt: "AppA_Yi structure coloured N-terminus (blue) to C-terminus (red)", title: "(C) appA_Yi" },
                { src: `${STRUCT_COLOR_DIR}/struct_D_phyA_Op.png`, alt: "PhyA_Op structure coloured N-terminus (blue) to C-terminus (red)", title: "(D) phyA_Op" },
                { src: `${STRUCT_COLOR_DIR}/struct_E_M2-32_MG.png`, alt: "M2-32_MG structure coloured N-terminus (blue) to C-terminus (red)", title: "(E) M2-32_MG" },
                { src: `${STRUCT_COLOR_DIR}/struct_F_aphA_Ec.png`, alt: "AphA_Ec structure coloured N-terminus (blue) to C-terminus (red)", title: "(F) aphA_Ec" },
                { src: `${STRUCT_COLOR_DIR}/struct_G_cerA_Bc.png`, alt: "CerA_Bc structure coloured N-terminus (blue) to C-terminus (red)", title: "(G) cerA_Bc" },
              ],
            },
          },
        ],
      },
      {
        id: "genetic-constructs",
        tabLabel: "Genetic constructs",
        title: "Obtaining the genetic constructs",
        body: [
          {
            paragraphs: [
              "All seven constructs were obtained, five by de novo synthesis in the pET backbone and two (AphA, CerA) by PCR from Addgene. Amplification gave clean bands of the expected size (CerA about 873 bp, AphA about 735 bp), matching the SnapGene simulation.",
            ],
            pairedResource: {
              kind: "image",
              src: `${GEL_DIR}/gel_gene_amplification.png`,
              alt: "Agarose gel of gene amplification for cerA (873 bp) and aphA (735 bp)",
              caption:
                "Analysis by 1% w/v agarose gel of gene amplification for cloning in pET vectors by comparing sizes against molecular weight markers φ29 and λ.",
            },
          },
          {
            paragraphs: [
              "The mixed synthesis and amplification strategy worked and kept costs down, and cloning the Addgene genes into the same pET backbones made the later expression comparison fair.",
              "Yes, although the Addgene amplification initially failed and only worked after reducing the template amount, a minor and expected PCR adjustment.",
            ],
          },
        ],
      },
      {
        id: "clone-verification",
        tabLabel: "Clone verification",
        title: "Transformation and clone verification",
        body: [
          {
            paragraphs: [
              "All constructs transformed successfully, with confluent colony growth on selective LB-agar in every case. Colony PCR with T7 primers gave inserts of the expected size (AphA about 971 bp, CerA about 1,050 bp), matching the simulation, so sequencing was not needed.",
            ],
            pairedResource: {
              kind: "image",
              src: `${GEL_DIR}/gel_colony_pcr.png`,
              alt: "Agarose gel of colony PCR for aphA (971 bp) and cerA (1050 bp)",
              caption:
                "Analysis by 1% w/v agarose gel of colony PCR after ligation, verifying that the insert was correct by comparing sizes against molecular weight markers φ29 and λ.",
            },
          },
          {
            paragraphs: [
              "The plasmids are correct and stably carried, and the pipeline delivered verified clones ready to express.",
              "Yes. Correct-size amplicons on both gene amplification and colony PCR were the expected checkpoint, and the match with the simulation justified proceeding without sequencing.",
            ],
          },
        ],
      },
      {
        id: "recombinant-expression",
        tabLabel: "Recombinant expression",
        title: "Recombinant expression",
        body: [
          {
            paragraphs: [
              "IPTG gave clearly stronger overexpression than ZY auto-induction at 20 ºC for the five synthesised constructs, and this was extrapolated to the two Addgene ones. The two phospholipases C were cytotoxic: Plc and CerA caused a sharp OD₆₀₀ drop the morning after induction, CerA partly compensable with about thirty times the culture volume and Plc not compensable at all.",
            ],
            pairedResource: {
              kind: "image-group",
              caption:
                "SDS-PAGE analysis of the recombinant expression of candidates from GCAT Bio constructs under induction with IPTG (A and B) and auto-induction in ZY medium (C and D), both at 20 ºC. Lanes indicate: (M) Molecular Weight Marker NZYBlue®; pET-28a(+) (C1); pET-22b(+) (C2); EstE1 (3); Plc (4); AppA (5); PhyA (6) and M2-32 (7). The black arrows reflect the band corresponding to the enzyme, if any.",
              images: [
                { src: `${GEL_DIR}/gel_A_iptg_total.png`, alt: "SDS-PAGE, IPTG induction, total fraction", title: "(A) IPTG, total fraction" },
                { src: `${GEL_DIR}/gel_B_iptg_soluble.png`, alt: "SDS-PAGE, IPTG induction, soluble fraction", title: "(B) IPTG, soluble fraction" },
                { src: `${GEL_DIR}/gel_C_autoinduction_total.png`, alt: "SDS-PAGE, ZY auto-induction, total fraction", title: "(C) Autoinduction, total fraction" },
                { src: `${GEL_DIR}/gel_D_autoinduction_soluble.png`, alt: "SDS-PAGE, ZY auto-induction, soluble fraction", title: "(D) Autoinduction, soluble fraction" },
              ],
            },
          },
          {
            paragraphs: [
              <>
                IPTG is the induction method of choice for this panel, and PLC cannot be produced in a live{" "}
                <em>E. coli</em> host because these enzymes hydrolyse essential host membrane phospholipids{" "}
                <Cite n={6} />, so it was redirected to cell-free IVTT, a system that does not depend on host
                viability <Cite n={7} />.
              </>,
              <>
                Partly. IPTG outperforming auto-induction was expected from the full derepression of the lacUV5
                promoter, in contrast to the density-linked, more gradual induction of auto-induction medium{" "}
                <Cite n={5} />. The PLC cytotoxicity had been anticipated as a risk, so its appearance confirmed
                rather than contradicted the design and justified not carrying PLC forward.
              </>,
            ],
            pairedResource: {
              kind: "image",
              src: `${GEL_DIR}/gel_bl21_apha_cera.png`,
              alt: "SDS-PAGE of BL21 expression of aphA and cerA at 20°C, total and soluble fractions",
              caption:
                "SDS-PAGE analysis of the recombinant expression of candidates from Addgene constructs under IPTG induction conditions at 20 ºC. Lanes indicate: (M) Molecular Weight Marker NZYBlue®; total (T) and soluble (S) fractions of pET-28a(+) (1); AphA (2); pET-22b(+) (3) and CerA (4). The black arrows reflect the band corresponding to the enzyme, if any.",
            },
          },
        ],
      },
      {
        id: "solubilisation",
        tabLabel: "Solubilisation",
        title: "Solubilisation of the recombinant enzymes",
        description: [
          <>
            Despite good IPTG yields, none of the enzymes appeared in the soluble fraction at first, accumulating as
            inclusion bodies <Cite n={8} />. Of the rescue strategies, <strong>GroES/GroEL solubilised M2-32</strong>{" "}
            <Cite n={11} />, <strong>SHuffle T7 solubilised PhyA</strong> <Cite n={12} />, and <strong>AphA</strong>{" "}
            was soluble in BL21 (DE3). Induction at 30 ºC and Trigger factor <Cite n={10} /> alone were largely
            insufficient for the remaining targets.
          </>,
          <>
            Solubility, not expression, was the limiting step, a well-documented outcome of the fast T7-driven
            translation outpacing host folding capacity <Cite n={8} />, <Cite n={9} />. It was resolved exactly for
            the disulphide-dependent enzymes by the oxidising chassis predicted in the structural-design experiment{" "}
            <Cite n={4} />, and a codon analysis further motivated moving to rare-codon-competent strains{" "}
            <Cite n={13} />. Three enzymes (M2-32, PhyA, AphA) reached soluble form and could proceed.
          </>,
          "Partly. Generalised insolubility under strong T7/IPTG expression is a known outcome, so the rescue plan was in place. That SHuffle T7 specifically rescued PhyA matched the in-silico disulphide prediction, the expected confirmation; that EstE1 and AppA were not recovered set the practical limit of the panel.",
        ],
      },
      {
        id: "imac-purification",
        tabLabel: "IMAC purification",
        title: "Purification by IMAC",
        description: [
          "PhyA and M2-32 purified to electrophoretic homogeneity, with the 20 mM imidazole wash removing contaminants without eluting the target. AphA behaved differently: a normal crude extract and flow-through, but only faint bands in the elution, dialysis and concentration fractions, indicating low yield, though still enough to characterise.",
          <>
            Two clean preparations and one low-yield but usable one were obtained, and the His-tag and Ni-NTA
            strategy with a competitive imidazole wash worked as designed <Cite n={14} />.
          </>,
          "Yes for PhyA and M2-32. AphA's low recovery was not fully expected and is consistent with its low soluble expression; the tag chemistry still worked, so it did not block characterisation.",
        ],
      },
      {
        id: "functional-characterisation",
        tabLabel: "Functional characterisation",
        title: "Functional characterisation",
        description: [
          <>
            All three enzymes hydrolysed bis-pNPP at pH 5.0 and 30 ºC <Cite n={15} />. Raw product accumulation at 30
            min was highest for PhyA (about 27 µM pNP) and lower for M2-32 and AphA (both about 11 µM). Once
            normalised by Bradford protein, the ranking reversed: specific activities were{" "}
            <strong>AphA 0.222 U/mg &gt; M2-32 0.161 U/mg &gt; PhyA 0.141 U/mg</strong>. AphA reached the same product
            (about 11 µM) with roughly 45% less enzyme mass than M2-32 (0.015 vs 0.027 mg).
          </>,
          <>
            On a per-milligram basis AphA is the most efficient acid phosphatase <Cite n={2} /> and PhyA the least,
            so the raw curves are misleading until normalised. AphA and the phytate-specialist PhyA are the
            components to carry into the immobilisation study.
          </>,
          "Instructively not, at first. The raw data suggested PhyA was best, but normalisation showed the opposite, which is precisely why protein quantification was built into the assay. The reliable result is the normalised order, AphA > M2-32 > PhyA.",
        ],
      },
    ],
    outro:
      "These experiments take the panel from database to characterised biocatalyst with no redundant step: activities were matched to the real effluent, constructs were designed to pre-empt insolubility, and only the rescue strategies actually needed were used.",
  },
  {
    id: "immobilisation-chemistry",
    heading: "2. Immobilisation chemistry",
    intro: [
      <>
        In this block we establish <strong>how to fix the enzymes onto the support</strong> while keeping them
        active. Rather than testing directly on the more complex and costly alginate-chitosan-genipin sphere, the
        chemistry is first optimised on a simple, well-characterised <strong>MANAE-agarose</strong> model support,
        and the more reactive genipin of the final sphere is emulated by <strong>glutaraldehyde</strong>, which
        plays the same crosslinking role.
      </>,
      "The model enzyme is Lecitase Ultra, chosen because it is the most demanding case: its active site is capped by a mobile lid that requires interfacial activation, and it forms bimolecular aggregates in solution. Mastering its immobilisation without losing activity is a strong indication that the more hydrophilic, structurally simpler enzymes of the panel can be accommodated afterwards. Two covalent strategies are compared, with and without detergent, and the results are rationalised by in-silico modelling of the enzyme's open and closed conformations.",
    ],
    experiments: [
      {
        id: "lecitase-characterisation",
        tabLabel: "Model enzyme",
        title: "Characterisation of the model enzyme (Lecitase Ultra)",
        description: [
          <>
            The immobilisation chemistry needs a well-quantified enzyme available in bulk, so the commercial chimera
            Lecitase® Ultra was characterised before any immobilisation. It was chosen not only for availability but
            because it is the hardest case in the panel: its active site is capped by a lid that opens only on
            contact with a hydrophobic interface (interfacial activation), and it aggregates into dimers in solution{" "}
            <Cite n={12} />, <Cite n={13} />, so a chemistry that preserves its activity should generalise to the
            simpler, soluble enzymes.
          </>,
          <>
            Activity was followed with <strong>p-nitrophenyl butyrate (pNPB)</strong> <Cite n={14} /> read
            continuously at <strong>348 nm</strong>, giving ΔA₃₄₈/min directly. A continuous assay is needed here
            because immobilisation is monitored in real time as enzyme leaves solution, and 348 nm was used instead
            of 405 nm because, unlike the acidic phosphatase assay, this wavelength lets pNP be read continuously
            without the pH-dependent colour problem. Protein was quantified by Bradford using serial dilutions to
            bring the reading into the linear range of the standard.
          </>,
          <>
            The expected outcome was a characterised stock (approximately <strong>40 mg/mL</strong> and{" "}
            <strong>981 U/mg</strong>) to serve as the baseline for every immobilisation yield.
          </>,
        ],
        protocols: protocolLinks("lecitase-activity-assay"),
      },
      {
        id: "manae-agarose-prep",
        tabLabel: "MANAE-agarose prep",
        title: "Preparation of the MANAE-agarose support",
        description: [
          <>
            The aim was to build a cheap, reproducible model support on which to compare immobilisation chemistries
            before committing to the alginate-chitosan-genipin sphere. MANAE-agarose was chosen because it is well
            characterised and previously optimised <Cite n={14} />, and because glutaraldehyde on it plays the same
            amino-crosslinking role that genipin will play on the final sphere, so the conclusions transfer.
          </>,
          "Starting from BCL agarose, the hydroxyls were first converted to epoxides with glycidol under alkaline reducing conditions, then oxidised with sodium periodate to give a glyoxyl (aldehyde) agarose. The aldehydes were reacted with an excess of ethylenediamine at pH 10, and the resulting Schiff bases were reduced with sodium borohydride, leaving the support decorated with positively charged secondary amino groups. Amination was carried out in an ice bath to control the exothermic reaction, and the support was washed sequentially at pH 9, pH 4 and with water to strip loosely bound reagents. The result is a positively charged support that adsorbs the acidic patches of a protein surface by ion exchange and, once activated with glutaraldehyde, can also bind it covalently.",
          <>
            The expected outcome was a MANAE-agarose support ready to serve as the common base for both
            immobilisation strategies.
          </>,
        ],
        protocols: protocolLinks("manae-agarose-preparation"),
      },
      {
        id: "immobilisation-strategy-a",
        tabLabel: "Strategy A",
        title: "Immobilisation strategy A: covalent attachment on a preactivated support",
        description: [
          "The aim was to test the classic route, direct multipoint covalent attachment, expected to give rigid, reusable derivatives. One gram of MANAE-agarose was activated with 10% glutaraldehyde overnight and used immediately, because the reactive aldehydes oxidise on standing and would otherwise lose reactivity before the enzyme is added.",
          <>
            The enzyme was offered at a deliberately low loading of <strong>1 mg per g support</strong>, to avoid
            crowding and diffusional limitation and so keep the experiment in the regime where the immobilisation
            chemistry, not mass transfer, governs the outcome. Attachment occurs through the ε-amino groups of the
            surface lysines. The run was performed both in plain buffer and with 0.1% Triton X-100 (see Experiment
            5).
          </>,
          <>
            The expected outcome was covalent derivatives whose activity depends strongly on the enzyme's
            conformation at the moment of attachment.
          </>,
        ],
        protocols: protocolLinks("immobilisation-strategy-a"),
      },
      {
        id: "immobilisation-strategy-b",
        tabLabel: "Strategy B",
        title: "Immobilisation strategy B: ionic adsorption and subsequent crosslinking",
        description: [
          <>
            The aim was to test a gentler two-step route in which the enzyme is first allowed to orient itself on
            the support and only then fixed covalently <Cite n={15} />, <Cite n={16} />. The enzyme (1 mg/g) was
            first adsorbed on the bare, positively charged support in 25 mM potassium phosphate at pH 7 and 25 ºC,
            with adsorption followed by the fall in supernatant activity.
          </>,
          "Only once adsorbed and oriented was it crosslinked, with a mild 0.5% glutaraldehyde for 1 h and then a 20 h maturation. The low glutaraldehyde concentration and the long maturation let the already-bound crosslinker react intra- and intermolecularly to consolidate a multipoint attachment without over-rigidifying the enzyme at the outset. Letting the dimers pre-orient before fixation is the whole point of the two-step design, and is what distinguishes it from strategy A.",
          <>
            The expected outcome was derivatives in which the enzyme retains the mobility its lid needs to open,
            provided its orientation on the support is right.
          </>,
        ],
        protocols: protocolLinks("immobilisation-strategy-b"),
      },
      {
        id: "detergent-effect",
        tabLabel: "Detergent effect",
        title: "Effect of detergent (Triton X-100)",
        description: [
          <>
            Because Lecitase® Ultra aggregates through the hydrophobic regions exposed when its lid opens{" "}
            <Cite n={13} />, a surfactant was introduced as a deliberate variable to control the open/closed
            equilibrium during immobilisation. Both strategies were run in parallel in plain buffer and in{" "}
            <strong>0.1% Triton X-100</strong>.
          </>,
          <>
            The detergent was expected to help or harm depending on the anchoring geometry, so it was tested against
            both strategies rather than assumed to act the same way. To interpret the results at the residue level,
            the open and closed conformations were also modelled (Experiment 7).
          </>,
          <>
            The expected outcome was opposite optima for the two strategies, the detergent helping the preactivated
            route and harming the adsorption route.
          </>,
        ],
        protocols: protocolLinks("detergent-effect-assay"),
      },
      {
        id: "immobilisation-yield",
        tabLabel: "Yield evaluation",
        title: "Evaluation of the immobilisation yield",
        description: [
          "The aim was to quantify how much active enzyme is actually bound, on an equal enzyme-and-support basis, so the strategies can be compared fairly. At intervals, activity was measured in the whole suspension (free plus bound enzyme) and in the clarified supernatant after a brief 604 × g spin that sediments the beads (free enzyme only). Their difference is the immobilised activity, and its ratio to the total is the yield.",
          "A free-enzyme control incubated without support under the same conditions ran in parallel, so that any drop in activity could be attributed to immobilisation and not to buffer effects or thermal denaturation. This control is what allows the kinetic data to be trusted.",
          <>
            The expected outcome was that ionic adsorption followed by crosslinking, without detergent, would
            immobilise more active enzyme than the preactivated covalent route, from the same amount of enzyme and
            support.
          </>,
        ],
        protocols: protocolLinks("immobilisation-yield-assay"),
      },
      {
        id: "computational-modelling",
        tabLabel: "Computational modelling",
        title: "Computational modelling of the mechanism",
        description: [
          "The aim was to explain, at the residue level, why the detergent effect reverses between the two strategies. The open and closed conformations of Lecitase® Ultra were aligned and coloured in PyMOL, mapping the catalytic triad (Ser146, Asp201, His258), the lid (residues 80 to 95), the reactive lysines nearest the active site (Lys24, Lys259) and the acidic crown at the base (Asp27, Glu56, Asp57, Asp62).",
          <>
            On the preactivated support, the detergent holds the lid open so the enzyme is locked in its active form,
            whereas without detergent the closed enzyme is fixed through Lys24 and Lys259, jamming the lid shut and
            explaining the low activity <Cite n={17} />. In the adsorption route the acidic crown anchors the enzyme
            with its active site projected away from the surface, so without detergent the lid stays free to open,
            whereas the detergent scrambles that electrostatic orientation and the subsequent crosslinking then
            freezes a distorted arrangement <Cite n={18} />.
          </>,
          <>
            The expected outcome was a structural model that fully accounts for the measured yields and points to
            the closed-form adsorption route as the strategy to transfer to the sphere.
          </>,
        ],
        protocols: protocolLinks("pymol-modelling-scripts"),
      },
    ],
    outro:
      "Using an inexpensive model support and glutaraldehyde as a stand-in for genipin let the two anchoring strategies be compared without spending resources on the full sphere; the detergent variable and the free-enzyme control were the minimum needed to interpret the yields, and the modelling was added only to explain the result.",
  },
];

export const ENZYMATIC_IMMOBILISATION_REFERENCES: string[] = [
  "[1] Dayton, C. L. G., Da Silva Galhardo, F., Barton, N., Hitchman, T., Lyon, J., O'Donoghue, E., & Wall, M. A. (2009). Oil degumming methods (Patent No. EP2488639A1). Google Patents. https://patents.google.com/patent/EP2488639A1/en",
  "[2] Hon, J., Borko, S., Štourač, J., Prokop, Z., Zendulka, J., Bednář, D., Martínek, T., & Damborský, J. (2020). EnzymeMiner: Automated mining of soluble enzymes with diverse structures, catalytic properties, and stabilities. Nucleic Acids Research, 48(W1), W104-W109. https://doi.org/10.1093/nar/gkaa372",
  "[3] Hauenstein, J., Jeske, L., Jäde, A., Krull, M., Dümmer, K., Koblitz, J., Tietz, A., Jahn, D., Reimer, L. C., & Bunk, B. (2026). BRENDA in 2026: A Global Core Biodata Resource for functional enzyme and metabolic data within the DSMZ Digital Diversity. Nucleic Acids Research, 54(D1), D527-D534. https://doi.org/10.1093/nar/gkaf1113",
  "[4] The UniProt Consortium. (2025). UniProt: The Universal Protein Knowledgebase in 2025. Nucleic Acids Research, 53(D1), D609-D617. https://doi.org/10.1093/nar/gkae1010",
  "[5] Waterhouse, A., Bertoni, M., Bienert, S., Studer, G., Tauriello, G., Gumienny, R., Heer, F. T., de Beer, T. A. P., Rempfer, C., Bordoli, L., Lepore, R., & Schwede, T. (2018). SWISS-MODEL: Homology modelling of protein structures and complexes. Nucleic Acids Research, 46(W1), W296-W303. https://doi.org/10.1093/nar/gky427",
  "[6] Mura, C., McCrimmon, C. M., Vertrees, J., & Sawaya, M. R. (2010). An introduction to biomolecular graphics. PLoS Computational Biology, 6(8), e1000918. https://doi.org/10.1371/journal.pcbi.1000918",
  "[7] Novagen. (2003). pET system manual (11th ed.). EMD Biosciences.",
  "[8] Cline, J., Braman, J. C., & Hogrefe, H. H. (1996). PCR fidelity of Pfu DNA polymerase and other thermostable DNA polymerases. Nucleic Acids Research, 24(18), 3546-3551. https://doi.org/10.1093/nar/24.18.3546",
  "[9] Studier, F. W. (2005). Protein production by auto-induction in high-density shaking cultures. Protein Expression and Purification, 41(1), 207-234. https://doi.org/10.1016/j.pep.2005.01.016",
  "[10] Porath, J., Carlsson, J., Olsson, I., & Belfrage, G. (1975). Metal chelate affinity chromatography, a new approach to protein fractionation. Nature, 258(5536), 598-599. https://doi.org/10.1038/258598a0",
  "[11] Andersch, M. A., & Szczypinski, A. J. (1947). Use of p-nitrophenylphosphate as the substrate in determination of serum acid phosphatase. American Journal of Clinical Pathology, 17(7), 571-574. https://doi.org/10.1093/ajcp/17.7_ts.571",
  "[12] Virgen-Ortíz, J. J., dos Santos, J. C. S., Ortiz, C., Berenguer-Murcia, Á., Rodrigues, R. C., & Fernandez-Lafuente, R. (2019). Lecitase ultra: A phospholipase with great potential in biocatalysis. Molecular Catalysis, 473, 110405. https://doi.org/10.1016/j.mcat.2019.110405",
  "[13] Andrés-Sanz, D., Fresán, C., Fernández-Lorente, G., Rocha-Martín, J., & Guisán, J. M. (2021). Stabilization of Lecitase Ultra by immobilization and fixation of bimolecular aggregates: Release of omega-3 fatty acids by enzymatic hydrolysis of krill oil. Catalysts, 11(9), 1067. https://doi.org/10.3390/catal11091067",
  "[14] Ait Braham, S., Siar, E. H., Arana-Peña, S., Bavandi, H., Carballares, D., Morellon-Sterling, R., de Andrades, D., Kornecki, J. F., & Fernandez-Lafuente, R. (2021). Positive effect of glycerol on the stability of immobilized enzymes: Is it a universal fact? Process Biochemistry, 102, 108-121. https://doi.org/10.1016/j.procbio.2020.12.015",
  "[15] López-Gallego, F., Betancor, L., Hidalgo, A., Alonso, N., Fernández-Lafuente, R., & Guisán, J. M. (2005). Enzyme stabilization by glutaraldehyde crosslinking of adsorbed proteins on aminated supports. Journal of Biotechnology, 119(1), 70-75. https://doi.org/10.1016/j.jbiotec.2005.05.021",
  "[16] Mateo, C., Bolivar, J. M., Godoy, C. A., Rocha-Martin, J., Pessela, B. C., Curiel, J. A., Muñoz, R., Guisan, J. M., & Fernández-Lorente, G. (2010). Improvement of enzyme properties with a two-step immobilization process on novel heterofunctional supports. Biomacromolecules, 11(11), 3112-3117. https://doi.org/10.1021/bm100916r",
  "[17] Rodrigues, R. C., Virgen-Ortíz, J. J., dos Santos, J. C. S., Berenguer-Murcia, Á., Alcántara, A. R., Barbosa, O., Ortiz, C., & Fernandez-Lafuente, R. (2019). Immobilization of lipases on hydrophobic supports: Immobilization mechanism, advantages, problems, and solutions. Biotechnology Advances, 37(5), 746-770. https://doi.org/10.1016/j.biotechadv.2019.04.003",
  "[18] Barbosa, O., Ortiz, C., Berenguer-Murcia, Á., Torres, R., Rodrigues, R. C., & Fernandez-Lafuente, R. (2014). Glutaraldehyde in bio-catalyst design: A useful crosslinker and a versatile tool in enzyme immobilization. RSC Advances, 4(4), 1583-1600. https://doi.org/10.1039/c3ra45991h",
];

/** The source describes a schematic of "the functionalised rePhlow sphere"
 * (core PAO + surface enzyme panel) but never actually embeds it — the
 * Notion export carries only this caption in an otherwise empty callout.
 * Rendered as a real `image-placeholder` in Experiments.tsx, right after
 * the block intro — the exact case this component family's placeholder
 * system already existed for (see PairedResource in types.ts). */
export const ENZYMATIC_IMMOBILISATION_SCHEMATIC_CAPTION =
  "Schematic of the functionalised rePhlow sphere. In the core, the engineered PAO stores phosphorus as polyP; on the surface, the immobilised phosphohydrolase panel hydrolyses organophosphates from the degumming effluent, releasing free orthophosphate that diffuses inwards for assimilation. The arrows follow the phosphate: organic substrates are cleaved at the surface, and the resulting orthophosphate enters the core.";
