/* --------------------------------------------------------------------------
   The three containment layers named in "Safety in our solution", drawn as
   nested rings around the engineered bacteria: immobilisation (inside),
   capsule recovery, downstream filtration (outside).
   -------------------------------------------------------------------------- */

const LAYERS = [
  { label: "Downstream filtration", r: 92, fill: "#e6f0ee", stroke: "#2E7D86" },
  { label: "Capsule recovery", r: 66, fill: "#d3e6df", stroke: "#4f9a8f" },
  { label: "Immobilisation", r: 40, fill: "#c1dbc4", stroke: "#7C9A4E" },
];

const BACTERIA: [number, number, number][] = [
  [-10, -6, -30],
  [9, 4, 25],
  [-4, 12, 70],
];

export function ContainmentLayers() {
  return (
    <figure className="sf-layers">
      <svg
        viewBox="-100 -100 200 200"
        role="img"
        aria-labelledby="sf-layers-title"
      >
        <title id="sf-layers-title">
          Three layers of physical containment around the engineered bacteria:
          immobilisation, capsule recovery and downstream filtration.
        </title>
        {LAYERS.map((l, i) => (
          <circle
            key={l.label}
            r={l.r}
            fill={l.fill}
            stroke={l.stroke}
            strokeWidth={1.6}
            strokeDasharray={i === 0 ? "5 4" : undefined}
          />
        ))}
        {BACTERIA.map(([x, y, rot]) => (
          <ellipse
            key={`${x},${y}`}
            cx={x}
            cy={y}
            rx={7}
            ry={3.6}
            transform={`rotate(${rot} ${x} ${y})`}
            fill="#7C9A4E"
          />
        ))}
      </svg>
      <ol className="sf-layers__legend">
        {[...LAYERS].reverse().map((l, i) => (
          <li key={l.label}>
            <span
              className="sf-layers__swatch"
              style={{ background: l.fill, borderColor: l.stroke }}
            />
            <span className="sf-layers__n">{i + 1}</span>
            {l.label}
          </li>
        ))}
      </ol>
    </figure>
  );
}
