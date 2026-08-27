import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { asset } from "../../utils/asset";
import { AccordionSection } from "./AccordionSection";
import { FlipCard } from "./FlipCard";
import "./WhyPhosphorus.css";

/**
 * Section 0 — "Why we followed phosphorus". Content transcribed from the
 * Notion page "0. Why we followed phosphorus"; the three photo flip cards
 * (Mar Menor / Brittany / Lake Erie) reproduce the prototype
 * rephlow_HP_00_flipcards_images.html's identity: front = photo + short
 * teaser, back = the full case paragraph.
 */

interface CaseStudy {
  id: string;
  name: string;
  date: string;
  photo: string;
  photoCredit: string;
  front: string;
  back: ReactNode;
}

function Cite({ numbers }: { numbers: number[] }) {
  return (
    <>
      {" "}
      {numbers.map((number, index) => (
        <span key={number}>
          {index > 0 && ", "}
          <a className="hp-citation" href={"#hp-ref-" + number}>
            [{number}]
          </a>
        </span>
      ))}
    </>
  );
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "mar-menor",
    name: "Mar Menor, Spain",
    date: "2016",
    photo: asset("assets/human-practices/mar-menor.webp"),
    photoCredit:
      "Photo: Wikimedia Commons, “SOS Mar Menor 30-10-2019 (183611).jpg”.",
    front: "Our first warning came from close to home.",
    back: (
      <>
        <p>
          Our first warning came from close to home. In Spain, the ecological
          crisis of the Mar Menor made the consequences of nutrient pollution
          impossible to ignore. In <strong>2016</strong>, an intense
          phytoplankton bloom transformed the lagoon into what became known as a
          <strong>“green soup.”</strong> As the increasingly opaque water
          prevented sunlight from reaching the seabed, more than{" "}
          <strong>80% of its seagrass meadows disappeared</strong>. Further
          episodes of oxygen depletion in <strong>2019 and 2021</strong> caused
          the mass mortality of fish, crustaceans and other aquatic organisms
          <Cite numbers={[1, 2]} />.
        </p>
        <p>
          But the damage did not end with the loss of biodiversity. The Mar
          Menor supports{" "}
          <strong>
            tourism, recreation, fishing and the cultural identity
          </strong>{" "}
          of the communities surrounding it. Economic studies estimated that the
          environmental shock was associated with an{" "}
          <strong>18.1% reduction in local income</strong> compared with similar
          unaffected areas, while the deterioration of the lagoon resulted in
          more than <strong>€4 billion in lost property value</strong>
          <Cite numbers={[3, 4]} />.
        </p>
      </>
    ),
  },
  {
    id: "brittany",
    name: "Brittany, France",
    date: "Early 70s → 2025",
    photo: asset("assets/human-practices/brittany.webp"),
    photoCredit:
      "Photo: Wikimedia Commons, “Marée verte - Ulva Armoricana - en nord Finistère - 002.JPG”.",
    front:
      "What had felt shocking and relatively new to us would have sounded much less unfamiliar to our parents' generation.",
    back: (
      <>
        <p>
          What had felt shocking and relatively new to us would have sounded
          much less unfamiliar to our parents&apos; generation. On the coast of
          Brittany, France, green tides have been documented since the{" "}
          <strong>early 1970s</strong>, decades before any of us were born. On
          the Atlantic coast of Brittany, the same imbalance took a different
          form. Several shallow bays have experienced recurring green tides:
          massive proliferations of <em>Ulva</em> algae produced by the
          eutrophication of coastal waters.
        </p>
        <p>
          According to the French Court of Auditors, these blooms result from
          excessive inputs of nitrogen and phosphorus transported by coastal
          rivers, although{" "}
          <strong>
            nitrogen is the main factor that can currently be controlled
          </strong>{" "}
          and more than <strong>90% of the nitrates</strong> reaching the
          affected bays are of agricultural origin
          <Cite numbers={[5]} />. Once washed ashore, the algae accumulate in
          thick green layers and begin to decompose. Under these conditions,
          they can release <strong>hydrogen sulphide</strong>, turning beaches
          and mudflats into potential hazards for walkers, fishermen, local
          residents and animals
          <Cite numbers={[5]} />.
        </p>
        <p>
          In <strong>2025</strong>, a French court found the State partly liable
          for the death of a jogger who had been exposed to hydrogen sulphide
          released by decomposing algae on a Brittany beach — a stark, human
          illustration of how far these consequences can reach
          <Cite numbers={[9]} />. The consequences therefore move beyond water
          quality: they affect{" "}
          <strong>public health, tourism, public expenditure and trust</strong>{" "}
          in the institutions responsible for preventing pollution
          <Cite numbers={[5]} />.
        </p>
        <p>
          Brittany also challenged us to avoid oversimplifying eutrophication as
          a phosphorus-only problem. Different ecosystems are driven by
          different combinations of nutrients and sources. In some locations,
          agricultural nitrogen is the dominant controllable pressure; in
          others, phosphorus plays a greater role. A responsible project needed
          to define precisely which part of that broader challenge it could
          address.
        </p>
      </>
    ),
  },
  {
    id: "lake-erie",
    name: "Lake Erie, United States",
    date: "August 2014",
    photo: asset("assets/human-practices/lake-erie.webp"),
    photoCredit:
      "Photo: Wikimedia Commons, “Algal bloom in Lake Erie (8740853887).jpg”.",
    front:
      "Then we found out, across the Atlantic, nutrient pollution demonstrated that it could reach even further.",
    back: (
      <>
        <p>
          Then we found out, across the Atlantic, nutrient pollution
          demonstrated that it could reach even further. In{" "}
          <strong>August 2014</strong>, a harmful cyanobacterial bloom developed
          in the western basin of Lake Erie, in the United States. Excess
          nutrients transported into the lake, including high phosphorus loads,
          fuelled the bloom, while winds and currents concentrated it around the
          drinking-water intake serving Toledo, Ohio.{" "}
          <strong>Microcystin</strong>, a toxin produced by the cyanobacteria,
          was detected in the treated water.
        </p>
        <p>
          Nearly <strong>400,000 people</strong> were left without safe tap
          water for two days, unable to use it for drinking or cooking
          <Cite numbers={[6, 7]} />. What had begun as excess nutrients in a
          watershed had become an{" "}
          <strong>urban drinking-water emergency</strong>. In response to this
          and the continuing risk posed by harmful algal blooms, Toledo invested
          more than <strong>$400 million</strong> in upgrades to its water
          infrastructure
          <Cite numbers={[8]} />.
        </p>
      </>
    ),
  },
];

export function WhyPhosphorus() {
  return (
    <section className="hp-section why-phosphorus" id="why-phosphorus">
      <header className="hp-why__header">
        <svg className="hp-why__header-outline" aria-hidden="true">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="28"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <h2>0. Why we followed phosphorus</h2>
      </header>

      <section className="hp-why__subsection" id="s0-team-story">
        <h3>The beginning of rePhlow: a team, not a technology</h3>
        <div className="hp-why__prose">
          <p>
            Before rePhlow had a name, a microorganism or a bioreactor, it
            started with a team:{" "}
            <strong>
              eight students from Chemistry, Biochemistry, Biology and
              Engineering
            </strong>
            , drawn together by a shared interest in synthetic biology rather
            than a finished idea.
          </p>
          <p>
            This <strong>diversity</strong> was not simply a characteristic of
            our team. It became the{" "}
            <strong>starting point of our Human Practices journey</strong>.
            iGEM encourages teams to begin by building a diverse team,
            brainstorming broadly and exploring the context of a problem before
            committing to a solution. Following this approach, we did not begin
            by choosing a genetic construct and searching for somewhere to
            apply it. Instead, we first asked ourselves what kind of impact we
            wanted our project to have and which{" "}
            <strong>real-world problems</strong> synthetic biology could
            responsibly help address.
          </p>
          <p>
            Our <strong>first brainstorming</strong> sessions deliberately took
            place before we had selected a chassis, a plasmid or even a
            specific application. Some of us were drawn to coral degradation,
            thinking about engineered organisms that could support reef
            resilience or help symbiotic algae withstand thermal stress. Others
            focused on soil health, exploring whether synthetic biology could
            help restore degraded agricultural land or reduce dependence on
            chemical fertilisers. A few ideas centred on environmental cleaning
            more broadly: bioremediation of contaminated sites, or systems to
            break down persistent pollutants before they reached waterways. But
            the theme that kept resurfacing, across almost every discipline in
            the room, was{" "}
            <strong>
              water quality: eutrophication, nutrient runoff from agriculture
              and industry, and the excess phosphorus and nitrogen
            </strong>{" "}
            quietly reshaping rivers, reservoirs and coastal ecosystems we had
            grown up around.
          </p>
          <p>
            Rather than choosing the most technically attractive idea, we
            compared them against several questions: Was the problem relevant
            beyond the laboratory? Who was affected by it? Could we identify
            people or organisations already trying to solve it? Could synthetic
            biology provide a meaningful advantage over existing alternatives?
            Could the solution be implemented safely and realistically? Would
            solving the problem generate{" "}
            <strong>environmental, social and economic value</strong>?
          </p>
          <p>
            Once we had settled on the idea behind rePhlow, we turned that same
            critical thinking inward:{" "}
            <strong>
              what kind of team did solving this problem actually require, and
              what were we missing?
            </strong>{" "}
            That question became our
            skill-gap analysis (see{" "}
            <Link className="vsi-wikilink" to="/entrepreneurship">
              entrepreneurship
            </Link>
            ). We realised the project would need to communicate itself clearly
            through brand design, presentations, animations and video, so we
            brought in a designer. We knew modelling, diagramming and the
            software side would need more rigour than we could offer alone, so
            we welcomed a physics student onto the team. And once encapsulation
            and hardware emerged as concrete technical challenges, we brought in
            Marina, a Master's student in Industrial and Environmental
            Biotechnology, whose background fit both areas directly. By the end
            of this process, we had grown from{" "}
            <strong>eight to eleven members</strong> across Chemistry,
            Biochemistry, Biology, Physics, Engineering and Design.{" "}
            <strong>
              Each addition responded to a limitation the project itself had
              revealed.
            </strong>
          </p>
          <figure className="hp-team-photo">
            <img
              src={asset("assets/human-practices/team-photo.webp")}
              alt="The eleven members of the rePhlow team wearing their white team T-shirts."
              loading="lazy"
            />
          </figure>
          <p>
            This was more than a staffing decision. It was one of our earliest
            Human Practices reflections:{" "}
            <strong>recognising the limits of our own expertise</strong> and
            treating those limits as something to address openly rather than
            work around.
          </p>
        </div>
      </section>

      <section className="hp-why__subsection" id="s0-local-warning">
        <h3>A local warning, a global pattern</h3>
        <div className="hp-why__prose">
          <p>
            Long before rePhlow had a name, eutrophication already had an image
            for us. For many members of our team, it was the image of the{" "}
            <strong>Mar Menor</strong>. We had seen it on the news while we were
            still at school: green water where there had once been a clear
            lagoon, followed years later by shorelines covered with dead fish.
            It was one of those environmental crises that resonated across Spain
            and made an ecological process we had encountered in textbooks
            suddenly feel real and uncomfortably close to home.
          </p>
        </div>

        <div className="hp-case-cards">
          {CASE_STUDIES.map((c, index) => (
            <FlipCard
              key={c.id}
              flipOn="click"
              ariaLabel={`${c.name} — flip for details`}
              className={`hp-case-card${index === 0 ? " hp-case-card--wide" : ""}`}
              front={
                <div
                  className="hp-case-card__front"
                  style={{ backgroundImage: `url(${c.photo})` }}
                >
                  <div className="hp-case-card__front-scrim">
                    <p className="hp-case-card__name">{c.name}</p>
                    <p className="hp-case-card__date">{c.date}</p>
                    <p className="hp-case-card__teaser">{c.front}</p>
                    <span className="hp-case-card__hint">
                      Click / tap to flip
                    </span>
                  </div>
                </div>
              }
              back={
                <div className="hp-case-card__back">
                  <div className="hp-case-card__back-head">
                    <p className="hp-case-card__name">{c.name}</p>
                    <p className="hp-case-card__date">{c.date}</p>
                  </div>
                  {c.back}
                  <p className="hp-case-card__credit">{c.photoCredit}</p>
                </div>
              }
            />
          ))}
        </div>

        <AccordionSection
          title="What these cases changed"
          className="hp-why__reflection"
        >
          <p>
            This was an important turning point in how we framed rePhlow.{" "}
            <strong>
              The Mar Menor gave the problem an emotional and geographical
              proximity
            </strong>
            : it was a crisis from our own country that many of us had watched
            unfold while growing up. <strong>Brittany</strong> showed us that
            what felt like a recent warning was in fact part of a{" "}
            <strong>problem that had persisted across generations.</strong>{" "}
            <strong>Lake Erie</strong> showed that the same broader failure to
            manage nutrient flows could compromise something as fundamental as
            a <strong>city&apos;s drinking-water supply</strong>.
          </p>
          <p>
            But recognising a global pattern did not lead us to claim that
            rePhlow could solve a global problem. It led us to the opposite
            conclusion.
          </p>
          <p>
            Eutrophication is shaped by different nutrients, sources and
            ecosystems, and{" "}
            <strong>no single technology can address all of them</strong>. A
            team from Madrid{" "}
            <strong>could not responsibly design a universal solution</strong>{" "}
            for the Mar Menor, Brittany and Lake Erie. What we could do was
            identify one part of that global challenge where our knowledge of
            synthetic biology could make a{" "}
            <strong>specific and measurable contribution</strong>.
          </p>
          <p>
            So instead of beginning at the lagoon, the coastline or the
            drinking-water reservoir, we decided to{" "}
            <strong>follow phosphorus upstream</strong>. That shift became
            central to rePhlow. Our ambition was no longer to “solve
            eutrophication”. It was to ask a more responsible question:{" "}
            <strong>
              Where can we intervene locally, before phosphorus becomes an
              environmental problem, in a way that could also be useful wherever
              similar phosphorus-rich streams exist?
            </strong>
          </p>
          <p>
            The problem that first felt close to home had revealed a global
            pattern. Our response, however, would remain deliberately local and
            specific:{" "}
            <strong>
              understand one stream, work with the people responsible for it,
              and design a solution that could later travel further than the
              place where it began.
            </strong>
          </p>
        </AccordionSection>
      </section>

      <section className="hp-why__subsection" id="s0-removal-recovery">
        <h3>From removal to recovery</h3>
        <div className="hp-why__prose">
          <p>
            We mapped industrial processes in which phosphorus-containing
            compounds are used and contacted companies that might generate
            phosphorus-rich wastewater. Our objective was to understand{" "}
            <strong>
              where phosphorus entered these processes, why it became
              difficult to manage and what industries actually needed from a
              new treatment technology
            </strong>
            . This route led us to <strong>Bio-Oils Huelva</strong>, a
            biodiesel producer that uses phosphoric acid during the degumming
            stage of its production process.
          </p>
          <p>
            This input{" "}
            <strong>
              transformed an environmental concern into a tangible industrial
              challenge
            </strong>
            . Bio-Oils explained that phosphorus was not
            simply an abstract pollutant appearing at the end of a pipe. It was
            connected to process operation, wastewater treatment, discharge
            requirements and the growing need to reduce the nutrient load
            leaving industrial facilities.
          </p>
          <p>
            At the same time, the{" "}
            <strong>
              European regulatory landscape was moving in the same direction
            </strong>
            . Directive (EU) 2024/3019
            <Cite numbers={[10]} /> will replace the previous Urban Wastewater
            Treatment Directive starting in August 2027. By the end of that
            year, Member States must identify areas sensitive to eutrophication
            and determine whether they are sensitive to phosphorus, nitrogen or
            both. The Directive then progressively introduces{" "}
            <strong>stricter tertiary-treatment requirements</strong>,
            including total-phosphorus concentrations of{" "}
            <strong>0.7 mg/L</strong> for plants serving between 10,000 and
            150,000 population equivalents and <strong>0.5 mg/L</strong> for
            larger plants, with implementation phased between 2033 and 2045.
          </p>
          <p>
            The industrial need seemed clear: companies required technologies
            capable of removing phosphorus{" "}
            <strong>
              efficiently, safely and without forcing them to rebuild their
              entire treatment infrastructure
            </strong>
            . But our first Human Practices insight was that{" "}
            <strong>removal alone was not enough</strong>. Phosphorus is not
            simply a pollutant to be eliminated once it reaches wastewater. It
            is an <strong>essential nutrient</strong> on which agriculture, food production and,
            ultimately, human life depend. Allowing it to accumulate in aquatic
            environments creates environmental harm, but simply transferring it
            from water into another waste stream creates a different problem: a
            useful resource is lost, while the burden is merely moved elsewhere.
          </p>
          <p>
            This made phosphorus recovery a question not only of{" "}
            <strong>economic value, but of resource stewardship</strong>. If
            phosphorus can be intercepted before it becomes pollution, it can
            potentially be{" "}
            <strong>returned to productive use rather than discarded</strong>.
            For us, this meant
            asking how biotechnology could help protect ecosystems while also
            treating a limited and essential resource more responsibly, reducing
            unnecessary waste and preserving value for the people and systems
            that will depend on it in the future.
          </p>
          <p>
            Our central question therefore changed from “How can we remove
            phosphorus from wastewater?” to:
          </p>
          <p className="hp-central-question">
            <em>
              “How can we recover excess phosphorus before it becomes waste,
              using a contained, safe and scalable biotechnology, and return it
              to productive use in a way that creates{" "}
              <strong>environmental, social and economic value</strong>?”
            </em>
          </p>
          <p>
            This shift, <strong>from removal to recovery,</strong> became the
            cornerstone of rePhlow, guided by one fundamental value:{" "}
            <strong>
              phosphorus should not reach nature as pollution, and it should not
              leave industry as waste
            </strong>
            .
          </p>
        </div>
      </section>

      <section className="hp-why__subsection" id="s0-alternatives">
        <h3>Comparing against non-biotech alternatives</h3>
        <div className="hp-why__prose">
          <p>
            Before committing to this direction, we asked a further question:
            was an industrial, biological interception actually the right level
            at which to act, or were there other approaches already addressing
            the same problem more effectively? Answering that honestly meant{" "}
            <strong>looking beyond synthetic biology altogether</strong>.
            RePhlow is not the only
            possible response to nutrient pollution, nor should it be presented
            as one. Eutrophication requires action across agriculture, industry,
            wastewater management and ecosystem restoration. Two
            non-biotechnological approaches were particularly important in
            defining the role our project could realistically play.
          </p>
        </div>
        <AccordionSection
          title="Wetland restoration and constructed wetlands"
          className="hp-why__alternative"
        >
          <p>
            Natural and constructed wetlands can retain or transform nutrients
            through vegetation, microbial activity and sediment processes. They
            can provide effective, comparatively low-input treatment in
            appropriate contexts while also generating wider ecological
            benefits. However, their applicability depends on land availability,
            hydrology, loading conditions and long-term management. They also{" "}
            <strong>operate at a different point in the nutrient cycle from
            rePhlow.</strong> Although they can retain phosphorus and reduce
            the quantity reaching receiving waters, they{" "}
            <strong>do not</strong> necessarily{" "}
            <strong>
              recover it as a concentrated and reusable output.
            </strong>
          </p>
          <p>
            We therefore did not view rePhlow as an alternative to wetland
            restoration. Wetlands protect and restore ecosystems;{" "}
            <strong>
              rePhlow aims to intercept a defined industrial phosphorus stream
              before it reaches them.
            </strong>
          </p>
        </AccordionSection>
        <AccordionSection
          title="Agricultural policy and nutrient-loss prevention"
          className="hp-why__alternative"
        >
          <p>
            Fertiliser regulation, improved nutrient management and measures to
            reduce agricultural runoff address another major source of
            eutrophication. The Brittany case made clear that agricultural
            nitrogen can be the dominant controllable pressure in some
            catchments
            <Cite numbers={[5]} />. These interventions are indispensable, but
            they{" "}
            <strong>
              respond to diffuse nutrient losses distributed across land,
              farms and drainage systems.
            </strong>{" "}
            They <strong>do not</strong> directly address{" "}
            <strong>industrial streams</strong> in which phosphorus enters at
            an identifiable facility and can potentially be treated before
            discharge.
          </p>
          <p>
            Once again, the approaches are complementary. Agricultural policy
            seeks to prevent diffuse losses;{" "}
            <strong>
              rePhlow focuses on contained industrial point sources.
            </strong>
          </p>
        </AccordionSection>
      </section>

      <section
        className="hp-why__subsection hp-why__closing"
        id="s0-defining-place"
      >
        <h3>Defining rePhlow's place</h3>
        <div className="hp-why__prose">
          <p>
            RePhlow was designed to occupy the space these two approaches do not
            cover:{" "}
            <strong>
              an industrial, point-source, biological interception that acts{" "}
              <em>before</em> phosphorus is discharged, and that recovers it
              rather than only diluting, removing or regulating it away.
            </strong>{" "}
            This position reflects what our Human Practices journey taught us. A
            globally recurring environmental problem does not require one
            universal solution. It requires{" "}
            <strong>locally appropriate interventions</strong> acting at
            different points in the same nutrient cycle.
          </p>
          <p>
            Wetland restoration, agricultural nutrient management, conventional
            wastewater treatment and industrial phosphorus recovery each address
            different parts of that cycle. A <strong>responsible strategy</strong>{" "}
            needs them to{" "}
            <strong>work together rather than compete</strong> for the claim of
            being the single solution.
          </p>
          <p>
            <strong>
              RePhlow did not begin with a plasmid. It began with a concern
              close to home.
            </strong>{" "}
            That concern revealed a <strong>global pattern</strong>, the
            pattern led us <strong>upstream</strong>, and following it
            transformed phosphorus from something to be{" "}
            <strong>removed into a resource worth recovering.</strong>
          </p>
        </div>
      </section>

      <AccordionSection
        title="References"
        className="hp-why__accordion hp-references"
        defaultOpen
      >
        <ol>
          <li className="hp-reference" id="hp-ref-1">
            United Nations Environment Programme. (2025).{" "}
            <a
              href="https://www.unep.org/news-and-stories/story/how-spain-turning-iconic-lagoon-green-soup-natural-oasis"
              target="_blank"
              rel="noreferrer"
            >
              <em>
                How Spain is turning an iconic lagoon from "green soup" into a
                natural oasis.
              </em>
            </a>{" "}
            UNEP.
          </li>
          <li className="hp-reference" id="hp-ref-2">
            Heezen, J., &amp; Fernández López, L. (2022).{" "}
            <a
              href="https://www.europarl.europa.eu/cmsdata/245205/BRIEFING.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <em>
                PETI fact-finding visit to Mar Menor, Spain: 23–25 February 2022
              </em>
            </a>{" "}
            [Briefing]. European Parliament, Policy Department for
            Citizens&apos; Rights and Constitutional Affairs.
          </li>
          <li className="hp-reference" id="hp-ref-3">
            Aparicio, G., Camacho, M., &amp; Maté-Sánchez-Val, M. (2024).
            <a
              href="https://doi.org/10.1016/j.ecolecon.2024.108213"
              target="_blank"
              rel="noreferrer"
            >
              Quantifying the impact: Are coastal areas impoverished by marine
              pollution?
            </a>{" "}
            <em>Ecological Economics, 222</em>, Article 108213.
          </li>
          <li className="hp-reference" id="hp-ref-4">
            Pérez Quirós, G., &amp; Lamas, M. (2024).{" "}
            <a
              href="https://www.bde.es/wbe/en/noticias-eventos/blog/que-impacto-economico-tienen-el-cambio-climatico-y-la-degradacion-medioambiental--el-caso-de-la-vivienda-en-el-mar-menor.html"
              target="_blank"
              rel="noreferrer"
            >
              <em>
                What is the economic impact of climate change and environmental
                degradation? The case of house prices in the Mar Menor area.
              </em>
            </a>{" "}
            Banco de España.
          </li>
          <li className="hp-reference" id="hp-ref-5">
            Cour des comptes. (2021).{" "}
            <a
              href="https://www.ccomptes.fr/en/publications/combat-proliferation-green-algae-brittany"
              target="_blank"
              rel="noreferrer"
            >
              <em>
                Evaluation of public policy to combat the proliferation of green
                algae in Brittany.
              </em>
            </a>
          </li>
          <li className="hp-reference" id="hp-ref-6">
            United States Environmental Protection Agency. (2018).{" "}
            <a
              href="https://www.epa.gov/sites/default/files/2018-03/documents/us_dap_final_march_1.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <em>U.S. action plan for Lake Erie.</em>
            </a>
          </li>
          <li className="hp-reference" id="hp-ref-7">
            National Oceanic and Atmospheric Administration. (2014, August 4).{" "}
            <a
              href="https://coastalscience.noaa.gov/news/noaa-forecasts-responds-lake-erie-harmful-algal-bloom/"
              target="_blank"
              rel="noreferrer"
            >
              <em>
                NOAA forecasts and responds to Lake Erie harmful algal bloom.
              </em>
            </a>{" "}
            NOAA Coastal Science.
          </li>
          <li className="hp-reference" id="hp-ref-8">
            U.S. Environmental Protection Agency, Office of Inspector General.
            (2021).{" "}
            <a
              href="https://www.epa.gov/system/files/documents/2021-09/_epaoig_20210929-21-e-0264.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <em>
                EPA needs an agencywide strategic action plan to address harmful
                algal blooms
              </em>
            </a>{" "}
            (Report No. 21-E-0264).
          </li>
          <li className="hp-reference" id="hp-ref-9">
            Le Monde. (2025, June 24).{" "}
            <a
              href="https://www.lemonde.fr/en/police-and-justice/article/2025/06/24/france-ordered-to-compensate-family-of-jogger-killed-by-toxic-algae_6742669_105.html"
              target="_blank"
              rel="noreferrer"
            >
              <em>
                France ordered to compensate family of jogger killed by toxic
                algae.
              </em>
            </a>{" "}
            Le Monde.
          </li>
          <li className="hp-reference" id="hp-ref-10">
            European Parliament and Council of the European Union. (2024,
            December 12).{" "}
            <a
              href="https://eur-lex.europa.eu/eli/dir/2024/3019/oj"
              target="_blank"
              rel="noreferrer"
            >
              <em>
                Directive (EU) 2024/3019 of the European Parliament and of the
                Council of 27 November 2024 concerning urban wastewater
                treatment (recast).
              </em>
            </a>{" "}
            Official Journal of the European Union.
          </li>
        </ol>
      </AccordionSection>
    </section>
  );
}
