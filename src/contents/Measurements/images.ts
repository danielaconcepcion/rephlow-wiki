/**
 * Every image on the Measurements page is served from the iGEM Uploads
 * server, folder "measurements" of team 6124 (the wiki rules keep images
 * out of the repository). Uploads stores .jpg/.png files as .avif, so
 * "tga-curves.png" is requested as <STATIC>tga-curves.avif. If an image
 * ever fails to load as .avif, the page retries it once with its original
 * name (see useImageFallback in Measurements.tsx).
 *
 * If Uploads gives the files a different address, this line is the only
 * thing to change.
 */
export const STATIC = "https://static.igem.wiki/teams/6124/wiki/measurements/";

const ORIGINAL = new Map<string, string>();

/** "tga-curves.png" -> ".../measurement/tga-curves.avif" */
export function image(name: string): string {
  const avif = STATIC + name.replace(/\.(jpe?g|png|webp)$/i, ".avif");
  ORIGINAL.set(avif, STATIC + name);
  return avif;
}

/** The original-name URL for an .avif URL produced by image(). */
export function originalOf(url: string): string | undefined {
  return ORIGINAL.get(url);
}
