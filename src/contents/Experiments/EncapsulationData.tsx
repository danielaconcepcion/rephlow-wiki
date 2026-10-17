import type { ExperimentSubBlock } from "../../components/LabFolders/types";

/** An inline "[n]" citation, linking to that numbered entry in this
 * block's single, merged reference list (see ExperimentCard's
 * ReferenceItem, which gives each entry the matching `ref-<scope>-<n>`
 * id — here the scope is the block id, "encapsulation"). Coloured via
 * .lab-citation, i.e. this block's own --folder-accent. */
function Cite({ scope, n }: { scope: string; n: number }) {
  return (
    <a href={`#ref-${scope}-${n}`} className="lab-citation">
      [{n}]
    </a>
  );
}

/**
 * Real content for the "Alginate encapsulation" Experiments block —
 * transcribed from the team's own write-up, the Notion page "Alginate
 * encapsulation" under Experiments. Wording is kept as written, including
 * the spectrophotometer model, which the source has since filled in, in
 * the containment experiment — a genuine pending field, not something to
 * invent a value for. Fields the source itself still marks as pending in
 * square brackets (SEM/EDS accelerating voltage and acquisition time, the
 * TGA heating rate) are left out of the parameter tables entirely rather
 * than shown as empty rows.
 *
 * The source organises this as three colour-coded callout blocks, each
 * with its own short intro and a set of toggle experiments — reproduced
 * here as three ExperimentSubBlock entries (see Experiments.tsx, which
 * renders one heading + one independent folder-tab row/deck per entry).
 * The page's closing "Conclusion" is carried as the last sub-block's
 * `outro`, which is where the component family renders closing prose.
 * Titles drop the source's own Spanish workflow tags ("CITAS",
 * "NÚMEROS CITAS", "REVISAR") — internal review markers, not part of the
 * write-up.
 *
 * References: the source keeps a separate numbered list per experiment,
 * several of which cite the same paper. They are merged here into one
 * list for the whole block (ALGINATE_ENCAPSULATION_REFERENCES, set as
 * `references` on the block in data.tsx), numbered in order of first
 * appearance, with every inline citation renumbered to match.
 *
 * Two small, deliberate normalisations (not content changes), matching
 * the ones already applied for the Engineering DBTL data:
 * - Every "Parameter | (blank) | Value" setup table in the source used an
 *   unlabelled middle column for "Variable"/"Constant" — labelled here as
 *   "Status" so the generic table renderer has a real header for it.
 * - The source's short "note" asides under each experiment (measurement
 *   methodology, expected outcome) are narrative continuations of that
 *   experiment's own write-up, not warnings or asides that deserve a
 *   separate callout treatment — they're folded into the write-up as
 *   trailing paragraphs, in their original order, rather than passed
 *   through ExperimentData.notes.
 *
 * Layout: every experiment with a table uses `body` (see
 * ExperimentData.body / ExperimentBodyBlock in types.ts) instead of the
 * simpler description/tables fields, so only the one paragraph that
 * actually describes a table's conditions sits beside it — the paragraphs
 * before and after stay full-width, instead of the whole card being
 * pinned into one fixed two-column shape (which used to leave a large
 * empty gap under a short table next to a much taller text column).
 * Where no paragraph specifically explains a table (the wide screening
 * matrix in concentrations-screening), that table is its own full-width
 * block rather than forced into a pairing that doesn't really exist in
 * the source.
 */

export const ALGINATE_ENCAPSULATION_INTRO: string[] = [
  "Efficient bacterial encapsulation was essential to develop a biological module that combines **biosafety and structural stability**. Rather than relying on a single optimisation step, the encapsulation strategy was developed through a sequential experimental workflow in which the outcome of each stage guided the design of the next.",
  "Upon contact with calcium ions, alginate rapidly forms a hydrogel through ionic crosslinking between its polymer chains according to the well-established **egg-box model [1]**. The relative proportion of **α-L-guluronic acid (G)** and **β-D-mannuronic acid (M)** residues strongly influences the mechanical properties of the resulting gel [2]. This property enables the formation of alginate beads by dripping an alginate solution into a calcium chloride bath under mild conditions, making alginate one of the most widely used materials for bacterial encapsulation [2-4]. However, obtaining beads with consistent size, shape and mechanical integrity requires careful optimisation of several synthesis parameters, including **alginate concentration**, **drop height**, **flow rate** and **crosslinking time**.",
  "Building upon this optimised bead protocol, the system was then translated into a more advanced **core-shell architecture**, in which a **liquid calcium chloride core** is surrounded by an **alginate shell [3,4]**. Unlike conventional beads, core-shell capsule formation depends on the simultaneous control of two coaxial flows, making additional optimisation necessary. Parameters such as the **concentrations** of the inner calcium chloride and outer alginate solutions, the **outer-to-inner flow-rate ratio**, **storage conditions** and **mechanical resistance** were therefore systematically evaluated to obtain stable, reproducible capsules suitable for wastewater treatment.",
  "Unless otherwise stated, all encapsulation experiments were performed using **sodium alginate from brown algae** (Sigma-Aldrich, A1112; lot 081M1381V), **anhydrous calcium chloride** (96%, extra pure, Acros Organics, 349615000; lot A0358796) and distilled water. Solutions were prepared immediately before use and delivered using **programmable infusion pumps** (KDS 200 dual-syringe pump, KD Scientific, and Fisherbrand KDS 100 single-syringe pump, Fisher Scientific) through plastic syringes (10 mL), connected via standard Luer connectors and flexible tubing to the dispensing outlet. Bead production used a single infusion pump, while core-shell production used both pumps and a **coaxial injector** (DMF-C01, Doxa Microfluidics; inner needle: 22G, 0.7 mm OD / 0.4 mm ID; outer needle: 17G, 1.4 mm OD / 1.1 mm ID). Capsule formation was carried out by dripping into a calcium chloride crosslinking bath under ambient laboratory conditions. When a parameter was investigated, all remaining synthesis conditions were kept constant unless explicitly indicated.",
  "Together, these experiments provided the experimental evidence required to develop an encapsulation platform suitable for the safe immobilisation of engineered bacteria and its integration into the rePhlow bioreactor.",
];

/** The block intro's figure, rendered under the intro prose by
 * Experiments.tsx (the same placement Genetic engineering's pathway
 * figure uses) with the captions the source gives them. Kept here, beside
 * the prose they belong to, rather than hard-coded in the page. */
export const ALGINATE_ENCAPSULATION_FIGURES: {
  src: string;
  alt: string;
  caption: string;
}[] = [
  {
    src: "core-shell-setup.webp",
    alt: "Schematic of the core-shell setup: two syringes, one with calcium chloride carrying bacteria and one with alginate, feeding a coaxial injector whose drops fall into a calcium chloride bath",
    caption:
      "Schematic of the core-shell encapsulation setup. Two independently controlled syringes deliver the inner phase, a calcium chloride solution which in the final system would carry the bacterial suspension, and the outer phase, sodium alginate, to a coaxial injector, where the two streams meet. The resulting drops detach from the injector tip and fall into a calcium chloride bath, in which the alginate shell is crosslinked around the liquid core.",
  },
];

/** One merged, renumbered reference list for the whole block — set as
 * `references` on the encapsulation entry in data.tsx and cited
 * throughout with `<Cite scope="encapsulation" ... />`. Numbered in order
 * of first appearance across the page. */
export const ALGINATE_ENCAPSULATION_REFERENCES: string[] = [
  "[1] Grant GT, Morris ER, Rees DA, Smith PJC, Thom D. Biological interactions between polysaccharides and divalent cations: The egg‐box model. FEBS Letters [Internet]. 1973 May 15;32(1):195–8. Available from: https://doi.org/10.1016/0014-5793(73)80770-7",
  "[2] Lee KY, Mooney DJ. Alginate: Properties and biomedical applications. Progress in Polymer Science [Internet]. 2011 Jul 7;37(1):106–26. Available from: https://doi.org/10.1016/j.progpolymsci.2011.06.003",
  "[3] Pereda M, Poncelet D, Renard D. Characterization of Core-Shell Alginate capsules. Food Biophysics [Internet]. 2019 Jul 4;14(4):467–78. Available from: https://doi.org/10.1007/s11483-019-09595-x",
  "[4] Tran DT, Nguyen NK, Yadav AS, Chuang A, Burford M, Malekpour Galogahi F, et al. Calcium alginate core-shell liquid beads encapsulated with microalgae for wastewater treatment. Advanced Energy and Sustainability Research [Internet]. 2024;5(7):2400112. Available from: https://doi.org/10.1002/aesr.202400112",
  "[5] Mackie W. Semi-quantitative estimation of the composition of alginates by infra-red spectroscopy. Carbohydrate Research [Internet]. 1971 Dec 1;20(2):413–5. Available from: https://doi.org/10.1016/s0008-6215(00)81397-x",
  "[6] Sakugawa K, Ikeda A, Takemura A, Ono H. Simplified method for estimation of composition of alginates by FTIR. Journal of Applied Polymer Science [Internet]. 2004 May 4;93(3):1372–7. Available from: https://doi.org/10.1002/app.20589",
  "[7] Rochas C, Lahaye M, Yaphe W. Sulfate content of carrageenan and agar determined by infrared spectroscopy. Botanica Marina [Internet]. 1986 Jan 1;29(4):335–40. Available from: https://doi.org/10.1515/botm.1986.29.4.335",
  "[8] Gómez-Ordóñez E, Rupérez P. FTIR-ATR spectroscopy as a tool for polysaccharide identification in edible brown and red seaweeds. Food Hydrocolloids [Internet]. 2011 Feb 20;25(6):1514–20. Available from: https://doi.org/10.1016/j.foodhyd.2011.02.009",
  "[9] Leal D, Matsuhiro B, Rossi M, Caruso F. FT-IR spectra of alginic acid block fractions in three species of brown seaweeds. Carbohydrate Research [Internet]. 2007 Nov 29;343(2):308–16. Available from: https://doi.org/10.1016/j.carres.2007.10.016",
  "[10] Lee BB, Ravindra P, Chan ES. Size and shape of calcium alginate beads produced by extrusion dripping. Chemical Engineering & Technology [Internet]. 2013;36(10):1627–42. Available from: https://doi.org/10.1002/ceat.201300230",
  "[11] Larosa C, Salerno M, De Lima JS, Meri RM, Da Silva MF, De Carvalho LB, et al. Characterisation of bare and tannase-loaded calcium alginate beads by microscopic, thermogravimetric, FTIR and XRD analyses. International Journal of Biological Macromolecules [Internet]. 2018 Apr 26;115:900–6. Available from: https://doi.org/10.1016/j.ijbiomac.2018.04.138",
  "[12] Hu C, Lu W, Sun C, Zhao Y, Zhang Y, Fang Y. Gelation behavior and mechanism of alginate with calcium: Dependence on monovalent counterions. Carbohydrate Polymers [Internet]. 2022 Jun 28;294:119788. Available from: https://doi.org/10.1016/j.carbpol.2022.119788",
  "[13] Liu C, Shi Y, Liu Y, Liu Y, Yang C, Chen H, et al. Controllable fabrication of alginate-based floating beads with core-shell architecture. Food Hydrocolloids [Internet]. 2024 Feb 6;151:109869. Available from: https://doi.org/10.1016/j.foodhyd.2024.109869",
  "[14] Wu L, Schroën K, Corstens M. Structural stability and release properties of emulsion-alginate beads under gastrointestinal conditions. Food Hydrocolloids [Internet]. 2023 Dec 29;150:109702. Available from: https://doi.org/10.1016/j.foodhyd.2023.109702",
  "[15] Pan CT, Chien ST, Chiang TC, Yen CK, Wang SY, Wen ZH, et al. Optimization of the spherical integrity for sustained-release alginate microcarriers-encapsulated doxorubicin by the Taguchi method. Scientific Reports [Internet]. 2020 Dec 10;10(1):21758. Available from: https://doi.org/10.1038/s41598-020-78813-1",
  "[16] Karunadasa KSP, Manoratne CH, Pitawala HMTGA, Rajapakse RMG. Relative stability of hydrated/anhydrous products of calcium chloride during complete dehydration as examined by high-temperature X-ray powder diffraction. Journal of Physics and Chemistry of Solids [Internet]. 2018 Apr 27;120:167–72. Available from: https://doi.org/10.1016/j.jpcs.2018.04.034",
  "[17] Koch M, Włodarczyk-Biegun MK. Faithful scanning electron microscopic (SEM) visualization of 3D printed alginate-based scaffolds. Bioprinting [Internet]. 2020 Aug 26;20:e00098. Available from: https://doi.org/10.1016/j.bprint.2020.e00098",
];

export const ALGINATE_ENCAPSULATION_SUBBLOCKS: ExperimentSubBlock[] = [
  {
    id: "alginate-characterisation",
    heading: "1. Alginate characterisation & bead optimisation",
    intro:
      "Before any synthesis work began, the raw alginate itself was characterised by **FTIR**. The relative proportion of **G and M residues** set expectations for calcium-mediated crosslinking and gel stiffness, so this had to be established first, ahead of any decision about synthesis parameters. Conventional beads were then used to establish a reproducible encapsulation protocol in the simplest possible format, a single alginate phase dripped into a calcium bath, before introducing the additional complexity of a coaxial system: **alginate concentration**, **drop height**, **flow rate** and **crosslinking time** were optimised in sequence, and the resulting beads were evaluated for preservation under different storage media.",
    experiments: [
      {
        id: "ftir",
        tabLabel: "FTIR",
        title: "Alginate characterisation by FTIR",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to characterise the raw sodium alginate used throughout the encapsulation platform by **Fourier-transform infrared (FTIR) spectroscopy**, in order to estimate the relative proportion of **mannuronic (M)** and **guluronic (G)** residues before developing the bead and core-shell synthesis protocols.",
              "Alginate is a linear copolymer of β-D-mannuronic acid (M) and α-L-guluronic acid (G) residues arranged in homopolymeric and heteropolymeric blocks. Because the **M/G composition** influences calcium-mediated crosslinking, gel stiffness and mechanical stability, this characterisation aims to provide information relevant to the expected behaviour of the hydrogel during encapsulation: a mannuronic-rich alginate (**M/G > 1**) would be expected to produce **softer, more elastic gels**, whereas a guluronic-rich alginate (**M/G < 1**) would be expected to produce **stiffer, more rigid gels**.",
            ],
          },
          {
            paragraphs: [
              "Measurements were performed by attenuated total reflectance FTIR (ATR-FTIR) spectroscopy using a **Nicolet iS50** FTIR spectrometer (Thermo Scientific, Inc.) equipped with a **DTGS-KBr detector** (deuterated triglycine sulfate with a KBr window), a KBr beam splitter and an Ever-Glo IR source (Ever-Glo™, Nicolet Electronic Corporation). Attenuated total reflectance was achieved using a multiple-bounce H-ATR accessory (Spectra Tech) fitted with a ZnSe crystal, over 13 internal reflections. Spectra were acquired over the range **400–4000 cm⁻¹**, achieving a spectral resolution of **0.09 cm⁻¹**.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Value"],
                rows: [
                  ["Sample form", "Sodium alginate powder"],
                  [
                    "Sampling technique",
                    "ATR (Nicolet iS50, ZnSe crystal, multiple-bounce H-ATR)",
                  ],
                  ["Spectral range", "400–4000 cm⁻¹"],
                  ["Resolution", "0.09 cm⁻¹"],
                  [
                    "Instrument",
                    "Nicolet iS50 FTIR spectrometer (Thermo Scientific, Inc.)",
                  ],
                ],
              },
            },
          },
          {
            paragraphs: [
              <>
                Two literature-established, sample-independent wavenumber pairs,
                each associated with M and G residues respectively, were used to
                estimate the <strong>M/G ratio</strong>:{" "}
                <strong>808 cm⁻¹ (M) / 787 cm⁻¹ (G)</strong>, as described by
                Mackie <Cite scope="encapsulation" n={5} />, and{" "}
                <strong>1030 cm⁻¹ (M) / 1080 cm⁻¹ (G)</strong>, as described by
                Sakugawa et al. <Cite scope="encapsulation" n={6} />. For each
                pair, a linear baseline was drawn between the two local
                absorbance minima flanking both bands, following the baseline
                method of Rochas et al. <Cite scope="encapsulation" n={7} /> as
                adapted for alginate by Gómez-Ordóñez & Rupérez{" "}
                <Cite scope="encapsulation" n={8} />. The transmittance at the
                baseline (Tb) and at the actual peak (Tp) were read at each
                diagnostic wavenumber, the baseline-corrected absorbance was
                calculated as <strong>A = log₁₀(Tb/Tp)</strong>, and the M/G
                ratio was obtained as <strong>A(M band)/A(G band)</strong>. Band
                assignments in the fingerprint (anomeric) region,{" "}
                <strong>950–750 cm⁻¹</strong>, were further supported by
                comparison with the literature values reported by Leal et al.{" "}
                <Cite scope="encapsulation" n={9} />.
              </>,
              "The expected outcome was to determine whether the raw alginate was mannuronic- or guluronic-rich, providing an initial indication of its expected gelling behaviour. If mannuronic residues predominated, a comparatively softer, more elastic calcium-alginate gel would be expected, potentially requiring closer control of crosslinking parameters (alginate concentration, CaCl₂ concentration, crosslinking time) to achieve sufficient mechanical integrity. Conversely, if guluronic residues predominated, a stiffer, more rigid gel would be expected, favouring mechanical stability but potentially requiring adjustment of other parameters (e.g. flow rate, drop height) to avoid excessive brittleness. This information was intended to guide the interpretation of the mechanical and preservation behaviour observed in the subsequent bead and core-shell experiments.",
            ],
          },
        ],
      },
      {
        id: "concentration-drop-height",
        tabLabel: "Concentration/drop height",
        title: "Bead optimisation: alginate concentration and drop height",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to identify the **alginate concentration** and **drop height** that produced the most homogeneous and reproducible alginate beads. As the first step in developing our encapsulation platform, establishing a robust bead synthesis protocol was essential before introducing the additional complexity of a core-shell architecture.",
              "Alginate concentration was evaluated because it directly determines **solution viscosity**, influencing droplet formation. Drop height was investigated because it affects the **impact velocity** of the droplets entering the calcium chloride bath, thereby influencing their final geometry and increasing the likelihood of deformation if not properly controlled.",
            ],
          },
          {
            paragraphs: [
              "To evaluate these variables, sodium alginate solutions of different concentrations were dripped into a calcium chloride crosslinking bath from several predefined heights while all remaining synthesis parameters were kept constant. The parameters for the experiment were set as follows:",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  [
                    "Alginate concentration",
                    "Variable",
                    "2, 2.5, 3 and 3.5% (w/v)",
                  ],
                  ["Drop height", "Variable", "1, 2, 3, 4 and 5 cm"],
                  ["CaCl₂ bath concentration", "Constant", "5% (w/v) [6]"],
                  ["Flow rate", "Constant", "600 μL/min"],
                  ["Crosslinking time", "Constant", "30 min"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "For each condition, **10 beads** were imaged after crosslinking and analysed using **ImageJ**, following the image-taking and image-analysis protocols described on the Protocols page. Bead size was characterised through the **projected area**, **perimeter**, **equivalent diameter (Deq)** and maximum (**Dmax**) and minimum (**Dmin**) **Feret diameters**, while bead shape was characterised through **sphericity (s = minor axis / major axis)**. The variability of these parameters between the beads of each condition was used as an indicator of reproducibility.",
              "**Higher alginate concentrations** were expected to produce more spherical and mechanically stable beads, as the increased viscosity helps the droplet retain its shape on impact and the higher polymer content provides more sites for calcium crosslinking. However, excessively viscous solutions could hinder droplet detachment from the outlet and produce elongated or tailed beads. Drop height was expected to show an **intermediate optimum**: if the height was too low, droplets might not detach cleanly or penetrate the bath surface, whereas if it was too high, the greater impact velocity could flatten or deform the droplets before gelation. The combination providing the **highest sphericity** and **lowest variability** between beads would be selected for the subsequent optimisation steps.",
            ],
          },
        ],
      },
      {
        id: "flow-rate",
        tabLabel: "Flow rate",
        title: "Bead optimisation: flow rate",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to determine the range of **flow rates** compatible with stable bead production, once the optimal alginate concentration and drop height had been established. Flow rate was investigated because it governs the rate of droplet formation at the needle outlet: at low flow rates, droplets form and **detach individually** under gravity, whereas excessively high flow rates can lead to the formation of a **continuous liquid jet** rather than discrete drops, preventing bead formation. Identifying whether, and at which flow rate, this transition occurred would establish the operating window for bead production.",
            ],
          },
          {
            paragraphs: [
              "To evaluate this variable, beads were synthesised using the previously optimised alginate concentration and drop height while varying only the flow rate at which the alginate solution was dispensed through the infusion pump. All remaining synthesis parameters were kept constant. The flow rate was progressively increased up to **3200 μL/min**; the range was not extended further, as this value was already far above the flow rates typically reported in the literature for alginate bead extrusion.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  ["Alginate concentration", "Constant", "3.5% (w/v)"],
                  ["Drop height", "Constant", "3 cm"],
                  ["CaCl₂ bath concentration", "Constant", "5% (w/v)"],
                  [
                    "Flow rate",
                    "Variable",
                    "400, 500, 600, 700, 800, 1600 and 3200 μL/min",
                  ],
                  ["Crosslinking time", "Constant", "30 min"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "Droplet formation at the outlet was monitored visually for each flow rate to determine whether **stable dripping** was maintained or whether a **transition to jetting** occurred. In addition, **10 beads per condition** were imaged after crosslinking and analysed using **ImageJ**, following the image-taking and image-analysis protocols described on the Protocols page, so that any effect of flow rate on bead size and shape could be quantified rather than only observed. Bead size was characterised through the projected area, perimeter, equivalent diameter (Deq) and maximum (Dmax) and minimum (Dmin) Feret diameters, while bead shape was characterised through sphericity (s = minor axis / major axis), with the variability between beads of each condition used as an indicator of reproducibility.",
              "The expected outcome was to identify the **maximum flow rate** at which stable dripping could be maintained without transition to jetting, and to establish whether bead morphology changed within that range. A flow rate within the stable range would then be carried forward as a constant parameter for the subsequent optimisation of crosslinking time.",
            ],
          },
        ],
      },
      {
        id: "crosslinking-time",
        tabLabel: "Crosslinking time",
        title: "Bead optimisation: crosslinking time",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to determine whether the **duration of calcium-mediated crosslinking** influenced the morphology of the alginate beads. Once the optimal alginate concentration and drop height had been established, crosslinking time was evaluated to determine whether longer exposure to calcium ions produced more compact and structurally stable beads.",
              "Crosslinking time was investigated because calcium ions progressively **diffuse into the alginate matrix**, promoting the formation of **calcium-mediated junction zones** between polymer chains according to the **egg-box model**. Although gelation occurs rapidly at the bead surface, extending the crosslinking period could potentially increase the degree of crosslinking throughout the bead, affecting its dimensions, structural integrity and handling properties.",
            ],
          },
          {
            paragraphs: [
              "To evaluate this variable, beads were synthesised using the previously optimised alginate concentration and drop height while varying only the residence time in the calcium chloride bath. All remaining synthesis parameters were kept constant. The experimental conditions were as follows:",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  ["Alginate concentration", "Constant", "3.5% (w/v)"],
                  ["Drop height", "Constant", "3 cm"],
                  ["CaCl₂ bath concentration", "Constant", "5% (w/v)"],
                  ["Flow rate", "Constant", "600 μL/min"],
                  [
                    "Crosslinking time",
                    "Variable",
                    "10, 20, 30, 40, 60 and 90 min",
                  ],
                ],
              },
            },
          },
          {
            paragraphs: [
              "For each condition, **10 beads** were imaged after crosslinking and analysed using **ImageJ**, following the image-taking and image-analysis protocols described on the Protocols page. Bead size was characterised through the **projected area**, **perimeter**, **equivalent diameter (Deq)** and maximum (**Dmax**) and minimum (**Dmin**) **Feret diameters**, while bead shape was characterised through **sphericity (s = minor axis / major axis)**. Changes in bead size were used to assess compaction of the alginate network with increasing crosslinking time, and the variability between the beads of each condition was used as an indicator of reproducibility.",
              "The expected outcome was to determine whether extending the crosslinking time produced measurable changes in bead morphology or compaction. If no significant differences were observed, the **30 min** crosslinking time commonly reported in the literature would be retained, as it would provide fully formed beads without unnecessarily extending production time.",
            ],
          },
        ],
      },
      {
        id: "storage-media",
        tabLabel: "Storage media",
        title: "Bead preservation under different storage media",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to evaluate the preservation of alginate beads under conditions representative of those they would encounter during storage and application. Following the optimisation of bead production, it was necessary to assess whether the capsules maintained their morphology over time when exposed to different aqueous environments.",
              <>
                Three storage media were investigated:{" "}
                <strong>distilled water</strong>,{" "}
                <strong>industrial wastewater</strong> and{" "}
                <strong>phosphate-buffered saline (PBS)</strong>. These media
                differ in <strong>ionic composition</strong>,{" "}
                <strong>ionic strength</strong> and{" "}
                <strong>phosphate content</strong>, all of which can influence
                alginate swelling, calcium ion exchange and hydrogel integrity.
                Water served as a control with minimal ionic interference,
                industrial wastewater (provided by Bio-Oils Huelva) represented
                the intended application environment, and PBS was included as a
                phosphate-rich medium with a well-defined ionic composition and
                ionic strength. PBS could promote{" "}
                <strong>alginate degradation</strong>
                because <strong>
                  sodium ions compete with calcium ions
                </strong>{" "}
                within the alginate matrix <Cite scope="encapsulation" n={12} />,
                progressively disrupting the ionic crosslinks that stabilise the
                hydrogel. Evaluating preservation in these media allowed us to
                assess the effect of different storage media on alginate
                integrity.
              </>,
              "10 beads synthesised under the previously optimised conditions were transferred to each storage medium immediately after crosslinking. Their morphology was monitored by photographs taken after **0, 24, 48 and 72 h, and after one week**. Beads stored in **PBS lost their structural integrity** during the first days, and once a bead had broken each fragment was measured as a separate bead, so this medium was followed qualitatively rather than quantified; images from the remaining conditions were analysed quantitatively to compare the evolution of bead morphology over time.",
            ],
          },
          {
            paragraphs: ["The experimental conditions were as follows:"],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  ["Alginate concentration", "Constant", "3.5% (w/v)"],
                  ["Drop height", "Constant", "3 cm"],
                  ["CaCl₂ bath concentration", "Constant", "5% (w/v)"],
                  ["Flow rate", "Constant", "600 μL/min"],
                  ["Crosslinking time", "Constant", "30 min"],
                  [
                    "Preservation medium",
                    "Variable",
                    "Distilled water, industrial wastewater and PBS",
                  ],
                ],
              },
            },
          },
          {
            paragraphs: [
              "The expected outcome was to identify storage conditions that best preserved bead morphology while determining whether specific media promoted hydrogel degradation. In particular, this experiment was expected to reveal whether PBS adversely affected alginate stability, providing the rationale for the more detailed preservation studies later performed with core-shell capsules.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "core-shell-formation",
    heading: "2. Core-shell formation & validation",
    intro:
      "Building on the optimised bead protocol, the system was translated into a core-shell architecture, in which a liquid calcium chloride core is surrounded by an alginate shell. Because capsule formation now depends on two coaxial flows meeting and gelling simultaneously rather than a single phase, the **outer alginate** and **inner calcium chloride concentrations** were first screened to identify a viable window, and the **outer-to-inner flow-rate ratio** was then optimised within that window. The resulting configuration was tested against the three requirements it must meet in operation: **chemical stability** under the ionic environments the capsules will encounter, **physical containment** of their contents, and **mechanical resistance** to the compression and handling expected in the bioreactor.",
    experiments: [
      {
        id: "concentrations-screening",
        tabLabel: "Concentrations screening",
        title: "Core-shell screening: alginate and CaCl₂ concentrations",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to identify combinations of **alginate** and **calcium chloride concentrations** capable of producing stable core-shell capsules. Unlike conventional beads, core-shell encapsulation requires the simultaneous extrusion of an outer alginate solution and an inner calcium chloride solution. As calcium ions begin diffusing into the alginate shell immediately after the two solutions meet, inappropriate concentration combinations can lead to **premature gelation**, **clogging of the coaxial nozzle** or **jet formation** (continuous stream, caused by a partially clogged nozzle, which prevents detachment of the drop from the nozzle), preventing successful capsule production.",
            ],
          },
          {
            // No sentence names this table outright, but this is the
            // paragraph describing exactly what it screens — the closest
            // real pairing available, rather than leaving the table
            // unpaired at the end for lack of a perfect lead-in.
            paragraphs: [
              "For this reason, an initial screening was carried out before optimising any additional process parameters. The **outer alginate concentration** and **inner calcium chloride concentration** were systematically varied while maintaining all remaining synthesis conditions constant. This approach allowed us to identify the concentration ranges compatible with stable capsule formation and establish suitable starting conditions for the subsequent optimisation of flow-rate ratios and capsule properties.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  [
                    "Outer alginate concentration",
                    "Variable",
                    "2.0, 2.5, 3.0 and 3.5% (w/v)",
                  ],
                  [
                    "Inner CaCl₂ concentration",
                    "Variable",
                    "0, 0.5, 1.0, 1.5 and 2.0% (w/v)∗",
                  ],
                  ["Outer CaCl₂ bath concentration", "Constant", "5% (w/v)"],
                  ["Drop height", "Constant", "3 cm"],
                  ["Outer flow rate (Qe)", "Constant", "600 μL/min"],
                  ["Inner flow rate (Qi)", "Constant", "200 μL/min"],
                  ["Flow-rate ratio (Qe:Qi)", "Constant", "3:1"],
                  ["Crosslinking time", "Constant", "30 min"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "Capsule formation was assessed qualitatively by monitoring the stability of the dripping regime, the appearance of premature gelation at the nozzle tip and the transition from dripping to jetting. Conditions capable of producing stable core-shell dripping were selected for subsequent optimisation experiments.",
              "The expected outcome was to identify a **concentration window** that allowed stable core-shell production while avoiding premature gelation and nozzle obstruction. Establishing these conditions was essential before investigating additional variables, as successful capsule formation depends primarily on the physicochemical compatibility of the inner and outer solutions.",
            ],
          },
          {
            // The full screening matrix — always full-width regardless of
            // layout, since a wide data grid genuinely needs the room; kept
            // last so it reads as the detailed record backing everything
            // said above it, rather than interrupting the write-up.
            pairedResource: {
              kind: "table",
              table: {
                caption:
                  "∗Not all calcium chloride concentrations were evaluated for every alginate concentration. The screening was refined based on capsule or jet formation, as shown in this experimental matrix.",
                headers: [
                  "[Alg] (%)",
                  "[CaCl₂] core (%)",
                  "[CaCl₂] bath (%)",
                  "Drop height (cm)",
                  "Qᵢ (µL/min)",
                  "Qₑ (µL/min)",
                  "Ratio Qe:Qi",
                  "Crosslinking time (min)",
                ],
                rows: [
                  ["2", "0", "5", "3", "200", "600", "3:1", "30"],
                  ["2", "0.5", "5", "3", "200", "600", "3:1", "30"],
                  ["2", "1", "5", "3", "200", "600", "3:1", "30"],
                  ["2", "1.5", "5", "3", "200", "600", "3:1", "30"],
                  ["2", "2", "5", "3", "200", "600", "3:1", "30"],
                  ["2.5", "0", "5", "3", "200", "600", "3:1", "30"],
                  ["2.5", "0.5", "5", "3", "200", "600", "3:1", "30"],
                  ["2.5", "1", "5", "3", "200", "600", "3:1", "30"],
                  ["3", "0", "5", "3", "200", "600", "3:1", "30"],
                  ["3", "0.5", "5", "3", "200", "600", "3:1", "30"],
                  ["3", "1", "5", "3", "200", "600", "3:1", "30"],
                  ["3.5", "0", "5", "3", "200", "600", "3:1", "30"],
                  ["3.5", "0.5", "5", "3", "200", "600", "3:1", "30"],
                  ["3.5", "1", "5", "3", "200", "600", "3:1", "30"],
                ],
              },
            },
          },
        ],
      },
      {
        id: "flow-rate-ratio",
        tabLabel: "Out:in flow-rate ratio",
        title: "Core-shell optimisation: outer-to-inner flow-rate ratio",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to optimise the **outer-to-inner flow-rate ratio (Qe/Qi)** for the production of homogeneous and mechanically robust core-shell capsules. Following the identification of suitable alginate and inner calcium chloride concentrations, the flow-rate ratio became the main process variable governing capsule formation, as it determines the **relative volumes of the core and shell**, influences **shell thickness** and affects the **stability of the coaxial flow** during encapsulation. Although several Qe/Qi ratios have been reported in the literature, their performance depends strongly on the physicochemical properties of each encapsulation system. Therefore, rather than adopting published conditions directly, we evaluated two literature-based ratios (**4:1** and **6:1**) to determine which provided the best performance under our synthesis conditions.",
              "The same 4:1 or 6:1 proportion can be delivered at different paces, so each ratio was tested at **two outer flow rates** to separate the effect of the proportion from that of the flow itself. **600 μL/min** was carried over from the optimised bead protocol. **300 μL/min** was included to test whether slower drop formation benefits the core-shell architecture, since the longer the drop takes to detach, the more time the inner phase has to settle symmetrically within the surrounding alginate; at 6:1 this setting already requires an inner flow of 50 μL/min, which we considered too slow to reduce further. Flow rates above 600 μL/min were not investigated, as the bead experiments had shown that drops grow with increasing flow and the drop now has to accommodate a liquid core in addition to its shell.",
            ],
          },
          {
            paragraphs: [
              "Because preliminary attempts to visualise the alginate shell using conventional photographs and optical microscopy were unsuccessful, **magnetite particles** were incorporated into the alginate solution to increase **contrast**. Consequently, all capsules evaluated in this experiment were synthesised with magnetite-labelled alginate, enabling the shell boundaries to be clearly distinguished during microscopic observation.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  ["Alginate concentration", "Variable", "3.0 and 3.5% (w/v)"],
                  ["Inner CaCl₂ concentration", "Constant", "0.5% (w/v)"],
                  ["Outer CaCl₂ bath", "Constant", "5% (w/v)"],
                  ["Drop height", "Constant", "3 cm"],
                  ["Outer flow rate (Qe)", "Variable", "300 and 600 μL/min"],
                  [
                    "Inner flow rate (Qi)",
                    "Variable",
                    "75 and 150 μL/min (Qe/Qi = 4:1); 50 and 100 μL/min (Qe/Qi = 6:1)",
                  ],
                  ["Outer-to-inner flow-rate ratio", "Variable", "4:1 and 6:1"],
                  ["Crosslinking time", "Constant", "30 min"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "Following synthesis, the resulting core-shell capsules were **frozen with liquid nitrogen**, cut in two, and imaged under an **optical microscope** to evaluate shell continuity, overall morphology and the presence of defects such as deformation, rupture or incomplete shell formation. Micrographs were subsequently analysed using **ImageJ** to measure **shell thickness**, allowing a quantitative comparison between the different outer-to-inner flow-rate ratios. Approximately 10 capsules were analysed per condition, with several thickness measurements taken around the shell of each capsule, so that variation around a single capsule and variation between capsules of the same condition could be distinguished. The most promising conditions would then be selected for mechanical resistance testing.",
              "The expected outcome was to determine the outer-to-inner flow-rate ratio that consistently produced reproducible core-shell capsules with a uniform shell thickness and well-defined morphology, with the **higher ratio** anticipated to yield **thicker shells** since it delivers a larger proportion of alginate per capsule. The lower outer flow rate was expected to produce more consistent capsules if the time available for the two streams to arrange themselves before detachment is a limiting factor. These conditions would subsequently be used for the remaining preservation and characterisation experiments.",
            ],
          },
        ],
      },
      {
        id: "containment",
        tabLabel: "Containment",
        title: "Core-shell containment assessed with magnetite",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to evaluate the containment capacity of the optimised core-shell capsules by determining whether **encapsulated particulate material was retained** during capsule synthesis and subsequent storage. As the encapsulation platform is intended to immobilise engineered *Pseudomonas putida*, demonstrating effective cargo retention was an essential validation step before introducing biological material.",
              "**Magnetite nanoparticles** (**50–100 nm** in diameter; Aldrich, 637106) were selected as a **surrogate cargo** because they darken the material visibly and absorb across the ultraviolet and visible range, which allows them to be detected by **UV-Vis spectroscopy**. At that size they are an order of magnitude smaller than *P. putida* cells, which are roughly a micrometre across, so successful retention of the nanoparticles represents a conservative assessment of capsule containment: particles significantly smaller than bacterial cells are more likely to escape through structural defects.",
            ],
          },
          {
            paragraphs: [
              "Three capsule formulations were prepared using the optimised encapsulation conditions: **control capsules without magnetite**, capsules containing **magnetite in the calcium chloride core**, and capsules containing **magnetite dispersed in the alginate shell**. Although localisation within the core more closely resembles the intended encapsulation of the bacterial suspension, preliminary observations suggested that the limited core volume would provide insufficient visual contrast, and that maintaining magnetite nanoparticles homogeneously suspended in the calcium chloride solution throughout the encapsulation process would be difficult because of particle sedimentation inside the syringe. Magnetite dispersed in the alginate shell was therefore included as an alternative formulation, expected to provide a more homogeneous particle distribution and a more reliable detection of leakage. Control capsules without magnetite were included to account for the absorbance of the capsule material itself, which was subtracted from the spectra of the magnetite-containing samples.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  ["Alginate concentration", "Constant", "3.5% (w/v)"],
                  ["Inner CaCl₂ concentration", "Constant", "0.5% (w/v)"],
                  ["Qe/Qi ratio", "Constant", "**6:1**"],
                  [
                    "Capsule formulation",
                    "Variable",
                    "No magnetite; magnetite in the core; magnetite in the alginate shell",
                  ],
                  ["Storage medium", "Variable", "Distilled water"],
                  ["Spectral range", "Constant", "200–1000 nm"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "Capsules were synthesised on Day 0, and the calcium chloride crosslinking bath was collected immediately after encapsulation. The capsules were subsequently transferred to distilled water for storage. On Day 1, UV-Vis spectra were acquired from the recovered calcium chloride bath, to evaluate particle loss during synthesis, and from the storage water, to assess leakage during storage. On **Day 3**, the storage water was measured again to evaluate whether additional leakage occurred during prolonged storage, and capsules taken from it were deliberately dissolved in phosphate-buffered saline (PBS) and the resulting solution measured, to confirm the presence of magnetite inside the capsules. Reference spectra of a magnetite suspension and of a diluted magnetite suspension were also recorded.",
              "Absorbance measurements were performed using a **GENESYS 10S UV–Vis spectrophotometer** (Thermo Scientific) with **quartz cuvettes**, as the spectra extended into the ultraviolet range, where conventional plastic cuvettes exhibit significant background absorbance. Full spectra between **200 and 1000 nm** were recorded for each sample, using the corresponding medium (calcium chloride solution, distilled water or PBS) as the instrumental blank. Capsules without magnetite and a magnetite suspension were measured as references, to establish the spectral regions in which each component absorbs. Since the capsule material was expected to absorb mainly in the ultraviolet, whereas magnetite absorbs broadly across the ultraviolet and visible range, the presence of magnetite was to be assessed in the visible region, where the contribution of the capsule material should be negligible. For each medium, the spectrum of the corresponding control (capsules without magnetite) was subtracted from those of the magnetite-containing samples, and the **mean absorbance difference between 450 and 600 nm** was used as an indicator of the amount of magnetite present.",
              "The expected outcome was that **negligible magnetite** would be detected in the calcium chloride bath and storage medium, whereas the **highest absorbance** would be observed after dissolution of the capsules in PBS, indicating that the encapsulated material remained effectively retained until intentional degradation of the alginate matrix. This would demonstrate that the optimised core-shell architecture provides effective physical containment throughout synthesis and storage, supporting its suitability for the encapsulation of engineered bacteria.",
            ],
          },
        ],
      },
      {
        id: "mechanical-resistance",
        tabLabel: "Mechanical resistance",
        title: "Mechanical resistance of core-shell capsules",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to compare the **mechanical resistance** of the core-shell capsule formulations and identify the configuration best suited for handling, transport and operation inside the bioreactor. Besides maintaining a well-defined morphology, the capsules must withstand external loads without collapsing or undergoing permanent deformation.",
              "Mechanical resistance also served a second purpose. The shell-thickness measurements had proved too variable to distinguish the two outer-to-inner flow-rate ratios, and resistance to compression measures the property that shell thickness was only a proxy for. It also captures the uniformity of the shell as well as its average thickness, since a capsule with a thick but uneven shell has a weak point that a mean value does not reveal.",
            ],
          },
          {
            paragraphs: [
              "Core-shell capsules produced under the eight conditions carried forward from the previous experiments were subjected to **increasing compressive loads** by placing **calibrated masses (1, 2, 5, 10 and 20 g)** on a microscope coverslip (**0.4 g**) resting on **groups of three capsules**. Each mass was applied independently, and after every loading step the capsules were photographed before removing the weight and replacing it with the next mass.",
              "Two independent batches were tested: one **on the day of synthesis** and one **after one week of storage** in distilled water. This would allow the effect of storage time to be observed, which is relevant because capsules will not be used on the day they are produced.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  [
                    "Capsule formulation",
                    "Variable",
                    "3% and 3.5% (w/v) alginate; Qe/Qi 4:1 and 6:1; Qe 600 and 300 μL/min",
                  ],
                  [
                    "Storage",
                    "Variable",
                    "Freshly made and after 1 week in distilled water",
                  ],
                  [
                    "Applied mass",
                    "Variable",
                    "0.4, 1.4, 2.4, 5.4, 10.4 and 20.4 g",
                  ],
                  [
                    "Loading procedure",
                    "Constant",
                    "Sequential application of individual masses",
                  ],
                ],
              },
            },
          },
          {
            paragraphs: [
              "The photographs obtained at each loading step were analysed using **ImageJ** following the image-analysis protocol described on the Protocols page, using **sphericity** as the descriptor of deformation. Each condition was expressed as the fraction of its own unloaded sphericity retained at each load, since capsules do not all start out equally spherical and an absolute comparison would confound resistance to compression with initial shape.",
              "The expected outcome was to identify the formulation that best resisted compressive loading while preserving its geometry and shell integrity. The **6:1** ratio was anticipated to perform better, since a higher proportion of outer phase delivers more alginate per capsule, whereas no difference was expected between the 300 and 600 μL/min outer flow rates, as these change the rate of production rather than the composition of each capsule. Any difference between freshly synthesised capsules and stored ones would be useful in predicting their behaviour inside of the bioreactor. This information would support the selection of the most mechanically robust capsule design for subsequent biological experiments and integration into the modular bioreactor.",
            ],
          },
        ],
      },
      {
        id: "chemical-environment",
        tabLabel: "Chemical environment",
        title: "Core-shell preservation under different chemical environments",
        body: [
          {
            paragraphs: [
              <>
                The aim of this experiment was to identify a storage
                composition, beyond distilled water alone, that would not
                degrade alginate core-shell capsules. The initial preservation
                experiment, performed with conventional beads, showed that{" "}
                <strong>PBS compromised structural integrity</strong>, but it
                remained unclear whether this effect resulted from the presence
                of <strong>sodium ions</strong>, <strong>phosphate ions</strong>
                , <strong>ionic strength</strong> or <strong>pH</strong>.
                Previous reports on alginate beads show that, under acidic
                conditions, ion exchange between the sodium ions of an external
                medium and the calcium ions crosslinking the gel is accelerated,
                weakening the gel to varying degrees{" "}
                <Cite scope="encapsulation" n={14} />, with the underlying
                competition between monovalent counterions such as Na⁺ and Ca²⁺
                for the alginate carboxylate groups also described
                mechanistically for alginate gelation more broadly{" "}
                <Cite scope="encapsulation" n={12} />. This experiment was
                therefore designed to isolate which of these chemical factors
                was responsible for the degradation observed, so that a
                preservation medium avoiding it could be identified.
              </>,
              "Preservation was also evaluated in the **industrial wastewater** supplied by **Bio-Oils Huelva**, as this is the medium the capsules must actually withstand during operation. Because this wastewater is **highly acidic**, it requires **pH adjustment** before it can be used with encapsulated bacteria. Three bases (**NaOH**, **KOH** and **NH₄OH**) were compared for this purpose, allowing any effect of the basifying agent itself, beyond pH, to also be assessed.",
            ],
          },
          {
            paragraphs: [
              "Core-shell capsules synthesised under the optimal encapsulation conditions were incubated in five groups of media: **distilled water adjusted to pH 1.73, 3.00, 5.00 and 5.78** using HCl, serial dilutions of **phosphate-buffered saline (PBS: 1×, 1/2×, 1/4× and 1/8×)**, an equivalent **sodium-free phosphate buffer** with the same ionic strength and matching dilutions, **untreated industrial wastewater**, and the same wastewater **basified to pH 5** with each of the three bases mentioned. All remaining synthesis and storage conditions were kept constant throughout the study.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  [
                    "Storage medium",
                    "Variable",
                    "PBS, sodium-free phosphate buffer, pH-adjusted distilled water, and industrial wastewater (untreated and basified)",
                  ],
                  ["Water pH", "Variable", "1.73, 3.00, 5.00 and 5.78"],
                  ["PBS concentration", "Variable", "1×, 1/2×, 1/4× and 1/8×"],
                  [
                    "Sodium-free phosphate buffer (PBS equivalent ionic strength)",
                    "Variable",
                    "1×, 1/2×, 1/4× and 1/8×",
                  ],
                  [
                    "Industrial wastewater pH",
                    "Variable",
                    "Untreated (as received, pH 1.76) and basified to pH 5 with NaOH, KOH or NH₄OH",
                  ],
                  [
                    "Capsule formulation",
                    "Constant",
                    "3.5% (w/v) alginate, 0.5% (w/v) inner CaCl₂, Qe/Qi = 600/100 μL/min (6:1)",
                  ],
                ],
              },
            },
          },
          {
            paragraphs: [
              "Capsule integrity was monitored by photographing the capsules after **0, 24, 48 and 72 h, and 1 week** of incubation, allowing qualitative comparison of the progression of degradation under each chemical environment.",
              <>
                The expected outcome was to isolate the specific effect of each
                variable on capsule integrity. For pH alone, using the
                pH-adjusted water, lowering pH was expected to protonate the
                carboxylate groups of alginate and reduce swelling independently
                of any monovalent cation exchange{" "}
                <Cite scope="encapsulation" n={15} />. For PBS and the
                sodium-free buffer dilutions, comparing the two was expected to
                distinguish whether degradation was driven specifically by
                sodium ions or by overall ionic strength, since only the PBS
                series contains sodium while both series share the same ionic
                strength at each dilution. For the industrial wastewater,
                changing the basifying agent was expected to reveal whether the
                choice of base, beyond its effect on pH, had any measurable
                impact on capsule stability.
              </>,
            ],
          },
        ],
      },
    ],
  },
  {
    id: "final-characterisation",
    heading: "3. Final physical characterisation",
    intro:
      "With a validated configuration in hand, the encapsulation platform was characterised further by **TGA-DSC** and **SEM**, to establish its **thermal behaviour**, **water content** and **microstructure** ahead of integration with the biological module.",
    experiments: [
      {
        id: "tga-dsc",
        tabLabel: "TGA-DSC",
        title: "Thermal characterisation (TGA-DSC)",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to characterise the thermal behaviour and water content of the optimised core-shell capsules using **thermogravimetric analysis coupled with differential scanning calorimetry (TGA-DSC)**, completing the physical characterisation of the encapsulation platform ahead of its integration with the biological module.",
              "Two capsule states were compared: **hydrated** core-shell capsules, taken directly from distilled water storage with no additional treatment, and **dried** core-shell capsules, obtained by placing capsules on absorbent paper and leaving them to air-dry overnight. Comparing these two states allows the mass loss attributable to **free and bound water** to be distinguished from the mass loss and thermal transitions associated with the alginate polymer itself, since the dried sample retains substantially less water than the hydrated one.",
            ],
          },
          {
            paragraphs: [
              "Because a hydrated capsule weighs an order of magnitude more than a dried one, a single capsule provided enough material for the hydrated runs, whereas two capsules were needed for the dried sample. Two independent hydrated capsules were analysed as replicates.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  [
                    "Capsule formulation",
                    "Constant",
                    "3.5% (w/v) alginate, 0.5% (w/v) inner CaCl₂, Qe/Qi = 600/100 μL/min (6:1)",
                  ],
                  [
                    "Sample type",
                    "Variable",
                    "Hydrated core-shell capsule (as stored in distilled water); dried core-shell capsule (air-dried on absorbent paper, overnight)",
                  ],
                  [
                    "Sample mass",
                    "Variable",
                    "11.22 and 11.75 mg (one hydrated capsule each); 1.30 mg (two dried capsules)",
                  ],
                  ["Instrument", "Constant", "SDT Q600 (TA Instruments)"],
                  [
                    "Temperature range",
                    "Constant",
                    "Room temperature to 495 °C; the first hydrated capsule was run to 673 °C to confirm that no further events occurred above 495 °C",
                  ],
                  ["Atmosphere", "Constant", "Nitrogen"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "For each sample, **mass loss** was recorded as a function of temperature by TGA, and the corresponding **heat flow** was recorded simultaneously by DSC, allowing thermal events (for example, water evaporation, polymer decomposition) to be correlated with the mass-loss steps observed in the same run. The **water content** of each sample was estimated from the mass remaining after the **first mass-loss step**, and the **residue at the end of the run** was used as an indication of the **inorganic fraction** left after decomposition of the polymer.",
              <>
                Literature characterisations of alginate by TGA-DSC are
                typically performed on the raw sodium alginate powder rather
                than on a hydrated hydrogel structure{" "}
                <Cite scope="encapsulation" n={3} />. The dried core-shell
                capsules were therefore expected to yield a thermal profile
                broadly consistent with these literature values for alginate
                powder, since drying was intended to bring the capsule's water
                content closer to that of a dry polymer sample. The hydrated
                capsules, by contrast, were expected to show a substantially
                larger initial mass-loss step than both the dried capsules and
                the literature values, reflecting the high water content
                retained within the core-shell structure under normal storage
                conditions. A contribution from the internal calcium chloride
                was also anticipated, since its hydrates lose water over ranges
                that overlap those of the hydrogel{" "}
                <Cite scope="encapsulation" n={16} />. Comparing the three
                profiles (hydrated capsule, dried capsule and literature powder
                data) was intended to provide an estimate of how much water the
                core-shell architecture retains relative to the starting raw
                material.
              </>,
            ],
          },
        ],
      },
      {
        id: "sem",
        tabLabel: "Microscopy, SEM & EDS",
        title:
          "Microstructural, surface and elemental characterisation (optical microscopy, SEM and EDS)",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to examine the **surface morphology**, **microstructure** and **composition** of the optimised core-shell capsules. Capsules were first imaged dry optically, and then analysed by **scanning electron microscopy (SEM)** with **energy-dispersive X-ray spectroscopy (EDS)**, which required drying and coating them beforehand.",
            ],
          },
          {
            paragraphs: [
              "A dried capsule was imaged first by **optical microscopy**. This is non-destructive and requires neither a vacuum nor a conductive coating, so the capsule could be imaged with no preparation beyond the drying itself. It provided a reference view of the dried structure that would later be examined by SEM. A single capsule was examined: one image was taken at **5×** to frame the whole capsule, and **four further images at 20×** at separate positions on its surface.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  ["Sample type", "Constant", "Dried core-shell capsules"],
                  [
                    "Capsule formulation",
                    "Constant",
                    "3.5% (w/v) alginate, 0.5% (w/v) inner CaCl₂, Qe/Qi = 600/100 μL/min (6:1)",
                  ],
                  [
                    "Instrument",
                    "Constant",
                    "Olympus BXFM microscope with SenTech colour CCD camera and Olympus TH4-200 / U-LH100-3-7 halogen illumination",
                  ],
                  [
                    "Magnification",
                    "Variable",
                    "5× (whole capsule, 1 image); 20× (4 positions)",
                  ],
                ],
              },
            },
          },
          {
            paragraphs: [
              "The expected outcome was a clear view of the capsule outline and of the appearance of its surface to judge whether the surface was smooth and intact.",
              <>
                <strong>SEM</strong> was then used to obtain the topographical
                detail that optical microscopy cannot provide. Only dried
                core-shell capsules were analysed. A hydrated capsule cannot be
                imaged directly, as the high vacuum required for SEM is
                incompatible with a sample retaining substantial free water: the
                water would evaporate inside the chamber, collapsing the
                structure and degrading the vacuum{" "}
                <Cite scope="encapsulation" n={17} />. Air-drying the capsules
                overnight on absorbent paper removes that water, at the cost of
                the shrinkage and surface collapse that are expected for any
                alginate hydrogel dried without a solvent-exchange or
                critical-point step. The micrographs therefore describe the
                dried polymer network rather than the hydrated capsule as it
                exists in operation, and this has to be kept in mind when
                interpreting them.
              </>,
            ],
          },
          {
            paragraphs: [
              "The dried capsules were inspected under an optical microscope, at a magnification high enough to judge how far the drying had deformed them and whether the surface was intact, so that a suitable specimen could be chosen before committing it to the coating step. Because alginate is not intrinsically conductive, the dried capsules required a **conductive coating** before imaging to prevent **charging artefacts**. **Graphite** was considered first, as it adds no element that would interfere with the analysis of an organic matrix, but **gold** was used instead, as it gives a more uniform conductive layer and better image quality on an irregular, collapsed surface.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  [
                    "Sample type",
                    "Constant",
                    "Dried core-shell capsule(s) (air-dried on absorbent paper, overnight)",
                  ],
                  [
                    "Capsule formulation",
                    "Constant",
                    "3.5% (w/v) alginate, 0.5% (w/v) inner CaCl₂, Qe/Qi = 600/100 μL/min (6:1)",
                  ],
                  [
                    "Optical inspection",
                    "Constant",
                    "Optika microscope, 670×, before coating",
                  ],
                  ["Conductive coating", "Constant", "Gold"],
                  [
                    "Instrument",
                    "Constant",
                    "JEOL JSM-IT700HR scanning electron microscope (Schottky field-emission source)",
                  ],
                  [
                    "Magnification",
                    "Variable",
                    "90×, 400×, 2000×, 7000×, 20000×",
                  ],
                ],
              },
            },
          },
          {
            paragraphs: [
              "Micrographs were acquired at five magnifications spanning more than two orders of magnitude. The lowest (**90×**) gives a whole-capsule view that shows the overall shape and the extent of **drying-induced collapse**; the intermediate magnifications (**400× and 2000×**) cover the outer surface and, where a capsule had fractured, the **exposed cross-section**; and the highest (**7000× and 20000×**) resolve the texture of the dried polymer itself. The expected outcome was to observe a surface morphology consistent with the alginate hydrogel network, and to describe the porosity and texture of the dried material at a resolution that optical microscopy cannot reach.",
            ],
          },
          {
            paragraphs: [
              "The elemental composition of the capsule surface was then measured by **EDS** on the same instrument. The electron beam excites characteristic X-ray emission from the elements present in the interaction volume, so the spectrum provides a direct check on whether the species expected from the encapsulation chemistry are actually there, and in what proportion. Two questions motivated the measurement: whether **calcium** is present in the material, as it must be if the alginate is ionically crosslinked; and how much **chloride** remains from the CaCl₂ bath after washing, which indicates how much unreacted salt the capsule retains. A single spectrum was acquired from a representative area of the capsule surface.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  [
                    "Sample type",
                    "Constant",
                    "Dried, gold-coated core-shell capsule",
                  ],
                  [
                    "Instrument",
                    "Constant",
                    "Energy-dispersive X-ray spectrometer coupled to the JEOL JSM-IT700HR",
                  ],
                  [
                    "Acquisition mode",
                    "Constant",
                    "Area spectrum, single acquisition",
                  ],
                  [
                    "Quantification",
                    "Constant",
                    "Standardless, normalised to 100 mass%",
                  ],
                ],
              },
            },
          },
          {
            paragraphs: [
              "Two limitations apply to the interpretation. EDS does not detect hydrogen, and quantification is normalised across the elements that are detected, so the reported percentages describe the heavy-element composition rather than the true composition of the polysaccharide. The gold coating also contributes to the spectrum and consumes part of that normalised total, which lowers the apparent weight of every other element to a comparable extent; relative comparisons between elements remain meaningful, absolute mass fractions do not. The expected outcome was to detect **carbon** and **oxygen** as the dominant elements, together with **calcium** at a level consistent with ionic crosslinking, and to establish whether **chloride** persisted after washing.",
            ],
          },
        ],
      },
    ],
    // The page's closing "Conclusion" — a statement about the whole
    // encapsulation workflow rather than about this last pair of
    // characterisation experiments, carried here because this component
    // family renders closing prose at sub-block level (see
    // ExperimentSubBlock.outro).
    outro: [
      "The experiments on this page were chosen to answer a fixed sequence of questions rather than to characterise the system exhaustively, and each one exists because the next decision could not be made without it. The raw material was characterised first because every later result depends on what the alginate is. Beads came before capsules because four production variables can be separated in a single-phase system and cannot be separated in a coaxial one. Each variable was then tested until it either proved to matter or demonstrably did not, and the ones that did not, crosslinking time and the upper end of the flow-rate range, were dropped rather than optimised further. Where a measurement failed to discriminate, as shell thickness did, the response was to change the measurement rather than to repeat it with more replicates.",
      "The scope was also set by the circumstances of the project rather than by what would be ideal. A mechanical assay built from calibrated masses, grid paper and a camera replaced an instrumented compression tester we did not have, and it answered the comparative question that needed answering even though it yields no modulus. Magnetite stood in for bacteria because the encapsulation setup sits in a physics laboratory with no biosafety containment, which is also why containment was validated with a conservative surrogate rather than with live cells. Dried specimens were used for thermal and electron imaging because no cryogenic or critical-point preparation was available, and the resulting limitations are stated rather than glossed. What is missing from this page is therefore missing for stated reasons, and in each case the experiment that would close the gap is named alongside the one that was done.",
    ],
  },
];
