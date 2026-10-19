import { useRef, type CSSProperties } from "react";
import { HardwareContent } from "./hardware/HardwareContent.tsx";
import { HardwareSectionNav } from "./hardware/HardwareSectionNav.tsx";
import { useHardwareInteractions } from "./hardware/useHardwareInteractions.ts";
import { img } from "./hardware/assets.ts";
import { FigureLightbox, useFigureLightbox } from "./hardware/FigureLightbox.tsx";
import "./hardware/Hardware.css";

/*
 * Hardware page (rePhlow · Madrid-UCM 2026).
 * Navbar, footer and page header come from the wiki layout, as on the other pages.
 */
export function Hardware() {
  const contentRef = useRef<HTMLElement>(null);
  useHardwareInteractions(contentRef);
  const lightbox = useFigureLightbox(contentRef);

  const pageStyle = { "--hw-split-img": `url("${img("hw-fig04-reactors.avif")}")` } as CSSProperties;

  return (
    <div className="pd-page mbg-host hw-page" style={pageStyle}>
      <div className="page-with-section-nav">
        <HardwareSectionNav />
        <div className="pd-content-wrap">
          <article className="pd-content" id="hw-content" ref={contentRef}>
            <HardwareContent />
          </article>
        </div>
      </div>
      <FigureLightbox {...lightbox} />
    </div>
  );
}
