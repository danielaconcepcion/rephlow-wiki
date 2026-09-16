import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { PageSectionNav, type PageSection } from "../components/PageSectionNav";
import { VisualIndex } from "../components/OurSolutionVisualIndex";
import { AccordionSection } from "./HumanPractices/AccordionSection";
import { PDBackground } from "./ProjectDescription/PDBackground";
import { asset } from "../utils/asset";
import "./ProjectDescription.css";

type CitationGroup = "problem" | "enzyme" | "genetic" | "revalorisation";

const PROJECT_DESCRIPTION_SECTIONS: PageSection[] = [
  {
    id: "problem-eutrophication",
    label: "The problem: eutrophication",
    children: [
      { id: "global-imbalance", label: "A global imbalance" },
      { id: "mar-menor", label: "The Mar Menor" },
      { id: "phosphorus-sources", label: "Phosphorus sources" },
      { id: "current-removal", label: "Current removal" },
      { id: "stricter-limits", label: "Stricter limits" },
    ],
  },
  {
    id: "our-solution-visual-index",
    label: "Our solution",
    children: [
      { id: "hardware", label: "Hardware" },
      { id: "encapsulation", label: "Bacterial encapsulation" },
      { id: "enzyme", label: "Enzyme immobilisation" },
      { id: "genetic", label: "Genetic engineering" },
      { id: "model", label: "Model" },
      { id: "revalorisation", label: "Revalorisation" },
    ],
  },
];

function Cite({ group, numbers }: { group: CitationGroup; numbers: number[] }) {
  return (
    <>
      {" "}
      {numbers.map((number, index) => (
        <span key={number}>
          {index > 0 && ", "}
          <a href={`#${group}-ref-${number}`} className="vsi-citation">
            [{number}]
          </a>
        </span>
      ))}
    </>
  );
}

function WikiLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="vsi-wikilink" to={to}>
      {children}
    </Link>
  );
}

function SectionLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="vsi-wikilink" href={href}>
      {children}
    </a>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="vsi-wikilink" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Figure({
  src,
  fallbackSrc,
  alt,
  caption,
  className = "",
}: {
  src: string;
  /** Optional raster fallback (e.g. a PNG) for the rare case an SVG
   * source can't be used. Renders a <picture> with the SVG as the
   * preferred <source> and the fallback as the <img>, instead of a
   * plain <img src={svg}> — real fallback behaviour, not just "keep
   * the PNG around unused". */
  fallbackSrc?: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
}) {
  const image = fallbackSrc ? (
    <picture>
      <source
        srcSet={asset(`assets/project-description/${src}`)}
        type="image/svg+xml"
      />
      <img src={asset(`assets/project-description/${fallbackSrc}`)} alt={alt} />
    </picture>
  ) : (
    <img src={asset(`assets/project-description/${src}`)} alt={alt} />
  );
  return (
    <figure
      className={`vsi-figure vsi-figure--full pd-figure ${className}`.trim()}
    >
      {image}
      {caption && (
        <figcaption className="vsi-figure__caption">{caption}</figcaption>
      )}
    </figure>
  );
}

function BlockIntro({
  image,
  alt,
  children,
}: {
  image: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <div className="vsi-pair pd-block-intro">
      <figure className="vsi-figure pd-block-illustration">
        <img src={asset(image)} alt={alt} />
      </figure>
      <p className="pd-block-summary">{children}</p>
    </div>
  );
}

function InlineFigure({
  image,
  alt,
  caption,
}: {
  image: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="pd-inline-figure pd-inline-figure--right">
      <img src={asset(image)} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Ref({
  group,
  number,
  children,
}: {
  group: CitationGroup;
  number: number;
  children: ReactNode;
}) {
  return (
    <li id={`${group}-ref-${number}`} className="vsi-ref">
      {children}
    </li>
  );
}

export function ProjectDescription() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="pd-page">
      <PDBackground contentRef={contentRef} />
      <div className="page-with-section-nav">
        <PageSectionNav
          sections={PROJECT_DESCRIPTION_SECTIONS}
          ariaLabel="Jump to project description section"
        />

        <div className="pd-content-wrap">
          <div className="pd-content" ref={contentRef}>
            <section id="problem-eutrophication" className="pd-section">
            <h2>1. The problem: eutrophication</h2>
            <p className="pd-section-lede">
              <strong>Phosphorus is essential to life.</strong> It is part of
              DNA and RNA, drives cellular energy transfer through ATP, and
              contributes to the phospholipids that make up every cell membrane
              <Cite group="problem" numbers={[1]} />. Yet when it accumulates in
              water faster than an ecosystem can absorb it, the same element
              that sustains life begins to undermine it.
            </p>
            <p>
              This process is known as <strong>eutrophication</strong>: the
              enrichment of aquatic environments with nutrients, principally
              nitrogen and phosphorus, originating from agricultural runoff,
              urban sewage and industrial wastewater
              <Cite group="problem" numbers={[2, 3]} />. Phosphorus is often the
              limiting nutrient in freshwater systems, including rivers, lakes
              and reservoirs, whereas nitrogen generally plays a greater role in
              coastal and marine environments
              <Cite group="problem" numbers={[4]} />. This is why controlling
              phosphorus inputs is particularly important for protecting inland
              waters.
            </p>
            <p>
              Excess nutrient availability allows algae and cyanobacteria to
              grow beyond the capacity of the ecosystem to regulate them. Dense
              blooms prevent sunlight from reaching submerged vegetation. When
              this biomass dies and decomposes, the process consumes the
              dissolved oxygen on which fish, crustaceans and other aquatic
              organisms depend. Some blooms may also release toxins that
              threaten wildlife, livestock and human health
              <Cite group="problem" numbers={[2, 3]} />.
            </p>
            <p>
              Once submerged vegetation has disappeared and oxygen levels have
              fallen, the water body may shift into a degraded state that
              persists even after nutrient inputs are reduced. Eutrophication
              therefore behaves less like a single event and more like an
              ecological threshold: once crossed, it can be extremely difficult
              to reverse
              <Cite group="problem" numbers={[3]} />.
            </p>

            <Figure
              src="eutrophication-illustration.webp"
              alt="Illustration showing nutrients entering a water body, an algal bloom blocking sunlight and oxygen depletion during decomposition"
              className="pd-problem-card pd-problem-illustration"
              caption={
                <>
                  Nutrient enrichment drives algal growth, reduces light
                  penetration and depletes dissolved oxygen as biomass
                  decomposes. Illustration by rePhlow.
                </>
              }
            />

            <div id="global-imbalance" className="pd-subsection">
              <h3>A global and growing imbalance</h3>
              <p>
                The scale of the problem is global. A 2021 review reported that
                <strong>
                  {" "}
                  63% of the inland water bodies assessed were already eutrophic
                </strong>
                , representing approximately{" "}
                <strong>31% of the world&apos;s inland-water area</strong>
                <Cite group="problem" numbers={[5]} />.
              </p>
              <p>
                Separate satellite monitoring identified around
                <strong>
                  {" "}
                  1.15 million km² of coastal waters with eutrophication
                  potential
                </strong>
                , with areas showing deterioration outnumbering those showing
                recovery by approximately two to one
                <Cite group="problem" numbers={[6]} />.
              </p>

              <Figure
                src="24040d3a-ee9e-4eb6-b783-093c851e9c87.webp"
                alt="Three Copernicus Sentinel-2 views showing L'Albufera lagoon changing from green to brown between August and November 2023"
                className="pd-figure--wide pd-problem-card pd-figure--albufera"
                caption={
                  <>
                    Changes in the colour of L&apos;Albufera Natural Park
                    between August and November 2023. Credit: European Union,
                    Copernicus Sentinel-2 imagery.{" "}
                    <ExternalLink href="https://eu-space.europa.eu/components/earth-observation-copernicus/image-of-day/waters-spains-albufera-lagoon-change-colour">
                      Source
                    </ExternalLink>
                    .
                  </>
                }
              />
            </div>

            <div id="mar-menor" className="pd-subsection">
              <h3>Eutrophication in Spain: the Mar Menor “green soup”</h3>
              <p>
                Spain&apos;s own coastline demonstrates what these figures mean
                in practice. In 2016, an intense phytoplankton bloom transformed
                the Mar Menor lagoon into what became widely known as a{" "}
                <strong>“green soup”</strong>
                <Cite group="problem" numbers={[7]} />. As the water became
                increasingly opaque, more than{" "}
                <strong>80% of its seagrass meadows disappeared</strong>.
                Further oxygen-depletion events in 2019 and 2021 caused the mass
                mortality of fish, crustaceans and other aquatic organisms
                <Cite group="problem" numbers={[7, 8]} />.
              </p>
              <p>
                The consequences extended beyond biodiversity. Local income fell
                by an estimated <strong>18.1%</strong> compared with unaffected
                areas, while surrounding property lost more than{" "}
                <strong>€4 billion in value</strong>
                <Cite group="problem" numbers={[9, 10]} />. The Mar Menor is not
                an isolated accident, but one visible example of an imbalance
                repeated across coastal and inland waters worldwide.
              </p>

              <div className="pd-problem-comparison">
                <Figure
                  src="evolucion-mar-menor.webp"
                  alt="Satellite comparison of the Mar Menor in 1985 on the left and 2018 on the right"
                  className="pd-problem-card"
                  caption={
                    <>
                      The Mar Menor in 1985 (left) and 2018 (right). Google
                      Earth Timelapse (Google, Landsat, Copernicus).{" "}
                      <ExternalLink href="https://s2.ppllstatics.com/laverdad/www/multimedia/202205/05/media/evolucion-mar-menor.jpg">
                        Source
                      </ExternalLink>
                      .
                    </>
                  }
                />
                <Figure
                  src="IMG_3864.webp"
                  alt="Dense green algal bloom covering part of a water surface"
                  className="pd-problem-card pd-problem-card--contain"
                  caption={
                    <>
                      A visible surface algal bloom.{" "}
                      <ExternalLink href="https://share.google/Rhd1awTH7KYSJlMKr">
                        Source
                      </ExternalLink>
                      .
                    </>
                  }
                />
              </div>
            </div>

            <div id="phosphorus-sources" className="pd-subsection">
              <h3>Where does all this phosphorus come from?</h3>
              <p>
                To design an effective solution, we first needed to look
                upstream and ask a more practical question:{" "}
                <strong>
                  where does phosphorus enter the water, and where could it be
                  captured before environmental damage occurs?
                </strong>
              </p>
              <p>
                Phosphorus reaches Spanish waters not only through agricultural
                runoff and urban sewage, but also through industrial point
                sources. Sectors such as fertiliser and chemical production,
                food and vegetable-oil processing, and wastewater management can
                generate phosphorus-containing effluents
                <Cite group="problem" numbers={[11]} />. Unlike diffuse
                pollution, these streams originate at identifiable facilities,
                creating an opportunity to remove phosphorus before it enters
                municipal treatment systems or natural waters.
              </p>
              <p>
                This industrial dimension became tangible through{" "}
                <strong>Bio-Oils Huelva</strong>, whose La Rábida plant produces
                biodiesel from vegetable and residual oils. Before
                transesterification, the raw oil must undergo{" "}
                <strong>degumming</strong> to remove phospholipids and other
                impurities. Some phospholipids can be removed with water,
                whereas others remain bound to calcium, magnesium or iron and
                are non-hydratable. Phosphoric acid destabilises these
                metal–phospholipid complexes, allowing the gums to be hydrated,
                neutralised and separated from the oil by centrifugation
                <Cite group="problem" numbers={[12, 13]} />.
              </p>
              <p>
                Phosphorus is therefore not simply an unwanted contaminant
                appearing at the end of the production line. It is closely
                linked to an essential industrial operation, and the same step
                that protects biodiesel quality can generate phosphorus-rich
                gums and wastewater that must subsequently be treated before
                discharge.
              </p>
            </div>

            <div id="current-removal" className="pd-subsection">
              <h3>Current phosphorus removal: effective, but not circular</h3>
              <p>
                Chemical precipitation is one of the most widely used methods
                for phosphorus removal because it is reliable, fast and
                relatively easy to integrate into existing wastewater-treatment
                plants. Iron or aluminium salts react with dissolved phosphate
                to form insoluble particles that can be separated with the
                sludge. Unlike biological treatment, the process does not depend
                on maintaining a specialised microbial community, and chemical
                dosing can be adjusted rapidly
                <Cite group="problem" numbers={[14, 15]} />.
              </p>
              <p>
                Greater removal efficiency usually requires higher chemical
                doses. This increases operating costs, may lower wastewater pH
                and produces additional sludge that must be managed. Moreover,
                phosphorus becomes mixed with metal phosphates, hydroxides and
                other solids. Once bound to iron or aluminium, it is less
                soluble and more difficult to recover
                <Cite group="problem" numbers={[16, 17]} />.
              </p>
              <p>
                Biological alternatives already exist.{" "}
                <strong>Enhanced Biological Phosphorus Removal (EBPR)</strong>{" "}
                enriches polyphosphate-accumulating organisms by cycling
                activated sludge through anaerobic and aerobic or anoxic
                conditions. These microorganisms take up more phosphorus than
                they require for growth and store it intracellularly as
                polyphosphate, allowing phosphorus to be removed with the excess
                biomass. Its performance, however, depends on maintaining the
                appropriate microbial community and operating conditions
                <Cite group="problem" numbers={[18]} />.
              </p>
              <p>
                <strong>
                  RePhlow does not attempt to reproduce a conventional EBPR
                  plant.
                </strong>{" "}
                Instead, it applies the same biological principle—microbial
                phosphate uptake and storage as polyphosphate—to a defined,
                engineered bacterium immobilised within a modular system. The
                aim is to make capture more controllable, compatible with
                existing infrastructure and better connected to subsequent
                recovery.
              </p>
              <p>
                Most existing technologies were developed primarily to{" "}
                <strong>remove</strong> phosphorus rather than preserve it as a
                recoverable resource. Phosphate rock is finite and its reserves
                are highly concentrated, with Morocco holding an estimated{" "}
                <strong>around 70% of known global reserves</strong>
                <Cite group="problem" numbers={[19]} />. Phosphorus lost in
                sludge or bound to metal precipitates must ultimately be
                replaced through further mining.
              </p>
            </div>

            <div id="stricter-limits" className="pd-subsection">
              <h3>Stricter limits, higher stakes</h3>
              <p>
                <strong>Directive (EU) 2024/3019</strong>, which will replace
                the current Urban Wastewater Treatment Directive from August
                2027, requires Member States to identify areas sensitive to
                eutrophication and progressively implement stricter
                phosphorus-removal requirements
                <Cite group="problem" numbers={[20]} />. It establishes
                total-phosphorus limits of <strong>0.7 mg/L</strong> for
                treatment plants serving between 10,000 and 150,000 population
                equivalents and <strong>0.5 mg/L</strong> for larger facilities,
                with implementation phased between 2033 and 2045.
              </p>
              <p>
                The Directive also strengthens control of non-domestic
                wastewater entering urban collecting systems. As municipal
                treatment plants face tighter limits, industries will experience
                increasing pressure to reduce nutrient loads before discharge.
                Failure to comply with the national rules and permit conditions
                adopted under the Directive may lead to effective, proportionate
                and dissuasive penalties
                <Cite group="problem" numbers={[20]} />.
              </p>
              <p>
                The challenge is therefore not only environmental.
                Eutrophication damages ecosystems and water quality, stricter
                regulation creates political and legal pressure, and compliance
                places an increasing economic burden on treatment plants and
                industrial operators. A clear gap remains for solutions that can
                achieve low phosphorus concentrations, integrate into existing
                infrastructure, remain economically viable and preserve
                phosphorus for subsequent recovery.
              </p>
            </div>

            <AccordionSection title="References" className="pd-references-accordion">
              <ol className="pd-reference-list" data-reference-group="problem">
                <Ref group="problem" number={1}>
                  Wagner, C. A. (2024). The basics of phosphate metabolism.{" "}
                  <em>Nephrology Dialysis Transplantation, 39</em> (2), 190–201.
                  DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1093/ndt/gfad188">
                    10.1093/ndt/gfad188
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="problem" number={2}>
                  United States Environmental Protection Agency. (2026).{" "}
                  <em>Basic Information on Nutrient Pollution</em>. US EPA.
                </Ref>
                <Ref group="problem" number={3}>
                  Wurtsbaugh, W. A., Paerl, H. W., &amp; Dodds, W. K. (2019).
                  Nutrients, eutrophication and harmful algal blooms along the
                  freshwater to marine continuum. <em>WIREs Water, 6</em> (5),
                  e1373. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1002/wat2.1373">
                    10.1002/wat2.1373
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="problem" number={4}>
                  Smith, V. H., Tilman, G. D., &amp; Nekola, J. C. (1999).
                  Eutrophication: impacts of excess nutrient inputs on freshwater,
                  marine, and terrestrial ecosystems.{" "}
                  <em>Environmental Pollution, 100</em> (1–3), 179–196. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1016/S0269-7491(99)00091-3">
                    10.1016/S0269-7491(99)00091-3
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="problem" number={5}>
                  Zhang, Y., Li, M., Dong, J., et al. (2021). A critical review of
                  methods for analyzing freshwater eutrophication.{" "}
                  <em>Water, 13</em> (2), 225. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.3390/w13020225">
                    10.3390/w13020225
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="problem" number={6}>
                  Maúre, E. R., Terauchi, G., Ishizaka, J., Clinton, N., &amp;
                  DeWitt, M. (2021). Globally consistent assessment of coastal
                  eutrophication. <em>Nature Communications, 12</em>, 6142. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1038/s41467-021-26391-9">
                    10.1038/s41467-021-26391-9
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="problem" number={7}>
                  United Nations Environment Programme. (2025).{" "}
                  <em>
                    How Spain is turning an iconic lagoon from “green soup” into a
                    natural oasis
                  </em>
                  . UNEP.
                </Ref>
                <Ref group="problem" number={8}>
                  Heezen, J., &amp; Fernández López, L. (2022).{" "}
                  <em>
                    PETI fact-finding visit to Mar Menor, Spain: 23–25 February
                    2022
                  </em>
                  . European Parliament.
                </Ref>
                <Ref group="problem" number={9}>
                  Aparicio, G., Camacho, M., &amp; Maté-Sánchez-Val, M. (2024).
                  Quantifying the impact: Are coastal areas impoverished by marine
                  pollution? <em>Ecological Economics, 221</em>, 108213. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1016/j.ecolecon.2024.108213">
                    10.1016/j.ecolecon.2024.108213
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="problem" number={10}>
                  Lamas Rodríguez, M., Garcia Lorenzo, M. L., Medina Magro, M.,
                  &amp; Perez Quiros, G. (2023). Impact of climate risk
                  materialization and ecological deterioration on house prices in
                  Mar Menor, Spain. <em>Scientific Reports, 13</em>, 11772. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1038/s41598-023-39022-8">
                    10.1038/s41598-023-39022-8
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="problem" number={11}>
                  PRTR-España, Ministerio para la Transición Ecológica y el Reto
                  Demográfico.{" "}
                  <em>
                    Spanish Pollutant Release and Transfer Register:
                    total-phosphorus releases to water by industrial activity
                  </em>
                  . Database accessed in 2026.
                </Ref>
                <Ref group="problem" number={12}>
                  Junta de Andalucía. (2017).{" "}
                  <em>
                    Integrated Environmental Authorisation for the Bio-Oils Huelva
                    “La Rábida” biodiesel plant
                  </em>
                  . File AAI/HU/075.
                </Ref>
                <Ref group="problem" number={13}>
                  American Oil Chemists&apos; Society. <em>Chemical Degumming</em>{" "}
                  and <em>Oil Refining</em>. AOCS Lipid Library.
                </Ref>
                <Ref group="problem" number={14}>
                  Zheng, Y., Wan, Y., Zhang, Y., et al. (2023). Recovery of
                  phosphorus from wastewater: a review based on current phosphorus
                  removal technologies.{" "}
                  <em>
                    Critical Reviews in Environmental Science and Technology, 53
                  </em>{" "}
                  (11), 1148–1172. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1080/10643389.2022.2128194">
                    10.1080/10643389.2022.2128194
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="problem" number={15}>
                  United States Environmental Protection Agency. (2010).{" "}
                  <em>Nutrient Control Design Manual</em> (EPA/600/R-10/100).
                </Ref>
                <Ref group="problem" number={16}>
                  Minnesota Pollution Control Agency. (2006).{" "}
                  <em>Phosphorus Treatment and Removal Technologies</em>{" "}
                  (WQ-WWTP9-02).
                </Ref>
                <Ref group="problem" number={17}>
                  Uzkurt Kaljunen, J., Al-Juboori, R. A., Khunjar, W., Mikola, A.,
                  &amp; Wells, G. (2022). Phosphorus recovery alternatives for
                  sludge from chemical phosphorus removal processes.{" "}
                  <em>Sustainable Materials and Technologies, 34</em>, e00514.
                  DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1016/j.susmat.2022.e00514">
                    10.1016/j.susmat.2022.e00514
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="problem" number={18}>
                  Law, Y., Kirkegaard, R. H., Cokro, A. A., et al. (2016).
                  Integrative microbial community analysis reveals full-scale
                  enhanced biological phosphorus removal under tropical
                  conditions. <em>Scientific Reports, 6</em>, 25719. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1038/srep25719">
                    10.1038/srep25719
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="problem" number={19}>
                  U.S. Geological Survey. (2025).{" "}
                  <em>The Mineral Industry of Morocco in 2020–2021</em>. U.S.
                  Geological Survey Minerals Yearbook.
                </Ref>
                <Ref group="problem" number={20}>
                  European Parliament and Council of the European Union. (2024).{" "}
                  <em>
                    Directive (EU) 2024/3019 concerning urban wastewater treatment
                    (recast)
                  </em>
                  .{" "}
                  <ExternalLink href="https://eur-lex.europa.eu/eli/dir/2024/3019/oj">
                    Official full text
                  </ExternalLink>
                  .
                </Ref>
              </ol>
            </AccordionSection>
          </section>
        </div>

        <div className="vsi-wrap">
          <section id="our-solution-visual-index" className="pd-section">
            <div className="pd-content vsi-intro">
              <h2>2. Our solution</h2>
              <p className="pd-section-lede">
                <strong>RePhlow</strong> is a modular bioreactor that uses
                synthetic biology to capture and recover both inorganic and
                organic phosphorus from industrial wastewater. Engineered
                microorganisms are encapsulated in alginate core-shells to
                accumulate phosphate, immobilised enzymes convert organic
                phosphorus into a capturable form, and an ultrafiltration
                barrier provides additional biocontainment. The accumulated
                phosphate is then recovered and converted into a value-added
                product through a multi-enzyme system.
              </p>
              <p className="vsi-intro-hint">
                Explore the six connected modules and select one to continue to
                its full description.
              </p>
            </div>
            <VisualIndex />
          </section>
        </div>

        <div className="pd-content vsi-details">
          <section id="hardware" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Hardware</h2>
            <BlockIntro
              image="assets/our-solution/hardware-clean.webp"
              alt="Illustration of the rotating-bed bioreactor and filtration system"
            >
              A modular <strong>rotating-bed bioreactor</strong> and filtration
              system designed for industrial scale-up, operational stability and
              phosphorus recovery.
            </BlockIntro>

            <div className="pd-subsection">
              <h3>Why a rotating-bed bioreactor?</h3>
              <p>
                RePhlow must not only remove phosphorus from industrial
                effluent, but do so using encapsulated bacteria that can
                subsequently be recovered for the valorisation stage. The system
                must ensure efficient contact between the effluent and the
                capsules, maintain their mechanical integrity and facilitate
                their recovery with minimal losses.
              </p>
              <p>
                The hardware must also provide a stable platform for integrating
                the other project modules. During treatment, the effluent must
                remain in contact with the encapsulated bacteria long enough to
                promote phosphorus uptake while preserving mechanical stability
                and future industrial scalability.
              </p>
              <p>
                RePhlow was therefore designed as a rotating-bed bioreactor
                integrated with an ultrafiltration stage, balancing treatment
                efficiency, capsule protection, biological material recovery,
                effluent quality and process scalability.
              </p>
            </div>

            <div className="pd-subsection pd-subsection--with-float">
              <h3>Rotating-bed design</h3>
              <InlineFigure
                image="assets/our-solution/biorreactor-filtro.webp"
                alt="Bioreactor vessel containing a permeable rotating basket"
                caption="Permeable rotating basket."
              />
              <p>
                Conventional stirred-tank reactors keep particles suspended
                using mechanical agitators. Although this provides efficient
                mixing, alginate capsules remain in continuous motion and
                collide with one another and with reactor components. These
                stresses can compromise capsule integrity and make recovery more
                difficult.
              </p>
              <p>
                To overcome these limitations, we selected a{" "}
                <strong>permeable rotating basket</strong> that confines the
                capsules throughout operation. Effluent passes continuously
                through the bed while the capsules remain contained, reducing
                collisions and simplifying their recovery.
              </p>
              <p>
                A <strong>speed-control system</strong> balances treatment
                efficiency and capsule preservation. Insufficient rotation
                creates poorly circulated zones; excessive speed increases
                mechanical stress and the risk of breakage. The basket also
                incorporates inert spheres that distribute the capsules more
                uniformly, prevent compaction and increase effective contact
                without adding damaging agitation.
              </p>
            </div>

            <div className="pd-subsection pd-subsection--with-float">
              <h3>Why a second filtration barrier?</h3>
              <InlineFigure
                image="assets/our-solution/depuradora.webp"
                alt="Illustration of the second filtration unit"
                caption="Second filtration barrier."
              />
              <p>
                The basket retains intact capsules, but it cannot guarantee the
                removal of fine particles, biological residues or bacteria
                released from damaged capsules. The degumming effluent may also
                contain suspended solids that must be removed before reuse or
                discharge.
              </p>
              <p>
                The <strong>ultrafiltration stage</strong> therefore acts as a
                second separation and biocontainment barrier. It removes smaller
                particles while the first stage enables efficient capsule
                recovery. The goal is not ultrapure water, but an effluent
                suitable for reuse or discharge with an appropriate balance
                between performance, energy consumption and operating cost.
              </p>
            </div>

            <div className="pd-subsection">
              <h3>Scalability and operation</h3>
              <p>
                The architecture can be scaled by increasing basket dimensions
                or, more flexibly, by operating several smaller modules in
                parallel. Parallel modules simplify manufacturing and allow
                treatment capacity to grow with demand while enabling
                maintenance or replacement without stopping the entire plant.
              </p>
              <p>
                During operation, industrial effluent passes through the
                rotating capsule bed, where phosphorus uptake occurs. The
                capsules remain confined and can be transferred directly to the{" "}
                <SectionLink href="#revalorisation">
                  revalorisation module
                </SectionLink>
                . The treated effluent then passes through ultrafiltration,
                completing a modular capture-and-recovery cycle.
              </p>
            </div>
          </section>

          <section id="encapsulation" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Bacterial encapsulation</h2>
            <BlockIntro
              image="assets/our-solution/bacteria-encapsulada.webp"
              alt="Illustration of an engineered bacterium encapsulated inside an alginate core-shell"
            >
              Design, optimisation and validation of{" "}
              <strong>alginate core-shells</strong> to maintain bacterial
              stability, viability, containment and reuse.
            </BlockIntro>

            <div className="pd-subsection">
              <h3>Why immobilise the bacteria?</h3>
              <p>
                We chose to immobilise the engineered bacteria rather than use
                them in suspension. Encapsulation provides a physical barrier
                that reduces the risk of environmental release while allowing
                water, nutrients, phosphate and metabolic products to diffuse.
                This containment is essential when deploying genetically
                engineered bacteria in an effluent stream.
              </p>
              <p>
                Immobilisation also facilitates bacterial recovery and reuse,
                allowing the same biological material to operate across multiple
                treatment cycles. It increases operational stability and makes
                the biological module compatible with the{" "}
                <SectionLink href="#hardware">
                  rotating-bed hardware
                </SectionLink>
                .
              </p>
            </div>

            <div className="pd-subsection">
              <h3>Why alginate?</h3>
              <p>
                Alginate is a natural polysaccharide composed of two C-5
                epimeric residues: α-L-gulopyranuronic acid (G) and
                β-D-mannopyranuronic acid (M). It is biocompatible, inexpensive
                and non-toxic. In contact with calcium ions it rapidly forms a
                porous hydrogel under mild conditions, preserving bacterial
                viability while allowing efficient mass transfer.
              </p>
              <p>
                The proportion of G and M residues varies with source and batch,
                and governs calcium-mediated crosslinking, gel stiffness and
                mechanical stability. We therefore characterised our raw
                material by FTIR before design work to understand its M/G
                composition and the expected hydrogel behaviour. The
                corresponding experimental work is described in{" "}
                <WikiLink to="/experiments">Experiments</WikiLink> and
                <WikiLink to="/results"> Results</WikiLink>.
              </p>

              <div className="pd-monomer-grid">
                <Figure
                  src="l-guluronic-acid.webp"
                  alt="Chemical structure of L-guluronic acid"
                  caption={
                    <>
                      <strong>L-guluronic acid (G).</strong>{" "}
                      <ExternalLink href="https://chemapps.stolaf.edu/jmol/jmol.php?model=C%28%3DO%29%5BC%40H%5D%28%5BC%40H%5D%28%5BC%40%40H%5D%28%5BC%40H%5D%28C%28%3DO%29O%29O%29O%29O%29O">
                        Explore the 3D structure
                      </ExternalLink>
                    </>
                  }
                  className="pd-monomer"
                />
                <Figure
                  src="d-mannuronic-acid.webp"
                  alt="Chemical structure of D-mannuronic acid"
                  caption={
                    <>
                      <strong>D-mannuronic acid (M).</strong>{" "}
                      <ExternalLink href="https://chemapps.stolaf.edu/jmol/jmol.php?model=%5BC%40%40H%5D1%28%5BC%40%40H%5D%28%5BC%40H%5D%28OC%28%5BC%40H%5D1O%29O%29C%28%3DO%29O%29O%29O">
                        Explore the 3D structure
                      </ExternalLink>
                    </>
                  }
                  className="pd-monomer"
                />
              </div>
            </div>

            <div className="pd-subsection">
              <h3>From beads to core-shells</h3>
              <p>
                Conventional beads immobilise bacteria throughout the alginate
                matrix, whereas core-shell capsules create a defined internal
                compartment. Although core-shells are the preferred final
                architecture, starting with beads simplified the system to a
                single alginate phase and allowed us to establish the parameters
                governing droplet formation and gelation before introducing a
                second phase.
              </p>
              <p>
                Core-shells separate the bacterial compartment from the alginate
                matrix, creating a liquid core surrounded by a solid shell. This
                provides a clearer physical barrier, retains the bacteria in a
                recoverable compartment and creates an outer surface that can be
                functionalised with the enzymes described in the
                <SectionLink href="#enzyme">
                  {" "}
                  enzyme immobilisation block
                </SectionLink>
                .
              </p>
              <Figure
                src="encapsulation-comparison.svg"
                alt="Comparison between bacteria immobilised throughout an alginate bead and bacteria confined inside an alginate core-shell capsule"
                caption={
                  <>
                    <strong>Figure 1.</strong> Conventional alginate bead (left)
                    and the core-shell architecture selected for RePhlow
                    (right).
                  </>
                }
                className="pd-figure--wide"
              />
            </div>

            <div className="pd-subsection">
              <h3>Design requirements and validation</h3>
              <p>
                Outer alginate concentration, inner calcium chloride
                concentration and the relative flow rates of both phases jointly
                determine capsule geometry and shell structure. Optimising these
                variables is necessary to obtain homogeneous, reproducible and
                mechanically stable capsules. A smaller diameter also increases
                surface-to-volume ratio, potentially increasing the immobilised
                enzyme available per encapsulated volume.
              </p>
              <p>
                Capsules must withstand collisions, handling, recovery and
                reuse. Mechanical failure would compromise physical containment
                and complicate downstream recovery. We therefore evaluated
                chemical stability, physical containment using magnetite
                nanoparticles as a stringent surrogate cargo, and mechanical
                integrity under compression. TGA-DSC and SEM further
                characterised thermal behaviour, water content, surface
                morphology and microstructure. The design-build-test cycle is
                documented in
                <WikiLink to="/engineering"> Engineering</WikiLink>, with
                validation in
                <WikiLink to="/experiments"> Experiments</WikiLink> and
                <WikiLink to="/results"> Results</WikiLink>.
              </p>
            </div>
          </section>

          <section id="enzyme" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Enzyme immobilisation</h2>
            <BlockIntro
              image="assets/our-solution/enzima-clean.webp"
              alt="Illustration of immobilised enzymes releasing phosphate from an organic substrate"
            >
              Optimised immobilisation of{" "}
              <strong>phosphatase activities</strong> for the hydrolysis of
              diverse organic phosphate esters.
            </BlockIntro>

            <div className="pd-subsection">
              <h3>Why the bacteria cannot do it alone</h3>
              <p>
                The engineered <em>Pseudomonas putida</em> described in the
                <SectionLink href="#genetic">
                  {" "}
                  genetic engineering block
                </SectionLink>{" "}
                imports phosphorus as free orthophosphate. Acid degumming,
                however, produces partially hydrolysed phospholipids, phytate
                and other phosphoesters in which phosphorus remains covalently
                bound to organic matter and is therefore invisible to a
                phosphate transporter
                <Cite group="enzyme" numbers={[1, 2]} />.
              </p>
              <p>
                We therefore propose a hydrolytic layer on the core-shell
                surface: a set of enzymes that mineralise organic phosphorus
                into orthophosphate before it reaches the bacteria. This
                required answering two questions:{" "}
                <strong>
                  which enzymes should be used, and how can they be attached
                  without switching them off?
                </strong>
              </p>
              <Figure
                src="enzyme-workflow.webp"
                alt="Six-stage workflow from enzyme mining and cloning to expression, purification, characterisation and immobilisation"
                caption={
                  <>
                    <strong>Figure 2.</strong> Workflow of the enzyme
                    immobilisation block. Stages 1–5 are detailed in{" "}
                    <WikiLink to="/engineering">Engineering</WikiLink> and{" "}
                    <WikiLink to="/experiments">Experiments</WikiLink>; stage 6
                    addresses the immobilisation chemistry.
                  </>
                }
                className="pd-figure--wide"
              />
            </div>

            <div className="pd-subsection">
              <h3>A cocktail rather than a single enzyme</h3>
              <p>
                No single hydrolase clears the degumming stream because its
                phosphorus arrives in chemically distinct forms
                <Cite group="enzyme" numbers={[3]} />. Type A phospholipases
                remove acyl chains, type C phospholipases cleave the
                glycerol–phosphate bond, non-specific acid phosphatases release
                orthophosphate from monoesters, and phytases attack <em>myo</em>
                -inositol hexaphosphate
                <Cite group="enzyme" numbers={[4]} />.
              </p>
              <p>
                Candidates had to retain useful activity at the reactor&apos;s
                pH 5.0 and 30 °C and be producible in <em>Escherichia coli</em>{" "}
                without post-translational modification. They were mined with
                EnzymeMiner and filtered against BRENDA and UniProt
                <Cite group="enzyme" numbers={[5, 6, 7, 8]} />. Phospholipase C
                was routed to a cell-free system because its expression is
                intrinsically cytotoxic
                <Cite group="enzyme" numbers={[9]} />.
              </p>

              <div
                className="pd-table-wrap"
                role="region"
                aria-label="Enzyme panel"
                tabIndex={0}
              >
                <table className="pd-table">
                  <caption>
                    <strong>Table 1.</strong> Enzyme panel proposed for the
                    hydrolytic layer and identified commercial alternatives.
                  </caption>
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th>Gene</th>
                      <th>Source organism</th>
                      <th>Commercial alternative</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={2}>Phospholipase C</td>
                      <td>
                        <em>plc_Tk</em>
                      </td>
                      <td>
                        <em>Thermococcus kodakarensis</em>
                      </td>
                      <td rowSpan={2}>
                        PLC from <em>Clostridium perfringens</em> or{" "}
                        <em>Bacillus cereus</em>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>cerA_Bc</em>
                      </td>
                      <td>
                        <em>Bacillus cereus</em>
                      </td>
                    </tr>
                    <tr>
                      <td>Phospholipase A</td>
                      <td>
                        <em>estE1_MG</em>
                      </td>
                      <td>Metagenome</td>
                      <td>Lecitase® Ultra (PLA1) or pancreatin (PLA2)</td>
                    </tr>
                    <tr>
                      <td rowSpan={2}>Phytase</td>
                      <td>
                        <em>appA_Yi</em>
                      </td>
                      <td>
                        <em>Yersinia intermedia</em>
                      </td>
                      <td rowSpan={2}>Axtra® PHY or Ronozyme® HiPhos</td>
                    </tr>
                    <tr>
                      <td>
                        <em>phyA_Op</em>
                      </td>
                      <td>
                        <em>Obesumbacterium proteus</em>
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={2}>Non-specific acid phosphatase</td>
                      <td>
                        <em>M2-32_MG</em>
                      </td>
                      <td>Metagenome</td>
                      <td rowSpan={2}>
                        Acid phosphatase from potato or wheat germ
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>aphA_Ec</em>
                      </td>
                      <td>
                        <em>Escherichia coli</em>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Homology models guided affinity-tag placement and
                expression-host selection
                <Cite group="enzyme" numbers={[10, 11]} />. The panel was then
                expressed, purified and assayed against a bulky phosphodiester
                substrate under process-relevant pH and temperature
                <Cite group="enzyme" numbers={[12]} />. Candidate performance is
                reported in <WikiLink to="/results">Results</WikiLink>.
              </p>
            </div>

            <div className="pd-subsection">
              <h3>A model system for the capsule surface</h3>
              <p>
                The final support is the alginate–chitosan–genipin capsule
                described in the
                <SectionLink href="#encapsulation">
                  {" "}
                  encapsulation block
                </SectionLink>
                . To develop the chemistry without confounding it with capsule
                variability, we used
                <strong> MANAE-agarose</strong> as a surrogate aminated support
                and glutaraldehyde as a crosslinker
                <Cite group="enzyme" numbers={[13]} />.
              </p>
              <p>
                <strong>Lecitase® Ultra</strong> was deliberately selected as a
                demanding model. Its mobile lid must open through interfacial
                activation, and the exposed hydrophobic surface promotes dimer
                formation
                <Cite group="enzyme" numbers={[14, 15]} />. A support that
                anchors and stabilises this enzyme in an active state should
                accommodate the lidless phosphatases and phytases more easily
                <Cite group="enzyme" numbers={[16]} />.
              </p>
            </div>

            <div className="pd-subsection">
              <h3>Two ways of forming the same bond</h3>
              <p>
                We compared covalent capture on a pre-activated support with
                ionic adsorption followed by crosslinking, and tested both with
                and without Triton X-100
                <Cite group="enzyme" numbers={[17, 18]} />. The selected
                strategy was
                <strong>
                  {" "}
                  ionic adsorption followed by crosslinking, without detergent
                </strong>
                . It recovered more activity from the same amount of enzyme and
                support while allowing electrostatics to orient the enzyme
                before covalent fixation.
              </p>
              <p>
                This is the chemistry we propose to translate to the chitosan
                shell, replacing glutaraldehyde with genipin. The resulting
                outer layer must keep acid-active hydrolases firmly anchored
                through repeated cycles while orienting their active sites
                towards the effluent. Only then can organic phosphorus reach the
                encapsulated bacteria in the form they can import.
              </p>
            </div>

            <AccordionSection title="References" className="pd-references-accordion">
              <ol className="pd-reference-list" data-reference-group="enzyme">
                <Ref group="enzyme" number={1}>
                  Dijkstra, A. J. (2010). Enzymatic degumming.{" "}
                  <em>European Journal of Lipid Science and Technology, 112</em>{" "}
                  (11), 1178–1189. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1002/ejlt.201000320">
                    10.1002/ejlt.201000320
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={2}>
                  Costa, E., Almeida, M. F., Alvim-Ferraz, M. C., &amp; Dias, J.
                  M. (2018). Effect of <em>Crambe abyssinica</em> oil degumming in
                  phosphorus concentration of refined oil and derived biodiesel.{" "}
                  <em>Renewable Energy, 124</em>, 27–33. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1016/j.renene.2017.08.089">
                    10.1016/j.renene.2017.08.089
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={3}>
                  Aloulou, A., Rahier, R., Arhab, Y., Noiriel, A., &amp;
                  Abousalham, A. (2018). Phospholipases: an overview. In{" "}
                  <em>Lipases and Phospholipases</em>, 69–105. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1007/978-1-4939-8672-9_3">
                    10.1007/978-1-4939-8672-9_3
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={4}>
                  Huang, H. et al. (2006). A novel phytase with preferable
                  characteristics from <em>Yersinia intermedia</em>.{" "}
                  <em>
                    Biochemical and Biophysical Research Communications, 350
                  </em>{" "}
                  (4), 884–889. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1016/j.bbrc.2006.09.118">
                    10.1016/j.bbrc.2006.09.118
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={5}>
                  Thaller, M. C., Schippa, S., Bonci, A., Cresti, S., &amp;
                  Rossolini, G. M. (1997). Identification of the <em>aphA</em>{" "}
                  gene and characterisation of its product.{" "}
                  <em>FEMS Microbiology Letters, 146</em> (2), 191–198. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1111/j.1574-6968.1997.tb10192.x">
                    10.1111/j.1574-6968.1997.tb10192.x
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={6}>
                  Hon, J. et al. (2020). EnzymeMiner: automated mining of soluble
                  enzymes. <em>Nucleic Acids Research, 48</em> (W1), W104–W109.
                  DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1093/nar/gkaa372">
                    10.1093/nar/gkaa372
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={7}>
                  Hauenstein, J. et al. (2026). BRENDA in 2026.{" "}
                  <em>Nucleic Acids Research, 54</em> (D1), D527–D534. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1093/nar/gkaf1113">
                    10.1093/nar/gkaf1113
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={8}>
                  The UniProt Consortium. (2025). UniProt: the Universal Protein
                  Knowledgebase in 2025. <em>Nucleic Acids Research, 53</em> (D1),
                  D609–D617. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1093/nar/gkae1010">
                    10.1093/nar/gkae1010
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={9}>
                  Titball, R. W. (1993). Bacterial phospholipases C.{" "}
                  <em>Microbiological Reviews, 57</em> (2), 347–366. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1128/mr.57.2.347-366.1993">
                    10.1128/mr.57.2.347-366.1993
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={10}>
                  Waterhouse, A. et al. (2018). SWISS-MODEL: homology modelling of
                  protein structures and complexes.{" "}
                  <em>Nucleic Acids Research, 46</em> (W1), W296–W303. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1093/nar/gky427">
                    10.1093/nar/gky427
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={11}>
                  Mura, C., McCrimmon, C. M., Vertrees, J., &amp; Sawaya, M. R.
                  (2010). An introduction to biomolecular graphics.{" "}
                  <em>PLoS Computational Biology, 6</em> (8), e1000918. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1371/journal.pcbi.1000918">
                    10.1371/journal.pcbi.1000918
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={12}>
                  Andersch, M. A., &amp; Szczypinski, A. J. (1947). Use of{" "}
                  <em>p</em>-nitrophenylphosphate in acid-phosphatase
                  determination.{" "}
                  <em>American Journal of Clinical Pathology, 17</em> (7),
                  571–574. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1093/ajcp/17.7_ts.571">
                    10.1093/ajcp/17.7_ts.571
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={13}>
                  Braham, S. A. et al. (2021). Positive effect of glycerol on the
                  stability of immobilized enzymes.{" "}
                  <em>Process Biochemistry, 102</em>, 108–121. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1016/j.procbio.2020.12.015">
                    10.1016/j.procbio.2020.12.015
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={14}>
                  Virgen-Ortíz, J. J. et al. (2019). Lecitase Ultra: a
                  phospholipase with great potential in biocatalysis.{" "}
                  <em>Molecular Catalysis, 473</em>, 110405. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1016/j.mcat.2019.110405">
                    10.1016/j.mcat.2019.110405
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={15}>
                  Andrés-Sanz, D. et al. (2021). Stabilization of Lecitase Ultra®
                  by immobilization and fixation of bimolecular aggregates.{" "}
                  <em>Catalysts, 11</em> (9), 1067. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.3390/catal11091067">
                    10.3390/catal11091067
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={16}>
                  Carballares, D., Rocha-Martín, J., &amp; Fernandez-Lafuente, R.
                  (2022). Coimmobilization of lipases exhibiting different
                  stability ranges.{" "}
                  <em>International Journal of Biological Macromolecules, 206</em>
                  , 580–590. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1016/j.ijbiomac.2022.02.084">
                    10.1016/j.ijbiomac.2022.02.084
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={17}>
                  López-Gallego, F. et al. (2005). Enzyme stabilization by
                  glutaraldehyde crosslinking of adsorbed proteins on aminated
                  supports. <em>Journal of Biotechnology, 119</em> (1), 70–75.
                  DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1016/j.jbiotec.2005.05.021">
                    10.1016/j.jbiotec.2005.05.021
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="enzyme" number={18}>
                  Mateo, C. et al. (2010). Improvement of enzyme properties with a
                  two-step immobilization process. <em>Biomacromolecules, 11</em>{" "}
                  (11), 3112–3117. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1021/bm100916r">
                    10.1021/bm100916r
                  </ExternalLink>
                  .
                </Ref>
              </ol>
            </AccordionSection>
          </section>

          <section id="genetic" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Genetic engineering</h2>
            <BlockIntro
              image="assets/our-solution/bacteria-genetic.webp"
              alt="Illustration of the engineered Pseudomonas putida cell"
            >
              Redesigning <em>Pseudomonas putida</em> KT2440 to enhance
              <strong> phosphate uptake</strong> and intracellular retention as
              polyphosphate.
            </BlockIntro>

            <div className="pd-subsection">
              <h3>Turning available phosphate into stored phosphate</h3>
              <p>
                Phosphorus must cross the cell membrane and remain inside the
                bacterium rather than returning to the water. We therefore use
                synthetic biology to redesign
                <em> P. putida</em> KT2440 as a defined chassis for phosphate
                uptake and intracellular polyphosphate storage.
              </p>
            </div>

            <div className="pd-subsection">
              <h3>From nature&apos;s PAO to an engineerable chassis</h3>
              <p>
                Enhanced biological phosphorus removal relies on
                polyphosphate-accumulating organisms (PAOs). The
                best-characterised model is
                <em> Candidatus Accumulibacter phosphatis</em>
                <Cite group="genetic" numbers={[1, 2]} />. It alternates between
                anaerobic and aerobic phases, releasing phosphate while storing
                carbon and subsequently using that reserve to drive high-rate
                phosphate uptake and polyphosphate resynthesis
                <Cite group="genetic" numbers={[2, 3]} />.
              </p>
              <p>
                Its polyphosphate-accumulating capacity is closely associated
                with
                <em> ppk1</em>, which is used as a phylogenetic marker for
                <em> Accumulibacter</em> lineages
                <Cite group="genetic" numbers={[4]} />. Because
                <em> Accumulibacter</em> has never been isolated in pure
                culture, we use it as a<strong> metabolic blueprint</strong> and
                reconstruct selected functions in a tractable chassis
                <Cite group="genetic" numbers={[2, 3]} />.
              </p>
              <p>
                <em>P. putida</em> KT2440 is robust, non-pathogenic, genetically
                accessible and supported by an established synthetic-biology
                toolkit. It is HV1-certified and tolerates demanding
                environmental and oxidative conditions
                <Cite group="genetic" numbers={[5, 6, 7, 8]} />. It already
                contains the basic machinery for phosphate transport, Pho
                regulation and polyphosphate metabolism
                <Cite group="genetic" numbers={[5, 6, 9, 11]} />, so our aim is
                to rebalance an existing phosphorus network rather than build a
                new pathway from scratch.
              </p>
            </div>

            <div className="pd-subsection">
              <h3>From gene comparison to gene selection</h3>
              <p>
                We compared phosphorus-metabolism networks in <em>P. putida</em>{" "}
                KT2440 (<strong>AE015451.2</strong>) and{" "}
                <em>Ca. Accumulibacter phosphatis</em> UW-1 (
                <strong>CP001715; GCF_000024165.1</strong>)
                <Cite group="genetic" numbers={[11]} />, examining phosphate
                transport, polyphosphate metabolism, Pho regulation, copy
                number, protein sequence and regulatory context.
              </p>
              <p>
                Published metatranscriptomic studies showed that the
                high-affinity Pst system is induced as extracellular phosphate
                becomes limiting
                <Cite group="genetic" numbers={[3, 10]} />. Together with the
                central role of
                <em> ppk1</em>, this supported the selection of <em>pstSCAB</em>{" "}
                and <em>ppk1</em> to reinforce uptake and synthesis. The
                endogenous <em>ppx</em>, <em>ppkB</em> and
                <em> pitB</em> genes were selected for functional inactivation
                because they contribute to polyphosphate degradation,
                consumption and potential phosphate efflux
                <Cite group="genetic" numbers={[9, 13, 14, 15]} />.
              </p>
            </div>

            <div className="pd-subsection">
              <h3>Rebalancing phosphorus flux</h3>
              <blockquote className="pd-equation-callout">
                <strong>Net polyphosphate accumulation</strong> = phosphate
                uptake + polyphosphate synthesis − degradation − consumption −
                efflux
              </blockquote>
              <p>
                We act on both sides of this balance: removing native routes
                that draw phosphorus away from storage and adding modules that
                strengthen phosphate uptake and polyphosphate synthesis.
              </p>

              <div
                className="pd-table-wrap"
                role="region"
                aria-label="Genetic engineering strategy"
                tabIndex={0}
              >
                <table className="pd-table">
                  <caption>
                    <strong>Table 2.</strong> Relationship between each
                    phosphorus-flux term and its genetic target.
                  </caption>
                  <thead>
                    <tr>
                      <th>Strategy</th>
                      <th>Flux term</th>
                      <th>Target</th>
                      <th>Protein identifier</th>
                      <th>Intended role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Heterologous expression</td>
                      <td>↑ Uptake</td>
                      <td>
                        <em>pstSCAB</em>
                      </td>
                      <td>
                        PstS: WP_015766498; PstC: WP_085953056; PstA:
                        WP_015766496; PstB: WP_015766495
                      </td>
                      <td>
                        Introduce an ATP-driven, high-affinity phosphate
                        importer.
                      </td>
                    </tr>
                    <tr>
                      <td>Heterologous expression</td>
                      <td>↑ Synthesis</td>
                      <td>
                        <em>ppk1</em>
                      </td>
                      <td>WP_015765634.1</td>
                      <td>
                        Increase conversion of ATP-derived phosphate into
                        polyphosphate.
                      </td>
                    </tr>
                    <tr>
                      <td>Functional inactivation</td>
                      <td>↓ Degradation</td>
                      <td>
                        <em>ppx</em>
                      </td>
                      <td>AAN70781</td>
                      <td>
                        Reduce breakdown of the intracellular polyphosphate
                        pool.
                      </td>
                    </tr>
                    <tr>
                      <td>Functional inactivation</td>
                      <td>↓ Consumption</td>
                      <td>
                        <em>ppkB</em>
                      </td>
                      <td>AAN66337</td>
                      <td>
                        Limit use of stored polyphosphate for nucleotide
                        regeneration.
                      </td>
                    </tr>
                    <tr>
                      <td>Functional inactivation</td>
                      <td>↓ Efflux</td>
                      <td>
                        <em>pitB</em>
                      </td>
                      <td>AAN66996</td>
                      <td>
                        Reduce phosphate loss through the reversible Pit route.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                The three endogenous genes are functionally inactivated with the
                <strong> pMBEC multiplex CRISPR base-editing system</strong>,
                introducing C·G-to-T·A substitutions that generate premature
                stop codons without large chromosomal deletions or donor DNA
                <Cite group="genetic" numbers={[16]} />. The two synthetic{" "}
                <em>Accumulibacter</em> modules are expressed from modular
                broad-host-range pSEVA vectors
                <Cite group="genetic" numbers={[17]} />.
              </p>
              <Figure
                src="engineered-phosphorus-pathway.original.webp"
                alt="Engineered phosphate uptake and polyphosphate storage pathway in Pseudomonas putida"
                caption={
                  <>
                    <strong>Figure 3.</strong> Engineered
                    phosphorus-accumulation pathway in <em>P. putida</em>{" "}
                    KT2440. Green modules are expressed heterologously; red
                    modules are functionally inactivated.
                  </>
                }
                className="pd-figure--pathway"
              />
              <p>
                Together, these interventions are intended to create a
                <strong> synthetic polyphosphate-accumulating organism</strong>:
                phosphate enters through a reinforced high-affinity transporter,
                is channelled into polyphosphate by PPK1 and is retained by
                reducing competing routes. Once cells become saturated, the
                intracellular polyphosphate becomes the feedstock for the
                <SectionLink href="#revalorisation">
                  {" "}
                  revalorisation module
                </SectionLink>
                .
              </p>
            </div>

            <AccordionSection title="References" className="pd-references-accordion">
              <ol className="pd-reference-list" data-reference-group="genetic">
                <Ref group="genetic" number={1}>
                  Hesselmann, R. P. X., Werlen, C., Hahn, D., van der Meer, J. R.,
                  &amp; Zehnder, A. J. B. (1999). Enrichment and detection of a
                  bacterium that performs enhanced biological phosphate removal.{" "}
                  <em>Systematic and Applied Microbiology, 22</em> (3), 454–465.
                  DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1016/S0723-2020(99)80055-1">
                    10.1016/S0723-2020(99)80055-1
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={2}>
                  García Martín, H. et al. (2006). Metagenomic analysis of two
                  enhanced biological phosphorus removal sludge communities.{" "}
                  <em>Nature Biotechnology, 24</em> (10), 1263–1269. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1038/nbt1247">
                    10.1038/nbt1247
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={3}>
                  Oyserman, B. O. et al. (2016). Metatranscriptomic insights on
                  gene expression in <em>Candidatus Accumulibacter phosphatis</em>
                  . <em>The ISME Journal, 10</em>, 810–822. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1038/ismej.2015.155">
                    10.1038/ismej.2015.155
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={4}>
                  He, S., Gall, D. L., &amp; McMahon, K. D. (2007).{" "}
                  <em>Candidatus Accumulibacter</em> population structure as
                  revealed by polyphosphate kinase genes.{" "}
                  <em>Applied and Environmental Microbiology, 73</em> (18),
                  5865–5874. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1128/AEM.01207-07">
                    10.1128/AEM.01207-07
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={5}>
                  Nelson, K. E. et al. (2002). Complete genome sequence and
                  comparative analysis of <em>Pseudomonas putida</em> KT2440.{" "}
                  <em>Environmental Microbiology, 4</em> (12), 799–808. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1046/j.1462-2920.2002.00366.x">
                    10.1046/j.1462-2920.2002.00366.x
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={6}>
                  Belda, E. et al. (2016). The revisited genome of{" "}
                  <em>Pseudomonas putida</em> KT2440.{" "}
                  <em>Environmental Microbiology, 18</em> (10), 3403–3424. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1111/1462-2920.13230">
                    10.1111/1462-2920.13230
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={7}>
                  Kampers, L. F. C., Volkers, R. J. M., &amp; Martins dos Santos,
                  V. A. P. (2019). <em>Pseudomonas putida</em> KT2440 is HV1
                  certified, not GRAS. <em>Microbial Biotechnology, 12</em> (5),
                  845–848. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1111/1751-7915.13443">
                    10.1111/1751-7915.13443
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={8}>
                  Chavarría, M., Nikel, P. I., Pérez-Pantoja, D., &amp; de
                  Lorenzo, V. (2013). The Entner–Doudoroff pathway empowers{" "}
                  <em>P. putida</em> KT2440 with oxidative-stress tolerance.{" "}
                  <em>Environmental Microbiology, 15</em> (6), 1772–1785. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1111/1462-2920.12069">
                    10.1111/1462-2920.12069
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={9}>
                  Nikel, P. I. et al. (2013). Accumulation of inorganic
                  polyphosphate enables stress endurance in <em>P. putida</em>{" "}
                  KT2440. <em>Microbial Cell Factories, 12</em>, 50. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1186/1475-2859-12-50">
                    10.1186/1475-2859-12-50
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={10}>
                  He, S. et al. (2010). Metatranscriptomic array analysis of{" "}
                  <em>Candidatus Accumulibacter phosphatis</em>-enriched sludge.{" "}
                  <em>Environmental Microbiology, 12</em> (5), 1205–1217. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1111/j.1462-2920.2010.02163.x">
                    10.1111/j.1462-2920.2010.02163.x
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={11}>
                  National Center for Biotechnology Information. Genome records
                  for <em>P. putida</em> KT2440 (AE015451.2/NC_002947.3) and{" "}
                  <em>Ca. Accumulibacter phosphatis</em> UW-1
                  (CP001715/GCF_000024165.1).
                </Ref>
                <Ref group="genetic" number={12}>
                  Yuan, Z. C., Zaheer, R., &amp; Finan, T. M. (2006). Regulation
                  and properties of PstSCAB. <em>Journal of Bacteriology, 188</em>{" "}
                  (3), 1089–1102. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1128/JB.188.3.1089-1102.2006">
                    10.1128/JB.188.3.1089-1102.2006
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={13}>
                  Zago, A., Chugani, S., &amp; Chakrabarty, A. M. (1999). Cloning
                  and characterisation of polyphosphate kinase and
                  exopolyphosphatase genes.{" "}
                  <em>Applied and Environmental Microbiology, 65</em> (5),
                  2065–2071. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1128/AEM.65.5.2065-2071.1999">
                    10.1128/AEM.65.5.2065-2071.1999
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={14}>
                  Zhang, H., Ishige, K., &amp; Kornberg, A. (2002). A
                  polyphosphate kinase (PPK2) widely conserved in bacteria.{" "}
                  <em>PNAS, 99</em> (26), 16678–16683. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1073/pnas.262655199">
                    10.1073/pnas.262655199
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={15}>
                  van Veen, H. W. et al. (1994). Translocation of metal phosphate
                  via the phosphate inorganic transport system.{" "}
                  <em>Biochemistry, 33</em> (7), 1766–1770. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1021/bi00173a020">
                    10.1021/bi00173a020
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={16}>
                  Volke, D. C. et al. (2022). CRISPR/nCas9-assisted multiplex
                  cytidine base-editing. <em>Nature Communications, 13</em>, 3026.
                  DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1038/s41467-022-30780-z">
                    10.1038/s41467-022-30780-z
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="genetic" number={17}>
                  Silva-Rocha, R. et al. (2013). The Standard European Vector
                  Architecture. <em>Nucleic Acids Research, 41</em> (D1),
                  D666–D675. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1093/nar/gks1119">
                    10.1093/nar/gks1119
                  </ExternalLink>
                  .
                </Ref>
              </ol>
            </AccordionSection>
          </section>

          <section id="model" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Model</h2>
            <BlockIntro
              image="assets/model-icon.png"
              alt="Illustration of a laptop representing computational modelling"
            >
              Genome-scale and kinetic models predict genetic priorities,
              process conditions and phosphate-accumulation dynamics.
            </BlockIntro>

            <div className="pd-subsection">
              <h3>Why we need a model</h3>
              <p>
                Phosphate accumulation is not a reaction that can be tuned in
                isolation. Uptake and storage draw on the same resources that
                sustain growth and maintenance, so changes in gene expression or
                nutrient availability can affect storage in ways that are
                difficult to infer from the pathway alone. Testing every
                combination experimentally would be impractical, so we developed
                a computational framework to explore them.
              </p>
            </div>

            <div className="pd-subsection">
              <h3>A complementary modelling framework</h3>
              <p>
                At the broadest scale, a{" "}
                <strong>genome-scale metabolic model</strong> of
                <em> P. putida</em> KT2440 uses COBRA-based optimisation to
                explore feasible metabolic states, growth–storage trade-offs,
                nutrient conditions and candidate genetic interventions.
              </p>
              <p>
                The genome-scale model describes what the cell can sustain at
                steady state but not how it behaves over time. We therefore
                reduce the network to the processes most relevant to RePhlow and
                construct a <strong>kinetic model</strong> in COPASI. Its
                ordinary differential equations follow phosphate uptake and
                intracellular polyphosphate accumulation over time and connect
                intracellular behaviour to the measurable decline of phosphate
                in the surrounding medium.
              </p>
            </div>

            <div className="pd-subsection">
              <h3>Guiding engineering and experiments</h3>
              <p>
                The framework combines environmental inputs from Bio-Oils,
                literature-derived metabolic and kinetic information, wild-type
                and engineered strain configurations, and experimental
                measurements as they become available. Rather than producing one
                definitive answer, it allows us to{" "}
                <strong>
                  compare alternatives, identify priorities and answer the
                  practical questions shaping RePhlow&apos;s development
                </strong>
                .
              </p>
              <ul>
                <li>
                  Compare wild-type and engineered configurations to prioritise
                  genetic targets.
                </li>
                <li>
                  Identify limiting factors and map viable operating conditions
                  under variable wastewater composition.
                </li>
                <li>
                  Simulate phosphate-removal and flux time courses over relevant
                  treatment timescales.
                </li>
                <li>
                  Use sensitivity and uncertainty analyses to prioritise
                  calibration experiments.
                </li>
              </ul>
              <p>
                This iterative connection between modelling and experimentation
                accelerates refinement of the system. The full analyses and
                interactive flux map are available on the{" "}
                <WikiLink to="/model">Model page</WikiLink>.
              </p>
            </div>
          </section>

          <section id="revalorisation" className="pd-section">
            <a className="vsi-back-link" href="#our-solution-visual-index">
              ← Back to visual index
            </a>
            <h2>Revalorisation</h2>
            <BlockIntro
              image="assets/our-solution/revalorizacion-callout-icon.webp"
              alt="Illustration of the phosphate revalorisation workflow"
            >
              A multi-enzyme system that uses recovered polyphosphate to
              regenerate ATP and drive the synthesis of value-added
              phosphorylated products.
            </BlockIntro>

            <div className="pd-subsection">
              <h3>From stored phosphate to a useful donor</h3>
              <p>
                In the complete system, recovered beads are lysed to release a
                concentrated stock of inorganic polyphosphate. For module-level
                experiments we decoupled this block from upstream bead recovery
                and used commercial polyphosphate, allowing the conversion
                biochemistry to be characterised independently before full
                integration.
              </p>
            </div>

            <div className="pd-subsection">
              <h3>Drawing energy from polyphosphate: the PPK2 module</h3>
              <p>
                Polyphosphate kinases transfer phosphate reversibly between
                polyphosphate and nucleotides. PPK1 preferentially uses ATP to
                synthesise polyphosphate, whereas PPK2 preferentially uses
                polyphosphate to phosphorylate nucleotides
                <Cite group="revalorisation" numbers={[5, 6]} />. PPK2 therefore
                allows us to spend the accumulated reserve deliberately.
              </p>
              <p>
                This is the opposite role to the endogenous <em>ppk2</em>{" "}
                deletion in the
                <SectionLink href="#genetic">
                  {" "}
                  genetic engineering block
                </SectionLink>
                . PPK2 is suppressed inside the living cell to retain
                polyphosphate, but added later in vitro to release its chemical
                potential.
              </p>
              <p>
                PPK2-I converts ADP to ATP, PPK2-II converts AMP to ADP and
                bifunctional PPK2-III can carry AMP through to ATP
                <Cite group="revalorisation" numbers={[5, 9]} />. We selected
                BcPPK2-III from <em>Burkholderia cenocepacia</em> because it
                accepts AMP and ADP and remains active across a broad pH range
                <Cite group="revalorisation" numbers={[5]} />.
              </p>
              <Figure
                src="atp-regeneration-module.webp"
                alt="Polyphosphate kinase regenerating ATP to support an ATP-dependent phosphorylation reaction"
                className="pd-figure--compact"
                caption={
                  <>
                    <strong>Figure 4.</strong> Coupling polyphosphate-driven ATP
                    regeneration to an ATP-dependent kinase.
                  </>
                }
              />
            </div>

            <div className="pd-subsection">
              <h3>Why regenerate ATP rather than add it?</h3>
              <p>
                Supplying ATP stoichiometrically is a standard obstacle in
                ATP-dependent biocatalysis
                <Cite group="revalorisation" numbers={[1, 5]} />. Regeneration
                keeps the reaction running on a small recycled nucleotide pool
                rather than continuously consuming an expensive cofactor. It
                also removes ADP as it forms, shifting the equilibrium towards
                product and preventing inhibitory ADP accumulation
                <Cite group="revalorisation" numbers={[1, 9]} />.
              </p>
            </div>

            <div className="pd-subsection">
              <h3>Proof of concept: polyphosphate-driven DHAP synthesis</h3>
              <p>
                To demonstrate useful chemistry, we coupled ATP regeneration to
                dihydroxyacetone kinase (DHAK), which phosphorylates
                dihydroxyacetone to dihydroxyacetone phosphate using ATP
                <Cite group="revalorisation" numbers={[2]} />. DHAP is the
                obligate donor for DHAP-dependent aldolases, which form
                carbon–carbon bonds with strict stereochemical control and
                enable access to rare sugars and iminosugars.
              </p>
              <Figure
                src="dhak-cascade.webp"
                alt="Dihydroxyacetone kinase reaction coupled to polyphosphate-driven ATP regeneration"
                caption={
                  <>
                    <strong>Figure 5.</strong> Proof-of-concept cascade coupling
                    DHAK to PPK2-mediated ATP regeneration.
                  </>
                }
                className="pd-figure--pathway"
              />
              <p>
                DHAK from <em>Citrobacter freundii</em> is strongly inhibited by
                ADP
                <Cite group="revalorisation" numbers={[8]} />. As DHAK consumes
                ATP, the PPK2 module regenerates it from polyphosphate and
                simultaneously removes the ADP that would otherwise stall the
                reaction. The performance of the coupled system is reported in{" "}
                <WikiLink to="/results">Results</WikiLink>.
              </p>
            </div>

            <AccordionSection title="References" className="pd-references-accordion">
              <ol className="pd-reference-list" data-reference-group="revalorisation">
                <Ref group="revalorisation" number={1}>
                  Abu, R., &amp; Woodley, J. M. (2015). Application of enzyme
                  coupling reactions to shift thermodynamically limited
                  biocatalytic reactions. <em>ChemCatChem, 7</em> (19), 3094–3105.
                  DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1002/cctc.201500603">
                    10.1002/cctc.201500603
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="revalorisation" number={2}>
                  Daniel, R., Stuertz, K., &amp; Gottschalk, G. (1995).
                  Biochemical and molecular characterisation of the oxidative
                  branch of glycerol utilisation by <em>Citrobacter freundii</em>.{" "}
                  <em>Journal of Bacteriology, 177</em> (15), 4392–4401. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1128/jb.177.15.4392-4401.1995">
                    10.1128/jb.177.15.4392-4401.1995
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="revalorisation" number={3}>
                  Gauss, D., Sánchez-Moreno, I., Oroz-Guinea, I., García-Junceda,
                  E., &amp; Wohlgemuth, R. (2018). Phosphorylation catalysed by
                  dihydroxyacetone kinase.{" "}
                  <em>European Journal of Organic Chemistry, 2018</em> (23),
                  2892–2895. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1002/ejoc.201800350">
                    10.1002/ejoc.201800350
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="revalorisation" number={4}>
                  Hanson, R. (1989). The role of ATP in metabolism.{" "}
                  <em>Biochemical Education, 17</em> (2), 86–92. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1016/0307-4412(89)90012-5">
                    10.1016/0307-4412(89)90012-5
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="revalorisation" number={5}>
                  Monterrey, D. T., Azcona, L., Revuelta, J., Sánchez-Moreno, I.,
                  &amp; García-Junceda, E. (2024). Polyphosphate kinase from{" "}
                  <em>Burkholderia cenocepacia</em>.{" "}
                  <em>International Journal of Molecular Sciences, 25</em> (23),
                  12995. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.3390/ijms252312995">
                    10.3390/ijms252312995
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="revalorisation" number={6}>
                  Rao, N. N., Gómez-García, M. R., &amp; Kornberg, A. (2009).
                  Inorganic polyphosphate: essential for growth and survival.{" "}
                  <em>Annual Review of Biochemistry, 78</em> (1), 605–647. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1146/annurev.biochem.77.083007.093039">
                    10.1146/annurev.biochem.77.083007.093039
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="revalorisation" number={7}>
                  Samland, A. K., &amp; Sprenger, G. A. (2006). Microbial
                  aldolases as C–C bonding enzymes.{" "}
                  <em>Applied Microbiology and Biotechnology, 71</em> (3),
                  253–264. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1007/s00253-006-0422-6">
                    10.1007/s00253-006-0422-6
                  </ExternalLink>
                  .
                </Ref>
                <Ref group="revalorisation" number={8}>
                  Sánchez-Moreno, I. (2009).{" "}
                  <em>
                    Dihidroxiacetona quinasa de Citrobacter freundii CECT 4626
                  </em>
                  . DIGITAL.CSIC.
                </Ref>
                <Ref group="revalorisation" number={9}>
                  Tavanti, M., Hosford, J., Lloyd, R. C., &amp; Brown, M. J. B.
                  (2021). Recent developments and challenges for industrial
                  implementation of polyphosphate kinases.{" "}
                  <em>ChemCatChem, 13</em> (16), 3565–3580. DOI:{" "}
                  <ExternalLink href="https://doi.org/10.1002/cctc.202100688">
                    10.1002/cctc.202100688
                  </ExternalLink>
                  .
                </Ref>
              </ol>
            </AccordionSection>
          </section>
        </div>
      </div>
      </div>
    </div>
  );
}
