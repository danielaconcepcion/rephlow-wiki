import type {
  ResultData,
  ResultSubBlock,
} from "../../components/LabFolders/types";

/**
 * Revalorisation results, transcribed from the team's own Notion results
 * page ("Revalorisation", under WIKI / Results). The sub-blocks, their
 * order and the record titles follow that page.
 *
 * The source's own numbering of the DHAK
 * records jumps (two records are both numbered 3); they are listed in
 * sequence below, which changes no content. The thermal-stability toggle
 * sits in a section the source marks to be ignored, and is left out.
 *
 * In-text "(Figure n)" pointers in the source are dropped: figure numbers
 * on this page are assigned automatically (numbering.ts), so a hand-written
 * number would point at the wrong figure. Computational design and
 * purification records are kept in the same workflow order as the source.
 */

const FIGURES = "assets/results/revalorisation";
/** The PROSS design-5 mutation map is the same figure Experiments shows, so
 * it is referenced from that block's folder rather than duplicated here. */
const EXPERIMENT_FIGURES = "assets/experiments/revalorisation";

export const REVALORISATION_INTRO = [
  "This page reports the outcomes of the revalorisation work: designing a stabilised DHAK and a fused DHAK–PPK2 complex *in silico*, producing both enzymes in *E. coli* BL21(DE3) from gene to clarified cell-free extract, purifying them, and measuring the activity of each enzyme alone and of the two coupled, where PPK2 regenerates from polyphosphate the ATP that DHAK spends to phosphorylate dihydroxyacetone. The design and rationale of each step are on the Experiments page.",
  "Each entry below reports the outcome of the corresponding step on the Experiments page, following the same order and titles. Within each block the results are given in the order they were obtained, because each one decided what was tried next.",
];

function asNarrative(data: ResultData): ResultData {
  return { ...data, narrative: true };
}

/* ---------- Computational protein design ---------- */

const DESIGN_DSM: ResultData = {
  id: "design-dhak-dsm-30040",
  tabLabel: "Stabilisation, DSM 30040",
  title: "In silico stabilisation of DHAK from *C. freundii* DSM 30040",
  subsections: [
    {
      id: "pross-cycle-1",
      body: [
        "Running **PROSS** on the DSM 30040 reference sequence returned **nine candidate designs**, ranging from a conservative **21 substitutions (3.9% of the sequence)** to an aggressive **119 (22.2%)** [1]. The multiple-sequence alignment behind the design was **deep and well-covered**, with over **3,000 homologous sequences**, coverage above 95% for almost all of them and sequence identity concentrated between **40% and 60%**, a broad but informative evolutionary sampling for the stability predictions.",
      ],
      tables: [
        {
          caption:
            "PROSS designs returned for DHAK from *C. freundii* DSM 30040, from the most conservative (21 substitutions) to the most aggressive (119). **Design 5**, a mid-range option with 56 substitutions (10.4%), was selected for expression. The full list of substitutions for every design is given in the supplementary material.",
          headers: ["Design", "# Mutations", "% Mutations"],
          rows: [
            ["DHAK_3_design_1", "21", "3.91"],
            ["DHAK_3_design_2", "34", "6.33"],
            ["DHAK_3_design_3", "37", "6.89"],
            ["DHAK_3_design_4", "43", "8.01"],
            ["**DHAK_3_design_5 (selected)**", "**56**", "**10.43**"],
            ["DHAK_3_design_6", "69", "12.85"],
            ["DHAK_3_design_7", "83", "15.46"],
            ["DHAK_3_design_8", "99", "18.44"],
            ["DHAK_3_design_9", "119", "22.16"],
          ],
        },
      ],
      figures: [
        {
          src: `${FIGURES}/pross-msa-quality.png`,
          alt: "Histograms of percentage coverage and percentage sequence identity across the homologues aligned by PROSS.",
          caption:
            "Quality of the multiple-sequence alignment used by PROSS. Distributions of **% coverage** (left) and **% sequence identity** (right) across the >3,000 aligned homologues, showing high coverage (mostly >95%) and identity concentrated between 40% and 60% [1].",
        },
      ],
      bodyAfter: [
        "**Why design 5.** The nine designs form a ladder, and the standard way to sample it is to order three constructs, one conservative, one intermediate and one aggressive, so that the trade-off between predicted stability and mutational load can be read directly from the bench. **Our budget allowed a single synthetic gene**, so the ladder had to be sampled once. We chose **design 5 (56 substitutions, 10.4%)** as a **mid-range compromise** between predicted stability gain and mutational load, and carried it forward with the wild type as reference. A conservative design risks gaining too little stability to measure, an aggressive one risks losing function outright, and the middle of the range is the position from which either outcome would still be informative.",
        "**Checking the design before ordering it.** The design was superposed on the wild-type structure in PyMOL [2,3]. The **overall fold is unchanged**, with the K- and L-domains and the dimer interface preserved, and **none of the residues within 4 Å of AMP-PNP, DHA or Mg²⁺ carries a substitution**: the mutations sit on the surface and in the second shell, away from the catalytic and cofactor-binding regions. The server did what it was instructed to do, and the construct entered the bench round as a structurally conservative change on paper.",
      ],
    },
    {
      id: "pross-cycle-1-structure",
      continued: true,
      figures: [
        {
          src: `${EXPERIMENT_FIGURES}/dhak-pross5-mutations.png`,
          alt: "Structure of DHAK with the positions mutated by PROSS design 5 highlighted, the ligand-binding residues left untouched.",
          caption:
            "Mutated positions of PROSS design 5 relative to wild-type DHAK, mapped on the structure. The protected residues around the ligands carry no substitutions.",
        },
      ],
    },
    {
      id: "pross-cycle-1-reading",
      continued: true,
      interpretation:
        "That the fold is preserved and the active site untouched is the minimum condition for a design to be worth testing, and it was met. What it does not establish is function: a model superposes well because the backbone is predicted to fold the same way, not because the enzyme still turns over substrate.",
      expectation:
        "**Design 5 proved inactive when expressed**, which is not a contradiction of this result but its limit, and it is what redirected the stabilisation effort onto the active CECT 4626 variant. One process note for future teams: the PROSS server was down on the first attempt and the run had to be repeated, so the selected design comes from the second submission.",
    },
  ],
};

const DESIGN_CECT: ResultData = {
  id: "design-dhak-cect-4626",
  tabLabel: "Stabilisation, CECT 4626",
  title: "In silico stabilisation of DHAK CECT 4626",
  subsections: [
    {
      id: "pross-cycle-2",
      body: [
        "**Why a second design, and why on a different sequence.** Two results forced this round. Design 5 showed no measurable activity, so the mutational load carried on the reference sequence had disturbed function. More decisive, the **wild-type DSM 30040 construct was not expressing**, which left us with **no working control**: without an active reference we could not tell whether the inactivity came from the mutations or from the purification. The host laboratory already had an active DHAK, the **CECT 4626** variant, which had been shown to express and work. Moving the stabilisation onto that sequence was not a preference but the only route to a comparison that means anything, since a stabilised variant can only be judged against a wild type that works.",
        "**Why the most conservative design.** Again only one construct could be ordered, and two considerations pointed the same way. The first is the lesson from design 5: 56 substitutions were enough to abolish activity, so the next attempt had to carry far fewer. The second is specific to this round. The final construct does not carry the PROSS mutations alone; it carries them **on top of the ~22 positions at which CECT 4626 naturally differs** from the sequence the design was generated on, so the two sources of variation compound. Choosing **design 1 (21 substitutions, 3.9%)**, the most conservative of the nine, keeps the number of changes added on top of those natural differences to a minimum, so that the stabilised construct stays as close as possible to a sequence already known to be active.",
        "**Result of the transfer.** The transfer was done position by position between the PROSS 1 design and the natural CECT 4626 sequence, and every differing position was assigned to one of three classes: **natural differences between the two strains**, **PROSS substitutions**, and **positions where a natural difference coincides with a PROSS substitution**. This third class is the most informative, since there the algorithm proposed a residue that evolution had already fixed in the active variant; those positions need no mutation at all and are the best-supported part of the design. A **codon-optimised gene** was generated and ordered for synthesis.",
      ],
      figures: [
        {
          src: `${FIGURES}/pross-cect4626-sequence.png`,
          alt: "Annotated DHAK CECT 4626 sequence showing natural strain differences, PROSS substitutions and the position where both coincide.",
          caption:
            "DHAK CECT 4626 carrying the PROSS mutation set. The sequence is annotated with the positions that differ naturally from *C. freundii* DSM 30040 (black), the stabilising changes introduced by PROSS design 1 (red), and the position where the residue CECT 4626 already carries is the one PROSS proposed (green), which therefore needed no mutation.",
        },
      ],
      interpretation:
        "This is what the round was aiming for: a small, evidence-ranked set of stabilising changes on the enzyme that actually works, with the unmodified CECT 4626 sequence available as its control.",
      expectation:
        "The design was completed, ordered as a synthetic gene and transformed into the expression host, but the time lost to the problems described above left none to measure its activity, so nothing can be concluded here about how the stabilisation performed. The round is documented in full, including the criterion used to select the mutations, so that a future team can take the transformed construct straight to expression and make the comparison against the wild type that we could not.",
    },
  ],
};

const DESIGN_CHANNELLING: ResultData = {
  id: "design-channelling",
  tabLabel: "SpyTag/SpyCatcher",
  title: "Channelling the biocatalytic complex (SpyTag/SpyCatcher)",
  subsections: [
    {
      id: "spytag-spycatcher-round-1",
      title: "Round 1: each enzyme fused to its own element",
      body: [
        "To channel the ATP intermediate directly between the two enzymes, the DHAK–PPK2 pair was modelled *in silico* as a SpyTag/SpyCatcher fusion [4], with the SpyTag on DHAK and the SpyCatcher on PPK2.",
        "In the first round each enzyme was modelled carrying only its half of the system. **DHAK with the SpyTag at the N-terminus was predicted cleanly by AlphaFold [5]**: the enzyme adopts its expected fold and the tag protrudes as a **disordered extension**, which is what a short peptide of that kind should look like. Superposing the model on the crystal structure of the wild-type enzyme in PyMOL confirms that the fusion leaves the fold unchanged. The reference used for this comparison is the DSM 30040 variant, since no crystal structure is available for CECT 4626.",
        "**PPK2 with the SpyCatcher at the N-terminus could not be predicted reliably.** AlphaFold returned a model in which the SpyCatcher was disordered and, more seriously, PPK2 itself did not resemble the free enzyme, so nothing about the geometry of the complex could be judged from it. Modelled without any fusion, PPK2 adopts a fold that agrees with the structure described for BcPPK2-III [6], which is what makes the fusion model's failure legible.",
        "The contrast between the two enzymes is informative: a short peptide can be appended to a folded enzyme without disturbing the prediction, but a whole domain cannot. That half of the round failed was not expected, and it is what prompted the change of strategy below.",
      ],
      figuresColumns: 2,
      figures: [
        {
          src: `${FIGURES}/dhak-spytag-alphafold.png`,
          alt: "AlphaFold model of DHAK with the SpyTag at its N-terminus.",
          caption:
            "AlphaFold model of the DHAK–SpyTag fusion. The enzyme adopts its expected fold and the SpyTag protrudes from the N-terminus as a disordered extension.",
        },
        {
          src: `${FIGURES}/dhak-spytag-superposed.png`,
          alt: "The DHAK-SpyTag model superposed on the crystal structure of wild-type DHAK.",
          caption:
            "The same model (lightpink) superposed in PyMOL on the crystal structure of wild-type DHAK from *C. freundii* DSM 30040, PDB 1UN9 (lightblue). The two structures overlay closely, so the fusion does not disturb the fold.",
        },
        {
          src: `${FIGURES}/ppk2-spycatcher-alphafold.png`,
          alt: "AlphaFold model of PPK2 with the SpyCatcher at its N-terminus, both poorly predicted.",
          caption:
            "AlphaFold model of the PPK2–SpyCatcher fusion. The SpyCatcher is predicted as a disordered region and PPK2 does not adopt its expected fold.",
        },
        {
          src: `${FIGURES}/ppk2-free-alphafold.png`,
          alt: "AlphaFold model of free PPK2, used as the reference fold.",
          caption:
            "AlphaFold model of free PPK2, predicted without any fusion, used as the reference against which the fusion model was compared. The predicted fold agrees with the structure described for BcPPK2-III [6].",
        },
      ],
    },
    {
      id: "spytag-spycatcher-round-2",
      continued: true,
      title: "Round 2: modelling the complete SpyTag/SpyCatcher system",
      body: [
        "The failure is not surprising once the nature of the system is considered. SpyTag and SpyCatcher are **two fragments of a single bacterial protein**, split by their designers into complementary halves; a model trained on natural proteins has no reason to fold one half correctly on its own. We therefore modelled each enzyme fused to the **complete SpyTag/SpyCatcher system**, each attached through the side that corresponds to it in the final construct, **PPK2 through the SpyCatcher and DHAK through the SpyTag**, and changed the prediction interface to **Boltz2** [7].",
        "This resolved it. **PPK2 with the complete system at its N-terminus** gave a good model, with the module well structured and PPK2 adopting a fold comparable to the published structure of the free enzyme. **DHAK was then remodelled with the complete system at its C-terminus**, also in Boltz2, and likewise matched free DHAK. With both partners modelled reliably, the two models were **superposed through their SpyTag/SpyCatcher interfaces in PyMOL**, giving a model of the assembled complex.",
      ],
      figuresColumns: 2,
      figures: [
        {
          src: `${FIGURES}/ppk2-spy-system-boltz2.png`,
          alt: "Boltz2 model of PPK2 carrying the complete SpyTag/SpyCatcher system at its N-terminus.",
          caption:
            "Boltz2 model of PPK2 carrying the complete SpyTag/SpyCatcher system at its N-terminus, attached through the SpyCatcher. The module is well structured and PPK2 adopts a fold comparable to the free enzyme.",
        },
        {
          src: `${FIGURES}/dhak-spy-system-boltz2.png`,
          alt: "Boltz2 model of DHAK carrying the complete SpyTag/SpyCatcher system at its C-terminus.",
          caption:
            "Boltz2 model of DHAK carrying the complete SpyTag/SpyCatcher system at its C-terminus, attached through the SpyTag.",
        },
        {
          src: `${FIGURES}/dhak-ppk2-complex.png`,
          alt: "Model of the assembled DHAK-PPK2 complex, superposed through the SpyTag/SpyCatcher interfaces.",
          caption:
            "Model of the assembled DHAK–PPK2 complex, obtained by superposing the SpyTag/SpyCatcher interfaces of the two Boltz2 models in PyMOL. PPK2 in blue, DHAK in green, SpyTag/SpyCatcher in yellow.",
        },
      ],
      interpretation:
        "The outcome is a **viable fusion geometry**: both enzymes keep their folds and the module joining them is structured rather than disordered. The method is worth recording in its own right, since the constructs are ultimately expressed as **separate proteins** that meet only on mixing, yet they can only be modelled as a complete unit. That is a limitation of the prediction tools rather than of the design, and future teams modelling split systems should expect it.",
      expectation:
        "The work remained **computational only**: the fusion was not expressed or tested experimentally.",
    },
  ],
};

const DESIGN_SUPPLEMENTARY: ResultData = {
  id: "design-supplementary",
  tabLabel: "Supplementary material",
  title: "Supplementary material",
  description:
    "Supporting files for the computational protein design rounds: the complete PROSS mutation list and the wild-type and stabilised DHAK sequences used for DSM 30040 and CECT 4626.",
  subsections: [],
  downloads: [
    {
      label: "PROSS list of mutations",
      href: "supplementary/revalorisation/supplementary-pross-list-of-mutations.pdf",
      format: "PDF",
    },
    {
      label: "DHAK wild type — DSM 30040",
      href: "supplementary/revalorisation/dhak-wt-dsm-30040-parts.dna",
      format: "DNA",
    },
    {
      label: "DHAK wild type — CECT 4626",
      href: "supplementary/revalorisation/dhak-wt-cect-4626.dna",
      format: "DNA",
    },
    {
      label: "DHAK PROSS — DSM 30040",
      href: "supplementary/revalorisation/dhak-pross-dsm-30040-parts.dna",
      format: "DNA",
    },
    {
      label: "DHAK PROSS — CECT 4626",
      href: "supplementary/revalorisation/dhak-pross-cect-4626.dna",
      format: "DNA",
    },
  ],
};

/* ---------- Enzyme expression ---------- */

const TRANSFORMATION: ResultData = {
  id: "gene-acquisition",
  tabLabel: "Transformation",
  title: "Gene acquisition and bacteria transformation",
  subsections: [
    {
      id: "transformation",
      figures: [
        {
          src: `${FIGURES}/bl21-transformation-plate.jpg`,
          alt: "Agar plate of BL21(DE3) transformed with the pET-28a(+) construct, with abundant well-separated colonies.",
          caption: "BL21(DE3) transformed with the pET-28a(+) construct.",
        },
      ],
      observations:
        "Both synthetic constructs, **DHAK WT** and **DHAK PROSS 5** in pET-28a(+), transformed into chemically competent BL21 (DE3) and gave abundant, well separated colonies under kanamycin selection. **PPK2** (BcPPK2-III) was transformed in parallel from its native sequence.",
      interpretation:
        "Both constructs entered the expression host at comparable efficiency from the same normalised input of 50 ng/µL, so the two DHAK variants start from equivalent material and a later difference between them cannot be blamed on the transformation. It also confirms that skipping propagation in a cloning strain was a safe shortcut for a construct delivered sequence verified.",
      expectation:
        "Yes. This stage was itself the response to an earlier failure. An initial attempt with a set of pre-existing strains **failed for DHAK**, because those cells carried a resistance marker other than kanamycin and did not survive kanamycin selection, while the PPK2 strains of the same collection grew normally. Re-ordering the gene as a fresh synthetic construct in a vector with a known marker removed that ambiguity rather than working around it, and the plates confirm it did.",
    },
  ],
};

const GROWTH: ResultData = {
  id: "transformant-growth",
  tabLabel: "Growth",
  title: "Selection and growth of transformants",
  subsections: [
    {
      id: "growth",
      observations:
        "Two colonies per construct were picked into 5 mL preinocula with kanamycin at 50 µg/mL, diluted about fiftyfold into 50 mL of LB and grown at 37 ºC and 180 rpm. Three of the four DHAK cultures reached the induction window as planned, at **OD₆₀₀ 0.5 to 0.7**, while one of the wild type cultures (WT1) was only caught at **OD₆₀₀ 0.9**.",
      interpretation:
        "The cultures are comparable, with one caveat that has to be carried forward: WT1 was induced later in its growth curve than the rest, so a lower yield in that particular flask would report the induction point and not the construct. Picking two colonies per construct is insurance against an unwanted mutation in one of them, and it is what allows a single anomalous flask to be set aside without restarting the stage.",
      expectation:
        "Partly. The window was met in three of four cultures. Overshooting OD₆₀₀ in one flask is a matter of sampling frequency rather than a failure of the protocol, and it is flagged here so that this flask is not read as a result about the wild type enzyme.",
    },
  ],
};

const INDUCTION: ResultData = {
  id: "induction",
  tabLabel: "Induction",
  title: "Induction of expression",
  subsections: [
    {
      id: "induction",
      observations:
        "All cultures were induced and grew on to the harvest without any visible problem, under both the standard condition (IPTG 0.4 mM, 30 ºC) and, later, the mild one (IPTG 0.2 mM, 20 ºC). The mild run comprised eight cultures: DHAK WT and DHAK PROSS 5 in triplicate at 20 ºC, plus two cultures of the recovered DHAK 2021 strain kept at 30 ºC as the reference. The cultures grew on after induction and reached the harvest without any visible problem.",
      interpretation:
        "The induction step itself is not the limiting factor of this block, since the same inducer, the same window and the same post induction regime delivered PPK2 and, as the gels below show, DHAK from the 2021 strain and DHAK PROSS 5. Whatever went wrong with the wild type construct happened downstream of switching transcription on.",
      expectation:
        "Yes at the standard condition, which was chosen to favour soluble over misfolded protein and behaved as intended at the level of the culture. The mild condition was not part of the original plan: it was added once the gels showed the soluble yield of the DHAK constructs was low, and it pushes the same rate-for-folding trade further.",
    },
  ],
};

const HARVEST: ResultData = {
  id: "harvest-lysis",
  tabLabel: "Harvest & lysis",
  title: "Harvest, lysis and crude extract",
  subsections: [
    {
      id: "biomass",
      body: [
        "Biomass was recorded for every culture by weighing the tared tubes before and after, to ±0.02 g.",
      ],
      tables: [
        {
          caption: "Biomass per culture, standard condition, 30 ºC.",
          headers: ["Culture", "Biomass (g)"],
          rows: [
            ["DHAK WT 1", "0.50"],
            ["DHAK WT 2", "0.59"],
            ["DHAK PROSS 5 · 1", "0.66"],
            ["DHAK PROSS 5 · 2", "0.70"],
          ],
        },
        {
          caption:
            "Biomass per culture, mild condition, 20 ºC, with the 2021 strain at 30 ºC.",
          headers: ["Culture", "Biomass (g)", "Buffer added"],
          rows: [
            ["DHAK WT 1", "0.70", "4 mL"],
            ["DHAK WT 2", "0.60", "4 mL"],
            ["DHAK WT 3", "0.57", "4 mL"],
            ["DHAK PROSS 5 · 1", "0.66", "3.5 mL"],
            ["DHAK PROSS 5 · 2", "0.47", "3.5 mL"],
            ["DHAK PROSS 5 · 3", "0.46", "3.5 mL"],
            ["DHAK 2021 · 1", "0.55", "3.5 mL"],
            ["DHAK 2021 · 2", "0.59", "3.5 mL"],
          ],
        },
      ],
      bodyAfter: [
        "Every pellet lysed: the suspension **visibly cleared during the 30 min lysozyme step**, and centrifugation gave a clear, only slightly turbid supernatant in every case.",
      ],
      interpretation:
        "Two things. First, biomass is not the problem. Every culture gave half a gram or more of cells, the PROSS 5 flasks slightly more than the wild type under the standard condition, so any shortfall in enzyme is a shortfall per gram of cells and not a shortfall of cells. Second, enzymatic lysis alone is sufficient for this material: because the lysate cleared and the extract came out clear, neither **sonication** nor **streptomycin sulfate precipitation** was needed. The practical consequence is that the missing signals reported below are not artefacts of a badly handled extract.",
      expectation:
        "Yes. The lysis route was adopted because it is gentler and more reproducible than mechanical disruption at this scale, and it behaved as intended. The insoluble pellets were kept at −20 ºC so that protein trapped in inclusion bodies could later be told apart from protein never made.",
    },
  ],
};

const SDS_PAGE: ResultData = {
  id: "sds-page-readout",
  tabLabel: "SDS-PAGE read-out",
  title: "Expression read-out by SDS-PAGE",
  description:
    "Production was read on polyacrylamide gels [9] of the crude extracts, which is where expression itself is visible. The gels are presented in the order they were run, because each one was the reason the next was needed. Some of these gels also carry purification fractions; those lanes are read in the purification block and are not discussed here.",
  subsections: [
    {
      id: "gel-1",
      title: "PPK2 expresses, the original DHAK wild type does not",
      figures: [
        {
          src: `${FIGURES}/sds-page-ppk2-wt.png`,
          alt: "SDS-PAGE of the crude extract of PPK2 and the original DHAK wild type.",
          caption:
            "SDS-PAGE of the crude extract of PPK2 and of the original DHAK wild type. Lane contents are given in the accompanying table.",
        },
      ],
      tables: [
        {
          headers: ["Lane", "Sample"],
          rows: [
            ["4", "Molecular mass markers"],
            ["5", "Crude extract, PPK2"],
            ["6", "Flow-through, PPK2 (purification block)"],
            ["7", "Dialysed IMAC eluate, PPK2 (purification block)"],
            ["9", "Crude extract, DHAK WT (1)"],
            ["10", "Crude extract, DHAK WT (2)"],
          ],
        },
      ],
      observations:
        "The first gel was run to confirm the production of PPK2, whose expression conditions had already been optimised by the host laboratory [6], so only the crude extract had to be checked. A band at the position expected for PPK2-III stands out over the normal pattern of host proteins in lane 5. The same gel also carried the crude extract of the original DHAK wild type in lanes 9 and 10, and there no band appears at the expected mass.",
      interpretation:
        "PPK2 and this strain were carried forward unchanged for the rest of the module. The route opened by the failure of the original DHAK wild type is followed in Engineering, Iteration 1.",
      expectation:
        "The PPK2 result was expected. The absence of the DHAK wild-type band was not.",
    },
    {
      id: "gel-2",
      title:
        "Confirming the wild-type failure and checking the designed variant",
      figures: [
        {
          src: `${FIGURES}/sds-page-dhak-wt-pross5.jpg`,
          alt: "SDS-PAGE of the crude extracts of DHAK WT and DHAK PROSS 5.",
          caption:
            "SDS-PAGE of the crude extracts of DHAK WT and DHAK PROSS 5. Lane contents are given in the accompanying table.",
        },
      ],
      tables: [
        {
          headers: ["Lane", "Sample"],
          rows: [
            ["1", "Not loaded"],
            ["2", "Crude extract, DHAK WT DSM 30040 (1)"],
            ["3", "Crude extract, DHAK WT DSM 30040 (2)"],
            ["4", "Crude extract, DHAK PROSS 5 (1)"],
            ["5", "Crude extract, DHAK PROSS 5 (2)"],
            ["6", "Molecular mass markers"],
            [
              "7",
              "DHAK WT DSM 30040, express purification eluates (1) (purification block)",
            ],
            [
              "8",
              "DHAK PROSS 5, express purification eluates (1) (purification block)",
            ],
            [
              "9",
              "DHAK WT DSM 30040, express purification eluates (2) (purification block)",
            ],
            [
              "10",
              "DHAK PROSS 5, express purification eluates (2) (purification block)",
            ],
          ],
        },
      ],
      observations:
        "Because the first gel gave no DHAK band, a second one was run with the crude extracts of DHAK WT and DHAK PROSS 5. For the wild type it confirms the first read-out, since its extracts again show only the host proteome with nothing at the expected mass. **DHAK PROSS 5 appears here for the first time and is clearly expressed**, accompanied by a contaminating band of higher molecular mass in the upper part of the gel.",
      interpretation:
        "Both results are checked again on the third gel. On the strength of this read-out, PROSS 5 was taken forward to purification and then to activity, on the same path as PPK2.",
      expectation:
        "The expression of PROSS 5 was the intended outcome. The persistent failure of the original wild type was unexpected.",
    },
    {
      id: "gel-3",
      title: "Introducing an alternative strain before discarding anything",
      figures: [
        {
          src: `${FIGURES}/sds-page-2021-pross5-wt.png`,
          alt: "SDS-PAGE of the DHAK CECT 4626 2021 strain, DHAK PROSS 5 and the original DHAK wild type.",
          caption:
            "SDS-PAGE of the crude extracts of the DHAK CECT 4626 2021 strain, DHAK PROSS 5 and the original DHAK wild type. Lane contents are given in the accompanying table.",
        },
      ],
      tables: [
        {
          headers: ["Lane", "Sample"],
          rows: [
            ["1", "Crude extract, DHAK CECT 4626 2021 (1)"],
            ["2", "Crude extract, DHAK CECT 4626 2021 (2)"],
            ["3", "Crude extract, DHAK PROSS 5"],
            ["4", "Crude extract, DHAK WT (1)"],
            ["5", "Crude extract, DHAK WT (2)"],
            ["6", "Molecular mass markers"],
            ["7", "IMAC eluates, DHAK CECT 4626 2021 (1) (purification block)"],
            ["8", "IMAC eluates, DHAK CECT 4626 2021 (2) (purification block)"],
            ["9", "IMAC eluate, DHAK PROSS 5 (purification block)"],
            ["10", "IMAC eluates, DHAK WT (1) (purification block)"],
            ["11", "IMAC eluates, DHAK WT (2) (purification block)"],
            ["12", "Dialysed IMAC eluate, DHAK PROSS 5 (purification block)"],
          ],
        },
      ],
      observations:
        "Rather than discard the original wild type on two gels alone, a third gel was run in which the alternative DHAK CECT 4626 was loaded for the first time. The new 2021 strain in lanes 1 and 2 shows no band either; PROSS 5 in lane 3 is confirmed as expressing, again with the higher-mass contaminant; and the original wild type in lanes 4 and 5 is confirmed as not expressing.",
      interpretation:
        "Neither of the two silent constructs was discarded on this evidence. The absence of a band was weighed against the activity of their crude extracts, and only then was the original wild type definitively set aside. The same applies to the 2021 strain, whose fate was likewise left to the activity measurements.",
      expectation:
        "The 2021 stock was chosen because the host laboratory had shown it to be the most active DHAK available and because the more recent material was expected to have suffered less from long-term storage. Its missing band was therefore unexpected.",
    },
    {
      id: "gel-4",
      title: "Confirming expression of the CECT 4626 2012 stock",
      figures: [
        {
          src: `${FIGURES}/sds-page-2012-imac.png`,
          alt: "SDS-PAGE of DHAK CECT 4626 2012 crude extract and its IMAC eluates.",
          caption:
            "SDS-PAGE of the crude extract of DHAK CECT 4626 2012 and of the two fractions eluted from its purification by IMAC. The crude extract shows the band expected for DHAK at 60 kDa.",
        },
      ],
      tables: [
        {
          headers: ["Lane", "Sample"],
          rows: [
            ["1", "Molecular mass markers"],
            ["2", "CFE, crude extract of DHAK CECT 4626 2012"],
            ["3", "F-1, IMAC eluate (purification block)"],
            ["4", "F-2, IMAC eluate after dialysis (purification block)"],
          ],
        },
      ],
      observations:
        "Until this point the expression of the CECT 4626 2012 stock had been taken for granted from its activity, without being checked on a gel. The gel run on the preparation that fed the coupled reaction closes that gap. The crude extract shows a distinct band at the mass expected for DHAK [10], standing out over the dense host pattern that fills the rest of the lane.",
      interpretation:
        "This confirms directly what the activity had already indicated indirectly: this strain produces the enzyme in appreciable amount. The same gel carries the two fractions eluted from its purification, which are read in the purification block.",
      expectation:
        "The result was expected. This is the only one of the four DHAK constructs examined on a gel that gives the expected expression read-out.",
    },
    {
      id: "gel-5",
      title: "Confirming PPK2 expression in the assay preparation",
      figures: [
        {
          src: `${FIGURES}/sds-page-ppk2-imac.png`,
          alt: "SDS-PAGE of PPK2 crude extract and its IMAC eluates.",
          caption:
            "SDS-PAGE of the crude extract of PPK2 and of the two fractions eluted from its purification by IMAC. The crude extract shows the band expected for PPK2 at 32 kDa.",
        },
      ],
      tables: [
        {
          headers: ["Lane", "Sample"],
          rows: [
            ["1", "Molecular mass markers"],
            ["2", "CFE, crude extract of PPK2"],
            ["3", "F-1, IMAC eluate (purification block)"],
            ["4", "F-2, IMAC eluate after dialysis (purification block)"],
          ],
        },
      ],
      observations:
        "The PPK2 crude extract gives a band at 32 kDa, the mass calculated for the tagged subunit. The band is modest against the host background, which is consistent with a construct expressed in soluble form at a level sufficient for the assay rather than one that dominates the lysate.",
      interpretation:
        "Since the enzyme is used in catalytic support of DHAK and not as the measured species, that level was taken as adequate and the construct was carried straight to purification.",
      expectation:
        "The result was expected and confirms that the behaviour already optimised by the host laboratory was reproduced here.",
    },
  ],
  discussion: [
    "For DHAK nothing went as planned. The original wild type was checked twice before its missing band was accepted. The CECT 4626 2021 stock also gave no visible band. DHAK PROSS 5 expressed strongly on both gels in which it was loaded, but with a contaminating protein of higher molecular mass whose identity remains unresolved.",
    "The five gels establish that the production routine works, since the same protocol gave clear bands for PPK2, PROSS 5 and the 2012 stock while the other constructs gave none. They do not prove that nothing was made by the silent constructs, because a gel resolves only what is abundant and a weakly expressed enzyme can still be active.",
    "With time and material limited, the silent constructs were carried forward to the activity assays, where turnover was read directly. PROSS 5 moved on to purification and activity alongside PPK2. The choice of the reference DHAK against which the designed variant would be judged was settled in the activity block, not here.",
  ],
};

/* ---------- Enzyme purification ---------- */

const PURIFICATION_IMAC: ResultData = {
  id: "purification-imac",
  tabLabel: "IMAC",
  title: "Immobilised Metal Affinity Chromatography (Co²⁺-IDA-Agarose)",
  subsections: [
    {
      id: "imac-result",
      body: [
        "Dialysis is reported together with IMAC rather than as an independent experiment, because it is the step that immediately follows elution: every eluate goes straight into a dialysis bag, and the same gel carries the affinity fractions and the dialysed sample. Separating them would split one gel across two sections and lose the comparison that makes the dialysis result visible. The affinity step follows the procedure established in this laboratory for related His-tagged enzymes [11].",
        "For PPK2, the crude extract gives the expected band at 32 kDa, and the dialysed IMAC eluate retains that band while removing most of the host-protein background. PPK2 was therefore retained by the Co²⁺ resin and recovered as the dominant species in the dialysed eluate.",
        "For the first DHAK affinity run, the wild-type and CECT 4626 2021 eluates were empty because their crude extracts contained no visible target protein. PROSS 5 did bind and elute, but it consistently appeared together with an unidentified band of higher molecular mass. Dialysis visibly concentrated that preparation but did not separate the two species.",
        "The previous gel allowed the affinity step to be judged only on PROSS 5, because that was the one construct with enough protein on it. Returning to IMAC with the 2012 stock, now with an enzyme known to be strongly active at the outset, finally gives that reading. The crude extract carried the full host background, whereas the two eluted fractions carried a dominant band at 60 kDa and had lost most of the host species. The first fraction was more concentrated, as expected. Two minor species remained, so the preparation was enriched rather than homogeneous.",
        "What this establishes is that the affinity step works on this enzyme too: the resin retains it and gives it back. The step was not quantified, since no flow-through or wash lane was run and the gel was not loaded on equal protein, so neither loss to the resin nor recovery can be stated from the image.",
      ],
      figuresColumns: 2,
      figures: [
        {
          src: `${FIGURES}/sds-page-ppk2-purification.png`,
          alt: "SDS-PAGE of the PPK2 purification, with crude extract, flow-through and dialysed eluate.",
          caption: "SDS-PAGE of the PPK2 purification.",
        },
        {
          src: `${FIGURES}/sds-page-ppk2-imac-2.png`,
          alt: "SDS-PAGE of the second IMAC purification of PPK2.",
          caption:
            "SDS-PAGE of the second IMAC purification of PPK2, the preparation used in the second round of the coupled reaction. The eluate shows the band expected for PPK2 at 32 kDa, and the dialysed sample shows the same band and the same host species at higher intensity.",
        },
        {
          src: `${FIGURES}/sds-page-dhak-purifications.png`,
          alt: "SDS-PAGE of the DHAK purifications.",
          caption: "SDS-PAGE of the DHAK purifications.",
        },
        {
          src: `${FIGURES}/sds-page-2012-imac.png`,
          alt: "SDS-PAGE of the IMAC purification of the DHAK CECT 4626 2012 stock.",
          caption:
            "SDS-PAGE of the IMAC purification of the DHAK CECT 4626 2012 stock. The two eluted fractions show the band expected for DHAK at 60 kDa.",
        },
      ],
      interpretation:
        "The affinity step worked whenever target protein was present. PPK2 supplied a preparation clean enough for the coupled assay; the unidentified upper PROSS 5 band remained unresolved, and the 2012 stock required activity measurements to determine whether purification had preserved function.",
      expectation:
        "PPK2 purified as intended. DHAK recovery was construct-dependent and prompted activity-led troubleshooting.",
    },
  ],
};

const PURIFICATION_DIALYSIS: ResultData = {
  id: "purification-dialysis",
  tabLabel: "Dialysis",
  title: "Dialysis of IMAC eluates",
  subsections: [
    {
      id: "dialysis-result",
      body: [
        "Every IMAC eluate went directly into dialysis to remove imidazole and salt before activity measurement. The dialysed samples were compared on the same gels as the crude extracts and affinity fractions, rather than treated as a separate experiment.",
        "Dialysis removed the small-molecule components of the elution buffer and visibly concentrated the PROSS 5 preparation on the gel. The same buffer-exchange step was used for PPK2 and for the later CECT 4626 2012 preparations.",
      ],
      interpretation:
        "Dialysis functioned as both buffer exchange and a practical concentration step before activity measurement.",
      expectation:
        "The buffer exchange was expected; the concentrating effect was not.",
    },
  ],
};

const PURIFICATION_EXPRESS_IMAC: ResultData = {
  id: "purification-express-imac",
  tabLabel: "Express IMAC",
  title: "Express Immobilised Metal Affinity Chromatography (Co²⁺-IDA-Agarose)",
  subsections: [
    {
      id: "express-imac-result",
      figures: [
        {
          src: `${FIGURES}/sds-page-express-imac.jpeg`,
          alt: "SDS-PAGE of the express IMAC of DHAK.",
          caption: "SDS-PAGE of the express IMAC of DHAK.",
        },
      ],
      figuresAside: true,
      body: [
        "The express IMAC was run to settle a single question: when a DHAK construct yields nothing after purification, is it because the enzyme was never made, or because the purification is losing it?",
        "DHAK PROSS 5 appeared in its eluates as the only intense species, accompanied by the same unidentified second band seen on the preparative gel, so the resin binds it and gives it back. The wild type appeared nowhere, neither in its crude extract nor in its eluates.",
        "Taken together, the two observations separate the two possibilities. Because the resin recovers the protein whenever the protein is there, the affinity step itself is working, and because the wild type is absent from its own extract before any resin is involved, its failure must lie in expression rather than in purification. The express protocol obtained that discrimination from microlitre volumes in a fraction of the time a full column run would have taken.",
      ],
      interpretation:
        "The affinity step was working; the wild-type failure lay in expression rather than purification.",
      expectation:
        "That the test would resolve the ambiguity was expected; that it would resolve it against the construct was not.",
    },
  ],
};

const PURIFICATION_SEC: ResultData = {
  id: "purification-sec",
  tabLabel: "SEC (FPLC)",
  title: "Size-exclusion chromatography (FPLC)",
  subsections: [
    {
      id: "sec-result",
      body: [
        "Four runs were performed and are reported in chronological order as runs 1 to 4. For each one the full chromatogram was examined together with an enlargement of the region from which fractions were collected.",
        "Three reference volumes make the traces interpretable. On this column the void volume is about 110 mL, where everything too large to enter the pores elutes together, and the total volume is about 320 mL, where small molecules that fully penetrate the matrix elute. Between them, DHAK is expected at approximately 220–270 mL.",
        "Run 1 was almost empty in absorbance terms. The whole trace stayed below 7.5 mAU, and the collected region showed three faint shoulders rather than resolved peaks. A very low rise near 290 mL lay past the DHAK window and close to the total volume, so it was unlikely to correspond to a protein of this size.",
        "Run 2 gave real absorbance for the first time, but most of it fell outside the region of interest. The collected DHAK window contained a broad, poorly defined feature rather than a narrow symmetric peak. The dominant peak at about 288 mL and a later one at about 330 mL indicated that most of what left the column was small-molecule material from the crude extract.",
        "Run 3 was the only one that behaved as size exclusion should. A narrow, symmetric peak fell squarely inside the 220–270 mL window, with a clean return to baseline on both sides. The run was nonetheless lost because the fraction collector was started after the peak had already left the system, so no fraction could be assayed.",
        "Run 4 showed a candidate peak at about 261 mL, inside the DHAK window, but it overlapped with a much larger peak near 290 mL. The overlap limited the purity obtainable, while the void peak indicated that more of this sample had aggregated.",
        "In the three runs that produced real absorbance, most of the signal eluted near the total volume and little appeared in the expected DHAK window. The chromatograms show that the separation was not reproducible, not that the enzyme was absent, so fractions from runs 1, 2 and 4 were carried to the activity assays.",
      ],
      figuresColumns: 2,
      figures: [
        {
          src: `${FIGURES}/sec-run1-full.png`,
          alt: "Full chromatogram of size-exclusion run 1.",
          caption:
            "Full chromatogram of run 1 (A₂₈₀ against elution volume, 0–306 mL).",
        },
        {
          src: `${FIGURES}/sec-run1-zoom.png`,
          alt: "Enlargement of the collected region of size-exclusion run 1.",
          caption: "Enlargement of the collected region of run 1.",
        },
        {
          src: `${FIGURES}/sec-run2-full.png`,
          alt: "Full chromatogram of size-exclusion run 2.",
          caption: "Full chromatogram of run 2 (0–395 mL).",
        },
        {
          src: `${FIGURES}/sec-run2-zoom.png`,
          alt: "Enlargement of the collected region of size-exclusion run 2.",
          caption: "Enlargement of the collected region of run 2.",
        },
        {
          src: `${FIGURES}/sec-run3-full.png`,
          alt: "Full chromatogram of size-exclusion run 3.",
          caption: "Full chromatogram of run 3 (0–340 mL).",
        },
        {
          src: `${FIGURES}/sec-run3-zoom.png`,
          alt: "Enlargement of the collected region of size-exclusion run 3.",
          caption: "Enlargement of the collected region of run 3.",
        },
        {
          src: `${FIGURES}/sec-run4-full.png`,
          alt: "Full chromatogram of size-exclusion run 4.",
          caption: "Full chromatogram of run 4 (0–414 mL).",
        },
        {
          src: `${FIGURES}/sec-run4-zoom.png`,
          alt: "Enlargement of the collected region of size-exclusion run 4.",
          caption: "Enlargement of the collected region of run 4.",
        },
      ],
      interpretation:
        "Size exclusion did not provide a reliable second route to purified DHAK. Fractions were carried into the activity assay to decide whether any active enzyme had nevertheless been recovered.",
      expectation:
        "None of this was expected. The method never stabilised, and the only clean separation was lost to a fraction collector started too late. With no time to develop it further, the work returned to IMAC.",
    },
  ],
};

const PURIFIED_2012_STOCK: ResultData = {
  id: "purified-2012-stock",
  tabLabel: "Purifying the 2012 stock",
  title: "Purifying the CECT 4626 2012 stock",
  subsections: [
    {
      id: "sec-fractions",
      title: "Size-exclusion fractions",
      body: [
        "The crude extract was active, so the next question was whether that activity survived purification. Both routes were applied to this material and the fractions assayed by the same coupled α-GDH/TIM method, so the results are directly comparable with the extract they came from.",
        "In run 1, fraction 27 gave −8.40 mOD/min with R² = 0.957, while fraction 46 gave −1.51 mOD/min with R² = 0.571 and fraction 56 −0.16 mOD/min with R² = 0.035. Nothing usable was recovered: the only fitted rate was two orders of magnitude below the extract loaded, and the other traces were noise.",
        "Run 2 was different. Fraction 46 gave −42.91 mOD/min with R² = 0.998, the steepest and cleanest trace obtained from any size-exclusion fraction in the study, and fraction 27 gave −16.64 mOD/min with R² = 0.989. Fraction 56 remained inactive at −0.16 mOD/min with R² = 0.035. Activity appeared in the two fractions taken from the protein region and was absent from the late fraction, although recovery remained modest against the starting extract.",
        "Run 3 produced no sample because its well-resolved peak passed into waste before fraction collection began. In run 4, the collected peak gave −11.12 mOD/min with R² = 0.566, too poor a fit to extract a reliable rate. A method that yielded active fractions in one run and nothing in the next could not be relied on with the time left.",
      ],
      figuresColumns: 3,
      figures: [
        {
          src: `${FIGURES}/sec-run1-fraction27.png`,
          alt: "Coupled assay trace of fraction 27 from size-exclusion run 1.",
          caption:
            "Coupled α-GDH/TIM assay of fraction 27 from size-exclusion run 1. Initial rate −8.40 mOD/min (R² = 0.957).",
        },
        {
          src: `${FIGURES}/sec-run1-fraction46.png`,
          alt: "Coupled assay trace of fraction 46 from size-exclusion run 1.",
          caption:
            "Coupled assay of fraction 46 from run 1. The fitted slope (−1.51 mOD/min) has R² = 0.571, so no rate can be extracted.",
        },
        {
          src: `${FIGURES}/sec-run1-fraction56.png`,
          alt: "Coupled assay trace of fraction 56 from size-exclusion run 1.",
          caption:
            "Coupled assay of fraction 56 from run 1. The trace is flat; the fitted slope (−0.16 mOD/min) has R² = 0.035.",
        },
        {
          src: `${FIGURES}/sec-run2-fraction46.png`,
          alt: "Coupled assay trace of fraction 46 from size-exclusion run 2, the most active fraction.",
          caption:
            "Coupled assay of fraction 46 from size-exclusion run 2, the most active purified fraction of the series. Initial rate −42.91 mOD/min (R² = 0.998).",
        },
        {
          src: `${FIGURES}/sec-run2-fraction27.png`,
          alt: "Coupled assay trace of fraction 27 from size-exclusion run 2.",
          caption:
            "Coupled assay of fraction 27 from run 2. Initial rate −16.64 mOD/min (R² = 0.989).",
        },
        {
          src: `${FIGURES}/sec-run2-fraction56.png`,
          alt: "Coupled assay trace of fraction 56 from size-exclusion run 2.",
          caption:
            "Coupled assay of fraction 56 from run 2. The trace is flat (−0.16 mOD/min, R² = 0.035), as expected for material eluting past the total volume of the column.",
        },
        {
          src: `${FIGURES}/sec-run4-fraction.png`,
          alt: "Coupled assay trace of the peak collected in size-exclusion run 4.",
          caption:
            "Coupled assay of the peak collected in size-exclusion run 4. The fitted slope (−11.12 mOD/min) has R² = 0.566, so no reliable rate can be extracted.",
        },
      ],
    },
    {
      id: "imac-return",
      title: "Returning to affinity purification",
      figuresAside: true,
      figures: [
        {
          src: `${FIGURES}/dhak-2012-dialysed-imac-inactive.png`,
          alt: "Coupled assay trace of the dialysed IMAC eluate of the 2012 stock, with almost no fall in absorbance.",
          caption:
            "Coupled assay of the dialysed IMAC eluate of the CECT 4626 2012 stock, after returning to the affinity route. The fit is clean but the signal barely falls (−1.41 mOD/min, R² = 0.928): no measurable activity.",
        },
      ],
      body: [
        "The affinity route had never been tried on this stock. The enzyme was purified by IMAC and the dialysed eluate assayed. The trace gave −1.41 mOD/min with R² = 0.928: a clean fit on a signal that barely falls, which amounts to no measurable activity.",
        "Read together, the eight traces make the problem specific rather than general. The enzyme is clearly active in the crude extract, and in run 2 it is also active in fractions from the protein region. What it does not do is survive purification reproducibly: of the eight purified fractions assayed across the two methods, two were active and six were not. This was not expected, and it is why the decision to work with the crude extract directly was forced rather than merely preferred.",
      ],
    },
  ],
};

const ACTIVE_DIALYSED_IMAC: ResultData = {
  id: "active-dialysed-imac",
  tabLabel: "Active IMAC eluate",
  title: "Dialysed IMAC eluate, DHAK CECT 4626 2012 stock",
  description:
    "This was a separate preparation produced from a fresh expression of the same 2012 stock and concentrated by centrifugal ultrafiltration after dialysis. The difference from the earlier inactive eluate was not controlled, so the comparison is descriptive rather than causal.",
  subsections: [
    {
      id: "active-imac-result",
      body: [
        "Before setting up the coupled assay with purified enzyme, the dialysed IMAC eluate concentrated by Centricon was assayed on its own, so that the amount of active DHAK entering the reaction was known rather than assumed. The trace gave an initial rate of **850.1 mOD/min** (R² = 0.999), equivalent to approximately **20 U/mL**. Bradford against a BSA standard curve gave **1.990 mg/mL** of protein, so the specific activity was approximately **10 U/mg**.",
        "This is the measurement that was missing from the purification line: an affinity preparation of this enzyme that is active. At approximately 10 U/mg, its specific activity is essentially the 10.7 U/mg reported for the fully purified enzyme [10]. The eluate was concentrated by centrifugal ultrafiltration rather than left dilute, so activity was retained and concentrated instead of lost.",
        "The result was not expected in light of the earlier purification failures. It made it possible to run the coupled assay with purified enzyme, with a known amount of DHAK entering the reaction.",
      ],
      tables: [
        {
          caption:
            "Protein quantification of the purified DHAK preparation (IMAC + Centricon) by the Bradford assay, against a BSA standard curve.",
          headers: [
            "Sample",
            "Absorbance (A₅₉₅, mean)",
            "Protein (mg/mL)",
            "Standard curve R²",
          ],
          rows: [
            [
              "DHAK purified (IMAC + Centricon), 2 µL",
              "0.269",
              "1.990",
              "0.994",
            ],
          ],
        },
      ],
    },
  ],
};

/* ---------- Enzyme activity assay ---------- */

const DHAK_DSM: ResultData = {
  id: "dhak-dsm-30040",
  tabLabel: "DHAK DSM 30040",
  title: "DHAK wild type (*Citrobacter freundii* DSM 30040)",
  subsections: [
    {
      id: "dsm-activity",
      figures: [
        {
          src: `${FIGURES}/dhak-activity-dsm30040.png`,
          alt: "Absorbance at 340 nm against time for the DSM 30040 variant, a shallow linear fall.",
          caption:
            "DHAK activity assay of the wild type from *C. freundii* DSM 30040, the reference variant ordered from the PDB 1UN9 sequence. Coupled α-GDH/TIM assay; the fall in A₃₄₀ gives an initial rate of only 3.73 mOD/min (R² = 0.991).",
        },
      ],
      observations:
        "In the coupled α-GDH/TIM assay the absorbance at 340 nm fell **only slightly**, giving an initial rate of **3.73 mOD/min** (R² = 0.991), equivalent to a DHAP formation rate of about **0.60 nmol/min**. The fit is clean but the slope is far shallower than any of the CECT 4626 preparations.",
      interpretation:
        "This enzyme was **only weakly active**. A linear but shallow trace points to a **low amount of functional DHAK** rather than to a failed assay, since the reaction and the coupling system behaved normally.",
      expectation:
        "**No.** This is the **reference variant** of *C. freundii* DHAK, the sequence crystallised as PDB 1UN9 (strain DSM 30040), ordered as a synthetic gene. Its low activity, set against the much higher activity of the **CECT 4626** variant, is consistent with the two being **distinct natural variants** that differ at 22 residues, the CECT 4626 one being the more catalytically efficient [3]. This led us to move to the CECT 4626 variant kept in the laboratory.",
    },
  ],
};

const DHAK_2021: ResultData = {
  id: "dhak-cect-2021",
  tabLabel: "CECT 4626, 2021",
  title: "DHAK wild type (*Citrobacter freundii* CECT 4626, 2021 stock)",
  subsections: [
    {
      id: "cect-2021-activity",
      figures: [
        {
          src: `${FIGURES}/dhak-activity-cect4626-2021.png`,
          alt: "Absorbance at 340 nm against time for the CECT 4626 2021 stock, showing a flat trace.",
          caption:
            "DHAK activity assay of the CECT 4626 variant, 2021 stock, cell-free extract. The trace is flat (−0.080 mOD/min; R² = 0.035), so no activity can be measured.",
        },
      ],
      observations:
        "The absorbance at 340 nm **stayed flat** for the whole read. The fitted slope was **−0.080 mOD/min with R² = 0.035**, so no reliable rate can be extracted and the extract showed **no measurable DHAK activity**. This agrees with the expression gel, where the 2021 stock gave no band.",
      interpretation:
        "This preparation is **clearly active**, and already **several-fold more active than the DSM 30040 variant**, confirming that the change of variant was the right move. The rate is still modest, which pointed us to look for a better-performing stock of the same enzyme before committing to downstream work.",
      expectation:
        "**No.** CECT 4626 is described as the most catalytically efficient DHAK reported to date [3], so the flat trace points to the state of this preparation, not to the enzyme's biochemistry. The **2021 stock was discarded** as the reference and the older 2012 material was tested next.",
    },
  ],
};

const DHAK_2012: ResultData = {
  id: "dhak-cect-2012",
  tabLabel: "CECT 4626, 2012",
  title: "DHAK wild type (*Citrobacter freundii* CECT 4626, 2012 stock)",
  subsections: [
    {
      id: "cect-2012-first-batch",
      observations:
        "The cell-free extract of the 2012 stock gave the **steepest trace of the whole study**, an initial rate of **581.1 mOD/min** (R² = 1.00), equal to **93.4 nmol DHAP/min** and a volumetric activity of **~18.7 U/mL** from 5 µL assayed. The rate and the volumetric activity depend only on the assay and the volume of extract added, not on any protein measurement, and by both the preparation is **far more active than any other DHAK tested** in this work. The protein concentration, however, **could not be measured reliably**. The Bradford [13] readings sat just above the assay blank (standard-curve intercept 0.319), at the lower limit of the determination, and the two sample volumes **did not agree**: the 1 µL and 5 µL loads gave **1.35 and 0.37 mg/mL**, values that should coincide for the same extract and instead differ about fourfold. Because the concentration is not trustworthy, **no specific activity (U/mg) can be assigned** to this extract, and any figure derived from this Bradford would carry that error.",
    },
    {
      id: "cect-2012-working-batch",
      continued: true,
      body: [
        "We then tried to **purify** this enzyme, but the **protein peak was repeatedly lost during FPLC**; re-expressing the enzyme and purifying again led once more to a **loss of activity after purification**. These purification attempts are explained above in the *Purification* section of this page.",
        "Faced with this, we decided **not to purify the enzyme and to work with the CFE directly**. A fresh CFE preparation was assayed and gave **good, reliable activity**, an initial rate of **198.5 mOD/min** (R² = 1.00), i.e. **31.9 nmol DHAP/min** and **~6.4 U/mL** (5 µL assayed). This is lower than the first exceptional batch but solidly active, and it is the **preparation used in all the coupled DHAK–PPK2 experiments**. The two CFE measurements compare as follows.",
      ],
      tables: [
        {
          caption:
            "Activity parameters of the two cell-free extract (CFE) preparations of *C. freundii* CECT 4626 DHAK (2012 stock), measured by the coupled α-GDH/TIM assay with 5 µL of extract.",
          headers: [
            "Parameter",
            "CFE, first batch",
            "CFE, working batch — used in coupled assay",
          ],
          rows: [
            ["Initial rate, Vmax", "**581.1 mOD/min**", "**198.5 mOD/min**"],
            ["R²", "1.00", "1.00"],
            ["DHAP formation rate", "**93.4 nmol/min**", "**31.9 nmol/min**"],
            [
              "Volumetric activity (5 µL assayed)",
              "**18.7 U/mL**",
              "**6.4 U/mL**",
            ],
            ["Protein (Bradford)", "not reliably determined", "not measured"],
            ["Specific activity", "not determined", "not determined"],
          ],
        },
      ],
    },
    {
      id: "cect-2012-figures",
      continued: true,
      figures: [
        {
          src: `${FIGURES}/dhak-activity-cect4626-2012-cfe.png`,
          alt: "Absorbance at 340 nm against time for the first batch of 2012 cell-free extract, the steepest trace of the series.",
          caption:
            "DHAK activity assay of the CECT 4626 variant, 2012 stock, cell-free extract, first batch. Steepest trace of the series: initial rate 581.1 mOD/min (R² = 1.00), about 93.4 nmol DHAP/min and ~18.7 U/mL (5 µL assayed).",
        },
        {
          src: `${FIGURES}/dhak-activity-cect4626-2012-purified.png`,
          alt: "Absorbance at 340 nm against time for the working batch of 2012 cell-free extract used in the coupled assay.",
          caption:
            "DHAK activity assay of the CECT 4626 variant, 2012 stock, working cell-free extract used in the coupled assay (re-expressed, after purification was found not to be viable). Initial rate 198.5 mOD/min (R² = 1.00), about 31.9 nmol DHAP/min and ~6.4 U/mL (5 µL assayed).",
        },
        {
          src: `${FIGURES}/bradford-2012-cfe.png`,
          alt: "Bradford standard curve of BSA used to quantify the protein in the first batch of 2012 cell-free extract.",
          caption:
            "Bradford protein quantification of the DHAK crude extract at two sample volumes, against a BSA standard curve (y = 0.319 + 0.020·x, R² = 0.994). The 1 µL and 5 µL loads give inconsistent values and sit close to the assay blank, so no reliable concentration could be assigned.",
        },
      ],
      interpretation:
        "What the experiment does establish is **clear from the activity trace alone**. The 2012 extract is the **only DHAK preparation that is strongly and cleanly active** (R² = 1.00), and its rate towers over the flat traces of the DSM 30040 wild type and the 2021 stock. That is consistent with CECT 4626 being the **most catalytically efficient DHAK reported** [10], and it is enough to select this stock as the **reference enzyme for the rest of the module**, through purification and into the coupled assay with PPK2.",
      expectation:
        "**Partly.** High activity in the CFE was expected from such a strongly expressing stock; the **repeated purification failures were not**, and they are the reason the decision below was forced rather than merely preferred. Losing a protein peak or activity on purification can happen with enzymes sensitive to the chromatography or concentration steps, as explained above in the *Purification* section of this page. Because purification repeatedly failed while the CFE stayed active and simpler to prepare, we kept the DHAK in CFE form. This choice is also backed by previous work on related multienzyme systems, where a cell-free extract containing the overexpressed enzyme was as effective as the purified protein and made the expensive purification step unnecessary, saving time and resources. We therefore used the CFE for all subsequent coupled DHAK–PPK2 experiments.",
    },
  ],
};

const DHAK_PROSS: ResultData = {
  id: "dhak-pross-5",
  tabLabel: "DHAK PROSS 5",
  title: "DHAK PROSS 5 variant",
  subsections: [
    {
      id: "pross-activity",
      figures: [
        {
          src: `${FIGURES}/dhak-activity-pross5.png`,
          alt: "Absorbance at 340 nm against time for the PROSS design 5 variant, an essentially flat trace.",
          caption:
            "DHAK activity assay of the PROSS design 5 variant. A₃₄₀ stays essentially flat and the fitted slope (0.92 mOD/min) has R² = 0.374, so no activity can be reliably measured.",
        },
      ],
      observations:
        "The absorbance at 340 nm **stayed essentially flat**. The fitted slope of **0.92 mOD/min** has **R² = 0.374**, so **no reliable rate** can be extracted.",
      interpretation:
        "The PROSS design 5 variant showed **no measurable kinase activity**. Whatever stability the design may have gained **came at the cost of function**.",
      expectation:
        "**No.** Design 5 sat in the **middle of the conservative-to-aggressive range** PROSS returned, and we expected it to keep activity comparable to the wild type. The loss of activity indicated that its **mutation load was too high** and likely disturbed the geometry around the active site or the packing between domains, even with the ligand-contact residues protected. This **sent us back to a more conservative PROSS variant**, now being tested, while the CECT 4626 wild type is used in the meantime.",
    },
  ],
};

const COUPLED_ASSAY: ResultData = {
  id: "coupled-assay",
  tabLabel: "Coupled assay",
  title: "Coupled DHAK–PPK2 assay, ATP regeneration from polyphosphate",
  subsections: [
    {
      id: "coupled-assay",
      observations:
        "The coupled reaction was run with DHAK cell-free extract and purified PPK2, **50 mM DHA**, **1.7 mM ATP**, and polyphosphate at **45 mM (R1)** or **90 mM (R2)**. With **0.30 mM NADH in the well** and the 1:4 sample dilution, the determination could measure only up to **1.2 mM DHAP in the reaction**. Every reaction sample exhausted the NADH and reached that ceiling.",
      tables: [
        {
          caption:
            "Coupled DHAK–PPK2 endpoint assay. ΔA₃₄₀ (before − after α-GDH/TIM) for the reaction samples (R1 = 45 mM polyP, R2 = 90 mM polyP, at 90 and 180 min) and the DHAP standards; every reaction sample reaches full NADH consumption, matching the 50 mM standard.",
          headers: ["Sample", "Before", "After", "ΔA₃₄₀"],
          rows: [
            ["DHAP 50 mM (standard)", "1.254", "0.236", "1.018"],
            ["R1 (45 mM polyP) 90 min", "1.105", "0.151", "0.954"],
            ["R1 (45 mM polyP) 180 min", "1.170", "0.087", "1.083"],
            ["R2 (90 mM polyP) 90 min", "1.166", "0.193", "0.973"],
            ["R2 (90 mM polyP) 180 min", "1.205", "0.148", "1.057"],
          ],
        },
      ],
      interpretation:
        "The saturated signal **cannot be read as a concentration**. Its 1.2 mM ceiling lies **below the 1.7 mM ATP supplied**, so this round establishes only that DHAP was formed in every condition; it **cannot demonstrate ATP regeneration or turnover greater than one**. The endpoint determination was therefore redesigned with a much smaller aliquot.",
      expectation:
        "**Partly.** The coupled system ran, but the assay ceiling was placed incorrectly and could not answer the regeneration question. The proof of concept comes from round 2.",
    },
  ],
};

const COUPLED_ASSAY_ROUND_2: ResultData = {
  id: "coupled-assay-round-2",
  tabLabel: "Coupled assay — round 2",
  title: "Coupled DHAK–PPK2 assay, round 2 with purified enzymes",
  subsections: [
    {
      id: "coupled-assay-round-2",
      observations:
        "For this round PPK2 was **produced again** and purified by IMAC. Its protein was **1.331 mg/mL** by Bradford and, taking the host-laboratory specific activity as the reference (**2 U/mg** for the ADP-to-ATP reaction [6]), the stock stands at **~2.2 U/mL**, so **0.63 U of PPK2** entered the reaction. The coupled reaction was then run with **both enzymes purified**, **3 U of DHAK** and **0.63 U of PPK2**, **50 mM DHA** and a **substoichiometric 1.7 mM ATP**. Polyphosphate was supplied **fed-batch**, in seven additions over the first hour, reaching a final **16.9 mM chains (R1)** and **50.4 mM chains (R2)**; at an average of 12 phosphate units per chain, those feeds carry **202.8 mM and 604.8 mM of transferable phosphate**. A **much smaller sample volume per well** kept the endpoint α-GDH/TIM determination within the linear range, so the 25 and 50 mM DHAP standards now gave distinct, unsaturated signals.",
      figures: [
        {
          src: `${FIGURES}/coupled-dhap-standard-curve.png`,
          alt: "DHAP standard curve for the round-2 endpoint assay, with the linear fit through the 0, 25 and 50 mM standards.",
          caption:
            "DHAP standard curve for the coupled DHAK–PPK2 endpoint assay (round 2). DHAP concentration plotted against the fall in absorbance at 340 nm (ΔA₃₄₀, before minus after addition of α-GDH/TIM), from the 0, 25 and 50 mM DHAP standards. The linear fit, DHAP (mM) = 58.521·ΔA₃₄₀ − 1.4123 (R² ≈ 0.999), was used to convert the ΔA₃₄₀ of each reaction sample into DHAP.",
        },
      ],
      figuresAside: true,
      tables: [
        {
          caption:
            "Coupled DHAK–PPK2 endpoint assay with both enzymes purified. A₃₄₀ before and after addition of α-GDH/TIM, with DHAP interpolated against the 25 and 50 mM standards. Polyphosphate is given as millimolar chains, and the phosphate column converts it at 12 phosphate units per chain. Conversion is referred to the 50 mM dihydroxyacetone supplied.",
          headers: [
            "Sample",
            "A₃₄₀ before",
            "A₃₄₀ after",
            "ΔA₃₄₀",
            "DHAP (mM)",
            "Conversion of DHA",
            "Phosphate supplied (mM)",
            "Phosphate transferred",
          ],
          rows: [
            ["Control (−)", "0.897", "0.878", "0.019", "0.00", "—", "—", "—"],
            [
              "DHAP 25 mM (standard)",
              "0.914",
              "0.452",
              "0.462",
              "25.00",
              "—",
              "—",
              "—",
            ],
            [
              "DHAP 50 mM (standard)",
              "0.917",
              "0.044",
              "0.873",
              "50.00",
              "—",
              "—",
              "—",
            ],
            [
              "R1 (16.9 mM polyP chains, 1.5 h)",
              "0.941",
              "0.636",
              "0.305",
              "16.44",
              "**32.9%**",
              "202.8",
              "**8.1%**",
            ],
            [
              "R2 (50.4 mM polyP chains, 1.5 h)",
              "0.934",
              "0.070",
              "0.864",
              "49.15",
              "**98.3%**",
              "604.8",
              "**8.1%**",
            ],
          ],
        },
      ],
      interpretation:
        "R1 formed **16.44 mM DHAP** and R2 formed **49.15 mM DHAP**, which is **32.9% and 98.3% conversion of the 50 mM dihydroxyacetone**, with R2 reaching essentially full conversion of the substrate. Because only **1.7 mM ATP** was supplied, these amounts required that the **ATP be regenerated**, with the nucleotide pool recycled **about 10 times in R1 and about 29 times in R2**, obtained by dividing the DHAP formed by the ATP supplied. Polyphosphate was in **large excess in both conditions**: only about **8% of the phosphate supplied** was transferred in either case, so the donor was never close to being exhausted and the limit on R1 was the **amount of polyphosphate fed**, not the amount of phosphate still available within it. That is what the larger feed in R2 changed, carrying the conversion from a third of the substrate to near-complete.",
      expectation:
        "This is the result round 1 could not give. There, the sample volume drove every well to full NADH consumption, so the signal sat at the ceiling and no value could be read. With the **smaller aliquot** and both enzymes **purified**, the determination is linear, the standards resolve, and the DHAP formed is measured directly. The coupled system therefore **regenerates ATP** and sustains DHAK turnover **far beyond the nucleotide added at the start**, and the extent **scales with the polyphosphate supplied**.",
    },
  ],
};

export const REVALORISATION_SUBBLOCKS: ResultSubBlock[] = [
  {
    id: "computational-design",
    heading: "1. Computational protein design",
    intro:
      "Computational design served two purposes: a **DHAK that is more stable without losing activity**, and a **physical coupling of DHAK and PPK2** so that regenerated ATP passes directly from one active site to the other. The stabilisation line was first run on the reference DHAK and then rebuilt on the active variant once the activity assays had identified it, and the coupling line explored a **SpyTag/SpyCatcher fusion** in silico.",
    results: [
      DESIGN_DSM,
      DESIGN_CECT,
      DESIGN_CHANNELLING,
      DESIGN_SUPPLEMENTARY,
    ].map(asNarrative),
    outro:
      "**Conclusion.** Computational design delivered two outputs for the next build round. First, a **conservative PROSS stabilising set (design 1, 21 substitutions)** transferred onto the **active CECT 4626 DHAK**, chosen after the mid-range design 5 on the DSM 30040 reference proved inactive at the bench. The construct was synthesised, transformed and **expressed**, but the gene arrived late enough that **no activity measurement could be made before the wiki freeze**, so nothing is claimed here about whether the stabilisation works. Second, an **in silico model of a SpyTag/SpyCatcher-fused DHAK–PPK2 complex** with both folds preserved and a structured joining module, supporting direct channelling of the ATP intermediate. Both are **predictions awaiting experimental test**, and the transformed strain is available for a future team to take straight to expression.",
  },
  {
    id: "expression",
    heading: "2. Enzyme expression",
    intro:
      "The module needs DHAK and PPK2 produced in house, and it needs the **wild type** and the stabilised **PROSS 5** variant of DHAK made under identical conditions so that the comparison between them means something. This is where the producing strains are built, the induction conditions are fixed and production is first read out.",
    results: [TRANSFORMATION, GROWTH, INDUCTION, HARVEST, SDS_PAGE].map(
      asNarrative,
    ),
    outro: [
      "**Conclusion.** This sub-block **delivered** a working production routine: fresh constructs transformed under a known kanamycin marker, reproducible growth and induction, ample biomass, and enzymatic lysis alone giving a clear crude extract, so any missing signal reports on the construct rather than on the handling. **PPK2** was confirmed as expressed and carried forward unchanged, and **DHAK PROSS 5** expressed well, always with an unidentified contaminant of higher molecular mass.",
      "What it **did not deliver** is the comparison it was built for: neither the original **DHAK wild type nor the CECT 4626 2021** stock gave a visible band. Both are therefore taken to the activity assays, where it is decided whether they are discarded; and a further **CECT 4626 stock** is assayed in parallel to decide whether it can serve as the reference enzyme.",
    ],
  },
  {
    id: "purification",
    heading: "3. Enzyme purification",
    intro: [
      "The module needs each enzyme in a preparation clean enough to measure activity without interference, not a homogeneous protein. This is where the affinity step and the dialysis that follows it are applied to PPK2 and to DHAK, where a reduced-scale version of the same step is used to tell a purification problem apart from an expression one, and where size exclusion is tested as a route independent of metal affinity.",
      "The gels read in this block are the same ones shown in the expression block. There they were read for how much enzyme each construct produces; here they are read again for how that enzyme behaves through the purification, which is what the flow-through, eluate and dialysate lanes report. The activity of the fractions obtained by each route is reported in the activity block.",
    ],
    results: [
      PURIFICATION_IMAC,
      PURIFICATION_DIALYSIS,
      PURIFICATION_EXPRESS_IMAC,
      PURIFICATION_SEC,
    ].map(asNarrative),
  },
  {
    id: "activity",
    heading: "4. Enzyme activity assay",
    intro:
      "The revalorisation module depends on **two enzymatic activities working together**, the phosphorylation of dihydroxyacetone by DHAK and the regeneration of ATP by PPK2. We tested them in two steps. First, DHAK was assayed on its own to confirm that the purified enzyme is catalytically active and to fix a baseline rate. Then the two enzymes were run together, with **polyphosphate as the phosphate donor**, to test the system as it is meant to operate, where **PPK2 rebuilds the ATP that DHAK spends** so that the reaction is no longer limited by the small amount of nucleotide added at the start. Both assays read out the same product, dihydroxyacetone phosphate (DHAP), through the coupled α-GDH/TIM reaction, which ties the NADH signal to the DHAP formed and lets the single-enzyme and coupled results be compared on the same scale.",
    results: [
      DHAK_DSM,
      DHAK_2021,
      DHAK_2012,
      DHAK_PROSS,
      PURIFIED_2012_STOCK,
      ACTIVE_DIALYSED_IMAC,
      COUPLED_ASSAY,
      COUPLED_ASSAY_ROUND_2,
    ].map(asNarrative),
    outro: [
      "**Conclusion.** The activity work delivered an **active DHAK preparation** and a **coupled DHAK–PPK2 system that recycles its ATP pool**.",
      "The working enzyme was the **CECT 4626 variant, 2012 stock**, reaching **~10 U/mg** as a purified preparation, close to the **10.7 U/mg reported for the fully purified enzyme** [10]. The **DSM 30040 reference** was too weakly active to serve as a control, which is what removed the comparison the module had been built around. Of the two PROSS-stabilised variants, **design 5 lost all measurable activity**, and the more conservative **design 1 was expressed but not assayed**, since it arrived too late in the season for the activity measurement. No conclusion is drawn here about whether PROSS stabilisation of this enzyme works.",
      "The decisive test coupled **purified DHAK to purified PPK2** with polyphosphate as the phosphoryl donor. A first round on cell-free extract saturated the endpoint determination, so DHAP could only be bounded below rather than measured. The assay was redesigned with a smaller aliquot per well and repeated with both enzymes purified. With **1.7 mM ATP supplied**, the reaction formed **16.44 and 49.15 mM DHAP** at the two polyphosphate feeds, which corresponds to the nucleotide pool turning over about **10 and 29 times**.",
      "**Two limits qualify this.** The determination was run **once per condition at a single time point**, with no replicates and no uncertainty attached to the figures. And the experiment **carries no condition lacking PPK2**, so the ATP recycling is inferred from the stoichiometry of the nucleotide supplied rather than measured against a non-regenerating control. Both are the first things a future round should close.",
      "Within those limits, the **module works as designed**. **DHAK phosphorylates dihydroxyacetone, PPK2 rebuilds the ATP it spends from polyphosphate**, and conversion scales with the polyphosphate supplied.",
    ],
  },
];

export const REVALORISATION_OUTRO = [
  "**The module delivers a working two-enzyme reaction.** DHAK phosphorylates dihydroxyacetone, PPK2 rebuilds the ATP that DHAK spends, and the phosphate comes from inorganic polyphosphate rather than from a stoichiometric nucleotide feed. This is the step the whole project rests on, and it runs.",
  "The nucleotide budget is what proves it. The reaction was supplied with **1.7 mM ATP** and formed **49.15 mM of DHAP**, so each ATP molecule was used and rebuilt close to **thirty times**. A system that consumed its nucleotide would have stopped at 1.7 mM. The ATP here behaves as a **catalyst, not a reagent**, which is what makes this chemistry affordable outside a laboratory.",
  "Two things are missing. Every figure quoted here comes from a **single determination**, so the numbers are solid as a demonstration and provisional as a measurement. And the **DHAK variant stabilised with the PROSS algorithm** was expressed but never assayed, so the question that justified the whole design round, whether the computational stabilisation improves the enzyme, is still open. Replicating the coupled reaction and measuring that variant against the wild type are the next iteration.",
];

export const REVALORISATION_REFERENCES = [
  "[1] Goldenzweig A, Goldsmith M, Hill SE, Gertman O, Laurino P, Ashani Y, et al. Automated Structure- and Sequence-Based design of proteins for high bacterial expression and stability. Molecular Cell [Internet]. 2016 Jul 1;63(2):337–46. Available from: https://doi.org/10.1016/j.molcel.2016.06.012",
  "[2] Siebold C, Arnold I, Garcia-Alles LF, Baumann U, Erni B. Crystal Structure of the Citrobacter freundii Dihydroxyacetone Kinase Reveals an Eight-stranded α-Helical Barrel ATP-binding Domain. Journal of Biological Chemistry [Internet]. 2003 Nov 1;278(48):48236–44. Available from: https://doi.org/10.1074/jbc.m305942200",
  "[3] Schrödinger, LLC. The PyMOL Molecular Graphics System [software]. Version 2.5. New York: Schrödinger, LLC; 2021.",
  "[4] Keeble AH, Howarth M. Power to the protein: enhancing and combining activities using the Spy toolbox. Chemical Science [Internet]. 2020 Jan 1;11(28):7281–91. Available from: https://doi.org/10.1039/d0sc01878c",
  "[5] Jumper J, Evans R, Pritzel A, Green T, Figurnov M, Ronneberger O, et al. Highly accurate protein structure prediction with AlphaFold. Nature [Internet]. 2021 Jul 15;596(7873):583–9. Available from: https://doi.org/10.1038/s41586-021-03819-2",
  "[6] Monterrey DT, Azcona L, Revuelta J, Sánchez-Moreno I, García-Junceda E. Polyphosphate Kinase from Burkholderia cenocepacia, One Enzyme Catalyzing a Two-Step Cascade Reaction to Synthesize ATP from AMP. International Journal of Molecular Sciences [Internet]. 2024 Dec 3;25(23):12995. Available from: https://doi.org/10.3390/ijms252312995",
  "[7] Passaro S, Corso G, Wohlwend J, Reveiz M, Thaler S, Somnath VR, et al. Boltz-2: towards accurate and efficient binding affinity prediction. bioRxiv (Cold Spring Harbor Laboratory) [Internet]. 2025 Jun 18; Available from: https://doi.org/10.1101/2025.06.14.659707",
  "[8] Sambrook J, Russell DW. Molecular cloning: a laboratory manual. 3rd ed. Cold Spring Harbor (NY): Cold Spring Harbor Laboratory Press; 2001.",
  "[9] Laemmli UK. Cleavage of Structural Proteins during the Assembly of the Head of Bacteriophage T4. Nature [Internet]. 1970 Aug 1;227(5259):680–5. Available from: https://doi.org/10.1038/227680a0",
  "[10] Sánchez-Moreno I. Dihidroxiacetona quinasa de Citrobacter freundii CECT 4626: una aproximación integral a un nuevo biocatalizador para la formación de enlaces C–C [doctoral thesis]. Madrid: Universidad Autónoma de Madrid; 2009. http://hdl.handle.net/10486/3594",
  "[11] Bastida A, Fernández-Mayoralas A, Gómez Arrayás R, Iradier F, Carretero JC, García-Junceda E. Heterologous over-expression of α-1,6-fucosyltransferase from Rhizobium sp. Chem Eur J. 2001;7(11):2390-6. Available from: https://doi.org/10.1002/1521-3765(20010601)7:11<2390::AID-CHEM23900>3.0.CO;2-0",
  "[12] Gauss D, Sánchez‐Moreno I, Oroz‐Guinea I, García‐Junceda E, Wohlgemuth R. Phosphorylation catalyzed by dihydroxyacetone kinase. European Journal of Organic Chemistry [Internet]. 2018 Mar 25;2018(23):2892–5. Available from: https://doi.org/10.1002/ejoc.201800350",
  "[13] Bradford M. A rapid and sensitive method for the quantitation of microgram quantities of protein utilizing the principle of Protein-Dye binding. Analytical Biochemistry [Internet]. 1976 May 1;72(1–2):248–54. Available from: https://doi.org/10.1006/abio.1976.9999",
  "[14] Sánchez-Moreno I, Benito-Arenas R, Montero-Calle P, Hermida C, García-Junceda E, Fernández-Mayoralas A. Simple and Practical Multigram Synthesis of d-Xylonate Using a Recombinant Xylose Dehydrogenase. ACS Omega [Internet]. 2019 Jun 18;4(6):10593–8. Available from: https://doi.org/10.1021/acsomega.9b01090",
];
