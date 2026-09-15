/**
 * Real content for the "Enzymatic immobilisation" Engineering tab —
 * transcribed verbatim from the team's own write-up (Notion export).
 * Wording and bold/italic emphasis are kept exactly as written — see
 * dbtlData.ts for the `**bold**` / `*italic*` / `{{pending}}` inline
 * markup and the `p`/`ul`/`table`/`cell`/`phase` block helpers reused here.
 *
 * The source frames this as one continuous five-iteration write-up split
 * into two threads — "Enzyme production" (Iterations 1-3) and
 * "Immobilisation chemistry" (Iterations 1-2, its own numbering restarting
 * as its own thread) — rendered as two separate spirals in Engineering.tsx.
 * Each iteration's short framing sentence, which sits between its own
 * heading and its Design/Build/Test/Learn breakdown in the source, is
 * folded into the start of that iteration's Design phase — the data model
 * has no separate slot for it, and Design is where it reads most naturally.
 *
 * One small, deliberate normalisation (not a content change): the enzyme
 * table's merged ("rowspan") cells — activity name and commercial
 * alternative, each spanning two gene rows — are repeated on both rows
 * instead, since the table block has no rowspan support. The data itself
 * is unchanged. The numbered four-gate list in Iteration 1's Build is
 * likewise kept as a plain list with the numbers spelled out in the item
 * text, rather than adding an ordered-list block type for this one use.
 */

import { cell, p, phase, table, ul, type Iteration } from "./dbtlData";

export const ENZYME_PRODUCTION_ITERATIONS: Iteration[] = [
  {
    title: "From a single phosphatase to a screened enzyme panel",
    phases: [
      phase("Design", [
        p(
          "The first decision was not how to make an enzyme, but which enzymes were worth making. What looked like a simple choice, pick an acid phosphatase and move on, became our first engineering cycle once the chemistry of the effluent and the realities of heterologous expression were taken seriously. Over the cycle the limiting consideration shifted from \"which enzyme releases phosphate\" to \"which set of enzymes, together, can mineralise a chemically heterogeneous stream while staying active at pH 5.0 and remaining makeable in *E. coli*\".",
        ),
        p(
          "Our first idea was deliberately minimal: use a single acid phosphatase to strip phosphate from the degumming effluent, or, alternatively, raise the effluent to pH 9 to 10 and use a more common alkaline phosphatase, for which many well-behaved commercial options exist. Before committing to either, we had to check whether those assumptions survived contact with the process.",
        ),
        p(
          "Two problems reshaped the target. The first was the pH of the stream. The effluent leaves acid degumming strongly acidic, and neutralising or basifying it would add reagent cost and, more importantly, a sodium load that we later found to be damaging elsewhere in the system (see Bacterial encapsulation). It was therefore preferable to keep the process between a low native pH 1 and medium bacteria-physiological pH 7: **pH 5.0 and 30 ºC** and to select enzymes that are genuinely active there, rather than to bend the whole process around the enzyme, because keeping the bacteria alive is the rate-limiting step.",
        ),
        p(
          "We began the way the original assumption suggested, with a small manual shortlist of acid phosphatases and hydrolases (**AphA, PhoN and UshA**). It quickly became clear that a hand-picked list could neither guarantee expressibility nor cover the substrate range, so we widened and systematised the search. This took us to the second problem: substrate heterogeneity. The phosphorus in the stream is not present as one compound but distributed across phospholipids, phytate and assorted phosphomonoesters. No single hydrolase cleaves all of these, so a single-enzyme design could only ever mineralise part of the load. The objective of the cycle therefore changed from choosing one enzyme to assembling a **screened panel of complementary activities**.",
        ),
      ]),
      phase("Build", [
        p(
          "To decide which enzyme activivity could be useful, the european patent (EP2488639A1) for acid oil degumming was checked in order to see which main substrates are derived from vegetable oils degumming effluent, so that the activities were matched to the real stream rather than to a textbook phospholipid. Concretely, the selection was designed as a sieve rather than a single query, with four sequential gates ordered from cheapest to most demanding so that most candidates would be removed before any expensive step:",
        ),
        ul([
          "1. A candidate first had to have a sequence deposited in a public database, so that it could be synthesised or amplified.",
          "2. It then had to be expressible in *E. coli*, meaning no dependence on post-translational modifications such as glycosylation that a prokaryote cannot perform.",
          "3. It then had to have at least one literature report of recombinant expression and kinetics, so we were not the first to attempt it.",
          "4. Finally, it had to retain at least **30% of its maximum activity at pH 5.0 and 30 ºC**.",
        ]),
        p(
          "**EnzymeMiner** was adopted to rank candidate sequences for each activity by their predicted solubility and expressibility, which directly addressed the risk that most concerned us, and this was complemented with targeted queries in **BRENDA** and **UniProt**. Several activities were pursued in parallel and the four sequential filters were applied for each type.",
        ),
        p(
          "In parallel with this sieve, and as a deliberate second arm of the design, a commercial homologue was to be identified for every activity, so that a single expression failure could not leave an activity uncovered. The variables we considered most important were therefore activity coverage across the substrate classes, acid tolerance, expressibility, sequence availability and the absence of post-translational requirements, and we expected the design to converge on a short, redundant list with at least two representatives per activity.",
        ),
      ]),
      phase("Test", [
        p(
          "The european patent showed four kinds of hydrolases: type A and type C phospholipases, non-specific acid phosphatases and phytases, that between them cover the substrate range and that are compatible with the operating window and with immobilisation for reuse.",
        ),
        p(
          "The screen behaved as a funnel with a very steep middle. EnzymeMiner returned **3,741** sequences across the four activities. Restricting these to prokaryotic representatives, roughly forty per activity chosen by hand, brought the pool to **160**. Cross-referencing BRENDA and UniProt for evidence of recombinant expression and kinetics removed a further third, leaving **102** candidates that were at least documented as makeable. The decisive gate was the catalytic profile: only **13** of those 102 retained useful activity at pH 5.0 and 30 ºC. From these, **7** were selected to guarantee at least two representatives per activity, EstE1 for PLA, Plc and CerA for PLC, AppA and PhyA for the phytases, and M2-32 and AphA for the non-specific acid phosphatases, each paired with a commercial homologue held in reserve. The single most informative figure was not the final seven but the collapse from 102 to 13: most enzymes that could be cloned simply do not work in acid at moderate temperature.",
        ),
        table(
          ["Enzyme activity", "Gene", "Microorganisms of origin", "Alternative Commercial"],
          [
            [cell("Phospholipase C (PLC)"), cell("plc_Tk"), cell("*Thermococcus kodakarensis*"), cell("*Clostridium perfringens or Bacillus cereus* plc *[Sigma aldrich]*")],
            [cell("Phospholipase C (PLC)"), cell("*cerA_Bc*"), cell("*Bacillus cereus*"), cell("*Clostridium perfringens or Bacillus cereus* plc *[Sigma aldrich]*")],
            [cell("Phospholipase A (PLA)"), cell("*estE1_MG*"), cell("Metagenome"), cell("Lecitase® Ultra (PLA1) or pancreatin (PLA2) [Merck Millipore]")],
            [cell("Phytase"), cell("*appA_Yi*"), cell("*Yersinia intermedia*"), cell("Axtra® PHY [IFF] or Ronozyme® HiPhos [Novonesis]")],
            [cell("Phytase"), cell("*phyA_Op*"), cell("*Obesumbacterium proteus*"), cell("Axtra® PHY [IFF] or Ronozyme® HiPhos [Novonesis]")],
            [cell("Acid Phosphatase (NAP)"), cell("*M2-32_MG*"), cell("Metagenome"), cell("Acid phosphatase from potatoes or wheat germ [Merck]")],
            [cell("Acid Phosphatase (NAP)"), cell("*aphA_Ec*"), cell("*Escherichia coli*"), cell("Acid phosphatase from potatoes or wheat germ [Merck]")],
          ],
        ),
      ]),
      phase("Learn", [
        p(
          "The most important result of this cycle was that our definition of the target changed. We rejected the assumption that a single enzyme, or a convenient pH adjustment, could do the job, because the substrate heterogeneity of the stream makes that a design that is incomplete by construction. We also learned where the real scarcity lay. Sequence availability was not the bottleneck; the operating window was. The collapse from 102 to 13 told us that most catalytically suitable enzymes are ruled out not by whether they exist or can be cloned, but by whether they still work in acid at moderate temperature.",
        ),
        p(
          "Two consequences framed everything that followed. First, because producing seven heterologous enzymes carries real risk, the commercial backups were kept rather than discarded. Second, and decisively for how the block was organised, the immobilisation chemistry could not wait for these enzymes to be produced and purified in quantity, which pointed towards developing that chemistry on a plentiful commercial model enzyme instead. The work therefore split into a **production thread** (this and the next two cycles) and an **immobilisation-chemistry thread** (the second section below).",
        ),
        p(
          "Our design rule for this cycle became: match the enzyme set to the actual substrate mixture and to the operating window before committing anything to expression, and keep a fallback for every activity. With the panel now defined, the next question was no longer which enzymes to make, but whether we could make them at all. That became the starting condition for Cycle 2.",
        ),
      ]),
    ],
  },
  {
    title: "First expression attempt and the solubility problem",
    phases: [
      phase("Design", [
        p(
          "With the panel chosen, the question moved from \"which enzymes\" to \"can we make them\". What we expected to be a routine expression step became a cycle when strong expression did not translate into usable protein, and when one of the activities turned out to poison the host that was supposed to produce it.",
        ),
        p(
          "The objective was to express the seven enzymes in *Escherichia coli* and recover them in **soluble** form, which is the only that can later be purified and immobilised. We compared two induction regimes, chemical induction with **IPTG** and **ZY auto-induction**, both at 20 ºC, on the reasoning that a lower temperature slows translation and gives nascent chains more time to fold.",
        ),
        p(
          "The comparison was designed so that induction method would be the only deliberate difference between arms. Each construct was grown from a common overnight pre-inoculum and seeded to the same low starting density, then split between the two regimes: the IPTG arm was grown to mid-exponential phase and induced with a saturating 1 mM IPTG before an overnight incubation at the reduced 20 ºC, while the auto-induction arm was simply left in ZY medium, whose glucose is consumed first and whose lactose then induces the system automatically as the culture reaches high density, so it needs no timed addition. Every culture was then sampled and run by SDS-PAGE as paired **total** and **soluble** fractions, with empty-vector lanes as references, so that we could read overexpression from the total fraction and folding from the soluble one. One further design choice protected the interpretation: because the Addgene genes had arrived in different backbones, they were re-cloned into the **same pET vectors** as the synthesised genes, so any later difference in expression could be attributed to the enzyme and not to the plasmid. The contingency was also written in advance: if the soluble fractions came up empty, chaperone co-expression would be the first response and disulphide-bridge dependence would be checked, because it dictates the redox environment a protein needs to fold. The variables were induction method, induction temperature, vector background and, as a risk rather than a lever, host toxicity, and we expected a clear winner between the two induction methods and detectable protein in the soluble fraction.",
        ),
      ]),
      phase("Build", [
        p(
          "Constructs were obtained either by de novo synthesis in the pET backbone (GCAT Bio) or by PCR amplification from Addgene, and cloned into **pET-22b(+)** or **pET-28a(+)** according to the His-tag position predicted from SWISS-MODEL homology models visualised in PyMOL, with disulphide bridges mapped in silico using a 2.5 Å cutoff (link to the Experiments page). Clones were verified by colony PCR against the SnapGene simulation, and expression was induced with IPTG or ZY auto-induction at 20 ºC and read by SDS-PAGE of the total and soluble fractions.",
        ),
        p(
          "One episode from this build is worth recording, because it changed how we read every gel afterwards. A promising band initially looked like a successful result, but it turned out to be a false positive traced to an incubator that had been left off overnight. The apparent success was an artefact of uncontrolled conditions, not of the construct.",
        ),
      ]),
      phase("Test", [
        p(
          "Read on the total-fraction gels, IPTG gave the stronger result: for the five synthesised constructs it produced markedly denser bands at the expected masses than auto-induction at the same temperature, so IPTG was carried forward and the finding extrapolated to the two Addgene constructs. The problem appeared when the same samples were run as soluble fractions. The bands that had been obvious in the total fraction were essentially absent from the soluble lanes, which meant the enzymes were being made in quantity but partitioning almost entirely into **inclusion bodies**.",
        ),
        p(
          "The phospholipases C failed in a more physical way. Cultures of Plc from *Thermococcus kodakarensis* and CerA from *Bacillus cereus* that had grown normally in the evening had collapsed by the following morning, their optical density having fallen sharply after IPTG addition. For CerA the loss could be partly offset by scaling the culture up roughly thirty-fold to recover a workable amount of biomass; for Plc even that did not help. The pattern, growth arrest and lysis immediately after induction, pointed to genuine cytotoxicity rather than a tunable expression fault. Against this, the false-positive band mentioned above was a useful reminder: on repetition under controlled conditions it did not reappear, confirming that it had reflected the incubator failure and not real expression.",
        ),
      ]),
      phase("Learn", [
        p(
          "The central lesson was that expression yield was never the problem; folding was. Good bands on a total-fraction gel had masked the fact that nothing was folding correctly, and this redirected the whole thread away from \"express more\" and towards \"fold what we express\". The engineering question changed from \"can we express these enzymes?\" to \"can we get them folded and soluble?\".",
        ),
        p(
          "The phospholipase C result taught a different kind of lesson. Its toxicity is a property of the enzyme, hydrolysing the host's own membrane phospholipids, not a parameter we could tune, so no change of promoter, temperature or medium would rescue it in a living cell. We therefore stopped trying and rerouted PLC to propose cell-free **IVTT (In Vitro Transcription and Translation)**, a system that does not depend on host viability. Recognising that a problem is not fixable within the current system, and moving it to a different system rather than optimising the wrong variable, was itself part of the engineering.",
        ),
        p(
          "The false positive was a measurement-integrity lesson rather than an experimental one. It showed that an apparent result has to be traceable to controlled conditions before it can be trusted, and from that point every positive band was read against its controls before it was acted upon. Our design rule became: treat expression and solubility as two distinct engineering problems, and verify every positive against a control before building on it. The unresolved problem, folding, became the starting condition for Cycle 3.",
        ),
      ]),
    ],
  },
  {
    title: "Rescuing soluble, folded enzyme",
    phases: [
      phase("Design", [
        p(
          "The question was now folding. What could have been a single fix, simply lowering the temperature further, instead became a staged search across temperature, chaperones and host strain, because the enzymes were not failing to fold for the same reason.",
        ),
        p(
          "The objective was to shift the folding kinetics inside the cell so that the recalcitrant enzymes could reach their native state, and we planned three levers rather than one, each addressing a different cause of misfolding. Raising the induction temperature to **30 ºC** was intended to slow synthesis relative to 37 ºC while keeping growth reasonable. Co-expressing molecular **chaperones**, the ribosome-associated Trigger factor and the GroES/GroEL complex, was intended to stabilise emerging chains and to give partly folded protein an isolated environment in which to complete folding. **Switching chassis** to strains with an oxidising cytoplasm and rare-codon tRNAs (Origami 2, Rosetta-gami 2 and SHuffle T7) was aimed squarely at the enzymes that the in silico analysis had flagged as disulphide-dependent, since those cannot form their structural disulphides in a standard reducing cytoplasm.",
        ),
        p(
          "The three levers were designed to be tested in parallel rather than one after another, so that we were not gated on the slowest arm, and each was read by the same criterion as Cycle 2: a band appearing in the **soluble** fraction, not merely in the total one.",
        ),
      ]),
      phase("Build", [
        p(
          "The routing was decided in advance from the in silico map. The disulphide-dependent candidates (AppA, PhyA and M2-32) were sent to the oxidising strains, where their structural bonds could form, while the remainder stayed in the standard chassis; a codon-usage analysis added the rare-codon strains for the sequences whose codon bias could throttle both yield and folding. The variables were therefore induction temperature, chaperone identity, host redox environment and codon usage, and we expected to recover soluble protein at least for the tractable targets, ideally along the lines the disulphide predictions had anticipated.",
        ),
        p(
          "The strategies were applied in parallel: IPTG at 30 ºC, chaperone co-expression at 20 ºC, and the alternative strains for the disulphide-dependent candidates. During this period the Addgene amplification that had failed earlier was recovered by **reducing the amount of template** in the PCR, a small change that removed one of the remaining blockers.",
        ),
      ]),
      phase("Test", [
        p(
          "The rescue worked selectively, and the successful conditions matched the structural predictions. Raising the temperature to 30 ºC and adding Trigger factor alone moved little into the soluble fraction. The **GroES/GroEL** complex, however, produced a clear soluble band for the non-specific acid phosphatase **M2-32**. The two disulphide-dependent enzymes needed the engineered oxidising strains: the phytase **PhyA** appeared in the soluble fraction of **Rosetta-gami 2**, whose combination of an oxidising cytoplasm and rare-codon tRNAs matched both its disulphide requirement and its codon-usage flag, while **AphA** was recovered soluble from **BL21 (DE3)**.",
        ),
        p(
          "The three soluble enzymes were then taken through IMAC on Ni-NTA and monitored by SDS-PAGE at each step. For PhyA and M2-32 the intermediate wash at 20 mM imidazole stripped the contaminant bands without displacing the target, and the elution, dialysis and concentration fractions each showed a single clean band, so both were judged pure to electrophoretic homogeneity. AphA behaved differently: its crude extract and flow-through looked normal, but the elution and downstream fractions showed only faint bands, indicating a much lower recovery, though still enough to characterise.",
        ),
        p(
          "The activity assay confirmed all three were functional but reordered them. Followed as bis-pNPP hydrolysis at pH 5.0 and 30 ºC, the raw time courses suggested PhyA was clearly the strongest, accumulating about **27 µM** of p-nitrophenol at thirty minutes against roughly **11 µM** for M2-32 and AphA, which tracked each other closely. Bradford quantification then showed why that reading was misleading: the assays had not contained equal amounts of enzyme, with protein loads of 0.337 mg/mL for M2-32, 0.299 mg/mL for PhyA and only 0.186 mg/mL for AphA. Normalising activity by protein reversed the apparent ranking, giving specific activities of **AphA 0.222 U/mg, M2-32 0.161 U/mg and PhyA 0.141 U/mg**. AphA had reached essentially the same product as M2-32 while using roughly 45% less enzyme mass (0.015 against 0.027 mg), which is what made it the most efficient of the three per unit mass.",
        ),
      ]),
      phase("Learn", [
        p(
          "We secured a soluble, characterised sub-panel of three acid phosphohydrolases, with AphA the most efficient per unit mass and AphA and PhyA identified as the key components for the recovery bioreactor. Just as important as what worked was what we chose not to do: once these three were in hand we stopped escalating, and the enzymes that resisted solubilisation, including EstE1 and AppA, were left as the practical limit of the panel rather than pursued indefinitely. Knowing when a rescue effort has delivered enough is part of the engineering discipline, not a concession.",
        ),
        p(
          "The cycle also closed a loop opened much earlier. The disulphide-bridge predictions made in silico were not decoration; they told us in advance that PhyA and the other disulphide-dependent enzymes would need an oxidising chassis, and the fact that Rosetta-gami 2 specifically rescued PhyA is what turned that prediction into a result. The characterisation carried its own lesson too: because raw product accumulation and specific activity ranked the enzymes in opposite orders, the assay had to be normalised by protein before it meant anything. Our design rule became: match the folding environment to the predicted structural needs of each enzyme, escalate rescue strategies only as far as a given target actually requires, and never rank biocatalysts on raw activity without normalising for how much enzyme is present.",
        ),
        p(
          "By the end of the production thread we had characterised enzymes but not in the quantities needed to explore immobilisation chemistry, and reproducing that chemistry on scarce, hard-won protein would have been wasteful. The next question was therefore not about the panel at all, but about how to develop the immobilisation chemistry on something plentiful. That became the starting condition for the immobilisation-chemistry thread.",
        ),
      ]),
    ],
  },
];

export const IMMOBILISATION_CHEMISTRY_ITERATIONS: Iteration[] = [
  {
    title: "A model enzyme, a model support and a workable assay",
    phases: [
      phase("Design", [
        p(
          "The immobilisation study could not wait for the panel to be produced at scale, and it needed a support simple enough to iterate on quickly and cheaply. What looked like a preparatory setup, choose an enzyme and make a support, became a cycle in its own right, because the model enzyme's behaviour in solution and a measurement constraint both had to be resolved before any immobilisation yield could be trusted.",
        ),
        p(
          "Developing an immobilisation chemistry demands two things at once: an enzyme available in bulk, and a support that is fast to make and well understood. We chose the commercial chimera **Lecitase Ultra** for both reasons and for a third. It is available in large amounts, and it is the hardest case we could realistically pick, with an active site capped by a lid that opens only on contact with a hydrophobic interface and a strong tendency to form dimers in solution. The reasoning was that a chemistry able to preserve the activity of this demanding enzyme should generalise readily to the simpler, more hydrophilic members of the panel. The support was **MANAE-agarose**, activated where needed with glutaraldehyde, an inexpensive and previously optimised model whose glutaraldehyde crosslinking plays the same amino-reactive role that genipin will play on the final sphere, so that conclusions drawn here transfer to the real device.",
        ),
        p(
          "The cycle also had to solve a measurement problem before any kinetics could be believed. Because immobilisation has to be watched in real time as enzyme leaves solution, an end-point assay was unsuitable, and we adopted **p-nitrophenyl butyrate (pNPB)** read continuously at 348 nm as the standard readout for the immobilisation work. The characterisation itself was designed around two orthogonal measurements, Bradford against a BSA standard curve for protein and the continuous pNPB assay for activity, with the concentrated stock serially diluted so that both readouts fell inside their linear ranges rather than saturating the detector. This was a deliberate choice of measurement method, not a detail: the reporter had to suit the condition, or every downstream yield would have been measured against an unreliable baseline. The variables we expected to matter were the choice of model enzyme, the support chemistry, the assay substrate and wavelength, and the dilution range needed to reach the linear range of the protein assay. We expected the cycle to deliver a characterised enzyme stock as a baseline, a working support, and a trustworthy continuous assay.",
        ),
      ]),
      phase("Build", [
        p(
          "MANAE-agarose was prepared from BCL agarose by epoxide activation with glycidol, periodate oxidation to a glyoxyl agarose, amination with ethylenediamine and reduction of the resulting Schiff bases with sodium borohydride, leaving a support carrying positively charged secondary amino groups. The Lecitase Ultra stock was characterised by Bradford, using serial dilutions to reach the linear range of the standard curve, and by the pNPB assay. A first immobilisation was then run on the glutaraldehyde-preactivated support at a low loading of 1 mg enzyme per gram of support, chosen so that the chemistry, and not diffusional crowding, would govern the result.",
        ),
      ]),
      phase("Test", [
        p(
          "The characterisation gave us a firm baseline. Against a BSA standard curve spanning roughly 0.18 to 0.91 mg/mL, the concentrated stock had to be diluted serially before it fell within the linear range, and of the dilutions tried the 1:60 gave the lowest scatter and was taken as the reference point, placing the stock at about **40 mg/mL**. Run in duplicate, the continuous pNPB assay gave total activities of about 31.7 and 33.5 U and, once divided by protein, specific activities of 969.6 and 992.0 U/mg, a mean of about **981 U/mg**. With that baseline fixed, the first immobilisation on the glutaraldehyde-preactivated support gave a distorted, lower-than-expected retention rather than the clean, high-yield result the covalent chemistry had led us to expect.",
        ),
      ]),
      phase("Learn", [
        p(
          "The model system and the baseline were in place, and the assay constraint had been solved by choosing the right reporter substrate. The more important outcome was how we read the distorted first result. Rather than treating it as a failed protocol to be repeated, we read it as information about the enzyme itself, specifically its tendency to dimerise and to switch its lid between open and closed states depending on its environment. That reframing changed the engineering question from \"does the support bind the enzyme?\", which it plainly did, to \"in what conformation is the enzyme captured, and does that conformation still work?\".",
        ),
        p(
          "The assay decision carried its own lesson, parallel to a recurring theme in this project: a measurement method has to be matched to the conditions it is used in, or it silently corrupts everything measured through it. Our design rule for this cycle became: characterise the model system and fix a trustworthy readout before interpreting any yield, and treat an anomalous first result as a clue about the system rather than as noise to be averaged away. That clue, dimerisation and conformational switching, defined the design of the final cycle.",
        ),
      ]),
    ],
  },
  {
    title: "Two immobilisation geometries and the detergent variable",
    phases: [
      phase("Design", [
        p(
          "The distorted first result had pointed directly at the enzyme's conformation. What might have been a single \"optimise the covalent attachment\" step therefore became a comparison of two anchoring geometries crossed with a detergent, because the enzyme's open and closed states made the same reagent helpful in one geometry and harmful in the other.",
        ),
        p(
          "In order to study by which of its residues better attached the enzyme, two immobilisation geometries were compared. In the first, **direct covalent attachment**, the enzyme is bound through its surface lysines to a glutaraldehyde-preactivated support. In the second, **ionic adsorption followed by crosslinking**, the enzyme is first allowed to adsorb and orient itself on the bare support and is only then fixed with glutaraldehyde. The **detergent Triton X-100** was introduced as a deliberate variable, because Lecitase Ultra forms bimolecular aggregates through its exposed hydrophobic regions and because interfacial activation shifts its lid between open and closed states; the detergent was expected to change which conformation is present when the enzyme is fixed. The explicit hypothesis was that the two geometries would not share the same optimal detergent condition, so the experiment was designed as a two-by-two, each geometry run both in plain buffer and in 0.1% Triton X-100, from the same enzyme stock and support batch so the four arms were directly comparable.",
        ),
        p(
          "The measurement was designed to separate what was bound from what was merely present. Activity was read in the whole **suspension**, which reports free plus bound enzyme, and in the clarified **supernatant** after a brief spin, which reports only the enzyme still free in solution; their difference is the immobilised activity and their ratio is the yield. A **free-enzyme control**, incubated without support under the same conditions, was run in parallel so that any loss of activity could be attributed to immobilisation rather than to buffer effects or denaturation, and the two routes were sampled on their own timescales, minutes for the fast covalent capture and hours for the slower adsorption and maturation.",
        ),
      ]),
      phase("Build", [
        p("Both strategies were run in parallel in standard buffer and in 0.1% (v/v) Triton X-100."),
        table(
          ["Strategy", "Support activation", "Immobilisation", "Crosslinking", "Detergent tested"],
          [
            [
              cell("A: covalent"),
              cell("glutaraldehyde-preactivated"),
              cell("direct covalent via lysine ε-amino groups"),
              cell("10% glutaraldehyde (activation)"),
              cell("± 0.1% Triton X-100"),
            ],
            [
              cell("B: adsorb and crosslink"),
              cell("none (bare MANAE)"),
              cell("ionic adsorption, 25 mM potassium phosphate pH 7, 25 ºC"),
              cell("0.5% glutaraldehyde (1 h, then 20 h maturation)"),
              cell("± 0.1% Triton X-100"),
            ],
          ],
        ),
        p(
          "Immobilisation was followed by measuring activity in the whole suspension and in the clarified supernatant, taking their difference as the immobilised activity and their ratio as the yield, with a free-enzyme control to separate immobilisation from denaturation.",
        ),
        p(
          "To interpret whatever we found, the open and closed conformations of the enzyme were to be modelled in PyMOL as a separate, structural arm of the design, mapping the catalytic triad (Ser146, Asp201, His258), the lid (residues 80 to 95), the reactive lysines nearest the active site (Lys24, Lys259) and the acidic crown at the base (Asp27, Glu56, Asp57, Asp62). The variables were the mode of activation, the choice between adsorption and direct covalent attachment, the presence of detergent, and the concentration and timing of the crosslinker, and we expected to identify the geometry and condition that retained most activity and to be able to explain it structurally rather than merely record it.",
        ),
      ]),
      phase("Test", [
        p(
          "The two geometries behaved in different ways, and the time courses made the contrast clear. On the preactivated support without detergent, the activities of the suspension and of the supernatant fell together only gradually over about fifty minutes, ending close to one another around 0.013 to 0.016 U: little enzyme had actually been fixed, and the yield settled near **20%**. Adding Triton X-100 changed this completely: the supernatant activity dropped steeply within the first ten to twenty minutes as the enzyme was captured, and the yield climbed to almost **80%**, corresponding to an immobilised activity of about **0.0053 U**.",
        ),
        p(
          "The adsorption-then-crosslink route showed the mirror image. Without detergent, the suspension activity actually rose over the twenty-four to forty-eight hour window, from roughly 0.02 to about 0.057 U, as the crosslinking consolidated bound enzyme and captured further monomers from solution, while the supernatant stayed low and flat around 0.013 U; the yield reached almost **80%** at an immobilised activity of about **0.0448 U**, roughly **ten times** that of the preactivated route from the same enzyme and support. With Triton X-100 the same route stalled at a lower plateau, around **45%** yield.",
        ),
        p(
          "The modelling resolved why the detergent helped one geometry and hurt the other. Mapping the open and closed forms placed the catalytic triad (Ser146, Asp201, His258) at the base of a pocket capped by the lid (residues 80 to 95). On the preactivated support without detergent, the enzyme is closed, and the lysines flanking the lid, Lys24 and Lys259, are exactly the residues that react with the aldehyde surface, so the lid is pinned shut and the enzyme is fixed inactive. With detergent, interfacial activation holds the lid open as those same lysines are anchored, locking the enzyme in its active form. In the adsorption route the enzyme instead docks through an acidic crown at its base (Asp27, Glu56, Asp57, Asp62), which projects the active site and lid away from the surface and leaves the lid free to move; adding detergent here disrupts that electrostatic docking, so the subsequent crosslinking freezes a disordered, low-activity arrangement.",
        ),
      ]),
      phase("Learn", [
        p(
          "The winning strategy was **ionic adsorption followed by crosslinking, carried out in the closed conformation and without detergent**, which retained about ten times the activity of the preactivated covalent route. Two general lessons came out of the numbers. First, the detergent was not a universally good or bad additive; it was decisive and opposite for the two geometries, which is exactly what made testing it against both, rather than assuming a single effect, the right decision. Second, and more sharply, yield alone was misleading. Both winning conditions reached about 80% yield, yet their retained activities differed roughly tenfold, which told us that percentage bound is the wrong figure of merit and that **activity retention** is the metric that actually matters for a biocatalyst.",
        ),
        p(
          "The deeper shift was conceptual. The engineering question moved from \"how do we bind the enzyme to the support?\", which is easy, to \"how do we bind it without blocking the motion its catalysis depends on?\". Our design rule became: choose the immobilisation geometry from the enzyme's conformational mechanism, not from the generic assumption that more covalent bonds give a better derivative, and always measure retained activity rather than the amount bound.",
        ),
        p(
          "This chemistry, ionic adsorption followed by crosslinking in the closed conformation, is the one carried forward to the alginate-chitosan-genipin sphere, with **genipin**, a far less cytotoxic crosslinker compatible with the encapsulated bacteria, replacing glutaraldehyde. That transfer closes the loop with the Bacterial encapsulation and Genetic engineering blocks: the enzymes produced in the first thread, immobilised by the chemistry established in the second, form the functionalised surface that feeds phosphate to the engineered organism inside the sphere.",
        ),
      ]),
    ],
  },
];
