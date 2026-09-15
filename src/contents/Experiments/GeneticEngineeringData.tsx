import type { ReactNode } from "react";
import type { ExperimentSubBlock } from "../../components/LabFolders/types";

/** An inline "[n]" citation. `scope` is whichever reference list actually
 * lists that number — an experiment's own id when the citation sits
 * inside that experiment's write-up (its own per-experiment list, shown in
 * that experiment's card footer), or this block's own id
 * ("genetic-engineering") when it sits in a sub-block's intro instead —
 * those don't get their own per-sub-block list any more, they're collected
 * into the one shared, block-level reference section at the end (see
 * GENETIC_ENGINEERING_REFERENCES and ExperimentBlockData.references),
 * exactly like Enzymatic immobilisation's. Matches the `ref-<scope>-<n>`
 * id ExperimentCard's ReferenceItem gives each reference-list entry.
 * Coloured via .lab-citation, i.e. this block's own --folder-accent. */
function Cite({ scope, n }: { scope: string; n: number }) {
  return (
    <a href={`#ref-${scope}-${n}`} className="lab-citation">
      [{n}]
    </a>
  );
}

/**
 * Real content for the "Genetic engineering" Experiments block —
 * transcribed from the team's own write-up (Notion export,
 * Experiments-Genetic-Engineering/Genetic engineering ....html).
 *
 * The source is organised differently from Alginate encapsulation: an
 * intro, a conceptual "The five parts of the system" section (5 toggles —
 * PPK1, PstSCAB, Ppx, PpkB, PitB — see GENE_PARTS below, rendered by the
 * bespoke GeneSystemGrid component rather than as folders, since none of
 * them are experiments), then two numbered workflows ("Sub-block1:
 * Cloning", "Sub-block 2: Knocking-out") and a closing synthesis section.
 * Reproduced here as three ExperimentSubBlock entries — "1. Cloning" and
 * "2. Knocking-out" (their own numbering: the source calls them "Sub-block
 * 1"/"Sub-block 2" but never numbers a third, so the "1./2./3." scheme
 * here is ours, purely organisational, matching Alginate encapsulation's
 * presentation) each with 9 real experiment steps, and "3. Closing: from
 * two modules to the RePhlow chassis" as a sub-block with no experiments
 * of its own (prose only — see ExperimentSubBlock.experiments being
 * optional).
 *
 * This file is .tsx (not .ts) because the source's own bold/italic
 * emphasis is reproduced as real <strong>/<em> JSX — every inline
 * emphasis run in the Notion export was checked against the raw HTML
 * (not just its rendered text) so nesting and, especially, the
 * whitespace immediately after a closing tag is preserved exactly as
 * written (e.g. "codon-optimised for <em>P. putida</em> KT2440" keeps its
 * two real spaces, not a run-together "P. putidaKT2440").
 *
 * Content decisions (no wording invented, only adapted to what this
 * component family can render — matching the precedents already set in
 * EncapsulationData.ts):
 * - The intro's two bullet points ("Add phosphate-uptake…" / "Remove the
 *   native pathways…") are rewritten as flowing prose, since block/intro
 *   text here is plain paragraphs with no bullet-list support.
 * - The source's own explanatory schematic (the green-adds/red-removes
 *   diagram) is not embedded as an image — its content is fully carried by
 *   GeneSystemGrid's own colour-coded ADD/REMOVE layout instead, so
 *   nothing it showed is lost, just re-expressed as the interactive
 *   design requested for this section.
 * - Each toggle's "GIF (storyboard)" field describes a hypothetical
 *   explanatory animation the team hasn't produced — kept as a clearly
 *   labelled text description in GeneSystemGrid, not as a real media
 *   placeholder, since no such asset exists yet.
 * - The base-editing-guide step's "This was achieved by using
 *   :::::::::::::::::::::::::::: tool" is the source's own redacted
 *   placeholder (a tool name the team hasn't filled in yet) — kept as an
 *   honest "not yet specified" sentence rather than inventing a tool name
 *   or silently dropping the sentence.
 * - Each step's trailing "The expected outcome was …" line is folded into
 *   the write-up as a trailing paragraph (never `ExperimentData.notes`) —
 *   it's a narrative continuation of the write-up, not an aside, exactly
 *   the fix already applied throughout EncapsulationData.ts.
 * - Each step's trailing "Protocols: A; B; C." line is removed from the
 *   write-up entirely and turned into a real `protocols` array instead
 *   (see the shared PROTOCOL lookup below) — a plain-text mention of a
 *   named protocol isn't something a reader can act on, but a download
 *   link is. The one exception is the Closing sub-block's own
 *   "Protocols: …" line, which stays as plain text: Closing has no
 *   experiments of its own (see ExperimentSubBlock.experiments being
 *   optional), so there's no card to attach the links to.
 * - Inline "[n]" citation markers are only turned into real `references`
 *   entries at the step level, where ExperimentData actually has a place
 *   to show them; the two sub-block intros also carry citations in the
 *   source but there's no per-intro reference slot in this component
 *   family, so those bracket numbers are kept as plain text rather than
 *   invented into a dangling link.
 * - Two steps reference a table the source itself marks as not yet made
 *   ("[Tabla secuencias]", "[Tabla enzimas con tiempos y buffers]"). Both
 *   use `body` (see ExperimentData.body in types.ts) so the one paragraph
 *   that actually describes what the table would contain sits beside a
 *   clearly-labelled table placeholder — the same visual treatment
 *   already used for a missing figure in Enzymatic immobilisation and
 *   Revalorisation — while the rest of the step's write-up stays
 *   full-width instead of being pinned into a fixed two-column card.
 */

export const GENETIC_ENGINEERING_INTRO: ReactNode[] = [
  <>
    Phosphorus is at once a finite, critical resource (fertilisers, with no chemical substitute) and a key
    wastewater pollutant that drives eutrophication. <strong>RePhlow</strong> aims to turn{" "}
    <em>Pseudomonas putida</em> KT2440, a robust, safe and very well-characterised chassis, into a{" "}
    <strong>phosphorus-accumulating organism (PAO)</strong>: a bacterium that captures phosphate from water and
    stores it internally as <strong>polyphosphate (polyP)</strong> granules. To do this we take inspiration from
    natural PAOs, above all <em>Candidatus</em> Accumulibacter phosphatis, the organism behind enhanced biological
    phosphorus removal in wastewater-treatment plants.
  </>,
  <>
    The strategy has <strong>two complementary arms</strong>: to add phosphate-uptake and storage capacity, we
    heterologously express <strong>PPK1</strong> and <strong>PstSCAB</strong> from <em>Ca.</em> Accumulibacter (
    <a href="#cloning" className="lab-wikilink">
      Cloning block
    </a>
    ); and to remove the native <em>P. putida</em> pathways that degrade polyphosphate or return phosphate to the
    medium, we inactivate <strong>Ppx</strong>, <strong>PpkB (PPK2)</strong> and <strong>PitB</strong> by CRISPR
    base editing (
    <a href="#knocking-out" className="lab-wikilink">
      CRISPR block
    </a>
    ).
  </>,
  <>
    In one sentence: we make the cell{" "}
    <strong>import more phosphate, lock it away as polyP, and stop losing it</strong>.
  </>,
];

export interface GenePart {
  id: string;
  shortName: string;
  fullName: string;
  role: "add" | "remove";
  whatItDoes: ReactNode;
  whatWeDo: ReactNode;
  storyboard: ReactNode;
}

/** The five parts of the system — see GeneSystemGrid.tsx. */
export const GENE_PARTS: GenePart[] = [
  {
    id: "ppk1",
    shortName: "PPK1",
    fullName: "Polyphosphate kinase 1",
    role: "add",
    whatItDoes: (
      <>
        The enzyme that <strong>builds polyphosphate</strong>. It takes the terminal (γ) phosphate from ATP and
        adds it, residue by residue, to a growing polyP chain. It is the engine of polyP synthesis in PAOs.
      </>
    ),
    whatWeDo: (
      <>
        We <strong>express it heterologously</strong> (cloned into a pSEVA vector), using the <em>Ca.</em>{" "}
        Accumulibacter version. We add extra synthesis capacity so that all the incoming phosphate is turned into
        stored polyP, the heart of accumulation.
      </>
    ),
    storyboard:
      "ATP molecules coming in; the phosphate is clipped off ATP (ATP → ADP) and attached to the end of a polyP chain that grows into a granule.",
  },
  {
    id: "pstscab",
    shortName: "PstSCAB",
    fullName: "High-affinity phosphate transporter (ABC-type)",
    role: "add",
    whatItDoes: (
      <>
        A high-affinity <strong>phosphate import pump</strong>. PstS captures phosphate in the periplasm; PstC and
        PstA form the membrane channel; PstB is the ATPase supplying the energy. It brings phosphate into the cell{" "}
        <strong>even when very little is left outside</strong>.
      </>
    ),
    whatWeDo: (
      <>
        We <strong>express it heterologously</strong> (from <em>Ca.</em> Accumulibacter) to maximise phosphate
        uptake and feed polyP synthesis. Its high affinity is key to “polishing” the water down to low residual
        concentrations.
      </>
    ),
    storyboard:
      "Phosphate ions from the medium captured at the membrane/periplasm and pumped through the channel into the cell, with ATP → ADP powering the pump.",
  },
  {
    id: "ppx",
    shortName: "Ppx",
    fullName: "Exopolyphosphatase",
    role: "remove",
    whatItDoes: (
      <>
        The enzyme that <strong>degrades polyphosphate</strong>. It hydrolyses phosphates from the end of the polyP
        chain and releases them as inorganic phosphate (Pi). It is the main activity that “undoes” what has been
        accumulated.
      </>
    ),
    whatWeDo: (
      <>
        We <strong>inactivate it with CRISPR</strong> (base editing) so the cell cannot dismantle its polyP
        reserves. This locks in the accumulated phosphorus and avoids a futile synthesis/degradation cycle.
      </>
    ),
    storyboard:
      "A polyP chain being nibbled from the end, phosphates dropping off one by one — struck through to show we remove this activity.",
  },
  {
    id: "ppkb",
    shortName: "PpkB (PPK2)",
    fullName: "Polyphosphate kinase 2",
    role: "remove",
    whatItDoes: (
      <>
        A <strong>type-2 polyphosphate kinase</strong>: it uses polyP as a phosphate donor to phosphorylate
        nucleotides (e.g. ADP → ATP, GDP → GTP), <strong>consuming</strong> the polyP chain. In other words, it
        spends polyP to regenerate nucleotides.
      </>
    ),
    whatWeDo: (
      <>
        We <strong>inactivate it with CRISPR</strong> so polyP is not consumed by this route. We reduce polyP
        turnover and favour net accumulation.
      </>
    ),
    storyboard:
      "PolyP donating a phosphate to an ADP that becomes ATP while the chain shortens — struck through to show we remove this activity.",
  },
  {
    id: "pitb",
    shortName: "PitB",
    fullName: "Low-affinity phosphate transporter (Pit system)",
    role: "remove",
    whatItDoes: (
      <>
        A <strong>low-affinity phosphate transporter</strong> (Pit-type), a metal-phosphate/H⁺ symporter. Pit
        systems are bidirectional and are implicated in the <strong>efflux/release</strong> of phosphate from
        PAOs.
      </>
    ),
    whatWeDo: (
      <>
        We <strong>inactivate it with CRISPR</strong> to reduce phosphate leakage to the outside, so the imported
        and stored phosphate stays inside and is not lost back to the medium.
      </>
    ),
    storyboard: "Phosphate escaping from the cell through a channel — struck through to show we block the leak.",
  },
];

const REF: Record<number, string> = {
  1: "[1] de Lorenzo, V., Pérez-Pantoja, D., & Nikel, P. I. (2024). Pseudomonas putida KT2440: The long journey of a soil-dweller to become a synthetic biology chassis. Journal of Bacteriology, 206(7), e00136-24. https://doi.org/10.1128/jb.00136-24",
  2: "[2] Martin-Pascual, M., Batianis, C., Bruinsma, L., Asin-Garcia, E., Garcia-Morales, L., Weusthuis, R. A., van Kranenburg, R., & Martins dos Santos, V. A. P. (2021). A navigation guide of synthetic biology tools for Pseudomonas putida. Biotechnology Advances, 49, 107732. https://doi.org/10.1016/j.biotechadv.2021.107732",
  3: "[3] Silva-Rocha, R., Martínez-García, E., Calles, B., Chavarría, M., Arce-Rodríguez, A., de las Heras, A., Páez-Espino, A. D., Durante-Rodríguez, G., Kim, J., Nikel, P. I., Platero, R., & de Lorenzo, V. (2013). The Standard European Vector Architecture (SEVA): A coherent platform for the analysis and deployment of complex prokaryotic phenotypes. Nucleic Acids Research, 41(D1), D666-D675. https://doi.org/10.1093/nar/gks1119",
  4: "[4] Martínez-García, E., Goñi-Moreno, A., Bartley, B., McLaughlin, J., Sánchez-Sampedro, L., Pascual del Pozo, H., Prieto Hernández, C., Marletta, A. S., De Lucrezia, D., Sánchez-Fernández, G., Fraile, S., & de Lorenzo, V. (2020). SEVA 3.0: An update of the Standard European Vector Architecture for enabling portability of genetic constructs among diverse bacterial hosts. Nucleic Acids Research, 48(D1), D1164-D1170. https://doi.org/10.1093/nar/gkz1024",
  5: "[5] Choi, K.-H., Kumar, A., & Schweizer, H. P. (2006). A 10-min method for preparation of highly electrocompetent Pseudomonas aeruginosa cells: Application for DNA fragment transfer between chromosomes and plasmid transformation. Journal of Microbiological Methods, 64(3), 391-397. https://doi.org/10.1016/j.mimet.2005.06.001",
  6: "[6] Komor, A. C., Kim, Y. B., Packer, M. S., Zuris, J. A., & Liu, D. R. (2016). Programmable editing of a target base in genomic DNA without double-stranded DNA cleavage. Nature, 533(7603), 420-424. https://doi.org/10.1038/nature17946",
  7: "[7] Chen, W., Zhang, Y., Zhang, Y., Pi, Y., Gu, T., Song, L., Wang, Y., & Ji, Q. (2018). CRISPR/Cas9-based genome editing in Pseudomonas aeruginosa and cytidine deaminase-mediated base editing in Pseudomonas species. iScience, 6, 222-231. https://doi.org/10.1016/j.isci.2018.07.024",
  8: "[8] Sun, J., Lu, L.-B., Liang, T.-X., Yang, L.-R., & Wu, J.-P. (2020). CRISPR-assisted multiplex base editing system in Pseudomonas putida KT2440. Frontiers in Bioengineering and Biotechnology, 8, 905. https://doi.org/10.3389/fbioe.2020.00905",
  9: "[9] Volke, D. C., Martino, R. A., Kozaeva, E., Smania, A. M., & Nikel, P. I. (2022). Modular (de)construction of complex bacterial phenotypes by CRISPR/nCas9-assisted, multiplex cytidine base-editing. Nature Communications, 13, 3026. https://doi.org/10.1038/s41467-022-30780-z",
  10: "[10] Engler, C., Kandzia, R., & Marillonnet, S. (2008). A one pot, one step, precision cloning method with high throughput capability. PLoS ONE, 3(11), e3647. https://doi.org/10.1371/journal.pone.0003647",
  11: "[11] Promega Corporation. (n.d.). Serine/Threonine Phosphatase Assay System (Cat. No. V2460) [Technical bulletin]. Promega. https://www.promega.es/-/media/files/resources/protocols/technical-bulletins/0/serine-threonine-phosphatase-assay-system-protocol.pdf",
};
function refs(...numbers: number[]): string[] {
  return numbers.map((n) => REF[n]);
}

/** The references cited by the three sub-block intros (Cloning, Knocking-
 * out, Closing) — collected into one shared, block-level list rendered
 * once at the end of the block (see ExperimentBlockData.references),
 * instead of three separate per-sub-block lists. [3], [4] and [5] are
 * deliberately not here: those are only ever cited inside an individual
 * experiment's own write-up, so they stay in that experiment's own
 * `references` field and its own card footer, untouched. */
export const GENETIC_ENGINEERING_REFERENCES: string[] = refs(1, 2, 6, 7, 8, 9, 10, 11);

/** Every named lab protocol cited across this block's steps — shared here,
 * rather than repeated per experiment, since e.g. "Crispr Protocolo 2.0"
 * is reused across most of the Knocking-out steps. Labels are shortened,
 * English versions of the source's own (often Spanish) protocol names, per
 * a "(PDF)" download convention matching the rest of this component
 * family — ExperimentCard appends "(PDF)" itself, so it's left off here. */
const PROTOCOL: Record<string, { label: string; href: string }> = {
  PCR: { label: "PCR", href: "assets/protocols/pcr.pdf" },
  "Geles de agarosa": { label: "Agarose gel", href: "assets/protocols/agarose-gel.pdf" },
  "Diamond Nucleic Acid Dye (Promega)": {
    label: "Diamond dye (Promega)",
    href: "assets/protocols/diamond-dye-promega.pdf",
  },
  "Wizard SV Gel and PCR Clean-Up (Promega)": {
    label: "Gel/PCR clean-up (Promega)",
    href: "assets/protocols/wizard-gel-pcr-cleanup.pdf",
  },
  ligation: { label: "Ligation", href: "assets/protocols/ligation.pdf" },
  "Transformación E. coli quimiocompetentes": {
    label: "E. coli transformation",
    href: "assets/protocols/ecoli-transformation.pdf",
  },
  "Obtención E. coli quimiocompetentes": {
    label: "E. coli competent cells",
    href: "assets/protocols/ecoli-competent-cells.pdf",
  },
  "Medios de cultivo": { label: "Culture media", href: "assets/protocols/culture-media.pdf" },
  "Minis de colonias": { label: "Colony minipreps", href: "assets/protocols/colony-minipreps.pdf" },
  "Miniprep kit": { label: "Miniprep (kit)", href: "assets/protocols/miniprep-kit.pdf" },
  "Miniprep sin kit": { label: "Miniprep (no kit)", href: "assets/protocols/miniprep-no-kit.pdf" },
  "internal sequencing submission SOP": {
    label: "Sequencing submission SOP",
    href: "assets/protocols/sequencing-submission-sop.pdf",
  },
  "Obtención P. putida electrocompetentes": {
    label: "P. putida electrocompetent cells",
    href: "assets/protocols/pputida-electrocompetent-cells.pdf",
  },
  "Geles de poliacrilamida": { label: "Polyacrylamide gel", href: "assets/protocols/polyacrylamide-gel.pdf" },
  "internal guide-design SOP": { label: "Guide-design SOP", href: "assets/protocols/guide-design-sop.pdf" },
  "Crispr Protocolo 2.0": { label: "CRISPR protocol 2.0", href: "assets/protocols/crispr-protocol-2.pdf" },
};
function protocolLinks(...names: string[]) {
  return names.map((n) => PROTOCOL[n]);
}

export const GENETIC_ENGINEERING_SUBBLOCKS: ExperimentSubBlock[] = [
  {
    id: "cloning",
    heading: "1. Cloning",
    intro: [
      <>
        The goal of this block is a <em>P. putida</em> strain that stably expresses <strong>ppk1</strong> and{" "}
        <strong>pstSCAB</strong> from <em>Candidatus</em> Accumulibacter phosphatis. Because <em>P. putida</em> is
        far less amenable to routine cloning than <em>Escherichia coli</em>{" "}
        <Cite scope="genetic-engineering" n={1} />, <Cite scope="genetic-engineering" n={2} />, each plasmid is
        built and verified in an <em>E. coli</em> cloning host and
        only then moved into the final chassis. This keeps the iterative cloning steps in the fastest, most
        transformable host and reserves the slower work with <em>P. putida</em> for constructs we already trust.
      </>,
      "Workflow: in silico design (1) → part acquisition and amplification (2) → preparative digestion of vectors and inserts (3) → ligation (4) → transformation and screening in the cloning host (5 to 7) → transfer to the chassis (8) → expression and functional validation (9). Steps run in parallel for both constructs.",
    ],
    experiments: [
      {
        id: "cloning-design",
        tabLabel: "In silico design",
        title: "In silico design of the expression cassettes",
        body: [
          {
            paragraphs: [
              "The first step was to design, in silico, the two expression cassettes: a promoter, a ribosome binding site (RBS), the coding sequence and the cloning sites needed to assemble each cassette into its pSEVA backbone by restriction and ligation.",
            ],
          },
          {
            paragraphs: [
              <>
                Two design decisions carry most of the weight. First, the <em>ppk1</em> and <em>pstSCAB</em> coding
                sequences were{" "}
                <strong>
                  codon-optimised for <em>P. putida</em> KT2440
                </strong>
                , because <em>Ca.</em> Accumulibacter has a different codon usage and its native sequences would be
                read inefficiently, with rare codons risking ribosome stalling and truncated product. Second,
                rather than modelling a bespoke RBS, we used the{" "}
                <strong>
                  canonical RBS for <em>P. putida</em>
                </strong>{" "}
                (a strong, well-characterised Shine-Dalgarno of the form AGGAGG), which gives reliable, predictable
                initiation in this host without the risk of an untested sequence. The restriction sites were chosen
                to match the chosen backbones: <strong>BamHI and HindIII</strong> for the cassettes going into{" "}
                <strong>pSEVA2513</strong>, and <strong>EcoRI and KpnI</strong> for the promoter fragment going into{" "}
                <strong>pSEVA6313</strong>. Design and map management were done in <strong>SnapGene</strong>.
              </>,
            ],
            pairedResource: {
              kind: "table-placeholder",
              caption: "Cassette sequences — not yet available in the source record.",
            },
          },
          {
            paragraphs: [
              "The expected outcome was two fully annotated cassettes, compatible with the restriction and ligation strategy and ready to order or amplify.",
            ],
          },
        ],
      },
      {
        id: "cloning-parts",
        tabLabel: "Part acquisition",
        title: "Part acquisition and amplification",
        description: [
          <>
            The parts were obtained in the form best suited to each. The coding sequences were ordered as{" "}
            <strong>synthetic genes delivered pre-cloned in carrier vectors</strong>: <strong>ppk1 in pMK-RQ</strong>{" "}
            and <strong>pstSCAB in pOK-RQ</strong>, both kanamycin-resistant. Ordering genes pre-cloned gives a
            stable, sequence-verified stock that can be propagated and drawn on as needed. The promoter was
            supplied in the small synthetic vector <strong>pEM7</strong>.
          </>,
          <>
            The promoter needed special handling because it is very short (about <strong>77 bp</strong>). Released
            by EcoRI and KpnI digestion, a fragment this small runs off the front of the gel and cannot be
            recovered cleanly, so it cannot simply be cut out and purified. The working solution was to move the
            promoter and RBS off the gel entirely and{" "}
            <strong>build them into the genes through PCR primers</strong>: the coding sequences were amplified
            with primers that carry the RBS and the required restriction sites as overhangs, so the cassette is
            completed during amplification rather than by purifying a tiny promoter band.
          </>,
          <>
            The amplification used <strong>Pfu polymerase</strong> (the enzyme available in the lab; slower than
            Phusion but high-fidelity, which matters because any error introduced while amplifying a coding
            sequence would be carried into the final construct). A high-fidelity enzyme keeps that error rate
            negligible. Products were checked on an agarose gel and quantified by NanoDrop before use.
          </>,
          "The expected outcome was a sequence-verified stock of each gene in its carrier vector and clean, correctly sized amplicons carrying the RBS and cloning sites.",
        ],
        protocols: protocolLinks("PCR", "Geles de agarosa", "Diamond Nucleic Acid Dye (Promega)"),
      },
      {
        id: "cloning-digestion",
        tabLabel: "Preparative digestion",
        title: "Preparative digestion of the vectors and inserts",
        body: [
          {
            paragraphs: [
              <>
                The backbones and inserts were then cut to matching ends. <strong>pSEVA2513</strong>{" "}
                (kanamycin-resistant, about <strong>5.3 kb</strong>) was digested with{" "}
                <strong>BamHI and HindIII</strong>, together with the <em>ppk1</em> and <em>pstSCAB</em> cassettes;{" "}
                <strong>pSEVA6313</strong> (gentamicin-resistant, about <strong>3.0 kb</strong>) was digested with{" "}
                <strong>EcoRI and KpnI</strong> for the promoter route. These vector choices matter because{" "}
                <em>P. putida</em> does not maintain the ColE1 or pUC origins of standard <em>E. coli</em> vectors
                and requires <strong>broad-host-range replicons</strong>; the SEVA collection supplies exactly
                these, with compatible resistance and origin modules <Cite scope="cloning-digestion" n={3} />,{" "}
                <Cite scope="cloning-digestion" n={4} />.
              </>,
            ],
          },
          {
            paragraphs: [
              <>
                Enzymes were used at <strong>37 °C</strong> variable time and buffer. The vector was{" "}
                <strong>not dephosphorylated</strong>; instead, background from re-ligation was controlled by
                running a vector-only ligation control in the next step and by clean preparative gel excision. For{" "}
                <em>ppk1</em>, whose backbone fragment co-migrates with the insert on a 1% gel, an{" "}
                <strong>additional NcoI digestion</strong> was used to separate the bands so the correct fragment
                could be excised. Digestions were resolved on <strong>1% agarose</strong> in TAE, stained with
                Diamond dye, and the bands of interest were excised and purified with the{" "}
                <strong>Wizard SV Gel and PCR Clean-Up System</strong> (Promega), eluting in water or the kit
                buffer.
              </>,
            ],
            pairedResource: {
              kind: "table-placeholder",
              caption: "Restriction enzymes, incubation times and buffers — not yet available in the source record.",
            },
          },
          {
            paragraphs: ["The expected outcome was cleanly cut, gel-purified vector and insert with compatible ends."],
          },
        ],
        references: refs(3, 4),
        protocols: protocolLinks("Geles de agarosa", "Wizard SV Gel and PCR Clean-Up (Promega)"),
      },
      {
        id: "cloning-ligation",
        tabLabel: "Ligation",
        title: "Ligation",
        description: [
          <>
            The cassettes were joined to their backbones by <strong>T4 DNA ligation</strong>. Reactions used a{" "}
            <strong>vector-to-insert molar ratio of about 1:5</strong>, T4 buffer and T4 DNA ligase, incubated{" "}
            <strong>overnight at 16 °C</strong>, the standard low-temperature condition that favours intermolecular
            joining of sticky ends. A <strong>vector-only control</strong> was always run alongside: a control
            plate with only a few tiny colonies, as obtained here, indicates that the vector is not re-ligating on
            itself and that colonies on the sample plate are likely to carry insert.
          </>,
          "The expected outcome was a ligation mixture ready to transform, with the control showing minimal background.",
        ],
        protocols: protocolLinks("ligation"),
      },
      {
        id: "cloning-ecoli-transformation",
        tabLabel: "E. coli transformation",
        title: "Transformation into the E. coli cloning host",
        description: [
          <>
            The ligation was introduced into chemically competent <strong>E. coli DH5α</strong>. The correct term
            is <strong>transformation</strong>, the uptake of naked plasmid DNA by an artificially competent
            bacterial cell; we avoid “transfer”, which is nonspecific, and “transfection”, which refers to
            eukaryotic cells. DH5α is used rather than the final chassis because its genotype protects the
            construct (<em>endA1</em> removes an endonuclease and gives cleaner minipreps, <em>recA1</em> reduces
            recombination and keeps inserts stable) and because it transforms far more efficiently than{" "}
            <em>P. putida</em>.
          </>,
          <>
            Cells were heat-shocked, then <strong>recovered in non-selective rich medium</strong> before plating,
            so that the resistance protein is expressed before selection; plating straight onto antibiotic would
            kill genuine transformants. Cells were then plated on <strong>LB agar with kanamycin</strong> (from a
            50 mg/mL stock, giving about 75 µg/mL in plates; liquid cultures used about 100 µg/mL).
          </>,
          "The expected outcome was colonies on the selective plates and few or none on the control.",
        ],
        protocols: protocolLinks(
          "Transformación E. coli quimiocompetentes",
          "Obtención E. coli quimiocompetentes",
          "Medios de cultivo",
        ),
      },
      {
        id: "cloning-colony-screening",
        tabLabel: "Colony screening",
        title: "Colony screening and diagnostic verification",
        description: [
          <>
            Candidate colonies were triaged by <strong>colony PCR</strong> and by{" "}
            <strong>diagnostic restriction digestion</strong> (for example, a PauI or BamHI and HindIII digest
            whose band pattern distinguishes a correct construct from an empty or mis-assembled one). Colony PCR is
            run first because it is fast and cheap and can screen many colonies directly. Positives were grown and
            their plasmid isolated by <strong>miniprep</strong>, either with the{" "}
            <strong>PureYield Plasmid Miniprep System</strong> (Promega) or by kit-free alkaline lysis; miniprep is
            chosen over midi or maxi preparations because only enough DNA for a digest and for sequencing is needed
            at this stage. Products were checked on agarose and quantified by NanoDrop.
          </>,
          "The expected outcome was several independent clones per construct with the correct pattern.",
        ],
        protocols: protocolLinks("PCR", "Minis de colonias", "Miniprep kit", "Miniprep sin kit", "Geles de agarosa"),
      },
      {
        id: "cloning-sequence-confirmation",
        tabLabel: "Sequence confirmation",
        title: "Sequence confirmation",
        description: [
          "Clones that passed screening were confirmed by sequencing, because screening shows an insert of the right size and orientation but only sequencing rules out point mutations, indels or assembly scars that could inactivate the protein or shift the reading frame. Sanger sequencing of the cassette and its junctions, or whole-plasmid sequencing, was used, and only a clone matching the in-silico design exactly was carried forward.",
          <>The expected outcome was a <strong>sequence-verified expression plasmid</strong> for each gene.</>,
        ],
        protocols: protocolLinks("internal sequencing submission SOP"),
      },
      {
        id: "cloning-pputida-transformation",
        tabLabel: "P. putida transformation",
        title: "Transformation into P. putida KT2440",
        description: [
          <>
            The verified plasmids were moved into the final chassis by{" "}
            <strong>
              electroporation of electrocompetent <em>P. putida</em> KT2440
            </strong>
            , prepared by the standard rapid sucrose-wash method (repeated washes in 300 mM sucrose to remove
            salts) <Cite scope="cloning-pputida-transformation" n={5} />. Electroporation is used because{" "}
            <em>P. putida</em> is not naturally competent and takes up DNA far less readily than <em>E. coli</em>,
            so more input DNA is generally needed than for a routine <em>E. coli</em> transformation{" "}
            <Cite scope="cloning-pputida-transformation" n={2} />, <Cite scope="cloning-pputida-transformation" n={5} />. The
            pSEVA vectors are broad-host-range and are stably
            maintained in <em>Pseudomonas</em>. Transformants were selected on <strong>LB with kanamycin</strong>.
          </>,
          <>The expected outcome was resistant <em>P. putida</em> colonies carrying the expression plasmid.</>,
        ],
        references: refs(2, 5),
        protocols: protocolLinks("Obtención P. putida electrocompetentes", "Medios de cultivo"),
      },
      {
        id: "cloning-expression-confirmation",
        tabLabel: "Expression check",
        title: "Confirmation of heterologous expression",
        description: [
          <>
            Because carrying the plasmid does not guarantee expression, PPK1 and PstSCAB were checked directly in{" "}
            <em>P. putida</em> by culture followed by <strong>SDS-PAGE</strong> and detection of the tagged
            proteins (<strong>‹e.g. anti-His Western blot›</strong>), with <strong>RT-qPCR</strong> as an optional
            transcript-level check. Protein-level detection is the primary read-out because it reports what
            accumulates in the cell.
          </>,
          "The expected outcome was a band or signal of the expected size for each protein.",
        ],
        protocols: protocolLinks("Geles de poliacrilamida", "Medios de cultivo"),
      },
    ],
    outro:
      "Together, these nine steps take the two genes from design to a functionally validated, phosphate-accumulating strain, with each verification stage gating the next.",
  },
  {
    id: "knocking-out",
    heading: "2. Knocking-out",
    intro: [
      <>
        The goal of this block is to remove, in the same strain, three native activities that oppose accumulation:{" "}
        <strong>ppx</strong> (degrades polyphosphate), <strong>ppkB</strong>/<strong>ppk2</strong> (consumes
        polyphosphate to phosphorylate nucleotides) and <strong>pitB</strong> (low-affinity phosphate transport
        implicated in efflux). They are inactivated by <strong>CRISPR base editing</strong>{" "}
        <Cite scope="genetic-engineering" n={6} />, <Cite scope="genetic-engineering" n={7} />, <Cite scope="genetic-engineering" n={8} />{" "}
        rather than by conventional Cas9 cutting, because a double-strand break in <em>P. putida</em> is
        problematic: the organism has limited non-homologous end joining, so cuts are repaired poorly and are often
        lethal, and scarless deletion would otherwise require a homology-directed repair template. A cytidine base
        editor sidesteps this, introducing a premature stop codon by chemistry alone, an approach already validated
        for gene inactivation in <em>P. putida</em> KT2440 <Cite scope="genetic-engineering" n={8} />.
      </>,
      <>
        We use the <strong>pMBEC2</strong> base editor <Cite scope="genetic-engineering" n={9} />, which fuses a cytidine
        deaminase, a Cas9 nickase and a uracil glycosylase inhibitor, and carries a constitutively expressed{" "}
        <strong>msfGFP</strong> cassette flanked by <strong>BsaI</strong> sites in place of the guide. The guide RNA
        is installed by <strong>Golden Gate assembly</strong> <Cite scope="genetic-engineering" n={9} />,{" "}
        <Cite scope="genetic-engineering" n={10} />, replacing the msfGFP marker, so that correct constructs can be picked
        by <strong>loss of green fluorescence</strong>.
      </>,
      "Workflow: guide design (1) → gRNA amplification (2) → Golden Gate assembly into pMBEC2 (3) → transformation and fluorescence-assisted screening (4) → delivery into P. putida (5) → editing (6) → screening of edits (7) → curing and iteration (8) → triple-mutant verification (9).",
    ],
    experiments: [
      {
        id: "knockout-guide-design",
        tabLabel: "Guide design",
        title: "In silico design of the base-editing guides",
        description: [
          <>
            The block opens with guide design because base editing only works within a narrow window. A cytidine
            base editor deaminates cytosine to uracil (read as thymine) within roughly positions 4 to 8 of the
            protospacer, converting a C·G pair to T·A <Cite scope="knockout-guide-design" n={6} />. To create a{" "}
            <strong>premature stop codon</strong> we look for a <strong>CAA, CAG or CGA</strong> codon, which a
            single C to T edit turns into <strong>TAA, TAG or TGA</strong>{" "}
            <Cite scope="knockout-guide-design" n={8} />, placed so that the editable C falls inside the window and
            a
            suitable NGG PAM lies the correct distance away. The edit was placed{" "}
            <strong>early in each gene</strong> so the truncated protein is certainly non-functional, and candidate
            guides were screened for <strong>off-targets</strong> against the KT2440 genome, with two or three
            guides designed per gene. The specific guide-design tool used for this is not yet specified in the
            source record.
          </>,
          <>The expected outcome was a prioritised set of guides for <em>ppx</em>, <em>ppkB</em> and <em>pitB</em>.</>,
        ],
        references: refs(6, 8),
        protocols: protocolLinks("internal guide-design SOP"),
      },
      {
        id: "knockout-grna-amplification",
        tabLabel: "gRNA amplification",
        title: "Amplification of the gRNA fragments",
        description: [
          <>
            The guide fragments were generated by <strong>PCR from the template vector pEX128</strong>, using
            oligonucleotides that carry the specific spacer for each target together with the Golden Gate (BsaI)
            flanking motifs <Cite scope="knockout-grna-amplification" n={7} />, so the guide is assembled directly
            around the desired spacer. Amplification used{" "}
            <strong>Pfu polymerase</strong>. Because the amplicon is small (about <strong>130 to 150 bp</strong>{" "}
            for <em>ppx</em>, <em>ppkB</em> and <em>pitB</em>), the cycling was tuned for a short product: a short
            extension (about 20 to 30 s) and a short denaturation, with an annealing temperature of{" "}
            <strong>60 °C</strong> following the source protocol and a <strong>gradient (60 to 68 °C)</strong>{" "}
            tested when a larger, non-specific band appeared. A no-oligo negative control was run to confirm that
            the band depends on the primers. Products were checked on <strong>1.5% agarose</strong>, then purified
            with the <strong>Wizard SV Gel and PCR Clean-Up System</strong> (Promega).
          </>,
          "The expected outcome was clean bands of about 130 to 150 bp for the three targets, with a blank negative control.",
        ],
        references: refs(7),
        protocols: protocolLinks(
          "PCR",
          "Crispr Protocolo 2.0",
          "Geles de agarosa",
          "Wizard SV Gel and PCR Clean-Up (Promega)",
        ),
      },
      {
        id: "knockout-golden-gate",
        tabLabel: "Golden Gate",
        title: "Golden Gate assembly into pMBEC2",
        description: [
          <>
            Each guide fragment was assembled into <strong>pMBEC2</strong> by <strong>Golden Gate (BsaI)</strong>{" "}
            <Cite scope="knockout-golden-gate" n={9} />, <Cite scope="knockout-golden-gate" n={10} />, replacing the
            msfGFP marker with the guide. Golden Gate is used here, rather than the
            restriction and ligation of Block A, because the pMBEC design is built for it: BsaI cuts outside its
            recognition site, so digestion and ligation can run in one pot and the marker is swapped for the guide
            seamlessly. This is also what enables the fluorescence-based screen in the next step.
          </>,
          "The expected outcome was an assembly mixture ready to transform.",
        ],
        references: refs(9, 10),
        protocols: protocolLinks("Crispr Protocolo 2.0"),
      },
      {
        id: "knockout-fluorescence-screening",
        tabLabel: "Fluorescence",
        title: "Transformation and fluorescence-assisted screening",
        description: [
          <>
            The assembly was transformed into <strong>E. coli DH5α</strong> and plated. Because a correct construct
            has lost the msfGFP marker, colonies were screened by fluorescence:{" "}
            <strong>non-fluorescent (white) colonies carry the guide</strong>, whereas green colonies still hold
            the template. Selected white colonies were grown, miniprepped and verified. When the Golden Gate
            efficiency is low, the assembly is repeated using the protocol cycling as written.
          </>,
          <>
            The expected outcome was verified editor-plus-guide plasmids (<strong>pMBEC2</strong>, guide against{" "}
            <em>ppx</em>, <em>ppkB</em> or <em>pitB</em>).
          </>,
        ],
        protocols: protocolLinks(
          "Transformación E. coli quimiocompetentes",
          "Minis de colonias",
          "Miniprep kit",
          "Crispr Protocolo 2.0",
        ),
      },
      {
        id: "knockout-delivery",
        tabLabel: "Delivery",
        title: "Delivery into P. putida",
        description: [
          <>
            The verified editing plasmids were introduced into P. putida KT2440 by electroporation{" "}
            <Cite scope="knockout-delivery" n={5} />, as in Block A, step 8, and selected on the vector's antibiotic.
            Delivery is kept separate from editing so that a clean, selected population carrying the system is
            established first.
          </>,
          <>The expected outcome was <em>P. putida</em> transformants carrying the editing system.</>,
        ],
        references: refs(5),
        protocols: protocolLinks("Obtención P. putida electrocompetentes", "Medios de cultivo"),
      },
      {
        id: "knockout-editing",
        tabLabel: "Editing",
        title: "Editing and colony isolation",
        description: [
          <>
            Cells were diluted and plated to obtain <strong>single colonies</strong>, because a freshly induced
            culture is a mixture of edited and unedited cells and only clonal colonies allow an individual genotype
            to be read out.
          </>,
          "The expected outcome was individual candidate colonies.",
        ],
        protocols: protocolLinks("Crispr Protocolo 2.0"),
      },
      {
        id: "knockout-sequencing-screen",
        tabLabel: "Sequencing screen",
        title: "Screening of edits by sequencing",
        description: [
          <>
            Each candidate was genotyped by <strong>colony PCR and Sanger sequencing</strong> of the target region,
            reading the <strong>C to T conversion</strong> and confirming the stop codon using SnapGene. Sequencing
            is the only reliable read-out, since the edit is a single base change that produces no size difference.
          </>,
          "The expected outcome was colonies carrying the edit that creates the stop codon.",
        ],
        protocols: protocolLinks("PCR", "Crispr Protocolo 2.0"),
      },
      {
        id: "knockout-curing",
        tabLabel: "Curing & iteration",
        title: "Curing and iteration for the three targets",
        description: [
          <>
            The editor plasmid was then <strong>cured</strong>, which stops further editing, yields a stable strain
            and, importantly, <strong>frees the antibiotic marker</strong> for the next round{" "}
            <Cite scope="knockout-curing" n={9} />. This was achieved by sucrose 5% w/v passes. The introduce, edit,
            screen and cure cycle was repeated for the second and third genes, each round starting from the strain
            of the previous one, so the three knock-outs accumulate in a single lineage. Editing was done{" "}
            <strong>sequentially rather than as a single multiplex</strong>, so each edit is verified before the
            next, although the pMBEC toolset also supports multiplexing <Cite scope="knockout-curing" n={9} />.
          </>,
          <>
            The expected outcome was a <strong>triple mutant</strong>, <em>ppx⁻ ppkB⁻ pitB⁻</em>.
          </>,
        ],
        references: refs(9),
        protocols: protocolLinks("Crispr Protocolo 2.0"),
      },
      {
        id: "knockout-triple-mutant-verification",
        tabLabel: "Triple mutant",
        title: "Verification of the triple mutant",
        description: [
          <>
            Before phenotyping, the three target regions were amplified and sequenced to confirm all three stop
            codons. <strong>Whole-genome sequencing</strong> to check for off-targets or rearrangements accumulated
            over three rounds was not considered because off-target cuts were bioinformatically optimized and
            whole-genome sequencing costs. This ensures the later phenotype can be attributed to the intended
            knock-outs.
          </>,
          "The expected outcome was confirmation of the three knock-outs with no significant unwanted edits.",
        ],
        protocols: protocolLinks("PCR", "Crispr Protocolo 2.0"),
      },
    ],
    outro:
      "Together, these nine steps are the minimum needed to install and prove three clean, markerless knock-outs in one strain: per-round sequencing is required by the chemistry of base editing, and curing is what makes three sequential rounds possible with a limited set of markers.",
  },
  {
    id: "closing",
    heading: "3. Closing: from two modules to the RePhlow chassis",
    intro: [
      <>
        Taken together, the two blocks are both <strong>necessary and sufficient</strong> for the block objective,
        and they were shaped by the constraints of the project rather than added for completeness. Neither module
        alone produces a phosphorus-accumulating strain: adding uptake and storage capacity (Block A) is wasted if
        the cell still degrades and leaks what it stores, and removing the native loss routes (Block B) achieves
        little without the added capacity to import phosphate and fix it as polyphosphate. The verification-heavy
        design of both blocks, screening before sequencing and sequencing before phenotyping, reflects a deliberate
        choice to fail fast and cheaply in <em>E. coli</em> and to trust <em>P. putida</em> results only once the
        genotype is certain.
      </>,
      <>
        The two modules converge in a final <strong>integration</strong> step. The verified expression plasmids
        from Block A (<em>ppk1</em> and <em>pstSCAB</em>) are introduced into <em>P. putida</em> KT2440,
        individually and together, by electroporation, giving the strains that carry the added machinery; in
        parallel, the base-edited knock-out background from Block B removes the native loss routes. The complete
        strain is then assessed with the{" "}
        <strong>intracellular phosphorus capture assay in M9 medium</strong>, following internal polyphosphate over
        time by cell lysis, acid release of phosphate and quantification with the{" "}
        <strong>Promega molybdate:malachite green phosphate assay</strong>{" "}
        <Cite scope="genetic-engineering" n={11} />, this
        time as an end-to-end
        validation of the full RePhlow phenotype rather than of a single module. Measuring capture inside the cell,
        rather than depletion from the medium, is what makes this a direct test of phosphorus accumulation.
      </>,
      <>
        This is measured directly as <strong>intracellular phosphorus capture</strong>, using the polyphosphate
        titration assay in <strong>M9 medium</strong>. Both transformants, CRISPR-edited and multi-transformants
        CRISPR-edited were grown in LB to OD600 of about 0.6 and shifted into the test medium (M9). At a series of
        time points (0, 10, 20, 30, 45, 60, 90, 120, 180 and 240 min) one aliquot is read for OD600 while a paired
        aliquot is pelleted, washed in 0.1 M NaCl and lysed (0.1 M NaCl, 0.5% SDS, 95 °C). The phosphorus stored
        inside the cells is then released by acid digestion and the free phosphate is quantified with the{" "}
        <strong>Promega Non-Radioactive Phosphatase Assay System</strong> (Serine/Threonine Phosphatase Assay
        System, cat. V2460), which measures phosphate as a <strong>molybdate:malachite green complex</strong> by
        absorbance against the kit's phosphate standard (detection range about 100 to 4,000 pmol). Accumulated
        polyphosphate is taken as the phosphorus measured at each time point minus that at t = 0, normalised to
        OD600, and compared with controls (M9 at pH 5, and LB with 87 mM phosphate). This reports internal storage
        directly, rather than inferring it from the medium.
      </>,
      "Protocols: Ensayo de absorción de polifosfato intracelular; Promega Serine/Threonine Phosphatase Assay System (V2460); Medios de cultivo.",
      "The expected outcome was greater intracellular phosphorus accumulation than the wild type.",
    ],
  },
];
