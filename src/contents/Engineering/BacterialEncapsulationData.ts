/**
 * Bacterial encapsulation content for the Engineering page — transcribed straight
 * from the team's own Notion write-up (the "Engineering / Bacterial encapsulation"
 * page, exported 18 October 2026). The export's wording, emphasis,
 * tables and figures are reproduced as they stand; the only thing left
 * out is the team's internal planning notes, and the one thing added is
 * a real link wherever the text points at another page of the wiki.
 *
 * Generated from that export rather than edited by hand, so a later
 * revision of the page can be brought over the same way.
 */

import {
  cell,
  headCell,
  p,
  phase,
  table,
  ul,
  type Iteration,
} from "./dbtlData";

export const BACTERIAL_ENCAPSULATION_ITERATIONS: Iteration[] = [
  {
    title: "Establishing a reproducible alginate bead system",
    phases: [
      phase("Design", [
        p(
          "Before engineered bacteria could be incorporated into the rePhlow biological module, a reproducible method for immobilising material within a calcium-crosslinked alginate matrix first needed to be established.",
        ),
        p(
          "Conventional alginate beads were initially selected as the starting architecture. Compared with a core-shell system, bead formation requires a simpler configuration in which a single drop of alginate is dispensed into a calcium chloride bath. This provided a controlled system in which the main variables governing droplet formation and calcium-mediated gelation could be investigated before introducing the additional complexity of simultaneous coaxial flows.",
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
          "Alginate beads were produced by dispensing sodium alginate solution dropwise into a calcium chloride crosslinking bath. The alginate solution was loaded into a plastic syringe and delivered using a single-syringe infusion pump through Luer tubing, with the tip of the outlet held at a fixed height above the bath using a stand and clamp.",
        ),
        p("The experimental setup consisted of:"),
        table(
          ["Component", "Function", "Specification"],
          [
            [
              cell("Sodium alginate"),
              cell("Hydrogel-forming polymer"),
              cell("Sodium alginate from brown algae (Sigma-Aldrich)"),
            ],
            [
              cell("Calcium chloride solution"),
              cell("Ionic crosslinking bath"),
              cell(
                "Anhydrous CaCl₂ (Acros Organics), 5% (w/v) in distilled water",
              ),
            ],
            [
              cell("Infusion pump"),
              cell("Controlled liquid delivery"),
              cell(
                "KDS 200 Series dual-syringe pump, KD Scientific, with a single syringe rail loaded",
              ),
            ],
            [
              cell("Outlet/nozzle"),
              cell("Droplet formation"),
              cell("Coaxial injector, DMF-C01, Doxa Microfluidics"),
            ],
            [cell("Tubing"), cell("Fluid connection"), cell("Luer tubing")],
            [
              cell("Plastic syringe"),
              cell("Alginate reservoir"),
              cell("10 mL"),
            ],
            [
              cell("Beaker"),
              cell("Crosslinking bath container"),
              cell("50 mL"),
            ],
            [
              cell("Stand and clamp"),
              cell("Fixing the drop height"),
              cell("-"),
            ],
            [cell("Magnetic stirrer"), cell("Bath agitation"), cell("-")],
            [cell("Strainer"), cell("Bead recovery"), cell("-")],
          ],
        ),
        p(
          "The effects of alginate concentration, drop height, flow rate and crosslinking time were evaluated sequentially. Alginate concentration and drop height were first screened together, and the selected conditions were then carried forward to the evaluation of flow rate and, finally, crosslinking time. All other parameters were kept constant within each experiment to allow the effect of the variable under investigation to be evaluated.",
        ),
        table(
          [
            "Experiment",
            "Alginate (% w/v)",
            "Drop height (cm)",
            "Flow rate (μL/min)",
            "Crosslinking time (min)",
          ],
          [
            [
              cell("Alginate concentration × drop height"),
              cell("2, 2.5, 3, 3.5"),
              cell("1, 2, 3, 4, 5"),
              cell("600"),
              cell("30"),
            ],
            [
              cell("Flow rate"),
              cell("3.5"),
              cell("3"),
              cell("400, 500, 600, 700, 800, 1600, 3200"),
              cell("30"),
            ],
            [
              cell("Crosslinking time"),
              cell("3.5"),
              cell("3"),
              cell("600"),
              cell("10, 20, 30, 40, 60, 90"),
            ],
          ],
        ),
      ]),
      phase("Test", [
        p(
          "The resulting beads were analysed to determine how the selected variables affected their morphology and reproducibility. Images were acquired using a digital microscope, equipped with a high-definition colour CMOS sensor and a high-speed digital signal processor (DSP), and analysed using ImageJ.",
        ),
        p(
          "For all three experiments, 10 beads were measured per condition, using the Image-taking and Image-analysis protocols found in the Protocols page. Droplet formation at the outlet was also observed directly during production.",
        ),
        p("The following parameters were quantified:"),
        ul([
          "Size descriptors: projected area, perimeter, equivalent diameter, and maximum and minimum Feret diameters;",
          "Shape descriptors: sphericity.",
        ]),
        p(
          "Size descriptors were used to compare bead dimensions between conditions, while sphericity was used to assess their shape. The variability of each parameter within a condition was used as an indicator of reproducibility. Beads were also visually inspected for deformation, irregular morphology and loss of structural integrity during handling and after crosslinking.",
        ),
        p(
          "Bead size was similar across all combinations of alginate concentration and drop height, with no condition producing substantially smaller beads than the others. Differences between conditions were instead observed in bead shape and reproducibility. 3.5% (w/v) alginate produced the most spherical and most consistent beads, and this behaviour was maintained across all drop heights tested. Lower alginate concentrations produced less regular beads, with greater variability in shape between individual beads and a stronger dependence on drop height, particularly at 2% (w/v). Drop height had a measurable effect, but on elongation rather than on outline regularity, and only below 3.5% (w/v). At 2.5 and 3% (w/v), beads were at their most spherical and most consistent at an intermediate drop height of 3 cm and became more elongated at both extremes, whereas at 3.5% (w/v) every height produced equally spherical beads.",
        ),
        p(
          "Stable dripping was maintained across the full range of flow rates tested, up to 3200 μL/min, and no transition to jetting was observed. Increasing the flow rate raised the rate of bead production and produced a small increase in bead size, from an equivalent diameter of 3.50 mm at 400 μL/min to 3.71 mm at 3200 μL/min, most of it at the two ends of the range. Bead shape did not deteriorate as the flow rate increased; it was instead poorest at the lowest flow rate tested, where several beads detached elongated rather than spherical, with far greater variability in shape between individual beads than in any other condition. From 500 μL/min upwards, all conditions produced regular and reproducible beads.",
        ),
        p(
          "Crosslinking time had little effect on bead shape. Bead size remained broadly constant for crosslinking times up to 60 min, while the longest crosslinking time tested (90 min) produced slightly smaller beads, consistent with contraction of the alginate network during prolonged exposure to calcium. Detailed measurements are reported on the [Results](/results) page.",
        ),
      ]),
      phase("Learn", [
        p(
          "This first iteration established a reproducible protocol for bead production and allowed us to identify suitable synthesis conditions.",
        ),
        p(
          "The selected conditions were 3.5% (w/v) alginate, a 3 cm drop height, a flow rate of 600 μL/min and a crosslinking time of 30 min. 3.5% (w/v) alginate was selected because it produced the most spherical and reproducible beads, and because its behaviour was largely insensitive to drop height, making the process more robust to small variations in setup. A drop height of 3 cm was selected because it was the optimum wherever drop height had a consistent effect: at 2.5 and 3% (w/v) the beads were most spherical and most consistent at that height and more elongated at both extremes, and at 3.5% (w/v) it remained the best value even though the difference had become small.",
        ),
        p(
          "Flow rate turned out to constrain the protocol only from below. The constraint was not the risk of jetting at high rates, as initially assumed, but unreliable detachment at the slowest rate tested, which made 400 μL/min unusable. Everything above it was equally acceptable on shape grounds, so the choice fell to secondary criteria: bead size, which increased slightly with flow rate and therefore favoured the lower end, and a working pace that allowed a batch to be produced without a long wait. 600 μL/min satisfied both and was therefore retained.",
        ),
        p(
          "Since crosslinking time had little effect on bead morphology, and the longest time tested caused slight contraction of the beads, a crosslinking time of 30 min, within the range commonly used in the literature, was retained. Although smaller beads would theoretically have been advantageous because of their higher surface-to-volume ratio and the intended immobilisation of enzymes on the bead surface, neither alginate concentration nor drop height produced differences in bead size large enough for this criterion to become decisive.",
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
          "Two storage environments of particular relevance to the project were selected. Industrial wastewater was included because it represents the intended application environment of the encapsulation system. PBS was selected as a phosphate-containing medium of well-defined composition and high sodium content. This was relevant because the industrial wastewater used in the project was highly acidic and would therefore require pH adjustment before engineered bacteria could be exposed to it. Because this adjustment would involve the addition of sodium hydroxide, the resulting increase in sodium ion concentration was considered potentially relevant to the stability of the calcium-crosslinked alginate network.",
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
        p(
          "Alginate beads were synthesised using the optimised production conditions identified in the previous iteration (3.5% (w/v) alginate, 5% (w/v) CaCl₂ bath, 3 cm drop height, 600 μL/min flow rate and 30 min crosslinking time).",
        ),
        p(
          "Following synthesis, the beads were transferred to three different storage environments:",
        ),
        ul([
          "water;",
          "industrial wastewater;",
          "PBS, prepared according to the formulation described on the Protocols page.",
        ]),
        p(
          "For each storage medium, 10 beads were placed in a container with 8 mL of the corresponding medium and stored at room temperature.",
        ),
        p(
          "The beads were maintained in their respective media and photographed at 0, 24, 48 and 72 h, and again after one week. In PBS no beads remained intact by 72 h, so the one-week point applies to water and industrial wastewater only.",
        ),
      ]),
      phase("Test", [
        p(
          "Bead preservation was evaluated by acquiring images at each time point, following the same image-taking and image-analysis protocols used in the previous iteration. The images were analysed using ImageJ to quantify:",
        ),
        ul([
          "Size descriptors: projected area, perimeter, equivalent diameter, and maximum and minimum Feret diameters;",
          "Shape descriptors: sphericity.",
        ]),
        p(
          "Size descriptors were used to monitor swelling or shrinkage over time, while shape descriptors were used to detect deformation. Beads were also visually inspected for loss of structural integrity, such as dissolution or breakage. The evolution of bead morphology was compared between the different storage media.",
        ),
        p(
          "The beads stored in industrial wastewater did not break or dissolve during storage, but they became more fragile, took on the brown colour of the wastewater and underwent clear shrinkage during the first day, after which they remained approximately constant in size until the end of the week.",
        ),
        p(
          "In contrast, the beads stored in PBS showed a pronounced loss of structural integrity. During the first day of storage they swelled markedly and became less regular in shape. Thereafter they progressively dissolved, and some broke in half during storage or handling. By 48 h, approximately half of the beads could no longer be measured, and by 72 h none remained sufficiently intact for analysis. Beyond the first day the measurements no longer described whole beads, since a bead that had broken was recorded as two smaller ones, so PBS is reported qualitatively rather than as a size series. Overall, PBS resulted in a clear failure of bead preservation compared with water and industrial wastewater. Measurements for the other two media are reported on the [Results](/results) page.",
        ),
      ]),
      phase("Learn", [
        p(
          "This preliminary study indicated that the storage environment could substantially affect the preservation of calcium-crosslinked alginate structures. In particular, the pronounced loss of structural integrity observed in PBS indicated that preservation could represent a relevant engineering constraint for the encapsulation system.",
        ),
        p(
          "However, the media differed simultaneously in several properties, including ionic composition, ionic strength and pH, so the specific cause of the observed behaviour could not be determined from this comparison alone. What the experiment did provide was a shortlist: sodium content, ionic strength and pH each needed to be isolated and tested separately. This was especially relevant because the final application would involve acidic industrial wastewater and potential pH adjustment with sodium-containing reagents.",
        ),
        p(
          "The study therefore served to define the chemical variables that would later be investigated in a more controlled preservation experiment using core-shell capsules, rather than to establish a mechanism of alginate degradation.",
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
          "This transition introduced a new set of engineering challenges. Unlike conventional beads, which are formed from a single alginate-containing liquid phase, core-shell production requires the simultaneous delivery of two liquid phases and the formation of a stable interface between them. Therefore the process depends on the interaction between the flows of the two phases, the diffusion of calcium into the alginate and the timing of interfacial gelation relative to capsule detachment.",
        ),
        p(
          "Because the alginate and calcium chloride now come into contact at the outlet of the coaxial injector, rather than only in the external bath, there was a risk of the alginate crosslinking at the injector tip before the drop could detach. For this reason, 3% (w/v) alginate was selected as the outer phase instead of the 3.5% (w/v) concentration optimised for beads, as a higher polymer concentration and viscosity were expected to hinder drop detachment and increase this risk. An internal calcium chloride concentration of 2% (w/v) was selected as an initial value for this preliminary test. It was hypothesised that these conditions would provide sufficient alginate for shell formation, while allowing the internal calcium chloride solution to initiate crosslinking at the interface. The remaining synthesis parameters (external bath concentration, drop height, outer flow rate and crosslinking time) were transferred directly from the optimised bead system, and the inner flow rate was set to 200 μL/min, giving an outer-to-inner flow-rate ratio of 3:1.",
        ),
      ]),
      phase("Build", [
        p(
          "The core-shell system was assembled using two infusion pumps to independently control the inner and outer phases.",
        ),
        p("The system consisted of:"),
        ul([
          "an inner calcium chloride solution;",
          "an outer sodium alginate solution;",
          "two infusion pumps (KDS 200 and Fisherbrand KDS 100);",
          "a coaxial injector (DMF-C01, Doxa Microfluidics) and connecting tubing;",
          "an external calcium chloride crosslinking bath.",
        ]),
        p(
          "The outer alginate phase and inner calcium chloride phase were delivered simultaneously through the coaxial needle. The initial synthesis parameters were:",
        ),
        table(
          ["Parameter", "Value"],
          [
            [cell("Alginate concentration"), cell("3% (w/v)")],
            [cell("Inner calcium chloride concentration"), cell("2% (w/v)")],
            [cell("Calcium chloride bath concentration"), cell("5% (w/v)")],
            [cell("Outer flow rate, Q_e"), cell("600 μL/min")],
            [cell("Inner flow rate, Q_i"), cell("200 μL/min")],
            [cell("Q_e/Q_i ratio"), cell("3:1")],
            [cell("Drop height"), cell("3 cm")],
            [cell("Crosslinking time"), cell("30 min")],
          ],
        ),
      ]),
      phase("Test", [
        p(
          "Capsule formation was monitored visually at the outlet of the coaxial injector and during collection in the external calcium chloride bath.",
        ),
        p(
          "Rather than producing discrete core-shell capsules through a controlled dripping process, the alginate gelled and accumulated at the tip of the injector, partially obstructing the outlet. As a result, the drops could no longer detach individually, and the liquid left the injector as a continuous stream (jetting). The same outer flow rate had produced stable dripping in the single-phase bead system, so the transition to jetting was attributable to the coaxial configuration rather than to the flow rate itself. Consequently, no discrete core-shell capsules could be obtained under these initial conditions.",
        ),
      ]),
      phase("Learn", [
        p(
          "The initial conditions selected from the conventional bead system could not be directly transferred to the core-shell architecture. The formation of core-shell capsules involves the simultaneous interaction of two liquid phases and the formation of an alginate shell at the interface with the calcium chloride core. Consequently, the balance between flow, interfacial gelation and capsule detachment becomes critical.",
        ),
        p(
          "We hypothesised that the observed jetting resulted from the rapid diffusion of Ca²⁺ from the concentrated internal calcium chloride phase into the surrounding alginate solution. The high calcium chloride concentration may have caused rapid ionic crosslinking of the alginate at the interface before the forming structure could detach from the coaxial needle. As a result, the alginate accumulated at the needle tip instead of forming discrete core-shell capsules.",
        ),
        p(
          "This result identified the composition of the two phases, particularly the internal calcium chloride concentration, as a potentially critical variable governing the balance between calcium diffusion, interfacial gelation and capsule detachment.",
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
          "The initial core-shell synthesis showed that the conditions tested in the previous iteration did not provide a suitable balance between calcium diffusion, interfacial gelation and capsule detachment. The resulting jetting indicated that the composition of the inner and outer phases needed to be investigated before further optimisation of the flow conditions.",
        ),
        p(
          "The objective of this iteration was therefore to identify combinations of outer alginate and inner calcium chloride concentrations capable of producing stable core-shell capsules.",
        ),
        p(
          "It was hypothesised that the concentrations of both phases would jointly affect the rate and extent of interfacial gelation. The internal calcium chloride concentration was expected to influence the availability of Ca²⁺ for alginate crosslinking, while the alginate concentration was expected to affect the amount of polymer available to form the shell and the viscosity of the outer phase. Their interaction was therefore expected to determine whether the system produced controlled dripping, jetting or other irregular structures.",
        ),
        p(
          "The outer-to-inner flow-rate ratio was initially maintained at 3:1, while a concentration range was screened to identify conditions that produced stable and discrete core-shell capsules before proceeding to the optimisation of other process variables.",
        ),
      ]),
      phase("Build", [
        p("The following concentrations were evaluated:"),
        table(
          ["Parameter", "", "Conditions tested"],
          [
            [
              cell("Alginate concentration"),
              cell("Variable"),
              cell("**2, 2.5, 3 and 3.5% (w/v)**"),
            ],
            [
              cell("Internal calcium chloride concentration"),
              cell("Variable"),
              cell("**0, 0.5, 1, 1.5 and 2% (w/v)**\\*"),
            ],
            [
              cell("External calcium chloride bath"),
              cell("Constant"),
              cell("**5% (w/v)**"),
            ],
            [
              cell("Outer flow rate, Q_e"),
              cell("Constant"),
              cell("**600 μL/min**"),
            ],
            [
              cell("Inner flow rate, Q_i"),
              cell("Constant"),
              cell("**200 μL/min**"),
            ],
            [
              cell("Outer-to-inner flow-rate ratio, Q_e/Q_i"),
              cell("Constant"),
              cell("**3:1**"),
            ],
            [cell("Drop height"), cell("Constant"), cell("3 cm")],
            [cell("Crosslinking time"), cell("Constant"), cell("30 min")],
          ],
        ),
        p(
          "\\*Not all internal calcium chloride concentrations were tested: if a certain calcium chloride concentration produced jetting for a certain alginate concentration, no higher calcium chloride concentrations were tested for said alginate concentration.",
        ),
      ]),
      phase("Test", [
        p(
          "The formation of the capsules was monitored under each concentration combination and classified as either stable dripping or jetting. The following table was used to answer the question “Was jetting observed under this condition?”, with three possible outcomes:",
        ),
        ul([
          "Yes: jetting was observed",
          "No: jetting was not observed (stable dripping)",
          "n/t: not tested",
        ]),
        /* A cross-tabulation, not a flat list: the five columns are the
           internal calcium chloride concentration under one shared title,
           and the four rows the alginate concentration under another. The
           two header rows and the row-label column below say exactly that,
           the way the source table does — see headCell and
           TableBlock.headers. */
        table(
          [
            ["", "", "Calcium chloride concentration (% w/v)", "", "", "", ""],
            ["", "", "0", "0.5", "1", "1.5", "2"],
          ],
          [
            [
              headCell("Alginate concentration (% w/v)", 4),
              headCell("2"),
              cell("No"),
              cell("No"),
              cell("No"),
              cell("No"),
              cell("Yes"),
            ],
            [
              headCell("2.5"),
              cell("No"),
              cell("No"),
              cell("Yes"),
              cell("n/t"),
              cell("n/t"),
            ],
            [
              headCell("3"),
              cell("No"),
              cell("No"),
              cell("Yes"),
              cell("n/t"),
              cell("n/t"),
            ],
            [
              headCell("3.5"),
              cell("No"),
              cell("No"),
              cell("Yes"),
              cell("n/t"),
              cell("n/t"),
            ],
          ],
        ),
      ]),
      phase("Learn", [
        p(
          "The screening demonstrated that core-shell formation depended on the combination of alginate and internal calcium chloride concentrations. The observed transition from stable dripping to jetting supported the hypothesis that the balance between calcium diffusion and interfacial alginate crosslinking was critical for capsule formation.",
        ),
        p(
          "At the tested flow conditions, internal calcium chloride concentrations of up to 1.5% (w/v) did not result in jetting when combined with 2% (w/v) alginate. However, at higher alginate concentrations, internal calcium chloride concentrations above 0.5% (w/v) were associated with jetting in the conditions tested.",
        ),
        p(
          "The results indicated that the two phases could not be optimised independently, as the effect of the internal calcium chloride concentration depended on the alginate concentration. Although stable dripping was observed for the 2% (w/v) alginate conditions across the tested calcium chloride concentrations (except for 2%), these conditions were not carried forward because they had previously resulted in less reproducible bead formation. The same reasoning was applied to discard the 2.5% (w/v) alginate concentration. Therefore, **3% and 3.5% (w/v) alginate were selected for subsequent experiments, with 0.5% (w/v) internal calcium chloride selected as the highest tested concentration compatible with stable dripping under these conditions**.",
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
          "The ratio of outer to inner flow rate determines the relative volumetric contribution of the alginate and calcium chloride phases and therefore the relative volumes of shell and core. It was expected to affect shell thickness, capsule geometry and the stability of the coaxial flow.",
        ),
        p(
          "The 3:1 ratio used during the composition screening had been chosen only as a fixed reference for comparing concentrations, and was not considered an optimised value. Ratios of 4:1 and 6:1 were therefore selected for comparison based on values reported in the literature, as a larger proportion of the outer phase was expected to produce thicker and more robust shells. Rather than directly adopting a published ratio, both were evaluated under our synthesis conditions.",
        ),
        p(
          "A ratio fixes the proportion between the two phases but says nothing about how fast they are delivered. Each ratio was therefore tested at two outer flow rates, so that the effect of the proportion could be told apart from the effect of the speed at which the capsules were formed, and at both alginate concentrations carried forward from the previous iteration.",
        ),
        p(
          "600 μL/min was the value established for bead production and was kept as the upper level. The lower level was chosen because slower drop formation gives the two streams more time to arrange themselves before the drop detaches, which could allow the inner phase to settle more symmetrically within the surrounding alginate and produce a more consistently formed shell. Halving the flow was therefore a way of testing whether the architecture benefits from a slower process.",
        ),
        p(
          "The exact value was then set by the inner line. At 6:1, an outer flow of 300 μL/min corresponds to an inner flow of 50 μL/min, which we considered too slow to reduce further. Going above 600 μL/min was not considered useful, since the bead experiments had shown that drop size increases with flow rate and the drop now has to accommodate a liquid core as well as its shell.",
        ),
        p(
          "The aim of this iteration was therefore to compare the two flow-rate ratios under the selected operating conditions and determine whether their effects on shell morphology and thickness could be reliably distinguished.",
        ),
      ]),
      phase("Build", [
        p(
          "Core-shell capsules were synthesised using the coaxial injector and pump setup described in Iteration 3, with the concentration conditions carried forward from the previous iteration. The alginate concentration was either 3% or 3.5% (w/v), while the internal calcium chloride concentration was maintained at 0.5% (w/v).",
        ),
        p(
          "Two outer-to-inner flow-rate ratios were tested: 4:1 and 6:1. Each ratio was evaluated at two outer flow rates (600 and 300 μL/min), with the inner flow rate adjusted proportionally to maintain the desired ratio. The four flow-rate combinations below were tested for both alginate concentrations.",
        ),
        table(
          ["Q_e (μL/min)", "Q_i (μL/min)", "Q_e/Q_i"],
          [
            [cell("600"), cell("150"), cell("4:1")],
            [cell("600"), cell("100"), cell("6:1")],
            [cell("300"), cell("75"), cell("4:1")],
            [cell("300"), cell("50"), cell("6:1")],
          ],
        ),
        p(
          "All remaining synthesis parameters were kept constant (5% (w/v) external calcium chloride bath, 3 cm drop height and 30 min crosslinking time). 10 core-shells were produced per condition.",
        ),
        p(
          "The capsules were then prepared for imaging following the core-shell image-taking protocol found in the Protocols page. Each capsule was frozen in liquid nitrogen and approximately bisected with a scalpel, and both halves were placed on a microscope slide and covered with a coverslip without applying pressure.",
        ),
      ]),
      phase("Test", [
        p(
          "The bisected capsules were imaged using a NATIONAL GEOGRAPHIC 40×–1024× transmitted and incident light microscope (Bresser GmbH, Germany), equipped with a USB digital eyepiece, with images viewed in the MicrOcular VGA software. The images were intended to be analysed using ImageJ to evaluate shell continuity and morphology, and to measure shell thickness.",
        ),
        p(
          "All eight conditions produced discrete core-shell capsules, with stable dripping maintained at both outer flow rates and no return of the behaviour observed in Iteration 3. However, the contrast between the liquid core and the alginate shell was insufficient to reliably visualise the shell or distinguish the two regions. Consequently, the images did not provide a sufficiently robust basis for comparing shell morphology or thickness between the tested flow-rate ratios.",
        ),
      ]),
      phase("Learn", [
        p(
          "The initial microscopy-based visualisation was insufficient to reliably distinguish the alginate shell from the liquid core, and therefore could not be used to quantify shell thickness. Consequently, the effect of the outer-to-inner flow-rate ratio could not be assessed through shell morphology or thickness as initially planned.",
        ),
        p(
          "However, this did not indicate that either flow-rate ratio was unsuitable. The limitation lay in the measurement method rather than in the capsules themselves: core and shell could not be reliably distinguished because the shell was not sufficiently visible.",
        ),
        p(
          "The two ratios, 4:1 and 6:1, were therefore retained as candidate configurations for subsequent comparison. A new visualisation strategy was required to increase the contrast between the alginate shell and the liquid core. This led to the incorporation of magnetite into the alginate phase as a visual marker, with the aim of enabling the shell to be visualised and its thickness to be measured reliably in the next iteration.",
        ),
      ]),
    ],
  },
  {
    title: "Improving core-shell visualisation through magnetite incorporation",
    phases: [
      phase("Design", [
        p(
          "Following the inability to reliably distinguish the shell from the liquid core, magnetite particles were incorporated into the encapsulation system as a contrast-enhancing agent. Because the limited volume of the liquid core did not provide sufficient visual contrast, and because maintaining magnetite particles suspended in the inner solution was difficult, magnetite was incorporated into the alginate phase to act as a visual marker for the shell. This approach also avoided the problem of particles settling and remaining in the syringe rather than being consistently delivered into the core.",
        ),
        p(
          "The objective of this iteration was to determine whether magnetite incorporation provided a sufficiently reliable method for visualising and comparing the shell structures produced under the two candidate flow-rate ratios, 4:1 and 6:1, through shell-thickness measurements.",
        ),
      ]),
      phase("Build", [
        p(
          "Core-shell capsules were synthesised under the same eight conditions as in the previous iteration (3% and 3.5% (w/v) alginate, 4:1 and 6:1 flow-rate ratios, 600 and 300 μL/min outer flow rates), with magnetite powder (Aldrich) incorporated into the alginate phase to act as a visual marker for the outer shell.",
        ),
        p(
          "Magnetite was added to the alginate solution. As the magnetite did not disperse completely, its final concentration in solution could not be determined precisely. However, increasing the amount of magnetite added resulted in a visibly darker alginate phase, providing a qualitative indication of increased magnetite incorporation.",
        ),
        p(
          "The capsules were then frozen, bisected and mounted following the same preparation described in the previous iteration.",
        ),
      ]),
      phase("Test", [
        p(
          "The capsules were imaged and the images analysed using ImageJ to measure shell thickness. Ten capsules were analysed per condition (six for 3.5% (w/v) alginate at 300/75 μL/min), with ten thickness measurements per capsule, five on each half.",
        ),
        p(
          "The incorporation of magnetite into the alginate phase provided sufficient contrast to distinguish the shell from the liquid core.",
        ),
        p(
          "However, substantial variability was observed in the measured shell thicknesses, both between different points of the same capsule and between capsules produced under the same conditions. This variability was greater than expected and did not reveal a clear or consistent difference between the two flow-rate ratios. Detailed measurements are reported on the [Results](/results) page.",
        ),
      ]),
      phase("Learn", [
        p(
          "The magnetite-based visualisation strategy successfully solved the visualisation problem identified in the previous iteration, allowing the alginate shell to be distinguished from the liquid core. However, the resulting shell-thickness measurements showed substantial variability, preventing a reliable distinction between the tested flow-rate ratios.",
        ),
        p(
          "A large part of this variability was attributed to the measurement process. The shell boundary was not always sharply defined in the microscopy images, and identifying the exact points between which the shell thickness should be measured introduced a degree of subjectivity. In addition, small differences in the position and orientation of the capsules during imaging, as well as in how centrally each capsule was bisected, could affect the apparent thickness measured from a two-dimensional image. As the capsules were not always cut exactly through their centre, the resulting cross-sections could differ between samples. However, variability between capsules produced under the same conditions was also observed, so a contribution from the production process itself could not be ruled out.",
        ),
        p(
          "One comparison did survive the variability. Although thickness could not distinguish the two ratios, capsules produced at 300 μL/min showed a narrower spread in mean shell thickness between capsules of the same condition than those produced at 600 μL/min in three of the four comparisons. This was consistent with the expectation that slower drop formation allows the architecture to form more consistently, although the difference concerned reproducibility between capsules rather than the shells themselves, and the outer flow rate remained to be decided on other criteria.",
        ),
        p(
          "Consequently, the observed variation in shell thickness was too large to reliably determine whether the tested outer-to-inner flow-rate ratios produced different shells. Shell thickness alone could therefore not serve as a criterion for selecting the optimal ratio, and a functional criterion was required instead, which led to the mechanical testing of the following iteration. Refining the imaging and measurement method could improve the reliability of shell-thickness quantification and remains a direction for future work.",
        ),
      ]),
    ],
  },
  {
    title: "Mechanical resistance of core-shell capsules",
    phases: [
      phase("Design", [
        p(
          "The previous iteration solved the visualisation problem but not the selection problem: shell thickness varied too much to distinguish the 4:1 and 6:1 ratios, so both remained candidates and a different criterion was needed.",
        ),
        p(
          "Mechanical resistance was chosen as that criterion. Shell thickness matters to the extent that it determines how well a capsule withstands force, so measuring resistance directly avoided relying on a measurement that had already proved imprecise, and it is sensitive to an uneven shell in a way an average thickness is not. It is also a requirement in its own right, since the capsules must survive handling and the weight of those packed above them in the bioreactor.",
        ),
        p(
          "One further decision shaped the experiment. Capsules will not be loaded into a reactor on the day they are made, and the bead preservation study had shown that alginate structures change over days in a surrounding medium. Testing only freshly made capsules risked selecting a configuration on a property it would not retain, so capsules were tested both on the day of synthesis and after a week in water.",
        ),
        p(
          "The 6:1 ratio was expected to perform better, since a higher proportion of outer phase delivers more alginate per capsule. No difference was expected between the two outer flow rates, as these change how fast capsules are produced rather than what each one contains. Both alginate concentrations were retained, as no earlier iteration had given grounds for discarding either.",
        ),
      ]),
      phase("Build", [
        p(
          "Core-shell capsules were synthesised using the coaxial setup described in Iteration 3, under the same eight conditions evaluated in the two previous iterations: 3% and 3.5% (w/v) alginate, outer-to-inner flow-rate ratios of 4:1 and 6:1, and outer flow rates of 600 and 300 μL/min. The internal calcium chloride concentration was maintained at 0.5% (w/v), and the external bath concentration, drop height and crosslinking time were unchanged.",
        ),
        p(
          "Two batches were produced. The first was tested on the day of synthesis, and the second was kept in distilled water at room temperature for one week before being tested under identical conditions.",
        ),
        p(
          "For each condition in each batch, capsules were arranged in groups of three on a flat surface and covered with a microscope coverslip. Three groups were tested per condition, giving nine capsules per condition and batch.",
        ),
        p(
          "Calibrated masses of 1, 2, 5, 10 and 20 g were then placed sequentially on top of the coverslip, each one removed before the next was added. Since the coverslip itself rests on the capsules, its mass (0.4 g) was included in every load, giving applied loads of 0.4, 1.4, 2.4, 5.4, 10.4 and 20.4 g. The capsules were photographed before any load was applied and again after each loading step, following the image-taking protocol found in the Protocols page.",
        ),
      ]),
      phase("Test", [
        p(
          "Images were analysed in ImageJ to follow the response of the capsules to the applied loads and to record any deformation, rupture or leakage. Deformation was quantified as the fraction of each condition's own unloaded sphericity retained at each load, and the mechanical response was then compared between flow-rate ratios, alginate concentrations, outer flow rates and batches.",
        ),
        p(
          "No capsule ruptured or leaked at any load, in either batch, so the comparison rested on progressive deformation rather than on failure.",
        ),
        p(
          "The ratio separated cleanly: every 6:1 condition outperformed its 4:1 counterpart except in two cases where the difference was within the variability between capsules. The outer flow rate did not separate the conditions in the same way, and the stored batch performed better than the fresh one rather than worse. Detailed measurements and the full ranking are reported on the [Results](/results) page.",
        ),
      ]),
      phase("Learn", [
        p(
          "Mechanical resistance supplied the decision that shell thickness could not. The 6:1 ratio was selected, together with 3.5% (w/v) alginate, which resisted deformation better than 3% (w/v) in five of the eight comparisons.",
        ),
        p(
          "With the ratio settled on mechanical grounds, the outer flow rate had to be settled on other grounds. The two rates were equivalent at 3% (w/v), while at 3.5% (w/v) the slower rate retained more shape. 600 μL/min was nevertheless adopted: it gave the lowest variability of any freshly made condition and produces capsules at twice the rate, which matters for filling a reactor. The stronger 300 μL/min condition was also the most variable of the fresh conditions, so the margin it offered could not be relied on.",
        ),
        p(
          "Testing the stored batch changed how the result is read. Rather than weakening, capsules became more resistant after a week in water in six of the eight conditions, although storage time and batch could not be formally separated, so the configuration was not selected on a property that decays before use, and the freshly made values are the conservative case.",
        ),
        p(
          "Water, however, is not the environment the capsules will operate in. The selected configuration was therefore carried into the preservation study, where the chemical composition of the medium was addressed directly.",
        ),
      ]),
    ],
  },
  {
    title: "Core-shell preservation under different chemical environments",
    phases: [
      phase("Design", [
        p(
          "The preliminary study with beads had shown that PBS degraded calcium-crosslinked alginate, but it could not say why: the media compared there differed at once in ionic composition, ionic strength and pH. Understanding this was now necessary rather than merely interesting, because the industrial wastewater the capsules must operate in is strongly acidic and would have to be neutralised before engineered bacteria could be exposed to it, and the obvious reagent for that, sodium hydroxide, would add precisely the sodium whose effect was still in question.",
        ),
        p(
          "The objective of this iteration was therefore to separate those factors and identify a storage composition the capsules could tolerate. Core-shell capsules were therefore exposed to:",
        ),
        ul([
          "water adjusted with HCl to different pH values, isolating pH;",
          "PBS at different dilutions, varying phosphate, sodium and ionic strength together;",
          "a sodium-free phosphate buffer at matching ionic strengths, in which sodium was replaced by potassium;",
          "industrial wastewater, untreated and basified with three different bases (NaOH, KOH or NH₄OH), separating pH from the reagent used to raise it.",
        ]),
        p(
          "This design allowed pH and sodium to be isolated from the other factors, rather than attributing the degradation previously observed to a single cause.",
        ),
        p(
          "It was expected that low pH would cause contraction rather than damage, since protonating the carboxylate groups of alginate reduces the electrostatic repulsion that keeps the network swollen. Degradation in PBS was expected to be driven by sodium competing with calcium for those same carboxylates, which would predict a clear difference between the two buffer series and, for the same reason, worse preservation in wastewater basified with NaOH than with KOH or NH₄OH.",
        ),
      ]),
      phase("Build", [
        p(
          "Core-shell capsules were synthesised using the internal calcium chloride concentration established in the composition screening and the alginate concentration and outer-to-inner flow-rate ratio selected in the previous iteration, with all other synthesis parameters unchanged.",
        ),
        p("Capsules were distributed among the following media:"),
        ul([
          "distilled water adjusted with HCl to pH 1.73, 3.00 and 5.00, plus untreated distilled water (pH 5.78);",
          "PBS at 1×, ½×, ¼× and ⅛×, prepared according to the formulation on the Protocols page;",
          "a sodium-free phosphate buffer at the same four dilutions, prepared to match the ionic strength of each PBS dilution;",
          "industrial wastewater as received (pH 1.76) and basified to pH 5 with NaOH, KOH or NH₄OH.",
        ]),
        p(
          "Protocols for PBS and the sodium-free buffer can be found in the Protocols page.",
        ),
        p(
          "As in the bead preservation study, 10 capsules were placed in a container with 8 mL of the corresponding medium. All samples were kept at room temperature and photographed at 0, 24, 48 and 72 h, following the same imaging schedule used for the bead preservation study so that the two architectures could be compared. Capsules in untreated wastewater were also imaged after one week; the pH series was not imaged beyond 72 h, because capsules at the lowest pH values had become too fragile to handle and the comparison between pH values would have been lost. Basified wastewater dissolved or broke the capsules even earlier, so they were imaged until it was no longer posible ([see Results](/results)).",
        ),
      ]),
      phase("Test", [
        p(
          "Images were analysed in ImageJ following the image-analysis protocol found in the Protocols page, monitoring changes in capsule morphology, shell integrity, swelling, deformation and overall structural preservation over time. Projected area was used to follow swelling and contraction, sphericity to detect deformation, and visual inspection to record fragmentation or dissolution.",
        ),
        p(
          "pH alone did not compromise capsule integrity. Capsules held at the lowest pH contracted progressively over the three days monitored, while those at pH 3, 5 and 5.78 swelled moderately over the first days. All retained their shape, and none broke during the first three days, although with longer exposure those at the lowest pH values became too fragile to handle.",
        ),
        p(
          "The two phosphate buffers behaved identically to each other at every dilution. At 1×, ½× and ¼×, capsules in both PBS and the sodium-free buffer broke down so rapidly that they could no longer be imaged after the first day. At ⅛×, capsules in both swelled during the first day and remained mostly intact over the three days monitored; those in PBS held that size, while those in the sodium-free buffer continued to swell.",
        ),
        p(
          "All capsules stored in wastewater, whether untreated or basified, took on its brown colour within the first day. Those in untreated wastewater contracted and then remained constant, and although they did not break or dissolve during storage, they became noticeably more fragile than capsules stored in distilled water and some broke while being handled for imaging. The basified (pH 5) wastewaters were far more damaging. With NaOH and KOH, capsules lost their regular shape within the first day and progressively fragmented over the following days. With NH₄OH, they degraded most severely of all, losing their spherical shape entirely and disintegrating into a soft, paste-like mass. Detailed measurements are reported on the [Results](/results) page.",
        ),
      ]),
      phase("Learn", [
        p(
          "Separating the media did part of what the bead study could not: it cleared pH and sodium as specific causes, although it could not single out phosphate from ionic strength.",
        ),
        p(
          "pH was cleared first. Across the range tested, from 1.73 to 5.78, no capsule broke during the first three days. Low pH contracted the capsules, consistent with protonation of the alginate carboxylate groups reducing the repulsion that keeps the network expanded, but contraction is not damage. Prolonged exposure to the lowest pH values did make the capsules fragile, so strongly acidic media weaken the network over time, but acidity was not the cause of the rapid breakdown seen in PBS.",
        ),
        p(
          "Sodium was cleared next, and this was the result that overturned our expectation. The sodium-free buffer, prepared to match the ionic strength of each PBS dilution, behaved like PBS at every dilution, so the degradation is not specific to sodium. This does not rule out ion exchange altogether: the sodium-free buffer contains potassium instead, another monovalent cation able to compete with calcium for the carboxylates. The wastewater series pointed the same way, with NaOH, KOH and NH₄OH all causing severe damage.",
        ),
        p(
          "The breakdown in the buffers was concentration-dependent, with a threshold between ¼× and ⅛×, above which the capsules broke down and below which they merely swelled. Because diluting the buffer lowers phosphate and ionic strength together, the dilution series cannot tell sequestration of calcium by phosphate apart from exchange with monovalent cations.",
        ),
        p(
          "Two practical consequences followed. The capsules tolerate the untreated industrial wastewater, contracting and becoming more fragile but remaining intact for a week, so the fragility is a handling constraint rather than a storage failure. This does not show that the phosphate the wastewater carries is harmless, since at pH 1.76 it is largely protonated and its concentration was not measured. Raising the pH of the wastewater, by contrast, destroyed the capsules regardless of the base used, even though they tolerate the same pH in water, so neutralising the wastewater before the capsules are introduced is not a viable route and the pH adjustment originally planned had to be reconsidered. Distilled water remained the storage medium of choice, which the mechanical results had already shown to be harmless.",
        ),
      ]),
    ],
  },
  {
    title: "Assessing core-shell containment through magnetite tracking",
    phases: [
      phase("Design", [
        p(
          "Following the development of a magnetite-based method for visualising the alginate shell, magnetite was further used as a tracer to assess particle retention and potential leakage from the core-shell capsules. Before engineered bacteria could be placed inside them, it had to be shown that the capsules hold on to what is put in them, both during synthesis, while the capsule is still forming in the calcium bath, and during storage. Magnetite is well suited to this, as it absorbs broadly across the ultraviolet and visible range and can therefore be quantified by UV-Vis in whatever medium surrounds the capsules, and at 50 to 100 nm it is considerably smaller than the bacteria it stands in for, so if retention is governed by the pore size of the network, magnetite is a conservative surrogate.",
        ),
        p(
          "Placing the magnetite in the core was expected to be the harder configuration to load, since the particles tend to settle and could remain in the syringe rather than being carried into the core during capsule formation, as had already been observed when magnetite was first introduced. Core-containing capsules were nevertheless prepared alongside capsules with magnetite in the alginate phase and capsules without magnetite, the latter providing the baseline for the absorbance of the capsule material itself.",
        ),
        p(
          "The aim of this experiment was to determine whether magnetite was released during capsule synthesis or storage and to quantify the total magnetite associated with the capsules after their dissolution. The synthesis bath and the storage water address the first question, while dissolving capsules in PBS addresses the second and provides the positive control the experiment requires: without it, an absence of signal elsewhere would be ambiguous, since it could mean either that nothing escaped or that the method cannot detect magnetite at all.",
        ),
        p(
          "It was expected that little or no magnetite would be found in the bath or the storage water, and that a clear signal would appear only after dissolution, demonstrating that the core-shell architecture retains its contents until it is deliberately destroyed.",
        ),
      ]),
      phase("Build", [
        p(
          "Core-shell capsules were synthesised using the internal calcium chloride concentration established in the composition screening and the alginate concentration and flow-rate ratio selected in the mechanical resistance iteration. Three configurations were prepared in parallel, differing only in where the magnetite was placed:",
        ),
        ul([
          "capsules without magnetite, as the baseline;",
          "capsules with magnetite (Aldrich, 50 to 100 nm) in the inner calcium chloride solution;",
          "capsules with magnetite dispersed in the alginate phase.",
        ]),
        p(
          "Capsules were synthesised on Day 0 and the calcium chloride crosslinking bath was collected immediately afterwards and retained. The capsules were then transferred to distilled water for storage at room temperature.",
        ),
        p("The following samples were analysed:"),
        ul([
          "the calcium chloride synthesis bath;",
          "the storage water on Day 1;",
          "the storage water on Day 3;",
          "PBS in which capsules were dissolved.",
        ]),
        p(
          "Capsules were not placed in PBS immediately after synthesis. Instead, capsules were taken from the storage water on Day 3 and transferred to PBS, so that the dissolution sample reflected capsules that had already undergone the storage period.",
        ),
        p(
          "Absorbance spectra were recorded from 200 to 1000 nm using a GENESYS 10S UV–Vis spectrophotometer (Thermo Scientific) with quartz cuvettes, as the measurement extended into the ultraviolet, where conventional plastic cuvettes absorb strongly. The corresponding medium (calcium chloride solution, distilled water or PBS) was used as the instrumental blank in each case. A magnetite suspension and a diluted magnetite suspension were also measured as references.",
        ),
      ]),
      phase("Test", [
        p(
          "For each medium, the spectrum of the corresponding control without magnetite was subtracted from those of the magnetite-containing samples, and the mean absorbance difference between 450 and 600 nm was used as the indicator of magnetite present. The visible region was chosen because the control spectra showed that the capsule material absorbs almost entirely below approximately 250 nm, so its contribution there is negligible, while magnetite absorbs broadly and almost featurelessly across the whole range measured.",
        ),
        p(
          "No magnetite was detected in the storage water on either Day 1 or Day 3, for either configuration: the absorbance of the magnetite-containing samples was equal to or marginally below that of the control. The calcium chloride bath collected after synthesis showed only a very small positive difference, identical for both configurations and close to the noise level of the measurement.",
        ),
        p(
          "After dissolution in PBS, capsules containing magnetite in the alginate phase produced a clear absorbance increase across the whole visible range. Capsules containing magnetite in the core produced no detectable signal. The diluted magnetite reference suspension could not be distinguished from the blank. Detailed measurements are reported on the [Results](/results) page.",
        ),
      ]),
      phase("Learn", [
        p(
          "The shell configuration answered the question it was designed to answer. Magnetite incorporated into the alginate phase stayed there: nothing appeared in the storage water after one or three days, the synthesis bath showed only a difference close to the noise of the measurement, and a clear signal appeared only once the capsules were deliberately dissolved. The shell therefore retains the particles embedded in it through both synthesis and storage. If that retention is governed by pore size, particles far smaller than a bacterial cell not escaping even from the shell is a conservative indication of containment; but the particles may instead be held by adsorption to the alginate, and only a tracer loaded into the core can test whether material held there crosses the shell.",
        ),
        p(
          "The core configuration did not. No signal appeared even after dissolution, which means the capsules never carried a detectable amount of magnetite rather than that they lost it, consistent with the particles settling in the syringe as anticipated. For this configuration the absence of signal in the bath and storage water therefore says nothing about containment, since there was nothing there to contain.",
        ),
        p(
          "Two limitations bound how far the positive result can be taken. The diluted magnetite reference could not be distinguished from the blank, so the method has a detection limit above which leakage would have to rise before it registered, and very small losses cannot be excluded. Each sample was also measured once, so the measurements carry no internal estimate of their own variability.",
        ),
        p(
          "The obvious next step is therefore to repeat the experiment with the bacteria themselves rather than to look for a better tracer. The core configuration failed here because magnetite is dense and aggregates, settling out of the inner solution before it reaches the capsule, whereas bacterial cells are close to the density of water and remain suspended, so the loading problem does not carry over. Testing containment with capsules carrying engineered *P. putida* in the core, sampling the surrounding medium over time and plating it to detect viable cells, would measure the quantity the biosafety case actually depends on, which is whether engineered bacteria escape into the treated effluent.",
        ),
        p(
          "This was not done within the project for a practical reason rather than a scientific one. The encapsulation setup was installed in a physics laboratory, which has no biosafety containment, and the pumps, coaxial injector and associated equipment could not be easily relocated to a facility where engineered bacteria may be handled. Encapsulating live cells therefore requires either duplicating the setup in a suitable laboratory or establishing the necessary containment where it already stands, and this is the first thing we would arrange for a continuation of the work.",
        ),
        p("</aside>"),
      ]),
    ],
  },
];
