import type { ReactNode } from "react";
import {
  BlockArrow,
  C,
  Title,
  WorkflowFigure,
} from "../Experiments/workflowFigures/shared";
import {
  Bacterium,
  Flask,
  Monitor,
} from "../Experiments/workflowFigures/parts";

/* --------------------------------------------------------------------------
   The modelling workflow, drawn in the same idiom as the Experiments
   figures (see Experiments/workflowFigures): six panels on the same grid,
   the same two washes alternating, the same block arrows between them, and
   one short title and one short subtitle per panel.

   The six panels are the six sections of this page, in the order the page
   runs them, so each panel opens the section it stands for.
   -------------------------------------------------------------------------- */

const TITLE = 34;
const SUB = 24;

/** Panel geometry, copied from the Experiments grid so the two figures
 * set at the same scale. */
const COL = [
  { x: 8, w: 484, cx: 250 },
  { x: 530, w: 485, cx: 772 },
  { x: 1061, w: 483, cx: 1302 },
];
const ROW = [
  { y: 8, h: 314, title: 66, sub: 290 },
  { y: 369, h: 313, title: 428, sub: 650 },
];

function Panel({
  col,
  row,
  fill,
  href,
  label,
  children,
}: {
  col: number;
  row: number;
  fill: string;
  href: string;
  label: string;
  children: ReactNode;
}) {
  const { x, w } = COL[col];
  const { y, h } = ROW[row];
  return (
    <a
      className="wff-panel"
      href={href}
      aria-label={label}
      onClick={(event) => {
        event.preventDefault();
        document
          .getElementById(href.slice(1))
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <rect
        className="wff-panel__bg"
        x={x}
        y={y}
        width={w}
        height={h}
        rx={34}
        fill={fill}
      />
      {children}
    </a>
  );
}

function Subtitle({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="var(--font-body)"
      fontSize={SUB}
      fill={C.ink}
    >
      {children}
    </text>
  );
}

/** A short polyphosphate chain: beads on a backbone, as the rest of the
 * wiki draws it. */
function PolyP({
  x,
  y,
  count = 5,
  r = 13,
  gap = 25,
}: {
  x: number;
  y: number;
  count?: number;
  r?: number;
  gap?: number;
}) {
  return (
    <g>
      <line
        x1={x}
        y1={y}
        x2={x + (count - 1) * gap}
        y2={y}
        stroke={C.gold}
        strokeWidth={8}
      />
      {Array.from({ length: count }, (_, i) => (
        <g key={i}>
          <circle
            cx={x + i * gap}
            cy={y}
            r={r}
            fill={C.gold}
            stroke={C.ink}
            strokeWidth={2.4}
          />
          <text
            x={x + i * gap}
            y={y + r * 0.4}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight={700}
            fontSize={r}
            fill={C.white}
          >
            P
          </text>
        </g>
      ))}
    </g>
  );
}

/** Bare axes with the arrowheads the Experiments figures draw. */
function Axes({
  ox,
  oy,
  w,
  h,
}: {
  ox: number;
  oy: number;
  w: number;
  h: number;
}) {
  return (
    <g>
      <g stroke={C.ink} strokeWidth={3} fill="none">
        <line x1={ox} y1={oy} x2={ox} y2={oy - h} />
        <line x1={ox} y1={oy} x2={ox + w} y2={oy} />
      </g>
      <g fill={C.ink}>
        <path
          d={`M${ox},${oy - h - 12} L${ox - 7},${oy - h + 2} L${ox + 7},${oy - h + 2} Z`}
        />
        <path
          d={`M${ox + w + 12},${oy} L${ox + w - 2},${oy - 7} L${ox + w - 2},${oy + 7} Z`}
        />
      </g>
    </g>
  );
}

/** A free curve over those axes — unlike the shared `Plot`, it does not
 * have to start at the origin, so a falling series can be drawn. */
function Curve({ color, pts }: { color: string; pts: [number, number][] }) {
  return (
    <g>
      <path
        d={`M${pts.map(([x, y]) => `${x},${y}`).join(" L")}`}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {pts.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={6.5} fill={color} />
      ))}
    </g>
  );
}

export function ModelWorkflow() {
  return (
    <WorkflowFigure
      viewBox="0 0 1554 694"
      label="Six-panel workflow diagram: flux balance analysis, the genome-scale metabolic map, environmental and capacity sensitivity, the growth and polyphosphate trade-off, reduction to an active kinetic core, and the reduced kinetic model"
      caption="The six steps this page runs through, from the flux balance analysis behind the genome-scale map to the reduced kinetic model of phosphate accumulation. Select a panel to open its section."
    >
      {/* 1. Flux balance — the optimum on the feasible flux space. */}
      <Panel
        col={0}
        row={0}
        fill={C.panelGreen}
        href="#fba-primer"
        label="1. Flux balance"
      >
        <Title x={250} y={ROW[0].title} size={TITLE}>
          1. Flux balance
        </Title>
        <Monitor x={137} y={88} w={226} h={140}>
          <polygon
            points="168,202 188,146 242,114 306,128 334,184 290,210"
            fill={C.blueLight}
            stroke={C.blue}
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <line
            x1={210}
            y1={184}
            x2={294}
            y2={138}
            stroke={C.ink}
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <path d="M306,128 L288,132 L296,147 Z" fill={C.ink} />
          <circle
            cx={306}
            cy={128}
            r={11}
            fill={C.gold}
            stroke={C.ink}
            strokeWidth={3}
          />
        </Monitor>
        <Subtitle x={250} y={ROW[0].sub}>
          FBA + pFBA + FVA
        </Subtitle>
      </Panel>

      {/* 2. Genome-scale map — the reconstruction and what it accounts for. */}
      <Panel
        col={1}
        row={0}
        fill={C.panelSlate}
        href="#metabolic-network"
        label="2. Metabolic map"
      >
        <Title x={772} y={ROW[0].title} size={TITLE}>
          2. Metabolic map
        </Title>
        <g stroke={C.ink} strokeWidth={2.6}>
          <line x1={668} y1={112} x2={726} y2={99} />
          <line x1={726} y1={99} x2={838} y2={104} />
          <line x1={838} y1={104} x2={890} y2={130} />
        </g>
        <g fill={C.blue} stroke={C.ink} strokeWidth={2.6}>
          <circle cx={668} cy={112} r={15} />
          <circle cx={726} cy={99} r={12} />
          <circle cx={838} cy={104} r={15} />
          <circle cx={890} cy={130} r={12} />
        </g>
        <Bacterium
          x={772}
          y={182}
          len={226}
          wid={126}
          rot={-8}
          stroke={C.green}
          fill={C.greenLight}
          dna={C.green}
          flagella={14}
          flagellaLen={20}
        />
        <PolyP x={722} y={190} count={5} />
        <Subtitle x={772} y={ROW[0].sub}>
          iJN1463 reconstruction
        </Subtitle>
      </Panel>

      {/* 3. Sensitivity — the same network under different environments. */}
      <Panel
        col={2}
        row={0}
        fill={C.panelGreen}
        href="#phase-b-sensitivity"
        label="3. Sensitivity"
      >
        <Title x={1302} y={ROW[0].title} size={TITLE}>
          3. Sensitivity
        </Title>
        <Flask
          x={1214}
          top={104}
          w={92}
          h={148}
          liquid={C.blueLight}
          level={0.4}
        />
        <Flask
          x={1302}
          top={92}
          w={104}
          h={160}
          liquid={C.greenLight}
          level={0.58}
        />
        <Flask
          x={1392}
          top={108}
          w={88}
          h={144}
          liquid={C.yellow}
          level={0.74}
        />
        <Subtitle x={1302} y={ROW[0].sub}>
          environment + capacity limits
        </Subtitle>
      </Panel>

      {/* 4. Trade-off — growth against polyphosphate accumulation. */}
      <Panel
        col={2}
        row={1}
        fill={C.panelSlate}
        href="#growth-polyp-balance"
        label="4. Trade-off"
      >
        <Title x={1302} y={ROW[1].title} size={TITLE}>
          4. Trade-off
        </Title>
        <Axes ox={1200} oy={614} w={212} h={146} />
        <Curve
          color={C.green}
          pts={[
            [1222, 486],
            [1266, 500],
            [1310, 540],
            [1354, 578],
            [1392, 596],
          ]}
        />
        <Curve
          color={C.gold}
          pts={[
            [1222, 596],
            [1266, 580],
            [1310, 544],
            [1354, 504],
            [1392, 484],
          ]}
        />
        <Subtitle x={1302} y={ROW[1].sub}>
          growth vs polyP accumulation
        </Subtitle>
      </Panel>

      {/* 5. Reduction — the active core, lumped into modules. */}
      <Panel
        col={1}
        row={1}
        fill={C.panelGreen}
        href="#kinetic-core"
        label="5. Reduction"
      >
        <Title x={772} y={ROW[1].title} size={TITLE}>
          5. Reduction
        </Title>
        <g fill={C.blueLight} stroke={C.ink} strokeWidth={2.6}>
          {[
            [634, 482],
            [672, 496],
            [628, 524],
            [668, 540],
            [636, 568],
            [676, 584],
            [648, 606],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={12} />
          ))}
        </g>
        <path
          d="M706 482H768L802 538L768 594H706L740 538Z"
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3}
        />
        <g>
          <line
            x1={818}
            y1={538}
            x2={852}
            y2={538}
            stroke={C.ink}
            strokeWidth={9}
            strokeLinecap="round"
          />
          <path d="M852,520 L886,538 L852,556 Z" fill={C.ink} />
        </g>
        <rect
          x={898}
          y={484}
          width={84}
          height={110}
          rx={20}
          fill={C.blue}
          opacity={0.86}
        />
        <rect x={912} y={500} width={56} height={16} rx={8} fill={C.white} />
        <rect
          x={912}
          y={531}
          width={56}
          height={16}
          rx={8}
          fill={C.greenLight}
        />
        <rect x={912} y={562} width={56} height={16} rx={8} fill={C.yellow} />
        <Subtitle x={772} y={ROW[1].sub}>
          active core + lumping
        </Subtitle>
      </Panel>

      {/* 6. Kinetics — the rate equations and the time courses they give. */}
      <Panel
        col={0}
        row={1}
        fill={C.panelSlate}
        href="#reduced-kinetic-model"
        label="6. Kinetics"
      >
        <Title x={250} y={ROW[1].title} size={TITLE}>
          6. Kinetics
        </Title>
        <rect
          x={116}
          y={455}
          width={268}
          height={76}
          rx={12}
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3}
        />
        <text
          x={250}
          y={504}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize={30}
          fontStyle="italic"
          fill={C.ink}
        >
          dX/dt = N v(X,p)
        </text>
        <g stroke={C.ink} strokeWidth={3} strokeLinecap="round">
          <line x1={140} y1={548} x2={140} y2={620} />
          <line x1={140} y1={620} x2={366} y2={620} />
        </g>
        <path
          d="M144 612C168 596 188 570 216 562S292 557 362 556"
          fill="none"
          stroke={C.blue}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <path
          d="M144 616C190 614 220 606 252 592S330 554 356 542"
          fill="none"
          stroke={C.gold}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <circle
          cx={356}
          cy={542}
          r={13}
          fill={C.gold}
          stroke={C.ink}
          strokeWidth={2.6}
        />
        <text
          x={356}
          y={547}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight={700}
          fontSize={13}
          fill={C.white}
        >
          P
        </text>
        <Subtitle x={250} y={ROW[1].sub}>
          rate laws + COPASI model
        </Subtitle>
      </Panel>

      <BlockArrow x={511} y={165} />
      <BlockArrow x={1038} y={165} />
      <BlockArrow x={1302} y={345} angle={90} />
      <BlockArrow x={1040} y={528} angle={180} />
      <BlockArrow x={512} y={528} angle={180} />
    </WorkflowFigure>
  );
}
