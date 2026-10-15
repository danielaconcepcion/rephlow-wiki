import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ExperimentSubBlock } from "../../components/LabFolders/types";
import { asset } from "../../utils";

/**
 * Real content for the "Revalorisation" Experiments block — transcribed
 * from the team's own write-up (Notion, "WIKI / Experiments /
 * Revalorisation").
 *
 * Content decisions (no wording invented, only adapted to what this
 * component family can render, following the precedents already set in
 * GeneticEngineeringData.tsx / EnzymaticImmobilisationData.tsx):
 * - The source's four labelled toggles become the four sub-blocks
 *   "1. Computational protein design", "2. Enzyme expression",
 *   "3. Enzyme purification" and "4. Enzyme activity assay", each with the
 *   source's own introductory paragraph as its intro.
 * - Each stage keeps the source's own two names: the toggle's short label
 *   is the `tabLabel` ("Selection", "Obtaining CFE", "FPLC") and the
 *   heading inside it is the card `title` ("Selection and growth of
 *   transformants"). The "DHAK" / "DHAK  PPK2" marker printed next to that
 *   heading is data, not title text — it is carried by `enzymes` and
 *   rendered as a chip (see ExperimentData.enzymes).
 * - Each named part of a stage ("Design strategy", "Experimental design",
 *   "Enzymatic lysis", …) is its own `body` block with that name as its
 *   `title`, so a long stage reads as a sequence of named parts on the same
 *   rule-and-heading break the Results subsections use. Parts the source
 *   does not name stay untitled, carrying on from the part above them.
 * - The source closes most stages with a shouted OUTCOME / LEARN / "WHAT WE
 *   DID NOT DO" paragraph; those are carried as `callouts` on the block
 *   they close, which prints the label itself. Their trailing "See the
 *   results." pointer is dropped, since each sub-block already links the
 *   Results page from its prose.
 * - Figures are the images from the Notion export (under
 *   public/assets/experiments/revalorisation/), with the source's own
 *   captions minus the "Figure n." prefix.
 * - The source's bullet lists are rendered as short consecutive
 *   paragraphs, each keeping its own bold lead-in, since a record's
 *   prose slots carry paragraphs rather than lists.
 * - Every "PROTOCOL: SCIENCE>BLOQUES>…" line is replaced by a real
 *   `protocols` download link named after the protocol the source cites
 *   (placeholder PDF paths, as in the other blocks).
 * - The source's twelve numbered references are the block-level reference
 *   list (REVALORISATION_REFERENCES, keeping the source's own numbering),
 *   rendered once at the end of the page; every inline "[n]" points into
 *   it through the local <Cite> helper.
 * - The page-closing "Conclusion" is carried as the outro of the last
 *   sub-block, which is where it renders at the foot of the block, just
 *   above that reference list.
 */

const PROTOCOL: Record<string, { label: string; href: string }> = {
  "pross-design": {
    label: "PROSS design",
    href: "assets/protocols/revalorisation-pross-design.pdf",
  },
  "spytag-spycatcher": {
    label: "SpyTag/SpyCatcher design",
    href: "assets/protocols/revalorisation-spytag-spycatcher.pdf",
  },
  transformation: {
    label: "Transformation of competent bacteria",
    href: "assets/protocols/revalorisation-transformation.pdf",
  },
  induction: {
    label: "Expression induction in transformed bacteria",
    href: "assets/protocols/revalorisation-expression-induction.pdf",
  },
  harvesting: {
    label: "Harvesting and precipitation of IPTG-induced bacteria",
    href: "assets/protocols/revalorisation-harvesting.pdf",
  },
  "crude-extract": {
    label: "Preparation of bacterial crude extract",
    href: "assets/protocols/revalorisation-crude-extract.pdf",
  },
  imac: {
    label: "Immobilised metal affinity chromatography",
    href: "assets/protocols/revalorisation-imac.pdf",
  },
  dialysis: {
    label: "Dialysis of IMAC eluates",
    href: "assets/protocols/revalorisation-dialysis.pdf",
  },
  "imac-express": {
    label: "Express IMAC (DHAK)",
    href: "assets/protocols/revalorisation-imac-express.pdf",
  },
  fplc: {
    label: "FPLC size-exclusion chromatography (DHAK)",
    href: "assets/protocols/revalorisation-fplc.pdf",
  },
  "dhak-activity": {
    label: "DHAK activity assay",
    href: "assets/protocols/revalorisation-dhak-activity-assay.pdf",
  },
  "coupled-assay": {
    label: "Coupled DHAK–PPK2 assay",
    href: "assets/protocols/revalorisation-coupled-assay.pdf",
  },
};
const IMG_DIR = "assets/experiments/revalorisation";

function protocolLinks(...names: string[]) {
  return names.map((n) => PROTOCOL[n]);
}

/** An inline "[n]" citation into this block's single reference list (see
 * REVALORISATION_REFERENCES and ExperimentBlockData.references) — the same
 * local helper Genetic engineering uses, with the block's own id as the
 * scope, matching the `ref-<scope>-<n>` id ExperimentCard's ReferenceItem
 * gives each entry. */
function Cite({ n }: { n: number }) {
  return (
    <a href={`#ref-revalorisation-${n}`} className="lab-citation">
      [{n}]
    </a>
  );
}

export const REVALORISATION_INTRO: ReactNode[] = [
  <>
    This set of experiments is the <strong>conversion module</strong> of
    rePhlow's multi-enzymatic system for{" "}
    <strong>turning waste into high-value products</strong> (see{" "}
    <Link className="lab-wikilink" to="/project-description">
      Project Description
    </Link>
    ). It couples two enzymes. <strong>DHAK</strong> (dihydroxyacetone kinase
    from <em>Citrobacter freundii</em>) phosphorylates dihydroxyacetone to{" "}
    <strong>dihydroxyacetone phosphate (DHAP)</strong>, an unstable and
    expensive building block for the DHAP-dependent aldolases used to make rare
    sugars and iminosugars <Cite n={1} />, <Cite n={2} />. <strong>PPK2</strong>{" "}
    draws energy from polyphosphate to <strong>regenerate ATP</strong> from a
    small recycled nucleotide pool instead of a costly stoichiometric supply of
    cofactor, and clears the ADP that inhibits DHAK as it forms. We use a
    bifunctional <strong>BcPPK2-III</strong> from{" "}
    <em>Burkholderia cenocepacia</em>, which carries AMP through to ATP in a
    single enzyme and stays active across pH 6 to 9 <Cite n={3} />, the range a
    scalable cascade needs.
  </>,
  <>
    In the complete design, the phosphate stored inside the{" "}
    <em>Pseudomonas putida</em> beads is released by lysing the recovered beads,
    giving the inorganic polyphosphate that feeds this module. For the
    experiments we <strong>decoupled the block from bead recovery</strong>,
    which depends on the upstream hardware, and used commercial polyphosphate
    instead, so that the biochemistry of the conversion could be characterised
    on its own terms; substituting bead-derived polyP is a later integration
    step.
  </>,
  <>
    Obtaining a working module required two enzymes that are active, pure enough
    to be measured without interference, and able to sustain each other's
    reaction. Rather than optimising a single step, the module was built through
    a <strong>sequential experimental workflow</strong> in which each stage
    produces the material and the information the next one needs: a gene
    designed <em>in silico</em> becomes a protein, the protein is purified, and
    only then can its activity, and that of the coupled pair, be measured. Most
    of the wet-lab route is shared between the two enzymes, which are
    transformed, induced, harvested and lysed through the same procedure; the
    differences appear where the two proteins behave differently, and the
    problems that caused them are developed in{" "}
    <Link className="lab-wikilink" to="/engineering">
      Engineering
    </Link>
    .
  </>,
  <>
    Unless otherwise stated, both enzymes were expressed in <em>E. coli</em>{" "}
    BL21(DE3) from genes supplied in a <strong>pET-28a(+)</strong> vector,
    codon-optimised for <em>E. coli</em>, grown in LB medium with kanamycin at
    50 µg/mL and induced with IPTG. Purification used{" "}
    <strong>Co²⁺-IDA-agarose</strong> resin in disposable SPE cartridges, with
    all buffers prepared in ultrapure water (Milli-Q) immediately before use and
    filtered before application. Activity assays were carried out in a
    spectrophotometer in 1 cm cuvettes, using α-glycerophosphate dehydrogenase
    and triosephosphate isomerase as coupling enzymes.
  </>,
  <>
    Together, these experiments provide the evidence required to show that the
    conversion module produces DHAP and that its ATP can be regenerated from
    polyphosphate, the step that makes the process viable for integration into
    the rePhlow system.
  </>,
  // Same look and width as Genetic engineering's own intro figure (the
  // vsi-figure/pd-figure/lab-figure--pathway combination — see
  // Experiments.tsx's local Figure component). A <span> rather than a
  // <figure>, since each intro node is rendered inside a <p>.
  <span
    className="vsi-figure vsi-figure--full pd-figure lab-figure--pathway"
    style={{ display: "block" }}
  >
    <img
      src={asset(`${IMG_DIR}/revalorisation-workflow.webp`)}
      alt="Six-stage workflow of the conversion module: computational stability engineering, enzyme expression, enzyme purification, enzyme activity assays, multi-enzyme system assembly and testing, and SpyTag–SpyCatcher channelling"
    />
  </span>,
];

export const REVALORISATION_REFERENCES: string[] = [
  "Sánchez-Moreno I, García-García JF, Bastida A, García-Junceda E. Multienzyme system for dihydroxyacetone phosphate-dependent aldolase catalyzed C–C bond formation from dihydroxyacetone. Chem Commun. 2004;(14):1634–5. https://doi.org/10.1039/b405220j",
  "Sánchez-Moreno I. Dihidroxiacetona quinasa de *Citrobacter freundii* CECT 4626: una aproximación integral a un nuevo biocatalizador para la formación de enlaces C–C [doctoral thesis]. Madrid: Universidad Autónoma de Madrid; 2009. http://hdl.handle.net/10486/3594",
  "Monterrey DT, Azcona L, Revuelta J, Sánchez-Moreno I, García-Junceda E. Polyphosphate kinase from *Burkholderia cenocepacia*, one enzyme catalyzing a two-step cascade reaction to synthesize ATP from AMP. Int J Mol Sci. 2024;25(23):12995. https://doi.org/10.3390/ijms252312995",
  "Goldenzweig A, Goldsmith M, Hill SE, Gertman O, Laurino P, Ashani Y, Dym O, Unger T, Albeck S, Prilusky J, Lieberman RL, Aharoni A, Silman I, Sussman JL, Tawfik DS, Fleishman SJ. Automated structure- and sequence-based design of proteins for high bacterial expression and stability. Mol Cell. 2016;63(2):337–46. https://doi.org/10.1016/j.molcel.2016.06.012",
  "Gauss D, Sánchez-Moreno I, Oroz-Guinea I, García-Junceda E, Wohlgemuth R. Phosphorylation catalyzed by dihydroxyacetone kinase. Eur J Org Chem. 2018;2018(23):2892–5. https://doi.org/10.1002/ejoc.201800350",
  "Keeble AH, Howarth M. Power to the protein: enhancing and combining activities using the Spy toolbox. Chem Sci. 2020;11(28):7281–91. https://doi.org/10.1039/d0sc01878c",
  "Sambrook J, Russell DW. Molecular cloning: a laboratory manual. 3rd ed. Cold Spring Harbor (NY): Cold Spring Harbor Laboratory Press; 2001.",
  "Bastida A, Fernández-Mayoralas A, Gómez Arrayás R, Iradier F, Carretero JC, García-Junceda E. Heterologous over-expression of α-1,6-fucosyltransferase from *Rhizobium* sp.: application to the synthesis of the trisaccharide β-D-GlcNAc(1→4)-[α-L-Fuc-(1→6)]-D-GlcNAc, study of the acceptor specificity and evaluation of polyhydroxylated indolizidines as inhibitors. ChemInform. 2002;33(6). https://doi.org/10.1002/chin.200206232",
  "Laemmli UK. Cleavage of structural proteins during the assembly of the head of bacteriophage T4. Nature. 1970;227(5259):680–5. https://doi.org/10.1038/227680a0",
  "Bradford MM. A rapid and sensitive method for the quantitation of microgram quantities of protein utilizing the principle of protein–dye binding. Anal Biochem. 1976;72(1–2):248–54. https://doi.org/10.1016/0003-2697(76)90527-3",
  "Merck Millipore. Amicon Ultra-15 centrifugal filter devices: user guide. Darmstadt: Merck KGaA; [cited 2026 Oct 13]. https://www.merckmillipore.com",
  "Merck Millipore. Amicon Ultra-0.5 centrifugal filter devices: user guide. Darmstadt: Merck KGaA; [cited 2026 Oct 13]. https://www.merckmillipore.com",
];

export const REVALORISATION_SUBBLOCKS: ExperimentSubBlock[] = [
  {
    id: "computational-design",
    heading: "1. Computational protein design",
    intro: [
      <>
        Before any gene was ordered, both the enzyme itself and the way the two
        enzymes might be joined were <strong>designed in silico</strong>,
        because a design costs a server submission and a gene order whereas{" "}
        <strong>screening variants at the bench costs months</strong>. DHAK had
        to withstand the{" "}
        <strong>handling, storage and reaction conditions</strong> of a
        revalorisation process, so it was <strong>stabilised with PROSS</strong>
        , which lowers the free energy of the fold while{" "}
        <strong>protecting the catalytic and cofactor-binding regions</strong>{" "}
        <Cite n={4} />. The stabilised designs were{" "}
        <strong>not ordered on their own</strong>. They went into the{" "}
        <strong>same gene order as the unmodified wild-type enzymes</strong>, so
        that each stabilised variant had its{" "}
        <strong>own wild-type counterpart to be compared against</strong> and so
        that the{" "}
        <strong>
          activity of the native wild-type system could be measured
        </strong>{" "}
        in the first place. <strong>Two stabilisation rounds</strong> were
        carried out, an{" "}
        <strong>aggressive design on the reference sequence</strong> and a{" "}
        <strong>
          conservative one transferred to a more catalytically efficient strain
        </strong>
        . In parallel with the enzyme design, the possibility of{" "}
        <strong>
          joining DHAK and PPK2 into a single biocatalytic complex through
          SpyTag/SpyCatcher
        </strong>{" "}
        was explored, to favour{" "}
        <strong>substrate channelling of the regenerated ATP</strong>.
      </>,
    ],
    experiments: [
      {
        id: "dhak-in-silico-stabilisation",
        tabLabel: "PROSS cycle 1",
        title: "In silico stabilisation of DHAK from *C. freundii* DSM 30040",
        enzymes: ["DHAK"],
        body: [
          {
            paragraphs: [
              "The goal of this stage was a **DHAK variant with improved thermodynamic stability** that keeps its catalytic function intact, so that the enzyme tolerates the handling, storage and reaction conditions of a revalorisation process better than the wild type. Stabilisation was pursued computationally before any bench work, because designing and ordering a stabilised gene is far cheaper than screening mutants experimentally. **PPK2 was expressed as its native sequence** and did not go through this stage.",
            ],
          },
          {
            title: "Starting structure and protected regions",
            paragraphs: [
              "The design started from the crystal structure of DHAK from *C. freundii* DSM 30040 in complex with its ligands, **PDB entry 1UN9**. The complexed structure was used on purpose, because it lets the algorithm recognise where the functional residues sit and avoid mutating them.",
              "DHAK is a homodimer built from two domains: the **K-domain**, which carries the dihydroxyacetone site, and the **L-domain**, which carries the ATP site. In the dimer, the K-domain of one subunit faces the L-domain of the other, forming two composite active sites. Three ligands mark the regions that must not be altered: the ATP analogue (**AMP-PNP**), **dihydroxyacetone (DHA)** and the **Mg²⁺ ion**. Residues within roughly **4 Å** of any ligand were flagged as protected, so that stabilising mutations are excluded from the catalytic and cofactor-binding shells.",
            ],
            pairedResource: {
              kind: "image",
              src: `${IMG_DIR}/dhak-homodimer-1un9.png`,
              alt: "DHAK homodimer (PDB 1UN9) with its K- and L-domains, and close-ups of the ATP and DHA binding sites and the Mg²⁺ ions",
              caption:
                "DHAK homodimer (PDB 1UN9), K- and L-domains and the ATP, DHA and Mg²⁺ ligands.",
            },
          },
          {
            pairedResource: {
              kind: "image",
              src: `${IMG_DIR}/dhak-protected-residues.png`,
              alt: "DHAK monomer with the residues within 4 Å of the ATP and DHA ligands shown as spheres in the L- and K-domains",
              caption:
                "Protected residues within 4 Å of the ligands, mapped on the structure.",
            },
          },
          {
            title: "Design strategy",
            paragraphs: [
              <>
                The <strong>PROSS</strong> server takes the sequence and the PDB
                structure and returns a small set of stabilised designs,
                combining phylogenetic sequence information with Rosetta energy
                calculations to lower the free energy of the fold while
                conserving function <Cite n={4} />. The designs are numbered
                from the{" "}
                <strong>most conservative to the most aggressive</strong>, so
                they form a gradient: the higher the number, the more mutations
                and, in principle, the greater the predicted stabilisation, but
                also the greater the{" "}
                <strong>risk of disturbing the enzyme</strong>. The protected
                ligands were declared explicitly, so that the server{" "}
                <strong>keeps the active site untouched</strong> while it
                stabilises the rest of the protein.
              </>,
            ],
            pairedResource: {
              kind: "image",
              src: `${IMG_DIR}/dhak-pross5-mutations.png`,
              alt: "DHAK dimer surface (chains A and B) and chain A cartoon with the PROSS design 5 mutations highlighted in yellow",
              caption:
                "Mutated positions of PROSS design 5 relative to wild-type DHAK",
            },
          },
          {
            title: "Experimental design",
            paragraphs: [
              <>
                One design from that gradient was to be taken forward, ordered
                as a synthetic gene and expressed in parallel with the wild-type
                sequence under identical conditions. The{" "}
                <strong>wild type is the control</strong> of this experiment,
                because the two differ only in the introduced mutations, any
                difference in expression, stability or activity between them is
                attributable to the design itself. Which position of the
                gradient to choose is the real decision of this stage, since it
                sets how much stabilisation is pursued and how much risk to
                catalytic function is accepted. The design selected and the
                reasoning behind it are reported in{" "}
                <Link className="lab-wikilink" to="/results">
                  Results
                </Link>
                .
              </>,
            ],
            callouts: [
              {
                kind: "learn",
                text: "The PROSS server was unavailable on the first attempt and the submission had to be repeated, which is why the selected design comes from the second run. This is recorded so that a future team allows for server downtime when planning this step.",
              },
              {
                kind: "outcome",
                text: "One concrete stabilised variant **(PROSS 5)** and the wild-type reference, taken forward for expression.",
              },
            ],
          },
        ],
        protocols: protocolLinks("pross-design"),
      },
      {
        id: "dhak-pross-cycle-2",
        tabLabel: "PROSS cycle 2",
        title: "In silico stabilisation of DHAK CECT 4626",
        enzymes: ["DHAK"],
        body: [
          {
            paragraphs: [
              <>
                The goal of this stage was a second,{" "}
                <strong>more conservative</strong> stabilisation design, and a
                way of transferring it to the DHAK variant of{" "}
                <em>C. freundii</em> strain <strong>CECT 4626</strong>. Two
                findings from the first design made this necessary, and both are
                developed in{" "}
                <Link className="lab-wikilink" to="/engineering">
                  Engineering
                </Link>
                : the aggressive design{" "}
                <strong>improved expression but lost activity</strong>, which we
                attribute to the large number of mutations it carries, and the
                team moved to the <strong>CECT 4626 enzyme</strong>, reported as
                the <strong>most catalytically efficient DHAK</strong> described
                to date <Cite n={2} />, <Cite n={5} />.
              </>,
              "The design question therefore changed. Instead of asking how far the fold can be stabilised, we asked *how few mutations are needed*, and whether the natural sequence of the new strain already contains part of what the algorithm had proposed.",
            ],
          },
          {
            title: "Same design, a more conservative choice",
            paragraphs: [
              <>
                The starting point was the same as in the first stage: the same
                DHAK sequence of <em>C. freundii</em> DSM 30040, the same
                structure (<strong>PDB 1UN9</strong>) and the same protected
                ligands, since the regions that must not be mutated do not
                change. What changed is which design from the returned gradient
                was taken forward: this time the{" "}
                <strong>most conservative one, PROSS 1</strong> <Cite n={4} />,
                which introduces the{" "}
                <strong>smallest number of mutations</strong> and therefore
                carries the <strong>lowest risk to catalytic function</strong>.
              </>,
            ],
          },
          {
            title:
              "The additional step: transferring the mutations to CECT 4626",
            paragraphs: [
              "Because the design was produced on the DSM 30040 sequence, it cannot simply be applied to the new strain. An **additional comparison step** was therefore introduced: the PROSS 1 design was aligned, position by position, with the natural sequence of DHAK CECT 4626, and three categories of position were distinguished.",
              "**Positions that differ naturally between the two strains.** The two DHAKs share about 96% amino-acid identity, so these mark where the new enzyme already departs from the reference.",
              "**Positions where the natural CECT 4626 residue is the one PROSS proposed.** These are changes the algorithm predicted as stabilising and that evolution had already fixed in the other strain, which is the strongest argument for keeping them, and they need no mutation at all in the new background.",
              "**Positions where PROSS proposes a residue present in neither natural sequence.** These are the genuinely new mutations, and the ones that carry the real risk.",
              <>
                This classification is the core of the experiment, because it
                sets the criterion for deciding what is actually transferred. It
                lets the mutations be ranked by evidence rather than by
                predicted energy alone, so that only the changes that are both
                predicted to stabilise and absent from the new sequence are
                introduced into it. Which positions fell into each category, and
                which mutations were finally selected, are reported in{" "}
                <Link className="lab-wikilink" to="/results">
                  Results
                </Link>
                .
              </>,
            ],
          },
          {
            title: "Experimental design",
            paragraphs: [
              "From this analysis a **new plasmid was designed**, carrying the selected mutations on the CECT 4626 background, and ordered as a synthetic gene. As in the first design, the **unmodified CECT 4626 sequence is the control**, so that expression, stability and activity can be compared between the natural enzyme and its stabilised version under identical conditions. Comparing the two stabilisation designs, the aggressive one and this conservative one, also tests directly whether the loss of activity observed earlier was caused by the number of mutations.",
            ],
            callouts: [
              {
                kind: "learn",
                text: "A PROSS design is tied to the sequence it was generated from, so it cannot be applied directly to a homologous enzyme from another strain, even one sharing about 96% identity. Comparing the design with the new sequence before transferring it saved us from introducing mutations the new enzyme already carried naturally.",
              },
              {
                kind: "outcome",
                text: "A conservative, evidence-ranked set of stabilising mutations transferred to the CECT 4626 background, and a new plasmid designed and ordered from it.",
              },
            ],
          },
        ],
        protocols: protocolLinks("pross-design"),
      },
      {
        id: "spytag-spycatcher-channelling",
        tabLabel: "Channelling",
        title: "Channelling the biocatalytic complex (SpyTag/SpyCatcher)",
        enzymes: ["DHAK", "PPK2"],
        body: [
          {
            paragraphs: [
              "The goal of this stage was to design a way of physically joining DHAK and PPK2 into a **single biocatalytic complex**. In our system PPK2 regenerates the ATP that DHAK consumes, so the two enzymes depend on each other. Keeping them covalently close should favour **substrate channelling**: the ATP produced by PPK2 reaches the DHAK active site before diffusing into the bulk solution, which raises the effective local concentration of the cofactor and should make the coupled reaction more efficient than the same two enzymes free in solution.",
              <>
                The <strong>SpyTag/SpyCatcher</strong> system was chosen because
                it joins two proteins through a spontaneous, irreversible
                isopeptide bond that forms simply on mixing, with no enzyme,
                cofactor or chemical crosslinker. One partner carries the short{" "}
                <strong>SpyTag</strong> peptide and the other the larger{" "}
                <strong>SpyCatcher</strong> domain, so the complex assembles by
                itself when both purified enzymes are combined <Cite n={6} />.
              </>,
            ],
          },
          {
            title: "Which enzyme carries which part",
            paragraphs: [
              "Our working hypothesis was to assign the parts by size: the **SpyTag**, the smaller element, fused to **DHAK**, which is already a large homodimer, and the **SpyCatcher**, the bulkier domain, fused to **PPK2**, which is the smaller protein. The reasoning is that adding the larger element to the larger protein increases the risk of interfering with folding, with dimerisation or with access to the composite active sites that form at the subunit interface.",
            ],
          },
          {
            title: "Where to place the fusion",
            paragraphs: [
              "Which terminus carries each element is a second decision, independent of the first, and it cannot be made from the sequence alone. The fusion has to sit away from the catalytic regions, but it also has to leave the two active sites of the assembled complex facing each other, since that geometry is what channelling depends on. Both ends of each enzyme are in principle available, so the placement has to be examined structurally, by looking at where the tag and the catcher end up relative to the active sites, before committing to a construct.",
            ],
          },
          {
            title: "Experimental design and the tests still to be done",
            paragraphs: [
              "The size criterion is a reasonable starting hypothesis, but it is only a hypothesis. A fusion can impair an enzyme for reasons that size alone does not predict, and the geometry of the resulting complex, which determines how close the two active sites end up, depends both on which partner carries which element and on which terminus it is attached to.",
              "The experimental design therefore has two levels. First, the two possible **assignments of the elements**: **SpyTag–DHAK** with **SpyCatcher–PPK2** (the arrangement designed here), and **SpyCatcher–DHAK** with **SpyTag–PPK2** (the reciprocal arrangement, not designed yet).",
              "Second, within each assignment, the **position of the fusion** on each enzyme. Because we cannot predict how much the attachment point affects folding, activity or the geometry of the complex, as many combinations as possible should be built and compared, placing each element at the N- or the C-terminus of its enzyme. Comparing them is the only way to tell whether the position is what limits the system and to arrive at the most favourable configuration.",
              "Each fusion would first be checked on its own, for expression, solubility and retained activity against the corresponding unfused enzyme as a control. Only the fusions that keep their activity would then be combined, and the assembled complex compared with the **free enzyme mixture** in the coupled assay, which is the control that tells whether joining the enzymes actually helps. This is what would show which combination, if any, produces a functional channelled complex.",
              "**This stage remained at the level of experimental design.** Only one assignment of the elements was designed, and only for part of the possible placements; the reciprocal arrangement was left as a planned comparison and has not been designed. None of the constructs was taken to the bench within the time available, so no fusion was expressed or assayed. We document the reasoning, what was designed and the comparisons that still have to be made so that a future team can take them up.",
            ],
            callouts: [
              {
                kind: "outcome",
                text: "A modelled and fully designed SpyTag–DHAK / SpyCatcher–PPK2 pair, and a defined experimental plan, including the reciprocal arrangement still to be designed.",
              },
            ],
          },
        ],
        protocols: protocolLinks("spytag-spycatcher"),
      },
    ],
  },
  {
    id: "enzyme-expression",
    heading: "2. Enzyme expression",
    intro: [
      <>
        With the sequences in hand, the goal of this block was simply to obtain
        both enzymes in soluble form, in the smallest number of steps compatible
        with sequence certainty. The genes were ordered{" "}
        <strong>already cloned into an expression vector</strong> rather than
        assembled in-house, and the usual intermediate of verifying the plasmid
        in a cloning strain was deliberately skipped, since the block was
        focused on producing and characterising the protein rather than on
        building the plasmid. Both enzymes then followed the same route:
        transformation into <em>E. coli</em> BL21(DE3), selection and growth to
        exponential phase, induction with IPTG under the T7 system at a lowered
        temperature to favour soluble folding, and finally harvest and{" "}
        <strong>enzymatic lysis</strong> to recover a clarified cell-free
        extract. That extract is the input for everything that follows.
      </>,
    ],
    experiments: [
      {
        id: "gene-acquisition-transformation",
        tabLabel: "Transformation",
        title: "Gene acquisition and bacteria transformation",
        enzymes: ["DHAK", "PPK2"],
        body: [
          {
            paragraphs: [
              "The goal of this stage was a strain of the **expression** host carrying the **gene of interest** on an inducible plasmid. Rather than assembling the construct by restriction and ligation, the coding sequence was ordered as a **synthetic gene already cloned into an expression vector** and introduced directly into the expression host. This trades in-house cloning flexibility for speed and sequence certainty, which suited a block focused on producing and characterising the protein rather than on building the plasmid.",
              <>
                For the DHAK, <strong>two natural sequence variants</strong> of{" "}
                <em>C. freundii</em> DHAK were used, and they must be told
                apart. The gene we ordered was the sequence of the{" "}
                <strong>crystallised enzyme deposited as PDB 1UN9</strong>,
                which corresponds to the previously described reference variant
                of <em>C. freundii</em> DHAK (<strong>strain DSM 30040</strong>;
                UniProt P45510, GenBank U09771). It was synthesised,{" "}
                <strong>
                  codon-optimised for <em>E. coli</em>
                </strong>{" "}
                and cloned into the <strong>pET-28a(+) vector</strong>; we call
                it <strong>DHAK(1UN9)</strong>. The second enzyme,{" "}
                <strong>DHAK(CECT 4626)</strong>, is the variant characterised
                by Sánchez-Moreno <Cite n={2} />, isolated by PCR from the
                genomic DNA of <em>C. freundii</em>{" "}
                <strong>strain CECT 4626</strong> and deposited as{" "}
                <strong>GenBank DQ473522</strong>. The two variants share about{" "}
                <strong>96% amino-acid identity</strong> (92.9% at the
                nucleotide level), <strong>differ at 22 residues</strong>, and
                the CECT 4626 variant was reported as the{" "}
                <strong>most catalytically efficient DHAK</strong> described to
                date.
              </>,
            ],
          },
          {
            title: "Vector and host",
            paragraphs: [
              <>
                The gene was supplied,{" "}
                <strong>
                  codon-optimised for <em>E. coli</em>
                </strong>
                , in a <strong>pET-28a(+) expression vector</strong> and
                expressed in{" "}
                <strong>
                  <em>E. coli</em> BL21(DE3)
                </strong>{" "}
                (Thermo Scientific, cat. EC0114). The pET-28a(+) backbone was
                appropriate for three reasons that matter downstream. It places
                the gene under a <strong>T7 promoter</strong>, giving strong,
                tightly controlled expression in a DE3 host. It confers{" "}
                <strong>kanamycin resistance</strong>, the selection marker used
                throughout this block. And it fuses a{" "}
                <strong>C-terminal hexahistidine tag</strong> to the protein,
                which enables the later immobilised-metal affinity purification
                without further engineering. BL21(DE3) was chosen because it is{" "}
                <strong>protease-deficient</strong> and carries the{" "}
                <strong>T7 RNA polymerase gene under lacUV5 control</strong>, so
                the plasmid's T7 promoter is only transcribed once the
                polymerase is induced.
              </>,
              <>
                Because the construct was ready for expression, the usual
                intermediate of amplifying and verifying the plasmid in a
                cloning strain such as DH5α was{" "}
                <strong>deliberately skipped</strong> to save time. The
                synthetic gene was diluted to about <strong>50 ng/µL</strong> in
                nuclease-free water and transformed into chemically competent
                BL21(DE3) by <strong>heat shock</strong> <Cite n={7} />,
                following the strain manufacturer's protocol. The term used here
                is <strong>transformation</strong>, the uptake of naked plasmid
                DNA by an artificially competent bacterial cell.
              </>,
            ],
          },
          {
            title: "DHAK constructs",
            enzymes: ["DHAK"],
            paragraphs: [
              <>
                Four DHAK constructs were transformed in total, two natural
                sequences and their two stabilised designs, but they were{" "}
                <strong>not handled in parallel</strong>. They entered the
                pipeline in successive rounds, each one prompted by what the
                previous round showed; the reasoning behind each change is
                developed in{" "}
                <Link className="lab-wikilink" to="/engineering">
                  Engineering
                </Link>
                .
              </>,
              <>
                <strong>First round.</strong> The reference sequence{" "}
                <strong>DHAK(1UN9)</strong>, from <em>C. freundii</em> DSM
                30040, was transformed together with its stabilised design{" "}
                <strong>PROSS 5</strong>, so that a direct
                wild-type-versus-variant comparison of stability and activity
                was possible.
              </>,
              "**Second round.** When neither of those two constructs gave a usable enzyme, the wild-type **DHAK(CECT 4626)** was transformed, this being the variant reported as the most catalytically efficient DHAK described to date.",
              "**Third round.** Finally, the conservative design built on that background, **PROSS 1 on CECT 4626**, was transformed, in order to combine the higher catalytic efficiency of the new sequence with a stabilisation carrying far fewer mutations than the first design. **The construct entered the pipeline but did not complete it: the time consumed by the problems of the previous rounds left none to induce it, read its expression or measure its activity, so the comparison it was designed to make against the unmodified CECT 4626 sequence is set up but not yet performed.**",
              "In every round the **wild-type sequence is the control of its own stabilised design**, since the two differ only in the introduced mutations.",
            ],
            callouts: [
              {
                kind: "learn",
                text: "An earlier attempt using a set of pre-existing strains **failed for DHAK**, because those cells carried a resistance marker other than kanamycin and did not survive kanamycin selection. The response was to re-order the gene as a fresh synthetic construct with a known kanamycin-resistant vector and transform it directly into **BL21(DE3)**. This is why the block relies on ordered constructs with a verified marker rather than on the original strains.",
              },
              {
                kind: "outcome",
                text: "BL21(DE3) transformed with the pET-28a(+) construct, ready to be plated under kanamycin selection.",
              },
            ],
          },
          {
            title: "PPK2 construct",
            enzymes: ["PPK2"],
            paragraphs: [
              "The bifunctional **BcPPK2-III** was transformed and expressed as its **native sequence**, with no computational redesign, and handled through the same shared pipeline as DHAK from this point on.",
            ],
          },
        ],
        protocols: protocolLinks("transformation"),
      },
      {
        id: "selection-growth",
        tabLabel: "Selection",
        title: "Selection and growth of transformants",
        enzymes: ["DHAK", "PPK2"],
        body: [
          {
            paragraphs: [
              "The goal of this stage was to obtain isolated, verified colonies of each construct and grow them to the point of induction. The transformation mixture was plated on LB agar containing kanamycin and incubated overnight at 37 °C. Only cells that took up the plasmid, and therefore express the resistance gene, form colonies, so the plate itself is the first selection.",
              "Individual colonies were picked into LB with kanamycin (50 µg/mL) and grown overnight at 37 °C as pre-inocula. Two colonies were picked per construct, so a second independent clone is available in case one carries an unwanted mutation. Each pre-inoculum was then diluted roughly fiftyfold into a larger volume of LB with kanamycin (for example 1 mL into 50 mL) and grown at 37 °C with shaking at 180 rpm. Diluting into fresh medium returns the cells to exponential growth, the state in which they are most transcriptionally and translationally active and therefore best prepared for induction.",
              "Growth was followed by optical density at 600 nm until the culture reached roughly OD₆₀₀ 0.5 to 0.7. This window sets up the decision in the next stage, because inducing during exponential phase gives the highest yield of soluble protein.",
            ],
            callouts: [
              {
                kind: "outcome",
                text: "Exponential-phase cultures of each verified clone at OD₆₀₀ 0.5 to 0.7, ready for induction.",
              },
            ],
          },
        ],
        protocols: protocolLinks("transformation"),
      },
      {
        id: "induction-of-expression",
        tabLabel: "Induction",
        title: "Induction of expression",
        enzymes: ["DHAK", "PPK2"],
        body: [
          {
            paragraphs: [
              "The goal of this stage was to switch on production once enough biomass had accumulated. Expression is driven by the **T7 / lacUV5 system**. In BL21(DE3) the T7 RNA polymerase gene sits in the chromosome under a lac-derived promoter, while the enzyme gene sits on the plasmid under a T7 promoter. As long as the lac repressor is bound, neither is transcribed, so the cell spends the growth phase building biomass rather than making foreign protein.",
              "**IPTG** (isopropyl β-D-1-thiogalactopyranoside) is a non-hydrolysable analogue of allolactose. It binds and releases the lac repressor without being consumed, giving a stable, sustained induction. Releasing the repressor lets the cell transcribe the T7 RNA polymerase, which then transcribes the enzyme gene from the strong T7 promoter, so a small molecule triggers a large amount of protein.",
              "When the culture reached the target optical density, **IPTG** was added to a final concentration of about **0.4 mM**, and the culture was shifted to **30 °C** and incubated overnight with shaking at 140 rpm. The temperature was lowered deliberately, because slower expression at 30 °C gives the nascent protein more time to fold correctly, favouring soluble, active enzyme over misfolded protein trapped in inclusion bodies.",
            ],
            callouts: [
              {
                kind: "outcome",
                text: "Induced cultures expressing the enzyme, grown overnight at 30 °C and ready to harvest.",
              },
            ],
          },
        ],
        protocols: protocolLinks("induction"),
      },
      {
        id: "harvest-lysis-extract",
        tabLabel: "Obtaining CFE",
        title: "Harvest, lysis and crude extract",
        enzymes: ["DHAK", "PPK2"],
        body: [
          {
            paragraphs: [
              "The goal of this final stage was to break the cells open and recover a clarified soluble fraction, the cell-free extract (CFE), containing the expressed enzyme. This extract is the input for the downstream purification and activity work, so it is the endpoint of this page.",
            ],
          },
          {
            title: "Harvest",
            paragraphs: [
              "The induced cultures were transferred to pre-weighed 50 mL Falcon tubes and centrifuged at **6000 ×g, 10 °C, for 10 to 15 minutes**. The spent medium was discarded, the pellets were drained by inversion and weighed, and were then frozen at **−80 °C** until lysis. Freezing both stores the biomass conveniently and begins to weaken the cells, which assists the enzymatic lysis that follows.",
            ],
          },
          {
            title: "Enzymatic lysis",
            paragraphs: [
              <>
                The frozen pellets were resuspended in{" "}
                <strong>
                  50 mM potassium phosphate buffer (KH₂PO₄), pH 7.5
                </strong>
                , and lysed enzymatically. Three reagents were added to each
                resuspension. <strong>Lysozyme</strong> at a final concentration
                of 0.5 mg/mL digests the peptidoglycan cell wall.{" "}
                <strong>DNase I</strong> at 10 µg/mL degrades the genomic DNA
                that would otherwise make the lysate viscous and hard to handle.{" "}
                <strong>MgCl₂</strong> at 2 mM supplies the magnesium that DNase
                I needs as a cofactor. The suspension was agitated at room
                temperature, 140 rpm, for 30 minutes, after which it visibly
                cleared. This lysozyme-based approach follows the method used
                for this enzyme by Bastida et al. <Cite n={8} />.
              </>,
            ],
          },
          {
            title: "Clarification",
            paragraphs: [
              "The lysate was centrifuged (8500 rpm, 10 °C, 10 min) and the **supernatant was retained as the cell-free extract**. The soluble enzyme stays in the supernatant, while cell debris, membranes and any insoluble misfolded protein are discarded in the pellet.",
            ],
            callouts: [
              {
                kind: "not-done",
                text: "Some reference protocols for this enzyme add two further steps, mechanical disruption by sonication and removal of nucleic acids by streptomycin-sulfate precipitation. Neither was used here. The clarified extract came out clear and only slightly turbid, so the streptomycin-sulfate step to precipitate DNA fragments was judged unnecessary, and enzymatic lysis with lysozyme plus DNase gave a workable soluble extract without sonication. These steps are noted only so our procedure is not confused with the fuller protocols in the source material.",
              },
              {
                kind: "outcome",
                text: "A clarified crude extract containing soluble DHAK or PPK2, the input for the purification and activity stages that follow.",
              },
            ],
          },
        ],
        protocols: protocolLinks("harvesting", "crude-extract"),
      },
    ],
  },
  {
    id: "enzyme-purification",
    heading: "3. Enzyme purification",
    intro: [
      <>
        Measuring the activity of each enzyme required separating it from the
        hundreds of host proteins in the extract. Both constructs carry a
        hexahistidine tag, so{" "}
        <strong>immobilised metal affinity chromatography</strong> on{" "}
        <strong>Co²⁺-IDA-agarose</strong> was the natural first step, run by
        gravity flow in a disposable cartridge so that no pump or chromatography
        system is needed. The procedure is the same for both enzymes, but the
        buffers are not: DHAK is released from the resin by low concentrations
        of salt and imidazole, whereas PPK2 tolerates both, which allows a far
        more stringent wash. The eluates were then <strong>dialysed</strong> to
        remove the imidazole that would otherwise interfere with the activity
        assays. Two further stages were developed for DHAK alone, in response to
        problems with that enzyme: a{" "}
        <strong>microlitre-scale express IMAC</strong>, designed as a diagnostic
        to locate where activity was being lost without consuming sample, and a{" "}
        <strong>size-exclusion run</strong> on an FPLC system, adopted as a
        purification route independent of metal affinity.
      </>,
    ],
    experiments: [
      {
        id: "imac-purification",
        tabLabel: "IMAC",
        title: "Immobilised metal affinity chromatography (Co²⁺-IDA-agarose)",
        enzymes: ["DHAK", "PPK2"],
        body: [
          {
            paragraphs: [
              "The goal of this stage was to isolate each enzyme from the hundreds of host proteins present in the cell-free extract (CFE), so that its activity could be measured without interference. Both constructs carry a **C-terminal hexahistidine tag** encoded by the pET-28a(+) vector, which made **immobilised metal affinity chromatography (IMAC)** the natural first purification step. The histidine residues of the tag coordinate the metal ions immobilised on the resin, so the tagged enzyme is retained while most host proteins pass through. The enzyme is then released with a high concentration of free **imidazole**, which competes with the tag for the same metal sites.",
            ],
          },
          {
            title: "Choice of resin and format",
            paragraphs: [
              "We used **Co²⁺-IDA-agarose** rather than the more common Ni²⁺ resins. Cobalt binds histidine tags less strongly than nickel, but it is more selective: fewer host proteins with surface histidines bind to it, so a single step gives a cleaner eluate. Because the goal was to compare enzyme activities rather than to maximise yield, favouring purity over quantity suited the project.",
              "The purification was carried out by **gravity flow** in a small cartridge, with **batch binding**: the CFE and the resin were mixed and left in contact before the unbound fraction was drained. This gives the protein more time to bind than a simple flow-through and needs no pump or chromatography system, so any team can reproduce it at low cost.",
            ],
          },
          {
            title: "Buffer design for each enzyme",
            paragraphs: [
              "The column procedure was the same for both enzymes, but the buffers were not, because the two proteins tolerate salt and imidazole very differently. All buffers were based on **50 mM sodium phosphate, pH 8.0**, a pH at which the histidines of the tag are deprotonated and can coordinate Co²⁺.",
              <>
                <strong>DHAK.</strong> DHAK is very sensitive to salt and
                imidazole: even low concentrations start to release it from the
                resin <Cite n={2} />. Equilibration and washing were therefore
                done with <strong>phosphate buffer alone</strong>, with no NaCl
                or imidazole, so that the enzyme stayed bound throughout.
                Elution used the same buffer with <strong>1 M imidazole</strong>
                . The price of this mild wash is that some host proteins remain
                bound and co-elute. We accepted this in exchange for not losing
                the enzyme.
              </>,
              <>
                <strong>PPK2.</strong> PPK2 binds the resin firmly and tolerates
                salt and imidazole without being released <Cite n={3} />. Its
                equilibration and wash buffers therefore included{" "}
                <strong>150 mM NaCl and 30 mM imidazole</strong>: NaCl
                suppresses weak ionic interactions between host proteins and the
                resin, and the low imidazole concentration displaces host
                proteins that bind only weakly through surface histidines.
                Together they give a more stringent wash and a purer eluate. As
                for DHAK, elution used phosphate buffer with{" "}
                <strong>1 M imidazole</strong>.
              </>,
            ],
            pairedResource: {
              kind: "table",
              table: {
                caption:
                  "Imidazole and NaCl concentration in the IMAC buffers for DHAK and PPK2.",
                headers: [
                  "Buffer",
                  "DHAK · imidazole",
                  "DHAK · NaCl",
                  "PPK2 · imidazole",
                  "PPK2 · NaCl",
                ],
                rows: [
                  ["Equilibration", "0 mM", "0 mM", "30 mM", "150 mM"],
                  ["Wash", "0 mM", "0 mM", "30 mM", "150 mM"],
                  ["Elution", "1 M", "0 mM", "1 M", "0 mM"],
                ],
              },
            },
          },
          {
            title: "Experimental design and controls",
            paragraphs: [
              "A separate cartridge and fresh resin were used for each protein to avoid cross-contamination. Each run was internally controlled by keeping all of its fractions (Load, Flow-through, Wash and Eluate) and analysing them side by side by SDS-PAGE.",
              <em>
                SDS-PAGE separates the proteins of each fraction by molecular
                weight and shows the enzyme as a band at its expected size{" "}
                <Cite n={9} />.
              </em>,
              "This shows whether the enzyme bound the resin, whether any was lost during the wash, and how much the eluate was enriched compared with the starting CFE. The success of the purification was judged by **specific activity** (U/mg protein), which should rise after purification even though total activity always falls.",
              <em>
                The protein concentration of each sample was measured by the
                Bradford assay against a BSA standard curve <Cite n={10} />,
                which is what converts a measured activity into a specific
                activity.
              </em>,
            ],
            callouts: [
              {
                kind: "learn",
                text: "In our first purification the whole sample was lost because the outlet of the column was not closed before the CFE was loaded. The protocol now explicitly marks every point where the outlet must be capped. In another purification we added too much Elution Buffer, and the protein came out too diluted. Since then, the elution volume never exceeds the volume of sample loaded, so the eluate stays concentrated.",
              },
              {
                kind: "outcome",
                text: "An eluate enriched in His-tagged DHAK or PPK2, ready for dialysis.",
              },
            ],
          },
        ],
        protocols: protocolLinks("imac"),
      },
      {
        id: "dialysis-of-imac-eluates",
        tabLabel: "Dialysis",
        title: "Dialysis of IMAC eluates",
        enzymes: ["DHAK", "PPK2"],
        body: [
          {
            paragraphs: [
              <>
                The goal of this stage was to remove the imidazole and excess
                salt carried over from the IMAC eluate and to transfer each
                enzyme into a simple buffer compatible with its next use. This
                step is essential for our workflow. DHAK depends on{" "}
                <strong>Mg-ATP</strong> for its activity, and high
                concentrations of imidazole and salt interfere with its assay.
                PPK2 is used in a coupled assay with DHAK, so any imidazole left
                in its eluate would end up in the same reaction <Cite n={2} />.
              </>,
              "Dialysis was chosen because it is gentle, inexpensive and well suited to the millilitre volumes produced by our IMAC. The eluate is sealed in a semi-permeable membrane that retains the protein, while small molecules such as imidazole and NaCl diffuse out into a much larger volume of buffer until both sides reach equilibrium. It was carried out **overnight at 4 °C**, a temperature that protects the enzymes during the long exchange.",
            ],
          },
          {
            title: "Choice of dialysis buffer",
            paragraphs: [
              "The dialysis buffer only needs to keep the pH stable, so its exact concentration is not critical. We used a **low-concentration sodium phosphate buffer (5 mM)** by default. This keeps the option of **freeze-drying** the enzyme for later use: freeze-drying removes the water but concentrates every salt left in the sample, so the lower the salt content beforehand, the better the enzyme is preserved. Slightly more concentrated phosphate buffers are equally suitable when the sample goes directly to the activity assays.",
            ],
          },
          {
            title: "Concentrating the dialysed sample",
            paragraphs: [
              "Both enzymes were concentrated after dialysis by ultrafiltration in **Amicon Ultra centrifugal filters** (Merck Millipore), following the protocol supplied by the manufacturer. In each case the molecular weight cut-off was chosen well below the molecular weight of the enzyme, so that the protein is retained above the membrane while water and small molecules pass through. The reason for concentrating differed between the two enzymes.",
              <>
                <strong>DHAK.</strong> In one purification the elution volume
                exceeded the volume of CFE loaded, so the eluate came out
                diluted, and dialysis diluted it further as water entered the
                bag. The dialysed sample was therefore concentrated in an{" "}
                <strong>Amicon Ultra-15</strong> device with a{" "}
                <strong>30 kDa</strong> cut-off (cat. UFC9030), whose 15 mL
                capacity suits the volumes produced by the column{" "}
                <Cite n={11} />.
              </>,
              <>
                <strong>PPK2.</strong> Here the eluate was not unusually dilute;
                it was concentrated because we had little material and wanted to
                use as little of it as possible in each assay. Working with a
                concentrated sample means a smaller volume per reaction, so the
                same preparation lasts for more measurements. Since the volumes
                involved were much smaller, an <strong>Amicon Ultra-0.5</strong>{" "}
                device was used, with a <strong>10 kDa</strong> cut-off (cat.
                UFC5010), chosen because PPK2 is a much smaller protein than
                DHAK and a 30 kDa membrane would risk letting it through{" "}
                <Cite n={12} />.
              </>,
            ],
            callouts: [
              {
                kind: "learn",
                text: "The sample volume increased during dialysis, because water enters the bag when the eluate, rich in imidazole, has a higher solute concentration than the buffer. Leaving free space in the bag prevents it from bursting. A single bath may also not remove all the imidazole. Changing the buffer at least once removes much more imidazole than a single bath of the same total volume.",
              },
              {
                kind: "outcome",
                text: "Purified DHAK and PPK2 in low-concentration phosphate buffer, free of imidazole and ready for activity assays or freeze-drying.",
              },
            ],
          },
        ],
        protocols: protocolLinks("dialysis"),
      },
      {
        id: "express-imac",
        tabLabel: "Express IMAC",
        title:
          "Express immobilised metal affinity chromatography (Co²⁺-IDA-agarose)",
        enzymes: ["DHAK"],
        body: [
          {
            paragraphs: [
              "The goal of this stage was to find out, quickly and with very little material, whether the IMAC purification itself was working for DHAK. In earlier purifications the enzyme had lost activity, and we did not know where the problem lay: in expression, in binding to and recovery from the resin, or in the activity of the enzyme itself. Running the full column protocol again each time we changed a condition would have cost a lot of sample and time without isolating the cause. This small-scale test was therefore designed as a **diagnostic step**. It checks one link of the chain at a time, whether DHAK is present in the extract and whether it binds the Co²⁺-IDA resin and can be recovered from it, so that we could start ruling out possible causes and focus on the real one.",
            ],
          },
          {
            title: "Experimental design",
            paragraphs: [
              "The express protocol keeps the principle of IMAC but scales it down to **microlitre volumes in Eppendorf tubes**. A single batch of resin was washed and equilibrated, then split into separate tubes, each mixed with a small volume of a different CFE. This lets several constructs be tested in parallel under identical conditions.",
              "The key design choice is the elution. Instead of imidazole, the bound protein is released with **SDS-PAGE loading buffer and heat**, the same treatment used to prepare CFE samples for electrophoresis. This denatures the enzyme and detaches it from the resin, so the protocol is **analytical rather than preparative**: the sample can only be used for SDS-PAGE, not for activity assays. For the same reason a simple **phosphate buffer without NaCl or imidazole** was used, since detecting the enzyme mattered more here than obtaining a pure fraction.",
              "Each test is controlled by running the starting CFE (Load) on the same gel as the resin eluate. A band at the expected molecular weight of DHAK that is enriched in the eluate compared with the Load confirms that the construct expresses a His-tagged enzyme that binds the resin.",
            ],
            callouts: [
              {
                kind: "outcome",
                text: "A rapid, low-sample check of whether DHAK is present in the extract and is retained by and recovered from the Co²⁺-IDA resin. This tells us whether the loss of activity comes from the IMAC purification or from another step.",
              },
            ],
          },
        ],
        protocols: protocolLinks("imac-express"),
      },
      {
        id: "size-exclusion-fplc",
        tabLabel: "FPLC",
        title: "Size-exclusion chromatography (FPLC)",
        enzymes: ["DHAK"],
        body: [
          {
            paragraphs: [
              <>
                The goal of this stage was to purify DHAK from the cell-free
                extract by a route independent of metal affinity. Size-exclusion
                chromatography was adopted as an{" "}
                <strong>alternative purification method for DHAK</strong>, used
                instead of IMAC followed by dialysis rather than after it. The
                reasons for this change are described in{" "}
                <Link className="lab-wikilink" to="/engineering">
                  Engineering
                </Link>
                .
              </>,
              "**Size-exclusion chromatography (SEC)**, also called gel filtration, separates proteins by size rather than by affinity. Large aggregates elute first, DHAK elutes at its characteristic volume, and smaller proteins, nucleotides and other small molecules from the extract elute last. For DHAK this approach has two advantages: the enzyme is never exposed to metal ions or imidazole, and it elutes directly in the running buffer, so no dialysis is needed before the activity assays.",
              "The run was performed on an **ÄKTAprime plus FPLC system** with a preparative **HiLoad 26/60 Superdex 200 pg** column. Unlike the gravity-flow steps, FPLC pumps the buffer at a controlled flow rate and pressure and records the **UV absorbance at 280 nm** in real time. The DHAK peak can be followed as it leaves the column, so the fractions to keep are chosen from the chromatogram rather than blindly.",
            ],
          },
          {
            title: "Experimental design",
            paragraphs: [
              <>
                The separation was <strong>isocratic</strong>, with a single
                buffer of{" "}
                <strong>sodium phosphate with 150 mM NaCl, pH 7.2</strong> used
                throughout <Cite n={2} />. Here the salt does not interfere with
                DHAK as it did during binding to the IMAC resin. Its role is to
                prevent weak ionic interactions between the proteins and the
                column matrix, so that separation depends only on molecular
                size. The column was equilibrated overnight before each run, so
                that the baseline was stable and the peaks could be read
                clearly.
              </>,
              "The cell-free extract (CFE) was clarified by centrifugation before injection, to protect the column. The chromatogram served as the main control of each run. All fractions forming the DHAK peak were kept, so that no enzyme was lost, and they were matched to the fraction numbers recorded by the software before going on to the activity assays.",
            ],
            callouts: [
              {
                kind: "learn",
                text: "The ÄKTAprime always starts a run in pause mode, so a run that seems to have started may not be running at all. Releasing the pause after every start is now an explicit step in the protocol. Air trapped in the system causes a noisy baseline and pressure problems, so the system must be purged every time the mobile phase is connected or removed. We did it the day before the run, when connecting the buffer for the overnight equilibration.",
              },
              {
                kind: "outcome",
                text: "DHAK fractions separated from the cell-free extract by size, selected from the A₂₈₀ chromatogram and ready for the activity assays without dialysis.",
              },
            ],
          },
        ],
        protocols: protocolLinks("fplc"),
      },
    ],
  },
  {
    id: "activity-assay",
    heading: "4. Enzyme activity assay",
    intro: [
      <>
        The final block answers the question the whole module exists for: does
        the system work. DHAP has no useful absorbance of its own, so both
        assays measure it through the same{" "}
        <strong>coupled reporter reaction</strong>, in which α-glycerophosphate
        dehydrogenase reduces the DHAP formed while oxidising NADH, followed as
        a fall in absorbance at 340 nm and converted into an absolute amount of
        product through the NADH extinction coefficient. The first assay
        characterises <strong>DHAK on its own</strong>, in continuous format,
        giving a quantitative activity that can be compared across variants and
        across purification stages. The second combines{" "}
        <strong>both enzymes</strong> in a single long reaction with
        polyphosphate and a substoichiometric amount of adenine nucleotide,
        sampled over several hours and measured in endpoint format, to test
        whether ATP is genuinely being recycled rather than consumed.
      </>,
    ],
    experiments: [
      {
        id: "dhak-activity-assay",
        tabLabel: "DHAK activity",
        title: "DHAK activity, coupled α-GDH/TIM assay",
        enzymes: ["DHAK"],
        body: [
          {
            paragraphs: [
              "The goal of this stage was a quantitative measure of DHAK activity, so that the purified enzyme could be characterised and the different variants compared on the same scale.",
            ],
          },
          {
            title: "Why the activity is measured indirectly",
            paragraphs: [
              <>
                DHAK phosphorylates dihydroxyacetone (DHA) to DHAP using ATP,
                but <strong>DHAP has no useful absorbance of its own</strong>,
                so it cannot be followed directly. It is therefore measured
                through a coupled reporter reaction.{" "}
                <strong>α-glycerophosphate dehydrogenase (α-GDH)</strong>{" "}
                reduces the DHAP formed to glycerol-3-phosphate while oxidising
                NADH to NAD⁺, and{" "}
                <strong>triosephosphate isomerase (TIM)</strong> is included in
                the coupling mix. NADH absorbs at 340 nm and NAD⁺ does not, so
                the fall in absorbance at 340 nm tracks DHAP formation in real
                time, and its initial rate is proportional to DHAK activity{" "}
                <Cite n={2} />, <Cite n={5} />.
              </>,
              "Applying the NADH extinction coefficient (**ε₃₄₀ = 6220 M⁻¹cm⁻¹**) converts that rate into an absolute amount of DHAP. This is what makes the measurement an absolute one rather than a relative signal, so it stays comparable between instruments, between runs and between laboratories, which matters because the same assay is used to compare enzyme variants.",
            ],
          },
          {
            pairedResource: {
              kind: "image",
              src: `${IMG_DIR}/dhak-coupled-assay-scheme.png`,
              alt: "Reaction scheme: DHAK phosphorylates DHA to DHAP using ATP; TIM interconverts DHAP and D-GA3P; α-GDH reduces DHAP to α-glycerophosphate while oxidising NADH to NAD⁺",
              caption:
                "Reaction scheme of the coupled α-GDH/TIM assay: DHAK produces DHAP from DHA and ATP, and α-GDH reports it by oxidising NADH, which is followed at 340 nm.",
            },
          },
          {
            title: "Experimental design",
            paragraphs: [
              "The assay can be run either on the **CFE** or on **purified DHAK**, which lets the same measurement follow the enzyme through the purification. The reaction is assembled in the cuvette with everything except DHA: buffer, ATP, MgCl₂, NADH, the two coupling enzymes and the DHAK sample. The **coupling enzymes are supplied in excess**, so that the reporter reaction is never limiting and the measured rate reflects DHAK alone. The amount of DHAK added is **titrated** for each sample until the decrease in A₃₄₀ is clearly measurable but still linear for long enough to read an initial rate.",
              "The **control is the baseline itself**. Before DHA is added, A₃₄₀ is recorded with the complete mixture in place until the signal has stabilised. Any fall in absorbance during that window cannot come from DHAK, since its substrate is absent, and is instead due to NADH-consuming enzymes present in the sample or to spontaneous NADH degradation. This is more pronounced in cell-free extract than in purified enzyme. That baseline slope is subtracted from the slope measured after DHA addition, so that only the NADH oxidation attributable to DHAP formation is counted.",
              <>
                <strong>Modification of the reference protocol.</strong> The
                assay was run in{" "}
                <strong>potassium phosphate buffer at pH 7.5</strong>, whereas
                the reference assay uses Tris-HCl at pH 8.0 <Cite n={2} />.
                Phosphate at pH 7.5 was chosen to keep the assay consistent with
                the lysis and purification buffers, so that the enzyme is not
                exposed to a buffer change immediately before being measured.
                This deviation is recorded because it may affect the absolute
                values obtained, and should be taken into account when comparing
                them with published figures.
              </>,
            ],
            callouts: [
              {
                kind: "outcome",
                text: "A quantitative, absolute measurement of DHAK activity, applicable to every purified variant on the same scale.",
              },
            ],
          },
        ],
        protocols: protocolLinks("dhak-activity"),
      },
      {
        id: "coupled-dhak-ppk2-assay",
        tabLabel: "Coupled DHAK–PPK2 assay",
        title: "Coupled DHAK–PPK2 assay, ATP regeneration from polyphosphate",
        enzymes: ["DHAK", "PPK2"],
        body: [
          {
            paragraphs: [
              "The goal of this stage was the proof of concept of the whole system: showing that the two enzymes work together and that ATP can be **recycled** instead of consumed stoichiometrically.",
            ],
          },
          {
            title: "Why regeneration matters",
            paragraphs: [
              "As DHAK phosphorylates DHA to DHAP, it consumes ATP and generates ADP. **PPK2 uses polyphosphate as a phosphate donor** to convert that ADP back to ATP, returning it to DHAK to drive another round of phosphorylation. The reaction therefore runs on a small pool of adenine nucleotide that is recycled many times rather than spent once.",
              "This changes what limits the reaction. With regeneration, the total DHAP formed is set by the DHA and the polyphosphate supplied, not by the amount of ATP added, so far more DHAP can accumulate than the initial ATP could ever yield on its own. Clearing ADP as it forms also removes a second limitation, since ADP inhibits DHAK. This matters well beyond the bench: ATP is far too expensive to be added stoichiometrically in a real revalorisation process, whereas polyphosphate is cheap, which is what makes the system viable at scale.",
            ],
          },
          {
            title: "Experimental design and controls",
            paragraphs: [
              "The reaction contains DHA, polyphosphate, Mg²⁺, both enzymes and a **substoichiometric** amount of adenine nucleotide. Supplying less adenine nucleotide than the DHAP that can be formed is what makes the **experiment conclusive**: the result cannot be explained unless the nucleotide pool turns over more than once.",
              "The control is the **same reaction without PPK2**. With no way to regenerate ATP, DHAP formation stops once the initial ATP is spent, so comparing the two **isolates the contribution of the regeneration step from everything else in the mixture.**",
              "DHAP was tracked over the course of the reaction. Aliquots were taken at **0, 1, 3, 5 and 7 hours** and frozen immediately to stop the reaction, then measured by an **endpoint version** of the α-GDH/TIM assay described above: adding α-GDH and TIM gives a fall in absorbance at 340 nm proportional to the DHAP present, which the NADH extinction coefficient converts to µmol. The endpoint format is used here because the reaction runs for hours rather than minutes, so it cannot be followed continuously in a cuvette.",
              "The decisive read-out is the **DHAP formed relative to the ATP supplied at the start**. A value above one means that each adenine nucleotide molecule has been turned over more than once, which is the proof of concept that the multienzymatic system works.",
            ],
            callouts: [
              {
                kind: "outcome",
                text: "A time course of DHAP formation with and without PPK2, and the DHAP-to-ATP ratio that shows whether the adenine nucleotide pool is being recycled.",
              },
            ],
          },
        ],
        protocols: protocolLinks("coupled-assay"),
      },
    ],
    // The page-closing "Conclusion" of the source, which belongs to the
    // whole block rather than to the activity assays — it renders here, at
    // the foot of the last sub-block, immediately above the block's own
    // reference list.
    outro: [
      <>
        <strong>Conclusion.</strong> Taken together, the four blocks are both{" "}
        <strong>necessary and sufficient</strong> for the objective of this
        module. None of them produces a result on its own: a stabilised design
        is only a sequence until it is expressed, an expressed enzyme is
        unmeasurable among hundreds of host proteins, and a purified enzyme
        means nothing until its activity is quantified. Equally, each block
        stops where the next begins. We ordered the genes already cloned into an
        expression vector, skipped the intermediate cloning strain, used a
        single affinity step rather than a full purification train, and did not
        characterise the enzymes beyond what the system required. The goal was a{" "}
        <strong>functional demonstration</strong>, not a complete enzymological
        description.
      </>,
      <>
        The choices also reflect the resources of a student team in a shared
        laboratory. Stabilisation was pursued <strong>computationally</strong>{" "}
        rather than by screening mutants, the purification was designed to run{" "}
        <strong>by gravity flow</strong> with no pump or chromatography system,
        and when the full purification began consuming sample without telling us
        where the problem was, we built a{" "}
        <strong>microlitre-scale diagnostic version</strong> of it instead of
        repeating the whole procedure.
      </>,
      <>
        Each stage carries its own control, and that is what makes the set
        interpretable: the wild-type enzyme controls its stabilised design,
        every purification keeps and analyses all of its fractions, and
        activities are converted to absolute units so that measurements made on
        different days remain comparable. The four blocks then converge in the{" "}
        <strong>coupled DHAK–PPK2 assay</strong>, the only experiment that tests
        the module as a whole, where DHAP formation is followed against the same
        reaction without PPK2 to show whether ATP is genuinely recycled rather
        than consumed.
      </>,
      <>
        What we deliberately left undone is also part of the design. The{" "}
        <strong>SpyTag/SpyCatcher complex</strong> was designed but not built,
        and the <strong>bead-derived polyphosphate</strong> was replaced by a
        commercial equivalent so that the biochemistry could be characterised
        independently of the upstream hardware. In both cases the limit is
        stated, the reasoning is documented, and the work is left in a state
        where another team can take it up.
      </>,
    ],
  },
];
