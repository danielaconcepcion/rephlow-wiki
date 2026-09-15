import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import "./Team.css";
import { asset } from "../../utils";

interface PersonLink {
  label: string;
  url: string;
}

interface InstitutionLogo {
  label: string;
  image: string;
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
  bio: ReactNode;
  strength: ReactNode;
  weakness: ReactNode;
  links: PersonLink[];
  institutions?: InstitutionLogo[];
}

/* ---------- Team Members ---------- */
const TEAM_DATA: Person[] = [
  {
    id: "m1", category: "members", isPlaceholder: false,
    name: "María Gómez Gómez", education: "4th year Chemistry & Biochemistry student", role: "Team Leader",
    facultyColor: "green", image: "assets/team/maria.webp",
    bio: <>
      María studies Chemistry and Biochemistry because being busy is not just a habit, it is a personality trait. As long as she has had at least ten hours of sleep and a coffee with extra energy, she can usually be found jumping between rePhlow, university, friends, pilates (preferably with time for a good <em>aperitivo</em> in between) and somehow still saying out loud what everyone else wisely decided to keep as an inside thought.
    </>,
    strength: "She is not a Type A person; she invented the concept. A little obsessed with organisation, deadlines and planning, she can turn any level of chaos into a colour-coded system.",
    weakness: "Sunshine. She will abandon almost anything for the opportunity to lie in the sun, although she strongly believes solar recharging should technically count as a strength.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/maria-gomez-gomez-67a191363/" }],
  },
  {
    id: "m2", category: "members", isPlaceholder: false,
    name: "Marta Gil Alarcón", education: "4th year Biochemistry student", role: "Entrepreneurship coordinator",
    facultyColor: "yellow", image: "assets/team/marta.webp",
    bio: "Marta studies Biochemistry at Universidad Complutense de Madrid because sitting still has never really been her style. As long as there's a laugh to share and a to-do list to conquer, she can usually be found bouncing between the lab, fundraising meetings, the gym, and a trip abroad she's already half-planned, all while somehow still managing to gather everyone around a table for good food and better conversation.",
    strength: "Turning chaos into a schedule. She can rally a team, beat a deadline, and defuse a conflict before it even knows it's a conflict.",
    weakness: "A stubborn perfectionist streak that makes delegating feel like handing over her firstborn. She's working on it, one shared task at a time.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/marta-gil-alarc%C3%B3n-b4bb27234/" }],
  },
  {
    id: "m3", category: "members", isPlaceholder: false,
    name: "Diego Villa Lázaro", education: "BSc in Biochemistry. MSc student in Translational Medicine.", role: "Wet Lab Coordinator",
    facultyColor: "purple", image: "assets/team/diego.webp",
    bio: "Diego is rePhlow’s Scientific Coordinator. He is mainly responsible for driving the technical and scientific aspects of each block forward, interpreting experimental results, and helping to validate the project's hypotheses. He has also played a major role in the team’s science communication and outreach efforts, presenting the project in multiple formats and locations to raise awareness, as well as contributing to the team's design tasks. As a member of both the Genetic Engineering and Enzyme Immobilisation teams, he also contributes to literature research, experimental work, and the overall technical development of the project. Within the team, Diego is known for being a hardworking perfectionist who always fosters a great atmosphere. He loves making people laugh and is always willing to explain anything, at any time, to ensure everyone is on the same page. Outside iGEM, he enjoys exploring his creative side by drawing, writing and composing music, as well as playing video games, reading, and making plans with friends.",
    strength: "",
    weakness: "",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/diego-villa-l%C3%A1zaro-9b703429a/" }],
  },
  {
    id: "m4", category: "members", isPlaceholder: false,
    name: "Adriana Cuadro López", education: "4th year Biochemistry student", role: "Human Practices coordinator",
    facultyColor: "yellow", image: "assets/team/adriana.webp",
    bio: "Adriana is a Biochemistry student with an unstoppable, sunny energy. She's the kind of person who can turn a stressful lab meeting into a laugh, and still get everyone back on track five minutes later. Cheerful, outgoing and stubborn as they come, she's also remarkably calm, disciplined and organized, staying steady and clear headed even when deadlines pile up. Her real superpower is keeping her cool under pressure, while everyone else is losing theirs. Outside the lab, she's just as much in motion: spiking volleyballs, hiking through nature, sketching or strumming her guitar, cooking up something good, and never turning down a good plan with friends, especially if food is involved. She also loves to travel, always on the lookout for the next adventure. Fun fact: she has a dog, and her very first word was in English, a little souvenir from a spell in Canada during her childhood.",
    strength: "Keeping chaos organized. She juggles deadlines, calms nerves and solves conflicts before they even become conflicts, and her stubbornness definitely helps here.",
    weakness: "Perfectionism. She'll happily double check a protocol three times, and redo an experiment as many times as it takes until it comes out exactly right.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/adriana-cuadro-l%C3%B3pez-ab2467348/" }],
  },
  {
    id: "m5", category: "members", isPlaceholder: false,
    name: "Irene Fiol Vega", education: "4th year Biochemistry student", role: "Finance coordinator",
    facultyColor: "blue", image: "assets/team/irene.webp",
    bio: "Irene studies Biochemistry and firmly believes that every problem can be improved with a well-designed spreadsheet. She enjoys bringing order to chaos, whether that means organising data or figuring out why an experiment refused to behave. Naturally curious, she loves understanding how things work, even if that sometimes means spending longer than expected solving a problem. Outside the lab, she enjoys artistic swimming, singing, and attempting to maintain a healthy work-life balance.",
    strength: "Seeing both the big picture and the tiny details.",
    weakness: "Badly designed spreadsheets. She feels personally offended by them.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/irene-fiol-vega/" }],
  },
  {
    id: "m6", category: "members", isPlaceholder: false,
    name: "Ángel Vilar Martín", education: "BSc in Biology specialised in Biotechnology. MSc student in Biophysics.", role: "Dry Lab Coordinator",
    facultyColor: "yellow", image: "assets/team/angel.webp",
    bio: "Ángel Vilar Martín is a biologist specialised in Biotechnology from Universidad Complutense de Madrid, currently pursuing a Master's degree in Biophysics at Universidad Autónoma de Madrid, usually calm and focused, unless the experiment decides otherwise. Outside the lab, he loves spending hours walking around the city with music on, taking in the streets, and is a true fan of the internet age, often falling down Google rabbit holes or picking up a project just to see if he can master it. He also enjoys long, unplanned plans, a terrace with a glass of wine, and generally has a hard time knowing when to call it a day. Fun fact: before starting university he used to practise archery.",
    strength: "He tackles every task with effectiveness and organisation, and somehow manages to be genuinely skilled across more fields than seems fair.",
    weakness: "Extreme impatience (especially when waiting for an experiment to work), a tendency to overthink and an unfortunate inability to say no.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/angelvilarmartin/" }],
  },
  {
    id: "m7", category: "members", isPlaceholder: false,
    name: "Martina Grudsky Rojas", education: "4th year Biology student", role: "Social Media Coordinator",
    facultyColor: "blue", image: "assets/team/martina.webp",
    bio: "[Introduction with degree + personality.] [2–3 sentences describing what you are like, not what you do in the team.] Outside the lab, hobbies or personal fun fact.",
    strength: "[Funny but genuine strength.]",
    weakness: "[Funny, harmless weakness.]",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/martina-grudsky-rojas-544506308/" }],
  },
  {
    id: "m8", category: "members", isPlaceholder: false,
    name: "Marina Delfa Lalaguna", education: "BSc in Chemistry & Biochemistry. MSc student in Industrial and Environmental Biotechnology.", role: "Hardware Coordinator",
    facultyColor: "coral", image: "assets/team/marina.webp",
    bio: "Marina studies an MSc in Industrial and Environmental Biotechnology. Graduated in Chemistry and Biochemistry, the lab is her natural habitat. Outgoing, calm, and always up to help or have a chat, she will adapt to different workflows, from engineering a bioreactor to pure synthetic biology; there is no boring science. As a fun fact, Mamma Mia being the biggest masterpiece ever created is a hill she is ready to die on.",
    strength: "She can troubleshoot an experiment over and over again if needed without losing her smile.",
    weakness: "She can track 30 different variables for a complex experiment, but will forget to bring her own keys from home.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/marina-delfa-lalaguna-92a887283/" }],
  },
  {
    id: "m10", category: "members", isPlaceholder: false,
    name: "Daniela Concepción Castanedo", education: "BSc in Physics. MSc student in Biophysics.", role: "Wiki & Modelling Coordinator",
    facultyColor: "gray", image: "assets/team/daniela.webp",
    bio: "Daniela studied Physics at Universidad Complutense de Madrid, focusing on Fundamental Physics, and is now pursuing a Master's in Condensed Matter Physics and Biophysics at Universidad Autónoma de Madrid. She never does anything half-heartedly: opening Blender ‘just to try one thing’ can become a three-hour side quest, a sudden fascination can end with her desk buried under notes, printouts, and open books, and there's always one more parameter worth testing. This year, that same tendency even took her all the way to Greece for a week, to work on a project with the Thyssen-Bornemisza National Museum. Her computer is an extension of her body. When she eventually closes it, she can be found at the movies, out with friends, wandering around Madrid with her headphones on, or running from one plan to the next, somehow always finding time for one more.",
    strength: "She is resourceful and quickly finds her way through unfamiliar challenges.",
    weakness: "She can get so focused that she loses track of time, forgets to eat, and eventually finds herself surrounded by far too many open tabs and unanswered texts.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/daniela-concepción-castanedo-696b55284/" }],
  },
  {
    id: "m9", category: "members", isPlaceholder: false,
    name: "Santiago Rodríguez Aranguren", education: "Materials Engineering student at Universidad Complutense de Madrid", role: "Hardware Prototyping Specialist",
    facultyColor: "coral", image: "assets/team/santiago.webp",
    bio: "Santiago studies Materials Engineering at Universidad Complutense de Madrid and still uses the calculator for simple operations. He is not much of a talker, but he still cracks jokes in the lab to relieve stress and lighten the mood. Outside the lab he has an artistic side: he plays several instruments, such as the drums and guitar, and likes to paint in his free time.",
    strength: "Quick problem solver, proving to be the team’s resident MacGyver.",
    weakness: "Hey there! I am using WhatsApp.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/santiago-rodr%C3%ADguez-a40b7b311/" }],
  },
  {
    id: "m11", category: "members", isPlaceholder: false,
    name: "Silvia Yan García Velasco", education: "BSc in Design.", role: "Brand Identity Coordinator",
    facultyColor: "bottle", image: "assets/team/silvia.webp",
    bio: "Silvia is a Graphic and Digital Product Designer graduated in Design from Universidad Complutense de Madrid. She is pursuing a Master's in Interactive Design at Escuela Superior de Diseño de Madrid. Driven by an endless curiosity for visual strategy and 3D design, she’s a restless creative who tackles every challenge with the mindset that nothing is ever truly impossible. Outside the lab, she collects hobbies like side quests, from hitting the gym and videogames to painting and endless creative projects. Honestly, she has so many passions that a single lifetime barely feels like enough time for all of them.",
    strength: <><em>Relentless Determination.</em> She doesn't give up easily and always gets what she wants; not through brute force, but with a blend of charm, persistence, and creative problem-solving that turns every ‘no’ into a fully designed ‘yes’.</>,
    weakness: <><em>Chronic Multitasking.</em> Her brain permanently operates with 40 active browser tabs, three background renders, and a gym workout running all at the same time.</>,
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/silvia-yan-garc%C3%ADa-velasco/" }],
  },

  /* ---------- Advisors ---------- */
  {
    id: "a1", category: "advisors", isPlaceholder: false,
    name: "Sara García Linares", education: "", role: "PI · Genetic engineering",
    facultyColor: "green", image: "assets/team/advisor-placeholder.png",
    bio: "PhD from Universidad Complutense de Madrid with the thesis ‘Molecular analysis of the pore formation mechanism by actinoporins’ (2017). Researcher at ESFUNPROT: Structure-function in proteins. Department of Biochemistry and Molecular Biology at the Faculty of Chemical Sciences.",
    strength: "", weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0003-4983-5730" }],
    institutions: [
      { label: "Department of Biochemistry and Molecular Biology (BBM)", image: "assets/team/institutions/bbm-transparent.webp" },
      { label: "Faculty of Chemical Sciences, UCM", image: "assets/team/institutions/facultad-ciencias-quimicas-ucm-transparent.webp" },
    ],
  },
  {
    id: "a2", category: "advisors", isPlaceholder: false,
    name: "Aurelio Hidalgo Huertas", education: "", role: "Advisor · Enzyme immobilisation",
    facultyColor: "purple", image: "assets/team/advisor-placeholder.png",
    bio: "Professor at Universidad Autónoma de Madrid and head of the group ‘Discovery and improvement of proteins for biotechnological applications through (ultra) high-throughput methods’ (CBM–CSIC).",
    strength: "", weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0001-5740-5584" }],
    institutions: [
      { label: "CBM–CSIC", image: "assets/team/institutions/cbm-csic-lockup.webp" },
      { label: "Universidad Autónoma de Madrid", image: "assets/team/institutions/uam.webp" },
    ],
  },
  {
    id: "a3", category: "advisors", isPlaceholder: false,
    name: "Juan Manuel Bolívar Bolívar", education: "", role: "Advisor · Enzyme immobilisation",
    facultyColor: "purple", image: "assets/team/advisor-placeholder.png",
    bio: "PhD from Universidad Complutense de Madrid with the thesis ‘Engineering of redox processes catalyzed by enzymes: design of new immobilized catalysts for in situ cofactor regeneration’ (2009). Researcher at FQPIMA: Physical chemistry of industrial and environmental processes. Department of Chemical and Materials Engineering at the Faculty of Chemical Sciences.",
    strength: "", weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0001-6719-5082" }],
    institutions: [
      { label: "Faculty of Chemical Sciences, UCM", image: "assets/team/institutions/facultad-ciencias-quimicas-ucm-transparent.webp" },
    ],
  },
  {
    id: "a4", category: "advisors", isPlaceholder: false,
    name: "Beatriz Isabel Redondo", education: "", role: "Advisor · Genetic engineering",
    facultyColor: "green", image: "assets/team/advisor-placeholder.png",
    bio: "PhD from Universidad Complutense de Madrid with the thesis ‘Tissue incorporation of fatty acids, modification in fat consistency and susceptibility to oxidation through the use of different types of fats and natural antioxidants in pig feeding’ (2000). Researcher in the group ‘Welfare and breeding of domestic animals and meat quality’.",
    strength: "", weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0001-6593-9500" }],
  },
  {
    id: "a5", category: "advisors", isPlaceholder: false,
    name: "Francisco Javier Molpeceres García", education: "", role: "Advisor · Genetic engineering",
    facultyColor: "green", image: "assets/team/advisor-placeholder.png",
    bio: "PhD candidate at Centro de Investigaciones Biológicas Margarita Salas studying the biotechnological capabilities of microorganisms and microbial consortia applied to plastic degradation and production of value-added compounds (CIB–CSIC).",
    strength: "", weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0009-0000-8343-6042" }],
    institutions: [
      { label: "CIB Margarita Salas–CSIC", image: "assets/team/institutions/cib-csic-lockup.webp" },
    ],
  },
  {
    id: "a6", category: "advisors", isPlaceholder: false,
    name: "María Donina Hernández Fuentes", education: "", role: "Advisor · Genetic engineering",
    facultyColor: "green", image: "assets/team/advisor-placeholder.png",
    bio: "María completed a Master's in Psychopharmacology and Drugs of Abuse at Universidad Complutense de Madrid, where her work focused on the long-term behavioural and molecular effects of adolescent alcohol exposure. She currently works as a Laboratory Technician in the Department of Biochemistry and Molecular Biology at the Faculty of Chemical Sciences, UCM, supporting teaching and research activities in the laboratory.",
    strength: "", weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0002-3417-1006" }],
    institutions: [
      { label: "Department of Biochemistry and Molecular Biology (BBM)", image: "assets/team/institutions/bbm-transparent.webp" },
      { label: "Faculty of Chemical Sciences, UCM", image: "assets/team/institutions/facultad-ciencias-quimicas-ucm-transparent.webp" },
    ],
  },
  {
    id: "a7", category: "advisors", isPlaceholder: false,
    name: "Mª Carmen García Payo", education: "", role: "Advisor · Alginate encapsulation",
    facultyColor: "blue", image: "assets/team/advisor-placeholder.png",
    bio: <>
      PhD from Universidad Complutense de Madrid with the thesis <em>‘Membrane distillation of aqueous alcohol solutions’</em> (1998). Associate Professor of Applied Physics in the Department of Structure of Matter, Thermal Physics and Electronics, Faculty of Physical Sciences, and researcher in the <strong>Membranes and Renewable Energies Research Group</strong>, with a focus on membrane-based separation processes, water treatment and sustainable energy applications.
    </>,
    strength: "", weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0002-6809-3907" }],
    institutions: [
      { label: "Faculty of Physical Sciences, UCM", image: "assets/team/institutions/facultad-ciencias-fisicas-ucm-transparent.webp" },
    ],
  },
  {
    id: "a8", category: "advisors", isPlaceholder: false,
    name: "Loreto García Fernández", education: "", role: "Advisor · Hardware",
    facultyColor: "coral", image: "assets/team/advisor-placeholder.png",
    bio: <>
      PhD from Universidad Complutense de Madrid with the thesis <em>‘Design, preparation and characterisation of hollow-fibre membranes for desalination by membrane distillation’</em> (2017). Assistant Professor in the Department of Structure of Matter, Thermal Physics and Electronics, Faculty of Physical Sciences, and researcher in the <strong>Membranes and Renewable Energies Research Group</strong>, focusing on membrane development, membrane distillation, desalination and sustainable water-treatment technologies.
    </>,
    strength: "", weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0002-9366-2630" }],
    institutions: [
      { label: "Faculty of Physical Sciences, UCM", image: "assets/team/institutions/facultad-ciencias-fisicas-ucm-transparent.webp" },
    ],
  },
  {
    id: "a9", category: "advisors", isPlaceholder: false,
    name: "Dianelis Toledo Monterrey", education: "", role: "Advisor · Revalorisation",
    facultyColor: "yellow", image: "assets/team/advisor-placeholder.png",
    bio: "PhD from Instituto de Catálisis y Petroquímica (ICP–CSIC) with the thesis ‘A Roadmap for Computational Enzyme Engineering: Ancestral Sequence Reconstruction, Chimeragenesis, and Machine Learning Assisted Directed Evolution for Unspecific Peroxygenases and Polyester Hydrolases’ (2026). Researcher in the Directed Enzyme Evolution Group at ICP–CSIC. Focuses on computational enzyme engineering, protein engineering, machine learning-assisted directed evolution, cutinases, and unspecific peroxygenases.",
    strength: "", weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0002-0227-8298" }],
    institutions: [
      { label: "ICP–CSIC", image: "assets/team/institutions/icp-csic-lockup.webp" },
    ],
  },
  {
    id: "a10", category: "advisors", isPlaceholder: false,
    name: "Israel Sánchez Moreno", education: "", role: "Advisor · Revalorisation",
    facultyColor: "yellow", image: "assets/team/advisor-placeholder.png",
    bio: "PhD from Universidad Autónoma de Madrid with a doctorate in Molecular Biology (2009). Tenured Scientist at the Institute of General Organic Chemistry (IQOG–CSIC). Researcher in biocatalysis, protein engineering, and directed evolution, focusing on interdisciplinary applications bridging chemistry and biology, including biotransformations, enzymology, and organic synthesis.",
    strength: "", weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0001-9184-9445" }],
    institutions: [
      { label: "IQOG–CSIC", image: "assets/team/institutions/iqog-csic-lockup.webp" },
    ],
  },
  {
    id: "a11", category: "advisors", isPlaceholder: false,
    name: "Sonia Castillo Lluva", education: "", role: "Advisor · Genetic engineering",
    facultyColor: "green", image: "assets/team/advisor-placeholder.png",
    bio: <>
      PhD from Universidad Complutense de Madrid with the thesis ‘G1 phase regulators in <em>Ustilago maydis</em> and the virulence programme’ (2005). Researcher and Associate Professor in the Department of Biochemistry and Molecular Biology at the Faculty of Chemical Sciences, Universidad Complutense de Madrid. Her research focuses on cell signalling, cell polarity and migration, and the molecular mechanisms involved in tumour invasion and metastasis, particularly in breast cancer.
    </>,
    strength: "", weakness: "", links: [],
    institutions: [
      { label: "Department of Biochemistry and Molecular Biology (BBM)", image: "assets/team/institutions/bbm-transparent.webp" },
      { label: "Faculty of Chemical Sciences, UCM", image: "assets/team/institutions/facultad-ciencias-quimicas-ucm-transparent.webp" },
    ],
  },
  {
    id: "a12", category: "advisors", isPlaceholder: false,
    name: "Eduardo García-Junceda", education: "", role: "Advisor · Revalorisation",
    facultyColor: "yellow", image: "assets/team/advisor-placeholder.png",
    bio: "PhD from Universidad Complutense de Madrid with the thesis ‘Obtención de fenoles liquémicos mediante sistemas enzimáticos inmovilizados: hidrólisis de los ácidos evérmico y fisódico’ (1991). Researcher at the Institute of General Organic Chemistry (IQOG–CSIC) within the BioGlycoChem Group. Focuses on biocatalysis, enzyme technology, biocatalytic cascades, multi-enzyme systems, and biotransformations.",
    strength: "", weakness: "",
    links: [{ label: "ORCID iD", url: "https://orcid.org/0000-0002-2344-8743" }],
    institutions: [
      { label: "IQOG–CSIC", image: "assets/team/institutions/iqog-csic-lockup.webp" },
    ],
  },
  {
    id: "a13", category: "advisors", isPlaceholder: false,
    name: "Silvia Díaz del Toro", education: "", role: "Advisor",
    facultyColor: "gray", image: "assets/team/advisor-placeholder.png",
    bio: "PhD from Universidad Complutense de Madrid with the thesis ‘Analysis of the interaction between heavy metals (Cd, Zn, Cu) and ciliated protozoa: toxicological evaluation, bioaccumulation and metallothioneins’ (2003). Researcher at MICROESTRES: Microbial stress and environmental pollution. Department of Genetics, Physiology and Microbiology at the Faculty of Biological Sciences.",
    strength: "", weakness: "", links: [],
    institutions: [
      { label: "Faculty of Biological Sciences, UCM", image: "assets/team/institutions/facultad-ciencias-biologicas-ucm.webp" },
    ],
  },

  /* ---------- Mentors ---------- */
  {
    id: "me1", category: "mentors", isPlaceholder: false,
    name: "Elvira Mateos García", education: "Environmental biologist · Sustainability and bioeconomy", role: "Mentor",
    facultyColor: "gray", image: "assets/team/mentor-placeholder.png",
    bio: "Elvira is an environmental biologist and sustainability expert, passionate about turning waste into valuable resources and creating solutions with real environmental impact. As an EU Bioeconomy Youth Ambassador, she works at the intersection of science, communication, and sustainability. After leading the RePET team at iGEM Madrid UCM 2024, she now returns as a mentor, sharing her experience and supporting this year’s team through both the scientific and strategic challenges of the competition. Beyond the lab, she is actively involved in innovation forums, collaborative projects, talks, and workshops, translating complex ideas into engaging stories around bioeconomy, circular solutions, and social impact.",
    strength: "A natural connector of ideas, she can start from a single concept and build bridges across science, policy, and innovation, making others see both the urgency and possibility of a more sustainable future.",
    weakness: "Chronic ‘this sounds like a cool opportunity, let’s do it’ syndrome. She has a dangerous tendency to say yes first and figure out how to squeeze it into her calendar later.",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/elvira-mateos-garcia/" }],
  },
  {
    id: "me2", category: "mentors", isPlaceholder: false,
    name: "Paula Sánchez-Blanco Sánchez", education: "Biochemistry · MSc in Bioeconomy and Biotechnology", role: "Mentor",
    facultyColor: "gray", image: "assets/team/mentor-placeholder.png",
    bio: "Paula studied Biochemistry and later completed a Master's in Bioeconomy and Biotechnology between France and Vietnam, an experience that strengthened both her scientific background and her love for Southeast Asian culture. After taking part in RePET, the Madrid-UCM iGEM 2024 team, she now returns as a mentor, supporting us mainly with the lab work and iGEM medals. Her defining personality trait is a chronic inability to say ‘no’ to any plan, a habit that constantly lands her in unexpected, chaotic adventures that she ends up thoroughly enjoying. Outside the lab, she is a massive theatre nerd; when she isn't exploring the globe, you can usually find her either consuming comedy shows or acting on stage herself.",
    strength: "Relentless ‘big picture’ vision. She is a natural leader who refuses to give up, meaning she will stubbornly repeat a failed experiment until it finally surrenders, while always keeping an eye on the entire process.",
    weakness: "Strategic napping. While researching in Canada, she mastered the high-adrenaline sport of leaving a PCR or gel running, sprinting to her nearby dorm for a 30-minute nap, and waking up just in time to check the results.", links: [],
  },
  {
    id: "me3", category: "mentors", isPlaceholder: false,
    name: "Álvaro Ferrero Veintemilla", education: "Materials scientist and engineer", role: "Mentor",
    facultyColor: "gray", image: "assets/team/mentor-placeholder.png",
    bio: "Álvaro is a materials scientist and engineer, fascinated by polymers and the possibilities that emerge when we understand them deeply. After leading the Measurements Area for RePET – iGEM Madrid UCM 2024, he now returns as a mentor, eager to help this year’s team pursue scientific excellence while nurturing the curiosity and creativity he believes are at the heart of innovation. His curiosity rarely stops at the laboratory door. You’ll probably find Álvaro wandering through a museum, absorbed in art history: you can never be too sure, as his interests are as diverse as where he pursues them; he might be in Poland learning about botanical biodiversity and applications in pharmacology; the next, in Paraguay implementing membrane technologies to improve water treatment in rural communities; or in northern Spain with his RePET friends, turning beer industry by-products into good cookies. If there’s something new to learn, chances are he’ll find a way to end up there.",
    strength: "An innate drive to understand how things work, often diving far deeper than strictly necessary simply because he can’t resist pulling on one more thread. Whether it’s polymers, plants, art, or food science, he approaches every topic with the same contagious enthusiasm and genuine desire to keep learning.",
    weakness: "Acute protocolitis. If he’s doing an experiment, you can be absolutely certain there’s a carefully written protocol behind it, and he fully expects everyone else to have one too. Improvisation in the lab makes him visibly uncomfortable, especially when someone starts pipetting with nothing but ‘the vibes’ as their experimental plan.",
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
            className={`team-modal__dialog team-modal__dialog--${selectedPerson.category}`}
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

            {selectedPerson.links.length > 0 && (
              <div className="team-modal__links">
                {selectedPerson.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {selectedPerson.institutions && selectedPerson.institutions.length > 0 && (
              <div className="team-modal__institutions" role="list" aria-label="Institutional affiliations">
                {selectedPerson.institutions.map((institution) => (
                  <div className="team-modal__institution" role="listitem" key={institution.image}>
                    <img src={asset(institution.image)} alt={institution.label} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
