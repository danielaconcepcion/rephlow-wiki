import type { ReactNode } from "react";
import type { ExperimentBodyBlock, ExperimentData, PairedResource, RecordTable } from "./types";
import { asset } from "../../utils";

function DataTable({ table }: { table: RecordTable & { caption?: string } }) {
  return (
    <div className="record-table-wrap">
      <table className="record-table">
        <thead>
          <tr>
            {table.headers.map((header, headerIndex) => (
              <th key={headerIndex}>{header}</th>
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
      {table.caption && <p className="record-table-caption">{table.caption}</p>}
    </div>
  );
}

function DescriptionParagraphs({ paragraphs }: { paragraphs: ReactNode[] }) {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p className="experiment-card__desc" key={index}>
          {paragraph}
        </p>
      ))}
    </>
  );
}

/** The resource half of a paired body block — a real table, a real photo
 * (single or grouped), a bespoke component, or (reusing the exact
 * placeholder treatment already established in Enzymatic immobilisation /
 * Revalorisation) a clearly-labelled stand-in for a table or figure the
 * source hasn't supplied yet. */
function ResourcePane({ resource }: { resource: PairedResource }) {
  if (resource.kind === "table") {
    return <DataTable table={resource.table} />;
  }
  if (resource.kind === "image") {
    return (
      <figure className="record-figure">
        <img className="record-figure__photo" src={asset(resource.src)} alt={resource.alt} />
        <figcaption>{resource.caption}</figcaption>
      </figure>
    );
  }
  if (resource.kind === "image-group") {
    return (
      <figure className="record-figure-group">
        <div className="record-figure-group__grid">
          {resource.images.map((image, index) => (
            <div className="record-figure-group__item" key={index}>
              <p className="record-figure-group__item-title">{image.title}</p>
              <img className="record-figure-group__photo" src={asset(image.src)} alt={image.alt} />
            </div>
          ))}
        </div>
        <figcaption className="record-figure-group__caption">{resource.caption}</figcaption>
      </figure>
    );
  }
  if (resource.kind === "custom") {
    return (
      <figure className="record-figure record-figure--custom">
        {resource.node}
        {resource.caption && <figcaption>{resource.caption}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className="record-figure">
      <div className="record-figure__placeholder" aria-hidden="true">
        {resource.kind === "table-placeholder" ? "[ table placeholder ]" : "[ figure placeholder ]"}
      </div>
      <figcaption>{resource.caption}</figcaption>
    </figure>
  );
}

/** "image-group" and "custom" resources need real room — a multi-panel
 * grid or a bespoke component reads as cramped and mis-scaled squeezed
 * into the narrow paired column real tables/single photos fit fine in
 * (see .experiment-card__pair) — so they always render full-width, with
 * any paragraphs stacked above rather than beside them. */
function isWideResource(resource: PairedResource): boolean {
  return resource.kind === "image-group" || resource.kind === "custom";
}

const LEADING_NUMBER = /^\[(\d+)\]/;
const URL_PATTERN = /(https?:\/\/\S+)/;

/** One entry in a reference list — id'd from its own leading "[n]" so an
 * inline <Cite> link elsewhere in this same scope (an experiment's
 * write-up, or a sub-block's intro — see ExperimentSubBlock.references)
 * can jump straight to it, and with its trailing DOI/URL turned into a
 * real, quietly-styled link instead of inert text. `scope` is the
 * experiment or sub-block id this list belongs to — kept distinct so two
 * different reference lists on the same page never collide on the same
 * anchor id. */
export function ReferenceItem({ scope, text }: { scope: string; text: string }) {
  const numberMatch = text.match(LEADING_NUMBER);
  const id = numberMatch ? `ref-${scope}-${numberMatch[1]}` : undefined;
  const urlMatch = text.match(URL_PATTERN);
  if (!urlMatch) return <li id={id}>{text}</li>;
  const url = urlMatch[1];
  const splitAt = text.indexOf(url);
  return (
    <li id={id}>
      {text.slice(0, splitAt)}
      <a className="record-reference-link" href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
      {text.slice(splitAt + url.length)}
    </li>
  );
}

/** One block of a richer, per-paragraph-paired write-up (see
 * ExperimentData.body) — full-width by default, or a local two-column
 * pair when the block sets pairedResource. Full-width blocks before and
 * after a paired one are unaffected, so only the one paragraph that
 * actually discusses the table/figure sits next to it. */
function BodyBlock({ block }: { block: ExperimentBodyBlock }) {
  const hasParagraphs = !!block.paragraphs?.length;

  if (!block.pairedResource) {
    return (
      <div className="experiment-card__block">
        <DescriptionParagraphs paragraphs={block.paragraphs ?? []} />
      </div>
    );
  }

  // A resource with no specific paragraph explaining it (a wide matrix, or
  // settings with no natural "as follows:" lead-in) has nothing to pair
  // with — it reads better full-width than forced into an empty pair.
  // A wide resource (image-group / custom) stays full-width regardless —
  // see isWideResource — with its paragraph(s), if any, stacked above it.
  if (!hasParagraphs || isWideResource(block.pairedResource)) {
    return (
      <div className="experiment-card__block">
        {hasParagraphs && <DescriptionParagraphs paragraphs={block.paragraphs!} />}
        <ResourcePane resource={block.pairedResource} />
      </div>
    );
  }

  return (
    <div className="experiment-card__pair experiment-card__block">
      <div className="experiment-card__text">
        <DescriptionParagraphs paragraphs={block.paragraphs!} />
      </div>
      <div className="experiment-card__tables">
        <ResourcePane resource={block.pairedResource} />
      </div>
    </div>
  );
}

/**
 * Reusable internal layout for one experiment record: title/description,
 * materials (table or checklist), numbered protocol, and a notes/references/
 * download footer. Sections are rendered only when the data provides them,
 * so different experiments can use fewer sections or a full-width protocol
 * without touching this component.
 */
export function ExperimentCard({ data }: { data: ExperimentData }) {
  const hasBody = !!data.body?.length;
  const hasMaterials = !!(data.materialsTable?.length || data.materialsList?.length);
  const hasProtocol = !!data.protocol?.length;
  const hasTables = !!data.tables?.length;
  const hasNotes = !!data.notes?.length;
  const hasReferences = !!data.references?.length;
  const hasProtocolFiles = !!data.protocols?.length;
  const hasWideTable = !!data.tables?.some((table) => table.headers.length > 4);
  // A lone short parameter table — no materials/protocol already using the
  // card's own two-column grid, and no wide matrix that genuinely needs
  // full width — sits directly beside the experiment's description instead
  // of stretching across the card with the text stacked above it. Real
  // grid columns (not a floated aside), so the table adapts to its own
  // column instead of squeezing the text next to it. Only applies to the
  // simple description/tables path — `body` handles its own pairing
  // per-block instead.
  const canPairTable = !hasBody && hasTables && !hasMaterials && !hasProtocol && !hasWideTable;
  const descriptionParagraphs = hasBody
    ? []
    : Array.isArray(data.description)
      ? data.description
      : [data.description];
  const hasFooter = !!(hasNotes || hasReferences || hasProtocolFiles || data.pdfHref);

  return (
    <article className="experiment-card">
      <header className="experiment-card__header">
        <h3 className="experiment-card__title">{data.title}</h3>
        {!hasBody && !canPairTable && <DescriptionParagraphs paragraphs={descriptionParagraphs} />}
      </header>

      {hasBody && data.body!.map((block, index) => <BodyBlock block={block} key={index} />)}

      {!hasBody && canPairTable && (
        <div className="experiment-card__pair">
          <div className="experiment-card__text">
            <DescriptionParagraphs paragraphs={descriptionParagraphs} />
          </div>
          <section className="experiment-card__tables" aria-label="Experimental parameters">
            {data.tables!.map((table, index) => (
              <DataTable table={table} key={index} />
            ))}
          </section>
        </div>
      )}

      {hasMaterials && (
        <section className="experiment-card__materials" aria-label="Materials">
          <h4 className="record-heading">Materials</h4>
          {data.materialsTable?.length ? (
            <table className="record-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {data.materialsTable.map((row) => (
                  <tr key={row.item}>
                    <td>{row.item}</td>
                    <td>{row.quantity ?? "—"}</td>
                    <td>{row.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <ul className="record-checklist">
              {data.materialsList!.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {hasProtocol && (
        <section
          className="experiment-card__protocol"
          aria-label="Protocol"
          style={hasMaterials ? undefined : { gridColumn: "1 / -1" }}
        >
          <h4 className="record-heading">Protocol</h4>
          <ol className="record-protocol">
            {data.protocol!.map((step, index) => (
              <li key={index}>{step.text}</li>
            ))}
          </ol>
        </section>
      )}

      {!hasBody && hasTables && !canPairTable && (
        <section className="experiment-card__tables" aria-label="Experimental parameters">
          {data.tables!.map((table, index) => (
            <DataTable table={table} key={index} />
          ))}
        </section>
      )}

      {!hasBody && data.figure && (
        <figure className="record-figure experiment-card__figure">
          <div className="record-figure__placeholder" aria-hidden="true">
            [ figure placeholder ]
          </div>
          <figcaption>{data.figure.caption}</figcaption>
        </figure>
      )}

      {hasFooter && (
        <footer className="experiment-card__footer">
          {hasNotes && (
            <div className="record-notes">
              {data.notes!.map((note, index) => (
                <p className="record-note" key={index}>
                  <strong>{note.kind === "warning" ? "Warning" : "Note"}:</strong> {note.text}
                </p>
              ))}
            </div>
          )}

          {hasReferences && (
            <ul className="record-references">
              {data.references!.map((reference, index) => (
                <ReferenceItem scope={data.id} text={reference} key={index} />
              ))}
            </ul>
          )}

          {hasProtocolFiles && (
            <div className="record-protocols">
              <span className="record-protocols__label">Protocols:</span>
              <div className="record-protocols__list">
                {data.protocols!.map((protocol, index) => (
                  <a
                    className="record-download record-download--compact"
                    href={asset(protocol.href)}
                    download
                    key={index}
                  >
                    {protocol.label} (PDF)
                  </a>
                ))}
              </div>
            </div>
          )}

          {data.pdfHref && (
            <a className="record-download" href={asset(data.pdfHref)} download>
              Download protocol (PDF)
            </a>
          )}
        </footer>
      )}
    </article>
  );
}
