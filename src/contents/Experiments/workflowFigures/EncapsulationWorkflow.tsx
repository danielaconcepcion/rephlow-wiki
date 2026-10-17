import { BlockArrow, C, Panel, Title, WorkflowFigure } from "./shared";

/* --------------------------------------------------------------------------
   Redraw of encapsulation-workflow.webp (1600 x 895), panel for panel:

     1. Raw material characterisation   vial of powder, powder heap,
                                        molecule under a magnifier, monitor
                                        with two spectra
     2–5. Bead optimisation             nozzle dripping into a beaker of
                                        beads, three sliders, beads of
                                        growing size over a double arrow
     6–7. Core-shell optimisation       core-shell capsule over a double
                                        arrow, three sliders
     8–10. Core-shell validation        two presses: one capsule cracking,
                                        one intact
     11–12. Core-shell characterisation a thermogram and an SEM surface

   Same serpentine: 1 → 2 → 3 along the top, down, then 4 → 5 leftwards.
   The numbers are the experiment numbers, so each panel opens the first
   experiment of its range.
   -------------------------------------------------------------------------- */

const TITLE = 29;

/** Three sliders, knobs at the originals' positions (fraction of track). */
function Sliders({
  x,
  y,
  w,
  gap,
  at,
}: {
  x: number;
  y: number;
  w: number;
  gap: number;
  at: [number, number, number];
}) {
  const knobs = [C.blue, C.green, C.orange];
  return (
    <g>
      {knobs.map((color, i) => (
        <g key={i}>
          <line
            x1={x}
            y1={y + i * gap}
            x2={x + w}
            y2={y + i * gap}
            stroke={C.steelLight}
            strokeWidth={9}
            strokeLinecap="round"
          />
          <circle
            cx={x + w * at[i]}
            cy={y + i * gap}
            r={15}
            fill={color}
            stroke={C.white}
            strokeWidth={3.5}
          />
        </g>
      ))}
    </g>
  );
}

function DoubleArrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g stroke={C.ink} strokeWidth={4.5} strokeLinecap="round" fill="none">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <path d={`M${x1 + 14},${y - 12} L${x1},${y} L${x1 + 14},${y + 12}`} />
      <path d={`M${x2 - 14},${y - 12} L${x2},${y} L${x2 - 14},${y + 12}`} />
    </g>
  );
}

/** A core-shell capsule: blue alginate shell, pale gap, yellow core. */
function CoreShell({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={C.blueLight}
        stroke={C.blue}
        strokeWidth={4}
      />
      <circle cx={x} cy={y} r={r * 0.74} fill={C.bluePale} />
      <circle cx={x} cy={y} r={r * 0.66} fill={C.yellow} />
    </g>
  );
}

function Press({ x, cracked }: { x: number; cracked?: boolean }) {
  return (
    <g>
      {/* upper platen and its stem */}
      <rect x={x - 28} y={552} width={56} height={38} rx={4} fill={C.steel} />
      <rect x={x - 94} y={586} width={188} height={42} rx={7} fill={C.steel} />
      <rect
        x={x - 94}
        y={586}
        width={188}
        height={10}
        rx={5}
        fill={C.steelLight}
      />
      {/* the load */}
      <path
        d={`M${x - 14},${630} H${x + 14} V${648} H${x + 28} L${x},${674} L${x - 28},${648} H${x - 14} Z`}
        fill={C.orange}
      />
      {/* the capsule */}
      <CoreShell x={x} y={724} r={60} />
      {cracked && (
        <g stroke={C.blue} strokeWidth={3} fill="none" strokeLinejoin="round">
          <path d={`M${x - 8},${664} l6,18 -10,16 8,20 -6,22 4,24`} />
          <path d={`M${x - 52},${700} l18,6 10,-8 14,10`} />
          <path d={`M${x + 52},${742} l-16,-4 -8,8`} />
          <path d={`M${x + 18},${666} l-6,14 10,10`} />
        </g>
      )}
      {cracked && (
        <g fill={C.blueLight} stroke={C.blue} strokeWidth={2.5}>
          <path d={`M${x - 92},${758} l16,-8 10,10 -8,10 -16,-2 Z`} />
          <path d={`M${x - 70},${782} l12,-6 8,8 -10,8 Z`} />
          <path d={`M${x + 76},${770} l14,-8 10,8 -8,12 -14,-2 Z`} />
          <path d={`M${x + 24},${780} l10,-6 8,8 -8,6 Z`} />
        </g>
      )}
      {/* lower platen */}
      <rect x={x - 118} y={786} width={236} height={42} rx={7} fill={C.steel} />
      <rect
        x={x - 118}
        y={786}
        width={236}
        height={10}
        rx={5}
        fill={C.steelLight}
      />
    </g>
  );
}

/** A patch of porous, collapsed surface, as an SEM shows it. Fixed
 * coordinates, so it renders the same every time. */
function SemSurface() {
  const pores = [
    [520, 600, 18, 10],
    [570, 640, 26, 14],
    [640, 596, 20, 12],
    [700, 650, 30, 16],
    [780, 610, 22, 12],
    [820, 680, 18, 10],
    [540, 700, 24, 14],
    [610, 730, 28, 16],
    [690, 720, 18, 10],
    [760, 760, 26, 14],
    [520, 770, 20, 12],
    [820, 760, 16, 10],
    [660, 680, 14, 8],
    [590, 680, 12, 7],
    [740, 700, 12, 8],
    [800, 720, 10, 6],
    [560, 580, 10, 6],
    [700, 590, 12, 7],
  ];
  return (
    <g>
      <rect x={477} y={563} width={368} height={242} rx={6} fill="#6d7283" />
      <clipPath id="enc-sem-clip">
        <rect x={477} y={563} width={368} height={242} rx={6} />
      </clipPath>
      <g clipPath="url(#enc-sem-clip)">
        {pores.map(([cx, cy, rx, ry], i) => (
          <g key={i}>
            <ellipse cx={cx + 3} cy={cy + 3} rx={rx} ry={ry} fill="#9da2b2" />
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#3e4252" />
          </g>
        ))}
        {pores.map(([cx, cy, rx], i) => (
          <path
            key={`r${i}`}
            d={`M${cx - rx - 14},${cy - 18} q${rx},-10 ${rx * 2 + 20},4`}
            stroke="#b9bdcb"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </g>
    </g>
  );
}

export function EncapsulationWorkflow() {
  return (
    <WorkflowFigure
      viewBox="0 0 1600 895"
      label="Five-panel workflow diagram: raw material characterisation (1), bead optimisation (2–5), core-shell optimisation (6–7), core-shell validation (8–10) and core-shell characterisation (11–12)"
      caption="Workflow of the encapsulation platform. Stages 1–12 are detailed in Engineering and Experiments."
    >
      {/* 1. Raw material characterisation */}
      <Panel
        x={28}
        y={40}
        w={547}
        h={385}
        fill={C.panelGreen}
        section="alginate-characterisation"
        target="ftir"
        label="1. Raw material characterisation"
      >
        <Title x={58} y={98} size={TITLE} anchor="start">
          1. Raw material characterisation
        </Title>
        {/* vial of powder */}
        <rect
          x={62}
          y={190}
          width={90}
          height={182}
          rx={14}
          fill={C.white}
          stroke={C.blue}
          strokeWidth={4}
        />
        <rect x={66} y={282} width={82} height={86} rx={10} fill="#eef1f4" />
        <rect x={56} y={148} width={102} height={44} rx={8} fill={C.blue} />
        {[72, 86, 100, 114, 128, 142].map((x) => (
          <line
            key={x}
            x1={x}
            y1={156}
            x2={x}
            y2={184}
            stroke={C.ink}
            strokeOpacity={0.35}
            strokeWidth={3}
          />
        ))}
        {/* heap of powder */}
        <path
          d="M158,384 C190,350 214,312 236,304 C258,312 284,350 314,384 Z"
          fill="#f4f6f8"
          stroke="#d5dae2"
          strokeWidth={2}
        />
        {/* molecule */}
        <g stroke={C.ink} strokeWidth={3}>
          <line x1={182} y1={240} x2={198} y2={222} />
          <line x1={198} y1={222} x2={227} y2={232} />
          <line x1={227} y1={232} x2={248} y2={262} />
          <line x1={248} y1={262} x2={272} y2={290} />
          <line x1={272} y1={290} x2={290} y2={258} />
          <line x1={290} y1={258} x2={318} y2={276} />
          <line x1={318} y1={276} x2={338} y2={260} />
          <line x1={198} y1={222} x2={184} y2={206} />
        </g>
        {[
          [182, 240, 13, C.blue],
          [184, 204, 11, C.blue],
          [227, 232, 13, C.blueMid],
          [248, 262, 15, C.blueMid],
          [272, 292, 12, C.blue],
          [290, 256, 12, C.blueMid],
          [318, 276, 13, C.blue],
          [338, 260, 9, C.blue],
        ].map(([cx, cy, r, f], i) => (
          <circle
            key={i}
            cx={cx as number}
            cy={cy as number}
            r={r as number}
            fill={f as string}
          />
        ))}
        {/* magnifier on the molecule */}
        <line
          x1={216}
          y1={198}
          x2={246}
          y2={180}
          stroke={C.blue}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <circle
          cx={298}
          cy={172}
          r={54}
          fill={C.white}
          stroke={C.blue}
          strokeWidth={4}
        />
        <g stroke={C.ink} strokeWidth={2.4}>
          <line x1={262} y1={184} x2={276} y2={176} />
          <line x1={276} y1={176} x2={298} y2={192} />
          <line x1={298} y1={192} x2={316} y2={176} />
          <line x1={316} y1={176} x2={318} y2={150} />
          <line x1={316} y1={176} x2={334} y2={184} />
          <line x1={298} y1={192} x2={298} y2={210} />
        </g>
        {[
          [276, 176, 8],
          [298, 192, 8],
          [316, 176, 8],
          [318, 148, 7],
          [262, 184, 4],
          [334, 184, 4],
          [298, 211, 4],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={C.steelDark} />
        ))}
        {/* monitor with two spectra */}
        <rect x={360} y={183} width={188} height={146} rx={10} fill={C.ink} />
        <rect x={372} y={195} width={164} height={120} rx={4} fill={C.white} />
        <rect x={436} y={329} width={30} height={18} fill={C.ink} />
        <rect x={404} y={345} width={96} height={14} rx={6} fill={C.ink} />
        <path
          d="M380,300 C392,300 394,250 400,252 C406,255 404,298 412,298 C420,298 420,214 428,212 C436,214 434,296 444,296 C452,296 456,290 462,292 C470,294 470,248 480,248 C490,250 488,292 498,292 C506,292 506,282 512,282 C518,282 518,300 528,300"
          fill="none"
          stroke={C.blue}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
        <path
          d="M380,302 C394,302 398,272 406,268 C414,266 414,298 424,292 C432,288 434,256 442,258 C450,262 446,298 458,296 C470,294 474,288 486,300 C498,302 512,300 528,302"
          fill="none"
          stroke={C.greenMid}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
      </Panel>

      {/* 2–5. Bead optimisation */}
      <Panel
        x={598}
        y={40}
        w={464}
        h={385}
        fill={C.panelBlue}
        section="alginate-characterisation"
        target="concentration-drop-height"
        label="2–5. Bead optimisation"
      >
        <Title x={640} y={98} size={TITLE} anchor="start">
          2–5. Bead optimisation
        </Title>
        {/* nozzle */}
        <rect x={665} y={117} width={58} height={44} rx={4} fill={C.steel} />
        <rect
          x={665}
          y={117}
          width={58}
          height={10}
          rx={4}
          fill={C.steelLight}
        />
        <rect x={683} y={160} width={22} height={18} fill={C.blue} />
        {/* drops */}
        {[204, 240, 270].map((y) => (
          <path
            key={y}
            d={`M694,${y - 12} C700,${y - 4} 703,${y} 703,${y + 4} A9,9 0 1 1 685,${y + 4} C685,${y} 688,${y - 4} 694,${y - 12} Z`}
            fill={C.blueMid}
          />
        ))}
        {/* beaker of beads */}
        <rect
          x={634}
          y={300}
          width={128}
          height={100}
          rx={14}
          fill={C.blueLight}
          fillOpacity={0.7}
        />
        <path
          d="M628,262 H768 M634,262 V384 a16,16 0 0 0 16,16 H746 a16,16 0 0 0 16,-16 V262"
          fill="none"
          stroke={C.blue}
          strokeWidth={4}
          strokeLinecap="round"
        />
        {[
          [696, 326],
          [664, 352],
          [728, 352],
          [697, 376],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}${cy}`}
            cx={cx}
            cy={cy}
            r={11}
            fill={C.blueMid}
            stroke={C.blue}
            strokeWidth={2}
          />
        ))}
        <Sliders x={838} y={148} w={182} gap={49} at={[0.5, 0.63, 0.7]} />
        {/* beads of growing size */}
        {[
          [804, 352, 12],
          [852, 344, 20],
          [915, 335, 28],
          [993, 326, 35],
        ].map(([cx, cy, r]) => (
          <g key={cx}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={C.blueMid}
              stroke={C.blue}
              strokeWidth={3}
            />
            <ellipse
              cx={cx - r * 0.35}
              cy={cy - r * 0.4}
              rx={r * 0.28}
              ry={r * 0.16}
              fill={C.white}
              fillOpacity={0.6}
            />
          </g>
        ))}
        <DoubleArrow x1={792} x2={1024} y={390} />
      </Panel>

      {/* 6–7. Core-shell optimisation */}
      <Panel
        x={1085}
        y={40}
        w={487}
        h={385}
        fill={C.panelGreen}
        section="core-shell-formation"
        target="concentrations-screening"
        label="6–7. Core-shell optimisation"
      >
        <Title x={1112} y={98} size={TITLE} anchor="start">
          6–7. Core-shell optimisation
        </Title>
        <CoreShell x={1254} y={262} r={122} />
        <Sliders x={1402} y={181} w={154} gap={51} at={[0.48, 0.62, 0.7]} />
        <DoubleArrow x1={1134} x2={1374} y={398} />
      </Panel>

      {/* 8–10. Core-shell validation */}
      <Panel
        x={942}
        y={480}
        w={630}
        h={375}
        fill={C.panelBlue}
        section="core-shell-formation"
        target="containment"
        label="8–10. Core-shell validation"
      >
        <Title x={1257} y={538} size={TITLE}>
          8–10. Core-shell validation
        </Title>
        <Press x={1117} cracked />
        <Press x={1406} />
      </Panel>

      {/* 11–12. Core-shell characterisation */}
      <Panel
        x={28}
        y={480}
        w={847}
        h={375}
        fill={C.panelGreen}
        section="final-characterisation"
        target="tga-dsc"
        label="11–12. Core-shell characterisation"
      >
        <Title x={452} y={538} size={TITLE}>
          11–12. Core-shell characterisation
        </Title>
        {/* thermogram */}
        <rect x={60} y={563} width={396} height={242} rx={6} fill={C.white} />
        <g stroke={C.ink} strokeWidth={3}>
          <line x1={86} y1={580} x2={86} y2={790} />
          <line x1={86} y1={790} x2={436} y2={790} />
          {[612, 650, 688, 726, 764].map((y) => (
            <line key={y} x1={78} y1={y} x2={86} y2={y} />
          ))}
          {[144, 202, 260, 318, 376, 434].map((x) => (
            <line key={x} x1={x} y1={790} x2={x} y2={798} />
          ))}
        </g>
        <path
          d="M88,594 H150 C172,594 176,640 196,654 C210,662 236,656 250,664 C268,676 274,740 300,752 C320,758 380,756 434,756"
          fill="none"
          stroke={C.blue}
          strokeWidth={4.5}
          strokeLinecap="round"
        />
        <SemSurface />
      </Panel>

      {/* Arrows on top, as in the original, overlapping the panel edges. */}
      <BlockArrow x={588} y={230} />
      <BlockArrow x={1082} y={230} />
      <BlockArrow x={1282} y={452} angle={90} />
      <BlockArrow x={908} y={662} angle={180} />
    </WorkflowFigure>
  );
}
