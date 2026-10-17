/** The four seats of the round table, as the design's modal prints them. */
export interface Seat {
  seat: string;
  name: string;
  org: string;
  photo: string;
  body: { lead?: string; text: string; italic?: boolean }[];
}

export const SEATS: Seat[] = [
  {
    seat: "Seat 1 · Academia & research",
    name: "Silvia Díaz del Toro",
    org: "UCM",
    photo: "assets/sustainability/seat-1.png",
    body: [
      {
        lead: "The question.",
        text: "Conventional removal already works but makes metal sludge; why are bio-based systems the future, and what remains before real scale?",
      },
      {
        text: "She refused to crown a single method: a problem this large needs every tool. Chemical precipitation with ferric chloride removes up to 90% of dissolved phosphorus but moves it into sludge. PAO bacteria offer a biological route, yet need imposed stress conditions to be efficient and struggle with the variable, sometimes toxic, composition of real industrial effluent, which is harder to grow in than urban wastewater. The hard part is not the Petri dish but the 5 to 10 litre reactor, and a strain optimised for one effluent does not transfer to another. She tried once to patent a modified strain and could not, precisely because performance in a controlled flask did not reproduce in an uncontrolled environment. She credited rePhlow's layered containment (immobilisation in alginate beads plus ultrafiltration) and pressed the point that each environmental problem needs its own specific answer.",
      },
      {
        lead: "Key ideas.",
        text: "Use every tool; PAO need stress and struggle with industrial effluent; lab success ≠ scale; containment in layers.",
      },
      {
        lead: "Take-home message.",
        text: "Design for your specific effluent, and prove it at the reactor, not the flask.",
        italic: true,
      },
    ],
  },
  {
    seat: "Seat 2 · Industry & economy",
    name: "Juan Manuel Ortiz",
    org: "IMDEA Agua",
    photo: "assets/sustainability/seat-2.png",
    body: [
      {
        lead: "The question.",
        text: "Is big industry willing to take an OPEX hit out of conviction, or does sustainability only exist when it pays immediately?",
      },
      {
        text: "Companies have little choice but to comply, and biotechnology matters because the EU wants outcomes, nutrient and energy recovery from waste, for which no conventional technology exists. He gave rePhlow concrete directions: swap alginate for polyacrylamide or a PHB/PHA bioplastic, or target selenium, a real problem in refining. He offered three field cases: Mahou-San Miguel, capturing phosphorus by electrocoagulation with aluminium reclaimed from its own can scrap; an Iberdrola reservoir using AI and biosensors to predict algal blooms before they foul the turbines; and Canal de Isabel II reusing drinking-water sludge to capture phosphorus downstream, and recovering struvite as a fertiliser. The deeper point, echoed by Elvira: a mandated blend, as with biodiesel in diesel, could create a market for recovered phosphorus and dissolve the “too expensive to do voluntarily” objection.",
      },
      {
        lead: "Key ideas.",
        text: "Compliance drives adoption; platform could target selenium / new supports; real circular cases exist; a legal mandate makes the market.",
      },
      {
        lead: "Take-home message.",
        text: "Sustainability has to survive a balance sheet; regulation is what lets it.",
        italic: true,
      },
    ],
  },
  {
    seat: "Seat 3 · Policy & regulation",
    name: "Roberto Arranz",
    org: "CEDEX",
    photo: "assets/sustainability/seat-3.png",
    body: [
      {
        lead: "The question.",
        text: "With 2027 close and technologies ready, will authorisation timelines and rigid rules let industry comply in time?",
      },
      {
        text: "CEDEX is the technical arm of the Ministry on water. The 2027 directive targets urban wastewater, and how it bites on a given plant depends on whether it discharges to the municipal network or directly to a watercourse. “Responsible declarations” now let the administration trust first and audit later. The elephant in the room is who pays: a provisional estimate puts secondary, tertiary and quaternary treatment above €20 billion, about €15 billion of it tertiary, against some of Europe's cheapest water tariffs, so the funding gap itself could cause missed deadlines. Better treatment, though, unlocks water reuse, already widespread indirectly, under Royal Decree 1085/2021, and he endorsed regulatory sandboxes to trial technologies that current law cannot yet frame.",
      },
      {
        lead: "Key ideas.",
        text: "Urban vs direct discharge changes the rules; responsible declarations speed permits; ~€20 bn cost vs cheap tariffs; sandboxes for unframed tech.",
      },
      {
        lead: "Take-home message.",
        text: "The bottleneck may be funding and permitting, not the science; a sandbox is rePhlow's realistic route in.",
        italic: true,
      },
    ],
  },
  {
    seat: "Seat 4 · Society & NGOs",
    name: "Elvira Mateos",
    org: "EU Bioeconomy Ambassador",
    photo: "assets/sustainability/seat-4.png",
    body: [
      {
        lead: "The question.",
        text: "How do we reconcile the demand for immediate zero discharge with the public unease that synthetic biology provokes?",
      },
      {
        text: "Through education. Her image stuck: maize is naturally purple and is yellow because we selected it, so a change made with a pipette is not different in kind. She placed rePhlow inside the EU Bioeconomy Strategy, whose ambition is a geopolitically independent Europe by 2040 that reuses what it discharges, with biotechnology as a key enabler, and she highlighted regulatory sandboxes as the mechanism that lets an unframed technology be trialled and then approved on the evidence, exactly the setting in which rePhlow could show, over years, that its encapsulated organisms are not released. The Mar Menor, she noted, recently gained its own legal personality through citizen mobilisation: explain a solution step by step and people, who are not stupid, will understand it and defend it.",
      },
      {
        lead: "Key ideas.",
        text: "Education first; rePhlow fits the EU Bioeconomy Strategy 2040; sandboxes turn evidence into permission; citizens defend ecosystems they understand.",
      },
      {
        lead: "Take-home message.",
        text: "Acceptance is earned by explanation; our no-release framing is the condition for impact.",
        italic: true,
      },
    ],
  },
];
