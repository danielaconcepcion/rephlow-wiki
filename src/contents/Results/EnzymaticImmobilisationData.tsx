import type {
  ResultData,
  ResultSubBlock,
} from "../../components/LabFolders/types";
import { SelectionFunnel } from "../../components/SelectionFunnel";

/**
 * Enzymatic immobilisation results. Every word below is the team's own,
 * taken from the current Notion page "Results / Enzymatic immobilisation";
 * nothing is summarised, reworded or filled in. Both blocks, their order
 * and the record titles follow that page, and each record keeps the three
 * answers the page itself says it gives: what was obtained, what it means,
 * and whether it matched what we expected.
 *
 * Where the source shows one composite screenshot per step, this page
 * shows the team's own per-panel crops of the same figure, which are far
 * more readable at wiki width, under the source's caption; its tables are
 * transcribed rather than shown as pictures of tables; and its selection
 * funnel is a component rather than an image, so the numbers stay legible
 * at any width. The PyMOL sessions the source attaches to the structural
 * steps are offered beside those figures as downloads.
 *
 * Asset paths are development stand-ins and still have to go through the
 * iGEM uploads tool before the Wiki Freeze.
 */

const FIGURES = "assets/results/enzymatic-immobilisation";
const GELS = `${FIGURES}/gels`;
const STRUCT_COLOUR = `${FIGURES}/structures-colored`;
const STRUCT_CYS = `${FIGURES}/structures-cys-bridges`;
const MODELS = `${FIGURES}/models`;

/** The PyMOL sessions the structural figures were read from, offered as
 * downloads beside the figures they belong to — the source attaches them
 * to these two steps as "Modelos extremos" and "Modelos S-S". */
const PANEL = ["estE1", "plc", "appA", "phyA", "M2-32", "aphA", "cerA"];
const terminiSessions = PANEL.map((enzyme) => ({
  label: enzyme,
  href: `${MODELS}/${enzyme}-termini.pse`,
}));
const disulphideSessions = PANEL.map((enzyme) => ({
  label: enzyme,
  href: `${MODELS}/${enzyme}-disulphides.pse`,
}));

export const ENZYMATIC_IMMOBILISATION_INTRO = [
  "This page reports the outcomes of the enzymatic immobilisation work: producing a panel of phosphohydrolases in *E. coli* and characterising them, and then working out, on a model system with Lecitase Ultra, the chemistry that fixes an enzyme onto the support without switching it off. The design and rationale of each experiment are on the Experiments page.",
  "Each entry below reports the outcome of the corresponding experiment on the Experiments page, following the same order and titles. For every experiment we answer three questions: what was obtained, what it means, and whether it matched what we expected. Within each block the results are given in the order they were obtained, because each one decided what was tried next.",
];

const MINING: ResultData = {
  id: "bioinformatic-mining",
  tabLabel: "Candidate mining",
  title: "Bioinformatic mining and candidate selection",
  subsections: [
    {
      id: "selection-funnel",
      custom: {
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
          "Flowchart of the candidate enzyme selection process. The figures represent the sequential selection (3,741 to 160 to 102 to 13 to 7) after the application of the biotechnological and operational exclusion criteria.",
      },
      tables: [
        {
          caption:
            "Selected enzymes, indicating their activity, microorganism of origin and the commercial alternatives identified as a contingency plan.",
          headers: [
            "Enzyme activity",
            "Gene",
            "Microorganism of origin",
            "Commercial alternative",
          ],
          rows: [
            [
              "Phospholipase C (PLC)",
              "plc_Tk",
              "*Thermococcus kodakarensis*",
              "*Clostridium perfringens* or *Bacillus cereus* [Sigma Aldrich] plc",
            ],
            [
              "Phospholipase C (PLC)",
              "cerA_Bc",
              "*Bacillus cereus*",
              "*Clostridium perfringens* or *Bacillus cereus* [Sigma Aldrich] plc",
            ],
            [
              "Phospholipase A (PLA)",
              "estE1_MG",
              "Metagenome",
              "Lecitase® Ultra (PLA1) or pancreatin (PLA2) [Merck Millipore]",
            ],
            [
              "Phytase",
              "appA_Yi",
              "*Yersinia intermedia*",
              "Axtra® PHY [IFF] or Ronozyme® HiPhos [Novonesis]",
            ],
            [
              "Phytase",
              "phyA_Op",
              "*Obesumbacterium proteus*",
              "Axtra® PHY [IFF] or Ronozyme® HiPhos [Novonesis]",
            ],
            [
              "Acid phosphatase (NAP)",
              "M2-32_MG",
              "Metagenome",
              "Acid phosphatase from potatoes or wheat germ [Merck]",
            ],
            [
              "Acid phosphatase (NAP)",
              "aphA_Ec",
              "*Escherichia coli*",
              "Acid phosphatase from potatoes or wheat germ [Merck]",
            ],
          ],
        },
      ],
      observations:
        "The screen behaved as a funnel with a very steep middle. EnzymeMiner [1] returned **3,741** candidate sequences across the four target activities; manual selection of about forty prokaryotic representatives per activity brought the pool to **160**; cross-referencing BRENDA and UniProt for evidence of recombinant expression and kinetics cut it to **102**; and the catalytic-profile filter, the requirement to keep activity at pH 5.0 and 30 ºC, took it down to just **13**. From these, **7** enzymes were selected to keep at least two representatives per activity, the exception being the phospholipase A activity, which is covered separately by the model enzyme used in the immobilisation block.",
      interpretation:
        "The informative number here is not the final seven but the collapse from 102 to 13: most enzymes that can be cloned simply do not work in acid at moderate temperature, so the real scarcity is the operating window, not sequence availability. The panel that survives covers the phosphorus in the effluent from four complementary angles, with the non-specific acid phosphatases keeping activity across the pH 4.5 to 6.0 of the stream [2] and the histidine acid phytases active and stable at low pH [3], and the two-representatives-per-activity redundancy hedges against any single enzyme failing to express.",
      expectation:
        "A steep funnel was expected given how strict the criteria were, and a redundant panel was the design goal, so the outcome matched the intention; what the screen added was the quantitative demonstration of where the bottleneck actually sits.",
    },
  ],
};

const IN_SILICO: ResultData = {
  id: "in-silico-design",
  tabLabel: "Construct design",
  title: "In silico structural design of the constructs",
  subsections: [
    {
      id: "topology",
      figuresColumns: 4,
      title: "Terminal accessibility and tag placement",
      figures: [
        {
          src: `${STRUCT_COLOUR}/struct_A_estE1_MG.png`,
          title: "(A) estE1_MG",
          alt: "EstE1_MG model coloured from blue at the N-terminus to red at the C-terminus.",
          caption: "",
        },
        {
          src: `${STRUCT_COLOUR}/struct_B_plc_Tk.png`,
          title: "(B) plc_Tk",
          alt: "Plc_Tk model coloured from blue at the N-terminus to red at the C-terminus.",
          caption: "",
        },
        {
          src: `${STRUCT_COLOUR}/struct_C_appA_Yi.png`,
          title: "(C) appA_Yi",
          alt: "AppA_Yi model coloured from blue at the N-terminus to red at the C-terminus.",
          caption: "",
        },
        {
          src: `${STRUCT_COLOUR}/struct_D_phyA_Op.png`,
          title: "(D) phyA_Op",
          alt: "PhyA_Op model coloured from blue at the N-terminus to red at the C-terminus.",
          caption: "",
        },
        {
          src: `${STRUCT_COLOUR}/struct_E_M2-32_MG.png`,
          title: "(E) M2-32_MG",
          alt: "M2-32_MG model coloured from blue at the N-terminus to red at the C-terminus.",
          caption: "",
        },
        {
          src: `${STRUCT_COLOUR}/struct_F_aphA_Ec.png`,
          title: "(F) aphA_Ec",
          alt: "AphA_Ec model coloured from blue at the N-terminus to red at the C-terminus.",
          caption: "",
        },
        {
          src: `${STRUCT_COLOUR}/struct_G_cerA_Bc.png`,
          title: "(G) cerA_Bc",
          alt: "CerA_Bc model coloured from blue at the N-terminus to red at the C-terminus.",
          caption: "",
        },
      ],
      figuresCaption:
        "Structural modelling of the candidate enzymes in PyMOL. The spectrum colouring highlights the three-dimensional topology from the N-terminal end (blue) to the C-terminal (red), showing the accessibility for the fusion of the His tag. For multi-homomeric structures, only one subunit is shown coloured.",
      downloadsLabel: "PyMOL sessions (termini)",
      downloads: terminiSessions,
    },
    {
      id: "disulphides",
      figuresColumns: 4,
      title: "Structural disulphide bridges",
      figures: [
        {
          src: `${STRUCT_CYS}/struct_A_estE1_MG.png`,
          title: "(A) estE1_MG",
          alt: "EstE1_MG model with cysteine residues highlighted; no disulphide bridges.",
          caption: "",
        },
        {
          src: `${STRUCT_CYS}/struct_B_plc_Tk.png`,
          title: "(B) plc_Tk",
          alt: "Plc_Tk model with cysteine residues highlighted; no disulphide bridges.",
          caption: "",
        },
        {
          src: `${STRUCT_CYS}/struct_C_appA_Yi.png`,
          title: "(C) appA_Yi",
          alt: "AppA_Yi model with four disulphide bridges highlighted.",
          caption: "",
        },
        {
          src: `${STRUCT_CYS}/struct_D_phyA_Op.png`,
          title: "(D) phyA_Op",
          alt: "PhyA_Op model with four disulphide bridges highlighted.",
          caption: "",
        },
        {
          src: `${STRUCT_CYS}/struct_E_M2-32_MG.png`,
          title: "(E) M2-32_MG",
          alt: "M2-32_MG model with two disulphide bridges highlighted.",
          caption: "",
        },
        {
          src: `${STRUCT_CYS}/struct_F_aphA_Ec.png`,
          title: "(F) aphA_Ec",
          alt: "AphA_Ec model with cysteine residues highlighted; no disulphide bridges.",
          caption: "",
        },
        {
          src: `${STRUCT_CYS}/struct_G_cerA_Bc.png`,
          title: "(G) cerA_Bc",
          alt: "CerA_Bc model with cysteine residues highlighted; no disulphide bridges.",
          caption: "",
        },
      ],
      figuresCaption:
        "Identification of structural disulphide bridges in silico. Detail of the measured interatomic distance (< 2.5 Å) between the sulfur atoms of the cysteine residues (purple) on the predictive model.",
      tables: [
        {
          caption:
            "Experimental design of the genetic constructs: molecular mass, presence of disulphide bridges, vector selection and gene origin for the enzyme panel.",
          headers: [
            "Enzyme",
            "Molecular mass (kDa)",
            "S-S bridges",
            "pET vector",
            "Origin of the gene",
          ],
          rows: [
            ["EstE1", "4 × 34", "No", "pET-22b(+)", "GCAT Bio"],
            ["Plc", "49", "No", "pET-28a(+)", "GCAT Bio"],
            [
              "AppA",
              "48",
              "C80-C111; C136-C415; C181-C191; C389-C398",
              "pET-28a(+)",
              "GCAT Bio",
            ],
            [
              "PhyA",
              "49",
              "C79-C110; C135-C410; C180-C189; C384-C393",
              "pET-28a(+)",
              "GCAT Bio",
            ],
            [
              "M2-32",
              "2 × 29",
              "C81-C238; C131-C185",
              "pET-28a(+)",
              "GCAT Bio",
            ],
            ["AphA", "2 × 26", "No", "pET-28a(+)", "Addgene"],
            ["CerA", "32.5", "No", "pET-22b(+)", "Addgene"],
          ],
        },
      ],
      observations:
        "Before any DNA was committed, each candidate was modelled to settle two things that are far cheaper to decide on a model than to correct at the bench. Homology models placed the polyhistidine tag from the exposure of the protein ends, so that the tag would reach the resin without occluding the active site, which in turn set the vector: CerA, with a more exposed C-terminus, went into pET-22b(+), and AphA, with the opposite arrangement, into pET-28a(+). The 2.5 Å analysis of cysteine sulphur atoms then flagged **AppA (four bridges), PhyA (four) and M2-32 (two)** as disulphide-dependent, while EstE1, Plc, AphA and CerA carried none. Predicted masses ran from 26 to 49 kDa, several of the enzymes being oligomeric.",
      interpretation:
        "The useful output of this step is that it told us, in advance, which three enzymes would not fold in a standard reducing cytoplasm and would therefore need an oxidising-cytoplasm strain [4].",
      expectation:
        "That the phytases and phosphatases should be disulphide-dependent is consistent with their periplasmic or secreted biology, so the prediction was the expected one; its value was not novelty but timing, since it let the solubilisation strategy be planned rather than discovered later through a failed expression round. This is the first point where the block anticipates the problem that the expression step would otherwise have sprung on it.",
      downloadsLabel: "PyMOL sessions (disulphide bridges)",
      downloads: disulphideSessions,
    },
  ],
};

const CONSTRUCTS: ResultData = {
  id: "genetic-constructs",
  tabLabel: "Constructs",
  title: "Obtaining the genetic constructs",
  subsections: [
    {
      id: "amplification",
      figuresAside: true,
      figures: [
        {
          src: `${GELS}/gel_gene_amplification.png`,
          alt: "Agarose gel of the gene amplification for cerA (873 bp) and aphA (735 bp).",
          caption:
            "1% (w/v) agarose gel of the gene amplification for cloning into the pET vectors, sized against the φ29 and λ molecular-weight markers.",
        },
      ],
      observations:
        "All seven constructs were obtained, five by de novo synthesis directly in the pET backbone and two, AphA and CerA, by PCR from Addgene, which is far cheaper than synthesis for a sequence already available. The amplicons were clean and of the expected size (CerA about 873 bp, AphA about 735 bp) and matched the in silico simulation.",
      interpretation:
        "Cloning the Addgene genes into the same pET backbones as the synthesised ones was a deliberate choice, so that any later difference in expression would reflect the enzyme and not the vector.",
      expectation:
        "The stage went as planned, with one minor and expected adjustment: the Addgene amplification failed at first and only worked once the amount of template in the PCR was reduced.",
    },
  ],
};

const TRANSFORMATION: ResultData = {
  id: "transformation-verification",
  tabLabel: "Clone verification",
  title: "Transformation and clone verification",
  subsections: [
    {
      id: "colony-pcr",
      figuresAside: true,
      figures: [
        {
          src: `${GELS}/gel_colony_pcr.png`,
          alt: "Agarose gel of the colony PCR for aphA (971 bp) and cerA (1050 bp).",
          caption:
            "1% (w/v) agarose gel of the colony PCR after ligation, verifying the insert against the φ29 and λ molecular-weight markers.",
        },
      ],
      observations:
        "Every construct transformed successfully, with confluent colony growth on selective LB-agar in all cases, and colony PCR with T7 primers returned inserts of the expected size (AphA about 971 bp, CerA about 1,050 bp) that again matched the simulation, so sequencing was not needed to proceed.",
      interpretation:
        "Up to this point nothing had resisted, which is why the expression step, where that changed, is the hinge of the whole block.",
      expectation:
        "This delivered verified clones ready to express, and it was the expected checkpoint: correct-size amplicons on both the gene amplification and the colony PCR, agreeing with the simulation, were exactly what justified moving on without sequencing.",
    },
  ],
};

const EXPRESSION: ResultData = {
  id: "recombinant-expression",
  tabLabel: "Expression",
  title: "Recombinant expression",
  subsections: [
    {
      id: "iptg-vs-autoinduction",
      figuresColumns: 2,
      title: "IPTG against ZY auto-induction",
      figures: [
        {
          src: `${GELS}/gel_A_iptg_total.png`,
          title: "(A) IPTG, total fraction",
          alt: "SDS-PAGE of IPTG induction, total fraction.",
          caption: "",
        },
        {
          src: `${GELS}/gel_B_iptg_soluble.png`,
          title: "(B) IPTG, soluble fraction",
          alt: "SDS-PAGE of IPTG induction, soluble fraction.",
          caption: "",
        },
        {
          src: `${GELS}/gel_C_autoinduction_total.png`,
          title: "(C) Auto-induction, total",
          alt: "SDS-PAGE of ZY auto-induction, total fraction.",
          caption: "",
        },
        {
          src: `${GELS}/gel_D_autoinduction_soluble.png`,
          title: "(D) Auto-induction, soluble",
          alt: "SDS-PAGE of ZY auto-induction, soluble fraction.",
          caption: "",
        },
      ],
      figuresCaption:
        "SDS-PAGE of the recombinant expression of the GCAT Bio constructs under IPTG induction (A and B) and ZY auto-induction (C and D), both at 20 ºC. Lanes: (M) NZYBlue® marker; pET-28a(+) (C1); pET-22b(+) (C2); EstE1 (3); Plc (4); AppA (5); PhyA (6); M2-32 (7). The black arrows mark the band corresponding to the enzyme, where present.",
      observations:
        "Read on the total-fraction gels, **IPTG gave clearly stronger overexpression than ZY auto-induction** at 20 ºC for the five synthesised constructs, and the result was extrapolated to the two Addgene ones, so IPTG was carried forward. The step also surfaced the first real obstacle: the two phospholipases C were **cytotoxic**, Plc and CerA both causing a sharp OD₆₀₀ drop the morning after induction, a loss that could be partly offset for CerA by scaling the culture up roughly thirtyfold but not at all for Plc.",
    },
    {
      id: "plc-cytotoxicity",
      figuresAside: true,
      title: "The Addgene constructs, and PLC cytotoxicity",
      figures: [
        {
          src: `${GELS}/gel_bl21_apha_cera.png`,
          alt: "SDS-PAGE of BL21 expression of aphA and cerA at 20 ºC, total and soluble fractions.",
          caption:
            "SDS-PAGE of the recombinant expression of the Addgene constructs under IPTG induction at 20 ºC. Lanes: (M) NZYBlue® marker; total (T) and soluble (S) fractions of pET-28a(+) (1); AphA (2); pET-22b(+) (3); CerA (4). The black arrows mark the band corresponding to the enzyme, where present.",
        },
      ],
      observations:
        "The two phospholipases C were **cytotoxic**: Plc and CerA caused a sharp OD₆₀₀ drop the morning after induction, CerA partly compensable with about thirty times the culture volume and Plc not compensable at all.",
      interpretation:
        "Because the toxicity is a property of the enzyme and not a parameter that can be tuned in a live cell, PLC was redirected to cell-free in vitro transcription and translation (IVTT), a system that does not depend on host viability [7], rather than being forced through a route that could not work. The more consequential reading of these gels, however, is what the soluble lanes did not show, and that is the subject of the next step.",
      expectation:
        "That IPTG should outperform auto-induction was expected, following from the full derepression of the lacUV5 promoter against the slower, density-linked induction of the auto-induction medium [5]. The PLC cytotoxicity had been anticipated as a risk, since these enzymes hydrolyse the host's own membrane phospholipids [6], so its appearance confirmed the design rather than contradicting it.",
    },
  ],
};

const SOLUBILISATION: ResultData = {
  id: "solubilisation",
  tabLabel: "Solubilisation",
  title: "Solubilisation of the recombinant enzymes",
  subsections: [
    {
      id: "rescue-strategies",
      figures: [
        {
          src: `${FIGURES}/solubilisation-chaperones.png`,
          alt: "SDS-PAGE of expression with GroES/GroEL and Trigger factor at 30 and 20 ºC.",
          caption:
            "SDS-PAGE of expression under IPTG induction at 30 ºC and 20 ºC in the presence of chaperones. Lanes: (M) NZYBlue® marker; total (T) and soluble (S) fractions of pET-28a(+) (1); pET-22b(+) (2); EstE1 (3); AppA (4); PhyA (5); M2-32 (6); AppA-GroES/EL (7); AppA-tig (7'); PhyA-GroES/EL (8); PhyA-tig (8'); M2-32-GroES/EL (9); M2-32-tig (9').",
        },
        {
          src: `${FIGURES}/solubilisation-origami2.png`,
          alt: "SDS-PAGE of expression in the Origami 2 strain at 20 and 30 ºC.",
          caption:
            "SDS-PAGE of expression under IPTG induction at 20 ºC and 30 ºC in the Origami 2 strain.",
        },
        {
          src: `${FIGURES}/solubilisation-shuffle-rosettagami.png`,
          alt: "SDS-PAGE of expression in SHuffle T7 and Rosetta-gami 2 at 20 ºC.",
          caption:
            "SDS-PAGE of expression under IPTG induction at 20 ºC in the SHuffle T7 (1 and 2) and Rosetta-gami 2 (3–5) strains.",
        },
      ],
      observations:
        "Despite the good IPTG yields seen in the total fraction, **none of the enzymes appeared in the soluble fraction at first**, all accumulating as inclusion bodies [8]. The rescue was selective and followed the structural predictions made earlier: the **GroES/GroEL** chaperonin solubilised the non-specific acid phosphatase **M2-32** [11]; the oxidising-cytoplasm strain **Rosetta-gami 2** solubilised the phytase **PhyA**; and **AphA** was recovered soluble from **BL21 (DE3)**. Raising the induction temperature to 30 ºC and adding Trigger factor [10] on their own moved little of the remaining material.",
      interpretation:
        "The lesson of the expression step is made explicit here: **solubility, not expression, was the limiting step**, a well-documented consequence of fast T7-driven translation outpacing the host's folding capacity [8], [9]. The problem was resolved exactly where the in silico analysis had said it would arise, the disulphide-dependent enzymes being rescued by the oxidising-cytoplasm strains of the Origami and SHuffle family [4], [12], with a codon-usage analysis further motivating the move to rare-codon-competent strains [13].",
      expectation:
        "Generalised insolubility under strong IPTG expression was expected, which is why the rescue plan was in place; that Rosetta-gami 2 specifically rescued PhyA was the expected confirmation of the disulphide prediction, and that EstE1 and AppA could not be recovered is what set the practical limit of the panel. Three enzymes, **M2-32, PhyA and AphA**, reached soluble form and were carried forward.",
    },
  ],
};

const IMAC: ResultData = {
  id: "imac-purification",
  tabLabel: "IMAC purification",
  title: "Purification by IMAC",
  subsections: [
    {
      id: "imac",
      figures: [
        {
          src: `${FIGURES}/imac-purification.png`,
          alt: "SDS-PAGE of the IMAC purification of PhyA, M2-32 and AphA across every fraction.",
          caption:
            "SDS-PAGE of the purification of (A) PhyA, (B) M2-32 and (C) AphA. Lanes: (M) NZYBlue® marker; (1) total lysate; (2) unretained fraction; (3) wash; (4) eluate with the protein of interest; (5) dialysate; (6) concentrate.",
        },
      ],
      observations:
        "**PhyA and M2-32 purified to electrophoretic homogeneity**, the 20 mM imidazole wash removing contaminants without eluting the target. **AphA** behaved differently: its crude extract and flow-through looked normal, but only faint bands appeared in the elution, dialysis and concentration fractions, indicating a low recovery, though still enough to characterise.",
      interpretation:
        "The His-tag and Ni-NTA strategy with a competitive imidazole wash worked as designed [14], giving two clean preparations and one low-yield but usable one.",
      expectation:
        "The clean result for PhyA and M2-32 was expected; AphA's low recovery was not fully anticipated and tracks its low soluble expression upstream rather than a failure of the tag chemistry, which still worked, so it did not block the final characterisation.",
    },
  ],
};

const FUNCTIONAL: ResultData = {
  id: "functional-characterisation",
  tabLabel: "Characterisation",
  title: "Functional characterisation",
  subsections: [
    {
      id: "specific-activity",
      figures: [
        {
          src: `${FIGURES}/kinetic-characterisation.png`,
          alt: "Time course of pNP release, Bradford standard curve and the linear region giving each specific activity.",
          caption:
            "Kinetic characterisation of the purified hydrolases. (A) Time course of pNP released, with hyperbolic fits. (B) Bradford standard curve against BSA used to quantify protein. (C) Linear section whose slope is the specific activity. Points are the mean of three independent replicates with their standard deviation.",
        },
      ],
      tables: [
        {
          caption:
            "Enzymatic activity, protein concentration and specific activity of the three purified recombinant hydrolases (AphA, PhyA and M2-32).",
          headers: [
            "Enzyme",
            "Activity (U/mL)",
            "[Protein] (mg/mL)",
            "Specific activity (U/mg)",
          ],
          rows: [
            ["AphA", "0.000413", "0.186", "0.2223"],
            ["PhyA", "0.000421", "0.299", "0.1406"],
            ["M2-32", "0.000542", "0.337", "0.1608"],
          ],
        },
      ],
      observations:
        "All three enzymes hydrolysed bis-pNPP at pH 5.0 and 30 ºC [15]. Read as raw product accumulation at thirty minutes, PhyA looked clearly the strongest (about 27 µM pNP) against roughly 11 µM for M2-32 and AphA, which tracked each other. Normalising by the protein present in each assay reversed that picture: the specific activities were **AphA 0.222 U/mg, M2-32 0.161 U/mg and PhyA 0.141 U/mg**, with AphA reaching essentially the same product as M2-32 while using about 45% less enzyme mass (0.015 against 0.027 mg).",
      interpretation:
        "On a per-milligram basis AphA is the most efficient acid phosphatase [2] and PhyA the least, so the raw curves are misleading until normalised; the enzymes to carry into the immobilisation block are therefore AphA and the phytate-specialist PhyA.",
      expectation:
        "This was instructively not what the first glance suggested, and that reversal is precisely why protein quantification was built into the assay: the reliable result is the normalised order, AphA > M2-32 > PhyA. With a soluble, ranked and characterised panel in hand, but not yet in the quantities needed to develop an immobilisation chemistry on it, the work moves to a plentiful model enzyme.",
    },
  ],
};

const LECITASE: ResultData = {
  id: "lecitase-characterisation",
  tabLabel: "Model enzyme",
  title: "Characterisation of the model enzyme (Lecitase® Ultra)",
  subsections: [
    {
      id: "lecitase-baseline",
      figures: [
        {
          src: `${FIGURES}/lecitase-stock-concentration.png`,
          alt: "Interpolation of the Lecitase Ultra dilutions on the BSA standard line.",
          caption:
            "Determination of the concentration of the Lecitase® Ultra stock. In green, the interpolation of the concentrations falling in the linear range of the standard line, in blue.",
        },
      ],
      tables: [
        {
          caption:
            "Mean A₅₉₅ of the prepared dilutions of Lecitase Ultra, with the standard deviation shown.",
          headers: [
            "Dilution factor",
            "Average A₅₉₅ (a.u.)",
            "Standard deviation (a.u.)",
          ],
          rows: [
            ["10", "1.307", "0.030"],
            ["20", "1.535", "0.262"],
            ["30", "1.021", "0.059"],
            ["40", "0.674", "0.085"],
            ["50", "0.795", "0.031"],
            ["60", "0.665", "0.013"],
          ],
        },
        {
          caption:
            "Determination of the specific activity of the Lecitase Ultra stock from the activity assay and the Bradford method, both in duplicate.",
          headers: [
            "ΔA₃₄₈/min",
            "Activity (U)",
            "A₅₉₅ (a.u.)",
            "[protein] (mg/mL)",
            "[protein]stock (mg/mL)",
            "Specific activity (U/mg)",
            "Mean specific activity (U/mg)",
          ],
          rows: [
            [
              "0.1632",
              "31.689",
              "0.656",
              "0.653",
              { value: "39.856", rowSpan: 2 },
              "969.64",
              { value: "981", rowSpan: 2 },
            ],
            ["0.1724", "33.476", "0.674", "0.674", "991.99"],
          ],
        },
      ],
      observations:
        "Before any immobilisation, the stock had to be quantified so that every later yield could be referenced to it. Bradford against a BSA curve, using serial dilutions, placed the stock at approximately **40 mg/mL**, with the 1:60 dilution falling cleanly within the linear range and taken as the reference, while the continuous pNPB assay gave a mean specific activity of about **981 U/mg** (969.6 and 992.0 U/mg in duplicate).",
      interpretation:
        "This fixed a well-defined baseline of concentration and activity for this chimeric lipase-phospholipase [1].",
      expectation:
        "The values are consistent with a concentrated commercial stock, so the outcome was expected; the practical points were finding the dilution that sat in the linear range and adopting the butyrate ester pNPB as a fast, continuous reporter of activity [2], which is the read-out every immobilisation time course below depends on.",
    },
  ],
};

const STRATEGY_A: ResultData = {
  id: "strategy-a",
  tabLabel: "Strategy A",
  title:
    "Immobilisation strategy A, covalent attachment on a preactivated support",
  subsections: [
    {
      id: "preactivated-covalent",
      figures: [
        {
          src: `${FIGURES}/strategy-a-time-course.png`,
          alt: "Time course of immobilisation on the preactivated support, with and without Triton X-100.",
          caption:
            "Time course of immobilisation on glutaraldehyde-activated MANAE-agarose. (A) Without Triton X-100 and (B) with Triton X-100, following the activity of the immobilisation suspension (circles) and of the clarified supernatant (squares) over time against the no-immobilisation control (dashed). (C) Immobilisation yield over time for the two conditions.",
        },
      ],
      observations:
        "On the glutaraldehyde-pre-activated support, immobilisation was clearly better **with 0.1% Triton X-100**, reaching almost 80% yield and an immobilised activity of about **0.0053 U**, while without the detergent the retention was poor.",
      interpretation:
        "What this says is that direct covalent attachment preserves activity only if the enzyme is held open, by the detergent, at the moment it is fixed, and is otherwise largely inactive, a sensitivity characteristic of lipases anchored through residues near a mobile lid [4], with glutaraldehyde acting as the amino-reactive crosslinker that fixes them [5].",
      expectation:
        "A stable derivative was expected from a multipoint covalent attachment, so that much matched; the informative and less welcome part was the strong dependence on detergent and the low absolute activity even at about 80% yield, and it is this that motivated trying the second strategy rather than optimising the first.",
    },
  ],
};

const STRATEGY_B: ResultData = {
  id: "strategy-b",
  tabLabel: "Strategy B",
  title:
    "Immobilisation strategy B, ionic adsorption and subsequent crosslinking",
  subsections: [
    {
      id: "adsorption-crosslink",
      figures: [
        {
          src: `${FIGURES}/strategy-b-time-course.png`,
          alt: "Time course of ionic adsorption followed by glutaraldehyde crosslinking, with and without Triton X-100.",
          caption:
            "Time course of immobilisation on MANAE-agarose with subsequent glutaraldehyde crosslinking. (A) Without Triton X-100 and (B) with Triton X-100, following the activity of the suspension and the clarified supernatant at 24 h of adsorption, 1 h after adding glutaraldehyde (25 h) and 24 h after removing it (49 h). (C) Immobilisation yield over time for the two conditions.",
        },
      ],
      observations:
        "The adsorption-then-crosslink route was best **without Triton X-100**, again reaching almost 80% yield but with an immobilised activity of about **0.0448 U**, roughly **ten times** that of the pre-activated covalent route from the same amount of enzyme and support.",
      interpretation:
        "Pre-orienting the enzyme by ionic adsorption before forcing the covalent bond preserves far more activity, the glutaraldehyde also crosslinking lysines of neighbouring enzymes to consolidate the pre-oriented layer and capture further monomers from solution [3], which is the basis of this two-step design on aminated supports [6].",
      expectation:
        "The direction was expected, a two-step route being the gentler one, but the magnitude was not: the roughly tenfold gain, and the fact that the detergent preference reversed relative to Strategy A, went beyond what was anticipated and became the headline result of the block.",
    },
  ],
};

const DETERGENT: ResultData = {
  id: "detergent-effect",
  tabLabel: "Detergent effect",
  title: "Effect of detergent (Triton X-100)",
  subsections: [
    {
      id: "detergent",
      observations:
        "Taken together, the two strategies show that the detergent has **opposite effects**: it improves the pre-activated covalent route but harms the ionic-adsorption route, which is best in plain buffer.",
      interpretation:
        "The surfactant is therefore neither universally good nor bad; it helps only when the aim is to trap the open form on a pre-activated surface, and it interferes when a correct electrostatic orientation is what matters, an effect tied to the enzyme's dimerisation and interfacial activation [7].",
      expectation:
        "A detergent effect was expected, given the enzyme's tendency to aggregate through its exposed hydrophobic regions [7], but the clean reversal between the two geometries was the key, non-obvious finding, and it is exactly what the modelling was then brought in to explain.",
    },
  ],
};

const YIELD: ResultData = {
  id: "immobilisation-yield",
  tabLabel: "Yield",
  title: "Evaluation of the immobilisation yield",
  subsections: [
    {
      id: "yield-vs-activity",
      tables: [
        {
          caption:
            "The two winning conditions compared at equal yield. The free-enzyme control kept its activity throughout.",
          headers: ["Condition", "Yield", "Immobilised activity"],
          rows: [
            ["Adsorption + crosslinking, no detergent", "~80%", "~0.0448 U"],
            ["Preactivated covalent, with detergent", "~80%", "~0.0053 U"],
          ],
        },
      ],
      observations:
        "Comparing the two winning conditions on an equal footing makes the central point of the block. Both reached about **80% yield**, yet their immobilised activities differed roughly tenfold (about 0.0448 U for adsorption plus crosslinking without detergent, against about 0.0053 U for the pre-activated covalent route with detergent), while the free-enzyme control kept its activity throughout.",
      interpretation:
        "Yield alone is therefore misleading: two methods can immobilise similar amounts of protein while retaining very different amounts of activity, so **activity retention, not percentage bound, is the right metric**, and the parallel control is what confirms the difference came from immobilisation rather than from buffer effects or denaturation.",
      expectation:
        "Yields near 80% were plausible for both routes, so that was expected; the tenfold activity gap at equal yield was the decisive and somewhat unexpected result, and it is what makes the next step, explaining the gap structurally, worth taking.",
    },
  ],
};

const MODELLING: ResultData = {
  id: "computational-modelling",
  tabLabel: "Modelling",
  title: "Computational modelling of the mechanism",
  subsections: [
    {
      id: "open-closed-models",
      figuresColumns: 2,
      figures: [
        {
          src: `${FIGURES}/lecitase-top-view.png`,
          title: "Top view",
          alt: "Top view of the Lecitase Ultra active site in its closed and open conformations.",
          caption:
            "Top view of the active centre, closed (left) and open (right). The catalytic triad (Ser146, Asp201, His258) stands out in magenta at the bottom of the cavity, and the lid domain (residues 80–95) in green, showing the pocket clearing after interfacial activation.",
        },
        {
          src: `${FIGURES}/lecitase-side-view.png`,
          title: "Side view",
          alt: "Side view showing Lys24 and Lys259 beside the lid in the closed and open forms.",
          caption:
            "Side view, with Lys24 and Lys259 highlighted. In the closed form these lysines sit on the immediate periphery of the lid, so fixing them covalently on the preactivated support rigidly immobilises that area and mechanically prevents the lid from moving.",
        },
        {
          src: `${FIGURES}/lecitase-rear-view.png`,
          title: "Rear view",
          alt: "Rear view, 180 degrees from the active site, with acidic and lysine residues highlighted.",
          caption:
            "View from the back, 180º from the catalytic pocket. This external surface sits away from the lid-opening mechanism, making it an ideal anchoring zone that keeps the active site exposed to the solvent.",
        },
        {
          src: `${FIGURES}/lecitase-acidic-patch.png`,
          title: "Acidic crown",
          alt: "Detail of the polyanionic patch Asp27, Glu56, Asp57 and Asp62 around the active site.",
          caption:
            "Detail of the catalytic pocket with the polyanionic residues Asp27, Glu56, Asp57 and Asp62 in red. In the closed form this negatively charged patch allows targeted physical adsorption on the cationic MANAE-agarose support, protecting the flexibility of the active site before the final crosslinking.",
        },
      ],
      observations:
        "The open and closed models of Lecitase Ultra account for every case. On the pre-activated support with detergent, the lid is held open and the surface lysines are fixed in the active conformation; without detergent, the closed enzyme is anchored through **Lys24 and Lys259**, the lysines flanking the lid, which jams it shut. In the adsorption route, the enzyme docks through its acidic crown (**Asp27, Glu56, Asp57, Asp62**) with the active site projected outward, so without detergent the lid stays free to move, whereas with detergent the electrostatic orientation is scrambled and the subsequent crosslinking freezes a distorted, low-activity arrangement.",
      interpretation:
        "The activity differences are therefore **structural, not random**: they follow from where the enzyme is anchored relative to its lid [4], and from whether the support acts as a lock on the open form or a brake on the closed one [6], [5]. This is what makes the closed-form adsorption route the one to transfer to the sphere.",
      expectation:
        "The model was built to test the interfacial-activation and dimerisation hypothesis, and it reproduced the measured yields at the residue level, so the result was the expected one in the strong sense that it turned an empirical preference into a mechanistic one.",
      downloadsLabel: "PyMOL session",
      downloads: [
        {
          label: "Lecitase Ultra, closed and open",
          href: `${MODELS}/lecitase-open-closed.pse`,
        },
      ],
    },
  ],
};

const ENZYME_PRODUCTION_REFERENCES = [
  "[1] Hon J, Borko S, Stourac J, Prokop Z, Zendulka J, Bednar D, et al. EnzymeMiner: automated mining of soluble enzymes with diverse structures, catalytic properties and stabilities. Nucleic Acids Research [Internet]. 2020 Apr 29;48(W1):W104–9. Available from: https://doi.org/10.1093/nar/gkaa372",
  "[2] Thaller MC, Schippa S, Bonci A, Cresti S, Rossolini GM. Identification of the gene (aphA) encoding the class B acid phosphatase/phosphotransferase of Escherichia coli MG1655 and characterization of its product. FEMS Microbiology Letters [Internet]. 2006 Jan 17;146(2):191–8. Available from: https://doi.org/10.1111/j.1574-6968.1997.tb10192.x",
  "[3] Huang H, Luo H, Yang P, Meng K, Wang Y, Yuan T, et al. A novel phytase with preferable characteristics from Yersinia intermedia. Biochemical and Biophysical Research Communications [Internet]. 2006 Sep 30;350(4):884–9. Available from: https://doi.org/10.1016/j.bbrc.2006.09.118",
  "[4] Bessette PH, Åslund F, Beckwith J, Georgiou G. Efficient folding of proteins with multiple disulfide bonds in the Escherichia coli cytoplasm. Proceedings of the National Academy of Sciences [Internet]. 1999 Nov 23;96(24):13703–8. Available from: https://doi.org/10.1073/pnas.96.24.13703",
  "[5] Studier FW. Protein production by auto-induction in high-density shaking cultures. Protein Expression and Purification [Internet]. 2005 Feb 8;41(1):207–34. Available from: https://doi.org/10.1016/j.pep.2005.01.016",
  "[6] Titball RW. Bacterial phospholipases C. Microbiological Reviews [Internet]. 1993 Jan 1;57(2):347–66. Available from: https://doi.org/10.1128/mmbr.57.2.347-366.1993",
  "[7] Zemella A, Thoring L, Hoffmeister C, Kubick S. Cell‐Free protein synthesis: Pros and cons of prokaryotic and eukaryotic systems. ChemBioChem [Internet]. 2015 Oct 19;16(17):2420–31. Available from: https://doi.org/10.1002/cbic.201500340",
  "[8] Baneyx F, Mujacic M. Recombinant protein folding and misfolding in Escherichia coli. Nature Biotechnology [Internet]. 2004 Nov 1;22(11):1399–408. Available from: https://doi.org/10.1038/nbt1029",
  "[9] Rosano GL, Ceccarelli EA. Recombinant protein expression in Escherichia coli: advances and challenges. Frontiers in Microbiology [Internet]. 2014 Apr 17;5:172. Available from: https://doi.org/10.3389/fmicb.2014.00172",
  "[10] Hoffmann A, Bukau B, Kramer G. Structure and function of the molecular chaperone Trigger Factor. Biochimica Et Biophysica Acta (BBA) - Molecular Cell Research [Internet]. 2010 Feb 3;1803(6):650–61. Available from: https://doi.org/10.1016/j.bbamcr.2010.01.017",
  "[11] Hayer-Hartl M, Bracher A, Hartl FU. The GROEL–GROES chaperonin Machine: a Nano-Cage for protein folding. Trends in Biochemical Sciences [Internet]. 2015 Sep 27;41(1):62–76. Available from: https://doi.org/10.1016/j.tibs.2015.07.009",
  "[12] Lobstein J, Emrich CA, Jeans C, Faulkner M, Riggs P, Berkmen M. SHuffle, a novel Escherichia coli protein expression strain capable of correctly folding disulfide bonded proteins in its cytoplasm. Microbial Cell Factories [Internet]. 2012 May 8;11(1):124. Available from: https://doi.org/10.1186/1475-2859-11-56",
  "[13] Kane JF. Effects of rare codon clusters on high-level expression of heterologous proteins in Escherichia coli. Current Opinion in Biotechnology [Internet]. 1995 Jan 1;6(5):494–500. Available from: https://doi.org/10.1016/0958-1669(95)80082-4",
  "[14] Porath J, Carlsson J, Olsson I, Belfrage G. Metal chelate affinity chromatography, a new approach to protein fractionation. Nature [Internet]. 1975 Dec 1;258(5536):598–9. Available from: https://doi.org/10.1038/258598a0",
  "[15] Andersch MA, Szczypinski AJ. Use of P-Nitrophenylphosphate as the substrate in determination of serum acid phosphatase*. American Journal of Clinical Pathology [Internet]. 1947 Jul 1;17(7_ts):571–4. Available from: https://doi.org/10.1093/ajcp/17.7_ts.571",
];

const IMMOBILISATION_REFERENCES = [
  "[1] Virgen-Ortíz JJ, Santos JCSD, Ortiz C, Berenguer-Murcia Á, Barbosa O, Rodrigues RC, et al. Lecitase ultra: A phospholipase with great potential in biocatalysis. Molecular Catalysis [Internet]. 2019 May 21;473:110405. Available from: https://doi.org/10.1016/j.mcat.2019.110405",
  "[2] Braham SA, Siar EH, Arana-Peña S, Bavandi H, Carballares D, Morellon-Sterling R, et al. Positive effect of glycerol on the stability of immobilized enzymes: Is it a universal fact? Process Biochemistry [Internet]. 2020 Dec 30;102:108–21. Available from: https://doi.org/10.1016/j.procbio.2020.12.015",
  "[3] López-Gallego F, Betancor L, Mateo C, Hidalgo A, Alonso-Morales N, Dellamora-Ortiz G, et al. Enzyme stabilization by glutaraldehyde crosslinking of adsorbed proteins on aminated supports. Journal of Biotechnology [Internet]. 2005 Jul 22;119(1):70–5. Available from: https://doi.org/10.1016/j.jbiotec.2005.05.021",
  "[4] Rodrigues RC, Virgen-Ortíz JJ, Santos JCSD, Berenguer-Murcia Á, Alcantara AR, Barbosa O, et al. Immobilization of lipases on hydrophobic supports: immobilization mechanism, advantages, problems, and solutions. Biotechnology Advances [Internet]. 2019 Apr 8;37(5):746–70. Available from: https://doi.org/10.1016/j.biotechadv.2019.04.003",
  "[5] Barbosa O, Ortiz C, Berenguer-Murcia Á, Torres R, Rodrigues RC, Fernandez-Lafuente R. Glutaraldehyde in bio-catalysts design: a useful crosslinker and a versatile tool in enzyme immobilization. RSC Advances [Internet]. 2013 Oct 28;4(4):1583–600. Available from: https://doi.org/10.1039/c3ra45991h",
  "[6] Mateo C, Bolivar JM, Godoy CA, Rocha-Martin J, Pessela BC, Curiel JA, et al. Improvement of Enzyme Properties with a Two-Step Immobilizaton Process on Novel Heterofunctional Supports. Biomacromolecules [Internet]. 2010 Oct 14;11(11):3112–7. Available from: https://doi.org/10.1021/bm100916r",
  "[7] Andrés-Sanz D, Fresan C, Fernández-Lorente G, Rocha-Martín J, Guisán JM. Stabilization of Lecitase Ultra® by immobilization and fixation of bimolecular aggregates. release of omega-3 fatty acids by enzymatic hydrolysis of krill oil. Catalysts [Internet]. 2021 Aug 31;11(9):1067. Available from: https://doi.org/10.3390/catal11091067",
];

export const ENZYMATIC_IMMOBILISATION_SUBBLOCKS: ResultSubBlock[] = [
  {
    id: "enzyme-production",
    heading: "Enzyme production",
    intro: [
      "This block builds and validates the enzymatic toolbox. The phosphorus in the degumming effluent is not a single compound but a mixture of phospholipids, phytate and phosphomonoesters, so no single enzyme can mineralise it.",
      "The block therefore has to deliver a small panel of complementary phosphohydrolases that are both expressible in *E. coli* and active in acid, and it has to do so without wasting effort on enzymes that cannot be made.",
      "The thread that runs through it is the gap between making a protein and making a protein that folds: the first wet-lab steps go smoothly, the expression step then separates yield from solubility, and everything after it is a response to that split. Because heterologous expression carries inherent risks, a commercial homologue was kept in reserve for every activity.",
    ],
    results: [
      MINING,
      IN_SILICO,
      CONSTRUCTS,
      TRANSFORMATION,
      EXPRESSION,
      SOLUBILISATION,
      IMAC,
      FUNCTIONAL,
    ],
    outro:
      "This block takes the panel from database to characterised biocatalyst with no redundant step: the activities were matched to the real effluent, the constructs were designed to pre-empt insolubility, and only the rescue strategies actually needed were used. Its logic is cumulative rather than a list of separate experiments, each result deciding the next, and it hands the immobilisation block both a set of target enzymes and a clear reason to develop the chemistry on a model enzyme first.",
    references: ENZYME_PRODUCTION_REFERENCES,
  },
  {
    id: "immobilisation-chemistry",
    heading: "Immobilisation chemistry",
    intro: [
      "This block establishes how to fix an enzyme onto the support while keeping it active. Rather than testing on the complex and costly alginate-chitosan-genipin sphere, the chemistry is worked out on a simple, well-characterised **MANAE-agarose** model, with **glutaraldehyde** standing in for the amino-crosslinking role that genipin plays on the final sphere.",
      "The model enzyme is **Lecitase Ultra**, chosen as the most demanding case: its active site is capped by a mobile lid that opens only on interfacial activation, and it forms bimolecular aggregates in solution, so a chemistry that preserves its activity should generalise to the simpler, more hydrophilic enzymes of the panel.",
      "The block runs as one argument: a baseline is fixed, two anchoring strategies are compared, the detergent that separates them is identified, and the structural modelling then explains why the winner wins.",
    ],
    results: [LECITASE, STRATEGY_A, STRATEGY_B, DETERGENT, YIELD, MODELLING],
    outro:
      "Working on an inexpensive model support with glutaraldehyde as a stand-in for genipin let the two anchoring strategies be compared without spending the panel enzymes or committing to the full sphere. The detergent variable and the free-enzyme control were the minimum needed to interpret the yields, and the modelling was added only to explain the result, not to inflate it. The block hands the project a clear, mechanistically justified winner, ionic adsorption followed by crosslinking in the closed conformation and without detergent, ready to transfer to the alginate-chitosan-genipin sphere with genipin replacing glutaraldehyde.",
    references: IMMOBILISATION_REFERENCES,
  },
];
