import { Link } from "react-router-dom";

/**
 * The static site had no 404 page (a missing file just 404'd at the host).
 * The SPA router needs a fallback, so this reuses the page-hero pattern
 * rather than introducing a new visual style.
 */
export function NotFound() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <h1 className="page-hero__title">Page not found</h1>
        <p className="page-hero__lede">
          The page you're looking for doesn't exist.{" "}
          <Link to="/">Return home</Link>.
        </p>
      </section>
    </main>
  );
}
