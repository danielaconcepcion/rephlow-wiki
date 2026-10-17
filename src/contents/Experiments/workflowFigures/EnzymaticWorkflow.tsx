import {
  BlockArrow,
  C,
  Panel,
  ThinArrow,
  Title,
  WorkflowFigure,
} from "./shared";

/* --------------------------------------------------------------------------
   Redraw of the team's six-step enzyme figure (1555 x 694), panel for
   panel, with its own titles and subtitles:

     1. Mining            a researcher at a screen, a sequence streaming off
                          it — "EnzymeMiner + BRENDA + UniProt"
     2. Cloning           a protein model, an insert going into a vector —
                          "3D modelling + vector choosing"
     3. Expression        a protein gel — "IPTG vs autoinduction +
                          solubility"
     4. Purification      four column steps over their eluates — "IMAC on
                          Ni-NTA column"
     5. Characterization  a plate, one well read out as a trace —
                          "activity + concentration"
     6. Immobilization    enzymes fixed covalently, ionically and by
                          cross-linking onto a porous bead — "covalent vs
                          ionic + cross-linking"

   Same connections: 1 → 2 → 3, down, 4 → 5 → 6. The titles keep the
   original's spelling. The sequence in panel 1 is drawn only as far as
   it can be read: the first two characters of the original are too
   small to make out and are left out rather than guessed.
   -------------------------------------------------------------------------- */

const TITLE = 34;
const SUB = 24;

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

/** A coiled helix between two points, as a ribbon model draws it. */
function coil(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  r: number,
  turns: number,
) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const steps = turns * 16;
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const a = t * turns * Math.PI * 2;
    const along = t * len + Math.cos(a) * r * 0.55;
    const across = Math.sin(a) * r;
    return `${(x0 + ux * along - uy * across).toFixed(1)},${(y0 + uy * along + ux * across).toFixed(1)}`;
  });
  return `M${pts.join(" L")}`;
}

/** A small ribbon-model protein: two coiled helices over a three-strand
 * sheet, in greens. */
function Ribbon({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      {/* the sheet: three broad strands, arrow-ended */}
      {[-14, -2, 10].map((dx, i) => (
        <path
          key={dx}
          d={`M${dx - 3},${30 - i * 2} L${dx + 7},${-14} L${dx + 3},${-14} L${dx + 9},${-24} L${dx + 13},${-12} L${dx + 9},${-12} L${dx + 1},${30 - i * 2} Z`}
          fill={C.green}
        />
      ))}
      {/* two helices crossing in front of it */}
      <path
        d={coil(-30, -16, 22, -26, 6, 4)}
        fill="none"
        stroke={C.greenMid}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d={coil(-22, 12, 30, 2, 6.5, 4)}
        fill="none"
        stroke={C.greenLight}
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      <path
        d="M-30,-16 C-40,-6 -36,10 -22,12"
        fill="none"
        stroke={C.greenMid}
        strokeWidth={2.5}
      />
    </g>
  );
}

const SEQUENCE = "GGAGTCAAATATCATGCGCAT";

export function EnzymaticWorkflow() {
  return (
    <WorkflowFigure
      viewBox="0 0 1555 694"
      label="Six-step workflow: mining, cloning, expression, purification, characterisation and immobilisation"
      caption="The six steps this block runs through, from mining the databases for candidate enzymes to fixing the purified panel onto the sphere."
    >
      {/* 1. Mining */}
      <Panel
        x={8}
        y={8}
        w={484}
        h={314}
        fill={C.panelGreen}
        section="enzyme-production"
        target="bioinformatic-mining"
        label="1. Mining"
      >
        <Title x={250} y={66} size={TITLE}>
          1. Mining
        </Title>
        {/* researcher at a screen */}
        <g fill={C.lavender}>
          <circle cx={140} cy={136} r={14} />
          <path d="M126,154 Q140,148 152,156 L162,196 H132 Z" />
          <path d="M148,164 Q170,168 182,174 L178,182 Q160,180 146,176 Z" />
          <path d="M132,196 H170 V204 H150 L156,234 H146 Z" />
        </g>
        <g fill={C.ink} fillOpacity={0.75}>
          <rect x={106} y={170} width={7} height={66} rx={3} />
          <rect x={106} y={196} width={40} height={7} rx={3} />
          <rect x={138} y={198} width={7} height={38} rx={3} />
          <rect x={150} y={178} width={70} height={8} rx={3} />
          <rect x={182} y={184} width={10} height={46} />
          <rect x={170} y={228} width={36} height={7} rx={3} />
          <path d="M184,176 L198,132 L203,134 L190,178 Z" />
        </g>
        {/* the sequence streaming off the screen, growing as it goes */}
        {SEQUENCE.split("").map((ch, i) => {
          const t = i / (SEQUENCE.length - 1);
          return (
            <text
              key={i}
              x={212 + t * 178 + t * t * 14}
              y={152 - t * 30 - t * t * 8}
              fontFamily="var(--font-display)"
              fontWeight={600}
              fontSize={8 + t * 12}
              fill={C.ink}
              fillOpacity={0.55 + t * 0.4}
              transform={`rotate(${-8 - t * 6} ${212 + t * 178} ${152 - t * 30})`}
            >
              {ch}
            </text>
          );
        })}
        <Subtitle x={250} y={290}>
          EnzymeMiner + BRENDA + UniProt
        </Subtitle>
      </Panel>

      {/* 2. Cloning */}
      <Panel
        x={530}
        y={8}
        w={485}
        h={314}
        fill={C.panelSlate}
        section="enzyme-production"
        target="structural-design"
        label="2. Cloning"
      >
        <Title x={772} y={66} size={TITLE}>
          2. Cloning
        </Title>
        <Ribbon x={668} y={170} s={1.7} />
        {/* the insert */}
        <path
          d="M746,136 Q770,124 794,140"
          fill="none"
          stroke={C.greenMid}
          strokeWidth={10}
          strokeLinecap="round"
        />
        {/* the cut vector below, the recombinant vector above */}
        <path
          d="M806,190 A32,32 0 1 0 830,190"
          fill="none"
          stroke={C.ink}
          strokeWidth={3.5}
        />
        <path
          d="M816,210 C814,184 826,158 850,150"
          fill="none"
          stroke={C.ink}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <path d="M846,138 L866,148 L848,162 Z" fill={C.ink} />
        <circle
          cx={904}
          cy={137}
          r={32}
          fill="none"
          stroke={C.ink}
          strokeWidth={3.5}
        />
        <path
          d="M884,113 A32,32 0 0 1 924,113"
          fill="none"
          stroke={C.greenMid}
          strokeWidth={6}
        />
        <Subtitle x={772} y={290}>
          3D modelling + vector choosing
        </Subtitle>
      </Panel>

      {/* 3. Expression */}
      <Panel
        x={1061}
        y={8}
        w={483}
        h={314}
        fill={C.panelGreen}
        section="enzyme-production"
        target="recombinant-expression"
        label="3. Expression"
      >
        <Title x={1302} y={66} size={TITLE}>
          3. Expression
        </Title>
        {/* gel with six wells, and its side face */}
        <path d="M1376,112 L1386,106 V230 L1376,238 Z" fill={C.steelDark} />
        <path
          d="M1226,112 H1236 V120 H1248 V112 H1262 V120 H1274 V112 H1288 V120 H1300 V112 H1314 V120 H1326 V112 H1340 V120 H1352 V112 H1376 V238 H1226 Z"
          fill={C.steelLight}
        />
        {[
          [1236, [130, 186, 202, 224]],
          [1262, [130, 186, 192, 216, 220]],
          [1288, [140, 184, 202, 216, 230]],
          [1314, [128, 152, 224]],
          [1340, [150, 168, 200, 204, 228]],
        ].map(([x, ys]) =>
          (ys as number[]).map((y) => (
            <rect
              key={`${x}-${y}`}
              x={(x as number) + 2}
              y={y}
              width={18}
              height={3.5}
              rx={1.5}
              fill={C.ink}
              fillOpacity={0.75}
            />
          )),
        )}
        <Subtitle x={1302} y={290}>
          IPTG vs autoinduction + solubility
        </Subtitle>
      </Panel>

      {/* 4. Purification */}
      <Panel
        x={1063}
        y={369}
        w={483}
        h={313}
        fill={C.panelSlate}
        section="enzyme-production"
        target="imac-purification"
        label="4. Purification"
      >
        <Title x={1304} y={428} size={TITLE}>
          4. Purification
        </Title>
        <g transform="translate(0 6)">
          {[
            { x: 1176, beads: [] as string[], out: C.blueLight, tube: false },
            {
              x: 1248,
              beads: [C.greenMid, C.gold],
              out: C.yellow,
              tube: false,
            },
            { x: 1326, beads: [C.orange], out: C.blueLight, tube: false },
            { x: 1404, beads: ["#c2557f"], out: "#e7b9cc", tube: true },
          ].map(({ x, beads, out, tube }) => (
            <g key={x}>
              {/* pipette, dripping in */}
              <line
                x1={x + 22}
                y1={452}
                x2={x + 6}
                y2={476}
                stroke={C.white}
                strokeWidth={3.2}
                strokeLinecap="round"
              />
              <ellipse
                cx={x + 24}
                cy={449}
                rx={3.6}
                ry={5}
                fill={C.ink}
                transform={`rotate(34 ${x + 24} ${449})`}
              />
              <circle cx={x + 4} cy={481} r={1.8} fill={C.blueMid} />
              {/* the column */}
              <rect
                x={x - 6}
                y={484}
                width={12}
                height={8}
                rx={2}
                fill={C.white}
              />
              <rect
                x={x - 4}
                y={492}
                width={8}
                height={46}
                fill={C.white}
                stroke={C.steelDark}
                strokeWidth={1}
              />
              <rect
                x={x - 3}
                y={516}
                width={6}
                height={20}
                fill={beads[0] ?? C.blueLight}
              />
              {beads[1] && (
                <rect x={x - 3} y={516} width={6} height={8} fill={beads[1]} />
              )}
              <path
                d={`M${x + 4},${514} h6 v22 h-6`}
                fill="none"
                stroke={C.ink}
                strokeWidth={1.4}
              />
              {/* drops of eluate */}
              <circle cx={x} cy={546} r={1.8} fill={out} />
              <circle cx={x} cy={556} r={1.8} fill={out} />
              {/* what comes out */}
              {tube ? (
                <g>
                  <rect
                    x={x - 4}
                    y={562}
                    width={8}
                    height={40}
                    rx={4}
                    fill={C.white}
                  />
                  {[570, 580, 590].map((y) => (
                    <circle key={y} cx={x} cy={y} r={1.8} fill={beads[0]} />
                  ))}
                </g>
              ) : (
                <g>
                  <path
                    d={`M${x - 12},${572} V${598} a3,3 0 0 0 3,3 H${x + 9} a3,3 0 0 0 3,-3 V${572}`}
                    fill={C.white}
                  />
                  <rect
                    x={x - 11}
                    y={582}
                    width={22}
                    height={18}
                    rx={2}
                    fill={out}
                  />
                </g>
              )}
              {/* the bead under the lens */}
              {beads.length > 0 && (
                <g>
                  <circle
                    cx={x + 16}
                    cy={552}
                    r={10}
                    fill={C.white}
                    stroke={C.steelLight}
                    strokeWidth={1}
                  />
                  {beads.map((b, i) => (
                    <g key={b}>
                      <circle cx={x + 12 + i * 6} cy={549} r={2.6} fill={b} />
                      <circle cx={x + 18 - i * 4} cy={556} r={2.6} fill={b} />
                    </g>
                  ))}
                </g>
              )}
            </g>
          ))}
          {[1194, 1268, 1346].map((x) => (
            <ThinArrow
              key={x}
              x1={x}
              y1={507}
              x2={x + 42}
              y2={507}
              width={1.4}
            />
          ))}
        </g>
        <Subtitle x={1304} y={650}>
          IMAC on Ni-NTA column
        </Subtitle>
      </Panel>

      {/* 5. Characterization */}
      <Panel
        x={533}
        y={369}
        w={485}
        h={313}
        fill={C.panelGreen}
        section="enzyme-production"
        target="functional-characterisation"
        label="5. Characterization"
      >
        <Title x={776} y={428} size={TITLE}>
          5. Characterization
        </Title>
        {/* the plate, in perspective */}
        <path
          d="M596,546 L686,494 L764,532 L676,588 Z"
          fill={C.bluePale}
          stroke={C.blueMid}
          strokeWidth={2}
        />
        <path
          d="M596,546 L676,588 L764,532 V542 L676,598 L596,556 Z"
          fill={C.blueLight}
          fillOpacity={0.6}
          stroke={C.blueMid}
          strokeWidth={1.5}
        />
        {Array.from({ length: 6 }, (_, c) =>
          Array.from({ length: 4 }, (_, r) => (
            <ellipse
              key={`${c}-${r}`}
              cx={614 + c * 14.5 + r * 15}
              cy={540 - c * 7.5 + r * 8.2}
              rx={6}
              ry={3.6}
              fill={C.white}
              stroke={C.blueMid}
              strokeWidth={1.2}
            />
          )),
        )}
        {/* one well, read out */}
        <rect
          x={700}
          y={514}
          width={20}
          height={20}
          fill="none"
          stroke={C.blue}
          strokeWidth={2.5}
        />
        <path
          d="M720,514 L806,462 V604 L720,534 Z"
          fill={C.blue}
          fillOpacity={0.22}
        />
        <rect
          x={806}
          y={462}
          width={146}
          height={142}
          fill="#f3f8ee"
          stroke={C.blue}
          strokeWidth={2.5}
        />
        <path
          d="M824,476 V588 H938"
          fill="none"
          stroke={C.ink}
          strokeWidth={4}
        />
        <path
          d="M826,546 C838,520 844,520 852,536 C860,552 866,520 874,520 C884,520 884,560 894,560 C906,560 904,480 914,480 C924,482 922,556 932,548"
          fill="none"
          stroke={C.greenMid}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <Subtitle x={776} y={650}>
          activity + concentration
        </Subtitle>
      </Panel>

      {/* 6. Immobilization */}
      <Panel
        x={8}
        y={369}
        w={484}
        h={313}
        fill={C.panelSlate}
        section="immobilisation-chemistry"
        target="lecitase-characterisation"
        label="6. Immobilization"
      >
        <Title x={250} y={428} size={TITLE}>
          6. Immobilization
        </Title>
        {/* porous support bead */}
        <circle
          cx={250}
          cy={540}
          r={62}
          fill="#eef0f4"
          stroke="#d6dae2"
          strokeWidth={2}
        />
        {[
          [222, 500, 4],
          [244, 494, 3],
          [268, 502, 4],
          [286, 520, 3],
          [210, 524, 3],
          [236, 516, 3],
          [262, 524, 4],
          [292, 548, 3],
          [214, 552, 4],
          [240, 540, 3],
          [270, 554, 3],
          [230, 570, 3],
          [282, 574, 3],
          [202, 578, 3],
          [256, 506, 2.5],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={C.steelLight} />
        ))}
        {/* covalent: tethered by a bond */}
        <Ribbon x={170} y={492} s={0.9} />
        <line
          x1={190}
          y1={500}
          x2={206}
          y2={508}
          stroke={C.steelDark}
          strokeWidth={3}
        />
        {/* ionic: held by charge */}
        <Ribbon x={330} y={494} s={0.9} />
        <circle
          cx={314}
          cy={480}
          r={6}
          fill={C.white}
          stroke={C.ink}
          strokeWidth={1.5}
        />
        <line
          x1={311}
          y1={480}
          x2={317}
          y2={480}
          stroke={C.ink}
          strokeWidth={1.5}
        />
        <circle
          cx={300}
          cy={508}
          r={6}
          fill={C.white}
          stroke={C.ink}
          strokeWidth={1.5}
        />
        <path d="M297,508 h6 M300,505 v6" stroke={C.ink} strokeWidth={1.5} />
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1={308}
            y1={496 + i * 5}
            x2={316}
            y2={492 + i * 6}
            stroke={C.ink}
            strokeOpacity={0.5}
            strokeWidth={1.2}
          />
        ))}
        {/* cross-linked: held in a mesh */}
        <path
          d="M220,566 q10,-14 22,-4 q12,10 20,-6 q10,-12 22,2 M226,580 q12,-10 24,0 q10,8 24,-4"
          fill="none"
          stroke={C.steelDark}
          strokeWidth={1.8}
        />
        <Ribbon x={232} y={576} s={0.9} />
        <Ribbon x={282} y={576} s={0.9} />
        {/* the change of strategy */}
        <path
          d="M350,524 C362,550 352,580 324,588"
          fill="none"
          stroke={C.ink}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <path d="M332,580 L318,590 L334,596 Z" fill={C.ink} />
        <Subtitle x={250} y={650}>
          covalent vs ionic + cross-linking
        </Subtitle>
      </Panel>

      {/* Arrows on top, as in the original, overlapping the panel edges. */}
      <BlockArrow x={511} y={165} />
      <BlockArrow x={1038} y={165} />
      <BlockArrow x={1302} y={345} angle={90} />
      <BlockArrow x={1040} y={528} angle={180} />
      <BlockArrow x={512} y={528} angle={180} />
    </WorkflowFigure>
  );
}
