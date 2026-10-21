import type { ReactNode } from "react";
import {
  BlockArrow,
  C,
  Title,
  WorkflowFigure,
} from "../Experiments/workflowFigures/shared";
import { Flask } from "../Experiments/workflowFigures/parts";

/* --------------------------------------------------------------------------
   Figure 17 — the loop this page ends on, drawn on the same grid as the
   workflow figure at the top of the page: four stages, two columns, and an
   arrow back to the start, because the point is that it closes.
   -------------------------------------------------------------------------- */

const TITLE = 34;
const SUB = 24;
const COL = [
  { x: 8, w: 484, cx: 250 },
  { x: 530, w: 485, cx: 772 },
];
const ROW = [
  { y: 8, h: 314, title: 66, sub: 290 },
  { y: 369, h: 313, title: 428, sub: 650 },
];

function Stage({
  col,
  row,
  fill,
  children,
}: {
  col: number;
  row: number;
  fill: string;
  children: ReactNode;
}) {
  const { x, w } = COL[col];
  const { y, h } = ROW[row];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={34} fill={fill} />
      {children}
    </g>
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

export function DbtlLoop() {
  return (
    <div className="dbtl">
      <WorkflowFigure
        viewBox="0 0 1023 694"
        label="A four-stage loop: a model prediction selects a measurement to prioritise, the measurement calibrates a parameter, the calibrated parameter updates the model, and the updated model makes the next prediction"
        caption={
          <>
            <strong>Figure 17.</strong> What this page is for. Each stage
            narrows the next: the model does not have to be right to be useful,
            it has to be wrong in a way that tells us what to measure.
          </>
        }
      >
        {/* 1 — the prediction */}
        <Stage col={0} row={0} fill={C.panelGreen}>
          <Title x={250} y={ROW[0].title} size={TITLE}>
            1. Model prediction
          </Title>
          <rect
            x={120}
            y={96}
            width={260}
            height={132}
            rx={12}
            fill={C.white}
            stroke={C.ink}
            strokeWidth={3}
          />
          <path
            d="M146 206C178 198 196 168 226 152S300 134 356 130"
            fill="none"
            stroke={C.blue}
            strokeWidth={6}
            strokeLinecap="round"
          />
          <path
            d="M146 212C190 210 222 196 254 178S332 150 356 146"
            fill="none"
            stroke={C.gold}
            strokeWidth={6}
            strokeLinecap="round"
          />
          <g stroke={C.ink} strokeWidth={3} strokeLinecap="round">
            <line x1={146} y1={118} x2={146} y2={214} />
            <line x1={146} y1={214} x2={358} y2={214} />
          </g>
          <Subtitle x={250} y={ROW[0].sub}>
            what the model says happens
          </Subtitle>
        </Stage>
        <BlockArrow x={511} y={165} />

        {/* 2 — the measurement it points at */}
        <Stage col={1} row={0} fill={C.panelSlate}>
          <Title x={772} y={ROW[0].title} size={TITLE}>
            2. Measurement
          </Title>
          <Flask
            x={706}
            top={98}
            w={94}
            h={152}
            liquid={C.greenLight}
            level={0.5}
          />
          <g transform="translate(806 96)">
            <rect
              x={0}
              y={0}
              width={96}
              height={150}
              rx={9}
              fill={C.white}
              stroke={C.ink}
              strokeWidth={3}
            />
            <rect
              x={24}
              y={-9}
              width={48}
              height={19}
              rx={7}
              fill={C.steelDark}
            />
            <rect
              x={19}
              y={40}
              width={58}
              height={9}
              rx={4.5}
              fill={C.blueMid}
            />
            <rect
              x={19}
              y={66}
              width={48}
              height={9}
              rx={4.5}
              fill={C.greenMid}
            />
            <rect x={19} y={92} width={62} height={9} rx={4.5} fill={C.gold} />
            <rect
              x={19}
              y={118}
              width={38}
              height={9}
              rx={4.5}
              fill={C.orange}
            />
          </g>
          <Subtitle x={772} y={ROW[0].sub}>
            what to measure first
          </Subtitle>
        </Stage>
        <BlockArrow x={772} y={345} angle={90} />

        {/* 3 — the parameter it pins down */}
        <Stage col={1} row={1} fill={C.panelGreen}>
          <Title x={772} y={ROW[1].title} size={TITLE}>
            3. Calibration
          </Title>
          <g transform="translate(666 462)">
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <line
                  x1={0}
                  y1={22 + i * 50}
                  x2={212}
                  y2={22 + i * 50}
                  stroke={C.ink}
                  strokeWidth={6}
                  strokeLinecap="round"
                  opacity={0.25}
                />
                <circle
                  cx={[62, 150, 104][i]}
                  cy={22 + i * 50}
                  r={17}
                  fill={[C.blue, C.green, C.gold][i]}
                  stroke={C.ink}
                  strokeWidth={3}
                />
              </g>
            ))}
          </g>
          <Subtitle x={772} y={ROW[1].sub}>
            numbers from our own data
          </Subtitle>
        </Stage>
        <BlockArrow x={511} y={528} angle={180} />

        {/* 4 — the model the loop hands back */}
        <Stage col={0} row={1} fill={C.panelSlate}>
          <Title x={250} y={ROW[1].title} size={TITLE}>
            4. Updated model
          </Title>
          <g transform="translate(150 460)">
            <g stroke={C.ink} strokeWidth={2.8}>
              <line x1={18} y1={52} x2={76} y2={26} />
              <line x1={76} y1={26} x2={134} y2={54} />
              <line x1={18} y1={52} x2={60} y2={108} />
              <line x1={134} y1={54} x2={92} y2={112} />
              <line x1={60} y1={108} x2={92} y2={112} />
            </g>
            <g fill={C.blueLight} stroke={C.ink} strokeWidth={2.8}>
              {[
                [18, 52],
                [76, 26],
                [134, 54],
                [60, 108],
                [92, 112],
              ].map(([cx, cy]) => (
                <circle key={`${cx}`} cx={cx} cy={cy} r={14} />
              ))}
            </g>
            <path
              d="M152 86l20 21 38-45"
              fill="none"
              stroke={C.green}
              strokeWidth={11}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <Subtitle x={250} y={ROW[1].sub}>
            a sharper next prediction
          </Subtitle>
        </Stage>
        <BlockArrow x={250} y={345} angle={270} />
      </WorkflowFigure>
    </div>
  );
}
