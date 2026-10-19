## Wrapping and setup

`Navbar`, `Footer`, and `NotFound` all use React Router (`<Link>`, and `Navbar`
also reads `useLocation()` to highlight the active section) — wrap any page
that uses them in a single Router (`BrowserRouter` in a real app; `MemoryRouter`
for an isolated preview):

```jsx
import { BrowserRouter } from "react-router-dom";

<BrowserRouter>
  <Navbar />
  {/* page content */}
  <Footer />
</BrowserRouter>
```

Don't nest a second Router inside one that's already there — react-router
throws ("An error occurred in the `<Router>` component") and the whole tree
renders blank. If you need to preview a specific route, set it on the single
outer Router (`initialEntries` on `MemoryRouter`) rather than adding another.

`Header` and `PageSectionNav` take no context — they render standalone.

## Styling idiom

No utility classes, no CSS-in-JS, no prop-based styling. Every component is
styled by plain CSS selectors reading a small set of global CSS custom
properties defined once in `:root`. Use the real token names — never invent
new ones or hardcode a hex/px value a token already covers:

| Purpose | Tokens |
|---|---|
| Ink / text | `--ink` (headings), `--ink-soft` (secondary text) |
| Surface | `--paper` (white), `--paper-soft` (off-white) |
| Border | `--line` (hairline, `rgba(27,35,64,0.08)`) |
| Type | `--font-display` (Space Grotesk — headings), `--font-body` (Inter — everything else) |
| Radius | `--radius-lg` (28px), `--radius-md` (18px) |
| Shadow | `--shadow-soft`, `--shadow-card` |
| Narrative accents | `--phosphate`, `--microbe`, `--algae`, `--water-clear/-light/-mid`, `--eutrophic`, `--eutrophic-deep`, `--oxygen` — this project's science-storytelling palette; reach for these before any arbitrary color when a design needs an accent |

`PageSectionNav` additionally reads `--section-nav-offset` (110px) — the
sticky top offset it clears under the floating Navbar pill.

For new layout glue you write around these components (a page wrapper, a
content column), style it the same way: `border: 1px solid var(--line)`,
`color: var(--ink-soft)`, etc. — never a competing class-name system.

## Where the truth lives

Read `styles.css` (imports `fonts/fonts.css` then `_ds_bundle.css`) before
styling anything — `_ds_bundle.css`'s `:root` block is the single source for
every token above, and its component rules (`.navbar`, `.site-footer`,
`.page-hero`, `.page-shell`, `.page-section-nav*`) show the real selectors in
context. Each component's own `.prompt.md` documents its props.

## Build snippet

```jsx
import { BrowserRouter } from "react-router-dom";
import { Navbar, Header, PageSectionNav, Footer } from "team-slug";

function Page() {
  return (
    <BrowserRouter>
      <Navbar />
      <Header title="Model" lead="Predict. Simulate. Refine." />
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 40 }}>
        <PageSectionNav
          sections={[{ id: "intro", label: "Introduction" }]}
          ariaLabel="Jump to section"
        />
        <main style={{ color: "var(--ink-soft)" }}>{/* page content */}</main>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
```
