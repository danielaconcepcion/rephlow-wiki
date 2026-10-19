import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { TileMoleculeField } from "../components/TileMoleculeField";
import { Link } from "react-router-dom";
import { asset } from "../utils";
import {
  fillDecorLayer,
  initHeroRipples,
  initProblemMotion,
  revealOnScroll,
} from "./Home/problemMotion";
import { initScenes } from "./Home/scenes";
import "./Home/Home.css";

const promotionVideos = [
  { code: "en", shortLabel: "EN", label: "English" },
  { code: "es", shortLabel: "ES", label: "Español" },
  { code: "fr", shortLabel: "FR", label: "Français" },
] as const;

type PromotionLanguage = (typeof promotionVideos)[number]["code"];

export function Home() {
  const problemRef = useRef<HTMLElement>(null);
  const heroWaterRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const promotionVideoRef = useRef<HTMLVideoElement>(null);
  const promotionResumeRef = useRef({ time: 0, wasPlaying: false });
  const [promotionLanguage, setPromotionLanguage] =
    useState<PromotionLanguage>("en");

  /* Everything in "The Problem" that is generated or moves with the
     scroll: the decor and its drift, the water clouding over, each step
     appearing, and the four scenes advancing. */
  useEffect(() => {
    const problem = problemRef.current;
    if (!problem) return;
    if (decorRef.current) fillDecorLayer(decorRef.current);
    const stop = [
      initProblemMotion(problem),
      revealOnScroll(problem),
      initScenes(problem),
    ];
    return () => stop.forEach((off) => off());
  }, []);

  useEffect(() => {
    const water = heroWaterRef.current;
    if (!water) return;
    return initHeroRipples(water);
  }, []);

  function scrollToSection(id: string) {
    const target = document.getElementById(id);
    target?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  useEffect(() => {
    const video = promotionVideoRef.current;
    if (!video) return;

    video.load();
  }, [promotionLanguage]);

  function changePromotionLanguage(language: PromotionLanguage) {
    if (language === promotionLanguage) return;

    const video = promotionVideoRef.current;
    promotionResumeRef.current = {
      time: video?.currentTime ?? 0,
      wasPlaying: video ? !video.paused : false,
    };
    setPromotionLanguage(language);
  }

  function resumePromotionVideo() {
    const video = promotionVideoRef.current;
    if (!video) return;

    const { time, wasPlaying } = promotionResumeRef.current;
    if (Number.isFinite(video.duration)) {
      video.currentTime = Math.min(time, Math.max(video.duration - 0.1, 0));
    }
    if (wasPlaying) void video.play();
  }

  return (
    <>
      <header className="hero" id="home">
        {/* Filtro que ondula el reflejo del logo */}
        <svg
          width="0"
          height="0"
          style={{ position: "absolute" }}
          aria-hidden="true"
          focusable="false"
        >
          <filter id="hero-ripple" x="-5%" y="-20%" width="110%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.09"
              numOctaves="2"
              seed="3"
            >
              <animate
                attributeName="baseFrequency"
                dur="9s"
                values="0.012 0.09;0.016 0.13;0.012 0.09"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="9" />
          </filter>
        </svg>

        <div className="hero__sky">
          <h1 className="hero__title">
            <img
              src={asset("assets/rephlow-logo-transparent.png")}
              alt="rePhlow"
            />
          </h1>
        </div>

        <div className="hero__water" id="hero-water" ref={heroWaterRef}>
          <div className="hero__waves" aria-hidden="true">
            <svg
              className="hero__wave hero__wave--back"
              viewBox="0 0 2880 60"
              preserveAspectRatio="none"
            >
              <path
                d="M0,30 Q180,6 360,30 T720,30 T1080,30 T1440,30 T1800,30 T2160,30 T2520,30 T2880,30 V60 H0 Z"
                fill="#bfe3ee"
              />
            </svg>
            <svg
              className="hero__wave hero__wave--mid"
              viewBox="0 0 2880 60"
              preserveAspectRatio="none"
            >
              <path
                d="M0,30 Q180,52 360,30 T720,30 T1080,30 T1440,30 T1800,30 T2160,30 T2520,30 T2880,30 V60 H0 Z"
                fill="#cfe9f2"
              />
            </svg>
            <svg
              className="hero__wave hero__wave--front"
              viewBox="0 0 2880 60"
              preserveAspectRatio="none"
            >
              <path
                d="M0,30 Q180,14 360,30 T720,30 T1080,30 T1440,30 T1800,30 T2160,30 T2520,30 T2880,30 V60 H0 Z"
                fill="#dcf0f6"
              />
            </svg>
          </div>

          <div className="hero__reflection" aria-hidden="true">
            <img src={asset("assets/rephlow-logo-transparent.png")} alt="" />
          </div>

          <p className="hero__slogan">
            <span className="hero__line">
              Make water <em className="word-flow">flow</em>.
            </span>
            <span className="hero__line">
              Make value <em className="word-grow">grow</em>.
            </span>
          </p>

          <button
            className="hero__choose"
            type="button"
            onClick={() => scrollToSection("solution")}
          >
            <span>
              Choose <strong>rePhlow</strong>
            </span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>

          <button
            className="hero__dive"
            type="button"
            onClick={() => scrollToSection("problem")}
          >
            <span>Dive in</span>
            <svg viewBox="0 0 12 16" aria-hidden="true">
              <path
                d="M6 0C3 5 0 8 0 10.5A6 6 0 0 0 12 10.5C12 8 9 5 6 0z"
                fill="#86b1d1"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ======================================================================
           THE PROBLEM — el agua se oscurece paso a paso por la eutrofización
           ====================================================================== */}
      <section className="problem" id="problem" ref={problemRef}>
        <div className="problem__murk" aria-hidden="true"></div>

        <div className="problem__header">
          <p className="problem__eyebrow">The Problem</p>
          <h2 className="problem__title">
            Untreated wastewater disrupts ecosystems
          </h2>
        </div>

        {/* Eje: se rellena a medida que bajas */}
        <div className="gauge" aria-hidden="true">
          <div className="gauge__fill"></div>
          <div className="gauge__mark" style={{ top: "6%" }}>
            <span
              className="gauge__dot"
              style={{ background: "var(--phosphate)" }}
            ></span>
            <span className="gauge__reading gauge__reading--dark">PO₄³⁻ ↑</span>
          </div>
          <div className="gauge__mark" style={{ top: "34%" }}>
            <span
              className="gauge__dot"
              style={{ background: "var(--algae)" }}
            ></span>
            <span className="gauge__reading">Algal bloom</span>
          </div>
          <div className="gauge__mark" style={{ top: "62%" }}>
            <span
              className="gauge__dot"
              style={{ background: "var(--oxygen)" }}
            ></span>
            <span className="gauge__reading">O₂ ↓</span>
          </div>
          <div className="gauge__mark" style={{ top: "90%" }}>
            <span
              className="gauge__dot"
              style={{ background: "var(--eutrophic-deep)" }}
            ></span>
            <span className="gauge__reading">Eutrophication</span>
          </div>
        </div>

        {/* Burbujas, microorganismos y manchas de algas: JS las genera de forma
             que cada vez haya menos burbujas (menos O₂) a medida que bajas. */}
        <div id="decor-layer" aria-hidden="true" ref={decorRef}></div>

        <div className="beats">
          {/* STEP 01 — vertido */}
          <div className="beat-row beat-row--01">
            <div className="beat beat--dark">
              <p className="beat__step">Step 01</p>
              <p className="beat__text">
                Excess phosphate enters aquatic systems.
              </p>
              <p className="beat__body">
                Wastewater from biodiesel production can carry phosphate
                residues from washing and purification steps. Without proper
                treatment, these effluents can release excess phosphate into
                aquatic environments.
              </p>
            </div>
            <figure
              className="scene"
              id="scene-1"
              aria-label="Illustration: a biodiesel plant releases phosphate-rich wastewater into a river"
            >
              <div className="scene__art">
                <svg viewBox="0 0 400 260" aria-hidden="true">
                  <defs>
                    <linearGradient id="s1-sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#f4f9f4" />
                      <stop offset="1" stopColor="#e1eee5" />
                    </linearGradient>
                    <linearGradient id="s1-water" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#cfe7e5" />
                      <stop offset=".6" stopColor="#b3d5cb" />
                      <stop offset="1" stopColor="#9ec5b2" />
                    </linearGradient>
                    <linearGradient id="s1-bank" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#d0deb2" />
                      <stop offset="1" stopColor="#a9c288" />
                    </linearGradient>
                    <filter
                      id="s1-blur"
                      x="-60%"
                      y="-80%"
                      width="220%"
                      height="260%"
                    >
                      <feGaussianBlur stdDeviation="5" />
                    </filter>
                  </defs>
                  <rect width="400" height="92" fill="url(#s1-sky)" />
                  <path
                    d="M0,74 C40,62 80,60 120,66 C170,73 210,57 260,59 C310,61 350,70 400,63 V90 H0 Z"
                    fill="#dbe8d0"
                  />
                  <path
                    d="M150,82 C200,73 250,75 300,77 C340,79 370,74 400,72 V90 H150 Z"
                    fill="#c9dcbd"
                  />
                  <path
                    d="M0,86 C60,83 120,88 200,85 C270,82 330,87 400,84 V260 H0 Z"
                    fill="url(#s1-water)"
                  />
                  <path
                    d="M0,232 C50,224 90,230 140,226 C200,221 250,232 310,226 C350,222 380,228 400,224 V260 H0 Z"
                    fill="#a5bf9e"
                  />
                  <g fill="#c4d4bd" stroke="#8ea888" strokeWidth="1">
                    <ellipse cx="62" cy="237" rx="9" ry="4" />
                    <ellipse cx="118" cy="232" rx="6" ry="3" />
                    <ellipse cx="252" cy="235" rx="10" ry="4.5" />
                    <ellipse cx="332" cy="230" rx="7" ry="3" />
                  </g>
                  <g
                    fill="none"
                    stroke="#6f9e57"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <path
                      className="weed-sway"
                      d="M72,236 C68,216 76,202 70,184"
                    />
                    <path
                      className="weed-sway"
                      d="M78,236 C82,218 76,208 82,194"
                      style={{ animationDelay: "-2s" }}
                    />
                    <path
                      className="weed-sway"
                      d="M320,229 C316,209 324,197 318,179"
                      style={{ animationDelay: "-1s" }}
                    />
                    <path
                      className="weed-sway"
                      d="M328,229 C332,213 326,201 332,189"
                      style={{ animationDelay: "-3s" }}
                    />
                  </g>
                  <path
                    d="M0,96 C60,95 150,96 180,94 C176,100 160,105 130,105 C80,105 30,103 0,103 Z"
                    fill="#8fb39a"
                    opacity=".45"
                  />
                  <path
                    d="M0,58 C26,54 64,55 104,58 C134,60 156,66 170,80 C176,86 178,90 180,94 C150,96 60,95 0,96 Z"
                    fill="url(#s1-bank)"
                    stroke="#8eaa6a"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <g
                    fill="none"
                    stroke="#7fa05a"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  >
                    <path d="M18,62 l2,-7 M22,62 l-1,-8 M26,62 l3,-6" />
                    <path d="M150,72 l1,-7 M154,74 l3,-6 M146,71 l-2,-6" />
                  </g>
                  <circle
                    className="smoke"
                    cx="62.5"
                    cy="21"
                    r="4.5"
                    fill="#f4f5f0"
                    stroke="#d3d6cc"
                    strokeWidth=".8"
                  />
                  <circle
                    className="smoke"
                    cx="62.5"
                    cy="21"
                    r="4.5"
                    fill="#f4f5f0"
                    stroke="#d3d6cc"
                    strokeWidth=".8"
                    style={{ animationDelay: "-1.5s" }}
                  />
                  <circle
                    className="smoke"
                    cx="62.5"
                    cy="21"
                    r="4.5"
                    fill="#f4f5f0"
                    stroke="#d3d6cc"
                    strokeWidth=".8"
                    style={{ animationDelay: "-3s" }}
                  />
                  <rect
                    x="58"
                    y="22"
                    width="9"
                    height="20"
                    rx="2.5"
                    fill="#e9e4da"
                    stroke="#8d8576"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M38,58 V40 Q38,38 40,37 L50,31 Q52,30 52,32 V37 L62,31 Q64,30 64,32 V37 L74,31 Q76,30 76,32 V37 H88 Q90,37 90,39 V58 Z"
                    fill="#f5f1e8"
                    stroke="#8d8576"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <g fill="#cfe2e1" stroke="#8d8576" strokeWidth=".8">
                    <rect x="45" y="44" width="7" height="6" rx="1.5" />
                    <rect x="58" y="44" width="7" height="6" rx="1.5" />
                    <rect x="71" y="44" width="7" height="6" rx="1.5" />
                  </g>
                  <rect
                    x="94"
                    y="30"
                    width="28"
                    height="28"
                    rx="9"
                    fill="#ecd488"
                    stroke="#b89c46"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M99,37 q0,-2.5 3,-3.5"
                    fill="none"
                    stroke="#f8e9b8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M108,36 c-4.5,6 -6.5,9 -6.5,11.5 a6.5,6.5 0 0 0 13,0 c0,-2.5 -2,-5.5 -6.5,-11.5z"
                    fill="#8bb466"
                    stroke="#5f8a43"
                    strokeWidth="1.2"
                  />
                  <text
                    x="38"
                    y="72"
                    fontFamily="Space Grotesk, sans-serif"
                    fontSize="8.5"
                    fontWeight="600"
                    letterSpacing=".3"
                    fill="#55633f"
                  >
                    Biodiesel plant
                  </text>
                  <path
                    d="M122,46 H160 Q172,46 172,58 V88"
                    fill="none"
                    stroke="#8f897c"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M122,44.6 H160 Q170.6,44.6 170.6,58 V87"
                    fill="none"
                    stroke="#c2bcae"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    opacity=".8"
                  />
                  <path
                    className="s1-stream"
                    d="M172,92 Q174,102 176,112"
                    fill="none"
                    stroke="#b78a5e"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="4 6"
                  />
                  <ellipse
                    className="s1-plume"
                    id="s1-plume"
                    cx="205"
                    cy="120"
                    rx="46"
                    ry="17"
                    fill="#c4996b"
                    opacity="0.15"
                    filter="url(#s1-blur)"
                  />
                  <path
                    d="M0,86 C60,83 120,88 200,85 C270,82 330,87 400,84"
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity=".8"
                    strokeWidth="1.5"
                  />
                  <g
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity=".45"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  >
                    <path d="M232,100 h18" />
                    <path d="M302,112 h12" />
                    <path d="M40,124 h14" />
                  </g>
                  <g id="s1-particles"></g>
                  <path
                    d="M262,102 C252,102 244,106 238,111"
                    fill="none"
                    stroke="#a9502e"
                    strokeWidth=".9"
                    strokeOpacity=".7"
                    strokeLinecap="round"
                  />
                  <text
                    x="266"
                    y="106"
                    fontFamily="Space Grotesk, sans-serif"
                    fontSize="10.5"
                    fontWeight="600"
                    fill="#a24a29"
                  >
                    PO₄³⁻
                  </text>
                </svg>
              </div>
              <figcaption className="scene__hud">
                <span className="scene__meter">
                  Phosphate in the river
                  <strong data-meter>0.02 mg/L</strong>
                  <span
                    className="scene__bar"
                    style={{ "--bar": "#c8653f" } as CSSProperties}
                  >
                    <i></i>
                  </span>
                </span>
                <span className="scene__note">Illustrative values</span>
              </figcaption>
            </figure>
          </div>

          {/* STEP 02 — floración de algas */}
          <div className="beat-row beat-row--02 beat-row--flip">
            <div className="beat beat--right">
              <p className="beat__step">Step 02</p>
              <p className="beat__text">Algae begin to bloom.</p>
              <p className="beat__body">
                Excess phosphate acts as a nutrient for algae, causing rapid and
                uncontrolled algal growth across the water surface.
              </p>
            </div>
            <figure
              className="scene"
              id="scene-2"
              aria-label="Illustration: algae spread across the water surface and block the sunlight"
            >
              <div className="scene__art">
                <svg viewBox="0 0 400 260" aria-hidden="true">
                  <defs>
                    <linearGradient id="s2-sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#f3f8f1" />
                      <stop offset="1" stopColor="#e2eddc" />
                    </linearGradient>
                    <linearGradient id="s2-water" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#c0dbcf" />
                      <stop offset="1" stopColor="#93b78a" />
                    </linearGradient>
                    <linearGradient id="s2-ray" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#ffffff" stopOpacity=".6" />
                      <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <filter
                      id="s2-blur"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur stdDeviation="6" />
                    </filter>
                  </defs>
                  <rect width="400" height="80" fill="url(#s2-sky)" />
                  <g className="s2-sun" id="s2-sun">
                    <circle
                      cx="300"
                      cy="40"
                      r="26"
                      fill="#f6e3a0"
                      opacity=".6"
                      filter="url(#s2-blur)"
                    />
                    <circle
                      cx="300"
                      cy="40"
                      r="12"
                      fill="#f1cf6c"
                      stroke="#d6ad48"
                      strokeWidth="1.4"
                    />
                    <circle cx="296" cy="36" r="3.5" fill="#f9e9b0" />
                  </g>
                  <path
                    d="M0,68 C60,61 120,66 180,64 C240,62 320,68 400,64 V76 H0 Z"
                    fill="#cfe0c1"
                  />
                  <path
                    d="M0,72 C70,70 140,74 200,72 C270,70 330,74 400,72 V260 H0 Z"
                    fill="url(#s2-water)"
                  />
                  <rect
                    className="s2-tint"
                    id="s2-tint"
                    y="72"
                    width="400"
                    height="188"
                    fill="#6e8c3c"
                    opacity="0"
                  />
                  <g className="s2-rays" id="s2-rays" filter="url(#s2-blur)">
                    <polygon
                      points="120,74 150,74 200,260 140,260"
                      fill="url(#s2-ray)"
                    />
                    <polygon
                      points="220,74 248,74 290,260 240,260"
                      fill="url(#s2-ray)"
                    />
                    <polygon
                      points="292,74 316,74 362,260 312,260"
                      fill="url(#s2-ray)"
                    />
                  </g>
                  <path
                    d="M0,236 C60,228 110,234 170,230 C230,226 290,236 350,230 C374,228 390,231 400,230 V260 H0 Z"
                    fill="#8ba981"
                  />
                  <g
                    fill="none"
                    stroke="#5f8f45"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  >
                    <path
                      className="weed-sway"
                      d="M48,238 C44,220 52,208 46,192"
                    />
                    <path
                      className="weed-sway"
                      d="M356,232 C352,214 360,202 354,186"
                      style={{ animationDelay: "-2.5s" }}
                    />
                  </g>
                  <g id="s2-fil"></g>
                  <path
                    d="M0,72 C70,70 140,74 200,72 C270,70 330,74 400,72"
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity=".7"
                    strokeWidth="1.5"
                  />
                  <g id="s2-mat"></g>
                </svg>
              </div>
              <figcaption className="scene__hud">
                <span className="scene__meter">
                  Surface covered by algae
                  <strong data-meter>0%</strong>
                  <span
                    className="scene__bar"
                    style={{ "--bar": "#5f8f45" } as CSSProperties}
                  >
                    <i></i>
                  </span>
                </span>
                <span className="scene__note">Illustrative values</span>
              </figcaption>
            </figure>
          </div>

          {/* STEP 03 — caída del oxígeno */}
          <div className="beat-row beat-row--03">
            <div className="beat beat--left">
              <p className="beat__step">Step 03</p>
              <p className="beat__text">Oxygen levels drop.</p>
              <p className="beat__body">
                As algae die and decompose, microorganisms consume dissolved
                oxygen, creating oxygen-poor conditions in the water.
              </p>
            </div>
            <figure
              className="scene"
              id="scene-3"
              aria-label="Illustration: dead algae sink, microorganisms multiply and oxygen bubbles disappear"
            >
              <div className="scene__art">
                <svg viewBox="0 0 400 260" aria-hidden="true">
                  <defs>
                    <linearGradient id="s3-water" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#7f9859" />
                      <stop offset=".55" stopColor="#4b5a36" />
                      <stop offset="1" stopColor="#353f22" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="260" fill="url(#s3-water)" />
                  <polygon
                    points="150,30 190,30 250,230 170,230"
                    fill="#ffffff"
                    opacity=".05"
                  />
                  <path
                    d="M0,0 H400 V30 C380,38 360,28 340,34 C310,41 290,30 260,35 C230,40 200,30 170,36 C140,41 110,30 80,35 C50,39 25,31 0,35 Z"
                    fill="#86834a"
                    stroke="#625f35"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <g fill="#9e9b5c">
                    <ellipse cx="60" cy="24" rx="7" ry="3" />
                    <ellipse cx="190" cy="22" rx="9" ry="3.4" />
                    <ellipse cx="318" cy="25" rx="6" ry="2.6" />
                  </g>
                  <g id="s3-bub"></g>
                  <g id="s3-o2"></g>
                  <text
                    x="300"
                    y="66"
                    fontFamily="Space Grotesk, sans-serif"
                    fontSize="9.5"
                    fontWeight="600"
                    fill="#e7f2ec"
                    fillOpacity=".85"
                  >
                    dissolved O₂
                  </text>
                  <g id="s3-flakes"></g>
                  <path
                    d="M0,224 C40,214 70,222 110,216 C150,210 180,222 230,216 C280,210 320,220 360,214 C380,211 392,214 400,212 V260 H0 Z"
                    fill="#303b22"
                    stroke="#273019"
                    strokeWidth="1"
                  />
                  <g fill="#4b4b2d">
                    <ellipse cx="90" cy="222" rx="12" ry="3.5" />
                    <ellipse cx="210" cy="220" rx="16" ry="4" />
                    <ellipse cx="330" cy="218" rx="10" ry="3" />
                  </g>
                  <g id="s3-bact"></g>
                </svg>
              </div>
              <figcaption className="scene__hud">
                <span className="scene__meter">
                  Dissolved oxygen
                  <strong data-meter>8.0 mg/L</strong>
                  <span
                    className="scene__bar"
                    style={{ "--bar": "#a9d0d6" } as CSSProperties}
                  >
                    <i></i>
                  </span>
                </span>
                <span className="scene__note">Illustrative values</span>
              </figcaption>
            </figure>
          </div>

          {/* STEP 04 — colapso */}
          <div className="beat-row beat-row--04">
            <div className="beat beat--collapse">
              <p className="beat__step">Step 04</p>
              <p className="beat__text">Ecosystem collapse.</p>
              <p className="beat__body">
                Low oxygen levels can kill fish and other aquatic organisms,
                disrupting food webs and damaging the entire aquatic ecosystem.
              </p>
              <button
                className="beat__cta"
                type="button"
                onClick={() => scrollToSection("solution")}
              >
                See how rePhlow stops it <span aria-hidden="true">↓</span>
              </button>
            </div>
            <figure
              className="scene"
              id="scene-4"
              aria-label="Illustration: fish die as the water runs out of oxygen"
            >
              <div className="scene__art">
                <svg viewBox="0 0 640 240" aria-hidden="true">
                  <defs>
                    <linearGradient id="s4-water" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#4a5a36" />
                      <stop offset=".55" stopColor="#2f3a23" />
                      <stop offset="1" stopColor="#202817" />
                    </linearGradient>
                  </defs>
                  <rect width="640" height="240" fill="url(#s4-water)" />
                  <g id="s4-murk"></g>
                  <path
                    d="M0,0 H640 V26 C610,34 580,24 550,30 C510,37 480,26 440,31 C400,36 370,26 330,31 C290,36 250,26 210,31 C170,36 130,26 90,31 C60,35 30,27 0,31 Z"
                    fill="#5e6639"
                    stroke="#474d2a"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <g fill="#6f7644">
                    <ellipse cx="120" cy="20" rx="10" ry="3" />
                    <ellipse cx="380" cy="19" rx="12" ry="3.4" />
                    <ellipse cx="560" cy="21" rx="8" ry="2.6" />
                  </g>
                  <path
                    d="M0,206 C60,198 110,206 170,200 C240,194 300,206 370,200 C440,194 500,204 560,198 C600,195 620,199 640,197 V240 H0 Z"
                    fill="#1c2213"
                  />
                  <g
                    fill="none"
                    stroke="#575b35"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M120,204 C118,190 126,182 122,170 C120,164 114,162 112,158" />
                    <path d="M470,200 C472,186 466,178 470,166" />
                    <path d="M480,201 C484,190 490,186 492,178" />
                  </g>
                  <g id="s4-fish"></g>
                </svg>
              </div>
              <figcaption className="scene__hud">
                <span className="scene__meter">
                  Fish still alive
                  <strong data-meter>6 / 6</strong>
                  <span
                    className="scene__bar"
                    style={{ "--bar": "#a9d0d6" } as CSSProperties}
                  >
                    <i></i>
                  </span>
                </span>
                <span className="scene__note">Illustrative</span>
              </figcaption>
            </figure>
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
          rePhlow engineers a biological system that intercepts phosphate before
          it can drive this collapse, turning a pollutant into a resource.
        </p>

        <div
          className="promotion-video"
          id="promotion-video"
          aria-label="Promotion video"
        >
          <div className="promotion-video__layout">
            <div className="promotion-video__frame">
              <video
                ref={promotionVideoRef}
                controls
                playsInline
                preload="metadata"
                onLoadedMetadata={resumePromotionVideo}
                aria-label={`rePhlow promotion video in ${
                  promotionVideos.find(({ code }) => code === promotionLanguage)
                    ?.label
                }`}
              >
                <source
                  src={asset(
                    `assets/videos/promotion-${promotionLanguage}.mp4`,
                  )}
                  type="video/mp4"
                />
                Your browser does not support embedded video.
              </video>
            </div>

            <div
              className="promotion-video__languages"
              role="group"
              aria-label="Video language"
            >
              {promotionVideos.map(({ code, shortLabel, label }) => (
                <button
                  key={code}
                  type="button"
                  className={`promotion-video__language${
                    promotionLanguage === code ? " is-active" : ""
                  }`}
                  aria-pressed={promotionLanguage === code}
                  onClick={() => changePromotionLanguage(code)}
                >
                  <span aria-hidden="true">{shortLabel}</span>
                  <span className="promotion-video__language-name">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
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
            <Link className="card card--feature" to="/project-description">
              <TileMoleculeField seed={11} palette="primary" />
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

            <Link className="card" to="/engineering">
              <TileMoleculeField seed={18} palette="light" />
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
              <TileMoleculeField seed={25} palette="light" />
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
              <TileMoleculeField seed={32} palette="light" />
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
            <Link className="card card--feature" to="/experiments">
              <TileMoleculeField seed={39} palette="primary" />
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

            <Link className="card" to="/measurement">
              <TileMoleculeField seed={46} palette="light" />
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

            <Link className="card" to="/results">
              <TileMoleculeField seed={53} palette="light" />
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
              <TileMoleculeField seed={60} palette="light" />
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

        <div className="explore__group explore__group--engagement">
          <p className="explore__group-title">Engagement</p>
          <div className="card-grid">
            <Link className="card card--feature" to="/human-practices">
              <TileMoleculeField seed={67} palette="primary" />
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
              <TileMoleculeField seed={74} palette="light" />
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
              <TileMoleculeField seed={81} palette="light" />
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
              <TileMoleculeField seed={88} palette="light" />
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
              <TileMoleculeField seed={95} palette="light" />
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
              <TileMoleculeField seed={102} palette="light" />
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

        <div className="explore__group-row">
          <div className="explore__group">
            <p className="explore__group-title">Team</p>
            <div className="card-grid">
              <Link className="card" to="/team">
                <TileMoleculeField seed={109} palette="light" />
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
            </div>
          </div>

          <div className="explore__group">
            <p className="explore__group-title">Judging</p>
            <div className="card-grid">
              <Link className="card card--feature" to="/medals">
                <TileMoleculeField seed={116} palette="primary" />
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
        </div>
      </section>
    </>
  );
}
