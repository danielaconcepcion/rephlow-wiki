import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { initHome } from "./behaviour";
import { ExploreIndex } from "./ExploreIndex";
import { MARKUP } from "./markup";
import { PROMO_VIDEOS, embedUrl, image, originalOf } from "./media";
import "./Home.css";

/* --------------------------------------------------------------------------
   rePhlow Home: the approved standalone homepage (markup.ts), its styles
   (Home.css, prefixed rh- and scoped to .rh-page, so nothing from the old
   Home or from the rest of the wiki can reach it) and its behaviour
   (behaviour.ts). The wiki's navbar and footer frame it.
   -------------------------------------------------------------------------- */

export function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  // Everything up to this page's own "Explore rePhlow!" section. The team
  // asked for the previous Home's index grid instead, so that section is
  // dropped here and <ExploreIndex /> renders in its place below (it is
  // the last thing in MARKUP, so cutting at it loses nothing else).
  const html = useMemo(() => {
    const full = MARKUP.replace(/%IMG:([^%]+)%/g, (_, name: string) =>
      image(name),
    ).replace(/%BASE%/g, import.meta.env.BASE_URL);
    const explore = full.indexOf('<section class="rh-explore"');
    return explore === -1 ? full : full.slice(0, explore);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // An image that fails as .avif is retried once with its original name.
    const onError = (event: Event) => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement)) return;
      const fallback = originalOf(img.src);
      if (fallback && img.src !== fallback) img.src = fallback;
    };
    el.addEventListener("error", onError, true);
    const videos = {
      en: embedUrl(PROMO_VIDEOS.en),
      es: embedUrl(PROMO_VIDEOS.es),
      fr: embedUrl(PROMO_VIDEOS.fr),
    };
    const stop = initHome(el, videos, (route) => {
      navigate(route);
      window.scrollTo(0, 0);
    });
    return () => {
      el.removeEventListener("error", onError, true);
      stop();
    };
  }, [navigate]);

  return (
    <>
      <div
        className="rh-page"
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ExploreIndex />
    </>
  );
}
