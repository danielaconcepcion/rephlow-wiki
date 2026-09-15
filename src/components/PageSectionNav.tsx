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
  const observerRef = useRef<IntersectionObserver | null>(null);
  // Clicking a link jumps straight to that id, but the destination is
  // often already inside the observed band (or only briefly leaves it
  // during the scroll), so the IntersectionObserver may never re-fire —
  // leaving the previously-active link highlighted. Set activeId
  // optimistically on click, then ignore the observer's noisy
  // mid-scroll callbacks until the smooth scroll has actually settled,
  // so it doesn't fight the click with a stale intermediate target.
  const suppressObserverRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  function handleNavClick(id: string) {
    setActiveId(id);
    suppressObserverRef.current = true;
    clearTimeout(suppressTimerRef.current);
    suppressTimerRef.current = setTimeout(() => {
      suppressObserverRef.current = false;
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
    // Only observe leaf targets: a section's own id when it has no
    // children (unchanged from before — e.g. Medals), or its children's
    // ids when it does. Observing a parent section element as well would
    // make its (much taller) bounding box dominate the "topmost" pick
    // below for as long as any of its subsections are in view — *unless*
    // none of its children actually correspond to a real, independently
    // scrollable element (e.g. Experiments' individual experiments, which
    // are selected via onSelect rather than scrolled to; see
    // PageSubsection.onSelect above). In that case there is nothing else to
    // observe, so the section itself is the correct, and only, fallback.
    const ids = sections.flatMap((section) => {
      if (!section.children || section.children.length === 0)
        return [section.id];
      const realChildIds = section.children
        .map((child) => child.id)
        .filter((id) => document.getElementById(id) !== null);
      return realChildIds.length > 0 ? realChildIds : [section.id];
    });
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    // Read the actual sticky-nav offset from CSS (rather than a
    // hardcoded duplicate of --section-nav-offset) so the observed band
    // always starts exactly where content stops being hidden behind the
    // sticky nav, even if that offset ever changes.
    const offsetRaw = getComputedStyle(document.documentElement)
      .getPropertyValue("--section-nav-offset")
      .trim();
    const offset = parseFloat(offsetRaw) || 110;

    // Treat a thin band near the top of the viewport (just below the
    // floating main navbar) as "current". Whichever heading is inside
    // that band is the active one.
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserverRef.current) return;
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length === 0) return;

        const topMost = intersecting.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: `-${offset}px 0px -70% 0px`, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
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
