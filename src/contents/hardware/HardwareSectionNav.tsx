import { useCallback, useEffect, useRef, useState } from "react";

export type NavSection = {
  id: string;
  label: string;
  subs?: { id: string; label: string }[];
};

/* Sidebar sections. id = element id inside the page content. */
export const HARDWARE_SECTIONS: NavSection[] = [
  {
    id: "process",
    label: "Industrial process",
    subs: [
      { id: "overview", label: "General overview" },
      { id: "setup", label: "Process set-up" },
    ],
  },
  {
    id: "injector",
    label: "Coaxial injector",
    subs: [
      { id: "inj-why", label: "Why a coaxial injector" },
      { id: "inj-parts", label: "Parts and concentricity" },
      { id: "inj-assembly", label: "Assembly and check" },
    ],
  },
  {
    id: "bioreactor",
    label: "Rotating-bed bioreactor",
    subs: [
      { id: "why-rbr", label: "Why a rotating bed" },
      { id: "consultation", label: "Constraints and consultation" },
      { id: "components", label: "Components and assembly" },
      { id: "control", label: "Control circuit and software" },
      { id: "retention", label: "Retention and integrity" },
      { id: "mixing", label: "Mixing characterisation" },
    ],
  },
  { id: "modelling", label: "3D modelling" },
  {
    id: "scale",
    label: "Industrial application",
    subs: [
      { id: "scale-up", label: "Scaling the reactor" },
      { id: "study", label: "Our study case" },
      { id: "uf", label: "Ultrafiltration unit" },
    ],
  },
  { id: "next", label: "Next steps" },
  { id: "conclusions", label: "Conclusions" },
  { id: "references", label: "References" },
];

type Active = { id: string; parent: string };
type Target = Active & { el: HTMLElement };

/* Highlights the section in view, unfolds its sub-list, and offers "Back to top". */
export function HardwareSectionNav({
  sections = HARDWARE_SECTIONS,
  label = "Hardware sections",
}: {
  sections?: NavSection[];
  label?: string;
}) {
  const [active, setActive] = useState<Active>({ id: sections[0].id, parent: sections[0].id });
  const suppress = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  const pick = useCallback(() => {
    if (suppress.current) return;
    const targets: Target[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) targets.push({ id: s.id, parent: s.id, el });
      (s.subs ?? []).forEach((sub) => {
        const subEl = document.getElementById(sub.id);
        if (subEl) targets.push({ id: sub.id, parent: s.id, el: subEl });
      });
    });
    if (!targets.length) return;
    const offset =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--section-nav-offset")) || 110;
    const withTop = targets
      .map((t) => ({ ...t, top: t.el.getBoundingClientRect().top }))
      .sort((a, b) => a.top - b.top);
    let cur = withTop[0];
    for (const t of withTop) {
      if (t.top <= offset + 4) cur = t;
      else break;
    }
    setActive((prev) =>
      prev.id === cur.id && prev.parent === cur.parent ? prev : { id: cur.id, parent: cur.parent },
    );
  }, [sections]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          pick();
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    pick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(timer.current);
    };
  }, [pick]);

  const onLinkClick = (id: string, parent: string) => {
    setActive({ id, parent });
    suppress.current = true;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      suppress.current = false;
    }, 900);
  };

  return (
    <nav className="page-section-nav" aria-label={label}>
      <ul className="page-section-nav__list">
        {sections.map((s) => {
          const isOn = active.parent === s.id;
          return (
            <li key={s.id}>
              <a
                className={`page-section-nav__link${isOn ? " is-active" : ""}`}
                href={`#${s.id}`}
                aria-current={isOn ? "true" : undefined}
                onClick={() => onLinkClick(s.id, s.id)}
              >
                {s.label}
              </a>
              {s.subs && (
                <ul className="page-section-nav__sublist" hidden={!isOn}>
                  {s.subs.map((sub) => (
                    <li key={sub.id}>
                      <a
                        className={`page-section-nav__link page-section-nav__link--sub${
                          active.id === sub.id ? " is-active" : ""
                        }`}
                        href={`#${sub.id}`}
                        onClick={() => onLinkClick(sub.id, s.id)}
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
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
