/**
 * Genetic engineering content for the Engineering page — transcribed straight
 * from the team's own Notion write-up (the "Engineering / Genetic engineering"
 * page, exported 19 October 2026). The export's wording, emphasis,
 * tables and figures are reproduced as they stand; the only thing left
 * out is the team's internal planning notes, and the one thing added is
 * a real link wherever the text points at another page of the wiki.
 *
 * Generated from that export rather than edited by hand, so a later
 * revision of the page can be brought over the same way.
 */

import { cell, figure, p, phase, table, ul, type Iteration } from "./dbtlData";

export const CLONING_ITERATIONS: Iteration[] = [
  {
    title: "Polyphosphate accumulation study",
    phases: [
      phase("Design", [
        p(
          "Before engineering *Pseudomonas putida* KT2440 to accumulate more phosphorus, we needed to answer a more basic question: **under which conditions does the wild-type strain retain phosphorus in the first place, and how do we measure that retention reliably?** RePhlow is meant to run on a real industrial context, the phosphorus-rich aqueous streams produced during biofuel manufacture, so the useful question was not simply whether *P. putida* can store polyphosphate, but **which operating conditions promote retention** and **whether we could quantify intracellular phosphorus reproducibly enough to compare strains and conditions later**.",
        ),
        p("The technical problem had two parts."),
        p(
          "1. **There was no validated in-house assay** for intracellular phosphorus: without one, any later comparison between wild-type and engineered strains would rest on an uncalibrated measurement and would be impossible to interpret. 2. **The operating window was undefined**: we did not know how medium composition, pH and dilution, the variables that a real stream would actually present, influenced how much phosphorus the cells retained. Optimising a strain before understanding the conditions in which it must perform would have meant improving a phenotype we could neither reproduce nor read out.",
        ),
        p(
          "Our working hypothesis was that **polyphosphate accumulation behaves as a nutrient-stress response**: when nutrients are scarce, cells that can store phosphorus as polyphosphate do so, whereas under nutrient abundance they have little reason to, a behaviour that also underpins microbial phosphorus removal from wastewaters",
        ),
        p(
          "From this we predicted a clear ordering across media: **LB**, a rich medium, should give **minimal retention** because the bacterium sits in nutrient abundance; **M9**, a minimal medium, should give **maximal retention** because nutrient stress is greatest; and the **synthetic stream** that mimics the industrial feed should fall **in between**, as the application-relevant condition still to be characterised. Having established that ordering, we then planned to probe the two variables that **BioOils Huelva, our industrial reference, actually allows us to adjust**: **pH** and **degree of dilution** (dilution standing in for nutrient limitation, since a more dilute stream is a more nutrient-limited one). These two were chosen deliberately because they are the levers available in the real process and are easy to set in the synthetic medium in the absence of a real sample.",
        ),
        p(
          "The **concrete objective** of this iteration was: **to build and standardise a reproducible assay of intracellular phosphorus, and to use it to map how medium, pH and dilution govern phosphorus retention by wild-type *P. putida* KT2440**, so that the resulting method and operating window could serve as the baseline against which engineered strains would later be benchmarked. The variables expected to matter were nutrient availability (medium), pH, degree of dilution, incubation time, and, for the assay itself, the quality of the standard curve and the reliability of the acid-hydrolysis and colourimetric steps. If the approach worked, we expected a **monotonic media trend (M9 above synthetic above LB)**, a **measurable effect of pH and dilution**, and, above all, an **assay reproducible enough to compare conditions and, later, strains**.",
        ),
      ]),
      phase("Build", [
        p(
          "We worked with two variants of *P. putida* KT2440, the **wild type (WT)** and an **mCherry-tagged variant (Cherry)**, the latter giving a visible, trackable strain for growth measurements. To define the assay window, we first characterised **bacterial growth (and decay) in M9**, following OD600 over 240 min, so that later phosphorus time courses could be read against a known biomass trajectory.",
        ),
        p(
          "The measurement itself was an **intracellular phosphorus assay following the method of Kyaw and colleagues**: cells sampled over a time course were lysed, their stored polyphosphate was released to orthophosphate by **acid hydrolysis**, and the free phosphate was quantified colourimetrically through **molybdate complexation and reduction**, read by absorbance at **830 nm** against a phosphate standard curve. Results were expressed as phosphate mass normalised to biomass (**mPi/OD600**), so that retention could be compared across conditions of differing cell density.",
        ),
        p(
          "With the assay in hand, we ran the experiment in two stages. **First**, a **media comparison**: cells were shifted into **M9** (the maximal-stress reference, our positive control), **LB** (the nutrient-rich reference, our negative control) and the **synthetic stream** (the application medium), and intracellular phosphorus was followed over 0 to 240 min. **Second**, once the trend was clear, a **combinatorial stress screen** in the synthetic stream crossing **two pH values with two dilutions**, keeping M9 and LB as controls:",
        ),
        table(
          ["**Condition**", "**pH**", "**Dilution**"],
          [
            [cell("A"), cell("6"), cell("1:1")],
            [cell("B"), cell("6"), cell("1:35")],
            [cell("C"), cell("7"), cell("1:1")],
            [cell("D"), cell("7"), cell("1:35")],
          ],
        ),
        p(
          "The **synthetic stream** was prepared to mimic a biofuel-derived industrial feed (citric acid, glycerol, soy lecithin, monopotassium phosphate as the phosphate source, ammonium sulfate, sodium chloride, filtered used vegetable oil and Tween 80, adjusted for pH), so that the operating window we mapped would be transferable to the real application rather than to an idealised laboratory medium.",
        ),
        p(
          "The assay did not work on the first attempts. Early phosphorus valuations produced **poor, non-linear standard curves** and time courses with implausible or negative values, so a substantial part of the build was spent **troubleshooting the assay itself**, correcting the standard-curve preparation, the sample dilutions entering the colourimetric step, and the handling of the hydrolysis, until the method returned internally consistent data.",
        ),
      ]),
      phase("Test", [
        p(
          "**Assay standardisation.** The first valuations failed our most basic criterion, a usable standard curve: the calibration points were erratic and did not support quantification. After the dilution and reagent corrections, later runs produced **interpretable standard curves and reproducible time courses**, which is what turned the assay from a source of noise into a usable comparison tool. This was the single most important outcome of the iteration, because every later comparison depends on it.",
        ),
        p(
          "**Growth in M9.** OD600 declined **approximately linearly** across the 240 min window (from about 0.84 to 0.62), confirming that the cells persist and remain measurable under minimal-medium stress, so phosphorus values could be sampled and normalised across the whole time course.",
        ),
        p(
          "**Media trend.** The normalised intracellular phosphorus (mPi/OD600) followed the predicted ordering: **highest in M9, lowest in LB, and intermediate in the synthetic stream**. The absolute values were noisy, as expected from an assay still being standardised, but the direction was consistent with polyphosphate accumulation as a nutrient-stress response:",
        ),
        table(
          [
            "**Medium**",
            "**Nutrient status**",
            "**Normalised retention (mPi/OD600)**",
            "**Role**",
          ],
          [
            [
              cell("M9"),
              cell("Minimal, maximal nutrient stress"),
              cell("Highest"),
              cell("Positive control, reference high-retention condition"),
            ],
            [
              cell("Synthetic stream"),
              cell("Intermediate, application-relevant"),
              cell("Intermediate"),
              cell("The condition to characterise and optimise"),
            ],
            [
              cell("LB"),
              cell("Rich, nutrient abundance"),
              cell("Lowest"),
              cell("Negative control, reference low-retention condition"),
            ],
          ],
        ),
        p(
          "**Combinatorial pH and dilution.** In the synthetic stream, **both pH and degree of dilution measurably affected retention**, and M9 again gave far higher normalised retention than any synthetic-stream condition, reinforcing its role as the high-retention reference. Among the four combinations, the **less diluted, mildly acidic condition (pH 6, 1:1)** tended to give the highest normalised retention and the **more diluted conditions the lowest**, but because dilution changes both the nutrient stress and the amount of phosphate available for uptake, the two effects are confounded and **the underlying relationship could not be resolved** from this screen. The honest read-out was therefore that the two variables matter, not yet how.",
        ),
      ]),
      phase("Learn", [
        table(
          ["**Observation**", "**Change introduced**", "**Real learning**"],
          [
            [
              cell(
                "Early phosphorus valuations gave non-linear standard curves and implausible values.",
              ),
              cell(
                "Corrected standard-curve preparation, sample dilutions and hydrolysis handling until the assay was internally consistent.",
              ),
              cell(
                "A phenotype is only as real as the assay that reads it; standardising the measurement was a prerequisite, not a detail.",
              ),
            ],
            [
              cell("Retention differed markedly between media."),
              cell(
                "Adopted M9 and LB as fixed high- and low-retention controls and the synthetic stream as the medium to optimise.",
              ),
              cell(
                "Nutrient stress drives phosphorus retention, which sets the logic for every later comparison.",
              ),
            ],
            [
              cell(
                "Both pH and dilution changed retention, but not in a separable way.",
              ),
              cell(
                "Recorded the effect as real but left the functional relationship open.",
              ),
              cell(
                "Dilution confounds nutrient stress with available phosphate, so the two must be decoupled in a future design.",
              ),
            ],
          ],
        ),
        p(
          'The most important result of this iteration was **not a single optimal condition but a working method and a defined operating window**. As we summarised it at the time, we did not yet have "results as such", but we did have a **standardised assay that lets us compare between strains and between medium conditions**, which is precisely what the rest of the project needs. This reframed the deliverable: the value of the summer was infrastructural, the assay and the operating map, rather than a finished optimisation.',
        ),
        p(
          "The media comparison **confirmed the design hypothesis**: phosphorus retention tracks nutrient stress, being maximal in M9, minimal in LB and intermediate in the synthetic stream. This is why M9 became the **reference condition for maximal retention** and the **positive control** in the intracellular phosphorus assay used throughout the genetic-engineering work, while the synthetic stream remains the **application-relevant medium** whose conditions we still need to optimise. The combinatorial screen then established a **second, more nuanced learning**: both pH and degree of dilution influence retention, but the form of the relationship is still open, because dilution simultaneously changes nutrient limitation and phosphate availability. Decoupling those two effects is a defined objective for the next round rather than an unexplained anomaly.",
        ),
        p(
          "Crucially, this iteration is what makes the engineering meaningful. Without a reproducible way to measure intracellular phosphorus and a known set of conditions under which the wild type retains it, there would be no baseline against which to ask the central question of the project, **whether the engineered knock-out and expression strains retain more phosphorus than the wild type**. Our design rule going into the cloning iterations therefore became: **fix the measurement and the operating conditions before changing the strain**, so that any later difference can be attributed to the genetics and not to an uncalibrated assay or an undefined medium. The next iterations turn from the phenotype and its conditions to building the strains themselves, beginning with the DNA that the whole cloning workflow depends on.",
        ),
      ]),
    ],
  },
  {
    title: "Establishing reliable DNA starting material",
    phases: [
      phase("Design", [
        p(
          "Our first cloning strategy assumed that the **plasmid stocks already available** in the laboratory thata where given to us by **VÍCTOR DE LORENZO’S LAB** last in summer 2025 could be used directly to **construct the *ppk1* and *pstSCAB*** expression plasmids. Before committing them to restriction digestion and ligation, we needed to determine whether this assumption was justified.",
        ),
        p(
          "The technical problem was **DNA quality**. The pSEVA2513 and pSEVA631 preparations remaining from the previous experimental period had been stored for an extended time, and their concentration and purity were unknown. Using them without qualification would introduce an uncontrolled variable at the very beginning of the workflow: if a digestion, ligation or transformation subsequently failed, we would not know whether the problem originated from the cloning design or from poor starting material.",
        ),
        p(
          "We therefore proposed a **first quality gate, based on agarose-gel behaviour, DNA concentration and NanoDrop purity ratios**, as our solution: we expected useful preparations to contain visible plasmid DNA, sufficient material for downstream digestion, and A260/A280 and A260/A230 ratios reasonably compatible with clean DNA. The logic was straightforward, restriction cloning is inherently consumptive, with DNA progressively lost during digestion, preparative electrophoresis and gel purification, while additional material is required for controls, repeated reactions and troubleshooting. We therefore treated recoverable DNA mass across the complete workflow, not concentration in the original tube alone, as the variable that mattered.",
        ),
        p(
          "The **concrete objective** of this iteration was: **to obtain clean, reproducible and sufficiently concentrated preparations of every plasmid** required for the cloning workflow, with enough total DNA to support preparative digestion, purification, ligation, controls and experimental repetition without the starting material itself becoming the limiting factor.",
        ),
        p(
          "The variables we approach were DNA purity, culture scale and total recoverable DNA mass. If the approach worked, we **expected final preparations to reach concentrations in the tens to hundreds of nanograms per microlitre, providing enough material to investigate the restriction and assembly steps independently.**",
        ),
      ]),
      phase("Build", [
        p(
          "We characterised the four available legacy pSEVA preparations **(two pSEVA2513, two pSEVA631) by agarose-gel electrophoresis and NanoDrop** **([see protocol](/experiments))**. Rather than selecting only the apparently best tube, we **retransformed *E. coli* DH5α** with all four preparations, allowing the bacteria **to amplify the plasmids biologically** and removing differences caused by long-term storage and previous extraction history. Fresh colonies were grown in selective liquid LB medium and processed by miniprep **([see protocol](/experiments))**.",
        ),
        p(
          "When several purified samples subsequently gave **unexpectedly low or undetectable DNA concentrations**, we traced the workflow backwards rather than immediately modifying restriction sites, ligation ratios or construct architecture. This identified a procedural error: **ethanol had not been added to the wash buffers** used in the miniprep and DNA-purification kits. The buffers were corrected and the preparations repeated.",
        ),
        p(
          "This resolved the purification error but exposed a **second limitation**: even with a functioning extraction workflow, DNA obtained from individual 3 mL miniprep cultures was rapidly consumed by the complete cloning process. We therefore **changed the scale of the experiment** rather than continuing to adapt every downstream reaction to scarce DNA, amplifying the relevant plasmids in **larger cultures and processing them by midiprep**: pSEVA2513, pSEVA631, the plasmid (pMK-RQ) carrying *ppk1*, the plasmid (pOK-RQ) carrying *pstSCAB*, and the carrier containing pEM7. Vector identities, cloning host and antibiotic selection were held constant throughout; the only **variable changed was the scale of biological starting material and resulting DNA yield.**",
        ),
      ]),
      phase("Test", [
        p(
          "The first characterisation of the legacy stocks showed that **they were not equivalent starting materials** ([see Results](/results)):",
        ),
        table(
          [
            "Sample",
            "Plasmid",
            "Concentration",
            "A260/A280",
            "A260/A230",
            "Interpretation",
          ],
          [
            [
              cell("A"),
              cell("pSEVA2513"),
              cell("22.05 ng/µL"),
              cell("1.480"),
              cell("0.493"),
              cell("Low purity"),
            ],
            [
              cell("B"),
              cell("pSEVA2513"),
              cell("14.40 ng/µL"),
              cell("1.574"),
              cell("0.718"),
              cell("Low concentration and low purity"),
            ],
            [
              cell("C"),
              cell("pSEVA631"),
              cell("20.10 ng/µL"),
              cell("1.500"),
              cell("0.561"),
              cell("Low purity"),
            ],
            [
              cell("D"),
              cell("pSEVA631"),
              cell("89.90 ng/µL"),
              cell("1.773"),
              cell("1.369"),
              cell("Best preparation, but still not fully pure"),
            ],
          ],
        ),
        p(
          "Sample D was clearly the strongest, but even this preparation showed an A260/A230 ratio below that expected for clean DNA, and the two pSEVA2513 preparations were particularly weak. The original stock set therefore failed our quality gate, and could not provide comparable, reliable starting material for two parallel cloning workflows.",
        ),
        p(
          "The **fresh miniprep round removed the uncertainty associated with long-term storage,** but the unexpectedly low post-purification yields showed the problem was not yet solved. Discovering that ethanol was missing from the wash buffers explained why apparently successful upstream reactions were yielding almost no recoverable DNA. Correcting the buffers restored the purification workflow, but the **first cloning attempts** then showed that **miniprep-derived DNA did not provide a comfortable margin for a workflow** involving preparative digestion, gel excision, purification, ligation and controls.",
        ),
        p("The midipreps resolved this ([see results](/results)):"),
        table(
          [
            "Plasmid preparation",
            "Concentration used in subsequent experiments",
            "Engineering role",
          ],
          [
            [
              cell("pSEVA631"),
              cell("71.75 ng/µL"),
              cell("Vector for the pEM7/pstSCAB route"),
            ],
            [
              cell("pSEVA2513"),
              cell("62.55 ng/µL"),
              cell("Vector for the ppk1 route and pstSCAB troubleshooting"),
            ],
            [
              cell("pEM7 carrier"),
              cell("92.70 ng/µL"),
              cell("Source of the constitutive promoter"),
            ],
            [
              cell("ppk1 carrier"),
              cell("186.30 ng/µL"),
              cell("Source of the ppk1 insert"),
            ],
            [
              cell("pstSCAB carrier"),
              cell("62.60 ng/µL"),
              cell("Source of the pstSCAB insert"),
            ],
          ],
        ),
        p(
          "These **concentrations were approximately 3–13-fold higher** than the limiting post-miniprep preparations, and the absolute amount of available **DNA was now sufficient to support repeated and preparative reactions**. The iteration therefore succeeded in its defined objective, starting DNA was no longer the main experimental constraint, although it did not itself demonstrate that the subsequent cloning strategy would work.",
        ),
      ]),
      phase("Learn", [
        table(
          ["Failure observed", "Change introduced", "Real learning"],
          [
            [
              cell(
                "Legacy pSEVA2513 and pSEVA631 preparations were heterogeneous in concentration and purity.",
              ),
              cell(
                "Retransformed *E. coli* DH5α and prepared fresh plasmid DNA.",
              ),
              cell(
                "Plasmid identity does not mean that a stored preparation is fit for cloning.",
              ),
            ],
            [
              cell(
                "Fresh preparations and purified samples still gave unexpectedly low or undetectable DNA yields.",
              ),
              cell(
                "Audited the purification workflow and corrected wash buffers that had been prepared without ethanol.",
              ),
              cell(
                "A downstream failure may originate from sample processing rather than from the cloning design itself.",
              ),
            ],
            [
              cell(
                "Even after correcting purification, miniprep-scale DNA was rapidly exhausted by digestion, gel purification, controls and repeated cloning attempts.",
              ),
              cell(
                "Scaled the relevant vectors and insert-carrier plasmids from miniprep to midiprep.",
              ),
              cell(
                "DNA quantity is itself an engineering requirement when the workflow contains preparative and iterative steps.",
              ),
            ],
          ],
        ),
        p(
          'The most important result of this iteration was not simply that midiprep produced more DNA, but that our definition of "reliable starting material" changed as we worked through it. We initially assumed the question was whether the previous year\'s plasmids were still usable; their heterogeneous purity suggested they might not be, so we retransformed and generated fresh preparations. That correction alone did not solve the problem: when fresh samples then gave extremely poor yields, it would have been easy to read this as evidence that the cloning strategy itself was failing. Instead, tracing the workflow backwards revealed the missing ethanol in the purification buffers, separating a process failure from a design failure, and confirming that changing primers, enzymes or ligation ratios at that point would have addressed the wrong variable.',
        ),
        p(
          'Correcting the buffers then exposed a third layer: DNA could now be purified correctly, but miniprep-scale preparations still provided little margin for an iterative preparative workflow. This changed the operative question from "Can we extract this plasmid?" to **"Can we generate enough validated plasmid DNA for the entire experimental workflow to remain reproducible?",** a distinction that justified the move to midiprep.',
        ),
        p(
          "We **rejected two assumptions** during this iteration: that a named and **stored plasmid is automatically a usable input**, and that a successful miniprep means DNA quantity will no longer constrain the experiment. We also learned that **NanoDrop concentration alone is not proof** of useful plasmid DNA, purity ratios, gel behaviour, downstream recovery and total available mass must be interpreted together. The variables that proved critical were DNA purity, correct preparation of purification reagents, culture scale, total recoverable DNA mass, and the cumulative losses introduced by downstream processing.",
        ),
        p(
          "Crucially, midiprep did not solve the cloning itself, but it removed one major source of uncertainty from the system. When a digestion subsequently failed, we no longer had to ask whether there had simply been too little plasmid to begin with, we could investigate the restriction reaction directly. Our design rule for the next iteration became: before optimising an assembly reaction, first ensure that every **DNA input is sufficiently clean, correctly identified and available at a scale** that allows the experiment to fail, be analysed and be repeated.",
        ),
      ]),
    ],
  },
  {
    title: "Making restriction, digestion and insert recovery reproducible",
    phases: [
      phase("Design", [
        p(
          "The technical problem was no longer whether we had enough plasmid DNA, but whether our **restriction strategy** could produce **clean, unambiguous and recoverable DNA parts for ligation**. Our initial construct architecture used **BamHI and HindIII** to open **pSEVA2513** and to release the larger ***ppk1*** and ***pstSCAB*** coding regions from their carrier plasmids, and **EcoRI and KpnI** to open **pSEVA631** and recover **pEM7**. These sites had been selected during the in silico design because they were compatible with the planned pSEVA architectures.",
        ),
        p(
          "Our working proposal was that if the enzymes cut at the intended sites, we should be able to run the products on agarose, excise the appropriate bands and proceed to ligation. Refining that assumption, we reasoned that a restriction strategy is only useful for preparative cloning if three conditions hold simultaneously: the **substrate is completely cut**, the **required product is distinguishable** from unwanted fragments, and the **product is physically recoverable in sufficient quantity for ligation.** This mattered because the parts presented different problems, for pSEVA2513/pSEVA631, whether digestion was complete and reproducible; for *ppk1*, whether the insert and carrier-derived fragments (similar in size) could be separated; for pEM7 (~57 bp), whether conventional agarose recovery was feasible at all.",
        ),
        p(
          "We designed the iteration around **progressive troubleshooting**: test the original short **FastDigest** conditions first; if patterns suggested incomplete digestion, **alter enzyme formulation** and incubation time while keeping substrates and sites constant; if the problem was poor fragment separation, **change the restriction geometry** with an additional enzyme; and if a fragment could not be recovered because of its physical size, stop optimising an unsuitable gel-based method and **redesign how that part enters the construct.**",
        ),
        p(
          "The concrete **objective** was: to **establish a restriction and recovery workflow in which each required vector or insert could be reproducibly generated, distinguished from unwanted DNA and recovered for ligation.** The variables expected to matter were enzyme identity, enzyme formulation, incubation time, fragment size, relative fragment sizes, agarose concentration and restriction-site distribution. DNA quantity was not expected to be limiting, since Iteration 2 had already resolved it.",
        ),
        p(
          "If the iteration worked, we expected pSEVA2513 and pSEVA631 to produce **interpretable linear-vector band**s, the larger inserts to be separable from carrier DNA, and **each fragment to be excised and purified without ambiguity**. For **pEM7**, success would take one of two forms: either identifying **gel conditions capable of recovering it**, or obtaining sufficient evidence that the gel-based strategy needed to be replaced.",
        ),
      ]),
      phase("Build", [
        p(
          "Early reactions used **FastDigest enzymes at 37 °C** for approximately 15–25 min: pSEVA2513 and the *ppk1* carrier (pMK-RQ) with BamHI and HindIII, and pSEVA631 and the pEM7 carrier with EcoRI and KpnI, using the higher-yield DNA from Iteration 2 so that digestion conditions could be **compared without DNA availability confounding the result.** Products were resolved by agarose electrophoresis. Because pEM7 was much smaller than the other required fragments, the **pEM7** digestion was also analysed on **progressively higher-percentage agarose gels (1.5% and 3%)** to improve resolution near the bottom of the gel.",
        ),
        p(
          "When the short FastDigest conditions proved insufficiently robust, we **changed the restriction conditions** while keeping DNA sources and intended cloning sites constant. pSEVA631 and the pEM7 carrier were subjected to staged digestion, **KpnI overnight** at 37 °C, followed by **EcoRI for approximately 2 h**, because the two enzymes did not share optimal buffer conditions. pSEVA2513 and the larger insert preparations were subjected to longer **BamHI/HindIII** conditions. For *ppk1*, **NcoI was introduced to improve size discrimination** between insert and carrier; the first NcoI reaction ran for approximately 2 h, and the remaining substrate was then digested overnight under otherwise identical conditions to test whether incomplete digestion was time-dependent.",
        ),
        p(
          "During one parallel setup, NcoI was accidentally added to a pSEVA2513 sample intended for BamHI/HindIII digestion; that preparation was discarded and pSEVA2513 was re-prepared with the intended enzyme combination. Finally, because the **pEM7 route was becoming experimentally inaccessible**, we digested **pstSCAB with BamHI and HindIII in parallel**, allowing the larger gene fragment to continue through the workflow independently of the unresolved pEM7 step, without redefining the final expression architecture.",
        ),
      ]),
      phase("Test", [
        p(
          "We compared observed bands against fragment patterns predicted from the plasmid maps, asking not only whether DNA was present after digestion but whether the pattern was compatible with the intended cut and whether the product could be isolated clearly enough for preparative use **([See Results](/results))**",
        ),
        p(
          "**pSEVA2513.** BamHI/HindIII digestion produced a major band compatible with the expected ~5.3 kb linear vector. The pSEVA2513 sample that accidentally received NcoI no longer produced this pattern; the unexpected result led us to identify the enzyme mix-up, discard the preparation and repeat the intended digestion.",
        ),
        p(
          "**pSEVA631.** Early FastDigest experiments were inconsistent, with degraded-looking or multiple bands. Under longer digestion conditions, a band around the expected ~3 kb region became more interpretable, though the single- versus double-band behaviour was not fully resolved.",
        ),
        p(
          "**pEM7.** The carrier backbone was clearly visible in all conditions, but no distinct band corresponding to the ~60–77 bp promoter fragment could be detected, even after increasing agarose concentration to 1.5% and then 3%. This was a failure of the recovery strategy, not evidence that EcoRI/KpnI failed to cut, the experiment could only show that a fragment of this size was not practically recoverable with our gel workflow. The pEM7 gel-excision route therefore failed its engineering success criterion.",
        ),
        p(
          "**ppk1.** The initial BamHI/HindIII strategy could not confidently distinguish the desired insert from carrier-derived DNA in the same size range. NcoI digestion was expected to release *ppk1* at ~2.2 kb while cleaving the carrier into two ~1 kb fragments. After 2 h, the gel still showed doublet-like bands consistent with incomplete digestion; after overnight incubation, the pattern became substantially clearer and matched the expected separation. The ~2.2 kb band was excised and purified. This met our process-level success criterion, a physically separable fragment compatible with the expected product,  but did not prove sequence identity.",
        ),
        p(
          "**pstSCAB.** Carried forward through BamHI/HindIII into pSEVA2513 independently of the unresolved pEM7 route, to test whether the gene could pass through restriction, purification and ligation on its own.",
        ),
        table(
          ["DNA component", "Initial constraint", "Best outcome reached"],
          [
            [
              cell("pSEVA2513"),
              cell("Reliable backbone linearisation"),
              cell(
                "Candidate ~5.3 kb linear vector obtained with BamHI/HindIII",
              ),
            ],
            [
              cell("pSEVA631"),
              cell("Inconsistent restriction pattern"),
              cell(
                "Longer digestion produced a more interpretable ~3 kb candidate band",
              ),
            ],
            [
              cell("pEM7"),
              cell("Extremely small promoter fragment"),
              cell(
                "Could not be recovered reliably; gel-excision route rejected",
              ),
            ],
            [
              cell("ppk1"),
              cell("Insert/carrier size overlap and incomplete cutting"),
              cell(
                "Overnight NcoI produced the clearest separable candidate insert",
              ),
            ],
            [
              cell("pstSCAB"),
              cell("Intended route depended on unresolved pEM7 intermediate"),
              cell(
                "BamHI/HindIII → pSEVA2513 carried forward as a troubleshooting route",
              ),
            ],
          ],
        ),
      ]),
      phase("Learn", [
        table(
          ["Failure observed", "Change introduced", "Real learning"],
          [
            [
              cell(
                "Short FastDigest conditions produced incomplete or difficult-to-interpret restriction patterns.",
              ),
              cell(
                "Tested longer, substrate-specific digestion conditions using conventional restriction enzymes.",
              ),
              cell(
                "Enzyme identity and incubation time had to be treated as experimental variables rather than fixed protocol parameters.",
              ),
            ],
            [
              cell(
                "pEM7 could not be visualised or recovered even after increasing agarose concentration.",
              ),
              cell(
                "Abandoned gel excision as the primary promoter-recovery strategy.",
              ),
              cell(
                "A DNA part can be generated biochemically but still be unusable if the analytical method cannot resolve and recover it.",
              ),
            ],
            [
              cell(
                "BamHI/HindIII did not allow confident separation of ppk1 from its carrier-derived DNA.",
              ),
              cell(
                "Introduced NcoI to generate a more informative fragment pattern.",
              ),
              cell(
                "Restriction sites must be selected not only for compatible ends, but also for experimentally useful fragment separation.",
              ),
            ],
            [
              cell("A 2 h NcoI digestion still showed doublet-like bands."),
              cell(
                "Extended the NcoI digestion overnight while maintaining the remaining conditions.",
              ),
              cell(
                "Incubation time was critical for this particular substrate.",
              ),
            ],
            [
              cell("NcoI was accidentally added to one pSEVA2513 digestion."),
              cell(
                "Repeated the reaction and began comparing every gel against a predefined expected restriction pattern.",
              ),
              cell(
                "Predicted fragment maps are an experimental control, not merely a figure for interpreting results afterwards.",
              ),
            ],
          ],
        ),
        p(
          "We began with a **protocol-centred view of cloning**: select compatible enzymes, digest, isolate the expected bands, ligate. What we learned was that **restriction cloning must be evaluated as an engineering chain**: cutting is only the first requirement; the product must also be **distinguishable from unwanted DNA and physically recoverable with the tools available**. This explains why apparently similar failures required different responses.",
        ),
        p(
          "For **pEM7**, further optimisation of the same restriction-and-gel workflow was not going to solve the problem: the **limiting variable was the relationship between fragment size and recovery method, not digestion efficiency**. The appropriate response was to **remove pEM7 from the preparative-gel dependency altogether**, obtaining it instead as an independent synthetic DNA part formed by two complementary oligonucleotides designed to generate 5′ and 3′ overhangs compatible with EcoRI- and KpnI-digested ends, respectively; that could be introduced directly into pSEVA631 **without gel excision**, converting an unreliable purification step into a **defined assembly step**. This also introduced a clearer intermediate into the workflow: **construct and verify pSEVA631 + pEM7 → pSEVA6313 before introducing pstSCAB**, so that failure at the promoter-insertion step could be distinguished from failure during insertion of the larger cassette.",
        ),
        p(
          "For ***ppk1***, the problem was different: **the DNA was recoverable, but the original restriction geometry gave insufficient separation from carrier DNA**. Changing the restriction strategy was justified here, and the comparison between 2 h and overnight NcoI incubation showed **digestion time was critical for this substrate**; **overnight incubation was retained as the preferred condition**. At the same time, a clear band at the expected size establishes **compatibility with the predicted fragment, not molecular identity**; the overnight NcoI gel justified **moving to ligation, not claiming a verified construct**.",
        ),
        p(
          "The **accidental NcoI digestion of pSEVA2513** reinforced a further lesson: **expected results must be defined before the experiment**, since the error was identifiable only because the observed pattern did not match the predicted product. **Restriction maps and undigested controls therefore became part of our methodology rather than retrospective illustration**, and parallel digestions were subsequently run with **explicit tube identities, intended enzyme combinations and predicted fragment sizes recorded in advance**.",
        ),
        p(
          "By the end of this iteration, the **critical variables** were **enzyme identity, enzyme formulation, incubation time, restriction-site geometry, relative fragment size, and the physical limits of the gel-purification method**. We had also identified **what did not work**: a universal short FastDigest protocol, repeated agarose-based attempts to recover pEM7, BamHI/HindIII alone for isolating *ppk1*, and a fixed 2 h NcoI incubation. Our central question changed from **“Did the restriction enzyme cut?”** to **“Did the restriction strategy generate the specific DNA part we need in a form we can distinguish, recover and later verify?”**, setting up the next unresolved question: **even if candidate fragments could be isolated and ligated, were the resulting colonies actually carrying the intended constructs?**",
        ),
      ]),
    ],
  },
  {
    title: "Assembly, transformation and construct identity",
    phases: [
      phase("Design", [
        p(
          "Our immediate objective was to **convert the candidate fragments from Iteration 3 into complete expression plasmids**, first asking whether **purified vector and insert could be joined efficiently enough to recover transformants in *E. coli* DH5α**, used as a cloning host to **propagate and analyse candidate plasmids before the more demanding transfer into *P. putida***.",
        ),
        p(
          "Our assembly strategy relied on **T4 DNA ligation of compatible restriction ends**, with **insert amount calculated from fragment length rather than chosen arbitrarily**. For the *ppk1* example, a **5,314 bp vector and a ~2,000 bp insert** were combined at a **target 1:5 vector:insert molar ratio**. We expected this excess to **favour intermolecular vector–insert ligation over recovery of empty backbone**, and treated a **vector-only ligation control as essential for estimating kanamycin-resistant background** arising without the intended insert.",
        ),
        p(
          "Our success criterion was deliberately layered. Recovery of **substantially more colonies** from the **sample ligation than from the vector-only control** would show the assembly mixture contained transformable plasmid DNA, but not yet correct construct identity. The more stringent objective was molecular verification: we selected **PauI diagnostic digestion** because the restriction maps predicted distinct fragment patterns for the intended pSEVA2513 assemblies and for plausible alternative products derived from the synthetic carrier plasmids, allowing the expected result to be defined before the **gel was run rather than interpreted afterwards.**",
        ),
        p(
          "The concrete **objective** was: to **generate selectable candidate plasmids in *E. coli*** and then determine, using a predefined diagnostic **restriction pattern**, whether those candidates were the **intended pSEVA expression constructs before transferring them into *P. putida***. The variables considered were DNA quantity and integrity entering ligation, vector:insert molar ratio, completeness of the preceding digestion, possible vector self-ligation, possible carry-over of carrier-derived DNA, competent-cell performance, and the discriminatory power of the diagnostic pattern. **Only candidates crossing both the colony-count gate and the PauI gate would be suitable for transfer into *P. putida*.**",
        ),
      ]),
      phase("Build", [
        p(
          "The first ***ppk1* ligation** used the DNA available before the **scale and restriction improvements of Iterations 1–2**, was incubated **overnight at 16 °C**, transformed into chemically competent ***E. coli* DH5α** and selected on **kanamycin LB agar. ([see protocol](/experiments))**.",
        ),
        p(
          "After **Iteration 2 increased available DNA mass** and **Iteration 3 established more suitable digestion conditions**, the ligation and transformation workflow was repeated using the **newly prepared candidate fragments**, with the same assembly logic (**compatible restriction ends, T4 ligase, overnight ligation, transformation into DH5α**) but **improved DNA inputs**. A **vector-only control**, prepared and purified vector with no intended insert, was processed in parallel under identical conditions.",
        ),
        p(
          "Candidate colonies from the sample plates were grown in selective liquid medium and processed by **miniprep for molecular verification**. For the diagnostic test, candidate ***ppk1* and *pstSCAB* plasmids** (ligated with pSEVA2513) were digested with **PauI**. Before electrophoresis, we **recorded the fragment patterns predicted for the intended assemblies, the original pSEVA2513 backbone, and plausible carrier-derived alternatives**:",
        ),
        table(
          ["DNA tested", "Predicted PauI fragments"],
          [
            [cell("pSEVA2513"), cell("2,386 + 2,928 bp")],
            [
              cell("Intended pSEVA2513–ppk1 candidate"),
              cell("393 + 4,000 + 2,386 + 659 bp"),
            ],
            [cell("ppk1 synthetic carrier"), cell("393 + 3,008 + 1,055 bp")],
            [
              cell("Intended pSEVA2513–pstSCAB candidate"),
              cell("2,386 + 5,415 + 1,058 bp"),
            ],
            [cell("pstSCAB synthetic carrier"), cell("4,470 + 620 bp")],
          ],
        ),
        p(
          "Candidate plasmid preparations were also taken into an exploratory electroporation **([see protocol](/experiments))** of *P. putida* KT2440 before construct identity had been conclusively established; **this became part of the learning from the iteration rather than evidence of successful chassis engineering.**",
        ),
      ]),
      phase("Test", [
        p(
          "The first **low-quantity DNA ligation** produced no growth on **kanamycin**, but because DNA concentrations, restriction conditions and purification were all still unresolved at that stage, this failure could not be attributed specifically to **ligation efficiency**.",
        ),
        p(
          "After the **Iteration 2–3 improvements**, colonies were recovered from the **sample ligation plates**, while the **vector-only control** produced only four very small colonies, showing the repeated sample assembly generated selectable transformants more efficiently than the no-insert control. This was a successful **assembly screen**, but not yet a successful **cloning result**: because **pSEVA2513** itself confers kanamycin resistance, and the original **pMK-RQ carrier backbone** was also kanamycin-resistant, antibiotic selection alone could not discriminate the intended recombinant from **background plasmids**, as the four control colonies demonstrated **([see results](/results))**.",
        ),
        p(
          "The **PauI diagnostic test** showed that candidate plasmids did not produce the patterns expected for the intended ***ppk1*** or ***pstSCAB*** constructs and, importantly, did not correspond cleanly to the predicted **synthetic-carrier alternatives** either. This did not allow us to identify a single incorrect structure, but it did allow the key binary decision: the candidates did not satisfy our **molecular acceptance criterion** and could not be considered **verified constructs**. Several mechanisms remained compatible with the observed patterns, **residual uncut pSEVA2513**, **vector self-ligation**, **carrier-derived DNA carry-over**, incomplete or aberrant assembly, and the available evidence could not discriminate reliably between them, so no single mechanism was assigned as the proven cause.",
        ),
        p(
          "The **exploratory *P. putida* transfer did not yield convincing transformants** carrying either insert; growth corresponding to the **wild-type reference was observed**, but nothing demonstrated successful introduction of the intended recombinant plasmids.",
        ),
      ]),
      phase("Learn", [
        table(
          ["Failure observed", "Change introduced", "Real learning"],
          [
            [
              cell(
                "The first pSEVA2513 · ppk1 ligation, performed with the low-DNA preparations available at the time, produced no useful growth after transformation.",
              ),
              cell(
                "Repeated the assembly after Iterations 1–2 using higher-yield DNA, improved restriction conditions, overnight ligation and an explicit vector-only control.",
              ),
              cell(
                "A failed transformation cannot be interpreted without first controlling DNA quantity, fragment preparation and background.",
              ),
            ],
            [
              cell(
                "Repeated ligations produced kanamycin-resistant candidate colonies, but the vector-only control also produced a small number of colonies.",
              ),
              cell(
                "Treated colonies as candidates and moved to diagnostic molecular screening rather than assuming successful assembly.",
              ),
              cell(
                "Antibiotic resistance demonstrates maintenance of a selectable plasmid, not correct insert identity.",
              ),
            ],
            [
              cell(
                "PauI digestion of the candidate plasmids matched neither the intended constructs nor the predicted carrier-derived alternatives.",
              ),
              cell(
                "Abandoned repeated gel-excision cloning from the donor plasmids and redesigned the workflow around direct PCR amplification of ppk1 and pstSCAB.",
              ),
              cell(
                "Ambiguous construct identity is an upstream design problem; repeating the same assembly route would preserve the same ambiguity.",
              ),
            ],
          ],
        ),
        p(
          "The most important lesson from this iteration was that **ligation efficiency** was no longer the main limitation of our cloning workflow, **construct identity** was. After the **Iteration 2–3 improvements**, we could generate sufficient DNA, obtain candidate fragments, ligate, and recover **kanamycin-resistant colonies**, which initially seemed to support the idea that a well-resolved band followed by colony growth above vector-only background was reasonably strong evidence of correct assembly. The **PauI digestion** showed this assumption was not robust enough: candidate colonies carried selectable plasmid DNA, but their restriction patterns matched neither the **intended constructs** nor the predicted alternatives.",
        ),
        p(
          "We therefore rejected the hypothesis that a well-separated preparative band followed by abundant selective colonies provides sufficient evidence that the intended construct was assembled correctly. A band of the expected size indicates only **size compatibility**; growth on kanamycin indicates only that the cell maintains the **resistance marker**. Neither establishes complete **molecular identity**, a lesson that built directly on Iteration 3's finding that the ***ppk1* insert** and **carrier-derived DNA** occupied similar size ranges, since a fragment could appear suitable for ligation and produce resistant colonies while the final plasmid still failed **molecular verification**.",
        ),
        p(
          "By the end of this iteration, the critical variables were **insert provenance**, **insert identity**, **carrier contamination**, **fragment recoverability**, and **molecular validation** applied before proceeding. This also explained why simply repeating the same workflow (**carrier plasmid → restriction digestion → preparative gel excision → ligation**) was not the most informative next experiment, it would preserve the same uncertainty about which DNA fragment had actually entered the assembly.",
        ),
      ]),
    ],
  },
  {
    title: "Rebuilding the cloning  workflow from defined PCR-derived inserts",
    phases: [
      phase("Design", [
        p(
          "The first objective was to eliminate the uncertainty associated with **recovering *ppk1* and *pstSCAB* from restriction-digested donor plasmids.** Both coding sequences were therefore amplified directly by high-fidelity P**CR** using primers that introduced the restriction sites required for downstream as sembly.",
        ),
        p(
          "For ***ppk1***, the design was straightforward. The forward primer kept **BamHI** and the reverse primer kept **HindIII**, generating a PCR product that could be directionally cloned into **pSEVA2513** opened with the same enzymes.",
        ),
        p("ppk1"),
        ul([
          "fw: 5’ AAAAAAAAAGGATCCTGACCTAAGGA-3’",
          "rv: TTTTTTTTTAAGCTTTTAGCTCTGCAG",
        ]),
        p(
          "For pstSCAB, we designed a more flexible DNA part. The forward primer was: 5′AAAAAAAAAGGTACCcggGGATCCTGACCTAAGGAGGTAAA-3′",
        ),
        p("while the reverse primer was: 5′-TTTTTTTTTAAGCTTTTAACCGTAGC-3′."),
        p(
          "The forward oligonucleotide incorporated the **upstream pEM7-derived sequence together with KpnI and BamHI** restriction interfaces, while the reverse primer kept **HindIII**. This meant that a single PCR-defined pstSCAB product could support different cloning strategies.",
        ),
        p("**Route A : simplified assembly**"),
        p("**pSEVA2513 - BamHI | pstSCAB | HindIII**"),
        p(
          "Both pSEVA2513 and the PCR-derived *pstSCAB* fragment were digested with BamHI and HindIII. This route removed the promoter-assembly problem entirely.",
        ),
        p("The same architecture was used for *ppk1*:"),
        p("**pSEVA2513 - BamHI | ppk1 | HindIII**"),
        p(
          "This gave two parallel assemblies using the same destination vector and the same restriction geometry, allowing the behaviour of the two PCR-derived inserts to be compared independently of the pEM7 architecture.",
        ),
        p("**Route B: Direct assembly of the pEM7–pstSCAB module**"),
        p(
          "The first possibility was to use the PCR-derived product as a preassembled functional module in which the promoter sequence had already been introduced upstream of pstSCAB during amplification.",
        ),
        p(
          "This allowed us to aim directly for: pSEVA631 + pEM7–pstSCAB → pSEVA6313·pstSCAB without first having to isolate a separate promoter-containing pSEVA6313 intermediate.",
        ),
        p(
          "In this route, **pSEVA631 was linearized with EcoRI and HindIII**, while the PCR-derived **pstSCAB product was prepared through its KpnI/HindIII**-compatible architecture. The additional sequence engineered into the forward primer was intended to preserve the promoter-containing configuration required upstream of pstSCAB.",
        ),
        p("**Route C: Sequential construction through pSEVA6313**"),
        p("At the same time, we retained a more modular two-step strategy:"),
        p("Step 1: pSEVA631 + pEM7 → pSEVA6313"),
        p("Step 2: pSEVA6313 + pstSCAB → pSEVA6313·pstSCAB"),
        p(
          "This was the route originally introduced after the pEM7 recovery problem identified in Cycle 2: first validate the promoter-containing backbone and only then introduce the much larger pstSCAB cassette. The rationale was that separating the construction into two checkpoints would make it possible to distinguish failure of promoter insertion from failure of pstSCAB cloning.",
        ),
        p(
          "The redesigned build therefore separates the system into a small number of constructs that each answer a specific engineering question:",
        ),
        table(
          ["**Construct**", "**Engineering purpose**"],
          [
            [
              cell("**pSEVA2513 · ppk1**"),
              cell(
                "Whether a defined *ppk1* fragment can be correctly assembled into the destination backbone",
              ),
            ],
            [
              cell("**pSEVA2513 · pstSCAB**"),
              cell(
                "Whether the large *pstSCAB* cassette can be assembled independently of the alternative promoter architecture",
              ),
            ],
            [
              cell("**pSEVA631 + pEM7 → pSEVA6313**"),
              cell(
                "Whether the promoter-containing backbone can be generated and verified as an intermediate",
              ),
            ],
            [
              cell("**pSEVA6313 · pstSCAB**"),
              cell(
                "Whether *pstSCAB* can then be introduced into an already verified promoter-containing vector",
              ),
            ],
          ],
        ),
        p(
          "The concrete **objective** was therefore: To determine whether defined **PCR-derived inserts and modular restriction interfaces could produce cloning candidates** whose molecular identity could be **validated** more clearly than in the previous carrier-derived workflow.",
        ),
      ]),
      phase("Build", [
        p(
          "Once the redesigned primers had been defined, we implemented the new cloning workflow by **generating ppk1 and pstSCAB as PCR-derived DNA parts**, rather than recovering them from their original carrier plasmids.",
        ),
        p(
          "The first step was to **prepare the oligonucleotides** and qualify the DNA templates. Primer stocks were resuspended at 100 µM and diluted to 10 µM working solutions. The template preparations measured 179.45 ng/µL for the ppk1 carrier and 67.55 ng/µL for the pstSCAB carrier, so both were **diluted** before amplification to allow more practical template volumes in the PCR reactions. Because these concentrations would have required inconveniently small template volumes, diluted working preparations were generated before setting up the PCRs.",
        ),
        p(
          "Separate PCR reactions were performed for *ppk1* and *pstSCAB* using **Pfu polymerase**. The amplification products were analysed on a 0.8% agarose gel, appropriate for resolving the relatively large products being generated. Candidate bands corresponding to approximately **2.2 kb for ppk1 and approximately 3.6 kb for pstSCAB were recovered.**",
        ),
        p("After purification, the DNA concentrations were:"),
        table(
          ["**PCR-derived product**", "**Concentration after purification**"],
          [
            [cell("*ppk1*"), cell("**131.10 ng/µL**")],
            [cell("*pstSCAB*, preparation 1"), cell("**51.44 ng/µL**")],
            [cell("*pstSCAB*, preparation 2"), cell("**77.65 ng/µL**")],
          ],
        ),
        p(
          "The purified products were then divided between the different restriction routes.",
        ),
        p(
          "For the **pSEVA2513 branch**, pSEVA2513, *ppk1* and *pstSCAB* were digested overnight with **BamHI and HindIII.**",
        ),
        table(
          ["**Component**", "**pSEVA2513**", "**ppk1**", "**pstSCAB**"],
          [
            [cell("Buffer R"), cell("4 µL"), cell("4 µL"), cell("4 µL")],
            [
              cell("DNA concentration"),
              cell("57.80 ng/µL"),
              cell("131.10 ng/µL"),
              cell("77.65 ng/µL"),
            ],
            [cell("DNA"), cell("17 µL"), cell("15 µL"), cell("26 µL")],
            [cell("BamHI"), cell("1.5 µL"), cell("1.5 µL"), cell("1.5 µL")],
            [cell("HindIII"), cell("1.5 µL"), cell("1.5 µL"), cell("1.5 µL")],
            [cell("H₂O"), cell("16 µL"), cell("18 µL"), cell("7 µL")],
            [cell("Total"), cell("40 µL"), cell("40 µL"), cell("40 µL")],
          ],
        ),
        p(
          "For the **pSEVA631 route**, the vector and ***pstSCAB*** were prepared using different **restriction combinations**. **pSEVA631** was prepared with **EcoRI/HindIII and EcoRI/KpnI**, while *pstSCAB* was prepared using KpnI followed by HindIII.",
        ),
        p(
          "The digestion products were analysed on preparative agarose gels together with undigested controls. The expected approximate sizes were:",
        ),
        table(
          ["**DNA component**", "**Approximate size**"],
          [
            [cell("pSEVA2513"), cell("~5 kb")],
            [cell("pSEVA631"), cell("~3 kb")],
            [cell("ppk1"), cell("~2.2 kb")],
            [cell("pstSCAB"), cell("~3.6 kb")],
          ],
        ),
        figure("", "assets/engineering/genetic-engineering/plasmid-maps.webp"),
        p(
          "The candidate bands were excised and purified. Because some pSEVA631 and *pstSCAB* preparations were obtained at relatively low concentration, these samples **were concentrated before ligation.** The purified products were ligated overnight at 16 °C. The resulting ligations were **transformed into E. coli**. Five conditions were obtained:",
        ),
        ul([
          "pSEVA2513·ppk1",
          "pSEVA2513·pstSCAB",
          "pSEVA2513 negative control",
          "pSEVA631-derived pstSCAB",
          "pSEVA631 negative control.",
        ]),
        p(
          "At this stage, all colonies were treated only as candidate transformants and were taken forward to molecular testing.",
        ),
      ]),
      phase("Test", [
        p(
          "The purpose of the Test stage was to determine which branches had progressed far enough to support **meaningful molecular validation**. We did not treat transformation or antibiotic resistance as proof of correct cloning. Instead, each branch was evaluated according to the strongest evidence that the available material allowed us to obtain.",
        ),
        p(
          "The key difference between the *ppk1* and *pstSCAB* branches was that **they did not reach the same experimental stage.** Although both inserts had been successfully generated by PCR and taken through restriction and ligation, **the amount of material recovered afterwards was different.** This became decisive for the rest of the cycle.",
        ),
        p(
          "**pstSCAB branches: insufficient material to reach construct-level validation**",
        ),
        p(
          "Because the recovered DNA concentrations were low, an additional concentration step was introduced before ligation.  This allowed the remaining material to be used more efficiently, but it did not generate a comfortable amount of DNA for the complete downstream workflow. The *pstSCAB* branches therefore remained constrained by limited material.",
        ),
        p(
          "The experiment therefore stopped before a sufficiently strong construct-level conclusion could be reached.",
        ),
        p(
          "The result of the *pstSCAB* branch was consequently: **PCR generation and restriction preparation were achieved, but DNA recovery after purification became limiting and prevented the branch from progressing to robust molecular validation.**",
        ),
        p(
          "This meant that neither the pSEVA2513·pstSCAB nor the pSEVA631-derived *pstSCAB* architecture could be classified as confirmed or definitively incorrect.",
        ),
        p("**Why we did not continue with the pstSCAB colony-PCR strategy**"),
        p(
          "A colony-PCR screen had initially been considered for the *pstSCAB* transformants. However, the diagnostic product would have included the approximately 3.6 kb *pstSCAB* cassette, potentially together with additional vector-flanking sequence.   Such an assay is demanding when **performed directly from colonies because template amount and quality are less controlled than in PCR from purified plasmid DNA.** The programme had already been adapted with a 4 min extension step, but a **negative result from such an assay would still be difficult to interpret.** It could reflect absence of the insert, poor template release, cellular inhibition, low plasmid availability or inefficient amplification across a long product.",
        ),
        p(
          "Because the *pstSCAB* branch was already limited by DNA recovery and candidate availability, c**ontinuing to invest the remaining material in a low-discrimination assay would not have reduced the uncertainty meaningfully.**",
        ),
        p(
          "We therefore did not use the absence of a colony-PCR product as proof that *pstSCAB* cloning had failed. The branch remained experimentally unresolved.",
        ),
        p("**ppk1 branch: sufficient candidates for molecular validation**"),
        p(
          "**Six pSEVA2513·ppk1 colonies were retained and grown under kanamycin selection.** Plasmid DNA was then recovered by miniprep so that construct architecture could be analysed directly.",
        ),
        p(
          "The first diagnostic test used BamHI and HindIII, the same enzymes employed during the cloning reaction. The expected interpretation was:",
        ),
        table(
          ["Candidate plasmid", "Expected BamHI/HindIII result"],
          [
            [cell("Empty pSEVA2513"), cell("Mainly linearised vector")],
            [
              cell("pSEVA2513·ppk1"),
              cell("Vector backbone + released *ppk1* fragment"),
            ],
          ],
        ),
        p(
          "The six candidate plasmids were digested for 2 h and analysed by 1% agarose electrophoresis. The resulting pattern identified colonies **11 and 15** as the strongest candidates for carrying the insert. ([See results](/results))",
        ),
        p(
          "However, the **BamHI/HindIII pattern was considered supportive rather than definitive.** Because these were also the cloning enzymes, incomplete digestion or other plasmid conformations could complicate interpretation. We therefore introduced a second molecular test rather than treating the first compatible pattern as sufficient evidence.",
        ),
        p("**XhoI as an independent diagnostic test**"),
        p(
          "XhoI was selected because it provided a more discriminating restriction geometry. For the expected pSEVA2513·ppk1 construct, XhoI digestion was predicted to produce two fragments of approximately:",
        ),
        table(
          ["Fragment", "Expected size"],
          [
            [cell("Fragment 1"), cell("6,312 bp")],
            [cell("Fragment 2"), cell("1,126 bp")],
          ],
        ),
        p(
          "The empty pSEVA2513 backbone was approximately 5,314 bp and would not generate this same pattern.  Candidates 11 and 15 were therefore t**ested alongside undigested and digested vector controls.**",
        ),
        p(
          "Despite damage to the agarose gel during image acquisition, both candidates showed a restriction pattern compatible with the expected recombinant architecture.",
        ),
        p(
          "This represented the strongest molecular evidence obtained during the cycle. **The result supported the conclusion that candidates 11 and 15 contained a recombinant plasmid compatible with pSEVA2513·ppk1. ([See results](/results))**",
        ),
      ]),
      phase("Learn", [
        table(
          [
            "**Failure observed**",
            "**Change introduced**",
            "**Real learning**",
          ],
          [
            [
              cell(
                "Carrier-derived *ppk1* and *pstSCAB* inserts remained molecularly ambiguous.",
              ),
              cell(
                "Generated both inserts directly by PCR with the required restriction interfaces.",
              ),
              cell(
                "Insert identity should be controlled before assembly, not inferred from gel size.",
              ),
            ],
            [
              cell(
                "The *pstSCAB* construct involved several assembly variables.",
              ),
              cell(
                "Designed *pstSCAB* to support alternative pSEVA2513 and pSEVA631/pEM7 routes.",
              ),
              cell(
                "Modular design helps isolate different sources of failure.",
              ),
            ],
            [
              cell(
                "Purification of the *pstSCAB* branch yielded insufficient DNA for a robust downstream assembly, even after concentration.",
              ),
              cell(
                "Did not continue investing material in this branch and retained the modular strategy for a future repeat.",
              ),
              cell(
                "DNA recovery after purification is a practical design constraint; an assembly should not be interpreted if its inputs are limiting.",
              ),
            ],
            [
              cell(
                "No useful *pstSCAB* transformants were recovered for downstream validation after colony PCR.",
              ),
              cell(
                "Continued molecular validation only with the pSEVA2513·ppk1 branch.",
              ),
              cell(
                "Validation should only proceed when sufficient candidate material has actually been obtained.",
              ),
            ],
            [
              cell(
                "BamHI/HindIII analysis of *ppk1* candidates remained ambiguous.",
              ),
              cell("Added an independent XhoI diagnostic digest."),
              cell(
                "Validation should be redesigned when the first assay is not sufficiently discriminating.",
              ),
            ],
            [
              cell("Candidates 11 and 15 showed the expected XhoI pattern."),
              cell(
                "Retained them for further validation and downstream testing.",
              ),
              cell(
                "Independent molecular evidence should support construct architecture before moving to the chassis.",
              ),
            ],
          ],
        ),
        p(
          "Cycle 4 showed that the success of a cloning workflow depends not only on whether the biological design is correct, but also on whether **enough interpretable material survives each experimental step to allow the design to be tested.**",
        ),
        p(
          "The first major learning concerned **insert provenance**. In the previous workflow, *ppk1* and *pstSCAB* had been recovered from carrier plasmids by restriction digestion and gel excision. Even when a band migrated at the expected size, its identity remained partly inferred from electrophoretic behaviour.",
        ),
        p(
          "By **moving to PCR-derived inserts, we reduced that uncertainty upstream.** The DNA entering the ligation was now generated between sequence-specific primers and carried the restriction interfaces intentionally designed for the destination vectors.",
        ),
        p(
          "The ***ppk1* branch** demonstrated the value of this change. It progressed from a **defined PCR product to ligation, candidate colonies, plasmid purification and two successive diagnostic restriction assays.** Candidates 11 and 15 reached the strongest molecular-validation level achieved in this cycle.",
        ),
        p(
          "However, the *pstSCAB* branch revealed that controlling DNA identity is not sufficient by itself. The large *pstSCAB* fragment could be amplified and prepared for cloning, **but substantial material was lost during the subsequent restriction, preparative gel and purification steps.** Even after adding a concentration step, DNA recovery remained limiting.",
        ),
        p(
          "This changed the interpretation of that branch. The appropriate conclusion was not: *“The pstSCAB construct failed.”* Instead: ***The pstSCAB branch did not reach the stage at which construct identity could be tested robustly because DNA recovery became limiting first.***",
        ),
        p(
          "This distinction is important in an engineering cycle because the next modification should target the **earliest demonstrated bottleneck**, not a downstream step that was never properly tested.",
        ),
        p(
          "For *pstSCAB*, changing the validation enzyme or repeatedly screening colonies would not address the main limitation observed in this iteration. The more immediate engineering question is **how to preserve or regenerate sufficient DNA through the assembly workflow so that the construct can actually reach molecular validation.**",
        ),
        p(
          "A second learning came from the validation of *ppk1*. The **BamHI/HindIII diagnostic was a logical first test** because those enzymes flanked the insert. However, its result was **not considered sufficiently discriminating to close the question.** Instead of accepting a plausible pattern as confirmation, we redesigned the validation step and **introduced XhoI.** This produced a small DBTL cycle within the larger cloning cycle:",
        ),
        ul([
          "**Design:** identify a restriction assay that distinguishes the recombinant plasmid more clearly from the empty vector.",
          "**Build:** digest candidates 11 and 15 with XhoI.",
          "**Test:** compare their fragment pattern with the predicted recombinant architecture and vector control.",
          "**Learn:** both candidates were compatible with the expected pSEVA2513·ppk1 structure.",
        ]),
        p(
          "This reinforced a broader principle: **Validation should be selected according to discriminatory power, not simply because it is convenient or because it uses the same enzymes as the cloning step.**",
        ),
        p(
          "The cycle also clarified that different branches can fail for completely different reasons.",
        ),
        ul([
          "For *pstSCAB*, the dominant limitation was **material availability**.",
          "For *ppk1*, sufficient material was available, so the dominant limitation moved downstream to **molecular discrimination between candidate architectures**.",
        ]),
        p(
          "Another important learning was that the more **complex *pstSCAB* architecture benefits from modularity.** The final pSEVA6313·pstSCAB construct combines promoter architecture, a large cassette and several restriction interfaces. The direct route potentially reduces the number of cloning rounds, but if the available DNA becomes limiting or the final assembly fails, several possible causes remain unresolved simultaneously.",
        ),
        p(
          "The central engineering lesson from Cycle 4 was therefore: **Identify the earliest variable that limits interpretation** in each branch, and redesign that variable before adding further experimental complexity. A construct should only progress when **both sufficient material and sufficiently discriminating evidence are available to make the next result meaningful.**",
        ),
      ]),
    ],
  },
];

export const CRISPR_ITERATIONS: Iteration[] = [
  {
    title: "From guide design to reliable gRNA building blocks",
    phases: [
      phase("Design", [
        p(
          "Our biological objective was to inactivate ***ppx***, ***ppkB*** and ***pitB*** using **cytidine base editing**, reducing three pathways that could limit intracellular **phosphorus retention**. Since the editor only works within a specific region of the protospacer, **guide design** had to meet several sequence requirements at the same time. We searched for **CAA, CAG or CGA codons** that could be converted by a **C→T edit** into **premature stop codons** (TAA, TAG or TGA), with the editable cytosine located within the expected **editing window** and a suitable **NGG PAM** nearby. Whenever possible, these edits were positioned early in the coding sequence so that successful editing would generate a strongly truncated protein. Candidate guides were also screened against the ***P. putida* KT2440 genome** to minimise potential **off-target interactions**.",
        ),
        p(
          "The next challenge was to turn these **computationally selected guides** into the physical DNA fragments needed for assembly. We therefore planned to amplify separate ***ppx***, ***ppkB*** and ***pitB*** guide fragments from **pEX128** using target-specific oligonucleotides. These oligonucleotides contained both the **spacer sequence** and the additional sequences required for **BsaI Golden Gate assembly**. Each resulting fragment was expected to be approximately **130–150 bp** long.",
        ),
        p(
          "**pEX128** served only as a **PCR template**, whereas **pMBEC2** would later serve as the **structural acceptor** in Golden Gate; we therefore reasoned the two preparations did not need to satisfy the same concentration threshold, a relatively dilute pEX128 preparation might remain usable for PCR given sufficient template volume, whereas pMBEC2 needed to be concentrated enough to add a controlled amount of vector without occupying an excessive fraction of the assembly volume.",
        ),
        p(
          "The concrete objective was: to obtain **reproducible, recoverable ~130–150 bp guide modules** for ***ppx***, ***ppkB*** and ***pitB*** that could be taken forward as defined inputs for **Golden Gate assembly**. The variables expected to matter were **template quality**, **template volume**, **primer design**, **annealing temperature**, **amplicon size**, **purification efficiency**, and the **negative control**. If the design worked, each target should produce a **discrete ~130–150 bp band**, reproducible across replicates and absent from the **no-primer control**, and remaining recoverable after purification.",
        ),
      ]),
      phase("Build", [
        p(
          "We obtained the two **plasmid inputs** (from **CIB-CSIC**) in *E. coli* DH5α: **pEX128·gRNA** as the PCR template, and two independent **pMBEC2** preparations for the subsequent **Golden Gate** step. All were processed by **miniprep**, analysed by agarose electrophoresis and quantified by **NanoDrop**.",
        ),
        p(
          "Using the available pEX128 material, we assembled separate **PCR reactions** for ***ppx***, ***ppkB*** and ***pitB*** with **Pfu polymerase** (Promega) and target-specific oligonucleotides. Products were resolved by agarose electrophoresis and processed using the **Wizard SV Gel and PCR Clean-Up System** (Promega) **([see protocols](/experiments))**.",
        ),
        p(
          "Auditing the workflow after the first result, we identified **two errors**: an ethanol-dependent miniprep reagent had been prepared **without the required ethanol**, and an ethanol-dependent PCR purification reagent had also been prepared incorrectly. Both were **corrected before repeating the workflow**. We also reviewed the **cycling programme** for the repeated PCR **([see protocol](/experiments))**, since the expected guide fragments were only **~130–150 bp**: extension time was reduced to approximately **20–30 s** (a longer extension was unlikely to improve recovery of the desired product and could instead extend miss-primed products more efficiently), and denaturation time was similarly shortened. We retained **60 °C** as the initial annealing temperature, as recommended by the source protocol and compatible with the template-complementary regions of our primers (the long **5′ overhangs** carrying the guide-assembly sequences do not anneal during the first amplification cycles). A **60–68 °C annealing gradient** was reserved as a controlled troubleshooting step, to be used only if specificity remained a problem after correcting DNA preparation and purification.",
        ),
        p(
          "The repeat used separate reactions for all three targets, with **greater replication** and a **no-primer negative control**, analysed on **1.5% agarose** and purified with the corrected clean-up reagents. Throughout, the **biological guide sequences were kept unchanged**, to test whether **correcting the experimental process alone** was sufficient before redesigning the guides themselves.",
        ),
      ]),
      phase("Test", [
        p(
          "The first measurements showed substantial differences between preparations **([see results](/results)):**",
        ),
        table(
          ["Preparation", "Concentration", "A260/A280", "A260/A230"],
          [
            [
              cell("pEX128·gRNA"),
              cell("6.05 ng/µL"),
              cell("1.833"),
              cell("2.574"),
            ],
            [
              cell("pMBEC2 sample 1"),
              cell("105.00 ng/µL"),
              cell("1.890"),
              cell("2.288"),
            ],
            [
              cell("pMBEC2 sample 2"),
              cell("73.05 ng/µL"),
              cell("1.878"),
              cell("2.187"),
            ],
          ],
        ),
        p(
          "pEX128 appeared substantially more **dilute** than either pMBEC2 preparation, but once we discovered the **ethanol error** in the miniprep workflow, this value could no longer be treated as a reliable characterisation of template recovery. The first **guide PCR** did not meet our predefined criterion: rather than three clear products assignable to the **~130–150 bp** guide modules, the gel showed predominantly **low-molecular-weight material** near the bottom, compatible with unincorporated primers, **primer-dimers**, short non-specific products, or degraded DNA; the gel alone could not distinguish between these **([see results](/results))**. Because the pEX128 template had been produced with an incorrectly prepared reagent, **this experiment could not be used to reject the guide design.**",
        ),
        p(
          "Purified products from this first PCR measured close to **0 ng/µL** for all three targets. Review of the clean-up procedure revealed the second error: the **ethanol-dependent purification reagent** had also been prepared incorrectly, so the near-zero readings could not discriminate between insufficient amplification and **DNA loss during purification**.",
        ),
        p(
          "After correcting the **miniprep reagent**, repeated extraction gave substantially higher concentrations:",
        ),
        table(
          ["Preparation", "Concentration", "A260/A280", "A260/A230"],
          [
            [
              cell("pEX128·gRNA A"),
              cell("411.95 ng/µL"),
              cell("1.868"),
              cell("1.999"),
            ],
            [
              cell("pEX128·gRNA B"),
              cell("584.00 ng/µL"),
              cell("1.874"),
              cell("2.132"),
            ],
            [
              cell("pMBEC2 A"),
              cell("425.00 ng/µL"),
              cell("1.888"),
              cell("2.196"),
            ],
            [
              cell("pMBEC2 B"),
              cell("350.35 ng/µL"),
              cell("1.877"),
              cell("1.973"),
            ],
          ],
        ),
        p(
          "This represented a roughly **68- to 97-fold increase** for pEX128 and a **four- to five-fold increase** for pMBEC2, with consistently good **purity ratios** throughout, strong evidence that the incorrectly prepared miniprep reagent had been a major **technical limitation** in the first extraction, and that the initial PCR failure could not be used as evidence against the guide design until the **upstream workflow** had been corrected.",
        ),
        p(
          "The repeated PCR, run with conditions matched to the **short amplicons**, produced strong, discrete bands for ***ppx***, ***ppkB*** and ***pitB*** at positions compatible with the expected **~130–150 bp products**; replicate reactions behaved similarly, and the **no-primer control** lacked a corresponding band. A **higher-molecular-weight band** was also observed in some reactions, plausibly residual **pEX128 template**, though this identity was not independently confirmed **([see results](/results))**.  The repeated experiment met the **building-block success criterion**: all three targets generated **reproducible candidate products** of the expected size, purified and taken forward to **Golden Gate assembly**, though this evidence remained limited to **fragment generation** and did not verify sequence, assembly order or editing function.",
        ),
      ]),
      phase("Learn", [
        table(
          ["Failure observed", "Change introduced", "Real learning"],
          [
            [
              cell(
                "The first pEX128 preparation was obtained before discovering that an ethanol-dependent miniprep reagent had been incorrectly prepared.",
              ),
              cell(
                "Corrected the reagent preparation and stopped treating the first pEX128 quantification as a fully reliable characterisation of template availability.",
              ),
              cell(
                "PCR performance cannot be used to judge guide design while the quality and amount of the template remain uncertain.",
              ),
            ],
            [
              cell(
                "The first guide PCR did not provide clear, confidently assignable ~130–150 bp products.",
              ),
              cell(
                "Repeated the amplification after correcting the upstream workflow and adapted cycling times to the short expected amplicons.",
              ),
              cell(
                "Poor PCR output does not automatically indicate poor guide or primer design.",
              ),
            ],
            [
              cell(
                "The first purified PCR products measured close to zero, but an ethanol-dependent PCR purification reagent had also been prepared incorrectly.",
              ),
              cell(
                "Corrected the purification reagents before repeating the clean-up.",
              ),
              cell(
                "A near-zero post-purification yield can reflect sample-processing failure rather than amplification failure.",
              ),
            ],
            [
              cell(
                "The repeated workflow generated discrete target-sized bands for the three guides.",
              ),
              cell(
                "Retained the guide designs and moved the purified products forward to Golden Gate assembly.",
              ),
              cell(
                "Troubleshooting the process before redesigning the biological part prevented us from discarding functional guide designs.",
              ),
            ],
          ],
        ),
        p(
          "The central learning from this iteration was that our first apparent **PCR failure** was not, in itself, a valid test of the **guide design**. The most immediate explanation for poorly interpretable low-molecular-weight bands and near-zero purified yields would have been unsuitable primers or PCR conditions; tracing the workflow backwards instead showed two independent **process variables**, the ethanol-dependent **miniprep reagent** and the ethanol-dependent **PCR purification reagent**, had not been adequately controlled, confounding the biological design with unresolved technical variables both upstream and downstream of the PCR.",
        ),
        p(
          "The before-and-after **DNA yields** (6.05 ng/µL rising to **411.95–584.00 ng/µL** for pEX128; 105.00/73.05 rising to **425.00/350.35 ng/µL** for pMBEC2) demonstrated that **DNA preparation** had not been a negligible technical detail but had materially changed the amount of usable template available. This led us to reject the hypothesis that a poor gel followed by ~zero purified DNA means the guide design or primers have failed. The **successful repeat**, using the same guide designs with properly prepared DNA, supported the alternative interpretation: **upstream material preparation** and **sample handling** had been the major contributors to the original failure, not the guide sequences.",
        ),
        p(
          "We cannot, however, attribute the improvement exclusively to the corrected reagents, since the repeated experiment also used **PCR timings** better matched to the short amplicon; because both changes were introduced together, our data do not allow us to isolate their individual contributions quantitatively, and both remain part of the **revised workflow**.",
        ),
        p(
          "The variables that proved critical were broader than expected: **template provenance**, **template quantity**, **purification reagents**, **amplicon size**, **PCR timing**, **purification efficiency**, and **negative controls**. We also established what did not work: treating the first pEX128 concentration as though it came from a validated extraction, interpreting near-zero post-purification DNA as direct evidence of amplification failure while the purification chemistry was itself compromised, and rejecting a biological design on the basis of an **ambiguous first gel** while upstream variables remained unresolved.",
        ),
        p(
          "Our workflow logic evolved from *design guide → run PCR → judge the guide from the gel* to ***design guide → qualify the template → amplify under conditions appropriate for the product size → evaluate against an appropriate negative control → only then judge whether the guide-building strategy has succeeded.*** A reproducible band at the **expected size** demonstrated that we could generate candidate **guide building blocks**; it did not establish **sequence identity**, ordered incorporation into **pMBEC2**, or the ability to support **genome editing**. The next engineering question therefore became whether these independently generated guide modules could be assembled into pMBEC2 in the intended **architecture**, and whether correct assemblies could be distinguished from **empty, partial or abnormal plasmids** using independent **molecular evidence**.",
        ),
      ]),
    ],
  },
  {
    title:
      "Assembly and molecular verification of the pMBEC2 guide-array construct",
    phases: [
      phase("Design", [
        p(
          "The **objective** of this iteration was to convert the three **guide modules** from Iteration 1 into a **molecularly verified pMBEC2 editing construct**. The assembly relied on **Golden Gate cloning**, which depends on **BsaI** being a **Type IIS restriction enzyme**: BsaI recognises a fixed sequence but cuts outside it, at a defined distance, leaving a **four-nucleotide overhang** whose sequence is not dictated by the enzyme itself but by whatever was placed there during primer or part design. This is what allows several fragments to be joined in a single, defined **order and orientation**, each junction is designed independently, and because the BsaI recognition site is cut away from the final product, the assembled construct is **scarless**, with no leftover restriction site marking the joint. It also means **digestion and ligation can run in the same tube**: cycling the reaction between the enzyme's digestion temperature and the ligase's optimum repeatedly cuts any construct in which BsaI sites have been reformed (self-ligated vector, wrong-order assemblies) while leaving the correctly assembled product, whose junctions no longer contain a BsaI site, intact and enriched over successive cycles.",
        ),
        p(
          "The assembly exploited the architecture of **pMBEC2** within this logic: the ***ppx*, *ppkB* and *pitB*** guide modules had been designed with BsaI sites positioned to generate **compatible overhangs** with pMBEC2 and with one another in the intended order, with insertion of the guide region replacing the **msfGFP drop-out cassette**. This gave a first screening principle: intact pMBEC2 should retain strong **green fluorescence**, while replacement of the reporter should give colonies with markedly reduced or absent fluorescence.",
        ),
        p(
          "The construct was modelled **in silico** first, defining the intended order and orientation of the guide modules, the **BsaI-generated junctions**, and the region replacing msfGFP, not only to design the assembly, but to define what subsequent validation would need to discriminate. We deliberately separated **screening from verification**: because Golden Gate assembly relies on unique overhangs that in principle direct correct order, **fluorescence loss** was a reasonably strong indicator of successful recombination, but ligase fidelity is not absolute, and reporter loss alone could not rule out **partial assembly**, **mismatch ligation**, or **incomplete digestion**. A **molecular assay** was therefore still required to confirm that all three guides were present, correctly ordered, and correctly joined. A molecular assay would therefore be required before any candidate could be considered complete.",
        ),
        p(
          "Our plan was to verify candidates by **colony PCR** and, where possible, **diagnostic restriction**. A useful colony PCR would need primers on opposite sides of the assembled region, oriented towards one another, generating a predefined product whose size differs between the intended assembly and plausible alternatives; a useful diagnostic enzyme would need to produce sufficiently different fragment patterns on agarose to distinguish the candidate from **parental or incorrect plasmid DNA**.",
        ),
        p(
          "The concrete **objective** was: to **recover colonies compatible with replacement of the pMBEC2 fluorescent drop-out** cassette, and independently demonstrate that at least one candidate contained the intended **guide-array architecture**, before moving the editor into ***P. putida***. The critical variables were **Golden Gate efficiency**, **transformation efficiency**, **control identity**, **reporter behaviour**, **guide-array architecture**, **primer position and orientation**, **expected PCR-product size**, and the **discriminatory power** of any candidate restriction digest. Success was defined in stages: **Golden Gate colonies + expected fluorescence phenotype = candidate assembly**; **candidate assembly + diagnostic molecular evidence = construct suitable for downstream editing**. Without **molecular identity**, the construct would not progress to *P. putida* regardless of plate phenotype.",
        ),
      ]),
      phase("Build", [
        p(
          "Purified ***ppx*, *ppkB* and *pitB* guide modules** from Iteration 1 were combined with **pMBEC2**, **BsaI** and **T4 DNA ligase** in the Golden Gate workflow, cycling between restriction and ligation temperatures. The product was transformed into chemically competent ***E. coli* DH5α** and plated on selective LB medium, alongside a **no-insert Golden Gate control** taken through the same reaction and transformation procedure **([see protocol](/experiments))**.",
        ),
        p(
          "When the first transformation gave an **uninterpretable result**, we changed the **control configuration** rather than immediately altering the guide sequences or Golden Gate architecture: the remaining Golden Gate product was transformed again alongside **unmodified pMBEC2**, which had not undergone Golden Gate processing and so provided two direct references simultaneously, successful uptake of pMBEC2 by the competent cells, and the **fluorescence phenotype** expected when the **msfGFP cassette** remained intact.",
        ),
        p(
          "For the first **colony-PCR** attempt, we used the available oligonucleotides, *ppx*-Fwd and *pitB*-Rev, expecting that primers associated with the first and last guide modules might generate a product spanning the assembled region. When this assay failed to produce an interpretable diagnostic product, we returned to the **in silico plasmid architecture** and examined the actual **positions and orientations** of the two primer-binding sites, and in parallel investigated whether construct identity could instead be tested through **diagnostic restriction**, comparing assembled and parental plasmids in silico for candidate sites and predicted fragment patterns **([see experiments](/experiments))**.",
        ),
        p(
          "Because dedicated **flanking primers** suitable for definitive colony-PCR verification were **not yet available**, the candidate material was retained and no ***P. putida* editing experiment** was initiated; the next experimental campaign was planned to restart the assembly workflow with the **molecular-verification strategy** established in advance.",
        ),
      ]),
      phase("Test", [
        p(
          'The first **Golden Gate transformation did not behave according** to our expected screening logic: **no colonies were recovered from the sample plate**, and although colonies grew from the no-insert control, they did not display the clear green fluorescence expected of intact pMBEC2. This meant the experiment could not be interpreted as a simple "Golden Gate failed" result, the **absence of sample colonies could reflect inefficient assembly, poor transformation or another upstream variable**, while the unexpected control phenotype meant the plate could not independently show what a clearly fluorescent intact-pMBEC2 colony should look like under our imaging conditions.',
        ),
        p(
          "We repeated the transformation with **unmodified pMBEC2 as a positive reference**. Colonies carrying intact pMBEC2 showed strong, clearly distinguishable **green fluorescence**, establishing that the competent cells could maintain the vector and that msfGFP fluorescence could be visualised clearly. Colonies were also recovered from the repeated Golden Gate transformation, but these lacked the strong fluorescence of the intact-vector control, a phenotype compatible with **replacement of the msfGFP cassette, though treated as a screening result rather than evidence of complete guide-array assembly**. Because the Golden Gate material could generate colonies in this repeat, the original empty sample plate could not be attributed uniquely to failed assembly chemistry **([see results](/results))**.",
        ),
        p(
          "The **first colony PCR** using ***ppx*-Fwd** and ***pitB*-Rev** produced predominantly **low-molecular-weight material** rather than a discrete diagnostic product. Re-examining the construct explained why this could not be treated as a failed candidate plasmid: mapping both oligonucleotides against the full assembled ppx–ppkB–pitB sequence showed that each **primer had partial complementarity to several positions across the array**, not only to the single site at its intended end. These oligonucleotides had originally been designed as guide-building primers, not dedicated flanking primers for the complete assembled region, so their binding sites and orientations **did not guarantee the expected full-array amplicon**, the multiple internal binding sites offered an alternative explanation for the low-molecular-weight, non-diagnostic products observed. The material at the bottom of the gel could not be assigned definitively from electrophoresis alone (free primers, primer-dimers, short non-specific products from internal mispriming, or other short products are all compatible); what the gel established is that the **assay did not generate the predefined molecular readout required to verify the guide-array architecture.**",
        ),
        p(
          "We then evaluated **restriction digestion as an orthogonal alternative**, but comparison of candidate and parental architectures did not reveal a practical strategy: **the relevant difference between plasmid forms was only approximately 500 bp (750 bp for GFP versus 433 bp for the assembly), too small** to distinguish reliably on an ordinary agarose gel alongside incomplete digestion and neighbouring fragments of similar size. No available restriction assay provided a sufficiently strong pass/fail criterion to replace colony PCR **([see protocols](/experiments))**.",
        ),
      ]),
      phase("Learn", [
        table(
          ["Failure observed", "Change introduced", "Real learning"],
          [
            [
              cell(
                "The first Golden Gate transformation produced no sample colonies, while colonies from the no-insert reaction were unexpectedly non-fluorescent.",
              ),
              cell(
                "Repeated the transformation using unmodified pMBEC2 as a direct transformation and fluorescence-positive control alongside the Golden Gate product.",
              ),
              cell(
                "A control must validate the specific readout being used; an assembly-background control and a fluorescence-positive control answer different questions.",
              ),
            ],
            [
              cell(
                "The repeated transformation generated Golden Gate colonies with a marked loss of green fluorescence relative to intact pMBEC2.",
              ),
              cell(
                "Retained these colonies only as candidate assemblies and moved to molecular verification.",
              ),
              cell(
                "Loss of the reporter enriches candidates but does not establish guide-array identity.",
              ),
            ],
            [
              cell(
                "Colony PCR using ppx-Fwd and pitB-Rev produced only low-molecular-weight material.",
              ),
              cell(
                "Re-examined the primer-binding sites in silico instead of repeatedly optimising the PCR conditions.",
              ),
              cell(
                "A PCR cannot validate a construct if its primers do not flank the feature that must be tested.",
              ),
            ],
            [
              cell(
                "Dedicated confirmation primers were not yet available, and no sufficiently discriminating diagnostic restriction strategy could be identified for constructs differing by only approximately 500 bp in this region.",
              ),
              cell(
                "Did not proceed to P. putida. The complete CRISPR assembly and verification workflow was scheduled to be repeated with validation designed in advance.",
              ),
              cell(
                "When no available assay can establish construct identity unambiguously, repeating downstream experiments adds uncertainty rather than evidence.",
              ),
            ],
          ],
        ),
        p(
          "The most important learning from Cycle 2 was that **obtaining a plausible assembly and proving what was assembled are separate engineering problems**.",
        ),
        p(
          "The first transformation initially appeared to suggest that Golden Gate itself had failed because the sample produced no colonies. However, the behaviour of the **original no-insert control meant that this conclusion was not justified**. That control could provide information about assembly background, but it did not independently establish whether transformation had worked properly or what the fluorescence phenotype of intact pMBEC2 should look like.",
        ),
        p(
          "Repeating the transformation with **unmodified pMBEC2 as a direct positive reference** separated these questions. The intact vector produced strongly fluorescent colonies, demonstrating that both transformation and msfGFP visualisation were functional. The same Golden Gate preparation **then also produced colonies, showing that the first no-growth result could not be attributed uniquely to failed assembly chemistry.**",
        ),
        p(
          "This broke our first implicit assumption: **A control is only informative for the property it directly tests; one control cannot simultaneously validate assembly background, transformation efficiency and reporter behaviour.**",
        ),
        p(
          "The repeated experiment also showed that fluorescence remained useful as a first screening layer. The Golden Gate colonies displayed reduced fluorescence relative to intact pMBEC2, which was compatible with displacement of the msfGFP drop-out cassette. However, the loss of fluorescence was **not sufficiently sharp to be treated as structural proof**. The experimental record itself noted that the difference was not completely clear and could have been influenced by factors such as colony size.",
        ),
        p(
          "This created an important ambiguity. A weak or incomplete loss of fluorescence could be consistent with several possibilities: **correct replacement of msfGFP, partial or incorrect assembly of the cassette, residual reporter-containing plasmid, or simply an imaging/colony-size effect**. Therefore, fluorescence could enrich candidate colonies, but it could not demonstrate that the full *ppx–ppkB–pitB* array had been assembled correctly.",
        ),
        p(
          "This broke a second implicit assumption: **Loss of fluorescence is a screening phenotype, not a molecular identity test.**",
        ),
        p(
          "The next logical step was therefore to validate the candidate colonies molecularly. We initially used ***ppx*-Fwd and *pitB*-Rev**, assuming that primers associated with the first and last guide modules would amplify across the complete assembled region. However, returning to the in silico plasmid architecture showed that this assumption was incorrect. **These oligonucleotides had been designed to generate guide-building fragments, not as dedicated external primers flanking the complete array.**",
        ),
        p(
          "The hypothesis that: **“primers associated with the first and last guide modules will necessarily provide a diagnostic PCR for the complete assembly”** was therefore rejected.",
        ),
        p(
          "The low-molecular-weight products obtained in this colony PCR could not be interpreted as proof that the Golden Gate colonies themselves were incorrect. The experiment had failed to validate the construct because **the validation assay was not properly designed for the architecture being tested**.",
        ),
        p(
          "We then explored diagnostic restriction as an orthogonal alternative. However, **the parental and candidate plasmid forms differed by only a few hundred base pairs**, and the available restriction maps did not generate sufficiently distinct fragment patterns to provide an unambiguous pass/fail result on a standard agarose gel.",
        ),
        p(
          "This led to a broader conclusion: **A second validation method is only useful if it is deliberately engineered to distinguish the possible molecular outcomes.**",
        ),
        p(
          "By the end of Cycle 2, the unresolved problem was therefore no longer just Golden Gate efficiency. The critical variables now included **control identity, reporter behaviour, primer geometry, expected amplicon architecture, restriction-site distribution and validation depth**.",
        ),
        p("Just as importantly, we established what did not work:"),
        ul([
          "using the first empty Golden Gate plate as evidence of assembly failure,",
          "using fluorescence as structural confirmation,",
          "using guide-building primers as construct-verification primers,",
          "and forcing a restriction strategy when the expected fragment differences were not sufficiently discriminating. Texto pegado",
        ]),
        p(
          "At this point, proceeding directly to ***P. putida* would have added electroporation efficiency, selection in a new host and genome-editing performance as new variables while the identity of the editor plasmid was still unresolved.** We therefore stopped at the molecular-validation gate.",
        ),
        p(
          "However, this did not mean that the workflow had reached a dead end. The ambiguity of the fluorescence phenotype and the lack of a sufficiently discriminating construct-level assay made us reconsider the workflow **one step upstream**. If the final assembly could not yet be validated confidently, then the next iteration should make the **input guide fragments themselves more rigorously testable before Golden Gate**.",
        ),
        p(
          "In the previous PCR workflow, the negative control did not preserve the primer pairs being tested. Therefore, if low-molecular-weight products appeared, we could **not distinguish whether they depended on the pEX128 template or arose from the primers themselves.**",
        ),
        p(
          "We therefore decided to redesign the guide-PCR controls. Instead of using a single general negative control, the next iteration would include a **separate no-template control for each guide pair: ppx, ppkB and pitB**, keeping the corresponding primers present but removing pEX128.",
        ),
        p(
          "The revised engineering principle became: **When downstream validation is ambiguous, move upstream and redesign the earliest assay that can make the next result more interpretable.**",
        ),
      ]),
    ],
  },
  {
    title:
      "Restarting guide amplification with target-specific negative controls",
    phases: [
      phase("Design", [
        p(
          "After Cycle 2, the main unresolved problem was no longer the Golden Gate assembly itself, but the lack of a molecularly verified guide-array construct. **We therefore decided to restart the workflow from the first experimentally testable step: generation of the individual *ppx*, *ppkB* and *pitB* guide fragments.** The previous PCR workflow had used a general negative control that did not contain primers. Although useful for detecting contamination in the common reaction mix, that control could not reveal whether each individual primer pair was itself generating template-independent amplification products.",
        ),
        p(
          "The objective of this iteration was not simply to repeat the guide PCR. It was to make the PCR result **diagnostic**.",
        ),
        p(
          "In the previous workflow, **the negative control omitted primers**. This could identify contamination in shared reagents, but it could not test whether the *ppx*, *ppkB* or *pitB* primer pairs were interacting with each other **in the absence of pEX128 template.**",
        ),
        p("The new design therefore included six reactions:"),
        table(
          ["Target", "Template reaction", "Target-specific NTC"],
          [
            [
              cell("*ppx*"),
              cell("pEX128 + ppx primers"),
              cell("ppx primers + water"),
            ],
            [
              cell("*ppkB*"),
              cell("pEX128 + ppkB primers"),
              cell("ppkB primers + water"),
            ],
            [
              cell("*pitB*"),
              cell("pEX128 + pitB primers"),
              cell("pitB primers + water"),
            ],
          ],
        ),
        p(
          "This control configuration directly tested the hypothesis: **If the observed band is the intended guide amplicon, it should depend on the presence of pEX128 template and therefore be absent from the corresponding NTC.**",
        ),
        p(
          "The expected products remained approximately **130–150 bp**, as in the original workflow.",
        ),
      ]),
      phase("Build", [
        p(
          "Separate **PCR reactions were prepared for *ppx*, *ppkB* and *pitB*, each accompanied by its own no-template control containing the same primers but water instead of pEX128.** This was an important change relative to the previous iteration because it kept the primer pair present in the negative control while removing only the template.",
        ),
        p("The products were then analysed on a **1.2% agarose gel**."),
        p(
          "No Golden Gate assembly was attempted at this stage. We deliberately returned to the guide-building step **because Cycle 2 had shown that downstream assembly cannot be interpreted reliably** if the identity of the DNA entering the reaction is already uncertain.",
        ),
      ]),
      phase("Test", [
        p(
          "The gel did not show the expected behaviour.Instead of obtaining a discrete band in the template-containing reaction that was absent from its corresponding NTC, **similar low-molecular-weight bands appeared in both the target reactions and the no-template controls** for *ppx*, *ppkB* and *pitB*.",
        ),
        p(
          "This changed the interpretation of the experiment substantially. Because these products were generated even when pEX128 was absent, **they could not be attributed specifically to amplification from the template.** The common explanation is a **primer-dependent artefact**, such as primer-dimer formation or another short non-specific PCR product.",
        ),
        p(
          "Primer-dimers can form when primers show partial complementarity, particularly near their 3′ ends. Once annealed to one another, the polymerase can extend them, generating short products that can themselves become templates in later PCR cycles. Primer-dimers often appear in the low-molecular-weight range and that they can compete with the desired amplicon for PCR reagents.",
        ),
        p(
          "Importantly, the gel alone does not prove that every low band was a primer-dimer. The experimentally supported conclusion is narrower: **The PCR generated template-independent low-molecular-weight products, so the expected guide amplification could not be distinguished confidently from primer-derived artefacts.**",
        ),
        p(
          "This was particularly relevant because the intended products themselves are only ~130–150 bp. A **1.2% agarose gel has limited resolving power in this very small size range**, making it harder to distinguish a true guide amplicon from a 50–100 bp primer-derived product. Therefore, the experiment did not meet the guide-building success criterion.",
        ),
      ]),
      phase("Learn", [
        p(
          "The strongest learning from this iteration came from **the redesigned negative controls.** In the previous cycles, low-molecular-weight bands could still be interpreted as potentially arising from poor template quality, short non-specific amplification or degradation. The target-specific NTCs removed much of that ambiguity.",
        ),
        p(
          "Because the same products appeared **without pEX128 template**, template quality was no longer the most plausible dominant variable. The uncertainty shifted to the PCR itself, particularly the interaction between the primers and the amplification conditions.",
        ),
        p(
          "This changed our troubleshooting strategy. We rejected the interpretation: “The guides are not amplifying because the pEX128 template is poor.”",
        ),
        p(
          "and replaced it with: ***“The PCR conditions are allowing template-independent amplification, so the next iteration must first suppress primer-derived products before guide amplification can be judged.”***",
        ),
        p(
          "The experiment also showed why control design is itself part of engineering. **A no-primer control and a no-template control answer different questions.** The first tests contamination in the shared mix; the second tests whether the primer pair produces DNA in the absence of template.",
        ),
        p(
          "By adding one NTC per guide, we made the failure **more informative**.",
        ),
        p(
          "Most importantly, we did not continue into Golden Gate with ambiguous PCR products. Doing so would have added assembly efficiency, transformation, fluorescence screening and construct validation as new variables while the identity of the guide fragments was unresolved. The next build should therefore focus specifically on **PCR specificity**.",
        ),
      ]),
    ],
  },
];