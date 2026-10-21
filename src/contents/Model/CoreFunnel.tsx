/**
 * The reduction, to scale: how many of the reconstruction's 2,927 reactions
 * survive each step down to the kinetic core.
 *
 * Drawn on a logarithmic axis, because the range is 2,927 to 7 and a linear
 * bar for seven reactions out of 2,927 is a hairline. The axis is printed
 * with its decades, each bar is labelled with its own count and its share of
 * the network, and both the count and the share come from the same pFBA and
 * FVA runs the rest of section 4 reports, so nothing here is "indicative".
 */
const TOTAL = 2927;

const STAGES = [
  {
    count: 2927,
    label: "in the reconstruction as used",
    note: "iJN1463, after the medium and the objective are set",
  },
  {
    count: 1985,
    label: "could carry flux (FVA, no threshold)",
    note: "the shape of the optimal solution space",
  },
  {
    count: 166,
    label: "carry flux in the parsimonious solution",
    note: "pFBA with no threshold",
  },
  {
    count: 45,
    label: "above 10⁻² mmol gDW⁻¹ h⁻¹",
    note: "the kinetically relevant core",
  },
  {
    count: 7,
    label: "functional modules after lumping",
    note: "transport, ED, TCA, respiration, ATP, redox, polyP",
  },
];

/* The axis runs 1 to 10,000, so one decade is a quarter of the width. */
const DECADES = [1, 10, 100, 1000, 10000];
const pct = (n: number) => (Math.log10(n) / 4) * 100;

export function CoreFunnel() {
  return (
    <figure className="corebar model-figbox">
      <div className="corebar__plot">
        <div className="corebar__grid" aria-hidden="true">
          {DECADES.map((d) => (
            <span
              key={d}
              className="corebar__gridline"
              style={{ left: `${pct(d)}%` }}
            />
          ))}
        </div>

        <ol className="corebar__rows">
          {STAGES.map((s) => (
            <li className="corebar__row" key={s.count}>
              <div className="corebar__text">
                <strong className="corebar__label">{s.label}</strong>
                <span className="corebar__note">{s.note}</span>
              </div>
              <div className="corebar__track">
                <div
                  className="corebar__bar"
                  style={{ width: `${pct(s.count)}%` }}
                >
                  <span className="corebar__count">
                    {s.count.toLocaleString("en-GB")}
                  </span>
                </div>
                <span
                  className="corebar__share"
                  style={{ left: `calc(${pct(s.count)}% + 10px)` }}
                >
                  {((s.count / TOTAL) * 100).toFixed(
                    s.count / TOTAL < 0.01 ? 2 : 1,
                  )}
                  %
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div className="corebar__axis" aria-hidden="true">
          {DECADES.map((d) => (
            <span
              key={d}
              className="corebar__tick"
              style={{ left: `${pct(d)}%` }}
            >
              {d.toLocaleString("en-GB")}
            </span>
          ))}
        </div>
        <p className="corebar__axis-label">reactions (logarithmic scale)</p>
      </div>

      <figcaption>
        <strong>Figure 7.</strong> From the genome-scale model to the kinetic
        core, to scale. The axis is logarithmic because the range is 2,927 down
        to 7: on a linear axis the last two bars would be invisible. Counts are
        from the pFBA and FVA runs of 4.1 and 4.2, and the percentage is of the
        2,927 reactions the model carries under this medium and objective.
      </figcaption>
    </figure>
  );
}
