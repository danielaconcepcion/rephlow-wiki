/* Education & Communication: the activities on the chalkboard and in the dialogs.
 * **bold** and *italic* markers are rendered by EducationBoard.tsx.
 * Photo files are looked up in PHOTO_SRC (educationPhotos.ts). */
import { PHOTO_SRC } from "./educationPhotos.ts";

export type Photo = { src: string; alt: string; ratio: string };
export type Activity = {
  id: string;
  title: string;
  chalk: string;
  place: string;
  date: string;
  body: string[];
  link: { href: string; label: string } | null;
  photos: Photo[];
};

const photo = (file: string, alt: string, ratio: string): Photo => ({ src: PHOTO_SRC[file] ?? "", alt, ratio });

export const INTRO = "At rePhlow, we believe that science goes beyond the laboratory. Through **educational activities, public engagement and science communication initiatives**, we aim to make synthetic biology more accessible, inspire curiosity and raise awareness of environmental challenges. By connecting with diverse audiences, we seek to foster scientific understanding and encourage the **next generation to explore the potential of syn bio.**";

export const ACTIVITIES: Activity[] = [
  {
    id: "mncn",
    title: "Scientific Stand-Up Monologue Night \u2014 National Museum of Natural Sciences",
    chalk: "Monologue night \u00b7 MNCN",
    place: "MNCN-CSIC, Madrid",
    date: "29 November 2025",
    body: [
      "Diego was invited to **Museo Nacional de Ciencias Naturales (MNCN-CSIC)** to disseminate our project to general public.",
    ],
    link: null,
    photos: [
      photo("mncn-02", "The official poster for the Mon\u00f3logos Cient\u00edficos night at the MNCN, with the six speakers of the evening", "1141 / 1600"),
      photo("mncn-01", "Diego on stage at the MNCN, the Mon\u00f3logos Cient\u00edficos artwork projected behind him", "3 / 4"),
    ],
  },
  {
    id: "alameda",
    title: "School talk at IES Alameda de Osuna",
    chalk: "IES Alameda de Osuna",
    place: "IES Alameda de Osuna, Madrid",
    date: "10 December 2025",
    body: [
      "Our team visited **IES Alameda de Osuna** to introduce students to the exciting **possibilities of science and biotechnology beyond the classroom.** Through our experience in iGEM and the development of rePhlow, we showed how university students can turn **innovative ideas into real projects addressing environmental challenges.**",
      "The session also encouraged students to explore their interests, **embrace new opportunities and get involved in extracurricular initiatives**, highlighting that scientific research is not just about laboratory work, but also about creativity, teamwork and **making a positive impact on society.**",
    ],
    link: null,
    photos: [
      photo("alameda-01", "The classroom at IES Alameda de Osuna during the talk, with the \u201ciGEM en la UCM: rePhlow\u201d slide on screen", "1600 / 737"),
      photo("alameda-02", "A team member presenting the \u201c\u00bfQu\u00e9 hago?\u201d slide to the students", "1600 / 739"),
    ],
  },
  {
    id: "monologos",
    title: "4th edition of Mon\u00f3logos de Ciencia Complutense",
    chalk: "Science Monologues \u00b7 1st prize",
    place: "Universidad Complutense de Madrid",
    date: "17 December 2025",
    body: [
      "Diego was awarded **first place** for a monologue which explained our project comparing it to a layered chocolate confection.",
    ],
    link: {"href": "https://www.youtube.com/live/vGR-vRGr-DY?si=1KAkJvTDtq3-N9Ub", "label": "Watch the monologue"},
    photos: [
      photo("monologos-02", "The poster of the 4th Mon\u00f3logos de Ciencia Complutense, 17 December, Sala de Grados", "3 / 2"),
      photo("monologos-01", "Diego holding the first-prize certificate of the Mon\u00f3logos de Ciencia Complutense", "3 / 2"),
    ],
  },
  {
    id: "humanejos",
    title: "School talk at IES Humanejos",
    chalk: "IES Humanejos",
    place: "IES Humanejos, Parla",
    date: "4 March 2026",
    body: [
      "**Marta and Diego** visited IES Humanejos to share their **experience at university beyond lectures**. The session covered student life, science communication, and the different opportunities available during a degree. They also **introduced iGEM and presented the rePhlow project**, giving students a real example of how research can be applied to real-world problems.",
      "Students highlighted how valuable it was to see that **university offers much more than classes,** and that career choices are more flexible than often presented at school.",
    ],
    link: null,
    photos: [
      photo("humanejos-01", "The students of IES Humanejos with the team after the talk", "1600 / 739"),
    ],
  },
  {
    id: "dis",
    title: "Introducing rePhlow and iGEM to DIS Abroad Scandinavia Students",
    chalk: "DIS Abroad Scandinavia",
    place: "Compluemprende, Madrid",
    date: "16 March 2026",
    body: [
      "Mar\u00eda and Diego delivered a talk at **Compluemprende** to students from **DIS Abroad Scandinavia, Denmark**, introducing the rePhlow project, the challenge of phosphorus recovery from wastewater, and the opportunities offered by the **iGEM competition**.",
      "During the session, they presented both the **scientific basis of our solution and its business model**, while creating a space to exchange perspectives on **education, innovation and entrepreneurship across different countries**. As many of the students came from non-scientific backgrounds, the activity also provided an opportunity to make synthetic biology and iGEM more accessible, showing how science can connect with business, sustainability and society to address real-world challenges.",
    ],
    link: null,
    photos: [
      photo("dis-01", "Diego and Mar\u00eda presenting rePhlow to the DIS Abroad Scandinavia students at Compluemprende", "4 / 3"),
      photo("dis-02", "Mar\u00eda explaining where the phosphate in the effluent comes from", "4 / 3"),
    ],
  },
  {
    id: "madrid-ciencia",
    title: "15th Madrid is Science Fair",
    chalk: "Madrid is Science Fair",
    place: "IFEMA, Madrid",
    date: "20 March 2026",
    body: [
      "Diego participated in **Madrid es Ciencia**, where he carried out a **live demonstration of alginate bead synthesis.** During the activity, he produced beads in real time that visibly absorbed dye, **illustrating how encapsulated systems can capture substances from their surroundings.**",
      "This visual model was used to represent how our system can remove phosphate from water, making the concept behind rePhlow more intuitive and **accessible to a general audience.**",
    ],
    link: null,
    photos: [
      photo("madrid-ciencia-01", "Diego at the rePhlow demonstration table at Madrid es Ciencia", "1 / 1"),
      photo("madrid-ciencia-02", "Making alginate beads live, with the bench shown on the screen above", "1 / 1"),
    ],
  },
  {
    id: "congress",
    title: "XVIII UCM Health Sciences Students' Congress",
    chalk: "Health Sciences Congress",
    place: "Universidad Complutense de Madrid",
    date: "16\u201318 April 2026",
    body: [
      "Team members **Diego Villa L\u00e1zaro, Mar\u00eda G\u00f3mez G\u00f3mez, \u00c1ngel Vilar Mart\u00edn, Daniela Concepci\u00f3n Castanedo, and Marina Delfa Lalaguna**, guided by their tutor Sara Garc\u00eda Linares, participated in the event across both the poster and oral presentation categories. \u00c1ngel, Mar\u00eda and Marina presented a poster on **rePhlow as a solution to combat nerve damage caused by eutrophication-derived algae**, while Diego delivered an oral presentation focused on its **application against liver damage induced by toxic cyanobacteria**.",
      "The event also **offered valuable new perspectives**, most notably from veterinary professionals, who highlighted the severe health challenges animals face from ingesting toxins in eutrophic waters. Ultimately, the team's outstanding work earned them awards for both the **best poster communication and best oral presentation.**",
    ],
    link: null,
    photos: [
      photo("congress-03", "The poster on rePhlow against the nerve damage caused by eutrophication-derived algae", "4 / 5"),
      photo("congress-02", "The poster session, with the rePhlow poster on the right", "4 / 3"),
      photo("congress-01", "Diego during the oral presentation", "4 / 3"),
      photo("congress-04", "Two of the team with the congress awards for best poster and best oral presentation", "4 / 3"),
    ],
  },
  {
    id: "burgos",
    title: "Museum of Human Evolution in Burgos",
    chalk: "Museum of Human Evolution",
    place: "Museo de la Evoluci\u00f3n Humana, Burgos",
    date: "11 June 2026",
    body: [
      "Diego presented the science monologue **\u201cThe Cycle... Without End?\u201d** at the Museum of Human Evolution in Burgos as part of a scientific outreach event. Combining **humour, storytelling and everyday examples,** he introduced the audience to the challenges of phosphate pollution and the principles behind rePhlow.",
      "This format allowed complex concepts such as **synthetic biology, circular economy and phosphorus recovery** to be communicated in an accessible and engaging way.",
    ],
    link: null,
    photos: [
      photo("burgos-01", "Diego performing \u201cThe Cycle\u2026 Without End?\u201d at the Museum of Human Evolution", "16 / 9"),
      photo("burgos-02", "The host introducing the monologue on the museum stage", "16 / 9"),
    ],
  },
  {
    id: "lamarr",
    title: "Hands-On Science with Lamarr Vocation Camp",
    chalk: "Lamarr Vocation Camp",
    place: "Campamento Lamarr",
    date: "10 July 2026",
    body: [
      "Watching a **liquid turn into a squishy little sphere** right before your eyes was the highlight for the campers at **Campamento Lamarr**.",
      "Before the science got messy (in the best way), we gave the group the full rePhlow story: proof that you **don't need to be a specific \u201ctype\u201d** of person to **build something like this, just a lot of curiosity**.",
    ],
    link: null,
    photos: [
      photo("lamarr-01", "Presenting rePhlow as circular economy to the campers at Campamento Lamarr", "3 / 4"),
      photo("lamarr-02", "The hands-on part: pipetting into the bath while the campers watch", "4 / 5"),
      photo("lamarr-03", "Alginate dropping into the calcium bath, bead by bead", "3 / 4"),
    ],
  },
];
