import { useEffect, useRef, useState } from "react";
import "./Team.css";
import { asset } from "../../utils";

interface PersonLink {
  label: string;
  url: string;
}

interface Person {
  id: string;
  category: "members" | "advisors" | "mentors";
  isPlaceholder: boolean;
  name: string;
  education: string;
  role: string;
  facultyColor: string;
  image: string;
  bio: string;
  funFact: string;
  links: PersonLink[];
}

/* ---------- Team Members ---------- */
const TEAM_DATA: Person[] = [
  {
    id: "m1", category: "members", isPlaceholder: false,
    name: "María Gómez Gómez", education: "4th year Chemistry & Biochemistry student", role: "General coordinator",
    facultyColor: "pink", image: "assets/team/maria.jpg",
    bio: "Add a short bio.", funFact: "Add a fun fact.", links: [],
  },
  {
    id: "m2", category: "members", isPlaceholder: false,
    name: "Marta Gil Alarcón", education: "4th year Biochemistry student", role: "Entrepreneurship coordinator",
    facultyColor: "pink", image: "assets/team/marta.jpg",
    bio: "Add a short bio.", funFact: "Add a fun fact.", links: [],
  },
  {
    id: "m3", category: "members", isPlaceholder: false,
    name: "Diego Villa Lázaro", education: "BSc in Biochemistry. MSc student in Translational Medicine.", role: "Laboratory coordinator",
    facultyColor: "pink", image: "assets/team/diego.jpg",
    bio: "Add a short bio.", funFact: "Add a fun fact.", links: [],
  },
  {
    id: "m4", category: "members", isPlaceholder: false,
    name: "Adriana Cuadro López", education: "4th year Biochemistry student", role: "Human Practices coordinator",
    facultyColor: "pink", image: "assets/team/adriana.jpg",
    bio: "Add a short bio.", funFact: "Add a fun fact.", links: [],
  },
  {
    id: "m5", category: "members", isPlaceholder: false,
    name: "Irene Fiol Vega", education: "4th year Biochemistry student", role: "Finance coordinator",
    facultyColor: "pink", image: "assets/team/irene.jpg",
    bio: "Add a short bio.", funFact: "Add a fun fact.", links: [],
  },
  {
    id: "m6", category: "members", isPlaceholder: false,
    name: "Ángel Vilar Martín", education: "BSc in Biology. MSc student in Biophysics.", role: "Coordinator",
    facultyColor: "green", image: "assets/team/angel.jpg",
    bio: "Add a short bio.", funFact: "Add a fun fact.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/angelvilarmartin/" }],
  },
  {
    id: "m7", category: "members", isPlaceholder: false,
    name: "Martina Grudsky Rojas", education: "4th year Biology student", role: "Outreach coordinator",
    facultyColor: "green", image: "assets/team/martina.jpg",
    bio: "Add a short bio.", funFact: "Add a fun fact.", links: [],
  },
  {
    id: "m8", category: "members", isPlaceholder: false,
    name: "Marina Delfa Lalaguna", education: "BSc in Chemistry & Biochemistry. MSc in Biotechnology.", role: "Experimental",
    facultyColor: "green", image: "assets/team/marina-delfa-laguna.png",
    bio: "Add a short bio.", funFact: "Add a fun fact.", links: [],
  },
  {
    id: "m10", category: "members", isPlaceholder: false,
    name: "Daniela Concepción Castanedo", education: "BSc in Physics. MSc student in Biophysics.", role: "Modelling coordinator",
    facultyColor: "blue", image: "assets/team/daniela-concepcion-castanedo.png",
    bio: "Add a short bio.", funFact: "Add a fun fact.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/daniela-concepción-castanedo-696b55284/" }],
  },
  {
    id: "m9", category: "members", isPlaceholder: false,
    name: "Santiago Rodríguez Aranguren", education: "4th year Materials Engineering student", role: "Hardware coordinator",
    facultyColor: "blue", image: "assets/team/santiago.jpg",
    bio: "Add a short bio.", funFact: "Add a fun fact.", links: [],
  },
  {
    id: "m11", category: "members", isPlaceholder: false,
    name: "Silvia Yan García Velasco", education: "BSc in Design.", role: "Designer",
    facultyColor: "yellow", image: "assets/team/silvia.jpg",
    bio: "Add a short bio.", funFact: "Add a fun fact.", links: [],
  },

  /* ---------- Advisors ---------- */
  ...Array.from({ length: 9 }, (_, i): Person => ({
    id: `a${i + 1}`, category: "advisors", isPlaceholder: true,
    name: "Add name", education: "Add institution / department", role: "Advisor",
    facultyColor: "gray", image: "assets/team/advisor-placeholder.png",
    bio: "Add a short bio.", funFact: "Add a fun fact.", links: [],
  })),

  /* ---------- Mentors ---------- */
  ...Array.from({ length: 9 }, (_, i): Person => ({
    id: `me${i + 1}`, category: "mentors", isPlaceholder: true,
    name: "Add name", education: "Add institution / department", role: "Mentor",
    facultyColor: "gray", image: "assets/team/mentor-placeholder.png",
    bio: "Add a short bio.", funFact: "Add a fun fact.", links: [],
  })),
];

type Category = "members" | "advisors" | "mentors";

const TAB_TITLES: Record<Category, string> = {
  members: "Team Members",
  advisors: "Advisors",
  mentors: "Mentors",
};

const CATEGORIES: Category[] = ["members", "advisors", "mentors"];

function PersonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4"></circle>
      <path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"></path>
    </svg>
  );
}

function PersonCard({
  person,
  onOpen,
}: {
  person: Person;
  onOpen: (person: Person, trigger: HTMLElement) => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article
      className={`team-card team-card--${person.facultyColor}${person.isPlaceholder ? " team-card--placeholder" : ""}`}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`Open details for ${person.name}`}
      onClick={(e) => onOpen(person, e.currentTarget)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(person, e.currentTarget);
        }
      }}
    >
      <div className="team-card__media">
        {!imgFailed && (
          <img
            className="team-card__img"
            src={asset(person.image)}
            alt={person.name}
            onError={() => setImgFailed(true)}
          />
        )}
        <div className="team-card__img-fallback">
          <PersonIcon />
        </div>
      </div>
      <p className="team-card__name">{person.name}</p>
      <p className="team-card__education">{person.education}</p>
      <p className="team-card__role">{person.role}</p>
    </article>
  );
}

export function Team() {
  const [pageTitle, setPageTitle] = useState(TAB_TITLES.members);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalImgFailed, setModalImgFailed] = useState(false);

  const panelRefs = useRef<Record<Category, HTMLElement | null>>({
    members: null,
    advisors: null,
    mentors: null,
  });
  const tabRefs = useRef<Record<Category, HTMLButtonElement | null>>({
    members: null,
    advisors: null,
    mentors: null,
  });
  const activeCategoryRef = useRef<Category>("members");
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  /* --------------------------------------------------------------------
     Tab switching — fade/slide transition between panels, ported 1:1
     from team.js (same 220ms leave delay + forced-reflow enter).
     -------------------------------------------------------------------- */
  function switchTab(target: Category) {
    const current = activeCategoryRef.current;
    if (current === target) return;

    tabRefs.current[current]?.classList.remove("is-active");
    tabRefs.current[current]?.setAttribute("aria-selected", "false");
    tabRefs.current[target]?.classList.add("is-active");
    tabRefs.current[target]?.setAttribute("aria-selected", "true");

    setPageTitle(TAB_TITLES[target]);

    const currentPanel = panelRefs.current[current];
    if (currentPanel) {
      currentPanel.classList.add("is-leaving");
      currentPanel.classList.remove("is-active");
      window.setTimeout(() => {
        currentPanel.hidden = true;
        currentPanel.classList.remove("is-leaving");
      }, 220);
    }

    const next = panelRefs.current[target];
    if (next) {
      next.hidden = false;
      next.classList.add("is-entering");
      void next.offsetWidth; /* force reflow so the transition runs */
      requestAnimationFrame(() => {
        next.classList.remove("is-entering");
        next.classList.add("is-active");
      });
    }

    activeCategoryRef.current = target;
  }

  /* --------------------------------------------------------------------
     Modal
     -------------------------------------------------------------------- */
  function openModal(person: Person, trigger: HTMLElement) {
    lastFocusedElement.current = trigger;
    setModalImgFailed(false);
    setSelectedPerson(person);
  }

  function closeModal() {
    setSelectedPerson(null);
  }

  useEffect(() => {
    if (!selectedPerson) return;

    document.body.classList.add("modal-open");
    modalCloseRef.current?.focus();

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", onKeydown);

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKeydown);
      lastFocusedElement.current?.focus();
    };
  }, [selectedPerson]);

  return (
    <>
      <header className="team-hero">
        <h1 className="team-hero__title">{pageTitle}</h1>

        <div className="team-tabs" role="tablist" aria-label="Team sections">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`team-tabs__btn${category === "members" ? " is-active" : ""}`}
              role="tab"
              aria-selected={category === "members"}
              aria-controls={`panel-${category}`}
              id={`tab-${category}`}
              type="button"
              ref={(el) => {
                tabRefs.current[category] = el;
              }}
              onClick={() => switchTab(category)}
            >
              {TAB_TITLES[category]}
            </button>
          ))}
        </div>
      </header>

      <main className="team-main">
        {CATEGORIES.map((category) => (
          <section
            key={category}
            className={`team-panel${category === "members" ? " is-active" : ""}`}
            id={`panel-${category}`}
            data-category={category}
            role="tabpanel"
            aria-labelledby={`tab-${category}`}
            hidden={category !== "members"}
            ref={(el) => {
              panelRefs.current[category] = el;
            }}
          >
            <div className="team-grid">
              {TEAM_DATA.filter((p) => p.category === category).map((person) => (
                <PersonCard key={person.id} person={person} onOpen={openModal} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <div className="team-modal" hidden={!selectedPerson}>
        <div className="team-modal__backdrop" onClick={closeModal}></div>

        {selectedPerson && (
          <div
            className="team-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalName"
          >
            <button
              className="team-modal__close"
              type="button"
              aria-label="Close"
              ref={modalCloseRef}
              onClick={closeModal}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18"></line>
                <line x1="18" y1="6" x2="6" y2="18"></line>
              </svg>
            </button>

            <div className="team-modal__media">
              {!modalImgFailed && (
                <img
                  className="team-modal__img"
                  src={asset(selectedPerson.image)}
                  alt={selectedPerson.name}
                  onError={() => setModalImgFailed(true)}
                />
              )}
              <div className="team-modal__img-fallback" aria-hidden="true">
                <PersonIcon />
              </div>
            </div>

            <h2 className="team-modal__name" id="modalName">{selectedPerson.name}</h2>
            <p className="team-modal__education">{selectedPerson.education}</p>
            <p className="team-modal__role">{selectedPerson.role}</p>

            <div className="team-modal__section">
              <h3>Bio</h3>
              <p>{selectedPerson.bio}</p>
            </div>

            <div className="team-modal__section" hidden={!selectedPerson.funFact}>
              <h3>Fun fact</h3>
              <p>{selectedPerson.funFact}</p>
            </div>

            <div className="team-modal__links">
              {selectedPerson.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
