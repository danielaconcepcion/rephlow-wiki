/**
 * Resolves a path under /public (e.g. "assets/algae.png") to a URL that
 * works under the app's configured base path (see vite.config.ts).
 *
 * Migration note: these images are currently served from /public/assets
 * as a local development stand-in. Before Wiki Freeze they should be
 * uploaded via the iGEM Uploads tool and this helper's return value
 * swapped for the resulting static.igem.wiki URLs. See MIGRATION.md.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}
