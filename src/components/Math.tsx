import katex from "katex";
import "katex/dist/katex.min.css";
import "./Math.css";

/**
 * Real LaTeX typesetting via KaTeX (self-hosted — its CSS/font imports are
 * bundled by Vite, no runtime request to a third-party host, matching this
 * repo's font-hosting convention; see App.css's note on @fontsource).
 * KaTeX renders synchronously to a string, so both components below are
 * plain, dependency-light wrappers around `renderToString` rather than a
 * React binding library. Reserve plain `<sub>`/`<sup>`/`<em>` (as
 * FBAPrimer/ProjectDescription already do) for simple inline notation —
 * reach for these when an expression is a real formula worth typesetting.
 */

function renderTeX(tex: string, displayMode: boolean): string {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    strict: "ignore",
    output: "html",
  });
}

/** Inline LaTeX, e.g. `<InlineMath tex="k_{cat}/K_M" />` sitting mid-sentence. */
export function InlineMath({ tex }: { tex: string }) {
  return (
    <span
      className="tex-inline"
      dangerouslySetInnerHTML={{ __html: renderTeX(tex, false) }}
    />
  );
}

/**
 * A numbered, standalone display equation — the wiki's one equation
 * treatment, reused wherever a page needs real display math rather than
 * each page inventing its own box. `label` (e.g. "1") renders as a small
 * tabular-numeral tag in the corner, in the margin note / figure-caption
 * idiom already used elsewhere on the wiki, so the equation reads as a
 * numbered, citable object rather than decoration.
 */
export function DisplayMath({ tex, label }: { tex: string; label?: string }) {
  return (
    <div className="tex-display" role="group" aria-label="Display equation">
      <div
        className="tex-display__expression"
        dangerouslySetInnerHTML={{ __html: renderTeX(tex, true) }}
      />
      {label && <span className="tex-display__label">({label})</span>}
    </div>
  );
}
