import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
  /**
   * False for links that are cross-listed under a second group (e.g.
   * "Human practices" also appears under Judging). Cross-listed links
   * still highlight themselves when active, but never activate their
   * group's trigger — matching the original static markup exactly.
   */
  primary?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Project",
    items: [
      { label: "Project description", path: "/project-description" },
      { label: "Engineering", path: "/engineering" },
      { label: "Model", path: "/model" },
      { label: "Hardware", path: "/hardware" },
    ],
  },
  {
    label: "Laboratory",
    items: [
      { label: "Experiments", path: "/experiments" },
      { label: "Measurements", path: "/measurement" },
      { label: "Results", path: "/results" },
      { label: "Safety", path: "/safety" },
    ],
  },
  {
    label: "Engagement",
    items: [
      { label: "Human practices", path: "/human-practices" },
      {
        label: "Collaboration and Partnership",
        path: "/collaboration-partnership",
      },
      {
        label: "Education and Communication",
        path: "/education-communication",
      },
      { label: "Entrepreneurship", path: "/entrepreneurship" },
      { label: "Sustainability", path: "/sustainability" },
      { label: "Contribution", path: "/contribution" },
    ],
  },
  {
    label: "Team",
    items: [{ label: "Team", path: "/team" }],
  },
  {
    label: "Judging",
    items: [
      { label: "Judging", path: "/medals", primary: true },
      { label: "Measurements", path: "/measurement", primary: false },
      { label: "Entrepreneurship", path: "/entrepreneurship", primary: false },
      { label: "Sustainability", path: "/sustainability", primary: false },
    ],
  },
];

interface SearchEntry {
  label: string;
  path: string;
  section: string;
  terms: string;
}

const SEARCH_ENTRIES: SearchEntry[] = [
  {
    label: "Home",
    path: "/",
    section: "Overview",
    terms:
      "rephlow phosphate wastewater eutrophication solution promotion video",
  },
  {
    label: "Project Description",
    path: "/project-description",
    section: "Project",
    terms:
      "problem eutrophication solution hardware encapsulation enzyme genetic engineering model revalorisation",
  },
  {
    label: "Engineering",
    path: "/engineering",
    section: "Project",
    terms:
      "design build test learn dbtl bacterial encapsulation enzymatic immobilisation genetics revalorisation",
  },
  {
    label: "Model",
    path: "/model",
    section: "Project",
    terms:
      "flux balance analysis fba metabolic network sensitivity growth polyp accumulation",
  },
  {
    label: "Hardware",
    path: "/hardware",
    section: "Project",
    terms: "device bioreactor prototype design",
  },
  {
    label: "Experiments",
    path: "/experiments",
    section: "Laboratory",
    terms:
      "protocols alginate core shell enzyme genetic engineering revalorisation",
  },
  {
    label: "Measurements",
    path: "/measurement",
    section: "Laboratory",
    terms:
      "quantification calibration morphology stability enzyme activity phosphorus recovery",
  },
  {
    label: "Results",
    path: "/results",
    section: "Laboratory",
    terms: "data analysis conclusions alginate enzyme genetics revalorisation",
  },
  {
    label: "Safety",
    path: "/safety",
    section: "Laboratory",
    terms: "biosafety containment bsl1 organisms risks laboratory solution",
  },
  {
    label: "Human Practices",
    path: "/human-practices",
    section: "Engagement",
    terms: "stakeholders design compass travel archive implementation impact",
  },
  {
    label: "Collaboration and Partnership",
    path: "/collaboration-partnership",
    section: "Engagement",
    terms: "igem community research partners industry entrepreneurship",
  },
  {
    label: "Education and Communication",
    path: "/education-communication",
    section: "Engagement",
    terms: "outreach schools museums congress events learning dialogue",
  },
  {
    label: "Entrepreneurship",
    path: "/entrepreneurship",
    section: "Engagement",
    terms: "customers market business scalable product development impact",
  },
  {
    label: "Sustainability",
    path: "/sustainability",
    section: "Engagement",
    terms: "sdg goals impact circular economy environment",
  },
  {
    label: "Contribution",
    path: "/contribution",
    section: "Engagement",
    terms: "resources protocols registry parts reuse troubleshooting",
  },
  {
    label: "Team",
    path: "/team",
    section: "Team",
    terms: "members advisors mentors attributions",
  },
  {
    label: "Medals",
    path: "/medals",
    section: "Judging",
    terms: "bronze silver gold deliverables awards criteria",
  },
];

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getSubmenuId(label: string) {
  return `navbar-submenu-${label.toLowerCase().replace(/\s+/g, "-")}`;
}

export function Navbar() {
  const { pathname } = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [isTouchLayout, setIsTouchLayout] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Coarse-pointer / no-hover devices (phones, most tablets) get a tap-to-open
  // dropdown rendered through a portal — see the big comment near the portal
  // render below for why. Kept in state (not just read inline on click) so
  // the portal's render condition and the click handler always agree.
  useEffect(() => {
    const mql = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouchLayout(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Close whichever dropdown is open whenever the route changes.
  useEffect(() => {
    setOpenGroup(null);
    setSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [searchOpen]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (navRef.current?.contains(target)) return;
      if (portalRef.current?.contains(target)) return;
      setOpenGroup(null);
    }
    function onDocKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setOpenGroup(null);
        return;
      }
      if (e.key !== "Escape") return;
      setSearchOpen(false);
      setOpenGroup((current) => {
        if (current) triggerRefs.current[current]?.focus();
        return null;
      });
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onDocKeydown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onDocKeydown);
    };
  }, []);

  // The portaled dropdown is positioned from the navbar pill's own measured
  // bottom edge (it has no positioned ancestor to anchor `top: 100%` to
  // once it's rendered into <body> — see below), re-measured whenever it
  // opens or the viewport changes.
  useLayoutEffect(() => {
    if (!isTouchLayout || !openGroup) return;
    function measure() {
      if (navRef.current) {
        setDropdownTop(navRef.current.getBoundingClientRect().bottom + 8);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [isTouchLayout, openGroup]);

  function toggleGroup(label: string) {
    setOpenGroup((current) => (current === label ? null : label));
  }

  function renderDropdownLinks(group: NavGroup) {
    return group.items.map((item) => {
      const active = item.path === pathname;
      return (
        <Link
          key={item.path}
          className={`navbar__dropdown-link${active ? " is-active" : ""}`}
          to={item.path}
          aria-current={active ? "page" : undefined}
          onClick={(e) => {
            e.currentTarget.blur();
            setOpenGroup(null);
          }}
        >
          {item.label}
        </Link>
      );
    });
  }

  const openNavGroup = NAV_GROUPS.find((group) => group.label === openGroup);
  const searchResults = useMemo(() => {
    const words = normalizeSearch(searchQuery).split(/\s+/).filter(Boolean);
    if (!words.length) return SEARCH_ENTRIES;
    return SEARCH_ENTRIES.filter((entry) => {
      const haystack = normalizeSearch(
        `${entry.label} ${entry.section} ${entry.terms}`,
      );
      return words.every((word) => haystack.includes(word));
    });
  }, [searchQuery]);

  return (
    <nav className="navbar" aria-label="Main navigation" ref={navRef}>
      <div className="navbar__links">
        <Link
          className={`navbar__link${pathname === "/" ? " is-active" : ""}`}
          to="/"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          Home
        </Link>

        {NAV_GROUPS.map((group) => {
          const isOpen = openGroup === group.label;
          const triggerActive = group.items.some(
            (item) => item.primary !== false && item.path === pathname,
          );
          const triggerHref = group.items[0].path;
          const submenuId = getSubmenuId(group.label);

          return (
            <div
              className={`navbar__item${isOpen ? " is-open" : ""}`}
              key={group.label}
            >
              <Link
                className={`navbar__link${triggerActive || isOpen ? " is-active" : ""}`}
                to={triggerHref}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={submenuId}
                aria-current={triggerActive ? "page" : undefined}
                ref={(el) => {
                  triggerRefs.current[group.label] = el;
                }}
                onClick={(e) => {
                  if (!isTouchLayout) return;
                  e.preventDefault();
                  toggleGroup(group.label);
                }}
              >
                {group.label}
              </Link>

              {/* Desktop only (hover-driven, unchanged). On touch layouts
                  the equivalent content is rendered through the portal
                  below instead, so this is intentionally left unmounted
                  there rather than just hidden — see the portal comment. */}
              {!isTouchLayout && (
                <div
                  id={submenuId}
                  className="navbar__dropdown"
                  aria-label={`${group.label} submenu`}
                >
                  {renderDropdownLinks(group)}
                </div>
              )}
            </div>
          );
        })}

        <button
          className="navbar__search"
          type="button"
          aria-label="Search the wiki"
          aria-haspopup="dialog"
          aria-expanded={searchOpen}
          onClick={() => {
            setOpenGroup(null);
            setSearchOpen(true);
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {/*
        Real touch browsers (this reproduces on-device; Chrome's desktop-based
        mobile emulator does not) clip a `position: fixed` dropdown here even
        though its containing block is redefined to the (transformed) .navbar
        pill via the usual CSS trick — because .navbar__links carries
        `-webkit-overflow-scrolling: touch` for momentum scrolling, and on
        real mobile engines that promotes it to a scrolling compositing layer
        that clips fixed-position descendants regardless of their containing
        block. The emulator never creates that layer, so the bug never shows
        up there. Rendering the open dropdown through a portal straight onto
        <body> removes it from that DOM subtree entirely, sidestepping the
        clipping regardless of how any given browser implements it.
      */}
      {isTouchLayout &&
        openNavGroup &&
        createPortal(
          <div
            id={getSubmenuId(openNavGroup.label)}
            className="navbar__dropdown navbar__dropdown--portal"
            style={{ top: dropdownTop }}
            aria-label={`${openNavGroup.label} submenu`}
            ref={portalRef}
          >
            {renderDropdownLinks(openNavGroup)}
          </div>,
          document.body,
        )}

      {searchOpen &&
        createPortal(
          <div
            className="wiki-search"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wiki-search-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSearchOpen(false);
            }}
          >
            <div className="wiki-search__panel">
              <div className="wiki-search__header">
                <div>
                  <p className="wiki-search__eyebrow">Search rePhlow</p>
                  <h2 id="wiki-search-title">Find a page or topic</h2>
                </div>
                <button
                  className="wiki-search__close"
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                >
                  ×
                </button>
              </div>
              <label className="wiki-search__field">
                <span className="sr-only">Search the wiki</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Try “phosphate”, “safety” or “stakeholders”"
                />
                <kbd>Esc</kbd>
              </label>
              <div className="wiki-search__results" aria-live="polite">
                {searchResults.length ? (
                  searchResults.map((entry) => (
                    <Link
                      className="wiki-search__result"
                      key={entry.path}
                      to={entry.path}
                    >
                      <span>{entry.label}</span>
                      <small>{entry.section}</small>
                    </Link>
                  ))
                ) : (
                  <p className="wiki-search__empty">
                    No matching page or topic. Try a broader term.
                  </p>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </nav>
  );
}
