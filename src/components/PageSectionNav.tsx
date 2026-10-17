import { useEffect, useMemo, useRef, useState } from "react";
import "./PageSectionNav.css";

export interface PageSubsection {
  id: string;
  label: string;
  /** Optional. Called when this subsection link is clicked, in addition to
   * the normal highlight/scroll behaviour — for a leaf that isn't itself a
   * distinct scroll target (e.g. Experiments' individual experiments, which
   * all share one on-page slot and are switched by re-triggering their own
   * folder-tab button; see Experiments.tsx). Leave unset for a real,
   * independently-scrollable subsection — the default href/scroll already
   * handles that case. */
  onSelect?: () => void;
}

export interface PageSection {
  id: string;
  label: string;
  /** Optional. When present, shown indented under this section — only
   * for the currently active section, and only above the 600px
   * breakpoint (see PageSectionNav.css). */
  children?: PageSubsection[];
  /** See PageSubsection.onSelect — same click-not-scroll leaf behaviour,
   * for a top-level section that isn't itself a distinct scroll target. */
  onSelect?: () => void;
}

interface PageSectionNavProps {
  /**
   * Stable list of in-page sections to link to. Pass a module-level
   * constant (not an inline array literal) so the reference stays stable
   * across renders and the IntersectionObserver effect below isn't torn
   * down and rebuilt on every render.
   */
  sections: PageSection[];
  /** aria-label for the <nav>. Defaults to something generic and useful. */
  ariaLabel?: string;
}

/**
 * Secondary, page-local "on this page" navigation — sticky sidebar on
 * desktop (with an optional indented subsection list under the active
 * section), a horizontally-scrollable top-level-only bar on small screens.
 * Entirely independent of the main site Navbar (src/components/Navbar.tsx):
 * it only ever links to `#id` anchors on the current page.
 *
 * Usage: render this next to your page's main content inside a
 * `.page-with-section-nav` grid wrapper (see PageSectionNav.css), and give
 * each corresponding heading/section the matching `id` plus
 * `scroll-margin-top: var(--section-nav-offset)` so it doesn't end up
 * hidden behind the floating main navbar when jumped to. Sections without
 * `children` behave exactly as before (e.g. Medals).
 */
export function PageSectionNav({
  sections,
  ariaLabel = "Page sections",
}: PageSectionNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  // Clicking a link jumps straight to that id, but the smooth scroll
  // takes a moment to get there. Set activeId optimistically on click,
  // then ignore the spy's noisy mid-scroll readings until the scroll has
  // actually settled, so it doesn't fight the click with a stale
  // intermediate target.
  const suppressSpyRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  function handleNavClick(id: string) {
    setActiveId(id);
    suppressSpyRef.current = true;
    clearTimeout(suppressTimerRef.current);
    suppressTimerRef.current = setTimeout(() => {
      suppressSpyRef.current = false;
    }, 900);
  }

  // Maps every section id AND every child id to its top-level section id,
  // so a subsection being active can also keep its parent highlighted.
  const parentMap = useMemo(() => {
    const map: Record<string, string> = {};
    sections.forEach((section) => {
      map[section.id] = section.id;
      section.children?.forEach((child) => {
        map[child.id] = section.id;
      });
    });
    return map;
  }, [sections]);

  const activeSectionId = parentMap[activeId] ?? sections[0]?.id ?? "";

  useEffect(() => {
    // The spy's targets: every section's own id, plus the ids of its
    // children where those are real, independently scrollable elements.
    // Children that only exist as click targets (e.g. Experiments'
    // individual experiments, which are switched via onSelect rather than
    // scrolled to; see PageSubsection.onSelect above) have no element, so
    // they simply don't take part.
    const ids = sections.flatMap((section) => [
      section.id,
      ...(section.children?.map((child) => child.id) ?? []),
    ]);

    const read = () =>
      ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

    if (!read().length) return;

    // Read the actual sticky-nav offset from CSS (rather than a
    // hardcoded duplicate of --section-nav-offset) so the band the spy
    // reads from always starts exactly where content stops being hidden
    // behind the sticky nav, even if that offset ever changes.
    const offsetRaw = getComputedStyle(document.documentElement)
      .getPropertyValue("--section-nav-offset")
      .trim();
    const offset = parseFloat(offsetRaw) || 110;

    // The last target whose top has passed just below the floating main
    // navbar is the current one. Reading positions (rather than watching
    // a band go in and out of view) is what makes the highlight follow
    // *any* way of arriving at a section — the links here, a #hash, or a
    // page's own scrollIntoView, as Sustainability's plant map uses.
    const pick = () => {
      if (suppressSpyRef.current) return;
      const elements = read();
      if (!elements.length) return;
      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= offset + 4) current = el.id;
        else break;
      }
      setActiveId(current);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pick();
      });
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections]);

  useEffect(() => {
    return () => clearTimeout(suppressTimerRef.current);
  }, []);

  return (
    <nav className="page-section-nav" aria-label={ariaLabel}>
      <ul className="page-section-nav__list">
        {sections.map((section) => {
          const isActiveSection = section.id === activeSectionId;
          const children = section.children;
          const hasChildren = !!children && children.length > 0;

          return (
            <li key={section.id}>
              <a
                className={`page-section-nav__link${isActiveSection ? " is-active" : ""}`}
                href={`#${section.id}`}
                aria-current={isActiveSection ? "true" : undefined}
                onClick={(event) => {
                  if (section.onSelect) event.preventDefault();
                  handleNavClick(section.id);
                  section.onSelect?.();
                }}
              >
                {section.label}
              </a>

              {hasChildren && isActiveSection && (
                <ul className="page-section-nav__sublist">
                  {children!.map((child) => {
                    const activeChild = child.id === activeId;
                    return (
                      <li key={child.id}>
                        <a
                          className={`page-section-nav__link page-section-nav__link--sub${activeChild ? " is-active" : ""}`}
                          href={`#${child.id}`}
                          aria-current={activeChild ? "true" : undefined}
                          onClick={(event) => {
                            // A leaf with onSelect has no real element to
                            // scroll to (see PageSubsection.onSelect) — skip
                            // the default hash-jump and let onSelect do the
                            // actual work (e.g. re-triggering a folder tab).
                            if (child.onSelect) event.preventDefault();
                            handleNavClick(child.id);
                            child.onSelect?.();
                          }}
                        >
                          {child.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {/* Secondary to the section list above -- smaller, quieter type,
          its own light divider -- not another section link, so it never
          competes with (or gets mistaken for) the actual page structure
          above it. Plain window.scrollTo rather than handleNavClick: this
          isn't a section, so it has no id to become the new activeId, and
          the IntersectionObserver above will naturally pick up whichever
          section is now nearest the top on its own. */}
      <button
        type="button"
        className="page-section-nav__top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span aria-hidden="true">↑</span> Back to top
      </button>
    </nav>
  );
}
