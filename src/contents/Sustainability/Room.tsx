import { useEffect, useRef, type ReactNode } from "react";

import { CitationScope } from "../../components/LabFolders/citationScope";
import { asset } from "../../utils";
import { Blocks, Line, type Block } from "./blocks";

/* --------------------------------------------------------------------------
   One room of the plant: its number and name on the door, the room itself,
   Phlowi standing in it with what it says on the way in, and then the room's
   own text. Every "[n]" inside a room points at that room's own reference
   list, folded away at its foot.
   -------------------------------------------------------------------------- */

export interface RoomData {
  id: string;
  number: string;
  /** The short label the plant map and the section nav use. */
  tag: string;
  title: string;
  photo: string;
  phlowi: string;
  /** What Phlowi says on the way in, as the source writes it. */
  quote: string[];
  /** The iGEM ballot question this room answers. */
  question?: string;
  body: Block[];
  references: string[];
}

function References({ scope, items }: { scope: string; items: string[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  // An inline "[n]" jumps into this list, which a closed <details> would
  // hide — the same opening behaviour the lab pages use.
  useEffect(() => {
    function open(event: Event) {
      const link = (event.target as HTMLElement | null)?.closest?.(
        "a.lab-citation",
      );
      const details = ref.current;
      if (!link || !details) return;
      if ((link.getAttribute("href") ?? "").startsWith(`#ref-${scope}-`)) {
        details.open = true;
      }
    }
    document.addEventListener("click", open, true);
    return () => document.removeEventListener("click", open, true);
  }, [scope]);

  return (
    <details className="sus-refs" ref={ref}>
      <summary>
        <span>References</span>
        <span className="sus-refs__count">{items.length}</span>
      </summary>
      <ol className="sus-refs__list">
        {items.map((item, i) => (
          <li id={`ref-${scope}-${i + 1}`} key={i}>
            <Line t={item} />
          </li>
        ))}
      </ol>
    </details>
  );
}

export function Room({ room }: { room: RoomData }) {
  return (
    <CitationScope.Provider value={room.id}>
      <section className="sus-room" id={room.id}>
        <header className="sus-room__door">
          <span className="sus-room__number">{room.number}</span>
          <div>
            <span className="sus-room__tag">{room.tag}</span>
            <h2 className="sus-room__title">{room.title}</h2>
          </div>
        </header>

        <div className="sus-room__stage">
          <img className="sus-room__photo" src={asset(room.photo)} alt="" />
          <img className="sus-room__phlowi" src={asset(room.phlowi)} alt="" />
        </div>

        <div className="sus-room__intro">
          <blockquote className="sus-room__say">
            {room.quote.map((line, i) => (
              <p key={i}>
                <Line t={line} />
              </p>
            ))}
          </blockquote>
          {room.question && (
            <p className="sus-room__question">
              <Line t={room.question} />
            </p>
          )}
        </div>

        <div className="sus-room__body">
          <Blocks blocks={room.body} />
          <References scope={room.id} items={room.references} />
        </div>
      </section>
    </CitationScope.Provider>
  );
}

export function RoomSpacer({ children }: { children?: ReactNode }) {
  return <div className="sus-spacer">{children}</div>;
}
