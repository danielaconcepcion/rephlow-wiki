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

/** Open the experiment's folder, then bring that folder into view.
 *
 * The scroll lands on the folder deck rather than on the sub-block
 * heading. The heading sits *above* the workflow figure the reader just
 * clicked, so scrolling there puts the figure back on screen and leaves
 * the folder that just opened below the fold — the deck is a good screen
 * further down. Landing on the tab row instead puts the newly opened
 * folder exactly where the reader is looking. `.folder-stack` carries the
 * same `scroll-margin-top: var(--section-nav-offset)` as every other
 * scroll target on the page, so the sticky nav never covers it.
 *
 * A stage with no experiment of its own (no `target`, or a target whose
 * deck isn't on the page) just scrolls to its section, as before.
 */
export function openExperiment(section: string, target?: string) {
  const tab = target
    ? document.getElementById(`folder-tab-${target}`)
    : null;

  if (!tab) {
    document
      .getElementById(section)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  tab.click();
  /* Opening a folder only changes what renders *below* the tab row, so the
     deck's own top does not move — but wait for that paint anyway, so the
     scroll is measured against the settled layout. */
  const deck = tab.closest(".folder-stack") ?? document.getElementById(section);
  requestAnimationFrame(() => {
    deck?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
