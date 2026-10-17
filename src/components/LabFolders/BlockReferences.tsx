import { useEffect, useRef } from "react";

import { ReferenceItem } from "./ExperimentCard";

/**
 * One block's reference list, at the very bottom of its page and folded
 * away behind a summary: a numbered list of twelve papers between the
 * last experiment and the end of the page is noise for a reader who is
 * not chasing a citation, and the citations themselves are what send
 * anyone who is.
 *
 * An inline "[n]" anywhere above links to an entry inside this <details>,
 * which a closed <details> would hide. Browsers are gaining the
 * auto-expanding behaviour the HTML spec now requires for that case, but
 * not all of them have it, so the click is handled here too: a click on
 * any citation link pointing into this list opens it first.
 */
export function BlockReferences({
  id,
  scope,
  items,
}: {
  id?: string;
  scope: string;
  items: string[];
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function open(event: Event) {
      const link = (event.target as HTMLElement | null)?.closest?.(
        "a.lab-citation",
      );
      const details = ref.current;
      if (!link || !details) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith(`#ref-${scope}-`)) details.open = true;
    }
    document.addEventListener("click", open, true);
    return () => document.removeEventListener("click", open, true);
  }, [scope]);

  return (
    <section className="lab-subblock" id={id ?? "references"}>
      <details ref={ref} className="lab-refs">
        <summary className="lab-refs__summary">
          <span className="lab-refs__title">References</span>
          <span className="lab-refs__count">{items.length}</span>
        </summary>
        <div className="lab-prose">
          <ul className="lab-block__references">
            {items.map((reference, index) => (
              <ReferenceItem scope={scope} text={reference} key={index} />
            ))}
          </ul>
        </div>
      </details>
    </section>
  );
}
