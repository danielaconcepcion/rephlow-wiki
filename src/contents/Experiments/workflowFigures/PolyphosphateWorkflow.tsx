import {
  BlockArrow,
  C,
  Panel,
  Title,
  TitleLines,
  WorkflowFigure,
} from "./shared";
import { Bacterium, Flask, Plot, Tube } from "./parts";

/* --------------------------------------------------------------------------
   Redraw of the polyphosphate-accumulation figure (2146 x 733), panel for
   panel:

     1. Assay standardisation        a bacterium, a curved arrow into a
                                     microtube of cells, and a magnified
                                     polyphosphate chain
     2. Growth characterisation      two growth curves with a bacterium
        in M9                        keyed to each
     3. Accumulation kinetics        three accumulation curves with a flask
        across media                 keyed to each
     4. Operating-condition          a bar chart peaking over a pH strip,
        optimisation (pH and         and three flasks over a dilution wedge
        dilution)

   One row, left to right, with the originals' block arrows between the
   panels. Stage 1 standardises the assay rather than being an experiment
   of its own, so its panel opens the sub-block without a folder; the
   other three open their experiment in order.
   -------------------------------------------------------------------------- */

const TITLE = 34;
const SECTION = "polyphosphate-accumulation-study";

/** The seven-step pH scale the fourth panel prints under its bars. */
const PH_STRIP = [
  "#dc4b3c",
  "#f08a42",
  "#f8c558",
  "#cadf79",
  "#6ec4a3",
  "#4a90d9",
  "#5a52cf",
];

/** One legend key: a short rule with a dot at its centre. */
function Key({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g>
      <line
        x1={x}
        y1={y}
        x2={x + 76}
        y2={y}
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <circle cx={x + 38} cy={y} r={8} fill={color} />
    </g>
  );
}

export function PolyphosphateWorkflow() {
  return (
    <WorkflowFigure
      viewBox="0 0 2149 497"
      label="Four-stage workflow: assay standardisation, growth characterisation in M9, accumulation kinetics across media, and operating-condition optimisation"
      caption="The four stages of the accumulation study, from standardising the intracellular-phosphorus assay to optimising pH and dilution in the synthetic stream."
    >
      {/* 1. Assay standardisation */}
      <Panel
        x={20}
        y={8}
        w={515}
        h={481}
        fill={C.panelGreen}
        section={SECTION}
        label="1. Assay standardisation"
      >
        <Title x={277} y={70} size={TITLE}>
          1. Assay standardisation
        </Title>
        <Bacterium
          x={124}
          y={274}
          len={152}
          wid={86}
          rot={-74}
          stroke={C.green}
          fill={C.panelGreen}
          dna={C.green}
          flagella={14}
        />
        {/* the curved arrow from the cells to the tube */}
        <path
          d="M180,300 Q210,266 236,272"
          fill="none"
          stroke={C.ink}
          strokeWidth={9}
          strokeLinecap="round"
        />
        <path d="M252,274 L228,260 L230,288 Z" fill={C.ink} />
        <Tube x={278} top={205} w={64} h={200} liquid={C.blueLight} level={0.5}>
          {[
            [268, 350],
            [286, 368],
            [272, 386],
          ].map(([cx, cy]) => (
            <ellipse
              key={cx}
              cx={cx}
              cy={cy}
              rx={11}
              ry={8}
              fill={C.greenLight}
              stroke={C.green}
              strokeWidth={2}
              transform={`rotate(-24 ${cx} ${cy})`}
            />
          ))}
        </Tube>
        {/* the magnifier's sight lines and the zoom itself */}
        <circle
          cx={306}
          cy={316}
          r={6}
          fill={C.white}
          stroke={C.ink}
          strokeWidth={2.5}
        />
        <g stroke={C.ink} strokeWidth={2} strokeDasharray="8 7">
          <line x1={310} y1={312} x2={352} y2={212} />
          <line x1={310} y1={322} x2={356} y2={334} />
        </g>
        <circle
          cx={417}
          cy={270}
          r={78}
          fill={C.white}
          stroke={C.ink}
          strokeWidth={4}
        />
        {/* the polyphosphate chain, five phosphates long */}
        <g stroke={C.blue} strokeWidth={9} strokeLinecap="round">
          <line x1={385} y1={315} x2={382} y2={282} />
          <line x1={382} y1={282} x2={412} y2={282} />
          <line x1={412} y1={282} x2={440} y2={260} />
          <line x1={440} y1={260} x2={457} y2={227} />
        </g>
        {[
          [385, 315],
          [382, 282],
          [412, 282],
          [440, 260],
          [457, 227],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={21} fill={C.blue} />
            <text
              x={cx}
              y={cy + 8}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontWeight={700}
              fontSize={22}
              fill={C.white}
            >
              P
            </text>
          </g>
        ))}
      </Panel>

      {/* 2. Growth characterisation in M9 */}
      <Panel
        x={563}
        y={8}
        w={498}
        h={481}
        fill={C.panelSlate}
        section={SECTION}
        target="growth-characterisation-m9"
        label="2. Growth characterisation in M9"
      >
        <TitleLines
          x={812}
          y={70}
          size={TITLE}
          lines={["2. Growth characterisation", "in M9"]}
        />
        <Plot
          ox={625}
          oy={400}
          w={300}
          h={230}
          series={[
            {
              color: C.green,
              pts: [
                [650, 330],
                [680, 262],
                [715, 222],
                [755, 198],
                [800, 188],
                [850, 182],
                [900, 180],
              ],
            },
            {
              color: C.orange,
              pts: [
                [655, 375],
                [690, 340],
                [730, 305],
                [775, 288],
                [820, 280],
                [865, 276],
                [905, 274],
              ],
            },
          ]}
        />
        <Bacterium
          x={968}
          y={215}
          len={66}
          wid={34}
          rot={-18}
          stroke={C.green}
          fill={C.greenLight}
          dna={C.green}
          flagella={9}
          flagellaLen={11}
        />
        <Key x={930} y={262} color={C.green} />
        <Bacterium
          x={968}
          y={302}
          len={66}
          wid={34}
          rot={-18}
          stroke={C.orange}
          fill="#f6c7b8"
          dna={C.orange}
          flagella={9}
          flagellaLen={11}
        />
        <Key x={930} y={348} color={C.orange} />
      </Panel>

      {/* 3. Accumulation kinetics across media */}
      <Panel
        x={1088}
        y={8}
        w={499}
        h={481}
        fill={C.panelGreen}
        section={SECTION}
        target="polyphosphate-kinetics-media"
        label="3. Accumulation kinetics across media"
      >
        <TitleLines
          x={1338}
          y={70}
          size={TITLE}
          lines={["3. Accumulation kinetics", "across media"]}
        />
        <Plot
          ox={1150}
          oy={400}
          w={290}
          h={230}
          series={[
            {
              color: C.blue,
              pts: [
                [1172, 320],
                [1200, 262],
                [1235, 226],
                [1278, 206],
                [1320, 196],
                [1365, 192],
                [1405, 190],
              ],
            },
            {
              color: C.orange,
              pts: [
                [1175, 358],
                [1205, 320],
                [1242, 292],
                [1285, 278],
                [1330, 272],
                [1370, 270],
                [1408, 268],
              ],
            },
            {
              color: C.steelDark,
              pts: [
                [1178, 378],
                [1210, 352],
                [1248, 338],
                [1292, 330],
                [1335, 326],
                [1372, 324],
                [1408, 322],
              ],
            },
          ]}
        />
        <Flask
          x={1458}
          top={140}
          w={70}
          h={82}
          liquid={C.blueLight}
          level={0.52}
        />
        <Key x={1496} y={186} color={C.blue} />
        <Flask x={1458} top={234} w={70} h={82} liquid="#f3c49c" level={0.52} />
        <Key x={1496} y={280} color={C.orange} />
        <Flask
          x={1458}
          top={328}
          w={70}
          h={82}
          liquid={C.steelLight}
          level={0.52}
        />
        <Key x={1496} y={374} color={C.steelDark} />
      </Panel>

      {/* 4. Operating-condition optimisation (pH and dilution) */}
      <Panel
        x={1614}
        y={8}
        w={515}
        h={481}
        fill={C.panelSlate}
        section={SECTION}
        target="operating-condition-optimisation"
        label="4. Operating-condition optimisation (pH and dilution)"
      >
        <TitleLines
          x={1871}
          y={70}
          size={TITLE}
          lines={["4. Operating-condition", "optimisation (pH and dilution)"]}
        />
        {/* the optimum, as a dashed arc over four bars */}
        <path
          d="M1668,266 Q1764,166 1836,266"
          fill="none"
          stroke={C.ink}
          strokeWidth={3}
          strokeDasharray="14 10"
        />
        {[
          [1700, 250],
          [1728, 229],
          [1756, 212],
          [1784, 236],
        ].map(([bx, by], i) => (
          <rect
            key={bx}
            x={bx}
            y={by}
            width={24}
            height={300 - by}
            fill={i === 2 ? C.greenMid : C.greenLight}
            stroke={C.green}
            strokeWidth={2.5}
          />
        ))}
        <circle
          cx={1768}
          cy={208}
          r={12}
          fill={C.yellow}
          stroke={C.gold}
          strokeWidth={3}
        />
        <line
          x1={1660}
          y1={300}
          x2={1838}
          y2={300}
          stroke={C.ink}
          strokeWidth={4}
          strokeLinecap="round"
        />
        {PH_STRIP.map((color, i) => (
          <rect
            key={color}
            x={1652 + i * 28}
            y={318}
            width={28}
            height={38}
            fill={color}
            stroke={C.ink}
            strokeWidth={2}
          />
        ))}
        <Title x={1750} y={398} size={34}>
          pH
        </Title>
        {[
          [1930, C.blue],
          [2008, C.blueMid],
          [2086, C.blueLight],
        ].map(([fx, liquid]) => (
          <Flask
            key={fx as number}
            x={fx as number}
            top={186}
            w={74}
            h={110}
            liquid={liquid as string}
            level={0.5}
          />
        ))}
        {/* the dilution wedge */}
        <path
          d="M1890,330 L2110,372 L1890,372 Z"
          fill={C.blueLight}
          stroke={C.blueMid}
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </Panel>

      <BlockArrow x={549} y={248} length={70} />
      <BlockArrow x={1074} y={248} length={70} />
      <BlockArrow x={1600} y={248} length={70} />
    </WorkflowFigure>
  );
}
