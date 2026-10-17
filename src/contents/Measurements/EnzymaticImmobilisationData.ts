import type { ExperimentData } from "../../components/LabFolders/types";

const PNPB_CONTINUOUS: ExperimentData = {
  id: "pnpb-continuous",
  tabLabel: "Continuous pNPB assay",
  title:
    "Continuous spectrophotometric determination of (phospho)lipase activity (pNPB) and immobilisation-yield monitoring",
  body: [
    {
      paragraphs: [
        "A continuous (kinetic) spectrophotometric assay measures the rate of an enzymatic reaction in real time by following the appearance of a coloured product as it forms, without stopping the reaction. For esterases, lipases and phospholipases, p-nitrophenyl esters are the standard chromogenic substrates: hydrolysis of the ester bond releases p-nitrophenol (pNP), whose absorbance rises over time, yielding the reaction rate directly as a change in absorbance per minute [1]. p-Nitrophenyl butyrate (pNPB) is a short-chain acyl ester particularly well suited to lipases and phospholipases with lipase activity, because its modest chain length makes it soluble and readily hydrolysed while still reporting on the acyl-ester-cleaving activity of interest [2].",
        "Unlike the discontinuous format, the continuous assay does not require alkaline quenching; the read-out is taken at a wavelength (here 348 nm) close to the isosbestic point of pNP, so the signal is largely independent of the product’s protonation state and can be recorded reliably at near-neutral pH. The decisive advantage of a continuous, real-time read-out in this work is that the same activity measurement can be used not only to quantify the free enzyme but also to follow a process as it happens, in particular the progressive disappearance of catalytic activity from solution as an enzyme becomes attached to a solid support, which is exactly what is needed to monitor an immobilisation reaction [3].",
      ],
    },
    {
      id: "section-pnpb-continuous-application-to-our-sample",
      title: "Application to our sample",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The sample measured is the commercial phospholipase preparation Lecitase® Ultra (Sigma-Aldrich), used here as a model enzyme, in two states: free enzyme in solution, and enzyme in the presence of a MANAE-agarose support during immobilisation. In general, lipase and phospholipase preparations are ideally characterised with p-nitrophenyl ester assays because these enzymes cleave acyl-ester bonds and release pNP in a way that mirrors their action on their natural glyceroester substrates [2].",
            "Our specific enzyme, Lecitase® Ultra, is a chimeric biocatalyst combining the lipase of *Thermomyces lanuginosus* with the phospholipase A1 of *Fusarium oxysporum*; it possesses lipase and phospholipase A1 activity and, importantly, an active site occluded by a mobile lid that must open (interfacial activation) for catalysis [4]. pNPB is an appropriate reporter substrate because its acyl-ester bond is hydrolysed by the same catalytic machinery, and the continuous read-out captures the initial rate before substrate depletion. Because the enzyme is being studied for immobilisation, the assay is applied to two fractions in parallel (the whole immobilisation suspension and its clarified supernatant), so the activity remaining free in solution can be distinguished from the total activity, which is the basis for quantifying how much enzyme has become bound to the support [5].",
          ],
        },
      ],
    },
    {
      id: "section-pnpb-continuous-application-to-our-project",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "This assay was chosen because the immobilisation work-block requires a measurement that can be repeated quickly on many time points and on both the suspension and the supernatant, which a fast continuous read-out provides far more practically than a stopped assay would.",
            "The objective within the block is to determine the immobilisation yield (the fraction of catalytic activity that becomes attached to the support) for the different immobilisation chemistries tested (covalent binding on a glutaraldehyde-preactivated support versus ionic adsorption followed by glutaraldehyde crosslinking), both in the absence and presence of the detergent Triton X-100. The measurement principle is a differential one: at each time point, the activity of the whole suspension reflects free plus immobilised enzyme, whereas the activity of the clarified supernatant (after sedimenting the agarose) reflects only the free enzyme that has not interacted with the support; the difference estimates the immobilised activity, and its ratio to the total gives the yield.",
            "We expected the free-enzyme (supernatant) activity to decrease over time as enzyme bound to the support, and we expected the two chemistries to differ, informing which strategy, and which detergent condition, best retains catalytic activity upon immobilisation. This is the information that lets the block select a protocol before transferring it to the more complex genipin–chitosan–alginate system.",
          ],
        },
      ],
    },
    {
      id: "section-pnpb-continuous-technique-requirements",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Instrument, optical parameters and timing of the continuous pNPB assay as run for immobilisation monitoring.",
              headers: ["Parameter", "Value"],
              rows: [
                [
                  "Instrument",
                  "UV-Vis spectrophotometer with a thermostatted cuvette holder and magnetic stirring",
                ],
                [
                  "Sample requirement",
                  "Homogeneous, low-turbidity solution in a UV-transparent cuvette (1 cm path length); for the free-enzyme term the supernatant must be optically clear (agarose sedimented)",
                ],
                [
                  "Measurement mode",
                  "Continuous kinetic acquisition (absorbance vs time), reading ΔA₃₄₈/min",
                ],
                [
                  "Detection wavelength",
                  "348 nm (near the pNP isosbestic point, minimising pH dependence)",
                ],
                [
                  "Lambert–Beer parameters",
                  "Micromolar extinction coefficient of pNP at 348 nm ε = 0.00515 µM⁻¹cm⁻¹; optical path l = 1 cm",
                ],
                [
                  "Temperature",
                  "Room temperature for immobilisation monitoring, stirring on; cuvette temperature setpoint 30 °C",
                ],
                [
                  "Sedimentation step",
                  "604 × g, 2 min (benchtop microcentrifuge)",
                ],
                ["Integration time per read", "90 min"],
                ["Data-acquisition interval", "15 min"],
              ],
            },
          },
        },
      ],
    },
    {
      id: "section-pnpb-continuous-results",
      title: "Results",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The results are the free and total activity–time profiles and the derived immobilisation yields for each chemistry and detergent condition, plus the Lecitase® Ultra stock characterisation. The stock characterisation gave a mean protein concentration of about 40 mg/mL and a mean specific activity of about 981 U/mg, providing the baseline against which immobilised activity was compared.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/pnpb-continuous-bradford-calibration-line-for-the-lecitase.jpg",
            alt: "Bradford calibration line for the Lecitase Ultra stock with the linear range highlighted",
            caption:
              "Bradford determination of the Lecitase® Ultra stock concentration; the linear range (green) of the BSA standard line (blue) is used to interpolate the diluted-stock absorbances.",
          },
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Specific activity of the Lecitase® Ultra stock from the continuous pNPB assay and Bradford quantification (duplicate): mean stock concentration ≈ 40 mg/mL; mean specific activity ≈ 981 U/mg.",
              headers: [
                "ΔA₃₄₈/min",
                "Activity (U)",
                "A₅₉₅ (a.u.)",
                "[protein] (mg/mL)",
                "[protein] stock (mg/mL)",
                "Specific activity (U/mg)",
                "Mean specific activity (U/mg)",
              ],
              rows: [
                [
                  "0.1632",
                  "31.689",
                  "0.656",
                  "0.653",
                  "39.856",
                  "969.64",
                  "981",
                ],
                ["0.1724", "33.476", "0.674", "0.674", "991.99"],
              ],
            },
          },
        },
        {
          paragraphs: [
            "For the immobilisation itself, the two chemistries behaved oppositely with respect to detergent. On the glutaraldehyde-preactivated support, immobilisation was more effective in the presence of Triton X-100 (yield ≈ 80%, ≈ 0.0053 U immobilised), whereas the ionic-adsorption-then-crosslinking strategy performed best in the absence of detergent (yield ≈ 80%, ≈ 0.0448 U immobilised), roughly ten-fold more immobilised activity from the same amount of enzyme and support.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/pnpb-continuous-time-course-of-immobilisation-on-the.jpg",
            alt: "Time-course of immobilisation on the glutaraldehyde-preactivated support with and without Triton X-100",
            caption:
              "Time-course of immobilisation on the glutaraldehyde-preactivated MANAE-agarose support: (A) without Triton X-100, (B) with 0.1% Triton X-100, (C) yield comparison.",
          },
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/pnpb-continuous-time-course-of-immobilisation-on-the-2.jpg",
            alt: "Time-course of immobilisation on the ionically adsorbed then crosslinked support with and without Triton X-100",
            caption:
              "Time-course of immobilisation on the ionically-adsorbed-then-crosslinked MANAE-agarose support: (A) without Triton X-100, (B) with 0.1% Triton X-100, (C) yield comparison.",
          },
        },
        {
          paragraphs: [
            "This dissociation was rationalised by in-silico modelling of open versus closed Lecitase® Ultra [8]. On a preactivated surface, the detergent-induced open form exposes surface lysines that anchor the enzyme in its active, hyperactivated conformation, while in the closed form direct covalent fixation of lysines adjacent to the lid (for example Lys24, Lys259) [9] mechanically blocks lid opening and abolishes activity. On an ion-exchange support, by contrast, the enzyme first adsorbs through an asymmetric crown of acidic residues (for example Asp27, Glu56, Asp57, Asp62) that orients the active site away from the matrix, and forcing the open form with detergent disrupts this productive orientation.",
          ],
        },
        {
          callouts: [
            {
              kind: "outcome",
              text: "The practical conclusion for the project is that the immobilisation chemistry must be matched to the support: for ionic MANAE-agarose, adsorb-then-crosslink in the closed conformation (no detergent) is the superior route [5], and it also gave the highest absolute immobilised activity.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "learn",
              text: "A caveat noted during measurement is that suspension readings include light scattering from beads; this was controlled by measuring the clarified supernatant for the free-enzyme term and by running the support-free inactivation control, which confirmed the enzyme was stable under the incubation conditions.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "not-done",
              text: "Next steps: measure the operational stability and reusability of the best derivative over multiple hydrolysis cycles; determine the retained specific activity (activity per mg immobilised) to complement the yield; and transfer the winning adsorb-then-crosslink protocol to the genipin–chitosan–alginate matrix, using the same continuous assay to verify the behaviour translates.",
            },
          ],
        },
      ],
    },
  ],
  references: [
    "[1] Bianchi A, Giachetti E, Vanni P. A continuous spectrophotometric assay for alkaline phosphatase with glycerophosphate as substrate. Journal of Biochemical and Biophysical Methods. 1994;28(1):35-41. Available from: https://doi.org/10.1016/0165-022x(94)90062-0",
    "[2] Virgen-Ortíz JJ, Santos JCSD, Ortiz C, Berenguer-Murcia Á, Barbosa O, Rodrigues RC, et al. Lecitase ultra: a phospholipase with great potential in biocatalysis. Molecular Catalysis. 2019;473:110405. Available from: https://doi.org/10.1016/j.mcat.2019.110405",
    "[3] Braham SA, Siar EH, Arana-Peña S, Bavandi H, Carballares D, Morellon-Sterling R, et al. Positive effect of glycerol on the stability of immobilized enzymes: is it a universal fact? Process Biochemistry. 2021;102:108-21. Available from: https://doi.org/10.1016/j.procbio.2020.12.015",
    "[4] Arana-Peña S, Carballares D, Corberan VC, Fernandez-Lafuente R. Multi-combilipases: co-immobilizing lipases with very different stabilities combining immobilization via interfacial activation and ion exchange. Catalysts. 2020;10(10):1207. Available from: https://doi.org/10.3390/catal10101207",
    "[5] Rodrigues RC, Virgen-Ortíz JJ, Santos JCSD, Berenguer-Murcia Á, Alcantara AR, Barbosa O, et al. Immobilization of lipases on hydrophobic supports: immobilization mechanism, advantages, problems, and solutions. Biotechnology Advances. 2019;37(5):746-70. Available from: https://doi.org/10.1016/j.biotechadv.2019.04.003",
    "[6] López-Gallego F, Betancor L, Mateo C, Hidalgo A, Alonso-Morales N, Dellamora-Ortiz G, et al. Enzyme stabilization by glutaraldehyde crosslinking of adsorbed proteins on aminated supports. Journal of Biotechnology. 2005;119(1):70-5. Available from: https://doi.org/10.1016/j.jbiotec.2005.05.021",
    "[7] Carballares D, Rocha-Martin J, Fernandez-Lafuente R. Coimmobilization of lipases exhibiting three very different stability ranges. International Journal of Biological Macromolecules. 2022;206:580-90. Available from: https://doi.org/10.1016/j.ijbiomac.2022.02.084",
    "[8] Andrés-Sanz D, Fresan C, Fernández-Lorente G, Rocha-Martín J, Guisán JM. Stabilization of Lecitase Ultra® by immobilization and fixation of bimolecular aggregates. Catalysts. 2021;11(9):1067. Available from: https://doi.org/10.3390/catal11091067",
    "[9] Barbosa O, Ortiz C, Berenguer-Murcia Á, Torres R, Rodrigues RC, Fernandez-Lafuente R. Glutaraldehyde in bio-catalysts design: a useful crosslinker and a versatile tool in enzyme immobilization. RSC Advances. 2014;4(4):1583-600. Available from: https://doi.org/10.1039/c3ra45991h",
  ],
};

const BISPNPP_DISCONTINUOUS: ExperimentData = {
  id: "bispnpp-discontinuous",
  tabLabel: "Discontinuous bis-pNPP assay",
  title:
    "Discontinuous colorimetric determination of phosphohydrolase activity (bis-pNPP)",
  body: [
    {
      paragraphs: [
        "Enzymatic activity assays quantify the rate at which an enzyme converts substrate into product under defined conditions, and chromogenic assays are among the most robust and widely used formats for phosphohydrolases because they translate catalytic turnover directly into an optical signal. The principle relies on a synthetic substrate that, upon cleavage of its phosphoester bond, releases a coloured reporter molecule that can be followed by visible-light absorption spectroscopy. p-Nitrophenyl phosphate (pNPP) is the classical chromogenic substrate for phosphomonoesterases: hydrolysis of its single phosphate group releases p-nitrophenol (pNP), which becomes an intense yellow chromophore (p-nitrophenolate) when deprotonated at alkaline pH, absorbing strongly at 405 nm [1].",
        "In this work the phosphodiester analogue bis(p-nitrophenyl) phosphate (bis-pNPP) was used instead. Because bis-pNPP carries two p-nitrophenyl groups esterified to a central phosphate, it is a bulkier and more chemically stable diester. Its hydrolysis reports on phosphodiesterase-type activity [2], better mimicking the sterically hindered, highly charged phosphodiesters that dominate real degumming effluents (such as phytate and phospholipid head groups) than an easily cleaved monoester model would. The assay is run in a discontinuous (“stopped”) format: aliquots are withdrawn at fixed times and quenched in strong base, which simultaneously halts catalysis and shifts the released pNP to its fully coloured phenolate form. This decoupling of the reaction pH from the read-out pH is the key advantage exploited here, since it allows the reaction to proceed at the acidic pH of interest (pH 5.0) while the chromophore is developed and quantified under optimal alkaline conditions.",
      ],
    },
    {
      id: "section-bispnpp-discontinuous-application-to-our-sample",
      title: "Application to our sample",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The samples measured with this assay are cell-free enzyme preparations, specifically IMAC-purified recombinant phosphohydrolases produced in *Escherichia coli*. In general, soluble hydrolases assayed in the aqueous phase are well suited to chromogenic-substrate assays because substrate and product remain in solution and the released pNP can be quantified without phase separation.",
            "Our specific samples are a panel of three heterologously expressed and purified acid phosphohydrolases with complementary specificities relevant to phosphorus mineralisation: the histidine acid phytase PhyA [3] (from *Obesumbacterium proteus*), and two non-specific acid phosphatases, the class-B acid phosphatase AphA [4] (from *E. coli*) and the metagenomic phosphatase M2-32. All three cleave phosphoester bonds and therefore release pNP from the pNP-based substrate, allowing a single, unified read-out to compare enzymes that otherwise differ in fold and natural substrate. Because the target application is the acid-degumming effluent, an acidic, citrate-rich matrix, the assay is deliberately run under simulated industrial conditions (pH 5.0 and 30 °C) so that the measured activity reflects performance in the intended operating window rather than at each enzyme’s individual optimum.",
          ],
        },
      ],
    },
    {
      id: "section-bispnpp-discontinuous-application-to-our-project",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "This assay was chosen, rather than for example a molybdenum-blue phosphate-release assay or a coupled continuous assay, because it is simple, inexpensive, requires no ancillary enzymes and, crucially, tolerates the acidic reaction pH that defines the rePhlow use case while still delivering a strong, linear optical signal after alkaline quenching.",
            "Within the enzyme-production work-block the objective is twofold: to confirm that the recombinant hydrolases selected by bioinformatic mining are catalytically active after expression and purification, and to rank them by intrinsic catalytic efficiency under industrial conditions, so that the best candidates can be prioritised for the downstream immobilised phosphorus-recovery bioreactor. We expected all three purified enzymes to show measurable, time-dependent pNP accumulation, and we expected the initial rates, once normalised to the amount of protein in each assay, to differ between variants. The information sought from these curves is the specific activity (U/mg) of each enzyme, because it is the mass-normalised metric that governs how much biocatalyst must be loaded onto the support to reach a target processing capacity.",
          ],
        },
      ],
    },
    {
      id: "section-bispnpp-discontinuous-technique-requirements",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Instrument, optical parameters and reaction conditions of the discontinuous bis-pNPP assay.",
              headers: ["Parameter", "Value"],
              rows: [
                [
                  "Instrument",
                  "BMG Labtech multimode microplate reader, endpoint absorbance mode",
                ],
                [
                  "Sample requirement",
                  "Reactions read in a transparent flat-bottom 96-well microplate; each well contains the quenched reaction (aliquot + 1 M NaOH), bubble-free, total volume ≈ 200 µL to give a defined optical path",
                ],
                ["Measurement mode", "Endpoint absorbance"],
                ["Detection wavelength", "405 nm (p-nitrophenolate)"],
                [
                  "Lambert–Beer parameters",
                  "Micromolar extinction coefficient of pNP ε = 0.0185 µM⁻¹cm⁻¹; optical path l = 0.56 cm (96-well plate at ≈ 200 µL)",
                ],
                ["Reaction / incubation temperature", "30 °C"],
                ["Replicates", "3 per enzyme; 1 read per well"],
              ],
            },
          },
        },
        {
          id: "section-bispnpp-discontinuous-sample-preparation",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Sample type measured: IMAC-purified recombinant enzyme in dialysis buffer (10 mM Tris-HCl pH 7.0, 100 mM NaCl). Preparation is minimal by design, which is one of the strengths of the assay. After purification, each enzyme was dialysed to remove imidazole, which can interfere with metal-dependent activity and shifts the buffer away from the reaction pH, and concentrated by ultrafiltration [5]. Immediately before the assay the enzyme stock was kept on ice and, where necessary, diluted in reaction buffer so that product accumulation remained within the linear response range and did not saturate the detector during the initial-rate window.",
                "The chromogenic substrate working solution was prepared fresh by mixing 32 µL of 25 mM bis-pNPP with 688 µL of 50 mM citrate buffer (pH 5.0); citrate was chosen deliberately because the effluent generated by acid degumming of industrial oils is rich in citric acid and its salts, so the buffer itself contributes to a realistic matrix. Reactions were tempered for 5 min at 30 °C and started by adding 80 µL of enzyme, keeping a constant 9:1 substrate-to-enzyme ratio. A spontaneous-hydrolysis (enzyme-free) control was prepared in parallel by replacing the enzyme with distilled water, so that non-enzymatic background hydrolysis could be subtracted from every time point. At 0, 2, 5, 10, 15, 20 and 30 min, 100 µL of reaction was transferred to a 96-well plate well pre-loaded with 100 µL of 1 M NaOH, which stops the reaction and develops the pNP colour. The t = 0 point was prepared directly in the well (90 µL substrate mix + 10 µL enzyme) to contain the same enzyme amount as the other aliquots.",
                "No deviation from the standard protocol was required. The laboratory-level points worth noting are that bis-pNPP working solutions were made immediately before use and protected from prolonged light exposure, and that the alkaline quench must be dispensed into the plate before transferring the reaction aliquots so that catalysis is stopped at precisely the intended time.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-bispnpp-discontinuous-results",
      title: "Results",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/bispnpp-discontinuous-progress-curves-bradford-calibration-and-initial.jpg",
            alt: "Progress curves, Bradford calibration and initial-rate region for the three purified hydrolases",
            caption:
              "Kinetic characterisation of the three purified recombinant hydrolases (PhyA, AphA and M2-32) by the discontinuous bis-pNPP assay at pH 5.0 and 30 °C. (A) Time-course of released pNP concentration (µM); dashed lines show the fit to a hyperbolic function by non-linear regression. (B) Bradford calibration line (BSA standard) used to determine the protein concentration of each variant. (C) Linear region (0–1 min) of the progress curve, whose slope equals the initial rate used to compute specific activity. Data are means of three independent replicates ± SD.",
          },
        },
        {
          paragraphs: [
            "The results of this measurement are the pNP release–time profiles for the three purified enzymes and the derived specific activities.",
            "At the raw, macroscopic level the three enzymes appeared very different: PhyA accumulated ≈ 27 µM pNP at 30 min, roughly 2.5-fold more than AphA and M2-32, which converged around 11 µM. However, comparing raw product accumulation is misleading if the mass of biocatalyst in each assay is not accounted for. Bradford quantification showed markedly different protein loads (M2-32 0.337 mg/mL, PhyA 0.299 mg/mL, AphA only 0.186 mg/mL), so the initial rates were normalised to protein mass.",
            "Once normalised, the ranking inverts relative to the raw curves: AphA is the most efficient catalyst (0.2223 U/mg), followed by M2-32 (0.1608 U/mg) and then PhyA (0.1406 U/mg). In other words, AphA produced almost the same amount of pNP as M2-32 while requiring ≈ 45% less enzyme mass, so on a per-milligram basis the definitive order of intrinsic catalytic efficiency in acid medium is AphA > M2-32 > PhyA.",
          ],
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Volumetric activity, protein concentration and specific activity of the three purified recombinant hydrolases obtained from the initial-rate analysis.",
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
          },
        },
        {
          callouts: [
            {
              kind: "outcome",
              text: "This matched our expectation that raw and specific activity could dissociate, and it directly answers the block objective: AphA (a non-specific acid phosphatase with high specific activity) [4] and PhyA (the only phytase carried through, unique in releasing the multiple phosphates of phytate) emerge as the key components for the modular phosphorus-recovery bioreactor.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "not-done",
              text: "Next experimental steps: extend the characterisation from single-point specific activity to full Michaelis–Menten kinetics [6] (Kₘ, k꜀ₐₜ) against bis-pNPP and, ideally, against real degumming substrate; assess pH and thermal stability across the operating window; and carry AphA and PhyA into the immobilisation work-block, re-measuring specific activity after immobilisation to quantify activity retention. Had any enzyme shown no activity, the most likely causes would have been misfolding or loss of a required metal cofactor during dialysis.",
            },
          ],
        },
      ],
    },
  ],
  references: [
    "[1] Andersch MA, Szczypinski AJ. Use of p-nitrophenylphosphate as the substrate in determination of serum acid phosphatase. American Journal of Clinical Pathology. 1947;17(7_ts):571-4. Available from: https://doi.org/10.1093/ajcp/17.7_ts.571",
    "[2] Rezende AA, Pizauro JM, Ciancaglini P, Leone FA. Phosphodiesterase activity is a novel property of alkaline phosphatase from osseous plate. Biochemical Journal. 1994;301(2):517-22. Available from: https://doi.org/10.1042/bj3010517",
    "[3] Huang H, Luo H, Yang P, Meng K, Wang Y, Yuan T, et al. A novel phytase with preferable characteristics from Yersinia intermedia. Biochemical and Biophysical Research Communications. 2006;350(4):884-9. Available from: https://doi.org/10.1016/j.bbrc.2006.09.118",
    "[4] Thaller MC, Schippa S, Bonci A, Cresti S, Rossolini GM. Identification of the gene (aphA) encoding the class B acid phosphatase/phosphotransferase of Escherichia coli MG1655 and characterization of its product. FEMS Microbiology Letters. 1997;146(2):191-8. Available from: https://doi.org/10.1111/j.1574-6968.1997.tb10192.x",
    "[5] Green MR, Sambrook J. Molecular cloning: a laboratory manual. 4th ed. Cold Spring Harbor (NY): Cold Spring Harbor Laboratory Press; 2012. ISBN 978-1-936113-42-2",
    "[6] Bianchi A, Giachetti E, Vanni P. A continuous spectrophotometric assay for alkaline phosphatase with glycerophosphate as substrate. Journal of Biochemical and Biophysical Methods. 1994;28(1):35-41. Available from: https://doi.org/10.1016/0165-022x(94)90062-0",
  ],
};

const BRADFORD: ExperimentData = {
  id: "bradford",
  tabLabel: "Bradford assay",
  title:
    "Total protein quantification — Bradford (Coomassie dye-binding) assay",
  body: [
    {
      paragraphs: [
        "The Bradford assay is a fast, sensitive and widely used colorimetric method for quantifying total protein concentration in solution. It is based on the binding of the dye Coomassie Brilliant Blue G-250 to protein: in acidic solution the free dye is predominantly in a reddish cationic form that absorbs around 465 nm, but on binding to protein, mainly through interactions with basic and aromatic residues, it is stabilised in an anionic blue form with an absorbance maximum at 595 nm. The increase in absorbance at 595 nm is therefore proportional to the amount of protein present, and unknown concentrations are read against a calibration curve built with a protein standard [1].",
        "The method’s speed, its compatibility with a microplate format and its minimal reagent requirements make it ideal for routinely quantifying the many fractions generated during recombinant enzyme expression and purification. Its main practical limitation is a non-linear response outside a narrow concentration window [2], which is managed by diluting concentrated samples so their signal falls within the linear range of the standard curve.",
      ],
    },
    {
      id: "section-bradford-application-to-our-sample",
      title: "Application to our sample",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The samples measured are aqueous protein solutions: purified recombinant enzyme preparations (PhyA, AphA, M2-32) and the concentrated commercial Lecitase® Ultra stock. In general, soluble protein preparations are well suited to the Bradford assay because the dye binds proteins in solution rapidly and the read-out requires no digestion or heating [3]; the assay is, however, sensitive to some buffer components and detergents, so buffer composition must be kept consistent between samples and standards.",
            "Our specific samples are single-protein preparations whose mass concentration must be known in order to normalise enzymatic activity: knowing U/mL alone is insufficient to compare enzymes, because it does not account for how much protein each assay contained. For the recombinant panel, the Bradford value converts volumetric activity into specific activity (U/mg); for the concentrated Lecitase® Ultra stock, the same measurement establishes the mass of enzyme used in the immobilisation experiments and the reference specific activity of the free enzyme. Because these samples span a wide concentration range, the assay is applied with an appropriate dilution series so that every reading falls within the linear range of the standard.",
          ],
        },
      ],
    },
    {
      id: "section-bradford-application-to-our-project",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "Bradford quantification was chosen over alternatives such as the Lowry assay or absorbance at 280 nm because it is faster, more tolerant and, unlike A₂₈₀, does not require knowledge of each protein’s extinction coefficient or a pure, nucleic-acid-free sample, which is important when handling several different enzymes.",
            "The objective within the enzyme-production block is to provide the protein-mass denominator that turns raw activity measurements into mass-normalised specific activities, so enzymes of different identity and abundance can be compared on equal footing, and so the correct amount of biocatalyst can later be loaded onto the support. We expected to obtain a linear BSA calibration curve over the working range and, from it, distinct protein concentrations for each enzyme preparation; combined with the activity assays, these values were expected to reorder the enzymes by intrinsic efficiency (since raw activity and specific activity can dissociate). The information sought is simply an accurate mg/mL value per sample, which is the input required by the specific-activity and immobilisation-yield calculations elsewhere in the project.",
          ],
        },
      ],
    },
    {
      id: "section-bradford-technique-requirements",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Instrument, standard series and plate settings of the Bradford assay as run in this work.",
              headers: ["Parameter", "Value"],
              rows: [
                [
                  "Instrument",
                  "BMG Labtech multimode microplate reader, endpoint absorbance mode",
                ],
                [
                  "Sample requirement",
                  "Clear flat-bottom 96-well microplate; each well contains sample plus Bradford reagent, mixed and bubble-free",
                ],
                ["Measurement mode", "Endpoint absorbance"],
                [
                  "Detection wavelength",
                  "595 nm (protein-bound Coomassie form). If applying the linearised protocol, also read 450 nm and use the A₅₉₅/A₄₅₀ ratio",
                ],
                [
                  "Standard",
                  "BSA calibration series (0–0.5 mg/mL for dilute samples; extended range for the concentrated stock), triplicate per sample and standard",
                ],
                [
                  "Colour-development time before reading",
                  "1 min; 1 read per well",
                ],
                ["Plate-shake settings", "200 rpm, 15 min"],
              ],
            },
          },
        },
        {
          id: "section-bradford-sample-preparation",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Sample type measured: purified enzyme, or commercial stock, in its storage or reaction buffer. Preparation centres on dilution and standard matching. A standard calibration series was prepared with bovine serum albumin (BSA) as the reference protein [1] across a defined range (0–0.5 mg/mL for the recombinant panel; for the very concentrated Lecitase® Ultra stock a higher-range BSA series was used and the stock itself was serially diluted, for example 1:10 to 1:60, until an absorbance within the linear range was obtained). In the microplate format [4], a fixed small volume of sample (10 µL) was mixed with the Bradford reagent (200 µL) directly in the wells, and absorbance was read at 595 nm; all measurements were performed in triplicate to control pipetting variability at these small volumes.",
                "It is essential that samples and standards share the same buffer and that deionised water, not the zero-protein dye blank, is used as the reference where the protocol requires, because buffer mismatch and blank choice are the main sources of error in dye-binding assays. No modification of the standardised protocol was needed beyond the dilution strategy required to bring the concentrated Lecitase® Ultra stock into the linear range; the dilution giving the lowest replicate error (1:60 for the stock) was selected as the reference for calculating the stock concentration.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-bradford-results",
      title: "Results",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The results are the BSA calibration lines and the interpolated protein concentrations for each sample.",
            "The BSA calibration was linear across the working range (R² = 0.98), validating the interpolation. For the recombinant panel, the assay revealed substantially different protein loads (M2-32 > PhyA > AphA), which was exactly the information needed to interpret the activity data: although M2-32 and AphA released almost identical amounts of pNP, AphA did so with ≈ 45% less protein, so normalising by the Bradford values reordered the enzymes to AphA > M2-32 > PhyA by specific activity.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/bradford-bradford-calibration-line-with-the-apha.jpg",
            alt: "Bradford calibration line with the AphA, PhyA and M2-32 samples interpolated",
            caption:
              "Bradford calibration line (BSA standard) with interpolation of the AphA, PhyA and M2-32 samples (A₅₉₅ = 0.7079 · [protein] + 0.1861; R² = 0.9837).",
          },
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Interpolated protein concentrations of the recombinant panel and the specific activities they yield: M2-32 0.337 mg/mL; PhyA 0.299 mg/mL; AphA 0.186 mg/mL.",
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
          },
        },
        {
          paragraphs: [
            "For the Lecitase® Ultra stock, the dilution with the lowest error (1:60) gave a consistent estimate of ≈ 40 mg/mL and, combined with the activity assay, a specific activity of ≈ 981 U/mg, the reference used throughout the immobilisation work. These outcomes met expectations: a clean linear standard and per-sample concentrations that meaningfully changed the comparison between enzymes.",
          ],
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Average A₅₉₅ of the Lecitase® Ultra dilution series (1:10 to 1:60) and the derived stock concentration (≈ 40 mg/mL).",
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
          },
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Readings behind the Lecitase® Ultra stock concentration: each ΔA with the protein concentration interpolated from it, and the stock value derived from them.",
              headers: [
                "ΔA348/min",
                "[protein] (mg/mL)",
                "[protein]stock (mg/mL)",
              ],
              rows: [
                ["0.1632", "0.653", "39.856"],
                ["0.1724", "0.674", ""],
              ],
            },
          },
        },
        {
          callouts: [
            {
              kind: "learn",
              text: "The main source of uncertainty is the assay’s intrinsic non-linearity and buffer sensitivity; keeping standards in the same buffer and working within the linear range, as done here via dilution, is the practical mitigation, and the observed low replicate error at the selected dilutions supports the reliability of the reported values.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "not-done",
              text: "Next steps: where the highest accuracy is needed, apply the linearised Bradford read-out (A₅₉₅/A₄₅₀ ratio) to widen the reliable range and reduce dilution dependence [2]; cross-check key concentrations with an orthogonal method, for example A₂₈₀ with the calculated extinction coefficient, for the purified single proteins; and continue to pair every activity measurement with a Bradford quantification so all downstream activities remain mass-normalised.",
            },
          ],
        },
      ],
    },
  ],
  references: [
    "[1] Bradford MM. A rapid and sensitive method for the quantitation of microgram quantities of protein utilizing the principle of protein-dye binding. Analytical Biochemistry. 1976;72(1-2):248-54. Available from: https://doi.org/10.1016/0003-2697(76)90527-3",
    "[2] Zor T, Selinger Z. Linearization of the Bradford protein assay increases its sensitivity: theoretical and experimental studies. Analytical Biochemistry. 1996;236(2):302-8. Available from: https://doi.org/10.1006/abio.1996.0171",
    "[3] Kruger NJ. The Bradford method for protein quantitation. In: Walker JM, editor. The Protein Protocols Handbook. Totowa (NJ): Humana Press; 2009. p. 17-24. Available from: https://doi.org/10.1007/978-1-59745-198-7_4",
    "[4] Redinbaugh MG, Campbell WH. Adaptation of the dye-binding protein assay to microtiter plates. Analytical Biochemistry. 1985;147(1):144-7. Available from: https://doi.org/10.1016/0003-2697(85)90020-x",
  ],
};

export const ENZYMATIC_IMMOBILISATION_SUMMARY =
  "Phosphatase activity, protein mass and immobilisation yield";

export const ENZYMATIC_IMMOBILISATION_CHARACTERISATION = [
  "Three measurements carry this block, and they are layered rather than independent. A dye-binding protein assay gives the mass of biocatalyst in every reaction, calibrated each session against a standard series rather than assumed from a stock label. A chromogenic activity assay gives the rate at which an enzyme releases product, read as the appearance of p-nitrophenol and converted to absolute concentration through a known extinction coefficient and the actual optical path, which in a microplate is set by the fill volume and not by the cuvette convention of 1 cm. Dividing the second by the first gives specific activity, the only figure on which enzymes or supports are compared here.",
  "The immobilisation measurement itself is differential, and this is the part that needed the most care. At each time point the whole suspension reports the activity of free plus bound enzyme, while the clarified supernatant reports only what remains free; the difference is the immobilised activity and its ratio to the total is the yield. That subtraction can go wrong in two directions, so both are controlled. Residual support particles scatter light and would inflate the apparent activity of the supernatant, so the sedimentation step is specified and the supernatant is required to be optically clear, while the same step must not carry down free enzyme with the beads. And an enzyme losing activity by denaturation rather than by binding would look identical to one being immobilised, which is why a support-free incubation runs alongside to confirm the enzyme is stable over the measurement window.",
  "The technique pages give the parameters that change the answer rather than a general description: buffer and pH, reaction temperature, wavelength and why that wavelength was chosen, the extinction coefficient and path length used for the conversion, the quench and its timing for the discontinuous format, the sedimentation conditions, the number of replicates, and the dilution range inside which the protein assay stays linear. They also state the known weaknesses, namely that dye-binding quantification is intrinsically non-linear and sensitive to buffer composition, which is why standards and samples share a buffer and why the dilution with the lowest replicate error is the one carried forward. For another team, the transferable part is not our particular enzyme but the differential scheme: free versus total activity against time, with a scattering control and a support-free control, is how any immobilisation on a particulate support can be quantified without ever measuring the solid.",
];

export const ENZYMATIC_IMMOBILISATION_CONCLUSIONS = [
  "These measurements changed decisions rather than confirming them. Mass normalisation inverted the ranking of our phosphohydrolase panel, so the enzyme that looked strongest by raw product release was not the one carried forward, and the differential yield measurement showed the two immobilisation chemistries responding in opposite directions to the same detergent, which is not something either could have been predicted into. That second result also separates a good yield from a useful one: both routes bound a similar fraction of the activity offered to them, while the amount of activity actually immobilised differed roughly ten-fold, so the chemistry was chosen on the absolute figure rather than the percentage.",
  "What remains open is named in the technique pages with the experiment that would settle it: retained specific activity per milligram of immobilised enzyme, operational stability over repeated cycles, and whether the selected protocol behaves the same way on the genipin, chitosan and alginate matrix the project actually uses, which is the transfer this whole characterisation exists to inform.",
];

export const ENZYMATIC_IMMOBILISATION_MEASUREMENTS: ExperimentData[] = [
  PNPB_CONTINUOUS,
  BISPNPP_DISCONTINUOUS,
  BRADFORD,
];
