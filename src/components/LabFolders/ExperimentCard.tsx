import { useState, type ReactNode } from "react";
import type {
  BodyCallout,
  ExperimentBodyBlock,
  ExperimentData,
  PairedResource,
  RecordTable,
} from "./types";
import { asset } from "../../utils";
import { Caption } from "./Caption";
import { Rich } from "./RichText";
import { ProtocolModal } from "./ProtocolModal";
import { ZoomableImage } from "./ZoomableImage";
import { EditorialText } from "./EditorialText";

function DataTable({
  table,
  numberKey,
}: {
  table: RecordTable & { caption?: string };
  /** What the number was assigned to (the paired resource, or the table
   * itself for a plain `tables` entry) — see numbering.ts. */
  numberKey: object;
}) {
  return (
    <div className="record-table-wrap">
      <p className="record-table-caption">
        <Caption kind="Table" item={numberKey} text={table.caption} />
      </p>
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
  );
}

function DescriptionParagraphs({ paragraphs }: { paragraphs: ReactNode[] }) {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p className="experiment-card__desc" key={index}>
          <Rich text={paragraph} />
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
    return <DataTable table={resource.table} numberKey={resource} />;
  }
  if (resource.kind === "image") {
    return (
      <figure className="record-figure">
        <ZoomableImage
          className="record-figure__photo"
          src={asset(resource.src)}
          alt={resource.alt}
          caption={
            <Caption kind="Figure" item={resource} text={resource.caption} />
          }
        />
        <figcaption>
          <Caption kind="Figure" item={resource} text={resource.caption} />
        </figcaption>
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
              <ZoomableImage
                className="record-figure-group__photo"
                src={asset(image.src)}
                alt={image.alt}
                title={image.title}
                caption={
                  <Caption
                    kind="Figure"
                    item={resource}
                    text={resource.caption}
                  />
                }
              />
            </div>
          ))}
        </div>
        <figcaption className="record-figure-group__caption">
          <Caption kind="Figure" item={resource} text={resource.caption} />
        </figcaption>
      </figure>
    );
  }
  if (resource.kind === "custom") {
    return (
      <figure className="record-figure record-figure--custom">
        {resource.node}
        {resource.caption && (
          <figcaption>
            <Caption kind="Figure" item={resource} text={resource.caption} />
          </figcaption>
        )}
      </figure>
    );
  }
  if (resource.kind === "table-placeholder") {
    return (
      <div className="record-table-wrap">
        <p className="record-table-caption">
          <Caption kind="Table" item={resource} text={resource.caption} />
        </p>
        <div className="record-figure__placeholder" aria-hidden="true">
          [ table placeholder ]
        </div>
      </div>
    );
  }
  return (
    <figure className="record-figure">
      <div className="record-figure__placeholder" aria-hidden="true">
        [ figure placeholder ]
      </div>
      <figcaption>
        <Caption kind="Figure" item={resource} text={resource.caption} />
      </figcaption>
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
export function ReferenceItem({
  scope,
  text,
}: {
  scope: string;
  text: string;
}) {
  const numberMatch = text.match(LEADING_NUMBER);
  const id = numberMatch ? `ref-${scope}-${numberMatch[1]}` : undefined;
  const urlMatch = text.match(URL_PATTERN);
  if (!urlMatch) return <li id={id}>{text}</li>;
  const url = urlMatch[1];
  const splitAt = text.indexOf(url);
  return (
    <li id={id}>
      {text.slice(0, splitAt)}
      <a
        className="record-reference-link"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
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
/** A stage's own closing note — what came of it, what it taught, what was
 * deliberately left undone — labelled rather than shouted mid-paragraph. */
function Callouts({ callouts }: { callouts?: BodyCallout[] }) {
  if (!callouts?.length) return null;
  const label: Record<BodyCallout["kind"], string> = {
    outcome: "Outcome",
    learn: "What we learned",
    "not-done": "What we did not do",
  };
  return (
    <>
      {callouts.map((callout, index) => (
        <div
          className={`experiment-callout experiment-callout--${callout.kind}`}
          key={index}
        >
          <span className="experiment-callout__label">
            {label[callout.kind]}
          </span>
          <p className="experiment-callout__text">
            <Rich text={callout.text} />
          </p>
        </div>
      ))}
    </>
  );
}

function EnzymeChips({ enzymes }: { enzymes?: ("DHAK" | "PPK2")[] }) {
  if (!enzymes?.length) return null;
  return (
    <span className="experiment-card__enzymes">
      {enzymes.map((enzyme) => (
        <span
          className={`experiment-chip experiment-chip--${enzyme.toLowerCase()}`}
          key={enzyme}
        >
          {enzyme}
        </span>
      ))}
    </span>
  );
}

function SectionHeading({
  title,
  enzymes,
}: {
  title?: string;
  enzymes?: ("DHAK" | "PPK2")[];
}) {
  if (!title) return null;
  return (
    <div className="experiment-section__head">
      <h4 className="experiment-section__heading">{title}</h4>
      <EnzymeChips enzymes={enzymes} />
    </div>
  );
}

function BodyBlock({
  block,
  level = 1,
}: {
  block: ExperimentBodyBlock;
  level?: number;
}) {
  const hasParagraphs = !!block.paragraphs?.length;

  /* A folded section: the title is the summary, the children are what it
     opens. Nested foldables take level 2, which the stylesheet sets as a
     quieter, indented row rather than a second boxed panel. */
  if (block.foldable) {
    return (
      <details
        className={`experiment-section--foldable level-${level}`}
        id={block.id}
      >
        <summary className="experiment-section__summary">
          <SectionHeading title={block.title} enzymes={block.enzymes} />
        </summary>
        <div className="experiment-section__content">
          {block.blocks?.map((child, index) => (
            <BodyBlock block={child} level={level + 1} key={index} />
          ))}
          <Callouts callouts={block.callouts} />
        </div>
      </details>
    );
  }

  const blockClass = [
    "experiment-card__block",
    block.title && !block.group ? "experiment-card__block--section" : "",
    block.group ? "experiment-card__block--group" : "",
    block.layout ? `experiment-card__block--${block.layout}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!block.pairedResource) {
    return (
      <div className={blockClass} id={block.id}>
        <SectionHeading title={block.title} enzymes={block.enzymes} />
        <DescriptionParagraphs paragraphs={block.paragraphs ?? []} />
        <Callouts callouts={block.callouts} />
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
      <div className={blockClass} id={block.id}>
        <SectionHeading title={block.title} enzymes={block.enzymes} />
        {hasParagraphs && (
          <DescriptionParagraphs paragraphs={block.paragraphs!} />
        )}
        <ResourcePane resource={block.pairedResource} />
        <Callouts callouts={block.callouts} />
      </div>
    );
  }

  return (
    <div className={`experiment-card__pair ${blockClass}`}>
      <div className="experiment-card__text">
        <SectionHeading title={block.title} enzymes={block.enzymes} />
        <DescriptionParagraphs paragraphs={block.paragraphs!} />
        <Callouts callouts={block.callouts} />
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
  const [openProtocol, setOpenProtocol] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const hasEditorial = !!data.editorial?.length;
  const hasBody = !hasEditorial && !!data.body?.length;
  const hasMaterials = !!(
    data.materialsTable?.length || data.materialsList?.length
  );
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
  const canPairTable =
    !hasBody && hasTables && !hasMaterials && !hasProtocol && !hasWideTable;
  const descriptionParagraphs = hasBody
    ? []
    : Array.isArray(data.description)
      ? data.description
      : [data.description];
  const hasFooter = !!(
    hasNotes ||
    hasReferences ||
    hasProtocolFiles ||
    data.pdfHref
  );

  return (
    <article className="experiment-card">
      <header className="experiment-card__header">
        <div className="experiment-card__titlerow">
          <h3 className="experiment-card__title">
            <Rich text={data.title} />
          </h3>
          <EnzymeChips enzymes={data.enzymes} />
        </div>
        {!hasEditorial && !hasBody && !canPairTable && (
          <DescriptionParagraphs paragraphs={descriptionParagraphs} />
        )}
      </header>

      {hasEditorial && <EditorialText blocks={data.editorial!} />}

      {hasBody &&
        data.body!.map((block, index) => (
          <BodyBlock block={block} key={index} />
        ))}

      {hasEditorial &&
        data.body
          ?.filter((block) => block.pairedResource)
          .map((block, index) => (
            <BodyBlock
              block={{
                pairedResource: block.pairedResource,
                layout: block.layout,
              }}
              key={`resource-${index}`}
            />
          ))}

      {!hasEditorial && !hasBody && canPairTable && (
        <div className="experiment-card__pair">
          <div className="experiment-card__text">
            <DescriptionParagraphs paragraphs={descriptionParagraphs} />
          </div>
          <section
            className="experiment-card__tables"
            aria-label="Experimental parameters"
          >
            {data.tables!.map((table, index) => (
              <DataTable table={table} numberKey={table} key={index} />
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
                    <td>
                      <Rich text={row.item} />
                    </td>
                    <td>
                      <Rich text={row.quantity ?? "—"} />
                    </td>
                    <td>
                      <Rich text={row.notes ?? "—"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <ul className="record-checklist">
              {data.materialsList!.map((item) => (
                <li key={item}>
                  <Rich text={item} />
                </li>
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
              <li key={index}>
                <Rich text={step.text} />
              </li>
            ))}
          </ol>
        </section>
      )}

      {(hasEditorial || !hasBody) &&
        hasTables &&
        (hasEditorial || !canPairTable) && (
          <section
            className="experiment-card__tables"
            aria-label="Experimental parameters"
          >
            {data.tables!.map((table, index) => (
              <DataTable table={table} numberKey={table} key={index} />
            ))}
          </section>
        )}

      {(hasEditorial || !hasBody) && data.figure && (
        <figure className="record-figure experiment-card__figure">
          <div className="record-figure__placeholder" aria-hidden="true">
            [ figure placeholder ]
          </div>
          <figcaption>
            <Caption
              kind="Figure"
              item={data.figure}
              text={data.figure.caption}
            />
          </figcaption>
        </figure>
      )}

      {hasFooter && (
        <footer className="experiment-card__footer">
          {hasNotes && (
            <div className="record-notes">
              {data.notes!.map((note, index) => (
                <p className="record-note" key={index}>
                  <strong>
                    {note.kind === "warning" ? "Warning" : "Note"}:
                  </strong>{" "}
                  <Rich text={note.text} />
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
                  <button
                    type="button"
                    className="record-download record-download--compact"
                    onClick={() =>
                      setOpenProtocol({
                        src: asset(protocol.href),
                        title: protocol.label,
                      })
                    }
                    key={index}
                  >
                    {protocol.label} (PDF)
                  </button>
                ))}
              </div>
            </div>
          )}

          {data.pdfHref && (
            <button
              type="button"
              className="record-download"
              onClick={() =>
                setOpenProtocol({
                  src: asset(data.pdfHref!),
                  title: `${data.title} protocol`,
                })
              }
            >
              Download protocol (PDF)
            </button>
          )}
        </footer>
      )}
      {openProtocol && (
        <ProtocolModal
          src={openProtocol.src}
          title={openProtocol.title}
          onClose={() => setOpenProtocol(null)}
        />
      )}
    </article>
  );
}
