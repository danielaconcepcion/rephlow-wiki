import "./HeroObjects.css";

/**
 * Shared decorative "cream object" glyphs used both in each section's own
 * hero header and, at a smaller size, as the thumbnail on that section's
 * card in RouteIndex. Each glyph is self-contained (colours are baked in
 * rather than read from an ancestor's CSS custom properties) so it renders
 * identically regardless of which context it sits in — only the wrapper's
 * width, set by the caller's own CSS, changes between header and index
 * use. Compass, the voice network and the implementation route are plain
 * SVG, so they scale continuously just by changing that wrapper width.
 * The passport and the card fan are HTML/CSS objects with fixed detail
 * (padding, corner marks) that would look wrong just shrunk, so they take
 * an explicit `compact` flag instead: same composition, tilt and layered
 * depth, with only the secondary text/marks dropped at small size.
 */

export function CompassGlyph() {
  return (
    <svg className="hp-compass-glyph" viewBox="0 0 200 200" aria-hidden="true">
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="#f6f3ea"
        stroke="rgba(255,255,255,0.24)"
        strokeWidth="6"
      />
      <circle
        cx="100"
        cy="100"
        r="66"
        fill="none"
        stroke="rgba(44,114,135,0.12)"
        strokeWidth="1"
      />
      <g stroke="rgba(44,114,135,0.3)" strokeWidth="3" strokeLinecap="round">
        <line x1="100" y1="8" x2="100" y2="26" />
        <line x1="100" y1="174" x2="100" y2="192" />
        <line x1="8" y1="100" x2="26" y2="100" />
        <line x1="174" y1="100" x2="192" y2="100" />
      </g>
      <g stroke="rgba(44,114,135,0.14)" strokeWidth="2" strokeLinecap="round">
        <line x1="35.8" y1="35.8" x2="48" y2="48" />
        <line x1="164.2" y1="35.8" x2="152" y2="48" />
        <line x1="35.8" y1="164.2" x2="48" y2="152" />
        <line x1="164.2" y1="164.2" x2="152" y2="152" />
      </g>
      <g transform="rotate(-32 100 100)">
        <polygon points="100,26 111,100 100,110 89,100" fill="#d87552" />
        <polygon points="100,174 111,100 100,90 89,100" fill="#b8bac1" />
      </g>
      <circle cx="100" cy="100" r="9" fill="#f6f3ea" />
      <circle
        cx="100"
        cy="100"
        r="9"
        fill="none"
        stroke="rgba(44,114,135,0.3)"
        strokeWidth="2"
      />
    </svg>
  );
}

/** Section 2's object: a loose mesh of differently sized person,
 * organisation and environmental nodes. Connections run between several
 * neighbours rather than radiating from one hub, so the object reads as a
 * network of exchanged perspectives. Header and index share this markup. */
export function VoiceNetworkGlyph() {
  const nodes = [
    { id: "person-a", type: "person", x: 34, y: 42, r: 11 },
    { id: "organisation-a", type: "organisation", x: 105, y: 28, r: 15 },
    { id: "environment-a", type: "environment", x: 165, y: 48, r: 10 },
    { id: "organisation-b", type: "organisation", x: 45, y: 102, r: 14 },
    { id: "person-b", type: "person", x: 112, y: 92, r: 10 },
    { id: "environment-b", type: "environment", x: 170, y: 115, r: 13 },
    { id: "person-c", type: "person", x: 65, y: 158, r: 9 },
    { id: "environment-c", type: "environment", x: 123, y: 165, r: 11 },
    { id: "organisation-c", type: "organisation", x: 178, y: 164, r: 8 },
  ];

  const connections = [
    ["person-a", "organisation-a"],
    ["person-a", "organisation-b"],
    ["person-a", "person-b"],
    ["organisation-a", "environment-a"],
    ["organisation-a", "person-b"],
    ["environment-a", "environment-b"],
    ["organisation-b", "person-b"],
    ["organisation-b", "person-c"],
    ["organisation-b", "environment-c"],
    ["person-b", "environment-b"],
    ["person-b", "environment-c"],
    ["person-c", "environment-c"],
    ["environment-c", "environment-b"],
    ["environment-c", "organisation-c"],
    ["environment-b", "organisation-c"],
  ];

  const nodeById = new Map(nodes.map((node) => [node.id, node]));

  return (
    <svg
      className="hp-voice-network-glyph"
      viewBox="0 0 210 200"
      aria-hidden="true"
    >
      <g
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.55"
        strokeLinecap="round"
      >
        {connections.map(([fromId, toId]) => {
          const from = nodeById.get(fromId)!;
          const to = nodeById.get(toId)!;
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
            />
          );
        })}
      </g>

      {nodes.map(({ id, type, x, y, r }) => {
        const scale = r / 10;
        return (
          <g key={id}>
            <circle
              cx={x}
              cy={y}
              r={r}
              fill={type === "environment" ? "#edf4e8" : "#f6f3ea"}
            />

            {type === "person" && (
              <>
                <circle
                  cx={x}
                  cy={y - 2.6 * scale}
                  r={2.8 * scale}
                  fill="#685185"
                />
                <path
                  d={`M ${x - 4.6 * scale} ${y + 5 * scale} a ${4.6 * scale} ${4 * scale} 0 0 1 ${9.2 * scale} 0 Z`}
                  fill="#685185"
                />
              </>
            )}

            {type === "organisation" && (
              <>
                <path
                  d={`M ${x - 5.4 * scale} ${y - 1.6 * scale} L ${x} ${y - 6.4 * scale} L ${x + 5.4 * scale} ${y - 1.6 * scale}`}
                  fill="none"
                  stroke="#d39b34"
                  strokeWidth={1.5 * scale}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <rect
                  x={x - 4.4 * scale}
                  y={y - 1.6 * scale}
                  width={8.8 * scale}
                  height={6.6 * scale}
                  fill="none"
                  stroke="#d39b34"
                  strokeWidth={1.5 * scale}
                />
              </>
            )}

            {type === "environment" && (
              <g transform={`translate(${x} ${y}) scale(${scale})`}>
                <path d="M-5 2C-4-4 1-7 6-6 6-1 3 5-3 6Z" fill="#4f9562" />
                <path
                  d="M-4 5C-1 2 1 0 5-4"
                  fill="none"
                  stroke="#edf4e8"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

interface PassportGlyphProps {
  compact?: boolean;
}

/** Section 3's object: unchanged at full size. `compact` drops the
 * eyebrow/title/route text (unreadable at index-thumbnail scale) but
 * always keeps the stamp — the one detail that makes it read as a
 * passport rather than a plain card. */
export function PassportGlyph({ compact = false }: PassportGlyphProps) {
  return (
    <div
      className={`hp-passport${compact ? " hp-passport--compact" : ""}`}
      aria-hidden="true"
    >
      {!compact && (
        <>
          <span className="hp-passport__eyebrow">iGEM Madrid UCM 2026</span>
          <h3 className="hp-passport__title">Travel Archive</h3>
          <p className="hp-passport__route">
            Industry <span>→</span> environment <span>→</span> measurement{" "}
            <span>→</span> implementation <span>→</span> circularity.
          </p>
        </>
      )}
      <div className="hp-passport__stamp">
        {!compact && (
          <>
            Field
            <br />
            Evidence
            <br />
            rePhlow
          </>
        )}
      </div>
    </div>
  );
}

interface RouteProgressGlyphProps {
  compact?: boolean;
}

/** Section 4's object: a mountain crossed by a route with completed
 * checkpoints and a summit flag. The compact version keeps the same
 * silhouette and direction while dropping secondary detail at index size. */
export function RouteProgressGlyph({
  compact = false,
}: RouteProgressGlyphProps) {
  return (
    <svg
      className={`hp-route-progress-glyph${compact ? " hp-route-progress-glyph--compact" : ""}`}
      viewBox="0 0 260 220"
      aria-hidden="true"
    >
      <path
        className="hp-route-progress-glyph__mountain"
        d="M20 194 92 65c7-13 23-15 33-4l25 29 18-21c8-10 23-8 29 3l46 122Z"
      />
      {!compact && (
        <path
          className="hp-route-progress-glyph__ridge"
          d="m94 67 19 29 12-35m26 32 18 19 27-41"
        />
      )}
      <path
        className="hp-route-progress-glyph__route"
        d="M42 189c22-11 47-7 57-25 9-16-8-26 5-42 12-15 29-4 37-17 7-11 0-22 12-32"
      />
      <g className="hp-route-progress-glyph__checkpoints">
        <circle cx="55" cy="183" r={compact ? 12 : 9} />
        <path d="m51 183 3 3 6-7" />
        {!compact && (
          <>
            <circle cx="101" cy="153" r="9" />
            <path d="m97 153 3 3 6-7" />
          </>
        )}
        <circle cx="109" cy="113" r={compact ? 12 : 9} />
        <path d="m105 113 3 3 6-7" />
        {!compact && (
          <>
            <circle cx="151" cy="80" r="9" />
            <path d="m147 80 3 3 6-7" />
          </>
        )}
      </g>
      <g className="hp-route-progress-glyph__flag">
        <path className="hp-route-progress-glyph__flag-pole" d="M155 72V38" />
        <path
          className="hp-route-progress-glyph__flag-pennant"
          d="m155 39 28 8-28 10Z"
        />
      </g>
    </svg>
  );
}

interface CardFanGlyphProps {
  compact?: boolean;
}

/** Section 5's object: unchanged at full size (front Ace of Spades fully
 * visible, two cards peeking behind). `compact` drops the corner marks,
 * which blur into noise at thumbnail scale, keeping the suit glyph, the
 * tilt and the stacked depth. */
export function CardFanGlyph({ compact = false }: CardFanGlyphProps) {
  return (
    <div
      className={`hp-card-fan${compact ? " hp-card-fan--compact" : ""}`}
      aria-hidden="true"
    >
      <div className="hp-card-fan__card hp-card-fan__card--back-a" />
      <div className="hp-card-fan__card hp-card-fan__card--back-b" />
      <div className="hp-card-fan__card hp-card-fan__card--front">
        {!compact && (
          <span className="hp-card-fan__corner hp-card-fan__corner--tl">
            A♠
          </span>
        )}
        <span className="hp-card-fan__suit">♠</span>
        {!compact && (
          <span className="hp-card-fan__corner hp-card-fan__corner--br">
            A♠
          </span>
        )}
      </div>
    </div>
  );
}
