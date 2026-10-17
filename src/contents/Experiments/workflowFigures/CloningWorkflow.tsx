import {
  BlockArrow,
  C,
  Panel,
  ThinArrow,
  Title,
  TitleLines,
  WorkflowFigure,
} from "./shared";
import {
  Bacterium,
  Brace,
  Chromatogram,
  Dna,
  Monitor,
  Part,
  Petri,
  Plasmid,
  Tube,
} from "./parts";

/* --------------------------------------------------------------------------
   Redraw of the cloning figure (1672 x 941), panel for panel:

     1. In silico design of         a monitor showing a plasmid map and the
        the expression cassettes    two cassettes drawn as parts
     2. Part acquisition            a tube and three amplified fragments,
        and amplification           with their primers
     3. Preparative digestion       a plasmid cut by two pairs of scissors,
        of the vectors and inserts  and the fragments it releases
     4. Ligation                    two cut arcs closing into one plasmid
     5. Transformation into         the plasmid entering E. coli, over a
        the E. coli cloning host    plate of transformants
     6. Colony screening and        a colony picked off a plate, and the
        diagnostic verification     diagnostic gel it is checked on
     7. Sequence confirmation       a sequencing chromatogram
     8. Transformation into         the verified plasmid entering
        P. putida KT2440            P. putida

   Same serpentine as the original: 1 → 5 along the top, down, then
   6 → 8 leftwards. Each panel opens its own experiment, in order.
   -------------------------------------------------------------------------- */

const TITLE = 24;
const SECTION = "cloning";

/** An open pair of scissors, as the digestion panel marks its cut sites. */
function Scissors({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rot})`}
      stroke={C.ink}
      strokeWidth={4}
      fill="none"
      strokeLinecap="round"
    >
      <line x1={-18} y1={-20} x2={14} y2={16} />
      <line x1={18} y1={-20} x2={-14} y2={16} />
      <circle cx={-18} cy={24} r={9} />
      <circle cx={18} cy={24} r={9} />
    </g>
  );
}

/** A promoter, drawn as the bent arrow the originals put over a cassette. */
function Promoter({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g stroke={color} strokeWidth={5} fill="none" strokeLinejoin="round">
      <path d={`M${x},${y + 26} V${y} H${x + 20}`} />
      <path
        d={`M${x + 30},${y} L${x + 16},${y - 8} L${x + 16},${y + 8} Z`}
        fill={color}
      />
    </g>
  );
}

/** A terminator: the small barbell the originals cap a cassette with. */
function Terminator({ x, y }: { x: number; y: number }) {
  return (
    <g fill={C.steelDark}>
      <rect x={x - 14} y={y - 2.5} width={28} height={5} rx={2} />
      <rect x={x - 5} y={y - 12} width={10} height={24} rx={2} />
    </g>
  );
}

/** A diagnostic agarose gel: a ladder and four loaded lanes. */
function Gel({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const lane = w / 5.6;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill="#2a2e35" />
      {[0.16, 0.24, 0.32, 0.4, 0.5, 0.62, 0.74].map((t) => (
        <rect
          key={t}
          x={x + lane * 0.3}
          y={y + h * t}
          width={lane * 0.62}
          height={5}
          rx={2}
          fill={C.white}
          fillOpacity={0.85}
        />
      ))}
      {[0.6, 0.46, 0.64, 0.5].map((t, i) => (
        <rect
          key={i}
          x={x + lane * (1.4 + i)}
          y={y + h * t}
          width={lane * 0.74}
          height={9}
          rx={2}
          fill={C.white}
          fillOpacity={0.92}
        />
      ))}
    </g>
  );
}

export function CloningWorkflow() {
  return (
    <WorkflowFigure
      viewBox="0 0 1672 822"
      label="Eight-stage cloning workflow: in silico design, part acquisition, digestion, ligation, transformation into E. coli, colony screening, sequence confirmation and transformation into P. putida"
      caption="The eight stages of the cloning route: each construct is designed, assembled and verified in E. coli before it is moved into P. putida KT2440."
    >
      {/* 1. In silico design of the expression cassettes */}
      <Panel
        x={26}
        y={13}
        w={370}
        h={380}
        fill={C.panelGreen}
        section={SECTION}
        target="cloning-design"
        label="1. In silico design of the expression cassettes"
      >
        <TitleLines
          x={211}
          y={55}
          size={TITLE}
          lines={["1. In silico design of", "the expression cassettes"]}
        />
        <Monitor x={45} y={128} w={332} h={194}>
          <rect x={55} y={138} width={312} height={174} fill="#eef4fb" />
          <Plasmid
            x={125}
            y={218}
            r={48}
            w={13}
            segments={[
              { from: -58, to: -8, color: C.greenMid },
              { from: -2, to: 52, color: "#f0832f" },
              { from: 56, to: 100, color: "#e03b2c" },
              { from: 104, to: 130, color: C.blueMid },
            ]}
          />
          {/* the two cassettes, each a promoter over its parts */}
          <Promoter x={226} y={183} color={C.ink} />
          <Terminator x={214} y={208} />
          <Part x={227} y={208} w={46} h={22} color="#2a8fd8" />
          <Part x={275} y={208} w={30} h={22} color={C.greenMid} />
          <Part x={307} y={208} w={30} h={22} color="#e8502c" />
          <Terminator x={346} y={208} />
          <Promoter x={226} y={230} color="#8c3fc0" />
          <Terminator x={214} y={255} />
          <Part x={227} y={255} w={45} h={22} color="#8c3fc0" />
          <Part x={274} y={255} w={46} h={22} color="#f2c21d" />
          <Terminator x={331} y={255} />
        </Monitor>
      </Panel>

      {/* 2. Part acquisition and amplification */}
      <Panel
        x={418}
        y={13}
        w={283}
        h={380}
        fill={C.panelBlue}
        section={SECTION}
        target="cloning-parts"
        label="2. Part acquisition and amplification"
      >
        <TitleLines
          x={559}
          y={55}
          size={TITLE}
          lines={["2. Part acquisition", "and amplification"]}
        />
        <Tube
          x={482}
          top={140}
          w={56}
          h={176}
          liquid={C.bluePale}
          level={0.46}
        />
        <ThinArrow
          x1={556}
          y1={168}
          x2={596}
          y2={168}
          width={4}
          color={C.steelDark}
        />
        <Dna x1={553} x2={668} y={190} color={C.greenMid} />
        <Dna x1={553} x2={668} y={235} color="#f0832f" />
        <Dna x1={553} x2={668} y={280} color="#2a8fd8" />
        <ThinArrow
          x1={668}
          y1={306}
          x2={628}
          y2={306}
          width={4}
          color={C.steelDark}
        />
      </Panel>

      {/* 3. Preparative digestion of the vectors and inserts */}
      <Panel
        x={722}
        y={13}
        w={320}
        h={380}
        fill={C.panelGreen}
        section={SECTION}
        target="cloning-digestion"
        label="3. Preparative digestion of the vectors and inserts"
      >
        <TitleLines
          x={882}
          y={55}
          size={TITLE}
          lines={["3. Preparative digestion", "of the vectors and inserts"]}
        />
        <Plasmid
          x={815}
          y={250}
          r={62}
          w={13}
          segments={[
            { from: -54, to: -6, color: C.greenMid },
            { from: 2, to: 62, color: "#f0832f" },
          ]}
        />
        <Scissors x={781} y={194} rot={-28} />
        <Scissors x={862} y={304} rot={150} />
        <ThinArrow x1={894} y1={252} x2={926} y2={252} width={4} />
        <Part x={936} y={210} w={50} h={20} color={C.greenMid} />
        <Part x={936} y={253} w={60} h={20} color="#f0832f" />
        <Part x={936} y={300} w={55} h={20} color="#2a8fd8" />
        <Brace x={1000} y1={198} y2={312} />
      </Panel>

      {/* 4. Ligation */}
      <Panel
        x={1062}
        y={13}
        w={233}
        h={380}
        fill={C.panelBlue}
        section={SECTION}
        target="cloning-ligation"
        label="4. Ligation"
      >
        <Title x={1178} y={62} size={TITLE}>
          4. Ligation
        </Title>
        {/* the two cut arcs, still apart */}
        <path
          d="M1096,152 A58,58 0 0 1 1154,114"
          fill="none"
          stroke={C.greenMid}
          strokeWidth={15}
        />
        <path
          d="M1200,114 A58,58 0 0 1 1256,152"
          fill="none"
          stroke="#f0832f"
          strokeWidth={15}
        />
        <ThinArrow x1={1178} y1={170} x2={1178} y2={214} width={4} />
        <Plasmid
          x={1178}
          y={300}
          r={62}
          w={13}
          segments={[
            { from: -54, to: -6, color: C.greenMid },
            { from: 2, to: 62, color: "#f0832f" },
          ]}
        />
      </Panel>

      {/* 5. Transformation into the E. coli cloning host */}
      <Panel
        x={1316}
        y={13}
        w={331}
        h={380}
        fill={C.panelGreen}
        section={SECTION}
        target="cloning-ecoli-transformation"
        label="5. Transformation into the E. coli cloning host"
      >
        <TitleLines
          x={1481}
          y={55}
          size={TITLE}
          lines={["5. Transformation into", "the *E. coli* cloning host"]}
        />
        <Plasmid
          x={1410}
          y={210}
          r={46}
          w={11}
          segments={[
            { from: -56, to: -8, color: C.greenMid },
            { from: 0, to: 58, color: "#f0832f" },
          ]}
        />
        <path
          d="M1466,196 Q1518,200 1546,238"
          fill="none"
          stroke={C.ink}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path d="M1556,250 L1534,232 L1548,226 Z" fill={C.ink} />
        <Bacterium
          x={1566}
          y={288}
          len={128}
          wid={68}
          rot={-26}
          stroke={C.blue}
          fill="#dbe8f6"
          dna={C.blue}
          flagella={13}
          flagellaLen={22}
        />
        <Petri
          x={1392}
          y={330}
          rx={66}
          ry={23}
          colonies={[
            { dx: -34, dy: -5 },
            { dx: -12, dy: 5 },
            { dx: 10, dy: -6 },
            { dx: 32, dy: 3 },
            { dx: -22, dy: 9 },
            { dx: 20, dy: 10 },
            { dx: 0, dy: -11, r: 6 },
          ]}
        />
      </Panel>

      {/* 6. Colony screening and diagnostic verification */}
      <Panel
        x={1110}
        y={465}
        w={536}
        h={342}
        fill={C.panelBlue}
        section={SECTION}
        target="cloning-colony-screening"
        label="6. Colony screening and diagnostic verification"
      >
        <TitleLines
          x={1378}
          y={510}
          size={TITLE}
          lines={["6. Colony screening and", "diagnostic verification"]}
        />
        <Petri
          x={1235}
          y={690}
          rx={94}
          ry={62}
          colonies={[
            { dx: -46, dy: -18 },
            { dx: -16, dy: -32 },
            { dx: 18, dy: -24 },
            { dx: 48, dy: -6 },
            { dx: -54, dy: 16 },
            { dx: -20, dy: 6 },
            { dx: 14, dy: 20 },
            { dx: 46, dy: 30 },
            { dx: -8, dy: 38 },
          ]}
        />
        {/* the loop picking a colony */}
        <g transform="rotate(34 1286 640)">
          <rect x={1276} y={580} width={20} height={70} rx={9} fill={C.blue} />
          <rect
            x={1278}
            y={648}
            width={16}
            height={42}
            rx={6}
            fill={C.blueLight}
          />
          <path d="M1286,690 L1292,716 L1280,716 Z" fill={C.blueMid} />
        </g>
        <Gel x={1392} y={580} w={238} h={190} />
      </Panel>

      {/* 7. Sequence confirmation */}
      <Panel
        x={588}
        y={465}
        w={499}
        h={342}
        fill={C.panelGreen}
        section={SECTION}
        target="cloning-sequence-confirmation"
        label="7. Sequence confirmation"
      >
        <Title x={838} y={515} size={TITLE}>
          7. Sequence confirmation
        </Title>
        <rect
          x={624}
          y={570}
          width={428}
          height={176}
          fill="#f4f8fc"
          stroke={C.steelLight}
          strokeWidth={2}
        />
        <Chromatogram
          x={656}
          base={726}
          step={30}
          peaks={[
            { h: 62, color: "#2a8fd8" },
            { h: 106, color: "#2a8fd8" },
            { h: 92, color: C.greenMid },
            { h: 70, color: "#f0a02a" },
            { h: 108, color: "#1b7f95" },
            { h: 64, color: "#e03b2c" },
            { h: 84, color: C.greenMid },
            { h: 124, color: C.ink },
            { h: 76, color: C.greenMid },
            { h: 68, color: "#f0a02a" },
            { h: 122, color: "#e03b2c" },
            { h: 80, color: C.ink },
            { h: 92, color: "#e03b2c" },
          ]}
        />
      </Panel>

      {/* 8. Transformation into P. putida KT2440 */}
      <Panel
        x={25}
        y={465}
        w={541}
        h={342}
        fill={C.panelBlue}
        section={SECTION}
        target="cloning-pputida-transformation"
        label="8. Transformation into P. putida KT2440"
      >
        <TitleLines
          x={296}
          y={510}
          size={TITLE}
          lines={["8. Transformation into", "*P. putida* KT2440"]}
        />
        <Plasmid
          x={130}
          y={670}
          r={72}
          w={14}
          segments={[
            { from: -58, to: -10, color: C.greenMid },
            { from: -2, to: 58, color: "#f0832f" },
          ]}
        />
        <path
          d="M216,628 Q288,630 328,668"
          fill="none"
          stroke={C.ink}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path d="M340,678 L316,662 L328,654 Z" fill={C.ink} />
        <Bacterium
          x={410}
          y={686}
          len={186}
          wid={92}
          rot={-28}
          stroke={C.green}
          fill="#dcecd3"
          dna={C.green}
          flagella={15}
        />
      </Panel>

      <BlockArrow x={407} y={203} length={60} />
      <BlockArrow x={711} y={203} length={60} />
      <BlockArrow x={1052} y={203} length={60} />
      <BlockArrow x={1305} y={203} length={60} />
      <BlockArrow x={1378} y={429} angle={90} length={60} />
      <BlockArrow x={1098} y={636} angle={180} length={60} />
      <BlockArrow x={577} y={636} angle={180} length={60} />
    </WorkflowFigure>
  );
}
