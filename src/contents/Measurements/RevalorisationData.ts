import type { ExperimentData } from "../../components/LabFolders/types";

const FPLC: ExperimentData = {
  id: "fplc",
  tabLabel: "FPLC",
  title: "Fast protein liquid chromatography, size exclusion mode",
  body: [
    {
      paragraphs: [
        "Fast protein liquid chromatography was introduced by Pharmacia LKB in 1982 to make the resolving power of HPLC packings available for proteins and other biopolymers. It employs stationary phases of small and closely controlled particle diameter, which minimises the theoretical plate height and therefore maximises **resolution**, while operating them under conditions compatible with biological material: aqueous buffers, moderate back pressures and sample loads considerably higher than those tolerated by conventional HPLC columns [1]. For the purposes of this entry, however, a more elementary property of the technique is the decisive one. The output of a run is a single trace of absorbance against **elution volume**, and the selection of fractions must be made from that trace alone, before any other measurement of the sample is available. The analytical value of the technique is therefore determined by the criteria applied in reading it.",
        "In the **size exclusion** mode, also termed gel filtration, separation depends exclusively on molecular size. The matrix consists of porous beads, and the mobile phase occupies both the volume external to the beads and the volume within their pores. Molecules too large to enter the pores are eluted first, in the void volume (V₀); molecules small enough to access the entire pore volume are eluted last, at the **total volume** (Vₜ); and molecules within the **fractionation range** are eluted at an intermediate volume characteristic of their size [2]. This gives the trace a fixed coordinate system, since V₀ and Vₜ are properties of the packed column rather than of the sample and may be determined once with a high molecular mass marker such as Blue Dextran and a small molecule such as vitamin B₁₂ [2].",
        "Whether the material in a peak was in fact separated is then reported by its shape rather than its height: a species that partitions ideally leaves the column as a narrow, symmetric band returning to the baseline on both sides, whereas a broad peak, a shoulder without an apex, or two overlapping features indicate several species eluting together or protein retarded by residual charge on the matrix. The principal causes are properties of the run rather than of the protein: an excessive or insufficient flow rate, or a load exceeding 2 to 5% of the column volume [2, 3]. There is one limit on all of this: the number of peaks is not a measure of the number of species present. A single pure protein may elute as a double or shouldered peak depending on the resolving power of the resin [5], and several species may elute beneath one feature, recoverable only by deconvolution [3]. A chromatogram assigns material to elution volumes; it does not establish the identity of that material. Identity requires an independent determination on the collected fractions, and the agreement between the two is what demonstrates that the trace has been read correctly [4, 5, 6].",
      ],
    },
    {
      id: "section-fplc-application-to-our-sample",
      title: "Application to our sample",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The sample type in which this problem of interpretation arises most acutely is the clarified extract of a cell culture, in which the protein of interest is accompanied by the entire host proteome and by the whole small molecule content of the cytoplasm. On a size exclusion column such a mixture distributes over the coordinate system described above in a predictable manner: material too large to enter the pores elutes together at V₀, so the magnitude of the void peak is a direct measure of how far the preparation had **aggregated** before injection; the soluble proteins elute between V₀ and Vₜ, resolved only to the extent that their hydrodynamic sizes differ; and the small molecule fraction elutes at or close to Vₜ, absorbing strongly at 280 nm on account of its nucleotide content [2].",
            "This is what makes the reference volumes indispensable rather than merely convenient here. In a crude extract the most intense peak of the whole chromatogram is characteristically the one nearest Vₜ, and it is not protein: a peak of several hundred mAU at or beyond the total volume is small molecule material, while the protein of interest may appear as a few tens of mAU in the central region. Locating each peak relative to V₀ and Vₜ is the only way to tell them apart from the trace alone. The established solution to the limit of the trace is an independent determination on the collected fractions, as in the isolation of extracellular vesicles by size exclusion FPLC, where immunoblots for inclusion and exclusion markers confirmed that the markers partitioned in accordance with the elution volumes [6]; here that determination is enzymatic activity.",
            "The sample analysed is a clarified cell-free extract of *Escherichia coli* BL21(DE3) overexpressing DHAK from *Citrobacter freundii* bearing a histidine tag, obtained by enzymatic lysis followed by clarification and applied to the column in the crude state, without any preceding chromatographic step. DHAK is a cytoplasmic homodimeric **kinase** and therefore a soluble globular protein lying well within the fractionation range of a preparative matrix. The column is a Cytiva HiLoad 26/600 Superdex 200 pg, whose stated fractionation range for globular proteins extends from 1 × 10⁴ to 6 × 10⁵ Da [7], and the native mass of the DHAK dimer falls within it.",
            "The trace is read against three reference points: a total volume of approximately 320 mL, a **void volume** of approximately 110 mL, and an interval from approximately 220 to 270 mL within which a peak may correspond to DHAK. **All three are nominal and none was determined experimentally in this series.** The total volume is the geometric bed volume specified by the manufacturer, the void volume is the figure typical of a prepacked column of this matrix, and the interval follows from the fractionation range together with the expected native mass. No calibration run with Blue Dextran, vitamin B₁₂ or protein standards was performed, so the coordinate system is **nominal** in its entirety and every peak assignment in this entry is indicative rather than established.",
          ],
        },
      ],
    },
    {
      id: "section-fplc-application-to-our-project",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The revalorisation module requires DHAK in a preparation sufficiently clean for kinase activity to be measured without interference, rather than a homogeneous protein. The route applied to both enzymes of the module is **immobilised** metal affinity chromatography (IMAC) followed by dialysis, and for PPK2 it was successful at the first attempt. For DHAK it left unresolved a question the affinity step cannot answer, since a faint eluate is equally consistent with an enzyme that was never expressed and with an enzyme lost on the resin. Size exclusion chromatography was therefore adopted as an alternative route, used in place of IMAC and dialysis rather than after them. The grounds follow from the mechanism: separation depends on hydrodynamic size, a property the folded enzyme possesses irrespective of the state of its tag, and the procedure involves neither a metal-charged resin nor imidazole elution, so the enzyme is at no point exposed to either and is eluted directly in the running buffer, removing the need for dialysis before the activity assays [1, 2]. Ion exchange FPLC was not adopted, since it separates according to surface charge and would have required scouting buffers, pH values and gradients before a single informative run could be obtained [1, 4].",
            "The measurement reported here is consequently not confined to the **purification**. Its object is the **decision rule** itself: given a single UV trace, which fractions merit assay, and on what grounds. Three criteria were established in advance, each of which may fail independently of the others.",
            "**Position** — Every peak is located relative to the nominal V₀ (~110 mL) and Vₜ (~320 mL), and only a peak lying within 220 to 270 mL is admitted as a candidate for DHAK. Intensity is not a criterion, since in a crude extract the most intense peak is expected near Vₜ and is expected to be small molecule material.",
            "**Shape** — A candidate peak is accepted as resolved only if it is narrow and symmetric and returns to the baseline on both sides. A shoulder without a defined apex, a broad feature, or overlap with an adjacent peak indicates that the corresponding fractions cannot be assumed homogeneous [2].",
            "**Agreement with an independent determination** — The collected fractions are assayed by the **coupled** α-GDH/TIM method, which follows the formation of DHAP as a decrease in A₃₄₀. If the trace is being read correctly, activity must be detected in fractions taken from the protein region and must be absent from fractions taken at or beyond Vₜ [4, 6].",
            "The result expected of each run was a chromatogram with a small void peak, a narrow symmetric peak inside the DHAK interval and a late peak near Vₜ. The result expected of the series was that criteria 1 and 2 would predict criterion 3. It is that correspondence, rather than the purification itself, that would establish the method as transferable to other teams: if it holds, the trace may be used to select fractions before assay time is committed to them; if it fails, either the criteria are wrong or the enzyme does not survive the separation, and the activity data are what discriminate between the two.",
          ],
        },
      ],
    },
    {
      id: "section-fplc-technique-requirements",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Instrument, column, buffer and run parameters of the size exclusion separations.",
              headers: ["Parameter", "Value"],
              rows: [
                [
                  "Instrument",
                  "ÄKTAprime plus FPLC system with fraction collector and real-time monitoring (PrimeView)",
                ],
                [
                  "Separation mode",
                  "Size exclusion (gel filtration), isocratic",
                ],
                [
                  "Column",
                  "Cytiva HiLoad 26/600 Superdex 200 pg, preparative grade (product code 11390342); 26 × 600 mm, 320 mL bed, cross-linked agarose–dextran composite, 34 µm mean particle size",
                ],
                [
                  "Fractionation range (Mr)",
                  "Globular proteins 1 × 10⁴ to 6 × 10⁵",
                ],
                [
                  "Sample requirement",
                  "Clarified cell-free extract in the running buffer, centrifuged 5 min at maximum speed and filtered immediately before injection, applied as a narrow band well within the 13 mL maximum for this column",
                ],
                [
                  "Running buffer",
                  "50 mM sodium phosphate, 150 mM NaCl, pH 7.2, throughout the run and as sample buffer; 2 L per run, from a filtered ten-fold stock",
                ],
                [
                  "Equilibration",
                  "Overnight at 0.7 mL/min (7.9 cm/h), ~550–600 mL in some 14 h, more than the two column volumes required",
                ],
                [
                  "Flow rate",
                  "1 mL/min during the run (11.3 cm/h on a 26 mm bed); 0.6–0.7 mL/min for equilibration and post-run wash. Maximum for this column below 4.4 mL/min",
                ],
                ["Pressure limit", "0.5 MPa, the limit of the column hardware"],
                [
                  "Detection",
                  "UV absorbance at 280 nm, baseline zeroed by autozero once stable and before injection",
                ],
                [
                  "Fraction volume",
                  "1.5 mL into numbered tubes. Run 1: fractions 17–68. Run 2: 17–56. Run 4: 25–48. Run 3: collector started after the peak had eluted",
                ],
                [
                  "Reference volumes (nominal)",
                  "V₀ ≈ 110 mL, Vₜ ≈ 320 mL, DHAK window 220–270 mL. None determined on this column",
                ],
                [
                  "Calibration",
                  "None in this series. For a measured axis: Blue Dextran for V₀, vitamin B₁₂ for Vₜ, and protein standards spanning 10–600 kDa, plotting Vₑ against log Mr",
                ],
                [
                  "Sample load",
                  "Not recorded run by run. This should be recorded in any repetition, since the load governs band width and therefore the shape of every peak",
                ],
              ],
            },
          },
        },
        {
          paragraphs: [
            "Two operational points belong with the parameters above, since both cost us runs. The instrument initiates every run in pause mode, so the pause must be released after each start; and trapped air produces a noisy baseline and pressure irregularities, so the system is purged whenever the mobile phase is connected or disconnected, including when the buffer is connected for the overnight equilibration.",
          ],
        },
        {
          id: "section-fplc-sample-preparation",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "The sample is a clarified cell-free extract of *E. coli* BL21(DE3) overexpressing His-tagged DHAK from *C. freundii*.",
                "**Lysis and clarification.** Cells were harvested by centrifugation and resuspended in lysis buffer, the volume scaled to the wet biomass so that every preparation entered lysis at a comparable cell density. Lysis was enzymatic. This route avoids the local heating and shear of sonication, which matters in a preparation destined for immediate assay of a kinase. The lysate cleared on its own, so neither sonication nor streptomycin sulfate precipitation was needed. The extract was then clarified by centrifugation and kept on ice.",
                "**Three measures that the reading criteria require.** Each of these follows from how the chromatogram will be read, not from any property of the enzyme. Filter immediately before injection, since particulate matter accumulates at the top of the bed and impairs partitioning, and **peak shape** is uninterpretable without this step [2]. Keep the load within the column specification, since resolution depends on the sample reaching the bed as a narrow band and an overloaded column broadens every peak; where necessary the extract was concentrated by ultrafiltration rather than injected as a large dilute volume [2, 6]. And use the running buffer as the sample buffer, since any mismatch between the two disturbs the baseline against which peak shape is judged [1].",
                "**Injection.** Manual, through the valve and its loop. Immediately beforehand the preparation is centrifuged 5 min at maximum speed to remove any precipitate, its volume is checked against the loop volume, since anything above that is lost before it reaches the bed, and the baseline is zeroed with the autozero function once the UV signal has stabilised. The sample is then drawn into a syringe free of air, loaded with the valve in the load position, and the valve switched to inject.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-fplc-results",
      title: "Results",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "Four separations were performed on the same column and buffer, reported as runs 1 to 4 in the order carried out. For each one the three criteria were applied to the trace before the fractions were assayed, and the activity measured afterwards is what tests the reading. The reference volumes are the nominal V₀ (~110 mL) and Vₜ (~320 mL), with the DHAK window at 220–270 mL; none of the three was measured on this column, so every peak assignment below is indicative. The load was not recorded run by run, so the series contains no replicate in the strict sense: what is replicated across runs is the reading, not the separation.",
          ],
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Position and shape of every peak in the four size exclusion runs of the DHAK cell-free extract, with the fractions collected from each. The nominal reference volumes are V₀ ≈ 110 mL and Vₜ ≈ 320 mL, and the nominal DHAK window runs from 220 to 270 mL; none of the three was measured on this column.",
              headers: [
                "Run",
                "Void peak (near V₀)",
                "Peaks at or past Vₜ",
                "Peak inside the DHAK window",
                "Shape of that peak",
                "Maximum A₂₈₀ of the run",
                "Fractions collected",
              ],
              rows: [
                [
                  "1",
                  "Not detected",
                  "Broad, very low rise at 290 mL",
                  "None",
                  "Three faint shoulders, no apex",
                  "Below 7.5 mAU",
                  "17 to 68",
                ],
                [
                  "2",
                  "105 mL, 32 mAU",
                  "288 mL, 577 mAU; 330 mL, 147 mAU",
                  "Low and poorly defined",
                  "Broad, unresolved",
                  "577 mAU",
                  "17 to 56",
                ],
                [
                  "3",
                  "Not detected",
                  "None of note",
                  "Within 220 to 270 mL",
                  "Narrow, symmetric, baseline on both sides",
                  "51 mAU",
                  "None usable, collector started late",
                ],
                [
                  "4",
                  "110 mL, 202 mAU",
                  "290 mL, 825 mAU; 333 mL, 274 mAU",
                  "261 mL, 187 mAU",
                  "Broad, trailing edge overlapping the 290 mL peak",
                  "825 mAU",
                  "25 to 48",
                ],
              ],
            },
          },
        },
        {
          id: "section-fplc-run-1-an-empty-window-and-no-usable-fractions",
          title: "Run 1 — an empty window, and no usable fractions",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "The trace stays below 7.5 mAU throughout, so very little left the column at all, and the collected region contains no resolved feature [2]. The reading predicted that nothing usable would be recovered, and the three fractions assayed bore it out: fraction 27 gave −8.40 mOD/min with an acceptable R² of 0.957, but a rate two orders of magnitude below the extract applied; fractions 46 and 56 gave −1.51 (R² = 0.571) and −0.16 (R² = 0.035), both fits to noise rather than to a descending signal.",
              ],
            },
            {
              pairedResource: {
                kind: "image-group",
                images: [
                  {
                    src: "assets/measurements/fplc-full-chromatogram-of-run-1-showing.png",
                    alt: "Full chromatogram of run 1 showing a trace below 7.5 mAU",
                    title: "(A) Full chromatogram",
                  },
                  {
                    src: "assets/revalorisation-notion/results/image-13.png",
                    alt: "Enlargement of the collected region of run 1 showing three faint shoulders",
                    title: "(B) Collected region",
                  },
                ],
                caption:
                  "Run 1. (A) Full chromatogram (A₂₈₀ against elution volume, 0 to 306 mL); the whole trace stays below 7.5 mAU, and the only feature of any size is a broad, very low rise near 290 mL, past the DHAK window. (B) Enlargement of the collected region (fractions 17 to 68), covering the nominal DHAK window: three faint shoulders and no clear apex, which under criterion 2 denotes material eluting beneath the edge of another feature rather than partitioned in its own right.",
              },
            },
          ],
        },
        {
          id: "section-fplc-run-2-the-positive-case-and-the-run-that-validates-the-reading",
          title:
            "Run 2 — the positive case, and the run that validates the reading",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "This is the only run with appreciable absorbance in the protein region. Position excluded the two dominant peaks without any further measurement: at 288 and 330 mL they lie at and beyond Vₜ, where small molecules that fully penetrate the matrix elute, and no retained species can appear past the total volume [2]. The small void peak indicates that little of the sample had aggregated. Activity was then found in the protein region and nowhere else: fraction 46 gave −42.91 mOD/min (R² = 0.998), the steepest and cleanest trace of any size-exclusion fraction in the study, fraction 27 gave −16.64 (R² = 0.989), and fraction 56, taken from beyond Vₜ, was flat at −0.16 (R² = 0.035).",
                "The distribution matters as much as the rates, since it is exactly what is expected if the enzyme elutes where size exclusion predicts and the late peak is small molecule material. This is the scheme of validation applied to vesicle isolation by immunoblot [6], with catalytic activity as the independent determination here. Recovery was nonetheless modest: the extract applied gave −581.1 mOD/min from 5 µL, so even the best fraction accounts for a small proportion of the activity loaded.",
              ],
            },
            {
              pairedResource: {
                kind: "image-group",
                images: [
                  {
                    src: "assets/measurements/fplc-full-chromatogram-of-run-2-with.png",
                    alt: "Full chromatogram of run 2 with void peak at 105 mL and dominant peaks at 288 and 330 mL",
                    title: "(A) Full chromatogram",
                  },
                  {
                    src: "assets/measurements/fplc-enlargement-of-the-collected-region-of.png",
                    alt: "Enlargement of the collected region of run 2 showing a broad feature in the DHAK window",
                    title: "(B) Collected region",
                  },
                ],
                caption:
                  "Run 2. (A) Full chromatogram (0 to 395 mL); the void peak appears at 105 mL (32 mAU) and the two dominant peaks at 288 mL (577 mAU) and 330 mL (147 mAU), both at or past Vₜ and therefore small molecule material rather than protein. (B) Enlargement of the collected region (fractions 17 to 56): the feature inside the DHAK window is broad rather than narrow and symmetric, so the fractions taken from it cannot be assumed to contain a single species.",
              },
            },
          ],
        },
        {
          id: "section-fplc-run-3-the-best-separation-of-the-series-lost-to-the-collector",
          title:
            "Run 3 — the best separation of the series, lost to the collector",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Under criteria 1 and 2 this is the best result of the series, and it yielded no data at all. The failure is instructive rather than merely unfortunate, since it follows from the collection strategy adopted: collection was begun 15 to 20 min before the expected elution of the enzyme, which is the economical option but presupposes that the elution volume is known, and the interval used was the nominal one taken from the matrix specification. An uncalibrated interval does not support a timed start. The delay between detector and collector must be determined before the run rather than assumed [2]: a trace that can be read correctly is of no value if the fractions do not correspond to it.",
              ],
            },
            {
              pairedResource: {
                kind: "image-group",
                images: [
                  {
                    src: "assets/measurements/fplc-full-chromatogram-of-run-3-with.png",
                    alt: "Full chromatogram of run 3 with a well resolved peak inside the DHAK window",
                    title: "(A) Full chromatogram",
                  },
                  {
                    src: "assets/measurements/fplc-enlargement-of-run-3-showing-the.png",
                    alt: "Enlargement of run 3 showing the collection marks starting after the peak had eluted",
                    title: "(B) Collected region",
                  },
                ],
                caption:
                  "Run 3. (A) Full chromatogram (0 to 340 mL), the only run with a well resolved peak inside the nominal DHAK window, at a maximum absorbance of 51 mAU for the whole run. (B) Enlargement of the collected region: the peak is narrow and symmetric and returns to the baseline on both sides, but the collection marks show that the fraction collector was started after it had already left the system.",
              },
            },
          ],
        },
        {
          id: "section-fplc-run-4-an-intense-peak-that-shape-rejects",
          title: "Run 4 — an intense peak that shape rejects",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "The candidate at 261 mL sits correctly inside the window, but it is broad and its trailing edge overlaps the considerably larger peak behind it, so the fractions taken between them contain both species. The fraction assayed gave −11.12 mOD/min with R² = 0.566: a slope that is not small in magnitude but that cannot be interpreted as a rate. Here the predictive variable was the shape of the feature and not its absorbance. The void peak is considerably larger than in run 2, indicating that more of this sample had aggregated before injection.",
              ],
            },
            {
              pairedResource: {
                kind: "image-group",
                images: [
                  {
                    src: "assets/measurements/fplc-full-chromatogram-of-run-4-with.png",
                    alt: "Full chromatogram of run 4 with void peak at 110 mL and candidate peak at 261 mL",
                    title: "(A) Full chromatogram",
                  },
                  {
                    src: "assets/measurements/fplc-enlargement-of-run-4-showing-the.png",
                    alt: "Enlargement of run 4 showing the candidate peak overlapping the larger peak behind it",
                    title: "(B) Collected region",
                  },
                ],
                caption:
                  "Run 4. (A) Full chromatogram (0 to 414 mL), with the void peak at 110 mL (202 mAU), the candidate peak at 261 mL (187 mAU) and the dominant peaks at 290 mL (825 mAU) and 333 mL (274 mAU). (B) Enlargement of the collected region (fractions 25 to 48), showing the partial overlap between the candidate peak at 261 mL and the much larger peak behind it.",
              },
            },
          ],
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Activity of each assayed fraction against its position in the chromatogram and the shape of the feature it was taken from, measured by the coupled α-GDH/TIM assay as a fall in A₃₄₀ [9, 10]. An initial rate is accepted only where the linear fit is acceptable, so a steep slope with a poor R² is a fit to noise rather than a rate. The IMAC eluate is included as the eighth preparation assayed across the two purification routes.",
              headers: [
                "Preparation",
                "Fraction",
                "Region of the chromatogram",
                "Shape of the feature",
                "Initial rate (mOD/min)",
                "R²",
                "Verdict",
              ],
              rows: [
                [
                  "Crude extract, reference, 5 µL",
                  "Whole extract",
                  "Not applicable",
                  "Not applicable",
                  "−581.1",
                  "1.00",
                  "Active",
                ],
                [
                  "Run 1",
                  "27",
                  "DHAK window",
                  "Shoulder, unresolved",
                  "−8.40",
                  "0.957",
                  "Acceptable fit, but the rate lies two orders of magnitude below that of the applied extract; not usable",
                ],
                [
                  "Run 1",
                  "46",
                  "DHAK window",
                  "Shoulder, unresolved",
                  "−1.51",
                  "0.571",
                  "No rate obtainable; fit to noise",
                ],
                [
                  "Run 1",
                  "56",
                  "At or past Vₜ",
                  "Low rise near Vₜ",
                  "−0.16",
                  "0.035",
                  "No rate obtainable; fit to noise",
                ],
                [
                  "Run 2",
                  "46",
                  "DHAK window, protein region",
                  "Broad, unresolved",
                  "−42.91",
                  "0.998",
                  "Active; steepest and cleanest trace of any size-exclusion fraction in the study",
                ],
                [
                  "Run 2",
                  "27",
                  "DHAK window, protein region",
                  "Broad, unresolved",
                  "−16.64",
                  "0.989",
                  "Active",
                ],
                [
                  "Run 2",
                  "56",
                  "Past Vₜ",
                  "Large late peak",
                  "−0.16",
                  "0.035",
                  "No rate obtainable; fit to noise",
                ],
                [
                  "Run 3",
                  "None collected",
                  "Peak inside the window, not collected",
                  "Narrow, symmetric",
                  "Not measured",
                  "Not measured",
                  "No sample to assay",
                ],
                [
                  "Run 4",
                  "Collected peak",
                  "261 mL, DHAK window",
                  "Broad, overlapping",
                  "−11.12",
                  "0.566",
                  "No rate obtainable; fit inadequate",
                ],
                [
                  "IMAC eluate, dialysed",
                  "Whole eluate",
                  "Not applicable",
                  "Not applicable",
                  "−1.41",
                  "0.928",
                  "Clean fit, but the signal barely falls; no measurable activity",
                ],
              ],
            },
          },
        },
        {
          id: "section-fplc-what-the-series-establishes",
          title: "What the series establishes",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "The criteria held in all four runs, and it is this correspondence that we would offer to other teams as the transferable result of the work. Position excluded the most intense peaks of the series without a single assay, and fraction 56 of runs 1 and 2 confirmed it, giving −0.16 mOD/min with R² = 0.035 in both cases. That these volumes are nominal rather than measured does not weaken this particular inference, since the peaks concerned lie at or beyond the total volume by a margin far larger than the uncertainty of a bed volume taken from the geometry of the column; what it does weaken is the assignment of the 220 to 270 mL interval. Shape predicted which fractions merited assay independently of intensity, rejecting the faint shoulders of run 1 and the intense but overlapping peak of run 4. And agreement with the activity read-out held where it could be tested: the one run with a defined feature in the protein region gave the only two active fractions of the study, there and nowhere else.",
                "The criterion is conservative in one direction only. A broad or shouldered feature establishes that the fractions cannot be assumed homogeneous, but it establishes nothing about the number of species present, since a single pure protein may itself elute as a shouldered peak under conditions that do not resolve its forms [5], and the profiles of species that do co-elute are recoverable only by deconvolution [3].",
                "It is worth separating two things the word validation covers, because this entry does one and not the other. Calibrating the column with mass standards validates the axis: it converts an elution volume into a molecular mass. Assaying the collected fractions validates the inference: it tests whether the material assigned to a position is in fact what the assignment claims. This series validates the inference and does not calibrate the axis. The criteria were stated before the fractions were measured and the activity agreed with them in every run, which is the stronger of the two tests, since a calibrated axis with no determination on the fractions would establish where a protein of that mass should elute without establishing that the protein eluting there was the enzyme.",
                "Against the expected outcome, the separation itself did not reproduce, and this is the informative part of the result. Two of the eight purified preparations assayed across both routes were active, and both came from a single run. In the three runs with appreciable absorbance most of the signal elutes at or beyond Vₜ, the profile of a crude extract dominated by nucleotides and metabolites and consistent with the application of an unfractionated lysate. What the chromatograms demonstrate is a separation that did not reproduce rather than an enzyme that was absent, and the activity data settle that question, since the enzyme was strongly active in the extract and in the fractions of run 2. Returning to IMAC with the same active stock gave −1.41 mOD/min (R² = 0.928), so the difficulty is attributable not to either method in particular but to the survival of this enzyme through purification.",
              ],
            },
          ],
        },
        {
          callouts: [
            {
              kind: "learn",
              text: "**One objection should be met directly:** a method for reading chromatograms is here supported by a series in which the separation seldom worked — one run almost empty, one broad and unresolved, one lost to a mistimed collector and one overlapping much larger material. That is precisely what makes the series informative. A decision rule is tested by whether it predicts the outcome of the measurement, not by whether the measurement succeeds, and in all four runs it did. A series of four clean separations would have confirmed the criteria far more weakly, since nothing in it would have been at risk of failing.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "not-done",
              text: "**For a team repeating the measurement, the modifications we would introduce follow from the criteria that failed.** **Calibrate the column**, since a single run with Blue Dextran, vitamin B₁₂ and protein standards would convert V₀, Vₜ and the DHAK interval from nominal figures into measured values [1, 2]. Fix the load, injecting a smaller, more concentrated volume well within the 13 mL recommended for this 320 mL column [2]. Maintain and verify the flow rate between runs, since resolution deteriorates if it drifts in either direction [3]. Reduce the small molecule background by desalting or a partial purification before the column [1]. And set the collector against the measured delay between detector and collector before starting, verifying the first fraction against the trace.",
            },
          ],
        },
      ],
    },
  ],
  references: [
    "[1] Sheehan D. Fast protein liquid chromatography (FPLC) methods. In: Humana Press eBooks; 2003. p. 269-76. Available from: https://doi.org/10.1385/0-89603-336-8:269",
    "[2] Cutler P. Size-exclusion chromatography. In: Doonan S, editor. Protein purification protocols. Methods in Molecular Biology, vol. 59. Totowa (NJ): Humana Press; 1996. p. 255-67.",
    "[3] Brestrich N, Hahn T, Hubbuch J. Application of spectral deconvolution and inverse mechanistic modelling as a tool for root cause investigation in protein chromatography. Journal of Chromatography A. 2016;1437:158-67. Available from: https://doi.org/10.1016/j.chroma.2016.02.011",
    "[4] Kastner M, Schulz T. Ion-exchange fast protein liquid chromatography; optimization of the purification of cytochrome P-450 from marmoset monkeys. Journal of Chromatography A. 1987;397:153-63. Available from: https://doi.org/10.1016/s0021-9673(01)84998-0",
    "[5] Luo H, Cao M, Newell K, Afdahl C, Wang J, Wang WK, et al. Double-peak elution profile of a monoclonal antibody in cation exchange chromatography is caused by histidine-protonation-based charge variants. Journal of Chromatography A. 2015;1424:92-101. Available from: https://doi.org/10.1016/j.chroma.2015.11.008",
    "[6] Kapoor KS, Harris K, Arian KA, Ma L, Zancanela BS, Church KA, et al. High throughput and rapid isolation of extracellular vesicles and exosomes with purity using size exclusion liquid chromatography. Bioactive Materials. 2024;40:683-95. Available from: https://doi.org/10.1016/j.bioactmat.2024.08.002",
    "[7] Cytiva. HiLoad 26/600 Superdex 200 pg, product code 11390342 [product specification]. Fisher Scientific. Available from: https://www.fishersci.es/shop/products/hiload-26-600-superdex-200-pg-1/11390342",
    "[8] Siebold C, Arnold I, Garcia-Alles LF, Baumann U, Erni B. Crystal structure of the Citrobacter freundii dihydroxyacetone kinase reveals an eight-stranded α-helical barrel ATP-binding domain. Journal of Biological Chemistry. 2003;278(48):48236-44. Available from: https://doi.org/10.1074/jbc.m305942200",
    "[9] García-Junceda E, García-García JF, Bastida A, Fernández-Mayoralas A. Enzymes in the synthesis of bioactive compounds. Bioorganic & Medicinal Chemistry. 2004;12(8):1817-34. Available from: https://doi.org/10.1016/j.bmc.2004.01.032",
    "[10] Gauss D, Sánchez-Moreno I, Oroz-Guinea I, García-Junceda E, Wohlgemuth R. Phosphorylation catalyzed by dihydroxyacetone kinase. European Journal of Organic Chemistry. 2018;2018(23):2892-5. Available from: https://doi.org/10.1002/ejoc.201800350",
  ],
};

const DHAK_ACTIVITY_ASSAY: ExperimentData = {
  id: "dhak-activity-assay",
  tabLabel: "Coupled α-GDH/TIM assay",
  title:
    "Coupled α-GDH/TIM spectrophotometric assay, NADH-linked kinase activity",
  body: [
    {
      paragraphs: [
        "The **coupled** α-GDH/TIM assay is an enzyme-linked spectrophotometric method for measuring the activity of enzymes that produce dihydroxyacetone phosphate (DHAP). Its principle is indirect detection. DHAP carries no chromophore and has no useful absorbance of its own, so it cannot be followed directly; it is reported instead through two auxiliary enzymes that convert it into a change in the concentration of a species that does absorb. α-glycerophosphate dehydrogenase (α-GDH) reduces DHAP to glycerol 3-phosphate while oxidising NADH to NAD⁺, and triosephosphate isomerase (TIM) interconverts the two triose phosphates so that any D-glyceraldehyde 3-phosphate present is funnelled into the same readout rather than escaping it [1, 2].",
        "What makes the method quantitative rather than merely indicative is the stoichiometry of the reporter step: α-GDH consumes exactly one NADH per DHAP, and NADH absorbs strongly at 340 nm while NAD⁺ does not, so the fall in absorbance at 340 nm is stoichiometric with the DHAP formed. The molar **extinction coefficient** of NADH, ε₃₄₀ = 6220 M⁻¹ cm⁻¹, converts an absorbance change into an absolute amount of product, so the calibration rests on a physical constant rather than on an internal standard of our own [1, 3], which is what allows a rate obtained here to be set against the published activity of the same enzyme. One condition has to be engineered rather than assumed: the auxiliary enzymes must be supplied in sufficient excess that the reporter step is never rate limiting, since otherwise the measured slope reports the coupling system instead of the **kinase** [4].",
        "The assay is used in two modes, and that both share the same chemistry is a deliberate design decision rather than a convenience. In **continuous** mode the absorbance is recorded kinetically and the **initial rate** is taken from the linear portion of the trace, which is what distinguishes a catalytically competent enzyme from one that is present but does not work. In endpoint mode the same chemistry is applied to stopped aliquots of a reaction that has run for hours, and what is obtained is not a slope but a concentration. Because the two modes share the reporter chemistry, the wavelength and the extinction coefficient, a rate measured on a single enzyme and a yield measured on a cascade are expressed in the same units. The cost should be stated alongside the benefit: the entire characterisation of the module depends on one reporter system behaving correctly, so the **controls** that establish it are part of the measurement rather than an optional extra. One consequence governs the endpoint mode in particular. Since one NADH is consumed per DHAP, the NADH placed in the well imposes a ceiling on the product that can be detected, and the dilution applied to the aliquot is what positions that ceiling. A ceiling below the threshold an experiment must exceed renders a saturated reading uninformative, however large the signal looks.",
      ],
    },
    {
      id: "section-dhak-activity-assay-application-to-our-sample",
      title: "Application to our sample",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "Two distinct sample types are measured here, and they place different demands on the assay. The first is a soluble protein preparation of a kinase, whether a clarified cell-free extract or an enzyme purified by affinity or **size exclusion** chromatography; it is measured in continuous mode and what is read is a rate. For these the method is undemanding, which is one reason it was chosen: it works directly on the sample with no labelling, derivatisation or clean-up. Two points nevertheless decide whether the number obtained is usable. The sample is kept cold until it is added, since what is being measured is the activity of a protein that loses it on standing. And the volume added is titrated so that the slope is measurable but not too steep: a very steep fall exhausts the NADH within the first readings and leaves no linear region to fit, while a very shallow one cannot be distinguished from baseline drift [5]. In this work the volume ranged from about 1 to about 7 µL, and it is reported with every rate, since a **volumetric activity** is meaningless without it.",
            "A clarified cell-free extract raises one consideration a purified enzyme does not: it contains the whole soluble proteome of the host, which may include enzymes that oxidise NADH on their own account, and any such activity is indistinguishable from the signal of interest once the reaction has started. The test is performed before the substrate is added — if A₃₄₀ is stable in the complete mixture lacking only dihydroxyacetone, the extract carries no appreciable NADH-consuming activity.",
            "The second sample type is an aliquot of a multienzyme reaction that has been running for hours and has been stopped; it is measured in **endpoint** mode and what is read is a concentration. The aliquot carries a high concentration of substrate and product, so the dilution applied to it is the parameter that decides whether the determination lies within its **linear range** or above its ceiling. The analyte is also labile, which is why aliquots are frozen at the moment of sampling and all of them measured together in a single determination, against the same standards and the same NADH. Our specific samples are the DHAK variants of *Citrobacter freundii* available to the module, as cell-free extracts and as purified preparations, and the aliquots of the coupled DHAK and PPK2 reaction.",
          ],
        },
      ],
    },
    {
      id: "section-dhak-activity-assay-application-to-our-project",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The revalorisation module converts dihydroxyacetone into dihydroxyacetone phosphate with purified enzymes rather than living cells, and its central claim is that ATP regenerated from **polyphosphate** can drive that phosphorylation. Nothing about the sequences, the structures or the designs settles whether that is true. Only a measurement does, and the measurement has to report the product of a kinase that carries no absorbance of its own, in real time and in absolute units, so that a rate obtained here means the same thing as a rate obtained in another laboratory. The whole characterisation of the module was therefore built around this single assay, applied first to each enzyme preparation on its own and then to the coupled cascade.",
            "The alternatives were considered and rejected for reasons specific to this product and this reaction. A **discontinuous** quantification of DHAP by HPLC would also work, but it is slower, of lower throughput and gives no real-time information about whether the reaction is linear while it is being measured. **Colorimetric** phosphate assays report the release of ADP or of inorganic phosphate rather than the product of interest, and in a reaction containing millimolar polyphosphate, which hydrolyses to release phosphate on its own account, such a readout would be uninterpretable. The NADH-linked assay instead reports DHAP formation directly, converts to absolute units through a single known constant, and uses reagents already available in the host laboratory.",
            "The objective within the module is twofold, and the two purposes correspond to the two modes. For a single enzyme, the assay establishes whether a given variant or preparation is catalytically active and fixes a baseline rate against which the others are judged. This is what separates an enzyme that expressed from an enzyme that works, and it is the only evidence that can rank a designed variant against the **wild type**. For the coupled system, it reports how much DHAP the two-enzyme reaction has accumulated over hours, which, compared against the ATP supplied at the start, is what tells us whether polyphosphate-driven **regeneration** allows the cascade to produce more product than its initial nucleotide could support.",
            "The single-enzyme measurements were not planned as a comparison of variants decided in advance. They form a diagnostic chain, in which the preparation measured at each point was chosen by what the previous measurement had ruled out, and in which each result forced a decision documented in Engineering. This is why they are reported below in the order in which they were run rather than grouped by variant: the order is the argument.",
            "The results expected were specific and were stated before the measurements were made. For an active preparation, a clear and linear fall in A₃₄₀ with a high R², convertible into a rate in nmol DHAP per minute and, with a protein quantification, into a **specific activity** comparable with the 10.7 U/mg reported for the fully purified enzyme [5]. For an inactive or absent enzyme, a flat trace whose fitted slope has an R² low enough to show that the fit is to noise rather than to a descending signal. For the coupled reaction, a ratio of DHAP formed to ATP supplied above unity, which is the proof of concept for regeneration.",
          ],
        },
      ],
    },
    {
      id: "section-dhak-activity-assay-technique-requirements",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Instrument, reaction composition, controls and acceptance criteria of the coupled α-GDH/TIM assay in its two modes.",
              headers: ["Parameter", "Value"],
              rows: [
                [
                  "Instrument",
                  "Microplate reader or spectrophotometer able to record kinetic absorbance at 340 nm with an initial-rate (Vmax) analysis of the type produced by SoftMax Pro",
                ],
                [
                  "Modes",
                  "Continuous, for a single enzyme: kinetic read, initial rate fitted over the linear region. Endpoint, for the coupled reaction: two readings per vessel, before and after addition of the coupling enzymes, the second once the signal has stopped falling",
                ],
                [
                  "Wavelength and optical path",
                  "340 nm; 1 cm in a 1 mL cuvette. In a microplate the path is set by the fill volume and is not 1 cm, so absolute rates require the real path length or an NADH standard curve",
                ],
                [
                  "Reaction, continuous mode",
                  "50 mM potassium phosphate pH 7.5 at 25 °C, with approximately 5 mM ATP, 5 mM MgCl₂, 2.5 mM dihydroxyacetone and 0.2 mM NADH in about 1 mL",
                ],
                [
                  "Coupling enzymes",
                  "α-GDH at approximately 1.3 U/mL and TIM at approximately 13 U/mL, in excess so that the reporter step never limits the measured rate",
                ],
                [
                  "Set-up control",
                  "Starting absorbance A₃₄₀ ≈ 1.25, which corresponds to 0.2 mM NADH over a 1 cm path, read before the enzyme is added",
                ],
                [
                  "Background control",
                  "A no-enzyme control run in each session and subtracted; for cell-free extracts, the baseline is also checked before the substrate is added, to exclude NADH-consuming activity in the sample",
                ],
                [
                  "Fitting window",
                  "The points used for the linear fit, for example 41 to 121 points over 300 to 450 s. The window is part of the result and must be reported",
                ],
                [
                  "Acceptance criterion",
                  "A rate is accepted only where the linear fit is acceptable; a steep slope with a poor R² is reported as a fit to noise and no rate is assigned",
                ],
                [
                  "Extinction coefficient",
                  "ε₃₄₀ = 6220 M⁻¹ cm⁻¹ for NADH, used with the real optical path to convert the rate of absorbance change into an absolute rate of product formation",
                ],
                [
                  "Volume of preparation assayed",
                  "Titrated so that the slope is measurable but not too steep; from about 1 to about 7 µL in this work, and reported with every rate",
                ],
                [
                  "Endpoint determination",
                  "0.30 mM NADH per well, prepared fresh and kept on ice in the dark. DHAP standards at 0, 25 and 50 mM, also fresh; calibration DHAP (mM) = 58.521·ΔA₃₄₀ − 1.4123, R² ≈ 0.999 in round 2. Dilution of the aliquot: 1:4 in round 1, giving a ceiling of 1.2 mM DHAP in reaction terms; a much smaller aliquot in round 2, giving a ceiling above 50 mM",
                ],
                [
                  "Protein quantification",
                  "Bradford against a bovine serum albumin standard curve (y = 0.319 + 0.020x, R² = 0.994), read at 595 nm, with two loads per preparation",
                ],
                [
                  "Sample requirement",
                  "A clear, bubble-free liquid read against a buffer blank, kept cold until use. Imidazole and salt removed by dialysis where the preparation comes from an affinity eluate, since both interfere with the determination",
                ],
              ],
            },
          },
        },
        {
          paragraphs: [
            "Two of these deserve emphasis because they are the ones most often left out. The **optical path** is not 1 cm in a microplate, where it is set by the fill volume, so a rate converted to absolute units by assuming a cuvette path is wrong by the ratio between the two. And the **fitting window** is part of the result: the same trace yields different **initial rates** according to the points over which the line is fitted, so a rate reported without its window cannot be reproduced exactly.",
          ],
        },
        {
          id: "section-dhak-activity-assay-sample-preparation",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "The preparations measured were produced by the routes described in the expression and **purification** blocks, and are listed here because the identity of the preparation is part of the measurement: the same enzyme gives different numbers as a crude extract, as an affinity eluate and as a concentrated eluate, and those differences are the subject of the analysis below.",
                "**Preparations measured in continuous mode.** Clarified cell-free extract: cells harvested by centrifugation, resuspended in lysis buffer scaled to the wet biomass, lysed enzymatically, clarified by centrifugation and kept on ice. Two batches of the CECT 4626 2012 stock were measured, and the extract of the 2021 stock was measured directly without purification, because activity reports on functional enzyme whether or not a band is visible on a gel. Dialysed affinity eluate: IMAC followed by dialysis against the assay buffer, which removes the imidazole and salt that would otherwise interfere with the determination. Dialysed affinity eluate concentrated by centrifugal ultrafiltration: the same route followed by concentration in a Centricon device. Size exclusion fractions: individual fractions from the preparative runs, assayed without further treatment since they elute in the running buffer.",
                "**Protein quantification.** Specific activity requires a protein concentration, determined by the Bradford method against a BSA **standard curve** [6]. Two sample volumes were loaded for each preparation, which is what revealed that the determination was not always trustworthy: for the crude extract and for the first PPK2 preparation the readings sat just above the assay blank and the two loads disagreed by about fourfold. Where the two volumes did not agree, no specific activity was assigned and the activity is reported in volumetric terms only, since a specific activity derived from an unreliable protein figure would carry that error silently.",
                "**Aliquots of the coupled reaction.** Aliquots were withdrawn at the times reported and frozen immediately in order to stop them, then measured together in a single endpoint determination against DHAP standards prepared fresh and kept on ice. The dilution applied to each aliquot was the parameter that changed between the two rounds, and it is reported with each of them because it fixes the **detection ceiling**.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-dhak-activity-assay-results",
      title: "Results",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The measurements are reported in the order in which they were made. The assay did what the module required of it: it separated an active enzyme from an inactive one unambiguously, on the same scale and in the same session, and expressed the difference as an absolute rate of product formation rather than as a relative signal.",
          ],
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Activity of every DHAK preparation measured in continuous mode, in the order in which the measurements were made. Every rate is negative because what the assay measures is a fall in A₃₄₀. Volumetric activity (U/mL) is referred to the volume assayed, and specific activity (U/mg) is given only where the protein quantification was reliable. nr denotes not recorded and nd not determined.",
              headers: [
                "Preparation",
                "Volume assayed",
                "Initial rate (mOD/min)",
                "R²",
                "DHAP rate (nmol/min)",
                "U/mL",
                "U/mg",
                "Verdict",
              ],
              rows: [
                [
                  "DHAK wild type, DSM 30040, after purification",
                  "nr",
                  "−3.73",
                  "0.991",
                  "0.60",
                  "nd",
                  "nd",
                  "Weakly active; clean fit but far shallower than any CECT 4626 preparation",
                ],
                [
                  "DHAK PROSS design 5, IMAC and dialysis",
                  "nr",
                  "−0.92",
                  "0.374",
                  "nd",
                  "nd",
                  "nd",
                  "No measurable activity; fit to noise",
                ],
                [
                  "DHAK CECT 4626, 2021 stock, cell-free extract",
                  "nr",
                  "−0.080",
                  "0.035",
                  "nd",
                  "nd",
                  "nd",
                  "No measurable activity; agrees with the absent band on the expression gel",
                ],
                [
                  "DHAK CECT 4626, 2012 stock, cell-free extract, first batch",
                  "5 µL",
                  "−581.1",
                  "1.00",
                  "93.4",
                  "~18.7",
                  "nd",
                  "Steepest trace of the study; selected as the reference enzyme. No specific activity assigned, since the Bradford was unreliable",
                ],
                [
                  "DHAK CECT 4626, 2012 stock, cell-free extract, working batch",
                  "5 µL",
                  "−198.5",
                  "1.00",
                  "31.9",
                  "~6.4",
                  "nd",
                  "Solidly active; stable baseline before substrate addition",
                ],
                [
                  "DHAK CECT 4626, 2012 stock, dialysed IMAC eluate",
                  "nr",
                  "−1.41",
                  "0.928",
                  "nd",
                  "nd",
                  "nd",
                  "Clean fit but the signal barely falls; no measurable activity",
                ],
                [
                  "DHAK CECT 4626, 2012 stock, dialysed IMAC eluate concentrated by Centricon",
                  "~7 µL",
                  "−850.1",
                  "0.999",
                  "136.7",
                  "~20",
                  "~10",
                  "Active purified preparation; about 3 U taken into the coupled assay",
                ],
              ],
            },
          },
        },
        {
          paragraphs: [
            "In every trace below, the two vertical lines mark the window over which the initial rate was fitted, and the number of points used is stated on the figure, so that the fit can be reproduced and not merely the result. The sample names printed on the figures are the labels carried over from the plate layout of each session and are not descriptions of the samples. The vertical scale differs between figures, since what is being compared is the slope and not the absolute absorbance.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/dhak-activity-assay-absorbance-trace-of-dhak-wild-type.png",
            alt: "Absorbance trace of DHAK wild type DSM 30040 after purification",
            caption:
              "DHAK wild type of *C. freundii* DSM 30040, the reference variant ordered from the PDB 1UN9 sequence, after purification. The fall in A₃₄₀ gives an initial rate of −3.73 mOD/min (R² = 0.991), about 0.60 nmol DHAP/min. The fit is clean, so the shallow slope reflects a weakly active enzyme rather than a failed measurement.",
          },
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/dhak-activity-assay-flat-absorbance-trace-of-dhak-pross.png",
            alt: "Flat absorbance trace of DHAK PROSS design 5 after purification and dialysis",
            caption:
              "DHAK PROSS design 5, after affinity purification and dialysis. A₃₄₀ stays essentially flat and the fitted slope of −0.92 mOD/min has R² = 0.374, so the line describes noise and no rate can be extracted.",
          },
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/dhak-activity-assay-flat-absorbance-trace-of-the-cect.png",
            alt: "Flat absorbance trace of the CECT 4626 2021 stock cell-free extract",
            caption:
              "DHAK CECT 4626, 2021 stock, assayed directly as cell-free extract. The trace is flat, with a fitted slope of −0.080 mOD/min and R² = 0.035: no measurable activity, in agreement with the absence of a band for this stock on the expression gel.",
          },
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/dhak-activity-assay-steep-absorbance-trace-of-the-cect.png",
            alt: "Steep absorbance trace of the CECT 4626 2012 stock cell-free extract, first batch",
            caption:
              "DHAK CECT 4626, 2012 stock, cell-free extract, first batch, with 5 µL assayed. Steepest trace of the study: −581.1 mOD/min (R² = 1.00), about 93.4 nmol DHAP/min and ~18.7 U/mL. This is the preparation selected as the reference enzyme for the rest of the module.",
          },
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/dhak-activity-assay-absorbance-trace-of-the-cect-4626.png",
            alt: "Absorbance trace of the CECT 4626 2012 stock working cell-free extract",
            caption:
              "DHAK CECT 4626, 2012 stock, working cell-free extract, re-expressed after the first purification attempts and used in round 1 of the coupled assay, with 5 µL assayed. −198.5 mOD/min (R² = 1.00), about 31.9 nmol DHAP/min and ~6.4 U/mL. The difference from the first batch is ordinary batch-to-batch variation in expression.",
          },
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/dhak-activity-assay-steep-absorbance-trace-of-the-dialysed.png",
            alt: "Steep absorbance trace of the dialysed IMAC eluate concentrated by Centricon",
            caption:
              "Dialysed affinity eluate of the CECT 4626 2012 stock concentrated by centrifugal ultrafiltration, with about 7 µL assayed. −850.1 mOD/min (R² = 0.999), about 20 U/mL and, against 1.990 mg/mL of protein, about 10 U/mg. This is the active purified preparation, and about 3 U of it were taken into round 2 of the coupled assay.",
          },
        },
        {
          id: "section-dhak-activity-assay-what-the-continuous-mode-established",
          title: "What the continuous mode established",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "The discrimination is not marginal. The active cell-free extract fell at −581.1 mOD/min with R² = 1.00, while the DSM 30040 reference fell at −3.73 and the 2021 stock and PROSS design 5 gave fitted slopes of −0.080 and −0.92 with R² of 0.035 and 0.374. Those two low R² values are themselves the result and not a defect of the measurement: a slope fitted to a flat trace describes noise, and reporting it as a rate would be an error, which is why no rate is assigned in those rows.",
                "The purified preparation is the measurement that completes the line. At −850.1 mOD/min with R² = 0.999, about 20 U/mL and, against a reliable protein determination, about 10 U/mg, it sits essentially at the 10.7 U/mg reported for the fully purified enzyme [5], which means the affinity step followed by concentration delivered DHAK at close to its maximum specific activity. It is also what allowed the coupled reaction to be charged with a known quantity of enzyme, 3 U, rather than with a volume of extract.",
                "Read as a chain rather than as a list, these measurements decided the course of the module. The reference variant proved too weakly active to serve as a **control**, which removed the comparison the stabilisation line had been built around. The designed variant was therefore measured without a working counterpart of the same sequence background, and this is where the assay reaches its limit: a flat trace establishes that a preparation has no measurable activity, but it cannot distinguish an enzyme inactivated by the purification from a design that abolished function. Discriminating between those two requires an active enzyme of the same background taken through exactly the same procedure, and no such reference existed at that point. The measurement is conclusive about the preparation and silent about the design.",
              ],
            },
          ],
        },
        {
          id: "section-dhak-activity-assay-where-the-determination-was-not-trustworthy",
          title: "Where the determination was not trustworthy",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Two of the Bradford determinations are unusable, and they are reported rather than quietly dropped because the conclusion depends on them. For the crude extract the two loads gave 1.35 and 0.37 mg/mL, both sitting just above the standard curve intercept of 0.319, that is, at the lower limit of the method; for the first PPK2 preparation they gave 4.83 and 1.26 mg/mL. Values that should coincide for the same preparation and instead differ about fourfold do not become acceptable by averaging them, so no specific activity was assigned to the crude extract, and the PPK2 supplied in round 1 is quoted as an interval rather than as a figure. The one preparation with a clean protein determination is the one that carries a specific activity, and it is the only one compared against the published value.",
              ],
            },
            {
              pairedResource: {
                kind: "table",
                table: {
                  caption:
                    "Protein quantification by the Bradford assay against a BSA standard curve (y = 0.319 + 0.020x). Two loads were measured wherever possible; a determination was accepted only when the two agreed.",
                  headers: [
                    "Preparation",
                    "Load",
                    "A₅₉₅ (mean)",
                    "Protein (mg/mL)",
                    "Standard curve R²",
                    "Usable",
                  ],
                  rows: [
                    [
                      "DHAK crude extract",
                      "1 µL",
                      "0.345",
                      "1.35",
                      "0.994",
                      "No; the two loads differ about fourfold",
                    ],
                    [
                      "DHAK crude extract",
                      "5 µL",
                      "0.355",
                      "0.37",
                      "0.994",
                      "No",
                    ],
                    [
                      "DHAK purified, IMAC and Centricon",
                      "2 µL",
                      "0.269",
                      "1.990",
                      "0.994",
                      "Yes; gives ~10 U/mg",
                    ],
                    [
                      "PPK2, first production",
                      "1 µL",
                      "0.414",
                      "4.83",
                      "0.994",
                      "No; bounded to roughly 1 to 5 mg/mL",
                    ],
                    [
                      "PPK2, first production",
                      "5 µL",
                      "0.443",
                      "1.26",
                      "0.994",
                      "No",
                    ],
                    [
                      "PPK2, second production",
                      "2 µL",
                      "0.351",
                      "1.331",
                      "0.994",
                      "Yes; gives ~2.2 U/mL at the reference specific activity",
                    ],
                  ],
                },
              },
            },
            {
              paragraphs: [
                "A second limit of the same kind applies to the calibration of the assay itself. The conversion to absolute units rests on the published extinction coefficient of NADH rather than on a standard curve measured on our own instrument, which is sound for a cuvette of known **path length** but less so in a microplate, where the path is set by the fill volume. The continuous assays reported here were made in a 1 cm cuvette, so the constant applies directly; a local NADH standard curve would nevertheless make the conversion independent of that assumption.",
              ],
            },
          ],
        },
        {
          id: "section-dhak-activity-assay-endpoint-mode-round-1-dhak-as-cell-free-extract",
          title: "Endpoint mode, round 1: DHAK as cell-free extract",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Round 1 was run with about 3 U of DHAK as cell-free extract and purified PPK2, with 50 mM dihydroxyacetone, 1.7 mM ATP and polyphosphate at 45 or 90 mM chains, equivalent to 540 and 1080 mM of transferable phosphate, sampled at 90 and 180 min. The activity of the PPK2 preparation could not be measured in house, because the phosphorylation of ADP to ATP is not read by this assay; combining the Bradford protein with the 2 U/mg reported for this enzyme by the host laboratory [7] places the PPK2 supplied at roughly 2.5 to 9.7 U/mL, the width of the interval reflecting the unreliable Bradford above. With 0.30 mM NADH in the well and a 1:4 dilution of the aliquot, the detection ceiling corresponds to 1.2 mM DHAP in the reaction.",
              ],
            },
            {
              pairedResource: {
                kind: "table",
                table: {
                  caption:
                    "Endpoint determination of round 1, with DHAK as cell-free extract. Every reaction sample reached the same reading as the single standard that developed, which is the ceiling of the determination and not a measurement of the sample. The 25 mM standard failed, so no calibration curve could be constructed.",
                  headers: [
                    "Sample",
                    "A₃₄₀ before",
                    "A₃₄₀ after",
                    "ΔA₃₄₀",
                    "Reading",
                  ],
                  rows: [
                    [
                      "DHAP 50 mM standard",
                      "1.254",
                      "0.236",
                      "1.018",
                      "The only standard that developed",
                    ],
                    [
                      "R1, 45 mM polyP chains, 90 min",
                      "1.105",
                      "0.151",
                      "0.954",
                      "At the ceiling",
                    ],
                    [
                      "R1, 45 mM polyP chains, 180 min",
                      "1.170",
                      "0.087",
                      "1.083",
                      "At the ceiling",
                    ],
                    [
                      "R2, 90 mM polyP chains, 90 min",
                      "1.166",
                      "0.193",
                      "0.973",
                      "At the ceiling",
                    ],
                    [
                      "R2, 90 mM polyP chains, 180 min",
                      "1.205",
                      "0.148",
                      "1.057",
                      "At the ceiling",
                    ],
                  ],
                },
              },
            },
            {
              paragraphs: [
                "Round 1 could not answer the question, and the reason lies in the determination rather than in the biology. Every sample drove the assay to complete consumption of the NADH and every reading matched the single standard that developed, so the values above are nearly identical to one another not because the samples contained the same amount of product but because they all exhausted the same amount of NADH. A saturated endpoint is a lower bound, and whether that bound answers the question depends on where it sits relative to the threshold the experiment must exceed. With the NADH supplied and the fourfold dilution used, the ceiling fell at 1.2 mM, below the 1.7 mM ATP, so saturation established only that DHAP had reached at least 1.2 mM, which the initial ATP alone could have produced. Had the ceiling been placed just above the ATP, as intended, the same readings would have constituted proof of regeneration. What round 1 does establish is that DHAP is formed in every condition and at both sampling times, so the coupled system runs.",
              ],
            },
          ],
        },
        {
          id: "section-dhak-activity-assay-endpoint-mode-round-2-both-enzymes-purified",
          title: "Endpoint mode, round 2: both enzymes purified",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Round 2 was run with both enzymes purified, 3 U of DHAK and 0.63 U of PPK2, the same 50 mM dihydroxyacetone and 1.7 mM ATP, and polyphosphate fed in seven additions over the first hour to a final 16.9 mM chains (R1) and 50.4 mM chains (R2), equivalent to 202.8 and 604.8 mM of transferable phosphate. A much smaller aliquot was taken into each well, which raised the detection ceiling above the 50 mM that the substrate can yield and kept the determination within the linear range. Samples were taken at 1.5 h. The negative control was the complete reaction mixture assembled without either enzyme, with the polyphosphate present, and it remained flat at ΔA₃₄₀ = 0.019, which the calibration converts to 0.00 mM.",
              ],
            },
            {
              pairedResource: {
                kind: "image",
                src: "assets/measurements/dhak-activity-assay-dhap-standard-curve-of-the-round.png",
                alt: "DHAP standard curve of the round 2 endpoint determination, linear from 0 to 50 mM",
                caption:
                  "DHAP standard curve of the endpoint determination in round 2. The linear fit, DHAP (mM) = 58.521·ΔA₃₄₀ − 1.4123 with R² of about 0.999, was used to convert the ΔA₃₄₀ of each reaction sample into a concentration. Unlike round 1, the standards fall on a straight line over the whole range from 0 to 50 mM, so the determination lies within its linear region.",
              },
            },
            {
              pairedResource: {
                kind: "table",
                table: {
                  caption:
                    "Endpoint determination of round 2, with both enzymes purified and a smaller aliquot per well. DHAP is interpolated against the standards above, conversion is referred to the 50 mM dihydroxyacetone supplied, and the phosphate column converts the polyphosphate at 12 phosphate units per chain.",
                  headers: [
                    "Sample",
                    "A₃₄₀ before",
                    "A₃₄₀ after",
                    "ΔA₃₄₀",
                    "DHAP (mM)",
                    "Conversion of DHA",
                    "Phosphate supplied (mM)",
                    "DHAP per ATP supplied",
                  ],
                  rows: [
                    [
                      "Control, no enzymes, polyphosphate present",
                      "0.897",
                      "0.878",
                      "0.019",
                      "0.00",
                      "None",
                      "None",
                      "None",
                    ],
                    [
                      "DHAP 25 mM standard",
                      "0.914",
                      "0.452",
                      "0.462",
                      "25.00",
                      "Standard",
                      "Standard",
                      "Standard",
                    ],
                    [
                      "DHAP 50 mM standard",
                      "0.917",
                      "0.044",
                      "0.873",
                      "50.00",
                      "Standard",
                      "Standard",
                      "Standard",
                    ],
                    [
                      "R1, 16.9 mM polyP chains, 1.5 h",
                      "0.941",
                      "0.636",
                      "0.305",
                      "16.44",
                      "32.9%",
                      "202.8",
                      "About 10",
                    ],
                    [
                      "R2, 50.4 mM polyP chains, 1.5 h",
                      "0.934",
                      "0.070",
                      "0.864",
                      "49.15",
                      "98.3%",
                      "604.8",
                      "About 29",
                    ],
                  ],
                },
              },
            },
            {
              paragraphs: [
                "Round 2 answers the question the module was built around. With 1.7 mM ATP supplied, the reaction formed 16.44 and 49.15 mM DHAP at the two polyphosphate feeds, which is 32.9% and 98.3% conversion of the dihydroxyacetone and corresponds to the nucleotide pool turning over about 10 and about 29 times. Since only about 8% of the phosphate supplied was transferred in either condition, the donor was never limiting, and what distinguishes the two conditions is the amount of polyphosphate fed rather than the amount of phosphate remaining within the chains. That is what the larger feed changed, carrying the conversion from a third of the substrate to near completion.",
                "The figure of about 29 turnovers should be quoted as a lower bound on the capacity of the system rather than as a measurement of it. At 98.3% conversion the reaction had exhausted its substrate, so the number of cycles was limited by the dihydroxyacetone available and not by the ability of PPK2 to return ADP to ATP.",
              ],
            },
          ],
        },
        {
          callouts: [
            {
              kind: "learn",
              text: "**Three limits are attached to the figures of round 2 and should be read with them.** Each condition is a single determination at a single time point, so the values carry no estimate of their dispersion and no information about the rate at which the conversion was reached. The control that was run omitted both enzymes rather than PPK2 alone: it establishes that the signal requires the enzymes, since no DHAP arises from the reagents themselves, but it cannot apportion the product between the two, so the regeneration of ATP remains inferred from the stoichiometry of the nucleotide supplied rather than measured against a non-regenerating condition. The inference is strong, because 49.15 mM of product cannot be obtained from 1.7 mM of nucleotide without recycling, but the direct demonstration is a reaction containing DHAK and no PPK2, which has not yet been run. And the activity of PPK2 was not measured in house but estimated from its protein content and a specific activity taken from the literature [7], so the excess of PPK2 over DHAK was assumed rather than demonstrated.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "outcome",
              text: "**Stated plainly, what this measurement does and does not do:** it establishes that specific preparations of DHAK are catalytically active and quantifies them in absolute units; it establishes that the coupled system forms DHAP far in excess of the ATP supplied and that the conversion scales with the polyphosphate fed; it does not establish a turnover number for the system, a rate for the coupled reaction, a measured activity for the regenerating enzyme, or whether the stabilised design would function in a background whose wild type worked.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "not-done",
              text: "**For a team repeating the measurement, the modifications we would introduce follow from the limits above.** Replicate both polyphosphate conditions and resolve the time course, sampling the complete reaction and its control at several times with the dilution of round 2. Run a condition containing DHAK and no PPK2, alongside the no-enzyme control already in place: without regeneration, DHAP formation must stop once the initial ATP is spent, so this condition bounds the product at about 1.7 mM and converts the regeneration from an inference into a measurement; it must be read at a dilution at which 1.7 mM DHAP is quantifiable. Measure the activity of PPK2 directly, with a readout that detects the phosphorylation of ADP rather than the formation of DHAP. Calibrate the readout locally, with an NADH standard curve measured on the instrument and in the vessel actually used. And quantify protein by a method that works at these concentrations, for example absorbance at 280 nm or a Bradford micro-assay with a standard curve covering the lower range, so that the extracts can be reported as specific activities.",
            },
          ],
        },
      ],
    },
  ],
  references: [
    "[1] Bücher T, Hohorst HJ. Dihydroxyacetone phosphate, fructose-1,6-diphosphate and D-glyceraldehyde-3-phosphate. In: Bergmeyer HU, editor. Methods of enzymatic analysis. New York: Academic Press; 1965. p. 246-52. Available from: https://doi.org/10.1016/b978-0-12-395630-9.50054-2",
    "[2] Reynolds SJ, Yates DW, Pogson CI. Dihydroxyacetone phosphate. Its structure and reactivity with α-glycerophosphate dehydrogenase, aldolase and triose phosphate isomerase and some possible metabolic implications. Biochemical Journal. 1971;122(3):285-97. Available from: https://doi.org/10.1042/bj1220285",
    "[3] Beck WS. Assay of triose phosphates. Methods in Enzymology. 1957;3:201-7. Available from: https://doi.org/10.1016/s0076-6879(57)03372-8",
    "[4] Pinto PVC, Kaplan A. Aldolase. II. Spectrophotometric determination using an ultraviolet procedure. Clinical Chemistry. 1969;15(5):349-60. Available from: https://doi.org/10.1093/clinchem/15.5.349",
    "[5] Sánchez-Moreno I. Dihidroxiacetona quinasa de Citrobacter freundii CECT 4626: una aproximación integral a un nuevo biocatalizador para la formación de enlaces C-C [PhD thesis]. Madrid: Universidad Autónoma de Madrid; 2009. Available from: http://hdl.handle.net/10261/17036",
    "[6] Bradford MM. A rapid and sensitive method for the quantitation of microgram quantities of protein utilizing the principle of protein-dye binding. Analytical Biochemistry. 1976;72(1-2):248-54. Available from: https://doi.org/10.1016/0003-2697(76)90527-3",
    "[7] Monterrey DT, Azcona L, Revuelta J, Sánchez-Moreno I, García-Junceda E. Polyphosphate kinase from Burkholderia cenocepacia, one enzyme catalyzing a two-step cascade reaction to synthesize ATP from AMP. International Journal of Molecular Sciences. 2024;25(23):12995. Available from: https://doi.org/10.3390/ijms252312995",
  ],
};

export const REVALORISATION_SUMMARY =
  "Enzyme purification, kinase activity and the coupled cascade";

export const REVALORISATION_CHARACTERISATION = [
  "The module’s characterisation combines protein **purification** and enzymatic measurements, with the coupled α-GDH/TIM assay providing a common readout for enzyme activity and product formation. In **continuous** mode it gives the **initial rate** of a single kinase, which helps distinguish an enzyme preparation with measurable activity from one that does not work detectably, and allows activity to be compared between preparations. In endpoint mode, run on stopped aliquots, the same chemistry measures how much product has accumulated in the coupled DHAK and PPK2 reaction over time.",
  "Using a shared readout for both is a deliberate choice, not a convenience. Because the continuous and endpoint measurements share their reporter chemistry, **extinction coefficient** and wavelength, they can be interpreted within the same measurement framework. At the same time, each format has its own **limitations**, and the conditions under which a result is obtained determine what conclusions can be drawn from it. This is why the technique sections report the **controls** used to assess the assay, including the no-enzyme background that is subtracted from each session, the starting absorbance that confirms the set-up before any enzyme is added, and the conversion to absolute units through the NADH extinction coefficient rather than through a relative scale.",
  "The characterisation also includes the purification strategies investigated to obtain enzyme suitable for further testing. Chromatographic profiles help identify candidate fractions, but absorbance alone cannot establish the identity or activity of the protein they contain, making independent activity measurements necessary for their interpretation. The technique sections give the buffer, final concentrations, temperature, path length and **fitting window** where relevant, since these parameters can affect the result. They also state plainly where our numbers are still volumetric rather than **mass-normalised**, since **specific activity** requires a reliable protein quantification, which was obtained for only one preparation, the concentrated affinity-purified DHAK. The methods and their limitations are documented to make the results interpretable and the procedures reproducible, while the assay itself may also be useful to other teams studying enzymes that produce dihydroxyacetone phosphate, or coupled systems involving polyphosphate-driven ATP regeneration.",
];

export const REVALORISATION_CONCLUSIONS = [
  "The measurements provided a way to assess enzyme activity, investigate **purification** strategies and examine product formation in the revalorisation module. The activity assay distinguished preparations with measurable activity from those without it, while the purification work identified candidate fractions for further evaluation. Expressing activity through a defined spectrophotometric readout also allowed results to be compared under the same measurement conditions, rather than relying on relative signals alone. This helped turn the experimental work into evidence that could be interpreted and evaluated by others.",
  "The limits are equally clear. Only one preparation carried a protein determination reliable enough to support a **specific activity**, so the remaining activities are volumetric, and the reporter chemistry is calibrated using a literature **extinction coefficient** rather than a local standard curve. The first round of the coupled endpoint determination reached the **detection ceiling** and could not quantify product accumulation; the second round, run at a dilution that kept the determination inside its linear range, did. Each of its two conditions is nevertheless a single determination at a single time point, with no dispersion attached and no measured activity for the regenerating enzyme, so the regeneration of ATP is inferred from the stoichiometry of the nucleotide supplied rather than measured against a non-regenerating condition.",
  "By documenting the methods, conditions, **controls** and **limitations** alongside the results, we aim to provide a transparent account of what the measurements establish and what remains unresolved. This also gives other teams a practical basis for reproducing or adapting the approaches, while making clear which parameters and limitations need to be considered when applying them to a different system.",
];

export const REVALORISATION_MEASUREMENTS: ExperimentData[] = [
  FPLC,
  DHAK_ACTIVITY_ASSAY,
];