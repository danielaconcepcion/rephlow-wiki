import { Fragment } from "react";
import type { CSSProperties } from "react";

import { asset } from "../../utils/asset";
import { Caption } from "./Caption";
import { Rich } from "./RichText";
import { ZoomableImage } from "./ZoomableImage";
import type { RecordTable, ResultData, ResultSubsection } from "./types";

function Table({ table }: { table: RecordTable & { caption?: string } }) {
  return (
    <div className="result-table">
      <p className="record-table__caption">
        <Caption kind="Table" item={table} text={table.caption} />
      </p>
      <div className="record-table-scroll">
        <table className="record-table">
          <thead>
            <tr>
              {table.headers.map((header, index) => (
                <th key={index}>
                  <Rich text={header} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) =>
                  typeof cell === "string" ? (
                    <td key={cellIndex}>
                      <Rich text={cell} />
                    </td>
                  ) : (
                    <td key={cellIndex} rowSpan={cell.rowSpan}>
                      <Rich text={cell.value} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FigureGrid({ subsection }: { subsection: ResultSubsection }) {
  const figures = subsection.figures;
  if (!figures?.length) return null;
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
      {figures.map((figure, index) => (
        <figure
          className={
            figure.wide ? "record-figure record-figure--wide" : "record-figure"
          }
          key={index}
        >
          {figure.title && (
            <p className="record-figure-group__item-title">{figure.title}</p>
          )}
          {figure.src ? (
            <ZoomableImage
              className={
                figure.kind === "chart"
                  ? "record-figure__photo record-figure__photo--chart"
                  : "record-figure__photo"
              }
              src={asset(figure.src)}
              alt={figure.alt ?? ""}
              title={figure.title}
              caption={
                subsection.figuresCaption ? (
                  <Caption
                    kind="Figure"
                    item={figures}
                    text={subsection.figuresCaption}
                  />
                ) : (
                  figure.caption && (
                    <Caption
                      kind="Figure"
                      item={figure}
                      text={figure.caption}
                    />
                  )
                )
              }
            />
          ) : (
            <div className="record-figure__placeholder" aria-hidden="true">
              [ figure placeholder ]
            </div>
          )}
          {figure.caption && !subsection.figuresCaption && (
            <figcaption>
              <Caption kind="Figure" item={figure} text={figure.caption} />
            </figcaption>
          )}
        </figure>
      ))}
      {subsection.figuresCaption && (
        <p className="record-figure-grid__caption">
          <Caption
            kind="Figure"
            item={figures}
            text={subsection.figuresCaption}
          />
        </p>
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
  const style = {
    "--matrix-columns": matrix.columns.length,
  } as CSSProperties & {
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
              <ZoomableImage
                className="record-figure-matrix__photo"
                src={asset(figure.src)}
                alt={figure.alt}
                title={`${row.label} — ${matrix.columns[index] ?? ""}`}
                caption={
                  matrix.caption && (
                    <Caption
                      kind="Figure"
                      item={matrix}
                      text={matrix.caption}
                    />
                  )
                }
                key={index}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {matrix.caption && (
        <figcaption>
          <Caption kind="Figure" item={matrix} text={matrix.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function NarrativeParagraph({ text }: { text: string }) {
  const lead = text.match(/^\*\*([^*]+)\*\*\s*(.*)$/s);

  if (!lead) {
    return (
      <p>
        <Rich text={text} />
      </p>
    );
  }

  const [, heading, rawRemainder] = lead;
  const remainder = rawRemainder.replace(/^,\s*/, "");
  const paragraph = rawRemainder.startsWith(",")
    ? remainder.replace(/^./, (character) => character.toUpperCase())
    : remainder;
  return (
    <div className="result-subsection__field result-subsection__field--narrative">
      <h5>{heading}</h5>
      {paragraph && (
        <p>
          <Rich text={paragraph} />
        </p>
      )}
    </div>
  );
}

function Subsection({
  subsection,
  narrative = false,
}: {
  subsection: ResultSubsection;
  narrative?: boolean;
}) {
  const renderParagraph = (paragraph: string, index: number) =>
    narrative ? (
      <NarrativeParagraph text={paragraph} key={index} />
    ) : (
      <p key={index}>
        <Rich text={paragraph} />
      </p>
    );

  const prose = (
    <>
      {subsection.body?.map(renderParagraph)}

      {subsection.custom && (
        <figure className="record-figure record-figure--custom">
          {subsection.custom.node}
          {subsection.custom.caption && (
            <figcaption>
              <Caption
                kind="Figure"
                item={subsection.custom}
                text={subsection.custom.caption}
              />
            </figcaption>
          )}
        </figure>
      )}

      {!subsection.figuresAside && <FigureGrid subsection={subsection} />}

      {subsection.figureMatrix && (
        <FigureMatrix matrix={subsection.figureMatrix} />
      )}

      {subsection.tables?.map((table, index) => (
        <Table table={table} key={index} />
      ))}

      {subsection.bodyAfter?.map(renderParagraph)}

      {narrative && subsection.observations && (
        <NarrativeParagraph text={subsection.observations} />
      )}
      {!narrative && subsection.observations && (
        <div className="result-subsection__field">
          <h5>What was obtained</h5>
          <p>
            <Rich text={subsection.observations} />
          </p>
        </div>
      )}

      {narrative && subsection.interpretation && (
        <NarrativeParagraph text={subsection.interpretation} />
      )}
      {!narrative && subsection.interpretation && (
        <div className="result-subsection__field">
          <h5>What it means</h5>
          <p>
            <Rich text={subsection.interpretation} />
          </p>
        </div>
      )}

      {narrative && subsection.expectation && (
        <NarrativeParagraph text={subsection.expectation} />
      )}
      {!narrative && subsection.expectation && (
        <div className="result-subsection__field">
          <h5>Was it expected?</h5>
          <p>
            <Rich text={subsection.expectation} />
          </p>
        </div>
      )}
    </>
  );

  if (!subsection.figuresAside) {
    return (
      <section
        className={
          subsection.continued
            ? "result-subsection result-subsection--continued"
            : "result-subsection"
        }
        id={subsection.id}
      >
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
    <section
      className="result-subsection result-subsection--aside"
      id={subsection.id}
    >
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
        <h3 className="result-card__title">
          <Rich text={data.title} />
        </h3>
        {data.description && (
          <p className="result-card__desc">
            <Rich text={data.description} />
          </p>
        )}
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
            <p key={index}>
              <Rich text={paragraph} />
            </p>
          ))}
        </div>
      )}

      <div className="result-card__subsections">
        {data.subsections.map((subsection) => (
          <Subsection
            subsection={subsection}
            narrative={data.narrative}
            key={subsection.id}
          />
        ))}
      </div>

      {!!data.discussion?.length && (
        <section className="result-card__discussion">
          <h4 className="record-rule-heading record-rule-heading--discussion">
            Discussion
          </h4>
          {data.discussion.map((paragraph, index) => (
            <p key={index}>
              <Rich text={paragraph} />
            </p>
          ))}
        </section>
      )}
    </article>
  );
}
