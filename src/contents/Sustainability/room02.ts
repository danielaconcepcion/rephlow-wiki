import type { RoomData } from "./Room";

/* Room 02 — the Notion page's own text, kept as written. */

export const ROOM_02: RoomData = {
  id: "r02",
  number: "02",
  tag: "Operation",
  title: "The operations core",
  photo: "assets/sustainability/room02-operations.jpg",
  phlowi: "assets/sustainability/phlowi-2.png",
  quote: [
    "*“The goals are on the wall in the lobby. This room is where we show you who put them there. Every change on this map came from someone outside the lab — follow the pipes to the control panel when you are done.”*",
  ],
  question:
    "**Did the team incorporate feedback from relevant Sustainable Development Goals (SDG) stakeholders into their work?**",
  references: [
    "iGEM Team Hangzhou-BioX. Sustainable development [Internet]. Boston (MA): iGEM Foundation; 2024 [cited 2026 Oct 12]. Available from: [https://2024.igem.wiki/hangzhou-biox/sustainable](https://2024.igem.wiki/hangzhou-biox/sustainable)",
    "Directive (EU) 2023/2413 of the European Parliament and of the Council of 18 October 2023 amending Directive (EU) 2018/2001, Regulation (EU) 2018/1999 and Directive 98/70/EC as regards the promotion of energy from renewable sources, and repealing Council Directive (EU) 2015/652. Off J Eur Union. 2023 Oct 31;L 2023/2413. Available from: [https://eur-lex.europa.eu/eli/dir/2023/2413/oj](https://eur-lex.europa.eu/eli/dir/2023/2413/oj)",
    "Directive (EU) 2024/3019 of the European Parliament and of the Council of 27 November 2024 concerning urban wastewater treatment (recast). Off J Eur Union. 2024 Dec 12;L 2024/3019. Available from: [https://eur-lex.europa.eu/eli/dir/2024/3019/oj/eng](https://eur-lex.europa.eu/eli/dir/2024/3019/oj/eng)",
  ],
  body: [
    {
      k: "h",
      level: 3,
      id: "r02-canvas",
      t: "The blueprint on the wall — Our Sustainability Model Canvas (SMC)",
    },
    {
      k: "p",
      t: "The key to understanding who helped shape crucial changes in rePhlow is seeing the map they changed it on. Our sustainability Model Canvas, built on the format developed by [iGEM Team Hangzhou Bio-X (2024)](https://2024.igem.wiki/hangzhou-biox/sustainable) [1], sets the stages of the rePhlow route against the goals each stage touches and the people who hold a stake in it. The left side of the SMC shows where our decisions land on the SDGs; the right side shows who was in the room when those decisions were made.",
    },
    {
      k: "figure",
      src: "assets/sustainability/smc-canvas.png",
      alt: "The rePhlow Sustainability Model Canvas",
      pending: "public/assets/sustainability/smc-canvas.png",
    },
    {
      k: "quote",
      lines: [
        "Sustainability Model Canvas: the stages of the rePhlow route (left panel), the SDG targets each stage acts on, and the stakeholder groups involved at each stage, grouped by economic sector and ordered by their degree of participation (right panel).",
        "Participation here refers to involvement in the system itself, not the extent of our engagement with each group: who we spoke to is documented separately in [Human Practices](/human-practices).",
        "**The canvas maps the route as designed, not as demonstrated.** Regulation-compliant discharge is the target the process is the reference that guides the engineering and design; the polishing stage that would deliver it has not yet been validated, and [Room 03](#r03) reports those water figures as projections. A single group can hold several roles at once: Bio-Oils is simultaneously an effluent producer, a potential end user and a source of design constraints.",
        "Format adapted from iGEM Hangzhou-BioX (2024), [1] whose canvas maps an entire industry; ours maps a single route through the phosphorus cycle, in which rePhlow is one node rather than the system itself.",
      ],
    },
    {
      k: "h",
      level: 4,
      id: "r02-stakeholder",
      t: "An honest word about what “SDG stakeholder” means to our analysis",
    },
    {
      k: "p",
      t: "Throughout the development of our project, we documented twenty-two conversations with frontline perspectives relevant to our objectives and goals. Seven of them changed how rePhlow works against a specific goal, which are detailed below. The rest are recorded in full in [Human Practices](/human-practices).",
    },
    {
      k: "p",
      t: "When interviews took place, we did not walk into them holding a list of goals, we walked in holding technical problems: which chassis, which discharge limit, which containment barriers. We focused on the goals after our conversations, reading the feedback we received against the targets we selected. We realised that almost every conversation had one of the SDGs present.",
    },
    { k: "h", level: 5, t: "What each voice changed" },
    {
      k: "table",
      head: [
        "**Stakeholder**",
        "**SDG it speaks to**",
        "**What only they could tell us about it**",
        "**What changed in rePhlow**",
      ],
      firstCol: true,
      rows: [
        [
          "Bio-Oils Huelva (*industry, Mar 2025*)",
          "12.2, 12.5",
          "They provided a real degumming effluent, including its phosphorus percentage, pH and temperature. /  / They told us that a mid-sized producer cannot rebuild a treatment line around an experiment.",
          "The data provided became basis to generate synthetic wastewater for crucial experiments. /  / Phosphorus removal became recovery; the design became modular and compatible.",
        ],
        [
          "CEDEX (*public water body, Oct 2025*)",
          "6.3",
          "Our colorimetric assay is a first approximation, not a reference method. /  / Technologies being produced get compared against established treatment legislation.",
          "We stopped presenting the assay as finished. /  / We started designing against actual EU discharge limits rather than just deeming our process ‘clean enough’",
        ],
        [
          "Repsol (*large operator, Oct 2025*)",
          "12.4",
          "Living engineered organisms are not acceptable without convincing evidence that release has been prevented.",
          "Bacterial containment became a precondition to our design.",
        ],
        [
          "Eduardo García Junceda *(IQOG-CSIC, Sep 2025)*",
          "12.5, 12.2",
          "That our endpoint was wrong: the enzyme recycles ATP, so accumulation was never the destination — and polyphosphate is by far the cheapest phosphate donor available for regenerating it.",
          "The waste stream and the energy source became the same thing. We adopted a coupled PPK2/DHAK system that turns stored polyphosphate into DHAP, and rePhlow stopped depending on a single product.",
        ],
        [
          "Inmaculada Alonso (*resident, San Juan Reservoir, Jul 2025*)",
          "6.b",
          "She had watched the water change for decades and had never been told why.",
          "Communication became a central focus to our mission. /  / We visited the reservoir to measure, with samples, what she had described.",
        ],
        [
          "Schools, workshop and museum audiences",
          "6.b",
          "The question we heard more frequently was the safety of the technology and who it benefits, rather than its effectiveness.",
          "We developed a no-release framing and educational materials, built from the questions people actually asked.",
        ],
        [
          "Carmen García Payo, Loreto García Fernández and Álvaro Ferrero (*academic advisors, Jun 2025 and Mar 2026)*",
          "12.5",
          "With the basket reactor adopted, our Y-filter had become redundant, and testing ultrafiltration was not feasible at the pressures available to us. We had to approach the stage theoretically rather than claim it as evidence.",
          "We removed the filter instead of keeping a component we could not justify. This removed its materials, sludge, and end-of-life problem. /  / The membrane polishing was reclassified as a scale-up concept rather than a demonstrated result; in room 03, water quality is now labelled as projections.",
        ],
      ],
    },
    {
      k: "p",
      t: "Human Practices records what each conversation was. This room records what each conversation knew that we could not have found anywhere else.",
    },
    { k: "p", t: "**The voice we do not have**" },
    {
      k: "p",
      t: "Every stakeholder above speaks to goal 6 or goal 12. None speaks to target 14.1, and that is the honest position: the party most affected by nutrient pollution in coastal and inland waters cannot be interviewed, and we have not yet spoken to an organisation that represents it. Our evidence for that target is our own field sampling, not a consulted voice.",
    },
    { k: "h", level: 4, id: "r02-loops", t: "Closing the loops" },
    {
      k: "p",
      t: "Everything above this point is a conversation that changed rePhlow. This section runs the other way. Near the end of the project, we went back to people who had already shaped it. We carried the revised work rather than the original question, asking whether what we had changed was what they meant. A loop is closed when the revised design has gone back to the person whose input started it. These are the ones we were able to close.",
    },
    { k: "h", level: 4, id: "r02-cedex", t: "CEDEX — Roberto Arranz Arranz" },
    { k: "p", t: "**Roberto Arranz Arranz, Programme Director, CEDEX**" },
    { k: "p", t: "Date: 6 October 2026" },
    {
      k: "list",
      items: [
        "**Question:** Having read what we changed after CEDEX, where is this sustainability case still weak?",
        "**Challenge raised:** Our account rests on three pillars — technical, economic, environmental — and treats the fourth, the social one, as communication rather than as a design constraint.",
        "**Response:** We adopted the four-pillar frame, named our likely points of conflict, and opened repairability and capsule service life as engineering questions rather than operational details.",
      ],
    },
    {
      k: "p",
      t: "**Why we went back.** In October 2025, CEDEX told us two things we had not wanted to hear: that our phosphorus assay was not a reference method, and that rePhlow was being designed against a generic idea of clean water rather than a legal limit. We changed both. Nearly a year later we sent the revised sustainability text to Roberto Arranz, Programme Director at CEDEX, and met him to go back over what that first conversation had produced. The meeting existed to check our own work, not to present it. This is the only engagement in this room where the revised version went back to the institution whose input produced it, and we note the limit of that: the loop closes at CEDEX rather than with the individual colleagues who opened it.",
    },
    {
      k: "p",
      t: "**The pillar we had written as an afterthought.** Roberto set out sustainability as four pillars — technical, economic, environmental and social. We had written three. Our social evidence amounted to one conversation with a reservoir resident, and we had treated acceptance as something that follows a working technology rather than something that constrains its design.",
    },
    {
      k: "p",
      t: "His argument was that a process fails socially in specific, predictable ways, and that a team can name them in advance instead of discovering them on site. For rePhlow he named three: rejection of a bacterial process as such, the complexity of the mechanism compared with dosing a chemical, and the ordinary nuisances of a treatment plant — odour, sludge handling — that decide whether neighbours accept a facility regardless of what it removes.",
    },
    {
      k: "p",
      t: "The point he marked as most important was repairability, at the level of both the operator and the plant manager. Our hardware work had asked whether the reactor runs. It had not asked who repairs it, with what training, and how long the line is down meanwhile. Iron(III) chloride dosing fails in ways any plant operator already knows how to fix. A contained biological module does not, and that asymmetry belongs with the access tension we describe in Room 01 rather than apart from it.",
    },
    {
      k: "p",
      t: "He also asked a question our own documentation cannot answer: how long do the alginate capsules hold up under operation? We report structural integrity under reactor conditions (see Hardware), but not service life. Until we can state it, we cannot state a replacement rate, and without a replacement rate our life cycle assessment rests on an assumption rather than a measurement — which matters, because bead production dominates our carbon footprint (Room 03).",
    },
    {
      k: "p",
      t: "**Where he saw the opening.** On the economic pillar, Roberto described how the market for biodiesel exists because petrol is required to contain a proportion of it: the demand is created by the blending obligation, not by each producer separately. The mechanism is set out in the Renewable Energy Directive, which requires Member States to reach either a 29% renewable share in transport energy or a 14.5% reduction in transport greenhouse-gas intensity by 2030, with a binding sub-target of 5.5% for advanced biofuels and renewable fuels of non-biological origin. [2] Applied to phosphorus, if mineral fertiliser were required to contain a fraction of nutrient recovered from wastewater, the demand would follow — and it would be demand for a pure product, which is precisely what distinguishes biological recovery from iron-bound chemical sludge. He contrasted this with the current practice of returning chemical sludge to agriculture, which he thought deserved more scrutiny than it gets.",
    },
    {
      k: "p",
      t: "We had treated recovery as a technical result. He described the condition under which it becomes a market, which is the condition under which it reaches scale. This is not a hypothetical instrument: Directive (EU) 2024/3019 empowers the Commission to set a minimum combined reuse and recycling rate for phosphorus from sludge and urban wastewater, and asks Member States to encourage the purchase of recovered nutrients. [3] Roberto reached the mechanism from the market side; the Directive reaches it from the regulatory side. That convergence is the strongest evidence we have that target 12.2 has a route and not only an aspiration.",
    },
    {
      k: "p",
      t: "**One correction to our regulatory reading.** Roberto pointed out that the urban wastewater framework governs urban discharges, not industrial ones, and that what determines the requirement for an industrial discharge is concentration and flow — with very high or very low flow treated as distinct cases. Where effluent goes directly to a watercourse, a concentration and quality study is carried out. We have gone back to Room 01 to check that our claim about regulatory pressure reaching industrial dischargers is stated with that precision.",
    },
    {
      k: "p",
      t: "He also asked us to run the life cycle assessment under a renewable energy scenario. That analysis belongs to Room 03, where our climate result currently stands against us, and it is recorded there.",
    },
    {
      k: "p",
      t: "**What changes now.** We went to Roberto for an audit, not for a design input, and an audit changes what you are entitled to say rather than what you have already built. It did that. A sustainability case resting on three pillars is no longer one we present as complete. Repairability and capsule service life have moved from things we had not thought to ask about to named engineering questions with a place in our roadmap. The social pillar has a set of specific conflicts to design against instead of a single interview. / The design itself has not moved, and it should not have on this timescale: a claim can be withdrawn in an afternoon, a reactor cannot. What we can show is that the last external reading of this work made it narrower rather than louder.",
    },
    { k: "h", level: 4, id: "r02-open", t: "What stays open" },
    {
      k: "p",
      t: "Closing one loop was enough to show us what the others would have found. We went back to CEDEX expecting methods and limits, the subjects of the first conversation, and were asked instead about repair: who fixes the module, with what training, and how long the line is down. That question did not expose a gap in our engineering. It exposed a gap in who we had spoken to.",
    },
    {
      k: "p",
      t: "Everyone who redrew this project evaluates technology for a living: a public water body, two large operators, three academics. Not one of them would have to run the reactor at three in the morning. The pattern is not random — it runs along the line of who we found easy to approach. A student team writes to an institution more readily than to a plant operator on shift, and our evidence base shows it.",
    },
    {
      k: "p",
      t: "That has a cost we can state precisely. Without an operator we cannot claim anything about maintenance burden or downtime. Without a permitting authority for an industrial discharge we cannot claim a route to authorisation, only that the limits exist. Without a farmer or a fertiliser buyer we cannot claim that recovered phosphorus is wanted in the form we produce it, which is the assumption our entire 12.2 argument rests on. Those are three claims this project does not get to make yet, and we have left them out rather than soften them.",
    },
    {
      k: "p",
      t: "The next three conversations are therefore already determined, and not by us: a plant operator, a permitting authority for an industrial discharge, and a fertiliser user. Each one licenses a claim we are currently not entitled to make. Closing those loops is what the round table in Room 03 was convened to begin, and we would rather publish the list of claims we have not earned than a page where every voice happened to agree with us.",
    },
    {
      k: "p",
      t: "**Where the full record lives.** The traceable record of concerns raised and limitations still open is in the Responsibility Checkpoint.",
    },
    {
      k: "h",
      level: 3,
      id: "r02-next",
      t: "What has to be true next",
    },
    {
      k: "p",
      t: "The closing reflection names four conditions under which rePhlow's benefit would outweigh its cost. This section makes that list operational. Nothing here is new ambition: every item is a question already raised on this page, by an instrument or by a person, and left open on purpose. They are grouped by what they would settle, and several of them chain — the bench items feed the evidence items, and the evidence items are what the people items would judge.",
    },
    { k: "h", level: 4, t: "At the bench" },
    {
      k: "p",
      t: "**Reach and hold ≥8 mg P per gram of bead under reactor conditions.** This is the single number our sensitivity analysis identifies as the lever (Room 03). Below it, the climate reading stands against us and we do not claim goal 13. Above it, the climate and fossil-resource readings follow the rest of the sixteen downward. The biology already does this intracellularly; the work is in the expression and the bead.",
    },
    {
      k: "p",
      t: "**Decarbonise the bead itself.** The same result can be reached from the materials side rather than the performance side. The bacterial-alginate route is named in Room 03 as a research direction not yet in our inventory, and it is the second of the two moves the circular-economy literature identifies as the condition for nutrient recovery to be a net environmental good rather than a tidier waste.",
    },
    {
      k: "p",
      t: "**Measure capsule service life under operation.** Raised by CEDEX. We report structural integrity under reactor conditions; we do not report how long that holds. Without a service life there is no replacement rate, and without a replacement rate the bead-production term that dominates our footprint is an assumption rather than a measurement. This is the item most other items depend on.",
    },
    {
      k: "p",
      t: "**Count viable cells in the effluent over operating time.** Structural integrity is not biological retention: an intact capsule can still release cells at its surface. Every environmental benefit claimed anywhere on this page is conditional on this measurement, and it is the one an industrial operator told us would be discussed before anything else.",
    },
    {
      k: "p",
      t: "**Validate membrane polishing at achievable pressures.** Reclassified as a scale-up concept rather than a demonstrated result, which is why the water-quality figures in Room 03 are labelled as projections. Until this is tested, the discharge-limit claim is a design target and not a result.",
    },
    { k: "h", level: 4, t: "On the evidence" },
    {
      k: "p",
      t: "**Re-run the life cycle assessment under a renewable energy scenario.** Requested by Roberto Arranz. A decarbonising grid does not improve process efficiency, which is what target 7.3 actually measures, but it does change the climate reading — and we should know by how much before we describe the energy interaction as fixed.",
    },
    {
      k: "p",
      t: "**Treat repairability as a design variable.** Newly opened. Who repairs the module, with what training, and how long the line is down. Chemical dosing fails in ways every plant operator already knows how to fix; a contained biological module does not, and that asymmetry is part of the access tension rather than separate from it.",
    },
    { k: "h", level: 4, t: "With people" },
    {
      k: "p",
      t: "**A plant operator, a permitting authority, and a fertiliser user.** The three voices absent from this room, each of which licenses a claim we currently cannot make: maintenance burden, route to authorisation, and whether recovered phosphorus is wanted in the form we produce it.",
    },
    {
      k: "p",
      t: "**A regulatory sandbox.** Two seats at our round table, from opposite ends of it, independently named the same mechanism: a sandbox is how a technology that current law cannot yet frame gets trialled and then approved on the evidence. For a contained organism that must demonstrate non-release over years rather than weeks, it is not one route among several — it is the route. Identifying the programme to apply to is a concrete next step rather than a hope.",
    },
    {
      k: "p",
      t: "**A mandated recycled-phosphorus content.** Directive (EU) 2024/3019 [2] empowers the Commission to set a minimum combined reuse and recycling rate for phosphorus and asks Member States to encourage the purchase of recovered nutrients. Whether that rate is set, and at what level, decides whether recovered phosphorus competes with mined phosphorus on price alone. We cannot act on this one; we can state that our 12.2 argument is exposed to it.",
    },
    { k: "h", level: 4, t: "What we are not claiming" },
    {
      k: "p",
      t: "A screening LCA is not a certificate. Structural capsule integrity is not biological retention. A laboratory accumulation figure is not a plant running for a year. Everything above is the distance between those pairs, written down so that the distance can be checked rather than assumed.",
    },
  ],
};
