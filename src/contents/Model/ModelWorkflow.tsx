import type { ReactNode } from "react";
import {
  BlockArrow,
  C,
  ThinArrow,
  Title,
  WorkflowFigure,
} from "../Experiments/workflowFigures/shared";

const TITLE = 27;

function ModelPanel({
  x,
  fill,
  href,
  label,
  children,
}: {
  x: number;
  fill: string;
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a className="wff-panel" href={href} aria-label={label}>
      <rect
        className="wff-panel__bg"
        x={x}
        y={10}
        width={340}
        height={380}
        rx={34}
        fill={fill}
      />
      {children}
    </a>
  );
}

function Axis({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={C.ink} strokeWidth={3} strokeLinecap="round">
      <line x1={x} y1={y - 112} x2={x} y2={y} />
      <line x1={x} y1={y} x2={x + 190} y2={y} />
    </g>
  );
}

export function ModelWorkflow() {
  return (
    <WorkflowFigure
      viewBox="0 0 1870 400"
      label="Five-stage modelling workflow: define the metabolic system, calculate representative flux states, scan individual constraints, test interactions and translate predictions into design decisions"
      caption="The modelling workflow used to move from a genome-scale reconstruction to testable decisions for phosphate accumulation. Select a stage to open the corresponding analysis."
    >
      <ModelPanel
        x={10}
        fill={C.panelGreen}
        href="#fba-primer"
        label="1. Define the system"
      >
        <Title x={180} y={58} size={TITLE}>
          1. Define the system
        </Title>
        <g transform="translate(180 202)">
          {[
            [-92, -58],
            [0, -82],
            [90, -48],
            [-72, 36],
            [22, 20],
            [92, 70],
          ].map(([cx, cy], index) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={index === 4 ? 22 : 15}
              fill={index === 4 ? C.gold : C.white}
              stroke={C.ink}
              strokeWidth={3}
            />
          ))}
          <g stroke={C.blue} strokeWidth={6} strokeLinecap="round">
            <line x1={-78} y1={-52} x2={-15} y2={-75} />
            <line x1={15} y1={-76} x2={76} y2={-53} />
            <line x1={-84} y1={-44} x2={-76} y2={20} />
            <line x1={-58} y1={31} x2={0} y2={23} />
            <line x1={16} y1={-64} x2={18} y2={-4} />
            <line x1={42} y1={30} x2={78} y2={59} />
          </g>
          <circle cx={22} cy={20} r={8} fill={C.ink} />
          <text
            x={22}
            y={27}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight={700}
            fontSize={18}
            fill={C.white}
          >
            P
          </text>
        </g>
        <text
          x={180}
          y={350}
          textAnchor="middle"
          fontFamily="var(--font-body)"
          fontSize={21}
          fill={C.inkSoft}
        >
          Genome-scale reconstruction
        </text>
      </ModelPanel>

      <BlockArrow x={382} y={200} length={58} />

      <ModelPanel
        x={404}
        fill={C.panelBlue}
        href="#metabolic-network"
        label="2. Calculate flux states"
      >
        <Title x={574} y={58} size={TITLE}>
          2. Calculate flux states
        </Title>
        <g transform="translate(476 104)">
          <Axis x={0} y={170} />
          <path
            d="M8 157C44 143 67 119 91 94S143 47 185 27"
            fill="none"
            stroke={C.blue}
            strokeWidth={7}
            strokeLinecap="round"
          />
          <path
            d="M10 52L60 83L105 101L151 129L185 157"
            fill="none"
            stroke={C.green}
            strokeWidth={7}
            strokeLinecap="round"
          />
          <circle
            cx={102}
            cy={100}
            r={13}
            fill={C.gold}
            stroke={C.ink}
            strokeWidth={3}
          />
          <path d="M134 52l24 13-24 13Z" fill={C.ink} />
          <line
            x1={108}
            y1={65}
            x2={140}
            y2={65}
            stroke={C.ink}
            strokeWidth={5}
          />
        </g>
        <text
          x={574}
          y={350}
          textAnchor="middle"
          fontFamily="var(--font-body)"
          fontSize={21}
          fill={C.inkSoft}
        >
          FBA and parsimonious FBA
        </text>
      </ModelPanel>

      <BlockArrow x={776} y={200} length={58} />

      <ModelPanel
        x={798}
        fill={C.panelGreen}
        href="#factor-explorer"
        label="3. Scan individual constraints"
      >
        <Title x={968} y={58} size={TITLE}>
          3. Scan constraints
        </Title>
        <g transform="translate(858 112)">
          {[0, 1, 2, 3].map((row) => {
            const y = row * 48;
            const positions = [42, 122, 76, 158];
            return (
              <g key={row}>
                <line
                  x1={0}
                  y1={y}
                  x2={220}
                  y2={y}
                  stroke={C.steel}
                  strokeWidth={7}
                  strokeLinecap="round"
                />
                <circle
                  cx={positions[row]}
                  cy={y}
                  r={15}
                  fill={[C.blue, C.green, C.gold, C.orange][row]}
                  stroke={C.ink}
                  strokeWidth={3}
                />
              </g>
            );
          })}
          <Axis x={15} y={235} />
          <path
            d="M24 217C58 212 72 186 94 153S143 107 198 104"
            fill="none"
            stroke={C.blue}
            strokeWidth={7}
            strokeLinecap="round"
          />
        </g>
        <text
          x={968}
          y={350}
          textAnchor="middle"
          fontFamily="var(--font-body)"
          fontSize={21}
          fill={C.inkSoft}
        >
          Nutrients and capacities
        </text>
      </ModelPanel>

      <BlockArrow x={1170} y={200} length={58} />

      <ModelPanel
        x={1192}
        fill={C.panelSlate}
        href="#phase-interactions"
        label="4. Test factor interactions"
      >
        <Title x={1362} y={58} size={TITLE}>
          4. Test interactions
        </Title>
        <g transform="translate(1253 100)">
          <rect
            x={0}
            y={0}
            width={218}
            height={218}
            rx={8}
            fill={C.white}
            stroke={C.ink}
            strokeWidth={3}
          />
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 5 }, (_, col) => {
              const colors = [
                C.bluePale,
                C.blueLight,
                C.greenLight,
                C.yellow,
                C.orange,
              ];
              return (
                <rect
                  key={`${row}-${col}`}
                  x={10 + col * 41}
                  y={10 + row * 41}
                  width={35}
                  height={35}
                  rx={4}
                  fill={colors[(row + col * 2) % colors.length]}
                />
              );
            }),
          )}
          <ThinArrow x1={-8} y1={224} x2={210} y2={224} width={4} />
          <ThinArrow x1={-8} y1={224} x2={-8} y2={8} width={4} />
        </g>
        <text
          x={1362}
          y={350}
          textAnchor="middle"
          fontFamily="var(--font-body)"
          fontSize={21}
          fill={C.inkSoft}
        >
          Pairwise phase landscapes
        </text>
      </ModelPanel>

      <BlockArrow x={1564} y={200} length={58} />

      <ModelPanel
        x={1586}
        fill={C.panelGreen}
        href="#growth-polyp-balance"
        label="5. Guide design decisions"
      >
        <Title x={1756} y={58} size={TITLE}>
          5. Guide decisions
        </Title>
        <g transform="translate(1646 116)">
          <Axis x={0} y={198} />
          <path
            d="M7 187C43 181 80 166 112 137S165 70 188 24"
            fill="none"
            stroke={C.blue}
            strokeWidth={7}
            strokeLinecap="round"
          />
          {[
            [24, 178],
            [61, 164],
            [98, 143],
            [132, 111],
            [165, 67],
          ].map(([cx, cy], index) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={10}
              fill={index === 3 ? C.gold : C.green}
              stroke={C.ink}
              strokeWidth={2.5}
            />
          ))}
          <ThinArrow
            x1={132}
            y1={102}
            x2={198}
            y2={72}
            width={5}
            color={C.orange}
          />
        </g>
        <text
          x={1756}
          y={350}
          textAnchor="middle"
          fontFamily="var(--font-body)"
          fontSize={21}
          fill={C.inkSoft}
        >
          Growth–PolyP trade-offs
        </text>
      </ModelPanel>
    </WorkflowFigure>
  );
}
