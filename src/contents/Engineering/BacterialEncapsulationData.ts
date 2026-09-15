/**
 * Real content for the "Bacterial encapsulation" Engineering tab —
 * Iterations 1-5, transcribed verbatim from the team's own write-up
 * (Notion export). Wording, bold emphasis and bracketed placeholders the
 * team flagged as still pending (`{{...}}`, shown in the source as a
 * red-highlighted "[XXX]"-style note) are kept exactly as written — see
 * dbtlData.ts for the `**bold**` / `{{pending}}` inline markup and the
 * `p`/`ul`/`table`/`cell`/`phase` block helpers reused here.
 *
 * Two small, deliberate normalisations (not content changes):
 * - The Notion export's KaTeX fallback text for inline flow-rate
 *   variables (e.g. "QeQ_eQe") is written here as the plain "Qₑ"/"Qᵢ"
 *   this document uses everywhere else it isn't inside an equation block.
 * - The composition-screening table (Iteration 4, Test) collapses its
 *   original two-row header (a merged "Calcium chloride concentration"
 *   heading over five concentration columns) into one header row, with a
 *   caption spelling out both axes — the data itself is unchanged.
 */

import { cell, p, phase, table, ul, type Iteration } from "./dbtlData";

export const BACTERIAL_ENCAPSULATION_ITERATIONS: Iteration[] = [
  {
    title: "Establishing a reproducible alginate bead system",
    phases: [
      phase("Design", [
        p(
          "Before engineered bacteria could be incorporated into the rePhlow biological module, a reproducible method for immobilising material within a calcium-crosslinked alginate matrix first needed to be established.",
        ),
        p(
          "Conventional alginate beads were initially selected as the starting architecture. Compared with a core-shell system, bead formation involves a simpler configuration in which a single alginate phase is dispensed into a calcium chloride bath. This provided a controlled system in which the main variables governing droplet formation and calcium-mediated gelation could be investigated before introducing the additional complexity of simultaneous coaxial flows.",
        ),
        p(
          "The objective of this iteration was therefore to establish a reproducible bead production protocol that generated approximately spherical structures with consistent dimensions, reproducible morphology and sufficient structural integrity to withstand handling and subsequent storage.",
        ),
        p(
          "The main variables hypothesised to influence bead formation were alginate concentration, drop height, flow rate and crosslinking time. Alginate concentration was expected to influence solution viscosity, droplet formation and the structural properties of the resulting hydrogel. Drop height was expected to affect the impact of the droplets on the calcium chloride bath and therefore their final shape. Flow rate was expected to influence droplet generation and size consistency, while crosslinking time was expected to affect the extent of calcium-mediated gelation and the resulting structural integrity.",
        ),
        p(
          "Because surface-bound enzymes were intended to be incorporated into the biological module, bead size was also considered from a surface-to-volume perspective. If the tested conditions produced substantial differences in bead size, smaller beads would have been preferable because their higher surface-to-volume ratio would provide more available surface area relative to the amount of encapsulated material. This could increase the amount of enzyme immobilised relative to the encapsulated volume and potentially improve the efficiency of surface-based enzymatic activity.",
        ),
        p(
          "The optimal conditions were therefore expected to produce beads combining spherical morphology, consistent dimensions and sufficient structural integrity. If substantial differences in size were observed between conditions, smaller beads would have been favoured, provided that this did not compromise morphology or reproducibility.",
        ),
        p(
          "Although conventional beads were not the architecture ultimately preferred for the biological module, they also represented a viable encapsulation strategy and were therefore retained as a potential contingency option if the more complex core-shell architecture proved difficult to implement.",
        ),
      ]),
      phase("Build", [
        p(
          "Alginate beads were produced by dispensing sodium alginate solution into a calcium chloride crosslinking bath. The alginate solution was loaded into a {{[XXX]}} syringe and delivered using an infusion pump ({{[model]}}) through {{[tubing/nozzle specification]}}.",
        ),
        p("The experimental setup consisted of:"),
        table(
          ["Component", "Function", "Specification"],
          [
            [cell("Sodium alginate"), cell("Hydrogel-forming polymer"), cell("{{[XXX]}}")],
            [cell("Calcium chloride solution"), cell("Ionic crosslinking bath"), cell("{{[XXX]}}")],
            [cell("Infusion pump"), cell("Controlled liquid delivery"), cell("{{[model]}}")],
            [cell("Plastic syringe"), cell("Alginate reservoir"), cell("{{[XXX mL]}}")],
            [cell("Tubing"), cell("Fluid connection"), cell("{{[XXX]}}")],
            [cell("Outlet/nozzle"), cell("Droplet formation"), cell("{{[XXX]}}")],
          ],
        ),
        p(
          "The effects of alginate concentration, drop height, flow rate and crosslinking time were evaluated. All other parameters were kept constant within each experiment to allow the effect of the variable under investigation to be evaluated.",
        ),
        p("{{[Insert exact ranges and experimental conditions tested.]}}"),
      ]),
      phase("Test", [
        p(
          "The resulting beads were analysed to determine how the selected variables affected their morphology and reproducibility. Images were acquired using a {{[modelo lupa]}} and analysed using ImageJ.",
        ),
        p(
          "10 beads were measured per condition, using the Image-taking and Image-analysis protocols found in the Protocols page.",
        ),
        p("The following parameters were quantified:"),
        ul(["projected area;", "perimeter;", "equivalent diameter;", "maximum Feret diameter;", "minimum Feret diameter."]),
        p(
          "These measurements were used to assess bead size, shape and reproducibility between structures produced under the different synthesis conditions. Beads were also visually inspected for deformation, irregular morphology and loss of structural integrity during handling and after crosslinking.",
        ),
        p("{{[Insert representative images and/or comparison of the measured parameters between conditions.]}}"),
      ]),
      phase("Learn", [
        p(
          "This first iteration established a reproducible protocol for bead production and allowed us to identify suitable synthesis conditions.",
        ),
        p(
          "The selected conditions were {{[XXX]}}. Although smaller beads would theoretically have been advantageous because of their higher surface-to-volume ratio and the intended immobilisation of enzymes on the bead surface, the tested conditions did not produce sufficiently substantial differences in bead size for this criterion to become decisive. The final selection was therefore based primarily on bead sphericity and reproducibility.",
        ),
        p(
          "At this stage, the beads were stored in water, and the effect of the surrounding chemical environment was not yet evaluated. However, the long-term preservation of calcium-crosslinked alginate structures had already been identified as a relevant question for the encapsulation platform. The ionic crosslinking responsible for alginate gel formation could potentially be affected by the chemical composition of the surrounding medium through processes such as ion exchange.",
        ),
        p(
          "A preliminary preservation study was therefore conducted in the following iteration to provide an initial indication of how different chemical environments could affect calcium-crosslinked alginate structures. Although this study was performed using conventional beads, its purpose was not to fully optimise bead storage conditions. Instead, it was used to identify relevant factors and guide the design of a subsequent preservation study using the core-shell architecture.",
        ),
        p(
          "At the same time, the bead system provided an important design insight. Conventional beads represented a viable encapsulation strategy and were therefore retained as a contingency option. However, they consisted of a single alginate matrix and did not provide the separate liquid core surrounded by an alginate shell that was considered preferable for the final biological module.",
        ),
        p(
          "This motivated a second line of development: transitioning from conventional beads to a core-shell architecture. Thus, the initial bead system led to two parallel lines of development: a preliminary investigation of the factors affecting alginate preservation, which would later inform the core-shell preservation study, and the transition towards a core-shell architecture as the preferred encapsulation design.",
        ),
      ]),
    ],
  },
  {
    title: "Bead preservation under different chemical environments",
    phases: [
      phase("Design", [
        p(
          "The first iteration established a reproducible method for producing calcium-crosslinked alginate beads. However, the long-term stability of these structures in different chemical environments remained to be evaluated.",
        ),
        p(
          "A preliminary preservation study was therefore designed as an initial assessment of whether the chemical environment could significantly affect the stability of calcium-crosslinked alginate structures and therefore require further investigation.",
        ),
        p(
          "Two storage environments of particular relevance to the project were selected. Industrial wastewater was included because it represents the intended application environment of the encapsulation system. PBS was selected because it represents a relevant medium for biological experiments. The industrial wastewater used in the project was highly acidic and would therefore require pH adjustment before engineered bacteria could be exposed to it. Because this adjustment would involve the addition of sodium hydroxide, the resulting increase in sodium ion concentration was considered potentially relevant to the stability of the calcium-crosslinked alginate network.",
        ),
        p(
          "In particular, sodium ions could potentially participate in ion exchange with calcium ions associated with the alginate matrix, potentially affecting the stability of the crosslinked hydrogel. This provided a specific reason to investigate the behaviour of alginate structures in PBS, while industrial wastewater provided a direct test of the intended application environment. Water was included as a reference storage medium.",
        ),
        p(
          "The purpose of this iteration was therefore not to fully optimise bead storage conditions or to identify the precise mechanism responsible for any degradation. Instead, the experiment was intended as a preliminary assessment of whether the chemical environment affected alginate preservation sufficiently to justify a more controlled investigation in the core-shell architecture.",
        ),
        p(
          "It was hypothesised that exposure to different chemical environments could affect bead morphology and structural integrity over time. If the surrounding medium had a substantial effect on the calcium-crosslinked alginate network, differences in swelling, deformation or progressive loss of structural integrity were expected to be observed between the storage conditions.",
        ),
      ]),
      phase("Build", [
        p("Alginate beads were synthesised using the optimised production conditions identified in the previous iteration."),
        p("Following synthesis, the beads were transferred to three different storage environments:"),
        ul(["water;", "industrial wastewater;", "PBS, prepared according to the formulation described on the Protocols page."]),
        p("{{[Insert exact composition of the industrial wastewater and PBS.]}}"),
        p("{{[Insert storage volume, number of beads per condition and storage temperature.]}}"),
        p("The beads were maintained in their respective media for {{[XXX]}} and monitored over time."),
      ]),
      phase("Test", [
        p("Bead preservation was evaluated by acquiring images at defined time points during storage. The images were analysed to monitor changes in:"),
        ul(["bead size;", "shape;", "swelling;", "deformation;", "structural integrity."]),
        p("The evolution of bead morphology was compared between the different storage media."),
        p("{{[Insert exact imaging time points.]}}"),
        p("{{[Insert representative images and quantitative measurements.]}}"),
        p(
          "The beads stored in water and industrial wastewater remained structurally stable for the duration of the experiment. The beads stored in industrial wastewater appeared somewhat more fragile during handling with tweezers when being removed for imaging, although no major structural degradation was observed during storage.",
        ),
        p(
          "In contrast, the beads stored in PBS showed a pronounced loss of structural integrity. Beads progressively dissolved, and some broke in half during storage and/or handling. Overall, PBS resulted in a clear failure of bead preservation compared with water and industrial wastewater.",
        ),
      ]),
      phase("Learn", [
        p(
          "This preliminary study indicated that the storage environment could substantially affect the preservation of calcium-crosslinked alginate structures. In particular, the pronounced loss of structural integrity observed in PBS indicated that preservation could represent a relevant engineering constraint for the encapsulation system.",
        ),
        p(
          "However, the media differed simultaneously in several properties, including ionic composition, ionic strength and pH. The specific cause of the observed behaviour could therefore not be determined from this preliminary comparison alone.",
        ),
        p(
          "The experiment nevertheless provided a useful basis for designing a more controlled preservation study using core-shell capsules. In particular, the potential contribution of sodium ions, ionic strength and pH was identified as requiring separate investigation. This was especially relevant because the final application would involve acidic industrial wastewater and potential pH adjustment with sodium-containing reagents.",
        ),
        p(
          "Thus, the results did not directly establish a mechanism of alginate degradation. Instead, they provided an initial indication that preservation was a relevant engineering constraint and helped define the chemical variables that would later be isolated and investigated in the core-shell system.",
        ),
        p(
          "Following this preliminary preservation study, the development of the preferred encapsulation architecture proceeded through the transition from conventional beads to core-shell capsules. The following iteration therefore addressed a different engineering challenge: adapting the established alginate crosslinking system to a coaxial configuration capable of producing a liquid core surrounded by an alginate shell.",
        ),
      ]),
    ],
  },
  {
    title: "Initial transition to core-shell capsules",
    phases: [
      phase("Design", [
        p(
          "Following the establishment of a reproducible bead system and a preliminary assessment of its preservation, the preferred encapsulation architecture was investigated. Although conventional beads remained a viable contingency option, a core-shell architecture was considered preferable for the final biological module because it provides a distinct liquid core surrounded by an alginate shell.",
        ),
        p(
          "The objective of this iteration was to determine whether the established alginate crosslinking system could be translated from conventional bead formation to a coaxial configuration capable of producing core-shell capsules.",
        ),
        p(
          "This transition introduced a new set of engineering challenges. Unlike conventional beads, which are formed from a single alginate-containing liquid phase, core-shell production requires the simultaneous delivery of two liquid phases and the formation of a stable interface between them. The process therefore depends on the interaction between the flow of the two phases, calcium diffusion into the alginate and the timing of interfacial gelation relative to capsule detachment. {{3??% alginate}} was selected as the outer phase and {{2% internal calcium chloride}} as the inner phase. It was hypothesised that these conditions would provide sufficient alginate for shell formation while allowing the internal calcium chloride solution to initiate crosslinking at the interface.\nThe expected outcome was the formation of discrete core-shell capsules through a controlled dripping process, with the alginate forming the outer shell around the liquid calcium chloride core.",
        ),
      ]),
      phase("Build", [
        p("The core-shell system was assembled using two infusion pumps to independently control the inner and outer phases."),
        p("The system consisted of:"),
        ul([
          "an inner calcium chloride solution;",
          "an outer sodium alginate solution;",
          "two independent infusion systems;",
          "a coaxial needle {{[modelo]}} provided by Doxa Microfluidics;",
          "an external calcium chloride crosslinking bath.",
        ]),
        p("The outer alginate phase and inner calcium chloride phase were delivered simultaneously through the coaxial needle. The initial synthesis parameters were:"),
        table(
          ["Parameter", "Value"],
          [
            [cell("Alginate concentration"), cell("3% (w/v)")],
            [cell("Inner calcium cloride concentration"), cell("2% (w/v)")],
            [cell("Calcium chloride bath concentration"), cell("5% (w/v)")],
            [cell("Outer flow rate, Qₑ"), cell("600 μL/min")],
            [cell("Inner flow rate, Qᵢ"), cell("200 μL/min")],
            [cell("Qₑ/Qᵢ ratio"), cell("3:1")],
            [cell("Drop height"), cell("3 cm")],
            [cell("Crosslinking time"), cell("30 min")],
          ],
        ),
      ]),
      phase("Test", [
        p(
          "The initial core-shell synthesis was performed using 3% alginate as the outer phase and 2% internal CaCl₂ as the core phase, with the two solutions simultaneously delivered through the coaxial needle.",
        ),
        p(
          "The formation process was monitored visually at the outlet of the coaxial needle and during collection in the external calcium chloride bath. Rather than producing discrete core-shell capsules through a controlled dripping process, the alginate phase accumulated at the tip of the needle and remained attached to the outlet, resulting in jetting. Consequently, stable and individual core-shell capsules could not be obtained under these initial conditions.",
        ),
        p("{{[Insert representative image/video of jetting and alginate accumulation at the coaxial needle tip.]}}"),
      ]),
      phase("Learn", [
        p(
          "The initial conditions selected from the conventional bead system could not be directly transferred to the core-shell architecture. The formation of core-shell capsules involves the simultaneous interaction of two liquid phases and the formation of an alginate shell at the interface with the calcium chloride core. Consequently, the balance between flow, interfacial gelation and capsule detachment becomes critical.",
        ),
        p(
          "We hypothesised that the observed jetting resulted from the rapid diffusion of Ca²⁺ from the concentrated internal calcium chloride phase into the surrounding alginate solution. The high calcium chloride concentration may have caused rapid ionic crosslinking of the alginate at the interface before the forming structure could detach from the coaxial needle. As a result, the alginate accumulated at the needle tip instead of forming discrete core-shell capsules.",
        ),
        p(
          "This result identified the composition of the two phases, particularly the internal calcium chloride concentration, as a potentially critical variable governing the balance between calcium diffusion, interfacial gelation and capsule detachment. It also demonstrated that conditions suitable for conventional bead formation could not simply be transferred to a coaxial system without considering the interaction between the two liquid phases.",
        ),
        p(
          "A systematic screening of the outer alginate and inner calcium chloride concentrations was therefore performed in the following iteration. This allowed the composition of the two phases to be evaluated as a coupled system and aimed to identify a concentration range in which interfacial gelation was sufficiently rapid to form a shell but sufficiently controlled to allow capsule detachment before the structure became fixed to the needle tip.",
        ),
      ]),
    ],
  },
  {
    title: "Screening the core-shell composition",
    phases: [
      phase("Design", [
        p(
          "The initial core-shell synthesis showed that the conditions transferred from the bead system did not provide a suitable balance between calcium diffusion, interfacial gelation and capsule detachment. The resulting jetting indicated that the composition of the inner and outer phases needed to be investigated before further optimisation of the flow conditions.",
        ),
        p("The objective of this iteration was therefore to identify combinations of outer alginate and inner calcium chloride concentrations capable of producing stable core-shell capsules."),
        p(
          "It was hypothesised that the concentrations of both phases would jointly affect the rate and extent of interfacial gelation. The internal calcium chloride concentration was expected to influence the availability of Ca²⁺ for alginate crosslinking, while the alginate concentration was expected to affect the amount of polymer available to form the shell and the viscosity of the outer phase. Their interaction was therefore expected to determine whether the system produced controlled dripping, jetting or other irregular structures.",
        ),
        p("The outer-to-inner flow-rate ratio was initially maintained at 3**:1**, while a concentration range was screened to identify conditions that produced stable and discrete core-shell capsules before proceeding to the optimisation of other process variables."),
      ]),
      phase("Build", [
        p("The following concentrations were evaluated:"),
        table(
          ["Parameter", "", "Conditions tested"],
          [
            [cell("Alginate concentration"), cell("Variable"), cell("**2, 2.5, 3 and 3.5% (w/v)**")],
            [cell("Internal calcium chloride concentration"), cell("Variable"), cell("**0, 0.5, 1, 1.5 and 2% (w/v)***")],
            [cell("External calcium chloride bath"), cell("Constant"), cell("**5% (w/v)**")],
            [cell("Outer flow rate, Qₑ"), cell("Constant"), cell("**600 μL/min**")],
            [cell("Inner flow rate, Qᵢ"), cell("Constant"), cell("**200 μL/min**")],
            [cell("Outer-to-inner flow-rate ratio, Qₑ/Qᵢ"), cell("Constant"), cell("**3:1**")],
            [cell("Drop height"), cell("Constant"), cell("3 cm")],
            [cell("Crosslinking time"), cell("Constant"), cell("30 min")],
          ],
        ),
        p("*Not all internal calcium chloride concentrarions were tested: if a certain calcium chloride concentration produced jetting for a certain alginate concentration, no higher calcium chloride concentrations were tested for said alginte concentration."),
      ]),
      phase("Test", [
        p(
          "The formation of the capsules was monitored under each concentration combination and classified as either stable dripping or jetting. The following table was used to answer the question “Was jetting observed under this condition?”, with three possible outcomes:",
        ),
        ul(["Yes: jetting was observed", "No: jetting was not observed (stable dripping)", "n/t: not tested"]),
        table(
          ["Alginate % (w/v)", "CaCl₂ 0%", "CaCl₂ 0.5%", "CaCl₂ 1%", "CaCl₂ 1.5%", "CaCl₂ 2%"],
          [
            [cell("2"), cell("No", "good"), cell("No", "good"), cell("No", "good"), cell("No", "good"), cell("Yes", "bad")],
            [cell("2.5"), cell("No", "good"), cell("No", "good"), cell("Yes", "bad"), cell("n/t"), cell("n/t")],
            [cell("3"), cell("No", "good"), cell("No", "good"), cell("Yes", "bad"), cell("n/t"), cell("n/t")],
            [cell("3.5"), cell("No", "good"), cell("No", "good"), cell("Yes", "bad"), cell("n/t"), cell("n/t")],
          ],
          "Was jetting observed under this alginate / internal-CaCl₂ combination?",
        ),
      ]),
      phase("Learn", [
        p(
          "The screening demonstrated that core-shell formation depended on the combination of alginate and internal calcium chloride concentrations. The observed transition from stable dripping to jetting supported the hypothesis that the balance between calcium diffusion and interfacial alginate crosslinking was critical for capsule formation.",
        ),
        p(
          "At the tested flow conditions, internal calcium chloride concentrations of up to **2% (w/v)** did not result in jetting when combined with **2% (w/v) alginate**. However, at higher alginate concentrations, internal calcium chloride concentrations above **0.5% (w/v)** were associated with jetting in the conditions tested. This supported the hypothesis that the balance between calcium diffusion and interfacial alginate crosslinking was critical for capsule formation.",
        ),
        p(
          "The results indicated that the two phases could not be optimised independently, as the effect of the internal calcium chloride concentration depended on the alginate concentration. Although stable dripping was observed for the 2% alginate conditions across the tested calcium chloride concentrations (except for 2%), these conditions were not carried forward because they had previously resulted in less reproducible bead formation. Therefore, **3% and 3.5% (w/v) alginate were selected for subsequent experiments, with 0.5% (w/v) internal calcium chloride selected as the maximum concentration compatible with stable dripping under these conditions**.",
        ),
        p(
          "These conditions provided a suitable basis for further optimisation of the encapsulation process. The next process variable selected for optimisation was the outer-to-inner flow-rate ratio, which was expected to affect the relative core and shell volumes, shell thickness, capsule geometry and the stability of the coaxial flow.",
        ),
      ]),
    ],
  },
  {
    title: "Optimising the outer-to-inner flow-rate ratio",
    phases: [
      phase("Design", [
        p(
          "Following the screening of the core-shell composition, the next process variable selected for optimisation was the outer-to-inner flow-rate ratio. The ratio was expected to influence the relative volumetric contribution of the alginate and calcium chloride phases and, consequently, the relative volumes of the alginate shell and liquid core. It could therefore affect shell thickness, capsule geometry and the stability of the coaxial flow.",
        ),
        p("Ratios of 4:1 and 6:1 were selected for comparison based on values reported in the literature. Rather than directly adopting a published ratio, both were evaluated under our synthesis conditions."),
        p(
          "To assess whether the effect of the ratio was consistent across different operating conditions, both ratios were tested using the two alginate concentrations carried forward from the previous iteration (3% and 3.5% (w/v)) and two external flow rates (600 and 300 μL/min). The inner flow rate was adjusted proportionally to maintain the desired outer-to-inner ratio.",
        ),
        p("The aim of this iteration was therefore to compare the two flow-rate ratios under the selected operating conditions and determine whether their effects on shell morphology and thickness could be reliably distinguished."),
      ]),
      phase("Build", [
        p("Core-shell capsules were synthesised using the concentration conditions carried forward from the previous iteration. The alginate concentration was either 3% or 3.5% (w/v), while the internal calcium chloride concentration was maintained at 0.5% (w/v)."),
        p("Two outer-to-inner flow-rate ratios were tested: 4:1 and 6:1. Each ratio was evaluated at two external flow rates (600 and 300 μL/min), with the inner flow rate adjusted proportionally to maintain the desired ratio. The four flow-rate combinations below were tested for both alginate concentrations."),
        table(
          ["Qₑ (μL/min)", "Qᵢ (μL/min)", "Qₑ/Qᵢ"],
          [
            [cell("600"), cell("150"), cell("4:1")],
            [cell("600"), cell("100"), cell("6:1")],
            [cell("300"), cell("75"), cell("4:1")],
            [cell("300"), cell("50"), cell("6:1")],
          ],
        ),
        p("All remaining synthesis parameters were kept constant at 3 cm drop height and 30 min crosslinking time."),
        p("10 core-shells were produced per condition."),
      ]),
      phase("Test", [
        p(
          "The resulting core-shell capsules were prepared for imaging following the core-shell image-taking protocol. This procedure consisted of freezing the core-shell capsules using liquid nitrogen and approximately bisecting them with a scalpel. Both halves were then placed on a microscope slide and covered with a coverslip without applying pressure. The microscope used was {{[MODELO]}}",
        ),
        p("However, the contrast between the liquid core and the alginate shell was insufficient to reliably visualise the shell or distinguish the two regions. Consequently, the images did not provide a sufficiently robust basis for comparing shell morphology or thickness between the tested flow-rate ratios."),
        p("{{[Insert representative images showing the insufficient contrast.]}}"),
        p("The two flow-rate ratios were therefore retained as candidate configurations for subsequent comparison, but a more effective method for visualising the alginate shell was required before their structural differences could be assessed reliably."),
      ]),
      phase("Learn", [
        p("The initial microscopy-based visualisation was insufficient to reliably distinguish the alginate shell from the liquid core, let alone quantify its thickness. Consequently, the effect of the outer-to-inner flow-rate ratio could not be assessed using shell morphology or thickness as initially planned."),
        p("However, this did not indicate that either flow-rate ratio was unsuitable. Instead, the limitation was the measurement method: core and shell could not be reliably distinguished because the shell was not sufficiently visible."),
        p(
          "The two ratios, 4:1 and 6:1, were therefore retained as candidate configurations for subsequent comparison. A new visualisation strategy was required to increase the contrast between the alginate shell and the liquid core. This led to the incorporation of magnetite into the alginate phase as a visual marker, with the aim of enabling the shell to be visualised and its thickness to be measured reliably in the next iteration.",
        ),
      ]),
    ],
  },
];
