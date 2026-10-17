import type { RoomData } from "./Room";

/* Room 03 — the Notion page's own text, kept as written. The bracketed
   notes that describe the interactive web elements are instructions to
   ourselves, not page content, so they are not printed here. */

export const ROOM_03: RoomData = {
  id: "r03",
  number: "03",
  tag: "Measurement",
  title: "The control and metrics panel",
  photo: "assets/sustainability/room03-control.jpg",
  phlowi: "assets/sustainability/phlowi-3.png",
  quote: [
    "*“The lights dim, the screens glow. This is the room where opinions are not allowed. Here we only read instruments.”*",
  ],
  question:
    "**Has the team's work measurably and significantly addressed one or more SDGs?**",
  references: [
    "International Organization for Standardization. ISO 14040:2006 Environmental management — Life cycle assessment — Principles and framework; ISO 14044:2006 Requirements and guidelines. Geneva: ISO; 2006.",
    "Andreasi Bassi S, et al. Updated characterisation and normalisation factors for the Environmental Footprint (EF) 3.1 method. Luxembourg: Publications Office of the European Union; 2023. doi:10.2760/798894. Related to Commission Recommendation (EU) 2021/2279.",
    "Directive (EU) 2024/3019 of the European Parliament and of the Council of 27 November 2024 concerning urban wastewater treatment (recast). Off J Eur Union. 2024 Dec 12;L 2024/3019. Available from: [https://eur-lex.europa.eu/eli/dir/2024/3019/oj/eng](https://eur-lex.europa.eu/eli/dir/2024/3019/oj/eng)",
    "Chiew CSC, et al. LCA on alginate-based beads. J Water Process Eng. 2022;45:102531.",
    "Nielsen PH, et al. Cradle-to-gate assessment of enzyme products. Int J Life Cycle Assess. 2007;12(6):432–8.",
    "Rittmann BE, McCarty PL. Environmental biotechnology: principles and applications. New York: McGraw-Hill; 2001.",
    "Sala S, Cerutti AK, Pant R. Global normalisation factors for the Environmental Footprint and Life Cycle Assessment. Luxembourg: Publications Office of the European Union; 2017. Report No.: JRC109878.",
    "Contreras-Abara P, et al. Continuous bioproduction of bacterial alginate under nitrogen fixation. Fermentation. 2023;9(5):426. doi:10.3390/fermentation9050426.",
    "Conley DJ, et al. Controlling eutrophication: nitrogen and phosphorus. Science. 2009;323(5917):1014–5. doi:10.1126/science.1167755.",
    "Jupp AR, et al. Phosphorus recovery and recycling — closing the loop. Chem Soc Rev. 2021;50(1):87–101. doi:10.1039/D0CS01150A.",
    "Zhao Q, et al. Towards low energy-carbon footprint: P recovery paths in wastewater treatment. J Environ Manage. 2023;344:118653. doi:10.1016/j.jenvman.2023.118653.",
  ],
  body: [
    {
      k: "p",
      t: "Anyone can call a project green. The hard part is to put a number on it, so before we tell you rePhlow is sustainable we built the instruments that check. Every reading comes from a full **life cycle assessment** under ISO 14040/44, [1] scored with the European Commission's **Environmental Footprint (EF 3.1)** method, [2] the reference framework for environmental claims in the EU. It does not hand out one convenient green light: it hands out **sixteen** readings, each normalised against the yearly impact of an average world citizen, [9] and it forces us to source every figure. The inventory was built in **openLCA 2.6** with the free **BAFU:2026** background database and the EF 3.1 (adapted) method, as an attributional, prospective, screening-level study.",
    },
    {
      k: "quote",
      lines: [
        "**The measuring stick (functional unit).** Every number answers to one task: treat **one cubic metre** of industrial degumming effluent and lower its phosphorus from about **2,290 mg P/L to below the EU discharge limit of 0.7 mg/L** (0.5 mg/L for the largest plants). [3] Same task, same yardstick, fair comparison.",
      ],
    },
    { k: "h", level: 5, t: "**The process we assessed**" },
    {
      k: "p",
      t: "The rePhlow route and the conventional reference were drawn as full process flow diagrams before any number was computed, so the model matches the plant and the system boundary is explicit.",
    },
    {
      k: "figure",
      src: "assets/sustainability/pfd-rephlow.png",
      alt: "Process flow diagram of the rePhlow route",
      caption: "Figure 1. The rePhlow route, as modelled.",
      pending: "public/assets/sustainability/pfd-rephlow.png",
    },
    {
      k: "figure",
      src: "assets/sustainability/pfd-conventional.png",
      alt: "Process flow diagram of the conventional chemical route",
      caption: "Figure 2. The conventional chemical route, as modelled.",
      pending: "public/assets/sustainability/pfd-conventional.png",
    },
    {
      k: "h",
      level: 3,
      id: "r03-reading-1",
      t: "Reading 1: what one cubic metre gives back",
    },
    {
      k: "p",
      t: "We compare rePhlow against the tool it is built to replace: conventional chemical precipitation, where iron salts drag phosphorus into a sludge.",
    },
    {
      k: "table",
      head: [
        "**Reading (per m³ treated)**",
        "**rePhlow**",
        "**Conventional chemical route**",
      ],
      firstCol: true,
      rows: [
        [
          "**Phosphorus recovered**",
          "about **1.95 kg P**, returned to use",
          "0, locked into sludge",
        ],
        [
          "**Reusable water recovered**",
          "about **1 m³**, ultrafiltered, salt-free",
          "not recovered",
        ],
        ["**Hazardous chemical sludge**", "**none**", "about **13.7 kg**"],
        [
          "**Iron reagent consumed**",
          "**none**",
          "about **24 kg** of iron(III) chloride",
        ],
      ],
    },
    {
      k: "p",
      t: "These four do not depend on a fragile assumption and do not move if we change the bead recipe. They are the load-bearing wall of our case.",
    },
    {
      k: "h",
      level: 3,
      id: "r03-reading-2",
      t: "Reading 2: the carbon footprint, including the ugly part",
    },
    {
      k: "p",
      t: "Most sustainability pages skip the numbers that do not flatter them. We will not. At the ultra-conservative starting point of **1.5 mg P per gram of bead**, rePhlow emits about **37 kg CO₂-eq per m³** against about **12 kg** for the chemical route. On climate, today, we lose, and the footprint is **dominated by one thing: making the beads.**",
    },
    {
      k: "p",
      t: "It is honest to be precise about why. Our beads are currently built from **conventional (commercial) alginate**, and producing and shaping that alginate, together with the immobilised phosphatase enzymes it carries, [6][7] is the hotspot that puts us above the chemical route at low bead loadings. We are **not** claiming a green alginate we do not yet have.",
    },
    {
      k: "p",
      t: "What we do have is a clear decarbonisation path, and it is worth stating as a future lever rather than a present achievement. We are exploring, with the **FQPIMA group at the Universidad Complutense de Madrid**, a **bacterially produced alginate**, ideally from **crude glycerol**, a by-product of biodiesel, using a nitrogen-fixing bacterium. [10] That route would both lower the per-gram carbon of the beads and close a second loop with biodiesel producers such as our partner Bio-Oils. Until it is demonstrated, it stays in this page as a projection, not a result.",
    },
    { k: "h", level: 5, t: "**Accumulation yield is the carbon lever**" },
    {
      k: "p",
      t: "The single variable that governs this footprint is **how much phosphorus each gram of bead captures**, because the bead mass needed per cubic metre is inversely proportional to that capacity, and the beads are the hotspot. The relationship is steep:",
    },
    {
      k: "table",
      head: [
        "**Bead capacity (mg P/g)**",
        "**1.5**",
        "**3**",
        "**6**",
        "**9**",
        "**12**",
        "**15**",
        "**Conventional**",
      ],
      firstCol: true,
      rows: [
        [
          "**Climate (kg CO₂-eq / m³)**",
          "37.0",
          "16.4",
          "6.2",
          "2.7",
          "1.0",
          "≈0",
          "12.2",
        ],
      ],
    },
    {
      k: "p",
      t: "Doubling the yield roughly halves the carbon. On climate alone, rePhlow draws level with the chemical route at about **3.8 mg P/g**, and by about 15 mg P/g the climate impact is essentially net-zero. The polyphosphate-accumulating (PAO) bacteria at the heart of rePhlow store phosphorus at **15 to 30% of their dry weight**, [8] far above our cautious starting point, so this is an engineering gap, not a biological ceiling. The two carbon levers are therefore complementary: **raise the accumulation yield** (moves rePhlow down the curve above) and, in the future, **green the alginate** (shifts the whole curve downward). The honest reading is that the first lever is ours to pull in the laboratory now, and the second is a credible way to go further.",
    },
    {
      k: "h",
      level: 3,
      id: "r03-reading-3",
      t: "Reading 3: the full sixteen, and the target they set",
    },
    {
      k: "p",
      t: "One number is a slogan; sixteen are an argument. At the base case of 1.5 mg P/g, rePhlow already **leads in five of the sixteen categories** (ozone depletion, human toxicity non-cancer, acidification, freshwater eutrophication, and mineral and metal resources), and trails on the aggregated single score (0.0036 vs 0.0019 Pt) because bead production is energy-intensive. The decisive result is the **capacity sweep**.",
    },
    {
      k: "table",
      head: [
        "**Bead capacity (mg P/g)**",
        "**1.5**",
        "**3**",
        "**6**",
        "**9**",
        "**12**",
        "**15**",
        "**Conventional**",
      ],
      firstCol: true,
      rows: [
        [
          "**Single score (Pt)**",
          "0.00361",
          "0.00153",
          "0.00048",
          "0.00014",
          "−0.00004",
          "−0.00014",
          "0.00192",
        ],
        ["**Categories won (of 16)**", "5", "10", "15", "16", "16", "16", "—"],
        [
          "**Climate (kg CO₂-eq)**",
          "37.0",
          "16.4",
          "6.2",
          "2.7",
          "1.0",
          "≈0",
          "12.2",
        ],
      ],
    },
    {
      k: "p",
      t: "Three thresholds fall out of the sweep: rePhlow **beats the conventional route overall** at about **2.5 mg P/g**, **leads in all sixteen** categories from about **8 mg P/g** (set by the most demanding one, ionising radiation), and becomes a **net environmental benefit** by about **12 mg P/g**.",
    },
    {
      k: "p",
      t: "Two notes we state plainly: **freshwater eutrophication is a tie**, because both routes remove the same phosphorus and clear the same limit (the real benefit, keeping ~2.3 kg P/m³ out of rivers and lakes, is shared by any effective treatment); and **marine eutrophication favours rePhlow**, because our bacteria assimilate nitrogen as well as phosphorus, which iron precipitation does not touch. [11]",
    },
    {
      k: "details",
      title: "**Method, in one place**",
      body: [
        {
          k: "p",
          t: "rePhlow is an emerging technology compared like-for-like with the treatment it would replace, so the study is an **attributional, prospective, screening-level** LCA, modelled in openLCA 2.6 with the BAFU:2026 background database and EF 3.1 (adapted) across all sixteen categories, each normalised and weighted to a single score. The sweep ran six full simulations (1.5, 3, 6, 9, 12 and 15 mg P/g) plus the conventional route. The full workbook, report and reusable method live on the [Contribution](/contribution) page.",
        },
      ],
    },
    {
      k: "h",
      level: 4,
      id: "r03-reflection",
      t: "**Critical reflection: where sustainability meets the lab bench**",
    },
    {
      k: "p",
      t: "**The LCA is not a verdict. It is a design brief.** The honest reading of this panel is that at today's bead performance rePhlow wins on resources and loses on carbon. The temptation is to report the five categories we lead and move on. The more useful thing the instruments did was turn a judgement into a **measurable experimental objective**, and that is where sustainability stops being a page and starts steering the project.",
    },
    {
      k: "p",
      t: "This is the stance that ISO 14044 calls interpretation, and that the prospective-LCA literature argues is the whole point of assessing an emerging technology early: not to grade a finished product, but to steer one while its design is still open. [1][19] Because the whole environmental case turns on a single lever, the phosphorus each gram of bead captures, the LCA hands the wet lab a number to aim at rather than a slogan to defend. Three thresholds matter, and none is fantasy against a biological ceiling of 15 to 30% of dry weight as phosphorus: [8]",
    },
    {
      k: "list",
      items: [
        "**≈2.5 mg P/g** — rePhlow overtakes the chemical route on the aggregated single score. The minimum that makes the whole system a net environmental improvement.",
        "**≈8 mg P/g** — rePhlow leads across **all sixteen** categories at once, set by the most demanding one, ionising radiation. **This is the retention target we are adopting as the experimental objective.**",
        "**≈12 mg P/g** — the single score turns negative: a net environmental benefit once the recovered phosphorus is credited.",
      ],
    },
    {
      k: "p",
      t: "So the design target for the laboratory is explicit: engineer the beads and the PAO expression to reach and hold **at least ~8 mg P per gram of bead** under reactor conditions, which the biology already does intracellularly, [8] and the climate and fossil-resource readings follow the rest of the sixteen downward. A second, parallel reflection follows from Reading 2: the same result can be reached from the carbon side by decarbonising bead production itself, which is why the bacterial-alginate route matters as a research direction even though it is not yet in our inventory. The circular-economy literature frames exactly this double move, higher recovery efficiency plus lower-impact materials, as the condition under which nutrient recovery becomes a net environmental good rather than a tidier waste. [14][19] Sustainability and experimental design are not two conversations here; the LCA is the bridge between them, and it says plainly that the next gram of phosphorus retained per gram of bead is worth more than any rephrasing of the result. That is the measurable sense in which rePhlow addresses its SDGs: not by claiming the finish line, but by naming exactly how far the bench still has to carry it, and proving the distance is short.",
    },
  ],
};
