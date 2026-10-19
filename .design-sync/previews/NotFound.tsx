import { NotFound } from "team-slug";

// The router's catch-all page — no props, no variants; one canonical render.
export function Default() {
  return <NotFound />;
}
