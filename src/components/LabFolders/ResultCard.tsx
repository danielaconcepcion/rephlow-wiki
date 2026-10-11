import { Fragment } from "react";
import type { CSSProperties } from "react";

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
              {row.map((cell, cellIndex) =>
                typeof cell === "string" ? (
                  <td key={cellIndex}>{cell}</td>
                ) : (
                  <td key={cellIndex} rowSpan={cell.rowSpan}>
                    {cell.value}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function FigureGrid({ subsection }: { subsection: ResultSubsection }) {
  if (!subsection.figures?.length) return null;
  const style = subsection.figuresColumns
    ? ({
        "--figure-columns": subsection.figuresColumns,
      } as CSSProperties & { "--figure-columns": number })
    : undefined;
  return (
    <div
      className={
        subsection.figuresColumns
          ? "record-figure-grid record-figure-grid--fixed"
          : "record-figure-grid"
      }
      style={style}
    >
      {subsection.figures.map((figure, index) => (
        <figure
          className={figure.wide ? "record-figure record-figure--wide" : "record-figure"}
          key={index}
        >
          {figure.title && (
            <p className="record-figure-group__item-title">{figure.title}</p>
          )}
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
          {figure.caption && <figcaption>{figure.caption}</figcaption>}
        </figure>
      ))}
      {subsection.figuresCaption && (
        <p className="record-figure-grid__caption">{subsection.figuresCaption}</p>
      )}
    </div>
  );
}

/**
 * A photo series that varies along two axes — medium down the side, time
 * across the top. The axes are labelled once each, so no panel has to
 * repeat them, and every row holds exactly one series: the column count is
 * set from the data rather than left to auto-fit, which is what otherwise
 * splits a four-point series across two rows.
 */
function FigureMatrix({
  matrix,
}: {
  matrix: NonNullable<ResultSubsection["figureMatrix"]>;
}) {
  const style = { "--matrix-columns": matrix.columns.length } as CSSProperties & {
    "--matrix-columns": number;
  };
  return (
    <figure className="record-figure-matrix" style={style}>
      <div className="record-figure-matrix__grid">
        <div className="record-figure-matrix__corner" aria-hidden="true" />
        {matrix.columns.map((column) => (
          <p className="record-figure-matrix__column-head" key={column}>
            {column}
          </p>
        ))}
        {matrix.rows.map((row) => (
          <Fragment key={row.label}>
            <p className="record-figure-matrix__row-head">{row.label}</p>
            {row.figures.map((figure, index) => (
              <img
                className="record-figure-matrix__photo"
                src={asset(figure.src)}
                alt={figure.alt}
                key={index}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {matrix.caption && <figcaption>{matrix.caption}</figcaption>}
    </figure>
  );
}

function Subsection({ subsection }: { subsection: ResultSubsection }) {
  const prose = (
    <>
      {subsection.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

      {subsection.custom && (
        <figure className="record-figure record-figure--custom">
          {subsection.custom.node}
          {subsection.custom.caption && <figcaption>{subsection.custom.caption}</figcaption>}
        </figure>
      )}

      {!subsection.figuresAside && <FigureGrid subsection={subsection} />}

      {subsection.figureMatrix && <FigureMatrix matrix={subsection.figureMatrix} />}

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
    </>
  );

  if (!subsection.figuresAside) {
    return (
      <section className="result-subsection" id={subsection.id}>
        {subsection.title && <h4>{subsection.title}</h4>}
        {prose}
      </section>
    );
  }

  /* Two columns. The prose is wrapped as ONE grid item rather than left as
     a run of siblings: as siblings each field is its own grid row, and the
     tall figure spanning all of them stretches every row to share its
     height, opening a gap between each field. One item, one row, no gap. */
  return (
    <section className="result-subsection result-subsection--aside" id={subsection.id}>
      {subsection.title && <h4>{subsection.title}</h4>}
      <div className="result-subsection__main">{prose}</div>
      <div className="result-subsection__aside">
        <FigureGrid subsection={subsection} />
      </div>
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
