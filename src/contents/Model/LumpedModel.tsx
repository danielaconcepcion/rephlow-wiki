import { useState } from "react";
import { InlineMath } from "../../components/Math";

/**
 * The reduced model after lumping, as a diagram you can interrogate:
 * seven modules, the flux pFBA puts through each, and — on hover, focus
 * or tap — the reactions that were grouped into it, what goes in and
 * out, the shape of its rate law and the parameters that law carries.
 *
 * Redrawn from the thesis's own lumped map rather than reproduced: the
 * geometry here is the wiki's (three columns — carbon, energy,
 * phosphorus — in the order the cell uses them), while the groupings,
 * stoichiometry and fluxes are the thesis's.
 */

interface Module {
  id: string;
  title: string;
  /** pFBA flux, mmol gDW⁻¹ h⁻¹, as the lumped map reports it. */
  flux: string;
  column: 0 | 1 | 2;
  row: number;
  reactions: string;
  inputs: string;
  outputs: string;
  /** The rate law's shape, as TeX. */
  law: string;
  lawNote: string;
  /** The parameters that law carries: TeX, then what they are. */
  parameters: string;
  parametersNote: string;
}

const MODULES: Module[] = [
  {
    id: "ed",
    title: "Glucose uptake and Entner–Doudoroff",
    flux: "0.599",
    column: 0,
    row: 0,
    reactions:
      "MACRO_ED — one net reaction standing for the whole sequential ED route (glucose transport, GLCDpp, GNK, EDD, EDA and the lower EMP steps), which flux coupling shows operate as a unit.",
    inputs: "glucose, ADP, Pᵢ, NAD⁺, Q8",
    outputs: "pyruvate, ATP, NADH, Q8H₂, H₂O, H⁺",
    law: "v = V_{\\max}\\,\\prod_i \\frac{[S_i]}{K_{m,i}+[S_i]}",
    lawNote:
      "Irreversible multi-substrate Michaelis–Menten, with product inhibition by ATP, NADH and Q8H₂.",
    parameters: "V_{\\max},\\ K_{m,i},\\ K_i",
    parametersNote:
      "one saturation constant per substrate, one inhibition constant per inhibiting product",
  },
  {
    id: "tca",
    title: "TCA cycle",
    flux: "1.20",
    column: 0,
    row: 1,
    reactions:
      "MACRO_TCA — pyruvate dehydrogenase and the full cycle (CS, ACONTa/b, ICDHyr, AKGDH, SUCOAS, SUCDi, FUM, MDH) as one net reaction, kept apart from ED because the cycle is not structurally coupled: it branches at the nodes that feed biomass precursors.",
    inputs: "pyruvate, ADP, Pᵢ, NAD⁺, Q8, H₂O",
    outputs: "CO₂ (×3), ATP, NADH (×4), Q8H₂, H⁺",
    law: "v = V_{\\max}\\,\\prod_i \\frac{[S_i]}{K_{m,i}+[S_i]}",
    lawNote:
      "Same multi-substrate form as ED, on pyruvate and the redox cofactors.",
    parameters: "V_{\\max},\\ K_{m,i},\\ K_i",
    parametersNote:
      "one saturation constant per substrate, one inhibition constant per inhibiting product",
  },
  {
    id: "respiration",
    title: "Respiratory chain",
    flux: "5.39 / 7.18",
    column: 1,
    row: 0,
    reactions:
      "NADH16pp (5.39) and CYTBO3_4pp (7.18), with O2tpp (3.59) bringing oxygen in. Kept as its own module: the respiratory reactions are not strictly coupled to the carbon routes, so the model can still trade redox state against the electron acceptor available.",
    inputs: "NADH, Q8H₂, O₂, H⁺",
    outputs: "NAD⁺, Q8, H₂O, H⁺ pumped to the periplasm",
    law: "v = V_{\\max}\\,\\frac{[\\mathrm{NADH}]}{K_m+[\\mathrm{NADH}]}\\,\\frac{[\\mathrm{Q8}]}{K_m'+[\\mathrm{Q8}]}",
    lawNote:
      "One multi-substrate term per complex — NADH and Q8 for the dehydrogenase, Q8H₂ and O₂ for the oxidase.",
    parameters: "V_{\\max},\\ K_{m,i}",
    parametersNote: "per substrate, for each of the two complexes",
  },
  {
    id: "atp-synthase",
    title: "ATP synthase",
    flux: "11.9",
    column: 1,
    row: 1,
    reactions: "ATPS4rpp — the proton-motive force spent back into ATP.",
    inputs: "ADP, Pᵢ, H⁺ (periplasm)",
    outputs: "ATP, H₂O, H⁺ (cytoplasm)",
    law: "v = V_{\\max}\\left(\\frac{[\\mathrm{ADP}][\\mathrm{P_i}]}{K_{m}} - \\frac{[\\mathrm{ATP}]}{K_{eq}}\\right)",
    lawNote:
      "A reversible, macroscopic law: the pH gradient and the membrane potential are not modelled explicitly, so this is an effective description of the rotary mechanism, not a mechanistic one.",
    parameters: "V_{\\max},\\ K_m,\\ K_{eq}",
    parametersNote: "an equilibrium constant in place of the gradient",
  },
  {
    id: "maintenance",
    title: "ATP maintenance",
    flux: "0.920",
    column: 1,
    row: 2,
    reactions:
      "ATPM — the non-growth-associated demand, the ATP the cell spends on staying alive rather than on building anything.",
    inputs: "ATP, H₂O",
    outputs: "ADP, Pᵢ, H⁺",
    law: "v = v_{\\mathrm{ATPM}}",
    lawNote:
      "A fixed drain rather than a saturating law: it is a demand the model has to meet, not an enzyme it has to describe.",
    parameters: "v_{\\mathrm{ATPM}}",
    parametersNote: "a single constant demand",
  },
  {
    id: "pi-transport",
    title: "Phosphate transport",
    flux: "7.00 / 3.00",
    column: 2,
    row: 0,
    reactions:
      "PItex (7.00) and PIt2rpp (7.00), the low-affinity Pit symport driven by the proton gradient, and PIabc (3.00), the high-affinity ABC route that pays for its own uptake with ATP.",
    inputs: "Pᵢ (medium), H⁺ or ATP",
    outputs: "Pᵢ (cytoplasm), ADP, H⁺",
    law: "v = V_{\\max}\\,\\frac{[\\mathrm{P_i}]}{K_m+[\\mathrm{P_i}]}",
    lawNote:
      "Irreversible Michaelis–Menten on external phosphate; the ABC route carries a second term in ATP.",
    parameters: "V_{\\max},\\ K_m",
    parametersNote:
      "per route — a low saturation constant for the ABC system, a high one for the symporter",
  },
  {
    id: "polyp",
    title: "PolyP synthesis",
    flux: "0.200",
    column: 2,
    row: 1,
    reactions:
      "PPK (0.200), PPK2 (0.200) and PPK50r (0.200) — dimerisation, trimerisation and elongation, each spending one ATP per phosphate added.",
    inputs: "Pᵢ, ATP",
    outputs: "PPᵢ, PPPᵢ, PolyP₅₀, ADP",
    law: "v = V_{\\max}\\,\\frac{[\\mathrm{ATP}]}{K_{m,\\mathrm{ATP}}+[\\mathrm{ATP}]}\\,\\frac{[\\mathrm{P}_n]}{K_{m,n}+[\\mathrm{P}_n]}",
    lawNote:
      "Multi-substrate in ATP and in the chain being extended, so the three steps compete for the same ATP pool the rest of the model fills.",
    parameters: "V_{\\max},\\ K_{m,\\mathrm{ATP}},\\ K_{m,n}",
    parametersNote: "per step",
  },
];

const COLUMN_TITLES = ["Carbon", "Energy and redox", "Phosphorus"];

/* Geometry of the diagram, in its own viewBox units. */
const W = 960;
const COL_X = [40, 350, 660];
const BOX_W = 260;
const BOX_H = 96;
const ROW_Y = [70, 206, 342];
const H = 470;

function boxOf(m: Module) {
  return { x: COL_X[m.column], y: ROW_Y[m.row], w: BOX_W, h: BOX_H };
}

/** Arrows between modules: what each one hands to the next. */
const FLOWS: { from: string; to: string; label: string }[] = [
  { from: "ed", to: "tca", label: "pyruvate" },
  { from: "ed", to: "respiration", label: "NADH, Q8H₂" },
  { from: "tca", to: "respiration", label: "NADH, Q8H₂" },
  { from: "respiration", to: "atp-synthase", label: "H⁺ gradient" },
  { from: "atp-synthase", to: "maintenance", label: "ATP" },
  { from: "atp-synthase", to: "polyp", label: "ATP" },
  { from: "pi-transport", to: "polyp", label: "Pᵢ" },
];

function arrowPath(from: Module, to: Module) {
  const a = boxOf(from);
  const b = boxOf(to);
  if (from.column === to.column) {
    const x = a.x + a.w / 2;
    return `M ${x} ${a.y + a.h} L ${x} ${b.y - 10}`;
  }
  const x1 = a.x + a.w;
  const y1 = a.y + a.h / 2;
  const x2 = b.x;
  const y2 = b.y + b.h / 2;
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2 - 10} ${y2}`;
}

export function LumpedModel() {
  const [activeId, setActiveId] = useState<string>(MODULES[0].id);
  const active = MODULES.find((m) => m.id === activeId) ?? MODULES[0];

  return (
    <figure className="lumped">
      <div className="lumped__diagram">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="The reduced model after lumping: seven modules in three columns — carbon, energy and redox, and phosphorus — connected by what each hands to the next."
        >
          <defs>
            <marker
              id="lumped-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
          </defs>

          {COLUMN_TITLES.map((title, i) => (
            <text
              key={title}
              className="lumped__column-title"
              x={COL_X[i]}
              y={38}
            >
              {title}
            </text>
          ))}

          <g className="lumped__flows">
            {FLOWS.map((flow) => {
              const from = MODULES.find((m) => m.id === flow.from)!;
              const to = MODULES.find((m) => m.id === flow.to)!;
              const on = activeId === flow.from || activeId === flow.to;
              return (
                <path
                  key={`${flow.from}-${flow.to}`}
                  className={`lumped__flow${on ? " is-on" : ""}`}
                  d={arrowPath(from, to)}
                  markerEnd="url(#lumped-arrow)"
                >
                  <title>{`${from.title} → ${to.title}: ${flow.label}`}</title>
                </path>
              );
            })}
          </g>

          {MODULES.map((m) => {
            const box = boxOf(m);
            const on = m.id === activeId;
            return (
              <g
                key={m.id}
                className={`lumped__module${on ? " is-active" : ""}`}
                tabIndex={0}
                role="button"
                aria-pressed={on}
                aria-label={`${m.title}, flux ${m.flux} mmol gDW⁻¹ h⁻¹`}
                onMouseEnter={() => setActiveId(m.id)}
                onFocus={() => setActiveId(m.id)}
                onClick={() => setActiveId(m.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(m.id);
                  }
                }}
              >
                <rect
                  className="lumped__box"
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  rx={14}
                />
                <text className="lumped__flux" x={box.x + 16} y={box.y + 30}>
                  {m.flux}
                </text>
                <text className="lumped__unit" x={box.x + 16} y={box.y + 46}>
                  mmol gDW⁻¹ h⁻¹
                </text>
                <foreignObject
                  x={box.x + 14}
                  y={box.y + 52}
                  width={box.w - 28}
                  height={box.h - 56}
                >
                  <span className="lumped__title">{m.title}</span>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="lumped__panel" aria-live="polite">
        <h4 className="lumped__panel-title">{active.title}</h4>
        <dl className="lumped__fields">
          <dt>Grouped reactions</dt>
          <dd>{active.reactions}</dd>
          <dt>In</dt>
          <dd>{active.inputs}</dd>
          <dt>Out</dt>
          <dd>{active.outputs}</dd>
          <dt>Rate law</dt>
          <dd>
            <InlineMath tex={active.law} />
            <span className="lumped__law-note">{active.lawNote}</span>
          </dd>
          <dt>Parameters</dt>
          <dd>
            <InlineMath tex={active.parameters} />
            <span className="lumped__law-note">{active.parametersNote}</span>
          </dd>
        </dl>
      </div>

      <figcaption>
        <strong>Figure 11.</strong> The reduced model after lumping, with the
        pFBA flux of each module. Hover, tap or tab through a module to see what
        was grouped into it, what it consumes and produces, and the shape of its
        rate law. Redrawn from the thesis's own lumped map <Cite n={6} />.
      </figcaption>
    </figure>
  );
}

/** Local to this file: section 5's citations point at the same list. */
function Cite({ n }: { n: number }) {
  return (
    <>
      {" "}
      <a className="model-citation" href={`#model-ref-${n}`}>
        [{n}]
      </a>
    </>
  );
}
