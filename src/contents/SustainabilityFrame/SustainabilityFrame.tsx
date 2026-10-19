import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SustainabilityFrame.css";

/*
 * Sustainability page. The page itself is the standalone build in
 * public/sus-frame/ (with all its interactive parts), shown full-screen in
 * this frame. The wiki keeps its own navbar and footer around it.
 * Links to other wiki pages and the award badge open in the wiki itself.
 */
const SRC = `${import.meta.env.BASE_URL}sus-frame/index.html`;

export function SustainabilityFrame() {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    let doc: Document | null = null;

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || typeof target.closest !== "function") return;
      // Award badge in the page header -> Judging page, Gold Medal section.
      if (target.closest(".page-hero__awards")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        navigate("/medals#gold-medal");
        return;
      }
      // Links to other wiki pages (/hardware, /human-practices...) -> open in the wiki, not in the frame.
      const a = target.closest("a[href]");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("/") && !href.startsWith("//")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        navigate(href);
        window.scrollTo(0, 0);
      }
    };

    const attach = () => {
      doc?.removeEventListener("click", onClick, true);
      doc = frame.contentDocument;
      doc?.addEventListener("click", onClick, true);
      const badge = doc?.querySelector<HTMLElement>(".page-hero__awards .medals-tier-badge");
      if (badge) badge.style.cursor = "pointer";
    };
    frame.addEventListener("load", attach);
    // The badge is drawn by React a moment after "load".
    const late = window.setTimeout(attach, 1500);
    return () => {
      frame.removeEventListener("load", attach);
      window.clearTimeout(late);
      doc?.removeEventListener("click", onClick, true);
    };
  }, [navigate]);

  return <iframe ref={frameRef} className="sus-frame" src={SRC} title="Sustainability" />;
}
