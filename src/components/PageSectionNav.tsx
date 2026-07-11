import { useEffect, useRef, useState } from "react";
import "./PageSectionNav.css";

export interface PageSection {
  id: string;
  label: string;
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
 * Secondary, page-local "on this page" navigation — sticky on desktop,
 * a horizontally-scrollable bar on small screens. Entirely independent of
 * the main site Navbar (src/components/Navbar.tsx): it only ever links to
 * `#section-id` anchors on the current page.
 *
 * Usage: render this next to your page's main content inside a
 * `.page-with-section-nav` grid wrapper (see App.css, "PAGE SECTION NAV"),
 * and give each corresponding <section> the matching `id` plus
 * `scroll-margin-top: var(--section-nav-offset)` so headings don't end up
 * hidden behind the floating main navbar when jumped to.
 */
export function PageSectionNav({
  sections,
  ariaLabel = "Page sections",
}: PageSectionNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    // Treat a thin band near the top of the viewport (just below the
    // floating main navbar) as "current". Whichever section heading is
    // inside that band is the active one.
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
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                className={`page-section-nav__link${active ? " is-active" : ""}`}
                href={`#${section.id}`}
                aria-current={active ? "true" : undefined}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
