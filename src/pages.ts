import {
  Home,
  Team,
  Medals,
  ProjectDescription,
  Design,
  Engineering,
  Model,
  Hardware,
  Experiments,
  Measurements,
  Protocols,
  Results,
  Safety,
  HumanPractices,
  CollaborationPartnership,
  EducationCommunication,
  Entrepreneurship,
  Sustainability,
  Contribution,
  Attributions,
  Sponsors,
} from "./contents";

export interface Page {
  name: string;
  /** Rendered by Header as the page-hero title (generic pages only). */
  title: string;
  /** Rendered by Header as the page-hero lede (generic pages only). */
  lead: string;
  path: string;
  component: React.FC;
  /** Exact <title> text from the original static page. */
  docTitle: string;
  /**
   * Home / Team / Medals render their own bespoke hero markup, so the
   * shared generic Header (page-shell > page-hero) is skipped for them.
   */
  hideHeader?: boolean;
}

const Pages: Page[] = [
  {
    name: "Home",
    title: "rePhlow",
    lead: "Make water flow. Make value grow. Choose rePhlow.",
    path: "/",
    component: Home,
    docTitle: "rePhlow — iGEM Wiki",
    hideHeader: true,
  },
  {
    name: "Project Description",
    title: "Project Description",
    lead: "An overview of the problem, motivation, and goals behind rePhlow.",
    path: "/project-description",
    component: ProjectDescription,
    docTitle: "Project Description — rePhlow iGEM Wiki",
  },
  {
    name: "Design",
    title: "Design",
    lead: "A space for the design principles and decisions behind our biological system.",
    path: "/design",
    component: Design,
    docTitle: "Design — rePhlow iGEM Wiki",
  },
  {
    name: "Engineering",
    title: "Engineering",
    lead: "A space for documenting the engineering cycle behind the project.",
    path: "/engineering",
    component: Engineering,
    docTitle: "Engineering — rePhlow iGEM Wiki",
  },
  {
    name: "Model",
    title: "Model",
    lead: "A space for the computational and mathematical modelling work developed.",
    path: "/model",
    component: Model,
    docTitle: "Model — rePhlow iGEM Wiki",
  },
  {
    name: "Hardware",
    title: "Hardware",
    lead: "A space for the hardware concepts, devices, or physical systems associated with the project.",
    path: "/hardware",
    component: Hardware,
    docTitle: "Hardware — rePhlow iGEM Wiki",
  },
  {
    name: "Experiments",
    title: "Experiments",
    lead: "A space for the experimental work carried out throughout the project.",
    path: "/experiments",
    component: Experiments,
    docTitle: "Experiments — rePhlow iGEM Wiki",
  },
  {
    name: "Measurements",
    title: "Measurements",
    lead: "A space for the measurements, characterization, and data collected during the project.",
    path: "/measurements",
    component: Measurements,
    docTitle: "Measurements — rePhlow iGEM Wiki",
  },
  {
    name: "Protocols",
    title: "Protocols",
    lead: "A space for the laboratory protocols and procedures used by the team.",
    path: "/protocols",
    component: Protocols,
    docTitle: "Protocols — rePhlow iGEM Wiki",
  },
  {
    name: "Results",
    title: "Results",
    lead: "A space for presenting the main results and observations from the project.",
    path: "/results",
    component: Results,
    docTitle: "Results — rePhlow iGEM Wiki",
  },
  {
    name: "Safety",
    title: "Safety",
    lead: "A space for safety considerations, risk assessment, and responsible laboratory practices.",
    path: "/safety",
    component: Safety,
    docTitle: "Safety — rePhlow iGEM Wiki",
  },
  {
    name: "Human practices",
    title: "Human Practices",
    lead: "A space for the social, ethical, and stakeholder-oriented dimensions of the project.",
    path: "/human-practices",
    component: HumanPractices,
    docTitle: "Human Practices — rePhlow iGEM Wiki",
  },
  {
    name: "Collaboration and Partnership",
    title: "Collaboration and Partnership",
    lead: "A space for documenting collaborations and partnerships with other teams or institutions.",
    path: "/collaboration-partnership",
    component: CollaborationPartnership,
    docTitle: "Collaboration and Partnership — rePhlow iGEM Wiki",
  },
  {
    name: "Education and Communication",
    title: "Education and Communication",
    lead: "A space for outreach, education, and communication activities.",
    path: "/education-communication",
    component: EducationCommunication,
    docTitle: "Education and Communication — rePhlow iGEM Wiki",
  },
  {
    name: "Entrepreneurship",
    title: "Entrepreneurship",
    lead: "A space for exploring the potential implementation and value of the project beyond the laboratory.",
    path: "/entrepreneurship",
    component: Entrepreneurship,
    docTitle: "Entrepreneurship — rePhlow iGEM Wiki",
  },
  {
    name: "Sustainability",
    title: "Sustainability",
    lead: "A space for the sustainability context and environmental relevance of rePhlow.",
    path: "/sustainability",
    component: Sustainability,
    docTitle: "Sustainability — rePhlow iGEM Wiki",
  },
  {
    name: "Contribution",
    title: "Contribution",
    lead: "A space for materials, tools, or knowledge that may be useful to future iGEM teams.",
    path: "/contribution",
    component: Contribution,
    docTitle: "Contribution — rePhlow iGEM Wiki",
  },
  {
    name: "Team",
    title: "Team",
    lead: "",
    path: "/team",
    component: Team,
    docTitle: "Team — rePhlow iGEM Wiki",
    hideHeader: true,
  },
  {
    name: "Attributions",
    title: "Attributions",
    lead: "A space for acknowledging the work and responsibilities of team members and contributors.",
    path: "/attributions",
    component: Attributions,
    docTitle: "Attributions — rePhlow iGEM Wiki",
  },
  {
    name: "Sponsors",
    title: "Sponsors",
    lead: "A space for acknowledging the support received from sponsors and institutions.",
    path: "/sponsors",
    component: Sponsors,
    docTitle: "Sponsors — rePhlow iGEM Wiki",
  },
  {
    name: "Medals",
    title: "Medals",
    lead: "",
    path: "/medals",
    component: Medals,
    docTitle: "Medals — rePhlow iGEM Wiki",
    hideHeader: true,
  },
];

export default Pages;
