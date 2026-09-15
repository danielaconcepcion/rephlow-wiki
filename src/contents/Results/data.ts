import type { ResultBlockData } from "../../components/LabFolders/types";

/**
 * Placeholder result records — structure only, ready to be replaced with
 * real figures, tables, and interpretation. See
 * src/components/LabFolders/types.ts for the full field reference.
 */
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const RESULT_BLOCKS: ResultBlockData[] = [
  {
    id: "bacteria",
    label: "Bacteria",
    accent: "var(--lab-bacteria)",
    results: [
      {
        id: "result-1",
        tabLabel: "Result 1",
        title: "Result 1",
        description: LOREM,
        aim: LOREM,
        background: [LOREM, LOREM],
        subsections: [
          {
            id: "phosphate-uptake",
            title: "Phosphate uptake over time",
            body: [LOREM],
            figures: [{ src: "assets/results/bacteria-result-1-placeholder.png", caption: "Placeholder figure caption." }],
            observations: LOREM,
            interpretation: LOREM,
          },
          {
            id: "biomass-comparison",
            title: "Biomass comparison across conditions",
            table: {
              headers: ["Condition", "Value", "SD"],
              rows: [
                ["Control", "Add value", "Add value"],
                ["Engineered strain", "Add value", "Add value"],
                ["Encapsulated", "Add value", "Add value"],
              ],
            },
            figures: [
              { src: "assets/results/bacteria-result-1-placeholder-2.png", caption: "Placeholder figure caption." },
              { src: "assets/results/bacteria-result-1-placeholder-3.png", caption: "Placeholder figure caption." },
            ],
            observations: LOREM,
            interpretation: LOREM,
          },
        ],
        discussion: [LOREM, LOREM],
      },
      {
        id: "result-2",
        tabLabel: "Result 2",
        title: "Result 2",
        description: LOREM,
        aim: LOREM,
        subsections: [
          {
            id: "growth-trend",
            title: "Growth trend under selection",
            body: [LOREM, LOREM],
            observations: LOREM,
            interpretation: LOREM,
          },
        ],
        discussion: [LOREM],
      },
    ],
  },
  {
    id: "encapsulation",
    label: "Encapsulación",
    accent: "var(--lab-encapsulation)",
    results: [
      {
        id: "result-1",
        tabLabel: "Result 1",
        title: "Result 1",
        description: LOREM,
        aim: LOREM,
        subsections: [
          {
            id: "bead-size-distribution",
            title: "Bead size distribution",
            figures: [
              { src: "assets/results/encapsulation-result-1-placeholder-1.png", caption: "Placeholder figure caption." },
              { src: "assets/results/encapsulation-result-1-placeholder-2.png", caption: "Placeholder figure caption." },
            ],
            observations: LOREM,
          },
          {
            id: "release-profile",
            title: "Release profile over time",
            body: [LOREM],
            interpretation: LOREM,
          },
        ],
        discussion: [LOREM],
      },
      {
        id: "result-2",
        tabLabel: "Result 2",
        title: "Result 2",
        description: LOREM,
        aim: LOREM,
        background: [LOREM],
        subsections: [
          {
            id: "encapsulation-efficiency",
            title: "Encapsulation efficiency by batch",
            body: [LOREM],
            observations: LOREM,
            interpretation: LOREM,
          },
        ],
        discussion: [LOREM],
      },
    ],
  },
  {
    id: "revalorisation",
    label: "Revalorisation",
    accent: "var(--lab-revalorisation)",
    results: [
      {
        id: "result-1",
        tabLabel: "Result 1",
        title: "Result 1",
        description: LOREM,
        aim: LOREM,
        background: [LOREM],
        subsections: [
          {
            id: "recovery-yield",
            title: "Recovery yield by condition",
            table: {
              headers: ["Condition", "Yield (%)", "Notes"],
              rows: [
                ["Condition A", "Add value", "Lorem ipsum."],
                ["Condition B", "Add value", "Lorem ipsum."],
              ],
            },
            observations: LOREM,
            interpretation: LOREM,
          },
        ],
        discussion: [LOREM],
      },
      {
        id: "result-2",
        tabLabel: "Result 2",
        title: "Result 2",
        description: LOREM,
        aim: LOREM,
        subsections: [
          {
            id: "process-comparison",
            title: "Process comparison",
            body: [LOREM],
            observations: LOREM,
          },
          {
            id: "long-term-stability",
            title: "Long-term stability",
            body: [LOREM],
            interpretation: LOREM,
          },
        ],
        discussion: [LOREM],
      },
    ],
  },
];
