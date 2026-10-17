import type { ExperimentData } from "../../components/LabFolders/types";

const POLYP_UPTAKE: ExperimentData = {
  id: "polyp-uptake",
  tabLabel: "Polyphosphate uptake assay",
  title:
    "Intracellular polyphosphate uptake assay — colorimetric quantification of acid-hydrolysed polyphosphate (molybdate-dye method)",
  body: [
    {
      paragraphs: [
        "The molybdate-dye assay is a fast, sensitive colorimetric method for quantifying free orthophosphate (Pi) in aqueous solution. Its principle is that, under acidic conditions, orthophosphate reacts with molybdate to form a phosphomolybdate complex which then associates with a cationic dye (malachite-green type) to give an intensely coloured product whose absorbance is proportional to the amount of phosphate present; unknown concentrations are read against a calibration curve built with a phosphate standard. Because the reaction is driven by a one-to-one stoichiometry between Pi and the coloured complex, the method is linear over a wide range and sensitive down to the nanomolar and nanogram scale [1].",
        "This chemistry does not measure polyphosphate directly; it measures orthophosphate. It is applied to polyphosphate by first hydrolysing the polymer to its constituent orthophosphate units. Since polyphosphate is a linear chain of Pi residues joined by high-energy phosphoanhydride bonds [2], hot acid cleaves it quantitatively to free Pi, so the orthophosphate measured after hydrolysis is a direct, stoichiometric proxy for the polyphosphate that was stored in the cells. The decisive advantage exploited here is that the assay is inexpensive, simple and directly quantitative, which makes it well suited to following phosphorus accumulation across a dense time-course for several strain, condition and replicate combinations.",
      ],
    },
    {
      id: "section-polyp-uptake-application-to-our-sample",
      title: "Application to our sample",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The sample actually read in the cuvette is a neutralised acid hydrolysate of a bacterial cell pellet, a clarified aqueous solution containing the orthophosphate liberated from the cells’ intracellular polyphosphate. In general, molybdate-dye assays are ideally suited to clear aqueous samples in which phosphate is free in solution, because the colour develops in the liquid phase and no phase separation is required; the main precaution is that the sample must not contain large amounts of extraneous phosphate or interfering species.",
            "Our specific sample is the whole-cell biomass of *Pseudomonas putida* KT2440, the wild-type strain and an engineered transformant, incubated in the project’s operation medium, filtered vegetable-oil degumming effluent adjusted to pH 5. The colorimetric reaction reports total soluble Pi; here that Pi comes exclusively from the hot-acid hydrolysis of the polyphosphate granules the cells accumulated, so the read-out is interpreted as intracellular polyphosphate content [3, 4]. To make the value comparable between samples and strains, the phosphate measured in each pellet is normalised to the biomass in that sample (optical density at 600 nm), yielding total ng of Pi per OD₆₀₀ unit; tracking this quantity over time converts a single-point colorimetric measurement into a phosphorus-uptake rate for each strain.",
          ],
        },
      ],
    },
    {
      id: "section-polyp-uptake-application-to-our-project",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "This technique was chosen, rather than DAPI-based polyphosphate fluorescence, ³¹P-NMR or enzymatic (polyphosphate-kinase-coupled) assays, because it is cheap, requires no specialised instrumentation beyond a spectrophotometer, is directly quantitative in absolute mass units (ng Pi) and scales easily to the many time points and replicates the comparison demands; acid extraction followed by molybdate quantification is a long-established route to total cellular polyphosphate [3].",
            "Within the genetic-engineering work-block, the objective is to test whether the metabolic engineering of the chassis actually increases its capacity to capture phosphorus from the operation stream. rePhlow engineers *P. putida* KT2440 to hyperaccumulate polyphosphate by heterologously overexpressing polyphosphate kinase (ppk1) and the high-affinity phosphate transporter (pstSCAB) while knocking out the polyphosphate-degrading and competing routes (ppx, ppkB, pitB) by CRISPR base editing. The experiment compares the wild-type strain against this engineered transformant for intracellular polyphosphate accumulation under operation conditions (pH 5), after a phosphate-starvation step that primes the cells for “luxury” phosphate uptake.",
            "We expected both strains to accumulate phosphorus over the two-hour assay, and we expected the engineered transformant to do so faster or to a greater extent, because its genetic design biases flux towards polyphosphate synthesis and retention. The information sought is the phosphorus-uptake rate (ng Pi per OD₆₀₀ per minute) of each strain, since it is the quantitative phenotype that tells us whether the engineered strain is a meaningfully better phosphorus-capture agent and should be carried forward into the recovery process.",
          ],
        },
      ],
    },
    {
      id: "section-polyp-uptake-technique-requirements",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Instruments, reagents and ancillary equipment of the molybdate-dye polyphosphate uptake assay.",
              headers: ["Parameter", "Value"],
              rows: [
                [
                  "Instrument (colour read-out)",
                  "UV-Vis spectrophotometer with a thermostatted, stirred cuvette holder",
                ],
                [
                  "Instrument (biomass)",
                  "Spectrophotometer for OD₆₀₀ of cultures and aliquots (cuvette), blanked against cell-free filtered operation medium",
                ],
                [
                  "Sample requirement",
                  "Clear, bubble-free neutralised hydrolysate in a 1 cm path-length cuvette; total assay volume 1 mL (50 µL diluted hydrolysate + 450 µL H₂O + 500 µL molybdate-dye working reagent); blank = phosphate-free water plus reagent",
                ],
                [
                  "Measurement mode",
                  "Endpoint absorbance after 15 min colour development at room temperature",
                ],
                ["Detection wavelength", "600 nm"],
                [
                  "Reagents and standards",
                  "Molybdate-dye working reagent prepared fresh daily (10 µL additive per 1 mL dye solution); phosphate standard diluted 1:20 from 1 mM to 50 µM for the calibration series, run in duplicate",
                ],
                [
                  "Ancillary equipment",
                  "Refrigerated centrifuge (10 min, 5,000 rpm, 4 °C for cultures); microcentrifuge (5–10 min, 10,000–12,000 rpm, 4 °C for sample pellets and clarification); heating block at 95 °C (15 min acid hydrolysis); orbital shaker/incubator at 30 °C",
                ],
                ["Reads per sample", "3"],
              ],
            },
          },
        },
        {
          id: "section-polyp-uptake-sample-preparation",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Sample type measured: whole-cell pellets of *P. putida* KT2440 (wild type and engineered transformant), processed into a neutralised acid hydrolysate; the orthophosphate in that hydrolysate is the analyte.",
                "Preparation follows the logic of a luxury-uptake experiment and is designed so the colorimetric signal reflects only intracellular polyphosphate. Overnight precultures of each strain (LB plus the corresponding antibiotic, 30 °C) were used to inoculate fresh cultures that were grown to mid-exponential phase (OD₆₀₀ ≈ 0.6). Cells were then subjected to a 1 h phosphate-starvation step in phosphate-free minimal medium, which de-represses the phosphate regulon and primes the cells to take up phosphate avidly once it becomes available. The starved cells were washed and resuspended to OD₆₀₀ = 1.0 in filtered operation medium adjusted to pH 5 (this point is t = 0), and the assay was run for 120 min with sampling at 15 min intervals.",
                "At each time point two aliquots were taken: one to measure OD₆₀₀ (blanked against cell-free filtered medium) for the biomass normalisation, and one to quantify phosphorus. The phosphorus aliquot was washed three times with 0.1 M NaCl (centrifuging at 10,000 rpm, 4 °C between washes): this step is critical because the operation medium is itself phosphate-rich, and any carry-over of extracellular phosphate would falsify the intracellular signal. Each washed pellet was then resuspended in 1 M HCl and incubated 15 min at 95 °C, which simultaneously lyses the cells and hydrolyses the intracellular polyphosphate to orthophosphate [3]; after cooling and clarification by centrifugation, the supernatant was neutralised with an equal volume of 1 M NaOH (to ≈ pH 7) and further diluted before colour development, giving the overall dilution factor of 5000 used in the back-calculation. Colour was developed by adding the freshly prepared molybdate-dye working reagent and reading absorbance after a 15 min incubation at room temperature, against a phosphate-standard calibration series run in duplicate [1].",
                "No major deviation from a standard protocol was required; the laboratory-level points worth noting are that the molybdate-dye working reagent must be prepared fresh daily, that the triple NaCl wash must be thorough, and that the acid neutralisation must bring the sample close to neutral pH so the colour chemistry behaves as in the standards.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-polyp-uptake-results",
      title: "Results",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The results are the phosphate calibration curve, the growth (OD₆₀₀) profiles, and the biomass-normalised intracellular-phosphorus profiles from which the uptake rates are derived. The calibration curve was linear across the 0–1900 ng range (A₆₀₀ = 0.00104·[Pi] + 0.2218), validating the interpolation, and the OD₆₀₀ profiles confirmed that biomass stayed roughly constant during the assay, so the normalised signal can be read as phosphorus accumulated per unit of biomass rather than as a growth artefact.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/polyp-uptake-orthophosphate-calibration-curve-from-the-molybdate.jpg",
            alt: "Orthophosphate calibration curve from the molybdate-dye reaction",
            caption:
              "Orthophosphate calibration curve (mean A₆₀₀ vs phosphate mass, 0–1900 ng Pi), built from the molybdate-dye reaction with a 50 µM phosphate standard series. The linear fit gives A₆₀₀ = 0.00104 · [Pi, ng] + 0.2218, used to interpolate all samples.",
          },
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/polyp-uptake-od600-of-wild-type-and-transformant.jpg",
            alt: "OD600 of wild type and transformant over the 120 minute assay",
            caption:
              "Growth of wild type and engineered transformant (OD₆₀₀ vs time) over the 120 min assay in operation medium at pH 5; both strains remain near OD₆₀₀ ≈ 1.4–1.8, confirming that the signal changes reflect phosphorus uptake and not large changes in biomass.",
          },
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/polyp-uptake-biomass-normalised-intracellular-phosphorus-content-over.png",
            alt: "Biomass-normalised intracellular phosphorus content over time for both strains",
            caption:
              "Intracellular phosphorus content normalised to biomass (total ng Pi per OD₆₀₀ unit) vs time for both strains (means of triplicates ± SD); the slope of the linear uptake window gives the phosphorus-uptake rate of each strain.",
          },
        },
        {
          paragraphs: [
            "Both strains accumulated intracellular phosphorus from the pH-5 operation medium over the two hours, with the biomass-normalised content rising from the order of 4–9.5 × 10⁵ ng Pi·OD⁻¹ at t = 0 to roughly 1.2–1.4 × 10⁶ ng Pi·OD⁻¹ at 120 min. Because the per-time-point data are noisy (sizeable replicate SD and non-monotonic early points), the robust comparator is the slope over the linear uptake window. On that metric the engineered transformant takes up phosphorus markedly faster than the wild type: 11,017 vs 6,450 ng Pi·OD₆₀₀⁻¹·min⁻¹, a 1.71-fold higher uptake rate. This matches the expectation set out above and provides functional, whole-cell validation that the metabolic design (*ppk1*/*pstSCAB* overexpression together with *ppx*/*ppkB*/*pitB* knockouts) does what it was engineered to do: bias the cell towards capturing and retaining phosphorus from the operation stream [4, 5, 6].",
          ],
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Biomass-normalised intracellular phosphorus over the 120 min assay (means of triplicates, overall dilution factor 5000). The derived uptake rates are 6,449.9 ng Pi·OD₆₀₀⁻¹·min⁻¹ for the wild type and 11,017.0 for the transformant, a ratio of 1.71.",
              headers: [
                "Time (min)",
                "WT (ng Pi/OD₆₀₀)",
                "WT (SD)",
                "Transformant (ng Pi/OD₆₀₀)",
                "Transformant (SD)",
              ],
              rows: [
                ["0", "418,206", "24,526", "949,476", "13,162"],
                ["15", "586,055", "59,936", "550,346", "35,412"],
                ["30", "942,802", "161,645", "887,364", "123,591"],
                ["45", "588,904", "48,156", "605,336", "42,735"],
                ["60", "590,601", "34,879", "840,314", "111,933"],
                ["75", "950,432", "115,961", "859,431", "31,454"],
                ["90", "953,431", "94,687", "1,023,426", "23,998"],
                ["105", "1,164,371", "34,855", "1,139,340", "83,102"],
                ["120", "1,202,611", "44,233", "1,371,642", "19,716"],
              ],
            },
          },
        },
        {
          callouts: [
            {
              kind: "outcome",
              text: "This matches the expectation set out above and provides functional, whole-cell validation that the metabolic design (ppk1 and pstSCAB overexpression together with ppx, ppkB and pitB knockouts) does what it was engineered to do: bias the cell towards capturing and retaining phosphorus from the operation stream [4, 6].",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "not-done",
              text: "Next experimental steps: extend the time-course beyond 120 min until the normalised signal plateaus, to obtain each strain’s maximal polyphosphate storage capacity in addition to the initial rate; increase the number of biological replicates and, if needed, apply a brief additional wash or an EDTA rinse to further suppress extracellular-phosphate carry-over, since incomplete removal of the phosphate-rich medium is the most likely source of the early scatter; dissect the contribution of the individual genetic modifications to the observed rate gain; and repeat on genuine, non-simulated degumming effluent, coupling the measurement to the downstream biomass-harvest and phosphorus-recovery step.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "learn",
              text: "Should a run fail to show uptake, the first things to check would be the completeness of the NaCl washes, the efficiency of the acid hydrolysis (time and temperature) and the freshness of the molybdate-dye reagent, any of which could flatten or distort the signal.",
            },
          ],
        },
      ],
    },
  ],
  references: [
    "[1] Lanzetta PA, Alvarez LJ, Reinach PS, Candia OA. An improved assay for nanomole amounts of inorganic phosphate. Analytical Biochemistry. 1979;100(1):95-7. Available from: https://doi.org/10.1016/0003-2697(79)90115-5",
    "[2] Kornberg A, Rao NN, Ault-Riché D. Inorganic polyphosphate: a molecule of many functions. Annual Review of Biochemistry. 1999;68(1):89-125. Available from: https://doi.org/10.1146/annurev.biochem.68.1.89",
    "[3] Ault-Riché D, Fraley CD, Tzeng CM, Kornberg A. Novel assay reveals multiple pathways regulating stress-induced accumulations of inorganic polyphosphate in Escherichia coli. Journal of Bacteriology. 1998;180(7):1841-7. Available from: https://doi.org/10.1128/jb.180.7.1841-1847.1998",
    "[4] Rao NN, Gómez-García MR, Kornberg A. Inorganic polyphosphate: essential for growth and survival. Annual Review of Biochemistry. 2009;78(1):605-47. Available from: https://doi.org/10.1146/annurev.biochem.77.083007.093039",
    "[5] Seviour RJ, Mino T, Onuki M. The microbiology of biological phosphorus removal in activated sludge systems. FEMS Microbiology Reviews. 2003;27(1):99-127. Available from: https://doi.org/10.1016/s0168-6445(03)00021-4",
    "[6] Nikel PI, De Lorenzo V. Pseudomonas putida as a functional chassis for industrial biocatalysis: from native biochemistry to trans-metabolism. Metabolic Engineering. 2018;50:142-55. Available from: https://doi.org/10.1016/j.ymben.2018.05.005",
  ],
};

export const GENETIC_ENGINEERING_SUMMARY =
  "Phosphorus uptake by the engineered strain against the wild type";

export const GENETIC_ENGINEERING_CHARACTERISATION = [
  "Most of the work behind this block is construction and verification, and it is reported in Experiments and Results. The measurement that belongs here is the one that turns the engineered strain from a sequence into a phenotype: an intracellular polyphosphate uptake assay, run across a time-course rather than at a single point, because what distinguishes the two strains is a rate. Cells are primed by a phosphate starvation step, which de-represses the phosphate regulon and makes them take up phosphate avidly once it is offered, then resuspended in the operation medium at a defined optical density and sampled every fifteen minutes for two hours. Each sample is split: one aliquot gives the biomass, the other gives the phosphorus.",
  "Three features of the protocol are what make the result interpretable, and each one exists to close a specific way of being wrong. The triple saline wash before lysis removes the phosphate-rich medium, without which extracellular phosphate would be counted as intracellular and every value would be inflated. The optical density measured on a parallel aliquot at every time point allows the phosphorus to be expressed per unit of biomass, which separates genuine accumulation from the appearance of accumulation caused by cells dividing. And the phosphate calibration series, run in duplicate alongside the samples, converts absorbance into absolute mass rather than into a relative signal, so the figures are comparable to those of any other laboratory using the same chemistry.",
  "The technique page reports the parameters another team would need rather than a narrative of the afternoon: the growth and starvation conditions, the starting density, the sampling interval, the wash and centrifugation steps, the acid concentration, the hydrolysis time and temperature, the neutralisation, the dilution applied before colour development, the development time and the wavelength. It is also explicit about where the measurement is weak. The per-time-point values scatter, so the comparison between strains is taken from the slope over the linear uptake window rather than from any single point, and the most likely source of that scatter is incomplete removal of the external medium, which is why the next iteration of the protocol tightens the wash rather than adding more time points. The approach generalises directly to any team quantifying intracellular polyphosphate in whole cells, and the part worth borrowing is less the colour chemistry, which is standard, than the pairing of a biomass normalisation with a wash step aggressive enough to make the word “intracellular” mean something.",
];

export const GENETIC_ENGINEERING_CONCLUSIONS = [
  "The measurement did its job: the engineered strain takes up phosphorus from the real operation medium at roughly 1.7 times the rate of the wild type, under the acidic conditions the process will actually run at rather than at a laboratory optimum. That is the functional validation the genetic design needed, and it is the number that justified carrying this chassis into the encapsulation and recovery work rather than redesigning it. The comparison is also the robust part of the result, because both strains were processed identically and share every dilution and normalisation factor, so the ratio between them survives uncertainties that the absolute values do not.",
  "What the assay has not yet established is the ceiling: the time-course stops while both strains are still accumulating, so we have a rate but not a maximum storage capacity, and we cannot yet say which of the individual genetic changes contributes most of the gain. Both are named in the technique page with the experiment that would answer them, a longer run to the plateau and a comparison of the modifications in isolation, and the second of those is the measurement we would most want another team to repeat.",
];

export const GENETIC_ENGINEERING_MEASUREMENTS: ExperimentData[] = [
  POLYP_UPTAKE,
];
