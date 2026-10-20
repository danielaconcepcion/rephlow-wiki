import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../SustainabilityFrame/SustainabilityFrame.css";

/*
 * Contribution page. The page itself is the standalone HTML in
 * public/contrib-frame/ (with all its interactive parts), shown in a frame.
 *
 * One scrollbar, like the other pages: the frame stays pinned to the screen
 * while the wiki page scrolls through a spacer as tall as the frame's content,
 * and the frame's content is moved in step with it. Its own sticky menu,
 * pop-ups and "Back to top" keep working because, inside the frame, they see
 * a normal screen-sized window.
 *
 * Links to other wiki pages and the award badge open in the wiki itself.
 */
const SRC = `${import.meta.env.BASE_URL}contrib-frame/index.html`;

export function ContributionFrame() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    if (!wrap || !frame) return undefined;
    let doc: Document | null = null;
    let win: Window | null = null;
    let ro: ResizeObserver | null = null;
    // Last positions we moved the frame / the page to, so their "scroll" events are not echoed back.
    let expected = -1;
    let expectedPage = -1;

    const wrapTop = () => wrap.getBoundingClientRect().top + window.scrollY;
    const frameMax = () =>
      doc ? Math.max(0, doc.documentElement.scrollHeight - (win?.innerHeight ?? 0)) : 0;

    // Wiki page scrolled -> move the frame's content to the same place.
    const fromPage = () => {
      if (!win) return;
      if (expectedPage >= 0 && Math.abs(window.scrollY - expectedPage) < 2) {
        expectedPage = -1;
        return;
      }
      expectedPage = -1;
      const y = Math.min(frameMax(), Math.max(0, window.scrollY - wrapTop()));
      if (Math.abs(win.scrollY - y) < 1) return;
      expected = y;
      win.scrollTo({ top: y, behavior: "instant" });
    };
    // The frame scrolled itself (menu links, "Back to top"...) -> scroll the wiki page.
    const fromFrame = () => {
      if (!win) return;
      if (expected >= 0 && Math.abs(win.scrollY - expected) < 2) {
        expected = -1;
        return;
      }
      expected = -1;
      const y = wrapTop() + win.scrollY;
      if (Math.abs(window.scrollY - y) < 1) return;
      expectedPage = y;
      window.scrollTo({ top: y, behavior: "instant" });
    };
    const fitHeight = () => {
      if (!doc) return;
      wrap.style.height = `${doc.documentElement.scrollHeight}px`;
      fromPage();
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || typeof target.closest !== "function") return;
      if (target.closest(".page-hero__awards")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        navigate("/medals#bronze-medal");
        return;
      }
      // Links to other wiki pages (/hardware, /human-practices...) -> open in the wiki, not in the frame.
      const a = target.closest("a[href]");
      let href = a?.getAttribute("href") ?? "";
      // Full links to this wiki (https://2026.igem.wiki/madrid-ucm/...) are opened as wiki pages too.
      const wiki = href.match(/^https?:\/\/2026\.igem\.wiki\/madrid-ucm(\/[^#?]*)?/i);
      if (wiki && a?.getAttribute("target") !== "_blank") href = wiki[1] || "/";
      if (href.startsWith("/") && !href.startsWith("//")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        navigate(href);
        window.scrollTo(0, 0);
      }
    };

    const detach = () => {
      doc?.removeEventListener("click", onClick, true);
      win?.removeEventListener("scroll", fromFrame);
      ro?.disconnect();
    };
    const attach = () => {
      detach();
      doc = frame.contentDocument;
      win = frame.contentWindow;
      if (!doc || !win) return;
      doc.addEventListener("click", onClick, true);
      win.addEventListener("scroll", fromFrame, { passive: true });
      ro = new ResizeObserver(fitHeight);
      ro.observe(doc.documentElement);
      if (doc.body) ro.observe(doc.body);
      fitHeight();
    };

    frame.addEventListener("load", attach);
    window.addEventListener("scroll", fromPage, { passive: true });
    window.addEventListener("resize", fitHeight);
    return () => {
      frame.removeEventListener("load", attach);
      window.removeEventListener("scroll", fromPage);
      window.removeEventListener("resize", fitHeight);
      detach();
    };
  }, [navigate]);

  return (
    <div ref={wrapRef} className="sus-frame-wrap">
      <iframe ref={frameRef} className="sus-frame" src={SRC} title="Contribution" />
    </div>
  );
}
