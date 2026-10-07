import { asset } from "../../utils/asset";
import type { RecordTable, ResultData, ResultSubsection } from "./types";

function Table({ table }: { table: RecordTable & { caption?: string } }) {
  return (
    <>
      {table.caption && <p className="record-table__caption">{table.caption}</p>}
      <table className="record-table">
        <thead>
          <tr>
            {table.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Subsection({ subsection }: { subsection: ResultSubsection }) {
  return (
    <section className="result-subsection" id={subsection.id}>
      {subsection.title && <h4>{subsection.title}</h4>}

      {subsection.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

      {!!subsection.figures?.length && (
        <div className="record-figure-grid">
          {subsection.figures.map((figure, index) => (
            <figure className="record-figure" key={index}>
              {figure.src ? (
                <img
                  className={
                    figure.kind === "chart"
                      ? "record-figure__photo record-figure__photo--chart"
                      : "record-figure__photo"
                  }
                  src={asset(figure.src)}
                  alt={figure.alt ?? ""}
                />
              ) : (
                <div className="record-figure__placeholder" aria-hidden="true">
                  [ figure placeholder ]
                </div>
              )}
              <figcaption>{figure.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}

      {subsection.tables?.map((table, index) => <Table table={table} key={index} />)}

      {subsection.observations && (
        <div className="result-subsection__field">
          <h5>What was obtained</h5>
          <p>{subsection.observations}</p>
        </div>
      )}

      {subsection.interpretation && (
        <div className="result-subsection__field">
          <h5>What it means</h5>
          <p>{subsection.interpretation}</p>
        </div>
      )}

      {subsection.expectation && (
        <div className="result-subsection__field">
          <h5>Was it expected?</h5>
          <p>{subsection.expectation}</p>
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
        {data.description && <p className="result-card__desc">{data.description}</p>}
      </header>

      {data.pending && (
        <p className="result-card__pending">
          This experiment was run, but its write-up is still pending: the team's
          notes carry the entry without its results yet.
        </p>
      )}

      {data.aim && (
        <div className="result-card__aim">
          <h4 className="record-rule-heading">Aim</h4>
          <p>{data.aim}</p>
        </div>
      )}

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
