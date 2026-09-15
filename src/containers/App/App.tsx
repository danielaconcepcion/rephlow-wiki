import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { stringToSlug } from "../../utils";
import { getPathMapping } from "../../utils/getPathMapping";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { NotFound } from "../../components/NotFound";
import { Footer } from "../../components/Footer";

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
              moleculeSeed,
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
                      moleculeSeed={moleculeSeed}
                    />
                  )}
                  <Component />
                </>
              }
            />
          ),
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* MUST mention license AND have a link to team wiki's repository on gitlab.igem.org */}
      <Footer />
    </>
  );
};

export default App;
