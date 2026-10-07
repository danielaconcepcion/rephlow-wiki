import type {
  ResultData,
  ResultSubBlock,
} from "../../components/LabFolders/types";

/**
 * Enzymatic immobilisation results, transcribed from the team's own Notion
 * results page ("Enzymatic immobilisation", under WIKI / Results). Both
 * sub-blocks, their order and the record titles follow that page.
 *
 * This is the one results page with no unwritten entries: every record
 * below is filled in the source. The bracketed reference numbers in the
 * source ("[1]", "[15]") follow the Experiments page's own numbered list,
 * so they are left out here rather than reproduced as numbers pointing at
 * a list this page does not carry; the citing sentence keeps the claim.
 *
 * Figures are the source's own, downloaded from Notion into
 * public/assets/results/enzymatic-immobilisation and kept with their
 * original captions. Note that, like every other image on this wiki, they
 * still have to go through the iGEM uploads tool and be re-pointed at
 * static.igem.wiki before the Wiki Freeze (see MIGRATION.md) — the local
 * path here is a development stand-in.
 */

const FIGURES = "assets/results/enzymatic-immobilisation";

export const ENZYMATIC_IMMOBILISATION_INTRO =
  "This block builds the enzymatic layer of the rePhlow sphere: a panel of phosphohydrolases is produced in E. coli and characterised, and the chemistry to immobilise it on the support is worked out on a model system with Lecitase® Ultra. Each record reports the outcome of the corresponding experiment on the Experiments page, following the same order and titles.";

const MINING: ResultData = {
  id: "bioinformatic-mining",
  tabLabel: "Candidate mining",
  title: "Bioinformatic mining and candidate selection",
  subsections: [
    {
      id: "selection-funnel",
      figures: [
        {
          src: `${FIGURES}/selection-funnel.png`,
          alt: "Flowchart narrowing 3,741 candidate sequences to 7 selected enzymes.",
          caption:
            "Flowchart of the candidate selection process, showing the sequential narrowing (3,741 → 160 → 102 → 13 → 7) after each biotechnological and operational exclusion criterion, and the selected enzymes with their activity, source organism and commercial alternatives.",
        },
        {
          src: `${FIGURES}/selected-enzymes.png`,
          alt: "Table of the seven selected enzymes with their activity, source organism and commercial backup.",
          caption:
            "Selected enzymes, with their activity, microorganism of origin and the commercial alternatives identified as a contingency plan.",
        },
      ],
      observations:
        "The funnel narrowed 3,741 initial candidates to 7. EnzymeMiner returned 3,741 sequences across the four activities; manual selection of about 40 prokaryotic representatives per activity gave 160; expression and purification evidence from BRENDA and UniProt cut this to 102; only 13 retained sufficient activity at pH 5.0 and 30 ºC; and 7 were finally chosen, at least two per activity except PLA. The panel was EstE1 (PLA), Plc and CerA (PLC), AppA and PhyA (phytase), and M2-32 and AphA (NAP), each with a commercial backup.",
      interpretation:
        "The phosphorus in the effluent can be attacked from four complementary angles with enzymes that are both expressible in E. coli and acid-tolerant, the acid phosphatases keeping activity across the pH 4.5 to 6.0 of the stream and the histidine acid phytases being active and stable at low pH. The redundancy of two representatives per activity hedges against any single enzyme failing to express.",
      expectation:
        "Broadly yes. A steep funnel was expected given the strict criteria, and a redundant panel was the design goal. The informative point was quantitative: only 13 of 102 candidates kept activity at pH 5.0 and 30 ºC, confirming that the operating window, not sequence availability, is the real bottleneck.",
    },
  ],
};

const IN_SILICO: ResultData = {
  id: "in-silico-design",
  tabLabel: "Construct design",
  title: "In silico structural design of the constructs",
  subsections: [
    {
      id: "homology-models",
      figures: [
        {
          src: `${FIGURES}/pymol-topology.png`,
          alt: "PyMOL renders of the candidate enzymes coloured from blue at the N-terminus to red at the C-terminus.",
          caption:
            "Structural modelling of the candidate enzymes in PyMOL, coloured N-terminus (blue) to C-terminus (red) to assess accessibility for the His-tag fusion; detail of the interatomic distances (< 2.5 Å) between cysteine sulfur atoms identifying structural disulphide bridges; and the resulting construct design table (disulphide bridges, vector choice and expression strategy).",
        },
        {
          src: `${FIGURES}/pymol-disulphides.png`,
          alt: "PyMOL detail of interatomic distances under 2.5 angstrom between cysteine sulfur atoms.",
          caption:
            "Identification of structural disulphide bridges in silico, showing the measured interatomic distance (< 2.5 Å) between the sulfur atoms of the cysteine residues.",
        },
        {
          src: `${FIGURES}/construct-design.png`,
          alt: "Table of the construct design: disulphide bridges, vector choice and expression strategy per enzyme.",
          caption:
            "Experimental design of the genetic constructs: presence of disulphide bridges, vector selection and expression strategy for the enzyme consortium.",
        },
      ],
      observations:
        "Homology models placed the tag and mapped disulphide bridges for all seven enzymes. Terminal exposure set the vector, for example CerA with a more exposed C-terminus (pET-22b(+)) and AphA the opposite (pET-28a(+)). The 2.5 Å analysis flagged AppA (4 bridges), PhyA (4) and M2-32 (2) as disulphide-dependent, while EstE1, Plc, AphA and CerA had none. Predicted masses ranged from 26 to 49 kDa, several of them oligomeric (EstE1 4×34, M2-32 2×29, AphA 2×26 kDa).",
      interpretation:
        "Three enzymes would need an oxidising cytoplasm to fold their structural disulphides, and this was known before any wet work, so the later requirement for SHuffle T7 or Origami 2 was anticipated rather than discovered through failed expression.",
      expectation:
        "Yes. Disulphide dependence is consistent with the periplasmic or secreted biology of these phytases and phosphatases, and the tag choices followed directly from the models. The experiment carried little risk; its value was pre-empting the solubility problem.",
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
      figures: [
        {
          src: `${FIGURES}/gene-amplification-gel.png`,
          alt: "Agarose gel of the amplified genes against the phi29 and lambda markers.",
          caption:
            "1% (w/v) agarose gel of the gene amplification for cloning into the pET vectors, sized against the φ29 and λ molecular-weight markers.",
        },
      ],
      observations:
        "All seven constructs were obtained, five by de novo synthesis in the pET backbone and two (AphA, CerA) by PCR from Addgene. Amplification gave clean bands of the expected size (CerA about 873 bp, AphA about 735 bp), matching the SnapGene simulation.",
      interpretation:
        "The mixed synthesis and amplification strategy worked and kept costs down, and cloning the Addgene genes into the same pET backbones made the later expression comparison fair.",
      expectation:
        "Yes, although the Addgene amplification initially failed and only worked after reducing the template amount, a minor and expected PCR adjustment.",
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
      figures: [
        {
          src: `${FIGURES}/colony-pcr-gel.png`,
          alt: "Agarose gel of the colony PCR products against the phi29 and lambda markers.",
          caption:
            "1% (w/v) agarose gel of the colony PCR after ligation, verifying the insert against the φ29 and λ molecular-weight markers.",
        },
      ],
      observations:
        "All constructs transformed successfully, with confluent colony growth on selective LB-agar in every case. Colony PCR with T7 primers gave inserts of the expected size (AphA about 971 bp, CerA about 1,050 bp), matching the simulation, so sequencing was not needed.",
      interpretation:
        "The plasmids are correct and stably carried, and the pipeline delivered verified clones ready to express.",
      expectation:
        "Yes. Correct-size amplicons on both gene amplification and colony PCR were the expected checkpoint, and the match with the simulation justified proceeding without sequencing.",
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
      figures: [
        {
          src: `${FIGURES}/expression-gcat.png`,
          alt: "SDS-PAGE comparing IPTG induction and ZY auto-induction for the five synthesised constructs.",
          caption:
            "SDS-PAGE of the recombinant expression of the GCAT Bio constructs under IPTG induction (A and B) and ZY auto-induction (C and D), both at 20 ºC. Lanes: (M) NZYBlue® marker; pET-28a(+) (C1); pET-22b(+) (C2); EstE1 (3); Plc (4); AppA (5); PhyA (6); M2-32 (7).",
        },
        {
          src: `${FIGURES}/expression-addgene.png`,
          alt: "SDS-PAGE of the AphA and CerA constructs under IPTG induction, total and soluble fractions.",
          caption:
            "SDS-PAGE of the recombinant expression of the Addgene constructs under IPTG induction at 20 ºC. Lanes: (M) NZYBlue® marker; total (T) and soluble (S) fractions of pET-28a(+) (1); AphA (2); pET-22b(+) (3); CerA (4).",
        },
      ],
      observations:
        "IPTG gave clearly stronger overexpression than ZY auto-induction at 20 ºC for the five synthesised constructs, and this was extrapolated to the two Addgene ones. The two phospholipases C were cytotoxic: Plc and CerA caused a sharp OD₆₀₀ drop the morning after induction, CerA partly compensable with about thirty times the culture volume and Plc not compensable at all.",
      interpretation:
        "IPTG is the induction method of choice for this panel, and PLC cannot be produced in a live E. coli host because these enzymes hydrolyse essential host membrane phospholipids, so it was redirected to cell-free IVTT, a system that does not depend on host viability.",
      expectation:
        "Partly. IPTG outperforming auto-induction was expected from the full derepression of the lacUV5 promoter, in contrast to the density-linked, more gradual induction of auto-induction medium. The PLC cytotoxicity had been anticipated as a risk, so its appearance confirmed rather than contradicted the design and justified not carrying PLC forward.",
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
          alt: "SDS-PAGE of expression with GroES/GroEL and Trigger factor at 30 and 20 degrees.",
          caption:
            "SDS-PAGE of expression under IPTG induction at 30 ºC and 20 ºC in the presence of chaperones. Lanes: (M) NZYBlue® marker; total (T) and soluble (S) fractions of pET-28a(+) (1); pET-22b(+) (2); EstE1 (3); AppA (4); PhyA (5); M2-32 (6); AppA-GroES/EL (7); AppA-tig (7'); PhyA-GroES/EL (8); PhyA-tig (8'); M2-32-GroES/EL (9); M2-32-tig (9').",
        },
        {
          src: `${FIGURES}/solubilisation-origami2.png`,
          alt: "SDS-PAGE of expression in Origami 2, SHuffle T7 and Rosetta-gami 2.",
          caption:
            "SDS-PAGE of expression under IPTG induction at 20 ºC and 30 ºC in the Origami 2 strain, and under IPTG induction at 20 ºC in the SHuffle T7 and Rosetta-gami 2 strains.",
        },
        {
          src: `${FIGURES}/solubilisation-shuffle-rosettagami.png`,
          alt: "SDS-PAGE of expression in SHuffle T7 and Rosetta-gami 2 at 20 degrees, total and soluble fractions.",
          caption:
            "SDS-PAGE of expression under IPTG induction at 20 ºC in the SHuffle T7 (1 and 2) and Rosetta-gami 2 (3–5) strains. Lanes: (M) NZYBlue® marker; total (T) and soluble (S) fractions of pET-22b(+) (1); EstE1 (2); pET-28a(+) (3); AppA (4); PhyA (5).",
        },
      ],
      observations:
        "Despite good IPTG yields, none of the enzymes appeared in the soluble fraction at first, accumulating as inclusion bodies. Of the rescue strategies, GroES/GroEL solubilised M2-32, SHuffle T7 solubilised PhyA, and AphA was soluble in BL21 (DE3). Induction at 30 ºC and Trigger factor alone were largely insufficient for the remaining targets.",
      interpretation:
        "Solubility, not expression, was the limiting step, a well-documented outcome of the fast T7-driven translation outpacing host folding capacity. It was resolved exactly for the disulphide-dependent enzymes by the oxidising chassis predicted in the in silico design, and a codon analysis further motivated moving to rare-codon-competent strains. Three enzymes (M2-32, PhyA, AphA) reached soluble form and could proceed.",
      expectation:
        "Partly. Generalised insolubility under strong T7/IPTG expression is a known outcome, so the rescue plan was in place. That SHuffle T7 specifically rescued PhyA matched the in silico disulphide prediction, the expected confirmation; that EstE1 and AppA were not recovered set the practical limit of the panel.",
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
        "PhyA and M2-32 purified to electrophoretic homogeneity, with the 20 mM imidazole wash removing contaminants without eluting the target. AphA behaved differently: a normal crude extract and flow-through, but only faint bands in the elution, dialysis and concentration fractions, indicating low yield, though still enough to characterise.",
      interpretation:
        "Two clean preparations and one low-yield but usable one were obtained, and the His-tag and Ni-NTA strategy with a competitive imidazole wash worked as designed.",
      expectation:
        "Yes for PhyA and M2-32. AphA's low recovery was not fully expected and is consistent with its low soluble expression; the tag chemistry still worked, so it did not block characterisation.",
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
        {
          src: `${FIGURES}/specific-activity-summary.png`,
          alt: "Summary table of enzymatic activity, protein concentration and specific activity for AphA, PhyA and M2-32.",
          caption:
            "Enzymatic activity, protein concentration and specific activity of the three purified recombinant hydrolases (AphA, PhyA and M2-32).",
        },
      ],
      tables: [
        {
          caption:
            "Enzymatic activity, protein concentration and specific activity of the three purified recombinant hydrolases.",
          headers: [
            "Enzyme",
            "pNP at 30 min (µM)",
            "Protein (mg)",
            "Specific activity (U/mg)",
          ],
          rows: [
            ["AphA", "~11", "0.015", "0.222"],
            ["M2-32", "~11", "0.027", "0.161"],
            ["PhyA", "~27", "—", "0.141"],
          ],
        },
      ],
      observations:
        "All three enzymes hydrolysed bis-pNPP at pH 5.0 and 30 ºC. Raw product accumulation at 30 min was highest for PhyA (about 27 µM pNP) and lower for M2-32 and AphA (both about 11 µM). Once normalised by Bradford protein, the ranking reversed: specific activities were AphA 0.222 U/mg > M2-32 0.161 U/mg > PhyA 0.141 U/mg. AphA reached the same product (about 11 µM) with roughly 45% less enzyme mass than M2-32 (0.015 against 0.027 mg).",
      interpretation:
        "On a per-milligram basis AphA is the most efficient acid phosphatase and PhyA the least, so the raw curves are misleading until normalised. AphA and the phytate-specialist PhyA are the components to carry into the immobilisation study.",
      expectation:
        "Instructively not, at first. The raw data suggested PhyA was best, but normalisation showed the opposite, which is precisely why protein quantification was built into the assay. The reliable result is the normalised order, AphA > M2-32 > PhyA.",
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
          src: `${FIGURES}/lecitase-dilutions.png`,
          alt: "Mean absorbance at 595 nm of the Lecitase Ultra dilution series with standard deviations.",
          caption:
            "Mean A₅₉₅ of the prepared Lecitase® Ultra dilutions with their standard deviation; determination of the stock concentration by interpolation on the BSA standard line; and the specific activity determined from the activity assay and the Bradford method, both in duplicate.",
        },
        {
          src: `${FIGURES}/lecitase-stock-concentration.png`,
          alt: "Interpolation of the Lecitase Ultra dilutions on the BSA standard line to determine the stock concentration.",
          caption:
            "Determination of the concentration of the Lecitase® Ultra stock. In green, the interpolation of the concentrations falling in the linear range of the standard line, in blue.",
        },
        {
          src: `${FIGURES}/lecitase-specific-activity.png`,
          alt: "Table of the specific activity of the Lecitase Ultra stock from the activity assay and the Bradford method.",
          caption:
            "Determination of the specific enzymatic activity of the Lecitase® Ultra stock from the activity assay and the Bradford method, performed in duplicate.",
        },
      ],
      observations:
        "Bradford against a BSA curve, using serial dilutions, put the stock at approximately 40 mg/mL, with the 1:60 dilution giving the lowest error and used as reference. The pNPB assay gave a mean specific activity of about 981 U/mg (969.6 and 992.0 U/mg in duplicate).",
      interpretation:
        "A well-defined baseline of concentration and activity was fixed for this chimeric lipase/phospholipase, against which every immobilisation yield could be referenced.",
      expectation:
        "Yes. The values are consistent with a concentrated commercial stock; the practical point was finding the dilution (1:60) that fell within the linear range, and using the butyrate ester pNPB as a fast, continuous reporter of activity.",
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
            "Time course of immobilisation on glutaraldehyde-activated MANAE-agarose. (A) Without Triton X-100 and (B) with Triton X-100, following the activity of the immobilisation suspension and of the clarified supernatant over time against the no-immobilisation control. (C) Immobilisation yield over time for the two conditions.",
        },
      ],
      observations:
        "On the glutaraldehyde-preactivated support, immobilisation was clearly better with 0.1% Triton X-100, reaching a yield of almost 80% and an immobilised activity of about 0.0053 U. Without the detergent, retention was poor.",
      interpretation:
        "Direct covalent attachment preserves activity only if the enzyme is held open, by the detergent, at the moment it is fixed; otherwise the derivative is largely inactive. This sensitivity is characteristic of lipases immobilised through residues near a mobile lid, and glutaraldehyde is the versatile amino-reactive crosslinker used to fix them.",
      expectation:
        "Partly. A stable derivative was expected from multipoint covalent attachment, but the strong dependence on detergent, and the low absolute activity even at about 80% yield, was the informative outcome that motivated the second strategy.",
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
        "The adsorption-then-crosslink route was best without Triton X-100, again reaching almost 80% yield but with an immobilised activity of about 0.0448 U, roughly ten times that of the preactivated covalent route from the same amount of enzyme and support.",
      interpretation:
        "Pre-orienting the enzyme by ionic adsorption before crosslinking preserves far more activity. The glutaraldehyde here also crosslinks lysines of neighbouring enzymes, consolidating the pre-oriented layer and capturing further monomers from solution, which is the basis of this two-step design on aminated supports.",
      expectation:
        "Yes in direction, and better than expected in magnitude. The two-step route was expected to be gentler, but the roughly tenfold gain, and the reversed detergent preference relative to Strategy A, exceeded expectations and became the headline result.",
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
        "The detergent had opposite effects on the two strategies: it improved the preactivated covalent route but harmed the ionic-adsorption route, which was best in plain buffer.",
      interpretation:
        "The surfactant is neither universally good nor bad. It helps only when the aim is to trap the open form on a pre-activated surface, and it interferes when correct electrostatic orientation is what matters, an effect tied to the enzyme's dimerisation and interfacial activation.",
      expectation:
        "Partly. A detergent effect was expected given the enzyme's tendency to form bimolecular aggregates through its exposed hydrophobic regions, but the clean reversal between the two geometries was the key, non-obvious finding, and it is what the modelling was then used to explain.",
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
            "The two winning conditions compared at equal yield. One unit is the activity of the free enzyme control, which kept its activity throughout.",
          headers: ["Condition", "Yield", "Immobilised activity"],
          rows: [
            ["Adsorption + crosslinking, no detergent", "~80%", "~0.0448 U"],
            ["Preactivated covalent, with detergent", "~80%", "~0.0053 U"],
          ],
        },
      ],
      observations:
        "Both winning conditions reached about 80% yield, but their immobilised activities differed roughly tenfold (about 0.0448 U for adsorption plus crosslinking without detergent, against about 0.0053 U for preactivated covalent with detergent). The free-enzyme control kept its activity throughout.",
      interpretation:
        "Yield alone is misleading: two methods can immobilise similar amounts of protein while retaining very different amounts of activity, so activity retention, not percentage bound, is the right metric. The control confirms the differences came from immobilisation, not from buffer effects or denaturation.",
      expectation:
        "Partly. Yields near 80% were plausible for both, but the tenfold activity gap at equal yield was the decisive and somewhat unexpected result, and the parallel control is what makes it trustworthy.",
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
      figures: [
        {
          src: `${FIGURES}/lecitase-top-view.png`,
          alt: "PyMOL views of Lecitase Ultra in its closed and open conformations, around the active site and the lid.",
          caption:
            "Lecitase® Ultra in its closed (left) and open (right) conformation: top view of the active site showing the catalytic triad (Ser146, Asp201, His258) at the bottom of the cavity and the lid domain (residues 80–95); side view highlighting Lys24 and Lys259 on the immediate periphery of the lid; rear view of the opposite face; and a detail of the polyanionic patch (Asp27, Glu56, Asp57, Asp62) around the active site.",
        },
        {
          src: `${FIGURES}/lecitase-side-view.png`,
          alt: "Side view of Lecitase Ultra showing Lys24 and Lys259 beside the lid in the closed and open forms.",
          caption:
            "Side view of the active centre, closed (left) and open (right), with Lys24 and Lys259 highlighted. In the closed form these lysines sit on the immediate periphery of the lid and the active centre, so fixing them covalently on the preactivated support rigidly immobilises that area and mechanically prevents the lid from moving.",
        },
        {
          src: `${FIGURES}/lecitase-rear-view.png`,
          alt: "Rear view of Lecitase Ultra, 180 degrees from the active site, with acidic and lysine residues highlighted.",
          caption:
            "View from the back, 180º from the catalytic pocket, with acidic (red) and lysine (blue) residues highlighted. This external surface sits away from the lid-opening mechanism, making it an ideal anchoring zone that keeps the active site exposed to the solvent.",
        },
        {
          src: `${FIGURES}/lecitase-acidic-patch.png`,
          alt: "Detail of the polyanionic patch Asp27, Glu56, Asp57 and Asp62 around the active site of Lecitase Ultra.",
          caption:
            "Detail of the catalytic pocket, closed (left) and open (right), with the polyanionic residues Asp27, Glu56, Asp57 and Asp62 in red. In the closed form this negatively charged patch allows targeted physical adsorption on the cationic MANAE-agarose support, protecting the flexibility of the active site before the final crosslinking.",
        },
      ],
      observations:
        "The open and closed models accounted for every case. On the preactivated support with detergent, the lid is held open and the surface lysines are fixed in the active conformation; without detergent, the closed enzyme is anchored through Lys24 and Lys259 next to the lid, jamming it shut. In the adsorption route, the acidic crown (Asp27, Glu56, Asp57, Asp62) adsorbs the enzyme with its active site projected outward, so without detergent the lid stays free, whereas with detergent the electrostatic orientation is scrambled and the subsequent crosslinking freezes a distorted, low-activity arrangement.",
      interpretation:
        "The activity differences are structural, not random: they follow from where the enzyme is anchored relative to its lid, and from whether the support acts as a molecular lock on the open form or a brake on the closed one. This is what makes the closed-form adsorption route the one to transfer to the sphere.",
      expectation:
        "Yes. The model was built to test the interfacial-activation and dimerisation hypothesis, and it reproduced the measured yields at the residue level, giving a mechanistic rather than merely empirical basis for the chosen strategy.",
    },
  ],
};

export const ENZYMATIC_IMMOBILISATION_SUBBLOCKS: ResultSubBlock[] = [
  {
    id: "enzyme-production",
    heading: "1. Enzyme production",
    intro:
      "This set of experiments builds and validates the enzymatic toolbox: candidate phosphohydrolases are identified by data mining, expressed heterologously in E. coli, purified by immobilised metal-ion affinity chromatography and characterised under the operating conditions of the reactor (pH 5.0, 30 ºC). Because heterologous expression carries inherent risks, a parallel search for commercial homologues was kept for each activity as a contingency plan.",
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
      "These experiments take the panel from database to characterised biocatalyst with no redundant step: activities were matched to the real effluent, constructs were designed to pre-empt insolubility, and only the rescue strategies actually needed were used.",
  },
  {
    id: "immobilisation-chemistry",
    heading: "2. Immobilisation chemistry",
    intro:
      "This set of experiments establishes how to fix the enzymes onto the support while keeping them active. Rather than testing directly on the more complex and costly alginate-chitosan-genipin sphere, the chemistry is first optimised on a simple, well-characterised MANAE-agarose model support, and the more reactive genipin of the final sphere is emulated by glutaraldehyde, which plays the same crosslinking role. The model enzyme is Lecitase® Ultra, chosen because it is the most demanding case: its active site is capped by a mobile lid that requires interfacial activation, and it forms bimolecular aggregates in solution.",
    results: [LECITASE, STRATEGY_A, STRATEGY_B, DETERGENT, YIELD, MODELLING],
    outro:
      "Using an inexpensive model support and glutaraldehyde as a stand-in for genipin let the two anchoring strategies be compared without spending resources on the full sphere; the detergent variable and the free-enzyme control were the minimum needed to interpret the yields, and the modelling was added only to explain the result.",
  },
];
