import { asset } from "../../utils/asset";

/* --------------------------------------------------------------------------
   Collaboration & Partnership — page data.
   Text comes from the team's Notion page (WIKI > Engagement >
   Collaboration & Partnership) via the Claude Design mock-up
   "Collaboration and Partnership v2". Each entry is one object on one of
   the three "tables"; its long-form content lives in CollaborationModal.
   -------------------------------------------------------------------------- */

export type GroupId = "igem" | "research" | "industry";

export const GROUPS: Record<
  GroupId,
  { sectionId: string; table: string; label: string; accent: string }
> = {
  igem: {
    sectionId: "igem-community",
    table: "Table 1 · iGEM community",
    label: "iGEM community",
    accent: "#6E5A96",
  },
  research: {
    sectionId: "research-partners",
    table: "Table 2 · Research partners",
    label: "Research partners",
    accent: "#2E7D86",
  },
  industry: {
    sectionId: "industry",
    table: "Table 3 · Industry & entrepreneurship",
    label: "Industry & entrepreneurship",
    accent: "#C9572F",
  },
};

export type EntryId =
  | "kickoff"
  | "malaga"
  | "msp"
  | "barcelona"
  | "cbm"
  | "iqog"
  | "cib"
  | "bio"
  | "complu";

export interface Entry {
  id: EntryId;
  group: GroupId;
  /** Modal title. */
  title: string;
  /** Short text on the pill under the object. */
  pill: string;
  /** Not written yet in Notion — drawn as a placeholder object. */
  placeholder?: boolean;
}

/** Placeholder entries ("Barcelona collaboration") are shown so the team
 * can see where they go; flip to false to hide them until the text exists. */
export const SHOW_PLACEHOLDERS = true;

export const ENTRIES: Entry[] = [
  { id: "kickoff", group: "igem", title: "Meetup: iGEM kick-off", pill: "Meetup: iGEM kick-off" },
  { id: "malaga", group: "igem", title: "iGEM European Meetup - Málaga '26", pill: "European Meetup Málaga '26" },
  { id: "msp", group: "igem", title: "MSP-Vector", pill: "MSP-Vector" },
  { id: "barcelona", group: "igem", title: "Barcelona collaboration", pill: "Barcelona collaboration", placeholder: true },
  { id: "cbm", group: "research", title: "CBM-CSIC", pill: "CBM-CSIC" },
  { id: "iqog", group: "research", title: "IQOG-CSIC", pill: "IQOG-CSIC" },
  { id: "cib", group: "research", title: "CIB-CSIC", pill: "CIB-CSIC" },
  { id: "bio", group: "industry", title: "Bio-Oils Huelva", pill: "Bio-Oils Huelva" },
  {
    id: "complu",
    group: "industry",
    title: "Compluemprende · IEA (Advanced Entrepreneurial Institute)",
    pill: "Compluemprende · IEA",
  },
];

export const VISIBLE_ENTRIES = ENTRIES.filter(
  (e) => !e.placeholder || SHOW_PLACEHOLDERS,
);

/** Object placement on a 16:10 table: [left %, top %, width %]. Below the
 * wide breakpoint the objects stack instead, at STACK_WIDTH, alternating
 * left/right. */
export const POSITION: Record<EntryId, [number, number, number]> = {
  kickoff: [10, 4, 19],
  malaga: [66, 4, 17],
  msp: [37, 43, 17],
  barcelona: [60, 56, 25],
  cbm: [4, 5, 38],
  iqog: [57, 5, 28],
  cib: [38, 53, 36],
  bio: [5, 7, 40],
  complu: [52, 8, 34],
};

export const STACK_WIDTH: Record<EntryId, string> = {
  kickoff: "52%",
  malaga: "48%",
  msp: "46%",
  barcelona: "82%",
  cbm: "92%",
  iqog: "76%",
  cib: "92%",
  bio: "86%",
  complu: "78%",
};

export const STACK_RIGHT: Partial<Record<EntryId, true>> = {
  malaga: true,
  barcelona: true,
  iqog: true,
  complu: true,
};

const A = (name: string) => asset(`assets/collaboration/${name}`);

export const IMG = {
  maastricht: A("logo-maastricht.webp"),
  cbm: A("logo-cbm.webp"),
  csic: A("logo-csic.webp"),
  iqog: A("logo-iqog.webp"),
  cib: A("logo-cib.webp"),
  bioOils: A("logo-bio-oils.webp"),
  compluemprende: A("logo-compluemprende.webp"),
  iea: A("logo-iea.webp"),
  compluConversation: A("compluemprende-conversation.webp"),
  kickoff: A("logo-kickoff.webp"),
  communityBoard: A("community-board.webp"),
};

export interface GalleryPhoto {
  src: string;
  /** CSS aspect-ratio, so the strip lays out before the image loads. */
  ratio: string;
}

export const MALAGA_GALLERY: GalleryPhoto[] = [
  { src: A("malaga-01.webp"), ratio: "1600 / 892" },
  { src: A("malaga-02.webp"), ratio: "900 / 975" },
  { src: A("malaga-03.webp"), ratio: "3 / 4" },
  { src: A("malaga-04.webp"), ratio: "3 / 4" },
  { src: A("malaga-05.webp"), ratio: "4 / 3" },
  { src: A("malaga-06.webp"), ratio: "3 / 4" },
  { src: A("malaga-07.webp"), ratio: "4 / 3" },
];

export const KICKOFF_GALLERY: GalleryPhoto[] = [
  { src: A("kickoff-01.webp"), ratio: "4 / 3" },
  { src: A("kickoff-02.webp"), ratio: "4 / 3" },
  { src: A("kickoff-03.webp"), ratio: "4 / 3" },
  { src: A("kickoff-04.webp"), ratio: "4 / 3" },
  { src: A("kickoff-05.webp"), ratio: "4 / 3" },
];

/* --- Kick-off meetup programme ----------------------------------------- */

export interface Speaker {
  name: string;
  bio: string;
  list?: { who: string; what: string }[];
}

export type ProgrammeItem =
  | { type: "break" | "plain"; time: string; label: string }
  | {
      type: "session";
      time: string;
      label: string;
      speakers: Speaker[];
      summary: string;
    };

export interface ProgrammeDay {
  label: string;
  date: string;
  segments: { venue: string; items: ProgrammeItem[] }[];
}

const ELVIRA: Speaker = {
  name: "Elvira Mateos García",
  bio: "2024 iGEMer, environmental biologist and co-founder of RePET. She works in sustainability and the circular bioeconomy, combining research, entrepreneurship, and science communication.",
};
const brk = (time: string, label: string): ProgrammeItem => ({ type: "break", time, label });
const pl = (time: string, label: string): ProgrammeItem => ({ type: "plain", time, label });
const ses = (
  time: string,
  label: string,
  speakers: Speaker[],
  summary: string,
): ProgrammeItem => ({ type: "session", time, label, speakers, summary });

export const KICKOFF_DAYS: ProgrammeDay[] = [
  {
    label: "Day 1",
    date: "June 24th, 2026",
    segments: [
      {
        venue: "Compluemprende",
        items: [
          pl("9:00 - 10:00", "Opening + Welcome ceremony"),
          ses(
            "10:00 - 11:00",
            "Workshop: Brainstorming",
            [ELVIRA],
            "Elvira Mateos García opened the congress with a brainstorming workshop focused on group dynamics and ice-breaking activities. Through this session, participants got to know each other, shared their first ideas, and started building a collaborative atmosphere from the very beginning.",
          ),
          brk("11:00 - 11:30", "Coffee Break"),
          ses(
            "11:30 - 12:30",
            "Conference: Biolynx",
            [
              {
                name: "Ainara Domínguez Ortiz",
                bio: "Biomedical Sciences student and Marketing Manager at BioLynx. She promotes biotechnology entrepreneurship and supports initiatives that connect young scientists.",
              },
            ],
            "Aianara discussed the career paths available in the industry for scientists who do not want to go into research. In her talk, she covered all the roles involved in a clinical trial, explaining the salaries, requirements, and responsibilities for each one.",
          ),
          brk("12:30 - 13:00", "Coffee Break"),
          ses(
            "13:00 - 14:00",
            "Conference: Symbiotic",
            [
              {
                name: "Prof. PhD Claudia Sánchez Orozco",
                bio: "Dr. Claudia Alejandra Sánchez Orozco is a transdisciplinary designer, researcher, and professor at the Complutense University of Madrid (UCM), specializing in systemic design, sustainability, and cross-disciplinary R&D projects that translate scientific data into accessible solutions.",
              },
              {
                name: "Prof. PhD Juanita Bagés Villaneda",
                bio: "Dr. Juanita Bagés Villaneda is a researcher and professor in the Drawing and Design Department at the Complutense University of Madrid (UCM), specializing in graphic design, service-learning (ApS) educational methodologies, visual communication, and the strategic application of optical illusions and artist books.",
              },
              {
                name: "Design Researchers: Joana Emídio Almeida, Junjie Li, Azahar Tineo Granados, Ana Trincado Castán, Chenyu Ana Zhang",
                bio: "The project is driven by a multidisciplinary team of Design degree students, each bringing a unique specialized skill set to the research:",
                list: [
                  { who: "Azahar Tineo", what: "leads the audiovisual production and narrative direction." },
                  { who: "Ana Trincado", what: "develops the visual identity and infographic systems." },
                  { who: "Ana Zhang", what: "heads the packaging design and structural concept." },
                  { who: "Junji Li", what: "manages the 3D modeling and 3D printing processes." },
                  {
                    who: "Joana Emídio",
                    what: "specializes in product design and fabricating 3D components for the exhibition display.",
                  },
                ],
              },
            ],
            "Symbiotic is a research project that seeks to democratize the study of aquatic microorganisms through the seamless fusion of science and design. By leveraging infographics, audiovisual content, 3D modeling, and packaging design, the project transforms scientific knowledge into accessible, visual, and interactive tools for everyone.",
          ),
          brk("14:00 - 15:30", "Lunch Break"),
        ],
      },
      {
        venue: "UCM Edificio de Estudiantes",
        items: [
          ses(
            "15:30 - 16:30",
            "Conference: Synthetic Biology",
            [
              {
                name: "Prof. Bert Poolman",
                bio: "Professor of Biochemistry at the University of Groningen and a world-leading expert in synthetic biology. His work on membrane transport, synthetic cells, and minimal life has had a major impact on modern biotechnology.",
              },
            ],
            "Bert Poolman introduced synthetic biology focused on establishing a non-equilibrium synthetic metabolism, which is useful for understanding the foundations of life and its very origin. During the talk, he explained his latest experimental results aimed at producing and regenerating cellular energy (ATP molecules) in synthetic systems using simple chemical reaction networks.",
          ),
          brk("16:30 - 17:00", "Coffee Break"),
          ses(
            "17:00 - 18:30",
            "Workshop: Scientific Communication",
            [
              {
                name: "Dr. Martín Pérez Estébanez (@el_electron_perdido)",
                bio: "Science communicator, analytical chemist, and content creator, known as @el_electron_perdido. He holds a PhD in Analytical Chemistry and is dedicated to making science accessible through social media and public outreach.",
              },
            ],
            "How to communicate science without boring the public? In his workshop, Martín offered some tips that have helped him in his professional career when it comes to making science attractive, making special reference to humor and emotions, and ending with a practical workshop in which the attendees could become science communicators on social media.",
          ),
        ],
      },
    ],
  },
  {
    label: "Day 2",
    date: "June 25th, 2026",
    segments: [
      {
        venue: "Compluemprende",
        items: [
          pl("9:00 - 9:30", "Opening"),
          ses(
            "9:30 - 10:15",
            "Conference: Scientific Illustration",
            [
              {
                name: "Dr. Ángel Serrano Valverde",
                bio: "Designer, illustrator, and lecturer specialising in scientific illustration and visual communication. He transforms complex scientific concepts into engaging and accessible visual narratives.",
              },
            ],
            "Ángel provided context on what a scientific infographic is and isn't, before moving on to a historical overview of great scientific illustrations and how they have shaped the collective imagination. He concluded the talk with a masterclass on how to use color, symbols, composition, and typography to create an effective scientific illustration.",
          ),
          brk("10:15 - 10:30", "Coffee Break"),
          ses(
            "10:30 - 11:30",
            "Conference: Biophysics",
            [
              {
                name: "Prof. Jesús Pérez-Gil",
                bio: "Professor of Biochemistry at the Complutense University of Madrid and leader of the BIOMIL research group. His research focuses on membrane biophysics and pulmonary surfactant.",
              },
            ],
            "Jesús began by explaining exactly what biophysics is and which professionals can thrive in the field, highlighting the importance of collaboration and interdisciplinary teams. During his talk, he discussed the breakthroughs his research group has made in pulmonary surfactant and how it serves as a life-saving biomedical strategy, emphasizing that understanding its mechanism is crucial for developing biomedical applications.",
          ),
          brk("11:30 - 12:00", "Coffee Break"),
          ses(
            "12:00 - 13:00",
            "Workshop: Pitch Canvas",
            [ELVIRA],
            "During her workshop, Elvira guided us through the Pitch Canvas as a practical tool to structure and communicate a project clearly, helping us identify the problem, the target users, the value proposition, the solution, and the impact of our idea. She emphasized that a strong pitch is not only about explaining the science, but also about making the project understandable, relevant, and convincing for different audiences, from stakeholders and investors to the general public. Her session helped us reflect on how to present our project in a more strategic and impactful way, connecting scientific innovation with real-world needs and sustainable solutions.",
          ),
          brk("14:00 - 15:30", "Lunch Break"),
        ],
      },
      {
        venue: "UCM Edificio de Estudiantes",
        items: [
          ses(
            "15:00 - 16:00",
            "Conference: Neurobiology",
            [
              {
                name: "Dr. Jose Luis Trejo Pérez",
                bio: "Neuroscientist and Scientific Researcher at the Spanish National Research Council's (CSIC) Centro de Neurociencias Cajal, where he leads the Lifestyle and Cognition research group. His work explores how physical activity and environmental factors influence adult neurogenesis, brain plasticity, and cognition.",
              },
            ],
            "José Luis Trejo Pérez began by introducing the connection between physical activity and brain health, explaining how movement can directly influence cognition, memory, emotional balance, and neuronal plasticity. During his talk, he discussed his research with mice and the ideas explored in his book Neuronas en marcha, showing how moderate exercise can stimulate the formation of new neurons, especially in brain regions such as the hippocampus. He also emphasized that the relationship between exercise and the brain is not simply “the more, the better”: while a sedentary lifestyle can accelerate cognitive decline and neuronal deterioration, excessive exercise may become a source of biological stress. His talk highlighted the importance of finding a healthy balance, presenting exercise as a powerful tool to protect the brain, promote neurogenesis, and support long-term mental health.",
          ),
          brk("16:00 - 17:00", "Coffee Break"),
          ses(
            "17:00 - 18:30",
            "Group Activity",
            [],
            "We organized a Murder Mystery activity, where participants had to work together to uncover clues, question each other, and solve the case. It was a fun and interactive way to break the ice, encourage teamwork, and create a relaxed atmosphere after a day full of scientific talks and workshops.",
          ),
        ],
      },
    ],
  },
  {
    label: "Day 3",
    date: "June 26th, 2026",
    segments: [
      {
        venue: "Biblioteca María Zambrano",
        items: [
          pl("9:00 - 9:30", "Arrival"),
          ses(
            "9:30 - 13:00",
            "Mini iGEM Hackaton",
            [],
            "On the final day, we organized a mini iGEM hackathon in which participants worked in teams to develop their own synthetic biology project ideas. Each group identified a real-world problem, proposed an innovative solution, and designed a possible market launch strategy, considering aspects such as target users, value proposition, impact, and feasibility. At the end of the activity, every team presented and defended their project in front of the rest of the participants, creating a dynamic space for creativity, entrepreneurship, teamwork, and scientific communication.",
          ),
          pl("13:00 - 14:00", "Pitch Feedback"),
          pl("14:00 - 15:30", "Closing Awards Ceremony"),
          brk("15:30 - 16:30", "Lunch Break"),
          ses(
            "16:30 - 18:30",
            "Group Activity",
            [],
            "We had lunch in Guzmán el Bueno, a lively student area full of casual spots and university atmosphere. Afterwards, we visited El Retiro Park, where participants had time to relax, explore Madrid, and enjoy a more informal and fun moment together. It was the perfect way to close three intense days full of talks, workshops, teamwork, and shared experiences.",
          ),
        ],
      },
    ],
  },
];
