import type { CSSProperties, ReactNode } from "react";
import "./CoreBlocks.css";

/* --------------------------------------------------------------------------
   Section 4.3's two lists, set as cards rather than bullets.

   The seven blocks carry the same colours their modules carry in Figure 11,
   so a reader who meets the Entner–Doudoroff block here recognises it there.
   -------------------------------------------------------------------------- */

/** The three different questions, and the three different answers. */
export function ReactionSets() {
  const SETS = [
    {
      count: "166",
      title: "What the parsimonious solution needs",
      body: "The reactions that carry flux: the cheapest way to reach the optimum, and nothing else.",
    },
    {
      count: "1,985",
      title: "What FVA shows is available",
      body: "The reactions that could carry flux in some equally optimal state: the shape of the solution space, not a route through it.",
    },
    {
      count: "45",
      title: "What a kinetic description needs",
      body: "The reactions whose flux is large enough to move a concentration and whose rate law can be written: those above 10⁻² mmol gDW⁻¹ h⁻¹.",
      lead: true,
    },
  ];
  return (
    <ol className="coreset">
      {SETS.map((s) => (
        <li
          key={s.count}
          className={`coreset__card${s.lead ? " coreset__card--lead" : ""}`}
        >
          <span className="coreset__count">{s.count}</span>
          <span className="coreset__unit">reactions</span>
          <strong className="coreset__title">{s.title}</strong>
          <span className="coreset__body">{s.body}</span>
        </li>
      ))}
    </ol>
  );
}

/** The seven functional blocks the kinetic model is built from, in the
 * colours Figure 11 gives their modules. */
export function CoreBlocks() {
  const BLOCKS: { color: string; title: ReactNode; body: ReactNode }[] = [
    {
      color: "#d35c7c",
      title: "Transport of glucose, oxygen and phosphate",
      body: (
        <>
          What crosses the membrane, including both the Pit symporter and the
          ABC-type Pst route.
        </>
      ),
    },
    {
      color: "#09519d",
      title: "The Entner–Doudoroff pathway",
      body: (
        <>
          The route <em>P. putida</em> actually uses for glucose, rather than a
          textbook glycolysis.
        </>
      ),
    },
    {
      color: "#476cff",
      title: "The TCA cycle",
      body: (
        <>Oxidation of acetyl-CoA and the supply of reducing equivalents.</>
      ),
    },
    {
      color: "#e5a7ca",
      title: "The respiratory chain",
      body: (
        <>
          NADH dehydrogenase and cytochrome oxidase, kept as an independent
          module.
        </>
      ),
    },
    {
      color: "#cb3c5b",
      title: "ATP synthesis and maintenance",
      body: <>ATP synthase and the non-growth maintenance demand.</>,
    },
    {
      color: "#2a60d2",
      title: "Redox balancing",
      body: <>The transhydrogenase that trades NADH against NADPH.</>,
    },
    {
      color: "#426891",
      title: "PolyP polymerisation",
      body: <>The PPK steps that turn ATP and phosphate into chain.</>,
    },
  ];
  return (
    <ul className="coreblocks">
      {BLOCKS.map((b, i) => (
        <li
          key={i}
          className="coreblocks__card"
          style={{ "--mod": b.color } as CSSProperties}
          tabIndex={0}
        >
          <span className="coreblocks__dot" aria-hidden="true" />
          <strong className="coreblocks__title">{b.title}</strong>
          <span className="coreblocks__body">{b.body}</span>
        </li>
      ))}
    </ul>
  );
}
