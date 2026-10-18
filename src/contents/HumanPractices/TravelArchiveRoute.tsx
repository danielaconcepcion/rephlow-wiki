import { useEffect, useRef, useState } from "react";
import { asset } from "../../utils/asset";
import { AccordionSection } from "./AccordionSection";
import { PassportGlyph } from "./HeroObjects";
import travelMap from "../../assets/human-practices/travel-archive-index/map.webp";
import bioOilsLayer from "../../assets/human-practices/travel-archive-index/bio-oils.webp";
import donanaLayer from "../../assets/human-practices/travel-archive-index/donana.webp";
import marMenorLayer from "../../assets/human-practices/travel-archive-index/mar-menor.webp";
import sanJuanLayer from "../../assets/human-practices/travel-archive-index/embalse-san-juan.webp";
import cedexLayer from "../../assets/human-practices/travel-archive-index/cedex.webp";
import repsolLayer from "../../assets/human-practices/travel-archive-index/repsol.webp";
import beehivesLayer from "../../assets/human-practices/travel-archive-index/beehives.webp";
import "./TravelArchiveRoute.css";

/**
 * Section 3 — "Travel Archive". Content transcribed from the Notion page
 * "3. Travel Archive" and rePhlow_Travel_Archive_v2.html. Identity: a
 * passport/field-journal — a dark-green hero framing a tilted passport
 * card, stamped dates, numbered timeline stops with field-journal
 * disclosures, pull quotes and a route-progress bar — kept literally,
 * ported directly from the prototype rather than genericised. The
 * prototype's own sticky topbar (brand/progress/button) is dropped per the
 * approved brief; route navigation is provided by the responsive visual
 * map index, entirely separate from the shared PageSectionNav rendered by
 * HumanPractices.tsx.
 *
 * Photos: real Notion-attached photos exist for Embalse de San Juan, CEDEX
 * and Beehives (one each); every other photo slot — including the second,
 * "small" slot next to each of those three real photos — has no attached
 * file in the source, so it renders a deliberate, captioned placeholder
 * rather than a fabricated image.
 */

type Photo =
  | {
      kind: "real";
      src: string;
      alt: string;
      /** Visible caption. Defaults to `alt` when omitted; pass `null` to
       * show no caption at all (the `alt` text still describes the image
       * for accessibility either way). */
      caption?: string | null;
    }
  | { kind: "placeholder"; caption: string };

type Block =
  | { type: "p"; text: string }
  | { type: "judgeScan"; items: { label: string; text: string }[] }
  | { type: "details"; title: string; paragraphs: string[] }
  | { type: "pullquote"; text: string }
  | { type: "evidenceRow"; items: { label: string; text: string }[] }
  | { type: "evidence"; label: string; text: string }
  | { type: "crosslink"; text: string; target?: string }
  | { type: "questionChain"; items: { label: string; text: string }[] };

interface Stop {
  id: string;
  /** A stop still ahead of us: drawn with a dashed marker and card, and
   * placed after the end-of-route card (see PLANNED_STOP). */
  planned?: boolean;
  number: string;
  title: string;
  date: string;
  dateConfirmed: boolean;
  dateNote?: string;
  photos: Photo[];
  blocks: Block[];
}

const STOPS: Stop[] = [
  {
    id: "bio-oils-donana",
    number: "01",
    title: "Bio-Oils Huelva & Doñana",
    date: "March 2025",
    dateConfirmed: true,
    photos: [
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/bio-oils-01.webp"),
        alt: "A storage tank carrying the Bio-Oils name at the Huelva plant.",
        caption: "Bio-Oils Huelva",
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/bio-oils-02.webp"),
        alt: "Process tanks and walkways at the Bio-Oils Huelva facility.",
        caption: null,
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/donana-01.webp"),
        alt: "A boardwalk crossing the pine woodland of the Doñana Natural Space.",
        caption: "Doñana Natural Space",
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/donana-02.webp"),
        alt: "The channels of the Doñana marshes seen from the air.",
        caption: null,
      },
    ],
    blocks: [
      {
        type: "p",
        text: "Our route began where the phosphorus problem became real for rePhlow: Bio-Oils Huelva. Visiting an industrial setting gave the numbers we had been working with a physical context and made one constraint immediately tangible: rePhlow would have to coexist with an existing process, not an idealised laboratory setup.",
      },
      {
        type: "judgeScan",
        items: [
          {
            label: "What we saw",
            text: "A real industrial process and the infrastructure a treatment module would have to fit around.",
          },
          {
            label: "Why it mattered",
            text: "Phosphorus stopped being an abstract wastewater parameter and became an operating problem.",
          },
          {
            label: "What it opened",
            text: "Follow the wider water system and understand the environmental context downstream.",
          },
        ],
      },
      {
        type: "details",
        title: "Read the field context",
        paragraphs: [
          "Until then, wastewater had largely existed for us as concentrations, diagrams and literature values. Pipes, treatment stages, operating equipment and the scale of a working facility made clear that any solution we designed would eventually have to coexist with an existing process rather than with the controlled simplicity of a laboratory bench.",
          "From Bio-Oils, we followed the wider water system surrounding Huelva towards the wetlands and estuarine environments close to the Doñana Natural Space, one of Europe's most important wetland ecosystems, a UNESCO World Heritage Site and a critical stopover for migratory birds travelling between Europe and Africa.",
          "Its marshes, lagoons and estuarine systems depend on a delicate water balance and exist within a region exposed to multiple pressures from agriculture, water abstraction and human activity. Moving physically from an industrial setting towards such an ecologically sensitive landscape changed the scale at which we were thinking about wastewater.",
        ],
      },
      {
        type: "pullquote",
        text: "A discharge is not simply something that leaves a pipe: after treatment, water returns to a much larger environmental system.",
      },
      {
        type: "details",
        title: "Evidence boundary — what we are not claiming",
        paragraphs: [
          "We do not use this visit as evidence that a particular industrial discharge reaches Doñana or causes a specific ecological effect. Instead, the stop helped us understand the environmental sensitivity of the wider regional context in which industrial and agricultural water management takes place.",
        ],
      },
      {
        type: "crosslink",
        text: "Related voice: process information and operating conditions shared with us.",
        target: "bio-oils",
      },
    ],
  },
  {
    id: "mar-menor",
    number: "02",
    title: "Mar Menor",
    date: "Date to confirm",
    dateConfirmed: false,
    dateNote: "Not documented in the current record",
    photos: [],
    blocks: [
      {
        type: "p",
        text: "If Doñana showed us the sensitivity of the ecosystems downstream of human activity, the Mar Menor confronted us with what prolonged nutrient imbalance can eventually look like.",
      },
      {
        type: "details",
        title: "Why this stop was personal to the team",
        paragraphs: [
          "This stop was different from the others for us. Several team members have family and friends living around the lagoon, so what we were investigating was not an abstract case study but a place we already knew, now associated with one of the most visible eutrophication crises in recent Spanish history.",
          "The images of green water, oxygen depletion and mass mortality of aquatic organisms transformed concepts we had repeatedly read in papers into something much harder to distance ourselves from.",
        ],
      },
      {
        type: "pullquote",
        text: "How can phosphorus, an element essential for life, become capable of contributing to the collapse of an aquatic ecosystem when it accumulates in the wrong place?",
      },
      {
        type: "details",
        title: "How this changed the way we framed rePhlow",
        paragraphs: [
          "That question became increasingly important as rePhlow evolved. Preventing phosphorus from entering receiving waters was necessary, but simply moving it into another waste stream would not resolve the deeper imbalance. If phosphorus was valuable enough for ecosystems to depend on it, perhaps the responsible endpoint was not disposal, but recovery.",
        ],
      },
      {
        type: "evidenceRow",
        items: [
          {
            label: "Observed meaning",
            text: "Nutrient imbalance becomes visible ecological damage.",
          },
          {
            label: "Design implication",
            text: "Removal alone is not the end of the phosphorus story.",
          },
          {
            label: "Question opened",
            text: "Can recovery become part of environmental responsibility?",
          },
        ],
      },
    ],
  },
  {
    id: "san-juan",
    number: "03",
    title: "Embalse de San Juan",
    date: "25 July 2025",
    dateConfirmed: true,
    photos: [
      {
        kind: "real",
        src: asset(
          "assets/human-practices/travel-archive/embalse-san-juan-01.webp",
        ),
        alt: "María collecting a water sample.",
      },
      {
        kind: "real",
        src: asset(
          "assets/human-practices/travel-archive/embalse-san-juan-02.webp",
        ),
        alt: "Cloudy, algae-tinted water near the reservoir's shore.",
        caption: null,
      },
      {
        kind: "real",
        src: asset(
          "assets/human-practices/travel-archive/embalse-san-juan-03.webp",
        ),
        alt: "The Embalse de San Juan reservoir",
      },
      {
        kind: "real",
        src: asset(
          "assets/human-practices/travel-archive/embalse-san-juan-04.webp",
        ),
        alt: "The reservoir's shoreline, with moored boats and exposed rock at a low water level.",
        caption: null,
      },
    ],
    blocks: [
      {
        type: "p",
        text: "Closer to home, our environmental route continued at the Embalse de San Juan, a reservoir near Madrid that many families use for swimming and recreation.",
      },
      {
        type: "p",
        text: "Here, eutrophication was no longer something associated only with internationally recognised environmental crises. During the visit, we observed cloudy water and visible signs consistent with algal proliferation. Rather than relying on visual impressions alone, we collected water samples from the reservoir for subsequent characterisation.",
      },
      {
        type: "evidenceRow",
        items: [
          { label: "Data placeholder", text: "pH results" },
          { label: "Data placeholder", text: "Dissolved oxygen results" },
          {
            label: "Data placeholder",
            text: "Phosphorus concentration results",
          },
        ],
      },
      {
        type: "pullquote",
        text: "The visit marked an important change in how we approached environmental Human Practices: from seeing the problem to beginning to measure it.",
      },
      {
        type: "details",
        title: "What the samples can — and cannot — tell us",
        paragraphs: [
          "The samples were intended to allow us to investigate parameters including pH, dissolved oxygen and phosphorus concentration, while recognising that a limited number of samples cannot establish the ecological status of an entire reservoir. Their purpose was instead to provide an initial environmental reference and to connect what people observe in a water body with quantities we could investigate experimentally.",
        ],
      },
      {
        type: "crosslink",
        text: "Related voice: Inmaculada Alonso and the lived experience that motivated us to connect observation with measurable evidence.",
        target: "inmaculada",
      },
      {
        type: "p",
        text: "This stop reinforced two ideas. First, nutrient imbalance is not meaningful only when it reaches the scale of a famous ecological disaster. Second, understanding an environmental problem responsibly requires more than identifying something that looks wrong: observation must eventually be connected to measurement.",
      },
      {
        type: "details",
        title: "How this connected to our laboratory testing",
        paragraphs: [
          "Combined with the process parameters shared with us by Bio-Oils, the environmental samples also gave us two complementary reference points for thinking about realistic testing conditions: one industrial and one environmental. The Bio-Oils data informed the synthetic wastewater conditions used in our laboratory work, while the reservoir samples provided an independent environmental reference against which we could contextualise the phosphorus problem.",
        ],
      },
      {
        type: "evidence",
        label: "Data placeholder",
        text: "Composition of the synthetic wastewater stream built from Bio-Oils' effluent parameters.",
      },
      {
        type: "crosslink",
        text: "Related voice: Bio-Oils Huelva, where the industrial operating parameters were shared.",
        target: "bio-oils",
      },
    ],
  },
  {
    id: "cedex",
    number: "04",
    title: "CEDEX",
    date: "1 October 2025",
    dateConfirmed: true,
    photos: [
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/cedex-01.webp"),
        alt: "A CEDEX researcher explaining the laboratory's equipment to the team.",
        caption: null,
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/cedex-02.webp"),
        alt: "The rePhlow team in one of CEDEX's water-technology laboratories.",
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/cedex-04.webp"),
        alt: "CEDEX's large-scale physical model of a river channel.",
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/cedex-05.webp"),
        alt: "The rePhlow team observing analytical instrumentation used for water-quality testing.",
        caption: null,
      },
    ],
    blocks: [
      {
        type: "p",
        text: "By October, our route changed direction. We had seen where phosphorus-rich streams can originate and why nutrient pressure matters once water returns to the environment. The next question was different:",
      },
      {
        type: "pullquote",
        text: "How is water quality actually assessed before a technology can claim to improve it?",
      },
      {
        type: "p",
        text: "That question took us to CEDEX, where we visited facilities dedicated to water technology and hydro-environmental analysis.",
      },
      {
        type: "p",
        text: "Walking through the laboratories exposed us to a level of analytical infrastructure very different from our own and made the gap between an internal experimental assay and an official water-quality claim immediately visible.",
      },
      {
        type: "details",
        title: "What we observed inside CEDEX",
        paragraphs: [
          "We saw the equipment and workflows used to characterise water at very low concentrations, including chromatography and mass-spectrometry instrumentation, as well as the wider technical environment in which sampling, treatment assessment and water-quality characterisation take place.",
          "For us, the importance of the visit was not simply seeing more sophisticated instruments. It gave scale to the difference between a laboratory assay that is useful for comparing our own experiments and an analytical method capable of supporting an official water-quality claim.",
        ],
      },
      {
        type: "details",
        title: "How it changed our claims and implementation thinking",
        paragraphs: [
          "That distinction became important throughout rePhlow. Our malachite-green phosphorus assay could help us compare treatments experimentally, but visiting CEDEX made it much easier to understand why we should not present that method as equivalent to recognised reference analysis without proper validation.",
          "The visit also allowed us to physically situate rePhlow within the infrastructure it would eventually have to complement. Wastewater treatment is not an empty process waiting for a new technology: it is an established system of treatment stages, monitoring procedures and analytical controls. Any realistic implementation of rePhlow would therefore have to fit within that system.",
        ],
      },
      {
        type: "evidenceRow",
        items: [
          {
            label: "What we saw",
            text: "Official-scale analytical infrastructure and workflows.",
          },
          {
            label: "What we realised",
            text: "Our assay is a working laboratory approximation, not a validated reference method.",
          },
          {
            label: "What it changed",
            text: "Implementation claims must be grounded in recognised analytical evidence.",
          },
        ],
      },
      {
        type: "crosslink",
        text: "Related voice: technical and regulatory discussion associated with this visit.",
        target: "cedex",
      },
    ],
  },
  {
    id: "repsol",
    number: "05",
    title: "Repsol",
    date: "21 October 2025",
    dateConfirmed: true,
    photos: [
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/repsol-01.webp"),
        alt: "The Repsol campus in Madrid.",
        caption: "Repsol, Madrid",
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/repsol-02.webp"),
        alt: "The rePhlow team and the Repsol specialists during the online session.",
        caption: null,
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/repsol-03.webp"),
        alt: "A second moment of the same session with the Repsol team.",
        caption: null,
      },
    ],
    blocks: [
      {
        type: "p",
        text: "Three weeks later, our route moved from how a technology would be measured to whether an industrial operator could realistically accept it at all.",
      },
      {
        type: "p",
        text: "Our visit to Repsol placed rePhlow in a large-scale industrial environment. Seeing the facilities made the constraints surrounding industrial biotechnology much more tangible: equipment operates as part of interconnected systems, interventions must be controlled, and introducing a living engineered organism creates questions that extend far beyond whether it performs well biologically.",
      },
      {
        type: "p",
        text: "By this point, encapsulation was already part of rePhlow. However, walking through an industrial setting helped us understand containment not simply as a laboratory design feature but as part of the physical and operational architecture that would determine whether the technology could ever leave the laboratory.",
      },
      {
        type: "pullquote",
        text: "A bacterium that removes large amounts of phosphorus but cannot be reliably separated from treated water is not an implementable industrial technology.",
      },
      {
        type: "details",
        title: "How the visit connected our engineering modules",
        paragraphs: [
          "This visit connected several parts of the project that we had previously developed somewhat independently: our engineered Pseudomonas, the alginate core-shell capsules, the reactor and the downstream separation strategy all had to operate together as a contained treatment system.",
          "The photographs from Repsol belong here precisely for that reason. They are not evidence of what Repsol told us; they are evidence of the environment against which we were beginning to imagine our design.",
        ],
      },
      {
        type: "crosslink",
        text: "Related voice: stakeholder discussion and the containment requirement reinforced by this industrial perspective.",
        target: "repsol",
      },
      {
        type: "questionChain",
        items: [
          {
            label: "Bio-Oils",
            text: "What does the phosphorus problem actually look like in a real process?",
          },
          {
            label: "CEDEX",
            text: "How would we prove that our treatment actually works?",
          },
          {
            label: "Repsol",
            text: "Even if it works, what would be required for an industrial operator to consider using it?",
          },
        ],
      },
      {
        type: "p",
        text: "That progression helped turn rePhlow from an idea designed around phosphorus removal into a system increasingly designed around real operating conditions, measurable evidence and defensible containment.",
      },
    ],
  },
  {
    id: "beehives",
    number: "06",
    title: "Beehives",
    date: "Date to confirm",
    dateConfirmed: false,
    dateNote: "Not documented in the current record",
    photos: [
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/beehives-01.webp"),
        alt: "A frame lifted from the hive, covered with bees and honeycomb.",
        caption: null,
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/beehives-02.webp"),
        alt: "The rePhlow team in beekeeping suits at the apiary.",
        caption: null,
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/beehives-04.webp"),
        alt: "Inspecting a frame from an open hive.",
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/beehives-05.webp"),
        alt: "Suiting up before the hive inspection.",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "The last stop on our route took us away from wastewater entirely.",
      },
      {
        type: "details",
        title: "What we did during the visit",
        paragraphs: [
          "We visited beehives belonging to the family of Adriana, one of our team members. We opened the hives, removed and inspected the frames and carried out basic hive maintenance and cleaning. It was not yet honey-collection season, so the visit focused on observing the colony and the surrounding environment.",
          "At first, this seemed almost disconnected from everything that had come before it.",
        ],
      },
      {
        type: "pullquote",
        text: "Does phosphorus still matter when we leave wastewater behind?",
      },
      {
        type: "p",
        text: "The answer brought the route full circle. Phosphorus is not intrinsically a pollutant. It is an essential nutrient for plant growth, root development and flowering. The same element that can contribute to eutrophication when excessive amounts accumulate in water is indispensable to the terrestrial vegetation on which pollinators ultimately depend.",
      },
      {
        type: "p",
        text: "This made the contradiction at the centre of the project clearer than any of our other stops: society simultaneously struggles with too much phosphorus in some places and depends on access to it in others.",
      },
      {
        type: "details",
        title: "Why this matters for phosphorus recovery",
        paragraphs: [
          "The problem is therefore not phosphorus itself, but where it is, in what form, and whether we are able to keep it circulating productively rather than allowing it to become either pollution or waste.",
          "For rePhlow, this gave phosphorus recovery a meaning beyond its potential economic value. Recovering phosphorus is a way of keeping an essential nutrient within a controlled cycle: preventing excess from reaching vulnerable aquatic environments while preserving the possibility that the same resource can remain useful elsewhere.",
        ],
      },
    ],
  },
];

/** The stop we have not made yet. It closes the archive after the
 * end-of-route card: everything in it is what we plan to do and ask, not
 * something we have already seen. */
const PLANNED_STOP: Stop = {
  id: "next-bio-oils",
  planned: true,
  number: "07",
  title: "Next stop: Bio-Oils Huelva",
  date: "Planned visit",
  dateConfirmed: false,
  dateNote: "Date to be confirmed",
  photos: [],
  blocks: [
    {
      type: "pullquote",
      text: "Every stop on our route so far has taken us to water. The next one takes us to where the phosphorus begins.",
    },
    {
      type: "p",
      text: "Bio-Oils has already given us a great deal: the phosphorus range, pH and temperature of their degumming effluent, and a sample of the real thing, in which our strain accumulated more phosphorus than the wild type and stayed alive. But a sample is a snapshot, and a snapshot is not a production line. We have not yet seen where the effluent comes from, how it changes over time, or the space in which it would have to be treated. We do not want to claim that our results will hold in a plant we have never walked through.",
    },
    { type: "p", text: "We plan to visit the Bio-Oils facility in Huelva to:" },
    {
      type: "judgeScan",
      items: [
        {
          label: "Follow the stream",
          text: "Trace the effluent from the phosphoric-acid dosing in the degumming stage to the point where it leaves the process.",
        },
        {
          label: "Test our retrofit claim",
          text: "Look at where a modular rePhlow unit could physically fit, in terms of space, access and connections to the existing line.",
        },
        {
          label: "Capture the variability",
          text: "If the company agrees, collect samples at different points of the process and at different moments, to see how our strain responds beyond a single sample.",
        },
        {
          label: "Listen to the people who run it",
          text: "Talk with operators and the environmental team about daily operation, containment and what they would need to see before trusting a living system inside their facility.",
        },
      ],
    },
    {
      type: "details",
      title: "What we hope to learn",
      paragraphs: [
        "Whether our results hold beyond a single sample: how much the effluent varies between batches, oil types and seasons, and which components may not have been present in the sample we tested, such as residual oils, solids, cleaning agents or occasional peaks.",
        "Where rePhlow would physically fit: how much space, access and downtime a facility like theirs can realistically offer, and at which point of the treatment line a module would make the most sense.",
        "What operating it day to day involves: who would run the unit, what monitoring they already do, and what they would expect from a system that contains living cells.",
        "What would build or break their trust: the containment evidence, discharge-control data and cost figures they would need before considering a pilot.",
        "Which rules actually apply to them: how their discharge permit and national and regional regulations relate to the limits we have referenced, so that we can verify our legal claims instead of assuming them.",
      ],
    },
    {
      type: "details",
      title: "How it may change rePhlow",
      paragraphs: [
        "We go into this visit knowing that it may force us to change things, and we want it to. Depending on what we find:",
        "Our test conditions. If the effluent varies more than our sample suggested, we will repeat our comparison with the wild type across that range. If our results hold, they will rest on much stronger evidence than a single sample.",
        "Our modules. If space, downtime or operating constraints do not match our assumptions, we will rethink the modular layout, the size of the rotating-bed reactor and the order in which stages could be introduced.",
        "Our containment strategy. If operators require stronger guarantees than the ones we currently offer, we will add monitoring or containment measures and reflect them in the Responsibility Checkpoint.",
        "Our cost case. Real figures on what phosphorus management costs today would let us start the techno-economic assessment that is still open in our checkpoint, and replace \u201cwe cannot yet claim rePhlow is affordable\u201d with an actual comparison.",
        "Our revalorisation route. Their view on recovering phosphorus as a product, or reusing it in their own process, will show whether our PPK2/DHAK pathway answers a real need or needs to be adjusted.",
      ],
    },
    {
      type: "p",
      text: "During the visit we will also hold a new interview with the Bio-Oils team, building on the conversation we had with them in March 2025. We have prepared the following questions, which come directly from what we still do not know and from the open points in our Responsibility Checkpoint:",
    },
    {
      type: "questionChain",
      items: [
        {
          label: "Question 1",
          text: "Our strain worked well in the sample you gave us. How representative is that sample of your effluent over time? What variation (batch, oil type, season, cleaning cycles, residual oils or solids) should we expect?",
        },
        {
          label: "Question 2",
          text: "Where in your treatment line would a modular unit make the most sense? What space, downtime and operating requirements could you realistically assume?",
        },
        {
          label: "Question 3",
          text: "Which discharge limits apply to you, and how do you expect them to change with Directive (EU) 2024/3019?",
        },
        {
          label: "Question 4",
          text: "What would worry you most about using a genetically modified organism inside your facility, and what containment evidence would you need to see?",
        },
        {
          label: "Question 5",
          text: "How much does managing phosphorus in this effluent cost you today, and what saving would justify adopting a new technology?",
        },
        {
          label: "Question 6",
          text: "Would you see value in recovering the phosphorus as a product, or would you prefer to reuse it within your own process?",
        },
      ],
    },
    {
      type: "p",
      text: "Once the interview has taken place, we will add it to Stakeholders & Voices \u2192 Industry in the same format as our other conversations: who we spoke to, when, what was said and what changed in rePhlow as a result.",
    },
    {
      type: "evidence",
      label: "Evidence boundary",
      text: "This visit is the real test of the principle that has guided our design: rePhlow should slot into an existing line, not replace it. Until it takes place, our retrofit-compatibility claim rests on what Bio-Oils told us, not on what we have seen with our own eyes. We say so openly, and we count this visit as part of the route still to be walked. Whatever we learn will be recorded here, including the parts that do not support our design, and linked to the changes it produces in the project.",
    },
    {
      type: "crosslink",
      text: "See the initial interview with Bio-Oils Huelva (Industry, 20 March 2025) for the first technical exchange that led to this visit.",
      target: "bio-oils",
    },
  ],
};

const ROUTE_OPEN = {
  title: "Human Practices does not end here",
  text: "For us, Human Practices was never a chapter that closes when the wiki is published. It is a way of working that grows with the project. Every conversation changed something in rePhlow, and this visit is one more stop on a route that is still open. We will keep listening to the people our technology could affect, going back to the places it could be used and updating our design, our Responsibility Checkpoint and this wiki as we learn. Because a project that stops listening stops being responsible, and we intend rePhlow to keep learning long after this competition.",
};

const ROUTE_BREAK = {
  title: "The route turns back towards implementation.",
  text: "After following phosphorus from industry into environmental contexts, our next stops asked whether a solution like rePhlow could actually be measured, validated and accepted inside real treatment infrastructure.",
};

const FINAL_CARD = {
  eyebrow: "End of route",
  title:
    "We were no longer asking only how to remove phosphorus from wastewater.",
  text: "We were asking how to put it back in the right place.",
};

interface TravelIndexLayer {
  id: string;
  title: string;
  stopId: string;
  image: string;
  description: string;
  box: { left: number; top: number; width: number; height: number };
}

/** Percentages of the original 7680 × 4320 map, calculated by matching
 * each supplied transparent illustration against the baked map artwork. */
const TRAVEL_INDEX_LAYERS: TravelIndexLayer[] = [
  {
    id: "bio-oils",
    title: "Bio-Oils Huelva",
    stopId: "bio-oils-donana",
    image: bioOilsLayer,
    description:
      "The industrial starting point of our route and the process context rePhlow must fit into.",
    box: { left: 21.0449, top: 68.2292, width: 14.7461, height: 13.7153 },
  },
  {
    id: "donana",
    title: "Doñana",
    stopId: "bio-oils-donana",
    image: donanaLayer,
    description:
      "The sensitive wetland context that connected an industrial discharge to a wider water system.",
    box: { left: 37.207, top: 76.1285, width: 10.498, height: 9.0278 },
  },
  {
    id: "mar-menor-index",
    title: "Mar Menor",
    stopId: "mar-menor",
    image: marMenorLayer,
    description:
      "A visible example of the ecological consequences of prolonged nutrient imbalance.",
    box: { left: 67.041, top: 71.0938, width: 16.3574, height: 10.8507 },
  },
  {
    id: "san-juan-index",
    title: "Embalse de San Juan",
    stopId: "san-juan",
    image: sanJuanLayer,
    description:
      "The stop where observation became environmental sampling and measurement.",
    box: { left: 42.3828, top: 53.559, width: 12.6953, height: 9.9826 },
  },
  {
    id: "cedex-index",
    title: "CEDEX",
    stopId: "cedex",
    image: cedexLayer,
    description:
      "A research perspective on water quality, evidence and responsible interpretation.",
    box: { left: 54.9316, top: 39.3229, width: 12.8906, height: 14.4097 },
  },
  {
    id: "repsol-index",
    title: "Repsol Technology Lab",
    stopId: "repsol",
    image: repsolLayer,
    description:
      "The industrial innovation stop where implementation and scale became concrete questions.",
    box: { left: 28.7109, top: 40.9722, width: 9.2773, height: 13.7153 },
  },
  {
    id: "beehives-index",
    title: "Beehives",
    stopId: "beehives",
    image: beehivesLayer,
    description:
      "A final stop about circularity, ecosystems and learning from biological systems.",
    box: { left: 41.8945, top: 28.2118, width: 12.5, height: 12.2396 },
  },
];

function TravelArchiveIndex() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeLayer =
    TRAVEL_INDEX_LAYERS.find((layer) => layer.id === activeId) ?? null;

  return (
    <div className="ta-map-index" aria-labelledby="ta-map-index-title">
      <div className="ta-map-index__intro">
        <h3 id="ta-map-index-title">Explore the Travel Archive</h3>
        <p>
          Follow the six stops on our route. Select a place on the map to jump
          directly to its field record.
        </p>
      </div>

      <div
        className={`ta-map-index__illustration${activeLayer ? " is-active" : ""}`}
        onMouseLeave={() => setActiveId(null)}
      >
        <img
          className="ta-map-index__base"
          src={travelMap}
          alt="Map of Spain showing the six Travel Archive stops: Bio-Oils Huelva and Doñana, Mar Menor, Embalse de San Juan, CEDEX, Repsol and Beehives."
        />

        {TRAVEL_INDEX_LAYERS.map((layer) => {
          const style = {
            left: `${layer.box.left}%`,
            top: `${layer.box.top}%`,
            width: `${layer.box.width}%`,
            height: `${layer.box.height}%`,
          };
          return (
            <img
              key={layer.id}
              className={`ta-map-index__layer ta-map-index__layer--${layer.id}${activeId === layer.id ? " is-active" : ""}`}
              src={layer.image}
              alt=""
              style={style}
            />
          );
        })}

        {TRAVEL_INDEX_LAYERS.map((layer) => {
          const style = {
            left: `${layer.box.left}%`,
            top: `${layer.box.top}%`,
            width: `${layer.box.width}%`,
            height: `${layer.box.height}%`,
          };
          return (
            <a
              key={layer.id}
              className="ta-map-index__hitbox"
              href={`#s3-${layer.stopId}`}
              aria-label={`${layer.title} — jump to this Travel Archive stop`}
              aria-describedby={
                activeId === layer.id ? "ta-map-index-card" : undefined
              }
              style={style}
              onMouseEnter={() => setActiveId(layer.id)}
              onFocus={() => setActiveId(layer.id)}
              onBlur={() => setActiveId(null)}
            />
          );
        })}

        {activeLayer && (
          <div
            className="ta-map-index__card"
            id="ta-map-index-card"
            role="status"
          >
            <small>Travel Archive stop</small>
            <strong>{activeLayer.title}</strong>
            <span>{activeLayer.description}</span>
            <span className="ta-map-index__card-cta">Open field record ↓</span>
          </div>
        )}
      </div>

      <nav
        className="ta-map-index__mobile-links"
        aria-label="Travel Archive map links"
      >
        <ul>
          {STOPS.map((stop) => (
            <li key={stop.id}>
              <a href={`#s3-${stop.id}`}>
                <span>{stop.number}</span>
                {stop.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function PhotoFigure({ photo, large }: { photo: Photo; large: boolean }) {
  if (photo.kind === "real") {
    const captionText =
      photo.caption === null ? null : (photo.caption ?? photo.alt);
    return (
      <figure
        className={`hp-stop__photo${large ? " hp-stop__photo--large" : ""}`}
      >
        <img src={photo.src} alt={photo.alt} loading="lazy" />
        {captionText && (
          <figcaption>
            <span className="hp-stop__photo-caption">{captionText}</span>
          </figcaption>
        )}
      </figure>
    );
  }
  return (
    <figure
      className={`hp-stop__photo hp-stop__photo--placeholder${large ? " hp-stop__photo--large" : ""}`}
    >
      <figcaption>
        <span className="hp-stop__photo-caption">{photo.caption}</span>
        <span className="hp-stop__photo-pending">Photograph pending</span>
      </figcaption>
    </figure>
  );
}

function StopPhotos({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) return null;

  // 3 photos (San Juan, CEDEX): one large lead photo on the left, the
  // other two stacked on the right — a compact mosaic with a fixed total
  // height, instead of a lead photo plus a full-width strip underneath
  // that kept making the card taller than it needed to be.
  if (photos.length === 3) {
    const [lead, a, b] = photos;
    return (
      <div className="hp-stop__photo-mosaic hp-stop__photo-mosaic--3">
        <PhotoFigure photo={lead} large />
        <PhotoFigure photo={a} large={false} />
        <PhotoFigure photo={b} large={false} />
      </div>
    );
  }

  // 4 photos (Beehives): a compact 2x2 mosaic, same total-height idea.
  if (photos.length === 4) {
    return (
      <div className="hp-stop__photo-mosaic hp-stop__photo-mosaic--4">
        {photos.map((photo, i) => (
          <PhotoFigure photo={photo} large={false} key={i} />
        ))}
      </div>
    );
  }

  // 1–2 photos: the prototype's asymmetric large+small pair.
  return (
    <div
      className={`hp-stop__photo-grid${photos.length > 1 ? "" : " hp-stop__photo-grid--single"}`}
    >
      {photos.map((photo, i) => (
        <PhotoFigure
          photo={photo}
          large={photos.length === 1 || i === 0}
          key={i}
        />
      ))}
    </div>
  );
}

function StopBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "pullquote":
      return (
        <blockquote className="hp-stop__pullquote">{block.text}</blockquote>
      );
    case "judgeScan":
      return (
        <div className="hp-stop__scan-row">
          {block.items.map((item, i) => (
            <div className="hp-stop__scan" key={i}>
              <b>{item.label}</b>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      );
    case "evidenceRow":
      return (
        <div className="hp-stop__evidence-row">
          {block.items.map((item, i) => (
            <div className="hp-stop__evidence" key={i}>
              <b>{item.label}</b>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      );
    case "evidence":
      return (
        <div className="hp-stop__evidence">
          <b>{block.label}</b>
          <span>{block.text}</span>
        </div>
      );
    case "details":
      return (
        <AccordionSection title={block.title} className="hp-stop__details">
          {block.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </AccordionSection>
      );
    case "crosslink": {
      const href = block.target
        ? `#hp-timeline-event-${block.target}`
        : "#stakeholders";
      return (
        <div className="hp-stop__crosslink">
          <p>{block.text}</p>
          <a href={href}>Stakeholders &amp; Voices ↗</a>
        </div>
      );
    }
    case "questionChain":
      return (
        <div className="hp-stop__question-chain">
          {block.items.map((item, i) => (
            <div className="hp-stop__question" key={i}>
              <small>{item.label}</small>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      );
  }
}

function StopCard({ stop }: { stop: Stop }) {
  return (
    <article
      className={`hp-stop${stop.planned ? " hp-stop--planned" : ""}`}
      id={`s3-${stop.id}`}
    >
      <div className="hp-stop__marker">{stop.number}</div>
      <div className="hp-stop__content">
        <div className="hp-stop__head">
          <h3>{stop.title}</h3>
          <span
            className={`hp-stop__stamp${stop.dateConfirmed ? "" : " is-pending"}`}
          >
            {stop.date}
            {stop.dateNote && (
              <span className="hp-stop__date-note">{stop.dateNote}</span>
            )}
          </span>
        </div>

        <StopPhotos photos={stop.photos} />

        {stop.blocks.map((block, i) => (
          <StopBlock block={block} key={i} />
        ))}
      </div>
    </article>
  );
}

export function TravelArchiveRoute() {
  const [progress, setProgress] = useState(0);
  const routeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const el = routeRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress(pct);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const beforeBreak = STOPS.slice(0, 3);
  const afterBreak = STOPS.slice(3);

  return (
    <section className="hp-section travel-archive" id="travel-archive">
      <div className="ta-hero">
        <div className="ta-hero__grid">
          <div className="ta-hero__intro">
            <h2>3. Travel Archive</h2>
            <p className="ta-hero__lede">
              This is the field evidence generated by the team itself: the
              places we visited, the systems we observed, the samples we
              collected and the environments in which we tried to understand the
              phosphorus problem beyond the laboratory. It complements
              Stakeholders &amp; Voices, which contains what external
              interlocutors told us. Where a field visit was also associated
              with a stakeholder conversation, we document here what we
              physically saw and link to the corresponding interview rather than
              repeating it. Together, these stops became a route through the
              phosphorus cycle itself.
            </p>
          </div>

          <PassportGlyph />
        </div>
      </div>

      <div className="ta-intro">
        <h3>Following phosphorus beyond the laboratory</h3>
        <p>
          Together, these stops became a route through the phosphorus cycle
          itself: from the industrial streams where excess phosphorus is
          generated, to the ecosystems that ultimately bear nutrient pressure,
          and finally back into the treatment infrastructure where rePhlow would
          have to operate.
        </p>
      </div>

      <TravelArchiveIndex />

      <div className="hp-route-progress" aria-hidden="true">
        <div
          className="hp-route-progress__fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="hp-route" ref={routeRef}>
          {beforeBreak.map((stop) => (
            <StopCard stop={stop} key={stop.id} />
          ))}

          <div className="hp-route-break" id="s3-route-break">
            <h3>{ROUTE_BREAK.title}</h3>
            <p>{ROUTE_BREAK.text}</p>
          </div>

          {afterBreak.map((stop) => (
            <StopCard stop={stop} key={stop.id} />
          ))}

          <div className="hp-route-final-wrap">
            <div className="hp-route-final__marker" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 1v16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M4 2.2h10.5c.7 0 1 .8.5 1.3l-2.6 2.6 2.6 2.6c.5.5.2 1.3-.5 1.3H4V2.2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="hp-route-final">
              <small>{FINAL_CARD.eyebrow}</small>
              <h2>{FINAL_CARD.title}</h2>
              <p>{FINAL_CARD.text}</p>
            </div>
          </div>

          <StopCard stop={PLANNED_STOP} />

          <div
            className="hp-route-break hp-route-break--open"
            id="s3-route-open"
          >
            <h3>{ROUTE_OPEN.title}</h3>
            <p>{ROUTE_OPEN.text}</p>
          </div>
      </div>
    </section>
  );
}
