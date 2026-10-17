import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

import { Rich } from "../../components/LabFolders/RichText";
import { ZoomableImage } from "../../components/LabFolders/ZoomableImage";
import { asset } from "../../utils";

/* --------------------------------------------------------------------------
   The four rooms hold a lot of prose, so each one is written as a list of
   blocks in its own content file and rendered here. The text itself is the
   team's Notion source, kept as written: **bold**, *italic* and the "[n]"
   citations are the marks the Notion pages already use (see RichText), and
   "[label](/path)" adds the cross-links the source writes as underlined
   page names.
   -------------------------------------------------------------------------- */

export type Tone = "blue" | "yellow" | "red" | "teal" | "green";

export interface Seat {
  /** "Seat 1 · Academia & research — Silvia Díaz del Toro (UCM)" */
  title: string;
  portrait?: string;
  /** Named when the image is not in the repository yet. */
  pending?: string;
  body: Block[];
}

export type Block =
  | { k: "p"; t: string }
  | { k: "h"; level: 3 | 4 | 5; id?: string; t: string }
  /** The UN target wording, printed as the source prints it: a tinted
   * panel, the whole quotation in italics, labels and years in bold. */
  | { k: "targets"; lines: string[] }
  | { k: "note"; tone: Tone; title?: string; body: Block[] }
  | { k: "quote"; lines: string[] }
  | { k: "table"; head: string[]; rows: string[][]; firstCol?: boolean }
  | {
      k: "figure";
      src: string;
      alt: string;
      caption?: string;
      /** Set instead of a real file while the image is still missing. */
      pending?: string;
      narrow?: boolean;
    }
  | { k: "list"; ordered?: boolean; items: string[] }
  | { k: "details"; title: string; body: Block[] }
  | { k: "seats"; seats: Seat[] };

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** One line of source text: markdown links first, then the inline marks
 * Rich already understands. */
export function Line({ t }: { t: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of t.matchAll(LINK)) {
    const at = match.index ?? 0;
    if (at > last) out.push(<Rich key={last} text={t.slice(last, at)} />);
    const [, label, href] = match;
    out.push(
      href.startsWith("/") ? (
        <Link key={at} className="lab-wikilink" to={href}>
          {label}
        </Link>
      ) : (
        <a
          key={at}
          className="sus-link"
          href={href}
          target={href.startsWith("#") ? undefined : "_blank"}
          rel={href.startsWith("#") ? undefined : "noreferrer"}
        >
          {label}
        </a>
      ),
    );
    last = at + match[0].length;
  }
  if (last < t.length) out.push(<Rich key={last} text={t.slice(last)} />);
  return <>{out}</>;
}

/** Several source lines in one block ("/" in the Notion export). */
function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <Line t={line} />
        </Fragment>
      ))}
    </>
  );
}

function Figure({
  src,
  alt,
  caption,
  pending,
  narrow,
}: Extract<Block, { k: "figure" }>) {
  return (
    <figure className={`sus-figure${narrow ? " sus-figure--narrow" : ""}`}>
      {pending ? (
        <div className="sus-figure__pending">
          <span>Image pending upload</span>
          <code>{pending}</code>
        </div>
      ) : (
        <ZoomableImage
          className="sus-figure__img"
          src={asset(src)}
          alt={alt}
          caption={caption ? <Line t={caption} /> : undefined}
        />
      )}
      {caption && (
        <figcaption className="sus-figure__caption">
          <Line t={caption} />
        </figcaption>
      )}
    </figure>
  );
}

function Table({ head, rows, firstCol }: Extract<Block, { k: "table" }>) {
  return (
    <div className="sus-table-wrap">
      <table className={`sus-table${firstCol ? " sus-table--rowhead" : ""}`}>
        <thead>
          <tr>
            {head.map((cell, i) => (
              <th key={i} scope="col">
                <Line t={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                firstCol && j === 0 ? (
                  <th key={j} scope="row">
                    <Line t={cell} />
                  </th>
                ) : (
                  <td key={j}>
                    <Lines lines={cell.split(" / ")} />
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

function Seats({ seats }: Extract<Block, { k: "seats" }>) {
  return (
    <div className="sus-seats">
      {seats.map((seat) => (
        <article className="sus-seat" key={seat.title}>
          <div className="sus-seat__portrait">
            {seat.pending ? (
              <div className="sus-figure__pending sus-figure__pending--seat">
                <code>{seat.pending}</code>
              </div>
            ) : (
              <img src={asset(seat.portrait ?? "")} alt="" />
            )}
          </div>
          <h5 className="sus-seat__title">
            <Line t={seat.title} />
          </h5>
          <Blocks blocks={seat.body} />
        </article>
      ))}
    </div>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.k) {
          case "p":
            return (
              <p className="sus-p" key={i}>
                <Lines lines={block.t.split(" / ")} />
              </p>
            );
          case "h": {
            const Tag = `h${block.level}` as "h3" | "h4" | "h5";
            return (
              <Tag className={`sus-h${block.level}`} id={block.id} key={i}>
                <Line t={block.t} />
              </Tag>
            );
          }
          case "targets":
            return (
              <div className="sus-targets" key={i}>
                <p>
                  <Lines lines={block.lines} />
                </p>
              </div>
            );
          case "note":
            return (
              <div className={`sus-note sus-note--${block.tone}`} key={i}>
                {block.title && (
                  <h5 className="sus-note__title">
                    <Line t={block.title} />
                  </h5>
                )}
                <Blocks blocks={block.body} />
              </div>
            );
          case "quote":
            return (
              <aside className="sus-quote" key={i}>
                <Lines lines={block.lines} />
              </aside>
            );
          case "table":
            return <Table key={i} {...block} />;
          case "figure":
            return <Figure key={i} {...block} />;
          case "list":
            return block.ordered ? (
              <ol className="sus-list" key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Line t={item} />
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="sus-list" key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Line t={item} />
                  </li>
                ))}
              </ul>
            );
          case "details":
            return (
              <details className="sus-details" key={i}>
                <summary>
                  <Line t={block.title} />
                </summary>
                <div className="sus-details__body">
                  <Blocks blocks={block.body} />
                </div>
              </details>
            );
          case "seats":
            return <Seats key={i} {...block} />;
        }
      })}
    </>
  );
}
