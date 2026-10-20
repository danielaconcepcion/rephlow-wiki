import type { ReactNode } from "react";
import {
  BlockArrow,
  C,
  Title,
  WorkflowFigure,
} from "../Experiments/workflowFigures/shared";
import { Bacterium, Flask } from "../Experiments/workflowFigures/parts";

const W = 340;
const H = 330;
const TITLE = 25;

function Panel({
  x,
  y,
  fill,
  href,
  label,
  children,
}: {
  x: number;
  y: number;
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
        y={y}
        width={W}
        height={H}
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
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="var(--font-body)"
      fontSize={19}
      fill={C.inkSoft}
    >
      {children}
    </text>
  );
}

function Laptop({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={230} height={158} rx={12} fill={C.ink} />
      <rect
        x={x + 13}
        y={y + 13}
        width={204}
        height={132}
        rx={5}
        fill={C.white}
      />
      <path
        d={`M${x + 70} ${y + 158}H${x + 160}L${x + 174} ${y + 184}H${x + 56}Z`}
        fill={C.steelDark}
      />
      <rect
        x={x + 42}
        y={y + 181}
        width={146}
        height={10}
        rx={5}
        fill={C.ink}
      />
    </g>
  );
}

function PolyP({ x, y, count = 5 }: { x: number; y: number; count?: number }) {
  return (
    <g>
      {Array.from({ length: count - 1 }, (_, i) => (
        <line
          key={`l${i}`}
          x1={x + i * 22}
          y1={y}
          x2={x + (i + 1) * 22}
          y2={y}
          stroke={C.gold}
          strokeWidth={8}
        />
      ))}
      {Array.from({ length: count }, (_, i) => (
        <g key={i}>
          <circle
            cx={x + i * 22}
            cy={y}
            r={12}
            fill={C.gold}
            stroke={C.ink}
            strokeWidth={2}
          />
          <text
            x={x + i * 22}
            y={y + 5}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight={700}
            fontSize={13}
            fill={C.white}
          >
            P
          </text>
        </g>
      ))}
    </g>
  );
}

export function ModelWorkflow() {
  return (
    <WorkflowFigure
      viewBox="0 0 1540 720"
      label="Complete seven-stage modelling workflow, from genome-scale reconstruction through flux analysis and network reduction to kinetic simulations, sensitivity analysis and experimental design"
      caption="The complete modelling workflow, connecting genome-scale metabolic capacity with a reduced kinetic description and the experimental measurements needed for the next DBTL iteration. Select a stage to open its analysis."
    >
      <Panel
        x={10}
        y={10}
        fill={C.panelGreen}
        href="#metabolic-network"
        label="1. Genome-scale reconstruction"
      >
        <Title x={180} y={57} size={TITLE}>
          1. Genome-scale model
        </Title>
        <Bacterium
          x={178}
          y={175}
          len={185}
          wid={104}
          rot={-8}
          stroke={C.green}
          fill={C.greenLight}
          dna={C.green}
          flagella={14}
          flagellaLen={18}
        />
        <g fill={C.blue} stroke={C.ink} strokeWidth={2.2}>
          <circle cx={90} cy={93} r={13} />
          <circle cx={134} cy={83} r={11} />
          <circle cx={230} cy={88} r={13} />
          <circle cx={273} cy={112} r={11} />
        </g>
        <PolyP x={132} y={183} count={5} />
        <Subtitle x={180} y={307}>
          iJN1463 reconstruction
        </Subtitle>
      </Panel>
      <BlockArrow x={382} y={175} length={58} />

      <Panel
        x={404}
        y={10}
        fill={C.panelBlue}
        href="#phase-b-sensitivity"
        label="2. Constraint-based analysis"
      >
        <Title x={574} y={57} size={TITLE}>
          2. FBA and pFBA
        </Title>
        <Laptop x={459} y={79} />
        <path
          d="M482 210C512 193 526 166 550 149S605 109 662 104V219H482Z"
          fill={C.blueLight}
          opacity={0.88}
        />
        <path
          d="M482 124C520 137 540 156 565 173S616 207 662 214V219H482Z"
          fill={C.greenLight}
          opacity={0.9}
        />
        <circle
          cx={566}
          cy={173}
          r={13}
          fill={C.gold}
          stroke={C.ink}
          strokeWidth={3}
        />
        <Subtitle x={574} y={307}>
          Feasible metabolic states
        </Subtitle>
      </Panel>
      <BlockArrow x={776} y={175} length={58} />

      <Panel
        x={798}
        y={10}
        fill={C.panelGreen}
        href="#growth-polyp-balance"
        label="3. Environmental and phenotype landscapes"
      >
        <Title x={968} y={57} size={TITLE}>
          3. Explore constraints
        </Title>
        <Flask
          x={875}
          top={91}
          w={88}
          h={150}
          liquid={C.blueLight}
          level={0.42}
        />
        <Flask
          x={968}
          top={78}
          w={102}
          h={165}
          liquid={C.greenLight}
          level={0.58}
        />
        <Flask
          x={1064}
          top={97}
          w={84}
          h={145}
          liquid={C.yellow}
          level={0.72}
        />
        <g transform="translate(851 250)">
          {[38, 72, 118, 178].map((height, index) => (
            <rect
              key={height}
              x={index * 54}
              y={38 - height * 0.19}
              width={36}
              height={height * 0.19}
              rx={4}
              fill={[C.blue, C.green, C.gold, C.orange][index]}
            />
          ))}
        </g>
        <Subtitle x={968} y={307}>
          Environment and growth–PolyP balance
        </Subtitle>
      </Panel>
      <BlockArrow x={1170} y={175} length={58} />

      <Panel
        x={1192}
        y={10}
        fill={C.panelSlate}
        href="#model-reduction"
        label="4. Reduce the active network"
      >
        <Title x={1362} y={57} size={TITLE}>
          4. Reduce the network
        </Title>
        <g transform="translate(1237 87)">
          {[
            [0, 24],
            [0, 76],
            [0, 128],
            [62, 50],
            [62, 104],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={13}
              fill={C.blueLight}
              stroke={C.ink}
              strokeWidth={2.5}
            />
          ))}
          <path
            d="M20 18H82L112 67L82 116H20L49 67Z"
            fill={C.white}
            stroke={C.ink}
            strokeWidth={3}
          />
          <path
            d="M126 67H168"
            stroke={C.ink}
            strokeWidth={10}
            strokeLinecap="round"
          />
          <path d="M168 47L205 67L168 87Z" fill={C.ink} />
          <rect
            x={218}
            y={15}
            width={74}
            height={104}
            rx={20}
            fill={C.blue}
            opacity={0.86}
          />
          <rect x={230} y={30} width={50} height={14} rx={7} fill={C.white} />
          <rect
            x={230}
            y={59}
            width={50}
            height={14}
            rx={7}
            fill={C.greenLight}
          />
          <rect x={230} y={88} width={50} height={14} rx={7} fill={C.yellow} />
        </g>
        <Subtitle x={1362} y={281}>
          pFBA → 45 reactions → lumping
        </Subtitle>
        <Subtitle x={1362} y={307}>
          Functional core model
        </Subtitle>
      </Panel>
      <BlockArrow x={1362} y={366} angle={90} length={58} />

      <Panel
        x={1192}
        y={390}
        fill={C.panelBlue}
        href="#kinetic-model"
        label="5. Build the kinetic model"
      >
        <Title x={1362} y={437} size={TITLE}>
          5. Build kinetics
        </Title>
        <g>
          <rect
            x={1241}
            y={462}
            width={242}
            height={150}
            rx={12}
            fill={C.white}
            stroke={C.ink}
            strokeWidth={3}
          />
          <text
            x={1362}
            y={505}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontSize={25}
            fontStyle="italic"
            fill={C.ink}
          >
            dx/dt = Nv(x,p)
          </text>
          <path
            d="M1270 542H1454"
            stroke={C.blueMid}
            strokeWidth={9}
            strokeLinecap="round"
          />
          <path
            d="M1270 572H1408"
            stroke={C.greenMid}
            strokeWidth={9}
            strokeLinecap="round"
          />
          <circle
            cx={1452}
            cy={572}
            r={20}
            fill={C.gold}
            stroke={C.ink}
            strokeWidth={3}
          />
          <text
            x={1452}
            y={579}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight={700}
            fontSize={18}
            fill={C.white}
          >
            P
          </text>
        </g>
        <Subtitle x={1362} y={687}>
          Rate laws and COPASI model
        </Subtitle>
      </Panel>
      <BlockArrow x={1170} y={555} angle={180} length={58} />

      <Panel
        x={798}
        y={390}
        fill={C.panelGreen}
        href="#kinetic-results"
        label="6. Simulate dynamics and sensitivity"
      >
        <Title x={968} y={437} size={TITLE}>
          6. Simulate and test
        </Title>
        <g>
          <rect
            x={840}
            y={463}
            width={256}
            height={164}
            rx={10}
            fill={C.white}
            stroke={C.ink}
            strokeWidth={3}
          />
          <path
            d="M858 597C890 583 902 544 928 521S979 486 1022 493S1061 540 1078 557"
            fill="none"
            stroke={C.blue}
            strokeWidth={7}
            strokeLinecap="round"
          />
          <path
            d="M858 486C895 500 916 535 944 552S1010 579 1078 585"
            fill="none"
            stroke={C.green}
            strokeWidth={7}
            strokeLinecap="round"
          />
          <path
            d="M858 606C894 605 918 592 947 566S1019 514 1078 510"
            fill="none"
            stroke={C.gold}
            strokeWidth={7}
            strokeLinecap="round"
          />
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={858 + col * 22}
                y={642 + row * 11}
                width={18}
                height={8}
                rx={2}
                fill={
                  [C.blue, C.blueLight, C.white, C.yellow, C.orange][
                    (row + col) % 5
                  ]
                }
              />
            )),
          )}
        </g>
        <Subtitle x={968} y={687}>
          Time courses and parameter sensitivity
        </Subtitle>
      </Panel>
      <BlockArrow x={776} y={555} angle={180} length={58} />

      <Panel
        x={404}
        y={390}
        fill={C.panelSlate}
        href="#kinetic-outlook"
        label="7. Guide the next experimental iteration"
      >
        <Title x={574} y={437} size={TITLE}>
          7. Guide experiments
        </Title>
        <Bacterium
          x={526}
          y={535}
          len={126}
          wid={72}
          rot={-10}
          stroke={C.green}
          fill={C.greenLight}
          dna={C.green}
          flagella={11}
          flagellaLen={14}
        />
        <PolyP x={485} y={541} count={4} />
        <g transform="translate(619 470)">
          <rect
            x={0}
            y={0}
            width={92}
            height={142}
            rx={9}
            fill={C.white}
            stroke={C.ink}
            strokeWidth={3}
          />
          <rect
            x={23}
            y={-8}
            width={46}
            height={18}
            rx={7}
            fill={C.steelDark}
          />
          <path
            d="M18 43l14 14 27-31"
            fill="none"
            stroke={C.green}
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x={18} y={79} width={56} height={8} rx={4} fill={C.blueMid} />
          <rect x={18} y={101} width={47} height={8} rx={4} fill={C.greenMid} />
          <rect x={18} y={123} width={62} height={8} rx={4} fill={C.gold} />
        </g>
        <Subtitle x={574} y={687}>
          Prioritise measurements for DBTL
        </Subtitle>
      </Panel>
    </WorkflowFigure>
  );
}
