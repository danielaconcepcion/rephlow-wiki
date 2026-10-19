import { useEffect, useMemo, useRef, type RefObject } from "react";

import { initMeasurements } from "./behaviour";
import { image, originalOf } from "./images";
import { MARKUP } from "./markup";
import "./Measurements.css";

/* --------------------------------------------------------------------------
   Measurements: the four wet-lab blocks read through the eleven techniques
   that measured them. The content is the approved standalone page
   (markup.ts) with its own styles (Measurements.css, scoped to .ms-page so
   nothing here touches the rest of the wiki) and its behaviour
   (behaviour.ts). The wiki's navbar, header and footer frame it as on every
   other page.
   -------------------------------------------------------------------------- */

/** If an image from iGEM Uploads fails to load as .avif, try it once more
 * with its original name (see images.ts). */
function useImageFallback(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onError = (event: Event) => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement)) return;
      const fallback = originalOf(img.src);
      if (fallback && img.src !== fallback) img.src = fallback;
    };
    el.addEventListener("error", onError, true);
    return () => el.removeEventListener("error", onError, true);
  }, [root]);
}

export function Measurements() {
  const ref = useRef<HTMLDivElement | null>(null);
  const html = useMemo(
    () => MARKUP.replace(/%IMG:([^%]+)%/g, (_, name: string) => image(name)),
    [],
  );

  useImageFallback(ref);
  useEffect(() => {
    if (!ref.current) return;
    return initMeasurements(ref.current);
  }, []);

  return (
    <div
      className="ms-page"
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
