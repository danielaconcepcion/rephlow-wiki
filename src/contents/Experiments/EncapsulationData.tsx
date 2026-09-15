import type { ExperimentSubBlock } from "../../components/LabFolders/types";

/** An inline "[n]" citation, linking to that numbered entry in this same
 * experiment's own reference list (see ExperimentCard's ReferenceItem,
 * which gives each entry the matching `ref-<scope>-<n>` id). Coloured via
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
 * transcribed verbatim from the team's own write-up (Notion export,
 * Experiments-Encapsulacion/Alginate encapsulation ....html). Wording is
 * kept exactly as written, including the source's own "XXX" placeholders
 * for values not yet filled in — these are genuine pending fields, not
 * something to invent a number for.
 *
 * The source organises this as three colour-coded callout blocks, each
 * with its own short intro and a set of toggle experiments — reproduced
 * here as three ExperimentSubBlock entries (see Experiments.tsx, which
 * renders one heading + one independent folder-tab row/deck per entry).
 * Two entries in the source ("Bead optimisation: flow rate", both entries
 * under "Final physical characterisation") were marked "(HACER)" — to do —
 * with literally no body content yet; they're kept as real, pending
 * experiments (so the tab exists and is honest about its state) rather
 * than fabricated or silently dropped. Entries marked "(REVISAR)" — to
 * review — do have full real content; only that internal review tag,
 * like "Sub-block" elsewhere in this wiki, is dropped from the shown
 * title, since it's a Notion workflow marker, not part of the write-up.
 *
 * Two small, deliberate normalisations (not content changes), matching
 * the ones already applied for the Engineering DBTL data:
 * - Every "Parameter | (blank) | Value" setup table in the source used an
 *   unlabelled middle column for "Variable"/"Constant" — labelled here as
 *   "Status" so the generic table renderer has a real header for it.
 * - The colour-highlighted workflow line in the block intro
 *   ("Raw material characterisation (1) → ...") is kept as plain text —
 *   this component family has no inline-highlight markup, only DbtlCycle's
 *   does.
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
 * Where no paragraph specifically explains a table (FTIR's instrument
 * settings; the wide screening matrix in concentrations-screening), that
 * table is its own full-width block rather than forced into a pairing
 * that doesn't really exist in the source.
 */

export const ALGINATE_ENCAPSULATION_INTRO: string[] = [
  "Efficient bacterial encapsulation was essential to develop a biological module that combines biosafety, structural stability and effective phosphate transport. Rather than relying on a single optimisation step, the encapsulation strategy was developed through a sequential experimental workflow in which the outcome of each stage guided the design of the next.",
  "Upon contact with calcium ions, alginate rapidly forms a hydrogel through ionic crosslinking between its polymer chains according to the well-established egg-box model. The relative proportion of α-L-guluronic acid (G) and β-D-mannuronic acid (M) residues strongly influences the mechanical properties of the resulting gel. This property enables the formation of alginate beads by dripping an alginate solution into a calcium chloride bath under mild conditions, making alginate one of the most widely used materials for bacterial encapsulation. However, obtaining beads with consistent size, shape and mechanical integrity requires careful optimisation of several synthesis parameters, including alginate concentration, drop height, flow rate and crosslinking time.",
  "Building upon this optimised bead protocol, the system was then translated into a more advanced core-shell architecture, in which a liquid calcium chloride core is surrounded by an alginate shell. Unlike conventional beads, core-shell capsule formation depends on the simultaneous control of two coaxial flows, making additional optimisation necessary. Parameters such as the concentrations of the inner calcium chloride and outer alginate solutions, the outer-to-inner flow-rate ratio, storage conditions and mechanical resistance were therefore systematically evaluated to obtain stable, reproducible capsules suitable for wastewater treatment.",
  "Unless otherwise stated, all encapsulation experiments were performed using sodium alginate (manufacturer, grade and lot: XXX), calcium chloride (XXX) and ultrapure water. Solutions were prepared immediately before use and delivered using two programmable infusion pumps (model: XXX) connected through plastic syringes (XXX mL), connected through standard Luer connectors to flexible tubing to a coaxial needle provided by DOXA Microfluidics for core-shell production (inner gauge: XXX; outer gauge: XXX). Capsule formation was carried out by dripping into a calcium chloride crosslinking bath under ambient laboratory conditions. When a parameter was investigated, all remaining synthesis conditions were kept constant unless explicitly indicated.",
  "Together, these experiments provided the experimental evidence required to develop an encapsulation platform suitable for the safe immobilisation of engineered bacteria and its integration into the rePhlow bioreactor.",
  "Raw material characterisation (1) → Bead optimisation (2-5) → Core-shell optimisation (6-7) → Core-shell validation (8-10) → Core-shell characterisation (11-12).",
];

export const ALGINATE_ENCAPSULATION_SUBBLOCKS: ExperimentSubBlock[] = [
  {
    id: "alginate-characterisation",
    heading: "1. Alginate characterisation & bead optimisation",
    intro:
      "Before any synthesis work began, the raw alginate itself was characterised by FTIR. The relative proportion of G and M residues set expectations for calcium-mediated crosslinking and gel stiffness, so this had to be established first, ahead of any decision about synthesis parameters. Conventional beads were then used to establish a reproducible encapsulation protocol in the simplest possible format, a single alginate phase dripped into a calcium bath, before introducing the additional complexity of a coaxial system: alginate concentration, drop height, flow rate and crosslinking time were optimised in sequence, and the resulting beads were evaluated for preservation under different storage media.",
    experiments: [
      {
        id: "ftir",
        tabLabel: "FTIR",
        title: "Alginate characterisation by FTIR",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to characterise the raw sodium alginate used throughout the encapsulation platform by Fourier-transform infrared (FTIR) spectroscopy, in order to estimate the relative proportion of mannuronic (M) and guluronic (G) residues before developing the bead and core-shell synthesis protocols.",
              "Alginate is a linear copolymer of β-D-mannuronic acid (M) and α-L-guluronic acid (G) residues arranged in homopolymeric and heteropolymeric blocks. Because the G/M composition influences calcium-mediated crosslinking, gel stiffness and mechanical stability, this characterisation aims to provide information relevant to the expected behaviour of the hydrogel during encapsulation: a mannuronic-rich alginate (M/G > 1) would be expected to produce softer, more elastic gels, whereas a guluronic-rich alginate (M/G < 1) would be expected to produce stiffer, more rigid gels.",
            ],
          },
          {
            // The methodology paragraph is the closest real description of
            // what this instrument-settings table records — no sentence
            // names the table outright, but forcing a pairing here beats
            // leaving it stranded, unpaired, at the end.
            paragraphs: [
              <>
                Two literature-established, sample-independent wavenumber pairs, each associated with M and G
                residues respectively, were used to estimate the M/G ratio: 808 cm⁻¹ (M) / 787 cm⁻¹ (G), as
                described by Mackie <Cite scope="ftir" n={1} />, and 1030 cm⁻¹ (M) / 1080 cm⁻¹ (G), as described by
                Sakugawa et al. <Cite scope="ftir" n={2} />. For each pair, a linear baseline was drawn between the
                two local absorbance minima flanking both bands, following the baseline method of Rochas et al.{" "}
                <Cite scope="ftir" n={3} /> as adapted for alginate by Gómez-Ordóñez & Rupérez{" "}
                <Cite scope="ftir" n={4} />. The transmittance at the baseline (Tb) and at the actual peak (Tp) were
                read at each diagnostic wavenumber, the baseline-corrected absorbance was calculated as A =
                log₁₀(Tb/Tp), and the M/G ratio was obtained as A(M band)/A(G band). Band assignments in the
                fingerprint (anomeric) region, 950–750 cm⁻¹, were further supported by comparison with the
                literature values reported by Leal et al. <Cite scope="ftir" n={5} />.
              </>,
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Value"],
                rows: [
                  ["Sample form", "Sodium alginate powder, XXX"],
                  ["Sampling technique", "XXX (ATR)"],
                  ["Spectral range", "400–4000 cm⁻¹"],
                  ["Resolution", "XXX cm⁻¹"],
                  ["Number of scans", "XXX"],
                  ["Instrument", "XXX"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "The expected outcome was to determine whether the raw alginate was mannuronic- or guluronic-rich, providing an initial indication of its expected gelling behaviour. If mannuronic residues predominated, a comparatively softer, more elastic calcium-alginate gel would be expected, potentially requiring closer control of crosslinking parameters (alginate concentration, CaCl₂ concentration, crosslinking time) to achieve sufficient mechanical integrity. Conversely, if guluronic residues predominated, a stiffer, more rigid gel would be expected, favouring mechanical stability but potentially requiring adjustment of other parameters (e.g. flow rate, drop height) to avoid excessive brittleness. This information was intended to guide the interpretation of the mechanical and preservation behaviour observed in the subsequent bead and core-shell experiments.",
            ],
          },
        ],
        references: [
          "[1] Mackie W. Semi-quantitative estimation of the composition of alginates by infra-red spectroscopy. Carbohydrate Research. 1971 Dec 1;20(2):413–5. https://doi.org/10.1016/s0008-6215(00)81397-x",
          "[2] Sakugawa K, Ikeda A, Takemura A, Ono H. Simplified method for estimation of composition of alginates by FTIR. Journal of Applied Polymer Science. 2004 May 4;93(3):1372–7. https://doi.org/10.1002/app.20589",
          "[3] Rochas C, Lahaye M, Yaphe W. Sulfate content of carrageenan and agar determined by infrared spectroscopy. Botanica Marina. 1986 Jan 1;29(4):335–40. https://doi.org/10.1515/botm.1986.29.4.335",
          "[4] Gómez-Ordóñez E, Rupérez P. FTIR-ATR spectroscopy as a tool for polysaccharide identification in edible brown and red seaweeds. Food Hydrocolloids. 2011 Feb 20;25(6):1514–20. https://doi.org/10.1016/j.foodhyd.2011.02.009",
          "[5] Leal D, Matsuhiro B, Rossi M, Caruso F. FT-IR spectra of alginic acid block fractions in three species of brown seaweeds. Carbohydrate Research. 2007 Nov 29;343(2):308–16. https://doi.org/10.1016/j.carres.2007.10.016",
        ],
      },
      {
        id: "concentration-drop-height",
        tabLabel: "Concentration/drop height",
        title: "Bead optimisation: alginate concentration and drop height",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to identify the alginate concentration and drop height that produced the most homogeneous and reproducible alginate beads. As the first step in developing our encapsulation platform, establishing a robust bead synthesis protocol was essential before introducing the additional complexity of a core-shell architecture.",
              "Alginate concentration was evaluated because it directly determines solution viscosity, influencing droplet formation. Drop height was investigated because it affects the impact velocity of the droplets entering the calcium chloride bath, thereby influencing their final geometry and increasing the likelihood of deformation if not properly controlled.",
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
                  ["Alginate concentration", "Variable", "2, 2.5, 3 and 3.5% (w/v)"],
                  ["Drop height", "Variable", "1, 2, 3, 4 and 5 cm"],
                  ["CaCl₂ bath concentration", "Constant", "5% (w/v)"],
                  ["Flow rate", "Constant", "600 μL/min"],
                  ["Crosslinking time", "Constant", "30 min"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "After gelation, bead morphology was quantified using ImageJ by measuring the projected area, perimeter, equivalent diameter (Deq), and maximum (Dmax) and minimum (Dmin) Feret diameters.",
              "The expected outcome was to identify the combination of alginate concentration and drop height that consistently produced spherical beads with homogeneous dimensions and good reproducibility. These conditions would provide a reliable foundation for the subsequent optimisation of additional synthesis parameters and the transition towards the core-shell encapsulation system.",
            ],
          },
        ],
      },
      {
        id: "flow-rate",
        tabLabel: "Flow rate",
        title: "Bead optimisation: flow rate",
        description: "Content not yet available in the source record.",
      },
      {
        id: "crosslinking-time",
        tabLabel: "Crosslinking time",
        title: "Bead optimisation: crosslinking time",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to determine whether the duration of calcium-mediated crosslinking influenced the morphology of the alginate beads. Once the optimal alginate concentration and drop height had been established, crosslinking time was evaluated to determine whether longer exposure to calcium ions produced more compact and structurally stable beads.",
              "Crosslinking time was investigated because calcium ions progressively diffuse into the alginate matrix, promoting the formation of calcium-mediated junction zones between polymer chains according to the egg-box model. Although gelation occurs rapidly at the bead surface, extending the crosslinking period could potentially increase the degree of crosslinking throughout the bead, affecting its dimensions, structural integrity and handling properties.",
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
                  ["Crosslinking time", "Variable", "10, 20, 30, 40, 60 and 90 min"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "Following gelation, bead morphology was analysed using ImageJ by measuring the projected area, perimeter, equivalent diameter (Deq), and maximum (Dmax) and minimum (Dmin) Feret diameters.",
              "The expected outcome was to determine whether extending the crosslinking time produced measurable changes in bead morphology or compaction. If no significant differences were observed, the shortest crosslinking time capable of producing fully formed and mechanically stable beads would be selected to minimise production time while maintaining capsule quality.",
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
              "Three storage media were investigated: distilled water, industrial wastewater and phosphate-buffered saline (PBS). These media differ in ionic composition, ionic strength and phosphate content, all of which can influence alginate swelling, calcium ion exchange and hydrogel integrity. Water served as a control with minimal ionic interference, industrial wastewater (provided by Bio-Oils Huelva) represented the intended application environment, and PBS was included as a phosphate-rich medium with a well-defined ionic composition and ionic strength. PBS could promote alginate degradation because sodium ions compete with calcium ions within the alginate matrix, progressively disrupting the ionic crosslinks that stabilise the hydrogel. Evaluating preservation in these media allowed us to assess the effect of different storage media on alginate integrity.",
              "10 beads synthesised under the previously optimised conditions were transferred to each storage medium immediately after crosslinking. Their morphology was monitored by pictures taken after 0, 24, 48 and 72 hours, and after one week. Because beads stored in PBS rapidly lost their structural integrity, photographic monitoring was discontinued after the initial observations. Images from the remaining conditions were analysed quantitatively to compare the evolution of bead morphology over time.",
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
                  ["Preservation medium", "Variable", "Distilled water, industrial wastewater and PBS"],
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
      "Building on the optimised bead protocol, the system was translated into a core-shell architecture, in which a liquid calcium chloride core is surrounded by an alginate shell. Because capsule formation now depends on two coaxial flows meeting and gelling simultaneously rather than a single phase, the outer alginate and inner calcium chloride concentrations were first screened to identify a viable window, and the outer-to-inner flow-rate ratio was then optimised within that window. The resulting configuration was tested against the three requirements it must meet in operation: chemical stability under the ionic environments the capsules will encounter, physical containment of their contents, and mechanical resistance to the compression and handling expected in the bioreactor.",
    experiments: [
      {
        id: "concentrations-screening",
        tabLabel: "Concentrations screening",
        title: "Core-shell screening: alginate and CaCl₂ concentrations",
        body: [
          {
            paragraphs: [
              "The aim of this experiment was to identify combinations of alginate and calcium chloride concentrations capable of producing stable core-shell capsules. Unlike conventional beads, core-shell encapsulation requires the simultaneous extrusion of an outer alginate solution and an inner calcium chloride solution. As calcium ions begin diffusing into the alginate shell immediately after the two solutions meet, inappropriate concentration combinations can lead to premature gelation, clogging of the coaxial nozzle or jet formation (continuous stream, caused by a partially clogged nozzle, which prevents detachment of the drop from the nozzle), preventing successful capsule production.",
            ],
          },
          {
            // No sentence names this table outright, but this is the
            // paragraph describing exactly what it screens — the closest
            // real pairing available, rather than leaving the table
            // unpaired at the end for lack of a perfect lead-in.
            paragraphs: [
              "For this reason, an initial screening was carried out before optimising any additional process parameters. The outer alginate concentration and inner calcium chloride concentration were systematically varied while maintaining all remaining synthesis conditions constant. This approach allowed us to identify the concentration ranges compatible with stable capsule formation and establish suitable starting conditions for the subsequent optimisation of flow-rate ratios and capsule properties.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  ["Outer alginate concentration", "Variable", "2.0, 2.5, 3.0 and 3.5% (w/v)"],
                  ["Inner CaCl₂ concentration", "Variable", "0, 0.5, 1.0, 1.5 and 2.0% (w/v)*"],
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
              "The expected outcome was to identify a concentration window that allowed stable core-shell production while avoiding premature gelation and nozzle obstruction. Establishing these conditions was essential before investigating additional variables, as successful capsule formation depends primarily on the physicochemical compatibility of the inner and outer solutions.",
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
                  "*Not all calcium chloride concentrations were evaluated for every alginate concentration. The screening was refined based on capsule or jet formation, as shown in this experimental matrix.",
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
              "The aim of this experiment was to optimise the outer-to-inner flow-rate ratio (Qe/Qi) for the production of homogeneous and mechanically robust core-shell capsules. Following the identification of suitable alginate and inner calcium chloride concentrations, the flow-rate ratio became the main process variable governing capsule formation, as it determines the relative volumes of the core and shell, influences shell thickness and affects the stability of the coaxial flow during encapsulation. Although several Qe/Qi ratios have been reported in the literature, their performance depends strongly on the physicochemical properties of each encapsulation system. Therefore, rather than adopting published conditions directly, we evaluated two literature-based ratios (4:1 and 6:1) to determine which provided the best performance under our synthesis conditions.",
            ],
          },
          {
            paragraphs: [
              "Core-shell capsules were synthesised using the optimal alginate and inner calcium chloride concentrations identified in the previous screening. The selected Qe/Qi ratios were tested by proportionally varying both the inner and outer flow rates while maintaining all remaining synthesis parameters constant. Because preliminary attempts to visualise the alginate shell using conventional photographs and optical microscopy were unsuccessful, magnetite particles were incorporated into the alginate solution to increase contrast. Consequently, all capsules evaluated in this experiment were synthesised with magnetite-labelled alginate, enabling the shell boundaries to be clearly distinguished during microscopic observation.",
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
              "Following synthesis, the resulting core-shell capsules were frozen with liquid nitrogen, cut in two, and imaged under an optical microscope to evaluate shell continuity, overall morphology and the presence of defects such as deformation, rupture or incomplete shell formation. Micrographs were subsequently analysed using ImageJ to measure shell thickness, to allow for a quantitative comparison between the different outer-to-inner flow-rate ratios. The most promising conditions would then be selected for mechanical resistance testing.",
              "The expected outcome was to determine the outer-to-inner flow-rate ratio that consistently produced reproducible core-shell capsules with a uniform shell thickness, well-defined morphology and sufficient mechanical integrity. These conditions would subsequently be used for the remaining preservation and characterisation experiments.",
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
              "The aim of this experiment was to evaluate the containment capacity of the optimised core-shell capsules by determining whether encapsulated particulate material was retained during capsule synthesis and subsequent storage. As the encapsulation platform is intended to immobilise engineered Pseudomonas putida, demonstrating effective cargo retention was an essential validation step before introducing biological material.",
              "Magnetite nanoparticles (50–100 nm in diameter; Sigma-Aldrich 637106) were selected as a surrogate cargo because they provide both a visible tracer and a characteristic absorbance profile that can be monitored by UV–Vis spectroscopy. Although substantially smaller than P. putida cells (approximately 0.5–1.0 µm in diameter and 1.5–5 µm in length), successful retention of the nanoparticles represents a conservative assessment of capsule containment, as particles significantly smaller than bacterial cells are more likely to escape through structural defects.",
            ],
          },
          {
            paragraphs: [
              "Three capsule formulations were prepared using the optimised encapsulation conditions (Qe/Qi = XXX:1): control capsules without magnetite, capsules containing magnetite in the calcium chloride core, and capsules containing magnetite dispersed in the alginate shell. Although localisation within the core more closely resembles the intended encapsulation of the bacterial suspension, preliminary observations suggested that the limited core volume would provide insufficient visual contrast and that maintaining magnetite nanoparticles homogeneously suspended in the calcium chloride solution throughout the encapsulation process would be difficult because of particle sedimentation inside the syringe. Consequently, magnetite dispersed in the alginate shell was included as an alternative formulation expected to provide a more homogeneous particle distribution and facilitate both visualisation and quantitative leakage measurements. Control capsules without magnetite were included to account for the intrinsic absorbance of the encapsulation system, allowing the spectra of magnetite-containing samples to be baseline-corrected prior to analysis. All three formulations were therefore characterised to compare their containment performance.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  ["Alginate concentration", "Constant", "3.5% (w/v)"],
                  ["Inner CaCl₂ concentration", "Constant", "0.5% (w/v)"],
                  ["Qe/Qi ratio", "Constant", "XXX:1"],
                  ["Capsule formulation", "Variable", "No magnetite; magnetite in the core; magnetite in the alginate shell"],
                  ["Storage medium", "Constant", "Distilled water"],
                  ["Spectral range", "Constant", "200–1000 nm"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "Capsules were synthesised on Day 0, and the calcium chloride crosslinking bath was collected immediately after encapsulation. The capsules were subsequently transferred to distilled water for storage. On Day 1, UV–Vis spectra (200–1000 nm) were acquired from the recovered calcium chloride bath to evaluate particle loss during synthesis, from the distilled water to assess leakage during storage, and from a phosphate-buffered saline (PBS) solution in which the same capsules were deliberately dissolved after completion of the preservation study to determine the total amount of magnetite remaining inside the capsules. A second measurement of the storage water was performed on Day 3 (three days after synthesis) to evaluate whether additional particle leakage occurred during prolonged storage.",
              "Absorbance measurements were performed using an XXX spectrophotometer with quartz cuvettes, as the spectral region of interest was located in the ultraviolet range, where conventional plastic cuvettes exhibit significant background absorbance that could interfere with the analysis. Full spectra between 200 and 1000 nm were recorded for each sample. The corresponding medium (calcium chloride solution, distilled water or PBS) was used as the instrumental blank for each measurement. Subsequently, spectra obtained from control capsules without magnetite were subtracted from those of magnetite-containing capsules to correct for the intrinsic absorbance of the alginate matrix (XXX nm), allowing the characteristic absorbance band of magnetite (XXX nm) to be analysed independently.",
              "The expected outcome was that negligible magnetite would be detected in the calcium chloride bath and storage medium, whereas the highest absorbance would be observed after dissolution of the capsules in PBS, indicating that the encapsulated material remained effectively retained until intentional degradation of the alginate matrix. This would demonstrate that the optimised core-shell architecture provides effective physical containment throughout synthesis and storage, supporting its suitability for the encapsulation of engineered bacteria.",
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
              "The aim of this experiment was to compare the mechanical resistance of the optimised core-shell capsule formulations and identify the configuration best suited for handling, transport and operation inside the bioreactor. Besides maintaining a well-defined morphology, the capsules must withstand external loads without collapsing or undergoing permanent deformation.",
            ],
          },
          {
            paragraphs: [
              "Core-shell capsules produced under the selected encapsulation conditions were subjected to increasing compressive loads by placing calibrated masses (1, 2, 5, 10 and 20 g) on a microscope coverslip resting on groups of three capsules. Each mass was applied independently, and after every loading step the capsules were photographed before removing the weight and replacing it with the next mass. All measurements were performed under identical experimental conditions.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  [
                    "Capsule formulation",
                    "Variable",
                    "Same flow-rate ratios as the outer-to-inner flow-rate ratio experiment",
                  ],
                  ["Applied mass", "Variable", "1, 2, 5, 10 and 20 g"],
                  ["Loading procedure", "Constant", "Sequential application of individual masses"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "The photographs obtained after each loading step were analysed to quantify capsule deformation and determine the maximum load each formulation could withstand without structural failure.",
              "The expected outcome was to identify the core-shell formulation that best resisted compressive loading while best preserving its geometry and shell integrity. This information would support the selection of the most mechanically robust capsule design for subsequent biological experiments and integration into the modular bioreactor.",
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
              "The aim of this experiment was to investigate the chemical factors responsible for the degradation of alginate core-shell capsules observed during the initial preservation studies. While previous experiments showed that PBS compromised capsule integrity, it remained unclear whether this effect resulted from the presence of sodium ions, phosphate ions, ionic strength or pH. Previous reports suggest that sodium ions promote calcium-sodium ion exchange within alginate hydrogels, potentially destabilising the crosslinked network. This experiment was therefore designed to determine which of these chemical factors was primarily responsible for capsule degradation.",
            ],
          },
          {
            paragraphs: [
              "Core-shell capsules synthesised under the optimal encapsulation conditions were incubated in three groups of media: serial dilutions of phosphate-buffered saline (PBS; 1×, 1/2×, 1/4× and 1/8×), an equivalent sodium-free phosphate buffer with the same ionic strength and matching dilutions, and distilled water adjusted to different pH values (1.73, 3.00, 5.00 and 5.78). All remaining synthesis and storage conditions were kept constant throughout the study.",
            ],
            pairedResource: {
              kind: "table",
              table: {
                headers: ["Parameter", "Status", "Value"],
                rows: [
                  ["Storage medium", "Variable", "PBS, sodium-free phosphate buffer, pH-adjusted distilled water"],
                  ["PBS concentration", "Variable", "1×, 1/2×, 1/4× and 1/8×"],
                  ["Sodium-free phosphate buffer (PBS equivalent ionic strength)", "Variable", "1×, 1/2×, 1/4× and 1/8×"],
                  ["Water pH", "Variable", "1.73, 3.00, 5.00 and 5.78"],
                  ["Capsule formulation", "Constant", "Optimized parameters"],
                ],
              },
            },
          },
          {
            paragraphs: [
              "Capsule integrity was monitored by photographing the capsules after 0, 24, 48 and 72 h, and 1 week of incubation, allowing qualitative comparison of the progression of degradation under each chemical environment.",
              "The expected outcome was to determine whether alginate degradation was primarily driven by sodium ions, phosphate ions, ionic strength or pH. Identifying the main degradation mechanism would guide the selection of preservation media compatible with long-term capsule integrity and subsequent biological experiments.",
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
      "With a validated configuration in hand, the encapsulation platform was characterised further by TGA-DSC and SEM, to establish its thermal behaviour, water content and microstructure ahead of integration with the biological module.",
    experiments: [
      {
        id: "tga-dsc",
        tabLabel: "TGA-DSC",
        title: "Thermal characterisation (TGA-DSC)",
        description: "Content not yet available in the source record.",
      },
      {
        id: "sem",
        tabLabel: "SEM",
        title: "Microstructural characterisation (SEM)",
        description: "Content not yet available in the source record.",
      },
    ],
  },
];
