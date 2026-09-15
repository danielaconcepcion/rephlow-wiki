/* Content restored from preview.html. Internal drafting notes and unconfirmed
   personal-name guesses are deliberately excluded from the public copy. */

export type Category =
  | "Industry"
  | "Science"
  | "Environment"
  | "Entrepreneurship";

export interface StakeholderEvent {
  id: string;
  index: number;
  month: string;
  name: string;
  category: Category;
  subcategory?: string;
  date: string;
  affiliation?: string;
  question: string;
  inputLabel: string;
  inputText: string;
  responseText: string;
  fullEntryHtml: string;
}

export interface PendingEntry {
  id: string;
  name: string;
  category: Category;
  status: string;
  note: string;
}

export interface UserRow {
  stakeholder: string;
  relationship: string;
  matters: string;
  mustDemonstrate: string;
}

export const CATEGORIES: Category[] = [
  "Industry",
  "Science",
  "Environment",
  "Entrepreneurship",
] as Category[];

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  Industry:
    "Industry stakeholders helped us understand what it takes for rePhlow to move beyond the laboratory. Their perspectives brought us closer to <strong>real effluent conditions, recognised validation methods and the practical constraints of implementing a contained biological system</strong> in existing treatment infrastructure.",
  Science:
    "Scientific stakeholders challenged our assumptions at key points in the design process. Across chassis selection, genetic engineering, encapsulation, enzyme immobilisation and revalorisation, their input helped us prioritise <strong>evidence, interpretability, safety and feasibility</strong> over unnecessary complexity.",
  Environment:
    "Environmental voices connected the phosphorus problem to the <strong>places and communities that experience its consequences</strong>. These conversations helped us look beyond analytical measurements and consider how eutrophication is perceived, understood and ultimately addressed by the people living alongside affected ecosystems.",
  Entrepreneurship:
    "Entrepreneurship stakeholders helped us test whether scientific value could translate into <strong>real-world value</strong>. Their perspectives shaped how we think about adoption, integration, competition and scalability, helping us define where rePhlow could realistically fit within the existing phosphorus-treatment landscape.",
};

export const EVENTS: StakeholderEvent[] = [
  {
    id: "bio-oils",
    index: 1,
    month: "March 2025",
    name: "Bio-Oils Huelva",
    category: "Industry",
    date: "20 March 2025",
    question:
      "What does phosphorus pollution look like in a real vegetable-oil refining process?",
    inputLabel: "Input",
    inputText:
      "The degumming stream has specific phosphorus, pH and temperature conditions, and any new treatment must fit around existing infrastructure.",
    responseText:
      "We moved from generic wastewater to a defined industrial use case and adopted modular, retrofit-compatible implementation as a design principle.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> Bio-Oils Huelva was the company that turned phosphorus from an abstract pollutant into a concrete industrial problem. As a biodiesel producer, they use phosphoric acid during the degumming stage of production, generating a phosphorus-rich wastewater stream. We wanted to understand what a real effluent looks like before designing a bioreactor around an idealised one.</p>\n<p><strong>What we learned from this interview.</strong> Bio-Oils explained the typical phosphorus concentration range in their degumming wastewater, the temperature and pH conditions of the stream, and the discharge limits they are already required to meet, as well as the future that awaits: even stricter discharge limits. They were candid about the real constraint industry faces: any new technology has to fit into existing infrastructure, because shutting down a line for a full treatment-plant rebuild is economically unworkable for a mid-sized producer.</p>\n<p><strong>What changed in rePhlow.</strong> This was the moment our target stopped being a generic, idealised wastewater and became a real one. We used Bio-Oils' concentration ranges, temperature and pH as the realistic operating conditions our bioreactor and bacterium would eventually need to tolerate, and we took their infrastructure constraint seriously: rePhlow had to be conceived as something that could slot into an existing line, not replace it. In practice, this conversation is also where our wet-lab work began: the concentration, pH and temperature ranges Bio-Oils gave us became the recipe for a synthetic wastewater stream, which we used to run our first phosphorus-assay approximations before we had access to any real effluent.</p>\n<p><strong>What this opened next.</strong> A real use case gave us numbers to design against, but it also raised a question our own team couldn't answer alone: which biological chassis could realistically survive and work in that stream? We needed a public-sector view on accepted treatment baselines and analytical rigour too, a thread we picked up later that year with CEDEX (see below), but the more immediate question was biological, and it sent us straight into the lab.</p>",
  },
  {
    id: "jorge-fernandez",
    index: 2,
    month: "April 2025",
    name: "Jorge Fernández Méndez",
    category: "Science",
    subcategory: "Building the bacteria",
    date: "2 April 2025",
    affiliation:
      "Former iGEM participant & team leader, microbial biotechnology",
    question:
      "Could our original Candidatus Accumulibacter phosphatis and Chlorella vulgaris consortium become a workable iGEM chassis?",
    inputLabel: "Challenge raised",
    inputText:
      "A strong natural phenotype does not automatically make an organism cultivable, reproducible or genetically tractable.",
    responseText:
      "We abandoned the consortium as the core design and moved towards a single Pseudomonas chassis.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> The project started from a defined problem: refining vegetable oils into biodiesel, HVO and SAF requires a degumming step that removes phosphorus, sulphates and chlorides from the oil, producing a wastewater stream with an estimated 15,000 ppm of phosphates, 80–90% of it in organic form, for which no standardised treatment existed at the time. Our initial design was a three-organism consortium: <em>Candidatus Accumulibacter phosphatis</em> (a polyphosphate accumulator), <em>Chlorella vulgaris</em> (a phosphate-absorbing microalga), and an extracellular enzyme to release phosphate. Before starting any wet-lab work, we needed to know whether that consortium was realistic. We contacted Jorge because of his previous iGEM experience working with photosynthetic microorganisms and microbial biotechnology.</p>\n<p><strong>What we learned from this interview.</strong> Jorge addressed the chassis question directly. Most organisms known to perform this kind of phosphate metabolism are difficult to work with in a standard lab setting, either because they are pathogenic relatives of PAOs, or because they resist pure culture, as is the case for <em>Candidatus Accumulibacter phosphatis</em>. He identified <em>Pseudomonas</em> as a practical exception: it accumulates both polyphosphate and PHA, grows quickly, and comes with an established synthetic-biology toolkit. He also had us reassess <em>Chlorella vulgaris</em> against our own timeline, microalgal culture needs closer control and a longer set-up time than we had available for the coming summer, making it a poor fit for a first working iteration even though its lipid output remained scientifically attractive.</p>\n<p><strong>What changed in rePhlow.</strong> We dropped the consortium concept and redesigned the project around a single engineerable chassis, a <em>Pseudomonas</em> strain, split into three core work blocks and one stretch goal: a bacterium able to absorb and accumulate phosphate rapidly; characterising the bacterium's behaviour under different media and bioreactor conditions. This reflected a principle that guided the whole redesign: a workable project built around one well-characterised organism was preferable to a broader design built on organisms we could not yet handle experimentally.</p>\n<p><strong>What this opened next.</strong> Moving to <em>Pseudomonas</em> solved the tractability problem, but it raised a new question, one we weren't equipped to answer with a single conversation: were we choosing it only because it was convenient to engineer, or because it also made sense in the biological context of water treatment?</p>",
  },
  {
    id: "alvaro-1",
    index: 3,
    month: "April 2025",
    name: "Álvaro Ferrero Veintemilla",
    category: "Science",
    subcategory: "Building the bacteria",
    date: "4 April 2025",
    affiliation:
      "Department of Structure of Matter, Thermal Physics and Electronics, Faculty of Physics (UCM), iGEM team mentor & former iGEM 2024 participant, rePET project.",
    question:
      "Did Pseudomonas remain relevant when viewed within real biological nutrient-removal systems?",
    inputLabel: "Challenge raised",
    inputText:
      "Phosphorus removal does not occur independently of oxygen conditions, carbon availability, microbial competition or nitrogen metabolism.",
    responseText:
      "We expanded the chassis criteria beyond genetic tractability to include robustness under changing treatment conditions.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> After ruling out <em>Accumulibacter</em>, we needed to make sure <em>Pseudomonas</em> wasn't being chosen simply because it was easier to culture and modify. We presented our reasoning to Álvaro to check it against the literature on real wastewater treatment systems.</p>\n<p><strong>What we learned from this interview.</strong> Álvaro encouraged us to look at denitrifying bacteria, very well characterised in the wastewater-treatment literature, because they show how nutrient-removing bacteria behave under changing oxygen conditions, and how different nutrient cycles (phosphorus, nitrogen, carbon) interact within the same treatment system. The lesson wasn't to reproduce the whole denitrifying community, but to use it as a reference when defining what conditions and functions our chassis needed to tolerate.</p>\n<p><strong>What changed in rePhlow.</strong> We broadened our literature review to include denitrifying bacteria and other BNR organisms, which reinforced, rather than changed, the decision to concentrate the selected functions in a single bacterium. This conversation consolidated our chassis selection criteria: it had to be genetically accessible and biologically robust in a real treatment context.</p>\n<blockquote>\n<p><strong>Internal synthesis — why we selected</strong> <em><strong>Pseudomonas putida</strong></em> <strong>KT2440.</strong> Our choice wasn't based on one recommendation. It came from comparing stakeholder input with our own literature review — and from a values trade-off we made consciously rather than by default. <em>P. putida</em> JLR11 had a real appeal: it was isolated in Granada, and using a locally sourced strain would have given rePhlow a stronger regional narrative for a Spanish team. But geographical connection alone couldn't justify the chassis. KT2440 offered stronger genomic, physiological and engineering documentation. We prioritised experimental reliability over symbolic appeal — a small decision, but one that reflects a value we tried to hold throughout the project: a good story about our science is worth less than a chassis we can actually validate.</p>\n</blockquote>\n<p><strong>What this opened next.</strong> With the chassis fixed, the next question became mechanistic: which parts of phosphate uptake and polyphosphate storage should we engineer first?</p>",
  },
  {
    id: "aurelio-1",
    index: 4,
    month: "April 2025",
    name: "Aurelio Hidalgo Huertas",
    category: "Science",
    subcategory: "Building the bacteria",
    date: "8 April 2025 · follow-up late April 2025",
    affiliation: "Centro de Biología Molecular Severo Ochoa (CBM, CSIC-UAM)",
    question:
      "Was intracellular engineering sufficient, and which genes should be prioritised?",
    inputLabel: "Challenge raised",
    inputText:
      "Much of the phosphorus in a real stream may not initially be available as orthophosphate, and changing too many genes at once would make the phenotype difficult to interpret.",
    responseText:
      "We connected the enzyme and genetic modules, prioritised direct targets and adopted the SEVA architecture.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> We contacted Aurelio at several connected stages of the design. First, to find out whether increasing phosphate uptake would be enough when phosphorus can exist in very different chemical forms. Later, once we had a broad list of candidate genes (transport, synthesis, degradation and export), to help us prioritise it. Finally, for guidance on which vector systems could support expression in <em>P. putida</em>.</p>\n<p><strong>What we learned from this interview.</strong> Aurelio got us thinking about phosphorus speciation: not all the phosphorus entering a treatment system is available as orthophosphate, the form bacteria transport directly. It can be locked up in phospholipids, phytate, or other phosphorylated organic molecules — so increasing phosphate transport would be of limited value unless that phosphorus was released from its complex forms first (he even suggested a future line of metagenomic sampling in Río Tinto to look for phosphorus-processing enzymes). He also reviewed our preliminary gene list — simultaneous changes to transport, synthesis, degradation, consumption and export — and explained that modifying everything at once would make it impossible to tell which change was responsible for any observed phenotype. He recommended prioritising <em>ppk1</em>, <em>ppk2</em> and <em>ppx</em>, the genes most directly linked to polyphosphate metabolism. Finally, he introduced us to the SEVA collection (Standard European Vector Architecture).</p>\n<p><strong>What changed in rePhlow.</strong> The system was now defined as a sequence: phosphorus release → phosphate uptake → intracellular storage. We reduced the genetic design to a manageable number of direct, interpretable targets, and adopted SEVA as the foundation of our expression strategy. This is also the point where the two halves of rePhlow's biology formally split into their own threads: an enzyme would have to release phosphorus from organic compounds before the bacterium could ever take it up (see Enzyme immobilisation, from 27 June 2025), while the bacterium itself still needed its transport and storage genes prioritised.</p>\n<p><strong>What this opened next.</strong> The biological rationale was coherent, but was it complete? Before finalising which genes to carry, we still had to decide whether <em>Accumulibacter</em>'s native traits had anything left to teach us.</p>",
  },
  {
    id: "elvira",
    index: 5,
    month: "April 2025",
    name: "Elvira Mateos García",
    category: "Science",
    subcategory: "Building the bacteria",
    date: "April 2025",
    affiliation:
      "iGEM team mentor & former iGEM 2024 participant, rePET project.",
    question:
      "Could we strengthen polyphosphate accumulation in our chassis by reconstructing a polyamine-associated storage mechanism from Candidatus Accumulibacter phosphatis ?",
    inputLabel: "Challenge raised",
    inputText:
      "A metabolic feature that correlates with a strong phenotype in the native organism is not automatically worth transplanting into an engineered chassis; a transplanted pathway has to earn its place against the burden it introduces.",
    responseText:
      "We noted the polyamine route as biologically interesting but chose not to pursue it, judging the added complexity disproportionate to a gain we couldn't quantify in advance.",
    fullEntryHtml:
      "<p><strong>Why we brought this to Elvira.</strong> As our team mentor with direct prior experience working with <em>Pseudomonas putida</em>, Elvira was someone we regularly checked our reasoning against internally. At this stage, we wanted her read on which of <em>Accumulibacter</em>'s native traits genuinely drive its exceptional polyphosphate accumulation, and which are incidental, before deciding what to carry over into <em>P. putida</em>.</p>\n<p><strong>What we learned from this interview.</strong> Elvira pointed out that <em>Candidatus Accumulibacter phosphatis</em> carries a spermine synthase activity, and suggested that its polyamine metabolism may contribute to how efficiently it stores polyphosphate, polyamines being polycationic molecules that can associate with, and help stabilise, polyanionic polyphosphate. On that reading, the organism's storage capacity is not fully explained by its polyphosphate kinases alone, and part of the phenotype might depend on a supporting polyamine background.</p>\n<p><strong>What changed in rePhlow.</strong> We treated this as a plausible but secondary contributor rather than a core mechanism. Reconstructing polyamine biosynthesis in <em>P. putida</em> would mean adding and balancing another multi-gene pathway on top of the polyphosphate machinery we were already transplanting, and we judged that the extra complexity and metabolic burden outweighed an accumulation benefit we could not quantify in advance. We kept the design focused on the direct route: heterologous <em>ppk1</em> together with the high-affinity Pst transport system, and removal of the competing degradation and low-affinity export activities.</p>\n<p><em>This is a decision we could easily have hidden by simply not mentioning the idea at all. We chose to document it instead, because not adding a pathway is a design decision too, and one we think was the responsible one. Every additional gene we transplant is something we would eventually have to characterise, contain, and justify; declining a scientifically interesting option because we couldn't yet justify its cost is the same discipline we ask of ourselves throughout this project, not an exception to it.</em></p>\n<p><strong>What this opened next.</strong> With the genetic payload settled — heterologous <em>ppk1</em> and the <em>pst</em> transport operon, nothing more — the question was no longer <em>what</em> to carry, but <em>how</em> to install it safely: should these two heterologous inserts go straight into the chromosome, or be proven first on a plasmid? We took that question to Silvia.</p>",
  },
  {
    id: "silvia-1",
    index: 6,
    month: "April 2025",
    name: "Silvia Díaz del Toro",
    category: "Science",
    subcategory: "Building the bacteria",
    date: "April 2025",
    affiliation:
      "Department of Genetics, Physiology and Microbiology, Faculty of Biological Sciences (UCM)",
    question:
      "Should the two heterologous inserts ( ppk1 and the pst operon from Candidatus Accumulibacter phosphatis ) go into the P. putida chromosome from the outset, or first be carried episomally?",
    inputLabel: "Challenge raised",
    inputText:
      "Committing a heterologous construct to the chromosome before knowing whether it is metabolically compatible risks locking in a strain that is burdened or unstable, with no easy way back.",
    responseText:
      "We decided to test both inserts on replicative plasmids first, deferring chromosomal integration until compatibility was confirmed.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> Our initial plan was to introduce the two heterologous inserts (<em>ppk1</em> and the <em>pst</em> operon, <em>pstSCAB</em>) into <em>P. putida</em> by biparental conjugation, aiming for stable establishment in the strain, using two broad-host-range vectors with different resistance markers so that both could be maintained together in the same cell. We asked Silvia to sanity-check this integration-first commitment.</p>\n<p><strong>What we learned from this interview.</strong> Silvia questioned the genetic stability of inserting the constructs before we had any evidence that <em>P. putida</em> tolerated them well. Heterologous expression can impose a fitness cost or prove unstable, and if that only becomes apparent after integration, most of the work of building the strain is wasted. Her point pushed us to treat compatibility as something to be measured first, not assumed.</p>\n<p><strong>What changed in rePhlow.</strong> We inverted the order of operations. Rather than integrating from the start, we will first express <em>ppk1</em> and the <em>pst</em> operon from the replicative plasmids and evaluate whether they are genuinely compatible with <em>P. putida</em>'s metabolism (growth, burden and expression level) before deciding whether and how to move them into the chromosome. This keeps the early iterations flexible and reversible.</p>\n<p><strong>What this opened next.</strong> Plasmid-borne expression needs selection to be maintained and doesn't give us the permanence we ultimately want, while chromosomal integration is stable but hard to reverse — a tension we'd revisit once compatibility was confirmed. In parallel, a related but separate decision was waiting: three native genes (<em>pitB</em>, <em>ppx</em>, <em>ppkB</em>) still had to be knocked out entirely, not just complemented, and with three loci to edit at once we needed to know whether our classical deletion method would scale. We took that to Javier Molpeceres.</p>",
  },
  {
    id: "molpeceres",
    index: 7,
    month: "April 2025",
    name: "Francisco Javier Molpeceres García",
    category: "Science",
    subcategory: "Building the bacteria",
    date: "April 2025 · follow-up late May 2025",
    affiliation: "PhD researcher, CIB-CSIC",
    question:
      "Should we knock out our target genes ( pitB , ppx , ppkB ) in P. putida KT2440 by classical homologous recombination, or is there a better route — and, once we had one, could our proposed constructs and promoters actually be built and selected?",
    inputLabel: "Challenge raised",
    inputText:
      "A gene-editing method that's fine for a single deletion becomes the bottleneck once several genes need editing at once; on top of that, our first CRISPR design wasn't compatible with the assembly system we'd chosen.",
    responseText:
      "We moved from classical homologous recombination to a CRISPR base-editing approach for the three knockouts, then revised our marker and promoter choice, consolidated the SEVA constructs, and corrected the CRISPR design so it would actually work.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> We went to Dr Javier Molpeceres twice, at two connected stages of the same problem. First, in April, our deletion strategy for <em>pitB</em>, <em>ppx</em> and <em>ppkB</em> followed the classical route for <em>P. putida</em>: a suicide-vector-based allelic exchange, requiring two rounds of selection and screening per gene to resolve a markerless deletion. With three loci to edit, we asked Javier whether this was still the sensible choice. Then, once the chassis was chosen, the biological functions prioritised, and the SEVA framework adopted, we came back in late May to turn that decision into actual, buildable genetic constructs: promoters, resistance markers, SEVA vector choices, and a first CRISPR design.</p>\n<p><strong>What we learned from this interview.</strong> Javier explained that ampicillin couldn't be used as a marker because wild-type <em>P. putida</em> already carries intrinsic resistance to it, so selection would never reliably tell transformed cells from untransformed ones. He helped us settle on pEM7 as our constitutive promoter (over J23119) and consolidate the pSEVA2513 and pSEVA631 constructs. He also reviewed our proposed gene deletion via homologous recombination with pK18mobsacB, and showed us that repeating that sequential workflow (conjugation, selection, counterselection, verification) across several genes would become one of the project's main bottlenecks. He recommended replacing it with CRISPR-based editing. In a second session, he corrected our first CRISPR design, poorly adapted to the assembly system we'd chosen, and taught us how to design guides and primers compatible with the pMBEC2 platform and Golden Gate assembly via BsaI.</p>\n<p><strong>What changed in rePhlow.</strong> We adopted CRISPR base editing as the route for the three knockouts and dropped the allelic-exchange plan entirely, shortening the editing pipeline considerably and letting us plan the three inactivations as one coordinated set rather than three sequential campaigns. On top of that, we removed ampicillin resistance from the design, fixed pEM7 as our promoter, consolidated pSEVA2513/pSEVA631 as our expression vectors, and corrected our CRISPR guides and primers so the system would actually function. Together, these two conversations turned a metabolically sound but still theoretical editing plan into a construct design that could actually be built in the lab.</p>\n<p><strong>What this opened next.</strong> With the genetic construct finally buildable, the bacterium's design was, for the first time, complete on paper. That still left a question the metabolic design alone couldn't answer: now that we were committed to releasing a living, engineered organism into an industrial line, how would we physically contain it?</p>",
  },
  {
    id: "victoria-1",
    index: 8,
    month: "June 2025",
    name: "Victoria E. Santos Mazorra",
    category: "Science",
    subcategory: "Containing the bacteria: alginate encapsulation",
    date: "7 June 2025",
    affiliation:
      "Department of Chemical Engineering, Faculty of Chemistry (UCM)",
    question:
      "Which material could form the basis of a physical containment system?",
    inputLabel: "Input",
    inputText:
      "Alginate offered accessible gelation chemistry, practical availability and a route towards material recovery and reuse.",
    responseText:
      "We selected alginate as the base material for encapsulation.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> Once we had committed to a genetically modified chassis, an unavoidable biosafety question followed: how do we physically confine it so it can't escape into the environment? We had no prior experience with polymers or encapsulation, so we approached a research group specialised in alginate extraction, purification and recycling.</p>\n<p><strong>What we learned from this interview.</strong> Victoria explained the properties of alginate as a biopolymer: its availability, its ability to gel in the presence of calcium, and its sustainability profile compared with other containment materials, and why it was a reasonable basis for a biological containment strategy.</p>\n<p><strong>What changed in rePhlow.</strong> This conversation fixed a decision that shaped everything that followed: alginate as our base encapsulation material.</p>\n<p><strong>What this opened next.</strong> That decision narrowed the next design question from &quot;which material?&quot; to &quot;which alginate architecture can provide controlled confinement and remain compatible with the enzyme and hardware modules?&quot; Three days later, we put that question to a joint meeting with materials and physics specialists.</p>",
  },
  {
    id: "carmen-loreto-alvaro-1",
    index: 9,
    month: "June 2025",
    name: "Mª Carmen García Payo, Loreto García Fernández & Álvaro Ferrero Veintemilla",
    category: "Science",
    subcategory: "Containing the bacteria: alginate encapsulation",
    date: "10 June 2025",
    affiliation:
      "Department of Structure of Matter, Thermal Physics and Electronics, Faculty of Physics (UCM)",
    question:
      "Should the bacteria be held in conventional beads or in a more controlled architecture?",
    inputLabel: "Input",
    inputText:
      "A regular core-shell geometry would separate a liquid bacterial core from a solid containment shell and could later support enzyme functionalisation at the surface.",
    responseText:
      "We adopted core-shell capsules as the target architecture while retaining simple beads as a contingency plan.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> With alginate chosen as our material, we needed to decide what shape our encapsulation system would take. We arranged a joint meeting with specialists in materials structure and physics to explore alternatives beyond a simple sphere.</p>\n<p><strong>What we learned from this interview.</strong> The meeting produced the proposal to move from simple beads towards a core-shell architecture: a liquid core holding the bacteria, wrapped in a solid alginate shell acting as a physical containment barrier. Other encapsulation strategies were considered and ruled out because they produced amorphous or irregular structures that would be hard to control, and a regular spherical structure would also make it easier to functionalise the surface with immobilised enzymes later on.</p>\n<p><strong>What changed in rePhlow.</strong> Core-shell became the target architecture. However, we did not discard beads. We used them as a simpler first platform to optimise dripping height, alginate concentration, crosslinking time and flow rate. This gave us both transferable process knowledge and a valid fallback if the more complex architecture failed.</p>\n<p><strong>What this opened next.</strong> Once stable capsules were produced, the limitation was no longer formation but evidence: alginate is translucent, so we could not reliably see or measure the internal shell. We took that problem straight back to Carmen.</p>",
  },
  {
    id: "carmen-2",
    index: 10,
    month: "June 2025",
    name: "Mª Carmen García Payo",
    category: "Science",
    subcategory: "Containing the bacteria: alginate encapsulation",
    date: "June 2025",
    affiliation:
      "Department of Structure of Matter, Thermal Physics and Electronics, Faculty of Physics (UCM)",
    question:
      "How could we demonstrate that a real core-shell structure had formed and quantify the containment barrier?",
    inputLabel: "Input",
    inputText:
      "Use magnetite as an optical tracer and cryosection frozen capsules for microscopy.",
    responseText:
      "We developed a visualisation and wall-thickness measurement pipeline and linked it to leakage testing.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> Stable droplets did not prove that the intended internal architecture existed. Without structural evidence, we could not compare flow ratios, discuss containment or define a reproducible shell. Once we had achieved stable core-shell formation, we ran into an unexpected problem: we had no way of confirming whether the core-shell structure was actually forming inside. Alginate is translucent and the spheres are small, so the structure wasn't visible either to the naked eye or with the magnifying glass we normally used to photograph the beads.</p>\n<p><strong>What we learned from this interview.</strong> Carmen proposed two complementary solutions. First, incorporating magnetite (particles under 50 nm, a size even smaller than our bacteria) as a visual and optical contrast signal, which would also let us check whether the shell's crosslinking degree was sufficient to prevent bacterial escape. Second, freezing the capsules with liquid nitrogen and sectioning them for microscopy, which would let us directly measure the real thickness of the shell wall while testing different flow ratios, a characterisation that had previously been entirely qualitative.</p>\n<p><strong>What changed in rePhlow.</strong> We adopted magnetite incorporated into the alginate shell (not the core, where it gave no visible contrast) as our method for obtaining representative images of the core-shell structure and for running bacterial leakage and escape assays. Magnetite was used as a visual tracer and preliminary structural proxy; its retention cannot substitute for direct leakage experiments using viable cells, because nanoparticles and bacterial cells differ in surface properties, shape, aggregation and transport behaviour. Liquid-nitrogen cryo-sectioning became our reference tool for quantifying shell thickness, something that had previously been a complete unknown.</p>\n<p><strong>What this opened next.</strong> Our capsules still had to survive operation, and which bioreactor could mix and mass-transfer without mechanically damaging the shell was a real question, but it would have to wait until we had somewhere to test it (we picked it back up that October, see Álvaro, below). In the meantime a different piece of the puzzle needed resolving, one that had been sitting open since the genetic-design phase: even a perfectly contained bacterium could only capture phosphorus already available as free orthophosphate. What would happen to everything still locked inside phospholipids, phytate and other organic forms?</p>",
  },
  {
    id: "aurelio-2",
    index: 11,
    month: "June 2025",
    name: "Aurelio Hidalgo Huertas",
    category: "Science",
    subcategory: "Enzyme immobilisation",
    date: "27 June 2025 – March 2026",
    affiliation: "Centro de Biología Molecular Severo Ochoa (CBM, CSIC–UAM)",
    question:
      "Both of our placeholders — secretion or a consortium — treated the enzyme as something the system would consume once. Before committing to either, we wanted an expert view on whether that assumption itself was right.",
    inputLabel: "Challenge raised",
    inputText:
      "An enzyme that is simply expressed and released is spent once; at the scale of a treatment stream, a single-use biocatalyst is neither economical nor recoverable.",
    responseText:
      "We reframed the problem entirely: the enzyme didn't need to live inside the bacterium at all. Immobilised on a solid support, it could be recovered and reused across many cycles instead of being spent, separating the release step cleanly from the uptake-and-storage step the chassis was already responsible for.",
    fullEntryHtml:
      "<p><em>Setting the starting point:</em> the enzyme-immobilisation block emerged directly from a limitation identified during the design of our genetic strategy (see Aurelio, 8 April, above). Engineering <em>Pseudomonas putida</em> to increase phosphate uptake and intracellular polyphosphate storage could only improve the capture of phosphorus already present as orthophosphate. However, a substantial fraction of the phosphorus in real wastewater may remain bound within phospholipids, phytate and other phosphorylated organic compounds. Until these molecules are hydrolysed, their phosphorus remains unavailable to the bacterial transport system. This meant that intracellular engineering alone could never provide a complete treatment pathway. Our own reasoning, before any wet-lab work began, developed together with Paula Sánchez-Blanco and Elvira Mateos (iGEM mentors)poi, nted towards using an enzyme for this job: alkaline phosphatase (PhoA) from <em>Bacillus subtilis</em>, run at pH 9–10. As our understanding developed, we considered two possible architectures: engineering an enzyme with a signal peptide so release and uptake could occur within the same microbial system, or creating a consortium in which one organism released phosphate and another captured it. Neither answered the questions that actually mattered, so we took the open question to Aurelio.</p>\n<p><strong>Why we contacted this stakeholder.</strong> Coming out of the theoretical phase, our two placeholders, a signal-peptide-secreted enzyme inside the chassis, or a two-organism consortium, both left the enzyme as something the system consumed rather than kept. Choosing which enzyme to immobilise, and how many, was outside our own expertise; we needed someone who could tell us whether we were thinking about selection correctly, not just which enzyme sounded promising in the literature.</p>\n<p><strong>What we learned from this interview.</strong> Aurelio reframed the problem before we had chosen anything: the enzyme didn't need to live inside the bacterium at all. Immobilised on a solid support, it could be recovered and reused across many cycles instead of being spent once, cleanly separating the release step from the uptake-and-storage step the chassis was already responsible for. This offered several potential advantages: the catalyst could be recovered from the reaction medium; the same enzyme preparation could potentially be used over multiple cycles; enzyme release and bacterial uptake could be optimised independently; and the system would avoid introducing a second living organism. Once recyclability became the goal, the next question was which enzyme(s) should fill that role, and here Aurelio pushed our thinking further at every stage. He first insisted that enzymes be chosen for the conditions they could tolerate (temperature, pH), not just the reaction they catalysed. He then argued that catalytic activity was the wrong first filter altogether: solubility, screened computationally using a tool called EnzymeMiner, mattered just as much, since an enzyme that cannot be produced in soluble form is useless regardless of how well it performs on paper. Finally, he challenged the idea of chasing a single &quot;best&quot; phosphatase, arguing that a real wastewater stream contains too many different phosphorus compounds for one activity to cover on its own.</p>\n<p><strong>What changed in rePhlow.</strong> The block moved through two real shifts because of this input: first, from secreting an enzyme to immobilising one, with recyclability as an explicit design goal; and second, from &quot;find the best phosphatase&quot; to &quot;assemble a defensible, complementary panel screened for solubility.&quot; That reasoning is what produced our final seven-enzyme panel: EstE1, Plc, AppA, PhyA, M2-32, AphA and CerA, spanning several activities, including phospholipases known to be difficult, and in some cases toxic, to express.</p>\n<p><strong>What this opened next.</strong> With a defensible panel fixed, one that deliberately included enzymes known to be toxic in their free form, we were left with a question none of these conversations had addressed: assuming the panel worked and was immobilised, how would we actually know it was staying contained, rather than simply assuming that immobilisation made it safe?</p>",
  },
  {
    id: "inmaculada",
    index: 12,
    month: "July 2025",
    name: "Inmaculada Alonso",
    category: "Environment",
    date: "25 July 2025",
    affiliation: "Long-term resident near the San Juan reservoir",
    question:
      "Open the full entry to see the question, context and resulting design response.",
    inputLabel: "Insight",
    inputText:
      "Helped us understand eutrophication not as a scientific term, but as a change she had watched happen over decades without ever being told why.",
    responseText:
      "We prioritised clear communication and perceptible restoration outcomes, not only lab-measured concentrations.",
    fullEntryHtml:
      "<p><em>The team's summer field trip took them to the Embalse de San Juan, a reservoir on the Alberche river near Madrid long used for swimming and watersports — the kind of place where eutrophication is not a concentration on a datasheet but a change people have simply lived through. We went to speak with a neighbour, not to run a technical assessment, and it changed what we thought &quot;understanding eutrophication&quot; meant.</em></p>\n<ul>\n<li>Helped us understand eutrophication not as a scientific term, but as a change she had watched happen over decades without ever being told why.</li>\n<li>Described how the reservoir went from a childhood memory of clear water and swimming to a place she now visits more cautiously, without fully understanding what had changed or when.</li>\n<li>Reminded us that most people living near an affected water body have no access to the technical explanation for what they are seeing, only the lived experience of the change itself.</li>\n</ul>\n<p><strong>Why we contacted this stakeholder.</strong> Scientific literature explained eutrophication to us through nutrient concentrations, algal blooms, oxygen depletion and ecological degradation. What it could not explain was how that same process is actually noticed, or misunderstood, by someone with no scientific background who has simply lived next to the reservoir their whole life. We spoke with Inmaculada Alonso, a neighbour who has been going to the reservoir since she was a small child. We wanted to explore a question our technical work alone could not answer: what does it feel like to watch a familiar place change gradually, without ever being told why?</p>\n<p><strong>What we learned from this interview.</strong> Inmaculada described a slow, confusing shift rather than a single moment of change. As a child, she remembered the reservoir as somewhere the whole family would swim and spend entire summer days. Over the years, she noticed the water looking murkier, patches of algae appearing in places she didn't remember from before, and a smell in certain areas during the hottest months. She was honest that, for a long time, she didn't connect any of this to a specific cause, she assumed it was just &quot;the reservoir getting older,&quot; or blamed it vaguely on &quot;less rain&quot; or &quot;more people,&quot; without any real certainty. What stood out most was her uncertainty rather than her knowledge. She had never been told what eutrophication was, never seen a water-quality report, and had no way of knowing whether what she was seeing was dangerous, normal, or something in between. She said she simply adapted her own behaviour over time, swimming less, staying further from certain areas, without ever having a clear answer for why. The conversation also showed us that this lack of explanation has its own cost: not knowing why the reservoir was changing left her simultaneously worried and unsure whether that worry was justified, and with no clear sense of who, if anyone, was responsible for addressing it.</p>\n<p><strong>What changed in rePhlow.</strong> This conversation added a dimension we had not fully considered: that many of the people most affected by eutrophication are not just experiencing an ecological or social change, but living with an unexplained one. Technical accuracy on our side would mean very little if it never reached the people actually watching their environment change. This reinforced two priorities for rePhlow: (1) communicating clearly, not just measuring accurately, a phosphorus-removal technology is only meaningful to residents like Inmaculada if its purpose and results can eventually be explained in plain terms, not left as a number in a lab report; (2) treating restoration as something people can perceive, laboratory performance should ultimately be connected to system-level indicators that matter to affected communities, while avoiding any claim that a single point-source treatment module would, by itself, produce visible restoration at reservoir scale.</p>\n<p><strong>Our reflection.</strong> One resident's account cannot represent every person affected by the reservoir's condition, and Inmaculada's recollections are necessarily informal, shaped by memory rather than record. They should not be treated as evidence of the reservoir's ecological status, nor as a substitute for official monitoring data. However, the conversation showed us that understanding eutrophication required us to connect people's observations with measurable environmental evidence. We therefore decided to visit the reservoir and collect water samples from different locations (see Travel Archive; photos and other non-interview material from this and other field visits are kept there rather than here). These samples will support a future analysis of phosphorus concentrations, allowing us to compare Inmaculada's lived experience with quantitative data and to establish an initial environmental reference for rePhlow.</p>\n<p><strong>What this opened next.</strong> In future work, this approach should be expanded through repeated sampling at different locations and times of year, together with engagement involving additional residents, recreational users, environmental organisations and water-management authorities, which is exactly what our public eutrophication survey (see note at the end of this section) is designed to start doing. While that broader public-perception work continued in the background, the scientific design moved to its final stage that autumn: once phosphorus had been captured and stored inside the bacterium as polyphosphate, how could that stored resource actually be turned into something valuable?</p>\n<p><strong> </strong></p>",
  },
  {
    id: "eduardo",
    index: 13,
    month: "September 2025",
    name: "Eduardo García Junceda",
    category: "Science",
    subcategory: "Closing the loop: phosphorus revalorisation",
    date: "September 2025",
    affiliation: "Institute of General Organic Chemistry (IQOG, CSIC)",
    question:
      "How could we turn the polyphosphate stored inside our bacteria into an economically and strategically valuable product, using an ATP-regeneration route we could actually source locally?",
    inputLabel: "Challenge raised",
    inputText:
      "Recommended a PPK2-driven ATP-regeneration system using polyP as the phosphate donor, coupled downstream to DHAK, and pointed us to BcPPK2 III as an already-characterised, robust enzyme with ready-made expression stocks.",
    responseText:
      "We adopted the coupled PPK2/DHAK system as our core revalorisation route, targeting DHAP as a precursor with access to rare-sugar and iminosugar markets.",
    fullEntryHtml:
      "<p><em>Setting the starting point:</em> once the engineered bacterium had captured phosphorus and stored it as intracellular polyphosphate, the challenge was no longer removal alone. Unless that polyphosphate could be recovered and reused, rePhlow would simply be transferring phosphorus from the wastewater into a new waste stream. We therefore set a clear objective: convert the accumulated polyphosphate into a valuable product, preferably through a route that could be reintegrated into the rePhlow process itself.</p>\n<p><strong>Why we contacted this stakeholder.</strong> Our goal was to transform polyphosphate into a valuable product while closing the cycle. We had identified glucose-6-phosphate as an attractive precursor, already produced from polyphosphate by a research group in China, but the distance and our timeline made it nearly impossible to get hold of their enzyme samples or plasmids. Looking for a local alternative, we found Eduardo García Junceda's group at IQOG-CSIC, who had spent years developing ATP-regeneration systems built around different phosphate donors.</p>\n<p><strong>What we learned from this interview.</strong> Eduardo compared several ATP-regeneration strategies, acetate kinase with acetyl phosphate, pyruvate kinase with PEP, and polyphosphate kinase with polyP itself, and explained why PPK2 was the clear fit for us: polyphosphate is dramatically cheaper than the other donors, and since polyP was exactly the molecule we needed to get rid of, using it for regeneration meant our waste stream and our energy source became the same thing. After a lot of back and forth, we settled on BcPPK2 III from <em>Burkholderia cenocepacia</em>: it accepts both AMP and ADP as substrates, is thermostable and active across pH 6.0–9.0, and had already been characterised in-house by Día, one of the group's PhD students, giving us a validated starting point and ready-made <em>E. coli</em> glycerol stocks instead of having to clone it from scratch. They then pointed us to DHAK, dihydroxyacetone kinase from <em>Citrobacter freundii</em>, as the downstream enzyme that could use the ATP regenerated by PPK2 to produce DHAP, a molecule that opens up rare-sugar and iminosugar synthesis routes.</p>\n<p><strong>What changed in rePhlow.</strong> We replaced our original single-product target (glucose-6-phosphate) with a coupled PPK2/DHAK enzyme system, an enzyme pairing that, as far as we know, had never been put together before. PolyP accumulated inside our bacteria could now be drained to regenerate ATP, which DHAK would capture almost immediately to produce DHAP, closing the phosphorus cycle while generating a strategically valuable, market-relevant product.</p>\n<p><strong>What this opened next.</strong> Once we dug deeper into DHAK's mechanism, we found it was fairly unstable, a real problem for any future scale-up, a question that would have to wait for a follow-up meeting with Israel.</p>",
  },
  {
    id: "silvia-2",
    index: 14,
    month: "September 2025",
    name: "Silvia Díaz del Toro",
    category: "Science",
    subcategory: "Enzyme immobilisation",
    date: "September 2025",
    affiliation:
      "Department of Genetics, Physiology and Microbiology, Faculty of Biological Sciences (UCM)",
    question:
      "Is immobilisation sufficient evidence of containment, or could the enzyme detach during repeated operation?",
    inputLabel: "Challenge raised",
    inputText:
      "An enzyme physically attached to a support can still detach, through mechanical wear, through repeated use cycles, through the support itself degrading over time, and once that happens, a toxic enzyme in treated water is no longer a hypothetical risk, it's an active one. Nothing in our design up to that point actually distinguished between an enzyme that was immobilised and an enzyme that was immobilised and verified to stay that way .",
    responseText:
      "We accepted that this distinction mattered, and that we couldn't resolve it by reasoning alone: it needed a chemistry specifically chosen to minimise detachment, not just a chemistry chosen for activity or ease of development. We introduced enzyme retention and possible leaching as explicit safety requirements, and brought this concern into the design of the immobilisation chemistry.",
    fullEntryHtml:
      "<p><strong>Why this discussion took place.</strong> After Aurelio's feedback, we presented the developing enzyme module to Silvia as part of a broader project update. At that stage, our reasoning appeared straightforward: immobilising the enzymes on a solid support would allow them to be recovered and reused, avoiding the continuous release or replacement associated with a secreted catalyst. However, while we were explaining the module, Silvia asked a question that our previous design work had not answered: how could we be certain that the enzyme would remain attached to the support during operation? The question was especially relevant because rePhlow was being designed for repeated use under flow, agitation and changing wastewater conditions.</p>\n<p><strong>What we learned from this interview.</strong> Silvia did not challenge the decision to immobilise the enzymes. She challenged the safety assumption we had attached to that decision. Until then, our main criteria had been whether the enzyme retained catalytic activity, whether it could be recovered, and whether the support could be reused. Her question added a further criterion: whether the enzyme remained bound strongly enough to prevent its uncontrolled release into the treated water. This made us distinguish between three concepts we had previously used too loosely: <strong>immobilisation</strong> (the enzyme is attached to a support at the beginning of the process), <strong>recoverability</strong> (the enzyme–support system can be physically removed from the reaction), and <strong>containment</strong> (the enzyme remains associated with that support during operation and repeated use). The first two did not automatically demonstrate the third. We also recognised that different attachment strategies might produce different risk profiles: a weak adsorption method could preserve high initial activity but allow greater detachment, whereas a stronger covalent attachment could improve retention while potentially affecting enzyme structure or catalytic performance.</p>\n<p><strong>What changed in rePhlow.</strong> From that point onwards, attachment strength and resistance to leaching also became explicit design criteria. We therefore stopped treating adsorption as automatically sufficient and introduced covalent immobilisation as a potentially more robust alternative that would need to be compared under controlled conditions. Future repeated-use experiments would have to assess not only how much activity remained after each cycle, but also whether the enzyme continued to stay bound to the support and whether any activity or protein could be detected in the surrounding liquid. This precaution will be especially important if the potentially harmful candidates in our panel, such as certain phospholipases, are successfully expressed in soluble and active form.</p>\n<p><strong>What this opened next.</strong> We now needed to compare attachment strategies under controlled conditions, and doing so directly with seven newly expressed enzymes, a complex final support and an unvalidated assay would introduce too many variables at once. Building that simplified, fair comparison would take Juan Manuel Bolívar most of the following winter (see below). That same autumn, though, the project's industrial and regulatory picture also needed catching up: Bio-Oils had given us a real effluent back in March, but we still needed an external, public-sector view of the standards a technology like ours would actually be measured against.</p>",
  },
  {
    id: "cedex",
    index: 15,
    month: "October 2025",
    name: "CEDEX",
    category: "Industry",
    date: "1 October 2025",
    affiliation:
      "Carlos López Monllor, Almudena Domínguez Cabrerizo and María Isabel Berga Cano",
    question:
      "Against which technical, regulatory and analytical standards would a technology such as rePhlow be assessed?",
    inputLabel: "Challenge raised",
    inputText:
      "Our initial phosphorus assay was useful for preliminary laboratory comparisons, but it should not be presented as equivalent to an official reference method.",
    responseText:
      "We reframed rePhlow as a complementary recovery technology, grounded performance claims in recognised discharge baselines and defined method validation as a necessary next step.",
    fullEntryHtml:
      "<p><strong>Why we contacted these stakeholders.</strong> Cedex (Centro de Estudios y Experimentación de Obras Públicas) is a public research body attached to Spain's Ministry of Transport, Mobility and Urban Agenda, providing technical assistance on civil engineering and water infrastructure to public administrations across the country. As a student team with no industrial or regulatory experience, we wanted an honest, external view of what &quot;official&quot; water-quality control and infrastructure planning actually look like, and María Isabel Berga Cano, as the point of contact for institutional relations, helped us set up a visit that brought together the two technical areas most relevant to rePhlow. One of our main reasons for reaching out was regulatory: we needed a proper grounding in the European directives that govern wastewater discharge, how a body like Cedex actually monitors and controls discharge limits in practice, and what treatment methods are already established and in use for cleaning wastewater.</p>\n<p><strong>What we learned from this interview.</strong> Carlos López Monllor, from the Water Technology Area, walked us through the kind of technical assistance work his team carries out for treatment-plant projects, from selecting the right treatment technology for a given site to supporting infrastructure planning, in Spain as well as in international cooperation projects. As part of this, he set out the European regulatory framework for wastewater discharge, how discharge limits are actually monitored and enforced in a real treatment plant, and gave us an overview of the treatment methods already established and in wide use, such as chemical precipitation and membrane-based tertiary treatment, against which any new technology, including ours, inevitably gets compared. Almudena Domínguez Cabrerizo, from the Hydro-Environmental Area, then took us into the laboratories responsible for characterising water quality down to very low concentrations. She showed us the kind of instrumentation used for that work, chromatography and mass-spectrometry equipment capable of detecting compounds at trace levels, alongside the sampling and analysis protocols her team uses to assess the ecological status of rivers, lakes and reservoirs. Seeing that level of analytical rigour first-hand made clear how far our own lab-scale phosphorus assay still was from an official reference method.</p>\n<p><strong>What changed in rePhlow.</strong> We stopped treating our malachite-green colorimetric assay as a finished method and started treating it as a first working approximation. We also stopped designing rePhlow against a generic idea of &quot;clean enough&quot; and started designing it against the actual European discharge limits and established treatment baselines Carlos described, which meant reframing rePhlow's value proposition as a complement to existing methods (particularly around phosphorus recovery) rather than a replacement for the whole treatment train.</p>\n<p><strong>What this opened next.</strong> With a clearer external picture of the standards rePhlow would ultimately be measured against, the remaining open front was hardware: what, precisely, needed to be built to prove any of this could work outside a beaker?</p>",
  },
  {
    id: "alvaro-2",
    index: 16,
    month: "October 2025",
    name: "Álvaro Ferrero Veintemilla",
    category: "Science",
    subcategory: "Housing the system: from bacteria to bioreactor",
    date: "4 October 2025",
    affiliation:
      "Department of Structure of Matter, Thermal Physics and Electronics, Faculty of Physics (UCM), iGEM team mentor & former iGEM 2024 participant, rePET project.",
    question:
      "How much hardware should we attempt to build, and what would count as a rigorous proof of concept?",
    inputLabel: "Input",
    inputText:
      "A complete theoretical process plus one deeply developed, reproducible component was more valuable than a superficial attempt to build the entire treatment train.",
    responseText:
      "We defined a focused lab-scale scope, technical specifications and an open-science documentation strategy.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> Before sketching a single pipe or buying a single component, we needed a theoretical framework for deciding which part of the hardware system was actually worth building. Álvaro, with previous experience on iGEM's RePet team, helped us set out that strategy from scratch.</p>\n<p><strong>What we learned from this interview.</strong> He explained that we didn't need to build the whole system: it was more valuable to propose a complete theoretical design (with engineering flow diagrams) and execute one specific part in depth, following a framework of excellence and a real technical specification. He stressed the biosafety of bacterial waste (lysed bacteria, membrane biofouling), the future scalability of the design, and that sustainability had to be built into the theoretical proposal even where it couldn't yet be tested at real scale. He also underlined the value of open science: sharing both positive and negative results, and documenting the logic behind every decision.</p>\n<p><strong>What changed in rePhlow.</strong> This conversation set the philosophy for the whole Hardware block: rather than trying to build a complete water-treatment system, we decided to focus on the solid–liquid separator (the filter) and treat the rest of the system as a justified, reproducible theoretical proposal in line with iGEM's excellence criteria.</p>\n<p><strong>What this opened next.</strong> Our first detailed design still used a conventional stirred-tank reactor, and whether that choice was compatible with the capsules would need bioprocess specialists to confirm.</p>",
  },
  {
    id: "israel",
    index: 17,
    month: "October 2025",
    name: "Israel Sánchez Moreno",
    category: "Science",
    subcategory: "Closing the loop: phosphorus revalorisation",
    date: "October 2025",
    affiliation: "Institute of General Organic Chemistry (IQOG, CSIC)",
    question:
      "Could DHAK's instability be fixed without breaking its catalytic function, so the PPK2/DHAK system could realistically be scaled up?",
    inputLabel: "Challenge raised",
    inputText:
      "Recommended PROSS, a structure-based stability-design algorithm, and helped us interpret why our first redesigned variant lost activity despite likely being more stable.",
    responseText:
      "We adopted a more conservative, staged approach to PROSS-based redesign, keeping the wild-type enzyme as our working system while testing safer variants.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> Once we had settled on the PPK2/DHAK coupled system, further investigation into DHAK's mechanism revealed it was fairly unstable, a real limitation if we ever wanted the system to scale. We went back to Israel, our mentor at IQOG-CSIC, to find a way of improving DHAK's stability without disrupting its activity.</p>\n<p><strong>What we learned from this interview.</strong> Israel introduced us to PROSS, a structure-based algorithm that proposes combinations of point mutations predicted to improve thermodynamic stability while explicitly protecting residues flagged as functionally important. Before running the design, we mapped DHAK's active site using its crystal structure in PyMOL, to make sure those residues were properly protected. PROSS returned ten candidate variants, ranging from conservative to aggressive; as a first attempt, we tested design 5, sitting in the middle of that range, but it showed almost no activity. Talking it through with Israel, we concluded that even with the ligand-contact residues protected, the sheer number of mutations in design 5 had probably disrupted the geometry around the active site or the packing between domains, even though the underlying stability itself had likely improved.</p>\n<p><strong>What changed in rePhlow.</strong> Rather than pushing forward with an inactive but more stable variant, we kept working with the wild-type DHAK enzyme in the meantime, and shifted our strategy towards testing a more conservative PROSS variant next, favouring a smaller, safer step towards stability over a bigger one that risked killing activity altogether.</p>\n<p><strong>What this opened next.</strong> With a stable, active DHAK variant still to be found, we started looking further ahead at how to make the coupled reaction more efficient once we had one, which led us to start exploring a SpyCatcher–SpyTag fusion system to physically link PPK2 and DHAK into a single complex, positioning both active sites so the substrate could channel directly between them. work that continues under Revalorisation.</p>",
  },
  {
    id: "juanma-1",
    index: 18,
    month: "October 2025",
    name: "Juan Manuel Bolívar",
    category: "Science",
    subcategory: "Enzyme immobilisation",
    date: "October 2025 – March 2026",
    affiliation:
      "Department of Chemical Engineering, Faculty of Chemistry (UCM)",
    question:
      "How could we develop and compare immobilisation strategies without confusing attachment effects with variability in the enzyme, support or assay?",
    inputLabel: "Challenge raised",
    inputText:
      "Developing immobilisation chemistry on a scarce, not-yet-characterised in-house enzyme risked confounding attachment strength with simple enzyme variability, and our first-choice colorimetric assay would fail entirely under the acidic conditions our own enzymes need to work in.",
    responseText:
      "We built a de-risked model system, a well-characterised support and enzyme, and a working assay, specifically so we could compare attachment chemistries fairly, rather than guessing which one was strong enough.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> Silvia's challenge had left us with a sharper, harder question than the one we'd started this block with: not simply how to immobilise our enzymes, but which attachment chemistry could actually be trusted with the toxic candidates in our panel, under conditions close to real operation. Juan Manuel's experience in enzyme immobilisation and biocatalysis allowed us to move from a conceptual requirement — recoverable enzymes — to a controlled experimental workflow.</p>\n<p><strong>What we learned from this interview.</strong> Our initial intention was to develop the immobilisation directly on an alginate–chitosan format connected to the rest of rePhlow. He advised against beginning with such a complex material: variability in composition, porosity, functional groups and preparation conditions would make it difficult to determine whether an unsuccessful result came from the enzyme, the attachment chemistry, or the support itself. He recommended MANAE-agarose, an amino-functionalised agarose that could serve as a well-characterised model matrix. Our own enzyme panel was not yet available in consistent quantities or soluble form, so Juan Manuel recommended beginning with a commercially available enzyme, Lecitase® Ultra, an industrial phospholipase relevant to vegetable-oil processing, whose reliable supply allowed the immobilisation conditions to be studied without enzyme scarcity becoming the limiting variable. He also identified a limitation in our initial colorimetric plan: for acid phosphatases, assays based on <em>p</em>-nitrophenyl phosphate cannot necessarily be followed continuously at the enzymes' acidic operating pH because the colour of the released <em>p</em>-nitrophenol depends strongly on its protonation state, reinforcing the consideration of fluorogenic substrates for screening under acidic conditions. For the Lecitase® Ultra model system, the activity assay was instead standardised using <em>p</em>-nitrophenyl butyrate. The model workflow allowed comparison of two approaches on a controlled basis: adsorption onto the support, and covalent attachment using glutaraldehyde activation or subsequent crosslinking.</p>\n<p><strong>What changed in rePhlow.</strong> Rather than testing our seven in-house enzymes directly on the final support, we first built a simplified model system in which each variable could be understood independently: a reliable commercial enzyme, MANAE-agarose as the model support, glutaraldehyde activation for covalent immobilisation, and an activity assay selected according to the catalytic properties and operating conditions of the enzyme being studied. Only once this model system was established could adsorption and covalent attachment be compared under the same controlled conditions — asking not only which method retained the highest catalytic activity, but also which provided the stronger and more reliable attachment. The resulting workflow deliberately postponed the transfer to our in-house enzyme panel until the behaviour of the support, the assay and the immobilisation chemistry had been understood separately, transforming the concern about enzyme detachment from a general safety question into a measurable experimental comparison.</p>\n<p><strong>What this opened next.</strong> While that comparison got under way in the lab, the project's third and largest industrial conversation was also landing that same October.</p>",
  },
  {
    id: "repsol",
    index: 19,
    month: "October 2025",
    name: "Repsol",
    category: "Industry",
    date: "21 October 2025",
    affiliation:
      "Maria Alicia Cardete García, Laura Gómez Espina, Ángela García Gil and Maria del Mar González Barroso",
    question:
      "What would prevent a large industrial operator from considering a biotechnology-based wastewater module?",
    inputLabel: "Critical view",
    inputText:
      "Living genetically modified organisms would not be acceptable without convincing evidence that environmental release had been prevented.",
    responseText:
      "We elevated containment evidence, not only removal performance, to a central condition for implementation.",
    fullEntryHtml:
      "<p><strong>Why we contacted these stakeholders.</strong> As a major energy and petrochemical operator managing large volumes of industrial wastewater, Repsol gave us a large-scale industrial perspective very different from a single biodiesel producer, including their internal appetite (and caution) around biotechnology-based treatment.</p>\n<p><strong>What we learned from this interview.</strong> The clearest message was about containment: Repsol emphasised that an industrial biotechnology involving living engineered microorganisms would require robust and convincing evidence of containment before implementation could be considered.</p>\n<p><strong>What changed in rePhlow.</strong> This conversation reinforced, from an industrial buyer's perspective, why our encapsulation work (see Bacterial Encapsulation) wasn't an optional extra: it was the precondition for rePhlow ever being considered for real deployment. It also confirmed that any future industrial pitch needs to lead with containment guarantees, not just phosphorus-removal performance.</p>\n<p><strong>What this opened next.</strong> With Bio-Oils, CEDEX and Repsol now covering a mid-sized producer, a public regulator and a large-scale operator, the remaining task was to integrate all three industrial perspectives into one implementation position: a modular unit for a defined stream, assessed against recognised methods and acceptable only with defensible biocontainment. That containment claim, though, still rested on hardware we hadn't tested: could the capsules perfected over the summer actually survive being pumped, stirred and mixed at scale?</p>",
  },
  {
    id: "victoria-juanma",
    index: 20,
    month: "March 2026",
    name: "Victoria E. Santos Mazorra & Juan Manuel Bolívar",
    category: "Science",
    subcategory: "Housing the system: from bacteria to bioreactor",
    date: "12 March 2026",
    affiliation:
      "Department of Chemical Engineering, Faculty of Chemistry (UCM)",
    question:
      "Could alginate core-shell capsules operate safely in the proposed stirred tank?",
    inputLabel: "Challenge raised",
    inputText:
      "Impeller shear and the baffles required for mixing could damage the capsules.",
    responseText:
      "We moved towards a basket-type rotating-bed reactor and simplified downstream separation.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> With a first stirred-tank bioreactor design sketched out, we looked for possible flaws or risk areas: aeration, mechanical damage to the core–shell capsules, and the difficulty of testing a 10 L volume in the lab. We convened two PIs with extensive experience in bioreactor operation to validate the design.</p>\n<p><strong>What we learned from this interview.</strong> They confirmed our alginate capsules would suffer considerable mechanical stress in a stirred tank, and that adding baffles to improve agitation would only make that damage worse. They proposed two bioreactor types that would solve the problem: fluidised bed (much more complex at lab scale) and basket-type (simple to use, eliminates the mechanical stress issue, and removes the need for a downstream Y-filter, cutting costs and integrating GMO separation simply and cheaply). We also discussed critical parameters to control — fluid dynamics, reaction time, capsule-to-volume ratio — and recommended experiments, such as residence-time-distribution (RTD) curves using coloured or conductive tracers. They also highlighted the modularity of rotating-bed reactors, which allows them to adapt to different processing volumes in industrial settings, facilitating scale-up while maintaining consistent process performance.</p>\n<p><strong>What changed in rePhlow.</strong> We abandoned the stirred tank as the main proof-of-concept and prioritised a basket-type rotating-bed design. The reactor and containment modules were now co-designed: the hardware would protect the capsules, while the basket would provide an additional physical retention barrier.</p>\n<p><strong>What this opened next.</strong> Removing the Y-filter changed the downstream process. We therefore asked a membrane specialist which separation stages remained necessary and which could realistically be tested with our facilities.</p>",
  },
  {
    id: "carmen-loreto-alvaro-2",
    index: 21,
    month: "March 2026",
    name: "Mª Carmen García Payo, Loreto García Fernández & Álvaro Ferrero Veintemilla",
    category: "Science",
    subcategory: "Housing the system: from bacteria to bioreactor",
    date: "17 March 2026",
    affiliation:
      "Department of Structure of Matter, Thermal Physics and Electronics, Faculty of Physics (UCM)",
    question:
      "How should downstream filtration change after adopting the basket reactor?",
    inputLabel: "Challenge raised",
    inputText:
      "The Y-filter was redundant, and experimental ultrafiltration was not feasible with the equipment and pressure range available to us.",
    responseText:
      "We removed the unnecessary filter and documented membrane polishing as a theoretical scale-up stage.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> Changing the bioreactor type also changed the downstream separation process. We approached an experienced researcher from UCM's membranes research group to review that part of the design.</p>\n<p><strong>What we learned from this interview.</strong> She explained that the Y-filter was no longer needed with the new bioreactor design, and that testing ultrafiltration in the lab wasn't feasible given the pressure required. She advised approaching that stage at a theoretical level, based on our own bioprocess, to keep the design scalable and modular even though it couldn't be validated experimentally at this stage.</p>\n<p><strong>What changed in rePhlow.</strong> We simplified the process by removing the Y-filter. The membrane stage remained part of the modular full-scale concept, but we reclassified it as theoretical future work rather than experimental evidence. This decision reduced the number of components while making the boundary between tested and untested work much clearer.</p>\n<p><strong>What this opened next.</strong> The final hardware proof of concept became a basket-type rotating-bed bioreactor with controlled agitation, designed specifically around the mechanical and biosafety requirements of the core-shell capsules, but a specification is not a prototype. To make sure ours reproduced what actually matters in a real rotating-bed system, we went to see one in operation.</p>",
  },
  {
    id: "juanma-2",
    index: 22,
    month: "March 2026",
    name: "Juan Manuel Bolívar",
    category: "Science",
    subcategory: "Housing the system: from bacteria to bioreactor",
    date: "25 March 2026",
    affiliation:
      "Department of Chemical Engineering, Faculty of Chemistry (UCM)",
    question:
      "Can we design and build a rotating-bed bioreactor as a proof of concept?",
    inputLabel: "Challenge raised",
    inputText:
      "Our DIY bioreactor would not provide the same level of process control as a commercial rotating-bed reactor, so we needed to identify the essential design features that should be replicated to obtain a meaningful proof of concept.",
    responseText:
      "We visited Juan Manuel Bolívar's laboratory to examine a commercial rotating-bed bioreactor and identify the key engineering parameters required for our prototype. The visit allowed us to validate the operating principles of our design and establish the critical aspects that should be maintained.",
    fullEntryHtml:
      "<p><strong>Why we contacted this stakeholder.</strong> After selecting the basket-type rotating-bed reactor as our final design, we wanted to ensure that our proof of concept reproduced the most relevant engineering features of commercial systems. Rather than simply building a functional prototype, we aimed to understand which design choices were essential for preserving hydrodynamics, protecting the alginate core-shell capsules, and enabling future scale-up. Juan Manuel Bolívar and his laboratory specialise in immobilised bioreactions, using several types of bioreactors, including rotating-bed bioreactors of similar volume to our proof of concept.</p>\n<p><strong>What we learned from this interview.</strong> During the laboratory visit, we observed the configuration of a commercial rotating-bed bioreactor and discussed the rationale behind its design. We learned that the rotating basket typically occupies approximately one third of the reactor volume, providing sufficient space for fluid circulation while maintaining efficient contact between the liquid phase and the immobilised biocatalyst. We also discussed the importance of maximising the flow through the basket to improve mass transfer around the capsules while maintaining laminar flow conditions to minimise mechanical stress. To achieve an appropriate packing density, Juan Manuel suggested that, if necessary, inert highly cross-linked alginate beads could be added to the basket to optimise flow distribution without compromising capsule integrity. Finally, we identified the key operational parameters that should be monitored in our proof of concept, including basket rotation speed, hydrodynamic behaviour, and flow patterns, acknowledging that although our prototype would not match the level of automation of commercial equipment, it should reproduce its fundamental operating principles.</p>\n<p><strong>What changed in rePhlow.</strong> The visit provided practical validation for our hardware design and led us to define the geometric proportions of the reactor and basket according to commercial practice. It also guided the internal packing strategy of the basket and reinforced the need to characterise fluid dynamics experimentally through mixing and residence-time studies. These observations increased our confidence that our prototype represents a realistic laboratory-scale model of an industrial rotating-bed bioreactor.</p>\n<p><strong>What this opened next.</strong> This closes the record of external interlocutors to date: the genetic, containment, enzyme, revalorisation, hardware and industrial threads all converge here into one buildable, testable system.</p>",
  },
];

export const PENDING_ENTRIES: PendingEntry[] = [
  {
    id: "donana",
    name: "Doñana Natural Space",
    category: "Environment",
    status: "Interviewee, date and full entry to confirm",
    note: "Our route physically passed through the wetlands and estuarine systems around Huelva, near Doñana, a UNESCO World Heritage site and critical stopover for migratory birds, whose water balance is threatened by agricultural over-extraction and nutrient runoff.",
  },
  {
    id: "canal-imdea",
    name: "Canal de Isabel II / IMDEA",
    category: "Environment",
    status: "Date to confirm",
    note: "Consulted as large-scale water-treatment entities. They made clear that conventional methods, chemical precipitation among them, remain the backbone of most treatment systems, and that these entities are not looking to replace their infrastructure overnight. RePhlow's realistic destination is to complement, not substitute, these methods. What this community needs above all is confidence: safety, continuous monitoring and a credible path to scalability.",
  },
  {
    id: "beehives-stakeholder",
    name: "Beehives",
    category: "Environment",
    status: "Pending — content not yet documented as a stakeholder interview",
    note: "The field visit itself, and what it revealed about phosphorus as both pollutant and essential nutrient, is documented in Travel Archive.",
  },
  {
    id: "entrepreneurship-pending",
    name: "Entrepreneurship (PCM, ComplUemprende, APTE, ENISA)",
    category: "Entrepreneurship",
    status: "Pending — full consultation details not yet available",
    note: "These consultations shaped rePhlow's implementation strategy: modular deployment, retrofit compatibility, and the treated-water-reuse and phosphorus-recovery model referenced as design responses in the Access & Fairness and Industrial Feasibility values of the Guiding Compass.",
  },
  {
    id: "bio-oils-interviewee",
    name: "Bio-Oils Huelva interviewee",
    category: "Industry",
    status: "Interviewee name to confirm",
    note: "The organisation and the substance of the consultation are documented in chronological entry 1; the individual interviewee still needs to be confirmed.",
  },
] as PendingEntry[];

export const USER_ROWS: UserRow[] = [
  {
    stakeholder:
      "Industrial phosphorus generators (e.g. biofuel, food or chemical industries)",
    relationship:
      "Potential first adopters. rePhlow could treat phosphorus-rich process or wastewater streams before discharge or reuse.",
    matters:
      "Compliance costs, process continuity, water reuse and avoiding disruption to existing treatment lines.",
    mustDemonstrate:
      "Compatibility with real operating conditions, modular integration and a credible economic advantage over existing treatment.",
  },
  {
    stakeholder: "Industrial wastewater operators and maintenance teams",
    relationship:
      "Would operate, inspect and intervene in the system during routine use or failure.",
    matters:
      "Reliability, ease of maintenance, occupational safety and predictable operating procedures.",
    mustDemonstrate:
      "Stable performance, accessible maintenance, effective containment and clear failure-response procedures.",
  },
  {
    stakeholder: "Water-treatment and infrastructure organisations",
    relationship:
      "Could evaluate or integrate the technology within larger treatment systems.",
    matters:
      "Scalability, monitoring, compatibility with existing infrastructure and long-term reliability.",
    mustDemonstrate:
      "Continuous monitoring, robust containment and a realistic pathway from laboratory prototype to larger-scale operation.",
  },
  {
    stakeholder: "Regulators and technical authorities",
    relationship:
      "Determine whether implementation and discharge claims are acceptable.",
    matters:
      "Reliable analytical evidence, environmental compliance and traceable risk management.",
    mustDemonstrate:
      "Recognised measurement methods, transparent performance claims and evidence that risks remain controlled under realistic conditions.",
  },
  {
    stakeholder: "Downstream communities and society",
    relationship:
      "Experience the consequences of water quality and influence the social acceptability of biotechnology.",
    matters:
      "Clean water, confidence that environmental risks are being managed, and understandable information about synthetic biology.",
    mustDemonstrate:
      "Transparent communication of benefits, uncertainties and containment measures without overstating what has been demonstrated.",
  },
  {
    stakeholder: "Aquatic ecosystems (e.g. Mar Menor or Embalse de San Juan)",
    relationship:
      'Not a conventional "user", but the ultimate environmental recipient of any treatment outcome.',
    matters:
      "Reduced nutrient pressure, lower eutrophication risk and protection of ecological function.",
    mustDemonstrate:
      "A measurable reduction in phosphorus reaching the environment without creating significant secondary impacts elsewhere.",
  },
  {
    stakeholder: "Scientific and technical community",
    relationship:
      "Evaluates the validity of the biological, enzymatic, material and reactor design.",
    matters:
      "Reproducibility, interpretability and evidence-based engineering.",
    mustDemonstrate:
      "Appropriate controls, transparent limitations and results that can be reproduced and built upon by others.",
  },
  {
    stakeholder: "Circular-economy and phosphorus users",
    relationship:
      "Could transform recovered phosphorus into new products or feedstocks.",
    matters:
      "Consistent material quality, usable phosphorus forms and sufficient economic value.",
    mustDemonstrate:
      "A defined recovery stream with known composition, purity and potential downstream applications.",
  },
  {
    stakeholder: "Future industrial adopters",
    relationship:
      "Determine whether rePhlow can move beyond a single case study or pilot.",
    matters: "Cost, adaptability, low maintenance and continuity of operation.",
    mustDemonstrate:
      "A modular platform that can be adapted to different phosphorus-rich streams without redesigning the entire system.",
  },
];
