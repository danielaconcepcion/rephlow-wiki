import {
  BlockArrow,
  C,
  Globule,
  Panel,
  Star,
  Tangle,
  ThinArrow,
  Title,
  WorkflowFigure,
} from "./shared";

/* --------------------------------------------------------------------------
   Redraw of revalorisation-workflow.webp (1600 x 800), panel for panel:

     1. Computational stability engineering  laptop: a protein with three
                                             mutation stars, two melting
                                             curves, a three-star legend
     2. Enzyme expression                    plasmid → bacterium carrying
                                             it, a zoom on the protein, and
                                             a flask of culture
     3. Enzyme purification                  tube → banded column → tube on
                                             a stand over a beaker
     4. Enzyme activity assays               a 96-well plate and three
                                             saturation curves
     5. Multi-enzyme system assembly         two enzymes joined, then a
        and testing                          tube read as a rising curve
     6. SpyTag–SpyCatcher channelling        substrate into one enzyme,
                                             handed across the linked pair,
                                             product out of the other

   Same connections: 1 → 2 → 3 along the top, down to 4, then 4 → 5 → 6
   leftwards — and the long return the original draws from 4 back to 1.
   -------------------------------------------------------------------------- */

const TITLE = 27;

export function RevalorisationWorkflow() {
  return (
    <WorkflowFigure
      viewBox="0 0 1600 800"
      label="Six-stage workflow of the conversion module: computational stability engineering, enzyme expression, enzyme purification, enzyme activity assays, multi-enzyme system assembly and testing, and SpyTag–SpyCatcher channelling"
    >
      {/* The return from 4 to 1, behind everything: out of the top of
          panel 4, along the gap between the rows, and up into panel 1. */}
      <path
        d="M1136,470 C1136,440 1122,432 1092,432 H142 C110,432 100,420 100,404"
        fill="none"
        stroke={C.ink}
        strokeWidth={15}
        strokeLinecap="round"
      />
      <path d="M100,372 L124,410 L76,410 Z" fill={C.ink} />

      {/* 1. Computational stability engineering */}
      <Panel
        x={25}
        y={20}
        w={535}
        h={370}
        fill={C.panelGreen}
        section="computational-design"
        target="dhak-in-silico-stabilisation"
        label="1. Computational stability engineering"
      >
        <Title x={52} y={70} size={TITLE} anchor="start" fit={490}>
          1. Computational stability engineering
        </Title>
        {/* laptop */}
        <rect x={98} y={100} width={414} height={222} rx={12} fill={C.ink} />
        <rect x={110} y={112} width={390} height={198} rx={4} fill={C.white} />
        <path
          d="M66,330 H544 L532,346 H78 Z"
          fill={C.blue}
          stroke={C.ink}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <rect x={270} y={330} width={70} height={6} rx={3} fill={C.ink} />
        {/* protein with its three mutation stars */}
        <Tangle x={222} y={220} r={92} color={C.blue} fill={C.blueLight} />
        <Star x={212} y={172} r={13} fill={C.orange} />
        <Star x={253} y={215} r={13} fill={C.orange} />
        <Star x={236} y={270} r={13} fill={C.orange} />
        {/* the two melting curves: before (solid) and after (dashed) */}
        <g stroke={C.ink} strokeWidth={3}>
          <line x1={344} y1={128} x2={344} y2={218} />
          <line x1={344} y1={218} x2={484} y2={218} />
        </g>
        <path
          d="M350,216 C380,216 386,142 402,142 C418,142 424,216 450,216"
          fill="none"
          stroke={C.ink}
          strokeWidth={3.5}
        />
        <path
          d="M372,216 C402,216 406,146 422,146 C438,146 444,216 478,216"
          fill="none"
          stroke={C.ink}
          strokeOpacity={0.6}
          strokeWidth={3}
          strokeDasharray="7 6"
        />
        {/* the legend */}
        <Star x={363} y={244} r={11} fill={C.orange} />
        <Star x={363} y={271} r={11} fill={C.blue} />
        <Star x={363} y={298} r={11} fill={C.yellow} />
        {[
          [388, 244, 90],
          [388, 271, 90],
          [388, 298, 64],
        ].map(([x, y, w]) => (
          <line
            key={y}
            x1={x}
            y1={y}
            x2={x + w}
            y2={y}
            stroke={C.blueMid}
            strokeWidth={9}
            strokeLinecap="round"
          />
        ))}
      </Panel>

      {/* 2. Enzyme expression */}
      <Panel
        x={588}
        y={20}
        w={497}
        h={370}
        fill={C.panelBlue}
        section="enzyme-expression"
        target="gene-acquisition-transformation"
        label="2. Enzyme expression"
      >
        <Title x={630} y={70} size={TITLE} anchor="start">
          2. Enzyme expression
        </Title>
        {/* plasmid: blue backbone, green insert, orange marker */}
        <path
          d="M708,166 A50,50 0 1 0 712,240"
          fill="none"
          stroke={C.blue}
          strokeWidth={14}
        />
        <path d="M700,158 L720,166 L702,178 Z" fill={C.blue} />
        <path
          d="M716,160 A50,50 0 0 1 732,184"
          fill="none"
          stroke={C.green}
          strokeWidth={14}
        />
        <path
          d="M733,196 A50,50 0 0 1 718,236"
          fill="none"
          stroke={C.gold}
          strokeWidth={10}
        />
        <ThinArrow x1={747} y1={188} x2={794} y2={188} width={5} />
        {/* bacterium carrying the plasmid */}
        <g transform="rotate(-32 822 262)">
          {Array.from({ length: 16 }, (_, i) => {
            const t = (i / 16) * Math.PI * 2;
            const ex = 822 + Math.cos(t) * 112;
            const ey = 262 + Math.sin(t) * 58;
            const ox = 822 + Math.cos(t) * 134;
            const oy = 262 + Math.sin(t) * 76;
            return (
              <path
                key={i}
                d={`M${ex},${ey} Q${(ex + ox) / 2 + 6},${(ey + oy) / 2 - 6} ${ox},${oy}`}
                stroke={C.greenMid}
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
          <rect
            x={712}
            y={206}
            width={220}
            height={112}
            rx={56}
            fill={C.yellow}
            stroke={C.gold}
            strokeWidth={3.5}
          />
        </g>
        {[
          [804, 262],
          [826, 250],
          [846, 238],
          [818, 274],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}${cy}`}
            cx={cx}
            cy={cy}
            r={16}
            fill="none"
            stroke={C.blue}
            strokeWidth={4}
          />
        ))}
        {/* zoom on the expressed protein */}
        <line
          x1={880}
          y1={228}
          x2={928}
          y2={168}
          stroke={C.blue}
          strokeWidth={2.5}
          strokeDasharray="6 6"
        />
        <line
          x1={890}
          y1={242}
          x2={962}
          y2={192}
          stroke={C.blue}
          strokeWidth={2.5}
          strokeDasharray="6 6"
        />
        <circle
          cx={975}
          cy={132}
          r={62}
          fill={C.white}
          stroke={C.blue}
          strokeWidth={4}
        />
        <Tangle x={975} y={132} r={42} color={C.blue} fill={C.blueLight} />
        {/* flask of culture */}
        <path
          d="M995,214 H1033 V250 L1062,348 A10,10 0 0 1 1052,360 H976 A10,10 0 0 1 966,348 L995,250 Z"
          fill={C.white}
          stroke={C.blue}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <path
          d="M982,300 H1046 L1058,346 A8,8 0 0 1 1050,356 H978 A8,8 0 0 1 970,346 Z"
          fill={C.yellow}
        />
        {[
          [996, 322],
          [1020, 338],
          [1032, 316],
        ].map(([cx, cy]) => (
          <circle
            key={cx}
            cx={cx}
            cy={cy}
            r={6}
            fill={C.white}
            fillOpacity={0.6}
          />
        ))}
      </Panel>

      {/* 3. Enzyme purification */}
      <Panel
        x={1108}
        y={20}
        w={467}
        h={370}
        fill={C.panelGreen}
        section="enzyme-purification"
        target="imac-purification"
        label="3. Enzyme purification"
      >
        <Title x={1140} y={70} size={TITLE} anchor="start">
          3. Enzyme purification
        </Title>
        {/* microtube with its lid open */}
        <path
          d="M1178,174 H1232 V284 L1205,330 L1178,284 Z"
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
        <path
          d="M1181,222 H1229 V283 L1205,324 L1181,283 Z"
          fill={C.greenLight}
        />
        {[200, 214, 228, 242, 256, 270].map((y) => (
          <line
            key={y}
            x1={1214}
            y1={y}
            x2={1226}
            y2={y}
            stroke={C.blue}
            strokeWidth={2.5}
          />
        ))}
        <rect
          x={1174}
          y={168}
          width={62}
          height={10}
          rx={4}
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3}
        />
        <rect
          x={1134}
          y={138}
          width={44}
          height={16}
          rx={4}
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3}
          transform="rotate(36 1156 146)"
        />
        <ThinArrow x1={1242} y1={232} x2={1294} y2={232} width={7} />
        {/* the banded column */}
        <rect
          x={1318}
          y={104}
          width={24}
          height={20}
          rx={3}
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3}
        />
        <rect x={1303} y={122} width={54} height={28} rx={4} fill={C.blue} />
        <rect
          x={1306}
          y={150}
          width={48}
          height={156}
          fill={C.bluePale}
          stroke={C.ink}
          strokeWidth={3}
        />
        <rect x={1307} y={192} width={46} height={14} fill={C.blue} />
        <rect x={1307} y={222} width={46} height={14} fill={C.yellow} />
        <rect x={1307} y={252} width={46} height={14} fill={C.blueMid} />
        <rect
          x={1303}
          y={306}
          width={54}
          height={18}
          rx={3}
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3}
        />
        <path
          d="M1318,324 H1342 L1334,358 H1326 Z"
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <ThinArrow x1={1376} y1={232} x2={1436} y2={232} width={7} />
        {/* stand, clamp, tube and beaker */}
        <rect x={1464} y={118} width={9} height={214} rx={3} fill={C.blue} />
        <rect x={1440} y={326} width={120} height={20} rx={4} fill={C.blue} />
        <rect x={1446} y={172} width={96} height={14} rx={4} fill={C.blue} />
        <rect x={1440} y={168} width={12} height={22} rx={3} fill={C.ink} />
        <path
          d="M1500,146 H1534 V242 A17,17 0 0 1 1500,242 Z"
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3}
        />
        <path
          d="M1501,222 H1533 V242 A16,16 0 0 1 1501,242 Z"
          fill={C.yellow}
        />
        <path
          d="M1488,276 V316 a6,6 0 0 0 6,6 H1536 a6,6 0 0 0 6,-6 V276"
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3}
        />
        <rect
          x={1491}
          y={292}
          width={48}
          height={27}
          rx={4}
          fill={C.blueLight}
        />
      </Panel>

      {/* 4. Enzyme activity assays */}
      <Panel
        x={1075}
        y={465}
        w={500}
        h={310}
        fill={C.panelBlue}
        section="activity-assay"
        target="dhak-activity-assay"
        label="4. Enzyme activity assays"
      >
        <Title x={1328} y={512} size={TITLE}>
          4. Enzyme activity assays
        </Title>
        {/* 96-well plate */}
        <path
          d="M1122,572 H1330 L1334,724 H1112 Z"
          fill={C.white}
          stroke={C.blueMid}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {Array.from({ length: 9 }, (_, col) =>
          Array.from({ length: 7 }, (_, row) => {
            const palette = [
              C.blue,
              C.blue,
              C.blue,
              C.greenMid,
              C.greenMid,
              C.yellow,
              C.yellow,
              "#eef1f5",
              "#eef1f5",
            ];
            return (
              <circle
                key={`${col}-${row}`}
                cx={1138 + col * 22 - row * 1.2}
                cy={590 + row * 20}
                r={8}
                fill={palette[col]}
                stroke={col > 6 ? "#cfd5de" : "none"}
                strokeWidth={1.5}
              />
            );
          }),
        )}
        {/* three saturation curves */}
        <rect x={1362} y={554} width={200} height={170} rx={4} fill={C.white} />
        <g stroke={C.ink} strokeWidth={3}>
          <line x1={1374} y1={562} x2={1374} y2={714} />
          <line x1={1374} y1={714} x2={1556} y2={714} />
          {[1416, 1460, 1504, 1548].map((x) => (
            <line key={x} x1={x} y1={714} x2={x} y2={722} />
          ))}
        </g>
        {[
          [
            C.blue,
            [
              [1394, 646],
              [1432, 604],
              [1472, 584],
              [1510, 578],
              [1548, 576],
            ],
          ],
          [
            C.greenMid,
            [
              [1394, 672],
              [1432, 648],
              [1472, 638],
              [1510, 634],
              [1548, 632],
            ],
          ],
          [
            C.yellow,
            [
              [1430, 684],
              [1472, 680],
              [1510, 678],
              [1548, 678],
            ],
          ],
        ].map(([color, pts]) => {
          const p = pts as number[][];
          return (
            <g key={color as string}>
              <path
                d={`M1376,712 ${p.map(([x, y]) => `L${x},${y}`).join(" ")}`}
                fill="none"
                stroke={color as string}
                strokeWidth={4}
                strokeLinejoin="round"
              />
              {p.map(([x, y]) => (
                <circle
                  key={x}
                  cx={x}
                  cy={y}
                  r={6.5}
                  fill={color as string}
                  stroke={C.white}
                  strokeWidth={1.5}
                />
              ))}
            </g>
          );
        })}
      </Panel>

      {/* 5. Multi-enzyme system assembly and testing */}
      <Panel
        x={553}
        y={465}
        w={493}
        h={310}
        fill={C.panelGreen}
        section="activity-assay"
        target="coupled-dhak-ppk2-assay"
        label="5. Multi-enzyme system assembly and testing"
      >
        <Title x={800} y={506} size={TITLE}>
          5. Multi-enzyme system
        </Title>
        <Title x={800} y={540} size={TITLE}>
          assembly and testing
        </Title>
        <Globule x={638} y={618} r={40} fill={C.blueMid} stroke={C.blue} />
        <g stroke={C.ink} strokeWidth={6} strokeLinecap="round">
          <line x1={694} y1={618} x2={718} y2={618} />
          <line x1={706} y1={606} x2={706} y2={630} />
        </g>
        <Globule x={772} y={618} r={40} fill={C.greenMid} stroke={C.green} />
        <ThinArrow x1={824} y1={618} x2={860} y2={618} width={5} />
        <Globule x={910} y={618} r={38} fill={C.blueMid} stroke={C.blue} />
        <Globule x={966} y={620} r={38} fill={C.greenMid} stroke={C.green} />
        {/* the coupled reaction read as a curve */}
        <rect
          x={662}
          y={674}
          width={38}
          height={86}
          rx={19}
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3}
        />
        <path d="M665,712 H697 V741 A16,16 0 0 1 665,741 Z" fill={C.yellow} />
        <path
          d="M714,700 C738,676 772,684 790,712"
          fill="none"
          stroke={C.ink}
          strokeWidth={4.5}
          strokeLinecap="round"
        />
        <path d="M778,708 L796,722 L798,700 Z" fill={C.ink} />
        <rect x={810} y={676} width={146} height={84} rx={3} fill={C.white} />
        <g stroke={C.ink} strokeWidth={3}>
          <line x1={816} y1={682} x2={816} y2={754} />
          <line x1={816} y1={754} x2={952} y2={754} />
        </g>
        <path
          d="M818,752 L836,734 L860,712 L886,700 L912,694 L938,694"
          fill="none"
          stroke={C.blue}
          strokeWidth={3.5}
        />
        {[
          [836, 734],
          [860, 712],
          [886, 700],
          [912, 694],
          [938, 694],
        ].map(([cx, cy]) => (
          <circle
            key={cx}
            cx={cx}
            cy={cy}
            r={6}
            fill={C.blueMid}
            stroke={C.blue}
            strokeWidth={2}
          />
        ))}
      </Panel>

      {/* 6. SpyTag–SpyCatcher channelling */}
      <Panel
        x={25}
        y={465}
        w={498}
        h={310}
        fill={C.panelBlue}
        section="computational-design"
        target="spytag-spycatcher-channelling"
        label="6. SpyTag–SpyCatcher channelling"
      >
        <Title x={50} y={512} size={TITLE} anchor="start">
          6. SpyTag–SpyCatcher channelling
        </Title>
        {/* substrate in */}
        {[
          [80, 578],
          [116, 552],
          [170, 584],
        ].map(([cx, cy]) => (
          <circle
            key={cx}
            cx={cx}
            cy={cy}
            r={14}
            fill={C.blueMid}
            stroke={C.blue}
            strokeWidth={2.5}
          />
        ))}
        <path
          d="M108,582 C128,584 142,594 150,612"
          fill="none"
          stroke={C.ink}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <path d="M141,606 L152,622 L159,604 Z" fill={C.ink} />
        <Globule x={186} y={666} r={56} fill={C.blueMid} stroke={C.blue} />
        {/* the SpyCatcher–SpyTag link between the two enzymes */}
        <rect x={244} y={640} width={20} height={42} rx={4} fill={C.blue} />
        <rect
          x={262}
          y={648}
          width={30}
          height={26}
          fill={C.bluePale}
          stroke={C.blue}
          strokeWidth={2}
        />
        <rect
          x={291}
          y={638}
          width={24}
          height={46}
          rx={6}
          fill={C.yellow}
          stroke={C.orange}
          strokeWidth={3}
        />
        <Globule x={366} y={664} r={58} fill={C.greenMid} stroke={C.green} />
        {/* substrate handed across */}
        <path
          d="M228,606 C246,570 290,570 306,604"
          fill="none"
          stroke={C.ink}
          strokeWidth={4}
          strokeDasharray="9 8"
          strokeLinecap="round"
        />
        <path d="M297,598 L309,616 L316,596 Z" fill={C.ink} />
        {/* product out */}
        <path
          d="M420,622 C430,604 440,594 452,588"
          fill="none"
          stroke={C.ink}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <path d="M444,582 L460,584 L452,598 Z" fill={C.ink} />
        {[
          [436, 556],
          [478, 576],
        ].map(([cx, cy]) => (
          <circle
            key={cx}
            cx={cx}
            cy={cy}
            r={15}
            fill={C.yellow}
            stroke={C.gold}
            strokeWidth={2.5}
          />
        ))}
      </Panel>

      {/* Arrows on top, as in the original, overlapping the panel edges. */}
      <BlockArrow x={574} y={205} />
      <BlockArrow x={1097} y={205} />
      <BlockArrow x={1345} y={428} angle={90} />
      <BlockArrow x={1062} y={634} angle={180} />
      <BlockArrow x={538} y={634} angle={180} />
    </WorkflowFigure>
  );
}
