import type { CSSProperties, ReactNode } from "react";

import { ACTIVITIES, BOARD_POSITION, BOARD_TIMELINE_Y } from "./educationData";
import type { Activity, BoardObject } from "./educationData";

/* --------------------------------------------------------------------------
   The board: nine objects pinned to a slate, joined by a chalk line that
   runs from November 2025 to July 2026. Every object is a link into the
   chronicle below.

   The objects are drawn, not photographed: each is a small piece of paper
   stock — a poster, a page of notes, a badge, a boarding card — built in
   container-query units so it scales with the board rather than with the
   viewport, the same technique the Collaboration tables use. Where the
   team has the real artwork, the object carries it inside its frame.
   -------------------------------------------------------------------------- */

type S = CSSProperties;

/** Absolutely-positioned fragment inside an object's own box. */
function P({ s, children }: { s: S; children?: ReactNode }) {
  return <span style={{ position: "absolute", ...s }}>{children}</span>;
}

/** Two strips of masking tape, the way everything ends up on a board. */
function Tape({ s }: { s: S }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        background: "rgba(246, 240, 219, 0.5)",
        boxShadow: "0 0.4cqw 0.8cqw rgba(0, 0, 0, 0.18)",
        ...s,
      }}
    />
  );
}

/** The image an object carries, or a chalk-drawn stand-in while the team
 * still has to upload it — never an empty frame. */
function Sheet({ src, alt, style }: { src?: string; alt: string; style?: S }) {
  if (!src) {
    return (
      <span className="ec-object__blank" style={style}>
        <svg viewBox="0 0 60 80" aria-hidden="true">
          <path
            d="M10 64 L22 40 L31 54 L39 30 L50 64 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle
            cx="30"
            cy="18"
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      </span>
    );
  }
  return (
    <span className="ec-object__photo" style={style}>
      <img src={src} alt={alt} loading="lazy" />
    </span>
  );
}

/* --- the nine pieces of paper ------------------------------------------- */

function PosterArt({ activity }: { activity: Activity }) {
  return (
    <span className="ec-art" style={{ aspectRatio: "0.74" }}>
      <Tape
        s={{
          left: "16%",
          top: "-4%",
          width: "30%",
          height: "9%",
          transform: "rotate(-6deg)",
        }}
      />
      <Tape
        s={{
          right: "14%",
          top: "-3%",
          width: "26%",
          height: "8%",
          transform: "rotate(5deg)",
        }}
      />
      <P
        s={{
          inset: 0,
          background: "#f7f2e6",
          padding: "3cqw",
          display: "flex",
        }}
      >
        <Sheet src={activity.boardImage} alt="" style={{ flex: 1 }} />
      </P>
    </span>
  );
}

function NotesArt({ activity }: { activity: Activity }) {
  const line = (w: string, t: string): S => ({
    left: "9cqw",
    top: t,
    width: w,
    height: "0.9cqw",
    borderRadius: "1cqw",
    background: "rgba(42, 60, 92, 0.3)",
  });
  return (
    <span className="ec-art" style={{ aspectRatio: "0.78" }}>
      <Tape
        s={{
          left: "30%",
          top: "-4%",
          width: "40%",
          height: "8%",
          transform: "rotate(2deg)",
        }}
      />
      <P
        s={{
          inset: 0,
          background:
            "repeating-linear-gradient(transparent 0 7.4cqw, rgba(60, 90, 140, 0.16) 7.4cqw 8.2cqw), #fbf8ee",
          overflow: "hidden",
        }}
      >
        <P
          s={{
            left: "6cqw",
            top: 0,
            bottom: 0,
            width: "0.7cqw",
            background: "rgba(190, 70, 70, 0.4)",
          }}
        />
        <P
          s={{
            left: "9cqw",
            top: "6cqw",
            font: "700 7cqw/1 var(--font-display)",
            color: "#2a3c5c",
          }}
        >
          IES Alameda
        </P>
        <P s={line("54cqw", "20cqw")} />
        <P s={line("62cqw", "28cqw")} />
        <P s={line("40cqw", "36cqw")} />
        <Sheet
          src={activity.boardImage}
          alt=""
          style={{
            position: "absolute",
            left: "16cqw",
            top: "46cqw",
            width: "68cqw",
            aspectRatio: "4 / 3",
            transform: "rotate(-3deg)",
          }}
        />
      </P>
    </span>
  );
}

function AwardPosterArt({
  activity,
  accent,
}: {
  activity: Activity;
  accent: string;
}) {
  return (
    <span className="ec-art" style={{ aspectRatio: "0.76" }}>
      <Tape
        s={{
          left: "12%",
          top: "-4%",
          width: "28%",
          height: "9%",
          transform: "rotate(-8deg)",
        }}
      />
      <P
        s={{
          inset: 0,
          background: "#f7f2e6",
          padding: "5cqw",
          display: "flex",
          flexDirection: "column",
          gap: "3cqw",
        }}
      >
        <Sheet src={activity.boardImage} alt="" style={{ flex: 1 }} />
        <span
          style={{ font: "700 6.4cqw/1.05 var(--font-display)", color: accent }}
        >
          Monólogos de Ciencia
        </span>
      </P>
      {/* the 1st-prize sticker */}
      <P
        s={{
          right: "-8cqw",
          bottom: "6cqw",
          width: "34cqw",
          height: "34cqw",
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 34%, #f6d365, #d79a24)",
          boxShadow: "0 0.8cqw 1.4cqw rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(-12deg)",
          color: "#4a3209",
          textAlign: "center",
        }}
      >
        <span style={{ font: "800 11cqw/1 var(--font-display)" }}>1st</span>
        <span
          style={{
            font: "700 5.4cqw/1 var(--font-body)",
            letterSpacing: "0.04em",
          }}
        >
          PRIZE
        </span>
      </P>
    </span>
  );
}

function BadgeArt({ activity }: { activity: Activity }) {
  return (
    <span className="ec-art" style={{ aspectRatio: "0.72" }}>
      <P
        s={{
          left: "40%",
          top: "-10%",
          width: "20%",
          height: "14%",
          border: "1.4cqw solid rgba(220,220,214,0.6)",
          borderRadius: "50%",
        }}
      />
      <P
        s={{
          inset: 0,
          background: "#fbf8ee",
          borderRadius: "2cqw",
          padding: "6cqw 5cqw",
          display: "flex",
          flexDirection: "column",
          gap: "3cqw",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <P
          s={{
            left: "38cqw",
            top: "2.5cqw",
            width: "24cqw",
            height: "2.6cqw",
            borderRadius: "2cqw",
            background: "#d9d3c4",
          }}
        />
        <span
          style={{
            font: "600 4.8cqw/1 var(--font-body)",
            color: "#8a8372",
            letterSpacing: "0.12em",
          }}
        >
          SPEAKER
        </span>
        <Sheet
          src={activity.boardImage}
          alt=""
          style={{ width: "100%", aspectRatio: "4 / 3" }}
        />
        <span
          style={{
            font: "700 6.2cqw/1.05 var(--font-display)",
            color: "#2a3c5c",
          }}
        >
          IES Humanejos
        </span>
        <span
          style={{
            marginTop: "auto",
            font: "500 4.4cqw/1 var(--font-body)",
            color: "#8a8372",
          }}
        >
          04 · 03 · 2026
        </span>
      </P>
    </span>
  );
}

function PostcardArt({
  activity,
  accent,
}: {
  activity: Activity;
  accent: string;
}) {
  return (
    <span className="ec-art" style={{ aspectRatio: "1.62" }}>
      <Tape
        s={{
          left: "-3%",
          top: "26%",
          width: "16%",
          height: "13%",
          transform: "rotate(-24deg)",
        }}
      />
      <P
        s={{
          inset: 0,
          background: "#fbf8ee",
          borderRadius: "1.2cqw",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            flex: "1 1 58%",
            padding: "4cqw",
            display: "flex",
            flexDirection: "column",
            gap: "2cqw",
          }}
        >
          <span
            style={{
              font: "700 7cqw/1 var(--font-display)",
              color: accent,
              letterSpacing: "-0.02em",
            }}
          >
            MAD → CPH
          </span>
          <span
            style={{
              font: "500 3.6cqw/1.3 var(--font-body)",
              color: "#6d6657",
            }}
          >
            DIS Abroad Scandinavia · Compluemprende
          </span>
          <Sheet
            src={activity.boardImage}
            alt=""
            style={{ flex: 1, marginTop: "1cqw" }}
          />
        </span>
        <span
          style={{
            flex: "0 0 30%",
            borderLeft: "0.5cqw dashed rgba(42,60,92,0.3)",
            padding: "4cqw 2.4cqw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              font: "600 3.4cqw/1.1 var(--font-body)",
              color: "#8a8372",
              textAlign: "center",
            }}
          >
            16 MAR
            <br />
            2026
          </span>
          <span
            style={{
              width: "100%",
              height: "26%",
              background:
                "repeating-linear-gradient(90deg, #2a3c5c 0 0.7cqw, transparent 0.7cqw 1.5cqw, #2a3c5c 1.5cqw 2cqw, transparent 2cqw 3cqw)",
            }}
          />
        </span>
      </P>
    </span>
  );
}

/** A loosely rolled demo sheet, with the dyed-bead drawing on it. */
function DemoSheetArt({ accent }: { accent: string }) {
  return (
    <span className="ec-art" style={{ aspectRatio: "0.92" }}>
      <Tape
        s={{
          left: "24%",
          top: "-4%",
          width: "34%",
          height: "8%",
          transform: "rotate(-4deg)",
        }}
      />
      <P
        s={{
          inset: 0,
          background: "#faf5e8",
          borderRadius: "1cqw 1cqw 3cqw 3cqw",
          padding: "5cqw",
          display: "flex",
          flexDirection: "column",
          gap: "2.4cqw",
        }}
      >
        <span
          style={{ font: "700 6.4cqw/1 var(--font-display)", color: accent }}
        >
          Alginate beads
        </span>
        <svg
          viewBox="0 0 120 90"
          aria-hidden="true"
          style={{ width: "100%", height: "auto" }}
        >
          <path
            d="M14 10 h22 v16 a11 11 0 0 1-3 7 l-6 6 v30 a7 7 0 0 1-7 7 h-0 a7 7 0 0 1-7-7 V39 l-6-6 a11 11 0 0 1-3-7 Z"
            fill="none"
            stroke="#2a3c5c"
            strokeWidth="2"
          />
          <circle cx="25" cy="66" r="3.4" fill="#5aa0b8" />
          <circle cx="18" cy="72" r="3" fill="#5aa0b8" />
          <circle cx="31" cy="73" r="2.6" fill="#5aa0b8" />
          <path d="M48 44 h18" stroke="#2a3c5c" strokeWidth="2" />
          <path
            d="M60 38 l7 6 -7 6"
            fill="none"
            stroke="#2a3c5c"
            strokeWidth="2"
          />
          <circle
            cx="90"
            cy="44"
            r="20"
            fill="none"
            stroke="#2a3c5c"
            strokeWidth="2"
          />
          <circle cx="90" cy="44" r="13" fill="#6f5fa8" opacity="0.75" />
          <circle cx="84" cy="38" r="2.4" fill="#f7f2e6" opacity="0.8" />
        </svg>
        <span
          style={{ font: "500 3.8cqw/1.3 var(--font-body)", color: "#6d6657" }}
        >
          live synthesis · dye uptake
        </span>
      </P>
    </span>
  );
}

function ConferencePosterArt({ activity }: { activity: Activity }) {
  const rosette = (left: string, rotate: string): S => ({
    left,
    bottom: "-6cqw",
    width: "24cqw",
    height: "24cqw",
    borderRadius: "50%",
    background: "radial-gradient(circle at 38% 34%, #9fc6e8, #4a7fae)",
    transform: `rotate(${rotate})`,
    boxShadow: "0 0.8cqw 1.2cqw rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    font: "700 4.4cqw/1 var(--font-body)",
    color: "#f7f2e6",
    textAlign: "center",
    padding: "2cqw",
  });
  return (
    <span className="ec-art" style={{ aspectRatio: "0.74" }}>
      <Tape
        s={{
          left: "14%",
          top: "-3%",
          width: "28%",
          height: "8%",
          transform: "rotate(-5deg)",
        }}
      />
      <Tape
        s={{
          right: "12%",
          top: "-4%",
          width: "28%",
          height: "8%",
          transform: "rotate(6deg)",
        }}
      />
      <P
        s={{
          inset: 0,
          background: "#f7f2e6",
          padding: "3cqw",
          display: "flex",
        }}
      >
        <Sheet src={activity.boardImage} alt="" style={{ flex: 1 }} />
      </P>
      <P s={rosette("6cqw", "-10deg")}>
        best
        <br />
        poster
      </P>
      <P s={rosette("34cqw", "8deg")}>
        best
        <br />
        talk
      </P>
    </span>
  );
}

function ProgrammeArt({
  activity,
  accent,
}: {
  activity: Activity;
  accent: string;
}) {
  return (
    <span className="ec-art" style={{ aspectRatio: "0.8" }}>
      <Tape
        s={{
          left: "30%",
          top: "-4%",
          width: "38%",
          height: "8%",
          transform: "rotate(3deg)",
        }}
      />
      <P
        s={{
          inset: 0,
          background: "#f7f2e6",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            flex: 1,
            padding: "5cqw 4cqw",
            display: "flex",
            flexDirection: "column",
            gap: "2.4cqw",
          }}
        >
          <span
            style={{
              font: "600 4cqw/1 var(--font-body)",
              color: "#8a8372",
              letterSpacing: "0.1em",
            }}
          >
            MEH · BURGOS
          </span>
          <span
            style={{
              font: "700 7.4cqw/1.02 var(--font-display)",
              color: accent,
            }}
          >
            The Cycle…
            <br />
            Without End?
          </span>
          <Sheet
            src={activity.boardImage}
            alt=""
            style={{ flex: 1, marginTop: "1cqw" }}
          />
          <span
            style={{ font: "500 3.8cqw/1 var(--font-body)", color: "#6d6657" }}
          >
            11 June 2026
          </span>
        </span>
        {/* the fold */}
        <span
          style={{
            flex: "0 0 6%",
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.12), transparent 70%)",
          }}
        />
      </P>
    </span>
  );
}

function WristbandArt({ activity }: { activity: Activity }) {
  return (
    <span className="ec-art" style={{ aspectRatio: "0.96" }}>
      <Sheet
        src={activity.boardImage}
        alt=""
        style={{
          position: "absolute",
          left: "4cqw",
          top: "2cqw",
          width: "90cqw",
          aspectRatio: "4 / 3",
          transform: "rotate(-3deg)",
        }}
      />
      <Tape
        s={{
          left: "32%",
          top: "-3%",
          width: "36%",
          height: "8%",
          transform: "rotate(-3deg)",
        }}
      />
      <P
        s={{
          left: "-6cqw",
          bottom: "4cqw",
          width: "112cqw",
          height: "17cqw",
          transform: "rotate(-7deg)",
          borderRadius: "9cqw",
          background: "linear-gradient(90deg, #7aa86b, #a7c98a 45%, #7aa86b)",
          boxShadow: "0 0.8cqw 1.2cqw rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          font: "700 6.4cqw/1 var(--font-display)",
          color: "#1f3318",
          letterSpacing: "0.06em",
        }}
      >
        LAMARR CAMP
      </P>
    </span>
  );
}

const ART: Record<BoardObject, (a: Activity, accent: string) => ReactNode> = {
  poster: (a) => <PosterArt activity={a} />,
  notes: (a) => <NotesArt activity={a} />,
  "award-poster": (a, accent) => (
    <AwardPosterArt activity={a} accent={accent} />
  ),
  badge: (a) => <BadgeArt activity={a} />,
  postcard: (a, accent) => <PostcardArt activity={a} accent={accent} />,
  "demo-sheet": (_a, accent) => <DemoSheetArt accent={accent} />,
  "conference-poster": (a) => <ConferencePosterArt activity={a} />,
  programme: (a, accent) => <ProgrammeArt activity={a} accent={accent} />,
  wristband: (a) => <WristbandArt activity={a} />,
};

/** The chalk timeline: one line ruled across the board, with a tick up or
 * down to each object and a node where they meet. Drawn in the board's own
 * 0–100 space, so it follows BOARD_POSITION without measuring anything. */
function ChalkLine() {
  const y = BOARD_TIMELINE_Y;
  // A ruled line, but ruled by hand: three gentle waves across the board.
  const line = `M 1 ${y + 0.6} C 25 ${y - 1.2}, 40 ${y + 1.4}, 58 ${y - 0.4} S 86 ${y + 1.2}, 99 ${y - 0.3}`;
  return (
    <svg
      className="ec-board__line"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={line} className="ec-board__line-path" />
      {ACTIVITIES.map((activity) => {
        const [left, top, width] = BOARD_POSITION[activity.id];
        const x = left + width / 2;
        const above = top < y;
        return (
          <g key={activity.id}>
            <path
              d={`M ${x} ${y} L ${x + (above ? -0.4 : 0.4)} ${above ? y - 5 : y + 5}`}
              className="ec-board__tick"
            />
            <circle cx={x} cy={y} r="0.6" className="ec-board__node" />
          </g>
        );
      })}
      {/* The arrowhead the line ends on — time runs this way. */}
      <path
        d={`M 97 ${y - 1.9} L 99.4 ${y - 0.3} L 97 ${y + 1.4}`}
        className="ec-board__tick"
      />
    </svg>
  );
}

/** Chalk marginalia: the formulas, arrows and half-erased sketches a
 * board of this kind actually carries. Decorative only. */
function ChalkMarks() {
  return (
    <div className="ec-board__marks" aria-hidden="true">
      <span className="ec-chalk ec-chalk--title">
        Education &amp; Communication
      </span>
      <span
        className="ec-chalk ec-chalk--formula"
        style={{ right: "3%", top: "3.5%", left: "auto" }}
      >
        PO₄³⁻ + cells → polyP
      </span>
      <span
        className="ec-chalk ec-chalk--small"
        style={{ left: "1.5%", top: "55.5%" }}
      >
        s = minor / major
      </span>
      <span
        className="ec-chalk ec-chalk--small"
        style={{ right: "3%", top: "72%", left: "auto" }}
      >
        2 √(A/π)
      </span>
      <svg
        className="ec-chalk-sketch"
        style={{ left: "2.5%", top: "62%", width: "6.5%" }}
        viewBox="0 0 60 70"
      >
        <path d="M22 4 h16 v12 a9 9 0 0 1-2 6 l-5 5 v30 a6 6 0 0 1-6 6 h-0 a6 6 0 0 1-6-6 V27 l-5-5 a9 9 0 0 1-2-6 Z" />
        <path d="M16 50 q14 6 28 0" />
      </svg>
      <svg
        className="ec-chalk-sketch"
        style={{ left: "24.5%", top: "70%", width: "6.5%" }}
        viewBox="0 0 60 60"
      >
        <circle cx="30" cy="30" r="20" />
        <circle cx="30" cy="30" r="11" />
        <path d="M30 10 v6 M30 44 v6 M10 30 h6 M44 30 h6" />
      </svg>
      <span
        className="ec-erase"
        style={{ left: "16%", top: "24%", width: "20%", height: "16%" }}
      />
      <span
        className="ec-erase"
        style={{ left: "58%", top: "74%", width: "18%", height: "14%" }}
      />
      <span
        className="ec-erase"
        style={{
          left: "36%",
          top: "40%",
          width: "16%",
          height: "10%",
          transform: "rotate(-8deg)",
        }}
      />
    </div>
  );
}

export function Blackboard({
  accent,
  onSelect,
}: {
  accent: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="ec-board-frame">
      <div className="ec-board">
        <ChalkMarks />
        <ChalkLine />
        {ACTIVITIES.map((activity, index) => {
          const [left, top, width] = BOARD_POSITION[activity.id];
          return (
            <a
              key={activity.id}
              className="ec-object"
              href={`#${activity.id}`}
              style={{ left: `${left}%`, top: `${top}%`, width: `${width}%` }}
              onClick={(event) => {
                event.preventDefault();
                onSelect(activity.id);
              }}
            >
              {ART[activity.object](activity, accent)}
              <span className="ec-object__label">
                <span className="ec-object__index">{index + 1}</span>
                <span className="ec-object__name">{activity.chalk}</span>
                <span className="ec-object__date">{activity.date}</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
