import type {
  ResultData,
  ResultSubBlock,
} from "../../components/LabFolders/types";

/**
 * Revalorisation results, transcribed from the team's own Notion results
 * page ("Revalorisation", under WIKI / Results). The four sub-blocks,
 * their order, the numbered steps that become folder tabs and the record
 * titles all follow that page, and so does the order of prose, figures
 * and tables inside each record.
 *
 * Figure and table numbers are not written into the captions: they are
 * assigned in reading order by numbering.ts, which here reproduces the
 * source's own 1-44 / 1-19 sequences. The "(Figure n)" and "(Table n)"
 * pointers inside the prose are the source's own and were checked
 * against that sequence.
 *
 * "Engineering, Iteration n" is a cross-reference to the Engineering
 * page and is written as a link, which is how the source marks it.
 */

const FIGURES = "assets/results/revalorisation";

export const REVALORISATION_INTRO = [
  "This page reports the outcomes of the revalorisation work: designing a stabilised DHAK and a fused DHAK–PPK2 complex in silico, producing both enzymes in *E. coli* BL21(DE3) from gene to clarified cell-free extract, purifying them, and measuring the activity of each enzyme alone and of the two coupled, where PPK2 regenerates from polyphosphate the ATP that DHAK spends to phosphorylate dihydroxyacetone. The design and rationale of each step are on the Experiments page (see [Experiments](/experiments)).",
  "Each entry below reports the outcome of the corresponding step on the Experiments page, following the same order and titles. For every step we answer three questions: what was obtained, what it means, and whether it matched what we expected. Within each block the results are given in the order they were obtained, because each one decided what was tried next.",
];

/* ---------- 1. Computational protein design ---------- */

const DESIGN_DSM: ResultData = {
  id: "design-dhak-dsm-30040",
  tabLabel: "PROSS cycle 1",
  title: "In silico stabilisation of DHAK from *C. freundii* DSM 30040",
  narrative: true,
  enzymes: ["DHAK"],
  subsections: [
    {
      id: "pross-cycle-1",
      body: [
        "Running **PROSS** on the DSM 30040 reference sequence returned **nine candidate designs**, ranging from a conservative **21 substitutions (3.9% of the sequence)** to an aggressive **119 (22.2%)** [1] (Table 1). The multiple-sequence alignment behind the design was **deep and well-covered**, with over **3,000 homologous sequences**, coverage above 95% for almost all of them and sequence identity concentrated between **40% and 60%** (Figure 1), a broad but informative evolutionary sampling for the stability predictions.",
      ],
      pair: "table-figure",
      tables: [
        {
          caption:
            "PROSS designs returned for DHAK from *C. freundii* DSM 30040, from the most conservative (21 substitutions) to the most aggressive (119). **Design 5**, a mid-range option with 56 substitutions (10.4%), was selected for expression. The full list of substitutions for every design is given in *Supplementary_PROSS_list_of_mutations*.",
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
    },
    {
      id: "pross-cycle-1-msa",
      continued: true,
      body: [
        "**Why design 5.** The nine designs form a ladder, and the standard way to sample it is to order three constructs, one conservative, one intermediate and one aggressive, so that the trade-off between predicted stability and mutational load can be read directly from the bench. **Our budget allowed a single synthetic gene**, so the ladder had to be sampled once. We chose **design 5 (56 substitutions, 10.4%)** as a **mid-range compromise** between predicted stability gain and mutational load, and carried it forward with the wild type as reference ([Engineering, Iteration 4](/engineering#revalorisation)). A conservative design risks gaining too little stability to measure, an aggressive one risks losing function outright, and the middle of the range is the position from which either outcome would still be informative.",
        "**Checking the design before ordering it.** The design was superposed on the wild-type structure in PyMOL [2,3] (Figure 2). The **overall fold is unchanged**, with the K- and L-domains and the dimer interface preserved, and **none of the residues within 4 Å of AMP-PNP, DHA or Mg²⁺ carries a substitution**: the mutations sit on the surface and in the second shell, away from the catalytic and cofactor-binding regions. The server did what it was instructed to do, and the construct entered the bench round as a structurally conservative change on paper. The final sequence is given in *Suplementary_DHAK-PROSS_DMS 30040.dna*.",
      ],
    },
    {
      id: "pross-cycle-1-structure",
      continued: true,
      figures: [
        {
          src: `${FIGURES}/dhak-pross5-mutations.png`,
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
        "That the fold is preserved and the active site untouched is the minimum condition for a design to be worth testing, and it was met. What it does not establish is function: a model superposes well because the backbone is predicted to fold the same way, not because the enzyme still turns over substrate. **Design 5 proved inactive when expressed** (see [Activity](#activity)), which is not a contradiction of this result but its limit, and it is what redirected the stabilisation effort onto the active CECT 4626 variant.",
    },
    {
      id: "pross-cycle-1-note",
      continued: true,
      body: [
        "One process note for future teams: the PROSS server was down on the first attempt and the run had to be repeated, so the selected design comes from the second submission.",
      ],
    },
  ],
};

const DESIGN_CECT: ResultData = {
  id: "design-dhak-cect-4626",
  tabLabel: "PROSS cycle 2",
  title: "In silico stabilisation of DHAK CECT 4626",
  narrative: true,
  enzymes: ["DHAK"],
  subsections: [
    {
      id: "pross-cycle-2",
      body: [
        "**Why a second design, and why on a different sequence.** Two results forced this round. Design 5 showed no measurable activity, so the mutational load carried on the reference sequence had disturbed function. More decisive, the **wild-type DSM 30040 construct was not expressing**, which left us with **no working control**: without an active reference we could not tell whether the inactivity came from the mutations or from the purification. The host laboratory already had an active DHAK, the **CECT 4626** variant, which had been shown to express and work. Moving the stabilisation onto that sequence was not a preference but the only route to a comparison that means anything, since a stabilised variant can only be judged against a wild type that works.",
        "**Why the most conservative design.** Again only one construct could be ordered, and two considerations pointed the same way. The first is the lesson from design 5: 56 substitutions were enough to abolish activity, so the next attempt had to carry far fewer. The second is specific to this round. The final construct does not carry the PROSS mutations alone; it carries them **on top of the ~22 positions at which CECT 4626 naturally differs** from the sequence the design was generated on, so the two sources of variation compound. Choosing **design 1 (21 substitutions, 3.9%)**, the most conservative of the nine, keeps the number of changes added on top of those natural differences to a minimum, so that the stabilised construct stays as close as possible to a sequence already known to be active ([Engineering, Iteration 5](/engineering#revalorisation)).",
        "**Result of the transfer.** The transfer was done position by position between the PROSS 1 design and the natural CECT 4626 sequence, and every differing position was assigned to one of three classes (Figure 3): **natural differences between the two strains**, **PROSS substitutions**, and **positions where a natural difference coincides with a PROSS substitution**. This third class is the most informative, since there the algorithm proposed a residue that evolution had already fixed in the active variant; those positions need no mutation at all and are the best-supported part of the design. A **codon-optimised gene** was generated and ordered for synthesis; the final sequence is given in *Suplementary_DHAK-PROSS-CECT4626.dna*.",
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
  tabLabel: "Channelling",
  title: "Channelling the biocatalytic complex (SpyTag/SpyCatcher)",
  narrative: true,
  enzymes: ["DHAK", "PPK2"],
  subsections: [
    {
      id: "spy-intro",
      body: [
        "To channel the ATP intermediate directly between the two enzymes, the DHAK–PPK2 pair was modelled *in silico* as a SpyTag/SpyCatcher fusion [4], with the SpyTag on DHAK and the SpyCatcher on PPK2.",
      ],
    },
    {
      id: "spy-round-1",
      title: "Round 1: each enzyme fused to its own element",
      body: [
        "In the first round each enzyme was modelled carrying only its half of the system ([Engineering, Iteration 11](/engineering#revalorisation)). **DHAK with the SpyTag at the N-terminus was predicted cleanly by AlphaFold [5]**: the enzyme adopts its expected fold and the tag protrudes as a **disordered extension**, which is what a short peptide of that kind should look like (Figure 4). Superposing the model on the crystal structure of the wild-type enzyme in PyMOL confirms that the fusion leaves the fold unchanged (Figure 5). The reference used for this comparison is the DSM 30040 variant, since no crystal structure is available for CECT 4626.",
      ],
      figuresColumns: 2,
      figures: [
        {
          src: `${FIGURES}/dhak-spytag-alphafold.png`,
          alt: "AlphaFold model of DHAK fused to the SpyTag at its N-terminus.",
          caption:
            "AlphaFold model of the DHAK-SpyTag fusion. The enzyme adopts its expected fold and the SpyTag protrudes from the N-terminus as a disordered extension.",
        },
        {
          src: `${FIGURES}/dhak-spytag-superposed.png`,
          alt: "The DHAK-SpyTag model superposed on the wild-type DHAK crystal structure.",
          caption:
            "The same model (lightpink) superposed in PyMOL on the crystal structure of wild-type DHAK from *C. freundii* DSM 30040, PDB 1UN9 (lightblue). The two structures overlay closely, so the fusion does not disturb the fold.",
        },
      ],
    },
    {
      id: "spy-round-1-ppk2",
      continued: true,
      body: [
        "**PPK2 with the SpyCatcher at the N-terminus could not be predicted reliably.** AlphaFold returned a model in which the SpyCatcher was disordered and, more seriously, PPK2 itself did not resemble the free enzyme (Figures 6 and 7), so nothing about the geometry of the complex could be judged from it.",
      ],
      figuresColumns: 2,
      figures: [
        {
          src: `${FIGURES}/ppk2-spycatcher-alphafold.png`,
          alt: "AlphaFold model of PPK2 fused to the SpyCatcher, with both the module and the enzyme poorly predicted.",
          caption:
            "AlphaFold model of the PPK2-SpyCatcher fusion. The SpyCatcher is predicted as a disordered region and PPK2 does not adopt its expected fold.",
        },
        {
          src: `${FIGURES}/ppk2-free-alphafold.png`,
          alt: "AlphaFold model of free PPK2, used as the reference for the fusion model.",
          caption:
            "AlphaFold model of free PPK2, predicted without any fusion, used as the reference against which the fusion model was compared. The predicted fold agrees with the structure described for BcPPK2-III [6].",
        },
      ],
    },
    {
      id: "spy-round-1-reading",
      continued: true,
      body: [
        "The contrast between the two enzymes is informative: a short peptide can be appended to a folded enzyme without disturbing the prediction, but a whole domain cannot. That half of the round failed was not expected, and it is what prompted the change of strategy below ([Engineering, Iteration 12](/engineering#revalorisation)).",
      ],
    },
    {
      id: "spy-round-2",
      title: "Round 2: modelling the complete SpyTag/SpyCatcher system",
      body: [
        "The failure is not surprising once the nature of the system is considered. SpyTag and SpyCatcher are **two fragments of a single bacterial protein**, split by their designers into complementary halves; a model trained on natural proteins has no reason to fold one half correctly on its own. We therefore modelled each enzyme fused to the **complete SpyTag/SpyCatcher system**, each attached through the side that corresponds to it in the final construct, **PPK2 through the SpyCatcher and DHAK through the SpyTag**, and changed the prediction interface to **Boltz2** [7].",
        "This resolved it ([Engineering, Iteration 12](/engineering#revalorisation)). **PPK2 with the complete system at its N-terminus** gave a good model, with the module well structured and PPK2 adopting a fold comparable to the published structure of the free enzyme (Figure 8). **DHAK was then remodelled with the complete system at its C-terminus**, also in Boltz2, and likewise matched free DHAK (Figure 9). With both partners modelled reliably, the two models were **superposed through their SpyTag/SpyCatcher interfaces in PyMOL**, giving a model of the assembled complex (Figure 10).",
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
      ],
    },
    {
      id: "spy-complex",
      continued: true,
      figures: [
        {
          src: `${FIGURES}/dhak-ppk2-complex.png`,
          alt: "Model of the assembled DHAK–PPK2 complex obtained by superposing the two Boltz2 models through their SpyTag/SpyCatcher interfaces.",
          caption:
            "Model of the assembled DHAK–PPK2 complex, obtained by superposing the SpyTag/SpyCatcher interfaces of the two Boltz2 models in PyMOL. PPK2 in blue, DHAK in green, SpyTag/SpyCatcher in yellow.",
        },
      ],
      interpretation:
        "The outcome is a **viable fusion geometry**: both enzymes keep their folds and the module joining them is structured rather than disordered. The method is worth recording in its own right, since the constructs are ultimately expressed as **separate proteins** that meet only on mixing, yet they can only be modelled as a complete unit. That is a limitation of the prediction tools rather than of the design, and future teams modelling split systems should expect it.",
    },
  ],
};

const DESIGN_SUPPLEMENTARY: ResultData = {
  id: "design-supplementary",
  tabLabel: "Supplementary material",
  tabVariant: "supplementary",
  title: "Supplementary material",
  narrative: true,
  description:
    "The files the computational design rounds refer to: the complete PROSS mutation list, and the wild-type and stabilised DHAK sequences for DSM 30040 and CECT 4626.",
  subsections: [],
  downloads: [
    {
      label: "Suplementary_PROSS_list_of_mutations",
      href: "https://static.igem.wiki/teams/6124/wiki/suplementary/supplementary-pross-list-of-mutations.pdf",
      format: "PDF",
    },
    {
      label: "Suplementary_DHAK-wt_DMS_30040_parts",
      href: "supplementary/revalorisation/dhak-wt-dsm-30040-parts.dna",
      format: "DNA",
    },
    {
      label: "Suplementary_DHAK-WT_CECT_4626",
      href: "supplementary/revalorisation/dhak-wt-cect-4626.dna",
      format: "DNA",
    },
    {
      label: "Suplementary_DHAK-PROSS_DMS 30040",
      href: "supplementary/revalorisation/dhak-pross-dsm-30040-parts.dna",
      format: "DNA",
    },
    {
      label: "Suplementary_DHAK-PROSS-CECT4626",
      href: "supplementary/revalorisation/dhak-pross-cect-4626.dna",
      format: "DNA",
    },
  ],
};

/* ---------- 2. Enzyme expression ---------- */

const TRANSFORMATION: ResultData = {
  id: "gene-acquisition",
  tabLabel: "Transformation",
  title: "Gene acquisition and bacteria transformation",
  narrative: true,
  enzymes: ["DHAK", "PPK2"],
  subsections: [
    {
      id: "transformation",
      body: [
        "Both synthetic constructs, **DHAK WT** and **DHAK PROSS 5** in pET-28a(+), were transformed into chemically competent BL21 (DE3) [8] and gave abundant, well separated colonies under kanamycin selection. **PPK2** (BcPPK2-III) was transformed in parallel from its native sequence (Figure 11).",
      ],
      interpretation:
        "Both constructs entered the expression host at comparable efficiency from the same normalised input of 50 ng/µL, so the two DHAK variants start from equivalent material and any later difference between them cannot be blamed on the transformation. It also confirms that skipping propagation in a cloning strain was a safe shortcut for a sequence-verified construct.",
      expectation:
        "This was expected, since the stage was itself the response to an earlier failure. An initial attempt with a set of pre-existing strains **failed for DHAK**, because those cells carried a resistance marker other than kanamycin and did not survive kanamycin selection, while the PPK2 strains of the same collection grew normally. Re-ordering the gene as a fresh synthetic construct in a vector with a known marker removed that ambiguity rather than working around it, and the plates confirm it did.",
    },
    {
      id: "transformation-plate",
      continued: true,
      figures: [
        {
          src: `${FIGURES}/bl21-transformation-plate.png`,
          alt: "LB-kanamycin plate streaked with BL21(DE3) transformed with the expression construct.",
          caption:
            "BL21(DE3) transformed with the expression construct, streaked on LB-kanamycin.",
        },
      ],
    },
  ],
};

const GROWTH: ResultData = {
  id: "transformant-growth",
  tabLabel: "Selection",
  title: "Selection and growth of transformants",
  narrative: true,
  enzymes: ["DHAK", "PPK2"],
  subsections: [
    {
      id: "growth",
      body: [
        "Two colonies per construct were picked into 5 mL pre-inocula with kanamycin at 50 µg/mL, diluted about fiftyfold into 50 mL of LB and grown at 37 °C and 180 rpm. Three of the four DHAK cultures reached the induction window as planned, at **OD₆₀₀ 0.5–0.7**, while one wild-type culture (WT1) was only caught at **OD₆₀₀ 0.9**.",
      ],
      interpretation:
        "The cultures are comparable, with one caveat carried forward: WT1 was induced later in its growth curve than the rest, so a lower yield in that flask would report the induction point and not the construct. Picking two colonies per construct is insurance against an unwanted mutation in one of them, and it is what allows a single anomalous flask to be set aside without restarting the stage.",
      expectation:
        "This matched expectations only partly. Overshooting the window in one flask is a matter of sampling frequency rather than a failure of the protocol, and it is flagged here so that this flask is not read as a result about the wild-type enzyme.",
    },
  ],
};

const INDUCTION: ResultData = {
  id: "induction",
  tabLabel: "Induction",
  title: "Induction of expression",
  narrative: true,
  enzymes: ["DHAK", "PPK2"],
  subsections: [
    {
      id: "induction",
      body: [
        "All cultures were induced and grew on to harvest without visible problems under the standard condition, **IPTG 0.4 mM at 30 °C**. The recovered **CECT 4626 2021** strain was taken through the same condition in a later batch.",
      ],
      interpretation:
        "Induction is not the limiting step of this block. The same inducer, the same window and the same post-induction regime delivered PPK2 and, as the gels below show, DHAK PROSS 5 and the 2021 strain. Whatever went wrong with the wild-type construct happened downstream of switching transcription on.",
      expectation:
        "The standard condition behaved as intended and was expected to, since it already trades rate for folding.",
    },
  ],
};

const HARVEST: ResultData = {
  id: "harvest-lysis",
  tabLabel: "Obtaining CFE",
  title: "Harvest, lysis and crude extract",
  narrative: true,
  enzymes: ["DHAK", "PPK2"],
  subsections: [
    {
      id: "biomass",
      body: [
        "Biomass was recorded for every culture by weighing the tared tubes before and after harvesting, to ±0.02 g (Table 2). The two cultures of the recovered **CECT 4626 2021** strain, grown in a later batch under the same condition, gave **0.55 and 0.59 g**. Resuspension volumes were **scaled to the pellet, 3.5 to 4 mL per tube**, so that all extracts entered lysis at a comparable cell density.",
      ],
      tables: [
        {
          caption:
            "**Wet biomass recovered from the cultures induced under the standard condition (30 °C).** Tubes were tared and weighed before and after harvesting, so every value is a wet cell mass to ±0.02 g.",
          headers: ["Culture", "Biomass (g)"],
          rows: [
            ["DHAK WT 1", "0.50"],
            ["DHAK WT 2", "0.59"],
            ["DHAK PROSS 5 · 1", "0.66"],
            ["DHAK PROSS 5 · 2", "0.70"],
          ],
        },
      ],
      bodyAfter: [
        "Every pellet lysed: the suspension **visibly cleared during the 30 min lysozyme step**, and centrifugation gave a clear, only slightly turbid supernatant in every case.",
      ],
      interpretation:
        "Two conclusions follow. **Biomass is not the problem**: every culture gave half a gram or more of cells, and under the standard condition the PROSS 5 flasks gave slightly more than the wild type (Table 2), so any shortfall in enzyme is a shortfall per gram of cells and not a shortfall of cells. And **enzymatic lysis alone is sufficient** for this material: because the lysate cleared and the extract came out clear, neither sonication nor streptomycin-sulfate precipitation was needed. The practical consequence is that the missing signals reported below are not artefacts of a badly handled extract.",
      expectation:
        "This was expected. The lysis route was adopted because it is gentler and more reproducible than mechanical disruption at this scale, and it behaved as intended. The insoluble pellets were kept at −20 °C so that protein trapped in inclusion bodies could later be told apart from protein never made.",
    },
    {
      id: "cfe-gel",
      title:
        "Confirming the wild-type failure and checking the designed variant",
      body: [
        "Because the first gel gave no DHAK band, a second one was run with the crude extracts of **DHAK WT and DHAK PROSS 5** (Figure 12, Table 3). For the wild type it confirms the first read-out, since its extracts again show only the host proteome with nothing at the expected mass. **DHAK PROSS 5** appears here for the first time, and it is clearly expressed, accompanied by a contaminating band of higher molecular mass in the upper part of the gel. Both results are checked again on the third gel. On the strength of this read-out, PROSS 5 was taken forward to purification and then to activity, on the same path as PPK2.",
      ],
      figuresColumns: 2,
      figures: [
        {
          src: `${FIGURES}/sds-page-dhak-wt-pross5.png`,
          alt: "SDS-PAGE of the crude extracts of DHAK WT and DHAK PROSS 5.",
          caption: "",
        },
        {
          src: `${FIGURES}/sds-page-dhak-wt-pross5-b.png`,
          alt: "The same SDS-PAGE of the crude extracts of DHAK WT and DHAK PROSS 5, second image.",
          caption: "",
        },
      ],
      figuresCaption:
        "SDS-PAGE of the crude extracts of DHAK WT and DHAK PROSS 5. Lane contents in Table 3.",
      tables: [
        {
          caption: "**Lane contents of the gel shown in Figure 12.**",
          headers: ["Lane", "Sample"],
          rows: [
            ["1", "not loaded"],
            ["2", "**crude extract, DHAK WT DSM 30040 (1)**"],
            ["3", "**crude extract, DHAK WT DSM 30040 (2)**"],
            ["4", "**crude extract, DHAK PROSS 5 (1)**"],
            ["5", "**crude extract, DHAK PROSS 5 (2)**"],
            ["6", "molecular mass markers"],
            [
              "7",
              "DHAK WT **DSM 30040**, express purification eluates (1) *(purification block)*",
            ],
            [
              "8",
              "DHAK PROSS 5, express purification eluates (1) *(purification block)*",
            ],
            [
              "9",
              "DHAK WT **DSM 30040**, express purification eluates (2) *(purification block)*",
            ],
            [
              "10",
              "DHAK PROSS 5, express purification eluates (2) *(purification block)*",
            ],
          ],
        },
      ],
    },
  ],
};

const SDS_PAGE: ResultData = {
  id: "sds-page-readout",
  tabLabel: "SDS-PAGE",
  title: "Expression read-out by SDS-PAGE",
  narrative: true,
  enzymes: ["DHAK", "PPK2"],
  subsections: [
    {
      id: "gels-intro",
      body: [
        "Production was read on polyacrylamide gels [9] of the crude extracts, which is where expression itself is visible. Three gels were run, and they are presented in the order they were run, because each one was the reason the next was needed. Some of these gels also carry purification fractions; those lanes are read in the purification block and are not discussed here.",
      ],
    },
    {
      id: "gel-ppk2-wt",
      title: "PPK2 expresses, the original DHAK wild type does not",
      body: [
        "The first gel (Figure 13, Table 4) was run to confirm the production of PPK2, whose expression conditions had already been optimised by the host laboratory [6], so only the crude extract had to be checked. The result is exactly what correct expression looks like: **a band at the position expected for PPK2-III standing out over the normal pattern of host proteins** (lane 5). PPK2 and this strain were therefore carried forward unchanged for the whole of the rest of the module. The same gel also carried the crude extract of the original DHAK wild type (lanes 9 and 10), and there no band appears at the expected mass. The route this failure opened is followed in [Engineering, Iteration 1](/engineering#revalorisation).",
      ],
      pair: "figure-table",
      figures: [
        {
          src: `${FIGURES}/sds-page-ppk2-wt.png`,
          alt: "SDS-PAGE of the crude extract of PPK2 and of the original DHAK wild type.",
          caption:
            "SDS-PAGE of the crude extract of PPK2 and of the original DHAK wild type. Lane contents in Table 4.",
        },
      ],
      tables: [
        {
          caption: "**Lane contents of the gel shown in Figure 13.**",
          headers: ["Lane", "Sample"],
          rows: [
            ["4", "molecular mass markers"],
            ["5", "**crude extract, PPK2**"],
            ["6", "flow-through, PPK2 *(purification block)*"],
            ["7", "dialysed IMAC eluate, PPK2 *(purification block)*"],
            ["9", "**crude extract, DHAK WT (1)**"],
            ["10", "**crude extract, DHAK WT (2)**"],
          ],
        },
      ],
    },
    {
      id: "gel-2021",
      title: "Introducing an alternative strain before discarding anything",
      body: [
        "Rather than discard the original wild type on two gels alone, a third gel was run (Figure 14, Table 5) in which the alternative **DHAK CECT 4626** was loaded for the first time ([Engineering, Iteration 2](/engineering#revalorisation)). That variant was chosen because the host laboratory had shown it to be the most active DHAK available to us, and the 2021 stock was preferred over the older 2012 one on the assumption that more recent material would have suffered less from long-term storage [10]. On this gel, the new **2021 strain** (lanes 1 and 2) shows no band either; **PROSS 5** (lane 3) is confirmed as expressing, again with the higher-mass contaminant; and the **original wild type** (lanes 4 and 5) is confirmed as not expressing.",
        "Neither of the two silent constructs were discarded on this evidence. The absence of a band is the observation that will be weighed against the activity of their crude extracts, and only then will the original wild type be definitively set aside. The same applies to the 2021 strain, whose fate was likewise left to the activity measurements reported further on.",
      ],
      pair: "figure-table",
      figures: [
        {
          src: `${FIGURES}/sds-page-2021-pross5-wt.png`,
          alt: "SDS-PAGE of the crude extracts of DHAK CECT 4626 2021, DHAK PROSS 5 and the original DHAK wild type.",
          caption:
            "SDS-PAGE of the crude extracts of the DHAK CECT 4626 2021 strain, DHAK PROSS 5 and the original DHAK wild type. Lane contents in Table 5.",
        },
      ],
      tables: [
        {
          caption: "Lane contents of the gel shown in Figure 14.",
          headers: ["Lane", "Sample"],
          rows: [
            ["1", "**crude extract, DHAK CECT 4626 2021 (1)**"],
            ["2", "**crude extract, DHAK CECT 4626 2021 (2)**"],
            ["3", "**crude extract, DHAK PROSS 5**"],
            ["4", "**crude extract, DHAK WT (1)**"],
            ["5", "**crude extract, DHAK WT (2)**"],
            ["6", "molecular mass markers"],
            [
              "7",
              "IMAC eluates, DHAK CECT 4626 2021 (1) *(purification block)*",
            ],
            [
              "8",
              "IMAC eluates, DHAK CECT 4626 2021 (2) *(purification block)*",
            ],
            ["9", "IMAC eluate, DHAK PROSS 5 *(purification block)*"],
            ["10", "IMAC eluates, DHAK WT (1) *(purification block)*"],
            ["11", "IMAC eluates, DHAK WT (2) *(purification block)*"],
            ["12", "dialysed IMAC eluate, DHAK PROSS 5 *(purification block)*"],
          ],
        },
      ],
    },
    {
      id: "gel-2012",
      title: "Confirming the expression of the strains the module relies on",
      body: [
        "Until this point the expression of the **CECT 4626 2012** stock had been taken for granted from its activity, without being checked on a gel ([Engineering, Iteration 3](/engineering#revalorisation)). The gel run on the preparation that fed the coupled reaction closes that gap (Figure 15, Table 6). The crude extract shows a distinct band at the mass expected for DHAK [10], standing out over the dense host pattern that fills the rest of the lane. This confirms directly what the activity had already indicated indirectly, that this strain produces the enzyme in appreciable amount, and it accounts for the ~10 U/mg reached by its crude extract, since DHAK makes up a visible share of the soluble protein.",
        "The result **was expected,** and this is the only one of the four DHAK constructs examined on a gel that delivers it. Set against the lanes of the 2021 strain and of the original wild type, neither of which gives a band, the difference is immediate, and it explains why the module ended up relying on this stock.",
        "The same gel carries the two fractions eluted from its purification, which are read in the purification block.",
      ],
      pair: "figure-table",
      figures: [
        {
          src: `${FIGURES}/sds-page-2012-imac.png`,
          alt: "SDS-PAGE of the crude extract of DHAK CECT 4626 2012 and of the two fractions eluted from its IMAC purification.",
          caption:
            "SDS-PAGE of the crude extract of DHAK CECT 4626 2012 and of the two fractions eluted from its purification by IMAC. The crude extract shows the band expected for DHAK at 60 kDa. The eluted fractions are read in the purification block. Lane contents in Table 6.",
        },
      ],
      tables: [
        {
          caption: "Lane contents of the gel shown in Figure 15.",
          headers: ["Lane", "Sample"],
          rows: [
            ["1", "molecular mass markers"],
            ["2", "CFE, crude extract of DHAK CECT 4626 2012"],
            ["3", "F-1, IMAC eluate *(purification block)*"],
            ["4", "F-2, IMAC eluate after dialysis *(purification block)*"],
          ],
        },
      ],
    },
    {
      id: "gel-ppk2-imac",
      body: [
        "For **PPK2** the result **was expected**, and the gel only had to confirm that the behaviour already optimised by the host laboratory [6] was reproduced here, as well as in Figure 13. Its crude extract gives a band at 32 kDa, the mass calculated for the tagged subunit (Figure 16, Table 7). The band is modest against the host background, which is consistent with a construct expressed in soluble form at a level sufficient for the assay rather than one that dominates the lysate. Since the enzyme is used in catalytic support of DHAK and not as the measured species, that level was taken as adequate and the construct was carried straight to purification.",
      ],
      pair: "figure-table",
      figures: [
        {
          src: `${FIGURES}/sds-page-ppk2-imac.png`,
          alt: "SDS-PAGE of the crude extract of PPK2 and of the two fractions eluted from its IMAC purification.",
          caption:
            "SDS-PAGE of the crude extract of PPK2 and of the two fractions eluted from its purification by IMAC. The crude extract shows the band expected for PPK2 at 32 kDa. The eluted fractions are read in the purification block. Lane contents in Table 7.",
        },
      ],
      tables: [
        {
          caption: "Lane contents of the gel shown in Figure 16.",
          headers: ["Lane", "Sample"],
          rows: [
            ["1", "molecular mass markers"],
            ["2", "CFE, crude extract of PPK2"],
            ["3", "F-1, IMAC eluate *(purification block)*"],
            ["4", "F-2, IMAC eluate after dialysis *(purification block)*"],
          ],
        },
      ],
    },
    {
      id: "gels-reading",
      body: [
        "For **DHAK** nothing went as planned. A freshly ordered, sequence-verified synthetic gene is the case in which expression is most likely to work, and the supplier’s construct data showed nothing unusual, so the silence of the original wild type was unexpected enough to be checked a second time before being accepted. The **CECT 4626 2021** stock, brought in precisely because the host laboratory had shown it to be the most active DHAK available, gave no visible band either, which was the second surprise of the block. The one result that came out as hoped, **PROSS 5** expressing strongly on both gels in which it was loaded, arrived with a complication that was not anticipated, a contaminating protein of higher molecular mass that accompanies it consistently and whose identity remains unresolved.",
        "**What follows from this** is a deliberate change of read-out rather than more gels. The five gels establish that the production routine works, since the same protocol gave clear bands for PPK2, PROSS 5 and the 2012 stock while the other constructs gave none, so the absence of a band reports on those constructs and not on the handling. It does not, however, prove that nothing was made, because a gel resolves only what is abundant and a weakly expressed enzyme can be active without being visible. With time and material tightly limited, repeating gels on constructs that had already failed twice was not a good use of either. The silent constructs were therefore carried forward to the activity assays, where turnover is read directly and serves as an indirect but sufficient measure of expression, since a protein that converts substrate has necessarily been produced in *E. coli*. PROSS 5 moved on to purification and then to activity alongside PPK2, the original wild type and the 2021 stock remain in play until their crude-extract activity is measured, and the choice of the reference DHAK against which the designed variant will finally be judged is settled in the activity block, not here.",
      ],
    },
  ],
};

/* ---------- 3. Enzyme purification ---------- */

const PURIFICATION_IMAC: ResultData = {
  id: "purification-imac",
  tabLabel: "IMAC and dialysis",
  title:
    "Immobilised Metal Affinity Chromatography and dialysis of the eluates",
  narrative: true,
  enzymes: ["DHAK", "PPK2"],
  subsections: [
    {
      id: "imac-intro",
      body: [
        "Dialysis is reported together with IMAC rather than as an independent experiment, because it is the step that immediately follows elution: every eluate goes straight into a dialysis bag, and the same gel carries the affinity fractions and the dialysed sample. Separating them would split one gel across two sections and lose the comparison that makes the dialysis result visible. The affinity step follows the procedure established in this laboratory for related His-tagged enzymes [11].",
      ],
    },
    {
      id: "imac-ppk2",
      title: "PPK2 purified as intended",
      body: [
        "The crude extract (lane 5) shows the host band pattern plus an additional band at the mass expected for PPK2-III; that band is absent, or nearly so, from the flow-through (lane 6), which means the protein was retained by the resin rather than passing through it; and it reappears as the dominant species in the dialysed eluate (lane 7), over a reduced but not eliminated background of host proteins.",
        "This is a reasonable purification rather than a pure preparation, and that is what the block was designed to deliver: as argued in Experiments, the aim was a fraction clean enough to measure activity without interference. The more stringent wash afforded by PPK2’s tolerance of salt and imidazole did its job. This dialysed PPK2 was stored and kept as the partner enzyme, ready for the moment an active DHAK preparation became available for the coupled assay. The result was expected, and PPK2 was never the difficult half of this module.",
      ],
      pair: "figure-table",
      figures: [
        {
          src: `${FIGURES}/sds-page-ppk2-purification.png`,
          alt: "SDS-PAGE of the PPK2 purification, with crude extract, flow-through and dialysed eluate.",
          caption:
            "SDS-PAGE of the PPK2 purification. Lane contents in Table 8.",
        },
      ],
      tables: [
        {
          caption: "**Lane contents of the gel shown in Figure 17.**",
          headers: ["Lane", "Sample"],
          rows: [
            ["4", "molecular mass markers"],
            ["5", "**crude extract, PPK2**"],
            ["6", "**flow-through, PPK2**"],
            ["7", "**dialysed IMAC eluate, PPK2**"],
            ["9", "crude extract, DHAK WT (1) *(expression block)*"],
            ["10", "crude extract, DHAK WT (2) *(expression block)*"],
          ],
        },
      ],
    },
    {
      id: "imac-ppk2-second",
      body: [
        "A second preparation was purified in the same way when the coupled reaction was repeated, and it is the one that supplied PPK2 in **round 2** (Figure 18, Table 9). The band at **32 kDa** is already visible in the crude extract and is **retained through the affinity step**, with much of the host background removed in the eluate. After dialysis the same band appears **more intense, and so do the remaining host species** between 25 and 100 kDa, which indicates that dialysis **concentrated the sample rather than purifying it further**. The purity is therefore set by the **affinity step**, and dialysis only raises the **concentration** at which that preparation is used. For the use the preparation is put to, this is **sufficient**. The coupled assay reads the formation of DHAP by DHAK and asks of PPK2 only that it **return ATP**, so a preparation carrying residual host protein performs the function required of it **without needing to be homogeneous**. A kinetic characterisation of PPK2 itself would need a cleaner preparation, and **none was attempted**.",
      ],
      pair: "figure-table",
      figures: [
        {
          src: `${FIGURES}/sds-page-ppk2-imac.png`,
          alt: "SDS-PAGE of the second IMAC purification of PPK2.",
          caption:
            "SDS-PAGE of the second IMAC purification of PPK2, the preparation used in the second round of the coupled reaction. The eluate shows the band expected for PPK2 at 32 kDa, and the dialysed sample shows the same band and the same host species at higher intensity. Lane contents in Table 9.",
        },
      ],
      tables: [
        {
          caption: "Lane contents of the gel shown in Figure 18.",
          headers: ["Lane", "Sample"],
          rows: [
            ["1", "**molecular mass markers**"],
            ["2", "**CFE, crude extract loaded onto the column**"],
            ["3", "**F-1, IMAC eluate**"],
            ["4", "**F-2, IMAC eluate after dialysis**"],
          ],
        },
      ],
    },
    {
      id: "imac-dhak-first",
      title: "First affinity run: PROSS 5 and the silent constructs",
      body: [
        "**DHAK divides into two problems**, which the gel tells apart. What the affinity step cost the enzyme is followed in [Engineering, Iteration 6](/engineering#revalorisation). Most eluate lanes are faint, but reading each against its own crude extract shows that this is not a failure of the purification. The **wild-type eluates** (lanes 10 and 11) and the **2021 eluates** (lanes 7 and 8) are empty, and in both cases the corresponding extract already showed no band: where there is nothing to retain, the resin cannot return anything, so what these lanes report is the expression problem documented above and not the behaviour of the affinity step. **PROSS 5** is the exception, and the only lane on which the purification can actually be judged: it expresses more strongly than any other construct on the gel, and its eluate (lane 9) shows two well-defined, essentially clean bands. The identity of the upper band is not established; it is not resolved under reducing conditions and runs above the expected monomer mass, so it may come from the construct or be a co-purifying host protein. It was recorded and set aside, because the priority at that point was to establish whether the stabilised variant was active, not only expressible.",
        "The dialysed lane adds a result that was not the purpose of the step. After dialysis (lane 12) the bands are markedly thicker than in the corresponding eluate: the **sample is more concentrated**. Dialysis therefore serves two functions here rather than one. Besides removing the imidazole and salt that would interfere with the DHAK assay, as argued in Experiments, it acts in practice as a concentration step before activity is measured. This was not anticipated, and it is the reason dialysis is treated as integral to the purification rather than as an optional clean-up.",
      ],
      pair: "figure-table",
      figures: [
        {
          src: `${FIGURES}/sds-page-dhak-purifications.png`,
          alt: "SDS-PAGE of the DHAK purifications, crude extracts beside their IMAC eluates.",
          caption:
            "SDS-PAGE of the DHAK purifications. Lane contents in Table 10.",
        },
      ],
      tables: [
        {
          caption: "**Lane contents of the gel shown in Figure 19.**",
          headers: ["Lane", "Sample"],
          rows: [
            [
              "1",
              "crude extract, DHAK CECT 4626 2021 (1) *(expression block)*",
            ],
            [
              "2",
              "crude extract, DHAK CECT 4626 2021 (2) *(expression block)*",
            ],
            ["3", "crude extract, DHAK PROSS 5 *(expression block)*"],
            ["4", "crude extract, DHAK WT (1) *(expression block)*"],
            ["5", "crude extract, DHAK WT (2) *(expression block)*"],
            ["6", "molecular mass markers"],
            ["7", "**IMAC eluate, DHAK CECT 4626 2021 (1)**"],
            ["8", "**IMAC eluate, DHAK CECT 4626 2021 (2)**"],
            ["9", "**IMAC eluate, DHAK PROSS 5**"],
            ["10", "**IMAC eluate, DHAK WT (1)**"],
            ["11", "**IMAC eluate, DHAK WT (2)**"],
            ["12", "**dialysed IMAC eluate, DHAK PROSS 5**"],
          ],
        },
      ],
    },
    {
      id: "imac-dhak-2012",
      title: "Second affinity run: the active 2012 stock",
      body: [
        "The previous gel allowed the affinity step to be judged only on PROSS 5, because that was the one construct with enough protein on it. Returning to IMAC with the 2012 stock ([Engineering, Iteration 8](/engineering#revalorisation)), now with an enzyme known to be strongly active at the outset, finally gives that reading (Figure 20, Table 11). The crude extract loaded onto the column carries the full host background, with bands spread across the whole range of the marker and the one at the mass of DHAK no more prominent than several others. The two eluted fractions carry a dominant band at 60 kDa, the mass calculated for the tagged subunit, and have lost most of the host species present in the extract. The fraction collected first is the more concentrated of the two, as expected from the elution profile. Two minor species survive the step, one slightly above 60 kDa and one near 35 kDa, so the preparation is enriched rather than homogeneous.",
        "What this establishes is that the affinity step works on this enzyme too, the resin retains it and gives it back. That information was missing, because until now the only evidence that IMAC recovers DHAK came from a construct whose activity was unknown. Here the same preparation that gives this band pattern is the one that went into the second round of the coupled reaction, so purification and function are reported on the same material. The step is not quantified, since no flow-through or wash lane was run and the gel was not loaded on equal protein, so neither the loss to the resin nor the recovery can be stated from the image.",
      ],
      pair: "figure-table",
      figures: [
        {
          src: `${FIGURES}/sds-page-2012-imac.png`,
          alt: "SDS-PAGE of the IMAC purification of the DHAK CECT 4626 2012 stock.",
          caption:
            "SDS-PAGE of the IMAC purification of the DHAK CECT 4626 2012 stock. The two eluted fractions show the band expected for DHAK at 60 kDa over a background strongly reduced with respect to the crude extract. Lane contents in Table 11.",
        },
      ],
      tables: [
        {
          caption: "Lane contents of the gel shown in Figure 20.",
          headers: ["Lane", "Sample"],
          rows: [
            ["1", "molecular mass markers"],
            [
              "2",
              "CFE, crude extract loaded onto the column *(expression block)*",
            ],
            ["3", "F-1, IMAC eluate"],
            ["4", "F-2, IMAC eluate after dialysis"],
          ],
        },
      ],
    },
  ],
};

const PURIFICATION_EXPRESS_IMAC: ResultData = {
  id: "purification-express-imac",
  tabLabel: "Express IMAC",
  title: "Express Immobilised Metal Affinity Chromatography",
  narrative: true,
  enzymes: ["DHAK"],
  subsections: [
    {
      id: "express-imac-result",
      body: [
        "The express IMAC was run to settle a single question: *when a DHAK construct yields nothing after purification, is it because the enzyme was never made, or because the purification is losing it?* The gel answers it directly. DHAK PROSS 5 appears in its eluates (lanes 8 and 10) as the only intense species, accompanied by the same unidentified second band seen on the preparative gel, so the resin binds it and gives it back. The wild type appears nowhere, neither in its crude extract nor in its eluates (lanes 7 and 9).",
        "Taken together, the two observations separate the two possibilities. Because the resin recovers the protein whenever the protein is there, the affinity step itself is working, and because the wild type is absent from its own extract before any resin is involved, its failure must lie in expression rather than in purification. That is exactly the discrimination the express protocol was designed to provide, and it was obtained from microlitre volumes in a fraction of the time a full column run would have taken, which is what allowed us to stop troubleshooting the purification and start troubleshooting the construct. That the test would resolve the ambiguity was expected; that it would resolve it against the construct was not.",
      ],
      pair: "figure-table",
      figures: [
        {
          src: `${FIGURES}/sds-page-express-imac.jpeg`,
          alt: "SDS-PAGE of the express IMAC of DHAK.",
          caption:
            "SDS-PAGE of the express IMAC of DHAK. Lane contents in Table 12.",
        },
      ],
      tables: [
        {
          caption: "Lane contents of the gel shown in Figure 21.",
          headers: ["Lane", "Sample"],
          rows: [
            ["1", "not loaded"],
            ["2", "crude extract, DHAK WT (1) *(expression block)*"],
            ["3", "crude extract, DHAK WT (2) *(expression block)*"],
            ["4", "crude extract, DHAK PROSS 5 (1) *(expression block)*"],
            ["5", "crude extract, DHAK PROSS 5 (2) *(expression block)*"],
            ["6", "molecular mass markers"],
            ["7", "**express resin eluate, DHAK WT (1)**"],
            ["8", "**express resin eluate, DHAK PROSS 5 (1)**"],
            ["9", "**express resin eluate, DHAK WT (2)**"],
            ["10", "**express resin eluate, DHAK PROSS 5 (2)**"],
          ],
        },
      ],
    },
  ],
};

const PURIFICATION_SEC: ResultData = {
  id: "purification-sec",
  tabLabel: "FPLC",
  title: "Size-exclusion chromatography (FPLC)",
  narrative: true,
  enzymes: ["DHAK"],
  subsections: [
    {
      id: "sec-intro",
      body: [
        "Four runs were performed and are reported in chronological order as runs 1 to 4. For each one the full chromatogram is shown together with an enlargement of the region from which fractions were collected.",
        "Three reference volumes make the traces interpretable. On this column the **void volume is about 110 mL**, where everything too large to enter the pores elutes together, and the **total volume is about 320 mL,** where small molecules that fully penetrate the matrix elute. Between them, DHAK is expected at approximately **220–270 mL**, which is the window in which a peak can correspond to the enzyme.",
      ],
    },
    {
      id: "sec-run-1",
      title: "Run 1",
      body: [
        "The first run is almost empty in absorbance terms (Figure 22). The whole trace stays below 7.5 mAU, and the only feature of any size is a broad, very low rise near 290 mL.",
        "**Fractions 17 to 68 were collected**, and the enlargement covers that region (Figure 23), which includes the window where DHAK should elute. There the trace shows three faint shoulders rather than peaks. A shoulder has no clear apex and sits on the baseline, which means the material is eluting under the edge of something else instead of being separated in its own right. With absorbance this low, very little left the column at all, although a poorly defined feature does not in itself mean there is no protein in those fractions: it means that **whatever eluted was not resolved.**",
        "The rise near 290 mL is worth noting even though it is barely above the baseline. It lies past the DHAK window and close to the total volume of the column, where small molecules elute, so it is unlikely to correspond to a protein of this size. What the collected fractions actually contain, and whether they are active, is reported in the activity block.",
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
      ],
    },
    {
      id: "sec-run-2",
      title: "Run 2",
      body: [
        "The second run gave real absorbance for the first time (Figure 24), but most of it falls outside the region of interest. The trace shows a small peak at the void volume (~105 mL, 32 mAU), a dominant one at ~288 mL (577 mAU) and a third at ~330 mL (147 mAU).",
        "**Fractions 17 to 56 were collected**, and the enlargement covers that region (Figure 25), which is where DHAK should elute. There the absorbance is low and the feature is poorly defined: broad, rather than the narrow, symmetric peak that one cleanly separated species gives. A shape of that kind means **several species eluting together**, or protein retarded by the matrix, so the fractions taken from it cannot be assumed to contain one thing. It does not mean the enzyme is absent, only that it was not resolved.",
        "The large peak at ~288 mL is worth noting even though no fractions were taken from it. It lies past the DHAK window and close to the total volume of the column, where small molecules elute, and the same applies to the peak at ~330 mL, which is past the total volume altogether. Together they indicate that most of what left the column was small-molecule material from the crude extract rather than protein. The void peak is unremarkable, since very large or aggregated material always elutes there, and its small size means little of the sample had aggregated. What the collected fractions actually contain, and whether they are active, is reported in the activity block.",
      ],
      figuresColumns: 2,
      figures: [
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
      ],
    },
    {
      id: "sec-run-3",
      title: "Run 3",
      body: [
        "The third run is the only one that behaved as size exclusion should (Figure 26). Its maximum absorbance is modest, 51 mAU for the whole run, so there was not much material, but the shape of the trace is the best of the series.",
        "The peak of interest falls squarely in the 220–270 mL window (Figure 27), exactly where DHAK is expected. It is narrow and symmetric, with no shoulders and a clean return to the baseline on both sides, which is what a single species properly separated from the rest of the sample looks like. **This is the reference profile against which the other three runs are read.**",
        "The **run was nonetheless lost for a trivial reason.** The collection marks show that the fraction collector was started after the peak had already left the system, so the only well-resolved DHAK peak obtained in the whole series went to waste. **No fraction of it could be assayed, and it therefore does not appear in the activity block.**",
      ],
      figuresColumns: 2,
      figures: [
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
      ],
    },
    {
      id: "sec-run-4",
      title: "Run 4",
      body: [
        "The fourth run is better than the first two but not as good as the third (Figure 28). The trace shows a peak at the void volume (~110 mL, 202 mAU), one at ~261 mL (187 mAU), a dominant one at ~290 mL (825 mAU) and a further one at ~333 mL (274 mAU).",
        "**Fractions 25 to 48 were collected**, and the enlargement covers that region (Figure 29). The peak at ~261 mL falls inside the DHAK window and is the only candidate for the enzyme. It is broader than a well-resolved peak should be, and the enlargement shows it partially overlapping with the much larger peak that follows it, so its trailing edge is not cleanly separated from that material. Where two peaks overlap, the fractions taken between them contain both species, which limits the purity obtainable rather than ruling out the presence of the enzyme.",
        "The peak at ~290 mL, roughly four times larger, lies past the DHAK window and close to the total volume, and the one at ~333 mL is past it, so both correspond to small-molecule material from the crude extract. The void peak is considerably larger than in run 2, which indicates that more of this sample had aggregated. What the collected fractions contain, and whether the enzyme in them is still active, is reported in the activity block.",
      ],
      figuresColumns: 2,
      figures: [
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
    },
    {
      id: "sec-reading",
      continued: true,
      body: [
        "In the three runs that produced real absorbance, most of the signal elutes near the total volume of the column, where small molecules appear, and little in the 220–270 mL window where DHAK is expected: the profile of a crude extract dominated by nucleotides and small metabolites, which leaves open whether the collected fractions contained the enzyme at all.",
        "None of this was expected. Size exclusion was adopted because it avoids metal chelation and imidazole and separates on size, a property the enzyme has regardless of how its tag behaves. Instead the method never stabilised: almost nothing left the column in run 1, run 2 gave a broad, unresolved feature in the collection window, and run 4 a candidate peak overlapping much larger late-eluting material. Run 3 produced exactly the narrow, symmetric peak the technique should give, and it was lost to a fraction collector started too late.",
        "The chromatograms show that the separation was not reproducible, not that the enzyme was absent, so the fractions from runs 1, 2 and 4 were carried to the activity assays; with no time to develop the method further, the work returned to IMAC, a decision set out in [Engineering, Iteration 7](/engineering#revalorisation).",
      ],
    },
  ],
};

/* ---------- 4. Enzyme activity assay ---------- */

const DHAK_ACTIVITY: ResultData = {
  id: "dhak-activity",
  tabLabel: "DHAK activity",
  title: "DHAK activity, coupled α-GDH/TIM assay",
  narrative: true,
  enzymes: ["DHAK"],
  subsections: [
    {
      id: "dhak-activity-dsm-30040",
      title: "1.1 DHAK wild type (*C. freundii* DSM 30040)",
      body: [
        "The absorbance at 340 nm fell only slightly, giving an initial rate of **3.73 mOD/min** (R² = 0.991; Figure 30), equivalent to about **0.60 nmol DHAP/min**. The fit is clean but the slope is far shallower than any of the CECT 4626 preparations, which points to a **weakly active enzyme and a low amount of functional DHAK** rather than to a failed assay, since the reaction and the coupling system behaved normally. This was **not what we expected**.",
        "This is the reference variant of *C. freundii* DHAK, the sequence crystallised as PDB 1UN9 (strain DSM 30040), ordered as a synthetic gene, and the result confirms at the level of function what the gels had already shown at the level of protein. It **was not what we expected** from a freshly ordered, sequence-verified construct whose supplier data showed nothing unusual, and it is what turned the wild type from a setback into the central problem of the module. The response was to move to the **CECT 4626** variant kept in the laboratory, reported as the more catalytically efficient of the two natural variants, which differ at 22 residues [10]; the reasoning is in [Engineering, Iteration 1](/engineering#revalorisation).",
      ],
      figures: [
        {
          src: `${FIGURES}/dhak-activity-dsm30040.png`,
          alt: "Coupled alpha-GDH/TIM activity trace of wild-type DHAK from C. freundii DSM 30040.",
          caption:
            "DHAK activity assay of the **wild type from *C. freundii* DSM 30040**, the reference variant ordered from the PDB 1UN9 sequence. Coupled α-GDH/TIM assay; the fall in A₃₄₀ gives an initial rate of **only 3.73 mOD/min** (R² = 0.991).",
        },
      ],
    },
    {
      id: "dhak-activity-pross5",
      title: "1.2 DHAK PROSS 5",
      body: [
        "The absorbance at 340 nm **stayed essentially flat**. The fitted slope of **0.92 mOD/min** has **R² = 0.374** (Figure 31), so **no reliable rate** can be extracted and the variant showed **no measurable kinase activity**. Whatever stability the design may have gained **came at the cost of function**. This was **not expected**, since design 5 sat in the **middle of the conservative-to-aggressive range** PROSS returned and should have kept activity comparable to the wild type. The loss indicates that its **mutation load was too high** and likely disturbed the geometry around the active site or the packing between domains, even with the ligand-contact residues protected. This **sent us back to a more conservative PROSS variant**, which has since been expressed but not yet assayed, while the CECT 4626 wild type is used in the meantime; the full reasoning is in [Engineering, Iteration 3](/engineering#revalorisation).",
        "Because the gels showed PROSS 5 expressing strongly, it was purified by IMAC, dialysed and assayed. The absorbance at 340 nm stayed essentially flat: the fitted slope of **0.92 mOD/min** has **R² = 0.374** (Figure 31), so no reliable rate can be extracted and the variant showed no measurable kinase activity.",
        "Two explanations were available and the data could not separate them: either the **purification had inactivated the enzyme, or the 56 substitutions had abolished function.** Discriminating between them would require an active enzyme of the same sequence background passing through exactly the same procedure, and at this point in the module no such reference existed: the **DSM 30040 wild type**, the only sequence PROSS 5 can legitimately be compared against, had itself proved **inactive** in the previous assay. The design was therefore measured without a working counterpart, which is what makes this the most consequential result of the block, not for what it showed but for what it prevented.",
        "The loss itself **was not expected**, since design 5 sat in the middle of the conservative-to-aggressive range PROSS returned and should have kept activity comparable to the wild type. It indicates that the mutation load was too high and likely disturbed the geometry around the active site or the packing between domains, even with the ligand-contact residues protected.",
        "Because the two explanations could not be told apart, the response had to act on both at once. On the design side, a far more conservative PROSS variant was ordered on the new background, carrying a fraction of the substitutions so that the next attempt would not risk function in the same way, as set out in [Engineering, Iteration 4](/engineering#revalorisation). On the method side, the purification was changed from affinity chromatography to size exclusion, so that the enzyme would no longer be exposed to the metal resin and the imidazole that may have been destroying it, which is the decision documented in [Engineering, Iteration 8](/engineering#revalorisation).",
      ],
      figures: [
        {
          src: `${FIGURES}/dhak-activity-pross5.png`,
          alt: "Coupled assay trace of the DHAK PROSS design 5 variant after IMAC and dialysis.",
          caption:
            "DHAK activity assay of the PROSS design 5 variant, after IMAC and dialysis. A₃₄₀ stays essentially flat and the fitted slope (0.92 mOD/min) has R² = 0.374, so no activity can be reliably measured.",
        },
      ],
    },
    {
      id: "dhak-activity-cect-2021",
      title: "1.3 DHAK CECT 4626, 2021 stock",
      body: [
        "Two CECT 4626 stocks were available in the host laboratory, from 2021 and 2012. Work began with the 2021 stock, on the assumption that more recent material would have been better preserved. The extract was taken through **IMAC and dialysis**, and the eluates showed **no band** at the expected mass (Figure 14). A gel resolves only what is abundant, so an absent band does not by itself prove that nothing was made, and the **crude extract was therefore assayed directly**, since activity reports on functional enzyme regardless of whether a band is visible. That measurement is what would decide whether the stock could serve as the active reference the module needed.",
        "The absorbance at 340 nm **stayed flat** for the whole read. The fitted slope was **−0.080 mOD/min with R² = 0.035** (Figure 32), so **no reliable rate can be extracted and the extract showed no measurable DHAK activity**. This matches the expression gel, where the 2021 stock gave **no band** (Figure 14). The two readouts agree that this preparation holds **no functional enzyme in appreciable amount**.",
        "The result still has to be read against what this variant should do. CECT 4626 is described as the **most catalytically efficient DHAK reported to date** (kcat/Km ≈ 2×10⁷ M⁻¹s⁻¹, kcat ≈ 24 s⁻¹, Km for DHA ≈ 1.2 µM) [10], so a flat trace cannot reflect the enzyme itself. It points to the **state of this particular stock** rather than to the biochemistry, and an extract with no detectable activity **cannot serve as the reference** against which a stabilised design is judged.",
        "The outcome was only partly a surprise. Choosing the more recent stock was a **deliberate bet on preservation**, and the absent gel band had already warned that the bet might not pay off; the assay confirmed it. The **2021 stock was therefore discarded** ([Engineering, Iteration 2](/engineering#revalorisation)) as the reference enzyme and the older **2012 material was tested next**, the opposite of what the storage argument had predicted.",
      ],
      figures: [
        {
          src: `${FIGURES}/dhak-activity-cect4626-2021.png`,
          alt: "Flat coupled assay trace of the cell-free extract of the DHAK CECT 4626 2021 stock.",
          caption:
            "DHAK activity assay of the CECT 4626 variant, 2021 stock, cell-free extract. The trace is flat, with a fitted slope of **−0.080 mOD/min (R² = 0.035)**, so no activity can be measured.",
        },
      ],
    },
    {
      id: "dhak-activity-cect-2012",
      title: "1.4 DHAK CECT 4626, 2012 stock",
      body: [
        "The cell-free extract of the 2012 stock gave the **steepest trace of the whole study**, an initial rate of **581.1 mOD/min** (R² = 1.00; Figure 33), equal to **93.4 nmol DHAP/min** and a volumetric activity of **~18.7 U/mL** from 5 µL assayed. The rate and the volumetric activity depend only on the assay and the volume of extract added, not on any protein measurement, and by both the preparation is **far more active than any other DHAK tested** in this work.",
        "The protein concentration, however, **could not be measured reliably**. The Bradford [13] readings sat just above the assay blank (standard-curve intercept 0.319), at the lower limit of the determination, and the two sample volumes **did not agree**: the 1 µL and 5 µL loads gave **1.35 and 0.37 mg/mL** (Table 13), values that should coincide for the same extract and instead differ about fourfold. Because the concentration is not trustworthy, **no specific activity (U/mg) can be assigned** to this extract, and any figure derived from this Bradford would carry that error.",
        "What the experiment does establish is **clear from the activity trace alone**. The 2012 extract is the **only DHAK preparation that is strongly and cleanly active** (R² = 1.00), and its rate towers over the flat traces of the DSM 30040 wild type (Figure 30) and the 2021 stock (Figure 32). That is consistent with CECT 4626 being the **most catalytically efficient DHAK reported** [10], and it is enough to select this stock as the **reference enzyme for the rest of the module**, through purification and into the coupled assay with PPK2.",
      ],
      tables: [
        {
          caption:
            "Bradford protein quantification of the DHAK crude extract at two sample volumes, against a BSA standard curve (y = 0.319 + 0.020·x, R² = 0.994). The 1 µL and 5 µL loads give inconsistent values and sit close to the assay blank, so no reliable concentration could be assigned.",
          headers: [
            "Sample",
            "Absorbance (A₅₉₅, mean)",
            "Protein (mg/mL)",
            "Standard curve R²",
          ],
          rows: [
            ["DHAK (1 µL)", "0.345", "1.35", "0.994"],
            ["DHAK (5 µL)", "0.355", "0.37", "0.994"],
          ],
        },
      ],
    },
    {
      id: "dhak-activity-cect-2012-figure",
      continued: true,
      figures: [
        {
          src: `${FIGURES}/dhak-activity-cect4626-2012-cfe.png`,
          alt: "Steep coupled assay trace of the first cell-free extract batch of the DHAK CECT 4626 2012 stock.",
          caption:
            "DHAK activity assay of the CECT 4626 variant, 2012 stock, cell-free extract, first batch. Steepest trace of the series: initial rate **581.1 mOD/min** (R² = 1.00), about **93.4 nmol DHAP/min** and **~18.7 U/mL** (5 µL assayed).",
        },
      ],
    },
    {
      id: "purifying-the-2012-stock",
      title: "1.5 Purifying the 2012 stock",
      body: [
        "The crude extract was active, so the next question was whether that **activity survives a purification.** Both routes were applied to this material ([Engineering, Iterations 6 and 7](/engineering#revalorisation)) and the fractions assayed by the same coupled α-GDH/TIM method, so the results are directly comparable with the extract they came from. Not every fraction assayed is reported here: for each run we show the traces that are enough to reach a conclusion about it, one figure per fraction shown.",
        "**Size-exclusion, run 1.** Three of the fractions assayed are shown here, 27, 46 and 56, which between them cover the three features from which material was collected. Fraction 27 gave −8.40 mOD/min with R² = 0.957 (Figure 34), the only one of the three with an acceptable fit, while fraction 46 gave −1.51 mOD/min with R² = 0.571 (Figure 35) and fraction 56 −0.16 mOD/min with R² = 0.035 (Figure 36).",
        "Read together, the three traces say that **nothing usable was recovered**, and they are enough to close the run. Fraction 27 is the only one in which the signal falls in a way the software can fit, and even there the rate is two orders of magnitude below the extract loaded; in fractions 46 and 56 the fit is to noise rather than to a descending signal, which is what the near-zero R² values report. This is exactly what the chromatogram of this run predicted, since **almost nothing left the column,** so there was no reason to document the remaining fractions.",
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
          alt: "Flat coupled assay trace of fraction 56 from size-exclusion run 1.",
          caption:
            "Coupled assay of fraction 56 from run 1. The trace is flat; the fitted slope (−0.16 mOD/min) has R² = 0.035.",
        },
      ],
    },
    {
      id: "sec-run-2-fractions",
      continued: true,
      body: [
        "**Size-exclusion, run 2.** The same three fractions are shown, and two of them were clearly active. Fraction 46 gave −42.91 mOD/min with R² = 0.998 (Figure 37), the steepest and cleanest trace obtained from any size-exclusion fraction in the whole study, and fraction 27 gave −16.64 mOD/min with R² = 0.989 (Figure 38). Fraction 56 remained inactive, at −0.16 mOD/min with R² = 0.035 (Figure 39).",
        "This is the one run that shows the **enzyme surviving a purification**, and how the activity is distributed across the three fractions matters as much as the rates themselves. It appears in the two fractions taken from the protein region and is absent from the late one, which is the behaviour expected if the enzyme elutes where size exclusion predicts and the last peak is small-molecule material from the extract. **Recovery is nonetheless modest against the starting material**, since the crude extract gave 581.1 mOD/min from 5 µL and even the best fraction here accounts for a small part of the activity loaded onto the column.",
      ],
      figuresColumns: 3,
      figures: [
        {
          src: `${FIGURES}/sec-run2-fraction46.png`,
          alt: "Coupled assay trace of fraction 46 from size-exclusion run 2, the most active purified fraction.",
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
          alt: "Flat coupled assay trace of fraction 56 from size-exclusion run 2.",
          caption:
            "Coupled assay of fraction 56 from run 2. The trace is flat (−0.16 mOD/min, R² = 0.035), as expected for material eluting past the total volume of the column.",
        },
      ],
    },
    {
      id: "sec-run-4-fraction",
      continued: true,
      body: [
        "**Size-exclusion, run 3.** No activity was measured and no figure is shown. As reported with the chromatograms, the only well-resolved peak of the series passed into waste because the fraction collector was started too late, so **there was no sample to assay.**",
        "**Size-exclusion, run 4.** One fraction from the collected peak is shown, and it gave essentially nothing: −11.12 mOD/min with R² = 0.566 (Figure 40). The slope is not small in magnitude, but the fit is poor enough that no rate can be extracted from it, so the trace cannot be read as activity.",
        "Coming immediately after run 2, this is the result that decided the matter. A method that yields active fractions in one run and nothing in the next, and whose only clean separation was lost to a handling error, **cannot be relied on with the time left**. Following the engineering cycle documented in [Engineering, Iteration 8](/engineering#revalorisation), the decision was to return to IMAC.",
      ],
      figures: [
        {
          src: `${FIGURES}/sec-run4-fraction.png`,
          alt: "Coupled assay trace of the peak collected in size-exclusion run 4.",
          caption:
            "Coupled assay of the peak collected in size-exclusion run 4. The fitted slope (−11.12 mOD/min) has R² = 0.566, so no reliable rate can be extracted.",
        },
      ],
    },
    {
      id: "back-to-imac",
      continued: true,
      body: [
        "**Back to IMAC.** The affinity route had never been tried on this stock: the 2012 enzyme had gone straight to size exclusion, and the problems that had made us abandon IMAC came from constructs that either did not express or could not be compared against a working control. With an enzyme now known to be strongly active, there was no evidence that IMAC would fail on it, and testing it was the only way to find out how this particular DHAK behaves on the resin.",
        "The enzyme was therefore purified again by affinity chromatography and the dialysed eluate assayed. The trace gave −1.41 mOD/min with R² = 0.928 (Figure 41): a clean fit on a signal that barely falls, which amounts to no measurable activity. Returning to the affinity route did not recover activity either, so **neither of the two purification methods delivers a preparation of this enzyme that can be used in the coupled assay.**",
      ],
      figures: [
        {
          src: `${FIGURES}/dhak-2012-dialysed-imac-inactive.png`,
          alt: "Coupled assay trace of the dialysed IMAC eluate of the CECT 4626 2012 stock, showing no measurable activity.",
          caption:
            "Coupled assay of the dialysed IMAC eluate of the CECT 4626 2012 stock, after returning to the affinity route. The fit is clean but the signal barely falls (−1.41 mOD/min, R² = 0.928): no measurable activity.",
        },
      ],
      bodyAfter: [
        "Read together, the eight traces make the problem specific rather than general. The enzyme is clearly active in the crude extract, and in run 2 it is also active in the fractions taken from the protein region, so **the problem is neither that the enzyme is missing nor that it cannot work.** What it **does not do is survive purification reproducibly**: of the eight purified fractions assayed across the two methods, two were active and six were not. This **was not expected**, and it is why the next decision, to work with the crude extract directly, **was forced** rather than merely preferred.",
      ],
    },
    {
      id: "working-crude-extract",
      title: "1.6 Working with the crude extract",
      body: [
        "With the first purification attempts exhausted and **time short**, the enzyme was re-expressed and the crude extract used directly, as a **working decision for the time being** rather than a final one. A fresh preparation gave **198.5 mOD/min** (R² = 1.00; Figure 42), about **31.9 nmol DHAP/min** and **~6.4 U/mL**, lower than the first batch (ordinary batch-to-batch variation in expression) but **solidly active**. Critically, the baseline before adding DHA was stable, so the extract has **no appreciable NADH-consuming activity of its own** and is clean enough to be taken into a coupled assay.",
        "Working with crude extract is also **defensible beyond the bench**. A cell-free extract is **cheaper to produce at scale** than a purified enzyme, since it removes the chromatography, buffer exchange and concentration steps that dominate downstream cost and time, and previous work on related multienzyme systems found a cell-free extract performing as well as the purified protein [14]. So the fallback was not a bad place to be while the purification was sorted out.",
        "This extract was therefore taken into the **first coupled assay (round 1)**, to get the coupled work moving without waiting for a clean purification. That round, however, **saturated and could not be read** (section 2.1), and the purification effort continued in parallel. An **active purified preparation of this DHAK was eventually obtained** (section 1.7) and used in **round 2**, which is the experiment that resolved the turnover. The crude extract was thus the **temporary route that let the coupled assay start**, not the enzyme the module finally relied on.",
      ],
      figures: [
        {
          src: `${FIGURES}/dhak-activity-cect4626-2012-working-cfe.png`,
          alt: "Coupled assay trace of the working cell-free extract of the DHAK CECT 4626 2012 stock.",
          caption:
            "DHAK activity assay of the CECT 4626 variant, 2012 stock, working cell-free extract, re-expressed after the first purification attempts and used in **round 1** of the coupled assay. Initial rate 198.5 mOD/min (R² = 1.00), about 31.9 nmol DHAP/min and ~6.4 U/mL (5 µL assayed).",
        },
      ],
      tables: [
        {
          caption:
            "Activity of the two cell-free-extract batches of *C. freundii* CECT 4626 DHAK (2012 stock), measured by the coupled α-GDH/TIM assay with 5 µL of extract. Protein was quantified by Bradford only for the first batch, and the two sample volumes disagreed, so **no specific activity is assigned to either extract** (see 1.4).",
          headers: [
            "Parameter",
            "CFE, first batch (Figure 33)",
            "CFE, working batch (Figure 42)",
          ],
          rows: [
            ["Initial rate", "581.1 mOD/min", "198.5 mOD/min"],
            ["R²", "1.00", "1.00"],
            ["DHAP formation rate", "93.4 nmol/min", "31.9 nmol/min"],
            ["Volumetric activity (5 µL assayed)", "18.7 U/mL", "6.4 U/mL"],
          ],
        },
      ],
    },
    {
      id: "active-dialysed-imac",
      title: "1.7 Dialysed IMAC eluate (DHAK CECT 4626, 2012 stock)",
      body: [
        "The affinity route had already returned one dialysed eluate of this stock with no measurable activity (Figure 41). **This section reports a separate preparation**, produced from a **fresh expression of the same 2012 stock** and concentrated by centrifugal ultrafiltration after dialysis. **We did not control the difference**, so the comparison between them is descriptive rather than causal.",
        "Before setting up the coupled assay with purified enzyme, the dialysed IMAC eluate of the 2012 stock (concentrated by Centricon) was **assayed on its own**, so that the amount of active DHAK entering the reaction was known rather than assumed. The trace gave an initial rate of **850.1 mOD/min** (R² = 0.999; Figure 43), a volumetric activity of **~20 U/mL**. Bradford against a BSA standard curve gave **1.990 mg/mL** of protein (Table 15), so the **specific activity of the purified preparation is ~10 U/mg**.",
      ],
      figures: [
        {
          src: `${FIGURES}/dhak-activity-cect4626-2012-imac.png`,
          alt: "Steep coupled assay trace of the dialysed, concentrated IMAC eluate of the DHAK CECT 4626 2012 stock.",
          caption:
            "DHAK activity of the dialysed IMAC eluate of the CECT 4626 2012 stock (IMAC + Centricon), measured by the coupled α-GDH/TIM assay (~7 µL of enzyme). Initial rate **850.1 mOD/min** (R² = 0.999), equivalent to **~20 U/mL** and a specific activity of **~10 U/mg**.",
        },
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
      bodyAfter: [
        "This is the measurement that was **missing from the whole purification line**, an affinity preparation of this enzyme that is **active**. At **~10 U/mg**, the specific activity is essentially the **10.7 U/mg reported for the fully purified enzyme** [10], so the IMAC step followed by concentration delivered DHAK at close to its maximum specific activity. The eluate was **concentrated by centrifugal ultrafiltration (Centricon)** rather than left dilute, so the activity was **retained and concentrated instead of lost**.",
        "The result was **not expected** in the light of the earlier purifications, which had **failed to deliver an active preparation** of this enzyme. It is what **made it possible to run the coupled assay with purified enzyme**, with a known amount of DHAK (3 U) entering the reaction, and to refer the turnover to a known amount of protein rather than to a volume of extract.",
      ],
    },
  ],
};

const COUPLED_ASSAY: ResultData = {
  id: "coupled-assay",
  tabLabel: "Coupled DHAK–PPK2 assay",
  title: "Coupled DHAK–PPK2 assay, ATP regeneration from polyphosphate",
  narrative: true,
  enzymes: ["DHAK", "PPK2"],
  subsections: [
    {
      id: "coupled-round-1",
      title: "2.1 Round 1 — DHAK cell-free extract with purified PPK2",
      body: [
        "The coupled reaction was run with **about 3 U of DHAK (cell-free extract)** and **purified PPK2**, **50 mM DHA** and a **substoichiometric 1.7 mM ATP**, with polyphosphate at **45 mM (R1)** or **90 mM (R2)**, sampled at 90 and 180 min. The design of this round, and the limit its result exposed, are set out in [Engineering, Iteration 9](/engineering#revalorisation).",
        "Polyphosphate was supplied as **chains of 12 phosphate units on average**, and every polyphosphate concentration in this section is given as **millimolar chains**. Each millimolar of polyphosphate therefore carries **12 mM of transferable phosphate**, so the two conditions supplied **540 mM and 1080 mM of phosphate** respectively. This matters because the reaction consumes **phosphate residues**, not whole chains, and PPK2 can draw repeatedly on the same chain.",
        "DHAP was quantified by the endpoint α-GDH/TIM assay, where the fall in A₃₄₀ is proportional to the DHAP formed. With **0.30 mM NADH in the well** (20 mM stock) and the **1:4 sample dilution**, the **detection ceiling** of this determination corresponds to **1.2 mM DHAP in the reaction**.",
        "PPK2 was purified by IMAC and its protein quantified by Bradford (Table 16). Its catalytic activity was **not measured in house**, because the ADP-to-ATP reaction it catalyses is not read by the α-GDH/TIM system used here, and measuring it directly would have required HPLC, which was not available to us. An isolated PPK2 assay was therefore never part of the plan, and the enzyme is judged on what it does in the coupled reaction, where the regeneration of ATP is read through the DHAP that DHAK can only keep forming if the nucleotide is being returned to it. To estimate the PPK2 entering the reaction, the specific activity reported for this enzyme by the host laboratory, **2 U/mg for the ADP-to-ATP reaction** [6], is combined with the Bradford protein. That estimate is only **approximate**. As with the DHAK extract, the readings sat **close to the assay blank** and the two sample volumes **did not agree**, at **4.83 mg/mL** with 1 µL and **1.26 mg/mL** with 5 µL, so the concentration is bounded to **roughly 1 to 5 mg/mL** rather than a single value, which at 2 U/mg places the PPK2 supplied at about **2.5 to 9.7 U/mL**.",
      ],
      tables: [
        {
          caption:
            "Bradford protein quantification of the PPK2 preparation (first production) at two sample volumes, against a BSA standard curve (y = 0.319 + 0.020·x, R² = 0.994). The 1 µL and 5 µL loads give inconsistent values and sit close to the assay blank, so no single reliable concentration could be assigned.",
          headers: [
            "Sample",
            "Absorbance (A₅₉₅, mean)",
            "Protein (mg/mL)",
            "Standard curve R²",
          ],
          rows: [
            ["PPK2 (1 µL)", "0.414", "4.83", "0.994"],
            ["PPK2 (5 µL)", "0.443", "1.26", "0.994"],
          ],
        },
      ],
      bodyAfter: [
        "Every reaction sample drove the assay to **full NADH consumption** (ΔA₃₄₀ ≈ 1.0, matching the 50 mM DHAP standard) at both polyphosphate concentrations and both time points (Table 17).",
      ],
    },
    {
      id: "coupled-round-1-table",
      continued: true,
      tables: [
        {
          caption:
            "Coupled DHAK-PPK2 endpoint assay with DHAK cell-free extract. A₃₄₀ before and after addition of α-GDH/TIM for each reaction sample and for the DHAP standard. Polyphosphate concentrations are millimolar chains, equivalent to 540 mM and 1080 mM of phosphate.",
          headers: ["Sample", "Before", "After", "ΔA₃₄₀"],
          rows: [
            ["DHAP 50 mM (standard)", "1.254", "0.236", "1.018"],
            ["R1 (45 mM polyP chains), 90 min", "1.105", "0.151", "0.954"],
            ["R1 (45 mM polyP chains), 180 min", "1.170", "0.087", "1.083"],
            ["R2 (90 mM polyP chains), 90 min", "1.166", "0.193", "0.973"],
            ["R2 (90 mM polyP chains), 180 min", "1.205", "0.148", "1.057"],
          ],
        },
      ],
      bodyAfter: [
        "Every sample drove the assay to full NADH consumption, so the signal sits at the **ceiling of the determination** and **cannot be read as a value**. Only the 50 mM standard developed. The 25 mM standard failed, so no calibration curve could be built, and every reaction sample matched the single saturated standard. The cause was the **volume of sample taken into each well** relative to the NADH provided. The 50 µL aliquot carried far more DHAP than the 0.30 mM NADH in the well could titrate, so the well was exhausted whatever the sample contained. The readings are therefore all but identical to one another and to the 50 mM standard because every well reached the same ceiling. They mark the **limit of the assay** rather than how much product each sample held, so no turnover can be calculated from them.",
        "This ceiling sits **below the ATP supplied**. The determination had been intended to place the ceiling just above the 1.7 mM ATP, so that a saturated signal would mean DHAP had exceeded the ATP and therefore that ATP had been regenerated. With the NADH level and the 1:4 dilution actually used, the ceiling instead fell to **1.2 mM, below the 1.7 mM ATP**. Saturation then shows only that DHAP reached **at least 1.2 mM** in every condition, not that it passed the ATP. What the round does establish is that **DHAP is formed in every condition**, at both polyphosphate concentrations and both time points, so **the coupled system runs**. Whether DHAP exceeds the stoichiometric ATP, the question the experiment was built to answer, **a saturated signal below the ATP cannot settle**. The experiment was repeated with a much **smaller aliquot per well**, which raises the ceiling back above the ATP. The redesign of the endpoint determination is set out in [Engineering, Iteration 9](/engineering#revalorisation), and the outcome is what **round 2** reports.",
      ],
    },
    {
      id: "coupled-round-2",
      title: "2.2 Round 2 — Purified DHAK with purified PPK2",
      body: [
        "For round 2, PPK2 was **produced again** and purified by IMAC ([Engineering, Iteration 10](/engineering#revalorisation)). Its protein was **1.331 mg/mL** by Bradford (Table 18), and taking the host-laboratory specific activity as the reference (**2 U/mg for the ADP-to-ATP reaction** [6]), the stock stands at **~2.2 U/mL**, so **0.63 U of PPK2** entered the reaction.",
      ],
      tables: [
        {
          caption:
            "Protein quantification of the purified PPK2 preparation (second production, IMAC) by the Bradford assay, against a BSA standard curve.",
          headers: [
            "Sample",
            "Absorbance (A₅₉₅, mean)",
            "Protein (mg/mL)",
            "Standard curve R²",
          ],
          rows: [["PPK2 purified (IMAC), 2 µL", "0.351", "1.331", "0.994"]],
        },
      ],
    },
    {
      id: "coupled-round-2-standards",
      continued: true,
      body: [
        "The coupled reaction was run with **both enzymes purified**, **3 U of DHAK** and **0.63 U of PPK2**, **50 mM DHA** and a **substoichiometric 1.7 mM ATP**. Polyphosphate was supplied **fed-batch**, in seven additions over the first hour, reaching a final **16.9 mM chains (R1)** and **50.4 mM chains (R2)**. At an average of 12 phosphate units per chain, those feeds carry **202.8 mM and 604.8 mM of transferable phosphate**.",
        "Critically, a **much smaller sample volume per well** kept the endpoint α-GDH/TIM determination **within the linear range** of the NADH read-out. The 25 and 50 mM DHAP standards now give **distinct, unsaturated signals** (ΔA₃₄₀ 0.462 and 0.873; Figure 44), so DHAP is read as a concentration rather than as a ceiling. Samples were taken at 1.5 h, with the negative control, which carried neither enzyme, staying flat (ΔA₃₄₀ 0.019, 0 mM).",
      ],
      figures: [
        {
          src: `${FIGURES}/coupled-dhap-standard-curve.png`,
          alt: "DHAP standard curve for the round 2 coupled endpoint assay, plotting DHAP concentration against the fall in absorbance at 340 nm.",
          caption:
            "DHAP standard curve for the coupled DHAK-PPK2 endpoint assay (round 2). DHAP concentration plotted against the fall in absorbance at 340 nm (ΔA₃₄₀, before minus after addition of α-GDH/TIM), from the 0, 25 and 50 mM DHAP standards. The linear fit, DHAP (mM) = 58.521·ΔA₃₄₀ − 1.4123 (R² ≈ 0.999), was used to convert the ΔA₃₄₀ of each reaction sample into DHAP. Unlike round 1, the standards fall on a straight line over the full 0 to 50 mM range, so the determination is within its linear region and the samples can be read as concentrations.",
        },
      ],
    },
    {
      id: "coupled-round-2-result",
      continued: true,
      body: [
        "R1 formed **16.44 mM DHAP** and R2 formed **49.15 mM DHAP** (Table 19), which is **32.9 % and 98.3 % conversion of the 50 mM dihydroxyacetone**, with R2 reaching essentially full conversion of the substrate. Because only **1.7 mM ATP** was supplied, these amounts required that the **ATP be regenerated**, with the nucleotide pool recycled **about 10 times in R1 and about 29 times in R2**, obtained by dividing the DHAP formed by the ATP supplied.",
        "Polyphosphate was in **large excess in both conditions**. Only about **8 % of the phosphate supplied** was transferred in either case, so the donor was never close to being exhausted and the limit on R1 was the **amount of polyphosphate fed**, not the amount of phosphate still available within it. That is what the larger feed in R2 changed, carrying the conversion from a third of the substrate to near-complete.",
      ],
      tables: [
        {
          caption:
            "Coupled DHAK-PPK2 endpoint assay with both enzymes purified. A₃₄₀ before and after addition of α-GDH/TIM, with DHAP interpolated against the 25 and 50 mM standards. Polyphosphate is given as millimolar chains, and the phosphate column converts it at 12 phosphate units per chain. Conversion is referred to the 50 mM dihydroxyacetone supplied.",
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
              "**32.9 %**",
              "202.8",
              "**8.1 %**",
            ],
            [
              "R2 (50.4 mM polyP chains, 1.5 h)",
              "0.934",
              "0.070",
              "0.864",
              "49.15",
              "**98.3 %**",
              "604.8",
              "**8.1 %**",
            ],
          ],
        },
      ],
    },
    {
      id: "coupled-round-2-reading",
      body: [
        "This is the result round 1 could not give. There, the sample volume drove every well to full NADH consumption, so the signal sat at the ceiling and no value could be read. With the **smaller aliquot** and both enzymes **purified**, the determination is linear, the standards resolve, and the DHAP formed is measured directly. The coupled system therefore **regenerates ATP** and sustains DHAK turnover **far beyond the nucleotide added at the start**, and the extent **scales with the polyphosphate supplied**.",
      ],
    },
  ],
};

export const REVALORISATION_SUBBLOCKS: ResultSubBlock[] = [
  {
    id: "computational-design",
    heading: "1. Computational protein design",
    intro:
      "Computational design served two purposes: a **DHAK that is more stable without losing activity**, and a **physical coupling of DHAK and PPK2** so that regenerated ATP passes directly from one active site to the other. The stabilisation line was first run on the reference DHAK and then rebuilt on the active variant once the activity assays had identified it, and the coupling line explored a **SpyTag/SpyCatcher fusion** in silico.",
    results: [DESIGN_DSM, DESIGN_CECT, DESIGN_CHANNELLING, DESIGN_SUPPLEMENTARY],
    outro:
      "**Conclusion.** Computational design delivered two outputs for the next build round. First, a **conservative PROSS stabilising set (design 1, 21 substitutions)** transferred onto the **active CECT 4626 DHAK**, chosen after the mid-range design 5 on the DSM 30040 reference proved inactive at the bench. The construct was synthesised, transformed and **expressed**, but the gene arrived late enough that **no activity measurement could be made before the wiki freeze**, so nothing is claimed here about whether the stabilisation works. Second, an **in silico model of a SpyTag/SpyCatcher-fused DHAK-PPK2 complex** with both folds preserved and a structured joining module, supporting direct channelling of the ATP intermediate. Both are **predictions awaiting experimental test**, and the transformed strain is available for a future team to take straight to expression.",
  },
  {
    id: "expression",
    heading: "2. Enzyme expression",
    intro:
      "The module needs DHAK and PPK2 produced in house, and it needs the **wild type** and the stabilised **PROSS 5** variant made under identical conditions so that the comparison between them means something. This is where the producing strains are built, the induction conditions fixed, and production first read out.",
    results: [TRANSFORMATION, GROWTH, INDUCTION, HARVEST, SDS_PAGE],
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
    results: [PURIFICATION_IMAC, PURIFICATION_EXPRESS_IMAC, PURIFICATION_SEC],
    outro: [
      "**Conclusion.** This sub-block delivered a **working affinity route**, a **diagnosis**, and one **unresolved inconsistency**. PPK2 was captured, washed and dialysed without difficulty, and a second preparation purified in the same way supplied the enzyme for the repeat of the coupled reaction. Both are **enriched rather than homogeneous**, which is what the block was designed to deliver, since PPK2 is used in catalytic support of DHAK and is not the measured species.",
      "For DHAK the route was first validated **indirectly** by express IMAC, which showed that the resin binds this enzyme and releases it whenever the protein is present, placing the wild-type failure **upstream in expression** rather than in purification. It was then validated **directly** on the active 2012 stock, whose crude extract and eluted fractions are shown on the same gel. That preparation is the one taken into the **second round of the coupled reaction**, so the affinity step and the function of the material it yields are reported on the **same sample**. Dialysis concentrated the sample rather than only exchanging buffer, and is treated here as part of the purification. None of these steps is **quantified**, since no flow-through or wash lane was loaded and no paired protein determination was made, so the block reports that the enzyme is **recovered in active form** but not how much of it is lost.",
      "Across preparations the outcome was **uneven**. One dialysed eluate showed **no measurable activity**, while later preparations reached the specific activity used in the coupled assay (section 1.7). We **did not control** the difference between them, so it cannot be assigned to a single variable, and the route should be read as one that **recovers active DHAK without yet doing so predictably**.",
      "Size exclusion **never stabilised** over four runs. Most of the absorbance eluted **past the DHAK window**, the one narrow symmetric peak was **lost** to a fraction collector started too late, and the collected fractions came from **broad or overlapping features**. Those fractions are taken to the activity assays, and the purification of DHAK **returns to the affinity route**, a decision set out in [Engineering, Iteration 7](/engineering#revalorisation).",
    ],
  },
  {
    id: "activity",
    heading: "4. Enzyme activity assay",
    intro: [
      "The revalorisation module depends on **two enzymatic activities working together**, the **phosphorylation of dihydroxyacetone by DHAK** and the **regeneration of ATP by PPK2**. We tested them in two steps. First, **DHAK was assayed on its own**, across its variants and preparations, to confirm that the enzyme is **catalytically active** and to fix a **baseline rate**. Then the **two enzymes were run together**, with **polyphosphate as the phosphate donor**, to test the system as it is meant to operate, where **PPK2 rebuilds the ATP that DHAK spends** so that the reaction is **no longer limited by the small amount of nucleotide** added at the start. Both assays read out the same product, **dihydroxyacetone phosphate (DHAP)**, through the **coupled α-GDH/TIM reaction [12]**, which ties the **NADH signal to the DHAP formed** and lets the single-enzyme and coupled results be **compared on the same scale**.",
      "The DHAK assays are reported **in the order in which they were run**, because each one determined what was attempted next. This is not a comparison of variants decided in advance; it is a diagnostic chain in which the preparation measured at each point was chosen by what the previous measurement had ruled out, and the decisions it forced are documented in [Engineering](/engineering#revalorisation).",
    ],
    results: [DHAK_ACTIVITY, COUPLED_ASSAY],
    outro: [
      "**Conclusion.** The activity work delivered an **active DHAK preparation** and a **coupled DHAK-PPK2 system that recycles its ATP pool**.",
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
  "[2] Siebold C, Arnold I, Garcia-Alles LF, Baumann U, Erni B. Crystal Structure of the *Citrobacter freundii* Dihydroxyacetone Kinase Reveals an Eight-stranded α-Helical Barrel ATP-binding Domain. Journal of Biological Chemistry [Internet]. 2003 Nov 1;278(48):48236–44. Available from: https://doi.org/10.1074/jbc.m305942200",
  "[3] Schrödinger, LLC. The PyMOL Molecular Graphics System [software]. Version 2.5. New York: Schrödinger, LLC; 2021.",
  "[4] Keeble AH, Howarth M. Power to the protein: enhancing and combining activities using the Spy toolbox. Chemical Science [Internet]. 2020 Jan 1;11(28):7281–91. Available from: https://doi.org/10.1039/d0sc01878c",
  "[5] Jumper J, Evans R, Pritzel A, Green T, Figurnov M, Ronneberger O, et al. Highly accurate protein structure prediction with AlphaFold. Nature [Internet]. 2021 Jul 15;596(7873):583–9. Available from: https://doi.org/10.1038/s41586-021-03819-2",
  "[6] Monterrey DT, Azcona L, Revuelta J, Sánchez-Moreno I, García-Junceda E. Polyphosphate Kinase from Burkholderia cenocepacia, One Enzyme Catalyzing a Two-Step Cascade Reaction to Synthesize ATP from AMP. International Journal of Molecular Sciences [Internet]. 2024 Dec 3;25(23):12995. Available from: https://doi.org/10.3390/ijms252312995",
  "[7] Passaro S, Corso G, Wohlwend J, Reveiz M, Thaler S, Somnath VR, et al. Boltz-2: towards accurate and efficient binding affinity prediction. bioRxiv (Cold Spring Harbor Laboratory) [Internet]. 2025 Jun 18; Available from: https://doi.org/10.1101/2025.06.14.659707",
  "[8] Sambrook J, Russell DW. Molecular cloning: a laboratory manual. 3rd ed. Cold Spring Harbor (NY): Cold Spring Harbor Laboratory Press; 2001.",
  "[9] Laemmli UK. Cleavage of Structural Proteins during the Assembly of the Head of Bacteriophage T4. Nature [Internet]. 1970 Aug 1;227(5259):680–5. Available from: https://doi.org/10.1038/227680a0",
  "[10] Sánchez-Moreno I. Dihidroxiacetona quinasa de *Citrobacter freundii* CECT 4626: una aproximación integral a un nuevo biocatalizador para la formación de enlaces C–C [doctoral thesis]. Madrid: Universidad Autónoma de Madrid; 2009. http://hdl.handle.net/10486/3594",
  "[11] Bastida A, Fernández-Mayoralas A, Gómez Arrayás R, Iradier F, Carretero JC, García-Junceda E. Heterologous over-expression of α-1,6-fucosyltransferase from *Rhizobium* sp. Chem Eur J. 2001;7(11):2390-6. Available from: https://doi.org/10.1002/1521-3765(20010601)7:11<2390::AID-CHEM23900>3.0.CO;2-0",
  "[12] Gauss D, Sánchez‐Moreno I, Oroz‐Guinea I, García‐Junceda E, Wohlgemuth R. Phosphorylation catalyzed by dihydroxyacetone kinase. European Journal of Organic Chemistry [Internet]. 2018 Mar 25;2018(23):2892–5. Available from: https://doi.org/10.1002/ejoc.201800350",
  "[13] Bradford M. A rapid and sensitive method for the quantitation of microgram quantities of protein utilizing the principle of Protein-Dye binding. Analytical Biochemistry [Internet]. 1976 May 1;72(1–2):248–54. Available from: https://doi.org/10.1006/abio.1976.9999",
  "[14] Sánchez-Moreno I, Benito-Arenas R, Montero-Calle P, Hermida C, García-Junceda E, Fernández-Mayoralas A. Simple and Practical Multigram Synthesis of d-Xylonate Using a Recombinant Xylose Dehydrogenase. ACS Omega [Internet]. 2019 Jun 18;4(6):10593–8. Available from: https://doi.org/10.1021/acsomega.9b01090",
];
