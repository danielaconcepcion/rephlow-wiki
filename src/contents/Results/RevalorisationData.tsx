import type {
  ResultData,
  ResultSubBlock,
} from "../../components/LabFolders/types";
import { NotionMarkdownDocument } from "../../components/NotionMarkdownDocument";
import completeRevalorisationResults from "../RevalorisationSource/results.md?raw";

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
    "Production was read on polyacrylamide gels of the crude extracts and, alongside them, of the fractions from the Co²⁺ resin binding test (IMAC chromatography), so that the same gel reports both how much enzyme is present and whether it behaves as a His tagged protein should. Two gels were run, and they are presented here in the order they were run: the first screened the two synthetic DHAK constructs, and the second, run afterwards, tested the recovered 2021 strain and the first purified PROSS 5.",
  subsections: [
    {
      id: "gel-1",
      figures: [
        {
          src: `${FIGURES}/sds-page-dhak-wt-pross5.jpg`,
          alt: "SDS-PAGE of the crude extracts of DHAK WT and DHAK PROSS 5 and of their Co2+ resin fractions.",
          caption: "Crude extracts of DHAK WT and DHAK PROSS 5, and binding to Co²⁺ resin.",
        },
      ],
      observations:
        "**DHAK PROSS 5 is expressed and binds the resin well**, appearing both in the crude extract and, enriched, in the resin fractions. **DHAK WT gave no detectable expression**, in the extract or on the resin. As can be seen there is an unknown pollutant of a higher molecular weight.",
      interpretation:
        "The stabilised variant survives the whole route from gene to soluble, tagged protein, which is the outcome the block needed in order to move on to purification and activity. The wild type does not, and since both constructs were transformed, grown, induced and lysed under identical conditions, the failure has to lie in the construct or in its expression rather than in the handling. This can also be attributed to the age of the sample as it may have been damaged in the passing of years due to repeated thawing and freezing or faulty storage methods.",
      expectation:
        "No, and specifically not for the wild type. A freshly transformed, newly ordered synthetic gene is the case where expression is most likely to work, and the supplier's construct data were checked without anything unusual coming up. This is what turned the wild type into an open question rather than a setback to absorb, and what motivated both the search for milder induction conditions and the decision to recover the older strain in parallel.",
    },
    {
      id: "gel-2",
      figures: [
        {
          src: `${FIGURES}/sds-page-2021-strain-and-purified-pross5.jpg`,
          alt: "SDS-PAGE of the 2021 strain crude extracts, its resin fractions and purified DHAK PROSS 5.",
          caption: "Crude extracts of the 2021 DHAK strain, resin fractions and purified DHAK PROSS 5.",
        },
      ],
      body: [
        "Three things on one gel. The **crude extracts of the old 2021 glycerol stocks** (wells 1 and 2) show a **band at about 60 kDa**, slightly below the fifth marker band from the top. It is not the strong overexpression that would be expected of a hyperproducing strain, but the enzyme is present and recoverable.",
        "The **resin fractions of that same material** (lanes 10 and 11) show the band **enriched but not fully pure**.",
        "The **purified DHAK PROSS 5** (lanes 3 and 9), again shows **two bands**, one of them running **slightly above 60 kDa**, higher than the mass expected for the monomer.",
      ],
      interpretation:
        "Three separate conclusions, one per observation. First, the DHAK line is not lost: the 2021 strain expresses, and its CFE is material that can be purified and assayed, which is what unblocked the block after the wild type failure. Second, the partial enrichment on the resin is a **known behaviour of this particular DHAK**, which binds immobilised metal resin poorly through its tags. It is not evidence against the construct, and it is the reason the purification is not left at the affinity step but continued by FPLC (see Purification). Third, the two bands of purified PROSS 5 are not explained by a disulfide bridge or a non covalent interaction, since they persist in the presence of β-mercaptoethanol, and the larger species runs above the expected mass. This could come from the construct itself, but it is not established, as it can also be a bacterial protein.",
      expectation:
        "Partly, and in the most useful direction. Recovering the 2021 strain was a deliberate fallback rather than a hope, and it delivered. The anomalous double band of PROSS 5 was not expected and remains unresolved; it was recorded and set aside because the priority at this point is to establish whether the stabilised variant is **active**, not only stable and expressible.",
    },
  ],
  discussion: [
    "**What follows from this.** The read-out sets three lines of work, in the order in which they were agreed.",
    "1. **Re-grow both constructs under milder conditions**, 0.2 mM IPTG and 20 ºC, to test whether a slower induction increases the soluble fraction. The 30 ºC condition used here already trades rate for folding, and this pushes that trade further.",
    "2. **Purify DHAK PROSS 5 from the frozen CFEs and measure its activity**, since stability and expression say nothing about whether the designed variant still works.",
    "3. **Recover the older DHAK strain**, which expresses better, as a parallel source of enzyme independent of the synthetic constructs.",
  ],
};

/* ---------- Enzyme purification ---------- */

const PURIFICATION_IMAC: ResultData = {
  id: "purification-imac",
  tabLabel: "IMAC",
  title: "Immobilised Metal Affinity Chromatography (Co²⁺-IDA-Agarose)",
  subsections: [{ id: "imac-result", observations: "PPK2 was retained by the Co²⁺ resin and recovered as the dominant species in the dialysed eluate. For DHAK, the first affinity run separated two problems: empty wild-type and 2021 eluates reflected the absence of protein in their extracts, while PROSS 5 bound and eluted as two persistent bands.", interpretation: "The affinity step worked whenever target protein was present. PPK2 supplied a preparation clean enough for the coupled assay; the unidentified upper PROSS 5 band remained unresolved.", expectation: "PPK2 purified as intended. DHAK recovery was construct-dependent and prompted activity-led troubleshooting." }],
};

const PURIFICATION_DIALYSIS: ResultData = {
  id: "purification-dialysis",
  tabLabel: "Dialysis",
  title: "Dialysis of IMAC eluates",
  subsections: [{ id: "dialysis-result", observations: "Dialysis removed imidazole and salt from every eluate and visibly concentrated the PROSS 5 preparation on the gel.", interpretation: "Dialysis functioned as both buffer exchange and a practical concentration step before activity measurement.", expectation: "The buffer exchange was expected; the concentrating effect was not." }],
};

const PURIFICATION_EXPRESS_IMAC: ResultData = {
  id: "purification-express-imac",
  tabLabel: "Express IMAC",
  title: "Express Immobilised Metal Affinity Chromatography (Co²⁺-IDA-Agarose)",
  subsections: [{ id: "express-imac-result", observations: "Microlitre-scale express IMAC recovered PROSS 5 in its eluates, while wild-type DHAK appeared neither in the crude extract nor in the eluates.", interpretation: "Because the resin recovered protein when protein was present, the wild-type failure lay in expression rather than purification.", expectation: "The diagnostic resolved the ambiguity as intended, but against the construct rather than the resin." }],
};

const PURIFICATION_SEC: ResultData = {
  id: "purification-sec",
  tabLabel: "SEC (FPLC)",
  title: "Size-exclusion chromatography (FPLC)",
  subsections: [{ id: "sec-result", observations: "Four size-exclusion runs were performed on an ÄKTAprime plus with a HiLoad 26/60 Superdex 200 column. Separation was not reproducible: most absorbance appeared outside the expected DHAK window, the only narrow symmetric peak was missed by late fraction collection, and collected features were broad or overlapping.", interpretation: "Size exclusion did not provide a reliable second route to purified DHAK. Fractions were carried into the activity assay to decide whether any active enzyme had nevertheless been recovered.", expectation: "No. The method failed to stabilise across four runs, so the workflow returned to affinity purification." }],
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
        "When we recovered this stock, its **cell-free extract (CFE)** showed **exceptional** kinase activity, the steepest trace of the whole study, an initial rate of **581.1 mOD/min** (R² = 1.00), equal to a **DHAP formation rate of 93.4 nmol/min** and a **volumetric activity of ~18.7 U/mL** (5 µL assayed). Bradford on this extract, against a linear BSA curve (R² = 0.994), gave **~1.8 mg/mL** of protein, so its **specific activity was ~10 U/mg**.",
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
            ["Protein (Bradford)", "~1.8 mg/mL", "not measured"],
            ["Specific activity", "**~10 U/mg**", "not determined"],
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
            "DHAK activity assay of the CECT 4626 variant, 2012 stock, cell-free extract — first batch. Steepest trace of the series, initial rate 581.1 mOD/min (R² = 1.00), about 93.4 nmol DHAP/min, ~18.7 U/mL, and a specific activity of ~10 U/mg (5 µL assayed; Bradford quantification alongside).",
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
            "Bradford protein quantification of the first-batch CFE against a linear BSA standard curve (R² = 0.994), used to convert its activity into a specific activity.",
        },
      ],
      interpretation:
        "The DHAK from this stock is **highly active as a crude extract**. The ~10 U/mg of the first batch sits just below the ~12 µmol·min⁻¹·mg⁻¹ reported for the purified enzyme [3], which means **DHAK makes up a large fraction of the soluble protein** in this strongly expressing stock. The drop between the first and the working batch reflects **batch-to-batch variation in expression**, and both remain well within a usable range. Purification, by contrast, **was not viable here**, so the CFE is not only the simpler option but the one that **actually preserved the activity**.",
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
    results: [DHAK_DSM, DHAK_2021, DHAK_2012, DHAK_PROSS, COUPLED_ASSAY, COUPLED_ASSAY_ROUND_2],
  },
  {
    id: "complete-notion-record",
    heading: "5. Complete results record",
    intro: "Full results record synchronised from Notion, including all design cycles, gels and lane tables, chromatographic runs, activity traces, coupled-assay rounds, conclusions and references.",
    results: [{
      id: "complete-revalorisation-results",
      tabLabel: "Full record",
      title: "Revalorisation — complete Results record",
      subsections: [{ id: "complete-record", custom: { node: <NotionMarkdownDocument source={completeRevalorisationResults} /> } }],
    }],
  },
];

export const REVALORISATION_REFERENCES = [
  "[1] Thermo Fisher Scientific. BL21(DE3) chemically competent E. coli (cat. no. EC0114) product information. Available from: https://www.thermofisher.com/order/catalog/product/EC0114",
  "[2] Bastida A, Fernández-Mayoralas A, Gómez Arrayás R, Iradier F, Carretero JC, García-Junceda E. Heterologous over-expression of α-1,6-fucosyltransferase from Rhizobium sp.: application to the synthesis of the trisaccharide β-D-GlcNAc(1→4)-[α-L-Fuc-(1→6)]-D-GlcNAc, study of the acceptor specificity and evaluation of polyhydroxylated indolizidines as inhibitors. Chemistry. 2001. Available from: https://doi.org/10.1002/chin.200206232",
  "[3] Sánchez-Moreno I. Dihidroxiacetona quinasa de Citrobacter freundii CECT 4626 [doctoral thesis]. Madrid: Universidad Complutense de Madrid.",
  "[4] Sánchez-Moreno, I., Benito-Arenas, R., Montero-Calle, P., Hermida, C., García-Junceda, E., & Fernández-Mayoralas, A. (2019). Simple and practical multigram synthesis of D-xylonate using a recombinant xylose dehydrogenase. ACS Omega, 4(6), 10593–10598. https://doi.org/10.1021/acsomega.9b01090",
  "[5] RCSB Protein Data Bank. Entry 1UN9, dihydroxyacetone kinase from Citrobacter freundii. Available from: https://doi.org/10.2210/pdb1UN9/pdb",
];
