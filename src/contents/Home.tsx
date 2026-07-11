import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { asset } from "../utils";

/**
 * Scroll-driven parallax for the decorative elements inside .problem.
 * Ported from the static site's homepage.js: each .parallax-decor element
 * drifts based on its own distance from the viewport center (not global
 * scroll position), clamped to its data-max, and skipped entirely under
 * prefers-reduced-motion — identical behavior to the original.
 */
function useParallax(sectionRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const items = Array.prototype.map.call(
      section.querySelectorAll<HTMLElement>(".parallax-decor"),
      (el: HTMLElement) => ({
        el,
        speedY: parseFloat(el.dataset.speed || "0") || 0,
        speedX: parseFloat(el.dataset.speedX || "0") || 0,
        max: parseFloat(el.dataset.max || "80") || 80,
      }),
    ) as { el: HTMLElement; speedY: number; speedX: number; max: number }[];

    if (!items.length) return;

    function clamp(value: number, limit: number) {
      return Math.max(-limit, Math.min(limit, value));
    }

    let ticking = false;

    function apply() {
      ticking = false;
      const viewportCenter = window.innerHeight / 2;

      items.forEach((item) => {
        const itemRect = item.el.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const distanceFromCenter = viewportCenter - itemCenter;

        const y = clamp(distanceFromCenter * item.speedY, item.max);
        const x = clamp(distanceFromCenter * item.speedX, item.max);

        item.el.style.setProperty("--py", y.toFixed(1) + "px");
        item.el.style.setProperty("--px", x.toFixed(1) + "px");
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionRef]);
}

export function Home() {
  const problemRef = useRef<HTMLElement>(null);
  useParallax(problemRef);

  return (
    <>
      {/* ==================================================================
          HERO — agua limpia, punto de partida
          ================================================================== */}
      <header className="hero" id="home">
        <p className="hero__eyebrow">Web page currently under construction!</p>
        <h1 className="hero__title">rePhlow</h1>
        <p className="hero__subtitle">
          Make water flow. Make value grow. Choose rePhlow.
        </p>
        <div className="hero__scroll-cue">
          <span>Learn more</span>
          <span className="dot"></span>
        </div>
      </header>

      {/* ==================================================================
          THE PROBLEM — descenso narrativo por scroll
          ================================================================== */}
      <section className="problem" id="problem" ref={problemRef}>
        <div className="problem__header">
          <p className="problem__eyebrow">The Problem</p>
          <h2 className="problem__title">
            Untreated wastewater disrupts ecosystems
          </h2>
        </div>

        {/* Eje */}
        <div className="gauge" aria-hidden="true">
          <div className="gauge__mark" style={{ top: "6%" }}>
            <span
              className="gauge__dot"
              style={{ background: "var(--phosphate)" }}
            ></span>
            <span className="gauge__reading">PO₄³⁻</span>
          </div>
          <div className="gauge__mark" style={{ top: "34%" }}>
            <span
              className="gauge__dot"
              style={{ background: "var(--algae)" }}
            ></span>
            <span className="gauge__reading"> </span>
          </div>
          <div className="gauge__mark" style={{ top: "62%" }}>
            <span
              className="gauge__dot"
              style={{ background: "var(--oxygen)" }}
            ></span>
            <span className="gauge__reading"> </span>
          </div>
          <div className="gauge__mark" style={{ top: "90%" }}>
            <span
              className="gauge__dot"
              style={{ background: "var(--eutrophic-deep)" }}
            ></span>
            <span className="gauge__reading">Eutrophication</span>
          </div>
        </div>

        {/* Molécula de fosfato flotante */}
        <div
          className="molecule-wrap decor parallax-decor"
          data-speed="0.28"
          data-speed-x="0"
          data-max="170"
        >
          <img
            className="phosphate-img"
            src={asset("assets/phosphate2.png")}
            alt="Phosphate molecule"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Alga */}
        <div
          className="algae-wrap decor parallax-decor"
          data-speed="0.24"
          data-speed-x="0"
          data-max="150"
          aria-hidden="true"
        >
          <img className="algae-img" src={asset("assets/algae.png")} alt="" />
        </div>

        {/* Burbujas / partículas decorativas */}
        <div
          className="decor bubble parallax-decor"
          data-speed="0.26"
          data-max="150"
          style={{ width: "14px", height: "14px", top: "12vh", left: "20%" }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="-0.32"
          data-max="175"
          style={{ width: "8px", height: "8px", top: "20vh", left: "26%" }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="0.38"
          data-max="210"
          style={{ width: "20px", height: "20px", top: "48vh", left: "70%" }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="-0.30"
          data-max="165"
          style={{ width: "10px", height: "10px", top: "58vh", left: "14%" }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="0.34"
          data-max="190"
          style={{ width: "16px", height: "16px", top: "80vh", left: "60%" }}
        ></div>

        {/* Burbujas adicionales: distribuidas por todo el gradiente (agua limpia -> eutrofizada) */}
        {/* Zona superior / agua limpia */}
        <div
          className="decor bubble parallax-decor"
          data-speed="0.30"
          data-max="240"
          style={{
            width: "10px",
            height: "10px",
            top: "8vh",
            left: "82%",
            opacity: 0.55,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="-0.26"
          data-max="230"
          style={{
            width: "7px",
            height: "7px",
            top: "28vh",
            left: "90%",
            opacity: 0.5,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="0.34"
          data-max="260"
          style={{
            width: "9px",
            height: "9px",
            top: "55vh",
            left: "5%",
            opacity: 0.6,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="-0.36"
          data-max="270"
          style={{
            width: "13px",
            height: "13px",
            top: "78vh",
            left: "86%",
            opacity: 0.5,
          }}
        ></div>

        {/* Zona de proliferación de algas / Step 02 */}
        <div
          className="decor bubble parallax-decor"
          data-speed="0.40"
          data-max="300"
          style={{
            width: "18px",
            height: "18px",
            top: "95vh",
            left: "9%",
            opacity: 0.6,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="-0.38"
          data-max="280"
          style={{
            width: "14px",
            height: "14px",
            top: "108vh",
            left: "24%",
            opacity: 0.55,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="0.45"
          data-max="320"
          style={{
            width: "20px",
            height: "20px",
            top: "122vh",
            left: "7%",
            opacity: 0.65,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="-0.30"
          data-max="260"
          style={{
            width: "12px",
            height: "12px",
            top: "135vh",
            left: "32%",
            opacity: 0.5,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="0.36"
          data-max="290"
          style={{
            width: "16px",
            height: "16px",
            top: "148vh",
            right: "7%",
            opacity: 0.45,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="-0.33"
          data-max="270"
          style={{
            width: "10px",
            height: "10px",
            top: "160vh",
            left: "16%",
            opacity: 0.5,
          }}
        ></div>

        {/* Zona de caída de oxígeno / Step 03 */}
        <div
          className="decor bubble parallax-decor"
          data-speed="0.32"
          data-max="280"
          style={{
            width: "12px",
            height: "12px",
            top: "175vh",
            right: "13%",
            opacity: 0.4,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="-0.28"
          data-max="240"
          style={{
            width: "8px",
            height: "8px",
            top: "190vh",
            right: "26%",
            opacity: 0.35,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="0.38"
          data-max="300"
          style={{
            width: "14px",
            height: "14px",
            top: "205vh",
            right: "9%",
            opacity: 0.42,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="-0.31"
          data-max="260"
          style={{
            width: "9px",
            height: "9px",
            top: "220vh",
            left: "4%",
            opacity: 0.35,
          }}
        ></div>

        {/* Zona más profunda / Step 04, colapso */}
        <div
          className="decor bubble parallax-decor"
          data-speed="0.40"
          data-max="320"
          style={{
            width: "10px",
            height: "10px",
            top: "240vh",
            left: "5%",
            opacity: 0.3,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="-0.34"
          data-max="290"
          style={{
            width: "8px",
            height: "8px",
            top: "255vh",
            right: "6%",
            opacity: 0.25,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="0.42"
          data-max="310"
          style={{
            width: "12px",
            height: "12px",
            top: "270vh",
            left: "9%",
            opacity: 0.28,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="-0.38"
          data-max="280"
          style={{
            width: "6px",
            height: "6px",
            top: "285vh",
            right: "11%",
            opacity: 0.2,
          }}
        ></div>
        <div
          className="decor bubble parallax-decor"
          data-speed="0.35"
          data-max="280"
          style={{
            width: "9px",
            height: "9px",
            top: "300vh",
            left: "14%",
            opacity: 0.22,
          }}
        ></div>

        <div
          className="decor microbe parallax-decor"
          data-speed="0.22"
          data-max="130"
          style={{ width: "12px", height: "12px", top: "66vh", left: "34%" }}
        ></div>
        <div
          className="decor microbe parallax-decor"
          data-speed="-0.21"
          data-max="125"
          style={{ width: "8px", height: "8px", top: "74vh", left: "44%" }}
        ></div>
        <div
          className="decor algae-blob parallax-decor"
          data-speed="0.20"
          data-speed-x="0"
          data-max="130"
          style={{
            width: "140px",
            height: "110px",
            top: "74vh",
            left: "-40px",
          }}
        ></div>
        <div
          className="decor algae-blob parallax-decor"
          data-speed="-0.20"
          data-max="130"
          style={{
            width: "100px",
            height: "90px",
            top: "96vh",
            right: "-20px",
          }}
        ></div>

        <div className="beats">
          <div className="beat-row beat-row--01">
            <div className="beat beat--left">
              <p className="beat__step">Step 01</p>
              <p className="beat__text">Excess phosphate enters aquatic systems.</p>
              <p className="beat__body">
                Wastewater from biodiesel production can carry phosphate
                residues from washing and purification steps. Without proper
                treatment, these effluents can release excess phosphate into
                aquatic environments.
              </p>
            </div>
          </div>

          <div className="beat-row beat-row--02">
            <div className="beat beat--right">
              <p className="beat__step">Step 02</p>
              <p className="beat__text">Algae begin to bloom.</p>
            </div>
          </div>

          <div className="beat-row beat-row--03">
            <div className="beat beat--left">
              <p className="beat__step">Step 03</p>
              <p className="beat__text">Oxygen levels drop.</p>
            </div>
          </div>

          <div className="beat-row beat-row--04">
            <div className="beat beat--collapse">
              <p className="beat__step">Step 04</p>
              <p className="beat__text">Ecosystem collapse.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transición: ola blanca que "emerge" del agua eutrofizada */}
      <svg
        className="wave-transition"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,64 C240,110 480,10 720,40 C960,70 1200,110 1440,50 L1440,120 L0,120 Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* ==================================================================
          OUR SOLUTION — salida limpia y esperanzadora
          ================================================================== */}
      <section className="solution" id="solution">
        <h2 className="solution__title">Our Solution</h2>
        <p className="solution__lede">
          rePhlow engineers a biological system that intercepts phosphate
          before it can drive this collapse, turning a pollutant into a
          resource. <br />
          <b> AQUÍ PONER EL VÍDEO </b>
        </p>
        <div className="clean-stream" aria-hidden="true"></div>
      </section>

      {/* ==================================================================
          EXPLORE rePhlow! — índice visual de la wiki
          ================================================================== */}
      <section className="explore" id="explore">
        <h2 className="explore__title">Explore rePhlow!</h2>

        <div className="explore__group">
          <p className="explore__group-title">Project</p>
          <div className="card-grid">
            <Link className="card" to="/project-description">
              <div className="card__icon card__icon--project">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 3h7l4 4v14H7z" />
                  <path d="M14 3v4h4" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="15" y2="17" />
                </svg>
              </div>
              <p className="card__title">Project Description</p>
            </Link>

            <Link className="card" to="/design">
              <div className="card__icon card__icon--design">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M15 9l-3 6-3-3 6-3z" />
                </svg>
              </div>
              <p className="card__title">Design</p>
            </Link>

            <Link className="card" to="/engineering">
              <div className="card__icon card__icon--engineering">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12a8 8 0 0 1 14-5.3" />
                  <path d="M20 12a8 8 0 0 1-14 5.3" />
                  <path d="M18 3v4h-4" />
                  <path d="M6 21v-4h4" />
                </svg>
              </div>
              <p className="card__title">Engineering</p>
            </Link>

            <Link className="card" to="/model">
              <div className="card__icon card__icon--model">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18" />
                  <path d="M7 15l4-6 4 3 5-8" />
                </svg>
              </div>
              <p className="card__title">Model</p>
            </Link>

            <Link className="card" to="/hardware">
              <div className="card__icon card__icon--hardware">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <p className="card__title">Hardware</p>
            </Link>
          </div>
        </div>

        <div className="explore__group">
          <p className="explore__group-title">Laboratory</p>
          <div className="card-grid">
            <Link className="card" to="/experiments">
              <div className="card__icon card__icon--experiments">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 2v9.5L5 20a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-8.5V2" />
                  <line x1="8" y1="2" x2="16" y2="2" />
                  <line x1="8" y1="15" x2="16" y2="15" />
                </svg>
              </div>
              <p className="card__title">Experiments</p>
            </Link>

            <Link className="card" to="/measurements">
              <div className="card__icon card__icon--measurements">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M21 7v6h-6" />
                </svg>
              </div>
              <p className="card__title">Measurements</p>
            </Link>

            <Link className="card" to="/protocols">
              <div className="card__icon card__icon--protocols">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 2h6v4a3 3 0 0 1-1 2.24V13l4 7a1 1 0 0 1-.9 1.5H6.9A1 1 0 0 1 6 20l4-7V8.24A3 3 0 0 1 9 6V2z" />
                </svg>
              </div>
              <p className="card__title">Protocols</p>
            </Link>

            <Link className="card" to="/results">
              <div className="card__icon card__icon--results">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="12" width="4" height="8" rx="1" />
                  <rect x="10" y="7" width="4" height="13" rx="1" />
                  <rect x="16" y="3" width="4" height="17" rx="1" />
                </svg>
              </div>
              <p className="card__title">Results</p>
            </Link>

            <Link className="card" to="/safety">
              <div className="card__icon card__icon--safety">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l8 3.5v6c0 5-3.4 8.7-8 10.5-4.6-1.8-8-5.5-8-10.5v-6L12 2z" />
                </svg>
              </div>
              <p className="card__title">Safety</p>
            </Link>
          </div>
        </div>

        <div className="explore__group">
          <p className="explore__group-title">Engagement</p>
          <div className="card-grid">
            <Link className="card" to="/human-practices">
              <div className="card__icon card__icon--hp">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <p className="card__title">Human Practices</p>
            </Link>

            <Link className="card" to="/collaboration-partnership">
              <div className="card__icon card__icon--collab">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="12" r="6" />
                  <circle cx="15" cy="12" r="6" />
                </svg>
              </div>
              <p className="card__title">Collaboration and Partnership</p>
            </Link>

            <Link className="card" to="/education-communication">
              <div className="card__icon card__icon--education">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16v12H8l-4 4V4z" />
                </svg>
              </div>
              <p className="card__title">Education and Communication</p>
            </Link>

            <Link className="card" to="/entrepreneurship">
              <div className="card__icon card__icon--entrepreneurship">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2.3h6c0-1.1.4-1.8 1-2.3A7 7 0 0 0 12 2z" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
              </div>
              <p className="card__title">Entrepreneurship</p>
            </Link>

            <Link className="card" to="/sustainability">
              <div className="card__icon card__icon--sustain">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C7 6 5 10 5 14a7 7 0 0 0 14 0c0-4-2-8-7-12z" />
                </svg>
              </div>
              <p className="card__title">Sustainability</p>
            </Link>

            <Link className="card" to="/contribution">
              <div className="card__icon card__icon--contribution">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v10" />
                  <path d="M8 9l4 4 4-4" />
                  <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
                </svg>
              </div>
              <p className="card__title">Contribution</p>
            </Link>
          </div>
        </div>

        <div className="explore__group">
          <p className="explore__group-title">Team</p>
          <div className="card-grid">
            <Link className="card" to="/team">
              <div className="card__icon card__icon--team">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="8" r="3" />
                  <circle cx="17" cy="10" r="2.4" />
                  <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
                  <path d="M15.5 15.2c2 .3 4 1.6 4.5 4.3" />
                </svg>
              </div>
              <p className="card__title">Team</p>
            </Link>

            <Link className="card" to="/attributions">
              <div className="card__icon card__icon--attributions">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <p className="card__title">Attributions</p>
            </Link>

            <Link className="card" to="/sponsors">
              <div className="card__icon card__icon--sponsors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="3" y1="13" x2="21" y2="13" />
                </svg>
              </div>
              <p className="card__title">Sponsors</p>
            </Link>
          </div>
        </div>

        <div className="explore__group">
          <p className="explore__group-title">Judging</p>
          <div className="card-grid">
            <Link className="card" to="/medals">
              <div className="card__icon card__icon--medals">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="9" r="5" />
                  <path d="M8.5 13.5L6 21l6-3.5L18 21l-2.5-7.5" />
                </svg>
              </div>
              <p className="card__title">Medals</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
