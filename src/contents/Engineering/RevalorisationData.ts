/**
 * Revalorisation content for the Engineering page — transcribed straight
 * from the team's own Notion write-up (the "Engineering / Revalorisation"
 * page, exported 18 October 2026). The export's wording, emphasis,
 * tables and figures are reproduced as they stand; the only thing left
 * out is the team's internal planning notes, and the one thing added is
 * a real link wherever the text points at another page of the wiki.
 *
 * Generated from that export rather than edited by hand, so a later
 * revision of the page can be brought over the same way.
 */

import { cell, figure, p, phase, table, ul, type Iteration } from "./dbtlData";

export const REVALORISATION_WILD_TYPE: Iteration[] = [
  {
    title: "DHAK DSM 30040: barely active",
    phases: [
      phase("Design", [
        p(
          "The natural starting point was the **reference form of C. freundii DHAK**, the sequence whose three-dimensional structure is solved and deposited as **PDB 1UN9**, from strain **DSM 30040**. It is the best-studied version of the enzyme and is reported as highly active, so it offered a known, well-documented quantity against which the rest of the work could be measured.",
        ),
      ]),
      phase("Build", [
        p(
          "The DSM 30040 coding sequence was obtained as a **synthetic gene** and cloned into the **pET-28a(+) expression vector** with a **C-terminal hexahistidine tag**, a construct meant for cytoplasmic expression in E. coli and single-step affinity purification.",
        ),
      ]),
      phase("Test", [
        p(
          "The construct was transformed into E. coli, expression was induced, and the crude extract was assayed by the **coupled α-GDH/TIM reaction**. SDS-PAGE of the extract showed **no band** at the expected mass (Figure 1), and the activity assay gave a shallow trace, an initial rate of **3.73 mOD/min** (R² = 0.991), equivalent to about **0.60 nmol DHAP/min** (Figure 2).",
        ),
        figure(
          "**Figure 1.** SDS-PAGE of the crude extracts of DHAK WT DSM 30040 (Lanes 1 and 2).",
          "assets/engineering/revalorisation/image.webp",
        ),
        figure(
          "**Figure 2.** DHAK activity assay of the wild type from C. freundii DSM 30040, the reference variant ordered from the PDB 1UN9 sequence. Coupled α-GDH/TIM assay; the fall in A₃₄₀ gives an initial rate of only 3.73 mOD/min (R² = 0.991).",
          "assets/engineering/revalorisation/image-1.webp",
        ),
      ]),
      phase("Learn", [
        p(
          "The fit was clean and the coupling system behaved normally, so the low slope is a **property of the sample**, not an artefact of the assay, and it agrees with the gel, both pointing to a very **small amount of functional DHAK**. A gel is worth weighing carefully here. SDS-PAGE reports the **amount of protein at a given mass, not its catalytic competence**, and as a **low-resolution technique** it cannot separate active enzyme from inactive or misfolded protein, nor resolve small amounts of it, so an absent band does not prove that nothing was made. The decision therefore rested on the **activity assay, which is the functional read-out**, and the activity was **far too low** for this preparation to serve as the reference. This was not expected from a freshly ordered, sequence-verified construct, and it turned the wild type from a formality into the **central problem of the module**. The response was to move to a natural variant kept in the laboratory, **C. freundii CECT 4626**, which differs from the reference at only a few residues and is reported as the **most catalytically efficient DHAK on record**.",
        ),
      ]),
    ],
  },
  {
    title: "DHAK CECT 4626, 2021 stock: no band, no activity",
    phases: [
      phase("Design", [
        p(
          "The **CECT 4626** variant had been isolated and characterised by our laboratory supervisor, **Israel Sánchez-Moreno**, who keeps aliquots of the strain from two years, **2021 and 2012**. It is a close natural variant of the reference rather than a different enzyme. Its gene differs from the DSM 30040 sequence at **117 nucleotides (92.9 % identity)**, but most of those changes are silent, so the protein differs at only **22 residues (4 %), with 96 % amino-acid identity**. The substitutions are **not evenly spread**: twelve fall in the **ATP-binding L-domain**, six in the **DHA-binding K-domain** and four in the **connector** between them, a concentration in the nucleotide-binding region that fits its reported behaviour. The variant is deposited as GenBank **DQ473522** and is described as the **most catalytically efficient DHAK recorded** (kcat ≈ 24 s⁻¹, Km for DHA ≈ 1.2 µM, kcat/Km ≈ 2×10⁷ M⁻¹s⁻¹). The literature sources for this variant, and for every published figure quoted on this page, are cited on the **[Results](/results#revalorisation)** page. We began with the **2021 stock**, on the reasoning that the **more recent aliquot** would have been better preserved.",
        ),
      ]),
      phase("Build", [
        p(
          "The 2021 aliquot was grown in culture, the biomass amplified, and expression of the enzyme induced under standard conditions. The culture was then harvested and lysed to a **cell-free extract**, and that extract was taken through the **full purification route, IMAC followed by dialysis**, so that the strain received the same treatment as any construct expected to yield usable enzyme.",
        ),
      ]),
      phase("Test", [
        p(
          "The IMAC eluates showed **no band** at the expected mass (Figure 3). A gel resolves only what is abundant, so an absent band does not by itself prove that nothing was made. Whether the strain was kept or discarded therefore rested on the activity, and so the **crude extract was assayed directly**, since activity reports on functional enzyme whether or not a band is seen. The absorbance at 340 nm **stayed flat** for the whole read, with a fitted slope of **−0.080 mOD/min** (R² = 0.035), so **no rate could be extracted** and the extract showed **no measurable DHAK activity** (Figure 4).",
        ),
        figure(
          "**Figure 3.** SDS-PAGE of the DHAK CECT 4626 2021 stock. Lanes 7 and 8, **IMAC eluates**, with no band at the expected mass. Lanes 1 and 2, the crude extract they were purified from.",
          "assets/engineering/revalorisation/dfb7a90b.webp",
        ),
        figure(
          "**Figure 4**. DHAK activity assay of the CECT 4626 variant, 2021 stock, cell-free extract. The trace is flat, with a fitted slope of −0.080 mOD/min (R² = 0.035), so no activity can be measured.",
          "assets/engineering/revalorisation/image-2.webp",
        ),
      ]),
      phase("Learn", [
        p(
          "The gel and the assay **agree**, with no band and no activity. Because this variant should be the **most active DHAK known**, a flat trace cannot reflect the enzyme itself. It reflects the **state of this particular aliquot**, not the biochemistry of CECT 4626. The bet on the fresher material had **not paid off**, and the absent band had already warned of it. The 2021 stock was set aside and the **older 2012 aliquot tested next**, the opposite of what the preservation argument had predicted.",
        ),
      ]),
    ],
  },
  {
    title: "DHAK CECT 4626, 2012 stock: the active reference",
    phases: [
      phase("Design", [
        p(
          "With the variant itself still the right choice and only the 2021 preparation discredited, the remaining aliquot, the **2012 stock**, was tested, on the reasoning that the failure of one stored batch says nothing about the enzyme.",
        ),
      ]),
      phase("Build", [
        p(
          "The 2012 aliquot was grown, amplified and induced under the **same conditions** as the 2021 stock, so the two preparations are directly comparable. This time the extract was **neither purified nor checked on a gel**. Both steps had consumed time and material on the previous stock without settling anything, so the extract went **straight to the activity assay**, and the activity was taken as an **indirect read-out of expression**, on the reasoning that an extract which converts substrate has necessarily expressed the enzyme. The purification of this stock is taken up later, once it was known to be active.",
        ),
      ]),
      phase("Test", [
        p(
          "The cell-free extract gave the **steepest trace of the whole study**, an initial rate of **581.1 mOD/min** (R² = 1.00), equal to **93.4 nmol DHAP/min** and a volumetric activity of **~18.7 U/mL** from 5 µL assayed (Figure 5). The rate and the volumetric activity depend only on the assay and the volume of extract added, not on any protein measurement.",
        ),
        figure(
          "**Figure 5.** DHAK activity assay of the CECT 4626 variant, 2012 stock, cell-free extract, first batch. Steepest trace of the series: initial rate 581.1 mOD/min (R² = 1.00), about 93.4 nmol DHAP/min and ~18.7 U/mL (5 µL assayed).",
          "assets/engineering/revalorisation/image-3.webp",
        ),
      ]),
      phase("Learn", [
        p(
          "The protein concentration could **not be measured reliably**. The Bradford readings sat just above the assay blank, and the **1 µL and 5 µL loads disagreed about fourfold** (Table 1), so **no specific activity (U/mg) can be assigned** and any value derived from that Bradford would carry the error.",
        ),
        table(
          [
            "Sample",
            "Absorbance (A₅₉₅, mean)",
            "Protein (mg/mL)",
            "Standard curve R²",
          ],
          [
            [cell("DHAK (1 µL)"), cell("0.345"), cell("1.35"), cell("0.994")],
            [cell("DHAK (5 µL)"), cell("0.355"), cell("0.37"), cell("0.994")],
          ],
          "**Table 1.** Bradford protein quantification of the 2012 crude extract at two sample volumes, against a BSA standard curve (y = 0.319 + 0.020·x, R² = 0.994). The 1 µL and 5 µL loads give inconsistent values and sit close to the assay blank, so no reliable concentration could be assigned.",
        ),
        p(
          "The conclusion does not depend on it. The 2012 extract is the **only DHAK preparation that is strongly and cleanly active** (R² = 1.00), and its rate is **two orders of magnitude above** the shallow trace of the DSM 30040 wild type (Figure 2) and the flat trace of the 2021 stock (Figure 4). That is exactly what is expected of CECT 4626 as the **most catalytically efficient DHAK on record**, and it is enough to select this stock as the **reference enzyme for the rest of the module**, carried forward through purification and into the coupled assay with PPK2.",
        ),
      ]),
    ],
  },
];

export const REVALORISATION_PROSS: Iteration[] = [
  {
    title: "An aggressive design without a control — PROSS 5, 56 mutations",
    phases: [
      phase("Design", [
        p(
          "A revalorisation process exposes its biocatalyst to handling, storage and reaction conditions that a laboratory assay does not, so DHAK had to be made **more thermodynamically stable without losing catalytic function**. Stabilisation was pursued **computationally**, because a design costs a server submission and a gene order whereas screening mutants at the bench costs months. **PROSS** was chosen because it lowers the free energy of the fold while allowing functional regions to be excluded from mutation, and the design started from the **complexed crystal structure PDB 1UN9**, so that residues within **4 Å of AMP-PNP, DHA or Mg²⁺** could be declared protected. The server returns a **gradient of designs**, from conservative to aggressive, and the real decision was which position of that gradient to order, since our budget allowed a **single synthetic gene**. The design was not ordered alone: it went into the same order as the **unmodified DSM 30040 wild type**, which is its control, because the two differ only in the introduced mutations.",
        ),
      ]),
      phase("Build", [
        p(
          "PROSS returned **nine designs**, from **21 substitutions (3.9 %)** to **119 (22.2 %) (Table 2)**, built on an alignment of over 3,000 homologous sequences ([see Results](/results#revalorisation)).",
        ),
        table(
          ["Design", "# Mutations", "% Mutations"],
          [
            [cell("DHAK_3_design_1"), cell("21"), cell("3.91")],
            [cell("DHAK_3_design_2"), cell("34"), cell("6.33")],
            [cell("DHAK_3_design_3"), cell("37"), cell("6.89")],
            [cell("DHAK_3_design_4"), cell("43"), cell("8.01")],
            [
              cell("**DHAK_3_design_5 (selected)**"),
              cell("**56**"),
              cell("**10.43**"),
            ],
            [cell("DHAK_3_design_6"), cell("69"), cell("12.85")],
            [cell("DHAK_3_design_7"), cell("83"), cell("15.46")],
            [cell("DHAK_3_design_8"), cell("99"), cell("18.44")],
            [cell("DHAK_3_design_9"), cell("119"), cell("22.16")],
          ],
          "**Table 2.** PROSS designs returned for DHAK from *C. freundii* DSM 30040.",
        ),
        p(
          "**Design 5, with 56 substitutions (10.4 %)**, was selected as the **mid-range compromise**: a conservative design risks gaining too little stability to measure, an aggressive one risks losing function outright, and the middle of the range is informative either way. Before ordering, the design was **superposed on the wild-type structure in PyMOL**: the fold, the K- and L-domains and the dimer interface are preserved, and **none of the protected residues carries a substitution** (Figure 6).",
        ),
        figure(
          "**Figure 6.** Mutated positions of PROSS design 5 mapped on the wild-type structure (PDB 1UN9). The substitutions sit on the surface and in the second shell, and none of the residues within 4 Å of AMP-PNP, DHA or Mg²⁺ is mutated.",
          "assets/engineering/revalorisation/image-4.webp",
        ),
        p(
          "The gene was ordered **codon-optimised in the pET-28a(+) expression vector** with a **C-terminal hexahistidine tag**, a construct meant for cytoplasmic expression in *E. coli* BL21(DE3) and single-step affinity purification; and was transformed, induced, harvested and lysed **alongside the wild type under identical conditions**.",
        ),
      ]),
      phase("Test", [
        p(
          "On SDS-PAGE, **PROSS 5 expressed strongly**, more than any other DHAK construct, accompanied by a **contaminating band of higher molecular mass** that followed it consistently and was never identified (Figure 7, Table 3).",
        ),
        p(
          "It was therefore purified by IMAC and dialysed, and its eluate gave **two well-defined, essentially clean bands** (Figure 7, lanes 9 and 12). The activity assay, however, was **flat**: the fitted slope of **0.92 mOD/min** has **R² = 0.374**, so **no rate can be extracted** and the variant showed **no measurable kinase activity** (Figure 8).",
        ),
        figure(
          "**Figure 7.** SDS-PAGE of the crude extracts and IMAC eluates of DHAK WT, DHAK PROSS 5 and DHAK CECT 4626 2021. Lane contents in Table 3. PROSS 5 (lane 3) expresses strongly, accompanied by the unidentified contaminant of higher molecular mass, and its eluate (lane 9) and dialysed eluate (lane 12) are essentially clean; the wild type (lanes 4 and 5) shows no band at the expected mass. Lane contents in Table 3.",
          "assets/engineering/revalorisation/dfb7a90b.webp",
        ),
        table(
          ["Lane", "Sample"],
          [
            [cell("3"), cell("**crude extract, DHAK PROSS 5**")],
            [cell("4"), cell("**crude extract, DHAK WT (1)**")],
            [cell("5"), cell("**crude extract, DHAK WT (2)**")],
            [cell("6"), cell("molecular mass markers")],
            [cell("9"), cell("**IMAC eluate, DHAK PROSS 5**")],
            [cell("12"), cell("**dialysed IMAC eluate, DHAK PROSS 5**")],
          ],
          "**Table 3**. Lane contents of the gel shown in Figure 7",
        ),
        figure(
          "**Figure 8.** DHAK activity assay of the PROSS design 5 variant, after IMAC and dialysis. A₃₄₀ stays essentially flat and the fitted slope (0.92 mOD/min) has R² = 0.374, so no activity can be reliably measured.",
          "assets/engineering/revalorisation/image-5.webp",
        ),
      ]),
      phase("Learn", [
        p(
          "The variant **expresses better than the wild type and does not work**, and the loss of activity is not in itself surprising: 56 substitutions is a substantial change to a protein, even with the active site protected. What makes this the **most consequential result of the block** is not what it showed but what it **prevented**. Two explanations of the flat trace were available, that the **mutations had abolished function** or that the **purification had inactivated the enzyme**, and separating them needs an active enzyme of the **same sequence background** taken through the **same procedure**. No such reference existed: the DSM 30040 wild type, the only sequence PROSS 5 can legitimately be compared against, was itself **barely active** (Iteration 1). The design was measured **without a working counterpart**, so its result is uninterpretable on its own.",
        ),
        p(
          "Set side by side (Table 4), the two constructs of this round show the problem directly: the one that expresses is the one that does not work, and the one that should have been the reference does not work either.",
        ),
        table(
          [
            "Construct",
            "Band on SDS-PAGE",
            "Initial rate (mOD/min)",
            "R²",
            "Reading",
          ],
          [
            [
              cell("DHAK WT (DSM 30040), control"),
              cell("No band at the expected mass"),
              cell("3.73"),
              cell("0.991"),
              cell("Clean fit on a very shallow slope: barely active"),
            ],
            [
              cell("DHAK PROSS 5"),
              cell("Strong, with an unidentified higher-mass contaminant"),
              cell("0.92"),
              cell("0.374"),
              cell("No fit: no measurable activity"),
            ],
          ],
          "**Table 4.** Expression and activity of the two constructs of the first design round. For each one, the band observed on SDS-PAGE, the initial rate and R² of the activity assay, and the reading that follows.",
        ),
        p(
          "The lesson is about experimental design rather than protein stability: when a single design is ordered against a single control, the whole comparison rests on that control working, and **the reference sequence should be shown to express and work before a gene order is committed to a design built on it.** Because the two explanations could not be told apart, the response had to act on **both at once**: a far more conservative design on a sequence known to be active (Iteration 5), and a purification route that exposes the enzyme to **neither metal nor imidazole** (Iterations 6 and 7).",
        ),
      ]),
    ],
  },
  {
    title:
      "A conservative redesign on an active background — PROSS 1, 21 mutations on CECT 4626",
    phases: [
      phase("Design", [
        p(
          "The previous iteration changed the question. It was no longer *how far the fold can be stabilised* but *how few mutations are needed*, and on **which sequence** they should be made. The sequence question was settled first, and it was not a preference: a stabilised variant **can only be judged against a wild type that works**, and the DSM 30040 reference did not. The host laboratory held the **CECT 4626** variant, reported as the **most catalytically efficient DHAK on record**, so moving the stabilisation onto that background was the **only route to a meaningful comparison**.",
        ),
        p(
          "The mutational load was settled second, and two arguments pointed the same way: 56 substitutions had been enough to abolish activity, and the final construct would carry the PROSS changes **on top of the ~22 positions at which CECT 4626 naturally differs** from the sequence the design was generated on, so the two sources of variation **compound** (Table 5). No new PROSS run was needed, since the server had already returned the full gradient for this enzyme in the previous round (Table 2, Iteration 4). We therefore took **design 1, the most conservative of the nine, with 21 substitutions (3.9 %)**, which keeps what is added on top of those natural differences to a minimum.",
        ),
        table(
          ["Source of variation", "Changes", "Relative to"],
          [
            [
              cell("PROSS design 5 (Iteration 4)"),
              cell("56"),
              cell("DSM 30040 wild type"),
            ],
            [
              cell("PROSS design 1 (this round)"),
              cell("21"),
              cell("DSM 30040 wild type"),
            ],
            [
              cell("Natural differences, DSM 30040 → CECT 4626"),
              cell("21"),
              cell("DSM 30040 wild type"),
            ],
            [
              cell("Mutations actually introduced into CECT 4626"),
              cell("20"),
              cell("CECT 4626 wild type"),
            ],
          ],
          "**Table 5.** Sources of sequence variation carried by the final construct. The PROSS designs are counted against the DSM 30040 sequence they were generated from, so the changes they propose add to the positions at which CECT 4626 already differs from it.",
        ),
      ]),
      phase("Build", [
        p(
          "A PROSS design is **tied to the sequence it was generated from**, so it cannot simply be applied to a homologue from another strain, even one sharing 96 % identity. An **additional transfer step** was therefore introduced: the design was aligned **position by position** with the natural CECT 4626 sequence, and every differing position assigned to one of three classes: **natural differences between the strains**, **PROSS substitutions absent from both natural sequences**, and **positions where the residue PROSS proposed is the one CECT 4626 already carries** (Figure 9). That third class is the one that matters for what is actually built, since there prediction and evolution agree and no mutation is needed.",
        ),
        figure(
          "**Figure 9.**  DHAK CECT 4626 carrying the PROSS mutation set. The sequence is annotated with the positions that differ naturally from *C. freundii* DSM 30040 (black), the stabilising changes introduced by PROSS design 1 (red), and the position where the residue CECT 4626 already carries is the one PROSS proposed (green), which therefore needed no mutation.",
          "assets/engineering/revalorisation/image-6.webp",
        ),
        p(
          "Only changes that are both predicted to stabilise and absent from the new sequence were transferred. The resulting sequence was ordered as a **synthetic gene, codon-optimised in the pET-28a(+) expression vector** with a **C-terminal hexahistidine tag**, the same construct used throughout this block, and transformed into *E. coli* **BL21(DE3)**.",
        ),
      ]),
      phase("Test", [
        p(
          "**The construct entered the pipeline but did not complete it.** The gene was ordered and transformed, but the time consumed by the expression and purification problems of the preceding iterations left **none to measure its expression or its activity**, so **no result on the stabilisation itself can be reported**.",
        ),
        p(
          "What the iteration does deliver is the transfer. The three classes were resolved across the full sequence (Table 6), and one of the 21 substitutions proposed by the design turned out to be a residue CECT 4626 already carries, so the number of mutations actually introduced is **smaller (20) than the design proposes (21)**. The construct now exists in a transformed expression host, with its **unmodified control available** alongside it.",
        ),
        table(
          ["Class of position", "Count", "Mutation needed in CECT 4626?"],
          [
            [
              cell(
                "Natural difference between the two strains, not proposed by PROSS",
              ),
              cell("21"),
              cell("No — already present"),
            ],
            [
              cell("PROSS substitution proposed by design 1"),
              cell("21"),
              cell("Yes — introduced"),
            ],
            [
              cell(
                "PROSS substitution coinciding with the natural CECT 4626 residue",
              ),
              cell("1"),
              cell("No — evolution already fixed it"),
            ],
            [
              cell("**Mutations finally introduced**"),
              cell("**20**"),
              cell("—"),
            ],
          ],
          "**Table 6.** Outcome of the position-by-position transfer of PROSS design 1 onto the CECT 4626 background, counted from the alignment shown in Figure 9. The first two rows give the totals: the two strains differ at 22 positions, and the design proposes 21 substitutions. The third row is the single position common to both, where the residue PROSS proposed is the one CECT 4626 already carries. That overlap is why 20 mutations were introduced rather than 21.",
        ),
      ]),
      phase("Learn", [
        p(
          "The transfer step is the methodological result, and it generalises: **comparing a design against the target sequence before transferring it** prevented us from introducing mutations the new enzyme **already carried naturally**, and it identified a class of positions where **prediction and evolution agree**, which is stronger evidence for a substitution than a predicted energy alone. Any team moving a PROSS design onto a homologue should expect to need this step.",
        ),
        p(
          "There is also a result here that **does not depend on the construct ever being assayed**. CECT 4626 differs from the DSM 30040 reference at 22 residues and is by far the more active of the two, and at one of those positions natural selection converged on the same residue PROSS proposed by computation. **The active variant can be read as a naturally optimised version of the sequence we started from**, which is what the design round was trying to achieve by calculation. That is an analogy rather than a demonstration, since what we measured is activity and PROSS optimises stability, but it reframes the comparison a future team will make: the construct will be judged against a sequence evolution has already worked on, not a naive one.",
        ),
        p(
          "The time lost to the earlier failures was taken from this construct. The gene was ordered and the host transformed; only the measurements were left undone. The comparison against the unmodified CECT 4626 sequence is fully set up, and it is the first thing a future team can do.",
        ),
      ]),
    ],
  },
];

export const REVALORISATION_PURIFICATION: Iteration[] = [
  {
    title: "IMAC loses the activity — pure protein, no measurable turnover",
    phases: [
      phase("Design", [
        p(
          "Comparing variants requires a preparation **clean enough to measure activity without interference**, not a homogeneous protein. Both constructs carry a **C-terminal hexahistidine tag**, so **IMAC on Co²⁺-IDA-agarose** was the natural first step. Cobalt was preferred over nickel because it binds the tag **less strongly but more selectively**, giving a cleaner eluate in a single step, and the run was done by **gravity flow with batch binding** in a disposable cartridge, with the flow started by hand with a capped syringe, so that **no pump or chromatography system** is needed and the procedure can be reproduced at low cost.",
        ),
        p(
          "The buffers could not be shared: **DHAK is released by even low salt and imidazole**, so its wash used **phosphate alone**, accepting co-eluting host proteins rather than risking the enzyme, while **PPK2 tolerates both** and was washed with **150 mM NaCl and 30 mM imidazole** (Table 7).",
        ),
        table(
          ["**Buffer**", "**DHAK**", "", "**PPK2**", ""],
          [
            [
              cell("**Equilibration**"),
              cell("0mM imidazole"),
              cell("0mM NaCl"),
              cell("30mM imidazole"),
              cell("150mM NaCl"),
            ],
            [
              cell("**Wash**"),
              cell("0mM imidazole"),
              cell(""),
              cell("30mM imidazole"),
              cell(""),
            ],
            [
              cell("**Elution**"),
              cell("1M imidazole"),
              cell(""),
              cell("1M imidazole"),
              cell("0mM NaCl"),
            ],
          ],
          "**Table 7.** Imidazole and NaCl concentration in the IMAC equilibration, wash and elution buffers for DHAK and PPK2.",
        ),
        p(
          "Every run was **internally controlled** by keeping Load, flow-through, wash and eluate for SDS-PAGE, and each eluate went straight into **overnight dialysis**, since the imidazole would otherwise interfere with the assay.",
        ),
      ]),
      phase("Build", [
        p(
          "The extracts available at that point were purified on fresh resin in separate cartridges: **PPK2**, **DHAK PROSS 5**, the **DSM 30040 wild type** and the **CECT 4626 2021 stock**. A **microlitre-scale express IMAC** was built alongside as a **diagnostic rather than a preparative** step, eluting with **SDS-PAGE loading buffer and heat** instead of imidazole, so that several constructs could be checked in parallel from almost no material.",
        ),
      ]),
      phase("Test", [
        p(
          "**PPK2 behaved exactly as intended**: its band is present in the extract, **absent from the flow-through** and **dominant in the dialysed eluate** over a reduced background (Figure 10, Table 8). The affinity route is therefore settled for this enzyme, and PPK2 required no further engineering cycle of its own; everything that follows in this block concerns DHAK.",
        ),
        figure(
          "**Figure 10.** SDS-PAGE of the PPK2 purification: crude extract, flow-through and dialysed IMAC eluate. The band is retained by the resin and recovered as the dominant species after dialysis. Lane contents in Table 8.",
          "assets/engineering/revalorisation/image-7.webp",
        ),
        table(
          ["Lane", "Sample"],
          [
            [cell("4"), cell("molecular mass markers")],
            [cell("5"), cell("**crude extract, PPK2**")],
            [cell("6"), cell("**flow-through, PPK2**")],
            [cell("7"), cell("**dialysed IMAC eluate, PPK2**")],
          ],
          "**Table 8.** Lane contents of the gel shown in Figure 10.",
        ),
        p(
          "**DHAK divided into two problems**, which the gel tells apart (Figure 11, Table 9). The wild-type and 2021 eluates are **empty, but their extracts already showed no band**, so those lanes report the expression problem and not the resin. **PROSS 5 is the only construct on which the purification can be judged**, and its eluate is clean, yet the dialysed preparation has **no measurable activity** (Figure 8, Iteration 4). The **dialysed lane is also visibly thicker** than the eluate it came from, so dialysis **concentrates the sample** as well as exchanging the buffer.",
        ),
        figure(
          "**Figure 11.** SDS-PAGE of the first DHAK affinity run. Crude extracts and IMAC eluates of DHAK CECT 4626 2021, DHAK PROSS 5 and DHAK WT, with the dialysed PROSS 5 eluate. Only PROSS 5 carries enough protein for the purification to be judged, and its dialysed lane is thicker than its eluate. Lane contents in Table 9.",
          "assets/engineering/revalorisation/image-8.webp",
        ),
        table(
          ["Lane", "Sample"],
          [
            [cell("1"), cell("**crude extract, DHAK CECT 4626 2021 (1)**")],
            [cell("2"), cell("**crude extract, DHAK CECT 4626 2021 (2)**")],
            [cell("3"), cell("**crude extract, DHAK PROSS 5**")],
            [cell("4"), cell("**crude extract, DHAK WT (1)**")],
            [cell("5"), cell("**crude extract, DHAK WT (2)**")],
            [cell("6"), cell("**molecular mass markers**")],
            [cell("7"), cell("**IMAC eluate, DHAK CECT 4626 2021 (1)**")],
            [cell("8"), cell("**IMAC eluate, DHAK CECT 4626 2021 (2)**")],
            [cell("9"), cell("**IMAC eluate, DHAK PROSS 5**")],
            [cell("10"), cell("**IMAC eluate, DHAK WT (1)**")],
            [cell("11"), cell("**IMAC eluate, DHAK WT (2)**")],
            [cell("12"), cell("**dialysed IMAC eluate, DHAK PROSS 5**")],
          ],
          "**Table 9.** Lane contents of the gel shown in Figure 11.",
        ),
        p(
          "The **express IMAC** confirmed what the preparative gel had shown, and from microlitre volumes: the resin **binds PROSS 5 and gives it back**, and the wild type is **absent from its own extract before any resin is involved** (Figure 12).",
        ),
        figure(
          "**Figure 12.** SDS-PAGE of the express IMAC of DHAK. PROSS 5 appears in its resin eluates as the only intense species; the wild type appears neither in its crude extract nor in its eluates.",
          "assets/engineering/revalorisation/3982d8b6.webp",
        ),
      ]),
      phase("Learn", [
        p(
          "The affinity step **works**: the resin binds this DHAK and releases it whenever the protein is there, and the express version showed it from almost no material, which is what allowed us to stop troubleshooting the column and start troubleshooting the construct.",
        ),
        p(
          "What the iteration **cannot** establish is whether IMAC **inactivates** DHAK. PROSS 5 came off the column clean and had no activity, and there are two readings of that: either the **56 mutations had abolished function** (Iteration 4), or the **purification destroyed the enzyme**. Telling them apart needs an **active enzyme of the same sequence background put through the same procedure**, and the only sequence that qualifies, the DSM 30040 wild type, was itself **barely active** (Iteration 1). Without a working reference the two explanations cannot be separated, and the question *“does the purification destroy the enzyme?”* **cannot be answered with an enzyme that was already dead**.",
        ),
        p(
          "Because neither reading could be ruled out, both had to be acted on at once. The construct was changed, with a far more conservative design on a background known to be active (Iteration 5), and the purification was changed, on the hypothesis that the **Co²⁺ and the 1 M imidazole** were responsible, which is plausible for a metal-dependent kinase. Testing that required a route using **neither** (Iteration 7).",
        ),
        p(
          "Three handling lessons were written into the protocol in the meantime: the **outlet must be capped** before loading, since a whole sample was lost to that; the **elution volume must never exceed the volume loaded**, since on another run the eluate came out too dilute; and the **dialysis bag needs free space and at least one buffer change**. Dialysis was also **reclassified**, from an optional clean-up to **part of the purification**, because it concentrates the sample.",
        ),
      ]),
    ],
  },
  {
    title:
      "Size exclusion does not recover it either — four FPLC runs, same outcome",
    phases: [
      phase("Design", [
        p(
          "If the **metal or the imidazole** was destroying DHAK, a method that uses **neither** should recover active enzyme. **Size-exclusion chromatography** separates by size, a property the enzyme has **regardless of how its tag behaves**, and it has two further advantages here: the enzyme **never meets metal ions or imidazole**, and it **elutes directly in the running buffer**, so no dialysis is needed before the assay. The separation was **isocratic**, on an **ÄKTAprime plus** with a preparative **HiLoad 26/60 Superdex 200 pg** column, which records **A₂₈₀ in real time** so that fractions are chosen from the chromatogram rather than blindly. Three reference volumes were fixed in advance and make every trace readable: a **void volume of ~110 mL**, a **total volume of ~320 mL**, and the **window of ~220–270 mL** where DHAK is expected.",
        ),
      ]),
      phase("Build", [
        p(
          "**Four runs** were performed on the cell-free extract of the **active 2012 stock**, clarified before injection and with the column **equilibrated overnight** so that the baseline was stable. Fractions spanning the collection region were kept and assayed by the **same coupled α-GDH/TIM method** used on the extract, so the results are directly comparable with the material loaded.",
        ),
      ]),
      phase("Test", [
        p(
          "The four runs are summarised in Table 10, and the activity of every fraction assayed from them in Table 11; the chromatograms themselves are on the **[Results](/results#revalorisation)** page. They are reported chronologically, because **the series as a whole is the result**, and what it shows is that **no two runs behaved the same way**.",
        ),
        ul([
          "Run 1 was almost empty.",
          "Run 2 gave the only active fractions of the series, from a broad and poorly resolved feature.",
          "Run 3 gave the one narrow, symmetric peak the technique should produce, squarely in the DHAK window, and **it was lost** because the fraction collector was started after the peak had left the system.",
          "Run 4 gave a candidate peak overlapping much larger late-eluting material, and no rate could be extracted from it.",
        ]),
        p(
          "Across the three runs that produced real absorbance, **most of the signal elutes near the total volume**, where small molecules appear, and little inside the window where DHAK is expected.",
        ),
        table(
          [
            "Run",
            "Max. absorbance (mAU)",
            "Peaks observed (mL, mAU)",
            "Fractions collected",
            "Best activity from them (mOD/min, R²)",
            "Reading",
            "Chromatogram",
          ],
          [
            [
              cell("1"),
              cell("7.5"),
              cell(
                "Three faint shoulders in the collection window; broad rise ~290",
              ),
              cell("17–68"),
              cell("−8.40 (0.957)"),
              cell("Almost nothing left the column"),
              cell("See run 1 in Results"),
            ],
            [
              cell("2"),
              cell("577"),
              cell("~105 (32), **~288 (577)**, ~330 (147)"),
              cell("17–56"),
              cell("−42.91 (0.998)"),
              cell("Active fractions, but the peak was broad and unresolved"),
              cell("See run 2 in Results"),
            ],
            [
              cell("3"),
              cell("51"),
              cell("One narrow, symmetric peak inside the 220–270 window"),
              cell("None usable"),
              cell("Not assayed"),
              cell(
                "Best separation of the series, lost to a late fraction collector",
              ),
              cell("See run 3 in Results"),
            ],
            [
              cell("4"),
              cell("825"),
              cell("~110 (202), **~261 (187)**, ~290 (825), ~333 (274)"),
              cell("25–48"),
              cell("−11.12 (0.566)"),
              cell("Candidate peak overlapping much larger late material"),
              cell("See run 4 in Results"),
            ],
          ],
          "**Table 10.** Summary of the four size-exclusion runs. Elution volumes in mL, with the peak falling inside the 220–270 mL DHAK window in bold where one is present. Full chromatograms are given on the [Results](/results#revalorisation) page.",
        ),
        table(
          [
            "Run",
            "Fraction",
            "Initial rate (mOD/min)",
            "R²",
            "Rate extractable?",
          ],
          [
            [
              cell("1"),
              cell("27"),
              cell("−8.40"),
              cell("0.957"),
              cell("Yes, but two orders of magnitude below the load"),
            ],
            [
              cell("1"),
              cell("46"),
              cell("−1.51"),
              cell("0.571"),
              cell("No — fit to noise"),
            ],
            [
              cell("1"),
              cell("56"),
              cell("−0.16"),
              cell("0.035"),
              cell("No — flat trace"),
            ],
            [cell("2"), cell("27"), cell("−16.64"), cell("0.989"), cell("Yes")],
            [
              cell("2"),
              cell("46"),
              cell("−42.91"),
              cell("0.998"),
              cell("Yes — steepest purified fraction of the study"),
            ],
            [
              cell("2"),
              cell("56"),
              cell("−0.16"),
              cell("0.035"),
              cell("No — flat trace"),
            ],
            [
              cell("3"),
              cell("—"),
              cell("—"),
              cell("—"),
              cell("No sample collected"),
            ],
            [
              cell("4"),
              cell("Collected peak"),
              cell("−11.12"),
              cell("0.566"),
              cell("No — fit too poor"),
            ],
          ],
          "**Table 11.** Coupled α-GDH/TIM assay of the fractions collected from runs 1, 2 and 4. No fraction was available from run 3. For reference, the crude extract loaded onto the column gave 581.1 mOD/min from 5 µL.",
        ),
      ]),
      phase("Learn", [
        p(
          "**The hypothesis could not be tested as designed.** The point of changing to size exclusion was to find out whether the metal and the imidazole were destroying the enzyme, and that question needs a method that works reliably enough for its output to mean something. **This one did not**. Of the four runs, one was empty, one gave active fractions, one was lost to a handling error and one gave an unreadable trace, so **the variable we had meant to isolate was buried under the variability of the method itself**. We cannot say from this that activity is lost during size exclusion, since a fraction with no activity may equally report an unresolved separation or a problem upstream of the column. What we can say is that **in our hands, and with our protocol, the technique was not reproducible**, which is unusual for size exclusion and points at how we were running it rather than at the principle.",
        ),
        p(
          "Two practical considerations closed the route. Each run takes the best part of a day on a shared instrument, and each one consumes about **5 mL of extract** that cannot be recovered. With the time and the material left, a method that had to be developed before it could answer anything was **not a good use of either**, whatever the answer turned out to be.",
        ),
        p(
          "The chromatograms do leave one diagnosis worth recording. In every run with real absorbance, the dominant peaks sit near the **total volume** of the column, where small molecules elute, and very little appears in the DHAK window. That is what a **crude extract** looks like on a size-exclusion column: mostly nucleotides and small metabolites, with the protein a minor component. Asking a preparative gel-filtration column to take a crude extract is asking it to **capture and polish in one step**, and that is not what the technique is for. A capture step before the column, or a far more concentrated load, is where a future team should start if they return to this route.",
        ),
        p(
          "Three operating points went into the protocol: the ÄKTAprime **starts every run in pause mode**; the system must be **purged of air** whenever the mobile phase is connected or removed, which we now do the day before; and the **fraction collector is now a timed step**, started before the expected window rather than when the peak appears.",
        ),
        p(
          "With no time to develop the method further, the work returned to the affinity route, with the one variable that had **never** been changed: the **material loaded**.",
        ),
      ]),
    ],
  },
  {
    title:
      "Back to IMAC with the active strain — purification finally yields active DHAK",
    phases: [
      phase("Design", [
        p(
          "Two methods had failed on DHAK and the diagnosis had been sought **in the chemistry of each one**. The variable never changed was the **material loaded**: every column run so far had started from a construct that **did not express** or whose **activity was unknown**, so in no case could a loss across the column be **measured**, since there was no activity entering it to lose. The **2012 CECT 4626 stock** changed that, giving the **steepest trace of the whole study** in crude extract (Engineering, Iteration 3). The affinity route had **never been applied to it**, because that stock had gone straight to size exclusion. The design is therefore deliberately minimal, **the same protocol, resin, buffers and dialysis, with only the starting extract changed**, which is what makes it a test of the earlier failures rather than a new experiment.",
        ),
      ]),
      phase("Build", [
        p(
          "The 2012 extract was purified under the established conditions and the eluate dialysed overnight, with the crude extract and the two eluted fractions kept for SDS-PAGE. **Two preparations were produced, and they are not the same material.** The first was assayed as it came off the dialysis. The second came from an **independent culture of the same stock**, taken through its own round of expression, selection, harvest and lysis and purification, and was **concentrated by centrifugal ultrafiltration (Centricon)** after dialysis rather than assayed dilute.",
        ),
      ]),
      phase("Test", [
        p(
          "The gel gives the reading that had been missing (Figure 13), since until then the only evidence that IMAC recovers DHAK came from a construct whose activity was unknown. The crude extract loaded onto the column carries the **full host background**, with the band at the mass of DHAK no more prominent than several others. The two eluted fractions carry a **dominant band at 60 kDa**, the mass calculated for the tagged subunit, and have **lost most of the host species** present in the extract; **two minor species survive**, one slightly above 60 kDa and one near 35 kDa, so the preparation is **enriched rather than homogeneous**. The first fraction (F-1, the eluate) is more concentrated than the second (F-2, after dialysis), which is why the preparation was concentrated by centrifugal ultrafiltration before being taken into the assay.",
        ),
        figure(
          "**Figure 13.** SDS-PAGE of the IMAC purification of the DHAK CECT 4626 2012 stock. The eluted fractions show the band expected for DHAK at 60 kDa over a background strongly reduced with respect to the extract. Lane contents in Table 12.",
          "assets/engineering/revalorisation/image-9.webp",
        ),
        table(
          ["Lane", "Sample"],
          [
            [cell("1"), cell("molecular mass markers")],
            [
              cell("2"),
              cell(
                "CFE, crude extract loaded onto the column *(expression block)*",
              ),
            ],
            [cell("3"), cell("F-1, IMAC eluate")],
            [cell("4"), cell("F-2, IMAC eluate after dialysis")],
          ],
          "**Table 12.** Lane contents of the gel shown in Figure 13.",
        ),
        p(
          "**The step is not quantified.** No flow-through or wash lane was run and the gel was not loaded on equal protein, so neither the loss to the resin nor the recovery can be stated from the image; what the gel establishes is that the resin **retains this enzyme and gives it back**, not how much of it.",
        ),
        p(
          "The two preparations then **did not agree on activity**. The first gave **−1.41 mOD/min with R² = 0.928** (Figure 14), a clean fit on a signal that barely falls, which amounts to **no measurable activity**. The second gave **850.1 mOD/min (R² = 0.999)**, about **20 U/mL**, and with **1.990 mg/mL** of protein by Bradford a **specific activity of ~10 U/mg** (Figure 15, Table 13), essentially the **10.7 U/mg reported for the fully purified enzyme**.",
        ),
        figure(
          "**Figure 14.** Coupled assay of the first dialysed IMAC eluate of the 2012 stock, assayed without concentration. The fit is clean but the signal barely falls (−1.41 mOD/min, R² = 0.928): no measurable activity.",
          "assets/engineering/revalorisation/image-10.webp",
        ),
        figure(
          "**Figure 15.** DHAK activity of the second preparation, from an independent culture of the same stock, after IMAC, dialysis and concentration by centrifugal ultrafiltration. Initial rate 850.1 mOD/min (R² = 0.999), ~20 U/mL and a specific activity of ~10 U/mg.",
          "assets/engineering/revalorisation/image-11.webp",
        ),
        table(
          [
            "Sample",
            "Absorbance (A₅₉₅, mean)",
            "Protein (mg/mL)",
            "Standard curve R²",
          ],
          [
            [
              cell("DHAK purified (IMAC + Centricon), 2 µL"),
              cell("0.269"),
              cell("1.990"),
              cell("0.994"),
            ],
          ],
          "**Table 13.** Bradford protein quantification of the concentrated IMAC preparation, against a BSA standard curve.",
        ),
        table(
          [
            "Preparation",
            "Culture",
            "Concentrated?",
            "Initial rate (mOD/min)",
            "R²",
            "Volumetric activity",
            "Specific activity",
          ],
          [
            [
              cell("Crude extract (reference)"),
              cell("First"),
              cell("—"),
              cell("581.1"),
              cell("1.00"),
              cell("~18.7 U/mL"),
              cell("Not assignable"),
            ],
            [
              cell("IMAC + dialysis"),
              cell("First"),
              cell("No"),
              cell("−1.41"),
              cell("0.928"),
              cell("None measurable"),
              cell("—"),
            ],
            [
              cell("IMAC + dialysis + Centricon"),
              cell("Independent"),
              cell("Yes"),
              cell("850.1 mOD/min"),
              cell("0.999"),
              cell("~20 U/mL"),
              cell("~10 U/mg."),
            ],
          ],
          "**Table 14.** The two affinity preparations of the 2012 stock side by side, with the crude extract as reference.",
        ),
      ]),
      phase("Learn", [
        p(
          "**The affinity route does recover active DHAK, and at the published specific activity.** The same protocol that had delivered nothing from three earlier extracts delivered, from this one, a preparation reaching **~10 U/mg** against the **10.7 U/mg reported** for the fully purified enzyme. That is what the whole purification line had been missing, and it is what made the coupled assay with purified enzyme possible, with a known amount of DHAK entering the reaction rather than a volume of extract.",
        ),
        p(
          "The honest limit has to be stated with it. The two preparations differ in **more than one respect at once**, in the **batch of enzyme** and in the **concentration step** (Table 14), so **we cannot attribute the difference to a single controlled variable**. The reading is **descriptive rather than causal**: the route recovers active DHAK **without yet doing so predictably**.",
        ),
        p(
          "Two lessons hold despite that limitation. The first is about the **order of diagnosis**. We changed the chemistry of the purification twice, to size exclusion and back, before ever testing it on an enzyme known to be active, and both changes were therefore uninterpretable: a method cannot be judged on material that carries no activity into it. **The input should be validated before the method is varied.** The second is practical and nearly cost us the result: **a dilute eluate reads as an inactive one**, so concentration belongs in the protocol as a step rather than being applied when the eluate happens to look dilute.",
        ),
        p(
          "What a future round should do first is **repeat this purification varying the batch and the concentration step one at a time**, and run the flow-through and wash lanes on the same gel, so that the step can be quantified rather than only shown to work.",
        ),
      ]),
    ],
  },
];

export const REVALORISATION_COUPLING: Iteration[] = [
  {
    title: "First DHAK–PPK2 coupling, the read-out saturates",
    phases: [
      phase("Design", [
        p(
          "The aim was to test whether the coupled DHAK–PPK2 system **regenerates ATP**, that is, whether it forms more DHAP than the **substoichiometric 1.7 mM ATP** supplied could account for on its own. DHAP was read by the endpoint **α-GDH/TIM** assay, in which one NADH is consumed per DHAP, so the fall in A₃₄₀ reports the product. The design put a **fixed, limited amount of NADH** in the detection well, intending that its full consumption would correspond to a DHAP concentration **just above the 1.7 mM ATP**, so that a saturated signal would by itself mean DHAP had exceeded the ATP and therefore that ATP had been regenerated.",
        ),
      ]),
      phase("Build", [
        p(
          "The reaction used **DHAK cell-free extract** and **purified PPK2**, **50 mM DHA**, **1.7 mM ATP** and polyphosphate at **45 mM chains (R1)** or **90 mM chains (R2)**, sampled at 90 and 180 min. Polyphosphate was supplied as chains of **12 phosphate units on average**, so those feeds carry **540 mM and 1080 mM of transferable phosphate**, and every polyphosphate concentration on this page is given as millimolar chains. DHAK entered as a **cell-free extract** rather than as a purified preparation because **no purification route had yet delivered active enzyme**, for the reasons set out in the iterations above, so waiting for one would have held up the coupled work indefinitely. The detection well was built with **0.30 mM NADH** (20 mM stock) and a **1:4 dilution** of the reaction sample, which places the detection ceiling at 0.30 mM × 4 = **1.2 mM DHAP in the reaction**.",
        ),
      ]),
      phase("Test", [
        p(
          "Every reaction sample drove the well to **full NADH consumption** (ΔA₃₄₀ ≈ 1.0), identical to the 50 mM DHAP standard, at both polyphosphate concentrations and both time points (Table 15). The 25 mM standard failed to develop, leaving a single saturated standard and no calibration curve.",
        ),
        table(
          ["Sample", "Before", "After", "ΔA₃₄₀"],
          [
            [
              cell("DHAP 50 mM (standard)"),
              cell("1.254"),
              cell("0.236"),
              cell("1.018"),
            ],
            [
              cell("R1 (45 mM polyP chains), 90 min"),
              cell("1.105"),
              cell("0.151"),
              cell("0.954"),
            ],
            [
              cell("R1 (45 mM polyP chains), 180 min"),
              cell("1.170"),
              cell("0.087"),
              cell("1.083"),
            ],
            [
              cell("R2 (90 mM polyP chains), 90 min"),
              cell("1.166"),
              cell("0.193"),
              cell("0.973"),
            ],
            [
              cell("R2 (90 mM polyP chains), 180 min"),
              cell("1.205"),
              cell("0.148"),
              cell("1.057"),
            ],
          ],
          "**Table 15.** Coupled DHAK–PPK2 endpoint assay with DHAK cell-free extract. A₃₄₀ before and after addition of α-GDH/TIM for each reaction sample and for the DHAP standard.",
        ),
      ]),
      phase("Learn", [
        p(
          "Two design faults surfaced. First, the **aliquot taken into each well was too large**, so the sample carried far more DHAP than the 0.30 mM NADH could titrate and every well saturated, which means the readings mark the **ceiling of the assay** rather than the DHAP present, and no turnover can be extracted. Second, the **ceiling itself was misplaced**, since 1.2 mM sits **below the 1.7 mM ATP**, not above it, so even an unsaturated reading could not have proved DHAP exceeded the ATP. The round still shows that **DHAP is formed in every condition** (at least 1.2 mM), so the coupled system runs, but the question it was built to answer is **unanswerable as designed**. The corrective for the next cycle is a **much smaller aliquot per well**, which keeps the signal inside the linear range and raises the DHAP ceiling well above the ATP.",
        ),
      ]),
    ],
  },
  {
    title: "Redesigned read-out, ATP regeneration quantified",
    phases: [
      phase("Design", [
        p(
          "The reaction chemistry was essentially that of iteration 9 (**50 mM DHA**, **1.7 mM ATP**, DHAK and PPK2, with polyphosphate as the donor), and only the **detection was redesigned**. The controlling variable is the **volume of reaction taken into each well**, since a much smaller aliquot delivers less DHAP than the NADH available, so the standards no longer saturate and each sample reads as a concentration. Both enzymes were also used as **purified preparations**, removing the ill-defined crude background and letting the result be referred to a known amount of protein. Purified DHAK was available for this round because the affinity route had by then **delivered an active preparation**, which is the outcome reported in **iteration 8**, so the round that iteration 9 could not complete with crude extract could now be run with both enzymes purified.",
        ),
      ]),
      phase("Build", [
        p(
          "**Purified DHAK and purified PPK2** were combined under the same chemistry as iteration 9, except that **polyphosphate was supplied fed-batch**, in seven additions over the first hour, to a final **16.9 mM chains (R1)** and **50.4 mM chains (R2)**, which corresponds to **202.8 mM and 604.8 mM of transferable phosphate**. The **sample volume per well was reduced** so that the DHAP standards would develop without reaching the ceiling, and a **three-point calibration** was built from the 0, 25 and 50 mM DHAP standards.",
        ),
      ]),
      phase("Test", [
        p(
          "The 25 and 50 mM standards now gave **distinct, unsaturated signals** (ΔA₃₄₀ 0.462 and 0.873) and fell on a **straight line** over the full 0–50 mM range (DHAP = 58.521·ΔA₃₄₀ − 1.4123; Figure 16). Read against it, **R1 formed 16.44 mM DHAP** and **R2 formed 49.15 mM** (Table 16), which is **32.9 % and 98.3 % conversion of the 50 mM DHA**, with R2 reaching **essentially full conversion of the substrate**.",
        ),
        figure(
          "**Figure 16.** DHAP standard curve for the coupled DHAK–PPK2 endpoint assay (round 2). DHAP concentration plotted against the fall in absorbance at 340 nm (ΔA₃₄₀, before minus after addition of α-GDH/TIM), from the 0, 25 and 50 mM DHAP standards. The linear fit, DHAP (mM) = 58.521·ΔA₃₄₀ − 1.4123 (R² ≈ 0.999), was used to convert the ΔA₃₄₀ of each reaction sample into DHAP. Unlike round 1, the standards fall on a straight line over the full 0–50 mM range, so the determination is within its linear region and the samples can be read as concentrations.",
          "assets/engineering/revalorisation/image-12.webp",
        ),
        table(
          [
            "Sample",
            "A₃₄₀ before",
            "A₃₄₀ after",
            "ΔA₃₄₀",
            "DHAP (mM)",
            "Conversion of DHA",
          ],
          [
            [
              cell("Control (−)"),
              cell("0.897"),
              cell("0.878"),
              cell("0.019"),
              cell("0.00"),
              cell("—"),
            ],
            [
              cell("DHAP 25 mM (standard)"),
              cell("0.914"),
              cell("0.452"),
              cell("0.462"),
              cell("25.00"),
              cell("—"),
            ],
            [
              cell("DHAP 50 mM (standard)"),
              cell("0.917"),
              cell("0.044"),
              cell("0.873"),
              cell("50.00"),
              cell("—"),
            ],
            [
              cell("R1 (16.9 mM polyP chains, 1.5 h)"),
              cell("0.941"),
              cell("0.636"),
              cell("0.305"),
              cell("16.44"),
              cell("32.9 %"),
            ],
            [
              cell("R2 (50.4 mM polyP chains, 1.5 h)"),
              cell("0.934"),
              cell("0.070"),
              cell("0.864"),
              cell("49.15"),
              cell("98.3 %"),
            ],
          ],
          "**Table 16.** Coupled DHAK–PPK2 endpoint assay with both enzymes purified. A₃₄₀ before and after addition of α-GDH/TIM, with DHAP interpolated against the 25 and 50 mM standards.",
        ),
      ]),
      phase("Learn", [
        p(
          "The redesign **worked**, since the determination is linear, the standards resolve, and DHAP is measured directly rather than hitting a ceiling. Because only **1.7 mM ATP** was supplied, forming 16.44 and 49.15 mM DHAP means the **ATP pool was recycled about 10 times in R1 and about 29 times in R2**, so **ATP is regenerated** and the extent **scales with the polyphosphate supplied**, with R2 reaching essentially full conversion of the DHA. The question iteration 9 could not settle is now answered, and this configuration, **both enzymes purified with a small aliquot per well**, is the one carried forward as the working ATP-regenerating module. Polyphosphate was in **large excess throughout**, with only about **8 % of the phosphate supplied** transferred in either condition, so what limited R1 was the amount fed rather than the donor running out. Two limits qualify all of this. The determination was run **once per condition at a single time point**, with no replicates. And the experiment **carries no condition lacking PPK2**, so the recycling is inferred from the stoichiometry of the nucleotide supplied rather than measured against a non-regenerating control. Both are the first things a future round should close.",
        ),
      ]),
    ],
  },
];

export const REVALORISATION_MODELLING: Iteration[] = [
  {
    title: "Each partner on its own — AlphaFold, partial success",
    phases: [
      phase("Design", [
        p(
          "In this module **PPK2 regenerates the ATP that DHAK consumes**, so keeping the two enzymes **covalently close** should favour **substrate channelling**: the ATP formed by PPK2 would reach the DHAK active site **before diffusing into the bulk**, raising the local concentration of the cofactor.",
        ),
        p(
          "**SpyTag/SpyCatcher** was chosen because it joins two proteins through a **spontaneous, irreversible isopeptide bond** that forms on mixing, with no enzyme, cofactor or crosslinker. Two decisions follow, and only one could be made from what we knew. The elements were assigned **by size**, the short **SpyTag to DHAK**, already a large homodimer with composite active sites at the subunit interface, and the bulkier **SpyCatcher to PPK2**, the smaller protein. **Which terminus carries each element cannot be decided from sequence**, because the fusion must sit **away from the catalytic regions** and still leave the two active sites **facing each other**, so it has to be examined structurally. Modelling came **before any gene order**, for the same reason as the PROSS work.",
        ),
      ]),
      phase("Build", [
        p(
          "Because the two enzymes are ultimately **expressed as separate proteins** that meet only on mixing, each was modelled **carrying only its own element**. Two fusions were predicted with **AlphaFold**, **DHAK with the SpyTag at the N-terminus** and **PPK2 with the SpyCatcher at the N-terminus**, and **free PPK2** was predicted in parallel as the **reference** against which its fusion would be judged. The DHAK model was superposed in PyMOL on **PDB 1UN9**, the only structural reference available, since **no crystal structure exists for CECT 4626**.",
        ),
      ]),
      phase("Test", [
        p(
          "**The DHAK–SpyTag fusion was predicted cleanly** (Figure 17): the enzyme adopts its expected fold and the tag **protrudes as a disordered extension**, which is what a short peptide of that kind should look like, and the superposition shows the **fold unchanged** (Figure 18).",
        ),
        figure(
          "**Figure 17.** AlphaFold model of the DHAK–SpyTag fusion. The enzyme adopts its expected fold and the SpyTag protrudes from the N-terminus as a disordered extension.",
          "assets/engineering/revalorisation/image-13.webp",
        ),
        figure(
          "**Figure 18.** The DHAK–SpyTag model (lightpink) superposed in PyMOL on the crystal structure of wild-type DHAK from *C. freundii* DSM 30040, PDB 1UN9 (lightblue). The two structures overlay closely, so the fusion does not disturb the fold.",
          "assets/engineering/revalorisation/d53126d8.webp",
        ),
        p(
          "**The PPK2–SpyCatcher fusion could not be predicted reliably**: the SpyCatcher came back **disordered** and, more seriously, **PPK2 itself did not resemble the free enzyme** (Figure 19), so **nothing about the geometry of the complex could be judged from it**. The **free-PPK2 control**, predicted without any fusion, agrees with the published structure of BcPPK2-III (Figure 20). The confidence metrics of the three models are given in Table 17.",
        ),
        figure(
          "**Figure 19.** AlphaFold model of the PPK2–SpyCatcher fusion. The SpyCatcher is predicted as a disordered region and PPK2 does not adopt its expected fold.",
          "assets/engineering/revalorisation/image-14.webp",
        ),
        figure(
          "**Figure 20.** AlphaFold model of free PPK2, predicted without any fusion and used as the reference for the fusion model. The predicted fold agrees with the structure described for BcPPK2-III.",
          "assets/engineering/revalorisation/b495f898.webp",
        ),
        table(
          [
            "Model",
            "Source",
            "Engine",
            "Element fused",
            "Terminus",
            "Role",
            "Outcome",
          ],
          [
            [
              cell("DHAK–SpyTag"),
              cell("Predicted"),
              cell("AlphaFold"),
              cell("SpyTag"),
              cell("N"),
              cell("Fusion to be assessed"),
              cell(
                "Reliable — fold unchanged on superposition, tag disordered as expected",
              ),
            ],
            [
              cell("DHAK wild type, *C. freundii* DSM 30040"),
              cell("**PDB 1UN9**"),
              cell("Crystal structure"),
              cell("—"),
              cell("—"),
              cell("Structural reference for DHAK"),
              cell("Experimental structure; no CECT 4626 structure available"),
            ],
            [
              cell("Free PPK2"),
              cell("Predicted"),
              cell("AlphaFold"),
              cell("—"),
              cell("—"),
              cell("Structural reference for PPK2"),
              cell("Reliable — agrees with the published BcPPK2-III structure"),
            ],
            [
              cell("PPK2–SpyCatcher"),
              cell("Predicted"),
              cell("AlphaFold"),
              cell("SpyCatcher"),
              cell("N"),
              cell("Fusion to be assessed"),
              cell(
                "Not reliable — SpyCatcher disordered and PPK2 fold not reproduced",
              ),
            ],
          ],
          "**Table 17.** Models used in this round and the reference structures each fusion was judged against. DHAK was compared with its crystal structure (PDB 1UN9), since no structure is available for the CECT 4626 variant; PPK2, which has no crystal structure here, was compared with a prediction of the free enzyme made under the same conditions.",
        ),
      ]),
      phase("Learn", [
        p(
          "The **control is what makes the failure interpretable**. Because free PPK2 was predicted correctly, the problem lies in the **fusion** and not in the target, so the model could be **rejected rather than argued with**. Without that control, a bad model of PPK2–SpyCatcher would have been indistinguishable from a protein the predictor simply handles badly.",
        ),
        p(
          "The contrast between the two halves is itself the finding: **a short peptide can be appended to a folded enzyme without disturbing the prediction, an isolated domain cannot**. The reason is clear once the nature of the system is considered: **SpyTag and SpyCatcher are two complementary fragments of a single bacterial protein**, split by their designers, and a model trained on natural proteins has **no reason to fold one half correctly on its own**. **Half a protein is not a protein**, and the prediction behaves accordingly.",
        ),
        p(
          "That reframed the next attempt: if the halves cannot be modelled apart, each enzyme must be modelled carrying the **complete** system, **even though the constructs will never exist in that form at the bench** (Iteration 12).",
        ),
      ]),
    ],
  },
  {
    title: "The whole complex — Boltz2 and the assembled fusion",
    phases: [
      phase("Design", [
        p(
          "The redesign follows from the diagnosis: model each enzyme fused to the **complete SpyTag/SpyCatcher system**, each attached **through the side that corresponds to it in the final construct**, PPK2 through the **SpyCatcher** and DHAK through the **SpyTag**, so that the module is predicted as the **intact protein it derives from** rather than as an isolated half. The prediction interface was changed to **Boltz2**. This makes the model **deliberately unfaithful to the construct**, since at the bench each enzyme carries one element only and they meet on mixing, and that is accepted on purpose: **the geometry of the assembled complex is what the design needs to know**, and the tools can only reach it this way.",
        ),
      ]),
      phase("Build", [
        p(
          "**PPK2** was modelled with the complete system at its **N-terminus**, and **DHAK** with the complete system at its **C-terminus** rather than the N-terminus used in the previous round. The C-terminus is the side on which the SpyTag half of the system can be joined to DHAK without rebuilding the start of the sequence, which is what an N-terminal placement would demand. The C-terminus is also where the **hexahistidine tag of the expression vector sits**, so any construct placing a fusion element there has to account for both. The two models were then **superposed through their shared SpyTag/SpyCatcher interfaces in PyMOL** to give a model of the assembled complex.",
        ),
      ]),
      phase("Test", [
        p(
          "**Both predictions came back reliable.** **PPK2 adopts a fold comparable to the published free enzyme**, with the joining module **well structured rather than disordered** (Figure 21), and **DHAK likewise matches free DHAK**, with its own copy of the module equally well resolved (Figure 22). Where the previous round could not place the SpyCatcher at all, modelling it as part of the intact protein recovered both the module and the enzyme carrying it.",
        ),
        figure(
          "**Figure 21.** Boltz2 model of PPK2 carrying the complete SpyTag/SpyCatcher system at its N-terminus, attached through the SpyCatcher. The module is well structured and PPK2 adopts a fold comparable to the free enzyme.",
          "assets/engineering/revalorisation/image-15.webp",
        ),
        figure(
          "**Figure 22.** Boltz2 model of DHAK carrying the complete SpyTag/SpyCatcher system at its C-terminus, attached through the SpyTag.",
          "assets/engineering/revalorisation/image-16.webp",
        ),
        p(
          "Superposing the two through that interface gives a model of the **assembled DHAK–PPK2 complex** in which **both enzymes retain their folds** and the module joining them is ordered, with the two active sites held on the same face of the complex (Figure 23).",
        ),
        figure(
          "**Figure 23.** Model of the assembled DHAK–PPK2 complex, obtained by superposing the SpyTag/SpyCatcher interfaces of the two Boltz2 models in PyMOL. PPK2 in blue, DHAK in green, SpyTag/SpyCatcher in yellow.",
          "assets/engineering/revalorisation/image-17.webp",
        ),
      ]),
      phase("Learn", [
        p(
          "The iteration delivers a **viable fusion geometry**, which is the **minimum condition** for the construct to be worth building. The methodological result is worth recording in its own right because it **generalises beyond this system**: **a split protein has to be modelled whole even when it will be expressed in halves**, and a **failed half-model should not be read as a failed design**. That is a limitation of the prediction tools, not of the construct, and teams modelling SpyTag/SpyCatcher, split inteins or similar systems should expect it.",
        ),
        p(
          "One limit bounds what the model can be asked. The assembled complex is a **superposition of two independent predictions, not a prediction of the complex**, so the **relative orientation of the two enzymes is indicative rather than predicted**. Since channelling depends on how close the two active sites end up, that orientation is precisely what a future round would need to establish, and it calls for a prediction of the two chains together rather than two models joined by hand.",
        ),
        p(
          "**Nothing reached the bench.** The **reciprocal assignment** (SpyCatcher on DHAK, SpyTag on PPK2) was never designed, only part of the possible terminus placements was modelled, and **no fusion was expressed or assayed**. The design is left documented so that a future team can build the constructs, check **each fusion on its own** for expression, solubility and retained activity against its **unfused enzyme as control**, and only then compare the assembled complex with the **free enzyme mixture** in the coupled assay, which is **the control that actually tells whether joining the enzymes helps**.",
        ),
      ]),
    ],
  },
];
