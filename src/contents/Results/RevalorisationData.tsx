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

export const REVALORISATION_INTRO = [
  "**Scope of this page.** The outcomes of the revalorisation module: obtaining the transformed strains, growing and inducing them, recovering a clarified cell free extract in which production can be read out, purifying the enzymes and measuring the activities the module depends on. The design and rationale of each stage are on the Experiments page, and the stage titles below follow it.",
  "Each entry answers three questions: what was obtained, what it means, and whether it matched what we expected.",
];

/* ---------- Computational protein design ---------- */

const DESIGN_DSM: ResultData = {
  id: "design-dhak-dsm-30040",
  tabLabel: "Stabilisation, DSM 30040",
  title: "In silico stabilisation of DHAK from *C. freundii* DSM 30040",
  subsections: [{
    id: "pross-cycle-1",
    observations: "PROSS returned **nine designs**, from 21 substitutions (3.9%) to 119 (22.2%). With budget for one gene, **design 5** was selected as the mid-range option: **56 substitutions (10.4%)**. The underlying alignment contained more than 3,000 homologues with high coverage.",
    interpretation: "Structural superposition preserved the K- and L-domains and the dimer interface, and no residue within 4 Å of AMP-PNP, DHA or Mg²⁺ was changed. This established that the design was structurally plausible, not that it remained active.",
    expectation: "The structural checks passed, but design 5 later proved inactive. That result redirected stabilisation onto the active CECT 4626 background.",
  }],
};

const DESIGN_CECT: ResultData = {
  id: "design-dhak-cect-4626",
  tabLabel: "Stabilisation, CECT 4626",
  title: "In silico stabilisation of DHAK CECT 4626",
  subsections: [{
    id: "pross-cycle-2",
    observations: "The stabilisation was rebuilt on the active **CECT 4626** sequence. The most conservative design was selected: **design 1, 21 substitutions (3.9%)**, transferred position by position while distinguishing natural strain differences from PROSS substitutions.",
    interpretation: "Using the conservative design minimised the mutations added on top of the approximately 22 positions at which CECT 4626 naturally differs from DSM 30040. A codon-optimised gene was generated, ordered and transformed.",
    expectation: "The design was completed, but it was **not induced or assayed**, so no conclusion can yet be drawn about stability or activity.",
  }],
};

const DESIGN_CHANNELLING: ResultData = {
  id: "design-channelling",
  tabLabel: "SpyTag/SpyCatcher",
  title: "Channelling the biocatalytic complex (SpyTag/SpyCatcher)",
  subsections: [{
    id: "spytag-spycatcher-design",
    observations: "DHAK–SpyTag and PPK2–SpyCatcher were explored with AlphaFold and Boltz2. Modelling each split element alone failed for PPK2, while modelling each enzyme with the complete SpyTag/SpyCatcher system produced well-folded partners that could be superposed through the interface.",
    interpretation: "The final model provides a viable geometry in which both enzymes retain their folds and the joining module is structured. It also shows why split systems may need to be modelled as a complete unit even when the proteins are expressed separately.",
    expectation: "The work remained **computational only**: the fusion was not expressed or tested experimentally.",
  }],
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
          caption: "Biomass per culture, mild condition, 20 ºC, with the 2021 strain at 30 ºC.",
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
          caption: "SDS-PAGE of the crude extract of PPK2 and of the original DHAK wild type. Lane contents are given in the accompanying table.",
        },
      ],
      tables: [{
        headers: ["Lane", "Sample"],
        rows: [
          ["4", "Molecular mass markers"],
          ["5", "Crude extract, PPK2"],
          ["6", "Flow-through, PPK2 (purification block)"],
          ["7", "Dialysed IMAC eluate, PPK2 (purification block)"],
          ["9", "Crude extract, DHAK WT (1)"],
          ["10", "Crude extract, DHAK WT (2)"],
        ],
      }],
      observations: "The first gel was run to confirm the production of PPK2, whose expression conditions had already been optimised by the host laboratory [6], so only the crude extract had to be checked. A band at the position expected for PPK2-III stands out over the normal pattern of host proteins in lane 5. The same gel also carried the crude extract of the original DHAK wild type in lanes 9 and 10, and there no band appears at the expected mass.",
      interpretation: "PPK2 and this strain were carried forward unchanged for the rest of the module. The route opened by the failure of the original DHAK wild type is followed in Engineering, Iteration 1.",
      expectation: "The PPK2 result was expected. The absence of the DHAK wild-type band was not.",
    },
    {
      id: "gel-2",
      title: "Confirming the wild-type failure and checking the designed variant",
      figures: [
        {
          src: `${FIGURES}/sds-page-dhak-wt-pross5.jpg`,
          alt: "SDS-PAGE of the crude extracts of DHAK WT and DHAK PROSS 5.",
          caption: "SDS-PAGE of the crude extracts of DHAK WT and DHAK PROSS 5. Lane contents are given in the accompanying table.",
        },
      ],
      tables: [{
        headers: ["Lane", "Sample"],
        rows: [
          ["1", "Not loaded"],
          ["2", "Crude extract, DHAK WT DSM 30040 (1)"],
          ["3", "Crude extract, DHAK WT DSM 30040 (2)"],
          ["4", "Crude extract, DHAK PROSS 5 (1)"],
          ["5", "Crude extract, DHAK PROSS 5 (2)"],
          ["6", "Molecular mass markers"],
          ["7", "DHAK WT DSM 30040, express purification eluates (1) (purification block)"],
          ["8", "DHAK PROSS 5, express purification eluates (1) (purification block)"],
          ["9", "DHAK WT DSM 30040, express purification eluates (2) (purification block)"],
          ["10", "DHAK PROSS 5, express purification eluates (2) (purification block)"],
        ],
      }],
      observations: "Because the first gel gave no DHAK band, a second one was run with the crude extracts of DHAK WT and DHAK PROSS 5. For the wild type it confirms the first read-out, since its extracts again show only the host proteome with nothing at the expected mass. **DHAK PROSS 5 appears here for the first time and is clearly expressed**, accompanied by a contaminating band of higher molecular mass in the upper part of the gel.",
      interpretation: "Both results are checked again on the third gel. On the strength of this read-out, PROSS 5 was taken forward to purification and then to activity, on the same path as PPK2.",
      expectation: "The expression of PROSS 5 was the intended outcome. The persistent failure of the original wild type was unexpected.",
    },
    {
      id: "gel-3",
      title: "Introducing an alternative strain before discarding anything",
      figures: [{
        src: `${FIGURES}/sds-page-2021-pross5-wt.png`,
        alt: "SDS-PAGE of the DHAK CECT 4626 2021 strain, DHAK PROSS 5 and the original DHAK wild type.",
        caption: "SDS-PAGE of the crude extracts of the DHAK CECT 4626 2021 strain, DHAK PROSS 5 and the original DHAK wild type. Lane contents are given in the accompanying table.",
      }],
      tables: [{
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
      }],
      observations: "Rather than discard the original wild type on two gels alone, a third gel was run in which the alternative DHAK CECT 4626 was loaded for the first time. The new 2021 strain in lanes 1 and 2 shows no band either; PROSS 5 in lane 3 is confirmed as expressing, again with the higher-mass contaminant; and the original wild type in lanes 4 and 5 is confirmed as not expressing.",
      interpretation: "Neither of the two silent constructs was discarded on this evidence. The absence of a band was weighed against the activity of their crude extracts, and only then was the original wild type definitively set aside. The same applies to the 2021 strain, whose fate was likewise left to the activity measurements.",
      expectation: "The 2021 stock was chosen because the host laboratory had shown it to be the most active DHAK available and because the more recent material was expected to have suffered less from long-term storage. Its missing band was therefore unexpected.",
    },
    {
      id: "gel-4",
      title: "Confirming expression of the CECT 4626 2012 stock",
      figures: [{
        src: `${FIGURES}/sds-page-2012-imac.png`,
        alt: "SDS-PAGE of DHAK CECT 4626 2012 crude extract and its IMAC eluates.",
        caption: "SDS-PAGE of the crude extract of DHAK CECT 4626 2012 and of the two fractions eluted from its purification by IMAC. The crude extract shows the band expected for DHAK at 60 kDa.",
      }],
      tables: [{
        headers: ["Lane", "Sample"],
        rows: [
          ["1", "Molecular mass markers"],
          ["2", "CFE, crude extract of DHAK CECT 4626 2012"],
          ["3", "F-1, IMAC eluate (purification block)"],
          ["4", "F-2, IMAC eluate after dialysis (purification block)"],
        ],
      }],
      observations: "Until this point the expression of the CECT 4626 2012 stock had been taken for granted from its activity, without being checked on a gel. The gel run on the preparation that fed the coupled reaction closes that gap. The crude extract shows a distinct band at the mass expected for DHAK [10], standing out over the dense host pattern that fills the rest of the lane.",
      interpretation: "This confirms directly what the activity had already indicated indirectly: this strain produces the enzyme in appreciable amount. The same gel carries the two fractions eluted from its purification, which are read in the purification block.",
      expectation: "The result was expected. This is the only one of the four DHAK constructs examined on a gel that gives the expected expression read-out.",
    },
    {
      id: "gel-5",
      title: "Confirming PPK2 expression in the assay preparation",
      figures: [{
        src: `${FIGURES}/sds-page-ppk2-imac.png`,
        alt: "SDS-PAGE of PPK2 crude extract and its IMAC eluates.",
        caption: "SDS-PAGE of the crude extract of PPK2 and of the two fractions eluted from its purification by IMAC. The crude extract shows the band expected for PPK2 at 32 kDa.",
      }],
      tables: [{
        headers: ["Lane", "Sample"],
        rows: [
          ["1", "Molecular mass markers"],
          ["2", "CFE, crude extract of PPK2"],
          ["3", "F-1, IMAC eluate (purification block)"],
          ["4", "F-2, IMAC eluate after dialysis (purification block)"],
        ],
      }],
      observations: "The PPK2 crude extract gives a band at 32 kDa, the mass calculated for the tagged subunit. The band is modest against the host background, which is consistent with a construct expressed in soluble form at a level sufficient for the assay rather than one that dominates the lysate.",
      interpretation: "Since the enzyme is used in catalytic support of DHAK and not as the measured species, that level was taken as adequate and the construct was carried straight to purification.",
      expectation: "The result was expected and confirms that the behaviour already optimised by the host laboratory was reproduced here.",
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
  subsections: [{
    id: "imac-result",
    body: [
      "Dialysis is reported together with IMAC rather than as an independent experiment, because it is the step that immediately follows elution: every eluate goes straight into a dialysis bag, and the same gel carries the affinity fractions and the dialysed sample. Separating them would split one gel across two sections and lose the comparison that makes the dialysis result visible. The affinity step follows the procedure established in this laboratory for related His-tagged enzymes [11].",
      "For PPK2, the crude extract gives the expected band at 32 kDa, and the dialysed IMAC eluate retains that band while removing most of the host-protein background. PPK2 was therefore retained by the Co²⁺ resin and recovered as the dominant species in the dialysed eluate.",
      "For the first DHAK affinity run, the wild-type and CECT 4626 2021 eluates were empty because their crude extracts contained no visible target protein. PROSS 5 did bind and elute, but it consistently appeared together with an unidentified band of higher molecular mass. Dialysis visibly concentrated that preparation but did not separate the two species.",
      "The previous gel allowed the affinity step to be judged only on PROSS 5, because that was the one construct with enough protein on it. Returning to IMAC with the 2012 stock, now with an enzyme known to be strongly active at the outset, finally gives that reading. The crude extract carried the full host background, whereas the two eluted fractions carried a dominant band at 60 kDa and had lost most of the host species. The first fraction was more concentrated, as expected. Two minor species remained, so the preparation was enriched rather than homogeneous.",
      "What this establishes is that the affinity step works on this enzyme too: the resin retains it and gives it back. The step was not quantified, since no flow-through or wash lane was run and the gel was not loaded on equal protein, so neither loss to the resin nor recovery can be stated from the image.",
    ],
    interpretation: "The affinity step worked whenever target protein was present. PPK2 supplied a preparation clean enough for the coupled assay; the unidentified upper PROSS 5 band remained unresolved, and the 2012 stock required activity measurements to determine whether purification had preserved function.",
    expectation: "PPK2 purified as intended. DHAK recovery was construct-dependent and prompted activity-led troubleshooting.",
  }],
};

const PURIFICATION_DIALYSIS: ResultData = {
  id: "purification-dialysis",
  tabLabel: "Dialysis",
  title: "Dialysis of IMAC eluates",
  subsections: [{ id: "dialysis-result", body: ["Every IMAC eluate went directly into dialysis to remove imidazole and salt before activity measurement. The dialysed samples were compared on the same gels as the crude extracts and affinity fractions, rather than treated as a separate experiment.", "Dialysis removed the small-molecule components of the elution buffer and visibly concentrated the PROSS 5 preparation on the gel. The same buffer-exchange step was used for PPK2 and for the later CECT 4626 2012 preparations."], interpretation: "Dialysis functioned as both buffer exchange and a practical concentration step before activity measurement.", expectation: "The buffer exchange was expected; the concentrating effect was not." }],
};

const PURIFICATION_EXPRESS_IMAC: ResultData = {
  id: "purification-express-imac",
  tabLabel: "Express IMAC",
  title: "Express Immobilised Metal Affinity Chromatography (Co²⁺-IDA-Agarose)",
  subsections: [{ id: "express-imac-result", body: ["The express IMAC was run to settle a single question: when a DHAK construct yields nothing after purification, is it because the enzyme was never made, or because the purification is losing it?", "DHAK PROSS 5 appeared in its eluates as the only intense species, accompanied by the same unidentified second band seen on the preparative gel, so the resin binds it and gives it back. The wild type appeared nowhere, neither in its crude extract nor in its eluates.", "Taken together, the two observations separate the two possibilities. Because the resin recovers the protein whenever the protein is there, the affinity step itself is working, and because the wild type is absent from its own extract before any resin is involved, its failure must lie in expression rather than in purification. The express protocol obtained that discrimination from microlitre volumes in a fraction of the time a full column run would have taken."], interpretation: "The affinity step was working; the wild-type failure lay in expression rather than purification.", expectation: "That the test would resolve the ambiguity was expected; that it would resolve it against the construct was not." }],
};

const PURIFICATION_SEC: ResultData = {
  id: "purification-sec",
  tabLabel: "SEC (FPLC)",
  title: "Size-exclusion chromatography (FPLC)",
  subsections: [{
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
    interpretation: "Size exclusion did not provide a reliable second route to purified DHAK. Fractions were carried into the activity assay to decide whether any active enzyme had nevertheless been recovered.",
    expectation: "None of this was expected. The method never stabilised, and the only clean separation was lost to a fraction collector started too late. With no time to develop it further, the work returned to IMAC.",
  }],
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
    },
    {
      id: "imac-return",
      title: "Returning to affinity purification",
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
  description: "This was a separate preparation produced from a fresh expression of the same 2012 stock and concentrated by centrifugal ultrafiltration after dialysis. The difference from the earlier inactive eluate was not controlled, so the comparison is descriptive rather than causal.",
  subsections: [{
    id: "active-imac-result",
    body: [
      "Before setting up the coupled assay with purified enzyme, the dialysed IMAC eluate concentrated by Centricon was assayed on its own, so that the amount of active DHAK entering the reaction was known rather than assumed. The trace gave an initial rate of **850.1 mOD/min** (R² = 0.999), equivalent to approximately **20 U/mL**. Bradford against a BSA standard curve gave **1.990 mg/mL** of protein, so the specific activity was approximately **10 U/mg**.",
      "This is the measurement that was missing from the purification line: an affinity preparation of this enzyme that is active. At approximately 10 U/mg, its specific activity is essentially the 10.7 U/mg reported for the fully purified enzyme [10]. The eluate was concentrated by centrifugal ultrafiltration rather than left dilute, so activity was retained and concentrated instead of lost.",
      "The result was not expected in light of the earlier purification failures. It made it possible to run the coupled assay with purified enzyme, with a known amount of DHAK entering the reaction.",
    ],
    tables: [{
      caption: "Protein quantification of the purified DHAK preparation (IMAC + Centricon) by the Bradford assay, against a BSA standard curve.",
      headers: ["Sample", "Absorbance (A₅₉₅, mean)", "Protein (mg/mL)", "Standard curve R²"],
      rows: [["DHAK purified (IMAC + Centricon), 2 µL", "0.269", "1.990", "0.994"]],
    }],
  }],
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
            ["Volumetric activity (5 µL assayed)", "**18.7 U/mL**", "**6.4 U/mL**"],
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
        "The reaction was repeated with **purified DHAK and purified PPK2** and a much smaller sample volume per well. The 25 and 50 mM DHAP standards now gave distinct, unsaturated signals. Under the same substrate conditions, R1 (45 mM polyphosphate) formed **16.44 mM DHAP**, while R2 (90 mM polyphosphate) formed **49.15 mM DHAP**, with reported yields of **97.2%** and **97.6%**.",
      tables: [
        {
          caption: "Coupled DHAK–PPK2 endpoint assay with both enzymes purified.",
          headers: ["Sample", "A₃₄₀ before", "A₃₄₀ after", "ΔA₃₄₀", "DHAP (mM)", "Yield"],
          rows: [
            ["Control (−)", "0.897", "0.878", "0.019", "0.00", "—"],
            ["DHAP 25 mM standard", "0.914", "0.452", "0.462", "25.00", "—"],
            ["DHAP 50 mM standard", "0.917", "0.044", "0.873", "50.00", "—"],
            ["R1 (45 mM polyP, 1.5 h)", "0.941", "0.636", "0.305", "16.44", "97.2%"],
            ["R2 (90 mM polyP, 1.5 h)", "0.934", "0.070", "0.864", "49.15", "97.6%"],
          ],
        },
      ],
      interpretation:
        "With only **1.7 mM ATP** supplied, these product concentrations require ATP regeneration: the nucleotide pool was recycled about **10 times in R1** and **29 times in R2**. R2 reached essentially full conversion of the 50 mM DHA, and the extent of conversion scaled with the polyphosphate supplied.",
      expectation:
        "**Yes.** This is the quantitative proof of concept that round 1 could not provide: the coupled system regenerates ATP and sustains DHAK turnover far beyond the nucleotide added at the start.",
    },
  ],
};

export const REVALORISATION_SUBBLOCKS: ResultSubBlock[] = [
  {
    id: "computational-design",
    heading: "1. Computational protein design",
    results: [DESIGN_DSM, DESIGN_CECT, DESIGN_CHANNELLING],
  },
  {
    id: "expression",
    heading: "2. Enzyme expression",
    intro:
      "The module needs DHAK and PPK2 produced in house, and it needs the **wild type** and the stabilised **PROSS 5** variant of DHAK made under identical conditions so that the comparison between them means something. This is where the producing strains are built, the induction conditions are fixed and production is first read out.",
    results: [TRANSFORMATION, GROWTH, INDUCTION, HARVEST, SDS_PAGE],
    outro:
      "**Conclusion.** This sub-block did not deliver the intended side by side comparison of wild type and PROSS 5, because the wild type did not express. What it did deliver is what the rest of the module depends on: a transformation and induction routine that reliably produces PPK2 and DHAK PROSS 5 in *E. coli* BL21 (DE3), an enzymatic lysis route that gives a clear cell free extract without sonication or streptomycin sulfate, evidence on gel that PROSS 5 is expressed and binds immobilised metal resin, and a recovered 2021 strain that provides DHAK while the wild type construct is investigated. Two questions are carried forward, the silent wild type and the identity of the extra band in purified PROSS 5, and both are read-out questions about specific constructs rather than problems with the production route itself.",
  },
  {
    id: "purification",
    heading: "3. Enzyme purification",
    results: [
      PURIFICATION_IMAC,
      PURIFICATION_DIALYSIS,
      PURIFICATION_EXPRESS_IMAC,
      PURIFICATION_SEC,
    ],
  },
  {
    id: "activity",
    heading: "4. Enzyme activity assay",
    intro:
      "The revalorisation module depends on **two enzymatic activities working together**, the phosphorylation of dihydroxyacetone by DHAK and the regeneration of ATP by PPK2. We tested them in two steps. First, DHAK was assayed on its own to confirm that the purified enzyme is catalytically active and to fix a baseline rate. Then the two enzymes were run together, with **polyphosphate as the phosphate donor**, to test the system as it is meant to operate, where **PPK2 rebuilds the ATP that DHAK spends** so that the reaction is no longer limited by the small amount of nucleotide added at the start. Both assays read out the same product, dihydroxyacetone phosphate (DHAP), through the coupled α-GDH/TIM reaction, which ties the NADH signal to the DHAP formed and lets the single-enzyme and coupled results be compared on the same scale.",
    results: [DHAK_DSM, DHAK_2021, DHAK_2012, DHAK_PROSS, PURIFIED_2012_STOCK, ACTIVE_DIALYSED_IMAC, COUPLED_ASSAY, COUPLED_ASSAY_ROUND_2],
  },
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
