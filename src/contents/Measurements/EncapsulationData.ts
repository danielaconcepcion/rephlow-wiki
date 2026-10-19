import type { ExperimentData } from "../../components/LabFolders/types";

const FTIR: ExperimentData = {
  id: "ftir",
  tabLabel: "FTIR",
  title: "Fourier-transform infrared spectroscopy (FTIR-ATR)",
  body: [
    {
      paragraphs: [
        "FTIR spectroscopy is a versatile analytical technique used to identify chemical structures by measuring the absorption of infrared radiation at specific wavelengths, expressed as wavenumbers (cm⁻¹). In the study of polysaccharides like **alginate**, this method provides a “fingerprint” of the molecular vibrations within the sample.",
        "The technique operates by measuring how much infrared light a sample absorbs at different frequencies, which corresponds to the vibrational modes of specific chemical bonds. The integration of attenuated total reflectance (ATR) with FTIR has significantly enhanced its utility for biological materials: ATR-FTIR is a direct and non-destructive method that requires minimal sample preparation, often needing only a few milligrams of dried material, and it is exceptionally fast, providing results in minutes compared to the days required for traditional chemical extractions [1]. Furthermore, advanced software allows for the conversion of parent spectra into second-derivative spectra, a process that helps resolve overlapped bands and sharpen weak signals, providing more detailed structural information than the raw spectrum alone [2].",
      ],
    },
    {
      id: "section-ftir-application-to-our-sample",
      title: "Application to our sample",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "Alginate is a natural polysaccharide composed of β-D-mannuronic acid (M) and α-L-guluronic acid (G) residues. FTIR is used to characterise its chemical form, purity and monomeric composition.",
            "The most prominent feature in an alginate spectrum is the position of the carbonyl group, which identifies whether the sample is a salt (sodium alginate) or a free acid (alginic acid): in sodium alginate this group appears as a carboxylate anion (COO⁻) at approximately 1600–1615 cm⁻¹, whereas in alginic acid it shifts to a carboxylic acid ester form at approximately 1715–1730 cm⁻¹ [1]. Typical alginate spectra also include several other diagnostic regions: a broad band at 3260–3427 cm⁻¹ assigned to hydrogen-bonded O–H stretching vibrations, a weak signal at 2926–2927 cm⁻¹ caused by C–H stretching, a band at 1406–1415 cm⁻¹ assigned to C–OH deformation with a contribution from COO⁻ symmetric stretching, and an intense absorption at 1024–1035 cm⁻¹ due to C–O and C–C stretching of the pyranose ring, common to all polysaccharides [2].",
            "The fingerprint or anomeric region (950–700 cm⁻¹) is the most critical for distinguishing between mannuronic (M) and guluronic (G) blocks: mannuronic acid is marked by signals at ~888 cm⁻¹ (C1–H deformation) and ~817–822 cm⁻¹, while guluronic acid shows deformation vibrations at ~902–903 cm⁻¹ and characteristic bands at ~781–787 cm⁻¹ [2]. The M/G ratio is estimated by comparing the intensities of specific bands, such as 808/787 cm⁻¹ [4] or 1030/1080 cm⁻¹ [5]; the absorbance (A) of each band is calculated as A = log(T_baseline/T_peak) [6], and the quotient of these values provides the M/G estimate. The physical significance of this ratio is well established: an M/G ratio greater than 1 (higher M content) generally results in soft and elastic gels, while an M/G ratio below 1 (higher G content) produces strong and rigid gels [4].",
          ],
        },
      ],
    },
    {
      id: "section-ftir-application-to-our-project",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "ATR-FTIR was selected over slower compositional techniques (for example **acid hydrolysis** followed by chromatographic separation, or ¹H NMR) because it requires minimal sample preparation and delivers results within minutes rather than days [1, 5]. Since the mechanical and gelling behaviour of alginate hydrogels is directly governed by the M/G composition of the raw material, and this composition depends on the algal source and batch, we could not treat “alginate” as a known quantity before starting bead and **core-shell** design work. The objective of this experiment was to determine the chemical form of our raw material and estimate its approximate M/G ratio, informing the crosslinker concentrations and gelation conditions to be tested in the subsequent encapsulation experiments.",
            "We expected a spectrum consistent with the sodium salt form (carboxylate band at ~1600–1615 cm⁻¹, rather than the ~1715–1730 cm⁻¹ band of alginic acid), together with a resolvable pair of M/G marker bands in the 950–700 cm⁻¹ region, allowing a semi-quantitative M/G estimate following Mackie [4] and Sakugawa [5]. This result would indicate whether our batch is expected to behave as a softer and more elastic (M-rich) or a stronger and more rigid (G-rich) gel, directly guiding the crosslinker concentration and maturation time chosen for the following bead-formation experiments.",
          ],
        },
      ],
    },
    {
      id: "section-ftir-technique-requirements",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/ftir-ftir-atr-spectrometer-used-to-characterise.jpg",
            alt: "FTIR-ATR spectrometer used to characterise the sodium alginate powder",
            caption:
              "FTIR-ATR equipment used for the characterisation of sodium alginate powder. The sample was placed directly onto the ATR crystal and pressed with the accessory’s applicator to ensure adequate contact with the evanescent wave, requiring no prior preparation such as KBr pellet formation or mineral oil mulling [3].",
          },
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Instrument, acquisition and processing parameters of the ATR-FTIR measurement.",
              headers: ["Parameter", "Value"],
              rows: [
                [
                  "Instrument",
                  "Nicolet iS50 FTIR spectrometer (Thermo Scientific) with Ever-Glo IR source, KBr beam splitter and DTGS-KBr detector",
                ],
                [
                  "Sampling technique",
                  "Attenuated total reflectance, multiple-bounce H-ATR accessory (Spectra Tech) with a ZnSe crystal, 13 internal reflections",
                ],
                [
                  "Sample requirement",
                  "Dry sodium alginate powder, pressed into even contact with the crystal; no window, mull or pellet preparation needed",
                ],
                ["Spectral range", "400 to 4000 cm⁻¹"],
                ["Spectral resolution", "0.09 cm⁻¹"],
                ["Data spacing", "0.482 cm⁻¹"],
                [
                  "Background",
                  "Clean, dry crystal, recorded immediately before each sample under the same conditions",
                ],
                [
                  "Smoothing",
                  "Savitzky-Golay, window converted from cm⁻¹ to points as N = window ÷ data spacing, so the same smoothing can be reproduced on an instrument with a different spacing",
                ],
                [
                  "Diagnostic band pairs",
                  "808 cm⁻¹ (M) / 787 cm⁻¹ (G); 1030 cm⁻¹ (M) / 1080 cm⁻¹ (G)",
                ],
                [
                  "Baseline",
                  "Linear, drawn between the two local transmittance minima flanking each band pair",
                ],
                [
                  "Derived quantity",
                  "A = log₁₀(Tb/Tp) at each diagnostic wavenumber; M/G = A(M band) / A(G band)",
                ],
                [
                  "Validity check",
                  "Absence of a carbonyl band near 1730 cm⁻¹ alongside a strong carboxylate band, confirming the material is the sodium salt and not the protonated free acid",
                ],
                [
                  "Known limitation",
                  "The ratio is semi-quantitative and depends on the baseline drawn and on the smoothing applied, so it places the alginate on the M to G scale but does not give an absolute composition",
                ],
              ],
            },
          },
        },
        {
          id: "section-ftir-sample-preparation",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Solid samples for infrared spectroscopy are traditionally prepared as KBr pellets or mineral oil mulls, both requiring additional handling that can introduce artefacts [3]. By contrast, FTIR-ATR requires no such preparation: solid samples can be measured directly, provided sufficient contact is achieved between the sample and the crystal [3], an approach previously applied to dried algal polysaccharide powders with good **reproducibility** [1].",
                "The commercial sodium alginate powder was used directly as supplied. A small amount (a few milligrams) was placed onto the ATR crystal and pressed with the accessory’s applicator to ensure firm contact, since the evanescent wave penetrates only a few micrometres into the sample [3]. A background spectrum was recorded before each measurement to correct for atmospheric CO₂ and water vapour.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-ftir-results",
      title: "Results",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "A single ATR-FTIR spectrum of the commercial sodium alginate powder was acquired over 4000–400 cm⁻¹, giving 7,468 data points at 0.482 cm⁻¹ spacing. Because no in-house alginate standard was available, and the supplier provided no M/G information, the measurement was validated against published band positions for a commercial sodium alginate standard recorded by the same technique [1]. Second-derivative spectra were used for the comparison, since the derivative locates band centres more precisely than the parent spectrum.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/ftir-atr-ftir-transmission-spectrum-of-commercial.jpg",
            alt: "ATR-FTIR transmission spectrum of commercial sodium alginate powder between 4000 and 400 cm⁻¹ with assigned bands",
            caption:
              "ATR-FTIR spectrum (% transmission, 4000–400 cm⁻¹) of the commercial sodium alginate powder, with major absorption bands assigned by comparison with published reference spectra [1]. Annotated bands include: O–H stretch (3287 cm⁻¹), C–H stretch (2933 cm⁻¹), asymmetric COO⁻ stretching (1596 cm⁻¹), symmetric COO⁻ stretching (1407 cm⁻¹), C–C–H / O–C–H deformation (1299 cm⁻¹), C–O / C–C ring vibrations (1081 and 1027 cm⁻¹), and fingerprint-region bands (949, 885, 814 and 787 cm⁻¹) characteristic of guluronate (G) and mannuronate (M) residues.",
          },
        },
        {
          paragraphs: [
            "The spectrum showed the band pattern expected for an alginate salt: a broad O–H envelope at 3287 cm⁻¹, C–H stretching at 2933 cm⁻¹, and an intense carboxylate band at 1595.8 cm⁻¹ with its symmetric contribution at 1406.8 cm⁻¹, with no absorption near 1730 cm⁻¹. In the fingerprint region it showed bands at 1081.4 and 1026.9 cm⁻¹, 948.8 cm⁻¹, 885.2 cm⁻¹ and a single maximum at 814.3 cm⁻¹. The commercial powder is therefore sodium alginate in the salt form, with no detectable free alginic acid, and it is suitable for use in the encapsulation platform as supplied, with no conversion or **purification** step.",
            "A Savitzky–Golay filter was applied with a third-order polynomial and a 35-point window. The window size was derived rather than copied. A Savitzky–Golay window of N points spans N × (data spacing) in cm⁻¹, so the point counts quoted in the literature correspond to different physical smoothing widths on instruments with different data spacing. At our 0.482 cm⁻¹ spacing, 35 points corresponds to approximately 17 cm⁻¹.",
            "Second-derivative analysis resolved the anomeric region, which in the parent spectrum shows only the single maximum at 814.3 cm⁻¹, into minima at 821.5 cm⁻¹ (M) and 778.1 cm⁻¹ (G), together with 1080.4, 1026.4, 950.2, 931.9, 889.5 and 877.5 cm⁻¹.",
          ],
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Second-derivative band positions of the commercial sodium alginate powder, compared with two published reference spectra recorded by the same technique.",
              headers: [
                "Experimental (cm⁻¹)",
                "Bibliography [1]",
                "Δ",
                "Bibliography [2]",
                "Δ",
                "Assignment",
              ],
              rows: [
                [
                  "778.14",
                  "778.7",
                  "−0.6",
                  "781.3",
                  "−3.2",
                  "α-L-guluronic acid residues (G)",
                ],
                [
                  "821.53",
                  "819.7",
                  "+1.8",
                  "824.5",
                  "−3.0",
                  "Mannuronic acid residues (M)",
                ],
                [
                  "889.51",
                  "881.2",
                  "+8.3",
                  "880.4",
                  "+9.1",
                  "C1–H deformation, β-D-mannuronate",
                ],
                ["931.93", "930.2", "+1.7", "933.5", "−1.6", "—"],
                [
                  "950.25",
                  "950.7",
                  "−0.5",
                  "943.7",
                  "+6.5",
                  "C–O stretching, uronic acid residues",
                ],
                [
                  "1026.43",
                  "1026.0",
                  "+0.4",
                  "1028.2",
                  "−1.8",
                  "C–O / C–C stretching, pyranose ring",
                ],
                [
                  "1080.42",
                  "1085.1",
                  "−4.7",
                  "—",
                  "—",
                  "C–O / C–C stretching, pyranose ring",
                ],
              ],
            },
          },
        },
        {
          paragraphs: [
            "Six of the seven positions fall within 5 cm⁻¹ of the published standard, four of them within 2 cm⁻¹. The agreement across the whole fingerprint region, rather than at one or two convenient bands, is what establishes that the instrument, the sampling geometry and the processing chain were working as intended.",
          ],
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "M/G ratio estimated from two band pairs, with the corresponding monomer percentages and the published value for the same commercial standard [1].",
              headers: [
                "Band pair",
                "M/G ratio",
                "%M",
                "%G",
                "Reference value [1]",
              ],
              rows: [
                ["808 / 787 cm⁻¹ [4]", "1.19", "54.3", "45.7", "1.2"],
                ["1030 / 1080 cm⁻¹ [5]", "1.59", "61.3", "38.7", "1.7"],
              ],
            },
          },
        },
        {
          paragraphs: [
            "The two pairs were treated as mutual cross-checks rather than averaged. They agree in direction and both land close to the published standard, 1.19 against 1.2 and 1.59 against 1.7, as well as within the 0.5–2.5 range reported for brown seaweed alginates [1]. The residual disagreement between pairs is a known property of the method, not a measurement error: the same authors report 1.2 and 1.7 for their own standard using these same two pairs [1]. The alginate is therefore mannuronic-rich, and two observations independent of the ratio calculation point the same way. No band was detected near 902 cm⁻¹, where C1–H deformation of α-L-guluronic acid residues is reported [2], consistent with a mannuronic-rich material. And the C–O stretching band near 948 cm⁻¹ resolved into two components, at 950.25 and 931.93 cm⁻¹; Leal et al. report the same band splitting into components near 951 and 936 cm⁻¹ specifically in homopolymannuronic fractions [2], so this too is consistent with an M-rich sample. Calcium-alginate gels from this material are therefore expected to be softer and more elastic rather than stiff, which set the expectation carried into the bead and core-shell work.",
            "Validation of the measurement thus rested on three independent comparisons: band positions against a published commercial standard across seven bands, M/G against the same standard’s published values, and the two band pairs against each other.",
            "Two details matter for anyone reusing this method. The 808/787 pair originates from work on alginic acid, and in the salt form the corresponding bands sit near 820 and 779 cm⁻¹. The 1030/1080 combination was calibrated against mannuronate content in divalent alginate salts measured as KBr pellets, selecting 1080 cm⁻¹ as an internal standard because it is common to both uronic acids [5]; using the raw quotient as an M/G value follows the later adaptation [1], and the original **calibration curve** is not transferable to a sodium alginate measured by ATR. Alongside these, the rule for converting a Savitzky–Golay window between instruments, N = window in cm⁻¹ ÷ data spacing in cm⁻¹, makes the second-derivative step reproducible on any spectrometer rather than only on one with the same data spacing.",
          ],
        },
        {
          callouts: [
            {
              kind: "learn",
              text: "**This analysis offers a semi-quantitative estimate conditional on spectral quality [1, 4], and the limitation is intrinsic rather than procedural.** FTIR reports the overall proportion of M and G residues but says nothing about how they are arranged along the chain. Since calcium **crosslinking** proceeds through consecutive G blocks in the egg-box arrangement [6, 8], gel stiffness depends on the length and abundance of those blocks rather than on the ratio itself [7, 9]. Our value indicates the direction of the expected mechanical behaviour but not its magnitude. Establishing block composition would require ¹H NMR, which was outside the scope of this work.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "outcome",
              text: "**FTIR-ATR established the chemical form and approximate composition of the raw material in minutes,** from a few milligrams of powder with no sample preparation, at the point in the project where that information was needed to begin designing the encapsulation experiments. This analysis was used as a screening and identity method rather than as a substitute for NMR.",
            },
          ],
        },
      ],
    },
  ],
  references: [
    "[1] Gómez-Ordóñez E, Rupérez P. FTIR-ATR spectroscopy as a tool for polysaccharide identification in edible brown and red seaweeds. Food Hydrocolloids. 2011;25(6):1514-20. Available from: https://doi.org/10.1016/j.foodhyd.2011.02.009",
    "[2] Leal D, Matsuhiro B, Rossi M, Caruso F. FT-IR spectra of alginic acid block fractions in three species of brown seaweeds. Carbohydrate Research. 2008;343(2):308-16. Available from: https://doi.org/10.1016/j.carres.2007.10.016",
    "[3] Skoog DA, Holler FJ, Crouch SR. Principles of instrumental analysis. 7th ed. Boston: Cengage Learning; 2018. ISBN 978-1-305-57721-3",
    "[4] Mackie W. Semi-quantitative estimation of the composition of alginates by infra-red spectroscopy. Carbohydrate Research. 1971;20(2):413-5. Available from: https://doi.org/10.1016/S0008-6215(00)81397-X",
    "[5] Sakugawa K, Ikeda A, Takemura A, Ono H. Simplified method for estimation of composition of alginates by FTIR. Journal of Applied Polymer Science. 2004;93(3):1372-7. Available from: https://doi.org/10.1002/app.20589",
    "[6] Grant GT, Morris ER, Rees DA, Smith PJC, Thom D. Biological interactions between polysaccharides and divalent cations: the egg-box model. FEBS Letters. 1973;32(1):195-8. Available from: https://doi.org/10.1016/0014-5793(73)80770-7",
    "[7] Lee KY, Mooney DJ. Alginate: properties and biomedical applications. Progress in Polymer Science. 2012;37(1):106-26. Available from: https://doi.org/10.1016/j.progpolymsci.2011.06.003",
    "[8] Wang Y, Zhao Y, He J, Sun C, Lu W, Zhang Y, et al. Doubling growth of egg-box structure during calcium-mediated molecular assembly of alginate. Journal of Colloid and Interface Science. 2023;634:747-56. Available from: https://doi.org/10.1016/j.jcis.2022.12.096",
    "[9] Toprakçı İ, Kurtulbaş E, Bozkurt RN, Şahin S. Coordination-driven assembly of alginate networks: from egg-box structures to bioactive delivery applications. Gels. 2026;12(9):774. Available from: https://doi.org/10.3390/gels12090774",
  ],
};

const IMAGEJ: ExperimentData = {
  id: "imagej",
  tabLabel: "ImageJ",
  title: "Image analysis (ImageJ)",
  body: [
    {
      paragraphs: [
        "ImageJ is an open-source image processing and analysis software developed by the National Institutes of Health (NIH) that enables quantitative measurements from digital images [1, 2]. It is widely used in biological and materials science research to extract geometric, morphological and dimensional information from photographs and microscopy images.",
        "After calibration using a known scale, ImageJ can accurately determine parameters such as area, perimeter, equivalent diameter, Feret diameters and circularity, allowing the analysis of large numbers of objects in a reproducible and semi-automated manner [1]. Because measurements are obtained directly from digital images without physically manipulating the sample, ImageJ provides a rapid, non-destructive and reproducible method for evaluating particle morphology, making it particularly suitable for analysing **alginate** beads and **core-shell** capsules, whose size, shape and homogeneity strongly influence encapsulation performance and mechanical behaviour [3].",
        "Within this project, ImageJ was applied to three distinct types of image, each capturing a different aspect of bead and capsule characterisation: whole, unbroken particles imaged intact; cross-sectioned particles imaged after freezing and cutting; and intact particles imaged repeatedly under progressively increasing mechanical load.",
      ],
    },
    {
      pairedResource: {
        kind: "table",
        table: {
          caption: "What each image-analysis measurement delivers.",
          headers: [
            "",
            "Intact particles",
            "Cross-sections",
            "Loaded capsules",
          ],
          rows: [
            [
              "Measured from the image",
              "Projected area, Feret diameters",
              "Shell thickness at several points",
              "Vertical and horizontal Feret diameters",
            ],
            [
              "Reported quantity",
              "Equivalent diameter, sphericity",
              "Mean thickness per capsule",
              "s/s₀, sphericity retained under load",
            ],
            [
              "Replication",
              "10 per condition",
              "10 per condition, about 10 points each",
              "9 per condition, 2 batches",
            ],
            [
              "Spatial calibration",
              "Millimetre grid in the sample plane",
              "Microscope scale",
              "None required, the quantity is a ratio within one image; camera geometry fixed between steps",
            ],
            [
              "Resolution limit",
              "About 0.1 mm in diameter, set by threshold and image scale",
              "60 to 90 μm within a single capsule",
              "Deformation only, no modulus or rupture load",
            ],
            [
              "What it decided",
              "Production conditions, on reproducibility",
              "Nothing, the spread exceeded the effect",
              "Flow-rate ratio and alginate concentration",
            ],
          ],
        },
      },
    },
    {
      id: "section-imagej-intact-beads-and-capsules-size-and-shape",
      title: "Intact beads and capsules: size and shape",
      group: true,
    },
    {
      paragraphs: [
        "Whole, unbroken beads and core-shell capsules are imaged directly under an optical or digital microscope, without cutting or fracturing the sample. Once captured, images are calibrated against a reference scale and, where needed, thresholded to isolate individual particles from the background, after which ImageJ’s particle-analysis tool extracts geometric parameters such as projected area, perimeter, equivalent diameter, and maximum and minimum Feret diameters, the longest and shortest distances between any two points along the particle boundary [3]. Shape is commonly quantified through a sphericity factor calculated from the maximum and minimum diameters of each particle [4]; we report sphericity as s = minor axis / major axis, so that a perfect sphere gives s = 1 and lower values indicate a more elongated particle. This approach has been used to characterise the diameter and sphericity of conventional alginate beads [3], core-shell floating beads [5], and liquid-core capsules [6, 7].",
      ],
    },
    {
      id: "section-imagej-application-to-our-project",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "ImageJ was selected for this measurement because it provides a rapid, objective and quantitative evaluation of particle morphology without requiring specialised instrumentation, and because measurements are obtained directly from digital images without physically manipulating the sample. Within the encapsulation workflow, intact-sphere imaging served two related purposes. The first was to characterise and compare the sphericity and size of beads produced under different conditions (varying alginate concentration, drop height, flowrate, **crosslinking** time), in order to select the conditions that yield the most homogeneous and reproducible particles. The second purpose was to monitor the structural preservation of beads and core-shell capsules over time, including swelling, shrinkage, or degradation, under storage or treatment conditions relevant to the bioreactor.",
            "We expected measurable, statistically comparable differences in diameter and sphericity across the tested formulations, allowing us to select a preferred one based on homogeneity and **reproducibility**. For the preservation assays, we expected a quantifiable trend in diameter and shape over time, indicating whether a given formulation remains structurally stable under the tested conditions or instead shows signs of swelling or degradation. Together, these results provide the primary decision criterion for narrowing down candidate formulations before proceeding to shell-thickness and mechanical characterisation.",
          ],
        },
      ],
    },
    {
      id: "section-imagej-technique-requirements",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The measurement needs three things: a particle whose whole outline falls inside the field of view, a scale in the same plane as that particle, and enough contrast between particle and background for a threshold to find the boundary in the same place every time. Magnification and illumination must also be held constant across all conditions being compared, since a threshold that shifts between images shifts every dimension read from them.",
            "Two processing choices follow from those requirements. Equivalent diameter was recomputed from the measured projected area as Deq = 2√(A/π) rather than taken from a derived column, so that size and area always refer to the same measured quantity. And sphericity was taken from the two Feret diameters of the same particle rather than from a perimeter-based circularity, because perimeter is the quantity most sensitive to threshold setting and image **resolution**, while the axis ratio is not.",
          ],
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Software, imaging and processing parameters of the intact-particle measurement.",
              headers: ["Parameter", "Value"],
              rows: [
                ["Software", "ImageJ"],
                [
                  "Image source",
                  "Digital microscope at fixed height, magnification and illumination; images saved as jpg",
                ],
                [
                  "Sample requirement",
                  "Whole particle inside the field of view, imaged wet, with its shadow touching neither another particle nor the edge nor the scale",
                ],
                [
                  "Spatial calibration",
                  "10 mm line drawn on the millimetre grid lying in the sample plane; Analyze → Set Scale, global",
                ],
                [
                  "Segmentation",
                  "Colour Threshold, one threshold per particle where a single one does not fit all; then 8-bit, Fill Holes, Smooth, Wand selection",
                ],
                [
                  "Validity check before measuring",
                  "Particle completely white, background completely black, wand outline enclosing the particle alone",
                ],
                [
                  "Measurements recorded",
                  "Area, Shape Descriptors, Perimeter, Fit Ellipse, Feret’s Diameter",
                ],
                [
                  "Derived quantities",
                  "Deq = 2√(A/π); s = minor axis / major axis of the fitted ellipse",
                ],
                ["Replication", "10 particles per condition"],
                [
                  "Known failure mode",
                  "Particle analysis counts each fragment of a broken bead as a bead, so the output degrades silently once particles start to break",
                ],
              ],
            },
          },
        },
        {
          id: "section-imagej-sample-preparation",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "No preparation beyond production was required. Whole, unbroken beads and capsules were transferred directly from their production or storage medium onto millimetre-grid paper and imaged while wet, since drying changes both size and shape. The grid provided the calibration scale in the same plane as the sample. Ten beads or capsules were imaged per condition. For the preservation series the same storage vessel was sampled at each time point over one week, with the particles returned to their medium after imaging.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-imagej-results",
      title: "Results",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "Across the twenty combinations of alginate concentration and drop height, the measurement separated the conditions on shape but not on size: mean equivalent diameters all fell between about 3.3 and 3.7 mm with no systematic trend, while sphericity ranged from 0.78 to 0.95. What made the comparison usable was not the means but the spread between the ten beads of each condition, which varied by a factor of five across conditions, from ±0.03 to ±0.14. A measurement that reports only a mean would have called several of these conditions equivalent; reporting the dispersion is what identified 3.5% (w/v) alginate at 3 cm as both the most spherical and the most reproducible.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/results/encapsulation/beads-sphericity-concentration.png",
            alt: "Bar chart of bead sphericity at each alginate concentration, grouped by the five drop heights",
            caption:
              "Sphericity of beads produced at each alginate concentration, with the five drop heights shown within each group (mean ± SD, n = 10). The spread between beads of the same condition, rather than the mean, is what separates the conditions.",
          },
        },
        {
          paragraphs: [
            "The flow-rate series shows the same point more sharply. From 500 to 3200 μL/min sphericity stayed between 0.92 and 0.95 with no trend, while at 400 μL/min the mean fell to 0.80 and the standard deviation rose to 0.157. Inspecting the individual values rather than the summary explains why: four of the ten beads had s between 0.53 and 0.74 against about 0.95 for the rest, so the condition is not uniformly worse but bimodal, a mixture of regular beads and beads with an unretracted tail. Per-particle data, which this method produces as a matter of course, is what distinguishes a shifted population from a contaminated one. The size trend over the same range, 3.50 to 3.71 mm, is about 6% in diameter and sits at the edge of what the method can resolve; it is reported as a trend because it is monotonic across seven conditions, not because any adjacent pair differs significantly (see Results).",
            "Crosslinking time left both descriptors unchanged between ten and sixty minutes, with contraction appearing only at ninety, a reduction of roughly 9% in diameter that the method resolves comfortably because it is several times the spread within the condition.",
            "The preservation series produced the one result that constrains how this measurement may be used. Beads in water changed by less than 5% over a week and capsules in most media likewise stayed within a few percent, but beads in phosphate buffer swelled by roughly 60% in projected area within 24 h and then disintegrated. Beyond that point the measurement stops being valid rather than merely imprecise, because particle analysis counts every fragment of a broken bead as a bead: a mean diameter computed over fragments falls as the beads fall apart, which would render catastrophic failure as gradual shrinkage. Those time points are therefore reported qualitatively, from the images, and no numbers are quoted for them. Any team using image analysis to follow particle stability over time needs that rule, because the failure is silent in the output. The full size series for each medium is on the Results page.",
          ],
        },
      ],
    },
    {
      id: "section-imagej-cross-sectioned-core-shell-capsules-shell-thickness",
      title: "Cross-sectioned core-shell capsules: shell thickness",
      group: true,
    },
    {
      paragraphs: [
        "Shell thickness measurement required access to the internal cross-section of core-shell capsules. These were therefore flash-frozen in liquid nitrogen to preserve their structure without deformation, then cut in half. The cross-section was placed under the microscope with a coverslip laid on top, and shell thickness was measured with ImageJ from the calibrated image. Cryo-fracturing in liquid nitrogen prior to cross-sectional imaging is an established preparation method for alginate capsule cross-sections, since it prevents the collapse or distortion of the internal structure that mechanical cutting alone can cause [8]. The resulting cross-sectional images have been used specifically to quantify shell or membrane thickness in alginate capsules by calibrated image analysis in ImageJ [6]. Because higher magnification was required to resolve the shell clearly, the full particle was not captured within the field of view, meaning that neither overall shape and diameter nor the core-to-shell ratio could be obtained from these same images.",
      ],
    },
    {
      id: "section-imagej-application-to-our-project--cross-sectioned-core",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "Shell thickness measurement was used specifically for core-shell capsules, to determine how the outer alginate shell responded to changes in the relative flow rates of the two phases, alginate and CaCl₂, during core-shell formation. Because the full particle was not captured within the field of view at the magnification required to resolve the shell clearly, this measurement provided the absolute shell thickness rather than the proportion of core versus shell volume, which would have required the overall capsule diameter obtained separately from intact-sphere imaging.",
            "We expected shell thickness to vary systematically with the tested formulation parameters, allowing us to identify the conditions that produced a shell thick enough to ensure physical containment of the encapsulated bacteria, without being so thick that mass transfer was compromised. These results would then feed directly into the selection of the final core-shell formulation, alongside the intact-sphere and mechanical assay results.",
          ],
        },
      ],
    },
    {
      id: "section-imagej-technique-requirements--cross-sectioned-core",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Software, imaging and processing parameters of the shell-thickness measurement.",
              headers: ["Parameter", "Value"],
              rows: [
                ["Software", "ImageJ (NIH)"],
                [
                  "Image source",
                  "NATIONAL GEOGRAPHIC 40×–1024× transmitted and incident light microscope (Bresser GmbH) with USB digital eyepiece, images viewed in MicrOcular VGA and saved as jpg",
                ],
                [
                  "Sample requirement",
                  "Capsule bisected close to its centre, both halves on a microscope slide under a coverslip, cut face flat and perpendicular to the optical axis",
                ],
                [
                  "Contrast",
                  "Magnetite dispersed in the alginate phase; without it the shell cannot be distinguished from the liquid core",
                ],
                [
                  "Measurement tool",
                  "Straight line drawn across the shell, Analyze → Measure",
                ],
                [
                  "Sampling per capsule",
                  "About 10 thickness measurements around the circumference; the per-capsule value is their mean",
                ],
                [
                  "Replication",
                  "10 capsules per condition, 6 for 3.5% (w/v) alginate at 300/75 μL/min",
                ],
                [
                  "Resolution limit",
                  "Thickness varies by 60 to 90 μm between points of a single cross-section, which is the floor on any difference this method can resolve",
                ],
                [
                  "Known failure mode",
                  "A cut that misses the centre raises the apparent thickness and adds variance that cannot be told apart from process variability",
                ],
              ],
            },
          },
        },
        {
          id: "section-imagej-sample-preparation--cross-sectioned-core",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Capsules were flash-frozen in liquid nitrogen to preserve the structure without deformation, then cut in half. The cross-section was placed under the microscope with a coverslip laid on top to hold the cut face flat and perpendicular to the optical axis. Ten capsules were measured per condition, six for 3.5% (w/v) alginate at 300/75 μL/min, and roughly ten thickness measurements were taken around the circumference of each cross-section rather than at a single point, with the per-capsule value being their mean. Measuring around the whole circumference is not a refinement here but the only way to obtain a defensible number, since the shell is not uniform and a single measurement would be a point estimate of a varying quantity.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-imagej-results--cross-sectioned-core",
      title: "Results",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "Mean shell thicknesses ranged from approximately 240 to 475 μm, and the dispersion is as much a result as the means are. Within a single cross-section, thickness varied by roughly 60 to 90 μm between measurement points, and between capsules of the same condition the standard deviation reached 167 μm. Two separate contributions are visible in that: the shell boundary is not always sharply defined and the apparent thickness depends on how centrally the capsule happened to be bisected, which is measurement variability, and capsules produced under identical settings genuinely differ, which is process variability. The first is why ten capsules and ten points per capsule were needed, and the second is why even that was not enough.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/results/encapsulation/shell-thickness.png",
            alt: "Scatter plot of shell thickness per capsule, coloured by production condition",
            caption:
              "Shell thickness of individual core-shell capsules, each point the mean of several measurements around one capsule, coloured by condition. Horizontal spread within each group avoids overlap and carries no meaning. n = 10 capsules per condition, 6 for 3.5% (w/v) at 300/75 μL/min.",
          },
        },
        {
          paragraphs: [
            "The consequence is stated plainly rather than worked around: this measurement cannot resolve the effect of the outer-to-inner flow-rate ratio. The 6:1 ratio gave thicker shells than 4:1 in two of four matched comparisons and similar or thinner shells in the other two, with differences smaller than the spread within a single condition. Any ranking of the ratios read off these numbers would be an artefact of the dispersion, so shell thickness was not used as the selection criterion, and the comparison was moved to a functional measurement instead.",
            "What the measurement does support is a coarser result that the dispersion does not swallow. At 600 μL/min, capsules made with 3.5% (w/v) alginate had thicker shells than those made with 3% (w/v), and across all conditions the shell is a few hundred micrometres thick rather than a few tens or a few thousand. That order of magnitude is the usable finding: it establishes that a **continuous** shell of substantial thickness forms under every condition tested, which is what physical containment requires, and it sets the length scale any diffusion estimate for the capsule has to use. The precise thickness of a given formulation is not reproducible at the resolution of this method, and it is reported as such.",
          ],
        },
        {
          callouts: [
            {
              kind: "learn",
              text: "**If the aim is to discriminate between formulations rather than to establish a length scale,** optical measurement of a cryo-fractured cross-section is unlikely to be sufficient on its own, and the effort is better spent either on a sectioning method that guarantees a central cut or on measuring a property that depends on the shell rather than on its apparent width.",
            },
          ],
        },
      ],
    },
    {
      id: "section-imagej-mechanical-assay-deformation-under-load",
      title: "Mechanical assay: deformation under load",
      group: true,
    },
    {
      paragraphs: [
        "Since capsule integrity under mechanical stress was a property of interest for the bioreactor, intact core-shell capsules were subjected to progressively increasing applied loads, with a photograph taken after each step. Vertical and horizontal Feret diameters were then measured with ImageJ at each step to quantify the degree of flattening as a function of load. This provided an image-based, low-cost alternative to instrumented compression testing (for example texture analysers), where force-displacement curves are typically recorded directly by dedicated equipment rather than derived from images [5]. Tracking the Feret diameter ratio across progressively increasing loads was conceptually comparable to reported compression assays that photograph particles before and after loading to assess deformation and failure behaviour [6].",
      ],
    },
    {
      id: "section-imagej-application-to-our-project--mechanical-assay-deformation",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "This assay was used to evaluate the mechanical robustness of beads and capsules under conditions resembling the mechanical stresses expected inside the rotating-bed bioreactor. Quantifying how much a sphere deformed under a given applied load provided a direct, comparative and low-cost measure of mechanical resistance across formulations, without requiring a dedicated mechanical testing instrument. Since capsule failure would compromise both the biosafety rationale for encapsulation and the recoverability of the biological material for revalorisation, this comparison was directly relevant to selecting a formulation suitable for use in the bioreactor.",
            "We expected the ratio between the vertical and horizontal Feret diameters to decrease progressively from 1 as the applied load increased and the sphere flattened, in all formulations, but at different rates: formulations with higher crosslinking density were expected to show a smaller decrease in this ratio for the same applied load. This comparison guided the final selection of the formulation to move forward with in the encapsulation workflow.",
          ],
        },
      ],
    },
    {
      id: "section-imagej-technique-requirements--mechanical-assay-deformation",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Software, imaging and load parameters of the deformation assay.",
              headers: ["Parameter", "Value"],
              rows: [
                ["Software", "ImageJ (NIH)"],
                [
                  "Image source",
                  "Fixed camera position, magnification and illumination held constant across the whole load sequence",
                ],
                [
                  "Sample requirement",
                  "The same capsule identifiable in every image of its sequence; capsules loaded in groups of three under one coverslip",
                ],
                [
                  "Load series",
                  "0, 0.4, 1.4, 2.4, 5.4, 10.4 and 20.4 g, the 0.4 g being the coverslip alone; each mass added on top and removed before the next",
                ],
                [
                  "Timing rule",
                  "Each photograph taken only once no further movement is visible, so that every image records a settled shape",
                ],
                [
                  "Measurements recorded",
                  "Fit Ellipse and Feret’s Diameter for each capsule at each step",
                ],
                [
                  "Derived quantity",
                  "s/s₀, the fraction of its own unloaded sphericity each capsule retains",
                ],
                [
                  "Spatial calibration",
                  "None required, since the reported quantity is a ratio within a single image",
                ],
                [
                  "Replication",
                  "9 capsules per condition and batch, in 3 groups of 3; two batches, fresh and stored one week",
                ],
                [
                  "Known limitation",
                  "The load is shared by three capsules, so the masses are the total on the group, not the force on one capsule; the assay reports deformation, not a modulus or a rupture load",
                ],
              ],
            },
          },
        },
        {
          id: "section-imagej-sample-preparation--mechanical-assay-deformation",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Intact capsules were placed on millimetre-grid paper in groups of three, covered with a microscope coverslip, and loaded with calibrated masses in seven increasing steps, from the 0.4 g of the coverslip alone up to 20.4 g. Each mass was added on top of the coverslip and removed before the next, and after each step the capsules were left until no further movement was visible and only then photographed, at fixed camera position and magnification, so that every image records a settled rather than a still-deforming shape. Three groups were tested per condition, giving nine capsules per condition and batch, each followed through the whole sequence. Two batches were tested, one freshly produced and one stored in distilled water for one week, under the same load series.",
              ],
            },
            {
              callouts: [
                {
                  kind: "not-done",
                  text: "**The load is applied to a group of three capsules through a shared coverslip,** so the figures quoted are the total mass on the group and not the force on an individual capsule. This is consistent across all conditions and batches, which is what the comparison needs, but any absolute interpretation has to divide by three and account for the capsules sharing the load unevenly.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-imagej-results--mechanical-assay-deformation",
      title: "Results",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "At the highest load the eight conditions separate cleanly by flow-rate ratio: the four 6:1 conditions occupy the top four positions and the four 4:1 conditions the bottom four, with mean retentions of 0.50 and 0.41. In matched pairs sharing alginate concentration, outer flow rate and storage state, 6:1 retained more sphericity in six of eight comparisons, by between 0.01 and 0.29, and was lower in the remaining two by 0.01 and 0.02, within the spread between capsules. No capsule ruptured or leaked at any load, so within this range the capsules deform rather than fail, and deformation is the only readout available.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/results/encapsulation/mechanical-sphericity-load.png",
            alt: "Line chart of sphericity retained under increasing compressive load for each flow condition, fresh and stored capsules",
            caption:
              "Sphericity retained under increasing compressive load, normalised to the unloaded value of each condition (s/s₀, mean ± SD). Top, freshly prepared capsules; bottom, capsules stored in distilled water for one week. One line per flow condition.",
          },
        },
        {
          paragraphs: [
            "The significance of this for the measurement programme is that a functional property resolved a difference a geometric one could not. The same flow-rate ratio that produced no interpretable difference in shell thickness produces an unambiguous ordering in resistance to compression, because the extra alginate delivered at 6:1 is too small to appear as a width in a two-dimensional cross-section but not too small to change how the shell responds to load. Where a dimension sits below the resolution of the method available, measuring what that dimension is supposed to do can be the more informative choice.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/imagej-photographic-panels-of-core-shell-capsules.png",
            alt: "Photographic panels of core-shell capsules deforming under increasing compressive load",
            caption:
              "Representative core-shell capsules under increasing compressive load, from unloaded to 20.4 g. Rows one and two, freshly produced capsules; rows three and four, the same two conditions after one week of storage. Within each pair the first row is the best performing condition, 3.5% (w/v) alginate at 300/50 μL/min, 6:1, and the second the worst, 3% (w/v) alginate at 300/75 μL/min, 4:1. Same magnification and scale bar in all panels.",
          },
        },
        {
          paragraphs: [
            "Two features of the data are properties of the method and should be read as such. Capsules stored for one week retained more sphericity than fresh ones in seven of eight conditions, raising mean retention at the top load from 0.40 to 0.51, which is consistent with calcium continuing to redistribute through the shell after the capsule leaves the bath; because the two sets were also different batches, storage and batch cannot be formally separated here, and that limitation is stated rather than assumed away. And the dispersion between capsules differs strongly between conditions, from ±0.036 to ±0.137 at the top load, so a condition with the highest mean is not necessarily the most dependable one, which is why reproducibility entered the final selection alongside the mean.",
            "As a technique, the assay is worth reproducing where no instrumented tester is available. It costs a set of calibrated masses, grid paper and a camera, it yields a load-deformation curve per individual particle rather than per batch, and its weaknesses are known and manageable: the load is applied in discrete steps rather than continuously, the holding rule has to be defined and followed, and it reports deformation rather than a modulus or a rupture force, so it compares formulations without characterising the material.",
          ],
        },
      ],
    },
    {
      id: "section-imagej-general-conclusions",
      title: "General conclusions",
      group: true,
    },
    {
      paragraphs: [
        "Three measurements built on one free software tool and a camera carried the whole physical characterisation of the encapsulation platform, and together they illustrate something about choosing a measurement rather than inheriting one. The intact-particle imaging was decisive because the quantity it resolves, the spread of shape within a batch, is exactly the quantity that distinguished the production conditions; means alone would have called them equivalent. The shell-thickness measurement was honest about failing at the question it was set, since its own dispersion exceeded the difference it was meant to detect, and it is reported here for the length scale it does establish rather than for a ranking it cannot support. The mechanical assay then answered that same question by measuring what the shell does instead of how wide it is.",
        "All three rest on the same requirements, which is what makes them reproducible by another team: a calibrated scale in the plane of the sample, consistent magnification and illumination, per-particle rather than per-batch data, and a stated rule for when the photograph is taken. Each also has a documented failure mode: particle analysis silently counts fragments as particles, a cross-section that misses the capsule centre adds variance, and a hydrogel photographed too soon after loading reads as stiffer than it is. Naming those is as much part of the method as the measurement itself.",
        "What remains out of reach with this toolkit is anything requiring absolute material properties. Shell thickness to better than about a hundred micrometres, an elastic modulus, a rupture load and the porosity that governs transport all need instrumentation we did not have, and we have been explicit about which of our conclusions are comparative rather than absolute. Within that boundary, image analysis settled every formulation decision in the encapsulation workflow at essentially no cost, which is the case for using it first and reaching for instrumented methods only where it runs out.",
      ],
    },
  ],
  references: [
    "[1] Schneider CA, Rasband WS, Eliceiri KW. NIH Image to ImageJ: 25 years of image analysis. Nature Methods. 2012;9(7):671-5. Available from: https://doi.org/10.1038/nmeth.2089",
    "[2] Abràmoff MD, Magalhães P, Ram SJ. Image processing with ImageJ. Biophotonics International. 2004;11(7):36-42. Available from: https://dspace.library.uu.nl/handle/1874/204900",
    "[3] Aguirre Calvo T, Santagapita P. Physicochemical characterization of alginate beads containing sugars and biopolymers. Journal of Quality and Reliability Engineering. 2016;2016:9184039. Available from: https://doi.org/10.1155/2016/9184039",
    "[4] Saqib MN, Ahammed S, Liu F, Zhong F. Customization of liquid-core sodium alginate beads by molecular engineering. Carbohydrate Polymers. 2022;284:119047. Available from: https://doi.org/10.1016/j.carbpol.2021.119047",
    "[5] Liu C, Shi Y, Liu Y, Liu Y, Yang C, Chen H, et al. Controllable fabrication of alginate-based floating beads with core-shell architecture. Food Hydrocolloids. 2024;151:109869. Available from: https://doi.org/10.1016/j.foodhyd.2024.109869",
    "[6] Pereda M, Poncelet D, Renard D. Characterization of core-shell alginate capsules. Food Biophysics. 2019;14(4):467-78. Available from: https://doi.org/10.1007/s11483-019-09595-x",
    "[7] Tran DT, Nguyen NK, Yadav AS, Chuang A, Burford M, Malekpour Galogahi F, et al. Calcium alginate core-shell liquid beads encapsulated with microalgae for wastewater treatment. Advanced Energy and Sustainability Research. 2024;5(7):2400112. Available from: https://doi.org/10.1002/aesr.202400112",
    "[8] Reig-Vano B, Huck-Iriart C, De La Flor S, Trojanowska A, Tylkowski B, Giamberini M. Structural and mechanical analysis on mannuronate-rich alginate gels and xerogels beads based on calcium, copper and zinc as crosslinkers. International Journal of Biological Macromolecules. 2023;246:125659. Available from: https://doi.org/10.1016/j.ijbiomac.2023.125659",
  ],
};

const UV_VIS: ExperimentData = {
  id: "uv-vis",
  tabLabel: "UV-Vis",
  title: "UV-Vis absorbance spectroscopy",
  body: [
    {
      paragraphs: [
        "Ultraviolet-visible spectroscopy measures the fraction of incident light a sample absorbs as a function of wavelength, from roughly 200 nm in the ultraviolet to 1000 nm in the near infrared. For a dissolved or suspended species the absorbance at a given wavelength is proportional to its concentration and to the **path length** of light through the sample [1], so a spectrum serves both to identify what is present, from where it absorbs, and to quantify how much, from how strongly.",
        "Two properties of the technique matter for a containment measurement. It is non-selective, so anything in the cuvette that absorbs contributes to the spectrum, which means the signal of interest has to be separated from everything else rather than isolated by the instrument. And it is a whole-sample measurement on the liquid, so it reports what has left a solid without the solid having to be opened, sampled or destroyed. The first property is a constraint the experiment has to be designed around; the second is why the technique suits the question.",
      ],
    },
    {
      id: "section-uv-vis-application-to-our-sample",
      title: "Application to our sample",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The samples measured are not the capsules but the liquids around them: the calcium chloride bath in which the capsules are crosslinked, the distilled water they are stored in, and a phosphate buffer in which they are deliberately dissolved. The analyte is magnetite, used as a surrogate for the bacterial cargo the capsules are intended to hold.",
            "Magnetite suits this role for three reasons. It absorbs broadly and almost featurelessly across the whole ultraviolet and visible range, so it can be detected in any of those media without a wavelength window having to be found for each. At 50 to 100 nm the particles are an order of magnitude smaller than the *Pseudomonas putida* cells they stand in for, which are roughly a micrometre across; if the shell retains material by **size exclusion**, magnetite would escape before a bacterium could, so a test that detects no magnetite is conservative. That reading assumes the particles are not simply held by adsorption to the **alginate**, which this measurement cannot rule out. And it is visible in the material by eye, which is how the same particles came to be used earlier to make the alginate shell distinguishable from the liquid core.",
            "The complication is that alginate itself absorbs. A capsule placed in any of these media releases material that contributes to the spectrum, and that contribution has nothing to do with containment. Separating the two is the whole design problem of the measurement, and it is solved by subtraction rather than by selectivity. Looking for the cargo in the liquid around the capsule, rather than inside it, also targets the failure that matters in application: leakage of encapsulated cells into the treated wastewater has been identified as a risk for alginate-based systems [2].",
          ],
        },
      ],
    },
    {
      id: "section-uv-vis-application-to-our-project",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "Before engineered bacteria could be placed inside a capsule, it had to be shown that the capsules keep what is put in them, both while the shell is still forming in the **crosslinking** bath and over the days of storage that precede use. That claim cannot be settled by looking at capsules, because a capsule that has lost some of its contents looks exactly like one that has not. It has to be settled by looking for the contents somewhere else.",
            "The objective was therefore to determine whether magnetite was released during synthesis or storage, and to confirm that it was present in the capsules at all, which is the part an absence-of-signal experiment cannot do without help. The synthesis bath and the storage water answer the first question; dissolving capsules in phosphate buffer answers the second and supplies the positive **control** the experiment requires, since without it a null result elsewhere would be ambiguous between nothing escaping and the method being unable to see magnetite in the first place.",
            "We expected little or no magnetite in the bath or the storage water and a clear signal only after dissolution. Two loading configurations were prepared, magnetite in the inner calcium chloride solution and magnetite dispersed in the alginate phase, with the core expected to be the harder of the two to load, since the particles settle and may remain in the syringe rather than being carried into the capsule.",
          ],
        },
      ],
    },
    {
      id: "section-uv-vis-technique-requirements",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Instrument, optical parameters and controls of the containment measurement.",
              headers: ["Parameter", "Value"],
              rows: [
                [
                  "Instrument",
                  "GENESYS 10S UV–Vis scanning spectrophotometer (Thermo Scientific)",
                ],
                [
                  "Cuvettes",
                  "Quartz, 1 cm path length. Plastic cannot be used, since below roughly 300 nm it absorbs strongly enough to obscure the sample",
                ],
                ["Spectral range", "200 to 1000 nm"],
                [
                  "Sample requirement",
                  "The liquid surrounding the capsules, read directly without filtration or dilution",
                ],
                [
                  "Blank",
                  "The corresponding medium: calcium chloride solution, distilled water or phosphate buffer, so that the medium itself never appears in the spectra",
                ],
                [
                  "Control subtracted",
                  "Capsules of the same formulation without magnetite, in the same medium, read in the same session against the same blank",
                ],
                [
                  "Reported quantity",
                  "Mean difference in absorbance between the sample and its matched control, not an absolute absorbance",
                ],
                [
                  "Quantification window",
                  "450 to 600 nm, chosen from the control spectra after these showed that the capsule material absorbs almost entirely below about 250 nm while magnetite absorbs across the whole range",
                ],
                [
                  "Reference samples",
                  "A magnetite suspension at the loading concentration and a dilution of it, read alongside the samples. These are the only measurements reported as raw absorbance, since they have no magnetite-free counterpart",
                ],
                [
                  "Detection limit",
                  "Above the concentration of the diluted suspension, which could not be told apart from the blank",
                ],
                ["Replication", "One reading per sample"],
                [
                  "Known limitation",
                  "With a single reading per sample the measurement carries no internal estimate of its own variability, and a flat spectrum does not by itself exclude small losses",
                ],
              ],
            },
          },
        },
        {
          id: "section-uv-vis-sample-preparation",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Capsules were synthesised under the selected conditions, 3.5% (w/v) alginate with 0.5% (w/v) calcium chloride in the core at Qe/Qi = 600/100 μL/min (6:1), in three configurations differing only in where the magnetite was placed: without magnetite, as the control; with magnetite (Aldrich 637106, 50 to 100 nm) in the inner calcium chloride solution; and with magnetite dispersed in the alginate phase.",
                "The crosslinking bath was collected immediately after synthesis on day 0 and retained, so that any material lost while the shell was forming would be captured. The capsules were then transferred to distilled water and kept at room temperature, and the storage water was sampled on day 1 and again on day 3. Capsules were not placed in phosphate buffer immediately after synthesis; those used for the dissolution measurement were taken from the storage water on day 3, so that the dissolution sample reflects capsules that had already been through the storage period rather than freshly made ones.",
                "All four sample types, bath, storage water at two time points and dissolution buffer, were measured for each of the three configurations, giving the matched control for every value reported. Each sample was measured once.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-uv-vis-results",
      title: "Results",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "The two components absorb in different regions, which is what makes the measurement possible at all. Capsules without magnetite, measured in each of the three media, absorbed almost entirely below approximately 250 nm, while the magnetite reference absorbed broadly and almost featurelessly across the whole range. In the visible region the capsule material therefore contributes nothing, and any absorbance above the control can be attributed to magnetite.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/results/encapsulation/magnetite-absorbance-spectra.png",
            alt: "Raw absorbance spectra of the synthesis bath, storage water and dissolution buffer, with the magnetite reference",
            caption:
              "Raw absorbance spectra of the calcium chloride synthesis bath, the storage water after one and three days, and the phosphate buffer after dissolution, for capsules without magnetite (control), with magnetite in the core and with magnetite in the alginate shell, together with the reference spectrum of the magnetite suspension. Recorded from 200 to 1000 nm; the 250–1000 nm range is shown, below which the signal is dominated by instrumental noise.",
          },
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/measurements/uv-vis-control-subtracted-absorbance-spectra-for-the.png",
            alt: "Control-subtracted absorbance spectra for the same samples",
            caption:
              "The same spectra after correction, obtained by subtracting from each magnetite-containing sample the spectrum of the corresponding control without magnetite; the magnetite reference has no control and appears in both panels. Dashed lines at 450 and 600 nm mark the interval used for quantification.",
          },
        },
        {
          paragraphs: [
            "For the shell configuration the measurement answered its question cleanly. Nothing was detected in the storage water on either day, where the magnetite-containing samples read marginally below their **controls**, and the synthesis bath showed a difference of 0.004, identical for both configurations and at the noise level of the measurement. Dissolution then produced 0.186, more than an order of magnitude above anything seen in the other media. Particles incorporated into the alginate shell therefore stay there through synthesis and three days of storage, within the detection limit of the method, and appear in the liquid only when the capsule is destroyed.",
          ],
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Mean absorbance difference between magnetite-containing samples and the corresponding control without magnetite, between 450 and 600 nm.",
              headers: ["Sample", "Magnetite in core", "Magnetite in shell"],
              rows: [
                ["Calcium chloride bath (synthesis)", "0.004", "0.004"],
                ["Storage water, day 1", "−0.005", "−0.003"],
                ["Storage water, day 3", "−0.003", "−0.003"],
                ["Phosphate buffer after dissolution", "−0.020", "0.186"],
              ],
            },
          },
        },
        {
          paragraphs: [
            "For the core configuration the measurement answered a different question than the one it was asked. No signal appeared even after dissolution, which means the capsules never carried a detectable quantity of magnetite rather than that they retained it, consistent with the particles settling in the syringe during preparation. For that configuration the null results in the bath and storage water therefore say nothing about containment, since there was nothing inside to contain. Reporting this separately matters, because an absence of signal in the surrounding medium looks like perfect containment whether the cargo stayed in or was never there, and only the dissolution control distinguishes the two.",
            "Two limits bound how far the positive result can be taken, and both come from the method rather than from the capsules. The diluted reference suspension could not be distinguished from the blank, so the technique has a detection limit above which leakage would have to rise before it registered, and small losses cannot be excluded; the claim is that no leakage was detected, not that none occurred. And each sample was measured once, so the values carry no internal estimate of their own variability, which is why the negative differences of a few thousandths of an absorbance unit are read as zero rather than as the capsules absorbing less than their controls.",
          ],
        },
        {
          callouts: [
            {
              kind: "learn",
              text: "**The approach transfers to any encapsulation system whose cargo absorbs light, and what is worth borrowing is the structure rather than the tracer.** It rests on five elements: a matched no-cargo control in every medium; a quantification window chosen from those controls rather than by convention; a diluted reference that sets the detection limit; a deliberate destruction step that confirms the cargo was there; and a tracer placed where the real cargo will sit. The destruction step is the one most easily left out, and without it a containment claim built on absent signals cannot be told apart from a failure to load.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "not-done",
              text: "**The obvious next step is to repeat the experiment with the bacteria themselves rather than to look for a better tracer.** The core configuration failed here because magnetite is dense and aggregates, settling out of the inner solution before it reaches the capsule, whereas bacterial cells are close to the density of water and stay suspended, so the loading problem does not carry over. Capsules carrying engineered P. putida in the core, with the surrounding medium sampled over time and plated for viable cells, would measure the quantity the biosafety case actually rests on [2].",
            },
          ],
        },
      ],
    },
  ],
  references: [
    "[1] Skoog DA, Holler FJ, Crouch SR. Principles of instrumental analysis. 7th ed. Boston: Cengage Learning; 2018. ISBN 978-1-305-57721-3",
    "[2] Tran DT, Nguyen NK, Yadav AS, Chuang A, Burford M, Malekpour Galogahi F, et al. Calcium alginate core-shell liquid beads encapsulated with microalgae for wastewater treatment. Advanced Energy and Sustainability Research. 2024;5(7):2400112. Available from: https://doi.org/10.1002/aesr.202400112",
  ],
};

const TGA_DSC: ExperimentData = {
  id: "tga-dsc",
  tabLabel: "TGA-DSC",
  title: "Thermogravimetric analysis and differential scanning calorimetry",
  body: [
    {
      paragraphs: [
        "TGA and DSC are complementary thermal analysis techniques used to characterise how a material’s mass and heat flow change as a function of temperature. TGA records the mass loss of a sample as it is heated, allowing distinct thermal events such as water evaporation, polymer decomposition and residue formation to be identified as discrete steps; DSC records the heat flow associated with these same transitions, distinguishing endothermic events (such as water desorption or dehydration) from exothermic events (such as oxidative decomposition). When run simultaneously, TGA and DSC allow mass-loss steps to be directly correlated with their corresponding thermal event, providing a more complete picture than either technique alone [1].",
        "For hydrogel materials such as calcium **alginate**, this combination is particularly informative, since the total water content of the hydrogel network, both loosely bound and structurally associated water, is typically lost over a wide low-temperature range before the polymer itself begins to decompose at higher temperatures [2].",
      ],
    },
    {
      id: "section-tga-dsc-application-to-our-sample",
      title: "Application to our sample",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "When applied to calcium alginate beads and capsules, TGA typically resolves two or three sequential mass-loss regions. The first, occurring from room temperature up to approximately 150 to 200 °C, is attributed to the desorption of physically adsorbed water and the removal of structurally bound water within the hydrogel network, and generally accounts for the majority of the total mass loss in a hydrated sample [1, 2]. This is followed, at higher temperatures, by decomposition of the alginate polymer backbone itself, and, depending on the atmosphere used, by the formation of a carbonised or oxide residue at the highest temperatures tested [2]. DSC run in parallel typically shows a pronounced endothermic peak coinciding with the low-temperature water-loss step.",
            "Because calcium ions are introduced into the sample as CaCl₂ during **crosslinking**, some residual or loosely bound CaCl₂ hydrate may also be present within the capsule shell in addition to water bound to the alginate network itself. The thermal dehydration of CaCl₂ hydrates is itself a well-characterised, staged process, proceeding through consecutive endothermic steps as successive water molecules are lost from the tetrahydrate/dihydrate form down to the fully anhydrous salt [3]. This provides a reference for interpreting any additional or overlapping low-temperature endothermic features that may appear in the DSC trace.",
          ],
        },
      ],
    },
    {
      id: "section-tga-dsc-application-to-our-project",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "TGA-DSC was selected to complete the physical characterisation of the encapsulation platform, providing the water-content and thermal-stability data that neither image analysis nor mechanical testing could supply. Since the alginate shell is expected to retain a substantial amount of water under normal storage conditions, and this water content is likely to influence both the mechanical behaviour observed in the compression assay and the material’s suitability for integration with the biological module, a direct measurement of how much water the **core-shell** structure holds, and how it is lost upon drying, was needed rather than assumed.",
            "We expected the dried capsule to yield a thermal profile broadly consistent with literature values for dry alginate powder [1, 2], while the hydrated capsule was expected to show a substantially larger low-temperature mass-loss step. The difference between these two profiles was intended to provide an estimate of the water content specifically attributable to the core-shell structure, rather than to the alginate polymer itself. Because the shell is formed by crosslinking with CaCl₂, any additional low-temperature endothermic feature not accounted for by water loss alone was expected to be interpretable in light of the staged CaCl₂ hydrate dehydration reported by Karunadasa et al. [3], rather than assumed to originate from the alginate–water system.",
          ],
        },
      ],
    },
    {
      id: "section-tga-dsc-technique-requirements",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Instrument and run parameters of the simultaneous TGA-DSC measurement.",
              headers: ["Parameter", "Value"],
              rows: [
                [
                  "Instrument",
                  "TA Instruments SDT Q600 simultaneous TGA-DSC, software version 20.9",
                ],
                ["Sample pans", "Alumina"],
                ["Atmosphere", "Nitrogen"],
                ["Heating rate", "10 °C/min"],
                [
                  "Temperature programme",
                  "Ambient to 495 °C; one hydrated capsule was run to 673 °C to confirm that no further events occur above 495 °C",
                ],
                [
                  "Sample state",
                  "Either hydrated as stored in distilled water with no further treatment, or air-dried overnight on absorbent paper",
                ],
                [
                  "Initial sample mass",
                  "11.22 and 11.75 mg, one hydrated capsule each; 1.30 mg for the dried sample, which required two capsules pooled",
                ],
                [
                  "Weighing",
                  "Analytical balance, immediately before loading the pan",
                ],
                [
                  "Data exported",
                  "Temperature, mass percentage and heat flow; the derivative of the mass curve computed afterwards",
                ],
                [
                  "Replication",
                  "Two hydrated capsules as independent replicates; a single dried sample",
                ],
                [
                  "Parameters that must be matched",
                  "Atmosphere, heating rate, sample state and initial sample mass. At about 11 mg a hydrated capsule is close to the smallest specimen on which balance drift stays below the features of interest",
                ],
                [
                  "Known limitation",
                  "Below about 150 °C the mass loss of a hydrated capsule is dominated by water, so any thermal transition of the polymer in that range is masked rather than absent. The dried sample has no replicate, since two capsules had to be pooled to reach a weighable mass",
                ],
              ],
            },
          },
        },
        {
          id: "section-tga-dsc-sample-preparation",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Two capsule states were prepared for comparison, both produced from 3.5% (w/v) alginate. The hydrated capsule was taken directly from distilled water storage under the optimised encapsulation conditions, with no additional treatment. The dried capsules were obtained by placing capsules on absorbent paper and leaving them to air-dry overnight, following the same drying approach used for the SEM samples, so that thermal and microstructural results could be compared on capsules prepared under equivalent conditions.",
                "Runs were performed on a TA Instruments SDT Q600 simultaneous TGA-DSC (software version 20.9) in alumina pans under a nitrogen purge, heating from ambient at 10 °C/min. Three runs were acquired: two single hydrated capsules of 11.22 mg and 11.75 mg, run independently, and one run of 1.30 mg containing two dried capsules pooled, since a single dried capsule does not provide enough mass for a reliable trace. The first hydrated run was taken to 673 °C to establish where the trace stopped changing; the other two were stopped at 495 °C once that was known, which is why the comparison figure is plotted to 500 °C. Only the heating segment is shown; the cooling segment was discarded. Derivative curves (DTG, %/°C) were computed from the recorded mass by numerical differentiation with no smoothing, so that any step in the mass signal appears in the derivative at full amplitude rather than being averaged away. The three runs were performed on capsules from different production batches, in July and September 2026, so the agreement between the two hydrated traces is agreement across batches rather than within one.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-tga-dsc-results",
      title: "Results",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "For each sample, mass loss was recorded as a function of temperature by TGA, and the corresponding heat flow was recorded simultaneously by DSC, allowing thermal events to be correlated with the mass-loss steps observed in the same run. The low-temperature mass-loss and endothermic step occurred at 87 °C and 94 °C for the two hydrated capsules and at approximately 80 °C for the dried capsules, corresponding to a mass loss of 96.3% and 94.8% for the hydrated capsules and 10.3% for the dried. Compared against the literature values reported for dry alginate powder [1, 2], the dried capsules’ profile was broadly consistent with these values, while the hydrated capsules showed a substantially larger mass-loss step, indicating that the core-shell architecture retained approximately nineteen times its own dry mass in water, that is approximately 95% water by mass as stored.",
          ],
        },
        {
          pairedResource: {
            kind: "image",
            src: "assets/results/encapsulation/tga-curves.png",
            alt: "TGA mass-loss curves for two hydrated capsules and one pooled dried sample, plotted to 500 °C",
            caption:
              "Mass loss as a function of temperature for two hydrated core-shell capsules and one run of two pooled dried capsules, nitrogen, 10 °C/min, plotted to 500 °C.",
          },
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Thermal events resolved in the three runs: initial mass, mass lost below 150 °C, DTG maximum, DSC endotherm minimum, decomposition DTG maxima, residual mass at 495 °C and final temperature reached.",
              headers: [
                "",
                "Hydrated capsule 1",
                "Hydrated capsule 2",
                "Dried capsules (pooled, n = 2)",
              ],
              rows: [
                ["Initial mass", "11.22 mg", "11.75 mg", "1.30 mg"],
                ["Mass lost below 150 °C", "96.3%", "94.8%", "10.3%"],
                [
                  "DTG maximum of that step",
                  "87 °C",
                  "94 °C",
                  "80 °C (shoulder only)",
                ],
                ["DSC endotherm minimum", "84 °C", "82 °C", "No resolved peak"],
                [
                  "Main decomposition DTG maxima",
                  "Not resolved",
                  "Not resolved",
                  "198 °C and 282 °C",
                ],
                ["Residual mass at 495 °C", "−0.1%", "2.1%", "23.5%"],
                [
                  "Final temperature reached",
                  "673 °C (residue −0.35%)",
                  "495 °C",
                  "495 °C",
                ],
              ],
            },
          },
        },
        {
          paragraphs: [
            "No additional low-temperature feature was observed beyond the main water-loss step. The staged CaCl₂ hydrate dehydration behaviour described by Karunadasa et al. [3] could therefore not be identified in these traces, which does not exclude residual CaCl₂ within the shell: at approximately 95% water content any such feature falls inside the single dominant endotherm, and separating it would require a sample dried to constant mass before loading.",
            "These results, together with the shell-thickness data obtained by image analysis, completed the physical characterisation of the encapsulation platform ahead of SEM imaging and integration with the biological module. The platform is stable far beyond any temperature the process will encounter, the first irreversible change being water loss beginning well below 100 °C, and the two states bracket the material: the structure as handled in the laboratory is overwhelmingly water, while the alginate that performs the encapsulation is a minority component of it.",
            "The starting masses support the water-content figure independently of the traces themselves. Each hydrated capsule weighed approximately 11.5 mg, while two air-dried capsules together weighed 1.30 mg, that is roughly 0.65 mg each, so the solid fraction estimated by weighing capsules on a balance before loading agrees with the residue read off the TGA curves at 150 °C without either measurement being used to derive the other. The two hydrated runs came from different production batches and agree to within 1.5 percentage points, so the figure is a property of the material rather than of one specimen.",
            "Two features of the raw data were treated as instrument artefacts rather than sample behaviour, and are reported here because they set the practical accuracy of the technique on samples this small. The dried-capsule trace shows an abrupt mass gain of 0.6 percentage points at 443 °C, immediately recovered, which cannot correspond to any chemical process under nitrogen and is attributed to a mechanical disturbance of the balance. The first hydrated run ends at −0.35% mass, a physically impossible value, which places the drift of the balance over a 650 °C ramp at roughly 0.3 percentage points of the initial mass. Both artefacts are small against the 95% water step that is the main result, but they are the same size as the residues reported at 495 °C, so those residues are quoted as orders of magnitude rather than as measured values. The DSC signal from a simultaneous TGA-DSC instrument of this type is semi-quantitative, and the strong negative deflection at the start of every run is the instrument equilibrating rather than a transition in the sample; peak positions are reported and enthalpies are not.",
          ],
        },
        {
          callouts: [
            {
              kind: "learn",
              text: "**Three points from this measurement transfer directly to other teams working with hydrogel encapsulation and cost nothing to apply.** A hydrated alginate capsule is approximately 95% water, so any quantity normalised to sample mass, loading capacity and leakage figures in particular, changes by more than an order of magnitude depending on whether it is expressed on a wet or dry basis, and the basis has to be stated. Air-drying overnight does not give a dry sample: roughly a tenth of the remaining mass is still water, so a protocol calling for dry material needs drying to constant mass. And running a hydrated specimen past 200 °C yields almost no usable information about the polymer, because the polymer is not where the mass is.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "not-done",
              text: "**The next runs we would make are a specimen dried to constant mass,** to resolve any CaCl₂ contribution, and a dried specimen taken to 700 °C, to confirm that the residue is stable rather than still evolving.",
            },
          ],
        },
      ],
    },
  ],
  references: [
    "[1] Larosa C, Salerno M, De Lima JS, Meri RM, Da Silva MF, De Carvalho LB, et al. Characterisation of bare and tannase-loaded calcium alginate beads by microscopic, thermogravimetric, FTIR and XRD analyses. International Journal of Biological Macromolecules. 2018;115:900-6. Available from: https://doi.org/10.1016/j.ijbiomac.2018.04.138",
    "[2] Reig-Vano B, Huck-Iriart C, De La Flor S, Trojanowska A, Tylkowski B, Giamberini M. Structural and mechanical analysis on mannuronate-rich alginate gels and xerogels beads based on calcium, copper and zinc as crosslinkers. International Journal of Biological Macromolecules. 2023;246:125659. Available from: https://doi.org/10.1016/j.ijbiomac.2023.125659",
    "[3] Karunadasa KSP, Manoratne CH, Pitawala HMTGA, Rajapakse RMG. Relative stability of hydrated/anhydrous products of calcium chloride during complete dehydration as examined by high-temperature X-ray powder diffraction. Journal of Physics and Chemistry of Solids. 2018;120:167-72. Available from: https://doi.org/10.1016/j.jpcs.2018.04.034",
  ],
};

const SEM: ExperimentData = {
  id: "sem",
  tabLabel: "SEM",
  title: "Scanning electron microscopy and elemental analysis",
  body: [
    {
      paragraphs: [
        "Scanning electron microscopy (SEM) is a widely used technique for the high-resolution examination of surface morphology and microstructure, particularly suited to small, non-conductive biological and polymeric samples that cannot be adequately resolved by optical microscopy. A focused electron beam scans the sample surface, and the resulting secondary electron signal is used to construct a magnified image revealing surface topography, porosity and structural organisation at resolutions well beyond those achievable with light microscopy [1]. Because the technique operates under high vacuum, samples must be solid, dry and, if non-conductive, coated with a thin conductive layer to prevent the accumulation of surface charge that would otherwise distort the image [1].",
      ],
    },
    {
      id: "section-sem-application-to-our-sample",
      title: "Application to our sample",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "When applied to calcium **alginate** beads and capsules, SEM is used to examine surface morphology, revealing features such as surface roughness, wrinkling and fibrous or granular textures that can differ with the bead composition [2]. Since alginate hydrogels are not intrinsically conductive, samples require a conductive coating, typically a thin gold layer applied by sputtering, before imaging [2].",
            "Wet or hydrated samples cannot be imaged directly with a conventional, high-vacuum SEM, as the free water they contain is incompatible with the vacuum required and would distort the sample during imaging; samples containing free or structural water are therefore dried beforehand, a step that has been implemented by freeze-drying to eliminate the aqueous core of liquid alginate beads prior to SEM analysis [3]. This drying step itself can alter surface morphology relative to the hydrated structure: a systematic comparison of preparation methods for alginate scaffolds found that both air-drying and freeze-drying caused marked shrinkage and distortion, whereas cryogenic preparation and imaging in the wet state preserved it [4], and beads dried without careful **control** have been reported to show major shrinkage, surface wrinkles and occasional cracking of the conductive coating [2].",
          ],
        },
      ],
    },
    {
      id: "section-sem-application-to-our-project",
      title: "Application to our project",
      foldable: true,
      blocks: [
        {
          paragraphs: [
            "SEM was selected to complete the physical characterisation of the encapsulation platform, providing surface and microstructural information that neither image analysis nor TGA could supply. Since the shell’s porosity and structural organisation are expected to influence mass transfer and mechanical robustness, both directly relevant to the capsules’ performance inside the bioreactor, a direct visual assessment of the shell surface was needed rather than inferred indirectly from bulk measurements.",
            "Only whole, unbroken capsules in a dried state were examined, since the vacuum required by the SEM instrument available is incompatible with a hydrated sample. We expected the dried capsule surface to show a porous morphology consistent with the alginate hydrogel network, a feature expected to be more pronounced in mannuronate-rich alginates such as ours, whose long, flexible M segments are predicted to form more open and permeable networks than guluronate-rich ones [5].",
          ],
        },
      ],
    },
    {
      id: "section-sem-technique-requirements",
      title: "Technique requirements",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Instrument, preparation and imaging parameters of the electron microscopy.",
              headers: ["Parameter", "Value"],
              rows: [
                [
                  "Instrument",
                  "JEOL JSM-IT700HR scanning electron microscope with Schottky field-emission source, secondary-electron imaging and a coupled energy-dispersive X-ray spectrometer",
                ],
                ["Accelerating voltage", "[XXX] kV"],
                ["Working distance", "[XXX] mm"],
                [
                  "Magnifications",
                  "90×, 400×, 2000×, 7000× and 20000×, the same series acquired on every specimen",
                ],
                [
                  "Sample state",
                  "Air-dried overnight on absorbent paper, not freeze-dried or critical-point dried",
                ],
                [
                  "Conductive coating",
                  "Gold, applied by sputter coating. Graphite was attempted first and did not give sufficient image quality",
                ],
                [
                  "Pre-coating inspection",
                  "Optika optical microscope at 670×, to choose an intact specimen before committing it to the coating step",
                ],
                [
                  "Replication",
                  "Two capsules from separate production runs, with a second area imaged on one of them",
                ],
                [
                  "EDS acquisition",
                  "Area spectrum from a flat region of the surface, single acquisition, [XXX] s",
                ],
                ["EDS quantification", "Standardless, normalised to 100 mass%"],
                [
                  "Parameters that must be matched",
                  "Sample state, coating material, accelerating voltage and the magnification series",
                ],
                [
                  "Known limitations",
                  "Quantification is standardless and normalised, so comparisons between the heavier elements are meaningful while absolute mass fractions are not, and the carbon value in particular is not. EDS does not detect hydrogen, the gold coating consumes part of the normalised total, and the measurement is surface-sensitive and sampled from one area",
                ],
              ],
            },
          },
        },
        {
          id: "section-sem-sample-preparation",
          title: "Sample preparation",
          foldable: true,
          blocks: [
            {
              paragraphs: [
                "Only dried, whole **core-shell** capsules were analysed, obtained by the same air-drying method used for the TGA samples (capsule placed on absorbent paper and left to dry overnight), so that thermal and microstructural results could be compared on capsules prepared under equivalent conditions. No cross-sectioning was performed for SEM: cutting or fracturing a fully dried capsule risked shrinkage or collapse of the shell during drying, which could distort or obscure the core-shell interface, so only whole, intact capsule surfaces were imaged.",
                "Because alginate is not intrinsically conductive, the dried capsules required a conductive coating before imaging. Coating was attempted first with graphite; since this did not provide sufficient image quality, gold coating was used instead, and all reported micrographs are of gold-coated specimens.",
                "Two capsules from separate production runs were imaged, with a second area examined on one of them, so that any feature described as characteristic of the material is supported by more than one specimen. The same series of magnifications was acquired on each, from a whole-capsule overview to the highest magnification used, which is what makes the two series comparable panel by panel.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-sem-results",
      title: "Results",
      foldable: true,
      blocks: [
        {
          pairedResource: {
            kind: "image-group",
            images: [
              {
                src: "assets/measurements/sem-whole-dried-capsule-at-90.jpg",
                alt: "Whole dried capsule at 90×",
                title: "Capsule 1 — 90×",
              },
              {
                src: "assets/measurements/sem-capsule-surface-overview-at-400.jpg",
                alt: "Capsule surface overview at 400×",
                title: "Capsule 1 — 400×",
              },
              {
                src: "assets/measurements/sem-second-capsule-surface-overview-at-400.jpg",
                alt: "Second capsule surface overview at 400×",
                title: "Capsule 2 — 400×",
              },
              {
                src: "assets/measurements/sem-capsule-surface-at-2000.jpg",
                alt: "Capsule surface at 2000×",
                title: "Capsule 1, area A — 2000×",
              },
              {
                src: "assets/measurements/sem-second-area-of-the-same-capsule.jpg",
                alt: "Second area of the same capsule at 2000×",
                title: "Capsule 1, area B — 2000×",
              },
              {
                src: "assets/measurements/sem-second-capsule-at-2000.jpg",
                alt: "Second capsule at 2000×",
                title: "Capsule 2 — 2000×",
              },
              {
                src: "assets/measurements/sem-capsule-surface-at-7000.jpg",
                alt: "Capsule surface at 7000×",
                title: "Capsule 1, area A — 7000×",
              },
              {
                src: "assets/measurements/sem-second-area-of-the-same-capsule-2.jpg",
                alt: "Second area of the same capsule at 7000×",
                title: "Capsule 1, area B — 7000×",
              },
              {
                src: "assets/measurements/sem-second-capsule-at-7000.jpg",
                alt: "Second capsule at 7000×",
                title: "Capsule 2 — 7000×",
              },
              {
                src: "assets/measurements/sem-capsule-surface-at-20000.jpg",
                alt: "Capsule surface at 20000×",
                title: "Capsule 1, area A — 20000×",
              },
              {
                src: "assets/measurements/sem-second-area-of-the-same-capsule-3.jpg",
                alt: "Second area of the same capsule at 20000×",
                title: "Capsule 1, area B — 20000×",
              },
              {
                src: "assets/measurements/sem-second-capsule-at-20000.jpg",
                alt: "Second capsule at 20000×",
                title: "Capsule 2 — 20000×",
              },
            ],
            caption:
              "SEM micrographs of dried, gold-coated core-shell capsules. A whole capsule at 90× and surface overviews at 400×, then the 2000×, 7000× and 20000× series, each row showing a different capsule or a different area of the same capsule.",
          },
        },
        {
          paragraphs: [
            "Micrographs were acquired from 90× to 20000× on two separately produced capsules, with a second area imaged on one of them. Graphite coating was attempted first and did not give sufficient image quality, so the capsules were re-coated with gold and re-imaged. The surface morphology is consistent with the rough, wrinkled texture reported for dried calcium alginate beads [2], and the open network expected for a mannuronate-rich alginate [5] appears only at the highest magnifications, so the dried state has to be kept in mind throughout.",
            "At 90× both capsules have collapsed and folded inward, one lobed with a deep crease, the other split by a central cleft. They lost a similar volume but buckled in different ways, so the shape of the collapse is not reproducible, which is what a shell that yields wherever it is weakest should do. At 400× the surface is smooth and unbroken across a wide, gently curved area, with a single fine crack in one capsule and nothing comparable anywhere else in either series: no pinholes, tears or peeling patches. That is the result with the most direct bearing on the platform, since it says the shell survives extrusion, gelation and washing as a **continuous** membrane, and the one crack is most plausibly a drying effect rather than a defect in the capsule.",
            "From 2000× to 20000× both capsules follow the same progression: smooth at the lowest magnification, visibly rough at the intermediate one, and resolved into an open network with pores at the highest. The second area imaged on one capsule goes through the same three stages, flatter in one place and more folded in another, which tracks how the membrane creased as it dried. Seeing the same sequence in two independently made capsules is what allows these textures to be described as characteristic of the dried material rather than of one specimen. It also sets the limit of the technique here: the pores visible at high magnification are not the pores of a working capsule, because air-drying does not preserve the open structure of a hydrated network, it preserves the creases and tears left when that network collapsed [4]. **Permeability** would have to come from transport measurements, which were not part of this work, rather than from these images.",
          ],
        },
        {
          pairedResource: {
            kind: "table",
            table: {
              caption:
                "Elemental composition of the capsule surface by EDS. Gold comes from the conductive coating.",
              headers: ["Element", "Line", "Mass %", "Atom %"],
              rows: [
                ["C", "K", "34.63 ± 0.25", "50.61 ± 0.37"],
                ["O", "K", "35.98 ± 0.49", "39.47 ± 0.54"],
                ["Cl", "K", "4.29 ± 0.16", "2.13 ± 0.08"],
                ["Ca", "K", "15.92 ± 0.41", "6.97 ± 0.18"],
                ["Au", "M", "9.17 ± 0.33", "0.82 ± 0.03"],
              ],
            },
          },
        },
        {
          paragraphs: [
            "One feature in the micrographs is compositional rather than topographic, the bright crust along the rim of one capsule, and the elemental analysis explains it. Five elements appear and each belongs to something that went into making the capsule: carbon and oxygen dominate as expected from a polysaccharide, gold comes from the coating, and the information is in calcium and chlorine. Calcium is abundant at 6.97 at% while chlorine is comparatively scarce at 2.13 at%, where unreacted calcium chloride would give two chlorines for every calcium. There is about six times more calcium than that allows, so only around one atom in six can be residual salt and most of the rest is bound to the carboxylate groups of the polymer. No sodium is detected above the detection limit, although the alginate used is the sodium salt, which indicates that the sodium to calcium exchange went essentially to completion in the area sampled. Together these two observations say the polymer at the surface was converted to calcium alginate rather than merely exposed to a calcium solution, and the residual chloride, low but present, says the washing removes most of the bath salt without removing all of it.",
            "The analysis is standardless, which sets what can and cannot be claimed from it. Relative comparisons between the heavier elements are sound, and the calcium to chlorine ratio that carries the main conclusion is one of those. The carbon signal is not quantified reliably by this method, so the apparent excess of calcium over the one-per-two-monomers stoichiometry that ionic gelation requires can be stated as a direction but not as a figure. The gold is an artefact of sample preparation and is excluded from any interpretation. The measurement is also surface-sensitive and sampled from one area, so it describes the outside of the capsule rather than the shell as a whole.",
            "These observations were interpreted alongside the water content from TGA and the shell-thickness data from image analysis. The three agree: a dried capsule whose volume has fallen to a few percent of the hydrated value is consistent with a solid content of around 5% by mass, and a shell that reads as a continuous membrane under the electron beam is consistent with the retention of shell-embedded particles measured by UV-Vis. No cross-section was imaged, so the shell thickness itself is not measured here and remains the image-analysis result.",
          ],
        },
        {
          callouts: [
            {
              kind: "outcome",
              text: "**Together these results completed the physical characterisation of the encapsulation platform ahead of its integration with the biological module.** The chemistry the encapsulation protocol assumes is confirmed at the surface, the shell is continuous, and the surface texture of the dried material is reproducible between capsules.",
            },
          ],
        },
        {
          callouts: [
            {
              kind: "not-done",
              text: "**Two follow-ups would close what remains open:** comparing curing times or a more thorough wash, to establish how much of the calcium excess and the residual chloride can be removed, and imaging a cryogenically prepared or hydrated specimen [4], which is the only way to say anything about the porosity that actually governs transport.",
            },
          ],
        },
      ],
    },
  ],
  references: [
    "[1] Goldstein JI, Newbury DE, Michael JR, Ritchie NWM, Scott JHJ, Joy DC. Scanning electron microscopy and X-ray microanalysis. Springer; 2018. Available from: https://doi.org/10.1007/978-1-4939-6676-9",
    "[2] Larosa C, Salerno M, De Lima JS, Meri RM, Da Silva MF, De Carvalho LB, et al. Characterisation of bare and tannase-loaded calcium alginate beads by microscopic, thermogravimetric, FTIR and XRD analyses. International Journal of Biological Macromolecules. 2018;115:900-6. Available from: https://doi.org/10.1016/j.ijbiomac.2018.04.138",
    "[3] Tran DT, Nguyen NK, Yadav AS, Chuang A, Burford M, Malekpour Galogahi F, et al. Calcium alginate core-shell liquid beads encapsulated with microalgae for wastewater treatment. Advanced Energy and Sustainability Research. 2024;5(7):2400112. Available from: https://doi.org/10.1002/aesr.202400112",
    "[4] Koch M, Włodarczyk-Biegun MK. Faithful scanning electron microscopic (SEM) visualization of 3D printed alginate-based scaffolds. Bioprinting. 2020;20:e00098. Available from: https://doi.org/10.1016/j.bprint.2020.e00098",
    "[5] Reig-Vano B, Huck-Iriart C, De La Flor S, Trojanowska A, Tylkowski B, Giamberini M. Structural and mechanical analysis on mannuronate-rich alginate gels and xerogels beads based on calcium, copper and zinc as crosslinkers. International Journal of Biological Macromolecules. 2023;246:125659. Available from: https://doi.org/10.1016/j.ijbiomac.2023.125659",
  ],
};

export const ENCAPSULATION_SUMMARY =
  "Capsule structure, water content, stability and containment";

export const ENCAPSULATION_CHARACTERISATION = [
  "The characterisation runs in the order the decisions had to be made. Infrared spectroscopy came first, on the raw powder, because the mechanical behaviour of any calcium **alginate** gel depends on the composition of the alginate it was made from, and that varies by batch and supplier, so treating “alginate” as a known quantity would have put an unmeasured variable underneath every later result. Image analysis then carried the production work: the size and shape of beads and capsules under each set of conditions, the shell thickness in cross-section, and the deformation of individual capsules under increasing load. Thermal analysis established how much of a capsule is water and how stable the material is on heating. Electron microscopy and elemental analysis described the surface and confirmed that the polymer really is crosslinked calcium alginate rather than alginate that merely met a calcium solution. Ultraviolet-visible spectroscopy, finally, tested containment directly, by looking for the core in the liquid outside the capsule.",
  "Two of these measurements only became possible after a change to the sample rather than to the instrument, and both are worth more than the numbers they produced. The shell could not be told from the core in an optical image at all until magnetite was incorporated into the alginate phase, which made the boundary visible and turned shell thickness into a measurable quantity. And a dried capsule is not a smaller version of a hydrated one, so the electron micrographs describe a collapsed structure, which is why the porosity visible in them is explicitly not used to say anything about **permeability**. Knowing which of our images describe the working material and which describe an artefact of preparation is part of the result.",
  "The techniques also check each other, and that is the main reason there are five of them. The water content from thermal analysis, around 95% by mass, agrees with the volume loss measured optically on drying. And where one measurement could not answer its question, another was built to answer it instead: shell thickness turned out to vary more within a single capsule than between formulations, so the comparison that mattered was moved to the mechanical assay, which measures how the capsules deform rather than how round they are. Each technique page reports the parameters another team would need to repeat it, the **controls** and calibrations behind each number, and the point at which its own dispersion makes it stop discriminating.",
];

export const ENCAPSULATION_CONCLUSIONS = [
  "The platform is characterised well enough to build on, and the limits of that characterisation are known. Production is controllable: alginate concentration and drop height set shape and **reproducibility** rather than size, flow rate can be raised several-fold without destabilising drop formation, and **crosslinking** time beyond ten minutes changes nothing until contraction appears at ninety. The capsules are approximately 95% water, thermally stable far beyond anything the process will reach, built from genuinely crosslinked calcium alginate, and **continuous** in their shell under the electron beam, with no capsule rupturing at any load tested. Storage in water for a week makes them stronger rather than weaker, which is the opposite of what we expected and the result with the most direct consequence for operation, since the bioreactor receives stored capsules rather than fresh ones.",
  "Two findings are about measurement rather than material, and they are the ones we would pass on. Dispersion, not the mean, was the useful statistic in nearly every comparison: the conditions that selected themselves did so by being reproducible, and the one measurement that failed, shell thickness, failed because its spread exceeded the difference it was meant to resolve. And when a geometric quantity sits below the **resolution** available, measuring the function that quantity is supposed to serve can succeed where measuring the quantity cannot, which is how the flow-rate ratio was finally settled.",
  "What is still missing is also clear. **Permeability** has never been measured, only bounded by the fact that phosphate reaches the cells; the dried-state imaging cannot supply it and transport experiments would be needed. Absolute mechanical properties, a modulus or a rupture load, are beyond an image-based assay. And every preservation result points at the same untested variable: the capsules degrade in media that compete for calcium, so the composition of the real effluent, rather than the mechanics of the capsule, is the thing most likely to decide whether the platform holds up outside the laboratory.",
];

export const ENCAPSULATION_MEASUREMENTS: ExperimentData[] = [
  FTIR,
  IMAGEJ,
  UV_VIS,
  TGA_DSC,
  SEM,
];