import type { ResultData, ResultSubsection } from "./types";

function Subsection({ subsection }: { subsection: ResultSubsection }) {
  return (
    <section className="result-subsection" id={subsection.id}>
      <h4>{subsection.title}</h4>

      {subsection.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

      {!!subsection.figures?.length && (
        <div className="record-figure-grid">
          {subsection.figures.map((figure, index) => (
            <figure className="record-figure" key={index}>
              <div className="record-figure__placeholder" aria-hidden="true">
                [ figure placeholder ]
              </div>
              <figcaption>{figure.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}

      {subsection.table && (
        <table className="record-table">
          <thead>
            <tr>
              {subsection.table.headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subsection.table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {subsection.observations && (
        <div className="result-subsection__field">
          <h5>Observation</h5>
          <p>{subsection.observations}</p>
        </div>
      )}

      {subsection.interpretation && (
        <div className="result-subsection__field">
          <h5>Interpretation</h5>
          <p>{subsection.interpretation}</p>
        </div>
      )}
    </section>
  );
}

/**
 * Reusable internal layout for one result record: title/description, a
 * ruled Aim, an optional Background, one or more subsections (each free to
 * mix body text, figures, and tables), and a ruled Discussion. Reads as one
 * continuous scientific record — no collapsible sections.
 */
export function ResultCard({ data }: { data: ResultData }) {
  return (
    <article className="result-card">
      <header className="result-card__header">
        <h3 className="result-card__title">{data.title}</h3>
        <p className="result-card__desc">{data.description}</p>
      </header>

      <div className="result-card__aim">
        <h4 className="record-rule-heading">Aim</h4>
        <p>{data.aim}</p>
      </div>

      {!!data.background?.length && (
        <div className="result-card__background">
          <h4>Background</h4>
          {data.background.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}

      <div className="result-card__subsections">
        {data.subsections.map((subsection) => (
          <Subsection subsection={subsection} key={subsection.id} />
        ))}
      </div>

      {!!data.discussion?.length && (
        <section className="result-card__discussion">
          <h4 className="record-rule-heading record-rule-heading--discussion">Discussion</h4>
          {data.discussion.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>
      )}
    </article>
  );
}
