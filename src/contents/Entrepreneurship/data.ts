/* --------------------------------------------------------------------------
   Entrepreneurship page — content data for the interactive widgets.
   Text is the team's reviewed copy (Notion export, v10 review); HTML
   fragments are rendered with <Html>. Edit wording here, not in the widgets.
   -------------------------------------------------------------------------- */

/** Line icons (24×24 stroke paths) in the wiki palette. */
export const IC = {
 "reactor": "<rect x=\"6\" y=\"5\" width=\"12\" height=\"15\" rx=\"2\"/><path d=\"M6 9h12M9 13h6M3 12h3M18 12h3\"/>",
 "capsules": "<circle cx=\"8\" cy=\"9\" r=\"4\"/><circle cx=\"16.5\" cy=\"8.5\" r=\"3\"/><circle cx=\"12.5\" cy=\"16\" r=\"4\"/>",
 "monitor": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M7 13l3-3 3 2 4-5M9 20h6M12 16v4\"/>",
 "wrench": "<path d=\"M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z\"/>",
 "flask": "<path d=\"M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3\"/><path d=\"M7.5 15h9\"/>",
 "clock": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/>",
 "euro": "<path d=\"M17 6.5A7 7 0 1 0 17 17.5M4 10h9M4 14h9\"/>",
 "building": "<path d=\"M4 21V5l8-3v19M12 21h8V9l-8-2M8 8v.01M8 12v.01M8 16v.01M16 13v.01M16 17v.01\"/>",
 "users": "<circle cx=\"9\" cy=\"8\" r=\"3\"/><path d=\"M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6\"/><circle cx=\"17\" cy=\"9\" r=\"2.5\"/><path d=\"M16 14c3 0 5 2 5 5\"/>",
 "speech": "<path d=\"M4 5h16v11H9l-5 4z\"/>",
 "thought": "<path d=\"M7 15a4 4 0 0 1 .5-8 5 5 0 0 1 9.5 1 3.5 3.5 0 0 1-.5 7z\"/><circle cx=\"7\" cy=\"19\" r=\"1.2\"/><circle cx=\"4\" cy=\"21.5\" r=\".8\"/>",
 "gear": "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1\"/>",
 "heart": "<path d=\"M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z\"/>",
 "unlock": "<rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7a4 4 0 0 1 7.5-2\"/>",
 "lock": "<rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"/>",
 "wave": "<path d=\"M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0\"/>",
 "factory": "<path d=\"M3 21V11l5 3v-3l5 3v-3l5 3V4h3v17z\"/>",
 "cycle": "<path d=\"M20 11a8 8 0 0 0-14-4.5M4 13a8 8 0 0 0 14 4.5\"/><path d=\"M6 3v4h4M18 21v-4h-4\"/>",
 "compass": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M15.5 8.5l-2 5-5 2 2-5z\"/>",
 "microbe": "<rect x=\"5\" y=\"8\" width=\"14\" height=\"8\" rx=\"4\"/><path d=\"M19 12h3M2 12h3M9 12h.01M12 12h.01M15 12h.01\"/>",
 "bin": "<path d=\"M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13\"/>",
 "thermo": "<path d=\"M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z\"/><path d=\"M12 9v8\"/>",
 "scale": "<path d=\"M12 4v16M7 20h10M5 7h14M5 7l-3 7h6zM19 7l-3 7h6z\"/>",
 "ruler": "<rect x=\"3\" y=\"8\" width=\"18\" height=\"8\" rx=\"1.5\"/><path d=\"M7 8v3M11 8v4M15 8v3M19 8v4\"/>",
 "microscope": "<path d=\"M6 21h12M9 17h6M12 17v-4\"/><path d=\"M9 4l4 2-3 6-4-2z\"/><path d=\"M14 9a5 5 0 0 1-2 8\"/>",
 "cap": "<path d=\"M2 9l10-5 10 5-10 5z\"/><path d=\"M6 11v5c3 2 9 2 12 0v-5M22 9v6\"/>",
 "check": "<path d=\"M5 12l5 5 9-10\"/>",
 "question": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17v.01\"/>",
 "drop": "<path d=\"M12 3c-4 5.5-6 8.5-6 11.5a6 6 0 0 0 12 0C18 11.5 16 8.5 12 3z\"/>",
 "doc": "<path d=\"M7 3h7l5 5v13H7z\"/><path d=\"M14 3v5h5M10 13h6M10 17h6\"/>",
 "medal": "<circle cx=\"12\" cy=\"15\" r=\"5\"/><path d=\"M8.5 10.5L6 3h4l2 5 2-5h4l-2.5 7.5\"/>",
 "leaf": "<path d=\"M5 19C5 10 10 5 20 4c0 10-5 15-14 15z\"/><path d=\"M5 19l8-8\"/>"
} as const;

/** Directive (EU) 2024/3019 timeline: [date, milestone, why it matters, implementation?]. */
export const DTL = [
 [
  "2024",
  "Directive (EU) 2024/3019 adopted",
  "Signals a new European nutrient-management framework.",
  0
 ],
 [
  "1 Jan 2025",
  "Directive enters into force",
  "The transition is no longer prospective legislation.",
  0
 ],
 [
  "31 Jul 2027",
  "Deadline for national transposition",
  "Member States incorporate the new framework into national law.",
  0
 ],
 [
  "2033",
  "First major tertiary-treatment implementation milestone",
  "Begins the progressive tightening of nutrient requirements.",
  1
 ],
 [
  "2036",
  "70% coverage milestone for the largest plants",
  "Creates increasing treatment investment pressure.",
  1
 ],
 [
  "2039",
  "100% coverage for the largest relevant plants",
  "Stricter nutrient treatment becomes mainstream for these installations.",
  1
 ],
 [
  "2045",
  "Full implementation for relevant smaller agglomerations in sensitive areas",
  "Completes the long-term regulatory transition.",
  1
 ]
] as const;

/** TAM/SAM/SOM for the upstream and downstream markets (HTML bodies). */
export const MKT = {
 "up": {
  "title": "Upstream market",
  "TAM": {
   "v": "≈ €272–485 M/year",
   "s": "Global industrial phosphorus removal market",
   "body": "<p>According to 360iResearch, the global phosphorus removal and recovery solutions market was valued at <strong>USD 1.23 billion in 2025</strong> and is projected to reach <strong>USD 2.19 billion by 2032</strong>, a compound annual growth rate (CAGR) of 8.6% [9]. Converted at the average 2025 ECB reference rate (1 EUR ≈ 1.13 USD), this corresponds to approximately €1.09 billion in 2025 and €1.94 billion in 2032.</p><p>However, rePhlow does not initially target the entire market. Our commercial focus is industrial wastewater treatment, for which we apply a preliminary 25% segmentation assumption.</p><div class=\"eq\">TAM = Global phosphorus removal market × Industrial market share<small>Using the same assumption for the projected 2032 market · 2025: €1.09 billion × 0.25 ≈ <span class=\"res\">€272 million/year</span> · 2032: €1.94 billion × 0.25 ≈ <span class=\"res\">€485 million/year</span></small></div><p>This provides an indicative industrial market opportunity of approximately €0.27–0.49 billion annually across the 2025–2032 reference period, conditional on the assumed industrial share. The 25% proportion remains an internal market-segmentation assumption rather than a verified figure from the published report.</p>"
  },
  "SAM": {
   "v": "≈ €130–200 M/year",
   "s": "European candidate facilities",
   "body": "<p>Our initial geographical focus is Europe. Our core segment is <strong>vegetable-oil processing, including biodiesel production</strong>: facilities that refine vegetable and residual oils and generate phosphorus-containing streams at a defined process step, degumming. Bio-Oils Huelva, our industrial collaborator, belongs to this segment.</p><p>FEDIOL, the European vegetable oil and protein meal industry association, reports approximately 180 processing facilities across its represented European sector [10]. Beyond this core, we identified selected food-processing industries as adjacent markets. Our preliminary screening model estimates <strong>1,200–1,800 candidate European facilities</strong> across core and adjacent segments, although this population requires further validation through sector-specific industrial inventories and wastewater characterisation.</p><p>Assuming an indicative average annual revenue of <strong>€110,000 per facility</strong>, which under our hybrid B2B model combines module supply, consumables and monitoring services:</p><div class=\"eq\">SAM = Number of candidate facilities × Annual revenue per facility<small>1,200 × €110,000 = €132 M/year · 1,800 × €110,000 = €198 M/year → <span class=\"res\">SAM ≈ €130–200 million/year</span></small></div><p>This represents our preliminary European market ceiling, assuming all candidate facilities are technically suitable and commercially serviceable.</p><details class=\"more\"><summary>How SAM relates to TAM</summary><div class=\"more-body\"><p>Our SAM is a bottom-up ceiling, built from candidate facility counts and our own revenue hypothesis. It is not derived from the TAM, which is a top-down estimate based on published market research and an assumed industrial share. The two figures use different methods and should not be read as nested subsets. As our pricing and facility screening are validated, we will use the top-down estimate as a cross-check of our bottom-up assumptions.</p><p>The annual revenue estimate is an internal pricing hypothesis that will be refined through equipment costing, operating expenditure analysis and industrial stakeholder engagement. Likewise, the final number of eligible sites will depend on effluent composition, phosphorus concentration, treatment performance and contained-use regulatory feasibility.</p></div></details>"
  },
  "SOM": {
   "v": "≈ €1.3–1.8 M/year",
   "s": "Year 7 deployment scenario",
   "body": "<p>Rather than assuming rapid penetration of the European wastewater-treatment market, rePhlow adopts a progressive deployment strategy. Our proposed commercial pathway begins with industrial pilot validation at Bio-Oils in Huelva, establishing a reference application before expanding towards comparable facilities in the Iberian Peninsula and Southern Europe.</p><p>By Year 7, our planning scenario envisages <strong>12–16 industrial facilities</strong>, corresponding to approximately <strong>20 installed bioreactor modules</strong>.</p><div class=\"eq\">SOM = Commercially deployed facilities × Annual revenue per facility<small>12 × €110,000 = €1.32 M/year · 16 × €110,000 = €1.76 M/year → <span class=\"res\">SOM (Year 7) ≈ €1.3–1.8 million/year</span></small></div><p>To evaluate the scale of adoption required, we calculated the corresponding penetration of our estimated European candidate-site population:</p><div class=\"eq\">Market penetration (%) = (Commercially deployed facilities / European candidate facilities) × 100<small>Minimum penetration = (12 / 1,800) × 100 = 0.67% · Maximum penetration = (16 / 1,200) × 100 = 1.33%</small></div><div class=\"pen\"><div class=\"pen__bar\"><div class=\"pen__fill\" data-w=\"13.3\"></div></div><div class=\"pen__lbl\"><span>0%</span><span><strong>Required market penetration ≈ 0.7–1.3%</strong> (12/1,800 → 16/1,200)</span><span>10%</span></div></div><p>This is central to our commercial strategy. <strong>rePhlow does not need to capture a dominant market share to establish a meaningful industrial business.</strong> Our initial objective is to demonstrate the technology’s economic and operational viability and progressively replicate it across compatible facilities. The SOM is a deployment scenario, not a forecast of secured contracts. Its achievement will depend on successful pilot validation, regulatory authorisation, competitive treatment costs and customer adoption.</p>"
  },
  "intro": "<p>Our primary commercial opportunity lies in industrial wastewater treatment. Rather than requiring operators to establish an entirely new expenditure category, rePhlow aims to <strong>redirect existing phosphorus-treatment expenditure</strong> towards a biological system capable of combining removal with resource recovery.</p>"
 },
 "down": {
  "title": "Downstream market",
  "TAM": {
   "v": "€1.5–3 B/year",
   "s": "Exploratory reference range",
   "body": "<p>The broad commercial reference market encompasses specialty phosphorylated chemicals, fine chemical intermediates and cofactor-dependent biocatalytic processes. However, these applications do not constitute a single, clearly defined market category. Consequently, aggregating their reported market sizes could introduce double counting or include products that cannot realistically incorporate rePhlow-derived phosphorus. We therefore define our downstream TAM conceptually as:</p><div class=\"eq\">TAM (downstream) = Global annual expenditure on commercially relevant phosphorylated products and compatible biocatalytic inputs</div><p>Our preliminary business model considered a reference range of €1.5–3 billion annually. Nevertheless, because this range cannot yet be traced to a sufficiently specific and independently verified market dataset, <strong>we retain it as an exploratory internal estimate rather than a validated TAM.</strong></p>"
  },
  "SAM": {
   "v": "€150–400 M/year",
   "s": "European compatible biocatalysis applications",
   "body": "<p>The downstream addressable market is narrower than the global specialty chemicals sector. Our initial focus would be <strong>European research and industrial groups developing new enzymatic synthesis routes</strong>, particularly applications where the cost of ATP or conventional phosphoryl donors limits commercial viability.</p><p>Unlike established pharmaceutical manufacturing processes, where replacing a qualified input may require extensive validation, newly developed routes could offer a more accessible entry point.</p><p>Our preliminary European screening estimate of €150–400 million annually remains subject to validation. A defensible quantitative SAM will require identifying compatible applications, their annual production volumes, phosphoryl-donor requirements and qualification constraints.</p>"
  },
  "SOM": {
   "v": "Pending pilot validation",
   "s": "Production-constrained opportunity",
   "body": "<p>For downstream valorisation, market capture cannot be estimated independently of the amount of phosphorus recovered by our installed bioreactors. We therefore developed a <strong>production-constrained bottom-up model</strong>, linking downstream sales potential directly to the physical recovery capacity of the upstream system.</p><div class=\"eq\">Recovered phosphorus = <span class=\"var\" title=\"Number of installed bioreactor modules\">N</span>×<span class=\"var\" title=\"Wastewater flow rate per module\">Q</span>×<span class=\"var\" title=\"Influent phosphorus concentration\">C</span>×<span class=\"var\" title=\"Annual operating time\">t</span>×<span class=\"var\" title=\"Phosphorus hydrolysis efficiency\">η<sub>h</sub></span>×<span class=\"var\" title=\"Biological phosphorus uptake efficiency\">η<sub>u</sub></span>×<span class=\"var\" title=\"Final phosphorus recovery efficiency\">η<sub>r</sub></span><small>Hover each term</small></div><p class=\"small\" id=\"varTxt\">Where: <strong>N</strong>: Number of installed bioreactor modules. <strong>Q</strong>: Wastewater flow rate per module. <strong>C</strong>: Influent phosphorus concentration. <strong>t</strong>: Annual operating time. <strong>η<sub>h</sub></strong>: Phosphorus hydrolysis efficiency. <strong>η<sub>u</sub></strong>: Biological phosphorus uptake efficiency. <strong>η<sub>r</sub></strong>: Final phosphorus recovery efficiency.</p><p class=\"small\">For this simplified model, all efficiencies must refer to compatible sequential stages, while Q, C and t must use consistent units.</p><p>The downstream revenue ceiling is subsequently estimated as:</p><div class=\"eq\">SOM (downstream) = min(Recoverable P available for sale, Market demand) × Realised revenue per unit of P</div><p>Here, market demand is expressed in equivalent phosphorus units and the unit revenue depends on the product obtained and its conversion yield. This approach prevents our downstream projections from exceeding the amount of phosphorus that rePhlow could physically recover.</p><p>At present, the recovery, purification and conversion yields required to quantify this opportunity remain subject to experimental validation. We therefore consider downstream SOM a <strong>future revenue opportunity rather than an established commercial forecast.</strong></p>"
  },
  "intro": "<p>Our second commercial opportunity emerges once phosphorus has been recovered. Rather than limiting its final application to conventional fertiliser production, rePhlow investigates the use of <strong>polyphosphate as a phosphoryl donor</strong> in enzyme-catalysed reactions, including ATP-regeneration systems and the synthesis of specialty phosphorylated compounds. This opportunity is supported by research demonstrating the potential of polyphosphate kinases for ATP regeneration in industrial biocatalysis. Tavanti et al. demonstrated multigram-scale enzymatic synthesis supported by a PPK2-III-based ATP-regeneration system [11], while subsequent work discussed the technological challenges involved in implementing these enzymes in chemical manufacturing [12].</p>"
 }
} as const;

/** Panel tint per ring: [background, border]. */
export const RINGC = {
 "intro": [
  "#f4faf9",
  "#cfe3df"
 ],
 "TAM": [
  "#e8f5f5",
  "#9fd3d3"
 ],
 "SAM": [
  "#dcefee",
  "#6fb9b5"
 ],
 "SOM": [
  "#eef8e6",
  "#a9d68a"
 ]
} as const;

/** Stakeholder matrix: quadrant → [name, subtitle, role, why, skills, priorities, commercial implication]. */
export const SH = {
 "mc": {
  "t": "Manage closely",
  "items": [
   [
    "Bio-Oils Huelva",
    "Biodiesel production company",
    "Industrial problem owner, potential pilot host and first-reference partner.",
    "Bio-Oils provides the industrial context around which rePhlow has been developed. Its wastewater characteristics and treatment requirements make it a potential first application for demonstrating the technology under real operating conditions. A successful pilot could establish the credibility needed to approach comparable industrial facilities.",
    "Industrial wastewater characterisation, process engineering, operational expertise and knowledge of existing treatment infrastructure.",
    "Phosphorus removal efficiency, operational costs, biosafety, process integration and minimal production downtime.",
    "Prioritise a contained, modular pilot that demonstrates measurable treatment performance, operational reliability and economic feasibility before proposing wider industrial deployment."
   ],
   [
    "REPSOL",
    "Global energy and petrochemical company",
    "Strategic industrial stakeholder and potential scale-up enabler.",
    "As a major industrial operator, REPSOL provides insight into the standards required for large-scale industrial adoption. Its emphasis on biosafety has highlighted the importance of incorporating containment and risk management into rePhlow’s commercial development.",
    "Industrial process expertise, technological assessment, operational risk management and experience with large-scale infrastructure.",
    "Biosafety, regulatory compliance, technological maturity, process reliability and economic viability.",
    "Integrate biological containment and industrial safety requirements into the technology from the earliest development stages, ensuring that future deployment meets industrial expectations."
   ],
   [
    "CEDEX",
    "Public and environmental engineering centre",
    "Public technical institution and potential independent validation stakeholder.",
    "Independent technical evaluation could strengthen the credibility of rePhlow’s performance claims and provide the evidence required for industrial decision-making.",
    "Water-quality assessment, treatment-process evaluation, hydraulic engineering and environmental performance analysis.",
    "Reproducible results, representative operating conditions, reliable treatment efficiency and robust experimental methodology.",
    "Establish standardised performance indicators and validation protocols that enable independent technical assessment of the bioreactor."
   ],
   [
    "Engineering partners",
    "Engineering and bioreactor integration partners",
    "Technology implementation partners and industrial scale-up enablers.",
    "Translating rePhlow from laboratory-scale experimentation into an industrial installation requires engineering expertise beyond biological performance. Bioreactor design, hydraulic efficiency and integration into existing infrastructure will influence commercial feasibility.",
    "Process engineering, bioreactor design, fluid dynamics, industrial automation, equipment manufacturing and system integration.",
    "Operational reliability, scalability, containment, maintenance accessibility and cost-effective installation.",
    "Incorporate industrial engineering requirements into pilot development to ensure that the proposed technology can be manufactured, operated and maintained economically."
   ],
   [
    "Industrial procurement & financial decision-makers",
    "",
    "Economic buyers and investment approval gatekeepers.",
    "Technical feasibility alone does not guarantee commercial adoption. Procurement teams, plant managers and financial decision-makers determine whether a new treatment technology offers sufficient economic value to justify investment.",
    "Capital budgeting, supplier evaluation, investment appraisal, financial risk assessment and contract negotiation.",
    "Return on investment, total cost of ownership, operational reliability, regulatory compliance and supplier credibility.",
    "Develop a customer-specific business case comparing rePhlow with existing phosphorus-treatment technologies, including investment costs, operating expenditure, maintenance and potential resource-recovery value."
   ]
  ]
 },
 "ks": {
  "t": "Keep satisfied",
  "items": [
   [
    "Permitting authorities",
    "Permitting and regulatory authorities",
    "Regulatory gatekeepers and market-access decision-makers.",
    "Industrial deployment depends on compliance with environmental regulations and applicable contained-use requirements for genetically modified microorganisms. Regulatory approval may determine the timeline and conditions of commercial implementation.",
    "Regulatory interpretation, environmental permitting, biosafety assessment, authorisation procedures and compliance monitoring.",
    "Biological containment, environmental protection, traceability, operational monitoring and risk prevention.",
    "Develop the regulatory strategy alongside technical validation, incorporating containment requirements and authorisation timelines into the commercial roadmap."
   ],
   [
    "Occupational-safety specialists",
    "",
    "Workplace safety advisers and industrial deployment enablers.",
    "Safe industrial operation requires protecting personnel involved in installation, monitoring and maintenance. Occupational risks could create additional barriers to adoption if not addressed during system design.",
    "Occupational risk assessment, industrial safety procedures, operator training, emergency planning and safe equipment management.",
    "Prevention of biological exposure, safe material handling, accessible maintenance procedures and minimisation of workplace hazards.",
    "Design the bioreactor to minimise operator exposure and develop clear operating, maintenance and emergency procedures before industrial deployment."
   ],
   [
    "Canal de Isabel II",
    "Public water utility",
    "Operational adviser on integration into existing treatment infrastructure.",
    "They provided the perspective of an operator managing plants that were not designed for nutrient recovery, and confirmed that conventional precipitation remains the backbone of most installed infrastructure and is not being replaced quickly.",
    "Large-scale plant operation, retrofit constraints, asset management and procurement in a public utility context.",
    "Operational continuity, proven reliability, compatibility with existing assets and predictable maintenance.",
    "Design for retrofit without civil works, and position rePhlow as a complement to existing treatment rather than a substitution."
   ],
   [
    "IMDEA Water",
    "Research institute",
    "Independent technical validation partner.",
    "External expertise in water treatment and resource recovery strengthens the credibility of our performance claims and helps define methods that a third party could reproduce.",
    "Treatment process evaluation, nutrient recovery, analytical methods and experimental design.",
    "Methodological rigour, reproducibility, representative operating conditions and transparent reporting.",
    "Build validation protocols to a standard an external institution could repeat, rather than to a standard that only works in our own laboratory."
   ]
  ]
 },
 "mo": {
  "t": "Monitor",
  "items": [
   [
    "Smaller industrial facilities",
    "",
    "Potential future adopters and secondary customer segment.",
    "Smaller industrial operators may benefit from modular phosphorus-treatment solutions but often face tighter financial and operational constraints. They represent a potential expansion market following successful deployment in larger facilities.",
    "Knowledge of small-scale industrial processes, local wastewater-management requirements and cost-sensitive operational decisions.",
    "Affordability, straightforward installation, low maintenance requirements and predictable operating expenditure.",
    "Explore standardised, lower-capacity modules and service-based pricing models after demonstrating technical and economic feasibility in the initial industrial market."
   ],
   [
    "Waste handlers",
    "",
    "Waste-management partners and end-of-life service stakeholders.",
    "The management of spent encapsulation materials, biological residues and other operational waste streams influences environmental performance, regulatory compliance and life-cycle costs.",
    "Waste classification, collection, transport, treatment, disposal and regulatory compliance.",
    "Safe handling, traceability, appropriate waste classification and reliable treatment procedures.",
    "Include spent-material management and disposal costs in the operational model and establish suitable end-of-life procedures before industrial implementation."
   ],
   [
    "Environmental organisations",
    "",
    "Environmental interest groups and social legitimacy stakeholders.",
    "Environmental organisations can identify ecological concerns, contribute perspectives on nutrient pollution and encourage accountability in the development of new environmental technologies.",
    "Environmental advocacy, ecosystem knowledge, stakeholder communication and assessment of broader ecological impacts.",
    "Nutrient pollution reduction, ecological protection, biosafety, transparency and demonstrable environmental benefits.",
    "Support environmental claims with reliable data and incorporate ecological considerations into technology assessment and communication."
   ]
  ]
 },
 "ki": {
  "t": "Keep informed",
  "items": [
   [
    "Plant operators",
    "",
    "End users and operational adoption stakeholders.",
    "Plant operators will interact directly with the technology. Their acceptance and ability to operate the system efficiently are essential for successful integration into existing wastewater-treatment processes.",
    "Wastewater-treatment operations, process monitoring, troubleshooting and practical knowledge of industrial workflows.",
    "Operational simplicity, system reliability, safe handling, straightforward monitoring and minimal disruption.",
    "Prioritise user-friendly operation, accessible monitoring systems and compatibility with existing industrial procedures."
   ],
   [
    "Maintenance workers",
    "",
    "Operational support and long-term reliability stakeholders.",
    "Maintenance requirements influence operational continuity, equipment lifetime and the overall cost of using rePhlow. Frequent or complex interventions could reduce its commercial attractiveness.",
    "Preventive maintenance, mechanical troubleshooting, equipment servicing and identification of operational failures.",
    "Accessible components, predictable servicing intervals, safe maintenance and rapid replacement of consumables.",
    "Develop a modular design with replaceable components and validate capsule durability and maintenance requirements under realistic operating conditions."
   ],
   [
    "Users of recovered phosphorus",
    "",
    "Potential downstream customers and product qualification stakeholders.",
    "Recovered phosphorus only creates additional commercial value if it meets the requirements of potential customers in specialty chemistry and biocatalysis. Their needs will determine which downstream applications are technically and economically viable.",
    "Enzymatic synthesis, product characterisation, quality assessment, chemical manufacturing and knowledge of phosphorylated compound applications.",
    "Product purity, consistent composition, reliable supply, competitive pricing and compatibility with existing processes.",
    "Define product specifications before scaling recovery and initially explore research and pilot-scale applications where qualification barriers may be lower."
   ],
   [
    "UCM &amp; CSIC",
    "Complutense University of Madrid and CSIC",
    "Scientific partners and technology development enablers.",
    "Scientific collaboration provides expertise and resources essential for developing and validating rePhlow’s biotechnology platform. In particular, CIB-CSIC has supported our genetic engineering work through scientific guidance and the provision of plasmid tools for CRISPR-based editing.",
    "Molecular biology, microbial engineering, CRISPR-based genome editing, experimental design, scientific infrastructure and technological validation.",
    "Scientific robustness, reproducibility, biosafety, technological innovation and reliable experimental evidence.",
    "Maintain scientific collaboration throughout technical development while clarifying intellectual property, technology-transfer arrangements and potential opportunities for further research."
   ],
   [
    "Local communities &amp; affected ecosystems",
    "",
    "Environmental beneficiaries and wider social stakeholders.",
    "Communities affected by nutrient pollution and vulnerable aquatic ecosystems represent the environmental outcomes that motivate rePhlow’s development. Although they are not direct purchasers, their interests are relevant to the responsible deployment of phosphorus-recovery technologies.",
    "Local environmental knowledge, community perspectives and identification of ecological concerns and social expectations.",
    "Water quality, ecosystem protection, transparency, responsible biotechnology use and measurable environmental improvement.",
    "Evaluate commercial success alongside environmental performance, ensuring that sustainability claims are supported by measurable outcomes and transparent communication."
   ]
  ]
 },
 "cc": {
  "t": "Cross-cutting stakeholders",
  "items": [
   [
    "Funding organisations &amp; entrepreneurship accelerators",
    "",
    "Financial enablers, entrepreneurial development partners and commercialisation supporters.",
    "Moving from a student-led biotechnology project to an industrially deployable technology requires financial resources, strategic guidance and access to relevant business networks. Entrepreneurship programmes have helped rePhlow explore its commercial potential and develop the capabilities required for future market entry.",
    "Business mentoring, financial planning, investor readiness, market validation, entrepreneurship training, networking and access to innovation ecosystems. Our entrepreneurial development has included initiatives such as Santander X, Fábrica UCM, Compluemprende, APTenisa and engagement with the wider entrepreneurship and innovation ecosystem.",
    "Technological differentiation, commercial feasibility, market demand, scalability, financial sustainability and clearly defined development milestones.",
    "Align funding opportunities with measurable technological and commercial objectives, prioritising resources for industrial validation, regulatory preparation, business-model development and scale-up."
   ]
  ]
 }
} as const;

/** Quadrant colours: [accent, tint]. */
export const SHC = {
 "ks": [
  "#c4472a",
  "#fdece6"
 ],
 "mc": [
  "#2E7D86",
  "#e3f2f1"
 ],
 "mo": [
  "#5f7d36",
  "#eef5e4"
 ],
 "ki": [
  "#6e5a96",
  "#f1edf7"
 ],
 "cc": [
  "#a77a12",
  "#fdf6e1"
 ]
} as const;

/** Beachhead totals: [segment, score of 35, crown label]. */
export const BH = [
 [
  "Bio-Oils Huelva",
  32,
  "selected beachhead"
 ],
 [
  "Large multinational operators",
  22,
  ""
 ],
 [
  "Municipal treatment plants",
  16,
  ""
 ]
] as const;

/** SMART framework: [letter, word, summary]. */
export const SM = [
 [
  "S",
  "Specific",
  "First-use case: phosphorus capture and recovery from a Bio-Oils Huelva degumming-related industrial stream."
 ],
 [
  "M",
  "Measurable",
  "Technical development targets include ≥70% phosphorus removal within 6 h (go/no-go), &lt;0.1 mg P/L as an ambitious treatment benchmark, measurable polyphosphate accumulation and a quantified recovery mass balance (full list below). These are targets, not results."
 ],
 [
  "A",
  "Achievable",
  "Bench scale first: close component-level evidence and then integrate a 5 L semi-continuous MVP before any industrial claim."
 ],
 [
  "R",
  "Realistic",
  "Adoption conditions: retrofitability, process robustness, capsule recovery, containment, a workable regulatory route and a competitive total cost of treatment."
 ],
 [
  "T",
  "Time-bound",
  "01 Laboratory validation → 02 Industry-informed validation, including the 5 L MVP → 03 Pilot preparation with an industrial partner. A funded host-site pilot and replication at a second site follow only if these milestones are met. These milestones sit inside Phases 1 and 2 of our development plan → see <a href=\"#s3-gantt\"><u>Gantt Chart</u></a>."
 ]
] as const;

/** PESTEL: [letter, factor, colour, external factor, implication]. */
export const PE = [
 [
  "P",
  "Political",
  "#6e5a96",
  "EU water resilience, circular-economy and resource-security policies increasingly favour pollution prevention and resource recovery.",
  "Creates a favourable policy environment, but policy support alone does not guarantee customer demand."
 ],
 [
  "E",
  "Economic",
  "#c9962b",
  "Wastewater treatment faces reagent, sludge-management, energy and infrastructure costs, while industrial customers remain highly sensitive to CAPEX, OPEX and retrofit requirements.",
  "rePhlow must demonstrate a competitive total cost of treatment, not only phosphorus-removal performance."
 ],
 [
  "S",
  "Social",
  "#e2542d",
  "Eutrophication has become an increasingly visible environmental problem, while the use of GM microorganisms can generate concerns around biosafety and trust.",
  "Commercial acceptance depends on demonstrating both environmental value and credible biological containment."
 ],
 [
  "T",
  "Technological",
  "#2E7D86",
  "Established water-treatment technologies coexist with less mature elements such as long-term immobilised-GMO operation and biological phosphorus recovery.",
  "Scale-up must be treated as a sequence of technical validation milestones rather than assumed from laboratory performance."
 ],
 [
  "E",
  "Environmental",
  "#7c9a4e",
  "Excess phosphorus damages aquatic ecosystems, while virgin phosphate supply and conventional removal routes carry their own environmental burdens.",
  "rePhlow must demonstrate that recovery produces a net environmental benefit, rather than simply transferring phosphorus into another waste stream."
 ],
 [
  "L",
  "Legal",
  "#3e4a2a",
  "Wastewater discharge, GMO contained-use, environmental liability, waste status and recovered-product regulation may all affect deployment.",
  "Regulatory compliance must be designed into the technology and business model from the beginning rather than addressed after scale-up."
 ]
] as const;

/** Mass balance term explanations. */
export const MB = {
 "in": "P<sub>influent</sub>: the phosphorus entering the reactor with the effluent.",
 "eff": "P<sub>effluent</sub>: the phosphorus still leaving in the treated effluent.",
 "ret": "P<sub>retained</sub>: the phosphorus still held inside the capsules at the end of a cycle.",
 "rec": "P<sub>recovered</sub>: the phosphorus extracted into the downstream fraction.",
 "un": "P<sub>unaccounted</sub>: whatever the other terms cannot explain — the gap the balance makes visible."
} as const;

/** Golden circle texts. */
export const GC = {
 "why": [
  "Why?",
  "Phosphorus pollution contributes to eutrophication and ecosystem degradation, while conventional treatment frequently converts this finite resource into a waste that is difficult to recover. rePhlow was created to break this linear cycle by treating phosphorus not only as a contaminant to be removed, but as a resource to be retained and reused."
 ],
 "how": [
  "How?",
  "By combining phosphorus-releasing enzymes with engineered <em>Pseudomonas putida</em> inside recoverable alginate-chitosan capsules, and by feeding the recovered polyphosphate into an enzymatic cascade. The enzymes free the phosphate, the bacteria store it as polyphosphate, the capsules keep the cells contained, and the recovered polyphosphate then serves as a phosphoryl donor for higher-value products."
 ],
 "what": [
  "What?",
  "rePhlow is a modular phosphorus-capture and recovery platform for industrial wastewater. It is designed to be integrated into existing treatment infrastructure, reduce reliance on metal-based precipitation and create a recoverable phosphorus-rich output rather than a disposal-only sludge."
 ]
} as const;

/** Business Model Canvas blocks (pop-up content). */
export const BMC = [
 {
  "k": "kp",
  "n": 8,
  "t": "Key Partners",
  "items": [
   [
    "A",
    "<b>Bio-Oils Huelva:</b> effluent, data, first customer"
   ],
   [
    "B",
    "<b>Canal de Isabel II:</b> plant integration"
   ],
   [
    "",
    "<b>Repsol:</b> industrial view on containment"
   ],
   [
    "",
    "<b>CEDEX:</b> water-quality methods"
   ],
   [
    "",
    "<b>IMDEA Water:</b> treatment &amp; recovery"
   ],
   [
    "",
    "<b>UCM, CIB, CBM, IQOG-CSIC:</b> research, labs, reactor design"
   ],
   [
    "",
    "Compluemprende, UCM OTRI"
   ],
   [
    "",
    "Alginate, enzyme, membrane &amp; reactor suppliers; insurers"
   ]
  ],
  "obj": "Partners provide what a student team cannot build alone: real effluents, independent methods, reactor expertise and a route to market. → Their position in our wider stakeholder landscape is mapped in <a href='#s1-stakeholders'><u>Stakeholder Mapping</u></a>.",
  "full": "<p>On the industrial side, Bio-Oils Huelva supplies effluent samples and process data as well as being our first prospective customer and first buyer of recovered phosphorus. Canal de Isabel II advised us on integration into facilities not designed for recovery, and Repsol gave the view of a large industrial adopter on containment in normal operation and under foreseeable failure.</p><p>On the validation side, CEDEX informed the evidence standard we now apply to our own measurements and to this document’s evidence grading, and IMDEA Water brings treatment and recovery expertise. The Department of Chemical Engineering at UCM has advised on rotating-basket geometry, packing density and shear, and UCM, CIB-CSIC, CBM and IQOG-CSIC provide scientific support and lab infrastructure.</p><p>Compluemprende and UCM OTRI support the transition from team to company, including the intellectual property decision. Suppliers of alginate, chitosan, enzymes, membranes and reactor components sit alongside insurers, who are a partner rather than a vendor here: environmental liability cover for work with modified organisms is a condition of operating, not an optional expense.</p>",
  "risks": "MKT-01, REG-03, OPS-02, OPS-03",
  "oq": "What has been formalised with each partner, whether data, samples or a letter of support."
 },
 {
  "k": "ka",
  "n": 7,
  "t": "Key Activities",
  "items": [
   [
    "",
    "Strain &amp; enzyme engineering"
   ],
   [
    "",
    "Capsule manufacture (contained-use facility)"
   ],
   [
    "",
    "Reactor scale-up &amp; polyP revalorisation"
   ],
   [
    "",
    "Containment monitoring, regulation, sales &amp; O&amp;M"
   ]
  ],
  "obj": "Set out what rePhlow must do itself to deliver the value propositions, including what it keeps in-house for regulatory reasons.",
  "full": "<p>The technical work runs from strain engineering, moving validated inserts to the chromosome, through producing and immobilising the enzyme panel matched to the phosphorus fractions measured in each stream, to characterising real effluents and validating the rotating-basket geometry at two scales before we quote any plant-scale figure. Downstream sits the extraction of polyphosphate and the biocatalytic cascade that revalorises it.</p><p>Capsule manufacture is deliberately kept inside rePhlow’s own notified contained-use facility. The customer neither manufactures nor stores modified organisms, which keeps the administrative burden with us rather than with them. For the same reason we run containment monitoring by culture and qPCR on the treated effluent and centralise the inactivation of returned capsules.</p><p>The remaining activities are regulatory and commercial: establishing the contained-use classification, settling the route for the recovered product, then sales, installation and operation and maintenance.</p><p>No release takes place during the competition, in line with iGEM’s safety policy [6]. Field operation belongs to the industrial pilot that follows it.</p>",
  "risks": "TEC-01 through TEC-08, BIO-01, BIO-03, REG-02, REG-05",
  "oq": ""
 },
 {
  "k": "kr",
  "n": 6,
  "t": "Key Resources",
  "items": [
   [
    "",
    "<em>P. putida</em> KT2440 (HV1 host)"
   ],
   [
    "",
    "Enzyme panel &amp; capsule formulation"
   ],
   [
    "",
    "Reactor know-how &amp; data platform"
   ],
   [
    "",
    "Team &amp; expert advisors"
   ]
  ],
  "obj": "Name the assets the model depends on, and be explicit about where our defensibility currently comes from while the protection decision is still open.",
  "full": "<p>The biological core is <em>P. putida</em> KT2440, a documented safety strain certified as a host-vector system 1 organism [5]. The target for the pilot strain is chromosomal inserts and no antibiotic resistance markers, which removes the most credible route for horizontal gene transfer rather than arguing it is improbable. Around it sit the immobilised enzyme panel and the core-shell alginate-chitosan capsule formulation.</p><p>The process know-how is the rotating-basket geometry, packing density, the polyphosphate extraction step and the revalorisation cascade. To this we add stream characterisation data from partner effluents and the software platform that monitors performance and produces compliance reports.</p><p>The team itself is a resource: synthetic biology, process engineering and business, supported by academic and industrial advisors.</p><p>Our intellectual property position follows iGEM’s open model in what it requires: parts are shared through the iGEM Registry and this wiki is published under CC BY 4.0. That is compatible with protecting what we develop around them, and we intend to assess novelty and freedom to operate with UCM OTRI before deciding what, if anything, to file for the integrated bioreactor and the encapsulation system. Until that decision is taken, our defensibility rests on three things that do not depend on it: combining the pieces into a working system, operating know-how that is not in the published parts, and the capsule supply and monitoring relationship with each customer. → See <a href='#s2-ip'><u>Intellectual Property Strategy</u></a>.</p>",
  "risks": "BIO-04, REG-04, MKT-05, OPS-02, OPS-03",
  "oq": "Which elements, if any, to protect beyond the open iGEM model after the competition, a decision to take with UCM OTRI."
 },
 {
  "k": "vp",
  "n": 2,
  "t": "Value Propositions",
  "cls": "vp",
  "items": [
   [
    "A",
    "<b>Phosphorus removed at source</b>, incl. organic &amp; condensed fractions dosing misses"
   ],
   [
    "AC",
    "<b>Reused in the customer’s own process</b>, closing the loop"
   ],
   [
    "B",
    "<b>Complement to chemical precipitation:</b> less salt &amp; sludge, aligned with EU policy"
   ],
   [
    "C",
    "<b>Secondary European phosphorus</b> as a product or polyP intermediate"
   ],
   [
    "",
    "<b>Containment by design:</b> core-shell capsules + ultrafiltration, verified by qPCR"
   ],
   [
    "",
    "<b>Two configurations:</b> whole-cell or cell-free enzyme module"
   ],
   [
    "",
    "<b>Modular:</b> scale by adding reactors"
   ]
  ],
  "obj": "Give each group a reason to adopt that rests on its own situation, not on a generic sustainability claim. → The full proposition is set out in our <a href='#s2-uvp'><u>Unique Value Proposition</u></a> section; what follows is how it differs by group.",
  "full": "<p>For group A the proposition is <strong>phosphorus removed at source</strong>. The enzyme panel releases phosphorus from organic and condensed fractions, which chemical precipitation captures poorly, and the encapsulated bacteria then take it up as polyphosphate. The commercial argument rests on the facility’s own integrated environmental authorisation and discharge permit [2,3], not on the urban Directive, which does not bind an industrial operator.</p><p>For A and C together, the proposition is <strong>a closed loop</strong>. Recovered phosphorus goes back into the customer’s own degumming step, reducing what they buy in. Industrial self-consumption also avoids placing a new substance on the market, which removes a regulatory obstacle from the first pilot rather than deferring it.</p><p>For group B we position as <strong>a complement to chemical precipitation rather than a replacement</strong>. Fewer iron and aluminium salts means less chemical sludge to manage, and a complement is a smaller decision for a plant manager than a substitution. Directive (EU) 2024/3019 sets the direction of travel, introducing total-phosphorus limits of 0.5–0.7 mg/L for relevant urban wastewater treatment plants, phased in between 2033 and 2045 [1].</p><p>For group C the proposition is <strong>secondary European phosphorus</strong>. Phosphate rock and phosphorus are EU critical raw materials and largely imported [4]. The revalorisation cascade turns polyphosphate into a higher-value product; where the cascade is not yet stable, polyphosphate itself is sold as an intermediate.</p><p>Two propositions apply across all groups. The first is <strong>containment by design</strong>: core-shell alginate-chitosan capsules, retention in a rotating basket and downstream ultrafiltration, verified by culture and qPCR against a stated limit of detection. The second is that the system comes in <strong>two configurations</strong>, a whole-cell module and a cell-free enzyme module for customers who cannot or will not host modified organisms. Capacity grows by adding reactors of a validated geometry rather than by redesigning them.</p><p class='note'>Removal and recovery figures are design targets until validated (TRL 2–3).</p>",
  "risks": "MKT-02, REG-01, REG-05, TEC-04, TEC-06, TEC-07, BIO-01, BIO-02, ORG-01",
  "oq": "The first target product of the revalorisation cascade, and Bio-Oils’ phosphoric acid consumption, which is what would let us put a number on the value of in-process reuse."
 },
 {
  "k": "cr",
  "n": 4,
  "t": "Customer Relationships",
  "cls": "green",
  "items": [
   [
    "A",
    "Co-development pilots on their stream"
   ],
   [
    "AB",
    "Containment dossier; capsule supply &amp; take-back"
   ],
   [
    "AB",
    "Monitoring dashboard, support, training"
   ],
   [
    "C",
    "Product specs agreed per buyer"
   ]
  ],
  "obj": "Our first customers are development partners. We keep them through supply, service and data rather than a single sale.",
  "full": "<p>With group A the relationship starts as a <strong>co-development pilot</strong>. We design around the customer’s own stream and their own data before anyone has to make a purchase decision, which is also how we learn what the technology has to handle.</p><p>For A and B alike, the <strong>containment dossier</strong> is a standard sales document rather than a response to objections. Containment evidence is offered in the first meeting, and a prospect’s policy on modified organisms is qualified early, because a customer who declines on policy will decline whatever the data show.</p><p><strong>Capsule supply and take-back is the commercial spine of the relationship.</strong> We manufacture capsules in our own notified facility and take spent capsules back for inactivation, so the customer never handles modified waste. It removes an obligation from them and builds switching cost for us at the same time. Around it sit a monitoring dashboard, a named technical contact and training for plant staff.</p><p>With group C the relationship is a set of product specifications agreed buyer by buyer, starting with reuse at the customer’s own site.</p>",
  "risks": "MKT-04, BIO-02, BIO-03, REG-02",
  "oq": "Whether Bio-Oils will sign a letter of intent or collaboration agreement."
 },
 {
  "k": "ch",
  "n": 3,
  "t": "Channels",
  "cls": "green",
  "items": [
   [
    "AB",
    "Founder-led sales, pilot case studies"
   ],
   [
    "B",
    "Tenders, engineering consultancies"
   ],
   [
    "C",
    "In-process reuse, then distributors"
   ],
   [
    "",
    "Events, publications, iGEM"
   ]
  ],
  "obj": "Reach each group through the route its buyers already use, rather than building one channel and hoping it fits everyone.",
  "full": "<p>For A and B the first route is <strong>direct, founder-led technical sales</strong>. At this stage credibility comes from the people who built the system, and a technical conversation is what a plant engineer actually wants. Pilot results and case studies follow: what convinces the second customer is what happened at the first.</p><p>Segment B adds two routes that A does not need. Many plants are publicly owned or run under concession, so access comes through the operator or through procurement, on their timetable rather than ours. Engineering and environmental consultancies design and upgrade plants and can specify our module inside a larger project. Licensing to an operator is the same route read the other way: if an incumbent moves into recovery, licensing turns a competitor into a channel.</p><p>For group C the first route is not a channel at all in the usual sense. The recovered phosphorus stays inside the customer’s own process. External distribution through fertiliser distributors and cooperatives only makes sense once a regulatory route for the product is settled.</p><p>Across all groups, sector events, publications, our website and iGEM itself carry visibility.</p>",
  "risks": "MKT-01, MKT-05, REG-05, ORG-02",
  "oq": "Which consultancies or operators are closest to the team today?"
 },
 {
  "k": "cs",
  "n": 1,
  "t": "Customer Segments",
  "cls": "green",
  "items": [
   [
    "A",
    "<b>Agro-industrial &amp; biofuel.</b> P-rich process effluent (e.g. vegetable-oil degumming). First customer: Bio-Oils Huelva. <em>Pays for treatment</em>"
   ],
   [
    "B",
    "<b>Wastewater operators.</b> Private operators first, then municipal plants as EU P limits phase in. <em>Pays for treatment</em>"
   ],
   [
    "C",
    "<b>Phosphorus users.</b> In-process reuse at A sites first; then industrial &amp; fertiliser markets. <em>Pays for recovered P</em>"
   ]
  ],
  "obj": "Show who pays us and for what. Two groups pay for treatment, one pays for recovered phosphorus.",
  "full": "<p><span class='seg segA'>A</span> <strong>Agro-industrial and biofuel refiners.</strong> Plants with phosphorus-rich process effluent, such as vegetable-oil degumming. They pay for treatment, and Bio-Oils Huelva is our prospective first customer in this group. What makes them reachable now is that the pain is already a line in their budget and the person who decides is one conversation away.</p><p><span class='seg segB'>B</span> <strong>Wastewater operators.</strong> Large private operators first, then municipal plants as the recast Urban Wastewater Treatment Directive phases in stricter phosphorus limits between 2033 and 2045 [1]. They pay for treatment. This group brings the largest volumes but expects evidence we cannot yet produce, which is why it follows rather than leads.</p><p><span class='seg segC'>C</span> <strong>Phosphorus users.</strong> Bio-Oils degumming first, then fertiliser, agriculture and industrial phosphate users. They pay for the recovered phosphorus. Starting with reuse inside the customer’s own process means our first product never has to be placed on the market as a new substance.</p><p>These groups are organised by who pays rather than by entry sequence. Our beachhead matrix scored three candidate treatment customers and selected Bio-Oils; the municipal segment it scored lowest corresponds to the later half of Group B, the large industrial operators it scored second now serve us as validation partners rather than as a distinct segment, and Group C was outside its scope because the matrix compared who pays to have phosphorus removed, not who buys it back. → See <a href='#s1-beachhead'><u>Beachhead Market</u></a>.</p>",
  "risks": "MKT-01, MKT-04, REG-01",
  "oq": "Which product specifications do phosphorus users require beyond Bio-Oils?"
 },
 {
  "k": "co",
  "n": 9,
  "t": "Cost Structure",
  "items": [
   [
    "",
    "<b>Fixed:</b> Personnel &amp; notified facility"
   ],
   [
    "",
    "<b>Fixed:</b> Insurance &amp; liability guarantee"
   ],
   [
    "",
    "<b>Fixed:</b> Software, depreciation"
   ],
   [
    "",
    "<b>Variable:</b> Capsules, enzymes, membranes, energy"
   ],
   [
    "",
    "<b>Variable:</b> Containment analytics"
   ],
   [
    "",
    "<b>Scale-up:</b> Pilots, permits, installation"
   ]
  ],
  "obj": "Show which costs are fixed, which scale with each installation and which are one-off investments. The figures themselves are set out in our <a href='#s3-model'><u>Business Model</u></a> section, built bottom-up from measured parameters rather than from a top-down round number.",
  "full": "<p><strong>Fixed costs</strong> are personnel, facilities including the notified contained-use installation, insurance and the mandatory environmental liability guarantee [7], software and equipment depreciation. Two of these exist only because we work with modified organisms, and both are easy to leave out of an early budget by accident.</p><p><strong>Variable costs</strong> scale with each installation: capsules, enzymes, membranes and energy; containment analytics by culture and qPCR; spent-capsule inactivation and its logistics; then installation, sales and commissions. <strong>Scale-up costs</strong> are the pilot plant itself, the contained-use authorisation, the regulatory route for the product and stream characterisation.</p><p>Three parameters drive the cost of goods: encapsulated uptake relative to free cells, capsule service life, and enzyme cost at kilogram scale. None of them is measured yet, so cost is reported as a range with its sensitivity rather than as a single figure. <strong>A cost number published before those three are measured would be a forecast presented as a finding.</strong></p>",
  "risks": "FIN-01 through FIN-04, TEC-01, TEC-02, TEC-08, OPS-03, REG-03",
  "oq": ""
 },
 {
  "k": "rs",
  "n": 5,
  "t": "Revenue Streams",
  "cls": "green",
  "items": [
   [
    "AB",
    "<b>Pay-per-use:</b> we operate; pay per m³ treated or kg P removed. No capex."
   ],
   [
    "AB",
    "<b>Purchase:</b> reactor sale + capsules &amp; monitoring subscription."
   ],
   [
    "C",
    "<b>Recovered phosphorus:</b> revalorised product or polyP intermediate."
   ],
   [
    "B",
    "<b>Later:</b> licensing to operators &amp; engineering services."
   ]
  ],
  "obj": "A hybrid model serves customers with low and high investment capacity alike, while recurring lines stabilise income. → Pricing structure and unit economics are developed in our <a href='#s3-model'><u>Business Model</u></a> section.",
  "full": "<p>Under the <strong>pay-per-use model</strong>, which suits customers with limited investment capacity, we install and operate the unit ourselves and charge per cubic metre treated or per kilogram of phosphorus removed. The customer makes no capital outlay, which turns a board-level purchase into an operating decision. It also keeps rePhlow as the operator in early deployments, which contains both liability and the contained-use administrative burden.</p><p>The <strong>purchase model</strong> suits customers with higher investment capacity and carries three streams: the standardised reactor, the recurring capsules and consumables, and a monitoring subscription. The reactor opens the account; the capsules and the software keep it. Capsules are deliberately priced as a scheduled consumable, so that if their service life proves short, that becomes a recurring revenue line rather than a defect.</p><p><strong>Recovered phosphorus</strong> is sold to group C, as a revalorised product or as polyphosphate intermediate, starting with reuse in the customer’s own process.</p><p><strong>Licensing</strong> to operators and engineering services are later streams, available once the process is validated at scale.</p>",
  "risks": "TEC-02, TEC-07, MKT-03, FIN-01, REG-03, REG-05",
  "oq": "Target price per cubic metre and per kilogram of phosphorus, set against the customer’s avoided cost."
 }
] as const;

/** Go-to-market stages. */
export const GTM = [
 {
  "n": "01",
  "k": "LAND",
  "s": "Establish our first industrial use case",
  "when": "Phases 1–2 · September 2025 – December 2027",
  "sub": "Laboratory validation, MVP and pilot preparation",
  "body": "<p>Our first priority is to validate rePhlow’s integrated technology before attempting commercial deployment. We begin with laboratory-scale experiments, followed by a 5 L minimum viable product integrating enzymatic hydrolysis, biological phosphorus accumulation, encapsulation and physical containment.</p><p>Bio-Oils Huelva, our industrial collaborator and first prospective customer, provides the reference industrial context for developing a representative treatment process. Rather than proposing immediate installation of a full-scale treatment system, our strategy is to prepare a small bypass pilot that can be evaluated without requiring major modifications to the existing plant.</p>",
  "lt": "Key actions",
  "list": [
   "Validate the integrated MVP using representative industrial effluent.",
   "Characterise phosphorus removal and recovery performance.",
   "Assess capsule durability, reusability and biological containment.",
   "Identify operational requirements for a potential bypass installation.",
   "Define the pilot’s technical, financial and regulatory requirements with relevant stakeholders."
  ],
  "ms": "Validated integrated MVP and a technically defined, potentially fundable industrial pilot."
 },
 {
  "n": "02",
  "k": "PROVE",
  "s": "Turn the pilot into industrial evidence",
  "when": "Phase 3 · January 2028 – June 2029",
  "sub": "Industrial pilot validation — planned",
  "body": "<p>Our second stage focuses on demonstrating that rePhlow can operate reliably under real industrial conditions. Subject to successful laboratory validation, funding, host-site agreement and applicable regulatory approvals, we aim to conduct an industrial pilot at Bio-Oils Huelva.</p><p>Our preliminary roadmap envisages <strong>twelve months of continuous pilot operation</strong> within that window, allowing us to assess treatment stability, maintenance requirements and seasonal changes in effluent characteristics. The pilot must demonstrate more than phosphorus removal. It must establish whether recovery, containment and operating costs are compatible with industrial adoption.</p>",
  "lt": "Key performance indicators",
  "list": [
   "Phosphorus removed and recovered per unit of wastewater treated.",
   "Hydraulic retention time (HRT) and treatment capacity.",
   "Capsule lifetime and replacement frequency.",
   "Enzyme stability and reusability.",
   "Biological containment performance.",
   "Maintenance requirements and operational reliability.",
   "Operating expenditure (OPEX).",
   "Cost per kilogram of phosphorus removed and recovered."
  ],
  "after": "<p>Together, these measurements will form our first industrial evidence package, providing potential customers with operational and economic data rather than relying exclusively on laboratory predictions.</p>",
  "ms": "Reproducible industrial performance, a documented reference installation and sufficient evidence to assess commercial feasibility."
 },
 {
  "n": "03",
  "k": "CONVERT",
  "s": "From industrial validation to paying customers",
  "when": "Phase 4 · From mid 2029",
  "sub": "First commercial contracts",
  "body": "<p>A successful pilot does not automatically translate into a purchase. Industrial biotechnology must also overcome investment barriers, procurement requirements and concerns about adopting an emerging technology. For our first customers, we therefore propose a <strong>Phosphorus-as-a-Service</strong> model, reducing the need for a large upfront equipment purchase.</p><p>Instead of immediately selling the complete bioreactor, rePhlow would provide an integrated treatment service incorporating modular equipment, encapsulated biological components, monitoring and technical support. Our initial pricing model could combine:</p><div class='eq'>Annual service fee <span class='res'>+</span> Performance-based treatment fee</div><p>The variable component could be linked to cubic metres of wastewater treated or kilograms of phosphorus removed, depending on the industrial customer’s requirements and the reliability of the measured performance indicators. This model would allow rePhlow to retain operational control over its technology while developing long-term customer relationships and recurring revenue.</p><p>As the technology matures, alternative arrangements could include equipment leasing or direct hardware sales combined with capsule replenishment, monitoring and maintenance agreements.</p>",
  "ms": "First paying industrial customer, a commercially validated pricing model and recurring treatment revenue."
 },
 {
  "n": "04",
  "k": "REPLICATE",
  "s": "Scale through industrial clusters",
  "when": "Phase 4 · Following the first commercial reference",
  "sub": "Iberia → Southern Europe",
  "body": "<p>Our expansion strategy follows one central principle:</p><p class='quote'>Second customer before second sector.</p><p>Rather than immediately entering unrelated wastewater markets, we aim to replicate the validated treatment system in facilities with comparable processes, phosphorus-containing effluents and operational requirements. Our initial geographical focus will be the Iberian Peninsula, followed by selected industrial clusters in Southern Europe.</p><p>This approach allows us to reuse validated reactor designs, operating parameters, treatment protocols and economic assumptions, reducing the uncertainty associated with each subsequent installation. The modular architecture also enables capacity expansion by adding treatment units rather than redesigning the entire system.</p><p>Our preliminary seven-year commercial scenario envisages deployment across <strong>12–16 industrial facilities</strong>, representing approximately <strong>20 bioreactor modules</strong>, subject to successful validation and customer adoption. Each installation should generate additional operating data, strengthen our technical specifications and make the next deployment easier to evaluate.</p>",
  "ms": "A repeatable industrial deployment model supported by multiple reference installations and recurring commercial revenue."
 },
 {
  "n": "05",
  "k": "VALORISE",
  "s": "Unlock a second revenue stream",
  "when": "Beyond Phase 4 · Long-term commercial development",
  "sub": "Downstream phosphorus valorisation",
  "body": "<p>Our initial business model must be economically plausible through phosphorus-treatment and recovery services alone. However, rePhlow’s longer-term opportunity extends beyond removing phosphorus from industrial effluents.</p><p>By recovering phosphorus as polyphosphate, we aim to supply a phosphoryl donor for ATP-dependent biocatalytic processes and the synthesis of higher-value compounds. Our initial proof-of-concept pathway uses BcPPK2-III for ATP regeneration, coupled with DHAK for DHAP production.</p><p>Commercial development would begin with research-scale and pilot-scale applications, potentially through collaborative development agreements with biocatalysis and specialty chemical companies. As recovery yields, product purity and downstream demand are validated, future models could include polyphosphate supply agreements, technology licensing or revenue-sharing partnerships.</p>",
  "ms": "First qualified downstream application and a validated additional revenue stream based on recovered phosphorus."
 }
] as const;

/** Go-to-market stage colours. */
export const GC5 = [
 "#9cc9b8",
 "#2E7D86",
 "#7c9a4e",
 "#c9962b",
 "#e2542d"
] as const;

/** Risk register excerpt: [id, risk, L, I, L×I before, L×I after, mitigation]. */
export const RK = [
 [
  "TEC-02",
  "Capsule service life shorter than the replacement schedule assumes",
  4,
  5,
  20,
  12,
  "Measure cycles to a defined activity threshold in real effluent; price capsules as a consumable"
 ],
 [
  "REG-02",
  "Customer site becomes a contained use installation",
  4,
  5,
  20,
  12,
  "Confirm classification with the competent authority; keep a cell-free configuration as fallback"
 ],
 [
  "FIN-02",
  "Cash shortfall between funding cycles",
  4,
  5,
  20,
  12,
  "Monthly cash projection; phase spending so each stage is funded before it begins"
 ],
 [
  "TEC-01",
  "Encapsulated uptake below free-cell uptake",
  4,
  4,
  16,
  9,
  "Paired assay before any cost figure is published; carry the ratio as a range"
 ],
 [
  "TEC-03",
  "Effluent destabilises the alginate network",
  4,
  4,
  16,
  9,
  "Characterise the real effluent envelope; maintain a calcium set point"
 ],
 [
  "REG-01",
  "Cited regulation does not bind the first customer",
  4,
  4,
  16,
  6,
  "Anchor on the facility permit; obtain specialist legal verification"
 ],
 [
  "MKT-01",
  "Dependence on a single industrial partner",
  4,
  4,
  16,
  9,
  "Second effluent type and second operator developed in parallel"
 ],
 [
  "MKT-02",
  "Chemical precipitation is cheaper on compliance alone",
  4,
  4,
  16,
  9,
  "Build value on avoided sludge cost and recovered product, quantified from customer figures"
 ],
 [
  "FIN-01",
  "Cost of goods above the assumed figure",
  4,
  4,
  16,
  9,
  "Model as a range driven by uptake, capsule life and enzyme supply"
 ],
 [
  "TEC-05",
  "Enzyme leaching across operating cycles",
  4,
  3,
  12,
  6,
  "Leaching ceiling set as a design requirement rather than an outcome"
 ],
 [
  "REG-04",
  "Novelty and freedom to operate not yet assessed",
  3,
  4,
  12,
  6,
  "Novelty and freedom-to-operate assessment with UCM OTRI before any decision to file"
 ],
 [
  "BIO-01",
  "Engineered cells detected in treated effluent",
  2,
  5,
  10,
  5,
  "Double barrier plus ultrafiltration; culture and qPCR monitoring against a stated detection limit"
 ]
] as const;

/** Residual likelihood × impact after treatment (Risk Assessment Plan). */
export const RES = {
 "TEC-02": [
  3,
  4
 ],
 "REG-02": [
  3,
  4
 ],
 "FIN-02": [
  3,
  4
 ],
 "TEC-01": [
  3,
  3
 ],
 "TEC-03": [
  3,
  3
 ],
 "REG-01": [
  2,
  3
 ],
 "MKT-01": [
  3,
  3
 ],
 "MKT-02": [
  3,
  3
 ],
 "FIN-01": [
  3,
  3
 ],
 "TEC-05": [
  2,
  3
 ],
 "REG-04": [
  2,
  3
 ],
 "BIO-01": [
  1,
  5
 ]
} as const;

/** Gantt workstreams: [label, colour]. */
export const WS = {
 "bio": [
  "Biology",
  "#3a7dc2"
 ],
 "mat": [
  "Materials and enzymes",
  "#7b5cc4"
 ],
 "hw": [
  "Hardware",
  "#2a8f8a"
 ],
 "reg": [
  "Regulatory and company",
  "#c4516a"
 ],
 "cus": [
  "Customer and commercial",
  "#3f9a5a"
 ],
 "fun": [
  "Funding",
  "#e08e2a"
 ]
} as const;

/** Gantt work packages: [workstream, id, label, start quarter, end quarter, gate?, linked risk]. */
export const GX = [
 [
  "bio",
  "B1",
  "Plasmid testing of both heterologous inserts",
  0,
  3
 ],
 [
  "bio",
  "B2",
  "Paired uptake assay, encapsulated against free cells",
  2,
  5,
  1,
  "TEC-01"
 ],
 [
  "bio",
  "B3",
  "Chromosomal integration, markerless strain",
  6,
  9
 ],
 [
  "bio",
  "B4",
  "Containment metric defined and validated",
  7,
  11
 ],
 [
  "bio",
  "B5",
  "Strain robustness on a second effluent type",
  12,
  15
 ],
 [
  "mat",
  "M1",
  "Capsule production standardised and characterised",
  0,
  4
 ],
 [
  "mat",
  "M2",
  "Capsule ageing series in real Bio-Oils effluent",
  3,
  5,
  1,
  "TEC-02"
 ],
 [
  "mat",
  "M3",
  "Immobilisation chemistry on a model support",
  1,
  4
 ],
 [
  "mat",
  "M4",
  "Enzyme panel immobilised, leaching quantified",
  3,
  6,
  1,
  "TEC-05"
 ],
 [
  "mat",
  "M5",
  "Revalorisation cascade established and scaled",
  2,
  13
 ],
 [
  "hw",
  "H1",
  "Bench rotating-basket reactor and separator",
  1,
  4
 ],
 [
  "hw",
  "H2",
  "Five-litre semi-continuous prototype",
  6,
  8
 ],
 [
  "hw",
  "H3",
  "Two-scale validation on real effluent",
  8,
  9
 ],
 [
  "hw",
  "H4",
  "Pilot unit manufactured and commissioned",
  9,
  10
 ],
 [
  "hw",
  "H5",
  "Standardised unit for contract manufacture",
  15,
  17
 ],
 [
  "reg",
  "R1",
  "Company incorporated",
  6,
  6
 ],
 [
  "reg",
  "R2",
  "Contained use classification and notification",
  5,
  9
 ],
 [
  "reg",
  "R3",
  "IP position settled with OTRI, freedom-to-operate search",
  6,
  8
 ],
 [
  "reg",
  "R4",
  "Environmental liability guarantee quoted and contracted",
  8,
  10
 ],
 [
  "cus",
  "C1",
  "Bio-Oils stream characterised and fractionated",
  1,
  4,
  1,
  ""
 ],
 [
  "cus",
  "C2",
  "Pilot agreement negotiated and signed",
  6,
  9
 ],
 [
  "cus",
  "C3",
  "Twelve months of continuous pilot operation",
  10,
  15
 ],
 [
  "cus",
  "C4",
  "Service contracts and second sector entry",
  16,
  17
 ],
 [
  "fun",
  "F1",
  "iGEM fundraising: prizes, sponsorship, university lines",
  0,
  5
 ],
 [
  "fun",
  "F2",
  "Founder capital and national deep-tech application",
  6,
  8
 ],
 [
  "fun",
  "F3",
  "European close-to-market application",
  7,
  9
 ],
 [
  "fun",
  "F4",
  "Cost of goods and pilot budget rebuilt bottom up",
  8,
  9,
  1,
  "FIN-01"
 ]
] as const;

/** Gantt quarter labels (Q3 2025 … Q4 2029). */
export const Q = [
 "Q3",
 "Q4",
 "Q1",
 "Q2",
 "Q3",
 "Q4",
 "Q1",
 "Q2",
 "Q3",
 "Q4",
 "Q1",
 "Q2",
 "Q3",
 "Q4",
 "Q1",
 "Q2",
 "Q3",
 "Q4"
] as const;

/** Year label under the first quarter of each year. */
export const YR = [
 "2025",
 "",
 "2026",
 "",
 "",
 "",
 "2027",
 "",
 "",
 "",
 "2028",
 "",
 "",
 "",
 "2029",
 "",
 "",
 ""
] as const;

/** Gantt phases: [label, first quarter, last quarter, colour]. */
export const PHX = [
 [
  "P1 · Experimental validation",
  0,
  5,
  "#1f3a5a"
 ],
 [
  "P2 · MVP & company",
  6,
  9,
  "#2e5f80"
 ],
 [
  "P3 · Industrial pilot",
  10,
  15,
  "#3f7f7a"
 ],
 [
  "P4 · Scale-up",
  16,
  17,
  "#5e9a52"
 ]
] as const;

/** Phase cards. */
export const PH = {
 "1": {
  "t": "P1 · TRL 2 → 3 · Experimental validation",
  "w": "Sept 2025 – Nov 2026",
  "a": "Prove each component works separately in the laboratory and produce the four measurements the financial model depends on.",
  "g": "Encapsulated to free uptake ratio measured; capsule service life in real effluent as cycles to a defined threshold; phosphorus speciation of the real stream fractionated; enzyme leaching quantified.",
  "f": "About €4,000 in consumables and about €22,000 for the Grand Jamboree, against a target of up to €30,000 in external support. Competition prizes, university and national programmes, corporate sponsorship.",
  "s": "University teaching and research laboratories at containment level 1, plus preincubation space through the university entrepreneurship programme [25].",
  "p": "Eleven students across six disciplines in technical subgroups, with Human Practices, entrepreneurship, finance and communication roles, and academic advisors at UCM and CSIC."
 },
 "2": {
  "t": "P2 · TRL 3 → 4 · Prototype, MVP and company",
  "w": "Nov 2026 – Dec 2027",
  "a": "Integrate the components into one unit with a frozen specification, and build the legal and financial vehicle able to sign a pilot agreement.",
  "g": "MVP specification frozen and validated on real effluent; company incorporated and installation notified; cost of goods and pilot budget rebuilt bottom up; pilot agreement and pilot funding both committed.",
  "f": "€20,000 founder capital, which also meets the minimum share capital of the national deep-tech line. National grant up to €250,000 at 70 per cent of an eligible budget above €175,000, spring window [26]. European close-to-market demonstration at up to 60 per cent, September deadline [27]. Participative loan of €25,000 to €75,000 without personal guarantees [28].",
  "s": "University laboratory retained for strain and capsule work, incubation space for the company.",
  "p": "First paid hire in administration, legal and regulatory affairs covering biosafety and industrial property. Continued academic advisory support."
 },
 "3": {
  "t": "P3 · TRL 5 → 6 · Industrial pilot",
  "w": "Jan 2028 – Jun 2029",
  "a": "Operate at a host plant for a full operating year and convert performance claims into measured operating data.",
  "g": "Twelve months of continuous data; cost per treated cubic metre inside the published range; no effluent detection above the stated limit; one customer willing to pay the quoted price.",
  "f": "Pilot budget rebuilt from quotations, previously stated as €150,000, plus the premium for the mandatory environmental liability guarantee for activities with modified organisms [7], plus whichever grant line was awarded.",
  "s": "Footprint inside the host plant, with no civil works, since retrofit compatibility is a design requirement rather than a preference.",
  "p": "Industrial process engineering brought in-house, plus a site operations role. This is the capability a university laboratory cannot supply."
 },
 "4": {
  "t": "P4 · TRL 7 → 8 · Commercial scale-up",
  "w": "From mid 2029",
  "a": "Move from one demonstrated installation to a repeatable product with standardised units, service contracts and a second sector.",
  "g": "Repeat orders and positive unit economics without grant support.",
  "f": "Revenue and working capital. The objective of the phase is unit economics that stand without grant support.",
  "s": "Contract manufacturing rather than premises of our own.",
  "p": "Commercial and economic profile responsible for the business model, the monitoring platform and logistics."
 }
} as const;

/** Colour per recruit (Silvia, Daniela, Marina). */
export const RCC = [
 "#3f7cac",
 "#2E7D86",
 "#7c9a4e"
] as const;

/** Recruit panels: [title, text]. */
export const RC = [
 [
  "Silvia — Graphic Design and Visual Communication",
  "Silvia joined to develop rePhlow’s visual identity, branding and animation. Her contribution addressed an important communication gap, enabling us to present a technically complex biotechnology project through coherent and accessible visual materials."
 ],
 [
  "Daniela — Computational Modelling and Wiki Development",
  "With a background in Physics and an interest in combining biological systems with programming, Daniela strengthened our computational modelling capabilities while contributing technical support to the wiki."
 ],
 [
  "Marina — Industrial Biotechnology and Encapsulation",
  "Currently pursuing a Master’s degree in Industrial Biotechnology, Marina joined to reinforce our hardware development and bacterial encapsulation work, particularly the alginate-based structures central to our proposed bioreactor."
 ]
] as const;

/** Skill gap analysis: [competency, status, gap, strategy]. */
export const SK = [
 [
  "Molecular biology and genetic engineering",
  "cov",
  "Further experimental optimisation and validation",
  "Maintain internal expertise, supported by specialised scientific advisers"
 ],
 [
  "Protein engineering and enzymatic immobilisation",
  "dev",
  "Integrated enzyme performance, stability and reuse",
  "Continue laboratory development with support from UCM, UAM and CSIC specialists"
 ],
 [
  "Encapsulation and biomaterials",
  "dev",
  "Capsule durability, mass transfer and reliable core–shell performance",
  "Internal development strengthened by Marina and specialist guidance"
 ],
 [
  "Bioprocess and bioreactor engineering",
  "dev",
  "Industrial-scale hydraulic design, automation and integration",
  "Internal prototyping followed by collaboration with industrial engineers"
 ],
 [
  "Computational modelling and software",
  "dev",
  "Model refinement, process simulation and future monitoring requirements",
  "Strengthen internal capabilities through Daniela and targeted training"
 ],
 [
  "Visual communication and branding",
  "cov",
  "Continuous adaptation of materials for different audiences",
  "Internal development led by Silvia"
 ],
 [
  "Biosafety and regulatory affairs",
  "ext",
  "Industrial contained-use requirements and authorisation procedures",
  "External consultancy now, followed by an internal legal and regulatory profile as our first paid hire → see <a href='#s3-gantt'><u>Gantt Chart, Phase 2</u></a>"
 ],
 [
  "Business development and financial management",
  "dev",
  "Detailed financial modelling, commercial operations and investment readiness",
  "Entrepreneurship training, mentoring and future recruitment of an economic or financial profile"
 ],
 [
  "Entrepreneurship and pitching",
  "cov",
  "Continued investor and customer validation",
  "Apply training from Fábrica UCM [1], APTenisa [2] and iGEM entrepreneurship initiatives [3]"
 ]
] as const;

/** Skill status labels: [label, badge class]. */
export const RL = {
 "cov": [
  "Covered",
  "b-cov"
 ],
 "dev": [
  "Developing",
  "b-dev"
 ],
 "ext": [
  "External support required",
  "b-ext"
 ]
} as const;

/** Advisory network: [name, affiliation, area, text, x, y, colour, short label]. */
export const AD = [
 [
  "Juan Manuel Bolívar",
  "UCM",
  "Enzyme immobilisation",
  "Juan Manuel Bolívar (UCM) provided advice on enzyme immobilisation.",
  110,
  60,
  "#30506a",
  "Juan Manuel Bolívar"
 ],
 [
  "Aurelio Hidalgo Huertas",
  "UAM / CBM-CSIC",
  "Protein engineering",
  "Aurelio Hidalgo Huertas (UAM/CBM-CSIC) contributed expertise relevant to protein engineering.",
  110,
  170,
  "#30506a",
  "Aurelio Hidalgo Huertas"
 ],
 [
  "BEE Group · Dr Israel Sánchez Moreno",
  "IQOG-CSIC",
  "Biocatalysis & enzyme engineering",
  "We also received support from the Biocatalysis and Enzyme Evolution (BEE) Group, led by Dr Israel Sánchez Moreno at IQOG-CSIC, whose expertise in biocatalysis and enzyme engineering was particularly relevant to our downstream phosphorus valorisation strategy.",
  110,
  280,
  "#30506a",
  "BEE Group (IQOG-CSIC)"
 ],
 [
  "M.ª Carmen García Payo",
  "",
  "Core–shell alginate encapsulation",
  "For encapsulation, M.ª Carmen García Payo provided guidance on the core–shell alginate architecture, helping us refine the physical system designed to retain the engineered microorganisms.",
  300,
  290,
  "#30506a",
  "M.ª Carmen García Payo"
 ],
 [
  "Fábrica UCM",
  "Compluemprende",
  "Business development training",
  "Participation in Fábrica UCM, an entrepreneurship programme supported by Universidad Complutense de Madrid through Compluemprende, provided training in business development, project communication and entrepreneurial planning [1].",
  490,
  60,
  "#c9962b",
  "Fábrica UCM"
 ],
 [
  "APTenisa",
  "APTE · ENISA · La Salle Technova",
  "Customer discovery & business model",
  "We also participated in APTenisa, promoted by the Association of Science and Technology Parks of Spain (APTE) and co-financed by ENISA. Through its Lean LaunchPad-based methodology, developed with the involvement of La Salle Technova Barcelona, the programme supported our work on customer discovery, value proposition validation and business-model development [2].",
  490,
  170,
  "#c9962b",
  "APTenisa"
 ],
 [
  "iGEM Entrepreneurship Bootcamp",
  "iGEM",
  "Pitching & entrepreneurial communication",
  "Alongside these experiences, the iGEM Entrepreneurship Bootcamp strengthened our pitching and entrepreneurial communication skills [3].",
  490,
  280,
  "#c9962b",
  "iGEM Bootcamp"
 ]
] as const;

/** Awards by year. */
export const AW = [
 [
  "2025",
  [
   {
    "lg": "ucm",
    "t": "UCM Pre-Incubator Entrepreneurship Initiative Awards (2025)",
    "x": "Winner of the 2nd Edition of the UCM Awards for Entrepreneurial Initiatives in Pre-incubators (2025), through the Faculty of Physical Sciences Pre-incubator (UCM), organised by Compluemprende.",
    "ph": [
     7,
     "UCM Pre-Incubator Entrepreneurship Initiative Awards 2025"
    ]
   },
   {
    "lg": "cajaingenieros",
    "t": "Finalist — Fundación Caja de Ingenieros Ideas Awards (2025)",
    "x": "Finalists in the Fundación Caja de Ingenieros Award “Isabel P. Trabal” 2025, in the Social Development category. The mentorship and national final are described under Training programmes.",
    "ph": [
     9,
     "Caja de Ingenieros final at the Barcelona Stock Exchange"
    ]
   },
   {
    "lg": "ucm",
    "t": "1st Prize — Best Entrepreneurship Project, Compluemprende 2025",
    "x": "Best Entrepreneurship Project in the XIII Edition of the University Entrepreneurship Awards 2025 of the Complutense University of Madrid, promoted by Compluemprende, accompanied by four special distinctions:",
    "m": [
     {
      "lg": "fpcm",
      "t": "Madrid Science Park Foundation (FPCM) Award",
      "x": "Recognition for the project's scientific impact: “Project with the Best Scientific Impact”.",
      "ph": [
       10,
       "Madrid Science Park Foundation award"
      ]
     },
     {
      "lg": "spainstartup",
      "t": "Spain Startup Special Mention",
      "x": "Recognition of rePhlow's internationalisation potential: “Best Project with Internationalization Potential”.",
      "ph": [
       11,
       "Spain Startup special mention"
      ]
     },
     {
      "lg": "netmentora",
      "t": "Netmentora Madrid Special Mention",
      "x": "Recognition of its potential to generate employment: “Project with High Job Creation Potential”.",
      "ph": [
       12,
       "Netmentora Madrid special mention"
      ]
     },
     {
      "lg": "sacyr",
      "t": "Sacyr Special Mention",
      "x": "Recognition of its growth and scalability potential: “Best Project with Growth Potential”.",
      "ph": [
       13,
       "Sacyr special mention"
      ]
     }
    ]
   }
  ]
 ],
 [
  "2026",
  [
   {
    "lg": "promega",
    "t": "Promega Ibérica iGEM Grant Sponsorship",
    "x": "Winner of the Promega Biotech Ibérica Sponsorship Grant 2026: support for the scientific development of rePhlow and its participation in the iGEM Competition.",
    "ph": [
     14,
     "Promega Ibérica sponsorship"
    ]
   },
   {
    "lg": "santanderx",
    "t": "1st Prize — Santander X UCM 2026",
    "x": "Winner of the Santander X Spain 2026 Awards for University Entrepreneurial Projects and Startups, organised by Santander X and Compluemprende. Recognition of rePhlow’s entrepreneurial potential and innovative approach."
   },
   {
    "lg": "bisce",
    "t": "2nd Prize — National Stage of BISC-E 2026",
    "x": "Recognition of the project’s contribution to innovation and entrepreneurship in the bioeconomy."
   }
  ]
 ]
] as const;

/** Training programmes; sessions are [date, label, track, who, driving question, input, response, why-label, why, learned, changed, next, isEvent, photos]. */
export const PR = {
 "fab": {
  "lg": "ucm",
  "name": "Fábrica UCM — Compluemprende (2025 and 2026)",
  "intro": "Entrepreneurship programme run by Universidad Complutense de Madrid through Compluemprende, focused on business model development, market validation, pitching and transforming scientific ideas into viable ventures [1].",
  "more": "Through our participation in this programme organised by the Complutense University of Madrid through Compluemprende, we developed a broader understanding of entrepreneurship and innovation within scientific environments. The training introduced us to key concepts in business development, project communication and value creation, encouraging us to consider how rePhlow could evolve beyond the laboratory and generate tangible environmental and societal impact.",
  "tag": "We entered describing rePhlow as an engineered bacterium. Eleven weeks later a jury of outside experts told us we had answered every business-model question without difficulty.",
  "extra": "<details class=\"more\"><summary>2025 programme</summary><div class=\"more-body\"><ol class=\"steps\"><li>Creativity and Idea Generation (Ana Castillo)</li><li>Lean Startup Methodology and Value Proposition (Jaime Fernández Truchado)</li><li>Business Model Canvas (Luis Nouel Trenard)</li><li>Idea Validation: Minimum Viable Product (MVP) (María Luke)</li><li>Early-Stage Funding and Basic Legal Aspects (Clara Isabel Vega)</li><li>Communicating Your Project: The Pitch (Juan Carlos Requena)</li><li>Demo Day</li></ol></div></details>",
  "s": [
   [
    "24 Sep 2025",
    "Ana Castillo",
    "Entrepreneurship &amp; Acceleration",
    "Ana Castillo — Design Thinking &amp; Creative Business Ideas",
    "How do we turn synthetic-biology lab results into a problem worth solving for someone outside the lab?",
    "Ana Castillo taught Design Thinking as a tool for creative, user-focused ideation.",
    "rePhlow began framing its technology around the people who would use it, not just the science.",
    "Why we took part in this session",
    "Fábrica UCM’s opening session came at a stage when rePhlow existed mainly as a synthetic-biology concept (engineered <em>Pseudomonas putida</em> for phosphorus recovery) without a business framing around it. As a team of biochemistry and lab-trained students with no formal innovation background, we needed a structured way to move from “we have interesting science” to “we have a problem worth solving for someone.”",
    "Ana Castillo, an architect with over 20 years leading complex projects and CEO of We_Think, led the session on applying Design Thinking practically to generate and validate business ideas. The session worked through the classic empathize-define-ideate-prototype-test cycle, with an emphasis on leading projects from a creative rather than purely technical vision. The core message was that innovation starts with understanding the person experiencing the problem, not with the solution itself.",
    "We started mapping who actually experiences the “phosphorus problem” (wastewater treatment plant operators, industrial dischargers facing tightening phosphorus limits) as concrete personas rather than an abstract “the water treatment sector.” This shifted our early internal language from describing rePhlow as “an engineered bacterium that recovers phosphorus” to describing it as a response to a specific operational and regulatory pain point. It also pushed us to sketch our first rough value proposition statements well before we had any formal business-model tools.",
    "This early, problem-first framing carried directly into the following session two weeks later, where we formalized these ideas into a testable value proposition using the Lean Startup methodology.",
    0,
    null
   ],
   [
    "8 Oct 2025",
    "Jaime Fernández Truchado",
    "Entrepreneurship &amp; Acceleration",
    "Jaime Fernández Truchado — Lean Startup, Value Proposition &amp; Impact Measurement / Antauen",
    "How do we test our value proposition instead of just assuming it’s correct?",
    "Jaime Fernández Truchado taught the Lean Startup framework as a way to test, not assume, a value proposition.",
    "rePhlow started treating its value proposition as a hypothesis to test, not a fixed pitch.",
    "Why we took part in this session",
    "Two weeks after our first ideation session, we still lacked a disciplined way to check whether our assumptions about the water-treatment sector actually held up. Jaime Fernández Truchado, professor of Political Economy at UCM and founder of ANTAUEN, a social-innovation consultancy focused on impact measurement, was brought in to give the team a validation framework grounded in evidence rather than intuition.",
    "The session covered Lean Startup as a system of business validation based on experimentation: rather than building a finished solution, teams put their value proposition to the test and pivot or iterate depending on what the build-measure-learn cycle reveals. Given the trainer’s background in impact measurement, the session also touched on how to define and track meaningful outcome metrics from the earliest stage of a project, not just financial ones.",
    "We reworked our early value proposition statements into testable hypotheses, for example, around how much a treatment plant would value a drop-in phosphorus-recovery module versus a full process redesign, instead of presenting our platform as a finished answer. We also began thinking about impact metrics (linked to the SDGs our project addresses) as something to define and measure from the start, rather than add retroactively for the wiki.",
    "This experimentation mindset fed directly into building our first structured Business Model Canvas two weeks later.",
    0,
    null
   ],
   [
    "22 Oct 2025",
    "Luis Nouel Trenard",
    "Entrepreneurship &amp; Acceleration",
    "Luis Nouel Trenard — Business Model Canvas in Practice / Limbo Europe",
    "How does our technology actually turn into a business, end to end?",
    "Luis Nouel Trenard walked the team through the Business Model Canvas as a tool for shaping an idea into a viable project.",
    "rePhlow built its first full Business Model Canvas, putting the whole platform on a single page for the first time.",
    "Why we took part in this session",
    "By late October we had a tested value proposition but no single view of how rePhlow would work as a business: who our partners would be, what it would cost to run, how it would generate revenue. Luis Nouel Trenard, Director General of Limbo Europe (a Grupo ASV innovation startup selling in 22 countries) and a Fábrica UCM instructor since 2006, was brought in precisely to close that gap with a hands-on canvas exercise.",
    "The session taught the Business Model Canvas as a simple, visual way to turn an idea into a project with real potential: the same tool used by many of the most innovative companies. Rather than treating it as a theoretical framework, the group worked through each of the nine blocks in practice, using live examples from the instructor’s own experience scaling a startup internationally.",
    "We produced our first working Business Model Canvas, mapping customer segments (municipal and industrial wastewater operators), key partners (research groups, potential engineering/licensing partners), key resources (the engineered strain, the encapsulation process), and a first attempt at cost structure and revenue streams. This was the point where rePhlow stopped being described only as a lab technology and started being described as a platform with a defined path to market: the version of the canvas we kept iterating on for the rest of the program. → See <a href='#s3-canvas'><u>Business Canvas</u></a>.",
    "With a first canvas in hand, the next milestone was defining what a Minimum Viable Product would actually look like for rePhlow, covered in the following session with María Luke.",
    0,
    null
   ],
   [
    "5 Nov 2025",
    "María Luke",
    "Entrepreneurship &amp; Acceleration",
    "María Luke — Minimum Viable Product in Early-Stage Startups / Uelz",
    "What is the smallest version of rePhlow we could actually put in front of a real customer?",
    "María Luke explained the Minimum Viable Product as the smallest version of a product that can still be tested in the real market.",
    "rePhlow separated its long-term industrial vision from a scoped pilot it could realistically validate now.",
    "Why we took part in this session",
    "With a full canvas but a technology still maturing in the lab, the team risked conflating “final industrial product” with “what we can validate now.” María Luke, Co-Founder and CEO of Uelz, a South Summit 2023 winner, named to Forbes’ 100 most creative people in 2024, and recognized as best early-stage entrepreneur at the Woman StartUp Awards, was brought in to sharpen that distinction from direct founder experience.",
    "The session defined the Minimum Viable Product as the initial version of a product or service, built with only its core features, used specifically to evaluate viability in the real market, not a smaller or lower-quality version of the final product. The emphasis was on identifying the single riskiest assumption to test first, and designing the leanest possible experiment around it.",
    "We reframed our near-term goal away from a full industrial-scale deployment and toward a bench/pilot-scale demonstration module (engineered <em>P. putida</em> in core-shell encapsulation, run against real or representative wastewater), built specifically to validate phosphorus-recovery performance for a beachhead customer rather than to prove the whole platform at once. This also clarified which technical results we needed to prioritize in the lab to support that MVP, and which could wait. → See <a href='#s2-mvp'><u>Minimum Viable Product</u></a>.",
    "Defining a scoped MVP made the financing conversation concrete: two weeks later, we met with Clara Isabel Vega to map how a pilot like this could actually be funded.",
    0,
    null
   ],
   [
    "19 Nov 2025",
    "Clara Isabel Vega",
    "Entrepreneurship &amp; Acceleration",
    "Clara Isabel Vega — Public/Private Financing Sources &amp; Financial Management / MentorBI",
    "How does a student-founded deep-tech project actually get funded before it has revenue?",
    "Clara Isabel Vega mapped the public and private financing routes available to an early-stage project.",
    "rePhlow built its first realistic funding roadmap and identified the legal basics it needed before approaching investors.",
    "Why we took part in this session",
    "With an MVP scope defined, the open question became how to pay for it. As students with no prior fundraising experience, we needed a clear picture of which financing sources were even realistic for a pre-revenue biotech project, and what “presenting to investors” actually required. Clara Isabel Vega, economist, author of two finance books, founder of MentorBI and a Microsoft MVP 2025, led this session.",
    "The session covered how to access public and private financing sources to launch a project and how to present an idea to investors, alongside the basic legal aspects needed to start a venture safely and without surprises later on. It distinguished between financing instruments suited to a pre-company academic project (grants, competitions, accelerators) versus those that only become relevant once a legal entity exists (equity investment, loans).",
    "We built a first funding roadmap for rePhlow distinguishing near-term, no-equity options (grants, university seed funds, competition prize money) from longer-term routes that would require incorporating a company. We also started flagging basic legal groundwork to sort out ahead of any future spin-off (ownership of IP generated during the iGEM project, for instance) rather than leaving it as an afterthought.",
    "Financing and legal groundwork in place, the same day brought our first real external test of the pitch itself, at the Caja de Ingenieros Demo Day in Barcelona (see Fundación Caja de Ingenieros).",
    0,
    null
   ],
   [
    "3 Dec 2025",
    "Juan Carlos Requena",
    "Entrepreneurship &amp; Acceleration",
    "Juan Carlos Requena — High-Impact Pitching &amp; Storytelling / Aquora Change Makers",
    "How do we make our project’s story, not just its data, the reason someone remembers us after the pitch?",
    "Juan Carlos Requena taught the team to build a pitch around a story, not just information.",
    "rePhlow rebuilt its pitch narrative around a clear story arc ahead of the Fábrica UCM Demo Day.",
    "Why we took part in this session",
    "With the Fábrica UCM Demo Day one week away, we needed to move from a pitch that explained rePhlow correctly to one that made a jury actually want to back it. Juan Carlos Requena, consultant, lecturer, coauthor of <em>MBA: Más que Buenas Actitudes</em>, and CEO of Aquora Change Makers, led this session on high-impact pitching.",
    "The session was explicit that this wasn’t about “speaking nicely”: it was about learning to land an impact from the very first sentence, hook the audience with a story, and make whoever is listening (investor, partner, or customer) feel they need to be part of the project. The focus was on structure and emotional arc as much as on content: what to say first, what to build toward, and what to leave the audience holding onto at the end.",
    "We restructured our pitch around a narrative arc (problem, stakes, our specific solution, proof, ask) instead of a linear description of the science, reusing the trimmed technical content and Q&amp;A annex approach we had already adopted after the Caja de Ingenieros mentorship. We also worked on delivery: pacing, where to pause, and which single line we wanted the jury to remember afterward.",
    "This refined pitch was tested one week later, live, in front of an expert jury at the Fábrica UCM Demo Day.",
    0,
    null
   ],
   [
    "10 Dec 2025",
    "Demo Day",
    "Entrepreneurship &amp; Acceleration",
    "Event: Final Pitch &amp; Expert Jury Feedback",
    "Can we now handle a jury’s business-model questions on the spot, the way we couldn’t back in September?",
    "The jury said we handled every business-model question well and praised the pitch, and suggested adding a go-to-market strategy or a Gantt chart of next steps.",
    "rePhlow closed the Fábrica UCM program with confirmation that the eleven weeks of training had actually closed the gaps flagged at the APTenisa selection back in September.",
    "Why this mattered",
    "The Demo Day closed the Fábrica UCM cohort: after eleven weeks moving from ideation to canvas to MVP to financing to pitch, this was the first time rePhlow was presented start to finish to a jury of outside experts rather than to fellow cohort teams or mentors already familiar with the project.",
    "The feedback was excellent: we were able to answer every business-model question without difficulty, thanks to the training we had been receiving, and we held the audience’s attention with a stronger opening hook and by cutting the parts of a 3-minute pitch that were not essential. The one concrete suggestion was to add a go-to-market strategy or a Gantt chart of next steps at the end of the presentation, so the jury could see exactly where the project stood and how it would move forward.",
    "This confirmed that the gaps flagged at our very first APTenisa selection pitch back in September, an unclear technical explanation and shaky answers on the business model, had genuinely closed. We also started planning how to add a simple roadmap or timeline slide to future pitches, to make our next steps visible at a glance rather than leaving the jury to ask. → Both the <a href='#s3-gtm'><u>go-to-market strategy</u></a> and the <a href='#s3-gantt'><u>Gantt chart</u></a> the jury asked for are now part of this wiki.",
    "With Fábrica UCM closed out on a high note, our attention turned fully to APTenisa, where the same week brought a general mentorship on funding and next steps with Arnau Pla and Jordi Martí Gascón (see APTenisa Launch).",
    1,
    [
     [
      16,
      "Fábrica UCM Demo Day"
     ],
     [
      17,
      "Fábrica UCM Demo Day"
     ],
     [
      18,
      "Fábrica UCM Demo Day"
     ],
     [
      19,
      "Fábrica UCM Demo Day"
     ]
    ]
   ]
  ]
 },
 "apt": {
  "lg": "aptenisa",
  "name": "APTenisa Launch — 4th Edition (September 2025 – February 2026)",
  "intro": "Immersive acceleration programme supporting science- and technology-based start-ups through specialised mentoring, customer discovery and business model validation, run by La Salle Technova Barcelona and co-financed by ENISA, with Madrid Science Park selecting the Madrid teams [2].",
  "more": "Participation in this national acceleration programme, coordinated by APTE and co-funded by ENISA and based on methodologies developed by La Salle Technova Barcelona, represented an important step in the maturation of rePhlow. Through mentoring and Lean Launchpad-based validation processes, we critically assessed our value proposition, explored market opportunities and refined our business model. These activities strengthened our understanding of commercialisation pathways and helped position rePhlow as a project with both scientific and translational potential.",
  "tag": "We entered with a pitch a panel found too technical and business-model questions we could not answer. We left five months later fielding questions on EU GMO regulation and revenue streams in front of a national audience in Málaga.",
  "extra": "<p class=\"small muted\" style=\"margin-top:8px\">Sessions are listed in calendar order. The LLP sessions ran in programme sequence; the workshops did not, with workshops 5, 6 and 7 delivered in reverse order of their programme numbering.</p>",
  "s": [
   [
    "17 Sep 2025",
    "Selection Phase",
    "Startup Mentorship",
    "Event: Madrid Science Park — Selection Phase Pitch &amp; Qualification",
    "Can we explain rePhlow clearly enough, to both a technical and a non-technical panel, to earn a place on a real accelerator program?",
    "The selection panel found our technical explanation unclear for a non-scientific audience and asked business-model questions we could not fully answer.",
    "rePhlow qualified for APTenisa Launch and the chance to represent Madrid Science Park at Transfiere 2026, and set out to fix exactly those two gaps.",
    "Why we took part in this session",
    "This pitch was the qualifying step to get into APTenisa Launch itself: before any of the formal training began, Madrid Science Park needed to select which teams would go on to the program.",
    "The panel told us our explanation of the technology was not clear and was too technical for people without a scientific background. It also was not clear from our pitch what happened to the water after treatment, whether it went back into the environment or was reused industrially. On top of that, we were asked several business-model questions we were not yet equipped to answer well, which was exactly why we wanted to start formal training in that area.",
    "Following this feedback, we started changing how we explained the project: simplifying the technical explanation for a general audience and being explicit about where the treated water actually goes afterward. It also confirmed, before we had even started APTenisa, that business-model training was a real gap we needed to close rather than something we could pick up along the way.",
    "We were selected to join the APTenisa Launch training program and to represent Madrid Science Park at Transfiere 2026 in Málaga.",
    1,
    [
     [
      20,
      "APTenisa selection phase"
     ],
     [
      21,
      "APTenisa selection phase"
     ]
    ]
   ],
   [
    "6–8 Oct 2025",
    "LLP #1 · Fernando Ozores",
    "Startup Mentorship",
    "Fernando Ozores — Lean Launchpad Framework, Customer Discovery &amp; BMC Intro",
    "What tools and roadmap did we need before we could start validating rePhlow as a business, not just a lab result?",
    "Fernando Ozores opened APTenisa Launch with the Lean Launchpad framework and the working tools and calendar for the program.",
    "rePhlow got its first structured six-month roadmap for validating the technology as a business.",
    "Why we took part in this session",
    "We joined APTenisa Launch, a program run by La Salle Technova Barcelona and subsidized by ENISA, specifically to deepen rePhlow’s business plan and Business Model Canvas ahead of presenting the project in other entrepreneurship competitions. Unlike Fábrica UCM, APTenisa selects specifically for deep-tech and science-based teams and runs a longer, six-month track with dedicated legal, financial and IP modules.",
    "Fernando Ozores, specialist in creativity, innovation and entrepreneurship, opened the program with the working framework: tools, calendar, and support structure for the six months ahead. The session covered the Lean Launchpad methodology and gave a first introduction to business models, customer development, and the Business Model Canvas. This kicked off a cohort of 47 teams (split into Cohort A and Cohort B), working across digital and scientific/deep-tech projects.",
    "We revisited the Business Model Canvas we had already built during Fábrica UCM with a more rigorous, deep-tech-specific lens, since APTenisa works specifically with science-based teams rather than a general student cohort. We also adopted the Lean Launchpad rhythm of alternating short theory sessions with cohort pitch presentations as our working cadence for the following months, and started tracking the program’s own tools and templates through La Salle’s platform.",
    "Two days later we presented rePhlow to our cohort for the first live round of feedback, then moved straight into a customer-discovery workshop the following week.",
    0,
    null
   ],
   [
    "15 Oct 2025",
    "Workshop #1 · Fernando Ozores",
    "Business Validation",
    "Fernando Ozores — Customer Discovery Interviews &amp; Role-Play",
    "How do we run a customer discovery interview without leading the interviewee toward the answer we want to hear?",
    "Fernando Ozores ran a role-play workshop on how to interview potential customers without biasing their answers.",
    "rePhlow started running structured discovery interviews instead of informal conversations about the project.",
    "Why we took part in this session",
    "Following APTenisa’s discovery-first approach, this workshop is where the team needed to learn the actual craft of talking to potential customers, wastewater treatment operators and industrial dischargers, rather than to mentors or fellow students, for the first time.",
    "The workshop, run as a role-play, covered how to structure and conduct a customer discovery interview: how to open it, how to ask open questions that do not lead the interviewee toward a desired answer, and how to distinguish what someone says from what they would actually do or pay for.",
    "We drafted a real interview script aimed at wastewater treatment plant operators and industrial dischargers, and started reaching out to the Madrid-area contacts we had already identified as relevant to phosphorus and wastewater treatment (Canal de Isabel II, Veolia, UCM research groups) to run actual discovery interviews instead of relying on our own assumptions about their needs.",
    "Two weeks later, in the value proposition session, we began turning what we heard in these interviews into a proper Value Proposition Canvas.",
    0,
    null
   ],
   [
    "20–22 Oct 2025",
    "LLP #2 · Xavier Balagué",
    "Startup Mentorship",
    "Xavier Balagué — Value Proposition Canvas, Prototyping &amp; MVP Definition",
    "Which specific value proposition and MVP format actually fit what we heard in our customer interviews?",
    "Xavier Balagué taught the Value Proposition Canvas and the different types of MVP, prototyping and landing pages.",
    "rePhlow built its first Value Proposition Canvas and began scoping what a simple MVP and landing page could look like.",
    "Why we took part in this session",
    "With real interview notes in hand from the previous workshop, we needed a structured way to turn what we had heard from operators into an actual value proposition, rather than a list of loose impressions. Xavier Balagué, specialist in digital marketing and B2B business development, led this session.",
    "The session covered the Value Proposition Canvas, matching customer pains and gains to product features and benefits, along with the different types of MVP, prototyping approaches, and landing pages as tools to test demand cheaply before building anything final.",
    "We built a first real Value Proposition Canvas pairing the pains and gains we had heard from operators (compliance pressure, cost of existing chemical dosing methods) with the specific features of the encapsulated <em>P. putida</em> platform, rather than a generic list of technical advantages. We also sketched a simple landing page concept as a low-cost way to gauge interest before committing more resources to the MVP.",
    "We presented this work to our cohort two days later, then moved into digital marketing and outreach tools a week after that.",
    0,
    null
   ],
   [
    "27 Oct 2025",
    "Workshop #2 · Xavier Balagué",
    "Business Validation",
    "Xavier Balagué — B2B Agile Sales &amp; Digital Inbound Tools",
    "How do we get in front of potential B2B customers using digital channels, not just personal networks?",
    "Xavier Balagué taught key digital marketing tools, LinkedIn strategy and how to manage a sales team.",
    "rePhlow began building a LinkedIn presence and a basic outreach process aimed at industrial wastewater customers.",
    "Why we took part in this session",
    "Our outreach so far had relied entirely on university and personal contacts. As a deep-tech project with a long B2B sales cycle, we needed a more deliberate way to reach potential customers and partners we did not already know.",
    "The workshop, run at La Salle Technova, covered key digital marketing tools, using LinkedIn for B2B outreach and social selling, and the basics of managing a small sales team or process as a startup.",
    "We set up and started actively using a LinkedIn presence for rePhlow aimed at industry contacts (water treatment engineering firms, potential CSIC and university partners), and put together a simple outreach tracker to follow up with the contacts identified in our earlier research (Canal de Isabel II, Veolia, UCM research groups) rather than reaching out ad hoc.",
    "This outreach groundwork fed into the following week’s session on customer segmentation, where we sharpened exactly who these contacts should be.",
    0,
    null
   ],
   [
    "3–5 Nov 2025",
    "LLP #3 · Fernando Ozores",
    "Startup Mentorship",
    "Fernando Ozores — Customer Segmentation, Archetypes &amp; Product-Market Fit",
    "Who exactly is our first paying customer, precisely enough to build for them rather than for “the water sector”?",
    "Fernando Ozores taught customer segmentation, customer archetyping and product-market fit.",
    "rePhlow defined a specific beachhead customer archetype instead of describing its market broadly.",
    "Why we took part in this session",
    "With a value proposition and some real interviews behind us, the team still described its market in broad strokes, “wastewater treatment,” rather than as a specific, addressable first customer. This session was aimed directly at fixing that.",
    "The session covered customer segmentation and archetyping in practice, and how these connect to product-market fit: building a detailed profile of a single representative customer rather than trying to serve an entire industry at once.",
    "We built out a specific beachhead customer archetype (a mid-sized industrial wastewater discharger facing phosphorus-limit compliance pressure) instead of the general “water treatment sector” language we had used until then, and used it to sharpen the beachhead customer description that later fed into our business plan and pitch materials.",
    "With a defined segment, the next workshop moved into the legal side of the business, shareholder structure and VC governance, with Robert Burgell.",
    0,
    null
   ],
   [
    "10 Nov 2025",
    "Workshop #3 · Robert Burgell",
    "Business Validation",
    "Robert Burgell — Legal Structuring, Shareholder Pacts &amp; VC Governance",
    "What legal structure and shareholder agreement would rePhlow need if the team actually incorporated?",
    "Robert Burgell, a venture capital lawyer, taught shareholder agreements, negotiating with VCs and the basics of incorporating a company.",
    "rePhlow mapped out the legal steps and shareholder questions it would need to settle before incorporating.",
    "Why we took part in this session",
    "As a student team without any legal or corporate background, we had no real picture of what incorporating rePhlow as a company would actually involve, or what a shareholder pact between team members should cover. Robert Burgell, a venture capital lawyer advising investment funds and tech and biotech companies, led this session.",
    "The session covered shareholder pacts and negotiating with VCs, the different types of company structures available in Spain, incorporation procedures, and common incompatibilities to watch for between founders’ other commitments (such as ongoing university or lab roles) and running a company.",
    "We started sketching a rough founders’ agreement outline covering assumptions about equity split and roles among the team, to have ready rather than improvised if the group ever decided to incorporate after iGEM. This built directly on the basic legal groundwork we had already flagged after the Fábrica UCM financing session.",
    "With legal basics covered, the following week’s session turned to distribution channels, how rePhlow would actually reach its customer, with Xavier Balagué.",
    0,
    null
   ],
   [
    "17–19 Nov 2025",
    "LLP #4 · Xavier Balagué",
    "Startup Mentorship",
    "Xavier Balagué — Distribution Channels &amp; Channel Unit Economics",
    "How does rePhlow actually reach and sell to a wastewater treatment plant?",
    "Xavier Balagué taught the different types of distribution channels and the economics behind each one.",
    "rePhlow mapped out realistic distribution channels for reaching its beachhead customer.",
    "Why we took part in this session",
    "Having defined our beachhead customer, we still had no clear answer for how rePhlow would actually reach them commercially, direct sales, an engineering partner, or a distributor. This session was aimed at closing that gap.",
    "The session covered the different types of distribution channels available to a B2B startup and the basic economics of each one: cost to serve, margin impact, and how channel choice affects the sales cycle.",
    "We concluded that, at least in the near term, direct engagement with treatment plant operators and partnerships with existing water-treatment engineering firms were the two most realistic channels for rePhlow, given the technical trust and long sales cycle involved in industrial wastewater treatment. This shaped the channels block of our Business Model Canvas.",
    "With channels defined, the following week’s workshop moved into intellectual property, deciding what to patent and what to keep as a trade secret, with Juan Carlos Artigas.",
    0,
    null
   ],
   [
    "20 Nov 2025 · 28 Jan · 12 Feb 2026",
    "Mentorships · Arnau Pla &amp; Jordi Martí Gascón",
    "Startup Mentorship",
    "Arnau Pla &amp; Jordi Martí Gascón — Business Model Review, Funding &amp; Technical Roadmap",
    "What do we actually need to line up, funding, next steps and technical timeline, to keep rePhlow moving forward as a real project?",
    "Arnau Pla and Jordi Martí Gascón mentored the team across three sessions on funding, next steps and the technology development timeline.",
    "rePhlow left each session with a clearer, more concrete roadmap connecting funding needs to actual technical milestones.",
    "Why we took part in this session",
    "Unlike the scheduled LLP and workshop sessions, these three mentorships with Arnau Pla and Jordi Martí Gascón were general, ongoing check-ins on the project as a whole, spaced out across the program (20 November, 28 January and 12 February) to keep rePhlow’s overall direction on track between the more topic-specific sessions.",
    "Across the three mentorships, the conversations centered on how to secure funding for the project, what concrete next steps to prioritize at each stage, and how to build a realistic timeline for the technical development of the platform alongside the business milestones. Rather than teaching a single framework, the mentors reviewed rePhlow’s actual state each time and gave direct feedback on what to tackle next.",
    "These sessions kept our funding search and our lab timeline aligned instead of running on separate tracks: we adjusted our near-term priorities more than once based on this feedback, and used the mentorships as checkpoints to confirm our roadmap still made sense before committing more time to any one direction. They also gave us an outside, recurring sanity check on industrial feasibility as the platform matured.",
    "Each mentorship fed directly into the sessions and milestones that followed it, from the December revenue-model and January partnership work through to the final pitch preparation with Nina Alastruey ahead of Transfiere.",
    0,
    null
   ],
   [
    "24 Nov 2025",
    "Workshop #4 · Herrero &amp; Asociados",
    "Business Validation",
    "Juan Carlos Artigas (Herrero &amp; Asociados) — IP Protection, Biotech Patents &amp; Intangibles",
    "Which parts of rePhlow’s technology should we patent, and which should we protect as a trade secret instead?",
    "Herrero &amp; Asociados mapped the IP tools available to a biotech project and the trade-offs between patenting and keeping know-how secret.",
    "rePhlow began deciding which parts of its platform to patent and which to protect as trade secrets.",
    "Why we took part in this session",
    "As rePhlow’s technology matured past pure lab validation, we still had no real IP strategy: a real risk for a project built around an engineered strain and a specific encapsulation process. Herrero &amp; Asociados, a Spanish IP law firm and agency with over 35 years of experience and offices across Spain, Portugal and Latin America, ran this workshop to give the team the vocabulary and criteria to make that decision deliberately rather than by default.",
    "The session distinguished copyright, which arises automatically on creation, lasts for the author’s life plus 70 years, and needs no registration or maintenance, from industrial property: trademarks, industrial designs and inventions, which require registration and maintenance, and are territorial and time-limited. For inventions specifically, it laid out patents (up to 20 years of protection, higher inventive-step requirement, roughly 24 months to grant in Spain) versus utility models (up to 10 years, lower inventive threshold, faster and cheaper, common for product improvements) versus trade secrets (Ley 1/2019, no fixed term, no registration cost, but requiring documented “reasonable measures” — organizational, legal and technical — to qualify for protection, and no protection against independent or reverse-engineered discovery by a third party). The workshop was explicit that ideas themselves are never registrable: only a specific technical solution to a technical problem is.",
    "We started treating IP as a portfolio decision rather than a single choice: keeping certain process-level parameters of the encapsulation and cultivation method as a documented trade secret for now, given the cost and 24-month timeline of a patent versus our current project stage, while flagging the rePhlow name and the overall encapsulation method as future trademark and patent candidates respectively once the technology and the entity behind it are further along. We also made one immediate practical change: no longer discussing sensitive process details in public wiki content or open pitches. → See <a href='#s2-ip'><u>Intellectual Property Strategy</u></a>.",
    "With a first IP position established, the following mentorship turned to sharpening how we ran customer interviews, with Miguel Ángel López Trujillo.",
    0,
    null
   ],
   [
    "27 Nov 2025",
    "Mentorship · M. Á. López Trujillo",
    "Startup Mentorship",
    "Miguel Ángel López Trujillo — Structuring Customer Interviews",
    "Who exactly should we be interviewing, and how do we turn what they tell us into something we can actually use in the business model?",
    "Miguel Ángel López Trujillo mentored the team on how to structure interviews with potential customers.",
    "rePhlow built a clearer process for who to contact, how to run the interview and how to use the answers in the business model.",
    "Why we took part in this session",
    "By late November we had already run some early discovery conversations, but without a consistent process for who to approach or how to get past polite, non-committal answers. This one-to-one mentorship with Miguel Ángel López Trujillo was aimed specifically at fixing that.",
    "The mentorship covered how to structure an interview with a potential customer, who within a target organization actually makes sense to contact, and how to get past surface-level answers to find out what someone would really do or pay for. It also covered how to take what comes out of those interviews and actually feed it into the business model, rather than treating the interviews as a box to check.",
    "We tightened our list of who to contact for customer interviews, moving from general “wastewater sector” outreach toward specific roles inside plants and industrial dischargers who could actually speak to budget and decision-making. We also built a simple process for turning interview notes into inputs for the business model, instead of letting them sit as separate, unused conversations.",
    "The interviews that followed fed directly into how we described our customer relationship and, later, into the revenue model work in December.",
    0,
    null
   ],
   [
    "1–3 Dec 2025",
    "LLP #5 · Xavier Balagué",
    "Startup Mentorship",
    "Xavier Balagué — Customer Retention, B2B Relationship Cycles &amp; LTV",
    "What kind of ongoing relationship does an industrial wastewater customer expect from a biotech supplier?",
    "Xavier Balagué taught customer relationship types, relationship cycles and customer lifetime value.",
    "rePhlow defined what an ongoing relationship with its beachhead customer would look like, beyond a single sale.",
    "Why we took part in this session",
    "Having mapped channels to reach a customer, we still had not thought through what happened after a first sale, whether rePhlow was a one-off equipment purchase or an ongoing relationship. This session addressed that directly.",
    "The session covered what a customer relationship actually is, its fundamentals, the different types of customer relationships and how they evolve through cycles, how to choose the right relationship model for a given business, worked examples, and how to think about Customer Lifetime Value (LTV).",
    "We shifted the customer relationships block of our Business Model Canvas toward an ongoing service and maintenance model (monitoring performance, replenishing the encapsulated biomass periodically) rather than a single equipment sale, and made a first rough estimate of customer lifetime value for a beachhead treatment plant.",
    "With the customer relationship defined, the team turned inward the following week, to a session on team leadership with Esther Somoza, ahead of the busier financial and pitch-focused months to come.",
    0,
    null
   ],
   [
    "9–10 Dec 2025",
    "Workshop #7 · Esther Somoza",
    "Business Validation",
    "Esther Somoza — High-Performance Team Leadership &amp; Executive Cohesion",
    "How do we keep the team working well as lab work, business deadlines and the pitch calendar all pile up at once?",
    "Esther Somoza led a workshop on leading high-performance teams.",
    "rePhlow adopted concrete team practices to manage roles and workload heading into the busiest stretch of the program.",
    "Why we took part in this session",
    "By December, the team was juggling lab work, the iGEM wiki, business-plan deadlines and the pitch calendar at the same time, with the workload only set to increase. Esther Somoza, founder of DelSoM Consultores, led this workshop on team leadership before that pressure peaked.",
    "The workshop focused on leading high-performance teams: how roles, communication and cohesion hold up under pressure, and practical tools for keeping a team aligned when deadlines start overlapping.",
    "We clarified ownership across the team’s different workstreams (lab work, business plan, wiki content, video production) and set a regular check-in rhythm to manage the overlapping financial, revenue-model and pitch deadlines coming up in January and February.",
    "With the team realigned, the following sessions moved fully into the financial side of the business, starting with revenue models the following week.",
    0,
    null
   ],
   [
    "15–17 Dec 2025",
    "LLP #6 · Miguel Ángel Trujillo",
    "Startup Mentorship",
    "Miguel Ángel Trujillo — Revenue Models, Value-Based Pricing &amp; Monetization",
    "How should rePhlow actually charge for what it does?",
    "Miguel Ángel Trujillo taught pricing and revenue model types, and the difference between price and value.",
    "rePhlow began comparing different revenue-model options instead of assuming a single default pricing structure.",
    "Why we took part in this session",
    "With channels and customer relationships defined, the open question was how rePhlow would actually generate revenue, a question we had left unanswered up to this point. Miguel Ángel Trujillo, business coach and mentor, led this session.",
    "The session covered price versus value, the different types of revenue models available to a startup, and how to think about revenue flow relative to both price and the value actually delivered to the customer, rather than defaulting to simple cost-plus pricing.",
    "We drafted a comparison of revenue-model options for rePhlow, for example per-kilogram of phosphorus recovered, an equipment lease plus service fee, or licensing to water-treatment engineering firms, and started weighing them against the value delivered to the beachhead customer rather than simply against our own production cost.",
    "This fed into the January session on key partnerships and resources, where we mapped who rePhlow would actually need to deliver on whichever revenue model it chose.",
    0,
    null
   ],
   [
    "12–14 Jan 2026",
    "LLP #7 · Miguel Ángel Trujillo",
    "Startup Mentorship",
    "Miguel Ángel Trujillo — Key Partnerships, Operational Risk &amp; Strategic Alliances",
    "Which partners does rePhlow actually need to operate, and what is the real risk of depending on each one?",
    "Miguel Ángel Trujillo taught key resources, key partners, partnering motivations and partnership risk.",
    "rePhlow mapped its key partners and the risk of depending on each one.",
    "Why we took part in this session",
    "With a revenue model sketched out, we still had not formally mapped who rePhlow actually depends on to operate, our labs, potential engineering partners, suppliers, and what happens if any one of them is unavailable. This session addressed that gap directly.",
    "The session covered the business model as a whole, key activities, key resources and key partners, the different motivations for partnering (cost reduction, risk reduction, access to specific assets or activities), the risks of partnership, and the different types of partnership relationships and agreements.",
    "We mapped rePhlow’s key partners (our CSIC labs, potential water-treatment engineering firms, university infrastructure) and flagged the risk of over-relying on any single lab or supplier, feeding directly into the risk framework section of our business plan.",
    "This risk-aware view of the business carried into the finance and investment-readiness workshop the following week.",
    0,
    null
   ],
   [
    "19 Jan 2026",
    "Workshop #6 · Miguel Ángel Trujillo",
    "Business Validation",
    "Miguel Ángel Trujillo — Financial Statements, Investment Readiness &amp; Investor Pitch Deck",
    "What would rePhlow’s finances need to look like to be genuinely investment-ready?",
    "Miguel Ángel Trujillo taught the basics of finance, venture capital and business angel funding, and how to prepare an investment deck.",
    "rePhlow began preparing a dedicated investor deck instead of relying on its general competition pitch.",
    "Why we took part in this session",
    "With a revenue model and key partners mapped, we still had no real financial statements or investor-facing materials, only the pitch decks built for Fábrica UCM and Caja de Ingenieros. This workshop was aimed at closing that specific gap ahead of APTenisa’s own pitch final.",
    "The session covered the principles of finance and how to finance a business, how venture capital and business angel funding actually work for startups, and how to prepare an investment-ready deck.",
    "We started building a dedicated investor deck for rePhlow, separate from our general project pitch, including financial projections and a first estimate of the funding round we would eventually need for a pilot deployment.",
    "This fed directly into the pitch-preparation workshop with Nina Alastruey the very next day.",
    0,
    null
   ],
   [
    "20 Jan 2026",
    "Workshop #5 · Nina Alastruey",
    "Business Validation",
    "Nina Alastruey — Persuasive Communication &amp; Investor Pitch Structuring",
    "How do we adapt our pitch specifically for an investor audience, rather than a general competition jury?",
    "Nina Alastruey taught how to build and deliver a pitch aimed specifically at investors.",
    "rePhlow adapted its pitch to foreground the investment case ahead of the APTenisa pitch final.",
    "Why we took part in this session",
    "The day after building our first investor deck, we still had a pitch written for a general competition jury rather than for investors specifically weighing a funding decision. Nina Alastruey, specialist in open innovation and corporate venturing, led this workshop to close that gap.",
    "The session covered how to build a pitch aimed at investors and how to prepare and structure it for persuasive delivery, distinct from a jury-feedback pitch.",
    "We reworked our pitch to foreground the investment ask and the financial narrative built the day before, rather than leading only with the technical and impact story we had used for Fábrica UCM and Caja de Ingenieros.",
    "This investor-facing version of the pitch was tested again a week later in the cost-structure and break-even session, and then live in front of the full APTenisa investor panel two weeks after that.",
    0,
    null
   ],
   [
    "26–28 Jan 2026",
    "LLP #8 · Fernando Ozores",
    "Startup Mentorship",
    "Fernando Ozores — Key Activities, Cost Structure, TAM-SAM-SOM &amp; Break-Even Metrics",
    "What does it actually cost to run rePhlow, and at what scale does it break even?",
    "Fernando Ozores taught cost structure, exponential growth models, TAM-SAM-SOM sizing and break-even analysis.",
    "rePhlow built its first real cost structure and break-even estimate ahead of the program’s pitch final.",
    "Why we took part in this session",
    "With a pitch, a revenue model and an investor deck in place, the one piece still missing was a real cost structure and a sense of the actual market size behind our numbers. This was the last theory session before the full 47-team pitch final.",
    "The session covered key activities and cost structure, how these connect to decisions in the business model, models of exponential growth, financial validation of the business model, TAM-SAM-SOM market sizing, break-even point, and other relevant startup metrics.",
    "We built a first TAM-SAM-SOM estimate for phosphorus recovery in industrial wastewater treatment, aligning it with the market-sizing work already underway in our business plan, and put together a rough break-even estimate for a first pilot deployment. → See <a href='#s1-market'><u>Market Analysis</u></a>.",
    "Two days later we pitched this updated model to our cohort, and then carried it into the full 47-team APTenisa pitch final on 2 February.",
    0,
    null
   ],
   [
    "17 &amp; 19 Feb 2026",
    "Mentorship · Nina Alastruey",
    "Startup Mentorship",
    "Nina Alastruey — Final Pitch Polishing &amp; Value Proposition Stress-Testing",
    "Is our pitch, our problem framing and our business model actually solid enough for a national investor audience in Málaga?",
    "Nina Alastruey ran two final sessions stress-testing our pitch, our problem statement and our revenue model ahead of Transfiere.",
    "rePhlow rewrote its one-liner, reframed its problem statement and restructured its revenue model into three separate streams.",
    "Why we took part in this session",
    "With Transfiere in Málaga one week away, this was our last chance to stress-test the pitch we had been building since Fábrica UCM against fresh, critical feedback before presenting to a national investor and industry audience.",
    "Nina Alastruey pushed us to rethink our one-liner and, more importantly, how we framed the problem itself: not just phosphorus regulation, but the fact that the solutions already on the market do not actually solve it. She also challenged our revenue model, which up to that point had not clearly separated how rePhlow would actually make money.",
    "We rewrote our one-liner and reframed the problem around the gap left by current solutions, not regulation alone. We also restructured our business model into three distinct B2B revenue streams: the bioreactor itself, consumables, and a Software as a Service layer, the first time this SaaS component was introduced into our model, based directly on this feedback. → See <a href='#s3-model'><u>Business Model</u></a>.",
    "This was our final round of pitch and business model adjustments before presenting at Transfiere in Málaga.",
    0,
    null
   ],
   [
    "24–26 Feb 2026",
    "Transfiere Demo Day, Málaga",
    "Business Validation",
    "Event: National ecosystem exposure, B2B networking and investor presentation",
    "Does everything we rebuilt over five months, the pitch, the problem framing, the business model, actually hold up in front of a national audience we have never met before?",
    "The jury pressed us on how rePhlow would navigate EU GMO regulation for the encapsulated strain and on our business model and revenue streams, and again stressed the need for a clear roadmap, this time specifically for fundraising.",
    "rePhlow delivered its strongest pitch of the program and could answer questions that would have stumped us five months earlier, though the call for a clearer funding roadmap kept coming back.",
    "Why this mattered",
    "Transfiere in Málaga, not the earlier APTenisa pitch final, was the program’s real closing Demo Day: mandatory for all teams, with travel costs covered by the students themselves and one entry per team provided by APTE. It gave rePhlow its first exposure to a genuinely national audience, including people from across the APTenisa network and other Spanish science and technology parks, rather than only La Salle Technova’s own cohort and investor panel.",
    "The presentation went very well, built on the reworked one-liner and problem framing from our sessions with Nina Alastruey. We could clearly feel the difference the program had made: we handled jury questions on how rePhlow would navigate European GMO regulation for the encapsulated strain, and on our proposed business model and revenue streams, without difficulty. The jury again stressed the importance of a clear roadmap for the project, this time focused specifically on fundraising: what capital would be needed at each phase and when.",
    "This was the clearest evidence yet that the entrepreneurship training across Fábrica UCM and APTenisa had actually changed how we handled a live, high-stakes audience, from the technical explanation problems flagged at our very first APTenisa selection pitch back in September to confidently fielding regulatory and business-model questions in Málaga. It also left us with a specific, unresolved gap to close: a concrete, phase-by-phase fundraising roadmap, something we had touched on conceptually with Arnau Pla and Jordi Martí Gascón but had not yet built out in detail. → That gap is what our <a href='#s3-gantt'><u>Gantt Chart</u></a> now closes.",
    "Transfiere closed out the formal APTenisa Launch program and left rePhlow with a validated pitch, a stronger business model, and a clear next priority: building out that fundraising roadmap as the project moves beyond the accelerator programs.",
    1,
    [
     [
      22,
      "Transfiere 2026 Demo Day, Málaga"
     ],
     [
      23,
      "Transfiere 2026 Demo Day, Málaga"
     ],
     [
      24,
      "Transfiere 2026 Demo Day, Málaga"
     ]
    ]
   ]
  ]
 },
 "caja": {
  "lg": "cajaingenieros",
  "name": "Fundación Caja de Ingenieros",
  "intro": "Mentorship and a national final at the Barcelona Stock Exchange, which gave rePhlow its first test in front of a jury outside our own university circle.",
  "tag": "",
  "extra": "",
  "s": [
   [
    "13 Oct 2025",
    "Mentorship · Sergi Manaut",
    "Startup Mentorship",
    "Sergi Manaut — Pitching a Deep-Tech Project",
    "How do we open a deep-tech pitch so a non-technical audience is hooked in the first few seconds, not lost in the science?",
    "Sergi Manaut reviewed our pitch ahead of the Barcelona final and flagged the opening and the technical detail as weak points.",
    "rePhlow rewrote its opening hook and moved the technical detail into a Q&amp;A annex.",
    "Why we took part in this session",
    "We reached out to Sergi Manaut specifically to stress-test and rehearse our pitch ahead of the Caja de Ingenieros final in Barcelona. As a deep-tech project explaining synthetic biology to a mixed, largely non-technical jury, we needed outside eyes on how to make a highly technical platform land in a short, high-stakes pitch slot.",
    "The mentorship focused on building a first solid pitch from scratch, with particular emphasis on the opening seconds, the hook that needs to be clear and impactful enough to hold a jury’s attention before they’ve understood any of the science. We also worked through what to include and, just as importantly, what to leave out: which technical details earn their place on stage and which ones are better saved for questions.",
    "We rewrote our opening hook to lead with the problem and its scale rather than with the mechanism of the engineered strain. We also stripped out specific technical data and jargon that weren’t adding to the story and moved that material into a dedicated Q&amp;A annex at the end of the deck, so the core pitch stayed lean and the technical depth was still available the moment a juror asked for it.",
    "This gave us a genuinely strong pitch to bring to the Barcelona final, and although we didn’t win, it left us with a solid, reusable pitch structure that we carried into every Demo Day that followed.",
    0,
    null
   ],
   [
    "20 Nov 2025",
    "Demo Day · Barcelona Stock Exchange",
    "Business Validation",
    "Event: Barcelona Stock Exchange — Finalists Pitch &amp; Awards",
    "Does the story we tell about rePhlow hold an audience’s attention for a full pitch, not just its opening seconds?",
    "The jury understood the technical side well but told us the project still needed more real-world validation and struggled to hold the audience’s attention given its complexity.",
    "rePhlow confirmed that no matter how strong the science was, it needed a credible, demonstrable business plan to be taken seriously.",
    "Why this mattered",
    "This final at the Barcelona Stock Exchange was our first real test of the pitch we had rebuilt with Sergi Manaut, in front of a jury and audience outside our own university circle.",
    "The feedback was that the project was strong and that, this time, the technical part had been well understood. Even so, we still struggled to hold the audience’s attention throughout, given how complex the project is. The jury also felt the project needed more development and more “real-world grounding”: both technical and market-facing proof, such as tests with potential customers and a clearer picture of the actual market.",
    "This confirmed that the science alone was not going to carry the project. We came away clear that we needed to keep building out the business side in parallel with the lab work, because no solution, however good, reaches the market without a solid business plan behind it.",
    "This pushed us to keep treating business development as seriously as the lab work through the rest of both Fábrica UCM and APTenisa, starting with the IP workshop with Herrero &amp; Asociados four days later (see APTenisa Launch).",
    1,
    [
     [
      9,
      "Caja de Ingenieros final at the Barcelona Stock Exchange"
     ],
     [
      8,
      "Caja de Ingenieros final at the Barcelona Stock Exchange"
     ]
    ]
   ]
  ]
 }
} as const;

/** Events: [date, title, text, photos]. */
export const EV = [
 [
  "Oct 2025",
  "Madrid Connect 2025 — Madrid Science Park",
  "Participation in an innovation and networking event connecting science-based start-ups, researchers and industry professionals, providing opportunities to showcase rePhlow and explore potential collaborations.",
  [
   26,
   27,
   28,
   25
  ]
 ],
 [
  "Feb 2026",
  "Transfiere 2026 — Málaga",
  "Participation in one of Europe’s leading technology transfer and innovation forums, connecting researchers, entrepreneurs, industry representatives and investors, where rePhlow attended representing Madrid Science Park. Our pitch there is described under APTenisa Launch, which it closed.",
  [
   29,
   30,
   31
  ]
 ],
 [
  "Mar 2026",
  "DIS Abroad Scandinavia — Innovation and Entrepreneurship in Europe",
  "Presentation of rePhlow to international students from the Danish study abroad programme at Compluemprende, showcasing our biotechnology-based solution for phosphorus recovery and sharing our experience in scientific entrepreneurship. (See Collaboration.)",
  [
   32,
   33
  ]
 ],
 [
  "Mar 2026",
  "iGEM Startups BioHackathon 2026",
  "International bioentrepreneurship initiative fostering innovation, collaboration and the commercialisation of synthetic biology solutions, bringing iGEM teams together to work on the business side of their projects alongside teams from other countries.",
  [
   34,
   35
  ]
 ],
 [
  "Apr 2026",
  "Roundtable at the 7th Entrepreneurial University Conference — <em>Entrepreneurship at University: When and How to Get Started?</em>",
  "Participation in a panel discussion on student entrepreneurship, where we shared how a university research project becomes a venture and what support students actually need at each stage.",
  [
   39,
   36,
   37,
   38
  ]
 ],
 [
  "Jun 2026",
  "Visit by Texas Christian University students — Compluemprende",
  "Presentation of rePhlow to a visiting group of international students, introducing both the science behind the project and our experience of building a venture from a university laboratory.",
  [
   40
  ]
 ],
 [
  "Jun 2026",
  "South Summit Madrid 2026",
  "Attendance at a leading international entrepreneurship event, providing an opportunity to present rePhlow and connect with the global start-up and investment ecosystem.",
  [
   41,
   42
  ]
 ],
 [
  "Jun 2026",
  "iGEM Entrepreneurship Bootcamp",
  "Specialised entrepreneurship training focused on translating synthetic biology projects into viable business opportunities, strengthening our skills in business model development, market validation, pitching and commercialisation strategy [3].",
  []
 ],
 [
  "Jun 2026",
  "Kick-off — iGEM Meet-up Madrid UCM Hackathon",
  "Opening event of the Madrid iGEM meet-up hosted at UCM, combining a hackathon format with the chance to exchange approaches with other teams at an early stage of their projects. (See Collaboration.)",
  [
   43,
   44,
   45,
   46,
   47
  ]
 ],
 [
  "Oct 2026",
  "Tuesdays with Compluemprende — Advanced Entrepreneurship Institute",
  "Interview with Wilfredo Jurado Rodríguez, CEO of the Advanced Entrepreneurship Institute, to showcase rePhlow and share our experience in scientific entrepreneurship with an international audience.",
  [
   48,
   49
  ]
 ]
] as const;

/** SWOT: key → [heading, letter, [title, summary, detail][]]. */
export const SW = {
 "s": [
  "Strengths",
  "S",
  [
   [
    "Interdisciplinary and structured team",
    "Interdisciplinary team with clear structure (biology, chemistry, engineering and design as well as dedicated human practices, entrepreneurship and communication areas).",
    "rePhlow brings together competencies spanning molecular biology, chemistry, engineering, physics and design within a structured team. Our project is divided not only by scientific-related teams (encapsulation, revalorisation or bacteria) but also into dedicated work areas such as human practices, entrepreneurship and science communication. This cross-disciplinary composition is unusual for a project at this stage of development and enables rePhlow to address scientific and commercial dimensions simultaneously rather than sequentially. The structured organisation also means that each dimension has a named owner, reducing the risk that non-technical aspects are deprioritised during the technical development phase."
   ],
   [
    "Hybrid biological system",
    "Hybrid enzymatic + bacterial system — effective, selective and adaptable to variable effluents.",
    "The integration of enzymatic phosphorus release and engineered bacterial accumulation via polyphosphate-accumulating organisms (PAOs) creates a treatment approach that is simultaneously effective, selective and adaptable to varying phosphorus concentrations and effluent chemistries. This hybrid design distinguishes rePhlow from single-mechanism alternatives that either capture phosphorus without concentrating it, or accumulate it without providing a controlled recovery pathway. Industry currently lacks a modular and controllable route that connects phosphorus capture to its actual recovery; neither of the dominant existing approaches was originally designed around an integrated recovery pathway."
   ],
   [
    "Modular, plug-and-play retrofit architecture",
    "Modular, plug-and-play design: integrates into existing infrastructure without full-plant replacement.",
    "The system is explicitly designed to be installed within existing industrial infrastructure without requiring the replacement or wholesale redesign of an entire treatment plant. This modularity makes rePhlow compatible with a range of industrial processes, effluent characteristics and operational scales, and substantially lowers the adoption barrier for prospective customers."
   ],
   [
    "Integrated capture, recovery and revalorisation",
    "Integrated phosphorus capture, recovery and revalorisation in one system.",
    "rePhlow does not merely remove phosphorus from wastewater, it captures it, concentrates it within bacterial biomass, and is designed to recover it in a polyphosphate-rich form suitable for re-entry into industrial or agricultural supply chains. This integrated approach distinguishes rePhlow from disposal-only alternatives and gives it a business case beyond a single environmental service. Turning a compliance cost into a potential revenue stream from recovered phosphate is the value proposition that connects rePhlow’s environmental purpose to its commercial sustainability."
   ],
   [
    "Biosafety by design",
    "Biosafety built in: core-shell encapsulation and downstream ultrafiltration keep engineered organisms contained.",
    "The core-shell alginate-chitosan encapsulation system physically contains the engineered bacteria throughout the treatment cycle, with downstream ultrafiltration providing an additional containment barrier. This built-in biosafety architecture keeps rePhlow within the contained-use regulatory pathway under Directive 2009/41/EC [6], proactively addresses the primary concern raised by potential industrial partners regarding environmental release, and was developed explicitly in response to stakeholder feedback rather than added retrospectively."
   ],
   [
    "Industrial collaboration with Bio-Oils Huelva",
    "Industrial collaboration with Bio-Oils Huelva for pilot validation and market entry.",
    "Bio-Oils Huelva is rePhlow’s first industrial collaborator and prospective customer. The collaboration provides access to a real industrial wastewater stream for pilot validation, a route to market entry, and credibility with future investors and customers. This early industrial anchoring is a significant commercial asset for a technology still at pre-commercial stage, and Bio-Oils Huelva confirmed that phosphorus-rich streams are a direct and growing cost for the facility. No formal agreement has been signed to date."
   ],
   [
    "Pipeline of industrial collaborations",
    "Early engagement with REPSOL and CEDEX.",
    "Early conversations with REPSOL and CEDEX signal expanding interest from established industrial and institutional players. Each additional relationship provides a further validation pathway beyond the initial collaboration and broadens the evidence base that rePhlow can present to investors and regulators."
   ],
   [
    "Academic and research network",
    "Academic and research network: UCM and CSIC.",
    "Active mentorship and collaboration with the Complutense University of Madrid (UCM) and the Spanish National Research Council (CSIC), including CIB-CSIC and IQOG-CSIC, provide rePhlow with access to specialised scientific expertise and laboratory infrastructure that a student team could not otherwise reach."
   ],
   [
    "Demonstrated entrepreneurial track record",
    "Demonstrated entrepreneurial track record: 1st Prize Compluemprende 2025, 1st Prize Santander X UCM 2026, 2nd Prize BISC-E national stage 2026 and Promega Ibérica sponsorship.",
    "First Prize at Compluemprende 2025 with four special distinctions, First Prize at Santander X UCM 2026, Second Prize at the national stage of BISC-E 2026 and a sponsorship from Promega Ibérica represent external, competitive validation of rePhlow’s commercial potential. These recognitions strengthen the team’s credibility with future investors and partners and demonstrate that the project has been assessed favourably by evaluators with experience of early-stage biotech ventures."
   ]
  ]
 ],
 "w": [
  "Weaknesses",
  "W",
  [
   [
    "Pre-commercial stage (TRL 2–3)",
    "Pre-commercial stage (TRL 2–3): the integrated system has not been validated under industrially representative conditions.",
    "rePhlow’s technology remains at an early stage of technical readiness. Core proof-of-concept work is ongoing and the integrated system has not yet been validated under industrially representative conditions. This is the most fundamental limitation in terms of customer acquisition and investment readiness, and it requires that every claim rePhlow makes about performance be carefully scoped to the stage of evidence actually reached."
   ],
   [
    "Pilot capital requirement and unvalidated unit economics",
    "Pilot capital requirement and unit economics not yet validated.",
    "Our planning figures for the industrial pilot, the module price and the gross margin remain unvalidated at both laboratory and industrial pilot scale, and the cost of goods depends on three parameters we have not yet measured: encapsulated uptake relative to free cells, capsule service life and enzyme cost at kilogram scale. A full techno-economic assessment is a defined next step, but until it is completed the financial case rests on assumptions rather than evidence. The figures themselves, and what would have to happen to confirm each one, are set out in our <a href='#s3-model'><u>Business Model</u></a> section."
   ],
   [
    "Scale-up risk",
    "Scale-up risk unaddressed empirically.",
    "Many biological solutions that perform well at laboratory scale encounter significant challenges during the transition to pilot or industrial scale — in fluid dynamics, biological stability over extended operation, encapsulation integrity under real effluent conditions, and operational control. This risk has not yet been addressed empirically and is the primary reason the industrial pilot stage is central to rePhlow’s implementation route rather than optional."
   ],
   [
    "Team profile gaps",
    "Team profile gaps in legal affairs, industrial engineering and business management.",
    "The team currently lacks dedicated expertise in legal affairs, industrial engineering and business management. These gaps are material given the regulatory complexity of working with genetically modified micro-organisms (multi-agency contained-use authorisation in Spain, financial guarantee obligations under Ley 26/2007 [5]), the engineering requirements of scale-up, and the commercial demands of moving from a research team to an early-stage company. Our <a href='#s4-skills'><u>Skill Gap Analysis</u></a> sets out how and when each of these is addressed."
   ],
   [
    "Dependence on a single industrial collaborator",
    "Heavy reliance on a single industrial collaborator (Bio-Oils Huelva).",
    "rePhlow’s current industrial validation strategy depends substantially on one collaborator, Bio-Oils Huelva, and no formal agreement has yet been signed. While this relationship is strategically valuable and was deliberately pursued for its fit with rePhlow’s technology, an over-reliance on a single customer or validation site creates concentration risk at this stage of development. Characterising a second effluent type and developing a second industrial contact in parallel is therefore a near-term priority."
   ]
  ]
 ],
 "o": [
  "Opportunities",
  "O",
  [
   [
    "Regulatory-driven compliance market",
    "Directive (EU) 2024/3019: total-phosphorus limits of 0.5–0.7 mg/L phased in between 2033 and 2045 create a predictable compliance market.",
    "Directive (EU) 2024/3019 establishes binding total-phosphorus discharge limits of 0.5–0.7 mg/L for relevant urban wastewater treatment plants, phased in between 2033 and 2045 [4]. This creates a predictable, growing compliance market for phosphorus removal technologies. While the precise applicability of these limits to industrial effluent streams requires specialist legal verification, the regulatory direction is unambiguous and creates a market-formation dynamic that favours early movers."
   ],
   [
    "Phosphorus as a Critical Raw Material",
    "Phosphorus as EU Critical Raw Material: dedicated policy support and funding mechanisms.",
    "The EU’s designation of phosphate rock and phosphorus as Critical Raw Materials brings dedicated policy support, strategic priority and funding mechanisms specifically for phosphorus recovery technologies [7]. This increases both the addressable funding landscape for rePhlow and the political salience of the problem it addresses."
   ],
   [
    "Circular-economy alignment",
    "Circular economy model.",
    "rePhlow’s model converts a waste stream into a recoverable, high-value material. This positioning is directly aligned with the priorities of the European Green Deal and the Circular Economy Action Plan [8,9], and with the growing sustainability reporting obligations of industrial customers. Phosphate rock is a finite and geographically concentrated resource; a technology that recovers phosphorus rather than only removing it feeds a genuinely different economic model, one where phosphorus re-enters supply chains instead of being permanently lost as waste."
   ],
   [
    "Access to a structured entrepreneurship funding ecosystem",
    "Active grant and accelerator ecosystem: Compluemprende, FECYT, Santander X, APTenisa, Promega Ibérica.",
    "Active accelerator and grant programmes — including Compluemprende, FECYT, Santander X, APTenisa and Promega Ibérica — provide non-dilutive funding routes accessible to student-led biotechnology ventures. These programmes reduce the capital required to reach the next validation milestone and provide structured mentorship and network access alongside financial support."
   ]
  ]
 ],
 "t": [
  "Threats",
  "T",
  [
   [
    "Established operators",
    "Established operators with scale, regulatory history and existing customer relationships.",
    "Incumbent wastewater treatment technology providers have scale advantages, established regulatory approvals, long-standing customer relationships and track records of operational performance. Competing for the same industrial customers against these players is a direct commercial challenge that rePhlow must address through differentiation: specifically, the retrofit compatibility, biological selectivity and recovery capability that conventional chemical approaches cannot offer."
   ],
   [
    "Competing emerging technologies",
    "Growing competition from alternative phosphorus-removal technologies as the market becomes commercially attractive.",
    "As phosphorus removal becomes commercially attractive under Directive (EU) 2024/3019, investment in alternative technologies — struvite crystallisation, advanced membrane systems, electrocoagulation and other biological approaches — will increase. rePhlow’s opportunity lies in the gap between established compliance technologies and integrated stream-specific recovery systems. Establishing a defensible technical and commercial position requires prioritising industrially informed validation and operating know-how before the market becomes significantly more crowded."
   ],
   [
    "Regulatory risk and financial liability for contained use",
    "GMO regulatory complexity: multi-agency contained-use authorisation with uncertain timelines.",
    "Despite its containment architecture, rePhlow’s use of genetically modified bacteria introduces regulatory risk at multiple levels. Obtaining contained-use authorisation in Spain involves multi-agency processes with uncertain timelines and potentially significant compliance costs [6,10,11]. Ley 26/2007 additionally places activities involving modified organisms under a strict liability regime that may require a financial guarantee: a financial planning obligation that must be resolved before commercial deployment and that represents a real capital commitment for an early-stage company [5]. These regulatory complexities are not unexpected, but they require proactive management and cannot be absorbed passively."
   ]
  ]
 ]
} as const;

/** SWOT colours. */
export const SWC = {
 "s": "#5f7d36",
 "w": "#b07d14",
 "o": "#2E7D86",
 "t": "#e2542d"
} as const;

/** SDGs: [number, name, colour, role, target, body HTML, commercial implication]. */
export const SDG = [
 [
  6,
  "Clean Water and Sanitation",
  "#26BDE2",
  "The regulatory driver",
  "Target 6.3 | Improving water quality and reducing pollution [1]",
  "<p>Wastewater treatment is becoming an increasingly demanding regulatory responsibility. Directive (EU) 2024/3019 establishes stricter total-phosphorus requirements for relevant urban wastewater-treatment plants, including limits of <strong>0.7 mg/L</strong> for facilities treating 10,000 to fewer than 150,000 population equivalents and <strong>0.5 mg/L</strong> for larger facilities, subject to the Directive’s specific conditions and phased implementation between 2033 and 2045 [2].</p><p>Although these requirements do not automatically apply to industrial effluents, the Directive also strengthens the regulatory framework surrounding certain non-domestic wastewater discharges.</p><p>For rePhlow, this creates a potential commercial driver: industrial facilities facing phosphorus-management obligations may increasingly seek effective treatment technologies compatible with their existing infrastructure. Our opportunity therefore depends on identifying facilities where phosphorus concentrations, treatment requirements and operating costs make additional recovery technologies commercially relevant.</p>",
  "Regulatory developments can strengthen demand for phosphorus treatment, helping identify prospective customers and inform market-entry priorities."
 ],
 [
  12,
  "Responsible Consumption and Production",
  "#BF8B2E",
  "Turning recovery into revenue",
  "Target 12.2 | Sustainable management and efficient use of natural resources [3]",
  "<p>Phosphorus is not only a pollutant to be removed. It is also a valuable resource primarily obtained from geographically concentrated, non-renewable phosphate-rock deposits [4]. Recovering phosphorus from wastewater therefore creates an opportunity to reduce resource losses while exploring alternative sources of industrial raw materials.</p><p>During our engagement with Roberto Arranz at CEDEX, we discussed the importance of regulation in creating demand for recovered resources. The biodiesel market provided a useful parallel: regulatory requirements can help establish demand for products that might otherwise struggle to compete with conventional alternatives.</p><p>A related mechanism is emerging for phosphorus. Directive (EU) 2024/3019 provides for the establishment of a combined minimum reuse and recycling rate for phosphorus recovered from urban wastewater and sludge, while encouraging the production and purchasing of recovered nutrients [2]. Although these measures do not guarantee demand for rePhlow-derived polyphosphate, they demonstrate growing institutional interest in phosphorus recovery.</p><p>Our downstream strategy goes one step further: rather than restricting recovered phosphorus to bulk applications, we aim to investigate its use as a phosphoryl donor in higher-value biocatalytic processes.</p>",
  "Phosphorus recovery could provide a second revenue stream, although its commercial viability depends on product purity, conversion yields, market demand and the applicable regulatory framework."
 ],
 [
  9,
  "Industry, Innovation and Infrastructure",
  "#FD6925",
  "The adoption argument",
  "Target 9.4 | Upgrading infrastructure and retrofitting industries for sustainability [5]",
  "<p>This is a goal rePhlow reaches without aiming at it. Modularity was not adopted in order to upgrade industrial infrastructure; it was adopted because Bio-Oils Huelva told us that a mid-sized producer cannot shut down a production line to rebuild a treatment plant around an experimental technology. The result happens to be what Target 9.4 asks for: a retrofit that raises resource efficiency within an existing installation rather than replacing it.</p><p>The same design carries a cost on the other side of the goal. A contained biological module requires capsules, a reactor and trained operators where chemical dosing requires none of them, which works against the accessibility dimension of Target 9.a. Our technology is, for now, easier to adopt by facilities that already have technical capacity on site.</p>",
  "Retrofit compatibility is simultaneously our strongest adoption argument and the source of an operating burden our first customers will have to absorb."
 ],
 [
  14,
  "Life Below Water",
  "#0A97D9",
  "The environmental problem behind market demand",
  "Target 14.1 | Reducing marine pollution, including nutrient pollution from land-based activities [6]",
  "<p>Excess phosphorus contributes to eutrophication, excessive algal growth and oxygen depletion, threatening aquatic ecosystems. SDG Target 14.1 established 2025 as the deadline for significantly reducing marine pollution, including nutrient pollution originating from land-based activities. However, nutrient pollution remains a significant environmental challenge [7].</p><p>For rePhlow, this continuing problem reinforces the importance of developing technologies capable of preventing phosphorus losses before they reach vulnerable ecosystems.</p><p>The relationship with our business model is indirect but fundamental: the environmental consequences of nutrient pollution help explain why phosphorus management is a continuing policy and industrial priority. Industrial customers do not purchase rePhlow simply to contribute to an SDG. They would adopt it if the system helps address their operational and environmental responsibilities at an acceptable cost.</p>",
  "The continuing need to control nutrient pollution supports the long-term relevance of phosphorus-treatment solutions and the environmental value of successful deployment."
 ],
 [
  13,
  "Climate Action",
  "#3F7E44",
  "An unresolved environmental trade-off",
  "Target 13.2 | Integrating climate change measures into policies, strategies and planning [8]",
  "<p>Not every sustainability objective currently represents a demonstrated advantage for rePhlow.</p><p>Our preliminary Life Cycle Assessment (LCA), conducted following the ISO 14040 and ISO 14044 framework [9], indicates that, under the capsule-performance assumptions evaluated, <strong>rePhlow has a higher climate-change impact than the chemical-treatment route used as a comparator.</strong> Capsule production is an important contributor to this result. We therefore do not present reduced greenhouse-gas emissions as an established benefit of our technology.</p><p>Instead, our sensitivity analysis identifies phosphorus captured per gram of capsule as the critical parameter governing the environmental balance. At the capsule loading assumed in the assessment, around 1.5 mg P per gram, the climate reading stands against us; our analysis places the crossover at approximately 8 mg P per gram, above which rePhlow overtakes the chemical route. Improving capsule durability, reuse and phosphorus recovery is therefore an environmental and a commercial objective at the same time.</p><p>Following discussions with CEDEX, we also identified the use of renewable energy as an additional scenario requiring assessment. These uncertainties have direct business implications. Capsule lifetime influences not only environmental performance but also replacement costs, operating expenditure and potential commercial margins.</p>",
  "Climate performance is currently a technical and economic risk to be addressed through improved capsule efficiency, process optimisation and further life-cycle assessment."
 ]
] as const;

/** Positive impacts: [icon, title, text]. */
export const POS = [
 [
  "wave",
  "Environmental impact",
  "rePhlow’s clearest positive impact is environmental: reducing the entry of phosphorus into aquatic systems and preventing eutrophication before it reaches the point of no return we witnessed at the Mar Menor [10]. This is not an abstract ambition; it is the direct consequence of standing at a eutrophied ecosystem and asking what would have had to happen upstream, at the industrial source, for that collapse never to occur. Every stop on our route, from Doñana to Embalse de San Juan, confirmed the same pattern: phosphorus that is not intercepted at its industrial origin eventually resurfaces somewhere else, in a lagoon, a reservoir or a protected wetland."
 ],
 [
  "factory",
  "Industrial and economic impact",
  "For industrial adopters, rePhlow’s value proposition is concrete rather than aspirational. Bio-Oils Huelva confirmed that phosphorus-rich streams are a direct cost, tied to discharge requirements, water reuse targets and process efficiency, and that this cost is only going to increase as Directive (EU) 2024/3019 progressively tightens total phosphorus limits between 2033 and 2045 [2]. A technology that helps treat these streams without forcing companies to rebuild their infrastructure represents a genuine economic opportunity, not just an environmental one: it turns a compliance cost into a manageable, modular investment, and, if the revalorisation pathway matures, into a potential new revenue stream from recovered phosphate."
 ],
 [
  "cycle",
  "Circular economy impact",
  "Phosphate rock, the primary source of mined phosphorus, is a finite and geographically concentrated resource [4]. A technology that recovers phosphorus rather than only removing it does not just reduce pollution; it feeds a genuinely different economic model, one where phosphorus re-enters industrial and agricultural supply chains instead of being permanently lost as waste. This is the impact that ties the other three together: a technology that only removes phosphorus solves half the problem, while one that recovers and revalorises it closes the loop that industry, ecosystems and society all depend on, and gives rePhlow a business case beyond a single environmental service."
 ],
 [
  "users",
  "Social impact",
  "Talking with schoolchildren and members of the public taught us that impact is not only technical. rePhlow’s social impact lies in improving public understanding of phosphorus, eutrophication and safe synthetic biology, replacing abstraction, and at times wariness of GMOs, with a clearer picture of what the technology does and why it matters. This matters commercially as much as socially: public trust is a precondition for any GMO-based industrial technology to be licensed, adopted and scaled, and we treated the outreach talks, the school workshop and the Museo Nacional de Ciencias Naturales talk as part of building that trust rather than as a separate activity."
 ],
 [
  "compass",
  "A derisked path to market",
  "The Responsibility Checkpoint we built (see Human Practices) is, from an entrepreneurship perspective, itself a positive impact. Anticipating containment failure, secondary pollution, affordability and equity concerns before they occur is what allows rePhlow to be presented to a potential industrial partner or investor with a credible risk register attached, rather than as an unexamined promise. A staged implementation route (lab validation, simulated wastewater, closed reactor, industrial pilot, revalorisation) means each claim we make is backed by evidence at the stage we have actually reached, which is precisely what de-risks early adoption for a first industrial partner."
 ]
] as const;

/** Negative impacts: [icon, title, text, response]. */
export const NEG = [
 [
  "microbe",
  "Biosafety and containment",
  "As Repsol raised, an industrial adopter needs robust evidence that environmental release has been prevented, both in normal operation and under foreseeable failure conditions, before a system involving living genetically modified organisms can be considered [11]. We responded with a double physical barrier (core-shell alginate-chitosan encapsulation plus reactor retention) backed by downstream ultrafiltration, and we have already developed methods to characterise that containment rather than assume it works.",
  "What is still missing is validation under prolonged operation and real industrial conditions, which is exactly what the industrial pilot stage of our implementation route exists to provide."
 ],
 [
  "bin",
  "A second pollution problem",
  "Moving phosphorus from wastewater into bacterial biomass does not, by itself, close the cycle: without recovery, rePhlow could simply replace one phosphorus-containing waste stream with another. This is why the revalorisation pathway, developed with Eduardo García Junceda’s and Israel Sánchez Moreno’s group at IQOG-CSIC, is central to the design rather than an add-on, and why we removed the original Y-filter once it became a redundant source of waste.",
  "A complete material and environmental balance for the process is the piece of evidence still ahead of us."
 ],
 [
  "thermo",
  "Climate performance at current capsule loading",
  "Our own life cycle assessment gives rePhlow a higher climate-change impact than the chemical route at the capsule performance we have today, and we are not going to list as an achievement something our own instruments contradict. The analysis identifies a single reversing variable, phosphorus captured per gram of capsule, and the threshold at which the result flips. Until we reach it, climate is a declared cost of this project rather than a contribution to it.",
  "It is also the risk with the clearest commercial consequence, since the same variable that governs the carbon balance governs capsule replacement cost and operating expenditure."
 ],
 [
  "euro",
  "Affordability",
  "Bio-Oils Huelva was clear that a mid-sized industrial facility cannot rebuild its infrastructure around an experimental technology. We answered this at the design stage, not only in principle, by building rePhlow as a set of modular, retrofit-compatible units that a facility can adopt in stages rather than all at once.",
  "A full techno-economic assessment is the next step needed to turn that design intention into a demonstrated cost advantage."
 ],
 [
  "users",
  "Who benefits first",
  "Choosing industrial wastewater as our first implementation scenario was a deliberate, safety-driven decision, not a default one: it let us work in a controlled, identifiable setting before considering any broader release. It is also worth stating plainly: these industries are not an arbitrary starting point chosen for convenience, they are themselves a significant source of the phosphorus pollution that drives eutrophication, which is exactly why intercepting it there has real environmental value from day one, not only a commercial one. Treating industry first is treating the problem at its source. That said, it does mean our first users are industrial facilities rather than the downstream communities who experience eutrophication directly, and we see that as an open question for how rePhlow scales, one we would rather name now than discover later.",
  "Our own mapping of possible destinations already points beyond this first scenario, towards water-treatment entities, environmental managers and circular economy actors, so that the benefit is not expected to stay confined to the industries where rePhlow starts, but to extend outward as the technology matures."
 ],
 [
  "scale",
  "Regulatory alignment",
  "Our visit to CEDEX connected rePhlow to a real and strengthening regulatory direction, Directive (EU) 2024/3019, but that Directive governs urban wastewater treatment, not industrial discharge directly. We have deliberately avoided overstating this connection: the exact obligations on a stream like Bio-Oils’ still need specialist legal verification, and we have kept that distinction visible rather than assumed it away.",
  ""
 ],
 [
  "ruler",
  "Overclaiming",
  "CEDEX also taught us that a preliminary laboratory method should never be presented as equivalent to an accredited one. In response, we built a project-wide standard, designed, built, tested, validated, that we apply to every claim rePhlow makes.",
  "This is less a risk we are exposed to and more a discipline we have already put in place to prevent it."
 ]
] as const;

/** Impact across two horizons: [intro, positive [short, long], negative [short, long]]. */
export const HOR = {
 "env": [
  "Phosphorus has no substitute in agriculture and comes almost entirely from finite phosphate rock, a Critical Raw Material forecast to peak around mid-century; discharging it drives the eutrophication that turns living water into dead zones.",
  [
   "Cleaner water returned; no hazardous metal sludge; phosphorus pulled from a waste stream.",
   "Phosphorus kept in the loop at scale, less mined rock and less eutrophication."
  ],
  [
   "Higher carbon footprint than chemical dosing at low yield (see Sustainability).",
   "Rebound risk: cheap recovery could normalise continued high phosphorus use instead of reducing it at source."
  ]
 ],
 "soc": [
  "Excess nutrients damage fisheries, drinking water and the communities that depend on them, and because there is no substitute for phosphorus in fertiliser, <strong>phosphorus security is food security</strong>: the 2008 phosphate-rock price spike fed straight into global food prices.",
  [
   "A visible demonstration that an industrial discharge can be cleaned and its nutrient recovered; a concrete object for public engagement.",
   "A local, renewable source of a critical import loosens dependence on a few foreign mines."
  ],
  [
   "Public unease about a GMO near water, if not met with honest explanation.",
   "Uneven access: a skill- and capital-intensive technology may reach well-resourced settings first."
  ]
 ],
 "eco": [
  "Today a phosphorus-laden effluent is a liability: operators pay for reagents to treat it and pay again to dispose of the sludge. rePhlow flips that accounting, avoiding roughly 24 kg of FeCl₃ and 13.7 kg of sludge per m³ while yielding ~1.95 kg of recovered phosphorus and ~1 m³ of reusable water.",
  [
   "Avoided reagent and sludge-management costs; a new product and reusable water on the balance sheet.",
   "A treatment plant becomes a resource-recovery facility; with a policy-created market, a cost centre becomes a revenue line."
  ],
  [
   "Higher capital cost and operator skill; recovered phosphorus must compete with cheaper mined mineral.",
   "Without a mandated blend or subsidy the economics may not close at today's prices."
  ]
 ]
} as const;

/** Product overview: the four integrated stages [title, text HTML]. */
export const STAGES = [
 [
  "1 · Surface enzymatic release",
  "A cocktail of phosphohydrolases immobilised on the capsule shell, selected to work at pH around 5 and 30 °C, dismantles phospholipids and phytate into free orthophosphate. The panel covers four complementary activities: type A and type C phospholipases, non-specific acid phosphatases and phytases [3–5]."
 ],
 [
  "2 · Biological accumulation",
  "An engineered <em>Pseudomonas putida</em> KT2440 chassis [6], being converted into a synthetic polyphosphate-accumulating organism through heterologous expression of polyphosphate kinase 1 (PPK1) and the high-affinity PstSCAB transporter, takes up that orthophosphate and stores it as intracellular polyphosphate [7]."
 ],
 [
  "3 · Physical containment",
  "Cells never contact the effluent. They sit inside core-shell alginate-chitosan capsules crosslinked with genipin [8,9], held in a rotating bed basket, behind a terminal ultrafiltration barrier."
 ],
 [
  "4 · Downstream valorisation",
  "The extracted polyphosphate drives ATP regeneration through the bifunctional polyphosphate kinase BcPPK2-III [10], coupled to a PROSS-stabilised [11] dihydroxyacetone kinase (DHAK) from <em>Citrobacter freundii</em> [12] to produce DHAP [13]."
 ]
] as const;
