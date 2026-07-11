import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { getPathMapping, stringToSlug } from "../../utils";
import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { NotFound } from "../../components/NotFound";
import { Footer } from "../../components/Footer";

const App = () => {
  const pathMapping = getPathMapping();
  // useLocation (not the bare `location` global) so App re-renders — and
  // the title effect below re-runs — on every client-side navigation.
  const { pathname } = useLocation();
  const currentPath =
    pathname
      .split(`${stringToSlug(import.meta.env.VITE_TEAM_NAME)}`)
      .pop() || "/";

  const docTitle =
    currentPath in pathMapping
      ? pathMapping[currentPath].docTitle
      : "Not Found — rePhlow iGEM Wiki";

  useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  return (
    <>
      <Navbar />

      <Routes>
        {Object.entries(pathMapping).map(
          ([path, { title, lead, hideHeader, component: Component }]) => (
            <Route
              key={path}
              path={path}
              element={
                <>
                  {!hideHeader && <Header title={title} lead={lead} />}
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
