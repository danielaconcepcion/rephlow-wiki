import type { ReactNode } from "react";

import { asset } from "../../utils";

/* --------------------------------------------------------------------------
   The board: a slate in a wooden frame, nine objects on it, and a chalk
   timeline running from November 2025 to July 2026 that passes through
   every one of them in order. Each object is a link into the chronicle
   below.

   Two kinds of object share the slate. Two are real paper — the posters
   for the monologue nights — taped up and casting a shadow. The other
   seven are chalk: drawn on the slate itself with the same hand that
   wrote the formulas in the margins. Everything is laid out in the
   board's own 1600 x 960 space (the frame) or as a percentage of it (the
   objects), so the composition scales as one piece.
   -------------------------------------------------------------------------- */

interface BoardItem {
  id: string;
  /** The name on the object's tag, short enough to stay on one line. */
  label: string;
  /** The tag's date, abbreviated; the chronicle prints it in full. */
  date: string;
  /** The full date, for the link's accessible name. */
  spoken: string;
  left: string;
  top: string;
  width: string;
  /** Paper sits on the slate and casts a shadow; chalk is in it. */
  paper?: boolean;
  tilt?: string;
  art: ReactNode;
}

const ITEMS: BoardItem[] = [
  {
    id: "mncn",
    label: "Scientific Stand-Up Night",
    date: "29 Nov 2025",
    spoken: "29 November 2025",
    left: "4.375%",
    top: "9.583%",
    width: "9.375%",
    paper: true,
    tilt: "-3deg",
    art: (
      <>
        <img
          src={asset("assets/education/mncn-02.webp")}
          alt="Poster of the Monólogos Científicos night at the MNCN"
          style={{
            display: "block",
            width: "100%",
            aspectRatio: "1141/1600",
            objectFit: "cover",
          }}
        />
        <span
          style={{
            position: "absolute",
            inset: "0",
            background:
              "linear-gradient(115deg,rgba(255,255,255,.14),transparent 40%,rgba(0,0,0,.12))",
          }}
        ></span>
        <span
          style={{
            position: "absolute",
            top: "-4cqw",
            left: "28%",
            width: "44cqw",
            height: "11cqw",
            background: "rgba(234,224,192,.82)",
            transform: "rotate(-5deg)",
            clipPath:
              "polygon(2% 8%,98% 0,100% 30%,97% 62%,100% 100%,3% 94%,0 60%,2% 30%)",
          }}
        ></span>
      </>
    ),
  },
  {
    id: "alameda",
    label: "IES Alameda de Osuna",
    date: "10 Dec 2025",
    spoken: "10 December 2025",
    left: "14.44%",
    top: "51%",
    width: "13%",
    art: (
      <>
        <svg
          viewBox="0 0 210 172"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            overflow: "visible",
          }}
        >
          <defs>
            <filter id="chk-ala" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.6"
                numOctaves="2"
                seed="15"
                result="n"
              ></feTurbulence>
              <feColorMatrix
                in="n"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.55"
                result="m"
              ></feColorMatrix>
              <feComposite
                in="SourceGraphic"
                in2="m"
                operator="in"
                result="g"
              ></feComposite>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.06"
                numOctaves="2"
                seed="3"
                result="w"
              ></feTurbulence>
              <feDisplacementMap
                in="g"
                in2="w"
                scale="1.8"
                xChannelSelector="R"
                yChannelSelector="G"
              ></feDisplacementMap>
            </filter>
          </defs>
          <g
            filter="url(#chk-ala)"
            fill="none"
            stroke="#f1eee6"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4,140 C70,137 140,142 206,138"></path>
            <path d="M44,138 L45,63 L196,62 L197,138"></path>
            <path d="M41,62 L200,61 M44,56 L197,55.5"></path>
            <path d="M14,138 L14,34 L45,33 L45,63"></path>
            <path d="M11,34 L48,32.5"></path>
            <path
              d="M22,42 L22,130 M29.5,42 L29.5,130 M37,42 L37,130"
              stroke="#f2d982"
              strokeWidth="1.8"
            ></path>
            <path
              d="M54,71 h134 v12 h-134 z M54,92 h134 v12 h-134 z"
              strokeWidth="2.2"
            ></path>
            <path
              d="M71,71 v12 M88,71 v12 M105,71 v12 M122,71 v12 M139,71 v12 M156,71 v12 M172,71 v12 M71,92 v12 M88,92 v12 M105,92 v12 M122,92 v12 M139,92 v12 M156,92 v12 M172,92 v12"
              strokeWidth="1.6"
            ></path>
            <path d="M98,114 L152,114 L148,109 L102,109 Z"></path>
            <path
              d="M108,138 V116 H142 V138 M125,116 V138"
              strokeWidth="2.2"
            ></path>
            <path
              d="M54,118 h32 v13 h-32 z M70,118 v13 M160,118 h28 v13 h-28 z M174,118 v13"
              strokeWidth="2"
            ></path>
            <text
              x="120"
              y="52"
              textAnchor="middle"
              fontFamily="var(--font-chalk)"
              fontSize="12"
              fontWeight="700"
              fill="#f1eee6"
              stroke="none"
              letterSpacing="3"
            >
              IES
            </text>
            <path
              d="M200,138 L200,112 M193,120 Q200,100 207,120 Q200,128 193,120"
              strokeWidth="2"
            ></path>
            <text
              x="105"
              y="164"
              textAnchor="middle"
              fontFamily="var(--font-chalk)"
              fontSize="16"
              fontWeight="700"
              fill="#f1eee6"
              stroke="none"
            >
              IES Alameda de Osuna
            </text>
          </g>
        </svg>
      </>
    ),
  },
  {
    id: "monologos",
    label: "Monólogos de Ciencia",
    date: "17 Dec 2025",
    spoken: "17 December 2025",
    left: "19.0625%",
    top: "12.5%",
    width: "13.75%",
    paper: true,
    tilt: "1.8deg",
    art: (
      <>
        <img
          src={asset("assets/education/monologos-02.webp")}
          alt="Poster of the 4th Monólogos de Ciencia Complutense"
          style={{
            display: "block",
            width: "100%",
            aspectRatio: "850/567",
            objectFit: "cover",
          }}
        />
        <span
          style={{
            position: "absolute",
            inset: "0",
            background:
              "linear-gradient(120deg,rgba(255,255,255,.12),transparent 45%,rgba(0,0,0,.1))",
          }}
        ></span>
        <span
          style={{
            position: "absolute",
            top: "-2.6cqw",
            left: "-4cqw",
            width: "20cqw",
            height: "7cqw",
            background: "rgba(234,224,192,.82)",
            transform: "rotate(-38deg)",
            clipPath: "polygon(2% 8%,98% 0,100% 40%,97% 100%,3% 94%,0 50%)",
          }}
        ></span>
        <span
          style={{
            position: "absolute",
            top: "-2.6cqw",
            right: "-4cqw",
            width: "20cqw",
            height: "7cqw",
            background: "rgba(234,224,192,.82)",
            transform: "rotate(36deg)",
            clipPath: "polygon(2% 0,98% 8%,100% 50%,97% 94%,3% 100%,0 40%)",
          }}
        ></span>
        <svg
          viewBox="0 0 60 82"
          style={{
            position: "absolute",
            right: "-5cqw",
            bottom: "-14cqw",
            width: "22cqw",
            height: "auto",
            transform: "rotate(10deg)",
            overflow: "visible",
          }}
        >
          <path d="M22,38 L13,80 L21,73 L27,81 L31,42 Z" fill="#6E5A96"></path>
          <path d="M38,38 L47,80 L39,73 L33,81 L29,42 Z" fill="#574579"></path>
          <circle
            cx="30"
            cy="28"
            r="26"
            fill="#d8a83c"
            stroke="#b5882a"
            strokeWidth="4"
            strokeDasharray="3 2.3"
          ></circle>
          <circle
            cx="30"
            cy="28"
            r="19.5"
            fill="#ebc866"
            stroke="#b5882a"
            strokeWidth=".8"
          ></circle>
          <text
            x="30"
            y="31"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight="700"
            fontSize="13"
            fill="#5a3f0e"
          >
            1st
          </text>
          <text
            x="30"
            y="40"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight="600"
            fontSize="6.2"
            letterSpacing=".8"
            fill="#5a3f0e"
          >
            PRIZE
          </text>
        </svg>
      </>
    ),
  },
  {
    id: "humanejos",
    label: "IES Humanejos",
    date: "4 Mar 2026",
    spoken: "4 March 2026",
    left: "30.9375%",
    top: "52.083%",
    width: "13.125%",
    art: (
      <>
        <svg
          viewBox="0 0 210 172"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            overflow: "visible",
          }}
        >
          <defs>
            <filter id="chk-hum" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.6"
                numOctaves="2"
                seed="6"
                result="n"
              ></feTurbulence>
              <feColorMatrix
                in="n"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.55"
                result="m"
              ></feColorMatrix>
              <feComposite
                in="SourceGraphic"
                in2="m"
                operator="in"
                result="g"
              ></feComposite>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.06"
                numOctaves="2"
                seed="2"
                result="w"
              ></feTurbulence>
              <feDisplacementMap
                in="g"
                in2="w"
                scale="1.8"
                xChannelSelector="R"
                yChannelSelector="G"
              ></feDisplacementMap>
            </filter>
          </defs>
          <g
            filter="url(#chk-hum)"
            fill="none"
            stroke="#f1eee6"
            strokeWidth="2.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6,139 C60,136 150,141 204,137"></path>
            <path d="M50,138 L51,72 L159,70 L160,138"></path>
            <path d="M43,73 L105,37 L167,71 L43,73"></path>
            <circle cx="105" cy="58" r="8.5"></circle>
            <path
              d="M105,58 L105,52.5 M105,58 L109.5,60"
              strokeWidth="2.0"
            ></path>
            <path d="M105,37 L105,12"></path>
            <path
              d="M105,13 L126,17 L105,23"
              fill="#eeb4ab"
              fillOpacity=".55"
              stroke="#eeb4ab"
            ></path>
            <path d="M12,138 L12,94 L50,94 M8,95 L50,85"></path>
            <path d="M160,94 L198,94 L198,138 M160,85 L202,95"></path>
            <path
              d="M60,81 h12 v14 h-12 z M66,81 v14 M60,88 h12 M80,81 h12 v14 h-12 z M86,81 v14 M80,88 h12 M118,81 h12 v14 h-12 z M124,81 v14 M118,88 h12 M138,81 h12 v14 h-12 z M144,81 v14 M138,88 h12"
              strokeWidth="2.2"
            ></path>
            <path
              d="M60,106 h12 v14 h-12 z M66,106 v14 M80,106 h12 v14 h-12 z M86,106 v14 M118,106 h12 v14 h-12 z M124,106 v14 M138,106 h12 v14 h-12 z M144,106 v14"
              strokeWidth="2.2"
            ></path>
            <path
              d="M21,103 h10 v13 h-10 z M35,103 h10 v13 h-10 z M166,103 h10 v13 h-10 z M180,103 h10 v13 h-10 z"
              strokeWidth="2.0"
            ></path>
            <path
              d="M96,138 L96,114 Q105,102 114,114 L114,138 M105,108 L105,138"
              strokeWidth="2.5"
            ></path>
            <path
              d="M90,141 L120,141 M86,144.5 L124,144.5"
              strokeWidth="2.0"
            ></path>
            <path
              d="M62,66 L70,58 M74,66 L86,54 M88,66 L94,60 M118,66 L124,60 M130,66 L142,54 M144,66 L150,60"
              stroke="#f2d982"
              strokeWidth="1.7"
              strokeOpacity=".8"
            ></path>
            <path
              d="M16,138 q4,-9 9,-1 q4,-8 9,0 M176,138 q4,-9 9,-1 q4,-8 9,0"
              strokeWidth="2.0"
            ></path>
            <text
              x="105"
              y="166"
              textAnchor="middle"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              fontSize="16"
              fill="#f1eee6"
              stroke="none"
            >
              IES Humanejos · Parla
            </text>
          </g>
        </svg>
      </>
    ),
  },
  {
    id: "dis",
    label: "DIS Abroad Scandinavia",
    date: "16 Mar 2026",
    spoken: "16 March 2026",
    left: "37.1875%",
    top: "15%",
    width: "18.125%",
    art: (
      <>
        <svg
          viewBox="0 0 290 128"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            overflow: "visible",
          }}
        >
          <defs>
            <filter id="chk-dis" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.6"
                numOctaves="2"
                seed="19"
                result="n"
              ></feTurbulence>
              <feColorMatrix
                in="n"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.55"
                result="m"
              ></feColorMatrix>
              <feComposite
                in="SourceGraphic"
                in2="m"
                operator="in"
                result="g"
              ></feComposite>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.06"
                numOctaves="2"
                seed="3"
                result="w"
              ></feTurbulence>
              <feDisplacementMap
                in="g"
                in2="w"
                scale="1.8"
                xChannelSelector="R"
                yChannelSelector="G"
              ></feDisplacementMap>
            </filter>
          </defs>
          <g
            filter="url(#chk-dis)"
            fill="none"
            stroke="#f1eee6"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8,6 L200,5 A9,9 0 0 0 218,5 L282,6 L283,120 L218,121 A9,9 0 0 0 200,121 L9,122 Z"></path>
            <path
              d="M209,16 L209,112"
              strokeDasharray="5 6"
              strokeWidth="2"
            ></path>
            <path d="M9,28 L200,27 M218,27 L282,28" strokeWidth="2"></path>
            <text
              x="18"
              y="22"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              stroke="none"
              fontSize="14"
              fill="#f1eee6"
              letterSpacing="2"
            >
              BOARDING PASS
            </text>
            <text
              x="18"
              y="70"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              stroke="none"
              fontSize="30"
              fill="#f1eee6"
            >
              CPH
            </text>
            <text
              x="132"
              y="70"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              stroke="none"
              fontSize="30"
              fill="#f1eee6"
            >
              MAD
            </text>
            <path
              d="M78,60 Q104,36 126,58"
              stroke="#f2d982"
              strokeWidth="2.2"
              strokeDasharray="5 5"
            ></path>
            <path
              d="M118,52 L127,59 L116,61"
              stroke="#f2d982"
              strokeWidth="2.2"
            ></path>
            <text
              x="18"
              y="94"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              stroke="none"
              fontSize="11"
              fill="#c9c6bd"
            >
              PASSENGER
            </text>
            <text
              x="18"
              y="111"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              stroke="none"
              fontSize="13"
              fill="#f1eee6"
            >
              DIS Abroad Scandinavia
            </text>
            <text
              x="160"
              y="94"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              stroke="none"
              fontSize="11"
              fill="#c9c6bd"
            >
              DATE
            </text>
            <text
              x="160"
              y="111"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              stroke="none"
              fontSize="13"
              fill="#f1eee6"
            >
              16·III
            </text>
            <text
              x="228"
              y="22"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              stroke="none"
              fontSize="13"
              fill="#f2d982"
            >
              iGEM
            </text>
            <text
              x="228"
              y="56"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              stroke="none"
              fontSize="22"
              fill="#f1eee6"
            >
              MAD
            </text>
            <path
              d="M228,72 v34 M233,72 v34 M236,72 v34 M242,72 v34 M245,72 v34 M251,72 v34 M256,72 v34 M259,72 v34 M265,72 v34 M270,72 v34"
              strokeWidth="2"
            ></path>
          </g>
        </svg>
      </>
    ),
  },
  {
    id: "madrid-ciencia",
    label: "Madrid is Science Fair",
    date: "20 Mar 2026",
    spoken: "20 March 2026",
    left: "47.5%",
    top: "52.083%",
    width: "14.375%",
    art: (
      <>
        <svg
          viewBox="0 0 230 172"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            overflow: "visible",
          }}
        >
          <defs>
            <filter id="chk-mad" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.6"
                numOctaves="2"
                seed="8"
                result="n"
              ></feTurbulence>
              <feColorMatrix
                in="n"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.55"
                result="m"
              ></feColorMatrix>
              <feComposite
                in="SourceGraphic"
                in2="m"
                operator="in"
                result="g"
              ></feComposite>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.06"
                numOctaves="2"
                seed="4"
                result="w"
              ></feTurbulence>
              <feDisplacementMap
                in="g"
                in2="w"
                scale="1.8"
                xChannelSelector="R"
                yChannelSelector="G"
              ></feDisplacementMap>
            </filter>
          </defs>
          <g
            filter="url(#chk-mad)"
            fill="none"
            stroke="#f1eee6"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M60,2 L80,2 M70,2 L70,12"></path>
            <path d="M61,12 L79,12 L79,62 L61,62 Z"></path>
            <rect
              x="62.5"
              y="36"
              width="15"
              height="24"
              fill="#a9d3dd"
              fillOpacity=".5"
              stroke="none"
            ></rect>
            <path
              d="M61,22 h5 M61,30 h4 M61,38 h5 M61,46 h4 M61,54 h5"
              strokeWidth="1.7"
            ></path>
            <path d="M70,62 L70,76"></path>
            <circle
              cx="70"
              cy="85"
              r="2.4"
              fill="#a9d3dd"
              stroke="#a9d3dd"
            ></circle>
            <circle
              cx="70"
              cy="96"
              r="2.4"
              fill="#a9d3dd"
              stroke="#a9d3dd"
            ></circle>
            <path d="M26,102 L32,106 L36,160 Q37,165 42,165 L100,165 Q105,165 106,160 L110,106 L116,102"></path>
            <path
              d="M34,120 q8,-3.5 16,0 t16,0 t16,0 t16,0 t12,0"
              strokeWidth="2.2"
            ></path>
            <circle cx="52" cy="152" r="5"></circle>
            <circle
              cx="66"
              cy="156"
              r="5"
              fill="#a9d3dd"
              fillOpacity=".8"
              stroke="#a9d3dd"
            ></circle>
            <circle
              cx="80"
              cy="151"
              r="5"
              fill="#a9d3dd"
              fillOpacity=".8"
              stroke="#a9d3dd"
            ></circle>
            <circle cx="93" cy="156" r="5"></circle>
            <circle
              cx="71"
              cy="140"
              r="5"
              fill="#a9d3dd"
              fillOpacity=".8"
              stroke="#a9d3dd"
            ></circle>
            <circle cx="86" cy="137" r="5"></circle>
            <path d="M112,124 C132,100 146,94 158,94"></path>
            <path d="M150,88 L159,94 L150,100"></path>
            <circle cx="192" cy="94" r="28"></circle>
            <g fill="#a9d3dd" stroke="none">
              <circle cx="182" cy="84" r="2"></circle>
              <circle cx="194" cy="80" r="2"></circle>
              <circle cx="203" cy="90" r="2"></circle>
              <circle cx="186" cy="98" r="2"></circle>
              <circle cx="198" cy="104" r="2"></circle>
              <circle cx="178" cy="104" r="1.7"></circle>
              <circle cx="206" cy="102" r="1.7"></circle>
              <circle cx="192" cy="92" r="1.7"></circle>
            </g>
            <path
              d="M192,50 L192,60 M188,56 L192,61 L196,56 M232,94 L222,94 M226,90 L221,94 L226,98 M192,138 L192,128 M188,132 L192,127 L196,132"
              strokeWidth="2.2"
            ></path>
            <text
              x="86"
              y="44"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              fontSize="13"
              fill="#f1eee6"
              stroke="none"
            >
              alginate + dye
            </text>
            <text
              x="114"
              y="158"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              fontSize="13"
              fill="#f1eee6"
              stroke="none"
            >
              CaCl₂
            </text>
            <text
              x="192"
              y="160"
              textAnchor="middle"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              fontSize="13"
              fill="#a9d3dd"
              stroke="none"
            >
              dye captured
            </text>
            <text
              x="196"
              y="16"
              textAnchor="middle"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              fontSize="14"
              fill="#f2d982"
              stroke="none"
            >
              live demo
            </text>
          </g>
        </svg>
      </>
    ),
  },
  {
    id: "congress",
    label: "Health Sciences Congress",
    date: "16–18 Apr 2026",
    spoken: "16–18 April 2026",
    left: "59.75%",
    top: "7%",
    width: "11.25%",
    art: (
      <>
        <svg
          viewBox="0 0 180 250"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            overflow: "visible",
          }}
        >
          <defs>
            <filter id="chk-con" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.6"
                numOctaves="2"
                seed="23"
                result="n"
              ></feTurbulence>
              <feColorMatrix
                in="n"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.55"
                result="m"
              ></feColorMatrix>
              <feComposite
                in="SourceGraphic"
                in2="m"
                operator="in"
                result="g"
              ></feComposite>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.06"
                numOctaves="2"
                seed="3"
                result="w"
              ></feTurbulence>
              <feDisplacementMap
                in="g"
                in2="w"
                scale="1.8"
                xChannelSelector="R"
                yChannelSelector="G"
              ></feDisplacementMap>
            </filter>
          </defs>
          <g
            filter="url(#chk-con)"
            fill="none"
            stroke="#f1eee6"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14,8 L162,6 L164,214 L12,216 Z"></path>
            <path
              d="M30,26 C70,24 110,27 146,25 M38,38 C80,36 112,39 138,37"
              strokeWidth="3.2"
            ></path>
            <path
              d="M56,50 L120,50"
              strokeWidth="1.6"
              strokeOpacity=".7"
            ></path>
            <path d="M22,60 L154,59" strokeWidth="1.8"></path>
            <path
              d="M88,66 L88,206"
              strokeWidth="1.4"
              strokeOpacity=".5"
            ></path>
            <path d="M24,74 h30" stroke="#a9d3dd" strokeWidth="2.4"></path>
            <path
              d="M24,84 h56 M24,92 h52 M24,100 h56 M24,108 h40"
              strokeWidth="1.5"
              strokeOpacity=".75"
            ></path>
            <circle cx="52" cy="136" r="20"></circle>
            <circle
              cx="52"
              cy="136"
              r="8"
              fill="#a9d3dd"
              fillOpacity=".6"
              stroke="#a9d3dd"
            ></circle>
            <path d="M24,170 h30" stroke="#a9d3dd" strokeWidth="2.4"></path>
            <path
              d="M24,180 h56 M24,188 h50 M24,196 h56"
              strokeWidth="1.5"
              strokeOpacity=".75"
            ></path>
            <path d="M96,74 h32" stroke="#f2d982" strokeWidth="2.4"></path>
            <path d="M98,84 L98,132 L154,132" strokeWidth="2"></path>
            <path
              d="M106,132 V92 M118,132 V102 M130,132 V114 M142,132 V122"
              strokeWidth="5"
            ></path>
            <path d="M96,146 h40" stroke="#f2d982" strokeWidth="2.4"></path>
            <path
              d="M96,156 h56 M96,164 h52 M96,172 h56 M96,180 h36"
              strokeWidth="1.5"
              strokeOpacity=".75"
            ></path>
            <path
              d="M30,216 L20,246 M150,216 L160,246"
              strokeWidth="2.4"
            ></path>
            <g transform="translate(146 196) rotate(12)" stroke="#f2d982">
              <path
                d="M-10,14 L-16,44 L-8,38 L-3,46 L0,18 M10,14 L16,44 L8,38 L3,46 L0,18"
                strokeWidth="2"
              ></path>
              <circle
                cx="0"
                cy="0"
                r="22"
                strokeWidth="2.6"
                strokeDasharray="4 3"
              ></circle>
              <circle cx="0" cy="0" r="16" strokeWidth="1.8"></circle>
              <text
                x="0"
                y="-2"
                textAnchor="middle"
                fontFamily="var(--font-chalk)"
                fontWeight="700"
                stroke="none"
                fontSize="9"
                fill="#f2d982"
              >
                BEST
              </text>
              <text
                x="0"
                y="9"
                textAnchor="middle"
                fontFamily="var(--font-chalk)"
                fontWeight="700"
                stroke="none"
                fontSize="7.5"
                fill="#f2d982"
              >
                poster+oral
              </text>
            </g>
          </g>
        </svg>
      </>
    ),
  },
  {
    id: "burgos",
    label: "Museum of Human Evolution",
    date: "11 Jun 2026",
    spoken: "11 June 2026",
    left: "66%",
    top: "50%",
    width: "12%",
    art: (
      <>
        <svg
          viewBox="0 0 210 196"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            overflow: "visible",
          }}
        >
          <defs>
            <filter id="chk-bur" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.6"
                numOctaves="2"
                seed="17"
                result="n"
              ></feTurbulence>
              <feColorMatrix
                in="n"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.55"
                result="m"
              ></feColorMatrix>
              <feComposite
                in="SourceGraphic"
                in2="m"
                operator="in"
                result="g"
              ></feComposite>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.06"
                numOctaves="2"
                seed="3"
                result="w"
              ></feTurbulence>
              <feDisplacementMap
                in="g"
                in2="w"
                scale="1.8"
                xChannelSelector="R"
                yChannelSelector="G"
              ></feDisplacementMap>
            </filter>
          </defs>
          <g
            filter="url(#chk-bur)"
            fill="none"
            stroke="#f1eee6"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M142,2 h22 v9 h-22 z" strokeWidth="2.2"></path>
            <path
              d="M146,12 L98,130 M160,12 L176,130"
              stroke="#f2d982"
              strokeWidth="2"
              strokeDasharray="6 6"
            ></path>
            <path d="M18,132 L192,132 L202,146 L8,146 Z"></path>
            <path
              d="M30,139 L180,139"
              strokeWidth="1.4"
              strokeOpacity=".6"
            ></path>
            <circle cx="128" cy="62" r="9.5"></circle>
            <path d="M128,72 L126,104 M126,104 L117,131 M126,104 L135,131"></path>
            <path d="M127,80 L141,70 L150,57"></path>
            <path d="M127,82 L114,88 L108,80"></path>
            <path d="M100,131 L100,82 M93,131 L107,131 M100,82 L106,74"></path>
            <ellipse cx="56" cy="40" rx="36" ry="24"></ellipse>
            <path d="M80,56 L104,64 L86,50" strokeWidth="2.2"></path>
            <path d="M45,34 A12,12 0 1 1 48,50" strokeWidth="2.2"></path>
            <path d="M42,46 L48,51 L41,55" strokeWidth="2"></path>
            <text
              x="56"
              y="46"
              textAnchor="middle"
              fontFamily="var(--font-chalk)"
              fontSize="15"
              fontWeight="700"
              fill="#f2d982"
              stroke="none"
            >
              P
            </text>
            <text
              x="78"
              y="36"
              fontFamily="var(--font-chalk)"
              fontSize="15"
              fontWeight="700"
              fill="#f1eee6"
              stroke="none"
            >
              ?
            </text>
            <path
              d="M10,174 Q21,160 32,174 M36,174 Q47,160 58,174 M62,174 Q73,160 84,174 M88,174 Q99,160 110,174 M114,174 Q125,160 136,174 M140,174 Q151,160 162,174 M166,174 Q177,160 188,174"
              strokeWidth="2.2"
            ></path>
            <path
              d="M21,158 m-6,0 a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0 M47,158 m-6,0 a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0 M73,158 m-6,0 a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0 M99,158 m-6,0 a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0 M125,158 m-6,0 a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0 M151,158 m-6,0 a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0 M177,158 m-6,0 a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0"
              strokeWidth="2"
            ></path>
            <text
              x="105"
              y="193"
              textAnchor="middle"
              fontFamily="var(--font-chalk)"
              fontSize="16"
              fontWeight="700"
              fill="#f1eee6"
              stroke="none"
            >
              “The Cycle… Without End?”
            </text>
          </g>
        </svg>
      </>
    ),
  },
  {
    id: "lamarr",
    label: "Lamarr Vocation Camp",
    date: "10 Jul 2026",
    spoken: "10 July 2026",
    left: "79.375%",
    top: "12.5%",
    width: "15%",
    art: (
      <>
        <svg
          viewBox="0 0 240 178"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            overflow: "visible",
          }}
        >
          <defs>
            <filter id="chk-lam" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.6"
                numOctaves="2"
                seed="12"
                result="n"
              ></feTurbulence>
              <feColorMatrix
                in="n"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.55"
                result="m"
              ></feColorMatrix>
              <feComposite
                in="SourceGraphic"
                in2="m"
                operator="in"
                result="g"
              ></feComposite>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.06"
                numOctaves="2"
                seed="5"
                result="w"
              ></feTurbulence>
              <feDisplacementMap
                in="g"
                in2="w"
                scale="1.8"
                xChannelSelector="R"
                yChannelSelector="G"
              ></feDisplacementMap>
            </filter>
            <clipPath id="lam-zoom">
              <circle cx="180" cy="92" r="52"></circle>
            </clipPath>
          </defs>
          <g
            filter="url(#chk-lam)"
            fill="none"
            stroke="#f1eee6"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="30" cy="20" rx="10" ry="14"></ellipse>
            <path d="M25,32 L27,70 L30,82 L33,70 L35,32"></path>
            <path
              d="M30,90 Q37,100 30,104 Q23,100 30,90"
              fill="#eeb4ab"
              fillOpacity=".5"
              stroke="#eeb4ab"
            ></path>
            <path d="M44,98 L72,98 M66,93 L73,98 L66,103"></path>
            <circle cx="95" cy="98" r="14"></circle>
            <path d="M87,92 Q90,87 96,87" strokeWidth="1.9"></path>
            <text
              x="30"
              y="124"
              textAnchor="middle"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              fontSize="13"
              fill="#f1eee6"
              stroke="none"
            >
              liquid
            </text>
            <text
              x="95"
              y="128"
              textAnchor="middle"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              fontSize="13"
              fill="#f1eee6"
              stroke="none"
            >
              sphere
            </text>
            <path
              d="M104,88 L134,58 M104,108 L134,126"
              strokeDasharray="4 4"
              strokeWidth="2.0"
            ></path>
            <circle cx="180" cy="92" r="52"></circle>
            <g clipPath="url(#lam-zoom)">
              <path
                d="M120,70 Q129,90 138,70 Q147,90 156,70 Q165,90 174,70 Q183,90 192,70 Q201,90 210,70 Q219,90 228,70 Q237,90 246,70"
                strokeWidth="2.9"
              ></path>
              <path
                d="M120,114 Q129,94 138,114 Q147,94 156,114 Q165,94 174,114 Q183,94 192,114 Q201,94 210,114 Q219,94 228,114"
                strokeWidth="2.9"
              ></path>
              <path
                d="M120,56 Q129,76 138,56 Q147,76 156,56 Q165,76 174,56 Q183,76 192,56 Q201,76 210,56 Q219,76 228,56"
                strokeWidth="1.7"
                strokeOpacity=".45"
              ></path>
              <path
                d="M120,128 Q129,108 138,128 Q147,108 156,128 Q165,108 174,128 Q183,108 192,128 Q201,108 210,128 Q219,108 228,128"
                strokeWidth="1.7"
                strokeOpacity=".45"
              ></path>
              <g fill="#eeb4ab" stroke="none">
                <circle cx="147" cy="92" r="4"></circle>
                <circle cx="165" cy="92" r="4"></circle>
                <circle cx="183" cy="92" r="4"></circle>
                <circle cx="201" cy="92" r="4"></circle>
                <circle cx="219" cy="92" r="4"></circle>
              </g>
            </g>
            <path d="M214,30 L203,86" stroke="#eeb4ab" strokeWidth="1.9"></path>
            <text
              x="216"
              y="26"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              fontSize="14"
              fill="#eeb4ab"
              stroke="none"
            >
              Ca²⁺
            </text>
            <text
              x="180"
              y="166"
              textAnchor="middle"
              fontFamily="var(--font-chalk)"
              fontWeight="700"
              fontSize="15"
              fill="#f2d982"
              stroke="none"
            >
              egg-box model
            </text>
          </g>
        </svg>
      </>
    ),
  },
];

/** The slate itself: frame, chalk dust, the half-erased formulas in the
 * margins and the timeline the objects hang from. Purely decorative —
 * everything clickable is layered on top of it. */
function Slate() {
  return (
    <svg
      viewBox="0 0 1600 960"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <defs>
        <linearGradient id="ec-wood" x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0" stopColor="#83583a"></stop>
          <stop offset="0.5" stopColor="#6d472c"></stop>
          <stop offset="1" stopColor="#5a3922"></stop>
        </linearGradient>
        <linearGradient id="ec-tray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a6c46"></stop>
          <stop offset="0.25" stopColor="#764e30"></stop>
          <stop offset="1" stopColor="#4b2f1b"></stop>
        </linearGradient>
        <radialGradient id="ec-vign" cx="0.48" cy="0.42" r="0.75">
          <stop offset="0.45" stopColor="#000" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#000" stopOpacity="0.42"></stop>
        </radialGradient>
        <linearGradient id="ec-topshade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.45"></stop>
          <stop offset="1" stopColor="#000" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient id="ec-leftshade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.35"></stop>
          <stop offset="1" stopColor="#000" stopOpacity="0"></stop>
        </linearGradient>
        <filter
          id="ec-woodgrain"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1600"
          height="960"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.003 0.22"
            numOctaves="3"
            seed="5"
          ></feTurbulence>
          <feColorMatrix values="0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0 0.04  0.9 0 0 0 -0.32"></feColorMatrix>
          <feComposite in2="SourceGraphic" operator="in"></feComposite>
        </filter>
        <filter
          id="ec-grain"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1600"
          height="960"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="4"
            stitchTiles="stitch"
          ></feTurbulence>
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.16 0 0 0 -0.05"></feColorMatrix>
          <feComposite in2="SourceGraphic" operator="in"></feComposite>
        </filter>
        <filter
          id="ec-haze"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1600"
          height="960"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.0042"
            numOctaves="4"
            seed="11"
          ></feTurbulence>
          <feColorMatrix values="0 0 0 0 0.86  0 0 0 0 0.92  0 0 0 0 0.88  0.75 0 0 0 -0.31"></feColorMatrix>
          <feComposite in2="SourceGraphic" operator="in"></feComposite>
        </filter>
        <filter
          id="ec-dust"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1600"
          height="960"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.06"
            numOctaves="3"
            seed="21"
          ></feTurbulence>
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.4 0 0 0 -0.62"></feColorMatrix>
          <feComposite in2="SourceGraphic" operator="in"></feComposite>
        </filter>
        <filter
          id="ec-chalk"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1600"
          height="960"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.15"
            numOctaves="2"
            seed="2"
            result="n"
          ></feTurbulence>
          <feColorMatrix
            in="n"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.7"
            result="m"
          ></feColorMatrix>
          <feComposite
            in="SourceGraphic"
            in2="m"
            operator="in"
            result="g"
          ></feComposite>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="2"
            seed="9"
            result="w"
          ></feTurbulence>
          <feDisplacementMap
            in="g"
            in2="w"
            scale="3.2"
            xChannelSelector="R"
            yChannelSelector="G"
          ></feDisplacementMap>
        </filter>
        <filter
          id="ec-erased"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1600"
          height="960"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            seed="14"
            result="w"
          ></feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="w"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="G"
            result="d"
          ></feDisplacementMap>
          <feGaussianBlur in="d" stdDeviation="1.6"></feGaussianBlur>
        </filter>
        <filter
          id="ec-sweep"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1600"
          height="960"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.08"
            numOctaves="3"
            seed="3"
            result="w"
          ></feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="w"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="G"
            result="d"
          ></feDisplacementMap>
          <feGaussianBlur in="d" stdDeviation="7"></feGaussianBlur>
        </filter>
        <filter
          id="ec-soft"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1600"
          height="960"
        >
          <feGaussianBlur stdDeviation="12"></feGaussianBlur>
        </filter>
        <filter
          id="ec-blur2"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1600"
          height="960"
        >
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        </filter>
        <clipPath id="ec-slateclip">
          <rect x="30" y="30" width="1540" height="856" rx="3"></rect>
        </clipPath>
      </defs>

      <rect
        x="30"
        y="905"
        width="1540"
        height="40"
        rx="20"
        fill="#2a1a0c"
        opacity="0.35"
        filter="url(#ec-soft)"
      ></rect>
      <rect
        x="0"
        y="0"
        width="1600"
        height="900"
        rx="9"
        fill="url(#ec-wood)"
      ></rect>
      <rect
        x="0"
        y="0"
        width="1600"
        height="900"
        rx="9"
        fill="#fff"
        filter="url(#ec-woodgrain)"
      ></rect>
      <rect
        x="1"
        y="1"
        width="1598"
        height="898"
        rx="9"
        fill="none"
        stroke="#a9805a"
        strokeOpacity="0.45"
        strokeWidth="2"
      ></rect>
      <rect
        x="24"
        y="24"
        width="1552"
        height="868"
        rx="5"
        fill="#2c1c10"
      ></rect>

      <g clipPath="url(#ec-slateclip)">
        <rect x="30" y="30" width="1540" height="856" fill="#2b3c35"></rect>
        <rect
          x="30"
          y="30"
          width="1540"
          height="856"
          fill="#fff"
          filter="url(#ec-haze)"
          opacity="0.4"
        ></rect>
        <rect
          x="30"
          y="30"
          width="1540"
          height="856"
          fill="url(#ec-vign)"
        ></rect>
        <rect
          x="30"
          y="30"
          width="1540"
          height="856"
          fill="#fff"
          filter="url(#ec-grain)"
        ></rect>
        <g
          fill="none"
          stroke="#e8efe9"
          strokeLinecap="round"
          filter="url(#ec-sweep)"
        >
          <path
            d="M90,828 C360,770 700,900 1080,806"
            strokeWidth="78"
            strokeOpacity="0.07"
          ></path>
          <path
            d="M560,58 C720,24 900,118 1110,52"
            strokeWidth="54"
            strokeOpacity="0.055"
          ></path>
          <path
            d="M1280,836 C1380,770 1480,880 1560,780"
            strokeWidth="66"
            strokeOpacity="0.06"
          ></path>
          <path
            d="M40,520 C110,470 170,600 236,540"
            strokeWidth="58"
            strokeOpacity="0.05"
          ></path>
          <path
            d="M1150,40 C1190,140 1140,250 1210,330"
            strokeWidth="44"
            strokeOpacity="0.045"
          ></path>
        </g>

        <g
          fill="#e7ebe6"
          fontFamily="var(--font-chalk)"
          filter="url(#ec-erased)"
          opacity="0.13"
        >
          <text x="58" y="790" fontSize="28">
            y = a·e^(−kt)
          </text>
          <text x="980" y="874" fontSize="26">
            pH 7.4 · 25 °C
          </text>
          <text x="600" y="56" fontSize="24">
            K = [P]bead / [P]water
          </text>
          <text x="1310" y="530" fontSize="24">
            sludge → struvite?
          </text>
          <rect
            x="250"
            y="770"
            width="180"
            height="70"
            fill="none"
            stroke="#e7ebe6"
            strokeWidth="3"
          ></rect>
          <path
            d="M1185,360 C1220,340 1250,380 1290,350"
            fill="none"
            stroke="#e7ebe6"
            strokeWidth="3"
          ></path>
        </g>

        <g
          opacity="0.62"
          fill="none"
          stroke="#efece4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ec-chalk)"
        >
          <text
            x="730"
            y="94"
            fontFamily="var(--font-chalk)"
            fontSize="36"
            fontWeight="400"
            fill="#f1eee6"
            stroke="none"
            textAnchor="middle"
          >
            Education &amp; Communication
          </text>
          <path d="M556,108 C660,102 800,112 906,103" strokeWidth="2.6"></path>
          <path
            d="M590,115 C700,111 820,117 880,112"
            strokeWidth="1.4"
            strokeOpacity="0.6"
          ></path>

          <text
            x="58"
            y="566"
            fontFamily="var(--font-chalk)"
            fontSize="26"
            fill="#ece9e0"
            stroke="none"
            opacity="0.85"
          >
            ∂C/∂t = D ∇²C
          </text>
          <circle
            cx="132"
            cy="664"
            r="34"
            strokeWidth="2.4"
            opacity="0.85"
          ></circle>
          <circle cx="122" cy="654" r="2" fill="#a9d3dd" stroke="none"></circle>
          <circle cx="140" cy="672" r="2" fill="#a9d3dd" stroke="none"></circle>
          <circle
            cx="130"
            cy="676"
            r="1.8"
            fill="#a9d3dd"
            stroke="none"
          ></circle>
          <circle
            cx="144"
            cy="652"
            r="1.8"
            fill="#a9d3dd"
            stroke="none"
          ></circle>
          <path
            d="M82,614 L104,636 M98,636 L104,636 L104,630 M182,614 L160,636 M160,630 L160,636 L166,636 M82,714 L104,692 M104,698 L104,692 L98,692 M182,714 L160,692 M166,692 L160,692 L160,698"
            strokeWidth="2"
            opacity="0.8"
          ></path>
          <text
            x="192"
            y="624"
            fontFamily="var(--font-chalk)"
            fontSize="22"
            fill="#ece9e0"
            stroke="none"
            opacity="0.8"
          >
            D
          </text>
          <text
            x="86"
            y="736"
            fontFamily="var(--font-chalk)"
            fontSize="18"
            fill="#ece9e0"
            stroke="none"
            opacity="0.7"
          >
            r ≈ 1.5 mm
          </text>

          <text
            x="296"
            y="836"
            fontFamily="var(--font-chalk)"
            fontSize="25"
            fill="#ece9e0"
            stroke="none"
            opacity="0.72"
          >
            2 Na-Alg + Ca²⁺ → Ca(Alg)₂ + 2 Na⁺
          </text>
          <path
            d="M296,848 C420,844 540,852 676,846"
            strokeWidth="1.6"
            opacity="0.5"
          ></path>
          <text
            x="808"
            y="836"
            fontFamily="var(--font-chalk)"
            fontSize="22"
            fill="#ece9e0"
            stroke="none"
            opacity="0.32"
          >
            3 Ca²⁺ + 2 PO₄³⁻ → Ca₃(PO₄)₂ ↓
          </text>

          <g transform="translate(1200 132) scale(.9)" opacity="0.8">
            <path
              d="M0,-6 L0,-48 M-5,4 L-40,30 M5,4 L42,28 M2,7 L12,40"
              strokeWidth="2"
            ></path>
            <text
              x="0"
              y="7"
              fontFamily="var(--font-chalk)"
              fontSize="22"
              fill="#f1eee6"
              stroke="none"
              textAnchor="middle"
            >
              P
            </text>
            <text
              x="0"
              y="-52"
              fontFamily="var(--font-chalk)"
              fontSize="18"
              fill="#ece9e0"
              stroke="none"
              textAnchor="middle"
            >
              O
            </text>
            <text
              x="-48"
              y="42"
              fontFamily="var(--font-chalk)"
              fontSize="18"
              fill="#ece9e0"
              stroke="none"
              textAnchor="middle"
            >
              O
            </text>
            <text
              x="50"
              y="40"
              fontFamily="var(--font-chalk)"
              fontSize="18"
              fill="#ece9e0"
              stroke="none"
              textAnchor="middle"
            >
              O
            </text>
            <text
              x="15"
              y="56"
              fontFamily="var(--font-chalk)"
              fontSize="18"
              fill="#ece9e0"
              stroke="none"
              textAnchor="middle"
            >
              O
            </text>
            <path
              d="M-60,-62 L-66,-62 L-66,68 L-60,68 M64,-62 L70,-62 L70,68 L64,68"
              strokeWidth="1.6"
            ></path>
            <text
              x="76"
              y="-56"
              fontFamily="var(--font-chalk)"
              fontSize="15"
              fill="#ece9e0"
              stroke="none"
            >
              3−
            </text>
          </g>

          <g transform="translate(1432 652)" opacity="0.82">
            <path d="M-12,-77 C38,-80 74,-46 78,-8" strokeWidth="2.2"></path>
            <path d="M70,-18 L78,-6 L84,-20" strokeWidth="2"></path>
            <path d="M76,14 C70,52 40,76 6,78" strokeWidth="2.2"></path>
            <path d="M16,70 L4,78 L16,86" strokeWidth="2"></path>
            <path d="M-14,77 C-50,72 -76,44 -78,8" strokeWidth="2.2"></path>
            <path d="M-86,18 L-78,6 L-70,18" strokeWidth="2"></path>
            <path
              d="M-76,-14 C-70,-50 -44,-74 -26,-78"
              strokeWidth="2.2"
            ></path>
            <path d="M-36,-86 L-24,-78 L-36,-70" strokeWidth="2"></path>
            <text
              x="0"
              y="12"
              fontFamily="var(--font-chalk)"
              fontSize="34"
              fill="#f2d982"
              stroke="none"
              textAnchor="middle"
            >
              P
            </text>
            <text
              x="0"
              y="-92"
              fontFamily="var(--font-chalk)"
              fontSize="19"
              fill="#ece9e0"
              stroke="none"
              textAnchor="middle"
            >
              rock
            </text>
            <text
              x="96"
              y="6"
              fontFamily="var(--font-chalk)"
              fontSize="19"
              fill="#ece9e0"
              stroke="none"
            >
              soil
            </text>
            <text
              x="0"
              y="108"
              fontFamily="var(--font-chalk)"
              fontSize="19"
              fill="#ece9e0"
              stroke="none"
              textAnchor="middle"
            >
              water
            </text>
            <text
              x="-96"
              y="6"
              fontFamily="var(--font-chalk)"
              fontSize="19"
              fill="#f2d982"
              stroke="none"
              textAnchor="end"
            >
              recovery
            </text>
          </g>
        </g>

        <g
          fill="none"
          stroke="#f1eee6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ec-chalk)"
        >
          <path
            d="M58,426 C96,412 118,390 150,392 S290,452 335,450 S392,388 415,386 S560,458 600,455 S700,380 740,380 S838,458 875,456 S1000,386 1045,386 S1098,456 1130,456 S1330,392 1390,392 S1490,418 1528,428"
            strokeWidth="3.6"
          ></path>
          <path
            d="M60,428 C98,414 120,393 150,394 S290,454 335,452 S392,390 415,388 S560,460 600,457 S700,382 740,382 S838,460 875,458 S1000,388 1045,388 S1098,458 1130,458 S1330,394 1390,394 S1490,420 1526,430"
            strokeWidth="1.5"
            strokeOpacity="0.55"
            strokeDasharray="70 14 30 9 120 18"
          ></path>
          <path d="M1508,414 L1532,429 L1510,443" strokeWidth="3.2"></path>
          <path
            d="M494,406 L502,436 M506,404 L514,434"
            strokeWidth="2.6"
          ></path>
          <g strokeWidth="2" strokeDasharray="5 6">
            <path d="M150,384 L150,352"></path>
            <path d="M335,458 L335,474"></path>
            <path d="M415,378 L415,350"></path>
            <path d="M600,463 L600,496"></path>
            <path d="M740,372 L740,350"></path>
            <path d="M875,464 L875,496"></path>
            <path d="M1045,378 L1045,350"></path>
            <path d="M1130,464 L1130,480"></path>
            <path d="M1390,384 L1390,350"></path>
          </g>
          <g fill="#f1eee6" stroke="none">
            <circle cx="150" cy="392" r="5.5"></circle>
            <circle cx="335" cy="450" r="5.5"></circle>
            <circle cx="415" cy="386" r="5.5"></circle>
            <circle cx="600" cy="455" r="5.5"></circle>
            <circle cx="740" cy="380" r="5.5"></circle>
            <circle cx="875" cy="456" r="5.5"></circle>
            <circle cx="1045" cy="386" r="5.5"></circle>
            <circle cx="1130" cy="456" r="5.5"></circle>
            <circle cx="1390" cy="392" r="5.5"></circle>
          </g>
          <g
            fontFamily="var(--font-chalk)"
            fontSize="21"
            fill="#ece9e0"
            stroke="none"
          >
            <text x="46" y="466" fontSize="19" opacity="0.8">
              Nov 2025
            </text>
            <text x="160" y="428">
              Nov
            </text>
            <text x="352" y="424">
              Dec
            </text>
            <text x="536" y="436">
              Mar 2026
            </text>
            <text x="1054" y="422">
              Apr
            </text>
            <text x="1150" y="432">
              Jun
            </text>
            <text x="1398" y="430">
              Jul
            </text>
          </g>
        </g>
      </g>

      <rect
        x="24"
        y="24"
        width="1552"
        height="26"
        fill="url(#ec-topshade)"
      ></rect>
      <rect
        x="24"
        y="24"
        width="20"
        height="868"
        fill="url(#ec-leftshade)"
      ></rect>

      <rect x="0" y="880" width="1600" height="16" fill="#a37550"></rect>
      <rect
        x="0"
        y="880"
        width="1600"
        height="16"
        fill="#fff"
        filter="url(#ec-woodgrain)"
      ></rect>
      <rect
        x="0"
        y="894"
        width="1600"
        height="30"
        rx="4"
        fill="url(#ec-tray)"
      ></rect>
      <rect
        x="0"
        y="894"
        width="1600"
        height="2"
        fill="#2a1a0c"
        opacity="0.5"
      ></rect>
      <rect
        x="20"
        y="881"
        width="1560"
        height="12"
        fill="#fff"
        filter="url(#ec-dust)"
        opacity="0.65"
      ></rect>
      <g transform="translate(250 870) rotate(-3)">
        <rect x="0" y="0" width="78" height="12" rx="5.5" fill="#f2efe7"></rect>
        <rect x="0" y="7" width="78" height="5" rx="2.5" fill="#cfcac0"></rect>
        <ellipse cx="3" cy="6" rx="2.5" ry="5.5" fill="#fffdf8"></ellipse>
      </g>
      <g transform="translate(346 875) rotate(5)">
        <rect x="0" y="0" width="48" height="11" rx="5" fill="#f2d982"></rect>
        <rect
          x="0"
          y="6.5"
          width="48"
          height="4.5"
          rx="2.2"
          fill="#cdb460"
        ></rect>
      </g>
      <g transform="translate(420 876) rotate(-1)">
        <rect x="0" y="0" width="26" height="10" rx="4.5" fill="#eeb4ab"></rect>
        <rect x="0" y="6" width="26" height="4" rx="2" fill="#c9928a"></rect>
      </g>
      <g transform="translate(1440 874) rotate(-6)">
        <rect x="0" y="0" width="34" height="11" rx="5" fill="#a9d3dd"></rect>
        <rect
          x="0"
          y="6.5"
          width="34"
          height="4.5"
          rx="2"
          fill="#86b0ba"
        ></rect>
      </g>
      <g transform="translate(1486 876) rotate(3)">
        <rect x="0" y="0" width="58" height="11" rx="5" fill="#f2efe7"></rect>
        <rect
          x="0"
          y="6.5"
          width="58"
          height="4.5"
          rx="2"
          fill="#cfcac0"
        ></rect>
      </g>
      <g transform="translate(1130 850) rotate(-2)">
        <rect
          x="4"
          y="34"
          width="150"
          height="8"
          rx="3"
          fill="#000"
          opacity="0.35"
          filter="url(#ec-blur2)"
        ></rect>
        <rect x="0" y="0" width="156" height="22" rx="4" fill="#b88f5c"></rect>
        <rect
          x="0"
          y="0"
          width="156"
          height="22"
          rx="4"
          fill="#fff"
          filter="url(#ec-woodgrain)"
        ></rect>
        <rect
          x="0"
          y="0"
          width="156"
          height="4"
          rx="2"
          fill="#d7b483"
          opacity="0.8"
        ></rect>
        <rect x="0" y="22" width="156" height="12" fill="#4b4a4a"></rect>
        <rect
          x="0"
          y="23"
          width="156"
          height="11"
          fill="#fff"
          filter="url(#ec-dust)"
          opacity="0.8"
        ></rect>
      </g>
    </svg>
  );
}

export function Blackboard({
  onSelect,
  currentId,
}: {
  onSelect: (id: string) => void;
  /** The activity whose dialog is open, hopped and ringed on the board so
   * it stays findable behind the dialog and after it closes. */
  currentId?: string | null;
}) {
  return (
    <div className="ec-board-scroll">
      <nav className="ec-board" aria-label="Activities, in order">
        <Slate />

        {ITEMS.map((item, index) => (
          <a
            key={item.id}
            className={`ec-object${item.paper ? " ec-object--paper" : ""}${
              item.id === currentId ? " is-current" : ""
            }`}
            href={`#${item.id}`}
            aria-label={`${index + 1}. ${item.label}, ${item.spoken}`}
            style={{ left: item.left, top: item.top, width: item.width }}
            onClick={(event) => {
              event.preventDefault();
              onSelect(item.id);
            }}
          >
            <span
              className="ec-art"
              style={
                item.tilt ? { transform: `rotate(${item.tilt})` } : undefined
              }
            >
              {item.art}
            </span>

            <span className="ec-object__tag">
              <span className="ec-object__n">{index + 1}</span>
              <span className="ec-object__text">
                <span className="ec-object__name">{item.label}</span>
                <span className="ec-object__date">{item.date}</span>
              </span>
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
