import type {
  ResultData,
  ResultSubBlock,
} from "../../components/LabFolders/types";

/**
 * Alginate encapsulation results, transcribed from the team's own Notion
 * results page ("Alginate encapsulation", under WIKI / Results). The
 * sub-blocks, their order and the record titles follow that page, which in
 * turn follows the Experiments page.
 *
 * Every record keeps the source's own three-answer template. Where the
 * source still reads [XXX] — flow rate, mechanical resistance, core-shell
 * preservation, TGA-DSC and SEM — the record is marked `pending` rather
 * than written around: those experiments were run, so dropping them would
 * misrepresent the work, and filling them in would be inventing results.
 *
 * Figures: the bead-preservation photographs are the source's own,
 * downloaded from Notion into public/assets/results/encapsulation. Every
 * other figure callout here is still a brief for a figure that has not
 * been made ("[Figure X. Representative images of beads produced at each
 * combination...]"), so those stay caption-only, carrying the brief so it
 * remains visible which figure each record is waiting on. The core-shell
 * pH, PBS and wastewater photo series in the source are left out: they
 * belong to records whose write-up is still pending, and a photograph with
 * no result to read it against is not yet a figure.
 *
 * Like every image on this wiki, the ones referenced here still have to go
 * through the iGEM uploads tool and be re-pointed at static.igem.wiki
 * before the Wiki Freeze (see MIGRATION.md).
 */

const FIGURES = "assets/results/encapsulation";

export const ENCAPSULATION_INTRO =
  "This block builds the encapsulation platform of the rePhlow sphere: the raw alginate is characterised, a reproducible bead protocol is established, the system is translated into a core-shell architecture and validated against the chemical, physical and mechanical demands of the bioreactor, and the final platform is characterised structurally. Each record reports the outcome of the corresponding experiment on the Experiments page, following the same order and titles.";

const FTIR: ResultData = {
  id: "alginate-ftir",
  tabLabel: "FTIR characterisation",
  title: "Alginate characterisation by FTIR",
  description:
    "The relative proportion of G and M residues governs the crosslinking behaviour and mechanical properties assumed throughout the rest of the encapsulation work, so this is where that composition is established.",
  subsections: [
    {
      id: "ftir-mg-ratio",
      observations:
        "Two independent literature-established wavenumber pairs were used to estimate the M/G ratio. The 808/787 cm⁻¹ pair (Mackie) gave M/G = 2.84; the 1030/1080 cm⁻¹ pair (Sakugawa et al.) gave M/G = 2.42. Band assignments in the fingerprint region were consistent with those reported by Leal et al., with a clear band at approximately 814 cm⁻¹ and a weaker shoulder near 781 cm⁻¹.",
      interpretation:
        "Both independent pairs agree in direction, M/G > 1, indicating a mannuronic-rich alginate. This is expected to produce a comparatively softer, more elastic calcium-alginate gel, which fed directly into how tightly the synthesis parameters of the following experiments needed to be controlled to reach sufficient mechanical integrity.",
    },
  ],
};

const BEAD_CONCENTRATION_HEIGHT: ResultData = {
  id: "bead-concentration-height",
  tabLabel: "Concentration & drop height",
  title: "Bead optimisation: alginate concentration and drop height",
  subsections: [
    {
      id: "bead-shape-and-size",
      body: [
        "Bead size was similar across all twenty conditions tested, with mean equivalent diameters between approximately 3.3 and 3.7 mm and no systematic trend with either alginate concentration or drop height. In contrast, bead shape and its reproducibility depended clearly on alginate concentration.",
        "Beads produced with 3.5% (w/v) alginate showed the highest circularity (0.88–0.89) and roundness (0.93–0.95) of all concentrations, and these values remained practically constant across all five drop heights, with very low variability between beads (standard deviation of circularity ≈ 0.01). At 3% (w/v), similar circularity was only reached at a drop height of 3 cm (0.88 ± 0.01), while both the lowest and highest heights produced less regular and more variable beads. At 2.5% and especially at 2% (w/v), circularity was consistently lower (approximately 0.81–0.85 and 0.78–0.81, respectively) and showed greater variability between beads, regardless of drop height.",
      ],
      figures: [
        {
          caption:
            "Figure pending. Representative images of beads produced at each combination of alginate concentration (rows: 2, 2.5, 3 and 3.5% w/v) and drop height (columns: 1, 2, 3, 4 and 5 cm). One representative bead per condition, same magnification and scale bar in all panels.",
        },
        {
          caption:
            "Figure pending. Circularity (mean ± SD, n = 10) as a function of drop height for each alginate concentration, one line per concentration.",
        },
        {
          caption:
            "Figure pending. Equivalent diameter (mean ± SD, n = 10) as a function of drop height for each alginate concentration, on the same layout as the circularity figure, showing that size remained approximately constant across conditions.",
        },
      ],
      tables: [
        {
          caption:
            "Equivalent diameter (Deq, mm) of beads produced at different alginate concentrations and drop heights (mean ± SD, n = 10). The selected condition is 3.5% at 3 cm.",
          headers: ["Drop height (cm)", "2%", "2.5%", "3%", "3.5%"],
          rows: [
            ["1", "3.56 ± 0.11", "3.50 ± 0.11", "3.64 ± 0.12", "3.58 ± 0.07"],
            ["2", "3.40 ± 0.12", "3.58 ± 0.06", "3.45 ± 0.15", "3.48 ± 0.10"],
            ["3", "3.44 ± 0.23", "3.61 ± 0.08", "3.46 ± 0.10", "3.65 ± 0.06"],
            ["4", "3.27 ± 0.10", "3.55 ± 0.11", "3.56 ± 0.08", "3.58 ± 0.06"],
            ["5", "3.56 ± 0.07", "3.64 ± 0.10", "3.66 ± 0.15", "3.59 ± 0.10"],
          ],
        },
        {
          caption:
            "Circularity of beads produced at different alginate concentrations and drop heights (mean ± SD, n = 10). The selected condition is 3.5% at 3 cm.",
          headers: ["Drop height (cm)", "2%", "2.5%", "3%", "3.5%"],
          rows: [
            [
              "1",
              "0.801 ± 0.049",
              "0.842 ± 0.071",
              "0.772 ± 0.068",
              "0.886 ± 0.009",
            ],
            [
              "2",
              "0.803 ± 0.033",
              "0.851 ± 0.024",
              "0.828 ± 0.093",
              "0.883 ± 0.011",
            ],
            [
              "3",
              "0.804 ± 0.045",
              "0.831 ± 0.019",
              "0.877 ± 0.010",
              "0.885 ± 0.013",
            ],
            [
              "4",
              "0.807 ± 0.023",
              "0.810 ± 0.041",
              "0.856 ± 0.015",
              "0.887 ± 0.010",
            ],
            [
              "5",
              "0.783 ± 0.047",
              "0.850 ± 0.021",
              "0.838 ± 0.056",
              "0.883 ± 0.009",
            ],
          ],
        },
      ],
      interpretation:
        "Within the range tested, alginate concentration governs bead shape and reproducibility, whereas bead size is largely insensitive to both variables. The higher viscosity of the 3.5% (w/v) solution allowed droplets to retain their shape on impact with the bath, making bead morphology robust to changes in drop height. At lower concentrations, the droplets were more easily deformed on impact, so shape became both less regular and more dependent on the exact setup. Since no condition produced substantially smaller beads, the surface-to-volume criterion did not discriminate between conditions, and 3.5% (w/v) alginate at a drop height of 3 cm was selected based on sphericity and reproducibility.",
      expectation:
        "The effect of alginate concentration matched our expectations: more concentrated, more viscous solutions produced more spherical and reproducible beads, and no detachment problems or tailed beads were observed up to 3.5% (w/v). The effect of drop height, however, was weaker than anticipated. An intermediate optimum was only observed at 3% (w/v), where both extremes produced more deformed beads, whereas at 3.5% (w/v) the viscosity of the solution was high enough to make the beads practically insensitive to drop height across the whole range tested.",
    },
  ],
};

const BEAD_FLOW_RATE: ResultData = {
  id: "bead-flow-rate",
  tabLabel: "Flow rate",
  title: "Bead optimisation: flow rate",
  pending: true,
  subsections: [],
};

const BEAD_CROSSLINKING: ResultData = {
  id: "bead-crosslinking-time",
  tabLabel: "Crosslinking time",
  title: "Bead optimisation: crosslinking time",
  subsections: [
    {
      id: "crosslinking-time",
      body: [
        "Crosslinking time had little effect on bead shape: circularity remained between approximately 0.81 and 0.87 for all times tested, with no consistent trend, and the lowest variability between beads was obtained at 30 min. Bead size remained broadly constant between 10 and 60 min, with mean equivalent diameters between 3.6 and 3.9 mm. In contrast, beads crosslinked for 90 min were clearly smaller, with a mean equivalent diameter of 3.38 mm, corresponding to a reduction of approximately 9% in diameter and 17% in projected area relative to 30 min.",
      ],
      figures: [
        {
          caption:
            "Figure pending. Representative images of beads after 10, 20, 30, 40, 60 and 90 min of crosslinking, same magnification and scale bar in all panels.",
        },
      ],
      tables: [
        {
          caption:
            "Size and shape descriptors of 3.5% (w/v) alginate beads after different crosslinking times (mean ± SD). The selected condition is 30 min.",
          headers: [
            "Crosslinking time (min)",
            "n",
            "Area (mm²)",
            "Deq (mm)",
            "Circularity",
            "Roundness",
          ],
          rows: [
            [
              "10",
              "10",
              "10.77 ± 0.52",
              "3.70 ± 0.09",
              "0.842 ± 0.046",
              "0.900 ± 0.064",
            ],
            [
              "20",
              "10",
              "11.66 ± 0.47",
              "3.85 ± 0.08",
              "0.812 ± 0.089",
              "0.901 ± 0.093",
            ],
            [
              "30",
              "10",
              "10.78 ± 0.56",
              "3.70 ± 0.10",
              "0.862 ± 0.007",
              "0.900 ± 0.076",
            ],
            [
              "40",
              "8",
              "10.49 ± 0.39",
              "3.65 ± 0.07",
              "0.855 ± 0.015",
              "0.893 ± 0.035",
            ],
            [
              "60",
              "10",
              "10.33 ± 0.51",
              "3.62 ± 0.09",
              "0.844 ± 0.025",
              "0.853 ± 0.083",
            ],
            [
              "90",
              "9",
              "9.00 ± 0.33",
              "3.38 ± 0.06",
              "0.866 ± 0.018",
              "0.931 ± 0.042",
            ],
          ],
        },
      ],
      interpretation:
        "Gelation was already sufficient within the first 10 min to produce fully formed beads, and longer residence in the calcium chloride bath did not substantially modify their shape. Prolonged crosslinking did, however, cause contraction of the beads, which only became evident at 90 min. This is consistent with the progressive formation of additional calcium-mediated junctions in the alginate network, which draws the polymer chains closer together and expels water from the gel. Since no clear morphological advantage was obtained by extending the crosslinking time, the 30 min crosslinking time commonly reported in the literature was retained, providing fully formed beads with low variability without unnecessarily extending production time.",
      expectation:
        "Partially. We anticipated that longer exposure to calcium ions could produce more compact beads, and this was observed, although only at the longest time tested rather than as a gradual trend. The absence of significant differences between 10 and 60 min confirmed that crosslinking time was not a critical parameter within the usual working range.",
    },
  ],
};

const BEAD_PRESERVATION: ResultData = {
  id: "bead-preservation",
  tabLabel: "Storage media",
  title: "Bead preservation under different storage media",
  subsections: [
    {
      id: "storage-media",
      body: [
        "Beads stored in water remained stable throughout the experiment, with changes in equivalent diameter below 4% and no change in circularity.",
        "Beads stored in industrial wastewater shrank markedly during the first 24 h, with the equivalent diameter decreasing from 3.56 to 3.06 mm (approximately 26% in projected area), and then remained approximately constant, recovering only slightly by 72 h. Their circularity increased slightly over the same period, and no loss of structural integrity was observed, although the beads appeared more fragile when handled.",
        "Beads stored in PBS showed the opposite behaviour: after 24 h they had swollen markedly, with the equivalent diameter increasing from 3.53 to 4.44 mm (approximately 60% in projected area), while their circularity decreased and the variability between beads increased considerably. By 48 h, only half of the beads remained intact enough to be measured, and by 72 h none could be analysed, as they had dissolved or broken apart.",
      ],
      figures: [
        {
          caption:
            "Figure pending. Relative change in projected area (A/A₀, mean ± SD) over time for beads stored in water, industrial wastewater and PBS, one line per medium; the PBS series ends at 48 h, with the reduced number of measurable beads indicated.",
        },
        {
          src: `${FIGURES}/beads-water-0h.jpg`,
          alt: "Alginate beads stored in water, photographed at 0 h.",
          caption: "Water, 0 h.",
        },
        {
          src: `${FIGURES}/beads-water-24h.jpg`,
          alt: "Alginate beads stored in water, photographed at 24 h.",
          caption: "Water, 24 h.",
        },
        {
          src: `${FIGURES}/beads-water-48h.jpg`,
          alt: "Alginate beads stored in water, photographed at 48 h.",
          caption: "Water, 48 h.",
        },
        {
          src: `${FIGURES}/beads-water-72h.jpg`,
          alt: "Alginate beads stored in water, photographed at 72 h.",
          caption: "Water, 72 h.",
        },
        {
          src: `${FIGURES}/beads-wastewater-0h.jpg`,
          alt: "Alginate beads stored in industrial wastewater, photographed at 0 h.",
          caption: "Industrial wastewater, 0 h.",
        },
        {
          src: `${FIGURES}/beads-wastewater-24h.jpg`,
          alt: "Alginate beads stored in industrial wastewater, photographed at 24 h.",
          caption: "Industrial wastewater, 24 h.",
        },
        {
          src: `${FIGURES}/beads-wastewater-48h.jpg`,
          alt: "Alginate beads stored in industrial wastewater, photographed at 48 h.",
          caption: "Industrial wastewater, 48 h.",
        },
        {
          src: `${FIGURES}/beads-wastewater-72h.jpg`,
          alt: "Alginate beads stored in industrial wastewater, photographed at 72 h.",
          caption: "Industrial wastewater, 72 h.",
        },
        {
          src: `${FIGURES}/beads-pbs-0h.jpg`,
          alt: "Alginate beads stored in pbs, photographed at 0 h.",
          caption: "PBS, 0 h.",
        },
        {
          src: `${FIGURES}/beads-pbs-24h.jpg`,
          alt: "Alginate beads stored in pbs, photographed at 24 h.",
          caption: "PBS, 24 h.",
        },
        {
          src: `${FIGURES}/beads-pbs-48h.jpg`,
          alt: "Alginate beads stored in pbs, photographed at 48 h.",
          caption: "PBS, 48 h.",
        },
        {
          src: `${FIGURES}/beads-pbs-72h.jpg`,
          alt: "Alginate beads stored in pbs, photographed at 72 h.",
          caption: "PBS, 72 h.",
        },
      ],
      tables: [
        {
          caption:
            "Equivalent diameter (Deq, mm) of 3.5% (w/v) alginate beads stored in water, industrial wastewater and PBS over time (mean ± SD, n = 10). *n = 5; the remaining beads could not be measured. n.m.: not measurable.",
          headers: ["Time (h)", "Water", "Industrial wastewater", "PBS"],
          rows: [
            ["0", "3.47 ± 0.11", "3.56 ± 0.11", "3.53 ± 0.12"],
            ["24", "3.49 ± 0.15", "3.06 ± 0.10", "4.44 ± 0.44"],
            ["48", "3.34 ± 0.13", "3.12 ± 0.11", "3.27 ± 0.19*"],
            ["72", "3.43 ± 0.09", "3.20 ± 0.08", "n.m."],
          ],
        },
        {
          caption:
            "Circularity of the same beads over time (mean ± SD, n = 10). *n = 5. n.m.: not measurable.",
          headers: ["Time (h)", "Water", "Industrial wastewater", "PBS"],
          rows: [
            ["0", "0.848 ± 0.020", "0.854 ± 0.027", "0.871 ± 0.014"],
            ["24", "0.838 ± 0.019", "0.877 ± 0.010", "0.704 ± 0.220"],
            ["48", "0.851 ± 0.021", "0.880 ± 0.011", "0.804 ± 0.042*"],
            ["72", "0.845 ± 0.023", "0.877 ± 0.008", "n.m."],
          ],
        },
      ],
      interpretation:
        "The storage medium has a strong effect on calcium-crosslinked alginate beads, with each medium producing a distinct response. In PBS, the marked swelling followed by disintegration indicates that the calcium crosslinks holding the network together were progressively disrupted, so that the gel first lost its ability to restrain swelling and then lost its integrity altogether. In industrial wastewater, the beads contracted instead of swelling, which is consistent with the protonation of the alginate carboxylate groups at the very low pH of this medium, reducing electrostatic repulsion between the polymer chains. This contraction did not compromise bead integrity during storage, but the increased fragility observed during handling suggests that it may affect their mechanical properties. Water, with minimal ionic interference, preserved the beads without measurable changes.",
      expectation:
        "The behaviour in PBS matched our expectations, as sodium ions and phosphate were expected to compete with or sequester the calcium ions crosslinking the alginate network. The degradation was, however, faster and more severe than anticipated, with complete loss of the beads within 72 h. The shrinkage in industrial wastewater was not specifically anticipated, but it is consistent with the known behaviour of alginate at low pH. Since the media differed simultaneously in ionic composition, ionic strength and pH, the specific cause of each response could not be isolated, which motivated the more controlled preservation study later carried out with core-shell capsules.",
    },
  ],
};

const CORE_SHELL_SCREENING: ResultData = {
  id: "core-shell-screening",
  tabLabel: "Concentration screening",
  title: "Core-shell screening: alginate and CaCl₂ concentrations",
  subsections: [
    {
      id: "jetting-regime",
      body: [
        "The formation regime was recorded for each combination of outer alginate and inner CaCl₂ concentrations, classifying each condition according to whether jetting was observed.",
        "Stable dripping was observed for all alginate concentrations when the inner phase contained 0 or 0.5% (w/v) CaCl₂. With 2% (w/v) alginate, stable dripping was maintained up to 1.5% (w/v) CaCl₂, and jetting only appeared at 2% (w/v). For 2.5, 3 and 3.5% (w/v) alginate, however, jetting already appeared at 1% (w/v) CaCl₂, so higher calcium concentrations were not tested for these alginate concentrations. Whenever jetting occurred, alginate gelled and accumulated at the tip of the injector, preventing the detachment of discrete drops.",
      ],
      figures: [
        {
          caption:
            "Figure pending. Representative images of the outlet of the coaxial injector under stable dripping and under jetting, showing discrete drop detachment in the first case and the continuous stream associated with alginate accumulation at the tip in the second.",
        },
      ],
      tables: [
        {
          caption:
            "Occurrence of jetting for each combination of outer alginate concentration (rows, % w/v) and inner CaCl₂ concentration (columns, % w/v), at Qe = 600 µL/min and Qi = 200 µL/min. The selected condition is 3.5% alginate with 0.5% CaCl₂. n/t: not tested.",
          headers: ["Alginate (% w/v)", "0% CaCl₂", "0.5%", "1%", "1.5%", "2%"],
          rows: [
            ["2", "No", "No", "No", "No", "Yes"],
            ["2.5", "No", "No", "Yes", "n/t", "n/t"],
            ["3", "No", "No", "Yes", "n/t", "n/t"],
            ["3.5", "No", "No (selected)", "Yes", "n/t", "n/t"],
          ],
        },
      ],
      interpretation:
        "Core-shell formation is governed by the combination of both phases rather than by either concentration alone. The tolerance to internal calcium dropped sharply when moving from 2% to 2.5% (w/v) alginate: jetting appeared at 1% instead of 2% (w/v) CaCl₂. A higher alginate concentration provides more crosslinkable polymer and a more viscous outer phase at the injector tip, so the gel formed at the interface builds up faster than the drop can detach. Within the concentrations of interest, 3% and 3.5% (w/v) alginate, 0.5% (w/v) CaCl₂ was therefore the highest tested inner concentration compatible with stable dripping, and this combination was carried forward for the optimisation of the flow-rate ratio.",
      expectation:
        "The appearance of jetting at high internal CaCl₂ concentrations was expected, as it had already been observed in the initial core-shell trial with 3% (w/v) alginate and 2% (w/v) CaCl₂, and confirmed the hypothesis that excessively fast interfacial gelation prevents drop detachment. The strong dependence of this threshold on alginate concentration was not anticipated to this extent: we expected a gradual shift in the tolerated calcium concentration, rather than an abrupt drop between 2% and 2.5% (w/v) alginate.",
    },
  ],
};

const CORE_SHELL_FLOW_RATIO: ResultData = {
  id: "core-shell-flow-ratio",
  tabLabel: "Flow-rate ratio",
  title: "Core-shell optimisation: outer-to-inner flow-rate ratio",
  subsections: [
    {
      id: "shell-thickness",
      body: [
        "Without a contrast agent, the alginate shell could not be reliably distinguished from the liquid core in the microscopy images. After incorporating magnetite into the alginate phase, the shell became clearly visible, and its thickness could be measured for all eight conditions.",
        "Mean shell thicknesses ranged from approximately 240 to 475 µm. No consistent effect of the flow-rate ratio was observed: the 6:1 ratio produced thicker shells than the 4:1 ratio in two of the four comparisons (3% at 300 µL/min and 3.5% at 600 µL/min), but similar or thinner shells in the other two. Variability was high in all conditions, both within individual capsules, with standard deviations of approximately 60–90 µm between measurement points of the same shell, and between capsules produced under the same conditions, particularly for 3.5% (w/v) alginate at 600 µL/min. The clearest trend was associated with alginate concentration rather than with the ratio: at 600 µL/min, capsules produced with 3.5% (w/v) alginate had thicker shells than those produced with 3% (w/v).",
      ],
      figures: [
        {
          caption:
            "Figure pending. Representative cross-sections of bisected core-shell capsules (a) without magnetite and (b) with magnetite incorporated into the alginate phase, showing the improvement in contrast between the shell and the liquid core.",
        },
        {
          caption:
            "Figure pending. Shell thickness of individual capsules for each condition (one dot per capsule, with mean ± SD), grouped by alginate concentration and outer flow rate, with 4:1 and 6:1 side by side.",
        },
      ],
      tables: [
        {
          caption:
            "Shell thickness (µm) of core-shell capsules produced with 3% and 3.5% (w/v) alginate at different outer and inner flow rates (mean ± SD between capsules, n = 10 capsules; *n = 6). Each capsule value is the mean of approximately 10 measurements taken around the shell.",
          headers: ["Qe / Qi (µL/min)", "Qe/Qi", "3%", "3.5%"],
          rows: [
            ["600 / 150", "4:1", "360 ± 78", "418 ± 149"],
            ["600 / 100", "6:1", "335 ± 65", "475 ± 167"],
            ["300 / 75", "4:1", "242 ± 30", "339 ± 62*"],
            ["300 / 50", "6:1", "331 ± 88", "293 ± 46"],
          ],
        },
      ],
      interpretation:
        "Magnetite incorporation solved the visualisation problem, but shell thickness could not reliably discriminate between the two flow-rate ratios. The variability within each capsule indicates that a large part of the dispersion originates from the measurement itself: the shell boundary was not always sharply defined, and the apparent thickness depends on how centrally each capsule was bisected. The variability between capsules indicates that differences in capsule production also contributed. Shell thickness was therefore not used as the selection criterion, and the two ratios were instead compared through their mechanical resistance.",
      expectation:
        "No. A higher outer-to-inner ratio increases the proportion of alginate in each capsule, so the 6:1 ratio was expected to produce consistently thicker shells than the 4:1 ratio. The absence of a clear difference, together with the high variability of the measurements, indicates that the effect of the ratio, if present, was smaller than the resolution of the measurement method.",
    },
  ],
};

const CORE_SHELL_CONTAINMENT: ResultData = {
  id: "core-shell-containment",
  tabLabel: "Containment",
  title: "Core-shell containment assessed with magnetite",
  subsections: [
    {
      id: "magnetite-containment",
      body: [
        "The control spectra showed that the capsule material absorbed mainly below approximately 250 nm, whereas the reference spectrum of magnetite showed a broad, almost featureless absorbance across the whole ultraviolet and visible range. In the visible region, the capsule material therefore made a negligible contribution, and any absorbance above that of the control could be attributed to magnetite.",
        "No magnetite was detected in the storage water after one or three days, for either configuration: the absorbance of the magnetite-containing samples was equal to or slightly below that of the control. The calcium chloride bath collected after synthesis showed only a very small positive difference, identical for both configurations and close to the noise level of the measurement. After dissolution in PBS, capsules containing magnetite in the alginate shell produced a clear absorbance increase across the whole visible range, whereas capsules containing magnetite in the core produced no detectable signal. The diluted magnetite reference suspension could not be detected above the blank.",
      ],
      figures: [
        {
          caption:
            "Figure pending. Absorbance spectra (250–1000 nm) of (a) the calcium chloride synthesis bath, (b) the storage water after one day, (c) the storage water after three days and (d) PBS after dissolution of the capsules, for capsules without magnetite (control), with magnetite in the core and with magnetite in the alginate shell, with the 450–600 nm quantification range indicated; plus a reference spectrum of the magnetite suspension.",
        },
      ],
      tables: [
        {
          caption:
            "Mean absorbance difference between magnetite-containing samples and the corresponding control without magnetite, between 450 and 600 nm.",
          headers: ["Sample", "Magnetite in core", "Magnetite in shell"],
          rows: [
            ["Calcium chloride bath (synthesis)", "0.004", "0.004"],
            ["Storage water, day 1", "−0.005", "−0.003"],
            ["Storage water, day 3", "−0.003", "−0.003"],
            ["PBS after capsule dissolution", "−0.020", "0.186"],
          ],
        },
      ],
      interpretation:
        "The magnetite incorporated in the alginate shell was retained during both synthesis and storage, and was only released when the capsules were deliberately dissolved. Loss of particles during synthesis was negligible, and no leakage occurred during storage, so the core-shell structure provided effective physical containment under the conditions tested. For the core configuration, the absence of signal even after dissolution indicates that the amount of magnetite incorporated into the core was too small to be detected, consistent with the sedimentation of the particles in the syringe observed during preparation. For this configuration, the absence of signal in the bath and storage water therefore cannot be interpreted as evidence of containment.",
      expectation:
        "Yes for the shell configuration: negligible magnetite was detected in the synthesis bath and storage water, and a clear signal was obtained only after dissolution of the capsules. As the magnetite nanoparticles (50–100 nm) are considerably smaller than bacterial cells, their retention represents a conservative indication of the containment capacity of the capsules. The result for the core configuration was anticipated as a possible limitation, given the difficulty of keeping magnetite suspended in the inner solution, and indicates that a different tracer or loading strategy would be needed to directly assess the retention of material encapsulated in the core. Since a diluted magnetite suspension could not be detected, very small amounts of leakage below the detection limit of the method cannot be ruled out, and each sample was measured only once.",
    },
  ],
};

const CORE_SHELL_MECHANICAL: ResultData = {
  id: "core-shell-mechanical",
  tabLabel: "Mechanical resistance",
  title: "Mechanical resistance of core-shell capsules",
  description:
    "The test that was to settle the choice between the 4:1 and 6:1 flow-rate ratios, after shell thickness failed to discriminate between them.",
  pending: true,
  subsections: [],
};

const CORE_SHELL_PRESERVATION: ResultData = {
  id: "core-shell-preservation",
  tabLabel: "Chemical environments",
  title: "Core-shell preservation under different chemical environments",
  description:
    "The more controlled preservation study that the bead storage experiment motivated, separating pH from ionic composition across pH 1, 3, 5 and 6, PBS, a potassium-only PBS, and wastewater with and without added base.",
  pending: true,
  subsections: [],
};

const THERMAL: ResultData = {
  id: "thermal-characterisation",
  tabLabel: "TGA-DSC",
  title: "Thermal characterisation (TGA-DSC)",
  pending: true,
  subsections: [],
};

const SEM: ResultData = {
  id: "sem-characterisation",
  tabLabel: "SEM",
  title: "Microstructural characterisation (SEM)",
  pending: true,
  subsections: [],
};

export const ENCAPSULATION_SUBBLOCKS: ResultSubBlock[] = [
  {
    id: "alginate-characterisation",
    heading: "1. Alginate characterisation & bead optimisation",
    intro:
      "The relative proportion of G and M residues governs the crosslinking behaviour and mechanical properties assumed throughout the rest of the encapsulation work, so this is where that composition is established. Alginate concentration, drop height, flow rate and crosslinking time are then optimised in turn to establish a reproducible bead protocol, and the resulting beads are tested for preservation under different storage media, providing the baseline the core-shell work builds on.",
    results: [
      FTIR,
      BEAD_CONCENTRATION_HEIGHT,
      BEAD_FLOW_RATE,
      BEAD_CROSSLINKING,
      BEAD_PRESERVATION,
    ],
  },
  {
    id: "core-shell-formation",
    heading: "2. Core-shell formation & validation",
    intro:
      "Moving from a single alginate phase to a coaxial system meant first identifying the concentration window compatible with stable capsule formation, and then optimising the outer-to-inner flow-rate ratio within that window. The resulting configuration was then tested against the three requirements it must meet in operation: chemical stability, physical containment and mechanical resistance.",
    results: [
      CORE_SHELL_SCREENING,
      CORE_SHELL_FLOW_RATIO,
      CORE_SHELL_CONTAINMENT,
      CORE_SHELL_MECHANICAL,
      CORE_SHELL_PRESERVATION,
    ],
  },
  {
    id: "final-characterisation",
    heading: "3. Final physical characterisation",
    intro:
      "With the encapsulation platform finalised, its thermal and structural properties were characterised to close out the material description needed for integration with the biological module.",
    results: [THERMAL, SEM],
  },
];
