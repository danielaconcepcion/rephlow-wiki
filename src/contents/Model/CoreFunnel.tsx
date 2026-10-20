/**
 * The reduction, as one picture: the genome-scale model narrows to the
 * handful of reactions a kinetic description actually needs. Each stage
 * is drawn in proportion to the one above it on a logarithmic scale —
 * 45 reactions out of 2,927 is otherwise a bar too thin to see — and the
 * figures themselves are printed, so the drawing never carries a number
 * the text does not.
 */
const STAGES = [
  {
    count: "2,927",
    label: "reactions in the model as used",
    note: "the genome-scale reconstruction of this page",
    width: 100,
  },
  {
    count: "166",
    label: "carry flux in the parsimonious solution",
    note: "5.67% of the network, pFBA with no threshold",
    width: 62,
  },
  {
    count: "45",
    label: "above 10⁻² mmol gDW⁻¹ h⁻¹",
    note: "1.54% — the kinetically relevant core",
    width: 36,
  },
  {
    count: "7",
    label: "functional modules",
    note: "transport · ED · TCA · respiration · ATP · redox · polyP",
    width: 20,
  },
];

export function CoreFunnel() {
  return (
    <figure className="core-funnel">
      <ol className="core-funnel__stages">
        {STAGES.map((stage, i) => (
          <li className="core-funnel__stage" key={stage.count}>
            <div
              className="core-funnel__bar"
              style={{ width: `${stage.width}%` }}
            >
              <span className="core-funnel__count">{stage.count}</span>
            </div>
            <div className="core-funnel__text">
              <span className="core-funnel__label">{stage.label}</span>
              <span className="core-funnel__note">{stage.note}</span>
            </div>
            {i < STAGES.length - 1 && (
              <span className="core-funnel__arrow" aria-hidden="true">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption>
        <strong>Figure 7.</strong> From the genome-scale model to the kinetic
        core. Bar widths are indicative, not to scale.
      </figcaption>
    </figure>
  );
}
