import type { ReactNode } from "react";
import type { ExperimentSubBlock } from "../../components/LabFolders/types";

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

/** Named lab protocols used across this block — same convention as Genetic
 * engineering's own PROTOCOL/protocolLinks: each renders as its own
 * "Protocols:" download link on the experiment card.
 *
 * Keys are the source's own protocol numbers, and each `href` follows the
 * `assets/protocols/<page>-<slug>.pdf` convention already used by Alginate
 * encapsulation, Revalorisation and Genetic engineering, with the slug
 * tracking the filename of the PDF actually attached to that step in the
 * Notion export (e.g. 08_Protein_purification_IMAC.pdf →
 * enzymatic-immobilisation-08-protein-purification-imac.pdf), so dropping
 * the team's own files into public/assets/protocols/ under those names is
 * all that's needed to make the links live. That folder is still empty, so
 * every href here is a placeholder, exactly as on the other three pages.
 *
 * The one protocol document the source attaches but whose subject doesn't
 * obviously match the step it hangs on is 01_In_silico_construct_design on
 * "Computational modelling of the mechanism" — linked as the source has it
 * (it is the team's own in-silico protocol) rather than second-guessed, and
 * the actual PyMOL commands that step used are reproduced in the write-up
 * itself, since the export now carries them in full. */
const PROTOCOL: Record<string, { label: string; href: string }> = {
  "01-in-silico-construct-design": {
    label: "In silico construct design",
    href: "assets/protocols/enzymatic-immobilisation-01-in-silico-construct-design.pdf",
  },
  "02-pcr": {
    label: "PCR",
    href: "assets/protocols/enzymatic-immobilisation-02-pcr.pdf",
  },
  "03-cloning": {
    label: "Cloning",
    href: "assets/protocols/enzymatic-immobilisation-03-cloning.pdf",
  },
  "04-transformation-ecoli": {
    label: "E. coli transformation",
    href: "assets/protocols/enzymatic-immobilisation-04-transformation-ecoli.pdf",
  },
  "05-expression-iptg-induction": {
    label: "Expression: IPTG induction",
    href: "assets/protocols/enzymatic-immobilisation-05-expression-iptg-induction.pdf",
  },
  "06-expression-zy-autoinduction": {
    label: "Expression: ZY auto-induction",
    href: "assets/protocols/enzymatic-immobilisation-06-expression-zy-autoinduction.pdf",
  },
  "07-expression-test-soluble-insoluble": {
    label: "Expression test: soluble and insoluble fractions",
    href: "assets/protocols/enzymatic-immobilisation-07-expression-test-soluble-insoluble.pdf",
  },
  "08-protein-purification-imac": {
    label: "Protein purification by IMAC",
    href: "assets/protocols/enzymatic-immobilisation-08-protein-purification-imac.pdf",
  },
  "09-activity-assay-bis-pnpp": {
    label: "Activity assay (bis-pNPP)",
    href: "assets/protocols/enzymatic-immobilisation-09-activity-assay-bis-pnpp.pdf",
  },
  "10-protein-quantification-bradford": {
    label: "Protein quantification (Bradford)",
    href: "assets/protocols/enzymatic-immobilisation-10-protein-quantification-bradford.pdf",
  },
  "11-lecitase-ultra-characterisation": {
    label: "Lecitase Ultra characterisation",
    href: "assets/protocols/enzymatic-immobilisation-11-lecitase-ultra-characterisation.pdf",
  },
  "12-enzyme-immobilisation-manae": {
    label: "Enzyme immobilisation on MANAE-agarose",
    href: "assets/protocols/enzymatic-immobilisation-12-enzyme-immobilisation-manae.pdf",
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
 * - The figures this block used to carry (the selection funnel, the gels,
 *   the PyMOL structures, the enzyme and construct tables) are outcomes,
 *   not design, and the Experiments source page has none of them. They
 *   moved to Results along with their assets; only the two tables this
 *   page actually contains, the IMAC buffer scheme and the assay
 *   parameters, stay here, because both describe how the step is run.
 * - Two cross-references to another experiment ("see Experiment 5",
 *   "(Experiment 7)") are kept exactly as written, even though this deck's
 *   own tabs aren't numbered 1-7 the same way the source's toggles were —
 *   not renamed to a tab label, since the instruction was to change
 *   nothing about the source's own wording.
 * - Every "Protocol: see the Protocols page [link pending]" line is dropped
 *   from the prose and replaced with a real `protocols` download-link field
 *   (see PROTOCOL/protocolLinks above), matching the convention used in
 *   Alginate encapsulation, Revalorisation and Genetic engineering. The
 *   source now attaches its own numbered protocol PDFs to each step, so
 *   every link here names a real document; the paths remain placeholders
 *   only because public/assets/protocols/ is still empty, as on the other
 *   three pages.
 * - The PyMOL commands the modelling step used are reproduced verbatim as a
 *   real code listing, with the team's own step comments, via a `custom`
 *   paired resource (see PairedResource in types.ts) styled by .record-code.
 *   It carries no caption deliberately: a command script isn't a figure, and
 *   an uncaptioned `custom` resource is the one case numbering.ts skips when
 *   assigning figure numbers.
 * - Inline "[n]" citations are reproduced exactly as numbered in the source.
 *   An earlier export had several citations in "Sub-block 1: Enzyme
 *   production" pointing at the wrong listed reference ("EnzymeMiner [1]"
 *   where the list's [1] is an unrelated patent); the current export has
 *   fixed that, and the numbering now matches the reference list throughout.
 *   Two entries in that list had lost co-authors along the way and are
 *   corrected here against the published papers, [12] (Barbosa, O.) and [15]
 *   (Mateo, C., Alonso-Morales, N. and Dellamora-Ortiz, G.).
 * - The source's own closing section ("Conclussion") is reproduced as a
 *   third, prose-only sub-block, exactly as Genetic engineering's closing
 *   synthesis is (see ExperimentSubBlock.experiments being optional). Only
 *   the heading's spelling is normalised.
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
    phosphorus-accumulating organism (PAO, see the{" "}
    <a href="#genetic-engineering" className="lab-wikilink" onClick={(event) => {
      event.preventDefault();
      document.getElementById("section-tab-genetic-engineering")?.click();
    }}><strong>Genetic engineering</strong></a>{" "}
    block) and whose surface is{" "}
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
  figure?: { src: string; alt: string; caption: string; number: number };
}

const IMG_DIR = "assets/experiments/enzymatic-immobilisation";

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
        rest of the cocktail can reach the phosphate head group with less steric impediment (Figure 1).
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
    figure: {
      src: `${IMG_DIR}/pla-cleavage-sites.png`,
      alt: "Structure of a glycerophospholipid, with red dashed lines marking the sn1 and sn2 carboxylic ester bonds cleaved by PLA1 and PLA2",
      caption:
        "A phospholipid with two acyl chains; scissors snip the ester bonds at sn1 and sn2; the fatty acids drift off and a lysophospholipid is left behind, the gum visibly thinning.",
      number: 1,
    },
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
        or phosphoethanolamine) that passes into the aqueous phase in a much easier form to process (Figure 2).
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
    figure: {
      src: `${IMG_DIR}/plc-cleavage-site.png`,
      alt: "Structure of a glycerophospholipid, with a red dashed line marking the bond between the glycerol backbone and the phosphate group cleaved by phospholipase C",
      caption:
        "A glycerophospholipid; a cut falls between the glycerol backbone and the phosphate; the DAG stays in the oil layer while the phospho-head dissolves into the water below.",
      number: 2,
    },
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
        typical of the effluent after acid degumming, and they act on a wide range of substrates (Figure 3).
      </>
    ),
    whatWeDo: (
      <>
        Two representatives were produced, <strong>AphA</strong> (from <em>E. coli</em>) and <strong>M2-32</strong>{" "}
        (from a metagenome). Both were expressed in <em>E. coli</em>, purified by IMAC and characterised. AphA turned
        out to be the most efficient biocatalyst per unit mass of the whole panel.
      </>
    ),
    figure: {
      src: `${IMG_DIR}/nap-phosphomonoester.png`,
      alt: "Structure of a phosphate monoester, with a red dashed line marking the ester bond hydrolysed to release free orthophosphate",
      caption:
        "A phosphate monoester bobbing in solution; the terminal phosphate is snipped off and floats away as free orthophosphate, ready for uptake.",
      number: 3,
    },
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
        4/6-phytases (EC 3.1.3.26) depending on where they initiate hydrolysis on the inositol ring (Figure 4).
      </>
    ),
    whatWeDo: (
      <>
        Two candidates were selected, appA from <em>Yersinia intermedia</em> and phyA from{" "}
        <em>Obesumbacterium proteus</em>. <strong>PhyA</strong> was solubilised, purified and characterised, and
        stands alongside AphA as a key component for the recovery bioreactor.
      </>
    ),
    figure: {
      src: `${IMG_DIR}/phytate-inositol-hexaphosphate.png`,
      alt: "Structure of phytate, a myo-inositol ring carrying six phosphate groups, each attached through a bond marked in red",
      caption:
        "A fully loaded inositol ring bristling with six phosphates; one by one the phosphates pop off around the ring until the ring is bare.",
      number: 4,
    },
  },
];

/** The PyMOL commands the modelling step actually ran, verbatim from the
 * source (its own "#1./#2./#3." step comments included) — rendered as a
 * real code listing rather than paraphrased, since the export now carries
 * the script in full. See .record-code in LabFolders.css. */
const PYMOL_SCRIPT = `#1. Clean, align the open shape over the closed one, and set base view
Hide all
align lecitase_abierta, lecitase_cerrada
Gray80 color, all
show cartoon, all

#2. Selection and colouring of key residues
#Acid Residues (Asp + Glu) - Color RED (Ionic Interaction)
select acids, resn ASP+GLU
Red color, acids
Show sticks, acids
Set stick_radius, 0.3, Acids
#Lysines (Lys) - Color BLUE (Glutaraldehyde Covalent Anchor)
select lysines, resn LYS
Blue color, lysines
Show sticks, lysines
Set stick_radius, 0.3, Lysines
#Catalytic Triad (Ser146, Asp201, His258) - Color MAGENTA
Select Triada, Resi 146+201+258
Show sticks, triad
magenta, triad
Set stick_radius, 0.3, Triad
#Lid (Residues 80-95) - Color GREEN
Select Cap, RESI 80-95
Color Green, Lid

#3. Show semi-transparent surface to see catalytic pocket and final view
show surface, all
Set Transparency, 0.4
bg_color white
Set ray_opaque_background, 0`;

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
        description: [
          <>
            The aim was to assemble a shortlist of phosphohydrolases able to dismantle the organophosphorus in the
            degumming effluent while remaining expressible in <em>E. coli</em>. Because the effluent is not a single
            compound but a mixture of phospholipids, phytate and phosphomonoesters, no single enzyme can mineralise
            it, so four complementary activities were targeted: type A and type C phospholipases (PLA, PLC),
            non-specific acid phosphatases (NAP) and phytases. The substrate composition itself was taken from the
            European patent describing industrial degumming <Cite n={1} />, so that the activities were matched to
            the real stream rather than to a generic phospholipid.
          </>,
          <>
            Candidates had to satisfy four constraints, each chosen to de-risk the downstream work. First, a sequence
            deposited in a public database (GenBank or UniProt), so it could be synthesised or amplified. Second,
            suitability for <em>E. coli</em>, meaning no dependence on post-translational modifications such as
            glycosylation that a prokaryote cannot perform. Third, at least one literature report of recombinant
            expression and kinetics. Fourth, retention of at least 30% of maximum activity at pH 5.0 and 30 ºC, the
            window imposed by the acid-degummed effluent and the mesophilic PAO. Screening on these criteria before
            any wet work concentrated effort only on enzymes that could realistically be made and would survive the
            process.
          </>,
          <>
            The search combined <strong>EnzymeMiner</strong> <Cite n={2} />, a platform that ranks candidate
            sequences by predicted solubility and expressibility, with targeted queries in <strong>BRENDA</strong>{" "}
            <Cite n={3} /> and <strong>UniProt</strong> <Cite n={4} />, applied as four sequential filters (initial
            pool, prokaryotic origin, literature support, catalytic profile). In parallel, a commercial homologue was
            identified for every activity as a contingency, so that a failure to express any one enzyme would not
            stall the panel.
          </>,
          <>
            The screen was expected to yield a small, redundant panel with at least two representatives per activity.
            It reduced 3,741 candidates to <strong>7</strong>: EstE1 (PLA), Plc and CerA (PLC), AppA and PhyA
            (phytase), and M2-32 and AphA (NAP).
          </>,
        ],
      },
      {
        id: "structural-design",
        tabLabel: "Structural design",
        title: "In silico structural design of the constructs",
        body: [
          {
            paragraphs: [
              "Before ordering any DNA, we decided for each enzyme where to place the purification tag and whether it would need a special folding environment, because both decisions are far cheaper to make on a model than to correct after cloning.",
              <>
                Each sequence without a resolved structure was modelled by homology on{" "}
                <strong>SWISS-MODEL</strong> <Cite n={5} /> and inspected in <strong>PyMOL</strong>{" "}
                <Cite n={6} /> for two things. First, the accessibility of the N- and C-termini: the
                polyhistidine tag must sit on an exposed terminus so it can reach the resin without occluding the
                active site, so the more exposed terminus set the vector, <strong>pET-28a(+)</strong> for an
                N-terminal tag (introduced at the NdeI site with a downstream STOP codon) or{" "}
                <strong>pET-22b(+)</strong> for a C-terminal tag <Cite n={7} /> (Figure 5). Second, the presence
                of structural disulphide bridges: pairs of cysteine sulphur atoms closer than 2.5 Å were flagged,
                because a disulphide-dependent enzyme will not fold in the reducing cytoplasm of a standard strain
                and will instead need an oxidising chassis. Mapping this in silico told us in advance which
                enzymes would later require Rosetta-gami 2 or Origami 2, so the folding strategy was planned
                rather than discovered by trial and error.
              </>,
            ],
            pairedResource: {
              kind: "image",
              src: `${IMG_DIR}/pet-vector-maps.png`,
              alt: "Circular maps of the pET-22b(+) and pET-28a(+) vectors, showing the multiple cloning site, the NdeI and HindIII sites, the T7 promoter and terminator, the pelB signal sequence, the antibiotic resistance marker, the f1 origin and the 6xHis tag",
              caption:
                "Scheme of pET-22b(+) and pET-28a(+) vector. In detail, the multiple cloning site (MCS) (purple), the restriction sites used (black lines), the T7 promoter and terminator (orange), the pelB exporting sequence (blue), the antibiotic resistance (yellow), the f1 ori (green) and the 6xHis (magenta) are shown. Created with [BioRender.com](https://biorender.com/).",
            },
          },
          {
            paragraphs: [
              "The expected outcome was a per-enzyme decision (tag position, vector and disulphide dependence) that pre-empted the main causes of insolubility.",
            ],
          },
        ],
        protocols: protocolLinks("01-in-silico-construct-design"),
      },
      {
        id: "genetic-constructs",
        tabLabel: "Genetic constructs",
        title: "Obtaining the genetic constructs",
        description: [
          "The aim was to obtain each gene inside its chosen pET backbone, using two routes according to availability so as to minimise cost. Sequences held in no repository were ordered as de novo gene synthesis directly in the pET vector (GCAT Bio, Changzhou, China), with codon optimisation used only when the nucleotide sequence was unavailable but the amino acid sequence was, since unnecessary optimisation can introduce its own expression artefacts. Sequences already validated in Addgene were amplified by PCR and cloned, which is far cheaper than synthesis.",
          <>
            For amplification, primers carried NdeI (5') and HindIII (3') sites matching the pET multiple cloning
            site. A small amount of donor plasmid (50 ng) was used as template with the high-fidelity polymerase{" "}
            <strong>Pfu Ultra II</strong> <Cite n={8} />, chosen to avoid mutations in the coding sequence, and DMSO
            was added to help denature GC-rich regions. Because the Addgene genes arrived in different backbones,
            cloning them into the <strong>same</strong> pET vectors as the synthesised genes was a deliberate choice,
            so that any later difference in expression would reflect the enzyme and not the vector.
          </>,
          "Inserts and vectors were then cut with FastDigest NdeI and HindIII, and the linearised vector was dephosphorylated with the thermosensitive alkaline phosphatase FastAP, a step included specifically to stop the vector re-circularising on itself without an insert and inflating the background. Fragments were gel-purified, and ligation was set at a 1:5 vector:insert molar ratio (NEBioCalculator) with T4 DNA ligase overnight at 16 ºC, a temperature that balances ligase activity against the annealing stability of the short cohesive ends.",
          "The expected outcome was a set of recombinant pET plasmids for each gene, in matched backbones and ready to transform.",
        ],
        protocols: protocolLinks("02-pcr", "03-cloning"),
      },
      {
        id: "clone-verification",
        tabLabel: "Clone verification",
        title: "Transformation and clone verification",
        description: [
          <>
            The aim was to introduce the plasmids into bacteria, confirm the correct insert and hand a validated
            construct to the expression host. The plasmids were introduced by <strong>transformation</strong>, the
            direct uptake of naked plasmid DNA by permeabilised competent cells, which is the appropriate route for
            purified plasmid DNA, as opposed to conjugation or transduction. Cloning was done first in{" "}
            <em>E. coli</em> DH5α, a recA and endA deficient strain that gives a high yield of stable plasmid but
            carries no T7 polymerase, so it propagates the construct without expressing it.
          </>,
          <>
            Immediately after heat shock (42 ºC, 90 s) or electroporation, the cells were recovered in{" "}
            <strong>LB-SOC</strong>, a rich medium supplemented with glucose, and incubated for one hour at 37 ºC
            before plating. This recovery step is essential: it lets the permeabilised cells repair their envelopes
            and, above all, transcribe and translate the antibiotic-resistance gene, so that they survive the
            subsequent selection. Plating straight onto antibiotic would kill successfully transformed but
            not-yet-resistant cells and collapse the apparent efficiency.
          </>,
          <>
            Transformants were screened by colony PCR with universal T7 primers flanking the insert, resolved on a 1%
            agarose gel; since the amplicon sizes matched the SnapGene simulation, sequencing was not required.
            Positive clones were grown and their plasmid recovered by alkaline-lysis <strong>miniprep</strong> (NZY),
            which denatures and precipitates genomic DNA and protein while keeping the supercoiled plasmid in
            solution, giving clean DNA to re-transform. The verified plasmid was finally moved into a{" "}
            <strong>(DE3)</strong> expression strain, which carries T7 RNA polymerase under the IPTG-inducible lacUV5
            promoter, the element absent from DH5α that actually drives transcription of the cloned gene.
          </>,
          "The expected outcome was verified clones in the expression host, ready for induction.",
        ],
        protocols: protocolLinks("04-transformation-ecoli"),
      },
      {
        id: "recombinant-expression",
        tabLabel: "Recombinant expression",
        title: "Recombinant expression",
        description: [
          "The aim was to find the induction regime that maximises production of each enzyme, comparing chemical induction with IPTG against ZY auto-induction, both at 20 ºC.",
          <>
            For IPTG, cultures were grown in LB to mid-exponential phase (OD₆₀₀ 0.4 to 0.6), where the cells are
            healthiest and most metabolically active, and induced with 1 mM IPTG, a saturating concentration that
            fully derepresses lacUV5 and therefore T7 transcription. Induction was continued overnight at a reduced{" "}
            <strong>20 ºC</strong> rather than 37 ºC, because slowing translation gives the nascent chains more time
            to fold and reduces the accumulation of inclusion bodies. Auto-induction instead uses a medium whose
            glucose is consumed first and whose lactose then induces the system automatically as the culture reaches
            high density <Cite n={9} />, so it needs no OD monitoring or timed addition. Every culture was started
            from a single colony in a 5 mL overnight pre-inoculum and seeded at OD₆₀₀ 0.05, so that all conditions
            began from the same low density. Expression was read by SDS-PAGE of the total and soluble fractions
            against a prestained standard.
          </>,
          "The expected outcome was to select the higher-yielding regime. IPTG gave the stronger overexpression and was carried forward; it also revealed that the enzymes accumulated as inclusion bodies and that the two phospholipases C were cytotoxic to the host, which set up the next two experiments.",
        ],
        protocols: protocolLinks(
          "05-expression-iptg-induction",
          "06-expression-zy-autoinduction",
          "07-expression-test-soluble-insoluble",
        ),
      },
      {
        id: "solubilisation",
        tabLabel: "Solubilisation",
        title: "Solubilisation of the recombinant enzymes",
        description: [
          "Since none of the targets appeared in the soluble fraction, the aim here was to recover folded, soluble enzyme, applying three levers that each address a different cause of misfolding.",
          <>
            Induction at <strong>30 ºC</strong> was tried as a compromise that slows synthesis relative to 37 ºC while
            keeping growth reasonable, giving chains more time to fold. <strong>Molecular chaperones</strong> were
            co-expressed, the ribosome-associated Trigger factor, which stabilises the emerging chain and prevents
            premature aggregation, and the GroES/GroEL complex, which encapsulates partly folded protein and lets it
            fold in an ATP-dependent cage away from the crowded cytoplasm. Finally, for the disulphide-dependent
            enzymes flagged in Experiment 2, expression was moved to strains with an oxidising
            cytoplasm and rare-codon tRNAs (<strong>Origami 2, Rosetta-gami 2 and SHuffle T7</strong>, the last also
            co-expressing a disulphide isomerase); a codon analysis motivated this, since rare codons throttle both
            yield and folding. The cytotoxic phospholipases C were not forced through this pipeline but earmarked for
            cell-free IVTT, which does not depend on host viability.
          </>,
          "The expected outcome was soluble enzyme for the tractable targets. **GroES/GroEL solubilised M2-32, Rosetta-gami 2 solubilised PhyA, and AphA was obtained in BL21 (DE3)**.",
        ],
      },
      {
        id: "imac-purification",
        tabLabel: "IMAC purification",
        title: "Purification by IMAC",
        body: [
          {
            paragraphs: [
              <>
                The aim was to obtain each soluble enzyme clean enough for kinetic characterisation and, ultimately,
                immobilisation. Purification used immobilised metal-ion affinity chromatography on Ni-NTA{" "}
                <Cite n={10} />, which exploits the coordinate bond between the engineered polyhistidine tag and
                nickel ions held on the resin.
              </>,
            ],
          },
          {
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Step", "Buffer / condition", "Reason"],
                rows: [
                  ["Lysis", "pressure homogenisation, 4 ºC, benzonase added", "efficient lysis at scale, cold protects activity, benzonase digests nucleic acids to cut viscosity"],
                  ["Binding", "Tris-HCl 50 mM pH 8.0, NaCl 300 mM, imidazole 20 mM", "low basal imidazole and high salt suppress non-specific binding of native His-rich proteins"],
                  ["Wash", "Tris-HCl 50 mM pH 8.0, NaCl 300 mM, imidazole 20 mM", "removes weak binders without eluting the target"],
                  ["Elution", "Tris-HCl 50 mM pH 8.0, NaCl 300 mM, imidazole 500 mM", "outcompetes the tag for nickel, releasing the pure protein"],
                  ["Dialysis", "Tris-HCl 10 mM pH 7.0, NaCl 100 mM, MWCO 3.5 kDa", "removes imidazole and salt"],
                  ["Concentration", "ultrafiltration, MWCO 10 kDa", "retains the enzyme while reducing volume"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "The two membrane cut-offs are chosen deliberately so that small solutes pass during dialysis while the enzymes are retained during concentration. The expected outcome was homogeneous preparations; **PhyA and M2-32 reached electrophoretic homogeneity and AphA was recovered at lower yield but sufficient for characterisation**.",
            ],
          },
        ],
        protocols: protocolLinks("08-protein-purification-imac"),
      },
      {
        id: "functional-characterisation",
        tabLabel: "Functional characterisation",
        title: "Functional characterisation",
        body: [
          {
            paragraphs: [
              <>
                The aim was to confirm that the purified enzymes are active at process conditions and to rank them by
                intrinsic efficiency. Activity was measured with{" "}
                <strong>bis(p-nitrophenyl) phosphate (bis-pNPP)</strong> rather than the usual pNPP <Cite n={11} />,
                because bis-pNPP is a phosphodiester that better mimics the bulky, stable organophosphates of a real
                effluent (phytate, phospholipids), whereas pNPP carries a single, easily hydrolysed phosphate.
              </>,
            ],
          },
          {
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Value", "Reason"],
                rows: [
                  ["Buffer", "citrate 50 mM, pH 5.0", "the effluent is rich in citric acid and its salts, so the buffer matches the process"],
                  ["Temperature", "30 ºC", "reactor operating temperature"],
                  ["Substrate:enzyme", "9:1", "keeps substrate in excess for initial-rate kinetics"],
                  ["Stop / read", "1 M NaOH, 405 nm", "pNP is only coloured at basic pH, so the reaction is stopped and developed at each time point"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "The end-point design (sampling into NaOH) is necessary precisely because pNP cannot be followed continuously at acidic pH, a constraint that later dictated a different assay for the immobilisation work. An enzyme-free well corrected for spontaneous substrate hydrolysis. Protein was quantified by Bradford against a BSA standard, and specific activity (U/mg, one unit releasing 1 µmol pNP per minute) was taken from the initial linear rate; normalising by protein mass is essential, since two enzymes releasing the same amount of product can differ greatly in efficiency once their loading is accounted for.",
              "The expected outcome was a definitive order of intrinsic efficiency in acid medium, **AphA (0.222 U/mg) > M2-32 (0.161 U/mg) > PhyA (0.141 U/mg)**, identifying AphA and PhyA as the key components.",
            ],
          },
        ],
        protocols: protocolLinks(
          "09-activity-assay-bis-pnpp",
          "10-protein-quantification-bradford",
        ),
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
        protocols: protocolLinks(
          "11-lecitase-ultra-characterisation",
          "10-protein-quantification-bradford",
        ),
      },
      {
        id: "manae-agarose-prep",
        tabLabel: "MANAE-agarose prep",
        title: "Preparation of the MANAE-agarose support",
        body: [
          {
            paragraphs: [
              <>
                The aim was to build a cheap, reproducible model support on which to compare immobilisation
                chemistries before committing to the alginate-chitosan-genipin sphere. MANAE-agarose was chosen
                because it is well characterised and previously optimised <Cite n={14} />, and because
                glutaraldehyde on it plays the same amino-crosslinking role that genipin will play on the final
                sphere, so the conclusions transfer.
              </>,
              "Starting from BCL agarose, the hydroxyls were first converted to epoxides with glycidol under alkaline reducing conditions, then oxidised with sodium periodate to give a glyoxyl (aldehyde) agarose. The aldehydes were reacted with an excess of ethylenediamine at pH 10, and the resulting Schiff bases were reduced with sodium borohydride, leaving the support decorated with positively charged secondary amino groups. Amination was carried out in an ice bath to control the exothermic reaction, and the support was washed sequentially at pH 9, pH 4 and with water to strip loosely bound reagents. The result is a positively charged support that adsorbs the acidic patches of a protein surface by ion exchange and, once activated with glutaraldehyde, can also bind it covalently.",
              "The expected outcome was a MANAE-agarose support ready to serve as the common base for both immobilisation strategies (Figure 6).",
            ],
            pairedResource: {
              kind: "image",
              src: `${IMG_DIR}/immobilisation-strategies.png`,
              alt: "Two routes from MANAE-agarose: the covalent route pre-activates the support with glutaraldehyde before adding the enzyme; the ionic route adsorbs the enzyme first and then crosslinks it with glutaraldehyde",
              caption:
                "**Schematic representation of two distinct enzyme immobilization strategies on MANAE agarose support using glutaraldehyde. Covalent Immobilization (Top Route):** MANAE agarose support is pre-activated with glutaraldehyde (**+Glut**) to introduce reactive aldehyde groups onto the support surface. The enzyme (**+Enzyme**) is then added to form direct covalent bonds with the activated matrix. **Ionic Adsorption followed by Crosslinking (Bottom Route):** The enzyme (**+Enzyme**) is first ionically adsorbed onto the positively charged MANAE agarose surface via electrostatic interactions. Subsequently, glutaraldehyde (**+Glut**) is introduced as a crosslinking agent to form intermolecular chemical linkages, stabilizing the adsorbed enzyme complex.",
            },
          },
        ],
        protocols: protocolLinks("12-enzyme-immobilisation-manae"),
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
        protocols: protocolLinks("12-enzyme-immobilisation-manae"),
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
        protocols: protocolLinks("12-enzyme-immobilisation-manae"),
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
        protocols: protocolLinks("12-enzyme-immobilisation-manae"),
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
        protocols: protocolLinks("12-enzyme-immobilisation-manae"),
      },
      {
        id: "computational-modelling",
        tabLabel: "Computational modelling",
        title: "Computational modelling of the mechanism",
        body: [
          {
            paragraphs: [
              "The aim was to explain, at the residue level, why the detergent effect reverses between the two strategies. The open and closed conformations of Lecitase® Ultra were aligned and coloured in PyMOL, mapping the catalytic triad (Ser146, Asp201, His258), the lid (residues 80 to 95), the reactive lysines nearest the active site (Lys24, Lys259) and the acidic crown at the base (Asp27, Glu56, Asp57, Asp62).",
              <>
                On the preactivated support, the detergent holds the lid open so the enzyme is locked in its active
                form, whereas without detergent the closed enzyme is fixed through Lys24 and Lys259, jamming the lid
                shut and explaining the low activity <Cite n={17} />. In the adsorption route the acidic crown
                anchors the enzyme with its active site projected away from the surface, so without detergent the
                lid stays free to open, whereas the detergent scrambles that electrostatic orientation and the
                subsequent crosslinking then freezes a distorted arrangement <Cite n={18} />.
              </>,
            ],
          },
          {
            paragraphs: [
              "The commands below are the ones actually run, exactly as recorded with the team's own step comments — the alignment and base view, then the residue selections that carry the argument (acids red, lysines blue, triad magenta, lid green), then the semi-transparent surface used to inspect the catalytic pocket.",
            ],
            pairedResource: {
              kind: "custom",
              node: (
                <pre className="record-code" aria-label="PyMOL command script">
                  {PYMOL_SCRIPT.split("\n").map((line, index) => (
                    <span
                      key={index}
                      className={line.startsWith("#") ? "record-code__comment" : undefined}
                    >
                      {line}
                      {"\n"}
                    </span>
                  ))}
                </pre>
              ),
            },
          },
          {
            paragraphs: [
              <>
                The expected outcome was a structural model that fully accounts for the measured yields and points
                to the closed-form adsorption route as the strategy to transfer to the sphere.
              </>,
            ],
          },
        ],
        protocols: protocolLinks("01-in-silico-construct-design"),
      },
    ],
    outro:
      "Using an inexpensive model support and glutaraldehyde as a stand-in for genipin let the two anchoring strategies be compared without spending resources on the full sphere; the detergent variable and the free-enzyme control were the minimum needed to interpret the yields, and the modelling was added only to explain the result.",
  },
  {
    id: "enzymatic-immobilisation-conclusion",
    heading: "3. Conclusion",
    intro: [
      <>
        The experiments on this page are both <strong>necessary and sufficient</strong> for the objective of the
        block, and they were ordered so that each one answered the question the next decision depended on. The
        mining was done before anything was expressed, because committing to seven heterologous enzymes is only
        worth it once the panel is matched to the real effluent and to the operating window, which is why the
        catalytic-profile filter at pH 5.0 and 30 ºC, and not sequence availability, drove the selection. The
        constructs were then designed in silico before any DNA was ordered, so that the folding environment each
        enzyme would need could be anticipated rather than discovered from a failed expression round. Expression
        separated what could be made from what could be folded, and the solubilisation effort was escalated only
        as far as each target required and stopped once three enzymes were soluble, rather than pursued to
        completeness: the enzymes that resisted, <strong>EstE1</strong> and <strong>AppA</strong>, were left as the
        stated limit of the panel, and the cytotoxic phospholipases C were rerouted to cell-free expression rather
        than forced through a host that could not make them. Nothing was characterised beyond what the system
        required, a single affinity step rather than a full purification train, and activities reported as{" "}
        <strong>specific activities normalised by protein</strong>, which is the measurement that actually ranks
        the biocatalysts and the one that reversed the apparent order.
      </>,
      <>
        The scope of the immobilisation work was set by the circumstances of the project as much as by what would
        be ideal. The chemistry was developed on an inexpensive, previously optimised MANAE-agarose support with
        glutaraldehyde standing in for the genipin of the final sphere, rather than on the costly
        alginate-chitosan sphere itself, and on the commercial Lecitase Ultra, chosen as the most demanding model
        enzyme so that a chemistry able to preserve its activity would generalise to the simpler, more hydrophilic
        members of the panel. Each comparison carried the control that makes it interpretable: an enzyme-free
        spontaneous-hydrolysis control in the activity assay, and a <strong>free-enzyme inactivation control</strong>{" "}
        run alongside every immobilisation, so that a loss of activity could be attributed to the anchoring and
        not to the buffer or to thermal denaturation. The two sub-blocks are mutually dependent and converge in a
        single downstream step, since enzymes with no way to immobilise them for reuse, or an immobilisation
        chemistry with no enzymes to fix, would each fall short of a functionalised sphere: the panel of
        phosphohydrolases produced in the first is fixed, by the chemistry established in the second, onto the
        surface of the PAO-loaded alginate-chitosan sphere, with <strong>genipin replacing glutaraldehyde</strong>{" "}
        as a far less cytotoxic crosslinker.
      </>,
      <>
        What is left undone is left for stated reasons, and in each case the experiment that would close the gap is
        named: the winning strategy has been validated on the model enzyme and support but{" "}
        <strong>not yet transferred to the panel enzymes on the real genipin sphere</strong>, and the phospholipase
        activity still awaits its cell-free production.
      </>,
    ],
  },
];

export const ENZYMATIC_IMMOBILISATION_REFERENCES: string[] = [
  "[1] Dayton CLG, Da Silva Galhardo F, Barton N, Hitchman T, Lyon J, O’donoghue E, et al. EP2488639A1 - Oil degumming methods - Google Patents [Internet]. 2009. Available from: https://patents.google.com/patent/EP2488639A1/en",
  "[2] Hon J, Borko S, Stourac J, Prokop Z, Zendulka J, Bednar D, et al. EnzymeMiner: automated mining of soluble enzymes with diverse structures, catalytic properties and stabilities. Nucleic Acids Research [Internet]. 2020 Apr 29;48(W1):W104–9. Available from: https://doi.org/10.1093/nar/gkaa372",
  "[3] Hauenstein J, Jeske L, Jäde A, Krull M, Dümmer K, Koblitz J, et al. BRENDA in 2026: a Global Core Biodata Resource for functional enzyme and metabolic data within the DSMZ Digital Diversity. Nucleic Acids Research [Internet]. 2025 Nov 6;54(D1):D527–34. Available from: https://doi.org/10.1093/nar/gkaf1113",
  "[4] Bateman A, Martin MJ, Orchard S, Magrane M, Adesina A, Ahmad S, et al. UniProt: the Universal Protein Knowledgebase in 2025. Nucleic Acids Research [Internet]. 2024 Oct 16;53(D1):D609–17. Available from: https://doi.org/10.1093/nar/gkae1010",
  "[5] Waterhouse A, Bertoni M, Bienert S, Studer G, Tauriello G, Gumienny R, et al. SWISS-MODEL: homology modelling of protein structures and complexes. Nucleic Acids Research [Internet]. 2018 May 7;46(W1):W296–303. Available from: https://doi.org/10.1093/nar/gky427",
  "[6] Mura C, McCrimmon CM, Vertrees J, Sawaya MR. An introduction to biomolecular graphics. PLoS Computational Biology [Internet]. 2010 Aug 26;6(8):e1000918. Available from: https://doi.org/10.1371/journal.pcbi.1000918",
  "[7] Novagen. (2003). pET system manual (11th ed.). EMD Biosciences.",
  "[8] Cline J. PCR fidelity of pfu DNA polymerase and other thermostable DNA polymerases. Nucleic Acids Research [Internet]. 1996 Sep 15;24(18):3546–51. Available from: https://doi.org/10.1093/nar/24.18.3546",
  "[9] Studier FW. Protein production by auto-induction in high-density shaking cultures. Protein Expression and Purification [Internet]. 2005 Feb 8;41(1):207–34. Available from: https://doi.org/10.1016/j.pep.2005.01.016",
  "[10] Porath J, Carlsson J, Olsson I, Belfrage G. Metal chelate affinity chromatography, a new approach to protein fractionation. Nature [Internet]. 1975 Dec 1;258(5536):598–9. Available from: https://doi.org/10.1038/258598a0",
  "[11] Andersch MA, Szczypinski AJ. Use of P-Nitrophenylphosphate as the substrate in determination of serum acid phosphatase. American Journal of Clinical Pathology [Internet]. 1947 Jul 1;17(7_ts):571–4. Available from: https://doi.org/10.1093/ajcp/17.7_ts.571",
  "[12] Virgen-Ortíz JJ, Santos JCSD, Ortiz C, Berenguer-Murcia Á, Barbosa O, Rodrigues RC, et al. Lecitase ultra: A phospholipase with great potential in biocatalysis. Molecular Catalysis [Internet]. 2019 May 21;473:110405. Available from: https://doi.org/10.1016/j.mcat.2019.110405",
  "[13] Andrés-Sanz D, Fresan C, Fernández-Lorente G, Rocha-Martín J, Guisán JM. Stabilization of Lecitase Ultra® by immobilization and fixation of bimolecular aggregates. release of omega-3 fatty acids by enzymatic hydrolysis of krill oil. Catalysts [Internet]. 2021 Aug 31;11(9):1067. Available from: https://doi.org/10.3390/catal11091067",
  "[14] Braham SA, Siar EH, Arana-Peña S, Bavandi H, Carballares D, Morellon-Sterling R, et al. Positive effect of glycerol on the stability of immobilized enzymes: Is it a universal fact? Process Biochemistry [Internet]. 2020 Dec 30;102:108–21. Available from: https://doi.org/10.1016/j.procbio.2020.12.015",
  "[15] López-Gallego F, Betancor L, Mateo C, Hidalgo A, Alonso-Morales N, Dellamora-Ortiz G, et al. Enzyme stabilization by glutaraldehyde crosslinking of adsorbed proteins on aminated supports. Journal of Biotechnology [Internet]. 2005 Jul 22;119(1):70–5. Available from: https://doi.org/10.1016/j.jbiotec.2005.05.021",
  "[16] Mateo C, Bolivar JM, Godoy CA, Rocha-Martin J, Pessela BC, Curiel JA, et al. Improvement of Enzyme Properties with a Two-Step Immobilizaton Process on Novel Heterofunctional Supports. Biomacromolecules [Internet]. 2010 Oct 14;11(11):3112–7. Available from: https://doi.org/10.1021/bm100916r",
  "[17] Rodrigues RC, Virgen-Ortíz JJ, Santos JCSD, Berenguer-Murcia Á, Alcantara AR, Barbosa O, et al. Immobilization of lipases on hydrophobic supports: immobilization mechanism, advantages, problems, and solutions. Biotechnology Advances [Internet]. 2019 Apr 8;37(5):746–70. Available from: https://doi.org/10.1016/j.biotechadv.2019.04.003",
  "[18] Barbosa O, Ortiz C, Berenguer-Murcia Á, Torres R, Rodrigues RC, Fernandez-Lafuente R. Glutaraldehyde in bio-catalysts design: a useful crosslinker and a versatile tool in enzyme immobilization. RSC Advances [Internet]. 2013 Oct 28;4(4):1583–600. Available from: https://doi.org/10.1039/c3ra45991h",
];

/* Restored so Experiments.tsx builds again. */
export const ENZYMATIC_IMMOBILISATION_SCHEMATIC_CAPTION: ReactNode = null;
