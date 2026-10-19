/**
 * Resolves a path used by the wiki to the URL it is actually served from.
 *
 * Anything under `assets/` lives on iGEM Uploads, as the wiki rules
 * require: the uploaded tree mirrors this repository's own `public/assets`
 * folder exactly, so `assets/team/institutions/bbm-transparent.webp`
 * resolves to <UPLOADS>assets/team/institutions/bbm-transparent.webp and
 * the call sites never had to change. Those files are therefore NOT in
 * this repository — iGEM's GitLab caps a push at 11 MiB, and they came to
 * about 311 MB.
 *
 * Everything else stays on the wiki's own origin, under the configured
 * base path (see vite.config.ts). Right now that is only
 * `generated/scenarios/`, the Model page's scenario data, which the build
 * produces from `data/metabolic-network-scenarios` (see
 * scripts/sync-metabolic-network-scenarios.mjs) rather than being
 * uploaded.
 */
const UPLOADS = "https://static.igem.wiki/teams/6124/wiki/";

export function asset(path: string): string {
  if (path.startsWith("assets/")) return `${UPLOADS}${path}`;
  return `${import.meta.env.BASE_URL}${path}`;
}
