/* Colours and link behaviour for the redrawn workflow figures, kept out
   of shared.tsx so that file exports only components. */

/** The originals' colours, each swapped for its rePhlow counterpart. */
export const C = {
  ink: "#1b2340",
  inkSoft: "#4a5170",
  /** Panel washes: the originals alternate light green with light blue
   * (or with slate grey, in the enzyme figure). */
  panelGreen: "#e2eedb",
  panelBlue: "#d8e7f4",
  panelSlate: "#c9cfdc",
  blue: "#1568a3",
  blueMid: "#5d9fd3",
  blueLight: "#a9cdec",
  bluePale: "#dcebf8",
  green: "#3f7d4a",
  greenMid: "#7cb36f",
  greenLight: "#b9d9a8",
  gold: "#c99a06",
  yellow: "#f2d982",
  yellowPale: "#f8eab8",
  orange: "#e2542d",
  steel: "#7d8396",
  steelDark: "#5f6578",
  steelLight: "#a4aabb",
  white: "#ffffff",
  lavender: "#8f9fd0",
};

/** Scroll to the sub-block, then open the experiment's folder — the same
 * two moves the section nav makes. */
export function openExperiment(section: string, target: string) {
  const el = document.getElementById(section);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById(`folder-tab-${target}`)?.click();
}
