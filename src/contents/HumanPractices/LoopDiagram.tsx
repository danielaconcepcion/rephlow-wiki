import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

/** One stage of a Human Practices loop, as the ring draws it. The ring's
 * geometry (the slice path, where its number and icon sit, and the few
 * pixels it slides outwards when selected) is kept as authored rather than
 * recomputed, so the figure matches the design exactly. */
interface Stage {
  title: string;
  definition: string;
  meaning: string;
  /** The rePhlow example, in runs so the emphasis survives as markup. */
  example: ({ text: string } | { bold: string })[];
  offset: [number, number];
  d: string;
  at: string;
  icon: React.ReactNode;
}

type SegStyle = CSSProperties & { "--ox": string; "--oy": string };

const STAGES: Stage[] = [
  {
    title: "Perspective",
    definition: "Relevant knowledge or concern was recorded.",
    meaning:
      "Listening has taken place and what was said is on record. On its own, this is consultation rather than integration.",
    example: [
      { bold: "Bio-Oils Huelva" },
      {
        text: " (20 March 2025) described the phosphorus range, pH and temperature of their degumming effluent and warned that any new treatment would have to fit around existing infrastructure.",
      },
    ],
    offset: [4.5, -7.79],
    d: "M 5.19 -185.93 A 186 186 0 0 1 158.42 -97.46 L 137.29 -62.86 L 98.80 -60.78 A 116 116 0 0 0 3.24 -115.95 L 22.58 -149.30 Z",
    at: "83.34 -125.92",
    icon: (
      <>
        <path d="M-5 4.5c-2.6-1.7-4.2-4.3-4.2-7.4A9.2 9.2 0 0 1 0-12.1a9.2 9.2 0 0 1 9.2 9.2c0 3.1-1.6 5.7-4.2 7.4V7.5h-10Z" />
        \n <path d="M-3.5 11h7" />
      </>
    ),
  },
  {
    title: "Decision changed",
    definition: "The input produced a traceable modification.",
    meaning:
      "Something in rePhlow is different because of what we heard, and the change can be traced back to that input. This is where consultation becomes integration.",
    example: [
      { text: "After " },
      { bold: "CEDEX" },
      {
        text: " (1 October 2025) showed us what an official reference method involves, we stopped presenting our malachite-green colorimetric assay as a finished method and reframed rePhlow as a complement to established treatment rather than a replacement for it.",
      },
    ],
    offset: [9.0, 0.0],
    d: "M 163.61 -88.47 A 186 186 0 0 1 163.61 88.47 L 123.08 87.47 L 102.04 55.17 A 116 116 0 0 0 102.04 -55.17 L 140.59 -55.10 Z",
    at: "150.72 9.22",
    icon: (
      <>
        <rect x="-4" y="-12" width="8" height="6" rx="1.5" />
        \n <rect x="-12" y="6" width="8" height="6" rx="1.5" />
        \n <rect x="4" y="6" width="8" height="6" rx="1.5" />
        \n <path d="M0-6v5M-8 6V2h16v4" />
      </>
    ),
  },
  {
    title: "Change implemented",
    definition:
      "The modification entered a construct, protocol, experiment, model or communication output.",
    meaning:
      "The decision has left the meeting room. It now exists in something we built, ran or published, not only in our intentions.",
    example: [
      {
        text: "Bio-Oils' concentration, pH and temperature ranges became the recipe for a ",
      },
      { bold: "synthetic wastewater stream" },
      {
        text: ", which we used to run our first phosphorus-assay approximations before we had access to any real effluent.",
      },
    ],
    offset: [4.5, 7.79],
    d: "M 158.42 97.46 A 186 186 0 0 1 5.19 185.93 L -14.21 150.33 L 3.24 115.95 A 116 116 0 0 0 98.80 60.78 L 118.01 94.21 Z",
    at: "67.38 135.14",
    icon: (
      <>
        <circle r="4" />
        \n{" "}
        <path d="M0-12v3.2M0 8.8V12M-12 0h3.2M8.8 0H12M-8.5-8.5l2.3 2.3M6.2 6.2l2.3 2.3M-8.5 8.5l2.3-2.3M6.2-6.2l2.3-2.3" />
      </>
    ),
  },
  {
    title: "Change evaluated",
    definition: "Evidence was generated to assess the modified design.",
    meaning:
      "We produced evidence on whether the modified design behaves as intended. Without it, a change remains a claim rather than a result.",
    example: [
      { text: "Tested on a sample of Bio-Oils' " },
      { bold: "real degumming effluent" },
      {
        text: ", our engineered strain accumulated more phosphorus than the wild type and did not die, our first evidence that rePhlow can work on an authentic industrial stream.",
      },
    ],
    offset: [-4.5, 7.79],
    d: "M -5.19 185.93 A 186 186 0 0 1 -158.42 97.46 L -137.29 62.86 L -98.80 60.78 A 116 116 0 0 0 -3.24 115.95 L -22.58 149.30 Z",
    at: "-83.34 125.92",
    icon: (
      <>
        <rect x="-9" y="-10" width="18" height="22" rx="2.5" />
        \n <path d="M-4-12.5h8v4h-8z" />
        \n <path d="M-4.5 2.5l3 3 6-6.5" />
      </>
    ),
  },
  {
    title: "Returned to stakeholder",
    definition:
      "The revised design or evidence was brought back to the person or community whose input initiated the change.",
    meaning:
      "The person or community whose input triggered the change sees what we did with it. This turns integration into a two-way exchange, and it is the step most often missing.",
    example: [
      {
        text: "Once stable core-shell capsules existed but their internal structure could not be seen, we took that problem straight back to ",
      },
      { bold: "M\u00aa Carmen Garc\u00eda Payo" },
      {
        text: ", who had proposed the core-shell architecture in the first place.",
      },
    ],
    offset: [-9.0, 0.0],
    d: "M -163.61 88.47 A 186 186 0 0 1 -163.61 -88.47 L -123.08 -87.47 L -102.04 -55.17 A 116 116 0 0 0 -102.04 55.17 L -140.59 55.10 Z",
    at: "-150.72 -9.22",
    icon: (
      <>
        <path d="M11 -2.5H-6.5" />
        \n <path d="M-2-7.5l-5 5 5 5" />
        \n <path d="M-11 5.5H6.5" />
        \n <path d="M2 0.5l5 5-5 5" />
      </>
    ),
  },
  {
    title: "Further iteration completed",
    definition: "Their subsequent response produced another modification.",
    meaning:
      "The stakeholder's response to the revised design changed something again. Only at this point do we describe a loop as closed.",
    example: [
      { text: "Carmen's response, " },
      { bold: "magnetite as an optical tracer" },
      {
        text: " and liquid-nitrogen cryo-sectioning, became our method for imaging the shell and measuring its wall thickness, a characterisation that had previously been entirely qualitative.",
      },
    ],
    offset: [-4.5, -7.79],
    d: "M -158.42 -97.46 A 186 186 0 0 1 -5.19 -185.93 L 14.21 -150.33 L -3.24 -115.95 A 116 116 0 0 0 -98.80 -60.78 L -118.01 -94.21 Z",
    at: "-67.38 -135.14",
    icon: (
      <>
        <path d="M9.5-3.5A10 10 0 0 0-8-5.5" />
        \n <path d="M-9-11v6h6" />
        \n <path d="M-9.5 3.5A10 10 0 0 0 8 5.5" />
        \n <path d="M9 11V5H3" />
      </>
    ),
  },
];

/** Stages 1–4 are integration; 5 and 6 are what closes the loop. */
const CLOSING_FROM = 5;

/**
 * "When is a Human Practices loop closed?" — the six stages as a ring of
 * slices with a panel beside it: select a slice (or step through with the
 * buttons or the arrow keys) to see what that stage requires and where it
 * happened in rePhlow.
 */
export function LoopDiagram() {
  const [active, setActive] = useState(0);
  const ringRef = useRef<SVGSVGElement>(null);

  const stage = STAGES[active];
  const closing = active + 1 >= CLOSING_FROM;

  function focusStage(index: number) {
    const next = (index + STAGES.length) % STAGES.length;
    setActive(next);
    ringRef.current
      ?.querySelector<SVGGElement>(`#hp-loop-tab-${next + 1}`)
      ?.focus();
  }

  function onKeyDown(event: KeyboardEvent<SVGGElement>, index: number) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusStage(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusStage(index - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActive(index);
    }
  }

  return (
    <div className="hp-loop">
      <div className="hp-loop__stage-area">
        <div className="hp-loop__figure">
          <svg
            className="hp-loop__ring"
            viewBox="-206 -206 412 412"
            role="tablist"
            aria-label="Six stages of a Human Practices loop. Use the arrow keys to move between stages."
            ref={ringRef}
          >
            <circle className="hp-loop__hub" r="104" aria-hidden="true" />
            {STAGES.map((item, i) => {
              const isActive = i === active;
              return (
                <g
                  className={`hp-loop__seg hp-loop__seg--${i + 1}${isActive ? " is-active" : ""}`}
                  key={item.title}
                  role="tab"
                  id={`hp-loop-tab-${i + 1}`}
                  aria-selected={isActive}
                  aria-controls="hp-loop-panel"
                  aria-label={`Stage ${i + 1}: ${item.title}`}
                  tabIndex={isActive ? 0 : -1}
                  style={
                    {
                      "--ox": `${item.offset[0]}px`,
                      "--oy": `${item.offset[1]}px`,
                    } as SegStyle
                  }
                  onClick={() => setActive(i)}
                  onKeyDown={(event) => onKeyDown(event, i)}
                >
                  <path className="hp-loop__seg-shape" d={item.d} />
                  <g
                    className="hp-loop__seg-content"
                    transform={`translate(${item.at})`}
                    aria-hidden="true"
                  >
                    <text className="hp-loop__seg-number" y="-13">
                      {i + 1}
                    </text>
                    <g transform="translate(0 9) scale(0.92)">
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {item.icon}
                      </g>
                    </g>
                  </g>
                </g>
              );
            })}
          </svg>

          <div className="hp-loop__centre" aria-hidden="true">
            <span className="hp-loop__centre-number">{active + 1}</span>
            <span className="hp-loop__centre-title">{stage.title}</span>
            <span
              className={`hp-loop__centre-phase${closing ? " is-closing" : ""}`}
            >
              {closing ? "Closing the loop" : "Integration"}
            </span>
          </div>
        </div>

        <ul className="hp-loop__legend" aria-label="Phases of the loop">
          <li>
            <span className="hp-loop__legend-swatch" aria-hidden="true" />
            Stages 1–4 · Integration
          </li>
          <li>
            <span
              className="hp-loop__legend-swatch is-closing"
              aria-hidden="true"
            />
            Stages 5–6 · Closing the loop
          </li>
        </ul>
      </div>

      <div
        className="hp-loop__panel"
        id="hp-loop-panel"
        role="tabpanel"
        aria-labelledby={`hp-loop-tab-${active + 1}`}
        aria-live="polite"
      >
        <div className="hp-loop__panel-inner" key={active}>
          <p className="hp-loop__eyebrow">
            Stage {active + 1} of {STAGES.length} ·{" "}
            {closing ? "Closing the loop" : "Integration"}
          </p>
          <h4 className="hp-loop__title">{stage.title}</h4>
          <p className="hp-loop__definition">{stage.definition}</p>
          <p className="hp-loop__meaning">{stage.meaning}</p>
          <div className="hp-loop__example">
            <span className="hp-loop__example-label">In rePhlow</span>
            <p>
              {stage.example.map((run, i) =>
                "bold" in run ? (
                  <strong key={i}>{run.bold}</strong>
                ) : (
                  <span key={i}>{run.text}</span>
                ),
              )}
            </p>
          </div>
        </div>

        <div className="hp-loop__nav">
          <button
            type="button"
            className="hp-loop__nav-btn"
            aria-label="Previous stage"
            onClick={() =>
              setActive((i) => (i - 1 + STAGES.length) % STAGES.length)
            }
          >
            <span aria-hidden="true">←</span> Previous
          </button>
          <span className="hp-loop__dots" aria-hidden="true">
            {STAGES.map((item, i) => (
              <span
                className={`hp-loop__dot${i === active ? " is-active" : ""}`}
                key={item.title}
              />
            ))}
          </span>
          <button
            type="button"
            className="hp-loop__nav-btn"
            aria-label="Next stage"
            onClick={() => setActive((i) => (i + 1) % STAGES.length)}
          >
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
