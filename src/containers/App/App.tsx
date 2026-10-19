import { SponsorsMarquee } from "../../components/SponsorsMarquee/SponsorsMarquee.tsx";
import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { stringToSlug } from "../../utils";
import { getPathMapping } from "../../utils/getPathMapping";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { NotFound } from "../../components/NotFound";
import { Footer } from "../../components/Footer";
import { AdjacentPageNav } from "../../components/AdjacentPageNav";

const App = () => {
  const pathMapping = getPathMapping();
  // useLocation (not the bare `location` global) so App re-renders — and
  // the title effect below re-runs — on every client-side navigation.
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);
  const currentPath =
    pathname.split(`${stringToSlug(import.meta.env.VITE_TEAM_NAME)}`).pop() ||
    "/";

  const docTitle =
    currentPath in pathMapping
      ? pathMapping[currentPath].docTitle
      : "Not Found — rePhlow iGEM Wiki";

  useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  // Start each newly visited page at the top. Tracking only pathname changes
  // preserves in-page anchor navigation and direct links to page sections.
  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <>
      <Navbar />

      <Routes>
        {Object.entries(pathMapping).map(
          ([
            path,
            {
              title,
              lead,
              hideHeader,
              hideEyebrow,
              compactHero,
              labHero,
              moleculeSeed,
              awards,
              component: Component,
            },
          ]) => (
            <Route
              key={path}
              path={path}
              element={
                <>
                  {!hideHeader && (
                    <Header
                      title={title}
                      lead={lead}
                      hideEyebrow={hideEyebrow}
                      compactHero={compactHero}
                      labHero={labHero}
                      moleculeSeed={moleculeSeed}
                      awards={awards}
                    />
                  )}
                  <Component />
                  {/* One shared Previous/Next handoff for the whole
                      wiki — order, labels and icons live in
                      components/pageNavMap.ts. */}
                  <AdjacentPageNav path={path} />
                </>
              }
            />
          ),
        )}
        {/* The measurement page is judged at iGEM's standard URL, which
            is singular (see pages.ts); the plural it used to live at keeps
            working for anything already linking to it. */}
        <Route
          path="/measurements"
          element={<Navigate to="/measurement" replace />}
        />

        {/* The official repository served Safety and Education at these two
            addresses for a while. The wiki's own pages link to the slugs
            below (Home's card grid among them), so those are the ones the
            route table keeps -- and these redirects mean nothing that was
            published at the old addresses stops working. */}
        <Route
          path="/safety-and-security"
          element={<Navigate to="/safety" replace />}
        />
        <Route
          path="/education"
          element={<Navigate to="/education-communication" replace />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* MUST mention license AND have a link to team wiki's repository on gitlab.igem.org */}
      <SponsorsMarquee />
      <Footer />
    </>
  );
};

export default App;
