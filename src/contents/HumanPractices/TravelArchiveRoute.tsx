import { useEffect, useRef, useState } from "react";
import { asset } from "../../utils/asset";
import { AccordionSection } from "./AccordionSection";
import { PassportGlyph } from "./HeroObjects";
import "./TravelArchiveRoute.css";

/**
 * Section 3 — "Travel Archive". Content transcribed from the Notion page
 * "3. Travel Archive" and rePhlow_Travel_Archive_v2.html. Identity: a
 * passport/field-journal — a dark-green hero framing a tilted passport
 * card, stamped dates, numbered timeline stops with field-journal
 * disclosures, pull quotes and a route-progress bar — kept literally,
 * ported directly from the prototype rather than genericised. The
 * prototype's own sticky topbar (brand/progress/button) is dropped per the
 * approved brief; its side-nav becomes a secondary, page-local "route
 * stops" index (desktop sticky list / mobile <select>), entirely separate
 * from the shared PageSectionNav rendered by HumanPractices.tsx.
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
      { kind: "placeholder", caption: "Photo: rePhlow team at Bio-Oils Huelva" },
      { kind: "placeholder", caption: "Photo: Doñana wetlands and estuarine system" },
    ],
    blocks: [
      {
        type: "p",
        text: "Our route began where the phosphorus problem became real for rePhlow: Bio-Oils Huelva. Visiting an industrial setting gave the numbers we had been working with a physical context and made one constraint immediately tangible: rePhlow would have to coexist with an existing process, not an idealised laboratory setup.",
      },
      {
        type: "judgeScan",
        items: [
          { label: "What we saw", text: "A real industrial process and the infrastructure a treatment module would have to fit around." },
          { label: "Why it mattered", text: "Phosphorus stopped being an abstract wastewater parameter and became an operating problem." },
          { label: "What it opened", text: "Follow the wider water system and understand the environmental context downstream." },
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
    photos: [
      { kind: "placeholder", caption: "Photo: Mar Menor lagoon" },
      { kind: "placeholder", caption: "Optional: archival/local team photo" },
    ],
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
          { label: "Observed meaning", text: "Nutrient imbalance becomes visible ecological damage." },
          { label: "Design implication", text: "Removal alone is not the end of the phosphorus story." },
          { label: "Question opened", text: "Can recovery become part of environmental responsibility?" },
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
        src: asset("assets/human-practices/travel-archive/embalse-san-juan-01.webp"),
        alt: "María collecting a water sample.",
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/embalse-san-juan-02.webp"),
        alt: "Cloudy, algae-tinted water near the reservoir's shore.",
        caption: null,
      },
      {
        kind: "real",
        src: asset("assets/human-practices/travel-archive/embalse-san-juan-03.webp"),
        alt: "The Embalse de San Juan reservoir",
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
          { label: "Data placeholder", text: "Phosphorus concentration results" },
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
          { label: "What we saw", text: "Official-scale analytical infrastructure and workflows." },
          { label: "What we realised", text: "Our assay is a working laboratory approximation, not a validated reference method." },
          { label: "What it changed", text: "Implementation claims must be grounded in recognised analytical evidence." },
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
      { kind: "placeholder", caption: "Photo: rePhlow team during the Repsol visit" },
      { kind: "placeholder", caption: "Photo: industrial facilities / visit" },
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
          { label: "Bio-Oils", text: "What does the phosphorus problem actually look like in a real process?" },
          { label: "CEDEX", text: "How would we prove that our treatment actually works?" },
          { label: "Repsol", text: "Even if it works, what would be required for an industrial operator to consider using it?" },
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
      { type: "p", text: "The last stop on our route took us away from wastewater entirely." },
      {
        type: "details",
        title: "What we did during the visit",
        paragraphs: [
          "We visited beehives belonging to the family of Adriana, one of our team members. We opened the hives, removed and inspected the frames and carried out basic hive maintenance and cleaning. It was not yet honey-collection season, so the visit focused on observing the colony and the surrounding environment.",
          "At first, this seemed almost disconnected from everything that had come before it.",
        ],
      },
      { type: "pullquote", text: "Does phosphorus still matter when we leave wastewater behind?" },
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

const ROUTE_BREAK = {
  title: "The route turns back towards implementation.",
  text: "After following phosphorus from industry into environmental contexts, our next stops asked whether a solution like rePhlow could actually be measured, validated and accepted inside real treatment infrastructure.",
};

const FINAL_CARD = {
  eyebrow: "End of route",
  title: "We were no longer asking only how to remove phosphorus from wastewater.",
  text: "We were asking how to put it back in the right place.",
};

const STOP_IDS = STOPS.map((stop) => `s3-${stop.id}`);

function useActiveStop(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length === 0) return;
        const topMost = intersecting.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActive(topMost.target.id);
      },
      { rootMargin: "-110px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function PhotoFigure({ photo, large }: { photo: Photo; large: boolean }) {
  if (photo.kind === "real") {
    const captionText = photo.caption === null ? null : (photo.caption ?? photo.alt);
    return (
      <figure className={`hp-stop__photo${large ? " hp-stop__photo--large" : ""}`}>
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
        <PhotoFigure photo={photo} large={photos.length === 1 || i === 0} key={i} />
      ))}
    </div>
  );
}

function StopBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "pullquote":
      return <blockquote className="hp-stop__pullquote">{block.text}</blockquote>;
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
    <article className="hp-stop" id={`s3-${stop.id}`}>
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
  const activeStopId = useActiveStop(STOP_IDS);

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
              collected and the environments in which we tried to understand
              the phosphorus problem beyond the laboratory. It complements
              Stakeholders &amp; Voices, which contains what external
              interlocutors told us. Where a field visit was also
              associated with a stakeholder conversation, we document here
              what we physically saw and link to the corresponding interview
              rather than repeating it. Together, these stops became a route
              through the phosphorus cycle itself.
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
          generated, to the ecosystems that ultimately bear nutrient
          pressure, and finally back into the treatment infrastructure where
          rePhlow would have to operate.
        </p>
      </div>

      <div className="hp-route-progress" aria-hidden="true">
        <div
          className="hp-route-progress__fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="hp-route-select">
        <label className="hp-route-select__label" htmlFor="ta-stop-select">
          Jump to a stop
        </label>
        <select
          id="ta-stop-select"
          value={activeStopId || STOP_IDS[0]}
          onChange={(e) => {
            window.location.hash = e.target.value;
          }}
        >
          {STOPS.map((stop) => (
            <option key={stop.id} value={`s3-${stop.id}`}>
              {stop.title}
            </option>
          ))}
        </select>
      </div>

      <div className="hp-route-layout">
        <aside className="hp-route-nav" aria-label="Travel Archive stops">
          <h3>Route stops</h3>
          <ul>
            {STOPS.map((stop) => {
              const targetId = `s3-${stop.id}`;
              const isActive = activeStopId === targetId;
              return (
                <li key={stop.id}>
                  <a
                    href={`#${targetId}`}
                    className={isActive ? "is-active" : ""}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="hp-route-nav__dot" aria-hidden="true" />
                    {stop.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>

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
                <path d="M4 1v16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
        </div>
      </div>
    </section>
  );
}
