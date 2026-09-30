import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ExperimentSubBlock } from "../../components/LabFolders/types";

/**
 * Real content for the "Revalorisation" Experiments block — transcribed
 * from the team's own write-up (Notion, "WIKI / Experiments /
 * Revalorisation").
 *
 * Content decisions (no wording invented, only adapted to what this
 * component family can render, following the precedents already set in
 * GeneticEngineeringData.tsx / EnzymaticImmobilisationData.tsx):
 * - The grey "Intro del bloque / Esquema del bloque / …" callout and the
 *   "Poner por apartados" line are the team's internal drafting notes, not
 *   page content, and are not reproduced.
 * - "Sub-block 1: Cloning and expresion" / "Sub-block 3: Activity assay"
 *   become "1. Cloning and expression" / "2. Activity assay", matching the
 *   "1./2." scheme of the other blocks (the source has no sub-block 2).
 * - Each stage's own "· DHAK only" / "· Shared" / "· DHAK" tag is kept in
 *   the card title, exactly as written after the stage name.
 * - The source's figures are not yet uploaded to the wiki, so each one is
 *   an `image-placeholder` carrying the source's own caption. One figure in
 *   the DHAK activity assay has no caption in the source; its placeholder
 *   carries none either.
 * - Every "PROTOCOL: SCIENCE>BLOQUES>…" line is replaced by a real
 *   `protocols` download link named after the protocol the source cites
 *   (placeholder PDF paths, as in the other blocks).
 * - The two references at the end of sub-block 1 become the block-level
 *   reference list, rendered once at the end of the page.
 */

const PROTOCOL: Record<string, { label: string; href: string }> = {
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
};
function protocolLinks(...names: string[]) {
  return names.map((n) => PROTOCOL[n]);
}

export const REVALORISATION_INTRO: ReactNode[] = [
  <>
    This block is the <strong>conversion module</strong> of RePhlow's
    multi-enzymatic system for{" "}
    <strong>turning waste into high-value products</strong> (see{" "}
    <Link className="lab-wikilink" to="/project-description">
      Project Description
    </Link>
    ). In the complete design, the phosphate stored inside the{" "}
    <em>Pseudomonas putida</em> beads is released by{" "}
    <strong>lysing the recovered beads</strong>, giving a concentrated stock of{" "}
    <strong>inorganic polyphosphate</strong> that acts as the phosphate donor
    for this module. For the experiments we{" "}
    <strong>decoupled the block from bead recovery</strong>, which depends on
    the upstream hardware, and used <strong>commercial polyphosphate</strong> as
    the donor instead. This isolates the biochemistry of the conversion so it
    can be characterised on its own terms; substituting bead-derived polyP is a{" "}
    <strong>later integration step</strong>.
  </>,
  <>
    The module couples two enzymes. <strong>PPK2</strong> draws energy from
    polyphosphate, <strong>regenerating ATP</strong> from a small recycled
    nucleotide pool instead of a costly stoichiometric supply of cofactor, and{" "}
    <strong>clearing ADP</strong> as it forms so the reaction is pushed toward
    product. We use a <strong>bifunctional BcPPK2-III</strong> from{" "}
    <em>Burkholderia cenocepacia</em>, which carries AMP through to ATP in a{" "}
    <strong>single enzyme</strong> and stays active across{" "}
    <strong>pH 6 to 9</strong>, the range a scalable cascade needs.
  </>,
  <>
    <strong>DHAK</strong> (dihydroxyacetone kinase from{" "}
    <em>Citrobacter freundii</em>) phosphorylates dihydroxyacetone to{" "}
    <strong>dihydroxyacetone phosphate (DHAP)</strong>, an unstable and
    expensive building block for DHAP-dependent aldolases used to make{" "}
    <strong>rare sugars and iminosugars</strong>. Because DHAK is{" "}
    <strong>inhibited by ADP</strong>, PPK2 both supplies its ATP and relieves
    that inhibition. DHAK was additionally{" "}
    <strong>stabilised in silico with PROSS</strong> before expression.
  </>,
  <>
    This page covers the <strong>production of both enzymes</strong>, from gene
    to clarified cell lysate. Almost every wet-lab step is{" "}
    <strong>shared</strong>; the only enzyme-specific stage is the{" "}
    <strong>computational redesign</strong>, carried out for DHAK alone. The
    coupled-system results are reported in{" "}
    <Link className="lab-wikilink" to="/results">
      Results
    </Link>
    , and full volumes, times and concentrations are given in the{" "}
    <strong>accompanying protocol PDF</strong>.
  </>,
];

export const REVALORISATION_REFERENCES: string[] = [
  "Bastida A, Fernandez‐Mayoralas A, Arrayas RG, Iradier F, Carretero JC, Garcia‐Junceda E. ChemInform Abstract: Heterologous Over‐Expression of α‐1,6‐Fucosyltransferase from Rhizobium sp.: Application to the Synthesis of the Trisaccharide β‐D‐GlcNAc(1→4)‐[α‐L‐Fuc‐(1→6)]‐D‐GlcNAc, Study of the Acceptor Specificity and Evaluation of Polyhydroxylated Indolizidines as Inhibitors. ChemInform [Internet]. 12 de febrero de 2002;33(6). Disponible en: https://doi.org/10.1002/chin.200206232",
  "Sambrook J, Fritsch E, Maniatis T. Molecular Cloning: a Laboratory manual. UCLA - Biblioteca de Ciencias de la Salud [Internet]. 1 de enero de 1989; Disponible en: http://bibmed.ucla.edu.ve/cgi-win/be_alex.exe?Acceso=T070000058197/0&Nombrebd=bmucla",
];

export const REVALORISATION_SUBBLOCKS: ExperimentSubBlock[] = [
  {
    id: "cloning-and-expression",
    heading: "1. Cloning and expression",
    experiments: [
      {
        id: "dhak-in-silico-stabilisation",
        tabLabel: "In silico stabilisation",
        title: "In silico stabilisation of DHAK · DHAK only",
        body: [
          {
            paragraphs: [
              <>
                The goal of this stage was a{" "}
                <strong>
                  DHAK variant with improved thermodynamic stability
                </strong>{" "}
                that keeps its catalytic function intact, so the enzyme
                tolerates the handling, storage and reaction conditions of a
                revalorisation process better than the wild type. Stabilisation
                was pursued{" "}
                <strong>computationally before any bench work</strong>. PPK2 was
                expressed as its native sequence and did not go through this
                stage.
              </>,
            ],
          },
          {
            paragraphs: [
              <>
                The design started from the{" "}
                <strong>
                  crystal structure of DHAK from <em>C. freundii</em> in complex
                  with its ligands, PDB entry 1UN9
                </strong>
                . The complexed structure was used on purpose, because it lets
                the algorithm recognise where the functional residues sit and
                avoid mutating them. DHAK is a <strong>homodimer</strong> built
                from two domains, the <strong>K-domain</strong> that carries the
                dihydroxyacetone site and the <strong>L-domain</strong> that
                carries the ATP site; in the dimer the K-domain of one subunit
                faces the L-domain of the other, forming two composite active
                sites. Three ligands mark the regions that must not be altered,
                the <strong>ATP analogue (AMP-PNP)</strong>,{" "}
                <strong>dihydroxyacetone (DHA)</strong> and the{" "}
                <strong>Mg²⁺ ion</strong>. Residues within roughly{" "}
                <strong>4 Å</strong> of any ligand were identified in PyMOL and
                flagged as <strong>protected</strong>, so stabilising mutations
                are excluded from the catalytic and cofactor-binding shells.
              </>,
            ],
            pairedResource: {
              kind: "image-placeholder",
              caption:
                "DHAK homodimer (PDB 1UN9), K- and L-domains and the ATP, DHA and Mg²⁺ ligands.",
            },
          },
          {
            pairedResource: {
              kind: "image-placeholder",
              caption:
                "Protected residues within 4 Å of the ligands, mapped on the structure",
            },
          },
          {
            paragraphs: [
              <>
                The <strong>PROSS server</strong> takes the sequence and the PDB
                structure and returns a small set of stabilised designs,
                combining <strong>phylogenetic sequence information</strong>{" "}
                with <strong>Rosetta energy calculations</strong> to lower the
                free energy of the fold while conserving function. The protected
                ligands were declared explicitly by abbreviation, position and
                chain, using the same chain for all three, so the server keeps
                the active site untouched while it stabilises the rest of the
                protein. From the designs returned,{" "}
                <strong>PROSS design number 5</strong> was selected for
                experimental testing, alongside the{" "}
                <strong>wild-type enzyme</strong> as a reference. The wild type
                was kept unchanged so that any difference in stability or
                activity can be attributed to the introduced mutations.
              </>,
            ],
            pairedResource: {
              kind: "image-placeholder",
              caption:
                "Mutated positions of PROSS design 5 relative to wild-type DHAK",
            },
          },
          {
            paragraphs: [
              <>
                <strong>LEARN</strong> The PROSS server was{" "}
                <strong>unavailable on the first attempt</strong> and the
                submission had to be repeated, which is why the selected design
                comes from the second run. This is recorded so a future team
                allows for server downtime when planning this step.
              </>,
              <>
                <strong>OUTCOME</strong> One concrete stabilised variant (
                <strong>PROSS 5</strong>) and the wild-type reference, taken
                forward for expression.
              </>,
            ],
          },
        ],
      },
      {
        id: "gene-acquisition-transformation",
        tabLabel: "Transformation",
        title: "Gene acquisition and bacteria transformation · Shared",
        description: [
          <>
            The goal of this stage was a strain of the{" "}
            <strong>expression</strong> host carrying the{" "}
            <strong>gene of interest</strong> on an inducible plasmid. Rather
            than assembling the construct by restriction and ligation, the
            coding sequence was ordered as a{" "}
            <strong>
              synthetic gene already cloned into an expression vector
            </strong>{" "}
            and introduced directly into the expression host. This trades
            in-house cloning flexibility for speed and sequence certainty, which
            suited a block focused on producing and characterising the protein
            rather than on building the plasmid.
          </>,
          <strong>Vector and host</strong>,
          <>
            The gene was supplied,{" "}
            <strong>
              codon-optimised for <em>E. coli</em>
            </strong>
            , in a <strong>pET-28a(+) expression vector</strong> and expressed
            in{" "}
            <strong>
              <em>E. coli</em> BL21(DE3)
            </strong>{" "}
            (Thermo Scientific, cat. EC0114). The pET-28a(+) backbone was
            appropriate for three reasons that matter downstream. It places the
            gene under a <strong>T7 promoter</strong>, giving strong, tightly
            controlled expression in a DE3 host. It confers{" "}
            <strong>kanamycin resistance</strong>, the selection marker used
            throughout this block. And it fuses a{" "}
            <strong>C-terminal hexahistidine tag</strong> to the protein, which
            enables the later immobilised-metal affinity purification without
            further engineering. BL21(DE3) was chosen because it is{" "}
            <strong>protease-deficient</strong> and carries the{" "}
            <strong>T7 RNA polymerase gene under lacUV5 control</strong>, so the
            plasmid's T7 promoter is only transcribed once the polymerase is
            induced.
          </>,
          <>
            Because the construct was ready for expression, the usual
            intermediate of amplifying and verifying the plasmid in a cloning
            strain such as DH5α was <strong>deliberately skipped</strong> to
            save time. The synthetic gene was diluted to about{" "}
            <strong>50 ng/µL</strong> in nuclease-free water and transformed
            into chemically competent BL21(DE3) by <strong>heat shock</strong>,
            following the strain manufacturer's protocol. The term used here is{" "}
            <strong>transformation</strong>, the uptake of naked plasmid DNA by
            an artificially competent bacterial cell.
          </>,
          <>
            <strong>DHAK CONSTRUCTS · DHAK ONLY</strong> Two versions were
            transformed in parallel, the <strong>wild-type enzyme</strong>{" "}
            (reference, expressed as received) and the{" "}
            <strong>stabilised PROSS 5 variant</strong>, so a direct
            wild-type-versus-variant comparison of stability and activity is
            possible.
          </>,
          <>
            <strong>PPK2 CONSTRUCT · PPK2 ONLY</strong> The bifunctional{" "}
            <strong>BcPPK2-III</strong> was transformed and expressed as its{" "}
            <strong>native sequence</strong>, with no computational redesign,
            and handled through the same shared pipeline as DHAK from this point
            on.
          </>,
          <>
            <strong>LEARN</strong> An earlier attempt using a set of
            pre-existing strains <strong>failed for DHAK</strong>, because those
            cells carried a resistance marker other than kanamycin and did not
            survive kanamycin selection. The response was to re-order the gene
            as a fresh synthetic construct with a known kanamycin-resistant
            vector and transform it directly into BL21(DE3). This is why the
            block relies on ordered constructs with a verified marker rather
            than on the original strains.
          </>,
          <>
            <strong>OUTCOME</strong> BL21(DE3) transformed with the pET-28a(+)
            construct, ready to be plated under kanamycin selection.
          </>,
        ],
        protocols: protocolLinks("transformation"),
      },
      {
        id: "selection-growth",
        tabLabel: "Selection & growth",
        title: "Selection and growth of transformants · Shared",
        description: [
          "The goal of this stage was to obtain isolated, verified colonies of each construct and grow them to the point of induction. The transformation mixture was plated on LB agar containing kanamycin and incubated overnight at 37 °C. Only cells that took up the plasmid, and therefore express the resistance gene, form colonies, so the plate itself is the first selection.",
          "Individual colonies were picked into LB with kanamycin (50 µg/mL) and grown overnight at 37 °C as pre-inocula. Two colonies were picked per construct, so a second independent clone is available in case one carries an unwanted mutation. Each pre-inoculum was then diluted roughly fiftyfold into a larger volume of LB with kanamycin (for example 1 mL into 50 mL) and grown at 37 °C with shaking at 180 rpm. Diluting into fresh medium returns the cells to exponential growth, the state in which they are most transcriptionally and translationally active and therefore best prepared for induction.",
          "Growth was followed by optical density at 600 nm until the culture reached roughly OD₆₀₀ 0.5 to 0.7. This window sets up the decision in the next stage, because inducing during exponential phase gives the highest yield of soluble protein.",
          <>
            <strong>OUTCOME</strong> Exponential-phase cultures of each verified
            clone at OD₆₀₀ 0.5 to 0.7, ready for induction.
          </>,
        ],
        protocols: protocolLinks("transformation"),
      },
      {
        id: "induction-of-expression",
        tabLabel: "Induction",
        title: "Induction of expression · Shared",
        description: [
          <>
            The goal of this stage was to switch on production once enough
            biomass had accumulated. Expression is driven by the{" "}
            <strong>T7 / lacUV5 system</strong>. In BL21(DE3) the T7 RNA
            polymerase gene sits in the chromosome under a lac-derived promoter,
            while the enzyme gene sits on the plasmid under a T7 promoter. As
            long as the lac repressor is bound, neither is transcribed, so the
            cell spends the growth phase building biomass rather than making
            foreign protein.
          </>,
          <>
            <strong>IPTG</strong> (isopropyl β-D-1-thiogalactopyranoside) is a
            non-hydrolysable analogue of allolactose. It binds and releases the
            lac repressor without being consumed, giving a stable, sustained
            induction. Releasing the repressor lets the cell transcribe the T7
            RNA polymerase, which then transcribes the enzyme gene from the
            strong T7 promoter, so a small molecule triggers a large amount of
            protein.
          </>,
          <>
            When the culture reached the target optical density, IPTG was added
            to a final concentration of about <strong>0,4 mM</strong>, and the
            culture was shifted to <strong>30 °C</strong> and incubated
            overnight with shaking at 140 rpm. The temperature was lowered
            deliberately, because slower expression at 30 °C gives the nascent
            protein more time to fold correctly, favouring soluble, active
            enzyme over misfolded protein trapped in inclusion bodies.
          </>,
          <>
            <strong>OUTCOME</strong> Induced cultures expressing the enzyme,
            grown overnight at 30 °C and ready to harvest.
          </>,
        ],
        protocols: protocolLinks("induction"),
      },
      {
        id: "harvest-lysis-extract",
        tabLabel: "Harvest & lysis",
        title: "Harvest, lysis and crude extract · Shared",
        description: [
          "The goal of this final stage was to break the cells open and recover a clarified soluble fraction, the cell-free extract (CFE), containing the expressed enzyme. This extract is the input for the downstream purification and activity work, so it is the endpoint of this page.",
          <strong>Harvest</strong>,
          <>
            The induced cultures were transferred to pre-weighed 50 mL Falcon
            tubes and centrifuged at{" "}
            <strong>6000 ×g, 10 °C, for 10 to 15 minutes</strong>. The spent
            medium was discarded, the pellets were drained by inversion and
            weighed, and were then frozen at <strong>−80 °C</strong> until
            lysis. Freezing both stores the biomass conveniently and begins to
            weaken the cells, which assists the enzymatic lysis that follows.
          </>,
          <strong>Enzymatic lysis</strong>,
          <>
            The frozen pellets were resuspended in{" "}
            <strong>50 mM potassium phosphate buffer (KH₂PO₄), pH 7.5</strong>,
            and lysed enzymatically. Three reagents were added to each
            resuspension. <strong>Lysozyme</strong> at a final concentration of
            0.5 mg/mL digests the peptidoglycan cell wall.{" "}
            <strong>DNase I</strong> at 10 µg/mL degrades the genomic DNA that
            would otherwise make the lysate viscous and hard to handle.{" "}
            <strong>MgCl₂</strong> at 2 mM supplies the magnesium that DNase I
            needs as a cofactor. The suspension was agitated at room
            temperature, 140 rpm, for 30 minutes, after which it visibly
            cleared. This lysozyme-based approach follows the method used for
            this enzyme by Bastida et al. (2001).
          </>,
          <strong>Clarification</strong>,
          <>
            The lysate was centrifuged (8500 rpm, 10 °C, 10 min) and the{" "}
            <strong>supernatant was retained as the cell-free extract</strong>.
            The soluble enzyme stays in the supernatant, while cell debris,
            membranes and any insoluble misfolded protein are discarded in the
            pellet.
          </>,
          <>
            <strong>WHAT WE DID NOT DO</strong> Some reference protocols for
            this enzyme add two further steps, mechanical disruption by
            sonication and removal of nucleic acids by streptomycin-sulfate
            precipitation. Neither was used here. The clarified extract came out
            clear and only slightly turbid, so the streptomycin-sulfate step to
            precipitate DNA fragments was judged unnecessary, and enzymatic
            lysis with lysozyme plus DNase gave a workable soluble extract
            without sonication. These steps are noted only so our procedure is
            not confused with the fuller protocols in the source material.
          </>,
          <>
            <strong>OUTCOME</strong> A clarified crude extract containing
            soluble DHAK or PPK2, the input for the purification and activity
            stages that follow.
          </>,
        ],
        protocols: protocolLinks("harvesting", "crude-extract"),
      },
    ],
  },
  {
    id: "activity-assay",
    heading: "2. Activity assay",
    experiments: [
      {
        id: "dhak-activity-assay",
        tabLabel: "DHAK activity",
        title: "DHAK activity, coupled α-GDH/TIM assay · DHAK",
        body: [
          {
            paragraphs: [
              <>
                <strong>DHAK</strong> phosphorylates{" "}
                <strong>dihydroxyacetone (DHA)</strong> to <strong>DHAP</strong>{" "}
                using <strong>ATP</strong>. DHAP has no useful absorbance of its
                own, so it is measured through a{" "}
                <strong>coupled reporter reaction</strong>.{" "}
                <strong>α-glycerophosphate dehydrogenase (α-GDH)</strong>{" "}
                reduces the DHAP formed to <strong>glycerol-3-phosphate</strong>{" "}
                while oxidising <strong>NADH to NAD+</strong>, and{" "}
                <strong>triosephosphate isomerase (TIM)</strong> is included in
                the coupling mix. NADH absorbs at <strong>340 nm</strong> and
                NAD+ does not, so the{" "}
                <strong>fall in absorbance at 340 nm</strong> tracks DHAP
                formation in real time and its{" "}
                <strong>initial rate is proportional to DHAK activity</strong>.
                Applying the <strong>NADH extinction coefficient</strong>
                (ε340=6220 M−1 cm−1) converts that rate into an{" "}
                <strong>absolute amount of DHAP</strong>, which keeps the
                measurement comparable between instruments and laboratories.
              </>,
            ],
          },
          {
            paragraphs: [
              <>
                The <strong>DHAK source</strong> was the{" "}
                <strong>crude extract</strong> from the previous stage, assayed
                as a dilution so the slope is measurable but not too steep. The
                reaction contained <strong>DHA, ATP, MgCl2 and NADH</strong>{" "}
                together with the{" "}
                <strong>α-GDH and TIM coupling enzymes</strong>, in{" "}
                <strong>50 mM potassium phosphate buffer at pH 7.5</strong>, and{" "}
                <strong>A340</strong> was followed over time in a{" "}
                <strong>microplate reader</strong>. This buffer differs from the{" "}
                <strong>Tris-HCl pH 8.0</strong> of the reference thesis assay;
                phosphate at pH 7.5 was kept consistent with the{" "}
                <strong>lysis buffer</strong>. <strong>One unit (U)</strong> of
                kinase activity is defined as the amount of enzyme that produces{" "}
                <strong>1 µmol of DHAP per minute</strong> under these
                conditions, and <strong>specific activity</strong> is expressed{" "}
                <strong>per mg of total protein</strong>.
              </>,
            ],
            pairedResource: { kind: "image-placeholder", caption: "" },
          },
        ],
      },
      {
        id: "coupled-dhak-ppk2-assay",
        tabLabel: "Coupled DHAK–PPK2",
        title:
          "Coupled DHAK–PPK2 assay, ATP regeneration from polyphosphate · Shared",
        description: [
          <>
            This assay tests the module as it is meant to work. As{" "}
            <strong>DHAK</strong> phosphorylates <strong>DHA to DHAP</strong>,
            it consumes <strong>ATP</strong> and leaves <strong>ADP</strong>{" "}
            behind. <strong>PPK2</strong> uses <strong>polyphosphate</strong> as
            a phosphate donor to convert that ADP back to ATP, and the{" "}
            <strong>regenerated ATP</strong> returns to DHAK to drive another
            round of phosphorylation. The reaction therefore runs on a{" "}
            <strong>small pool of adenine nucleotide</strong> that is{" "}
            <strong>recycled many times</strong> rather than spent once. This is
            the point of the experiment. With regeneration, the total DHAP
            formed is set by the DHA and polyphosphate supplied, not by the
            small amount of ATP added at the start, so far more DHAP accumulates
            than that initial ATP could ever yield on its own. Clearing ADP as
            it forms also <strong>relieves the ADP inhibition</strong> of DHAK.
          </>,
          <>
            The reaction contained <strong>DHA</strong>, a small{" "}
            <strong>substoichiometric amount of adenine nucleotide</strong>,{" "}
            <strong>polyphosphate</strong> as the phosphate donor,{" "}
            <strong>MgCl2</strong>, and <strong>both enzymes</strong>. A{" "}
            <strong>control without PPK2, or without polyphosphate</strong>, was
            run in parallel; with no way to regenerate ATP, DHAP formation there
            stops once the initial ATP is spent. This comparison{" "}
            <strong>isolates the contribution of the regeneration step</strong>.
            The <strong>two-step DHAK plus acetate-kinase route</strong> of the
            reference thesis, which regenerates ATP from acetyl phosphate, is
            the prior approach that PPK2 with polyphosphate replaces here, so
            its conditions were used only as background.
          </>,
          <>
            DHAP was followed over the course of the reaction. Aliquots were
            taken at <strong>0, 1, 3, 5 and 7 hours</strong> and frozen
            immediately to stop the reaction, and the DHAP in each thawed
            aliquot was then measured by an{" "}
            <strong>endpoint version of the α-GDH/TIM assay</strong>. In a
            cuvette with NADH, adding α-GDH/TIM gives a{" "}
            <strong>fall in absorbance at 340 nm</strong> proportional to the
            DHAP present, which the <strong>NADH extinction coefficient</strong>{" "}
            converts to µmol. The <strong>decisive read-out</strong> is the{" "}
            <strong>DHAP formed relative to the ATP supplied</strong> at the
            start. A <strong>value above one</strong> means each ATP molecule
            has been <strong>turned over more than once</strong>, and a clear
            separation from the <strong>no-PPK2 control</strong> confirms that
            the <strong>polyphosphate-driven regeneration</strong> is doing the
            work.
          </>,
        ],
      },
    ],
  },
];
