import type {
  FigureData,
  ResultData,
  ResultSubBlock,
} from "../../components/LabFolders/types";

/**
 * Alginate encapsulation results, transcribed from the team's own Notion
 * results page ("Alginate encapsulation", under WIKI / Results). The
 * sub-blocks, their order and the record titles follow that page, which in
 * turn follows the Experiments page.
 *
 * Prose is the source's own, with its inline marks (**bold**, *italic*,
 * [n], [label](/path)) kept as written — see RichText.tsx. Figure and
 * table numbers are assigned by the page (numbering.ts), so captions carry
 * none. The reference numbering is the source's own single list, rendered
 * at the bottom of the page.
 *
 * Brought up to the source's definitive version: the prose, captions and
 * citations are its current wording. Two things were deliberately NOT
 * taken from it, and are worth a look from the team:
 *  - The source's Table 11 (sphericity retained at maximum load) carries
 *    ± SD inside the Fresh and Stored columns; the table here gives the
 *    means only, as it already did.
 *  - The source's own caption for the bead storage series describes five
 *    columns (days 0, 1, 2, 3 and 7); the figures in this repository split
 *    that series into a four-column matrix plus the two one-week photos
 *    below it, so the caption here describes what is actually shown.
 *
 * Figures with an image are the source's own, downloaded from Notion into
 * public/assets/results/encapsulation. A caption the source writes for a
 * figure that has no image yet ("Figure X. ...") stays as a caption-only
 * placeholder, so it remains visible which figure each record is waiting
 * on.
 *
 * Like every image on this wiki, the ones referenced here still have to go
 * through the iGEM uploads tool and be re-pointed at static.igem.wiki
 * before the Wiki Freeze (see MIGRATION.md).
 */

const FIGURES = "assets/results/encapsulation";

export const ENCAPSULATION_INTRO = [
  "This section builds the encapsulation platform of the rePhlow sphere: the raw alginate is characterised, a reproducible bead protocol is established, the system is translated into a core-shell architecture and validated against the chemical, physical and mechanical demands of the bioreactor, and the final platform is characterised structurally. This page reports the outcomes; the design and rationale of each experiment are on the [Experiments](/experiments) page.",
  "Each entry below reports the outcome of the corresponding experiment on the Experiments page, following the same order and titles.",
  "Bead and capsule morphology is reported through two measurements. Size is given as the **equivalent diameter**, Deq = 2√(A/π), the diameter of a circle with the same projected area. Shape is given as the **aspect ratio of the fitted ellipse**, s = minor axis / major axis, referred to throughout as **sphericity**; it equals 1 for a perfect circle and falls as the object becomes elongated. Where capsules are compared under load, sphericity is expressed as a fraction of each condition's own unloaded value, since capsules do not all start out equally spherical and an absolute comparison would confound resistance to compression with initial shape.",
];

/* ---------- 1. Alginate characterisation & bead optimisation ---------- */

const FTIR: ResultData = {
  id: "alginate-ftir",
  tabLabel: "FTIR characterisation",
  title: "Alginate characterisation by FTIR",
  subsections: [
    {
      id: "ftir-spectrum",
      body: [
        "The spectrum of the raw sodium alginate powder showed the band pattern expected for an alginate salt: a broad O–H envelope at 3287 cm⁻¹, C–H stretching at 2933 cm⁻¹, and an intense carboxylate band at 1596 cm⁻¹ with its symmetric contribution at 1407 cm⁻¹, with no absorption near 1730 cm⁻¹. In the fingerprint region the spectrum showed bands at 1081 and 1027 cm⁻¹, 949 cm⁻¹, 885 cm⁻¹ and at 814 cm⁻¹.",
      ],
      figures: [
        {
          src: `${FIGURES}/ftir-spectrum.webp`,
          alt: "FTIR spectrum of the raw sodium alginate powder, with the O–H, C–H and carboxylate bands and the fingerprint region marked.",
          kind: "chart",
          caption: "ATR-FTIR spectrum (% Transmission, 4000–400 cm⁻¹) of the commercial sodium alginate powder, with major absorption bands assigned by comparison with published reference spectra [1]. Annotated bands include: O–H stretch (3287 cm⁻¹), C–H stretch (2933 cm⁻¹), asymmetric COO⁻ stretching (1596 cm⁻¹), symmetric COO⁻ stretching (1407 cm⁻¹), C–C–H / O–C–H deformation (1299 cm⁻¹), C–O / C–C ring vibrations (1081 and 1027 cm⁻¹), and fingerprint region bands (949, 885, 814 and 787 cm⁻¹) characteristic of guluronate (G) and mannuronate (M) residues.",
        },
      ],
    },
    {
      id: "ftir-mg-ratio",
      continued: true,
      body: [
        "Two independent wavenumber pairs were used to estimate the M/G ratio [1]: the 808/787 cm⁻¹ [2] and the 1030/1080 cm⁻¹ pair [3]. Measuring absorbance, the pairs gave **M/G = 1.19 and 1.59** respectively, corresponding to 54 % and 61 % mannuronic residues.",
      ],
      tables: [
        {
          caption:
            "M/G ratio of the sodium alginate estimated from two independent absorbance band pairs, with the corresponding fractions of mannuronic (M) and guluronic (G) residues and the values reported for a commercial sodium alginate standard [1].",
          headers: ["Band pair", "M/G ratio", "%M", "%G", "Reference value [1]"],
          rows: [
            ["808 / 787 cm⁻¹ [2]", "1.19", "54.3", "45.7", "1.2"],
            ["1030 / 1080 cm⁻¹ [3]", "1.59", "61.3", "38.7", "1.7"],
          ],
        },
      ],
    },
    {
      id: "ftir-second-derivative",
      continued: true,
      body: [
        "Second-derivative analysis resolved the anomeric region, which in the parent spectrum shows only the single maximum at 814.3 cm⁻¹, into minima at **821.5 cm⁻¹ (M) and 778.1 cm⁻¹ (G)**, together with 1080.4, 1026.4, 950.2, 931.9, 889.5 and 877.5 cm⁻¹. All positions agree with the sodium alginate standard [1] to within 1–8 cm⁻¹.",
      ],
      tables: [
        {
          caption:
            "Band positions resolved by second-derivative analysis of the FTIR spectrum, compared with published values for sodium alginate [1,4], with their differences (Δ) and assignments.",
          headers: [
            "Experimental (cm⁻¹)",
            "Bibliography [1]",
            "Δ",
            "Bibliography [4]",
            "Δ",
            "Assignment",
          ],
          rows: [
            ["778.14", "778.7", "−0.6", "781.3", "−3.2", "α-L-guluronic acid residues (G)"],
            ["821.53", "819.7", "+1.8", "824.5", "−3.0", "mannuronic acid residues (M)"],
            ["889.51", "881.2", "+8.3", "880.4", "+9.1", "C1–H deformation, β-D-mannuronate"],
            ["931.93", "930.2", "+1.7", "933.5", "−1.6", "—"],
            ["950.25", "950.7", "−0.5", "943.7", "+6.5", "C–O stretching, uronic acid residues"],
            ["1026.43", "1026.0", "+0.4", "1028.2", "−1.8", "C–O / C–C stretching, pyranose ring"],
            ["1080.42", "1085.1", "−4.7", "—", "—", "C–O / C–C stretching, pyranose ring"],
          ],
        },
      ],
    },
    {
      id: "ftir-interpretation",
      continued: true,
      body: [
        "The absence of a carbonyl band near 1730 cm⁻¹ alongside the strong carboxylate band confirms the material is in the sodium salt form rather than the protonated free acid.",
        "Both pairs give M/G > 1, so the alginate is **mannuronic-rich**. The value sits within the range of 0.5–2.5 reported for brown seaweed alginates [1] and close to the commercial sodium alginate standard measured by the same method, 1.2 and 1.7 [1], against our 1.19 and 1.59.",
        "A mannuronic-rich alginate is expected to produce a comparatively **softer, more elastic calcium-alginate gel** [5,6], since ionic crosslinking proceeds preferentially through consecutive guluronic blocks in the egg-box arrangement [7]. That expectation fed directly into how tightly the synthesis parameters of the following experiments needed to be controlled to reach sufficient mechanical integrity.",
        "FTIR gives no information on how the residues are distributed along the chain. No relationship can be established between the M/G value and block composition, since the same homoguluronic fraction can be found in two alginates whose M/G values differ greatly [4]. Since gel strength depends on the length and abundance of consecutive G blocks rather than on the overall ratio, our value indicates the direction of the expected mechanical behaviour but not its magnitude. However, it can be used as a first semicuantitative analysis.",
      ],
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
        "Bead size was similar across all twenty conditions tested, with mean equivalent diameters between approximately 3.3 and 3.7 mm and no systematic trend with either alginate concentration or drop height. Shape, by contrast, depended on both. Beads produced with **3.5% (w/v) alginate were the most spherical** of all concentrations, with sphericity between 0.930 and 0.948 at every drop height and a standard deviation between beads of around 0.035, roughly half the typical spread at the lower concentrations. Below 3.5% (w/v) the beads were not only less spherical but far less consistent, with standard deviations reaching 0.14.",
        "Drop height produced an inverted U at every concentration from 2.5% (w/v) upwards, with the maximum at 3 cm. The effect is clearest at 3% (w/v), where sphericity rises from 0.795 at 1 cm to 0.918 at 3 cm and falls again to 0.783 at 5 cm, and where the variability between beads collapses at the same point, from ±0.10 and ±0.14 at the two extremes to ±0.03. At 2% (w/v) no such pattern emerged: sphericity fell to its lowest value precisely at 3 cm (0.810 ± 0.056) and recovered at 4 cm. At this concentration the solution is the least able to resist deformation on impact with the bath, so bead shape is most sensitive to small differences in how each drop meets the surface, and the dip at 3 cm is better read as a symptom of that sensitivity than as an effect specific to that height. At 3.5% (w/v) the curve flattens: the optimum is still at 3 cm, but every height produces beads of comparable sphericity and comparable spread.",
      ],
      figures: [
        {
          src: `${FIGURES}/beads-sphericity-concentration.png`,
          alt: "Grouped scatter of bead sphericity against alginate concentration, with the five drop heights within each group.",
          caption:
            "Sphericity of beads produced at each alginate concentration (mean ± SD, n = 10), with the five drop heights shown within each group.",
        },
      ],
      tables: [
        {
          caption:
            "Sphericity (s = minor axis / major axis) of beads produced at different alginate concentrations and drop heights (mean ± SD, n = 10). The selected condition is shown in bold.",
          headers: ["Drop height (cm)", "2%", "2.5%", "3%", "3.5%"],
          rows: [
            ["1", "0.922 ± 0.062", "0.886 ± 0.119", "0.795 ± 0.101", "0.946 ± 0.029"],
            ["2", "0.920 ± 0.075", "0.922 ± 0.078", "0.895 ± 0.099", "0.937 ± 0.036"],
            ["3", "0.810 ± 0.056", "0.936 ± 0.040", "0.918 ± 0.029", "**0.948 ± 0.036**"],
            ["4", "0.895 ± 0.045", "0.904 ± 0.041", "0.896 ± 0.062", "0.930 ± 0.036"],
            ["5", "0.844 ± 0.084", "0.852 ± 0.027", "0.783 ± 0.139", "0.934 ± 0.043"],
          ],
        },
      ],
    },
    {
      id: "bead-size",
      continued: true,
      figures: [
        {
          src: `${FIGURES}/beads-diameter-concentration.png`,
          alt: "Grouped scatter of bead equivalent diameter against alginate concentration, with the five drop heights within each group.",
          caption:
            "Equivalent diameter of beads produced at each alginate concentration (mean ± SD, n = 10), with the five drop heights shown within each group.",
        },
      ],
      tables: [
        {
          caption:
            "Equivalent diameter (Deq, mm) of beads produced at different alginate concentrations and drop heights (mean ± SD, n = 10). The selected condition is shown in bold.",
          headers: ["Drop height (cm)", "2%", "2.5%", "3%", "3.5%"],
          rows: [
            ["1", "3.56 ± 0.11", "3.50 ± 0.11", "3.64 ± 0.12", "3.58 ± 0.07"],
            ["2", "3.40 ± 0.12", "3.58 ± 0.06", "3.45 ± 0.15", "3.48 ± 0.10"],
            ["3", "3.44 ± 0.23", "3.61 ± 0.08", "3.46 ± 0.10", "**3.65 ± 0.06**"],
            ["4", "3.27 ± 0.10", "3.55 ± 0.11", "3.56 ± 0.08", "3.58 ± 0.06"],
            ["5", "3.56 ± 0.07", "3.64 ± 0.10", "3.66 ± 0.15", "3.59 ± 0.10"],
          ],
        },
      ],
      bodyAfter: [
        "These results indicate that, within the range tested, alginate concentration governs bead shape and reproducibility, whereas bead size is largely insensitive to both variables. The higher viscosity of the 3.5% (w/v) solution allowed droplets to retain their shape on impact with the bath [8], making bead morphology robust to changes in drop height. At lower concentrations, the droplets were more easily deformed on impact, so shape became both less regular and more dependent on the exact setup. Since no condition produced substantially smaller beads, the surface-to-volume criterion did not discriminate between conditions, and **3.5% (w/v) alginate at a drop height of 3 cm was selected** on sphericity and reproducibility.",
        "The effect of alginate concentration matched our expectations: more concentrated, more viscous solutions produced more spherical and reproducible beads, and no detachment problems or tailed beads were observed up to 3.5% (w/v). The intermediate optimum anticipated for drop height was also found, at 3 cm. What was not anticipated was that it would matter less as concentration rose: at 3.5% (w/v) the solution is viscous enough that no height within the range tested deformed the drop appreciably, which makes the process tolerant of small variations in the setup rather than dependent on hitting the right height.",
      ],
    },
  ],
};

const BEAD_FLOW_RATE: ResultData = {
  id: "bead-flow-rate",
  tabLabel: "Flow rate",
  title: "Bead optimisation: flow rate",
  subsections: [
    {
      id: "flow-rate-regime",
      body: [
        "Stable dripping was maintained across the whole range tested, from 400 to 3200 μL/min, and at no point did the stream make the transition to jetting. Increasing the flow rate increased the rate at which drops detached, so beads were produced faster, but they continued to form and detach individually.",
      ],
      figures: [
        {
          src: `${FIGURES}/beads-flow-rate.png`,
          alt: "Equivalent diameter and sphericity of beads plotted against extrusion flow rate.",
          caption:
            "Equivalent diameter and sphericity of 3.5% (w/v) alginate beads produced at different flow rates (mean ± SD, n = 10). The flow-rate axis is categorical, not to scale.",
        },
      ],
    },
    {
      id: "flow-rate-shape",
      continued: true,
      body: [
        "Bead shape did not deteriorate at high flow rates. From 500 μL/min upwards, sphericity stayed between 0.92 and 0.95 with no trend across the range, and the most uniform beads of the entire experiment were those produced at 3200 μL/min, with a standard deviation of 0.022. The exception was the lowest flow rate: at 400 μL/min mean sphericity fell to 0.796 and the variability between beads rose sharply, to 0.157, because four of the ten beads were visibly elongated, with s between 0.53 and 0.74 against roughly 0.95 for a regular bead. The problem there is not that drops fail to form but that they do not detach cleanly. When liquid is delivered slowly, the drop hangs at the outlet long enough to draw out a tail that does not fully retract before the bead enters the bath and gels.",
      ],
      tables: [
        {
          caption:
            "Size and sphericity of 3.5% (w/v) alginate beads produced at different flow rates (mean ± SD, n = 10). The selected condition is shown in bold. ∗Values for 600 μL/min are those obtained in the concentration and drop-height experiment, at the same alginate concentration and drop height.",
          headers: ["Q (μL/min)", "Deq (mm)", "Sphericity"],
          rows: [
            ["400", "3.50 ± 0.09", "0.796 ± 0.157"],
            ["500", "3.64 ± 0.06", "0.953 ± 0.037"],
            ["**600∗**", "**3.65 ± 0.06**", "**0.948 ± 0.036**"],
            ["700", "3.63 ± 0.06", "0.923 ± 0.070"],
            ["800", "3.66 ± 0.12", "0.923 ± 0.048"],
            ["1600", "3.66 ± 0.09", "0.931 ± 0.047"],
            ["3200", "3.71 ± 0.07", "0.952 ± 0.022"],
          ],
        },
      ],
    },
    {
      id: "flow-rate-interpretation",
      continued: true,
      body: [
        "What this experiment located, then, is a **lower bound on the operating window** rather than the upper one it was designed to find. Above 500 μL/min the process behaves the same way across a sixfold increase in flow, so bead production is not constrained by how fast the alginate is delivered. That has a direct consequence for scale-up: output can be raised several-fold without touching any other parameter, and the beads made at the fastest rate were the most uniform of the whole experiment.",
        "However, the gain in speed is not free. Bead size also increased with flow rate, from an equivalent diameter of 3.50 mm at 400 μL/min to 3.71 mm at 3200, about 6% in diameter and 12% in projected area across an eightfold change in flow. Most of that difference lies at the two ends of the range: between 500 and 1600 μL/min the diameter stayed between 3.63 and 3.66 mm, and the 400 μL/min value comes from the condition with irregular detachment. The effect is therefore modest, but it runs against the surface-to-volume criterion set out at the start of the bead work, where smaller beads were preferred because the biological module was intended to carry surface-immobilised enzymes, so accelerating production costs a little surface area per unit of encapsulated volume. The reason is the time it takes a drop to separate. Detachment is not instantaneous: a narrow neck of liquid forms between the drop and the outlet and thins until it breaks, and liquid keeps flowing into the drop throughout. The faster the flow, the more volume arrives during that interval, and the larger the drop ends up.",
        "**A flow rate of 600 μL/min was retained** for all subsequent work. Nothing in the data demanded a change, since every condition from 500 μL/min upwards produced regular beads, so the choice was which value inside a wide window to standardise on. An intermediate value kept beads at the small end of the range while staying well clear of the irregular detachment seen at 400 μL/min, and it is a comfortable pace to work at: at 3200 μL/min a 10 mL syringe empties in a little over three minutes, leaving very little time to manage the collection bath.",
        "This was not the result we expected. Bead extrusion is normally described as having a dripping regime bounded above by a transition to jetting [9], and we anticipated finding that boundary within the range tested, particularly since 3200 μL/min is already well above the flow rates commonly reported for alginate extrusion [9]. Reaching more than five times the working value without destabilising drop formation indicates that the boundary lies considerably further out for this combination of alginate concentration and nozzle geometry. The constraint we did find, at the slow end, was not anticipated at all, and it is the more useful one to know: in this system the risk is dripping too slowly, not too fast.",
      ],
    },
  ],
};

const BEAD_CROSSLINKING: ResultData = {
  id: "bead-crosslinking-time",
  tabLabel: "Crosslinking time",
  title: "Bead optimisation: crosslinking time",
  subsections: [
    {
      id: "crosslinking-time",
      body: [
        "Crosslinking time had little effect on bead shape: sphericity remained between 0.85 and 0.93 for all times tested, with no consistent trend. Bead size remained broadly constant between 10 and 60 min, with mean equivalent diameters between 3.6 and 3.9 mm. In contrast, beads crosslinked for 90 min were clearly smaller, with a mean equivalent diameter of 3.38 mm, corresponding to a reduction of approximately 9% in diameter and 17% in projected area relative to 30 min.",
      ],
      figures: [
        {
          src: `${FIGURES}/beads-crosslinking-time.png`,
          alt: "Equivalent diameter of beads plotted against crosslinking time.",
          caption:
            "Equivalent diameter of 3.5% (w/v) alginate beads after different crosslinking times (mean ± SD, n = 8–10).",
        },
      ],
      tables: [
        {
          caption:
            "Size and shape descriptors of 3.5% (w/v) alginate beads after different crosslinking times (mean ± SD). The selected condition is shown in bold.",
          headers: ["Crosslinking time (min)", "n", "Area (mm²)", "Deq (mm)", "Sphericity"],
          rows: [
            ["10", "10", "10.77 ± 0.52", "3.70 ± 0.09", "0.900 ± 0.064"],
            ["20", "10", "11.66 ± 0.47", "3.85 ± 0.08", "0.901 ± 0.093"],
            ["**30**", "**10**", "**10.78 ± 0.56**", "**3.70 ± 0.10**", "**0.900 ± 0.076**"],
            ["40", "8", "10.49 ± 0.39", "3.65 ± 0.07", "0.893 ± 0.035"],
            ["60", "10", "10.33 ± 0.51", "3.62 ± 0.09", "0.853 ± 0.083"],
            ["90", "9", "9.00 ± 0.33", "3.38 ± 0.06", "0.931 ± 0.042"],
          ],
        },
      ],
    },
    {
      id: "crosslinking-interpretation",
      continued: true,
      body: [
        "Within the usual working range, longer exposure to calcium did not produce more compact or more stable beads. Their size and shape were already established after ten minutes, and their shape did not change between then and an hour. Contraction did appear, but it became clear only at the longest time tested: up to 60 min size varied between 3.6 and 3.9 mm with at most a slight downward drift after 20 min, before falling to 3.38 mm at 90 min. This is consistent with the progressive formation of additional calcium-mediated junctions in the alginate network, drawing the polymer chains closer together and expelling water from the gel [9,10]. This was the effect we had anticipated, at a point further out than expected, and the absence of a consistent difference between 10 and 60 min confirmed that crosslinking time is not a critical parameter. **A crosslinking time of 30 min**, within the range commonly used for bead production [9,11] and the time after which shell thickness has been reported to plateau in core-shell alginate capsules [12], was therefore retained, providing fully formed beads without unnecessarily extending production time.",
      ],
    },
  ],
};

const bead = (medium: string, label: string, hours: number) => ({
  src: `${FIGURES}/beads-${medium}-${hours}h.jpg`,
  alt: `Alginate beads stored in ${label}, photographed at ${hours} h.`,
});

const BEAD_PRESERVATION: ResultData = {
  id: "bead-preservation",
  tabLabel: "Storage media",
  title: "Bead preservation under different storage media",
  subsections: [
    {
      id: "storage-media",
      body: [
        "Beads stored in **water** remained stable throughout the experiment, with changes in equivalent diameter below 5% and no change in sphericity.",
        "Beads stored in **industrial wastewater** took on its brown colour within the first day and shrank markedly over the same period, with the equivalent diameter falling from 3.56 to 3.06 mm, a reduction of roughly 26% in projected area. They then remained approximately constant, recovering only slightly by 72 h before returning to the day-1 size by the end of the week, and their sphericity rose slightly over the same period and stayed there. None broke or dissolved while stored, but they became noticeably more fragile than those stored in water and were more easily damaged when handled.",
        "Beads stored in **PBS** behaved in the opposite way and are reported qualitatively, for a reason worth stating. Within 24 h they had swollen conspicuously, from 3.53 to 4.44 mm in equivalent diameter, roughly 60% in projected area, while becoming less regular in shape and already breaking. From that point they progressively disintegrated: by 48 h only about half remained intact enough to be identified as single beads, and by 72 h none did. Measuring them beyond 24 h would be misleading rather than merely imprecise, because image analysis treats each fragment of a broken bead as a bead in its own right, so a mean diameter calculated over fragments falls as the beads disintegrate and makes catastrophic failure look like gradual shrinkage.",
      ],
      figureMatrix: {
        columns: ["0 h", "24 h", "48 h", "72 h"],
        rows: [
          { label: "Water", figures: [0, 24, 48, 72].map((h) => bead("water", "water", h)) },
          {
            label: "Industrial wastewater",
            figures: [0, 24, 48, 72].map((h) => bead("wastewater", "industrial wastewater", h)),
          },
          { label: "PBS", figures: [0, 24, 48, 72].map((h) => bead("pbs", "PBS", h)) },
        ],
        caption:
          "Representative images of beads over time in each storage medium (rows: water, industrial wastewater, PBS; columns: days 0, 1, 2 and 3). The day-3 PBS panel is the end state of that series: the beads had dissolved or broken apart and none could be measured, and no intact beads remained afterwards.",
      },
    },
    {
      id: "storage-media-week",
      continued: true,
      figuresColumns: 2,
      figures: [
        {
          src: `${FIGURES}/beads-water-168h.jpg`,
          alt: "Alginate beads after one week in water.",
          caption: "",
        },
        {
          src: `${FIGURES}/beads-wastewater-168h.jpg`,
          alt: "Alginate beads after one week in untreated industrial wastewater.",
          caption: "",
        },
      ],
      figuresCaption:
        "The same beads after one week (168 h) in water (left) and in untreated industrial wastewater (right). PBS is not shown, as no intact beads remained after day 3.",
    },
    {
      id: "storage-media-measurements",
      continued: true,
      figures: [
        {
          src: `${FIGURES}/results-equivalent-diameter-storage.avif`,
          alt: "Equivalent diameter of alginate beads stored in water and in industrial wastewater over one week.",
          caption:
            "Equivalent diameter of 3.5% (w/v) alginate beads stored in water and industrial wastewater over time (mean ± SD, n = 10). PBS is not shown, as the beads had disintegrated and fragment measurements are not comparable.",
        },
      ],
      tables: [
        {
          caption:
            "Equivalent diameter (Deq, mm) of 3.5% (w/v) alginate beads stored in water and industrial wastewater over time (mean ± SD, n = 10).",
          headers: ["Medium", "0 h", "24 h", "48 h", "72 h", "1 week"],
          rows: [
            ["Water", "3.47 ± 0.11", "3.49 ± 0.15", "3.34 ± 0.13", "3.43 ± 0.09", "3.33 ± 0.10"],
            [
              "Industrial wastewater",
              "3.56 ± 0.11",
              "3.06 ± 0.10",
              "3.12 ± 0.11",
              "3.20 ± 0.08",
              "3.11 ± 0.08",
            ],
          ],
        },
        {
          caption:
            "Sphericity of 3.5% (w/v) alginate beads stored in water and industrial wastewater over time (mean ± SD, n = 10).",
          headers: ["Medium", "0 h", "24 h", "48 h", "72 h", "1 week"],
          rows: [
            [
              "Water",
              "0.836 ± 0.079",
              "0.859 ± 0.083",
              "0.849 ± 0.082",
              "0.849 ± 0.086",
              "0.848 ± 0.080",
            ],
            [
              "Industrial wastewater",
              "0.861 ± 0.051",
              "0.892 ± 0.059",
              "0.893 ± 0.056",
              "0.913 ± 0.044",
              "0.884 ± 0.038",
            ],
          ],
        },
      ],
      bodyAfter: [
        "In PBS, pronounced swelling followed by disintegration indicates that the calcium crosslinks holding the network together were progressively disrupted, so the gel first lost its capacity to restrain swelling and then lost its integrity altogether; sodium ions compete with calcium for the alginate carboxylate groups [9,13], and phosphate can sequester calcium directly [9], both of which remove the junctions on which the gel depends. In industrial wastewater the beads contracted instead, which is consistent with protonation of the alginate carboxylate groups at the very low pH of this medium (pH 1.76), reducing the electrostatic repulsion that keeps the network expanded [9,14]. That contraction did not compromise integrity during storage, but the fragility observed on handling suggests it does affect mechanical properties. The brown colouring also shows that dissolved components of the wastewater diffused into the alginate network. Water, with minimal ionic interference, preserved the beads without measurable change.",
        "The behaviour in PBS matched what we expected, since sodium and phosphate were both anticipated to compete with or sequester the crosslinking calcium. Its speed and severity were not: **complete loss of the beads within 72 h** was faster than anticipated. The shrinkage in wastewater was not specifically predicted, although it is consistent with the known behaviour of alginate at low pH. Because the three media differ simultaneously in ionic composition, ionic strength and pH, this experiment cannot attribute each response to a single cause, which is why those factors were separated in the later preservation study with core-shell capsules.",
      ],
    },
  ],
};

/* ---------- 2. Core-shell formation & validation ---------- */

const CORE_SHELL_SCREENING: ResultData = {
  id: "core-shell-screening",
  tabLabel: "Concentration screening",
  title: "Core-shell screening: alginate and CaCl₂ concentrations",
  subsections: [
    {
      id: "jetting-regime",
      body: [
        "The formation regime was recorded for each combination of outer alginate and inner CaCl₂ concentrations, classifying each condition according to whether jetting was observed:",
      ],
      tables: [
        {
          caption:
            "Occurrence of jetting for each combination of outer alginate concentration (rows, % w/v) and inner CaCl₂ concentration (columns, % w/v), at Qe = 600 μL/min and Qi = 200 μL/min. The selected condition is shown in bold. Yes: jetting was observed. No: jetting was not observed (stable dripping). n/t: not tested.",
          headers: ["Alginate (% w/v)", "CaCl₂ 0", "0.5", "1", "1.5", "2"],
          rows: [
            ["2", "No", "No", "No", "No", "Yes"],
            ["2.5", "No", "No", "Yes", "n/t", "n/t"],
            ["3", "No", "No", "Yes", "n/t", "n/t"],
            ["3.5", "No", "**No**", "Yes", "n/t", "n/t"],
          ],
        },
      ],
    },
    {
      id: "jetting-interpretation",
      continued: true,
      body: [
        "Stable dripping was observed for all alginate concentrations when the inner phase contained 0 or 0.5% (w/v) CaCl₂. With 2% (w/v) alginate, stable dripping was maintained up to 1.5% (w/v) CaCl₂, and jetting only appeared at 2% (w/v). For 2.5, 3 and 3.5% (w/v) alginate, however, jetting already appeared at 1% (w/v) CaCl₂, so higher calcium concentrations were not tested for these alginate concentrations. Whenever jetting occurred, alginate gelled and accumulated at the tip of the injector, preventing the detachment of discrete drops.",
      ],
    },
    {
      id: "jetting-discussion",
      continued: true,
      body: [
        "These results show that core-shell formation is governed by the combination of both phases rather than by either concentration alone. The tolerance to internal calcium dropped sharply when moving from 2% to 2.5% (w/v) alginate: jetting appeared at 1% instead of 2% (w/v) CaCl₂. A higher alginate concentration provides more crosslinkable polymer and a more viscous outer phase at the injector tip, so the gel formed at the interface builds up faster than the drop can detach. Within the concentrations of interest, 3% and 3.5% (w/v) alginate, **0.5% (w/v) CaCl₂ was therefore the highest tested inner concentration compatible with stable dripping**, and this combination was carried forward for the optimisation of the flow-rate ratio.",
        "The appearance of jetting at high internal CaCl₂ concentrations was expected, as it had already been observed in the initial core-shell trial with 3% (w/v) alginate and 2% (w/v) CaCl₂, and confirmed the hypothesis that excessively fast interfacial gelation prevents drop detachment. The strong dependence of this threshold on alginate concentration was not anticipated to this extent: we expected a gradual shift in the tolerated calcium concentration, rather than an abrupt drop between 2% and 2.5% (w/v) alginate.",
      ],
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
      figures: [
        {
          src: `${FIGURES}/shell-thickness.png`,
          alt: "Shell thickness of individual capsules for each alginate concentration and flow-rate combination.",
          caption:
            "Shell thickness of individual core-shell capsules, each point the mean of five measurements around one half-capsule, coloured by condition. Points are spread horizontally within each group only to avoid overlap and carry no meaning. n = 10 capsules per condition, 6 for 3.5% (w/v) at 300/75.",
        },
      ],
      bodyAfter: [
        "Without a contrast agent, the alginate shell could not be reliably distinguished from the liquid core in the microscopy images. After incorporating magnetite into the alginate phase, the shell became clearly visible, and its thickness could be measured for all eight conditions.",
      ],
    },
    {
      id: "shell-thickness-table",
      continued: true,
      tables: [
        {
          caption:
            "Shell thickness (μm) of core-shell capsules produced with 3% and 3.5% (w/v) alginate at different outer and inner flow rates (mean ± SD between capsules, n = 10 capsules; ∗n = 6). Each capsule value is the mean of 10 measurements taken around the shell, five on each half of the bisected capsule.",
          headers: ["Qe / Qi (μL/min)", "Qe/Qi", "3%", "3.5%"],
          rows: [
            ["600 / 150", "4:1", "360 ± 78", "418 ± 149"],
            ["600 / 100", "6:1", "335 ± 65", "475 ± 167"],
            ["300 / 75", "4:1", "242 ± 30", "339 ± 62∗"],
            ["300 / 50", "6:1", "331 ± 88", "293 ± 46"],
          ],
        },
      ],
      bodyAfter: [
        "Mean shell thicknesses ranged from approximately 240 to 475 μm. **No consistent effect of the flow-rate ratio was observed**: the 6:1 ratio produced thicker shells than the 4:1 ratio in two of the four comparisons (3% at 300 μL/min and 3.5% at 600 μL/min), but similar or thinner shells in the other two. Variability was high in all conditions, both within individual capsules, with standard deviations of approximately 60–90 μm between measurement points of the same shell, and between capsules produced under the same conditions, particularly for 3.5% (w/v) alginate at 600 μL/min. The clearest trend was associated with alginate concentration rather than with the ratio: at 600 μL/min, capsules produced with 3.5% (w/v) alginate had thicker shells than those produced with 3% (w/v).",
        "These results show that magnetite incorporation solved the visualisation problem, but that shell thickness could not reliably discriminate between the two flow-rate ratios. The variability within each capsule indicates that a large part of the dispersion originates from the measurement itself: the shell boundary was not always sharply defined, and the apparent thickness depends on how centrally each capsule was bisected. The variability between capsules indicates that differences in capsule production also contributed. Shell thickness was therefore not used as the selection criterion, and the two ratios were instead compared through their mechanical resistance (see Mechanical resistance of core-shell capsules).",
        "These results did not match our expectations. A higher outer-to-inner ratio increases the proportion of alginate in each capsule, so the 6:1 ratio was expected to produce consistently thicker shells than the 4:1 ratio. The absence of a clear difference, together with the high variability of the measurements, indicates that the effect of the ratio, if present, was smaller than the resolution of the measurement method.",
      ],
    },
  ],
};

const LOAD_STEPS = [1, 2, 3, 4, 5, 6, 7];

const capsuleRow = (
  label: string,
  storage: "fresh" | "stored",
  condition: "best" | "worst",
) => ({
  label,
  figures: LOAD_STEPS.map((step) => ({
    src: `${FIGURES}/${storage}-${condition}-${step}.webp`,
    alt: `${storage === "fresh" ? "Freshly produced" : "Stored"} core-shell capsule (${
      condition === "best"
        ? "3.5% (w/v) alginate, 300/50 μL/min"
        : "3% (w/v) alginate, 300/75 μL/min"
    }), load step ${step} of 7.`,
  })),
});

const CORE_SHELL_MECHANICAL: ResultData = {
  id: "core-shell-mechanical",
  tabLabel: "Mechanical resistance",
  title: "Mechanical resistance of core-shell capsules",
  subsections: [
    {
      id: "mechanical-normalisation",
      figuresColumns: 2,
      figures: [
        {
          src: `${FIGURES}/mechanical-sphericity-load.png`,
          alt: "Sphericity retained under increasing compressive load for fresh and stored capsules, one line per flow condition.",
          caption: "",
        },
        {
          src: `${FIGURES}/results-sphericity-load-stored-1-week.avif`,
          alt: "Sphericity retained under increasing load for capsules stored one week, one line per flow condition.",
          caption: "",
        },
      ],
      figuresCaption:
        "Sphericity retained under increasing compressive load, normalised to the unloaded value of each condition (s/s\u2080, mean \u00b1 SD). Left, freshly prepared capsules and right, capsules stored in distilled water for one week. One line per flow condition.",
      bodyAfter: [
        "As set out at the top of this page, sphericity under load is reported relative to each condition's unloaded value (s/s₀). What is compared is therefore how much of its own shape each condition keeps, so a capsule that started slightly elongated is not penalised for it.",
      ],
    },
    {
      id: "mechanical-ranking",
      continued: true,
      tables: [
        {
          caption:
            "Sphericity retained at the maximum load (s/s₀ at 20.4 g, mean ± SD), for freshly prepared capsules and capsules stored for one week. SD is that of sphericity at the maximum load, expressed relative to the mean unloaded sphericity of the same condition. n = 9 capsules per condition, except 3% (w/v) 600/150 (n = 6) and 3% (w/v) 300/50 (n = 8), fresh, at the maximum load. Conditions ranked from highest to lowest mean retained sphericity. The selected condition is shown in bold.",
          headers: ["Alginate", "Qe/Qi (μL/min)", "Ratio", "Fresh", "Stored", "Mean"],
          rows: [
            ["3.5%", "300/50", "6:1", "0.624", "0.607", "0.616"],
            ["**3.5%**", "**600/100**", "**6:1**", "**0.422**", "**0.540**", "**0.481**"],
            ["3%", "600/100", "6:1", "0.377", "0.542", "0.459"],
            ["3%", "300/50", "6:1", "0.372", "0.531", "0.452"],
            ["3.5%", "600/150", "4:1", "0.360", "0.529", "0.444"],
            ["3%", "600/150", "4:1", "0.317", "0.552", "0.434"],
            ["3.5%", "300/75", "4:1", "0.335", "0.458", "0.397"],
            ["3%", "300/75", "4:1", "0.392", "0.345", "0.368"],
          ],
        },
      ],
      bodyAfter: [
        "The ranking separates cleanly by flow-rate ratio. **The four 6:1 conditions occupy the top four positions** and the four 4:1 conditions the bottom four, with mean retentions of 0.50 and 0.41 respectively. Comparing matched pairs, that is conditions sharing alginate concentration, outer flow rate and storage state, the 6:1 ratio retained more sphericity in six of the eight comparisons, by between 0.01 and 0.29, and was lower in the remaining two by only 0.01 and 0.02, well within the variability between capsules. **No capsule ruptured or leaked at any load**, so within the range tested the capsules deform rather than fail.",
        "This is the result the flow-rate ratio was expected to produce and that shell thickness had been unable to demonstrate. A higher outer-to-inner ratio delivers more alginate per capsule, and although that difference was too small to resolve as a thickness in a two-dimensional cross-section, it appears unambiguously as resistance to compression. Measuring the functional property rather than the geometric one is what made the comparison possible.",
      ],
    },
    {
      id: "mechanical-photos",
      continued: true,
      figureMatrix: {
        columns: ["Unloaded", "Load 1", "Load 2", "Load 3", "Load 4", "Load 5", "20.4 g"],
        rows: [
          capsuleRow("Fresh · best", "fresh", "best"),
          capsuleRow("Fresh · worst", "fresh", "worst"),
          capsuleRow("Stored · best", "stored", "best"),
          capsuleRow("Stored · worst", "stored", "worst"),
        ],
        caption:
          "Representative core-shell capsules under increasing compressive load, from unloaded to 20.4 g. Rows one and two, freshly produced capsules; rows three and four, the same two conditions after one week of storage. Within each pair the first row is the best performing condition, 3.5% (w/v) alginate at 300/50 μL/min, 6:1, and the second the worst, 3% (w/v) alginate at 300/75 μL/min, 4:1.",
      },
      bodyAfter: [
        "**Storage improved resistance rather than degrading it.** Capsules kept in distilled water for a week retained more of their sphericity than freshly prepared ones in six of the eight conditions, raising mean retention at the highest load from 0.40 to 0.51. This is consistent with calcium continuing to diffuse and redistribute through the shell after the capsule leaves the crosslinking bath, progressively increasing the density of junction zones [9], the same process that produced the contraction observed in beads after prolonged crosslinking. It also means the values for freshly prepared capsules are the conservative case, since capsules will not be used on the day they are made. Because the two sets were also different batches, storage time and batch cannot be formally separated here.",
        "**The configuration carried forward was 3.5% (w/v) alginate at Qe/Qi = 600/100 μL/min.** The ratio was chosen on these results. The absolute flow rate was not: rather than simply taking the best-performing condition, we weighed mechanical performance against the system's capacity to scale. At 600 μL/min the capsules are produced at twice the rate of 300 μL/min, and filling a bioreactor requires them in quantity, so a configuration that is marginally stronger but half as productive is not obviously the better engineering choice. The 300/50 condition did retain more sphericity, by 0.14 on average, but it was also the most variable of the freshly prepared conditions, with a standard deviation of 0.152 in s/s₀ at the highest load against 0.043 for the selected one, the lowest of any fresh condition. Choosing 600/100 therefore gives up a modest amount of mean resistance in exchange for twice the production rate and the most reproducible behaviour on the day of synthesis.",
        "The expectation that 6:1 would outperform 4:1 was met, and more clearly than the shell-thickness measurements had suggested was possible. The expectation that the absolute flow rate would not matter was only partly met: at 3% the two outer flow rates were equivalent, 0.459 against 0.452, but at 3.5% the lower flow rate performed appreciably better, which suggests that at the higher polymer concentration the slower, more gradual drop formation produces a better organised shell. This does not undermine the configuration selected, which still sits second of the eight tested and ahead of every 4:1 condition; it simply means the margin given up for production rate is real rather than negligible, and quantified. Neither the improvement with storage nor its size was anticipated, and it is the result with the clearest practical consequence: the capsules the bioreactor will actually receive are stronger than the ones measured on the day of synthesis.",
      ],
    },
  ],
};

const CORE_SHELL_CONTAINMENT: ResultData = {
  id: "core-shell-containment",
  tabLabel: "Containment",
  title: "Core-shell containment assessed with magnetite",
  subsections: [
    {
      id: "magnetite-spectra",
      figuresColumns: 1,
      figures: [
        {
          src: `${FIGURES}/magnetite-absorbance-spectra.png`,
          alt: "Absorbance spectra of the synthesis bath, storage water and the PBS used to dissolve the capsules, with and without magnetite.",
          caption: "",
        },
        {
          src: `${FIGURES}/results-magnetite-corrected-spectra.avif`,
          alt: "Corrected absorbance spectra after subtracting the control without magnetite.",
          caption: "",
        },
      ],
      figuresCaption:
        "Absorbance spectra of the calcium chloride synthesis bath, the storage water after one and three days, and PBS after dissolution of the capsules, for capsules without magnetite (control), with magnetite in the core and with magnetite in the alginate shell. Top: Raw spectra, together with the reference spectrum of the magnetite suspension. Bottom: Corrected spectra, obtained by subtracting from each magnetite-containing sample the spectrum of the corresponding control without magnetite; the magnetite reference has no control and appears in both. Spectra were recorded from 200 to 1000 nm; both panels show the 250\u20131000 nm range, below which the signal is dominated by instrumental noise. The dashed lines (450 and 600 nm) indicate the interval used for quantification.",
      bodyAfter: [
        "Capsule material and magnetite absorb in different regions, which is what makes the measurement possible. Capsules without magnetite, measured in each of the three media, absorbed almost entirely below approximately 250 nm, while the magnetite reference absorbed broadly and almost featurelessly across the whole ultraviolet and visible range. In the visible region the capsule material therefore contributes nothing, and any absorbance above that of the control can be attributed to magnetite. The reference suspensions are the one exception to that treatment: they have no no-magnetite control of their own, so their values are raw absorbances rather than differences, and they serve only to establish what magnetite looks like in this measurement.",
      ],
    },
    {
      id: "magnetite-containment",
      continued: true,
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
      bodyAfter: [
        "**No magnetite was detected in the storage water** after one or three days, for either configuration: the absorbance of the magnetite-containing samples was equal to or slightly below that of the control. The calcium chloride bath collected after synthesis showed only a very small positive difference, identical for both configurations and close to the noise level of the measurement. After dissolution in PBS, capsules containing magnetite in the alginate shell produced a clear absorbance increase across the whole visible range (as seen in the corrected absorbance spectra), whereas capsules containing magnetite in the core produced no detectable signal. The diluted magnetite reference suspension could not be detected above the blank.",
        "These results show that the magnetite incorporated in the alginate shell was retained during both synthesis and storage, and was only released when the capsules were deliberately dissolved. Loss of particles during synthesis and leakage during storage were both below the detection limit of the method, so **the shell retained the particles embedded in it** under the conditions tested. For the core configuration, the absence of signal even after dissolution indicates that the amount of magnetite incorporated into the core was too small to be detected, consistent with the sedimentation of the particles in the syringe observed during preparation. For this configuration, the absence of signal in the bath and storage water therefore cannot be interpreted as evidence of containment.",
        "These results matched our expectations for the shell configuration: negligible magnetite was detected in the synthesis bath and storage water, and a clear signal was obtained only after dissolution of the capsules. If retention is governed by the pore size of the network, these results are a conservative indication of containment: particles of 50–100 nm, far smaller than bacterial cells, did not escape even from the shell itself, which material held in the core would first have to cross. That reading assumes the particles were retained by size exclusion rather than by adsorption to the alginate, to which iron oxide surfaces bind, and only a tracer released from the core can test it directly. The result for the core configuration was anticipated as a possible limitation, given the difficulty of keeping magnetite suspended in the inner solution, and indicates that a different tracer or loading strategy would be needed to directly assess the retention of material encapsulated in the core. Since a diluted magnetite suspension could not be detected, very small amounts of leakage below the detection limit of the method cannot be ruled out, and each sample was measured only once.",
      ],
    },
  ],
};

const CORE_SHELL_PRESERVATION: ResultData = {
  id: "core-shell-preservation",
  tabLabel: "Chemical environments",
  title: "Core-shell preservation under different chemical environments",
  subsections: [
    {
      id: "preservation-size",
      figures: [
        {
          src: `${FIGURES}/preservation-diameter.png`,
          alt: "Equivalent diameter of core-shell capsules over time in each storage medium.",
          caption:
            "Equivalent diameter of core-shell capsules stored in different chemical environments over time (mean ± SD, n = 8–10). Capsules in 1×, ½× and ¼× PBS and in the equivalent sodium-free buffer had broken down beyond imaging within the first day, and capsules in basified wastewater fragmented; neither is shown. Only capsules in untreated wastewater were followed to day 7. Capsules stored in industrial wastewater came from a different synthesis batch and were larger at day 0 than those in the other media, so this series should be read for its trend over time rather than compared in absolute size with the others.",
        },
      ],
    },
    {
      id: "preservation-ph",
      continued: true,
      body: [
        "**Effect of pH.** Capsules stored in water at pH 1.73 shrank progressively, losing approximately 20% of their projected area during the first day and 25% by day 3. In contrast, capsules stored in water at pH 3, 5 and 5.78, the last being unadjusted distilled water, swelled by approximately 15–20% during the first day. At pH 3 and 5 they then stabilised at 10–15% above their initial area, whereas at pH 5.78 they continued to swell slowly, reaching approximately 33% by day 3. Capsule shape was preserved in all cases, and no capsules lost their integrity during the first three days. With longer exposure, however, capsules at the lower pH values became too fragile to handle without breaking, so the pH series was not imaged beyond day 3 in order to keep all pH values on the same footing.",
      ],
      figures: [
        {
          src: `${FIGURES}/preservation-ph1-day0.jpg`,
          alt: "Core-shell capsules in water at pH 1.73 at day 0.",
          title: "pH 1.73 · day 0",
          caption: "Core-shell capsules in pH-adjusted water at the start of the preservation assay.",
        },
        {
          src: `${FIGURES}/preservation-ph1-day3.jpg`,
          alt: "Core-shell capsules in water at pH 1.73 after three days.",
          title: "pH 1.73 · day 3",
          caption:
            "Representative images of core-shell capsules stored in water at pH 1.73, 3, 5 and 5.78 (rows) over time (columns: days 0, 1, 2 and 3).",
        },
      ],
    },
    {
      id: "preservation-phosphate",
      continued: true,
      body: [
        "**Effect of sodium, phosphate and ionic strength.** Capsules stored in 1×, ½× and ¼× PBS broke down so rapidly that they could no longer be imaged after the first day, and the same behaviour was observed in the sodium-free phosphate buffer at the same dilutions. At the ⅛× dilution, capsules in both PBS and the sodium-free phosphate buffer swelled during the first day, by approximately 25% and 35% in projected area respectively, and remained intact over the three days monitored. Capsules in PBS held that size, while those in the sodium-free buffer swelled further, to about 55% above their initial area by day 3, with a marked increase in the variability between capsules. The two buffers therefore produced the same qualitative response at each dilution, regardless of the presence of sodium.",
      ],
      figures: [
        {
          src: `${FIGURES}/preservation-pbs-day0.jpg`,
          alt: "Core-shell capsules in one-eighth-strength PBS at day 0.",
          title: "⅛× PBS · day 0",
          caption: "Core-shell capsules in one-eighth-strength PBS at the start of the assay.",
        },
        {
          src: `${FIGURES}/preservation-pbs-day3.jpg`,
          alt: "Core-shell capsules in one-eighth-strength PBS after three days.",
          title: "⅛× PBS · day 3",
          caption:
            "Representative images of core-shell capsules stored in ⅛× PBS and ⅛× sodium-free phosphate buffer (rows) over time (columns: days 0, 1, 2 and 3). Capsules stored in 1×, ½× and ¼× buffers had broken down beyond imaging within the first day and are not shown.",
        },
      ],
    },
    {
      id: "preservation-wastewater",
      continued: true,
      body: [
        "**Industrial wastewater.** Within the first day, all capsules stored in industrial wastewater, whether untreated or basified, took on the brown colour of the wastewater. Capsules stored in untreated wastewater (pH 1.76) shrank by approximately 25% in projected area during the first day, similarly to capsules stored in water at low pH, and then remained approximately constant up to day 7, the only condition in which capsules were followed for a full week. They did not break or dissolve during storage, but they became noticeably more fragile than those stored in distilled water, and some broke during handling for imaging. When the wastewater was basified to pH 5, capsule integrity was compromised much more severely. Within the first day, capsules in wastewater basified with NaOH or KOH lost their regular shape and began to break apart, and over the following days they progressively fragmented into smaller pieces, so that none remained intact enough to be followed to day 7. Capsules in wastewater basified with NH₄OH degraded most severely, completely losing their spherical shape and disintegrating into a soft, paste-like mass within the first day.",
      ],
      figures: [
        {
          src: `${FIGURES}/preservation-ww-day0.jpg`,
          alt: "Core-shell capsules in untreated industrial wastewater at day 0.",
          title: "Untreated wastewater · day 0",
          caption: "Capsules at the start of the industrial-wastewater preservation assay.",
        },
        {
          src: `${FIGURES}/preservation-ww-day7.jpg`,
          alt: "Core-shell capsules in untreated industrial wastewater after seven days.",
          title: "Untreated wastewater · day 7",
          caption: "Capsules remained intact in untreated wastewater, although they became more fragile.",
        },
        {
          src: `${FIGURES}/preservation-ww-na-day1.jpg`,
          alt: "Core-shell capsules after one day in wastewater basified with sodium hydroxide.",
          title: "NaOH · day 1",
          caption: "Wastewater basified to pH 5 with NaOH.",
        },
        {
          src: `${FIGURES}/preservation-ww-k-day1.jpg`,
          alt: "Core-shell capsules after one day in wastewater basified with potassium hydroxide.",
          title: "KOH · day 1",
          caption: "Wastewater basified to pH 5 with KOH.",
        },
        {
          src: `${FIGURES}/preservation-ww-nh4-day1.jpg`,
          alt: "Core-shell material after one day in wastewater basified with ammonium hydroxide.",
          title: "NH₄OH · day 1",
          caption:
            "Representative images of core-shell capsules stored in untreated industrial wastewater and in industrial wastewater basified to pH 5 with NaOH, KOH and NH₄OH (rows) over time (columns: days 0, 1, 2, 3 and 7). Only capsules in untreated wastewater were imaged at day 7. Capsules basified with NH₄OH had turned into a paste by day 1 and could not be imaged thereafter, so that row ends there; empty cells elsewhere indicate that no capsules remained intact enough to be imaged.",
        },
      ],
    },
    {
      id: "preservation-table",
      continued: true,
      tables: [
        {
          caption:
            "Equivalent diameter (Deq, mm) of core-shell capsules (3.5% (w/v) alginate, Qe/Qi = 600/100 μL/min) stored in different media over time (mean ± SD, n = 8–10). Only capsules in untreated wastewater were followed to day 7.",
          headers: ["Medium", "Day 0", "Day 1", "Day 2", "Day 3", "Day 7"],
          rows: [
            ["Water pH 1.73", "3.34 ± 0.14", "3.01 ± 0.11", "2.93 ± 0.13", "2.90 ± 0.11", "—"],
            ["Water pH 3", "3.28 ± 0.17", "3.56 ± 0.18", "3.62 ± 0.21", "3.51 ± 0.20", "—"],
            ["Water pH 5", "3.26 ± 0.09", "3.51 ± 0.12", "3.41 ± 0.15", "3.43 ± 0.10", "—"],
            ["Water pH 5.78", "3.13 ± 0.16", "3.41 ± 0.22", "3.46 ± 0.22", "3.60 ± 0.23", "—"],
            ["⅛× PBS", "3.44 ± 0.14", "3.85 ± 0.17", "3.84 ± 0.14", "3.83 ± 0.13", "—"],
            ["⅛× Na-free buffer", "3.36 ± 0.15", "3.91 ± 0.21", "3.89 ± 0.17", "4.18 ± 0.31", "—"],
            ["Wastewater (pH 1.76)", "3.83 ± 0.11", "3.33 ± 0.09", "3.42 ± 0.09", "3.38 ± 0.11", "3.38 ± 0.16"],
          ],
        },
      ],
      bodyAfter: [
        "These results show that, over the first three days, **pH alone did not compromise capsule integrity** within the range tested: acidic conditions caused contraction of the alginate network, consistent with the protonation of its carboxylate groups [9,14], whereas mildly acidic to near-neutral conditions caused moderate swelling, and capsules remained intact in all cases. The fragility that developed at the lowest pH values with longer exposure nonetheless indicates that sustained contact with strongly acidic media weakens the network. In the phosphate buffers, capsule integrity depended on concentration but not on the presence of sodium: both PBS and the sodium-free buffer broke down the capsules at the three highest concentrations, and both were tolerated at the ⅛× dilution. This indicates that the degradation previously observed in PBS is not specific to sodium. It does not identify the cause: the sodium-free buffer replaces sodium with potassium, another monovalent cation able to compete with calcium for the carboxylate groups [9,13], and because phosphate concentration and ionic strength fall together on dilution, the experiment cannot separate sequestration of calcium by phosphate [12] from exchange with monovalent cations. Whatever the mechanism, the threshold lies between ⅛× and ¼× PBS, approximately 1.5–3 mM total phosphate. The phosphate concentration of the target wastewater was not determined. Capsules did survive a week in the untreated wastewater, but at pH 1.76 phosphate is largely protonated and less able to bind calcium, so this does not establish whether phosphate would threaten the capsules once the wastewater is neutralised. The brown colouring of all capsules stored in wastewater indicates that coloured components of the wastewater diffused into the alginate network, which suggests that the shell is permeable to dissolved compounds from the target medium, a necessary condition for the encapsulated bacteria to access the phosphate to be removed.",
        "The most critical finding concerns the industrial wastewater. In the untreated acidic wastewater the capsules did not break and could still be handled and imaged after a week, although they became increasingly fragile. **Basifying the wastewater**, which would be required before engineered bacteria could be exposed to it, **caused severe degradation with all three bases tested**: NaOH and KOH led to fragmentation of the capsules, and NH₄OH to their complete disintegration. Since KOH and NaOH produced a similar effect, the degradation cannot be attributed to sodium specifically, and since capsules in water at the same pH of 5 remained intact, it cannot be attributed to the pH reached either. It is more likely related to the high concentration of monovalent cations introduced when neutralising a strongly acidic medium, together with components of the wastewater able to compete with or sequester calcium, both of which may act more strongly once the carboxylate groups are deprotonated at the higher pH. The particularly severe effect of NH₄OH suggests an additional mechanism, possibly related to the ability of ammonia to complex calcium ions.",
        "These results partially matched our expectations. The contraction at low pH and the stability of the capsules in water were consistent with the known behaviour of calcium alginate gels, and the comparison between PBS and the sodium-free buffer clarified that the degradation previously observed in PBS was not caused by sodium. However, the severe degradation of capsules in basified wastewater was more pronounced than anticipated, and indicates that the current core-shell formulation is not compatible with direct exposure to pH-adjusted industrial wastewater. This represents a key limitation for the application of the encapsulation platform, and points to the need for strategies that reinforce the alginate network, such as additional crosslinking, polymer coatings or the use of barium instead of calcium, or to the adjustment of the wastewater pre-treatment before contact with the capsules.",
      ],
    },
  ],
};

/* ---------- 3. Final physical characterisation ---------- */

const THERMAL: ResultData = {
  id: "thermal-characterisation",
  tabLabel: "TGA-DSC",
  title: "Thermal characterisation (TGA)",
  subsections: [
    {
      id: "tga-summary",
      body: [
        "Three samples were analysed: two hydrated capsules and one pooled sample of two air-dried capsules, all of the optimised formulation. The results are summarised below.",
      ],
      tables: [
        {
          caption:
            "Thermogravimetric results for hydrated and air-dried core-shell capsules of the optimised formulation (3.5% (w/v) alginate, Qe/Qi = 600/100 μL/min). Mass lost as water and residue are given as a percentage of the initial mass; the main DTG peak is the temperature of maximum mass-loss rate. The residue of hydrated capsule 1 could not be quantified because of a baseline error in that run.",
          headers: [
            "Sample",
            "State",
            "Initial mass (mg)",
            "Final temperature",
            "Mass lost as water",
            "Residue at 495 °C",
            "Main DTG peak",
          ],
          rows: [
            ["Hydrated capsule 1", "Hydrated (1 capsule)", "11.22", "673 °C", "~96%", "not resolvable", "87 °C"],
            ["Hydrated capsule 2", "Hydrated (1 capsule)", "11.75", "495 °C", "~95%", "2.1%", "94 °C"],
            ["Dried capsules", "Dried (2 capsules)", "1.30", "495 °C", "~10%", "~23%", "198 °C"],
          ],
        },
      ],
      figures: [
        {
          src: `${FIGURES}/tga-curves.png`,
          alt: "Thermogravimetric curves of two hydrated capsules and the pooled dried sample, to 500 degrees Celsius.",
          caption:
            "Thermogravimetric curves of the two hydrated capsules and the pooled dried sample, shown to 500 °C. One hydrated replicate was taken to 673 °C and lost a further 0.3 percentage points between 495 and 673 °C, which is baseline drift rather than an event, so the comparison is made over the common range.",
        },
      ],
    },
    {
      id: "tga-discussion",
      continued: true,
      body: [
        "**A hydrated capsule is almost entirely water.** Both hydrated samples lost 95–96% of their mass in a single step, centred at 87 and 94 °C, and in one run only 6.5% of the initial mass remained at 120.8 °C. This figure is not merely plausible but close to what the formulation predicts: a capsule made from a 3.5% (w/v) alginate solution with 0.5% (w/v) calcium chloride in the core contains roughly 4–5% solids by mass, so a measured solid fraction of that size means the capsule retains essentially all of the water it was made with. The temperature range of this step matches what is reported for the removal of crystalline and loosely bound water from calcium chloride hydrates, between 25 and 130 °C [12,15], although in a capsule the great majority of what leaves is free water held in the hydrogel network rather than water of crystallisation. The two hydrated capsules came from independently prepared batches, and the closeness of their results indicates that the water content of a capsule is a reproducible property of the formulation rather than of a particular batch.",
        "Of the two hydrated replicates, the run taken to 673 °C ends at a slightly negative mass, which is not physically possible and shows that its baseline is in error. Its sequence of events is unaffected and agrees with the other replicate, but no residue can be quantified from it, so the residue and final-mass figures quoted here come from the replicate taken to 495 °C.",
        "That dominance of water is precisely why the sample masses differ so much between conditions. A single hydrated capsule weighs around 11 mg and carries only about 0.5 mg of solid, which is already at the low end of what the balance resolves reliably; two dried capsules together weigh 1.30 mg, consistent with the same 0.5 mg of solid per capsule once the water has gone. Pooling two capsules was therefore necessary to obtain a dry sample large enough to analyse, whereas one capsule was more than sufficient while hydrated.",
        "Once dried, the picture changes entirely. The dried capsules retained about 10% residual moisture and showed their principal mass-loss event at 198 °C, a temperature at which no free water remains; this is the thermal degradation of the alginate itself, and it falls in the range reported for the decomposition of alginate [11,12]. A contribution from the calcium salt within the capsule cannot be excluded at this temperature, since the second dehydration of calcium chloride occurs between 150 and 220 °C [12]. The residual 10% is itself worth noting: air-drying overnight on absorbent paper does not produce an anhydrous material, which is consistent with the hygroscopic character of both alginate and calcium chloride, and it sets a limit on how far the dried capsules imaged by electron microscopy can be described as water-free.",
        "A short artefact appears in the dried sample at around 444 °C, where the recorded mass rises by approximately 0.9 percentage points before the curve resumes its previous slope. A gain in mass at this stage of decomposition has no plausible chemical explanation in this material, and the simultaneous step in the heat-flow signal indicates a mechanical disturbance, most likely the carbonised residue shifting within the pan. The residue quoted above is therefore given as approximately 23% rather than to the decimal.",
        "The residues differ in a way that initially looks contradictory and is in fact informative. Expressed as a fraction of the starting mass, the dried sample left about 23% at 495 °C while the hydrated sample left only 2.1%; but since the hydrated capsule was 95% water to begin with, 2.1% of its wet mass corresponds to a substantial fraction of its solid content, and the two figures are of the same order once referred to the dry basis. Quantifying the inorganic fraction of a capsule precisely would require pooling several capsules, as was done for the dried sample.",
        "Taken together, the three runs describe a material whose thermal behaviour is governed almost entirely by its water. Up to roughly 130 °C the capsule simply dries, losing nineteen-twentieths of its mass without any chemical change; only above 200 °C does the alginate network itself begin to decompose. Neither process is relevant at the temperatures at which the capsules are intended to operate, so the practical conclusion is that **the system is thermally stable across its entire working range**, and that the only thermal event it will realistically encounter, evaporation, is the one that destroys it.",
      ],
    },
  ],
};

const OPTICAL_FIGURES: FigureData[] = [
  {
    src: `${FIGURES}/optical-5x.webp`,
    alt: "Optical micrograph of a whole dried core-shell capsule at 5× on a calibrated stage.",
    title: "(a)",
    caption: "",
  },
  ...[1, 2, 3, 4].map((view, index) => ({
    src: `${FIGURES}/optical-20x-${view}.webp`,
    alt: `Optical micrograph of the surface of a dried core-shell capsule at 20×, view ${view} of 4.`,
    title: `(${"bcde"[index]})`,
    caption: "",
  })),
];

/** SEM panels in reading order: four columns (90×/400×, 2000×, 7000×,
 * 20000×), one row per capsule or area — see the source's own caption. */
const SEM_PANELS: [string, string][] = [
  ["sem-1-90x", "Capsule 1, whole capsule at 90×"],
  ["sem-1-2000x-1", "Capsule 1, first area at 2000×"],
  ["sem-1-7000x-1", "Capsule 1, first area at 7000×"],
  ["sem-1-20000x-1", "Capsule 1, first area at 20000×"],
  ["sem-1-400x", "Capsule 1, surface overview at 400×"],
  ["sem-1-2000x-2", "Capsule 1, second area at 2000×"],
  ["sem-1-7000x-2", "Capsule 1, second area at 7000×"],
  ["sem-1-20000x-2", "Capsule 1, second area at 20000×"],
  ["sem-2-400x", "Capsule 2, surface overview at 400×"],
  ["sem-2-2000x", "Capsule 2 at 2000×"],
  ["sem-2-7000x", "Capsule 2 at 7000×"],
  ["sem-2-20000x", "Capsule 2 at 20000×"],
];

const SEM_FIGURES: FigureData[] = SEM_PANELS.map(([file, alt]) => ({
  src: `${FIGURES}/${file}.webp`,
  alt: `SEM micrograph of a dried, gold-coated core-shell capsule. ${alt}.`,
  caption: "",
}));

const MICROSTRUCTURE: ResultData = {
  id: "microstructural-characterisation",
  tabLabel: "Microscopy, SEM & EDS",
  title: "Microstructural, surface and elemental characterisation (optical microscopy, SEM and EDS)",
  subsections: [
    {
      id: "optical-microscopy",
      figures: OPTICAL_FIGURES,
      figuresColumns: 5,
      figuresCaption:
        "Optical micrographs of a dried core-shell capsule on a calibrated stage. (a) Whole capsule at 5×. (b–e) Four views of the surface at 20×. Axes in millimetres.",
      bodyAfter: [
        "**Drying shrinks the capsule to about a third of its hydrated size.** The one shown here measures roughly 1.1 mm by 0.95 mm, against an equivalent diameter of about 3.3 mm when hydrated. Shrinking to 0.31 of the original dimension means shrinking to around 3% of the original volume, which sits right next to the solid content of 4 to 5% by mass measured by TGA. Two independent measurements, one optical and one gravimetric, therefore say the same thing: the capsule is a water-filled network, and once the water goes there is almost nothing left to take up space.",
        "What remains is not spherical. The outline is irregular and faceted, with flat faces meeting at creases instead of a smooth curve, and the body is opaque where a hydrated capsule is translucent. That is what a hydrogel does when dried in air without solvent exchange: the network cannot hold its shape, so it folds inward along whatever line gives first [16].",
        "At 20× the surface is matte and finely granular, crossed by broad ridges and shallow dips left by the collapse. Dark specks appear in several fields, and in one of them bright angular translucent pieces sit at the capsule edge, consistent with salt from the curing bath crystallising on the surface as it dried. Nothing resembling a crack or a hole is visible.",
      ],
    },
    {
      id: "sem",
      continued: true,
      figures: SEM_FIGURES,
      figuresColumns: 4,
      figuresCaption:
        "SEM micrographs of dried, gold-coated core-shell capsules. Left column: whole capsule at 90× (top) and surface overviews at 400× (middle and bottom). Columns 2 to 4: 2000×, 7000× and 20000×, with each row showing a different capsule or area.",
      bodyAfter: [
        "At 90× both capsules have collapsed and folded in on themselves. One is lobed, with a deep crease across it and a bright crust along one edge; the other is plumper and split by a central cleft. Neither is spherical any more, and the two buckled in different ways. They lost about the same volume, but the shape of the collapse is not repeatable, which fits a shell that simply gives way wherever it yields first.",
        "At 400× the surface is smooth and unbroken across a wide, gently curved area. One capsule shows a single fine crack, and that is the only break anywhere in either series. **No pinholes, tears or peeling patches appear**, which says the shell comes through extrusion, gelation and washing intact. The crack is most likely from drying rather than a flaw in the capsule itself.",
        "From 2000× to 20000× both capsules follow the same progression: smooth at the lowest magnification, visibly rough at the intermediate one, and resolved into an open network with pores at the highest. The second area imaged on one capsule goes through the same three stages, flatter in one place and more folded in another, which tracks how the membrane creased as it dried.",
        "Seeing the same sequence in two independently made capsules is what allows these textures to be described as characteristic of the dried material rather than of one specimen. It also sets the limit of the technique here: the pores visible at high magnification are not the pores of a working capsule, because air-drying does not preserve the open structure of a hydrated network, it preserves the creases and tears left when that network collapsed [16,17]. Permeability would have to come from transport measurements, which were not part of this work, rather than from these images.",
        "One feature is compositional rather than topographic: the bright crust along the rim of one capsule, clearly brighter than the polymer around it. If that brightness reflects composition rather than the edge and charging effects that also brighten secondary-electron images, it points to a higher mean atomic number, and the elemental analysis finds only calcium and chlorine as heavy elements besides the coating. Salt from the curing bath, crystallised on the surface as the capsule dried, is the obvious explanation, and it matches the angular translucent bits seen optically at the capsule edge.",
      ],
    },
    {
      id: "eds",
      continued: true,
      tables: [
        {
          caption: "Elemental composition of the capsule surface by EDS. Gold comes from the conductive coating.",
          headers: ["Element", "Line", "Mass %", "Atom %"],
          rows: [
            ["C", "K", "34.63 ± 0.25", "50.61 ± 0.37"],
            ["O", "K", "35.98 ± 0.49", "39.47 ± 0.54"],
            ["Cl", "K", "4.29 ± 0.16", "2.13 ± 0.08"],
            ["Ca", "K", "15.92 ± 0.41", "6.97 ± 0.18"],
            ["Au", "M", "9.17 ± 0.33", "0.82 ± 0.03"],
          ],
        },
      ],
      bodyAfter: [
        "Nothing in the spectrum appears to be foreign to the capsule. Five elements appear, and each belongs to something that went into making it. Carbon and oxygen dominate, as predictable from the polysaccharide composition; gold comes from the coating. The information is in calcium and chlorine, and above all in the relationship between them.",
        "Calcium is abundant at 6.97 at%, while chlorine is comparatively scarce at 2.13 at%. If the calcium were simply unreacted calcium chloride trapped in the material, there would be two chlorines for every calcium. Instead there is about six times more calcium than that allows, so only around one atom in six or seven can be leftover salt. The rest has no chloride with it, and the obvious partner is the carboxylate group on the alginate chain, which indicates that **most of the calcium is bound to the polymer** rather than simply left behind by the bath.",
        "There also seems to be more calcium than crosslinking strictly needs. Ionic gelation works by one calcium bridging two carboxylates [10], so a fully crosslinked network needs one calcium per two monomer units, and the measured composition points to noticeably more than that. In fact the apparent excess is large enough that the carboxylates alone could not balance it, so either part of the calcium is paired with another anion, such as carbonate formed on contact with air, or the excess partly reflects the uncertainty of the quantification. The measurement cannot settle which, since the comparison rests on the carbon signal, which standardless EDS quantifies poorly.",
        "The presence of chlorine, on the other hand, shows that washing does not remove all of the bath salt, while its low level relative to calcium shows that most of it did come off. A capsule that had simply dried with bath solution on it would carry chloride in step with calcium, and this one does not.",
        "**No sodium is detected** above the detection limit, which matters because the alginate used is the sodium salt and gelation occurs by exchanging sodium for calcium. The absence of a sodium signal indicates that the exchange went essentially to completion in the area sampled. Taken with the calcium result, the two observations describe a capsule surface whose polymer has been converted to calcium alginate. Because EDS samples only the outer micrometre or so, this does not speak directly to the interior of the shell.",
        "None of this was unexpected, and that is precisely what the measurement was for: it confirms the chemistry the encapsulation protocol assumes. The one finding that goes beyond confirmation is the size of the calcium excess, which may reflect calcium held beyond what the junction zones require or a limitation of the quantification, and could be followed up by comparing different curing times or a more thorough wash.",
      ],
    },
  ],
};

export const ENCAPSULATION_SUBBLOCKS: ResultSubBlock[] = [
  {
    id: "alginate-characterisation",
    heading: "1. Alginate characterisation & bead optimisation",
    intro:
      "The relative proportion of G and M residues governs the crosslinking behaviour and mechanical properties assumed throughout the rest of the encapsulation work, so this is where that composition is established. Alginate concentration, drop height, flow rate and crosslinking time are then optimised in turn to establish a reproducible bead protocol, and the resulting beads are tested for preservation under different storage media, providing the baseline the core-shell work builds on.",
    results: [FTIR, BEAD_CONCENTRATION_HEIGHT, BEAD_FLOW_RATE, BEAD_CROSSLINKING, BEAD_PRESERVATION],
    outro:
      "**Conclusion.** The bead work established that encapsulation here is a controllable process rather than a fixed recipe, and it did so before any coaxial complexity was introduced. The raw alginate was confirmed as the sodium salt and found to be mannuronic-rich, which set the expectation of a softer, more elastic gel and told us that mechanical integrity would have to come from crosslinking conditions rather than from the polymer itself. Within the ranges tested, alginate concentration governed shape and reproducibility while leaving size essentially untouched, drop height mattered only below 3.5% (w/v), flow rate constrained the process from below rather than above, and crosslinking time changed nothing between ten and sixty minutes. The parameters that mattered were therefore few, and the ones that did not were ruled out rather than assumed. Preservation then identified the real threat: beads held their shape in water, but swelled and disintegrated in phosphate buffer and contracted and became fragile in the acidic industrial wastewater, which made **the chemistry of the surrounding medium, the variable to watch** from that point on. Those conclusions fixed the dripping protocol carried into the core-shell work and defined the preservation questions the capsules would later have to answer.",
  },
  {
    id: "core-shell-formation",
    heading: "2. Core-shell formation & validation",
    intro:
      "Moving from a single alginate phase to a coaxial system meant first identifying the concentration window compatible with stable capsule formation, and then optimising the outer-to-inner flow-rate ratio within that window. The resulting configuration was then tested against the three requirements it must meet in operation: chemical stability, physical containment and mechanical resistance.",
    results: [
      CORE_SHELL_SCREENING,
      CORE_SHELL_FLOW_RATIO,
      CORE_SHELL_MECHANICAL,
      CORE_SHELL_CONTAINMENT,
      CORE_SHELL_PRESERVATION,
    ],
    outro: [
      "**Conclusion.** The coaxial system required its own composition window rather than an adaptation of the bead protocol: 3 and 3.5% (w/v) alginate with no more than 0.5% (w/v) calcium chloride in the core, above which gelation at the injector tip prevented drops from detaching. Within that window, shell thickness proved too variable to choose between the 4:1 and 6:1 flow-rate ratios, and the decision was made instead on resistance to compression, which separated them unambiguously and in the expected direction.",
      "The configuration carried forward is **3.5% (w/v) alginate at Qe/Qi = 600/100 μL/min**, selected on mechanical performance and reproducibility, with the production rate deciding the absolute flow rate once mechanics had settled the ratio. Validated against the three demands of the bioreactor, that configuration retains particles embedded in its shell through synthesis and storage, deforms rather than fails up to the highest load tested, and in most conditions becomes more resistant after a week in water rather than less. Its limit is chemical: phosphate buffer more concentrated than roughly ⅛× PBS dissolves the shell, prolonged exposure to strongly acidic media makes it fragile, and basifying the industrial wastewater destroys the capsules whichever base is used, even though the capsules tolerate the same pH in water, which leaves the pH-adjustment step, rather than the capsule, as the part of the process still to be solved.",
    ],
  },
  {
    id: "final-characterisation",
    heading: "3. Final physical characterisation",
    intro:
      "With the encapsulation platform finalised, its thermal and structural properties were characterised to close out the material description needed for integration with the biological module.",
    results: [THERMAL, MICROSTRUCTURE],
    outro:
      "**Conclusion.** The two techniques describe a material that is mostly water and genuinely crosslinked. Thermally, a capsule is 95% water: it dries below 130 °C and the alginate network itself only decomposes above 200 °C, so nothing in the operating range of the bioreactor comes close to a thermal event, and the only one the capsules will realistically meet, evaporation, is the one that destroys them. Structurally, the shell comes through extrusion, gelation and washing without pinholes, tears or peeling, and the single crack seen anywhere in the series is consistent with drying rather than with a defect in production. Compositionally, the calcium present far exceeds what the residual chloride could account for, so most of it is bound to the polymer, and no sodium is detected, which together show that, in the surface region sampled, the sodium alginate was converted to calcium alginate. The one caveat applies to all of the imaging: these are dried capsules, collapsed to a third of their hydrated size, so the surface texture and porosity describe the dried network and not the hydrated structure the bacteria would inhabit.",
  },
];

export const ENCAPSULATION_OUTRO = [
  "The platform ends the project where the measurements pointed it rather than where we expected it to go. The FTIR characterisation anticipated a soft gel, and the mechanical work found one: capsules deform steadily under load and never rupture, so the selection criterion became how much shape they retain rather than when they break. The concentration window that worked for beads did not transfer to the coaxial system and had to be found again, and the measurement intended to settle the flow-rate ratio proved too variable to settle anything, so the decision moved to a functional property instead. That pattern, **a geometric measurement failing and a functional one succeeding**, is the methodological result we would most want another team to take from this page.",
  "What the platform does is now established on more than one line of evidence. Its shell retains embedded particles through synthesis and storage, releasing them only when deliberately dissolved; the capsule is overwhelmingly water, crosslinked calcium alginate at the surface examined, and continuous in its shell; and in most conditions it grows stronger rather than weaker over a week in water, so the capsules a bioreactor receives are better than the ones measured on the day of synthesis. What it does not yet do is survive the one chemical change the process requires. The capsules tolerate the untreated effluent, although they grow more fragile in it, but every attempt to raise its pH destroyed them regardless of the base used, even at a pH they tolerate in water. That single result is the clearest constraint the project hands forward: **either the neutralisation step moves out of contact with the capsules, or the shell chemistry has to change**. Two things also remain unmeasured: whether the shell retains what is held in the core, and its permeability, bounded so far only by the fact that phosphate reaches and breaks down the gel. Neither gap undermines what was built; both define what the next iteration has to measure.",
];

/** The source's per-record reference lists, merged and renumbered: FTIR
 * [1]–[4] unchanged, bead preservation [1]–[2] → [5]–[6], TGA-DSC
 * [1]–[2] → [7]–[8]. */
export const ENCAPSULATION_REFERENCES = [
  "[1] Gómez-Ordóñez E, Rupérez P. FTIR-ATR spectroscopy as a tool for polysaccharide identification in edible brown and red seaweeds. Food Hydrocolloids [Internet]. 2011 Feb 20;25(6):1514–20. Available from: https://doi.org/10.1016/j.foodhyd.2011.02.009",
  "[2] Mackie W. Semi-quantitative estimation of the composition of alginates by infra-red spectroscopy. Carbohydrate Research [Internet]. 1971 Dec 1;20(2):413–5. Available from: https://doi.org/10.1016/S0008-6215(00)81397-X",
  "[3] Sakugawa K, Ikeda A, Takemura A, Ono H. Simplified method for estimation of composition of alginates by FTIR. Journal of Applied Polymer Science [Internet]. 2004 May 4;93(3):1372–7. Available from: https://doi.org/10.1002/app.20589",
  "[4] Leal D, Matsuhiro B, Rossi M, Caruso F. FT-IR spectra of alginic acid block fractions in three species of brown seaweeds. Carbohydrate Research [Internet]. 2007 Nov 29;343(2):308–16. Available from: https://doi.org/10.1016/j.carres.2007.10.016",
  "[5] Raus RA, Nawawi WMFW, Nasaruddin RR. Alginate and alginate composites for biomedical applications. Asian Journal Of Pharmaceutical Sciences [Internet]. 5 de noviembre de 2020;16(3):280-306. Available from: https://doi.org/10.1016/j.ajps.2020.10.001",
  "[6] Toprakçı İ, Kurtulbaş E, Bozkurt RN, Şahin S. Coordination-Driven Assembly of Alginate Networks: From Egg-Box Structures to Bioactive Delivery Applications. Gels [Internet]. 28 de agosto de 2026;12(9):774. Available from: https://doi.org/10.3390/gels12090774",
  "[7] Wang Y, Zhao Y, He J, Sun C, Lu W, Zhang Y, et al. Doubling growth of egg-box structure during Calcium-mediated molecular assembly of alginate. Journal Of Colloid And Interface Science [Internet]. 20 de diciembre de 2022;634:747-56. Available from: https://doi.org/10.1016/j.jcis.2022.12.096",
  "[8] Chan ES, Lee BB, Ravindra P, Poncelet D. Prediction models for shape and size of ca-alginate macrobeads produced through extrusion–dripping method. Journal of Colloid and Interface Science [Internet]. 2009 May 20;338(1):63–72. Available from: https://doi.org/10.1016/j.jcis.2009.05.027",
  "[9] Lee BB, Ravindra P, Chan ES. Size and shape of calcium alginate beads produced by extrusion dripping. Chemical Engineering & Technology [Internet]. 2013 Sep 10;36(10):1627–42. Available from: https://doi.org/10.1002/ceat.201300230",
  "[10] Liu C, Shi Y, Liu Y, Liu Y, Yang C, Chen H, et al. Controllable fabrication of alginate-based floating beads with core-shell architecture. Food Hydrocolloids [Internet]. 2024 Feb 6;151:109869. Available from: https://doi.org/10.1016/j.foodhyd.2024.109869",
  "[11] Larosa C, Salerno M, De Lima JS, Meri RM, Da Silva MF, De Carvalho LB, et al. Characterisation of bare and tannase-loaded calcium alginate beads by microscopic, thermogravimetric, FTIR and XRD analyses. International Journal of Biological Macromolecules [Internet]. 2018 Apr 26;115:900–6. Available from: https://doi.org/10.1016/j.ijbiomac.2018.04.138",
  "[12] Pereda M, Poncelet D, Renard D. Characterization of Core-Shell Alginate capsules. Food Biophysics [Internet]. 2019 Jul 4;14(4):467–78. Available from: https://doi.org/10.1007/s11483-019-09595-x",
  "[13] Hu C, Lu W, Sun C, Zhao Y, Zhang Y, Fang Y. Gelation behavior and mechanism of alginate with calcium: Dependence on monovalent counterions. Carbohydrate Polymers [Internet]. 2022 Jun 28;294:119788. Available from: https://doi.org/10.1016/j.carbpol.2022.119788",
  "[14] Pan CT, Chien ST, Chiang TC, Yen CK, Wang SY, Wen ZH, et al. Optimization of the spherical integrity for sustained-release alginate microcarriers-encapsulated doxorubicin by the Taguchi method. Scientific Reports [Internet]. 2020 Dec 10;10(1):21758. Available from: https://doi.org/10.1038/s41598-020-78813-1",
  "[15] Karunadasa KSP, Manoratne CH, Pitawala HMTGA, Rajapakse RMG. Relative stability of hydrated/anhydrous products of calcium chloride during complete dehydration as examined by high-temperature X-ray powder diffraction. Journal of Physics and Chemistry of Solids [Internet]. 2018 Apr 27;120:167–72. Available from: https://doi.org/10.1016/j.jpcs.2018.04.034",
  "[16] Koch M, Włodarczyk-Biegun MK. Faithful scanning electron microscopic (SEM) visualization of 3D printed alginate-based scaffolds. Bioprinting [Internet]. 2020 Aug 26;20:e00098. Available from: https://doi.org/10.1016/j.bprint.2020.e00098",
  "[17] Tran DT, Nguyen NK, Yadav AS, Chuang A, Burford M, Malekpour Galogahi F, et al. Calcium Alginate Core–Shell Liquid Beads Encapsulated with Microalgae for Wastewater Treatment. Advanced Energy and Sustainability Research [Internet]. 2024 May 2;5(7):2400112. Available from: https://doi.org/10.1002/aesr.202400112",
];