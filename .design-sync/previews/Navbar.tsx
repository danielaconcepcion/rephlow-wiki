import { Navbar } from "team-slug";

// The global provider (cfg.provider) already wraps every card in a
// MemoryRouter at "/" — Navbar takes no props, so this renders its true
// default state (Home highlighted). A second, route-varied story would
// need its own nested MemoryRouter, but react-router throws on nested
// <Router>s, so there's no way to sweep the active-link state without
// a broken card; one clean, accurate render is the honest choice here.
export function Default() {
  return <Navbar />;
}
