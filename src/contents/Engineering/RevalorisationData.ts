/**
 * Real content for the "Revalorisation" Engineering tab — transcribed from
 * the team's own write-up (Notion, "WIKI / Engineering / Revalorisation",
 * the section under "Engineering: Revalorisation"). The drafting scaffold
 * above that heading on the same page (the "Posibles iteraciones" notes and
 * the Spanish "Aquí meter…" Design/Build/Test/Learn templates) is the
 * team's internal planning, not page content, and is not reproduced.
 *
 * Deliberate, non-content-altering transcription choices (following the
 * precedents documented in GeneticEngineeringData.ts):
 * - Species names that the source sets in bold *and* italic at once (e.g.
 *   "***Citrobacter freundii***") are rendered italic only, since
 *   renderRich's inline markup doesn't nest. Where such a name closes a
 *   longer bold run ("**BcPPK2 III from *Burkholderia cenocepacia***"),
 *   the bold is kept on the rest of the run and the name is italic.
 * - Iteration 4's source combines its last two phases under one
 *   "Test / Learn" heading. The DBTL spiral needs four phases, so that text
 *   is split at its own sentence boundary: the "still in progress, no data
 *   yet" sentence under Test, everything from "What we take from it so
 *   far…" under Learn. No wording is changed.
 * - The block intro and the closing Reflection are written inline in
 *   Engineering.tsx, around the spiral (same as the other blocks' intros).
 */

import { p, phase, type Iteration } from "./dbtlData";

export const REVALORISATION_ITERATIONS: Iteration[] = [
  {
    title: "Selecting and coupling PPK2 and DHAK",
    phases: [
      phase("Design", [
        p(
          "The problem we were solving was essentially a search problem before it was a molecular biology problem: which molecule, out of everything polyphosphate could plausibly be turned into, was actually worth building toward? We began by mapping industrial and environmental targets into **three categories** that ended up guiding every decision afterwards: **sustainable targets** (agriculture, green-sector applications), **economic targets** (direct monetary value), and **strategic targets** (precursors that feed back into our own process, reinforcing circularity). In parallel, we looked for research groups who had already attempted something similar, on the logic that if a route to a valuable product already existed in the literature, we should understand it before inventing our own. We found one: a group that had converted polyphosphate into **glucose 6P**, a molecule with real value in biotech and pharma as a precursor for glucose-based assays, cofactor regeneration and fermentation feedstocks. The problem was that this group was **based in China**, which made getting hold of their enzymes or plasmids within our timeline close to impossible, so we went local instead, and that is how we found **Eduardo García Junceda's group at IQOG-CSIC**.",
        ),
        p(
          "Eduardo and **Israel Sánchez Moreno** had spent years comparing different ATP regeneration strategies built around different phosphate donors: **acetate kinase** with acetyl phosphate, **pyruvate kinase** with PEP, and **polyphosphate kinase** with polyP itself. Of these, **PPK2** was the obvious fit for us, not because it was the most established, but because polyphosphate is **dramatically cheaper** than the other donors, and it was already the exact molecule we needed to get rid of. Using it for ATP regeneration meant our **waste stream and our energy source became the same thing**. PPK2 phosphorylates nucleotides using polyP as the donor, which gave us a way to drain accumulated polyP from the bacteria while building up ATP at the same time. Our concrete objective for this iteration was to **identify a specific polyphosphate kinase, and a specific downstream enzyme, that we could couple into a single system** converting waste polyP into a defined, valuable end product.",
        ),
      ]),
      phase("Build", [
        p(
          "After extensive discussion with the group, we selected **BcPPK2 III from** *Burkholderia cenocepacia* for three concrete reasons. It **accepts both AMP and ADP** as substrates, so our regeneration module can plug into downstream enzymes regardless of which nucleotide they release. It is **operationally robust**, reported to combine thermostability with activity across **pH 6.0–9.0**, which matters if we ever want this to scale. And it had already been **characterised in-house by Día**, one of the group's PhD students, whose paper on this exact enzyme gave us a validated starting point plus ready-made *E. coli* glycerol stocks, meaning we only had to express and purify it rather than clone it from scratch.",
        ),
        p(
          "With a way to consume polyP established, we still needed a downstream enzyme to turn the regenerated ATP into something of value. Going back through the group's publications, we found **DHAK**, dihydroxyacetone kinase from *Citrobacter freundii*, which phosphorylates dihydroxyacetone (DHA) into **dihydroxyacetone phosphate (DHAP)** using ATP. Choosing DHAP as our target was not arbitrary: it sits at a **strategic branch point in central metabolism**, and its reactivity opens the door to **rare sugars and iminosugars**, two product classes with established pharmaceutical and biotech markets, which felt like a far more strategic outcome than glucose 6-phosphate on its own, since it opens a whole synthetic route rather than a single end product. The trade-off is that **DHAP is chemically labile**, reactive enough that it is best consumed quickly by a coupled downstream reaction rather than accumulated and isolated, which is part of why building a **multi-enzyme system in-line** made more sense than trying to produce DHAP as a standalone product. Coupling the two enzymes gave us a full cycle: **PPK2 turns polyP into ATP** from AMP or ADP, and **DHAK captures that ATP almost immediately to produce DHAP**. As far as we know, **this exact enzyme pairing had never been put together before**.",
        ),
      ]),
      phase("Test", [
        p(
          "At this stage, the test was less a wet-lab measurement and more a **stress test of the design logic itself**, and the system passed it on paper: the two enzymes' substrate and cofactor requirements matched cleanly, BcPPK2 III's dual AMP/ADP acceptance meant it did not constrain which of the two nucleotides DHAK's ATP output cycle could rely on, and its pH tolerance was compatible with the conditions the coupled reaction would need to run under. Where the design was tested against reality rather than against itself, it **did not hold up**: once we researched DHAK's mechanism more deeply, we found it was **fairly unstable**, which is a real problem if scaling the system up is the point.",
        ),
      ]),
      phase("Learn", [
        p(
          "The core learning from this iteration was less about any single enzyme and more about **how we arrived at the pairing at all**. Choosing DHAP over glucose 6-phosphate, and landing on PPK2 and DHAK specifically, came out of **deliberately searching for existing work before assuming we needed to invent from scratch**, and then adapting when the most obvious lead (the Chinese group) turned out to be logistically unreachable within our timeline. That search-first approach is what let us find a **genuinely novel enzyme pairing** rather than reproducing an existing one. But it also surfaced the next problem directly: **instability is not something you can spot by matching substrate specificities and pH ranges on paper**, it only shows up once you look closely at the enzyme's actual behaviour, and DHAK's instability is what pushed us into the next iteration.",
        ),
      ]),
    ],
  },
  {
    title: "PROSS design for DHAK stability",
    phases: [
      phase("Design", [
        p(
          'The problem was narrow and specific: could we make **DHAK more stable without breaking the activity** that made it useful in the first place? Our proposal was to use **PROSS**, a structure-based algorithm that proposes combinations of point mutations predicted to increase thermodynamic stability while **explicitly protecting residues flagged as functionally important**. The reasoning was that a purely stability-driven redesign risks silently damaging function even when it protects the residues that directly contact the ligand, since stability and activity depend on more than just the active-site pocket. Before running the design, we **mapped DHAK\'s active site on its crystal structure in PyMOL** specifically to make sure that mapping was correct going into PROSS. Our concrete objective for this iteration was not "improve DHAK", it was to **identify a specific PROSS variant that retained wild-type-comparable activity while presumably gaining stability**, testing one candidate at a time rather than assuming the mutation load and functional outcome would scale together.',
        ),
      ]),
      phase("Build", [
        p(
          "PROSS returned **ten candidate variants**, ranging from the most conservative to the most aggressive in terms of mutation count. As a first attempt, we chose **design 5**, sitting deliberately in the middle of that range rather than at either extreme, on the assumption that a moderate mutation load would be enough to gain stability without being aggressive enough to disturb function.",
        ),
      ]),
      phase("Test", [
        p(
          "When we tested design 5, it showed **barely any activity at all**. This was a clear, unambiguous test result: whatever stability the design had gained, it had come at a **cost we were not prepared to accept**.",
        ),
      ]),
      phase("Learn", [
        p(
          "After talking it through with **Israel**, our mentor at IQOG-CSIC, we concluded that even with the ligand-contact residues explicitly protected, the **sheer number of mutations in design 5** had probably disrupted the overall geometry around the active site, or the packing between domains, enough to hurt function, even though the stability itself was likely genuinely improved. That distinction mattered: it told us the failure was **not evidence against PROSS** or against redesigning DHAK at all, it was evidence that we had picked **too aggressive a starting point** on the conservative-to-aggressive spectrum PROSS gave us. So rather than treating the whole PROSS approach as a dead end, we decided to **keep working with the wild-type enzyme in the meantime** while selecting a **more conservative variant** to test next, favouring a smaller, safer step toward stability over a bigger one that risked losing activity altogether. Looking further ahead, we are also exploring a **SpyCatcher–SpyTag fusion system** to physically link PPK2 and DHAK into a single artificial multi-protein complex, positioning the two active sites so **substrate can channel directly between them**, a further step meant to boost the efficiency of the coupled reaction once we have a stable DHAK variant to build it around.",
        ),
      ]),
    ],
  },
  {
    title: "From IMAC to FPLC for DHAK purification",
    phases: [
      phase("Design", [
        p(
          "Before we could test DHAK's activity, stability or anything else, we needed **pure protein** in hand, and our starting assumption was that a His-tagged construct would purify cleanly by standard **IMAC** (immobilised metal affinity chromatography), the default first choice for a His-tagged enzyme and the method the rest of the group's proteins had been purified with. Our concrete objective for this iteration was simply to obtain a **single, clean DHAK band of sufficient purity and yield** to use in downstream activity assays, since without that, none of the earlier design work on the enzyme pairing or the PROSS variants could actually be tested.",
        ),
      ]),
      phase("Build", [
        p(
          "We expressed DHAK in *E. coli* and ran it through **Ni-NTA IMAC** exactly as we had for our other constructs, following the same binding, wash and elution conditions that had worked for the rest of the group's proteins.",
        ),
      ]),
      phase("Test", [
        p(
          "DHAK **did not purify cleanly by IMAC**. Instead of a single band at the expected molecular weight, the elution consistently showed a **thick, higher-molecular-weight band of unknown identity**, alongside poor resolution and low recovery of the target protein, regardless of small adjustments to imidazole concentration and wash stringency. This was a clear failure against our predefined success criterion, and an unexplained one: we still do not know whether that extra band was aggregated DHAK, a co-purifying contaminant, or something else entirely.",
        ),
      ]),
      phase("Learn", [
        p(
          "Rather than continuing to tweak the same IMAC protocol against an unidentified band, we switched to **FPLC** (fast protein liquid chromatography) as an orthogonal, higher-resolution purification route, and this time **DHAK purified successfully**, giving us protein to move forward with activity testing and the PROSS variant comparisons. We have not yet run this FPLC-purified material on an **electrophoresis gel**, so we still cannot say definitively whether the higher-molecular-weight species seen in the IMAC elution is gone, reduced, or simply not visible at the concentrations we are working with; confirming that by gel is the next concrete step. The broader learning, though, did not need to wait on that confirmation: **not assuming a method that works for one protein will work for another just because both carry the same affinity tag**; a dimeric protein like DHAK can behave very differently on a metal-affinity resin than a monomeric one, and when a standard method quietly fails to resolve, and produces an unidentified species on top of that, the right response is to change technique and then go back and characterise what the first method was actually showing, rather than keep optimising around it.",
        ),
      ]),
    ],
  },
  {
    title: "Exploring a SpyTag–SpyCatcher fusion to couple PPK2 and DHAK",
    phases: [
      phase("Design", [
        p(
          "Even with both enzymes purified and functional on their own, coupling them in solution as free proteins means the ATP produced by PPK2 has to diffuse away and be found by DHAK before it hydrolyses or gets used elsewhere, an inefficiency inherent to any two-enzyme system that only meets by chance. Our proposal for this iteration was to explore the **SpyTag–SpyCatcher** system, a protein pair that spontaneously forms a **covalent isopeptide bond** between them, as a way to physically **tether PPK2 and DHAK together** into a single fused complex rather than leaving them as two separate, freely diffusing enzymes. The logic was that pulling PPK2's active site physically closer to DHAK's should let the ATP intermediate channel more directly between them, cutting down on diffusion and side reactions and, in principle, raising the overall efficiency of the coupled DHAP-producing system.",
        ),
      ]),
      phase("Build", [
        p(
          "We were guided in this design work by our IQOG-CSIC mentors, and used SpyTag and SpyCatcher sequences (Israel) that were fused to our own enzyme sequences. Because DHAK is a **dimer** and therefore the physically larger of the two proteins, we assigned it the **smaller half of the system, the SpyTag**, fused at its N-terminus; PPK2-III, being the smaller protein, was assigned the **larger SpyCatcher domain**, also at its N-terminus, so that the bulkier binding partner sits on the protein with more room to accommodate it. We are not detailing the full construct design here, since the point of this iteration was to establish the strategy and the reasoning behind it rather than to report a finished, tested fusion.",
        ),
      ]),
      phase("Test", [
        p(
          "This iteration is still in progress, so we do not yet have activity or coupling-efficiency data to report.",
        ),
      ]),
      phase("Learn", [
        p(
          "What we take from it so far is the reasoning itself: choosing which enzyme carries the Tag and which carries the Catcher is not arbitrary, it follows directly from each protein's size and oligomeric state, and getting that assignment right before committing to cloning is exactly the kind of design decision that should be made deliberately rather than by default. Once built and tested, this fusion is meant to tell us whether physically linking PPK2 and DHAK genuinely improves the efficiency of the coupled reaction over the two free enzymes, which is the next iteration in this line of work.",
        ),
      ]),
    ],
  },
];
