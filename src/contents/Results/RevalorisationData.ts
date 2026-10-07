import type { ResultData, ResultSubBlock } from "../../components/LabFolders/types";

/**
 * Revalorisation results, transcribed from the team's own Notion results
 * page ("Revalorisation", under WIKI / Results). The three sub-blocks,
 * their order and the record titles follow that page.
 *
 * The Activity sub-block in the source is partly duplicated: an early
 * "Ensayo actividad DHAK" toggle reports the same 16.64 mOD/min trace that
 * the later numbered record for the CECT 4626 2021 stock reports. Only the
 * numbered series is transcribed here, since it is the one that carries
 * the full comparison between variants and stocks; nothing is dropped,
 * only the duplicate.
 *
 * The source's own numbering of the DHAK records jumps (two records are
 * both numbered 3); they are renumbered in sequence below, which changes
 * no content. Purification, the coupled DHAK + PPK2 assay and the
 * temperature-stability assay still read [XXX] in the source and are
 * marked pending rather than written around.
 */

export const REVALORISATION_INTRO =
  "This block reports the revalorisation module: obtaining the transformed strains, growing and inducing them, recovering a clarified cell-free extract in which production can be read out, purifying the enzymes, and measuring the two activities the module depends on. Each record reports the outcome of the corresponding stage on the Experiments page, following the same order and titles.";

const TRANSFORMATION: ResultData = {
  id: "gene-acquisition",
  tabLabel: "Transformation",
  title: "Gene acquisition and bacteria transformation",
  subsections: [
    {
      id: "transformation",
      figures: [
        {
          caption:
            "Figure pending. BL21(DE3) transformed with the pET-28a(+) construct, showing abundant well-separated colonies under kanamycin selection.",
        },
      ],
      observations:
        "Both synthetic constructs, DHAK WT and DHAK PROSS 5 in pET-28a(+), transformed into chemically competent BL21 (DE3) and gave abundant, well separated colonies under kanamycin selection. PPK2 (BcPPK2-III) was transformed in parallel from its native sequence.",
      interpretation:
        "Both constructs entered the expression host at comparable efficiency from the same normalised input of 50 ng/µL, so the two DHAK variants start from equivalent material and a later difference between them cannot be blamed on the transformation. It also confirms that skipping propagation in a cloning strain was a safe shortcut for a construct delivered sequence verified.",
      expectation:
        "Yes. This stage was itself the response to an earlier failure. An initial attempt with a set of pre-existing strains failed for DHAK, because those cells carried a resistance marker other than kanamycin and did not survive kanamycin selection, while the PPK2 strains of the same collection grew normally. Re-ordering the gene as a fresh synthetic construct in a vector with a known marker removed that ambiguity rather than working around it, and the plates confirm it did.",
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
        "Two colonies per construct were picked into 5 mL preinocula with kanamycin at 50 µg/mL, diluted about fiftyfold into 50 mL of LB and grown at 37 ºC and 180 rpm. Three of the four DHAK cultures reached the induction window as planned, at OD₆₀₀ 0.5 to 0.7, while one of the wild-type cultures (WT1) was only caught at OD₆₀₀ 0.9.",
      interpretation:
        "The cultures are comparable, with one caveat that has to be carried forward: WT1 was induced later in its growth curve than the rest, so a lower yield in that particular flask would report the induction point and not the construct. Picking two colonies per construct is insurance against an unwanted mutation in one of them, and it is what allows a single anomalous flask to be set aside without restarting the stage.",
      expectation:
        "Partly. The window was met in three of four cultures. Overshooting OD₆₀₀ in one flask is a matter of sampling frequency rather than a failure of the protocol, and it is flagged here so that this flask is not read as a result about the wild-type enzyme.",
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
        "All cultures were induced and grew on to the harvest without any visible problem, under both the standard condition (IPTG 0.4 mM, 30 ºC) and, later, the mild one (IPTG 0.2 mM, 20 ºC). The mild run comprised eight cultures: DHAK WT and DHAK PROSS 5 in triplicate at 20 ºC, plus two cultures of the recovered DHAK 2021 strain kept at 30 ºC as the reference.",
      interpretation:
        "The induction step itself is not the limiting factor of this block, since the same inducer, the same window and the same post-induction regime delivered PPK2 and, as the gels show, DHAK from the 2021 strain and DHAK PROSS 5. Whatever went wrong with the wild-type construct happened downstream of switching transcription on.",
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
      body: ["Biomass was recorded for every culture by weighing the tared tubes before and after, to ±0.02 g."],
      tables: [
        {
          caption: "Standard condition, 30 ºC.",
          headers: ["Culture", "Biomass (g)"],
          rows: [
            ["DHAK WT 1", "0.50"],
            ["DHAK WT 2", "0.59"],
            ["DHAK PROSS 5 · 1", "0.66"],
            ["DHAK PROSS 5 · 2", "0.70"],
          ],
        },
        {
          caption: "Mild condition, 20 ºC, with the 2021 strain at 30 ºC.",
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
      observations:
        "Every pellet lysed: the suspension visibly cleared during the 30 min lysozyme step, and centrifugation gave a clear, only slightly turbid supernatant in every case.",
      interpretation:
        "Two things. First, biomass is not the problem. Every culture gave half a gram or more of cells, the PROSS 5 flasks slightly more than the wild type under the standard condition, so any shortfall in enzyme is a shortfall per gram of cells and not a shortfall of cells. Second, enzymatic lysis alone is sufficient for this material: because the lysate cleared and the extract came out clear, neither sonication nor streptomycin sulfate precipitation was needed. The practical consequence is that the missing signals reported below are not artefacts of a badly handled extract.",
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
    "Production was read on polyacrylamide gels of the crude extracts and, alongside them, of the fractions from the Co²⁺ resin binding test, so that the same gel reports both how much enzyme is present and whether it behaves as a His-tagged protein should.",
  subsections: [
    {
      id: "gel-1",
      title: "Crude extracts of DHAK WT and DHAK PROSS 5, and binding to Co²⁺ resin",
      figures: [
        {
          caption:
            "Figure pending. Crude extracts of DHAK WT and DHAK PROSS 5 and their binding to Co²⁺ resin.",
        },
      ],
      observations:
        "DHAK PROSS 5 is expressed and binds the resin well, appearing both in the crude extract and, enriched, in the resin fractions. DHAK WT gave no detectable expression, in the extract or on the resin. An unknown contaminant of higher molecular weight is also visible.",
      interpretation:
        "The stabilised variant survives the whole route from gene to soluble, tagged protein, which is the outcome the block needed in order to move on to purification and activity. The wild type does not, and since both constructs were transformed, grown, induced and lysed under identical conditions, the failure has to lie in the construct or in its expression rather than in the handling. It may also be attributable to the age of the sample, which could have been damaged over the years by repeated freeze-thaw cycles or faulty storage.",
      expectation:
        "No, and specifically not for the wild type. A freshly transformed, newly ordered synthetic gene is the case where expression is most likely to work, and the supplier's construct data were checked without anything unusual coming up. This is what turned the wild type into an open question rather than a setback to absorb, and what motivated both the search for milder induction conditions and the decision to recover the older strain in parallel.",
    },
    {
      id: "gel-2",
      title: "Crude extracts of the 2021 DHAK strain, resin fractions and purified DHAK PROSS 5",
      figures: [
        {
          caption:
            "Figure pending. Crude extracts of the 2021 DHAK strain, its resin fractions, and purified DHAK PROSS 5.",
        },
      ],
      body: [
        "The crude extracts of the old 2021 glycerol stocks (wells 1 and 2) show a band at about 60 kDa, slightly below the fifth marker band from the top. It is not the strong overexpression that would be expected of a hyperproducing strain, but the enzyme is present and recoverable.",
        "The resin fractions of that same material (lanes 10 and 11) show the band enriched but not fully pure.",
        "The purified DHAK PROSS 5 (lanes 3 and 9) again shows two bands, one of them running slightly above 60 kDa, higher than the mass expected for the monomer.",
      ],
      interpretation:
        "Three separate conclusions. First, the DHAK line is not lost: the 2021 strain expresses, and its cell-free extract is material that can be purified and assayed, which is what unblocked the block after the wild-type failure. Second, the partial enrichment on the resin is a known behaviour of this particular DHAK, which binds immobilised metal resin poorly through its tags; it is not evidence against the construct, and it is why the purification is not left at the affinity step but continued by FPLC. Third, the two bands of purified PROSS 5 are not explained by a disulfide bridge or a non-covalent interaction, since they persist in the presence of β-mercaptoethanol, and the larger species runs above the expected mass; this could come from the construct itself, but it is not established, as it can also be a bacterial protein.",
      expectation:
        "Partly, and in the most useful direction. Recovering the 2021 strain was a deliberate fallback rather than a hope, and it delivered. The anomalous double band of PROSS 5 was not expected and remains unresolved; it was recorded and set aside because the priority at this point is to establish whether the stabilised variant is active, not only stable and expressible.",
    },
  ],
  discussion: [
    "The read-out set three lines of work: re-grow both constructs under milder conditions (0.2 mM IPTG, 20 ºC) to test whether a slower induction increases the soluble fraction; purify DHAK PROSS 5 from the frozen cell-free extracts and measure its activity, since stability and expression say nothing about whether the designed variant still works; and recover the older DHAK strain, which expresses better, as a parallel source of enzyme independent of the synthetic constructs.",
  ],
};

const PURIFICATION_PPK2: ResultData = {
  id: "purification-ppk2",
  tabLabel: "PPK2 purification",
  title: "Purification of PPK2",
  pending: true,
  subsections: [],
};

const PURIFICATION_DHAK: ResultData = {
  id: "purification-dhak",
  tabLabel: "DHAK purification",
  title: "Purification of DHAK",
  pending: true,
  subsections: [],
};

const DHAK_DSM: ResultData = {
  id: "dhak-dsm-30040",
  tabLabel: "DHAK DSM 30040",
  title: "DHAK wild type (Citrobacter freundii DSM 30040)",
  description:
    "The reference variant, ordered as a synthetic gene from the PDB 1UN9 sequence.",
  subsections: [
    {
      id: "dsm-activity",
      figures: [
        {
          caption:
            "Figure pending. DHAK activity assay of the DSM 30040 wild type by the coupled α-GDH/TIM assay; the fall in A₃₄₀ gives an initial rate of only 3.73 mOD/min (R² = 0.991).",
        },
      ],
      observations:
        "In the coupled α-GDH/TIM assay the absorbance at 340 nm fell only slightly, giving an initial rate of 3.73 mOD/min (R² = 0.991), equivalent to a DHAP formation rate of about 0.60 nmol/min. The fit is clean but the slope is far shallower than any of the CECT 4626 preparations.",
      interpretation:
        "This enzyme was only weakly active. A linear but shallow trace points to a low amount of functional DHAK rather than to a failed assay, since the reaction and the coupling system behaved normally.",
      expectation:
        "No. This is the reference variant of C. freundii DHAK, the sequence crystallised as PDB 1UN9 (strain DSM 30040), ordered as a synthetic gene. Its low activity, set against the much higher activity of the CECT 4626 variant, is consistent with the two being distinct natural variants that differ at 22 residues, the CECT 4626 one being the more catalytically efficient. This led us to move to the CECT 4626 variant kept in the laboratory.",
    },
  ],
};

const DHAK_2021: ResultData = {
  id: "dhak-cect-2021",
  tabLabel: "CECT 4626, 2021",
  title: "DHAK wild type (Citrobacter freundii CECT 4626, 2021 stock)",
  subsections: [
    {
      id: "cect-2021-activity",
      figures: [
        {
          caption:
            "Figure pending. DHAK activity assay of the CECT 4626 variant, 2021 stock, purified. Initial rate 16.64 mOD/min (R² = 0.989), equal to 2.68 nmol DHAP/min from 1 µL of enzyme.",
        },
      ],
      observations:
        "The absorbance at 340 nm fell steadily at an initial rate of 16.64 mOD/min (R² = 0.989), starting from A₃₄₀ ≈ 1.25, the value expected for 0.2 mM NADH over a 1 cm path. The slope corresponds to a DHAP formation rate of 2.68 nmol/min from 1 µL of this purified preparation, a volumetric activity of about 2.7 U/mL.",
      interpretation:
        "This preparation is clearly active, and already several-fold more active than the DSM 30040 variant, confirming that the change of variant was the right move. The rate is still modest, which pointed us to look for a better-performing stock of the same enzyme before committing to downstream work.",
      expectation:
        "Partly. The CECT 4626 variant is characterised as the most catalytically efficient DHAK described to date (kcat/Km ≈ 2×10⁷ M⁻¹s⁻¹, kcat ≈ 24 s⁻¹, Km for DHA ≈ 1.2 µM), so a clear activity was expected; its moderate level, however, was lower than that reference would suggest and led us to test a different stock of the same variant.",
    },
  ],
};

const DHAK_2012: ResultData = {
  id: "dhak-cect-2012",
  tabLabel: "CECT 4626, 2012",
  title: "DHAK wild type (Citrobacter freundii CECT 4626, 2012 stock)",
  description:
    "By far the most active of the series, measured in two forms of the same enzyme: the cell-free extract and the enzyme purified by FPLC and concentrated.",
  subsections: [
    {
      id: "cect-2012-activity",
      body: [
        "Both preparations were assayed under identical conditions with 5 µL of preparation. The cell-free extract gave the steepest trace of the whole study, an initial rate of 581.1 mOD/min (R² = 1.00), while the purified enzyme gave 198.5 mOD/min (R² = 1.00). Protein in the extract was quantified by Bradford against a linear BSA curve (R² = 0.994).",
      ],
      figures: [
        {
          caption:
            "Figure pending. Activity assay of the 2012 stock as cell-free extract (581.1 mOD/min); the same stock purified by FPLC and concentrated (198.5 mOD/min); and the Bradford quantification of the extract against a linear BSA standard curve (R² = 0.994).",
        },
      ],
      tables: [
        {
          caption: "The two preparations of the 2012 stock compared.",
          headers: ["Parameter", "Cell-free extract", "Purified (FPLC + Centricon)"],
          rows: [
            ["Initial rate", "581.1 mOD/min", "198.5 mOD/min"],
            ["R²", "1.00", "1.00"],
            ["DHAP formation rate", "93.4 nmol/min", "31.9 nmol/min"],
            ["Volumetric activity (5 µL assayed)", "18.7 U/mL", "6.4 U/mL"],
            ["Protein (Bradford)", "~1.8 mg/mL", "—"],
            ["Specific activity", "~10 U/mg", "—"],
          ],
        },
      ],
      observations:
        "Both preparations are highly active, but the cell-free extract is about 2.9 times more active per microlitre than the purified enzyme, so purification and concentration retained only about one third of the activity delivered per unit volume.",
      interpretation:
        "The extract's specific activity, about 10 U/mg (one unit = 1 µmol DHAP per minute), sits just below the ~12 µmol·min⁻¹·mg⁻¹ reported for the purified enzyme. That a crude extract already approaches the purified value shows that DHAK makes up a large fraction of the soluble protein in this strongly expressing stock.",
      expectation:
        "Yes, and it drove a clear decision. Losing activity on purification is common when the enzyme is sensitive to the purification and concentration steps or loses a stabilising environment, while the crude extract keeps it in a richer, more protective matrix. Because the extract was both more active per volume and simpler to prepare, and supported by reports of the operational and economic advantages of using cell-free extracts rather than purified enzymes at industrial scale, we decided to keep the DHAK in cell-free-extract form for all subsequent coupled DHAK–PPK2 experiments. The purified enzyme was characterised here for comparison, but it was the extract that we carried forward.",
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
          caption:
            "Figure pending. DHAK activity assay of the PROSS design 5 variant. A₃₄₀ stays essentially flat and the fitted slope (0.92 mOD/min) has R² = 0.374, so no activity can be reliably measured.",
        },
      ],
      observations:
        "The absorbance at 340 nm stayed essentially flat. The fitted slope of 0.92 mOD/min has R² = 0.374, so no reliable rate can be extracted.",
      interpretation:
        "The PROSS design 5 variant showed no measurable kinase activity. Whatever stability the design may have gained came at the cost of function.",
      expectation:
        "No. Design 5 sat in the middle of the conservative-to-aggressive range PROSS returned, and we expected it to keep activity comparable to the wild type. The loss of activity indicated that its mutation load was too high and likely disturbed the geometry around the active site or the packing between domains, even with the ligand-contact residues protected. This sent us back to a more conservative PROSS variant, now being tested, while the CECT 4626 wild type is used in the meantime.",
    },
  ],
};

const COUPLED_ASSAY: ResultData = {
  id: "coupled-assay",
  tabLabel: "Coupled assay",
  title: "Coupled DHAK + PPK2 assay",
  description:
    "The test of the system as it is meant to operate, with polyphosphate as the phosphate donor so that PPK2 rebuilds the ATP that DHAK spends and the reaction is no longer limited by the small amount of nucleotide added at the start.",
  pending: true,
  subsections: [],
};

const THERMAL_STABILITY: ResultData = {
  id: "thermal-stability",
  tabLabel: "Thermal stability",
  title: "Temperature stability",
  pending: true,
  subsections: [],
};

export const REVALORISATION_SUBBLOCKS: ResultSubBlock[] = [
  {
    id: "expression",
    heading: "1. Expression of DHAK and PPK2 in E. coli BL21 (DE3)",
    intro:
      "The module needs DHAK and PPK2 produced in house, and it needs the wild type and the stabilised PROSS 5 variant of DHAK made under identical conditions so that the comparison between them means something. This is where the producing strains are built, the induction conditions are fixed and production is first read out.",
    results: [TRANSFORMATION, GROWTH, INDUCTION, HARVEST, SDS_PAGE],
    outro:
      "This sub-block did not deliver the intended side-by-side comparison of wild type and PROSS 5, because the wild type did not express. What it did deliver is what the rest of the module depends on: a transformation and induction routine that reliably produces PPK2 and DHAK PROSS 5 in E. coli BL21 (DE3), an enzymatic lysis route that gives a clear cell-free extract without sonication or streptomycin sulfate, evidence on gel that PROSS 5 is expressed and binds immobilised metal resin, and a recovered 2021 strain that provides DHAK while the wild-type construct is investigated. Two questions are carried forward, the silent wild type and the identity of the extra band in purified PROSS 5, and both are read-out questions about specific constructs rather than problems with the production route itself.",
  },
  {
    id: "purification",
    heading: "2. Purification",
    intro:
      "Affinity purification of both enzymes, continued by FPLC for DHAK because it binds immobilised metal resin poorly through its tags.",
    results: [PURIFICATION_PPK2, PURIFICATION_DHAK],
  },
  {
    id: "activity",
    heading: "3. Activity",
    intro:
      "The module depends on two enzymatic activities working together, the phosphorylation of dihydroxyacetone by DHAK and the regeneration of ATP by PPK2. DHAK was assayed on its own first, to confirm the purified enzyme is catalytically active and fix a baseline rate, and the two enzymes were then run together. Both assays read out the same product, dihydroxyacetone phosphate, through the coupled α-GDH/TIM reaction, which ties the NADH signal to the DHAP formed and lets the single-enzyme and coupled results be compared on the same scale.",
    results: [DHAK_DSM, DHAK_2021, DHAK_2012, DHAK_PROSS, COUPLED_ASSAY, THERMAL_STABILITY],
  },
];
