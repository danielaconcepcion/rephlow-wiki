/**
 * Resolves a path used by the wiki to the URL it is actually served from.
 *
 * Anything under `assets/` lives on iGEM Uploads, as the wiki rules
 * require: the uploaded tree mirrors this repository's own `public/assets`
 * folder, so `assets/team/institutions/bbm-transparent.webp` resolves to
 * <UPLOADS>assets/team/institutions/bbm-transparent.webp and none of the
 * call sites had to change. Those files are therefore NOT in this
 * repository — iGEM's GitLab caps a push at 11 MiB, and they came to about
 * 311 MB.
 *
 * Uploads re-encodes PNG and JPEG as AVIF and serves them under the new
 * extension, so a path ending in .png or .jpg has to be asked for as
 * .avif. WebP and SVG are served untouched. This was measured, not
 * assumed: of the 310 files uploaded at the time of writing, all 148 that
 * arrived as png/jpg/jpeg answer only on .avif, and all 162 webp/svg
 * answer on their own name — no exceptions either way. Anything else (a
 * PDF, an .mp4, a .json) is left alone; none had been uploaded yet, so
 * there is nothing to go on, and leaving the name as it is is the
 * assumption that fails loudly rather than silently.
 *
 * Everything outside `assets/` stays on the wiki's own origin, under the
 * configured base path (see vite.config.ts). Right now that is only
 * `generated/scenarios/`, the Model page's scenario data, which the build
 * produces from `data/metabolic-network-scenarios` rather than uploaded.
 */
const UPLOADS = "https://static.igem.wiki/teams/6124/wiki/";

/** Extensions Uploads re-encodes to AVIF, lower-cased. */
const RECODED_TO_AVIF = [".png", ".jpg", ".jpeg"];

/** Folders that went up under a different name from the one this
 * repository uses. Checked against the server: all 35 files this wiki
 * asks for under assets/collaboration/ answer on assets/collaborations/. */
const RENAMED_FOLDERS: Record<string, string> = {
  collaboration: "collaborations",
};

export function asset(path: string): string {
  if (!path.startsWith("assets/")) {
    return `${import.meta.env.BASE_URL}${path}`;
  }

  const rest = path.slice("assets/".length);
  const slash = rest.indexOf("/");
  const renamed =
    slash === -1 ? undefined : RENAMED_FOLDERS[rest.slice(0, slash)];
  let served = renamed ? `assets/${renamed}${rest.slice(slash)}` : path;

  const lower = served.toLowerCase();
  const recoded = RECODED_TO_AVIF.find((ext) => lower.endsWith(ext));
  if (recoded) served = `${served.slice(0, -recoded.length)}.avif`;

  return `${UPLOADS}${served}`;
}
