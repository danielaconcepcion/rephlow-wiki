import type { RoomData } from "./Room";

/* Room 04 — the Notion page's own text, kept as written. */

const IMPACT_HEAD = [
  "",
  "**Short term (pilot)**",
  "**Long term (wide adoption)**",
];

export const ROOM_04: RoomData = {
  id: "r04",
  number: "04",
  tag: "Impact",
  title: "The impact amphitheatre",
  photo: "assets/sustainability/room04-amphitheatre.jpg",
  phlowi: "assets/sustainability/phlowi-4.png",
  quote: [
    "*“Step into the round room. The screens you just read are only worth something if they change a life outside this building. So let us turn numbers into consequences, and let me hand the microphone to some people who are not us.”*",
  ],
  question:
    "**Did the team address the potential long-term social, environmental and economic impacts of its work, in the context of the chosen SDGs?**",
  references: [
    "Cordell D, Drangert JO, White S. The story of phosphorus: Global food security and food for thought. Global Environmental Change [Internet]. 2009 Feb 17;19(2):292–305. Available from: [https://doi.org/10.1016/j.gloenvcha.2008.10.009](https://doi.org/10.1016/j.gloenvcha.2008.10.009)",
    "Conley DJ, Paerl HW, Howarth RW, Boesch DF, Seitzinger SP, Havens KE, et al. Controlling eutrophication: nitrogen and phosphorus. Science [Internet]. 2009 Feb 19;323(5917):1014–5. Available from: [https://doi.org/10.1126/science.1167755](https://doi.org/10.1126/science.1167755)",
    "Jupp AR, Beijer S, Narain GC, Schipper W, Slootweg JC. Phosphorus recovery and recycling – closing the loop. Chemical Society Reviews [Internet]. 2020 Nov 19;50(1):87–101. Available from: [https://doi.org/10.1039/d0cs01150a](https://doi.org/10.1039/d0cs01150a)",
    "Melgarejo J, Prats D, Molina A, Trapote A. A case study of urban wastewater reclamation in Spain: comparison of water quality produced by using alternative processes and related costs. Journal of Water Reuse and Desalination [Internet]. 2015 Jun 23;6(1):72–81. Available from: [https://doi.org/10.2166/wrd.2015.147](https://doi.org/10.2166/wrd.2015.147)",
    "U.S. Geological Survey. Mineral commodity summaries 2026: phosphate rock [Internet]. Reston (VA): USGS; 2026 [cited 2026 Oct 12]. Available from: [https://doi.org/10.3133/mcs2026](https://doi.org/10.3133/mcs2026)",
    "Rittmann BE, McCarty PL. Environmental biotechnology: principles and applications. New York: McGraw-Hill; 2001.",
    "Directive 2009/41/EC of the European Parliament and of the Council of 6 May 2009 on the contained use of genetically modified micro-organisms (recast). Off J Eur Union. 2009 May 21;L 125:75–97. Available from: [https://eur-lex.europa.eu/eli/dir/2009/41/oj](https://eur-lex.europa.eu/eli/dir/2009/41/oj)",
    "Zhao Q, Ying H, Liu Y, Wang H, Xu J, Wang W, et al. Towards low energy-carbon footprint: Current versus potential P recovery paths in domestic wastewater treatment plants. Journal of Environmental Management [Internet]. 2023 Jul 19;344:118653. Available from: [https://doi.org/10.1016/j.jenvman.2023.118653](https://doi.org/10.1016/j.jenvman.2023.118653)",
    "European Commission. A sustainable bioeconomy for Europe: strengthening the connection between economy, society and the environment — updated Bioeconomy Strategy. Brussels: European Commission; 2018.",
    "rePhlow – iGEM UCM. Del residuo al recurso: la economía circular del fósforo y el agua [round table on the Internet]. Madrid: Facultad de Ciencias Biológicas, Universidad Complutense de Madrid; 2026 Sep 24 [cited 2026 Oct 12]. Available from: [https://www.youtube.com/live/sFQMw0fIar0](https://www.youtube.com/live/sFQMw0fIar0)",
  ],
  body: [
    {
      k: "p",
      t: "A measured benefit is a promise; impact is the promise kept, in the world, across three arenas and two horizons at once. Below, each arena is read honestly: what rePhlow plausibly changes, and what it could cost, in the short term (a pilot at a single industrial partner) and the long term (wide adoption). The 2×2 is deliberate: a technology that only lists its upsides has not finished thinking.",
    },
    {
      k: "h",
      level: 5,
      id: "r04-environmental",
      t: "**Environmental impact**",
    },
    {
      k: "p",
      t: "Phosphorus has no substitute in agriculture and comes almost entirely from finite phosphate rock, a Critical Raw Material whose production is forecast to peak around mid-century; [1][8] discharging it is the principal driver of the eutrophication that turns living water into oxygen-poor dead zones. [2] rePhlow intervenes exactly where that element is most concentrated and most recoverable.",
    },
    {
      k: "table",
      head: IMPACT_HEAD,
      firstCol: true,
      rows: [
        [
          "**Positive (+)**",
          "Cleaner water returned to the environment; no hazardous metal sludge produced; phosphorus pulled from a waste stream instead of discharged. [14]",
          "Phosphorus kept in the loop at scale, less mined rock and less eutrophication; a measurable contribution to closing the nutrient cycle. [3][14]",
        ],
        [
          "**Negative (−)**",
          "Energy and materials for bead production give a higher carbon footprint than chemical dosing at low yield (Room 03).",
          "A rebound risk: cheap, easy recovery could normalise continued high phosphorus use instead of reducing it at source; grid and material impacts scale with deployment. [19]",
        ],
      ],
    },
    { k: "h", level: 5, id: "r04-social", t: "**Social impact**" },
    {
      k: "p",
      t: "Clean water and food are the stakes. Excess nutrients damage fisheries, drinking water and the communities that depend on them, [2] and because there is no substitute for phosphorus in fertiliser, **phosphorus security is food security**: the 2008 phosphate-rock price spike fed straight through into global food prices. [1]",
    },
    {
      k: "table",
      head: IMPACT_HEAD,
      firstCol: true,
      rows: [
        [
          "**Positive (+)**",
          "A local, visible demonstration that an industrial discharge can be cleaned and its nutrient recovered; a concrete object for public engagement and education.",
          "A local, renewable source of a critical import loosens dependence on a few foreign mines; stronger regional food and water resilience. [1][3]",
        ],
        [
          "**Negative (−)**",
          "Public unease about a genetically modified organism near water, if not met with honest explanation.",
          "Uneven access: a skill- and capital-intensive technology may reach well-resourced, well-regulated settings first, widening rather than closing a gap unless deliberately transferred.",
        ],
      ],
    },
    { k: "h", level: 5, id: "r04-economic", t: "**Economic impact**" },
    {
      k: "p",
      t: "Today a phosphorus-laden effluent is a liability: operators pay for reagents to treat it and pay again to dispose of the hazardous sludge. rePhlow flips that accounting, avoiding roughly 24 kg of FeCl₃ and 13.7 kg of sludge per m³ while yielding ~1.95 kg of recovered phosphorus and ~1 m³ of reusable water. [14]",
    },
    {
      k: "table",
      head: IMPACT_HEAD,
      firstCol: true,
      rows: [
        [
          "**Positive (+)**",
          "Avoided reagent and sludge-management costs; a new product (recovered phosphorus) and reusable water on the balance sheet.",
          "A treatment plant becomes a resource-recovery facility; with a policy-created market for recycled phosphorus, a cost centre becomes a revenue line. [3][14]",
        ],
        [
          "**Negative (−)**",
          "Higher capital cost and operator skill than chemical dosing; recovered phosphorus must compete with cheaper mined mineral phosphorus.",
          "Without a mandated blend or subsidy, the economics may not close at today's phosphate prices; cost could pass to the end user or the citizen.",
        ],
      ],
    },
    {
      k: "quote",
      lines: [
        "**Water, in a country running dry.** Spain and the Mediterranean arc face structural water scarcity, and treated wastewater is already one of the region's most important non-conventional resources. [5] Because rePhlow returns roughly a full cubic metre of ultrafiltered, salt-free water per cubic metre treated, it does not just clean water, it gives water back, where water is scarce and where our industrial partner operates.",
      ],
    },
    {
      k: "h",
      level: 4,
      id: "r04-round-table",
      t: "**The round table: four seats that rarely share a table**",
    },
    {
      k: "p",
      t: 'To pressure-test all of this we refused to be the only judges of our own work. On **24 September 2026**, at the Faculty of Biological Sciences of the UCM, we convened a public round table, *"From waste to resource: the circular economy of phosphorus and water"*, broadcast live. It was opened by **Domingo Marquina**, vice-dean of the faculty, and inaugurated by **Alejandro Javier Rescia**, adviser to the Vice-rector for Sustainability, and moderated by Diego. Four sectors took a seat, each opening one block and then debating freely.',
    },
    {
      k: "seats",
      seats: [
        {
          title:
            "**Seat 1 · Academia & research — Silvia Díaz del Toro (UCM)**",
          pending: "public/assets/sustainability/seat-1.png",
          body: [
            {
              k: "p",
              t: "**The question.** Conventional removal already works but makes metal sludge; why are bio-based systems the future, and what remains before real scale?",
            },
            {
              k: "p",
              t: "She refused to crown a single method: a problem this large needs every tool. Chemical precipitation with ferric chloride removes up to 90% of dissolved phosphorus but moves it into sludge. PAO bacteria offer a biological route, yet need imposed stress conditions to be efficient and struggle with the variable, sometimes toxic, composition of real industrial effluent, which is harder to grow in than urban wastewater. The hard part is not the Petri dish but the 5 to 10 litre reactor, and a strain optimised for one effluent does not transfer to another. She tried once to patent a modified strain and could not, precisely because performance in a controlled flask did not reproduce in an uncontrolled environment. She credited rePhlow's layered containment (immobilisation in alginate beads plus ultrafiltration) and pressed the point that each environmental problem needs its own specific answer.",
            },
            {
              k: "p",
              t: "**Key ideas.** Use every tool; PAO need stress and struggle with industrial effluent; lab success ≠ scale; containment in layers. / **Take-home message.** *Design for your specific effluent, and prove it at the reactor, not the flask.*",
            },
          ],
        },
        {
          title:
            "**Seat 2 · Industry & economy — Juan Manuel Ortiz (IMDEA Agua)**",
          portrait: "assets/sustainability/seat-2.png",
          body: [
            {
              k: "p",
              t: "**The question.** Is big industry willing to take an OPEX hit out of conviction, or does sustainability only exist when it pays immediately?",
            },
            {
              k: "p",
              t: 'Companies have little choice but to comply, and biotechnology matters because the EU wants outcomes, nutrient and energy recovery from waste, for which no conventional technology exists. He gave rePhlow concrete directions: swap alginate for polyacrylamide or a PHB/PHA bioplastic, or target **selenium**, a real problem in refining. He offered three field cases: **Mahou-San Miguel**, capturing phosphorus by electrocoagulation with aluminium reclaimed from its own can scrap; an **Iberdrola** reservoir using AI and biosensors to predict algal blooms before they foul the turbines; and **Canal de Isabel II** reusing drinking-water sludge to capture phosphorus downstream, and recovering **struvite** as a fertiliser. The deeper point, echoed by Elvira: a mandated blend, as with biodiesel in diesel, could create a market for recovered phosphorus and dissolve the "too expensive to do voluntarily" objection.',
            },
            {
              k: "p",
              t: "**Key ideas.** Compliance drives adoption; platform could target selenium / new supports; real circular cases exist; a legal mandate makes the market. / **Take-home message.** *Sustainability has to survive a balance sheet; regulation is what lets it.*",
            },
          ],
        },
        {
          title: "**Seat 3 · Policy & regulation — Roberto Arranz (CEDEX)**",
          portrait: "assets/sustainability/seat-3.png",
          body: [
            {
              k: "p",
              t: "**The question.** With 2027 close and technologies ready, will authorisation timelines and rigid rules let industry comply in time?",
            },
            {
              k: "p",
              t: 'CEDEX is the technical arm of the Ministry on water. The 2027 directive targets urban wastewater, and how it bites on a given plant depends on whether it discharges to the municipal network or directly to a watercourse. "Responsible declarations" now let the administration trust first and audit later. The elephant in the room is who pays: a provisional estimate puts secondary, tertiary and quaternary treatment above **€20 billion**, about €15 billion of it tertiary, against some of Europe\'s cheapest water tariffs, so the funding gap itself could cause missed deadlines. Better treatment, though, unlocks water reuse, already widespread indirectly, under Royal Decree 1085/2021, and he endorsed **regulatory sandboxes** to trial technologies that current law cannot yet frame.',
            },
            {
              k: "p",
              t: "**Key ideas.** Urban vs direct discharge changes the rules; responsible declarations speed permits; ~€20 bn cost vs cheap tariffs; sandboxes for unframed tech. / **Take-home message.** *The bottleneck may be funding and permitting, not the science; a sandbox is rePhlow's realistic route in.*",
            },
          ],
        },
        {
          title:
            "**Seat 4 · Society & NGOs — Elvira Mateos (EU Bioeconomy Ambassador)**",
          pending: "public/assets/sustainability/seat-4.png",
          body: [
            {
              k: "p",
              t: "**The question.** How do we reconcile the demand for immediate zero discharge with the public unease that synthetic biology provokes?",
            },
            {
              k: "p",
              t: "Through education. Her image stuck: maize is naturally purple and is yellow because we selected it, so a change made with a pipette is not different in kind. She placed rePhlow inside the **EU Bioeconomy Strategy**, [20] whose ambition is a geopolitically independent Europe by 2040 that reuses what it discharges, with biotechnology as a key enabler, and she highlighted **regulatory sandboxes** as the mechanism that lets an unframed technology be trialled and then approved on the evidence, exactly the setting in which rePhlow could show, over years, that its encapsulated organisms are not released. The Mar Menor, she noted, recently gained its own legal personality through citizen mobilisation: explain a solution step by step and people, who are not stupid, will understand it and defend it.",
            },
            {
              k: "p",
              t: "**Key ideas.** Education first; rePhlow fits the EU Bioeconomy Strategy 2040; sandboxes turn evidence into permission; citizens defend ecosystems they understand. / **Take-home message.** *Acceptance is earned by explanation; our no-release framing is the condition for impact.*",
            },
          ],
        },
      ],
    },
    {
      k: "figure",
      src: "assets/sustainability/roundtable-group.jpg",
      alt: "The four speakers and the team after the round table at the Faculty of Biological Sciences of the UCM",
      pending: "public/assets/sustainability/roundtable-group.jpg",
    },
    {
      k: "h",
      level: 4,
      id: "r04-closing",
      t: "**Closing reflection — the ethics of a contained organism**",
    },
    {
      k: "p",
      t: "**What it means to put a living thing to work on a problem we made.** Four rooms asked four questions, and read in sequence they are one question. Room 01 asked whether we had weighed what our work costs the goals it does not serve, and we answered by naming climate as a declared cost rather than hiding it. Room 02 asked whether we let other people change the project, and the honest answer was that the people who redrew rePhlow most, Bio-Oils, CEDEX, Repsol, a resident of a reservoir, were rarely the people we were most comfortable talking to. Room 03 asked whether we had measurably moved an SDG, and the instruments replied with a number and a distance still to cover. This room asks about the long-term consequences, and the round table answered in a voice that was not ours.",
    },
    {
      k: "p",
      t: "The ethical core of rePhlow is modest and specific. We are proposing to place a genetically modified organism into the path of water that returns to an ecosystem, in order to recover an element that civilisation cannot do without and is currently flushing to the sea. The benefit is real: phosphorus kept in the loop, nitrogen taken down with it, a hazardous sludge never made, water given back to a dry country. But every one of those benefits is a promise that holds only while the organism stays inside the reactor, which is why containment is not a feature we added to reassure a regulator; it is the precondition that makes the whole project permissible, and it is the reason the EU governs contained use of modified micro-organisms as a category of its own. [17] An industrial operator told us nothing else would be discussed until that evidence existed, and he was right to.",
    },
    {
      k: "p",
      t: "There is a deeper tension the round table named and we should not paper over. A technology that makes phosphorus recovery cheap and routine could, perversely, remove the pressure to use less of it at source, the rebound that haunts every efficiency gain; [19] and a tool this capital- and skill-intensive could reach the well-resourced first and widen the very gap SDGs 9 and 10 ask us to close. We do not have clean answers to either, and we think saying so is part of doing this responsibly. What we can do is be precise about what would have to be true for the benefit to outweigh the cost: beads that hold at least eight milligrams of phosphorus per gram, cells that demonstrably do not leave the vessel, a decarbonised bead material, and a regulation and a market, the sandbox and the mandated blend the panel described, that let a recovered nutrient compete with a mined one.",
    },
    {
      k: "p",
      t: "That is why we have been deliberately careful about what we claim. A screening LCA is not a certificate, structural capsule integrity is not biological retention, and a laboratory accumulation figure is not a plant running for a year. The role of a project like this in sustainability is not to arrive with a finished answer; it is to show that the honest version of the answer is close enough to be worth reaching, and to keep those conditions in view, alongside the four questions on the walls of these rooms. Do that, and rePhlow stops being a clever device and becomes what it was meant to be: a small, testable argument that a waste can be a resource, made by the people who will have to live with the result.",
    },
  ],
};
