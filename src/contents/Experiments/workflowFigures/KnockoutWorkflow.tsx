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
  Plot,
  Tube,
} from "./parts";

/* --------------------------------------------------------------------------
   Redraw of the base-editing figure (1920 x 819), panel for panel:

     1. Guide design          a monitor with the two target genes and the
                              shortlist of guides
     2. gRNA amplification    a tube and the three amplified gRNA
                              fragments, with their primers
     3. Golden Gate assembly  the editing plasmid and the fragments it
        into pMBEC2           takes in
     4. Transformation and    a plate of transformants beside the same
        fluorescence-assisted plate read for fluorescence
        screening
     5. Delivery into         the verified plasmid entering P. putida
        P. putida
     6. Editing               the base editor on an R-loop, the edited
                              bases marked in red
     7. Screening of edits    a chromatogram over its read alignment,
                              the edited column highlighted
     8. Curing and iteration  the plasmid lost, ready for the next round
     9. Triple-mutant         the gel the three edits are confirmed on
        verification
     10. Phenotypic           the growth curves of the final strains
         characterisation

   Same serpentine as the original: 1 → 5 along the top, down, then
   6 → 10 leftwards. Stages 1–9 open their experiment in order; stage 10
   is the block's closing synthesis rather than an experiment of its own,
   so its panel opens that section without a folder.
   -------------------------------------------------------------------------- */

const TITLE = 28;
const SECTION = "knocking-out";

/** One target gene as the guide-design panel draws it on screen: a
 * looped backbone with a coding stretch, and the edit marked on it. */
function GeneTrack({
  x,
  y,
  mark,
}: {
  x: number;
  y: number;
  /** The edits marked on this gene: offset from x, and colour. */
  mark: { dx: number; color: string; up: boolean }[];
}) {
  return (
    <g>
      <path
        d={`M${x},${y + 8} h16 v-10 h22 v10 h34 v-10 h30 v10 h20`}
        fill="none"
        stroke={C.blue}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <rect
        x={x + 58}
        y={y - 6}
        width={46}
        height={12}
        rx={2}
        fill={C.blueMid}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={x + 64 + i * 9}
          y1={y - 6}
          x2={x + 64 + i * 9}
          y2={y + 6}
          stroke={C.white}
          strokeWidth={2}
        />
      ))}
      {mark.map(({ dx, color, up }) => (
        <g key={dx} stroke={color} fill={color} strokeWidth={5}>
          <line
            x1={x + dx}
            y1={up ? y - 4 : y - 28}
            x2={x + dx}
            y2={up ? y - 28 : y + 4}
          />
          {up ? (
            <path d={`M${x + dx},${y - 36} l-8,12 h16 Z`} />
          ) : (
            <rect x={x + dx - 10} y={y - 32} width={20} height={6} rx={2} />
          )}
        </g>
      ))}
    </g>
  );
}

/** The base editor sitting on an R-loop: the protein as a pale lobed
 * body, the strands opened around the protospacer, the guide paired to
 * the target and the edited bases marked in red. */
function BaseEditor({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path
        d={`M${x - 92},${y - 6} a62,62 0 0 1 38,-62 a56,56 0 0 1 86,-18 a60,60 0 0 1 64,60 a58,58 0 0 1 -42,76 a66,66 0 0 1 -104,-8 a56,56 0 0 1 -42,-48 Z`}
        fill="#dce9f5"
      />
      {/* the duplex, opened into a bubble over the protospacer */}
      <g fill="none" stroke={C.blue} strokeWidth={5} strokeLinejoin="round">
        <path d={`M${x - 150},${y} h62 l26,-30 h124 l26,30 h62`} />
        <path d={`M${x - 150},${y + 18} h62 l26,34 h124 l26,-34 h62`} />
      </g>
      <g stroke={C.blue} strokeWidth={4} strokeLinecap="round">
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`l${i}`}
            x1={x - 144 + i * 13}
            y1={y + 2}
            x2={x - 144 + i * 13}
            y2={y + 16}
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`r${i}`}
            x1={x + 98 + i * 13}
            y1={y + 2}
            x2={x + 98 + i * 13}
            y2={y + 16}
          />
        ))}
      </g>
      {/* the guide paired to the opened strand */}
      <g stroke={C.blueMid} strokeWidth={4} strokeLinecap="round">
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={i}
            x1={x - 52 + i * 13}
            y1={y - 30}
            x2={x - 52 + i * 13}
            y2={y - 8}
          />
        ))}
      </g>
      {/* the bases the deaminase changes */}
      <g stroke="#e03b2c" strokeWidth={7} strokeLinecap="round">
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={x - 50 + i * 28}
            y1={y - 2}
            x2={x - 32 + i * 28}
            y2={y - 2}
          />
        ))}
      </g>
      {/* the scaffold's hairpins, trailing off to the right */}
      <g fill="none" stroke={C.blue} strokeWidth={5} strokeLinecap="round">
        <path d={`M${x + 120},${y - 10} q18,-28 10,-54`} />
        <path d={`M${x + 130},${y - 64} q-16,-18 -6,-32`} />
        <path d={`M${x + 130},${y - 64} q22,-6 28,-24`} />
      </g>
    </g>
  );
}

/** The alignment under the chromatogram: grey reads with the edited
 * column boxed and marked in red. */
function Alignment({ x, y }: { x: number; y: number }) {
  const rows = [0, 1, 2];
  return (
    <g>
      <rect
        x={x + 142}
        y={y - 14}
        width={24}
        height={62}
        rx={3}
        fill={C.steelLight}
        fillOpacity={0.6}
      />
      {rows.map((r) => (
        <g key={r}>
          {[0, 26, 52, 78, 104, 176, 202, 228].map((dx) => (
            <rect
              key={dx}
              x={x + dx}
              y={y + r * 20}
              width={dx === 176 ? 14 : 20}
              height={5}
              rx={2}
              fill={C.steel}
            />
          ))}
          <rect
            x={x + 146}
            y={y + r * 20 - 1}
            width={16}
            height={7}
            rx={2}
            fill="#e03b2c"
          />
        </g>
      ))}
    </g>
  );
}

/** The verification gel: a ladder and four lanes on a pale plate. */
function VerificationGel({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  const lane = w / 5.4;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={3}
        fill="#eef0f2"
        stroke={C.steelLight}
        strokeWidth={2}
      />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={x + lane * (1.1 + i)}
          y1={y}
          x2={x + lane * (1.1 + i)}
          y2={y + h}
          stroke={C.white}
          strokeWidth={3}
        />
      ))}
      {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((t) => (
        <rect
          key={t}
          x={x + lane * 0.22}
          y={y + h * t}
          width={lane * 0.6}
          height={7}
          rx={2}
          fill={C.steelDark}
        />
      ))}
      {[0.62, 0.36, 0.48, 0.45].map((t, i) => (
        <rect
          key={i}
          x={x + lane * (1.24 + i)}
          y={y + h * t}
          width={lane * 0.72}
          height={10}
          rx={2}
          fill={C.inkSoft}
        />
      ))}
    </g>
  );
}

/** The sequence the screening panel prints under its chromatogram, with
 * the colour each base is drawn in. */
const BASES: [string, string][] = [
  ["A", "#3f9e7c"],
  ["T", "#f0832f"],
  ["G", C.ink],
  ["C", "#2a8fd8"],
  ["T", "#f0832f"],
  ["A", "#3f9e7c"],
  ["G", C.ink],
  ["C", "#2a8fd8"],
  ["T", "#f0832f"],
  ["G", C.ink],
  ["A", "#3f9e7c"],
  ["A", "#3f9e7c"],
  ["T", "#f0832f"],
  ["C", "#e03b2c"],
];

/** How tall each of those peaks is drawn. */
const PEAK_H = [62, 76, 96, 70, 64, 84, 118, 72, 60, 80, 96, 66, 86, 90];

export function KnockoutWorkflow() {
  return (
    <WorkflowFigure
      viewBox="0 0 1920 768"
      label="Ten-stage base-editing workflow: guide design, gRNA amplification, Golden Gate assembly, fluorescence-assisted screening, delivery into P. putida, editing, screening of edits, curing, triple-mutant verification and phenotypic characterisation"
      caption="The ten stages of the knock-out route, from designing the guides to characterising the triple mutant; stages 6 to 8 are repeated once per target."
    >
      {/* 1. Guide design */}
      <Panel
        x={21}
        y={10}
        w={393}
        h={323}
        fill={C.panelGreen}
        section={SECTION}
        target="knockout-guide-design"
        label="1. Guide design"
      >
        <Title x={217} y={62} size={TITLE}>
          1. Guide design
        </Title>
        <Monitor x={73} y={110} w={287} h={145}>
          <rect x={83} y={120} width={267} height={125} fill="#eef4fb" />
          <GeneTrack
            x={100}
            y={168}
            mark={[
              { dx: 40, color: "#e03b2c", up: true },
              { dx: 96, color: "#f0a02a", up: false },
            ]}
          />
          <GeneTrack
            x={100}
            y={215}
            mark={[{ dx: 40, color: "#f0832f", up: false }]}
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={250}
              y={136 + i * 17}
              width={i % 2 ? 72 : 88}
              height={9}
              rx={3}
              fill={C.steel}
              fillOpacity={i === 3 ? 0.45 : 0.85}
            />
          ))}
        </Monitor>
      </Panel>

      {/* 2. gRNA amplification */}
      <Panel
        x={432}
        y={10}
        w={361}
        h={323}
        fill={C.panelSlate}
        section={SECTION}
        target="knockout-grna-amplification"
        label="2. gRNA amplification"
      >
        <Title x={612} y={62} size={TITLE}>
          2. gRNA amplification
        </Title>
        <Tube
          x={520}
          top={122}
          w={56}
          h={166}
          liquid={C.bluePale}
          level={0.44}
        />
        <ThinArrow
          x1={592}
          y1={150}
          x2={634}
          y2={150}
          width={4}
          color={C.ink}
        />
        <Dna x1={590} x2={752} y={176} color={C.greenMid} />
        <Dna x1={590} x2={752} y={222} color="#f0832f" />
        <ThinArrow
          x1={592}
          y1={248}
          x2={634}
          y2={248}
          width={4}
          color={C.ink}
        />
        <Dna x1={590} x2={752} y={272} color="#2a8fd8" />
        <ThinArrow
          x1={752}
          y1={298}
          x2={710}
          y2={298}
          width={4}
          color={C.ink}
        />
      </Panel>

      {/* 3. Golden Gate assembly into pMBEC2 */}
      <Panel
        x={814}
        y={10}
        w={352}
        h={323}
        fill={C.panelGreen}
        section={SECTION}
        target="knockout-golden-gate"
        label="3. Golden Gate assembly into pMBEC2"
      >
        <TitleLines
          x={990}
          y={58}
          size={TITLE}
          lines={["3. Golden Gate assembly", "into pMBEC2"]}
        />
        <Plasmid
          x={920}
          y={212}
          r={62}
          w={13}
          segments={[
            { from: -56, to: -14, color: C.greenMid },
            { from: -8, to: 46, color: "#f0a02a" },
            { from: 96, to: 150, color: "#2a8fd8" },
          ]}
        />
        <ThinArrow x1={1000} y1={214} x2={1030} y2={214} width={4} />
        <Part x={1042} y={170} w={66} h={18} color={C.greenMid} />
        <Part x={1042} y={214} w={66} h={18} color="#f0a02a" />
        <Part x={1042} y={258} w={66} h={18} color="#2a8fd8" />
        <Brace x={1118} y1={158} y2={270} />
      </Panel>

      {/* 4. Transformation and fluorescence-assisted screening */}
      <Panel
        x={1183}
        y={10}
        w={348}
        h={323}
        fill={C.panelSlate}
        section={SECTION}
        target="knockout-fluorescence-screening"
        label="4. Transformation and fluorescence-assisted screening"
      >
        <TitleLines
          x={1357}
          y={54}
          size={TITLE}
          lines={[
            "4. Transformation and",
            "fluorescence-assisted",
            "screening",
          ]}
        />
        <Petri
          x={1280}
          y={232}
          rx={80}
          ry={52}
          colonies={[
            { dx: -44, dy: -14, color: "#8ee07a" },
            { dx: -14, dy: -28 },
            { dx: 20, dy: -18, color: "#8ee07a" },
            { dx: 48, dy: 0 },
            { dx: -50, dy: 14, color: "#8ee07a" },
            { dx: -16, dy: 8, r: 9, color: "#fdfbe8" },
            { dx: 16, dy: 22, color: "#8ee07a" },
            { dx: 48, dy: 30 },
            { dx: -34, dy: 34, color: "#8ee07a" },
          ]}
        />
        <rect x={1382} y={167} width={132} height={116} rx={3} fill="#121a16" />
        {[
          [22, 20, "#5ef06a"],
          [62, 16, "#1f3a26"],
          [100, 28, "#5ef06a"],
          [30, 52, "#2a4a31"],
          [70, 46, "#5ef06a"],
          [108, 60, "#2a4a31"],
          [20, 84, "#5ef06a"],
          [58, 92, "#5ef06a"],
          [96, 96, "#2a4a31"],
          [86, 70, "#1f3a26"],
        ].map(([dx, dy, color]) => (
          <circle
            key={`${dx}-${dy}`}
            cx={1382 + (dx as number)}
            cy={167 + (dy as number)}
            r={7}
            fill={color as string}
          />
        ))}
      </Panel>

      {/* 5. Delivery into P. putida */}
      <Panel
        x={1550}
        y={10}
        w={352}
        h={323}
        fill={C.panelGreen}
        section={SECTION}
        target="knockout-delivery"
        label="5. Delivery into P. putida"
      >
        <TitleLines
          x={1726}
          y={58}
          size={TITLE}
          lines={["5. Delivery into", "*P. putida*"]}
        />
        <Plasmid
          x={1648}
          y={216}
          r={52}
          w={12}
          segments={[
            { from: -46, to: 10, color: "#f0a02a" },
            { from: 96, to: 140, color: "#2a8fd8" },
          ]}
        />
        <ThinArrow x1={1714} y1={216} x2={1752} y2={216} width={5} />
        <Bacterium
          x={1818}
          y={234}
          len={140}
          wid={78}
          rot={-22}
          stroke={C.green}
          fill={C.panelGreen}
          dna={C.green}
          flagella={12}
        />
      </Panel>

      {/* 6. Editing */}
      <Panel
        x={1555}
        y={388}
        w={344}
        h={330}
        fill={C.panelSlate}
        section={SECTION}
        target="knockout-editing"
        label="6. Editing"
      >
        <Title x={1727} y={440} size={TITLE}>
          6. Editing
        </Title>
        <BaseEditor x={1727} y={560} />
      </Panel>

      {/* 7. Screening of edits */}
      <Panel
        x={1187}
        y={388}
        w={347}
        h={330}
        fill={C.panelGreen}
        section={SECTION}
        target="knockout-sequencing-screen"
        label="7. Screening of edits"
      >
        <Title x={1360} y={440} size={TITLE}>
          7. Screening of edits
        </Title>
        <rect
          x={1225}
          y={474}
          width={272}
          height={135}
          fill="#f4f8fc"
          stroke={C.steelLight}
          strokeWidth={2}
        />
        <Chromatogram
          x={1244}
          base={579}
          step={18}
          peaks={BASES.map(([, color], i) => ({ h: PEAK_H[i], color }))}
        />
        {BASES.map(([base, color], i) => (
          <text
            key={`${base}-${i}`}
            x={1244 + i * 18}
            y={600}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight={700}
            fontSize={17}
            fill={color}
          >
            {base}
          </text>
        ))}
        <Alignment x={1252} y={634} />
      </Panel>

      {/* 8. Curing and iteration */}
      <Panel
        x={802}
        y={388}
        w={363}
        h={330}
        fill={C.panelSlate}
        section={SECTION}
        target="knockout-curing"
        label="8. Curing and iteration"
      >
        <Title x={983} y={440} size={TITLE}>
          8. Curing and iteration
        </Title>
        <Plasmid
          x={902}
          y={566}
          r={52}
          w={12}
          segments={[
            { from: -62, to: -20, color: C.greenMid },
            { from: -14, to: 44, color: "#f0a02a" },
          ]}
        />
        <g stroke="#e03b2c" strokeWidth={9} strokeLinecap="round">
          <line x1={932} y1={592} x2={966} y2={626} />
          <line x1={966} y1={592} x2={932} y2={626} />
        </g>
        <ThinArrow x1={986} y1={566} x2={1016} y2={566} width={4} />
        <Plasmid
          x={1086}
          y={566}
          r={52}
          w={12}
          segments={[{ from: -34, to: -2, color: C.greenMid }]}
        />
      </Panel>

      {/* 9. Triple-mutant verification */}
      <Panel
        x={410}
        y={388}
        w={374}
        h={330}
        fill={C.panelGreen}
        section={SECTION}
        target="knockout-triple-mutant-verification"
        label="9. Triple-mutant verification"
      >
        <TitleLines
          x={597}
          y={440}
          size={TITLE}
          lines={["9. Triple-mutant", "verification"]}
        />
        <VerificationGel x={465} y={502} w={255} h={190} />
      </Panel>

      {/* 10. Phenotypic characterisation */}
      <Panel
        x={20}
        y={388}
        w={371}
        h={330}
        fill={C.panelSlate}
        section="closing"
        label="10. Phenotypic characterisation"
      >
        <TitleLines
          x={205}
          y={440}
          size={TITLE}
          lines={["10. Phenotypic", "characterisation"]}
        />
        <Plot
          ox={70}
          oy={682}
          w={280}
          h={180}
          series={[
            {
              color: C.green,
              pts: [
                [92, 612],
                [116, 580],
                [146, 556],
                [182, 542],
                [220, 536],
                [258, 532],
                [296, 530],
              ],
            },
            {
              color: "#f0a02a",
              pts: [
                [94, 648],
                [120, 624],
                [152, 604],
                [188, 590],
                [226, 580],
                [264, 574],
                [300, 570],
              ],
            },
            {
              color: "#2a8fd8",
              pts: [
                [96, 668],
                [126, 660],
                [160, 652],
                [196, 644],
                [232, 636],
                [268, 628],
                [304, 620],
              ],
            },
          ]}
        />
      </Panel>

      <BlockArrow x={423} y={171} length={60} />
      <BlockArrow x={803} y={171} length={60} />
      <BlockArrow x={1174} y={171} length={60} />
      <BlockArrow x={1540} y={171} length={60} />
      <BlockArrow x={1726} y={360} angle={90} length={60} />
      <BlockArrow x={1544} y={553} angle={180} length={60} />
      <BlockArrow x={1176} y={553} angle={180} length={60} />
      <BlockArrow x={793} y={553} angle={180} length={60} />
      <BlockArrow x={400} y={553} angle={180} length={60} />
    </WorkflowFigure>
  );
}
