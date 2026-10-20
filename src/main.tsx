import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App/App.tsx";
import { BrowserRouter } from "react-router-dom";

// Self-hosted replacements for the fonts.googleapis.com import the static
// site used to load at runtime (Space Grotesk 500/600/700, Inter 400/500/600),
// plus Kalam 400/700, the chalk hand on the Education & Communication board.
// Vite bundles these into the build output, so no third-party font request
// is made in production.
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/kalam/latin-400.css";
import "@fontsource/kalam/latin-ext-400.css";
import "@fontsource/kalam/latin-700.css";
import "@fontsource/kalam/latin-ext-700.css";
import { createElement as createZoomElement } from "react";
import { createRoot as createZoomRoot } from "react-dom/client";
import { ImageZoom } from "./components/ImageZoom/ImageZoom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);


// Picture viewer for the whole wiki (its own small root, outside the routes)
const imageZoomHost = document.createElement("div");
document.body.appendChild(imageZoomHost);
createZoomRoot(imageZoomHost).render(createZoomElement(ImageZoom));
