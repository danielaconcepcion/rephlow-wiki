/* ==========================================================================
   Home media: everything the page loads from iGEM servers.
   ========================================================================== */

/**
 * Promotion video, one per language. These point to the .mp4 files in the
 * iGEM Uploads folder "home" (see STATIC below). A video.igem.org address
 * (https://video.igem.org/w/...) also works here: it then plays in the
 * embedded iGEM player instead.
 */
export const PROMO_VIDEOS = {
  en: "https://video.igem.org/download/web-videos/c88d5a44-f390-45f4-8b0f-668cd2492ef0-2160.mp4",
  es: "https://video.igem.org/download/web-videos/f750d5be-55d3-4ba6-b429-07cf0d48166f-2160.mp4",
  fr: "https://video.igem.org/download/web-videos/609f9a64-fa78-487a-a176-8c9133d7ec44-2160.mp4",
};

/**
 * Images, from the iGEM Uploads server, folder "home" of team 6124. Uploads
 * stores .png/.jpg as .avif; if one fails to load as .avif the page retries
 * it with its original name. If Uploads gives another address, this line is
 * the only thing to change.
 */
export const STATIC = "https://static.igem.wiki/teams/6124/wiki/home/";

const ORIGINAL = new Map<string, string>();

/** "rephlow-logo-transparent.png" -> ".../home/rephlow-logo-transparent.avif" */
export function image(name: string): string {
  const avif = STATIC + name.replace(/\.(jpe?g|png|webp)$/i, ".avif");
  ORIGINAL.set(avif, STATIC + name);
  return avif;
}

export function originalOf(url: string): string | undefined {
  return ORIGINAL.get(url);
}

/** Turns any video.igem.org address into its embeddable form. */
export function embedUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  const match = trimmed.match(
    /video\.igem\.org\/(?:w|videos\/watch|videos\/embed)\/([A-Za-z0-9-]+)/,
  );
  return match
    ? `https://video.igem.org/videos/embed/${match[1]}?warningTitle=0`
    : trimmed;
}
