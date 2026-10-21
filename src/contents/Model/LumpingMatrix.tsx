import { useState } from "react";
import { DisplayMath, InlineMath } from "../../components/Math";
import { asset } from "../../utils/asset";

/**
 * Lumping, shown on both sides at once: the same flip turns the full
 * 45-reaction map into the grouped one, and the stoichiometric matrix
 * from two coupled columns into one effective column.
 *
 * The algebra is the team's own, kept in their notation: if v₁ = α₁λ and
 * v₂ = α₂λ for some common λ, then n₁v₁ + n₂v₂ = λ(α₁n₁ + α₂n₂), so the
 * pair contributes exactly what a single column nᵉᶠᶠ = α₁n₁ + α₂n₂
 * carrying flux λ would. Nothing the network can do is lost; one degree
 * of freedom is.
 */

/** The blue the team's own slide uses for the coupled columns. */
const BLUE = "#1a3fd8";
const c = (tex: string) => `\\color{${BLUE}}{${tex}}`;

const MATRIX_BEFORE = `\\begin{pmatrix}
${c("\\big|")} & ${c("\\big|")} & \\big| & & \\big|\\\\
${c("\\mathbf{n}_1")} & ${c("\\mathbf{n}_2")} & \\mathbf{n}_3 & \\cdots & \\mathbf{n}_n\\\\
${c("\\big|")} & ${c("\\big|")} & \\big| & & \\big|
\\end{pmatrix}
\\begin{pmatrix}
${c("v_1")}\\\\
${c("v_2")}\\\\
v_3\\\\
\\vdots\\\\
v_n
\\end{pmatrix}`;

const MATRIX_AFTER = `\\begin{pmatrix}
${c("\\vert")} & \\vert & & \\vert\\\\
${c("\\mathbf{n}^{\\mathrm{eff}}")} & \\mathbf{n}_3 & \\cdots & \\mathbf{n}_n\\\\
${c("\\vert")} & \\vert & & \\vert
\\end{pmatrix}
\\begin{pmatrix}
${c("\\lambda")}\\\\
v_3\\\\
\\vdots\\\\
v_n
\\end{pmatrix}`;

const COUPLING = c("v_1=\\alpha_1\\lambda \\qquad v_2=\\alpha_2\\lambda");
const SUM = c(
  "\\mathbf{n}_1 v_1+\\mathbf{n}_2 v_2=\\lambda\\,(\\alpha_1\\mathbf{n}_1+\\alpha_2\\mathbf{n}_2)",
);
const EFFECTIVE = c(
  "\\mathbf{n}_{\\mathrm{eff}}=\\alpha_1\\mathbf{n}_1+\\alpha_2\\mathbf{n}_2",
);

export function LumpingMatrix() {
  const [lumped, setLumped] = useState(false);

  return (
    <figure className="lumpmat model-figbox">
      <div className="lumpmat__controls">
        <button
          type="button"
          className="lumpmat__toggle"
          onClick={() => setLumped((v) => !v)}
          aria-pressed={lumped}
        >
          {lumped ? "← Back to the 45 reactions" : "Lump the coupled subsets →"}
        </button>
        <p className="lumpmat__state">
          {lumped
            ? "Grouped: MACRO_ED and MACRO_TCA, one net reaction each."
            : "45 reactions, every step of ED and of the TCA cycle drawn on its own."}
        </p>
      </div>

      <div className="lumpmat__split">
        <div className={`lumpmat__maps${lumped ? " is-lumped" : ""}`}>
          <img
            className="lumpmat__map lumpmat__map--full"
            src={asset("assets/model/core-map-big-labels.webp")}
            alt="The 45 active reactions of the core, each drawn separately, with its pFBA flux."
            loading="lazy"
          />
          <img
            className="lumpmat__map lumpmat__map--lumped"
            src={asset("assets/model/lumped-map.webp")}
            alt="The same network after lumping: the Entner–Doudoroff sequence and the TCA cycle each drawn as one net reaction, respiration and the phosphate modules unchanged."
            loading="lazy"
          />
        </div>

        <div className="lumpmat__algebra">
          {/* Both matrices stay mounted and cross-fade: the full one
              compresses horizontally as it leaves and the lumped one
              expands into place, so the two coupled columns are seen to
              close up rather than simply being swapped. */}
          <div className={`lumpmat__matrix${lumped ? " is-lumped" : ""}`}>
            <div className="lumpmat__state-math lumpmat__state-math--before">
              <DisplayMath tex={MATRIX_BEFORE} />
            </div>
            <div className="lumpmat__state-math lumpmat__state-math--after">
              <DisplayMath tex={MATRIX_AFTER} />
            </div>
          </div>

          <div className="lumpmat__maths">
            {lumped ? (
              <>
                <InlineMath tex={EFFECTIVE} />
                <p className="lumpmat__reading">
                  One column, one flux. The pair contributes exactly what it
                  did, and the model has one variable fewer, and no reaction it
                  could run before has become impossible.
                </p>
              </>
            ) : (
              <>
                <InlineMath tex={COUPLING} />
                <InlineMath tex={SUM} />
                <p className="lumpmat__reading">
                  Coupled: in every feasible solution the two fluxes are fixed
                  multiples of a common <InlineMath tex="\lambda" />, so their
                  joint contribution can be written with one column and one
                  flux.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <figcaption>
        <strong>Figure 10.</strong> Lumping, on both sides at once: the network
        as 45 separate reactions and as grouped modules, and the same step in
        the stoichiometric matrix. Maps from our own COBRApy analysis; labels
        in Spanish.
      </figcaption>
    </figure>
  );
}
