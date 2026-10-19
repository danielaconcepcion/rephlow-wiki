/*
 * Team page data (rePhlow · Madrid-UCM 2026).
 * To edit a person, change their entry in PEOPLE. Photos are loaded from
 * IMG_BASE + "<slug>.avif" and stickers from IMG_BASE + "<slug>-sticker.avif".
 * Logos: IMG_BASE + "logo-<key>.avif". All files are in team-images-avif.zip (folder "team").
 */
export const IMG_BASE = "https://static.igem.wiki/teams/6124/wiki/team/";
export const img = (f: string): string => IMG_BASE + f;

export type SectionId = "members" | "advisors" | "mentors";
export type Color = "green" | "yellow" | "purple" | "blue" | "coral" | "gray" | "bottle" | "none";
export type LogoKey =
  | "bbm"
  | "fcq"
  | "fcf"
  | "fcb"
  | "cbm"
  | "uam"
  | "cib"
  | "icp"
  | "iqog"
  | "repet"
  | "ucm";

export type Person = {
  slug: string;
  name: string;
  color: Color;
  role: string;
  education?: string;
  roleText?: string;
  about?: string[];
  strength?: string;
  weakness?: string;
  logos?: LogoKey[];
  links: [string, string][];
  noPhoto?: boolean;
};

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "members", label: "Team Members" },
  { id: "advisors", label: "Advisors" },
  { id: "mentors", label: "Mentors" },
];

/* Colour legend: what each card colour means */
export const LEGEND: [Color, string][] = [
  ["green", "Genetic engineering"],
  ["yellow", "Revalorisation"],
  ["purple", "Enzyme immobilisation"],
  ["blue", "Bacterial encapsulation"],
  ["coral", "Hardware"],
  ["gray", "Model"],
  ["bottle", "Brand identity"],
];

/* Institution logos: [name, image URL, height in px, optional CSS modifier] */
export const LOGO: Record<LogoKey, [string, string, number, string?]> = {
  bbm: ["Department of Biochemistry and Molecular Biology (BBM)", img("logo-bbm.avif"), 50],
  fcq: ["Faculty of Chemical Sciences, UCM", img("logo-fcq.avif"), 48],
  fcf: ["Faculty of Physical Sciences, UCM", img("logo-fcf.avif"), 54],
  fcb: ["Faculty of Biological Sciences, UCM", img("logo-fcb.avif"), 50],
  cbm: ["CBM–CSIC", img("logo-cbm.avif"), 44],
  uam: ["Universidad Autónoma de Madrid", img("logo-uam.avif"), 50],
  cib: ["CIB Margarita Salas–CSIC", img("logo-cib.avif"), 40],
  icp: ["ICP–CSIC", img("logo-icp.avif"), 44],
  iqog: ["IQOG–CSIC", img("logo-iqog.avif"), 44],
  repet: ["RePET – iGEM Madrid-UCM 2024", img("logo-repet.avif"), 52],
  ucm: ["Universidad Complutense de Madrid", img("logo-ucm.avif"), 42, "ucm"],
};

export const PEOPLE: Record<SectionId, Person[]> = {
  members: [
    {
      slug: "maria-gomez",
      name: "María Gómez Gómez",
      color: "green",
      education: "4th year Chemistry & Biochemistry student",
      role: "Team Leader · Genetic Engineering",
      roleText:
        "As Team Leader, she balances decision-making, task coordination, deadline management and conflict resolution, keeping the team aligned while turning complex challenges into clear priorities to keep moving towards a shared goal.",
      about: [
        "María studies Chemistry and Biochemistry because being busy is not just a habit, it is a personality trait. As long as she has had at least ten hours of sleep and a coffee with extra energy, she can usually be found jumping between rePhlow, university, friends, pilates (preferably with time for a good <em>aperitivo</em> in between) and somehow still saying out loud what everyone else wisely decided to keep as an inside thought.",
      ],
      strength:
        "She is not a Type A person; she invented the concept. A little obsessed with organisation, deadlines and planning, she can turn any level of chaos into a colour-coded system.",
      weakness:
        "Sunshine. She will abandon almost anything for the opportunity to lie in the sun, although she strongly believes solar recharging should technically count as a strength.",
      links: [["LinkedIn", "https://www.linkedin.com/in/maria-gomez-gomez-67a191363/"]],
    },
    {
      slug: "marta-gil",
      name: "Marta Gil Alarcón",
      color: "yellow",
      education: "4th year Biochemistry student",
      role: "Entrepreneurship Coordinator",
      roleText:
        "As Entrepreneurship Coordinator, she leads the development of the project’s business strategy, combining market research, value proposition and financial planning to translate the scientific concept into a viable and impactful solution. She has also led the search for funding to support the project's development through accelerators, grants, and innovation, science, and entrepreneurship awards.",
      about: [
        "Marta studies Biochemistry at Universidad Complutense de Madrid because sitting still has never really been her style. As long as there's a laugh to share and a to-do list to conquer, she can usually be found bouncing between the lab, fundraising meetings, the gym, and a trip abroad she's already half-planned, all while somehow still managing to gather everyone around a table for good food and better conversation.",
      ],
      strength:
        "Turning chaos into a schedule. She can rally a team, beat a deadline, and defuse a conflict before it even knows it's a conflict.",
      weakness:
        "A stubborn perfectionist streak that makes delegating feel like handing over her firstborn. She's working on it, one shared task at a time.",
      links: [["LinkedIn", "https://www.linkedin.com/in/marta-gil-alarc%C3%B3n-b4bb27234/"]],
    },
    {
      slug: "diego-villa",
      name: "Diego Villa Lázaro",
      color: "purple",
      education: "BSc in Biochemistry. MSc student in Translational Medicine.",
      role: "Wet Lab Coordinator · Genetic Engineering & Enzymatic Immobilisation",
      roleText:
        "As Wet Lab Coordinator, he oversees experimental planning, protocol development and laboratory workflows, coordinating the team’s experiments while ensuring consistency, reproducibility and alignment between experimental work and the project’s scientific goals.",
      about: [
        "Diego coordinates the wet lab behind rePhlow, from planning experiments and writing protocols to keeping every bench running smoothly, juggling lab chaos and outreach (all while ensuring the lab never runs low on laughs). Whether he is validating complex hypotheses, presenting the project on stage, or patiently explaining the exact same concept for the third time to keep everyone aligned, he proves daily that relentless perfectionism and great vibes can peacefully coexist.",
        "Outside the lab, he spends his time cycling through a never-ending queue of creative outlets: drawing, writing, music, gaming, and making plans with friends.",
      ],
      strength:
        "A walking Wikipedia with a comedy routine. He possesses an uncanny ability to translate high-level science into clear, entertaining explanations so that absolutely no one gets left behind.",
      weakness:
        "Creative side-quests. If left unsupervised with a notebook or a console, he will accidentally write a full poetry book or beat the game when he was supposed to be getting some sleep.",
      links: [["LinkedIn", "https://www.linkedin.com/in/diego-villa-l%C3%A1zaro-9b703429a/"]],
    },
    {
      slug: "adriana-cuadro",
      name: "Adriana Cuadro López",
      color: "yellow",
      education: "4th year Biochemistry student",
      role: "Human Practices Coordinator",
      roleText:
        "As Human Practices Coordinator, she connects the project with its wider social and environmental context, coordinating stakeholder engagement, gathering diverse perspectives and translating external feedback into meaningful improvements to the project.",
      about: [
        "Adriana is a Biochemistry student with an unstoppable, sunny energy. She's the kind of person who can turn a stressful lab meeting into a laugh, and still get everyone back on track five minutes later. Cheerful, outgoing and stubborn as they come, she's also remarkably calm, disciplined and organized, staying steady and clear headed even when deadlines pile up. Her real superpower is keeping her cool under pressure, while everyone else is losing theirs.",
        "Outside the lab, she's just as much in motion: spiking volleyballs, hiking through nature, sketching or strumming her guitar, cooking up something good, and never turning down a good plan with friends, especially if food is involved. She also loves to travel, always on the lookout for the next adventure.",
        "Fun fact: she has a dog, and her very first word was in English, a little souvenir from a spell in Canada during her childhood.",
      ],
      strength:
        "Keeping chaos organized. She juggles deadlines, calms nerves and solves conflicts before they even become conflicts, and her stubbornness definitely helps here.",
      weakness:
        "Perfectionism. She'll happily double check a protocol three times, and redo an experiment as many times as it takes until it comes out exactly right.",
      links: [["LinkedIn", "https://www.linkedin.com/in/adriana-cuadro-l%C3%B3pez-ab2467348/"]],
    },
    {
      slug: "irene-fiol",
      name: "Irene Fiol Vega",
      color: "blue",
      education: "4th year Biochemistry student",
      role: "Finance Coordinator",
      roleText:
        "As Finance Coordinator, she manages budgeting, fundraising, expense tracking and financial planning, balancing the team’s ambitions with available resources while turning financial constraints into practical decisions that keep the project moving forward.",
      about: [
        "Irene studies Biochemistry and firmly believes that every problem can be improved with a well-designed spreadsheet. She enjoys bringing order to chaos, whether that means organising data or figuring out why an experiment refused to behave. Naturally curious, she loves understanding how things work, even if that sometimes means spending longer than expected solving a problem.",
        "Outside the lab, she enjoys artistic swimming, singing, and attempting to maintain a healthy work-life balance.",
      ],
      strength: "Seeing both the big picture and the tiny details.",
      weakness: "Badly designed spreadsheets. She feels personally offended by them.",
      links: [["LinkedIn", "https://www.linkedin.com/in/irene-fiol-vega/"]],
    },
    {
      slug: "angel-vilar",
      name: "Ángel Vilar Martín",
      color: "yellow",
      education: "BSc in Biology specialised in Biotechnology. MSc student in Biophysics.",
      role: "Dry Lab Coordinator",
      roleText:
        "As Dry Lab Coordinator, he oversees protocol design, data analysis and result interpretation, ensuring experimental findings are translated into clear conclusions that guide the team’s next engineering decisions.",
      about: [
        "Ángel is a Biologist specialised in Biotechnology from Universidad Complutense de Madrid, currently pursuing a Master's degree in Biophysics at Universidad Autónoma de Madrid. He is usually calm and focused, unless the experiment decides otherwise.",
        "Outside the lab, he loves spending hours walking around the city with music on, taking in the streets, and is a true fan of the internet age, often falling down Google rabbit holes or picking up a project just to see if he can master it. He also enjoys long, unplanned plans, a terrace with a glass of wine, and generally has a hard time knowing when to call it a day. Fun fact: before starting university he used to practice archery.",
      ],
      strength:
        "He tackles every task with effectiveness and organisation, and somehow manages to be genuinely skilled across more fields than seems fair.",
      weakness:
        "Extreme impatience (especially when waiting for an experiment to work), a tendency to overthink and an unfortunate inability to say no.",
      links: [["LinkedIn", "https://www.linkedin.com/in/angelvilarmartin/"]],
    },
    {
      slug: "martina-grudsky",
      name: "Martina Grudsky Rojas",
      color: "blue",
      education: "4th year Biology student",
      role: "Social Media Coordinator",
      roleText:
        "As Social Media Coordinator, she shapes the team’s online presence, planning and creating content that communicates the project’s science, progress and identity while engaging different audiences across digital platforms.",
      about: [
        "Martina is a biology student finishing her degree in Madrid, where she splits her time between the complexities of ecological conservation, synthetic biology projects, and keeping up with lab work. Driven by an endless curiosity for natural systems and how living things interact, she’s a curious explorer who approaches every scientific or creative challenge with persistence and a sharp eye for detail.",
        "Outside the lab, she collects hobbies like side quests, ranging from hiking in the mountains and doing crosswords and sudokus to walking her two sausage dogs. Honestly, she has so many interests that a single lifetime barely feels like enough time for all of them.",
      ],
      strength:
        "Relentless curiosity. She never stops asking “why” or figuring out how things work, tackling problems with a mix of scientific rigor, adaptability, and a great sense of humor that makes any project fun.",
      weakness:
        "Side-quest overload. Her brain permanently operates with field guides open, a backlog of music albums calling her name, and way too many ongoing projects competing for her attention.",
      links: [["LinkedIn", "https://www.linkedin.com/in/martina-grudsky-rojas-544506308/"]],
    },
    {
      slug: "marina-delfa",
      name: "Marina Delfa Lalaguna",
      color: "coral",
      education:
        "BSc in Chemistry & Biochemistry. MSc student in Industrial and Environmental Biotechnology.",
      role: "Hardware Coordinator",
      roleText:
        "As Hardware Coordinator, she leads the design, development and optimisation of the project’s physical systems, coordinating prototyping and testing while turning engineering requirements into practical and reliable solutions.",
      about: [
        "Marina is studying an MSc in Industrial and Environmental Biotechnology. Graduated in Chemistry and Biochemistry, the lab is her natural habitat. Outgoing, calm, and always up to help or have a chat, she adapts to different workflows: from engineering bioreactors to pure synbio, there is no boring science.",
        "As a fun fact, Mamma Mia being the biggest masterpiece ever created is a hill she is ready to die on.",
      ],
      strength: "She can troubleshoot an experiment over and over again if needed without losing her smile.",
      weakness:
        "She can track 30 different variables for a complex experiment, but will forget to bring her own keys from home.",
      links: [["LinkedIn", "https://www.linkedin.com/in/marina-delfa-lalaguna-92a887283/"]],
    },
    {
      slug: "daniela-concepcion",
      name: "Daniela Concepción Castanedo",
      color: "gray",
      education: "BSc in Physics. MSc student in Condensed Matter Physics and Biophysics.",
      role: "Wiki & Modelling Coordinator",
      roleText:
        "As Wiki & Modelling Coordinator, she leads the computational and modelling work and coordinates the development of the team’s digital platform, translating complex scientific work into clear, accessible content while using modelling and data-driven insights to support project decisions.",
      about: [
        "Daniela studied Physics at Universidad Complutense de Madrid, focusing on Fundamental Physics, and is now pursuing a Master's in Condensed Matter Physics and Biophysics at Universidad Autónoma de Madrid.",
        "She never does anything half-heartedly: opening Blender “just to try one thing” can become a three-hour side quest, a sudden fascination can end with her desk buried under notes, printouts, and open books, and there's always one more parameter worth testing. This year, that same tendency even took her all the way to Greece for a week, to work on a project with the Thyssen-Bornemisza National Museum.",
        "Her computer is an extension of her body. When she eventually closes it, she can be found at the movies, out with friends, wandering around Madrid with her headphones on, or running from one plan to the next, somehow always finding time for one more.",
      ],
      strength: "She is resourceful and quickly finds her way through unfamiliar challenges.",
      weakness:
        "She can get so focused that she loses track of time, forgets to eat, and eventually finds herself surrounded by far too many open tabs and unanswered texts.",
      links: [["LinkedIn", "https://www.linkedin.com/in/daniela-concepci%C3%B3n-castanedo-696b55284/"]],
    },
    {
      slug: "santiago-rodriguez",
      name: "Santiago Rodríguez Aranguren",
      color: "coral",
      education: "Materials Engineering student at Universidad Complutense de Madrid",
      role: "Hardware Prototyping Specialist",
      roleText:
        "As Hardware Prototyping Specialist, he contributes to the design, construction and optimisation of the project’s physical systems, working hands-on on prototyping and testing while also supporting the development of the alginate encapsulation system.",
      about: [
        "Santiago studies Materials Engineering at Universidad Complutense de Madrid and still uses the calculator for simple operations. He is not much of a talker, but he still cracks jokes in the lab to relieve stress and lighten the mood.",
        "Outside the lab he has an artistic side: he plays several instruments, such as the drums and guitar, and likes to paint in his free time.",
      ],
      strength: "Quick problem solver, proving to be the team’s resident MacGyver.",
      weakness: "Hey there! I am using WhatsApp.",
      links: [["LinkedIn", "https://www.linkedin.com/in/santiago-rodr%C3%ADguez-a40b7b311/"]],
    },
    {
      slug: "silvia-yan",
      name: "Silvia Yan García Velasco",
      color: "bottle",
      education: "BSc in Design. MSc student in Interactive Design.",
      role: "Brand Identity Coordinator",
      roleText:
        "As Brand Identity Coordinator, she develops and maintains the team’s visual language, ensuring consistency across the wiki, social media and communication materials while translating the project’s scientific identity into a clear and recognisable brand.",
      about: [
        "Silvia is a Graphic and Digital Product Designer who graduated in Design from Universidad Complutense de Madrid and is now pursuing a Master's in Interactive Design at Escuela Superior de Diseño de Madrid. Driven by an endless curiosity for visual strategy and 3D design, she’s a restless creative who tackles every challenge with the mindset that nothing is ever truly impossible.",
        "Outside the lab, she collects hobbies like side quests, from hitting the gym and videogames to painting and endless creative projects. Honestly, she has so many passions that a single lifetime barely feels like enough time for all of them.",
      ],
      strength:
        "Relentless determination. She doesn't give up easily and always gets what she wants; not through brute force, but with a blend of charm, persistence, and creative problem-solving that turns every “no” into a fully designed “yes.”",
      weakness:
        "Chronic multitasking. Her brain permanently operates with 40 active browser tabs, three background renders, and a gym workout running all at the same time.",
      links: [["LinkedIn", "https://www.linkedin.com/in/silvia-yan-garc%C3%ADa-velasco/"]],
    },
  ],
  advisors: [
    {
      slug: "sara-garcia",
      logos: ["bbm", "fcq"],
      name: "Sara García Linares",
      color: "green",
      role: "PI · Genetic engineering",
      about: [
        "PhD from Universidad Complutense de Madrid with the thesis “Molecular analysis of the pore formation mechanism by actinoporins” (2017). Researcher at ESFUNPROT: Structure-function in proteins, Department of Biochemistry and Molecular Biology at the Faculty of Chemical Sciences.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0003-4983-5730"]],
    },
    {
      slug: "aurelio-hidalgo",
      logos: ["cbm", "uam"],
      name: "Aurelio Hidalgo Huertas",
      color: "purple",
      role: "Advisor · Enzyme immobilisation",
      about: [
        "Professor at Universidad Autónoma de Madrid and head of the group “Discovery and improvement of proteins for biotechnological applications through (ultra) high-throughput methods” (CBM – CSIC).",
      ],
      links: [["ORCID", "https://orcid.org/0000-0001-5740-5584"]],
    },
    {
      slug: "juan-manuel-bolivar",
      logos: ["fcq"],
      name: "Juan Manuel Bolívar Bolívar",
      color: "purple",
      role: "Advisor · Enzyme immobilisation",
      about: [
        "PhD from Universidad Complutense de Madrid with the thesis “Engineering of redox processes catalyzed by enzymes: design of new immobilized catalysts for in situ cofactor regeneration” (2009). Researcher at FQPIMA: Physical chemistry of industrial and environmental processes, Department of Chemical and Materials Engineering at the Faculty of Chemical Sciences.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0001-6719-5082"]],
    },
    {
      slug: "beatriz-isabel",
      logos: ["ucm"],
      name: "Beatriz Isabel Redondo",
      color: "green",
      role: "Advisor · Genetic engineering",
      about: [
        "PhD from Universidad Complutense de Madrid with the thesis “Tissue incorporation of fatty acids, modification in fat consistency and susceptibility to oxidation through the use of different types of fats and natural antioxidants in pig feeding” (2000). Researcher in the group “Welfare and breeding of domestic animals and meat quality”.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0001-6593-9500"]],
    },
    {
      slug: "francisco-javier-molpeceres",
      logos: ["cib"],
      name: "Francisco Javier Molpeceres García",
      color: "green",
      role: "Advisor · Genetic engineering",
      about: [
        "PhD candidate at Centro de Investigaciones Biológicas Margarita Salas (CIB – CSIC), studying the biotechnological capabilities of microorganisms and microbial consortia applied to plastic degradation and the production of value-added compounds.",
      ],
      links: [["ORCID", "https://orcid.org/0009-0000-8343-6042"]],
    },
    {
      slug: "maria-donina",
      logos: ["bbm", "fcq"],
      name: "María Donina Hernández Fuentes",
      color: "green",
      role: "Advisor · Genetic engineering",
      about: [
        "María completed a Master's in Psychopharmacology and Drugs of Abuse at Universidad Complutense de Madrid, where her work focused on the long-term behavioural and molecular effects of adolescent alcohol exposure. She currently works as a Laboratory Technician in the Department of Biochemistry and Molecular Biology at the Faculty of Chemical Sciences, UCM, supporting teaching and research activities in the laboratory.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0002-3417-1006"]],
    },
    {
      slug: "carmen-garcia",
      logos: ["fcf"],
      name: "Mª Carmen García Payo",
      color: "blue",
      role: "Advisor · Alginate encapsulation",
      about: [
        "PhD from Universidad Complutense de Madrid with the thesis <em>“Membrane distillation of aqueous alcohol solutions”</em> (1998). Associate Professor of Applied Physics in the Department of Structure of Matter, Thermal Physics and Electronics, Faculty of Physical Sciences, and researcher in the <strong>Membranes and Renewable Energies Research Group</strong>, with a focus on membrane-based separation processes, water treatment and sustainable energy applications.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0002-6809-3907"]],
    },
    {
      slug: "dianelis-toledo",
      logos: ["icp"],
      name: "Dianelis Toledo Monterrey",
      color: "yellow",
      role: "Advisor · Revalorisation",
      about: [
        "PhD from Instituto de Catálisis y Petroquímica (ICP-CSIC) with the thesis “A Roadmap for Computational Enzyme Engineering: Ancestral Sequence Reconstruction, Chimeragenesis, and Machine Learning Assisted Directed Evolution for Unspecific Peroxygenases and Polyester Hydrolases” (2026). Researcher in the Directed Enzyme Evolution Group at ICP-CSIC, focusing on computational enzyme engineering, protein engineering, machine learning-assisted directed evolution, cutinases and unspecific peroxygenases.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0002-0227-8298"]],
    },
    {
      slug: "israel-sanchez",
      logos: ["iqog"],
      name: "Israel Sánchez Moreno",
      color: "yellow",
      role: "Advisor · Revalorisation",
      about: [
        "PhD from Universidad Autónoma de Madrid with a doctorate in Molecular Biology (2009). Tenured Scientist at the Institute of General Organic Chemistry (IQOG-CSIC). Researcher in biocatalysis, protein engineering and directed evolution, focusing on interdisciplinary applications bridging chemistry and biology, including biotransformation, enzymology and organic synthesis.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0001-9184-9445"]],
    },
    {
      slug: "sonia-castillo",
      logos: ["bbm", "fcq"],
      name: "Sonia Castillo Lluva",
      color: "green",
      role: "Advisor · Genetic engineering",
      about: [
        "PhD from Universidad Complutense de Madrid with the thesis “G1 phase regulators in <em>Ustilago maydis</em> and the virulence programme” (2005). Researcher and Associate Professor in the Department of Biochemistry and Molecular Biology at the Faculty of Chemical Sciences, Universidad Complutense de Madrid. Her research focuses on cell signalling, cell polarity and migration, and the molecular mechanisms involved in tumour invasion and metastasis, particularly in breast cancer.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0001-5357-7178"]],
    },
    {
      slug: "noemi-encinas",
      logos: ["fcq"],
      name: "Noemí Encinas García",
      color: "blue",
      role: "Advisor · Alginate encapsulation",
      about: [
        "PhD from Universidad Carlos III de Madrid with the thesis “Surface modification of polymeric materials using cold plasma sources” (2012). Permanent Lecturer in the Department of Chemical and Materials Engineering at the Faculty of Chemical Sciences, Universidad Complutense de Madrid, and researcher in the Surface Engineering and Nanostructured Materials Research Group. Her research focuses on nanostructured surfaces and coatings, corrosion protection, wettability, anti-biofouling materials and surface characterisation.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0002-6419-2852"]],
    },
    {
      slug: "eduardo-garcia-junceda",
      logos: ["iqog"],
      name: "Eduardo García-Junceda",
      color: "yellow",
      role: "Advisor · Revalorisation",
      about: [
        "PhD from Universidad Complutense de Madrid with the thesis “Obtención de fenoles liquénicos mediante sistemas enzimáticos inmovilizados: hidrólisis de los ácidos evérnico y fisódico” (1991). Researcher at the Institute of General Organic Chemistry (IQOG-CSIC) within the BioGlycoChem Group, focusing on biocatalysis, enzyme technology, biocatalytic cascades, multi-enzyme systems and biotransformation.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0002-2344-8743"]],
    },
    {
      slug: "silvia-diaz",
      logos: ["fcb"],
      name: "Silvia Díaz del Toro",
      color: "green",
      role: "Advisor · Genetic engineering",
      about: [
        "PhD from Universidad Complutense de Madrid with the thesis “Analysis of the interaction between heavy metals (Cd, Zn, Cu) and ciliated protozoa: toxicological evaluation, bioaccumulation and metallothioneins” (2003). Researcher at MICROESTRES: Microbial stress and environmental pollution, Department of Genetics, Physiology and Microbiology at the Faculty of Biological Sciences.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0002-7621-9151"]],
    },
    {
      slug: "mercedes-echaide",
      logos: ["fcb"],
      name: "Mercedes Echaide",
      color: "gray",
      role: "Advisor · Institutional support",
      about: [
        "PhD from Universidad Politécnica de Madrid with the thesis “Study of meiotic errors in inbred lines of rye and in wheat–rye hybrids” (1995). Associate Professor in the Department of Biochemistry and Molecular Biology at the Faculty of Biological Sciences, Universidad Complutense de Madrid, and researcher in the BIOPHYS-Hub: Biophysics for Biotechnology and Biomedicine research group.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0002-0836-0858"]],
    },
    {
      slug: "loreto-garcia",
      logos: ["fcf"],
      name: "Loreto García Fernández",
      color: "coral",
      role: "Advisor · Hardware",
      about: [
        "PhD from Universidad Complutense de Madrid with the thesis <em>“Design, preparation and characterisation of hollow-fibre membranes for desalination by membrane distillation”</em> (2017). Assistant Professor in the Department of Structure of Matter, Thermal Physics and Electronics, Faculty of Physical Sciences, and researcher in the <strong>Membranes and Renewable Energies Research Group</strong>, focusing on membrane development, membrane distillation, desalination and sustainable water-treatment technologies.",
      ],
      links: [["ORCID", "https://orcid.org/0000-0002-9366-2630"]],
    },
  ],
  mentors: [
    {
      slug: "elvira-mateos",
      logos: ["repet"],
      name: "Elvira Mateos García",
      color: "none",
      education: "Environmental biologist · Sustainability and bioeconomy",
      role: "Mentor · iGEM Madrid-UCM 2024",
      about: [
        "Elvira is an environmental biologist and sustainability expert, passionate about turning waste into valuable resources and creating solutions with real environmental impact. As an EU Bioeconomy Youth Ambassador, she works at the intersection of science, communication, and sustainability. After leading the RePET team at iGEM Madrid UCM 2024, she now returns as a mentor, sharing her experience and supporting this year’s team through both the scientific and strategic challenges of the competition.",
        "Beyond the lab, she is actively involved in innovation forums, collaborative projects, talks, and workshops, translating complex ideas into engaging stories around bioeconomy, circular solutions, and social impact.",
      ],
      strength:
        "A natural connector of ideas, she can start from a single concept and build bridges across science, policy, and innovation, making others see both the urgency and possibility of a more sustainable future.",
      weakness:
        "Chronic “this sounds like a cool opportunity, let’s do it” syndrome. She has a dangerous tendency to say yes first and figure out how to squeeze it into her calendar later.",
      links: [["LinkedIn", "https://www.linkedin.com/in/elvira-mateos-garcia/"]],
    },
    {
      slug: "paula-sanchez-blanco",
      logos: ["repet"],
      name: "Paula Sánchez-Blanco Sánchez",
      color: "none",
      education: "Biochemistry · MSc in Bioeconomy and Biotechnology",
      role: "Mentor · iGEM Madrid-UCM 2024",
      about: [
        "Paula studied Biochemistry and later completed a Master's in Bioeconomy and Biotechnology between France and Vietnam, an experience that strengthened both her scientific background and her love for Southeast Asian culture. After taking part in RePET, the Madrid-UCM iGEM 2024 team, she now returns as a mentor, supporting us mainly with the lab work and iGEM medals.",
        "Her defining personality trait is a chronic inability to say “no” to any plan, a habit that constantly lands her in unexpected, chaotic adventures that she ends up thoroughly enjoying. Outside the lab, she is a massive theatre nerd; when she isn't exploring the globe, you can usually find her either consuming comedy shows or acting on stage herself.",
      ],
      strength:
        "Relentless “big picture” vision. She is a natural leader who refuses to give up, meaning she will stubbornly repeat a failed experiment until it finally surrenders, while always keeping an eye on the entire process.",
      weakness:
        "Strategic napping. While researching in Canada, she mastered the high-adrenaline sport of leaving a PCR or gel running, sprinting to her nearby dorm for a 30-minute nap, and waking up just in time to check the results.",
      links: [],
    },
    {
      slug: "alvaro-ferrero",
      logos: ["repet"],
      name: "Álvaro Ferrero Veintemilla",
      color: "none",
      education: "Materials scientist and engineer",
      role: "Mentor · iGEM Madrid-UCM 2024",
      about: [
        "Álvaro is a materials scientist and engineer, fascinated by polymers and the possibilities that emerge when we understand them deeply. After leading the Measurements Area for RePET – iGEM Madrid UCM 2024, he now returns as a mentor, eager to help this year’s team pursue scientific excellence while nurturing the curiosity and creativity he believes are at the heart of innovation.",
        "His curiosity rarely stops at the laboratory door. You’ll probably find Álvaro wandering through a museum, absorbed in art history: you can never be too sure, as his interests are as diverse as where he pursues them; he might be in Poland learning about botanical biodiversity and applications in pharmacology; the next, in Paraguay implementing membrane technologies to improve water treatment in rural communities; or in northern Spain with his RePET friends, turning beer industry by-products into good cookies. If there’s something new to learn, chances are he’ll find a way to end up there.",
      ],
      strength:
        "An innate drive to understand how things work, often diving far deeper than strictly necessary simply because he can’t resist pulling on one more thread. Whether it’s polymers, plants, art, or food science, he approaches every topic with the same contagious enthusiasm and genuine desire to keep learning.",
      weakness:
        "Acute protocolitis. If he’s doing an experiment, you can be absolutely certain there’s a carefully written protocol behind it, and he fully expects everyone else to have one too. Improvisation in the lab makes him visibly uncomfortable, especially when someone starts pipetting with nothing but “the vibes” as their experimental plan.",
      links: [["LinkedIn", "https://www.linkedin.com/in/alvarofervein/"]],
    },
  ],
};

/* Phrases shown in bold inside each description */
export const BOLD: Record<string, string[]> = {
  "maria-gomez": ["Chemistry and Biochemistry", "Sunshine."],
  "marta-gil": ["Biochemistry at Universidad Complutense de Madrid", "Turning chaos into a schedule."],
  "diego-villa": [
    "coordinates the wet lab behind rePhlow",
    "drawing, writing, music, gaming",
    "A walking Wikipedia with a comedy routine.",
    "Creative side-quests.",
  ],
  "adriana-cuadro": [
    "Biochemistry student",
    "keeping her cool under pressure",
    "Fun fact:",
    "Keeping chaos organized.",
    "Perfectionism.",
  ],
  "irene-fiol": [
    "Biochemistry",
    "well-designed spreadsheet",
    "artistic swimming, singing",
    "Badly designed spreadsheets.",
  ],
  "angel-vilar": ["Biologist specialised in Biotechnology", "Master's degree in Biophysics", "Fun fact:"],
  "martina-grudsky": [
    "biology student",
    "ecological conservation, synthetic biology projects",
    "two sausage dogs",
    "Relentless curiosity.",
    "Side-quest overload.",
  ],
  "marina-delfa": [
    "MSc in Industrial and Environmental Biotechnology",
    "Chemistry and Biochemistry",
    "Mamma Mia",
  ],
  "daniela-concepcion": [
    "Physics at Universidad Complutense de Madrid",
    "Master's in Condensed Matter Physics and Biophysics",
    "Thyssen-Bornemisza National Museum",
  ],
  "santiago-rodriguez": [
    "Materials Engineering at Universidad Complutense de Madrid",
    "drums and guitar",
    "Quick problem solver",
  ],
  "silvia-yan": [
    "Graphic and Digital Product Designer",
    "Master's in Interactive Design",
    "visual strategy and 3D design",
    "Relentless determination.",
    "Chronic multitasking.",
  ],
  "sara-garcia": ["ESFUNPROT: Structure-function in proteins"],
  "aurelio-hidalgo": ["Professor at Universidad Autónoma de Madrid", "(CBM – CSIC)"],
  "juan-manuel-bolivar": ["FQPIMA: Physical chemistry of industrial and environmental processes"],
  "beatriz-isabel": ["“Welfare and breeding of domestic animals and meat quality”"],
  "francisco-javier-molpeceres": ["Centro de Investigaciones Biológicas Margarita Salas (CIB – CSIC)"],
  "maria-donina": ["Laboratory Technician"],
  "carmen-garcia": ["Associate Professor of Applied Physics"],
  "loreto-garcia": ["Assistant Professor"],
  "dianelis-toledo": ["Directed Enzyme Evolution Group at ICP-CSIC"],
  "israel-sanchez": ["Tenured Scientist", "(IQOG-CSIC)"],
  "sonia-castillo": ["Researcher and Associate Professor"],
  "noemi-encinas": ["Permanent Lecturer", "Surface Engineering and Nanostructured Materials Research Group"],
  "eduardo-garcia-junceda": ["(IQOG-CSIC)", "BioGlycoChem Group"],
  "mercedes-echaide": ["Associate Professor", "BIOPHYS-Hub: Biophysics for Biotechnology and Biomedicine"],
  "silvia-diaz": ["MICROESTRES: Microbial stress and environmental pollution"],
  "elvira-mateos": [
    "EU Bioeconomy Youth Ambassador",
    "RePET team at iGEM Madrid UCM 2024",
    "Chronic “this sounds like a cool opportunity, let’s do it” syndrome.",
  ],
  "paula-sanchez-blanco": [
    "Master's in Bioeconomy and Biotechnology",
    "RePET, the Madrid-UCM iGEM 2024 team",
    "Relentless “big picture” vision.",
    "Strategic napping.",
  ],
  "alvaro-ferrero": ["Measurements Area for RePET – iGEM Madrid UCM 2024", "Acute protocolitis."],
};

/* Molecules behind the cards: [left %, top %, size px, rotation deg, opacity, blur px, shape 1|2] */
export const CONTENT_MOLECULES: [number, number, number, number, number, number, number][] = [
  [-2, 4, 210, 40, 0.16, 3, 2],
  [101, 7, 190, 200, 0.14, 3, 1],
  [6, 22, 90, 300, 0.32, 0, 1],
  [94, 26, 110, 120, 0.28, 0, 2],
  [-3, 42, 240, 150, 0.13, 3, 1],
  [102, 47, 220, 20, 0.14, 3, 2],
  [8, 60, 80, 80, 0.34, 0, 2],
  [92, 64, 96, 250, 0.3, 0, 1],
  [-1, 80, 200, 310, 0.15, 3, 2],
  [100, 86, 180, 170, 0.14, 3, 1],
  [5, 96, 70, 30, 0.36, 0, 1],
  [95, 98, 74, 140, 0.34, 0, 2],
  [30, 12, 56, 200, 0.14, 0, 1],
  [68, 34, 60, 90, 0.12, 0, 2],
  [36, 72, 64, 330, 0.12, 0, 2],
  [62, 90, 58, 60, 0.14, 0, 1],
];
