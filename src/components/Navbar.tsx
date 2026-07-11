import { useEffect, useRef, useState } from "react";
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
      { label: "Design", path: "/design" },
      { label: "Engineering", path: "/engineering" },
      { label: "Model", path: "/model" },
      { label: "Hardware", path: "/hardware" },
    ],
  },
  {
    label: "Laboratory",
    items: [
      { label: "Experiments", path: "/experiments" },
      { label: "Measurements", path: "/measurements" },
      { label: "Protocols", path: "/protocols" },
      { label: "Results", path: "/results" },
      { label: "Safety", path: "/safety" },
    ],
  },
  {
    label: "Engagement",
    items: [
      { label: "Human practices", path: "/human-practices" },
      { label: "Collaboration and Partnership", path: "/collaboration-partnership" },
      { label: "Education and Communication", path: "/education-communication" },
      { label: "Entrepreneurship", path: "/entrepreneurship" },
      { label: "Sustainability", path: "/sustainability" },
      { label: "Contribution", path: "/contribution" },
    ],
  },
  {
    label: "Team",
    items: [
      { label: "Team", path: "/team" },
      { label: "Attributions", path: "/attributions" },
      { label: "Sponsors", path: "/sponsors" },
    ],
  },
  {
    label: "Judging",
    items: [
      { label: "Medals", path: "/medals", primary: true },
      { label: "Human practices", path: "/human-practices", primary: false },
      { label: "Measurements", path: "/measurements", primary: false },
      { label: "Hardware", path: "/hardware", primary: false },
      { label: "Model", path: "/model", primary: false },
    ],
  },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Close whichever dropdown is open whenever the route changes.
  useEffect(() => {
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    function onDocKeydown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
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

  function toggleGroup(label: string) {
    setOpenGroup((current) => (current === label ? null : label));
  }

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
          const submenuId = `navbar-submenu-${group.label.toLowerCase().replace(/\s+/g, "-")}`;

          return (
            <div
              className={`navbar__item${isOpen ? " is-open" : ""}`}
              key={group.label}
            >
              <Link
                className={`navbar__link${triggerActive ? " is-active" : ""}`}
                to={triggerHref}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={submenuId}
                aria-current={triggerActive ? "page" : undefined}
                ref={(el) => {
                  triggerRefs.current[group.label] = el;
                }}
                onClick={(e) => {
                  const isTouchLayout = window.matchMedia("(hover: none), (pointer: coarse)").matches;
                  if (!isTouchLayout) return;
                  e.preventDefault();
                  toggleGroup(group.label);
                }}
              >
                {group.label}
              </Link>
              <div
                id={submenuId}
                className="navbar__dropdown"
                aria-label={`${group.label} submenu`}
              >
                {group.items.map((item) => {
                  const active = item.path === pathname;
                  return (
                    <Link
                      key={item.path}
                      className={`navbar__dropdown-link${active ? " is-active" : ""}`}
                      to={item.path}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpenGroup(null)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        <a className="navbar__search" href="#" aria-label="Search">
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
        </a>
      </div>
    </nav>
  );
}
