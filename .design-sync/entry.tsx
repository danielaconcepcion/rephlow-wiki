// Hand-authored entry for design-sync's package-shape converter.
// madrid-ucm has no packaged library build (package.json has no
// main/module/exports), so the converter's default fallback would
// synthesize an entry by scanning every .tsx/.jsx file under src/ —
// pulling in the entire app (Home's 900-line narrative, the D3 model
// graph, every content page) instead of just the design-system pieces.
// This entry re-exports only the components scoped for this sync.
export { Navbar } from "../src/components/Navbar";
export { Header } from "../src/components/Header";
export { Footer } from "../src/components/Footer";
export { NotFound } from "../src/components/NotFound";
export { PageSectionNav } from "../src/components/PageSectionNav";
