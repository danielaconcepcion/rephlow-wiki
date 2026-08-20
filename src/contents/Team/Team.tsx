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
  strength: string;
  weakness: string;
  links: PersonLink[];
}

/* ---------- Team Members ---------- */
const TEAM_DATA: Person[] = [
  {
    id: "m1", category: "members", isPlaceholder: false,
    name: "María Gómez Gómez", education: "4th year Chemistry & Biochemistry student", role: "General coordinator",
    facultyColor: "pink", image: "assets/team/maria.jpg",
    bio: "Add a short bio.",
    strength: "Add a strength.",
    weakness: "Add a weakness.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/maria-gomez-gomez-67a191363/" }],
  },
  {
    id: "m2", category: "members", isPlaceholder: false,
    name: "Marta Gil Alarcón", education: "4th year Biochemistry student", role: "Entrepreneurship coordinator",
    facultyColor: "pink", image: "assets/team/marta.jpg",
    bio: "Add a short bio.",
    strength: "Add a strength.",
    weakness: "Add a weakness.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/marta-gil-alarc%C3%B3n-b4bb27234/" }],
  },
  {
    id: "m3", category: "members", isPlaceholder: false,
    name: "Diego Villa Lázaro", education: "BSc in Biochemistry. MSc student in Translational Medicine.", role: "Laboratory coordinator",
    facultyColor: "pink", image: "assets/team/diego.jpg",
    bio: "Add a short bio.",
    strength: "Add a strength.",
    weakness: "Add a weakness.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/diego-villa-l%C3%A1zaro-9b703429a/" }],
  },
  {
    id: "m4", category: "members", isPlaceholder: false,
    name: "Adriana Cuadro López", education: "4th year Biochemistry student", role: "Human Practices coordinator",
    facultyColor: "pink", image: "assets/team/adriana.jpg",
    bio: "Add a short bio.",
    strength: "Add a strength.",
    weakness: "Add a weakness.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/adriana-cuadro-l%C3%B3pez-ab2467348/" }],
  },
  {
    id: "m5", category: "members", isPlaceholder: false,
    name: "Irene Fiol Vega", education: "4th year Biochemistry student", role: "Finance coordinator",
    facultyColor: "pink", image: "assets/team/irene.jpg",
    bio: "Add a short bio.",
    strength: "Add a strength.",
    weakness: "Add a weakness.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/irene-fiol-vega/" }],
  },
  {
    id: "m6", category: "members", isPlaceholder: false,
    name: "Ángel Vilar Martín", education: "BSc in Biology. MSc student in Biophysics.", role: "Coordinator",
    facultyColor: "green", image: "assets/team/angel.jpg",
    bio: "Add a short bio.",
    strength: "Add a strength.",
    weakness: "Add a weakness.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/angelvilarmartin/" }],
  },
  {
    id: "m7", category: "members", isPlaceholder: false,
    name: "Martina Grudsky Rojas", education: "4th year Biology student", role: "Outreach coordinator",
    facultyColor: "green", image: "assets/team/martina.jpg",
    bio: "Add a short bio.",
    strength: "Add a strength.",
    weakness: "Add a weakness.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/martina-grudsky-rojas-544506308/" }],
  },
  {
    id: "m8", category: "members", isPlaceholder: false,
    name: "Marina Delfa Lalaguna", education: "BSc in Chemistry & Biochemistry. MSc in Biotechnology.", role: "Experimental",
    facultyColor: "green", image: "assets/team/marina-delfa-laguna.png",
    bio: "Add a short bio.",
    strength: "Add a strength.",
    weakness: "Add a weakness.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/marina-delfa-lalaguna-92a887283/" }],
  },
  {
    id: "m10", category: "members", isPlaceholder: false,
    name: "Daniela Concepción Castanedo", education: "BSc in Physics. MSc student in Biophysics.", role: "Modelling coordinator",
    facultyColor: "blue", image: "assets/team/daniela-concepcion-castanedo.png",
    bio: "Add a short bio.",
    strength: "Add a strength.",
    weakness: "Add a weakness.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/daniela-concepción-castanedo-696b55284/" }],
  },
  {
    id: "m9", category: "members", isPlaceholder: false,
    name: "Santiago Rodríguez Aranguren", education: "4th year Materials Engineering student", role: "Hardware coordinator",
    facultyColor: "blue", image: "assets/team/santiago.jpg",
    bio: "Add a short bio.",
    strength: "Add a strength.",
    weakness: "Add a weakness.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/santiago-rodr%C3%ADguez-a40b7b311/" }],
  },
  {
    id: "m11", category: "members", isPlaceholder: false,
    name: "Silvia Yan García Velasco", education: "BSc in Design.", role: "Designer",
    facultyColor: "yellow", image: "assets/team/silvia.jpg",
    bio: "Add a short bio.",
    strength: "Add a strength.",
    weakness: "Add a weakness.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/silvia-yan-garc%C3%ADa-velasco/" }],
  },

  /* ---------- Advisors ---------- */

  {
    id: "a1", category: "advisors", isPlaceholder: false,
    name: "Sara García Linares", education: "", role: "PI",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0003-4983-5730" }],
  },
  {
    id: "a2", category: "advisors", isPlaceholder: false,
    name: "Aurelio Hidalgo Huertas", education: "", role: "Advisor: Enzyme immobilisation",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0001-5740-5584" }],
  },
  {
    id: "a3", category: "advisors", isPlaceholder: false,
    name: "Juan Manuel Bolívar Bolívar", education: "", role: "Advisor: Enzyme immobilisation",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0001-6719-5082" }],
  },
  {
    id: "a4", category: "advisors", isPlaceholder: false,
    name: "Beatriz Isabel Redondo", education: "", role: "Advisor: Genetic engineering ",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0001-6593-9500" }],
  },
  {
    id: "a5", category: "advisors", isPlaceholder: false,
    name: "Francisco Javier Molpeceres García", education: "", role: "Advisor: Genetic engineering",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0009-0000-8343-6042" }],
  },
  {
    id: "a6", category: "advisors", isPlaceholder: false,
    name: "María Donina Hernández Fuentes", education: "", role: "https://orcid.org/0000-0002-3417-1006",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0002-3417-1006" }],
  },
  {
    id: "a7", category: "advisors", isPlaceholder: false,
    name: "Mª Carmen García Payo", education: "", role: "Advisor: Alginate encapsulation",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0002-6809-3907" }],
  },
  {
    id: "a8", category: "advisors", isPlaceholder: false,
    name: "Loreto García Fernández", education: "", role: "Advisor: Hardware",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0002-9366-2630" }],
  },
  {
    id: "a9", category: "advisors", isPlaceholder: false,
    name: "Dianelis Toledo Monterrey", education: "", role: "Advisor: Revalorisation",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0002-0227-8298" }],
  },
  {
    id: "a10", category: "advisors", isPlaceholder: false,
    name: "Israel Sánchez Moreno", education: "", role: "Advisor: Revalorisation",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0001-9184-9445" }],
  },
  {
    id: "a11", category: "advisors", isPlaceholder: false,
    name: "Eduardo García-Junceda", education: "", role: "Advisor: Revalorisation",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0002-2344-8743" }],
  },
  {
    id: "a12", category: "advisors", isPlaceholder: false,
    name: "Silvia Díaz del Toro", education: "", role: "",
    facultyColor: "gray", image: "",
    bio: "Add a short bio.",
    strength: "",
    weakness: "",
    links: [{ label: "ORCID iD", url: "" }],
  },

  /* ---------- Mentors ---------- */
  {
    id: "me1", category: "mentors", isPlaceholder: false,
    name: "Elvira Mateos García", education: "", role: "",
    facultyColor: "gray", image: "",
    bio: "Elvira is an environmental biologist and sustainability expert, passionate about turning waste into valuable resources and creating solutions with real environmental impact. As an EU Bioeconomy Youth Ambassador, she works at the intersection of science, communication, and sustainability. After leading the RePET team at iGEM Madrid UCM 2024, she now returns as a mentor, sharing her experience and supporting this year's team through both the scientific and strategic challenges of the competition. Beyond the lab, she is actively involved in innovation forums, collaborative projects, talks, and workshops, translating complex ideas into engaging stories around bioeconomy, circular solutions, and social impact.",
    strength: "A natural connector of ideas, she can start from a single concept and build bridges across science, policy, and innovation, making others see both the urgency and possibility of a more sustainable future.",
    weakness: "Chronic “this sounds like a cool opportunity, let's do it” syndrome. She has a dangerous tendency to say yes first and figure out how to squeeze it into her calendar later.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/elvira-mateos-garcia/" }],
  },
  {
    id: "me1", category: "mentors", isPlaceholder: false,
    name: "Paula Sánchez-Blanco Sánchez", education: "", role: "",
    facultyColor: "gray", image: "",
    bio: "Paula studied Biochemistry and later completed a Master's in Bioeconomy and Biotechnology between France and Vietnam, an experience that strengthened both her scientific background and her love for Southeast Asian culture. After taking part in RePET, the Madrid-UCM iGEM 2024 team, she now returns as a mentor, supporting us mainly with the lab work and iGEM medals. Her defining personality trait is a chronic inability to say “no” to any plan, a habit that constantly lands her in unexpected, chaotic adventures that she ends up thoroughly enjoying. Outside the lab, she is a massive theatre nerd; when she isn't exploring the globe, you can usually find her either consuming comedy shows or acting on stage herself.",
    strength: "Relentless “big picture” vision. She is a natural leader who refuses to give up, meaning she will stubbornly repeat a failed experiment until it finally surrenders, while always keeping an eye on the entire process.",
    weakness: "Strategic napping. While researching in Canada, she mastered the high-adrenaline sport of leaving a PCR or gel running, sprinting to her nearby dorm for a 30-minute nap, and waking up just in time to check the results.",
    links: [],
  },
  {
    id: "me1", category: "mentors", isPlaceholder: false,
    name: "Álvaro Ferrero Veintemilla", education: "", role: "",
    facultyColor: "gray", image: "",
    bio: "Álvaro is a materials scientist and engineer, fascinated by polymers and the possibilities that emerge when we understand them deeply. After leading the Measurements Area for RePET - iGEM Madrid UCM 2024, he now returns as an advisor, eager to help this year's team pursue scientific excellence while nurturing the curiosity and creativity he believes are at the heart of innovation. His curiosity rarely stops at the laboratory door. You'll probably find Álvaro wandering through a museum, absorbed in art history: you can never be too sure, as his interests are as diverse as where he pursues them; he might be in Poland learning about botanical biodiversity and applications in pharmacology; the next, in Paraguay implementing membrane technologies to improve water treatment in rural communities; or in northern Spain with his RePET friends, turning beer industry by-products into good cookies. If there's something new to learn, chances are he'll find a way to end up there.",
    strength: "An innate drive to understand how things work, often diving far deeper than strictly necessary simply because he can't resist pulling on one more thread. Whether it's polymers, plants, art, or food science, he approaches every topic with the same contagious enthusiasm and genuine desire to keep learning.",
    weakness: "Acute protocolitis. If he's doing an experiment, you can be absolutely certain there's a carefully written protocol behind it, and he fully expects everyone else to have one too. Improvisation in the lab makes him visibly uncomfortable, especially when someone starts pipetting with nothing but “the vibes” as their experimental plan.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/alvarofervein/" }],
  },
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

            <div className="team-modal__section" hidden={!selectedPerson.strength}>
              <h3>Strength</h3>
              <p>{selectedPerson.strength}</p>
            </div>
            
            <div className="team-modal__section" hidden={!selectedPerson.weakness}>
              <h3>Weakness</h3>
              <p>{selectedPerson.weakness}</p>
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
