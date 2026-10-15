import { asset } from "../../utils";

/* --------------------------------------------------------------------------
   Education & Communication — page data.

   Nine activities, in the order they happened, transcribed from the team's
   Notion page (WIKI > Engagement > Education & Communication) with its own
   bold kept as **markers** (rendered through LabFolders/RichText).

   Each activity carries two things: what the chronicle below the board
   says about it, and what represents it *on* the board — a poster taped
   up, a page of school notes, a visitor badge, a boarding-pass-style
   card, a demo sheet, a conference poster, a programme, a camp wristband.
   The board is the index; the chronicle is the record.
   -------------------------------------------------------------------------- */

const A = (name: string) => asset(`assets/education/${name}`);

/** What the object pinned to the board is made of. The drawing lives in
 * Blackboard.tsx; this only says which one an activity gets. */
export type BoardObject =
  | "poster"
  | "notes"
  | "award-poster"
  | "badge"
  | "postcard"
  | "demo-sheet"
  | "conference-poster"
  | "programme"
  | "wristband";

export interface Photo {
  src: string;
  alt: string;
  /** CSS aspect-ratio, so the strip lays out before the image loads. */
  ratio: string;
}

export interface Activity {
  id: string;
  /** Full title, as the chronicle prints it. */
  title: string;
  /** Two or three words for the chalk label on the board. */
  chalk: string;
  /** Where it happened, for the chronicle's dateline. */
  place: string;
  /** Printed date, as the source writes it. */
  date: string;
  /** Sort key / machine-readable date of the first day. */
  isoDate: string;
  body: string[];
  link?: { href: string; label: string };
  object: BoardObject;
  /** The image the board object carries (a poster, a photo). Filled once
   * the real file exists; the object draws its own frame either way. */
  boardImage?: string;
  photos: Photo[];
}

export const EDUCATION_INTRO =
  "At rePhlow, we believe that science goes beyond the laboratory. Through **educational activities, public engagement and science communication initiatives**, we aim to make synthetic biology more accessible, inspire curiosity and raise awareness of environmental challenges. By connecting with diverse audiences, we seek to foster scientific understanding and encourage the **next generation to explore the potential of syn bio.**";

export const ACTIVITIES: Activity[] = [
  {
    id: "mncn",
    title:
      "Scientific Stand-Up Monologue Night — National Museum of Natural Sciences",
    chalk: "Monologue night · MNCN",
    place: "MNCN-CSIC, Madrid",
    date: "29 November 2025",
    isoDate: "2025-11-29",
    body: [
      "Diego was invited to **Museo Nacional de Ciencias Naturales (MNCN-CSIC)** to disseminate our project to general public.",
    ],
    object: "poster",
    boardImage: A("mncn-02.webp"),
    photos: [
      {
        src: A("mncn-02.webp"),
        alt: "The official poster for the Monólogos Científicos night at the MNCN, with the six speakers of the evening",
        ratio: "1141 / 1600",
      },
      {
        src: A("mncn-01.webp"),
        alt: "Diego on stage at the MNCN, the Monólogos Científicos artwork projected behind him",
        ratio: "3 / 4",
      },
    ],
  },
  {
    id: "alameda",
    title: "School talk at IES Alameda de Osuna",
    chalk: "IES Alameda de Osuna",
    place: "IES Alameda de Osuna, Madrid",
    date: "10 December 2025",
    isoDate: "2025-12-10",
    body: [
      "Our team visited **IES Alameda de Osuna** to introduce students to the exciting **possibilities of science and biotechnology beyond the classroom.** Through our experience in iGEM and the development of rePhlow, we showed how university students can turn **innovative ideas into real projects addressing environmental challenges.**",
      "The session also encouraged students to explore their interests, **embrace new opportunities and get involved in extracurricular initiatives**, highlighting that scientific research is not just about laboratory work, but also about creativity, teamwork and **making a positive impact on society.**",
    ],
    object: "notes",
    boardImage: A("alameda-01.webp"),
    photos: [
      {
        src: A("alameda-01.webp"),
        alt: "The classroom at IES Alameda de Osuna during the talk, with the “iGEM en la UCM: rePhlow” slide on screen",
        ratio: "1600 / 737",
      },
      {
        src: A("alameda-02.webp"),
        alt: "A team member presenting the “¿Qué hago?” slide to the students",
        ratio: "1600 / 739",
      },
    ],
  },
  {
    id: "monologos",
    title: "4th edition of Monólogos de Ciencia Complutense",
    chalk: "Monólogos de Ciencia · 1st prize",
    place: "Universidad Complutense de Madrid",
    date: "17 December 2025",
    isoDate: "2025-12-17",
    body: [
      "Diego was awarded **first place** for a monologue which explained our project comparing it to a layered chocolate confection.",
    ],
    link: {
      href: "https://www.youtube.com/live/vGR-vRGr-DY?si=1KAkJvTDtq3-N9Ub",
      label: "Watch the monologue",
    },
    object: "award-poster",
    boardImage: A("monologos-02.webp"),
    photos: [
      {
        src: A("monologos-02.webp"),
        alt: "The poster of the 4th Monólogos de Ciencia Complutense, 17 December, Sala de Grados",
        ratio: "3 / 2",
      },
      {
        src: A("monologos-01.webp"),
        alt: "Diego holding the first-prize certificate of the Monólogos de Ciencia Complutense",
        ratio: "3 / 2",
      },
    ],
  },
  {
    id: "humanejos",
    title: "School talk at IES Humanejos",
    chalk: "IES Humanejos",
    place: "IES Humanejos, Parla",
    date: "4 March 2026",
    isoDate: "2026-03-04",
    body: [
      "**Marta and Diego** visited IES Humanejos to share their **experience at university beyond lectures**. The session covered student life, science communication, and the different opportunities available during a degree. They also **introduced iGEM and presented the rePhlow project**, giving students a real example of how research can be applied to real-world problems.",
      "Students highlighted how valuable it was to see that **university offers much more than classes,** and that career choices are more flexible than often presented at school.",
    ],
    object: "badge",
    boardImage: A("humanejos-01.webp"),
    photos: [
      {
        src: A("humanejos-01.webp"),
        alt: "The students of IES Humanejos with the team after the talk",
        ratio: "1600 / 739",
      },
    ],
  },
  {
    id: "dis",
    title: "Introducing rePhlow and iGEM to DIS Abroad Scandinavia Students",
    chalk: "DIS Abroad Scandinavia",
    place: "Compluemprende, Madrid",
    date: "16 March 2026",
    isoDate: "2026-03-16",
    body: [
      "María and Diego delivered a talk at **Compluemprende** to students from **DIS Abroad Scandinavia, Denmark**, introducing the rePhlow project, the challenge of phosphorus recovery from wastewater, and the opportunities offered by the **iGEM competition**.",
      "During the session, they presented both the **scientific basis of our solution and its business model**, while creating a space to exchange perspectives on **education, innovation and entrepreneurship across different countries**. As many of the students came from non-scientific backgrounds, the activity also provided an opportunity to make synthetic biology and iGEM more accessible, showing how science can connect with business, sustainability and society to address real-world challenges.",
    ],
    object: "postcard",
    boardImage: A("dis-01.webp"),
    photos: [
      {
        src: A("dis-01.webp"),
        alt: "Diego and María presenting rePhlow to the DIS Abroad Scandinavia students at Compluemprende",
        ratio: "4 / 3",
      },
      {
        src: A("dis-02.webp"),
        alt: "María explaining where the phosphate in the effluent comes from",
        ratio: "4 / 3",
      },
    ],
  },
  {
    id: "madrid-ciencia",
    title: "15th Madrid is Science Fair",
    chalk: "Madrid es Ciencia",
    place: "IFEMA, Madrid",
    date: "20 March 2026",
    isoDate: "2026-03-20",
    body: [
      "Diego participated in **Madrid es Ciencia**, where he carried out a **live demonstration of alginate bead synthesis.** During the activity, he produced beads in real time that visibly absorbed dye, **illustrating how encapsulated systems can capture substances from their surroundings.**",
      "This visual model was used to represent how our system can remove phosphate from water, making the concept behind rePhlow more intuitive and **accessible to a general audience.**",
    ],
    object: "demo-sheet",
    boardImage: A("madrid-ciencia-02.webp"),
    photos: [
      {
        src: A("madrid-ciencia-01.webp"),
        alt: "Diego at the rePhlow demonstration table at Madrid es Ciencia",
        ratio: "1 / 1",
      },
      {
        src: A("madrid-ciencia-02.webp"),
        alt: "Making alginate beads live, with the bench shown on the screen above",
        ratio: "1 / 1",
      },
    ],
  },
  {
    id: "congress",
    title: "XVIII UCM Health Sciences Students' Congress",
    chalk: "Health Sciences Congress",
    place: "Universidad Complutense de Madrid",
    date: "16–18 April 2026",
    isoDate: "2026-04-16",
    body: [
      "Team members **Diego Villa Lázaro, María Gómez Gómez, Ángel Vilar Martín, Daniela Concepción Castanedo, and Marina Delfa Lalaguna**, guided by their tutor Sara García Linares, participated in the event across both the poster and oral presentation categories. Ángel, María and Marina presented a poster on **rePhlow as a solution to combat nerve damage caused by eutrophication-derived algae**, while Diego delivered an oral presentation focused on its **application against liver damage induced by toxic cyanobacteria**.",
      "The event also **offered valuable new perspectives**, most notably from veterinary professionals, who highlighted the severe health challenges animals face from ingesting toxins in eutrophic waters. Ultimately, the team's outstanding work earned them awards for both the **best poster communication and best oral presentation.**",
    ],
    object: "conference-poster",
    boardImage: A("congress-03.webp"),
    photos: [
      {
        src: A("congress-03.webp"),
        alt: "The poster on rePhlow against the nerve damage caused by eutrophication-derived algae",
        ratio: "4 / 5",
      },
      {
        src: A("congress-02.webp"),
        alt: "The poster session, with the rePhlow poster on the right",
        ratio: "4 / 3",
      },
      {
        src: A("congress-01.webp"),
        alt: "Diego during the oral presentation",
        ratio: "4 / 3",
      },
      {
        src: A("congress-04.webp"),
        alt: "Two of the team with the congress awards for best poster and best oral presentation",
        ratio: "4 / 3",
      },
    ],
  },
  {
    id: "burgos",
    title: "Museum of Human Evolution in Burgos",
    chalk: "Museum of Human Evolution",
    place: "Museo de la Evolución Humana, Burgos",
    date: "11 June 2026",
    isoDate: "2026-06-11",
    body: [
      "Diego presented the science monologue **“The Cycle... Without End?”** at the Museum of Human Evolution in Burgos as part of a scientific outreach event. Combining **humour, storytelling and everyday examples,** he introduced the audience to the challenges of phosphate pollution and the principles behind rePhlow.",
      "This format allowed complex concepts such as **synthetic biology, circular economy and phosphorus recovery** to be communicated in an accessible and engaging way.",
    ],
    object: "programme",
    boardImage: A("burgos-01.webp"),
    photos: [
      {
        src: A("burgos-01.webp"),
        alt: "Diego performing “The Cycle… Without End?” at the Museum of Human Evolution",
        ratio: "16 / 9",
      },
      {
        src: A("burgos-02.webp"),
        alt: "The host introducing the monologue on the museum stage",
        ratio: "16 / 9",
      },
    ],
  },
  {
    id: "lamarr",
    title: "Hands-On Science with Lamarr Vocation Camp",
    chalk: "Lamarr Vocation Camp",
    place: "Campamento Lamarr",
    date: "10 July 2026",
    isoDate: "2026-07-10",
    body: [
      "Watching a **liquid turn into a squishy little sphere** right before your eyes was the highlight for the campers at **Campamento Lamarr**.",
      "Before the science got messy (in the best way), we gave the group the full rePhlow story: proof that you **don't need to be a specific “type”** of person to **build something like this, just a lot of curiosity**.",
    ],
    object: "wristband",
    boardImage: A("lamarr-03.webp"),
    photos: [
      {
        src: A("lamarr-01.webp"),
        alt: "Presenting rePhlow as circular economy to the campers at Campamento Lamarr",
        ratio: "3 / 4",
      },
      {
        src: A("lamarr-02.webp"),
        alt: "The hands-on part: pipetting into the bath while the campers watch",
        ratio: "4 / 5",
      },
      {
        src: A("lamarr-03.webp"),
        alt: "Alginate dropping into the calcium bath, bead by bead",
        ratio: "3 / 4",
      },
    ],
  },
];

/** Position of each object on the board, as [left %, top %, width %] of
 * the board itself, and the side the chalk label sits on. The chalk line
 * is drawn through these points in order (see Blackboard.tsx), so moving
 * one moves the timeline with it. */
export const BOARD_POSITION: Record<string, [number, number, number]> = {
  mncn: [2, 11, 9.5],
  alameda: [12.5, 58, 10],
  monologos: [23, 10, 9.5],
  humanejos: [33.5, 58, 9],
  dis: [43.5, 19, 12],
  "madrid-ciencia": [54.5, 58, 10.5],
  congress: [66, 11, 10],
  burgos: [77, 58, 10],
  lamarr: [88, 11, 10],
};

/** Where the chalk timeline runs, in the board's own 0–100 space. Objects
 * above it hang their tick down to it; objects below hang theirs up. */
export const BOARD_TIMELINE_Y = 52;

export { A as educationAsset };
