/*
 * Hardware page content (converted from hardware-content.html).
 * Static JSX: the interactions live in useHardwareInteractions.ts.
 * Images: img("name.avif") -> static.igem.wiki (see assets.ts).
 */
import { memo, type CSSProperties } from "react";
import { IgemVideo } from "./IgemVideo.tsx";
import { img, VIDEOS, FILES, STL } from "./assets.ts";

function HardwareContentInner() {
  return (
    <>
      {" "}
      {/* 1. OUR INDUSTRIAL PROCESS */}{" "}
      <section className="pd-section" id="process" style={{ "--sec": "#1568a3" } as CSSProperties}>
        {" "}
        <h2>
          <span className="hw-num">1.</span>Our industrial process
        </h2>{" "}
        <div className="pd-subsection" id="overview">
          {" "}
          <h3>
            <span className="hw-num">1.1</span>General overview
          </h3>{" "}
          <p className="pd-section-lede">
            RePhlow's hardware block is built around two questions which synthetic biology projects often meet
            whenever they have to leave the bench.
          </p>{" "}
          <div className="hw-flip-grid">
            {" "}
            <div className="hw-flip" role="button" tabIndex={0} aria-pressed="false">
              {" "}
              <div className="hw-flip__inner">
                {" "}
                <div className="hw-flip__face hw-flip__front">
                  {" "}
                  <span>
                    {" "}
                    <span className="hw-flip__tag">Question 1 · Scale</span>{" "}
                    <span className="hw-flip__q">
                      How do we move phosphorus-capturing bacteria encapsulated in alginate core-shell
                      capsules from a laboratory concept into an industrial process?
                    </span>{" "}
                  </span>{" "}
                  <span className="hw-flip__hint">
                    Select to see our answer{" "}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"></path>
                      <path d="M18 3v4h-4M6 21v-4h4"></path>
                    </svg>
                  </span>{" "}
                </div>{" "}
                <div className="hw-flip__face hw-flip__back">
                  {" "}
                  <p>
                    This is where most biotechnology projects stall.{" "}
                    <strong>The bottleneck in translating synthetic biology to industry is</strong> rarely the
                    biology itself but <strong>the process around it</strong>: mixing, shear, downstream
                    compatibility and reproducibility at scale [
                    <a className="vsi-citation" href="#ref-1">
                      1
                    </a>
                    ,{" "}
                    <a className="vsi-citation" href="#ref-2">
                      2
                    </a>
                    ].
                  </p>{" "}
                  <p>
                    The failure is structural rather than technical [
                    <a className="vsi-citation" href="#ref-3">
                      3
                    </a>
                    ], and it follows from{" "}
                    <strong>
                      optimising a system against laboratory metrics without ever constraining it for
                      manufacturability
                    </strong>
                    . Downstream processing in particular is routinely treated as something that will be
                    solved later, and it accounts for a large fraction of the final cost of a process [
                    <a className="vsi-citation" href="#ref-3">
                      3
                    </a>
                    ]. We designed ours alongside the reactor rather than after it, and the architecture we
                    chose removed a separation stage instead of adding one.
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="hw-flip" role="button" tabIndex={0} aria-pressed="false">
              {" "}
              <div className="hw-flip__inner">
                {" "}
                <div className="hw-flip__face hw-flip__front">
                  {" "}
                  <span>
                    {" "}
                    <span className="hw-flip__tag">Question 2 · Containment</span>{" "}
                    <span className="hw-flip__q">
                      How do we do it without releasing the engineered bacteria into the environment?
                    </span>{" "}
                  </span>{" "}
                  <span className="hw-flip__hint">
                    Select to see our answer{" "}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"></path>
                      <path d="M18 3v4h-4M6 21v-4h4"></path>
                    </svg>
                  </span>{" "}
                </div>{" "}
                <div className="hw-flip__face hw-flip__back">
                  {" "}
                  <p>
                    The second problem is specific to deploying engineered organisms outside the laboratory.
                    Projects using engineered organisms are often held back by a combination of regulatory
                    requirements, limited field efficacy and public acceptance [
                    <a className="vsi-citation" href="#ref-4">
                      4
                    </a>
                    ].
                  </p>{" "}
                  <p>
                    <strong>
                      Physical confinement of living cells in hydrogels, where small molecules diffuse through
                      the matrix while the cells remain encapsulated, is one of the strategies that make
                      deployment tractable
                    </strong>{" "}
                    [
                    <a className="vsi-citation" href="#ref-4">
                      4
                    </a>
                    ]. That is precisely what our core-shell capsule is, and it is why rePhlow is designed as
                    contained use under Directive 2009/41/EC [
                    <a className="vsi-citation" href="#ref-5">
                      5
                    </a>
                    ] rather than as an environmental release.
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <p>
            Our answers led us to our design: a{" "}
            <strong>
              modular, plug-and-play rotating-bed bioreactor coupled to an ultrafiltration stage
            </strong>
            .
          </p>{" "}
          <figure className="vsi-figure">
            {" "}
            <IgemVideo {...VIDEOS.video1} />{" "}
            <figcaption>
              <strong>Video 1.</strong> RePhlow's process. Industrial wastewater is treated in a modular,
              plug-and-play rotating-bed bioreactor containing the engineered bacteria immobilised in alginate
              core-shell capsules. After treatment, the bacteria are easily extracted from the bioreactor with
              the basket.
            </figcaption>{" "}
          </figure>{" "}
          <p>
            The capsules stay confined inside a permeable rotating basket, which protects them from collisions
            and impeller shear [
            <a className="vsi-citation" href="#ref-6">
              6
            </a>
            ,{" "}
            <a className="vsi-citation" href="#ref-7">
              7
            </a>
            ] and makes their recovery intrinsic to the process rather than an added separation step [
            <a className="vsi-citation" href="#ref-7">
              7
            </a>
            ]. This way,{" "}
            <strong>containment is not added on top of the reactor, it is the process itself</strong>. The
            bacteria are held inside the capsules, the capsules inside the basket, and the whole biological
            phase is lifted out as a single unit, while the downstream ultrafiltration acts as a second,
            independent barrier before discharge.
          </p>{" "}
          <ul className="hw-chain" aria-label="Containment chain">
            <li>
              <span>Core-shell capsule</span>
            </li>
            <li>
              <span>Rotating basket</span>
            </li>
            <li>
              <span>Ultrafiltration membrane</span>
            </li>
            <li>
              <span>Inactivation of the retentate</span>
            </li>
          </ul>{" "}
          <p>
            Each reactor is a <strong>self-contained module</strong>, so a facility adds treatment capacity by
            installing identical units in parallel rather than by enlarging a single vessel.{" "}
            <strong>The operating principle does not change between the bench and the plant</strong>, and the
            module is <strong>plugged into an existing treatment line instead of replacing it</strong>.
          </p>{" "}
        </div>{" "}
        <div className="pd-subsection" id="setup">
          {" "}
          <h3>
            <span className="hw-num">1.2</span>Process set-up
          </h3>{" "}
          <p>Select a number, on the figure or below it, to follow the effluent through the process.</p>{" "}
          <div className="hw-process" data-steps="">
            {" "}
            <figure style={{ margin: "0" }}>
              {" "}
              <div className="hw-process__stage">
                {" "}
                <img
                  src={img("hw-fig01-process.avif")}
                  alt="Schematic of the rePhlow process with six numbered stages: upstream effluent and capsule production, rotating-bed bioreactor, ultrafiltration, permeate, revalorisation stream and residual stream."
                />{" "}
                {/* hotspot boxes, in % of the cropped stage (crop: x 0 to 1300 px, y 80 to 1480 px of the 1514 x 1892 source) */}{" "}
                <button
                  className="hw-hotspot"
                  data-step="0"
                  aria-label="Stage 1, upstream effluent"
                  style={{ left: "2.2%", top: "34.4%", width: "29.4%", height: "31.8%" }}
                ></button>{" "}
                <button
                  className="hw-hotspot"
                  data-step="0"
                  aria-label="Stage 1, capsule production"
                  style={{ left: "35.2%", top: "2.0%", width: "19.1%", height: "23.3%" }}
                ></button>{" "}
                <button
                  className="hw-hotspot"
                  data-step="1"
                  aria-label="Stage 2, bioreactor"
                  style={{ left: "35.2%", top: "34.4%", width: "19.1%", height: "31.8%" }}
                ></button>{" "}
                <button
                  className="hw-hotspot"
                  data-step="2"
                  aria-label="Stage 3, downstream"
                  style={{ left: "56.1%", top: "34.4%", width: "13.6%", height: "31.8%" }}
                ></button>{" "}
                <button
                  className="hw-hotspot"
                  data-step="3"
                  aria-label="Stage 4, permeate"
                  style={{ left: "84.4%", top: "35.0%", width: "13.8%", height: "31.8%" }}
                ></button>{" "}
                <button
                  className="hw-hotspot"
                  data-step="4"
                  aria-label="Stage 5, revalorisation stream"
                  style={{ left: "35.2%", top: "75.1%", width: "19.1%", height: "23.4%" }}
                ></button>{" "}
                <button
                  className="hw-hotspot"
                  data-step="5"
                  aria-label="Stage 6, residual stream"
                  style={{ left: "56.2%", top: "75.0%", width: "13.8%", height: "23.4%" }}
                ></button>{" "}
              </div>{" "}
              <figcaption>
                <strong>Figure 1.</strong> The rePhlow process. 1) Upstream, phosphorus-rich effluent from the
                degumming stage and capsule production. 2) Bioreactor. 3) Downstream ultrafiltration. 4)
                Permeate, the only stream released from the system. 5) Revalorisation stream. 6) Residual
                stream.
              </figcaption>{" "}
            </figure>{" "}
            <div>
              {" "}
              <div className="hw-stages">
                {" "}
                <details className="hw-stage" data-stage="0" open>
                  <summary>
                    <span className="hw-stage__n">1</span>
                    <span className="hw-stage__title">Upstream</span>
                    <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                      <path
                        d="M2 3.5 L5 6.5 L8 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </summary>
                  <div className="hw-stage__body">
                    <p>
                      The influent is the phosphorus-rich effluent generated during the degumming stage, a
                      strongly acidic stream at <strong>pH ≈ 1.6</strong>. The engineered bacteria take up
                      phosphorus at pH 5 (see{" "}
                      <a className="vsi-wikilink" href="https://2026.igem.wiki/madrid-ucm/experiments">
                        Experiments
                      </a>
                      , Genetic Engineering, Closing, from two modules to the rePhlow chassis) and the
                      capsules tolerate pH 5 in water without loss of integrity (see{" "}
                      <a className="vsi-wikilink" href="https://2026.igem.wiki/madrid-ucm/results">
                        Results
                      </a>
                      , Alginate Encapsulation, Effects of pH).
                    </p>{" "}
                    <p>
                      <strong>What is not yet solved is the route to it.</strong> Basifying this effluent to
                      pH 5 fragments the capsules with every base tested, while capsules held at the same pH
                      in water remain intact. This points to the load of monovalent cations introduced on
                      neutralisation, and to effluent components competing for the crosslinking calcium,
                      rather than to pH itself. Capsules also survive the untreated effluent for at least a
                      week, so the window exists at both ends and it is the conditioning step between them
                      that remains to be designed (see Results, Alginate Encapsulation, Bead preservation
                      under different storage media).
                    </p>{" "}
                    <p>
                      Upstream also covers the production of the capsules, generated with a coaxial needle
                      system in which two concentric flows meet at the tip. The outer channel delivers a 3.5 %
                      (w/v) sodium alginate solution and the inner channel 0.5 % (w/v) calcium chloride,
                      followed by 30 min of crosslinking. The bacteria are enclosed as the capsule forms, and
                      the capsules measure 3.3 to 3.8 mm when hydrated. The injector is described in{" "}
                      <a className="vsi-wikilink" href="#injector">
                        Section 2
                      </a>
                      .
                    </p>
                  </div>
                </details>{" "}
                <details className="hw-stage" data-stage="1">
                  <summary>
                    <span className="hw-stage__n">2</span>
                    <span className="hw-stage__title">Bioreactor</span>
                    <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                      <path
                        d="M2 3.5 L5 6.5 L8 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </summary>
                  <div className="hw-stage__body">
                    <p>
                      The core-shell capsules are confined inside a rotating mesh basket that spins within the
                      reaction vessel, so the effluent is driven through the bed while the capsules remain
                      contained and protected from collisions and impeller shear [
                      <a className="vsi-citation" href="#ref-6">
                        6
                      </a>
                      ,{" "}
                      <a className="vsi-citation" href="#ref-7">
                        7
                      </a>
                      ].
                    </p>{" "}
                    <p>
                      The capsules are roughly{" "}
                      <strong>an order of magnitude larger than the aperture of the mesh</strong>, which is
                      what makes the basket a containment barrier and not merely a holder. See{" "}
                      <a className="vsi-wikilink" href="#bioreactor">
                        Section 3
                      </a>
                      .
                    </p>
                  </div>
                </details>{" "}
                <details className="hw-stage" data-stage="2">
                  <summary>
                    <span className="hw-stage__n">3</span>
                    <span className="hw-stage__title">Downstream</span>
                    <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                      <path
                        d="M2 3.5 L5 6.5 L8 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </summary>
                  <div className="hw-stage__body">
                    <p>
                      The downstream operation consists of a <strong>single ultrafiltration stage</strong>.
                      Ultrafiltration acts as a polishing step and as a{" "}
                      <strong>second, independent containment barrier</strong>. It removes fine suspended
                      solids and biological residues, and would retain any bacteria released from a damaged
                      capsule [
                      <a className="vsi-citation" href="#ref-8">
                        8
                      </a>
                      ]. See{" "}
                      <a className="vsi-wikilink" href="#uf">
                        Section 5.3
                      </a>
                      .
                    </p>
                  </div>
                </details>{" "}
                <details className="hw-stage" data-stage="3">
                  <summary>
                    <span className="hw-stage__n">4</span>
                    <span className="hw-stage__title">Permeate</span>
                    <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                      <path
                        d="M2 3.5 L5 6.5 L8 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </summary>
                  <div className="hw-stage__body">
                    <p>
                      The treated water leaving the membrane is <strong>clarified, non-potable water</strong>{" "}
                      suitable for reuse or discharge [
                      <a className="vsi-citation" href="#ref-9">
                        9
                      </a>
                      ], and it is <strong>the only stream released from the system</strong>.
                    </p>{" "}
                    <p>
                      Reaching potable quality would require an additional reverse-osmosis and UV stage, which
                      is outside the scope of this design. See{" "}
                      <a className="vsi-wikilink" href="#uf">
                        Section 5.3
                      </a>
                      .
                    </p>
                  </div>
                </details>{" "}
                <details className="hw-stage" data-stage="4">
                  <summary>
                    <span className="hw-stage__n">5</span>
                    <span className="hw-stage__title">Revalorisation stream</span>
                    <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                      <path
                        d="M2 3.5 L5 6.5 L8 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </summary>
                  <div className="hw-stage__body">
                    <p>
                      The rotating basket also simplifies the recovery of the encapsulated biomass once
                      treatment is complete. Instead of separating individual capsules from the treated
                      liquid, <strong>the basket is withdrawn as a single unit</strong>, so the whole
                      biological phase is handled separately from the start and passes to the revalorisation
                      pathway, where the accumulated polyphosphate is converted into a market-relevant
                      product.
                    </p>{" "}
                    <p>
                      Separation is in this sense{" "}
                      <strong>intrinsic to the reactor rather than a downstream unit operation</strong> [
                      <a className="vsi-citation" href="#ref-7">
                        7
                      </a>
                      ]. This recovery principle is supported by the preliminary capsule-retention tests
                      described in{" "}
                      <a className="vsi-wikilink" href="#retention">
                        Section 3.2.5
                      </a>
                      .
                    </p>
                  </div>
                </details>{" "}
                <details className="hw-stage" data-stage="5">
                  <summary>
                    <span className="hw-stage__n">6</span>
                    <span className="hw-stage__title">Residual stream</span>
                    <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                      <path
                        d="M2 3.5 L5 6.5 L8 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </summary>
                  <div className="hw-stage__body">
                    <p>
                      The ultrafiltration stage produces a concentrate retained by the membrane, containing
                      fine suspended solids, oil and colloidal matter from the degumming effluent, together
                      with any alginate or biological residue released from damaged capsules during operation.
                    </p>{" "}
                    <p>
                      Because this is the only stream in which engineered cells or their fragments could leave
                      the system, it is treated as <strong>contained waste</strong> rather than as a
                      conventional process residue. The retentate is collected separately and chemically
                      inactivated before disposal. A hypochlorite dose of <strong>2 mg/L over 20 min</strong>{" "}
                      has been reported to abate completely the viable cells of a <em>Pseudomonas putida</em>{" "}
                      strain from a comparable clarified effluent, and is the reference condition adopted for
                      this design [
                      <a className="vsi-citation" href="#ref-8">
                        8
                      </a>
                      ].
                    </p>
                  </div>
                </details>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <figure className="vsi-figure">
            {" "}
            <img
              src={img("hw-fig02-block-flow.avif")}
              alt="Block flow diagram: influent, upstream treatment to be defined, rotating-bed bioreactor, ultrafiltration, permeate; with core-shell production, revalorisation stream and residual stream."
            />{" "}
            <figcaption>
              <strong>Figure 2.</strong> Block flow diagram of the rePhlow process. The phosphorus-rich
              degumming effluent <strong>(1)</strong> enters an upstream conditioning stage, drawn with a
              dashed outline because it is not yet defined, and is then fed <strong>(2)</strong> to the
              rotating-bed bioreactor, where it passes through the bed of core-shell capsules confined in the
              rotating basket. The treated stream <strong>(3)</strong> passes to the ultrafiltration module,
              which removes remaining debris and acts as the second containment barrier, and leaves the system
              as permeate <strong>(4)</strong>, clarified non-potable water and the only stream released.
              Core-shell capsules are produced separately with the coaxial injector (Section 2) and loaded
              into the basket <strong>(5)</strong>. Once a treatment cycle is complete the basket is withdrawn
              as a unit and the capsules pass to the revalorisation route <strong>(6)</strong>, while the
              membrane retentate <strong>(7)</strong>, carrying suspended solids and oil from the effluent
              together with any alginate or bacterial debris, is collected and inactivated as contained waste.
            </figcaption>{" "}
          </figure>{" "}
        </div>{" "}
      </section>{" "}
      {/* 2. CORE-SHELL GENERATION · COAXIAL INJECTOR */}{" "}
      <section className="pd-section" id="injector" style={{ "--sec": "#3f7d4a" } as CSSProperties}>
        {" "}
        <h2>
          <span className="hw-num">2.</span>Hardware for core-shell capsule generation
        </h2>{" "}
        <p className="pd-section-lede">
          The capsules that the bioreactor treats are produced with a{" "}
          <strong>commercial coaxial injector (Doxa Microfluidics)</strong> [
          <a className="vsi-citation" href="#ref-10">
            10
          </a>
          ], not with a device we built.
        </p>{" "}
        <p>
          What this section contributes is therefore not a design but what a team needs in order to reproduce
          our capsules with the same equipment:{" "}
          <strong>how the injector is assembled, and why its assembly matters</strong>.
        </p>{" "}
        <details className="hw-fold pd-subsection" id="inj-why">
          <summary className="hw-fold__summary">
            <span className="hw-fold__title">
              <span className="hw-num">2.1</span>Why a coaxial injector
            </span>
            <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
              <path
                d="M2 3.5 L5 6.5 L8 3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </summary>{" "}
          <div className="hw-fold__body">
            {" "}
            <p>
              Dripping a single alginate solution into a calcium bath produces a homogeneous bead, with the
              cells trapped throughout a gel matrix. A coaxial injector produces something different. Two
              concentric channels discharge simultaneously, the inner one delivering the core fluid and the
              outer one the alginate that gels on contact with calcium, so the product is a{" "}
              <strong>liquid core enclosed by a gel shell</strong> [
              <a className="vsi-citation" href="#ref-11">
                11
              </a>
              ]. The two phases must not mix before the shell gels, or no core-shell structure forms [
              <a className="vsi-citation" href="#ref-11">
                11
              </a>
              ].
            </p>{" "}
            <p>
              That architecture is what lets the capsule do two jobs at once, which is the design constraint
              the whole hardware block is built around (
              <a className="vsi-wikilink" href="#why-rbr">
                Section 3.1
              </a>
              ). The <strong>shell is the containment barrier and the mass-transfer interface</strong>; the{" "}
              <strong>core is where the engineered bacteria live</strong>, in a liquid environment rather than
              embedded in a gel.
            </p>{" "}
          </div>{" "}
        </details>{" "}
        <div className="pd-subsection" id="inj-parts">
          {" "}
          <h3>
            <span className="hw-num">2.2</span>Parts of the injector, and why concentricity matters
          </h3>{" "}
          <div className="pd-table-wrap">
            {" "}
            <table className="pd-table">
              <caption>
                <strong>Table 1.</strong> Component list of the coaxial injector, from the manufacturer's
                accessories documentation [
                <a className="vsi-citation" href="#ref-10">
                  10
                </a>
                ].
              </caption>
              <thead>
                <tr>
                  <th>Part</th>
                  <th>Material</th>
                  <th>Function</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Outer needle</td>
                  <td>Stainless steel</td>
                  <td>Carries the outer phase, the sodium alginate; sets the drop diameter</td>
                </tr>
                <tr>
                  <td>Inner needle</td>
                  <td>Stainless steel</td>
                  <td>Carries the inner phase, the calcium chloride core</td>
                </tr>
                <tr>
                  <td>T connector and union</td>
                  <td>PEEK</td>
                  <td>
                    The T holds both needles coaxially and admits the outer phase; the union receives the free
                    end of the inner needle and connects it to its own feed tube
                  </td>
                </tr>
                <tr>
                  <td>Ferrules, 1/16" or 1/8" (chosen by needle diameter)</td>
                  <td>ETFE</td>
                  <td>Seal and centre each needle in its fitting; the narrow end must face the nut</td>
                </tr>
                <tr>
                  <td>Male nuts, 1/4-28"</td>
                  <td>ETFE</td>
                  <td>
                    Compress the ferrule and fix the needle in place, one per needle at the T connector and
                    one at the union
                  </td>
                </tr>
                <tr>
                  <td>Feed tubing, 30 cm, with 1/4-28" male nut and female Luer adaptor</td>
                  <td>PTFE</td>
                  <td>
                    Delivers one phase from its syringe, one tube per needle; the syringe pushes into the Luer
                    adaptor and the nut at the other end screws into the T connector or the union
                  </td>
                </tr>
                <tr>
                  <td>Spring</td>
                  <td>Not specified</td>
                  <td>
                    Fits over the inner needle and keeps the two needles coaxial; it can fall out or be
                    crushed if the assembly is not carried out correctly
                  </td>
                </tr>
              </tbody>
            </table>{" "}
          </div>{" "}
          <figure className="vsi-figure">
            {" "}
            <div className="hw-figure-pair hw-figure-pair--tall">
              {" "}
              <img
                src={img("hw-fig03a-injector-assembled.avif")}
                alt="Assembled coaxial injector."
                loading="lazy"
              />{" "}
              <img
                src={img("hw-fig03b-injector-parts.avif")}
                alt="Individual parts of the coaxial injector, numbered 1 to 7."
                loading="lazy"
              />{" "}
            </div>{" "}
            <figcaption>
              <strong>Figure 3.</strong> The coaxial injector assembled (left) and its individual parts
              (right). 1) Outer needle; 2) inner needle; 3) PEEK T connector; 4) PEEK union; 5) ETFE ferrules;
              6) 1/4-28" ETFE male nuts; 7) spring. In the assembled injector the inner needle runs through
              the T connector and inside the outer needle, with the two tips flush, and the spring sits over
              the inner needle to hold the two coaxial.
            </figcaption>{" "}
          </figure>{" "}
          <p>
            The{" "}
            <strong>
              ferrule and its nut are the parts that decide whether the two needles end up concentric
            </strong>
            . The ferrule is a compressible cone; tightening the nut closes it onto the capillary and should
            hold it on the axis of the outer channel. Rigid coaxial nozzles of this type depend on part
            tolerances and on assembly precision to stay aligned, and when they do not, the inner needle sits
            off-axis [
            <a className="vsi-citation" href="#ref-12">
              12
            </a>
            ].
          </p>{" "}
          <h4 style={{ marginTop: "28px", fontSize: "1rem", color: "var(--ink)" }}>
            An eccentric assembly produces an eccentric capsule
          </h4>{" "}
          <figure className="vsi-figure hw-capsule">
            {" "}
            <div className="hw-capsule__crop">
              {" "}
              <img
                src={img("hw-capsules-ab.avif")}
                alt="Two core-shell capsules: A with an off-centre core and uneven shell, B with a centred core and even shell."
                loading="lazy"
              />{" "}
            </div>{" "}
            <figcaption>
              <strong>A)</strong> Capsule from an eccentric assembly. <strong>B)</strong> Capsule from a
              concentric assembly.
            </figcaption>{" "}
          </figure>{" "}
          <div className="hw-consequences">
            {" "}
            <div className="hw-consequence">
              <span className="hw-consequence__n">1</span>
              <h5>Uneven shell thickness</h5>
              <p>
                The shell is thick on one side and thin on the other [
                <a className="vsi-citation" href="#ref-12">
                  12
                </a>
                ].
              </p>
            </div>{" "}
            <div className="hw-consequence">
              <span className="hw-consequence__n">2</span>
              <h5>Uneven permeability, and therefore uneven containment</h5>
              <p>
                Thicker regions restrict transport while thinner regions are more permeable. A capsule's
                containment is set by its <strong>thinnest wall</strong>, not by its mean wall, and that wall
                is also its most permeable point [
                <a className="vsi-citation" href="#ref-12">
                  12
                </a>
                ].
              </p>
            </div>{" "}
            <div className="hw-consequence">
              <span className="hw-consequence__n">3</span>
              <h5>Off-centred cores and satellite droplets</h5>
              <p>
                The core drifts towards the thin side and small secondary droplets form at the tip [
                <a className="vsi-citation" href="#ref-11">
                  11
                </a>
                ].
              </p>
            </div>{" "}
          </div>{" "}
          <p>
            Uniformity around the capsule is governed by the geometry of the injector, which is set when it is
            assembled. That is why{" "}
            <strong>the assembly procedure is documented here as part of the protocol</strong> rather than as
            an accessory note.
          </p>{" "}
        </div>{" "}
        <div className="pd-subsection" id="inj-assembly">
          {" "}
          <h3>
            <span className="hw-num">2.3</span>Assembly, disassembly and concentricity check
          </h3>{" "}
          <details className="hw-fold hw-fold--inner">
            <summary className="hw-fold__summary">
              <span className="hw-fold__title">Key assembly points</span>
              <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                <path
                  d="M2 3.5 L5 6.5 L8 3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </summary>{" "}
            <div className="hw-fold__body">
              {" "}
              <ul>
                <li>
                  <strong>Ferrule orientation.</strong> The ferrule is conical and seats correctly in one
                  direction only.
                </li>
                <li>
                  <strong>Nut tightening.</strong> Too loose and the capillary can shift; too tight and the
                  ETFE ferrule deforms and may lock the capillary off-axis.
                </li>
                <li>
                  <strong>Concentricity check before use.</strong> Inspect the tip against a light source or
                  under a magnifier and confirm that the annular gap between the inner capillary and the outer
                  needle looks even all the way round.
                </li>
                <li>
                  <strong>Disassembly inside a beaker</strong>, so that the spring is recovered if it
                  detaches.
                </li>
                <li>
                  <strong>Ferrules are consumables.</strong> A ferrule that has been compressed and released
                  many times no longer centres reliably.
                </li>
              </ul>
            </div>
          </details>{" "}
        </div>{" "}
      </section>{" "}
      {/* 3. ROTATING-BED BIOREACTOR */}{" "}
      <section className="pd-section" id="bioreactor" style={{ "--sec": "#e2542d" } as CSSProperties}>
        {" "}
        <h2>
          <span className="hw-num">3.</span>Rotating-bed bioreactor
        </h2>{" "}
        <div className="pd-subsection" id="why-rbr">
          {" "}
          <h3>
            <span className="hw-num">3.1</span>Why a rotating-bed bioreactor
          </h3>{" "}
          <p className="pd-section-lede">
            <strong>
              Immobilising bacteria in core-shell capsules solves the containment problem, but it creates an
              engineering one
            </strong>{" "}
            [
            <a className="vsi-citation" href="#ref-4">
              4
            </a>
            ,{" "}
            <a className="vsi-citation" href="#ref-6">
              6
            </a>
            ].
          </p>{" "}
          <p>
            The capsule is simultaneously a containment barrier and a mass-transfer interface [
            <a className="vsi-citation" href="#ref-11">
              11
            </a>
            ]. It has to <strong>survive the reactor environment intact</strong>, or the modified bacteria
            would escape and the accumulated phosphorus would be lost, while{" "}
            <strong>remaining permeable enough for phosphate to reach the cells inside</strong>. The{" "}
            <strong>reactor cannot be chosen for mixing performance alone</strong> [
            <a className="vsi-citation" href="#ref-6">
              6
            </a>
            ].{" "}
            <strong>
              It has to deliver mixing without destroying the very structure the process depends on.
            </strong>
          </p>{" "}
          <div
            className="cp-carousel hw-split"
            data-carousel=""
            data-loop="false"
            aria-roledescription="carousel"
            aria-label="Reactor architectures considered"
          >
            {" "}
            <button
              className="cp-carousel__arrow cp-carousel__arrow--prev"
              type="button"
              data-prev=""
              aria-label="Previous architecture"
            >
              <svg className="cp-carousel__arrowhead" viewBox="0 0 9 14">
                <path d="M8 1 2 7l6 6" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
            </button>{" "}
            <div className="cp-carousel__view">
              {" "}
              <div className="cp-carousel__track">
                {" "}
                <div className="cp-carousel__slide" role="group" aria-label="A, stirred tank">
                  {" "}
                  <div
                    className="hw-split__img"
                    data-pos="0"
                    style={{ backgroundPositionX: "0%" }}
                    role="img"
                    aria-label="Stirred tank with impeller and capsules dispersed in the liquid."
                  ></div>{" "}
                  <div className="hw-split__text">
                    {" "}
                    <h4>A) Stirred tank</h4>{" "}
                    <span className="hw-split__verdict hw-split__verdict--no">Discarded</span>{" "}
                    <p>
                      This was our starting assumption, and it was the first thing the consultation
                      overturned. Consultation with bioprocess specialists (
                      <a className="vsi-wikilink" href="#consultation">
                        Section 3.2.1
                      </a>
                      ) showed that{" "}
                      <strong>
                        impeller shear, together with the baffles needed for adequate mixing, would
                        mechanically damage the capsules
                      </strong>
                      .
                    </p>{" "}
                    <p>
                      The underlying problem is general to immobilised biocatalysis. Immobilised-cell
                      bioreactors suffer operational instability from mechanical problems that originate in
                      the carrier matrix itself [
                      <a className="vsi-citation" href="#ref-6">
                        6
                      </a>
                      ], and in a stirred tank the solid phase is dispersed through the whole vessel and
                      ground down by collisions with the impeller, the walls and itself [
                      <a className="vsi-citation" href="#ref-6">
                        6
                      </a>
                      ,{" "}
                      <a className="vsi-citation" href="#ref-7">
                        7
                      </a>
                      ]. That grinding removes material from the support, generates pulverised particles that
                      are difficult to eliminate and causes catalyst loss on recycling [
                      <a className="vsi-citation" href="#ref-7">
                        7
                      </a>
                      ]. This design would also require an additional filtration step to recover the remaining
                      capsules [
                      <a className="vsi-citation" href="#ref-7">
                        7
                      </a>
                      ].
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="cp-carousel__slide" role="group" aria-label="B, fluidised bed">
                  {" "}
                  <div
                    className="hw-split__img"
                    data-pos="1"
                    style={{ backgroundPositionX: "50%" }}
                    role="img"
                    aria-label="Fluidised bed with capsules suspended by an upward flow."
                  ></div>{" "}
                  <div className="hw-split__text">
                    {" "}
                    <h4>B) Fluidised bed</h4>{" "}
                    <span className="hw-split__verdict hw-split__verdict--no">Discarded</span>{" "}
                    <p>
                      A fluidised bed avoids the impeller, but it does not avoid{" "}
                      <strong>particle-particle collisions</strong>, which are documented as a cause of
                      carrier degradation and biomass detachment in wastewater treatment applications [
                      <a className="vsi-citation" href="#ref-13">
                        13
                      </a>
                      ].
                    </p>{" "}
                    <p>It was discarded as substantially more complex to operate at laboratory scale.</p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="cp-carousel__slide" role="group" aria-label="C, rotating bed">
                  {" "}
                  <div
                    className="hw-split__img"
                    data-pos="2"
                    style={{ backgroundPositionX: "100%" }}
                    role="img"
                    aria-label="Rotating bed with capsules confined in a permeable mesh basket."
                  ></div>{" "}
                  <div className="hw-split__text">
                    {" "}
                    <h4>C) Rotating bed</h4>{" "}
                    <span className="hw-split__verdict hw-split__verdict--yes">Adopted</span>{" "}
                    <p>
                      The rotating-bed configuration{" "}
                      <strong>inverts the usual arrangement of the immobilised phase</strong>. The capsules
                      are confined inside a permeable mesh basket that rotates within the liquid, so the
                      effluent is driven through a stationary bed of capsules instead of the capsules being
                      driven through the liquid.
                    </p>{" "}
                    <p>
                      Rotation accelerates the liquid held inside the bed radially outward through the
                      perforations, while fresh liquid is drawn in through the opening at the bottom. The
                      solid phase is retained by thin nets whose two stated advantages are protection from
                      mechanical wear and the avoidance of downstream filtration [
                      <a className="vsi-citation" href="#ref-14">
                        14
                      </a>
                      ]. Because the solid phase is never dispersed into the bulk fluid,{" "}
                      <strong>capsule-impeller and capsule-wall collisions are eliminated</strong> [
                      <a className="vsi-citation" href="#ref-6">
                        6
                      </a>
                      ,{" "}
                      <a className="vsi-citation" href="#ref-7">
                        7
                      </a>
                      ].
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <button
              className="cp-carousel__arrow cp-carousel__arrow--next"
              type="button"
              data-next=""
              aria-label="Next architecture"
            >
              <svg className="cp-carousel__arrowhead" viewBox="0 0 9 14">
                <path d="m1 1 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
            </button>{" "}
          </div>{" "}
          <div
            className="hw-carousel__tabs"
            data-carousel-tabs=""
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "6px",
              marginTop: "16px",
              flexWrap: "wrap",
            }}
          >
            {" "}
            <button className="hw-chip" type="button" aria-pressed="true">
              A) Stirred tank
            </button>{" "}
            <button className="hw-chip" type="button" aria-pressed="false">
              B) Fluidised bed
            </button>{" "}
            <button className="hw-chip" type="button" aria-pressed="false">
              C) Rotating bed
            </button>{" "}
          </div>{" "}
          <p className="vsi-figure__caption" style={{ maxWidth: "660px", margin: "12px auto 0" }}>
            <strong>Figure 4.</strong> The three reactor architectures considered for the core-shell capsules.
            A) Stirred tank, where the capsules are dispersed through the whole vessel and exposed to impeller
            shear and to collisions against the impeller, the walls and each other. B) Fluidised bed, where
            the capsules are suspended by an upward flow and collide with one another as they circulate. C)
            Rotating bed, where the capsules are confined inside a permeable basket and the effluent is driven
            through the bed instead.
          </p>{" "}
          <div className="hw-options">
            {" "}
            <div className="hw-option is-recommended">
              {" "}
              <h4>Rotation speed is a single tunable parameter</h4>{" "}
              <p>
                It balances homogenisation against mechanical stress, allowing mixing, system stability and
                capsule lifetime to be optimised together. Section 3.2.5 is designed to locate our optimum
                rotation speed.
              </p>{" "}
            </div>{" "}
            <div className="hw-option is-recommended">
              {" "}
              <h4>Separation is intrinsic to the design</h4>{" "}
              <p>
                The capsules are lifted out with the basket with minimal biomass loss, as a concentrate ready
                for the revalorisation module. No solid-liquid separation stage is needed upstream of
                ultrafiltration [
                <a className="vsi-citation" href="#ref-7">
                  7
                </a>
                ,{" "}
                <a className="vsi-citation" href="#ref-14">
                  14
                </a>
                ].
              </p>{" "}
            </div>{" "}
            <div className="hw-option is-recommended">
              {" "}
              <h4>Auxiliary agitation stays possible</h4>{" "}
              <p>
                The capsules remain confined within the basket at all times, so agitation of the free liquid
                could be added without exposing them to it. Section 3.2.6 identifies this as the first
                improvement for a next iteration.
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="pd-subsection">
          {" "}
          <h3>
            <span className="hw-num">3.2</span>Our proof of concept
          </h3>{" "}
        </div>{" "}
        <div className="pd-subsection" id="consultation">
          {" "}
          <h4 className="hw-h4">
            <span className="hw-num">3.2.1</span>Design constraints and expert consultation
          </h4>{" "}
          <p>
            We worked{" "}
            <strong>in parallel with the other teams to establish the constraints the reactor</strong> had to
            satisfy for our global process.
          </p>{" "}
          <p>
            From the <strong>encapsulation team</strong> we obtained the physical description of the solid
            phase: alginate core-shell capsules of 3.3 to 3.8 mm diameter, with a shell of 240 to 475 µm
            around a liquid core. The capsules deform progressively, retaining between 0.42 and 0.62 of their
            unloaded sphericity at the highest load tested. The same work also set the limits of their
            chemical environment, since the capsules tolerate the untreated effluent for at least a week but
            are degraded by it once it is neutralised.
          </p>{" "}
          <p>
            From the <strong>genetic engineering block</strong> we obtained the operating conditions of the
            encapsulated cells. Phosphorus uptake is assayed at pH 5, the oxygen demand of our strain is low
            enough that the prototype could be operated without forced aeration, and phosphate uptake is still
            rising at 120 minutes.
          </p>{" "}
          <p>
            These parameters are what the hardware had to accommodate. The{" "}
            <strong>capsule diameter set the maximum mesh aperture</strong> of the basket. The{" "}
            <strong>mechanical behaviour of the capsules ruled out impeller agitation</strong>, because a
            carrier that deforms rather than fails has no clear damage threshold to design against. The{" "}
            <strong>biological conditions fixed the operating window</strong> the hardware had to sustain, and
            the minimum duration of a cycle.
          </p>{" "}
          <div className="callout hw-note">
            {" "}
            <span className="callout__label">Open constraint</span>{" "}
            <p>
              Two of these constraints do not currently meet, and we state it rather than design around it.
              The capsules are stable in the effluent as received, at pH 1.6, while uptake is assayed at pH 5,
              and the neutralisation route that would bridge the two degrades the shell. Closing that gap is
              the influent conditioning stage at the current state of the project.
            </p>{" "}
          </div>{" "}
          <p>
            The exchange ran in both directions, and that is what makes it an engineering loop rather than a
            handover. The reactor's requirements became the criterion by which the capsule itself was
            selected. When shell thickness proved too variable to discriminate between the two coaxial
            flow-rate ratios, the choice was made instead on resistance to compression, the property the
            reactor demands.{" "}
            <strong>
              Designing the reactor was therefore never an isolated engineering exercise, and designing the
              core-shell capsules was never purely a chemistry one.
            </strong>
          </p>{" "}
          <p>
            The proof of concept was also developed iteratively through consultation with bioprocess and
            membrane specialists. It was not settled in advance and then built. The complete record of every
            conversation, with its date, the question put to each specialist and what changed afterwards, is
            on the page{" "}
            <a className="vsi-wikilink" href="https://2026.igem.wiki/madrid-ucm/human-practices">
              Human Practices, Stakeholders and voices
            </a>
            . Every consultation produced a concrete change to the hardware rather than a general endorsement
            of it.
          </p>{" "}
          <div className="pd-table-wrap">
            {" "}
            <table className="pd-table">
              <caption>
                <strong>Table 2.</strong> Consultations and the design changes they produced.
              </caption>
              <thead>
                <tr>
                  <th>Consultation</th>
                  <th>Feedback received</th>
                  <th>Resulting design change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Initial meeting, Á. Ferrero Veintemilla, 4 October 2025
                    <br />
                    <span style={{ fontWeight: "500", color: "var(--ink-soft)" }}>
                      Human Practices, record 18
                    </span>
                  </td>
                  <td>Prioritise one deeply developed component over a superficially complete system</td>
                  <td>
                    Effort concentrated on the bioreactor and the downstream separator, rather than building
                    every stage of the process
                  </td>
                </tr>
                <tr>
                  <td>
                    Bioreactor draft feedback, V. E. Santos and J. M. Bolívar, 12 March 2026
                    <br />
                    <span style={{ fontWeight: "500", color: "var(--ink-soft)" }}>
                      Human Practices, record 22
                    </span>
                  </td>
                  <td>
                    Impeller shear and the baffles required for adequate mixing would mechanically damage the
                    core-shell capsules
                  </td>
                  <td>Stirred-tank design discarded, rotating-bed architecture adopted</td>
                </tr>
                <tr>
                  <td>
                    Downstream feedback, Mª C. García Payo and L. García Fernández, 17 March 2026
                    <br />
                    <span style={{ fontWeight: "500", color: "var(--ink-soft)" }}>
                      Human Practices, record 23
                    </span>
                  </td>
                  <td>
                    Ultrafiltration cannot be validated experimentally at laboratory scale, as the required
                    transmembrane pressures exceed available equipment
                  </td>
                  <td>Ultrafiltration retained as a fully specified theoretical design</td>
                </tr>
                <tr>
                  <td>
                    Laboratory visit, J. M. Bolívar, 25 March 2026
                    <br />
                    <span style={{ fontWeight: "500", color: "var(--ink-soft)" }}>
                      Human Practices, record 24
                    </span>
                  </td>
                  <td>Verification of basket-to-vessel ratio, mixing behaviour and basket filling</td>
                  <td>Geometric parameters of the final proof-of-concept design confirmed</td>
                </tr>
              </tbody>
            </table>{" "}
          </div>{" "}
          <p>
            Two of these consultations were decisive. The conversation with V. E. Santos and J. M. Bolívar{" "}
            <strong>redirected the entire reactor architecture before any hardware was built</strong>. The
            laboratory visit on 25 March 2026 finalised the decision by checking the resulting geometry in
            person, so the basket-to-vessel ratio and filling criteria used in the final assembly were
            reviewed against established practice.
          </p>{" "}
          <p>
            The consultation with Mª C. García Payo did not change what we designed but{" "}
            <strong>changed what we claim</strong>. Rather than presenting untested performance figures for
            the ultrafiltration stage, we state that experimental validation remains pending.
          </p>{" "}
          <div className="hw-toggle-wrap" data-toggle="">
            {" "}
            <div className="hw-toggle" role="group" aria-label="Block flow diagram version">
              {" "}
              <button type="button" aria-pressed="true">
                Initial design
              </button>{" "}
              <button type="button" aria-pressed="false">
                Final design
              </button>{" "}
            </div>{" "}
            <div className="hw-toggle-panel">
              {" "}
              <figure className="vsi-figure">
                {" "}
                <img
                  src={img("hw-fig05-initial-bfd.avif")}
                  alt="Initial block flow diagram with a stirred-tank bioreactor and a Y-type mesh filter."
                  loading="lazy"
                />{" "}
                <figcaption>
                  <strong>Figure 5.</strong> Initial block flow diagram. The phosphorus-rich degumming
                  effluent <strong>(1)</strong> enters an upstream conditioning stage and is fed to the{" "}
                  <strong>stirred-tank bioreactor (2)</strong>, operating in batch mode. After the calculated
                  treatment time, the outlet stream <strong>(3)</strong>, which carries the capsules, passes
                  through a <strong>Y-type mesh filter</strong>, where the capsules are retained and sent to
                  the revalorisation route <strong>(6)</strong>. The clarified stream then passes to the
                  ultrafiltration module, which removes the remaining debris and acts as the second
                  containment barrier, and leaves the system as permeate <strong>(4)</strong>, clarified
                  non-potable water and the only stream released. The membrane retentate <strong>(7)</strong>{" "}
                  is collected and inactivated as contained waste. Core-shell capsules are produced separately
                  with the coaxial injector (Section 2) and loaded into the reactor <strong>(5)</strong>.
                </figcaption>{" "}
              </figure>{" "}
            </div>{" "}
            <div className="hw-toggle-panel" hidden>
              {" "}
              <figure className="vsi-figure">
                {" "}
                <img
                  src={img("hw-fig06-final-bfd.avif")}
                  alt="Final block flow diagram with the rotating-bed bioreactor."
                  loading="lazy"
                />{" "}
                <figcaption>
                  <strong>Figure 6.</strong> Final block flow diagram, after consultation. The stirred tank is
                  replaced by the <strong>rotating-bed bioreactor (2)</strong> and the Y-type mesh filter
                  disappears, because the capsules are withdrawn with the basket <strong>(6)</strong>. The
                  upstream conditioning stage is drawn with a dashed outline because it is not yet defined (
                  <a className="vsi-wikilink" href="#next">
                    Section 6
                  </a>
                  ). Streams as in Figure 2.
                </figcaption>{" "}
              </figure>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="pd-subsection" id="components">
          {" "}
          <h4 className="hw-h4">
            <span className="hw-num">3.2.2</span>Components and assembly
          </h4>{" "}
          <p>
            <strong>Bioreactor components.</strong> The proof of concept is built from{" "}
            <strong>five elements</strong>: a <strong>rotating mesh basket</strong> that confines the
            core-shell capsules, a <strong>reaction vessel</strong> that contains the effluent during
            treatment, a <strong>motor</strong> that drives the rotation of the basket, a{" "}
            <strong>coupling</strong> that joins the basket shaft to the motor rotor, and a{" "}
            <strong>speed controller</strong> that sets the rotation rate.
          </p>{" "}
          <p>
            <strong>Most of the assembly consists of repurposed commercial components</strong>, listed with
            their supplier references and specifications in <strong>Table 3</strong>. The exceptions are the
            motor support and the Arduino mount, which are 3D printed; the corresponding STL files are
            provided below so that the assembly can be reproduced directly. The rotating-bed principle depends
            on the geometry of the system, not on custom-fabricated parts, so the proof of concept was
            deliberately built from items available to any team, for <strong>€113.64</strong> in purchased
            parts.
          </p>{" "}
          <div className="pd-table-wrap">
            {" "}
            <table className="pd-table">
              <caption>
                <strong>Table 3.</strong> Components used for the proof-of-concept assembly.
              </caption>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Function</th>
                  <th>Specification</th>
                  <th className="num">Price (€)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basket</td>
                  <td>Confines the core-shell capsules and forms the rotating bed</td>
                  <td>
                    Cylindrical tea infuser, AISI 304 stainless steel (Truthborne GVS-DI-01). Outer diameter
                    3.8 cm, inner diameter 3.6 cm, total length 19 cm including stem, mesh-body length 5.58
                    cm. Mesh aperture 0.3 mm. Integrated stem used as rotation axis
                  </td>
                  <td className="num">21.95</td>
                </tr>
                <tr>
                  <td>Vessel</td>
                  <td>Contains the effluent and the basket during treatment</td>
                  <td>
                    Repurposed wide-mouth jar, food-grade glass (Type III). Inner diameter 5.1 cm, useful
                    height 7.5 cm, liquid fill height during testing 7.1 cm, estimated vessel volume 153 mL
                  </td>
                  <td className="num">0.00 (reused)</td>
                </tr>
                <tr>
                  <td>Stepper motor</td>
                  <td>Drives basket rotation</td>
                  <td>42BYGHW811L20P1-X3 NEMA 17. Rated coil voltage 3.1 V</td>
                  <td className="num">28.90</td>
                </tr>
                <tr>
                  <td>Motor-basket coupling</td>
                  <td>Connects the motor shaft to the basket stem</td>
                  <td>
                    Outer plastic sheath of an extension cable, diameter 8 mm, height 2.6 cm. Pressure fit,
                    without adhesive or screws
                  </td>
                  <td className="num">0.00 (reused)</td>
                </tr>
                <tr>
                  <td>Control board</td>
                  <td>Controls motor operation</td>
                  <td>Arduino Uno</td>
                  <td className="num">28.30</td>
                </tr>
                <tr>
                  <td>Motor driver</td>
                  <td>Controls the motor windings</td>
                  <td>L298N motor driver module</td>
                  <td className="num">2.00</td>
                </tr>
                <tr>
                  <td>Jumper wires</td>
                  <td>Connect the electronic components</td>
                  <td>Dupont jumper wires for the Arduino to motor-driver connections</td>
                  <td className="num">7.99</td>
                </tr>
                <tr>
                  <td>Adjustable power supply</td>
                  <td>Supplies electrical power to the circuit</td>
                  <td>REMOTE YC668, adjustable 5 to 12 V output</td>
                  <td className="num">12.00</td>
                </tr>
                <tr>
                  <td>Mounting screws and nuts</td>
                  <td>Secure the components to the mounting panel</td>
                  <td>
                    12 screws of 3 mm diameter and 1.6 cm length with nuts; 4 screws of 3 mm diameter and 1 cm
                    length
                  </td>
                  <td className="num">2.50</td>
                </tr>
                <tr>
                  <td>Methacrylate panel</td>
                  <td>Supports the electronic and mechanical components</td>
                  <td>
                    Panel with 12 drilled holes, providing a common mounting surface and electrical separation
                    from the iron base
                  </td>
                  <td className="num">10.00</td>
                </tr>
                <tr>
                  <td>3D-printed supports</td>
                  <td>Hold the Arduino and the motor in position</td>
                  <td>STL files available on this page</td>
                  <td className="num">0.00 (printed in-house)</td>
                </tr>
                <tr>
                  <td>Laboratory stands and clamps</td>
                  <td>Support the assembled prototype</td>
                  <td>Two stands and two clamps, temporary support</td>
                  <td className="num">0.00 (laboratory equipment)</td>
                </tr>
                <tr className="is-total">
                  <td>Total purchase</td>
                  <td></td>
                  <td></td>
                  <td className="num">113.64</td>
                </tr>
              </tbody>
            </table>{" "}
          </div>{" "}
          <h4>3D-printed supports</h4>{" "}
          <p>
            They hold the motor and the Arduino in position. <strong>Two printed parts.</strong> The{" "}
            <strong>motor support</strong> for the NEMA 17 stepper is our own design. The{" "}
            <strong>Arduino Uno frame</strong> is an open frame of 74.9 × 76.2 × 7.0 mm, with four corner tabs
            carrying 3.1 mm holes for the M3 screws to the methacrylate panel and four 2.9 mm bosses matching
            the Arduino Uno hole pattern. It is adapted from a third-party model (see attribution below).
          </p>{" "}
          <div className="hw-figure-pair" style={{ gridTemplateColumns: "1fr 1fr", marginTop: "26px" }}>
            {" "}
            <figure className="vsi-figure" style={{ margin: "0" }}>
              {" "}
              <img
                src={img("hw-fig07-motor-support.avif")}
                alt="Rendered 3D-printed NEMA 17 motor support with a central shaft hole and mounting holes."
                loading="lazy"
              />{" "}
              <figcaption>
                <strong>Figure 7.</strong> 3D-printed motor support for the NEMA 17 stepper, designed by the
                team. STL file supplied on this page.
              </figcaption>{" "}
            </figure>{" "}
            <figure className="vsi-figure" style={{ margin: "0" }}>
              {" "}
              <img
                src={img("hw-fig08-arduino-mount.avif")}
                alt="Rendered 3D-printed Arduino Uno mount frame with corner tabs."
                loading="lazy"
              />{" "}
              <figcaption>
                <strong>Figure 8.</strong> 3D-printed Arduino Uno mount, dimensioned from the STL file
                supplied on this page.
              </figcaption>{" "}
            </figure>{" "}
          </div>{" "}
          <div className="medals-links">
            {" "}
            <a className="medals-link-btn" href={STL.motorSupport} download>
              Motor support <small>STL</small>
            </a>{" "}
            <a className="medals-link-btn" href={STL.arduinoMount} download>
              Arduino Uno mount <small>STL</small>
            </a>{" "}
          </div>{" "}
          <p className="hw-licence">
            <strong>Arduino Uno frame attribution.</strong> "
            <a className="vsi-wikilink" href="https://www.thingiverse.com/thing:33327">
              Arduino Uno Mount
            </a>
            " by{" "}
            <a className="vsi-wikilink" href="https://www.thingiverse.com/sceadu_design/designs">
              sceadu_design
            </a>
            , licensed under{" "}
            <a className="vsi-wikilink" href="https://creativecommons.org/licenses/by-sa/4.0/">
              CC BY-SA 4.0
            </a>
            . The file is redistributed here unmodified, under the same licence, so that the assembly can be
            reproduced directly. This part is not our design; the dimensions reported in Figure 8 were
            measured from the file.
          </p>{" "}
          <h4>Mechanical mounting and shaft coupling</h4>{" "}
          <p>
            The motor and electronic components are mounted on a <strong>methacrylate panel</strong>{" "}
            containing twelve drilled holes. The panel provides a common support for the assembly and
            electrically separates the components from the underlying iron base. The Arduino is secured to the
            panel through a 3D-printed adapter, and the L298N motor driver is mounted directly on the panel
            using mechanical fasteners.
          </p>{" "}
          <p>
            The connection between the motor and the rotating basket was made using a short section of the{" "}
            <strong>outer plastic sheath of an extension cable</strong>, cut to length and fitted between the
            motor shaft and the basket stem by pressure fit, without adhesive or screws. This coupling allowed
            the existing components to be connected{" "}
            <strong>without manufacturing a custom-machined part</strong>.
          </p>{" "}
          <p>
            <strong>Alignment of the two shafts is essential for reliable operation.</strong> Before each
            test, the assembly should be checked for slipping, excessive vibration or deformation of the
            coupling. The current prototype is supported by two laboratory stands and two clamps. A dedicated
            protective enclosure remains a possible improvement for future iterations.
          </p>{" "}
          <h4>Assembly sequence</h4>{" "}
          <ol className="hw-steplist">
            <li>
              Position the Arduino adapter, motor support and L298N motor driver on the methacrylate panel.
            </li>
            <li>Secure the components using the corresponding screws, nuts and washers.</li>
            <li>Fit the plastic coupling between the motor shaft and the basket stem.</li>
            <li>Place the basket inside the reaction vessel and check its alignment.</li>
            <li>Verify that the basket rotates freely without contacting the vessel walls or bottom.</li>
            <li>
              Connect the motor windings to the L298N driver and the driver inputs to the Arduino. Connect the
              ground of the adjustable power supply to the Arduino ground, so that the driver and the
              controller share a common reference.
            </li>
            <li>
              Connect the Arduino to the computer through USB and test the motor at low operating levels
              before increasing the speed.
            </li>
          </ol>{" "}
          <p>
            The final alignment must be checked with the basket positioned inside the vessel, since the
            relative positioning of motor, shaft and basket determines whether the system can rotate without
            mechanical interference.
          </p>{" "}
          {/* ASSEMBLY CAROUSEL (Figures 9 to 25) */}{" "}
          <div className="hw-carousel__group" data-carousel-groups="" aria-label="Jump to assembly stage">
            {" "}
            <button className="hw-chip" type="button" data-goto="0" aria-pressed="true">
              Components
            </button>{" "}
            <button className="hw-chip" type="button" data-goto="3" aria-pressed="false">
              Electronics
            </button>{" "}
            <button className="hw-chip" type="button" data-goto="9" aria-pressed="false">
              Mounting
            </button>{" "}
            <button className="hw-chip" type="button" data-goto="11" aria-pressed="false">
              Basket
            </button>{" "}
            <button className="hw-chip" type="button" data-goto="13" aria-pressed="false">
              Final set-up
            </button>{" "}
          </div>{" "}
          <div
            className="cp-carousel"
            id="assembly-carousel"
            data-carousel=""
            data-thumbs="#assembly-thumbs"
            data-caption="#assembly-caption"
            data-groups="[data-carousel-groups]"
            aria-roledescription="carousel"
            aria-label="Assembly of the rotating-bed bioreactor"
          >
            {" "}
            <button
              className="cp-carousel__arrow cp-carousel__arrow--prev"
              type="button"
              data-prev=""
              aria-label="Previous figure"
            >
              <svg className="cp-carousel__arrowhead" viewBox="0 0 9 14">
                <path d="M8 1 2 7l6 6" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
            </button>{" "}
            <div className="cp-carousel__view">
              {" "}
              <div className="cp-carousel__track">
                {" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig09-assembly.avif")}
                    alt="Components and mounting hardware laid out before assembly."
                  />
                  <figcaption hidden>
                    <strong>Figure 9.</strong> Individual components and mounting hardware arranged before
                    assembly of the motor-control system.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig10-assembly.avif")}
                    alt="Arduino and stepper motor positioned on the panel."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 10.</strong> Initial positioning of the Arduino and stepper motor before
                    the L298N driver on the mounting panel.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig11-assembly.avif")}
                    alt="Component layout on the panel without wiring."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 11.</strong> Component layout on the mounting panel before completion of
                    the electrical connections.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig12-assembly.avif")}
                    alt="Close-up of the L298N motor driver."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 12.</strong> Close-up of the L298N motor driver module and its terminal
                    connections.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig13-assembly.avif")}
                    alt="Arduino Uno board in its printed frame with wires connected."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 13.</strong> Arduino Uno board used as the microcontroller for stepper
                    motor control.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig14-assembly.avif")}
                    alt="Adjustable DC power supply wired to the circuit."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 14.</strong> Adjustable DC power supply and its connection to the
                    motor-control circuit and to the Arduino Uno ground.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig15-assembly.avif")}
                    alt="Close-up of power and driver wiring."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 15.</strong> Close-up of the power supply and motor-driver wiring during
                    circuit assembly.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig16-assembly.avif")}
                    alt="Motor driver mounted on the panel with motor and control wiring."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 16.</strong> Motor driver installed on the mounting panel, showing the
                    connected motor and control wiring.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig17-assembly.avif")}
                    alt="Stepper motor seated in the red 3D-printed support."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 17.</strong> 3D-printed motor support securing the motor in the prototype
                    assembly, and its connection to the L298N driver.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig18-assembly.avif")}
                    alt="Bench arrangement with laboratory stands during assembly."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 18.</strong> Laboratory arrangement during assembly with the laboratory
                    stands.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig19-assembly.avif")}
                    alt="Circuit secured on the stands before the basket is attached."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 19.</strong> Overall view of the experimental set-up used to secure the
                    circuit before the basket attachment.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig20-assembly.avif")}
                    alt="Disassembled basket, shaft and coupling parts."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 20.</strong> Disassembled rotating-basket assembly, showing the mesh
                    basket, shaft and coupling components.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig21-assembly.avif")}
                    alt="Stainless-steel mesh basket with stem and coupling."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 21.</strong> Stainless-steel mesh basket and stem used as the rotating
                    capsule-retention unit.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig22-assembly.avif")}
                    alt="Bioreactor prototype being installed on the bench."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 22.</strong> Rotating-bed bioreactor prototype installation and assembly.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig23-assembly.avif")}
                    alt="Mesh basket lowered into the glass reaction vessel."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 23.</strong> Rotating mesh basket positioned inside the reaction vessel for
                    the bioreactor configuration.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig24-assembly.avif")}
                    alt="Assembled bioreactor with its motor-control system on the bench."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 24.</strong> Laboratory set-up showing the assembled bioreactor and its
                    motor-control system.
                  </figcaption>
                </figure>{" "}
                <figure className="cp-carousel__slide">
                  <img
                    src={img("hw-fig25-assembly.avif")}
                    alt="Complete arrangement with bioreactor, electronics and laptop running the control interface."
                    loading="lazy"
                  />
                  <figcaption hidden>
                    <strong>Figure 25.</strong> Complete experimental arrangement with the rotating-bed
                    bioreactor, control electronics and computer interface.
                  </figcaption>
                </figure>{" "}
              </div>{" "}
              <span className="cp-carousel__counter" aria-live="polite">
                1 of 17
              </span>{" "}
            </div>{" "}
            <button
              className="cp-carousel__arrow cp-carousel__arrow--next"
              type="button"
              data-next=""
              aria-label="Next figure"
            >
              <svg className="cp-carousel__arrowhead" viewBox="0 0 9 14">
                <path d="m1 1 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
            </button>{" "}
          </div>{" "}
          <p className="hw-carousel__caption" id="assembly-caption" aria-live="polite"></p>{" "}
          <div className="hw-thumbs" id="assembly-thumbs" aria-label="All assembly figures"></div>{" "}
        </div>{" "}
        <div className="pd-subsection" id="control">
          {" "}
          <h4 className="hw-h4">
            <span className="hw-num">3.2.3</span>Control circuit and software
          </h4>{" "}
          <p>
            <strong>Why speed control matters.</strong> Rotation is driven by a motor controlled through an
            Arduino-based circuit, which allows the rotation speed to be set and held at a defined value.{" "}
            <strong>Rotation speed is the main operating variable of the reactor</strong> [
            <a className="vsi-citation" href="#ref-13">
              13
            </a>
            ,{" "}
            <a className="vsi-citation" href="#ref-15">
              15
            </a>
            ], since it governs the balance between effluent homogenisation and the mechanical stress applied
            to the capsules. Being able to fix it reproducibly is what turns the prototype into a controllable
            system rather than a demonstration.
          </p>{" "}
          <p>
            <strong>Electronic architecture.</strong> The current prototype uses a 42BYGHW811L20P1 stepper
            motor controlled by an Arduino Uno through an L298N motor driver. This configuration{" "}
            <strong>
              replaced an earlier prototype based on a continuous-rotation servo and a servo-driver shield
            </strong>
            , which could not hold a defined speed under load. The architecture is divided in two. The Arduino
            executes the motor-control logic and generates the stepping commands, while a Python application
            on the computer provides the user interface. Commands are transmitted over USB serial at 9600
            baud.
          </p>{" "}
          <p>
            The Arduino is connected to the L298N through four digital outputs, and the motor windings connect
            to the driver outputs.
          </p>{" "}
          <div className="hw-pins" aria-label="Arduino to L298N wiring">
            {" "}
            <span className="hw-pin">
              D8 <i>→</i> IN1
            </span>{" "}
            <span className="hw-pin">
              D9 <i>→</i> IN2
            </span>{" "}
            <span className="hw-pin">
              D10 <i>→</i> IN3
            </span>{" "}
            <span className="hw-pin">
              D11 <i>→</i> IN4
            </span>{" "}
            <span className="hw-pin">
              GND <i>→</i> GND (L298N)
            </span>{" "}
            <span className="hw-pin">
              Supply <i>=</i> 5 V
            </span>{" "}
          </div>{" "}
          <p>
            During testing, a 12 V supply resulted in excessive motor speed and heating in the driver
            assembly, and the configuration was subsequently adjusted to <strong>5 V</strong>.
          </p>{" "}
        </div>{" "}
        <div className="pd-subsection" id="circuit">
          {" "}
          <h4 className="hw-h4">
            <span className="hw-num">3.2.4</span>Circuit design and iteration
          </h4>{" "}
          <p>
            The motor-control system evolved from an initial continuous-rotation servo configuration to a
            stepper-motor design. The initial set-up used an Arduino Uno and a Keyestudio Servo Driver Shield
            to control the servo. The system was subsequently redesigned using a 42BYGHW811L20P1 stepper motor
            and an L298N motor driver, controlled by an Arduino Uno and a Python interface communicating over
            USB serial at 9600 baud.
          </p>{" "}
          <p>
            The stepper-motor configuration was retained for the rotating-bed prototype. The motor driver
            receives the control signals from the Arduino, while the Python interface allows the user to
            adjust the operating level and set rotation durations. During testing, a 12 V supply caused
            excessive current draw and noticeable heating of the driver module, since{" "}
            <strong>the L298N does not limit coil current and the motor is rated at 3.1 V</strong>. The supply
            was therefore reduced to 5 V for the final test configuration.{" "}
            <strong>
              Rotation speed itself is set by the step rate commanded from the Arduino, not by the supply
              voltage.
            </strong>
          </p>{" "}
          <figure className="vsi-figure vsi-figure--narrow">
            {" "}
            <img
              src={img("hw-fig26-wiring.avif")}
              alt="Wiring diagram of the Arduino Uno, L298N driver, stepper motor and 5 V supply."
              loading="lazy"
            />{" "}
            <figcaption>
              <strong>Figure 26.</strong> Final wiring diagram of the stepper-motor control system. The
              diagram documents the Arduino Uno digital control connections, the L298N motor-driver inputs,
              the stepper-motor output connections and the 5 V test power configuration, including the ground
              connections required to reproduce the experimental set-up.
            </figcaption>{" "}
          </figure>{" "}
          <h4>Software control and timed operation</h4>{" "}
          <p>
            The motor is controlled through two programs communicating over USB serial. The Python application
            runs on the computer and provides the keyboard interface, while the Arduino program receives
            commands and drives the stepper motor through the L298N driver.
          </p>{" "}
          <div className="hw-keys">
            {" "}
            <span>
              <kbd>W</kbd>increase level
            </span>{" "}
            <span>
              <kbd>S</kbd>decrease level
            </span>{" "}
            <span>
              <kbd>Space</kbd>stop
            </span>{" "}
            <span>
              <kbd>T</kbd>timed rotation (duration in s)
            </span>{" "}
            <span>
              <kbd>Esc</kbd>exit and shut down
            </span>{" "}
          </div>{" "}
          <p>
            The remaining time is displayed during a timed rotation, and the program sends a stop command when
            the requested duration expires. The Arduino maintains the selected operating level and executes
            the corresponding motor-control routine.{" "}
            <strong>
              Level 1 is the stopped state, and levels 2 to 30 correspond to programmed settings in increments
              of 5 rpm
            </strong>
            , from 5 to 145 rpm.
          </p>{" "}
          <div className="callout hw-note">
            {" "}
            <span className="callout__label">Safety note</span>{" "}
            <p>
              The timed-rotation function is managed by Python rather than by an independent timer on the
              Arduino, so the automatic stop depends on the computer program remaining active and
              communicating with the microcontroller.{" "}
              <strong>The software stop is not an independent emergency-stop mechanism</strong> and should not
              be treated as one.
            </p>{" "}
          </div>{" "}
          <p>
            <strong>Installing the Python libraries.</strong> In Visual Studio Code, open a terminal
            (Terminal, New Terminal) and run <code>py -m pip install pyserial</code> for serial communication
            with the Arduino and <code>py -m pip install keyboard</code> for keyboard input. Then press{" "}
            <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>, select <em>Python: Select Interpreter</em> and
            choose the environment where the libraries were installed. The serial port is set in the script as{" "}
            <code>COM9</code>; change it to the port your Arduino uses.
          </p>{" "}
          <div className="medals-links">
            {" "}
            <a className="medals-link-btn" href={FILES.py} download="L298N_V4_30_python.py">
              Control interface <small>Python</small>
            </a>{" "}
            <a className="medals-link-btn" href={FILES.ino} download="L298N_V4_30_Arduino.ino">
              Motor firmware <small>Arduino</small>
            </a>{" "}
          </div>{" "}
        </div>{" "}
        <div className="pd-subsection" id="retention">
          {" "}
          <h4 className="hw-h4">
            <span className="hw-num">3.2.5</span>Core-shell retention and mechanical integrity
          </h4>{" "}
          <p>
            Preliminary experiments assessed whether the{" "}
            <strong>
              rotating basket retains the alginate core-shell capsules and preserves their visible structural
              integrity under different operating conditions.
            </strong>
          </p>{" "}
          <p>
            The basket was loaded with 30 capsules and tested under dry operation, immersed in water and
            immersed in real industrial wastewater. The basket was fully submerged during the liquid tests.
            Rotation speeds of 45 and 145 rpm were used, the latter being the maximum the control system
            provides (Section 3.2.4).
          </p>{" "}
          <div className="pd-table-wrap">
            {" "}
            <table className="pd-table hw-table--matrix">
              <caption>
                <strong>Table 4.</strong> Test conditions for capsule retention, 30 capsules per run.
              </caption>
              <thead>
                <tr>
                  <th>Medium</th>
                  <th>15 min</th>
                  <th>30 min</th>
                  <th>60 min</th>
                  <th>60 min</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dry operation</td>
                  <td>
                    <span className="hw-rpm">45 rpm</span>
                  </td>
                  <td>
                    <span className="hw-rpm">45 rpm</span>
                  </td>
                  <td>
                    <span className="hw-rpm">45 rpm</span>
                  </td>
                  <td>
                    <span className="hw-rpm hw-rpm--max">145 rpm</span>
                  </td>
                </tr>
                <tr>
                  <td>Water</td>
                  <td>
                    <span className="hw-rpm">45 rpm</span>
                  </td>
                  <td>
                    <span className="hw-rpm">45 rpm</span>
                  </td>
                  <td>
                    <span className="hw-rpm">45 rpm</span>
                  </td>
                  <td>
                    <span className="hw-rpm hw-rpm--max">145 rpm</span>
                  </td>
                </tr>
                <tr>
                  <td>Industrial wastewater</td>
                  <td>
                    <span className="hw-rpm">45 rpm</span>
                  </td>
                  <td>
                    <span className="hw-rpm">45 rpm</span>
                  </td>
                  <td>
                    <span className="hw-rpm">45 rpm</span>
                  </td>
                  <td>
                    <span className="hw-rpm hw-rpm--max">145 rpm</span>
                  </td>
                </tr>
              </tbody>
            </table>{" "}
          </div>{" "}
          <p>
            <strong>Retention.</strong>{" "}
            <strong>All 30 capsules remained inside the basket in every run.</strong> None passed through the
            mesh and none were lost during basket removal. The capsules also remained visibly intact, with no
            cracks, ruptures, fragments or material detachment. What these runs establish is that the basket
            does not lose capsules during operation or handling, and that one hour of rotation at the maximum
            available speed, including in the real effluent, causes no visible mechanical damage.
          </p>{" "}
          <p>
            <strong>Mixing.</strong> The surrounding medium influenced capsule movement. Under dry operation
            the capsules tended to remain grouped, and higher rotation speed increased contact between
            capsules and the basket wall without producing unrestricted movement. Immersion in water did not
            substantially change this, and{" "}
            <strong>apparent mixing was poorest in real industrial wastewater</strong>. These observations
            were visual and are not quantified. They concern bulk movement of the medium within the vessel
            rather than convective flow through the capsule bed, which was not measured. The reduced apparent
            mixing in the real effluent is consistent with its higher viscosity, and with a mesh aperture
            chosen for retention rather than for hydraulic permeability.
          </p>{" "}
          <p>
            <strong>Hardware observation.</strong> These runs are where the thermal limit of the driver was
            identified. At 12 V the L298N became too hot to touch, which made sustained operation unsafe; at 5
            V it remained within acceptable limits through 60-minute runs at maximum speed, with no further
            heat accumulation. All subsequent experiments were conducted at 5 V.
          </p>{" "}
          <div className="callout callout--status">
            {" "}
            <span className="callout__label">Conclusion</span>{" "}
            <p>
              These tests provide preliminary evidence that the basket retains the capsules and that no
              visible mechanical damage occurs over the periods tested. They do not characterise retention
              under packed-bed loading, nor the flow of a viscous medium through the bed, and both remain to
              be done.
            </p>{" "}
          </div>{" "}
          <div className="hw-video-row">
            {" "}
            <figure className="vsi-figure">
              {" "}
              <IgemVideo {...VIDEOS.video3} />{" "}
              <figcaption>
                <strong>Video 2.</strong> Rotating-bed bioreactor during a preliminary test.
              </figcaption>{" "}
            </figure>{" "}
            <figure className="vsi-figure">
              {" "}
              <IgemVideo {...VIDEOS.video4} />{" "}
              <figcaption>
                <strong>Video 3.</strong> Rotating-bed bioreactor at 120 rpm in dry conditions.
              </figcaption>{" "}
            </figure>{" "}
          </div>{" "}
        </div>{" "}
        <div className="pd-subsection" id="mixing">
          {" "}
          <h4 className="hw-h4">
            <span className="hw-num">3.2.6</span>Mixing characterisation
          </h4>{" "}
          <p>
            This experiment characterises the{" "}
            <strong>
              mixing achieved in the vessel during basket rotation, and establishes whether rotation alone is
              sufficient to homogenise the real effluent.
            </strong>
          </p>{" "}
          <p>
            To measure mixing capacity in water, a blue dye was injected as a pulse and its dispersion
            followed visually, as a qualitative dye-dispersion test rather than a quantified mixing-time
            measurement. The protocol was run with and without core-shell capsules loaded in the basket. In
            the water trials, with and without capsules,{" "}
            <strong>the dye dispersed uniformly throughout the vessel</strong>, indicating adequate bulk
            mixing at the speeds tested.
          </p>{" "}
          <p>
            Mixing was also studied in industrial wastewater to establish whether its particle load, viscosity
            or density differences would impair homogenisation. In real industrial wastewater,{" "}
            <strong>localised stagnant zones persisted</strong>, confirming the reduced mixing already noted
            in Section 3.2.5 and showing that rotation of the basket alone does not homogenise this medium.
          </p>{" "}
          <p>
            This is the clearest limitation identified in the prototype, and it points to a specific next step
            rather than a flaw in the architecture.{" "}
            <strong>
              The most direct remedy is a stirring blade placed in the vessel, outside the basket
            </strong>
            , to provide an additional convective mechanism and break up the dead zones that basket rotation
            cannot eliminate. It was not implemented in the present prototype and is proposed as a
            modification for a subsequent iteration. Adding it would not alter the containment logic of the
            reactor. Because the capsules remain confined inside the rotating basket at all times, such a
            blade would act only on the free liquid and would never contact them. This is precisely what
            distinguishes the configuration from the stirred tank discarded in Section 3.1, where the capsules
            would be dispersed throughout the vessel and exposed directly to the impeller.
          </p>{" "}
        </div>{" "}
      </section>{" "}
      {/* 4. 3D MODELLING */}{" "}
      <section className="pd-section" id="modelling" style={{ "--sec": "#6b4e9a" } as CSSProperties}>
        {" "}
        <h2>
          <span className="hw-num">4.</span>3D modelling and open-source Blender tools
        </h2>{" "}
        <figure className="vsi-figure">
          {" "}
          <IgemVideo {...VIDEOS.video5} />{" "}
          <figcaption>
            <strong>Video 4.</strong> Animated render of the rotating-bed bioreactor assembly, produced in
            Blender with the scripts described below.
          </figcaption>{" "}
        </figure>{" "}
        <p>
          The hardware was modelled in <strong>Blender</strong>. We combined our prior 3D modelling experience
          with AI assistance for the harder problems, specifically mechanical animation and procedural
          materials.
        </p>{" "}
        <p>
          During that process we wrote <strong>executable Python scripts for Blender</strong> that generate
          structures, apply materials or configure rendering settings automatically. Seven of them are
          released as open-source tools under the MIT Licence on{" "}
          <a className="vsi-wikilink" href="https://2026.igem.wiki/madrid-ucm/contribution">
            Contribution, Open-source Blender tools
          </a>
          , where each one is documented so that a team with no Blender scripting experience can adapt it.
        </p>{" "}
        <div className="pd-subsection">
          {" "}
          <h3>
            <span className="hw-num">4.1</span>Generalist tools
          </h3>{" "}
          <div className="hw-tool-grid">
            {" "}
            <div className="hw-flip hw-tool-card" role="button" tabIndex={0} aria-pressed="false">
              <div className="hw-flip__inner">
                <div className="hw-flip__face hw-flip__front">
                  <span className="hw-tool-card__tag">Material</span>
                  <span className="hw-flip__q">Procedural hydrogel and core-shell material generator</span>
                  <span className="hw-flip__hint">Select to see what it does</span>
                </div>
                <div className="hw-flip__face hw-flip__back">
                  <p>
                    Creates a 3D model of a bead such as an alginate capsule and applies a procedural
                    material, generated through mathematical nodes rather than loaded from an image file. It
                    produces a density gradient with a{" "}
                    <strong>cloudy inner core and a transparent outer shell</strong>. Useful for visualising
                    biological particles, cells or wet hydrogel encapsulations.
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className="hw-flip hw-tool-card" role="button" tabIndex={0} aria-pressed="false">
              <div className="hw-flip__inner">
                <div className="hw-flip__face hw-flip__front">
                  <span className="hw-tool-card__tag">Shader</span>
                  <span className="hw-flip__q">Industrial honeycomb and micro-perforated mesh shader</span>
                  <span className="hw-flip__hint">Select to see what it does</span>
                </div>
                <div className="hw-flip__face hw-flip__back">
                  <p>
                    Perforated meshes normally require thousands of polygons. This script reproduces the
                    appearance with maths and alpha masks, wrapping a hexagonal grid with micro-perforations
                    around any cylindrical object{" "}
                    <strong>without adding a single vertex to the geometry</strong>.
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className="hw-flip hw-tool-card" role="button" tabIndex={0} aria-pressed="false">
              <div className="hw-flip__inner">
                <div className="hw-flip__face hw-flip__front">
                  <span className="hw-tool-card__tag">Lighting and camera</span>
                  <span className="hw-flip__q">Macro-scale studio lighting and camera rig</span>
                  <span className="hw-flip__hint">Select to see what it does</span>
                </div>
                <div className="hw-flip__face hw-flip__back">
                  <p>
                    Blender assumes one unit equals one metre, so lighting breaks down for hardware measured
                    in millimetres. This script spawns a <strong>three-point lighting set-up</strong> and a
                    tracking camera calibrated for millimetre-scale macro work.
                  </p>
                </div>
              </div>
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="pd-subsection">
          {" "}
          <h3>
            <span className="hw-num">4.2</span>Situational workflows
          </h3>{" "}
          <p>These require adaptation to a given project, but contain reusable Blender Python techniques.</p>{" "}
          <div className="hw-tool-grid hw-tool-grid--2">
            {" "}
            <div className="hw-flip hw-tool-card" role="button" tabIndex={0} aria-pressed="false">
              <div className="hw-flip__inner">
                <div className="hw-flip__face hw-flip__front">
                  <span className="hw-tool-card__tag">Performance</span>
                  <span className="hw-flip__q">Optimised instancing for high-volume particles</span>
                  <span className="hw-flip__hint">Select to see what it does</span>
                </div>
                <div className="hw-flip__face hw-flip__back">
                  <p>
                    Filling a bioreactor with hundreds of beads can freeze the viewport. This script shares a
                    single low-polygon mesh across all copies and applies a cheap transparency material
                    instead of physically accurate glass.
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className="hw-flip hw-tool-card" role="button" tabIndex={0} aria-pressed="false">
              <div className="hw-flip__inner">
                <div className="hw-flip__face hw-flip__front">
                  <span className="hw-tool-card__tag">Modelling</span>
                  <span className="hw-flip__q">Parametric hardware modelling and text engraving</span>
                  <span className="hw-flip__hint">Select to see what it does</span>
                </div>
                <div className="hw-flip__face hw-flip__back">
                  <p>
                    Builds a complete device entirely through code, including a procedurally knurled metal
                    texture and <strong>3D text wrapped and carved into a curved surface</strong> with Boolean
                    operations.
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className="hw-flip hw-tool-card" role="button" tabIndex={0} aria-pressed="false">
              <div className="hw-flip__inner">
                <div className="hw-flip__face hw-flip__front">
                  <span className="hw-tool-card__tag">Geometry</span>
                  <span className="hw-flip__q">Procedural mesh slicing and hinge assembly</span>
                  <span className="hw-flip__hint">Select to see what it does</span>
                </div>
                <div className="hw-flip__face hw-flip__back">
                  <p>
                    Uses Blender's internal BMesh API to{" "}
                    <strong>slice an object at an exact height coordinate</strong>, which makes exploded views
                    and mechanical separation animations possible without cutting geometry by hand.
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className="hw-flip hw-tool-card" role="button" tabIndex={0} aria-pressed="false">
              <div className="hw-flip__inner">
                <div className="hw-flip__face hw-flip__front">
                  <span className="hw-tool-card__tag">Animation</span>
                  <span className="hw-flip__q">Automated infinite rotation loop</span>
                  <span className="hw-flip__hint">Select to see what it does</span>
                </div>
                <div className="hw-flip__face hw-flip__back">
                  <p>
                    Inserts keyframes with linear interpolation through code, producing a{" "}
                    <strong>seamless infinite spin</strong> without acceleration artefacts. Relevant to
                    stirrers, rotors and, here, the rotating basket.
                  </p>
                </div>
              </div>
            </div>{" "}
          </div>{" "}
          <div className="medals-links">
            {" "}
            <a className="medals-link-btn" href="https://2026.igem.wiki/madrid-ucm/contribution">
              See the seven scripts on Contribution <small>Blender · Python</small>
            </a>{" "}
          </div>{" "}
        </div>{" "}
        <div className="pd-subsection">
          {" "}
          <h3>
            <span className="hw-num">4.3</span>How to run these scripts
          </h3>{" "}
          <p>There are three ways to execute the code, and they are not equivalent.</p>{" "}
          <div className="hw-bubbles">
            <details className="hw-bubble">
              <summary>
                <span className="hw-bubble__label">A</span>
                <span className="hw-bubble__title">Python console</span>
                <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 3.5 L5 6.5 L8 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </summary>
              <div className="hw-bubble__body">
                <p>
                  Change any window to the Python console and enter instructions line by line. Useful for
                  testing short commands, uncomfortable for long scripts.
                </p>
              </div>
            </details>
            <details className="hw-bubble">
              <summary>
                <span className="hw-bubble__label">B</span>
                <span className="hw-bubble__title">Text editor (recommended)</span>
                <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 3.5 L5 6.5 L8 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </summary>
              <div className="hw-bubble__body">
                <p>
                  Open the Scripting workspace, create a new text block, paste the complete code and press Run
                  Script, or <kbd>Alt</kbd>+<kbd>P</kbd>.
                </p>
              </div>
            </details>
            <details className="hw-bubble">
              <summary>
                <span className="hw-bubble__label">C</span>
                <span className="hw-bubble__title">Terminal or external integration</span>
                <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 3.5 L5 6.5 L8 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </summary>
              <div className="hw-bubble__body">
                <p>
                  A program can launch Blender in the background with a Python file. A standard terminal{" "}
                  <strong>
                    cannot run scripts that import <code>bpy</code>
                  </strong>{" "}
                  on its own, since they need Blender's Python environment and, mostly, a loaded scene.
                </p>
              </div>
            </details>
          </div>{" "}
        </div>{" "}
        <div className="pd-subsection">
          {" "}
          <h3>
            <span className="hw-num">4.4</span>Licence and reuse
          </h3>{" "}
          <p>
            The seven scripts are released under the{" "}
            <a className="vsi-wikilink" href="https://opensource.org/licenses/MIT">
              MIT Licence
            </a>
            , Copyright (c) 2026 rePhlow, iGEM UCM Madrid. Any team may download, modify and redistribute
            them, inside or outside iGEM, provided the copyright notice is kept. They are available as
            downloadable .py files on our{" "}
            <a className="vsi-wikilink" href="https://2026.igem.wiki/madrid-ucm/contribution">
              Contribution
            </a>{" "}
            page, and each file carries the same notice in its header, so the licence travels with the script
            if it is copied on its own. The scripts were written and tested in <strong>Blender 5.0</strong>{" "}
            and are provided as they are, without warranty.
          </p>{" "}
          <p>
            The text and figures of this page are released under{" "}
            <a className="vsi-wikilink" href="https://creativecommons.org/licenses/by/4.0/">
              CC BY 4.0
            </a>
            .
          </p>{" "}
        </div>{" "}
      </section>{" "}
      {/* 5. INDUSTRIAL APPLICATION */}{" "}
      <section className="pd-section" id="scale" style={{ "--sec": "#c99a06" } as CSSProperties}>
        {" "}
        <h2>
          <span className="hw-num">5.</span>Industrial application
        </h2>{" "}
        <div className="pd-subsection" id="scale-up">
          {" "}
          <h3>
            <span className="hw-num">5.1</span>Scaling the reactor to an industrial process
          </h3>{" "}
          <p className="pd-section-lede">
            The rotating bed is an architecture that{" "}
            <strong>scales by multiplication rather than by redesign</strong>.
          </p>{" "}
          <p>
            Capacity is added by installing identical modules in parallel instead of enlarging a single vessel
            [
            <a className="vsi-citation" href="#ref-13">
              13
            </a>
            ,{" "}
            <a className="vsi-citation" href="#ref-15">
              15
            </a>
            ], so the operating principle never changes between the benchtop and the plant. In every module
            the capsules sit confined in a basket and the effluent is driven through the bed [
            <a className="vsi-citation" href="#ref-14">
              14
            </a>
            ,{" "}
            <a className="vsi-citation" href="#ref-15">
              15
            </a>
            ]. What changes from one scale to the next is the number of modules, not the physics inside them.
            Two things follow from that, and they are what make this reactor straightforward to scale where a
            stirred tank is not [
            <a className="vsi-citation" href="#ref-1">
              1
            </a>
            ].
          </p>{" "}
          <div className="hw-bubbles">
            <details className="hw-bubble">
              <summary>
                <span className="hw-bubble__title">The proportions set the flow, not the size</span>
                <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 3.5 L5 6.5 L8 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </summary>
              <div className="hw-bubble__body">
                <p>
                  The flow driven through the bed is governed by the vessel geometry around the rotor. Narrow,
                  baffled vessels increase it, a wall placed too far from the rotor stops influencing it, and
                  the clearance beneath the basket does not matter [
                  <a className="vsi-citation" href="#ref-14">
                    14
                  </a>
                  ].
                </p>
              </div>
            </details>
            <details className="hw-bubble">
              <summary>
                <span className="hw-bubble__title">The equipment exists</span>
                <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 3.5 L5 6.5 L8 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </summary>
              <div className="hw-bubble__body">
                <p>
                  Rotating-bed units are commercially available from millilitre to production volumes [
                  <a className="vsi-citation" href="#ref-16">
                    16
                  </a>
                  ], so the module is a procurement decision rather than a development project.
                </p>
              </div>
            </details>
          </div>{" "}
        </div>{" "}
        <div className="pd-subsection" id="study">
          {" "}
          <h3>
            <span className="hw-num">5.2</span>Our study case
          </h3>{" "}
          <p>
            The reference case is the pilot throughput used in our{" "}
            <a className="vsi-wikilink" href="https://2026.igem.wiki/madrid-ucm/sustainability">
              sustainability analysis
            </a>
            .
          </p>{" "}
          <div className="hw-stats">
            {" "}
            <div className="hw-stat">
              <b>20 m³/h</b>
              <span>degumming effluent, 480 m³/day</span>
            </div>{" "}
            <div className="hw-stat">
              <b>2,290 mg P/L</b>
              <span>phosphorus in the influent</span>
            </div>{" "}
            <div className="hw-stat">
              <b>≈ 46 kg P/h</b>
              <span>phosphorus entering the plant</span>
            </div>{" "}
            <div className="hw-stat">
              <b>≥ 2 h</b>
              <span>contact time, a lower bound</span>
            </div>{" "}
          </div>{" "}
          <div className="hw-bubbles hw-bubbles--steps">
            {" "}
            <details className="hw-bubble">
              <summary>
                <span className="hw-bubble__label">Step 1</span>
                <span className="hw-bubble__title">Reactor volume follows from contact time</span>
                <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 3.5 L5 6.5 L8 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </summary>
              <div className="hw-bubble__body">
                <p>
                  The phosphorus-uptake assay is still rising at 120 min (see{" "}
                  <a className="vsi-wikilink" href="https://2026.igem.wiki/madrid-ucm/engineering">
                    Engineering
                  </a>
                  ), so the contact time is at least two hours. That assay was performed with free cells in a
                  well-mixed medium, and it therefore measures only the biological step. In the reactor,
                  phosphate must also cross the external film around each capsule, which rotation speed
                  governs, and then diffuse through the shell and core. For a capsule radius of 1.75 mm and a
                  diffusion coefficient of the order of 10⁻⁹ m²/s, the characteristic diffusion time alone is
                  already of the order of tens of minutes.{" "}
                  <strong>
                    The two-hour figure is a lower bound, and the mass transfer of this system has not been
                    studied.
                  </strong>{" "}
                  The established route to resolving it is the one applied to rotating-bed reactors, in which
                  the liquid-solid transfer coefficient is obtained from Sherwood correlations and coupled to
                  the simulated flow through the bed [
                  <a className="vsi-citation" href="#ref-14">
                    14
                  </a>
                  ]. Taken at face value, two hours of contact at 20 m³/h means the plant holds{" "}
                  <strong>about 40 m³ of effluent in treatment at any moment</strong>.
                </p>
              </div>
            </details>{" "}
            <details className="hw-bubble">
              <summary>
                <span className="hw-bubble__label">Step 2</span>
                <span className="hw-bubble__title">Bed volume follows from the bed fraction</span>
                <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 3.5 L5 6.5 L8 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </summary>
              <div className="hw-bubble__body">
                <p>
                  We adopt the vessel-to-basket ratio of 1:2.3 measured in the prototype, used here as a{" "}
                  <strong>sizing convention</strong> for the fraction of the reactor occupied by bed. It is
                  not a hydrodynamic similarity criterion. The vessel-wall effects documented by CFD depend on
                  absolute clearances and baffle depths rather than on ratios alone [
                  <a className="vsi-citation" href="#ref-14">
                    14
                  </a>
                  ], so a rigorous scale-up would be carried out at constant superficial velocity through the
                  bed, and that study has not been done. On this convention the plant requires{" "}
                  <strong>about 17 m³ of bed</strong>.
                </p>
              </div>
            </details>{" "}
            <details className="hw-bubble">
              <summary>
                <span className="hw-bubble__label">Step 3</span>
                <span className="hw-bubble__title">
                  Capsule inventory follows from capacity, and the question is whether the capsules fit
                </span>
                <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 3.5 L5 6.5 L8 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </summary>
              <div className="hw-bubble__body">
                <p>
                  Each two-hour cycle treats 40 m³ and, at 1.95 kg of phosphorus recovered per cubic metre,
                  must therefore store <strong>78 kg of phosphorus</strong> inside the capsules present in the
                  reactors during that cycle. How many capsules that takes depends on how much phosphorus a
                  gram of capsule can hold.
                </p>{" "}
                <div
                  className="hw-fit"
                  role="figure"
                  aria-label="Capsule volume required against the 17 cubic metres of bed available"
                >
                  {" "}
                  <p className="hw-fit__title" style={{ margin: "0", textAlign: "left" }}>
                    Capsule volume needed against the bed available (17 m³, dashed)
                  </p>{" "}
                  <div className="hw-fit__row">
                    {" "}
                    <div className="hw-fit__label">
                      1.5 mg P/g<small>current capacity</small>
                    </div>{" "}
                    <div className="hw-fit__track">
                      {" "}
                      <div className="hw-fit__bed" style={{ width: "32.7%" }}></div>{" "}
                      <div
                        className="hw-fit__fill hw-fit__fill--over"
                        style={{ width: "calc(100% - 10px)" }}
                      ></div>{" "}
                      <span className="hw-fit__value" style={{ right: "10px", color: "#fff" }}>
                        ≈ 52 m³ · does not fit
                      </span>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="hw-fit__row">
                    {" "}
                    <div className="hw-fit__label">
                      8 mg P/g<small>target capacity</small>
                    </div>{" "}
                    <div className="hw-fit__track">
                      {" "}
                      <div className="hw-fit__bed" style={{ width: "32.7%" }}></div>{" "}
                      <div
                        className="hw-fit__fill hw-fit__fill--ok"
                        style={{ width: "calc(18.8% - 5px)" }}
                      ></div>{" "}
                      <span className="hw-fit__value" style={{ left: "calc(32.7% + 10px)" }}>
                        ≈ 9.8 m³ · 56 % of the bed
                      </span>{" "}
                    </div>{" "}
                  </div>{" "}
                  <p className="hw-fit__legend" style={{ marginTop: "14px", textAlign: "left" }}>
                    Bars to scale. Capsules are about 95 % water, so 1 tonne of capsules occupies roughly 1
                    m³.
                  </p>{" "}
                </div>{" "}
                <p>
                  At the <strong>current capacity of 1.5 mg P/g</strong>, storing 78 kg of phosphorus would
                  take about <strong>52 tonnes of capsules</strong>. Since a capsule is 95 % water, its
                  density is close to 1 kg/L, so that is roughly{" "}
                  <strong>52 m³ of capsules competing for the 17 m³ of bed the reactors provide</strong>. They
                  do not fit. The design does not close, not because the process performs badly but because
                  the material has nowhere to go.
                </p>{" "}
                <p>
                  At the <strong>target of 8 mg P/g</strong>, the same 78 kg requires about{" "}
                  <strong>9.8 tonnes</strong>, roughly 9.8 m³, which occupies{" "}
                  <strong>56 % of the bed volume</strong>. The remaining 44 % is the void space between
                  capsules, through which the effluent flows. A 56 % solids fraction is an ordinary value for
                  packed spheres, so at this capacity the capsules fit with room for the liquid to circulate [
                  <a className="vsi-citation" href="#ref-17">
                    17
                  </a>
                  ].
                </p>{" "}
                <p>
                  <strong>
                    This is also where modularity earns its place as an engineering decision rather than a
                    convenience.
                  </strong>{" "}
                  In a single-vessel design, an error in the contact time or the packing fraction would be an
                  error in the size of a vessel already built. In a modular plant it is absorbed by the number
                  of modules installed, which is decided at commissioning and can be revised afterwards. The
                  parameters still open therefore propagate to how many units a facility buys, not to whether
                  the design works.
                </p>
              </div>
            </details>{" "}
            <details className="hw-bubble">
              <summary>
                <span className="hw-bubble__label">Step 4</span>
                <span className="hw-bubble__title">Module size and number</span>
                <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 3.5 L5 6.5 L8 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </summary>
              <div className="hw-bubble__body">
                <p>
                  Dividing 17 m³ of bed among identical modules gives of the order of{" "}
                  <strong>thirty to forty modules of about 0.5 m³ bed volume</strong>, or around a hundred and
                  seventy of about 0.1 m³.
                </p>{" "}
                <p>
                  There is also a physical ceiling on module height. Packing density rises with confining
                  stress [
                  <a className="vsi-citation" href="#ref-18">
                    18
                  </a>
                  ], and confining stress rises with bed depth, so a tall bed consolidates at the bottom,
                  reducing the void fraction exactly where most of the capsules are and restricting the flow
                  through them.{" "}
                  <strong>
                    Shallow modules in parallel are therefore preferable to fewer deep ones on hydrodynamic
                    grounds, not only operational ones.
                  </strong>
                </p>
              </div>
            </details>{" "}
            <details className="hw-bubble">
              <summary>
                <span className="hw-bubble__label">Step 5</span>
                <span className="hw-bubble__title">Operating mode</span>
                <svg className="hw-chev" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 3.5 L5 6.5 L8 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </summary>
              <div className="hw-bubble__body">
                <p>
                  Each module runs a batch cycle: fill, rotate for the contact time, stop, withdraw the
                  basket, recover the capsules and reload. The plant is continuous because the modules are{" "}
                  <strong>staggered</strong>, so that at any moment some are treating while others are being
                  unloaded.
                </p>{" "}
                <p>
                  <strong>Parallel, series, or both.</strong> Adding modules in parallel divides the flow and
                  makes capacity incremental, but it does not by itself improve conversion. If the discharge
                  target proves demanding, the efficient configuration may be parallel trains each containing
                  two stages in series rather than parallel modules alone.
                </p>
              </div>
            </details>{" "}
          </div>{" "}
          <div className="callout callout--status">
            {" "}
            <span className="callout__label">What governs viability sits upstream of the reactor</span>{" "}
            <p>
              The sizing above assumes a capsule that can be regenerated and returned to the basket. The
              inventory is <strong>9.8 tonnes resident in the plant</strong>, and the rate at which capsules
              must be manufactured is that inventory divided by their service life. On the only datum
              available, about one week of integrity in untreated effluent without agitation (see{" "}
              <a className="vsi-wikilink" href="https://2026.igem.wiki/madrid-ucm/results">
                Encapsulation
              </a>
              ), the plant would need roughly <strong>1.4 tonnes of new capsules per day</strong>, which at
              the capsule mass measured by thermogravimetry is of the order of 10⁸ capsules a day. Capsule
              production is therefore an industrial unit operation in its own right.{" "}
              <strong>
                Capsule service life and the number of reuse cycles, rather than reactor geometry, decide
                whether this process is viable at scale.
              </strong>
            </p>{" "}
          </div>{" "}
          <p>
            The proposed industrial configuration is a{" "}
            <strong>preliminary design requiring scale-up validation</strong>, and the architecture has been
            chosen so that the parameters still open determine how many modules a plant installs rather than
            whether the reactor works.
          </p>{" "}
        </div>{" "}
        <div className="pd-subsection" id="uf">
          {" "}
          <h3>
            <span className="hw-num">5.3</span>Ultrafiltration unit
          </h3>{" "}
          <p>
            The downstream process consists of a single ultrafiltration (UF) stage that produces a clarified,
            non-potable permeate. Ultrafiltration separates by size exclusion: particles, colloids and
            macromolecules larger than the membrane's nominal pore size are retained on the feed side, while
            water and dissolved salts pass into the permeate [
            <a className="vsi-citation" href="#ref-19">
              19
            </a>
            ]. This is why the permeate is clarified rather than demineralised; reaching potable quality would
            require a further reverse-osmosis stage and UV disinfection, which is outside the scope of this
            design.
          </p>{" "}
          <p>
            Within our process the UF stage is a secondary operation in the strict sense. It does not recover
            phosphorus, which is already inside the capsules by the time the effluent reaches it. Its function
            is to clarify the treated stream and to close the containment chain before anything leaves the
            plant. That ordering matters for sizing, because{" "}
            <strong>
              the reactor determines how much phosphorus is recovered and the membrane only determines what is
              allowed to leave
            </strong>
            .
          </p>{" "}
          <h4>Biocontainment role</h4>{" "}
          <p>
            The membrane is the <strong>second containment barrier</strong>, after the capsule itself. Cells
            or capsule fragments larger than the nominal pore size are retained on the concentrate side, which
            is collected and inactivated as contained waste (stream 7, Figure 2).
          </p>{" "}
          <p>
            This barrier <strong>reduces the probability of cell release but does not eliminate it</strong>,
            and the design treats it accordingly. Ultrafiltration PVDF membranes have been shown to transmit
            bacteria at measurable rates, and repeated alkaline cleaning progressively enlarges the pores, so
            rejection degrades across the membrane's service life rather than remaining constant [
            <a className="vsi-citation" href="#ref-20">
              20
            </a>
            ]. Two consequences follow.
          </p>{" "}
          <ul>
            <li>
              Containment is designed as a <strong>layered chain</strong> (capsule, basket, membrane and
              inactivation of the retentate), and the retentate is inactivated regardless of the rejection
              actually achieved.
            </li>
            <li>
              The <strong>cleaning regime is part of the containment design</strong> and not merely a
              maintenance decision, and rejection should be re-verified over the life of the module rather
              than assumed from its nominal rating. Free nucleic acids fall below the size range retained by
              ultrafiltration and are not addressed by this stage.
            </li>
          </ul>{" "}
          <h4>Which ultrafiltration configuration suits this effluent</h4>{" "}
          <p>
            Two configurations are established in wastewater practice and they behave very differently with a
            feed like ours.
          </p>{" "}
          <div className="hw-compare">
            {" "}
            <div>
              {" "}
              <h4>Submerged hollow-fibre modules</h4>{" "}
              <p>
                Operate under vacuum in an open tank with air scouring [
                <a className="vsi-citation" href="#ref-9">
                  9
                </a>
                ]. Compact and energy-efficient, but designed for a low-solids secondary effluent.
              </p>{" "}
            </div>{" "}
            <div className="is-chosen">
              {" "}
              <h4>Pressurised tubular modules · chosen</h4>{" "}
              <p>
                Operate in cross-flow inside a closed housing at a transmembrane pressure of about 1 bar, with
                wide channels and a high cross-flow velocity that limit cake formation [
                <a className="vsi-citation" href="#ref-20">
                  20
                </a>
                ].
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <p>For this process the tubular, pressurised configuration is the better fit, for three reasons.</p>{" "}
          <ul>
            <li>
              <strong>The feed character matches.</strong> Degumming effluent carries oil and suspended
              solids, and the published tubular PVDF case treats carwash wastewater, the closest industrial
              analogue available: oily, particle-laden and surfactant-bearing [
              <a className="vsi-citation" href="#ref-20">
                20
              </a>
              ]. A submerged hollow-fibre system optimised for municipal secondary effluent would foul rapidly
              on this feed.
            </li>
            <li>
              <strong>The material tolerates the chemistry.</strong> The PVDF membranes documented for that
              duty are rated across pH 1.5 to 12 [
              <a className="vsi-citation" href="#ref-20">
                20
              </a>
              ], which brackets our untreated effluent at pH 1.6 and leaves the upstream conditioning stage
              free to be defined without the membrane constraining it.
            </li>
            <li>
              <strong>The boundary is closed.</strong> A submerged module sits in an open tank and is aerated
              from below, which generates aerosols from the mixed liquor. For a process handling engineered
              bacteria, an open, actively aerated tank is a release pathway that a sealed pressurised housing
              does not have. Containment, not flux, is what decides this one.
            </li>
          </ul>{" "}
          <p>
            Tubular modules pack far less membrane area into the same volume than hollow fibres, so the same
            duty needs a larger footprint and more capital per square metre installed. We accept that cost
            because the containment boundary and the fouling behaviour both favour the closed configuration.
          </p>{" "}
          <div className="callout hw-note">
            {" "}
            <span className="callout__label">Status</span>{" "}
            <p>
              No ultrafiltration performance was measured in this project. Flux, rejection and fouling
              behaviour under real effluent remain undetermined, and the configuration described above is a
              design recommendation derived from published operation of comparable systems, not a validated
              result.
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* 6. NEXT STEPS */}{" "}
      <section className="pd-section" id="next" style={{ "--sec": "#1568a3" } as CSSProperties}>
        {" "}
        <h2>
          <span className="hw-num">6.</span>Next steps and limitations
        </h2>{" "}
        <p>Four main points remain undone.</p>{" "}
        <ol className="hw-timeline">
          <li className="hw-timeline__item">
            <span className="hw-timeline__dot">1</span>
            <div className="hw-timeline__content">
              <h4 className="hw-timeline__title">Flow through the bed in a viscous medium</h4>
              <details className="hw-readmore">
                <summary>Read more</summary>
                <p>
                  <strong>Flow through the bed in a viscous medium has not been quantified</strong>, and a
                  stirring blade acting on the free liquid outside the basket is the first modification a next
                  iteration should make. Because the capsules stay confined, such a blade would never touch
                  them, which is precisely the freedom the stirred tank does not offer.
                </p>
              </details>
            </div>
          </li>
          <li className="hw-timeline__item">
            <span className="hw-timeline__dot">2</span>
            <div className="hw-timeline__content">
              <h4 className="hw-timeline__title">Behaviour at packed-bed loading</h4>
              <details className="hw-readmore">
                <summary>Read more</summary>
                <p>
                  <strong>The mixing and retention tests were run at roughly 1 % bed loading</strong>, so
                  behaviour at the packed densities the industrial sizing assumes is still unknown.
                </p>
              </details>
            </div>
          </li>
          <li className="hw-timeline__item">
            <span className="hw-timeline__dot">3</span>
            <div className="hw-timeline__content">
              <h4 className="hw-timeline__title">An ultrafiltration stage never operated</h4>
              <details className="hw-readmore">
                <summary>Read more</summary>
                <p>
                  <strong>Ultrafiltration was specified but never operated.</strong> The literature is clear
                  that a PVDF membrane reduces rather than eliminates bacterial passage and loses rejection as
                  cleaning enlarges its pores, which is why containment is designed as a layered chain ending
                  in inactivation of the retentate rather than as a single absolute barrier.
                </p>
              </details>
            </div>
          </li>
          <li className="hw-timeline__item">
            <span className="hw-timeline__dot">4</span>
            <div className="hw-timeline__content">
              <h4 className="hw-timeline__title">The pH gap between the effluent and uptake</h4>
              <details className="hw-readmore">
                <summary>Read more</summary>
                <p>
                  <strong>
                    The capsules tolerate the untreated effluent at pH 1.6 but uptake is assayed at pH 5
                  </strong>
                  , and the neutralisation route that would bridge the two degrades the shell. Closing that
                  gap is the upstream conditioning stage deliberately left undefined in our block flow
                  diagram. Taken together with a service life of about one week, which would require
                  manufacturing roughly 1.4 tonnes of capsules a day, these point to the same conclusion:
                  capsule capacity, service life and reuse, not reactor geometry, decide whether this process
                  works at scale.
                </p>
              </details>
            </div>
          </li>
        </ol>{" "}
        <p>
          The architecture was chosen so that the parameters still open determine how many modules a plant
          installs, not whether the reactor functions.
        </p>{" "}
      </section>{" "}
      {/* 7. CONCLUSIONS */}{" "}
      <section className="pd-section" id="conclusions" style={{ "--sec": "#3f7d4a" } as CSSProperties}>
        {" "}
        <h2>
          <span className="hw-num">7.</span>Conclusions
        </h2>{" "}
        <p>
          Hardware translated a biological objective, recovering phosphorus from degumming effluent with
          engineered <em>Pseudomonas putida</em>, into an industrial process.{" "}
          <strong>Immobilising the cells in alginate core-shell capsules</strong> solved containment but{" "}
          <strong>created an engineering problem</strong>. The capsule is simultaneously a{" "}
          <strong>barrier and a mass-transfer interface</strong>, so the reactor had to{" "}
          <strong>mix without destroying the structure the whole process depends on</strong>. That constraint
          led to the <strong>rotating-bed bioreactor design</strong>, in which the capsules are confined in a
          permeable basket and the effluent is driven through them, so the solid phase is never dispersed into
          the bulk liquid and recovery requires no additional solid-liquid separation. The exchange with the
          encapsulation and genetic engineering blocks ran in both directions: capsule diameter set the mesh
          aperture, the capsules' progressive deformation under load ruled out impeller agitation, and the
          reactor's own requirements became the criterion by which the capsule itself was finally selected.
        </p>{" "}
        <p>
          The proof of concept was built from repurposed commercial components for <strong>€113.64</strong> in
          purchased parts. A stainless-steel mesh infuser serves as the rotating basket, a glass jar as the
          vessel, the outer sheath of an extension cable as the motor coupling, and a NEMA 17 stepper driven
          through an L298N by an Arduino Uno with a Python serial interface provides rotation from{" "}
          <strong>5 to 145 rpm</strong> at a supply of 5 V, after a first configuration at 12 V was found to
          overheat the driver. The rotating-bed principle depends on geometry, not on fabrication, so any team
          can reproduce it. Alongside the reactor we released seven Blender Python tools under the MIT
          Licence, documented so that teams with no scripting experience can adapt them.
        </p>{" "}
        <p>
          Testing established mechanical feasibility and located the limit. The basket retained all capsules
          through dry operation, immersion in water and immersion in real industrial wastewater, at 45 and 145
          rpm for up to an hour, with no visible cracking, rupture or material loss. Dye-dispersion tests then
          showed that rotation alone homogenises water but leaves stagnant zones in the real effluent, which
          is viscous and particle-laden. That negative result is the most informative one we obtained, and it
          points to a specific solution rather than a flaw in the architecture.
        </p>{" "}
        <p>
          Projected to the pilot throughput used in our sustainability analysis, 20 m³/h carrying about 46 kg
          of phosphorus per hour, the sizing closes on a single parameter. At the capsules' current capacity
          of 1.5 mg P/g the inventory required would be roughly 52 tonnes competing for 17 m³ of bed, which
          does not fit, whereas at the target of 8 mg P/g it falls to about 9.8 tonnes and occupies 56 % of
          the bed, leaving the liquid a continuous path.{" "}
          <strong>The reactor, in other words, is not what limits this process. The capsule is.</strong>
        </p>{" "}
      </section>{" "}
      {/* 8. REFERENCES */}{" "}
      <section className="pd-section hw-refs-section" id="references">
        {" "}
        <details className="pd-references-accordion hw-refs" id="ref-accordion">
          <summary>References</summary>{" "}
          <ol className="pd-reference-list">
            <li id="ref-1">
              Neubauer P, Cruz N, Glauche F, Junne S, Knepper A, Raven M. Consistent development of
              bioprocesses from microliter cultures to the industrial scale. Engineering in Life Sciences.
              2013;13(3):224–38.{" "}
              <a href="https://doi.org/10.1002/elsc.201200021">https://doi.org/10.1002/elsc.201200021</a>
            </li>
            <li id="ref-2">
              Chubukov V, Mukhopadhyay A, Petzold CJ, Keasling JD, Martín HG. Synthetic and systems biology
              for microbial production of commodity chemicals. npj Systems Biology and Applications.
              2016;2:16009.{" "}
              <a href="https://doi.org/10.1038/npjsba.2016.9">https://doi.org/10.1038/npjsba.2016.9</a>
            </li>
            <li id="ref-3">
              He X, Hu Y, Zhu Y, Li X, Wang K, Dong L, et al. Closing the loop with gates: a scale-up-gated
              design–build–test–learn framework for industrial fermentation. Microorganisms. 2026;14(8):1830.{" "}
              <a href="https://doi.org/10.3390/microorganisms14081830">
                https://doi.org/10.3390/microorganisms14081830
              </a>
            </li>
            <li id="ref-4">
              Chemla Y, Sweeney CJ, Wozniak CA, Voigt CA. Design and regulation of engineered bacteria for
              environmental release. Nature Microbiology. 2025;10(2):281–300.{" "}
              <a href="https://doi.org/10.1038/s41564-024-01918-0">
                https://doi.org/10.1038/s41564-024-01918-0
              </a>
            </li>
            <li id="ref-5">
              Valverde M, de Lorenzo V. Engineered microorganisms for environmental release: current situation
              and future perspectives. International Microbiology. 2026.{" "}
              <a href="https://doi.org/10.1007/s10123-026-00868-3">
                https://doi.org/10.1007/s10123-026-00868-3
              </a>
            </li>
            <li id="ref-6">
              Bai FW, Zhao XQ, Xu J. Immobilization technology. In: Moo-Young M, editor. Comprehensive
              Biotechnology. 2nd ed. Amsterdam: Elsevier; 2011. p. 477–89.{" "}
              <a href="https://doi.org/10.1016/B978-0-08-088504-9.00115-X">
                https://doi.org/10.1016/B978-0-08-088504-9.00115-X
              </a>
            </li>
            <li id="ref-7">
              Pithani S, Karlsson S, Emtenäs H, Öberg CT. Using SpinChem rotating bed reactor technology for
              immobilized enzymatic reactions: a case study. Organic Process Research &amp; Development.
              2019;23(9):1926–31.{" "}
              <a href="https://doi.org/10.1021/acs.oprd.9b00240">https://doi.org/10.1021/acs.oprd.9b00240</a>
            </li>
            <li id="ref-8">
              Ohkouchi Y, Ase T. Determination of log removal values of bacteria by spiral-wound reverse
              osmosis modules and a hollow fiber ultrafiltration module using Escherichia coli and indigenous
              heterotrophic bacteria as indicators. Journal of Water and Health. 2020;18(6):956–67.{" "}
              <a href="https://doi.org/10.2166/wh.2020.153">https://doi.org/10.2166/wh.2020.153</a>
            </li>
            <li id="ref-9">
              Acebrón ÁS, Revert-Vercher J, Sanchis-Perucho P, Borrás L, Seco A. Use of ultrafiltration
              membranes as tertiary/quaternary treatment for wastewater reclamation in municipal WWTPs. Water.
              2025;17(24):3453.{" "}
              <a href="https://doi.org/10.3390/w17243453">https://doi.org/10.3390/w17243453</a>
            </li>
            <li id="ref-10">
              Doxa Microfluidics. Accessories [Internet]. [cited 2026 Oct 18].{" "}
              <a href="https://doxamicrofluidics.com/accessories/">
                https://doxamicrofluidics.com/accessories/
              </a>
            </li>
            <li id="ref-11">
              Bennacef C, Desobry-Banon S, Probst L, Desobry S. Alginate core-shell capsules production
              through coextrusion methods: principles and technologies. Marine Drugs. 2023;21(4):235.{" "}
              <a href="https://doi.org/10.3390/md21040235">https://doi.org/10.3390/md21040235</a>
            </li>
            <li id="ref-12">
              Li Y, Li S, Du X, Qu H, Wang J, Bian P, et al. A novel semi-flexible coaxial nozzle based on
              fluid dynamics effects and its self-centering performance study. Scientific Reports.
              2024;14(1):15606.{" "}
              <a href="https://doi.org/10.1038/s41598-024-66623-8">
                https://doi.org/10.1038/s41598-024-66623-8
              </a>
            </li>
            <li id="ref-13">
              Melidis P, Georgiou D, Aivasidis A. Scale-up and design optimization of anaerobic immobilized
              cell reactors for wastewater treatment. Chemical Engineering and Processing: Process
              Intensification. 2003;42(11):897–908.{" "}
              <a href="https://doi.org/10.1016/S0255-2701(02)00124-1">
                https://doi.org/10.1016/S0255-2701(02)00124-1
              </a>
            </li>
            <li id="ref-14">
              Larsson H, Andersen PAS, Byström E, Gernaey KV, Krühne U. CFD modeling of flow and ion exchange
              kinetics in a rotating bed reactor system. Industrial &amp; Engineering Chemistry Research.
              2017;56(14):3853–65.{" "}
              <a href="https://doi.org/10.1021/acs.iecr.7b00224">https://doi.org/10.1021/acs.iecr.7b00224</a>
            </li>
            <li id="ref-15">
              SpinChem AB. Recycling of immobilized enzymes using rotating bed reactor technology [poster].
              Application 1019. Biocat2016, 8th International Congress on Biocatalysis; 2016 Aug 28 to Sep 1;
              Hamburg, Germany.{" "}
              <a href="https://spinchem.com/application/recycling-of-immobilized-enzymes-using-rotating-bed-reactor-technology/">
                spinchem.com/application/recycling-of-immobilized-enzymes-using-rotating-bed-reactor-technology
              </a>
            </li>
            <li id="ref-16">
              SpinChem AB. Biocatalysis in rotating bed reactors, from screening to production [poster].
              Application 1023. BioTrans2017, 13th International Symposium on Biocatalysis and
              Biotransformations; 2017 Jul 9 to 13; Budapest, Hungary.{" "}
              <a href="https://spinchem.com/application/biocatalysis-in-rotating-bed-reactors-from-screening-to-production/">
                spinchem.com/application/biocatalysis-in-rotating-bed-reactors-from-screening-to-production
              </a>
            </li>
            <li id="ref-17">
              Scott GD, Kilgour DM. The density of random close packing of spheres. Journal of Physics D:
              Applied Physics. 1969;2(6):863–6.{" "}
              <a href="https://doi.org/10.1088/0022-3727/2/6/311">
                https://doi.org/10.1088/0022-3727/2/6/311
              </a>
            </li>
            <li id="ref-18">
              Cárdenas-Barrantes M, Cantor D, Barés J, Renouf M, Azéma E. Three-dimensional compaction of soft
              granular packings. Soft Matter. 2022;18(2):312–21.{" "}
              <a href="https://doi.org/10.1039/D1SM01241J">https://doi.org/10.1039/D1SM01241J</a>
            </li>
            <li id="ref-19">
              Mohd Nasir A, Adam MR, Mohamad Kamal SNEA, Jaafar J, Othman MHD, Ismail AF, et al. A review of
              the potential of conventional and advanced membrane technology in the removal of pathogens from
              wastewater. Separation and Purification Technology. 2022;286:120454.{" "}
              <a href="https://doi.org/10.1016/j.seppur.2022.120454">
                https://doi.org/10.1016/j.seppur.2022.120454
              </a>
            </li>
            <li id="ref-20">
              Woźniak P, Gryta M. The influence of PVDF membrane ageing on the efficiency of bacterial
              rejection during the ultrafiltration treatment of carwash wastewater. Materials. 2026;19(2):324.{" "}
              <a href="https://doi.org/10.3390/ma19020324">https://doi.org/10.3390/ma19020324</a>
            </li>
          </ol>{" "}
        </details>{" "}
      </section>{" "}
    </>
  );
}

export const HardwareContent = memo(HardwareContentInner);
