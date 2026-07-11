import { useEffect, useMemo, useRef, useState } from "react";
import "./PageSectionNav.css";

export interface PageSubsection {
  id: string;
  label: string;
}

export interface PageSection {
  id: string;
  label: string;
  /** Optional. When present, shown indented under this section — only
   * for the currently active section, and only above the 600px
   * breakpoint (see PageSectionNav.css). */
  children?: PageSubsection[];
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
    // below for as long as any of its subsections are in view.
    const ids = sections.flatMap((section) =>
      section.children && section.children.length > 0
        ? section.children.map((child) => child.id)
        : [section.id],
    );
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    // Treat a thin band near the top of the viewport (just below the
    // floating main navbar) as "current". Whichever heading is inside
    // that band is the active one.
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length === 0) return;

        const topMost = intersecting.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-110px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [sections]);

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
    </nav>
  );
}
