import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./ImageZoom.css";

/**
 * Whole wiki: click or tap a picture to see it enlarged, with its caption
 * when it has one. Close with the X, the backdrop or Esc. Pictures that are
 * links or buttons, small icons and logos, and pictures whose page already
 * opens its own viewer are left alone.
 */
type Shown = { src: string; alt: string; caption: string };

const SKIP = "a, button, nav, header, footer, [role='button'], [role='dialog'], .iz, [data-no-zoom]";
const OWN_VIEWER = "[role='dialog']:not(.iz), [class*='lightbox'], [class*='Lightbox'], [class*='-zoom']:not(.iz)";

function captionFor(img: HTMLImageElement): string {
  const fig = img.closest("figure");
  const cap = fig?.querySelector("figcaption");
  if (cap && cap.textContent?.trim()) return cap.innerHTML;
  // a caption drawn next to the picture (e.g. a label over a photo)
  let box: HTMLElement | null = img.parentElement;
  for (let i = 0; box && i < 3; i++, box = box.parentElement) {
    if (box.querySelectorAll("img").length > 1) break;
    const c = box.querySelector<HTMLElement>("[class*='caption'], [class*='Caption'], figcaption");
    if (c && !c.contains(img) && c.textContent?.trim()) return c.innerHTML;
  }
  return "";
}

function visible(el: Element): boolean {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
}

export function ImageZoom() {
  const [shown, setShown] = useState<Shown | null>(null);

  useEffect(() => {
    // what was already open just before the click (taken before the page reacts to it)
    let before = new Map<Element, boolean>();
    const snapshot = () => {
      before = new Map([...document.querySelectorAll(OWN_VIEWER)].map((el) => [el, visible(el)]));
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      const img = (e.target as HTMLElement | null)?.closest?.("img");
      if (!img || img.closest(SKIP)) return;
      const r = img.getBoundingClientRect();
      if (r.width < 120 || r.height < 80) return;
      const data: Shown = { src: img.currentSrc || img.src, alt: img.alt, caption: captionFor(img) };
      // give the page a moment: if it opened its own viewer, do nothing
      window.setTimeout(() => {
        const opened = [...document.querySelectorAll(OWN_VIEWER)].some(
          (el) => visible(el) && (!before.has(el) || !before.get(el)),
        );
        if (!opened) setShown(data);
      }, 60);
    };
    window.addEventListener("pointerdown", snapshot, true);
    window.addEventListener("click", snapshot, true);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("pointerdown", snapshot, true);
      window.removeEventListener("click", snapshot, true);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShown(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [shown]);

  if (!shown) return null;
  return createPortal(
    <div className="iz" role="dialog" aria-modal="true" aria-label={shown.alt || "Image"} onClick={() => setShown(null)}>
      <button type="button" className="iz__close" aria-label="Close" onClick={() => setShown(null)}>
        {"\u00d7"}
      </button>
      <figure className="iz__figure" onClick={(e) => e.stopPropagation()}>
        <img src={shown.src} alt={shown.alt} />
        {shown.caption && <figcaption className="iz__caption" dangerouslySetInnerHTML={{ __html: shown.caption }} />}
      </figure>
    </div>,
    document.body,
  );
}
