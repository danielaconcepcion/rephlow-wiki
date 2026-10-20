import { useState } from "react";
import { InlineMath } from "../../components/Math";

/**
 * What lumping does to the stoichiometric matrix, as one picture you can
 * flip: two reactions that every feasible solution forces to move
 * together stop being two columns and become one.
 *
 * The algebra is the team's own (see the thesis's reduction chapter):
 * if v₁ = α₁λ and v₂ = α₂λ for some common λ, then n₁v₁ + n₂v₂ =
 * λ(α₁n₁ + α₂n₂), so the pair contributes exactly what a single column
 * n_eff = α₁n₁ + α₂n₂ would, carrying flux λ. Nothing about the
 * network's capabilities is lost; one variable is.
 */

const TAIL = ["3", "n"];

export function LumpingMatrix() {
  const [lumped, setLumped] = useState(false);

  return (
    <figure className="lumpmat">
      <div className="lumpmat__stage">
        <div
          className={`lumpmat__matrix${lumped ? " is-lumped" : ""}`}
          aria-hidden="true"
        >
          <span className="lumpmat__bracket">(</span>

          <span className="lumpmat__column lumpmat__column--coupled">
            <span className="lumpmat__bar" />
            <span className="lumpmat__label">
              <InlineMath
                tex={lumped ? "\\mathbf n^{\\mathrm{eff}}" : "\\mathbf n_1"}
              />
            </span>
          </span>

          <span className="lumpmat__column lumpmat__column--merging">
            <span className="lumpmat__bar" />
            <span className="lumpmat__label">
              <InlineMath tex="\mathbf n_2" />
            </span>
          </span>

          {TAIL.map((n, i) => (
            <span className="lumpmat__column" key={n}>
              {i === 1 && <span className="lumpmat__dots">⋯</span>}
              <span className="lumpmat__bar" />
              <span className="lumpmat__label">
                <InlineMath tex={`\\mathbf n_${n}`} />
              </span>
            </span>
          ))}

          <span className="lumpmat__bracket">)</span>
        </div>

        <div
          className={`lumpmat__vector${lumped ? " is-lumped" : ""}`}
          aria-hidden="true"
        >
          <span className="lumpmat__bracket">(</span>
          <span className="lumpmat__fluxes">
            <span className="lumpmat__flux lumpmat__flux--coupled">
              <InlineMath tex={lumped ? "\\lambda" : "v_1"} />
            </span>
            <span className="lumpmat__flux lumpmat__flux--merging">
              <InlineMath tex="v_2" />
            </span>
            <span className="lumpmat__flux">
              <InlineMath tex="v_3" />
            </span>
            <span className="lumpmat__flux lumpmat__flux--dots">⋮</span>
            <span className="lumpmat__flux">
              <InlineMath tex="v_n" />
            </span>
          </span>
          <span className="lumpmat__bracket">)</span>
        </div>
      </div>

      <div className="lumpmat__maths">
        {lumped ? (
          <p className="lumpmat__reading">
            <InlineMath tex="\mathbf n^{\mathrm{eff}} = \alpha_1\mathbf n_1 + \alpha_2\mathbf n_2" />
            <span>
              One column, one flux. The pair contributes exactly what it did —
              the model has one variable fewer, and no reaction it could run
              before has become impossible.
            </span>
          </p>
        ) : (
          <p className="lumpmat__reading">
            <InlineMath tex="v_1 = \alpha_1\lambda,\quad v_2 = \alpha_2\lambda" />
            <span>
              Coupled: in every feasible solution the two fluxes are fixed
              multiples of a common <InlineMath tex="\lambda" />, so{" "}
              <InlineMath tex="\mathbf n_1 v_1 + \mathbf n_2 v_2 = \lambda\,(\alpha_1\mathbf n_1 + \alpha_2\mathbf n_2)" />
              .
            </span>
          </p>
        )}

        <button
          type="button"
          className="lumpmat__toggle"
          onClick={() => setLumped((v) => !v)}
          aria-pressed={lumped}
        >
          {lumped ? "Show the two columns" : "Lump the coupled pair"}
        </button>
      </div>

      <figcaption>
        <strong>Figure 10.</strong> Lumping, in the stoichiometric matrix: two
        reactions coupled across the whole feasible set collapse into one
        effective column carrying one flux.
      </figcaption>
    </figure>
  );
}
